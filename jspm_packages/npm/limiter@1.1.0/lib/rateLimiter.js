/* */ 
(function(process) {
  var TokenBucket = require('./tokenBucket');
  var RateLimiter = function(tokensPerInterval, interval, fireImmediately) {
    this.tokenBucket = new TokenBucket(tokensPerInterval, tokensPerInterval, interval, null);
    this.tokenBucket.content = tokensPerInterval;
    this.curIntervalStart = +new Date();
    this.tokensThisInterval = 0;
    this.fireImmediately = fireImmediately;
  };
  RateLimiter.prototype = {
    tokenBucket: null,
    curIntervalStart: 0,
    tokensThisInterval: 0,
    fireImmediately: false,
    removeTokens: function(count, callback) {
      if (count > this.tokenBucket.bucketSize) {
        process.nextTick(callback.bind(null, 'Requested tokens ' + count + ' exceeds maximum tokens per interval ' + this.tokenBucket.bucketSize, null));
        return false;
      }
      var self = this;
      var now = Date.now();
      if (now - this.curIntervalStart >= this.tokenBucket.interval) {
        this.curIntervalStart = now;
        this.tokensThisInterval = 0;
      }
      if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) {
        if (this.fireImmediately) {
          process.nextTick(callback.bind(null, null, -1));
        } else {
          var waitInterval = Math.ceil(this.curIntervalStart + this.tokenBucket.interval - now);
          setTimeout(function() {
            self.tokenBucket.removeTokens(count, afterTokensRemoved);
          }, waitInterval);
        }
        return false;
      }
      return this.tokenBucket.removeTokens(count, afterTokensRemoved);
      function afterTokensRemoved(err, tokensRemaining) {
        if (err)
          return callback(err, null);
        self.tokensThisInterval += count;
        callback(null, tokensRemaining);
      }
    },
    tryRemoveTokens: function(count) {
      if (count > this.tokenBucket.bucketSize)
        return false;
      var now = Date.now();
      if (now - this.curIntervalStart >= this.tokenBucket.interval) {
        this.curIntervalStart = now;
        this.tokensThisInterval = 0;
      }
      if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval)
        return false;
      return this.tokenBucket.tryRemoveTokens(count);
    },
    getTokensRemaining: function() {
      this.tokenBucket.drip();
      return this.tokenBucket.content;
    }
  };
  module.exports = RateLimiter;
})(require('process'));
