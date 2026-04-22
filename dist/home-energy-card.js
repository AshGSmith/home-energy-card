/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, _t = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Rt = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ce = (s) => new te(typeof s == "string" ? s : s + "", void 0, $t), L = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((o, i, n) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new te(e, s, $t);
}, he = (s, t) => {
  if (_t) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = at.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, s.appendChild(o);
  }
}, jt = _t ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return ce(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: de, defineProperty: pe, getOwnPropertyDescriptor: ue, getOwnPropertyNames: fe, getOwnPropertySymbols: ge, getPrototypeOf: ye } = Object, S = globalThis, It = S.trustedTypes, me = It ? It.emptyScript : "", ut = S.reactiveElementPolyfillSupport, Z = (s, t) => s, lt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? me : null;
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
} }, bt = (s, t) => !de(s, t), Lt = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && pe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: n } = ue(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const t = ye(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const e = this.properties, o = [...fe(e), ...ge(e)];
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
      for (const i of o) e.unshift(jt(i));
    } else t !== void 0 && e.push(jt(t));
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
    return he(t, this.constructor.elementStyles), t;
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
      const r = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : lt).toAttribute(e, o.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = o.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : lt;
      this._$Em = i;
      const h = l.fromAttribute(e, a.type);
      this[i] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), o ?? (o = a.getPropertyOptions(t)), !((o.hasChanged ?? bt)(n, e) || o.useDefault && o.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, o)))) return;
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
        const { wrapped: a } = r, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[Z("elementProperties")] = /* @__PURE__ */ new Map(), M[Z("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: M }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, Bt = (s) => s, ct = J.trustedTypes, Ft = ct ? ct.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, ee = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, se = "?" + C, ve = `<${se}>`, H = document, X = () => H.createComment(""), tt = (s) => s === null || typeof s != "object" && typeof s != "function", wt = Array.isArray, _e = (s) => wt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ft = `[ 	
\f\r]`, Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vt = /-->/g, Wt = />/g, k = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, Kt = /"/g, ie = /^(?:script|style|textarea|title)$/i, oe = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), g = oe(1), Q = oe(2), z = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), qt = /* @__PURE__ */ new WeakMap(), N = H.createTreeWalker(H, 129);
function ne(s, t) {
  if (!wt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const $e = (s, t) => {
  const e = s.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Y;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, f, d = -1, y = 0;
    for (; y < l.length && (r.lastIndex = y, f = r.exec(l), f !== null); ) y = r.lastIndex, r === Y ? f[1] === "!--" ? r = Vt : f[1] !== void 0 ? r = Wt : f[2] !== void 0 ? (ie.test(f[2]) && (i = RegExp("</" + f[2], "g")), r = k) : f[3] !== void 0 && (r = k) : r === k ? f[0] === ">" ? (r = i ?? Y, d = -1) : f[1] === void 0 ? d = -2 : (d = r.lastIndex - f[2].length, h = f[1], r = f[3] === void 0 ? k : f[3] === '"' ? Kt : Gt) : r === Kt || r === Gt ? r = k : r === Vt || r === Wt ? r = Y : (r = k, i = void 0);
    const m = r === k && s[a + 1].startsWith("/>") ? " " : "";
    n += r === Y ? l + ve : d >= 0 ? (o.push(h), l.slice(0, d) + ee + l.slice(d) + C + m) : l + C + (d === -2 ? a : m);
  }
  return [ne(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class et {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [h, f] = $e(t, e);
    if (this.el = et.createElement(h, o), N.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = N.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ee)) {
          const y = f[r++], m = i.getAttribute(d).split(C), $ = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: n, name: $[2], strings: m, ctor: $[1] === "." ? we : $[1] === "?" ? xe : $[1] === "@" ? Ee : ht }), i.removeAttribute(d);
        } else d.startsWith(C) && (l.push({ type: 6, index: n }), i.removeAttribute(d));
        if (ie.test(i.tagName)) {
          const d = i.textContent.split(C), y = d.length - 1;
          if (y > 0) {
            i.textContent = ct ? ct.emptyScript : "";
            for (let m = 0; m < y; m++) i.append(d[m], X()), N.nextNode(), l.push({ type: 2, index: ++n });
            i.append(d[y], X());
          }
        }
      } else if (i.nodeType === 8) if (i.data === se) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(C, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += C.length - 1;
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
  var r, a;
  if (t === z) return t;
  let i = o !== void 0 ? (r = e._$Co) == null ? void 0 : r[o] : e._$Cl;
  const n = tt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = i : e._$Cl = i), i !== void 0 && (t = R(s, i._$AS(s, t.values), i, o)), t;
}
class be {
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
    N.currentNode = i;
    let n = N.nextNode(), r = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let h;
        l.type === 2 ? h = new ot(n, n.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (h = new Ae(n, this, t)), this._$AV.push(h), l = o[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = N.nextNode(), r++);
    }
    return N.currentNode = H, i;
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
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = R(this, t, e), tt(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _e(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = et.createElement(ne(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new be(i, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = qt.get(t.strings);
    return e === void 0 && qt.set(t.strings, e = new et(t)), e;
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
      const i = Bt(t).nextSibling;
      Bt(t).remove(), t = i;
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
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = p;
  }
  _$AI(t, e = this, o, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = R(this, t, e, 0), r = !tt(t) || t !== this._$AH && t !== z, r && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = n[0], l = 0; l < n.length - 1; l++) h = R(this, a[o + l], e, l), h === z && (h = this._$AH[l]), r || (r = !tt(h) || h !== this._$AH[l]), h === p ? t = p : t !== p && (t += (h ?? "") + n[l + 1]), this._$AH[l] = h;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class we extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class xe extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Ee extends ht {
  constructor(t, e, o, i, n) {
    super(t, e, o, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? p) === z) return;
    const o = this._$AH, i = t === p && o !== p || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== p && (o === p || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ae {
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
const gt = J.litHtmlPolyfillSupport;
gt == null || gt(et, ot), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.2");
const Ce = (s, t, e) => {
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
const U = globalThis;
class b extends M {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ce(e, this.renderRoot, this.renderOptions);
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
    return z;
  }
}
var Xt;
b._$litElement$ = !0, b.finalized = !0, (Xt = U.litElementHydrateSupport) == null || Xt.call(U, { LitElement: b });
const yt = U.litElementPolyfillSupport;
yt == null || yt({ LitElement: b });
(U.litElementVersions ?? (U.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: bt }, Pe = (s = Se, t, e) => {
  const { kind: o, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), o === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (o === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function _(s) {
  return (t, e) => typeof e == "object" ? Pe(s, t, e) : ((o, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function xt(s) {
  return _({ ...s, state: !0, attribute: !1 });
}
var Te = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, Et = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Oe(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && Te(t, e, i), i;
};
let st = class extends b {
  setConfig(s) {
    this.config = s;
  }
  render() {
    var s, t, e, o, i, n, r, a, l, h, f, d, y, m, $, v, T, O, E, A, F, V, W, G, K, q, Ct, St, Pt, Tt, Ot, kt, Nt, Ut, Ht, Dt, Mt, zt;
    return this.config ? g`
      <ha-textfield
        label="Title"
        .value=${this.config.title ?? ""}
        @change=${(u) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            title: u.target.value || void 0
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
          @change=${(u) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header: u.target.checked
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
        @value-changed=${(u) => {
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
                  power_combined: u.detail.value || void 0
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
        @value-changed=${(u) => {
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
                  power_import: u.detail.value || void 0
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
        @value-changed=${(u) => {
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
                  power_export: u.detail.value || void 0
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
        .value=${((a = (r = this.config.entity_types) == null ? void 0 : r.grid) == null ? void 0 : a.power_combined) ?? ""}
        @value-changed=${(u) => {
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
                  power_combined: u.detail.value || void 0
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
        .value=${((h = (l = this.config.entity_types) == null ? void 0 : l.grid) == null ? void 0 : h.daily_usage) ?? ""}
        @value-changed=${(u) => {
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
                  daily_usage: u.detail.value || void 0
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
        label="Solar Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((d = (f = this.config.entity_types) == null ? void 0 : f.solar) == null ? void 0 : d.power_combined) ?? ""}
        @value-changed=${(u) => {
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
                  power_combined: u.detail.value || void 0
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
        .value=${((m = (y = this.config.entity_types) == null ? void 0 : y.solar) == null ? void 0 : m.daily_usage) ?? ""}
        @value-changed=${(u) => {
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
                  daily_usage: u.detail.value || void 0
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
        label="Battery State of Charge"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((v = ($ = this.config.entity_types) == null ? void 0 : $.battery) == null ? void 0 : v.soc) ?? ""}
        @value-changed=${(u) => {
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
                  soc: u.detail.value || void 0
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
        .value=${((O = (T = this.config.entity_types) == null ? void 0 : T.battery) == null ? void 0 : O.power_combined) ?? ""}
        @value-changed=${(u) => {
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
                  power_combined: u.detail.value || void 0
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
        .value=${((A = (E = this.config.entity_types) == null ? void 0 : E.battery) == null ? void 0 : A.daily_usage) ?? ""}
        @value-changed=${(u) => {
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
                  daily_usage: u.detail.value || void 0
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
        label="Home Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((V = (F = this.config.entity_types) == null ? void 0 : F.home) == null ? void 0 : V.power_combined) ?? ""}
        @value-changed=${(u) => {
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
                  power_combined: u.detail.value || void 0
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
        .value=${((G = (W = this.config.entity_types) == null ? void 0 : W.home) == null ? void 0 : G.daily_usage) ?? ""}
        @value-changed=${(u) => {
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
                  daily_usage: u.detail.value || void 0
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
        .value=${((q = (K = this.config.entity_types) == null ? void 0 : K.ev) == null ? void 0 : q.soc) ?? ""}
        @value-changed=${(u) => {
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
                  soc: u.detail.value || void 0
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
        .value=${((St = (Ct = this.config.entity_types) == null ? void 0 : Ct.ev) == null ? void 0 : St.daily_usage) ?? ""}
        @value-changed=${(u) => {
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
                  daily_usage: u.detail.value || void 0
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
        label="Custom Import Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${((Tt = (Pt = this.config.entity_types) == null ? void 0 : Pt.custom_1) == null ? void 0 : Tt.power_import) ?? ""}
        @value-changed=${(u) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.custom_1) ?? {},
                  power_import: u.detail.value || void 0
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
        .value=${((kt = (Ot = this.config.entity_types) == null ? void 0 : Ot.custom_1) == null ? void 0 : kt.power_export) ?? ""}
        @value-changed=${(u) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.custom_1) ?? {},
                  power_export: u.detail.value || void 0
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
        .value=${((Ut = (Nt = this.config.entity_types) == null ? void 0 : Nt.custom_1) == null ? void 0 : Ut.power_combined) ?? ""}
        @value-changed=${(u) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.custom_1) ?? {},
                  power_combined: u.detail.value || void 0
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
        .value=${((Dt = (Ht = this.config.entity_types) == null ? void 0 : Ht.custom_1) == null ? void 0 : Dt.daily_usage) ?? ""}
        @value-changed=${(u) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.custom_1) ?? {},
                  daily_usage: u.detail.value || void 0
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
        .value=${((zt = (Mt = this.config.entity_types) == null ? void 0 : Mt.custom_1) == null ? void 0 : zt.soc) ?? ""}
        @value-changed=${(u) => {
      var c;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((c = this.config.entity_types) == null ? void 0 : c.custom_1) ?? {},
                  soc: u.detail.value || void 0
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
    ` : p;
  }
};
st.styles = L`
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
  _({ attribute: !1 })
], st.prototype, "hass", 2);
Et([
  _({ attribute: !1 })
], st.prototype, "config", 2);
st = Et([
  B("home-energy-card-editor")
], st);
var ke = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, dt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ne(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && ke(t, e, i), i;
};
function nt(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : e.attributes.unit_of_measurement === "Wh" ? o / 1e3 : o;
}
function rt(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Ue(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (o) => o.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((o) => t.includes(o)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((o) => t.includes(o)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((o) => t.includes(o)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let j = class extends b {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var v, T, O, E, A, F, V, W, G, K, q;
    if (!this.config) return p;
    const s = ((v = this.hass) == null ? void 0 : v.states) ?? {}, t = this.config.entity_types ?? {}, e = ((T = this.config.display) == null ? void 0 : T.decimal_places) ?? 1, o = this.config.tariff_entity ? (O = s[this.config.tariff_entity]) == null ? void 0 : O.state : null, i = o && o !== "unavailable" && o !== "unknown" ? Ue(o) : null, n = nt(s, (E = t.solar) == null ? void 0 : E.daily_usage), r = nt(s, (A = t.home) == null ? void 0 : A.daily_usage), a = nt(s, (F = t.grid) == null ? void 0 : F.daily_usage), l = nt(s, (V = t.grid) == null ? void 0 : V.daily_export), h = !!((W = t.solar) != null && W.daily_usage), f = !!((G = t.home) != null && G.daily_usage), d = !!((K = t.grid) != null && K.daily_usage), y = !!((q = t.grid) != null && q.daily_export), m = d || y, $ = h || f || m;
    return g`
      <div class="header">

        ${this.showTitle || i ? g`
          <div class="title-row">
            ${this.showTitle ? g`<span class="title">${this.config.title ?? "Home Energy"}</span>` : p}
            ${i ? g`
                  <span
                    class="tariff"
                    style="background:${i.bg};color:${i.fg};"
                  >${i.label}</span>
                ` : p}
          </div>
        ` : p}

        ${$ ? g`
          <div class="stats-row">

            ${h ? g`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${rt(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : p}

            ${f ? g`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${rt(r, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : p}

            ${m ? g`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? g`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${rt(a, e)}</span>
                    </div>
                  ` : p}
                  ${y ? g`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${rt(l, e)}</span>
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
j.styles = L`
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
  _({ attribute: !1 })
], j.prototype, "hass", 2);
dt([
  _({ attribute: !1 })
], j.prototype, "config", 2);
dt([
  _({ type: Boolean })
], j.prototype, "showTitle", 2);
j = dt([
  B("hec-card-header")
], j);
var He = Object.defineProperty, De = Object.getOwnPropertyDescriptor, P = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? De(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && He(t, e, i), i;
};
const Me = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, ze = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, vt = 38, Yt = +(2 * Math.PI * vt).toFixed(4);
function re(s, t, e) {
  if (s === null) return "—";
  const o = Math.abs(s);
  return t === "W" || t === "auto" && o < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let w = class extends b {
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
    const s = Me[this.type] ?? ze, t = this.colour || s.accent, e = this.soc !== null, o = e ? Math.max(0, Math.min(100, this.soc)) : 0, i = +(Yt * (1 - o / 100)).toFixed(4);
    return g`
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
            style="stroke-dasharray:${Yt};stroke-dashoffset:${i};"
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
          <span class="power">${re(this.power, this.unit, this.decimalPlaces)}</span>
          ${e ? g`
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
w.styles = L`
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
  _()
], w.prototype, "type", 2);
P([
  _()
], w.prototype, "label", 2);
P([
  _()
], w.prototype, "colour", 2);
P([
  _({ type: Number })
], w.prototype, "power", 2);
P([
  _({ type: Number })
], w.prototype, "soc", 2);
P([
  _()
], w.prototype, "unit", 2);
P([
  _({ type: Number })
], w.prototype, "decimalPlaces", 2);
w = P([
  B("hec-energy-node")
], w);
function mt(s, t) {
  var i;
  if (!t) return null;
  const e = (i = s[t]) == null ? void 0 : i.state;
  if (!e || e === "unavailable" || e === "unknown") return null;
  const o = parseFloat(e);
  return isNaN(o) ? null : o;
}
function ae(s, t, e) {
  const o = t.zero_tolerance ?? 0, i = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = mt(e, t.power_combined);
  else {
    const l = !!t.power_import, h = !!t.power_export;
    if (!l && !h) return i;
    const f = l ? mt(e, t.power_import) : null, d = h ? mt(e, t.power_export) : null;
    if ((!l || f === null) && (!h || d === null)) return i;
    n = (f ?? 0) - (d ?? 0);
  }
  if (n === null) return i;
  if (Math.abs(n) <= o) return { power: n, magnitude: null, direction: "idle" };
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
var Re = Object.defineProperty, je = Object.getOwnPropertyDescriptor, D = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? je(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && Re(t, e, i), i;
};
const Ie = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Le = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Be = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Fe(s) {
  const t = Date.now(), e = t - 864e5, o = Array(24).fill(null);
  if (!s.length) return o;
  for (let i = 0; i < 24; i++) {
    const n = e + i * 36e5, r = n + 36e5;
    let a = 0, l = 0;
    for (let h = 0; h < s.length; h++) {
      const f = new Date(s[h].last_changed).getTime(), d = h + 1 < s.length ? new Date(s[h + 1].last_changed).getTime() : t, y = Math.max(f, n), m = Math.min(d, r);
      if (m <= y) continue;
      const $ = parseFloat(s[h].state);
      if (isNaN($)) continue;
      const v = m - y;
      a += Math.abs($) * v, l += v;
    }
    l > 0 && (o[i] = a / l);
  }
  return o;
}
function le(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : o;
}
function Zt(s, t) {
  var i;
  const e = le(s, t);
  return e === null ? null : ((i = s[t]) == null ? void 0 : i.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function Jt(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function Ve(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Qt(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function We(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Ge(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let x = class extends b {
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
        const i = /* @__PURE__ */ new Date(), r = `history/period/${new Date(i.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${i.toISOString()}`, a = await this.hass.callApi("GET", r);
        this._hourly = Fe((a == null ? void 0 : a[0]) ?? []);
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
    return g`
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
    var i, n, r, a, l;
    const t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", o = ((l = Be[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return g`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${re(s.power, e, t)}</div>
        ${o ? g`<div class="power-sub">${o}</div>` : p}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return p;
    const t = Ge(s);
    return g`
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
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, e = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, o = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", i = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([o, Jt(Zt(t, s.daily_usage), e)]), s.daily_export && n.push([i, Jt(Zt(t, s.daily_export), e)]), n.length ? g`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([h, f]) => g`
          <div class="kv">
            <span class="kv-k">${h}</span>
            <span class="kv-v">${f}</span>
          </div>
        `)}
      </div>
    ` : p;
  }
  _sectionOctopus(s) {
    var $;
    const t = (($ = this.hass) == null ? void 0 : $.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, o = s.cost_entity ? t[s.cost_entity] : null, i = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, r = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", a = o == null ? void 0 : o.state, l = (o == null ? void 0 : o.attributes.unit_of_measurement) ?? "£", h = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], f = Date.now(), d = h.filter((v) => new Date(v.end ?? v.end_time ?? 0).getTime() > f).slice(0, 6), y = n && n !== "unavailable" && n !== "unknown", m = a && a !== "unavailable" && a !== "unknown";
    return !y && !m && !d.length ? p : g`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${y ? g`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
          </div>
        ` : p}

        ${m ? g`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(a).toFixed(2)}</span>
          </div>
        ` : p}

        ${d.length ? g`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((v) => {
      const T = v.start ?? v.start_time ?? "", O = v.end ?? v.end_time ?? "", E = v.value_inc_vat ?? v.rate_inc_vat ?? v.value ?? 0, A = We(E);
      return g`
              <div class="slot">
                <span class="slot-dot" style="background:${A};"></span>
                <span class="slot-time">${Qt(T)}–${Qt(O)}</span>
                <span class="slot-rate" style="color:${A};">${(+E).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : p}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, o = /* @__PURE__ */ new Date(), i = (n) => Ve(new Date(o.getTime() - n * 36e5));
    return this._loading ? g`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : g`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? g`<div class="chart-msg">No data</div>` : g`
              ${Q`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return Q``;
      const a = Math.max(2, n / e * 48);
      return Q`
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
    var l, h, f;
    if (!this.open || !this.nodeType) return p;
    const s = ((h = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : h[this.nodeType]) ?? {}, t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, e = s.colour || (Le[this.nodeType] ?? "#9e9e9e"), o = Ie[this.nodeType] ?? "mdi:lightning-bolt", i = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = ae(this.nodeType, s, t), r = ["battery", "ev"].includes(this.nodeType) && !!s.soc, a = r ? le(t, s.soc) : null;
    return g`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, o, i)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(a) : p}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : p}
          ${this._sectionChart(e)}
        </div>
      </div>
    `;
  }
};
x.styles = L`
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
D([
  _({ attribute: !1 })
], x.prototype, "hass", 2);
D([
  _({ attribute: !1 })
], x.prototype, "config", 2);
D([
  _()
], x.prototype, "nodeType", 2);
D([
  _({ type: Boolean })
], x.prototype, "open", 2);
D([
  xt()
], x.prototype, "_hourly", 2);
D([
  xt()
], x.prototype, "_loading", 2);
x = D([
  B("hec-node-detail")
], x);
const Ke = ["grid", "solar", "battery", "home", "ev"];
var qe = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, pt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ye(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && qe(t, e, i), i;
};
function Ze(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const Je = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, Qe = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let I = class extends b {
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
    return ae(s, t, ((i = this.hass) == null ? void 0 : i.states) ?? {});
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
    var i, n, r, a;
    const t = (r = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[s]) == null ? void 0 : r.soc;
    if (!t || !this.hass) return null;
    const e = (a = this.hass.states[t]) == null ? void 0 : a.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const o = parseFloat(e);
    return isNaN(o) ? null : o;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var e, o, i, n;
    const s = ((o = (e = this.config) == null ? void 0 : e.display) == null ? void 0 : o.dynamic_animation_speed) ?? !1, t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.animation) !== !1;
    return Q`
      ${["solar", "grid", "battery", "ev"].filter((r) => this._isVisible(r)).map((r) => {
      const a = this._flowInfo(r), [l, h, f, d] = Qe[r], y = a.direction === "idle", m = a.direction === "from-home", $ = Ze(a.magnitude, s && !y), v = [
        "flow-line",
        m ? "reverse" : "",
        y ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Q`
            <line
              x1="${l}" y1="${h}" x2="${f}" y2="${d}"
              stroke="${Je[r]}"
              class="${v}"
              style="--flow-dur:${$}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var a, l, h;
    const o = s === "home" ? !0 : this._isVisible(s), i = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((h = this.config) == null ? void 0 : h.display) ?? {}, r = this._flowInfo(s);
    return g`
      <hec-energy-node
        class="${t}${o ? "" : " hidden"}"
        .type=${s}
        .label=${i.label ?? s}
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
      (t) => !Ke.includes(t)
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
    var a, l, h;
    const o = this._isVisible(s), i = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((h = this.config) == null ? void 0 : h.display) ?? {}, r = this._flowInfo(s);
    return g`
      <hec-energy-node
        style="grid-column:${t}; grid-row:${e}"
        class="${o ? "" : "hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .colour=${i.colour ?? ""}
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
    if (!this.config) return p;
    const s = this._customTypes(), t = 2 + Math.ceil(s.length / 3);
    return g`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${t}" preserveAspectRatio="none">
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
I.styles = L`
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
  _({ attribute: !1 })
], I.prototype, "hass", 2);
pt([
  _({ attribute: !1 })
], I.prototype, "config", 2);
pt([
  xt()
], I.prototype, "_dialogType", 2);
I = pt([
  B("hec-flow-layout")
], I);
var Xe = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, At = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ts(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (i = (o ? r(t, e, i) : r(i)) || i);
  return o && i && Xe(t, e, i), i;
};
let it = class extends b {
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
    ` : p;
  }
};
it.styles = L`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
At([
  _({ attribute: !1 })
], it.prototype, "hass", 2);
At([
  _({ attribute: !1 })
], it.prototype, "config", 2);
it = At([
  B("home-energy-card")
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
