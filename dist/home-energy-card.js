/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, qt = Nt.ShadowRoot && (Nt.ShadyCSS === void 0 || Nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zt = Symbol(), hs = /* @__PURE__ */ new WeakMap();
let Ls = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== Zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (qt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = hs.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && hs.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gs = (e) => new Ls(typeof e == "string" ? e : e + "", void 0, Zt), it = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new Ls(s, e, Zt);
}, Ks = (e, t) => {
  if (qt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Nt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, ds = qt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Gs(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ws, defineProperty: qs, getOwnPropertyDescriptor: Zs, getOwnPropertyNames: Ys, getOwnPropertySymbols: Js, getPrototypeOf: Xs } = Object, D = globalThis, ps = D.trustedTypes, Qs = ps ? ps.emptyScript : "", Ft = D.reactiveElementPolyfillSupport, pt = (e, t) => e, zt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Qs : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, Yt = (e, t) => !Ws(e, t), us = { attribute: !0, type: String, converter: zt, reflect: !1, useDefault: !1, hasChanged: Yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = us) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && qs(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: n } = Zs(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: o, set(a) {
      const r = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? us;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pt("elementProperties"))) return;
    const t = Xs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pt("properties"))) {
      const s = this.properties, i = [...Ys(s), ...Js(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) s.unshift(ds(o));
    } else t !== void 0 && s.push(ds(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ks(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    var n;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const a = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : zt).toAttribute(s, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, a;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? r.converter : zt;
      this._$Em = o;
      const d = l.fromAttribute(s, r.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, n) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? Yt)(n, s) || i.useDefault && i.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: n }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? s ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: r } = a, l = this[n];
        r !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, a, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(s)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Q.elementStyles = [], Q.shadowRootOptions = { mode: "open" }, Q[pt("elementProperties")] = /* @__PURE__ */ new Map(), Q[pt("finalized")] = /* @__PURE__ */ new Map(), Ft == null || Ft({ ReactiveElement: Q }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis, fs = (e) => e, Ut = ut.trustedTypes, gs = Ut ? Ut.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, zs = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, Us = "?" + R, ti = `<${Us}>`, W = document, ft = () => W.createComment(""), gt = (e) => e === null || typeof e != "object" && typeof e != "function", Jt = Array.isArray, ei = (e) => Jt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Bt = `[ 	
\f\r]`, lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ys = /-->/g, _s = />/g, B = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ms = /'/g, vs = /"/g, Hs = /^(?:script|style|textarea|title)$/i, Rs = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), v = Rs(1), tt = Rs(2), q = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), bs = /* @__PURE__ */ new WeakMap(), G = W.createTreeWalker(W, 129);
function Ds(e, t) {
  if (!Jt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gs !== void 0 ? gs.createHTML(t) : t;
}
const si = (e, t) => {
  const s = e.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = lt;
  for (let r = 0; r < s; r++) {
    const l = e[r];
    let d, u, p = -1, y = 0;
    for (; y < l.length && (a.lastIndex = y, u = a.exec(l), u !== null); ) y = a.lastIndex, a === lt ? u[1] === "!--" ? a = ys : u[1] !== void 0 ? a = _s : u[2] !== void 0 ? (Hs.test(u[2]) && (o = RegExp("</" + u[2], "g")), a = B) : u[3] !== void 0 && (a = B) : a === B ? u[0] === ">" ? (a = o ?? lt, p = -1) : u[1] === void 0 ? p = -2 : (p = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? B : u[3] === '"' ? vs : ms) : a === vs || a === ms ? a = B : a === ys || a === _s ? a = lt : (a = B, o = void 0);
    const g = a === B && e[r + 1].startsWith("/>") ? " " : "";
    n += a === lt ? l + ti : p >= 0 ? (i.push(d), l.slice(0, p) + zs + l.slice(p) + R + g) : l + R + (p === -2 ? r : g);
  }
  return [Ds(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class yt {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, u] = si(t, s);
    if (this.el = yt.createElement(d, i), G.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = G.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(zs)) {
          const y = u[a++], g = o.getAttribute(p).split(R), f = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? oi : f[1] === "?" ? ni : f[1] === "@" ? ai : Dt }), o.removeAttribute(p);
        } else p.startsWith(R) && (l.push({ type: 6, index: n }), o.removeAttribute(p));
        if (Hs.test(o.tagName)) {
          const p = o.textContent.split(R), y = p.length - 1;
          if (y > 0) {
            o.textContent = Ut ? Ut.emptyScript : "";
            for (let g = 0; g < y; g++) o.append(p[g], ft()), G.nextNode(), l.push({ type: 2, index: ++n });
            o.append(p[y], ft());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Us) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(R, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += R.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = W.createElement("template");
    return i.innerHTML = t, i;
  }
}
function st(e, t, s = e, i) {
  var a, r;
  if (t === q) return t;
  let o = i !== void 0 ? (a = s._$Co) == null ? void 0 : a[i] : s._$Cl;
  const n = gt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = st(e, o._$AS(e, t.values), o, i)), t;
}
class ii {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? W).importNode(s, !0);
    G.currentNode = o;
    let n = G.nextNode(), a = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new ot(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new ri(n, this, t)), this._$AV.push(d), l = i[++r];
      }
      a !== (l == null ? void 0 : l.index) && (n = G.nextNode(), a++);
    }
    return G.currentNode = W, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class ot {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = st(this, t, s), gt(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ei(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(W.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = yt.createElement(Ds(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(s);
    else {
      const a = new ii(o, this), r = a.u(this.options);
      a.p(s), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let s = bs.get(t.strings);
    return s === void 0 && bs.set(t.strings, s = new yt(t)), s;
  }
  k(t) {
    Jt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of t) o === s.length ? s.push(i = new ot(this.O(ft()), this.O(ft()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = fs(t).nextSibling;
      fs(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class Dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, n) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = _;
  }
  _$AI(t, s = this, i, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = st(this, t, s, 0), a = !gt(t) || t !== this._$AH && t !== q, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = st(this, r[i + l], s, l), d === q && (d = this._$AH[l]), a || (a = !gt(d) || d !== this._$AH[l]), d === _ ? t = _ : t !== _ && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class oi extends Dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class ni extends Dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class ai extends Dt {
  constructor(t, s, i, o, n) {
    super(t, s, i, o, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = st(this, t, s, 0) ?? _) === q) return;
    const i = this._$AH, o = t === _ && i !== _ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== _ && (i === _ || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ri {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    st(this, t);
  }
}
const ci = { I: ot }, jt = ut.litHtmlPolyfillSupport;
jt == null || jt(yt, ot), (ut.litHtmlVersions ?? (ut.litHtmlVersions = [])).push("3.3.2");
const li = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new ot(t.insertBefore(ft(), n), n, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis;
let U = class extends Q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = li(s, this.renderRoot, this.renderOptions);
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
    return q;
  }
};
var Ns;
U._$litElement$ = !0, U.finalized = !0, (Ns = K.litElementHydrateSupport) == null || Ns.call(K, { LitElement: U });
const Vt = K.litElementPolyfillSupport;
Vt == null || Vt({ LitElement: U });
(K.litElementVersions ?? (K.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hi = { attribute: !0, type: String, converter: zt, reflect: !1, hasChanged: Yt }, di = (e = hi, t, s) => {
  const { kind: i, metadata: o } = s;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: a } = s;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (i === "setter") {
    const { name: a } = s;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function $(e) {
  return (t, s) => typeof s == "object" ? di(e, t, s) : ((i, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function vt(e) {
  return $({ ...e, state: !0, attribute: !1 });
}
const Xt = (e) => e.attributes.device_class ?? "", Qt = (e) => e.attributes.unit_of_measurement ?? "", te = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function V(...e) {
  return (t, s) => {
    let i = 0;
    Xt(s) === "power" && (i += 4), ["W", "kW"].includes(Qt(s)) && (i += 2);
    const o = te(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function et(...e) {
  return (t, s) => {
    let i = 0;
    Xt(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(Qt(s)) && (i += 2);
    const o = te(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function ws(...e) {
  return (t, s) => {
    let i = 0;
    Xt(s) === "battery" && (i += 4), Qt(s) === "%" && (i += 2);
    const o = te(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function At(e, t = []) {
  return (s, i) => {
    const o = s.toLowerCase();
    if (t.some((a) => o.includes(a))) return 0;
    let n = 0;
    for (const a of e) o.includes(a) && (n += 4);
    return n;
  };
}
function C(e, t, s, i) {
  let o, n = 0;
  for (const a of e) {
    if (i.has(a)) continue;
    const r = t[a];
    if (!r) continue;
    const l = s(a, r);
    l > n && (n = l, o = a);
  }
  return o && i.add(o), o;
}
function pi(e, t, s) {
  const i = Object.values(t).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), o = Object.keys(e).filter((b) => b.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], r = {}, l = {}, d = C(
    n,
    e,
    At(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (r.rate_entity = d, a.push("rate"));
  const u = C(
    n,
    e,
    At(["_current_accumulative_cost"]),
    s
  );
  u && (r.cost_entity = u, a.push("cost"));
  const p = C(
    n,
    e,
    At(["_current_day_rates"]),
    s
  );
  p && (r.slots_entity = p, a.push("slots"));
  const y = C(
    o.filter((b) => b.startsWith("binary_sensor.")),
    e,
    At(["_intelligent_dispatching"]),
    s
  );
  y && (r.dispatches_entity = y, a.push("dispatching")), Object.keys(r).length && (l.octopus = r);
  const g = C(
    n,
    e,
    V("import", "demand", "current"),
    s
  );
  g && (l.power_import = g, a.push("import power"));
  const f = C(
    n,
    e,
    V("export", "demand", "current"),
    s
  );
  f && (l.power_export = f, a.push("export power"));
  const m = C(
    n,
    e,
    et("import", "accumulative", "consumption"),
    s
  );
  m && (l.daily_usage = m, a.push("daily import"));
  const w = C(
    n,
    e,
    et("export", "accumulative"),
    s
  );
  return w && (l.daily_export = w, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: a };
}
function ui(e, t, s) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), o = Object.keys(e).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(e).filter((f) => f.includes("powerwall") || f.includes("tesla")), a = n.filter((f) => f.includes("powerwall")), r = n.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (a.length > 0) {
    const f = {}, m = C(
      a,
      e,
      ws("battery", "soc", "charge", "percent"),
      s
    );
    m && (f.soc = m);
    const w = C(
      a,
      e,
      V("battery", "power", "charge", "discharge"),
      s
    );
    w && (f.power_combined = w);
    const b = C(
      a,
      e,
      et("battery", "today", "daily", "charged"),
      s
    );
    b && (f.daily_usage = b), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const u = C(
    n,
    e,
    V("solar"),
    s
  );
  if (u) {
    const f = { power_combined: u }, m = C(
      n,
      e,
      et("solar"),
      s
    );
    m && (f.daily_usage = m), d.solar = f, l.push("solar");
  }
  const p = C(
    n,
    e,
    V("load", "home", "house"),
    s
  );
  if (p) {
    const f = { power_combined: p }, m = C(
      n,
      e,
      et("load", "home", "house"),
      s
    );
    m && (f.daily_usage = m), d.home = f, l.push("home load");
  }
  const y = C(
    n,
    e,
    V("grid"),
    s
  );
  y && (d.grid = { power_combined: y }, l.push("grid"));
  const g = C(
    r,
    e,
    ws("battery", "battery_level", "soc", "charge"),
    s
  );
  if (g) {
    const f = { soc: g }, m = C(
      r,
      e,
      V("charg", "power"),
      s
    );
    m && (f.power_combined = m);
    const w = C(
      r,
      e,
      et("charg", "energy"),
      s
    );
    w && (f.daily_usage = w), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function fi(e) {
  var l, d;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = ui(s, i, o), a = pi(s, i, o), r = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (r.integration_type = "tesla", Object.assign(r.entity_types, n.entity_types), r.summary.push(...n.summary ?? [])), a) {
    if (r.integration_type !== "tesla" && (r.integration_type = "octopus"), (l = a.entity_types) != null && l.grid) {
      const u = a.entity_types.grid;
      r.entity_types.grid = {
        ...r.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (d = r.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    a.tariff_entity && (r.tariff_entity = a.tariff_entity), r.summary.push(...a.summary ?? []);
  }
  return r;
}
function gi(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = e.entity_types ?? {}, n = { ...o };
  for (const [a, r] of Object.entries(t.entity_types)) {
    const l = o[a] ?? {}, d = { ...l };
    for (const [u, p] of Object.entries(r))
      p !== void 0 && (s || !l[u]) && (d[u] = p);
    n[a] = d;
  }
  return i.entity_types = n, i;
}
const Ht = ["grid", "solar", "battery", "home", "ev"], yi = "custom_";
function $s(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function _i(e) {
  return `${yi}${e + 1}`;
}
function Lt(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([a]) => Ht.includes(a)
    )
  ), i = Object.entries(t).filter(([a]) => !Ht.includes(a)).sort(([a], [r]) => $s(a) - $s(r)).map(([, a]) => ({ ...a })), o = Array.isArray(e.custom_types) ? e.custom_types.map((a) => ({ ...a })) : i, n = {
    ...s
  };
  return o.forEach((a, r) => {
    n[_i(r)] = { ...a };
  }), {
    ...e,
    entity_types: n,
    custom_types: o
  };
}
var mi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, ee = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? vi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (i ? a(t, s, o) : a(o)) || o);
  return i && o && mi(t, s, o), o;
};
let _t = class extends U {
  setConfig(e) {
    this.config = Lt(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: Lt(e) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var t;
    const e = [...((t = this.config) == null ? void 0 : t.custom_types) ?? [], {}];
    this._dispatchConfig({
      ...this.config,
      custom_types: e
    });
  }
  _deleteCustomType(e) {
    var s;
    const t = [...((s = this.config) == null ? void 0 : s.custom_types) ?? []];
    t.splice(e, 1), this._dispatchConfig({
      ...this.config,
      custom_types: t
    });
  }
  _setCustomType(e, t) {
    var i;
    const s = [...((i = this.config) == null ? void 0 : i.custom_types) ?? []];
    s[e] = {
      ...s[e] ?? {},
      ...t
    }, this._dispatchConfig({
      ...this.config,
      custom_types: s
    });
  }
  render() {
    var e, t, s, i, o, n, a, r, l, d, u, p, y, g, f, m, w, b, A, x, k, T, S, P, O, L, z, F, at, $t, It, rt, ct, xt, Et, Ct, kt, J, X, St, ie, oe, ne, ae, re, ce, le, he, de, pe, ue, fe, ge, ye, _e, me, ve, be, we, $e, xe, Ee, Ce, ke, Se, Ae, Te, Pe, Me, Oe, Ne, Le, ze, Ue, He, Re, De, Ie, Fe, Be, je, Ve, Ge, Ke, We, qe, Ze, Ye, Je, Xe, Qe, ts, es, ss, is, os, ns, as, rs, cs;
    return this.config ? v`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: Lt(
            gi(this.config, fi(this.hass), !1)
          )
        },
        bubbles: !0,
        composed: !0
      })
    )}
          >
            Auto-detect
          </mwc-button>

          <ha-textfield
            label="Title"
            .value=${this.config.title ?? ""}
            @change=${(h) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            title: h.target.value || void 0
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
              @change=${(h) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header: h.target.checked
          }
        },
        bubbles: !0,
        composed: !0
      })
    )}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <span>Show Header Values</span>
            <ha-switch
              .checked=${this.config.show_header_values ?? !0}
              @change=${(h) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header_values: h.target.checked
          }
        },
        bubbles: !0,
        composed: !0
      })
    )}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Grid">
        <div class="section-body">
          <ha-selector
            label="Grid Import Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((t = (e = this.config.entity_types) == null ? void 0 : e.grid) == null ? void 0 : t.power_import) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  power_import: h.detail.value || void 0
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
            .value=${((i = (s = this.config.entity_types) == null ? void 0 : s.grid) == null ? void 0 : i.power_export) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  power_export: h.detail.value || void 0
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
            .value=${((n = (o = this.config.entity_types) == null ? void 0 : o.grid) == null ? void 0 : n.power_combined) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  power_combined: h.detail.value || void 0
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
            .value=${((r = (a = this.config.entity_types) == null ? void 0 : a.grid) == null ? void 0 : r.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  daily_usage: h.detail.value || void 0
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
            label="Export Current Rate"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((d = (l = this.config.entity_types) == null ? void 0 : l.grid) == null ? void 0 : d.export_rate) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  export_rate: h.detail.value || void 0
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
              .checked=${((p = (u = this.config.entity_types) == null ? void 0 : u.grid) == null ? void 0 : p.show_zero) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  show_zero: h.target.checked
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
            .value=${((g = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : g.zero_tolerance) != null ? String((m = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : m.zero_tolerance) : ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  zero_tolerance: h.target.value !== "" ? Number(h.target.value) : void 0
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((b = (w = this.config.entity_types) == null ? void 0 : w.grid) == null ? void 0 : b.show_label) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  show_label: h.target.checked
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
            label="Grid Label"
            .value=${((x = (A = this.config.entity_types) == null ? void 0 : A.grid) == null ? void 0 : x.label) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  label: h.target.value || void 0
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
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((T = (k = this.config.entity_types) == null ? void 0 : k.grid) == null ? void 0 : T.icon) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Grid Colour"
            .value=${((P = (S = this.config.entity_types) == null ? void 0 : S.grid) == null ? void 0 : P.colour) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.grid) ?? {},
                  colour: h.target.value || void 0
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
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Solar">
        <div class="section-body">
          <ha-selector
            label="Solar Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((L = (O = this.config.entity_types) == null ? void 0 : O.solar) == null ? void 0 : L.power_combined) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  power_combined: h.detail.value || void 0
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
            .value=${((F = (z = this.config.entity_types) == null ? void 0 : z.solar) == null ? void 0 : F.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  daily_usage: h.detail.value || void 0
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
              .checked=${(($t = (at = this.config.entity_types) == null ? void 0 : at.solar) == null ? void 0 : $t.show_zero) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  show_zero: h.target.checked
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
            .value=${((rt = (It = this.config.entity_types) == null ? void 0 : It.solar) == null ? void 0 : rt.zero_tolerance) != null ? String((xt = (ct = this.config.entity_types) == null ? void 0 : ct.solar) == null ? void 0 : xt.zero_tolerance) : ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  zero_tolerance: h.target.value !== "" ? Number(h.target.value) : void 0
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((Ct = (Et = this.config.entity_types) == null ? void 0 : Et.solar) == null ? void 0 : Ct.show_label) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  show_label: h.target.checked
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
            label="Solar Label"
            .value=${((J = (kt = this.config.entity_types) == null ? void 0 : kt.solar) == null ? void 0 : J.label) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  label: h.target.value || void 0
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
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((St = (X = this.config.entity_types) == null ? void 0 : X.solar) == null ? void 0 : St.icon) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Solar Colour"
            .value=${((oe = (ie = this.config.entity_types) == null ? void 0 : ie.solar) == null ? void 0 : oe.colour) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.solar) ?? {},
                  colour: h.target.value || void 0
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
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Battery">
        <div class="section-body">
          <ha-selector
            label="Battery State of Charge"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((ae = (ne = this.config.entity_types) == null ? void 0 : ne.battery) == null ? void 0 : ae.soc) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  soc: h.detail.value || void 0
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
            .value=${((ce = (re = this.config.entity_types) == null ? void 0 : re.battery) == null ? void 0 : ce.power_combined) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  power_combined: h.detail.value || void 0
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
            .value=${((he = (le = this.config.entity_types) == null ? void 0 : le.battery) == null ? void 0 : he.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  daily_usage: h.detail.value || void 0
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
              .checked=${((pe = (de = this.config.entity_types) == null ? void 0 : de.battery) == null ? void 0 : pe.show_zero) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  show_zero: h.target.checked
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
            .value=${((fe = (ue = this.config.entity_types) == null ? void 0 : ue.battery) == null ? void 0 : fe.zero_tolerance) != null ? String((ye = (ge = this.config.entity_types) == null ? void 0 : ge.battery) == null ? void 0 : ye.zero_tolerance) : ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  zero_tolerance: h.target.value !== "" ? Number(h.target.value) : void 0
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((me = (_e = this.config.entity_types) == null ? void 0 : _e.battery) == null ? void 0 : me.show_label) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  show_label: h.target.checked
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
            label="Battery Label"
            .value=${((be = (ve = this.config.entity_types) == null ? void 0 : ve.battery) == null ? void 0 : be.label) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  label: h.target.value || void 0
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
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${(($e = (we = this.config.entity_types) == null ? void 0 : we.battery) == null ? void 0 : $e.icon) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Battery Colour"
            .value=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.battery) == null ? void 0 : Ee.colour) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.battery) ?? {},
                  colour: h.target.value || void 0
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
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Home">
        <div class="section-body">
          <ha-selector
            label="Home Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((ke = (Ce = this.config.entity_types) == null ? void 0 : Ce.home) == null ? void 0 : ke.power_combined) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  power_combined: h.detail.value || void 0
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
            .value=${((Ae = (Se = this.config.entity_types) == null ? void 0 : Se.home) == null ? void 0 : Ae.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  daily_usage: h.detail.value || void 0
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
              .checked=${((Pe = (Te = this.config.entity_types) == null ? void 0 : Te.home) == null ? void 0 : Pe.show_zero) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  show_zero: h.target.checked
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
            .value=${((Oe = (Me = this.config.entity_types) == null ? void 0 : Me.home) == null ? void 0 : Oe.zero_tolerance) != null ? String((Le = (Ne = this.config.entity_types) == null ? void 0 : Ne.home) == null ? void 0 : Le.zero_tolerance) : ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  zero_tolerance: h.target.value !== "" ? Number(h.target.value) : void 0
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((Ue = (ze = this.config.entity_types) == null ? void 0 : ze.home) == null ? void 0 : Ue.show_label) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  show_label: h.target.checked
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
            label="Home Label"
            .value=${((Re = (He = this.config.entity_types) == null ? void 0 : He.home) == null ? void 0 : Re.label) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  label: h.target.value || void 0
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
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((Ie = (De = this.config.entity_types) == null ? void 0 : De.home) == null ? void 0 : Ie.icon) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Home Colour"
            .value=${((Be = (Fe = this.config.entity_types) == null ? void 0 : Fe.home) == null ? void 0 : Be.colour) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.home) ?? {},
                  colour: h.target.value || void 0
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
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="EV">
        <div class="section-body">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((Ve = (je = this.config.entity_types) == null ? void 0 : je.ev) == null ? void 0 : Ve.power_combined) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  power_combined: h.detail.value || void 0
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
            label="EV State of Charge"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((Ke = (Ge = this.config.entity_types) == null ? void 0 : Ge.ev) == null ? void 0 : Ke.soc) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  soc: h.detail.value || void 0
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
            .value=${((qe = (We = this.config.entity_types) == null ? void 0 : We.ev) == null ? void 0 : qe.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  daily_usage: h.detail.value || void 0
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
              .checked=${((Ye = (Ze = this.config.entity_types) == null ? void 0 : Ze.ev) == null ? void 0 : Ye.show_zero) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  show_zero: h.target.checked
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
            .value=${((Xe = (Je = this.config.entity_types) == null ? void 0 : Je.ev) == null ? void 0 : Xe.zero_tolerance) != null ? String((ts = (Qe = this.config.entity_types) == null ? void 0 : Qe.ev) == null ? void 0 : ts.zero_tolerance) : ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  zero_tolerance: h.target.value !== "" ? Number(h.target.value) : void 0
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((ss = (es = this.config.entity_types) == null ? void 0 : es.ev) == null ? void 0 : ss.show_label) ?? !0}
              @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  show_label: h.target.checked
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
            label="EV Label"
            .value=${((os = (is = this.config.entity_types) == null ? void 0 : is.ev) == null ? void 0 : os.label) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  label: h.target.value || void 0
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
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((as = (ns = this.config.entity_types) == null ? void 0 : ns.ev) == null ? void 0 : as.icon) ?? ""}
            @value-changed=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="EV Colour"
            .value=${((cs = (rs = this.config.entity_types) == null ? void 0 : rs.ev) == null ? void 0 : cs.colour) ?? ""}
            @change=${(h) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.ev) ?? {},
                  colour: h.target.value || void 0
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
        </div>
      </ha-expansion-panel>

      <button class="action-button primary" type="button" @click=${() => this._addCustomType()}>
        <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
        Add Custom Type
      </button>

      ${(this.config.custom_types ?? []).map((h, c) => {
      var ls;
      return v`
        <ha-expansion-panel header=${((ls = h.label) == null ? void 0 : ls.trim()) || `Custom ${c + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(c)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_import ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { power_import: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { power_export: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { power_combined: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { daily_usage: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { soc: E.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(E) => this._setCustomType(c, {
        show_zero: E.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(E) => this._setCustomType(c, {
        zero_tolerance: E.target.value !== "" ? Number(E.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(E) => this._setCustomType(c, {
        show_label: E.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(E) => this._setCustomType(c, {
        label: E.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(E) => this._setCustomType(c, {
        icon: E.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(E) => this._setCustomType(c, {
        colour: E.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : _;
  }
};
_t.styles = it`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ha-expansion-panel {
      --expansion-panel-content-padding: 0;
    }

    ha-textfield,
    ha-selector {
      display: block;
      width: 100%;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      min-height: 40px;
      padding: 0 16px;
      border-radius: 10px;
      border: 1px solid transparent;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: filter 0.15s ease, transform 0.1s ease;
      box-sizing: border-box;
    }

    .action-button:hover {
      filter: brightness(0.97);
    }

    .action-button:active {
      transform: translateY(1px);
    }

    .action-button.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
      box-shadow: var(
        --ha-card-box-shadow,
        0 2px 6px rgba(0, 0, 0, 0.16)
      );
    }

    .action-button.delete-button {
      color: var(--error-color);
      background: var(--card-background-color, #fff);
      border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
    }

    .action-icon {
      --mdc-icon-size: 18px;
    }

    .section-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px 0 4px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }
  `;
ee([
  $({ attribute: !1 })
], _t.prototype, "hass", 2);
ee([
  $({ attribute: !1 })
], _t.prototype, "config", 2);
_t = ee([
  nt("home-energy-card-editor")
], _t);
var bi = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, bt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? wi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (i ? a(t, s, o) : a(o)) || o);
  return i && o && bi(t, s, o), o;
};
function Tt(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function Pt(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function $i(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let Z = class extends U {
  constructor() {
    super(...arguments), this.showTitle = !0, this.showValues = !0;
  }
  render() {
    var b, A, x, k, T, S, P, O, L, z, F;
    if (!this.config) return _;
    const e = ((b = this.hass) == null ? void 0 : b.states) ?? {}, t = this.config.entity_types ?? {}, s = ((A = this.config.display) == null ? void 0 : A.decimal_places) ?? 1, i = this.config.tariff_entity ? (x = e[this.config.tariff_entity]) == null ? void 0 : x.state : null, o = i && i !== "unavailable" && i !== "unknown" ? $i(i) : null, n = Tt(e, (k = t.solar) == null ? void 0 : k.daily_usage), a = Tt(e, (T = t.home) == null ? void 0 : T.daily_usage), r = Tt(e, (S = t.grid) == null ? void 0 : S.daily_usage), l = Tt(e, (P = t.grid) == null ? void 0 : P.daily_export), d = !!((O = t.solar) != null && O.daily_usage), u = !!((L = t.home) != null && L.daily_usage), p = !!((z = t.grid) != null && z.daily_usage), y = !!((F = t.grid) != null && F.daily_export), g = p || y, f = d || u || g, m = this.showValues && f, w = this.showTitle || o;
    return !w && !m ? _ : v`
      <div class="header">

        ${w ? v`
          <div class="title-row">
            ${this.showTitle ? v`<span class="title">${this.config.title ?? "Home Energy"}</span>` : _}
            ${o ? v`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : _}
          </div>
        ` : _}

        ${m ? v`
          <div class="stats-row">

            ${d ? v`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${Pt(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : _}

            ${u ? v`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${Pt(a, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : _}

            ${g ? v`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? v`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${Pt(r, s)}</span>
                    </div>
                  ` : _}
                  ${y ? v`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${Pt(l, s)}</span>
                    </div>
                  ` : _}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : _}

          </div>
        ` : _}

      </div>
    `;
  }
};
Z.styles = it`
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
bt([
  $({ attribute: !1 })
], Z.prototype, "hass", 2);
bt([
  $({ attribute: !1 })
], Z.prototype, "config", 2);
bt([
  $({ type: Boolean })
], Z.prototype, "showTitle", 2);
bt([
  $({ type: Boolean })
], Z.prototype, "showValues", 2);
Z = bt([
  nt("hec-card-header")
], Z);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xi = { CHILD: 2 }, Ei = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ci = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this._$Ct = t, this._$AM = s, this._$Ci = i;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ki } = ci, xs = (e) => e, Es = () => document.createComment(""), ht = (e, t, s) => {
  var n;
  const i = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const a = i.insertBefore(Es(), o), r = i.insertBefore(Es(), o);
    s = new ki(a, r, e, e.options);
  } else {
    const a = s._$AB.nextSibling, r = s._$AM, l = r !== e;
    if (l) {
      let d;
      (n = s._$AQ) == null || n.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== r._$AU && s._$AP(d);
    }
    if (a !== o || l) {
      let d = s._$AA;
      for (; d !== a; ) {
        const u = xs(d).nextSibling;
        xs(i).insertBefore(d, o), d = u;
      }
    }
  }
  return s;
}, j = (e, t, s = e) => (e._$AI(t, s), e), Si = {}, Ai = (e, t = Si) => e._$AH = t, Ti = (e) => e._$AH, Gt = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cs = (e, t, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = t; o <= s; o++) i.set(e[o], o);
  return i;
}, ks = Ei(class extends Ci {
  constructor(e) {
    if (super(e), e.type !== xi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, s) {
    let i;
    s === void 0 ? s = t : t !== void 0 && (i = t);
    const o = [], n = [];
    let a = 0;
    for (const r of e) o[a] = i ? i(r, a) : a, n[a] = s(r, a), a++;
    return { values: n, keys: o };
  }
  render(e, t, s) {
    return this.dt(e, t, s).values;
  }
  update(e, [t, s, i]) {
    const o = Ti(e), { values: n, keys: a } = this.dt(t, s, i);
    if (!Array.isArray(o)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), l = [];
    let d, u, p = 0, y = o.length - 1, g = 0, f = n.length - 1;
    for (; p <= y && g <= f; ) if (o[p] === null) p++;
    else if (o[y] === null) y--;
    else if (r[p] === a[g]) l[g] = j(o[p], n[g]), p++, g++;
    else if (r[y] === a[f]) l[f] = j(o[y], n[f]), y--, f--;
    else if (r[p] === a[f]) l[f] = j(o[p], n[f]), ht(e, l[f + 1], o[p]), p++, f--;
    else if (r[y] === a[g]) l[g] = j(o[y], n[g]), ht(e, o[p], o[y]), y--, g++;
    else if (d === void 0 && (d = Cs(a, g, f), u = Cs(r, p, y)), d.has(r[p])) if (d.has(r[y])) {
      const m = u.get(a[g]), w = m !== void 0 ? o[m] : null;
      if (w === null) {
        const b = ht(e, o[p]);
        j(b, n[g]), l[g] = b;
      } else l[g] = j(w, n[g]), ht(e, o[p], w), o[m] = null;
      g++;
    } else Gt(o[y]), y--;
    else Gt(o[p]), p++;
    for (; g <= f; ) {
      const m = ht(e, l[f + 1]);
      j(m, n[g]), l[g++] = m;
    }
    for (; p <= y; ) {
      const m = o[p++];
      m !== null && Gt(m);
    }
    return this.ut = a, Ai(e, l), q;
  }
});
var Pi = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, N = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Mi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (i ? a(t, s, o) : a(o)) || o);
  return i && o && Pi(t, s, o), o;
};
const Oi = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Ni = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, Wt = 38, Ss = +(2 * Math.PI * Wt).toFixed(4);
function Is(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
function As(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
let M = class extends U {
  constructor() {
    super(...arguments), this.type = "home", this.label = "", this.showLabel = !0, this.icon = "", this.bottomText = "", this.colour = "", this.power = null, this.soc = null, this.unit = "auto", this.decimalPlaces = 1;
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
    const e = Oi[this.type] ?? Ni, t = this.colour || e.accent, s = this.icon || e.icon, i = this.soc !== null, o = this.type === "grid" || this.type === "battery", n = o && this.power !== null ? Math.abs(this.power) : this.power, a = o && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : "", r = i ? Math.max(0, Math.min(100, this.soc)) : 0, l = +(Ss * (1 - r / 100)).toFixed(4);
    return v`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${i ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${Wt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${Wt}"
            style="stroke-dasharray:${Ss};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${e.gradStart} 0%,${e.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s}></ha-icon>
          ${this.showLabel ? v`<span class="label" style="color:${t};">${this.label || this.type}</span>` : _}
          <span class="power">${Is(n, this.unit, this.decimalPlaces)}</span>
          ${a ? v`<ha-icon class="direction-icon" .icon=${a}></ha-icon>` : this.bottomText ? v`<span class="bottom-text">${this.bottomText}</span>` : _}
        </div>

      </div>
    `;
  }
};
M.styles = it`
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

    .direction-icon {
      --mdc-icon-size: 16px;
      display: block;
      line-height: 1;
      opacity: 0.72;
      margin-top: -3px;
      margin-bottom: 0;
    }

    .bottom-text {
      font-size: 0.52em;
      line-height: 1;
      font-weight: 600;
      color: #1a1a2e;
      opacity: 0.72;
      margin-top: -1px;
      white-space: nowrap;
    }

    /* ── SOC text (only rendered when SOC is present) ── */
  `;
N([
  $()
], M.prototype, "type", 2);
N([
  $()
], M.prototype, "label", 2);
N([
  $({ type: Boolean })
], M.prototype, "showLabel", 2);
N([
  $()
], M.prototype, "icon", 2);
N([
  $()
], M.prototype, "bottomText", 2);
N([
  $()
], M.prototype, "colour", 2);
N([
  $({ type: Number })
], M.prototype, "power", 2);
N([
  $({ type: Number })
], M.prototype, "soc", 2);
N([
  $()
], M.prototype, "unit", 2);
N([
  $({ type: Number })
], M.prototype, "decimalPlaces", 2);
M = N([
  nt("hec-energy-node")
], M);
function Fs(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function Kt(e, t) {
  var o;
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : Fs(
    i,
    (o = s.attributes) == null ? void 0 : o.unit_of_measurement
  );
}
function Bs(e, t, s) {
  const i = t.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = Kt(s, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return o;
    const u = l ? Kt(s, t.power_import) : null, p = d ? Kt(s, t.power_export) : null;
    if ((!l || u === null) && (!d || p === null)) return o;
    n = (u ?? 0) - (p ?? 0);
  }
  if (n === null) return o;
  if (Math.abs(n) <= i) return { power: n, magnitude: null, direction: "idle" };
  const a = Math.abs(n);
  let r;
  switch (e) {
    case "solar":
      r = "to-home";
      break;
    case "grid":
      r = n > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      r = n > 0 ? "from-home" : "to-home";
      break;
    default:
      r = n > 0 ? "from-home" : "to-home";
  }
  return { power: n, magnitude: a, direction: r };
}
var Li = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, I = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? zi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (i ? a(t, s, o) : a(o)) || o);
  return i && o && Li(t, s, o), o;
};
const Ui = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Hi = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Ri = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Di(e, t) {
  const s = Date.now(), i = s - 864e5, o = Array(24).fill(null);
  if (!e.length) return o;
  for (let n = 0; n < 24; n++) {
    const a = i + n * 36e5, r = a + 36e5;
    let l = 0, d = 0;
    for (let u = 0; u < e.length; u++) {
      const p = new Date(e[u].last_changed).getTime(), y = u + 1 < e.length ? new Date(e[u + 1].last_changed).getTime() : s, g = Math.max(p, a), f = Math.min(y, r);
      if (f <= g) continue;
      const m = parseFloat(e[u].state);
      if (isNaN(m)) continue;
      const w = Fs(m, t), b = f - g;
      l += Math.abs(w) * b, d += b;
    }
    d > 0 && (o[n] = l / d);
  }
  return o;
}
function js(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function Mt(e, t) {
  var o;
  const s = js(e, t);
  return s === null ? null : ((o = e[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? s / 1e3 : s;
}
function Ot(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function Ii(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  if (isNaN(i)) return null;
  const o = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return o.includes("pence") || o.startsWith("p/") || o === "p" ? i / 100 : i;
}
function dt(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function Rt(e, t) {
  const s = typeof e == "number" ? e : parseFloat(String(e));
  if (isNaN(s)) return null;
  const i = String(t ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? s / 100 : (i.includes("gbp") || i.includes("£"), s);
}
function Ts(e) {
  if (!e) return [];
  const t = e.attributes.unit_of_measurement;
  return (e.attributes.rates ?? e.attributes.current_day_rates ?? e.attributes.today_rates ?? e.attributes.upcoming_interval_rates ?? []).map((i) => {
    const o = new Date(i.start ?? i.start_time ?? "").getTime(), n = new Date(i.end ?? i.end_time ?? "").getTime(), a = Rt(
      i.value_inc_vat ?? i.rate_inc_vat ?? i.value ?? i.rate,
      i.unit_of_measurement ?? t
    );
    return !Number.isFinite(o) || !Number.isFinite(n) || !a ? null : { startMs: o, endMs: n, rateGbpPerKwh: a };
  }).filter((i) => i !== null).sort((i, o) => i.startMs - o.startMs);
}
function Ps(e, t, s) {
  if (!e.length) return [];
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const n = new Date(e[o].last_changed).getTime(), a = o + 1 < e.length ? new Date(e[o + 1].last_changed).getTime() : s, r = Rt(e[o].state, t);
    !Number.isFinite(n) || !Number.isFinite(a) || a <= n || r !== null && i.push({ startMs: n, endMs: a, rateGbpPerKwh: r });
  }
  return i;
}
function Fi(e, t) {
  const s = t == null ? void 0 : t.attributes.unit_of_measurement, i = e.map((o) => Rt(o.state, s)).filter((o) => o !== null);
  if (i.length > 0) {
    const o = i[0];
    return i.every((n) => Math.abs(n - o) < 1e-9) ? o : null;
  }
  return t ? Rt(t.state, s) : null;
}
function Vs(e, t) {
  return String(t ?? "").trim().toLowerCase() === "wh" ? e / 1e3 : e;
}
function Ms(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  let i = 0, o = !1;
  for (let n = 1; n < e.length; n++) {
    const a = new Date(e[n - 1].last_changed).getTime(), r = new Date(e[n].last_changed).getTime();
    if (!Number.isFinite(a) || !Number.isFinite(r) || r <= a) continue;
    const l = parseFloat(e[n - 1].state), d = parseFloat(e[n].state);
    if (isNaN(l) || isNaN(d)) continue;
    const u = Vs(d - l, t);
    if (u <= 0) continue;
    const p = r - a;
    let y = 0, g = 0;
    for (const f of s) {
      const m = Math.max(a, f.startMs), w = Math.min(r, f.endMs);
      if (w <= m) continue;
      const b = w - m;
      g += b, y += f.rateGbpPerKwh * b;
    }
    if (g > 0)
      o = !0, i += u * (y / g);
    else if (p > 0)
      return null;
  }
  return o ? i : null;
}
function Bi(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  const i = Array.from(
    new Set(s.map((p) => Number(p.rateGbpPerKwh.toFixed(6))))
  ).sort((p, y) => p - y);
  if (i.length < 2 || i.length > 2) return null;
  const o = i[0], n = i[i.length - 1];
  let a = 0, r = 0, l = 0, d = 0, u = !1;
  for (let p = 1; p < e.length; p++) {
    const y = new Date(e[p - 1].last_changed).getTime(), g = new Date(e[p].last_changed).getTime();
    if (!Number.isFinite(y) || !Number.isFinite(g) || g <= y) continue;
    const f = parseFloat(e[p - 1].state), m = parseFloat(e[p].state);
    if (isNaN(f) || isNaN(m)) continue;
    const w = Vs(m - f, t);
    if (w <= 0) continue;
    let b = 0, A = 0;
    for (const S of s) {
      const P = Math.max(y, S.startMs), O = Math.min(g, S.endMs);
      if (O <= P) continue;
      const L = O - P, z = Number(S.rateGbpPerKwh.toFixed(6));
      z === n && (b += L), z === o && (A += L);
    }
    const x = b + A;
    if (x <= 0) continue;
    u = !0;
    const k = w * (b / x), T = w * (A / x);
    a += k, r += T, l += k * n, d += T * o;
  }
  return u ? { peakUsageKwh: a, offPeakUsageKwh: r, peakCostGbp: l, offPeakCostGbp: d } : null;
}
function ji(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function Os(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Vi(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function Gi(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
let H = class extends U {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1, this._gridMoney = null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && (this._loadHistory(), this.nodeType === "grid" ? this._loadGridMoney() : this._gridMoney = null);
  }
  async _loadHistory() {
    var i, o, n, a;
    const e = (o = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : o[this.nodeType], t = (e == null ? void 0 : e.power_combined) ?? (e == null ? void 0 : e.power_import) ?? (e == null ? void 0 : e.power_export);
    if (!t || !this.hass) return;
    const s = (a = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : a.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const r = /* @__PURE__ */ new Date(), d = `history/period/${new Date(r.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${r.toISOString()}`, u = await this.hass.callApi("GET", d);
      this._hourly = Di((u == null ? void 0 : u[0]) ?? [], s);
    } catch (r) {
      console.warn("[hec-node-detail] history fetch failed", r), this._hourly = [];
    } finally {
      this._loading = !1;
    }
  }
  async _loadGridMoney() {
    var l, d, u, p, y, g, f, m, w, b, A, x;
    const e = (d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d.grid, t = e == null ? void 0 : e.octopus;
    if (!this.hass || !e || !t) {
      this._gridMoney = null;
      return;
    }
    const s = Ts(
      t.slots_entity ? (u = this.hass.states) == null ? void 0 : u[t.slots_entity] : void 0
    ), i = e.export_rate ? (p = this.hass.states) == null ? void 0 : p[e.export_rate] : void 0, o = Ts(
      i
    ), n = /* @__PURE__ */ new Date();
    n.setHours(0, 0, 0, 0);
    const a = /* @__PURE__ */ new Date(), r = async (k) => {
      if (!k || !this.hass) return [];
      const T = `history/period/${n.toISOString()}?filter_entity_id=${k}&minimal_response=true&no_attributes=true&end_time=${a.toISOString()}`, S = await this.hass.callApi("GET", T);
      return (S == null ? void 0 : S[0]) ?? [];
    };
    try {
      const [k, T, S, P] = await Promise.all([
        r(e.daily_usage),
        r(e.daily_export),
        r(t.rate_entity),
        r(e.export_rate)
      ]), O = e.daily_usage ? (g = (y = this.hass.states) == null ? void 0 : y[e.daily_usage]) == null ? void 0 : g.attributes.unit_of_measurement : void 0, L = e.daily_export ? (m = (f = this.hass.states) == null ? void 0 : f[e.daily_export]) == null ? void 0 : m.attributes.unit_of_measurement : void 0, z = t.rate_entity ? (b = (w = this.hass.states) == null ? void 0 : w[t.rate_entity]) == null ? void 0 : b.attributes.unit_of_measurement : void 0, F = e.export_rate ? (x = (A = this.hass.states) == null ? void 0 : A[e.export_rate]) == null ? void 0 : x.attributes.unit_of_measurement : void 0, at = s.length ? s : Ps(S, z, a.getTime()), $t = o.length ? o : Ps(P, F, a.getTime()), It = Mt(this.hass.states, e.daily_usage), rt = Mt(this.hass.states, e.daily_export), ct = Fi(P, i), xt = Ms(
        k,
        O,
        at
      ), Et = Bi(
        k,
        O,
        at
      ), Ct = Ms(
        T,
        L,
        $t
      ), kt = Ii(this.hass.states, t.cost_entity), J = xt ?? kt, X = Ct ?? (rt !== null && ct !== null ? rt * ct : null), St = J !== null && X !== null ? J - X : null;
      this._gridMoney = {
        importCostToday: J,
        exportPaymentToday: X,
        netCost: St,
        peakOffPeak: Et
      };
    } catch (k) {
      console.warn("[hec-node-detail] grid money load failed", k), this._gridMoney = null;
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(e, t, s) {
    return v`
      <div class="d-header">
        <ha-icon .icon=${t} style="color:${e};--mdc-icon-size:22px;"></ha-icon>
        <span class="d-title">${s}</span>
        <button class="close-btn" @click=${this._close} aria-label="Close">
          <ha-icon icon="mdi:close" style="--mdc-icon-size:18px;"></ha-icon>
        </button>
      </div>
    `;
  }
  _sectionPower(e) {
    var o, n, a, r, l;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, s = ((r = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : r.unit) ?? "auto", i = ((l = Ri[this.nodeType]) == null ? void 0 : l[e.direction]) ?? "";
    return v`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Is(e.power, s, t)}</div>
        ${i ? v`<div class="power-sub">${i}</div>` : _}
      </div>
    `;
  }
  _sectionSoc(e) {
    if (e === null) return _;
    const t = Gi(e);
    return v`
      <div class="section">
        <div class="s-title">State of charge</div>
        <div class="soc-row">
          <div class="soc-track">
            <div class="soc-fill" style="width:${e}%;background:${t};"></div>
          </div>
          <span class="soc-pct">${e.toFixed(0)}%</span>
        </div>
      </div>
    `;
  }
  _sectionDaily(e) {
    var a, r, l;
    const t = ((a = this.hass) == null ? void 0 : a.states) ?? {}, s = ((l = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return e.daily_usage && n.push([i, Ot(Mt(t, e.daily_usage), s)]), e.daily_export && n.push([o, Ot(Mt(t, e.daily_export), s)]), n.length ? v`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, u]) => v`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : _;
  }
  _sectionOctopus(e) {
    var f, m, w, b, A;
    const t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.slots_entity ? t[e.slots_entity] : null, o = s == null ? void 0 : s.state, n = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", a = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], r = Date.now(), l = a.filter((x) => new Date(x.end ?? x.end_time ?? 0).getTime() > r).slice(0, 6), d = o && o !== "unavailable" && o !== "unknown", u = ((m = this._gridMoney) == null ? void 0 : m.importCostToday) ?? null, p = ((w = this._gridMoney) == null ? void 0 : w.exportPaymentToday) ?? null, y = ((b = this._gridMoney) == null ? void 0 : b.netCost) ?? null, g = ((A = this._gridMoney) == null ? void 0 : A.peakOffPeak) ?? null;
    return !d && !l.length && u === null && p === null && y === null && g === null ? _ : v`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${d ? v`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(o).toFixed(2)} ${n}</span>
          </div>
        ` : _}

        <div class="kv">
          <span class="kv-k">Import Cost Today</span>
          <span class="kv-v">${dt(u)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${dt(p)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${dt(y)}</span>
        </div>

        ${this._sectionPeakOffPeak(g)}

        ${l.length ? v`
          <div class="s-subtitle">Upcoming slots</div>
          ${l.map((x) => {
      const k = x.start ?? x.start_time ?? "", T = x.end ?? x.end_time ?? "", S = x.value_inc_vat ?? x.rate_inc_vat ?? x.value ?? 0, P = Vi(S);
      return v`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${Os(k)}–${Os(T)}</span>
                <span class="slot-rate" style="color:${P};">${(+S).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : _}
      </div>
    `;
  }
  _sectionPeakOffPeak(e) {
    var l, d, u, p;
    if (!e)
      return v`
        <div class="s-subtitle">Peak vs Off Peak</div>
        <div class="chart-msg">No interval tariff data</div>
      `;
    const t = e.peakUsageKwh + e.offPeakUsageKwh;
    if (t <= 0)
      return v`
        <div class="s-subtitle">Peak vs Off Peak</div>
        <div class="chart-msg">No import data</div>
      `;
    const s = e.peakUsageKwh / t, i = s * Math.PI * 2, o = 20 + 18 * Math.sin(i), n = 20 - 18 * Math.cos(i), a = s > 0.5 ? 1 : 0, r = s >= 0.999 ? "M20 2 A18 18 0 1 1 19.99 2 Z" : s <= 1e-3 ? "" : `M20 20 L20 2 A18 18 0 ${a} 1 ${o.toFixed(3)} ${n.toFixed(3)} Z`;
    return v`
      <div class="s-subtitle">Peak vs Off Peak</div>
      <div class="peak-row">
        <svg class="peak-pie" viewBox="0 0 40 40" aria-label="Peak vs Off Peak usage split">
          <circle cx="20" cy="20" r="18" fill="#e8f5e9"></circle>
          ${r ? tt`<path d="${r}" fill="#ef5350"></path>` : _}
          <circle cx="20" cy="20" r="9" fill="white"></circle>
        </svg>

        <div class="peak-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background:#ef5350;"></span>
            <span class="legend-label">Peak ${(s * 100).toFixed(0)}%</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background:#66bb6a;"></span>
            <span class="legend-label">Off Peak ${((1 - s) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Usage</span>
        <span class="kv-v">${Ot(e.peakUsageKwh, ((d = (l = this.config) == null ? void 0 : l.display) == null ? void 0 : d.decimal_places) ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Usage</span>
        <span class="kv-v">${Ot(e.offPeakUsageKwh, ((p = (u = this.config) == null ? void 0 : u.display) == null ? void 0 : p.decimal_places) ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Cost</span>
        <span class="kv-v">${dt(e.peakCostGbp)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Cost</span>
        <span class="kv-v">${dt(e.offPeakCostGbp)}</span>
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((n) => n !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => ji(new Date(i.getTime() - n * 36e5));
    return this._loading ? v`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : v`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? v`<div class="chart-msg">No data</div>` : v`
              ${tt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return tt``;
      const r = Math.max(2, n / s * 48);
      return tt`
                      <rect
                        x="${a * 10 + 0.5}" y="${52 - r}"
                        width="9" height="${r}" rx="2"
                        fill="${e}" opacity="0.82"
                      />
                    `;
    })}
                </svg>
              `}
              <div class="chart-labels">
                <span>${o(24)}</span>
                <span>${o(18)}</span>
                <span>${o(12)}</span>
                <span>${o(6)}</span>
                <span>Now</span>
              </div>
            `}
      </div>
    `;
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    var l, d, u;
    if (!this.open || !this.nodeType) return _;
    const e = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, s = e.colour || (Hi[this.nodeType] ?? "#9e9e9e"), i = e.icon || Ui[this.nodeType] || "mdi:lightning-bolt", o = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = Bs(this.nodeType, e, t), a = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !Ht.includes(this.nodeType)), r = a ? js(t, e.soc) : null;
    return v`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, i, o)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(r) : _}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : _}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
H.styles = it`
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

    .peak-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 6px 0 10px;
    }
    .peak-pie {
      width: 72px;
      height: 72px;
      flex-shrink: 0;
    }
    .peak-legend {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .legend-label {
      font-size: 0.82em;
      font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap;
    }

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
I([
  $({ attribute: !1 })
], H.prototype, "hass", 2);
I([
  $({ attribute: !1 })
], H.prototype, "config", 2);
I([
  $()
], H.prototype, "nodeType", 2);
I([
  $({ type: Boolean })
], H.prototype, "open", 2);
I([
  vt()
], H.prototype, "_hourly", 2);
I([
  vt()
], H.prototype, "_loading", 2);
I([
  vt()
], H.prototype, "_gridMoney", 2);
H = I([
  nt("hec-node-detail")
], H);
var Ki = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, wt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Wi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (i ? a(t, s, o) : a(o)) || o);
  return i && o && Ki(t, s, o), o;
};
function qi(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const Zi = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let Y = class extends U {
  constructor() {
    super(...arguments), this._dialogType = null, this._lineLayout = {
      width: 0,
      height: 0,
      centers: {}
    }, this._measureFrame = null, this._lineVisualState = {}, this._flowSamples = {}, this._smoothedMagnitudes = {}, this._speedInterval = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => this._scheduleMeasureLineLayout()), this._speedInterval = window.setInterval(() => {
      this._refreshSmoothedMagnitudes() && (this._updateLineVisualState(), this.requestUpdate());
    }, 1e4);
  }
  disconnectedCallback() {
    var e;
    (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = void 0, this._measureFrame !== null && cancelAnimationFrame(this._measureFrame), this._measureFrame = null, this._speedInterval !== null && window.clearInterval(this._speedInterval), this._speedInterval = null, super.disconnectedCallback();
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".grid");
    e && this._resizeObserver && this._resizeObserver.observe(e), this._scheduleMeasureLineLayout();
  }
  willUpdate(e) {
    (e.has("hass") || e.has("config")) && (this._recordFlowSamples(), Object.keys(this._smoothedMagnitudes).length || this._refreshSmoothedMagnitudes(), this._updateLineVisualState());
  }
  updated(e) {
    e.has("config") && this._scheduleMeasureLineLayout();
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(e) {
    var t;
    return e in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(e) {
    var s, i, o;
    const t = ((i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) ?? {};
    return Bs(e, t, ((o = this.hass) == null ? void 0 : o.states) ?? {});
  }
  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  _isVisible(e) {
    var s, i;
    return !(!this._configured(e) || (((i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) ?? {}).show_zero === !1 && this._flowInfo(e).direction === "idle");
  }
  _soc(e) {
    var o, n, a, r;
    const t = (a = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[e]) == null ? void 0 : a.soc;
    if (!t || !this.hass) return null;
    const s = (r = this.hass.states[t]) == null ? void 0 : r.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const i = parseFloat(s);
    return isNaN(i) ? null : i;
  }
  _dailyKwh(e) {
    var n, a, r;
    const t = (r = (a = (n = this.config) == null ? void 0 : n.entity_types) == null ? void 0 : a[e]) == null ? void 0 : r.daily_usage;
    if (!t || !this.hass) return null;
    const s = this.hass.states[t];
    if (!s || s.state === "unavailable" || s.state === "unknown") return null;
    const i = parseFloat(s.state);
    return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _scheduleMeasureLineLayout() {
    this._measureFrame === null && (this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = null, this._measureLineLayout();
    }));
  }
  _measureLineLayout() {
    const e = this.renderRoot.querySelector(".grid");
    if (!e) return;
    const t = e.getBoundingClientRect();
    if (!t.width || !t.height) return;
    const s = {}, i = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const a of i) {
      if (a.classList.contains("hidden")) continue;
      const r = a.dataset.nodeType;
      if (!r) continue;
      const l = a.getBoundingClientRect();
      s[r] = {
        x: l.left - t.left + l.width / 2,
        y: l.top - t.top + l.height / 2
      };
    }
    const o = {
      width: t.width,
      height: t.height,
      centers: s
    };
    this._lineLayout.width === o.width && this._lineLayout.height === o.height && JSON.stringify(this._lineLayout.centers) === JSON.stringify(o.centers) || (this._lineLayout = o);
  }
  _lineTypes() {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ].filter((e) => this._isVisible(e));
  }
  _sampleTypes() {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ];
  }
  _pruneFlowSamples(e, t) {
    const s = this._flowSamples[e] ?? [];
    this._flowSamples[e] = s.filter((i) => t - i.timestamp <= 1e4);
  }
  _recordFlowSamples() {
    const e = Date.now();
    for (const t of this._sampleTypes()) {
      const s = this._flowInfo(t), i = this._flowSamples[t] ?? [];
      i.push({
        timestamp: e,
        magnitude: s.magnitude
      }), this._flowSamples[t] = i, this._pruneFlowSamples(t, e);
    }
  }
  _refreshSmoothedMagnitudes() {
    const e = Date.now();
    let t = !1;
    for (const s of this._sampleTypes()) {
      this._pruneFlowSamples(s, e);
      const o = (this._flowSamples[s] ?? []).map((a) => a.magnitude).filter((a) => a !== null), n = o.length > 0 ? o.reduce((a, r) => a + Math.abs(r), 0) / o.length : null;
      this._smoothedMagnitudes[s] !== n && (this._smoothedMagnitudes[s] = n, t = !0);
    }
    return t;
  }
  _computeLineVisualState(e) {
    var n, a, r, l, d, u, p;
    const t = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.dynamic_animation_speed) ?? !1, s = ((l = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : l.animation) !== !1, i = this._flowInfo(e), o = this._smoothedMagnitudes[e] ?? i.magnitude;
    return {
      color: Zi[e] ?? ((p = (u = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : u[e]) == null ? void 0 : p.colour) ?? "#9e9e9e",
      dur: qi(o, t && i.direction !== "idle"),
      idle: i.direction === "idle",
      paused: !s,
      reverse: i.direction === "from-home"
    };
  }
  _sameLineVisualState(e, t) {
    return !!(e && t && e.color === t.color && e.dur === t.dur && e.idle === t.idle && e.paused === t.paused && e.reverse === t.reverse);
  }
  _updateLineVisualState() {
    const e = {};
    for (const t of [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ]) {
      const s = this._computeLineVisualState(t), i = this._lineVisualState[t];
      e[t] = this._sameLineVisualState(i, s) ? i : s;
    }
    this._lineVisualState = e;
  }
  _svgLines() {
    const e = this._lineLayout.centers.home;
    return !e || !this._lineLayout.width || !this._lineLayout.height ? _ : tt`
      ${ks(
      this._lineTypes(),
      (t) => t,
      (t) => {
        const s = this._lineLayout.centers[t];
        if (!s) return _;
        const i = this._lineVisualState[t] ?? this._computeLineVisualState(t), o = [
          "flow-line",
          i.reverse ? "reverse" : "",
          i.idle ? "idle" : "",
          i.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return tt`
            <line
              x1="${s.x}" y1="${s.y}" x2="${e.x}" y2="${e.y}"
              stroke="${i.color}"
              class="${o}"
              style="--flow-dur:${i.dur}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(e, t, s = !1) {
    var l, d, u;
    const i = e === "home" ? !0 : this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, n = ((u = this.config) == null ? void 0 : u.display) ?? {}, a = this._flowInfo(e), r = e === "solar" ? As(this._dailyKwh(e), n.decimal_places ?? 1) : "";
    return v`
      <hec-energy-node
        data-node-type=${e}
        class="${t}${i ? "" : " hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .showLabel=${o.show_label ?? !0}
        .icon=${o.icon ?? ""}
        .bottomText=${r}
        .colour=${o.colour ?? ""}
        .power=${a.power}
        .soc=${s ? this._soc(e) : null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var e;
    return Object.keys(((e = this.config) == null ? void 0 : e.entity_types) ?? {}).filter(
      (t) => !Ht.includes(t)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: A1→B3→A3→C3→B4→A4→C4…
   */
  _customSlot(e) {
    if (e === 0) return [1, 1];
    const t = e - 1;
    return [[2, 1, 3][t % 3], 3 + Math.floor(t / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(e, t, s) {
    var l, d, u;
    const i = this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, n = ((u = this.config) == null ? void 0 : u.display) ?? {}, a = this._flowInfo(e), r = e === "solar" ? As(this._dailyKwh(e), n.decimal_places ?? 1) : "";
    return v`
      <hec-energy-node
        data-node-type=${e}
        style="grid-column:${t}; grid-row:${s}"
        class="${i ? "" : "hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .showLabel=${o.show_label ?? !0}
        .icon=${o.icon ?? ""}
        .bottomText=${r}
        .colour=${o.colour ?? ""}
        .power=${a.power}
        .soc=${o.soc ? this._soc(e) : null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Dialog ────────────────────────────────────────────────────────────────
  _onNodeClick(e) {
    const t = e.detail;
    t != null && t.nodeType && (this._dialogType = t.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return _;
    const e = this._customTypes();
    return 2 + Math.ceil(e.length / 3), v`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : _}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : _}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${ks(e, (t) => t, (t, s) => {
      const [i, o] = this._customSlot(s);
      return this._customNode(t, i, o);
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
Y.styles = it`
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
      from { stroke-dashoffset: 9; }
      to   { stroke-dashoffset:  0; }
    }
    @keyframes flow-rev {
      from { stroke-dashoffset: -9; }
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
wt([
  $({ attribute: !1 })
], Y.prototype, "hass", 2);
wt([
  $({ attribute: !1 })
], Y.prototype, "config", 2);
wt([
  vt()
], Y.prototype, "_dialogType", 2);
wt([
  vt()
], Y.prototype, "_lineLayout", 2);
Y = wt([
  nt("hec-flow-layout")
], Y);
var Yi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, se = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ji(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (o = (i ? a(t, s, o) : a(o)) || o);
  return i && o && Yi(t, s, o), o;
};
let mt = class extends U {
  setConfig(e) {
    this.config = Lt(e);
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? v`
      <ha-card>
        <hec-card-header
          .hass=${this.hass}
          .config=${this.config}
          .showTitle=${this.config.show_header !== !1}
          .showValues=${this.config.show_header_values !== !1}
        ></hec-card-header>
        <div class="card-body">
          <hec-flow-layout
            .hass=${this.hass}
            .config=${this.config}
          ></hec-flow-layout>
        </div>
      </ha-card>
    ` : _;
  }
};
mt.styles = it`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
se([
  $({ attribute: !1 })
], mt.prototype, "hass", 2);
se([
  $({ attribute: !1 })
], mt.prototype, "config", 2);
mt = se([
  nt("home-energy-card")
], mt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  mt as HomeEnergyCard
};
