/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, dt = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Lt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (dt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = At.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && At.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Yt = (s) => new Lt(typeof s == "string" ? s : s + "", void 0, pt), U = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new Lt(e, s, pt);
}, Zt = (s, t) => {
  if (dt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = X.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, Et = dt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Yt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jt, defineProperty: Qt, getOwnPropertyDescriptor: Xt, getOwnPropertyNames: te, getOwnPropertySymbols: ee, getPrototypeOf: se } = Object, x = globalThis, St = x.trustedTypes, ie = St ? St.emptyScript : "", nt = x.reactiveElementPolyfillSupport, L = (s, t) => s, tt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ie : null;
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
} }, ut = (s, t) => !Jt(s, t), Ct = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Qt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = Xt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = se(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...te(e), ...ee(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(Et(o));
    } else t !== void 0 && e.push(Et(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : tt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : tt;
      this._$Em = o;
      const c = l.fromAttribute(e, a.type);
      this[o] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ut)(n, e) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[L("elementProperties")] = /* @__PURE__ */ new Map(), O[L("finalized")] = /* @__PURE__ */ new Map(), nt == null || nt({ ReactiveElement: O }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, Pt = (s) => s, et = I.trustedTypes, Tt = et ? et.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, It = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Bt = "?" + w, oe = `<${Bt}>`, P = document, F = () => P.createComment(""), V = (s) => s === null || typeof s != "object" && typeof s != "function", ft = Array.isArray, ne = (s) => ft(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", rt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, kt = />/g, E = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, Ht = /"/g, Ft = /^(?:script|style|textarea|title)$/i, Vt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = Vt(1), B = Vt(2), k = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Mt = /* @__PURE__ */ new WeakMap(), S = P.createTreeWalker(P, 129);
function Wt(s, t) {
  if (!ft(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const re = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = j;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let c, p, d = -1, f = 0;
    for (; f < l.length && (r.lastIndex = f, p = r.exec(l), p !== null); ) f = r.lastIndex, r === j ? p[1] === "!--" ? r = Ot : p[1] !== void 0 ? r = kt : p[2] !== void 0 ? (Ft.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = E) : p[3] !== void 0 && (r = E) : r === E ? p[0] === ">" ? (r = o ?? j, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? E : p[3] === '"' ? Ht : Nt) : r === Ht || r === Nt ? r = E : r === Ot || r === kt ? r = j : (r = E, o = void 0);
    const m = r === E && s[a + 1].startsWith("/>") ? " " : "";
    n += r === j ? l + oe : d >= 0 ? (i.push(c), l.slice(0, d) + It + l.slice(d) + w + m) : l + w + (d === -2 ? a : m);
  }
  return [Wt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, p] = re(t, e);
    if (this.el = W.createElement(c, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = S.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(It)) {
          const f = p[r++], m = o.getAttribute(d).split(w), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: n, name: v[2], strings: m, ctor: v[1] === "." ? le : v[1] === "?" ? ce : v[1] === "@" ? he : st }), o.removeAttribute(d);
        } else d.startsWith(w) && (l.push({ type: 6, index: n }), o.removeAttribute(d));
        if (Ft.test(o.tagName)) {
          const d = o.textContent.split(w), f = d.length - 1;
          if (f > 0) {
            o.textContent = et ? et.emptyScript : "";
            for (let m = 0; m < f; m++) o.append(d[m], F()), S.nextNode(), l.push({ type: 2, index: ++n });
            o.append(d[f], F());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Bt) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(w, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += w.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function N(s, t, e = s, i) {
  var r, a;
  if (t === k) return t;
  let o = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const n = V(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = N(s, o._$AS(s, t.values), o, i)), t;
}
class ae {
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
    const { el: { content: e }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? P).importNode(e, !0);
    S.currentNode = o;
    let n = S.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new q(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new de(n, this, t)), this._$AV.push(c), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = S.nextNode(), r++);
    }
    return S.currentNode = P, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class q {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = N(this, t, e), V(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ne(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = W.createElement(Wt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const r = new ae(o, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Mt.get(t.strings);
    return e === void 0 && Mt.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new q(this.O(F()), this.O(F()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = Pt(t).nextSibling;
      Pt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class st {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = N(this, t, e, 0), r = !V(t) || t !== this._$AH && t !== k, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = N(this, a[i + l], e, l), c === k && (c = this._$AH[l]), r || (r = !V(c) || c !== this._$AH[l]), c === h ? t = h : t !== h && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class le extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class ce extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class he extends st {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = N(this, t, e, 0) ?? h) === k) return;
    const i = this._$AH, o = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== h && (i === h || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class de {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
}
const at = I.litHtmlPolyfillSupport;
at == null || at(W, q), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.2");
const pe = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new q(t.insertBefore(F(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class $ extends O {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = pe(e, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
var jt;
$._$litElement$ = !0, $.finalized = !0, (jt = C.litElementHydrateSupport) == null || jt.call(C, { LitElement: $ });
const lt = C.litElementPolyfillSupport;
lt == null || lt({ LitElement: $ });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: ut }, fe = (s = ue, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function g(s) {
  return (t, e) => typeof e == "object" ? fe(s, t, e) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function gt(s) {
  return g({ ...s, state: !0, attribute: !1 });
}
var ge = Object.defineProperty, me = Object.getOwnPropertyDescriptor, mt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? me(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && ge(t, e, o), o;
};
let G = class extends $ {
  setConfig(s) {
    this.config = s;
  }
  render() {
    var s, t;
    return this.config ? u`
      <ha-textfield
        label="Title"
        .value=${this.config.title ?? ""}
        @change=${(e) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            title: e.target.value || void 0
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
          @change=${(e) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header: e.target.checked
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
        @value-changed=${(e) => {
      var i;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((i = this.config.entity_types) == null ? void 0 : i.ev) ?? {},
                  power_combined: e.detail.value || void 0
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
    ` : h;
  }
};
G.styles = U`
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
mt([
  g({ attribute: !1 })
], G.prototype, "hass", 2);
mt([
  g({ attribute: !1 })
], G.prototype, "config", 2);
G = mt([
  D("home-energy-card-editor")
], G);
var ye = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, it = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ve(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && ye(t, e, o), o;
};
function J(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : e.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function Q(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function $e(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let H = class extends $ {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, Y, Z, z, R, vt, $t, _t, bt, wt, xt;
    if (!this.config) return h;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = this.config.entity_types ?? {}, e = ((Y = this.config.display) == null ? void 0 : Y.decimal_places) ?? 1, i = this.config.tariff_entity ? (Z = s[this.config.tariff_entity]) == null ? void 0 : Z.state : null, o = i && i !== "unavailable" && i !== "unknown" ? $e(i) : null, n = J(s, (z = t.solar) == null ? void 0 : z.daily_usage), r = J(s, (R = t.home) == null ? void 0 : R.daily_usage), a = J(s, (vt = t.grid) == null ? void 0 : vt.daily_usage), l = J(s, ($t = t.grid) == null ? void 0 : $t.daily_export), c = !!((_t = t.solar) != null && _t.daily_usage), p = !!((bt = t.home) != null && bt.daily_usage), d = !!((wt = t.grid) != null && wt.daily_usage), f = !!((xt = t.grid) != null && xt.daily_export), m = d || f, v = c || p || m;
    return u`
      <div class="header">

        ${this.showTitle || o ? u`
          <div class="title-row">
            ${this.showTitle ? u`<span class="title">${this.config.title ?? "Home Energy"}</span>` : h}
            ${o ? u`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : h}
          </div>
        ` : h}

        ${v ? u`
          <div class="stats-row">

            ${c ? u`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${Q(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : h}

            ${p ? u`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${Q(r, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : h}

            ${m ? u`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? u`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${Q(a, e)}</span>
                    </div>
                  ` : h}
                  ${f ? u`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${Q(l, e)}</span>
                    </div>
                  ` : h}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : h}

          </div>
        ` : h}

      </div>
    `;
  }
};
H.styles = U`
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
it([
  g({ attribute: !1 })
], H.prototype, "hass", 2);
it([
  g({ attribute: !1 })
], H.prototype, "config", 2);
it([
  g({ type: Boolean })
], H.prototype, "showTitle", 2);
H = it([
  D("hec-card-header")
], H);
var _e = Object.defineProperty, be = Object.getOwnPropertyDescriptor, A = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? be(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && _e(t, e, o), o;
};
const we = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, xe = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, ht = 38, Ut = +(2 * Math.PI * ht).toFixed(4);
function Gt(s, t, e) {
  if (s === null) return "—";
  const i = Math.abs(s);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let _ = class extends $ {
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
    const s = we[this.type] ?? xe, t = this.colour || s.accent, e = this.soc !== null, i = e ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(Ut * (1 - i / 100)).toFixed(4);
    return u`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${e ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${ht}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${ht}"
            style="stroke-dasharray:${Ut};stroke-dashoffset:${o};"
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
          <span class="power">${Gt(this.power, this.unit, this.decimalPlaces)}</span>
          ${e ? u`
            <span class="soc-pct">
              <ha-icon class="soc-icon" icon="mdi:battery"></ha-icon>
              ${this.soc.toFixed(0)}%
            </span>
          ` : h}
        </div>

      </div>
    `;
  }
};
_.styles = U`
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
  g()
], _.prototype, "type", 2);
A([
  g()
], _.prototype, "label", 2);
A([
  g()
], _.prototype, "colour", 2);
A([
  g({ type: Number })
], _.prototype, "power", 2);
A([
  g({ type: Number })
], _.prototype, "soc", 2);
A([
  g()
], _.prototype, "unit", 2);
A([
  g({ type: Number })
], _.prototype, "decimalPlaces", 2);
_ = A([
  D("hec-energy-node")
], _);
function ct(s, t) {
  var o;
  if (!t) return null;
  const e = (o = s[t]) == null ? void 0 : o.state;
  if (!e || e === "unavailable" || e === "unknown") return null;
  const i = parseFloat(e);
  return isNaN(i) ? null : i;
}
function Kt(s, t, e) {
  const i = t.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = ct(e, t.power_combined);
  else {
    const l = !!t.power_import, c = !!t.power_export;
    if (!l && !c) return o;
    const p = l ? ct(e, t.power_import) : null, d = c ? ct(e, t.power_export) : null;
    if ((!l || p === null) && (!c || d === null)) return o;
    n = (p ?? 0) - (d ?? 0);
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
var Ae = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, T = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ee(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Ae(t, e, o), o;
};
const Se = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Ce = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Pe = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Te(s) {
  const t = Date.now(), e = t - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let o = 0; o < 24; o++) {
    const n = e + o * 36e5, r = n + 36e5;
    let a = 0, l = 0;
    for (let c = 0; c < s.length; c++) {
      const p = new Date(s[c].last_changed).getTime(), d = c + 1 < s.length ? new Date(s[c + 1].last_changed).getTime() : t, f = Math.max(p, n), m = Math.min(d, r);
      if (m <= f) continue;
      const v = parseFloat(s[c].state);
      if (isNaN(v)) continue;
      const y = m - f;
      a += Math.abs(v) * y, l += y;
    }
    l > 0 && (i[o] = a / l);
  }
  return i;
}
function qt(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : i;
}
function Dt(s, t) {
  var o;
  const e = qt(s, t);
  return e === null ? null : ((o = s[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function zt(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function Oe(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Rt(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function ke(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Ne(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let b = class extends $ {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(s) {
    super.updated(s), (s.has("open") || s.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var e, i;
    const s = (i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!(!t || !this.hass)) {
      this._loading = !0, this._hourly = [];
      try {
        const o = /* @__PURE__ */ new Date(), r = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, a = await this.hass.callApi("GET", r);
        this._hourly = Te((a == null ? void 0 : a[0]) ?? []);
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
  _header(s, t, e) {
    return u`
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
    var o, n, r, a, l;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", i = ((l = Pe[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return u`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Gt(s.power, e, t)}</div>
        ${i ? u`<div class="power-sub">${i}</div>` : h}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return h;
    const t = Ne(s);
    return u`
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
    var r, a, l;
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, e = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([i, zt(Dt(t, s.daily_usage), e)]), s.daily_export && n.push([o, zt(Dt(t, s.daily_export), e)]), n.length ? u`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([c, p]) => u`
          <div class="kv">
            <span class="kv-k">${c}</span>
            <span class="kv-v">${p}</span>
          </div>
        `)}
      </div>
    ` : h;
  }
  _sectionOctopus(s) {
    var v;
    const t = ((v = this.hass) == null ? void 0 : v.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, i = s.cost_entity ? t[s.cost_entity] : null, o = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, r = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", a = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", c = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], p = Date.now(), d = c.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > p).slice(0, 6), f = n && n !== "unavailable" && n !== "unknown", m = a && a !== "unavailable" && a !== "unknown";
    return !f && !m && !d.length ? h : u`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${f ? u`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
          </div>
        ` : h}

        ${m ? u`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(a).toFixed(2)}</span>
          </div>
        ` : h}

        ${d.length ? u`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((y) => {
      const Y = y.start ?? y.start_time ?? "", Z = y.end ?? y.end_time ?? "", z = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, R = ke(z);
      return u`
              <div class="slot">
                <span class="slot-dot" style="background:${R};"></span>
                <span class="slot-time">${Rt(Y)}–${Rt(Z)}</span>
                <span class="slot-rate" style="color:${R};">${(+z).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : h}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => Oe(new Date(i.getTime() - n * 36e5));
    return this._loading ? u`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : u`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? u`<div class="chart-msg">No data</div>` : u`
              ${B`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return B``;
      const a = Math.max(2, n / e * 48);
      return B`
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
    var l, c, p;
    if (!this.open || !this.nodeType) return h;
    const s = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, e = s.colour || (Ce[this.nodeType] ?? "#9e9e9e"), i = Se[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = Kt(this.nodeType, s, t), r = ["battery", "ev"].includes(this.nodeType) && !!s.soc, a = r ? qt(t, s.soc) : null;
    return u`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, i, o)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(a) : h}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : h}
          ${this._sectionChart(e)}
        </div>
      </div>
    `;
  }
};
b.styles = U`
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
T([
  g({ attribute: !1 })
], b.prototype, "hass", 2);
T([
  g({ attribute: !1 })
], b.prototype, "config", 2);
T([
  g()
], b.prototype, "nodeType", 2);
T([
  g({ type: Boolean })
], b.prototype, "open", 2);
T([
  gt()
], b.prototype, "_hourly", 2);
T([
  gt()
], b.prototype, "_loading", 2);
b = T([
  D("hec-node-detail")
], b);
const He = ["grid", "solar", "battery", "home", "ev"];
var Me = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, ot = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ue(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Me(t, e, o), o;
};
function De(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const ze = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, Re = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let M = class extends $ {
  constructor() {
    super(...arguments), this._dialogType = null;
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(s) {
    var t;
    return s in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(s) {
    var e, i, o;
    const t = ((i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[s]) ?? {};
    return Kt(s, t, ((o = this.hass) == null ? void 0 : o.states) ?? {});
  }
  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  _isVisible(s) {
    var e, i;
    return !(!this._configured(s) || (((i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[s]) ?? {}).show_zero === !1 && this._flowInfo(s).direction === "idle");
  }
  _soc(s) {
    var o, n, r, a;
    const t = (r = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[s]) == null ? void 0 : r.soc;
    if (!t || !this.hass) return null;
    const e = (a = this.hass.states[t]) == null ? void 0 : a.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const i = parseFloat(e);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var e, i, o, n;
    const s = ((i = (e = this.config) == null ? void 0 : e.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.animation) !== !1;
    return B`
      ${["solar", "grid", "battery", "ev"].filter((r) => this._isVisible(r)).map((r) => {
      const a = this._flowInfo(r), [l, c, p, d] = Re[r], f = a.direction === "idle", m = a.direction === "from-home", v = De(a.magnitude, s && !f), y = [
        "flow-line",
        m ? "reverse" : "",
        f ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return B`
            <line
              x1="${l}" y1="${c}" x2="${p}" y2="${d}"
              stroke="${ze[r]}"
              class="${y}"
              style="--flow-dur:${v}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var a, l, c;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, r = this._flowInfo(s);
    return u`
      <hec-energy-node
        class="${t}${i ? "" : " hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
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
      (t) => !He.includes(t)
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
    var a, l, c;
    const i = this._isVisible(s), o = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, r = this._flowInfo(s);
    return u`
      <hec-energy-node
        style="grid-column:${t}; grid-row:${e}"
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
    const t = s.detail;
    t != null && t.nodeType && (this._dialogType = t.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return h;
    const s = this._customTypes(), t = 2 + Math.ceil(s.length / 3);
    return u`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${t}" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : h}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : h}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${s.map((e, i) => {
      const [o, n] = this._customSlot(i);
      return this._customNode(e, o, n);
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
M.styles = U`
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
ot([
  g({ attribute: !1 })
], M.prototype, "hass", 2);
ot([
  g({ attribute: !1 })
], M.prototype, "config", 2);
ot([
  gt()
], M.prototype, "_dialogType", 2);
M = ot([
  D("hec-flow-layout")
], M);
var je = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, yt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Le(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && je(t, e, o), o;
};
let K = class extends $ {
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
    ` : h;
  }
};
K.styles = U`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
yt([
  g({ attribute: !1 })
], K.prototype, "hass", 2);
yt([
  g({ attribute: !1 })
], K.prototype, "config", 2);
K = yt([
  D("home-energy-card")
], K);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  K as HomeEnergyCard
};
