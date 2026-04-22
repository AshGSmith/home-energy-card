/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, _e = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), Oe = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (_e && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (s) => new Ke(typeof s == "string" ? s : s + "", void 0, ve), B = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new Ke(t, s, ve);
}, nt = (s, e) => {
  if (_e) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = ne.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, s.appendChild(i);
  }
}, ze = _e ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ot(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: at, defineProperty: rt, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: ht, getPrototypeOf: dt } = Object, T = globalThis, Ne = T.trustedTypes, pt = Ne ? Ne.emptyScript : "", de = T.reactiveElementPolyfillSupport, K = (s, e) => s, ae = { toAttribute(s, e) {
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
} }, me = (s, e) => !at(s, e), De = { attribute: !0, type: String, converter: ae, reflect: !1, useDefault: !1, hasChanged: me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
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
    const { get: o, set: n } = lt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: o, set(a) {
      const l = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? De;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const e = dt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
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
    return nt(e, this.constructor.elementStyles), e;
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
    var n;
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const a = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : ae).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, a;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const l = i.getPropertyOptions(o), r = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : ae;
      this._$Em = o;
      const c = r.fromAttribute(t, l.type);
      this[o] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, n) {
    var a;
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (n = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? me)(n, t) || i.useDefault && i.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: o, wrapped: n }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: l } = a, r = this[n];
        l !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, a, r);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[K("elementProperties")] = /* @__PURE__ */ new Map(), M[K("finalized")] = /* @__PURE__ */ new Map(), de == null || de({ ReactiveElement: M }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, Ue = (s) => s, re = q.trustedTypes, He = re ? re.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, qe = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + k, ut = `<${Ye}>`, N = document, J = () => N.createComment(""), Q = (s) => s === null || typeof s != "object" && typeof s != "function", be = Array.isArray, yt = (s) => be(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", pe = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, je = />/g, C = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ie = /'/g, Le = /"/g, Je = /^(?:script|style|textarea|title)$/i, Qe = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), u = Qe(1), Y = Qe(2), I = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), O = N.createTreeWalker(N, 129);
