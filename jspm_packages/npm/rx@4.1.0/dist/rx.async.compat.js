/* */ 
"format cjs";
(function(process) {
  ;
  (function(factory) {
    var objectTypes = {
      'function': true,
      'object': true
    };
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    if (typeof define === 'function' && define.amd) {
      define(['./rx.binding', 'exports'], function(Rx, exports) {
        root.Rx = factory(root, exports, Rx);
        return root.Rx;
      });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
      module.exports = factory(root, module.exports, require('./rx'));
    } else {
      root.Rx = factory(root, {}, root.Rx);
    }
  }.call(this, function(root, exp, Rx, undefined) {
    var Observable = Rx.Observable,
        observableFromPromise = Observable.fromPromise,
        observableThrow = Observable.throwError,
        AnonymousObservable = Rx.AnonymousObservable,
        ObservableBase = Rx.ObservableBase,
        AsyncSubject = Rx.AsyncSubject,
        disposableCreate = Rx.Disposable.create,
        CompositeDisposable = Rx.CompositeDisposable,
        immediateScheduler = Rx.Scheduler.immediate,
        defaultScheduler = Rx.Scheduler['default'],
        inherits = Rx.internals.inherits,
        isScheduler = Rx.Scheduler.isScheduler,
        isPromise = Rx.helpers.isPromise,
        isFunction = Rx.helpers.isFunction,
        isIterable = Rx.helpers.isIterable,
        isArrayLike = Rx.helpers.isArrayLike;
    var errorObj = {e: {}};
    function tryCatcherGen(tryCatchTarget) {
      return function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      };
    }
    var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      return tryCatcherGen(fn);
    };
    function thrower(e) {
      throw e;
    }
    Observable.wrap = function(fn) {
      function createObservable() {
        return Observable.spawn.call(this, fn.apply(this, arguments));
      }
      createObservable.__generatorFunction__ = fn;
      return createObservable;
    };
    var spawn = Observable.spawn = function() {
      var gen = arguments[0],
          self = this,
          args = [];
      for (var i = 1,
          len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      return new AnonymousObservable(function(o) {
        var g = new CompositeDisposable();
        if (isFunction(gen)) {
          gen = gen.apply(self, args);
        }
        if (!gen || !isFunction(gen.next)) {
          o.onNext(gen);
          return o.onCompleted();
        }
        function processGenerator(res) {
          var ret = tryCatch(gen.next).call(gen, res);
          if (ret === errorObj) {
            return o.onError(ret.e);
          }
          next(ret);
        }
        processGenerator();
        function onError(err) {
          var ret = tryCatch(gen.next).call(gen, err);
          if (ret === errorObj) {
            return o.onError(ret.e);
          }
          next(ret);
        }
        function next(ret) {
          if (ret.done) {
            o.onNext(ret.value);
            o.onCompleted();
            return;
          }
          var obs = toObservable.call(self, ret.value);
          var value = null;
          var hasValue = false;
          if (Observable.isObservable(obs)) {
            g.add(obs.subscribe(function(val) {
              hasValue = true;
              value = val;
            }, onError, function() {
              hasValue && processGenerator(value);
            }));
          } else {
            onError(new TypeError('type not supported'));
          }
        }
        return g;
      });
    };
    function toObservable(obj) {
      if (!obj) {
        return obj;
      }
      if (Observable.isObservable(obj)) {
        return obj;
      }
      if (isPromise(obj)) {
        return Observable.fromPromise(obj);
      }
      if (isGeneratorFunction(obj) || isGenerator(obj)) {
        return spawn.call(this, obj);
      }
      if (isFunction(obj)) {
        return thunkToObservable.call(this, obj);
      }
      if (isArrayLike(obj) || isIterable(obj)) {
        return arrayToObservable.call(this, obj);
      }
      if (isObject(obj)) {
        return objectToObservable.call(this, obj);
      }
      return obj;
    }
    function arrayToObservable(obj) {
      return Observable.from(obj).concatMap(function(o) {
        if (Observable.isObservable(o) || isObject(o)) {
          return toObservable.call(null, o);
        } else {
          return Rx.Observable.just(o);
        }
      }).toArray();
    }
    function objectToObservable(obj) {
      var results = new obj.constructor(),
          keys = Object.keys(obj),
          observables = [];
      for (var i = 0,
          len = keys.length; i < len; i++) {
        var key = keys[i];
        var observable = toObservable.call(this, obj[key]);
        if (observable && Observable.isObservable(observable)) {
          defer(observable, key);
        } else {
          results[key] = obj[key];
        }
      }
      return Observable.forkJoin.apply(Observable, observables).map(function() {
        return results;
      });
      function defer(observable, key) {
        results[key] = undefined;
        observables.push(observable.map(function(next) {
          results[key] = next;
        }));
      }
    }
    function thunkToObservable(fn) {
      var self = this;
      return new AnonymousObservable(function(o) {
        fn.call(self, function() {
          var err = arguments[0],
              res = arguments[1];
          if (err) {
            return o.onError(err);
          }
          if (arguments.length > 2) {
            var args = [];
            for (var i = 1,
                len = arguments.length; i < len; i++) {
              args.push(arguments[i]);
            }
            res = args;
          }
          o.onNext(res);
          o.onCompleted();
        });
      });
    }
    function isGenerator(obj) {
      return isFunction(obj.next) && isFunction(obj['throw']);
    }
    function isGeneratorFunction(obj) {
      var ctor = obj.constructor;
      if (!ctor) {
        return false;
      }
      if (ctor.name === 'GeneratorFunction' || ctor.displayName === 'GeneratorFunction') {
        return true;
      }
      return isGenerator(ctor.prototype);
    }
    function isObject(val) {
      return Object == val.constructor;
    }
    Observable.start = function(func, context, scheduler) {
      return observableToAsync(func, context, scheduler)();
    };
    var observableToAsync = Observable.toAsync = function(func, context, scheduler) {
      isScheduler(scheduler) || (scheduler = defaultScheduler);
      return function() {
        var args = arguments,
            subject = new AsyncSubject();
        scheduler.schedule(null, function() {
          var result;
          try {
            result = func.apply(context, args);
          } catch (e) {
            subject.onError(e);
            return;
          }
          subject.onNext(result);
          subject.onCompleted();
        });
        return subject.asObservable();
      };
    };
    function createCbObservable(fn, ctx, selector, args) {
      var o = new AsyncSubject();
      args.push(createCbHandler(o, ctx, selector));
      fn.apply(ctx, args);
      return o.asObservable();
    }
    function createCbHandler(o, ctx, selector) {
      return function handler() {
        var len = arguments.length,
            results = new Array(len);
        for (var i = 0; i < len; i++) {
          results[i] = arguments[i];
        }
        if (isFunction(selector)) {
          results = tryCatch(selector).apply(ctx, results);
          if (results === errorObj) {
            return o.onError(results.e);
          }
          o.onNext(results);
        } else {
          if (results.length <= 1) {
            o.onNext(results[0]);
          } else {
            o.onNext(results);
          }
        }
        o.onCompleted();
      };
    }
    Observable.fromCallback = function(fn, ctx, selector) {
      return function() {
        typeof ctx === 'undefined' && (ctx = this);
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return createCbObservable(fn, ctx, selector, args);
      };
    };
    function createNodeObservable(fn, ctx, selector, args) {
      var o = new AsyncSubject();
      args.push(createNodeHandler(o, ctx, selector));
      fn.apply(ctx, args);
      return o.asObservable();
    }
    function createNodeHandler(o, ctx, selector) {
      return function handler() {
        var err = arguments[0];
        if (err) {
          return o.onError(err);
        }
        var len = arguments.length,
            results = [];
        for (var i = 1; i < len; i++) {
          results[i - 1] = arguments[i];
        }
        if (isFunction(selector)) {
          var results = tryCatch(selector).apply(ctx, results);
          if (results === errorObj) {
            return o.onError(results.e);
          }
          o.onNext(results);
        } else {
          if (results.length <= 1) {
            o.onNext(results[0]);
          } else {
            o.onNext(results);
          }
        }
        o.onCompleted();
      };
    }
    Observable.fromNodeCallback = function(fn, ctx, selector) {
      return function() {
        typeof ctx === 'undefined' && (ctx = this);
        var len = arguments.length,
            args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        return createNodeObservable(fn, ctx, selector, args);
      };
    };
    function isNodeList(el) {
      if (root.StaticNodeList) {
        return el instanceof root.StaticNodeList || el instanceof root.NodeList;
      } else {
        return Object.prototype.toString.call(el) === '[object NodeList]';
      }
    }
    function ListenDisposable(e, n, fn) {
      this._e = e;
      this._n = n;
      this._fn = fn;
      this._e.addEventListener(this._n, this._fn, false);
      this.isDisposed = false;
    }
    ListenDisposable.prototype.dispose = function() {
      if (!this.isDisposed) {
        this._e.removeEventListener(this._n, this._fn, false);
        this.isDisposed = true;
      }
    };
    function createEventListener(el, eventName, handler) {
      var disposables = new CompositeDisposable();
      var elemToString = Object.prototype.toString.call(el);
      if (isNodeList(el) || elemToString === '[object HTMLCollection]') {
        for (var i = 0,
            len = el.length; i < len; i++) {
          disposables.add(createEventListener(el.item(i), eventName, handler));
        }
      } else if (el) {
        disposables.add(new ListenDisposable(el, eventName, handler));
      }
      return disposables;
    }
    Rx.config.useNativeEvents = false;
    var EventObservable = (function(__super__) {
      inherits(EventObservable, __super__);
      function EventObservable(el, name, fn) {
        this._el = el;
        this._n = name;
        this._fn = fn;
        __super__.call(this);
      }
      function createHandler(o, fn) {
        return function handler() {
          var results = arguments[0];
          if (isFunction(fn)) {
            results = tryCatch(fn).apply(null, arguments);
            if (results === errorObj) {
              return o.onError(results.e);
            }
          }
          o.onNext(results);
        };
      }
      EventObservable.prototype.subscribeCore = function(o) {
        return createEventListener(this._el, this._n, createHandler(o, this._fn));
      };
      return EventObservable;
    }(ObservableBase));
    Observable.fromEvent = function(element, eventName, selector) {
      if (element.addListener) {
        return fromEventPattern(function(h) {
          element.addListener(eventName, h);
        }, function(h) {
          element.removeListener(eventName, h);
        }, selector);
      }
      if (!Rx.config.useNativeEvents) {
        if (typeof element.on === 'function' && typeof element.off === 'function') {
          return fromEventPattern(function(h) {
            element.on(eventName, h);
          }, function(h) {
            element.off(eventName, h);
          }, selector);
        }
      }
      return new EventObservable(element, eventName, selector).publish().refCount();
    };
    var EventPatternObservable = (function(__super__) {
      inherits(EventPatternObservable, __super__);
      function EventPatternObservable(add, del, fn) {
        this._add = add;
        this._del = del;
        this._fn = fn;
        __super__.call(this);
      }
      function createHandler(o, fn) {
        return function handler() {
          var results = arguments[0];
          if (isFunction(fn)) {
            results = tryCatch(fn).apply(null, arguments);
            if (results === errorObj) {
              return o.onError(results.e);
            }
          }
          o.onNext(results);
        };
      }
      EventPatternObservable.prototype.subscribeCore = function(o) {
        var fn = createHandler(o, this._fn);
        var returnValue = this._add(fn);
        return new EventPatternDisposable(this._del, fn, returnValue);
      };
      function EventPatternDisposable(del, fn, ret) {
        this._del = del;
        this._fn = fn;
        this._ret = ret;
        this.isDisposed = false;
      }
      EventPatternDisposable.prototype.dispose = function() {
        if (!this.isDisposed) {
          isFunction(this._del) && this._del(this._fn, this._ret);
          this.isDisposed = true;
        }
      };
      return EventPatternObservable;
    }(ObservableBase));
    var fromEventPattern = Observable.fromEventPattern = function(addHandler, removeHandler, selector) {
      return new EventPatternObservable(addHandler, removeHandler, selector).publish().refCount();
    };
    Observable.startAsync = function(functionAsync) {
      var promise = tryCatch(functionAsync)();
      if (promise === errorObj) {
        return observableThrow(promise.e);
      }
      return observableFromPromise(promise);
    };
    return Rx;
  }));
})(require('process'));
