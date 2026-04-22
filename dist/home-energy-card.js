/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = globalThis, te = It.ShadowRoot && (It.ShadyCSS === void 0 || It.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ds = /* @__PURE__ */ new WeakMap();
let zs = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (te && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = ds.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ds.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ws = (e) => new zs(typeof e == "string" ? e : e + "", void 0, ee), rt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new zs(s, e, ee);
}, qs = (e, t) => {
  if (te) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), n = It.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, e.appendChild(i);
  }
}, ps = te ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Ws(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Zs, defineProperty: Ys, getOwnPropertyDescriptor: Js, getOwnPropertyNames: Xs, getOwnPropertySymbols: Qs, getPrototypeOf: ti } = Object, K = globalThis, us = K.trustedTypes, ei = us ? us.emptyScript : "", Wt = K.reactiveElementPolyfillSupport, ft = (e, t) => e, Ft = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ei : null;
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
} }, se = (e, t) => !Zs(e, t), fs = { attribute: !0, type: String, converter: Ft, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), K.litPropertyMetadata ?? (K.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = fs) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, s);
      n !== void 0 && Ys(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: n, set: a } = Js(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: n, set(o) {
      const r = n == null ? void 0 : n.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? fs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ft("elementProperties"))) return;
    const t = ti(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ft("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ft("properties"))) {
      const s = this.properties, i = [...Xs(s), ...Qs(s)];
      for (const n of i) this.createProperty(n, s[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, n] of s) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const n = this._$Eu(s, i);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) s.unshift(ps(n));
    } else t !== void 0 && s.push(ps(t));
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
    return qs(t, this.constructor.elementStyles), t;
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
    var a;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : Ft).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var a, o;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : Ft;
      this._$Em = n;
      const d = l.fromAttribute(s, r.type);
      this[n] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, n = !1, a) {
    var o;
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (a = this[t]), i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? se)(a, s) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: n, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, o] of n) {
        const { wrapped: r } = o, l = this[a];
        r !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, o, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
      }), this.update(s)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
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
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[ft("elementProperties")] = /* @__PURE__ */ new Map(), it[ft("finalized")] = /* @__PURE__ */ new Map(), Wt == null || Wt({ ReactiveElement: it }), (K.reactiveElementVersions ?? (K.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis, gs = (e) => e, Kt = gt.trustedTypes, ys = Kt ? Kt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Rs = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, Hs = "?" + F, si = `<${Hs}>`, J = document, yt = () => J.createComment(""), _t = (e) => e === null || typeof e != "object" && typeof e != "function", ie = Array.isArray, ii = (e) => ie(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", qt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _s = /-->/g, vs = />/g, j = RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ms = /'/g, bs = /"/g, Is = /^(?:script|style|textarea|title)$/i, Ds = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), m = Ds(1), nt = Ds(2), X = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ws = /* @__PURE__ */ new WeakMap(), Z = J.createTreeWalker(J, 129);
function Fs(e, t) {
  if (!ie(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ys !== void 0 ? ys.createHTML(t) : t;
}
const ni = (e, t) => {
  const s = e.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = pt;
  for (let r = 0; r < s; r++) {
    const l = e[r];
    let d, u, p = -1, y = 0;
    for (; y < l.length && (o.lastIndex = y, u = o.exec(l), u !== null); ) y = o.lastIndex, o === pt ? u[1] === "!--" ? o = _s : u[1] !== void 0 ? o = vs : u[2] !== void 0 ? (Is.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = j) : u[3] !== void 0 && (o = j) : o === j ? u[0] === ">" ? (o = n ?? pt, p = -1) : u[1] === void 0 ? p = -2 : (p = o.lastIndex - u[2].length, d = u[1], o = u[3] === void 0 ? j : u[3] === '"' ? bs : ms) : o === bs || o === ms ? o = j : o === _s || o === vs ? o = pt : (o = j, n = void 0);
    const g = o === j && e[r + 1].startsWith("/>") ? " " : "";
    a += o === pt ? l + si : p >= 0 ? (i.push(d), l.slice(0, p) + Rs + l.slice(p) + F + g) : l + F + (p === -2 ? r : g);
  }
  return [Fs(e, a + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class vt {
  constructor({ strings: t, _$litType$: s }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const r = t.length - 1, l = this.parts, [d, u] = ni(t, s);
    if (this.el = vt.createElement(d, i), Z.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = Z.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(Rs)) {
          const y = u[o++], g = n.getAttribute(p).split(F), f = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: a, name: f[2], strings: g, ctor: f[1] === "." ? ai : f[1] === "?" ? ri : f[1] === "@" ? ci : Vt }), n.removeAttribute(p);
        } else p.startsWith(F) && (l.push({ type: 6, index: a }), n.removeAttribute(p));
        if (Is.test(n.tagName)) {
          const p = n.textContent.split(F), y = p.length - 1;
          if (y > 0) {
            n.textContent = Kt ? Kt.emptyScript : "";
            for (let g = 0; g < y; g++) n.append(p[g], yt()), Z.nextNode(), l.push({ type: 2, index: ++a });
            n.append(p[y], yt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Hs) l.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(F, p + 1)) !== -1; ) l.push({ type: 7, index: a }), p += F.length - 1;
      }
      a++;
    }
  }
  static createElement(t, s) {
    const i = J.createElement("template");
    return i.innerHTML = t, i;
  }
}
function at(e, t, s = e, i) {
  var o, r;
  if (t === X) return t;
  let n = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const a = _t(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((r = n == null ? void 0 : n._$AO) == null || r.call(n, !1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = n : s._$Cl = n), n !== void 0 && (t = at(e, n._$AS(e, t.values), n, i)), t;
}
class oi {
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
    const { el: { content: s }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? J).importNode(s, !0);
    Z.currentNode = n;
    let a = Z.nextNode(), o = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new ct(a, a.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (d = new li(a, this, t)), this._$AV.push(d), l = i[++r];
      }
      o !== (l == null ? void 0 : l.index) && (a = Z.nextNode(), o++);
    }
    return Z.currentNode = J, n;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class ct {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, n) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = at(this, t, s), _t(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== X && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ii(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && _t(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: s, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = vt.createElement(Fs(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(s);
    else {
      const o = new oi(n, this), r = o.u(this.options);
      o.p(s), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = ws.get(t.strings);
    return s === void 0 && ws.set(t.strings, s = new vt(t)), s;
  }
  k(t) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, n = 0;
    for (const a of t) n === s.length ? s.push(i = new ct(this.O(yt()), this.O(yt()), this, this.options)) : i = s[n], i._$AI(a), n++;
    n < s.length && (this._$AR(i && i._$AB.nextSibling, n), s.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const n = gs(t).nextSibling;
      gs(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class Vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, n, a) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, s = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = at(this, t, s, 0), o = !_t(t) || t !== this._$AH && t !== X, o && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = a[0], l = 0; l < a.length - 1; l++) d = at(this, r[i + l], s, l), d === X && (d = this._$AH[l]), o || (o = !_t(d) || d !== this._$AH[l]), d === v ? t = v : t !== v && (t += (d ?? "") + a[l + 1]), this._$AH[l] = d;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ai extends Vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class ri extends Vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class ci extends Vt {
  constructor(t, s, i, n, a) {
    super(t, s, i, n, a), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = at(this, t, s, 0) ?? v) === X) return;
    const i = this._$AH, n = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== v && (i === v || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class li {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    at(this, t);
  }
}
const hi = { I: ct }, Zt = gt.litHtmlPolyfillSupport;
Zt == null || Zt(vt, ct), (gt.litHtmlVersions ?? (gt.litHtmlVersions = [])).push("3.3.2");
const di = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = n = new ct(t.insertBefore(yt(), a), a, void 0, s ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis;
let z = class extends it {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = di(s, this.renderRoot, this.renderOptions);
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
    return X;
  }
};
var Ns;
z._$litElement$ = !0, z.finalized = !0, (Ns = Y.litElementHydrateSupport) == null || Ns.call(Y, { LitElement: z });
const Yt = Y.litElementPolyfillSupport;
Yt == null || Yt({ LitElement: z });
(Y.litElementVersions ?? (Y.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pi = { attribute: !0, type: String, converter: Ft, reflect: !1, hasChanged: se }, ui = (e = pi, t, s) => {
  const { kind: i, metadata: n } = s;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(o, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(o, void 0, e, r), r;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(r) {
      const l = this[o];
      t.call(this, r), this.requestUpdate(o, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function $(e) {
  return (t, s) => typeof s == "object" ? ui(e, t, s) : ((i, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function wt(e) {
  return $({ ...e, state: !0, attribute: !1 });
}
const ne = (e) => e.attributes.device_class ?? "", oe = (e) => e.attributes.unit_of_measurement ?? "", ae = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function q(...e) {
  return (t, s) => {
    let i = 0;
    ne(s) === "power" && (i += 4), ["W", "kW"].includes(oe(s)) && (i += 2);
    const n = ae(t, s);
    for (const a of e) n.includes(a) && (i += 1);
    return i;
  };
}
function ot(...e) {
  return (t, s) => {
    let i = 0;
    ne(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(oe(s)) && (i += 2);
    const n = ae(t, s);
    for (const a of e) n.includes(a) && (i += 1);
    return i;
  };
}
function $s(...e) {
  return (t, s) => {
    let i = 0;
    ne(s) === "battery" && (i += 4), oe(s) === "%" && (i += 2);
    const n = ae(t, s);
    for (const a of e) n.includes(a) && (i += 1);
    return i;
  };
}
function Nt(e, t = []) {
  return (s, i) => {
    const n = s.toLowerCase();
    if (t.some((o) => n.includes(o))) return 0;
    let a = 0;
    for (const o of e) n.includes(o) && (a += 4);
    return a;
  };
}
function C(e, t, s, i) {
  let n, a = 0;
  for (const o of e) {
    if (i.has(o)) continue;
    const r = t[o];
    if (!r) continue;
    const l = s(o, r);
    l > a && (a = l, n = o);
  }
  return n && i.add(n), n;
}
function fi(e, t, s) {
  const i = Object.values(t).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), n = Object.keys(e).filter((b) => b.includes("octopus_energy"));
  if (!i && n.length === 0) return null;
  const a = n.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), o = ["Octopus Energy"], r = {}, l = {}, d = C(
    a,
    e,
    Nt(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (r.rate_entity = d, o.push("rate"));
  const u = C(
    a,
    e,
    Nt(["_current_accumulative_cost"]),
    s
  );
  u && (r.cost_entity = u, o.push("cost"));
  const p = C(
    a,
    e,
    Nt(["_current_day_rates"]),
    s
  );
  p && (r.slots_entity = p, o.push("slots"));
  const y = C(
    n.filter((b) => b.startsWith("binary_sensor.")),
    e,
    Nt(["_intelligent_dispatching"]),
    s
  );
  y && (r.dispatches_entity = y, o.push("dispatching")), Object.keys(r).length && (l.octopus = r);
  const g = C(
    a,
    e,
    q("import", "demand", "current"),
    s
  );
  g && (l.power_import = g, o.push("import power"));
  const f = C(
    a,
    e,
    q("export", "demand", "current"),
    s
  );
  f && (l.power_export = f, o.push("export power"));
  const _ = C(
    a,
    e,
    ot("import", "accumulative", "consumption"),
    s
  );
  _ && (l.daily_usage = _, o.push("daily import"));
  const w = C(
    a,
    e,
    ot("export", "accumulative"),
    s
  );
  return w && (l.daily_export = w, o.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: o };
}
function gi(e, t, s) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), n = Object.keys(e).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !n) return null;
  const a = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(e).filter((f) => f.includes("powerwall") || f.includes("tesla")), o = a.filter((f) => f.includes("powerwall")), r = a.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (o.length > 0) {
    const f = {}, _ = C(
      o,
      e,
      $s("battery", "soc", "charge", "percent"),
      s
    );
    _ && (f.soc = _);
    const w = C(
      o,
      e,
      q("battery", "power", "charge", "discharge"),
      s
    );
    w && (f.power_combined = w);
    const b = C(
      o,
      e,
      ot("battery", "today", "daily", "charged"),
      s
    );
    b && (f.daily_usage = b), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const u = C(
    a,
    e,
    q("solar"),
    s
  );
  if (u) {
    const f = { power_combined: u }, _ = C(
      a,
      e,
      ot("solar"),
      s
    );
    _ && (f.daily_usage = _), d.solar = f, l.push("solar");
  }
  const p = C(
    a,
    e,
    q("load", "home", "house"),
    s
  );
  if (p) {
    const f = { power_combined: p }, _ = C(
      a,
      e,
      ot("load", "home", "house"),
      s
    );
    _ && (f.daily_usage = _), d.home = f, l.push("home load");
  }
  const y = C(
    a,
    e,
    q("grid"),
    s
  );
  y && (d.grid = { power_combined: y }, l.push("grid"));
  const g = C(
    r,
    e,
    $s("battery", "battery_level", "soc", "charge"),
    s
  );
  if (g) {
    const f = { soc: g }, _ = C(
      r,
      e,
      q("charg", "power"),
      s
    );
    _ && (f.power_combined = _);
    const w = C(
      r,
      e,
      ot("charg", "energy"),
      s
    );
    w && (f.daily_usage = w), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function yi(e) {
  var l, d;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, n = /* @__PURE__ */ new Set(), a = gi(s, i, n), o = fi(s, i, n), r = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (a && (r.integration_type = "tesla", Object.assign(r.entity_types, a.entity_types), r.summary.push(...a.summary ?? [])), o) {
    if (r.integration_type !== "tesla" && (r.integration_type = "octopus"), (l = o.entity_types) != null && l.grid) {
      const u = o.entity_types.grid;
      r.entity_types.grid = {
        ...r.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (d = r.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    o.tariff_entity && (r.tariff_entity = o.tariff_entity), r.summary.push(...o.summary ?? []);
  }
  return r;
}
function _i(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const n = e.entity_types ?? {}, a = { ...n };
  for (const [o, r] of Object.entries(t.entity_types)) {
    const l = n[o] ?? {}, d = { ...l };
    for (const [u, p] of Object.entries(r))
      p !== void 0 && (s || !l[u]) && (d[u] = p);
    a[o] = d;
  }
  return i.entity_types = a, i;
}
const Gt = ["grid", "solar", "battery", "home", "ev"], vi = "custom_";
function xs(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function mi(e) {
  return `${vi}${e + 1}`;
}
function Dt(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([o]) => Gt.includes(o)
    )
  ), i = Object.entries(t).filter(([o]) => !Gt.includes(o)).sort(([o], [r]) => xs(o) - xs(r)).map(([, o]) => ({ ...o })), n = Array.isArray(e.custom_types) ? e.custom_types.map((o) => ({ ...o })) : i, a = {
    ...s
  };
  return n.forEach((o, r) => {
    a[mi(r)] = { ...o };
  }), {
    ...e,
    entity_types: a,
    custom_types: n
  };
}
var bi = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, re = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? wi(t, s) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, s, n) : o(n)) || n);
  return i && n && bi(t, s, n), n;
};
let mt = class extends z {
  setConfig(e) {
    this.config = Dt(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: Dt(e) },
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
    var e, t, s, i, n, a, o, r, l, d, u, p, y, g, f, _, w, b, P, E, S, O, T, k, H, I, L, N, Et, kt, Ct, ht, dt, A, St, At, Pt, Tt, Mt, et, st, Ot, B, Ut, Lt, le, he, de, pe, ue, fe, ge, ye, _e, ve, me, be, we, $e, xe, Ee, ke, Ce, Se, Ae, Pe, Te, Me, Oe, Ue, Le, Ne, ze, Re, He, Ie, De, Fe, Ke, Ge, Be, je, Ve, We, qe, Ze, Ye, Je, Xe, Qe, ts, es, ss, is, ns, os, as, rs, cs, ls;
    return this.config ? m`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: Dt(
            _i(this.config, yi(this.hass), !1)
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
            .value=${((a = (n = this.config.entity_types) == null ? void 0 : n.grid) == null ? void 0 : a.power_combined) ?? ""}
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
            .value=${((r = (o = this.config.entity_types) == null ? void 0 : o.grid) == null ? void 0 : r.daily_usage) ?? ""}
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
            .value=${((g = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : g.zero_tolerance) != null ? String((_ = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : _.zero_tolerance) : ""}
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
            .value=${((E = (P = this.config.entity_types) == null ? void 0 : P.grid) == null ? void 0 : E.label) ?? ""}
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
            .value=${((O = (S = this.config.entity_types) == null ? void 0 : S.grid) == null ? void 0 : O.icon) ?? ""}
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
            .value=${((k = (T = this.config.entity_types) == null ? void 0 : T.grid) == null ? void 0 : k.colour) ?? ""}
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
            .value=${((I = (H = this.config.entity_types) == null ? void 0 : H.solar) == null ? void 0 : I.power_combined) ?? ""}
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
            .value=${((N = (L = this.config.entity_types) == null ? void 0 : L.solar) == null ? void 0 : N.daily_usage) ?? ""}
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
              .checked=${((kt = (Et = this.config.entity_types) == null ? void 0 : Et.solar) == null ? void 0 : kt.show_zero) ?? !0}
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
            .value=${((ht = (Ct = this.config.entity_types) == null ? void 0 : Ct.solar) == null ? void 0 : ht.zero_tolerance) != null ? String((A = (dt = this.config.entity_types) == null ? void 0 : dt.solar) == null ? void 0 : A.zero_tolerance) : ""}
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
              .checked=${((At = (St = this.config.entity_types) == null ? void 0 : St.solar) == null ? void 0 : At.show_label) ?? !0}
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
            .value=${((Tt = (Pt = this.config.entity_types) == null ? void 0 : Pt.solar) == null ? void 0 : Tt.label) ?? ""}
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
            .value=${((et = (Mt = this.config.entity_types) == null ? void 0 : Mt.solar) == null ? void 0 : et.icon) ?? ""}
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
            .value=${((Ot = (st = this.config.entity_types) == null ? void 0 : st.solar) == null ? void 0 : Ot.colour) ?? ""}
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
            .value=${((Ut = (B = this.config.entity_types) == null ? void 0 : B.battery) == null ? void 0 : Ut.soc) ?? ""}
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
            .value=${((le = (Lt = this.config.entity_types) == null ? void 0 : Lt.battery) == null ? void 0 : le.power_combined) ?? ""}
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
            .value=${((de = (he = this.config.entity_types) == null ? void 0 : he.battery) == null ? void 0 : de.daily_usage) ?? ""}
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
              .checked=${((ue = (pe = this.config.entity_types) == null ? void 0 : pe.battery) == null ? void 0 : ue.show_zero) ?? !0}
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
            .value=${((ge = (fe = this.config.entity_types) == null ? void 0 : fe.battery) == null ? void 0 : ge.zero_tolerance) != null ? String((_e = (ye = this.config.entity_types) == null ? void 0 : ye.battery) == null ? void 0 : _e.zero_tolerance) : ""}
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
              .checked=${((me = (ve = this.config.entity_types) == null ? void 0 : ve.battery) == null ? void 0 : me.show_label) ?? !0}
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
            .value=${((we = (be = this.config.entity_types) == null ? void 0 : be.battery) == null ? void 0 : we.label) ?? ""}
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
            .value=${((xe = ($e = this.config.entity_types) == null ? void 0 : $e.battery) == null ? void 0 : xe.icon) ?? ""}
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
            .value=${((ke = (Ee = this.config.entity_types) == null ? void 0 : Ee.battery) == null ? void 0 : ke.colour) ?? ""}
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
            .value=${((Se = (Ce = this.config.entity_types) == null ? void 0 : Ce.home) == null ? void 0 : Se.power_combined) ?? ""}
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
            .value=${((Pe = (Ae = this.config.entity_types) == null ? void 0 : Ae.home) == null ? void 0 : Pe.daily_usage) ?? ""}
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
              .checked=${((Me = (Te = this.config.entity_types) == null ? void 0 : Te.home) == null ? void 0 : Me.show_zero) ?? !0}
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
            .value=${((Ue = (Oe = this.config.entity_types) == null ? void 0 : Oe.home) == null ? void 0 : Ue.zero_tolerance) != null ? String((Ne = (Le = this.config.entity_types) == null ? void 0 : Le.home) == null ? void 0 : Ne.zero_tolerance) : ""}
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
              .checked=${((Re = (ze = this.config.entity_types) == null ? void 0 : ze.home) == null ? void 0 : Re.show_label) ?? !0}
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
            .value=${((Ie = (He = this.config.entity_types) == null ? void 0 : He.home) == null ? void 0 : Ie.label) ?? ""}
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
            .value=${((Fe = (De = this.config.entity_types) == null ? void 0 : De.home) == null ? void 0 : Fe.icon) ?? ""}
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
            .value=${((Ge = (Ke = this.config.entity_types) == null ? void 0 : Ke.home) == null ? void 0 : Ge.colour) ?? ""}
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
            .value=${((je = (Be = this.config.entity_types) == null ? void 0 : Be.ev) == null ? void 0 : je.power_combined) ?? ""}
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
            .value=${((We = (Ve = this.config.entity_types) == null ? void 0 : Ve.ev) == null ? void 0 : We.soc) ?? ""}
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
            .value=${((Ze = (qe = this.config.entity_types) == null ? void 0 : qe.ev) == null ? void 0 : Ze.daily_usage) ?? ""}
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
              .checked=${((Je = (Ye = this.config.entity_types) == null ? void 0 : Ye.ev) == null ? void 0 : Je.show_zero) ?? !0}
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
            .value=${((Qe = (Xe = this.config.entity_types) == null ? void 0 : Xe.ev) == null ? void 0 : Qe.zero_tolerance) != null ? String((es = (ts = this.config.entity_types) == null ? void 0 : ts.ev) == null ? void 0 : es.zero_tolerance) : ""}
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
              .checked=${((is = (ss = this.config.entity_types) == null ? void 0 : ss.ev) == null ? void 0 : is.show_label) ?? !0}
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
            .value=${((os = (ns = this.config.entity_types) == null ? void 0 : ns.ev) == null ? void 0 : os.label) ?? ""}
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
            .value=${((rs = (as = this.config.entity_types) == null ? void 0 : as.ev) == null ? void 0 : rs.icon) ?? ""}
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
            .value=${((ls = (cs = this.config.entity_types) == null ? void 0 : cs.ev) == null ? void 0 : ls.colour) ?? ""}
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
      var hs;
      return m`
        <ha-expansion-panel header=${((hs = h.label) == null ? void 0 : hs.trim()) || `Custom ${c + 1}`}>
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
              @value-changed=${(x) => this._setCustomType(c, { power_import: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(x) => this._setCustomType(c, { power_export: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(x) => this._setCustomType(c, { power_combined: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(x) => this._setCustomType(c, { daily_usage: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(x) => this._setCustomType(c, { soc: x.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(x) => this._setCustomType(c, {
        show_zero: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(x) => this._setCustomType(c, {
        zero_tolerance: x.target.value !== "" ? Number(x.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(x) => this._setCustomType(c, {
        show_label: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(x) => this._setCustomType(c, {
        label: x.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(x) => this._setCustomType(c, {
        icon: x.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(x) => this._setCustomType(c, {
        colour: x.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : v;
  }
};
mt.styles = rt`
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
re([
  $({ attribute: !1 })
], mt.prototype, "hass", 2);
re([
  $({ attribute: !1 })
], mt.prototype, "config", 2);
mt = re([
  lt("home-energy-card-editor")
], mt);
var $i = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, $t = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? xi(t, s) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, s, n) : o(n)) || n);
  return i && n && $i(t, s, n), n;
};
function zt(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function Rt(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function Ei(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let Q = class extends z {
  constructor() {
    super(...arguments), this.showTitle = !0, this.showValues = !0;
  }
  render() {
    var b, P, E, S, O, T, k, H, I, L, N;
    if (!this.config) return v;
    const e = ((b = this.hass) == null ? void 0 : b.states) ?? {}, t = this.config.entity_types ?? {}, s = ((P = this.config.display) == null ? void 0 : P.decimal_places) ?? 1, i = this.config.tariff_entity ? (E = e[this.config.tariff_entity]) == null ? void 0 : E.state : null, n = i && i !== "unavailable" && i !== "unknown" ? Ei(i) : null, a = zt(e, (S = t.solar) == null ? void 0 : S.daily_usage), o = zt(e, (O = t.home) == null ? void 0 : O.daily_usage), r = zt(e, (T = t.grid) == null ? void 0 : T.daily_usage), l = zt(e, (k = t.grid) == null ? void 0 : k.daily_export), d = !!((H = t.solar) != null && H.daily_usage), u = !!((I = t.home) != null && I.daily_usage), p = !!((L = t.grid) != null && L.daily_usage), y = !!((N = t.grid) != null && N.daily_export), g = p || y, f = d || u || g, _ = this.showValues && f, w = this.showTitle || n;
    return !w && !_ ? v : m`
      <div class="header">

        ${w ? m`
          <div class="title-row">
            ${this.showTitle ? m`<span class="title">${this.config.title ?? "Home Energy"}</span>` : v}
            ${n ? m`
                  <span
                    class="tariff"
                    style="background:${n.bg};color:${n.fg};"
                  >${n.label}</span>
                ` : v}
          </div>
        ` : v}

        ${_ ? m`
          <div class="stats-row">

            ${d ? m`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${Rt(a, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${u ? m`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${Rt(o, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${g ? m`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? m`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${Rt(r, s)}</span>
                    </div>
                  ` : v}
                  ${y ? m`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${Rt(l, s)}</span>
                    </div>
                  ` : v}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : v}

          </div>
        ` : v}

      </div>
    `;
  }
};
Q.styles = rt`
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
$t([
  $({ attribute: !1 })
], Q.prototype, "hass", 2);
$t([
  $({ attribute: !1 })
], Q.prototype, "config", 2);
$t([
  $({ type: Boolean })
], Q.prototype, "showTitle", 2);
$t([
  $({ type: Boolean })
], Q.prototype, "showValues", 2);
Q = $t([
  lt("hec-card-header")
], Q);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ki = { CHILD: 2 }, Ci = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Si = class {
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
const { I: Ai } = hi, Es = (e) => e, ks = () => document.createComment(""), ut = (e, t, s) => {
  var a;
  const i = e._$AA.parentNode, n = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const o = i.insertBefore(ks(), n), r = i.insertBefore(ks(), n);
    s = new Ai(o, r, e, e.options);
  } else {
    const o = s._$AB.nextSibling, r = s._$AM, l = r !== e;
    if (l) {
      let d;
      (a = s._$AQ) == null || a.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== r._$AU && s._$AP(d);
    }
    if (o !== n || l) {
      let d = s._$AA;
      for (; d !== o; ) {
        const u = Es(d).nextSibling;
        Es(i).insertBefore(d, n), d = u;
      }
    }
  }
  return s;
}, V = (e, t, s = e) => (e._$AI(t, s), e), Pi = {}, Ti = (e, t = Pi) => e._$AH = t, Mi = (e) => e._$AH, Jt = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cs = (e, t, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let n = t; n <= s; n++) i.set(e[n], n);
  return i;
}, Ss = Ci(class extends Si {
  constructor(e) {
    if (super(e), e.type !== ki.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, s) {
    let i;
    s === void 0 ? s = t : t !== void 0 && (i = t);
    const n = [], a = [];
    let o = 0;
    for (const r of e) n[o] = i ? i(r, o) : o, a[o] = s(r, o), o++;
    return { values: a, keys: n };
  }
  render(e, t, s) {
    return this.dt(e, t, s).values;
  }
  update(e, [t, s, i]) {
    const n = Mi(e), { values: a, keys: o } = this.dt(t, s, i);
    if (!Array.isArray(n)) return this.ut = o, a;
    const r = this.ut ?? (this.ut = []), l = [];
    let d, u, p = 0, y = n.length - 1, g = 0, f = a.length - 1;
    for (; p <= y && g <= f; ) if (n[p] === null) p++;
    else if (n[y] === null) y--;
    else if (r[p] === o[g]) l[g] = V(n[p], a[g]), p++, g++;
    else if (r[y] === o[f]) l[f] = V(n[y], a[f]), y--, f--;
    else if (r[p] === o[f]) l[f] = V(n[p], a[f]), ut(e, l[f + 1], n[p]), p++, f--;
    else if (r[y] === o[g]) l[g] = V(n[y], a[g]), ut(e, n[p], n[y]), y--, g++;
    else if (d === void 0 && (d = Cs(o, g, f), u = Cs(r, p, y)), d.has(r[p])) if (d.has(r[y])) {
      const _ = u.get(o[g]), w = _ !== void 0 ? n[_] : null;
      if (w === null) {
        const b = ut(e, n[p]);
        V(b, a[g]), l[g] = b;
      } else l[g] = V(w, a[g]), ut(e, n[p], w), n[_] = null;
      g++;
    } else Jt(n[y]), y--;
    else Jt(n[p]), p++;
    for (; g <= f; ) {
      const _ = ut(e, l[f + 1]);
      V(_, a[g]), l[g++] = _;
    }
    for (; p <= y; ) {
      const _ = n[p++];
      _ !== null && Jt(_);
    }
    return this.ut = o, Ti(e, l), X;
  }
});
var Oi = Object.defineProperty, Ui = Object.getOwnPropertyDescriptor, U = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ui(t, s) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, s, n) : o(n)) || n);
  return i && n && Oi(t, s, n), n;
};
const Li = {
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
}, Qt = 38, As = +(2 * Math.PI * Qt).toFixed(4);
function Ks(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
function Ps(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
let M = class extends z {
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
    const e = Li[this.type] ?? Ni, t = this.colour || e.accent, s = this.icon || e.icon, i = this.soc !== null, n = this.type === "grid" || this.type === "battery", a = n && this.power !== null ? Math.abs(this.power) : this.power, o = n && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : "", r = i ? Math.max(0, Math.min(100, this.soc)) : 0, l = +(As * (1 - r / 100)).toFixed(4);
    return m`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${i ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${Qt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${Qt}"
            style="stroke-dasharray:${As};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${e.gradStart} 0%,${e.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s}></ha-icon>
          ${this.showLabel ? m`<span class="label" style="color:${t};">${this.label || this.type}</span>` : v}
          <span class="power">${Ks(a, this.unit, this.decimalPlaces)}</span>
          ${o ? m`<ha-icon class="direction-icon" .icon=${o}></ha-icon>` : this.bottomText ? m`<span class="bottom-text">${this.bottomText}</span>` : v}
        </div>

      </div>
    `;
  }
};
M.styles = rt`
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
U([
  $()
], M.prototype, "type", 2);
U([
  $()
], M.prototype, "label", 2);
U([
  $({ type: Boolean })
], M.prototype, "showLabel", 2);
U([
  $()
], M.prototype, "icon", 2);
U([
  $()
], M.prototype, "bottomText", 2);
U([
  $()
], M.prototype, "colour", 2);
U([
  $({ type: Number })
], M.prototype, "power", 2);
U([
  $({ type: Number })
], M.prototype, "soc", 2);
U([
  $()
], M.prototype, "unit", 2);
U([
  $({ type: Number })
], M.prototype, "decimalPlaces", 2);
M = U([
  lt("hec-energy-node")
], M);
function Gs(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function Xt(e, t) {
  var n;
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : Gs(
    i,
    (n = s.attributes) == null ? void 0 : n.unit_of_measurement
  );
}
function Bs(e, t, s) {
  const i = t.zero_tolerance ?? 0, n = { power: null, magnitude: null, direction: "idle" };
  let a;
  if (t.power_combined)
    a = Xt(s, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return n;
    const u = l ? Xt(s, t.power_import) : null, p = d ? Xt(s, t.power_export) : null;
    if ((!l || u === null) && (!d || p === null)) return n;
    a = (u ?? 0) - (p ?? 0);
  }
  if (a === null) return n;
  if (Math.abs(a) <= i) return { power: a, magnitude: null, direction: "idle" };
  const o = Math.abs(a);
  let r;
  switch (e) {
    case "solar":
      r = "to-home";
      break;
    case "grid":
      r = a > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      r = a > 0 ? "from-home" : "to-home";
      break;
    default:
      r = a > 0 ? "from-home" : "to-home";
  }
  return { power: a, magnitude: o, direction: r };
}
var zi = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, G = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ri(t, s) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, s, n) : o(n)) || n);
  return i && n && zi(t, s, n), n;
};
const Hi = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Ii = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Di = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
}, js = 0.1;
function Fi(e, t) {
  const s = Date.now(), i = s - 864e5, n = Array(24).fill(null);
  if (!e.length) return n;
  for (let a = 0; a < 24; a++) {
    const o = i + a * 36e5, r = o + 36e5;
    let l = 0, d = 0;
    for (let u = 0; u < e.length; u++) {
      const p = new Date(e[u].last_changed).getTime(), y = u + 1 < e.length ? new Date(e[u + 1].last_changed).getTime() : s, g = Math.max(p, o), f = Math.min(y, r);
      if (f <= g) continue;
      const _ = parseFloat(e[u].state);
      if (isNaN(_)) continue;
      const w = Gs(_, t), b = f - g;
      l += Math.abs(w) * b, d += b;
    }
    d > 0 && (n[a] = l / d);
  }
  return n;
}
function Vs(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function Ht(e, t) {
  var n;
  const s = Vs(e, t);
  return s === null ? null : ((n = e[t]) == null ? void 0 : n.attributes.unit_of_measurement) === "Wh" ? s / 1e3 : s;
}
function D(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function Ki(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  if (isNaN(i)) return null;
  const n = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return n.includes("pence") || n.startsWith("p/") || n === "p" ? i / 100 : i;
}
function W(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function Bt(e, t) {
  const s = typeof e == "number" ? e : parseFloat(String(e));
  if (isNaN(s)) return null;
  const i = String(t ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? s / 100 : (i.includes("gbp") || i.includes("£"), s);
}
function Ts(e) {
  if (!e) return [];
  const t = e.attributes.unit_of_measurement;
  return (e.attributes.rates ?? e.attributes.current_day_rates ?? e.attributes.today_rates ?? e.attributes.upcoming_interval_rates ?? []).map((i) => {
    const n = new Date(i.start ?? i.start_time ?? "").getTime(), a = new Date(i.end ?? i.end_time ?? "").getTime(), o = Bt(
      i.value_inc_vat ?? i.rate_inc_vat ?? i.value ?? i.rate,
      i.unit_of_measurement ?? t
    );
    return !Number.isFinite(n) || !Number.isFinite(a) || !o ? null : { startMs: n, endMs: a, rateGbpPerKwh: o };
  }).filter((i) => i !== null).sort((i, n) => i.startMs - n.startMs);
}
function Ms(e, t, s) {
  if (!e.length) return [];
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const a = new Date(e[n].last_changed).getTime(), o = n + 1 < e.length ? new Date(e[n + 1].last_changed).getTime() : s, r = Bt(e[n].state, t);
    !Number.isFinite(a) || !Number.isFinite(o) || o <= a || r !== null && i.push({ startMs: a, endMs: o, rateGbpPerKwh: r });
  }
  return i;
}
function Gi(e, t) {
  const s = t == null ? void 0 : t.attributes.unit_of_measurement, i = e.map((n) => Bt(n.state, s)).filter((n) => n !== null);
  if (i.length > 0) {
    const n = i[0];
    return i.every((a) => Math.abs(a - n) < 1e-9) ? n : null;
  }
  return t ? Bt(t.state, s) : null;
}
function Bi(e, t) {
  return String(t ?? "").trim().toLowerCase() === "wh" ? e / 1e3 : e;
}
function Os(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  const i = [];
  let n = !1;
  for (let a = 1; a < e.length; a++) {
    const o = new Date(e[a - 1].last_changed).getTime(), r = new Date(e[a].last_changed).getTime();
    if (!Number.isFinite(o) || !Number.isFinite(r) || r <= o) continue;
    const l = parseFloat(e[a - 1].state), d = parseFloat(e[a].state);
    if (isNaN(l) || isNaN(d)) continue;
    const u = Bi(d - l, t);
    if (u <= 0) continue;
    const p = r - o, y = [];
    let g = 0;
    for (const f of s) {
      const _ = Math.max(o, f.startMs), w = Math.min(r, f.endMs);
      if (w <= _) continue;
      const b = w - _;
      g += b, y.push({
        startMs: _,
        endMs: w,
        overlapMs: b,
        rateGbpPerKwh: f.rateGbpPerKwh
      });
    }
    if (g > 0) {
      g < p && (n = !0);
      for (const f of y) {
        const _ = u * (f.overlapMs / g);
        i.push({
          startMs: f.startMs,
          endMs: f.endMs,
          energyKwh: _,
          energyUnit: "kWh",
          tariffGbpPerKwh: f.rateGbpPerKwh,
          costGbp: _ * f.rateGbpPerKwh
        });
      }
    } else p > 0 && (n = !0);
  }
  return i.length ? { intervals: i, hasCoverageGap: n } : null;
}
function Us(e) {
  return !(e != null && e.intervals.length) || e.hasCoverageGap ? null : e.intervals.reduce(
    (t, s) => t + s.costGbp,
    0
  );
}
function ji(e) {
  if (!(e != null && e.intervals.length)) return null;
  const t = e.intervals;
  let s = 0, i = 0, n = 0, a = 0;
  for (const o of t)
    o.tariffGbpPerKwh > js ? (s += o.energyKwh, n += o.costGbp) : (i += o.energyKwh, a += o.costGbp);
  return s > 0 || i > 0 ? { peakUsageKwh: s, offPeakUsageKwh: i, peakCostGbp: n, offPeakCostGbp: a } : null;
}
function Ls(e) {
  const t = (e == null ? void 0 : e.intervals) ?? [], s = Array.from(
    new Set(t.map((o) => Number(o.tariffGbpPerKwh.toFixed(4))))
  ).sort((o, r) => o - r);
  if (!t.length || !s.length)
    return {
      distinctRates: s,
      peakIntervalCount: 0,
      offPeakIntervalCount: 0,
      totalUsageKwh: 0
    };
  let i = 0, n = 0, a = 0;
  for (const o of t)
    a += o.energyKwh, o.tariffGbpPerKwh > js ? i += 1 : n += 1;
  return { distinctRates: s, peakIntervalCount: i, offPeakIntervalCount: n, totalUsageKwh: a };
}
function Vi(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function jt(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Wi(e, t) {
  const s = new Date(e), i = new Date(t);
  return `${jt(s.toISOString())}–${jt(i.toISOString())}`;
}
function qi(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function Zi(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
let R = class extends z {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1, this._gridMoney = null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && (this._loadHistory(), this.nodeType === "grid" ? this._loadGridMoney() : this._gridMoney = null);
  }
  async _loadHistory() {
    var i, n, a, o;
    const e = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[this.nodeType], t = (e == null ? void 0 : e.power_combined) ?? (e == null ? void 0 : e.power_import) ?? (e == null ? void 0 : e.power_export);
    if (!t || !this.hass) return;
    const s = (o = (a = this.hass.states) == null ? void 0 : a[t]) == null ? void 0 : o.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const r = /* @__PURE__ */ new Date(), d = `history/period/${new Date(r.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${r.toISOString()}`, u = await this.hass.callApi("GET", d);
      this._hourly = Fi((u == null ? void 0 : u[0]) ?? [], s);
    } catch (r) {
      console.warn("[hec-node-detail] history fetch failed", r), this._hourly = [];
    } finally {
      this._loading = !1;
    }
  }
  async _loadGridMoney() {
    var l, d, u, p, y, g, f, _, w, b, P, E;
    const e = (d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d.grid, t = e == null ? void 0 : e.octopus;
    if (!this.hass || !e || !t) {
      this._gridMoney = null;
      return;
    }
    const s = Ts(
      t.slots_entity ? (u = this.hass.states) == null ? void 0 : u[t.slots_entity] : void 0
    ), i = e.export_rate ? (p = this.hass.states) == null ? void 0 : p[e.export_rate] : void 0, n = Ts(
      i
    ), a = /* @__PURE__ */ new Date();
    a.setHours(0, 0, 0, 0);
    const o = /* @__PURE__ */ new Date(), r = async (S) => {
      if (!S || !this.hass) return [];
      const O = `history/period/${a.toISOString()}?filter_entity_id=${S}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, T = await this.hass.callApi("GET", O);
      return (T == null ? void 0 : T[0]) ?? [];
    };
    try {
      const [S, O, T, k] = await Promise.all([
        r(e.daily_usage),
        r(e.daily_export),
        r(t.rate_entity),
        r(e.export_rate)
      ]), H = e.daily_usage ? (g = (y = this.hass.states) == null ? void 0 : y[e.daily_usage]) == null ? void 0 : g.attributes.unit_of_measurement : void 0, I = e.daily_export ? (_ = (f = this.hass.states) == null ? void 0 : f[e.daily_export]) == null ? void 0 : _.attributes.unit_of_measurement : void 0, L = t.rate_entity ? (b = (w = this.hass.states) == null ? void 0 : w[t.rate_entity]) == null ? void 0 : b.attributes.unit_of_measurement : void 0, N = e.export_rate ? (E = (P = this.hass.states) == null ? void 0 : P[e.export_rate]) == null ? void 0 : E.attributes.unit_of_measurement : void 0, Et = s.length ? s : Ms(T, L, o.getTime()), kt = n.length ? n : Ms(k, N, o.getTime()), Ct = Ht(this.hass.states, e.daily_usage), ht = Ht(this.hass.states, e.daily_export), dt = Gi(k, i), A = Os(
        S,
        H,
        Et
      ), St = Us(
        A
      ), At = ji(
        A
      ), Pt = Os(
        O,
        I,
        kt
      ), Tt = Us(
        Pt
      ), Mt = Ki(this.hass.states, t.cost_entity);
      if (A != null && A.intervals.length) {
        const B = Ls(A);
        console.debug(
          "[hec-node-detail] resolved grid import intervals",
          A.intervals.slice(0, 5),
          {
            totalUsageKwh: B.totalUsageKwh,
            totalCostGbp: A.intervals.reduce(
              (Ut, Lt) => Ut + Lt.costGbp,
              0
            ),
            hasCoverageGap: A.hasCoverageGap,
            distinctRates: B.distinctRates,
            peakIntervalCount: B.peakIntervalCount,
            offPeakIntervalCount: B.offPeakIntervalCount
          }
        );
      }
      const et = St ?? Mt, st = Tt ?? (ht !== null && dt !== null ? ht * dt : null), Ot = et !== null && st !== null ? et - st : null;
      this._gridMoney = {
        importCostToday: et,
        exportPaymentToday: st,
        netCost: Ot,
        importUsageTodayKwh: Ct,
        resolvedImportIntervals: (A == null ? void 0 : A.intervals) ?? [],
        peakOffPeak: At
      };
    } catch (S) {
      console.warn("[hec-node-detail] grid money load failed", S), this._gridMoney = null;
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(e, t, s) {
    return m`
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
    var n, a, o, r, l;
    const t = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.decimal_places) ?? 1, s = ((r = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : r.unit) ?? "auto", i = ((l = Di[this.nodeType]) == null ? void 0 : l[e.direction]) ?? "";
    return m`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Ks(e.power, s, t)}</div>
        ${i ? m`<div class="power-sub">${i}</div>` : v}
      </div>
    `;
  }
  _sectionSoc(e) {
    if (e === null) return v;
    const t = Zi(e);
    return m`
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
    var o, r, l;
    const t = ((o = this.hass) == null ? void 0 : o.states) ?? {}, s = ((l = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", n = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", a = [];
    return e.daily_usage && a.push([i, D(Ht(t, e.daily_usage), s)]), e.daily_export && a.push([n, D(Ht(t, e.daily_export), s)]), a.length ? m`
      <div class="section">
        <div class="s-title">Today</div>
        ${a.map(([d, u]) => m`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : v;
  }
  _sectionOctopus(e) {
    var w, b, P, E, S, O, T;
    const t = ((w = this.hass) == null ? void 0 : w.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.slots_entity ? t[e.slots_entity] : null, n = s == null ? void 0 : s.state, a = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", o = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], r = Date.now(), l = o.filter((k) => new Date(k.end ?? k.end_time ?? 0).getTime() > r).slice(0, 6), d = n && n !== "unavailable" && n !== "unknown", u = ((b = this._gridMoney) == null ? void 0 : b.importCostToday) ?? null, p = ((P = this._gridMoney) == null ? void 0 : P.exportPaymentToday) ?? null, y = ((E = this._gridMoney) == null ? void 0 : E.netCost) ?? null, g = ((S = this._gridMoney) == null ? void 0 : S.peakOffPeak) ?? null, f = ((O = this._gridMoney) == null ? void 0 : O.importUsageTodayKwh) ?? null, _ = ((T = this._gridMoney) == null ? void 0 : T.resolvedImportIntervals) ?? [];
    return !d && !l.length && u === null && p === null && y === null && g === null ? v : m`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${d ? m`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${a}</span>
          </div>
        ` : v}

        <div class="kv">
          <span class="kv-k">Import Cost Today</span>
          <span class="kv-v">${W(u)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${W(p)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${W(y)}</span>
        </div>

        ${this._sectionPeakOffPeak(g)}
        ${this._sectionGridImportDebug(
      f,
      u,
      g,
      _
    )}

        ${l.length ? m`
          <div class="s-subtitle">Upcoming slots</div>
          ${l.map((k) => {
      const H = k.start ?? k.start_time ?? "", I = k.end ?? k.end_time ?? "", L = k.value_inc_vat ?? k.rate_inc_vat ?? k.value ?? 0, N = qi(L);
      return m`
              <div class="slot">
                <span class="slot-dot" style="background:${N};"></span>
                <span class="slot-time">${jt(H)}–${jt(I)}</span>
                <span class="slot-rate" style="color:${N};">${(+L).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : v}
      </div>
    `;
  }
  _sectionPeakOffPeak(e) {
    var l, d, u, p;
    if (!e)
      return m`
        <div class="s-subtitle">Peak vs Off Peak</div>
        <div class="chart-msg">No interval tariff data</div>
      `;
    const t = e.peakUsageKwh + e.offPeakUsageKwh;
    if (t <= 0)
      return m`
        <div class="s-subtitle">Peak vs Off Peak</div>
        <div class="chart-msg">No import data</div>
      `;
    const s = e.peakUsageKwh / t, i = s * Math.PI * 2, n = 20 + 18 * Math.sin(i), a = 20 - 18 * Math.cos(i), o = s > 0.5 ? 1 : 0, r = s >= 0.999 ? "M20 2 A18 18 0 1 1 19.99 2 Z" : s <= 1e-3 ? "" : `M20 20 L20 2 A18 18 0 ${o} 1 ${n.toFixed(3)} ${a.toFixed(3)} Z`;
    return m`
      <div class="s-subtitle">Peak vs Off Peak</div>
      <div class="peak-row">
        <svg class="peak-pie" viewBox="0 0 40 40" aria-label="Peak vs Off Peak usage split">
          <circle cx="20" cy="20" r="18" fill="#e8f5e9"></circle>
          ${r ? nt`<path d="${r}" fill="#ef5350"></path>` : v}
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
        <span class="kv-v">${D(e.peakUsageKwh, ((d = (l = this.config) == null ? void 0 : l.display) == null ? void 0 : d.decimal_places) ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Usage</span>
        <span class="kv-v">${D(e.offPeakUsageKwh, ((p = (u = this.config) == null ? void 0 : u.display) == null ? void 0 : p.decimal_places) ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Cost</span>
        <span class="kv-v">${W(e.peakCostGbp)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Cost</span>
        <span class="kv-v">${W(e.offPeakCostGbp)}</span>
      </div>
    `;
  }
  _sectionGridImportDebug(e, t, s, i) {
    var d, u, p, y, g, f, _, w, b, P;
    const n = Ls(
      i.length ? { intervals: i } : null
    ), a = n.totalUsageKwh, o = (s == null ? void 0 : s.peakUsageKwh) ?? 0, r = (s == null ? void 0 : s.offPeakUsageKwh) ?? 0, l = o + r;
    return m`
      <div class="s-subtitle">Debug Import Intervals</div>
      <div class="kv">
        <span class="kv-k">Import Usage Today</span>
        <span class="kv-v">${D(e, ((u = (d = this.config) == null ? void 0 : d.display) == null ? void 0 : u.decimal_places) ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Resolved Interval Energy Sum</span>
        <span class="kv-v">${D(a, ((y = (p = this.config) == null ? void 0 : p.display) == null ? void 0 : y.decimal_places) ?? 3)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Usage</span>
        <span class="kv-v">${D(o, ((f = (g = this.config) == null ? void 0 : g.display) == null ? void 0 : f.decimal_places) ?? 3)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Usage</span>
        <span class="kv-v">${D(r, ((w = (_ = this.config) == null ? void 0 : _.display) == null ? void 0 : w.decimal_places) ?? 3)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Peak + Off Peak Usage</span>
        <span class="kv-v">${D(l, ((P = (b = this.config) == null ? void 0 : b.display) == null ? void 0 : P.decimal_places) ?? 3)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Import Cost Today</span>
        <span class="kv-v">${W(t)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Resolved Interval Records</span>
        <span class="kv-v">${i.length}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Distinct Tariff Rates</span>
        <span class="kv-v">${n.distinctRates.length ? n.distinctRates.map((E) => `£${E.toFixed(4)}/kWh`).join(", ") : "—"}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Intervals</span>
        <span class="kv-v">${n.peakIntervalCount}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Intervals</span>
        <span class="kv-v">${n.offPeakIntervalCount}</span>
      </div>
      <div class="debug-records">
        ${i.slice(0, 5).map((E) => m`
          <div class="debug-record">
            <div class="debug-record-time">${Wi(E.startMs, E.endMs)}</div>
            <div class="debug-record-line">Energy: ${E.energyKwh.toFixed(6)} ${E.energyUnit}</div>
            <div class="debug-record-line">Tariff: £${E.tariffGbpPerKwh.toFixed(4)}/kWh</div>
            <div class="debug-record-line">Cost: ${W(E.costGbp)}</div>
          </div>
        `)}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((a) => a !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), n = (a) => Vi(new Date(i.getTime() - a * 36e5));
    return this._loading ? m`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : m`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? m`<div class="chart-msg">No data</div>` : m`
              ${nt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((a, o) => {
      if (a === null || a <= 0) return nt``;
      const r = Math.max(2, a / s * 48);
      return nt`
                      <rect
                        x="${o * 10 + 0.5}" y="${52 - r}"
                        width="9" height="${r}" rx="2"
                        fill="${e}" opacity="0.82"
                      />
                    `;
    })}
                </svg>
              `}
              <div class="chart-labels">
                <span>${n(24)}</span>
                <span>${n(18)}</span>
                <span>${n(12)}</span>
                <span>${n(6)}</span>
                <span>Now</span>
              </div>
            `}
      </div>
    `;
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    var l, d, u;
    if (!this.open || !this.nodeType) return v;
    const e = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, s = e.colour || (Ii[this.nodeType] ?? "#9e9e9e"), i = e.icon || Hi[this.nodeType] || "mdi:lightning-bolt", n = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), a = Bs(this.nodeType, e, t), o = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !Gt.includes(this.nodeType)), r = o ? Vs(t, e.soc) : null;
    return m`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, i, n)}
          ${this._sectionPower(a)}
          ${o ? this._sectionSoc(r) : v}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : v}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
R.styles = rt`
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
      overflow: hidden;
    }

    /* ── Panel (bottom sheet) ── */
    .panel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      background: var(--card-background-color, #fff);
      border-radius: 20px 20px 0 0;
      width: min(100%, 480px);
      max-width: 480px;
      max-height: min(86vh, calc(100dvh - env(safe-area-inset-top, 0px)));
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
    .debug-records {
      display: grid;
      gap: 8px;
      margin-top: 10px;
    }
    .debug-record {
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(0,0,0,0.035);
      font-size: 0.8em;
      line-height: 1.35;
    }
    .debug-record-time {
      font-weight: 700;
      margin-bottom: 3px;
      font-variant-numeric: tabular-nums;
    }
    .debug-record-line {
      opacity: 0.8;
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
G([
  $({ attribute: !1 })
], R.prototype, "hass", 2);
G([
  $({ attribute: !1 })
], R.prototype, "config", 2);
G([
  $()
], R.prototype, "nodeType", 2);
G([
  $({ type: Boolean })
], R.prototype, "open", 2);
G([
  wt()
], R.prototype, "_hourly", 2);
G([
  wt()
], R.prototype, "_loading", 2);
G([
  wt()
], R.prototype, "_gridMoney", 2);
R = G([
  lt("hec-node-detail")
], R);
var Yi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, xt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ji(t, s) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, s, n) : o(n)) || n);
  return i && n && Yi(t, s, n), n;
};
function Xi(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const Qi = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let tt = class extends z {
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
    var s, i, n;
    const t = ((i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) ?? {};
    return Bs(e, t, ((n = this.hass) == null ? void 0 : n.states) ?? {});
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
    var n, a, o, r;
    const t = (o = (a = (n = this.config) == null ? void 0 : n.entity_types) == null ? void 0 : a[e]) == null ? void 0 : o.soc;
    if (!t || !this.hass) return null;
    const s = (r = this.hass.states[t]) == null ? void 0 : r.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const i = parseFloat(s);
    return isNaN(i) ? null : i;
  }
  _dailyKwh(e) {
    var a, o, r;
    const t = (r = (o = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : o[e]) == null ? void 0 : r.daily_usage;
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
    for (const o of i) {
      if (o.classList.contains("hidden")) continue;
      const r = o.dataset.nodeType;
      if (!r) continue;
      const l = o.getBoundingClientRect();
      s[r] = {
        x: l.left - t.left + l.width / 2,
        y: l.top - t.top + l.height / 2
      };
    }
    const n = {
      width: t.width,
      height: t.height,
      centers: s
    };
    this._lineLayout.width === n.width && this._lineLayout.height === n.height && JSON.stringify(this._lineLayout.centers) === JSON.stringify(n.centers) || (this._lineLayout = n);
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
      const n = (this._flowSamples[s] ?? []).map((o) => o.magnitude).filter((o) => o !== null), a = n.length > 0 ? n.reduce((o, r) => o + Math.abs(r), 0) / n.length : null;
      this._smoothedMagnitudes[s] !== a && (this._smoothedMagnitudes[s] = a, t = !0);
    }
    return t;
  }
  _computeLineVisualState(e) {
    var a, o, r, l, d, u, p;
    const t = ((o = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : o.dynamic_animation_speed) ?? !1, s = ((l = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : l.animation) !== !1, i = this._flowInfo(e), n = this._smoothedMagnitudes[e] ?? i.magnitude;
    return {
      color: Qi[e] ?? ((p = (u = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : u[e]) == null ? void 0 : p.colour) ?? "#9e9e9e",
      dur: Xi(n, t && i.direction !== "idle"),
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
    return !e || !this._lineLayout.width || !this._lineLayout.height ? v : nt`
      ${Ss(
      this._lineTypes(),
      (t) => t,
      (t) => {
        const s = this._lineLayout.centers[t];
        if (!s) return v;
        const i = this._lineVisualState[t] ?? this._computeLineVisualState(t), n = [
          "flow-line",
          i.reverse ? "reverse" : "",
          i.idle ? "idle" : "",
          i.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return nt`
            <line
              x1="${s.x}" y1="${s.y}" x2="${e.x}" y2="${e.y}"
              stroke="${i.color}"
              class="${n}"
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
    const i = e === "home" ? !0 : this._isVisible(e), n = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, a = ((u = this.config) == null ? void 0 : u.display) ?? {}, o = this._flowInfo(e), r = e === "solar" ? Ps(this._dailyKwh(e), a.decimal_places ?? 1) : "";
    return m`
      <hec-energy-node
        data-node-type=${e}
        class="${t}${i ? "" : " hidden"}"
        .type=${e}
        .label=${n.label ?? e}
        .showLabel=${n.show_label ?? !0}
        .icon=${n.icon ?? ""}
        .bottomText=${r}
        .colour=${n.colour ?? ""}
        .power=${o.power}
        .soc=${s ? this._soc(e) : null}
        .unit=${a.unit ?? "auto"}
        .decimalPlaces=${a.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var e;
    return Object.keys(((e = this.config) == null ? void 0 : e.entity_types) ?? {}).filter(
      (t) => !Gt.includes(t)
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
    const i = this._isVisible(e), n = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, a = ((u = this.config) == null ? void 0 : u.display) ?? {}, o = this._flowInfo(e), r = e === "solar" ? Ps(this._dailyKwh(e), a.decimal_places ?? 1) : "";
    return m`
      <hec-energy-node
        data-node-type=${e}
        style="grid-column:${t}; grid-row:${s}"
        class="${i ? "" : "hidden"}"
        .type=${e}
        .label=${n.label ?? e}
        .showLabel=${n.show_label ?? !0}
        .icon=${n.icon ?? ""}
        .bottomText=${r}
        .colour=${n.colour ?? ""}
        .power=${o.power}
        .soc=${n.soc ? this._soc(e) : null}
        .unit=${a.unit ?? "auto"}
        .decimalPlaces=${a.decimal_places ?? 1}
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
    if (!this.config) return v;
    const e = this._customTypes();
    return 2 + Math.ceil(e.length / 3), m`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : v}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : v}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${Ss(e, (t) => t, (t, s) => {
      const [i, n] = this._customSlot(s);
      return this._customNode(t, i, n);
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
tt.styles = rt`
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
xt([
  $({ attribute: !1 })
], tt.prototype, "hass", 2);
xt([
  $({ attribute: !1 })
], tt.prototype, "config", 2);
xt([
  wt()
], tt.prototype, "_dialogType", 2);
xt([
  wt()
], tt.prototype, "_lineLayout", 2);
tt = xt([
  lt("hec-flow-layout")
], tt);
var tn = Object.defineProperty, en = Object.getOwnPropertyDescriptor, ce = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? en(t, s) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (i ? o(t, s, n) : o(n)) || n);
  return i && n && tn(t, s, n), n;
};
let bt = class extends z {
  setConfig(e) {
    this.config = Dt(e);
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? m`
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
    ` : v;
  }
};
bt.styles = rt`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
ce([
  $({ attribute: !1 })
], bt.prototype, "hass", 2);
ce([
  $({ attribute: !1 })
], bt.prototype, "config", 2);
bt = ce([
  lt("home-energy-card")
], bt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  bt as HomeEnergyCard
};
