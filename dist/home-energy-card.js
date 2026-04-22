/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = globalThis, Pe = ge.ShadowRoot && (ge.ShadyCSS === void 0 || ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Oe = Symbol(), os = /* @__PURE__ */ new WeakMap();
let Ss = class {
  constructor(e, s, o) {
    if (this._$cssResult$ = !0, o !== Oe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (Pe && e === void 0) {
      const o = s !== void 0 && s.length === 1;
      o && (e = os.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && os.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Us = (t) => new Ss(typeof t == "string" ? t : t + "", void 0, Oe), G = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((o, i, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[n + 1], t[0]);
  return new Ss(s, t, Oe);
}, Hs = (t, e) => {
  if (Pe) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const o = document.createElement("style"), i = ge.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = s.cssText, t.appendChild(o);
  }
}, ns = Pe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const o of e.cssRules) s += o.cssText;
  return Us(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ds, defineProperty: Is, getOwnPropertyDescriptor: js, getOwnPropertyNames: Rs, getOwnPropertySymbols: Bs, getPrototypeOf: Fs } = Object, L = globalThis, as = L.trustedTypes, Vs = as ? as.emptyScript : "", xe = L.reactiveElementPolyfillSupport, ie = (t, e) => t, _e = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Vs : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, Le = (t, e) => !Ds(t, e), rs = { attribute: !0, type: String, converter: _e, reflect: !1, useDefault: !1, hasChanged: Le };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), L.litPropertyMetadata ?? (L.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let B = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = rs) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(e, o, s);
      i !== void 0 && Is(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, o) {
    const { get: i, set: n } = js(this.prototype, e) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: i, set(a) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? rs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ie("elementProperties"))) return;
    const e = Fs(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ie("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ie("properties"))) {
      const s = this.properties, o = [...Rs(s), ...Bs(s)];
      for (const i of o) this.createProperty(i, s[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [o, i] of s) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, o] of this.elementProperties) {
      const i = this._$Eu(s, o);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const i of o) s.unshift(ns(i));
    } else e !== void 0 && s.push(ns(e));
    return s;
  }
  static _$Eu(e, s) {
    const o = s.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const o of s.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Hs(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var o;
      return (o = s.hostConnected) == null ? void 0 : o.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var o;
      return (o = s.hostDisconnected) == null ? void 0 : o.call(s);
    });
  }
  attributeChangedCallback(e, s, o) {
    this._$AK(e, o);
  }
  _$ET(e, s) {
    var n;
    const o = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, o);
    if (i !== void 0 && o.reflect === !0) {
      const a = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : _e).toAttribute(s, o.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var n, a;
    const o = this.constructor, i = o._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const c = o.getPropertyOptions(i), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : _e;
      this._$Em = i;
      const d = l.fromAttribute(s, c.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, s, o, i = !1, n) {
    var a;
    if (e !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[e]), o ?? (o = c.getPropertyOptions(e)), !((o.hasChanged ?? Le)(n, s) || o.useDefault && o.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(c._$Eu(e, o)))) return;
      this.C(e, s, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: o, reflect: i, wrapped: n }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? s ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (s = void 0), this._$AL.set(e, s)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
        const { wrapped: c } = a, l = this[n];
        c !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, a, l);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (o = this._$EO) == null || o.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[ie("elementProperties")] = /* @__PURE__ */ new Map(), B[ie("finalized")] = /* @__PURE__ */ new Map(), xe == null || xe({ ReactiveElement: B }), (L.reactiveElementVersions ?? (L.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = globalThis, cs = (t) => t, me = oe.trustedTypes, ls = me ? me.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, As = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, Ts = "?" + O, Ws = `<${Ts}>`, D = document, ae = () => D.createComment(""), re = (t) => t === null || typeof t != "object" && typeof t != "function", ze = Array.isArray, Gs = (t) => ze(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ee = `[ 	
\f\r]`, te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hs = /-->/g, ds = />/g, z = RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ps = /'/g, us = /"/g, ks = /^(?:script|style|textarea|title)$/i, Ps = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), v = Ps(1), ne = Ps(2), I = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), fs = /* @__PURE__ */ new WeakMap(), U = D.createTreeWalker(D, 129);
function Os(t, e) {
  if (!ze(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ls !== void 0 ? ls.createHTML(e) : e;
}
const qs = (t, e) => {
  const s = t.length - 1, o = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = te;
  for (let c = 0; c < s; c++) {
    const l = t[c];
    let d, u, p = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, u = a.exec(l), u !== null); ) m = a.lastIndex, a === te ? u[1] === "!--" ? a = hs : u[1] !== void 0 ? a = ds : u[2] !== void 0 ? (ks.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = z) : u[3] !== void 0 && (a = z) : a === z ? u[0] === ">" ? (a = i ?? te, p = -1) : u[1] === void 0 ? p = -2 : (p = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? z : u[3] === '"' ? us : ps) : a === us || a === ps ? a = z : a === hs || a === ds ? a = te : (a = z, i = void 0);
    const y = a === z && t[c + 1].startsWith("/>") ? " " : "";
    n += a === te ? l + Ws : p >= 0 ? (o.push(d), l.slice(0, p) + As + l.slice(p) + O + y) : l + O + (p === -2 ? c : y);
  }
  return [Os(t, n + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class ce {
  constructor({ strings: e, _$litType$: s }, o) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const c = e.length - 1, l = this.parts, [d, u] = qs(e, s);
    if (this.el = ce.createElement(d, o), U.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = U.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(As)) {
          const m = u[a++], y = i.getAttribute(p).split(O), f = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: f[2], strings: y, ctor: f[1] === "." ? Ys : f[1] === "?" ? Zs : f[1] === "@" ? Js : be }), i.removeAttribute(p);
        } else p.startsWith(O) && (l.push({ type: 6, index: n }), i.removeAttribute(p));
        if (ks.test(i.tagName)) {
          const p = i.textContent.split(O), m = p.length - 1;
          if (m > 0) {
            i.textContent = me ? me.emptyScript : "";
            for (let y = 0; y < m; y++) i.append(p[y], ae()), U.nextNode(), l.push({ type: 2, index: ++n });
            i.append(p[m], ae());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ts) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(O, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += O.length - 1;
      }
      n++;
    }
  }
  static createElement(e, s) {
    const o = D.createElement("template");
    return o.innerHTML = e, o;
  }
}
function V(t, e, s = t, o) {
  var a, c;
  if (e === I) return e;
  let i = o !== void 0 ? (a = s._$Co) == null ? void 0 : a[o] : s._$Cl;
  const n = re(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(t), i._$AT(t, s, o)), o !== void 0 ? (s._$Co ?? (s._$Co = []))[o] = i : s._$Cl = i), i !== void 0 && (e = V(t, i._$AS(t, e.values), i, o)), e;
}
class Ks {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: o } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? D).importNode(s, !0);
    U.currentNode = i;
    let n = U.nextNode(), a = 0, c = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new q(n, n.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (d = new Xs(n, this, e)), this._$AV.push(d), l = o[++c];
      }
      a !== (l == null ? void 0 : l.index) && (n = U.nextNode(), a++);
    }
    return U.currentNode = D, i;
  }
  p(e) {
    let s = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, s), s += o.strings.length - 2) : o._$AI(e[s])), s++;
  }
}
class q {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, o, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = V(this, e, s), re(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Gs(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: s, _$litType$: o } = e, i = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = ce.createElement(Os(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(s);
    else {
      const a = new Ks(i, this), c = a.u(this.options);
      a.p(s), this.T(c), this._$AH = a;
    }
  }
  _$AC(e) {
    let s = fs.get(e.strings);
    return s === void 0 && fs.set(e.strings, s = new ce(e)), s;
  }
  k(e) {
    ze(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let o, i = 0;
    for (const n of e) i === s.length ? s.push(o = new q(this.O(ae()), this.O(ae()), this, this.options)) : o = s[i], o._$AI(n), i++;
    i < s.length && (this._$AR(o && o._$AB.nextSibling, i), s.length = i);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, s); e !== this._$AB; ) {
      const i = cs(e).nextSibling;
      cs(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class be {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, o, i, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = g;
  }
  _$AI(e, s = this, o, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = V(this, e, s, 0), a = !re(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
    else {
      const c = e;
      let l, d;
      for (e = n[0], l = 0; l < n.length - 1; l++) d = V(this, c[o + l], s, l), d === I && (d = this._$AH[l]), a || (a = !re(d) || d !== this._$AH[l]), d === g ? e = g : e !== g && (e += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ys extends be {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Zs extends be {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Js extends be {
  constructor(e, s, o, i, n) {
    super(e, s, o, i, n), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = V(this, e, s, 0) ?? g) === I) return;
    const o = this._$AH, i = e === g && o !== g || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== g && (o === g || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Xs {
  constructor(e, s, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    V(this, e);
  }
}
const Qs = { I: q }, Ce = oe.litHtmlPolyfillSupport;
Ce == null || Ce(ce, q), (oe.litHtmlVersions ?? (oe.litHtmlVersions = [])).push("3.3.2");
const ei = (t, e, s) => {
  const o = (s == null ? void 0 : s.renderBefore) ?? e;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    o._$litPart$ = i = new q(e.insertBefore(ae(), n), n, void 0, s ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
let S = class extends B {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ei(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return I;
  }
};
var Cs;
S._$litElement$ = !0, S.finalized = !0, (Cs = H.litElementHydrateSupport) == null || Cs.call(H, { LitElement: S });
const Se = H.litElementPolyfillSupport;
Se == null || Se({ LitElement: S });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ti = { attribute: !0, type: String, converter: _e, reflect: !1, hasChanged: Le }, si = (t = ti, e, s) => {
  const { kind: o, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(s.name, t), o === "accessor") {
    const { name: a } = s;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, l, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, t, c), c;
    } };
  }
  if (o === "setter") {
    const { name: a } = s;
    return function(c) {
      const l = this[a];
      e.call(this, c), this.requestUpdate(a, l, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function $(t) {
  return (e, s) => typeof s == "object" ? si(t, e, s) : ((o, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $e(t) {
  return $({ ...t, state: !0, attribute: !1 });
}
const Me = (t) => t.attributes.device_class ?? "", Ne = (t) => t.attributes.unit_of_measurement ?? "", Ue = (t, e) => t.toLowerCase() + " " + (e.attributes.friendly_name ?? "").toLowerCase();
function N(...t) {
  return (e, s) => {
    let o = 0;
    Me(s) === "power" && (o += 4), ["W", "kW"].includes(Ne(s)) && (o += 2);
    const i = Ue(e, s);
    for (const n of t) i.includes(n) && (o += 1);
    return o;
  };
}
function F(...t) {
  return (e, s) => {
    let o = 0;
    Me(s) === "energy" && (o += 4), ["kWh", "Wh", "MWh"].includes(Ne(s)) && (o += 2);
    const i = Ue(e, s);
    for (const n of t) i.includes(n) && (o += 1);
    return o;
  };
}
function gs(...t) {
  return (e, s) => {
    let o = 0;
    Me(s) === "battery" && (o += 4), Ne(s) === "%" && (o += 2);
    const i = Ue(e, s);
    for (const n of t) i.includes(n) && (o += 1);
    return o;
  };
}
function pe(t, e = []) {
  return (s, o) => {
    const i = s.toLowerCase();
    if (e.some((a) => i.includes(a))) return 0;
    let n = 0;
    for (const a of t) i.includes(a) && (n += 4);
    return n;
  };
}
function E(t, e, s, o) {
  let i, n = 0;
  for (const a of t) {
    if (o.has(a)) continue;
    const c = e[a];
    if (!c) continue;
    const l = s(a, c);
    l > n && (n = l, i = a);
  }
  return i && o.add(i), i;
}
function ii(t, e, s) {
  const o = Object.values(e).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), i = Object.keys(t).filter((b) => b.includes("octopus_energy"));
  if (!o && i.length === 0) return null;
  const n = i.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], c = {}, l = {}, d = E(
    n,
    t,
    pe(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (c.rate_entity = d, a.push("rate"));
  const u = E(
    n,
    t,
    pe(["_current_accumulative_cost"]),
    s
  );
  u && (c.cost_entity = u, a.push("cost"));
  const p = E(
    n,
    t,
    pe(["_current_day_rates"]),
    s
  );
  p && (c.slots_entity = p, a.push("slots"));
  const m = E(
    i.filter((b) => b.startsWith("binary_sensor.")),
    t,
    pe(["_intelligent_dispatching"]),
    s
  );
  m && (c.dispatches_entity = m, a.push("dispatching")), Object.keys(c).length && (l.octopus = c);
  const y = E(
    n,
    t,
    N("import", "demand", "current"),
    s
  );
  y && (l.power_import = y, a.push("import power"));
  const f = E(
    n,
    t,
    N("export", "demand", "current"),
    s
  );
  f && (l.power_export = f, a.push("export power"));
  const _ = E(
    n,
    t,
    F("import", "accumulative", "consumption"),
    s
  );
  _ && (l.daily_usage = _, a.push("daily import"));
  const w = E(
    n,
    t,
    F("export", "accumulative"),
    s
  );
  return w && (l.daily_export = w, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: a };
}
function oi(t, e, s) {
  const o = Object.values(e).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), i = Object.keys(t).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (o.length === 0 && !i) return null;
  const n = o.length > 0 ? o.map((f) => f.entity_id) : Object.keys(t).filter((f) => f.includes("powerwall") || f.includes("tesla")), a = n.filter((f) => f.includes("powerwall")), c = n.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (a.length > 0) {
    const f = {}, _ = E(
      a,
      t,
      gs("battery", "soc", "charge", "percent"),
      s
    );
    _ && (f.soc = _);
    const w = E(
      a,
      t,
      N("battery", "power", "charge", "discharge"),
      s
    );
    w && (f.power_combined = w);
    const b = E(
      a,
      t,
      F("battery", "today", "daily", "charged"),
      s
    );
    b && (f.daily_usage = b), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const u = E(
    n,
    t,
    N("solar"),
    s
  );
  if (u) {
    const f = { power_combined: u }, _ = E(
      n,
      t,
      F("solar"),
      s
    );
    _ && (f.daily_usage = _), d.solar = f, l.push("solar");
  }
  const p = E(
    n,
    t,
    N("load", "home", "house"),
    s
  );
  if (p) {
    const f = { power_combined: p }, _ = E(
      n,
      t,
      F("load", "home", "house"),
      s
    );
    _ && (f.daily_usage = _), d.home = f, l.push("home load");
  }
  const m = E(
    n,
    t,
    N("grid"),
    s
  );
  m && (d.grid = { power_combined: m }, l.push("grid"));
  const y = E(
    c,
    t,
    gs("battery", "battery_level", "soc", "charge"),
    s
  );
  if (y) {
    const f = { soc: y }, _ = E(
      c,
      t,
      N("charg", "power"),
      s
    );
    _ && (f.power_combined = _);
    const w = E(
      c,
      t,
      F("charg", "energy"),
      s
    );
    w && (f.daily_usage = w), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function ni(t) {
  var l, d;
  const e = t, s = e.states ?? {}, o = e.entities ?? {}, i = /* @__PURE__ */ new Set(), n = oi(s, o, i), a = ii(s, o, i), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), a) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (l = a.entity_types) != null && l.grid) {
      const u = a.entity_types.grid;
      c.entity_types.grid = {
        ...c.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (d = c.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    a.tariff_entity && (c.tariff_entity = a.tariff_entity), c.summary.push(...a.summary ?? []);
  }
  return c;
}
function ai(t, e, s = !1) {
  const o = { ...t };
  e.tariff_entity && (s || !t.tariff_entity) && (o.tariff_entity = e.tariff_entity);
  const i = t.entity_types ?? {}, n = { ...i };
  for (const [a, c] of Object.entries(e.entity_types)) {
    const l = i[a] ?? {}, d = { ...l };
    for (const [u, p] of Object.entries(c))
      p !== void 0 && (s || !l[u]) && (d[u] = p);
    n[a] = d;
  }
  return o.entity_types = n, o;
}
const ve = ["grid", "solar", "battery", "home", "ev"], ri = "custom_";
function ys(t) {
  const e = t.match(/^custom_(\d+)$/);
  return e ? Number(e[1]) : Number.MAX_SAFE_INTEGER;
}
function ci(t) {
  return `${ri}${t + 1}`;
}
function ye(t) {
  const e = t.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(e).filter(
      ([a]) => ve.includes(a)
    )
  ), o = Object.entries(e).filter(([a]) => !ve.includes(a)).sort(([a], [c]) => ys(a) - ys(c)).map(([, a]) => ({ ...a })), i = Array.isArray(t.custom_types) ? t.custom_types.map((a) => ({ ...a })) : o, n = {
    ...s
  };
  return i.forEach((a, c) => {
    n[ci(c)] = { ...a };
  }), {
    ...t,
    entity_types: n,
    custom_types: i
  };
}
var li = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, He = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? hi(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, s, i) : a(i)) || i);
  return o && i && li(e, s, i), i;
};
let le = class extends S {
  setConfig(t) {
    this.config = ye(t);
  }
  _dispatchConfig(t) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: ye(t) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var e;
    const t = [...((e = this.config) == null ? void 0 : e.custom_types) ?? [], {}];
    this._dispatchConfig({
      ...this.config,
      custom_types: t
    });
  }
  _deleteCustomType(t) {
    var s;
    const e = [...((s = this.config) == null ? void 0 : s.custom_types) ?? []];
    e.splice(t, 1), this._dispatchConfig({
      ...this.config,
      custom_types: e
    });
  }
  _setCustomType(t, e) {
    var o;
    const s = [...((o = this.config) == null ? void 0 : o.custom_types) ?? []];
    s[t] = {
      ...s[t] ?? {},
      ...e
    }, this._dispatchConfig({
      ...this.config,
      custom_types: s
    });
  }
  render() {
    var t, e, s, o, i, n, a, c, l, d, u, p, m, y, f, _, w, b, k, P, Y, Z, J, X, Q, ee, Ie, je, Re, Be, Fe, Ve, We, Ge, qe, Ke, Ye, Ze, Je, Xe, Qe, et, tt, st, it, ot, nt, at, rt, ct, lt, ht, dt, pt, ut, ft, gt, yt, _t, mt, vt, bt, $t, wt, xt, Et, Ct, St, At, Tt, kt, Pt, Ot, Lt, zt, Mt, Nt, Ut, Ht, Dt, It, jt, Rt, Bt, Ft, Vt, Wt, Gt, qt, Kt, Yt, Zt, Jt, Xt, Qt, es, ts, ss;
    return this.config ? v`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: ye(
            ai(this.config, ni(this.hass), !1)
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
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Grid">
        <div class="section-body">
          <ha-selector
            label="Grid Import Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((e = (t = this.config.entity_types) == null ? void 0 : t.grid) == null ? void 0 : e.power_import) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((o = (s = this.config.entity_types) == null ? void 0 : s.grid) == null ? void 0 : o.power_export) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((n = (i = this.config.entity_types) == null ? void 0 : i.grid) == null ? void 0 : n.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((c = (a = this.config.entity_types) == null ? void 0 : a.grid) == null ? void 0 : c.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
            <span>Grid Show when idle</span>
            <ha-switch
              .checked=${((d = (l = this.config.entity_types) == null ? void 0 : l.grid) == null ? void 0 : d.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((p = (u = this.config.entity_types) == null ? void 0 : u.grid) == null ? void 0 : p.zero_tolerance) != null ? String((y = (m = this.config.entity_types) == null ? void 0 : m.grid) == null ? void 0 : y.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((_ = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : _.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((b = (w = this.config.entity_types) == null ? void 0 : w.grid) == null ? void 0 : b.label) ?? ""}
            @change=${(h) => {
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
            .value=${((P = (k = this.config.entity_types) == null ? void 0 : k.grid) == null ? void 0 : P.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Z = (Y = this.config.entity_types) == null ? void 0 : Y.grid) == null ? void 0 : Z.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((X = (J = this.config.entity_types) == null ? void 0 : J.solar) == null ? void 0 : X.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((ee = (Q = this.config.entity_types) == null ? void 0 : Q.solar) == null ? void 0 : ee.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((je = (Ie = this.config.entity_types) == null ? void 0 : Ie.solar) == null ? void 0 : je.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((Be = (Re = this.config.entity_types) == null ? void 0 : Re.solar) == null ? void 0 : Be.zero_tolerance) != null ? String((Ve = (Fe = this.config.entity_types) == null ? void 0 : Fe.solar) == null ? void 0 : Ve.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((Ge = (We = this.config.entity_types) == null ? void 0 : We.solar) == null ? void 0 : Ge.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((Ke = (qe = this.config.entity_types) == null ? void 0 : qe.solar) == null ? void 0 : Ke.label) ?? ""}
            @change=${(h) => {
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
            .value=${((Ze = (Ye = this.config.entity_types) == null ? void 0 : Ye.solar) == null ? void 0 : Ze.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Xe = (Je = this.config.entity_types) == null ? void 0 : Je.solar) == null ? void 0 : Xe.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((et = (Qe = this.config.entity_types) == null ? void 0 : Qe.battery) == null ? void 0 : et.soc) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((st = (tt = this.config.entity_types) == null ? void 0 : tt.battery) == null ? void 0 : st.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((ot = (it = this.config.entity_types) == null ? void 0 : it.battery) == null ? void 0 : ot.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((at = (nt = this.config.entity_types) == null ? void 0 : nt.battery) == null ? void 0 : at.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((ct = (rt = this.config.entity_types) == null ? void 0 : rt.battery) == null ? void 0 : ct.zero_tolerance) != null ? String((ht = (lt = this.config.entity_types) == null ? void 0 : lt.battery) == null ? void 0 : ht.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((pt = (dt = this.config.entity_types) == null ? void 0 : dt.battery) == null ? void 0 : pt.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((ft = (ut = this.config.entity_types) == null ? void 0 : ut.battery) == null ? void 0 : ft.label) ?? ""}
            @change=${(h) => {
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
            .value=${((yt = (gt = this.config.entity_types) == null ? void 0 : gt.battery) == null ? void 0 : yt.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((mt = (_t = this.config.entity_types) == null ? void 0 : _t.battery) == null ? void 0 : mt.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((bt = (vt = this.config.entity_types) == null ? void 0 : vt.home) == null ? void 0 : bt.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((wt = ($t = this.config.entity_types) == null ? void 0 : $t.home) == null ? void 0 : wt.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((Et = (xt = this.config.entity_types) == null ? void 0 : xt.home) == null ? void 0 : Et.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((St = (Ct = this.config.entity_types) == null ? void 0 : Ct.home) == null ? void 0 : St.zero_tolerance) != null ? String((Tt = (At = this.config.entity_types) == null ? void 0 : At.home) == null ? void 0 : Tt.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((Pt = (kt = this.config.entity_types) == null ? void 0 : kt.home) == null ? void 0 : Pt.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((Lt = (Ot = this.config.entity_types) == null ? void 0 : Ot.home) == null ? void 0 : Lt.label) ?? ""}
            @change=${(h) => {
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
            .value=${((Mt = (zt = this.config.entity_types) == null ? void 0 : zt.home) == null ? void 0 : Mt.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Ut = (Nt = this.config.entity_types) == null ? void 0 : Nt.home) == null ? void 0 : Ut.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((Dt = (Ht = this.config.entity_types) == null ? void 0 : Ht.ev) == null ? void 0 : Dt.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((jt = (It = this.config.entity_types) == null ? void 0 : It.ev) == null ? void 0 : jt.soc) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Bt = (Rt = this.config.entity_types) == null ? void 0 : Rt.ev) == null ? void 0 : Bt.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((Vt = (Ft = this.config.entity_types) == null ? void 0 : Ft.ev) == null ? void 0 : Vt.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((Gt = (Wt = this.config.entity_types) == null ? void 0 : Wt.ev) == null ? void 0 : Gt.zero_tolerance) != null ? String((Kt = (qt = this.config.entity_types) == null ? void 0 : qt.ev) == null ? void 0 : Kt.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((Zt = (Yt = this.config.entity_types) == null ? void 0 : Yt.ev) == null ? void 0 : Zt.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((Xt = (Jt = this.config.entity_types) == null ? void 0 : Jt.ev) == null ? void 0 : Xt.label) ?? ""}
            @change=${(h) => {
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
            .value=${((es = (Qt = this.config.entity_types) == null ? void 0 : Qt.ev) == null ? void 0 : es.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((ss = (ts = this.config.entity_types) == null ? void 0 : ts.ev) == null ? void 0 : ss.colour) ?? ""}
            @change=${(h) => {
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

      ${(this.config.custom_types ?? []).map((h, r) => {
      var is;
      return v`
        <ha-expansion-panel header=${((is = h.label) == null ? void 0 : is.trim()) || `Custom ${r + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(r)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_import ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { power_import: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { power_export: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { power_combined: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { daily_usage: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { soc: x.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(x) => this._setCustomType(r, {
        show_zero: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(x) => this._setCustomType(r, {
        zero_tolerance: x.target.value !== "" ? Number(x.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(x) => this._setCustomType(r, {
        show_label: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(x) => this._setCustomType(r, {
        label: x.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(x) => this._setCustomType(r, {
        icon: x.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(x) => this._setCustomType(r, {
        colour: x.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : g;
  }
};
le.styles = G`
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
He([
  $({ attribute: !1 })
], le.prototype, "hass", 2);
He([
  $({ attribute: !1 })
], le.prototype, "config", 2);
le = He([
  K("home-energy-card-editor")
], le);
var di = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, we = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? pi(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, s, i) : a(i)) || i);
  return o && i && di(e, s, i), i;
};
function ue(t, e) {
  if (!e) return null;
  const s = t[e];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  return isNaN(o) ? null : s.attributes.unit_of_measurement === "Wh" ? o / 1e3 : o;
}
function fe(t, e) {
  return t === null ? "—" : t.toFixed(e);
}
function ui(t) {
  const e = t.toLowerCase().replace(/[\s_-]/g, ""), s = t.replace(/[_-]/g, " ").replace(/\b\w/g, (o) => o.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((o) => e.includes(o)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((o) => e.includes(o)) && !e.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((o) => e.includes(o)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let W = class extends S {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var _, w, b, k, P, Y, Z, J, X, Q, ee;
    if (!this.config) return g;
    const t = ((_ = this.hass) == null ? void 0 : _.states) ?? {}, e = this.config.entity_types ?? {}, s = ((w = this.config.display) == null ? void 0 : w.decimal_places) ?? 1, o = this.config.tariff_entity ? (b = t[this.config.tariff_entity]) == null ? void 0 : b.state : null, i = o && o !== "unavailable" && o !== "unknown" ? ui(o) : null, n = ue(t, (k = e.solar) == null ? void 0 : k.daily_usage), a = ue(t, (P = e.home) == null ? void 0 : P.daily_usage), c = ue(t, (Y = e.grid) == null ? void 0 : Y.daily_usage), l = ue(t, (Z = e.grid) == null ? void 0 : Z.daily_export), d = !!((J = e.solar) != null && J.daily_usage), u = !!((X = e.home) != null && X.daily_usage), p = !!((Q = e.grid) != null && Q.daily_usage), m = !!((ee = e.grid) != null && ee.daily_export), y = p || m, f = d || u || y;
    return v`
      <div class="header">

        ${this.showTitle || i ? v`
          <div class="title-row">
            ${this.showTitle ? v`<span class="title">${this.config.title ?? "Home Energy"}</span>` : g}
            ${i ? v`
                  <span
                    class="tariff"
                    style="background:${i.bg};color:${i.fg};"
                  >${i.label}</span>
                ` : g}
          </div>
        ` : g}

        ${f ? v`
          <div class="stats-row">

            ${d ? v`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${fe(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${u ? v`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${fe(a, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${y ? v`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? v`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${fe(c, s)}</span>
                    </div>
                  ` : g}
                  ${m ? v`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${fe(l, s)}</span>
                    </div>
                  ` : g}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : g}

          </div>
        ` : g}

      </div>
    `;
  }
};
W.styles = G`
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
we([
  $({ attribute: !1 })
], W.prototype, "hass", 2);
we([
  $({ attribute: !1 })
], W.prototype, "config", 2);
we([
  $({ type: Boolean })
], W.prototype, "showTitle", 2);
W = we([
  K("hec-card-header")
], W);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fi = { CHILD: 2 }, gi = (t) => (...e) => ({ _$litDirective$: t, values: e });
let yi = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, o) {
    this._$Ct = e, this._$AM = s, this._$Ci = o;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: _i } = Qs, _s = (t) => t, ms = () => document.createComment(""), se = (t, e, s) => {
  var n;
  const o = t._$AA.parentNode, i = e === void 0 ? t._$AB : e._$AA;
  if (s === void 0) {
    const a = o.insertBefore(ms(), i), c = o.insertBefore(ms(), i);
    s = new _i(a, c, t, t.options);
  } else {
    const a = s._$AB.nextSibling, c = s._$AM, l = c !== t;
    if (l) {
      let d;
      (n = s._$AQ) == null || n.call(s, t), s._$AM = t, s._$AP !== void 0 && (d = t._$AU) !== c._$AU && s._$AP(d);
    }
    if (a !== i || l) {
      let d = s._$AA;
      for (; d !== a; ) {
        const u = _s(d).nextSibling;
        _s(o).insertBefore(d, i), d = u;
      }
    }
  }
  return s;
}, M = (t, e, s = t) => (t._$AI(e, s), t), mi = {}, vi = (t, e = mi) => t._$AH = e, bi = (t) => t._$AH, Ae = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vs = (t, e, s) => {
  const o = /* @__PURE__ */ new Map();
  for (let i = e; i <= s; i++) o.set(t[i], i);
  return o;
}, bs = gi(class extends yi {
  constructor(t) {
    if (super(t), t.type !== fi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, s) {
    let o;
    s === void 0 ? s = e : e !== void 0 && (o = e);
    const i = [], n = [];
    let a = 0;
    for (const c of t) i[a] = o ? o(c, a) : a, n[a] = s(c, a), a++;
    return { values: n, keys: i };
  }
  render(t, e, s) {
    return this.dt(t, e, s).values;
  }
  update(t, [e, s, o]) {
    const i = bi(t), { values: n, keys: a } = this.dt(e, s, o);
    if (!Array.isArray(i)) return this.ut = a, n;
    const c = this.ut ?? (this.ut = []), l = [];
    let d, u, p = 0, m = i.length - 1, y = 0, f = n.length - 1;
    for (; p <= m && y <= f; ) if (i[p] === null) p++;
    else if (i[m] === null) m--;
    else if (c[p] === a[y]) l[y] = M(i[p], n[y]), p++, y++;
    else if (c[m] === a[f]) l[f] = M(i[m], n[f]), m--, f--;
    else if (c[p] === a[f]) l[f] = M(i[p], n[f]), se(t, l[f + 1], i[p]), p++, f--;
    else if (c[m] === a[y]) l[y] = M(i[m], n[y]), se(t, i[p], i[m]), m--, y++;
    else if (d === void 0 && (d = vs(a, y, f), u = vs(c, p, m)), d.has(c[p])) if (d.has(c[m])) {
      const _ = u.get(a[y]), w = _ !== void 0 ? i[_] : null;
      if (w === null) {
        const b = se(t, i[p]);
        M(b, n[y]), l[y] = b;
      } else l[y] = M(w, n[y]), se(t, i[p], w), i[_] = null;
      y++;
    } else Ae(i[m]), m--;
    else Ae(i[p]), p++;
    for (; y <= f; ) {
      const _ = se(t, l[f + 1]);
      M(_, n[y]), l[y++] = _;
    }
    for (; p <= m; ) {
      const _ = i[p++];
      _ !== null && Ae(_);
    }
    return this.ut = a, vi(t, l), I;
  }
});
var $i = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, A = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? wi(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, s, i) : a(i)) || i);
  return o && i && $i(e, s, i), i;
};
const xi = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Ei = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, ke = 38, $s = +(2 * Math.PI * ke).toFixed(4);
function Ls(t, e, s) {
  if (t === null) return "—";
  const o = Math.abs(t);
  return e === "W" || e === "auto" && o < 1e3 ? `${Math.round(t)} W` : `${(t / 1e3).toFixed(s)} kW`;
}
let C = class extends S {
  constructor() {
    super(...arguments), this.type = "home", this.label = "", this.showLabel = !0, this.icon = "", this.colour = "", this.power = null, this.soc = null, this.unit = "auto", this.decimalPlaces = 1;
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
    const t = xi[this.type] ?? Ei, e = this.colour || t.accent, s = this.icon || t.icon, o = this.soc !== null, i = this.type === "grid" || this.type === "battery", n = i && this.power !== null ? Math.abs(this.power) : this.power, a = i && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : "", c = o ? Math.max(0, Math.min(100, this.soc)) : 0, l = +($s * (1 - c / 100)).toFixed(4);
    return v`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${o ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${ke}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${ke}"
            style="stroke-dasharray:${$s};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${t.gradStart} 0%,${t.gradEnd} 100%);color:${e};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s}></ha-icon>
          ${this.showLabel ? v`<span class="label" style="color:${e};">${this.label || this.type}</span>` : g}
          <span class="power">${Ls(n, this.unit, this.decimalPlaces)}</span>
          ${a ? v`<ha-icon class="direction-icon" .icon=${a}></ha-icon>` : g}
        </div>

      </div>
    `;
  }
};
C.styles = G`
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

    /* ── SOC text (only rendered when SOC is present) ── */
  `;
A([
  $()
], C.prototype, "type", 2);
A([
  $()
], C.prototype, "label", 2);
A([
  $({ type: Boolean })
], C.prototype, "showLabel", 2);
A([
  $()
], C.prototype, "icon", 2);
A([
  $()
], C.prototype, "colour", 2);
A([
  $({ type: Number })
], C.prototype, "power", 2);
A([
  $({ type: Number })
], C.prototype, "soc", 2);
A([
  $()
], C.prototype, "unit", 2);
A([
  $({ type: Number })
], C.prototype, "decimalPlaces", 2);
C = A([
  K("hec-energy-node")
], C);
function zs(t, e) {
  return (e == null ? void 0 : e.trim().toLowerCase()) === "kw" ? t * 1e3 : t;
}
function Te(t, e) {
  var i;
  if (!e) return null;
  const s = t[e];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  return isNaN(o) ? null : zs(
    o,
    (i = s.attributes) == null ? void 0 : i.unit_of_measurement
  );
}
function Ms(t, e, s) {
  const o = e.zero_tolerance ?? 0, i = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (e.power_combined)
    n = Te(s, e.power_combined);
  else {
    const l = !!e.power_import, d = !!e.power_export;
    if (!l && !d) return i;
    const u = l ? Te(s, e.power_import) : null, p = d ? Te(s, e.power_export) : null;
    if ((!l || u === null) && (!d || p === null)) return i;
    n = (u ?? 0) - (p ?? 0);
  }
  if (n === null) return i;
  if (Math.abs(n) <= o) return { power: n, magnitude: null, direction: "idle" };
  const a = Math.abs(n);
  let c;
  switch (t) {
    case "solar":
      c = "to-home";
      break;
    case "grid":
      c = n > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      c = n > 0 ? "from-home" : "to-home";
      break;
    default:
      c = n > 0 ? "from-home" : "to-home";
  }
  return { power: n, magnitude: a, direction: c };
}
var Ci = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, R = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Si(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, s, i) : a(i)) || i);
  return o && i && Ci(e, s, i), i;
};
const Ai = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Ti = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, ki = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Pi(t, e) {
  const s = Date.now(), o = s - 864e5, i = Array(24).fill(null);
  if (!t.length) return i;
  for (let n = 0; n < 24; n++) {
    const a = o + n * 36e5, c = a + 36e5;
    let l = 0, d = 0;
    for (let u = 0; u < t.length; u++) {
      const p = new Date(t[u].last_changed).getTime(), m = u + 1 < t.length ? new Date(t[u + 1].last_changed).getTime() : s, y = Math.max(p, a), f = Math.min(m, c);
      if (f <= y) continue;
      const _ = parseFloat(t[u].state);
      if (isNaN(_)) continue;
      const w = zs(_, e), b = f - y;
      l += Math.abs(w) * b, d += b;
    }
    d > 0 && (i[n] = l / d);
  }
  return i;
}
function Ns(t, e) {
  if (!e) return null;
  const s = t[e];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  return isNaN(o) ? null : o;
}
function ws(t, e) {
  var i;
  const s = Ns(t, e);
  return s === null ? null : ((i = t[e]) == null ? void 0 : i.attributes.unit_of_measurement) === "Wh" ? s / 1e3 : s;
}
function xs(t, e) {
  return t === null ? "—" : `${t.toFixed(e)} kWh`;
}
function Oi(t) {
  return `${t.getHours().toString().padStart(2, "0")}:00`;
}
function Es(t) {
  const e = new Date(t);
  return `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
}
function Li(t) {
  return t < 0 ? "#43a047" : t < 8 ? "#66bb6a" : t < 20 ? "#ffa726" : "#ef5350";
}
function zi(t) {
  return t < 20 ? "#ef5350" : t < 50 ? "#ffa726" : "#66bb6a";
}
let T = class extends S {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(t) {
    super.updated(t), (t.has("open") || t.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var o, i, n, a;
    const t = (i = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : i[this.nodeType], e = (t == null ? void 0 : t.power_combined) ?? (t == null ? void 0 : t.power_import) ?? (t == null ? void 0 : t.power_export);
    if (!e || !this.hass) return;
    const s = (a = (n = this.hass.states) == null ? void 0 : n[e]) == null ? void 0 : a.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const c = /* @__PURE__ */ new Date(), d = `history/period/${new Date(c.getTime() - 864e5).toISOString()}?filter_entity_id=${e}&minimal_response=true&no_attributes=true&end_time=${c.toISOString()}`, u = await this.hass.callApi("GET", d);
      this._hourly = Pi((u == null ? void 0 : u[0]) ?? [], s);
    } catch (c) {
      console.warn("[hec-node-detail] history fetch failed", c), this._hourly = [];
    } finally {
      this._loading = !1;
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(t, e, s) {
    return v`
      <div class="d-header">
        <ha-icon .icon=${e} style="color:${t};--mdc-icon-size:22px;"></ha-icon>
        <span class="d-title">${s}</span>
        <button class="close-btn" @click=${this._close} aria-label="Close">
          <ha-icon icon="mdi:close" style="--mdc-icon-size:18px;"></ha-icon>
        </button>
      </div>
    `;
  }
  _sectionPower(t) {
    var i, n, a, c, l;
    const e = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.decimal_places) ?? 1, s = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.unit) ?? "auto", o = ((l = ki[this.nodeType]) == null ? void 0 : l[t.direction]) ?? "";
    return v`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Ls(t.power, s, e)}</div>
        ${o ? v`<div class="power-sub">${o}</div>` : g}
      </div>
    `;
  }
  _sectionSoc(t) {
    if (t === null) return g;
    const e = zi(t);
    return v`
      <div class="section">
        <div class="s-title">State of charge</div>
        <div class="soc-row">
          <div class="soc-track">
            <div class="soc-fill" style="width:${t}%;background:${e};"></div>
          </div>
          <span class="soc-pct">${t.toFixed(0)}%</span>
        </div>
      </div>
    `;
  }
  _sectionDaily(t) {
    var a, c, l;
    const e = ((a = this.hass) == null ? void 0 : a.states) ?? {}, s = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.decimal_places) ?? 1, o = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", i = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return t.daily_usage && n.push([o, xs(ws(e, t.daily_usage), s)]), t.daily_export && n.push([i, xs(ws(e, t.daily_export), s)]), n.length ? v`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, u]) => v`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : g;
  }
  _sectionOctopus(t) {
    var f;
    const e = ((f = this.hass) == null ? void 0 : f.states) ?? {}, s = t.rate_entity ? e[t.rate_entity] : null, o = t.cost_entity ? e[t.cost_entity] : null, i = t.slots_entity ? e[t.slots_entity] : null, n = s == null ? void 0 : s.state, a = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", c = o == null ? void 0 : o.state, l = (o == null ? void 0 : o.attributes.unit_of_measurement) ?? "£", d = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], u = Date.now(), p = d.filter((_) => new Date(_.end ?? _.end_time ?? 0).getTime() > u).slice(0, 6), m = n && n !== "unavailable" && n !== "unknown", y = c && c !== "unavailable" && c !== "unknown";
    return !m && !y && !p.length ? g : v`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${m ? v`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${a}</span>
          </div>
        ` : g}

        ${y ? v`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(c).toFixed(2)}</span>
          </div>
        ` : g}

        ${p.length ? v`
          <div class="s-subtitle">Upcoming slots</div>
          ${p.map((_) => {
      const w = _.start ?? _.start_time ?? "", b = _.end ?? _.end_time ?? "", k = _.value_inc_vat ?? _.rate_inc_vat ?? _.value ?? 0, P = Li(k);
      return v`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${Es(w)}–${Es(b)}</span>
                <span class="slot-rate" style="color:${P};">${(+k).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : g}
      </div>
    `;
  }
  _sectionChart(t) {
    const e = this._hourly.filter((n) => n !== null), s = e.length ? Math.max(...e) : 0, o = /* @__PURE__ */ new Date(), i = (n) => Oi(new Date(o.getTime() - n * 36e5));
    return this._loading ? v`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : v`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? v`<div class="chart-msg">No data</div>` : v`
              ${ne`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return ne``;
      const c = Math.max(2, n / s * 48);
      return ne`
                      <rect
                        x="${a * 10 + 0.5}" y="${52 - c}"
                        width="9" height="${c}" rx="2"
                        fill="${t}" opacity="0.82"
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
    var l, d, u;
    if (!this.open || !this.nodeType) return g;
    const t = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, e = ((u = this.hass) == null ? void 0 : u.states) ?? {}, s = t.colour || (Ti[this.nodeType] ?? "#9e9e9e"), o = t.icon || Ai[this.nodeType] || "mdi:lightning-bolt", i = t.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = Ms(this.nodeType, t, e), a = !!t.soc && (["battery", "ev"].includes(this.nodeType) || !ve.includes(this.nodeType)), c = a ? Ns(e, t.soc) : null;
    return v`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, o, i)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(c) : g}
          ${this._sectionDaily(t)}
          ${this.nodeType === "grid" && t.octopus ? this._sectionOctopus(t.octopus) : g}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
T.styles = G`
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
R([
  $({ attribute: !1 })
], T.prototype, "hass", 2);
R([
  $({ attribute: !1 })
], T.prototype, "config", 2);
R([
  $()
], T.prototype, "nodeType", 2);
R([
  $({ type: Boolean })
], T.prototype, "open", 2);
R([
  $e()
], T.prototype, "_hourly", 2);
R([
  $e()
], T.prototype, "_loading", 2);
T = R([
  K("hec-node-detail")
], T);
var Mi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, de = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Ni(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, s, i) : a(i)) || i);
  return o && i && Mi(e, s, i), i;
};
function Ui(t, e) {
  if (!e || !t) return "0.7s";
  const s = Math.min(t / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const Hi = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let j = class extends S {
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
    var t;
    (t = this._resizeObserver) == null || t.disconnect(), this._resizeObserver = void 0, this._measureFrame !== null && cancelAnimationFrame(this._measureFrame), this._measureFrame = null, this._speedInterval !== null && window.clearInterval(this._speedInterval), this._speedInterval = null, super.disconnectedCallback();
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector(".grid");
    t && this._resizeObserver && this._resizeObserver.observe(t), this._scheduleMeasureLineLayout();
  }
  willUpdate(t) {
    (t.has("hass") || t.has("config")) && (this._recordFlowSamples(), Object.keys(this._smoothedMagnitudes).length || this._refreshSmoothedMagnitudes(), this._updateLineVisualState());
  }
  updated(t) {
    t.has("config") && this._scheduleMeasureLineLayout();
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(t) {
    var e;
    return t in (((e = this.config) == null ? void 0 : e.entity_types) ?? {});
  }
  _flowInfo(t) {
    var s, o, i;
    const e = ((o = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : o[t]) ?? {};
    return Ms(t, e, ((i = this.hass) == null ? void 0 : i.states) ?? {});
  }
  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  _isVisible(t) {
    var s, o;
    return !(!this._configured(t) || (((o = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : o[t]) ?? {}).show_zero === !1 && this._flowInfo(t).direction === "idle");
  }
  _soc(t) {
    var i, n, a, c;
    const e = (a = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[t]) == null ? void 0 : a.soc;
    if (!e || !this.hass) return null;
    const s = (c = this.hass.states[e]) == null ? void 0 : c.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const o = parseFloat(s);
    return isNaN(o) ? null : o;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _scheduleMeasureLineLayout() {
    this._measureFrame === null && (this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = null, this._measureLineLayout();
    }));
  }
  _measureLineLayout() {
    const t = this.renderRoot.querySelector(".grid");
    if (!t) return;
    const e = t.getBoundingClientRect();
    if (!e.width || !e.height) return;
    const s = {}, o = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const a of o) {
      if (a.classList.contains("hidden")) continue;
      const c = a.dataset.nodeType;
      if (!c) continue;
      const l = a.getBoundingClientRect();
      s[c] = {
        x: l.left - e.left + l.width / 2,
        y: l.top - e.top + l.height / 2
      };
    }
    const i = {
      width: e.width,
      height: e.height,
      centers: s
    };
    this._lineLayout.width === i.width && this._lineLayout.height === i.height && JSON.stringify(this._lineLayout.centers) === JSON.stringify(i.centers) || (this._lineLayout = i);
  }
  _lineTypes() {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ].filter((t) => this._isVisible(t));
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
  _pruneFlowSamples(t, e) {
    const s = this._flowSamples[t] ?? [];
    this._flowSamples[t] = s.filter((o) => e - o.timestamp <= 1e4);
  }
  _recordFlowSamples() {
    const t = Date.now();
    for (const e of this._sampleTypes()) {
      const s = this._flowInfo(e), o = this._flowSamples[e] ?? [];
      o.push({
        timestamp: t,
        magnitude: s.magnitude
      }), this._flowSamples[e] = o, this._pruneFlowSamples(e, t);
    }
  }
  _refreshSmoothedMagnitudes() {
    const t = Date.now();
    let e = !1;
    for (const s of this._sampleTypes()) {
      this._pruneFlowSamples(s, t);
      const i = (this._flowSamples[s] ?? []).map((a) => a.magnitude).filter((a) => a !== null), n = i.length > 0 ? i.reduce((a, c) => a + Math.abs(c), 0) / i.length : null;
      this._smoothedMagnitudes[s] !== n && (this._smoothedMagnitudes[s] = n, e = !0);
    }
    return e;
  }
  _computeLineVisualState(t) {
    var n, a, c, l, d, u, p;
    const e = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.dynamic_animation_speed) ?? !1, s = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.animation) !== !1, o = this._flowInfo(t), i = this._smoothedMagnitudes[t] ?? o.magnitude;
    return {
      color: Hi[t] ?? ((p = (u = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : u[t]) == null ? void 0 : p.colour) ?? "#9e9e9e",
      dur: Ui(i, e && o.direction !== "idle"),
      idle: o.direction === "idle",
      paused: !s,
      reverse: o.direction === "from-home"
    };
  }
  _sameLineVisualState(t, e) {
    return !!(t && e && t.color === e.color && t.dur === e.dur && t.idle === e.idle && t.paused === e.paused && t.reverse === e.reverse);
  }
  _updateLineVisualState() {
    const t = {};
    for (const e of [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ]) {
      const s = this._computeLineVisualState(e), o = this._lineVisualState[e];
      t[e] = this._sameLineVisualState(o, s) ? o : s;
    }
    this._lineVisualState = t;
  }
  _svgLines() {
    const t = this._lineLayout.centers.home;
    return !t || !this._lineLayout.width || !this._lineLayout.height ? g : ne`
      ${bs(
      this._lineTypes(),
      (e) => e,
      (e) => {
        const s = this._lineLayout.centers[e];
        if (!s) return g;
        const o = this._lineVisualState[e] ?? this._computeLineVisualState(e), i = [
          "flow-line",
          o.reverse ? "reverse" : "",
          o.idle ? "idle" : "",
          o.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return ne`
            <line
              x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}"
              stroke="${o.color}"
              class="${i}"
              style="--flow-dur:${o.dur}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(t, e, s = !1) {
    var c, l, d;
    const o = t === "home" ? !0 : this._isVisible(t), i = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[t]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(t);
    return v`
      <hec-energy-node
        data-node-type=${t}
        class="${e}${o ? "" : " hidden"}"
        .type=${t}
        .label=${i.label ?? t}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${a.power}
        .soc=${s ? this._soc(t) : null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var t;
    return Object.keys(((t = this.config) == null ? void 0 : t.entity_types) ?? {}).filter(
      (e) => !ve.includes(e)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: A1→B3→A3→C3→B4→A4→C4…
   */
  _customSlot(t) {
    if (t === 0) return [1, 1];
    const e = t - 1;
    return [[2, 1, 3][e % 3], 3 + Math.floor(e / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(t, e, s) {
    var c, l, d;
    const o = this._isVisible(t), i = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[t]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(t);
    return v`
      <hec-energy-node
        data-node-type=${t}
        style="grid-column:${e}; grid-row:${s}"
        class="${o ? "" : "hidden"}"
        .type=${t}
        .label=${i.label ?? t}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${a.power}
        .soc=${i.soc ? this._soc(t) : null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Dialog ────────────────────────────────────────────────────────────────
  _onNodeClick(t) {
    const e = t.detail;
    e != null && e.nodeType && (this._dialogType = e.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return g;
    const t = this._customTypes();
    return 2 + Math.ceil(t.length / 3), v`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : g}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : g}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${bs(t, (e) => e, (e, s) => {
      const [o, i] = this._customSlot(s);
      return this._customNode(e, o, i);
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
j.styles = G`
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
de([
  $({ attribute: !1 })
], j.prototype, "hass", 2);
de([
  $({ attribute: !1 })
], j.prototype, "config", 2);
de([
  $e()
], j.prototype, "_dialogType", 2);
de([
  $e()
], j.prototype, "_lineLayout", 2);
j = de([
  K("hec-flow-layout")
], j);
var Di = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, De = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Ii(e, s) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, s, i) : a(i)) || i);
  return o && i && Di(e, s, i), i;
};
let he = class extends S {
  setConfig(t) {
    this.config = ye(t);
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
        ></hec-card-header>
        <div class="card-body">
          <hec-flow-layout
            .hass=${this.hass}
            .config=${this.config}
          ></hec-flow-layout>
        </div>
      </ha-card>
    ` : g;
  }
};
he.styles = G`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
De([
  $({ attribute: !1 })
], he.prototype, "hass", 2);
De([
  $({ attribute: !1 })
], he.prototype, "config", 2);
he = De([
  K("home-energy-card")
], he);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  he as HomeEnergyCard
};
