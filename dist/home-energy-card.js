/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis, mt = rt.ShadowRoot && (rt.ShadyCSS === void 0 || rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), Fe = /* @__PURE__ */ new WeakMap();
let as = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (mt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Fe.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Fe.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const fs = (s) => new as(typeof s == "string" ? s : s + "", void 0, bt), B = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((o, i, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new as(e, s, bt);
}, ys = (s, t) => {
  if (mt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = rt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, s.appendChild(o);
  }
}, Ge = mt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return fs(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _s, defineProperty: vs, getOwnPropertyDescriptor: ms, getOwnPropertyNames: bs, getOwnPropertySymbols: $s, getPrototypeOf: ws } = Object, S = globalThis, We = S.trustedTypes, xs = We ? We.emptyScript : "", ut = S.reactiveElementPolyfillSupport, Y = (s, t) => s, ct = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? xs : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, $t = (s, t) => !_s(s, t), Ke = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ke) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && vs(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: n } = ms(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const t = ws(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const e = this.properties, o = [...bs(e), ...$s(e)];
      for (const i of o) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, i] of e) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const i = this._$Eu(e, o);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) e.unshift(Ge(i));
    } else t !== void 0 && e.push(Ge(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ys(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostConnected) == null ? void 0 : o.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostDisconnected) == null ? void 0 : o.call(e);
    });
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$ET(t, e) {
    var n;
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const a = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : ct).toAttribute(e, o.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = o.getPropertyOptions(i), h = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : ct;
      this._$Em = i;
      const d = h.fromAttribute(e, l.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, n) {
    var a;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[t]), o ?? (o = l.getPropertyOptions(t)), !((o.hasChanged ?? $t)(n, e) || o.useDefault && o.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(l._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: i, wrapped: n }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: l } = a, h = this[n];
        l !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, a, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (o = this._$EO) == null || o.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[Y("elementProperties")] = /* @__PURE__ */ new Map(), D[Y("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: D }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, Ze = (s) => s, lt = J.trustedTypes, qe = lt ? lt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, rs = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, cs = "?" + A, Es = `<${cs}>`, H = document, X = () => H.createComment(""), tt = (s) => s === null || typeof s != "object" && typeof s != "function", wt = Array.isArray, Cs = (s) => wt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", gt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ye = /-->/g, Je = />/g, O = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qe = /'/g, Xe = /"/g, ls = /^(?:script|style|textarea|title)$/i, hs = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = hs(1), Q = hs(2), M = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ts = /* @__PURE__ */ new WeakMap(), z = H.createTreeWalker(H, 129);
function ds(s, t) {
  if (!wt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qe !== void 0 ? qe.createHTML(t) : t;
}
const As = (s, t) => {
  const e = s.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = q;
  for (let l = 0; l < e; l++) {
    const h = s[l];
    let d, g, p = -1, y = 0;
    for (; y < h.length && (a.lastIndex = y, g = a.exec(h), g !== null); ) y = a.lastIndex, a === q ? g[1] === "!--" ? a = Ye : g[1] !== void 0 ? a = Je : g[2] !== void 0 ? (ls.test(g[2]) && (i = RegExp("</" + g[2], "g")), a = O) : g[3] !== void 0 && (a = O) : a === O ? g[0] === ">" ? (a = i ?? q, p = -1) : g[1] === void 0 ? p = -2 : (p = a.lastIndex - g[2].length, d = g[1], a = g[3] === void 0 ? O : g[3] === '"' ? Xe : Qe) : a === Xe || a === Qe ? a = O : a === Ye || a === Je ? a = q : (a = O, i = void 0);
    const _ = a === O && s[l + 1].startsWith("/>") ? " " : "";
    n += a === q ? h + Es : p >= 0 ? (o.push(d), h.slice(0, p) + rs + h.slice(p) + A + _) : h + A + (p === -2 ? l : _);
  }
  return [ds(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class et {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const l = t.length - 1, h = this.parts, [d, g] = As(t, e);
    if (this.el = et.createElement(d, o), z.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = z.nextNode()) !== null && h.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(rs)) {
          const y = g[a++], _ = i.getAttribute(p).split(A), b = /([.?@])?(.*)/.exec(y);
          h.push({ type: 1, index: n, name: b[2], strings: _, ctor: b[1] === "." ? Ps : b[1] === "?" ? Ts : b[1] === "@" ? ks : ht }), i.removeAttribute(p);
        } else p.startsWith(A) && (h.push({ type: 6, index: n }), i.removeAttribute(p));
        if (ls.test(i.tagName)) {
          const p = i.textContent.split(A), y = p.length - 1;
          if (y > 0) {
            i.textContent = lt ? lt.emptyScript : "";
            for (let _ = 0; _ < y; _++) i.append(p[_], X()), z.nextNode(), h.push({ type: 2, index: ++n });
            i.append(p[y], X());
          }
        }
      } else if (i.nodeType === 8) if (i.data === cs) h.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(A, p + 1)) !== -1; ) h.push({ type: 7, index: n }), p += A.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const o = H.createElement("template");
    return o.innerHTML = t, o;
  }
}
function R(s, t, e = s, o) {
  var a, l;
  if (t === M) return t;
  let i = o !== void 0 ? (a = e._$Co) == null ? void 0 : a[o] : e._$Cl;
  const n = tt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = i : e._$Cl = i), i !== void 0 && (t = R(s, i._$AS(s, t.values), i, o)), t;
}
class Ss {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? H).importNode(e, !0);
    z.currentNode = i;
    let n = z.nextNode(), a = 0, l = 0, h = o[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let d;
        h.type === 2 ? d = new ot(n, n.nextSibling, this, t) : h.type === 1 ? d = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (d = new Os(n, this, t)), this._$AV.push(d), h = o[++l];
      }
      a !== (h == null ? void 0 : h.index) && (n = z.nextNode(), a++);
    }
    return z.currentNode = H, i;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class ot {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = R(this, t, e), tt(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Cs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = et.createElement(ds(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const a = new Ss(i, this), l = a.u(this.options);
      a.p(e), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = ts.get(t.strings);
    return e === void 0 && ts.set(t.strings, e = new et(t)), e;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, i = 0;
    for (const n of t) i === e.length ? e.push(o = new ot(this.O(X()), this.O(X()), this, this.options)) : o = e[i], o._$AI(n), i++;
    i < e.length && (this._$AR(o && o._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Ze(t).nextSibling;
      Ze(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = u;
  }
  _$AI(t, e = this, o, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = R(this, t, e, 0), a = !tt(t) || t !== this._$AH && t !== M, a && (this._$AH = t);
    else {
      const l = t;
      let h, d;
      for (t = n[0], h = 0; h < n.length - 1; h++) d = R(this, l[o + h], e, h), d === M && (d = this._$AH[h]), a || (a = !tt(d) || d !== this._$AH[h]), d === u ? t = u : t !== u && (t += (d ?? "") + n[h + 1]), this._$AH[h] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ps extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ts extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class ks extends ht {
  constructor(t, e, o, i, n) {
    super(t, e, o, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? u) === M) return;
    const o = this._$AH, i = t === u && o !== u || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== u && (o === u || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Os {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const ft = J.litHtmlPolyfillSupport;
ft == null || ft(et, ot), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.2");
const zs = (s, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = i = new ot(t.insertBefore(X(), n), n, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class $ extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zs(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return M;
  }
}
var ns;
$._$litElement$ = !0, $.finalized = !0, (ns = N.litElementHydrateSupport) == null || ns.call(N, { LitElement: $ });
const yt = N.litElementPolyfillSupport;
yt == null || yt({ LitElement: $ });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ns = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: $t }, Hs = (s = Ns, t, e) => {
  const { kind: o, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), o === "accessor") {
    const { name: a } = e;
    return { set(l) {
      const h = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, h, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, s, l), l;
    } };
  }
  if (o === "setter") {
    const { name: a } = e;
    return function(l) {
      const h = this[a];
      t.call(this, l), this.requestUpdate(a, h, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function m(s) {
  return (t, e) => typeof e == "object" ? Hs(s, t, e) : ((o, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function xt(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
var Us = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, Et = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ds(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && Us(t, e, i), i;
};
let st = class extends $ {
  setConfig(s) {
    this.config = s;
  }
  render() {
    var s, t, e, o, i, n, a, l, h, d, g, p, y, _, b, v, T, k, E, C, V, F, G, W, K, Z, At, St, Pt, Tt, kt, Ot, zt, Nt, Ht, Ut, Dt, Mt, Rt, Lt, jt, Bt, It, Vt, Ft, Gt, Wt, Kt, Zt, qt, Yt, Jt, Qt, Xt, te, ee, se, ie, oe, ne, ae, re, ce, le, he, de, pe, ue, ge, fe, ye, _e, ve, me, be, $e, we, xe, Ee, Ce, Ae, Se, Pe, Te, ke, Oe, ze, Ne, He, Ue, De, Me, Re, Le, je, Be, Ie, Ve;
    return this.config ? f`
      <ha-textfield
        label="Title"
        .value=${this.config.title ?? ""}
        @change=${(c) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            title: c.target.value || void 0
          }
        },
        bubbles: !0,
        composed: !0
      })
    )}
      ></ha-textfield>

      <div class="switch-row">
        <span>Show Title</span>
        <ha-switch
          .checked=${this.config.show_header ?? !0}
          @change=${(c) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header: c.target.checked
          }
        },
        bubbles: !0,
        composed: !0
      })
    )}
        ></ha-switch>
      </div>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((t = (s = this.config.entity_types) == null ? void 0 : s.ev) == null ? void 0 : t.power_combined) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  power_combined: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Grid Import Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((o = (e = this.config.entity_types) == null ? void 0 : e.grid) == null ? void 0 : o.power_import) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  power_import: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Grid Export Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((n = (i = this.config.entity_types) == null ? void 0 : i.grid) == null ? void 0 : n.power_export) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  power_export: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Grid Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((l = (a = this.config.entity_types) == null ? void 0 : a.grid) == null ? void 0 : l.power_combined) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  power_combined: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Grid Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((d = (h = this.config.entity_types) == null ? void 0 : h.grid) == null ? void 0 : d.daily_usage) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  daily_usage: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>
      <div class="switch-row">
        <span>Grid Show when idle</span>
        <ha-switch
          .checked=${((p = (g = this.config.entity_types) == null ? void 0 : g.grid) == null ? void 0 : p.show_zero) ?? !0}
          @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  show_zero: c.target.checked
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
        ></ha-switch>
      </div>
      <ha-textfield
        label="Grid Zero Tolerance"
        type="number"
        min="0"
        .value=${((_ = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : _.zero_tolerance) != null ? String((v = (b = this.config.entity_types) == null ? void 0 : b.grid) == null ? void 0 : v.zero_tolerance) : ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  zero_tolerance: c.target.value !== "" ? Number(c.target.value) : void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Grid Label"
        .value=${((k = (T = this.config.entity_types) == null ? void 0 : T.grid) == null ? void 0 : k.label) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  label: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Grid Colour"
        .value=${((C = (E = this.config.entity_types) == null ? void 0 : E.grid) == null ? void 0 : C.colour) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
                  colour: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>

      <ha-selector
        label="Solar Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((F = (V = this.config.entity_types) == null ? void 0 : V.solar) == null ? void 0 : F.power_combined) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
                  power_combined: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Solar Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((W = (G = this.config.entity_types) == null ? void 0 : G.solar) == null ? void 0 : W.daily_usage) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
                  daily_usage: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>
      <div class="switch-row">
        <span>Solar Show when idle</span>
        <ha-switch
          .checked=${((Z = (K = this.config.entity_types) == null ? void 0 : K.solar) == null ? void 0 : Z.show_zero) ?? !0}
          @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
                  show_zero: c.target.checked
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
        ></ha-switch>
      </div>
      <ha-textfield
        label="Solar Zero Tolerance"
        type="number"
        min="0"
        .value=${((St = (At = this.config.entity_types) == null ? void 0 : At.solar) == null ? void 0 : St.zero_tolerance) != null ? String((Tt = (Pt = this.config.entity_types) == null ? void 0 : Pt.solar) == null ? void 0 : Tt.zero_tolerance) : ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
                  zero_tolerance: c.target.value !== "" ? Number(c.target.value) : void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Solar Label"
        .value=${((Ot = (kt = this.config.entity_types) == null ? void 0 : kt.solar) == null ? void 0 : Ot.label) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
                  label: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Solar Colour"
        .value=${((Nt = (zt = this.config.entity_types) == null ? void 0 : zt.solar) == null ? void 0 : Nt.colour) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
                  colour: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>

      <ha-selector
        label="Battery State of Charge"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Ut = (Ht = this.config.entity_types) == null ? void 0 : Ht.battery) == null ? void 0 : Ut.soc) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  soc: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Battery Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Mt = (Dt = this.config.entity_types) == null ? void 0 : Dt.battery) == null ? void 0 : Mt.power_combined) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  power_combined: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Battery Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Lt = (Rt = this.config.entity_types) == null ? void 0 : Rt.battery) == null ? void 0 : Lt.daily_usage) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  daily_usage: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>
      <div class="switch-row">
        <span>Battery Show when idle</span>
        <ha-switch
          .checked=${((Bt = (jt = this.config.entity_types) == null ? void 0 : jt.battery) == null ? void 0 : Bt.show_zero) ?? !0}
          @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  show_zero: c.target.checked
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
        ></ha-switch>
      </div>
      <ha-textfield
        label="Battery Zero Tolerance"
        type="number"
        min="0"
        .value=${((Vt = (It = this.config.entity_types) == null ? void 0 : It.battery) == null ? void 0 : Vt.zero_tolerance) != null ? String((Gt = (Ft = this.config.entity_types) == null ? void 0 : Ft.battery) == null ? void 0 : Gt.zero_tolerance) : ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  zero_tolerance: c.target.value !== "" ? Number(c.target.value) : void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Battery Label"
        .value=${((Kt = (Wt = this.config.entity_types) == null ? void 0 : Wt.battery) == null ? void 0 : Kt.label) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  label: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Battery Colour"
        .value=${((qt = (Zt = this.config.entity_types) == null ? void 0 : Zt.battery) == null ? void 0 : qt.colour) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
                  colour: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>

      <ha-selector
        label="Home Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Jt = (Yt = this.config.entity_types) == null ? void 0 : Yt.home) == null ? void 0 : Jt.power_combined) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
                  power_combined: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Home Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Xt = (Qt = this.config.entity_types) == null ? void 0 : Qt.home) == null ? void 0 : Xt.daily_usage) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
                  daily_usage: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>
      <div class="switch-row">
        <span>Home Show when idle</span>
        <ha-switch
          .checked=${((ee = (te = this.config.entity_types) == null ? void 0 : te.home) == null ? void 0 : ee.show_zero) ?? !0}
          @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
                  show_zero: c.target.checked
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
        ></ha-switch>
      </div>
      <ha-textfield
        label="Home Zero Tolerance"
        type="number"
        min="0"
        .value=${((ie = (se = this.config.entity_types) == null ? void 0 : se.home) == null ? void 0 : ie.zero_tolerance) != null ? String((ne = (oe = this.config.entity_types) == null ? void 0 : oe.home) == null ? void 0 : ne.zero_tolerance) : ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
                  zero_tolerance: c.target.value !== "" ? Number(c.target.value) : void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Home Label"
        .value=${((re = (ae = this.config.entity_types) == null ? void 0 : ae.home) == null ? void 0 : re.label) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
                  label: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Home Colour"
        .value=${((le = (ce = this.config.entity_types) == null ? void 0 : ce.home) == null ? void 0 : le.colour) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
                  colour: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>

      <ha-selector
        label="EV State of Charge"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((de = (he = this.config.entity_types) == null ? void 0 : he.ev) == null ? void 0 : de.soc) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  soc: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="EV Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((ue = (pe = this.config.entity_types) == null ? void 0 : pe.ev) == null ? void 0 : ue.daily_usage) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  daily_usage: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>
      <div class="switch-row">
        <span>EV Show when idle</span>
        <ha-switch
          .checked=${((fe = (ge = this.config.entity_types) == null ? void 0 : ge.ev) == null ? void 0 : fe.show_zero) ?? !0}
          @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  show_zero: c.target.checked
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
        ></ha-switch>
      </div>
      <ha-textfield
        label="EV Zero Tolerance"
        type="number"
        min="0"
        .value=${((_e = (ye = this.config.entity_types) == null ? void 0 : ye.ev) == null ? void 0 : _e.zero_tolerance) != null ? String((me = (ve = this.config.entity_types) == null ? void 0 : ve.ev) == null ? void 0 : me.zero_tolerance) : ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  zero_tolerance: c.target.value !== "" ? Number(c.target.value) : void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="EV Label"
        .value=${(($e = (be = this.config.entity_types) == null ? void 0 : be.ev) == null ? void 0 : $e.label) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  label: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="EV Colour"
        .value=${((xe = (we = this.config.entity_types) == null ? void 0 : we.ev) == null ? void 0 : xe.colour) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
                  colour: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>

      <ha-selector
        label="Custom Import Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Ce = (Ee = this.config.entity_types) == null ? void 0 : Ee.custom_1) == null ? void 0 : Ce.power_import) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  power_import: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Custom Export Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Se = (Ae = this.config.entity_types) == null ? void 0 : Ae.custom_1) == null ? void 0 : Se.power_export) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  power_export: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Custom Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Te = (Pe = this.config.entity_types) == null ? void 0 : Pe.custom_1) == null ? void 0 : Te.power_combined) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  power_combined: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Custom Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Oe = (ke = this.config.entity_types) == null ? void 0 : ke.custom_1) == null ? void 0 : Oe.daily_usage) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  daily_usage: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>

      <ha-selector
        label="Custom State of Charge"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Ne = (ze = this.config.entity_types) == null ? void 0 : ze.custom_1) == null ? void 0 : Ne.soc) ?? ""}
        @value-changed=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  soc: c.detail.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-selector>
      <div class="switch-row">
        <span>Custom Show when idle</span>
        <ha-switch
          .checked=${((Ue = (He = this.config.entity_types) == null ? void 0 : He.custom_1) == null ? void 0 : Ue.show_zero) ?? !0}
          @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  show_zero: c.target.checked
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
        ></ha-switch>
      </div>
      <ha-textfield
        label="Custom Zero Tolerance"
        type="number"
        min="0"
        .value=${((Me = (De = this.config.entity_types) == null ? void 0 : De.custom_1) == null ? void 0 : Me.zero_tolerance) != null ? String((Le = (Re = this.config.entity_types) == null ? void 0 : Re.custom_1) == null ? void 0 : Le.zero_tolerance) : ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  zero_tolerance: c.target.value !== "" ? Number(c.target.value) : void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Custom Label"
        .value=${((Be = (je = this.config.entity_types) == null ? void 0 : je.custom_1) == null ? void 0 : Be.label) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  label: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
      <ha-textfield
        label="Custom Colour"
        .value=${((Ve = (Ie = this.config.entity_types) == null ? void 0 : Ie.custom_1) == null ? void 0 : Ve.colour) ?? ""}
        @change=${(c) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
                  colour: c.target.value || void 0
                }
              }
            }
          },
          bubbles: !0,
          composed: !0
        })
      );
    }}
      ></ha-textfield>
    ` : u;
  }
};
st.styles = B`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ha-textfield,
    ha-selector {
      display: block;
      width: 100%;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }
  `;
Et([
  m({ attribute: !1 })
], st.prototype, "hass", 2);
Et([
  m({ attribute: !1 })
], st.prototype, "config", 2);
st = Et([
  I("home-energy-card-editor")
], st);
var Ms = Object.defineProperty, Rs = Object.getOwnPropertyDescriptor, dt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Rs(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && Ms(t, e, i), i;
};
function nt(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : e.attributes.unit_of_measurement === "Wh" ? o / 1e3 : o;
}
function at(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Ls(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (o) => o.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((o) => t.includes(o)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((o) => t.includes(o)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((o) => t.includes(o)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let L = class extends $ {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var v, T, k, E, C, V, F, G, W, K, Z;
    if (!this.config) return u;
    const s = ((v = this.hass) == null ? void 0 : v.states) ?? {}, t = this.config.entity_types ?? {}, e = ((T = this.config.display) == null ? void 0 : T.decimal_places) ?? 1, o = this.config.tariff_entity ? (k = s[this.config.tariff_entity]) == null ? void 0 : k.state : null, i = o && o !== "unavailable" && o !== "unknown" ? Ls(o) : null, n = nt(s, (E = t.solar) == null ? void 0 : E.daily_usage), a = nt(s, (C = t.home) == null ? void 0 : C.daily_usage), l = nt(s, (V = t.grid) == null ? void 0 : V.daily_usage), h = nt(s, (F = t.grid) == null ? void 0 : F.daily_export), d = !!((G = t.solar) != null && G.daily_usage), g = !!((W = t.home) != null && W.daily_usage), p = !!((K = t.grid) != null && K.daily_usage), y = !!((Z = t.grid) != null && Z.daily_export), _ = p || y, b = d || g || _;
    return f`
      <div class="header">

        ${this.showTitle || i ? f`
          <div class="title-row">
            ${this.showTitle ? f`<span class="title">${this.config.title ?? "Home Energy"}</span>` : u}
            ${i ? f`
                  <span
                    class="tariff"
                    style="background:${i.bg};color:${i.fg};"
                  >${i.label}</span>
                ` : u}
          </div>
        ` : u}

        ${b ? f`
          <div class="stats-row">

            ${d ? f`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${at(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : u}

            ${g ? f`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${at(a, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : u}

            ${_ ? f`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? f`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${at(l, e)}</span>
                    </div>
                  ` : u}
                  ${y ? f`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${at(h, e)}</span>
                    </div>
                  ` : u}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : u}

          </div>
        ` : u}

      </div>
    `;
  }
};
L.styles = B`
    :host { display: block; }

    .header {
      padding: 12px 16px 10px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    /* ── Title row ── */
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 24px;
    }

    .title {
      font-size: 1em;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tariff {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 10px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Stats row ── */
    .stats-row {
      display: flex;
      align-items: baseline;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0 8px;
      margin-top: 5px;
    }

    /* divider between stat groups */
    .stats-row > * + *::before {
      content: "·";
      margin-right: 8px;
      opacity: 0.3;
      font-size: 0.75em;
    }

    .stat {
      display: flex;
      align-items: baseline;
      gap: 2px;
      white-space: nowrap;
    }

    .stat-label {
      font-size: 0.68em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      opacity: 0.55;
      margin-right: 2px;
    }

    .stat-val {
      font-size: 0.88em;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .stat-unit {
      font-size: 0.62em;
      opacity: 0.45;
      margin-left: 1px;
    }

    /* Grid import/export inline pair */
    .grid-pair {
      display: flex;
      align-items: baseline;
      gap: 6px;
      white-space: nowrap;
    }

    .grid-half {
      display: flex;
      align-items: baseline;
      gap: 2px;
    }

    .arrow {
      font-size: 0.72em;
      font-weight: 700;
      opacity: 0.7;
    }
  `;
dt([
  m({ attribute: !1 })
], L.prototype, "hass", 2);
dt([
  m({ attribute: !1 })
], L.prototype, "config", 2);
dt([
  m({ type: Boolean })
], L.prototype, "showTitle", 2);
L = dt([
  I("hec-card-header")
], L);
var js = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, P = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Bs(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && js(t, e, i), i;
};
const Is = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Vs = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, vt = 38, es = +(2 * Math.PI * vt).toFixed(4);
function ps(s, t, e) {
  if (s === null) return "—";
  const o = Math.abs(s);
  return t === "W" || t === "auto" && o < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let w = class extends $ {
  constructor() {
    super(...arguments), this.type = "home", this.label = "", this.colour = "", this.power = null, this.soc = null, this.unit = "auto", this.decimalPlaces = 1;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("hec-node-click", {
        detail: { nodeType: this.type },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    const s = Is[this.type] ?? Vs, t = this.colour || s.accent, e = this.soc !== null, o = e ? Math.max(0, Math.min(100, this.soc)) : 0, i = +(es * (1 - o / 100)).toFixed(4);
    return f`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${e ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${vt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${vt}"
            style="stroke-dasharray:${es};stroke-dashoffset:${i};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${s.gradStart} 0%,${s.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s.icon}></ha-icon>
          <span class="label" style="color:${t};">${this.label || this.type}</span>
          <span class="power">${ps(this.power, this.unit, this.decimalPlaces)}</span>
          ${e ? f`
            <span class="soc-pct">
              <ha-icon class="soc-icon" icon="mdi:battery"></ha-icon>
              ${this.soc.toFixed(0)}%
            </span>
          ` : u}
        </div>

      </div>
    `;
  }
};
w.styles = B`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Outer wrapper — uniform size for all nodes ── */
    .node-wrap {
      position: relative;
      width: 84px;
      height: 84px;
      flex-shrink: 0;
    }

    /* ── SOC progress ring (SVG overlay) ── */
    .soc-ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
    }
    .soc-ring.has-soc { opacity: 1; }

    .ring-track {
      fill: none;
      stroke: rgba(0, 0, 0, 0.10);
      stroke-width: 4;
    }

    .ring-progress {
      fill: none;
      stroke: #66bb6a;
      stroke-width: 4;
      stroke-linecap: round;
      /* start at 12 o'clock */
      transform: rotate(-90deg);
      transform-origin: 42px 42px;
      transition: stroke-dashoffset 0.6s ease;
    }

    /* ── Inner circle ── */
    .node {
      position: absolute;
      inset: 8px;           /* 84 − 2×8 = 68 px diameter */
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
      overflow: hidden;
      transition: box-shadow 0.15s ease, transform 0.1s ease;
    }
    .node:hover {
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
      transform: scale(1.05);
    }
    .node:active { transform: scale(1.00); }

    ha-icon { --mdc-icon-size: 22px; }

    .label {
      font-size: 0.58em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.65;
      white-space: nowrap;
    }

    .power {
      font-size: 0.78em;
      font-weight: 700;
      white-space: nowrap;
      color: #1a1a2e;
    }

    /* ── SOC text (only rendered when SOC is present) ── */
    .soc-pct {
      display: flex;
      align-items: center;
      gap: 1px;
      font-size: 0.55em;
      font-weight: 600;
      opacity: 0.72;
      white-space: nowrap;
    }

    .soc-icon { --mdc-icon-size: 11px; }
  `;
P([
  m()
], w.prototype, "type", 2);
P([
  m()
], w.prototype, "label", 2);
P([
  m()
], w.prototype, "colour", 2);
P([
  m({ type: Number })
], w.prototype, "power", 2);
P([
  m({ type: Number })
], w.prototype, "soc", 2);
P([
  m()
], w.prototype, "unit", 2);
P([
  m({ type: Number })
], w.prototype, "decimalPlaces", 2);
w = P([
  I("hec-energy-node")
], w);
function _t(s, t) {
  var i;
  if (!t) return null;
  const e = (i = s[t]) == null ? void 0 : i.state;
  if (!e || e === "unavailable" || e === "unknown") return null;
  const o = parseFloat(e);
  return isNaN(o) ? null : o;
}
function us(s, t, e) {
  const o = t.zero_tolerance ?? 0, i = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = _t(e, t.power_combined);
  else {
    const h = !!t.power_import, d = !!t.power_export;
    if (!h && !d) return i;
    const g = h ? _t(e, t.power_import) : null, p = d ? _t(e, t.power_export) : null;
    if ((!h || g === null) && (!d || p === null)) return i;
    n = (g ?? 0) - (p ?? 0);
  }
  if (n === null) return i;
  if (Math.abs(n) <= o) return { power: n, magnitude: null, direction: "idle" };
  const a = Math.abs(n);
  let l;
  switch (s) {
    case "solar":
      l = "to-home";
      break;
    case "grid":
      l = n > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      l = n > 0 ? "from-home" : "to-home";
      break;
    default:
      l = n > 0 ? "from-home" : "to-home";
  }
  return { power: n, magnitude: a, direction: l };
}
var Fs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, U = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Gs(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && Fs(t, e, i), i;
};
const Ws = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Ks = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Zs = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function qs(s) {
  const t = Date.now(), e = t - 864e5, o = Array(24).fill(null);
  if (!s.length) return o;
  for (let i = 0; i < 24; i++) {
    const n = e + i * 36e5, a = n + 36e5;
    let l = 0, h = 0;
    for (let d = 0; d < s.length; d++) {
      const g = new Date(s[d].last_changed).getTime(), p = d + 1 < s.length ? new Date(s[d + 1].last_changed).getTime() : t, y = Math.max(g, n), _ = Math.min(p, a);
      if (_ <= y) continue;
      const b = parseFloat(s[d].state);
      if (isNaN(b)) continue;
      const v = _ - y;
      l += Math.abs(b) * v, h += v;
    }
    h > 0 && (o[i] = l / h);
  }
  return o;
}
function gs(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : o;
}
function ss(s, t) {
  var i;
  const e = gs(s, t);
  return e === null ? null : ((i = s[t]) == null ? void 0 : i.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function is(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function Ys(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function os(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Js(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Qs(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let x = class extends $ {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(s) {
    super.updated(s), (s.has("open") || s.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var e, o;
    const s = (o = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : o[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!(!t || !this.hass)) {
      this._loading = !0, this._hourly = [];
      try {
        const i = /* @__PURE__ */ new Date(), a = `history/period/${new Date(i.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${i.toISOString()}`, l = await this.hass.callApi("GET", a);
        this._hourly = qs((l == null ? void 0 : l[0]) ?? []);
      } catch (i) {
        console.warn("[hec-node-detail] history fetch failed", i), this._hourly = [];
      } finally {
        this._loading = !1;
      }
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(s, t, e) {
    return f`
      <div class="d-header">
        <ha-icon .icon=${t} style="color:${s};--mdc-icon-size:22px;"></ha-icon>
        <span class="d-title">${e}</span>
        <button class="close-btn" @click=${this._close} aria-label="Close">
          <ha-icon icon="mdi:close" style="--mdc-icon-size:18px;"></ha-icon>
        </button>
      </div>
    `;
  }
  _sectionPower(s) {
    var i, n, a, l, h;
    const t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.unit) ?? "auto", o = ((h = Zs[this.nodeType]) == null ? void 0 : h[s.direction]) ?? "";
    return f`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${ps(s.power, e, t)}</div>
        ${o ? f`<div class="power-sub">${o}</div>` : u}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return u;
    const t = Qs(s);
    return f`
      <div class="section">
        <div class="s-title">State of charge</div>
        <div class="soc-row">
          <div class="soc-track">
            <div class="soc-fill" style="width:${s}%;background:${t};"></div>
          </div>
          <span class="soc-pct">${s.toFixed(0)}%</span>
        </div>
      </div>
    `;
  }
  _sectionDaily(s) {
    var a, l, h;
    const t = ((a = this.hass) == null ? void 0 : a.states) ?? {}, e = ((h = (l = this.config) == null ? void 0 : l.display) == null ? void 0 : h.decimal_places) ?? 1, o = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", i = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([o, is(ss(t, s.daily_usage), e)]), s.daily_export && n.push([i, is(ss(t, s.daily_export), e)]), n.length ? f`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, g]) => f`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${g}</span>
          </div>
        `)}
      </div>
    ` : u;
  }
  _sectionOctopus(s) {
    var b;
    const t = ((b = this.hass) == null ? void 0 : b.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, o = s.cost_entity ? t[s.cost_entity] : null, i = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, a = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", l = o == null ? void 0 : o.state, h = (o == null ? void 0 : o.attributes.unit_of_measurement) ?? "£", d = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], g = Date.now(), p = d.filter((v) => new Date(v.end ?? v.end_time ?? 0).getTime() > g).slice(0, 6), y = n && n !== "unavailable" && n !== "unknown", _ = l && l !== "unavailable" && l !== "unknown";
    return !y && !_ && !p.length ? u : f`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${y ? f`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${a}</span>
          </div>
        ` : u}

        ${_ ? f`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${h}${parseFloat(l).toFixed(2)}</span>
          </div>
        ` : u}

        ${p.length ? f`
          <div class="s-subtitle">Upcoming slots</div>
          ${p.map((v) => {
      const T = v.start ?? v.start_time ?? "", k = v.end ?? v.end_time ?? "", E = v.value_inc_vat ?? v.rate_inc_vat ?? v.value ?? 0, C = Js(E);
      return f`
              <div class="slot">
                <span class="slot-dot" style="background:${C};"></span>
                <span class="slot-time">${os(T)}–${os(k)}</span>
                <span class="slot-rate" style="color:${C};">${(+E).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : u}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, o = /* @__PURE__ */ new Date(), i = (n) => Ys(new Date(o.getTime() - n * 36e5));
    return this._loading ? f`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : f`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? f`<div class="chart-msg">No data</div>` : f`
              ${Q`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return Q``;
      const l = Math.max(2, n / e * 48);
      return Q`
                      <rect
                        x="${a * 10 + 0.5}" y="${52 - l}"
                        width="9" height="${l}" rx="2"
                        fill="${s}" opacity="0.82"
                      />
                    `;
    })}
                </svg>
              `}
              <div class="chart-labels">
                <span>${i(24)}</span>
                <span>${i(18)}</span>
                <span>${i(12)}</span>
                <span>${i(6)}</span>
                <span>Now</span>
              </div>
            `}
      </div>
    `;
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    var h, d, g;
    if (!this.open || !this.nodeType) return u;
    const s = ((d = (h = this.config) == null ? void 0 : h.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((g = this.hass) == null ? void 0 : g.states) ?? {}, e = s.colour || (Ks[this.nodeType] ?? "#9e9e9e"), o = Ws[this.nodeType] ?? "mdi:lightning-bolt", i = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = us(this.nodeType, s, t), a = ["battery", "ev"].includes(this.nodeType) && !!s.soc, l = a ? gs(t, s.soc) : null;
    return f`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, o, i)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(l) : u}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : u}
          ${this._sectionChart(e)}
        </div>
      </div>
    `;
  }
};
x.styles = B`
    :host { display: contents; }

    /* ── Overlay ── */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.42);
      z-index: 9999;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    /* ── Panel (bottom sheet) ── */
    .panel {
      background: var(--card-background-color, #fff);
      border-radius: 20px 20px 0 0;
      width: 100%;
      max-width: 480px;
      max-height: 86vh;
      overflow-y: auto;
      overscroll-behavior: contain;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.14);
      /* push content above the home indicator on iOS/Android */
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }

    /* ── Dialog header ── */
    .d-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 16px 12px;
      position: sticky;
      top: 0;
      background: var(--card-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      z-index: 1;
    }
    .d-title {
      flex: 1;
      font-size: 1em;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .close-btn:hover {
      background: var(--secondary-background-color, rgba(0,0,0,0.06));
    }

    /* ── Sections ── */
    .section {
      padding: 14px 16px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.07));
    }
    .section:last-child { border-bottom: none; padding-bottom: 40px; }

    .s-title {
      font-size: 0.63em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      opacity: 0.4;
      margin-bottom: 10px;
    }
    .s-subtitle {
      font-size: 0.63em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      opacity: 0.35;
      margin: 10px 0 6px;
    }

    /* ── Power ── */
    .power-big {
      font-size: 2.2em;
      font-weight: 700;
      line-height: 1;
      color: var(--primary-text-color);
    }
    .power-sub {
      font-size: 0.8em;
      margin-top: 5px;
      opacity: 0.55;
    }

    /* ── SOC ── */
    .soc-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .soc-track {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .soc-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    .soc-pct {
      font-size: 0.9em;
      font-weight: 600;
      width: 42px;
      text-align: right;
      flex-shrink: 0;
    }

    /* ── Key/value rows ── */
    .kv {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 0.9em;
      padding: 3px 0;
    }
    .kv-k { opacity: 0.55; }
    .kv-v { font-weight: 600; }

    /* ── Octopus slots ── */
    .slot {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 0;
      font-size: 0.85em;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.05));
    }
    .slot:first-of-type { border-top: none; }
    .slot-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .slot-time { flex: 1; opacity: 0.6; font-variant-numeric: tabular-nums; }
    .slot-rate { font-weight: 700; white-space: nowrap; }

    /* ── Chart ── */
    .chart-svg {
      width: 100%;
      display: block;
      height: 52px;
      margin-bottom: 4px;
    }
    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.6em;
      opacity: 0.4;
      font-variant-numeric: tabular-nums;
    }
    .chart-msg {
      font-size: 0.8em;
      opacity: 0.4;
      text-align: center;
      padding: 10px 0;
    }
  `;
U([
  m({ attribute: !1 })
], x.prototype, "hass", 2);
U([
  m({ attribute: !1 })
], x.prototype, "config", 2);
U([
  m()
], x.prototype, "nodeType", 2);
U([
  m({ type: Boolean })
], x.prototype, "open", 2);
U([
  xt()
], x.prototype, "_hourly", 2);
U([
  xt()
], x.prototype, "_loading", 2);
x = U([
  I("hec-node-detail")
], x);
const Xs = ["grid", "solar", "battery", "home", "ev"];
var ti = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, pt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ei(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && ti(t, e, i), i;
};
function si(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const ii = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, oi = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let j = class extends $ {
  constructor() {
    super(...arguments), this._dialogType = null;
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(s) {
    var t;
    return s in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(s) {
    var e, o, i;
    const t = ((o = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : o[s]) ?? {};
    return us(s, t, ((i = this.hass) == null ? void 0 : i.states) ?? {});
  }
  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  _isVisible(s) {
    var e, o;
    return !(!this._configured(s) || (((o = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : o[s]) ?? {}).show_zero === !1 && this._flowInfo(s).direction === "idle");
  }
  _soc(s) {
    var i, n, a, l;
    const t = (a = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[s]) == null ? void 0 : a.soc;
    if (!t || !this.hass) return null;
    const e = (l = this.hass.states[t]) == null ? void 0 : l.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const o = parseFloat(e);
    return isNaN(o) ? null : o;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var e, o, i, n;
    const s = ((o = (e = this.config) == null ? void 0 : e.display) == null ? void 0 : o.dynamic_animation_speed) ?? !1, t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.animation) !== !1;
    return Q`
      ${["solar", "grid", "battery", "ev"].filter((a) => this._isVisible(a)).map((a) => {
      const l = this._flowInfo(a), [h, d, g, p] = oi[a], y = l.direction === "idle", _ = l.direction === "from-home", b = si(l.magnitude, s && !y), v = [
        "flow-line",
        _ ? "reverse" : "",
        y ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Q`
            <line
              x1="${h}" y1="${d}" x2="${g}" y2="${p}"
              stroke="${ii[a]}"
              class="${v}"
              style="--flow-dur:${b}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var l, h, d;
    const o = s === "home" ? !0 : this._isVisible(s), i = ((h = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : h[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return f`
      <hec-energy-node
        class="${t}${o ? "" : " hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .colour=${i.colour ?? ""}
        .power=${a.power}
        .soc=${e ? this._soc(s) : null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var s;
    return Object.keys(((s = this.config) == null ? void 0 : s.entity_types) ?? {}).filter(
      (t) => !Xs.includes(t)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: B3→A3→C3→B4→A4→C4…  (col order: 2,1,3 per row)
   */
  _customSlot(s) {
    return [[2, 1, 3][s % 3], 3 + Math.floor(s / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(s, t, e) {
    var l, h, d;
    const o = this._isVisible(s), i = ((h = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : h[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return f`
      <hec-energy-node
        style="grid-column:${t}; grid-row:${e}"
        class="${o ? "" : "hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .colour=${i.colour ?? ""}
        .power=${a.power}
        .soc=${null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Dialog ────────────────────────────────────────────────────────────────
  _onNodeClick(s) {
    const t = s.detail;
    t != null && t.nodeType && (this._dialogType = t.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return u;
    const s = this._customTypes(), t = 2 + Math.ceil(s.length / 3);
    return f`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${t}" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : u}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : u}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${s.map((e, o) => {
      const [i, n] = this._customSlot(o);
      return this._customNode(e, i, n);
    })}
      </div>

      <hec-node-detail
        .hass=${this.hass}
        .config=${this.config}
        .nodeType=${this._dialogType ?? ""}
        .open=${this._dialogType !== null}
        @hec-close=${() => {
      this._dialogType = null;
    }}
      ></hec-node-detail>
    `;
  }
};
j.styles = B`
    :host { display: block; }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      position: relative;
      align-items: center;   /* vertically centre circles in each row */
      justify-items: center; /* horizontally centre circles in each column */
    }

    /* ── Standard slots ─────────────────────────────────────── */
    .slot-solar   { grid-column: 2; grid-row: 1; }  /* B1 */
    .slot-ev      { grid-column: 3; grid-row: 1; }  /* C1 */
    .slot-grid    { grid-column: 1; grid-row: 2; }  /* A2 */
    .slot-home    { grid-column: 2; grid-row: 2; }  /* B2 */
    .slot-battery { grid-column: 3; grid-row: 2; }  /* C2 */

    .hidden { visibility: hidden; pointer-events: none; }

    .svg-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: visible;
    }

    hec-energy-node { position: relative; z-index: 1; }

    @keyframes flow-fwd {
      from { stroke-dashoffset: 10; }
      to   { stroke-dashoffset:  0; }
    }
    @keyframes flow-rev {
      from { stroke-dashoffset: -10; }
      to   { stroke-dashoffset:   0; }
    }

    .flow-line {
      fill: none;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
      stroke-width: 2.5;
      stroke-dasharray: 5 4;
      animation: flow-fwd var(--flow-dur, 0.7s) linear infinite;
    }
    .flow-line.reverse { animation: flow-rev var(--flow-dur, 0.7s) linear infinite; }
    .flow-line.idle    { stroke-dasharray: none; animation: none; opacity: 0.15; }
    .flow-line.paused  { animation-play-state: paused; }
  `;
pt([
  m({ attribute: !1 })
], j.prototype, "hass", 2);
pt([
  m({ attribute: !1 })
], j.prototype, "config", 2);
pt([
  xt()
], j.prototype, "_dialogType", 2);
j = pt([
  I("hec-flow-layout")
], j);
var ni = Object.defineProperty, ai = Object.getOwnPropertyDescriptor, Ct = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ai(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && ni(t, e, i), i;
};
let it = class extends $ {
  setConfig(s) {
    this.config = s;
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? f`
      <ha-card>
        <hec-card-header
          .hass=${this.hass}
          .config=${this.config}
          .showTitle=${this.config.show_header !== !1}
        ></hec-card-header>
        <div class="card-body">
          <hec-flow-layout
            .hass=${this.hass}
            .config=${this.config}
          ></hec-flow-layout>
        </div>
      </ha-card>
    ` : u;
  }
};
it.styles = B`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ct([
  m({ attribute: !1 })
], it.prototype, "hass", 2);
Ct([
  m({ attribute: !1 })
], it.prototype, "config", 2);
it = Ct([
  I("home-energy-card")
], it);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  it as HomeEnergyCard
};