function Xe(s, e) {
  if (!be(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return He !== void 0 ? He.createHTML(e) : e;
}
const ft = (s, e) => {
  const t = s.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = G;
  for (let l = 0; l < t; l++) {
    const r = s[l];
    let c, d, h = -1, g = 0;
    for (; g < r.length && (a.lastIndex = g, d = a.exec(r), d !== null); ) g = a.lastIndex, a === G ? d[1] === "!--" ? a = Me : d[1] !== void 0 ? a = je : d[2] !== void 0 ? (Je.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = C) : d[3] !== void 0 && (a = C) : a === C ? d[0] === ">" ? (a = o ?? G, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, c = d[1], a = d[3] === void 0 ? C : d[3] === '"' ? Le : Ie) : a === Le || a === Ie ? a = C : a === Me || a === je ? a = G : (a = C, o = void 0);
    const _ = a === C && s[l + 1].startsWith("/>") ? " " : "";
    n += a === G ? r + ut : h >= 0 ? (i.push(c), r.slice(0, h) + qe + r.slice(h) + k + _) : r + k + (h === -2 ? l : _);
  }
  return [Xe(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class X {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const l = e.length - 1, r = this.parts, [c, d] = ft(e, t);
    if (this.el = X.createElement(c, i), O.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = O.nextNode()) !== null && r.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(qe)) {
          const g = d[a++], _ = o.getAttribute(h).split(k), y = /([.?@])?(.*)/.exec(g);
          r.push({ type: 1, index: n, name: y[2], strings: _, ctor: y[1] === "." ? _t : y[1] === "?" ? vt : y[1] === "@" ? mt : le }), o.removeAttribute(h);
        } else h.startsWith(k) && (r.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Je.test(o.tagName)) {
          const h = o.textContent.split(k), g = h.length - 1;
          if (g > 0) {
            o.textContent = re ? re.emptyScript : "";
            for (let _ = 0; _ < g; _++) o.append(h[_], J()), O.nextNode(), r.push({ type: 2, index: ++n });
            o.append(h[g], J());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ye) r.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(k, h + 1)) !== -1; ) r.push({ type: 7, index: n }), h += k.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = N.createElement("template");
    return i.innerHTML = e, i;
  }
}
function L(s, e, t = s, i) {
  var a, l;
  if (e === I) return e;
  let o = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const n = Q(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = L(s, o._$AS(s, e.values), o, i)), e;
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
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? N).importNode(t, !0);
    O.currentNode = o;
    let n = O.nextNode(), a = 0, l = 0, r = i[0];
    for (; r !== void 0; ) {
      if (a === r.index) {
        let c;
        r.type === 2 ? c = new te(n, n.nextSibling, this, e) : r.type === 1 ? c = new r.ctor(n, r.name, r.strings, this, e) : r.type === 6 && (c = new bt(n, this, e)), this._$AV.push(c), r = i[++l];
      }
      a !== (r == null ? void 0 : r.index) && (n = O.nextNode(), a++);
    }
    return O.currentNode = N, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class te {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = L(this, e, t), Q(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : yt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && Q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(N.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = X.createElement(Xe(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(t);
    else {
      const a = new gt(o, this), l = a.u(this.options);
      a.p(t), this.T(l), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Re.get(e.strings);
    return t === void 0 && Re.set(e.strings, t = new X(e)), t;
  }
  k(e) {
    be(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const n of e) o === t.length ? t.push(i = new te(this.O(J()), this.O(J()), this, this.options)) : i = t[o], i._$AI(n), o++;
    o < t.length && (this._$AR(i && i._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = Ue(e).nextSibling;
      Ue(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, o, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, t = this, i, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = L(this, e, t, 0), a = !Q(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
    else {
      const l = e;
      let r, c;
      for (e = n[0], r = 0; r < n.length - 1; r++) c = L(this, l[i + r], t, r), c === I && (c = this._$AH[r]), a || (a = !Q(c) || c !== this._$AH[r]), c === p ? e = p : e !== p && (e += (c ?? "") + n[r + 1]), this._$AH[r] = c;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class vt extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class mt extends le {
  constructor(e, t, i, o, n) {
    super(e, t, i, o, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = L(this, e, t, 0) ?? p) === I) return;
    const i = this._$AH, o = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== p && (i === p || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class bt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    L(this, e);
  }
}
const ue = q.litHtmlPolyfillSupport;
ue == null || ue(X, te), (q.litHtmlVersions ?? (q.litHtmlVersions = [])).push("3.3.2");
const $t = (s, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new te(e.insertBefore(J(), n), n, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
class w extends M {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $t(t, this.renderRoot, this.renderOptions);
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
}
var Ge;
w._$litElement$ = !0, w.finalized = !0, (Ge = z.litElementHydrateSupport) == null || Ge.call(z, { LitElement: w });
const ye = z.litElementPolyfillSupport;
ye == null || ye({ LitElement: w });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = { attribute: !0, type: String, converter: ae, reflect: !1, hasChanged: me }, xt = (s = wt, e, t) => {
  const { kind: i, metadata: o } = t;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), i === "accessor") {
    const { name: a } = t;
    return { set(l) {
      const r = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(a, r, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(l) {
      const r = this[a];
      e.call(this, l), this.requestUpdate(a, r, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function v(s) {
  return (e, t) => typeof t == "object" ? xt(s, e, t) : ((i, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(s) {
  return v({ ...s, state: !0, attribute: !1 });
}
const et = ["grid", "solar", "battery", "home", "ev"], $e = (s) => s.attributes.device_class ?? "", we = (s) => s.attributes.unit_of_measurement ?? "", xe = (s, e) => s.toLowerCase() + " " + (e.attributes.friendly_name ?? "").toLowerCase();
function P(...s) {
  return (e, t) => {
    let i = 0;
    $e(t) === "power" && (i += 4), ["W", "kW"].includes(we(t)) && (i += 2);
    const o = xe(e, t);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function j(...s) {
  return (e, t) => {
    let i = 0;
    $e(t) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(we(t)) && (i += 2);
    const o = xe(e, t);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function Ve(...s) {
  return (e, t) => {
    let i = 0;
    $e(t) === "battery" && (i += 4), we(t) === "%" && (i += 2);
    const o = xe(e, t);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function se(s, e = []) {
  return (t, i) => {
    const o = t.toLowerCase();
    if (e.some((a) => o.includes(a))) return 0;
    let n = 0;
    for (const a of s) o.includes(a) && (n += 4);
    return n;
  };
}
function m(s, e, t, i) {
  let o, n = 0;
  for (const a of s) {
    if (i.has(a)) continue;
    const l = e[a];
    if (!l) continue;
    const r = t(a, l);
    r > n && (n = r, o = a);
  }
  return o && i.add(o), o;
}
function Et(s, e, t) {
  const i = Object.values(e).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), o = Object.keys(s).filter((b) => b.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], l = {}, r = {}, c = m(
    n,
    s,
    se(["_current_rate"], ["export", "accumulative"]),
    t
  );
  c && (l.rate_entity = c, a.push("rate"));
  const d = m(
    n,
    s,
    se(["_current_accumulative_cost"]),
    t
  );
  d && (l.cost_entity = d, a.push("cost"));
  const h = m(
    n,
    s,
    se(["_current_day_rates"]),
    t
  );
  h && (l.slots_entity = h, a.push("slots"));
  const g = m(
    o.filter((b) => b.startsWith("binary_sensor.")),
    s,
    se(["_intelligent_dispatching"]),
    t
  );
  g && (l.dispatches_entity = g, a.push("dispatching")), Object.keys(l).length && (r.octopus = l);
  const _ = m(
    n,
    s,
    P("import", "demand", "current"),
    t
  );
  _ && (r.power_import = _, a.push("import power"));
  const y = m(
    n,
    s,
    P("export", "demand", "current"),
    t
  );
  y && (r.power_export = y, a.push("export power"));
  const f = m(
    n,
    s,
    j("import", "accumulative", "consumption"),
    t
  );
  f && (r.daily_usage = f, a.push("daily import"));
  const $ = m(
    n,
    s,
    j("export", "accumulative"),
    t
  );
  return $ && (r.daily_export = $, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: r }, summary: a };
}
function St(s, e, t) {
  const i = Object.values(e).filter(
    (y) => y.platform === "tesla_custom" && !y.disabled_by
  ), o = Object.keys(s).some(
    (y) => y.includes("powerwall") || y.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((y) => y.entity_id) : Object.keys(s).filter((y) => y.includes("powerwall") || y.includes("tesla")), a = n.filter((y) => y.includes("powerwall")), l = n.filter((y) => !y.includes("powerwall")), r = ["Tesla"], c = {};
  if (a.length > 0) {
    const y = {}, f = m(
      a,
      s,
      Ve("battery", "soc", "charge", "percent"),
      t
    );
    f && (y.soc = f);
    const $ = m(
      a,
      s,
      P("battery", "power", "charge", "discharge"),
      t
    );
    $ && (y.power_combined = $);
    const b = m(
      a,
      s,
      j("battery", "today", "daily", "charged"),
      t
    );
    b && (y.daily_usage = b), Object.keys(y).length && (c.battery = y, r.push("Powerwall"));
  }
  const d = m(
    n,
    s,
    P("solar"),
    t
  );
  if (d) {
    const y = { power_combined: d }, f = m(
      n,
      s,
      j("solar"),
      t
    );
    f && (y.daily_usage = f), c.solar = y, r.push("solar");
  }
  const h = m(
    n,
    s,
    P("load", "home", "house"),
    t
  );
  if (h) {
    const y = { power_combined: h }, f = m(
      n,
      s,
      j("load", "home", "house"),
      t
    );
    f && (y.daily_usage = f), c.home = y, r.push("home load");
  }
  const g = m(
    n,
    s,
    P("grid"),
    t
  );
  g && (c.grid = { power_combined: g }, r.push("grid"));
  const _ = m(
    l,
    s,
    Ve("battery", "battery_level", "soc", "charge"),
    t
  );
  if (_) {
    const y = { soc: _ }, f = m(
      l,
      s,
      P("charg", "power"),
      t
    );
    f && (y.power_combined = f);
    const $ = m(
      l,
      s,
      j("charg", "energy"),
      t
    );
    $ && (y.daily_usage = $), c.ev = y, r.push("EV");
  }
  return { integration_type: "tesla", entity_types: c, summary: r };
}
function kt(s) {
  var r, c;
  const e = s, t = e.states ?? {}, i = e.entities ?? {}, o = /* @__PURE__ */ new Set(), n = St(t, i, o), a = Et(t, i, o), l = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (l.integration_type = "tesla", Object.assign(l.entity_types, n.entity_types), l.summary.push(...n.summary ?? [])), a) {
    if (l.integration_type !== "tesla" && (l.integration_type = "octopus"), (r = a.entity_types) != null && r.grid) {
      const d = a.entity_types.grid;
      l.entity_types.grid = {
        ...l.entity_types.grid,
        ...d,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: d.power_import || (c = l.entity_types.grid) == null ? void 0 : c.power_combined
      };
    }
    a.tariff_entity && (l.tariff_entity = a.tariff_entity), l.summary.push(...a.summary ?? []);
  }
  return l;
}
function Tt(s, e, t = !1) {
  const i = { ...s };
  e.tariff_entity && (t || !s.tariff_entity) && (i.tariff_entity = e.tariff_entity);
  const o = s.entity_types ?? {}, n = { ...o };
  for (const [a, l] of Object.entries(e.entity_types)) {
    const r = o[a] ?? {}, c = { ...r };
    for (const [d, h] of Object.entries(l))
      h !== void 0 && (t || !r[d]) && (c[d] = h);
    n[a] = c;
  }
  return i.entity_types = n, i;
}
var At = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, U = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ct(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(e, t, o) : a(o)) || o);
  return i && o && At(e, t, o), o;
};
let E = class extends w {
  constructor() {
    super(...arguments), this._newTypeName = "", this._detectStatus = "", this._detectIsError = !1, this._openSections = /* @__PURE__ */ new Set();
  }
  setConfig(s) {
    this.config = s;
  }
  _runAutoDetect() {
    if (!this.hass) {
      this._detectStatus = "No hass object — editor not fully loaded.", this._detectIsError = !0;
      return;
    }
    const s = kt(this.hass);
    if (s.integration_type === "manual" && s.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.", this._detectIsError = !0;
      return;
    }
    const e = Tt(
      this.config,
      s,
      /* overwrite= */
      !1
    );
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
    i[s] = t === void 0 || t === "" || t === null ? (({ [e]: n, ...a }) => a)(i[s] ?? {}) : { ...i[s], [e]: t }, this._set("entity_types", i);
  }
  _setOctopus(s, e, t) {
    var l;
    const i = { ...((l = this.config) == null ? void 0 : l.entity_types) ?? {} }, o = i[s] ?? {}, n = { ...o.octopus, [e]: t || void 0 }, a = Object.values(n).some(Boolean);
    i[s] = a ? { ...o, octopus: n } : (({ octopus: r, ...c }) => c)(o), this._set("entity_types", i);
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
  _toggleSection(s) {
    const e = new Set(this._openSections);
    e.has(s) ? e.delete(s) : e.add(s), this._openSections = e;
  }
  // ── Per-type section renderers ─────────────────────────────────────────────
  _renderGridSection() {
    var a, l, r, c, d;
    const s = this._openSections.has("grid"), e = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l.grid) ?? {}, t = e.show_zero !== !1, i = e.zero_tolerance != null ? String(e.zero_tolerance) : "", o = e.label ?? "", n = e.colour ?? "";
    return u`
      <div class="type-block">
        <button class="type-toggle" @click=${() => this._toggleSection("grid")}>
          <span>Grid</span>
          <ha-icon icon="mdi:chevron-${s ? "up" : "down"}"></ha-icon>
        </button>
        ${s ? u`
          <div class="type-body">
            <div class="subsection-label">Entities</div>
            <ha-entity-picker
              label="Import Power"
              .hass=${this.hass}
              .value=${e.power_import ?? ""}
              @value-changed=${(h) => this._setEntityType("grid", "power_import", h.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Export Power"
              .hass=${this.hass}
              .value=${e.power_export ?? ""}
              @value-changed=${(h) => this._setEntityType("grid", "power_export", h.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Combined Power"
              .hass=${this.hass}
              .value=${e.power_combined ?? ""}
              @value-changed=${(h) => this._setEntityType("grid", "power_combined", h.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Daily Usage"
              .hass=${this.hass}
              .value=${e.daily_usage ?? ""}
              @value-changed=${(h) => this._setEntityType("grid", "daily_usage", h.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Octopus Energy</div>
            <ha-entity-picker
              label="Rate entity"
              .hass=${this.hass}
              .value=${((r = e.octopus) == null ? void 0 : r.rate_entity) ?? ""}
              @value-changed=${(h) => this._setOctopus("grid", "rate_entity", h.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Cost today entity"
              .hass=${this.hass}
              .value=${((c = e.octopus) == null ? void 0 : c.cost_entity) ?? ""}
              @value-changed=${(h) => this._setOctopus("grid", "cost_entity", h.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Slots / rates entity"
              .hass=${this.hass}
              .value=${((d = e.octopus) == null ? void 0 : d.slots_entity) ?? ""}
              @value-changed=${(h) => this._setOctopus("grid", "slots_entity", h.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Display</div>
            <div class="switch-row">
              <span>Show when idle</span>
              <ha-switch
                .checked=${t}
                @change=${(h) => this._setEntityType("grid", "show_zero", h.target.checked)}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Zero tolerance (W)"
              type="number"
              min="0"
              .value=${i}
              @change=${(h) => {
      const g = h.target.value;
      this._setEntityType("grid", "zero_tolerance", g !== "" ? Number(g) : void 0);
    }}
            ></ha-textfield>
            <ha-textfield
              label="Label"
              .value=${o}
              @change=${(h) => this._setEntityType("grid", "label", h.target.value || void 0)}
            ></ha-textfield>
            <ha-textfield
              label="Colour"
              .value=${n}
              placeholder="#e91e63"
              @change=${(h) => this._setEntityType("grid", "colour", h.target.value || void 0)}
            ></ha-textfield>
          </div>
        ` : p}
      </div>
    `;
  }
  _renderSolarSection() {
    var a, l;
    const s = this._openSections.has("solar"), e = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l.solar) ?? {}, t = e.show_zero !== !1, i = e.zero_tolerance != null ? String(e.zero_tolerance) : "", o = e.label ?? "", n = e.colour ?? "";
    return u`
      <div class="type-block">
        <button class="type-toggle" @click=${() => this._toggleSection("solar")}>
          <span>Solar</span>
          <ha-icon icon="mdi:chevron-${s ? "up" : "down"}"></ha-icon>
        </button>
        ${s ? u`
          <div class="type-body">
            <div class="subsection-label">Entities</div>
            <ha-entity-picker
              label="Combined Power"
              .hass=${this.hass}
              .value=${e.power_combined ?? ""}
              @value-changed=${(r) => this._setEntityType("solar", "power_combined", r.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Daily Usage"
              .hass=${this.hass}
              .value=${e.daily_usage ?? ""}
              @value-changed=${(r) => this._setEntityType("solar", "daily_usage", r.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Display</div>
            <div class="switch-row">
              <span>Show when idle</span>
              <ha-switch
                .checked=${t}
                @change=${(r) => this._setEntityType("solar", "show_zero", r.target.checked)}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Zero tolerance (W)"
              type="number"
              min="0"
              .value=${i}
              @change=${(r) => {
      const c = r.target.value;
      this._setEntityType("solar", "zero_tolerance", c !== "" ? Number(c) : void 0);
    }}
            ></ha-textfield>
            <ha-textfield
              label="Label"
              .value=${o}
              @change=${(r) => this._setEntityType("solar", "label", r.target.value || void 0)}
            ></ha-textfield>
            <ha-textfield
              label="Colour"
              .value=${n}
              placeholder="#f9a825"
              @change=${(r) => this._setEntityType("solar", "colour", r.target.value || void 0)}
            ></ha-textfield>
          </div>
        ` : p}
      </div>
    `;
  }
  _renderBatterySection() {
    var a, l;
    const s = this._openSections.has("battery"), e = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l.battery) ?? {}, t = e.show_zero !== !1, i = e.zero_tolerance != null ? String(e.zero_tolerance) : "", o = e.label ?? "", n = e.colour ?? "";
    return u`
      <div class="type-block">
        <button class="type-toggle" @click=${() => this._toggleSection("battery")}>
          <span>Battery</span>
          <ha-icon icon="mdi:chevron-${s ? "up" : "down"}"></ha-icon>
        </button>
        ${s ? u`
          <div class="type-body">
            <div class="subsection-label">Entities</div>
            <ha-entity-picker
              label="State of Charge"
              .hass=${this.hass}
              .value=${e.soc ?? ""}
              @value-changed=${(r) => this._setEntityType("battery", "soc", r.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Combined Power"
              .hass=${this.hass}
              .value=${e.power_combined ?? ""}
              @value-changed=${(r) => this._setEntityType("battery", "power_combined", r.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Daily Usage"
              .hass=${this.hass}
              .value=${e.daily_usage ?? ""}
              @value-changed=${(r) => this._setEntityType("battery", "daily_usage", r.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Display</div>
            <div class="switch-row">
              <span>Show when idle</span>
              <ha-switch
                .checked=${t}
                @change=${(r) => this._setEntityType("battery", "show_zero", r.target.checked)}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Zero tolerance (W)"
              type="number"
              min="0"
              .value=${i}
              @change=${(r) => {
      const c = r.target.value;
      this._setEntityType("battery", "zero_tolerance", c !== "" ? Number(c) : void 0);
    }}
            ></ha-textfield>
            <ha-textfield
              label="Label"
              .value=${o}
              @change=${(r) => this._setEntityType("battery", "label", r.target.value || void 0)}
            ></ha-textfield>
            <ha-textfield
              label="Colour"
              .value=${n}
              placeholder="#43a047"
              @change=${(r) => this._setEntityType("battery", "colour", r.target.value || void 0)}
            ></ha-textfield>
          </div>
        ` : p}
      </div>
    `;
  }
  _renderHomeSection() {
    var a, l;
    const s = this._openSections.has("home"), e = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l.home) ?? {}, t = e.show_zero !== !1, i = e.zero_tolerance != null ? String(e.zero_tolerance) : "", o = e.label ?? "", n = e.colour ?? "";
    return u`
      <div class="type-block">
        <button class="type-toggle" @click=${() => this._toggleSection("home")}>
          <span>Home</span>
          <ha-icon icon="mdi:chevron-${s ? "up" : "down"}"></ha-icon>
        </button>
        ${s ? u`
          <div class="type-body">
            <div class="subsection-label">Entities</div>
            <ha-entity-picker
              label="Combined Power"
              .hass=${this.hass}
              .value=${e.power_combined ?? ""}
              @value-changed=${(r) => this._setEntityType("home", "power_combined", r.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Daily Usage"
              .hass=${this.hass}
              .value=${e.daily_usage ?? ""}
              @value-changed=${(r) => this._setEntityType("home", "daily_usage", r.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Display</div>
            <div class="switch-row">
              <span>Show when idle</span>
              <ha-switch
                .checked=${t}
                @change=${(r) => this._setEntityType("home", "show_zero", r.target.checked)}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Zero tolerance (W)"
              type="number"
              min="0"
              .value=${i}
              @change=${(r) => {
      const c = r.target.value;
      this._setEntityType("home", "zero_tolerance", c !== "" ? Number(c) : void 0);
    }}
            ></ha-textfield>
            <ha-textfield
              label="Label"
              .value=${o}
              @change=${(r) => this._setEntityType("home", "label", r.target.value || void 0)}
            ></ha-textfield>
            <ha-textfield
              label="Colour"
              .value=${n}
              placeholder="#388e3c"
              @change=${(r) => this._setEntityType("home", "colour", r.target.value || void 0)}
            ></ha-textfield>
          </div>
        ` : p}
      </div>
    `;
  }
  _renderEvSection() {
    var a, l;
    const s = this._openSections.has("ev"), e = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l.ev) ?? {}, t = e.show_zero !== !1, i = e.zero_tolerance != null ? String(e.zero_tolerance) : "", o = e.label ?? "", n = e.colour ?? "";
    return u`
      <div class="type-block">
        <button class="type-toggle" @click=${() => this._toggleSection("ev")}>
          <span>EV</span>
          <ha-icon icon="mdi:chevron-${s ? "up" : "down"}"></ha-icon>
        </button>
        ${s ? u`
          <div class="type-body">
            <div class="subsection-label">Entities</div>
            <ha-entity-picker
              label="State of Charge"
              .hass=${this.hass}
              .value=${e.soc ?? ""}
              @value-changed=${(r) => this._setEntityType("ev", "soc", r.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Combined Power"
              .hass=${this.hass}
              .value=${e.power_combined ?? ""}
              @value-changed=${(r) => this._setEntityType("ev", "power_combined", r.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Daily Usage"
              .hass=${this.hass}
              .value=${e.daily_usage ?? ""}
              @value-changed=${(r) => this._setEntityType("ev", "daily_usage", r.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Display</div>
            <div class="switch-row">
              <span>Show when idle</span>
              <ha-switch
                .checked=${t}
                @change=${(r) => this._setEntityType("ev", "show_zero", r.target.checked)}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Zero tolerance (W)"
              type="number"
              min="0"
              .value=${i}
              @change=${(r) => {
      const c = r.target.value;
      this._setEntityType("ev", "zero_tolerance", c !== "" ? Number(c) : void 0);
    }}
            ></ha-textfield>
            <ha-textfield
              label="Label"
              .value=${o}
              @change=${(r) => this._setEntityType("ev", "label", r.target.value || void 0)}
            ></ha-textfield>
            <ha-textfield
              label="Colour"
              .value=${n}
              placeholder="#1e88e5"
              @change=${(r) => this._setEntityType("ev", "colour", r.target.value || void 0)}
            ></ha-textfield>
          </div>
        ` : p}
      </div>
    `;
  }
  _renderCustomSection(s) {
    var l, r;
    const e = this._openSections.has(s), t = ((r = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : r[s]) ?? {}, i = t.show_zero !== !1, o = t.zero_tolerance != null ? String(t.zero_tolerance) : "", n = t.label ?? "", a = t.colour ?? "";
    return u`
      <div class="type-block">
        <button class="type-toggle" @click=${() => this._toggleSection(s)}>
          <span>${this._capitalize(s)}</span>
          <ha-icon icon="mdi:chevron-${e ? "up" : "down"}"></ha-icon>
        </button>
        ${e ? u`
          <div class="type-body">
            <div class="subsection-label">Entities</div>
            <ha-entity-picker
              label="Import Power"
              .hass=${this.hass}
              .value=${t.power_import ?? ""}
              @value-changed=${(c) => this._setEntityType(s, "power_import", c.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Export Power"
              .hass=${this.hass}
              .value=${t.power_export ?? ""}
              @value-changed=${(c) => this._setEntityType(s, "power_export", c.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Combined Power"
              .hass=${this.hass}
              .value=${t.power_combined ?? ""}
              @value-changed=${(c) => this._setEntityType(s, "power_combined", c.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="Daily Usage"
              .hass=${this.hass}
              .value=${t.daily_usage ?? ""}
              @value-changed=${(c) => this._setEntityType(s, "daily_usage", c.detail.value)}
            ></ha-entity-picker>
            <ha-entity-picker
              label="State of Charge"
              .hass=${this.hass}
              .value=${t.soc ?? ""}
              @value-changed=${(c) => this._setEntityType(s, "soc", c.detail.value)}
            ></ha-entity-picker>
            <div class="subsection-label">Display</div>
            <div class="switch-row">
              <span>Show when idle</span>
              <ha-switch
                .checked=${i}
                @change=${(c) => this._setEntityType(s, "show_zero", c.target.checked)}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Zero tolerance (W)"
              type="number"
              min="0"
              .value=${o}
              @change=${(c) => {
      const d = c.target.value;
      this._setEntityType(s, "zero_tolerance", d !== "" ? Number(d) : void 0);
    }}
            ></ha-textfield>
            <ha-textfield
              label="Label"
              .value=${n}
              @change=${(c) => this._setEntityType(s, "label", c.target.value || void 0)}
            ></ha-textfield>
            <ha-textfield
              label="Colour"
              .value=${a}
              placeholder="#9e9e9e"
              @change=${(c) => this._setEntityType(s, "colour", c.target.value || void 0)}
            ></ha-textfield>
            <div class="remove-row">
              <button class="text-btn" @click=${() => this._removeCustomType(s)}>
                Remove type
              </button>
            </div>
          </div>
        ` : p}
      </div>
    `;
  }
  // ── Section groups ─────────────────────────────────────────────────────────
  _renderEntityTypeSections() {
    var e;
    const s = Object.keys(
      ((e = this.config) == null ? void 0 : e.entity_types) ?? {}
    ).filter(
      (t) => !et.includes(t)
    );
    return u`
      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      ${this._renderGridSection()}
      ${this._renderSolarSection()}
      ${this._renderBatterySection()}
      ${this._renderHomeSection()}
      ${this._renderEvSection()}
      ${s.map((t) => this._renderCustomSection(t))}

      <div class="add-type">
        <ha-textfield
          label="Add custom type"
          .value=${this._newTypeName}
          @input=${(t) => this._newTypeName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this._addCustomType()}
        ></ha-textfield>
        <mwc-button @click=${this._addCustomType}>Add</mwc-button>
      </div>

      <div class="group-divider"></div>
    `;
  }
  _renderLiveDataSection() {
    var e;
    const s = ((e = this.config) == null ? void 0 : e.live_data) ?? {};
    return u`
      <ha-expansion-panel header="Live Data" outlined>
        <div class="section-content">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(s.refresh_interval ?? 5)}
            @change=${(t) => this._set("live_data", {
      ...s,
      refresh_interval: Number(t.target.value)
    })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${s.show_live_badge ?? !0}
              @change=${(t) => this._set("live_data", {
      ...s,
      show_live_badge: t.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  _renderSystemSection() {
    var e;
    const s = ((e = this.config) == null ? void 0 : e.system) ?? {};
    return u`
      <ha-expansion-panel header="System Settings" outlined>
        <div class="section-content">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(s.energy_date_reset ?? 0)}
            @change=${(t) => this._set("system", {
      ...s,
      energy_date_reset: Number(
        t.target.value
      )
    })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${s.time_format ?? "24h"}
            @value-changed=${(t) => this._set("system", {
      ...s,
      time_format: t.detail.value
    })}
          >
            <mwc-list-item value="12h">12h</mwc-list-item>
            <mwc-list-item value="24h">24h</mwc-list-item>
          </ha-select>
        </div>
      </ha-expansion-panel>
    `;
  }
  _renderDisplaySection() {
    var e;
    const s = ((e = this.config) == null ? void 0 : e.display) ?? {};
    return u`
      <ha-expansion-panel header="Display" outlined>
        <div class="section-content">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(s.decimal_places ?? 1)}
            @change=${(t) => this._set("display", {
      ...s,
      decimal_places: Number(t.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${s.unit ?? "auto"}
            @value-changed=${(t) => this._set("display", {
      ...s,
      unit: t.detail.value
    })}
          >
            <mwc-list-item value="W">W</mwc-list-item>
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
          <div class="switch-row">
            <span>Animation</span>
            <ha-switch
              .checked=${s.animation ?? !0}
              @change=${(t) => this._set("display", {
      ...s,
      animation: t.target.checked
    })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${s.dynamic_animation_speed ?? !1}
              @change=${(t) => this._set("display", {
      ...s,
      dynamic_animation_speed: t.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return this.config ? u`
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
          @change=${(s) => this._set("title", s.target.value || void 0)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show title</span>
          <ha-switch
            .checked=${this.config.show_header ?? !0}
            @change=${(s) => this._set("show_header", s.target.checked)}
          ></ha-switch>
        </div>
        <ha-entity-picker
          label="Tariff status entity"
          .hass=${this.hass}
          .value=${this.config.tariff_entity ?? ""}
          @value-changed=${(s) => this._set("tariff_entity", s.detail.value || void 0)}
        ></ha-entity-picker>
      </div>

      ${this._renderEntityTypeSections()}
      ${this._renderLiveDataSection()}
      ${this._renderSystemSection()}
      ${this._renderDisplaySection()}
    ` : p;
  }
};
E.styles = B`
    :host {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .top-fields {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }

    ha-entity-picker,
    ha-textfield {
      display: block;
      width: 100%;
    }

    ha-select {
      display: block;
      width: 100%;
      margin-bottom: 8px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    ha-expansion-panel {
      --expansion-panel-summary-padding: 0 16px;
      --expansion-panel-content-padding: 0 16px;
    }

    /* ── Section dividers / group labels ── */
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

    /* ── Custom accordion: one block per entity type ── */
    .type-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .type-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 500;
      text-align: left;
      color: var(--primary-text-color);
      gap: 8px;
    }

    .type-toggle:hover {
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
    }

    .type-toggle ha-icon {
      --mdc-icon-size: 18px;
      opacity: 0.5;
      flex-shrink: 0;
    }

    .type-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 16px 16px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    }

    .type-body[hidden] { display: none; }

    /* ── Entity pickers inside type body ── */
    .subsection-label {
      font-size: 0.72em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      opacity: 0.45;
      margin: 6px 0 0;
    }

    .remove-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }

    /* ── Add custom type ── */
    .add-type {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .add-type ha-textfield { flex: 1; }

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

    .section-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 0;
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
U([
  v({ attribute: !1 })
], E.prototype, "hass", 2);
U([
  v({ attribute: !1 })
], E.prototype, "config", 2);
U([
  D()
], E.prototype, "_newTypeName", 2);
U([
  D()
], E.prototype, "_detectStatus", 2);
U([
  D()
], E.prototype, "_detectIsError", 2);
U([
  D()
], E.prototype, "_openSections", 2);
E = U([
  W("home-energy-card-editor")
], E);
var Pt = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, ce = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ot(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(e, t, o) : a(o)) || o);
  return i && o && Pt(e, t, o), o;
};
function ie(s, e) {
  if (!e) return null;
  const t = s[e];
  if (!t || t.state === "unavailable" || t.state === "unknown") return null;
  const i = parseFloat(t.state);
  return isNaN(i) ? null : t.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function oe(s, e) {
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
let R = class extends w {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var f, $, b, F, Z, Se, ke, Te, Ae, Ce, Pe;
    if (!this.config) return p;
    const s = ((f = this.hass) == null ? void 0 : f.states) ?? {}, e = this.config.entity_types ?? {}, t = (($ = this.config.display) == null ? void 0 : $.decimal_places) ?? 1, i = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, o = i && i !== "unavailable" && i !== "unknown" ? zt(i) : null, n = ie(s, (F = e.solar) == null ? void 0 : F.daily_usage), a = ie(s, (Z = e.home) == null ? void 0 : Z.daily_usage), l = ie(s, (Se = e.grid) == null ? void 0 : Se.daily_usage), r = ie(s, (ke = e.grid) == null ? void 0 : ke.daily_export), c = !!((Te = e.solar) != null && Te.daily_usage), d = !!((Ae = e.home) != null && Ae.daily_usage), h = !!((Ce = e.grid) != null && Ce.daily_usage), g = !!((Pe = e.grid) != null && Pe.daily_export), _ = h || g, y = c || d || _;
    return u`
      <div class="header">

        ${this.showTitle || o ? u`
          <div class="title-row">
            ${this.showTitle ? u`<span class="title">${this.config.title ?? "Home Energy"}</span>` : p}
            ${o ? u`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : p}
          </div>
        ` : p}

        ${y ? u`
          <div class="stats-row">

            ${c ? u`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${oe(n, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : p}

            ${d ? u`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${oe(a, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : p}

            ${_ ? u`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${h ? u`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${oe(l, t)}</span>
                    </div>
                  ` : p}
                  ${g ? u`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${oe(r, t)}</span>
                    </div>
                  ` : p}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : p}

          </div>
        ` : p}

      </div>
    `;
  }
};
R.styles = B`
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
ce([
  v({ attribute: !1 })
], R.prototype, "hass", 2);
ce([
  v({ attribute: !1 })
], R.prototype, "config", 2);
ce([
  v({ type: Boolean })
], R.prototype, "showTitle", 2);
R = ce([
  W("hec-card-header")
], R);
var Nt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, A = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Dt(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(e, t, o) : a(o)) || o);
  return i && o && Nt(e, t, o), o;
};
const Ut = {
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
}, ge = 38, Be = +(2 * Math.PI * ge).toFixed(4);
function tt(s, e, t) {
  if (s === null) return "—";
  const i = Math.abs(s);
  return e === "W" || e === "auto" && i < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(t)} kW`;
}
let x = class extends w {
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
    const s = Ut[this.type] ?? Ht, e = this.colour || s.accent, t = this.soc !== null, i = t ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(Be * (1 - i / 100)).toFixed(4);
    return u`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${t ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${ge}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${ge}"
            style="stroke-dasharray:${Be};stroke-dashoffset:${o};"
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
          ${t ? u`
            <span class="soc-pct">
              <ha-icon class="soc-icon" icon="mdi:battery"></ha-icon>
              ${this.soc.toFixed(0)}%
            </span>
          ` : p}
        </div>

      </div>
    `;
  }
};
x.styles = B`
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
A([
  v()
], x.prototype, "type", 2);
A([
  v()
], x.prototype, "label", 2);
A([
  v()
], x.prototype, "colour", 2);
A([
  v({ type: Number })
], x.prototype, "power", 2);
A([
  v({ type: Number })
], x.prototype, "soc", 2);
A([
  v()
], x.prototype, "unit", 2);
A([
  v({ type: Number })
], x.prototype, "decimalPlaces", 2);
x = A([
  W("hec-energy-node")
], x);
function fe(s, e) {
  var o;
  if (!e) return null;
  const t = (o = s[e]) == null ? void 0 : o.state;
  if (!t || t === "unavailable" || t === "unknown") return null;
  const i = parseFloat(t);
  return isNaN(i) ? null : i;
}
function st(s, e, t) {
  const i = e.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (e.power_combined)
    n = fe(t, e.power_combined);
  else {
    const r = !!e.power_import, c = !!e.power_export;
    if (!r && !c) return o;
    const d = r ? fe(t, e.power_import) : null, h = c ? fe(t, e.power_export) : null;
    if ((!r || d === null) && (!c || h === null)) return o;
    n = (d ?? 0) - (h ?? 0);
  }
  if (n === null) return o;
  if (Math.abs(n) <= i) return { power: n, magnitude: null, direction: "idle" };
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
var Mt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, H = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? jt(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(e, t, o) : a(o)) || o);
  return i && o && Mt(e, t, o), o;
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
function Vt(s) {
  const e = Date.now(), t = e - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let o = 0; o < 24; o++) {
    const n = t + o * 36e5, a = n + 36e5;
    let l = 0, r = 0;
    for (let c = 0; c < s.length; c++) {
      const d = new Date(s[c].last_changed).getTime(), h = c + 1 < s.length ? new Date(s[c + 1].last_changed).getTime() : e, g = Math.max(d, n), _ = Math.min(h, a);
      if (_ <= g) continue;
      const y = parseFloat(s[c].state);
      if (isNaN(y)) continue;
      const f = _ - g;
      l += Math.abs(y) * f, r += f;
    }
    r > 0 && (i[o] = l / r);
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
function We(s, e) {
  var o;
  const t = it(s, e);
  return t === null ? null : ((o = s[e]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? t / 1e3 : t;
}
function Fe(s, e) {
  return s === null ? "—" : `${s.toFixed(e)} kWh`;
}
function Bt(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Ze(s) {
  const e = new Date(s);
  return `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
}
function Wt(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Ft(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let S = class extends w {
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
        const o = /* @__PURE__ */ new Date(), a = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${e}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, l = await this.hass.callApi("GET", a);
        this._hourly = Vt((l == null ? void 0 : l[0]) ?? []);
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
    return u`
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
    var o, n, a, l, r;
    const e = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, t = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.unit) ?? "auto", i = ((r = Rt[this.nodeType]) == null ? void 0 : r[s.direction]) ?? "";
    return u`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${tt(s.power, t, e)}</div>
        ${i ? u`<div class="power-sub">${i}</div>` : p}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return p;
    const e = Ft(s);
    return u`
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
    var a, l, r;
    const e = ((a = this.hass) == null ? void 0 : a.states) ?? {}, t = ((r = (l = this.config) == null ? void 0 : l.display) == null ? void 0 : r.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([i, Fe(We(e, s.daily_usage), t)]), s.daily_export && n.push([o, Fe(We(e, s.daily_export), t)]), n.length ? u`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([c, d]) => u`
          <div class="kv">
            <span class="kv-k">${c}</span>
            <span class="kv-v">${d}</span>
          </div>
        `)}
      </div>
    ` : p;
  }
  _sectionOctopus(s) {
    var y;
    const e = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = s.rate_entity ? e[s.rate_entity] : null, i = s.cost_entity ? e[s.cost_entity] : null, o = s.slots_entity ? e[s.slots_entity] : null, n = t == null ? void 0 : t.state, a = (t == null ? void 0 : t.attributes.unit_of_measurement) ?? "p/kWh", l = i == null ? void 0 : i.state, r = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", c = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], d = Date.now(), h = c.filter((f) => new Date(f.end ?? f.end_time ?? 0).getTime() > d).slice(0, 6), g = n && n !== "unavailable" && n !== "unknown", _ = l && l !== "unavailable" && l !== "unknown";
    return !g && !_ && !h.length ? p : u`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${g ? u`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${a}</span>
          </div>
        ` : p}

        ${_ ? u`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${r}${parseFloat(l).toFixed(2)}</span>
          </div>
        ` : p}

        ${h.length ? u`
          <div class="s-subtitle">Upcoming slots</div>
          ${h.map((f) => {
      const $ = f.start ?? f.start_time ?? "", b = f.end ?? f.end_time ?? "", F = f.value_inc_vat ?? f.rate_inc_vat ?? f.value ?? 0, Z = Wt(F);
      return u`
              <div class="slot">
                <span class="slot-dot" style="background:${Z};"></span>
                <span class="slot-time">${Ze($)}–${Ze(b)}</span>
                <span class="slot-rate" style="color:${Z};">${(+F).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : p}
      </div>
    `;
  }
  _sectionChart(s) {
    const e = this._hourly.filter((n) => n !== null), t = e.length ? Math.max(...e) : 0, i = /* @__PURE__ */ new Date(), o = (n) => Bt(new Date(i.getTime() - n * 36e5));
    return this._loading ? u`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : u`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${t === 0 ? u`<div class="chart-msg">No data</div>` : u`
              ${Y`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return Y``;
      const l = Math.max(2, n / t * 48);
      return Y`
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
    var r, c, d;
    if (!this.open || !this.nodeType) return p;
    const s = ((c = (r = this.config) == null ? void 0 : r.entity_types) == null ? void 0 : c[this.nodeType]) ?? {}, e = ((d = this.hass) == null ? void 0 : d.states) ?? {}, t = s.colour || (Lt[this.nodeType] ?? "#9e9e9e"), i = It[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = st(this.nodeType, s, e), a = ["battery", "ev"].includes(this.nodeType) && !!s.soc, l = a ? it(e, s.soc) : null;
    return u`
      <div
        class="overlay"
        @click=${(h) => h.target === h.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(t, i, o)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(l) : p}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : p}
          ${this._sectionChart(t)}
        </div>
      </div>
    `;
  }
};
S.styles = B`
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
H([
  v({ attribute: !1 })
], S.prototype, "hass", 2);
H([
  v({ attribute: !1 })
], S.prototype, "config", 2);
H([
  v()
], S.prototype, "nodeType", 2);
H([
  v({ type: Boolean })
], S.prototype, "open", 2);
H([
  D()
], S.prototype, "_hourly", 2);
H([
  D()
], S.prototype, "_loading", 2);
S = H([
  W("hec-node-detail")
], S);
var Zt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, he = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Gt(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(e, t, o) : a(o)) || o);
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
let V = class extends w {
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
    var o, n, a, l;
    const e = (a = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[s]) == null ? void 0 : a.soc;
    if (!e || !this.hass) return null;
    const t = (l = this.hass.states[e]) == null ? void 0 : l.state;
    if (!t || t === "unavailable" || t === "unknown") return null;
    const i = parseFloat(t);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var t, i, o, n;
    const s = ((i = (t = this.config) == null ? void 0 : t.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, e = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.animation) !== !1;
    return Y`
      ${["solar", "grid", "battery", "ev"].filter((a) => this._isVisible(a)).map((a) => {
      const l = this._flowInfo(a), [r, c, d, h] = Yt[a], g = l.direction === "idle", _ = l.direction === "from-home", y = Kt(l.magnitude, s && !g), f = [
        "flow-line",
        _ ? "reverse" : "",
        g ? "idle" : "",
        e ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Y`
            <line
              x1="${r}" y1="${c}" x2="${d}" y2="${h}"
              stroke="${qt[a]}"
              class="${f}"
              style="--flow-dur:${y}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, e, t = !1) {
    var l, r, c;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((r = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : r[s]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, a = this._flowInfo(s);
    return u`
      <hec-energy-node
        class="${e}${i ? "" : " hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${a.power}
        .soc=${t ? this._soc(s) : null}
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
    var l, r, c;
    const i = this._isVisible(s), o = ((r = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : r[s]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, a = this._flowInfo(s);
    return u`
      <hec-energy-node
        style="grid-column:${e}; grid-row:${t}"
        class="${i ? "" : "hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${a.power}
        .soc=${null}
        .unit=${n.unit ?? "auto"}
        .decimalPlaces=${n.decimal_places ?? 1}
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
    if (!this.config) return p;
    const s = this._customTypes(), e = 2 + Math.ceil(s.length / 3);
    return u`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${e}" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : p}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : p}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${s.map((t, i) => {
      const [o, n] = this._customSlot(i);
      return this._customNode(t, o, n);
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
V.styles = B`
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
he([
  v({ attribute: !1 })
], V.prototype, "hass", 2);
he([
  v({ attribute: !1 })
], V.prototype, "config", 2);
he([
  D()
], V.prototype, "_dialogType", 2);
V = he([
  W("hec-flow-layout")
], V);
var Jt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, Ee = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Qt(e, t) : e, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(e, t, o) : a(o)) || o);
  return i && o && Jt(e, t, o), o;
};
let ee = class extends w {
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
    return this.config ? u`
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
    ` : p;
  }
};
ee.styles = B`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ee([
  v({ attribute: !1 })
], ee.prototype, "hass", 2);
Ee([
  v({ attribute: !1 })
], ee.prototype, "config", 2);
ee = Ee([
  W("home-energy-card")
], ee);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  ee as HomeEnergyCard
};
