/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis, Pt = gt.ShadowRoot && (gt.ShadyCSS === void 0 || gt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ot = Symbol(), os = /* @__PURE__ */ new WeakMap();
let As = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Pt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = os.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && os.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Hs = (s) => new As(typeof s == "string" ? s : s + "", void 0, Ot), G = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((o, i, n) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new As(e, s, Ot);
}, Us = (s, t) => {
  if (Pt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = gt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, s.appendChild(o);
  }
}, ns = Pt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return Hs(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ds, defineProperty: js, getOwnPropertyDescriptor: Is, getOwnPropertyNames: Rs, getOwnPropertySymbols: Bs, getPrototypeOf: Fs } = Object, z = globalThis, rs = z.trustedTypes, Vs = rs ? rs.emptyScript : "", xt = z.reactiveElementPolyfillSupport, it = (s, t) => s, _t = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Vs : null;
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
} }, zt = (s, t) => !Ds(s, t), as = { attribute: !0, type: String, converter: _t, reflect: !1, useDefault: !1, hasChanged: zt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), z.litPropertyMetadata ?? (z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let B = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = as) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && js(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: n } = Is(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? as;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const t = Fs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const e = this.properties, o = [...Rs(e), ...Bs(e)];
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
      for (const i of o) e.unshift(ns(i));
    } else t !== void 0 && e.push(ns(t));
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
    return Us(t, this.constructor.elementStyles), t;
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
      const r = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : _t).toAttribute(e, o.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = o.getPropertyOptions(i), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : _t;
      this._$Em = i;
      const d = l.fromAttribute(e, c.type);
      this[i] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, n) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), o ?? (o = c.getPropertyOptions(t)), !((o.hasChanged ?? zt)(n, e) || o.useDefault && o.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: i, wrapped: n }, r) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: c } = r, l = this[n];
        c !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
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
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[it("elementProperties")] = /* @__PURE__ */ new Map(), B[it("finalized")] = /* @__PURE__ */ new Map(), xt == null || xt({ ReactiveElement: B }), (z.reactiveElementVersions ?? (z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, cs = (s) => s, vt = ot.trustedTypes, ls = vt ? vt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ss = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ks = "?" + O, Ws = `<${ks}>`, D = document, rt = () => D.createComment(""), at = (s) => s === null || typeof s != "object" && typeof s != "function", Lt = Array.isArray, Gs = (s) => Lt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Et = `[ 	
\f\r]`, et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hs = /-->/g, ds = />/g, L = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ps = /'/g, us = /"/g, Ts = /^(?:script|style|textarea|title)$/i, Ps = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), m = Ps(1), nt = Ps(2), j = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), fs = /* @__PURE__ */ new WeakMap(), H = D.createTreeWalker(D, 129);
function Os(s, t) {
  if (!Lt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ls !== void 0 ? ls.createHTML(t) : t;
}
const qs = (s, t) => {
  const e = s.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = et;
  for (let c = 0; c < e; c++) {
    const l = s[c];
    let d, f, p = -1, v = 0;
    for (; v < l.length && (r.lastIndex = v, f = r.exec(l), f !== null); ) v = r.lastIndex, r === et ? f[1] === "!--" ? r = hs : f[1] !== void 0 ? r = ds : f[2] !== void 0 ? (Ts.test(f[2]) && (i = RegExp("</" + f[2], "g")), r = L) : f[3] !== void 0 && (r = L) : r === L ? f[0] === ">" ? (r = i ?? et, p = -1) : f[1] === void 0 ? p = -2 : (p = r.lastIndex - f[2].length, d = f[1], r = f[3] === void 0 ? L : f[3] === '"' ? us : ps) : r === us || r === ps ? r = L : r === hs || r === ds ? r = et : (r = L, i = void 0);
    const g = r === L && s[c + 1].startsWith("/>") ? " " : "";
    n += r === et ? l + Ws : p >= 0 ? (o.push(d), l.slice(0, p) + Ss + l.slice(p) + O + g) : l + O + (p === -2 ? c : g);
  }
  return [Os(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class ct {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, l = this.parts, [d, f] = qs(t, e);
    if (this.el = ct.createElement(d, o), H.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = H.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Ss)) {
          const v = f[r++], g = i.getAttribute(p).split(O), u = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: n, name: u[2], strings: g, ctor: u[1] === "." ? Ys : u[1] === "?" ? Zs : u[1] === "@" ? Js : bt }), i.removeAttribute(p);
        } else p.startsWith(O) && (l.push({ type: 6, index: n }), i.removeAttribute(p));
        if (Ts.test(i.tagName)) {
          const p = i.textContent.split(O), v = p.length - 1;
          if (v > 0) {
            i.textContent = vt ? vt.emptyScript : "";
            for (let g = 0; g < v; g++) i.append(p[g], rt()), H.nextNode(), l.push({ type: 2, index: ++n });
            i.append(p[v], rt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ks) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(O, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += O.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const o = D.createElement("template");
    return o.innerHTML = t, o;
  }
}
function V(s, t, e = s, o) {
  var r, c;
  if (t === j) return t;
  let i = o !== void 0 ? (r = e._$Co) == null ? void 0 : r[o] : e._$Cl;
  const n = at(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = i : e._$Cl = i), i !== void 0 && (t = V(s, i._$AS(s, t.values), i, o)), t;
}
class Ks {
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
    const { el: { content: e }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    H.currentNode = i;
    let n = H.nextNode(), r = 0, c = 0, l = o[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new q(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Xs(n, this, t)), this._$AV.push(d), l = o[++c];
      }
      r !== (l == null ? void 0 : l.index) && (n = H.nextNode(), r++);
    }
    return H.currentNode = D, i;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class q {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, i) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = V(this, t, e), at(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && at(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = ct.createElement(Os(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new Ks(i, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = fs.get(t.strings);
    return e === void 0 && fs.set(t.strings, e = new ct(t)), e;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, i = 0;
    for (const n of t) i === e.length ? e.push(o = new q(this.O(rt()), this.O(rt()), this, this.options)) : o = e[i], o._$AI(n), i++;
    i < e.length && (this._$AR(o && o._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = cs(t).nextSibling;
      cs(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class bt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, i, n) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = _;
  }
  _$AI(t, e = this, o, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = V(this, t, e, 0), r = !at(t) || t !== this._$AH && t !== j, r && (this._$AH = t);
    else {
      const c = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = V(this, c[o + l], e, l), d === j && (d = this._$AH[l]), r || (r = !at(d) || d !== this._$AH[l]), d === _ ? t = _ : t !== _ && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ys extends bt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class Zs extends bt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class Js extends bt {
  constructor(t, e, o, i, n) {
    super(t, e, o, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = V(this, t, e, 0) ?? _) === j) return;
    const o = this._$AH, i = t === _ && o !== _ || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== _ && (o === _ || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xs {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const Qs = { I: q }, Ct = ot.litHtmlPolyfillSupport;
Ct == null || Ct(ct, q), (ot.litHtmlVersions ?? (ot.litHtmlVersions = [])).push("3.3.2");
const ti = (s, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = i = new q(t.insertBefore(rt(), n), n, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis;
let A = class extends B {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ti(e, this.renderRoot, this.renderOptions);
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
    return j;
  }
};
var Cs;
A._$litElement$ = !0, A.finalized = !0, (Cs = U.litElementHydrateSupport) == null || Cs.call(U, { LitElement: A });
const At = U.litElementPolyfillSupport;
At == null || At({ LitElement: A });
(U.litElementVersions ?? (U.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ei = { attribute: !0, type: String, converter: _t, reflect: !1, hasChanged: zt }, si = (s = ei, t, e) => {
  const { kind: o, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), o === "accessor") {
    const { name: r } = e;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, l, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, s, c), c;
    } };
  }
  if (o === "setter") {
    const { name: r } = e;
    return function(c) {
      const l = this[r];
      t.call(this, c), this.requestUpdate(r, l, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function w(s) {
  return (t, e) => typeof e == "object" ? si(s, t, e) : ((o, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $t(s) {
  return w({ ...s, state: !0, attribute: !1 });
}
const Nt = (s) => s.attributes.device_class ?? "", Mt = (s) => s.attributes.unit_of_measurement ?? "", Ht = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function M(...s) {
  return (t, e) => {
    let o = 0;
    Nt(e) === "power" && (o += 4), ["W", "kW"].includes(Mt(e)) && (o += 2);
    const i = Ht(t, e);
    for (const n of s) i.includes(n) && (o += 1);
    return o;
  };
}
function F(...s) {
  return (t, e) => {
    let o = 0;
    Nt(e) === "energy" && (o += 4), ["kWh", "Wh", "MWh"].includes(Mt(e)) && (o += 2);
    const i = Ht(t, e);
    for (const n of s) i.includes(n) && (o += 1);
    return o;
  };
}
function gs(...s) {
  return (t, e) => {
    let o = 0;
    Nt(e) === "battery" && (o += 4), Mt(e) === "%" && (o += 2);
    const i = Ht(t, e);
    for (const n of s) i.includes(n) && (o += 1);
    return o;
  };
}
function pt(s, t = []) {
  return (e, o) => {
    const i = e.toLowerCase();
    if (t.some((r) => i.includes(r))) return 0;
    let n = 0;
    for (const r of s) i.includes(r) && (n += 4);
    return n;
  };
}
function E(s, t, e, o) {
  let i, n = 0;
  for (const r of s) {
    if (o.has(r)) continue;
    const c = t[r];
    if (!c) continue;
    const l = e(r, c);
    l > n && (n = l, i = r);
  }
  return i && o.add(i), i;
}
function ii(s, t, e) {
  const o = Object.values(t).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), i = Object.keys(s).filter((b) => b.includes("octopus_energy"));
  if (!o && i.length === 0) return null;
  const n = i.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], c = {}, l = {}, d = E(
    n,
    s,
    pt(["_current_rate"], ["export", "accumulative"]),
    e
  );
  d && (c.rate_entity = d, r.push("rate"));
  const f = E(
    n,
    s,
    pt(["_current_accumulative_cost"]),
    e
  );
  f && (c.cost_entity = f, r.push("cost"));
  const p = E(
    n,
    s,
    pt(["_current_day_rates"]),
    e
  );
  p && (c.slots_entity = p, r.push("slots"));
  const v = E(
    i.filter((b) => b.startsWith("binary_sensor.")),
    s,
    pt(["_intelligent_dispatching"]),
    e
  );
  v && (c.dispatches_entity = v, r.push("dispatching")), Object.keys(c).length && (l.octopus = c);
  const g = E(
    n,
    s,
    M("import", "demand", "current"),
    e
  );
  g && (l.power_import = g, r.push("import power"));
  const u = E(
    n,
    s,
    M("export", "demand", "current"),
    e
  );
  u && (l.power_export = u, r.push("export power"));
  const y = E(
    n,
    s,
    F("import", "accumulative", "consumption"),
    e
  );
  y && (l.daily_usage = y, r.push("daily import"));
  const $ = E(
    n,
    s,
    F("export", "accumulative"),
    e
  );
  return $ && (l.daily_export = $, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: r };
}
function oi(s, t, e) {
  const o = Object.values(t).filter(
    (u) => u.platform === "tesla_custom" && !u.disabled_by
  ), i = Object.keys(s).some(
    (u) => u.includes("powerwall") || u.includes("tesla")
  );
  if (o.length === 0 && !i) return null;
  const n = o.length > 0 ? o.map((u) => u.entity_id) : Object.keys(s).filter((u) => u.includes("powerwall") || u.includes("tesla")), r = n.filter((u) => u.includes("powerwall")), c = n.filter((u) => !u.includes("powerwall")), l = ["Tesla"], d = {};
  if (r.length > 0) {
    const u = {}, y = E(
      r,
      s,
      gs("battery", "soc", "charge", "percent"),
      e
    );
    y && (u.soc = y);
    const $ = E(
      r,
      s,
      M("battery", "power", "charge", "discharge"),
      e
    );
    $ && (u.power_combined = $);
    const b = E(
      r,
      s,
      F("battery", "today", "daily", "charged"),
      e
    );
    b && (u.daily_usage = b), Object.keys(u).length && (d.battery = u, l.push("Powerwall"));
  }
  const f = E(
    n,
    s,
    M("solar"),
    e
  );
  if (f) {
    const u = { power_combined: f }, y = E(
      n,
      s,
      F("solar"),
      e
    );
    y && (u.daily_usage = y), d.solar = u, l.push("solar");
  }
  const p = E(
    n,
    s,
    M("load", "home", "house"),
    e
  );
  if (p) {
    const u = { power_combined: p }, y = E(
      n,
      s,
      F("load", "home", "house"),
      e
    );
    y && (u.daily_usage = y), d.home = u, l.push("home load");
  }
  const v = E(
    n,
    s,
    M("grid"),
    e
  );
  v && (d.grid = { power_combined: v }, l.push("grid"));
  const g = E(
    c,
    s,
    gs("battery", "battery_level", "soc", "charge"),
    e
  );
  if (g) {
    const u = { soc: g }, y = E(
      c,
      s,
      M("charg", "power"),
      e
    );
    y && (u.power_combined = y);
    const $ = E(
      c,
      s,
      F("charg", "energy"),
      e
    );
    $ && (u.daily_usage = $), d.ev = u, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function ni(s) {
  var l, d;
  const t = s, e = t.states ?? {}, o = t.entities ?? {}, i = /* @__PURE__ */ new Set(), n = oi(e, o, i), r = ii(e, o, i), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), r) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (l = r.entity_types) != null && l.grid) {
      const f = r.entity_types.grid;
      c.entity_types.grid = {
        ...c.entity_types.grid,
        ...f,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: f.power_import || (d = c.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    r.tariff_entity && (c.tariff_entity = r.tariff_entity), c.summary.push(...r.summary ?? []);
  }
  return c;
}
function ri(s, t, e = !1) {
  const o = { ...s };
  t.tariff_entity && (e || !s.tariff_entity) && (o.tariff_entity = t.tariff_entity);
  const i = s.entity_types ?? {}, n = { ...i };
  for (const [r, c] of Object.entries(t.entity_types)) {
    const l = i[r] ?? {}, d = { ...l };
    for (const [f, p] of Object.entries(c))
      p !== void 0 && (e || !l[f]) && (d[f] = p);
    n[r] = d;
  }
  return o.entity_types = n, o;
}
const mt = ["grid", "solar", "battery", "home", "ev"], ai = "custom_";
function ys(s) {
  const t = s.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function ci(s) {
  return `${ai}${s + 1}`;
}
function yt(s) {
  const t = s.entity_types ?? {}, e = Object.fromEntries(
    Object.entries(t).filter(
      ([r]) => mt.includes(r)
    )
  ), o = Object.entries(t).filter(([r]) => !mt.includes(r)).sort(([r], [c]) => ys(r) - ys(c)).map(([, r]) => ({ ...r })), i = Array.isArray(s.custom_types) ? s.custom_types.map((r) => ({ ...r })) : o, n = {
    ...e
  };
  return i.forEach((r, c) => {
    n[ci(c)] = { ...r };
  }), {
    ...s,
    entity_types: n,
    custom_types: i
  };
}
var li = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Ut = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? hi(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && li(t, e, i), i;
};
let lt = class extends A {
  setConfig(s) {
    this.config = yt(s);
  }
  _dispatchConfig(s) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: yt(s) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var t;
    const s = [...((t = this.config) == null ? void 0 : t.custom_types) ?? [], {}];
    this._dispatchConfig({
      ...this.config,
      custom_types: s
    });
  }
  _deleteCustomType(s) {
    var e;
    const t = [...((e = this.config) == null ? void 0 : e.custom_types) ?? []];
    t.splice(s, 1), this._dispatchConfig({
      ...this.config,
      custom_types: t
    });
  }
  _setCustomType(s, t) {
    var o;
    const e = [...((o = this.config) == null ? void 0 : o.custom_types) ?? []];
    e[s] = {
      ...e[s] ?? {},
      ...t
    }, this._dispatchConfig({
      ...this.config,
      custom_types: e
    });
  }
  render() {
    var s, t, e, o, i, n, r, c, l, d, f, p, v, g, u, y, $, b, T, P, Y, Z, J, X, Q, tt, jt, It, Rt, Bt, Ft, Vt, Wt, Gt, qt, Kt, Yt, Zt, Jt, Xt, Qt, te, ee, se, ie, oe, ne, re, ae, ce, le, he, de, pe, ue, fe, ge, ye, _e, ve, me, be, $e, we, xe, Ee, Ce, Ae, Se, ke, Te, Pe, Oe, ze, Le, Ne, Me, He, Ue, De, je, Ie, Re, Be, Fe, Ve, We, Ge, qe, Ke, Ye, Ze, Je, Xe, Qe, ts, es, ss;
    return this.config ? m`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: yt(
            ri(this.config, ni(this.hass), !1)
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
            .value=${((t = (s = this.config.entity_types) == null ? void 0 : s.grid) == null ? void 0 : t.power_import) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((o = (e = this.config.entity_types) == null ? void 0 : e.grid) == null ? void 0 : o.power_export) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((c = (r = this.config.entity_types) == null ? void 0 : r.grid) == null ? void 0 : c.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((p = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : p.zero_tolerance) != null ? String((g = (v = this.config.entity_types) == null ? void 0 : v.grid) == null ? void 0 : g.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
              .checked=${((y = (u = this.config.entity_types) == null ? void 0 : u.grid) == null ? void 0 : y.show_label) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((b = ($ = this.config.entity_types) == null ? void 0 : $.grid) == null ? void 0 : b.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((P = (T = this.config.entity_types) == null ? void 0 : T.grid) == null ? void 0 : P.icon) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((tt = (Q = this.config.entity_types) == null ? void 0 : Q.solar) == null ? void 0 : tt.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
              .checked=${((It = (jt = this.config.entity_types) == null ? void 0 : jt.solar) == null ? void 0 : It.show_zero) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((Bt = (Rt = this.config.entity_types) == null ? void 0 : Rt.solar) == null ? void 0 : Bt.zero_tolerance) != null ? String((Vt = (Ft = this.config.entity_types) == null ? void 0 : Ft.solar) == null ? void 0 : Vt.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
              .checked=${((Gt = (Wt = this.config.entity_types) == null ? void 0 : Wt.solar) == null ? void 0 : Gt.show_label) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((Kt = (qt = this.config.entity_types) == null ? void 0 : qt.solar) == null ? void 0 : Kt.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((Zt = (Yt = this.config.entity_types) == null ? void 0 : Yt.solar) == null ? void 0 : Zt.icon) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((Xt = (Jt = this.config.entity_types) == null ? void 0 : Jt.solar) == null ? void 0 : Xt.colour) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((te = (Qt = this.config.entity_types) == null ? void 0 : Qt.battery) == null ? void 0 : te.soc) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((se = (ee = this.config.entity_types) == null ? void 0 : ee.battery) == null ? void 0 : se.power_combined) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((oe = (ie = this.config.entity_types) == null ? void 0 : ie.battery) == null ? void 0 : oe.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
              .checked=${((re = (ne = this.config.entity_types) == null ? void 0 : ne.battery) == null ? void 0 : re.show_zero) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((ce = (ae = this.config.entity_types) == null ? void 0 : ae.battery) == null ? void 0 : ce.zero_tolerance) != null ? String((he = (le = this.config.entity_types) == null ? void 0 : le.battery) == null ? void 0 : he.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
              .checked=${((pe = (de = this.config.entity_types) == null ? void 0 : de.battery) == null ? void 0 : pe.show_label) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((fe = (ue = this.config.entity_types) == null ? void 0 : ue.battery) == null ? void 0 : fe.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((ye = (ge = this.config.entity_types) == null ? void 0 : ge.battery) == null ? void 0 : ye.icon) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((ve = (_e = this.config.entity_types) == null ? void 0 : _e.battery) == null ? void 0 : ve.colour) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((be = (me = this.config.entity_types) == null ? void 0 : me.home) == null ? void 0 : be.power_combined) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((we = ($e = this.config.entity_types) == null ? void 0 : $e.home) == null ? void 0 : we.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
              .checked=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.home) == null ? void 0 : Ee.show_zero) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((Ae = (Ce = this.config.entity_types) == null ? void 0 : Ce.home) == null ? void 0 : Ae.zero_tolerance) != null ? String((ke = (Se = this.config.entity_types) == null ? void 0 : Se.home) == null ? void 0 : ke.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
              .checked=${((Pe = (Te = this.config.entity_types) == null ? void 0 : Te.home) == null ? void 0 : Pe.show_label) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((ze = (Oe = this.config.entity_types) == null ? void 0 : Oe.home) == null ? void 0 : ze.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((Ne = (Le = this.config.entity_types) == null ? void 0 : Le.home) == null ? void 0 : Ne.icon) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((He = (Me = this.config.entity_types) == null ? void 0 : Me.home) == null ? void 0 : He.colour) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((De = (Ue = this.config.entity_types) == null ? void 0 : Ue.ev) == null ? void 0 : De.power_combined) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((Ie = (je = this.config.entity_types) == null ? void 0 : je.ev) == null ? void 0 : Ie.soc) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((Be = (Re = this.config.entity_types) == null ? void 0 : Re.ev) == null ? void 0 : Be.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
              .checked=${((Ve = (Fe = this.config.entity_types) == null ? void 0 : Fe.ev) == null ? void 0 : Ve.show_zero) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((Ge = (We = this.config.entity_types) == null ? void 0 : We.ev) == null ? void 0 : Ge.zero_tolerance) != null ? String((Ke = (qe = this.config.entity_types) == null ? void 0 : qe.ev) == null ? void 0 : Ke.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
              .checked=${((Ze = (Ye = this.config.entity_types) == null ? void 0 : Ye.ev) == null ? void 0 : Ze.show_label) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((Xe = (Je = this.config.entity_types) == null ? void 0 : Je.ev) == null ? void 0 : Xe.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((ts = (Qe = this.config.entity_types) == null ? void 0 : Qe.ev) == null ? void 0 : ts.icon) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((ss = (es = this.config.entity_types) == null ? void 0 : es.ev) == null ? void 0 : ss.colour) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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

      ${(this.config.custom_types ?? []).map((h, a) => {
      var is;
      return m`
        <ha-expansion-panel header=${((is = h.label) == null ? void 0 : is.trim()) || `Custom ${a + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(a)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_import ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { power_import: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { power_export: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { power_combined: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { daily_usage: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { soc: x.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(x) => this._setCustomType(a, {
        show_zero: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(x) => this._setCustomType(a, {
        zero_tolerance: x.target.value !== "" ? Number(x.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(x) => this._setCustomType(a, {
        show_label: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(x) => this._setCustomType(a, {
        label: x.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(x) => this._setCustomType(a, {
        icon: x.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(x) => this._setCustomType(a, {
        colour: x.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : _;
  }
};
lt.styles = G`
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
Ut([
  w({ attribute: !1 })
], lt.prototype, "hass", 2);
Ut([
  w({ attribute: !1 })
], lt.prototype, "config", 2);
lt = Ut([
  K("home-energy-card-editor")
], lt);
var di = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, wt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? pi(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && di(t, e, i), i;
};
function ut(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : e.attributes.unit_of_measurement === "Wh" ? o / 1e3 : o;
}
function ft(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function ui(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (o) => o.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((o) => t.includes(o)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((o) => t.includes(o)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((o) => t.includes(o)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let W = class extends A {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, $, b, T, P, Y, Z, J, X, Q, tt;
    if (!this.config) return _;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = this.config.entity_types ?? {}, e = (($ = this.config.display) == null ? void 0 : $.decimal_places) ?? 1, o = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, i = o && o !== "unavailable" && o !== "unknown" ? ui(o) : null, n = ut(s, (T = t.solar) == null ? void 0 : T.daily_usage), r = ut(s, (P = t.home) == null ? void 0 : P.daily_usage), c = ut(s, (Y = t.grid) == null ? void 0 : Y.daily_usage), l = ut(s, (Z = t.grid) == null ? void 0 : Z.daily_export), d = !!((J = t.solar) != null && J.daily_usage), f = !!((X = t.home) != null && X.daily_usage), p = !!((Q = t.grid) != null && Q.daily_usage), v = !!((tt = t.grid) != null && tt.daily_export), g = p || v, u = d || f || g;
    return m`
      <div class="header">

        ${this.showTitle || i ? m`
          <div class="title-row">
            ${this.showTitle ? m`<span class="title">${this.config.title ?? "Home Energy"}</span>` : _}
            ${i ? m`
                  <span
                    class="tariff"
                    style="background:${i.bg};color:${i.fg};"
                  >${i.label}</span>
                ` : _}
          </div>
        ` : _}

        ${u ? m`
          <div class="stats-row">

            ${d ? m`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${ft(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : _}

            ${f ? m`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${ft(r, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : _}

            ${g ? m`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? m`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${ft(c, e)}</span>
                    </div>
                  ` : _}
                  ${v ? m`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${ft(l, e)}</span>
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
wt([
  w({ attribute: !1 })
], W.prototype, "hass", 2);
wt([
  w({ attribute: !1 })
], W.prototype, "config", 2);
wt([
  w({ type: Boolean })
], W.prototype, "showTitle", 2);
W = wt([
  K("hec-card-header")
], W);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fi = { CHILD: 2 }, gi = (s) => (...t) => ({ _$litDirective$: s, values: t });
let yi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, o) {
    this._$Ct = t, this._$AM = e, this._$Ci = o;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: _i } = Qs, _s = (s) => s, vs = () => document.createComment(""), st = (s, t, e) => {
  var n;
  const o = s._$AA.parentNode, i = t === void 0 ? s._$AB : t._$AA;
  if (e === void 0) {
    const r = o.insertBefore(vs(), i), c = o.insertBefore(vs(), i);
    e = new _i(r, c, s, s.options);
  } else {
    const r = e._$AB.nextSibling, c = e._$AM, l = c !== s;
    if (l) {
      let d;
      (n = e._$AQ) == null || n.call(e, s), e._$AM = s, e._$AP !== void 0 && (d = s._$AU) !== c._$AU && e._$AP(d);
    }
    if (r !== i || l) {
      let d = e._$AA;
      for (; d !== r; ) {
        const f = _s(d).nextSibling;
        _s(o).insertBefore(d, i), d = f;
      }
    }
  }
  return e;
}, N = (s, t, e = s) => (s._$AI(t, e), s), vi = {}, mi = (s, t = vi) => s._$AH = t, bi = (s) => s._$AH, St = (s) => {
  s._$AR(), s._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ms = (s, t, e) => {
  const o = /* @__PURE__ */ new Map();
  for (let i = t; i <= e; i++) o.set(s[i], i);
  return o;
}, bs = gi(class extends yi {
  constructor(s) {
    if (super(s), s.type !== fi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(s, t, e) {
    let o;
    e === void 0 ? e = t : t !== void 0 && (o = t);
    const i = [], n = [];
    let r = 0;
    for (const c of s) i[r] = o ? o(c, r) : r, n[r] = e(c, r), r++;
    return { values: n, keys: i };
  }
  render(s, t, e) {
    return this.dt(s, t, e).values;
  }
  update(s, [t, e, o]) {
    const i = bi(s), { values: n, keys: r } = this.dt(t, e, o);
    if (!Array.isArray(i)) return this.ut = r, n;
    const c = this.ut ?? (this.ut = []), l = [];
    let d, f, p = 0, v = i.length - 1, g = 0, u = n.length - 1;
    for (; p <= v && g <= u; ) if (i[p] === null) p++;
    else if (i[v] === null) v--;
    else if (c[p] === r[g]) l[g] = N(i[p], n[g]), p++, g++;
    else if (c[v] === r[u]) l[u] = N(i[v], n[u]), v--, u--;
    else if (c[p] === r[u]) l[u] = N(i[p], n[u]), st(s, l[u + 1], i[p]), p++, u--;
    else if (c[v] === r[g]) l[g] = N(i[v], n[g]), st(s, i[p], i[v]), v--, g++;
    else if (d === void 0 && (d = ms(r, g, u), f = ms(c, p, v)), d.has(c[p])) if (d.has(c[v])) {
      const y = f.get(r[g]), $ = y !== void 0 ? i[y] : null;
      if ($ === null) {
        const b = st(s, i[p]);
        N(b, n[g]), l[g] = b;
      } else l[g] = N($, n[g]), st(s, i[p], $), i[y] = null;
      g++;
    } else St(i[v]), v--;
    else St(i[p]), p++;
    for (; g <= u; ) {
      const y = st(s, l[u + 1]);
      N(y, n[g]), l[g++] = y;
    }
    for (; p <= v; ) {
      const y = i[p++];
      y !== null && St(y);
    }
    return this.ut = r, mi(s, l), j;
  }
});
var $i = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, S = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? wi(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && $i(t, e, i), i;
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
}, Tt = 38, $s = +(2 * Math.PI * Tt).toFixed(4);
function zs(s, t, e) {
  if (s === null) return "—";
  const o = Math.abs(s);
  return t === "W" || t === "auto" && o < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let C = class extends A {
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
    const s = xi[this.type] ?? Ei, t = this.colour || s.accent, e = this.icon || s.icon, o = this.soc !== null, i = this.type === "grid" || this.type === "battery", n = i && this.power !== null ? Math.abs(this.power) : this.power, r = i && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : "", c = o ? Math.max(0, Math.min(100, this.soc)) : 0, l = +($s * (1 - c / 100)).toFixed(4);
    return m`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${o ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${Tt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${Tt}"
            style="stroke-dasharray:${$s};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${s.gradStart} 0%,${s.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${e}></ha-icon>
          ${this.showLabel ? m`<span class="label" style="color:${t};">${this.label || this.type}</span>` : _}
          <span class="power">${zs(n, this.unit, this.decimalPlaces)}</span>
          ${r ? m`<ha-icon class="direction-icon" .icon=${r}></ha-icon>` : _}
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
S([
  w()
], C.prototype, "type", 2);
S([
  w()
], C.prototype, "label", 2);
S([
  w({ type: Boolean })
], C.prototype, "showLabel", 2);
S([
  w()
], C.prototype, "icon", 2);
S([
  w()
], C.prototype, "colour", 2);
S([
  w({ type: Number })
], C.prototype, "power", 2);
S([
  w({ type: Number })
], C.prototype, "soc", 2);
S([
  w()
], C.prototype, "unit", 2);
S([
  w({ type: Number })
], C.prototype, "decimalPlaces", 2);
C = S([
  K("hec-energy-node")
], C);
function Ls(s, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? s * 1e3 : s;
}
function kt(s, t) {
  var i;
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : Ls(
    o,
    (i = e.attributes) == null ? void 0 : i.unit_of_measurement
  );
}
function Ns(s, t, e) {
  const o = t.zero_tolerance ?? 0, i = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = kt(e, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return i;
    const f = l ? kt(e, t.power_import) : null, p = d ? kt(e, t.power_export) : null;
    if ((!l || f === null) && (!d || p === null)) return i;
    n = (f ?? 0) - (p ?? 0);
  }
  if (n === null) return i;
  if (Math.abs(n) <= o) return { power: n, magnitude: null, direction: "idle" };
  const r = Math.abs(n);
  let c;
  switch (s) {
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
  return { power: n, magnitude: r, direction: c };
}
var Ci = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, R = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ai(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && Ci(t, e, i), i;
};
const Si = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, ki = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Ti = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Pi(s, t) {
  const e = Date.now(), o = e - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let n = 0; n < 24; n++) {
    const r = o + n * 36e5, c = r + 36e5;
    let l = 0, d = 0;
    for (let f = 0; f < s.length; f++) {
      const p = new Date(s[f].last_changed).getTime(), v = f + 1 < s.length ? new Date(s[f + 1].last_changed).getTime() : e, g = Math.max(p, r), u = Math.min(v, c);
      if (u <= g) continue;
      const y = parseFloat(s[f].state);
      if (isNaN(y)) continue;
      const $ = Ls(y, t), b = u - g;
      l += Math.abs($) * b, d += b;
    }
    d > 0 && (i[n] = l / d);
  }
  return i;
}
function Ms(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : o;
}
function ws(s, t) {
  var i;
  const e = Ms(s, t);
  return e === null ? null : ((i = s[t]) == null ? void 0 : i.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function xs(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function Oi(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Es(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function zi(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Li(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let k = class extends A {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(s) {
    super.updated(s), (s.has("open") || s.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var o, i, n, r;
    const s = (i = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : i[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!t || !this.hass) return;
    const e = (r = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : r.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const c = /* @__PURE__ */ new Date(), d = `history/period/${new Date(c.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${c.toISOString()}`, f = await this.hass.callApi("GET", d);
      this._hourly = Pi((f == null ? void 0 : f[0]) ?? [], e);
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
  _header(s, t, e) {
    return m`
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
    var i, n, r, c, l;
    const t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((c = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : c.unit) ?? "auto", o = ((l = Ti[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return m`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${zs(s.power, e, t)}</div>
        ${o ? m`<div class="power-sub">${o}</div>` : _}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return _;
    const t = Li(s);
    return m`
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
    var r, c, l;
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, e = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.decimal_places) ?? 1, o = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", i = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([o, xs(ws(t, s.daily_usage), e)]), s.daily_export && n.push([i, xs(ws(t, s.daily_export), e)]), n.length ? m`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, f]) => m`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${f}</span>
          </div>
        `)}
      </div>
    ` : _;
  }
  _sectionOctopus(s) {
    var u;
    const t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, o = s.cost_entity ? t[s.cost_entity] : null, i = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, r = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", c = o == null ? void 0 : o.state, l = (o == null ? void 0 : o.attributes.unit_of_measurement) ?? "£", d = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], f = Date.now(), p = d.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > f).slice(0, 6), v = n && n !== "unavailable" && n !== "unknown", g = c && c !== "unavailable" && c !== "unknown";
    return !v && !g && !p.length ? _ : m`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${v ? m`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
          </div>
        ` : _}

        ${g ? m`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(c).toFixed(2)}</span>
          </div>
        ` : _}

        ${p.length ? m`
          <div class="s-subtitle">Upcoming slots</div>
          ${p.map((y) => {
      const $ = y.start ?? y.start_time ?? "", b = y.end ?? y.end_time ?? "", T = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, P = zi(T);
      return m`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${Es($)}–${Es(b)}</span>
                <span class="slot-rate" style="color:${P};">${(+T).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : _}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, o = /* @__PURE__ */ new Date(), i = (n) => Oi(new Date(o.getTime() - n * 36e5));
    return this._loading ? m`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : m`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? m`<div class="chart-msg">No data</div>` : m`
              ${nt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return nt``;
      const c = Math.max(2, n / e * 48);
      return nt`
                      <rect
                        x="${r * 10 + 0.5}" y="${52 - c}"
                        width="9" height="${c}" rx="2"
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
    var l, d, f;
    if (!this.open || !this.nodeType) return _;
    const s = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, e = s.colour || (ki[this.nodeType] ?? "#9e9e9e"), o = s.icon || Si[this.nodeType] || "mdi:lightning-bolt", i = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = Ns(this.nodeType, s, t), r = !!s.soc && (["battery", "ev"].includes(this.nodeType) || !mt.includes(this.nodeType)), c = r ? Ms(t, s.soc) : null;
    return m`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, o, i)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(c) : _}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : _}
          ${this._sectionChart(e)}
        </div>
      </div>
    `;
  }
};
k.styles = G`
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
  w({ attribute: !1 })
], k.prototype, "hass", 2);
R([
  w({ attribute: !1 })
], k.prototype, "config", 2);
R([
  w()
], k.prototype, "nodeType", 2);
R([
  w({ type: Boolean })
], k.prototype, "open", 2);
R([
  $t()
], k.prototype, "_hourly", 2);
R([
  $t()
], k.prototype, "_loading", 2);
k = R([
  K("hec-node-detail")
], k);
var Ni = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, dt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Mi(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && Ni(t, e, i), i;
};
function Hi(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const Ui = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let I = class extends A {
  constructor() {
    super(...arguments), this._dialogType = null, this._lineLayout = {
      width: 0,
      height: 0,
      centers: {}
    }, this._measureFrame = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => this._scheduleMeasureLineLayout());
  }
  disconnectedCallback() {
    var s;
    (s = this._resizeObserver) == null || s.disconnect(), this._resizeObserver = void 0, this._measureFrame !== null && cancelAnimationFrame(this._measureFrame), this._measureFrame = null, super.disconnectedCallback();
  }
  firstUpdated() {
    const s = this.renderRoot.querySelector(".grid");
    s && this._resizeObserver && this._resizeObserver.observe(s), this._scheduleMeasureLineLayout();
  }
  updated(s) {
    s.has("config") && this._scheduleMeasureLineLayout();
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(s) {
    var t;
    return s in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(s) {
    var e, o, i;
    const t = ((o = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : o[s]) ?? {};
    return Ns(s, t, ((i = this.hass) == null ? void 0 : i.states) ?? {});
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
    var i, n, r, c;
    const t = (r = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[s]) == null ? void 0 : r.soc;
    if (!t || !this.hass) return null;
    const e = (c = this.hass.states[t]) == null ? void 0 : c.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const o = parseFloat(e);
    return isNaN(o) ? null : o;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _scheduleMeasureLineLayout() {
    this._measureFrame === null && (this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = null, this._measureLineLayout();
    }));
  }
  _measureLineLayout() {
    const s = this.renderRoot.querySelector(".grid");
    if (!s) return;
    const t = s.getBoundingClientRect();
    if (!t.width || !t.height) return;
    const e = {}, o = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const r of o) {
      if (r.classList.contains("hidden")) continue;
      const c = r.dataset.nodeType;
      if (!c) continue;
      const l = r.getBoundingClientRect();
      e[c] = {
        x: l.left - t.left + l.width / 2,
        y: l.top - t.top + l.height / 2
      };
    }
    const i = {
      width: t.width,
      height: t.height,
      centers: e
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
    ].filter((s) => this._isVisible(s));
  }
  _svgLines() {
    var o, i, n, r;
    const s = ((i = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, t = ((r = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : r.animation) !== !1, e = this._lineLayout.centers.home;
    return !e || !this._lineLayout.width || !this._lineLayout.height ? _ : nt`
      ${bs(
      this._lineTypes(),
      (c) => c,
      (c) => {
        var y, $, b;
        const l = this._flowInfo(c), d = this._lineLayout.centers[c];
        if (!d) return _;
        const f = l.direction === "idle", p = l.direction === "from-home", v = Hi(l.magnitude, s && !f), g = Ui[c] ?? ((b = ($ = (y = this.config) == null ? void 0 : y.entity_types) == null ? void 0 : $[c]) == null ? void 0 : b.colour) ?? "#9e9e9e", u = [
          "flow-line",
          p ? "reverse" : "",
          f ? "idle" : "",
          t ? "" : "paused"
        ].filter(Boolean).join(" ");
        return nt`
            <line
              x1="${d.x}" y1="${d.y}" x2="${e.x}" y2="${e.y}"
              stroke="${g}"
              class="${u}"
              style="--flow-dur:${v}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var c, l, d;
    const o = s === "home" ? !0 : this._isVisible(s), i = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, r = this._flowInfo(s);
    return m`
      <hec-energy-node
        data-node-type=${s}
        class="${t}${o ? "" : " hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${r.power}
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
      (t) => !mt.includes(t)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: A1→B3→A3→C3→B4→A4→C4…
   */
  _customSlot(s) {
    if (s === 0) return [1, 1];
    const t = s - 1;
    return [[2, 1, 3][t % 3], 3 + Math.floor(t / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(s, t, e) {
    var c, l, d;
    const o = this._isVisible(s), i = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, r = this._flowInfo(s);
    return m`
      <hec-energy-node
        data-node-type=${s}
        style="grid-column:${t}; grid-row:${e}"
        class="${o ? "" : "hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${r.power}
        .soc=${i.soc ? this._soc(s) : null}
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
    if (!this.config) return _;
    const s = this._customTypes();
    return 2 + Math.ceil(s.length / 3), m`
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
        ${bs(s, (t) => t, (t, e) => {
      const [o, i] = this._customSlot(e);
      return this._customNode(t, o, i);
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
I.styles = G`
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
dt([
  w({ attribute: !1 })
], I.prototype, "hass", 2);
dt([
  w({ attribute: !1 })
], I.prototype, "config", 2);
dt([
  $t()
], I.prototype, "_dialogType", 2);
dt([
  $t()
], I.prototype, "_lineLayout", 2);
I = dt([
  K("hec-flow-layout")
], I);
var Di = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, Dt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ji(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && Di(t, e, i), i;
};
let ht = class extends A {
  setConfig(s) {
    this.config = yt(s);
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
ht.styles = G`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Dt([
  w({ attribute: !1 })
], ht.prototype, "hass", 2);
Dt([
  w({ attribute: !1 })
], ht.prototype, "config", 2);
ht = Dt([
  K("home-energy-card")
], ht);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  ht as HomeEnergyCard
};
