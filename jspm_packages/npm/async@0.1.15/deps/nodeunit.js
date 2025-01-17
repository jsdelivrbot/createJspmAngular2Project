/* */ 
(function(process) {
  nodeunit = (function() {
    if (!this.JSON) {
      this.JSON = {};
    }
    (function() {
      "use strict";
      function f(n) {
        return n < 10 ? '0' + n : n;
      }
      if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function(key) {
          return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
          return this.valueOf();
        };
      }
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          gap,
          indent,
          meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
          },
          rep;
      function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
          var c = meta[a];
          return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
      }
      function str(key, holder) {
        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
          value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
          value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case 'string':
            return quote(value);
          case 'number':
            return isFinite(value) ? String(value) : 'null';
          case 'boolean':
          case 'null':
            return String(value);
          case 'object':
            if (!value) {
              return 'null';
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
              length = value.length;
              for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || 'null';
              }
              v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
              gap = mind;
              return v;
            }
            if (rep && typeof rep === 'object') {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                k = rep[i];
                if (typeof k === 'string') {
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                  }
                }
              }
            } else {
              for (k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                  }
                }
              }
            }
            v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
      }
      if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {
          var i;
          gap = '';
          indent = '';
          if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
              indent += ' ';
            }
          } else if (typeof space === 'string') {
            indent = space;
          }
          rep = replacer;
          if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
          }
          return str('', {'': value});
        };
      }
      if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {
          var j;
          function walk(holder, key) {
            var k,
                v,
                value = holder[key];
            if (value && typeof value === 'object') {
              for (k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                  v = walk(value, k);
                  if (v !== undefined) {
                    value[k] = v;
                  } else {
                    delete value[k];
                  }
                }
              }
            }
            return reviver.call(holder, key, value);
          }
          text = String(text);
          cx.lastIndex = 0;
          if (cx.test(text)) {
            text = text.replace(cx, function(a) {
              return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
          }
          if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            j = eval('(' + text + ')');
            return typeof reviver === 'function' ? walk({'': j}, '') : j;
          }
          throw new SyntaxError('JSON.parse');
        };
      }
    }());
    var assert = this.assert = {};
    var types = {};
    var core = {};
    var nodeunit = {};
    var reporter = {};
    (function() {
      var async = {};
      var root = this,
          previous_async = root.async;
      if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
      } else {
        root.async = async;
      }
      async.noConflict = function() {
        root.async = previous_async;
        return async;
      };
      var _forEach = function(arr, iterator) {
        if (arr.forEach) {
          return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
          iterator(arr[i], i, arr);
        }
      };
      var _map = function(arr, iterator) {
        if (arr.map) {
          return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function(x, i, a) {
          results.push(iterator(x, i, a));
        });
        return results;
      };
      var _reduce = function(arr, iterator, memo) {
        if (arr.reduce) {
          return arr.reduce(iterator, memo);
        }
        _forEach(arr, function(x, i, a) {
          memo = iterator(memo, x, i, a);
        });
        return memo;
      };
      var _keys = function(obj) {
        if (Object.keys) {
          return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
          if (obj.hasOwnProperty(k)) {
            keys.push(k);
          }
        }
        return keys;
      };
      var _indexOf = function(arr, item) {
        if (arr.indexOf) {
          return arr.indexOf(item);
        }
        for (var i = 0; i < arr.length; i += 1) {
          if (arr[i] === item) {
            return i;
          }
        }
        return -1;
      };
      async.nextTick = function(fn) {
        if (typeof process === 'undefined' || !(process.nextTick)) {
          setTimeout(fn, 0);
        } else {
          process.nextTick(fn);
        }
      };
      async.forEach = function(arr, iterator, callback) {
        if (!arr.length) {
          return callback();
        }
        var completed = 0;
        _forEach(arr, function(x) {
          iterator(x, function(err) {
            if (err) {
              callback(err);
              callback = function() {};
            } else {
              completed += 1;
              if (completed === arr.length) {
                callback();
              }
            }
          });
        });
      };
      async.forEachSeries = function(arr, iterator, callback) {
        if (!arr.length) {
          return callback();
        }
        var completed = 0;
        var iterate = function() {
          iterator(arr[completed], function(err) {
            if (err) {
              callback(err);
              callback = function() {};
            } else {
              completed += 1;
              if (completed === arr.length) {
                callback();
              } else {
                iterate();
              }
            }
          });
        };
        iterate();
      };
      var doParallel = function(fn) {
        return function() {
          var args = Array.prototype.slice.call(arguments);
          return fn.apply(null, [async.forEach].concat(args));
        };
      };
      var doSeries = function(fn) {
        return function() {
          var args = Array.prototype.slice.call(arguments);
          return fn.apply(null, [async.forEachSeries].concat(args));
        };
      };
      var _asyncMap = function(eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function(x, i) {
          return {
            index: i,
            value: x
          };
        });
        eachfn(arr, function(x, callback) {
          iterator(x.value, function(err, v) {
            results[x.index] = v;
            callback(err);
          });
        }, function(err) {
          callback(err, results);
        });
      };
      async.map = doParallel(_asyncMap);
      async.mapSeries = doSeries(_asyncMap);
      async.reduce = function(arr, memo, iterator, callback) {
        async.forEachSeries(arr, function(x, callback) {
          iterator(memo, x, function(err, v) {
            memo = v;
            callback(err);
          });
        }, function(err) {
          callback(err, memo);
        });
      };
      async.inject = async.reduce;
      async.foldl = async.reduce;
      async.reduceRight = function(arr, memo, iterator, callback) {
        var reversed = _map(arr, function(x) {
          return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
      };
      async.foldr = async.reduceRight;
      var _filter = function(eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function(x, i) {
          return {
            index: i,
            value: x
          };
        });
        eachfn(arr, function(x, callback) {
          iterator(x.value, function(v) {
            if (v) {
              results.push(x);
            }
            callback();
          });
        }, function(err) {
          callback(_map(results.sort(function(a, b) {
            return a.index - b.index;
          }), function(x) {
            return x.value;
          }));
        });
      };
      async.filter = doParallel(_filter);
      async.filterSeries = doSeries(_filter);
      async.select = async.filter;
      async.selectSeries = async.filterSeries;
      var _reject = function(eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function(x, i) {
          return {
            index: i,
            value: x
          };
        });
        eachfn(arr, function(x, callback) {
          iterator(x.value, function(v) {
            if (!v) {
              results.push(x);
            }
            callback();
          });
        }, function(err) {
          callback(_map(results.sort(function(a, b) {
            return a.index - b.index;
          }), function(x) {
            return x.value;
          }));
        });
      };
      async.reject = doParallel(_reject);
      async.rejectSeries = doSeries(_reject);
      var _detect = function(eachfn, arr, iterator, main_callback) {
        eachfn(arr, function(x, callback) {
          iterator(x, function(result) {
            if (result) {
              main_callback(x);
            } else {
              callback();
            }
          });
        }, function(err) {
          main_callback();
        });
      };
      async.detect = doParallel(_detect);
      async.detectSeries = doSeries(_detect);
      async.some = function(arr, iterator, main_callback) {
        async.forEach(arr, function(x, callback) {
          iterator(x, function(v) {
            if (v) {
              main_callback(true);
              main_callback = function() {};
            }
            callback();
          });
        }, function(err) {
          main_callback(false);
        });
      };
      async.any = async.some;
      async.every = function(arr, iterator, main_callback) {
        async.forEach(arr, function(x, callback) {
          iterator(x, function(v) {
            if (!v) {
              main_callback(false);
              main_callback = function() {};
            }
            callback();
          });
        }, function(err) {
          main_callback(true);
        });
      };
      async.all = async.every;
      async.sortBy = function(arr, iterator, callback) {
        async.map(arr, function(x, callback) {
          iterator(x, function(err, criteria) {
            if (err) {
              callback(err);
            } else {
              callback(null, {
                value: x,
                criteria: criteria
              });
            }
          });
        }, function(err, results) {
          if (err) {
            return callback(err);
          } else {
            var fn = function(left, right) {
              var a = left.criteria,
                  b = right.criteria;
              return a < b ? -1 : a > b ? 1 : 0;
            };
            callback(null, _map(results.sort(fn), function(x) {
              return x.value;
            }));
          }
        });
      };
      async.auto = function(tasks, callback) {
        callback = callback || function() {};
        var keys = _keys(tasks);
        if (!keys.length) {
          return callback(null);
        }
        var completed = [];
        var listeners = [];
        var addListener = function(fn) {
          listeners.unshift(fn);
        };
        var removeListener = function(fn) {
          for (var i = 0; i < listeners.length; i += 1) {
            if (listeners[i] === fn) {
              listeners.splice(i, 1);
              return;
            }
          }
        };
        var taskComplete = function() {
          _forEach(listeners, function(fn) {
            fn();
          });
        };
        addListener(function() {
          if (completed.length === keys.length) {
            callback(null);
          }
        });
        _forEach(keys, function(k) {
          var task = (tasks[k] instanceof Function) ? [tasks[k]] : tasks[k];
          var taskCallback = function(err) {
            if (err) {
              callback(err);
              callback = function() {};
            } else {
              completed.push(k);
              taskComplete();
            }
          };
          var requires = task.slice(0, Math.abs(task.length - 1)) || [];
          var ready = function() {
            return _reduce(requires, function(a, x) {
              return (a && _indexOf(completed, x) !== -1);
            }, true);
          };
          if (ready()) {
            task[task.length - 1](taskCallback);
          } else {
            var listener = function() {
              if (ready()) {
                removeListener(listener);
                task[task.length - 1](taskCallback);
              }
            };
            addListener(listener);
          }
        });
      };
      async.waterfall = function(tasks, callback) {
        if (!tasks.length) {
          return callback();
        }
        callback = callback || function() {};
        var wrapIterator = function(iterator) {
          return function(err) {
            if (err) {
              callback(err);
              callback = function() {};
            } else {
              var args = Array.prototype.slice.call(arguments, 1);
              var next = iterator.next();
              if (next) {
                args.push(wrapIterator(next));
              } else {
                args.push(callback);
              }
              async.nextTick(function() {
                iterator.apply(null, args);
              });
            }
          };
        };
        wrapIterator(async.iterator(tasks))();
      };
      async.parallel = function(tasks, callback) {
        callback = callback || function() {};
        if (tasks.constructor === Array) {
          async.map(tasks, function(fn, callback) {
            if (fn) {
              fn(function(err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                  args = args[0];
                }
                callback.call(null, err, args || null);
              });
            }
          }, callback);
        } else {
          var results = {};
          async.forEach(_keys(tasks), function(k, callback) {
            tasks[k](function(err) {
              var args = Array.prototype.slice.call(arguments, 1);
              if (args.length <= 1) {
                args = args[0];
              }
              results[k] = args;
              callback(err);
            });
          }, function(err) {
            callback(err, results);
          });
        }
      };
      async.series = function(tasks, callback) {
        callback = callback || function() {};
        if (tasks.constructor === Array) {
          async.mapSeries(tasks, function(fn, callback) {
            if (fn) {
              fn(function(err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                  args = args[0];
                }
                callback.call(null, err, args || null);
              });
            }
          }, callback);
        } else {
          var results = {};
          async.forEachSeries(_keys(tasks), function(k, callback) {
            tasks[k](function(err) {
              var args = Array.prototype.slice.call(arguments, 1);
              if (args.length <= 1) {
                args = args[0];
              }
              results[k] = args;
              callback(err);
            });
          }, function(err) {
            callback(err, results);
          });
        }
      };
      async.iterator = function(tasks) {
        var makeCallback = function(index) {
          var fn = function() {
            if (tasks.length) {
              tasks[index].apply(null, arguments);
            }
            return fn.next();
          };
          fn.next = function() {
            return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
          };
          return fn;
        };
        return makeCallback(0);
      };
      async.apply = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
          return fn.apply(null, args.concat(Array.prototype.slice.call(arguments)));
        };
      };
      var _concat = function(eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function(x, cb) {
          fn(x, function(err, y) {
            r = r.concat(y || []);
            cb(err);
          });
        }, function(err) {
          callback(err, r);
        });
      };
      async.concat = doParallel(_concat);
      async.concatSeries = doSeries(_concat);
      async.whilst = function(test, iterator, callback) {
        if (test()) {
          iterator(function(err) {
            if (err) {
              return callback(err);
            }
            async.whilst(test, iterator, callback);
          });
        } else {
          callback();
        }
      };
      async.until = function(test, iterator, callback) {
        if (!test()) {
          iterator(function(err) {
            if (err) {
              return callback(err);
            }
            async.until(test, iterator, callback);
          });
        } else {
          callback();
        }
      };
      async.queue = function(worker, concurrency) {
        var workers = 0;
        var tasks = [];
        var q = {
          concurrency: concurrency,
          push: function(data, callback) {
            tasks.push({
              data: data,
              callback: callback
            });
            async.nextTick(q.process);
          },
          process: function() {
            if (workers < q.concurrency && tasks.length) {
              var task = tasks.splice(0, 1)[0];
              workers += 1;
              worker(task.data, function() {
                workers -= 1;
                if (task.callback) {
                  task.callback.apply(task, arguments);
                }
                q.process();
              });
            }
          },
          length: function() {
            return tasks.length;
          }
        };
        return q;
      };
      var _console_fn = function(name) {
        return function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          fn.apply(null, args.concat([function(err) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (typeof console !== 'undefined') {
              if (err) {
                if (console.error) {
                  console.error(err);
                }
              } else if (console[name]) {
                _forEach(args, function(x) {
                  console[name](x);
                });
              }
            }
          }]));
        };
      };
      async.log = _console_fn('log');
      async.dir = _console_fn('dir');
    }());
    (function(exports) {
      var _keys = function(obj) {
        if (Object.keys)
          return Object.keys(obj);
        var keys = [];
        for (var k in obj) {
          if (obj.hasOwnProperty(k))
            keys.push(k);
        }
        return keys;
      };
      var pSlice = Array.prototype.slice;
      var assert = exports;
      assert.AssertionError = function AssertionError(options) {
        this.name = "AssertionError";
        this.message = options.message;
        this.actual = options.actual;
        this.expected = options.expected;
        this.operator = options.operator;
        var stackStartFunction = options.stackStartFunction || fail;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, stackStartFunction);
        }
      };
      assert.AssertionError.super_ = Error;
      var ctor = function() {
        this.constructor = assert.AssertionError;
      };
      ctor.prototype = Error.prototype;
      assert.AssertionError.prototype = new ctor();
      assert.AssertionError.prototype.toString = function() {
        if (this.message) {
          return [this.name + ":", this.message].join(' ');
        } else {
          return [this.name + ":", JSON.stringify(this.expected), this.operator, JSON.stringify(this.actual)].join(" ");
        }
      };
      assert.AssertionError.__proto__ = Error.prototype;
      function fail(actual, expected, message, operator, stackStartFunction) {
        throw new assert.AssertionError({
          message: message,
          actual: actual,
          expected: expected,
          operator: operator,
          stackStartFunction: stackStartFunction
        });
      }
      assert.fail = fail;
      assert.ok = function ok(value, message) {
        if (!!!value)
          fail(value, true, message, "==", assert.ok);
      };
      assert.equal = function equal(actual, expected, message) {
        if (actual != expected)
          fail(actual, expected, message, "==", assert.equal);
      };
      assert.notEqual = function notEqual(actual, expected, message) {
        if (actual == expected) {
          fail(actual, expected, message, "!=", assert.notEqual);
        }
      };
      assert.deepEqual = function deepEqual(actual, expected, message) {
        if (!_deepEqual(actual, expected)) {
          fail(actual, expected, message, "deepEqual", assert.deepEqual);
        }
      };
      function _deepEqual(actual, expected) {
        if (actual === expected) {
          return true;
        } else if (actual instanceof Date && expected instanceof Date) {
          return actual.getTime() === expected.getTime();
        } else if (typeof actual != 'object' && typeof expected != 'object') {
          return actual == expected;
        } else {
          return objEquiv(actual, expected);
        }
      }
      function isUndefinedOrNull(value) {
        return value === null || value === undefined;
      }
      function isArguments(object) {
        return Object.prototype.toString.call(object) == '[object Arguments]';
      }
      function objEquiv(a, b) {
        if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
          return false;
        if (a.prototype !== b.prototype)
          return false;
        if (isArguments(a)) {
          if (!isArguments(b)) {
            return false;
          }
          a = pSlice.call(a);
          b = pSlice.call(b);
          return _deepEqual(a, b);
        }
        try {
          var ka = _keys(a),
              kb = _keys(b),
              key,
              i;
        } catch (e) {
          return false;
        }
        if (ka.length != kb.length)
          return false;
        ka.sort();
        kb.sort();
        for (i = ka.length - 1; i >= 0; i--) {
          if (ka[i] != kb[i])
            return false;
        }
        for (i = ka.length - 1; i >= 0; i--) {
          key = ka[i];
          if (!_deepEqual(a[key], b[key]))
            return false;
        }
        return true;
      }
      assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
        if (_deepEqual(actual, expected)) {
          fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
        }
      };
      assert.strictEqual = function strictEqual(actual, expected, message) {
        if (actual !== expected) {
          fail(actual, expected, message, "===", assert.strictEqual);
        }
      };
      assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
        if (actual === expected) {
          fail(actual, expected, message, "!==", assert.notStrictEqual);
        }
      };
      function _throws(shouldThrow, block, err, message) {
        var exception = null,
            threw = false,
            typematters = true;
        message = message || "";
        if (arguments.length == 3) {
          if (typeof(err) == "string") {
            message = err;
            typematters = false;
          }
        } else if (arguments.length == 2) {
          typematters = false;
        }
        try {
          block();
        } catch (e) {
          threw = true;
          exception = e;
        }
        if (shouldThrow && !threw) {
          fail("Missing expected exception" + (err && err.name ? " (" + err.name + ")." : '.') + (message ? " " + message : ""));
        }
        if (!shouldThrow && threw && typematters && exception instanceof err) {
          fail("Got unwanted exception" + (err && err.name ? " (" + err.name + ")." : '.') + (message ? " " + message : ""));
        }
        if ((shouldThrow && threw && typematters && !(exception instanceof err)) || (!shouldThrow && threw)) {
          throw exception;
        }
      }
      ;
      assert.throws = function(block, error, message) {
        _throws.apply(this, [true].concat(pSlice.call(arguments)));
      };
      assert.doesNotThrow = function(block, error, message) {
        _throws.apply(this, [false].concat(pSlice.call(arguments)));
      };
      assert.ifError = function(err) {
        if (err) {
          throw err;
        }
      };
    })(assert);
    (function(exports) {
      exports.assertion = function(obj) {
        return {
          method: obj.method || '',
          message: obj.message || (obj.error && obj.error.message) || '',
          error: obj.error,
          passed: function() {
            return !this.error;
          },
          failed: function() {
            return Boolean(this.error);
          }
        };
      };
      exports.assertionList = function(arr, duration) {
        var that = arr || [];
        that.failures = function() {
          var failures = 0;
          for (var i = 0; i < this.length; i++) {
            if (this[i].failed())
              failures++;
          }
          return failures;
        };
        that.passes = function() {
          return that.length - that.failures();
        };
        that.duration = duration || 0;
        return that;
      };
      var assertWrapper = function(callback) {
        return function(new_method, assert_method, arity) {
          return function() {
            var message = arguments[arity - 1];
            var a = exports.assertion({
              method: new_method,
              message: message
            });
            try {
              assert[assert_method].apply(null, arguments);
            } catch (e) {
              a.error = e;
            }
            callback(a);
          };
        };
      };
      exports.test = function(name, start, options, callback) {
        var expecting;
        var a_list = [];
        var wrapAssert = assertWrapper(function(a) {
          a_list.push(a);
          if (options.log) {
            async.nextTick(function() {
              options.log(a);
            });
          }
        });
        var test = {
          done: function(err) {
            if (expecting !== undefined && expecting !== a_list.length) {
              var e = new Error('Expected ' + expecting + ' assertions, ' + a_list.length + ' ran');
              var a1 = exports.assertion({
                method: 'expect',
                error: e
              });
              a_list.push(a1);
              if (options.log) {
                async.nextTick(function() {
                  options.log(a1);
                });
              }
            }
            if (err) {
              var a2 = exports.assertion({error: err});
              a_list.push(a2);
              if (options.log) {
                async.nextTick(function() {
                  options.log(a2);
                });
              }
            }
            var end = new Date().getTime();
            async.nextTick(function() {
              var assertion_list = exports.assertionList(a_list, end - start);
              options.testDone(name, assertion_list);
              callback(null, a_list);
            });
          },
          ok: wrapAssert('ok', 'ok', 2),
          same: wrapAssert('same', 'deepEqual', 3),
          equals: wrapAssert('equals', 'equal', 3),
          expect: function(num) {
            expecting = num;
          },
          _assertion_list: a_list
        };
        for (var k in assert) {
          if (assert.hasOwnProperty(k)) {
            test[k] = wrapAssert(k, k, assert[k].length);
          }
        }
        return test;
      };
      exports.options = function(opt) {
        var optionalCallback = function(name) {
          opt[name] = opt[name] || function() {};
        };
        optionalCallback('moduleStart');
        optionalCallback('moduleDone');
        optionalCallback('testStart');
        optionalCallback('testDone');
        return opt;
      };
    })(types);
    (function(exports) {
      var _keys = function(obj) {
        if (Object.keys)
          return Object.keys(obj);
        var keys = [];
        for (var k in obj) {
          if (obj.hasOwnProperty(k))
            keys.push(k);
        }
        return keys;
      };
      exports.runTest = function(name, fn, opt, callback) {
        var options = types.options(opt);
        options.testStart(name);
        var start = new Date().getTime();
        var test = types.test(name, start, options, callback);
        try {
          fn(test);
        } catch (e) {
          test.done(e);
        }
      };
      exports.runSuite = function(name, suite, opt, callback) {
        var keys = _keys(suite);
        async.concatSeries(keys, function(k, cb) {
          var prop = suite[k],
              _name;
          _name = name ? [].concat(name, k) : [k];
          _name.toString = function() {
            return this.join(' - ');
          };
          if (typeof prop === 'function') {
            exports.runTest(_name, suite[k], opt, cb);
          } else {
            exports.runSuite(_name, suite[k], opt, cb);
          }
        }, callback);
      };
      exports.runModule = function(name, mod, opt, callback) {
        var options = types.options(opt);
        options.moduleStart(name);
        var start = new Date().getTime();
        exports.runSuite(null, mod, opt, function(err, a_list) {
          var end = new Date().getTime();
          var assertion_list = types.assertionList(a_list, end - start);
          options.moduleDone(name, assertion_list);
          callback(null, a_list);
        });
      };
      exports.runModules = function(modules, opt) {
        var all_assertions = [];
        var options = types.options(opt);
        var start = new Date().getTime();
        async.concatSeries(_keys(modules), function(k, cb) {
          exports.runModule(k, modules[k], options, cb);
        }, function(err, all_assertions) {
          var end = new Date().getTime();
          options.done(types.assertionList(all_assertions, end - start));
        });
      };
      var wrapTest = function(setUp, tearDown, fn) {
        return function(test) {
          var context = {};
          if (tearDown) {
            var done = test.done;
            test.done = function(err) {
              try {
                tearDown.call(context, function(err2) {
                  if (err && err2) {
                    test._assertion_list.push(types.assertion({error: err}));
                    return done(err2);
                  }
                  done(err || err2);
                });
              } catch (e) {
                done(e);
              }
            };
          }
          if (setUp) {
            setUp.call(context, function(err) {
              if (err) {
                return test.done(err);
              }
              fn.call(context, test);
            });
          } else {
            fn.call(context, test);
          }
        };
      };
      var wrapGroup = function(setUp, tearDown, group) {
        var tests = {};
        var keys = _keys(group);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (typeof group[k] === 'function') {
            tests[k] = wrapTest(setUp, tearDown, group[k]);
          } else if (typeof group[k] === 'object') {
            tests[k] = wrapGroup(setUp, tearDown, group[k]);
          }
        }
        return tests;
      };
      exports.testCase = function(suite) {
        var setUp = suite.setUp;
        var tearDown = suite.tearDown;
        delete suite.setUp;
        delete suite.tearDown;
        return wrapGroup(setUp, tearDown, suite);
      };
    })(core);
    (function(exports) {
      exports.info = "Browser-based test reporter";
      exports.run = function(modules, options) {
        var start = new Date().getTime();
        function setText(el, txt) {
          if ('innerText' in el) {
            el.innerText = txt;
          } else if ('textContent' in el) {
            el.textContent = txt;
          }
        }
        function getOrCreate(tag, id) {
          var el = document.getElementById(id);
          if (!el) {
            el = document.createElement(tag);
            el.id = id;
            document.body.appendChild(el);
          }
          return el;
        }
        ;
        var header = getOrCreate('h1', 'nodeunit-header');
        var banner = getOrCreate('h2', 'nodeunit-banner');
        var userAgent = getOrCreate('h2', 'nodeunit-userAgent');
        var tests = getOrCreate('ol', 'nodeunit-tests');
        var result = getOrCreate('p', 'nodeunit-testresult');
        setText(userAgent, navigator.userAgent);
        nodeunit.runModules(modules, {
          moduleStart: function(name) {},
          testDone: function(name, assertions) {
            var test = document.createElement('li');
            var strong = document.createElement('strong');
            strong.innerHTML = name + ' <b style="color: black;">(' + '<b class="fail">' + assertions.failures() + '</b>, ' + '<b class="pass">' + assertions.passes() + '</b>, ' + assertions.length + ')</b>';
            test.className = assertions.failures() ? 'fail' : 'pass';
            test.appendChild(strong);
            var aList = document.createElement('ol');
            aList.style.display = 'none';
            test.onclick = function() {
              var d = aList.style.display;
              aList.style.display = (d == 'none') ? 'block' : 'none';
            };
            for (var i = 0; i < assertions.length; i++) {
              var li = document.createElement('li');
              var a = assertions[i];
              if (a.failed()) {
                li.innerHTML = (a.message || a.method || 'no message') + '<pre>' + (a.error.stack || a.error) + '</pre>';
                li.className = 'fail';
              } else {
                li.innerHTML = a.message || a.method || 'no message';
                li.className = 'pass';
              }
              aList.appendChild(li);
            }
            test.appendChild(aList);
            tests.appendChild(test);
          },
          done: function(assertions) {
            var end = new Date().getTime();
            var duration = end - start;
            var failures = assertions.failures();
            banner.className = failures ? 'fail' : 'pass';
            result.innerHTML = 'Tests completed in ' + duration + ' milliseconds.<br/><span class="passed">' + assertions.passes() + '</span> assertions of ' + '<span class="all">' + assertions.length + '<span> passed, ' + assertions.failures() + ' failed.';
          }
        });
      };
    })(reporter);
    nodeunit = core;
    nodeunit.assert = assert;
    nodeunit.reporter = reporter;
    nodeunit.run = reporter.run;
    return nodeunit;
  })();
})(require('process'));
