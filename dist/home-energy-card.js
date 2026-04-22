/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, me = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), Ne = /* @__PURE__ */ new WeakMap();
let Ye = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (me && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (s) => new Ye(typeof s == "string" ? s : s + "", void 0, ve), W = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new Ye(t, s, ve);
}, nt = (s, e) => {
  if (me) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = ne.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, s.appendChild(i);
  }
}, De = me ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ot(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rt, defineProperty: at, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: ht, getPrototypeOf: dt } = Object, A = globalThis, ze = A.trustedTypes, pt = ze ? ze.emptyScript : "", de = A.reactiveElementPolyfillSupport, q = (s, e) => s, re = { toAttribute(s, e) {
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
} }, $e = (s, e) => !rt(s, e), Me = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: $e };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let j = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Me) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && at(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: n } = lt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Me;
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
      for (const o of i) t.unshift(De(o));
    } else e !== void 0 && t.push(De(e));
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
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : re).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : re;
      this._$Em = o;
      const c = l.fromAttribute(t, a.type);
      this[o] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, n) {
    var r;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[e]), i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? $e)(n, t) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: a } = r, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[q("elementProperties")] = /* @__PURE__ */ new Map(), j[q("finalized")] = /* @__PURE__ */ new Map(), de == null || de({ ReactiveElement: j }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, He = (s) => s, ae = Y.trustedTypes, je = ae ? ae.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ze = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Je = "?" + S, ut = `<${Je}>`, D = document, J = () => D.createComment(""), Q = (s) => s === null || typeof s != "object" && typeof s != "function", be = Array.isArray, ft = (s) => be(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", pe = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ue = /-->/g, Ie = />/g, C = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Re = /'/g, Le = /"/g, Qe = /^(?:script|style|textarea|title)$/i, Xe = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), p = Xe(1), Z = Xe(2), I = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Be = /* @__PURE__ */ new WeakMap(), P = D.createTreeWalker(D, 129);
function et(s, e) {
  if (!be(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return je !== void 0 ? je.createHTML(e) : e;
}
const yt = (s, e) => {
  const t = s.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = K;
  for (let a = 0; a < t; a++) {
    const l = s[a];
    let c, f, h = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, f = r.exec(l), f !== null); ) g = r.lastIndex, r === K ? f[1] === "!--" ? r = Ue : f[1] !== void 0 ? r = Ie : f[2] !== void 0 ? (Qe.test(f[2]) && (o = RegExp("</" + f[2], "g")), r = C) : f[3] !== void 0 && (r = C) : r === C ? f[0] === ">" ? (r = o ?? K, h = -1) : f[1] === void 0 ? h = -2 : (h = r.lastIndex - f[2].length, c = f[1], r = f[3] === void 0 ? C : f[3] === '"' ? Le : Re) : r === Le || r === Re ? r = C : r === Ue || r === Ie ? r = K : (r = C, o = void 0);
    const _ = r === C && s[a + 1].startsWith("/>") ? " " : "";
    n += r === K ? l + ut : h >= 0 ? (i.push(c), l.slice(0, h) + Ze + l.slice(h) + S + _) : l + S + (h === -2 ? a : _);
  }
  return [et(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class X {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, l = this.parts, [c, f] = yt(e, t);
    if (this.el = X.createElement(c, i), P.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = P.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Ze)) {
          const g = f[r++], _ = o.getAttribute(h).split(S), d = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: n, name: d[2], strings: _, ctor: d[1] === "." ? _t : d[1] === "?" ? mt : d[1] === "@" ? vt : le }), o.removeAttribute(h);
        } else h.startsWith(S) && (l.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Qe.test(o.tagName)) {
          const h = o.textContent.split(S), g = h.length - 1;
          if (g > 0) {
            o.textContent = ae ? ae.emptyScript : "";
            for (let _ = 0; _ < g; _++) o.append(h[_], J()), P.nextNode(), l.push({ type: 2, index: ++n });
            o.append(h[g], J());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Je) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(S, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += S.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = D.createElement("template");
    return i.innerHTML = e, i;
  }
}
function R(s, e, t = s, i) {
  var r, a;
  if (e === I) return e;
  let o = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const n = Q(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = R(s, o._$AS(s, e.values), o, i)), e;
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
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? D).importNode(t, !0);
    P.currentNode = o;
    let n = P.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new te(n, n.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (c = new $t(n, this, e)), this._$AV.push(c), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = P.nextNode(), r++);
    }
    return P.currentNode = D, o;
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
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = R(this, e, t), Q(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ft(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && Q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = X.createElement(et(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(t);
    else {
      const r = new gt(o, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Be.get(e.strings);
    return t === void 0 && Be.set(e.strings, t = new X(e)), t;
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
      const o = He(e).nextSibling;
      He(e).remove(), e = o;
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
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = R(this, e, t, 0), r = !Q(e) || e !== this._$AH && e !== I, r && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = n[0], l = 0; l < n.length - 1; l++) c = R(this, a[i + l], t, l), c === I && (c = this._$AH[l]), r || (r = !Q(c) || c !== this._$AH[l]), c === u ? e = u : e !== u && (e += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class mt extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class vt extends le {
  constructor(e, t, i, o, n) {
    super(e, t, i, o, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = R(this, e, t, 0) ?? u) === I) return;
    const i = this._$AH, o = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== u && (i === u || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
const ue = Y.litHtmlPolyfillSupport;
ue == null || ue(X, te), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.2");
const bt = (s, e, t) => {
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
const N = globalThis;
class w extends j {
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
    return I;
  }
}
var qe;
w._$litElement$ = !0, w.finalized = !0, (qe = N.litElementHydrateSupport) == null || qe.call(N, { LitElement: w });
const fe = N.litElementPolyfillSupport;
fe == null || fe({ LitElement: w });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (s) => (e, t) => {
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
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), i === "accessor") {
    const { name: r } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = t;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(s) {
  return (e, t) => typeof t == "object" ? xt(s, e, t) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
const ge = ["grid", "solar", "battery", "home", "ev"], we = (s) => s.attributes.device_class ?? "", xe = (s) => s.attributes.unit_of_measurement ?? "", Ee = (s, e) => s.toLowerCase() + " " + (e.attributes.friendly_name ?? "").toLowerCase();
function O(...s) {
  return (e, t) => {
    let i = 0;
    we(t) === "power" && (i += 4), ["W", "kW"].includes(xe(t)) && (i += 2);
    const o = Ee(e, t);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function U(...s) {
  return (e, t) => {
    let i = 0;
    we(t) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(xe(t)) && (i += 2);
    const o = Ee(e, t);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function We(...s) {
  return (e, t) => {
    let i = 0;
    we(t) === "battery" && (i += 4), xe(t) === "%" && (i += 2);
    const o = Ee(e, t);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function se(s, e = []) {
  return (t, i) => {
    const o = t.toLowerCase();
    if (e.some((r) => o.includes(r))) return 0;
    let n = 0;
    for (const r of s) o.includes(r) && (n += 4);
    return n;
  };
}
function v(s, e, t, i) {
  let o, n = 0;
  for (const r of s) {
    if (i.has(r)) continue;
    const a = e[r];
    if (!a) continue;
    const l = t(r, a);
    l > n && (n = l, o = r);
  }
  return o && i.add(o), o;
}
function Et(s, e, t) {
  const i = Object.values(e).some(
    ($) => $.platform === "octopus_energy" && !$.disabled_by
  ), o = Object.keys(s).filter(($) => $.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    ($) => $.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], a = {}, l = {}, c = v(
    n,
    s,
    se(["_current_rate"], ["export", "accumulative"]),
    t
  );
  c && (a.rate_entity = c, r.push("rate"));
  const f = v(
    n,
    s,
    se(["_current_accumulative_cost"]),
    t
  );
  f && (a.cost_entity = f, r.push("cost"));
  const h = v(
    n,
    s,
    se(["_current_day_rates"]),
    t
  );
  h && (a.slots_entity = h, r.push("slots"));
  const g = v(
    o.filter(($) => $.startsWith("binary_sensor.")),
    s,
    se(["_intelligent_dispatching"]),
    t
  );
  g && (a.dispatches_entity = g, r.push("dispatching")), Object.keys(a).length && (l.octopus = a);
  const _ = v(
    n,
    s,
    O("import", "demand", "current"),
    t
  );
  _ && (l.power_import = _, r.push("import power"));
  const d = v(
    n,
    s,
    O("export", "demand", "current"),
    t
  );
  d && (l.power_export = d, r.push("export power"));
  const y = v(
    n,
    s,
    U("import", "accumulative", "consumption"),
    t
  );
  y && (l.daily_usage = y, r.push("daily import"));
  const b = v(
    n,
    s,
    U("export", "accumulative"),
    t
  );
  return b && (l.daily_export = b, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: r };
}
function kt(s, e, t) {
  const i = Object.values(e).filter(
    (d) => d.platform === "tesla_custom" && !d.disabled_by
  ), o = Object.keys(s).some(
    (d) => d.includes("powerwall") || d.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((d) => d.entity_id) : Object.keys(s).filter((d) => d.includes("powerwall") || d.includes("tesla")), r = n.filter((d) => d.includes("powerwall")), a = n.filter((d) => !d.includes("powerwall")), l = ["Tesla"], c = {};
  if (r.length > 0) {
    const d = {}, y = v(
      r,
      s,
      We("battery", "soc", "charge", "percent"),
      t
    );
    y && (d.soc = y);
    const b = v(
      r,
      s,
      O("battery", "power", "charge", "discharge"),
      t
    );
    b && (d.power_combined = b);
    const $ = v(
      r,
      s,
      U("battery", "today", "daily", "charged"),
      t
    );
    $ && (d.daily_usage = $), Object.keys(d).length && (c.battery = d, l.push("Powerwall"));
  }
  const f = v(
    n,
    s,
    O("solar"),
    t
  );
  if (f) {
    const d = { power_combined: f }, y = v(
      n,
      s,
      U("solar"),
      t
    );
    y && (d.daily_usage = y), c.solar = d, l.push("solar");
  }
  const h = v(
    n,
    s,
    O("load", "home", "house"),
    t
  );
  if (h) {
    const d = { power_combined: h }, y = v(
      n,
      s,
      U("load", "home", "house"),
      t
    );
    y && (d.daily_usage = y), c.home = d, l.push("home load");
  }
  const g = v(
    n,
    s,
    O("grid"),
    t
  );
  g && (c.grid = { power_combined: g }, l.push("grid"));
  const _ = v(
    a,
    s,
    We("battery", "battery_level", "soc", "charge"),
    t
  );
  if (_) {
    const d = { soc: _ }, y = v(
      a,
      s,
      O("charg", "power"),
      t
    );
    y && (d.power_combined = y);
    const b = v(
      a,
      s,
      U("charg", "energy"),
      t
    );
    b && (d.daily_usage = b), c.ev = d, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: c, summary: l };
}
function St(s) {
  var l, c;
  const e = s, t = e.states ?? {}, i = e.entities ?? {}, o = /* @__PURE__ */ new Set(), n = kt(t, i, o), r = Et(t, i, o), a = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (a.integration_type = "tesla", Object.assign(a.entity_types, n.entity_types), a.summary.push(...n.summary ?? [])), r) {
    if (a.integration_type !== "tesla" && (a.integration_type = "octopus"), (l = r.entity_types) != null && l.grid) {
      const f = r.entity_types.grid;
      a.entity_types.grid = {
        ...a.entity_types.grid,
        ...f,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: f.power_import || (c = a.entity_types.grid) == null ? void 0 : c.power_combined
      };
    }
    r.tariff_entity && (a.tariff_entity = r.tariff_entity), a.summary.push(...r.summary ?? []);
  }
  return a;
}
function At(s, e, t = !1) {
  const i = { ...s };
  e.tariff_entity && (t || !s.tariff_entity) && (i.tariff_entity = e.tariff_entity);
  const o = s.entity_types ?? {}, n = { ...o };
  for (const [r, a] of Object.entries(e.entity_types)) {
    const l = o[r] ?? {}, c = { ...l };
    for (const [f, h] of Object.entries(a))
      h !== void 0 && (t || !l[f]) && (c[f] = h);
    n[r] = c;
  }
  return i.entity_types = n, i;
}
var Tt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, M = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ct(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Tt(e, t, o), o;
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
    const s = St(this.hass);
    if (s.integration_type === "manual" && s.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.", this._detectIsError = !0;
      return;
    }
    const e = At(
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
    i[s] = t === void 0 || t === "" || t === null ? (({ [e]: n, ...r }) => r)(i[s] ?? {}) : { ...i[s], [e]: t }, this._set("entity_types", i);
  }
  _setOctopus(s, e, t) {
    var a;
    const i = { ...((a = this.config) == null ? void 0 : a.entity_types) ?? {} }, o = i[s] ?? {}, n = { ...o.octopus, [e]: t || void 0 }, r = Object.values(n).some(Boolean);
    i[s] = r ? { ...o, octopus: n } : (({ octopus: l, ...c }) => c)(o), this._set("entity_types", i);
  }
  // ── Per-type entity picker blocks ────────────────────────────────────────
  // Each method is hardcoded for its type — no conditional template logic.
  _pickersGrid(s, e) {
    var t, i, o;
    return p`
      <ha-entity-picker label="Import power"    .hass=${this.hass} .value=${s.power_import ?? ""}  @value-changed=${(n) => this._setEntityType(e, "power_import", n.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Export power"    .hass=${this.hass} .value=${s.power_export ?? ""}  @value-changed=${(n) => this._setEntityType(e, "power_export", n.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Combined power"  .hass=${this.hass} .value=${s.power_combined ?? ""} @value-changed=${(n) => this._setEntityType(e, "power_combined", n.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Daily usage"     .hass=${this.hass} .value=${s.daily_usage ?? ""}   @value-changed=${(n) => this._setEntityType(e, "daily_usage", n.detail.value)}></ha-entity-picker>
      <div class="subsection-label">Octopus Energy</div>
      <ha-entity-picker label="Rate entity"         .hass=${this.hass} .value=${((t = s.octopus) == null ? void 0 : t.rate_entity) ?? ""} @value-changed=${(n) => this._setOctopus(e, "rate_entity", n.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Cost today entity"   .hass=${this.hass} .value=${((i = s.octopus) == null ? void 0 : i.cost_entity) ?? ""} @value-changed=${(n) => this._setOctopus(e, "cost_entity", n.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Slots / rates entity" .hass=${this.hass} .value=${((o = s.octopus) == null ? void 0 : o.slots_entity) ?? ""} @value-changed=${(n) => this._setOctopus(e, "slots_entity", n.detail.value)}></ha-entity-picker>
    `;
  }
  _pickersSolar(s, e) {
    return p`
      <ha-entity-picker label="Combined power" .hass=${this.hass} .value=${s.power_combined ?? ""} @value-changed=${(t) => this._setEntityType(e, "power_combined", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Daily usage"    .hass=${this.hass} .value=${s.daily_usage ?? ""}   @value-changed=${(t) => this._setEntityType(e, "daily_usage", t.detail.value)}></ha-entity-picker>
    `;
  }
  _pickersBattery(s, e) {
    return p`
      <ha-entity-picker label="State of charge (%)" .hass=${this.hass} .value=${s.soc ?? ""}            @value-changed=${(t) => this._setEntityType(e, "soc", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Combined power"       .hass=${this.hass} .value=${s.power_combined ?? ""} @value-changed=${(t) => this._setEntityType(e, "power_combined", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Daily usage"          .hass=${this.hass} .value=${s.daily_usage ?? ""}   @value-changed=${(t) => this._setEntityType(e, "daily_usage", t.detail.value)}></ha-entity-picker>
    `;
  }
  _pickersHome(s, e) {
    return p`
      <ha-entity-picker label="Combined power" .hass=${this.hass} .value=${s.power_combined ?? ""} @value-changed=${(t) => this._setEntityType(e, "power_combined", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Daily usage"    .hass=${this.hass} .value=${s.daily_usage ?? ""}   @value-changed=${(t) => this._setEntityType(e, "daily_usage", t.detail.value)}></ha-entity-picker>
    `;
  }
  _pickersEv(s, e) {
    return p`
      <ha-entity-picker label="State of charge (%)" .hass=${this.hass} .value=${s.soc ?? ""}            @value-changed=${(t) => this._setEntityType(e, "soc", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Combined power"       .hass=${this.hass} .value=${s.power_combined ?? ""} @value-changed=${(t) => this._setEntityType(e, "power_combined", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Daily usage"          .hass=${this.hass} .value=${s.daily_usage ?? ""}   @value-changed=${(t) => this._setEntityType(e, "daily_usage", t.detail.value)}></ha-entity-picker>
    `;
  }
  _pickersCustom(s, e) {
    return p`
      <ha-entity-picker label="Import power"         .hass=${this.hass} .value=${s.power_import ?? ""}  @value-changed=${(t) => this._setEntityType(e, "power_import", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Export power"         .hass=${this.hass} .value=${s.power_export ?? ""}  @value-changed=${(t) => this._setEntityType(e, "power_export", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Combined power"       .hass=${this.hass} .value=${s.power_combined ?? ""} @value-changed=${(t) => this._setEntityType(e, "power_combined", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="Daily usage"          .hass=${this.hass} .value=${s.daily_usage ?? ""}  @value-changed=${(t) => this._setEntityType(e, "daily_usage", t.detail.value)}></ha-entity-picker>
      <ha-entity-picker label="State of charge (%)"  .hass=${this.hass} .value=${s.soc ?? ""}  @value-changed=${(t) => this._setEntityType(e, "soc", t.detail.value)}></ha-entity-picker>
    `;
  }
  // ── Combined field renderer ───────────────────────────────────────────────
  _renderEntityTypeFields(s) {
    var o, n;
    const e = ((n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[s]) ?? {}, i = {
      grid: () => this._pickersGrid(e, s),
      solar: () => this._pickersSolar(e, s),
      battery: () => this._pickersBattery(e, s),
      home: () => this._pickersHome(e, s),
      ev: () => this._pickersEv(e, s)
    }[s] ?? (() => this._pickersCustom(e, s));
    return p`

      <div class="subsection-label">Entities</div>
      ${i()}

      <div class="subsection-label">Display</div>

      <div class="switch-row">
        <span>Show when idle</span>
        <ha-switch
          .checked=${e.show_zero !== !1}
          @change=${(r) => this._setEntityType(s, "show_zero", r.target.checked)}
        ></ha-switch>
      </div>

      <ha-textfield
        label="Zero tolerance (W)"
        type="number"
        min="0"
        .value=${e.zero_tolerance != null ? String(e.zero_tolerance) : ""}
        @change=${(r) => {
      const a = r.target.value;
      this._setEntityType(s, "zero_tolerance", a !== "" ? Number(a) : void 0);
    }}
      ></ha-textfield>

      <ha-textfield
        label="Label"
        .value=${e.label ?? ""}
        @change=${(r) => this._setEntityType(s, "label", r.target.value || void 0)}
      ></ha-textfield>

      <ha-textfield
        label="Colour"
        .value=${e.colour ?? ""}
        placeholder="#e91e63"
        @change=${(r) => this._setEntityType(s, "colour", r.target.value || void 0)}
      ></ha-textfield>

    `;
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
  _renderEntityTypeSections() {
    var t;
    const s = Object.keys(
      ((t = this.config) == null ? void 0 : t.entity_types) ?? {}
    ).filter(
      (i) => !ge.includes(i)
    ), e = (i, o = !1) => {
      const n = this._openSections.has(i);
      return p`
        <div class="type-block">
          <button class="type-toggle" @click=${() => this._toggleSection(i)}>
            <span>${this._capitalize(i)}</span>
            <ha-icon icon="mdi:chevron-${n ? "up" : "down"}"></ha-icon>
          </button>
          ${n ? p`
            <div class="type-body">
              ${this._renderEntityTypeFields(i)}
              ${o ? p`
                <div class="remove-row">
                  <button class="text-btn" @click=${() => this._removeCustomType(i)}>
                    Remove type
                  </button>
                </div>
              ` : u}
            </div>
          ` : u}
        </div>
      `;
    };
    return p`
      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      ${ge.map((i) => e(i))}
      ${s.map((i) => e(i, !0))}

      <div class="add-type">
        <ha-textfield
          label="Add custom type"
          .value=${this._newTypeName}
          @input=${(i) => this._newTypeName = i.target.value}
          @keydown=${(i) => i.key === "Enter" && this._addCustomType()}
        ></ha-textfield>
        <mwc-button @click=${this._addCustomType}>Add</mwc-button>
      </div>

      <div class="group-divider"></div>
    `;
  }
  _renderLiveDataSection() {
    var e;
    const s = ((e = this.config) == null ? void 0 : e.live_data) ?? {};
    return p`
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
    return p`
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
    return p`
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
    return this.config ? p`
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
    ` : u;
  }
};
E.styles = W`
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
M([
  m({ attribute: !1 })
], E.prototype, "hass", 2);
M([
  m({ attribute: !1 })
], E.prototype, "config", 2);
M([
  z()
], E.prototype, "_newTypeName", 2);
M([
  z()
], E.prototype, "_detectStatus", 2);
M([
  z()
], E.prototype, "_detectIsError", 2);
M([
  z()
], E.prototype, "_openSections", 2);
E = M([
  F("home-energy-card-editor")
], E);
var Ot = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, ce = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Pt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Ot(e, t, o), o;
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
function Nt(s) {
  const e = s.toLowerCase().replace(/[\s_-]/g, ""), t = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => e.includes(i)) ? { label: t, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => e.includes(i)) && !e.includes("off") ? { label: t, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => e.includes(i)) ? { label: t, bg: "#fff8e1", fg: "#e65100" } : {
    label: t,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let L = class extends w {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, b, $, V, G, Se, Ae, Te, Ce, Oe, Pe;
    if (!this.config) return u;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, e = this.config.entity_types ?? {}, t = ((b = this.config.display) == null ? void 0 : b.decimal_places) ?? 1, i = this.config.tariff_entity ? ($ = s[this.config.tariff_entity]) == null ? void 0 : $.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Nt(i) : null, n = ie(s, (V = e.solar) == null ? void 0 : V.daily_usage), r = ie(s, (G = e.home) == null ? void 0 : G.daily_usage), a = ie(s, (Se = e.grid) == null ? void 0 : Se.daily_usage), l = ie(s, (Ae = e.grid) == null ? void 0 : Ae.daily_export), c = !!((Te = e.solar) != null && Te.daily_usage), f = !!((Ce = e.home) != null && Ce.daily_usage), h = !!((Oe = e.grid) != null && Oe.daily_usage), g = !!((Pe = e.grid) != null && Pe.daily_export), _ = h || g, d = c || f || _;
    return p`
      <div class="header">

        ${this.showTitle || o ? p`
          <div class="title-row">
            ${this.showTitle ? p`<span class="title">${this.config.title ?? "Home Energy"}</span>` : u}
            ${o ? p`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : u}
          </div>
        ` : u}

        ${d ? p`
          <div class="stats-row">

            ${c ? p`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${oe(n, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : u}

            ${f ? p`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${oe(r, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : u}

            ${_ ? p`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${h ? p`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${oe(a, t)}</span>
                    </div>
                  ` : u}
                  ${g ? p`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${oe(l, t)}</span>
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
L.styles = W`
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
  m({ attribute: !1 })
], L.prototype, "hass", 2);
ce([
  m({ attribute: !1 })
], L.prototype, "config", 2);
ce([
  m({ type: Boolean })
], L.prototype, "showTitle", 2);
L = ce([
  F("hec-card-header")
], L);
var Dt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, T = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? zt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Dt(e, t, o), o;
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
}, _e = 38, Fe = +(2 * Math.PI * _e).toFixed(4);
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
    const s = Mt[this.type] ?? Ht, e = this.colour || s.accent, t = this.soc !== null, i = t ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(Fe * (1 - i / 100)).toFixed(4);
    return p`
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
            style="stroke-dasharray:${Fe};stroke-dashoffset:${o};"
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
          ${t ? p`
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
x.styles = W`
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
T([
  m()
], x.prototype, "type", 2);
T([
  m()
], x.prototype, "label", 2);
T([
  m()
], x.prototype, "colour", 2);
T([
  m({ type: Number })
], x.prototype, "power", 2);
T([
  m({ type: Number })
], x.prototype, "soc", 2);
T([
  m()
], x.prototype, "unit", 2);
T([
  m({ type: Number })
], x.prototype, "decimalPlaces", 2);
x = T([
  F("hec-energy-node")
], x);
function ye(s, e) {
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
    n = ye(t, e.power_combined);
  else {
    const l = !!e.power_import, c = !!e.power_export;
    if (!l && !c) return o;
    const f = l ? ye(t, e.power_import) : null, h = c ? ye(t, e.power_export) : null;
    if ((!l || f === null) && (!c || h === null)) return o;
    n = (f ?? 0) - (h ?? 0);
  }
  if (n === null) return o;
  if (Math.abs(n) <= i) return { power: n, magnitude: null, direction: "idle" };
  const r = Math.abs(n);
  let a;
  switch (s) {
    case "solar":
      a = "to-home";
      break;
    case "grid":
      a = n > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      a = n > 0 ? "from-home" : "to-home";
      break;
    default:
      a = n > 0 ? "from-home" : "to-home";
  }
  return { power: n, magnitude: r, direction: a };
}
var jt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, H = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Ut(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && jt(e, t, o), o;
};
const It = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Rt = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Lt = {
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
    const n = t + o * 36e5, r = n + 36e5;
    let a = 0, l = 0;
    for (let c = 0; c < s.length; c++) {
      const f = new Date(s[c].last_changed).getTime(), h = c + 1 < s.length ? new Date(s[c + 1].last_changed).getTime() : e, g = Math.max(f, n), _ = Math.min(h, r);
      if (_ <= g) continue;
      const d = parseFloat(s[c].state);
      if (isNaN(d)) continue;
      const y = _ - g;
      a += Math.abs(d) * y, l += y;
    }
    l > 0 && (i[o] = a / l);
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
function Ve(s, e) {
  var o;
  const t = it(s, e);
  return t === null ? null : ((o = s[e]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? t / 1e3 : t;
}
function Ge(s, e) {
  return s === null ? "—" : `${s.toFixed(e)} kWh`;
}
function Wt(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Ke(s) {
  const e = new Date(s);
  return `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
}
function Ft(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Vt(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let k = class extends w {
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
        const o = /* @__PURE__ */ new Date(), r = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${e}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, a = await this.hass.callApi("GET", r);
        this._hourly = Bt((a == null ? void 0 : a[0]) ?? []);
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
    return p`
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
    var o, n, r, a, l;
    const e = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, t = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", i = ((l = Lt[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return p`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${tt(s.power, t, e)}</div>
        ${i ? p`<div class="power-sub">${i}</div>` : u}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return u;
    const e = Vt(s);
    return p`
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
    var r, a, l;
    const e = ((r = this.hass) == null ? void 0 : r.states) ?? {}, t = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([i, Ge(Ve(e, s.daily_usage), t)]), s.daily_export && n.push([o, Ge(Ve(e, s.daily_export), t)]), n.length ? p`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([c, f]) => p`
          <div class="kv">
            <span class="kv-k">${c}</span>
            <span class="kv-v">${f}</span>
          </div>
        `)}
      </div>
    ` : u;
  }
  _sectionOctopus(s) {
    var d;
    const e = ((d = this.hass) == null ? void 0 : d.states) ?? {}, t = s.rate_entity ? e[s.rate_entity] : null, i = s.cost_entity ? e[s.cost_entity] : null, o = s.slots_entity ? e[s.slots_entity] : null, n = t == null ? void 0 : t.state, r = (t == null ? void 0 : t.attributes.unit_of_measurement) ?? "p/kWh", a = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", c = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], f = Date.now(), h = c.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > f).slice(0, 6), g = n && n !== "unavailable" && n !== "unknown", _ = a && a !== "unavailable" && a !== "unknown";
    return !g && !_ && !h.length ? u : p`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${g ? p`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
          </div>
        ` : u}

        ${_ ? p`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(a).toFixed(2)}</span>
          </div>
        ` : u}

        ${h.length ? p`
          <div class="s-subtitle">Upcoming slots</div>
          ${h.map((y) => {
      const b = y.start ?? y.start_time ?? "", $ = y.end ?? y.end_time ?? "", V = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, G = Ft(V);
      return p`
              <div class="slot">
                <span class="slot-dot" style="background:${G};"></span>
                <span class="slot-time">${Ke(b)}–${Ke($)}</span>
                <span class="slot-rate" style="color:${G};">${(+V).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : u}
      </div>
    `;
  }
  _sectionChart(s) {
    const e = this._hourly.filter((n) => n !== null), t = e.length ? Math.max(...e) : 0, i = /* @__PURE__ */ new Date(), o = (n) => Wt(new Date(i.getTime() - n * 36e5));
    return this._loading ? p`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : p`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${t === 0 ? p`<div class="chart-msg">No data</div>` : p`
              ${Z`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return Z``;
      const a = Math.max(2, n / t * 48);
      return Z`
                      <rect
                        x="${r * 10 + 0.5}" y="${52 - a}"
                        width="9" height="${a}" rx="2"
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
    var l, c, f;
    if (!this.open || !this.nodeType) return u;
    const s = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[this.nodeType]) ?? {}, e = ((f = this.hass) == null ? void 0 : f.states) ?? {}, t = s.colour || (Rt[this.nodeType] ?? "#9e9e9e"), i = It[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = st(this.nodeType, s, e), r = ["battery", "ev"].includes(this.nodeType) && !!s.soc, a = r ? it(e, s.soc) : null;
    return p`
      <div
        class="overlay"
        @click=${(h) => h.target === h.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(t, i, o)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(a) : u}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : u}
          ${this._sectionChart(t)}
        </div>
      </div>
    `;
  }
};
k.styles = W`
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
  m({ attribute: !1 })
], k.prototype, "hass", 2);
H([
  m({ attribute: !1 })
], k.prototype, "config", 2);
H([
  m()
], k.prototype, "nodeType", 2);
H([
  m({ type: Boolean })
], k.prototype, "open", 2);
H([
  z()
], k.prototype, "_hourly", 2);
H([
  z()
], k.prototype, "_loading", 2);
k = H([
  F("hec-node-detail")
], k);
var Gt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, he = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Kt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && Gt(e, t, o), o;
};
function qt(s, e) {
  return !e || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const Yt = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, Zt = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let B = class extends w {
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
    var o, n, r, a;
    const e = (r = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[s]) == null ? void 0 : r.soc;
    if (!e || !this.hass) return null;
    const t = (a = this.hass.states[e]) == null ? void 0 : a.state;
    if (!t || t === "unavailable" || t === "unknown") return null;
    const i = parseFloat(t);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var t, i, o, n;
    const s = ((i = (t = this.config) == null ? void 0 : t.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, e = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.animation) !== !1;
    return Z`
      ${["solar", "grid", "battery", "ev"].filter((r) => this._isVisible(r)).map((r) => {
      const a = this._flowInfo(r), [l, c, f, h] = Zt[r], g = a.direction === "idle", _ = a.direction === "from-home", d = qt(a.magnitude, s && !g), y = [
        "flow-line",
        _ ? "reverse" : "",
        g ? "idle" : "",
        e ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Z`
            <line
              x1="${l}" y1="${c}" x2="${f}" y2="${h}"
              stroke="${Yt[r]}"
              class="${y}"
              style="--flow-dur:${d}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, e, t = !1) {
    var a, l, c;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, r = this._flowInfo(s);
    return p`
      <hec-energy-node
        class="${e}${i ? "" : " hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${r.power}
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
      (e) => !ge.includes(e)
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
    var a, l, c;
    const i = this._isVisible(s), o = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, r = this._flowInfo(s);
    return p`
      <hec-energy-node
        style="grid-column:${e}; grid-row:${t}"
        class="${i ? "" : "hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${r.power}
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
    if (!this.config) return u;
    const s = this._customTypes(), e = 2 + Math.ceil(s.length / 3);
    return p`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${e}" preserveAspectRatio="none">
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
B.styles = W`
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
  m({ attribute: !1 })
], B.prototype, "hass", 2);
he([
  m({ attribute: !1 })
], B.prototype, "config", 2);
he([
  z()
], B.prototype, "_dialogType", 2);
B = he([
  F("hec-flow-layout")
], B);
var Jt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, ke = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Qt(e, t) : e, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(e, t, o) : r(o)) || o);
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
    return this.config ? p`
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
ee.styles = W`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
ke([
  m({ attribute: !1 })
], ee.prototype, "hass", 2);
ke([
  m({ attribute: !1 })
], ee.prototype, "config", 2);
ee = ke([
  F("home-energy-card")
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
