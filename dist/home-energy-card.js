/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = globalThis, fe = Zt.ShadowRoot && (Zt.ShadyCSS === void 0 || Zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ye = Symbol(), Es = /* @__PURE__ */ new WeakMap();
let Js = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== ye) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (fe && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Es.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Es.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const li = (e) => new Js(typeof e == "string" ? e : e + "", void 0, ye), $t = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new Js(s, e, ye);
}, hi = (e, t) => {
  if (fe) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Zt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, Cs = fe ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return li(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: di, defineProperty: ui, getOwnPropertyDescriptor: pi, getOwnPropertyNames: fi, getOwnPropertySymbols: yi, getPrototypeOf: gi } = Object, Q = globalThis, Ss = Q.trustedTypes, mi = Ss ? Ss.emptyScript : "", ne = Q.reactiveElementPolyfillSupport, Ot = (e, t) => e, te = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? mi : null;
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
} }, ge = (e, t) => !di(e, t), As = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: ge };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Q.litPropertyMetadata ?? (Q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let vt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = As) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && ui(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: r } = pi(this.prototype, t) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: o, set(n) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? As;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ot("elementProperties"))) return;
    const t = gi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ot("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ot("properties"))) {
      const s = this.properties, i = [...fi(s), ...yi(s)];
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
      for (const o of i) s.unshift(Cs(o));
    } else t !== void 0 && s.push(Cs(t));
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
    return hi(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : te).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var r, n;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : te;
      this._$Em = o;
      const d = l.fromAttribute(s, a.type);
      this[o] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, r) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ge)(r, s) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? s ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
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
vt.elementStyles = [], vt.shadowRootOptions = { mode: "open" }, vt[Ot("elementProperties")] = /* @__PURE__ */ new Map(), vt[Ot("finalized")] = /* @__PURE__ */ new Map(), ne == null || ne({ ReactiveElement: vt }), (Q.reactiveElementVersions ?? (Q.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = globalThis, Ts = (e) => e, ee = zt.trustedTypes, ks = ee ? ee.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qs = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, ti = "?" + J, _i = `<${ti}>`, pt = document, Rt = () => pt.createComment(""), Dt = (e) => e === null || typeof e != "object" && typeof e != "function", me = Array.isArray, vi = (e) => me(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", re = `[ 	
\f\r]`, Mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ps = /-->/g, Ms = />/g, rt = RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ls = /'/g, Os = /"/g, ei = /^(?:script|style|textarea|title)$/i, si = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), w = si(1), Nt = si(2), ft = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), zs = /* @__PURE__ */ new WeakMap(), ht = pt.createTreeWalker(pt, 129);
function ii(e, t) {
  if (!me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ks !== void 0 ? ks.createHTML(t) : t;
}
const bi = (e, t) => {
  const s = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Mt;
  for (let a = 0; a < s; a++) {
    const l = e[a];
    let d, p, u = -1, g = 0;
    for (; g < l.length && (n.lastIndex = g, p = n.exec(l), p !== null); ) g = n.lastIndex, n === Mt ? p[1] === "!--" ? n = Ps : p[1] !== void 0 ? n = Ms : p[2] !== void 0 ? (ei.test(p[2]) && (o = RegExp("</" + p[2], "g")), n = rt) : p[3] !== void 0 && (n = rt) : n === rt ? p[0] === ">" ? (n = o ?? Mt, u = -1) : p[1] === void 0 ? u = -2 : (u = n.lastIndex - p[2].length, d = p[1], n = p[3] === void 0 ? rt : p[3] === '"' ? Os : Ls) : n === Os || n === Ls ? n = rt : n === Ps || n === Ms ? n = Mt : (n = rt, o = void 0);
    const y = n === rt && e[a + 1].startsWith("/>") ? " " : "";
    r += n === Mt ? l + _i : u >= 0 ? (i.push(d), l.slice(0, u) + Qs + l.slice(u) + J + y) : l + J + (u === -2 ? a : y);
  }
  return [ii(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Vt {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [d, p] = bi(t, s);
    if (this.el = Vt.createElement(d, i), ht.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = ht.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Qs)) {
          const g = p[n++], y = o.getAttribute(u).split(J), f = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: f[2], strings: y, ctor: f[1] === "." ? $i : f[1] === "?" ? xi : f[1] === "@" ? Ei : oe }), o.removeAttribute(u);
        } else u.startsWith(J) && (l.push({ type: 6, index: r }), o.removeAttribute(u));
        if (ei.test(o.tagName)) {
          const u = o.textContent.split(J), g = u.length - 1;
          if (g > 0) {
            o.textContent = ee ? ee.emptyScript : "";
            for (let y = 0; y < g; y++) o.append(u[y], Rt()), ht.nextNode(), l.push({ type: 2, index: ++r });
            o.append(u[g], Rt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ti) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(J, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += J.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const i = pt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function wt(e, t, s = e, i) {
  var n, a;
  if (t === ft) return t;
  let o = i !== void 0 ? (n = s._$Co) == null ? void 0 : n[i] : s._$Cl;
  const r = Dt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = wt(e, o._$AS(e, t.values), o, i)), t;
}
class wi {
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? pt).importNode(s, !0);
    ht.currentNode = o;
    let r = ht.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new xt(r, r.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (d = new Ci(r, this, t)), this._$AV.push(d), l = i[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = ht.nextNode(), n++);
    }
    return ht.currentNode = pt, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class xt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = wt(this, t, s), Dt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== ft && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && Dt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(pt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Vt.createElement(ii(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(s);
    else {
      const n = new wi(o, this), a = n.u(this.options);
      n.p(s), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = zs.get(t.strings);
    return s === void 0 && zs.set(t.strings, s = new Vt(t)), s;
  }
  k(t) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const r of t) o === s.length ? s.push(i = new xt(this.O(Rt()), this.O(Rt()), this, this.options)) : i = s[o], i._$AI(r), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = Ts(t).nextSibling;
      Ts(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class oe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, r) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, s = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = wt(this, t, s, 0), n = !Dt(t) || t !== this._$AH && t !== ft, n && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = r[0], l = 0; l < r.length - 1; l++) d = wt(this, a[i + l], s, l), d === ft && (d = this._$AH[l]), n || (n = !Dt(d) || d !== this._$AH[l]), d === v ? t = v : t !== v && (t += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class $i extends oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class xi extends oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class Ei extends oe {
  constructor(t, s, i, o, r) {
    super(t, s, i, o, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = wt(this, t, s, 0) ?? v) === ft) return;
    const i = this._$AH, o = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== v && (i === v || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ci {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    wt(this, t);
  }
}
const Si = { I: xt }, ae = zt.litHtmlPolyfillSupport;
ae == null || ae(Vt, xt), (zt.litHtmlVersions ?? (zt.litHtmlVersions = [])).push("3.3.2");
const Ai = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new xt(t.insertBefore(Rt(), r), r, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis;
let j = class extends vt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ai(s, this.renderRoot, this.renderOptions);
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
    return ft;
  }
};
var Xs;
j._$litElement$ = !0, j.finalized = !0, (Xs = ut.litElementHydrateSupport) == null || Xs.call(ut, { LitElement: j });
const ce = ut.litElementPolyfillSupport;
ce == null || ce({ LitElement: j });
(ut.litElementVersions ?? (ut.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ti = { attribute: !0, type: String, converter: te, reflect: !1, hasChanged: ge }, ki = (e = Ti, t, s) => {
  const { kind: i, metadata: o } = s;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), i === "accessor") {
    const { name: n } = s;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: n } = s;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function C(e) {
  return (t, s) => typeof s == "object" ? ki(e, t, s) : ((i, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ft(e) {
  return C({ ...e, state: !0, attribute: !1 });
}
const _e = (e) => e.attributes.device_class ?? "", ve = (e) => e.attributes.unit_of_measurement ?? "", be = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function lt(...e) {
  return (t, s) => {
    let i = 0;
    _e(s) === "power" && (i += 4), ["W", "kW"].includes(ve(s)) && (i += 2);
    const o = be(t, s);
    for (const r of e) o.includes(r) && (i += 1);
    return i;
  };
}
function bt(...e) {
  return (t, s) => {
    let i = 0;
    _e(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(ve(s)) && (i += 2);
    const o = be(t, s);
    for (const r of e) o.includes(r) && (i += 1);
    return i;
  };
}
function Ns(...e) {
  return (t, s) => {
    let i = 0;
    _e(s) === "battery" && (i += 4), ve(s) === "%" && (i += 2);
    const o = be(t, s);
    for (const r of e) o.includes(r) && (i += 1);
    return i;
  };
}
function Gt(e, t = []) {
  return (s, i) => {
    const o = s.toLowerCase();
    if (t.some((n) => o.includes(n))) return 0;
    let r = 0;
    for (const n of e) o.includes(n) && (r += 4);
    return r;
  };
}
function T(e, t, s, i) {
  let o, r = 0;
  for (const n of e) {
    if (i.has(n)) continue;
    const a = t[n];
    if (!a) continue;
    const l = s(n, a);
    l > r && (r = l, o = n);
  }
  return o && i.add(o), o;
}
function Pi(e, t, s) {
  const i = Object.values(t).some(
    (_) => _.platform === "octopus_energy" && !_.disabled_by
  ), o = Object.keys(e).filter((_) => _.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const r = o.filter(
    (_) => _.includes("octopus_energy_electricity")
  ), n = ["Octopus Energy"], a = {}, l = {}, d = T(
    r,
    e,
    Gt(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (a.rate_entity = d, n.push("rate"));
  const p = T(
    r,
    e,
    Gt(["_current_accumulative_cost"]),
    s
  );
  p && (a.cost_entity = p, n.push("cost"));
  const u = T(
    r,
    e,
    Gt(["_current_day_rates"]),
    s
  );
  u && (a.slots_entity = u, n.push("slots"));
  const g = T(
    o.filter((_) => _.startsWith("binary_sensor.")),
    e,
    Gt(["_intelligent_dispatching"]),
    s
  );
  g && (a.dispatches_entity = g, n.push("dispatching")), Object.keys(a).length && (l.octopus = a);
  const y = T(
    r,
    e,
    lt("import", "demand", "current"),
    s
  );
  y && (l.power_import = y, n.push("import power"));
  const f = T(
    r,
    e,
    lt("export", "demand", "current"),
    s
  );
  f && (l.power_export = f, n.push("export power"));
  const m = T(
    r,
    e,
    bt("import", "accumulative", "consumption"),
    s
  );
  m && (l.daily_usage = m, n.push("daily import"));
  const b = T(
    r,
    e,
    bt("export", "accumulative"),
    s
  );
  return b && (l.daily_export = b, n.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: n };
}
function Mi(e, t, s) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), o = Object.keys(e).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const r = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(e).filter((f) => f.includes("powerwall") || f.includes("tesla")), n = r.filter((f) => f.includes("powerwall")), a = r.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (n.length > 0) {
    const f = {}, m = T(
      n,
      e,
      Ns("battery", "soc", "charge", "percent"),
      s
    );
    m && (f.soc = m);
    const b = T(
      n,
      e,
      lt("battery", "power", "charge", "discharge"),
      s
    );
    b && (f.power_combined = b);
    const _ = T(
      n,
      e,
      bt("battery", "today", "daily", "charged"),
      s
    );
    _ && (f.daily_usage = _), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const p = T(
    r,
    e,
    lt("solar"),
    s
  );
  if (p) {
    const f = { power_combined: p }, m = T(
      r,
      e,
      bt("solar"),
      s
    );
    m && (f.daily_usage = m), d.solar = f, l.push("solar");
  }
  const u = T(
    r,
    e,
    lt("load", "home", "house"),
    s
  );
  if (u) {
    const f = { power_combined: u }, m = T(
      r,
      e,
      bt("load", "home", "house"),
      s
    );
    m && (f.daily_usage = m), d.home = f, l.push("home load");
  }
  const g = T(
    r,
    e,
    lt("grid"),
    s
  );
  g && (d.grid = { power_combined: g }, l.push("grid"));
  const y = T(
    a,
    e,
    Ns("battery", "battery_level", "soc", "charge"),
    s
  );
  if (y) {
    const f = { soc: y }, m = T(
      a,
      e,
      lt("charg", "power"),
      s
    );
    m && (f.power_combined = m);
    const b = T(
      a,
      e,
      bt("charg", "energy"),
      s
    );
    b && (f.daily_usage = b), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function Li(e) {
  var l, d;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), r = Mi(s, i, o), n = Pi(s, i, o), a = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (r && (a.integration_type = "tesla", Object.assign(a.entity_types, r.entity_types), a.summary.push(...r.summary ?? [])), n) {
    if (a.integration_type !== "tesla" && (a.integration_type = "octopus"), (l = n.entity_types) != null && l.grid) {
      const p = n.entity_types.grid;
      a.entity_types.grid = {
        ...a.entity_types.grid,
        ...p,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: p.power_import || (d = a.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    n.tariff_entity && (a.tariff_entity = n.tariff_entity), a.summary.push(...n.summary ?? []);
  }
  return a;
}
function Oi(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = e.entity_types ?? {}, r = { ...o };
  for (const [n, a] of Object.entries(t.entity_types)) {
    const l = o[n] ?? {}, d = { ...l };
    for (const [p, u] of Object.entries(a))
      u !== void 0 && (s || !l[p]) && (d[p] = u);
    r[n] = d;
  }
  return i.entity_types = r, i;
}
const se = ["grid", "solar", "battery", "home", "ev"], zi = "custom_", Xt = 4;
function Hs(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function Ni(e) {
  return `${zi}${e + 1}`;
}
function Kt(e) {
  if (Array.isArray(e)) {
    const t = e.map((s) => typeof s == "string" ? s.trim() : "");
    return t.length ? t : void 0;
  }
  if (typeof e == "string" && e.trim()) return [e.trim()];
}
function Rs(e) {
  const t = Kt(e.import_power ?? e.power_import), s = Kt(e.export_power ?? e.power_export), i = Kt(e.combined_power ?? e.power_combined);
  return {
    ...e,
    power_import: void 0,
    power_export: void 0,
    power_combined: void 0,
    import_power: t,
    export_power: s,
    combined_power: i,
    daily_usage: Kt(e.daily_usage)
  };
}
function Jt(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([n]) => se.includes(n)
    )
  ), i = Object.entries(t).filter(([n]) => !se.includes(n)).sort(([n], [a]) => Hs(n) - Hs(a)).map(([, n]) => Rs({ ...n })), o = Array.isArray(e.custom_types) ? e.custom_types.map((n) => Rs({ ...n })) : i, r = {
    ...s
  };
  return o.forEach((n, a) => {
    r[Ni(a)] = { ...n };
  }), {
    ...e,
    entity_types: r,
    custom_types: o
  };
}
var Hi = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, we = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ri(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Hi(t, s, o), o;
};
let It = class extends j {
  setConfig(e) {
    this.config = Jt(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: Jt(e) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var t, s, i;
    if ((((s = (t = this.config) == null ? void 0 : t.custom_types) == null ? void 0 : s.length) ?? 0) >= Xt) return;
    const e = [...((i = this.config) == null ? void 0 : i.custom_types) ?? [], {}];
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
  _multiEntityValue(e) {
    return Array.isArray(e) ? e : e ? [e] : [];
  }
  _customEntityValues(e, t) {
    const s = this._multiEntityValue(e[t]);
    return s.length ? s : [""];
  }
  _setCustomTypeEntityAt(e, t, s, i) {
    var n, a;
    const o = ((a = (n = this.config) == null ? void 0 : n.custom_types) == null ? void 0 : a[e]) ?? {}, r = [...this._customEntityValues(o, t)];
    r[s] = i ?? "", this._setCustomType(e, {
      [t]: r.map((l) => l.trim())
    });
  }
  _addCustomTypeEntity(e, t) {
    var r, n;
    const s = ((n = (r = this.config) == null ? void 0 : r.custom_types) == null ? void 0 : n[e]) ?? {}, o = [...[...this._customEntityValues(s, t)], ""];
    this._setCustomType(e, {
      [t]: o
    });
  }
  _deleteCustomTypeEntity(e, t, s) {
    var n, a;
    const i = ((a = (n = this.config) == null ? void 0 : n.custom_types) == null ? void 0 : a[e]) ?? {}, o = [...this._customEntityValues(i, t)];
    o.splice(s, 1);
    const r = o.map((l) => l.trim());
    this._setCustomType(e, {
      [t]: r.length ? r : void 0
    });
  }
  render() {
    var i, o, r, n, a, l, d, p, u, g, y, f, m, b, _, M, L, E, A, k, O, N, H, R, D, K, W, Ct, Z, X, mt, _t, et, st, it, q, Y, ot, St, At, Tt, $, x, P, U, F, kt, Pt, xe, Ee, Ce, Se, Ae, Te, ke, Pe, Me, Le, Oe, ze, Ne, He, Re, De, Ve, Ie, Ue, Fe, Be, je, Ge, Ke, We, qe, Ye, Ze, Xe, Je, Qe, ts, es, ss, is, os, ns, rs, as, cs, ls, hs, ds, us, ps, fs, ys, gs, ms, _s, vs, bs, ws, $s;
    if (!this.config) return v;
    const e = this.config.custom_types ?? [], t = e.slice(0, Xt), s = e.length >= Xt;
    return w`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: Jt(
            Oi(this.config, Li(this.hass), !1)
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

          <div class="switch-row">
            <span>Dynamic Custom Placement</span>
            <ha-switch
              .checked=${this.config.dynamic_custom_placement ?? !0}
              @change=${(h) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            dynamic_custom_placement: h.target.checked
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
            .value=${((o = (i = this.config.entity_types) == null ? void 0 : i.grid) == null ? void 0 : o.power_import) ?? ""}
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
            .value=${((n = (r = this.config.entity_types) == null ? void 0 : r.grid) == null ? void 0 : n.power_export) ?? ""}
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
            .value=${((l = (a = this.config.entity_types) == null ? void 0 : a.grid) == null ? void 0 : l.power_combined) ?? ""}
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
            .value=${((p = (d = this.config.entity_types) == null ? void 0 : d.grid) == null ? void 0 : p.daily_usage) ?? ""}
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
            .value=${((g = (u = this.config.entity_types) == null ? void 0 : u.grid) == null ? void 0 : g.export_rate) ?? ""}
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
              .checked=${((f = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : f.show_zero) ?? !0}
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
            .value=${((b = (m = this.config.entity_types) == null ? void 0 : m.grid) == null ? void 0 : b.zero_tolerance) != null ? String((M = (_ = this.config.entity_types) == null ? void 0 : _.grid) == null ? void 0 : M.zero_tolerance) : ""}
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
              .checked=${((E = (L = this.config.entity_types) == null ? void 0 : L.grid) == null ? void 0 : E.show_label) ?? !0}
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
            .value=${((k = (A = this.config.entity_types) == null ? void 0 : A.grid) == null ? void 0 : k.label) ?? ""}
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
            .value=${((N = (O = this.config.entity_types) == null ? void 0 : O.grid) == null ? void 0 : N.icon) ?? ""}
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
            .value=${((R = (H = this.config.entity_types) == null ? void 0 : H.grid) == null ? void 0 : R.colour) ?? ""}
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
            .value=${((K = (D = this.config.entity_types) == null ? void 0 : D.solar) == null ? void 0 : K.power_combined) ?? ""}
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
            .value=${((Ct = (W = this.config.entity_types) == null ? void 0 : W.solar) == null ? void 0 : Ct.daily_usage) ?? ""}
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
              .checked=${((X = (Z = this.config.entity_types) == null ? void 0 : Z.solar) == null ? void 0 : X.show_zero) ?? !0}
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
            .value=${((_t = (mt = this.config.entity_types) == null ? void 0 : mt.solar) == null ? void 0 : _t.zero_tolerance) != null ? String((st = (et = this.config.entity_types) == null ? void 0 : et.solar) == null ? void 0 : st.zero_tolerance) : ""}
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
              .checked=${((q = (it = this.config.entity_types) == null ? void 0 : it.solar) == null ? void 0 : q.show_label) ?? !0}
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
            .value=${((ot = (Y = this.config.entity_types) == null ? void 0 : Y.solar) == null ? void 0 : ot.label) ?? ""}
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
            .value=${((At = (St = this.config.entity_types) == null ? void 0 : St.solar) == null ? void 0 : At.icon) ?? ""}
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
            .value=${(($ = (Tt = this.config.entity_types) == null ? void 0 : Tt.solar) == null ? void 0 : $.colour) ?? ""}
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
            .value=${((P = (x = this.config.entity_types) == null ? void 0 : x.battery) == null ? void 0 : P.soc) ?? ""}
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
            .value=${((F = (U = this.config.entity_types) == null ? void 0 : U.battery) == null ? void 0 : F.power_combined) ?? ""}
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
            .value=${((Pt = (kt = this.config.entity_types) == null ? void 0 : kt.battery) == null ? void 0 : Pt.daily_usage) ?? ""}
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
              .checked=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.battery) == null ? void 0 : Ee.show_zero) ?? !0}
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
            .value=${((Se = (Ce = this.config.entity_types) == null ? void 0 : Ce.battery) == null ? void 0 : Se.zero_tolerance) != null ? String((Te = (Ae = this.config.entity_types) == null ? void 0 : Ae.battery) == null ? void 0 : Te.zero_tolerance) : ""}
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
            <span>Reverse Power Flow</span>
            <ha-switch
              .checked=${((Pe = (ke = this.config.entity_types) == null ? void 0 : ke.battery) == null ? void 0 : Pe.reverse_power_flow) ?? !1}
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
                  reverse_power_flow: h.target.checked
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((Le = (Me = this.config.entity_types) == null ? void 0 : Me.battery) == null ? void 0 : Le.show_label) ?? !0}
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
            .value=${((ze = (Oe = this.config.entity_types) == null ? void 0 : Oe.battery) == null ? void 0 : ze.label) ?? ""}
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
            .value=${((He = (Ne = this.config.entity_types) == null ? void 0 : Ne.battery) == null ? void 0 : He.icon) ?? ""}
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
            .value=${((De = (Re = this.config.entity_types) == null ? void 0 : Re.battery) == null ? void 0 : De.colour) ?? ""}
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
            .value=${((Ie = (Ve = this.config.entity_types) == null ? void 0 : Ve.home) == null ? void 0 : Ie.power_combined) ?? ""}
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
            .value=${((Fe = (Ue = this.config.entity_types) == null ? void 0 : Ue.home) == null ? void 0 : Fe.daily_usage) ?? ""}
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
              .checked=${((je = (Be = this.config.entity_types) == null ? void 0 : Be.home) == null ? void 0 : je.show_zero) ?? !0}
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
            .value=${((Ke = (Ge = this.config.entity_types) == null ? void 0 : Ge.home) == null ? void 0 : Ke.zero_tolerance) != null ? String((qe = (We = this.config.entity_types) == null ? void 0 : We.home) == null ? void 0 : qe.zero_tolerance) : ""}
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
              .checked=${((Ze = (Ye = this.config.entity_types) == null ? void 0 : Ye.home) == null ? void 0 : Ze.show_label) ?? !0}
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
            .value=${((Je = (Xe = this.config.entity_types) == null ? void 0 : Xe.home) == null ? void 0 : Je.label) ?? ""}
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
            .value=${((ts = (Qe = this.config.entity_types) == null ? void 0 : Qe.home) == null ? void 0 : ts.icon) ?? ""}
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
            .value=${((ss = (es = this.config.entity_types) == null ? void 0 : es.home) == null ? void 0 : ss.colour) ?? ""}
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
            .value=${((os = (is = this.config.entity_types) == null ? void 0 : is.ev) == null ? void 0 : os.power_combined) ?? ""}
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
            .value=${((rs = (ns = this.config.entity_types) == null ? void 0 : ns.ev) == null ? void 0 : rs.soc) ?? ""}
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
            .value=${((cs = (as = this.config.entity_types) == null ? void 0 : as.ev) == null ? void 0 : cs.daily_usage) ?? ""}
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
              .checked=${((hs = (ls = this.config.entity_types) == null ? void 0 : ls.ev) == null ? void 0 : hs.show_zero) ?? !0}
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
            .value=${((us = (ds = this.config.entity_types) == null ? void 0 : ds.ev) == null ? void 0 : us.zero_tolerance) != null ? String((fs = (ps = this.config.entity_types) == null ? void 0 : ps.ev) == null ? void 0 : fs.zero_tolerance) : ""}
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
            <span>Subtract from Home</span>
            <ha-switch
              .checked=${this.config.ev_subtract_from_home ?? !1}
              @change=${(h) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            ev_subtract_from_home: h.target.checked
          }
        },
        bubbles: !0,
        composed: !0
      })
    )}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((gs = (ys = this.config.entity_types) == null ? void 0 : ys.ev) == null ? void 0 : gs.show_label) ?? !0}
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
            .value=${((_s = (ms = this.config.entity_types) == null ? void 0 : ms.ev) == null ? void 0 : _s.label) ?? ""}
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
            .value=${((bs = (vs = this.config.entity_types) == null ? void 0 : vs.ev) == null ? void 0 : bs.icon) ?? ""}
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
            .value=${(($s = (ws = this.config.entity_types) == null ? void 0 : ws.ev) == null ? void 0 : $s.colour) ?? ""}
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

      <button
        class="action-button primary"
        type="button"
        ?disabled=${s}
        @click=${() => this._addCustomType()}
      >
        <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
        Add Custom Type
      </button>
      ${s ? w`<div class="helper-text">Maximum of 4 Custom types allowed</div>` : v}

      ${t.map((h, c) => {
      var xs;
      return w`
        <ha-expansion-panel header=${((xs = h.label) == null ? void 0 : xs.trim()) || `Custom ${c + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(c)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <div class="field-group">
              <div class="field-group-label">Import Power Entities</div>
              ${this._customEntityValues(h, "import_power").map((S, z) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Import Power Entity ${z + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${S}
                    @value-changed=${(nt) => this._setCustomTypeEntityAt(c, "import_power", z, nt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Import Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(c, "import_power", z)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(c, "import_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Export Power Entities</div>
              ${this._customEntityValues(h, "export_power").map((S, z) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Export Power Entity ${z + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${S}
                    @value-changed=${(nt) => this._setCustomTypeEntityAt(c, "export_power", z, nt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Export Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(c, "export_power", z)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(c, "export_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Combined Power Entities</div>
              ${this._customEntityValues(h, "combined_power").map((S, z) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Combined Power Entity ${z + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${S}
                    @value-changed=${(nt) => this._setCustomTypeEntityAt(c, "combined_power", z, nt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Combined Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(c, "combined_power", z)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(c, "combined_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Daily Usage Entities</div>
              ${this._customEntityValues(h, "daily_usage").map((S, z) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Daily Usage Entity ${z + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${S}
                    @value-changed=${(nt) => this._setCustomTypeEntityAt(c, "daily_usage", z, nt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Daily Usage Entity"
                    @click=${() => this._deleteCustomTypeEntity(c, "daily_usage", z)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(c, "daily_usage")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <ha-selector
              label="State of Charge Entity"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(S) => this._setCustomType(c, { soc: S.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(S) => this._setCustomType(c, {
        show_zero: S.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(S) => this._setCustomType(c, {
        zero_tolerance: S.target.value !== "" ? Number(S.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Subtract from Home</span>
              <ha-switch
                .checked=${h.subtract_from_home ?? !1}
                @change=${(S) => this._setCustomType(c, {
        subtract_from_home: S.target.checked
      })}
              ></ha-switch>
            </div>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(S) => this._setCustomType(c, {
        show_label: S.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(S) => this._setCustomType(c, {
        label: S.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(S) => this._setCustomType(c, {
        icon: S.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(S) => this._setCustomType(c, {
        colour: S.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    `;
  }
};
It.styles = $t`
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

    .helper-text {
      font-size: 0.84em;
      line-height: 1.35;
      color: var(--secondary-text-color);
      padding: 0 2px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0 2px;
    }

    .field-group-label {
      font-size: 0.92em;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 0 2px;
    }

    .entity-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px;
      align-items: end;
    }

    .icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid color-mix(in srgb, var(--divider-color, #d0d0d0) 80%, transparent);
      background: var(--card-background-color, #fff);
      color: var(--secondary-text-color);
      cursor: pointer;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .icon-button.delete {
      color: var(--error-color);
      border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
    }

    .inline-action {
      width: auto;
      align-self: flex-start;
      padding: 0 12px;
      min-height: 36px;
      font-weight: 500;
    }
  `;
we([
  C({ attribute: !1 })
], It.prototype, "hass", 2);
we([
  C({ attribute: !1 })
], It.prototype, "config", 2);
It = we([
  Et("home-energy-card-editor")
], It);
var Di = Object.defineProperty, Vi = Object.getOwnPropertyDescriptor, Bt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Vi(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Di(t, s, o), o;
};
function Wt(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function qt(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function Ii(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let yt = class extends j {
  constructor() {
    super(...arguments), this.showTitle = !0, this.showValues = !0;
  }
  render() {
    var _, M, L, E, A, k, O, N, H, R, D;
    if (!this.config) return v;
    const e = ((_ = this.hass) == null ? void 0 : _.states) ?? {}, t = this.config.entity_types ?? {}, s = ((M = this.config.display) == null ? void 0 : M.decimal_places) ?? 1, i = this.config.tariff_entity ? (L = e[this.config.tariff_entity]) == null ? void 0 : L.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Ii(i) : null, r = Wt(e, (E = t.solar) == null ? void 0 : E.daily_usage), n = Wt(e, (A = t.home) == null ? void 0 : A.daily_usage), a = Wt(e, (k = t.grid) == null ? void 0 : k.daily_usage), l = Wt(e, (O = t.grid) == null ? void 0 : O.daily_export), d = !!((N = t.solar) != null && N.daily_usage), p = !!((H = t.home) != null && H.daily_usage), u = !!((R = t.grid) != null && R.daily_usage), g = !!((D = t.grid) != null && D.daily_export), y = u || g, f = d || p || y, m = this.showValues && f, b = this.showTitle || o;
    return !b && !m ? v : w`
      <div class="header">

        ${b ? w`
          <div class="title-row">
            ${this.showTitle ? w`<span class="title">${this.config.title ?? "Home Energy"}</span>` : v}
            ${o ? w`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : v}
          </div>
        ` : v}

        ${m ? w`
          <div class="stats-row">

            ${d ? w`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${qt(r, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${p ? w`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${qt(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${y ? w`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${u ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${qt(a, s)}</span>
                    </div>
                  ` : v}
                  ${g ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${qt(l, s)}</span>
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
yt.styles = $t`
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
Bt([
  C({ attribute: !1 })
], yt.prototype, "hass", 2);
Bt([
  C({ attribute: !1 })
], yt.prototype, "config", 2);
Bt([
  C({ type: Boolean })
], yt.prototype, "showTitle", 2);
Bt([
  C({ type: Boolean })
], yt.prototype, "showValues", 2);
yt = Bt([
  Et("hec-card-header")
], yt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = { CHILD: 2 }, Fi = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Bi = class {
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
const { I: ji } = Si, Ds = (e) => e, Vs = () => document.createComment(""), Lt = (e, t, s) => {
  var r;
  const i = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const n = i.insertBefore(Vs(), o), a = i.insertBefore(Vs(), o);
    s = new ji(n, a, e, e.options);
  } else {
    const n = s._$AB.nextSibling, a = s._$AM, l = a !== e;
    if (l) {
      let d;
      (r = s._$AQ) == null || r.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== a._$AU && s._$AP(d);
    }
    if (n !== o || l) {
      let d = s._$AA;
      for (; d !== n; ) {
        const p = Ds(d).nextSibling;
        Ds(i).insertBefore(d, o), d = p;
      }
    }
  }
  return s;
}, at = (e, t, s = e) => (e._$AI(t, s), e), Gi = {}, Ki = (e, t = Gi) => e._$AH = t, Wi = (e) => e._$AH, le = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = (e, t, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = t; o <= s; o++) i.set(e[o], o);
  return i;
}, Us = Fi(class extends Bi {
  constructor(e) {
    if (super(e), e.type !== Ui.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, s) {
    let i;
    s === void 0 ? s = t : t !== void 0 && (i = t);
    const o = [], r = [];
    let n = 0;
    for (const a of e) o[n] = i ? i(a, n) : n, r[n] = s(a, n), n++;
    return { values: r, keys: o };
  }
  render(e, t, s) {
    return this.dt(e, t, s).values;
  }
  update(e, [t, s, i]) {
    const o = Wi(e), { values: r, keys: n } = this.dt(t, s, i);
    if (!Array.isArray(o)) return this.ut = n, r;
    const a = this.ut ?? (this.ut = []), l = [];
    let d, p, u = 0, g = o.length - 1, y = 0, f = r.length - 1;
    for (; u <= g && y <= f; ) if (o[u] === null) u++;
    else if (o[g] === null) g--;
    else if (a[u] === n[y]) l[y] = at(o[u], r[y]), u++, y++;
    else if (a[g] === n[f]) l[f] = at(o[g], r[f]), g--, f--;
    else if (a[u] === n[f]) l[f] = at(o[u], r[f]), Lt(e, l[f + 1], o[u]), u++, f--;
    else if (a[g] === n[y]) l[y] = at(o[g], r[y]), Lt(e, o[u], o[g]), g--, y++;
    else if (d === void 0 && (d = Is(n, y, f), p = Is(a, u, g)), d.has(a[u])) if (d.has(a[g])) {
      const m = p.get(n[y]), b = m !== void 0 ? o[m] : null;
      if (b === null) {
        const _ = Lt(e, o[u]);
        at(_, r[y]), l[y] = _;
      } else l[y] = at(b, r[y]), Lt(e, o[u], b), o[m] = null;
      y++;
    } else le(o[g]), g--;
    else le(o[u]), u++;
    for (; y <= f; ) {
      const m = Lt(e, l[f + 1]);
      at(m, r[y]), l[y++] = m;
    }
    for (; u <= g; ) {
      const m = o[u++];
      m !== null && le(m);
    }
    return this.ut = n, Ki(e, l), ft;
  }
});
var qi = Object.defineProperty, Yi = Object.getOwnPropertyDescriptor, I = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Yi(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && qi(t, s, o), o;
};
const oi = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, ni = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, ue = 38, Fs = +(2 * Math.PI * ue).toFixed(4);
function Qt(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
function Bs(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
let V = class extends j {
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
    const e = oi[this.type] ?? ni, t = this.colour || e.accent, s = this.icon || e.icon, i = this.soc !== null, o = this.type === "grid" || this.type === "battery", r = o && this.power !== null ? Math.abs(this.power) : this.power, n = o && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-left-bold-circle" : this.power < 0 ? "mdi:arrow-right-bold-circle" : "" : "", a = i ? Math.max(0, Math.min(100, this.soc)) : 0, l = +(Fs * (1 - a / 100)).toFixed(4);
    return w`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${i ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${ue}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${ue}"
            style="stroke-dasharray:${Fs};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${e.gradStart} 0%,${e.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s}></ha-icon>
          ${this.showLabel ? w`<span class="label" style="color:${t};">${this.label || this.type}</span>` : v}
          <span class="power">${Qt(r, this.unit, this.decimalPlaces)}</span>
          ${n ? w`<ha-icon class="direction-icon" .icon=${n}></ha-icon>` : this.bottomText ? w`<span class="bottom-text">${this.bottomText}</span>` : v}
        </div>

      </div>
    `;
  }
};
V.styles = $t`
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
I([
  C()
], V.prototype, "type", 2);
I([
  C()
], V.prototype, "label", 2);
I([
  C({ type: Boolean })
], V.prototype, "showLabel", 2);
I([
  C()
], V.prototype, "icon", 2);
I([
  C()
], V.prototype, "bottomText", 2);
I([
  C()
], V.prototype, "colour", 2);
I([
  C({ type: Number })
], V.prototype, "power", 2);
I([
  C({ type: Number })
], V.prototype, "soc", 2);
I([
  C()
], V.prototype, "unit", 2);
I([
  C({ type: Number })
], V.prototype, "decimalPlaces", 2);
V = I([
  Et("hec-energy-node")
], V);
function pe(e, t, s = 0) {
  const i = { power: null, magnitude: null, direction: "idle" };
  if (t === null) return i;
  if (Math.abs(t) <= s) return { power: 0, magnitude: null, direction: "idle" };
  const o = Math.abs(t);
  let r;
  switch (e) {
    case "solar":
      r = "to-home";
      break;
    case "grid":
      r = t > 0 ? "to-home" : "from-home";
      break;
    case "battery":
      r = t > 0 ? "to-home" : "from-home";
      break;
    case "ev":
      r = t > 0 ? "from-home" : "to-home";
      break;
    default:
      r = t > 0 ? "from-home" : "to-home";
  }
  return { power: t, magnitude: o, direction: r };
}
function Ht(e) {
  return Array.isArray(e) ? e.filter(Boolean) : typeof e == "string" && e ? [e] : [];
}
function ri(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function he(e, t) {
  var r;
  const s = Ht(t);
  if (!s.length) return null;
  let i = 0, o = 0;
  for (const n of s) {
    const a = e[n];
    if (!a || a.state === "unavailable" || a.state === "unknown") continue;
    const l = parseFloat(a.state);
    isNaN(l) || (i += ri(
      l,
      (r = a.attributes) == null ? void 0 : r.unit_of_measurement
    ), o += 1);
  }
  return o ? i : null;
}
function ai(e, t) {
  var r;
  const s = Ht(t);
  if (!s.length) return null;
  let i = 0, o = 0;
  for (const n of s) {
    const a = e[n];
    if (!a || a.state === "unavailable" || a.state === "unknown") continue;
    const l = parseFloat(a.state);
    if (isNaN(l)) continue;
    const d = (r = a.attributes) == null ? void 0 : r.unit_of_measurement;
    i += d === "Wh" ? l / 1e3 : l, o += 1;
  }
  return o ? i : null;
}
function ci(e, t, s) {
  let i;
  const o = t.combined_power ?? t.power_combined, r = t.import_power ?? t.power_import, n = t.export_power ?? t.power_export;
  if (o)
    i = he(s, o);
  else {
    const a = !!r, l = !!n;
    if (!a && !l) return null;
    const d = a ? he(s, r) : null, p = l ? he(s, n) : null;
    if ((!a || d === null) && (!l || p === null)) return null;
    i = (d ?? 0) - (p ?? 0);
  }
  return e === "battery" && t.reverse_power_flow && (i *= -1), i;
}
function dt(e, t, s) {
  return pe(
    e,
    ci(e, t, s),
    t.zero_tolerance ?? 0
  );
}
var Zi = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, tt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Xi(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Zi(t, s, o), o;
};
const Ji = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Qi = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function to(e, t) {
  const s = Date.now(), i = s - 864e5, o = Array(24).fill(null);
  if (!e.length) return o;
  for (let r = 0; r < 24; r++) {
    const n = i + r * 36e5, a = n + 36e5;
    let l = 0, d = 0;
    for (let p = 0; p < e.length; p++) {
      const u = new Date(e[p].last_changed).getTime(), g = p + 1 < e.length ? new Date(e[p + 1].last_changed).getTime() : s, y = Math.max(u, n), f = Math.min(g, a);
      if (f <= y) continue;
      const m = parseFloat(e[p].state);
      if (isNaN(m)) continue;
      const b = ri(m, t), _ = f - y;
      l += Math.abs(b) * _, d += _;
    }
    d > 0 && (o[r] = l / d);
  }
  return o;
}
function eo(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function Yt(e, t) {
  return ai(e, t);
}
function js(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function so(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  if (isNaN(i)) return null;
  const o = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return o.includes("pence") || o.startsWith("p/") || o === "p" ? i / 100 : i;
}
function de(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function io(e) {
  if (!e.length) return [];
  const t = Math.max(...e.map((i) => i.length), 0), s = Array(t).fill(null);
  for (let i = 0; i < t; i++) {
    let o = 0, r = 0;
    for (const n of e) {
      const a = n[i];
      a != null && (o += a, r += 1);
    }
    s[i] = r ? o : null;
  }
  return s;
}
function oo(e, t = []) {
  const s = Math.max(
    ...[...e, ...t].map((o) => o.length),
    0
  ), i = Array(s).fill(null);
  for (let o = 0; o < s; o++) {
    let r = 0, n = 0;
    for (const a of e) {
      const l = a[o];
      l != null && (r += l, n += 1);
    }
    for (const a of t) {
      const l = a[o];
      l != null && (r -= l, n += 1);
    }
    i[o] = n ? r : null;
  }
  return i;
}
function ie(e, t) {
  const s = typeof e == "number" ? e : parseFloat(String(e));
  if (isNaN(s)) return null;
  const i = String(t ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? s / 100 : (i.includes("gbp") || i.includes("£"), s);
}
function Gs(e) {
  if (!e) return [];
  const t = e.attributes.unit_of_measurement;
  return (e.attributes.rates ?? e.attributes.current_day_rates ?? e.attributes.today_rates ?? e.attributes.upcoming_interval_rates ?? []).map((i) => {
    const o = new Date(i.start ?? i.start_time ?? "").getTime(), r = new Date(i.end ?? i.end_time ?? "").getTime(), n = ie(
      i.value_inc_vat ?? i.rate_inc_vat ?? i.value ?? i.rate,
      i.unit_of_measurement ?? t
    );
    return !Number.isFinite(o) || !Number.isFinite(r) || !n ? null : { startMs: o, endMs: r, rateGbpPerKwh: n };
  }).filter((i) => i !== null).sort((i, o) => i.startMs - o.startMs);
}
function Ks(e, t, s) {
  if (!e.length) return [];
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const r = new Date(e[o].last_changed).getTime(), n = o + 1 < e.length ? new Date(e[o + 1].last_changed).getTime() : s, a = ie(e[o].state, t);
    !Number.isFinite(r) || !Number.isFinite(n) || n <= r || a !== null && i.push({ startMs: r, endMs: n, rateGbpPerKwh: a });
  }
  return i;
}
function no(e, t) {
  const s = t == null ? void 0 : t.attributes.unit_of_measurement, i = e.map((o) => ie(o.state, s)).filter((o) => o !== null);
  if (i.length > 0) {
    const o = i[0];
    return i.every((r) => Math.abs(r - o) < 1e-9) ? o : null;
  }
  return t ? ie(t.state, s) : null;
}
function ro(e, t) {
  return String(t ?? "").trim().toLowerCase() === "wh" ? e / 1e3 : e;
}
function Ws(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  const i = [];
  let o = !1;
  for (let r = 1; r < e.length; r++) {
    const n = new Date(e[r - 1].last_changed).getTime(), a = new Date(e[r].last_changed).getTime();
    if (!Number.isFinite(n) || !Number.isFinite(a) || a <= n) continue;
    const l = parseFloat(e[r - 1].state), d = parseFloat(e[r].state);
    if (isNaN(l) || isNaN(d)) continue;
    const p = ro(d - l, t);
    if (p <= 0) continue;
    const u = a - n, g = [];
    let y = 0;
    for (const f of s) {
      const m = Math.max(n, f.startMs), b = Math.min(a, f.endMs);
      if (b <= m) continue;
      const _ = b - m;
      y += _, g.push({
        startMs: m,
        endMs: b,
        overlapMs: _,
        rateGbpPerKwh: f.rateGbpPerKwh
      });
    }
    if (y > 0) {
      y < u && (o = !0);
      for (const f of g) {
        const m = p * (f.overlapMs / y);
        i.push({
          startMs: f.startMs,
          endMs: f.endMs,
          energyKwh: m,
          energyUnit: "kWh",
          tariffGbpPerKwh: f.rateGbpPerKwh,
          costGbp: m * f.rateGbpPerKwh
        });
      }
    } else u > 0 && (o = !0);
  }
  return i.length ? { intervals: i, hasCoverageGap: o } : null;
}
function qs(e) {
  return !(e != null && e.intervals.length) || e.hasCoverageGap ? null : e.intervals.reduce(
    (t, s) => t + s.costGbp,
    0
  );
}
function ao(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function Ys(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function co(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function lo(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
const ct = 50;
let G = class extends j {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1, this._gridMoney = null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && (this._loadHistory(), this.nodeType === "grid" ? this._loadGridMoney() : this._gridMoney = null);
  }
  async _loadHistory() {
    var o, r;
    const e = (r = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : r[this.nodeType], t = Ht((e == null ? void 0 : e.combined_power) ?? (e == null ? void 0 : e.power_combined)), s = Ht((e == null ? void 0 : e.import_power) ?? (e == null ? void 0 : e.power_import)), i = Ht((e == null ? void 0 : e.export_power) ?? (e == null ? void 0 : e.power_export));
    if (!(!this.hass || !t.length && !s.length && !i.length)) {
      this._loading = !0, this._hourly = [];
      try {
        const n = /* @__PURE__ */ new Date(), a = new Date(n.getTime() - 864e5), l = async (d) => Promise.all(
          d.map(async (p) => {
            var f, m;
            const u = `history/period/${a.toISOString()}?filter_entity_id=${p}&minimal_response=true&no_attributes=true&end_time=${n.toISOString()}`, g = await this.hass.callApi("GET", u), y = (m = (f = this.hass.states) == null ? void 0 : f[p]) == null ? void 0 : m.attributes.unit_of_measurement;
            return to((g == null ? void 0 : g[0]) ?? [], y);
          })
        );
        if (t.length) {
          const d = await l(t);
          this._hourly = io(d);
        } else {
          const [d, p] = await Promise.all([
            l(s),
            l(i)
          ]);
          this._hourly = oo(d, p);
        }
      } catch (n) {
        console.warn("[hec-node-detail] history fetch failed", n), this._hourly = [];
      } finally {
        this._loading = !1;
      }
    }
  }
  async _loadGridMoney() {
    var l, d, p, u, g, y, f, m, b, _, M, L;
    const e = (d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d.grid, t = e == null ? void 0 : e.octopus;
    if (!this.hass || !e || !t) {
      this._gridMoney = null;
      return;
    }
    const s = Gs(
      t.slots_entity ? (p = this.hass.states) == null ? void 0 : p[t.slots_entity] : void 0
    ), i = e.export_rate ? (u = this.hass.states) == null ? void 0 : u[e.export_rate] : void 0, o = Gs(
      i
    ), r = /* @__PURE__ */ new Date();
    r.setHours(0, 0, 0, 0);
    const n = /* @__PURE__ */ new Date(), a = async (E) => {
      if (!E || !this.hass) return [];
      const A = `history/period/${r.toISOString()}?filter_entity_id=${E}&minimal_response=true&no_attributes=true&end_time=${n.toISOString()}`, k = await this.hass.callApi("GET", A);
      return (k == null ? void 0 : k[0]) ?? [];
    };
    try {
      const [E, A, k, O] = await Promise.all([
        a(e.daily_usage),
        a(e.daily_export),
        a(t.rate_entity),
        a(e.export_rate)
      ]), N = e.daily_usage ? (y = (g = this.hass.states) == null ? void 0 : g[e.daily_usage]) == null ? void 0 : y.attributes.unit_of_measurement : void 0, H = e.daily_export ? (m = (f = this.hass.states) == null ? void 0 : f[e.daily_export]) == null ? void 0 : m.attributes.unit_of_measurement : void 0, R = t.rate_entity ? (_ = (b = this.hass.states) == null ? void 0 : b[t.rate_entity]) == null ? void 0 : _.attributes.unit_of_measurement : void 0, D = e.export_rate ? (L = (M = this.hass.states) == null ? void 0 : M[e.export_rate]) == null ? void 0 : L.attributes.unit_of_measurement : void 0, K = s.length ? s : Ks(k, R, n.getTime()), W = o.length ? o : Ks(O, D, n.getTime()), Ct = Yt(this.hass.states, e.daily_usage), Z = Yt(this.hass.states, e.daily_export), X = no(O, i), mt = Ws(
        E,
        N,
        K
      ), _t = qs(
        mt
      ), et = Ws(
        A,
        H,
        W
      ), st = qs(
        et
      ), it = so(this.hass.states, t.cost_entity), q = _t ?? it, Y = st ?? (Z !== null && X !== null ? Z * X : null), ot = q !== null && Y !== null ? q - Y : null;
      this._gridMoney = {
        importCostToday: q,
        exportPaymentToday: Y,
        netCost: ot
      };
    } catch (E) {
      console.warn("[hec-node-detail] grid money load failed", E), this._gridMoney = null;
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(e, t, s) {
    return w`
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
    var o, r, n, a;
    const t = ((r = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : r.decimal_places) ?? 1, s = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.unit) ?? "auto", i = this._powerSubtitle(e, s, t);
    return w`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Qt(e.power, s, t)}</div>
        ${i ? w`<div class="power-sub">${i}</div>` : v}
      </div>
    `;
  }
  _powerSubtitle(e, t, s) {
    var O, N, H, R, D, K, W;
    const i = ((O = Qi[this.nodeType]) == null ? void 0 : O[e.direction]) ?? "";
    if (this.nodeType !== "grid" || e.direction !== "from-home" || !this.hass) return i;
    const o = this.hass.states, r = ((H = (N = this.config) == null ? void 0 : N.entity_types) == null ? void 0 : H.solar) ?? {}, n = ((D = (R = this.config) == null ? void 0 : R.entity_types) == null ? void 0 : D.home) ?? {}, a = ((W = (K = this.config) == null ? void 0 : K.entity_types) == null ? void 0 : W.battery) ?? {}, l = dt("solar", r, o), d = dt("home", n, o), p = dt("battery", a, o), u = e.magnitude ?? 0;
    if (u <= 0) return i;
    const g = l.direction === "to-home" ? l.magnitude ?? 0 : 0, y = Math.max(d.power ?? 0, 0), f = p.direction === "to-home" ? p.magnitude ?? 0 : 0, m = Math.max(g - y, 0), b = Math.min(u, m), _ = Math.min(
      Math.max(u - b, 0),
      f
    ), M = b + _;
    if (Math.max(u - M, 0) > Math.max(ct, u * 0.1))
      return i;
    const E = b > ct && _ <= ct, A = _ > ct && b <= ct, k = b > ct && _ > ct;
    return E ? "Exporting solely from excess solar production" : A ? "Exporting solely from the battery" : k ? `Exporting ${Qt(b, t, s)} from excess solar production and ${Qt(_, t, s)} from the battery` : i;
  }
  _sectionSoc(e) {
    if (e === null) return v;
    const t = lo(e);
    return w`
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
    var n, a, l;
    const t = ((n = this.hass) == null ? void 0 : n.states) ?? {}, s = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", r = [];
    return e.daily_usage && r.push([i, js(Yt(t, e.daily_usage), s)]), e.daily_export && r.push([o, js(Yt(t, e.daily_export), s)]), r.length ? w`
      <div class="section">
        <div class="s-title">Today</div>
        ${r.map(([d, p]) => w`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${p}</span>
          </div>
        `)}
      </div>
    ` : v;
  }
  _sectionOctopus(e) {
    var y, f, m, b;
    const t = ((y = this.hass) == null ? void 0 : y.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.slots_entity ? t[e.slots_entity] : null, o = s == null ? void 0 : s.state, r = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", n = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], a = Date.now(), l = n.filter((_) => new Date(_.end ?? _.end_time ?? 0).getTime() > a).slice(0, 6), d = o && o !== "unavailable" && o !== "unknown", p = ((f = this._gridMoney) == null ? void 0 : f.importCostToday) ?? null, u = ((m = this._gridMoney) == null ? void 0 : m.exportPaymentToday) ?? null, g = ((b = this._gridMoney) == null ? void 0 : b.netCost) ?? null;
    return !d && !l.length && p === null && u === null && g === null ? v : w`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${d ? w`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(o).toFixed(2)} ${r}</span>
          </div>
        ` : v}

        <div class="kv">
          <span class="kv-k">Import Cost Today</span>
          <span class="kv-v">${de(p)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${de(u)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${de(g)}</span>
        </div>

        ${l.length ? w`
          <div class="s-subtitle">Upcoming slots</div>
          ${l.map((_) => {
      const M = _.start ?? _.start_time ?? "", L = _.end ?? _.end_time ?? "", E = _.value_inc_vat ?? _.rate_inc_vat ?? _.value ?? 0, A = co(E);
      return w`
              <div class="slot">
                <span class="slot-dot" style="background:${A};"></span>
                <span class="slot-time">${Ys(M)}–${Ys(L)}</span>
                <span class="slot-rate" style="color:${A};">${(+E).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : v}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((r) => r !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (r) => ao(new Date(i.getTime() - r * 36e5));
    return this._loading ? w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? w`<div class="chart-msg">No data</div>` : w`
              ${Nt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((r, n) => {
      if (r === null || r <= 0) return Nt``;
      const a = Math.max(2, r / s * 48);
      return Nt`
                      <rect
                        x="${n * 10 + 0.5}" y="${52 - a}"
                        width="9" height="${a}" rx="2"
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
    var l, d, p, u;
    if (!this.open || !this.nodeType) return v;
    const e = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, s = e.colour || ((u = oi[this.nodeType]) == null ? void 0 : u.accent) || ni.accent, i = e.icon || Ji[this.nodeType] || "mdi:lightning-bolt", o = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), r = dt(this.nodeType, e, t), n = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !se.includes(this.nodeType)), a = n ? eo(t, e.soc) : null;
    return w`
      <div
        class="overlay"
        @click=${(g) => g.target === g.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, i, o)}
          ${this._sectionPower(r)}
          ${n ? this._sectionSoc(a) : v}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : v}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
G.styles = $t`
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
tt([
  C({ attribute: !1 })
], G.prototype, "hass", 2);
tt([
  C({ attribute: !1 })
], G.prototype, "config", 2);
tt([
  C()
], G.prototype, "nodeType", 2);
tt([
  C({ type: Boolean })
], G.prototype, "open", 2);
tt([
  Ft()
], G.prototype, "_hourly", 2);
tt([
  Ft()
], G.prototype, "_loading", 2);
tt([
  Ft()
], G.prototype, "_gridMoney", 2);
G = tt([
  Et("hec-node-detail")
], G);
var ho = Object.defineProperty, uo = Object.getOwnPropertyDescriptor, jt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? uo(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && ho(t, s, o), o;
};
function po(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const B = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
}, Zs = 75, fo = /* @__PURE__ */ new Set([
  "solar-battery",
  "solar-ev",
  "solar-grid"
]);
let gt = class extends j {
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
    (e.has("config") || e.has("hass")) && this._scheduleMeasureLineLayout();
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(e) {
    var t;
    return e in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(e) {
    var n, a, l, d, p, u;
    const t = ((a = (n = this.config) == null ? void 0 : n.entity_types) == null ? void 0 : a[e]) ?? {}, s = ((l = this.hass) == null ? void 0 : l.states) ?? {};
    if (e !== "home")
      return dt(e, t, s);
    const i = ci("home", t, s);
    if (i === null) return pe("home", null, t.zero_tolerance ?? 0);
    const o = (d = this.config) != null && d.ev_subtract_from_home ? dt("ev", ((u = (p = this.config) == null ? void 0 : p.entity_types) == null ? void 0 : u.ev) ?? {}, s).power ?? 0 : 0, r = this._customTypes().reduce((g, y) => {
      var b, _;
      const f = ((_ = (b = this.config) == null ? void 0 : b.entity_types) == null ? void 0 : _[y]) ?? {};
      if (!f.subtract_from_home) return g;
      const m = dt(y, f, s);
      return g + (m.power ?? 0);
    }, o);
    return pe(
      "home",
      i - r,
      t.zero_tolerance ?? 0
    );
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
    var o, r, n, a;
    const t = (n = (r = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : r[e]) == null ? void 0 : n.soc;
    if (!t || !this.hass) return null;
    const s = (a = this.hass.states[t]) == null ? void 0 : a.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const i = parseFloat(s);
    return isNaN(i) ? null : i;
  }
  _dailyKwh(e) {
    var t, s, i, o;
    return ai(
      ((t = this.hass) == null ? void 0 : t.states) ?? {},
      (o = (i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) == null ? void 0 : o.daily_usage
    );
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
    for (const n of i) {
      if (n.classList.contains("hidden")) continue;
      const a = n.dataset.nodeType;
      if (!a) continue;
      const l = n.getBoundingClientRect();
      s[a] = {
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
      const o = (this._flowSamples[s] ?? []).map((n) => n.magnitude).filter((n) => n !== null), r = o.length > 0 ? o.reduce((n, a) => n + Math.abs(a), 0) / o.length : null;
      this._smoothedMagnitudes[s] !== r && (this._smoothedMagnitudes[s] = r, t = !0);
    }
    return t;
  }
  _computeLineVisualState(e) {
    var r, n, a, l, d, p, u;
    const t = ((n = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : n.dynamic_animation_speed) ?? !1, s = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.animation) !== !1, i = this._flowInfo(e), o = this._smoothedMagnitudes[e] ?? i.magnitude;
    return {
      color: B[e] ?? ((u = (p = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : p[e]) == null ? void 0 : u.colour) ?? "#9e9e9e",
      dur: po(o, t && i.direction !== "idle"),
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
    var et, st, it, q, Y, ot, St, At, Tt;
    const e = this._lineLayout.centers, t = e.home, s = e.solar, i = this._customTypes().filter(($) => this._isVisible($));
    if (!t || !this._lineLayout.width || !this._lineLayout.height) return v;
    const o = [], r = [], n = ($, x, P, U, F) => {
      fo.has($) || !e[x] || !e[P] || r.push({
        key: `idle-${$}`,
        pathKey: $,
        from: x,
        to: P,
        type: U,
        color: F
      });
    }, a = this._flowInfo("solar"), l = this._flowInfo("home"), d = this._flowInfo("battery"), p = this._flowInfo("ev"), u = this._flowInfo("grid"), g = s && a.direction === "to-home" ? a.magnitude ?? 0 : 0, y = Math.max(l.power ?? 0, 0), f = d.direction === "from-home" ? d.magnitude ?? 0 : 0, m = d.direction === "to-home" ? d.magnitude ?? 0 : 0, b = p.direction === "from-home" ? p.magnitude ?? 0 : 0, _ = u.direction === "from-home" ? u.magnitude ?? 0 : 0, M = i.map(($) => {
      var P;
      const x = this._flowInfo($);
      return {
        type: $,
        flow: x,
        center: e[$],
        color: ((P = this._lineVisualState[$]) == null ? void 0 : P.color) ?? this._computeLineVisualState($).color,
        load: x.direction === "from-home" ? x.magnitude ?? 0 : 0
      };
    }), L = Math.min(g, y);
    let E = Math.max(g - L, 0);
    const A = Math.min(E, f);
    E = Math.max(E - A, 0);
    const k = Math.min(E, b);
    E = Math.max(E - k, 0);
    const O = {};
    for (const $ of M) {
      const x = Math.min(E, $.load);
      O[$.type] = x, E = Math.max(E - x, 0);
    }
    const N = Math.min(E, _);
    s && L > 0 && o.push({
      key: "solar-home",
      pathKey: "solar-home",
      from: "solar",
      to: "home",
      type: "solar",
      color: B.solar,
      magnitude: L
    }), s && A > 0 && e.battery && o.push({
      key: "solar-battery",
      pathKey: "solar-battery",
      from: "solar",
      to: "battery",
      type: "solar",
      color: B.solar,
      magnitude: A
    }), s && k > 0 && e.ev && o.push({
      key: "solar-ev",
      pathKey: "solar-ev",
      from: "solar",
      to: "ev",
      type: "solar",
      color: B.solar,
      magnitude: k
    }), s && N > 0 && e.grid && o.push({
      key: "solar-grid",
      pathKey: "solar-grid",
      from: "solar",
      to: "grid",
      type: "solar",
      color: B.solar,
      magnitude: N
    });
    for (const $ of M) {
      const x = O[$.type] ?? 0;
      !s || !$.center || x <= 0 || o.push({
        key: `solar-${$.type}`,
        pathKey: `solar-${$.type}`,
        from: "solar",
        to: $.type,
        type: "solar",
        color: B.solar,
        magnitude: x
      });
    }
    const H = Math.max(f - A, 0), R = Math.max(b - k, 0), D = Math.max(_ - N, 0), K = Math.max(y - L, 0), W = Math.min(m, K), Ct = Math.max(m - W, 0), Z = Math.min(D, Ct), X = D <= Zs || Z <= Zs ? 0 : Z;
    u.direction === "to-home" && (u.magnitude ?? 0) > 0 && e.grid && o.push({
      key: "grid-home",
      pathKey: "home-grid",
      from: "grid",
      to: "home",
      type: "grid",
      color: ((et = this._lineVisualState.grid) == null ? void 0 : et.color) ?? this._computeLineVisualState("grid").color,
      magnitude: u.magnitude ?? 0
    }), X > 0 && e.grid && o.push({
      key: "home-grid",
      pathKey: "home-grid",
      from: "home",
      to: "grid",
      type: "battery",
      color: ((st = this._lineVisualState.battery) == null ? void 0 : st.color) ?? this._computeLineVisualState("battery").color,
      magnitude: X
    }), d.direction === "to-home" && (d.magnitude ?? 0) > 0 && e.battery && o.push({
      key: "battery-home",
      pathKey: "home-battery",
      from: "battery",
      to: "home",
      type: "battery",
      color: ((it = this._lineVisualState.battery) == null ? void 0 : it.color) ?? this._computeLineVisualState("battery").color,
      magnitude: d.magnitude ?? 0
    }), H > 0 && e.battery && o.push({
      key: "home-battery",
      pathKey: "home-battery",
      from: "home",
      to: "battery",
      type: "battery",
      color: ((q = this._lineVisualState.battery) == null ? void 0 : q.color) ?? this._computeLineVisualState("battery").color,
      magnitude: H
    }), p.direction === "to-home" && (p.magnitude ?? 0) > 0 && e.ev && o.push({
      key: "ev-home",
      pathKey: "home-ev",
      from: "ev",
      to: "home",
      type: "ev",
      color: ((Y = this._lineVisualState.ev) == null ? void 0 : Y.color) ?? this._computeLineVisualState("ev").color,
      magnitude: p.magnitude ?? 0
    }), R > 0 && e.ev && o.push({
      key: "home-ev",
      pathKey: "home-ev",
      from: "home",
      to: "ev",
      type: "ev",
      color: ((ot = this._lineVisualState.ev) == null ? void 0 : ot.color) ?? this._computeLineVisualState("ev").color,
      magnitude: R
    });
    for (const $ of M) {
      const { type: x, flow: P, center: U, color: F } = $, kt = O[x] ?? 0, Pt = Math.max($.load - kt, 0);
      if (U && kt <= 0 && n(`home-${x}`, "home", x, x, F), !(!U || !P.magnitude || P.direction === "idle")) {
        if (P.direction === "from-home") {
          if (Pt <= 0) continue;
          o.push({
            key: `custom-${x}`,
            pathKey: `home-${x}`,
            from: "home",
            to: x,
            type: x,
            color: F,
            magnitude: Pt
          });
          continue;
        }
        o.push({
          key: `custom-${x}`,
          pathKey: `home-${x}`,
          from: x,
          to: "home",
          type: x,
          color: F,
          magnitude: P.magnitude
        });
      }
    }
    s && (n("solar-home", "solar", "home", "solar", B.solar), e.battery && n("solar-battery", "solar", "battery", "solar", B.solar), e.ev && n("solar-ev", "solar", "ev", "solar", B.solar), e.grid && n("solar-grid", "solar", "grid", "solar", B.solar)), e.grid && n(
      "home-grid",
      "home",
      "grid",
      "grid",
      ((St = this._lineVisualState.grid) == null ? void 0 : St.color) ?? this._computeLineVisualState("grid").color
    ), e.battery && n(
      "home-battery",
      "home",
      "battery",
      "battery",
      ((At = this._lineVisualState.battery) == null ? void 0 : At.color) ?? this._computeLineVisualState("battery").color
    ), e.ev && n(
      "home-ev",
      "home",
      "ev",
      "ev",
      ((Tt = this._lineVisualState.ev) == null ? void 0 : Tt.color) ?? this._computeLineVisualState("ev").color
    );
    const mt = new Set(o.map(($) => $.pathKey)), _t = [
      ...r.filter(($) => !mt.has($.pathKey)),
      ...o
    ];
    return Nt`
      ${Us(
      _t,
      ($) => $.key,
      ($) => {
        const x = e[$.from], P = e[$.to];
        if (!x || !P) return v;
        const U = this._lineVisualState[$.type] ?? this._computeLineVisualState($.type), F = [
          "flow-line",
          "magnitude" in $ ? "" : "idle",
          U.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return Nt`
            <line
              x1="${x.x}" y1="${x.y}" x2="${P.x}" y2="${P.y}"
              stroke="${$.color}"
              class="${F}"
              style="--flow-dur:${U.dur}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(e, t, s = !1) {
    var l, d, p;
    const i = e === "home" ? !0 : this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, r = ((p = this.config) == null ? void 0 : p.display) ?? {}, n = this._flowInfo(e), a = e === "solar" ? Bs(this._dailyKwh(e), r.decimal_places ?? 1) : "";
    return w`
      <hec-energy-node
        data-node-type=${e}
        class="${t}${i ? "" : " hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .showLabel=${o.show_label ?? !0}
        .icon=${o.icon ?? ""}
        .bottomText=${a}
        .colour=${o.colour ?? ""}
        .power=${n.power}
        .soc=${s ? this._soc(e) : null}
        .unit=${r.unit ?? "auto"}
        .decimalPlaces=${r.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var e;
    return Object.keys(((e = this.config) == null ? void 0 : e.entity_types) ?? {}).filter(
      (t) => !se.includes(t)
    ).slice(0, Xt);
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
  _customSlotClasses(e) {
    return [
      e === 0 || e === 2 ? "slot-custom-inset-right" : "",
      e === 3 ? "slot-custom-inset-left" : ""
    ].filter(Boolean).join(" ");
  }
  /** Render a custom node with inline grid placement. */
  _customNode(e, t, s, i) {
    var d, p, u;
    const o = this._isVisible(e), r = ((p = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : p[e]) ?? {}, n = ((u = this.config) == null ? void 0 : u.display) ?? {}, a = this._flowInfo(e), l = Bs(
      this._dailyKwh(e),
      n.decimal_places ?? 1
    );
    return w`
      <hec-energy-node
        data-node-type=${e}
        style="grid-column:${t}; grid-row:${s}"
        class="${[
      o ? "" : "hidden",
      this._customSlotClasses(i)
    ].filter(Boolean).join(" ")}"
        .type=${e}
        .label=${r.label ?? e}
        .showLabel=${r.show_label ?? !0}
        .icon=${r.icon ?? ""}
        .bottomText=${l}
        .colour=${r.colour ?? ""}
        .power=${a.power}
        .soc=${r.soc ? this._soc(e) : null}
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
    if (!this.config) return v;
    const e = this._customTypes(), s = this.config.dynamic_custom_placement ?? !0 ? e.filter((i) => this._isVisible(i)).map((i, o) => ({
      type: i,
      slotIndex: o
    })) : e.map((i, o) => ({ type: i, slotIndex: o })).filter(({ type: i }) => this._isVisible(i));
    return w`
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
        ${Us(s, ({ type: i }) => i, ({ type: i, slotIndex: o }) => {
      const [r, n] = this._customSlot(o);
      return this._customNode(i, r, n, o);
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
gt.styles = $t`
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
    .slot-ev      {
      grid-column: 3;
      grid-row: 1;
      transform: translate(-49px, 0px);
    }  /* softened away from rigid C1 alignment */
    .slot-custom-inset-right {
      transform: translate(49px, 0px);
    }
    .slot-custom-inset-left {
      transform: translate(-49px, 0px);
    }
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
jt([
  C({ attribute: !1 })
], gt.prototype, "hass", 2);
jt([
  C({ attribute: !1 })
], gt.prototype, "config", 2);
jt([
  Ft()
], gt.prototype, "_dialogType", 2);
jt([
  Ft()
], gt.prototype, "_lineLayout", 2);
gt = jt([
  Et("hec-flow-layout")
], gt);
var yo = Object.defineProperty, go = Object.getOwnPropertyDescriptor, $e = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? go(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && yo(t, s, o), o;
};
let Ut = class extends j {
  setConfig(e) {
    this.config = Jt(e);
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? w`
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
Ut.styles = $t`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
$e([
  C({ attribute: !1 })
], Ut.prototype, "hass", 2);
$e([
  C({ attribute: !1 })
], Ut.prototype, "config", 2);
Ut = $e([
  Et("home-energy-card")
], Ut);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  Ut as HomeEnergyCard
};
