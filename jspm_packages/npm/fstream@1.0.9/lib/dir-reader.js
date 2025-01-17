/* */ 
(function(process) {
  module.exports = DirReader;
  var fs = require('graceful-fs');
  var inherits = require('inherits');
  var path = require('path');
  var Reader = require('./reader');
  var assert = require('assert').ok;
  inherits(DirReader, Reader);
  function DirReader(props) {
    var self = this;
    if (!(self instanceof DirReader)) {
      throw new Error('DirReader must be called as constructor.');
    }
    if (props.type !== 'Directory' || !props.Directory) {
      throw new Error('Non-directory type ' + props.type);
    }
    self.entries = null;
    self._entries = [];
    self._index = -1;
    self._paused = false;
    self._length = -1;
    if (props.sort) {
      this.sort = props.sort;
    }
    Reader.call(this, props);
  }
  DirReader.prototype._getEntries = function() {
    var self = this;
    if (self._gotEntries)
      return;
    self._gotEntries = true;
    fs.readdir(self._path, function(er, entries) {
      if (er)
        return self.error(er);
      self.entries = entries;
      self._entries = entries.slice();
      self.emit('entries', entries);
      if (self._paused)
        self.once('resume', processEntries);
      else
        processEntries();
      function processEntries() {
        self._length = self.entries.length;
        if (typeof self.sort === 'function') {
          self.entries = self.entries.sort(self.sort.bind(self));
        }
        self._read();
      }
    });
  };
  DirReader.prototype._read = function() {
    var self = this;
    if (!self.entries)
      return self._getEntries();
    if (self._paused || self._currentEntry || self._aborted) {
      return;
    }
    self._index++;
    if (self._index >= self._entries.length) {
      if (!self._ended) {
        self._ended = true;
        self.emit('end');
        self.emit('close');
      }
      return;
    }
    var nextEntry = self._entries[self._index];
    if (!nextEntry)
      return this._read();
    var p = path.resolve(self._path, nextEntry);
    assert(p !== self._path);
    assert(nextEntry);
    self._currentEntry = p;
    fs[self.props.follow ? 'stat' : 'lstat'](p, function(er, stat) {
      if (er)
        return self.error(er);
      var who = self._proxy || self;
      stat.path = p;
      stat.basename = path.basename(p);
      stat.dirname = path.dirname(p);
      var childProps = self.getChildProps.call(who, stat);
      childProps.path = p;
      childProps.basename = path.basename(p);
      childProps.dirname = path.dirname(p);
      var entry = Reader(childProps, stat);
      self._currentEntry = entry;
      entry.on('pause', function(who) {
        if (!self._paused && !entry._disowned) {
          self.pause(who);
        }
      });
      entry.on('resume', function(who) {
        if (self._paused && !entry._disowned) {
          self.resume(who);
        }
      });
      entry.on('stat', function(props) {
        self.emit('_entryStat', entry, props);
        if (entry._aborted)
          return;
        if (entry._paused) {
          entry.once('resume', function() {
            self.emit('entryStat', entry, props);
          });
        } else
          self.emit('entryStat', entry, props);
      });
      entry.on('ready', function EMITCHILD() {
        if (self._paused) {
          entry.pause(self);
          return self.once('resume', EMITCHILD);
        }
        if (entry.type === 'Socket') {
          self.emit('socket', entry);
        } else {
          self.emitEntry(entry);
        }
      });
      var ended = false;
      entry.on('close', onend);
      entry.on('disown', onend);
      function onend() {
        if (ended)
          return;
        ended = true;
        self.emit('childEnd', entry);
        self.emit('entryEnd', entry);
        self._currentEntry = null;
        if (!self._paused) {
          self._read();
        }
      }
      entry.on('error', function(er) {
        if (entry._swallowErrors) {
          self.warn(er);
          entry.emit('end');
          entry.emit('close');
        } else {
          self.emit('error', er);
        }
      });
      ;
      ['child', 'childEnd', 'warn'].forEach(function(ev) {
        entry.on(ev, self.emit.bind(self, ev));
      });
    });
  };
  DirReader.prototype.disown = function(entry) {
    entry.emit('beforeDisown');
    entry._disowned = true;
    entry.parent = entry.root = null;
    if (entry === this._currentEntry) {
      this._currentEntry = null;
    }
    entry.emit('disown');
  };
  DirReader.prototype.getChildProps = function() {
    return {
      depth: this.depth + 1,
      root: this.root || this,
      parent: this,
      follow: this.follow,
      filter: this.filter,
      sort: this.props.sort,
      hardlinks: this.props.hardlinks
    };
  };
  DirReader.prototype.pause = function(who) {
    var self = this;
    if (self._paused)
      return;
    who = who || self;
    self._paused = true;
    if (self._currentEntry && self._currentEntry.pause) {
      self._currentEntry.pause(who);
    }
    self.emit('pause', who);
  };
  DirReader.prototype.resume = function(who) {
    var self = this;
    if (!self._paused)
      return;
    who = who || self;
    self._paused = false;
    self.emit('resume', who);
    if (self._paused) {
      return;
    }
    if (self._currentEntry) {
      if (self._currentEntry.resume)
        self._currentEntry.resume(who);
    } else
      self._read();
  };
  DirReader.prototype.emitEntry = function(entry) {
    this.emit('entry', entry);
    this.emit('child', entry);
  };
})(require('process'));
