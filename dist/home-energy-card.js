/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, ve = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, me = Symbol(), Pe = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== me) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ve && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (s) => new Ke(typeof s == "string" ? s : s + "", void 0, me), F = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, o, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[a + 1], s[0]);
  return new Ke(t, s, me);
}, at = (s, e) => {
  if (ve) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = ne.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, s.appendChild(i);
  }
}, ze = ve ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ot(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: nt, defineProperty: rt, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: ht, getPrototypeOf: dt } = Object, C = globalThis, Ne = C.trustedTypes, pt = Ne ? Ne.emptyScript : "", pe = C.reactiveElementPolyfillSupport, q = (s, e) => s, re = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? pt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, $e = (s, e) => !nt(s, e), De = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: $e };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = De) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && rt(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: a } = lt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: o, set(n) {
      const l = o == null ? void 0 : o.call(this);
      a == null || a.call(this, n), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? De;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const e = dt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const t = this.properties, i = [...ct(t), ...ht(t)];
      for (const o of i) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, o] of t) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const o = this._$Eu(t, i);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) t.unshift(ze(o));
    } else e !== void 0 && t.push(ze(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return at(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var a;
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : re).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, n;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const l = i.getPropertyOptions(o), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : re;
      this._$Em = o;
      const h = c.fromAttribute(t, l.type);
      this[o] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, a) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (a = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? $e)(a, t) || i.useDefault && i.reflect && a === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: o, wrapped: a }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, n] of this._$Ep) this[a] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, n] of o) {
        const { wrapped: l } = n, c = this[a];
        l !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, n, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((o) => {
        var a;
        return (a = o.hostUpdate) == null ? void 0 : a.call(o);
      }), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[q("elementProperties")] = /* @__PURE__ */ new Map(), U[q("finalized")] = /* @__PURE__ */ new Map(), pe == null || pe({ ReactiveElement: U }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, Me = (s) => s, le = Y.trustedTypes, He = le ? le.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, qe = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + S, ut = `<${Ye}>`, H = document, Q = () => H.createComment(""), X = (s) => s === null || typeof s != "object" && typeof s != "function", be = Array.isArray, ft = (s) => be(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ue = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, je = /-->/g, Ue = />/g, z = RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ie = /'/g, Le = /"/g, Je = /^(?:script|style|textarea|title)$/i, Qe = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), g = Qe(1), J = Qe(2), L = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), D = H.createTreeWalker(H, 129);
function Xe(s, e) {
  if (!be(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return He !== void 0 ? He.createHTML(e) : e;
}
const yt = (s, e) => {
  const t = s.length - 1, i = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = K;
  for (let l = 0; l < t; l++) {
    const c = s[l];
    let h, u, d = -1, _ = 0;
    for (; _ < c.length && (n.lastIndex = _, u = n.exec(c), u !== null); ) _ = n.lastIndex, n === K ? u[1] === "!--" ? n = je : u[1] !== void 0 ? n = Ue : u[2] !== void 0 ? (Je.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = z) : u[3] !== void 0 && (n = z) : n === z ? u[0] === ">" ? (n = o ?? K, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? z : u[3] === '"' ? Le : Ie) : n === Le || n === Ie ? n = z : n === je || n === Ue ? n = K : (n = z, o = void 0);
    const v = n === z && s[l + 1].startsWith("/>") ? " " : "";
    a += n === K ? c + ut : d >= 0 ? (i.push(h), c.slice(0, d) + qe + c.slice(d) + S + v) : c + S + (d === -2 ? l : v);
  }
  return [Xe(s, a + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class ee {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const l = e.length - 1, c = this.parts, [h, u] = yt(e, t);
    if (this.el = ee.createElement(h, i), D.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = D.nextNode()) !== null && c.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(qe)) {
          const _ = u[n++], v = o.getAttribute(d).split(S), p = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: a, name: p[2], strings: v, ctor: p[1] === "." ? _t : p[1] === "?" ? vt : p[1] === "@" ? mt : ce }), o.removeAttribute(d);
        } else d.startsWith(S) && (c.push({ type: 6, index: a }), o.removeAttribute(d));
        if (Je.test(o.tagName)) {
          const d = o.textContent.split(S), _ = d.length - 1;
          if (_ > 0) {
            o.textContent = le ? le.emptyScript : "";
            for (let v = 0; v < _; v++) o.append(d[v], Q()), D.nextNode(), c.push({ type: 2, index: ++a });
            o.append(d[_], Q());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ye) c.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(S, d + 1)) !== -1; ) c.push({ type: 7, index: a }), d += S.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function R(s, e, t = s, i) {
  var n, l;
  if (e === L) return e;
  let o = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const a = X(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), a === void 0 ? o = void 0 : (o = new a(s), o._$AT(s, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = R(s, o._$AS(s, e.values), o, i)), e;
}
class gt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? H).importNode(t, !0);
    D.currentNode = o;
    let a = D.nextNode(), n = 0, l = 0, c = i[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let h;
        c.type === 2 ? h = new se(a, a.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (h = new $t(a, this, e)), this._$AV.push(h), c = i[++l];
      }
      n !== (c == null ? void 0 : c.index) && (a = D.nextNode(), n++);
    }
    return D.currentNode = H, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class se {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = R(this, e, t), X(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== L && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ft(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && X(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ee.createElement(Xe(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(t);
    else {
      const n = new gt(o, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Re.get(e.strings);
    return t === void 0 && Re.set(e.strings, t = new ee(e)), t;
  }
  k(e) {
    be(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const a of e) o === t.length ? t.push(i = new se(this.O(Q()), this.O(Q()), this, this.options)) : i = t[o], i._$AI(a), o++;
    o < t.length && (this._$AR(i && i._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = Me(e).nextSibling;
      Me(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ce {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, o, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, t = this, i, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = R(this, e, t, 0), n = !X(e) || e !== this._$AH && e !== L, n && (this._$AH = e);
    else {
      const l = e;
      let c, h;
      for (e = a[0], c = 0; c < a.length - 1; c++) h = R(this, l[i + c], t, c), h === L && (h = this._$AH[c]), n || (n = !X(h) || h !== this._$AH[c]), h === f ? e = f : e !== f && (e += (h ?? "") + a[c + 1]), this._$AH[c] = h;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class vt extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class mt extends ce {
  constructor(e, t, i, o, a) {
    super(e, t, i, o, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = R(this, e, t, 0) ?? f) === L) return;
    const i = this._$AH, o = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== f && (i === f || o);
    o && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class $t {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    R(this, e);
  }
}
const fe = Y.litHtmlPolyfillSupport;
fe == null || fe(ee, se), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.2");
const bt = (s, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new se(e.insertBefore(Q(), a), a, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
class E extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = bt(t, this.renderRoot, this.renderOptions);
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
    return L;
  }
}
var Ge;
E._$litElement$ = !0, E.finalized = !0, (Ge = M.litElementHydrateSupport) == null || Ge.call(M, { LitElement: E });
const ye = M.litElementPolyfillSupport;
ye == null || ye({ LitElement: E });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = { attribute: !0, type: String, converter: re, reflect: !1, hasChanged: $e }, xt = (s = wt, e, t) => {
  const { kind: i, metadata: o } = t;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), a.set(t.name, s), i === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const c = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, c, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(l) {
      const c = this[n];
      e.call(this, l), this.requestUpdate(n, c, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(s) {
  return (e, t) => typeof t == "object" ? xt(s, e, t) : ((i, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, i), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
const et = ["grid", "solar", "battery", "home", "ev"], we = (s) => s.attributes.device_class ?? "", xe = (s) => s.attributes.unit_of_measurement ?? "", Ee = (s, e) => s.toLowerCase() + " " + (e.attributes.friendly_name ?? "").toLowerCase();
function N(...s) {
  return (e, t) => {
    let i = 0;
    we(t) === "power" && (i += 4), ["W", "kW"].includes(xe(t)) && (i += 2);
    const o = Ee(e, t);
    for (const a of s) o.includes(a) && (i += 1);
    return i;
  };
}
function I(...s) {
  return (e, t) => {
    let i = 0;
    we(t) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(xe(t)) && (i += 2);
    const o = Ee(e, t);
    for (const a of s) o.includes(a) && (i += 1);
    return i;
  };
}
function Be(...s) {
  return (e, t) => {
    let i = 0;
    we(t) === "battery" && (i += 4), xe(t) === "%" && (i += 2);
    const o = Ee(e, t);
    for (const a of s) o.includes(a) && (i += 1);
    return i;
  };
}
function ie(s, e = []) {
  return (t, i) => {
    const o = t.toLowerCase();
    if (e.some((n) => o.includes(n))) return 0;
    let a = 0;
    for (const n of s) o.includes(n) && (a += 4);
    return a;
  };
}
function w(s, e, t, i) {
  let o, a = 0;
  for (const n of s) {
    if (i.has(n)) continue;
    const l = e[n];
    if (!l) continue;
    const c = t(n, l);
    c > a && (a = c, o = n);
  }
  return o && i.add(o), o;
}
function Et(s, e, t) {
  const i = Object.values(e).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), o = Object.keys(s).filter((b) => b.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const a = o.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), n = ["Octopus Energy"], l = {}, c = {}, h = w(
    a,
    s,
    ie(["_current_rate"], ["export", "accumulative"]),
    t
  );
  h && (l.rate_entity = h, n.push("rate"));
  const u = w(
    a,
    s,
    ie(["_current_accumulative_cost"]),
    t
  );
  u && (l.cost_entity = u, n.push("cost"));
  const d = w(
    a,
    s,
    ie(["_current_day_rates"]),
    t
  );
  d && (l.slots_entity = d, n.push("slots"));
  const _ = w(
    o.filter((b) => b.startsWith("binary_sensor.")),
    s,
    ie(["_intelligent_dispatching"]),
    t
  );
  _ && (l.dispatches_entity = _, n.push("dispatching")), Object.keys(l).length && (c.octopus = l);
  const v = w(
    a,
    s,
    N("import", "demand", "current"),
    t
  );
  v && (c.power_import = v, n.push("import power"));
  const p = w(
    a,
    s,
    N("export", "demand", "current"),
    t
  );
  p && (c.power_export = p, n.push("export power"));
  const y = w(
    a,
    s,
    I("import", "accumulative", "consumption"),
    t
  );
  y && (c.daily_usage = y, n.push("daily import"));
  const x = w(
    a,
    s,
    I("export", "accumulative"),
    t
  );
  return x && (c.daily_export = x, n.push("daily export")), { integration_type: "octopus", entity_types: { grid: c }, summary: n };
}
function kt(s, e, t) {
  const i = Object.values(e).filter(
    (p) => p.platform === "tesla_custom" && !p.disabled_by
  ), o = Object.keys(s).some(
    (p) => p.includes("powerwall") || p.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const a = i.length > 0 ? i.map((p) => p.entity_id) : Object.keys(s).filter((p) => p.includes("powerwall") || p.includes("tesla")), n = a.filter((p) => p.includes("powerwall")), l = a.filter((p) => !p.includes("powerwall")), c = ["Tesla"], h = {};
  if (n.length > 0) {
    const p = {}, y = w(
      n,
      s,
      Be("battery", "soc", "charge", "percent"),
      t
    );
    y && (p.soc = y);
    const x = w(
      n,
      s,
      N("battery", "power", "charge", "discharge"),
      t
    );
    x && (p.power_combined = x);
    const b = w(
      n,
      s,
      I("battery", "today", "daily", "charged"),
      t
    );
    b && (p.daily_usage = b), Object.keys(p).length && (h.battery = p, c.push("Powerwall"));
  }
  const u = w(
    a,
    s,
    N("solar"),
    t
  );
  if (u) {
    const p = { power_combined: u }, y = w(
      a,
      s,
      I("solar"),
      t
    );
    y && (p.daily_usage = y), h.solar = p, c.push("solar");
  }
  const d = w(
    a,
    s,
    N("load", "home", "house"),
    t
  );
  if (d) {
    const p = { power_combined: d }, y = w(
      a,
      s,
      I("load", "home", "house"),
      t
    );
    y && (p.daily_usage = y), h.home = p, c.push("home load");
  }
  const _ = w(
    a,
    s,
    N("grid"),
    t
  );
  _ && (h.grid = { power_combined: _ }, c.push("grid"));
  const v = w(
    l,
    s,
    Be("battery", "battery_level", "soc", "charge"),
    t
  );
  if (v) {
    const p = { soc: v }, y = w(
      l,
      s,
      N("charg", "power"),
      t
    );
    y && (p.power_combined = y);
    const x = w(
      l,
      s,
      I("charg", "energy"),
      t
    );
    x && (p.daily_usage = x), h.ev = p, c.push("EV");
  }
  return { integration_type: "tesla", entity_types: h, summary: c };
}
function Tt(s) {
  var c, h;
  const e = s, t = e.states ?? {}, i = e.entities ?? {}, o = /* @__PURE__ */ new Set(), a = kt(t, i, o), n = Et(t, i, o), l = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (a && (l.integration_type = "tesla", Object.assign(l.entity_types, a.entity_types), l.summary.push(...a.summary ?? [])), n) {
    if (l.integration_type !== "tesla" && (l.integration_type = "octopus"), (c = n.entity_types) != null && c.grid) {
      const u = n.entity_types.grid;
      l.entity_types.grid = {
        ...l.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (h = l.entity_types.grid) == null ? void 0 : h.power_combined
      };
    }
    n.tariff_entity && (l.tariff_entity = n.tariff_entity), l.summary.push(...n.summary ?? []);
  }
  return l;
}
function At(s, e, t = !1) {
  const i = { ...s };
  e.tariff_entity && (t || !s.tariff_entity) && (i.tariff_entity = e.tariff_entity);
  const o = s.entity_types ?? {}, a = { ...o };
  for (const [n, l] of Object.entries(e.entity_types)) {
    const c = o[n] ?? {}, h = { ...c };
    for (const [u, d] of Object.entries(l))
      d !== void 0 && (t || !c[u]) && (h[u] = d);
    a[n] = h;
  }
  return i.entity_types = a, i;
}
var St = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, G = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ct(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && St(e, t, o), o;
};
let O = class extends E {
  constructor() {
    super(...arguments), this._newTypeName = "", this._detectStatus = "", this._detectIsError = !1;
  }
  setConfig(s) {
    this.config = s;
  }
  _runAutoDetect() {
    if (!this.hass) {
      this._detectStatus = "No hass object — editor not fully loaded.", this._detectIsError = !0;
      return;
    }
    const s = Tt(this.hass);
    if (s.integration_type === "manual" && s.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.", this._detectIsError = !0;
      return;
    }
    const e = At(this.config, s, !1);
    this._dispatch(e), this._detectIsError = !1, this._detectStatus = `Detected: ${s.summary.join(", ")}`;
  }
  _dispatch(s) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _set(s, e) {
    this._dispatch({ ...this.config, [s]: e });
  }
  _setEntityType(s, e, t) {
    var o;
    const i = { ...((o = this.config) == null ? void 0 : o.entity_types) ?? {} };
    i[s] = t === void 0 || t === "" || t === null ? (({ [e]: a, ...n }) => n)(i[s] ?? {}) : { ...i[s], [e]: t }, this._set("entity_types", i);
  }
  _setOctopus(s, e, t) {
    var l;
    const i = { ...((l = this.config) == null ? void 0 : l.entity_types) ?? {} }, o = i[s] ?? {}, a = { ...o.octopus, [e]: t || void 0 }, n = Object.values(a).some(Boolean);
    i[s] = n ? { ...o, octopus: a } : (({ octopus: c, ...h }) => h)(o), this._set("entity_types", i);
  }
  _capitalize(s) {
    return s === "ev" ? "EV" : s.charAt(0).toUpperCase() + s.slice(1);
  }
  _addCustomType() {
    var t;
    const s = this._newTypeName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!s) return;
    const e = {
      ...((t = this.config) == null ? void 0 : t.entity_types) ?? {},
      [s]: {}
    };
    this._set("entity_types", e), this._newTypeName = "";
  }
  _removeCustomType(s) {
    var t;
    const e = { ...((t = this.config) == null ? void 0 : t.entity_types) ?? {} };
    delete e[s], this._set("entity_types", e);
  }
  render() {
    var u, d, _, v, p, y, x, b, A;
    if (!this.config) return f;
    const s = ((u = this.config.entity_types) == null ? void 0 : u.grid) ?? {}, e = ((d = this.config.entity_types) == null ? void 0 : d.solar) ?? {}, t = ((_ = this.config.entity_types) == null ? void 0 : _.battery) ?? {}, i = ((v = this.config.entity_types) == null ? void 0 : v.home) ?? {}, o = ((p = this.config.entity_types) == null ? void 0 : p.ev) ?? {};
    let a = "custom_1";
    for (const r of Object.keys(this.config.entity_types ?? {}))
      if (!et.includes(r)) {
        a = r;
        break;
      }
    const n = ((y = this.config.entity_types) == null ? void 0 : y[a]) ?? {}, l = this.config.live_data ?? {}, c = this.config.system ?? {}, h = this.config.display ?? {};
    return g`
      <div class="detect-block">
        <ha-button unelevated @click=${this._runAutoDetect}>Auto-detect entities</ha-button>
        <span class="detect-status ${this._detectIsError ? "error" : ""}">
          ${this._detectStatus || "Scan your entities and pre-fill fields automatically."}
        </span>
      </div>

      <div class="top-fields">
        <ha-textfield
          label="Title"
          .value=${this.config.title ?? ""}
          @change=${(r) => this._set("title", r.target.value || void 0)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show Title</span>
          <ha-switch
            .checked=${this.config.show_header ?? !0}
            @change=${(r) => this._set("show_header", r.target.checked)}
          ></ha-switch>
        </div>
        <ha-entity-picker
          label="Tariff status entity"
          .hass=${this.hass}
          .value=${this.config.tariff_entity ?? ""}
          @value-changed=${(r) => this._set("tariff_entity", r.detail.value || void 0)}
        ></ha-entity-picker>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      <div class="flat-section">
        <div class="flat-heading">Grid</div>
        <div class="flat-body">
          <ha-entity-picker
            label="grid_import_power"
            .hass=${this.hass}
            .value=${s.power_import ?? ""}
            @value-changed=${(r) => this._setEntityType("grid", "power_import", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="grid_export_power"
            .hass=${this.hass}
            .value=${s.power_export ?? ""}
            @value-changed=${(r) => this._setEntityType("grid", "power_export", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="grid_combined_power"
            .hass=${this.hass}
            .value=${s.power_combined ?? ""}
            @value-changed=${(r) => this._setEntityType("grid", "power_combined", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="grid_daily_usage"
            .hass=${this.hass}
            .value=${s.daily_usage ?? ""}
            @value-changed=${(r) => this._setEntityType("grid", "daily_usage", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Octopus Rate Entity"
            .hass=${this.hass}
            .value=${((x = s.octopus) == null ? void 0 : x.rate_entity) ?? ""}
            @value-changed=${(r) => this._setOctopus("grid", "rate_entity", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Octopus Cost Entity"
            .hass=${this.hass}
            .value=${((b = s.octopus) == null ? void 0 : b.cost_entity) ?? ""}
            @value-changed=${(r) => this._setOctopus("grid", "cost_entity", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Octopus Slots Entity"
            .hass=${this.hass}
            .value=${((A = s.octopus) == null ? void 0 : A.slots_entity) ?? ""}
            @value-changed=${(r) => this._setOctopus("grid", "slots_entity", r.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${s.show_zero !== !1}
              @change=${(r) => this._setEntityType("grid", "show_zero", r.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${s.zero_tolerance != null ? String(s.zero_tolerance) : ""}
            @change=${(r) => {
      const $ = r.target.value;
      this._setEntityType("grid", "zero_tolerance", $ !== "" ? Number($) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${s.label ?? ""}
            @change=${(r) => this._setEntityType("grid", "label", r.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${s.colour ?? ""}
            placeholder="#e91e63"
            @change=${(r) => this._setEntityType("grid", "colour", r.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Solar</div>
        <div class="flat-body">
          <ha-entity-picker
            label="solar_combined_power"
            .hass=${this.hass}
            .value=${e.power_combined ?? ""}
            @value-changed=${(r) => this._setEntityType("solar", "power_combined", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="solar_daily_usage"
            .hass=${this.hass}
            .value=${e.daily_usage ?? ""}
            @value-changed=${(r) => this._setEntityType("solar", "daily_usage", r.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${e.show_zero !== !1}
              @change=${(r) => this._setEntityType("solar", "show_zero", r.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${e.zero_tolerance != null ? String(e.zero_tolerance) : ""}
            @change=${(r) => {
      const $ = r.target.value;
      this._setEntityType("solar", "zero_tolerance", $ !== "" ? Number($) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${e.label ?? ""}
            @change=${(r) => this._setEntityType("solar", "label", r.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${e.colour ?? ""}
            placeholder="#f9a825"
            @change=${(r) => this._setEntityType("solar", "colour", r.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Battery</div>
        <div class="flat-body">
          <ha-entity-picker
            label="battery_soc"
            .hass=${this.hass}
            .value=${t.soc ?? ""}
            @value-changed=${(r) => this._setEntityType("battery", "soc", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="battery_combined_power"
            .hass=${this.hass}
            .value=${t.power_combined ?? ""}
            @value-changed=${(r) => this._setEntityType("battery", "power_combined", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="battery_daily_usage"
            .hass=${this.hass}
            .value=${t.daily_usage ?? ""}
            @value-changed=${(r) => this._setEntityType("battery", "daily_usage", r.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${t.show_zero !== !1}
              @change=${(r) => this._setEntityType("battery", "show_zero", r.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${t.zero_tolerance != null ? String(t.zero_tolerance) : ""}
            @change=${(r) => {
      const $ = r.target.value;
      this._setEntityType("battery", "zero_tolerance", $ !== "" ? Number($) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${t.label ?? ""}
            @change=${(r) => this._setEntityType("battery", "label", r.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${t.colour ?? ""}
            placeholder="#43a047"
            @change=${(r) => this._setEntityType("battery", "colour", r.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Home</div>
        <div class="flat-body">
          <ha-entity-picker
            label="home_combined_power"
            .hass=${this.hass}
            .value=${i.power_combined ?? ""}
            @value-changed=${(r) => this._setEntityType("home", "power_combined", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="home_daily_usage"
            .hass=${this.hass}
            .value=${i.daily_usage ?? ""}
            @value-changed=${(r) => this._setEntityType("home", "daily_usage", r.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${i.show_zero !== !1}
              @change=${(r) => this._setEntityType("home", "show_zero", r.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${i.zero_tolerance != null ? String(i.zero_tolerance) : ""}
            @change=${(r) => {
      const $ = r.target.value;
      this._setEntityType("home", "zero_tolerance", $ !== "" ? Number($) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${i.label ?? ""}
            @change=${(r) => this._setEntityType("home", "label", r.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${i.colour ?? ""}
            placeholder="#388e3c"
            @change=${(r) => this._setEntityType("home", "colour", r.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">EV</div>
        <div class="flat-body">
          <ha-entity-picker
            label="ev_soc"
            .hass=${this.hass}
            .value=${o.soc ?? ""}
            @value-changed=${(r) => this._setEntityType("ev", "soc", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="ev_combined_power"
            .hass=${this.hass}
            .value=${o.power_combined ?? ""}
            @value-changed=${(r) => this._setEntityType("ev", "power_combined", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="ev_daily_usage"
            .hass=${this.hass}
            .value=${o.daily_usage ?? ""}
            @value-changed=${(r) => this._setEntityType("ev", "daily_usage", r.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${o.show_zero !== !1}
              @change=${(r) => this._setEntityType("ev", "show_zero", r.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${o.zero_tolerance != null ? String(o.zero_tolerance) : ""}
            @change=${(r) => {
      const $ = r.target.value;
      this._setEntityType("ev", "zero_tolerance", $ !== "" ? Number($) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${o.label ?? ""}
            @change=${(r) => this._setEntityType("ev", "label", r.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${o.colour ?? ""}
            placeholder="#1e88e5"
            @change=${(r) => this._setEntityType("ev", "colour", r.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Custom 1</div>
        <div class="flat-body">
          <ha-entity-picker
            label="custom1_import_power"
            .hass=${this.hass}
            .value=${n.power_import ?? ""}
            @value-changed=${(r) => this._setEntityType(a, "power_import", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_export_power"
            .hass=${this.hass}
            .value=${n.power_export ?? ""}
            @value-changed=${(r) => this._setEntityType(a, "power_export", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_combined_power"
            .hass=${this.hass}
            .value=${n.power_combined ?? ""}
            @value-changed=${(r) => this._setEntityType(a, "power_combined", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_daily_usage"
            .hass=${this.hass}
            .value=${n.daily_usage ?? ""}
            @value-changed=${(r) => this._setEntityType(a, "daily_usage", r.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_soc"
            .hass=${this.hass}
            .value=${n.soc ?? ""}
            @value-changed=${(r) => this._setEntityType(a, "soc", r.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${n.show_zero !== !1}
              @change=${(r) => this._setEntityType(a, "show_zero", r.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${n.zero_tolerance != null ? String(n.zero_tolerance) : ""}
            @change=${(r) => {
      const $ = r.target.value;
      this._setEntityType(a, "zero_tolerance", $ !== "" ? Number($) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${n.label ?? ""}
            @change=${(r) => this._setEntityType(a, "label", r.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${n.colour ?? ""}
            placeholder="#9e9e9e"
            @change=${(r) => this._setEntityType(a, "colour", r.target.value || void 0)}
          ></ha-textfield>
          <div class="remove-row">
            <button class="text-btn" @click=${() => this._removeCustomType(a)}>
              Remove type
            </button>
          </div>
        </div>
      </div>

      <div class="add-type">
        <ha-textfield
          label="Add custom type"
          .value=${this._newTypeName}
          @input=${(r) => this._newTypeName = r.target.value}
          @keydown=${(r) => r.key === "Enter" && this._addCustomType()}
        ></ha-textfield>
        <mwc-button @click=${this._addCustomType}>Add</mwc-button>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">Live Data</div>
      <div class="flat-section">
        <div class="flat-body">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(l.refresh_interval ?? 5)}
            @change=${(r) => this._set("live_data", {
      ...l,
      refresh_interval: Number(r.target.value)
    })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${l.show_live_badge ?? !0}
              @change=${(r) => this._set("live_data", {
      ...l,
      show_live_badge: r.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">System</div>
      <div class="flat-section">
        <div class="flat-body">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(c.energy_date_reset ?? 0)}
            @change=${(r) => this._set("system", {
      ...c,
      energy_date_reset: Number(r.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${c.time_format ?? "24h"}
            @value-changed=${(r) => this._set("system", {
      ...c,
      time_format: r.detail.value
    })}
          >
            <mwc-list-item value="12h">12h</mwc-list-item>
            <mwc-list-item value="24h">24h</mwc-list-item>
          </ha-select>
        </div>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">Display</div>
      <div class="flat-section">
        <div class="flat-body">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(h.decimal_places ?? 1)}
            @change=${(r) => this._set("display", {
      ...h,
      decimal_places: Number(r.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${h.unit ?? "auto"}
            @value-changed=${(r) => this._set("display", {
      ...h,
      unit: r.detail.value
    })}
          >
            <mwc-list-item value="W">W</mwc-list-item>
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
          <div class="switch-row">
            <span>Animation</span>
            <ha-switch
              .checked=${h.animation ?? !0}
              @change=${(r) => this._set("display", {
      ...h,
      animation: r.target.checked
    })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${h.dynamic_animation_speed ?? !1}
              @change=${(r) => this._set("display", {
      ...h,
      dynamic_animation_speed: r.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </div>
    `;
  }
};
O.styles = F`
    :host {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .top-fields,
    .flat-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .top-fields {
      margin-bottom: 8px;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
    }

    ha-select {
      margin-bottom: 8px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    .group-divider {
      height: 1px;
      background: var(--divider-color, rgba(0,0,0,0.12));
      margin: 8px 0;
    }

    .group-heading {
      font-size: 0.72em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      opacity: 0.45;
      padding: 4px 0 2px;
    }

    .flat-section {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 6px;
      padding: 12px 16px 16px;
      margin-bottom: 8px;
    }

    .flat-heading {
      font-size: 0.95em;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 10px;
    }

    .add-type {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .add-type ha-textfield {
      flex: 1;
    }

    .remove-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }

    button.text-btn {
      background: none;
      border: none;
      color: var(--error-color, #db4437);
      font-size: 0.78em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      cursor: pointer;
      padding: 0;
    }

    .detect-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 12px;
    }

    .detect-block ha-button {
      width: 100%;
      --mdc-button-horizontal-padding: 16px;
    }

    .detect-status {
      font-size: 0.8em;
      opacity: 0.65;
      padding: 0 2px;
    }

    .detect-status.error {
      color: var(--error-color, #db4437);
      opacity: 1;
    }
  `;
G([
  m({ attribute: !1 })
], O.prototype, "hass", 2);
G([
  m({ attribute: !1 })
], O.prototype, "config", 2);
G([
  Z()
], O.prototype, "_newTypeName", 2);
G([
  Z()
], O.prototype, "_detectStatus", 2);
G([
  Z()
], O.prototype, "_detectIsError", 2);
O = G([
  V("home-energy-card-editor")
], O);
var Ot = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, he = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Pt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Ot(e, t, o), o;
};
function oe(s, e) {
  if (!e) return null;
  const t = s[e];
  if (!t || t.state === "unavailable" || t.state === "unknown") return null;
  const i = parseFloat(t.state);
  return isNaN(i) ? null : t.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function ae(s, e) {
  return s === null ? "—" : s.toFixed(e);
}
function zt(s) {
  const e = s.toLowerCase().replace(/[\s_-]/g, ""), t = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => e.includes(i)) ? { label: t, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => e.includes(i)) && !e.includes("off") ? { label: t, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => e.includes(i)) ? { label: t, bg: "#fff8e1", fg: "#e65100" } : {
    label: t,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let B = class extends E {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, x, b, A, r, $, Te, Ae, Se, Ce, Oe;
    if (!this.config) return f;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, e = this.config.entity_types ?? {}, t = ((x = this.config.display) == null ? void 0 : x.decimal_places) ?? 1, i = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, o = i && i !== "unavailable" && i !== "unknown" ? zt(i) : null, a = oe(s, (A = e.solar) == null ? void 0 : A.daily_usage), n = oe(s, (r = e.home) == null ? void 0 : r.daily_usage), l = oe(s, ($ = e.grid) == null ? void 0 : $.daily_usage), c = oe(s, (Te = e.grid) == null ? void 0 : Te.daily_export), h = !!((Ae = e.solar) != null && Ae.daily_usage), u = !!((Se = e.home) != null && Se.daily_usage), d = !!((Ce = e.grid) != null && Ce.daily_usage), _ = !!((Oe = e.grid) != null && Oe.daily_export), v = d || _, p = h || u || v;
    return g`
      <div class="header">

        ${this.showTitle || o ? g`
          <div class="title-row">
            ${this.showTitle ? g`<span class="title">${this.config.title ?? "Home Energy"}</span>` : f}
            ${o ? g`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : f}
          </div>
        ` : f}

        ${p ? g`
          <div class="stats-row">

            ${h ? g`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${ae(a, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${u ? g`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${ae(n, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${v ? g`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? g`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${ae(l, t)}</span>
                    </div>
                  ` : f}
                  ${_ ? g`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${ae(c, t)}</span>
                    </div>
                  ` : f}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : f}

          </div>
        ` : f}

      </div>
    `;
  }
};
B.styles = F`
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
he([
  m({ attribute: !1 })
], B.prototype, "hass", 2);
he([
  m({ attribute: !1 })
], B.prototype, "config", 2);
he([
  m({ type: Boolean })
], B.prototype, "showTitle", 2);
B = he([
  V("hec-card-header")
], B);
var Nt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, P = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Dt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Nt(e, t, o), o;
};
const Mt = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Ht = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, _e = 38, We = +(2 * Math.PI * _e).toFixed(4);
function tt(s, e, t) {
  if (s === null) return "—";
  const i = Math.abs(s);
  return e === "W" || e === "auto" && i < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(t)} kW`;
}
let k = class extends E {
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
    const s = Mt[this.type] ?? Ht, e = this.colour || s.accent, t = this.soc !== null, i = t ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(We * (1 - i / 100)).toFixed(4);
    return g`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${t ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${_e}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${_e}"
            style="stroke-dasharray:${We};stroke-dashoffset:${o};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${s.gradStart} 0%,${s.gradEnd} 100%);color:${e};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s.icon}></ha-icon>
          <span class="label" style="color:${e};">${this.label || this.type}</span>
          <span class="power">${tt(this.power, this.unit, this.decimalPlaces)}</span>
          ${t ? g`
            <span class="soc-pct">
              <ha-icon class="soc-icon" icon="mdi:battery"></ha-icon>
              ${this.soc.toFixed(0)}%
            </span>
          ` : f}
        </div>

      </div>
    `;
  }
};
k.styles = F`
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
], k.prototype, "type", 2);
P([
  m()
], k.prototype, "label", 2);
P([
  m()
], k.prototype, "colour", 2);
P([
  m({ type: Number })
], k.prototype, "power", 2);
P([
  m({ type: Number })
], k.prototype, "soc", 2);
P([
  m()
], k.prototype, "unit", 2);
P([
  m({ type: Number })
], k.prototype, "decimalPlaces", 2);
k = P([
  V("hec-energy-node")
], k);
function ge(s, e) {
  var o;
  if (!e) return null;
  const t = (o = s[e]) == null ? void 0 : o.state;
  if (!t || t === "unavailable" || t === "unknown") return null;
  const i = parseFloat(t);
  return isNaN(i) ? null : i;
}
function st(s, e, t) {
  const i = e.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let a;
  if (e.power_combined)
    a = ge(t, e.power_combined);
  else {
    const c = !!e.power_import, h = !!e.power_export;
    if (!c && !h) return o;
    const u = c ? ge(t, e.power_import) : null, d = h ? ge(t, e.power_export) : null;
    if ((!c || u === null) && (!h || d === null)) return o;
    a = (u ?? 0) - (d ?? 0);
  }
  if (a === null) return o;
  if (Math.abs(a) <= i) return { power: a, magnitude: null, direction: "idle" };
  const n = Math.abs(a);
  let l;
  switch (s) {
    case "solar":
      l = "to-home";
      break;
    case "grid":
      l = a > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      l = a > 0 ? "from-home" : "to-home";
      break;
    default:
      l = a > 0 ? "from-home" : "to-home";
  }
  return { power: a, magnitude: n, direction: l };
}
var jt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, j = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ut(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && jt(e, t, o), o;
};
const It = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Lt = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Rt = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Bt(s) {
  const e = Date.now(), t = e - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let o = 0; o < 24; o++) {
    const a = t + o * 36e5, n = a + 36e5;
    let l = 0, c = 0;
    for (let h = 0; h < s.length; h++) {
      const u = new Date(s[h].last_changed).getTime(), d = h + 1 < s.length ? new Date(s[h + 1].last_changed).getTime() : e, _ = Math.max(u, a), v = Math.min(d, n);
      if (v <= _) continue;
      const p = parseFloat(s[h].state);
      if (isNaN(p)) continue;
      const y = v - _;
      l += Math.abs(p) * y, c += y;
    }
    c > 0 && (i[o] = l / c);
  }
  return i;
}
function it(s, e) {
  if (!e) return null;
  const t = s[e];
  if (!t || t.state === "unavailable" || t.state === "unknown") return null;
  const i = parseFloat(t.state);
  return isNaN(i) ? null : i;
}
function Fe(s, e) {
  var o;
  const t = it(s, e);
  return t === null ? null : ((o = s[e]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? t / 1e3 : t;
}
function Ve(s, e) {
  return s === null ? "—" : `${s.toFixed(e)} kWh`;
}
function Wt(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Ze(s) {
  const e = new Date(s);
  return `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
}
function Ft(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Vt(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let T = class extends E {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(s) {
    super.updated(s), (s.has("open") || s.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var t, i;
    const s = (i = (t = this.config) == null ? void 0 : t.entity_types) == null ? void 0 : i[this.nodeType], e = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!(!e || !this.hass)) {
      this._loading = !0, this._hourly = [];
      try {
        const o = /* @__PURE__ */ new Date(), n = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${e}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, l = await this.hass.callApi("GET", n);
        this._hourly = Bt((l == null ? void 0 : l[0]) ?? []);
      } catch (o) {
        console.warn("[hec-node-detail] history fetch failed", o), this._hourly = [];
      } finally {
        this._loading = !1;
      }
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(s, e, t) {
    return g`
      <div class="d-header">
        <ha-icon .icon=${e} style="color:${s};--mdc-icon-size:22px;"></ha-icon>
        <span class="d-title">${t}</span>
        <button class="close-btn" @click=${this._close} aria-label="Close">
          <ha-icon icon="mdi:close" style="--mdc-icon-size:18px;"></ha-icon>
        </button>
      </div>
    `;
  }
  _sectionPower(s) {
    var o, a, n, l, c;
    const e = ((a = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : a.decimal_places) ?? 1, t = ((l = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : l.unit) ?? "auto", i = ((c = Rt[this.nodeType]) == null ? void 0 : c[s.direction]) ?? "";
    return g`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${tt(s.power, t, e)}</div>
        ${i ? g`<div class="power-sub">${i}</div>` : f}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return f;
    const e = Vt(s);
    return g`
      <div class="section">
        <div class="s-title">State of charge</div>
        <div class="soc-row">
          <div class="soc-track">
            <div class="soc-fill" style="width:${s}%;background:${e};"></div>
          </div>
          <span class="soc-pct">${s.toFixed(0)}%</span>
        </div>
      </div>
    `;
  }
  _sectionDaily(s) {
    var n, l, c;
    const e = ((n = this.hass) == null ? void 0 : n.states) ?? {}, t = ((c = (l = this.config) == null ? void 0 : l.display) == null ? void 0 : c.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", a = [];
    return s.daily_usage && a.push([i, Ve(Fe(e, s.daily_usage), t)]), s.daily_export && a.push([o, Ve(Fe(e, s.daily_export), t)]), a.length ? g`
      <div class="section">
        <div class="s-title">Today</div>
        ${a.map(([h, u]) => g`
          <div class="kv">
            <span class="kv-k">${h}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : f;
  }
  _sectionOctopus(s) {
    var p;
    const e = ((p = this.hass) == null ? void 0 : p.states) ?? {}, t = s.rate_entity ? e[s.rate_entity] : null, i = s.cost_entity ? e[s.cost_entity] : null, o = s.slots_entity ? e[s.slots_entity] : null, a = t == null ? void 0 : t.state, n = (t == null ? void 0 : t.attributes.unit_of_measurement) ?? "p/kWh", l = i == null ? void 0 : i.state, c = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", h = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], u = Date.now(), d = h.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > u).slice(0, 6), _ = a && a !== "unavailable" && a !== "unknown", v = l && l !== "unavailable" && l !== "unknown";
    return !_ && !v && !d.length ? f : g`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${_ ? g`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(a).toFixed(2)} ${n}</span>
          </div>
        ` : f}

        ${v ? g`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${c}${parseFloat(l).toFixed(2)}</span>
          </div>
        ` : f}

        ${d.length ? g`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((y) => {
      const x = y.start ?? y.start_time ?? "", b = y.end ?? y.end_time ?? "", A = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, r = Ft(A);
      return g`
              <div class="slot">
                <span class="slot-dot" style="background:${r};"></span>
                <span class="slot-time">${Ze(x)}–${Ze(b)}</span>
                <span class="slot-rate" style="color:${r};">${(+A).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : f}
      </div>
    `;
  }
  _sectionChart(s) {
    const e = this._hourly.filter((a) => a !== null), t = e.length ? Math.max(...e) : 0, i = /* @__PURE__ */ new Date(), o = (a) => Wt(new Date(i.getTime() - a * 36e5));
    return this._loading ? g`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : g`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${t === 0 ? g`<div class="chart-msg">No data</div>` : g`
              ${J`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((a, n) => {
      if (a === null || a <= 0) return J``;
      const l = Math.max(2, a / t * 48);
      return J`
                      <rect
                        x="${n * 10 + 0.5}" y="${52 - l}"
                        width="9" height="${l}" rx="2"
                        fill="${s}" opacity="0.82"
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
    var c, h, u;
    if (!this.open || !this.nodeType) return f;
    const s = ((h = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : h[this.nodeType]) ?? {}, e = ((u = this.hass) == null ? void 0 : u.states) ?? {}, t = s.colour || (Lt[this.nodeType] ?? "#9e9e9e"), i = It[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), a = st(this.nodeType, s, e), n = ["battery", "ev"].includes(this.nodeType) && !!s.soc, l = n ? it(e, s.soc) : null;
    return g`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(t, i, o)}
          ${this._sectionPower(a)}
          ${n ? this._sectionSoc(l) : f}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : f}
          ${this._sectionChart(t)}
        </div>
      </div>
    `;
  }
};
T.styles = F`
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
j([
  m({ attribute: !1 })
], T.prototype, "hass", 2);
j([
  m({ attribute: !1 })
], T.prototype, "config", 2);
j([
  m()
], T.prototype, "nodeType", 2);
j([
  m({ type: Boolean })
], T.prototype, "open", 2);
j([
  Z()
], T.prototype, "_hourly", 2);
j([
  Z()
], T.prototype, "_loading", 2);
T = j([
  V("hec-node-detail")
], T);
var Zt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, de = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Gt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Zt(e, t, o), o;
};
function Kt(s, e) {
  return !e || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const qt = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, Yt = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let W = class extends E {
  constructor() {
    super(...arguments), this._dialogType = null;
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(s) {
    var e;
    return s in (((e = this.config) == null ? void 0 : e.entity_types) ?? {});
  }
  _flowInfo(s) {
    var t, i, o;
    const e = ((i = (t = this.config) == null ? void 0 : t.entity_types) == null ? void 0 : i[s]) ?? {};
    return st(s, e, ((o = this.hass) == null ? void 0 : o.states) ?? {});
  }
  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  _isVisible(s) {
    var t, i;
    return !(!this._configured(s) || (((i = (t = this.config) == null ? void 0 : t.entity_types) == null ? void 0 : i[s]) ?? {}).show_zero === !1 && this._flowInfo(s).direction === "idle");
  }
  _soc(s) {
    var o, a, n, l;
    const e = (n = (a = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : a[s]) == null ? void 0 : n.soc;
    if (!e || !this.hass) return null;
    const t = (l = this.hass.states[e]) == null ? void 0 : l.state;
    if (!t || t === "unavailable" || t === "unknown") return null;
    const i = parseFloat(t);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var t, i, o, a;
    const s = ((i = (t = this.config) == null ? void 0 : t.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, e = ((a = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : a.animation) !== !1;
    return J`
      ${["solar", "grid", "battery", "ev"].filter((n) => this._isVisible(n)).map((n) => {
      const l = this._flowInfo(n), [c, h, u, d] = Yt[n], _ = l.direction === "idle", v = l.direction === "from-home", p = Kt(l.magnitude, s && !_), y = [
        "flow-line",
        v ? "reverse" : "",
        _ ? "idle" : "",
        e ? "" : "paused"
      ].filter(Boolean).join(" ");
      return J`
            <line
              x1="${c}" y1="${h}" x2="${u}" y2="${d}"
              stroke="${qt[n]}"
              class="${y}"
              style="--flow-dur:${p}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, e, t = !1) {
    var l, c, h;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[s]) ?? {}, a = ((h = this.config) == null ? void 0 : h.display) ?? {}, n = this._flowInfo(s);
    return g`
      <hec-energy-node
        class="${e}${i ? "" : " hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${n.power}
        .soc=${t ? this._soc(s) : null}
        .unit=${a.unit ?? "auto"}
        .decimalPlaces=${a.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var s;
    return Object.keys(((s = this.config) == null ? void 0 : s.entity_types) ?? {}).filter(
      (e) => !et.includes(e)
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
  _customNode(s, e, t) {
    var l, c, h;
    const i = this._isVisible(s), o = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[s]) ?? {}, a = ((h = this.config) == null ? void 0 : h.display) ?? {}, n = this._flowInfo(s);
    return g`
      <hec-energy-node
        style="grid-column:${e}; grid-row:${t}"
        class="${i ? "" : "hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${n.power}
        .soc=${null}
        .unit=${a.unit ?? "auto"}
        .decimalPlaces=${a.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Dialog ────────────────────────────────────────────────────────────────
  _onNodeClick(s) {
    const e = s.detail;
    e != null && e.nodeType && (this._dialogType = e.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return f;
    const s = this._customTypes(), e = 2 + Math.ceil(s.length / 3);
    return g`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${e}" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : f}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : f}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${s.map((t, i) => {
      const [o, a] = this._customSlot(i);
      return this._customNode(t, o, a);
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
W.styles = F`
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
de([
  m({ attribute: !1 })
], W.prototype, "hass", 2);
de([
  m({ attribute: !1 })
], W.prototype, "config", 2);
de([
  Z()
], W.prototype, "_dialogType", 2);
W = de([
  V("hec-flow-layout")
], W);
var Jt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, ke = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Qt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Jt(e, t, o), o;
};
let te = class extends E {
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
    return this.config ? g`
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
    ` : f;
  }
};
te.styles = F`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
ke([
  m({ attribute: !1 })
], te.prototype, "hass", 2);
ke([
  m({ attribute: !1 })
], te.prototype, "config", 2);
te = ke([
  V("home-energy-card")
], te);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  te as HomeEnergyCard
};
