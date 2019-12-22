! function() {
    "use strict";

    function t(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }

    function e(t, e) {
        return e = {
            exports: {}
        }, t(e, e.exports), e.exports
    }

    function n(t) {
        this.content = t
    }

    function r(t) {
        var e = !(vt && (t.ctrlKey || t.altKey || t.metaKey) || dt && t.shiftKey && t.key && 1 == t.key.length) && t.key || (t.shiftKey ? ut : pt)[t.keyCode] || t.key || "Unidentified";
        return "Esc" == e && (e = "Escape"), "Del" == e && (e = "Delete"), "Left" == e && (e = "ArrowLeft"), "Up" == e && (e = "ArrowUp"), "Right" == e && (e = "ArrowRight"), "Down" == e && (e = "ArrowDown"), e
    }
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    n.prototype = {
        constructor: n,
        find: function(t) {
            for (var e = this, n = 0; n < this.content.length; n += 2)
                if (e.content[n] === t) return n;
            return -1
        },
        get: function(t) {
            var e = this.find(t);
            return -1 == e ? void 0 : this.content[e + 1]
        },
        update: function(t, e, r) {
            var o = r && r != t ? this.remove(r) : this,
                i = o.find(t),
                s = o.content.slice();
            return -1 == i ? s.push(r || t, e) : (s[i + 1] = e, r && (s[i] = r)), new n(s)
        },
        remove: function(t) {
            var e = this.find(t);
            if (-1 == e) return this;
            var r = this.content.slice();
            return r.splice(e, 2), new n(r)
        },
        addToStart: function(t, e) {
            return new n([t, e].concat(this.remove(t).content))
        },
        addToEnd: function(t, e) {
            var r = this.remove(t).content.slice();
            return r.push(t, e), new n(r)
        },
        addBefore: function(t, e, r) {
            var o = this.remove(e),
                i = o.content.slice(),
                s = o.find(t);
            return i.splice(-1 == s ? i.length : s, 0, e, r), new n(i)
        },
        forEach: function(t) {
            for (var e = this, n = 0; n < this.content.length; n += 2) t(e.content[n], e.content[n + 1])
        },
        prepend: function(t) {
            return (t = n.from(t)).size ? new n(t.content.concat(this.subtract(t).content)) : this
        },
        append: function(t) {
            return (t = n.from(t)).size ? new n(this.subtract(t).content.concat(t.content)) : this
        },
        subtract: function(t) {
            var e = this;
            t = n.from(t);
            for (var r = 0; r < t.content.length; r += 2) e = e.remove(t.content[r]);
            return e
        },
        get size() {
            return this.content.length >> 1
        }
    }, n.from = function(t) {
        if (t instanceof n) return t;
        var e = [];
        if (t)
            for (var r in t) e.push(r, t[r]);
        return new n(e)
    };
    for (var o = n, i = e(function(t, e) {
            function n(t, e, r) {
                for (var o = 0;; o++) {
                    if (o == t.childCount || o == e.childCount) return t.childCount == e.childCount ? null : r;
                    var i = t.child(o),
                        s = e.child(o);
                    if (i != s) {
                        if (!i.sameMarkup(s)) return r;
                        if (i.isText && i.text != s.text) {
                            for (var a = 0; i.text[a] == s.text[a]; a++) r++;
                            return r
                        }
                        if (i.content.size || s.content.size) {
                            var c = n(i.content, s.content, r + 1);
                            if (null != c) return c
                        }
                        r += i.nodeSize
                    } else r += i.nodeSize
                }
            }

            function r(t, e, n, o) {
                for (var i = t.childCount, s = e.childCount;;) {
                    if (0 == i || 0 == s) return i == s ? null : {
                        a: n,
                        b: o
                    };
                    var a = t.child(--i),
                        c = e.child(--s),
                        l = a.nodeSize;
                    if (a != c) {
                        if (!a.sameMarkup(c)) return {
                            a: n,
                            b: o
                        };
                        if (a.isText && a.text != c.text) {
                            for (var p = 0, u = Math.min(a.text.length, c.text.length); p < u && a.text[a.text.length - p - 1] == c.text[c.text.length - p - 1];) p++, n--, o--;
                            return {
                                a: n,
                                b: o
                            }
                        }
                        if (a.content.size || c.content.size) {
                            var f = r(a.content, c.content, n - 1, o - 1);
                            if (f) return f
                        }
                        n -= l, o -= l
                    } else n -= l, o -= l
                }
            }

            function i(t, e) {
                return H.index = t, H.offset = e, H
            }

            function s(t, e) {
                if (t === e) return !0;
                if (!t || "object" != typeof t || !e || "object" != typeof e) return !1;
                var n = Array.isArray(t);
                if (Array.isArray(e) != n) return !1;
                if (n) {
                    if (t.length != e.length) return !1;
                    for (var r = 0; r < t.length; r++)
                        if (!s(t[r], e[r])) return !1
                } else {
                    for (var o in t)
                        if (!(o in e && s(t[o], e[o]))) return !1;
                    for (var i in e)
                        if (!(i in t)) return !1
                }
                return !0
            }

            function a(t) {
                var e = Error.call(this, t);
                return e.__proto__ = a.prototype, e
            }

            function c(t, e, n) {
                var r = t.findIndex(e),
                    o = r.index,
                    i = r.offset,
                    s = t.maybeChild(o),
                    a = t.findIndex(n),
                    l = a.index,
                    p = a.offset;
                if (i == e || s.isText) {
                    if (p != n && !t.child(l).isText) throw new RangeError("Removing non-flat range");
                    return t.cut(0, e).append(t.cut(n))
                }
                if (o != l) throw new RangeError("Removing non-flat range");
                return t.replaceChild(o, s.copy(c(s.content, e - i - 1, n - i - 1)))
            }

            function l(t, e, n, r) {
                var o = t.findIndex(e),
                    i = o.index,
                    s = o.offset,
                    a = t.maybeChild(i);
                if (s == e || a.isText) return r && !r.canReplace(i, i, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
                var c = l(a.content, e - s - 1, n);
                return c && t.replaceChild(i, a.copy(c))
            }

            function p(t, e, n) {
                if (n.openStart > t.depth) throw new a("Inserted content deeper than insertion position");
                if (t.depth - n.openStart != e.depth - n.openEnd) throw new a("Inconsistent open depths");
                return u(t, e, n, 0)
            }

            function u(t, e, n, r) {
                var o = t.index(r),
                    i = t.node(r);
                if (o == e.index(r) && r < t.depth - n.openStart) {
                    var s = u(t, e, n, r + 1);
                    return i.copy(i.content.replaceChild(o, s))
                }
                if (n.content.size) {
                    if (n.openStart || n.openEnd || t.depth != r || e.depth != r) {
                        var a = w(n, t);
                        return v(i, g(t, a.start, a.end, e, r))
                    }
                    var c = t.parent,
                        l = c.content;
                    return v(c, l.cut(0, t.parentOffset).append(n.content).append(l.cut(e.parentOffset)))
                }
                return v(i, y(t, e, r))
            }

            function f(t, e) {
                if (!e.type.compatibleContent(t.type)) throw new a("Cannot join " + e.type.name + " onto " + t.type.name)
            }

            function d(t, e, n) {
                var r = t.node(n);
                return f(r, e.node(n)), r
            }

            function h(t, e) {
                var n = e.length - 1;
                n >= 0 && t.isText && t.sameMarkup(e[n]) ? e[n] = t.withText(e[n].text + t.text) : e.push(t)
            }

            function m(t, e, n, r) {
                var o = (e || t).node(n),
                    i = 0,
                    s = e ? e.index(n) : o.childCount;
                t && (i = t.index(n), t.depth > n ? i++ : t.textOffset && (h(t.nodeAfter, r), i++));
                for (var a = i; a < s; a++) h(o.child(a), r);
                e && e.depth == n && e.textOffset && h(e.nodeBefore, r)
            }

            function v(t, e) {
                if (!t.type.validContent(e)) throw new a("Invalid content for node " + t.type.name);
                return t.copy(e)
            }

            function g(t, e, n, r, o) {
                var i = t.depth > o && d(t, e, o + 1),
                    s = r.depth > o && d(n, r, o + 1),
                    a = [];
                return m(null, t, o, a), i && s && e.index(o) == n.index(o) ? (f(i, s), h(v(i, g(t, e, n, r, o + 1)), a)) : (i && h(v(i, y(t, e, o + 1)), a), m(e, n, o, a), s && h(v(s, y(n, r, o + 1)), a)), m(r, null, o, a), new W(a)
            }

            function y(t, e, n) {
                var r = [];
                return m(null, t, n, r), t.depth > n && h(v(d(t, e, n + 1), y(t, e, n + 1)), r), m(e, null, n, r), new W(r)
            }

            function w(t, e) {
                for (var n = e.depth - t.openStart, r = e.node(n).copy(t.content), o = n - 1; o >= 0; o--) r = e.node(o).copy(W.from(r));
                return {
                    start: r.resolveNoCache(t.openStart + n),
                    end: r.resolveNoCache(r.content.size - t.openEnd - n)
                }
            }

            function b(t, e) {
                for (var n = t.length - 1; n >= 0; n--) e = t[n].type.name + "(" + e + ")";
                return e
            }

            function S(t) {
                var e = [];
                do {
                    e.push(k(t))
                } while (t.eat("|"));
                return 1 == e.length ? e[0] : {
                    type: "choice",
                    exprs: e
                }
            }

            function k(t) {
                var e = [];
                do {
                    e.push(x(t))
                } while (t.next && ")" != t.next && "|" != t.next);
                return 1 == e.length ? e[0] : {
                    type: "seq",
                    exprs: e
                }
            }

            function x(t) {
                for (var e = N(t);;)
                    if (t.eat("+")) e = {
                        type: "plus",
                        expr: e
                    };
                    else if (t.eat("*")) e = {
                    type: "star",
                    expr: e
                };
                else if (t.eat("?")) e = {
                    type: "opt",
                    expr: e
                };
                else {
                    if (!t.eat("{")) break;
                    e = C(t, e)
                }
                return e
            }

            function M(t) {
                /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
                var e = Number(t.next);
                return t.pos++, e
            }

            function C(t, e) {
                var n = M(t),
                    r = n;
                return t.eat(",") && (r = "}" != t.next ? M(t) : -1), t.eat("}") || t.err("Unclosed braced range"), {
                    type: "range",
                    min: n,
                    max: r,
                    expr: e
                }
            }

            function O(t, e) {
                var n = t.nodeTypes,
                    r = n[e];
                if (r) return [r];
                var o = [];
                for (var i in n) {
                    var s = n[i];
                    s.groups.indexOf(e) > -1 && o.push(s)
                }
                return 0 == o.length && t.err("No node type or group '" + e + "' found"), o
            }

            function N(t) {
                if (t.eat("(")) {
                    var e = S(t);
                    return t.eat(")") || t.err("Missing closing paren"), e
                }
                if (!/\W/.test(t.next)) {
                    var n = O(t, t.next).map(function(e) {
                        return null == t.inline ? t.inline = e.isInline : t.inline != e.isInline && t.err("Mixing inline and block content"), {
                            type: "name",
                            value: e
                        }
                    });
                    return t.pos++, 1 == n.length ? n[0] : {
                        type: "choice",
                        exprs: n
                    }
                }
                t.err("Unexpected token '" + t.next + "'")
            }

            function T(t) {
                function e() {
                    return i.push([]) - 1
                }

                function n(t, e, n) {
                    var r = {
                        term: n,
                        to: e
                    };
                    return i[t].push(r), r
                }

                function r(t, e) {
                    t.forEach(function(t) {
                        return t.to = e
                    })
                }

                function o(t, i) {
                    if ("choice" == t.type) return t.exprs.reduce(function(t, e) {
                        return t.concat(o(e, i))
                    }, []);
                    if ("seq" == t.type)
                        for (var s = 0;; s++) {
                            var a = o(t.exprs[s], i);
                            if (s == t.exprs.length - 1) return a;
                            r(a, i = e())
                        } else {
                            if ("star" == t.type) {
                                var c = e();
                                return n(i, c), r(o(t.expr, c), c), [n(c)]
                            }
                            if ("plus" == t.type) {
                                var l = e();
                                return r(o(t.expr, i), l), r(o(t.expr, l), l), [n(l)]
                            }
                            if ("opt" == t.type) return [n(i)].concat(o(t.expr, i));
                            if ("range" == t.type) {
                                for (var p = i, u = 0; u < t.min; u++) {
                                    var f = e();
                                    r(o(t.expr, p), f), p = f
                                }
                                if (-1 == t.max) r(o(t.expr, p), p);
                                else
                                    for (var d = t.min; d < t.max; d++) {
                                        var h = e();
                                        n(p, h), r(o(t.expr, p), h), p = h
                                    }
                                return [n(p)]
                            }
                            if ("name" == t.type) return [n(i, null, t.value)]
                        }
                }
                var i = [
                    []
                ];
                return r(o(t, 0), e()), i
            }

            function D(t, e) {
                return t - e
            }

            function E(t, e) {
                function n(e) {
                    var o = t[e];
                    if (1 == o.length && !o[0].term) return n(o[0].to);
                    r.push(e);
                    for (var i = 0; i < o.length; i++) {
                        var s = o[i],
                            a = s.term,
                            c = s.to;
                        a || -1 != r.indexOf(c) || n(c)
                    }
                }
                var r = [];
                return n(e), r.sort(D)
            }

            function A(t) {
                function e(r) {
                    var o = [];
                    r.forEach(function(e) {
                        t[e].forEach(function(e) {
                            var n = e.term,
                                r = e.to;
                            if (n) {
                                var i = o.indexOf(n),
                                    s = i > -1 && o[i + 1];
                                E(t, r).forEach(function(t) {
                                    s || o.push(n, s = []), -1 == s.indexOf(t) && s.push(t)
                                })
                            }
                        })
                    });
                    for (var i = n[r.join(",")] = new ct(r.indexOf(t.length - 1) > -1), s = 0; s < o.length; s += 2) {
                        var a = o[s + 1].sort(D);
                        i.next.push(o[s], n[a.join(",")] || e(a))
                    }
                    return i
                }
                var n = Object.create(null);
                return e(E(t, 0))
            }

            function I(t, e) {
                for (var n = 0, r = [t]; n < r.length; n++) {
                    for (var o = r[n], i = !o.validEnd, s = [], a = 0; a < o.next.length; a += 2) {
                        var c = o.next[a],
                            l = o.next[a + 1];
                        s.push(c.name), !i || c.isText || c.hasRequiredAttrs() || (i = !1), -1 == r.indexOf(l) && r.push(l)
                    }
                    i && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position")
                }
            }

            function R(t) {
                var e = Object.create(null);
                for (var n in t) {
                    var r = t[n];
                    if (!r.hasDefault) return null;
                    e[n] = r.default
                }
                return e
            }

            function z(t, e) {
                var n = Object.create(null);
                for (var r in t) {
                    var o = e && e[r];
                    if (void 0 === o) {
                        var i = t[r];
                        if (!i.hasDefault) throw new RangeError("No value supplied for attribute " + r);
                        o = i.default
                    }
                    n[r] = o
                }
                return n
            }

            function P(t) {
                var e = Object.create(null);
                if (t)
                    for (var n in t) e[n] = new ht(t[n]);
                return e
            }

            function _(t, e) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var o = e[r],
                        i = t.marks[o],
                        s = i;
                    if (i) n.push(i);
                    else
                        for (var a in t.marks) {
                            var c = t.marks[a];
                            ("_" == o || c.spec.group && c.spec.group.split(" ").indexOf(o) > -1) && n.push(s = c)
                        }
                    if (!s) throw new SyntaxError("Unknown mark type: '" + e[r] + "'")
                }
                return n
            }

            function B(t) {
                return (t ? kt : 0) | ("full" === t ? xt : 0)
            }

            function F(t) {
                for (var e = t.firstChild, n = null; e; e = e.nextSibling) {
                    var r = 1 == e.nodeType ? e.nodeName.toLowerCase() : null;
                    r && St.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : "li" == r ? n = e : r && (n = null)
                }
            }

            function j(t, e) {
                return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e)
            }

            function V(t) {
                for (var e, n = /\s*([\w-]+)\s*:\s*([^;]+)/g, r = []; e = n.exec(t);) r.push(e[1], e[2].trim());
                return r
            }

            function q(t) {
                var e = {};
                for (var n in t) e[n] = t[n];
                return e
            }

            function $(t) {
                var e = {};
                for (var n in t) {
                    var r = t[n].spec.toDOM;
                    r && (e[n] = r)
                }
                return e
            }

            function L(t) {
                return t.document || window.document
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var J = function(t) {
                    return t && "object" == typeof t && "default" in t ? t.default : t
                }(o),
                W = function(t, e) {
                    var n = this;
                    if (this.content = t, this.size = e || 0, null == e)
                        for (var r = 0; r < t.length; r++) n.size += t[r].nodeSize
                },
                K = {
                    firstChild: {},
                    lastChild: {},
                    childCount: {}
                };
            W.prototype.nodesBetween = function(t, e, n, r, o) {
                var i = this;
                void 0 === r && (r = 0);
                for (var s = 0, a = 0; a < e; s++) {
                    var c = i.content[s],
                        l = a + c.nodeSize;
                    if (l > t && !1 !== n(c, r + a, o, s) && c.content.size) {
                        var p = a + 1;
                        c.nodesBetween(Math.max(0, t - p), Math.min(c.content.size, e - p), n, r + p)
                    }
                    a = l
                }
            }, W.prototype.descendants = function(t) {
                this.nodesBetween(0, this.size, t)
            }, W.prototype.textBetween = function(t, e, n, r) {
                var o = "",
                    i = !0;
                return this.nodesBetween(t, e, function(s, a) {
                    s.isText ? (o += s.text.slice(Math.max(t, a) - a, e - a), i = !n) : s.isLeaf && r ? (o += r, i = !n) : !i && s.isBlock && (o += n, i = !0)
                }, 0), o
            }, W.prototype.append = function(t) {
                if (!t.size) return this;
                if (!this.size) return t;
                var e = this.lastChild,
                    n = t.firstChild,
                    r = this.content.slice(),
                    o = 0;
                for (e.isText && e.sameMarkup(n) && (r[r.length - 1] = e.withText(e.text + n.text), o = 1); o < t.content.length; o++) r.push(t.content[o]);
                return new W(r, this.size + t.size)
            }, W.prototype.cut = function(t, e) {
                var n = this;
                if (null == e && (e = this.size), 0 == t && e == this.size) return this;
                var r = [],
                    o = 0;
                if (e > t)
                    for (var i = 0, s = 0; s < e; i++) {
                        var a = n.content[i],
                            c = s + a.nodeSize;
                        c > t && ((s < t || c > e) && (a = a.isText ? a.cut(Math.max(0, t - s), Math.min(a.text.length, e - s)) : a.cut(Math.max(0, t - s - 1), Math.min(a.content.size, e - s - 1))), r.push(a), o += a.nodeSize), s = c
                    }
                return new W(r, o)
            }, W.prototype.cutByIndex = function(t, e) {
                return t == e ? W.empty : 0 == t && e == this.content.length ? this : new W(this.content.slice(t, e))
            }, W.prototype.replaceChild = function(t, e) {
                var n = this.content[t];
                if (n == e) return this;
                var r = this.content.slice(),
                    o = this.size + e.nodeSize - n.nodeSize;
                return r[t] = e, new W(r, o)
            }, W.prototype.addToStart = function(t) {
                return new W([t].concat(this.content), this.size + t.nodeSize)
            }, W.prototype.addToEnd = function(t) {
                return new W(this.content.concat(t), this.size + t.nodeSize)
            }, W.prototype.eq = function(t) {
                var e = this;
                if (this.content.length != t.content.length) return !1;
                for (var n = 0; n < this.content.length; n++)
                    if (!e.content[n].eq(t.content[n])) return !1;
                return !0
            }, K.firstChild.get = function() {
                return this.content.length ? this.content[0] : null
            }, K.lastChild.get = function() {
                return this.content.length ? this.content[this.content.length - 1] : null
            }, K.childCount.get = function() {
                return this.content.length
            }, W.prototype.child = function(t) {
                var e = this.content[t];
                if (!e) throw new RangeError("Index " + t + " out of range for " + this);
                return e
            }, W.prototype.maybeChild = function(t) {
                return this.content[t]
            }, W.prototype.forEach = function(t) {
                for (var e = this, n = 0, r = 0; n < this.content.length; n++) {
                    var o = e.content[n];
                    t(o, r, n), r += o.nodeSize
                }
            }, W.prototype.findDiffStart = function(t, e) {
                return void 0 === e && (e = 0), n(this, t, e)
            }, W.prototype.findDiffEnd = function(t, e, n) {
                return void 0 === e && (e = this.size), void 0 === n && (n = t.size), r(this, t, e, n)
            }, W.prototype.findIndex = function(t, e) {
                var n = this;
                if (void 0 === e && (e = -1), 0 == t) return i(0, t);
                if (t == this.size) return i(this.content.length, t);
                if (t > this.size || t < 0) throw new RangeError("Position " + t + " outside of fragment (" + this + ")");
                for (var r = 0, o = 0;; r++) {
                    var s = o + n.child(r).nodeSize;
                    if (s >= t) return s == t || e > 0 ? i(r + 1, s) : i(r, o);
                    o = s
                }
            }, W.prototype.toString = function() {
                return "<" + this.toStringInner() + ">"
            }, W.prototype.toStringInner = function() {
                return this.content.join(", ")
            }, W.prototype.toJSON = function() {
                return this.content.length ? this.content.map(function(t) {
                    return t.toJSON()
                }) : null
            }, W.fromJSON = function(t, e) {
                if (!e) return W.empty;
                if (!Array.isArray(e)) throw new RangeError("Invalid input for Fragment.fromJSON");
                return new W(e.map(t.nodeFromJSON))
            }, W.fromArray = function(t) {
                if (!t.length) return W.empty;
                for (var e, n = 0, r = 0; r < t.length; r++) {
                    var o = t[r];
                    n += o.nodeSize, r && o.isText && t[r - 1].sameMarkup(o) ? (e || (e = t.slice(0, r)), e[e.length - 1] = o.withText(e[e.length - 1].text + o.text)) : e && e.push(o)
                }
                return new W(e || t, n)
            }, W.from = function(t) {
                if (!t) return W.empty;
                if (t instanceof W) return t;
                if (Array.isArray(t)) return this.fromArray(t);
                if (t.attrs) return new W([t], t.nodeSize);
                throw new RangeError("Can not convert " + t + " to a Fragment" + (t.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""))
            }, Object.defineProperties(W.prototype, K);
            var H = {
                index: 0,
                offset: 0
            };
            W.empty = new W([], 0);
            var U = function(t, e) {
                this.type = t, this.attrs = e
            };
            U.prototype.addToSet = function(t) {
                for (var e, n = this, r = !1, o = 0; o < t.length; o++) {
                    var i = t[o];
                    if (n.eq(i)) return t;
                    if (n.type.excludes(i.type)) e || (e = t.slice(0, o));
                    else {
                        if (i.type.excludes(n.type)) return t;
                        !r && i.type.rank > n.type.rank && (e || (e = t.slice(0, o)), e.push(n), r = !0), e && e.push(i)
                    }
                }
                return e || (e = t.slice()), r || e.push(this), e
            }, U.prototype.removeFromSet = function(t) {
                for (var e = this, n = 0; n < t.length; n++)
                    if (e.eq(t[n])) return t.slice(0, n).concat(t.slice(n + 1));
                return t
            }, U.prototype.isInSet = function(t) {
                for (var e = this, n = 0; n < t.length; n++)
                    if (e.eq(t[n])) return !0;
                return !1
            }, U.prototype.eq = function(t) {
                return this == t || this.type == t.type && s(this.attrs, t.attrs)
            }, U.prototype.toJSON = function() {
                var t = this,
                    e = {
                        type: this.type.name
                    };
                for (var n in t.attrs) {
                    e.attrs = t.attrs;
                    break
                }
                return e
            }, U.fromJSON = function(t, e) {
                if (!e) throw new RangeError("Invalid input for Mark.fromJSON");
                var n = t.marks[e.type];
                if (!n) throw new RangeError("There is no mark type " + e.type + " in this schema");
                return n.create(e.attrs)
            }, U.sameSet = function(t, e) {
                if (t == e) return !0;
                if (t.length != e.length) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!t[n].eq(e[n])) return !1;
                return !0
            }, U.setFrom = function(t) {
                if (!t || 0 == t.length) return U.none;
                if (t instanceof U) return [t];
                var e = t.slice();
                return e.sort(function(t, e) {
                    return t.type.rank - e.type.rank
                }), e
            }, U.none = [], a.prototype = Object.create(Error.prototype), a.prototype.constructor = a, a.prototype.name = "ReplaceError";
            var G = function(t, e, n) {
                    this.content = t, this.openStart = e, this.openEnd = n
                },
                Q = {
                    size: {}
                };
            Q.size.get = function() {
                return this.content.size - this.openStart - this.openEnd
            }, G.prototype.insertAt = function(t, e) {
                var n = l(this.content, t + this.openStart, e, null);
                return n && new G(n, this.openStart, this.openEnd)
            }, G.prototype.removeBetween = function(t, e) {
                return new G(c(this.content, t + this.openStart, e + this.openStart), this.openStart, this.openEnd)
            }, G.prototype.eq = function(t) {
                return this.content.eq(t.content) && this.openStart == t.openStart && this.openEnd == t.openEnd
            }, G.prototype.toString = function() {
                return this.content + "(" + this.openStart + "," + this.openEnd + ")"
            }, G.prototype.toJSON = function() {
                if (!this.content.size) return null;
                var t = {
                    content: this.content.toJSON()
                };
                return this.openStart > 0 && (t.openStart = this.openStart), this.openEnd > 0 && (t.openEnd = this.openEnd), t
            }, G.fromJSON = function(t, e) {
                if (!e) return G.empty;
                var n = e.openStart || 0,
                    r = e.openEnd || 0;
                if ("number" != typeof n || "number" != typeof r) throw new RangeError("Invalid input for Slice.fromJSON");
                return new G(W.fromJSON(t, e.content), e.openStart || 0, e.openEnd || 0)
            }, G.maxOpen = function(t, e) {
                void 0 === e && (e = !0);
                for (var n = 0, r = 0, o = t.firstChild; o && !o.isLeaf && (e || !o.type.spec.isolating); o = o.firstChild) n++;
                for (var i = t.lastChild; i && !i.isLeaf && (e || !i.type.spec.isolating); i = i.lastChild) r++;
                return new G(t, n, r)
            }, Object.defineProperties(G.prototype, Q), G.empty = new G(W.empty, 0, 0);
            var X = function(t, e, n) {
                    this.pos = t, this.path = e, this.depth = e.length / 3 - 1, this.parentOffset = n
                },
                Y = {
                    parent: {},
                    doc: {},
                    textOffset: {},
                    nodeAfter: {},
                    nodeBefore: {}
                };
            X.prototype.resolveDepth = function(t) {
                return null == t ? this.depth : t < 0 ? this.depth + t : t
            }, Y.parent.get = function() {
                return this.node(this.depth)
            }, Y.doc.get = function() {
                return this.node(0)
            }, X.prototype.node = function(t) {
                return this.path[3 * this.resolveDepth(t)]
            }, X.prototype.index = function(t) {
                return this.path[3 * this.resolveDepth(t) + 1]
            }, X.prototype.indexAfter = function(t) {
                return t = this.resolveDepth(t), this.index(t) + (t != this.depth || this.textOffset ? 1 : 0)
            }, X.prototype.start = function(t) {
                return 0 == (t = this.resolveDepth(t)) ? 0 : this.path[3 * t - 1] + 1
            }, X.prototype.end = function(t) {
                return t = this.resolveDepth(t), this.start(t) + this.node(t).content.size
            }, X.prototype.before = function(t) {
                if (!(t = this.resolveDepth(t))) throw new RangeError("There is no position before the top-level node");
                return t == this.depth + 1 ? this.pos : this.path[3 * t - 1]
            }, X.prototype.after = function(t) {
                if (!(t = this.resolveDepth(t))) throw new RangeError("There is no position after the top-level node");
                return t == this.depth + 1 ? this.pos : this.path[3 * t - 1] + this.path[3 * t].nodeSize
            }, Y.textOffset.get = function() {
                return this.pos - this.path[this.path.length - 1]
            }, Y.nodeAfter.get = function() {
                var t = this.parent,
                    e = this.index(this.depth);
                if (e == t.childCount) return null;
                var n = this.pos - this.path[this.path.length - 1],
                    r = t.child(e);
                return n ? t.child(e).cut(n) : r
            }, Y.nodeBefore.get = function() {
                var t = this.index(this.depth),
                    e = this.pos - this.path[this.path.length - 1];
                return e ? this.parent.child(t).cut(0, e) : 0 == t ? null : this.parent.child(t - 1)
            }, X.prototype.marks = function() {
                var t = this.parent,
                    e = this.index();
                if (0 == t.content.size) return U.none;
                if (this.textOffset) return t.child(e).marks;
                var n = t.maybeChild(e - 1),
                    r = t.maybeChild(e);
                if (!n) {
                    var o = n;
                    n = r, r = o
                }
                for (var i = n.marks, s = 0; s < i.length; s++) !1 !== i[s].type.spec.inclusive || r && i[s].isInSet(r.marks) || (i = i[s--].removeFromSet(i));
                return i
            }, X.prototype.marksAcross = function(t) {
                var e = this.parent.maybeChild(this.index());
                if (!e || !e.isInline) return null;
                for (var n = e.marks, r = t.parent.maybeChild(t.index()), o = 0; o < n.length; o++) !1 !== n[o].type.spec.inclusive || r && n[o].isInSet(r.marks) || (n = n[o--].removeFromSet(n));
                return n
            }, X.prototype.sharedDepth = function(t) {
                for (var e = this, n = this.depth; n > 0; n--)
                    if (e.start(n) <= t && e.end(n) >= t) return n;
                return 0
            }, X.prototype.blockRange = function(t, e) {
                var n = this;
                if (void 0 === t && (t = this), t.pos < this.pos) return t.blockRange(this);
                for (var r = this.depth - (this.parent.inlineContent || this.pos == t.pos ? 1 : 0); r >= 0; r--)
                    if (t.pos <= n.end(r) && (!e || e(n.node(r)))) return new nt(n, t, r)
            }, X.prototype.sameParent = function(t) {
                return this.pos - this.parentOffset == t.pos - t.parentOffset
            }, X.prototype.max = function(t) {
                return t.pos > this.pos ? t : this
            }, X.prototype.min = function(t) {
                return t.pos < this.pos ? t : this
            }, X.prototype.toString = function() {
                for (var t = this, e = "", n = 1; n <= this.depth; n++) e += (e ? "/" : "") + t.node(n).type.name + "_" + t.index(n - 1);
                return e + ":" + this.parentOffset
            }, X.resolve = function(t, e) {
                if (!(e >= 0 && e <= t.content.size)) throw new RangeError("Position " + e + " out of range");
                for (var n = [], r = 0, o = e, i = t;;) {
                    var s = i.content.findIndex(o),
                        a = s.index,
                        c = s.offset,
                        l = o - c;
                    if (n.push(i, a, r + c), !l) break;
                    if ((i = i.child(a)).isText) break;
                    o = l - 1, r += c + 1
                }
                return new X(e, n, o)
            }, X.resolveCached = function(t, e) {
                for (var n = 0; n < Z.length; n++) {
                    var r = Z[n];
                    if (r.pos == e && r.doc == t) return r
                }
                var o = Z[tt] = X.resolve(t, e);
                return tt = (tt + 1) % et, o
            }, Object.defineProperties(X.prototype, Y);
            var Z = [],
                tt = 0,
                et = 12,
                nt = function(t, e, n) {
                    this.$from = t, this.$to = e, this.depth = n
                },
                rt = {
                    start: {},
                    end: {},
                    parent: {},
                    startIndex: {},
                    endIndex: {}
                };
            rt.start.get = function() {
                return this.$from.before(this.depth + 1)
            }, rt.end.get = function() {
                return this.$to.after(this.depth + 1)
            }, rt.parent.get = function() {
                return this.$from.node(this.depth)
            }, rt.startIndex.get = function() {
                return this.$from.index(this.depth)
            }, rt.endIndex.get = function() {
                return this.$to.indexAfter(this.depth)
            }, Object.defineProperties(nt.prototype, rt);
            var ot = Object.create(null),
                it = function(t, e, n, r) {
                    this.type = t, this.attrs = e, this.content = n || W.empty, this.marks = r || U.none
                },
                st = {
                    nodeSize: {},
                    childCount: {},
                    textContent: {},
                    firstChild: {},
                    lastChild: {},
                    isBlock: {},
                    isTextblock: {},
                    inlineContent: {},
                    isInline: {},
                    isText: {},
                    isLeaf: {},
                    isAtom: {}
                };
            st.nodeSize.get = function() {
                return this.isLeaf ? 1 : 2 + this.content.size
            }, st.childCount.get = function() {
                return this.content.childCount
            }, it.prototype.child = function(t) {
                return this.content.child(t)
            }, it.prototype.maybeChild = function(t) {
                return this.content.maybeChild(t)
            }, it.prototype.forEach = function(t) {
                this.content.forEach(t)
            }, it.prototype.nodesBetween = function(t, e, n, r) {
                void 0 === r && (r = 0), this.content.nodesBetween(t, e, n, r, this)
            }, it.prototype.descendants = function(t) {
                this.nodesBetween(0, this.content.size, t)
            }, st.textContent.get = function() {
                return this.textBetween(0, this.content.size, "")
            }, it.prototype.textBetween = function(t, e, n, r) {
                return this.content.textBetween(t, e, n, r)
            }, st.firstChild.get = function() {
                return this.content.firstChild
            }, st.lastChild.get = function() {
                return this.content.lastChild
            }, it.prototype.eq = function(t) {
                return this == t || this.sameMarkup(t) && this.content.eq(t.content)
            }, it.prototype.sameMarkup = function(t) {
                return this.hasMarkup(t.type, t.attrs, t.marks)
            }, it.prototype.hasMarkup = function(t, e, n) {
                return this.type == t && s(this.attrs, e || t.defaultAttrs || ot) && U.sameSet(this.marks, n || U.none)
            }, it.prototype.copy = function(t) {
                return void 0 === t && (t = null), t == this.content ? this : new this.constructor(this.type, this.attrs, t, this.marks)
            }, it.prototype.mark = function(t) {
                return t == this.marks ? this : new this.constructor(this.type, this.attrs, this.content, t)
            }, it.prototype.cut = function(t, e) {
                return 0 == t && e == this.content.size ? this : this.copy(this.content.cut(t, e))
            }, it.prototype.slice = function(t, e, n) {
                if (void 0 === e && (e = this.content.size), void 0 === n && (n = !1), t == e) return G.empty;
                var r = this.resolve(t),
                    o = this.resolve(e),
                    i = n ? 0 : r.sharedDepth(e),
                    s = r.start(i),
                    a = r.node(i).content.cut(r.pos - s, o.pos - s);
                return new G(a, r.depth - i, o.depth - i)
            }, it.prototype.replace = function(t, e, n) {
                return p(this.resolve(t), this.resolve(e), n)
            }, it.prototype.nodeAt = function(t) {
                for (var e = this;;) {
                    var n = e.content.findIndex(t),
                        r = n.index,
                        o = n.offset;
                    if (!(e = e.maybeChild(r))) return null;
                    if (o == t || e.isText) return e;
                    t -= o + 1
                }
            }, it.prototype.childAfter = function(t) {
                var e = this.content.findIndex(t),
                    n = e.index,
                    r = e.offset;
                return {
                    node: this.content.maybeChild(n),
                    index: n,
                    offset: r
                }
            }, it.prototype.childBefore = function(t) {
                if (0 == t) return {
                    node: null,
                    index: 0,
                    offset: 0
                };
                var e = this.content.findIndex(t),
                    n = e.index,
                    r = e.offset;
                if (r < t) return {
                    node: this.content.child(n),
                    index: n,
                    offset: r
                };
                var o = this.content.child(n - 1);
                return {
                    node: o,
                    index: n - 1,
                    offset: r - o.nodeSize
                }
            }, it.prototype.resolve = function(t) {
                return X.resolveCached(this, t)
            }, it.prototype.resolveNoCache = function(t) {
                return X.resolve(this, t)
            }, it.prototype.rangeHasMark = function(t, e, n) {
                var r = !1;
                return e > t && this.nodesBetween(t, e, function(t) {
                    return n.isInSet(t.marks) && (r = !0), !r
                }), r
            }, st.isBlock.get = function() {
                return this.type.isBlock
            }, st.isTextblock.get = function() {
                return this.type.isTextblock
            }, st.inlineContent.get = function() {
                return this.type.inlineContent
            }, st.isInline.get = function() {
                return this.type.isInline
            }, st.isText.get = function() {
                return this.type.isText
            }, st.isLeaf.get = function() {
                return this.type.isLeaf
            }, st.isAtom.get = function() {
                return this.type.isAtom
            }, it.prototype.toString = function() {
                if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
                var t = this.type.name;
                return this.content.size && (t += "(" + this.content.toStringInner() + ")"), b(this.marks, t)
            }, it.prototype.contentMatchAt = function(t) {
                var e = this.type.contentMatch.matchFragment(this.content, 0, t);
                if (!e) throw new Error("Called contentMatchAt on a node with invalid content");
                return e
            }, it.prototype.canReplace = function(t, e, n, r, o) {
                var i = this;
                void 0 === n && (n = W.empty), void 0 === r && (r = 0), void 0 === o && (o = n.childCount);
                var s = this.contentMatchAt(t).matchFragment(n, r, o),
                    a = s && s.matchFragment(this.content, e);
                if (!a || !a.validEnd) return !1;
                for (var c = r; c < o; c++)
                    if (!i.type.allowsMarks(n.child(c).marks)) return !1;
                return !0
            }, it.prototype.canReplaceWith = function(t, e, n, r) {
                if (r && !this.type.allowsMarks(r)) return !1;
                var o = this.contentMatchAt(t).matchType(n),
                    i = o && o.matchFragment(this.content, e);
                return !!i && i.validEnd
            }, it.prototype.canAppend = function(t) {
                return t.content.size ? this.canReplace(this.childCount, this.childCount, t.content) : this.type.compatibleContent(t.type)
            }, it.prototype.defaultContentType = function(t) {
                return this.contentMatchAt(t).defaultType
            }, it.prototype.check = function() {
                if (!this.type.validContent(this.content)) throw new RangeError("Invalid content for node " + this.type.name + ": " + this.content.toString().slice(0, 50));
                this.content.forEach(function(t) {
                    return t.check()
                })
            }, it.prototype.toJSON = function() {
                var t = this,
                    e = {
                        type: this.type.name
                    };
                for (var n in t.attrs) {
                    e.attrs = t.attrs;
                    break
                }
                return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map(function(t) {
                    return t.toJSON()
                })), e
            }, it.fromJSON = function(t, e) {
                if (!e) throw new RangeError("Invalid input for Node.fromJSON");
                var n = null;
                if (e.marks) {
                    if (!Array.isArray(e.marks)) throw new RangeError("Invalid mark data for Node.fromJSON");
                    n = e.marks.map(t.markFromJSON)
                }
                if ("text" == e.type) {
                    if ("string" != typeof e.text) throw new RangeError("Invalid text node in JSON");
                    return t.text(e.text, n)
                }
                var r = W.fromJSON(t, e.content);
                return t.nodeType(e.type).create(e.attrs, r, n)
            }, Object.defineProperties(it.prototype, st);
            var at = function(t) {
                    function e(e, n, r, o) {
                        if (t.call(this, e, n, null, o), !r) throw new RangeError("Empty text nodes are not allowed");
                        this.text = r
                    }
                    t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
                    var n = {
                        textContent: {},
                        nodeSize: {}
                    };
                    return e.prototype.toString = function() {
                        return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : b(this.marks, JSON.stringify(this.text))
                    }, n.textContent.get = function() {
                        return this.text
                    }, e.prototype.textBetween = function(t, e) {
                        return this.text.slice(t, e)
                    }, n.nodeSize.get = function() {
                        return this.text.length
                    }, e.prototype.mark = function(t) {
                        return t == this.marks ? this : new e(this.type, this.attrs, this.text, t)
                    }, e.prototype.withText = function(t) {
                        return t == this.text ? this : new e(this.type, this.attrs, t, this.marks)
                    }, e.prototype.cut = function(t, e) {
                        return void 0 === t && (t = 0), void 0 === e && (e = this.text.length), 0 == t && e == this.text.length ? this : this.withText(this.text.slice(t, e))
                    }, e.prototype.eq = function(t) {
                        return this.sameMarkup(t) && this.text == t.text
                    }, e.prototype.toJSON = function() {
                        var e = t.prototype.toJSON.call(this);
                        return e.text = this.text, e
                    }, Object.defineProperties(e.prototype, n), e
                }(it),
                ct = function(t) {
                    this.validEnd = t, this.next = [], this.wrapCache = []
                },
                lt = {
                    inlineContent: {},
                    defaultType: {},
                    edgeCount: {}
                };
            ct.parse = function(t, e) {
                var n = new pt(t, e);
                if (null == n.next) return ct.empty;
                var r = S(n);
                n.next && n.err("Unexpected trailing text");
                var o = A(T(r));
                return I(o, n), o
            }, ct.prototype.matchType = function(t) {
                for (var e = this, n = 0; n < this.next.length; n += 2)
                    if (e.next[n] == t) return e.next[n + 1];
                return null
            }, ct.prototype.matchFragment = function(t, e, n) {
                void 0 === e && (e = 0), void 0 === n && (n = t.childCount);
                for (var r = this, o = e; r && o < n; o++) r = r.matchType(t.child(o).type);
                return r
            }, lt.inlineContent.get = function() {
                var t = this.next[0];
                return !!t && t.isInline
            }, lt.defaultType.get = function() {
                for (var t = this, e = 0; e < this.next.length; e += 2) {
                    var n = t.next[e];
                    if (!n.isText && !n.hasRequiredAttrs()) return n
                }
            }, ct.prototype.compatible = function(t) {
                for (var e = this, n = 0; n < this.next.length; n += 2)
                    for (var r = 0; r < t.next.length; r += 2)
                        if (e.next[n] == t.next[r]) return !0;
                return !1
            }, ct.prototype.fillBefore = function(t, e, n) {
                function r(i, s) {
                    var a = i.matchFragment(t, n);
                    if (a && (!e || a.validEnd)) return W.from(s.map(function(t) {
                        return t.createAndFill()
                    }));
                    for (var c = 0; c < i.next.length; c += 2) {
                        var l = i.next[c],
                            p = i.next[c + 1];
                        if (!l.isText && !l.hasRequiredAttrs() && -1 == o.indexOf(p)) {
                            o.push(p);
                            var u = r(p, s.concat(l));
                            if (u) return u
                        }
                    }
                }
                void 0 === e && (e = !1), void 0 === n && (n = 0);
                var o = [this];
                return r(this, [])
            }, ct.prototype.findWrapping = function(t) {
                for (var e = this, n = 0; n < this.wrapCache.length; n += 2)
                    if (e.wrapCache[n] == t) return e.wrapCache[n + 1];
                var r = this.computeWrapping(t);
                return this.wrapCache.push(t, r), r
            }, ct.prototype.computeWrapping = function(t) {
                for (var e = Object.create(null), n = [{
                        match: this,
                        type: null,
                        via: null
                    }]; n.length;) {
                    var r = n.shift(),
                        o = r.match;
                    if (o.matchType(t)) {
                        for (var i = [], s = r; s.type; s = s.via) i.push(s.type);
                        return i.reverse()
                    }
                    for (var a = 0; a < o.next.length; a += 2) {
                        var c = o.next[a];
                        c.isLeaf || c.hasRequiredAttrs() || c.name in e || r.type && !o.next[a + 1].validEnd || (n.push({
                            match: c.contentMatch,
                            type: c,
                            via: r
                        }), e[c.name] = !0)
                    }
                }
            }, lt.edgeCount.get = function() {
                return this.next.length >> 1
            }, ct.prototype.edge = function(t) {
                var e = t << 1;
                if (e > this.next.length) throw new RangeError("There's no " + t + "th edge in this content match");
                return {
                    type: this.next[e],
                    next: this.next[e + 1]
                }
            }, ct.prototype.toString = function() {
                function t(n) {
                    e.push(n);
                    for (var r = 1; r < n.next.length; r += 2) - 1 == e.indexOf(n.next[r]) && t(n.next[r])
                }
                var e = [];
                return t(this), e.map(function(t, n) {
                    for (var r = n + (t.validEnd ? "*" : " ") + " ", o = 0; o < t.next.length; o += 2) r += (o ? ", " : "") + t.next[o].name + "->" + e.indexOf(t.next[o + 1]);
                    return r
                }).join("\n")
            }, Object.defineProperties(ct.prototype, lt), ct.empty = new ct(!0);
            var pt = function(t, e) {
                    this.string = t, this.nodeTypes = e, this.inline = null, this.pos = 0, this.tokens = t.split(/\s*(?=\b|\W|$)/), "" == this.tokens[this.tokens.length - 1] && this.tokens.pop(), "" == this.tokens[0] && this.tokens.unshift()
                },
                ut = {
                    next: {}
                };
            ut.next.get = function() {
                return this.tokens[this.pos]
            }, pt.prototype.eat = function(t) {
                return this.next == t && (this.pos++ || !0)
            }, pt.prototype.err = function(t) {
                throw new SyntaxError(t + " (in content expression '" + this.string + "')")
            }, Object.defineProperties(pt.prototype, ut);
            var ft = function(t, e, n) {
                    this.name = t, this.schema = e, this.spec = n, this.groups = n.group ? n.group.split(" ") : [], this.attrs = P(n.attrs), this.defaultAttrs = R(this.attrs), this.contentMatch = null, this.markSet = null, this.inlineContent = null, this.isBlock = !(n.inline || "text" == t), this.isText = "text" == t
                },
                dt = {
                    isInline: {},
                    isTextblock: {},
                    isLeaf: {},
                    isAtom: {}
                };
            dt.isInline.get = function() {
                return !this.isBlock
            }, dt.isTextblock.get = function() {
                return this.isBlock && this.inlineContent
            }, dt.isLeaf.get = function() {
                return this.contentMatch == ct.empty
            }, dt.isAtom.get = function() {
                return this.isLeaf || this.spec.atom
            }, ft.prototype.hasRequiredAttrs = function(t) {
                var e = this;
                for (var n in e.attrs)
                    if (e.attrs[n].isRequired && (!t || !(n in t))) return !0;
                return !1
            }, ft.prototype.compatibleContent = function(t) {
                return this == t || this.contentMatch.compatible(t.contentMatch)
            }, ft.prototype.computeAttrs = function(t) {
                return !t && this.defaultAttrs ? this.defaultAttrs : z(this.attrs, t)
            }, ft.prototype.create = function(t, e, n) {
                if (this.isText) throw new Error("NodeType.create can't construct text nodes");
                return new it(this, this.computeAttrs(t), W.from(e), U.setFrom(n))
            }, ft.prototype.createChecked = function(t, e, n) {
                if (e = W.from(e), !this.validContent(e)) throw new RangeError("Invalid content for node " + this.name);
                return new it(this, this.computeAttrs(t), e, U.setFrom(n))
            }, ft.prototype.createAndFill = function(t, e, n) {
                if (t = this.computeAttrs(t), (e = W.from(e)).size) {
                    var r = this.contentMatch.fillBefore(e);
                    if (!r) return null;
                    e = r.append(e)
                }
                var o = this.contentMatch.matchFragment(e).fillBefore(W.empty, !0);
                return o ? new it(this, t, e.append(o), U.setFrom(n)) : null
            }, ft.prototype.validContent = function(t) {
                var e = this,
                    n = this.contentMatch.matchFragment(t);
                if (!n || !n.validEnd) return !1;
                for (var r = 0; r < t.childCount; r++)
                    if (!e.allowsMarks(t.child(r).marks)) return !1;
                return !0
            }, ft.prototype.allowsMarkType = function(t) {
                return null == this.markSet || this.markSet.indexOf(t) > -1
            }, ft.prototype.allowsMarks = function(t) {
                var e = this;
                if (null == this.markSet) return !0;
                for (var n = 0; n < t.length; n++)
                    if (!e.allowsMarkType(t[n].type)) return !1;
                return !0
            }, ft.prototype.allowedMarks = function(t) {
                var e = this;
                if (null == this.markSet) return t;
                for (var n, r = 0; r < t.length; r++) e.allowsMarkType(t[r].type) ? n && n.push(t[r]) : n || (n = t.slice(0, r));
                return n ? n.length ? n : U.empty : t
            }, ft.compile = function(t, e) {
                var n = Object.create(null);
                t.forEach(function(t, r) {
                    return n[t] = new ft(t, e, r)
                });
                var r = e.spec.topNode || "doc";
                if (!n[r]) throw new RangeError("Schema is missing its top node type ('" + r + "')");
                if (!n.text) throw new RangeError("Every schema needs a 'text' type");
                for (var o in n.text.attrs) throw new RangeError("The text node type should not have attributes");
                return n
            }, Object.defineProperties(ft.prototype, dt);
            var ht = function(t) {
                    this.hasDefault = Object.prototype.hasOwnProperty.call(t, "default"), this.default = t.default
                },
                mt = {
                    isRequired: {}
                };
            mt.isRequired.get = function() {
                return !this.hasDefault
            }, Object.defineProperties(ht.prototype, mt);
            var vt = function(t, e, n, r) {
                this.name = t, this.schema = n, this.spec = r, this.attrs = P(r.attrs), this.rank = e, this.excluded = null;
                var o = R(this.attrs);
                this.instance = o && new U(this, o)
            };
            vt.prototype.create = function(t) {
                return !t && this.instance ? this.instance : new U(this, z(this.attrs, t))
            }, vt.compile = function(t, e) {
                var n = Object.create(null),
                    r = 0;
                return t.forEach(function(t, o) {
                    return n[t] = new vt(t, r++, e, o)
                }), n
            }, vt.prototype.removeFromSet = function(t) {
                for (var e = this, n = 0; n < t.length; n++)
                    if (t[n].type == e) return t.slice(0, n).concat(t.slice(n + 1));
                return t
            }, vt.prototype.isInSet = function(t) {
                for (var e = this, n = 0; n < t.length; n++)
                    if (t[n].type == e) return t[n]
            }, vt.prototype.excludes = function(t) {
                return this.excluded.indexOf(t) > -1
            };
            var gt = function(t) {
                var e = this;
                this.spec = {};
                for (var n in t) e.spec[n] = t[n];
                this.spec.nodes = J.from(t.nodes), this.spec.marks = J.from(t.marks), this.nodes = ft.compile(this.spec.nodes, this), this.marks = vt.compile(this.spec.marks, this);
                var r = Object.create(null);
                for (var o in e.nodes) {
                    if (o in e.marks) throw new RangeError(o + " can not be both a node and a mark");
                    var i = e.nodes[o],
                        s = i.spec.content || "",
                        a = i.spec.marks;
                    i.contentMatch = r[s] || (r[s] = ct.parse(s, e.nodes)), i.inlineContent = i.contentMatch.inlineContent, i.markSet = "_" == a ? null : a ? _(e, a.split(" ")) : "" != a && i.inlineContent ? null : []
                }
                for (var c in e.marks) {
                    var l = e.marks[c],
                        p = l.spec.excludes;
                    l.excluded = null == p ? [l] : "" == p ? [] : _(e, p.split(" "))
                }
                this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached = Object.create(null), this.cached.wrappings = Object.create(null)
            };
            gt.prototype.node = function(t, e, n, r) {
                if ("string" == typeof t) t = this.nodeType(t);
                else {
                    if (!(t instanceof ft)) throw new RangeError("Invalid node type: " + t);
                    if (t.schema != this) throw new RangeError("Node type from different schema used (" + t.name + ")")
                }
                return t.createChecked(e, n, r)
            }, gt.prototype.text = function(t, e) {
                var n = this.nodes.text;
                return new at(n, n.defaultAttrs, t, U.setFrom(e))
            }, gt.prototype.mark = function(t, e) {
                return "string" == typeof t && (t = this.marks[t]), t.create(e)
            }, gt.prototype.nodeFromJSON = function(t) {
                return it.fromJSON(this, t)
            }, gt.prototype.markFromJSON = function(t) {
                return U.fromJSON(this, t)
            }, gt.prototype.nodeType = function(t) {
                var e = this.nodes[t];
                if (!e) throw new RangeError("Unknown node type: " + t);
                return e
            };
            var yt = function(t, e) {
                var n = this;
                this.schema = t, this.rules = e, this.tags = [], this.styles = [], e.forEach(function(t) {
                    t.tag ? n.tags.push(t) : t.style && n.styles.push(t)
                })
            };
            yt.prototype.parse = function(t, e) {
                void 0 === e && (e = {});
                var n = new Ct(this, e, !1);
                return n.addAll(t, null, e.from, e.to), n.finish()
            }, yt.prototype.parseSlice = function(t, e) {
                void 0 === e && (e = {});
                var n = new Ct(this, e, !0);
                return n.addAll(t, null, e.from, e.to), G.maxOpen(n.finish())
            }, yt.prototype.matchTag = function(t, e) {
                for (var n = this, r = 0; r < this.tags.length; r++) {
                    var o = n.tags[r];
                    if (j(t, o.tag) && (void 0 === o.namespace || t.namespaceURI == o.namespace) && (!o.context || e.matchesContext(o.context))) {
                        if (o.getAttrs) {
                            var i = o.getAttrs(t);
                            if (!1 === i) continue;
                            o.attrs = i
                        }
                        return o
                    }
                }
            }, yt.prototype.matchStyle = function(t, e, n) {
                for (var r = this, o = 0; o < this.styles.length; o++) {
                    var i = r.styles[o];
                    if (!(0 != i.style.indexOf(t) || i.context && !n.matchesContext(i.context) || i.style.length > t.length && (61 != i.style.charCodeAt(t.length) || i.style.slice(t.length + 1) != e))) {
                        if (i.getAttrs) {
                            var s = i.getAttrs(e);
                            if (!1 === s) continue;
                            i.attrs = s
                        }
                        return i
                    }
                }
            }, yt.schemaRules = function(t) {
                function e(t) {
                    for (var e = null == t.priority ? 50 : t.priority, r = 0; r < n.length; r++) {
                        var o = n[r];
                        if ((null == o.priority ? 50 : o.priority) < e) break
                    }
                    n.splice(r, 0, t)
                }
                var n = [];
                for (var r in t.marks) ! function(n) {
                    var r = t.marks[n].spec.parseDOM;
                    r && r.forEach(function(t) {
                        e(t = q(t)), t.mark = n
                    })
                }(r);
                for (var o in t.nodes) ! function(n) {
                    var r = t.nodes[o].spec.parseDOM;
                    r && r.forEach(function(t) {
                        e(t = q(t)), t.node = o
                    })
                }();
                return n
            }, yt.fromSchema = function(t) {
                return t.cached.domParser || (t.cached.domParser = new yt(t, yt.schemaRules(t)))
            };
            var wt = {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    canvas: !0,
                    dd: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    figcaption: !0,
                    figure: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    li: !0,
                    noscript: !0,
                    ol: !0,
                    output: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    tfoot: !0,
                    ul: !0
                },
                bt = {
                    head: !0,
                    noscript: !0,
                    object: !0,
                    script: !0,
                    style: !0,
                    title: !0
                },
                St = {
                    ol: !0,
                    ul: !0
                },
                kt = 1,
                xt = 2,
                Mt = function(t, e, n, r, o, i) {
                    this.type = t, this.attrs = e, this.solid = r, this.match = o || (4 & i ? null : t.contentMatch), this.options = i, this.content = [], this.marks = n, this.activeMarks = U.none
                };
            Mt.prototype.findWrapping = function(t) {
                if (!this.match) {
                    if (!this.type) return [];
                    var e = this.type.contentMatch.fillBefore(W.from(t));
                    if (!e) {
                        var n, r = this.type.contentMatch;
                        return (n = r.findWrapping(t.type)) ? (this.match = r, n) : null
                    }
                    this.match = this.type.contentMatch.matchFragment(e)
                }
                return this.match.findWrapping(t.type)
            }, Mt.prototype.finish = function(t) {
                if (!(this.options & kt)) {
                    var e, n = this.content[this.content.length - 1];
                    n && n.isText && (e = /\s+$/.exec(n.text)) && (n.text.length == e[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - e[0].length)))
                }
                var r = W.from(this.content);
                return !t && this.match && (r = r.append(this.match.fillBefore(W.empty, !0))), this.type ? this.type.create(this.attrs, r, this.marks) : r
            };
            var Ct = function(t, e, n) {
                    this.parser = t, this.options = e, this.isOpen = n, this.pendingMarks = [];
                    var r, o = e.topNode,
                        i = B(e.preserveWhitespace) | (n ? 4 : 0);
                    r = o ? new Mt(o.type, o.attrs, U.none, !0, e.topMatch || o.type.contentMatch, i) : n ? new Mt(null, null, U.none, !0, null, i) : new Mt(t.schema.topNodeType, null, U.none, !0, null, i), this.nodes = [r], this.open = 0, this.find = e.findPositions, this.needsBlock = !1
                },
                Ot = {
                    top: {},
                    currentPos: {}
                };
            Ot.top.get = function() {
                return this.nodes[this.open]
            }, Ct.prototype.addDOM = function(t) {
                var e = this;
                if (3 == t.nodeType) this.addTextNode(t);
                else if (1 == t.nodeType) {
                    var n = t.getAttribute("style"),
                        r = n ? this.readStyles(V(n)) : null;
                    if (null != r)
                        for (var o = 0; o < r.length; o++) e.addPendingMark(r[o]);
                    if (this.addElement(t), null != r)
                        for (var i = 0; i < r.length; i++) e.removePendingMark(r[i])
                }
            }, Ct.prototype.addTextNode = function(t) {
                var e = t.nodeValue,
                    n = this.top;
                if ((n.type ? n.type.inlineContent : n.content.length && n.content[0].isInline) || /\S/.test(e)) {
                    if (n.options & kt) n.options & xt || (e = e.replace(/\r?\n|\r/g, " "));
                    else if (e = e.replace(/\s+/g, " "), /^\s/.test(e) && this.open == this.nodes.length - 1) {
                        var r = n.content[n.content.length - 1],
                            o = t.previousSibling;
                        (!r || o && "BR" == o.nodeName || r.isText && /\s$/.test(r.text)) && (e = e.slice(1))
                    }
                    e && this.insertNode(this.parser.schema.text(e)), this.findInText(t)
                } else this.findInside(t)
            }, Ct.prototype.addElement = function(t) {
                var e = t.nodeName.toLowerCase();
                St.hasOwnProperty(e) && F(t);
                var n = this.options.ruleFromNode && this.options.ruleFromNode(t) || this.parser.matchTag(t, this);
                if (n ? n.ignore : bt.hasOwnProperty(e)) this.findInside(t);
                else if (!n || n.skip) {
                    n && n.skip.nodeType && (t = n.skip);
                    var r, o = this.top,
                        i = this.needsBlock;
                    if (wt.hasOwnProperty(e)) r = !0, o.type || (this.needsBlock = !0);
                    else if (!t.firstChild) return void this.leafFallback(t);
                    this.addAll(t), r && this.sync(o), this.needsBlock = i
                } else this.addElementByRule(t, n)
            }, Ct.prototype.leafFallback = function(t) {
                "BR" == t.nodeName && this.top.type && this.top.type.inlineContent && this.addTextNode(t.ownerDocument.createTextNode("\n"))
            }, Ct.prototype.readStyles = function(t) {
                for (var e = this, n = U.none, r = 0; r < t.length; r += 2) {
                    var o = e.parser.matchStyle(t[r], t[r + 1], e);
                    if (o) {
                        if (o.ignore) return null;
                        n = e.parser.schema.marks[o.mark].create(o.attrs).addToSet(n)
                    }
                }
                return n
            }, Ct.prototype.addElementByRule = function(t, e) {
                var n, r, o, i = this;
                e.node ? (r = this.parser.schema.nodes[e.node]).isLeaf ? this.insertNode(r.create(e.attrs)) || this.leafFallback(t) : n = this.enter(r, e.attrs, e.preserveWhitespace) : (o = this.parser.schema.marks[e.mark].create(e.attrs), this.addPendingMark(o));
                var s = this.top;
                if (r && r.isLeaf) this.findInside(t);
                else if (e.getContent) this.findInside(t), e.getContent(t, this.parser.schema).forEach(function(t) {
                    return i.insertNode(t)
                });
                else {
                    var a = e.contentElement;
                    "string" == typeof a ? a = t.querySelector(a) : "function" == typeof a && (a = a(t)), a || (a = t), this.findAround(t, a, !0), this.addAll(a, n)
                }
                n && (this.sync(s), this.open--), o && this.removePendingMark(o)
            }, Ct.prototype.addAll = function(t, e, n, r) {
                for (var o = this, i = n || 0, s = n ? t.childNodes[n] : t.firstChild, a = null == r ? null : t.childNodes[r]; s != a; s = s.nextSibling, ++i) o.findAtPoint(t, i), o.addDOM(s), e && wt.hasOwnProperty(s.nodeName.toLowerCase()) && o.sync(e);
                this.findAtPoint(t, i)
            }, Ct.prototype.findPlace = function(t) {
                for (var e, n, r = this, o = this.open; o >= 0; o--) {
                    var i = r.nodes[o],
                        s = i.findWrapping(t);
                    if (s && (!e || e.length > s.length) && (e = s, n = i, !s.length)) break;
                    if (i.solid) break
                }
                if (!e) return !1;
                this.sync(n);
                for (var a = 0; a < e.length; a++) r.enterInner(e[a], null, !1);
                return !0
            }, Ct.prototype.insertNode = function(t) {
                if (t.isInline && this.needsBlock && !this.top.type) {
                    var e = this.textblockFromContext();
                    e && this.enterInner(e)
                }
                if (this.findPlace(t)) {
                    this.closeExtra();
                    var n = this.top;
                    this.applyPendingMarks(n), n.match && (n.match = n.match.matchType(t.type));
                    for (var r = n.activeMarks, o = 0; o < t.marks.length; o++) n.type && !n.type.allowsMarkType(t.marks[o].type) || (r = t.marks[o].addToSet(r));
                    return n.content.push(t.mark(r)), !0
                }
                return !1
            }, Ct.prototype.applyPendingMarks = function(t) {
                for (var e = this, n = 0; n < this.pendingMarks.length; n++) {
                    var r = e.pendingMarks[n];
                    t.type && !t.type.allowsMarkType(r.type) || r.isInSet(t.activeMarks) || (t.activeMarks = r.addToSet(t.activeMarks), e.pendingMarks.splice(n--, 1))
                }
            }, Ct.prototype.enter = function(t, e, n) {
                var r = this.findPlace(t.create(e));
                return r && (this.applyPendingMarks(this.top), this.enterInner(t, e, !0, n)), r
            }, Ct.prototype.enterInner = function(t, e, n, r) {
                this.closeExtra();
                var o = this.top;
                o.match = o.match && o.match.matchType(t, e);
                var i = null == r ? -5 & o.options : B(r);
                4 & o.options && 0 == o.content.length && (i |= 4), this.nodes.push(new Mt(t, e, o.activeMarks, n, null, i)), this.open++
            }, Ct.prototype.closeExtra = function(t) {
                var e = this,
                    n = this.nodes.length - 1;
                if (n > this.open) {
                    for (; n > this.open; n--) e.nodes[n - 1].content.push(e.nodes[n].finish(t));
                    this.nodes.length = this.open + 1
                }
            }, Ct.prototype.finish = function() {
                return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen)
            }, Ct.prototype.sync = function(t) {
                for (var e = this, n = this.open; n >= 0; n--)
                    if (e.nodes[n] == t) return void(e.open = n)
            }, Ct.prototype.addPendingMark = function(t) {
                this.pendingMarks.push(t)
            }, Ct.prototype.removePendingMark = function(t) {
                var e = this.pendingMarks.lastIndexOf(t);
                if (e > -1) this.pendingMarks.splice(e, 1);
                else {
                    var n = this.top;
                    n.activeMarks = t.removeFromSet(n.activeMarks)
                }
            }, Ot.currentPos.get = function() {
                var t = this;
                this.closeExtra();
                for (var e = 0, n = this.open; n >= 0; n--) {
                    for (var r = t.nodes[n].content, o = r.length - 1; o >= 0; o--) e += r[o].nodeSize;
                    n && e++
                }
                return e
            }, Ct.prototype.findAtPoint = function(t, e) {
                var n = this;
                if (this.find)
                    for (var r = 0; r < this.find.length; r++) n.find[r].node == t && n.find[r].offset == e && (n.find[r].pos = n.currentPos)
            }, Ct.prototype.findInside = function(t) {
                var e = this;
                if (this.find)
                    for (var n = 0; n < this.find.length; n++) null == e.find[n].pos && 1 == t.nodeType && t.contains(e.find[n].node) && (e.find[n].pos = e.currentPos)
            }, Ct.prototype.findAround = function(t, e, n) {
                var r = this;
                if (t != e && this.find)
                    for (var o = 0; o < this.find.length; o++) null == r.find[o].pos && 1 == t.nodeType && t.contains(r.find[o].node) && e.compareDocumentPosition(r.find[o].node) & (n ? 2 : 4) && (r.find[o].pos = r.currentPos)
            }, Ct.prototype.findInText = function(t) {
                var e = this;
                if (this.find)
                    for (var n = 0; n < this.find.length; n++) e.find[n].node == t && (e.find[n].pos = e.currentPos - (t.nodeValue.length - e.find[n].offset))
            }, Ct.prototype.matchesContext = function(t) {
                var e = this;
                if (t.indexOf("|") > -1) return t.split(/\s*\|\s*/).some(this.matchesContext, this);
                var n = t.split("/"),
                    r = this.options.context,
                    o = !(this.isOpen || r && r.parent.type != this.nodes[0].type),
                    i = -(r ? r.depth + 1 : 0) + (o ? 0 : 1),
                    s = function(t, a) {
                        for (; t >= 0; t--) {
                            var c = n[t];
                            if ("" == c) {
                                if (t == n.length - 1 || 0 == t) continue;
                                for (; a >= i; a--)
                                    if (s(t - 1, a)) return !0;
                                return !1
                            }
                            var l = a > 0 || 0 == a && o ? e.nodes[a].type : r && a >= i ? r.node(a - i).type : null;
                            if (!l || l.name != c && -1 == l.groups.indexOf(c)) return !1;
                            a--
                        }
                        return !0
                    };
                return s(n.length - 1, this.open)
            }, Ct.prototype.textblockFromContext = function() {
                var t = this,
                    e = this.options.context;
                if (e)
                    for (var n = e.depth; n >= 0; n--) {
                        var r = e.node(n).contentMatchAt(e.indexAfter(n)).defaultType;
                        if (r && r.isTextblock && r.defaultAttrs) return r
                    }
                for (var o in t.parser.schema.nodes) {
                    var i = t.parser.schema.nodes[o];
                    if (i.isTextblock && i.defaultAttrs) return i
                }
            }, Object.defineProperties(Ct.prototype, Ot);
            var Nt = function(t, e) {
                this.nodes = t || {}, this.marks = e || {}
            };
            Nt.prototype.serializeFragment = function(t, e, n) {
                var r = this;
                void 0 === e && (e = {}), n || (n = L(e).createDocumentFragment());
                var o = n,
                    i = null;
                return t.forEach(function(t) {
                    if (i || t.marks.length) {
                        i || (i = []);
                        for (var n = 0, s = 0; n < i.length && s < t.marks.length;) {
                            var a = t.marks[s];
                            if (r.marks[a.type.name]) {
                                if (!a.eq(i[n]) || !1 === a.type.spec.spanning) break;
                                n += 2, s++
                            } else s++
                        }
                        for (; n < i.length;) o = i.pop(), i.pop();
                        for (; s < t.marks.length;) {
                            var c = t.marks[s++],
                                l = r.serializeMark(c, t.isInline, e);
                            l && (i.push(c, o), o.appendChild(l.dom), o = l.contentDOM || l.dom)
                        }
                    }
                    o.appendChild(r.serializeNode(t, e))
                }), n
            }, Nt.prototype.serializeNode = function(t, e) {
                void 0 === e && (e = {});
                var n = Nt.renderSpec(L(e), this.nodes[t.type.name](t)),
                    r = n.dom,
                    o = n.contentDOM;
                if (o) {
                    if (t.isLeaf) throw new RangeError("Content hole not allowed in a leaf node spec");
                    e.onContent ? e.onContent(t, o, e) : this.serializeFragment(t.content, e, o)
                }
                return r
            }, Nt.prototype.serializeNodeAndMarks = function(t, e) {
                var n = this;
                void 0 === e && (e = {});
                for (var r = this.serializeNode(t, e), o = t.marks.length - 1; o >= 0; o--) {
                    var i = n.serializeMark(t.marks[o], t.isInline, e);
                    i && ((i.contentDOM || i.dom).appendChild(r), r = i.dom)
                }
                return r
            }, Nt.prototype.serializeMark = function(t, e, n) {
                void 0 === n && (n = {});
                var r = this.marks[t.type.name];
                return r && Nt.renderSpec(L(n), r(t, e))
            }, Nt.renderSpec = function(t, e) {
                if ("string" == typeof e) return {
                    dom: t.createTextNode(e)
                };
                if (null != e.nodeType) return {
                    dom: e
                };
                var n = t.createElement(e[0]),
                    r = null,
                    o = e[1],
                    i = 1;
                if (o && "object" == typeof o && null == o.nodeType && !Array.isArray(o)) {
                    i = 2;
                    for (var s in o) null != o[s] && n.setAttribute(s, o[s])
                }
                for (var a = i; a < e.length; a++) {
                    var c = e[a];
                    if (0 === c) {
                        if (a < e.length - 1 || a > i) throw new RangeError("Content hole must be the only child of its parent node");
                        return {
                            dom: n,
                            contentDOM: n
                        }
                    }
                    var l = Nt.renderSpec(t, c),
                        p = l.dom,
                        u = l.contentDOM;
                    if (n.appendChild(p), u) {
                        if (r) throw new RangeError("Multiple content holes");
                        r = u
                    }
                }
                return {
                    dom: n,
                    contentDOM: r
                }
            }, Nt.fromSchema = function(t) {
                return t.cached.domSerializer || (t.cached.domSerializer = new Nt(this.nodesFromSchema(t), this.marksFromSchema(t)))
            }, Nt.nodesFromSchema = function(t) {
                var e = $(t.nodes);
                return e.text || (e.text = function(t) {
                    return t.text
                }), e
            }, Nt.marksFromSchema = function(t) {
                return $(t.marks)
            }, e.Node = it, e.ResolvedPos = X, e.NodeRange = nt, e.Fragment = W, e.Slice = G, e.ReplaceError = a, e.Mark = U, e.Schema = gt, e.NodeType = ft, e.MarkType = vt, e.ContentMatch = ct, e.DOMParser = yt, e.DOMSerializer = Nt
        }), s = t(i), a = i.Node, c = i.ResolvedPos, l = i.NodeRange, p = i.Fragment, u = i.Slice, f = i.ReplaceError, d = i.Mark, h = i.Schema, m = i.NodeType, v = i.MarkType, g = i.ContentMatch, y = i.DOMParser, w = i.DOMSerializer, b = Object.freeze({
            default: s,
            __moduleExports: i,
            Node: a,
            ResolvedPos: c,
            NodeRange: l,
            Fragment: p,
            Slice: u,
            ReplaceError: f,
            Mark: d,
            Schema: h,
            NodeType: m,
            MarkType: v,
            ContentMatch: g,
            DOMParser: y,
            DOMSerializer: w
        }), S = e(function(t, e) {
            function n(t, e) {
                return t + e * P
            }

            function r(t) {
                return t & z
            }

            function o(t) {
                return (t - (t & z)) / P
            }

            function s(t) {
                var e = Error.call(this, t);
                return e.__proto__ = s.prototype, e
            }

            function a() {
                throw new Error("Override me")
            }

            function c(t, e, n) {
                for (var r = t.resolve(e), o = n - e, i = r.depth; o > 0 && i > 0 && r.indexAfter(i) == r.node(i).childCount;) i--, o--;
                if (o > 0)
                    for (var s = r.node(i).maybeChild(r.indexAfter(i)); o > 0;) {
                        if (!s || s.isLeaf) return !0;
                        s = s.firstChild, o--
                    }
                return !1
            }

            function l(t, e, n) {
                return (0 == e || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n))
            }

            function p(t) {
                return {
                    type: t,
                    attrs: null
                }
            }

            function u(t, e) {
                var n = t.parent,
                    r = t.startIndex,
                    o = t.endIndex,
                    i = n.contentMatchAt(r).findWrapping(e);
                if (!i) return null;
                var s = i.length ? i[0] : e;
                return n.canReplaceWith(r, o, s) ? i : null
            }

            function f(t, e) {
                var n = t.parent,
                    r = t.startIndex,
                    o = t.endIndex,
                    i = n.child(r),
                    s = e.contentMatch.findWrapping(i.type);
                if (!s) return null;
                for (var a = (s.length ? s[s.length - 1] : e).contentMatch, c = r; a && c < o; c++) a = a.matchType(n.child(c).type);
                return a && a.validEnd ? s : null
            }

            function d(t, e, n) {
                var r = t.resolve(e),
                    o = r.index();
                return r.parent.canReplaceWith(o, o + 1, n)
            }

            function h(t, e) {
                return t && e && !t.isLeaf && t.canAppend(e)
            }

            function m(t, e, n) {
                var r = t.resolve(e);
                if (r.parent.canReplaceWith(r.index(), r.index(), n)) return e;
                if (0 == r.parentOffset)
                    for (var o = r.depth - 1; o >= 0; o--) {
                        var i = r.index(o);
                        if (r.node(o).canReplaceWith(i, i, n)) return r.before(o + 1);
                        if (i > 0) return null
                    }
                if (r.parentOffset == r.parent.content.size)
                    for (var s = r.depth - 1; s >= 0; s--) {
                        var a = r.indexAfter(s);
                        if (r.node(s).canReplaceWith(a, a, n)) return r.after(s + 1);
                        if (a < r.node(s).childCount) return null
                    }
            }

            function v(t, e, n) {
                for (var r = [], o = 0; o < t.childCount; o++) {
                    var s = t.child(o);
                    s.content.size && (s = s.copy(v(s.content, e, s))), s.isInline && (s = e(s, n, o)), r.push(s)
                }
                return i.Fragment.fromArray(r)
            }

            function g(t, e, n, r) {
                if (void 0 === n && (n = e), void 0 === r && (r = i.Slice.empty), e == n && !r.size) return null;
                var o = t.resolve(e),
                    s = t.resolve(n);
                if (C(o, s, r)) return new J(e, n, r);
                var a = w(o, T(o, r)),
                    c = M(o, s, a);
                if (!c) return null;
                if (a.size != c.size && O(o, s, a)) {
                    for (var l = s.depth, p = s.after(l); l > 1 && p == s.end(--l);) ++p;
                    var u = M(o, t.resolve(p), a);
                    if (u) return new W(e, p, n, s.end(), u, a.size)
                }
                return c.size || e != n ? new J(e, n, c) : null
            }

            function y(t, e, n, r) {
                var o = i.Fragment.empty,
                    s = 0,
                    a = n[e];
                if (t.depth > e) {
                    var c = y(t, e + 1, n, r || a);
                    s = c.openEnd + 1, o = i.Fragment.from(t.node(e + 1).copy(c.content))
                }
                return a && (o = o.append(a.content), s = a.openEnd), r && (o = o.append(t.node(e).contentMatchAt(t.indexAfter(e)).fillBefore(i.Fragment.empty, !0)), s = 0), {
                    content: o,
                    openEnd: s
                }
            }

            function w(t, e) {
                var n = y(t, 0, e, !1),
                    r = n.content,
                    o = n.openEnd;
                return new i.Slice(r, t.depth, o || 0)
            }

            function b(t, e, n, r, o, i, s) {
                var a, c = t.childCount,
                    l = c - (s > 0 ? 1 : 0),
                    p = i < 0 ? e : n.node(o);
                a = i < 0 ? p.contentMatchAt(l) : 1 == c && s > 0 ? p.contentMatchAt(i ? n.index(o) : n.indexAfter(o)) : p.contentMatchAt(n.indexAfter(o)).matchFragment(t, c > 0 && i ? 1 : 0, l);
                var u = r.node(o);
                if (s > 0 && o < r.depth) {
                    var f = u.content.cutByIndex(r.indexAfter(o)).addToStart(t.lastChild),
                        d = a.fillBefore(f, !0);
                    if (d && d.size && i > 0 && 1 == c && (d = null), d) {
                        var h = b(t.lastChild.content, t.lastChild, n, r, o + 1, 1 == c ? i - 1 : -1, s - 1);
                        if (h) {
                            var m = t.lastChild.copy(h);
                            return d.size ? t.cutByIndex(0, c - 1).append(d).addToEnd(m) : t.replaceChild(c - 1, m)
                        }
                    }
                }
                s > 0 && (a = a.matchType((1 == c && i > 0 ? n.node(o + 1) : t.lastChild).type));
                var v = r.index(o);
                if (v == u.childCount && !u.type.compatibleContent(e.type)) return null;
                for (var g = a.fillBefore(u.content, !0, v), y = v; g && y < u.content.childCount; y++) p.type.allowsMarks(u.content.child(y).marks) || (g = null);
                if (!g) return null;
                if (s > 0) {
                    var w = S(t.lastChild, s - 1, n, o + 1, 1 == c ? i - 1 : -1);
                    t = t.replaceChild(c - 1, w)
                }
                return t = t.append(g), r.depth > o && (t = t.addToEnd(k(r, o + 1))), t
            }

            function S(t, e, n, r, o) {
                var s, a = t.content,
                    c = a.childCount;
                if (s = o >= 0 ? n.node(r).contentMatchAt(n.indexAfter(r)).matchFragment(a, o > 0 ? 1 : 0, c) : t.contentMatchAt(c), e > 0) {
                    var l = S(a.lastChild, e - 1, n, r + 1, 1 == c ? o - 1 : -1);
                    a = a.replaceChild(c - 1, l)
                }
                return t.copy(a.append(s.fillBefore(i.Fragment.empty, !0)))
            }

            function k(t, e) {
                var n = t.node(e),
                    r = n.contentMatchAt(0).fillBefore(n.content, !0, t.index(e));
                return t.depth > e && (r = r.addToEnd(k(t, e + 1))), n.copy(r)
            }

            function x(t, e, n) {
                for (; e > 0 && n > 0 && 1 == t.childCount;) t = t.firstChild.content, e--, n--;
                return new i.Slice(t, e, n)
            }

            function M(t, e, n) {
                var r = b(n.content, t.node(0), t, e, 0, n.openStart, n.openEnd);
                return r ? x(r, n.openStart, e.depth) : null
            }

            function C(t, e, n) {
                return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content)
            }

            function O(t, e, n) {
                if (!e.parent.isTextblock) return !1;
                var r = n.openEnd ? N(n.content, n.openEnd) : t.node(t.depth - (n.openStart - n.openEnd));
                if (!r.isTextblock) return !1;
                for (var o = e.index(); o < e.parent.childCount; o++)
                    if (!r.type.allowsMarks(e.parent.child(o).marks)) return !1;
                var i;
                return n.openEnd ? i = r.contentMatchAt(r.childCount) : (i = r.contentMatchAt(r.childCount), n.size && (i = i.matchFragment(n.content, n.openStart ? 1 : 0))), (i = i.matchFragment(e.parent.content, e.index())) && i.validEnd
            }

            function N(t, e) {
                for (var n = 1; n < e; n++) t = t.lastChild.content;
                return t.lastChild
            }

            function T(t, e) {
                for (var n = new U(t), r = 1; e.size && r <= 3; r++) {
                    var o = n.placeSlice(e.content, e.openStart, e.openEnd, r);
                    3 == r && o != e && o.size && (r = 0), e = o
                }
                for (; n.open.length;) n.closeNode();
                return n.placed
            }

            function D(t, e, n) {
                var r = t.content;
                if (e > 1) {
                    var o = D(t.firstChild, e - 1, 1 == t.childCount ? n - 1 : 0);
                    r = t.content.replaceChild(0, o)
                }
                var i = t.type.contentMatch.fillBefore(r, 0 == n);
                return t.copy(i.append(r))
            }

            function E(t, e) {
                var n = t.content;
                if (e > 1) {
                    var r = E(t.lastChild, e - 1);
                    n = t.content.replaceChild(t.childCount - 1, r)
                }
                var o = t.contentMatchAt(t.childCount).fillBefore(i.Fragment.empty, !0);
                return t.copy(n.append(o))
            }

            function A(t, e) {
                return e ? t.replaceChild(t.childCount - 1, E(t.lastChild, e)) : t
            }

            function I(t, e, n, r, o) {
                if (e < n) {
                    var i = t.firstChild;
                    t = t.replaceChild(0, i.copy(I(i.content, e + 1, n, r, i)))
                }
                return e > r && (t = o.contentMatchAt(0).fillBefore(t, !0).append(t)), t
            }

            function R(t, e) {
                for (var n = [], r = Math.min(t.depth, e.depth); r >= 0; r--) {
                    var o = t.start(r);
                    if (o < t.pos - (t.depth - r) || e.end(r) > e.pos + (e.depth - r) || t.node(r).type.spec.isolating || e.node(r).type.spec.isolating) break;
                    o == e.start(r) && n.push(r)
                }
                return n
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var z = 65535,
                P = Math.pow(2, 16),
                _ = function(t, e, n) {
                    void 0 === e && (e = !1), void 0 === n && (n = null), this.pos = t, this.deleted = e, this.recover = n
                },
                B = function(t, e) {
                    void 0 === e && (e = !1), this.ranges = t, this.inverted = e
                };
            B.prototype.recover = function(t) {
                var e = this,
                    n = 0,
                    i = r(t);
                if (!this.inverted)
                    for (var s = 0; s < i; s++) n += e.ranges[3 * s + 2] - e.ranges[3 * s + 1];
                return this.ranges[3 * i] + n + o(t)
            }, B.prototype.mapResult = function(t, e) {
                return void 0 === e && (e = 1), this._map(t, e, !1)
            }, B.prototype.map = function(t, e) {
                return void 0 === e && (e = 1), this._map(t, e, !0)
            }, B.prototype._map = function(t, e, r) {
                for (var o = this, i = 0, s = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2, c = 0; c < this.ranges.length; c += 3) {
                    var l = o.ranges[c] - (o.inverted ? i : 0);
                    if (l > t) break;
                    var p = o.ranges[c + s],
                        u = o.ranges[c + a],
                        f = l + p;
                    if (t <= f) {
                        var d = l + i + ((p ? t == l ? -1 : t == f ? 1 : e : e) < 0 ? 0 : u);
                        if (r) return d;
                        var h = n(c / 3, t - l);
                        return new _(d, e < 0 ? t != l : t != f, h)
                    }
                    i += u - p
                }
                return r ? t + i : new _(t + i)
            }, B.prototype.touches = function(t, e) {
                for (var n = this, o = 0, i = r(e), s = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2, c = 0; c < this.ranges.length; c += 3) {
                    var l = n.ranges[c] - (n.inverted ? o : 0);
                    if (l > t) break;
                    var p = n.ranges[c + s];
                    if (t <= l + p && c == 3 * i) return !0;
                    o += n.ranges[c + a] - p
                }
                return !1
            }, B.prototype.forEach = function(t) {
                for (var e = this, n = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2, o = 0, i = 0; o < this.ranges.length; o += 3) {
                    var s = e.ranges[o],
                        a = s - (e.inverted ? i : 0),
                        c = s + (e.inverted ? 0 : i),
                        l = e.ranges[o + n],
                        p = e.ranges[o + r];
                    t(a, a + l, c, c + p), i += p - l
                }
            }, B.prototype.invert = function() {
                return new B(this.ranges, !this.inverted)
            }, B.prototype.toString = function() {
                return (this.inverted ? "-" : "") + JSON.stringify(this.ranges)
            }, B.offset = function(t) {
                return 0 == t ? B.empty : new B(t < 0 ? [0, -t, 0] : [0, 0, t])
            }, B.empty = new B([]);
            var F = function(t, e, n, r) {
                this.maps = t || [], this.from = n || 0, this.to = null == r ? this.maps.length : r, this.mirror = e
            };
            F.prototype.slice = function(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.maps.length), new F(this.maps, this.mirror, t, e)
            }, F.prototype.copy = function() {
                return new F(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to)
            }, F.prototype.appendMap = function(t, e) {
                this.to = this.maps.push(t), null != e && this.setMirror(this.maps.length - 1, e)
            }, F.prototype.appendMapping = function(t) {
                for (var e = this, n = 0, r = this.maps.length; n < t.maps.length; n++) {
                    var o = t.getMirror(n);
                    e.appendMap(t.maps[n], null != o && o < n ? r + o : null)
                }
            }, F.prototype.getMirror = function(t) {
                var e = this;
                if (this.mirror)
                    for (var n = 0; n < this.mirror.length; n++)
                        if (e.mirror[n] == t) return e.mirror[n + (n % 2 ? -1 : 1)]
            }, F.prototype.setMirror = function(t, e) {
                this.mirror || (this.mirror = []), this.mirror.push(t, e)
            }, F.prototype.appendMappingInverted = function(t) {
                for (var e = this, n = t.maps.length - 1, r = this.maps.length + t.maps.length; n >= 0; n--) {
                    var o = t.getMirror(n);
                    e.appendMap(t.maps[n].invert(), null != o && o > n ? r - o - 1 : null)
                }
            }, F.prototype.invert = function() {
                var t = new F;
                return t.appendMappingInverted(this), t
            }, F.prototype.map = function(t, e) {
                var n = this;
                if (void 0 === e && (e = 1), this.mirror) return this._map(t, e, !0);
                for (var r = this.from; r < this.to; r++) t = n.maps[r].map(t, e);
                return t
            }, F.prototype.mapResult = function(t, e) {
                return void 0 === e && (e = 1), this._map(t, e, !1)
            }, F.prototype._map = function(t, e, n) {
                for (var r = this, o = !1, i = null, s = this.from; s < this.to; s++) {
                    var a = r.maps[s],
                        c = i && i[s];
                    if (null != c && a.touches(t, c)) t = a.recover(c);
                    else {
                        var l = a.mapResult(t, e);
                        if (null != l.recover) {
                            var p = r.getMirror(s);
                            if (null != p && p > s && p < r.to) {
                                if (l.deleted) {
                                    s = p, t = r.maps[p].recover(l.recover);
                                    continue
                                }(i || (i = Object.create(null)))[p] = l.recover
                            }
                        }
                        l.deleted && (o = !0), t = l.pos
                    }
                }
                return n ? t : new _(t, o)
            }, s.prototype = Object.create(Error.prototype), s.prototype.constructor = s, s.prototype.name = "TransformError";
            var j = function(t) {
                    this.doc = t, this.steps = [], this.docs = [], this.mapping = new F
                },
                V = {
                    before: {},
                    docChanged: {}
                };
            V.before.get = function() {
                return this.docs.length ? this.docs[0] : this.doc
            }, j.prototype.step = function(t) {
                var e = this.maybeStep(t);
                if (e.failed) throw new s(e.failed);
                return this
            }, j.prototype.maybeStep = function(t) {
                var e = t.apply(this.doc);
                return e.failed || this.addStep(t, e.doc), e
            }, V.docChanged.get = function() {
                return this.steps.length > 0
            }, j.prototype.addStep = function(t, e) {
                this.docs.push(this.doc), this.steps.push(t), this.mapping.appendMap(t.getMap()), this.doc = e
            }, Object.defineProperties(j.prototype, V);
            var q = Object.create(null),
                $ = function() {};
            $.prototype.apply = function(t) {
                return a()
            }, $.prototype.getMap = function() {
                return B.empty
            }, $.prototype.invert = function(t) {
                return a()
            }, $.prototype.map = function(t) {
                return a()
            }, $.prototype.merge = function(t) {
                return null
            }, $.prototype.toJSON = function() {
                return a()
            }, $.fromJSON = function(t, e) {
                if (!e || !e.stepType) throw new RangeError("Invalid input for Step.fromJSON");
                var n = q[e.stepType];
                if (!n) throw new RangeError("No step type " + e.stepType + " defined");
                return n.fromJSON(t, e)
            }, $.jsonID = function(t, e) {
                if (t in q) throw new RangeError("Duplicate use of step JSON ID " + t);
                return q[t] = e, e.prototype.jsonID = t, e
            };
            var L = function(t, e) {
                this.doc = t, this.failed = e
            };
            L.ok = function(t) {
                return new L(t, null)
            }, L.fail = function(t) {
                return new L(null, t)
            }, L.fromReplace = function(t, e, n, r) {
                try {
                    return L.ok(t.replace(e, n, r))
                } catch (t) {
                    if (t instanceof i.ReplaceError) return L.fail(t.message);
                    throw t
                }
            };
            var J = function(t) {
                function e(e, n, r, o) {
                    t.call(this), this.from = e, this.to = n, this.slice = r, this.structure = !!o
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.apply = function(t) {
                    return this.structure && c(t, this.from, this.to) ? L.fail("Structure replace would overwrite content") : L.fromReplace(t, this.from, this.to, this.slice)
                }, e.prototype.getMap = function() {
                    return new B([this.from, this.to - this.from, this.slice.size])
                }, e.prototype.invert = function(t) {
                    return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to))
                }, e.prototype.map = function(t) {
                    var n = t.mapResult(this.from, 1),
                        r = t.mapResult(this.to, -1);
                    return n.deleted && r.deleted ? null : new e(n.pos, Math.max(n.pos, r.pos), this.slice)
                }, e.prototype.merge = function(t) {
                    if (!(t instanceof e) || t.structure != this.structure) return null;
                    if (this.from + this.slice.size != t.from || this.slice.openEnd || t.slice.openStart) {
                        if (t.to != this.from || this.slice.openStart || t.slice.openEnd) return null;
                        var n = this.slice.size + t.slice.size == 0 ? i.Slice.empty : new i.Slice(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
                        return new e(t.from, this.to, n, this.structure)
                    }
                    var r = this.slice.size + t.slice.size == 0 ? i.Slice.empty : new i.Slice(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
                    return new e(this.from, this.to + (t.to - t.from), r, this.structure)
                }, e.prototype.toJSON = function() {
                    var t = {
                        stepType: "replace",
                        from: this.from,
                        to: this.to
                    };
                    return this.slice.size && (t.slice = this.slice.toJSON()), this.structure && (t.structure = !0), t
                }, e.fromJSON = function(t, n) {
                    if ("number" != typeof n.from || "number" != typeof n.to) throw new RangeError("Invalid input for ReplaceStep.fromJSON");
                    return new e(n.from, n.to, i.Slice.fromJSON(t, n.slice), !!n.structure)
                }, e
            }($);
            $.jsonID("replace", J);
            var W = function(t) {
                function e(e, n, r, o, i, s, a) {
                    t.call(this), this.from = e, this.to = n, this.gapFrom = r, this.gapTo = o, this.slice = i, this.insert = s, this.structure = !!a
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.apply = function(t) {
                    if (this.structure && (c(t, this.from, this.gapFrom) || c(t, this.gapTo, this.to))) return L.fail("Structure gap-replace would overwrite content");
                    var e = t.slice(this.gapFrom, this.gapTo);
                    if (e.openStart || e.openEnd) return L.fail("Gap is not a flat range");
                    var n = this.slice.insertAt(this.insert, e.content);
                    return n ? L.fromReplace(t, this.from, this.to, n) : L.fail("Content does not fit in gap")
                }, e.prototype.getMap = function() {
                    return new B([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
                }, e.prototype.invert = function(t) {
                    var n = this.gapTo - this.gapFrom;
                    return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure)
                }, e.prototype.map = function(t) {
                    var n = t.mapResult(this.from, 1),
                        r = t.mapResult(this.to, -1),
                        o = t.map(this.gapFrom, -1),
                        i = t.map(this.gapTo, 1);
                    return n.deleted && r.deleted || o < n.pos || i > r.pos ? null : new e(n.pos, r.pos, o, i, this.slice, this.insert, this.structure)
                }, e.prototype.toJSON = function() {
                    var t = {
                        stepType: "replaceAround",
                        from: this.from,
                        to: this.to,
                        gapFrom: this.gapFrom,
                        gapTo: this.gapTo,
                        insert: this.insert
                    };
                    return this.slice.size && (t.slice = this.slice.toJSON()), this.structure && (t.structure = !0), t
                }, e.fromJSON = function(t, n) {
                    if ("number" != typeof n.from || "number" != typeof n.to || "number" != typeof n.gapFrom || "number" != typeof n.gapTo || "number" != typeof n.insert) throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
                    return new e(n.from, n.to, n.gapFrom, n.gapTo, i.Slice.fromJSON(t, n.slice), n.insert, !!n.structure)
                }, e
            }($);
            $.jsonID("replaceAround", W), j.prototype.lift = function(t, e) {
                for (var n = t.$from, r = t.$to, o = t.depth, s = n.before(o + 1), a = r.after(o + 1), c = s, l = a, p = i.Fragment.empty, u = 0, f = o, d = !1; f > e; f--) d || n.index(f) > 0 ? (d = !0, p = i.Fragment.from(n.node(f).copy(p)), u++) : c--;
                for (var h = i.Fragment.empty, m = 0, v = o, g = !1; v > e; v--) g || r.after(v + 1) < r.end(v) ? (g = !0, h = i.Fragment.from(r.node(v).copy(h)), m++) : l++;
                return this.step(new W(c, l, s, a, new i.Slice(p.append(h), u, m), p.size - u, !0))
            }, j.prototype.wrap = function(t, e) {
                for (var n = i.Fragment.empty, r = e.length - 1; r >= 0; r--) n = i.Fragment.from(e[r].type.create(e[r].attrs, n));
                var o = t.start,
                    s = t.end;
                return this.step(new W(o, s, o, s, new i.Slice(n, 0, 0), e.length, !0))
            }, j.prototype.setBlockType = function(t, e, n, r) {
                var o = this;
                if (void 0 === e && (e = t), !n.isTextblock) throw new RangeError("Type given to setBlockType should be a textblock");
                var s = this.steps.length;
                return this.doc.nodesBetween(t, e, function(t, e) {
                    if (t.isTextblock && !t.hasMarkup(n, r) && d(o.doc, o.mapping.slice(s).map(e), n)) {
                        o.clearIncompatible(o.mapping.slice(s).map(e, 1), n);
                        var a = o.mapping.slice(s),
                            c = a.map(e, 1),
                            l = a.map(e + t.nodeSize, 1);
                        return o.step(new W(c, l, c + 1, l - 1, new i.Slice(i.Fragment.from(n.create(r, null, t.marks)), 0, 0), 1, !0)), !1
                    }
                }), this
            }, j.prototype.setNodeMarkup = function(t, e, n, r) {
                var o = this.doc.nodeAt(t);
                if (!o) throw new RangeError("No node at given position");
                e || (e = o.type);
                var s = e.create(n, null, r || o.marks);
                if (o.isLeaf) return this.replaceWith(t, t + o.nodeSize, s);
                if (!e.validContent(o.content)) throw new RangeError("Invalid content for node type " + e.name);
                return this.step(new W(t, t + o.nodeSize, t + 1, t + o.nodeSize - 1, new i.Slice(i.Fragment.from(s), 0, 0), 1, !0))
            }, j.prototype.split = function(t, e, n) {
                void 0 === e && (e = 1);
                for (var r = this.doc.resolve(t), o = i.Fragment.empty, s = i.Fragment.empty, a = r.depth, c = r.depth - e, l = e - 1; a > c; a--, l--) {
                    o = i.Fragment.from(r.node(a).copy(o));
                    var p = n && n[l];
                    s = i.Fragment.from(p ? p.type.create(p.attrs, s) : r.node(a).copy(s))
                }
                return this.step(new J(t, t, new i.Slice(o.append(s), e, e), !0))
            }, j.prototype.join = function(t, e) {
                void 0 === e && (e = 1);
                var n = new J(t - e, t + e, i.Slice.empty, !0);
                return this.step(n)
            };
            var K = function(t) {
                function e(e, n, r) {
                    t.call(this), this.from = e, this.to = n, this.mark = r
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.apply = function(t) {
                    var e = this,
                        n = t.slice(this.from, this.to),
                        r = t.resolve(this.from),
                        o = r.node(r.sharedDepth(this.to)),
                        s = new i.Slice(v(n.content, function(t, n) {
                            return n.type.allowsMarkType(e.mark.type) ? t.mark(e.mark.addToSet(t.marks)) : t
                        }, o), n.openStart, n.openEnd);
                    return L.fromReplace(t, this.from, this.to, s)
                }, e.prototype.invert = function() {
                    return new H(this.from, this.to, this.mark)
                }, e.prototype.map = function(t) {
                    var n = t.mapResult(this.from, 1),
                        r = t.mapResult(this.to, -1);
                    return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
                }, e.prototype.merge = function(t) {
                    if (t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from) return new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark)
                }, e.prototype.toJSON = function() {
                    return {
                        stepType: "addMark",
                        mark: this.mark.toJSON(),
                        from: this.from,
                        to: this.to
                    }
                }, e.fromJSON = function(t, n) {
                    if ("number" != typeof n.from || "number" != typeof n.to) throw new RangeError("Invalid input for AddMarkStep.fromJSON");
                    return new e(n.from, n.to, t.markFromJSON(n.mark))
                }, e
            }($);
            $.jsonID("addMark", K);
            var H = function(t) {
                function e(e, n, r) {
                    t.call(this), this.from = e, this.to = n, this.mark = r
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.apply = function(t) {
                    var e = this,
                        n = t.slice(this.from, this.to),
                        r = new i.Slice(v(n.content, function(t) {
                            return t.mark(e.mark.removeFromSet(t.marks))
                        }), n.openStart, n.openEnd);
                    return L.fromReplace(t, this.from, this.to, r)
                }, e.prototype.invert = function() {
                    return new K(this.from, this.to, this.mark)
                }, e.prototype.map = function(t) {
                    var n = t.mapResult(this.from, 1),
                        r = t.mapResult(this.to, -1);
                    return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark)
                }, e.prototype.merge = function(t) {
                    if (t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from) return new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark)
                }, e.prototype.toJSON = function() {
                    return {
                        stepType: "removeMark",
                        mark: this.mark.toJSON(),
                        from: this.from,
                        to: this.to
                    }
                }, e.fromJSON = function(t, n) {
                    if ("number" != typeof n.from || "number" != typeof n.to) throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
                    return new e(n.from, n.to, t.markFromJSON(n.mark))
                }, e
            }($);
            $.jsonID("removeMark", H), j.prototype.addMark = function(t, e, n) {
                var r = this,
                    o = [],
                    i = [],
                    s = null,
                    a = null;
                return this.doc.nodesBetween(t, e, function(r, c, l) {
                    if (r.isInline) {
                        var p = r.marks;
                        if (!n.isInSet(p) && l.type.allowsMarkType(n.type)) {
                            for (var u = Math.max(c, t), f = Math.min(c + r.nodeSize, e), d = n.addToSet(p), h = 0; h < p.length; h++) p[h].isInSet(d) || (s && s.to == u && s.mark.eq(p[h]) ? s.to = f : o.push(s = new H(u, f, p[h])));
                            a && a.to == u ? a.to = f : i.push(a = new K(u, f, n))
                        }
                    }
                }), o.forEach(function(t) {
                    return r.step(t)
                }), i.forEach(function(t) {
                    return r.step(t)
                }), this
            }, j.prototype.removeMark = function(t, e, n) {
                var r = this;
                void 0 === n && (n = null);
                var o = [],
                    s = 0;
                return this.doc.nodesBetween(t, e, function(r, a) {
                    if (r.isInline) {
                        s++;
                        var c = null;
                        if (n instanceof i.MarkType) {
                            var l = n.isInSet(r.marks);
                            l && (c = [l])
                        } else n ? n.isInSet(r.marks) && (c = [n]) : c = r.marks;
                        if (c && c.length)
                            for (var p = Math.min(a + r.nodeSize, e), u = 0; u < c.length; u++) {
                                for (var f = c[u], d = void 0, h = 0; h < o.length; h++) {
                                    var m = o[h];
                                    m.step == s - 1 && f.eq(o[h].style) && (d = m)
                                }
                                d ? (d.to = p, d.step = s) : o.push({
                                    style: f,
                                    from: Math.max(a, t),
                                    to: p,
                                    step: s
                                })
                            }
                    }
                }), o.forEach(function(t) {
                    return r.step(new H(t.from, t.to, t.style))
                }), this
            }, j.prototype.clearIncompatible = function(t, e, n) {
                var r = this;
                void 0 === n && (n = e.contentMatch);
                for (var o = this.doc.nodeAt(t), s = [], a = t + 1, c = 0; c < o.childCount; c++) {
                    var l = o.child(c),
                        p = a + l.nodeSize,
                        u = n.matchType(l.type, l.attrs);
                    if (u) {
                        n = u;
                        for (var f = 0; f < l.marks.length; f++) e.allowsMarkType(l.marks[f].type) || r.step(new H(a, p, l.marks[f]))
                    } else s.push(new J(a, p, i.Slice.empty));
                    a = p
                }
                if (!n.validEnd) {
                    var d = n.fillBefore(i.Fragment.empty, !0);
                    this.replace(a, a, new i.Slice(d, 0, 0))
                }
                for (var h = s.length - 1; h >= 0; h--) r.step(s[h]);
                return this
            }, j.prototype.replace = function(t, e, n) {
                void 0 === e && (e = t), void 0 === n && (n = i.Slice.empty);
                var r = g(this.doc, t, e, n);
                return r && this.step(r), this
            }, j.prototype.replaceWith = function(t, e, n) {
                return this.replace(t, e, new i.Slice(i.Fragment.from(n), 0, 0))
            }, j.prototype.delete = function(t, e) {
                return this.replace(t, e, i.Slice.empty)
            }, j.prototype.insert = function(t, e) {
                return this.replaceWith(t, t, e)
            };
            var U = function(t) {
                var e = this;
                this.open = [];
                for (var n = 0; n <= t.depth; n++) {
                    var r = t.node(n),
                        o = r.contentMatchAt(t.indexAfter(n));
                    e.open.push({
                        parent: r,
                        match: o,
                        content: i.Fragment.empty,
                        wrapper: !1,
                        openEnd: 0,
                        depth: n
                    })
                }
                this.placed = []
            };
            U.prototype.placeSlice = function(t, e, n, r, o) {
                if (e > 0) {
                    var s = t.firstChild,
                        a = this.placeSlice(s.content, Math.max(0, e - 1), n && 1 == t.childCount ? n - 1 : 0, r, s);
                    a.content != s.content && (a.content.size ? (t = t.replaceChild(0, s.copy(a.content)), e = a.openStart + 1) : (1 == t.childCount && (n = 0), t = t.cutByIndex(1), e = 0))
                }
                var c = this.placeContent(t, e, n, r, o);
                if (r > 2 && c.size && 0 == e) {
                    var l = c.content.firstChild,
                        p = 1 == c.content.childCount;
                    this.placeContent(l.content, 0, n && p ? n - 1 : 0, r, l), c = p ? i.Fragment.empty : new i.Slice(c.content.cutByIndex(1), 0, n)
                }
                return c
            }, U.prototype.placeContent = function(t, e, n, r, o) {
                for (var s = this, a = 0; a < t.childCount; a++) {
                    for (var c = t.child(a), l = !1, p = a == t.childCount - 1, u = this.open.length - 1; u >= 0; u--) {
                        var f = s.open[u],
                            d = void 0;
                        if (r > 1 && (d = f.match.findWrapping(c.type)) && (!o || !d.length || d[d.length - 1] != o.type)) {
                            for (; this.open.length - 1 > u;) s.closeNode();
                            for (var h = 0; h < d.length; h++) f.match = f.match.matchType(d[h]), u++, f = {
                                parent: d[h].create(),
                                match: d[h].contentMatch,
                                content: i.Fragment.empty,
                                wrapper: !0,
                                openEnd: 0,
                                depth: u + h
                            }, s.open.push(f)
                        }
                        var m = f.match.matchType(c.type);
                        if (!m) {
                            var v = f.match.fillBefore(i.Fragment.from(c));
                            if (!v) {
                                if (o && f.match.matchType(o.type)) break;
                                continue
                            }
                            for (var g = 0; g < v.childCount; g++) {
                                var y = v.child(g);
                                s.addNode(f, y, 0), m = f.match.matchFragment(y)
                            }
                        }
                        for (; this.open.length - 1 > u;) s.closeNode();
                        c = c.mark(f.parent.type.allowedMarks(c.marks)), e && (c = D(c, e, p ? n : 0), e = 0), s.addNode(f, c, p ? n : 0), f.match = m, p && (n = 0), l = !0;
                        break
                    }
                    if (!l) break
                }
                return this.open.length > 1 && (a > 0 && a == t.childCount || o && this.open[this.open.length - 1].parent.type == o.type) && this.closeNode(), new i.Slice(t.cutByIndex(a), e, n)
            }, U.prototype.addNode = function(t, e, n) {
                t.content = A(t.content, t.openEnd).addToEnd(e), t.openEnd = n
            }, U.prototype.closeNode = function() {
                var t = this.open.pop();
                0 == t.content.size || (t.wrapper ? this.addNode(this.open[this.open.length - 1], t.parent.copy(t.content), t.openEnd + 1) : this.placed[t.depth] = {
                    depth: t.depth,
                    content: t.content,
                    openEnd: t.openEnd
                })
            }, j.prototype.replaceRange = function(t, e, n) {
                var r = this;
                if (!n.size) return this.deleteRange(t, e);
                var o = this.doc.resolve(t),
                    s = this.doc.resolve(e);
                if (C(o, s, n)) return this.step(new J(t, e, n));
                var a = R(o, this.doc.resolve(e));
                0 == a[a.length - 1] && a.pop();
                var c = -(o.depth + 1);
                a.unshift(c);
                for (var l = o.depth, p = o.pos - 1; l > 0; l--, p--) {
                    var u = o.node(l).type.spec;
                    if (u.defining || u.isolating) break;
                    a.indexOf(l) > -1 ? c = l : o.before(l) == p && a.splice(1, 0, -l)
                }
                for (var f = a.indexOf(c), d = [], h = n.openStart, m = n.content, v = 0;; v++) {
                    var g = m.firstChild;
                    if (d.push(g), v == n.openStart) break;
                    m = g.content
                }
                h > 0 && d[h - 1].type.spec.defining && o.node(f).type != d[h - 1].type ? h -= 1 : h >= 2 && d[h - 1].isTextblock && d[h - 2].type.spec.defining && o.node(f).type != d[h - 2].type && (h -= 2);
                for (var y = n.openStart; y >= 0; y--) {
                    var w = (y + h + 1) % (n.openStart + 1),
                        b = d[w];
                    if (b)
                        for (var S = 0; S < a.length; S++) {
                            var k = a[(S + f) % a.length],
                                x = !0;
                            k < 0 && (x = !1, k = -k);
                            var M = o.node(k - 1),
                                O = o.index(k - 1);
                            if (M.canReplaceWith(O, O, b.type, b.marks)) return r.replace(o.before(k), x ? s.after(k) : e, new i.Slice(I(n.content, 0, n.openStart, w), w, n.openEnd))
                        }
                }
                for (var N = this.steps.length, T = a.length - 1; T >= 0 && (r.replace(t, e, n), !(r.steps.length > N)); T--) {
                    var D = a[T];
                    T < 0 || (t = o.before(D), e = s.after(D))
                }
                return this
            }, j.prototype.replaceRangeWith = function(t, e, n) {
                if (!n.isInline && t == e && this.doc.resolve(t).parent.content.size) {
                    var r = m(this.doc, t, n.type);
                    null != r && (t = e = r)
                }
                return this.replaceRange(t, e, new i.Slice(i.Fragment.from(n), 0, 0))
            }, j.prototype.deleteRange = function(t, e) {
                for (var n = this, r = this.doc.resolve(t), o = this.doc.resolve(e), i = R(r, o), s = 0; s < i.length; s++) {
                    var a = i[s],
                        c = s == i.length - 1;
                    if (c && 0 == a || r.node(a).type.contentMatch.validEnd) return n.delete(r.start(a), o.end(a));
                    if (a > 0 && (c || r.node(a - 1).canReplace(r.index(a - 1), o.indexAfter(a - 1)))) return n.delete(r.before(a), o.after(a))
                }
                for (var l = 1; l <= r.depth; l++)
                    if (t - r.start(l) == r.depth - l && e > r.end(l)) return n.delete(r.before(l), e);
                return this.delete(t, e)
            }, e.Transform = j, e.TransformError = s, e.Step = $, e.StepResult = L, e.joinPoint = function(t, e, n) {
                void 0 === n && (n = -1);
                for (var r = t.resolve(e), o = r.depth;; o--) {
                    var i = void 0,
                        s = void 0;
                    if (o == r.depth ? (i = r.nodeBefore, s = r.nodeAfter) : n > 0 ? (i = r.node(o + 1), s = r.node(o).maybeChild(r.index(o) + 1)) : (i = r.node(o).maybeChild(r.index(o) - 1), s = r.node(o + 1)), i && !i.isTextblock && h(i, s)) return e;
                    if (0 == o) break;
                    e = n < 0 ? r.before(o) : r.after(o)
                }
            }, e.canJoin = function(t, e) {
                var n = t.resolve(e),
                    r = n.index();
                return h(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1)
            }, e.canSplit = function(t, e, n, r) {
                void 0 === n && (n = 1);
                var o = t.resolve(e),
                    i = o.depth - n,
                    s = r && r[r.length - 1] || o.parent;
                if (i < 0 || o.parent.type.spec.isolating || !o.parent.canReplace(o.index(), o.parent.childCount) || !s.type.validContent(o.parent.content.cutByIndex(o.index(), o.parent.childCount))) return !1;
                for (var a = o.depth - 1, c = n - 2; a > i; a--, c--) {
                    var l = o.node(a),
                        p = o.index(a);
                    if (l.type.spec.isolating) return !1;
                    var u = l.content.cutByIndex(p, l.childCount),
                        f = r && r[c] || l;
                    if (f != l && (u = u.replaceChild(0, f.type.create(f.attrs))), !l.canReplace(p + 1, l.childCount) || !f.type.validContent(u)) return !1
                }
                var d = o.indexAfter(i),
                    h = r && r[0];
                return o.node(i).canReplaceWith(d, d, h ? h.type : o.node(i + 1).type)
            }, e.insertPoint = m, e.dropPoint = function(t, e, n) {
                var r = t.resolve(e);
                if (!n.content.size) return e;
                for (var o = n.content, i = 0; i < n.openStart; i++) o = o.firstChild.content;
                for (var s = 1; s <= (0 == n.openStart && n.size ? 2 : 1); s++)
                    for (var a = r.depth; a >= 0; a--) {
                        var c = a == r.depth ? 0 : r.pos <= (r.start(a + 1) + r.end(a + 1)) / 2 ? -1 : 1,
                            l = r.index(a) + (c > 0 ? 1 : 0);
                        if (1 == s ? r.node(a).canReplace(l, l, o) : r.node(a).contentMatchAt(l).findWrapping(o.firstChild.type)) return 0 == c ? r.pos : c < 0 ? r.before(a + 1) : r.after(a + 1)
                    }
                return null
            }, e.liftTarget = function(t) {
                for (var e = t.parent.content.cutByIndex(t.startIndex, t.endIndex), n = t.depth;; --n) {
                    var r = t.$from.node(n),
                        o = t.$from.index(n),
                        i = t.$to.indexAfter(n);
                    if (n < t.depth && r.canReplace(o, i, e)) return n;
                    if (0 == n || r.type.spec.isolating || !l(r, o, i)) break
                }
            }, e.findWrapping = function(t, e, n, r) {
                void 0 === r && (r = t);
                var o = u(t, e),
                    i = o && f(r, e);
                return i ? o.map(p).concat({
                    type: e,
                    attrs: n
                }).concat(i.map(p)) : null
            }, e.StepMap = B, e.MapResult = _, e.Mapping = F, e.AddMarkStep = K, e.RemoveMarkStep = H, e.ReplaceStep = J, e.ReplaceAroundStep = W, e.replaceStep = g
        }), k = t(S), x = S.Transform, M = S.TransformError, C = S.Step, O = S.StepResult, N = S.joinPoint, T = S.canJoin, D = S.canSplit, E = S.insertPoint, A = S.dropPoint, I = S.liftTarget, R = S.findWrapping, z = S.StepMap, P = S.MapResult, _ = S.Mapping, B = S.AddMarkStep, F = S.RemoveMarkStep, j = S.ReplaceStep, V = S.ReplaceAroundStep, q = S.replaceStep, $ = Object.freeze({
            default: k,
            __moduleExports: S,
            Transform: x,
            TransformError: M,
            Step: C,
            StepResult: O,
            joinPoint: N,
            canJoin: T,
            canSplit: D,
            insertPoint: E,
            dropPoint: A,
            liftTarget: I,
            findWrapping: R,
            StepMap: z,
            MapResult: P,
            Mapping: _,
            AddMarkStep: B,
            RemoveMarkStep: F,
            ReplaceStep: j,
            ReplaceAroundStep: V,
            replaceStep: q
        }), L = e(function(t, e) {
            function n(t, e, r, o, i, s) {
                if (e.inlineContent) return f.create(t, r);
                for (var a = o - (i > 0 ? 0 : 1); i > 0 ? a < e.childCount : a >= 0; a += i) {
                    var c = e.child(a);
                    if (c.isAtom) {
                        if (!s && h.isSelectable(c)) return h.create(t, r - (i < 0 ? c.nodeSize : 0))
                    } else {
                        var l = n(t, c, r + i, i < 0 ? c.childCount : 0, i, s);
                        if (l) return l
                    }
                    r += c.nodeSize * i
                }
            }

            function r(t, e, n) {
                var r = t.steps.length - 1;
                if (!(r < e)) {
                    var o = t.steps[r];
                    if (o instanceof S.ReplaceStep || o instanceof S.ReplaceAroundStep) {
                        var i;
                        t.mapping.maps[r].forEach(function(t, e, n, r) {
                            null == i && (i = r)
                        }), t.setSelection(l.near(t.doc.resolve(i), n))
                    }
                }
            }

            function o(t, e) {
                return e && t ? t.bind(e) : t
            }

            function s(t, e, n) {
                for (var r in t) {
                    var o = t[r];
                    o instanceof Function ? o = o.bind(e) : "handleDOMEvents" == r && (o = s(o, e, {})), n[r] = o
                }
                return n
            }

            function a(t) {
                return t in N ? t + "$" + ++N[t] : (N[t] = 0, t + "$")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var c = Object.create(null),
                l = function(t, e, n) {
                    this.ranges = n || [new u(t.min(e), t.max(e))], this.$anchor = t, this.$head = e
                },
                p = {
                    anchor: {},
                    head: {},
                    from: {},
                    to: {},
                    $from: {},
                    $to: {},
                    empty: {}
                };
            p.anchor.get = function() {
                return this.$anchor.pos
            }, p.head.get = function() {
                return this.$head.pos
            }, p.from.get = function() {
                return this.$from.pos
            }, p.to.get = function() {
                return this.$to.pos
            }, p.$from.get = function() {
                return this.ranges[0].$from
            }, p.$to.get = function() {
                return this.ranges[0].$to
            }, p.empty.get = function() {
                for (var t = this.ranges, e = 0; e < t.length; e++)
                    if (t[e].$from.pos != t[e].$to.pos) return !1;
                return !0
            }, l.prototype.content = function() {
                return this.$from.node(0).slice(this.from, this.to, !0)
            }, l.prototype.replace = function(t, e) {
                void 0 === e && (e = i.Slice.empty);
                for (var n = e.content.lastChild, o = null, s = 0; s < e.openEnd; s++) o = n, n = n.lastChild;
                for (var a = t.steps.length, c = this.ranges, l = 0; l < c.length; l++) {
                    var p = c[l],
                        u = p.$from,
                        f = p.$to,
                        d = t.mapping.slice(a);
                    t.replaceRange(d.map(u.pos), d.map(f.pos), l ? i.Slice.empty : e), 0 == l && r(t, a, (n ? n.isInline : o && o.isTextblock) ? -1 : 1)
                }
            }, l.prototype.replaceWith = function(t, e) {
                for (var n = t.steps.length, o = this.ranges, i = 0; i < o.length; i++) {
                    var s = o[i],
                        a = s.$from,
                        c = s.$to,
                        l = t.mapping.slice(n),
                        p = l.map(a.pos),
                        u = l.map(c.pos);
                    i ? t.deleteRange(p, u) : (t.replaceRangeWith(p, u, e), r(t, n, e.isInline ? -1 : 1))
                }
            }, l.findFrom = function(t, e, r) {
                var o = t.parent.inlineContent ? new f(t) : n(t.node(0), t.parent, t.pos, t.index(), e, r);
                if (o) return o;
                for (var i = t.depth - 1; i >= 0; i--) {
                    var s = e < 0 ? n(t.node(0), t.node(i), t.before(i + 1), t.index(i), e, r) : n(t.node(0), t.node(i), t.after(i + 1), t.index(i) + 1, e, r);
                    if (s) return s
                }
            }, l.near = function(t, e) {
                return void 0 === e && (e = 1), this.findFrom(t, e) || this.findFrom(t, -e) || new v(t.node(0))
            }, l.atStart = function(t) {
                return n(t, t, 0, 0, 1) || new v(t)
            }, l.atEnd = function(t) {
                return n(t, t, t.content.size, t.childCount, -1) || new v(t)
            }, l.fromJSON = function(t, e) {
                if (!e || !e.type) throw new RangeError("Invalid input for Selection.fromJSON");
                var n = c[e.type];
                if (!n) throw new RangeError("No selection type " + e.type + " defined");
                return n.fromJSON(t, e)
            }, l.jsonID = function(t, e) {
                if (t in c) throw new RangeError("Duplicate use of selection JSON ID " + t);
                return c[t] = e, e.prototype.jsonID = t, e
            }, l.prototype.getBookmark = function() {
                return f.between(this.$anchor, this.$head).getBookmark()
            }, Object.defineProperties(l.prototype, p), l.prototype.visible = !0;
            var u = function(t, e) {
                    this.$from = t, this.$to = e
                },
                f = function(t) {
                    function e(e, n) {
                        void 0 === n && (n = e), t.call(this, e, n)
                    }
                    t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
                    var n = {
                        $cursor: {}
                    };
                    return n.$cursor.get = function() {
                        return this.$anchor.pos == this.$head.pos ? this.$head : null
                    }, e.prototype.map = function(n, r) {
                        var o = n.resolve(r.map(this.head));
                        if (!o.parent.inlineContent) return t.near(o);
                        var i = n.resolve(r.map(this.anchor));
                        return new e(i.parent.inlineContent ? i : o, o)
                    }, e.prototype.replace = function(e, n) {
                        if (void 0 === n && (n = i.Slice.empty), t.prototype.replace.call(this, e, n), n == i.Slice.empty) {
                            var r = this.$from.marksAcross(this.$to);
                            r && e.ensureMarks(r)
                        }
                    }, e.prototype.eq = function(t) {
                        return t instanceof e && t.anchor == this.anchor && t.head == this.head
                    }, e.prototype.getBookmark = function() {
                        return new d(this.anchor, this.head)
                    }, e.prototype.toJSON = function() {
                        return {
                            type: "text",
                            anchor: this.anchor,
                            head: this.head
                        }
                    }, e.fromJSON = function(t, n) {
                        if ("number" != typeof n.anchor || "number" != typeof n.head) throw new RangeError("Invalid input for TextSelection.fromJSON");
                        return new e(t.resolve(n.anchor), t.resolve(n.head))
                    }, e.create = function(t, e, n) {
                        void 0 === n && (n = e);
                        var r = t.resolve(e);
                        return new this(r, n == e ? r : t.resolve(n))
                    }, e.between = function(n, r, o) {
                        var i = n.pos - r.pos;
                        if (o && !i || (o = i >= 0 ? 1 : -1), !r.parent.inlineContent) {
                            var s = t.findFrom(r, o, !0) || t.findFrom(r, -o, !0);
                            if (!s) return t.near(r, o);
                            r = s.$head
                        }
                        return n.parent.inlineContent || (0 == i ? n = r : (n = (t.findFrom(n, -o, !0) || t.findFrom(n, o, !0)).$anchor).pos < r.pos != i < 0 && (n = r)), new e(n, r)
                    }, Object.defineProperties(e.prototype, n), e
                }(l);
            l.jsonID("text", f);
            var d = function(t, e) {
                this.anchor = t, this.head = e
            };
            d.prototype.map = function(t) {
                return new d(t.map(this.anchor), t.map(this.head))
            }, d.prototype.resolve = function(t) {
                return f.between(t.resolve(this.anchor), t.resolve(this.head))
            };
            var h = function(t) {
                function e(e) {
                    var n = e.nodeAfter,
                        r = e.node(0).resolve(e.pos + n.nodeSize);
                    t.call(this, e, r), this.node = n
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.map = function(n, r) {
                    var o = r.mapResult(this.anchor),
                        i = o.deleted,
                        s = o.pos,
                        a = n.resolve(s);
                    return i ? t.near(a) : new e(a)
                }, e.prototype.content = function() {
                    return new i.Slice(i.Fragment.from(this.node), 0, 0)
                }, e.prototype.eq = function(t) {
                    return t instanceof e && t.anchor == this.anchor
                }, e.prototype.toJSON = function() {
                    return {
                        type: "node",
                        anchor: this.anchor
                    }
                }, e.prototype.getBookmark = function() {
                    return new m(this.anchor)
                }, e.fromJSON = function(t, n) {
                    if ("number" != typeof n.anchor) throw new RangeError("Invalid input for NodeSelection.fromJSON");
                    return new e(t.resolve(n.anchor))
                }, e.create = function(t, e) {
                    return new this(t.resolve(e))
                }, e.isSelectable = function(t) {
                    return !t.isText && !1 !== t.type.spec.selectable
                }, e
            }(l);
            h.prototype.visible = !1, l.jsonID("node", h);
            var m = function(t) {
                this.anchor = t
            };
            m.prototype.map = function(t) {
                var e = t.mapResult(this.anchor),
                    n = e.deleted,
                    r = e.pos;
                return n ? new d(r, r) : new m(r)
            }, m.prototype.resolve = function(t) {
                var e = t.resolve(this.anchor),
                    n = e.nodeAfter;
                return n && h.isSelectable(n) ? new h(e) : l.near(e)
            };
            var v = function(t) {
                function e(e) {
                    t.call(this, e.resolve(0), e.resolve(e.content.size))
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.toJSON = function() {
                    return {
                        type: "all"
                    }
                }, e.fromJSON = function(t) {
                    return new e(t)
                }, e.prototype.map = function(t) {
                    return new e(t)
                }, e.prototype.eq = function(t) {
                    return t instanceof e
                }, e.prototype.getBookmark = function() {
                    return g
                }, e
            }(l);
            l.jsonID("all", v);
            var g = {
                    map: function() {
                        return this
                    },
                    resolve: function(t) {
                        return new v(t)
                    }
                },
                y = function(t) {
                    function e(e) {
                        t.call(this, e.doc), this.time = Date.now(), this.curSelection = e.selection, this.curSelectionFor = 0, this.storedMarks = e.storedMarks, this.updated = 0, this.meta = Object.create(null)
                    }
                    t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
                    var n = {
                        selection: {},
                        selectionSet: {},
                        storedMarksSet: {},
                        isGeneric: {},
                        scrolledIntoView: {}
                    };
                    return n.selection.get = function() {
                        return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection
                    }, e.prototype.setSelection = function(t) {
                        if (t.$from.doc != this.doc) throw new RangeError("Selection passed to setSelection must point at the current document");
                        return this.curSelection = t, this.curSelectionFor = this.steps.length, this.updated = -3 & (1 | this.updated), this.storedMarks = null, this
                    }, n.selectionSet.get = function() {
                        return (1 & this.updated) > 0
                    }, e.prototype.setStoredMarks = function(t) {
                        return this.storedMarks = t, this.updated |= 2, this
                    }, e.prototype.ensureMarks = function(t) {
                        return i.Mark.sameSet(this.storedMarks || this.selection.$from.marks(), t) || this.setStoredMarks(t), this
                    }, e.prototype.addStoredMark = function(t) {
                        return this.ensureMarks(t.addToSet(this.storedMarks || this.selection.$head.marks()))
                    }, e.prototype.removeStoredMark = function(t) {
                        return this.ensureMarks(t.removeFromSet(this.storedMarks || this.selection.$head.marks()))
                    }, n.storedMarksSet.get = function() {
                        return (2 & this.updated) > 0
                    }, e.prototype.addStep = function(e, n) {
                        t.prototype.addStep.call(this, e, n), this.updated = -3 & this.updated, this.storedMarks = null
                    }, e.prototype.setTime = function(t) {
                        return this.time = t, this
                    }, e.prototype.replaceSelection = function(t) {
                        return this.selection.replace(this, t), this
                    }, e.prototype.replaceSelectionWith = function(t, e) {
                        var n = this.selection;
                        return !1 !== e && (t = t.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || i.Mark.none))), n.replaceWith(this, t), this
                    }, e.prototype.deleteSelection = function() {
                        return this.selection.replace(this), this
                    }, e.prototype.insertText = function(t, e, n) {
                        void 0 === n && (n = e);
                        var r = this.doc.type.schema;
                        if (null == e) return t ? this.replaceSelectionWith(r.text(t), !0) : this.deleteSelection();
                        if (!t) return this.deleteRange(e, n);
                        var o = this.storedMarks;
                        if (!o) {
                            var i = this.doc.resolve(e);
                            o = n == e ? i.marks() : i.marksAcross(this.doc.resolve(n))
                        }
                        return this.replaceRangeWith(e, n, r.text(t, o)), this.selection.empty || this.setSelection(l.near(this.selection.$to)), this
                    }, e.prototype.setMeta = function(t, e) {
                        return this.meta["string" == typeof t ? t : t.key] = e, this
                    }, e.prototype.getMeta = function(t) {
                        return this.meta["string" == typeof t ? t : t.key]
                    }, n.isGeneric.get = function() {
                        var t = this;
                        for (var e in t.meta) return !1;
                        return !0
                    }, e.prototype.scrollIntoView = function() {
                        return this.updated |= 4, this
                    }, n.scrolledIntoView.get = function() {
                        return (4 & this.updated) > 0
                    }, Object.defineProperties(e.prototype, n), e
                }(S.Transform),
                w = function(t, e, n) {
                    this.name = t, this.init = o(e.init, n), this.apply = o(e.apply, n)
                },
                b = [new w("doc", {
                    init: function(t) {
                        return t.doc || t.schema.topNodeType.createAndFill()
                    },
                    apply: function(t) {
                        return t.doc
                    }
                }), new w("selection", {
                    init: function(t, e) {
                        return t.selection || l.atStart(e.doc)
                    },
                    apply: function(t) {
                        return t.selection
                    }
                }), new w("storedMarks", {
                    init: function(t) {
                        return t.storedMarks || null
                    },
                    apply: function(t, e, n, r) {
                        return r.selection.$cursor ? t.storedMarks : null
                    }
                }), new w("scrollToSelection", {
                    init: function() {
                        return 0
                    },
                    apply: function(t, e) {
                        return t.scrolledIntoView ? e + 1 : e
                    }
                })],
                k = function(t, e) {
                    var n = this;
                    this.schema = t, this.fields = b.concat(), this.plugins = [], this.pluginsByKey = Object.create(null), e && e.forEach(function(t) {
                        if (n.pluginsByKey[t.key]) throw new RangeError("Adding different instances of a keyed plugin (" + t.key + ")");
                        n.plugins.push(t), n.pluginsByKey[t.key] = t, t.spec.state && n.fields.push(new w(t.key, t.spec.state, t))
                    })
                },
                x = function(t) {
                    this.config = t
                },
                M = {
                    schema: {},
                    plugins: {},
                    tr: {}
                };
            M.schema.get = function() {
                return this.config.schema
            }, M.plugins.get = function() {
                return this.config.plugins
            }, x.prototype.apply = function(t) {
                return this.applyTransaction(t).state
            }, x.prototype.filterTransaction = function(t, e) {
                var n = this;
                void 0 === e && (e = -1);
                for (var r = 0; r < this.config.plugins.length; r++)
                    if (r != e) {
                        var o = n.config.plugins[r];
                        if (o.spec.filterTransaction && !o.spec.filterTransaction.call(o, t, n)) return !1
                    }
                return !0
            }, x.prototype.applyTransaction = function(t) {
                var e = this;
                if (!this.filterTransaction(t)) return {
                    state: this,
                    transactions: []
                };
                for (var n = [t], r = this.applyInner(t), o = null;;) {
                    for (var i = !1, s = 0; s < this.config.plugins.length; s++) {
                        var a = e.config.plugins[s];
                        if (a.spec.appendTransaction) {
                            var c = o ? o[s].n : 0,
                                l = o ? o[s].state : e,
                                p = c < n.length && a.spec.appendTransaction.call(a, c ? n.slice(c) : n, l, r);
                            if (p && r.filterTransaction(p, s)) {
                                if (p.setMeta("appendedTransaction", t), !o) {
                                    o = [];
                                    for (var u = 0; u < this.config.plugins.length; u++) o.push(u < s ? {
                                        state: r,
                                        n: n.length
                                    } : {
                                        state: e,
                                        n: 0
                                    })
                                }
                                n.push(p), r = r.applyInner(p), i = !0
                            }
                            o && (o[s] = {
                                state: r,
                                n: n.length
                            })
                        }
                    }
                    if (!i) return {
                        state: r,
                        transactions: n
                    }
                }
            }, x.prototype.applyInner = function(t) {
                var e = this;
                if (!t.before.eq(this.doc)) throw new RangeError("Applying a mismatched transaction");
                for (var n = new x(this.config), r = this.config.fields, o = 0; o < r.length; o++) {
                    var i = r[o];
                    n[i.name] = i.apply(t, e[i.name], e, n)
                }
                for (var s = 0; s < C.length; s++) C[s](e, t, n);
                return n
            }, M.tr.get = function() {
                return new y(this)
            }, x.create = function(t) {
                for (var e = new k(t.schema || t.doc.type.schema, t.plugins), n = new x(e), r = 0; r < e.fields.length; r++) n[e.fields[r].name] = e.fields[r].init(t, n);
                return n
            }, x.prototype.reconfigure = function(t) {
                for (var e = this, n = new k(t.schema || this.schema, t.plugins), r = n.fields, o = new x(n), i = 0; i < r.length; i++) {
                    var s = r[i].name;
                    o[s] = e.hasOwnProperty(s) ? e[s] : r[i].init(t, o)
                }
                return o
            }, x.prototype.toJSON = function(t) {
                var e = this,
                    n = {
                        doc: this.doc.toJSON(),
                        selection: this.selection.toJSON()
                    };
                if (this.storedMarks && (n.storedMarks = this.storedMarks.map(function(t) {
                        return t.toJSON()
                    })), t && "object" == typeof t)
                    for (var r in t) {
                        if ("doc" == r || "selection" == r) throw new RangeError("The JSON fields `doc` and `selection` are reserved");
                        var o = t[r],
                            i = o.spec.state;
                        i && i.toJSON && (n[r] = i.toJSON.call(o, e[o.key]))
                    }
                return n
            }, x.fromJSON = function(t, e, n) {
                if (!e) throw new RangeError("Invalid input for EditorState.fromJSON");
                if (!t.schema) throw new RangeError("Required config field 'schema' missing");
                var r = new k(t.schema, t.plugins),
                    o = new x(r);
                return r.fields.forEach(function(r) {
                    if ("doc" == r.name) o.doc = i.Node.fromJSON(t.schema, e.doc);
                    else if ("selection" == r.name) o.selection = l.fromJSON(o.doc, e.selection);
                    else if ("storedMarks" == r.name) e.storedMarks && (o.storedMarks = e.storedMarks.map(t.schema.markFromJSON));
                    else {
                        if (n)
                            for (var s in n) {
                                var a = n[s],
                                    c = a.spec.state;
                                if (a.key == r.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(e, s)) return void(o[r.name] = c.fromJSON.call(a, t, e[s], o))
                            }
                        o[r.name] = r.init(t, o)
                    }
                }), o
            }, x.addApplyListener = function(t) {
                C.push(t)
            }, x.removeApplyListener = function(t) {
                var e = C.indexOf(t);
                e > -1 && C.splice(e, 1)
            }, Object.defineProperties(x.prototype, M);
            var C = [],
                O = function(t) {
                    this.props = {}, t.props && s(t.props, this, this.props), this.spec = t, this.key = t.key ? t.key.key : a("plugin")
                };
            O.prototype.getState = function(t) {
                return t[this.key]
            };
            var N = Object.create(null),
                T = function(t) {
                    void 0 === t && (t = "key"), this.key = a(t)
                };
            T.prototype.get = function(t) {
                return t.config.pluginsByKey[this.key]
            }, T.prototype.getState = function(t) {
                return t[this.key]
            }, e.Selection = l, e.SelectionRange = u, e.TextSelection = f, e.NodeSelection = h, e.AllSelection = v, e.Transaction = y, e.EditorState = x, e.Plugin = O, e.PluginKey = T
        }), J = t(L), W = L.Selection, K = L.SelectionRange, H = L.TextSelection, U = L.NodeSelection, G = L.AllSelection, Q = L.Transaction, X = L.EditorState, Y = L.Plugin, Z = L.PluginKey, tt = Object.freeze({
            default: J,
            __moduleExports: L,
            Selection: W,
            SelectionRange: K,
            TextSelection: H,
            NodeSelection: U,
            AllSelection: G,
            Transaction: Q,
            EditorState: X,
            Plugin: Y,
            PluginKey: Z
        }), et = e(function(t, e) {
            function n(t, e, n, i, s) {
                for (;;) {
                    if (t == n && e == i) return !0;
                    if (e == (s < 0 ? 0 : r(t))) {
                        var a = t.parentNode;
                        if (1 != a.nodeType || o(t) || _e.test(t.nodeName) || "false" == t.contentEditable) return !1;
                        e = Ie(t) + (s < 0 ? 0 : 1), t = a
                    } else {
                        if (1 != t.nodeType) return !1;
                        t = t.childNodes[e + (s < 0 ? -1 : 0)], e = s < 0 ? r(t) : 0
                    }
                }
            }

            function r(t) {
                return 3 == t.nodeType ? t.nodeValue.length : t.childNodes.length
            }

            function o(t) {
                var e = t.pmViewDesc;
                return e && e.node && e.node.isBlock
            }

            function s(t, e) {
                var n = document.createEvent("Event");
                return n.initEvent("keydown", !0, !0), n.keyCode = t, n.key = n.code = e, n
            }

            function a(t) {
                return {
                    left: 0,
                    right: t.innerWidth,
                    top: 0,
                    bottom: t.innerHeight
                }
            }

            function c(t, e) {
                return "number" == typeof t ? t : t[e]
            }

            function l(t, e, n) {
                for (var r = t.someProp("scrollThreshold") || 0, o = t.someProp("scrollMargin") || 5, i = t.dom.ownerDocument, s = i.defaultView, l = n || t.dom; l; l = Re(l))
                    if (1 == l.nodeType) {
                        var p = l == i.body || 1 != l.nodeType,
                            u = p ? a(s) : l.getBoundingClientRect(),
                            f = 0,
                            d = 0;
                        if (e.top < u.top + c(r, "top") ? d = -(u.top - e.top + c(o, "top")) : e.bottom > u.bottom - c(r, "bottom") && (d = e.bottom - u.bottom + c(o, "bottom")), e.left < u.left + c(r, "left") ? f = -(u.left - e.left + c(o, "left")) : e.right > u.right - c(r, "right") && (f = e.right - u.right + c(o, "right")), (f || d) && (p ? s.scrollBy(f, d) : (d && (l.scrollTop += d), f && (l.scrollLeft += f))), p) break
                    }
            }

            function p(t) {
                for (var e, n, r = t.dom.getBoundingClientRect(), o = Math.max(0, r.top), i = t.dom.ownerDocument, s = (r.left + r.right) / 2, a = o + 1; a < Math.min(innerHeight, r.bottom); a += 5) {
                    var c = t.root.elementFromPoint(s, a);
                    if (c != t.dom && t.dom.contains(c)) {
                        var l = c.getBoundingClientRect();
                        if (l.top >= o - 20) {
                            e = c, n = l.top;
                            break
                        }
                    }
                }
                for (var p = [], u = t.dom; u && (p.push({
                        dom: u,
                        top: u.scrollTop,
                        left: u.scrollLeft
                    }), u != i.body); u = Re(u));
                return {
                    refDOM: e,
                    refTop: n,
                    stack: p
                }
            }

            function u(t) {
                for (var e = t.refDOM, n = t.refTop, r = t.stack, o = e ? e.getBoundingClientRect().top : 0, i = 0 == o ? 0 : o - n, s = 0; s < r.length; s++) {
                    var a = r[s],
                        c = a.dom,
                        l = a.top,
                        p = a.left;
                    c.scrollTop != l + i && (c.scrollTop = l + i), c.scrollLeft != p && (c.scrollLeft = p)
                }
            }

            function f(t, e) {
                for (var n, r, o = 2e8, i = 0, s = e.top, a = e.top, c = t.firstChild, l = 0; c; c = c.nextSibling, l++) {
                    var p = void 0;
                    if (1 == c.nodeType) p = c.getClientRects();
                    else {
                        if (3 != c.nodeType) continue;
                        p = ze(c).getClientRects()
                    }
                    for (var u = 0; u < p.length; u++) {
                        var h = p[u];
                        if (h.top <= s && h.bottom >= a) {
                            s = Math.max(h.bottom, s), a = Math.min(h.top, a);
                            var m = h.left > e.left ? h.left - e.left : h.right < e.left ? e.left - h.right : 0;
                            if (m < o) {
                                n = c, o = m, r = m && 3 == n.nodeType ? {
                                    left: h.right < e.left ? h.right : h.left,
                                    top: e.top
                                } : e, 1 == c.nodeType && m && (i = l + (e.left >= (h.left + h.right) / 2 ? 1 : 0));
                                continue
                            }
                        }!n && (e.left >= h.right && e.top >= h.top || e.left >= h.left && e.top >= h.bottom) && (i = l + 1)
                    }
                }
                return n && 3 == n.nodeType ? d(n, r) : !n || o && 1 == n.nodeType ? {
                    node: t,
                    offset: i
                } : f(n, r)
            }

            function d(t, e) {
                for (var n = t.nodeValue.length, r = document.createRange(), o = 0; o < n; o++) {
                    r.setEnd(t, o + 1), r.setStart(t, o);
                    var i = b(r, 1);
                    if (i.top != i.bottom && h(e, i)) return {
                        node: t,
                        offset: o + (e.left >= (i.left + i.right) / 2 ? 1 : 0)
                    }
                }
                return {
                    node: t,
                    offset: 0
                }
            }

            function h(t, e) {
                return t.left >= e.left - 1 && t.left <= e.right + 1 && t.top >= e.top - 1 && t.top <= e.bottom + 1
            }

            function m(t, e) {
                var n = t.parentNode;
                return n && /^li$/i.test(n.nodeName) && e.left < t.getBoundingClientRect().left ? n : t
            }

            function v(t, e, n) {
                var r = f(e, n),
                    o = r.node,
                    i = r.offset,
                    s = -1;
                if (1 == o.nodeType && !o.firstChild) {
                    var a = o.getBoundingClientRect();
                    s = a.left != a.right && n.left > (a.left + a.right) / 2 ? 1 : -1
                }
                return t.docView.posFromDOM(o, i, s)
            }

            function g(t, e, n, r) {
                for (var o = -1, i = e; i != t.dom;) {
                    var s = t.docView.nearestDesc(i, !0);
                    if (!s) return null;
                    if (s.node.isBlock && s.parent) {
                        var a = s.dom.getBoundingClientRect();
                        if (a.left > r.left || a.top > r.top) o = s.posBefore;
                        else {
                            if (!(a.right < r.left || a.bottom < r.top)) break;
                            o = s.posAfter
                        }
                    }
                    i = s.dom.parentNode
                }
                return o > -1 ? o : t.docView.posFromDOM(e, n)
            }

            function y(t, e, n) {
                var r = t.childNodes.length;
                if (r && n.top < n.bottom)
                    for (var o = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - n.top) / (n.bottom - n.top)) - 2)), i = o;;) {
                        var s = t.childNodes[i];
                        if (1 == s.nodeType)
                            for (var a = s.getClientRects(), c = 0; c < a.length; c++) {
                                var l = a[c];
                                if (h(e, l)) return y(s, e, l)
                            }
                        if ((i = (i + 1) % r) == o) break
                    }
                return t
            }

            function w(t, e) {
                var n, r, o = t.root;
                if (o.caretPositionFromPoint) {
                    var i = o.caretPositionFromPoint(e.left, e.top);
                    if (i) {
                        var s;
                        n = (s = i).offsetNode, r = s.offset
                    }
                }
                if (!n && o.caretRangeFromPoint) {
                    var a = o.caretRangeFromPoint(e.left, e.top);
                    if (a) {
                        var c;
                        n = (c = a).startContainer, r = c.startOffset
                    }
                }
                var l, p = o.elementFromPoint(e.left, e.top + 1);
                if (!p || !t.dom.contains(1 != p.nodeType ? p.parentNode : p)) {
                    var u = t.dom.getBoundingClientRect();
                    if (!h(e, u)) return null;
                    if (!(p = y(t.dom, e, u))) return null
                }
                p = m(p, e), n && (1 == n.nodeType && (r = Math.min(r, n.childNodes.length)), n == t.dom && r == n.childNodes.length - 1 && 1 == n.lastChild.nodeType && e.top > n.lastChild.getBoundingClientRect().bottom ? l = t.state.doc.content.size : 0 != r && 1 == n.nodeType && "BR" == n.childNodes[r - 1].nodeName || (l = g(t, n, r, e))), null == l && (l = v(t, p, e));
                var f = t.docView.nearestDesc(p, !0);
                return {
                    pos: l,
                    inside: f ? f.posAtStart - f.border : -1
                }
            }

            function b(t, e) {
                var n = t.getClientRects();
                return n.length ? n[e < 0 ? 0 : n.length - 1] : t.getBoundingClientRect()
            }

            function k(t, e) {
                var n = t.docView.domFromPos(e),
                    o = n.node,
                    i = n.offset;
                if (3 == o.nodeType && (Oe.chrome || Oe.gecko)) {
                    var s = b(ze(o, i, i), 0);
                    if (Oe.gecko && i && /\s/.test(o.nodeValue[i - 1]) && i < o.nodeValue.length) {
                        var a = b(ze(o, i - 1, i - 1), -1);
                        if (Math.abs(a.left - s.left) < 1 && a.top == s.top) {
                            var c = b(ze(o, i, i + 1), -1);
                            return x(c, c.left < a.left)
                        }
                    }
                    return s
                }
                if (1 == o.nodeType && !t.state.doc.resolve(e).parent.inlineContent) {
                    var l, p = !0;
                    if (i < o.childNodes.length) {
                        var u = o.childNodes[i];
                        1 == u.nodeType && (l = u.getBoundingClientRect())
                    }
                    if (!l && i) {
                        var f = o.childNodes[i - 1];
                        1 == f.nodeType && (l = f.getBoundingClientRect(), p = !1)
                    }
                    return M(l || o.getBoundingClientRect(), p)
                }
                for (var d = -1; d < 2; d += 2)
                    if (d < 0 && i) {
                        var h = void 0,
                            m = 3 == o.nodeType ? ze(o, i - 1, i) : 3 == (h = o.childNodes[i - 1]).nodeType ? ze(h) : 1 == h.nodeType && "BR" != h.nodeName ? h : null;
                        if (m) {
                            var v = b(m, 1);
                            if (v.top < v.bottom) return x(v, !1)
                        }
                    } else if (d > 0 && i < r(o)) {
                    var g = void 0,
                        y = 3 == o.nodeType ? ze(o, i, i + 1) : 3 == (g = o.childNodes[i]).nodeType ? ze(g) : 1 == g.nodeType ? g : null;
                    if (y) {
                        var w = b(y, -1);
                        if (w.top < w.bottom) return x(w, !0)
                    }
                }
                return x(b(3 == o.nodeType ? ze(o) : o, 0), !1)
            }

            function x(t, e) {
                if (0 == t.width) return t;
                var n = e ? t.left : t.right;
                return {
                    top: t.top,
                    bottom: t.bottom,
                    left: n,
                    right: n
                }
            }

            function M(t, e) {
                if (0 == t.height) return t;
                var n = e ? t.top : t.bottom;
                return {
                    top: n,
                    bottom: n,
                    left: t.left,
                    right: t.right
                }
            }

            function C(t, e, n) {
                var r = t.state,
                    o = t.root.activeElement;
                r != e && t.updateState(e), o != t.dom && t.focus();
                try {
                    return n()
                } finally {
                    r != e && t.updateState(r), o != t.dom && o.focus()
                }
            }

            function O(t, e, n) {
                var r = e.selection,
                    o = "up" == n ? r.$anchor.min(r.$head) : r.$anchor.max(r.$head);
                return C(t, e, function() {
                    for (var e = t.docView.domFromPos(o.pos).node;;) {
                        var r = t.docView.nearestDesc(e, !0);
                        if (!r) break;
                        if (r.node.isBlock) {
                            e = r.dom;
                            break
                        }
                        e = r.dom.parentNode
                    }
                    for (var i = k(t, o.pos), s = e.firstChild; s; s = s.nextSibling) {
                        var a = void 0;
                        if (1 == s.nodeType) a = s.getClientRects();
                        else {
                            if (3 != s.nodeType) continue;
                            a = ze(s, 0, s.nodeValue.length).getClientRects()
                        }
                        for (var c = 0; c < a.length; c++) {
                            var l = a[c];
                            if (l.bottom > l.top && ("up" == n ? l.bottom < i.top + 1 : l.top > i.bottom - 1)) return !1
                        }
                    }
                    return !0
                })
            }

            function N(t, e, n) {
                var r = e.selection.$head;
                if (!r.parent.isTextblock) return !1;
                var o = r.parentOffset,
                    i = !o,
                    s = o == r.parent.content.size,
                    a = getSelection();
                return Fe.test(r.parent.textContent) && a.modify ? C(t, e, function() {
                    var e = a.getRangeAt(0),
                        o = a.focusNode,
                        i = a.focusOffset,
                        s = a.caretBidiLevel;
                    a.modify("move", n, "character");
                    var c = !(r.depth ? t.docView.domAfterPos(r.before()) : t.dom).contains(1 == a.focusNode.nodeType ? a.focusNode : a.focusNode.parentNode) || o == a.focusNode && i == a.focusOffset;
                    return a.removeAllRanges(), a.addRange(e), null != s && (a.caretBidiLevel = s), c
                }) : "left" == n || "backward" == n ? i : s
            }

            function T(t, e, n) {
                return je == e && Ve == n ? qe : (je = e, Ve = n, qe = "up" == n || "down" == n ? O(t, e, n) : N(t, e, n))
            }

            function D(t, e, n, r, o) {
                return P(r, e, t), new Ue(null, t, e, n, r, r, r, o, 0)
            }

            function E(t, e) {
                for (var n = t.firstChild, r = 0; r < e.length; r++) {
                    var o = e[r],
                        i = o.dom;
                    if (i.parentNode == t) {
                        for (; i != n;) n = B(n);
                        n = n.nextSibling
                    } else t.insertBefore(i, n);
                    if (o instanceof He) {
                        var s = n ? n.previousSibling : t.lastChild;
                        E(o.contentDOM, o.children), n = s ? s.nextSibling : t.firstChild
                    }
                }
                for (; n;) n = B(n)
            }

            function A(t) {
                t && (this.nodeName = t)
            }

            function I(t, e, n) {
                if (0 == t.length) return Ye;
                for (var r = n ? Ye[0] : new A, o = [r], i = 0; i < t.length; i++) {
                    var s = t[i].type.attrs,
                        a = r;
                    if (s) {
                        s.nodeName && o.push(a = new A(s.nodeName));
                        for (var c in s) {
                            var l = s[c];
                            null != l && (n && 1 == o.length && o.push(a = r = new A(e.isInline ? "span" : "div")), "class" == c ? a.class = (a.class ? a.class + " " : "") + l : "style" == c ? a.style = (a.style ? a.style + ";" : "") + l : "nodeName" != c && (a[c] = l))
                        }
                    }
                }
                return o
            }

            function R(t, e, n, r) {
                if (n == Ye && r == Ye) return e;
                for (var o = e, i = 0; i < r.length; i++) {
                    var s = r[i],
                        a = n[i];
                    if (i) {
                        var c = void 0;
                        a && a.nodeName == s.nodeName && o != t && (c = e.parentNode) && c.tagName.toLowerCase() == s.nodeName ? o = c : ((c = document.createElement(s.nodeName)).appendChild(o), o = c)
                    }
                    z(o, a || Ye[0], s)
                }
                return o
            }

            function z(t, e, n) {
                for (var r in e) "class" == r || "style" == r || "nodeName" == r || r in n || t.removeAttribute(r);
                for (var o in n) "class" != o && "style" != o && "nodeName" != o && n[o] != e[o] && t.setAttribute(o, n[o]);
                if (e.class != n.class) {
                    for (var i = e.class ? e.class.split(" ") : Je, s = n.class ? n.class.split(" ") : Je, a = 0; a < i.length; a++) - 1 == s.indexOf(i[a]) && t.classList.remove(i[a]);
                    for (var c = 0; c < s.length; c++) - 1 == i.indexOf(s[c]) && t.classList.add(s[c])
                }
                if (e.style != n.style) {
                    if (e.style)
                        for (var l, p = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g; l = p.exec(e.style);) t.style[l[1].toLowerCase()] = "";
                    n.style && (t.style.cssText += n.style)
                }
            }

            function P(t, e, n) {
                return R(t, t, Ye, I(e, n, 1 != t.nodeType))
            }

            function _(t, e) {
                if (t.length != e.length) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!t[n].type.eq(e[n].type)) return !1;
                return !0
            }

            function B(t) {
                var e = t.nextSibling;
                return t.parentNode.removeChild(t), e
            }

            function F(t, e) {
                for (var n = [], r = t.childCount, o = e.length - 1; r > 0 && o >= 0; o--) {
                    var i = e[o],
                        s = i.node;
                    if (s) {
                        if (s != t.child(r - 1)) break;
                        n.push(i), --r
                    }
                }
                return {
                    nodes: n.reverse(),
                    offset: r
                }
            }

            function j(t, e) {
                return t.type.side - e.type.side
            }

            function V(t, e, n, r) {
                var o = e.locals(t),
                    i = 0;
                if (0 != o.length)
                    for (var s = 0, a = [], c = null, l = 0;;) {
                        if (s < o.length && o[s].to == i) {
                            for (var p = o[s++], u = void 0; s < o.length && o[s].to == i;)(u || (u = [p])).push(o[s++]);
                            if (u) {
                                u.sort(j);
                                for (var f = 0; f < u.length; f++) n(u[f], l)
                            } else n(p, l)
                        }
                        var d = void 0,
                            h = void 0;
                        if (c) h = -1, d = c, c = null;
                        else {
                            if (!(l < t.childCount)) break;
                            h = l, d = t.child(l++)
                        }
                        for (var m = 0; m < a.length; m++) a[m].to <= i && a.splice(m--, 1);
                        for (; s < o.length && o[s].from == i;) a.push(o[s++]);
                        var v = i + d.nodeSize;
                        if (d.isText) {
                            var g = v;
                            s < o.length && o[s].from < g && (g = o[s].from);
                            for (var y = 0; y < a.length; y++) a[y].to < g && (g = a[y].to);
                            g < v && (c = d.cut(g - i), d = d.cut(0, g - i), v = g, h = -1)
                        }
                        r(d, a.length ? a.slice() : Je, e.forChild(i, d), h), i = v
                    } else
                        for (var w = 0; w < t.childCount; w++) {
                            var b = t.child(w);
                            r(b, o, e.forChild(i, b), w), i += b.nodeSize
                        }
            }

            function q(t) {
                if ("UL" == t.nodeName || "OL" == t.nodeName) {
                    var e = t.style.cssText;
                    t.style.cssText = e + "; list-style: square !important", window.getComputedStyle(t).listStyle, t.style.cssText = e
                }
            }

            function $(t, e) {
                for (;;) {
                    if (3 == t.nodeType) return t;
                    if (1 == t.nodeType && e > 0) {
                        if (t.childNodes.length > e && 3 == t.childNodes[e].nodeType) return t.childNodes[e];
                        e = r(t = t.childNodes[e - 1])
                    } else {
                        if (!(1 == t.nodeType && e < t.childNodes.length)) return null;
                        t = t.childNodes[e], e = 0
                    }
                }
            }

            function J(t, e, n, r) {
                for (var o = "", i = 0, s = 0; i < t.childCount; i++) {
                    var a = t.child(i),
                        c = s + a.nodeSize;
                    if (a.isText) {
                        if (o += a.text, c >= r) {
                            for (var l = c - o.length, p = o.lastIndexOf(e); p > -1 && l + p > n;) p = o.lastIndexOf(e, p - 1);
                            if (p > -1 && l + p + e.length >= r) return l + p;
                            if (c > r) break
                        }
                    } else o = "";
                    s = c
                }
                return -1
            }

            function W(t, e, n, r, o) {
                for (var i = [], s = 0, a = 0; s < t.length; s++) {
                    var c = t[s],
                        l = a,
                        p = a += c.size;
                    l >= n || p <= e ? i.push(c) : (l < e && i.push(c.slice(0, e - l, r)), o && (i.push(o), o = null), p > n && i.push(c.slice(n - l, c.size, r)))
                }
                return i
            }

            function K(t, e) {
                var n = t.selection,
                    r = n.$anchor,
                    o = n.$head,
                    i = e > 0 ? r.max(o) : r.min(o),
                    s = i.parent.inlineContent ? i.depth ? t.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
                return s && L.Selection.findFrom(s, e)
            }

            function H(t, e) {
                return t.dispatch(t.state.tr.setSelection(e).scrollIntoView()), !0
            }

            function U(t, e, n) {
                var r = t.state.selection;
                if (r instanceof L.TextSelection) {
                    if (!r.empty || n.indexOf("s") > -1) return !1;
                    if (t.endOfTextblock(e > 0 ? "right" : "left")) {
                        var o = K(t.state, e);
                        return !!(o && o instanceof L.NodeSelection) && H(t, o)
                    }
                    var i, s = r.$head,
                        a = s.textOffset ? null : e < 0 ? s.nodeBefore : s.nodeAfter;
                    if (!a || a.isText) return !1;
                    var c = e < 0 ? s.pos - a.nodeSize : s.pos;
                    return !!(a.isAtom || (i = t.docView.descAt(c)) && !i.contentDOM) && (L.NodeSelection.isSelectable(a) ? H(t, new L.NodeSelection(e < 0 ? t.state.doc.resolve(s.pos - a.nodeSize) : s)) : !!Oe.webkit && H(t, new L.TextSelection(t.state.doc.resolve(e < 0 ? c : c + a.nodeSize))))
                }
                if (r instanceof L.NodeSelection && r.node.isInline) return H(t, new L.TextSelection(e > 0 ? r.$to : r.$from));
                var l = K(t.state, e);
                return !!l && H(t, l)
            }

            function G(t) {
                return 3 == t.nodeType ? t.nodeValue.length : t.childNodes.length
            }

            function Q(t) {
                var e = t.pmViewDesc;
                return e && 0 == e.size && (t.nextSibling || "BR" != t.nodeName)
            }

            function X(t) {
                var e = t.root.getSelection(),
                    n = e.focusNode,
                    r = e.focusOffset;
                if (n) {
                    var o, i, s = !1;
                    for (Oe.gecko && 1 == n.nodeType && r < G(n) && Q(n.childNodes[r]) && (s = !0);;)
                        if (r > 0) {
                            if (1 != n.nodeType) break;
                            var a = n.childNodes[r - 1];
                            if (Q(a)) o = n, i = --r;
                            else {
                                if (3 != a.nodeType) break;
                                r = (n = a).nodeValue.length
                            }
                        } else {
                            if (Z(n)) break;
                            for (var c = n.previousSibling; c && Q(c);) o = n.parentNode, i = Ie(c), c = c.previousSibling;
                            if (c) r = G(n = c);
                            else {
                                if ((n = n.parentNode) == t.dom) break;
                                r = 0
                            }
                        }
                    s ? tt(t, e, n, r) : o && tt(t, e, o, i)
                }
            }

            function Y(t) {
                var e = t.root.getSelection(),
                    n = e.focusNode,
                    r = e.focusOffset;
                if (n) {
                    for (var o, i, s = G(n);;)
                        if (r < s) {
                            if (1 != n.nodeType) break;
                            if (!Q(n.childNodes[r])) break;
                            o = n, i = ++r
                        } else {
                            if (Z(n)) break;
                            for (var a = n.nextSibling; a && Q(a);) o = a.parentNode, i = Ie(a) + 1, a = a.nextSibling;
                            if (a) r = 0, s = G(n = a);
                            else {
                                if ((n = n.parentNode) == t.dom) break;
                                r = s = 0
                            }
                        }
                    o && tt(t, e, o, i)
                }
            }

            function Z(t) {
                var e = t.pmViewDesc;
                return e && e.node && e.node.isBlock
            }

            function tt(t, e, n, r) {
                if (Be(e)) {
                    var o = document.createRange();
                    o.setEnd(n, r), o.setStart(n, r), e.removeAllRanges(), e.addRange(o)
                } else e.extend && e.extend(n, r);
                t.domObserver.setCurSelection()
            }

            function et(t, e, n) {
                var r = t.state.selection;
                if (r instanceof L.TextSelection && !r.empty || n.indexOf("s") > -1) return !1;
                var o = r.$from,
                    i = r.$to;
                if (!o.parent.inlineContent || t.endOfTextblock(e < 0 ? "up" : "down")) {
                    var s = K(t.state, e);
                    if (s && s instanceof L.NodeSelection) return H(t, s)
                }
                if (!o.parent.inlineContent) {
                    var a = L.Selection.findFrom(e < 0 ? o : i, e);
                    return !a || H(t, a)
                }
                return !1
            }

            function nt(t, e) {
                if (!(t.state.selection instanceof L.TextSelection)) return !0;
                var n = t.state.selection,
                    r = n.$head,
                    o = n.$anchor,
                    i = n.empty;
                if (!r.sameParent(o)) return !0;
                if (!i) return !1;
                if (t.endOfTextblock(e > 0 ? "forward" : "backward")) return !0;
                var s = !r.textOffset && (e < 0 ? r.nodeBefore : r.nodeAfter);
                if (s && !s.isText) {
                    var a = t.state.tr;
                    return e < 0 ? a.delete(r.pos - s.nodeSize, r.pos) : a.delete(r.pos, r.pos + s.nodeSize), t.dispatch(a), !0
                }
                return !1
            }

            function rt(t, e, n) {
                t.domObserver.stop(), e.contentEditable = n, t.domObserver.start()
            }

            function ot(t) {
                if (Oe.chrome && !(t.state.selection.$head.parentOffset > 0)) {
                    var e = t.root.getSelection(),
                        n = e.focusNode,
                        r = e.focusOffset;
                    if (n && 1 == n.nodeType && 0 == r && n.firstChild && "false" == n.firstChild.contentEditable) {
                        var o = n.firstChild;
                        rt(t, o, !0), setTimeout(function() {
                            return rt(t, o, !1)
                        }, 20)
                    }
                }
            }

            function it(t) {
                var e = "";
                return t.ctrlKey && (e += "c"), t.metaKey && (e += "m"), t.altKey && (e += "a"), t.shiftKey && (e += "s"), e
            }

            function st(t, e) {
                var n = e.keyCode,
                    r = it(e);
                return 8 == n || Oe.mac && 72 == n && "c" == r ? nt(t, -1) || X(t) : 46 == n || Oe.mac && 68 == n && "c" == r ? nt(t, 1) || Y(t) : 13 == n || 27 == n || (37 == n ? U(t, -1, r) || X(t) : 39 == n ? U(t, 1, r) || Y(t) : 38 == n ? et(t, -1, r) || X(t) : 40 == n ? ot(t) || et(t, 1, r) || Y(t) : r == (Oe.mac ? "m" : "c") && (66 == n || 73 == n || 89 == n || 90 == n))
            }

            function at(t, e) {
                var n, r, o = t.root.getSelection(),
                    i = t.state.doc,
                    s = t.docView.nearestDesc(o.focusNode),
                    a = s && 0 == s.size,
                    c = t.docView.posFromDOM(o.focusNode, o.focusOffset),
                    l = i.resolve(c);
                if (Be(o)) {
                    for (n = l; s && !s.node;) s = s.parent;
                    if (s && s.node.isAtom && L.NodeSelection.isSelectable(s.node) && s.parent) {
                        var p = s.posBefore;
                        r = new L.NodeSelection(c == p ? l : i.resolve(p))
                    }
                } else n = i.resolve(t.docView.posFromDOM(o.anchorNode, o.anchorOffset));
                return r || (r = ht(t, n, l, "pointer" == e || t.state.selection.head < l.pos && !a ? 1 : -1)), r
            }

            function ct(t, e, n) {
                var r = t.state.selection;
                if (ft(t, r), t.editable && !t.hasFocus()) {
                    if (!e) return;
                    Oe.gecko && Oe.gecko_version <= 55 && (t.domObserver.disconnectSelection(), t.dom.focus(), t.domObserver.connectSelection())
                } else if (!(t.editable || vt(t) && document.activeElement.contains(t.dom) || e)) return;
                if (t.domObserver.disconnectSelection(), t.cursorWrapper) ut(t);
                else {
                    var o, i, s = r.anchor,
                        a = r.head;
                    !tn || r instanceof L.TextSelection || (r.$from.parent.inlineContent || (o = lt(t, r.from)), r.empty || r.$from.parent.inlineContent || (i = lt(t, r.to))), t.docView.setSelection(s, a, t.root, n), tn && (o && (o.contentEditable = "false"), i && (i.contentEditable = "false")), r.visible ? t.dom.classList.remove("ProseMirror-hideselection") : s != a && (t.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && pt(t))
                }
                t.domObserver.setCurSelection(), t.domObserver.connectSelection()
            }

            function lt(t, e) {
                var n = t.docView.domFromPos(e),
                    r = n.node,
                    o = n.offset,
                    i = o < r.childNodes.length ? r.childNodes[o] : null,
                    s = o ? r.childNodes[o - 1] : null;
                if (!(i && "false" != i.contentEditable || s && "false" != s.contentEditable)) {
                    if (i) return i.contentEditable = "true", i;
                    if (s) return s.contentEditable = "true", s
                }
            }

            function pt(t) {
                var e = t.dom.ownerDocument;
                e.removeEventListener("selectionchange", t.hideSelectionGuard);
                var n = t.root.getSelection(),
                    r = n.anchorNode,
                    o = n.anchorOffset;
                e.addEventListener("selectionchange", t.hideSelectionGuard = function() {
                    n.anchorNode == r && n.anchorOffset == o || (e.removeEventListener("selectionchange", t.hideSelectionGuard), t.dom.classList.remove("ProseMirror-hideselection"))
                })
            }

            function ut(t) {
                var e = t.root.getSelection(),
                    n = document.createRange(),
                    r = t.cursorWrapper.dom,
                    o = "IMG" == r.nodeName;
                o ? n.setEnd(r.parentNode, Ie(r) + 1) : n.setEnd(r, 0), n.collapse(!1), e.removeAllRanges(), e.addRange(n), !o && !t.state.selection.visible && Oe.ie && Oe.ie_version <= 11 && (r.disabled = !0, r.disabled = !1)
            }

            function ft(t, e) {
                if (e instanceof L.NodeSelection) {
                    var n = t.docView.descAt(e.from);
                    n != t.lastSelectedViewDesc && (dt(t), n && n.selectNode(), t.lastSelectedViewDesc = n)
                } else dt(t)
            }

            function dt(t) {
                t.lastSelectedViewDesc && (t.lastSelectedViewDesc.parent && t.lastSelectedViewDesc.deselectNode(), t.lastSelectedViewDesc = null)
            }

            function ht(t, e, n, r) {
                return t.someProp("createSelectionBetween", function(r) {
                    return r(t, e, n)
                }) || L.TextSelection.between(e, n, r)
            }

            function mt(t) {
                return (!t.editable || t.root.activeElement == t.dom) && vt(t)
            }

            function vt(t) {
                var e = t.root.getSelection();
                if (!e.anchorNode) return !1;
                try {
                    return t.dom.contains(3 == e.anchorNode.nodeType ? e.anchorNode.parentNode : e.anchorNode) && (t.editable || t.dom.contains(3 == e.focusNode.nodeType ? e.focusNode.parentNode : e.focusNode))
                } catch (t) {
                    return !1
                }
            }

            function gt(t) {
                var e = t.docView.domFromPos(t.state.selection.anchor),
                    n = t.root.getSelection();
                return Pe(e.node, e.offset, n.anchorNode, n.anchorOffset)
            }

            function yt(t, e, n) {
                var r = t.docView.parseRange(e, n),
                    o = r.node,
                    s = r.fromOffset,
                    a = r.toOffset,
                    c = r.from,
                    l = r.to,
                    p = t.root.getSelection(),
                    u = null,
                    f = p.anchorNode;
                if (f && t.dom.contains(1 == f.nodeType ? f : f.parentNode) && (u = [{
                        node: f,
                        offset: p.anchorOffset
                    }], Be(p) || u.push({
                        node: p.focusNode,
                        offset: p.focusOffset
                    })), Oe.chrome && 8 === t.lastKeyCode)
                    for (var d = a; d > s; d--) {
                        var h = o.childNodes[d - 1],
                            m = h.pmViewDesc;
                        if ("BR" == h.nodeType && !m) {
                            a = d;
                            break
                        }
                        if (!m || m.size) break
                    }
                var v = t.state.doc,
                    g = t.someProp("domParser") || i.DOMParser.fromSchema(t.state.schema),
                    y = v.resolve(c),
                    w = null,
                    b = g.parse(o, {
                        topNode: y.parent,
                        topMatch: y.parent.contentMatchAt(y.index()),
                        topOpen: !0,
                        from: s,
                        to: a,
                        preserveWhitespace: !y.parent.type.spec.code || "full",
                        editableContent: !0,
                        findPositions: u,
                        ruleFromNode: wt(g, y),
                        context: y
                    });
                if (u && null != u[0].pos) {
                    var S = u[0].pos,
                        k = u[1] && u[1].pos;
                    null == k && (k = S), w = {
                        anchor: S + c,
                        head: k + c
                    }
                }
                return {
                    doc: b,
                    sel: w,
                    from: c,
                    to: l
                }
            }

            function wt(t, e) {
                return function(n) {
                    var r = n.pmViewDesc;
                    if (r) return r.parseRule();
                    if ("BR" == n.nodeName && n.parentNode) {
                        if (Oe.safari && /^(ul|ol)$/i.test(n.parentNode.nodeName)) return t.matchTag(document.createElement("li"), e);
                        if (n.parentNode.lastChild == n || Oe.safari && /^(tr|table)$/i.test(n.parentNode.nodeName)) return {
                            ignore: !0
                        }
                    } else if ("IMG" == n.nodeName && n.getAttribute("mark-placeholder")) return {
                        ignore: !0
                    }
                }
            }

            function bt(t, e, n, r) {
                if (e < 0) {
                    var o = t.lastSelectionTime > Date.now() - 50 ? t.lastSelectionOrigin : null,
                        i = at(t, o);
                    if (!t.state.selection.eq(i)) {
                        var a = t.state.tr.setSelection(i);
                        "pointer" == o ? a.setMeta("pointer", !0) : "key" == o && a.scrollIntoView(), t.dispatch(a)
                    }
                } else {
                    var c = t.state.doc.resolve(e),
                        l = c.sharedDepth(n);
                    e = c.before(l + 1), n = t.state.doc.resolve(n).after(l + 1);
                    var p, u, f = t.state.selection,
                        d = yt(t, e, n),
                        h = t.state.doc,
                        m = h.slice(d.from, d.to);
                    8 === t.lastKeyCode && Date.now() - 100 < t.lastKeyCodeTime ? (p = t.state.selection.to, u = "end") : (p = t.state.selection.from, u = "start"), t.lastKeyCode = null;
                    var v = Ct(m.content, d.doc.content, d.from, p, u);
                    if (v) {
                        t.domChangeCount++, t.state.selection.from < t.state.selection.to && v.start == v.endB && t.state.selection instanceof L.TextSelection && (v.start > t.state.selection.from && v.start <= t.state.selection.from + 2 ? v.start = t.state.selection.from : v.endA < t.state.selection.to && v.endA >= t.state.selection.to - 2 && (v.endB += t.state.selection.to - v.endA, v.endA = t.state.selection.to));
                        var g, y = d.doc.resolveNoCache(v.start - d.from),
                            w = d.doc.resolveNoCache(v.endB - d.from);
                        if (!(!y.sameParent(w) && y.pos < d.doc.content.size && (g = L.Selection.findFrom(d.doc.resolve(y.pos + 1), 1, !0)) && g.head == w.pos && t.someProp("handleKeyDown", function(e) {
                                return e(t, s(13, "Enter"))
                            })))
                            if (t.state.selection.anchor > v.start && xt(h, v.start, v.endA, y, w) && t.someProp("handleKeyDown", function(e) {
                                    return e(t, s(8, "Backspace"))
                                })) Oe.android && Oe.chrome && t.domObserver.suppressSelectionUpdates();
                            else {
                                var b, S, k, x, M = v.start,
                                    C = v.endA;
                                if (y.sameParent(w) && y.parent.inlineContent)
                                    if (y.pos == w.pos) Oe.ie && Oe.ie_version <= 11 && 0 == y.parentOffset && (t.domObserver.suppressSelectionUpdates(), setTimeout(function() {
                                        return ct(t)
                                    }, 20)), b = t.state.tr.delete(M, C), S = h.resolve(v.start).marksAcross(h.resolve(v.endA));
                                    else if (v.endA == v.endB && (x = h.resolve(v.start)) && (k = kt(y.parent.content.cut(y.parentOffset, w.parentOffset), x.parent.content.cut(x.parentOffset, v.endA - x.start())))) b = t.state.tr, "add" == k.type ? b.addMark(M, C, k.mark) : b.removeMark(M, C, k.mark);
                                else if (y.parent.child(y.index()).isText && y.index() == w.index() - (w.textOffset ? 0 : 1)) {
                                    var O = y.parent.textBetween(y.parentOffset, w.parentOffset);
                                    if (t.someProp("handleTextInput", function(e) {
                                            return e(t, M, C, O)
                                        })) return;
                                    b = t.state.tr.insertText(O, M, C)
                                }
                                if (b || (b = t.state.tr.replace(M, C, d.doc.slice(v.start - d.from, v.endB - d.from))), d.sel) {
                                    var N = St(t, b.doc, d.sel);
                                    N && b.setSelection(N)
                                }
                                S && b.ensureMarks(S), t.dispatch(b.scrollIntoView())
                            }
                    } else if (!(r && f instanceof L.TextSelection && !f.empty && f.$head.sameParent(f.$anchor)) || t.composing || d.sel && d.sel.anchor != d.sel.head) {
                        if (d.sel) {
                            var T = St(t, t.state.doc, d.sel);
                            T && !T.eq(t.state.selection) && t.dispatch(t.state.tr.setSelection(T))
                        }
                    } else {
                        var D = t.state,
                            E = D.selection;
                        t.dispatch(D.tr.replaceSelectionWith(D.schema.text(D.doc.textBetween(E.from, E.to)), !0).scrollIntoView())
                    }
                }
            }

            function St(t, e, n) {
                return Math.max(n.anchor, n.head) > e.content.size ? null : ht(t, e.resolve(n.anchor), e.resolve(n.head))
            }

            function kt(t, e) {
                for (var n, r, o, s = t.firstChild.marks, a = e.firstChild.marks, c = s, l = a, p = 0; p < a.length; p++) c = a[p].removeFromSet(c);
                for (var u = 0; u < s.length; u++) l = s[u].removeFromSet(l);
                if (1 == c.length && 0 == l.length) r = c[0], n = "add", o = function(t) {
                    return t.mark(r.addToSet(t.marks))
                };
                else {
                    if (0 != c.length || 1 != l.length) return null;
                    r = l[0], n = "remove", o = function(t) {
                        return t.mark(r.removeFromSet(t.marks))
                    }
                }
                for (var f = [], d = 0; d < e.childCount; d++) f.push(o(e.child(d)));
                if (i.Fragment.from(f).eq(t)) return {
                    mark: r,
                    type: n
                }
            }

            function xt(t, e, n, r, o) {
                if (!r.parent.isTextblock || n - e <= o.pos - r.pos || Mt(r, !0, !1) < o.pos) return !1;
                var i = t.resolve(e);
                if (i.parentOffset < i.parent.content.size || !i.parent.isTextblock) return !1;
                var s = t.resolve(Mt(i, !0, !0));
                return !(!s.parent.isTextblock || s.pos > n || Mt(s, !0, !1) < n) && r.parent.content.cut(r.parentOffset).eq(s.parent.content)
            }

            function Mt(t, e, n) {
                for (var r = t.depth, o = e ? t.end() : t.pos; r > 0 && (e || t.indexAfter(r) == t.node(r).childCount);) r--, o++, e = !1;
                if (n)
                    for (var i = t.node(r).maybeChild(t.indexAfter(r)); i && !i.isLeaf;) i = i.firstChild, o++;
                return o
            }

            function Ct(t, e, n, r, o) {
                var i = t.findDiffStart(e, n);
                if (null == i) return null;
                var s = t.findDiffEnd(e, n + t.size, n + e.size),
                    a = s.a,
                    c = s.b;
                return "end" == o && (r -= a + Math.max(0, i - Math.min(a, c)) - i), a < i && t.size < e.size ? (c = (i -= r <= i && r >= a ? i - r : 0) + (c - a), a = i) : c < i && (a = (i -= r <= i && r >= c ? i - r : 0) + (a - c), c = i), {
                    start: i,
                    endA: a,
                    endB: c
                }
            }

            function Ot(t, e) {
                for (var n = [], r = e.content, o = e.openStart, s = e.openEnd; o > 1 && s > 1 && 1 == r.childCount && 1 == r.firstChild.childCount;) {
                    o--, s--;
                    var a = r.firstChild;
                    n.push(a.type.name, a.type.hasRequiredAttrs() ? a.attrs : null), r = a.content
                }
                var c = t.someProp("clipboardSerializer") || i.DOMSerializer.fromSchema(t.state.schema),
                    l = zt(),
                    p = l.createElement("div");
                p.appendChild(c.serializeFragment(r, {
                    document: l
                }));
                for (var u, f = p.firstChild; f && 1 == f.nodeType && (u = en[f.nodeName.toLowerCase()]);) {
                    for (var d = u.length - 1; d >= 0; d--) {
                        for (var h = l.createElement(u[d]); p.firstChild;) h.appendChild(p.firstChild);
                        p.appendChild(h)
                    }
                    f = p.firstChild
                }
                return f && 1 == f.nodeType && f.setAttribute("data-pm-slice", o + " " + s + " " + JSON.stringify(n)), {
                    dom: p,
                    text: t.someProp("clipboardTextSerializer", function(t) {
                        return t(e)
                    }) || e.content.textBetween(0, e.content.size, "\n\n")
                }
            }

            function Nt(t, e, n, r, o) {
                var s, a, c = o.parent.type.spec.code;
                if (!n && !e) return null;
                var l = e && (r || c || !n);
                if (l) {
                    if (t.someProp("transformPastedText", function(t) {
                            e = t(e)
                        }), c) return new i.Slice(i.Fragment.from(t.state.schema.text(e)), 0, 0);
                    var p = t.someProp("clipboardTextParser", function(t) {
                        return t(e, o)
                    });
                    p ? a = p : (s = document.createElement("div"), e.trim().split(/(?:\r\n?|\n)+/).forEach(function(t) {
                        s.appendChild(document.createElement("p")).textContent = t
                    }))
                } else t.someProp("transformPastedHTML", function(t) {
                    n = t(n)
                }), s = Pt(n);
                var u = s && s.querySelector("[data-pm-slice]"),
                    f = u && /^(\d+) (\d+) (.*)/.exec(u.getAttribute("data-pm-slice"));
                if (!a) {
                    var d = t.someProp("clipboardParser") || t.someProp("domParser") || i.DOMParser.fromSchema(t.state.schema);
                    a = d.parseSlice(s, {
                        preserveWhitespace: !(!l && !f),
                        context: o
                    })
                }
                return a = f ? _t(Rt(a, +f[1], +f[2]), f[3]) : i.Slice.maxOpen(Tt(a.content, o), !1), t.someProp("transformPasted", function(t) {
                    a = t(a)
                }), a
            }

            function Tt(t, e) {
                if (t.childCount < 2) return t;
                for (var n = e.depth; n >= 0; n--) {
                    var r = function(n) {
                        var r = e.node(n).contentMatchAt(e.index(n)),
                            o = void 0,
                            s = [];
                        if (t.forEach(function(t) {
                                if (s) {
                                    var e, n = r.findWrapping(t.type);
                                    if (!n) return s = null;
                                    if (e = s.length && o.length && Et(n, o, t, s[s.length - 1], 0)) s[s.length - 1] = e;
                                    else {
                                        s.length && (s[s.length - 1] = At(s[s.length - 1], o.length));
                                        var i = Dt(t, n);
                                        s.push(i), r = r.matchType(i.type, i.attrs), o = n
                                    }
                                }
                            }), s) return {
                            v: i.Fragment.from(s)
                        }
                    }(n);
                    if (r) return r.v
                }
                return t
            }

            function Dt(t, e, n) {
                void 0 === n && (n = 0);
                for (var r = e.length - 1; r >= n; r--) t = e[r].create(null, i.Fragment.from(t));
                return t
            }

            function Et(t, e, n, r, o) {
                if (o < t.length && o < e.length && t[o] == e[o]) {
                    var s = Et(t, e, n, r.lastChild, o + 1);
                    if (s) return r.copy(r.content.replaceChild(r.childCount - 1, s));
                    if (r.contentMatchAt(r.childCount).matchType(o == t.length - 1 ? n.type : t[o + 1])) return r.copy(r.content.append(i.Fragment.from(Dt(n, t, o + 1))))
                }
            }

            function At(t, e) {
                if (0 == e) return t;
                var n = t.content.replaceChild(t.childCount - 1, At(t.lastChild, e - 1)),
                    r = t.contentMatchAt(t.childCount).fillBefore(i.Fragment.empty, !0);
                return t.copy(n.append(r))
            }

            function It(t, e, n, r, o, s) {
                var a = e < 0 ? t.firstChild : t.lastChild,
                    c = a.content;
                return o < r - 1 && (c = It(c, e, n, r, o + 1, s)), o >= n && (c = e < 0 ? a.contentMatchAt(0).fillBefore(c, t.childCount > 1 || s <= o).append(c) : c.append(a.contentMatchAt(a.childCount).fillBefore(i.Fragment.empty, !0))), t.replaceChild(e < 0 ? 0 : t.childCount - 1, a.copy(c))
            }

            function Rt(t, e, n) {
                return e < t.openStart && (t = new i.Slice(It(t.content, -1, e, t.openStart, 0, t.openEnd), e, t.openEnd)), n < t.openEnd && (t = new i.Slice(It(t.content, 1, n, t.openEnd, 0, 0), t.openStart, n)), t
            }

            function zt() {
                return nn || (nn = document.implementation.createHTMLDocument("title"))
            }

            function Pt(t) {
                var e = /(\s*<meta [^>]*>)*/.exec(t);
                e && (t = t.slice(e[0].length));
                var n, r = zt().createElement("div"),
                    o = /(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(t),
                    i = 0;
                (n = o && en[o[1].toLowerCase()]) && (t = n.map(function(t) {
                    return "<" + t + ">"
                }).join("") + t + n.map(function(t) {
                    return "</" + t + ">"
                }).reverse().join(""), i = n.length), r.innerHTML = t;
                for (var s = 0; s < i; s++) r = r.firstChild;
                return r
            }

            function _t(t, e) {
                if (!t.size) return t;
                var n, r = t.content.firstChild.type.schema;
                try {
                    n = JSON.parse(e)
                } catch (e) {
                    return t
                }
                for (var o = t.content, s = t.openStart, a = t.openEnd, c = n.length - 2; c >= 0; c -= 2) {
                    var l = r.nodes[n[c]];
                    if (!l || l.hasRequiredAttrs()) break;
                    o = i.Fragment.from(l.create(n[c + 1], o)), s++, a++
                }
                return new i.Slice(o, s, a)
            }

            function Bt(t) {
                t.shiftKey = !1, t.mouseDown = null, t.lastKeyCode = null, t.lastKeyCodeTime = 0, t.lastClick = {
                    time: 0,
                    x: 0,
                    y: 0,
                    type: ""
                }, t.lastSelectionOrigin = null, t.lastSelectionTime = 0, t.composing = !1, t.composingTimeout = null, t.compositionNodes = [], t.compositionEndedAt = -2e8, t.domObserver = new an(t, function(e, n, r) {
                    return bt(t, e, n, r)
                }), t.domObserver.start(), t.domChangeCount = 0, t.eventHandlers = Object.create(null);
                for (var e in cn) ! function(e) {
                    var n = cn[e];
                    t.dom.addEventListener(e, t.eventHandlers[e] = function(e) {
                        !$t(t, e) || qt(t, e) || !t.editable && e.type in ln || n(t, e)
                    })
                }(e);
                Oe.safari && t.dom.addEventListener("input", function() {
                    return null
                }), Vt(t)
            }

            function Ft(t, e) {
                t.lastSelectionOrigin = e, t.lastSelectionTime = Date.now()
            }

            function jt(t) {
                t.domObserver.stop();
                for (var e in t.eventHandlers) t.dom.removeEventListener(e, t.eventHandlers[e]);
                clearTimeout(t.composingTimeout)
            }

            function Vt(t) {
                t.someProp("handleDOMEvents", function(e) {
                    for (var n in e) t.eventHandlers[n] || t.dom.addEventListener(n, t.eventHandlers[n] = function(e) {
                        return qt(t, e)
                    })
                })
            }

            function qt(t, e) {
                return t.someProp("handleDOMEvents", function(n) {
                    var r = n[e.type];
                    return !!r && (r(t, e) || e.defaultPrevented)
                })
            }

            function $t(t, e) {
                if (!e.bubbles) return !0;
                if (e.defaultPrevented) return !1;
                for (var n = e.target; n != t.dom; n = n.parentNode)
                    if (!n || 11 == n.nodeType || n.pmViewDesc && n.pmViewDesc.stopEvent(e)) return !1;
                return !0
            }

            function Lt(t, e) {
                qt(t, e) || !cn[e.type] || !t.editable && e.type in ln || cn[e.type](t, e)
            }

            function Jt(t) {
                return {
                    left: t.clientX,
                    top: t.clientY
                }
            }

            function Wt(t, e) {
                var n = e.x - t.clientX,
                    r = e.y - t.clientY;
                return n * n + r * r < 100
            }

            function Kt(t, e, n, r, o) {
                if (-1 == r) return !1;
                for (var i = t.state.doc.resolve(r), s = i.depth + 1; s > 0; s--) {
                    var a = function(r) {
                        if (t.someProp(e, function(e) {
                                return r > i.depth ? e(t, n, i.nodeAfter, i.before(r), o, !0) : e(t, n, i.node(r), i.before(r), o, !1)
                            })) return {
                            v: !0
                        }
                    }(s);
                    if (a) return a.v
                }
                return !1
            }

            function Ht(t, e, n) {
                t.focused || t.focus();
                var r = t.state.tr.setSelection(e);
                "pointer" == n && r.setMeta("pointer", !0), t.dispatch(r)
            }

            function Ut(t, e) {
                if (-1 == e) return !1;
                var n = t.state.doc.resolve(e),
                    r = n.nodeAfter;
                return !!(r && r.isAtom && L.NodeSelection.isSelectable(r)) && (Ht(t, new L.NodeSelection(n), "pointer"), !0)
            }

            function Gt(t, e) {
                if (-1 == e) return !1;
                var n, r, o = t.state.selection;
                o instanceof L.NodeSelection && (n = o.node);
                for (var i = t.state.doc.resolve(e), s = i.depth + 1; s > 0; s--) {
                    var a = s > i.depth ? i.nodeAfter : i.node(s);
                    if (L.NodeSelection.isSelectable(a)) {
                        r = n && o.$from.depth > 0 && s >= o.$from.depth && i.before(o.$from.depth + 1) == o.$from.pos ? i.before(o.$from.depth) : i.before(s);
                        break
                    }
                }
                return null != r && (Ht(t, L.NodeSelection.create(t.state.doc, r), "pointer"), !0)
            }

            function Qt(t, e, n, r, o) {
                return Kt(t, "handleClickOn", e, n, r) || t.someProp("handleClick", function(n) {
                    return n(t, e, r)
                }) || (o ? Gt(t, n) : Ut(t, n))
            }

            function Xt(t, e, n, r) {
                return Kt(t, "handleDoubleClickOn", e, n, r) || t.someProp("handleDoubleClick", function(n) {
                    return n(t, e, r)
                })
            }

            function Yt(t, e, n, r) {
                return Kt(t, "handleTripleClickOn", e, n, r) || t.someProp("handleTripleClick", function(n) {
                    return n(t, e, r)
                }) || Zt(t, n)
            }

            function Zt(t, e) {
                var n = t.state.doc;
                if (-1 == e) return !!n.inlineContent && (Ht(t, L.TextSelection.create(n, 0, n.content.size), "pointer"), !0);
                for (var r = n.resolve(e), o = r.depth + 1; o > 0; o--) {
                    var i = o > r.depth ? r.nodeAfter : r.node(o),
                        s = r.before(o);
                    if (i.inlineContent) Ht(t, L.TextSelection.create(n, s + 1, s + 1 + i.content.size), "pointer");
                    else {
                        if (!L.NodeSelection.isSelectable(i)) continue;
                        Ht(t, L.NodeSelection.create(n, s), "pointer")
                    }
                    return !0
                }
            }

            function te(t) {
                return re(t)
            }

            function ee(t, e) {
                return !!t.composing || !!(Oe.safari && Math.abs(e.timeStamp - t.compositionEndedAt) < 500) && (t.compositionEndedAt = -2e8, !0)
            }

            function ne(t, e) {
                clearTimeout(t.composingTimeout), e > -1 && (t.composingTimeout = setTimeout(function() {
                    return re(t)
                }, e))
            }

            function re(t, e) {
                for (t.composing = !1; t.compositionNodes.length > 0;) t.compositionNodes.pop().markParentsDirty();
                return !(!e && !t.docView.dirty) && (t.updateState(t.state), !0)
            }

            function oe(t, e) {
                var n = t.dom.ownerDocument,
                    r = n.body.appendChild(n.createElement("div"));
                r.appendChild(e), r.style.cssText = "position: fixed; left: -10000px; top: 10px";
                var o = getSelection(),
                    i = n.createRange();
                i.selectNodeContents(e), t.dom.blur(), o.removeAllRanges(), o.addRange(i), setTimeout(function() {
                    n.body.removeChild(r), t.focus()
                }, 50)
            }

            function ie(t) {
                return 0 == t.openStart && 0 == t.openEnd && 1 == t.content.childCount ? t.content.firstChild : null
            }

            function se(t, e) {
                var n = t.dom.ownerDocument,
                    r = t.shiftKey || t.state.selection.$from.parent.type.spec.code,
                    o = n.body.appendChild(n.createElement(r ? "textarea" : "div"));
                r || (o.contentEditable = "true"), o.style.cssText = "position: fixed; left: -10000px; top: 10px", o.focus(), setTimeout(function() {
                    t.focus(), n.body.removeChild(o), r ? ae(t, o.value, null, e) : ae(t, o.textContent, o.innerHTML, e)
                }, 50)
            }

            function ae(t, e, n, r) {
                var o = Nt(t, e, n, t.shiftKey, t.state.selection.$from);
                if (t.someProp("handlePaste", function(e) {
                        return e(t, r, o || i.Slice.empty)
                    }) || !o) return !0;
                var s = ie(o),
                    a = s ? t.state.tr.replaceSelectionWith(s, t.shiftKey) : t.state.tr.replaceSelection(o);
                return t.dispatch(a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0
            }

            function ce(t, e) {
                if (t == e) return !0;
                for (var n in t)
                    if (t[n] !== e[n]) return !1;
                for (var r in e)
                    if (!(r in t)) return !1;
                return !0
            }

            function le(t, e, n, r, o, i, s) {
                for (var a = t.slice(), c = 0; c < n.maps.length; c++) n.maps[c].forEach(function(t, e, n, r) {
                    for (var s = 0; s < a.length; s += 3) {
                        var c = a[s + 1],
                            l = void 0; - 1 == c || t > c + i || (e >= a[s] + i ? a[s + 1] = -1 : (l = r - n - (e - t) + (i - o)) && (a[s] += l, a[s + 1] += l))
                    }
                });
                for (var l = !1, p = 0; p < a.length; p += 3)
                    if (-1 == a[p + 1]) {
                        var u = n.map(a[p] + i),
                            f = u - o;
                        if (f < 0 || f >= r.content.size) {
                            l = !0;
                            continue
                        }
                        var d = n.map(t[p + 1] + i, -1) - o,
                            h = r.content.findIndex(f),
                            m = h.index,
                            v = h.offset,
                            g = r.maybeChild(m);
                        if (g && v == f && v + g.nodeSize == d) {
                            var y = a[p + 2].mapInner(n, g, u + 1, a[p] + i + 1, s);
                            y != Cn ? (a[p] = f, a[p + 1] = d, a[p + 2] = y) : (a[p + 1] = -2, l = !0)
                        } else l = !0
                    }
                if (l) {
                    var w = he(ue(a, t, e || [], n, o, i, s), r, 0, s);
                    e = w.local;
                    for (var b = 0; b < a.length; b += 3) a[b + 1] < 0 && (a.splice(b, 3), b -= 3);
                    for (var S = 0, k = 0; S < w.children.length; S += 3) {
                        for (var x = w.children[S]; k < a.length && a[k] < x;) k += 3;
                        a.splice(k, 0, w.children[S], w.children[S + 1], w.children[S + 2])
                    }
                }
                return new Mn(e && e.sort(me), a)
            }

            function pe(t, e) {
                if (!e || !t.length) return t;
                for (var n = [], r = 0; r < t.length; r++) {
                    var o = t[r];
                    n.push(new bn(o.from + e, o.to + e, o.type))
                }
                return n
            }

            function ue(t, e, n, r, o, i, s) {
                function a(t, e) {
                    for (var i = 0; i < t.local.length; i++) {
                        var c = t.local[i].map(r, o, e);
                        c ? n.push(c) : s.onRemove && s.onRemove(t.local[i].spec)
                    }
                    for (var l = 0; l < t.children.length; l += 3) a(t.children[l + 2], t.children[l] + e + 1)
                }
                for (var c = 0; c < t.length; c += 3) - 1 == t[c + 1] && a(t[c + 2], e[c] + i + 1);
                return n
            }

            function fe(t, e, n) {
                if (e.isLeaf) return null;
                for (var r = n + e.nodeSize, o = null, i = 0, s = void 0; i < t.length; i++)(s = t[i]) && s.from > n && s.to < r && ((o || (o = [])).push(s), t[i] = null);
                return o
            }

            function de(t) {
                for (var e = [], n = 0; n < t.length; n++) null != t[n] && e.push(t[n]);
                return e
            }

            function he(t, e, n, r) {
                var o = [],
                    i = !1;
                e.forEach(function(e, s) {
                    var a = fe(t, e, s + n);
                    if (a) {
                        i = !0;
                        var c = he(a, e, n + s + 1, r);
                        c != Cn && o.push(s, s + e.nodeSize, c)
                    }
                });
                for (var s = pe(i ? de(t) : t, -n).sort(me), a = 0; a < s.length; a++) s[a].type.valid(e, s[a]) || (r.onRemove && r.onRemove(s[a].spec), s.splice(a--, 1));
                return s.length || o.length ? new Mn(s, o) : Cn
            }

            function me(t, e) {
                return t.from - e.from || t.to - e.to
            }

            function ve(t) {
                for (var e = t, n = 0; n < e.length - 1; n++) {
                    var r = e[n];
                    if (r.from != r.to)
                        for (var o = n + 1; o < e.length; o++) {
                            var i = e[o]; {
                                if (i.from != r.from) {
                                    i.from < r.to && (e == t && (e = t.slice()), e[n] = r.copy(r.from, i.from), ge(e, o, r.copy(i.from, r.to)));
                                    break
                                }
                                i.to != r.to && (e == t && (e = t.slice()), e[o] = i.copy(i.from, r.to), ge(e, o + 1, i.copy(r.to, i.to)))
                            }
                        }
                }
                return e
            }

            function ge(t, e, n) {
                for (; e < t.length && me(n, t[e]) > 0;) e++;
                t.splice(e, 0, n)
            }

            function ye(t) {
                var e = [];
                return t.someProp("decorations", function(n) {
                    var r = n(t.state);
                    r && r != Cn && e.push(r)
                }), t.cursorWrapper && e.push(Mn.create(t.state.doc, [t.cursorWrapper.deco])), On.from(e)
            }

            function we(t) {
                var e = Object.create(null);
                return e.class = "ProseMirror", e.contenteditable = String(t.editable), t.someProp("attributes", function(n) {
                    if ("function" == typeof n && (n = n(t.state)), n)
                        for (var r in n) "class" == r ? e.class += " " + n[r] : e[r] || "contenteditable" == r || "nodeName" == r || (e[r] = String(n[r]))
                }), [bn.node(0, t.state.doc.content.size, e)]
            }

            function be(t) {
                var e = t.state.selection,
                    n = e.$head,
                    r = e.$anchor,
                    o = e.visible;
                if (t.markCursor) {
                    var i = document.createElement("img");
                    i.setAttribute("mark-placeholder", "true"), t.cursorWrapper = {
                        dom: i,
                        deco: bn.widget(n.pos, i, {
                            raw: !0,
                            marks: t.markCursor
                        })
                    }
                } else if (o || n.pos != r.pos) t.cursorWrapper = null;
                else {
                    var s;
                    !t.cursorWrapper || t.cursorWrapper.dom.childNodes.length ? ((s = document.createElement("div")).style.position = "absolute", s.style.left = "-100000px") : t.cursorWrapper.deco.pos != n.pos && (s = t.cursorWrapper.dom), s && (t.cursorWrapper = {
                        dom: s,
                        deco: bn.widget(n.pos, s, {
                            raw: !0
                        })
                    })
                }
            }

            function Se(t) {
                return !t.someProp("editable", function(e) {
                    return !1 === e(t.state)
                })
            }

            function ke(t) {
                var e = t.getSelection(),
                    n = e.focusOffset,
                    r = e.focusNode;
                return r && 3 != r.nodeType ? [r, n, 1 == r.nodeType ? r.childNodes[n - 1] : null, 1 == r.nodeType ? r.childNodes[n] : null] : null
            }

            function xe(t, e) {
                var n = ke(e);
                if (!n || 3 == n[0].nodeType) return !1;
                for (var r = 0; r < t.length; r++)
                    if (n[r] != t[r]) return !0;
                return !1
            }

            function Me(t) {
                var e = {};
                return t.someProp("nodeViews", function(t) {
                    for (var n in t) Object.prototype.hasOwnProperty.call(e, n) || (e[n] = t[n])
                }), e
            }

            function Ce(t, e) {
                var n = 0,
                    r = 0;
                for (var o in t) {
                    if (t[o] != e[o]) return !0;
                    n++
                }
                for (var i in e) r++;
                return n != r
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var Oe = {};
            if ("undefined" != typeof navigator && "undefined" != typeof document) {
                var Ne = /Edge\/(\d+)/.exec(navigator.userAgent),
                    Te = /MSIE \d/.test(navigator.userAgent),
                    De = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
                Oe.mac = /Mac/.test(navigator.platform);
                var Ee = Oe.ie = !!(Te || De || Ne);
                Oe.ie_version = Te ? document.documentMode || 6 : De ? +De[1] : Ne ? +Ne[1] : null, Oe.gecko = !Ee && /gecko\/(\d+)/i.test(navigator.userAgent), Oe.gecko_version = Oe.gecko && +(/Firefox\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
                var Ae = !Ee && /Chrome\/(\d+)/.exec(navigator.userAgent);
                Oe.chrome = !!Ae, Oe.chrome_version = Ae && +Ae[1], Oe.ios = !Ee && /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), Oe.android = /Android \d/.test(navigator.userAgent), Oe.webkit = !Ee && "WebkitAppearance" in document.documentElement.style, Oe.safari = /Apple Computer/.test(navigator.vendor), Oe.webkit_version = Oe.webkit && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
            }
            var Ie = function(t) {
                    for (var e = 0;; e++)
                        if (!(t = t.previousSibling)) return e
                },
                Re = function(t) {
                    var e = t.parentNode;
                    return e && 11 == e.nodeType ? e.host : e
                },
                ze = function(t, e, n) {
                    var r = document.createRange();
                    return r.setEnd(t, null == n ? t.nodeValue.length : n), r.setStart(t, e || 0), r
                },
                Pe = function(t, e, r, o) {
                    return r && (n(t, e, r, o, -1) || n(t, e, r, o, 1))
                },
                _e = /^(img|br|input|textarea|hr)$/i,
                Be = function(t) {
                    var e = t.isCollapsed;
                    return e && Oe.chrome && t.rangeCount && !t.getRangeAt(0).collapsed && (e = !1), e
                },
                Fe = /[\u0590-\u08ac]/,
                je = null,
                Ve = null,
                qe = !1,
                $e = function(t, e, n, r) {
                    this.parent = t, this.children = e, this.dom = n, n.pmViewDesc = this, this.contentDOM = r, this.dirty = 0
                },
                Le = {
                    beforePosition: {},
                    size: {},
                    border: {},
                    posBefore: {},
                    posAtStart: {},
                    posAfter: {},
                    posAtEnd: {},
                    contentLost: {}
                };
            $e.prototype.matchesWidget = function() {
                return !1
            }, $e.prototype.matchesMark = function() {
                return !1
            }, $e.prototype.matchesNode = function() {
                return !1
            }, $e.prototype.matchesHack = function() {
                return !1
            }, Le.beforePosition.get = function() {
                return !1
            }, $e.prototype.parseRule = function() {
                return null
            }, $e.prototype.stopEvent = function() {
                return !1
            }, Le.size.get = function() {
                for (var t = this, e = 0, n = 0; n < this.children.length; n++) e += t.children[n].size;
                return e
            }, Le.border.get = function() {
                return 0
            }, $e.prototype.destroy = function() {
                var t = this;
                this.parent = null, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = null);
                for (var e = 0; e < this.children.length; e++) t.children[e].destroy()
            }, $e.prototype.posBeforeChild = function(t) {
                for (var e = this, n = 0, r = this.posAtStart; n < this.children.length; n++) {
                    var o = e.children[n];
                    if (o == t) return r;
                    r += o.size
                }
            }, Le.posBefore.get = function() {
                return this.parent.posBeforeChild(this)
            }, Le.posAtStart.get = function() {
                return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
            }, Le.posAfter.get = function() {
                return this.posBefore + this.size
            }, Le.posAtEnd.get = function() {
                return this.posAtStart + this.size - 2 * this.border
            }, $e.prototype.localPosFromDOM = function(t, e, n) {
                var r = this;
                if (this.contentDOM && this.contentDOM.contains(1 == t.nodeType ? t : t.parentNode)) {
                    if (n < 0) {
                        var o, i;
                        if (t == this.contentDOM) o = t.childNodes[e - 1];
                        else {
                            for (; t.parentNode != this.contentDOM;) t = t.parentNode;
                            o = t.previousSibling
                        }
                        for (; o && (!(i = o.pmViewDesc) || i.parent != this);) o = o.previousSibling;
                        return o ? this.posBeforeChild(i) + i.size : this.posAtStart
                    }
                    var s, a;
                    if (t == this.contentDOM) s = t.childNodes[e];
                    else {
                        for (; t.parentNode != this.contentDOM;) t = t.parentNode;
                        s = t.nextSibling
                    }
                    for (; s && (!(a = s.pmViewDesc) || a.parent != this);) s = s.nextSibling;
                    return s ? this.posBeforeChild(a) : this.posAtEnd
                }
                var c;
                if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) c = 2 & t.compareDocumentPosition(this.contentDOM);
                else if (this.dom.firstChild) {
                    if (0 == e)
                        for (var l = t;; l = l.parentNode) {
                            if (l == r.dom) {
                                c = !1;
                                break
                            }
                            if (l.parentNode.firstChild != l) break
                        }
                    if (null == c && e == t.childNodes.length)
                        for (var p = t;; p = p.parentNode) {
                            if (p == r.dom) {
                                c = !0;
                                break
                            }
                            if (p.parentNode.lastChild != p) break
                        }
                }
                return (null == c ? n > 0 : c) ? this.posAtEnd : this.posAtStart
            }, $e.prototype.nearestDesc = function(t, e) {
                for (var n = this, r = !0, o = t; o; o = o.parentNode) {
                    var i = n.getDesc(o);
                    if (i && (!e || i.node)) {
                        if (!r || !i.nodeDOM || (1 == i.nodeDOM.nodeType ? i.nodeDOM.contains(t) : i.nodeDOM == t)) return i;
                        r = !1
                    }
                }
            }, $e.prototype.getDesc = function(t) {
                for (var e = this, n = t.pmViewDesc, r = n; r; r = r.parent)
                    if (r == e) return n
            }, $e.prototype.posFromDOM = function(t, e, n) {
                for (var r = this, o = t;; o = o.parentNode) {
                    var i = r.getDesc(o);
                    if (i) return i.localPosFromDOM(t, e, n)
                }
            }, $e.prototype.descAt = function(t) {
                for (var e = this, n = 0, r = 0; n < this.children.length; n++) {
                    var o = e.children[n],
                        i = r + o.size;
                    if (r == t && i != r) {
                        for (; !o.border && o.children.length;) o = o.children[0];
                        return o
                    }
                    if (t < i) return o.descAt(t - r - o.border);
                    r = i
                }
            }, $e.prototype.domFromPos = function(t) {
                var e = this;
                if (!this.contentDOM) return {
                    node: this.dom,
                    offset: 0
                };
                for (var n = 0, r = 0;; r++) {
                    if (n == t) {
                        for (; r < this.children.length && (this.children[r].beforePosition || this.children[r].dom.parentNode != this.contentDOM);) r++;
                        return {
                            node: e.contentDOM,
                            offset: r == e.children.length ? e.contentDOM.childNodes.length : Ie(e.children[r].dom)
                        }
                    }
                    if (r == e.children.length) throw new Error("Invalid position " + t);
                    var o = e.children[r],
                        i = n + o.size;
                    if (t < i) return o.domFromPos(t - n - o.border);
                    n = i
                }
            }, $e.prototype.parseRange = function(t, e, n) {
                var r = this;
                if (void 0 === n && (n = 0), 0 == this.children.length) return {
                    node: this.contentDOM,
                    from: t,
                    to: e,
                    fromOffset: 0,
                    toOffset: this.contentDOM.childNodes.length
                };
                for (var o = -1, i = -1, s = n, a = 0;; a++) {
                    var c = r.children[a],
                        l = s + c.size;
                    if (-1 == o && t <= l) {
                        var p = s + c.border;
                        if (t >= p && e <= l - c.border && c.node && c.contentDOM && r.contentDOM.contains(c.contentDOM)) return c.parseRange(t, e, p);
                        t = s;
                        for (var u = a; u > 0; u--) {
                            var f = r.children[u - 1];
                            if (f.size && f.dom.parentNode == r.contentDOM && !f.emptyChildAt(1)) {
                                o = Ie(f.dom) + 1;
                                break
                            }
                            t -= f.size
                        } - 1 == o && (o = 0)
                    }
                    if (o > -1 && e <= l) {
                        e = l;
                        for (var d = a + 1; d < this.children.length; d++) {
                            var h = r.children[d];
                            if (h.size && h.dom.parentNode == r.contentDOM && !h.emptyChildAt(-1)) {
                                i = Ie(h.dom);
                                break
                            }
                            e += h.size
                        } - 1 == i && (i = r.contentDOM.childNodes.length);
                        break
                    }
                    s = l
                }
                return {
                    node: this.contentDOM,
                    from: t,
                    to: e,
                    fromOffset: o,
                    toOffset: i
                }
            }, $e.prototype.emptyChildAt = function(t) {
                if (this.border || !this.contentDOM || !this.children.length) return !1;
                var e = this.children[t < 0 ? 0 : this.children.length - 1];
                return 0 == e.size || e.emptyChildAt(t)
            }, $e.prototype.domAfterPos = function(t) {
                var e = this.domFromPos(t),
                    n = e.node,
                    r = e.offset;
                if (1 != n.nodeType || r == n.childNodes.length) throw new RangeError("No node after pos " + t);
                return n.childNodes[r]
            }, $e.prototype.setSelection = function(t, e, n, r) {
                for (var o = this, i = Math.min(t, e), s = Math.max(t, e), a = 0, c = 0; a < this.children.length; a++) {
                    var l = o.children[a],
                        p = c + l.size;
                    if (i > c && s < p) return l.setSelection(t - c - l.border, e - c - l.border, n, r);
                    c = p
                }
                var u = this.domFromPos(t),
                    f = this.domFromPos(e),
                    d = n.getSelection(),
                    h = document.createRange();
                if (r || !Pe(u.node, u.offset, d.anchorNode, d.anchorOffset) || !Pe(f.node, f.offset, d.focusNode, d.focusOffset)) {
                    if (d.extend) h.setEnd(u.node, u.offset), h.collapse(!1);
                    else {
                        if (t > e) {
                            var m = u;
                            u = f, f = m
                        }
                        h.setEnd(f.node, f.offset), h.setStart(u.node, u.offset)
                    }
                    d.removeAllRanges(), d.addRange(h), d.extend && d.extend(f.node, f.offset)
                }
            }, $e.prototype.ignoreMutation = function(t) {
                return !this.contentDOM
            }, Le.contentLost.get = function() {
                return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM)
            }, $e.prototype.markDirty = function(t, e) {
                for (var n = this, r = 0, o = 0; o < this.children.length; o++) {
                    var i = n.children[o],
                        s = r + i.size;
                    if (r == s ? t <= s && e >= r : t < s && e > r) {
                        var a = r + i.border,
                            c = s - i.border;
                        if (t >= a && e <= c) return n.dirty = t == r || e == s ? 2 : 1, void(t == a && e == c && i.contentLost ? i.dirty = 3 : i.markDirty(t - a, e - a));
                        i.dirty = 3
                    }
                    r = s
                }
                this.dirty = 2
            }, $e.prototype.markParentsDirty = function() {
                for (var t = this.parent; t; t = t.parent) {
                    t.dirty < 2 && (t.dirty = 2)
                }
            }, Object.defineProperties($e.prototype, Le);
            var Je = [],
                We = function(t) {
                    function e(e, n, r, o) {
                        var i, s = n.type.toDOM;
                        if ("function" == typeof s && (s = s(r, function() {
                                return i ? i.parent ? i.parent.posBeforeChild(i) : void 0 : o
                            })), !n.type.spec.raw) {
                            if (1 != s.nodeType) {
                                var a = document.createElement("span");
                                a.appendChild(s), s = a
                            }
                            s.contentEditable = !1, s.classList.add("ProseMirror-widget")
                        }
                        t.call(this, e, Je, s, null), this.widget = n, i = this
                    }
                    t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
                    var n = {
                        beforePosition: {}
                    };
                    return n.beforePosition.get = function() {
                        return this.widget.type.side < 0
                    }, e.prototype.matchesWidget = function(t) {
                        return 0 == this.dirty && t.type.eq(this.widget.type)
                    }, e.prototype.parseRule = function() {
                        return {
                            ignore: !0
                        }
                    }, e.prototype.stopEvent = function(t) {
                        var e = this.widget.spec.stopEvent;
                        return !!e && e(t)
                    }, Object.defineProperties(e.prototype, n), e
                }($e),
                Ke = function(t) {
                    function e(e, n, r, o) {
                        t.call(this, e, Je, n, null), this.textDOM = r, this.text = o
                    }
                    t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
                    var n = {
                        size: {}
                    };
                    return n.size.get = function() {
                        return this.text.length
                    }, e.prototype.localPosFromDOM = function(t, e) {
                        return t != this.textDOM ? this.posAtStart + (e ? this.size : 0) : this.posAtStart + e
                    }, e.prototype.domFromPos = function(t) {
                        return {
                            node: this.textDOM,
                            offset: t
                        }
                    }, e.prototype.ignoreMutation = function(t) {
                        return "characterData" === t.type && t.target.nodeValue == t.oldValue
                    }, Object.defineProperties(e.prototype, n), e
                }($e),
                He = function(t) {
                    function e(e, n, r, o) {
                        t.call(this, e, [], r, o), this.mark = n
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.create = function(t, n, r, o) {
                        var s = o.nodeViews[n.type.name],
                            a = s && s(n, o, r);
                        return a && a.dom || (a = i.DOMSerializer.renderSpec(document, n.type.spec.toDOM(n, r))), new e(t, n, a.dom, a.contentDOM || a.dom)
                    }, e.prototype.parseRule = function() {
                        return {
                            mark: this.mark.type.name,
                            attrs: this.mark.attrs,
                            contentElement: this.contentDOM
                        }
                    }, e.prototype.matchesMark = function(t) {
                        return 3 != this.dirty && this.mark.eq(t)
                    }, e.prototype.markDirty = function(e, n) {
                        if (t.prototype.markDirty.call(this, e, n), 0 != this.dirty) {
                            for (var r = this.parent; !r.node;) r = r.parent;
                            r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = 0
                        }
                    }, e.prototype.slice = function(t, n, r) {
                        var o = e.create(this.parent, this.mark, !0, r),
                            i = this.children,
                            s = this.size;
                        n < s && (i = W(i, n, s, r)), t > 0 && (i = W(i, 0, t, r));
                        for (var a = 0; a < i.length; a++) i[a].parent = o;
                        return o.children = i, o
                    }, e
                }($e),
                Ue = function(t) {
                    function e(e, n, r, o, i, s, a, c, l) {
                        t.call(this, e, n.isLeaf ? Je : [], i, s), this.nodeDOM = a, this.node = n, this.outerDeco = r, this.innerDeco = o, s && this.updateChildren(c, l)
                    }
                    t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
                    var n = {
                        size: {},
                        border: {}
                    };
                    return e.create = function(t, n, r, o, s, a) {
                        var c, l = s.nodeViews[n.type.name],
                            p = l && l(n, s, function() {
                                return c ? c.parent ? c.parent.posBeforeChild(c) : void 0 : a
                            }, r),
                            u = p && p.dom,
                            f = p && p.contentDOM;
                        if (n.isText)
                            if (u) {
                                if (3 != u.nodeType) throw new RangeError("Text must be rendered as a DOM text node")
                            } else u = document.createTextNode(n.text);
                        else if (!u) {
                            var d;
                            u = (d = i.DOMSerializer.renderSpec(document, n.type.spec.toDOM(n))).dom, f = d.contentDOM
                        }
                        f || n.isText || "BR" == u.nodeName || (u.hasAttribute("contenteditable") || (u.contentEditable = !1), n.type.spec.draggable && (u.draggable = !0));
                        var h = u;
                        return u = P(u, r, n), p ? c = new Xe(t, n, r, o, u, f, h, p, s, a + 1) : n.isText ? new Ge(t, n, r, o, u, h, s) : new e(t, n, r, o, u, f, h, s, a + 1)
                    }, e.prototype.parseRule = function() {
                        var t = this;
                        if (this.node.type.spec.reparseInView) return null;
                        var e = {
                            node: this.node.type.name,
                            attrs: this.node.attrs
                        };
                        return this.node.type.spec.code && (e.preserveWhitespace = "full"), this.contentDOM && !this.contentLost ? e.contentElement = this.contentDOM : e.getContent = function() {
                            return t.contentDOM ? i.Fragment.empty : t.node.content
                        }, e
                    }, e.prototype.matchesNode = function(t, e, n) {
                        return 0 == this.dirty && t.eq(this.node) && _(e, this.outerDeco) && n.eq(this.innerDeco)
                    }, n.size.get = function() {
                        return this.node.nodeSize
                    }, n.border.get = function() {
                        return this.node.isLeaf ? 0 : 1
                    }, e.prototype.updateChildren = function(t, e) {
                        var n = this,
                            r = this.node.inlineContent,
                            o = e,
                            s = r && t.composing && this.localCompositionNode(t, e),
                            a = new Ze(this, s && s.node);
                        V(this.node, this.innerDeco, function(e, s) {
                            e.spec.marks ? a.syncToMarks(e.spec.marks, r, t) : e.type.side >= 0 && a.syncToMarks(s == n.node.childCount ? i.Mark.none : n.node.child(s).marks, r, t), a.placeWidget(e, t, o)
                        }, function(e, n, i, s) {
                            a.syncToMarks(e.marks, r, t), a.findNodeMatch(e, n, i, s) || a.updateNextNode(e, n, i, t, s) || a.addNode(e, n, i, t, o), o += e.nodeSize
                        }), a.syncToMarks(Je, r, t), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || 2 == this.dirty) && (s && this.protectLocalComposition(t, s), this.renderChildren())
                    }, e.prototype.renderChildren = function() {
                        E(this.contentDOM, this.children, e.is), Oe.ios && q(this.dom)
                    }, e.prototype.localCompositionNode = function(t, e) {
                        var n = t.state.selection,
                            r = n.from,
                            o = n.to;
                        if (!(!(t.state.selection instanceof L.TextSelection) || r < e || o > e + this.node.content.size)) {
                            var i = t.root.getSelection(),
                                s = $(i.focusNode, i.focusOffset);
                            if (s && this.dom.contains(s.parentNode)) {
                                var a = s.nodeValue,
                                    c = J(this.node.content, a, r - e, o - e);
                                return c < 0 ? null : {
                                    node: s,
                                    pos: c,
                                    text: a
                                }
                            }
                        }
                    }, e.prototype.protectLocalComposition = function(t, e) {
                        var n = this,
                            r = e.node,
                            o = e.pos,
                            i = e.text;
                        if (!this.getDesc(r)) {
                            for (var s = r; s.parentNode != n.contentDOM; s = s.parentNode) {
                                for (; s.previousSibling;) s.parentNode.removeChild(s.previousSibling);
                                for (; s.nextSibling;) s.parentNode.removeChild(s.nextSibling);
                                s.pmViewDesc && (s.pmViewDesc = null)
                            }
                            var a = new Ke(this, s, r, i);
                            t.compositionNodes.push(a), this.children = W(this.children, o, o + i.length, t, a)
                        }
                    }, e.prototype.update = function(t, e, n, r) {
                        return !(3 == this.dirty || !t.sameMarkup(this.node)) && (this.updateInner(t, e, n, r), !0)
                    }, e.prototype.updateInner = function(t, e, n, r) {
                        this.updateOuterDeco(e), this.node = t, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = 0
                    }, e.prototype.updateOuterDeco = function(t) {
                        if (!_(t, this.outerDeco)) {
                            var e = 1 != this.nodeDOM.nodeType,
                                n = this.dom;
                            this.dom = R(this.dom, this.nodeDOM, I(this.outerDeco, this.node, e), I(t, this.node, e)), this.dom != n && (n.pmViewDesc = null, this.dom.pmViewDesc = this), this.outerDeco = t
                        }
                    }, e.prototype.selectNode = function() {
                        this.nodeDOM.classList.add("ProseMirror-selectednode"), !this.contentDOM && this.node.type.spec.draggable || (this.dom.draggable = !0)
                    }, e.prototype.deselectNode = function() {
                        this.nodeDOM.classList.remove("ProseMirror-selectednode"), !this.contentDOM && this.node.type.spec.draggable || (this.dom.draggable = !1)
                    }, Object.defineProperties(e.prototype, n), e
                }($e),
                Ge = function(t) {
                    function e(e, n, r, o, i, s, a) {
                        t.call(this, e, n, r, o, i, null, s, a)
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.parseRule = function() {
                        var t = this.nodeDOM.parentNode;
                        return t ? {
                            skip: t
                        } : {
                            ignore: !0
                        }
                    }, e.prototype.update = function(t, e) {
                        return !(3 == this.dirty || 0 != this.dirty && !this.inParent() || !t.sameMarkup(this.node)) && (this.updateOuterDeco(e), 0 == this.dirty && t.text == this.node.text || t.text == this.nodeDOM.nodeValue || (this.nodeDOM.nodeValue = t.text), this.node = t, this.dirty = 0, !0)
                    }, e.prototype.inParent = function() {
                        for (var t = this.parent.contentDOM, e = this.nodeDOM; e; e = e.parentNode)
                            if (e == t) return !0;
                        return !1
                    }, e.prototype.domFromPos = function(t) {
                        return {
                            node: this.nodeDOM,
                            offset: t
                        }
                    }, e.prototype.localPosFromDOM = function(e, n, r) {
                        return e == this.nodeDOM ? this.posAtStart + Math.min(n, this.node.text.length) : t.prototype.localPosFromDOM.call(this, e, n, r)
                    }, e.prototype.ignoreMutation = function(t) {
                        return "characterData" != t.type && "selection" != t.type
                    }, e.prototype.slice = function(t, n, r) {
                        var o = this.node.cut(t, n),
                            i = document.createTextNode(o.text);
                        return new e(this.parent, o, this.outerDeco, this.innerDeco, i, i, r)
                    }, e
                }(Ue),
                Qe = function(t) {
                    function e() {
                        t.apply(this, arguments)
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.parseRule = function() {
                        return {
                            ignore: !0
                        }
                    }, e.prototype.matchesHack = function() {
                        return 0 == this.dirty
                    }, e
                }($e),
                Xe = function(t) {
                    function e(e, n, r, o, i, s, a, c, l, p) {
                        t.call(this, e, n, r, o, i, s, a, l, p), this.spec = c
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.update = function(e, n, r, o) {
                        if (3 == this.dirty) return !1;
                        if (this.spec.update) {
                            var i = this.spec.update(e, n);
                            return i && this.updateInner(e, n, r, o), i
                        }
                        return !(!this.contentDOM && !e.isLeaf) && t.prototype.update.call(this, e, n, r, o)
                    }, e.prototype.selectNode = function() {
                        this.spec.selectNode ? this.spec.selectNode() : t.prototype.selectNode.call(this)
                    }, e.prototype.deselectNode = function() {
                        this.spec.deselectNode ? this.spec.deselectNode() : t.prototype.deselectNode.call(this)
                    }, e.prototype.setSelection = function(e, n, r, o) {
                        this.spec.setSelection ? this.spec.setSelection(e, n, r) : t.prototype.setSelection.call(this, e, n, r, o)
                    }, e.prototype.destroy = function() {
                        this.spec.destroy && this.spec.destroy(), t.prototype.destroy.call(this)
                    }, e.prototype.stopEvent = function(t) {
                        return !!this.spec.stopEvent && this.spec.stopEvent(t)
                    }, e.prototype.ignoreMutation = function(e) {
                        return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : t.prototype.ignoreMutation.call(this, e)
                    }, e
                }(Ue);
            A.prototype = Object.create(null);
            var Ye = [new A],
                Ze = function(t, e) {
                    this.top = t, this.lock = e, this.index = 0, this.stack = [], this.changed = !1;
                    var n = F(t.node.content, t.children);
                    this.preMatched = n.nodes, this.preMatchOffset = n.offset
                };
            Ze.prototype.getPreMatch = function(t) {
                return t >= this.preMatchOffset ? this.preMatched[t - this.preMatchOffset] : null
            }, Ze.prototype.destroyBetween = function(t, e) {
                var n = this;
                if (t != e) {
                    for (var r = t; r < e; r++) n.top.children[r].destroy();
                    this.top.children.splice(t, e - t), this.changed = !0
                }
            }, Ze.prototype.destroyRest = function() {
                this.destroyBetween(this.index, this.top.children.length)
            }, Ze.prototype.syncToMarks = function(t, e, n) {
                for (var r = this, o = 0, i = this.stack.length >> 1, s = Math.min(i, t.length); o < s && (o == i - 1 ? this.top : this.stack[o + 1 << 1]).matchesMark(t[o]) && !1 !== t[o].type.spec.spanning;) o++;
                for (; o < i;) r.destroyRest(), r.top.dirty = 0, r.index = r.stack.pop(), r.top = r.stack.pop(), i--;
                for (; i < t.length;) {
                    r.stack.push(r.top, r.index + 1);
                    for (var a = -1, c = this.index; c < Math.min(this.index + 3, this.top.children.length); c++)
                        if (r.top.children[c].matchesMark(t[i])) {
                            a = c;
                            break
                        }
                    if (a > -1) a > r.index && (r.changed = !0, r.destroyBetween(r.index, a)), r.top = r.top.children[r.index];
                    else {
                        var l = He.create(r.top, t[i], e, n);
                        r.top.children.splice(r.index, 0, l), r.top = l, r.changed = !0
                    }
                    r.index = 0, i++
                }
            }, Ze.prototype.findNodeMatch = function(t, e, n, r) {
                var o = this,
                    i = -1,
                    s = r < 0 ? void 0 : this.getPreMatch(r),
                    a = this.top.children;
                if (s && s.matchesNode(t, e, n)) i = a.indexOf(s);
                else
                    for (var c = this.index, l = Math.min(a.length, c + 5); c < l; c++) {
                        var p = a[c];
                        if (p.matchesNode(t, e, n) && o.preMatched.indexOf(p) < 0) {
                            i = c;
                            break
                        }
                    }
                return !(i < 0) && (this.destroyBetween(this.index, i), this.index++, !0)
            }, Ze.prototype.updateNextNode = function(t, e, n, r, o) {
                if (this.index == this.top.children.length) return !1;
                var i = this.top.children[this.index];
                if (i instanceof Ue) {
                    var s = this.preMatched.indexOf(i);
                    if (s > -1 && s + this.preMatchOffset != o) return !1;
                    var a = i.dom;
                    if (!(this.lock && (a == this.lock || 1 == a.nodeType && a.contains(this.lock.parentNode)) && !(t.isText && i.node && i.node.isText && i.nodeDOM.nodeValue == t.text && 3 != i.dirty && _(e, i.outerDeco))) && i.update(t, e, n, r)) return i.dom != a && (this.changed = !0), this.index++, !0
                }
                return !1
            }, Ze.prototype.addNode = function(t, e, n, r, o) {
                this.top.children.splice(this.index++, 0, Ue.create(this.top, t, e, n, r, o)), this.changed = !0
            }, Ze.prototype.placeWidget = function(t, e, n) {
                if (this.index < this.top.children.length && this.top.children[this.index].matchesWidget(t)) this.index++;
                else {
                    var r = new We(this.top, t, e, n);
                    this.top.children.splice(this.index++, 0, r), this.changed = !0
                }
            }, Ze.prototype.addTextblockHacks = function() {
                for (var t = this.top.children[this.index - 1]; t instanceof He;) t = t.children[t.children.length - 1];
                if (!t || !(t instanceof Ge) || /\n$/.test(t.node.text))
                    if (this.index < this.top.children.length && this.top.children[this.index].matchesHack()) this.index++;
                    else {
                        var e = document.createElement("br");
                        this.top.children.splice(this.index++, 0, new Qe(this.top, Je, e, null)), this.changed = !0
                    }
            };
            var tn = Oe.safari || Oe.chrome && Oe.chrome_version < 63,
                en = {
                    thead: ["table"],
                    colgroup: ["table"],
                    col: ["table", "colgroup"],
                    tr: ["table", "tbody"],
                    td: ["table", "tbody", "tr"],
                    th: ["table", "tbody", "tr"]
                },
                nn = null,
                rn = {
                    childList: !0,
                    characterData: !0,
                    attributes: !0,
                    subtree: !0,
                    characterDataOldValue: !0
                },
                on = Oe.ie && Oe.ie_version <= 11,
                sn = function() {
                    this.anchorNode = this.anchorOffset = this.focusNode = this.focusOffset = null
                };
            sn.prototype.set = function(t) {
                this.anchorNode = t.anchorNode, this.anchorOffset = t.anchorOffset, this.focusNode = t.focusNode, this.focusOffset = t.focusOffset
            }, sn.prototype.eq = function(t) {
                return t.anchorNode == this.anchorNode && t.anchorOffset == this.anchorOffset && t.focusNode == this.focusNode && t.focusOffset == this.focusOffset
            };
            var an = function(t, e) {
                var n = this;
                this.view = t, this.handleDOMChange = e, this.queue = [], this.flushingSoon = !1, this.observer = window.MutationObserver && new window.MutationObserver(function(t) {
                    for (var e = 0; e < t.length; e++) n.queue.push(t[e]);
                    Oe.ie && Oe.ie_version <= 11 && t.some(function(t) {
                        return "childList" == t.type && 1 == t.removedNodes.length && t.removedNodes[0].parentNode == t.target || "characterData" == t.type && t.oldValue.length > t.target.nodeValue.length
                    }) ? n.flushSoon() : n.flush()
                }), this.currentSelection = new sn, on && (this.onCharData = function(t) {
                    n.queue.push({
                        target: t.target,
                        type: "characterData",
                        oldValue: t.prevValue
                    }), n.flushSoon()
                }), this.onSelectionChange = this.onSelectionChange.bind(this), this.suppressingSelectionUpdates = !1
            };
            an.prototype.flushSoon = function() {
                var t = this;
                this.flushingSoon || (this.flushingSoon = !0, window.setTimeout(function() {
                    t.flushingSoon = !1, t.flush()
                }, 20))
            }, an.prototype.start = function() {
                this.observer && this.observer.observe(this.view.dom, rn), on && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection()
            }, an.prototype.stop = function() {
                var t = this,
                    e = this.observer.takeRecords();
                if (e.length) {
                    for (var n = 0; n < e.length; n++) t.queue.push(e[n]);
                    window.setTimeout(function() {
                        return t.flush()
                    }, 20)
                }
                this.observer && this.observer.disconnect(), on && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection()
            }, an.prototype.connectSelection = function() {
                this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange)
            }, an.prototype.disconnectSelection = function() {
                this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange)
            }, an.prototype.suppressSelectionUpdates = function() {
                var t = this;
                this.suppressingSelectionUpdates = !0, setTimeout(function() {
                    return t.suppressingSelectionUpdates = !1
                }, 50)
            }, an.prototype.onSelectionChange = function() {
                if (mt(this.view)) return this.suppressingSelectionUpdates ? ct(this.view) : void this.flush()
            }, an.prototype.setCurSelection = function() {
                this.currentSelection.set(this.view.root.getSelection())
            }, an.prototype.ignoreSelectionChange = function(t) {
                if (0 == t.rangeCount) return !0;
                var e = t.getRangeAt(0).commonAncestorContainer,
                    n = this.view.docView.nearestDesc(e);
                return n && n.ignoreMutation({
                    type: "selection",
                    target: 3 == e.nodeType ? e.parentNode : e
                })
            }, an.prototype.flush = function() {
                var t = this;
                if (this.view.docView && !this.flushingSoon) {
                    var e = this.observer.takeRecords();
                    this.queue.length && (e = this.queue.concat(e), this.queue.length = 0);
                    var n = this.view.root.getSelection(),
                        r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && vt(this.view) && !this.ignoreSelectionChange(n),
                        o = -1,
                        i = -1,
                        s = !1;
                    if (this.view.editable)
                        for (var a = 0; a < e.length; a++) {
                            var c = t.registerMutation(e[a]);
                            c && (o = o < 0 ? c.from : Math.min(c.from, o), i = i < 0 ? c.to : Math.max(c.to, i), c.typeOver && !t.view.composing && (s = !0))
                        }(o > -1 || r) && (o > -1 && this.view.docView.markDirty(o, i), this.handleDOMChange(o, i, s), this.view.docView.dirty ? this.view.updateState(this.view.state) : this.currentSelection.eq(n) || ct(this.view))
                }
            }, an.prototype.registerMutation = function(t) {
                var e = this.view.docView.nearestDesc(t.target);
                if ("attributes" == t.type && (e == this.view.docView || "contenteditable" == t.attributeName || "style" == t.attributeName && !t.oldValue && !t.target.getAttribute("style"))) return null;
                if (!e || e.ignoreMutation(t)) return null;
                if ("childList" == t.type) {
                    var n = t.previousSibling,
                        r = t.nextSibling;
                    if (Oe.ie && Oe.ie_version <= 11) {
                        for (; n && "BR" == n.nodeName;) n = n.previousSibling;
                        for (; r && "BR" == r.nodeName;) r = r.previousSibling
                    }
                    var o = n && n.parentNode == t.target ? Ie(n) + 1 : 0,
                        i = e.localPosFromDOM(t.target, o, -1),
                        s = r && r.parentNode == t.target ? Ie(r) : t.target.childNodes.length;
                    return {
                        from: i,
                        to: e.localPosFromDOM(t.target, s, 1)
                    }
                }
                return "attributes" == t.type ? {
                    from: e.posAtStart - e.border,
                    to: e.posAtEnd + e.border
                } : {
                    from: e.posAtStart,
                    to: e.posAtEnd,
                    typeOver: t.target.nodeValue == t.oldValue
                }
            };
            var cn = {},
                ln = {};
            ln.keydown = function(t, e) {
                t.shiftKey = 16 == e.keyCode || e.shiftKey, ee(t, e) || (t.lastKeyCode = e.keyCode, t.lastKeyCodeTime = Date.now(), t.someProp("handleKeyDown", function(n) {
                    return n(t, e)
                }) || st(t, e) ? e.preventDefault() : Ft(t, "key"))
            }, ln.keyup = function(t, e) {
                16 == e.keyCode && (t.shiftKey = !1)
            }, ln.keypress = function(t, e) {
                if (!(ee(t, e) || !e.charCode || e.ctrlKey && !e.altKey || Oe.mac && e.metaKey))
                    if (t.someProp("handleKeyPress", function(n) {
                            return n(t, e)
                        })) e.preventDefault();
                    else {
                        var n = t.state.selection;
                        if (!(n instanceof L.TextSelection && n.$from.sameParent(n.$to))) {
                            var r = String.fromCharCode(e.charCode);
                            t.someProp("handleTextInput", function(e) {
                                return e(t, n.$from.pos, n.$to.pos, r)
                            }) || t.dispatch(t.state.tr.insertText(r).scrollIntoView()), e.preventDefault()
                        }
                    }
            };
            var pn = Oe.mac ? "metaKey" : "ctrlKey";
            cn.mousedown = function(t, e) {
                t.shiftKey = e.shiftKey;
                var n = te(t),
                    r = Date.now(),
                    o = "singleClick";
                r - t.lastClick.time < 500 && Wt(e, t.lastClick) && !e[pn] && ("singleClick" == t.lastClick.type ? o = "doubleClick" : "doubleClick" == t.lastClick.type && (o = "tripleClick")), t.lastClick = {
                    time: r,
                    x: e.clientX,
                    y: e.clientY,
                    type: o
                };
                var i = t.posAtCoords(Jt(e));
                i && ("singleClick" == o ? t.mouseDown = new un(t, i, e, n) : ("doubleClick" == o ? Xt : Yt)(t, i.pos, i.inside, e) ? e.preventDefault() : Ft(t, "pointer"))
            };
            var un = function(t, e, n, r) {
                var o = this;
                this.view = t, this.startDoc = t.state.doc, this.pos = e, this.event = n, this.flushed = r, this.selectNode = n[pn], this.allowDefault = n.shiftKey;
                var i, s;
                if (e.inside > -1) i = t.state.doc.nodeAt(e.inside), s = e.inside;
                else {
                    var a = t.state.doc.resolve(e.pos);
                    i = a.parent, s = a.depth ? a.before() : 0
                }
                this.mightDrag = null;
                var c = r ? null : n.target,
                    l = c ? t.docView.nearestDesc(c, !0) : null;
                this.target = l ? l.dom : null, (i.type.spec.draggable && !1 !== i.type.spec.selectable || t.state.selection instanceof L.NodeSelection && s == t.state.selection.from) && (this.mightDrag = {
                    node: i,
                    pos: s,
                    addAttr: this.target && !this.target.draggable,
                    setUneditable: this.target && Oe.gecko && !this.target.hasAttribute("contentEditable")
                }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(function() {
                    return o.target.setAttribute("contentEditable", "false")
                }, 20), this.view.domObserver.start()), t.root.addEventListener("mouseup", this.up = this.up.bind(this)), t.root.addEventListener("mousemove", this.move = this.move.bind(this)), Ft(t, "pointer")
            };
            un.prototype.done = function() {
                this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !1), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.view.mouseDown = null
            }, un.prototype.up = function(t) {
                if (this.done(), this.view.dom.contains(3 == t.target.nodeType ? t.target.parentNode : t.target)) {
                    var e = this.pos;
                    this.view.state.doc != this.startDoc && (e = this.view.posAtCoords(Jt(t))), this.allowDefault || !e ? Ft(this.view, "pointer") : Qt(this.view, e.pos, e.inside, t, this.selectNode) ? t.preventDefault() : !this.flushed && (!Oe.chrome || this.view.state.selection instanceof L.TextSelection || e.pos != this.view.state.selection.from && e.pos != this.view.state.selection.to) ? Ft(this.view, "pointer") : (Ht(this.view, L.Selection.near(this.view.state.doc.resolve(e.pos)), "pointer"), t.preventDefault())
                }
            }, un.prototype.move = function(t) {
                !this.allowDefault && (Math.abs(this.event.x - t.clientX) > 4 || Math.abs(this.event.y - t.clientY) > 4) && (this.allowDefault = !0), Ft(this.view, "pointer")
            }, cn.touchdown = function(t) {
                te(t), Ft(t, "pointer")
            }, cn.contextmenu = function(t) {
                return te(t)
            };
            var fn = Oe.android ? 5e3 : -1;
            ln.compositionstart = ln.compositionupdate = function(t) {
                if (!t.composing) {
                    t.domObserver.flush();
                    var e = t.state,
                        n = e.selection.$from;
                    if (e.selection.empty && (e.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some(function(t) {
                            return !1 === t.type.spec.inclusive
                        }))) t.markCursor = t.state.storedMarks || n.marks(), re(t, !0), t.markCursor = null;
                    else if (re(t), Oe.gecko && e.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length)
                        for (var r = t.root.getSelection(), o = r.focusNode, i = r.focusOffset; o && 1 == o.nodeType && 0 != i;) {
                            var s = i < 0 ? o.lastChild : o.childNodes[i - 1];
                            if (3 == s.nodeType) {
                                r.collapse(s, s.nodeValue.length);
                                break
                            }
                            o = s, i = -1
                        }
                    t.composing = !0
                }
                ne(t, fn)
            }, ln.compositionend = function(t, e) {
                t.composing && (t.composing = !1, t.compositionEndedAt = e.timeStamp, ne(t, 20))
            };
            var dn = Oe.ie && Oe.ie_version < 15 || Oe.ios && Oe.webkit_version < 604;
            cn.copy = ln.cut = function(t, e) {
                var n = t.state.selection,
                    r = "cut" == e.type;
                if (!n.empty) {
                    var o = dn ? null : e.clipboardData,
                        i = Ot(t, n.content()),
                        s = i.dom,
                        a = i.text;
                    o ? (e.preventDefault(), o.clearData(), o.setData("text/html", s.innerHTML), o.setData("text/plain", a)) : oe(t, s), r && t.dispatch(t.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"))
                }
            }, ln.paste = function(t, e) {
                var n = dn ? null : e.clipboardData;
                n && (ae(t, n.getData("text/plain"), n.getData("text/html"), e) || n.files.length > 0) ? e.preventDefault() : se(t, e)
            };
            var hn = function(t, e) {
                    this.slice = t, this.move = e
                },
                mn = Oe.mac ? "altKey" : "ctrlKey";
            cn.dragstart = function(t, e) {
                var n = t.mouseDown;
                if (n && n.done(), e.dataTransfer) {
                    var r = t.state.selection,
                        o = r.empty ? null : t.posAtCoords(Jt(e));
                    if (o && o.pos >= r.from && o.pos <= (r instanceof L.NodeSelection ? r.to - 1 : r.to));
                    else if (n && n.mightDrag) t.dispatch(t.state.tr.setSelection(L.NodeSelection.create(t.state.doc, n.mightDrag.pos)));
                    else if (e.target && 1 == e.target.nodeType) {
                        var i = t.docView.nearestDesc(e.target, !0);
                        if (!i || !i.node.type.spec.draggable || i == t.docView) return;
                        t.dispatch(t.state.tr.setSelection(L.NodeSelection.create(t.state.doc, i.posBefore)))
                    }
                    var s = t.state.selection.content(),
                        a = Ot(t, s),
                        c = a.dom,
                        l = a.text;
                    e.dataTransfer.clearData(), e.dataTransfer.setData(dn ? "Text" : "text/html", c.innerHTML), dn || e.dataTransfer.setData("text/plain", l), t.dragging = new hn(s, !e[mn])
                }
            }, cn.dragend = function(t) {
                window.setTimeout(function() {
                    return t.dragging = null
                }, 50)
            }, ln.dragover = ln.dragenter = function(t, e) {
                return e.preventDefault()
            }, ln.drop = function(t, e) {
                var n = t.dragging;
                if (t.dragging = null, e.dataTransfer) {
                    var r = t.posAtCoords(Jt(e));
                    if (r) {
                        var o = t.state.doc.resolve(r.pos);
                        if (o) {
                            var i = n && n.slice || Nt(t, e.dataTransfer.getData(dn ? "Text" : "text/plain"), dn ? null : e.dataTransfer.getData("text/html"), !1, o);
                            if (i && (e.preventDefault(), !t.someProp("handleDrop", function(r) {
                                    return r(t, e, i, n && n.move)
                                }))) {
                                var s = i ? S.dropPoint(t.state.doc, o.pos, i) : o.pos;
                                null == s && (s = o.pos);
                                var a = t.state.tr;
                                n && n.move && a.deleteSelection();
                                var c = a.mapping.map(s),
                                    l = 0 == i.openStart && 0 == i.openEnd && 1 == i.content.childCount,
                                    p = a.doc;
                                if (l ? a.replaceRangeWith(c, c, i.content.firstChild) : a.replaceRange(c, c, i), !a.doc.eq(p)) {
                                    var u = a.doc.resolve(c);
                                    l && L.NodeSelection.isSelectable(i.content.firstChild) && u.nodeAfter && u.nodeAfter.sameMarkup(i.content.firstChild) ? a.setSelection(new L.NodeSelection(u)) : a.setSelection(ht(t, u, a.doc.resolve(a.mapping.map(s)))), t.focus(), t.dispatch(a.setMeta("uiEvent", "drop"))
                                }
                            }
                        }
                    }
                }
            }, cn.focus = function(t) {
                t.focused || (t.domObserver.stop(), t.dom.classList.add("ProseMirror-focused"), t.domObserver.start(), t.focused = !0)
            }, cn.blur = function(t) {
                t.focused && (t.domObserver.stop(), t.dom.classList.remove("ProseMirror-focused"), t.domObserver.start(), t.focused = !1)
            }, cn.beforeinput = function(t, e) {
                if (Oe.chrome && Oe.android && "deleteContentBackward" == e.inputType) {
                    var n = t.domChangeCount;
                    setTimeout(function() {
                        if (t.domChangeCount == n && (t.dom.blur(), t.focus(), !t.someProp("handleKeyDown", function(e) {
                                return e(t, s(8, "Backspace"))
                            }))) {
                            var e = t.state.selection.$cursor;
                            e && e.pos > 0 && t.dispatch(t.state.tr.delete(e.pos - 1, e.pos).scrollIntoView())
                        }
                    }, 50)
                }
            };
            for (var vn in ln) cn[vn] = ln[vn];
            var gn = function(t, e) {
                this.spec = e || xn, this.side = this.spec.side || 0, this.toDOM = t
            };
            gn.prototype.map = function(t, e, n, r) {
                var o = t.mapResult(e.from + r, this.side < 0 ? -1 : 1),
                    i = o.pos;
                return o.deleted ? null : new bn(i - n, i - n, this)
            }, gn.prototype.valid = function() {
                return !0
            }, gn.prototype.eq = function(t) {
                return this == t || t instanceof gn && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && ce(this.spec, t.spec))
            };
            var yn = function(t, e) {
                this.spec = e || xn, this.attrs = t
            };
            yn.prototype.map = function(t, e, n, r) {
                var o = t.map(e.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
                    i = t.map(e.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
                return o >= i ? null : new bn(o, i, this)
            }, yn.prototype.valid = function(t, e) {
                return e.from < e.to
            }, yn.prototype.eq = function(t) {
                return this == t || t instanceof yn && ce(this.attrs, t.attrs) && ce(this.spec, t.spec)
            }, yn.is = function(t) {
                return t.type instanceof yn
            };
            var wn = function(t, e) {
                this.spec = e || xn, this.attrs = t
            };
            wn.prototype.map = function(t, e, n, r) {
                var o = t.mapResult(e.from + r, 1);
                if (o.deleted) return null;
                var i = t.mapResult(e.to + r, -1);
                return i.deleted || i.pos <= o.pos ? null : new bn(o.pos - n, i.pos - n, this)
            }, wn.prototype.valid = function(t, e) {
                var n = t.content.findIndex(e.from),
                    r = n.index,
                    o = n.offset;
                return o == e.from && o + t.child(r).nodeSize == e.to
            }, wn.prototype.eq = function(t) {
                return this == t || t instanceof wn && ce(this.attrs, t.attrs) && ce(this.spec, t.spec)
            };
            var bn = function(t, e, n) {
                    this.from = t, this.to = e, this.type = n
                },
                Sn = {
                    spec: {}
                };
            bn.prototype.copy = function(t, e) {
                return new bn(t, e, this.type)
            }, bn.prototype.eq = function(t) {
                return this.type.eq(t.type) && this.from == t.from && this.to == t.to
            }, bn.prototype.map = function(t, e, n) {
                return this.type.map(t, this, e, n)
            }, bn.widget = function(t, e, n) {
                return new bn(t, t, new gn(e, n))
            }, bn.inline = function(t, e, n, r) {
                return new bn(t, e, new yn(n, r))
            }, bn.node = function(t, e, n, r) {
                return new bn(t, e, new wn(n, r))
            }, Sn.spec.get = function() {
                return this.type.spec
            }, Object.defineProperties(bn.prototype, Sn);
            var kn = [],
                xn = {},
                Mn = function(t, e) {
                    this.local = t && t.length ? t : kn, this.children = e && e.length ? e : kn
                };
            Mn.create = function(t, e) {
                return e.length ? he(e, t, 0, xn) : Cn
            }, Mn.prototype.find = function(t, e, n) {
                var r = [];
                return this.findInner(null == t ? 0 : t, null == e ? 1e9 : e, r, 0, n), r
            }, Mn.prototype.findInner = function(t, e, n, r, o) {
                for (var i = this, s = 0; s < this.local.length; s++) {
                    var a = i.local[s];
                    a.from <= e && a.to >= t && (!o || o(a.spec)) && n.push(a.copy(a.from + r, a.to + r))
                }
                for (var c = 0; c < this.children.length; c += 3)
                    if (i.children[c] < e && i.children[c + 1] > t) {
                        var l = i.children[c] + 1;
                        i.children[c + 2].findInner(t - l, e - l, n, r + l, o)
                    }
            }, Mn.prototype.map = function(t, e, n) {
                return this == Cn || 0 == t.maps.length ? this : this.mapInner(t, e, 0, 0, n || xn)
            }, Mn.prototype.mapInner = function(t, e, n, r, o) {
                for (var i, s = this, a = 0; a < this.local.length; a++) {
                    var c = s.local[a].map(t, n, r);
                    c && c.type.valid(e, c) ? (i || (i = [])).push(c) : o.onRemove && o.onRemove(s.local[a].spec)
                }
                return this.children.length ? le(this.children, i, t, e, n, r, o) : i ? new Mn(i.sort(me)) : Cn
            }, Mn.prototype.add = function(t, e) {
                return e.length ? this == Cn ? Mn.create(t, e) : this.addInner(t, e, 0) : this
            }, Mn.prototype.addInner = function(t, e, n) {
                var r, o = this,
                    i = 0;
                t.forEach(function(t, s) {
                    var a, c = s + n;
                    if (a = fe(e, t, c)) {
                        for (r || (r = o.children.slice()); i < r.length && r[i] < s;) i += 3;
                        r[i] == s ? r[i + 2] = r[i + 2].addInner(t, a, c + 1) : r.splice(i, 0, s, s + t.nodeSize, he(a, t, c + 1, xn)), i += 3
                    }
                });
                var s = pe(i ? de(e) : e, -n);
                return new Mn(s.length ? this.local.concat(s).sort(me) : this.local, r || this.children)
            }, Mn.prototype.remove = function(t) {
                return 0 == t.length || this == Cn ? this : this.removeInner(t, 0)
            }, Mn.prototype.removeInner = function(t, e) {
                for (var n = this, r = this.children, o = this.local, i = 0; i < r.length; i += 3) {
                    for (var s = void 0, a = r[i] + e, c = r[i + 1] + e, l = 0, p = void 0; l < t.length; l++)(p = t[l]) && p.from > a && p.to < c && (t[l] = null, (s || (s = [])).push(p));
                    if (s) {
                        r == n.children && (r = n.children.slice());
                        var u = r[i + 2].removeInner(s, a + 1);
                        u != Cn ? r[i + 2] = u : (r.splice(i, 3), i -= 3)
                    }
                }
                if (o.length)
                    for (var f = 0, d = void 0; f < t.length; f++)
                        if (d = t[f])
                            for (var h = 0; h < o.length; h++) o[h].type.eq(d.type) && (o == n.local && (o = n.local.slice()), o.splice(h--, 1));
                return r == this.children && o == this.local ? this : o.length || r.length ? new Mn(o, r) : Cn
            }, Mn.prototype.forChild = function(t, e) {
                var n = this;
                if (this == Cn) return this;
                if (e.isLeaf) return Mn.empty;
                for (var r, o, i = 0; i < this.children.length; i += 3)
                    if (n.children[i] >= t) {
                        n.children[i] == t && (r = n.children[i + 2]);
                        break
                    }
                for (var s = t + 1, a = s + e.content.size, c = 0; c < this.local.length; c++) {
                    var l = n.local[c];
                    if (l.from < a && l.to > s && l.type instanceof yn) {
                        var p = Math.max(s, l.from) - s,
                            u = Math.min(a, l.to) - s;
                        p < u && (o || (o = [])).push(l.copy(p, u))
                    }
                }
                if (o) {
                    var f = new Mn(o.sort(me));
                    return r ? new On([f, r]) : f
                }
                return r || Cn
            }, Mn.prototype.eq = function(t) {
                var e = this;
                if (this == t) return !0;
                if (!(t instanceof Mn) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
                for (var n = 0; n < this.local.length; n++)
                    if (!e.local[n].eq(t.local[n])) return !1;
                for (var r = 0; r < this.children.length; r += 3)
                    if (e.children[r] != t.children[r] || e.children[r + 1] != t.children[r + 1] || !e.children[r + 2].eq(t.children[r + 2])) return !1;
                return !0
            }, Mn.prototype.locals = function(t) {
                return ve(this.localsInner(t))
            }, Mn.prototype.localsInner = function(t) {
                var e = this;
                if (this == Cn) return kn;
                if (t.inlineContent || !this.local.some(yn.is)) return this.local;
                for (var n = [], r = 0; r < this.local.length; r++) e.local[r].type instanceof yn || n.push(e.local[r]);
                return n
            };
            var Cn = new Mn;
            Mn.empty = Cn, Mn.removeOverlap = ve;
            var On = function(t) {
                this.members = t
            };
            On.prototype.forChild = function(t, e) {
                var n = this;
                if (e.isLeaf) return Mn.empty;
                for (var r = [], o = 0; o < this.members.length; o++) {
                    var i = n.members[o].forChild(t, e);
                    i != Cn && (i instanceof On ? r = r.concat(i.members) : r.push(i))
                }
                return On.from(r)
            }, On.prototype.eq = function(t) {
                var e = this;
                if (!(t instanceof On) || t.members.length != this.members.length) return !1;
                for (var n = 0; n < this.members.length; n++)
                    if (!e.members[n].eq(t.members[n])) return !1;
                return !0
            }, On.prototype.locals = function(t) {
                for (var e, n = this, r = !0, o = 0; o < this.members.length; o++) {
                    var i = n.members[o].localsInner(t);
                    if (i.length)
                        if (e) {
                            r && (e = e.slice(), r = !1);
                            for (var s = 0; s < i.length; s++) e.push(i[s])
                        } else e = i
                }
                return e ? ve(r ? e : e.sort(me)) : kn
            }, On.from = function(t) {
                switch (t.length) {
                    case 0:
                        return Cn;
                    case 1:
                        return t[0];
                    default:
                        return new On(t)
                }
            };
            var Nn = function(t, e) {
                    this._props = e, this.state = e.state, this.dispatch = this.dispatch.bind(this), this._root = null, this.focused = !1, this.dom = t && t.mount || document.createElement("div"), t && (t.appendChild ? t.appendChild(this.dom) : t.apply ? t(this.dom) : t.mount && (this.mounted = !0)), this.editable = Se(this), this.markCursor = null, this.cursorWrapper = null, be(this), this.nodeViews = Me(this), this.docView = D(this.state.doc, we(this), ye(this), this.dom, this), this.lastSelectedViewDesc = null, this.dragging = null, Bt(this), this.pluginViews = [], this.updatePluginViews()
                },
                Tn = {
                    props: {},
                    root: {}
                };
            Tn.props.get = function() {
                var t = this;
                if (this._props.state != this.state) {
                    var e = this._props;
                    this._props = {};
                    for (var n in e) t._props[n] = e[n];
                    this._props.state = this.state
                }
                return this._props
            }, Nn.prototype.update = function(t) {
                t.handleDOMEvents != this._props.handleDOMEvents && Vt(this), this._props = t, this.updateStateInner(t.state, !0)
            }, Nn.prototype.setProps = function(t) {
                var e = this,
                    n = {};
                for (var r in e._props) n[r] = e._props[r];
                n.state = this.state;
                for (var o in t) n[o] = t[o];
                this.update(n)
            }, Nn.prototype.updateState = function(t) {
                this.updateStateInner(t, this.state.plugins != t.plugins)
            }, Nn.prototype.updateStateInner = function(t, e) {
                var n = this,
                    r = this.state,
                    o = !1;
                if (this.state = t, e) {
                    var i = Me(this);
                    Ce(i, this.nodeViews) && (this.nodeViews = i, o = !0), Vt(this)
                }
                this.editable = Se(this), be(this);
                var s = ye(this),
                    a = we(this),
                    c = e ? "reset" : t.scrollToSelection > r.scrollToSelection ? "to selection" : "preserve",
                    f = o || !this.docView.matchesNode(t.doc, a, s),
                    d = f || !t.selection.eq(r.selection),
                    h = "preserve" == c && d && null == this.dom.style.overflowAnchor && p(this);
                if (d) {
                    this.domObserver.stop();
                    var m = !1;
                    if (f) {
                        var v = Oe.chrome && ke(this.root);
                        !o && this.docView.update(t.doc, a, s, this) || (this.docView.destroy(), this.docView = D(t.doc, a, s, this.dom, this)), v && (m = !this.composing && xe(v, this.root))
                    }
                    m || !(this.mouseDown && this.domObserver.currentSelection.eq(this.root.getSelection()) && gt(this)) ? ct(this, !1, m) : (ft(this, t.selection), this.domObserver.setCurSelection()), this.domObserver.start()
                }
                if (this.updatePluginViews(r), "reset" == c) this.dom.scrollTop = 0;
                else if ("to selection" == c) {
                    var g = this.root.getSelection().focusNode;
                    this.someProp("handleScrollToSelection", function(t) {
                        return t(n)
                    }) || (t.selection instanceof L.NodeSelection ? l(this, this.docView.domAfterPos(t.selection.from).getBoundingClientRect(), g) : l(this, this.coordsAtPos(t.selection.head), g))
                } else h && u(h)
            }, Nn.prototype.destroyPluginViews = function() {
                for (var t; t = this.pluginViews.pop();) t.destroy && t.destroy()
            }, Nn.prototype.updatePluginViews = function(t) {
                var e = this;
                if (t && t.plugins == this.state.plugins)
                    for (var n = 0; n < this.pluginViews.length; n++) {
                        var r = e.pluginViews[n];
                        r.update && r.update(e, t)
                    } else {
                        this.destroyPluginViews();
                        for (var o = 0; o < this.state.plugins.length; o++) {
                            var i = e.state.plugins[o];
                            i.spec.view && e.pluginViews.push(i.spec.view(e))
                        }
                    }
            }, Nn.prototype.someProp = function(t, e) {
                var n, r = this._props && this._props[t];
                if (null != r && (n = e ? e(r) : r)) return n;
                var o = this.state.plugins;
                if (o)
                    for (var i = 0; i < o.length; i++) {
                        var s = o[i].props[t];
                        if (null != s && (n = e ? e(s) : s)) return n
                    }
            }, Nn.prototype.hasFocus = function() {
                return this.root.activeElement == this.dom
            }, Nn.prototype.focus = function() {
                this.domObserver.stop(), ct(this, !0), this.editable && (this.dom.setActive ? this.dom.setActive() : this.dom.focus({
                    preventScroll: !0
                })), this.domObserver.start()
            }, Tn.root.get = function() {
                var t = this,
                    e = this._root;
                if (null == e)
                    for (var n = this.dom.parentNode; n; n = n.parentNode)
                        if (9 == n.nodeType || 11 == n.nodeType && n.host) return t._root = n;
                return e || document
            }, Nn.prototype.posAtCoords = function(t) {
                return w(this, t)
            }, Nn.prototype.coordsAtPos = function(t) {
                return k(this, t)
            }, Nn.prototype.domAtPos = function(t) {
                return this.docView.domFromPos(t)
            }, Nn.prototype.nodeDOM = function(t) {
                var e = this.docView.descAt(t);
                return e ? e.nodeDOM : null
            }, Nn.prototype.posAtDOM = function(t, e, n) {
                void 0 === n && (n = -1);
                var r = this.docView.posFromDOM(t, e, n);
                if (null == r) throw new RangeError("DOM position not inside the editor");
                return r
            }, Nn.prototype.endOfTextblock = function(t, e) {
                return T(this, e || this.state, t)
            }, Nn.prototype.destroy = function() {
                this.docView && (jt(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], ye(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null)
            }, Nn.prototype.dispatchEvent = function(t) {
                return Lt(this, t)
            }, Nn.prototype.dispatch = function(t) {
                var e = this._props.dispatchTransaction;
                e ? e.call(this, t) : this.updateState(this.state.apply(t))
            }, Object.defineProperties(Nn.prototype, Tn), e.EditorView = Nn, e.Decoration = bn, e.DecorationSet = Mn, e.__serializeForClipboard = Ot, e.__parseFromClipboard = Nt, e.__endComposition = re
        }), nt = t(et), rt = et.EditorView, ot = et.Decoration, it = et.DecorationSet, st = et.__serializeForClipboard, at = et.__parseFromClipboard, ct = et.__endComposition, lt = Object.freeze({
            default: nt,
            __moduleExports: et,
            EditorView: rt,
            Decoration: ot,
            DecorationSet: it,
            __serializeForClipboard: st,
            __parseFromClipboard: at,
            __endComposition: ct
        }), pt = {
            8: "Backspace",
            9: "Tab",
            10: "Enter",
            12: "NumLock",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            44: "PrintScreen",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Meta",
            92: "Meta",
            106: "*",
            107: "+",
            108: ",",
            109: "-",
            110: ".",
            111: "/",
            144: "NumLock",
            145: "ScrollLock",
            160: "Shift",
            161: "Shift",
            162: "Control",
            163: "Control",
            164: "Alt",
            165: "Alt",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            229: "q"
        }, ut = {
            48: ")",
            49: "!",
            50: "@",
            51: "#",
            52: "$",
            53: "%",
            54: "^",
            55: "&",
            56: "*",
            57: "(",
            59: ";",
            61: "+",
            173: "_",
            186: ":",
            187: "+",
            188: "<",
            189: "_",
            190: ">",
            191: "?",
            192: "~",
            219: "{",
            220: "|",
            221: "}",
            222: '"',
            229: "Q"
        }, ft = "undefined" != typeof navigator && /Chrome\/(\d+)/.exec(navigator.userAgent), dt = "undefined" != typeof navigator && /Apple Computer/.test(navigator.vendor), ht = "undefined" != typeof navigator && /Gecko\/\d+/.test(navigator.userAgent), mt = "undefined" != typeof navigator && /Mac/.test(navigator.platform), vt = ft && (mt || +ft[1] < 57) || ht && mt, gt = 0; gt < 10; gt++) pt[48 + gt] = pt[96 + gt] = String(gt);
    for (gt = 1; gt <= 24; gt++) pt[gt + 111] = "F" + gt;
    for (gt = 65; gt <= 90; gt++) pt[gt] = String.fromCharCode(gt + 32), ut[gt] = String.fromCharCode(gt);
    for (var yt in pt) ut.hasOwnProperty(yt) || (ut[yt] = pt[yt]);
    var wt = r;
    r.base = pt, r.shift = ut;
    var bt = e(function(t, e) {
            function n(t) {
                var e = t.split(/-(?!$)/),
                    n = e[e.length - 1];
                "Space" == n && (n = " ");
                for (var r, o, i, s, c = 0; c < e.length - 1; c++) {
                    var l = e[c];
                    if (/^(cmd|meta|m)$/i.test(l)) s = !0;
                    else if (/^a(lt)?$/i.test(l)) r = !0;
                    else if (/^(c|ctrl|control)$/i.test(l)) o = !0;
                    else if (/^s(hift)?$/i.test(l)) i = !0;
                    else {
                        if (!/^mod$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);
                        a ? s = !0 : o = !0
                    }
                }
                return r && (n = "Alt-" + n), o && (n = "Ctrl-" + n), s && (n = "Meta-" + n), i && (n = "Shift-" + n), n
            }

            function r(t) {
                var e = Object.create(null);
                for (var r in t) e[n(r)] = t[r];
                return e
            }

            function o(t, e, n) {
                return e.altKey && (t = "Alt-" + t), e.ctrlKey && (t = "Ctrl-" + t), e.metaKey && (t = "Meta-" + t), !1 !== n && e.shiftKey && (t = "Shift-" + t), t
            }

            function i(t) {
                var e = r(t);
                return function(t, n) {
                    var r, i = s(n),
                        a = 1 == i.length && " " != i,
                        c = e[o(i, n, !a)];
                    if (c && c(t.state, t.dispatch, t)) return !0;
                    if (a && (n.shiftKey || n.altKey || n.metaKey) && (r = s.base[n.keyCode]) && r != i) {
                        var l = e[o(r, n, !0)];
                        if (l && l(t.state, t.dispatch, t)) return !0
                    }
                    return !1
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var s = function(t) {
                    return t && "object" == typeof t && "default" in t ? t.default : t
                }(wt),
                a = "undefined" != typeof navigator && /Mac/.test(navigator.platform);
            e.keymap = function(t) {
                return new L.Plugin({
                    props: {
                        handleKeyDown: i(t)
                    }
                })
            }, e.keydownHandler = i
        }),
        St = t(bt),
        kt = bt.keymap,
        xt = bt.keydownHandler,
        Mt = Object.freeze({
            default: St,
            __moduleExports: bt,
            keymap: kt,
            keydownHandler: xt
        }),
        Ct = e(function(t, e) {
            function n(t) {
                return function(e, n, r, o) {
                    var i = t;
                    if (n[1]) {
                        var s = n[0].lastIndexOf(n[1]);
                        i += n[0].slice(s + n[1].length);
                        var a = (r += s) - o;
                        a > 0 && (i = n[0].slice(s - a, s) + i, r = o)
                    }
                    return e.tr.insertText(i, r, o)
                }
            }

            function r(t, e, n, r, o, s) {
                if (t.composing) return !1;
                var a = t.state,
                    c = a.doc.resolve(e);
                if (c.parent.type.spec.code) return !1;
                for (var l = c.parent.textBetween(Math.max(0, c.parentOffset - i), c.parentOffset, null, "￼") + r, p = 0; p < o.length; p++) {
                    var u = o[p].match.exec(l),
                        f = u && o[p].handler(a, u, e - (u[0].length - r.length), n);
                    if (f) return t.dispatch(f.setMeta(s, {
                        transform: f,
                        from: e,
                        to: n,
                        text: r
                    })), !0
                }
                return !1
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = function(t, e) {
                    this.match = t, this.handler = "string" == typeof e ? n(e) : e
                },
                i = 500,
                s = new o(/--$/, "—"),
                a = new o(/\.\.\.$/, "…"),
                c = new o(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“"),
                l = new o(/"$/, "”"),
                p = new o(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘"),
                u = new o(/'$/, "’"),
                f = [c, l, p, u];
            e.InputRule = o, e.inputRules = function(t) {
                var e = t.rules,
                    n = new L.Plugin({
                        state: {
                            init: function() {
                                return null
                            },
                            apply: function(t, e) {
                                var n = t.getMeta(this);
                                return n || (t.selectionSet || t.docChanged ? null : e)
                            }
                        },
                        props: {
                            handleTextInput: function(t, o, i, s) {
                                return r(t, o, i, s, e, n)
                            },
                            handleDOMEvents: {
                                compositionend: function(t) {
                                    setTimeout(function() {
                                        var o = t.state.selection.$cursor;
                                        o && r(t, o.pos, o.pos, "", e, n)
                                    })
                                }
                            }
                        },
                        isInputRules: !0
                    });
                return n
            }, e.undoInputRule = function(t, e) {
                for (var n = t.plugins, r = 0; r < n.length; r++) {
                    var o = n[r],
                        i = void 0;
                    if (o.spec.isInputRules && (i = o.getState(t))) {
                        if (e) {
                            for (var s = t.tr, a = i.transform, c = a.steps.length - 1; c >= 0; c--) s.step(a.steps[c].invert(a.docs[c]));
                            var l = s.doc.resolve(i.from).marks();
                            e(s.replaceWith(i.from, i.to, t.schema.text(i.text, l)))
                        }
                        return !0
                    }
                }
                return !1
            }, e.emDash = s, e.ellipsis = a, e.openDoubleQuote = c, e.closeDoubleQuote = l, e.openSingleQuote = p, e.closeSingleQuote = u, e.smartQuotes = f, e.wrappingInputRule = function(t, e, n, r) {
                return new o(t, function(t, o, i, s) {
                    var a = n instanceof Function ? n(o) : n,
                        c = t.tr.delete(i, s),
                        l = c.doc.resolve(i).blockRange(),
                        p = l && S.findWrapping(l, e, a);
                    if (!p) return null;
                    c.wrap(l, p);
                    var u = c.doc.resolve(i - 1).nodeBefore;
                    return u && u.type == e && S.canJoin(c.doc, i - 1) && (!r || r(o, u)) && c.join(i - 1), c
                })
            }, e.textblockTypeInputRule = function(t, e, n) {
                return new o(t, function(t, r, o, i) {
                    var s = t.doc.resolve(o),
                        a = n instanceof Function ? n(r) : n;
                    return s.node(-1).canReplaceWith(s.index(-1), s.indexAfter(-1), e) ? t.tr.delete(o, i).setBlockType(o, o, e, a) : null
                })
            }
        }),
        Ot = t(Ct),
        Nt = Ct.InputRule,
        Tt = Ct.inputRules,
        Dt = Ct.undoInputRule,
        Et = Ct.emDash,
        At = Ct.ellipsis,
        It = Ct.openDoubleQuote,
        Rt = Ct.closeDoubleQuote,
        zt = Ct.openSingleQuote,
        Pt = Ct.closeSingleQuote,
        _t = Ct.smartQuotes,
        Bt = Ct.wrappingInputRule,
        Ft = Ct.textblockTypeInputRule,
        jt = Object.freeze({
            default: Ot,
            __moduleExports: Ct,
            InputRule: Nt,
            inputRules: Tt,
            undoInputRule: Dt,
            emDash: Et,
            ellipsis: At,
            openDoubleQuote: It,
            closeDoubleQuote: Rt,
            openSingleQuote: zt,
            closeSingleQuote: Pt,
            smartQuotes: _t,
            wrappingInputRule: Bt,
            textblockTypeInputRule: Ft
        }),
        Vt = function() {};
    Vt.prototype.append = function(t) {
        return t.length ? (t = Vt.from(t), !this.length && t || t.length < 200 && this.leafAppend(t) || this.length < 200 && t.leafPrepend(this) || this.appendInner(t)) : this
    }, Vt.prototype.prepend = function(t) {
        return t.length ? Vt.from(t).append(this) : this
    }, Vt.prototype.appendInner = function(t) {
        return new $t(this, t)
    }, Vt.prototype.slice = function(t, e) {
        return void 0 === t && (t = 0), void 0 === e && (e = this.length), t >= e ? Vt.empty : this.sliceInner(Math.max(0, t), Math.min(this.length, e))
    }, Vt.prototype.get = function(t) {
        if (!(t < 0 || t >= this.length)) return this.getInner(t)
    }, Vt.prototype.forEach = function(t, e, n) {
        void 0 === e && (e = 0), void 0 === n && (n = this.length), e <= n ? this.forEachInner(t, e, n, 0) : this.forEachInvertedInner(t, e, n, 0)
    }, Vt.prototype.map = function(t, e, n) {
        void 0 === e && (e = 0), void 0 === n && (n = this.length);
        var r = [];
        return this.forEach(function(e, n) {
            return r.push(t(e, n))
        }, e, n), r
    }, Vt.from = function(t) {
        return t instanceof Vt ? t : t && t.length ? new qt(t) : Vt.empty
    };
    var qt = function(t) {
        function e(e) {
            t.call(this), this.values = e
        }
        t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e;
        var n = {
            length: {},
            depth: {}
        };
        return e.prototype.flatten = function() {
            return this.values
        }, e.prototype.sliceInner = function(t, n) {
            return 0 == t && n == this.length ? this : new e(this.values.slice(t, n))
        }, e.prototype.getInner = function(t) {
            return this.values[t]
        }, e.prototype.forEachInner = function(t, e, n, r) {
            for (var o = this, i = e; i < n; i++)
                if (!1 === t(o.values[i], r + i)) return !1
        }, e.prototype.forEachInvertedInner = function(t, e, n, r) {
            for (var o = this, i = e - 1; i >= n; i--)
                if (!1 === t(o.values[i], r + i)) return !1
        }, e.prototype.leafAppend = function(t) {
            if (this.length + t.length <= 200) return new e(this.values.concat(t.flatten()))
        }, e.prototype.leafPrepend = function(t) {
            if (this.length + t.length <= 200) return new e(t.flatten().concat(this.values))
        }, n.length.get = function() {
            return this.values.length
        }, n.depth.get = function() {
            return 0
        }, Object.defineProperties(e.prototype, n), e
    }(Vt);
    Vt.empty = new qt([]);
    var $t = function(t) {
            function e(e, n) {
                t.call(this), this.left = e, this.right = n, this.length = e.length + n.length, this.depth = Math.max(e.depth, n.depth) + 1
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
                return this.left.flatten().concat(this.right.flatten())
            }, e.prototype.getInner = function(t) {
                return t < this.left.length ? this.left.get(t) : this.right.get(t - this.left.length)
            }, e.prototype.forEachInner = function(t, e, n, r) {
                var o = this.left.length;
                return !(e < o && !1 === this.left.forEachInner(t, e, Math.min(n, o), r)) && (!(n > o && !1 === this.right.forEachInner(t, Math.max(e - o, 0), Math.min(this.length, n) - o, r + o)) && void 0)
            }, e.prototype.forEachInvertedInner = function(t, e, n, r) {
                var o = this.left.length;
                return !(e > o && !1 === this.right.forEachInvertedInner(t, e - o, Math.max(n, o) - o, r + o)) && (!(n < o && !1 === this.left.forEachInvertedInner(t, Math.min(e, o), n, r)) && void 0)
            }, e.prototype.sliceInner = function(t, e) {
                if (0 == t && e == this.length) return this;
                var n = this.left.length;
                return e <= n ? this.left.slice(t, e) : t >= n ? this.right.slice(t - n, e - n) : this.left.slice(t, n).append(this.right.slice(0, e - n))
            }, e.prototype.leafAppend = function(t) {
                var n = this.right.leafAppend(t);
                if (n) return new e(this.left, n)
            }, e.prototype.leafPrepend = function(t) {
                var n = this.left.leafPrepend(t);
                if (n) return new e(n, this.right)
            }, e.prototype.appendInner = function(t) {
                return this.left.depth >= Math.max(this.right.depth, t.depth) + 1 ? new e(this.left, new e(this.right, t)) : new e(this, t)
            }, e
        }(Vt),
        Lt = Vt,
        Jt = e(function(t, e) {
            function n(t, e) {
                var n;
                return t.forEach(function(t, r) {
                    if (t.selection && 0 == e--) return n = r, !1
                }), t.slice(n)
            }

            function r(t, e, n, r) {
                var a, l = n.getMeta(v);
                if (l) return l.historyState;
                n.getMeta(g) && (t = new f(t.done, t.undone, null, 0));
                var u = n.getMeta("appendedTransaction");
                if (0 == n.steps.length) return t;
                if (u && u.getMeta(v)) return u.getMeta(v).redo ? new f(t.done.addTransform(n, null, r, c(e)), t.undone, i(n.mapping.maps[n.steps.length - 1]), t.prevTime) : new f(t.done, t.undone.addTransform(n, null, r, c(e)), null, t.prevTime);
                if (!1 === n.getMeta("addToHistory") || u && !1 === u.getMeta("addToHistory")) return (a = n.getMeta("rebased")) ? new f(t.done.rebased(n, a), t.undone.rebased(n, a), s(t.prevRanges, n.mapping), t.prevTime) : new f(t.done.addMaps(n.mapping.maps), t.undone.addMaps(n.mapping.maps), s(t.prevRanges, n.mapping), t.prevTime);
                var d = t.prevTime < (n.time || 0) - r.newGroupDelay || !u && !o(n, t.prevRanges),
                    h = u ? s(t.prevRanges, n.mapping) : i(n.mapping.maps[n.steps.length - 1]);
                return new f(t.done.addTransform(n, d ? e.selection.getBookmark() : null, r, c(e)), p.empty, h, n.time)
            }

            function o(t, e) {
                if (!e) return !1;
                if (!t.docChanged) return !0;
                var n = !1;
                return t.mapping.maps[0].forEach(function(t, r) {
                    for (var o = 0; o < e.length; o += 2) t <= e[o + 1] && r >= e[o] && (n = !0)
                }), n
            }

            function i(t) {
                var e = [];
                return t.forEach(function(t, n, r, o) {
                    return e.push(r, o)
                }), e
            }

            function s(t, e) {
                if (!t) return null;
                for (var n = [], r = 0; r < t.length; r += 2) {
                    var o = e.map(t[r], 1),
                        i = e.map(t[r + 1], -1);
                    o <= i && n.push(o, i)
                }
                return n
            }

            function a(t, e, n, r) {
                var o = c(e),
                    i = v.get(e).spec.config,
                    s = (r ? t.undone : t.done).popEvent(e, o);
                if (s) {
                    var a = s.selection.resolve(s.transform.doc),
                        l = (r ? t.done : t.undone).addTransform(s.transform, e.selection.getBookmark(), i, o),
                        p = new f(r ? l : s.remaining, r ? s.remaining : l, null, 0);
                    n(s.transform.setSelection(a).setMeta(v, {
                        redo: r,
                        historyState: p
                    }).scrollIntoView())
                }
            }

            function c(t) {
                var e = t.plugins;
                if (m != e) {
                    h = !1, m = e;
                    for (var n = 0; n < e.length; n++)
                        if (e[n].spec.historyPreserveItems) {
                            h = !0;
                            break
                        }
                }
                return h
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var l = function(t) {
                    return t && "object" == typeof t && "default" in t ? t.default : t
                }(Lt),
                p = function(t, e) {
                    this.items = t, this.eventCount = e
                };
            p.prototype.popEvent = function(t, e) {
                var n = this;
                if (0 == this.eventCount) return null;
                for (var r = this.items.length;; r--)
                    if (n.items.get(r - 1).selection) {
                        --r;
                        break
                    }
                var o, i;
                e && (o = this.remapping(r, this.items.length), i = o.maps.length);
                var s, a, c = t.tr,
                    l = [],
                    f = [];
                return this.items.forEach(function(t, e) {
                    if (!t.step) return o || (o = n.remapping(r, e + 1), i = o.maps.length), i--, void f.push(t);
                    if (o) {
                        f.push(new u(t.map));
                        var d, h = t.step.map(o.slice(i));
                        h && c.maybeStep(h).doc && (d = c.mapping.maps[c.mapping.maps.length - 1], l.push(new u(d, null, null, l.length + f.length))), i--, d && o.appendMap(d, i)
                    } else c.maybeStep(t.step);
                    return t.selection ? (s = o ? t.selection.map(o.slice(i)) : t.selection, a = new p(n.items.slice(0, r).append(f.reverse().concat(l)), n.eventCount - 1), !1) : void 0
                }, this.items.length, 0), {
                    remaining: a,
                    transform: c,
                    selection: s
                }
            }, p.prototype.addTransform = function(t, e, r, o) {
                for (var i = [], s = this.eventCount, a = this.items, c = !o && a.length ? a.get(a.length - 1) : null, l = 0; l < t.steps.length; l++) {
                    var f = t.steps[l].invert(t.docs[l]),
                        h = new u(t.mapping.maps[l], f, e),
                        m = void 0;
                    (m = c && c.merge(h)) && (h = m, l ? i.pop() : a = a.slice(0, a.length - 1)), i.push(h), e && (s++, e = null), o || (c = h)
                }
                var v = s - r.depth;
                return v > d && (a = n(a, v), s -= v), new p(a.append(i), s)
            }, p.prototype.remapping = function(t, e) {
                var n = new S.Mapping;
                return this.items.forEach(function(e, r) {
                    var o = null != e.mirrorOffset && r - e.mirrorOffset >= t ? o = n.maps.length - e.mirrorOffset : null;
                    n.appendMap(e.map, o)
                }, t, e), n
            }, p.prototype.addMaps = function(t) {
                return 0 == this.eventCount ? this : new p(this.items.append(t.map(function(t) {
                    return new u(t)
                })), this.eventCount)
            }, p.prototype.rebased = function(t, e) {
                if (!this.eventCount) return this;
                var n = [],
                    r = Math.max(0, this.items.length - e),
                    o = t.mapping,
                    i = t.steps.length,
                    s = this.eventCount;
                this.items.forEach(function(t) {
                    t.selection && s--
                }, r);
                var a = e;
                this.items.forEach(function(e) {
                    var r = o.getMirror(--a);
                    if (null != r) {
                        i = Math.min(i, r);
                        var c = o.maps[r];
                        if (e.step) {
                            var l = t.steps[r].invert(t.docs[r]),
                                p = e.selection && e.selection.map(o.slice(a + 1, r));
                            p && s++, n.push(new u(c, l, p))
                        } else n.push(new u(c))
                    }
                }, r);
                for (var c = [], l = e; l < i; l++) c.push(new u(o.maps[l]));
                var f = this.items.slice(0, r).append(c).append(n),
                    d = new p(f, s);
                return d.emptyItemCount() > 500 && (d = d.compress(this.items.length - n.length)), d
            }, p.prototype.emptyItemCount = function() {
                var t = 0;
                return this.items.forEach(function(e) {
                    e.step || t++
                }), t
            }, p.prototype.compress = function(t) {
                void 0 === t && (t = this.items.length);
                var e = this.remapping(0, t),
                    n = e.maps.length,
                    r = [],
                    o = 0;
                return this.items.forEach(function(i, s) {
                    if (s >= t) r.push(i), i.selection && o++;
                    else if (i.step) {
                        var a = i.step.map(e.slice(n)),
                            c = a && a.getMap();
                        if (n--, c && e.appendMap(c, n), a) {
                            var l = i.selection && i.selection.map(e.slice(n));
                            l && o++;
                            var p, f = new u(c.invert(), a, l),
                                d = r.length - 1;
                            (p = r.length && r[d].merge(f)) ? r[d] = p: r.push(f)
                        }
                    } else i.map && n--
                }, this.items.length, 0), new p(l.from(r.reverse()), o)
            }, p.empty = new p(l.empty, 0);
            var u = function(t, e, n, r) {
                this.map = t, this.step = e, this.selection = n, this.mirrorOffset = r
            };
            u.prototype.merge = function(t) {
                if (this.step && t.step && !t.selection) {
                    var e = t.step.merge(this.step);
                    if (e) return new u(e.getMap().invert(), e, this.selection)
                }
            };
            var f = function(t, e, n, r) {
                    this.done = t, this.undone = e, this.prevRanges = n, this.prevTime = r
                },
                d = 20,
                h = !1,
                m = null,
                v = new L.PluginKey("history"),
                g = new L.PluginKey("closeHistory");
            e.HistoryState = f, e.closeHistory = function(t) {
                return t.setMeta(g, !0)
            }, e.history = function(t) {
                return t = {
                    depth: t && t.depth || 100,
                    newGroupDelay: t && t.newGroupDelay || 500
                }, new L.Plugin({
                    key: v,
                    state: {
                        init: function() {
                            return new f(p.empty, p.empty, null, 0)
                        },
                        apply: function(e, n, o) {
                            return r(n, o, e, t)
                        }
                    },
                    config: t
                })
            }, e.undo = function(t, e) {
                var n = v.getState(t);
                return !(!n || 0 == n.done.eventCount || (e && a(n, t, e, !1), 0))
            }, e.redo = function(t, e) {
                var n = v.getState(t);
                return !(!n || 0 == n.undone.eventCount || (e && a(n, t, e, !0), 0))
            }, e.undoDepth = function(t) {
                var e = v.getState(t);
                return e ? e.done.eventCount : 0
            }, e.redoDepth = function(t) {
                var e = v.getState(t);
                return e ? e.undone.eventCount : 0
            }
        }),
        Wt = t(Jt),
        Kt = Jt.HistoryState,
        Ht = Jt.closeHistory,
        Ut = Jt.history,
        Gt = Jt.undo,
        Qt = Jt.redo,
        Xt = Jt.undoDepth,
        Yt = Jt.redoDepth,
        Zt = Object.freeze({
            default: Wt,
            __moduleExports: Jt,
            HistoryState: Kt,
            closeHistory: Ht,
            history: Ut,
            undo: Gt,
            redo: Qt,
            undoDepth: Xt,
            redoDepth: Yt
        }),
        te = e(function(t, e) {
            function n(t, e) {
                return !t.selection.empty && (e && e(t.tr.deleteSelection().scrollIntoView()), !0)
            }

            function r(t, e, n) {
                var r = t.selection.$cursor;
                if (!r || (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)) return !1;
                var i = a(r);
                if (!i) {
                    var s = r.blockRange(),
                        c = s && S.liftTarget(s);
                    return null != c && (e && e(t.tr.lift(s, c).scrollIntoView()), !0)
                }
                var l = i.nodeBefore;
                if (!l.type.spec.isolating && y(t, i, e)) return !0;
                if (0 == r.parent.content.size && (o(l, "end") || L.NodeSelection.isSelectable(l))) {
                    if (e) {
                        var p = t.tr.deleteRange(r.before(), r.after());
                        p.setSelection(o(l, "end") ? L.Selection.findFrom(p.doc.resolve(p.mapping.map(i.pos, -1)), -1) : L.NodeSelection.create(p.doc, i.pos - l.nodeSize)), e(p.scrollIntoView())
                    }
                    return !0
                }
                return !(!l.isAtom || i.depth != r.depth - 1) && (e && e(t.tr.delete(i.pos - l.nodeSize, i.pos).scrollIntoView()), !0)
            }

            function o(t, e) {
                for (; t; t = "start" == e ? t.firstChild : t.lastChild)
                    if (t.isTextblock) return !0;
                return !1
            }

            function s(t, e, n) {
                var r = t.selection.$cursor;
                if (!r || (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)) return !1;
                var o = a(r),
                    i = o && o.nodeBefore;
                return !(!i || !L.NodeSelection.isSelectable(i)) && (e && e(t.tr.setSelection(L.NodeSelection.create(t.doc, o.pos - i.nodeSize)).scrollIntoView()), !0)
            }

            function a(t) {
                if (!t.parent.type.spec.isolating)
                    for (var e = t.depth - 1; e >= 0; e--) {
                        if (t.index(e) > 0) return t.doc.resolve(t.before(e + 1));
                        if (t.node(e).type.spec.isolating) break
                    }
                return null
            }

            function c(t, e, n) {
                var r = t.selection.$cursor;
                if (!r || (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)) return !1;
                var i = p(r);
                if (!i) return !1;
                var s = i.nodeAfter;
                if (y(t, i, e)) return !0;
                if (0 == r.parent.content.size && (o(s, "start") || L.NodeSelection.isSelectable(s))) {
                    if (e) {
                        var a = t.tr.deleteRange(r.before(), r.after());
                        a.setSelection(o(s, "start") ? L.Selection.findFrom(a.doc.resolve(a.mapping.map(i.pos)), 1) : L.NodeSelection.create(a.doc, a.mapping.map(i.pos))), e(a.scrollIntoView())
                    }
                    return !0
                }
                return !(!s.isAtom || i.depth != r.depth - 1) && (e && e(t.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0)
            }

            function l(t, e, n) {
                var r = t.selection.$cursor;
                if (!r || (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)) return !1;
                var o = p(r),
                    i = o && o.nodeAfter;
                return !(!i || !L.NodeSelection.isSelectable(i)) && (e && e(t.tr.setSelection(L.NodeSelection.create(t.doc, o.pos)).scrollIntoView()), !0)
            }

            function p(t) {
                if (!t.parent.type.spec.isolating)
                    for (var e = t.depth - 1; e >= 0; e--) {
                        var n = t.node(e);
                        if (t.index(e) + 1 < n.childCount) return t.doc.resolve(t.after(e + 1));
                        if (n.type.spec.isolating) break
                    }
                return null
            }

            function u(t, e) {
                var n = t.selection,
                    r = n.$head,
                    o = n.$anchor;
                return !(!r.parent.type.spec.code || !r.sameParent(o)) && (e && e(t.tr.insertText("\n").scrollIntoView()), !0)
            }

            function f(t, e) {
                var n = t.selection,
                    r = n.$head,
                    o = n.$anchor;
                if (!r.parent.type.spec.code || !r.sameParent(o)) return !1;
                var i = r.node(-1),
                    s = r.indexAfter(-1),
                    a = i.contentMatchAt(s).defaultType;
                if (!i.canReplaceWith(s, s, a)) return !1;
                if (e) {
                    var c = r.after(),
                        l = t.tr.replaceWith(c, c, a.createAndFill());
                    l.setSelection(L.Selection.near(l.doc.resolve(c), 1)), e(l.scrollIntoView())
                }
                return !0
            }

            function d(t, e) {
                var n = t.selection,
                    r = n.$from,
                    o = n.$to;
                if (r.parent.inlineContent || o.parent.inlineContent) return !1;
                var i = r.parent.contentMatchAt(o.indexAfter()).defaultType;
                if (!i || !i.isTextblock) return !1;
                if (e) {
                    var s = (!r.parentOffset && o.index() < o.parent.childCount ? r : o).pos,
                        a = t.tr.insert(s, i.createAndFill());
                    a.setSelection(L.TextSelection.create(a.doc, s + 1)), e(a.scrollIntoView())
                }
                return !0
            }

            function h(t, e) {
                var n = t.selection.$cursor;
                if (!n || n.parent.content.size) return !1;
                if (n.depth > 1 && n.after() != n.end(-1)) {
                    var r = n.before();
                    if (S.canSplit(t.doc, r)) return e && e(t.tr.split(r).scrollIntoView()), !0
                }
                var o = n.blockRange(),
                    i = o && S.liftTarget(o);
                return null != i && (e && e(t.tr.lift(o, i).scrollIntoView()), !0)
            }

            function m(t, e) {
                var n = t.selection,
                    r = n.$from,
                    o = n.$to;
                if (t.selection instanceof L.NodeSelection && t.selection.node.isBlock) return !(!r.parentOffset || !S.canSplit(t.doc, r.pos)) && (e && e(t.tr.split(r.pos).scrollIntoView()), !0);
                if (!r.parent.isBlock) return !1;
                if (e) {
                    var s = o.parentOffset == o.parent.content.size,
                        a = t.tr;
                    t.selection instanceof L.TextSelection && a.deleteSelection();
                    var c = 0 == r.depth ? null : r.node(-1).contentMatchAt(r.indexAfter(-1)).defaultType,
                        l = s && c ? [{
                            type: c
                        }] : null,
                        p = S.canSplit(a.doc, a.mapping.map(r.pos), 1, l);
                    l || p || !S.canSplit(a.doc, a.mapping.map(r.pos), 1, c && [{
                        type: c
                    }]) || (l = [{
                        type: c
                    }], p = !0), p && (a.split(a.mapping.map(r.pos), 1, l), s || r.parentOffset || r.parent.type == c || !r.node(-1).canReplace(r.index(-1), r.indexAfter(-1), i.Fragment.from(c.create(), r.parent)) || a.setNodeMarkup(a.mapping.map(r.before()), c)), e(a.scrollIntoView())
                }
                return !0
            }

            function v(t, e) {
                return e && e(t.tr.setSelection(new L.AllSelection(t.doc))), !0
            }

            function g(t, e, n) {
                var r = e.nodeBefore,
                    o = e.nodeAfter,
                    i = e.index();
                return !!(r && o && r.type.compatibleContent(o.type)) && (!r.content.size && e.parent.canReplace(i - 1, i) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !(!e.parent.canReplace(i, i + 1) || !o.isTextblock && !S.canJoin(t.doc, e.pos)) && (n && n(t.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0))
            }

            function y(t, e, n) {
                var r, o, s = e.nodeBefore,
                    a = e.nodeAfter;
                if (s.type.spec.isolating || a.type.spec.isolating) return !1;
                if (g(t, e, n)) return !0;
                if (e.parent.canReplace(e.index(), e.index() + 1) && (r = (o = s.contentMatchAt(s.childCount)).findWrapping(a.type)) && o.matchType(r[0] || a.type).validEnd) {
                    if (n) {
                        for (var c = e.pos + a.nodeSize, l = i.Fragment.empty, p = r.length - 1; p >= 0; p--) l = i.Fragment.from(r[p].create(null, l));
                        l = i.Fragment.from(s.copy(l));
                        var u = t.tr.step(new S.ReplaceAroundStep(e.pos - 1, c, e.pos, c, new i.Slice(l, 1, 0), r.length, !0)),
                            f = c + 2 * r.length;
                        S.canJoin(u.doc, f) && u.join(f), n(u.scrollIntoView())
                    }
                    return !0
                }
                var d = L.Selection.findFrom(e, 1),
                    h = d && d.$from.blockRange(d.$to),
                    m = h && S.liftTarget(h);
                return null != m && m >= e.depth && (n && n(t.tr.lift(h, m).scrollIntoView()), !0)
            }

            function w(t, e, n) {
                for (var r = 0; r < e.length; r++) {
                    var o = function(r) {
                        var o = e[r],
                            i = o.$from,
                            s = o.$to,
                            a = 0 == i.depth && t.type.allowsMarkType(n);
                        if (t.nodesBetween(i.pos, s.pos, function(t) {
                                if (a) return !1;
                                a = t.inlineContent && t.type.allowsMarkType(n)
                            }), a) return {
                            v: !0
                        }
                    }(r);
                    if (o) return o.v
                }
                return !1
            }

            function b(t, e) {
                return function(n) {
                    if (!n.isGeneric) return t(n);
                    for (var r = [], o = 0; o < n.mapping.maps.length; o++) {
                        for (var i = n.mapping.maps[o], s = 0; s < r.length; s++) r[s] = i.map(r[s]);
                        i.forEach(function(t, e, n, o) {
                            return r.push(n, o)
                        })
                    }
                    for (var a = [], c = 0; c < r.length; c += 2)
                        for (var l = r[c], p = r[c + 1], u = n.doc.resolve(l), f = u.sharedDepth(p), d = u.node(f), h = u.indexAfter(f), m = u.after(f + 1); m <= p; ++h) {
                            var v = d.maybeChild(h);
                            if (!v) break;
                            if (h && -1 == a.indexOf(m)) {
                                var g = d.child(h - 1);
                                g.type == v.type && e(g, v) && a.push(m)
                            }
                            m += v.nodeSize
                        }
                    a.sort(function(t, e) {
                        return t - e
                    });
                    for (var y = a.length - 1; y >= 0; y--) S.canJoin(n.doc, a[y]) && n.join(a[y]);
                    t(n)
                }
            }

            function k() {
                for (var t = arguments, e = [], n = arguments.length; n--;) e[n] = t[n];
                return function(t, n, r) {
                    for (var o = 0; o < e.length; o++)
                        if (e[o](t, n, r)) return !0;
                    return !1
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var x = k(n, r, s),
                M = k(n, c, l),
                C = {
                    Enter: k(u, d, h, m),
                    "Mod-Enter": f,
                    Backspace: x,
                    "Mod-Backspace": x,
                    Delete: M,
                    "Mod-Delete": M,
                    "Mod-a": v
                },
                O = {
                    "Ctrl-h": C.Backspace,
                    "Alt-Backspace": C["Mod-Backspace"],
                    "Ctrl-d": C.Delete,
                    "Ctrl-Alt-Backspace": C["Mod-Delete"],
                    "Alt-Delete": C["Mod-Delete"],
                    "Alt-d": C["Mod-Delete"]
                };
            for (var N in C) O[N] = C[N];
            var T = ("undefined" != typeof navigator ? /Mac/.test(navigator.platform) : "undefined" != typeof os && "darwin" == os.platform()) ? O : C;
            e.deleteSelection = n, e.joinBackward = r, e.selectNodeBackward = s, e.joinForward = c, e.selectNodeForward = l, e.joinUp = function(t, e) {
                var n, r = t.selection,
                    o = r instanceof L.NodeSelection;
                if (o) {
                    if (r.node.isTextblock || !S.canJoin(t.doc, r.from)) return !1;
                    n = r.from
                } else if (null == (n = S.joinPoint(t.doc, r.from, -1))) return !1;
                if (e) {
                    var i = t.tr.join(n);
                    o && i.setSelection(L.NodeSelection.create(i.doc, n - t.doc.resolve(n).nodeBefore.nodeSize)), e(i.scrollIntoView())
                }
                return !0
            }, e.joinDown = function(t, e) {
                var n, r = t.selection;
                if (r instanceof L.NodeSelection) {
                    if (r.node.isTextblock || !S.canJoin(t.doc, r.to)) return !1;
                    n = r.to
                } else if (null == (n = S.joinPoint(t.doc, r.to, 1))) return !1;
                return e && e(t.tr.join(n).scrollIntoView()), !0
            }, e.lift = function(t, e) {
                var n = t.selection,
                    r = n.$from,
                    o = n.$to,
                    i = r.blockRange(o),
                    s = i && S.liftTarget(i);
                return null != s && (e && e(t.tr.lift(i, s).scrollIntoView()), !0)
            }, e.newlineInCode = u, e.exitCode = f, e.createParagraphNear = d, e.liftEmptyBlock = h, e.splitBlock = m, e.splitBlockKeepMarks = function(t, e) {
                return m(t, e && function(n) {
                    var r = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
                    r && n.ensureMarks(r), e(n)
                })
            }, e.selectParentNode = function(t, e) {
                var n, r = t.selection,
                    o = r.$from,
                    i = r.to,
                    s = o.sharedDepth(i);
                return 0 != s && (n = o.before(s), e && e(t.tr.setSelection(L.NodeSelection.create(t.doc, n))), !0)
            }, e.selectAll = v, e.wrapIn = function(t, e) {
                return function(n, r) {
                    var o = n.selection,
                        i = o.$from,
                        s = o.$to,
                        a = i.blockRange(s),
                        c = a && S.findWrapping(a, t, e);
                    return !!c && (r && r(n.tr.wrap(a, c).scrollIntoView()), !0)
                }
            }, e.setBlockType = function(t, e) {
                return function(n, r) {
                    var o = n.selection,
                        i = o.from,
                        s = o.to,
                        a = !1;
                    return n.doc.nodesBetween(i, s, function(r, o) {
                        if (a) return !1;
                        if (r.isTextblock && !r.hasMarkup(t, e))
                            if (r.type == t) a = !0;
                            else {
                                var i = n.doc.resolve(o),
                                    s = i.index();
                                a = i.parent.canReplaceWith(s, s + 1, t)
                            }
                    }), !!a && (r && r(n.tr.setBlockType(i, s, t, e).scrollIntoView()), !0)
                }
            }, e.toggleMark = function(t, e) {
                return function(n, r) {
                    var o = n.selection,
                        i = o.empty,
                        s = o.$cursor,
                        a = o.ranges;
                    if (i && !s || !w(n.doc, a, t)) return !1;
                    if (r)
                        if (s) r(t.isInSet(n.storedMarks || s.marks()) ? n.tr.removeStoredMark(t) : n.tr.addStoredMark(t.create(e)));
                        else {
                            for (var c = !1, l = n.tr, p = 0; !c && p < a.length; p++) {
                                var u = a[p],
                                    f = u.$from,
                                    d = u.$to;
                                c = n.doc.rangeHasMark(f.pos, d.pos, t)
                            }
                            for (var h = 0; h < a.length; h++) {
                                var m = a[h],
                                    v = m.$from,
                                    g = m.$to;
                                c ? l.removeMark(v.pos, g.pos, t) : l.addMark(v.pos, g.pos, t.create(e))
                            }
                            r(l.scrollIntoView())
                        }
                    return !0
                }
            }, e.autoJoin = function(t, e) {
                if (Array.isArray(e)) {
                    var n = e;
                    e = function(t) {
                        return n.indexOf(t.type.name) > -1
                    }
                }
                return function(n, r) {
                    return t(n, r && b(r, e))
                }
            }, e.chainCommands = k, e.pcBaseKeymap = C, e.macBaseKeymap = O, e.baseKeymap = T
        }),
        ee = t(te),
        ne = te.deleteSelection,
        re = te.joinBackward,
        oe = te.selectNodeBackward,
        ie = te.joinForward,
        se = te.selectNodeForward,
        ae = te.joinUp,
        ce = te.joinDown,
        le = te.lift,
        pe = te.newlineInCode,
        ue = te.exitCode,
        fe = te.createParagraphNear,
        de = te.liftEmptyBlock,
        he = te.splitBlock,
        me = te.splitBlockKeepMarks,
        ve = te.selectParentNode,
        ge = te.selectAll,
        ye = te.wrapIn,
        we = te.setBlockType,
        be = te.toggleMark,
        Se = te.autoJoin,
        ke = te.chainCommands,
        xe = te.pcBaseKeymap,
        Me = te.macBaseKeymap,
        Ce = te.baseKeymap,
        Oe = Object.freeze({
            default: ee,
            __moduleExports: te,
            deleteSelection: ne,
            joinBackward: re,
            selectNodeBackward: oe,
            joinForward: ie,
            selectNodeForward: se,
            joinUp: ae,
            joinDown: ce,
            lift: le,
            newlineInCode: pe,
            exitCode: ue,
            createParagraphNear: fe,
            liftEmptyBlock: de,
            splitBlock: he,
            splitBlockKeepMarks: me,
            selectParentNode: ve,
            selectAll: ge,
            wrapIn: ye,
            setBlockType: we,
            toggleMark: be,
            autoJoin: Se,
            chainCommands: ke,
            pcBaseKeymap: xe,
            macBaseKeymap: Me,
            baseKeymap: Ce
        }),
        Ne = e(function(t, e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var n = ["p", 0],
                r = ["blockquote", 0],
                o = ["hr"],
                s = ["pre", ["code", 0]],
                a = ["br"],
                c = {
                    doc: {
                        content: "block+"
                    },
                    paragraph: {
                        content: "inline*",
                        group: "block",
                        parseDOM: [{
                            tag: "p"
                        }],
                        toDOM: function() {
                            return n
                        }
                    },
                    blockquote: {
                        content: "block+",
                        group: "block",
                        defining: !0,
                        parseDOM: [{
                            tag: "blockquote"
                        }],
                        toDOM: function() {
                            return r
                        }
                    },
                    horizontal_rule: {
                        group: "block",
                        parseDOM: [{
                            tag: "hr"
                        }],
                        toDOM: function() {
                            return o
                        }
                    },
                    heading: {
                        attrs: {
                            level: {
                                default: 1
                            }
                        },
                        content: "inline*",
                        group: "block",
                        defining: !0,
                        parseDOM: [{
                            tag: "h1",
                            attrs: {
                                level: 1
                            }
                        }, {
                            tag: "h2",
                            attrs: {
                                level: 2
                            }
                        }, {
                            tag: "h3",
                            attrs: {
                                level: 3
                            }
                        }, {
                            tag: "h4",
                            attrs: {
                                level: 4
                            }
                        }, {
                            tag: "h5",
                            attrs: {
                                level: 5
                            }
                        }, {
                            tag: "h6",
                            attrs: {
                                level: 6
                            }
                        }],
                        toDOM: function(t) {
                            return ["h" + t.attrs.level, 0]
                        }
                    },
                    code_block: {
                        content: "text*",
                        marks: "",
                        group: "block",
                        code: !0,
                        defining: !0,
                        parseDOM: [{
                            tag: "pre",
                            preserveWhitespace: "full"
                        }],
                        toDOM: function() {
                            return s
                        }
                    },
                    text: {
                        group: "inline"
                    },
                    image: {
                        inline: !0,
                        attrs: {
                            src: {},
                            alt: {
                                default: null
                            },
                            title: {
                                default: null
                            }
                        },
                        group: "inline",
                        draggable: !0,
                        parseDOM: [{
                            tag: "img[src]",
                            getAttrs: function(t) {
                                return {
                                    src: t.getAttribute("src"),
                                    title: t.getAttribute("title"),
                                    alt: t.getAttribute("alt")
                                }
                            }
                        }],
                        toDOM: function(t) {
                            var e = t.attrs;
                            return ["img", {
                                src: e.src,
                                alt: e.alt,
                                title: e.title
                            }]
                        }
                    },
                    hard_break: {
                        inline: !0,
                        group: "inline",
                        selectable: !1,
                        parseDOM: [{
                            tag: "br"
                        }],
                        toDOM: function() {
                            return a
                        }
                    }
                },
                l = ["em", 0],
                p = ["strong", 0],
                u = ["code", 0],
                f = {
                    link: {
                        attrs: {
                            href: {},
                            title: {
                                default: null
                            }
                        },
                        inclusive: !1,
                        parseDOM: [{
                            tag: "a[href]",
                            getAttrs: function(t) {
                                return {
                                    href: t.getAttribute("href"),
                                    title: t.getAttribute("title")
                                }
                            }
                        }],
                        toDOM: function(t) {
                            var e = t.attrs;
                            return ["a", {
                                href: e.href,
                                title: e.title
                            }, 0]
                        }
                    },
                    em: {
                        parseDOM: [{
                            tag: "i"
                        }, {
                            tag: "em"
                        }, {
                            style: "font-style=italic"
                        }],
                        toDOM: function() {
                            return l
                        }
                    },
                    strong: {
                        parseDOM: [{
                            tag: "strong"
                        }, {
                            tag: "b",
                            getAttrs: function(t) {
                                return "normal" != t.style.fontWeight && null
                            }
                        }, {
                            style: "font-weight",
                            getAttrs: function(t) {
                                return /^(bold(er)?|[5-9]\d{2,})$/.test(t) && null
                            }
                        }],
                        toDOM: function() {
                            return p
                        }
                    },
                    code: {
                        parseDOM: [{
                            tag: "code"
                        }],
                        toDOM: function() {
                            return u
                        }
                    }
                },
                d = new i.Schema({
                    nodes: c,
                    marks: f
                });
            e.nodes = c, e.marks = f, e.schema = d
        }),
        Te = t(Ne),
        De = Ne.nodes,
        Ee = Ne.marks,
        Ae = Ne.schema,
        Ie = Object.freeze({
            default: Te,
            __moduleExports: Ne,
            nodes: De,
            marks: Ee,
            schema: Ae
        }),
        Re = e(function(t, e) {
            function n(t, e) {
                var n = {};
                for (var r in t) n[r] = t[r];
                for (var o in e) n[o] = e[o];
                return n
            }

            function r(t, e, n, r, o) {
                for (var s = i.Fragment.empty, a = n.length - 1; a >= 0; a--) s = i.Fragment.from(n[a].type.create(n[a].attrs, s));
                t.step(new S.ReplaceAroundStep(e.start - (r ? 2 : 0), e.end, e.start, e.end, new i.Slice(s, 0, 0), n.length, !0));
                for (var c = 0, l = 0; l < n.length; l++) n[l].type == o && (c = l + 1);
                for (var p = n.length - c, u = e.start + n.length - (r ? 2 : 0), f = e.parent, d = e.startIndex, h = e.endIndex, m = !0; d < h; d++, m = !1) !m && S.canSplit(t.doc, u, p) && (t.split(u, p), u += 2 * p), u += f.child(d).nodeSize;
                return t
            }

            function o(t, e, n, r) {
                var o = t.tr,
                    s = r.end,
                    a = r.$to.end(r.depth);
                return s < a && (o.step(new S.ReplaceAroundStep(s - 1, a, s, a, new i.Slice(i.Fragment.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new i.NodeRange(o.doc.resolve(r.$from.pos), o.doc.resolve(a), r.depth)), e(o.lift(r, S.liftTarget(r)).scrollIntoView()), !0
            }

            function s(t, e, n) {
                for (var r = t.tr, o = n.parent, s = n.end, a = n.endIndex - 1, c = n.startIndex; a > c; a--) s -= o.child(a).nodeSize, r.delete(s - 1, s + 1);
                var l = r.doc.resolve(n.start),
                    p = l.nodeAfter,
                    u = 0 == n.startIndex,
                    f = n.endIndex == o.childCount,
                    d = l.node(-1),
                    h = l.index(-1);
                if (!d.canReplace(h + (u ? 0 : 1), h + 1, p.content.append(f ? i.Fragment.empty : i.Fragment.from(o)))) return !1;
                var m = l.pos,
                    v = m + p.nodeSize;
                return r.step(new S.ReplaceAroundStep(m - (u ? 1 : 0), v + (f ? 1 : 0), m + 1, v - 1, new i.Slice((u ? i.Fragment.empty : i.Fragment.from(o.copy(i.Fragment.empty))).append(f ? i.Fragment.empty : i.Fragment.from(o.copy(i.Fragment.empty))), u ? 0 : 1, f ? 0 : 1), u ? 0 : 1)), e(r.scrollIntoView()), !0
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var a = ["ol", 0],
                c = ["ul", 0],
                l = ["li", 0],
                p = {
                    attrs: {
                        order: {
                            default: 1
                        }
                    },
                    parseDOM: [{
                        tag: "ol",
                        getAttrs: function(t) {
                            return {
                                order: t.hasAttribute("start") ? +t.getAttribute("start") : 1
                            }
                        }
                    }],
                    toDOM: function(t) {
                        return 1 == t.attrs.order ? a : ["ol", {
                            start: t.attrs.order
                        }, 0]
                    }
                },
                u = {
                    parseDOM: [{
                        tag: "ul"
                    }],
                    toDOM: function() {
                        return c
                    }
                },
                f = {
                    parseDOM: [{
                        tag: "li"
                    }],
                    toDOM: function() {
                        return l
                    },
                    defining: !0
                };
            e.orderedList = p, e.bulletList = u, e.listItem = f, e.addListNodes = function(t, e, r) {
                return t.append({
                    ordered_list: n(p, {
                        content: "list_item+",
                        group: r
                    }),
                    bullet_list: n(u, {
                        content: "list_item+",
                        group: r
                    }),
                    list_item: n(f, {
                        content: e
                    })
                })
            }, e.wrapInList = function(t, e) {
                return function(n, o) {
                    var s = n.selection,
                        a = s.$from,
                        c = s.$to,
                        l = a.blockRange(c),
                        p = !1,
                        u = l;
                    if (!l) return !1;
                    if (l.depth >= 2 && a.node(l.depth - 1).type.compatibleContent(t) && 0 == l.startIndex) {
                        if (0 == a.index(l.depth - 1)) return !1;
                        var f = n.doc.resolve(l.start - 2);
                        u = new i.NodeRange(f, f, l.depth), l.endIndex < l.parent.childCount && (l = new i.NodeRange(a, n.doc.resolve(c.end(l.depth)), l.depth)), p = !0
                    }
                    var d = S.findWrapping(u, t, e, l);
                    return !!d && (o && o(r(n.tr, l, d, p, t).scrollIntoView()), !0)
                }
            }, e.splitListItem = function(t) {
                return function(e, n) {
                    var r = e.selection,
                        o = r.$from,
                        s = r.$to,
                        a = r.node;
                    if (a && a.isBlock || o.depth < 2 || !o.sameParent(s)) return !1;
                    var c = o.node(-1);
                    if (c.type != t) return !1;
                    if (0 == o.parent.content.size) {
                        if (2 == o.depth || o.node(-3).type != t || o.index(-2) != o.node(-2).childCount - 1) return !1;
                        if (n) {
                            for (var l = i.Fragment.empty, p = o.index(-1) > 0, u = o.depth - (p ? 1 : 2); u >= o.depth - 3; u--) l = i.Fragment.from(o.node(u).copy(l));
                            l = l.append(i.Fragment.from(t.createAndFill()));
                            var f = e.tr.replace(o.before(p ? null : -1), o.after(-3), new i.Slice(l, p ? 3 : 2, 2));
                            f.setSelection(e.selection.constructor.near(f.doc.resolve(o.pos + (p ? 3 : 2)))), n(f.scrollIntoView())
                        }
                        return !0
                    }
                    var d = s.pos == o.end() ? c.contentMatchAt(o.indexAfter(-1)).defaultType : null,
                        h = e.tr.delete(o.pos, s.pos),
                        m = d && [null, {
                            type: d
                        }];
                    return !!S.canSplit(h.doc, o.pos, 2, m) && (n && n(h.split(o.pos, 2, m).scrollIntoView()), !0)
                }
            }, e.liftListItem = function(t) {
                return function(e, n) {
                    var r = e.selection,
                        i = r.$from,
                        a = r.$to,
                        c = i.blockRange(a, function(e) {
                            return e.childCount && e.firstChild.type == t
                        });
                    return !!c && (!n || (i.node(c.depth - 1).type == t ? o(e, n, t, c) : s(e, n, c)))
                }
            }, e.sinkListItem = function(t) {
                return function(e, n) {
                    var r = e.selection,
                        o = r.$from,
                        s = r.$to,
                        a = o.blockRange(s, function(e) {
                            return e.childCount && e.firstChild.type == t
                        });
                    if (!a) return !1;
                    var c = a.startIndex;
                    if (0 == c) return !1;
                    var l = a.parent,
                        p = l.child(c - 1);
                    if (p.type != t) return !1;
                    if (n) {
                        var u = p.lastChild && p.lastChild.type == l.type,
                            f = i.Fragment.from(u ? t.create() : null),
                            d = new i.Slice(i.Fragment.from(t.create(null, i.Fragment.from(l.type.create(null, f)))), u ? 3 : 1, 0),
                            h = a.start,
                            m = a.end;
                        n(e.tr.step(new S.ReplaceAroundStep(h - (u ? 3 : 1), m, h, m, d, 1, !0)).scrollIntoView())
                    }
                    return !0
                }
            }
        }),
        ze = t(Re),
        Pe = Re.orderedList,
        _e = Re.bulletList,
        Be = Re.listItem,
        Fe = Re.addListNodes,
        je = Re.wrapInList,
        Ve = Re.splitListItem,
        qe = Re.liftListItem,
        $e = Re.sinkListItem,
        Le = Object.freeze({
            default: ze,
            __moduleExports: Re,
            orderedList: Pe,
            bulletList: _e,
            listItem: Be,
            addListNodes: Fe,
            wrapInList: je,
            splitListItem: Ve,
            liftListItem: qe,
            sinkListItem: $e
        }),
        Je = e(function(t, e) {
            function n(t, e) {
                var n = t && t.width || 1;
                return "border-" + e + ": " + n + "px solid " + (t && t.color || "black") + "; margin-" + e + ": -" + n + "px"
            }

            function r(t, e, r) {
                var o, i = t.doc.resolve(e);
                if (!i.parent.inlineContent) {
                    var s, a;
                    (s = i.nodeBefore) ? o = et.Decoration.node(e - s.nodeSize, e, {
                        nodeName: "div",
                        style: n(r, "right")
                    }): (a = i.nodeAfter) && (o = et.Decoration.node(e, e + a.nodeSize, {
                        nodeName: "div",
                        style: n(r, "left")
                    }))
                }
                if (!o) {
                    var c = document.createElement("span");
                    c.textContent = "​", c.style.cssText = n(r, "left") + "; display: inline-block; pointer-events: none", o = et.Decoration.widget(e, c)
                }
                return {
                    pos: e,
                    deco: et.DecorationSet.create(t.doc, [o])
                }
            }

            function o(t, e) {
                if (!t || !t.content.size) return e.pos;
                for (var n = t.content, r = 0; r < t.openStart; r++) n = n.firstChild.content;
                for (var o = e.depth; o >= 0; o--) {
                    var i = o == e.depth ? 0 : e.pos <= (e.start(o + 1) + e.end(o + 1)) / 2 ? -1 : 1,
                        s = e.index(o) + (i > 0 ? 1 : 0);
                    if (e.node(o).canReplace(s, s, n)) return 0 == i ? e.pos : i < 0 ? e.before(o + 1) : e.after(o + 1)
                }
                return e.pos
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = "undefined" != typeof navigator && /gecko\/\d/i.test(navigator.userAgent),
                s = "undefined" != typeof navigator && /linux/i.test(navigator.platform);
            e.dropCursor = function(t) {
                function e(t, e) {
                    t.dispatch(t.state.tr.setMeta(c, e))
                }

                function n(t) {
                    clearTimeout(a), a = setTimeout(function() {
                        c.getState(t.state) && e(t, {
                            type: "remove"
                        })
                    }, 1e3)
                }
                var a = null,
                    c = new L.Plugin({
                        state: {
                            init: function() {
                                return null
                            },
                            apply: function(e, n, o) {
                                if (i && s) return null;
                                var a = e.getMeta(c);
                                return a ? "set" == a.type ? r(o, a.pos, t) : null : n
                            }
                        },
                        props: {
                            handleDOMEvents: {
                                dragover: function(t, r) {
                                    var i = c.getState(t.state),
                                        s = t.posAtCoords({
                                            left: r.clientX,
                                            top: r.clientY
                                        });
                                    if (s) {
                                        var a = s.pos;
                                        t.dragging && (a = o(t.dragging.slice, t.state.doc.resolve(a))), i && i.pos == a || e(t, {
                                            type: "set",
                                            pos: a
                                        })
                                    }
                                    return n(t), !1
                                },
                                dragend: function(t) {
                                    return c.getState(t.state) && e(t, {
                                        type: "remove"
                                    }), !1
                                },
                                drop: function(t) {
                                    return c.getState(t.state) && e(t, {
                                        type: "remove"
                                    }), !1
                                },
                                dragleave: function(t, n) {
                                    return n.target == t.dom && e(t, {
                                        type: "remove"
                                    }), !1
                                }
                            },
                            decorations: function(t) {
                                var e = c.getState(t);
                                return e && e.deco
                            }
                        }
                    });
                return c
            }
        }),
        We = t(Je),
        Ke = Je.dropCursor,
        He = Object.freeze({
            default: We,
            __moduleExports: Je,
            dropCursor: Ke
        }),
        Ue = e(function(t, e) {
            function n(t) {
                for (var e = t.depth; e >= 0; e--) {
                    var n = t.index(e);
                    if (0 != n)
                        for (var r = t.node(e).child(n - 1);; r = r.lastChild) {
                            if (0 == r.childCount && !r.inlineContent || r.isAtom || r.type.spec.isolating) return !0;
                            if (r.inlineContent) return !1
                        }
                }
                return !0
            }

            function r(t) {
                for (var e = t.depth; e >= 0; e--) {
                    var n = t.indexAfter(e),
                        r = t.node(e);
                    if (n != r.childCount)
                        for (var o = r.child(n);; o = o.firstChild) {
                            if (0 == o.childCount && !o.inlineContent || o.isAtom || o.type.spec.isolating) return !0;
                            if (o.inlineContent) return !1
                        }
                }
                return !0
            }

            function o(t, e) {
                var n = "vert" == t ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
                return function(t, r, o) {
                    var i = t.selection,
                        s = e > 0 ? i.$to : i.$from,
                        a = i.empty;
                    if (i instanceof L.TextSelection) {
                        if (!o.endOfTextblock(n)) return !1;
                        a = !1, s = t.doc.resolve(e > 0 ? s.after() : s.before())
                    }
                    var l = c.findFrom(s, e, a);
                    return !!l && (r && r(t.tr.setSelection(new c(l))), !0)
                }
            }

            function s(t, e, n) {
                if (t.someProp("editable", function(e) {
                        return !1 === e(t.state)
                    })) return !1;
                var r = t.state.doc.resolve(e);
                if (!c.valid(r)) return !1;
                var o = t.posAtCoords({
                    left: n.clientX,
                    top: n.clientY
                }).inside;
                return !(o > -1 && L.NodeSelection.isSelectable(t.state.doc.nodeAt(o))) && (t.dispatch(t.state.tr.setSelection(new c(r))), !0)
            }

            function a(t) {
                if (!(t.selection instanceof c)) return null;
                var e = document.createElement("div");
                return e.className = "ProseMirror-gapcursor", et.DecorationSet.create(t.doc, [et.Decoration.widget(t.selection.head, e, {
                    key: "gapcursor"
                })])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var c = function(t) {
                function e(e) {
                    t.call(this, e, e)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.map = function(n, r) {
                    var o = n.resolve(r.map(this.head));
                    return e.valid(o) ? new e(o) : t.near(o)
                }, e.prototype.content = function() {
                    return i.Slice.empty
                }, e.prototype.eq = function(t) {
                    return t instanceof e && t.head == this.head
                }, e.prototype.toJSON = function() {
                    return {
                        type: "gapcursor",
                        pos: this.head
                    }
                }, e.fromJSON = function(t, n) {
                    if ("number" != typeof n.pos) throw new RangeError("Invalid input for GapCursor.fromJSON");
                    return new e(t.resolve(n.pos))
                }, e.prototype.getBookmark = function() {
                    return new l(this.anchor)
                }, e.valid = function(t) {
                    var e = t.parent;
                    if (e.isTextblock || !n(t) || !r(t)) return !1;
                    var o = e.type.spec.allowGapCursor;
                    if (null != o) return o;
                    var i = e.contentMatchAt(t.index()).defaultType;
                    return i && i.isTextblock
                }, e.findFrom = function(t, n, r) {
                    if (!r && e.valid(t)) return t;
                    for (var o = t.pos, i = null, s = t.depth;; s--) {
                        var a = t.node(s);
                        if (n > 0 ? t.indexAfter(s) < a.childCount : t.index(s) > 0) {
                            i = a.maybeChild(n > 0 ? t.indexAfter(s) : t.index(s) - 1);
                            break
                        }
                        if (0 == s) return null;
                        o += n;
                        var c = t.doc.resolve(o);
                        if (e.valid(c)) return c
                    }
                    for (; i = n > 0 ? i.firstChild : i.lastChild;) {
                        o += n;
                        var l = t.doc.resolve(o);
                        if (e.valid(l)) return l
                    }
                    return null
                }, e
            }(L.Selection);
            c.prototype.visible = !1, L.Selection.jsonID("gapcursor", c);
            var l = function(t) {
                this.pos = t
            };
            l.prototype.map = function(t) {
                return new l(t.map(this.pos))
            }, l.prototype.resolve = function(t) {
                var e = t.resolve(this.pos);
                return c.valid(e) ? new c(e) : L.Selection.near(e)
            };
            var p = bt.keydownHandler({
                ArrowLeft: o("horiz", -1),
                ArrowRight: o("horiz", 1),
                ArrowUp: o("vert", -1),
                ArrowDown: o("vert", 1)
            });
            e.gapCursor = function() {
                return new L.Plugin({
                    props: {
                        decorations: a,
                        createSelectionBetween: function(t, e, n) {
                            if (e.pos == n.pos && c.valid(n)) return new c(n)
                        },
                        handleClick: s,
                        handleKeyDown: p
                    }
                })
            }, e.GapCursor = c
        }),
        Ge = t(Ue),
        Qe = Ue.gapCursor,
        Xe = Ue.GapCursor,
        Ye = Object.freeze({
            default: Ge,
            __moduleExports: Ue,
            gapCursor: Qe,
            GapCursor: Xe
        }),
        Ze = e(function(t, e) {
            ! function(e, n) {
                t.exports = n()
            }(0, function() {
                function t() {
                    var p, d = arguments,
                        h = d[0],
                        m = d[1],
                        v = 2,
                        g = d.length,
                        y = t[i];
                    if (h = t[a](h) ? h : c.createElement(h), 1 === g) return h;
                    if ((!l(m, n) || t[s](m) || u(m)) && (--v, m = null), g - v == 1 && l(d[v], "string") && void 0 !== h[r]) h[r] = d[v];
                    else
                        for (; v < g; ++v)
                            if (null != (p = d[v]))
                                if (u(p))
                                    for (var w = 0; w < p.length; ++w) f(h, p[w]);
                                else f(h, p); for (var b in m)
                        if (y[b]) {
                            var S = y[b];
                            typeof S === e ? S(h, m[b]) : h[o](S, m[b])
                        } else l(m[b], e) ? h[b] = m[b] : h[o](b, m[b]);
                    return h
                }
                var e = "function",
                    n = "object",
                    r = "textContent",
                    o = "setAttribute",
                    i = "attrMap",
                    s = "isNode",
                    a = "isElement",
                    c = typeof document === n ? document : {},
                    l = function(t, e) {
                        return typeof t === e
                    },
                    p = typeof Node === e ? function(t) {
                        return t instanceof Node
                    } : function(t) {
                        return t && l(t, n) && "nodeType" in t && l(t.ownerDocument, n)
                    },
                    u = function(t) {
                        return t instanceof Array
                    },
                    f = function(e, n) {
                        u(n) ? n.map(function(t) {
                            f(e, t)
                        }) : (t[s](n) || (n = c.createTextNode(n)), e.appendChild(n))
                    };
                return t[i] = {}, t[a] = function(e) {
                    return t[s](e) && 1 === e.nodeType
                }, t[s] = p, "undefined" != typeof Proxy && (t.proxy = new Proxy(t, {
                    get: function(e, n) {
                        return !(n in t) && (t[n] = t.bind(null, n)), t[n]
                    }
                })), t
            })
        }),
        tn = e(function(t, e) {
            function n(t) {
                for (var e = 0, n = 0; n < t.length; n++) e = (e << 5) - e + t.charCodeAt(n) | 0;
                return e
            }

            function r(t) {
                var e = document.createElement("div");
                if (e.className = b, t.path) {
                    var r = "pm-icon-" + n(t.path).toString(16);
                    document.getElementById(r) || o(r, t);
                    var i = e.appendChild(document.createElementNS(y, "svg"));
                    i.style.width = t.width / t.height + "em", i.appendChild(document.createElementNS(y, "use")).setAttributeNS(w, "href", /([^#]*)/.exec(document.location)[1] + "#" + r)
                } else t.dom ? e.appendChild(t.dom.cloneNode(!0)) : (e.appendChild(document.createElement("span")).textContent = t.text || "", t.css && (e.firstChild.style.cssText = t.css));
                return e
            }

            function o(t, e) {
                // console.log(b + b + "-collection***************");
                // var n = document.getElementById(b + "-collection");
                // n || ((n = document.createElementNS(y, "svg")).id = b + "-collection", n.style.display = "none", document.body.insertBefore(n, document.body.firstChild));
                // var r = document.createElementNS(y, "symbol");
                // r.id = t, r.setAttribute("viewBox", "0 0 " + e.width + " " + e.height), r.appendChild(document.createElementNS(y, "path")).setAttribute("d", e.path), n.appendChild(r)
            }

            function i(t, e) {
                return t._props.translate ? t._props.translate(e) : e
            }

            function s(t) {
                x.time = Date.now(), x.node = t.target
            }

            function a(t) {
                return Date.now() - 100 < x.time && x.node && t.contains(x.node)
            }

            function c(t, e) {
                for (var n = [], r = [], o = 0; o < t.length; o++) {
                    var i = t[o].render(e),
                        s = i.dom,
                        a = i.update;
                    n.push(g("div", {
                        class: S + "-dropdown-item"
                    }, s)), r.push(a)
                }
                return {
                    dom: n,
                    update: l(r, n)
                }
            }

            function l(t, e) {
                return function(n) {
                    for (var r = !1, o = 0; o < t.length; o++) {
                        var i = t[o](n);
                        e[o].style.display = i ? "" : "none", i && (r = !0)
                    }
                    return r
                }
            }

            function p(t, e) {
                for (var n = document.createDocumentFragment(), r = [], o = [], i = 0; i < e.length; i++) {
                    for (var s = e[i], a = [], c = [], p = 0; p < s.length; p++) {
                        var f = s[p].render(t),
                            d = f.dom,
                            h = f.update,
                            m = g("span", {
                                class: S + "item"
                            }, d);
                        n.appendChild(m), c.push(m), a.push(h)
                    }
                    a.length && (r.push(l(a, c)), i < e.length - 1 && o.push(n.appendChild(u())))
                }
                return {
                    dom: n,
                    update: function(t) {
                        for (var e = !1, n = !1, i = 0; i < r.length; i++) {
                            var s = r[i](t);
                            i && (o[i - 1].style.display = n && s ? "" : "none"), n = s, s && (e = !0)
                        }
                        return e
                    }
                }
            }

            function u() {
                return g("span", {
                    class: S + "separator"
                })
            }

            function f(t, e, n) {
                n ? t.classList.add(e) : t.classList.remove(e)
            }

            function d() {
                if ("undefined" == typeof navigator) return !1;
                var t = navigator.userAgent;
                return !/Edge\/\d/.test(t) && /AppleWebKit/.test(t) && /Mobile\/\w+/.test(t)
            }

            function h(t) {
                return t.anchorNode == t.focusNode ? t.anchorOffset > t.focusOffset : t.anchorNode.compareDocumentPosition(t.focusNode) == Node.DOCUMENT_POSITION_FOLLOWING
            }

            function m(t) {
                for (var e = t.parentNode; e; e = e.parentNode)
                    if (e.scrollHeight > e.clientHeight) return e
            }

            function v(t) {
                for (var e = [window], n = t.parentNode; n; n = n.parentNode) e.push(n);
                return e
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var g = function(t) {
                    return t && "object" == typeof t && "default" in t ? t.default : t
                }(Ze),
                y = "http://www.w3.org/2000/svg",
                w = "http://www.w3.org/1999/xlink",
                b = "ProseMirror-icon",
                S = "ProseMirror-menu",
                k = function(t) {
                    this.spec = t
                };
            k.prototype.render = function(t) {
                var e = this.spec,
                    n = e.render ? e.render(t) : e.icon ? r(e.icon) : e.label ? g("div", null, i(t, e.label)) : null;
                if (!n) throw new RangeError("MenuItem without icon or label property");
                if (e.title) {
                    var o = "function" == typeof e.title ? e.title(t.state) : e.title;
                    n.setAttribute("title", i(t, o))
                }
                return e.class && n.classList.add(e.class), e.css && (n.style.cssText += e.css), n.addEventListener("mousedown", function(r) {
                    r.preventDefault(), n.classList.contains(S + "-disabled") || e.run(t.state, t.dispatch, t, r)
                }), {
                    dom: n,
                    update: function(t) {
                        if (e.select) {
                            var r = e.select(t);
                            if (n.style.display = r ? "" : "none", !r) return !1
                        }
                        var o = !0;
                        if (e.enable && (o = e.enable(t) || !1, f(n, S + "-disabled", !o)), e.active) {
                            var i = o && e.active(t) || !1;
                            f(n, S + "-active", i)
                        }
                        return !0
                    }
                }
            };
            var x = {
                    time: 0,
                    node: null
                },
                M = function(t, e) {
                    this.options = e || {}, this.content = Array.isArray(t) ? t : [t]
                };
            M.prototype.render = function(t) {
                var e = this,
                    n = c(this.content, t),
                    r = g("div", {
                        class: S + "-dropdown " + (this.options.class || ""),
                        style: this.options.css
                    }, i(t, this.options.label));
                this.options.title && r.setAttribute("title", i(t, this.options.title));
                var o = g("div", {
                        class: S + "-dropdown-wrap"
                    }, r),
                    l = null,
                    p = null,
                    u = function() {
                        l && l.close() && (l = null, window.removeEventListener("mousedown", p))
                    };
                return r.addEventListener("mousedown", function(t) {
                    t.preventDefault(), s(t), l ? u() : (l = e.expand(o, n.dom), window.addEventListener("mousedown", p = function() {
                        a(o) || u()
                    }))
                }), {
                    dom: o,
                    update: function(t) {
                        var e = n.update(t);
                        return o.style.display = e ? "" : "none", e
                    }
                }
            }, M.prototype.expand = function(t, e) {
                var n = g("div", {
                        class: S + "-dropdown-menu " + (this.options.class || "")
                    }, e),
                    r = !1;
                return t.appendChild(n), {
                    close: function() {
                        if (!r) return r = !0, t.removeChild(n), !0
                    },
                    node: n
                }
            };
            var C = function(t, e) {
                this.options = e || {}, this.content = Array.isArray(t) ? t : [t]
            };
            C.prototype.render = function(t) {
                var e = c(this.content, t),
                    n = g("div", {
                        class: S + "-submenu-label"
                    }, i(t, this.options.label)),
                    r = g("div", {
                        class: S + "-submenu-wrap"
                    }, n, g("div", {
                        class: S + "-submenu"
                    }, e.dom)),
                    o = null;
                return n.addEventListener("mousedown", function(t) {
                    t.preventDefault(), s(t), f(r, S + "-submenu-wrap-active"), o || window.addEventListener("mousedown", o = function() {
                        a(r) || (r.classList.remove(S + "-submenu-wrap-active"), window.removeEventListener("mousedown", o), o = null)
                    })
                }), {
                    dom: r,
                    update: function(t) {
                        var n = e.update(t);
                        return r.style.display = n ? "" : "none", n
                    }
                }
            };
            var O = {
                    join: {
                        width: 800,
                        height: 900,
                        path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"
                    },
                    lift: {
                        width: 1024,
                        height: 1024,
                        path: "M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"
                    },
                    selectParentNode: {
                        text: "",
                        css: "font-weight: bold"
                    },
                    undo: {
                        width: 1024,
                        height: 1024,
                        path: "M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"
                    },
                    redo: {
                        width: 1024,
                        height: 1024,
                        path: "M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"
                    },
                    strong: {
                        width: 805,
                        height: 1024,
                        path: "M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"
                    },
                    em: {
                        width: 585,
                        height: 1024,
                        path: "M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"
                    },
                    code: {
                        width: 896,
                        height: 1024,
                        path: "M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"
                    },
                    link: {
                        width: 951,
                        height: 1024,
                        path: "M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"
                    },
                    bulletList: {
                        width: 768,
                        height: 896,
                        path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
                    },
                    orderedList: {
                        width: 768,
                        height: 896,
                        path: "M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"
                    },
                    blockquote: {
                        width: 640,
                        height: 896,
                        path: "M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"
                    }
                },
                N = new k({
                    title: "Join with above block",
                    run: te.joinUp,
                    select: function(t) {
                        return te.joinUp(t)
                    },
                    icon: O.join
                }),
                T = new k({
                    title: "Lift out of enclosing block",
                    run: te.lift,
                    select: function(t) {
                        return te.lift(t)
                    },
                    icon: O.lift
                }),
                D = new k({
                    title: "Select parent node",
                    run: te.selectParentNode,
                    select: function(t) {
                        return te.selectParentNode(t)
                    },
                    icon: O.selectParentNode
                }),
                E = new k({
                    title: "Undo last change",
                    run: Jt.undo,
                    enable: function(t) {
                        return Jt.undo(t)
                    },
                    icon: O.undo
                }),
                A = new k({
                    title: "Redo last undone change",
                    run: Jt.redo,
                    enable: function(t) {
                        return Jt.redo(t)
                    },
                    icon: O.redo
                }),
                I = "ProseMirror-menubar",
                R = function(t, e) {
                    var n = this;
                    this.editorView = t, this.options = e, this.wrapper = g("div", {
                        class: I + "-wrapper"
                    }), this.menu = this.wrapper.appendChild(g("div", {
                        class: I
                    })), this.menu.className = I, this.spacer = null, t.dom.parentNode.replaceChild(this.wrapper, t.dom), this.wrapper.appendChild(t.dom), this.maxHeight = 0, this.widthForMaxHeight = 0, this.floating = !1;
                    var r = p(this.editorView, this.options.content),
                        o = r.dom,
                        i = r.update;
                    if (this.contentUpdate = i, this.menu.appendChild(o), this.update(), e.floating && !d()) {
                        this.updateFloat();
                        var s = v(this.wrapper);
                        this.scrollFunc = function(t) {
                            var e = n.editorView.root;
                            (e.body || e).contains(n.wrapper) ? n.updateFloat(t.target.getBoundingClientRect && t.target) : s.forEach(function(t) {
                                return t.removeEventListener("scroll", n.scrollFunc)
                            })
                        }, s.forEach(function(t) {
                            return t.addEventListener("scroll", n.scrollFunc)
                        })
                    }
                };
            R.prototype.update = function() {
                this.contentUpdate(this.editorView.state), this.floating ? this.updateScrollCursor() : (this.menu.offsetWidth != this.widthForMaxHeight && (this.widthForMaxHeight = this.menu.offsetWidth, this.maxHeight = 0), this.menu.offsetHeight > this.maxHeight && (this.maxHeight = this.menu.offsetHeight, this.menu.style.minHeight = "22px"))
            }, R.prototype.updateScrollCursor = function() {
                var t = this.editorView.root.getSelection();
                if (t.focusNode) {
                    var e = t.getRangeAt(0).getClientRects(),
                        n = e[h(t) ? 0 : e.length - 1];
                    if (n) {
                        var r = this.menu.getBoundingClientRect();
                        if (n.top < r.bottom && n.bottom > r.top) {
                            var o = m(this.wrapper);
                            o && (o.scrollTop -= r.bottom - n.top)
                        }
                    }
                }
            }, R.prototype.updateFloat = function(t) {
                var e = this.wrapper,
                    n = e.getBoundingClientRect(),
                    r = t ? Math.max(0, t.getBoundingClientRect().top) : 0;
                if (this.floating)
                    if (n.top >= r || n.bottom < this.menu.offsetHeight + 10) this.floating = !1, this.menu.style.position = this.menu.style.left = this.menu.style.top = this.menu.style.width = "", this.menu.style.display = "", this.spacer.parentNode.removeChild(this.spacer), this.spacer = null;
                    else {
                        var o = (e.offsetWidth - e.clientWidth) / 2;
                        this.menu.style.left = n.left + o + "px", this.menu.style.display = n.top > window.innerHeight ? "none" : "", t && (this.menu.style.top = r + "px")
                    } else if (n.top < r && n.bottom >= this.menu.offsetHeight + 10) {
                    this.floating = !0;
                    var i = this.menu.getBoundingClientRect();
                    this.menu.style.left = i.left + "px", this.menu.style.width = i.width + "px", t && (this.menu.style.top = r + "px"), this.menu.style.position = "fixed", this.spacer = g("div", {
                        class: I + "-spacer",
                        style: "height: " + i.height + "px"
                    }), e.insertBefore(this.spacer, this.menu)
                }
            }, R.prototype.destroy = function() {
                this.wrapper.parentNode && this.wrapper.parentNode.replaceChild(this.editorView.dom, this.wrapper)
            }, e.MenuItem = k, e.Dropdown = M, e.DropdownSubmenu = C, e.renderGrouped = p, e.icons = O, e.joinUpItem = N, e.liftItem = T, e.selectParentNodeItem = D, e.undoItem = E, e.redoItem = A, e.wrapItem = function(t, e) {
                var n = {
                    run: function(n, r) {
                        return te.wrapIn(t, e.attrs)(n, r)
                    },
                    select: function(n) {
                        return te.wrapIn(t, e.attrs instanceof Function ? null : e.attrs)(n)
                    }
                };
                for (var r in e) n[r] = e[r];
                return new k(n)
            }, e.blockTypeItem = function(t, e) {
                var n = te.setBlockType(t, e.attrs),
                    r = {
                        run: n,
                        enable: function(t) {
                            return n(t)
                        },
                        active: function(n) {
                            var r = n.selection,
                                o = r.$from,
                                i = r.to,
                                s = r.node;
                            return s ? s.hasMarkup(t, e.attrs) : i <= o.end() && o.parent.hasMarkup(t, e.attrs)
                        }
                    };
                for (var o in e) r[o] = e[o];
                return new k(r)
            }, e.menuBar = function(t) {
                return new L.Plugin({
                    view: function(e) {
                        return new R(e, t)
                    }
                })
            }
        }),
        en = t(tn),
        nn = tn.MenuItem,
        rn = tn.Dropdown,
        on = tn.DropdownSubmenu,
        sn = tn.renderGrouped,
        an = tn.icons,
        cn = tn.joinUpItem,
        ln = tn.liftItem,
        pn = tn.selectParentNodeItem,
        un = tn.undoItem,
        fn = tn.redoItem,
        dn = tn.wrapItem,
        hn = tn.blockTypeItem,
        mn = tn.menuBar,
        vn = Object.freeze({
            default: en,
            __moduleExports: tn,
            MenuItem: nn,
            Dropdown: rn,
            DropdownSubmenu: on,
            renderGrouped: sn,
            icons: an,
            joinUpItem: cn,
            liftItem: ln,
            selectParentNodeItem: pn,
            undoItem: un,
            redoItem: fn,
            wrapItem: dn,
            blockTypeItem: hn,
            menuBar: mn
        }),
        gn = e(function(t, e) {
            function n(t) {
                var e = document.body.appendChild(document.createElement("div"));
                e.className = b;
                var n = function(t) {
                    e.contains(t.target) || o()
                };
                setTimeout(function() {
                    return window.addEventListener("mousedown", n)
                }, 50);
                var o = function() {
                        window.removeEventListener("mousedown", n), e.parentNode && e.parentNode.removeChild(e)
                    },
                    i = [];
                for (var s in t.fields) i.push(t.fields[s].render());
                var a = document.createElement("button");
                a.type = "submit", a.className = b + "-submit", a.textContent = "OK";
                var c = document.createElement("button");
                c.type = "button", c.className = b + "-cancel", c.textContent = "Cancel", c.addEventListener("click", o);
                var l = e.appendChild(document.createElement("form"));
                t.title && (l.appendChild(document.createElement("h5")).textContent = t.title), i.forEach(function(t) {
                    l.appendChild(document.createElement("div")).appendChild(t)
                });
                var p = l.appendChild(document.createElement("div"));
                p.className = b + "-buttons", p.appendChild(a), p.appendChild(document.createTextNode(" ")), p.appendChild(c);
                var u = e.getBoundingClientRect();
                e.style.top = (window.innerHeight - u.height) / 2 + "px", e.style.left = (window.innerWidth - u.width) / 2 + "px";
                var f = function() {
                    var e = r(t.fields, i);
                    e && (o(), t.callback(e))
                };
                l.addEventListener("submit", function(t) {
                    t.preventDefault(), f()
                }), l.addEventListener("keydown", function(t) {
                    27 == t.keyCode ? (t.preventDefault(), o()) : 13 != t.keyCode || t.ctrlKey || t.metaKey || t.shiftKey ? 9 == t.keyCode && window.setTimeout(function() {
                        e.contains(document.activeElement) || o()
                    }, 500) : (t.preventDefault(), f())
                });
                var d = l.elements[0];
                d && d.focus()
            }

            function r(t, e) {
                var n = Object.create(null),
                    r = 0;
                for (var i in t) {
                    var s = t[i],
                        a = e[r++],
                        c = s.read(a),
                        l = s.validate(c);
                    if (l) return o(a, l), null;
                    n[i] = s.clean(c)
                }
                return n
            }

            function o(t, e) {
                var n = t.parentNode,
                    r = n.appendChild(document.createElement("div"));
                r.style.left = t.offsetLeft + t.offsetWidth + 2 + "px", r.style.top = t.offsetTop - 5 + "px", r.className = "ProseMirror-invalid", r.textContent = e, setTimeout(function() {
                    return n.removeChild(r)
                }, 1500)
            }

            function i(t, e) {
                for (var n = t.selection.$from, r = n.depth; r >= 0; r--) {
                    var o = n.index(r);
                    if (n.node(r).canReplaceWith(o, o, e)) return !0
                }
                return !1
            }

            function s(t) {
                return new tn.MenuItem({
                    title: "Insert image",
                    label: "Image",
                    enable: function(e) {
                        return i(e, t)
                    },
                    run: function(e, r, o) {
                        var i = e.selection,
                            s = i.from,
                            a = i.to,
                            c = null;
                        e.selection instanceof L.NodeSelection && e.selection.node.type == t && (c = e.selection.node.attrs), n({
                            title: "Insert image",
                            fields: {
                                src: new k({
                                    label: "Location",
                                    required: !0,
                                    value: c && c.src
                                }),
                                title: new k({
                                    label: "Title",
                                    value: c && c.title
                                }),
                                alt: new k({
                                    label: "Description",
                                    value: c ? c.alt : e.doc.textBetween(s, a, " ")
                                })
                            },
                            callback: function(e) {
                                o.dispatch(o.state.tr.replaceSelectionWith(t.createAndFill(e))), o.focus()
                            }
                        })
                    }
                })
            }

            function a(t, e) {
                var n = {
                    label: e.title,
                    run: t
                };
                for (var r in e) n[r] = e[r];
                return e.enable && !0 !== e.enable || e.select || (n[e.enable ? "enable" : "select"] = function(e) {
                    return t(e)
                }), new tn.MenuItem(n)
            }

            function c(t, e) {
                var n = t.selection,
                    r = n.from,
                    o = n.$from,
                    i = n.to;
                return n.empty ? e.isInSet(t.storedMarks || o.marks()) : t.doc.rangeHasMark(r, i, e)
            }

            function l(t, e) {
                var n = {
                    active: function(e) {
                        return c(e, t)
                    },
                    enable: !0
                };
                for (var r in e) n[r] = e[r];
                return a(te.toggleMark(t), n)
            }

            function p(t) {
                return new tn.MenuItem({
                    title: "Add or remove link",
                    icon: tn.icons.link,
                    active: function(e) {
                        return c(e, t)
                    },
                    enable: function(t) {
                        return !t.selection.empty
                    },
                    run: function(e, r, o) {
                        if (c(e, t)) return te.toggleMark(t)(e, r), !0;
                        n({
                            title: "Create a link",
                            fields: {
                                href: new k({
                                    label: "Link target",
                                    required: !0
                                }),
                                title: new k({
                                    label: "Title"
                                })
                            },
                            callback: function(e) {
                                te.toggleMark(t, e)(o.state, o.dispatch), o.focus()
                            }
                        })
                    }
                })
            }

            function u(t, e) {
                return a(Re.wrapInList(t, e.attrs), e)
            }

            function f(t) {
                var e, n = {};
                if ((e = t.marks.strong) && (n.toggleStrong = l(e, {
                        title: "Toggle strong style",
                        icon: tn.icons.strong
                    })), (e = t.marks.em) && (n.toggleEm = l(e, {
                        title: "Toggle emphasis",
                        icon: tn.icons.em
                    })), (e = t.marks.code) && (n.toggleCode = l(e, {
                        title: "Toggle code font",
                        icon: tn.icons.code
                    })), (e = t.marks.link) && (n.toggleLink = p(e)), (e = t.nodes.image) && (n.insertImage = s(e)), (e = t.nodes.bullet_list) && (n.wrapBulletList = u(e, {
                        title: "Wrap in bullet list",
                        icon: tn.icons.bulletList
                    })), (e = t.nodes.ordered_list) && (n.wrapOrderedList = u(e, {
                        title: "Wrap in ordered list",
                        icon: tn.icons.orderedList
                    })), (e = t.nodes.blockquote) && (n.wrapBlockQuote = tn.wrapItem(e, {
                        title: "Wrap in block quote",
                        icon: tn.icons.blockquote
                    })), (e = t.nodes.paragraph) && (n.makeParagraph = tn.blockTypeItem(e, {
                        title: "Change to paragraph",
                        label: "Plain"
                    })), (e = t.nodes.code_block) && (n.makeCodeBlock = tn.blockTypeItem(e, {
                        title: "Change to code block",
                        label: "Code"
                    })), e = t.nodes.heading)
                    for (var r = 1; r <= 10; r++) n["makeHead" + r] = tn.blockTypeItem(e, {
                        title: "Change to heading " + r,
                        label: "Level " + r,
                        attrs: {
                            level: r
                        }
                    });
                if (e = t.nodes.horizontal_rule) {
                    var o = e;
                    n.insertHorizontalRule = new tn.MenuItem({
                        title: "Insert horizontal rule",
                        label: "Horizontal rule",
                        enable: function(t) {
                            return i(t, o)
                        },
                        run: function(t, e) {
                            e(t.tr.replaceSelectionWith(o.create()))
                        }
                    })
                }
                var a = function(t) {
                    return t.filter(function(t) {
                        return t
                    })
                };
                return n.insertMenu = new tn.Dropdown(a([n.insertImage, n.insertHorizontalRule]), {
                    label: "Insert"
                }), n.typeMenu = new tn.Dropdown(a([n.makeParagraph, n.makeCodeBlock, n.makeHead1 && new tn.DropdownSubmenu(a([n.makeHead1, n.makeHead2, n.makeHead3, n.makeHead4, n.makeHead5, n.makeHead6]), {
                    label: "Heading"
                })]), {
                    label: "Type..."
                }), n.inlineMenu = [a([n.toggleStrong, n.toggleEm, n.toggleCode, n.toggleLink])], n.blockMenu = [a([n.wrapBulletList, n.wrapOrderedList, n.wrapBlockQuote, tn.joinUpItem, tn.liftItem, tn.selectParentNodeItem])], n.fullMenu = n.inlineMenu.concat([
                    [n.insertMenu, n.typeMenu]
                ], [
                    [tn.undoItem, tn.redoItem]
                ], n.blockMenu), n
            }

            function d(t, e) {
                function n(t, n) {
                    if (e) {
                        var r = e[t];
                        if (!1 === r) return;
                        r && (t = r)
                    }
                    o[t] = n
                }
                var r, o = {};
                if (n("Mod-z", Jt.undo), n("Shift-Mod-z", Jt.redo), n("Backspace", Ct.undoInputRule), x || n("Mod-y", Jt.redo), n("Alt-ArrowUp", te.joinUp), n("Alt-ArrowDown", te.joinDown), n("Mod-BracketLeft", te.lift), n("Escape", te.selectParentNode), (r = t.marks.strong) && n("Mod-b", te.toggleMark(r)), (r = t.marks.em) && n("Mod-i", te.toggleMark(r)), (r = t.marks.code) && n("Mod-`", te.toggleMark(r)), (r = t.nodes.bullet_list) && n("Shift-Ctrl-8", Re.wrapInList(r)), (r = t.nodes.ordered_list) && n("Shift-Ctrl-9", Re.wrapInList(r)), (r = t.nodes.blockquote) && n("Ctrl->", te.wrapIn(r)), r = t.nodes.hard_break) {
                    var i = r,
                        s = te.chainCommands(te.exitCode, function(t, e) {
                            return e(t.tr.replaceSelectionWith(i.create()).scrollIntoView()), !0
                        });
                    n("Mod-Enter", s), n("Shift-Enter", s), x && n("Ctrl-Enter", s)
                }
                if ((r = t.nodes.list_item) && (n("Enter", Re.splitListItem(r)), n("Mod-[", Re.liftListItem(r)), n("Mod-]", Re.sinkListItem(r))), (r = t.nodes.paragraph) && n("Shift-Ctrl-0", te.setBlockType(r)), (r = t.nodes.code_block) && n("Shift-Ctrl-\\", te.setBlockType(r)), r = t.nodes.heading)
                    for (var a = 1; a <= 6; a++) n("Shift-Ctrl-" + a, te.setBlockType(r, {
                        level: a
                    }));
                if (r = t.nodes.horizontal_rule) {
                    var c = r;
                    n("Mod-_", function(t, e) {
                        return e(t.tr.replaceSelectionWith(c.create()).scrollIntoView()), !0
                    })
                }
                return o
            }

            function h(t) {
                return Ct.wrappingInputRule(/^\s*>\s$/, t)
            }

            function m(t) {
                return Ct.wrappingInputRule(/^(\d+)\.\s$/, t, function(t) {
                    return {
                        order: +t[1]
                    }
                }, function(t, e) {
                    return e.childCount + e.attrs.order == +t[1]
                })
            }

            function v(t) {
                return Ct.wrappingInputRule(/^\s*([-+*])\s$/, t)
            }

            function g(t) {
                return Ct.textblockTypeInputRule(/^```$/, t)
            }

            function y(t, e) {
                return Ct.textblockTypeInputRule(new RegExp("^(#{1," + e + "})\\s$"), t, function(t) {
                    return {
                        level: t[1].length
                    }
                })
            }

            function w(t) {
                var e, n = Ct.smartQuotes.concat(Ct.ellipsis, Ct.emDash);
                return (e = t.nodes.blockquote) && n.push(h(e)), (e = t.nodes.ordered_list) && n.push(m(e)), (e = t.nodes.bullet_list) && n.push(v(e)), (e = t.nodes.code_block) && n.push(g(e)), (e = t.nodes.heading) && n.push(y(e, 6)), Ct.inputRules({
                    rules: n
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var b = "ProseMirror-prompt",
                S = function(t) {
                    this.options = t
                };
            S.prototype.read = function(t) {
                return t.value
            }, S.prototype.validateType = function(t) {}, S.prototype.validate = function(t) {
                return !t && this.options.required ? "Required field" : this.validateType(t) || this.options.validate && this.options.validate(t)
            }, S.prototype.clean = function(t) {
                return this.options.clean ? this.options.clean(t) : t
            };
            var k = function(t) {
                    function e() {
                        t.apply(this, arguments)
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.render = function() {
                        var t = document.createElement("input");
                        return t.type = "text", t.placeholder = this.options.label, t.value = this.options.value || "", t.autocomplete = "off", t
                    }, e
                }(S),
                x = (function(t) {
                    function e() {
                        t.apply(this, arguments)
                    }
                    t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.render = function() {
                        var t = this,
                            e = document.createElement("select");
                        return this.options.options.forEach(function(n) {
                            var r = e.appendChild(document.createElement("option"));
                            r.value = n.value, r.selected = n.value == t.options.value, r.label = n.label
                        }), e
                    }
                }(S), "undefined" != typeof navigator && /Mac/.test(navigator.platform));
            e.buildMenuItems = f, e.buildKeymap = d, e.buildInputRules = w, e.exampleSetup = function(t) {
                var e = [w(t.schema), bt.keymap(d(t.schema, t.mapKeys)), bt.keymap(te.baseKeymap), Je.dropCursor(), Ue.gapCursor()];
                return !1 !== t.menuBar && e.push(tn.menuBar({
                    floating: !1 !== t.floatingMenu,
                    content: t.menuContent || f(t.schema).fullMenu
                })), !1 !== t.history && e.push(Jt.history()), e.concat(new L.Plugin({
                    props: {
                        attributes: {
                            class: "ProseMirror-example-setup-style"
                        }
                    }
                }))
            }
        }),
        yn = t(gn),
        wn = gn.buildMenuItems,
        bn = gn.buildKeymap,
        Sn = gn.buildInputRules,
        kn = gn.exampleSetup,
        xn = Object.freeze({
            default: yn,
            __moduleExports: gn,
            buildMenuItems: wn,
            buildKeymap: bn,
            buildInputRules: Sn,
            exampleSetup: kn
        });
    window.PM = {
        model: b,
        transform: $,
        state: tt,
        view: lt,
        keymap: Mt,
        inputrules: jt,
        history: Zt,
        commands: Oe,
        schema_basic: Ie,
        schema_list: Le,
        dropcursor: He,
        menu: vn,
        example_setup: xn,
        gapcursor: Ye
    }
}();