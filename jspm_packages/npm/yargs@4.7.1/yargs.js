/* */ 
(function(process) {
  const assert = require('assert');
  const assign = require('lodash.assign');
  const Command = require('./lib/command');
  const Completion = require('./lib/completion');
  const Parser = require('yargs-parser');
  const path = require('path');
  const Usage = require('./lib/usage');
  const Validation = require('./lib/validation');
  const Y18n = require('y18n');
  const readPkgUp = require('read-pkg-up');
  const pkgConf = require('pkg-conf');
  const requireMainFilename = require('require-main-filename');
  const objFilter = require('./lib/obj-filter');
  const setBlocking = require('set-blocking');
  var exports = module.exports = Yargs;
  function Yargs(processArgs, cwd, parentRequire) {
    processArgs = processArgs || [];
    const self = {};
    var command = null;
    var completion = null;
    var groups = {};
    var preservedGroups = {};
    var usage = null;
    var validation = null;
    const y18n = Y18n({
      directory: path.resolve(__dirname, './locales'),
      updateFiles: false
    });
    if (!cwd)
      cwd = process.cwd();
    self.$0 = process.argv.slice(0, 2).map(function(x, i) {
      if (i === 0 && /\b(node|iojs)(\.exe)?$/.test(x))
        return;
      var b = rebase(cwd, x);
      return x.match(/^(\/|([a-zA-Z]:)?\\)/) && b.length < x.length ? b : x;
    }).join(' ').trim();
    if (process.env._ !== undefined && process.argv[1] === process.env._) {
      self.$0 = process.env._.replace(path.dirname(process.execPath) + '/', '');
    }
    const context = {
      resets: -1,
      commands: []
    };
    self.getContext = function() {
      return context;
    };
    var options;
    self.resetOptions = self.reset = function(aliases) {
      context.resets++;
      aliases = aliases || {};
      options = options || {};
      var tmpOptions = {};
      tmpOptions.global = options.global ? options.global : [];
      var globalLookup = {};
      tmpOptions.global.forEach(function(g) {
        globalLookup[g] = true;
        ;
        (aliases[g] || []).forEach(function(a) {
          globalLookup[a] = true;
        });
      });
      preservedGroups = Object.keys(groups).reduce(function(acc, groupName) {
        var keys = groups[groupName].filter(function(key) {
          return key in globalLookup;
        });
        if (keys.length > 0) {
          acc[groupName] = keys;
        }
        return acc;
      }, {});
      groups = {};
      var arrayOptions = ['array', 'boolean', 'string', 'requiresArg', 'skipValidation', 'count', 'normalize', 'number'];
      var objectOptions = ['narg', 'key', 'alias', 'default', 'defaultDescription', 'config', 'choices', 'demanded'];
      arrayOptions.forEach(function(k) {
        tmpOptions[k] = (options[k] || []).filter(function(k) {
          return globalLookup[k];
        });
      });
      objectOptions.forEach(function(k) {
        tmpOptions[k] = objFilter(options[k], function(k, v) {
          return globalLookup[k];
        });
      });
      tmpOptions.envPrefix = undefined;
      options = tmpOptions;
      usage = usage ? usage.reset(globalLookup) : Usage(self, y18n);
      validation = validation ? validation.reset(globalLookup) : Validation(self, usage, y18n);
      command = command ? command.reset() : Command(self, usage, validation);
      if (!completion)
        completion = Completion(self, usage, command);
      exitProcess = true;
      strict = false;
      completionCommand = null;
      self.parsed = false;
      return self;
    };
    self.resetOptions();
    self.boolean = function(bools) {
      options.boolean.push.apply(options.boolean, [].concat(bools));
      return self;
    };
    self.array = function(arrays) {
      options.array.push.apply(options.array, [].concat(arrays));
      return self;
    };
    self.nargs = function(key, n) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.nargs(k, key[k]);
        });
      } else {
        options.narg[key] = n;
      }
      return self;
    };
    self.number = function(numbers) {
      options.number.push.apply(options.number, [].concat(numbers));
      return self;
    };
    self.choices = function(key, values) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.choices(k, key[k]);
        });
      } else {
        options.choices[key] = (options.choices[key] || []).concat(values);
      }
      return self;
    };
    self.normalize = function(strings) {
      options.normalize.push.apply(options.normalize, [].concat(strings));
      return self;
    };
    self.config = function(key, msg, parseFn) {
      if (typeof key === 'object') {
        options.configObjects = (options.configObjects || []).concat(key);
        return self;
      }
      if (typeof msg === 'function') {
        parseFn = msg;
        msg = null;
      }
      key = key || 'config';
      self.describe(key, msg || usage.deferY18nLookup('Path to JSON config file'));
      ;
      (Array.isArray(key) ? key : [key]).forEach(function(k) {
        options.config[k] = parseFn || true;
      });
      return self;
    };
    self.example = function(cmd, description) {
      usage.example(cmd, description);
      return self;
    };
    self.command = function(cmd, description, builder, handler) {
      command.addHandler(cmd, description, builder, handler);
      return self;
    };
    self.string = function(strings) {
      options.string.push.apply(options.string, [].concat(strings));
      return self;
    };
    self.default = self.defaults = function(key, value, defaultDescription) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.default(k, key[k]);
        });
      } else {
        if (defaultDescription)
          options.defaultDescription[key] = defaultDescription;
        if (typeof value === 'function') {
          if (!options.defaultDescription[key])
            options.defaultDescription[key] = usage.functionDescription(value);
          value = value.call();
        }
        options.default[key] = value;
      }
      return self;
    };
    self.alias = function(x, y) {
      if (typeof x === 'object') {
        Object.keys(x).forEach(function(key) {
          self.alias(key, x[key]);
        });
      } else {
        options.alias[x] = (options.alias[x] || []).concat(y);
      }
      return self;
    };
    self.count = function(counts) {
      options.count.push.apply(options.count, [].concat(counts));
      return self;
    };
    self.demand = self.required = self.require = function(keys, max, msg) {
      if (Array.isArray(max)) {
        max.forEach(function(key) {
          self.demand(key, msg);
        });
        max = Infinity;
      } else if (typeof max !== 'number') {
        msg = max;
        max = Infinity;
      }
      if (typeof keys === 'number') {
        if (!options.demanded._)
          options.demanded._ = {
            count: 0,
            msg: null,
            max: max
          };
        options.demanded._.count = keys;
        options.demanded._.msg = msg;
      } else if (Array.isArray(keys)) {
        keys.forEach(function(key) {
          self.demand(key, msg);
        });
      } else {
        if (typeof msg === 'string') {
          options.demanded[keys] = {msg: msg};
        } else if (msg === true || typeof msg === 'undefined') {
          options.demanded[keys] = {msg: undefined};
        }
      }
      return self;
    };
    self.getDemanded = function() {
      return options.demanded;
    };
    self.requiresArg = function(requiresArgs) {
      options.requiresArg.push.apply(options.requiresArg, [].concat(requiresArgs));
      return self;
    };
    self.skipValidation = function(skipValidations) {
      options.skipValidation.push.apply(options.skipValidation, [].concat(skipValidations));
      return self;
    };
    self.implies = function(key, value) {
      validation.implies(key, value);
      return self;
    };
    self.usage = function(msg, opts) {
      if (!opts && typeof msg === 'object') {
        opts = msg;
        msg = null;
      }
      usage.usage(msg);
      if (opts)
        self.options(opts);
      return self;
    };
    self.epilogue = self.epilog = function(msg) {
      usage.epilog(msg);
      return self;
    };
    self.fail = function(f) {
      usage.failFn(f);
      return self;
    };
    self.check = function(f) {
      validation.check(f);
      return self;
    };
    self.describe = function(key, desc) {
      options.key[key] = true;
      usage.describe(key, desc);
      return self;
    };
    self.global = function(globals) {
      options.global.push.apply(options.global, [].concat(globals));
      return self;
    };
    self.pkgConf = function(key, path) {
      var conf = null;
      var obj = readPkgUp.sync({cwd: path || requireMainFilename(parentRequire || require)});
      if (obj.pkg && obj.pkg[key] && typeof obj.pkg[key] === 'object') {
        conf = obj.pkg[key];
        options.configObjects = (options.configObjects || []).concat(conf);
      }
      return self;
    };
    self.parse = function(args, shortCircuit) {
      return parseArgs(args, shortCircuit);
    };
    self.option = self.options = function(key, opt) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.options(k, key[k]);
        });
      } else {
        assert(typeof opt === 'object', 'second argument to option must be an object');
        options.key[key] = true;
        if (opt.alias)
          self.alias(key, opt.alias);
        var demand = opt.demand || opt.required || opt.require;
        if (demand) {
          self.demand(key, demand);
        }
        if ('config' in opt) {
          self.config(key, opt.configParser);
        }
        if ('default' in opt) {
          self.default(key, opt.default);
        }
        if ('nargs' in opt) {
          self.nargs(key, opt.nargs);
        }
        if ('normalize' in opt) {
          self.normalize(key);
        }
        if ('choices' in opt) {
          self.choices(key, opt.choices);
        }
        if ('group' in opt) {
          self.group(key, opt.group);
        }
        if (opt.global) {
          self.global(key);
        }
        if (opt.boolean || opt.type === 'boolean') {
          self.boolean(key);
          if (opt.alias)
            self.boolean(opt.alias);
        }
        if (opt.array || opt.type === 'array') {
          self.array(key);
          if (opt.alias)
            self.array(opt.alias);
        }
        if (opt.number || opt.type === 'number') {
          self.number(key);
          if (opt.alias)
            self.number(opt.alias);
        }
        if (opt.string || opt.type === 'string') {
          self.string(key);
          if (opt.alias)
            self.string(opt.alias);
        }
        if (opt.count || opt.type === 'count') {
          self.count(key);
        }
        if (opt.defaultDescription) {
          options.defaultDescription[key] = opt.defaultDescription;
        }
        if (opt.skipValidation) {
          self.skipValidation(key);
        }
        var desc = opt.describe || opt.description || opt.desc;
        if (desc) {
          self.describe(key, desc);
        }
        if (opt.requiresArg) {
          self.requiresArg(key);
        }
      }
      return self;
    };
    self.getOptions = function() {
      return options;
    };
    self.group = function(opts, groupName) {
      var existing = preservedGroups[groupName] || groups[groupName];
      if (preservedGroups[groupName]) {
        delete preservedGroups[groupName];
      }
      var seen = {};
      groups[groupName] = (existing || []).concat(opts).filter(function(key) {
        if (seen[key])
          return false;
        return (seen[key] = true);
      });
      return self;
    };
    self.getGroups = function() {
      return assign({}, groups, preservedGroups);
    };
    self.env = function(prefix) {
      if (prefix === false)
        options.envPrefix = undefined;
      else
        options.envPrefix = prefix || '';
      return self;
    };
    self.wrap = function(cols) {
      usage.wrap(cols);
      return self;
    };
    var strict = false;
    self.strict = function() {
      strict = true;
      return self;
    };
    self.getStrict = function() {
      return strict;
    };
    self.showHelp = function(level) {
      if (!self.parsed)
        parseArgs(processArgs);
      usage.showHelp(level);
      return self;
    };
    var versionOpt = null;
    self.version = function(opt, msg, ver) {
      if (arguments.length === 0) {
        ver = guessVersion();
        opt = 'version';
      } else if (arguments.length === 1) {
        ver = opt;
        opt = 'version';
      } else if (arguments.length === 2) {
        ver = msg;
      }
      versionOpt = opt;
      msg = msg || usage.deferY18nLookup('Show version number');
      usage.version(ver || undefined);
      self.boolean(versionOpt);
      self.global(versionOpt);
      self.describe(versionOpt, msg);
      return self;
    };
    function guessVersion() {
      var obj = readPkgUp.sync({cwd: requireMainFilename(parentRequire || require)});
      return obj.pkg ? obj.pkg.version : 'unknown';
    }
    var helpOpt = null;
    self.addHelpOpt = self.help = function(opt, msg) {
      opt = opt || 'help';
      helpOpt = opt;
      self.boolean(opt);
      self.global(opt);
      self.describe(opt, msg || usage.deferY18nLookup('Show help'));
      return self;
    };
    self.showHelpOnFail = function(enabled, message) {
      usage.showHelpOnFail(enabled, message);
      return self;
    };
    var exitProcess = true;
    self.exitProcess = function(enabled) {
      if (typeof enabled !== 'boolean') {
        enabled = true;
      }
      exitProcess = enabled;
      return self;
    };
    self.getExitProcess = function() {
      return exitProcess;
    };
    var completionCommand = null;
    self.completion = function(cmd, desc, fn) {
      if (typeof desc === 'function') {
        fn = desc;
        desc = null;
      }
      completionCommand = cmd || 'completion';
      if (!desc && desc !== false) {
        desc = 'generate bash completion script';
      }
      self.command(completionCommand, desc);
      if (fn)
        completion.registerFunction(fn);
      return self;
    };
    self.showCompletionScript = function($0) {
      $0 = $0 || self.$0;
      console.log(completion.generateCompletionScript($0));
      return self;
    };
    self.getCompletion = function(args, done) {
      completion.getCompletion(args, done);
    };
    self.locale = function(locale) {
      if (arguments.length === 0) {
        guessLocale();
        return y18n.getLocale();
      }
      detectLocale = false;
      y18n.setLocale(locale);
      return self;
    };
    self.updateStrings = self.updateLocale = function(obj) {
      detectLocale = false;
      y18n.updateLocale(obj);
      return self;
    };
    var detectLocale = true;
    self.detectLocale = function(detect) {
      detectLocale = detect;
      return self;
    };
    self.getDetectLocale = function() {
      return detectLocale;
    };
    self.getUsageInstance = function() {
      return usage;
    };
    self.getValidationInstance = function() {
      return validation;
    };
    self.getCommandInstance = function() {
      return command;
    };
    self.terminalWidth = function() {
      return require('window-size').width;
    };
    Object.defineProperty(self, 'argv', {
      get: function() {
        var args = null;
        try {
          args = parseArgs(processArgs);
        } catch (err) {
          usage.fail(err.message, err);
        }
        return args;
      },
      enumerable: true
    });
    function parseArgs(args, shortCircuit) {
      options.__ = y18n.__;
      options.configuration = pkgConf.sync('yargs', {
        defaults: {},
        cwd: requireMainFilename(require)
      });
      const parsed = Parser.detailed(args, options);
      const argv = parsed.argv;
      var aliases = parsed.aliases;
      argv.$0 = self.$0;
      self.parsed = parsed;
      guessLocale();
      if (shortCircuit) {
        return argv;
      }
      var handlerKeys = command.getCommands();
      for (var i = 0,
          cmd; (cmd = handlerKeys[i]) !== undefined; i++) {
        if (~argv._.indexOf(cmd) && cmd !== completionCommand) {
          setPlaceholderKeys(argv);
          return command.runCommand(cmd, self, parsed);
        }
      }
      if (completionCommand && ~argv._.indexOf(completionCommand) && !argv[completion.completionKey]) {
        if (exitProcess)
          setBlocking(true);
        self.showCompletionScript();
        if (exitProcess) {
          process.exit(0);
        }
      }
      if (completion.completionKey in argv) {
        if (exitProcess)
          setBlocking(true);
        var completionArgs = args.slice(args.indexOf('--' + completion.completionKey) + 1);
        completion.getCompletion(completionArgs, function(completions) {
          ;
          (completions || []).forEach(function(completion) {
            console.log(completion);
          });
          if (exitProcess) {
            process.exit(0);
          }
        });
        return;
      }
      var skipValidation = false;
      Object.keys(argv).forEach(function(key) {
        if (key === helpOpt && argv[key]) {
          if (exitProcess)
            setBlocking(true);
          skipValidation = true;
          self.showHelp('log');
          if (exitProcess) {
            process.exit(0);
          }
        } else if (key === versionOpt && argv[key]) {
          if (exitProcess)
            setBlocking(true);
          skipValidation = true;
          usage.showVersion();
          if (exitProcess) {
            process.exit(0);
          }
        }
      });
      if (!skipValidation && options.skipValidation.length > 0) {
        skipValidation = Object.keys(argv).some(function(key) {
          return options.skipValidation.indexOf(key) >= 0;
        });
      }
      if (!skipValidation) {
        if (parsed.error)
          throw parsed.error;
        if (!argv[completion.completionKey]) {
          validation.nonOptionCount(argv);
          validation.missingArgumentValue(argv);
          validation.requiredArguments(argv);
          if (strict)
            validation.unknownArguments(argv, aliases);
          validation.customChecks(argv, aliases);
          validation.limitedChoices(argv);
          validation.implications(argv);
        }
      }
      setPlaceholderKeys(argv);
      return argv;
    }
    function guessLocale() {
      if (!detectLocale)
        return;
      try {
        const osLocale = require('os-locale');
        self.locale(osLocale.sync({spawn: false}));
      } catch (err) {}
    }
    function setPlaceholderKeys(argv) {
      Object.keys(options.key).forEach(function(key) {
        if (~key.indexOf('.'))
          return;
        if (typeof argv[key] === 'undefined')
          argv[key] = undefined;
      });
    }
    return self;
  }
  exports.rebase = rebase;
  function rebase(base, dir) {
    return path.relative(base, dir);
  }
})(require('process'));
