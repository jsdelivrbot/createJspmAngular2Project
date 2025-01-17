/* */ 
(function(process) {
  !function(e) {
    function t(r) {
      if (n[r])
        return n[r].exports;
      var i = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0);
  }([function(e, t, n) {
    e.exports = n(1);
  }, function(e, t, n) {
    function r(e) {
      e.html5Mode({
        enabled: !0,
        requireBase: !1
      });
    }
    n(2), n(4), n(6), n(8);
    var i = window.angular;
    i.module("BrowserSync", ["bsHistory", "bsClients", "bsDisconnect", "bsNotify", "bsSocket", "bsStore", "ngRoute", "ngTouch", "ngSanitize"]).config(["$locationProvider", r]);
    n(10), n(11), n(12), n(13), n(14), n(15), n(17), n(18), n(22), n(23), n(25);
  }, function(e, t, n) {
    n(3), e.exports = angular;
  }, function(e, t) {
    !function(e, t, n) {
      "use strict";
      function r(e, t) {
        return t = t || Error, function() {
          var n,
              r,
              i = 2,
              o = arguments,
              a = o[0],
              s = "[" + (e ? e + ":" : "") + a + "] ",
              u = o[1];
          for (s += u.replace(/\{\d+\}/g, function(e) {
            var t = +e.slice(1, -1),
                n = t + i;
            return n < o.length ? ye(o[n]) : e;
          }), s += "\nhttp://errors.angularjs.org/1.4.11/" + (e ? e + "/" : "") + a, r = i, n = "?"; r < o.length; r++, n = "&")
            s += n + "p" + (r - i) + "=" + encodeURIComponent(ye(o[r]));
          return new t(s);
        };
      }
      function i(e) {
        if (null == e || O(e))
          return !1;
        if (Lr(e) || S(e) || jr && e instanceof jr)
          return !0;
        var t = "length" in Object(e) && e.length;
        return E(t) && (t >= 0 && (t - 1 in e || e instanceof Array) || "function" == typeof e.item);
      }
      function o(e, t, n) {
        var r,
            a;
        if (e)
          if (k(e))
            for (r in e)
              "prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r, e);
          else if (Lr(e) || i(e)) {
            var s = "object" != typeof e;
            for (r = 0, a = e.length; a > r; r++)
              (s || r in e) && t.call(n, e[r], r, e);
          } else if (e.forEach && e.forEach !== o)
            e.forEach(t, n, e);
          else if (x(e))
            for (r in e)
              t.call(n, e[r], r, e);
          else if ("function" == typeof e.hasOwnProperty)
            for (r in e)
              e.hasOwnProperty(r) && t.call(n, e[r], r, e);
          else
            for (r in e)
              Ar.call(e, r) && t.call(n, e[r], r, e);
        return e;
      }
      function a(e, t, n) {
        for (var r = Object.keys(e).sort(),
            i = 0; i < r.length; i++)
          t.call(n, e[r[i]], r[i]);
        return r;
      }
      function s(e) {
        return function(t, n) {
          e(n, t);
        };
      }
      function u() {
        return ++Br;
      }
      function c(e, t) {
        t ? e.$$hashKey = t : delete e.$$hashKey;
      }
      function l(e, t, n) {
        for (var r = e.$$hashKey,
            i = 0,
            o = t.length; o > i; ++i) {
          var a = t[i];
          if (w(a) || k(a))
            for (var s = Object.keys(a),
                u = 0,
                f = s.length; f > u; u++) {
              var h = s[u],
                  p = a[h];
              n && w(p) ? C(p) ? e[h] = new Date(p.valueOf()) : A(p) ? e[h] = new RegExp(p) : p.nodeName ? e[h] = p.cloneNode(!0) : _(p) ? e[h] = p.clone() : (w(e[h]) || (e[h] = Lr(p) ? [] : {}), l(e[h], [p], !0)) : e[h] = p;
            }
        }
        return c(e, r), e;
      }
      function f(e) {
        return l(e, Pr.call(arguments, 1), !1);
      }
      function h(e) {
        return l(e, Pr.call(arguments, 1), !0);
      }
      function p(e) {
        return parseInt(e, 10);
      }
      function d(e, t) {
        return f(Object.create(e), t);
      }
      function $() {}
      function v(e) {
        return e;
      }
      function m(e) {
        return function() {
          return e;
        };
      }
      function g(e) {
        return k(e.toString) && e.toString !== Rr;
      }
      function y(e) {
        return "undefined" == typeof e;
      }
      function b(e) {
        return "undefined" != typeof e;
      }
      function w(e) {
        return null !== e && "object" == typeof e;
      }
      function x(e) {
        return null !== e && "object" == typeof e && !qr(e);
      }
      function S(e) {
        return "string" == typeof e;
      }
      function E(e) {
        return "number" == typeof e;
      }
      function C(e) {
        return "[object Date]" === Rr.call(e);
      }
      function k(e) {
        return "function" == typeof e;
      }
      function A(e) {
        return "[object RegExp]" === Rr.call(e);
      }
      function O(e) {
        return e && e.window === e;
      }
      function M(e) {
        return e && e.$evalAsync && e.$watch;
      }
      function T(e) {
        return "[object File]" === Rr.call(e);
      }
      function N(e) {
        return "[object FormData]" === Rr.call(e);
      }
      function j(e) {
        return "[object Blob]" === Rr.call(e);
      }
      function V(e) {
        return "boolean" == typeof e;
      }
      function D(e) {
        return e && k(e.then);
      }
      function P(e) {
        return e && E(e.length) && zr.test(Rr.call(e));
      }
      function _(e) {
        return !(!e || !(e.nodeName || e.prop && e.attr && e.find));
      }
      function I(e) {
        var t,
            n = {},
            r = e.split(",");
        for (t = 0; t < r.length; t++)
          n[r[t]] = !0;
        return n;
      }
      function R(e) {
        return kr(e.nodeName || e[0] && e[0].nodeName);
      }
      function q(e, t) {
        var n = e.indexOf(t);
        return n >= 0 && e.splice(n, 1), n;
      }
      function U(e, t) {
        function n(e, t) {
          var n,
              i = t.$$hashKey;
          if (Lr(e))
            for (var o = 0,
                a = e.length; a > o; o++)
              t.push(r(e[o]));
          else if (x(e))
            for (n in e)
              t[n] = r(e[n]);
          else if (e && "function" == typeof e.hasOwnProperty)
            for (n in e)
              e.hasOwnProperty(n) && (t[n] = r(e[n]));
          else
            for (n in e)
              Ar.call(e, n) && (t[n] = r(e[n]));
          return c(t, i), t;
        }
        function r(e) {
          if (!w(e))
            return e;
          var t = i.indexOf(e);
          if (-1 !== t)
            return a[t];
          if (O(e) || M(e))
            throw Ur("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
          var r,
              o = !1;
          return Lr(e) ? (r = [], o = !0) : P(e) ? r = new e.constructor(e) : C(e) ? r = new Date(e.getTime()) : A(e) ? (r = new RegExp(e.source, e.toString().match(/[^\/]*$/)[0]), r.lastIndex = e.lastIndex) : j(e) ? r = new e.constructor([e], {type: e.type}) : k(e.cloneNode) ? r = e.cloneNode(!0) : (r = Object.create(qr(e)), o = !0), i.push(e), a.push(r), o ? n(e, r) : r;
        }
        var i = [],
            a = [];
        if (t) {
          if (P(t))
            throw Ur("cpta", "Can't copy! TypedArray destination cannot be mutated.");
          if (e === t)
            throw Ur("cpi", "Can't copy! Source and destination are identical.");
          return Lr(t) ? t.length = 0 : o(t, function(e, n) {
            "$$hashKey" !== n && delete t[n];
          }), i.push(e), a.push(t), n(e, t);
        }
        return r(e);
      }
      function F(e, t) {
        if (Lr(e)) {
          t = t || [];
          for (var n = 0,
              r = e.length; r > n; n++)
            t[n] = e[n];
        } else if (w(e)) {
          t = t || {};
          for (var i in e)
            "$" === i.charAt(0) && "$" === i.charAt(1) || (t[i] = e[i]);
        }
        return t || e;
      }
      function B(e, t) {
        if (e === t)
          return !0;
        if (null === e || null === t)
          return !1;
        if (e !== e && t !== t)
          return !0;
        var n,
            r,
            i,
            o = typeof e,
            a = typeof t;
        if (o == a && "object" == o) {
          if (!Lr(e)) {
            if (C(e))
              return C(t) ? B(e.getTime(), t.getTime()) : !1;
            if (A(e))
              return A(t) ? e.toString() == t.toString() : !1;
            if (M(e) || M(t) || O(e) || O(t) || Lr(t) || C(t) || A(t))
              return !1;
            i = ve();
            for (r in e)
              if ("$" !== r.charAt(0) && !k(e[r])) {
                if (!B(e[r], t[r]))
                  return !1;
                i[r] = !0;
              }
            for (r in t)
              if (!(r in i) && "$" !== r.charAt(0) && b(t[r]) && !k(t[r]))
                return !1;
            return !0;
          }
          if (!Lr(t))
            return !1;
          if ((n = e.length) == t.length) {
            for (r = 0; n > r; r++)
              if (!B(e[r], t[r]))
                return !1;
            return !0;
          }
        }
        return !1;
      }
      function H(e, t, n) {
        return e.concat(Pr.call(t, n));
      }
      function L(e, t) {
        return Pr.call(e, t || 0);
      }
      function z(e, t) {
        var n = arguments.length > 2 ? L(arguments, 2) : [];
        return !k(t) || t instanceof RegExp ? t : n.length ? function() {
          return arguments.length ? t.apply(e, H(n, arguments, 0)) : t.apply(e, n);
        } : function() {
          return arguments.length ? t.apply(e, arguments) : t.call(e);
        };
      }
      function W(e, r) {
        var i = r;
        return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? i = n : O(r) ? i = "$WINDOW" : r && t === r ? i = "$DOCUMENT" : M(r) && (i = "$SCOPE"), i;
      }
      function G(e, t) {
        return y(e) ? n : (E(t) || (t = t ? 2 : null), JSON.stringify(e, W, t));
      }
      function Y(e) {
        return S(e) ? JSON.parse(e) : e;
      }
      function J(e, t) {
        e = e.replace(Xr, "");
        var n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(n) ? t : n;
      }
      function X(e, t) {
        return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e;
      }
      function Z(e, t, n) {
        n = n ? -1 : 1;
        var r = e.getTimezoneOffset(),
            i = J(t, r);
        return X(e, n * (i - r));
      }
      function K(e) {
        e = jr(e).clone();
        try {
          e.empty();
        } catch (t) {}
        var n = jr("<div>").append(e).html();
        try {
          return e[0].nodeType === ni ? kr(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
            return "<" + kr(t);
          });
        } catch (t) {
          return kr(n);
        }
      }
      function Q(e) {
        try {
          return decodeURIComponent(e);
        } catch (t) {}
      }
      function ee(e) {
        var t = {};
        return o((e || "").split("&"), function(e) {
          var n,
              r,
              i;
          e && (r = e = e.replace(/\+/g, "%20"), n = e.indexOf("="), -1 !== n && (r = e.substring(0, n), i = e.substring(n + 1)), r = Q(r), b(r) && (i = b(i) ? Q(i) : !0, Ar.call(t, r) ? Lr(t[r]) ? t[r].push(i) : t[r] = [t[r], i] : t[r] = i));
        }), t;
      }
      function te(e) {
        var t = [];
        return o(e, function(e, n) {
          Lr(e) ? o(e, function(e) {
            t.push(re(n, !0) + (e === !0 ? "" : "=" + re(e, !0)));
          }) : t.push(re(n, !0) + (e === !0 ? "" : "=" + re(e, !0)));
        }), t.length ? t.join("&") : "";
      }
      function ne(e) {
        return re(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
      }
      function re(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, t ? "%20" : "+");
      }
      function ie(e, t) {
        var n,
            r,
            i = Zr.length;
        for (r = 0; i > r; ++r)
          if (n = Zr[r] + t, S(n = e.getAttribute(n)))
            return n;
        return null;
      }
      function oe(e, t) {
        var n,
            r,
            i = {};
        o(Zr, function(t) {
          var i = t + "app";
          !n && e.hasAttribute && e.hasAttribute(i) && (n = e, r = e.getAttribute(i));
        }), o(Zr, function(t) {
          var i,
              o = t + "app";
          !n && (i = e.querySelector("[" + o.replace(":", "\\:") + "]")) && (n = i, r = i.getAttribute(o));
        }), n && (i.strictDi = null !== ie(n, "strict-di"), t(n, r ? [r] : [], i));
      }
      function ae(n, r, i) {
        w(i) || (i = {});
        var a = {strictDi: !1};
        i = f(a, i);
        var s = function() {
          if (n = jr(n), n.injector()) {
            var e = n[0] === t ? "document" : K(n);
            throw Ur("btstrpd", "App already bootstrapped with this element '{0}'", e.replace(/</, "&lt;").replace(/>/, "&gt;"));
          }
          r = r || [], r.unshift(["$provide", function(e) {
            e.value("$rootElement", n);
          }]), i.debugInfoEnabled && r.push(["$compileProvider", function(e) {
            e.debugInfoEnabled(!0);
          }]), r.unshift("ng");
          var o = tt(r, i.strictDi);
          return o.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(e, t, n, r) {
            e.$apply(function() {
              t.data("$injector", r), n(t)(e);
            });
          }]), o;
        },
            u = /^NG_ENABLE_DEBUG_INFO!/,
            c = /^NG_DEFER_BOOTSTRAP!/;
        return e && u.test(e.name) && (i.debugInfoEnabled = !0, e.name = e.name.replace(u, "")), e && !c.test(e.name) ? s() : (e.name = e.name.replace(c, ""), Fr.resumeBootstrap = function(e) {
          return o(e, function(e) {
            r.push(e);
          }), s();
        }, void(k(Fr.resumeDeferredBootstrap) && Fr.resumeDeferredBootstrap()));
      }
      function se() {
        e.name = "NG_ENABLE_DEBUG_INFO!" + e.name, e.location.reload();
      }
      function ue(e) {
        var t = Fr.element(e).injector();
        if (!t)
          throw Ur("test", "no injector found for element argument to getTestability");
        return t.get("$$testability");
      }
      function ce(e, t) {
        return t = t || "_", e.replace(Kr, function(e, n) {
          return (n ? t : "") + e.toLowerCase();
        });
      }
      function le() {
        var t;
        if (!Qr) {
          var r = Jr();
          Vr = y(r) ? e.jQuery : r ? e[r] : n, Vr && Vr.fn.on ? (jr = Vr, f(Vr.fn, {
            scope: wi.scope,
            isolateScope: wi.isolateScope,
            controller: wi.controller,
            injector: wi.injector,
            inheritedData: wi.inheritedData
          }), t = Vr.cleanData, Vr.cleanData = function(e) {
            var n;
            if (Hr)
              Hr = !1;
            else
              for (var r,
                  i = 0; null != (r = e[i]); i++)
                n = Vr._data(r, "events"), n && n.$destroy && Vr(r).triggerHandler("$destroy");
            t(e);
          }) : jr = Me, Fr.element = jr, Qr = !0;
        }
      }
      function fe(e, t, n) {
        if (!e)
          throw Ur("areq", "Argument '{0}' is {1}", t || "?", n || "required");
        return e;
      }
      function he(e, t, n) {
        return n && Lr(e) && (e = e[e.length - 1]), fe(k(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e;
      }
      function pe(e, t) {
        if ("hasOwnProperty" === e)
          throw Ur("badname", "hasOwnProperty is not a valid {0} name", t);
      }
      function de(e, t, n) {
        if (!t)
          return e;
        for (var r,
            i = t.split("."),
            o = e,
            a = i.length,
            s = 0; a > s; s++)
          r = i[s], e && (e = (o = e)[r]);
        return !n && k(e) ? z(o, e) : e;
      }
      function $e(e) {
        for (var t,
            n = e[0],
            r = e[e.length - 1],
            i = 1; n !== r && (n = n.nextSibling); i++)
          (t || e[i] !== n) && (t || (t = jr(Pr.call(e, 0, i))), t.push(n));
        return t || e;
      }
      function ve() {
        return Object.create(null);
      }
      function me(e) {
        function t(e, t, n) {
          return e[t] || (e[t] = n());
        }
        var n = r("$injector"),
            i = r("ng"),
            o = t(e, "angular", Object);
        return o.$$minErr = o.$$minErr || r, t(o, "module", function() {
          var e = {};
          return function(r, o, a) {
            var s = function(e, t) {
              if ("hasOwnProperty" === e)
                throw i("badname", "hasOwnProperty is not a valid {0} name", t);
            };
            return s(r, "module"), o && e.hasOwnProperty(r) && (e[r] = null), t(e, r, function() {
              function e(e, t, n, r) {
                return r || (r = i), function() {
                  return r[n || "push"]([e, t, arguments]), l;
                };
              }
              function t(e, t) {
                return function(n, o) {
                  return o && k(o) && (o.$$moduleName = r), i.push([e, t, arguments]), l;
                };
              }
              if (!o)
                throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
              var i = [],
                  s = [],
                  u = [],
                  c = e("$injector", "invoke", "push", s),
                  l = {
                    _invokeQueue: i,
                    _configBlocks: s,
                    _runBlocks: u,
                    requires: o,
                    name: r,
                    provider: t("$provide", "provider"),
                    factory: t("$provide", "factory"),
                    service: t("$provide", "service"),
                    value: e("$provide", "value"),
                    constant: e("$provide", "constant", "unshift"),
                    decorator: t("$provide", "decorator"),
                    animation: t("$animateProvider", "register"),
                    filter: t("$filterProvider", "register"),
                    controller: t("$controllerProvider", "register"),
                    directive: t("$compileProvider", "directive"),
                    config: c,
                    run: function(e) {
                      return u.push(e), this;
                    }
                  };
              return a && c(a), l;
            });
          };
        });
      }
      function ge(e) {
        var t = [];
        return JSON.stringify(e, function(e, n) {
          if (n = W(e, n), w(n)) {
            if (t.indexOf(n) >= 0)
              return "...";
            t.push(n);
          }
          return n;
        });
      }
      function ye(e) {
        return "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : y(e) ? "undefined" : "string" != typeof e ? ge(e) : e;
      }
      function be(t) {
        f(t, {
          bootstrap: ae,
          copy: U,
          extend: f,
          merge: h,
          equals: B,
          element: jr,
          forEach: o,
          injector: tt,
          noop: $,
          bind: z,
          toJson: G,
          fromJson: Y,
          identity: v,
          isUndefined: y,
          isDefined: b,
          isString: S,
          isFunction: k,
          isObject: w,
          isNumber: E,
          isElement: _,
          isArray: Lr,
          version: ai,
          isDate: C,
          lowercase: kr,
          uppercase: Or,
          callbacks: {counter: 0},
          getTestability: ue,
          $$minErr: r,
          $$csp: Yr,
          reloadWithDebugInfo: se
        }), (Dr = me(e))("ng", ["ngLocale"], ["$provide", function(e) {
          e.provider({$$sanitizeUri: bn}), e.provider("$compile", ft).directive({
            a: ko,
            input: zo,
            textarea: zo,
            form: No,
            script: Ia,
            select: Ua,
            style: Ba,
            option: Fa,
            ngBind: Yo,
            ngBindHtml: Xo,
            ngBindTemplate: Jo,
            ngClass: Ko,
            ngClassEven: ea,
            ngClassOdd: Qo,
            ngCloak: ta,
            ngController: na,
            ngForm: jo,
            ngHide: Na,
            ngIf: oa,
            ngInclude: aa,
            ngInit: ua,
            ngNonBindable: xa,
            ngPluralize: ka,
            ngRepeat: Aa,
            ngShow: Ta,
            ngStyle: ja,
            ngSwitch: Va,
            ngSwitchWhen: Da,
            ngSwitchDefault: Pa,
            ngOptions: Ca,
            ngTransclude: _a,
            ngModel: ya,
            ngList: ca,
            ngChange: Zo,
            pattern: La,
            ngPattern: La,
            required: Ha,
            ngRequired: Ha,
            minlength: Wa,
            ngMinlength: Wa,
            maxlength: za,
            ngMaxlength: za,
            ngValue: Go,
            ngModelOptions: wa
          }).directive({ngInclude: sa}).directive(Ao).directive(ra), e.provider({
            $anchorScroll: nt,
            $animate: _i,
            $animateCss: qi,
            $$animateJs: Di,
            $$animateQueue: Pi,
            $$AnimateRunner: Ri,
            $$animateAsyncRun: Ii,
            $browser: ut,
            $cacheFactory: ct,
            $controller: vt,
            $document: mt,
            $exceptionHandler: gt,
            $filter: Dn,
            $$forceReflow: Li,
            $interpolate: jt,
            $interval: Vt,
            $http: Ot,
            $httpParamSerializer: bt,
            $httpParamSerializerJQLike: wt,
            $httpBackend: Tt,
            $xhrFactory: Mt,
            $location: Gt,
            $log: Yt,
            $parse: dn,
            $rootScope: yn,
            $q: $n,
            $$q: vn,
            $sce: En,
            $sceDelegate: Sn,
            $sniffer: Cn,
            $templateCache: lt,
            $templateRequest: kn,
            $$testability: An,
            $timeout: On,
            $window: Nn,
            $$rAF: gn,
            $$jqLite: Xe,
            $$HashMap: Ci,
            $$cookieReader: Vn
          });
        }]);
      }
      function we() {
        return ++ui;
      }
      function xe(e) {
        return e.replace(fi, function(e, t, n, r) {
          return r ? n.toUpperCase() : n;
        }).replace(hi, "Moz$1");
      }
      function Se(e) {
        return !vi.test(e);
      }
      function Ee(e) {
        var t = e.nodeType;
        return t === ei || !t || t === ii;
      }
      function Ce(e) {
        for (var t in si[e.ng339])
          return !0;
        return !1;
      }
      function ke(e, t) {
        var n,
            r,
            i,
            a,
            s = t.createDocumentFragment(),
            u = [];
        if (Se(e))
          u.push(t.createTextNode(e));
        else {
          for (n = n || s.appendChild(t.createElement("div")), r = (mi.exec(e) || ["", ""])[1].toLowerCase(), i = yi[r] || yi._default, n.innerHTML = i[1] + e.replace(gi, "<$1></$2>") + i[2], a = i[0]; a--; )
            n = n.lastChild;
          u = H(u, n.childNodes), n = s.firstChild, n.textContent = "";
        }
        return s.textContent = "", s.innerHTML = "", o(u, function(e) {
          s.appendChild(e);
        }), s;
      }
      function Ae(e, n) {
        n = n || t;
        var r;
        return (r = $i.exec(e)) ? [n.createElement(r[1])] : (r = ke(e, n)) ? r.childNodes : [];
      }
      function Oe(e, t) {
        var n = e.parentNode;
        n && n.replaceChild(t, e), t.appendChild(e);
      }
      function Me(e) {
        if (e instanceof Me)
          return e;
        var t;
        if (S(e) && (e = Wr(e), t = !0), !(this instanceof Me)) {
          if (t && "<" != e.charAt(0))
            throw di("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
          return new Me(e);
        }
        t ? qe(this, Ae(e)) : qe(this, e);
      }
      function Te(e) {
        return e.cloneNode(!0);
      }
      function Ne(e, t) {
        if (t || Ve(e), e.querySelectorAll)
          for (var n = e.querySelectorAll("*"),
              r = 0,
              i = n.length; i > r; r++)
            Ve(n[r]);
      }
      function je(e, t, n, r) {
        if (b(r))
          throw di("offargs", "jqLite#off() does not support the `selector` argument");
        var i = De(e),
            a = i && i.events,
            s = i && i.handle;
        if (s)
          if (t) {
            var u = function(t) {
              var r = a[t];
              b(n) && q(r || [], n), b(n) && r && r.length > 0 || (li(e, t, s), delete a[t]);
            };
            o(t.split(" "), function(e) {
              u(e), pi[e] && u(pi[e]);
            });
          } else
            for (t in a)
              "$destroy" !== t && li(e, t, s), delete a[t];
      }
      function Ve(e, t) {
        var r = e.ng339,
            i = r && si[r];
        if (i) {
          if (t)
            return void delete i.data[t];
          i.handle && (i.events.$destroy && i.handle({}, "$destroy"), je(e)), delete si[r], e.ng339 = n;
        }
      }
      function De(e, t) {
        var r = e.ng339,
            i = r && si[r];
        return t && !i && (e.ng339 = r = we(), i = si[r] = {
          events: {},
          data: {},
          handle: n
        }), i;
      }
      function Pe(e, t, n) {
        if (Ee(e)) {
          var r = b(n),
              i = !r && t && !w(t),
              o = !t,
              a = De(e, !i),
              s = a && a.data;
          if (r)
            s[t] = n;
          else {
            if (o)
              return s;
            if (i)
              return s && s[t];
            f(s, t);
          }
        }
      }
      function _e(e, t) {
        return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1;
      }
      function Ie(e, t) {
        t && e.setAttribute && o(t.split(" "), function(t) {
          e.setAttribute("class", Wr((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Wr(t) + " ", " ")));
        });
      }
      function Re(e, t) {
        if (t && e.setAttribute) {
          var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
          o(t.split(" "), function(e) {
            e = Wr(e), -1 === n.indexOf(" " + e + " ") && (n += e + " ");
          }), e.setAttribute("class", Wr(n));
        }
      }
      function qe(e, t) {
        if (t)
          if (t.nodeType)
            e[e.length++] = t;
          else {
            var n = t.length;
            if ("number" == typeof n && t.window !== t) {
              if (n)
                for (var r = 0; n > r; r++)
                  e[e.length++] = t[r];
            } else
              e[e.length++] = t;
          }
      }
      function Ue(e, t) {
        return Fe(e, "$" + (t || "ngController") + "Controller");
      }
      function Fe(e, t, n) {
        e.nodeType == ii && (e = e.documentElement);
        for (var r = Lr(t) ? t : [t]; e; ) {
          for (var i = 0,
              o = r.length; o > i; i++)
            if (b(n = jr.data(e, r[i])))
              return n;
          e = e.parentNode || e.nodeType === oi && e.host;
        }
      }
      function Be(e) {
        for (Ne(e, !0); e.firstChild; )
          e.removeChild(e.firstChild);
      }
      function He(e, t) {
        t || Ne(e);
        var n = e.parentNode;
        n && n.removeChild(e);
      }
      function Le(t, n) {
        n = n || e, "complete" === n.document.readyState ? n.setTimeout(t) : jr(n).on("load", t);
      }
      function ze(e, t) {
        var n = xi[t.toLowerCase()];
        return n && Si[R(e)] && n;
      }
      function We(e) {
        return Ei[e];
      }
      function Ge(e, t) {
        var n = function(n, r) {
          n.isDefaultPrevented = function() {
            return n.defaultPrevented;
          };
          var i = t[r || n.type],
              o = i ? i.length : 0;
          if (o) {
            if (y(n.immediatePropagationStopped)) {
              var a = n.stopImmediatePropagation;
              n.stopImmediatePropagation = function() {
                n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n);
              };
            }
            n.isImmediatePropagationStopped = function() {
              return n.immediatePropagationStopped === !0;
            };
            var s = i.specialHandlerWrapper || Ye;
            o > 1 && (i = F(i));
            for (var u = 0; o > u; u++)
              n.isImmediatePropagationStopped() || s(e, n, i[u]);
          }
        };
        return n.elem = e, n;
      }
      function Ye(e, t, n) {
        n.call(e, t);
      }
      function Je(e, t, n) {
        var r = t.relatedTarget;
        r && (r === e || bi.call(e, r)) || n.call(e, t);
      }
      function Xe() {
        this.$get = function() {
          return f(Me, {
            hasClass: function(e, t) {
              return e.attr && (e = e[0]), _e(e, t);
            },
            addClass: function(e, t) {
              return e.attr && (e = e[0]), Re(e, t);
            },
            removeClass: function(e, t) {
              return e.attr && (e = e[0]), Ie(e, t);
            }
          });
        };
      }
      function Ze(e, t) {
        var n = e && e.$$hashKey;
        if (n)
          return "function" == typeof n && (n = e.$$hashKey()), n;
        var r = typeof e;
        return n = "function" == r || "object" == r && null !== e ? e.$$hashKey = r + ":" + (t || u)() : r + ":" + e;
      }
      function Ke(e, t) {
        if (t) {
          var n = 0;
          this.nextUid = function() {
            return ++n;
          };
        }
        o(e, this.put, this);
      }
      function Qe(e) {
        var t = e.toString().replace(Mi, ""),
            n = t.match(ki);
        return n ? "function(" + (n[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
      }
      function et(e, t, n) {
        var r,
            i,
            a,
            s;
        if ("function" == typeof e) {
          if (!(r = e.$inject)) {
            if (r = [], e.length) {
              if (t)
                throw S(n) && n || (n = e.name || Qe(e)), Ti("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
              i = e.toString().replace(Mi, ""), a = i.match(ki), o(a[1].split(Ai), function(e) {
                e.replace(Oi, function(e, t, n) {
                  r.push(n);
                });
              });
            }
            e.$inject = r;
          }
        } else
          Lr(e) ? (s = e.length - 1, he(e[s], "fn"), r = e.slice(0, s)) : he(e, "fn", !0);
        return r;
      }
      function tt(e, t) {
        function r(e) {
          return function(t, n) {
            return w(t) ? void o(t, s(e)) : e(t, n);
          };
        }
        function i(e, t) {
          if (pe(e, "service"), (k(t) || Lr(t)) && (t = E.instantiate(t)), !t.$get)
            throw Ti("pget", "Provider '{0}' must define $get factory method.", e);
          return x[e + v] = t;
        }
        function a(e, t) {
          return function() {
            var n = A.invoke(t, this);
            if (y(n))
              throw Ti("undef", "Provider '{0}' must return a value from $get factory method.", e);
            return n;
          };
        }
        function u(e, t, n) {
          return i(e, {$get: n !== !1 ? a(e, t) : t});
        }
        function c(e, t) {
          return u(e, ["$injector", function(e) {
            return e.instantiate(t);
          }]);
        }
        function l(e, t) {
          return u(e, m(t), !1);
        }
        function f(e, t) {
          pe(e, "constant"), x[e] = t, C[e] = t;
        }
        function h(e, t) {
          var n = E.get(e + v),
              r = n.$get;
          n.$get = function() {
            var e = A.invoke(r, n);
            return A.invoke(t, null, {$delegate: e});
          };
        }
        function p(e) {
          fe(y(e) || Lr(e), "modulesToLoad", "not an array");
          var t,
              n = [];
          return o(e, function(e) {
            function r(e) {
              var t,
                  n;
              for (t = 0, n = e.length; n > t; t++) {
                var r = e[t],
                    i = E.get(r[0]);
                i[r[1]].apply(i, r[2]);
              }
            }
            if (!b.get(e)) {
              b.put(e, !0);
              try {
                S(e) ? (t = Dr(e), n = n.concat(p(t.requires)).concat(t._runBlocks), r(t._invokeQueue), r(t._configBlocks)) : k(e) ? n.push(E.invoke(e)) : Lr(e) ? n.push(E.invoke(e)) : he(e, "module");
              } catch (i) {
                throw Lr(e) && (e = e[e.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), Ti("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, i.stack || i.message || i);
              }
            }
          }), n;
        }
        function d(e, n) {
          function r(t, r) {
            if (e.hasOwnProperty(t)) {
              if (e[t] === $)
                throw Ti("cdep", "Circular dependency found: {0}", t + " <- " + g.join(" <- "));
              return e[t];
            }
            try {
              return g.unshift(t), e[t] = $, e[t] = n(t, r);
            } catch (i) {
              throw e[t] === $ && delete e[t], i;
            } finally {
              g.shift();
            }
          }
          function i(e, n, i, o) {
            "string" == typeof i && (o = i, i = null);
            var a,
                s,
                u,
                c = [],
                l = tt.$$annotate(e, t, o);
            for (s = 0, a = l.length; a > s; s++) {
              if (u = l[s], "string" != typeof u)
                throw Ti("itkn", "Incorrect injection token! Expected service name as string, got {0}", u);
              c.push(i && i.hasOwnProperty(u) ? i[u] : r(u, o));
            }
            return Lr(e) && (e = e[a]), e.apply(n, c);
          }
          function o(e, t, n) {
            var r = Object.create((Lr(e) ? e[e.length - 1] : e).prototype || null),
                o = i(e, r, t, n);
            return w(o) || k(o) ? o : r;
          }
          return {
            invoke: i,
            instantiate: o,
            get: r,
            annotate: tt.$$annotate,
            has: function(t) {
              return x.hasOwnProperty(t + v) || e.hasOwnProperty(t);
            }
          };
        }
        t = t === !0;
        var $ = {},
            v = "Provider",
            g = [],
            b = new Ke([], !0),
            x = {$provide: {
                provider: r(i),
                factory: r(u),
                service: r(c),
                value: r(l),
                constant: r(f),
                decorator: h
              }},
            E = x.$injector = d(x, function(e, t) {
              throw Fr.isString(t) && g.push(t), Ti("unpr", "Unknown provider: {0}", g.join(" <- "));
            }),
            C = {},
            A = C.$injector = d(C, function(e, t) {
              var r = E.get(e + v, t);
              return A.invoke(r.$get, r, n, e);
            });
        return o(p(e), function(e) {
          e && A.invoke(e);
        }), A;
      }
      function nt() {
        var e = !0;
        this.disableAutoScrolling = function() {
          e = !1;
        }, this.$get = ["$window", "$location", "$rootScope", function(t, n, r) {
          function i(e) {
            var t = null;
            return Array.prototype.some.call(e, function(e) {
              return "a" === R(e) ? (t = e, !0) : void 0;
            }), t;
          }
          function o() {
            var e = s.yOffset;
            if (k(e))
              e = e();
            else if (_(e)) {
              var n = e[0],
                  r = t.getComputedStyle(n);
              e = "fixed" !== r.position ? 0 : n.getBoundingClientRect().bottom;
            } else
              E(e) || (e = 0);
            return e;
          }
          function a(e) {
            if (e) {
              e.scrollIntoView();
              var n = o();
              if (n) {
                var r = e.getBoundingClientRect().top;
                t.scrollBy(0, r - n);
              }
            } else
              t.scrollTo(0, 0);
          }
          function s(e) {
            e = S(e) ? e : n.hash();
            var t;
            e ? (t = u.getElementById(e)) ? a(t) : (t = i(u.getElementsByName(e))) ? a(t) : "top" === e && a(null) : a(null);
          }
          var u = t.document;
          return e && r.$watch(function() {
            return n.hash();
          }, function(e, t) {
            e === t && "" === e || Le(function() {
              r.$evalAsync(s);
            });
          }), s;
        }];
      }
      function rt(e, t) {
        return e || t ? e ? t ? (Lr(e) && (e = e.join(" ")), Lr(t) && (t = t.join(" ")), e + " " + t) : e : t : "";
      }
      function it(e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];
          if (n.nodeType === ji)
            return n;
        }
      }
      function ot(e) {
        S(e) && (e = e.split(" "));
        var t = ve();
        return o(e, function(e) {
          e.length && (t[e] = !0);
        }), t;
      }
      function at(e) {
        return w(e) ? e : {};
      }
      function st(e, t, n, r) {
        function i(e) {
          try {
            e.apply(null, L(arguments, 1));
          } finally {
            if (g--, 0 === g)
              for (; b.length; )
                try {
                  b.pop()();
                } catch (t) {
                  n.error(t);
                }
          }
        }
        function a(e) {
          var t = e.indexOf("#");
          return -1 === t ? "" : e.substr(t);
        }
        function s() {
          C = null, c(), l();
        }
        function u() {
          try {
            return p.state;
          } catch (e) {}
        }
        function c() {
          w = u(), w = y(w) ? null : w, B(w, O) && (w = O), O = w;
        }
        function l() {
          S === f.url() && x === w || (S = f.url(), x = w, o(k, function(e) {
            e(f.url(), w);
          }));
        }
        var f = this,
            h = (t[0], e.location),
            p = e.history,
            d = e.setTimeout,
            v = e.clearTimeout,
            m = {};
        f.isMock = !1;
        var g = 0,
            b = [];
        f.$$completeOutstandingRequest = i, f.$$incOutstandingRequestCount = function() {
          g++;
        }, f.notifyWhenNoOutstandingRequests = function(e) {
          0 === g ? e() : b.push(e);
        };
        var w,
            x,
            S = h.href,
            E = t.find("base"),
            C = null;
        c(), x = w, f.url = function(t, n, i) {
          if (y(i) && (i = null), h !== e.location && (h = e.location), p !== e.history && (p = e.history), t) {
            var o = x === i;
            if (S === t && (!r.history || o))
              return f;
            var s = S && Rt(S) === Rt(t);
            return S = t, x = i, !r.history || s && o ? (s && !C || (C = t), n ? h.replace(t) : s ? h.hash = a(t) : h.href = t, h.href !== t && (C = t)) : (p[n ? "replaceState" : "pushState"](i, "", t), c(), x = w), f;
          }
          return C || h.href.replace(/%27/g, "'");
        }, f.state = function() {
          return w;
        };
        var k = [],
            A = !1,
            O = null;
        f.onUrlChange = function(t) {
          return A || (r.history && jr(e).on("popstate", s), jr(e).on("hashchange", s), A = !0), k.push(t), t;
        }, f.$$applicationDestroyed = function() {
          jr(e).off("hashchange popstate", s);
        }, f.$$checkUrlChange = l, f.baseHref = function() {
          var e = E.attr("href");
          return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        }, f.defer = function(e, t) {
          var n;
          return g++, n = d(function() {
            delete m[n], i(e);
          }, t || 0), m[n] = !0, n;
        }, f.defer.cancel = function(e) {
          return m[e] ? (delete m[e], v(e), i($), !0) : !1;
        };
      }
      function ut() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(e, t, n, r) {
          return new st(e, r, t, n);
        }];
      }
      function ct() {
        this.$get = function() {
          function e(e, n) {
            function i(e) {
              e != h && (p ? p == e && (p = e.n) : p = e, o(e.n, e.p), o(e, h), h = e, h.n = null);
            }
            function o(e, t) {
              e != t && (e && (e.p = t), t && (t.n = e));
            }
            if (e in t)
              throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
            var a = 0,
                s = f({}, n, {id: e}),
                u = ve(),
                c = n && n.capacity || Number.MAX_VALUE,
                l = ve(),
                h = null,
                p = null;
            return t[e] = {
              put: function(e, t) {
                if (!y(t)) {
                  if (c < Number.MAX_VALUE) {
                    var n = l[e] || (l[e] = {key: e});
                    i(n);
                  }
                  return e in u || a++, u[e] = t, a > c && this.remove(p.key), t;
                }
              },
              get: function(e) {
                if (c < Number.MAX_VALUE) {
                  var t = l[e];
                  if (!t)
                    return;
                  i(t);
                }
                return u[e];
              },
              remove: function(e) {
                if (c < Number.MAX_VALUE) {
                  var t = l[e];
                  if (!t)
                    return;
                  t == h && (h = t.p), t == p && (p = t.n), o(t.n, t.p), delete l[e];
                }
                e in u && (delete u[e], a--);
              },
              removeAll: function() {
                u = ve(), a = 0, l = ve(), h = p = null;
              },
              destroy: function() {
                u = null, s = null, l = null, delete t[e];
              },
              info: function() {
                return f({}, s, {size: a});
              }
            };
          }
          var t = {};
          return e.info = function() {
            var e = {};
            return o(t, function(t, n) {
              e[n] = t.info();
            }), e;
          }, e.get = function(e) {
            return t[e];
          }, e;
        };
      }
      function lt() {
        this.$get = ["$cacheFactory", function(e) {
          return e("templates");
        }];
      }
      function ft(e, r) {
        function i(e, t, n) {
          var r = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
              i = ve();
          return o(e, function(e, o) {
            if (e in C)
              return void(i[o] = C[e]);
            var a = e.match(r);
            if (!a)
              throw Ui("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", t, o, e, n ? "controller bindings definition" : "isolate scope definition");
            i[o] = {
              mode: a[1][0],
              collection: "*" === a[2],
              optional: "?" === a[3],
              attrName: a[4] || o
            }, a[4] && (C[e] = i[o]);
          }), i;
        }
        function a(e, t) {
          var n = {
            isolateScope: null,
            bindToController: null
          };
          if (w(e.scope) && (e.bindToController === !0 ? (n.bindToController = i(e.scope, t, !0), n.isolateScope = {}) : n.isolateScope = i(e.scope, t, !1)), w(e.bindToController) && (n.bindToController = i(e.bindToController, t, !0)), w(n.bindToController)) {
            var r = e.controller,
                o = e.controllerAs;
            if (!r)
              throw Ui("noctrl", "Cannot bind to controller without directive '{0}'s controller.", t);
            if (!$t(r, o))
              throw Ui("noident", "Cannot bind to controller without identifier for directive '{0}'.", t);
          }
          return n;
        }
        function u(e) {
          var t = e.charAt(0);
          if (!t || t !== kr(t))
            throw Ui("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", e);
          if (e !== e.trim())
            throw Ui("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", e);
        }
        var c = {},
            l = "Directive",
            h = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
            p = /(([\w\-]+)(?:\:([^;]+))?;?)/,
            g = I("ngSrc,ngSrcset,src,srcset"),
            x = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
            E = /^(on[a-z]+|formaction)$/,
            C = ve();
        this.directive = function O(t, n) {
          return pe(t, "directive"), S(t) ? (u(t), fe(n, "directiveFactory"), c.hasOwnProperty(t) || (c[t] = [], e.factory(t + l, ["$injector", "$exceptionHandler", function(e, n) {
            var r = [];
            return o(c[t], function(i, o) {
              try {
                var a = e.invoke(i);
                k(a) ? a = {compile: m(a)} : !a.compile && a.link && (a.compile = m(a.link)), a.priority = a.priority || 0, a.index = o, a.name = a.name || t, a.require = a.require || a.controller && a.name, a.restrict = a.restrict || "EA", a.$$moduleName = i.$$moduleName, r.push(a);
              } catch (s) {
                n(s);
              }
            }), r;
          }])), c[t].push(n)) : o(t, s(O)), this;
        }, this.aHrefSanitizationWhitelist = function(e) {
          return b(e) ? (r.aHrefSanitizationWhitelist(e), this) : r.aHrefSanitizationWhitelist();
        }, this.imgSrcSanitizationWhitelist = function(e) {
          return b(e) ? (r.imgSrcSanitizationWhitelist(e), this) : r.imgSrcSanitizationWhitelist();
        };
        var A = !0;
        this.debugInfoEnabled = function(e) {
          return b(e) ? (A = e, this) : A;
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function(e, r, i, s, u, m, C, O, T, N) {
          function j(e, t) {
            try {
              e.addClass(t);
            } catch (n) {}
          }
          function D(e, n, r, i, o) {
            e instanceof jr || (e = jr(e));
            for (var a = /\S+/,
                s = 0,
                u = e.length; u > s; s++) {
              var c = e[s];
              c.nodeType === ni && c.nodeValue.match(a) && Oe(c, e[s] = t.createElement("span"));
            }
            var l = _(e, n, e, r, i, o);
            D.$$addScopeClass(e);
            var f = null;
            return function(t, n, r) {
              fe(t, "scope"), o && o.needsNewScope && (t = t.$parent.$new()), r = r || {};
              var i = r.parentBoundTranscludeFn,
                  a = r.transcludeControllers,
                  s = r.futureParentElement;
              i && i.$$boundTransclude && (i = i.$$boundTransclude), f || (f = P(s));
              var u;
              if (u = "html" !== f ? jr(te(f, jr("<div>").append(e).html())) : n ? wi.clone.call(e) : e, a)
                for (var c in a)
                  u.data("$" + c + "Controller", a[c].instance);
              return D.$$addScopeInfo(u, t), n && n(u, t), l && l(t, u, u, i), u;
            };
          }
          function P(e) {
            var t = e && e[0];
            return t && "foreignobject" !== R(t) && t.toString().match(/SVG/) ? "svg" : "html";
          }
          function _(e, t, r, i, o, a) {
            function s(e, r, i, o) {
              var a,
                  s,
                  u,
                  c,
                  l,
                  f,
                  h,
                  p,
                  v;
              if (d) {
                var m = r.length;
                for (v = new Array(m), l = 0; l < $.length; l += 3)
                  h = $[l], v[h] = r[h];
              } else
                v = r;
              for (l = 0, f = $.length; f > l; )
                u = v[$[l++]], a = $[l++], s = $[l++], a ? (a.scope ? (c = e.$new(), D.$$addScopeInfo(jr(u), c)) : c = e, p = a.transcludeOnThisElement ? I(e, a.transclude, o) : !a.templateOnThisElement && o ? o : !o && t ? I(e, t) : null, a(s, c, u, i, p)) : s && s(e, u.childNodes, n, o);
            }
            for (var u,
                c,
                l,
                f,
                h,
                p,
                d,
                $ = [],
                v = 0; v < e.length; v++)
              u = new ue, c = U(e[v], [], u, 0 === v ? i : n, o), l = c.length ? z(c, e[v], u, t, r, null, [], [], a) : null, l && l.scope && D.$$addScopeClass(u.$$element), h = l && l.terminal || !(f = e[v].childNodes) || !f.length ? null : _(f, l ? (l.transcludeOnThisElement || !l.templateOnThisElement) && l.transclude : t), (l || h) && ($.push(v, l, h), p = !0, d = d || l), a = null;
            return p ? s : null;
          }
          function I(e, t, n) {
            var r = function(r, i, o, a, s) {
              return r || (r = e.$new(!1, s), r.$$transcluded = !0), t(r, i, {
                parentBoundTranscludeFn: n,
                transcludeControllers: o,
                futureParentElement: a
              });
            };
            return r;
          }
          function U(e, t, n, r, i) {
            var o,
                a,
                s = e.nodeType,
                u = n.$attr;
            switch (s) {
              case ei:
                G(t, ht(R(e)), "E", r, i);
                for (var c,
                    l,
                    f,
                    d,
                    $,
                    v,
                    m = e.attributes,
                    g = 0,
                    y = m && m.length; y > g; g++) {
                  var b = !1,
                      x = !1;
                  c = m[g], l = c.name, $ = Wr(c.value), d = ht(l), (v = de.test(d)) && (l = l.replace(Fi, "").substr(8).replace(/_(.)/g, function(e, t) {
                    return t.toUpperCase();
                  }));
                  var E = d.match($e);
                  E && Y(E[1]) && (b = l, x = l.substr(0, l.length - 5) + "end", l = l.substr(0, l.length - 6)), f = ht(l.toLowerCase()), u[f] = l, !v && n.hasOwnProperty(f) || (n[f] = $, ze(e, f) && (n[f] = !0)), re(e, t, $, f, v), G(t, f, "A", r, i, b, x);
                }
                if (a = e.className, w(a) && (a = a.animVal), S(a) && "" !== a)
                  for (; o = p.exec(a); )
                    f = ht(o[2]), G(t, f, "C", r, i) && (n[f] = Wr(o[3])), a = a.substr(o.index + o[0].length);
                break;
              case ni:
                if (11 === Nr)
                  for (; e.parentNode && e.nextSibling && e.nextSibling.nodeType === ni; )
                    e.nodeValue = e.nodeValue + e.nextSibling.nodeValue, e.parentNode.removeChild(e.nextSibling);
                ee(t, e.nodeValue);
                break;
              case ri:
                try {
                  o = h.exec(e.nodeValue), o && (f = ht(o[1]), G(t, f, "M", r, i) && (n[f] = Wr(o[2])));
                } catch (C) {}
            }
            return t.sort(Z), t;
          }
          function F(e, t, n) {
            var r = [],
                i = 0;
            if (t && e.hasAttribute && e.hasAttribute(t)) {
              do {
                if (!e)
                  throw Ui("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
                e.nodeType == ei && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--), r.push(e), e = e.nextSibling;
              } while (i > 0);
            } else
              r.push(e);
            return jr(r);
          }
          function H(e, t, n) {
            return function(r, i, o, a, s) {
              return i = F(i[0], t, n), e(r, i, o, a, s);
            };
          }
          function z(e, r, o, a, s, u, c, l, f) {
            function h(e, t, n, r) {
              e && (n && (e = H(e, n, r)), e.require = v.require, e.directiveName = g, (T === v || v.$$isolateScope) && (e = oe(e, {isolateScope: !0})), c.push(e)), t && (n && (t = H(t, n, r)), t.require = v.require, t.directiveName = g, (T === v || v.$$isolateScope) && (t = oe(t, {isolateScope: !0})), l.push(t));
            }
            function p(e, t, n, r) {
              var i;
              if (S(t)) {
                var o = t.match(x),
                    a = t.substring(o[0].length),
                    s = o[1] || o[3],
                    u = "?" === o[2];
                if ("^^" === s ? n = n.parent() : (i = r && r[a], i = i && i.instance), !i) {
                  var c = "$" + a + "Controller";
                  i = s ? n.inheritedData(c) : n.data(c);
                }
                if (!i && !u)
                  throw Ui("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, e);
              } else if (Lr(t)) {
                i = [];
                for (var l = 0,
                    f = t.length; f > l; l++)
                  i[l] = p(e, t[l], n, r);
              }
              return i || null;
            }
            function d(e, t, n, r, i, o) {
              var a = ve();
              for (var s in r) {
                var u = r[s],
                    c = {
                      $scope: u === T || u.$$isolateScope ? i : o,
                      $element: e,
                      $attrs: t,
                      $transclude: n
                    },
                    l = u.controller;
                "@" == l && (l = t[u.name]);
                var f = m(l, c, !0, u.controllerAs);
                a[u.name] = f, e.data("$" + u.name + "Controller", f.instance);
              }
              return a;
            }
            function $(e, t, i, a, s) {
              function u(e, t, r) {
                var i;
                return M(e) || (r = t, t = e, e = n), _ && (i = v), r || (r = _ ? g.parent() : g), s(e, t, i, r, j);
              }
              var f,
                  h,
                  $,
                  v,
                  m,
                  g,
                  y,
                  b,
                  w;
              r === i ? (y = o, g = o.$$element) : (g = jr(i), y = new ue(g, o)), $ = t, T ? h = t.$new(!0) : A && ($ = t.$parent), s && (m = u, m.$$boundTransclude = s), O && (v = d(g, y, m, O, h, t)), T && (D.$$addScopeInfo(g, h, !0, !(N && (N === T || N === T.$$originalDirective))), D.$$addScopeClass(g, !0), h.$$isolateBindings = T.$$isolateBindings, b = se(t, y, h, h.$$isolateBindings, T), b && h.$on("$destroy", b));
              for (var x in v) {
                var S = O[x],
                    E = v[x],
                    C = S.$$bindings.bindToController;
                E.identifier && C && (w = se($, y, E.instance, C, S));
                var k = E();
                k !== E.instance && (E.instance = k, g.data("$" + S.name + "Controller", k), w && w(), w = se($, y, E.instance, C, S));
              }
              for (B = 0, z = c.length; z > B; B++)
                f = c[B], ae(f, f.isolateScope ? h : t, g, y, f.require && p(f.directiveName, f.require, g, v), m);
              var j = t;
              for (T && (T.template || null === T.templateUrl) && (j = h), e && e(j, i.childNodes, n, s), B = l.length - 1; B >= 0; B--)
                f = l[B], ae(f, f.isolateScope ? h : t, g, y, f.require && p(f.directiveName, f.require, g, v), m);
            }
            f = f || {};
            for (var v,
                g,
                y,
                b,
                E,
                C = -Number.MAX_VALUE,
                A = f.newScopeDirective,
                O = f.controllerDirectives,
                T = f.newIsolateScopeDirective,
                N = f.templateDirective,
                j = f.nonTlbTranscludeDirective,
                V = !1,
                P = !1,
                _ = f.hasElementTranscludeDirective,
                I = o.$$element = jr(r),
                R = u,
                q = a,
                B = 0,
                z = e.length; z > B; B++) {
              v = e[B];
              var G = v.$$start,
                  Y = v.$$end;
              if (G && (I = F(r, G, Y)), y = n, C > v.priority)
                break;
              if ((E = v.scope) && (v.templateUrl || (w(E) ? (Q("new/isolated scope", T || A, v, I), T = v) : Q("new/isolated scope", T, v, I)), A = A || v), g = v.name, !v.templateUrl && v.controller && (E = v.controller, O = O || ve(), Q("'" + g + "' controller", O[g], v, I), O[g] = v), (E = v.transclude) && (V = !0, v.$$tlb || (Q("transclusion", j, v, I), j = v), "element" == E ? (_ = !0, C = v.priority, y = I, I = o.$$element = jr(t.createComment(" " + g + ": " + o[g] + " ")), r = I[0], ie(s, L(y), r), q = D(y, a, C, R && R.name, {nonTlbTranscludeDirective: j})) : (y = jr(Te(r)).contents(), I.empty(), q = D(y, a, n, n, {needsNewScope: v.$$isolateScope || v.$$newScope}))), v.template)
                if (P = !0, Q("template", N, v, I), N = v, E = k(v.template) ? v.template(I, o) : v.template, E = pe(E), v.replace) {
                  if (R = v, y = Se(E) ? [] : dt(te(v.templateNamespace, Wr(E))), r = y[0], 1 != y.length || r.nodeType !== ei)
                    throw Ui("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", g, "");
                  ie(s, I, r);
                  var Z = {$attr: {}},
                      ee = U(r, [], Z),
                      ne = e.splice(B + 1, e.length - (B + 1));
                  (T || A) && W(ee, T, A), e = e.concat(ee).concat(ne), J(o, Z), z = e.length;
                } else
                  I.html(E);
              if (v.templateUrl)
                P = !0, Q("template", N, v, I), N = v, v.replace && (R = v), $ = X(e.splice(B, e.length - B), I, o, s, V && q, c, l, {
                  controllerDirectives: O,
                  newScopeDirective: A !== v && A,
                  newIsolateScopeDirective: T,
                  templateDirective: N,
                  nonTlbTranscludeDirective: j
                }), z = e.length;
              else if (v.compile)
                try {
                  b = v.compile(I, o, q), k(b) ? h(null, b, G, Y) : b && h(b.pre, b.post, G, Y);
                } catch (re) {
                  i(re, K(I));
                }
              v.terminal && ($.terminal = !0, C = Math.max(C, v.priority));
            }
            return $.scope = A && A.scope === !0, $.transcludeOnThisElement = V, $.templateOnThisElement = P, $.transclude = q, f.hasElementTranscludeDirective = _, $;
          }
          function W(e, t, n) {
            for (var r = 0,
                i = e.length; i > r; r++)
              e[r] = d(e[r], {
                $$isolateScope: t,
                $$newScope: n
              });
          }
          function G(t, n, r, o, s, u, f) {
            if (n === s)
              return null;
            var h = null;
            if (c.hasOwnProperty(n))
              for (var p,
                  $ = e.get(n + l),
                  v = 0,
                  m = $.length; m > v; v++)
                try {
                  if (p = $[v], (y(o) || o > p.priority) && -1 != p.restrict.indexOf(r)) {
                    if (u && (p = d(p, {
                      $$start: u,
                      $$end: f
                    })), !p.$$bindings) {
                      var g = p.$$bindings = a(p, p.name);
                      w(g.isolateScope) && (p.$$isolateBindings = g.isolateScope);
                    }
                    t.push(p), h = p;
                  }
                } catch (b) {
                  i(b);
                }
            return h;
          }
          function Y(t) {
            if (c.hasOwnProperty(t))
              for (var n,
                  r = e.get(t + l),
                  i = 0,
                  o = r.length; o > i; i++)
                if (n = r[i], n.multiElement)
                  return !0;
            return !1;
          }
          function J(e, t) {
            var n = t.$attr,
                r = e.$attr,
                i = e.$$element;
            o(e, function(r, i) {
              "$" != i.charAt(0) && (t[i] && t[i] !== r && (r += ("style" === i ? ";" : " ") + t[i]), e.$set(i, r, !0, n[i]));
            }), o(t, function(t, o) {
              "class" == o ? (j(i, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == o ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == o.charAt(0) || e.hasOwnProperty(o) || (e[o] = t, r[o] = n[o]);
            });
          }
          function X(e, t, n, r, i, a, u, c) {
            var l,
                f,
                h = [],
                p = t[0],
                $ = e.shift(),
                v = d($, {
                  templateUrl: null,
                  transclude: null,
                  replace: null,
                  $$originalDirective: $
                }),
                m = k($.templateUrl) ? $.templateUrl(t, n) : $.templateUrl,
                g = $.templateNamespace;
            return t.empty(), s(m).then(function(s) {
              var d,
                  y,
                  b,
                  x;
              if (s = pe(s), $.replace) {
                if (b = Se(s) ? [] : dt(te(g, Wr(s))), d = b[0], 1 != b.length || d.nodeType !== ei)
                  throw Ui("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $.name, m);
                y = {$attr: {}}, ie(r, t, d);
                var S = U(d, [], y);
                w($.scope) && W(S, !0), e = S.concat(e), J(n, y);
              } else
                d = p, t.html(s);
              for (e.unshift(v), l = z(e, d, n, i, t, $, a, u, c), o(r, function(e, n) {
                e == d && (r[n] = t[0]);
              }), f = _(t[0].childNodes, i); h.length; ) {
                var E = h.shift(),
                    C = h.shift(),
                    k = h.shift(),
                    A = h.shift(),
                    O = t[0];
                if (!E.$$destroyed) {
                  if (C !== p) {
                    var M = C.className;
                    c.hasElementTranscludeDirective && $.replace || (O = Te(d)), ie(k, jr(C), O), j(jr(O), M);
                  }
                  x = l.transcludeOnThisElement ? I(E, l.transclude, A) : A, l(f, E, O, r, x);
                }
              }
              h = null;
            }), function(e, t, n, r, i) {
              var o = i;
              t.$$destroyed || (h ? h.push(t, n, r, o) : (l.transcludeOnThisElement && (o = I(t, l.transclude, i)), l(f, t, n, r, o)));
            };
          }
          function Z(e, t) {
            var n = t.priority - e.priority;
            return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index;
          }
          function Q(e, t, n, r) {
            function i(e) {
              return e ? " (module: " + e + ")" : "";
            }
            if (t)
              throw Ui("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", t.name, i(t.$$moduleName), n.name, i(n.$$moduleName), e, K(r));
          }
          function ee(e, t) {
            var n = r(t, !0);
            n && e.push({
              priority: 0,
              compile: function(e) {
                var t = e.parent(),
                    r = !!t.length;
                return r && D.$$addBindingClass(t), function(e, t) {
                  var i = t.parent();
                  r || D.$$addBindingClass(i), D.$$addBindingInfo(i, n.expressions), e.$watch(n, function(e) {
                    t[0].nodeValue = e;
                  });
                };
              }
            });
          }
          function te(e, n) {
            switch (e = kr(e || "html")) {
              case "svg":
              case "math":
                var r = t.createElement("div");
                return r.innerHTML = "<" + e + ">" + n + "</" + e + ">", r.childNodes[0].childNodes;
              default:
                return n;
            }
          }
          function ne(e, t) {
            if ("srcdoc" == t)
              return O.HTML;
            var n = R(e);
            return "xlinkHref" == t || "form" == n && "action" == t || "img" != n && ("src" == t || "ngSrc" == t) ? O.RESOURCE_URL : void 0;
          }
          function re(e, t, n, i, o) {
            var a = ne(e, i);
            o = g[i] || o;
            var s = r(n, !0, a, o);
            if (s) {
              if ("multiple" === i && "select" === R(e))
                throw Ui("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", K(e));
              t.push({
                priority: 100,
                compile: function() {
                  return {pre: function(e, t, u) {
                      var c = u.$$observers || (u.$$observers = ve());
                      if (E.test(i))
                        throw Ui("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                      var l = u[i];
                      l !== n && (s = l && r(l, !0, a, o), n = l), s && (u[i] = s(e), (c[i] || (c[i] = [])).$$inter = !0, (u.$$observers && u.$$observers[i].$$scope || e).$watch(s, function(e, t) {
                        "class" === i && e != t ? u.$updateClass(e, t) : u.$set(i, e);
                      }));
                    }};
                }
              });
            }
          }
          function ie(e, n, r) {
            var i,
                o,
                a = n[0],
                s = n.length,
                u = a.parentNode;
            if (e)
              for (i = 0, o = e.length; o > i; i++)
                if (e[i] == a) {
                  e[i++] = r;
                  for (var c = i,
                      l = c + s - 1,
                      f = e.length; f > c; c++, l++)
                    f > l ? e[c] = e[l] : delete e[c];
                  e.length -= s - 1, e.context === a && (e.context = r);
                  break;
                }
            u && u.replaceChild(r, a);
            var h = t.createDocumentFragment();
            h.appendChild(a), jr.hasData(a) && (jr.data(r, jr.data(a)), Vr ? (Hr = !0, Vr.cleanData([a])) : delete jr.cache[a[jr.expando]]);
            for (var p = 1,
                d = n.length; d > p; p++) {
              var $ = n[p];
              jr($).remove(), h.appendChild($), delete n[p];
            }
            n[0] = r, n.length = 1;
          }
          function oe(e, t) {
            return f(function() {
              return e.apply(null, arguments);
            }, e, t);
          }
          function ae(e, t, n, r, o, a) {
            try {
              e(t, n, r, o, a);
            } catch (s) {
              i(s, K(n));
            }
          }
          function se(e, t, n, i, a) {
            var s = [];
            return o(i, function(i, o) {
              var c,
                  l,
                  f,
                  h,
                  p = i.attrName,
                  d = i.optional,
                  v = i.mode;
              switch (v) {
                case "@":
                  d || Ar.call(t, p) || (n[o] = t[p] = void 0), t.$observe(p, function(e) {
                    S(e) && (n[o] = e);
                  }), t.$$observers[p].$$scope = e, c = t[p], S(c) ? n[o] = r(c)(e) : V(c) && (n[o] = c);
                  break;
                case "=":
                  if (!Ar.call(t, p)) {
                    if (d)
                      break;
                    t[p] = void 0;
                  }
                  if (d && !t[p])
                    break;
                  l = u(t[p]), h = l.literal ? B : function(e, t) {
                    return e === t || e !== e && t !== t;
                  }, f = l.assign || function() {
                    throw c = n[o] = l(e), Ui("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", t[p], p, a.name);
                  }, c = n[o] = l(e);
                  var m = function(t) {
                    return h(t, n[o]) || (h(t, c) ? f(e, t = n[o]) : n[o] = t), c = t;
                  };
                  m.$stateful = !0;
                  var g;
                  g = i.collection ? e.$watchCollection(t[p], m) : e.$watch(u(t[p], m), null, l.literal), s.push(g);
                  break;
                case "&":
                  if (l = t.hasOwnProperty(p) ? u(t[p]) : $, l === $ && d)
                    break;
                  n[o] = function(t) {
                    return l(e, t);
                  };
              }
            }), s.length && function() {
              for (var e = 0,
                  t = s.length; t > e; ++e)
                s[e]();
            };
          }
          var ue = function(e, t) {
            if (t) {
              var n,
                  r,
                  i,
                  o = Object.keys(t);
              for (n = 0, r = o.length; r > n; n++)
                i = o[n], this[i] = t[i];
            } else
              this.$attr = {};
            this.$$element = e;
          };
          ue.prototype = {
            $normalize: ht,
            $addClass: function(e) {
              e && e.length > 0 && T.addClass(this.$$element, e);
            },
            $removeClass: function(e) {
              e && e.length > 0 && T.removeClass(this.$$element, e);
            },
            $updateClass: function(e, t) {
              var n = pt(e, t);
              n && n.length && T.addClass(this.$$element, n);
              var r = pt(t, e);
              r && r.length && T.removeClass(this.$$element, r);
            },
            $set: function(e, t, n, r) {
              var a,
                  s = this.$$element[0],
                  u = ze(s, e),
                  c = We(e),
                  l = e;
              if (u ? (this.$$element.prop(e, t), r = u) : c && (this[c] = t, l = c), this[e] = t, r ? this.$attr[e] = r : (r = this.$attr[e], r || (this.$attr[e] = r = ce(e, "-"))), a = R(this.$$element), "a" === a && "href" === e || "img" === a && "src" === e)
                this[e] = t = N(t, "src" === e);
              else if ("img" === a && "srcset" === e && b(t)) {
                for (var f = "",
                    h = Wr(t),
                    p = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,
                    d = /\s/.test(h) ? p : /(,)/,
                    $ = h.split(d),
                    v = Math.floor($.length / 2),
                    m = 0; v > m; m++) {
                  var g = 2 * m;
                  f += N(Wr($[g]), !0), f += " " + Wr($[g + 1]);
                }
                var w = Wr($[2 * m]).split(/\s/);
                f += N(Wr(w[0]), !0), 2 === w.length && (f += " " + Wr(w[1])), this[e] = t = f;
              }
              n !== !1 && (null === t || y(t) ? this.$$element.removeAttr(r) : this.$$element.attr(r, t));
              var x = this.$$observers;
              x && o(x[l], function(e) {
                try {
                  e(t);
                } catch (n) {
                  i(n);
                }
              });
            },
            $observe: function(e, t) {
              var n = this,
                  r = n.$$observers || (n.$$observers = ve()),
                  i = r[e] || (r[e] = []);
              return i.push(t), C.$evalAsync(function() {
                i.$$inter || !n.hasOwnProperty(e) || y(n[e]) || t(n[e]);
              }), function() {
                q(i, t);
              };
            }
          };
          var le = r.startSymbol(),
              he = r.endSymbol(),
              pe = "{{" == le && "}}" == he ? v : function(e) {
                return e.replace(/\{\{/g, le).replace(/}}/g, he);
              },
              de = /^ngAttr[A-Z]/,
              $e = /^(.+)Start$/;
          return D.$$addBindingInfo = A ? function(e, t) {
            var n = e.data("$binding") || [];
            Lr(t) ? n = n.concat(t) : n.push(t), e.data("$binding", n);
          } : $, D.$$addBindingClass = A ? function(e) {
            j(e, "ng-binding");
          } : $, D.$$addScopeInfo = A ? function(e, t, n, r) {
            var i = n ? r ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
            e.data(i, t);
          } : $, D.$$addScopeClass = A ? function(e, t) {
            j(e, t ? "ng-isolate-scope" : "ng-scope");
          } : $, D;
        }];
      }
      function ht(e) {
        return xe(e.replace(Fi, ""));
      }
      function pt(e, t) {
        var n = "",
            r = e.split(/\s+/),
            i = t.split(/\s+/);
        e: for (var o = 0; o < r.length; o++) {
          for (var a = r[o],
              s = 0; s < i.length; s++)
            if (a == i[s])
              continue e;
          n += (n.length > 0 ? " " : "") + a;
        }
        return n;
      }
      function dt(e) {
        e = jr(e);
        var t = e.length;
        if (1 >= t)
          return e;
        for (; t--; ) {
          var n = e[t];
          n.nodeType === ri && _r.call(e, t, 1);
        }
        return e;
      }
      function $t(e, t) {
        if (t && S(t))
          return t;
        if (S(e)) {
          var n = Hi.exec(e);
          if (n)
            return n[3];
        }
      }
      function vt() {
        var e = {},
            t = !1;
        this.register = function(t, n) {
          pe(t, "controller"), w(t) ? f(e, t) : e[t] = n;
        }, this.allowGlobals = function() {
          t = !0;
        }, this.$get = ["$injector", "$window", function(i, o) {
          function a(e, t, n, i) {
            if (!e || !w(e.$scope))
              throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, t);
            e.$scope[t] = n;
          }
          return function(r, s, u, c) {
            var l,
                h,
                p,
                d;
            if (u = u === !0, c && S(c) && (d = c), S(r)) {
              if (h = r.match(Hi), !h)
                throw Bi("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
              p = h[1], d = d || h[3], r = e.hasOwnProperty(p) ? e[p] : de(s.$scope, p, !0) || (t ? de(o, p, !0) : n), he(r, p, !0);
            }
            if (u) {
              var $ = (Lr(r) ? r[r.length - 1] : r).prototype;
              l = Object.create($ || null), d && a(s, d, l, p || r.name);
              var v;
              return v = f(function() {
                var e = i.invoke(r, l, s, p);
                return e !== l && (w(e) || k(e)) && (l = e, d && a(s, d, l, p || r.name)), l;
              }, {
                instance: l,
                identifier: d
              });
            }
            return l = i.instantiate(r, s, p), d && a(s, d, l, p || r.name), l;
          };
        }];
      }
      function mt() {
        this.$get = ["$window", function(e) {
          return jr(e.document);
        }];
      }
      function gt() {
        this.$get = ["$log", function(e) {
          return function(t, n) {
            e.error.apply(e, arguments);
          };
        }];
      }
      function yt(e) {
        return w(e) ? C(e) ? e.toISOString() : G(e) : e;
      }
      function bt() {
        this.$get = function() {
          return function(e) {
            if (!e)
              return "";
            var t = [];
            return a(e, function(e, n) {
              null === e || y(e) || (Lr(e) ? o(e, function(e, r) {
                t.push(re(n) + "=" + re(yt(e)));
              }) : t.push(re(n) + "=" + re(yt(e))));
            }), t.join("&");
          };
        };
      }
      function wt() {
        this.$get = function() {
          return function(e) {
            function t(e, r, i) {
              null === e || y(e) || (Lr(e) ? o(e, function(e, n) {
                t(e, r + "[" + (w(e) ? n : "") + "]");
              }) : w(e) && !C(e) ? a(e, function(e, n) {
                t(e, r + (i ? "" : "[") + n + (i ? "" : "]"));
              }) : n.push(re(r) + "=" + re(yt(e))));
            }
            if (!e)
              return "";
            var n = [];
            return t(e, "", !0), n.join("&");
          };
        };
      }
      function xt(e, t) {
        if (S(e)) {
          var n = e.replace(Ji, "").trim();
          if (n) {
            var r = t("Content-Type");
            (r && 0 === r.indexOf(zi) || St(n)) && (e = Y(n));
          }
        }
        return e;
      }
      function St(e) {
        var t = e.match(Gi);
        return t && Yi[t[0]].test(e);
      }
      function Et(e) {
        function t(e, t) {
          e && (r[e] = r[e] ? r[e] + ", " + t : t);
        }
        var n,
            r = ve();
        return S(e) ? o(e.split("\n"), function(e) {
          n = e.indexOf(":"), t(kr(Wr(e.substr(0, n))), Wr(e.substr(n + 1)));
        }) : w(e) && o(e, function(e, n) {
          t(kr(n), Wr(e));
        }), r;
      }
      function Ct(e) {
        var t;
        return function(n) {
          if (t || (t = Et(e)), n) {
            var r = t[kr(n)];
            return void 0 === r && (r = null), r;
          }
          return t;
        };
      }
      function kt(e, t, n, r) {
        return k(r) ? r(e, t, n) : (o(r, function(r) {
          e = r(e, t, n);
        }), e);
      }
      function At(e) {
        return e >= 200 && 300 > e;
      }
      function Ot() {
        var e = this.defaults = {
          transformResponse: [xt],
          transformRequest: [function(e) {
            return !w(e) || T(e) || j(e) || N(e) ? e : G(e);
          }],
          headers: {
            common: {Accept: "application/json, text/plain, */*"},
            post: F(Wi),
            put: F(Wi),
            patch: F(Wi)
          },
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          paramSerializer: "$httpParamSerializer"
        },
            t = !1;
        this.useApplyAsync = function(e) {
          return b(e) ? (t = !!e, this) : t;
        };
        var i = !0;
        this.useLegacyPromiseExtensions = function(e) {
          return b(e) ? (i = !!e, this) : i;
        };
        var a = this.interceptors = [];
        this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(s, u, c, l, h, p) {
          function d(t) {
            function a(e) {
              var t = f({}, e);
              return t.data = kt(e.data, e.headers, e.status, c.transformResponse), At(e.status) ? t : h.reject(t);
            }
            function s(e, t) {
              var n,
                  r = {};
              return o(e, function(e, i) {
                k(e) ? (n = e(t), null != n && (r[i] = n)) : r[i] = e;
              }), r;
            }
            function u(t) {
              var n,
                  r,
                  i,
                  o = e.headers,
                  a = f({}, t.headers);
              o = f({}, o.common, o[kr(t.method)]);
              e: for (n in o) {
                r = kr(n);
                for (i in a)
                  if (kr(i) === r)
                    continue e;
                a[n] = o[n];
              }
              return s(a, F(t));
            }
            if (!Fr.isObject(t))
              throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", t);
            if (!S(t.url))
              throw r("$http")("badreq", "Http request configuration url must be a string.  Received: {0}", t.url);
            var c = f({
              method: "get",
              transformRequest: e.transformRequest,
              transformResponse: e.transformResponse,
              paramSerializer: e.paramSerializer
            }, t);
            c.headers = u(t), c.method = Or(c.method), c.paramSerializer = S(c.paramSerializer) ? p.get(c.paramSerializer) : c.paramSerializer;
            var l = function(t) {
              var r = t.headers,
                  i = kt(t.data, Ct(r), n, t.transformRequest);
              return y(i) && o(r, function(e, t) {
                "content-type" === kr(t) && delete r[t];
              }), y(t.withCredentials) && !y(e.withCredentials) && (t.withCredentials = e.withCredentials), m(t, i).then(a, a);
            },
                d = [l, n],
                $ = h.when(c);
            for (o(E, function(e) {
              (e.request || e.requestError) && d.unshift(e.request, e.requestError), (e.response || e.responseError) && d.push(e.response, e.responseError);
            }); d.length; ) {
              var v = d.shift(),
                  g = d.shift();
              $ = $.then(v, g);
            }
            return i ? ($.success = function(e) {
              return he(e, "fn"), $.then(function(t) {
                e(t.data, t.status, t.headers, c);
              }), $;
            }, $.error = function(e) {
              return he(e, "fn"), $.then(null, function(t) {
                e(t.data, t.status, t.headers, c);
              }), $;
            }) : ($.success = Zi("success"), $.error = Zi("error")), $;
          }
          function $(e) {
            o(arguments, function(e) {
              d[e] = function(t, n) {
                return d(f({}, n || {}, {
                  method: e,
                  url: t
                }));
              };
            });
          }
          function v(e) {
            o(arguments, function(e) {
              d[e] = function(t, n, r) {
                return d(f({}, r || {}, {
                  method: e,
                  url: t,
                  data: n
                }));
              };
            });
          }
          function m(r, i) {
            function o(e, n, r, i) {
              function o() {
                a(n, e, r, i);
              }
              p && (At(e) ? p.put(E, [e, n, Et(r), i]) : p.remove(E)), t ? l.$applyAsync(o) : (o(), l.$$phase || l.$apply());
            }
            function a(e, t, n, i) {
              t = t >= -1 ? t : 0, (At(t) ? v.resolve : v.reject)({
                data: e,
                status: t,
                headers: Ct(n),
                config: r,
                statusText: i
              });
            }
            function c(e) {
              a(e.data, e.status, F(e.headers()), e.statusText);
            }
            function f() {
              var e = d.pendingRequests.indexOf(r);
              -1 !== e && d.pendingRequests.splice(e, 1);
            }
            var p,
                $,
                v = h.defer(),
                m = v.promise,
                S = r.headers,
                E = g(r.url, r.paramSerializer(r.params));
            if (d.pendingRequests.push(r), m.then(f, f), !r.cache && !e.cache || r.cache === !1 || "GET" !== r.method && "JSONP" !== r.method || (p = w(r.cache) ? r.cache : w(e.cache) ? e.cache : x), p && ($ = p.get(E), b($) ? D($) ? $.then(c, c) : Lr($) ? a($[1], $[0], F($[2]), $[3]) : a($, 200, {}, "OK") : p.put(E, m)), y($)) {
              var C = Tn(r.url) ? u()[r.xsrfCookieName || e.xsrfCookieName] : n;
              C && (S[r.xsrfHeaderName || e.xsrfHeaderName] = C), s(r.method, E, i, o, S, r.timeout, r.withCredentials, r.responseType);
            }
            return m;
          }
          function g(e, t) {
            return t.length > 0 && (e += (-1 == e.indexOf("?") ? "?" : "&") + t), e;
          }
          var x = c("$http");
          e.paramSerializer = S(e.paramSerializer) ? p.get(e.paramSerializer) : e.paramSerializer;
          var E = [];
          return o(a, function(e) {
            E.unshift(S(e) ? p.get(e) : p.invoke(e));
          }), d.pendingRequests = [], $("get", "delete", "head", "jsonp"), v("post", "put", "patch"), d.defaults = e, d;
        }];
      }
      function Mt() {
        this.$get = function() {
          return function() {
            return new e.XMLHttpRequest;
          };
        };
      }
      function Tt() {
        this.$get = ["$browser", "$window", "$document", "$xhrFactory", function(e, t, n, r) {
          return Nt(e, r, e.defer, t.angular.callbacks, n[0]);
        }];
      }
      function Nt(e, t, n, r, i) {
        function a(e, t, n) {
          var o = i.createElement("script"),
              a = null;
          return o.type = "text/javascript", o.src = e, o.async = !0, a = function(e) {
            li(o, "load", a), li(o, "error", a), i.body.removeChild(o), o = null;
            var s = -1,
                u = "unknown";
            e && ("load" !== e.type || r[t].called || (e = {type: "error"}), u = e.type, s = "error" === e.type ? 404 : 200), n && n(s, u);
          }, ci(o, "load", a), ci(o, "error", a), i.body.appendChild(o), a;
        }
        return function(i, s, u, c, l, f, h, p) {
          function d() {
            g && g(), w && w.abort();
          }
          function v(t, r, i, o, a) {
            b(E) && n.cancel(E), g = w = null, t(r, i, o, a), e.$$completeOutstandingRequest($);
          }
          if (e.$$incOutstandingRequestCount(), s = s || e.url(), "jsonp" == kr(i)) {
            var m = "_" + (r.counter++).toString(36);
            r[m] = function(e) {
              r[m].data = e, r[m].called = !0;
            };
            var g = a(s.replace("JSON_CALLBACK", "angular.callbacks." + m), m, function(e, t) {
              v(c, e, r[m].data, "", t), r[m] = $;
            });
          } else {
            var w = t(i, s);
            w.open(i, s, !0), o(l, function(e, t) {
              b(e) && w.setRequestHeader(t, e);
            }), w.onload = function() {
              var e = w.statusText || "",
                  t = "response" in w ? w.response : w.responseText,
                  n = 1223 === w.status ? 204 : w.status;
              0 === n && (n = t ? 200 : "file" == Mn(s).protocol ? 404 : 0), v(c, n, t, w.getAllResponseHeaders(), e);
            };
            var x = function() {
              v(c, -1, null, null, "");
            };
            if (w.onerror = x, w.onabort = x, h && (w.withCredentials = !0), p)
              try {
                w.responseType = p;
              } catch (S) {
                if ("json" !== p)
                  throw S;
              }
            w.send(y(u) ? null : u);
          }
          if (f > 0)
            var E = n(d, f);
          else
            D(f) && f.then(d);
        };
      }
      function jt() {
        var e = "{{",
            t = "}}";
        this.startSymbol = function(t) {
          return t ? (e = t, this) : e;
        }, this.endSymbol = function(e) {
          return e ? (t = e, this) : t;
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(n, r, i) {
          function o(e) {
            return "\\\\\\" + e;
          }
          function a(n) {
            return n.replace(h, e).replace(p, t);
          }
          function s(e) {
            if (null == e)
              return "";
            switch (typeof e) {
              case "string":
                break;
              case "number":
                e = "" + e;
                break;
              default:
                e = G(e);
            }
            return e;
          }
          function u(o, u, h, p) {
            function d(e) {
              try {
                return e = O(e), p && !b(e) ? e : s(e);
              } catch (t) {
                r(Ki.interr(o, t));
              }
            }
            p = !!p;
            for (var $,
                v,
                m,
                g = 0,
                w = [],
                x = [],
                S = o.length,
                E = [],
                C = []; S > g; ) {
              if (-1 == ($ = o.indexOf(e, g)) || -1 == (v = o.indexOf(t, $ + c))) {
                g !== S && E.push(a(o.substring(g)));
                break;
              }
              g !== $ && E.push(a(o.substring(g, $))), m = o.substring($ + c, v), w.push(m), x.push(n(m, d)), g = v + l, C.push(E.length), E.push("");
            }
            if (h && E.length > 1 && Ki.throwNoconcat(o), !u || w.length) {
              var A = function(e) {
                for (var t = 0,
                    n = w.length; n > t; t++) {
                  if (p && y(e[t]))
                    return;
                  E[C[t]] = e[t];
                }
                return E.join("");
              },
                  O = function(e) {
                    return h ? i.getTrusted(h, e) : i.valueOf(e);
                  };
              return f(function(e) {
                var t = 0,
                    n = w.length,
                    i = new Array(n);
                try {
                  for (; n > t; t++)
                    i[t] = x[t](e);
                  return A(i);
                } catch (a) {
                  r(Ki.interr(o, a));
                }
              }, {
                exp: o,
                expressions: w,
                $$watchDelegate: function(e, t) {
                  var n;
                  return e.$watchGroup(x, function(r, i) {
                    var o = A(r);
                    k(t) && t.call(this, o, r !== i ? n : o, e), n = o;
                  });
                }
              });
            }
          }
          var c = e.length,
              l = t.length,
              h = new RegExp(e.replace(/./g, o), "g"),
              p = new RegExp(t.replace(/./g, o), "g");
          return u.startSymbol = function() {
            return e;
          }, u.endSymbol = function() {
            return t;
          }, u;
        }];
      }
      function Vt() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", function(e, t, n, r) {
          function i(i, a, s, u) {
            var c = arguments.length > 4,
                l = c ? L(arguments, 4) : [],
                f = t.setInterval,
                h = t.clearInterval,
                p = 0,
                d = b(u) && !u,
                $ = (d ? r : n).defer(),
                v = $.promise;
            return s = b(s) ? s : 0, v.then(null, null, c ? function() {
              i.apply(null, l);
            } : i), v.$$intervalId = f(function() {
              $.notify(p++), s > 0 && p >= s && ($.resolve(p), h(v.$$intervalId), delete o[v.$$intervalId]), d || e.$apply();
            }, a), o[v.$$intervalId] = $, v;
          }
          var o = {};
          return i.cancel = function(e) {
            return e && e.$$intervalId in o ? (o[e.$$intervalId].reject("canceled"), t.clearInterval(e.$$intervalId), delete o[e.$$intervalId], !0) : !1;
          }, i;
        }];
      }
      function Dt(e) {
        for (var t = e.split("/"),
            n = t.length; n--; )
          t[n] = ne(t[n]);
        return t.join("/");
      }
      function Pt(e, t) {
        var n = Mn(e);
        t.$$protocol = n.protocol, t.$$host = n.hostname, t.$$port = p(n.port) || eo[n.protocol] || null;
      }
      function _t(e, t) {
        var n = "/" !== e.charAt(0);
        n && (e = "/" + e);
        var r = Mn(e);
        t.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0) ? r.pathname.substring(1) : r.pathname), t.$$search = ee(r.search), t.$$hash = decodeURIComponent(r.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path);
      }
      function It(e, t) {
        return 0 === t.indexOf(e) ? t.substr(e.length) : void 0;
      }
      function Rt(e) {
        var t = e.indexOf("#");
        return -1 == t ? e : e.substr(0, t);
      }
      function qt(e) {
        return e.replace(/(#.+)|#$/, "$1");
      }
      function Ut(e) {
        return e.substr(0, Rt(e).lastIndexOf("/") + 1);
      }
      function Ft(e) {
        return e.substring(0, e.indexOf("/", e.indexOf("//") + 2));
      }
      function Bt(e, t, n) {
        this.$$html5 = !0, n = n || "", Pt(e, this), this.$$parse = function(e) {
          var n = It(t, e);
          if (!S(n))
            throw to("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', e, t);
          _t(n, this), this.$$path || (this.$$path = "/"), this.$$compose();
        }, this.$$compose = function() {
          var e = te(this.$$search),
              n = this.$$hash ? "#" + ne(this.$$hash) : "";
          this.$$url = Dt(this.$$path) + (e ? "?" + e : "") + n, this.$$absUrl = t + this.$$url.substr(1);
        }, this.$$parseLinkUrl = function(r, i) {
          if (i && "#" === i[0])
            return this.hash(i.slice(1)), !0;
          var o,
              a,
              s;
          return b(o = It(e, r)) ? (a = o, s = b(o = It(n, o)) ? t + (It("/", o) || o) : e + a) : b(o = It(t, r)) ? s = t + o : t == r + "/" && (s = t), s && this.$$parse(s), !!s;
        };
      }
      function Ht(e, t, n) {
        Pt(e, this), this.$$parse = function(r) {
          function i(e, t, n) {
            var r,
                i = /^\/[A-Z]:(\/.*)/;
            return 0 === t.indexOf(n) && (t = t.replace(n, "")), i.exec(t) ? e : (r = i.exec(e), r ? r[1] : e);
          }
          var o,
              a = It(e, r) || It(t, r);
          y(a) || "#" !== a.charAt(0) ? this.$$html5 ? o = a : (o = "", y(a) && (e = r, this.replace())) : (o = It(n, a), y(o) && (o = a)), _t(o, this), this.$$path = i(this.$$path, o, e), this.$$compose();
        }, this.$$compose = function() {
          var t = te(this.$$search),
              r = this.$$hash ? "#" + ne(this.$$hash) : "";
          this.$$url = Dt(this.$$path) + (t ? "?" + t : "") + r, this.$$absUrl = e + (this.$$url ? n + this.$$url : "");
        }, this.$$parseLinkUrl = function(t, n) {
          return Rt(e) == Rt(t) ? (this.$$parse(t), !0) : !1;
        };
      }
      function Lt(e, t, n) {
        this.$$html5 = !0, Ht.apply(this, arguments), this.$$parseLinkUrl = function(r, i) {
          if (i && "#" === i[0])
            return this.hash(i.slice(1)), !0;
          var o,
              a;
          return e == Rt(r) ? o = r : (a = It(t, r)) ? o = e + n + a : t === r + "/" && (o = t), o && this.$$parse(o), !!o;
        }, this.$$compose = function() {
          var t = te(this.$$search),
              r = this.$$hash ? "#" + ne(this.$$hash) : "";
          this.$$url = Dt(this.$$path) + (t ? "?" + t : "") + r, this.$$absUrl = e + n + this.$$url;
        };
      }
      function zt(e) {
        return function() {
          return this[e];
        };
      }
      function Wt(e, t) {
        return function(n) {
          return y(n) ? this[e] : (this[e] = t(n), this.$$compose(), this);
        };
      }
      function Gt() {
        var e = "",
            t = {
              enabled: !1,
              requireBase: !0,
              rewriteLinks: !0
            };
        this.hashPrefix = function(t) {
          return b(t) ? (e = t, this) : e;
        }, this.html5Mode = function(e) {
          return V(e) ? (t.enabled = e, this) : w(e) ? (V(e.enabled) && (t.enabled = e.enabled), V(e.requireBase) && (t.requireBase = e.requireBase), V(e.rewriteLinks) && (t.rewriteLinks = e.rewriteLinks), this) : t;
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(n, r, i, o, a) {
          function s(e, t, n) {
            var i = c.url(),
                o = c.$$state;
            try {
              r.url(e, t, n), c.$$state = r.state();
            } catch (a) {
              throw c.url(i), c.$$state = o, a;
            }
          }
          function u(e, t) {
            n.$broadcast("$locationChangeSuccess", c.absUrl(), e, c.$$state, t);
          }
          var c,
              l,
              f,
              h = r.baseHref(),
              p = r.url();
          if (t.enabled) {
            if (!h && t.requireBase)
              throw to("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
            f = Ft(p) + (h || "/"), l = i.history ? Bt : Lt;
          } else
            f = Rt(p), l = Ht;
          var d = Ut(f);
          c = new l(f, d, "#" + e), c.$$parseLinkUrl(p, p), c.$$state = r.state();
          var $ = /^\s*(javascript|mailto):/i;
          o.on("click", function(e) {
            if (t.rewriteLinks && !e.ctrlKey && !e.metaKey && !e.shiftKey && 2 != e.which && 2 != e.button) {
              for (var i = jr(e.target); "a" !== R(i[0]); )
                if (i[0] === o[0] || !(i = i.parent())[0])
                  return;
              var s = i.prop("href"),
                  u = i.attr("href") || i.attr("xlink:href");
              w(s) && "[object SVGAnimatedString]" === s.toString() && (s = Mn(s.animVal).href), $.test(s) || !s || i.attr("target") || e.isDefaultPrevented() || c.$$parseLinkUrl(s, u) && (e.preventDefault(), c.absUrl() != r.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0));
            }
          }), qt(c.absUrl()) != qt(p) && r.url(c.absUrl(), !0);
          var v = !0;
          return r.onUrlChange(function(e, t) {
            return y(It(d, e)) ? void(a.location.href = e) : (n.$evalAsync(function() {
              var r,
                  i = c.absUrl(),
                  o = c.$$state;
              e = qt(e), c.$$parse(e), c.$$state = t, r = n.$broadcast("$locationChangeStart", e, i, t, o).defaultPrevented, c.absUrl() === e && (r ? (c.$$parse(i), c.$$state = o, s(i, !1, o)) : (v = !1, u(i, o)));
            }), void(n.$$phase || n.$digest()));
          }), n.$watch(function() {
            var e = qt(r.url()),
                t = qt(c.absUrl()),
                o = r.state(),
                a = c.$$replace,
                l = e !== t || c.$$html5 && i.history && o !== c.$$state;
            (v || l) && (v = !1, n.$evalAsync(function() {
              var t = c.absUrl(),
                  r = n.$broadcast("$locationChangeStart", t, e, c.$$state, o).defaultPrevented;
              c.absUrl() === t && (r ? (c.$$parse(e), c.$$state = o) : (l && s(t, a, o === c.$$state ? null : c.$$state), u(e, o)));
            })), c.$$replace = !1;
          }), c;
        }];
      }
      function Yt() {
        var e = !0,
            t = this;
        this.debugEnabled = function(t) {
          return b(t) ? (e = t, this) : e;
        }, this.$get = ["$window", function(n) {
          function r(e) {
            return e instanceof Error && (e.stack ? e = e.message && -1 === e.stack.indexOf(e.message) ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e;
          }
          function i(e) {
            var t = n.console || {},
                i = t[e] || t.log || $,
                a = !1;
            try {
              a = !!i.apply;
            } catch (s) {}
            return a ? function() {
              var e = [];
              return o(arguments, function(t) {
                e.push(r(t));
              }), i.apply(t, e);
            } : function(e, t) {
              i(e, null == t ? "" : t);
            };
          }
          return {
            log: i("log"),
            info: i("info"),
            warn: i("warn"),
            error: i("error"),
            debug: function() {
              var n = i("debug");
              return function() {
                e && n.apply(t, arguments);
              };
            }()
          };
        }];
      }
      function Jt(e, t) {
        if ("__defineGetter__" === e || "__defineSetter__" === e || "__lookupGetter__" === e || "__lookupSetter__" === e || "__proto__" === e)
          throw ro("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", t);
        return e;
      }
      function Xt(e, t) {
        if (e += "", !S(e))
          throw ro("iseccst", "Cannot convert object to primitive value! Expression: {0}", t);
        return e;
      }
      function Zt(e, t) {
        if (e) {
          if (e.constructor === e)
            throw ro("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
          if (e.window === e)
            throw ro("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
          if (e.children && (e.nodeName || e.prop && e.attr && e.find))
            throw ro("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t);
          if (e === Object)
            throw ro("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", t);
        }
        return e;
      }
      function Kt(e, t) {
        if (e) {
          if (e.constructor === e)
            throw ro("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
          if (e === io || e === oo || e === ao)
            throw ro("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", t);
        }
      }
      function Qt(e, t) {
        if (e && (e === 0..constructor || e === (!1).constructor || e === "".constructor || e === {}.constructor || e === [].constructor || e === Function.constructor))
          throw ro("isecaf", "Assigning to a constructor is disallowed! Expression: {0}", t);
      }
      function en(e, t) {
        return "undefined" != typeof e ? e : t;
      }
      function tn(e, t) {
        return "undefined" == typeof e ? t : "undefined" == typeof t ? e : e + t;
      }
      function nn(e, t) {
        var n = e(t);
        return !n.$stateful;
      }
      function rn(e, t) {
        var n,
            r;
        switch (e.type) {
          case lo.Program:
            n = !0, o(e.body, function(e) {
              rn(e.expression, t), n = n && e.expression.constant;
            }), e.constant = n;
            break;
          case lo.Literal:
            e.constant = !0, e.toWatch = [];
            break;
          case lo.UnaryExpression:
            rn(e.argument, t), e.constant = e.argument.constant, e.toWatch = e.argument.toWatch;
            break;
          case lo.BinaryExpression:
            rn(e.left, t), rn(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.left.toWatch.concat(e.right.toWatch);
            break;
          case lo.LogicalExpression:
            rn(e.left, t), rn(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.constant ? [] : [e];
            break;
          case lo.ConditionalExpression:
            rn(e.test, t), rn(e.alternate, t), rn(e.consequent, t), e.constant = e.test.constant && e.alternate.constant && e.consequent.constant, e.toWatch = e.constant ? [] : [e];
            break;
          case lo.Identifier:
            e.constant = !1, e.toWatch = [e];
            break;
          case lo.MemberExpression:
            rn(e.object, t), e.computed && rn(e.property, t), e.constant = e.object.constant && (!e.computed || e.property.constant), e.toWatch = [e];
            break;
          case lo.CallExpression:
            n = e.filter ? nn(t, e.callee.name) : !1, r = [], o(e.arguments, function(e) {
              rn(e, t), n = n && e.constant, e.constant || r.push.apply(r, e.toWatch);
            }), e.constant = n, e.toWatch = e.filter && nn(t, e.callee.name) ? r : [e];
            break;
          case lo.AssignmentExpression:
            rn(e.left, t), rn(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = [e];
            break;
          case lo.ArrayExpression:
            n = !0, r = [], o(e.elements, function(e) {
              rn(e, t), n = n && e.constant, e.constant || r.push.apply(r, e.toWatch);
            }), e.constant = n, e.toWatch = r;
            break;
          case lo.ObjectExpression:
            n = !0, r = [], o(e.properties, function(e) {
              rn(e.value, t), n = n && e.value.constant, e.value.constant || r.push.apply(r, e.value.toWatch);
            }), e.constant = n, e.toWatch = r;
            break;
          case lo.ThisExpression:
            e.constant = !1, e.toWatch = [];
        }
      }
      function on(e) {
        if (1 == e.length) {
          var t = e[0].expression,
              r = t.toWatch;
          return 1 !== r.length ? r : r[0] !== t ? r : n;
        }
      }
      function an(e) {
        return e.type === lo.Identifier || e.type === lo.MemberExpression;
      }
      function sn(e) {
        return 1 === e.body.length && an(e.body[0].expression) ? {
          type: lo.AssignmentExpression,
          left: e.body[0].expression,
          right: {type: lo.NGValueParameter},
          operator: "="
        } : void 0;
      }
      function un(e) {
        return 0 === e.body.length || 1 === e.body.length && (e.body[0].expression.type === lo.Literal || e.body[0].expression.type === lo.ArrayExpression || e.body[0].expression.type === lo.ObjectExpression);
      }
      function cn(e) {
        return e.constant;
      }
      function ln(e, t) {
        this.astBuilder = e, this.$filter = t;
      }
      function fn(e, t) {
        this.astBuilder = e, this.$filter = t;
      }
      function hn(e) {
        return "constructor" == e;
      }
      function pn(e) {
        return k(e.valueOf) ? e.valueOf() : ho.call(e);
      }
      function dn() {
        var e = ve(),
            t = ve();
        this.$get = ["$filter", function(r) {
          function i(n, i, o) {
            var s,
                p,
                g;
            switch (o = o || m, typeof n) {
              case "string":
                n = n.trim(), g = n;
                var y = o ? t : e;
                if (s = y[g], !s) {
                  ":" === n.charAt(0) && ":" === n.charAt(1) && (p = !0, n = n.substring(2));
                  var b = o ? v : d,
                      w = new co(b),
                      x = new fo(w, r, b);
                  s = x.parse(n), s.constant ? s.$$watchDelegate = f : p ? s.$$watchDelegate = s.literal ? l : c : s.inputs && (s.$$watchDelegate = u), o && (s = a(s)), y[g] = s;
                }
                return h(s, i);
              case "function":
                return h(n, i);
              default:
                return h($, i);
            }
          }
          function a(e) {
            function t(t, n, r, i) {
              var o = m;
              m = !0;
              try {
                return e(t, n, r, i);
              } finally {
                m = o;
              }
            }
            if (!e)
              return e;
            t.$$watchDelegate = e.$$watchDelegate, t.assign = a(e.assign), t.constant = e.constant, t.literal = e.literal;
            for (var n = 0; e.inputs && n < e.inputs.length; ++n)
              e.inputs[n] = a(e.inputs[n]);
            return t.inputs = e.inputs, t;
          }
          function s(e, t) {
            return null == e || null == t ? e === t : "object" == typeof e && (e = pn(e), "object" == typeof e) ? !1 : e === t || e !== e && t !== t;
          }
          function u(e, t, r, i, o) {
            var a,
                u = i.inputs;
            if (1 === u.length) {
              var c = s;
              return u = u[0], e.$watch(function(e) {
                var t = u(e);
                return s(t, c) || (a = i(e, n, n, [t]), c = t && pn(t)), a;
              }, t, r, o);
            }
            for (var l = [],
                f = [],
                h = 0,
                p = u.length; p > h; h++)
              l[h] = s, f[h] = null;
            return e.$watch(function(e) {
              for (var t = !1,
                  r = 0,
                  o = u.length; o > r; r++) {
                var c = u[r](e);
                (t || (t = !s(c, l[r]))) && (f[r] = c, l[r] = c && pn(c));
              }
              return t && (a = i(e, n, n, f)), a;
            }, t, r, o);
          }
          function c(e, t, n, r) {
            var i,
                o;
            return i = e.$watch(function(e) {
              return r(e);
            }, function(e, n, r) {
              o = e, k(t) && t.apply(this, arguments), b(e) && r.$$postDigest(function() {
                b(o) && i();
              });
            }, n);
          }
          function l(e, t, n, r) {
            function i(e) {
              var t = !0;
              return o(e, function(e) {
                b(e) || (t = !1);
              }), t;
            }
            var a,
                s;
            return a = e.$watch(function(e) {
              return r(e);
            }, function(e, n, r) {
              s = e, k(t) && t.call(this, e, n, r), i(e) && r.$$postDigest(function() {
                i(s) && a();
              });
            }, n);
          }
          function f(e, t, n, r) {
            var i;
            return i = e.$watch(function(e) {
              return r(e);
            }, function(e, n, r) {
              k(t) && t.apply(this, arguments), i();
            }, n);
          }
          function h(e, t) {
            if (!t)
              return e;
            var n = e.$$watchDelegate,
                r = !1,
                i = n !== l && n !== c,
                o = i ? function(n, i, o, a) {
                  var s = r && a ? a[0] : e(n, i, o, a);
                  return t(s, n, i);
                } : function(n, r, i, o) {
                  var a = e(n, r, i, o),
                      s = t(a, n, r);
                  return b(a) ? s : a;
                };
            return e.$$watchDelegate && e.$$watchDelegate !== u ? o.$$watchDelegate = e.$$watchDelegate : t.$stateful || (o.$$watchDelegate = u, r = !e.inputs, o.inputs = e.inputs ? e.inputs : [e]), o;
          }
          var p = Yr().noUnsafeEval,
              d = {
                csp: p,
                expensiveChecks: !1
              },
              v = {
                csp: p,
                expensiveChecks: !0
              },
              m = !1;
          return i.$$runningExpensiveChecks = function() {
            return m;
          }, i;
        }];
      }
      function $n() {
        this.$get = ["$rootScope", "$exceptionHandler", function(e, t) {
          return mn(function(t) {
            e.$evalAsync(t);
          }, t);
        }];
      }
      function vn() {
        this.$get = ["$browser", "$exceptionHandler", function(e, t) {
          return mn(function(t) {
            e.defer(t);
          }, t);
        }];
      }
      function mn(e, t) {
        function i(e, t, n) {
          function r(t) {
            return function(n) {
              i || (i = !0, t.call(e, n));
            };
          }
          var i = !1;
          return [r(t), r(n)];
        }
        function a() {
          this.$$state = {status: 0};
        }
        function s(e, t) {
          return function(n) {
            t.call(e, n);
          };
        }
        function u(e) {
          var r,
              i,
              o;
          o = e.pending, e.processScheduled = !1, e.pending = n;
          for (var a = 0,
              s = o.length; s > a; ++a) {
            i = o[a][0], r = o[a][e.status];
            try {
              k(r) ? i.resolve(r(e.value)) : 1 === e.status ? i.resolve(e.value) : i.reject(e.value);
            } catch (u) {
              i.reject(u), t(u);
            }
          }
        }
        function c(t) {
          !t.processScheduled && t.pending && (t.processScheduled = !0, e(function() {
            u(t);
          }));
        }
        function l() {
          this.promise = new a, this.resolve = s(this, this.resolve), this.reject = s(this, this.reject), this.notify = s(this, this.notify);
        }
        function h(e) {
          var t = new l,
              n = 0,
              r = Lr(e) ? [] : {};
          return o(e, function(e, i) {
            n++, g(e).then(function(e) {
              r.hasOwnProperty(i) || (r[i] = e, --n || t.resolve(r));
            }, function(e) {
              r.hasOwnProperty(i) || t.reject(e);
            });
          }), 0 === n && t.resolve(r), t.promise;
        }
        var p = r("$q", TypeError),
            d = function() {
              return new l;
            };
        f(a.prototype, {
          then: function(e, t, n) {
            if (y(e) && y(t) && y(n))
              return this;
            var r = new l;
            return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([r, e, t, n]), this.$$state.status > 0 && c(this.$$state), r.promise;
          },
          "catch": function(e) {
            return this.then(null, e);
          },
          "finally": function(e, t) {
            return this.then(function(t) {
              return m(t, !0, e);
            }, function(t) {
              return m(t, !1, e);
            }, t);
          }
        }), f(l.prototype, {
          resolve: function(e) {
            this.promise.$$state.status || (e === this.promise ? this.$$reject(p("qcycle", "Expected promise to be resolved with value other than itself '{0}'", e)) : this.$$resolve(e));
          },
          $$resolve: function(e) {
            var n,
                r;
            r = i(this, this.$$resolve, this.$$reject);
            try {
              (w(e) || k(e)) && (n = e && e.then), k(n) ? (this.promise.$$state.status = -1, n.call(e, r[0], r[1], this.notify)) : (this.promise.$$state.value = e, this.promise.$$state.status = 1, c(this.promise.$$state));
            } catch (o) {
              r[1](o), t(o);
            }
          },
          reject: function(e) {
            this.promise.$$state.status || this.$$reject(e);
          },
          $$reject: function(e) {
            this.promise.$$state.value = e, this.promise.$$state.status = 2, c(this.promise.$$state);
          },
          notify: function(n) {
            var r = this.promise.$$state.pending;
            this.promise.$$state.status <= 0 && r && r.length && e(function() {
              for (var e,
                  i,
                  o = 0,
                  a = r.length; a > o; o++) {
                i = r[o][0], e = r[o][3];
                try {
                  i.notify(k(e) ? e(n) : n);
                } catch (s) {
                  t(s);
                }
              }
            });
          }
        });
        var $ = function(e) {
          var t = new l;
          return t.reject(e), t.promise;
        },
            v = function(e, t) {
              var n = new l;
              return t ? n.resolve(e) : n.reject(e), n.promise;
            },
            m = function(e, t, n) {
              var r = null;
              try {
                k(n) && (r = n());
              } catch (i) {
                return v(i, !1);
              }
              return D(r) ? r.then(function() {
                return v(e, t);
              }, function(e) {
                return v(e, !1);
              }) : v(e, t);
            },
            g = function(e, t, n, r) {
              var i = new l;
              return i.resolve(e), i.promise.then(t, n, r);
            },
            b = g,
            x = function S(e) {
              function t(e) {
                r.resolve(e);
              }
              function n(e) {
                r.reject(e);
              }
              if (!k(e))
                throw p("norslvr", "Expected resolverFn, got '{0}'", e);
              if (!(this instanceof S))
                return new S(e);
              var r = new l;
              return e(t, n), r.promise;
            };
        return x.defer = d, x.reject = $, x.when = g, x.resolve = b, x.all = h, x;
      }
      function gn() {
        this.$get = ["$window", "$timeout", function(e, t) {
          var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame,
              r = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame,
              i = !!n,
              o = i ? function(e) {
                var t = n(e);
                return function() {
                  r(t);
                };
              } : function(e) {
                var n = t(e, 16.66, !1);
                return function() {
                  t.cancel(n);
                };
              };
          return o.supported = i, o;
        }];
      }
      function yn() {
        function e(e) {
          function t() {
            this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = u(), this.$$ChildScope = null;
          }
          return t.prototype = e, t;
        }
        var t = 10,
            n = r("$rootScope"),
            a = null,
            s = null;
        this.digestTtl = function(e) {
          return arguments.length && (t = e), t;
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(r, c, l, f) {
          function h(e) {
            e.currentScope.$$destroyed = !0;
          }
          function p(e) {
            9 === Nr && (e.$$childHead && p(e.$$childHead), e.$$nextSibling && p(e.$$nextSibling)), e.$parent = e.$$nextSibling = e.$$prevSibling = e.$$childHead = e.$$childTail = e.$root = e.$$watchers = null;
          }
          function d() {
            this.$id = u(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null;
          }
          function v(e) {
            if (C.$$phase)
              throw n("inprog", "{0} already in progress", C.$$phase);
            C.$$phase = e;
          }
          function m() {
            C.$$phase = null;
          }
          function g(e, t) {
            do
              e.$$watchersCount += t;
 while (e = e.$parent);
          }
          function b(e, t, n) {
            do
              e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n];
 while (e = e.$parent);
          }
          function x() {}
          function S() {
            for (; M.length; )
              try {
                M.shift()();
              } catch (e) {
                c(e);
              }
            s = null;
          }
          function E() {
            null === s && (s = f.defer(function() {
              C.$apply(S);
            }));
          }
          d.prototype = {
            constructor: d,
            $new: function(t, n) {
              var r;
              return n = n || this, t ? (r = new d, r.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = e(this)), r = new this.$$ChildScope), r.$parent = n, r.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = r, n.$$childTail = r) : n.$$childHead = n.$$childTail = r, (t || n != this) && r.$on("$destroy", h), r;
            },
            $watch: function(e, t, n, r) {
              var i = l(e);
              if (i.$$watchDelegate)
                return i.$$watchDelegate(this, t, n, i, e);
              var o = this,
                  s = o.$$watchers,
                  u = {
                    fn: t,
                    last: x,
                    get: i,
                    exp: r || e,
                    eq: !!n
                  };
              return a = null, k(t) || (u.fn = $), s || (s = o.$$watchers = []), s.unshift(u), g(this, 1), function() {
                q(s, u) >= 0 && g(o, -1), a = null;
              };
            },
            $watchGroup: function(e, t) {
              function n() {
                u = !1, c ? (c = !1, t(i, i, s)) : t(i, r, s);
              }
              var r = new Array(e.length),
                  i = new Array(e.length),
                  a = [],
                  s = this,
                  u = !1,
                  c = !0;
              if (!e.length) {
                var l = !0;
                return s.$evalAsync(function() {
                  l && t(i, i, s);
                }), function() {
                  l = !1;
                };
              }
              return 1 === e.length ? this.$watch(e[0], function(e, n, o) {
                i[0] = e, r[0] = n, t(i, e === n ? i : r, o);
              }) : (o(e, function(e, t) {
                var o = s.$watch(e, function(e, o) {
                  i[t] = e, r[t] = o, u || (u = !0, s.$evalAsync(n));
                });
                a.push(o);
              }), function() {
                for (; a.length; )
                  a.shift()();
              });
            },
            $watchCollection: function(e, t) {
              function n(e) {
                o = e;
                var t,
                    n,
                    r,
                    s,
                    u;
                if (!y(o)) {
                  if (w(o))
                    if (i(o)) {
                      a !== p && (a = p, v = a.length = 0, f++), t = o.length, v !== t && (f++, a.length = v = t);
                      for (var c = 0; t > c; c++)
                        u = a[c], s = o[c], r = u !== u && s !== s, r || u === s || (f++, a[c] = s);
                    } else {
                      a !== d && (a = d = {}, v = 0, f++), t = 0;
                      for (n in o)
                        Ar.call(o, n) && (t++, s = o[n], u = a[n], n in a ? (r = u !== u && s !== s, r || u === s || (f++, a[n] = s)) : (v++, a[n] = s, f++));
                      if (v > t) {
                        f++;
                        for (n in a)
                          Ar.call(o, n) || (v--, delete a[n]);
                      }
                    }
                  else
                    a !== o && (a = o, f++);
                  return f;
                }
              }
              function r() {
                if ($ ? ($ = !1, t(o, o, u)) : t(o, s, u), c)
                  if (w(o))
                    if (i(o)) {
                      s = new Array(o.length);
                      for (var e = 0; e < o.length; e++)
                        s[e] = o[e];
                    } else {
                      s = {};
                      for (var n in o)
                        Ar.call(o, n) && (s[n] = o[n]);
                    }
                  else
                    s = o;
              }
              n.$stateful = !0;
              var o,
                  a,
                  s,
                  u = this,
                  c = t.length > 1,
                  f = 0,
                  h = l(e, n),
                  p = [],
                  d = {},
                  $ = !0,
                  v = 0;
              return this.$watch(h, r);
            },
            $digest: function() {
              var e,
                  r,
                  i,
                  o,
                  u,
                  l,
                  h,
                  p,
                  d,
                  $,
                  g,
                  y,
                  b = t,
                  w = this,
                  E = [];
              v("$digest"), f.$$checkUrlChange(), this === C && null !== s && (f.defer.cancel(s), S()), a = null;
              do {
                for (p = !1, $ = w; A.length; ) {
                  try {
                    y = A.shift(), y.scope.$eval(y.expression, y.locals);
                  } catch (M) {
                    c(M);
                  }
                  a = null;
                }
                e: do {
                  if (l = $.$$watchers)
                    for (h = l.length; h--; )
                      try {
                        if (e = l[h])
                          if (u = e.get, (r = u($)) === (i = e.last) || (e.eq ? B(r, i) : "number" == typeof r && "number" == typeof i && isNaN(r) && isNaN(i))) {
                            if (e === a) {
                              p = !1;
                              break e;
                            }
                          } else
                            p = !0, a = e, e.last = e.eq ? U(r, null) : r, o = e.fn, o(r, i === x ? r : i, $), 5 > b && (g = 4 - b, E[g] || (E[g] = []), E[g].push({
                              msg: k(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp,
                              newVal: r,
                              oldVal: i
                            }));
                      } catch (M) {
                        c(M);
                      }
                  if (!(d = $.$$watchersCount && $.$$childHead || $ !== w && $.$$nextSibling))
                    for (; $ !== w && !(d = $.$$nextSibling); )
                      $ = $.$parent;
                } while ($ = d);
                if ((p || A.length) && !b--)
                  throw m(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", t, E);
              } while (p || A.length);
              for (m(); O.length; )
                try {
                  O.shift()();
                } catch (M) {
                  c(M);
                }
            },
            $destroy: function() {
              if (!this.$$destroyed) {
                var e = this.$parent;
                this.$broadcast("$destroy"), this.$$destroyed = !0, this === C && f.$$applicationDestroyed(), g(this, -this.$$watchersCount);
                for (var t in this.$$listenerCount)
                  b(this, this.$$listenerCount[t], t);
                e && e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e && e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = $, this.$on = this.$watch = this.$watchGroup = function() {
                  return $;
                }, this.$$listeners = {}, this.$$nextSibling = null, p(this);
              }
            },
            $eval: function(e, t) {
              return l(e)(this, t);
            },
            $evalAsync: function(e, t) {
              C.$$phase || A.length || f.defer(function() {
                A.length && C.$digest();
              }), A.push({
                scope: this,
                expression: l(e),
                locals: t
              });
            },
            $$postDigest: function(e) {
              O.push(e);
            },
            $apply: function(e) {
              try {
                v("$apply");
                try {
                  return this.$eval(e);
                } finally {
                  m();
                }
              } catch (t) {
                c(t);
              } finally {
                try {
                  C.$digest();
                } catch (t) {
                  throw c(t), t;
                }
              }
            },
            $applyAsync: function(e) {
              function t() {
                n.$eval(e);
              }
              var n = this;
              e && M.push(t), e = l(e), E();
            },
            $on: function(e, t) {
              var n = this.$$listeners[e];
              n || (this.$$listeners[e] = n = []), n.push(t);
              var r = this;
              do
                r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e]++;
 while (r = r.$parent);
              var i = this;
              return function() {
                var r = n.indexOf(t);
                -1 !== r && (n[r] = null, b(i, 1, e));
              };
            },
            $emit: function(e, t) {
              var n,
                  r,
                  i,
                  o = [],
                  a = this,
                  s = !1,
                  u = {
                    name: e,
                    targetScope: a,
                    stopPropagation: function() {
                      s = !0;
                    },
                    preventDefault: function() {
                      u.defaultPrevented = !0;
                    },
                    defaultPrevented: !1
                  },
                  l = H([u], arguments, 1);
              do {
                for (n = a.$$listeners[e] || o, u.currentScope = a, r = 0, i = n.length; i > r; r++)
                  if (n[r])
                    try {
                      n[r].apply(null, l);
                    } catch (f) {
                      c(f);
                    }
                  else
                    n.splice(r, 1), r--, i--;
                if (s)
                  return u.currentScope = null, u;
                a = a.$parent;
              } while (a);
              return u.currentScope = null, u;
            },
            $broadcast: function(e, t) {
              var n = this,
                  r = n,
                  i = n,
                  o = {
                    name: e,
                    targetScope: n,
                    preventDefault: function() {
                      o.defaultPrevented = !0;
                    },
                    defaultPrevented: !1
                  };
              if (!n.$$listenerCount[e])
                return o;
              for (var a,
                  s,
                  u,
                  l = H([o], arguments, 1); r = i; ) {
                for (o.currentScope = r, a = r.$$listeners[e] || [], s = 0, u = a.length; u > s; s++)
                  if (a[s])
                    try {
                      a[s].apply(null, l);
                    } catch (f) {
                      c(f);
                    }
                  else
                    a.splice(s, 1), s--, u--;
                if (!(i = r.$$listenerCount[e] && r.$$childHead || r !== n && r.$$nextSibling))
                  for (; r !== n && !(i = r.$$nextSibling); )
                    r = r.$parent;
              }
              return o.currentScope = null, o;
            }
          };
          var C = new d,
              A = C.$$asyncQueue = [],
              O = C.$$postDigestQueue = [],
              M = C.$$applyAsyncQueue = [];
          return C;
        }];
      }
      function bn() {
        var e = /^\s*(https?|ftp|mailto|tel|file):/,
            t = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(t) {
          return b(t) ? (e = t, this) : e;
        }, this.imgSrcSanitizationWhitelist = function(e) {
          return b(e) ? (t = e, this) : t;
        }, this.$get = function() {
          return function(n, r) {
            var i,
                o = r ? t : e;
            return i = Mn(n).href, "" === i || i.match(o) ? n : "unsafe:" + i;
          };
        };
      }
      function wn(e) {
        if ("self" === e)
          return e;
        if (S(e)) {
          if (e.indexOf("***") > -1)
            throw po("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
          return e = Gr(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + e + "$");
        }
        if (A(e))
          return new RegExp("^" + e.source + "$");
        throw po("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
      }
      function xn(e) {
        var t = [];
        return b(e) && o(e, function(e) {
          t.push(wn(e));
        }), t;
      }
      function Sn() {
        this.SCE_CONTEXTS = $o;
        var e = ["self"],
            t = [];
        this.resourceUrlWhitelist = function(t) {
          return arguments.length && (e = xn(t)), e;
        }, this.resourceUrlBlacklist = function(e) {
          return arguments.length && (t = xn(e)), t;
        }, this.$get = ["$injector", function(n) {
          function r(e, t) {
            return "self" === e ? Tn(t) : !!e.exec(t.href);
          }
          function i(n) {
            var i,
                o,
                a = Mn(n.toString()),
                s = !1;
            for (i = 0, o = e.length; o > i; i++)
              if (r(e[i], a)) {
                s = !0;
                break;
              }
            if (s)
              for (i = 0, o = t.length; o > i; i++)
                if (r(t[i], a)) {
                  s = !1;
                  break;
                }
            return s;
          }
          function o(e) {
            var t = function(e) {
              this.$$unwrapTrustedValue = function() {
                return e;
              };
            };
            return e && (t.prototype = new e), t.prototype.valueOf = function() {
              return this.$$unwrapTrustedValue();
            }, t.prototype.toString = function() {
              return this.$$unwrapTrustedValue().toString();
            }, t;
          }
          function a(e, t) {
            var n = f.hasOwnProperty(e) ? f[e] : null;
            if (!n)
              throw po("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
            if (null === t || y(t) || "" === t)
              return t;
            if ("string" != typeof t)
              throw po("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
            return new n(t);
          }
          function s(e) {
            return e instanceof l ? e.$$unwrapTrustedValue() : e;
          }
          function u(e, t) {
            if (null === t || y(t) || "" === t)
              return t;
            var n = f.hasOwnProperty(e) ? f[e] : null;
            if (n && t instanceof n)
              return t.$$unwrapTrustedValue();
            if (e === $o.RESOURCE_URL) {
              if (i(t))
                return t;
              throw po("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString());
            }
            if (e === $o.HTML)
              return c(t);
            throw po("unsafe", "Attempting to use an unsafe value in a safe context.");
          }
          var c = function(e) {
            throw po("unsafe", "Attempting to use an unsafe value in a safe context.");
          };
          n.has("$sanitize") && (c = n.get("$sanitize"));
          var l = o(),
              f = {};
          return f[$o.HTML] = o(l), f[$o.CSS] = o(l), f[$o.URL] = o(l), f[$o.JS] = o(l), f[$o.RESOURCE_URL] = o(f[$o.URL]), {
            trustAs: a,
            getTrusted: u,
            valueOf: s
          };
        }];
      }
      function En() {
        var e = !0;
        this.enabled = function(t) {
          return arguments.length && (e = !!t), e;
        }, this.$get = ["$parse", "$sceDelegate", function(t, n) {
          if (e && 8 > Nr)
            throw po("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
          var r = F($o);
          r.isEnabled = function() {
            return e;
          }, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, e || (r.trustAs = r.getTrusted = function(e, t) {
            return t;
          }, r.valueOf = v), r.parseAs = function(e, n) {
            var i = t(n);
            return i.literal && i.constant ? i : t(n, function(t) {
              return r.getTrusted(e, t);
            });
          };
          var i = r.parseAs,
              a = r.getTrusted,
              s = r.trustAs;
          return o($o, function(e, t) {
            var n = kr(t);
            r[xe("parse_as_" + n)] = function(t) {
              return i(e, t);
            }, r[xe("get_trusted_" + n)] = function(t) {
              return a(e, t);
            }, r[xe("trust_as_" + n)] = function(t) {
              return s(e, t);
            };
          }), r;
        }];
      }
      function Cn() {
        this.$get = ["$window", "$document", function(e, t) {
          var n,
              r,
              i = {},
              o = p((/android (\d+)/.exec(kr((e.navigator || {}).userAgent)) || [])[1]),
              a = /Boxee/i.test((e.navigator || {}).userAgent),
              s = t[0] || {},
              u = /^(Moz|webkit|ms)(?=[A-Z])/,
              c = s.body && s.body.style,
              l = !1,
              f = !1;
          if (c) {
            for (var h in c)
              if (r = u.exec(h)) {
                n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
                break;
              }
            n || (n = "WebkitOpacity" in c && "webkit"), l = !!("transition" in c || n + "Transition" in c), f = !!("animation" in c || n + "Animation" in c), !o || l && f || (l = S(c.webkitTransition), f = S(c.webkitAnimation));
          }
          return {
            history: !(!e.history || !e.history.pushState || 4 > o || a),
            hasEvent: function(e) {
              if ("input" === e && 11 >= Nr)
                return !1;
              if (y(i[e])) {
                var t = s.createElement("div");
                i[e] = "on" + e in t;
              }
              return i[e];
            },
            csp: Yr(),
            vendorPrefix: n,
            transitions: l,
            animations: f,
            android: o
          };
        }];
      }
      function kn() {
        this.$get = ["$templateCache", "$http", "$q", "$sce", function(e, t, n, r) {
          function i(o, a) {
            function s(e) {
              if (!a)
                throw Ui("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", o, e.status, e.statusText);
              return n.reject(e);
            }
            i.totalPendingRequests++, S(o) && !y(e.get(o)) || (o = r.getTrustedResourceUrl(o));
            var u = t.defaults && t.defaults.transformResponse;
            Lr(u) ? u = u.filter(function(e) {
              return e !== xt;
            }) : u === xt && (u = null);
            var c = {
              cache: e,
              transformResponse: u
            };
            return t.get(o, c)["finally"](function() {
              i.totalPendingRequests--;
            }).then(function(t) {
              return e.put(o, t.data), t.data;
            }, s);
          }
          return i.totalPendingRequests = 0, i;
        }];
      }
      function An() {
        this.$get = ["$rootScope", "$browser", "$location", function(e, t, n) {
          var r = {};
          return r.findBindings = function(e, t, n) {
            var r = e.getElementsByClassName("ng-binding"),
                i = [];
            return o(r, function(e) {
              var r = Fr.element(e).data("$binding");
              r && o(r, function(r) {
                if (n) {
                  var o = new RegExp("(^|\\s)" + Gr(t) + "(\\s|\\||$)");
                  o.test(r) && i.push(e);
                } else
                  -1 != r.indexOf(t) && i.push(e);
              });
            }), i;
          }, r.findModels = function(e, t, n) {
            for (var r = ["ng-", "data-ng-", "ng\\:"],
                i = 0; i < r.length; ++i) {
              var o = n ? "=" : "*=",
                  a = "[" + r[i] + "model" + o + '"' + t + '"]',
                  s = e.querySelectorAll(a);
              if (s.length)
                return s;
            }
          }, r.getLocation = function() {
            return n.url();
          }, r.setLocation = function(t) {
            t !== n.url() && (n.url(t), e.$digest());
          }, r.whenStable = function(e) {
            t.notifyWhenNoOutstandingRequests(e);
          }, r;
        }];
      }
      function On() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(e, t, n, r, i) {
          function o(o, s, u) {
            k(o) || (u = s, s = o, o = $);
            var c,
                l = L(arguments, 3),
                f = b(u) && !u,
                h = (f ? r : n).defer(),
                p = h.promise;
            return c = t.defer(function() {
              try {
                h.resolve(o.apply(null, l));
              } catch (t) {
                h.reject(t), i(t);
              } finally {
                delete a[p.$$timeoutId];
              }
              f || e.$apply();
            }, s), p.$$timeoutId = c, a[c] = h, p;
          }
          var a = {};
          return o.cancel = function(e) {
            return e && e.$$timeoutId in a ? (a[e.$$timeoutId].reject("canceled"), delete a[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1;
          }, o;
        }];
      }
      function Mn(e) {
        var t = e;
        return Nr && (vo.setAttribute("href", t), t = vo.href), vo.setAttribute("href", t), {
          href: vo.href,
          protocol: vo.protocol ? vo.protocol.replace(/:$/, "") : "",
          host: vo.host,
          search: vo.search ? vo.search.replace(/^\?/, "") : "",
          hash: vo.hash ? vo.hash.replace(/^#/, "") : "",
          hostname: vo.hostname,
          port: vo.port,
          pathname: "/" === vo.pathname.charAt(0) ? vo.pathname : "/" + vo.pathname
        };
      }
      function Tn(e) {
        var t = S(e) ? Mn(e) : e;
        return t.protocol === mo.protocol && t.host === mo.host;
      }
      function Nn() {
        this.$get = m(e);
      }
      function jn(e) {
        function t(e) {
          try {
            return decodeURIComponent(e);
          } catch (t) {
            return e;
          }
        }
        var n = e[0] || {},
            r = {},
            i = "";
        return function() {
          var e,
              o,
              a,
              s,
              u,
              c = n.cookie || "";
          if (c !== i)
            for (i = c, e = i.split("; "), r = {}, a = 0; a < e.length; a++)
              o = e[a], s = o.indexOf("="), s > 0 && (u = t(o.substring(0, s)), y(r[u]) && (r[u] = t(o.substring(s + 1))));
          return r;
        };
      }
      function Vn() {
        this.$get = jn;
      }
      function Dn(e) {
        function t(r, i) {
          if (w(r)) {
            var a = {};
            return o(r, function(e, n) {
              a[n] = t(n, e);
            }), a;
          }
          return e.factory(r + n, i);
        }
        var n = "Filter";
        this.register = t, this.$get = ["$injector", function(e) {
          return function(t) {
            return e.get(t + n);
          };
        }], t("currency", qn), t("date", er), t("filter", Pn), t("json", tr), t("limitTo", nr), t("lowercase", Eo), t("number", Un), t("orderBy", rr), t("uppercase", Co);
      }
      function Pn() {
        return function(e, t, n) {
          if (!i(e)) {
            if (null == e)
              return e;
            throw r("filter")("notarray", "Expected array but received: {0}", e);
          }
          var o,
              a,
              s = Rn(t);
          switch (s) {
            case "function":
              o = t;
              break;
            case "boolean":
            case "null":
            case "number":
            case "string":
              a = !0;
            case "object":
              o = _n(t, n, a);
              break;
            default:
              return e;
          }
          return Array.prototype.filter.call(e, o);
        };
      }
      function _n(e, t, n) {
        var r,
            i = w(e) && "$" in e;
        return t === !0 ? t = B : k(t) || (t = function(e, t) {
          return y(e) ? !1 : null === e || null === t ? e === t : w(t) || w(e) && !g(e) ? !1 : (e = kr("" + e), t = kr("" + t), -1 !== e.indexOf(t));
        }), r = function(r) {
          return i && !w(r) ? In(r, e.$, t, !1) : In(r, e, t, n);
        };
      }
      function In(e, t, n, r, i) {
        var o = Rn(e),
            a = Rn(t);
        if ("string" === a && "!" === t.charAt(0))
          return !In(e, t.substring(1), n, r);
        if (Lr(e))
          return e.some(function(e) {
            return In(e, t, n, r);
          });
        switch (o) {
          case "object":
            var s;
            if (r) {
              for (s in e)
                if ("$" !== s.charAt(0) && In(e[s], t, n, !0))
                  return !0;
              return i ? !1 : In(e, t, n, !1);
            }
            if ("object" === a) {
              for (s in t) {
                var u = t[s];
                if (!k(u) && !y(u)) {
                  var c = "$" === s,
                      l = c ? e : e[s];
                  if (!In(l, u, n, c, c))
                    return !1;
                }
              }
              return !0;
            }
            return n(e, t);
          case "function":
            return !1;
          default:
            return n(e, t);
        }
      }
      function Rn(e) {
        return null === e ? "null" : typeof e;
      }
      function qn(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n, r) {
          return y(n) && (n = t.CURRENCY_SYM), y(r) && (r = t.PATTERNS[1].maxFrac), null == e ? e : Hn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, r).replace(/\u00A4/g, n);
        };
      }
      function Un(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n) {
          return null == e ? e : Hn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n);
        };
      }
      function Fn(e) {
        var t,
            n,
            r,
            i,
            o,
            a = 0;
        for ((n = e.indexOf(yo)) > -1 && (e = e.replace(yo, "")), (r = e.search(/e/i)) > 0 ? (0 > n && (n = r), n += +e.slice(r + 1), e = e.substring(0, r)) : 0 > n && (n = e.length), r = 0; e.charAt(r) == bo; r++)
          ;
        if (r == (o = e.length))
          t = [0], n = 1;
        else {
          for (o--; e.charAt(o) == bo; )
            o--;
          for (n -= r, t = [], i = 0; o >= r; r++, i++)
            t[i] = +e.charAt(r);
        }
        return n > go && (t = t.splice(0, go - 1), a = n - 1, n = 1), {
          d: t,
          e: a,
          i: n
        };
      }
      function Bn(e, t, n, r) {
        var i = e.d,
            o = i.length - e.i;
        t = y(t) ? Math.min(Math.max(n, o), r) : +t;
        var a = t + e.i,
            s = i[a];
        if (a > 0)
          i.splice(a);
        else {
          e.i = 1, i.length = a = t + 1;
          for (var u = 0; a > u; u++)
            i[u] = 0;
        }
        for (s >= 5 && i[a - 1]++; t > o; o++)
          i.push(0);
        var c = i.reduceRight(function(e, t, n, r) {
          return t += e, r[n] = t % 10, Math.floor(t / 10);
        }, 0);
        c && (i.unshift(c), e.i++);
      }
      function Hn(e, t, n, r, i) {
        if (!S(e) && !E(e) || isNaN(e))
          return "";
        var o,
            a = !isFinite(e),
            s = !1,
            u = Math.abs(e) + "",
            c = "";
        if (a)
          c = "∞";
        else {
          o = Fn(u), Bn(o, i, t.minFrac, t.maxFrac);
          var l = o.d,
              f = o.i,
              h = o.e,
              p = [];
          for (s = l.reduce(function(e, t) {
            return e && !t;
          }, !0); 0 > f; )
            l.unshift(0), f++;
          f > 0 ? p = l.splice(f, l.length) : (p = l, l = [0]);
          var d = [];
          for (l.length >= t.lgSize && d.unshift(l.splice(-t.lgSize, l.length).join("")); l.length > t.gSize; )
            d.unshift(l.splice(-t.gSize, l.length).join(""));
          l.length && d.unshift(l.join("")), c = d.join(n), p.length && (c += r + p.join("")), h && (c += "e+" + h);
        }
        return 0 > e && !s ? t.negPre + c + t.negSuf : t.posPre + c + t.posSuf;
      }
      function Ln(e, t, n) {
        var r = "";
        for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t; )
          e = bo + e;
        return n && (e = e.substr(e.length - t)), r + e;
      }
      function zn(e, t, n, r) {
        return n = n || 0, function(i) {
          var o = i["get" + e]();
          return (n > 0 || o > -n) && (o += n), 0 === o && -12 == n && (o = 12), Ln(o, t, r);
        };
      }
      function Wn(e, t) {
        return function(n, r) {
          var i = n["get" + e](),
              o = Or(t ? "SHORT" + e : e);
          return r[o][i];
        };
      }
      function Gn(e, t, n) {
        var r = -1 * n,
            i = r >= 0 ? "+" : "";
        return i += Ln(Math[r > 0 ? "floor" : "ceil"](r / 60), 2) + Ln(Math.abs(r % 60), 2);
      }
      function Yn(e) {
        var t = new Date(e, 0, 1).getDay();
        return new Date(e, 0, (4 >= t ? 5 : 12) - t);
      }
      function Jn(e) {
        return new Date(e.getFullYear(), e.getMonth(), e.getDate() + (4 - e.getDay()));
      }
      function Xn(e) {
        return function(t) {
          var n = Yn(t.getFullYear()),
              r = Jn(t),
              i = +r - +n,
              o = 1 + Math.round(i / 6048e5);
          return Ln(o, e);
        };
      }
      function Zn(e, t) {
        return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1];
      }
      function Kn(e, t) {
        return e.getFullYear() <= 0 ? t.ERAS[0] : t.ERAS[1];
      }
      function Qn(e, t) {
        return e.getFullYear() <= 0 ? t.ERANAMES[0] : t.ERANAMES[1];
      }
      function er(e) {
        function t(e) {
          var t;
          if (t = e.match(n)) {
            var r = new Date(0),
                i = 0,
                o = 0,
                a = t[8] ? r.setUTCFullYear : r.setFullYear,
                s = t[8] ? r.setUTCHours : r.setHours;
            t[9] && (i = p(t[9] + t[10]), o = p(t[9] + t[11])), a.call(r, p(t[1]), p(t[2]) - 1, p(t[3]));
            var u = p(t[4] || 0) - i,
                c = p(t[5] || 0) - o,
                l = p(t[6] || 0),
                f = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
            return s.call(r, u, c, l, f), r;
          }
          return e;
        }
        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(n, r, i) {
          var a,
              s,
              u = "",
              c = [];
          if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, S(n) && (n = So.test(n) ? p(n) : t(n)), E(n) && (n = new Date(n)), !C(n) || !isFinite(n.getTime()))
            return n;
          for (; r; )
            s = xo.exec(r), s ? (c = H(c, s, 1), r = c.pop()) : (c.push(r), r = null);
          var l = n.getTimezoneOffset();
          return i && (l = J(i, l), n = Z(n, i, !0)), o(c, function(t) {
            a = wo[t], u += a ? a(n, e.DATETIME_FORMATS, l) : "''" === t ? "'" : t.replace(/(^'|'$)/g, "").replace(/''/g, "'");
          }), u;
        };
      }
      function tr() {
        return function(e, t) {
          return y(t) && (t = 2), G(e, t);
        };
      }
      function nr() {
        return function(e, t, n) {
          return t = Math.abs(Number(t)) === 1 / 0 ? Number(t) : p(t), isNaN(t) ? e : (E(e) && (e = e.toString()), Lr(e) || S(e) ? (n = !n || isNaN(n) ? 0 : p(n), n = 0 > n ? Math.max(0, e.length + n) : n, t >= 0 ? e.slice(n, n + t) : 0 === n ? e.slice(t, e.length) : e.slice(Math.max(0, n + t), n)) : e);
        };
      }
      function rr(e) {
        function t(t, n) {
          return n = n ? -1 : 1, t.map(function(t) {
            var r = 1,
                i = v;
            if (k(t))
              i = t;
            else if (S(t) && ("+" != t.charAt(0) && "-" != t.charAt(0) || (r = "-" == t.charAt(0) ? -1 : 1, t = t.substring(1)), "" !== t && (i = e(t), i.constant))) {
              var o = i();
              i = function(e) {
                return e[o];
              };
            }
            return {
              get: i,
              descending: r * n
            };
          });
        }
        function n(e) {
          switch (typeof e) {
            case "number":
            case "boolean":
            case "string":
              return !0;
            default:
              return !1;
          }
        }
        function r(e, t) {
          return "function" == typeof e.valueOf && (e = e.valueOf(), n(e)) ? e : g(e) && (e = e.toString(), n(e)) ? e : t;
        }
        function o(e, t) {
          var n = typeof e;
          return null === e ? (n = "string", e = "null") : "string" === n ? e = e.toLowerCase() : "object" === n && (e = r(e, t)), {
            value: e,
            type: n
          };
        }
        function a(e, t) {
          var n = 0;
          return e.type === t.type ? e.value !== t.value && (n = e.value < t.value ? -1 : 1) : n = e.type < t.type ? -1 : 1, n;
        }
        return function(e, n, r) {
          function s(e, t) {
            return {
              value: e,
              predicateValues: c.map(function(n) {
                return o(n.get(e), t);
              })
            };
          }
          function u(e, t) {
            for (var n = 0,
                r = 0,
                i = c.length; i > r && !(n = a(e.predicateValues[r], t.predicateValues[r]) * c[r].descending); ++r)
              ;
            return n;
          }
          if (!i(e))
            return e;
          Lr(n) || (n = [n]), 0 === n.length && (n = ["+"]);
          var c = t(n, r);
          c.push({
            get: function() {
              return {};
            },
            descending: r ? -1 : 1
          });
          var l = Array.prototype.map.call(e, s);
          return l.sort(u), e = l.map(function(e) {
            return e.value;
          });
        };
      }
      function ir(e) {
        return k(e) && (e = {link: e}), e.restrict = e.restrict || "AC", m(e);
      }
      function or(e, t) {
        e.$name = t;
      }
      function ar(e, t, r, i, a) {
        var s = this,
            u = [];
        s.$error = {}, s.$$success = {}, s.$pending = n, s.$name = a(t.name || t.ngForm || "")(r), s.$dirty = !1, s.$pristine = !0, s.$valid = !0, s.$invalid = !1, s.$submitted = !1, s.$$parentForm = Oo, s.$rollbackViewValue = function() {
          o(u, function(e) {
            e.$rollbackViewValue();
          });
        }, s.$commitViewValue = function() {
          o(u, function(e) {
            e.$commitViewValue();
          });
        }, s.$addControl = function(e) {
          pe(e.$name, "input"), u.push(e), e.$name && (s[e.$name] = e), e.$$parentForm = s;
        }, s.$$renameControl = function(e, t) {
          var n = e.$name;
          s[n] === e && delete s[n], s[t] = e, e.$name = t;
        }, s.$removeControl = function(e) {
          e.$name && s[e.$name] === e && delete s[e.$name], o(s.$pending, function(t, n) {
            s.$setValidity(n, null, e);
          }), o(s.$error, function(t, n) {
            s.$setValidity(n, null, e);
          }), o(s.$$success, function(t, n) {
            s.$setValidity(n, null, e);
          }), q(u, e), e.$$parentForm = Oo;
        }, wr({
          ctrl: this,
          $element: e,
          set: function(e, t, n) {
            var r = e[t];
            if (r) {
              var i = r.indexOf(n);
              -1 === i && r.push(n);
            } else
              e[t] = [n];
          },
          unset: function(e, t, n) {
            var r = e[t];
            r && (q(r, n), 0 === r.length && delete e[t]);
          },
          $animate: i
        }), s.$setDirty = function() {
          i.removeClass(e, ha), i.addClass(e, pa), s.$dirty = !0, s.$pristine = !1, s.$$parentForm.$setDirty();
        }, s.$setPristine = function() {
          i.setClass(e, ha, pa + " " + Mo), s.$dirty = !1, s.$pristine = !0, s.$submitted = !1, o(u, function(e) {
            e.$setPristine();
          });
        }, s.$setUntouched = function() {
          o(u, function(e) {
            e.$setUntouched();
          });
        }, s.$setSubmitted = function() {
          i.addClass(e, Mo), s.$submitted = !0, s.$$parentForm.$setSubmitted();
        };
      }
      function sr(e) {
        e.$formatters.push(function(t) {
          return e.$isEmpty(t) ? t : t.toString();
        });
      }
      function ur(e, t, n, r, i, o) {
        cr(e, t, n, r, i, o), sr(r);
      }
      function cr(e, t, n, r, i, o) {
        var a = kr(t[0].type);
        if (!i.android) {
          var s = !1;
          t.on("compositionstart", function(e) {
            s = !0;
          }), t.on("compositionend", function() {
            s = !1, c();
          });
        }
        var u,
            c = function(e) {
              if (u && (o.defer.cancel(u), u = null), !s) {
                var i = t.val(),
                    c = e && e.type;
                "password" === a || n.ngTrim && "false" === n.ngTrim || (i = Wr(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, c);
              }
            };
        if (i.hasEvent("input"))
          t.on("input", c);
        else {
          var l = function(e, t, n) {
            u || (u = o.defer(function() {
              u = null, t && t.value === n || c(e);
            }));
          };
          t.on("keydown", function(e) {
            var t = e.keyCode;
            91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || l(e, this, this.value);
          }), i.hasEvent("paste") && t.on("paste cut", l);
        }
        t.on("change", c), Ho[a] && r.$$hasNativeValidators && a === n.type && t.on(Bo, function(e) {
          if (!u) {
            var t = this[Cr],
                n = t.badInput,
                r = t.typeMismatch;
            u = o.defer(function() {
              u = null, t.badInput === n && t.typeMismatch === r || c(e);
            });
          }
        }), r.$render = function() {
          var e = r.$isEmpty(r.$viewValue) ? "" : r.$viewValue;
          t.val() !== e && t.val(e);
        };
      }
      function lr(e, t) {
        if (C(e))
          return e;
        if (S(e)) {
          qo.lastIndex = 0;
          var n = qo.exec(e);
          if (n) {
            var r = +n[1],
                i = +n[2],
                o = 0,
                a = 0,
                s = 0,
                u = 0,
                c = Yn(r),
                l = 7 * (i - 1);
            return t && (o = t.getHours(), a = t.getMinutes(), s = t.getSeconds(), u = t.getMilliseconds()), new Date(r, 0, c.getDate() + l, o, a, s, u);
          }
        }
        return NaN;
      }
      function fr(e, t) {
        return function(n, r) {
          var i,
              a;
          if (C(n))
            return n;
          if (S(n)) {
            if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), Vo.test(n))
              return new Date(n);
            if (e.lastIndex = 0, i = e.exec(n))
              return i.shift(), a = r ? {
                yyyy: r.getFullYear(),
                MM: r.getMonth() + 1,
                dd: r.getDate(),
                HH: r.getHours(),
                mm: r.getMinutes(),
                ss: r.getSeconds(),
                sss: r.getMilliseconds() / 1e3
              } : {
                yyyy: 1970,
                MM: 1,
                dd: 1,
                HH: 0,
                mm: 0,
                ss: 0,
                sss: 0
              }, o(i, function(e, n) {
                n < t.length && (a[t[n]] = +e);
              }), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0);
          }
          return NaN;
        };
      }
      function hr(e, t, r, i) {
        return function(o, a, s, u, c, l, f) {
          function h(e) {
            return e && !(e.getTime && e.getTime() !== e.getTime());
          }
          function p(e) {
            return b(e) && !C(e) ? r(e) || n : e;
          }
          pr(o, a, s, u), cr(o, a, s, u, c, l);
          var d,
              $ = u && u.$options && u.$options.timezone;
          if (u.$$parserName = e, u.$parsers.push(function(e) {
            if (u.$isEmpty(e))
              return null;
            if (t.test(e)) {
              var i = r(e, d);
              return $ && (i = Z(i, $)), i;
            }
            return n;
          }), u.$formatters.push(function(e) {
            if (e && !C(e))
              throw ma("datefmt", "Expected `{0}` to be a date", e);
            return h(e) ? (d = e, d && $ && (d = Z(d, $, !0)), f("date")(e, i, $)) : (d = null, "");
          }), b(s.min) || s.ngMin) {
            var v;
            u.$validators.min = function(e) {
              return !h(e) || y(v) || r(e) >= v;
            }, s.$observe("min", function(e) {
              v = p(e), u.$validate();
            });
          }
          if (b(s.max) || s.ngMax) {
            var m;
            u.$validators.max = function(e) {
              return !h(e) || y(m) || r(e) <= m;
            }, s.$observe("max", function(e) {
              m = p(e), u.$validate();
            });
          }
        };
      }
      function pr(e, t, r, i) {
        var o = t[0],
            a = i.$$hasNativeValidators = w(o.validity);
        a && i.$parsers.push(function(e) {
          var r = t.prop(Cr) || {};
          return r.badInput && !r.typeMismatch ? n : e;
        });
      }
      function dr(e, t, r, i, o, a) {
        if (pr(e, t, r, i), cr(e, t, r, i, o, a), i.$$parserName = "number", i.$parsers.push(function(e) {
          return i.$isEmpty(e) ? null : _o.test(e) ? parseFloat(e) : n;
        }), i.$formatters.push(function(e) {
          if (!i.$isEmpty(e)) {
            if (!E(e))
              throw ma("numfmt", "Expected `{0}` to be a number", e);
            e = e.toString();
          }
          return e;
        }), b(r.min) || r.ngMin) {
          var s;
          i.$validators.min = function(e) {
            return i.$isEmpty(e) || y(s) || e >= s;
          }, r.$observe("min", function(e) {
            b(e) && !E(e) && (e = parseFloat(e, 10)), s = E(e) && !isNaN(e) ? e : n, i.$validate();
          });
        }
        if (b(r.max) || r.ngMax) {
          var u;
          i.$validators.max = function(e) {
            return i.$isEmpty(e) || y(u) || u >= e;
          }, r.$observe("max", function(e) {
            b(e) && !E(e) && (e = parseFloat(e, 10)), u = E(e) && !isNaN(e) ? e : n, i.$validate();
          });
        }
      }
      function $r(e, t, n, r, i, o) {
        cr(e, t, n, r, i, o), sr(r), r.$$parserName = "url", r.$validators.url = function(e, t) {
          var n = e || t;
          return r.$isEmpty(n) || Do.test(n);
        };
      }
      function vr(e, t, n, r, i, o) {
        cr(e, t, n, r, i, o), sr(r), r.$$parserName = "email", r.$validators.email = function(e, t) {
          var n = e || t;
          return r.$isEmpty(n) || Po.test(n);
        };
      }
      function mr(e, t, n, r) {
        y(n.name) && t.attr("name", u());
        var i = function(e) {
          t[0].checked && r.$setViewValue(n.value, e && e.type);
        };
        t.on("click", i), r.$render = function() {
          var e = n.value;
          t[0].checked = e == r.$viewValue;
        }, n.$observe("value", r.$render);
      }
      function gr(e, t, n, r, i) {
        var o;
        if (b(r)) {
          if (o = e(r), !o.constant)
            throw ma("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, r);
          return o(t);
        }
        return i;
      }
      function yr(e, t, n, r, i, o, a, s) {
        var u = gr(s, e, "ngTrueValue", n.ngTrueValue, !0),
            c = gr(s, e, "ngFalseValue", n.ngFalseValue, !1),
            l = function(e) {
              r.$setViewValue(t[0].checked, e && e.type);
            };
        t.on("click", l), r.$render = function() {
          t[0].checked = r.$viewValue;
        }, r.$isEmpty = function(e) {
          return e === !1;
        }, r.$formatters.push(function(e) {
          return B(e, u);
        }), r.$parsers.push(function(e) {
          return e ? u : c;
        });
      }
      function br(e, t) {
        return e = "ngClass" + e, ["$animate", function(n) {
          function r(e, t) {
            var n = [];
            e: for (var r = 0; r < e.length; r++) {
              for (var i = e[r],
                  o = 0; o < t.length; o++)
                if (i == t[o])
                  continue e;
              n.push(i);
            }
            return n;
          }
          function i(e) {
            var t = [];
            return Lr(e) ? (o(e, function(e) {
              t = t.concat(i(e));
            }), t) : S(e) ? e.split(" ") : w(e) ? (o(e, function(e, n) {
              e && (t = t.concat(n.split(" ")));
            }), t) : e;
          }
          return {
            restrict: "AC",
            link: function(a, s, u) {
              function c(e) {
                var t = f(e, 1);
                u.$addClass(t);
              }
              function l(e) {
                var t = f(e, -1);
                u.$removeClass(t);
              }
              function f(e, t) {
                var n = s.data("$classCounts") || ve(),
                    r = [];
                return o(e, function(e) {
                  (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] === +(t > 0) && r.push(e));
                }), s.data("$classCounts", n), r.join(" ");
              }
              function h(e, t) {
                var i = r(t, e),
                    o = r(e, t);
                i = f(i, 1), o = f(o, -1), i && i.length && n.addClass(s, i), o && o.length && n.removeClass(s, o);
              }
              function p(e) {
                if (t === !0 || a.$index % 2 === t) {
                  var n = i(e || []);
                  if (d) {
                    if (!B(e, d)) {
                      var r = i(d);
                      h(r, n);
                    }
                  } else
                    c(n);
                }
                d = Lr(e) ? e.map(function(e) {
                  return F(e);
                }) : F(e);
              }
              var d;
              a.$watch(u[e], p, !0), u.$observe("class", function(t) {
                p(a.$eval(u[e]));
              }), "ngClass" !== e && a.$watch("$index", function(n, r) {
                var o = 1 & n;
                if (o !== (1 & r)) {
                  var s = i(a.$eval(u[e]));
                  o === t ? c(s) : l(s);
                }
              });
            }
          };
        }];
      }
      function wr(e) {
        function t(e, t, u) {
          y(t) ? r("$pending", e, u) : i("$pending", e, u), V(t) ? t ? (f(s.$error, e, u), l(s.$$success, e, u)) : (l(s.$error, e, u), f(s.$$success, e, u)) : (f(s.$error, e, u), f(s.$$success, e, u)), s.$pending ? (o(va, !0), s.$valid = s.$invalid = n, a("", null)) : (o(va, !1), s.$valid = xr(s.$error), s.$invalid = !s.$valid, a("", s.$valid));
          var c;
          c = s.$pending && s.$pending[e] ? n : s.$error[e] ? !1 : s.$$success[e] ? !0 : null, a(e, c), s.$$parentForm.$setValidity(e, c, s);
        }
        function r(e, t, n) {
          s[e] || (s[e] = {}), l(s[e], t, n);
        }
        function i(e, t, r) {
          s[e] && f(s[e], t, r), xr(s[e]) && (s[e] = n);
        }
        function o(e, t) {
          t && !c[e] ? (h.addClass(u, e), c[e] = !0) : !t && c[e] && (h.removeClass(u, e), c[e] = !1);
        }
        function a(e, t) {
          e = e ? "-" + ce(e, "-") : "", o(la + e, t === !0), o(fa + e, t === !1);
        }
        var s = e.ctrl,
            u = e.$element,
            c = {},
            l = e.set,
            f = e.unset,
            h = e.$animate;
        c[fa] = !(c[la] = u.hasClass(la)), s.$setValidity = t;
      }
      function xr(e) {
        if (e)
          for (var t in e)
            if (e.hasOwnProperty(t))
              return !1;
        return !0;
      }
      function Sr(e) {
        e[0].hasAttribute("selected") && (e[0].selected = !0);
      }
      var Er = /^\/(.+)\/([a-z]*)$/,
          Cr = "validity",
          kr = function(e) {
            return S(e) ? e.toLowerCase() : e;
          },
          Ar = Object.prototype.hasOwnProperty,
          Or = function(e) {
            return S(e) ? e.toUpperCase() : e;
          },
          Mr = function(e) {
            return S(e) ? e.replace(/[A-Z]/g, function(e) {
              return String.fromCharCode(32 | e.charCodeAt(0));
            }) : e;
          },
          Tr = function(e) {
            return S(e) ? e.replace(/[a-z]/g, function(e) {
              return String.fromCharCode(-33 & e.charCodeAt(0));
            }) : e;
          };
      "i" !== "I".toLowerCase() && (kr = Mr, Or = Tr);
      var Nr,
          jr,
          Vr,
          Dr,
          Pr = [].slice,
          _r = [].splice,
          Ir = [].push,
          Rr = Object.prototype.toString,
          qr = Object.getPrototypeOf,
          Ur = r("ng"),
          Fr = e.angular || (e.angular = {}),
          Br = 0;
      Nr = t.documentMode, $.$inject = [], v.$inject = [];
      var Hr,
          Lr = Array.isArray,
          zr = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
          Wr = function(e) {
            return S(e) ? e.trim() : e;
          },
          Gr = function(e) {
            return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
          },
          Yr = function() {
            function e() {
              try {
                return new Function(""), !1;
              } catch (e) {
                return !0;
              }
            }
            if (!b(Yr.rules)) {
              var n = t.querySelector("[ng-csp]") || t.querySelector("[data-ng-csp]");
              if (n) {
                var r = n.getAttribute("ng-csp") || n.getAttribute("data-ng-csp");
                Yr.rules = {
                  noUnsafeEval: !r || -1 !== r.indexOf("no-unsafe-eval"),
                  noInlineStyle: !r || -1 !== r.indexOf("no-inline-style")
                };
              } else
                Yr.rules = {
                  noUnsafeEval: e(),
                  noInlineStyle: !1
                };
            }
            return Yr.rules;
          },
          Jr = function() {
            if (b(Jr.name_))
              return Jr.name_;
            var e,
                n,
                r,
                i,
                o = Zr.length;
            for (n = 0; o > n; ++n)
              if (r = Zr[n], e = t.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
                i = e.getAttribute(r + "jq");
                break;
              }
            return Jr.name_ = i;
          },
          Xr = /:/g,
          Zr = ["ng-", "data-ng-", "ng:", "x-ng-"],
          Kr = /[A-Z]/g,
          Qr = !1,
          ei = 1,
          ti = 2,
          ni = 3,
          ri = 8,
          ii = 9,
          oi = 11,
          ai = {
            full: "1.4.11",
            major: 1,
            minor: 4,
            dot: 11,
            codeName: "relentless-syncomania"
          };
      Me.expando = "ng339";
      var si = Me.cache = {},
          ui = 1,
          ci = function(e, t, n) {
            e.addEventListener(t, n, !1);
          },
          li = function(e, t, n) {
            e.removeEventListener(t, n, !1);
          };
      Me._data = function(e) {
        return this.cache[e[this.expando]] || {};
      };
      var fi = /([\:\-\_]+(.))/g,
          hi = /^moz([A-Z])/,
          pi = {
            mouseleave: "mouseout",
            mouseenter: "mouseover"
          },
          di = r("jqLite"),
          $i = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
          vi = /<|&#?\w+;/,
          mi = /<([\w:-]+)/,
          gi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
          yi = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
          };
      yi.optgroup = yi.option, yi.tbody = yi.tfoot = yi.colgroup = yi.caption = yi.thead, yi.th = yi.td;
      var bi = Node.prototype.contains || function(e) {
        return !!(16 & this.compareDocumentPosition(e));
      },
          wi = Me.prototype = {
            ready: function(n) {
              function r() {
                i || (i = !0, n());
              }
              var i = !1;
              "complete" === t.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), Me(e).on("load", r));
            },
            toString: function() {
              var e = [];
              return o(this, function(t) {
                e.push("" + t);
              }), "[" + e.join(", ") + "]";
            },
            eq: function(e) {
              return jr(e >= 0 ? this[e] : this[this.length + e]);
            },
            length: 0,
            push: Ir,
            sort: [].sort,
            splice: [].splice
          },
          xi = {};
      o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(e) {
        xi[kr(e)] = e;
      });
      var Si = {};
      o("input,select,option,textarea,button,form,details".split(","), function(e) {
        Si[e] = !0;
      });
      var Ei = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
      };
      o({
        data: Pe,
        removeData: Ve,
        hasData: Ce
      }, function(e, t) {
        Me[t] = e;
      }), o({
        data: Pe,
        inheritedData: Fe,
        scope: function(e) {
          return jr.data(e, "$scope") || Fe(e.parentNode || e, ["$isolateScope", "$scope"]);
        },
        isolateScope: function(e) {
          return jr.data(e, "$isolateScope") || jr.data(e, "$isolateScopeNoTemplate");
        },
        controller: Ue,
        injector: function(e) {
          return Fe(e, "$injector");
        },
        removeAttr: function(e, t) {
          e.removeAttribute(t);
        },
        hasClass: _e,
        css: function(e, t, n) {
          return t = xe(t), b(n) ? void(e.style[t] = n) : e.style[t];
        },
        attr: function(e, t, r) {
          var i = e.nodeType;
          if (i !== ni && i !== ti && i !== ri) {
            var o = kr(t);
            if (xi[o]) {
              if (!b(r))
                return e[t] || (e.attributes.getNamedItem(t) || $).specified ? o : n;
              r ? (e[t] = !0, e.setAttribute(t, o)) : (e[t] = !1, e.removeAttribute(o));
            } else if (b(r))
              e.setAttribute(t, r);
            else if (e.getAttribute) {
              var a = e.getAttribute(t, 2);
              return null === a ? n : a;
            }
          }
        },
        prop: function(e, t, n) {
          return b(n) ? void(e[t] = n) : e[t];
        },
        text: function() {
          function e(e, t) {
            if (y(t)) {
              var n = e.nodeType;
              return n === ei || n === ni ? e.textContent : "";
            }
            e.textContent = t;
          }
          return e.$dv = "", e;
        }(),
        val: function(e, t) {
          if (y(t)) {
            if (e.multiple && "select" === R(e)) {
              var n = [];
              return o(e.options, function(e) {
                e.selected && n.push(e.value || e.text);
              }), 0 === n.length ? null : n;
            }
            return e.value;
          }
          e.value = t;
        },
        html: function(e, t) {
          return y(t) ? e.innerHTML : (Ne(e, !0), void(e.innerHTML = t));
        },
        empty: Be
      }, function(e, t) {
        Me.prototype[t] = function(t, n) {
          var r,
              i,
              o = this.length;
          if (e !== Be && y(2 == e.length && e !== _e && e !== Ue ? t : n)) {
            if (w(t)) {
              for (r = 0; o > r; r++)
                if (e === Pe)
                  e(this[r], t);
                else
                  for (i in t)
                    e(this[r], i, t[i]);
              return this;
            }
            for (var a = e.$dv,
                s = y(a) ? Math.min(o, 1) : o,
                u = 0; s > u; u++) {
              var c = e(this[u], t, n);
              a = a ? a + c : c;
            }
            return a;
          }
          for (r = 0; o > r; r++)
            e(this[r], t, n);
          return this;
        };
      }), o({
        removeData: Ve,
        on: function(e, t, r, i) {
          if (b(i))
            throw di("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
          if (Ee(e)) {
            var o = De(e, !0),
                a = o.events,
                s = o.handle;
            s || (s = o.handle = Ge(e, a));
            for (var u = t.indexOf(" ") >= 0 ? t.split(" ") : [t],
                c = u.length,
                l = function(t, n, i) {
                  var o = a[t];
                  o || (o = a[t] = [], o.specialHandlerWrapper = n, "$destroy" === t || i || ci(e, t, s)), o.push(r);
                }; c--; )
              t = u[c], pi[t] ? (l(pi[t], Je), l(t, n, !0)) : l(t);
          }
        },
        off: je,
        one: function(e, t, n) {
          e = jr(e), e.on(t, function r() {
            e.off(t, n), e.off(t, r);
          }), e.on(t, n);
        },
        replaceWith: function(e, t) {
          var n,
              r = e.parentNode;
          Ne(e), o(new Me(t), function(t) {
            n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e), n = t;
          });
        },
        children: function(e) {
          var t = [];
          return o(e.childNodes, function(e) {
            e.nodeType === ei && t.push(e);
          }), t;
        },
        contents: function(e) {
          return e.contentDocument || e.childNodes || [];
        },
        append: function(e, t) {
          var n = e.nodeType;
          if (n === ei || n === oi) {
            t = new Me(t);
            for (var r = 0,
                i = t.length; i > r; r++) {
              var o = t[r];
              e.appendChild(o);
            }
          }
        },
        prepend: function(e, t) {
          if (e.nodeType === ei) {
            var n = e.firstChild;
            o(new Me(t), function(t) {
              e.insertBefore(t, n);
            });
          }
        },
        wrap: function(e, t) {
          Oe(e, jr(t).eq(0).clone()[0]);
        },
        remove: He,
        detach: function(e) {
          He(e, !0);
        },
        after: function(e, t) {
          var n = e,
              r = e.parentNode;
          t = new Me(t);
          for (var i = 0,
              o = t.length; o > i; i++) {
            var a = t[i];
            r.insertBefore(a, n.nextSibling), n = a;
          }
        },
        addClass: Re,
        removeClass: Ie,
        toggleClass: function(e, t, n) {
          t && o(t.split(" "), function(t) {
            var r = n;
            y(r) && (r = !_e(e, t)), (r ? Re : Ie)(e, t);
          });
        },
        parent: function(e) {
          var t = e.parentNode;
          return t && t.nodeType !== oi ? t : null;
        },
        next: function(e) {
          return e.nextElementSibling;
        },
        find: function(e, t) {
          return e.getElementsByTagName ? e.getElementsByTagName(t) : [];
        },
        clone: Te,
        triggerHandler: function(e, t, n) {
          var r,
              i,
              a,
              s = t.type || t,
              u = De(e),
              c = u && u.events,
              l = c && c[s];
          l && (r = {
            preventDefault: function() {
              this.defaultPrevented = !0;
            },
            isDefaultPrevented: function() {
              return this.defaultPrevented === !0;
            },
            stopImmediatePropagation: function() {
              this.immediatePropagationStopped = !0;
            },
            isImmediatePropagationStopped: function() {
              return this.immediatePropagationStopped === !0;
            },
            stopPropagation: $,
            type: s,
            target: e
          }, t.type && (r = f(r, t)), i = F(l), a = n ? [r].concat(n) : [r], o(i, function(t) {
            r.isImmediatePropagationStopped() || t.apply(e, a);
          }));
        }
      }, function(e, t) {
        Me.prototype[t] = function(t, n, r) {
          for (var i,
              o = 0,
              a = this.length; a > o; o++)
            y(i) ? (i = e(this[o], t, n, r), b(i) && (i = jr(i))) : qe(i, e(this[o], t, n, r));
          return b(i) ? i : this;
        }, Me.prototype.bind = Me.prototype.on, Me.prototype.unbind = Me.prototype.off;
      }), Ke.prototype = {
        put: function(e, t) {
          this[Ze(e, this.nextUid)] = t;
        },
        get: function(e) {
          return this[Ze(e, this.nextUid)];
        },
        remove: function(e) {
          var t = this[e = Ze(e, this.nextUid)];
          return delete this[e], t;
        }
      };
      var Ci = [function() {
        this.$get = [function() {
          return Ke;
        }];
      }],
          ki = /^[^\(]*\(\s*([^\)]*)\)/m,
          Ai = /,/,
          Oi = /^\s*(_?)(\S+?)\1\s*$/,
          Mi = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
          Ti = r("$injector");
      tt.$$annotate = et;
      var Ni = r("$animate"),
          ji = 1,
          Vi = "ng-animate",
          Di = function() {
            this.$get = function() {};
          },
          Pi = function() {
            var e = new Ke,
                t = [];
            this.$get = ["$$AnimateRunner", "$rootScope", function(n, r) {
              function i(e, t, n) {
                var r = !1;
                return t && (t = S(t) ? t.split(" ") : Lr(t) ? t : [], o(t, function(t) {
                  t && (r = !0, e[t] = n);
                })), r;
              }
              function a() {
                o(t, function(t) {
                  var n = e.get(t);
                  if (n) {
                    var r = ot(t.attr("class")),
                        i = "",
                        a = "";
                    o(n, function(e, t) {
                      var n = !!r[t];
                      e !== n && (e ? i += (i.length ? " " : "") + t : a += (a.length ? " " : "") + t);
                    }), o(t, function(e) {
                      i && Re(e, i), a && Ie(e, a);
                    }), e.remove(t);
                  }
                }), t.length = 0;
              }
              function s(n, o, s) {
                var u = e.get(n) || {},
                    c = i(u, o, !0),
                    l = i(u, s, !1);
                (c || l) && (e.put(n, u), t.push(n), 1 === t.length && r.$$postDigest(a));
              }
              return {
                enabled: $,
                on: $,
                off: $,
                pin: $,
                push: function(e, t, r, i) {
                  i && i(), r = r || {}, r.from && e.css(r.from), r.to && e.css(r.to), (r.addClass || r.removeClass) && s(e, r.addClass, r.removeClass);
                  var o = new n;
                  return o.complete(), o;
                }
              };
            }];
          },
          _i = ["$provide", function(e) {
            var t = this;
            this.$$registeredAnimations = Object.create(null), this.register = function(n, r) {
              if (n && "." !== n.charAt(0))
                throw Ni("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
              var i = n + "-animation";
              t.$$registeredAnimations[n.substr(1)] = i, e.factory(i, r);
            }, this.classNameFilter = function(e) {
              if (1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null, this.$$classNameFilter)) {
                var t = new RegExp("(\\s+|\\/)" + Vi + "(\\s+|\\/)");
                if (t.test(this.$$classNameFilter.toString()))
                  throw Ni("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', Vi);
              }
              return this.$$classNameFilter;
            }, this.$get = ["$$animateQueue", function(e) {
              function t(e, t, n) {
                if (n) {
                  var r = it(n);
                  !r || r.parentNode || r.previousElementSibling || (n = null);
                }
                n ? n.after(e) : t.prepend(e);
              }
              return {
                on: e.on,
                off: e.off,
                pin: e.pin,
                enabled: e.enabled,
                cancel: function(e) {
                  e.end && e.end();
                },
                enter: function(n, r, i, o) {
                  return r = r && jr(r), i = i && jr(i), r = r || i.parent(), t(n, r, i), e.push(n, "enter", at(o));
                },
                move: function(n, r, i, o) {
                  return r = r && jr(r), i = i && jr(i), r = r || i.parent(), t(n, r, i), e.push(n, "move", at(o));
                },
                leave: function(t, n) {
                  return e.push(t, "leave", at(n), function() {
                    t.remove();
                  });
                },
                addClass: function(t, n, r) {
                  return r = at(r), r.addClass = rt(r.addclass, n), e.push(t, "addClass", r);
                },
                removeClass: function(t, n, r) {
                  return r = at(r), r.removeClass = rt(r.removeClass, n), e.push(t, "removeClass", r);
                },
                setClass: function(t, n, r, i) {
                  return i = at(i), i.addClass = rt(i.addClass, n), i.removeClass = rt(i.removeClass, r), e.push(t, "setClass", i);
                },
                animate: function(t, n, r, i, o) {
                  return o = at(o), o.from = o.from ? f(o.from, n) : n, o.to = o.to ? f(o.to, r) : r, i = i || "ng-inline-animate", o.tempClasses = rt(o.tempClasses, i), e.push(t, "animate", o);
                }
              };
            }];
          }],
          Ii = function() {
            this.$get = ["$$rAF", function(e) {
              function t(t) {
                n.push(t), n.length > 1 || e(function() {
                  for (var e = 0; e < n.length; e++)
                    n[e]();
                  n = [];
                });
              }
              var n = [];
              return function() {
                var e = !1;
                return t(function() {
                  e = !0;
                }), function(n) {
                  e ? n() : t(n);
                };
              };
            }];
          },
          Ri = function() {
            this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function(e, t, n, r, i) {
              function a(e) {
                this.setHost(e);
                var t = n(),
                    o = function(e) {
                      i(e, 0, !1);
                    };
                this._doneCallbacks = [], this._tick = function(e) {
                  var n = r[0];
                  n && n.hidden ? o(e) : t(e);
                }, this._state = 0;
              }
              var s = 0,
                  u = 1,
                  c = 2;
              return a.chain = function(e, t) {
                function n() {
                  return r === e.length ? void t(!0) : void e[r](function(e) {
                    return e === !1 ? void t(!1) : (r++, void n());
                  });
                }
                var r = 0;
                n();
              }, a.all = function(e, t) {
                function n(n) {
                  i = i && n, ++r === e.length && t(i);
                }
                var r = 0,
                    i = !0;
                o(e, function(e) {
                  e.done(n);
                });
              }, a.prototype = {
                setHost: function(e) {
                  this.host = e || {};
                },
                done: function(e) {
                  this._state === c ? e() : this._doneCallbacks.push(e);
                },
                progress: $,
                getPromise: function() {
                  if (!this.promise) {
                    var t = this;
                    this.promise = e(function(e, n) {
                      t.done(function(t) {
                        t === !1 ? n() : e();
                      });
                    });
                  }
                  return this.promise;
                },
                then: function(e, t) {
                  return this.getPromise().then(e, t);
                },
                "catch": function(e) {
                  return this.getPromise()["catch"](e);
                },
                "finally": function(e) {
                  return this.getPromise()["finally"](e);
                },
                pause: function() {
                  this.host.pause && this.host.pause();
                },
                resume: function() {
                  this.host.resume && this.host.resume();
                },
                end: function() {
                  this.host.end && this.host.end(), this._resolve(!0);
                },
                cancel: function() {
                  this.host.cancel && this.host.cancel(), this._resolve(!1);
                },
                complete: function(e) {
                  var t = this;
                  t._state === s && (t._state = u, t._tick(function() {
                    t._resolve(e);
                  }));
                },
                _resolve: function(e) {
                  this._state !== c && (o(this._doneCallbacks, function(t) {
                    t(e);
                  }), this._doneCallbacks.length = 0, this._state = c);
                }
              }, a;
            }];
          },
          qi = function() {
            this.$get = ["$$rAF", "$q", "$$AnimateRunner", function(e, t, n) {
              return function(t, r) {
                function i() {
                  return e(function() {
                    o(), s || u.complete(), s = !0;
                  }), u;
                }
                function o() {
                  a.addClass && (t.addClass(a.addClass), a.addClass = null), a.removeClass && (t.removeClass(a.removeClass), a.removeClass = null), a.to && (t.css(a.to), a.to = null);
                }
                var a = r || {};
                a.$$prepared || (a = U(a)), a.cleanupStyles && (a.from = a.to = null), a.from && (t.css(a.from), a.from = null);
                var s,
                    u = new n;
                return {
                  start: i,
                  end: i
                };
              };
            }];
          },
          Ui = r("$compile");
      ft.$inject = ["$provide", "$$sanitizeUriProvider"];
      var Fi = /^((?:x|data)[\:\-_])/i,
          Bi = r("$controller"),
          Hi = /^(\S+)(\s+as\s+([\w$]+))?$/,
          Li = function() {
            this.$get = ["$document", function(e) {
              return function(t) {
                return t ? !t.nodeType && t instanceof jr && (t = t[0]) : t = e[0].body, t.offsetWidth + 1;
              };
            }];
          },
          zi = "application/json",
          Wi = {"Content-Type": zi + ";charset=utf-8"},
          Gi = /^\[|^\{(?!\{)/,
          Yi = {
            "[": /]$/,
            "{": /}$/
          },
          Ji = /^\)\]\}',?\n/,
          Xi = r("$http"),
          Zi = function(e) {
            return function() {
              throw Xi("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", e);
            };
          },
          Ki = Fr.$interpolateMinErr = r("$interpolate");
      Ki.throwNoconcat = function(e) {
        throw Ki("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", e);
      }, Ki.interr = function(e, t) {
        return Ki("interr", "Can't interpolate: {0}\n{1}", e, t.toString());
      };
      var Qi = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
          eo = {
            http: 80,
            https: 443,
            ftp: 21
          },
          to = r("$location"),
          no = {
            $$html5: !1,
            $$replace: !1,
            absUrl: zt("$$absUrl"),
            url: function(e) {
              if (y(e))
                return this.$$url;
              var t = Qi.exec(e);
              return (t[1] || "" === e) && this.path(decodeURIComponent(t[1])), (t[2] || t[1] || "" === e) && this.search(t[3] || ""), this.hash(t[5] || ""), this;
            },
            protocol: zt("$$protocol"),
            host: zt("$$host"),
            port: zt("$$port"),
            path: Wt("$$path", function(e) {
              return e = null !== e ? e.toString() : "", "/" == e.charAt(0) ? e : "/" + e;
            }),
            search: function(e, t) {
              switch (arguments.length) {
                case 0:
                  return this.$$search;
                case 1:
                  if (S(e) || E(e))
                    e = e.toString(), this.$$search = ee(e);
                  else {
                    if (!w(e))
                      throw to("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                    e = U(e, {}), o(e, function(t, n) {
                      null == t && delete e[n];
                    }), this.$$search = e;
                  }
                  break;
                default:
                  y(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t;
              }
              return this.$$compose(), this;
            },
            hash: Wt("$$hash", function(e) {
              return null !== e ? e.toString() : "";
            }),
            replace: function() {
              return this.$$replace = !0, this;
            }
          };
      o([Lt, Ht, Bt], function(e) {
        e.prototype = Object.create(no), e.prototype.state = function(t) {
          if (!arguments.length)
            return this.$$state;
          if (e !== Bt || !this.$$html5)
            throw to("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
          return this.$$state = y(t) ? null : t, this;
        };
      });
      var ro = r("$parse"),
          io = Function.prototype.call,
          oo = Function.prototype.apply,
          ao = Function.prototype.bind,
          so = ve();
      o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(e) {
        so[e] = !0;
      });
      var uo = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "\x0B",
        "'": "'",
        '"': '"'
      },
          co = function(e) {
            this.options = e;
          };
      co.prototype = {
        constructor: co,
        lex: function(e) {
          for (this.text = e, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
            var t = this.text.charAt(this.index);
            if ('"' === t || "'" === t)
              this.readString(t);
            else if (this.isNumber(t) || "." === t && this.isNumber(this.peek()))
              this.readNumber();
            else if (this.isIdent(t))
              this.readIdent();
            else if (this.is(t, "(){}[].,;:?"))
              this.tokens.push({
                index: this.index,
                text: t
              }), this.index++;
            else if (this.isWhitespace(t))
              this.index++;
            else {
              var n = t + this.peek(),
                  r = n + this.peek(2),
                  i = so[t],
                  o = so[n],
                  a = so[r];
              if (i || o || a) {
                var s = a ? r : o ? n : t;
                this.tokens.push({
                  index: this.index,
                  text: s,
                  operator: !0
                }), this.index += s.length;
              } else
                this.throwError("Unexpected next character ", this.index, this.index + 1);
            }
          }
          return this.tokens;
        },
        is: function(e, t) {
          return -1 !== t.indexOf(e);
        },
        peek: function(e) {
          var t = e || 1;
          return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1;
        },
        isNumber: function(e) {
          return e >= "0" && "9" >= e && "string" == typeof e;
        },
        isWhitespace: function(e) {
          return " " === e || "\r" === e || "	" === e || "\n" === e || "\x0B" === e || " " === e;
        },
        isIdent: function(e) {
          return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e;
        },
        isExpOperator: function(e) {
          return "-" === e || "+" === e || this.isNumber(e);
        },
        throwError: function(e, t, n) {
          n = n || this.index;
          var r = b(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
          throw ro("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text);
        },
        readNumber: function() {
          for (var e = "",
              t = this.index; this.index < this.text.length; ) {
            var n = kr(this.text.charAt(this.index));
            if ("." == n || this.isNumber(n))
              e += n;
            else {
              var r = this.peek();
              if ("e" == n && this.isExpOperator(r))
                e += n;
              else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1))
                e += n;
              else {
                if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1))
                  break;
                this.throwError("Invalid exponent");
              }
            }
            this.index++;
          }
          this.tokens.push({
            index: t,
            text: e,
            constant: !0,
            value: Number(e)
          });
        },
        readIdent: function() {
          for (var e = this.index; this.index < this.text.length; ) {
            var t = this.text.charAt(this.index);
            if (!this.isIdent(t) && !this.isNumber(t))
              break;
            this.index++;
          }
          this.tokens.push({
            index: e,
            text: this.text.slice(e, this.index),
            identifier: !0
          });
        },
        readString: function(e) {
          var t = this.index;
          this.index++;
          for (var n = "",
              r = e,
              i = !1; this.index < this.text.length; ) {
            var o = this.text.charAt(this.index);
            if (r += o, i) {
              if ("u" === o) {
                var a = this.text.substring(this.index + 1, this.index + 5);
                a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), this.index += 4, n += String.fromCharCode(parseInt(a, 16));
              } else {
                var s = uo[o];
                n += s || o;
              }
              i = !1;
            } else if ("\\" === o)
              i = !0;
            else {
              if (o === e)
                return this.index++, void this.tokens.push({
                  index: t,
                  text: r,
                  constant: !0,
                  value: n
                });
              n += o;
            }
            this.index++;
          }
          this.throwError("Unterminated quote", t);
        }
      };
      var lo = function(e, t) {
        this.lexer = e, this.options = t;
      };
      lo.Program = "Program", lo.ExpressionStatement = "ExpressionStatement", lo.AssignmentExpression = "AssignmentExpression", lo.ConditionalExpression = "ConditionalExpression", lo.LogicalExpression = "LogicalExpression", lo.BinaryExpression = "BinaryExpression", lo.UnaryExpression = "UnaryExpression", lo.CallExpression = "CallExpression", lo.MemberExpression = "MemberExpression", lo.Identifier = "Identifier", lo.Literal = "Literal", lo.ArrayExpression = "ArrayExpression", lo.Property = "Property", lo.ObjectExpression = "ObjectExpression", lo.ThisExpression = "ThisExpression", lo.NGValueParameter = "NGValueParameter", lo.prototype = {
        ast: function(e) {
          this.text = e, this.tokens = this.lexer.lex(e);
          var t = this.program();
          return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), t;
        },
        program: function() {
          for (var e = []; ; )
            if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.expressionStatement()), !this.expect(";"))
              return {
                type: lo.Program,
                body: e
              };
        },
        expressionStatement: function() {
          return {
            type: lo.ExpressionStatement,
            expression: this.filterChain()
          };
        },
        filterChain: function() {
          for (var e,
              t = this.expression(); e = this.expect("|"); )
            t = this.filter(t);
          return t;
        },
        expression: function() {
          return this.assignment();
        },
        assignment: function() {
          var e = this.ternary();
          return this.expect("=") && (e = {
            type: lo.AssignmentExpression,
            left: e,
            right: this.assignment(),
            operator: "="
          }), e;
        },
        ternary: function() {
          var e,
              t,
              n = this.logicalOR();
          return this.expect("?") && (e = this.expression(), this.consume(":")) ? (t = this.expression(), {
            type: lo.ConditionalExpression,
            test: n,
            alternate: e,
            consequent: t
          }) : n;
        },
        logicalOR: function() {
          for (var e = this.logicalAND(); this.expect("||"); )
            e = {
              type: lo.LogicalExpression,
              operator: "||",
              left: e,
              right: this.logicalAND()
            };
          return e;
        },
        logicalAND: function() {
          for (var e = this.equality(); this.expect("&&"); )
            e = {
              type: lo.LogicalExpression,
              operator: "&&",
              left: e,
              right: this.equality()
            };
          return e;
        },
        equality: function() {
          for (var e,
              t = this.relational(); e = this.expect("==", "!=", "===", "!=="); )
            t = {
              type: lo.BinaryExpression,
              operator: e.text,
              left: t,
              right: this.relational()
            };
          return t;
        },
        relational: function() {
          for (var e,
              t = this.additive(); e = this.expect("<", ">", "<=", ">="); )
            t = {
              type: lo.BinaryExpression,
              operator: e.text,
              left: t,
              right: this.additive()
            };
          return t;
        },
        additive: function() {
          for (var e,
              t = this.multiplicative(); e = this.expect("+", "-"); )
            t = {
              type: lo.BinaryExpression,
              operator: e.text,
              left: t,
              right: this.multiplicative()
            };
          return t;
        },
        multiplicative: function() {
          for (var e,
              t = this.unary(); e = this.expect("*", "/", "%"); )
            t = {
              type: lo.BinaryExpression,
              operator: e.text,
              left: t,
              right: this.unary()
            };
          return t;
        },
        unary: function() {
          var e;
          return (e = this.expect("+", "-", "!")) ? {
            type: lo.UnaryExpression,
            operator: e.text,
            prefix: !0,
            argument: this.unary()
          } : this.primary();
        },
        primary: function() {
          var e;
          this.expect("(") ? (e = this.filterChain(), this.consume(")")) : this.expect("[") ? e = this.arrayDeclaration() : this.expect("{") ? e = this.object() : this.constants.hasOwnProperty(this.peek().text) ? e = U(this.constants[this.consume().text]) : this.peek().identifier ? e = this.identifier() : this.peek().constant ? e = this.constant() : this.throwError("not a primary expression", this.peek());
          for (var t; t = this.expect("(", "[", "."); )
            "(" === t.text ? (e = {
              type: lo.CallExpression,
              callee: e,
              arguments: this.parseArguments()
            }, this.consume(")")) : "[" === t.text ? (e = {
              type: lo.MemberExpression,
              object: e,
              property: this.expression(),
              computed: !0
            }, this.consume("]")) : "." === t.text ? e = {
              type: lo.MemberExpression,
              object: e,
              property: this.identifier(),
              computed: !1
            } : this.throwError("IMPOSSIBLE");
          return e;
        },
        filter: function(e) {
          for (var t = [e],
              n = {
                type: lo.CallExpression,
                callee: this.identifier(),
                arguments: t,
                filter: !0
              }; this.expect(":"); )
            t.push(this.expression());
          return n;
        },
        parseArguments: function() {
          var e = [];
          if (")" !== this.peekToken().text)
            do
              e.push(this.expression());
 while (this.expect(","));
          return e;
        },
        identifier: function() {
          var e = this.consume();
          return e.identifier || this.throwError("is not a valid identifier", e), {
            type: lo.Identifier,
            name: e.text
          };
        },
        constant: function() {
          return {
            type: lo.Literal,
            value: this.consume().value
          };
        },
        arrayDeclaration: function() {
          var e = [];
          if ("]" !== this.peekToken().text)
            do {
              if (this.peek("]"))
                break;
              e.push(this.expression());
            } while (this.expect(","));
          return this.consume("]"), {
            type: lo.ArrayExpression,
            elements: e
          };
        },
        object: function() {
          var e,
              t = [];
          if ("}" !== this.peekToken().text)
            do {
              if (this.peek("}"))
                break;
              e = {
                type: lo.Property,
                kind: "init"
              }, this.peek().constant ? e.key = this.constant() : this.peek().identifier ? e.key = this.identifier() : this.throwError("invalid key", this.peek()), this.consume(":"), e.value = this.expression(), t.push(e);
            } while (this.expect(","));
          return this.consume("}"), {
            type: lo.ObjectExpression,
            properties: t
          };
        },
        throwError: function(e, t) {
          throw ro("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index));
        },
        consume: function(e) {
          if (0 === this.tokens.length)
            throw ro("ueoe", "Unexpected end of expression: {0}", this.text);
          var t = this.expect(e);
          return t || this.throwError("is unexpected, expecting [" + e + "]", this.peek()), t;
        },
        peekToken: function() {
          if (0 === this.tokens.length)
            throw ro("ueoe", "Unexpected end of expression: {0}", this.text);
          return this.tokens[0];
        },
        peek: function(e, t, n, r) {
          return this.peekAhead(0, e, t, n, r);
        },
        peekAhead: function(e, t, n, r, i) {
          if (this.tokens.length > e) {
            var o = this.tokens[e],
                a = o.text;
            if (a === t || a === n || a === r || a === i || !t && !n && !r && !i)
              return o;
          }
          return !1;
        },
        expect: function(e, t, n, r) {
          var i = this.peek(e, t, n, r);
          return i ? (this.tokens.shift(), i) : !1;
        },
        constants: {
          "true": {
            type: lo.Literal,
            value: !0
          },
          "false": {
            type: lo.Literal,
            value: !1
          },
          "null": {
            type: lo.Literal,
            value: null
          },
          undefined: {
            type: lo.Literal,
            value: n
          },
          "this": {type: lo.ThisExpression}
        }
      }, ln.prototype = {
        compile: function(e, t) {
          var r = this,
              i = this.astBuilder.ast(e);
          this.state = {
            nextId: 0,
            filters: {},
            expensiveChecks: t,
            fn: {
              vars: [],
              body: [],
              own: {}
            },
            assign: {
              vars: [],
              body: [],
              own: {}
            },
            inputs: []
          }, rn(i, r.$filter);
          var a,
              s = "";
          if (this.stage = "assign", a = sn(i)) {
            this.state.computing = "assign";
            var u = this.nextId();
            this.recurse(a, u), this.return_(u), s = "fn.assign=" + this.generateFunction("assign", "s,v,l");
          }
          var c = on(i.body);
          r.stage = "inputs", o(c, function(e, t) {
            var n = "fn" + t;
            r.state[n] = {
              vars: [],
              body: [],
              own: {}
            }, r.state.computing = n;
            var i = r.nextId();
            r.recurse(e, i), r.return_(i), r.state.inputs.push(n), e.watchId = t;
          }), this.state.computing = "fn", this.stage = "main", this.recurse(i);
          var l = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + s + this.watchFns() + "return fn;",
              f = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", l)(this.$filter, Jt, Zt, Kt, Xt, Qt, en, tn, e);
          return this.state = this.stage = n, f.literal = un(i), f.constant = cn(i), f;
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
          var e = [],
              t = this.state.inputs,
              n = this;
          return o(t, function(t) {
            e.push("var " + t + "=" + n.generateFunction(t, "s"));
          }), t.length && e.push("fn.inputs=[" + t.join(",") + "];"), e.join("");
        },
        generateFunction: function(e, t) {
          return "function(" + t + "){" + this.varsPrefix(e) + this.body(e) + "};";
        },
        filterPrefix: function() {
          var e = [],
              t = this;
          return o(this.state.filters, function(n, r) {
            e.push(n + "=$filter(" + t.escape(r) + ")");
          }), e.length ? "var " + e.join(",") + ";" : "";
        },
        varsPrefix: function(e) {
          return this.state[e].vars.length ? "var " + this.state[e].vars.join(",") + ";" : "";
        },
        body: function(e) {
          return this.state[e].body.join("");
        },
        recurse: function(e, t, r, i, a, s) {
          var u,
              c,
              l,
              f,
              h = this;
          if (i = i || $, !s && b(e.watchId))
            return t = t || this.nextId(), void this.if_("i", this.lazyAssign(t, this.computedMember("i", e.watchId)), this.lazyRecurse(e, t, r, i, a, !0));
          switch (e.type) {
            case lo.Program:
              o(e.body, function(t, r) {
                h.recurse(t.expression, n, n, function(e) {
                  c = e;
                }), r !== e.body.length - 1 ? h.current().body.push(c, ";") : h.return_(c);
              });
              break;
            case lo.Literal:
              f = this.escape(e.value), this.assign(t, f), i(f);
              break;
            case lo.UnaryExpression:
              this.recurse(e.argument, n, n, function(e) {
                c = e;
              }), f = e.operator + "(" + this.ifDefined(c, 0) + ")", this.assign(t, f), i(f);
              break;
            case lo.BinaryExpression:
              this.recurse(e.left, n, n, function(e) {
                u = e;
              }), this.recurse(e.right, n, n, function(e) {
                c = e;
              }), f = "+" === e.operator ? this.plus(u, c) : "-" === e.operator ? this.ifDefined(u, 0) + e.operator + this.ifDefined(c, 0) : "(" + u + ")" + e.operator + "(" + c + ")", this.assign(t, f), i(f);
              break;
            case lo.LogicalExpression:
              t = t || this.nextId(), h.recurse(e.left, t), h.if_("&&" === e.operator ? t : h.not(t), h.lazyRecurse(e.right, t)), i(t);
              break;
            case lo.ConditionalExpression:
              t = t || this.nextId(), h.recurse(e.test, t), h.if_(t, h.lazyRecurse(e.alternate, t), h.lazyRecurse(e.consequent, t)), i(t);
              break;
            case lo.Identifier:
              t = t || this.nextId(), r && (r.context = "inputs" === h.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", e.name) + "?l:s"), r.computed = !1, r.name = e.name), Jt(e.name), h.if_("inputs" === h.stage || h.not(h.getHasOwnProperty("l", e.name)), function() {
                h.if_("inputs" === h.stage || "s", function() {
                  a && 1 !== a && h.if_(h.not(h.nonComputedMember("s", e.name)), h.lazyAssign(h.nonComputedMember("s", e.name), "{}")), h.assign(t, h.nonComputedMember("s", e.name));
                });
              }, t && h.lazyAssign(t, h.nonComputedMember("l", e.name))), (h.state.expensiveChecks || hn(e.name)) && h.addEnsureSafeObject(t), i(t);
              break;
            case lo.MemberExpression:
              u = r && (r.context = this.nextId()) || this.nextId(), t = t || this.nextId(), h.recurse(e.object, u, n, function() {
                h.if_(h.notNull(u), function() {
                  a && 1 !== a && h.addEnsureSafeAssignContext(u), e.computed ? (c = h.nextId(), h.recurse(e.property, c), h.getStringValue(c), h.addEnsureSafeMemberName(c), a && 1 !== a && h.if_(h.not(h.computedMember(u, c)), h.lazyAssign(h.computedMember(u, c), "{}")), f = h.ensureSafeObject(h.computedMember(u, c)), h.assign(t, f), r && (r.computed = !0, r.name = c)) : (Jt(e.property.name), a && 1 !== a && h.if_(h.not(h.nonComputedMember(u, e.property.name)), h.lazyAssign(h.nonComputedMember(u, e.property.name), "{}")), f = h.nonComputedMember(u, e.property.name), (h.state.expensiveChecks || hn(e.property.name)) && (f = h.ensureSafeObject(f)), h.assign(t, f), r && (r.computed = !1, r.name = e.property.name));
                }, function() {
                  h.assign(t, "undefined");
                }), i(t);
              }, !!a);
              break;
            case lo.CallExpression:
              t = t || this.nextId(), e.filter ? (c = h.filter(e.callee.name), l = [], o(e.arguments, function(e) {
                var t = h.nextId();
                h.recurse(e, t), l.push(t);
              }), f = c + "(" + l.join(",") + ")", h.assign(t, f), i(t)) : (c = h.nextId(), u = {}, l = [], h.recurse(e.callee, c, u, function() {
                h.if_(h.notNull(c), function() {
                  h.addEnsureSafeFunction(c), o(e.arguments, function(e) {
                    h.recurse(e, h.nextId(), n, function(e) {
                      l.push(h.ensureSafeObject(e));
                    });
                  }), u.name ? (h.state.expensiveChecks || h.addEnsureSafeObject(u.context), f = h.member(u.context, u.name, u.computed) + "(" + l.join(",") + ")") : f = c + "(" + l.join(",") + ")", f = h.ensureSafeObject(f), h.assign(t, f);
                }, function() {
                  h.assign(t, "undefined");
                }), i(t);
              }));
              break;
            case lo.AssignmentExpression:
              if (c = this.nextId(), u = {}, !an(e.left))
                throw ro("lval", "Trying to assign a value to a non l-value");
              this.recurse(e.left, n, u, function() {
                h.if_(h.notNull(u.context), function() {
                  h.recurse(e.right, c), h.addEnsureSafeObject(h.member(u.context, u.name, u.computed)), h.addEnsureSafeAssignContext(u.context), f = h.member(u.context, u.name, u.computed) + e.operator + c, h.assign(t, f), i(t || f);
                });
              }, 1);
              break;
            case lo.ArrayExpression:
              l = [], o(e.elements, function(e) {
                h.recurse(e, h.nextId(), n, function(e) {
                  l.push(e);
                });
              }), f = "[" + l.join(",") + "]", this.assign(t, f), i(f);
              break;
            case lo.ObjectExpression:
              l = [], o(e.properties, function(e) {
                h.recurse(e.value, h.nextId(), n, function(t) {
                  l.push(h.escape(e.key.type === lo.Identifier ? e.key.name : "" + e.key.value) + ":" + t);
                });
              }), f = "{" + l.join(",") + "}", this.assign(t, f), i(f);
              break;
            case lo.ThisExpression:
              this.assign(t, "s"), i("s");
              break;
            case lo.NGValueParameter:
              this.assign(t, "v"), i("v");
          }
        },
        getHasOwnProperty: function(e, t) {
          var n = e + "." + t,
              r = this.current().own;
          return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, e + "&&(" + this.escape(t) + " in " + e + ")")), r[n];
        },
        assign: function(e, t) {
          return e ? (this.current().body.push(e, "=", t, ";"), e) : void 0;
        },
        filter: function(e) {
          return this.state.filters.hasOwnProperty(e) || (this.state.filters[e] = this.nextId(!0)), this.state.filters[e];
        },
        ifDefined: function(e, t) {
          return "ifDefined(" + e + "," + this.escape(t) + ")";
        },
        plus: function(e, t) {
          return "plus(" + e + "," + t + ")";
        },
        return_: function(e) {
          this.current().body.push("return ", e, ";");
        },
        if_: function(e, t, n) {
          if (e === !0)
            t();
          else {
            var r = this.current().body;
            r.push("if(", e, "){"), t(), r.push("}"), n && (r.push("else{"), n(), r.push("}"));
          }
        },
        not: function(e) {
          return "!(" + e + ")";
        },
        notNull: function(e) {
          return e + "!=null";
        },
        nonComputedMember: function(e, t) {
          return e + "." + t;
        },
        computedMember: function(e, t) {
          return e + "[" + t + "]";
        },
        member: function(e, t, n) {
          return n ? this.computedMember(e, t) : this.nonComputedMember(e, t);
        },
        addEnsureSafeObject: function(e) {
          this.current().body.push(this.ensureSafeObject(e), ";");
        },
        addEnsureSafeMemberName: function(e) {
          this.current().body.push(this.ensureSafeMemberName(e), ";");
        },
        addEnsureSafeFunction: function(e) {
          this.current().body.push(this.ensureSafeFunction(e), ";");
        },
        addEnsureSafeAssignContext: function(e) {
          this.current().body.push(this.ensureSafeAssignContext(e), ";");
        },
        ensureSafeObject: function(e) {
          return "ensureSafeObject(" + e + ",text)";
        },
        ensureSafeMemberName: function(e) {
          return "ensureSafeMemberName(" + e + ",text)";
        },
        ensureSafeFunction: function(e) {
          return "ensureSafeFunction(" + e + ",text)";
        },
        getStringValue: function(e) {
          this.assign(e, "getStringValue(" + e + ",text)");
        },
        ensureSafeAssignContext: function(e) {
          return "ensureSafeAssignContext(" + e + ",text)";
        },
        lazyRecurse: function(e, t, n, r, i, o) {
          var a = this;
          return function() {
            a.recurse(e, t, n, r, i, o);
          };
        },
        lazyAssign: function(e, t) {
          var n = this;
          return function() {
            n.assign(e, t);
          };
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(e) {
          return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
        },
        escape: function(e) {
          if (S(e))
            return "'" + e.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
          if (E(e))
            return e.toString();
          if (e === !0)
            return "true";
          if (e === !1)
            return "false";
          if (null === e)
            return "null";
          if ("undefined" == typeof e)
            return "undefined";
          throw ro("esc", "IMPOSSIBLE");
        },
        nextId: function(e, t) {
          var n = "v" + this.state.nextId++;
          return e || this.current().vars.push(n + (t ? "=" + t : "")), n;
        },
        current: function() {
          return this.state[this.state.computing];
        }
      }, fn.prototype = {
        compile: function(e, t) {
          var n = this,
              r = this.astBuilder.ast(e);
          this.expression = e, this.expensiveChecks = t, rn(r, n.$filter);
          var i,
              a;
          (i = sn(r)) && (a = this.recurse(i));
          var s,
              u = on(r.body);
          u && (s = [], o(u, function(e, t) {
            var r = n.recurse(e);
            e.input = r, s.push(r), e.watchId = t;
          }));
          var c = [];
          o(r.body, function(e) {
            c.push(n.recurse(e.expression));
          });
          var l = 0 === r.body.length ? function() {} : 1 === r.body.length ? c[0] : function(e, t) {
            var n;
            return o(c, function(r) {
              n = r(e, t);
            }), n;
          };
          return a && (l.assign = function(e, t, n) {
            return a(e, n, t);
          }), s && (l.inputs = s), l.literal = un(r), l.constant = cn(r), l;
        },
        recurse: function(e, t, r) {
          var i,
              a,
              s,
              u = this;
          if (e.input)
            return this.inputs(e.input, e.watchId);
          switch (e.type) {
            case lo.Literal:
              return this.value(e.value, t);
            case lo.UnaryExpression:
              return a = this.recurse(e.argument), this["unary" + e.operator](a, t);
            case lo.BinaryExpression:
              return i = this.recurse(e.left), a = this.recurse(e.right), this["binary" + e.operator](i, a, t);
            case lo.LogicalExpression:
              return i = this.recurse(e.left), a = this.recurse(e.right), this["binary" + e.operator](i, a, t);
            case lo.ConditionalExpression:
              return this["ternary?:"](this.recurse(e.test), this.recurse(e.alternate), this.recurse(e.consequent), t);
            case lo.Identifier:
              return Jt(e.name, u.expression), u.identifier(e.name, u.expensiveChecks || hn(e.name), t, r, u.expression);
            case lo.MemberExpression:
              return i = this.recurse(e.object, !1, !!r), e.computed || (Jt(e.property.name, u.expression), a = e.property.name), e.computed && (a = this.recurse(e.property)), e.computed ? this.computedMember(i, a, t, r, u.expression) : this.nonComputedMember(i, a, u.expensiveChecks, t, r, u.expression);
            case lo.CallExpression:
              return s = [], o(e.arguments, function(e) {
                s.push(u.recurse(e));
              }), e.filter && (a = this.$filter(e.callee.name)), e.filter || (a = this.recurse(e.callee, !0)), e.filter ? function(e, r, i, o) {
                for (var u = [],
                    c = 0; c < s.length; ++c)
                  u.push(s[c](e, r, i, o));
                var l = a.apply(n, u, o);
                return t ? {
                  context: n,
                  name: n,
                  value: l
                } : l;
              } : function(e, n, r, i) {
                var o,
                    c = a(e, n, r, i);
                if (null != c.value) {
                  Zt(c.context, u.expression), Kt(c.value, u.expression);
                  for (var l = [],
                      f = 0; f < s.length; ++f)
                    l.push(Zt(s[f](e, n, r, i), u.expression));
                  o = Zt(c.value.apply(c.context, l), u.expression);
                }
                return t ? {value: o} : o;
              };
            case lo.AssignmentExpression:
              return i = this.recurse(e.left, !0, 1), a = this.recurse(e.right), function(e, n, r, o) {
                var s = i(e, n, r, o),
                    c = a(e, n, r, o);
                return Zt(s.value, u.expression), Qt(s.context), s.context[s.name] = c, t ? {value: c} : c;
              };
            case lo.ArrayExpression:
              return s = [], o(e.elements, function(e) {
                s.push(u.recurse(e));
              }), function(e, n, r, i) {
                for (var o = [],
                    a = 0; a < s.length; ++a)
                  o.push(s[a](e, n, r, i));
                return t ? {value: o} : o;
              };
            case lo.ObjectExpression:
              return s = [], o(e.properties, function(e) {
                s.push({
                  key: e.key.type === lo.Identifier ? e.key.name : "" + e.key.value,
                  value: u.recurse(e.value)
                });
              }), function(e, n, r, i) {
                for (var o = {},
                    a = 0; a < s.length; ++a)
                  o[s[a].key] = s[a].value(e, n, r, i);
                return t ? {value: o} : o;
              };
            case lo.ThisExpression:
              return function(e) {
                return t ? {value: e} : e;
              };
            case lo.NGValueParameter:
              return function(e, n, r, i) {
                return t ? {value: r} : r;
              };
          }
        },
        "unary+": function(e, t) {
          return function(n, r, i, o) {
            var a = e(n, r, i, o);
            return a = b(a) ? +a : 0, t ? {value: a} : a;
          };
        },
        "unary-": function(e, t) {
          return function(n, r, i, o) {
            var a = e(n, r, i, o);
            return a = b(a) ? -a : 0, t ? {value: a} : a;
          };
        },
        "unary!": function(e, t) {
          return function(n, r, i, o) {
            var a = !e(n, r, i, o);
            return t ? {value: a} : a;
          };
        },
        "binary+": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a),
                u = t(r, i, o, a),
                c = tn(s, u);
            return n ? {value: c} : c;
          };
        },
        "binary-": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a),
                u = t(r, i, o, a),
                c = (b(s) ? s : 0) - (b(u) ? u : 0);
            return n ? {value: c} : c;
          };
        },
        "binary*": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) * t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary/": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) / t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary%": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) % t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary===": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) === t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary!==": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) !== t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary==": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) == t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary!=": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) != t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary<": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) < t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary>": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) > t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary<=": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) <= t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary>=": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) >= t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary&&": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) && t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "binary||": function(e, t, n) {
          return function(r, i, o, a) {
            var s = e(r, i, o, a) || t(r, i, o, a);
            return n ? {value: s} : s;
          };
        },
        "ternary?:": function(e, t, n, r) {
          return function(i, o, a, s) {
            var u = e(i, o, a, s) ? t(i, o, a, s) : n(i, o, a, s);
            return r ? {value: u} : u;
          };
        },
        value: function(e, t) {
          return function() {
            return t ? {
              context: n,
              name: n,
              value: e
            } : e;
          };
        },
        identifier: function(e, t, r, i, o) {
          return function(a, s, u, c) {
            var l = s && e in s ? s : a;
            i && 1 !== i && l && !l[e] && (l[e] = {});
            var f = l ? l[e] : n;
            return t && Zt(f, o), r ? {
              context: l,
              name: e,
              value: f
            } : f;
          };
        },
        computedMember: function(e, t, n, r, i) {
          return function(o, a, s, u) {
            var c,
                l,
                f = e(o, a, s, u);
            return null != f && (c = t(o, a, s, u), c = Xt(c), Jt(c, i), r && 1 !== r && (Qt(f), f && !f[c] && (f[c] = {})), l = f[c], Zt(l, i)), n ? {
              context: f,
              name: c,
              value: l
            } : l;
          };
        },
        nonComputedMember: function(e, t, r, i, o, a) {
          return function(s, u, c, l) {
            var f = e(s, u, c, l);
            o && 1 !== o && (Qt(f), f && !f[t] && (f[t] = {}));
            var h = null != f ? f[t] : n;
            return (r || hn(t)) && Zt(h, a), i ? {
              context: f,
              name: t,
              value: h
            } : h;
          };
        },
        inputs: function(e, t) {
          return function(n, r, i, o) {
            return o ? o[t] : e(n, r, i);
          };
        }
      };
      var fo = function(e, t, n) {
        this.lexer = e, this.$filter = t, this.options = n, this.ast = new lo(this.lexer), this.astCompiler = n.csp ? new fn(this.ast, t) : new ln(this.ast, t);
      };
      fo.prototype = {
        constructor: fo,
        parse: function(e) {
          return this.astCompiler.compile(e, this.options.expensiveChecks);
        }
      };
      var ho = Object.prototype.valueOf,
          po = r("$sce"),
          $o = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
          },
          Ui = r("$compile"),
          vo = t.createElement("a"),
          mo = Mn(e.location.href);
      jn.$inject = ["$document"], Dn.$inject = ["$provide"];
      var go = 22,
          yo = ".",
          bo = "0";
      qn.$inject = ["$locale"], Un.$inject = ["$locale"];
      var wo = {
        yyyy: zn("FullYear", 4),
        yy: zn("FullYear", 2, 0, !0),
        y: zn("FullYear", 1),
        MMMM: Wn("Month"),
        MMM: Wn("Month", !0),
        MM: zn("Month", 2, 1),
        M: zn("Month", 1, 1),
        dd: zn("Date", 2),
        d: zn("Date", 1),
        HH: zn("Hours", 2),
        H: zn("Hours", 1),
        hh: zn("Hours", 2, -12),
        h: zn("Hours", 1, -12),
        mm: zn("Minutes", 2),
        m: zn("Minutes", 1),
        ss: zn("Seconds", 2),
        s: zn("Seconds", 1),
        sss: zn("Milliseconds", 3),
        EEEE: Wn("Day"),
        EEE: Wn("Day", !0),
        a: Zn,
        Z: Gn,
        ww: Xn(2),
        w: Xn(1),
        G: Kn,
        GG: Kn,
        GGG: Kn,
        GGGG: Qn
      },
          xo = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
          So = /^\-?\d+$/;
      er.$inject = ["$locale"];
      var Eo = m(kr),
          Co = m(Or);
      rr.$inject = ["$parse"];
      var ko = m({
        restrict: "E",
        compile: function(e, t) {
          return t.href || t.xlinkHref ? void 0 : function(e, t) {
            if ("a" === t[0].nodeName.toLowerCase()) {
              var n = "[object SVGAnimatedString]" === Rr.call(t.prop("href")) ? "xlink:href" : "href";
              t.on("click", function(e) {
                t.attr(n) || e.preventDefault();
              });
            }
          };
        }
      }),
          Ao = {};
      o(xi, function(e, t) {
        function n(e, n, i) {
          e.$watch(i[r], function(e) {
            i.$set(t, !!e);
          });
        }
        if ("multiple" != e) {
          var r = ht("ng-" + t),
              i = n;
          "checked" === e && (i = function(e, t, i) {
            i.ngModel !== i[r] && n(e, t, i);
          }), Ao[r] = function() {
            return {
              restrict: "A",
              priority: 100,
              link: i
            };
          };
        }
      }), o(Ei, function(e, t) {
        Ao[t] = function() {
          return {
            priority: 100,
            link: function(e, n, r) {
              if ("ngPattern" === t && "/" == r.ngPattern.charAt(0)) {
                var i = r.ngPattern.match(Er);
                if (i)
                  return void r.$set("ngPattern", new RegExp(i[1], i[2]));
              }
              e.$watch(r[t], function(e) {
                r.$set(t, e);
              });
            }
          };
        };
      }), o(["src", "srcset", "href"], function(e) {
        var t = ht("ng-" + e);
        Ao[t] = function() {
          return {
            priority: 99,
            link: function(n, r, i) {
              var o = e,
                  a = e;
              "href" === e && "[object SVGAnimatedString]" === Rr.call(r.prop("href")) && (a = "xlinkHref", i.$attr[a] = "xlink:href", o = null), i.$observe(t, function(t) {
                return t ? (i.$set(a, t), void(Nr && o && r.prop(o, i[a]))) : void("href" === e && i.$set(a, null));
              });
            }
          };
        };
      });
      var Oo = {
        $addControl: $,
        $$renameControl: or,
        $removeControl: $,
        $setValidity: $,
        $setDirty: $,
        $setPristine: $,
        $setSubmitted: $
      },
          Mo = "ng-submitted";
      ar.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
      var To = function(e) {
        return ["$timeout", "$parse", function(t, r) {
          function i(e) {
            return "" === e ? r('this[""]').assign : r(e).assign || $;
          }
          var o = {
            name: "form",
            restrict: e ? "EAC" : "E",
            require: ["form", "^^?form"],
            controller: ar,
            compile: function(r, o) {
              r.addClass(ha).addClass(la);
              var a = o.name ? "name" : e && o.ngForm ? "ngForm" : !1;
              return {pre: function(e, r, o, s) {
                  var u = s[0];
                  if (!("action" in o)) {
                    var c = function(t) {
                      e.$apply(function() {
                        u.$commitViewValue(), u.$setSubmitted();
                      }), t.preventDefault();
                    };
                    ci(r[0], "submit", c), r.on("$destroy", function() {
                      t(function() {
                        li(r[0], "submit", c);
                      }, 0, !1);
                    });
                  }
                  var l = s[1] || u.$$parentForm;
                  l.$addControl(u);
                  var h = a ? i(u.$name) : $;
                  a && (h(e, u), o.$observe(a, function(t) {
                    u.$name !== t && (h(e, n), u.$$parentForm.$$renameControl(u, t), (h = i(u.$name))(e, u));
                  })), r.on("$destroy", function() {
                    u.$$parentForm.$removeControl(u), h(e, n), f(u, Oo);
                  });
                }};
            }
          };
          return o;
        }];
      },
          No = To(),
          jo = To(!0),
          Vo = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
          Do = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
          Po = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
          _o = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
          Io = /^(\d{4})-(\d{2})-(\d{2})$/,
          Ro = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
          qo = /^(\d{4})-W(\d\d)$/,
          Uo = /^(\d{4})-(\d\d)$/,
          Fo = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
          Bo = "keydown wheel mousedown",
          Ho = ve();
      o("date,datetime-local,month,time,week".split(","), function(e) {
        Ho[e] = !0;
      });
      var Lo = {
        text: ur,
        date: hr("date", Io, fr(Io, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
        "datetime-local": hr("datetimelocal", Ro, fr(Ro, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: hr("time", Fo, fr(Fo, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
        week: hr("week", qo, lr, "yyyy-Www"),
        month: hr("month", Uo, fr(Uo, ["yyyy", "MM"]), "yyyy-MM"),
        number: dr,
        url: $r,
        email: vr,
        radio: mr,
        checkbox: yr,
        hidden: $,
        button: $,
        submit: $,
        reset: $,
        file: $
      },
          zo = ["$browser", "$sniffer", "$filter", "$parse", function(e, t, n, r) {
            return {
              restrict: "E",
              require: ["?ngModel"],
              link: {pre: function(i, o, a, s) {
                  s[0] && (Lo[kr(a.type)] || Lo.text)(i, o, a, s[0], t, e, n, r);
                }}
            };
          }],
          Wo = /^(true|false|\d+)$/,
          Go = function() {
            return {
              restrict: "A",
              priority: 100,
              compile: function(e, t) {
                return Wo.test(t.ngValue) ? function(e, t, n) {
                  n.$set("value", e.$eval(n.ngValue));
                } : function(e, t, n) {
                  e.$watch(n.ngValue, function(e) {
                    n.$set("value", e);
                  });
                };
              }
            };
          },
          Yo = ["$compile", function(e) {
            return {
              restrict: "AC",
              compile: function(t) {
                return e.$$addBindingClass(t), function(t, n, r) {
                  e.$$addBindingInfo(n, r.ngBind), n = n[0], t.$watch(r.ngBind, function(e) {
                    n.textContent = y(e) ? "" : e;
                  });
                };
              }
            };
          }],
          Jo = ["$interpolate", "$compile", function(e, t) {
            return {compile: function(n) {
                return t.$$addBindingClass(n), function(n, r, i) {
                  var o = e(r.attr(i.$attr.ngBindTemplate));
                  t.$$addBindingInfo(r, o.expressions), r = r[0], i.$observe("ngBindTemplate", function(e) {
                    r.textContent = y(e) ? "" : e;
                  });
                };
              }};
          }],
          Xo = ["$sce", "$parse", "$compile", function(e, t, n) {
            return {
              restrict: "A",
              compile: function(r, i) {
                var o = t(i.ngBindHtml),
                    a = t(i.ngBindHtml, function(t) {
                      return e.valueOf(t);
                    });
                return n.$$addBindingClass(r), function(t, r, i) {
                  n.$$addBindingInfo(r, i.ngBindHtml), t.$watch(a, function() {
                    var n = o(t);
                    r.html(e.getTrustedHtml(n) || "");
                  });
                };
              }
            };
          }],
          Zo = m({
            restrict: "A",
            require: "ngModel",
            link: function(e, t, n, r) {
              r.$viewChangeListeners.push(function() {
                e.$eval(n.ngChange);
              });
            }
          }),
          Ko = br("", !0),
          Qo = br("Odd", 0),
          ea = br("Even", 1),
          ta = ir({compile: function(e, t) {
              t.$set("ngCloak", n), e.removeClass("ng-cloak");
            }}),
          na = [function() {
            return {
              restrict: "A",
              scope: !0,
              controller: "@",
              priority: 500
            };
          }],
          ra = {},
          ia = {
            blur: !0,
            focus: !0
          };
      o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(e) {
        var t = ht("ng-" + e);
        ra[t] = ["$parse", "$rootScope", function(n, r) {
          return {
            restrict: "A",
            compile: function(i, o) {
              var a = n(o[t], null, !0);
              return function(t, n) {
                n.on(e, function(n) {
                  var i = function() {
                    a(t, {$event: n});
                  };
                  ia[e] && r.$$phase ? t.$evalAsync(i) : t.$apply(i);
                });
              };
            }
          };
        }];
      });
      var oa = ["$animate", function(e) {
        return {
          multiElement: !0,
          transclude: "element",
          priority: 600,
          terminal: !0,
          restrict: "A",
          $$tlb: !0,
          link: function(n, r, i, o, a) {
            var s,
                u,
                c;
            n.$watch(i.ngIf, function(n) {
              n ? u || a(function(n, o) {
                u = o, n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " "), s = {clone: n}, e.enter(n, r.parent(), r);
              }) : (c && (c.remove(), c = null), u && (u.$destroy(), u = null), s && (c = $e(s.clone), e.leave(c).then(function() {
                c = null;
              }), s = null));
            });
          }
        };
      }],
          aa = ["$templateRequest", "$anchorScroll", "$animate", function(e, t, n) {
            return {
              restrict: "ECA",
              priority: 400,
              terminal: !0,
              transclude: "element",
              controller: Fr.noop,
              compile: function(r, i) {
                var o = i.ngInclude || i.src,
                    a = i.onload || "",
                    s = i.autoscroll;
                return function(r, i, u, c, l) {
                  var f,
                      h,
                      p,
                      d = 0,
                      $ = function() {
                        h && (h.remove(), h = null), f && (f.$destroy(), f = null), p && (n.leave(p).then(function() {
                          h = null;
                        }), h = p, p = null);
                      };
                  r.$watch(o, function(o) {
                    var u = function() {
                      !b(s) || s && !r.$eval(s) || t();
                    },
                        h = ++d;
                    o ? (e(o, !0).then(function(e) {
                      if (!r.$$destroyed && h === d) {
                        var t = r.$new();
                        c.template = e;
                        var s = l(t, function(e) {
                          $(), n.enter(e, null, i).then(u);
                        });
                        f = t, p = s, f.$emit("$includeContentLoaded", o), r.$eval(a);
                      }
                    }, function() {
                      r.$$destroyed || h === d && ($(), r.$emit("$includeContentError", o));
                    }), r.$emit("$includeContentRequested", o)) : ($(), c.template = null);
                  });
                };
              }
            };
          }],
          sa = ["$compile", function(e) {
            return {
              restrict: "ECA",
              priority: -400,
              require: "ngInclude",
              link: function(n, r, i, o) {
                return /SVG/.test(r[0].toString()) ? (r.empty(), void e(ke(o.template, t).childNodes)(n, function(e) {
                  r.append(e);
                }, {futureParentElement: r})) : (r.html(o.template), void e(r.contents())(n));
              }
            };
          }],
          ua = ir({
            priority: 450,
            compile: function() {
              return {pre: function(e, t, n) {
                  e.$eval(n.ngInit);
                }};
            }
          }),
          ca = function() {
            return {
              restrict: "A",
              priority: 100,
              require: "ngModel",
              link: function(e, t, r, i) {
                var a = t.attr(r.$attr.ngList) || ", ",
                    s = "false" !== r.ngTrim,
                    u = s ? Wr(a) : a,
                    c = function(e) {
                      if (!y(e)) {
                        var t = [];
                        return e && o(e.split(u), function(e) {
                          e && t.push(s ? Wr(e) : e);
                        }), t;
                      }
                    };
                i.$parsers.push(c), i.$formatters.push(function(e) {
                  return Lr(e) ? e.join(a) : n;
                }), i.$isEmpty = function(e) {
                  return !e || !e.length;
                };
              }
            };
          },
          la = "ng-valid",
          fa = "ng-invalid",
          ha = "ng-pristine",
          pa = "ng-dirty",
          da = "ng-untouched",
          $a = "ng-touched",
          va = "ng-pending",
          ma = r("ngModel"),
          ga = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(e, t, r, i, a, s, u, c, l, f) {
            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = n, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = n, this.$name = f(r.name || "", !1)(e), this.$$parentForm = Oo;
            var h,
                p = a(r.ngModel),
                d = p.assign,
                v = p,
                m = d,
                g = null,
                w = this;
            this.$$setOptions = function(e) {
              if (w.$options = e, e && e.getterSetter) {
                var t = a(r.ngModel + "()"),
                    n = a(r.ngModel + "($$$p)");
                v = function(e) {
                  var n = p(e);
                  return k(n) && (n = t(e)), n;
                }, m = function(e, t) {
                  k(p(e)) ? n(e, {$$$p: w.$modelValue}) : d(e, w.$modelValue);
                };
              } else if (!p.assign)
                throw ma("nonassign", "Expression '{0}' is non-assignable. Element: {1}", r.ngModel, K(i));
            }, this.$render = $, this.$isEmpty = function(e) {
              return y(e) || "" === e || null === e || e !== e;
            };
            var x = 0;
            wr({
              ctrl: this,
              $element: i,
              set: function(e, t) {
                e[t] = !0;
              },
              unset: function(e, t) {
                delete e[t];
              },
              $animate: s
            }), this.$setPristine = function() {
              w.$dirty = !1, w.$pristine = !0, s.removeClass(i, pa), s.addClass(i, ha);
            }, this.$setDirty = function() {
              w.$dirty = !0, w.$pristine = !1, s.removeClass(i, ha), s.addClass(i, pa), w.$$parentForm.$setDirty();
            }, this.$setUntouched = function() {
              w.$touched = !1, w.$untouched = !0, s.setClass(i, da, $a);
            }, this.$setTouched = function() {
              w.$touched = !0, w.$untouched = !1, s.setClass(i, $a, da);
            }, this.$rollbackViewValue = function() {
              u.cancel(g), w.$viewValue = w.$$lastCommittedViewValue, w.$render();
            }, this.$validate = function() {
              if (!E(w.$modelValue) || !isNaN(w.$modelValue)) {
                var e = w.$$lastCommittedViewValue,
                    t = w.$$rawModelValue,
                    r = w.$valid,
                    i = w.$modelValue,
                    o = w.$options && w.$options.allowInvalid;
                w.$$runValidators(t, e, function(e) {
                  o || r === e || (w.$modelValue = e ? t : n, w.$modelValue !== i && w.$$writeModelToScope());
                });
              }
            }, this.$$runValidators = function(e, t, r) {
              function i() {
                var e = w.$$parserName || "parse";
                return y(h) ? (u(e, null), !0) : (h || (o(w.$validators, function(e, t) {
                  u(t, null);
                }), o(w.$asyncValidators, function(e, t) {
                  u(t, null);
                })), u(e, h), h);
              }
              function a() {
                var n = !0;
                return o(w.$validators, function(r, i) {
                  var o = r(e, t);
                  n = n && o, u(i, o);
                }), n ? !0 : (o(w.$asyncValidators, function(e, t) {
                  u(t, null);
                }), !1);
              }
              function s() {
                var r = [],
                    i = !0;
                o(w.$asyncValidators, function(o, a) {
                  var s = o(e, t);
                  if (!D(s))
                    throw ma("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
                  u(a, n), r.push(s.then(function() {
                    u(a, !0);
                  }, function(e) {
                    i = !1, u(a, !1);
                  }));
                }), r.length ? l.all(r).then(function() {
                  c(i);
                }, $) : c(!0);
              }
              function u(e, t) {
                f === x && w.$setValidity(e, t);
              }
              function c(e) {
                f === x && r(e);
              }
              x++;
              var f = x;
              return i() && a() ? void s() : void c(!1);
            }, this.$commitViewValue = function() {
              var e = w.$viewValue;
              u.cancel(g), (w.$$lastCommittedViewValue !== e || "" === e && w.$$hasNativeValidators) && (w.$$lastCommittedViewValue = e, w.$pristine && this.$setDirty(), this.$$parseAndValidate());
            }, this.$$parseAndValidate = function() {
              function t() {
                w.$modelValue !== a && w.$$writeModelToScope();
              }
              var r = w.$$lastCommittedViewValue,
                  i = r;
              if (h = y(i) ? n : !0)
                for (var o = 0; o < w.$parsers.length; o++)
                  if (i = w.$parsers[o](i), y(i)) {
                    h = !1;
                    break;
                  }
              E(w.$modelValue) && isNaN(w.$modelValue) && (w.$modelValue = v(e));
              var a = w.$modelValue,
                  s = w.$options && w.$options.allowInvalid;
              w.$$rawModelValue = i, s && (w.$modelValue = i, t()), w.$$runValidators(i, w.$$lastCommittedViewValue, function(e) {
                s || (w.$modelValue = e ? i : n, t());
              });
            }, this.$$writeModelToScope = function() {
              m(e, w.$modelValue), o(w.$viewChangeListeners, function(e) {
                try {
                  e();
                } catch (n) {
                  t(n);
                }
              });
            }, this.$setViewValue = function(e, t) {
              w.$viewValue = e, w.$options && !w.$options.updateOnDefault || w.$$debounceViewValueCommit(t);
            }, this.$$debounceViewValueCommit = function(t) {
              var n,
                  r = 0,
                  i = w.$options;
              i && b(i.debounce) && (n = i.debounce, E(n) ? r = n : E(n[t]) ? r = n[t] : E(n["default"]) && (r = n["default"])), u.cancel(g), r ? g = u(function() {
                w.$commitViewValue();
              }, r) : c.$$phase ? w.$commitViewValue() : e.$apply(function() {
                w.$commitViewValue();
              });
            }, e.$watch(function() {
              var t = v(e);
              if (t !== w.$modelValue && (w.$modelValue === w.$modelValue || t === t)) {
                w.$modelValue = w.$$rawModelValue = t, h = n;
                for (var r = w.$formatters,
                    i = r.length,
                    o = t; i--; )
                  o = r[i](o);
                w.$viewValue !== o && (w.$viewValue = w.$$lastCommittedViewValue = o, w.$render(), w.$$runValidators(t, o, $));
              }
              return t;
            });
          }],
          ya = ["$rootScope", function(e) {
            return {
              restrict: "A",
              require: ["ngModel", "^?form", "^?ngModelOptions"],
              controller: ga,
              priority: 1,
              compile: function(t) {
                return t.addClass(ha).addClass(da).addClass(la), {
                  pre: function(e, t, n, r) {
                    var i = r[0],
                        o = r[1] || i.$$parentForm;
                    i.$$setOptions(r[2] && r[2].$options), o.$addControl(i), n.$observe("name", function(e) {
                      i.$name !== e && i.$$parentForm.$$renameControl(i, e);
                    }), e.$on("$destroy", function() {
                      i.$$parentForm.$removeControl(i);
                    });
                  },
                  post: function(t, n, r, i) {
                    var o = i[0];
                    o.$options && o.$options.updateOn && n.on(o.$options.updateOn, function(e) {
                      o.$$debounceViewValueCommit(e && e.type);
                    }), n.on("blur", function(n) {
                      o.$touched || (e.$$phase ? t.$evalAsync(o.$setTouched) : t.$apply(o.$setTouched));
                    });
                  }
                };
              }
            };
          }],
          ba = /(\s+|^)default(\s+|$)/,
          wa = function() {
            return {
              restrict: "A",
              controller: ["$scope", "$attrs", function(e, t) {
                var n = this;
                this.$options = U(e.$eval(t.ngModelOptions)), b(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Wr(this.$options.updateOn.replace(ba, function() {
                  return n.$options.updateOnDefault = !0, " ";
                }))) : this.$options.updateOnDefault = !0;
              }]
            };
          },
          xa = ir({
            terminal: !0,
            priority: 1e3
          }),
          Sa = r("ngOptions"),
          Ea = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
          Ca = ["$compile", "$parse", function(e, n) {
            function r(e, t, r) {
              function o(e, t, n, r, i) {
                this.selectValue = e, this.viewValue = t, this.label = n, this.group = r, this.disabled = i;
              }
              function a(e) {
                var t;
                if (!c && i(e))
                  t = e;
                else {
                  t = [];
                  for (var n in e)
                    e.hasOwnProperty(n) && "$" !== n.charAt(0) && t.push(n);
                }
                return t;
              }
              var s = e.match(Ea);
              if (!s)
                throw Sa("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", e, K(t));
              var u = s[5] || s[7],
                  c = s[6],
                  l = / as /.test(s[0]) && s[1],
                  f = s[9],
                  h = n(s[2] ? s[1] : u),
                  p = l && n(l),
                  d = p || h,
                  $ = f && n(f),
                  v = f ? function(e, t) {
                    return $(r, t);
                  } : function(e) {
                    return Ze(e);
                  },
                  m = function(e, t) {
                    return v(e, S(e, t));
                  },
                  g = n(s[2] || s[1]),
                  y = n(s[3] || ""),
                  b = n(s[4] || ""),
                  w = n(s[8]),
                  x = {},
                  S = c ? function(e, t) {
                    return x[c] = t, x[u] = e, x;
                  } : function(e) {
                    return x[u] = e, x;
                  };
              return {
                trackBy: f,
                getTrackByValue: m,
                getWatchables: n(w, function(e) {
                  var t = [];
                  e = e || [];
                  for (var n = a(e),
                      i = n.length,
                      o = 0; i > o; o++) {
                    var u = e === n ? o : n[o],
                        c = (e[u], S(e[u], u)),
                        l = v(e[u], c);
                    if (t.push(l), s[2] || s[1]) {
                      var f = g(r, c);
                      t.push(f);
                    }
                    if (s[4]) {
                      var h = b(r, c);
                      t.push(h);
                    }
                  }
                  return t;
                }),
                getOptions: function() {
                  for (var e = [],
                      t = {},
                      n = w(r) || [],
                      i = a(n),
                      s = i.length,
                      u = 0; s > u; u++) {
                    var c = n === i ? u : i[u],
                        l = n[c],
                        h = S(l, c),
                        p = d(r, h),
                        $ = v(p, h),
                        x = g(r, h),
                        E = y(r, h),
                        C = b(r, h),
                        k = new o($, p, x, E, C);
                    e.push(k), t[$] = k;
                  }
                  return {
                    items: e,
                    selectValueMap: t,
                    getOptionFromViewValue: function(e) {
                      return t[m(e)];
                    },
                    getViewValueFromOption: function(e) {
                      return f ? Fr.copy(e.viewValue) : e.viewValue;
                    }
                  };
                }
              };
            }
            function a(t, n, i, a) {
              function c(e, t) {
                e.element = t, t.disabled = e.disabled, e.label !== t.label && (t.label = e.label, t.textContent = e.label), e.value !== t.value && (t.value = e.selectValue);
              }
              function l(e, t, n, r) {
                var i;
                return t && kr(t.nodeName) === n ? i = t : (i = r.cloneNode(!1), t ? e.insertBefore(i, t) : e.appendChild(i)), i;
              }
              function f(e) {
                for (var t; e; )
                  t = e.nextSibling, He(e), e = t;
              }
              function h(e) {
                var t = $ && $[0],
                    n = x && x[0];
                if (t || n)
                  for (; e && (e === t || e === n || e.nodeType === ri || "option" === R(e) && "" === e.value); )
                    e = e.nextSibling;
                return e;
              }
              function p() {
                var e = S && v.readValue();
                S = E.getOptions();
                var t = {},
                    r = n[0].firstChild;
                if (w && n.prepend($), r = h(r), S.items.forEach(function(e) {
                  var i,
                      o,
                      a;
                  e.group ? (i = t[e.group], i || (o = l(n[0], r, "optgroup", u), r = o.nextSibling, o.label = e.group, i = t[e.group] = {
                    groupElement: o,
                    currentOptionElement: o.firstChild
                  }), a = l(i.groupElement, i.currentOptionElement, "option", s), c(e, a), i.currentOptionElement = a.nextSibling) : (a = l(n[0], r, "option", s), c(e, a), r = a.nextSibling);
                }), Object.keys(t).forEach(function(e) {
                  f(t[e].currentOptionElement);
                }), f(r), d.$render(), !d.$isEmpty(e)) {
                  var i = v.readValue(),
                      o = E.trackBy || m;
                  (o ? B(e, i) : e === i) || (d.$setViewValue(i), d.$render());
                }
              }
              var d = a[1];
              if (d) {
                for (var $,
                    v = a[0],
                    m = i.multiple,
                    g = 0,
                    y = n.children(),
                    b = y.length; b > g; g++)
                  if ("" === y[g].value) {
                    $ = y.eq(g);
                    break;
                  }
                var w = !!$,
                    x = jr(s.cloneNode(!1));
                x.val("?");
                var S,
                    E = r(i.ngOptions, n, t),
                    C = function() {
                      w || n.prepend($), n.val(""), $.prop("selected", !0), $.attr("selected", !0);
                    },
                    k = function() {
                      w || $.remove();
                    },
                    A = function() {
                      n.prepend(x), n.val("?"), x.prop("selected", !0), x.attr("selected", !0);
                    },
                    O = function() {
                      x.remove();
                    };
                m ? (d.$isEmpty = function(e) {
                  return !e || 0 === e.length;
                }, v.writeValue = function(e) {
                  S.items.forEach(function(e) {
                    e.element.selected = !1;
                  }), e && e.forEach(function(e) {
                    var t = S.getOptionFromViewValue(e);
                    t && !t.disabled && (t.element.selected = !0);
                  });
                }, v.readValue = function() {
                  var e = n.val() || [],
                      t = [];
                  return o(e, function(e) {
                    var n = S.selectValueMap[e];
                    n && !n.disabled && t.push(S.getViewValueFromOption(n));
                  }), t;
                }, E.trackBy && t.$watchCollection(function() {
                  return Lr(d.$viewValue) ? d.$viewValue.map(function(e) {
                    return E.getTrackByValue(e);
                  }) : void 0;
                }, function() {
                  d.$render();
                })) : (v.writeValue = function(e) {
                  var t = S.getOptionFromViewValue(e);
                  t && !t.disabled ? (n[0].value !== t.selectValue && (O(), k(), n[0].value = t.selectValue, t.element.selected = !0), t.element.setAttribute("selected", "selected")) : null === e || w ? (O(), C()) : (k(), A());
                }, v.readValue = function() {
                  var e = S.selectValueMap[n.val()];
                  return e && !e.disabled ? (k(), O(), S.getViewValueFromOption(e)) : null;
                }, E.trackBy && t.$watch(function() {
                  return E.getTrackByValue(d.$viewValue);
                }, function() {
                  d.$render();
                })), w ? ($.remove(), e($)(t), $.removeClass("ng-scope")) : $ = jr(s.cloneNode(!1)), p(), t.$watchCollection(E.getWatchables, p);
              }
            }
            var s = t.createElement("option"),
                u = t.createElement("optgroup");
            return {
              restrict: "A",
              terminal: !0,
              require: ["select", "?ngModel"],
              link: {
                pre: function(e, t, n, r) {
                  r[0].registerOption = $;
                },
                post: a
              }
            };
          }],
          ka = ["$locale", "$interpolate", "$log", function(e, t, n) {
            var r = /{}/g,
                i = /^when(Minus)?(.+)$/;
            return {link: function(a, s, u) {
                function c(e) {
                  s.text(e || "");
                }
                var l,
                    f = u.count,
                    h = u.$attr.when && s.attr(u.$attr.when),
                    p = u.offset || 0,
                    d = a.$eval(h) || {},
                    v = {},
                    m = t.startSymbol(),
                    g = t.endSymbol(),
                    b = m + f + "-" + p + g,
                    w = Fr.noop;
                o(u, function(e, t) {
                  var n = i.exec(t);
                  if (n) {
                    var r = (n[1] ? "-" : "") + kr(n[2]);
                    d[r] = s.attr(u.$attr[t]);
                  }
                }), o(d, function(e, n) {
                  v[n] = t(e.replace(r, b));
                }), a.$watch(f, function(t) {
                  var r = parseFloat(t),
                      i = isNaN(r);
                  if (i || r in d || (r = e.pluralCat(r - p)), r !== l && !(i && E(l) && isNaN(l))) {
                    w();
                    var o = v[r];
                    y(o) ? (null != t && n.debug("ngPluralize: no rule defined for '" + r + "' in " + h), w = $, c()) : w = a.$watch(o, c), l = r;
                  }
                });
              }};
          }],
          Aa = ["$parse", "$animate", function(e, a) {
            var s = "$$NG_REMOVED",
                u = r("ngRepeat"),
                c = function(e, t, n, r, i, o, a) {
                  e[n] = r, i && (e[i] = o), e.$index = t, e.$first = 0 === t, e.$last = t === a - 1, e.$middle = !(e.$first || e.$last), e.$odd = !(e.$even = 0 === (1 & t));
                },
                l = function(e) {
                  return e.clone[0];
                },
                f = function(e) {
                  return e.clone[e.clone.length - 1];
                };
            return {
              restrict: "A",
              multiElement: !0,
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              $$tlb: !0,
              compile: function(r, h) {
                var p = h.ngRepeat,
                    d = t.createComment(" end ngRepeat: " + p + " "),
                    $ = p.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!$)
                  throw u("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", p);
                var v = $[1],
                    m = $[2],
                    g = $[3],
                    y = $[4];
                if ($ = v.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !$)
                  throw u("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", v);
                var b = $[3] || $[1],
                    w = $[2];
                if (g && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(g) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(g)))
                  throw u("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", g);
                var x,
                    S,
                    E,
                    C,
                    k = {$id: Ze};
                return y ? x = e(y) : (E = function(e, t) {
                  return Ze(t);
                }, C = function(e) {
                  return e;
                }), function(e, t, r, h, $) {
                  x && (S = function(t, n, r) {
                    return w && (k[w] = t), k[b] = n, k.$index = r, x(e, k);
                  });
                  var v = ve();
                  e.$watchCollection(m, function(r) {
                    var h,
                        m,
                        y,
                        x,
                        k,
                        A,
                        O,
                        M,
                        T,
                        N,
                        j,
                        V,
                        D = t[0],
                        P = ve();
                    if (g && (e[g] = r), i(r))
                      T = r, M = S || E;
                    else {
                      M = S || C, T = [];
                      for (var _ in r)
                        Ar.call(r, _) && "$" !== _.charAt(0) && T.push(_);
                    }
                    for (x = T.length, j = new Array(x), h = 0; x > h; h++)
                      if (k = r === T ? h : T[h], A = r[k], O = M(k, A, h), v[O])
                        N = v[O], delete v[O], P[O] = N, j[h] = N;
                      else {
                        if (P[O])
                          throw o(j, function(e) {
                            e && e.scope && (v[e.id] = e);
                          }), u("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", p, O, A);
                        j[h] = {
                          id: O,
                          scope: n,
                          clone: n
                        }, P[O] = !0;
                      }
                    for (var I in v) {
                      if (N = v[I], V = $e(N.clone), a.leave(V), V[0].parentNode)
                        for (h = 0, m = V.length; m > h; h++)
                          V[h][s] = !0;
                      N.scope.$destroy();
                    }
                    for (h = 0; x > h; h++)
                      if (k = r === T ? h : T[h], A = r[k], N = j[h], N.scope) {
                        y = D;
                        do
                          y = y.nextSibling;
 while (y && y[s]);
                        l(N) != y && a.move($e(N.clone), null, D), D = f(N), c(N.scope, h, b, A, w, k, x);
                      } else
                        $(function(e, t) {
                          N.scope = t;
                          var n = d.cloneNode(!1);
                          e[e.length++] = n, a.enter(e, null, D), D = n, N.clone = e, P[N.id] = N, c(N.scope, h, b, A, w, k, x);
                        });
                    v = P;
                  });
                };
              }
            };
          }],
          Oa = "ng-hide",
          Ma = "ng-hide-animate",
          Ta = ["$animate", function(e) {
            return {
              restrict: "A",
              multiElement: !0,
              link: function(t, n, r) {
                t.$watch(r.ngShow, function(t) {
                  e[t ? "removeClass" : "addClass"](n, Oa, {tempClasses: Ma});
                });
              }
            };
          }],
          Na = ["$animate", function(e) {
            return {
              restrict: "A",
              multiElement: !0,
              link: function(t, n, r) {
                t.$watch(r.ngHide, function(t) {
                  e[t ? "addClass" : "removeClass"](n, Oa, {tempClasses: Ma});
                });
              }
            };
          }],
          ja = ir(function(e, t, n) {
            e.$watch(n.ngStyle, function(e, n) {
              n && e !== n && o(n, function(e, n) {
                t.css(n, "");
              }), e && t.css(e);
            }, !0);
          }),
          Va = ["$animate", function(e) {
            return {
              require: "ngSwitch",
              controller: ["$scope", function() {
                this.cases = {};
              }],
              link: function(n, r, i, a) {
                var s = i.ngSwitch || i.on,
                    u = [],
                    c = [],
                    l = [],
                    f = [],
                    h = function(e, t) {
                      return function() {
                        e.splice(t, 1);
                      };
                    };
                n.$watch(s, function(n) {
                  var r,
                      i;
                  for (r = 0, i = l.length; i > r; ++r)
                    e.cancel(l[r]);
                  for (l.length = 0, r = 0, i = f.length; i > r; ++r) {
                    var s = $e(c[r].clone);
                    f[r].$destroy();
                    var p = l[r] = e.leave(s);
                    p.then(h(l, r));
                  }
                  c.length = 0, f.length = 0, (u = a.cases["!" + n] || a.cases["?"]) && o(u, function(n) {
                    n.transclude(function(r, i) {
                      f.push(i);
                      var o = n.element;
                      r[r.length++] = t.createComment(" end ngSwitchWhen: ");
                      var a = {clone: r};
                      c.push(a), e.enter(r, o.parent(), o);
                    });
                  });
                });
              }
            };
          }],
          Da = ir({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(e, t, n, r, i) {
              r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
                transclude: i,
                element: t
              });
            }
          }),
          Pa = ir({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(e, t, n, r, i) {
              r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
                transclude: i,
                element: t
              });
            }
          }),
          _a = ir({
            restrict: "EAC",
            link: function(e, t, n, i, o) {
              if (!o)
                throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", K(t));
              o(function(e) {
                t.empty(), t.append(e);
              });
            }
          }),
          Ia = ["$templateCache", function(e) {
            return {
              restrict: "E",
              terminal: !0,
              compile: function(t, n) {
                if ("text/ng-template" == n.type) {
                  var r = n.id,
                      i = t[0].text;
                  e.put(r, i);
                }
              }
            };
          }],
          Ra = {
            $setViewValue: $,
            $render: $
          },
          qa = ["$element", "$scope", "$attrs", function(e, r, i) {
            var o = this,
                a = new Ke;
            o.ngModelCtrl = Ra, o.unknownOption = jr(t.createElement("option")), o.renderUnknownOption = function(t) {
              var n = "? " + Ze(t) + " ?";
              o.unknownOption.val(n), e.prepend(o.unknownOption), e.val(n);
            }, r.$on("$destroy", function() {
              o.renderUnknownOption = $;
            }), o.removeUnknownOption = function() {
              o.unknownOption.parent() && o.unknownOption.remove();
            }, o.readValue = function() {
              return o.removeUnknownOption(), e.val();
            }, o.writeValue = function(t) {
              o.hasOption(t) ? (o.removeUnknownOption(), e.val(t), "" === t && o.emptyOption.prop("selected", !0)) : null == t && o.emptyOption ? (o.removeUnknownOption(), e.val("")) : o.renderUnknownOption(t);
            }, o.addOption = function(e, t) {
              if (t[0].nodeType !== ri) {
                pe(e, '"option value"'), "" === e && (o.emptyOption = t);
                var n = a.get(e) || 0;
                a.put(e, n + 1), o.ngModelCtrl.$render(), Sr(t);
              }
            }, o.removeOption = function(e) {
              var t = a.get(e);
              t && (1 === t ? (a.remove(e), "" === e && (o.emptyOption = n)) : a.put(e, t - 1));
            }, o.hasOption = function(e) {
              return !!a.get(e);
            }, o.registerOption = function(e, t, n, r, i) {
              if (r) {
                var a;
                n.$observe("value", function(e) {
                  b(a) && o.removeOption(a), a = e, o.addOption(e, t);
                });
              } else
                i ? e.$watch(i, function(e, r) {
                  n.$set("value", e), r !== e && o.removeOption(r), o.addOption(e, t);
                }) : o.addOption(n.value, t);
              t.on("$destroy", function() {
                o.removeOption(n.value), o.ngModelCtrl.$render();
              });
            };
          }],
          Ua = function() {
            function e(e, t, n, r) {
              var i = r[1];
              if (i) {
                var a = r[0];
                if (a.ngModelCtrl = i, t.on("change", function() {
                  e.$apply(function() {
                    i.$setViewValue(a.readValue());
                  });
                }), n.multiple) {
                  a.readValue = function() {
                    var e = [];
                    return o(t.find("option"), function(t) {
                      t.selected && e.push(t.value);
                    }), e;
                  }, a.writeValue = function(e) {
                    var n = new Ke(e);
                    o(t.find("option"), function(e) {
                      e.selected = b(n.get(e.value));
                    });
                  };
                  var s,
                      u = NaN;
                  e.$watch(function() {
                    u !== i.$viewValue || B(s, i.$viewValue) || (s = F(i.$viewValue), i.$render()), u = i.$viewValue;
                  }), i.$isEmpty = function(e) {
                    return !e || 0 === e.length;
                  };
                }
              }
            }
            function t(e, t, n, r) {
              var i = r[1];
              if (i) {
                var o = r[0];
                i.$render = function() {
                  o.writeValue(i.$viewValue);
                };
              }
            }
            return {
              restrict: "E",
              require: ["select", "?ngModel"],
              controller: qa,
              priority: 1,
              link: {
                pre: e,
                post: t
              }
            };
          },
          Fa = ["$interpolate", function(e) {
            return {
              restrict: "E",
              priority: 100,
              compile: function(t, n) {
                if (b(n.value))
                  var r = e(n.value, !0);
                else {
                  var i = e(t.text(), !0);
                  i || n.$set("value", t.text());
                }
                return function(e, t, n) {
                  var o = "$selectController",
                      a = t.parent(),
                      s = a.data(o) || a.parent().data(o);
                  s && s.registerOption(e, t, n, r, i);
                };
              }
            };
          }],
          Ba = m({
            restrict: "E",
            terminal: !1
          }),
          Ha = function() {
            return {
              restrict: "A",
              require: "?ngModel",
              link: function(e, t, n, r) {
                r && (n.required = !0, r.$validators.required = function(e, t) {
                  return !n.required || !r.$isEmpty(t);
                }, n.$observe("required", function() {
                  r.$validate();
                }));
              }
            };
          },
          La = function() {
            return {
              restrict: "A",
              require: "?ngModel",
              link: function(e, t, i, o) {
                if (o) {
                  var a,
                      s = i.ngPattern || i.pattern;
                  i.$observe("pattern", function(e) {
                    if (S(e) && e.length > 0 && (e = new RegExp("^" + e + "$")), e && !e.test)
                      throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, e, K(t));
                    a = e || n, o.$validate();
                  }), o.$validators.pattern = function(e, t) {
                    return o.$isEmpty(t) || y(a) || a.test(t);
                  };
                }
              }
            };
          },
          za = function() {
            return {
              restrict: "A",
              require: "?ngModel",
              link: function(e, t, n, r) {
                if (r) {
                  var i = -1;
                  n.$observe("maxlength", function(e) {
                    var t = p(e);
                    i = isNaN(t) ? -1 : t, r.$validate();
                  }), r.$validators.maxlength = function(e, t) {
                    return 0 > i || r.$isEmpty(t) || t.length <= i;
                  };
                }
              }
            };
          },
          Wa = function() {
            return {
              restrict: "A",
              require: "?ngModel",
              link: function(e, t, n, r) {
                if (r) {
                  var i = 0;
                  n.$observe("minlength", function(e) {
                    i = p(e) || 0, r.$validate();
                  }), r.$validators.minlength = function(e, t) {
                    return r.$isEmpty(t) || t.length >= i;
                  };
                }
              }
            };
          };
      return e.angular.bootstrap ? void(e.console && console.log("WARNING: Tried to load angular more than once.")) : (le(), be(Fr), Fr.module("ngLocale", [], ["$provide", function(e) {
        function t(e) {
          e += "";
          var t = e.indexOf(".");
          return -1 == t ? 0 : e.length - t - 1;
        }
        function r(e, r) {
          var i = r;
          n === i && (i = Math.min(t(e), 3));
          var o = Math.pow(10, i),
              a = (e * o | 0) % o;
          return {
            v: i,
            f: a
          };
        }
        var i = {
          ZERO: "zero",
          ONE: "one",
          TWO: "two",
          FEW: "few",
          MANY: "many",
          OTHER: "other"
        };
        e.value("$locale", {
          DATETIME_FORMATS: {
            AMPMS: ["AM", "PM"],
            DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            ERANAMES: ["Before Christ", "Anno Domini"],
            ERAS: ["BC", "AD"],
            FIRSTDAYOFWEEK: 6,
            MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            STANDALONEMONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            WEEKENDRANGE: [5, 6],
            fullDate: "EEEE, MMMM d, y",
            longDate: "MMMM d, y",
            medium: "MMM d, y h:mm:ss a",
            mediumDate: "MMM d, y",
            mediumTime: "h:mm:ss a",
            "short": "M/d/yy h:mm a",
            shortDate: "M/d/yy",
            shortTime: "h:mm a"
          },
          NUMBER_FORMATS: {
            CURRENCY_SYM: "$",
            DECIMAL_SEP: ".",
            GROUP_SEP: ",",
            PATTERNS: [{
              gSize: 3,
              lgSize: 3,
              maxFrac: 3,
              minFrac: 0,
              minInt: 1,
              negPre: "-",
              negSuf: "",
              posPre: "",
              posSuf: ""
            }, {
              gSize: 3,
              lgSize: 3,
              maxFrac: 2,
              minFrac: 2,
              minInt: 1,
              negPre: "-¤",
              negSuf: "",
              posPre: "¤",
              posSuf: ""
            }]
          },
          id: "en-us",
          localeID: "en_US",
          pluralCat: function(e, t) {
            var n = 0 | e,
                o = r(e, t);
            return 1 == n && 0 == o.v ? i.ONE : i.OTHER;
          }
        });
      }]), void jr(t).ready(function() {
        oe(t, ae);
      }));
    }(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
  }, function(e, t, n) {
    n(5), e.exports = "ngRoute";
  }, function(e, t) {
    !function(e, t, n) {
      "use strict";
      function r() {
        function e(e, n) {
          return t.extend(Object.create(e), n);
        }
        function n(e, t) {
          var n = t.caseInsensitiveMatch,
              r = {
                originalPath: e,
                regexp: e
              },
              i = r.keys = [];
          return e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)(\*\?|[\?\*])?/g, function(e, t, n, r) {
            var o = "?" === r || "*?" === r ? "?" : null,
                a = "*" === r || "*?" === r ? "*" : null;
            return i.push({
              name: n,
              optional: !!o
            }), t = t || "", "" + (o ? "" : t) + "(?:" + (o ? t : "") + (a && "(.+?)" || "([^/]+)") + (o || "") + ")" + (o || "");
          }).replace(/([\/$\*])/g, "\\$1"), r.regexp = new RegExp("^" + e + "$", n ? "i" : ""), r;
        }
        var r = {};
        this.when = function(e, i) {
          var o = t.copy(i);
          if (t.isUndefined(o.reloadOnSearch) && (o.reloadOnSearch = !0), t.isUndefined(o.caseInsensitiveMatch) && (o.caseInsensitiveMatch = this.caseInsensitiveMatch), r[e] = t.extend(o, e && n(e, o)), e) {
            var a = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
            r[a] = t.extend({redirectTo: e}, n(a, o));
          }
          return this;
        }, this.caseInsensitiveMatch = !1, this.otherwise = function(e) {
          return "string" == typeof e && (e = {redirectTo: e}), this.when(null, e), this;
        }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(n, i, o, a, s, c, l) {
          function f(e, t) {
            var n = t.keys,
                r = {};
            if (!t.regexp)
              return null;
            var i = t.regexp.exec(e);
            if (!i)
              return null;
            for (var o = 1,
                a = i.length; a > o; ++o) {
              var s = n[o - 1],
                  u = i[o];
              s && u && (r[s.name] = u);
            }
            return r;
          }
          function h(e) {
            var r = y.current;
            v = d(), m = v && r && v.$$route === r.$$route && t.equals(v.pathParams, r.pathParams) && !v.reloadOnSearch && !g, m || !r && !v || n.$broadcast("$routeChangeStart", v, r).defaultPrevented && e && e.preventDefault();
          }
          function p() {
            var e = y.current,
                r = v;
            m ? (e.params = r.params, t.copy(e.params, o), n.$broadcast("$routeUpdate", e)) : (r || e) && (g = !1, y.current = r, r && r.redirectTo && (t.isString(r.redirectTo) ? i.path($(r.redirectTo, r.params)).search(r.params).replace() : i.url(r.redirectTo(r.pathParams, i.path(), i.search())).replace()), a.when(r).then(function() {
              if (r) {
                var e,
                    n,
                    i = t.extend({}, r.resolve);
                return t.forEach(i, function(e, n) {
                  i[n] = t.isString(e) ? s.get(e) : s.invoke(e, null, null, n);
                }), t.isDefined(e = r.template) ? t.isFunction(e) && (e = e(r.params)) : t.isDefined(n = r.templateUrl) && (t.isFunction(n) && (n = n(r.params)), t.isDefined(n) && (r.loadedTemplateUrl = l.valueOf(n), e = c(n))), t.isDefined(e) && (i.$template = e), a.all(i);
              }
            }).then(function(i) {
              r == y.current && (r && (r.locals = i, t.copy(r.params, o)), n.$broadcast("$routeChangeSuccess", r, e));
            }, function(t) {
              r == y.current && n.$broadcast("$routeChangeError", r, e, t);
            }));
          }
          function d() {
            var n,
                o;
            return t.forEach(r, function(r, a) {
              !o && (n = f(i.path(), r)) && (o = e(r, {
                params: t.extend({}, i.search(), n),
                pathParams: n
              }), o.$$route = r);
            }), o || r[null] && e(r[null], {
              params: {},
              pathParams: {}
            });
          }
          function $(e, n) {
            var r = [];
            return t.forEach((e || "").split(":"), function(e, t) {
              if (0 === t)
                r.push(e);
              else {
                var i = e.match(/(\w+)(?:[?*])?(.*)/),
                    o = i[1];
                r.push(n[o]), r.push(i[2] || ""), delete n[o];
              }
            }), r.join("");
          }
          var v,
              m,
              g = !1,
              y = {
                routes: r,
                reload: function() {
                  g = !0;
                  var e = {
                    defaultPrevented: !1,
                    preventDefault: function() {
                      this.defaultPrevented = !0, g = !1;
                    }
                  };
                  n.$evalAsync(function() {
                    h(e), e.defaultPrevented || p();
                  });
                },
                updateParams: function(e) {
                  if (!this.current || !this.current.$$route)
                    throw u("norout", "Tried updating route when with no current route");
                  e = t.extend({}, this.current.params, e), i.path($(this.current.$$route.originalPath, e)), i.search(e);
                }
              };
          return n.$on("$locationChangeStart", h), n.$on("$locationChangeSuccess", p), y;
        }];
      }
      function i() {
        this.$get = function() {
          return {};
        };
      }
      function o(e, n, r) {
        return {
          restrict: "ECA",
          terminal: !0,
          priority: 400,
          transclude: "element",
          link: function(i, o, a, s, u) {
            function c() {
              p && (r.cancel(p), p = null), f && (f.$destroy(), f = null), h && (p = r.leave(h), p.then(function() {
                p = null;
              }), h = null);
            }
            function l() {
              var a = e.current && e.current.locals,
                  s = a && a.$template;
              if (t.isDefined(s)) {
                var l = i.$new(),
                    p = e.current,
                    v = u(l, function(e) {
                      r.enter(e, null, h || o).then(function() {
                        !t.isDefined(d) || d && !i.$eval(d) || n();
                      }), c();
                    });
                h = v, f = p.scope = l, f.$emit("$viewContentLoaded"), f.$eval($);
              } else
                c();
            }
            var f,
                h,
                p,
                d = a.autoscroll,
                $ = a.onload || "";
            i.$on("$routeChangeSuccess", l), l();
          }
        };
      }
      function a(e, t, n) {
        return {
          restrict: "ECA",
          priority: -400,
          link: function(r, i) {
            var o = n.current,
                a = o.locals;
            i.html(a.$template);
            var s = e(i.contents());
            if (o.controller) {
              a.$scope = r;
              var u = t(o.controller, a);
              o.controllerAs && (r[o.controllerAs] = u), i.data("$ngControllerController", u), i.children().data("$ngControllerController", u);
            }
            s(r);
          }
        };
      }
      var s = t.module("ngRoute", ["ng"]).provider("$route", r),
          u = t.$$minErr("ngRoute");
      s.provider("$routeParams", i), s.directive("ngView", o), s.directive("ngView", a), o.$inject = ["$route", "$anchorScroll", "$animate"], a.$inject = ["$compile", "$controller", "$route"];
    }(window, window.angular);
  }, function(e, t, n) {
    n(7), e.exports = "ngSanitize";
  }, function(e, t) {
    !function(e, t, n) {
      "use strict";
      function r() {
        this.$get = ["$$sanitizeUri", function(e) {
          return function(t) {
            var n = [];
            return a(t, c(n, function(t, n) {
              return !/^unsafe/.test(e(t, n));
            })), n.join("");
          };
        }];
      }
      function i(e) {
        var n = [],
            r = c(n, t.noop);
        return r.chars(e), n.join("");
      }
      function o(e, n) {
        var r,
            i = {},
            o = e.split(",");
        for (r = 0; r < o.length; r++)
          i[n ? t.lowercase(o[r]) : o[r]] = !0;
        return i;
      }
      function a(e, n) {
        function r(e, r, o, a) {
          if (r = t.lowercase(r), C[r])
            for (; y.last() && k[y.last()]; )
              i("", y.last());
          E[r] && y.last() == r && i("", r), a = w[r] || !!a, a || y.push(r);
          var u = {};
          o.replace(p, function(e, t, n, r, i) {
            var o = n || r || i || "";
            u[t] = s(o);
          }), n.start && n.start(r, u, a);
        }
        function i(e, r) {
          var i,
              o = 0;
          if (r = t.lowercase(r))
            for (o = y.length - 1; o >= 0 && y[o] != r; o--)
              ;
          if (o >= 0) {
            for (i = y.length - 1; i >= o; i--)
              n.end && n.end(y[i]);
            y.length = o;
          }
        }
        "string" != typeof e && (e = null === e || "undefined" == typeof e ? "" : "" + e);
        var o,
            a,
            u,
            c,
            y = [],
            b = e;
        for (y.last = function() {
          return y[y.length - 1];
        }; e; ) {
          if (c = "", a = !0, y.last() && O[y.last()] ? (e = e.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + y.last() + "[^>]*>", "i"), function(e, t) {
            return t = t.replace(v, "$1").replace(g, "$1"), n.chars && n.chars(s(t)), "";
          }), i("", y.last())) : (0 === e.indexOf("<!--") ? (o = e.indexOf("--", 4), o >= 0 && e.lastIndexOf("-->", o) === o && (n.comment && n.comment(e.substring(4, o)), e = e.substring(o + 3), a = !1)) : m.test(e) ? (u = e.match(m), u && (e = e.replace(u[0], ""), a = !1)) : $.test(e) ? (u = e.match(h), u && (e = e.substring(u[0].length), u[0].replace(h, i), a = !1)) : d.test(e) && (u = e.match(f), u ? (u[4] && (e = e.substring(u[0].length), u[0].replace(f, r)), a = !1) : (c += "<", e = e.substring(1))), a && (o = e.indexOf("<"), c += 0 > o ? e : e.substring(0, o), e = 0 > o ? "" : e.substring(o), n.chars && n.chars(s(c)))), e == b)
            throw l("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
          b = e;
        }
        i();
      }
      function s(e) {
        return e ? (D.innerHTML = e.replace(/</g, "&lt;"), D.textContent) : "";
      }
      function u(e) {
        return e.replace(/&/g, "&amp;").replace(y, function(e) {
          var t = e.charCodeAt(0),
              n = e.charCodeAt(1);
          return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";";
        }).replace(b, function(e) {
          return "&#" + e.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      function c(e, n) {
        var r = !1,
            i = t.bind(e, e.push);
        return {
          start: function(e, o, a) {
            e = t.lowercase(e), !r && O[e] && (r = e), r || M[e] !== !0 || (i("<"), i(e), t.forEach(o, function(r, o) {
              var a = t.lowercase(o),
                  s = "img" === e && "src" === a || "background" === a;
              V[a] !== !0 || T[a] === !0 && !n(r, s) || (i(" "), i(o), i('="'), i(u(r)), i('"'));
            }), i(a ? "/>" : ">"));
          },
          end: function(e) {
            e = t.lowercase(e), r || M[e] !== !0 || (i("</"), i(e), i(">")), e == r && (r = !1);
          },
          chars: function(e) {
            r || i(u(e));
          }
        };
      }
      var l = t.$$minErr("$sanitize"),
          f = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
          h = /^<\/\s*([\w:-]+)[^>]*>/,
          p = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
          d = /^</,
          $ = /^<\//,
          v = /<!--(.*?)-->/g,
          m = /<!DOCTYPE([^>]*?)>/i,
          g = /<!\[CDATA\[(.*?)]]>/g,
          y = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
          b = /([^\#-~| |!])/g,
          w = o("area,br,col,hr,img,wbr"),
          x = o("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
          S = o("rp,rt"),
          E = t.extend({}, S, x),
          C = t.extend({}, x, o("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
          k = t.extend({}, S, o("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
          A = o("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"),
          O = o("script,style"),
          M = t.extend({}, w, C, k, E, A),
          T = o("background,cite,href,longdesc,src,usemap,xlink:href"),
          N = o("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
          j = o("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0),
          V = t.extend({}, T, j, N),
          D = document.createElement("pre");
      t.module("ngSanitize", []).provider("$sanitize", r), t.module("ngSanitize").filter("linky", ["$sanitize", function(e) {
        var n = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
            r = /^mailto:/i;
        return function(o, a) {
          function s(e) {
            e && p.push(i(e));
          }
          function u(e, n) {
            p.push("<a "), t.isDefined(a) && p.push('target="', a, '" '), p.push('href="', e.replace(/"/g, "&quot;"), '">'), s(n), p.push("</a>");
          }
          if (!o)
            return o;
          for (var c,
              l,
              f,
              h = o,
              p = []; c = h.match(n); )
            l = c[0], c[2] || c[4] || (l = (c[3] ? "http://" : "mailto:") + l), f = c.index, s(h.substr(0, f)), u(l, c[0].replace(r, "")), h = h.substring(f + c[0].length);
          return s(h), e(p.join(""));
        };
      }]);
    }(window, window.angular);
  }, function(e, t, n) {
    n(9), e.exports = "ngTouch";
  }, function(e, t) {
    !function(e, t, n) {
      "use strict";
      function r(e) {
        return t.lowercase(e.nodeName || e[0] && e[0].nodeName);
      }
      function i(e, n, r) {
        o.directive(e, ["$parse", "$swipe", function(i, o) {
          var a = 75,
              s = .3,
              u = 30;
          return function(c, l, f) {
            function h(e) {
              if (!p)
                return !1;
              var t = Math.abs(e.y - p.y),
                  r = (e.x - p.x) * n;
              return d && a > t && r > 0 && r > u && s > t / r;
            }
            var p,
                d,
                $ = i(f[e]),
                v = ["touch"];
            t.isDefined(f.ngSwipeDisableMouse) || v.push("mouse"), o.bind(l, {
              start: function(e, t) {
                p = e, d = !0;
              },
              cancel: function(e) {
                d = !1;
              },
              end: function(e, t) {
                h(e) && c.$apply(function() {
                  l.triggerHandler(r), $(c, {$event: t});
                });
              }
            }, v);
          };
        }]);
      }
      var o = t.module("ngTouch", []);
      o.factory("$swipe", [function() {
        function e(e) {
          var t = e.originalEvent || e,
              n = t.touches && t.touches.length ? t.touches : [t],
              r = t.changedTouches && t.changedTouches[0] || n[0];
          return {
            x: r.clientX,
            y: r.clientY
          };
        }
        function n(e, n) {
          var r = [];
          return t.forEach(e, function(e) {
            var t = i[e][n];
            t && r.push(t);
          }), r.join(" ");
        }
        var r = 10,
            i = {
              mouse: {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
              },
              touch: {
                start: "touchstart",
                move: "touchmove",
                end: "touchend",
                cancel: "touchcancel"
              }
            };
        return {bind: function(t, i, o) {
            var a,
                s,
                u,
                c,
                l = !1;
            o = o || ["mouse", "touch"], t.on(n(o, "start"), function(t) {
              u = e(t), l = !0, a = 0, s = 0, c = u, i.start && i.start(u, t);
            });
            var f = n(o, "cancel");
            f && t.on(f, function(e) {
              l = !1, i.cancel && i.cancel(e);
            }), t.on(n(o, "move"), function(t) {
              if (l && u) {
                var n = e(t);
                if (a += Math.abs(n.x - c.x), s += Math.abs(n.y - c.y), c = n, !(r > a && r > s))
                  return s > a ? (l = !1, void(i.cancel && i.cancel(t))) : (t.preventDefault(), void(i.move && i.move(n, t)));
              }
            }), t.on(n(o, "end"), function(t) {
              l && (l = !1, i.end && i.end(e(t), t));
            });
          }};
      }]), o.config(["$provide", function(e) {
        e.decorator("ngClickDirective", ["$delegate", function(e) {
          return e.shift(), e;
        }]);
      }]), o.directive("ngClick", ["$parse", "$timeout", "$rootElement", function(e, n, i) {
        function o(e, t, n, r) {
          return Math.abs(e - n) < v && Math.abs(t - r) < v;
        }
        function a(e, t, n) {
          for (var r = 0; r < e.length; r += 2)
            if (o(e[r], e[r + 1], t, n))
              return e.splice(r, r + 2), !0;
          return !1;
        }
        function s(e) {
          if (!(Date.now() - l > $)) {
            var t = e.touches && e.touches.length ? e.touches : [e],
                n = t[0].clientX,
                i = t[0].clientY;
            1 > n && 1 > i || h && h[0] === n && h[1] === i || (h && (h = null), "label" === r(e.target) && (h = [n, i]), a(f, n, i) || (e.stopPropagation(), e.preventDefault(), e.target && e.target.blur && e.target.blur()));
          }
        }
        function u(e) {
          var t = e.touches && e.touches.length ? e.touches : [e],
              r = t[0].clientX,
              i = t[0].clientY;
          f.push(r, i), n(function() {
            for (var e = 0; e < f.length; e += 2)
              if (f[e] == r && f[e + 1] == i)
                return void f.splice(e, e + 2);
          }, $, !1);
        }
        function c(e, t) {
          f || (i[0].addEventListener("click", s, !0), i[0].addEventListener("touchstart", u, !0), f = []), l = Date.now(), a(f, e, t);
        }
        var l,
            f,
            h,
            p = 750,
            d = 12,
            $ = 2500,
            v = 25,
            m = "ng-click-active";
        return function(n, r, i) {
          function o() {
            h = !1, r.removeClass(m);
          }
          var a,
              s,
              u,
              l,
              f = e(i.ngClick),
              h = !1;
          r.on("touchstart", function(e) {
            h = !0, a = e.target ? e.target : e.srcElement, 3 == a.nodeType && (a = a.parentNode), r.addClass(m), s = Date.now();
            var t = e.originalEvent || e,
                n = t.touches && t.touches.length ? t.touches : [t],
                i = n[0];
            u = i.clientX, l = i.clientY;
          }), r.on("touchcancel", function(e) {
            o();
          }), r.on("touchend", function(e) {
            var n = Date.now() - s,
                f = e.originalEvent || e,
                $ = f.changedTouches && f.changedTouches.length ? f.changedTouches : f.touches && f.touches.length ? f.touches : [f],
                v = $[0],
                m = v.clientX,
                g = v.clientY,
                y = Math.sqrt(Math.pow(m - u, 2) + Math.pow(g - l, 2));
            h && p > n && d > y && (c(m, g), a && a.blur(), t.isDefined(i.disabled) && i.disabled !== !1 || r.triggerHandler("click", [e])), o();
          }), r.onclick = function(e) {}, r.on("click", function(e, t) {
            n.$apply(function() {
              f(n, {$event: t || e});
            });
          }), r.on("mousedown", function(e) {
            r.addClass(m);
          }), r.on("mousemove mouseup", function(e) {
            r.removeClass(m);
          });
        };
      }]), i("ngSwipeLeft", -1, "swipeleft"), i("ngSwipeRight", 1, "swiperight");
    }(window, window.angular);
  }, function(e, t) {
    !function() {
      function e(e, t, n) {
        const r = "Browsersync",
            i = "Disconnected";
        e._disconnected = !1, e.ui = {
          visible: !1,
          heading: r,
          message: i
        }, e.socketEvents = {
          connection: function() {
            e._disconnected && n.location.reload(!0), e.ui.visible = !1, e.$digest();
          },
          disconnect: function() {
            e._disconnected = !0, e.ui.visible = !0, e.$digest();
          }
        }, t.$on("ui:connection", e.socketEvents.connection), t.$on("ui:disconnect", e.socketEvents.disconnect);
      }
      angular.module("bsDisconnect", []).directive("disconnectElem", function() {
        return {
          restrict: "E",
          scope: {},
          template: '<section bs-overlay ng-class="{\'active\': ui.visible}">\n    <p><icon icon="block"></icon></p>\n    <h1>{{ui.heading}} {{ui.message}}</h1>\n    <p>Possible reasons are:</p>\n    <ul bs-list>\n        <li>1. Your process was exited by another tool</li>\n    </ul>\n    <p>You should check your terminal window to see what happened. <br/>(Or simply try reloading this page.)</p>\n</section>',
          controller: ["$scope", "$rootScope", "$window", e]
        };
      });
    }(angular);
  }, function(e, t) {
    !function(e) {
      function t(e, t) {
        var n = "info",
            r = "Browsersync:",
            i = "Welcome to Browsersync",
            o = 2e3;
        e.ui = {
          status: n,
          heading: r,
          message: i
        }, e.show = function(t, i) {
          i = i || {}, e._timer && clearTimeout(e._timer), e._timer = window.setTimeout(e.reset, i.timeout || o), e.ui.visible = !0, e.ui.status = i.status || n, e.ui.heading = i.heading || r, e.ui.message = i.message || r;
        }, e.reset = function() {
          e.ui.visible = !1, e.$digest();
        }, t.$on("notify:flash", e.show);
      }
      e.module("bsNotify", []).directive("notifyElem", function() {
        return {
          restrict: "E",
          scope: {},
          template: '<div bs-notify ng-class="{\'active\': ui.visible}">\n    <p class="notification__text">{{ui.heading}} <span class="color--lime">{{ui.message}}</span></p>\n</div>',
          controller: ["$scope", "$rootScope", t]
        };
      });
    }(angular);
  }, function(e, t) {
    !function(e) {
      function t(e) {
        var t = [],
            n = [];
        return e.on("ui:history:update", function(e) {
          n.forEach(function(t) {
            t(e);
          });
        }), {
          visited: t,
          updateHistory: function(e) {
            t = e;
          },
          get: function() {
            return e.getData("visited");
          },
          remove: function(t) {
            e.emit("ui", {
              namespace: "history",
              event: "remove",
              data: t
            });
          },
          clear: function() {
            e.emit("ui", {
              namespace: "history",
              event: "clear"
            });
          },
          on: function(e, t) {
            n.push(t);
          },
          off: function(e) {
            var t = n.indexOf(e);
            t > -1 && (n = n.splice(t, 1));
          }
        };
      }
      e.module("bsHistory", ["bsSocket"]).service("History", ["Socket", t]);
    }(angular);
  }, function(e, t) {
    !function(e) {
      function t(e) {
        var t = {
          reloadAll: function() {
            e.clientEvent("browser:reload");
          },
          sendAllTo: function(t) {
            e.emit("ui", {
              namespace: "history",
              event: "sendAllTo",
              data: {path: t}
            });
          },
          scrollAllTo: function() {
            e.clientEvent("scroll", {
              position: {
                raw: 0,
                proportional: 0
              },
              override: !0
            });
          },
          highlight: function(t) {
            e.emit("ui:highlight", t);
          }
        };
        return t;
      }
      e.module("bsClients", ["bsSocket"]).service("Clients", ["Socket", t]);
    }(angular);
  }, function(e, t) {
    !function(e, t) {
      function n(e, t) {
        var n,
            i = e.defer();
        r.on("connection", function(e) {
          if (n = e.session, t.$emit("ui:connection", e), i.resolve(e, this), "" === window.name)
            window.name = JSON.stringify({id: r.id});
          else {
            var o = JSON.parse(window.name);
            o.id !== r.id;
          }
        }), r.on("disconnect", function() {
          t.$emit("ui:disconnect");
        });
        var o = {
          on: function(e, t) {
            r.on(e, t);
          },
          off: function(e, t) {
            r.off(e, t);
          },
          removeEvent: function(e, t) {
            r.removeListener(e, t);
          },
          emit: function(e, t) {
            r.emit(e, t || {});
          },
          clientEvent: function(e, t) {
            r.emit("ui:client:proxy", {
              event: e,
              data: t
            });
          },
          options: function() {
            return i.promise;
          },
          getData: function(t) {
            var n = e.defer();
            return r.on("ui:receive:" + t, function(e) {
              n.resolve(e);
            }), r.emit("ui:get:" + t), n.promise;
          },
          uiEvent: function(e) {
            r.emit("ui", e);
          },
          newSession: function() {}
        };
        return Object.defineProperty(o, "sessionId", {get: function() {
            return n;
          }}), o;
      }
      var r = t || {
        emit: function() {},
        on: function() {},
        removeListener: function() {}
      };
      e.module("bsSocket", []).service("Socket", ["$q", "$rootScope", n]);
    }(angular, window.___browserSync___.socket);
  }, function(e, t, n) {
    function r(e, t) {
      return {
        enable: function(t) {
          return angular.forEach(e, function(e) {
            e.active = !1;
          }), t.active = !0, e;
        },
        transform: function(e, t) {
          if ("function" == typeof t)
            return e = t(e);
          throw new TypeError("Noooo");
        },
        current: function() {
          if ("/" === t.path())
            return e.overview;
          var n;
          return angular.forEach(e, function(e) {
            e.path === t.path() && (n = e);
          }), n;
        }
      };
    }
    var i = n(16);
    i.service("Pages", ["pagesConfig", "$location", r]);
  }, function(e, t) {
    e.exports = window.angular.module("BrowserSync");
  }, function(e, t, n) {
    function r(e) {
      return {all: function() {
          return e.getData("options");
        }};
    }
    var i = n(16);
    i.factory("Options", ["Socket", r]);
  }, function(e, t, n) {
    function r(e) {
      var t = a.get("bs", {});
      Object.keys(t).length || a.set("bs", {}), this.ns = e, this.get = function(t) {
        var n = a.get("bs", {});
        return Object.keys(n).length || a.set("bs", {}), s.get(n, [e].concat(t).join("."));
      }, this.set = function(t, n) {
        var r = a.get("bs", {});
        Object.keys(r).length || a.set("bs", {}), r[e] || (r[e] = {}), r[e][t] = n, a.set("bs", r);
      }, this.remove = function(t) {
        var n = a.get("bs", {});
        Object.keys(n).length || a.set("bs", {}), n[e] || (n[e] = {}), n[e][t] && delete n[e][t], a.set("bs", n);
      };
    }
    function i() {
      return {create: function(e) {
          var t = new r(e);
          return t;
        }};
    }
    var o = n(19),
        a = n(20),
        s = n(21);
    o.module("bsStore", []).service("Store", ["$q", "$rootScope", i]);
  }, function(e, t) {
    e.exports = window.angular;
  }, function(e, t, n) {
    var r,
        i,
        o;
    (function(n) {
      "use strict";
      !function(n, a) {
        i = [], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o));
      }(this, function() {
        function e() {
          try {
            return a in i && i[a];
          } catch (e) {
            return !1;
          }
        }
        var t,
            r = {},
            i = "undefined" != typeof window ? window : n,
            o = i.document,
            a = "localStorage",
            s = "script";
        if (r.disabled = !1, r.version = "1.3.20", r.set = function(e, t) {}, r.get = function(e, t) {}, r.has = function(e) {
          return void 0 !== r.get(e);
        }, r.remove = function(e) {}, r.clear = function() {}, r.transact = function(e, t, n) {
          null == n && (n = t, t = null), null == t && (t = {});
          var i = r.get(e, t);
          n(i), r.set(e, i);
        }, r.getAll = function() {}, r.forEach = function() {}, r.serialize = function(e) {
          return JSON.stringify(e);
        }, r.deserialize = function(e) {
          if ("string" == typeof e)
            try {
              return JSON.parse(e);
            } catch (t) {
              return e || void 0;
            }
        }, e())
          t = i[a], r.set = function(e, n) {
            return void 0 === n ? r.remove(e) : (t.setItem(e, r.serialize(n)), n);
          }, r.get = function(e, n) {
            var i = r.deserialize(t.getItem(e));
            return void 0 === i ? n : i;
          }, r.remove = function(e) {
            t.removeItem(e);
          }, r.clear = function() {
            t.clear();
          }, r.getAll = function() {
            var e = {};
            return r.forEach(function(t, n) {
              e[t] = n;
            }), e;
          }, r.forEach = function(e) {
            for (var n = 0; n < t.length; n++) {
              var i = t.key(n);
              e(i, r.get(i));
            }
          };
        else if (o && o.documentElement.addBehavior) {
          var u,
              c;
          try {
            c = new ActiveXObject("htmlfile"), c.open(), c.write("<" + s + ">document.w=window</" + s + '><iframe src="/favicon.ico"></iframe>'), c.close(), u = c.w.frames[0].document, t = u.createElement("div");
          } catch (l) {
            t = o.createElement("div"), u = o.body;
          }
          var f = function(e) {
            return function() {
              var n = Array.prototype.slice.call(arguments, 0);
              n.unshift(t), u.appendChild(t), t.addBehavior("#default#userData"), t.load(a);
              var i = e.apply(r, n);
              return u.removeChild(t), i;
            };
          },
              h = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
              p = function(e) {
                return e.replace(/^d/, "___$&").replace(h, "___");
              };
          r.set = f(function(e, t, n) {
            return t = p(t), void 0 === n ? r.remove(t) : (e.setAttribute(t, r.serialize(n)), e.save(a), n);
          }), r.get = f(function(e, t, n) {
            t = p(t);
            var i = r.deserialize(e.getAttribute(t));
            return void 0 === i ? n : i;
          }), r.remove = f(function(e, t) {
            t = p(t), e.removeAttribute(t), e.save(a);
          }), r.clear = f(function(e) {
            var t = e.XMLDocument.documentElement.attributes;
            e.load(a);
            for (var n = t.length - 1; n >= 0; n--)
              e.removeAttribute(t[n].name);
            e.save(a);
          }), r.getAll = function(e) {
            var t = {};
            return r.forEach(function(e, n) {
              t[e] = n;
            }), t;
          }, r.forEach = f(function(e, t) {
            for (var n,
                i = e.XMLDocument.documentElement.attributes,
                o = 0; n = i[o]; ++o)
              t(n.name, r.deserialize(e.getAttribute(n.name)));
          });
        }
        try {
          var d = "__storejs__";
          r.set(d, d), r.get(d) != d && (r.disabled = !0), r.remove(d);
        } catch (l) {
          r.disabled = !0;
        }
        return r.enabled = !r.disabled, r;
      });
    }).call(t, function() {
      return this;
    }());
  }, function(e, t, n) {
    var r,
        i,
        o;
    !function(n, a) {
      "use strict";
      "object" == typeof e && "object" == typeof e.exports ? e.exports = a() : (i = [], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o)));
    }(this, function() {
      "use strict";
      function e(e) {
        if (!e)
          return !0;
        if (o(e) && 0 === e.length)
          return !0;
        if (!r(e)) {
          for (var t in e)
            if (f.call(e, t))
              return !1;
          return !0;
        }
        return !1;
      }
      function t(e) {
        return l.call(e);
      }
      function n(e) {
        return "number" == typeof e || "[object Number]" === t(e);
      }
      function r(e) {
        return "string" == typeof e || "[object String]" === t(e);
      }
      function i(e) {
        return "object" == typeof e && "[object Object]" === t(e);
      }
      function o(e) {
        return "object" == typeof e && "number" == typeof e.length && "[object Array]" === t(e);
      }
      function a(e) {
        return "boolean" == typeof e || "[object Boolean]" === t(e);
      }
      function s(e) {
        var t = parseInt(e);
        return t.toString() === e ? t : e;
      }
      function u(t, i, o, a) {
        if (n(i) && (i = [i]), e(i))
          return t;
        if (r(i))
          return u(t, i.split(".").map(s), o, a);
        var c = i[0];
        if (1 === i.length) {
          var l = t[c];
          return void 0 !== l && a || (t[c] = o), l;
        }
        return void 0 === t[c] && (n(i[1]) ? t[c] = [] : t[c] = {}), u(t[c], i.slice(1), o, a);
      }
      function c(t, i) {
        if (n(i) && (i = [i]), !e(t)) {
          if (e(i))
            return t;
          if (r(i))
            return c(t, i.split("."));
          var a = s(i[0]),
              u = t[a];
          if (1 === i.length)
            void 0 !== u && (o(t) ? t.splice(a, 1) : delete t[a]);
          else if (void 0 !== t[a])
            return c(t[a], i.slice(1));
          return t;
        }
      }
      var l = Object.prototype.toString,
          f = Object.prototype.hasOwnProperty,
          h = function(e) {
            return Object.keys(h).reduce(function(t, n) {
              return "function" == typeof h[n] && (t[n] = h[n].bind(h, e)), t;
            }, {});
          };
      return h.has = function(t, a) {
        if (e(t))
          return !1;
        if (n(a) ? a = [a] : r(a) && (a = a.split(".")), e(a) || 0 === a.length)
          return !1;
        for (var s = 0; s < a.length; s++) {
          var u = a[s];
          if (!i(t) && !o(t) || !f.call(t, u))
            return !1;
          t = t[u];
        }
        return !0;
      }, h.ensureExists = function(e, t, n) {
        return u(e, t, n, !0);
      }, h.set = function(e, t, n, r) {
        return u(e, t, n, r);
      }, h.insert = function(e, t, n, r) {
        var i = h.get(e, t);
        r = ~~r, o(i) || (i = [], h.set(e, t, i)), i.splice(r, 0, n);
      }, h.empty = function(t, s) {
        if (e(s))
          return t;
        if (!e(t)) {
          var u,
              c;
          if (!(u = h.get(t, s)))
            return t;
          if (r(u))
            return h.set(t, s, "");
          if (a(u))
            return h.set(t, s, !1);
          if (n(u))
            return h.set(t, s, 0);
          if (o(u))
            u.length = 0;
          else {
            if (!i(u))
              return h.set(t, s, null);
            for (c in u)
              f.call(u, c) && delete u[c];
          }
        }
      }, h.push = function(e, t) {
        var n = h.get(e, t);
        o(n) || (n = [], h.set(e, t, n)), n.push.apply(n, Array.prototype.slice.call(arguments, 2));
      }, h.coalesce = function(e, t, n) {
        for (var r,
            i = 0,
            o = t.length; o > i; i++)
          if (void 0 !== (r = h.get(e, t[i])))
            return r;
        return n;
      }, h.get = function(t, i, o) {
        if (n(i) && (i = [i]), e(i))
          return t;
        if (e(t))
          return o;
        if (r(i))
          return h.get(t, i.split("."), o);
        var a = s(i[0]);
        return 1 === i.length ? void 0 === t[a] ? o : t[a] : h.get(t[a], i.slice(1), o);
      }, h.del = function(e, t) {
        return c(e, t);
      }, h;
    });
  }, function(e, t, n) {
    function r(e, t, n, r) {
      var o = this;
      o.options = !1, o.browsers = [], o.socketId = "";
      var a = r.get("pagesConfig"),
          s = r.get("Pages"),
          u = r.get("Socket"),
          c = r.get("Clients");
      o.ui = {
        menu: a,
        sectionMenu: !1,
        disconnected: !1
      }, o.setActiveSection = function(e) {
        s.enable(e), n.path(e.path), o.ui.sectionMenu = !1;
      }, o.reloadAll = function() {
        c.reloadAll(), t.$emit("notify:flash", {
          heading: "Instruction sent:",
          message: "Reload All Browsers  ✔"
        });
      }, o.scrollAllTo = function() {
        c.scrollAllTo(0), t.$emit("notify:flash", {
          heading: "Instruction sent:",
          message: "Scroll all browsers to Y=0  ✔"
        });
      }, o.sendAllTo = function(e) {
        c.sendAllTo(e), t.$emit("notify:flash", {
          heading: "Instruction sent:",
          message: "Reset all Browsers to /"
        });
      }, o.toggleMenu = function() {
        o.ui.sectionMenu = !o.ui.sectionMenu;
      }, o.socketEvents = {
        connection: function(e) {
          o.update(e);
        },
        disconnect: function() {
          o.ui.disconnected = !0;
        }
      }, o.update = function(e) {
        o.options = i(e), o.ui.disconnected = !1, s.transform(a.overview, function(e) {
          return e;
        });
      }, o.setActiveSection(s.current()), u.options().then(o.socketEvents.connection), t.$on("ui:disconnect", o.socketEvents.disconnect), t.$on("ui:connection", function(t, n) {
        o.socketEvents.connection(n), e.$digest();
      });
    }
    function i(e) {
      return e.displayUrl = o(e.urls), e;
    }
    function o(e) {
      return e ? e.external || e.local : !1;
    }
    var a = n(16);
    a.controller("MainController", ["$scope", "$rootScope", "$location", "$injector", r]);
  }, function(e, t, n) {
    var e = n(16),
        r = n(24);
    e.filter("ucfirst", function() {
      return r.ucfirst;
    }).filter("localRootUrl", function() {
      return r.localRootUrl;
    }).filter("localUrl", function() {
      return r.localRootUrl;
    }).filter("orderObjectBy", function() {
      return r.orderObjectBy;
    });
  }, function(e, t) {
    e.exports = {
      ucfirst: function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      },
      localRootUrl: function(e, t) {
        return [t, "://", window.location.hostname, ":", e].join("");
      },
      localUrl: function(e, t, n) {
        return "snippet" === n ? e : ["//", window.location.hostname, ":", t, e].join("");
      },
      orderObjectBy: function(e, t, n) {
        var r = [];
        return Object.keys(e).forEach(function(t) {
          r.push(e[t]);
        }), r.sort(function(e, n) {
          return e[t] > n[t] ? 1 : -1;
        }), n && r.reverse(), r;
      }
    };
  }, function(e, t, n) {
    var e = n(16);
    e.directive("icon", n(26)), e.directive("linkTo", n(27)), e.directive("switch", n(28)), e.directive("newTab", n(29));
  }, function(e, t) {
    e.exports = function() {
      return {
        scope: {icon: "@"},
        restrict: "E",
        replace: !0,
        template: '<svg bs-svg-icon><use xlink:href="{{iconName}}"></use></svg>',
        link: function(e, t, n) {
          return e.iconName = "#svg-" + e.icon, e;
        }
      };
    };
  }, function(e, t) {
    e.exports = function() {
      return {
        restrict: "E",
        replace: !1,
        transclude: !0,
        scope: {path: "@"},
        template: "<a href='#' ng-click='navi(path)' ng-transclude=''>as</a>",
        controller: ["$scope", "$location", "$injector", function(e, t, n) {
          var r = n.get("pagesConfig"),
              i = n.get("Pages");
          e.navi = function(e) {
            var n = r[e];
            i.enable(n), t.path(e);
          };
        }]
      };
    };
  }, function(e, t) {
    e.exports = function() {
      return {
        scope: {
          toggle: "&",
          item: "=",
          switchid: "@",
          title: "@",
          tagline: "@",
          active: "=",
          prop: "@"
        },
        restrict: "E",
        replace: !0,
        transclude: !0,
        templateUrl: "bs-switch.html",
        controllerAs: "ctrl",
        controller: ["$scope", function(e) {
          var t = this;
          t.item = e.item;
        }]
      };
    };
  }, function(e, t) {
    e.exports = function() {
      return {
        scope: {
          url: "@",
          mode: "@"
        },
        restrict: "E",
        replace: !0,
        template: '<a href="{{url}}" bs-button="subtle-alt icon" target="_blank" title="Open a new tab" ng-show="mode !== \'snippet\'"><icon icon="newtab"></icon> New Tab </a>'
      };
    };
  }]);
})(require('process'));
