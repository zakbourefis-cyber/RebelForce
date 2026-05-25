/*! iFrame Resizer (iframeSizer.min.js ) - v4.3.9 - 2023-11-10
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2023 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */
!(function (e) {
  var n, i, t, o, r, a, s, d, c, f, u, l, m;
  function g() {
    return (
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    );
  }
  function h(e, n, i) {
    e.addEventListener(n, i, !1);
  }
  function p(e, n, i) {
    e.removeEventListener(n, i, !1);
  }
  function w(e) {
    return f[e] ? f[e].log : i;
  }
  function b(e, n) {
    x("log", e, n, w(e));
  }
  function y(e, n) {
    x("info", e, n, w(e));
  }
  function v(e, n) {
    x("warn", e, n, !0);
  }
  function x(e, n, i, t) {
    !0 === t && window.console;
  }
  function z(e) {
    function n() {
      i("Height"),
        i("Width"),
        N(
          function () {
            T(j), O(H), x("onResized", j);
          },
          j,
          "init"
        );
    }
    function i(e) {
      var n = Number(f[H]["max" + e]),
        i = Number(f[H]["min" + e]),
        t = ((e = e.toLowerCase()), Number(j[e]));
      b(H, "Checking " + e + " is in range " + i + "-" + n),
        t < i && ((t = i), b(H, "Set " + e + " to min value")),
        n < t && ((t = n), b(H, "Set " + e + " to max value")),
        (j[e] = "" + t);
    }
    function t(e) {
      return S.slice(S.indexOf(":") + o + e);
    }
    function d(e, n) {
      var i, t;
      (i = function () {
        var i, t;
        W(
          "Send Page Info",
          "pageInfo:" +
            ((i = document.body.getBoundingClientRect()),
            (t = j.iframe.getBoundingClientRect()),
            JSON.stringify({
              iframeHeight: t.height,
              iframeWidth: t.width,
              clientHeight: Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
              ),
              clientWidth: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
              ),
              offsetTop: parseInt(t.top - i.top, 10),
              offsetLeft: parseInt(t.left - i.left, 10),
              scrollTop: window.pageYOffset,
              scrollLeft: window.pageXOffset,
              documentHeight: document.documentElement.clientHeight,
              documentWidth: document.documentElement.clientWidth,
              windowHeight: window.innerHeight,
              windowWidth: window.innerWidth,
            })),
          e,
          n
        );
      }),
        m[(t = n)] ||
          (m[t] = setTimeout(function () {
            (m[t] = null), i();
          }, 32));
    }
    function c(e) {
      return (
        (e = e.getBoundingClientRect()),
        F(H),
        {
          x: Math.floor(Number(e.left) + Number(s.x)),
          y: Math.floor(Number(e.top) + Number(s.y)),
        }
      );
    }
    function u(e) {
      var n = e ? c(j.iframe) : { x: 0, y: 0 },
        i = { x: Number(j.width) + n.x, y: Number(j.height) + n.y };
      b(
        H,
        "Reposition requested from iFrame (offset x:" + n.x + " y:" + n.y + ")"
      ),
        window.top === window.self
          ? ((s = i), l(), b(H, "--"))
          : window.parentIFrame
          ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](i.x, i.y)
          : v(
              H,
              "Unable to scroll to requested position, window.parentIFrame not found"
            );
    }
    function l() {
      !1 === x("onScroll", s) ? R() : O(H);
    }
    function g(e) {
      e = e.split("#")[1] || "";
      var n = decodeURIComponent(e);
      (n = document.getElementById(n) || document.getElementsByName(n)[0])
        ? ((n = c(n)),
          b(
            H,
            "Moving to in page link (#" + e + ") at x: " + n.x + " y: " + n.y
          ),
          (s = { x: n.x, y: n.y }),
          l(),
          b(H, "--"))
        : window.top === window.self
        ? b(H, "In page link #" + e + " not found")
        : window.parentIFrame
        ? window.parentIFrame.moveToAnchor(e)
        : b(
            H,
            "In page link #" +
              e +
              " not found and window.parentIFrame not found"
          );
    }
    function w(e) {
      var n, i;
      (i =
        0 === Number(j.width) && 0 === Number(j.height)
          ? { x: (n = t(9).split(":"))[1], y: n[0] }
          : { x: j.width, y: j.height }),
        x(e, {
          iframe: j.iframe,
          screenX: Number(i.x),
          screenY: Number(i.y),
          type: j.type,
        });
    }
    function x(e, n) {
      return M(H, e, n);
    }
    var z,
      I,
      S = e.data,
      j = {},
      H = null;
    if ("[iFrameResizerChild]Ready" === S)
      for (var P in f) W("iFrame requested init", C(P), f[P].iframe, P);
    else
      r === ("" + S).slice(0, a) && S.slice(a).split(":")[0] in f
        ? ((j = (function () {
            var e = S.slice(a).split(":"),
              n = e[1] ? parseInt(e[1], 10) : 0,
              i = f[e[0]] && f[e[0]].iframe,
              t = getComputedStyle(i);
            return {
              iframe: i,
              id: e[0],
              height:
                n +
                (function (e) {
                  return "border-box" !== e.boxSizing
                    ? 0
                    : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) +
                        (e = e.paddingBottom
                          ? parseInt(e.paddingBottom, 10)
                          : 0);
                })(t) +
                (function (e) {
                  return "border-box" !== e.boxSizing
                    ? 0
                    : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) +
                        (e = e.borderBottomWidth
                          ? parseInt(e.borderBottomWidth, 10)
                          : 0);
                })(t),
              width: e[2],
              type: e[3],
            };
          })()),
          (H = j.id),
          f[H] && (f[H].loaded = !0),
          (I = j.type in { true: 1, false: 1, undefined: 1 }) &&
            b(H, "Ignoring init message from meta parent page"),
          !I &&
            ((I = !0),
            f[(z = H)] ||
              ((I = !1),
              v(j.type + " No settings for " + z + ". Message was: " + S)),
            I) &&
            (b(H, "Received: " + S),
            (z = !0),
            null === j.iframe &&
              (v(H, "IFrame (" + j.id + ") not found"), (z = !1)),
            z &&
              (function () {
                var n = e.origin,
                  i = f[H] && f[H].checkOrigin;
                if (
                  i &&
                  "" + n != "null" &&
                  !(function () {
                    if (i.constructor !== Array)
                      return (
                        (e = f[H] && f[H].remoteHost),
                        b(H, "Checking connection is from: " + e),
                        n === e
                      );
                    var e,
                      t = 0,
                      o = !1;
                    for (
                      b(
                        H,
                        "Checking connection is from allowed list of origins: " +
                          i
                      );
                      t < i.length;
                      t++
                    )
                      if (i[t] === n) {
                        o = !0;
                        break;
                      }
                    return o;
                  })()
                )
                  throw new Error(
                    "Unexpected message received from: " +
                      n +
                      " for " +
                      j.iframe.id +
                      ". Message was: " +
                      e.data +
                      ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains."
                  );
                return 1;
              })() &&
              (function () {
                switch (
                  (f[H] && f[H].firstRun && f[H] && (f[H].firstRun = !1),
                  j.type)
                ) {
                  case "close":
                    k(j.iframe);
                    break;
                  case "message":
                    (r = t(6)),
                      b(
                        H,
                        "onMessage passed: {iframe: " +
                          j.iframe.id +
                          ", message: " +
                          r +
                          "}"
                      ),
                      x("onMessage", {
                        iframe: j.iframe,
                        message: JSON.parse(r),
                      }),
                      b(H, "--");
                    break;
                  case "mouseenter":
                    w("onMouseEnter");
                    break;
                  case "mouseleave":
                    w("onMouseLeave");
                    break;
                  case "autoResize":
                    f[H].autoResize = JSON.parse(t(9));
                    break;
                  case "scrollTo":
                    u(!1);
                    break;
                  case "scrollToOffset":
                    u(!0);
                    break;
                  case "pageInfo":
                    d(f[H] && f[H].iframe, H),
                      (o = H),
                      e("Add ", h),
                      f[o] && (f[o].stopPageInfo = i);
                    break;
                  case "pageInfoStop":
                    f[H] &&
                      f[H].stopPageInfo &&
                      (f[H].stopPageInfo(), delete f[H].stopPageInfo);
                    break;
                  case "inPageLink":
                    g(t(9));
                    break;
                  case "reset":
                    E(j);
                    break;
                  case "init":
                    n(), x("onInit", j.iframe);
                    break;
                  default:
                    0 === Number(j.width) && 0 === Number(j.height)
                      ? v(
                          "Unsupported message received (" +
                            j.type +
                            "), this is likely due to the iframe containing a later version of iframe-resizer than the parent page"
                        )
                      : n();
                }
                function e(e, n) {
                  function t() {
                    f[o] ? d(f[o].iframe, o) : i();
                  }
                  ["scroll", "resize"].forEach(function (i) {
                    b(o, e + i + " listener for sendPageInfo"), n(window, i, t);
                  });
                }
                function i() {
                  e("Remove ", p);
                }
                var o, r;
              })()))
        : y(H, "Ignored: " + S);
  }
  function M(e, n, i) {
    var t = null,
      o = null;
    if (f[e]) {
      if ("function" != typeof (t = f[e][n]))
        throw new TypeError(n + " on iFrame[" + e + "] is not a function");
      o = t(i);
    }
    return o;
  }
  function I(e) {
    (e = e.id), delete f[e];
  }
  function k(e) {
    var n = e.id;
    if (!1 === M(n, "onClose", n))
      b(n, "Close iframe cancelled by onClose event");
    else {
      b(n, "Removing iFrame: " + n);
      try {
        e.parentNode && e.parentNode.removeChild(e);
      } catch (e) {
        v(e);
      }
      M(n, "onClosed", n), b(n, "--"), I(e);
    }
  }
  function F(n) {
    null === s &&
      b(
        n,
        "Get page position: " +
          (s = {
            x:
              window.pageXOffset === e
                ? document.documentElement.scrollLeft
                : window.pageXOffset,
            y:
              window.pageYOffset === e
                ? document.documentElement.scrollTop
                : window.pageYOffset,
          }).x +
          "," +
          s.y
      );
  }
  function O(e) {
    null !== s &&
      (window.scrollTo(s.x, s.y),
      b(e, "Set page position: " + s.x + "," + s.y),
      R());
  }
  function R() {
    s = null;
  }
  function E(e) {
    b(
      e.id,
      "Size reset requested by " + ("init" === e.type ? "host page" : "iFrame")
    ),
      F(e.id),
      N(
        function () {
          T(e), W("reset", "reset", e.iframe, e.id);
        },
        e,
        "reset"
      );
  }
  function T(e) {
    function n(n) {
      var o;
      (o = n),
        e.id
          ? ((e.iframe.style[o] = e[o] + "px"),
            b(e.id, "IFrame (" + i + ") " + o + " set to " + e[o] + "px"))
          : b("undefined", "messageData id not set"),
        (function (n) {
          var o;
          function r() {
            Object.keys(f).forEach(function (e) {
              function n(e) {
                return "0px" === (f[i] && f[i].iframe.style[e]);
              }
              var i;
              f[(i = e)] &&
                null !== f[i].iframe.offsetParent &&
                (n("height") || n("width")) &&
                W("Visibility change", "resize", f[i].iframe, i);
            });
          }
          !t &&
            "0" === e[n] &&
            ((t = !0),
            b(i, "Hidden iFrame detected, creating visibility listener"),
            (n = g())) &&
            ((o = document.querySelector("body")),
            new n(function (e) {
              b(
                "window",
                "Mutation observed: " + e[0].target + " " + e[0].type
              ),
                j(r, 16);
            }).observe(o, {
              attributes: !0,
              attributeOldValue: !1,
              characterData: !0,
              characterDataOldValue: !1,
              childList: !0,
              subtree: !0,
            }));
        })(n);
    }
    var i = e.iframe.id;
    f[i] && (f[i].sizeHeight && n("height"), f[i].sizeWidth) && n("width");
  }
  function N(e, n, i) {
    i !== n.type && d && !window.jasmine
      ? (b(n.id, "Requesting animation frame"), d(e))
      : e();
  }
  function W(e, n, i, t, o) {
    var a = !1;
    (t = t || i.id),
      f[t] &&
        ((function () {
          var o;
          i && "contentWindow" in i && null !== i.contentWindow
            ? ((o = f[t] && f[t].targetOrigin),
              b(
                t,
                "[" +
                  e +
                  "] Sending msg to iframe[" +
                  t +
                  "] (" +
                  n +
                  ") targetOrigin: " +
                  o
              ),
              i.contentWindow.postMessage(r + n, o))
            : v(t, "[" + e + "] IFrame(" + t + ") not found");
        })(),
        o &&
          f[t] &&
          f[t].warningTimeout &&
          (f[t].msgTimeout = setTimeout(function () {
            !f[t] ||
              f[t].loaded ||
              a ||
              ((a = !0),
              v(
                t,
                "IFrame has not responded within " +
                  f[t].warningTimeout / 1e3 +
                  " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."
              ));
          }, f[t].warningTimeout)));
  }
  function C(e) {
    return (
      e +
      ":" +
      f[e].bodyMarginV1 +
      ":" +
      f[e].sizeWidth +
      ":" +
      f[e].log +
      ":" +
      f[e].interval +
      ":" +
      f[e].enablePublicMethods +
      ":" +
      f[e].autoResize +
      ":" +
      f[e].bodyMargin +
      ":" +
      f[e].heightCalculationMethod +
      ":" +
      f[e].bodyBackground +
      ":" +
      f[e].bodyPadding +
      ":" +
      f[e].tolerance +
      ":" +
      f[e].inPageLinks +
      ":" +
      f[e].resizeFrom +
      ":" +
      f[e].widthCalculationMethod +
      ":" +
      f[e].mouseEvents
    );
  }
  function S(t, o) {
    function r(e) {
      var n = e.split("Callback");
      2 === n.length &&
        ((this[(n = "on" + n[0].charAt(0).toUpperCase() + n[0].slice(1))] =
          this[e]),
        delete this[e],
        v(
          a,
          "Deprecated: '" +
            e +
            "' has been renamed '" +
            n +
            "'. The old method will be removed in the next major version."
        ));
    }
    var a = (function (e) {
      if ("string" != typeof e)
        throw new TypeError("Invaild id for iFrame. Expected String");
      var r;
      return (
        "" === e &&
          ((t.id =
            ((r = (o && o.id) || l.id + n++),
            null !== document.getElementById(r) && (r += n++),
            (e = r))),
          (i = (o || {}).log),
          b(e, "Added missing iframe ID: " + e + " (" + t.src + ")")),
        e
      );
    })(t.id);
    if (a in f && "iFrameResizer" in t) v(a, "Ignored iFrame, already setup.");
    else {
      switch (
        ((function (e) {
          if (
            ((e = e || {}),
            (f[a] = Object.create(null)),
            (f[a].iframe = t),
            (f[a].firstRun = !0),
            (f[a].remoteHost = t.src && t.src.split("/").slice(0, 3).join("/")),
            "object" != typeof e)
          )
            throw new TypeError("Options is not an object");
          Object.keys(e).forEach(r, e);
          var n,
            i = e;
          for (n in l)
            Object.prototype.hasOwnProperty.call(l, n) &&
              (f[a][n] = (Object.prototype.hasOwnProperty.call(i, n) ? i : l)[
                n
              ]);
          f[a] &&
            (f[a].targetOrigin =
              !0 !== f[a].checkOrigin ||
              "" === (e = f[a].remoteHost) ||
              null !== e.match(/^(about:blank|javascript:|file:\/\/)/)
                ? "*"
                : e);
        })(o),
        b(
          a,
          "IFrame scrolling " +
            (f[a] && f[a].scrolling ? "enabled" : "disabled") +
            " for " +
            a
        ),
        (t.style.overflow =
          !1 === (f[a] && f[a].scrolling) ? "hidden" : "auto"),
        f[a] && f[a].scrolling)
      ) {
        case "omit":
          break;
        case !0:
          t.scrolling = "yes";
          break;
        case !1:
          t.scrolling = "no";
          break;
        default:
          t.scrolling = f[a] ? f[a].scrolling : "no";
      }
      d("Height"),
        d("Width"),
        s("maxHeight"),
        s("minHeight"),
        s("maxWidth"),
        s("minWidth"),
        ("number" != typeof (f[a] && f[a].bodyMargin) &&
          "0" !== (f[a] && f[a].bodyMargin)) ||
          ((f[a].bodyMarginV1 = f[a].bodyMargin),
          (f[a].bodyMargin = f[a].bodyMargin + "px")),
        (function (n) {
          var i = g();
          i &&
            ((i = i), t.parentNode) &&
            new i(function (e) {
              e.forEach(function (e) {
                Array.prototype.slice
                  .call(e.removedNodes)
                  .forEach(function (e) {
                    e === t && k(t);
                  });
              });
            }).observe(t.parentNode, { childList: !0 }),
            h(t, "load", function () {
              var i, o;
              W("iFrame.onload", n, t, e, !0),
                (i = f[a] && f[a].firstRun),
                (o = f[a] && f[a].heightCalculationMethod in c),
                !i && o && E({ iframe: t, height: 0, width: 0, type: "init" });
            }),
            W("init", n, t, e, !0);
        })(C(a)),
        f[a] &&
          (f[a].iframe.iFrameResizer = {
            close: k.bind(null, f[a].iframe),
            removeListeners: I.bind(null, f[a].iframe),
            resize: W.bind(null, "Window resize", "resize", f[a].iframe),
            moveToAnchor: function (e) {
              W("Move to anchor", "moveToAnchor:" + e, f[a].iframe, a);
            },
            sendMessage: function (e) {
              W(
                "Send Message",
                "message:" + (e = JSON.stringify(e)),
                f[a].iframe,
                a
              );
            },
          });
    }
    function s(e) {
      var n = f[a][e];
      1 / 0 !== n &&
        0 !== n &&
        ((t.style[e] = "number" == typeof n ? n + "px" : n),
        b(a, "Set " + e + " = " + t.style[e]));
    }
    function d(e) {
      if (f[a]["min" + e] > f[a]["max" + e])
        throw new Error(
          "Value for min" + e + " can not be greater than max" + e
        );
    }
  }
  function j(e, n) {
    null === u &&
      (u = setTimeout(function () {
        (u = null), e();
      }, n));
  }
  function H() {
    "hidden" !== document.visibilityState &&
      (b("document", "Trigger event: Visibility change"),
      j(function () {
        P("Tab Visible", "resize");
      }, 16));
  }
  function P(e, n) {
    Object.keys(f).forEach(function (i) {
      var t;
      f[(t = i)] &&
        "parent" === f[t].resizeFrom &&
        f[t].autoResize &&
        !f[t].firstRun &&
        W(e, n, f[i].iframe, i);
    });
  }
  function A() {
    h(window, "message", z),
      h(window, "resize", function () {
        b("window", "Trigger event: " + "resize"),
          j(function () {
            P("Window resize", "resize");
          }, 16);
      }),
      h(document, "visibilitychange", H),
      h(document, "-webkit-visibilitychange", H);
  }
  function L() {
    function n(e, n) {
      if (n) {
        if (!n.tagName)
          throw new TypeError("Object is not a valid DOM element");
        if ("IFRAME" !== n.tagName.toUpperCase())
          throw new TypeError(
            "Expected <IFRAME> tag, found <" + n.tagName + ">"
          );
        S(n, e), i.push(n);
      }
    }
    for (
      var i, t = ["moz", "webkit", "o", "ms"], o = 0;
      o < t.length && !d;
      o += 1
    )
      d = window[t[o] + "RequestAnimationFrame"];
    return (
      d
        ? (d = d.bind(window))
        : b("setup", "RequestAnimationFrame not supported"),
      A(),
      function (t, o) {
        var r;
        switch (
          ((i = []),
          (r = t) &&
            r.enablePublicMethods &&
            v(
              "enablePublicMethods option has been removed, public methods are now always available in the iFrame"
            ),
          typeof o)
        ) {
          case "undefined":
          case "string":
            Array.prototype.forEach.call(
              document.querySelectorAll(o || "iframe"),
              n.bind(e, t)
            );
            break;
          case "object":
            n(t, o);
            break;
          default:
            throw new TypeError("Unexpected data type (" + typeof o + ")");
        }
        return i;
      }
    );
  }
  "undefined" != typeof window &&
    ((n = 0),
    (t = i = !1),
    (o = "message".length),
    (a = (r = "[iFrameSizer]").length),
    (s = null),
    (d = window.requestAnimationFrame),
    (c = Object.freeze({
      max: 1,
      scroll: 1,
      bodyScroll: 1,
      documentElementScroll: 1,
    })),
    (f = {}),
    (u = null),
    (l = Object.freeze({
      autoResize: !0,
      bodyBackground: null,
      bodyMargin: null,
      bodyMarginV1: 8,
      bodyPadding: null,
      checkOrigin: !0,
      inPageLinks: !1,
      enablePublicMethods: !0,
      heightCalculationMethod: "bodyOffset",
      id: "iFrameResizer",
      interval: 32,
      log: !1,
      maxHeight: 1 / 0,
      maxWidth: 1 / 0,
      minHeight: 0,
      minWidth: 0,
      mouseEvents: !0,
      resizeFrom: "parent",
      scrolling: !1,
      sizeHeight: !0,
      sizeWidth: !1,
      warningTimeout: 5e3,
      tolerance: 0,
      widthCalculationMethod: "scroll",
      onClose: function () {
        return !0;
      },
      onClosed: function () {},
      onInit: function () {},
      onMessage: function () {
        v("onMessage function not defined");
      },
      onMouseEnter: function () {},
      onMouseLeave: function () {},
      onResized: function () {},
      onScroll: function () {
        return !0;
      },
    })),
    (m = {}),
    window.jQuery !== e &&
      (function (e) {
        e.fn
          ? e.fn.iFrameResize ||
            (e.fn.iFrameResize = function (e) {
              return this.filter("iframe")
                .each(function (n, i) {
                  S(i, e);
                })
                .end();
            })
          : y("", "Unable to bind to jQuery, it is not fully loaded.");
      })(window.jQuery),
    "function" == typeof define && define.amd
      ? define([], L)
      : "object" == typeof module &&
        "object" == typeof module.exports &&
        (module.exports = L()),
    (window.iFrameResize = window.iFrameResize || L()));
})();
const formIframes = document.querySelectorAll("#wrapifai-iframe");
formIframes.length > 1
  ? formIframes.forEach((e, n) => {
      e.setAttribute("id", `wrapifai-iframe-${n}`),
        window.iFrameResize({ log: !1 }, `#wrapifai-iframe-${n}`);
    })
  : window.iFrameResize({ log: !1 }, "#wrapifai-iframe");

window.addEventListener("message", async (event) => {
  if (event.data && event.data.type === "wrapifai-resize" && typeof event.data.height === "number") {
    var allIframes = document.querySelectorAll('[id^="wrapifai-iframe"]');
    allIframes.forEach(function (iframe) {
      try {
        if (iframe.contentWindow === event.source) {
          iframe.style.height = event.data.height + "px";
        }
      } catch (e) {}
    });
    return;
  }
  if (event.data.type === "wrapifai-download") {
    try {
      var payload = event.data;
      var blob = payload.blob;
      if (!(blob instanceof Blob)) {
        if (payload.data) {
          blob = new Blob([payload.data], {
            type: payload.mimeType || "application/octet-stream",
          });
        } else {
          return;
        }
      }
      var objectUrl = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = objectUrl;
      link.download = payload.filename || "download";
      link.rel = "noopener";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (err) {
      console.error("Wrapifai download failed:", err);
    }
    return;
  }
  if (event.data.type === "copy") {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(event.data.url);
      alert("Link copied");
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = event.data.url;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback copy failed:", err);
      } finally {
        document.body.removeChild(textarea);
        alert("Link copied");
      }
    }
  }
});
