/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, mt = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _t = Symbol(), Ot = /* @__PURE__ */ new WeakMap();
let Yt = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== _t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (mt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Ot.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ot.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (e) => new Yt(typeof e == "string" ? e : e + "", void 0, _t), W = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new Yt(s, e, _t);
}, ie = (e, t) => {
  if (mt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = nt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, Nt = mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return se(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oe, defineProperty: ne, getOwnPropertyDescriptor: re, getOwnPropertyNames: ae, getOwnPropertySymbols: le, getPrototypeOf: ce } = Object, k = globalThis, Dt = k.trustedTypes, de = Dt ? Dt.emptyScript : "", ht = k.reactiveElementPolyfillSupport, q = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? de : null;
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
} }, vt = (e, t) => !oe(e, t), Ut = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ut) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && ne(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: n } = re(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const s = this.properties, i = [...ae(s), ...le(s)];
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
      for (const o of i) s.unshift(Nt(o));
    } else t !== void 0 && s.push(Nt(t));
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
    return ie(t, this.constructor.elementStyles), t;
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
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : rt).toAttribute(s, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = o;
      const c = l.fromAttribute(s, a.type);
      this[o] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? vt)(n, s) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[q("elementProperties")] = /* @__PURE__ */ new Map(), z[q("finalized")] = /* @__PURE__ */ new Map(), ht == null || ht({ ReactiveElement: z }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, Mt = (e) => e, at = G.trustedTypes, jt = at ? at.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, qt = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + S, he = `<${Gt}>`, D = document, J = () => D.createComment(""), Q = (e) => e === null || typeof e != "object" && typeof e != "function", $t = Array.isArray, pe = (e) => $t(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zt = /-->/g, Ht = />/g, C = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, It = /"/g, Zt = /^(?:script|style|textarea|title)$/i, Jt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), f = Jt(1), Z = Jt(2), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Lt = /* @__PURE__ */ new WeakMap(), O = D.createTreeWalker(D, 129);
function Qt(e, t) {
  if (!$t(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const ue = (e, t) => {
  const s = e.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Y;
  for (let a = 0; a < s; a++) {
    const l = e[a];
    let c, p, d = -1, y = 0;
    for (; y < l.length && (r.lastIndex = y, p = r.exec(l), p !== null); ) y = r.lastIndex, r === Y ? p[1] === "!--" ? r = zt : p[1] !== void 0 ? r = Ht : p[2] !== void 0 ? (Zt.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = C) : p[3] !== void 0 && (r = C) : r === C ? p[0] === ">" ? (r = o ?? Y, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? C : p[3] === '"' ? It : Rt) : r === It || r === Rt ? r = C : r === zt || r === Ht ? r = Y : (r = C, o = void 0);
    const m = r === C && e[a + 1].startsWith("/>") ? " " : "";
    n += r === Y ? l + he : d >= 0 ? (i.push(c), l.slice(0, d) + qt + l.slice(d) + S + m) : l + S + (d === -2 ? a : m);
  }
  return [Qt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class X {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, p] = ue(t, s);
    if (this.el = X.createElement(c, i), O.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = O.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(qt)) {
          const y = p[r++], m = o.getAttribute(d).split(S), h = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: n, name: h[2], strings: m, ctor: h[1] === "." ? ge : h[1] === "?" ? ye : h[1] === "@" ? me : lt }), o.removeAttribute(d);
        } else d.startsWith(S) && (l.push({ type: 6, index: n }), o.removeAttribute(d));
        if (Zt.test(o.tagName)) {
          const d = o.textContent.split(S), y = d.length - 1;
          if (y > 0) {
            o.textContent = at ? at.emptyScript : "";
            for (let m = 0; m < y; m++) o.append(d[m], J()), O.nextNode(), l.push({ type: 2, index: ++n });
            o.append(d[y], J());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Gt) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(S, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += S.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(e, t, s = e, i) {
  var r, a;
  if (t === R) return t;
  let o = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const n = Q(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = I(e, o._$AS(e, t.values), o, i)), t;
}
class fe {
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? D).importNode(s, !0);
    O.currentNode = o;
    let n = O.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new et(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new _e(n, this, t)), this._$AV.push(c), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = O.nextNode(), r++);
    }
    return O.currentNode = D, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class et {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = I(this, t, s), Q(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = X.createElement(Qt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(s);
    else {
      const r = new fe(o, this), a = r.u(this.options);
      r.p(s), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = Lt.get(t.strings);
    return s === void 0 && Lt.set(t.strings, s = new X(t)), s;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of t) o === s.length ? s.push(i = new et(this.O(J()), this.O(J()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = Mt(t).nextSibling;
      Mt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, s = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = I(this, t, s, 0), r = !Q(t) || t !== this._$AH && t !== R, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = I(this, a[i + l], s, l), c === R && (c = this._$AH[l]), r || (r = !Q(c) || c !== this._$AH[l]), c === u ? t = u : t !== u && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ge extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ye extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class me extends lt {
  constructor(t, s, i, o, n) {
    super(t, s, i, o, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = I(this, t, s, 0) ?? u) === R) return;
    const i = this._$AH, o = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _e {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const ut = G.litHtmlPolyfillSupport;
ut == null || ut(X, et), (G.litHtmlVersions ?? (G.litHtmlVersions = [])).push("3.3.2");
const ve = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new et(t.insertBefore(J(), n), n, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class w extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ve(s, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Kt;
w._$litElement$ = !0, w.finalized = !0, (Kt = N.litElementHydrateSupport) == null || Kt.call(N, { LitElement: w });
const ft = N.litElementPolyfillSupport;
ft == null || ft({ LitElement: w });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: vt }, be = (e = $e, t, s) => {
  const { kind: i, metadata: o } = s;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function _(e) {
  return (t, s) => typeof s == "object" ? be(e, t, s) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return _({ ...e, state: !0, attribute: !1 });
}
const yt = ["grid", "solar", "battery", "home", "ev"], bt = (e) => e.attributes.device_class ?? "", wt = (e) => e.attributes.unit_of_measurement ?? "", xt = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function P(...e) {
  return (t, s) => {
    let i = 0;
    bt(s) === "power" && (i += 4), ["W", "kW"].includes(wt(s)) && (i += 2);
    const o = xt(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function H(...e) {
  return (t, s) => {
    let i = 0;
    bt(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(wt(s)) && (i += 2);
    const o = xt(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function Bt(...e) {
  return (t, s) => {
    let i = 0;
    bt(s) === "battery" && (i += 4), wt(s) === "%" && (i += 2);
    const o = xt(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function st(e, t = []) {
  return (s, i) => {
    const o = s.toLowerCase();
    if (t.some((r) => o.includes(r))) return 0;
    let n = 0;
    for (const r of e) o.includes(r) && (n += 4);
    return n;
  };
}
function v(e, t, s, i) {
  let o, n = 0;
  for (const r of e) {
    if (i.has(r)) continue;
    const a = t[r];
    if (!a) continue;
    const l = s(r, a);
    l > n && (n = l, o = r);
  }
  return o && i.add(o), o;
}
function we(e, t, s) {
  const i = Object.values(t).some(
    ($) => $.platform === "octopus_energy" && !$.disabled_by
  ), o = Object.keys(e).filter(($) => $.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    ($) => $.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], a = {}, l = {}, c = v(
    n,
    e,
    st(["_current_rate"], ["export", "accumulative"]),
    s
  );
  c && (a.rate_entity = c, r.push("rate"));
  const p = v(
    n,
    e,
    st(["_current_accumulative_cost"]),
    s
  );
  p && (a.cost_entity = p, r.push("cost"));
  const d = v(
    n,
    e,
    st(["_current_day_rates"]),
    s
  );
  d && (a.slots_entity = d, r.push("slots"));
  const y = v(
    o.filter(($) => $.startsWith("binary_sensor.")),
    e,
    st(["_intelligent_dispatching"]),
    s
  );
  y && (a.dispatches_entity = y, r.push("dispatching")), Object.keys(a).length && (l.octopus = a);
  const m = v(
    n,
    e,
    P("import", "demand", "current"),
    s
  );
  m && (l.power_import = m, r.push("import power"));
  const h = v(
    n,
    e,
    P("export", "demand", "current"),
    s
  );
  h && (l.power_export = h, r.push("export power"));
  const g = v(
    n,
    e,
    H("import", "accumulative", "consumption"),
    s
  );
  g && (l.daily_usage = g, r.push("daily import"));
  const b = v(
    n,
    e,
    H("export", "accumulative"),
    s
  );
  return b && (l.daily_export = b, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: r };
}
function xe(e, t, s) {
  const i = Object.values(t).filter(
    (h) => h.platform === "tesla_custom" && !h.disabled_by
  ), o = Object.keys(e).some(
    (h) => h.includes("powerwall") || h.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((h) => h.entity_id) : Object.keys(e).filter((h) => h.includes("powerwall") || h.includes("tesla")), r = n.filter((h) => h.includes("powerwall")), a = n.filter((h) => !h.includes("powerwall")), l = ["Tesla"], c = {};
  if (r.length > 0) {
    const h = {}, g = v(
      r,
      e,
      Bt("battery", "soc", "charge", "percent"),
      s
    );
    g && (h.soc = g);
    const b = v(
      r,
      e,
      P("battery", "power", "charge", "discharge"),
      s
    );
    b && (h.power_combined = b);
    const $ = v(
      r,
      e,
      H("battery", "today", "daily", "charged"),
      s
    );
    $ && (h.daily_usage = $), Object.keys(h).length && (c.battery = h, l.push("Powerwall"));
  }
  const p = v(
    n,
    e,
    P("solar"),
    s
  );
  if (p) {
    const h = { power_combined: p }, g = v(
      n,
      e,
      H("solar"),
      s
    );
    g && (h.daily_usage = g), c.solar = h, l.push("solar");
  }
  const d = v(
    n,
    e,
    P("load", "home", "house"),
    s
  );
  if (d) {
    const h = { power_combined: d }, g = v(
      n,
      e,
      H("load", "home", "house"),
      s
    );
    g && (h.daily_usage = g), c.home = h, l.push("home load");
  }
  const y = v(
    n,
    e,
    P("grid"),
    s
  );
  y && (c.grid = { power_combined: y }, l.push("grid"));
  const m = v(
    a,
    e,
    Bt("battery", "battery_level", "soc", "charge"),
    s
  );
  if (m) {
    const h = { soc: m }, g = v(
      a,
      e,
      P("charg", "power"),
      s
    );
    g && (h.power_combined = g);
    const b = v(
      a,
      e,
      H("charg", "energy"),
      s
    );
    b && (h.daily_usage = b), c.ev = h, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: c, summary: l };
}
function Ee(e) {
  var l, c;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = xe(s, i, o), r = we(s, i, o), a = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (a.integration_type = "tesla", Object.assign(a.entity_types, n.entity_types), a.summary.push(...n.summary ?? [])), r) {
    if (a.integration_type !== "tesla" && (a.integration_type = "octopus"), (l = r.entity_types) != null && l.grid) {
      const p = r.entity_types.grid;
      a.entity_types.grid = {
        ...a.entity_types.grid,
        ...p,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: p.power_import || (c = a.entity_types.grid) == null ? void 0 : c.power_combined
      };
    }
    r.tariff_entity && (a.tariff_entity = r.tariff_entity), a.summary.push(...r.summary ?? []);
  }
  return a;
}
function Ae(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = e.entity_types ?? {}, n = { ...o };
  for (const [r, a] of Object.entries(t.entity_types)) {
    const l = o[r] ?? {}, c = { ...l };
    for (const [p, d] of Object.entries(a))
      d !== void 0 && (s || !l[p]) && (c[p] = d);
    n[r] = c;
  }
  return i.entity_types = n, i;
}
var Se = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, M = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ke(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Se(t, s, o), o;
};
let E = class extends w {
  constructor() {
    super(...arguments), this._newTypeName = "", this._detectStatus = "", this._detectIsError = !1, this._openSections = /* @__PURE__ */ new Set();
  }
  setConfig(e) {
    this.config = e;
  }
  _runAutoDetect() {
    if (!this.hass) {
      this._detectStatus = "No hass object — editor not fully loaded.", this._detectIsError = !0;
      return;
    }
    const e = Ee(this.hass);
    if (e.integration_type === "manual" && e.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.", this._detectIsError = !0;
      return;
    }
    const t = Ae(
      this.config,
      e,
      /* overwrite= */
      !1
    );
    this._dispatch(t), this._detectIsError = !1, this._detectStatus = `Detected: ${e.summary.join(", ")}`;
  }
  _dispatch(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _set(e, t) {
    this._dispatch({ ...this.config, [e]: t });
  }
  _setEntityType(e, t, s) {
    var o;
    const i = { ...((o = this.config) == null ? void 0 : o.entity_types) ?? {} };
    i[e] = s === void 0 || s === "" || s === null ? (({ [t]: n, ...r }) => r)(i[e] ?? {}) : { ...i[e], [t]: s }, this._set("entity_types", i);
  }
  _setOctopus(e, t, s) {
    var a;
    const i = { ...((a = this.config) == null ? void 0 : a.entity_types) ?? {} }, o = i[e] ?? {}, n = { ...o.octopus, [t]: s || void 0 }, r = Object.values(n).some(Boolean);
    i[e] = r ? { ...o, octopus: n } : (({ octopus: l, ...c }) => c)(o), this._set("entity_types", i);
  }
  _renderEntityTypeFields(e) {
    var s, i, o, n, r;
    const t = ((i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) ?? {};
    return f`
      <div class="type-fields">

        <ha-entity-picker
          label="Import power"
          .hass=${this.hass}
          .value=${t.power_import ?? ""}
          @value-changed=${(a) => this._setEntityType(e, "power_import", a.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Export power"
          .hass=${this.hass}
          .value=${t.power_export ?? ""}
          @value-changed=${(a) => this._setEntityType(e, "power_export", a.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Combined power"
          .hass=${this.hass}
          .value=${t.power_combined ?? ""}
          @value-changed=${(a) => this._setEntityType(e, "power_combined", a.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Daily usage"
          .hass=${this.hass}
          .value=${t.daily_usage ?? ""}
          @value-changed=${(a) => this._setEntityType(e, "daily_usage", a.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="State of charge (%)"
          .hass=${this.hass}
          .value=${t.soc ?? ""}
          @value-changed=${(a) => this._setEntityType(e, "soc", a.detail.value)}
        ></ha-entity-picker>

        ${e === "grid" ? f`
          <div class="subsection-label">Octopus Energy</div>
          <ha-entity-picker
            label="Rate entity"
            .hass=${this.hass}
            .value=${((o = t.octopus) == null ? void 0 : o.rate_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(e, "rate_entity", a.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Cost today entity"
            .hass=${this.hass}
            .value=${((n = t.octopus) == null ? void 0 : n.cost_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(e, "cost_entity", a.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Slots / rates entity"
            .hass=${this.hass}
            .value=${((r = t.octopus) == null ? void 0 : r.slots_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(e, "slots_entity", a.detail.value)}
          ></ha-entity-picker>
        ` : u}

      </div>
    `;
  }
  _capitalize(e) {
    return e === "ev" ? "EV" : e.charAt(0).toUpperCase() + e.slice(1);
  }
  _addCustomType() {
    var s;
    const e = this._newTypeName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!e) return;
    const t = {
      ...((s = this.config) == null ? void 0 : s.entity_types) ?? {},
      [e]: {}
    };
    this._set("entity_types", t), this._newTypeName = "";
  }
  _removeCustomType(e) {
    var s;
    const t = { ...((s = this.config) == null ? void 0 : s.entity_types) ?? {} };
    delete t[e], this._set("entity_types", t);
  }
  _toggleSection(e) {
    const t = new Set(this._openSections);
    t.has(e) ? t.delete(e) : t.add(e), this._openSections = t;
  }
  _renderEntityTypeSections() {
    var s;
    const e = Object.keys(
      ((s = this.config) == null ? void 0 : s.entity_types) ?? {}
    ).filter(
      (i) => !yt.includes(i)
    ), t = (i, o = !1) => {
      const n = this._openSections.has(i);
      return f`
        <div class="type-block">
          <button class="type-toggle" @click=${() => this._toggleSection(i)}>
            <span>${this._capitalize(i)}</span>
            <ha-icon icon="mdi:chevron-${n ? "up" : "down"}"></ha-icon>
          </button>
          <div class="type-body" ?hidden=${!n}>
            ${this._renderEntityTypeFields(i)}
            ${o ? f`
              <div class="remove-row">
                <button class="text-btn" @click=${() => this._removeCustomType(i)}>
                  Remove type
                </button>
              </div>
            ` : u}
          </div>
        </div>
      `;
    };
    return f`
      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      ${yt.map((i) => t(i))}
      ${e.map((i) => t(i, !0))}

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
    var t;
    const e = ((t = this.config) == null ? void 0 : t.live_data) ?? {};
    return f`
      <ha-expansion-panel header="Live Data" outlined>
        <div class="section-content">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(e.refresh_interval ?? 5)}
            @change=${(s) => this._set("live_data", {
      ...e,
      refresh_interval: Number(s.target.value)
    })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${e.show_live_badge ?? !0}
              @change=${(s) => this._set("live_data", {
      ...e,
      show_live_badge: s.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  _renderSystemSection() {
    var t;
    const e = ((t = this.config) == null ? void 0 : t.system) ?? {};
    return f`
      <ha-expansion-panel header="System Settings" outlined>
        <div class="section-content">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(e.energy_date_reset ?? 0)}
            @change=${(s) => this._set("system", {
      ...e,
      energy_date_reset: Number(
        s.target.value
      )
    })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${e.time_format ?? "24h"}
            @value-changed=${(s) => this._set("system", {
      ...e,
      time_format: s.detail.value
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
    var t;
    const e = ((t = this.config) == null ? void 0 : t.display) ?? {};
    return f`
      <ha-expansion-panel header="Display" outlined>
        <div class="section-content">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(e.decimal_places ?? 1)}
            @change=${(s) => this._set("display", {
      ...e,
      decimal_places: Number(s.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${e.unit ?? "auto"}
            @value-changed=${(s) => this._set("display", {
      ...e,
      unit: s.detail.value
    })}
          >
            <mwc-list-item value="W">W</mwc-list-item>
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
          <div class="switch-row">
            <span>Animation</span>
            <ha-switch
              .checked=${e.animation ?? !0}
              @change=${(s) => this._set("display", {
      ...e,
      animation: s.target.checked
    })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${e.dynamic_animation_speed ?? !1}
              @change=${(s) => this._set("display", {
      ...e,
      dynamic_animation_speed: s.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return this.config ? f`
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
          @change=${(e) => this._set("title", e.target.value || void 0)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show title</span>
          <ha-switch
            .checked=${this.config.show_header ?? !0}
            @change=${(e) => this._set("show_header", e.target.checked)}
          ></ha-switch>
        </div>
        <ha-entity-picker
          label="Tariff status entity"
          .hass=${this.hass}
          .value=${this.config.tariff_entity ?? ""}
          @value-changed=${(e) => this._set("tariff_entity", e.detail.value || void 0)}
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
  _({ attribute: !1 })
], E.prototype, "hass", 2);
M([
  _({ attribute: !1 })
], E.prototype, "config", 2);
M([
  U()
], E.prototype, "_newTypeName", 2);
M([
  U()
], E.prototype, "_detectStatus", 2);
M([
  U()
], E.prototype, "_detectIsError", 2);
M([
  U()
], E.prototype, "_openSections", 2);
E = M([
  F("home-energy-card-editor")
], E);
var Te = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, ct = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ce(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Te(t, s, o), o;
};
function it(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function ot(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function Pe(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let L = class extends w {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var g, b, $, V, K, At, St, kt, Tt, Ct, Pt;
    if (!this.config) return u;
    const e = ((g = this.hass) == null ? void 0 : g.states) ?? {}, t = this.config.entity_types ?? {}, s = ((b = this.config.display) == null ? void 0 : b.decimal_places) ?? 1, i = this.config.tariff_entity ? ($ = e[this.config.tariff_entity]) == null ? void 0 : $.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Pe(i) : null, n = it(e, (V = t.solar) == null ? void 0 : V.daily_usage), r = it(e, (K = t.home) == null ? void 0 : K.daily_usage), a = it(e, (At = t.grid) == null ? void 0 : At.daily_usage), l = it(e, (St = t.grid) == null ? void 0 : St.daily_export), c = !!((kt = t.solar) != null && kt.daily_usage), p = !!((Tt = t.home) != null && Tt.daily_usage), d = !!((Ct = t.grid) != null && Ct.daily_usage), y = !!((Pt = t.grid) != null && Pt.daily_export), m = d || y, h = c || p || m;
    return f`
      <div class="header">

        ${this.showTitle || o ? f`
          <div class="title-row">
            ${this.showTitle ? f`<span class="title">${this.config.title ?? "Home Energy"}</span>` : u}
            ${o ? f`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : u}
          </div>
        ` : u}

        ${h ? f`
          <div class="stats-row">

            ${c ? f`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${ot(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : u}

            ${p ? f`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Usage</span>
                <span class="stat-val">${ot(r, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : u}

            ${m ? f`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? f`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${ot(a, s)}</span>
                    </div>
                  ` : u}
                  ${y ? f`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${ot(l, s)}</span>
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
      gap: 0 14px;
      margin-top: 5px;
    }

    /* divider between stat groups */
    .stats-row > * + *::before {
      content: "·";
      margin-right: 14px;
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
ct([
  _({ attribute: !1 })
], L.prototype, "hass", 2);
ct([
  _({ attribute: !1 })
], L.prototype, "config", 2);
ct([
  _({ type: Boolean })
], L.prototype, "showTitle", 2);
L = ct([
  F("hec-card-header")
], L);
var Oe = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, T = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ne(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Oe(t, s, o), o;
};
const De = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e0f7fa", gradEnd: "#80deea", accent: "#00acc1", icon: "mdi:car-electric" }
}, Ue = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
};
function Me(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
function Xt(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
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
    const e = De[this.type] ?? Ue, t = this.colour || e.accent;
    return f`
      <div
        class="node"
        style="background: linear-gradient(150deg, ${e.gradStart} 0%, ${e.gradEnd} 100%); color: ${t};"
        @click=${this._handleClick}
      >
        <ha-icon .icon=${e.icon}></ha-icon>
        <span class="label" style="color: ${t};">${this.label || this.type}</span>
        <span class="power">
          ${Xt(this.power, this.unit, this.decimalPlaces)}
        </span>
        <div class="soc-wrap${this.soc !== null ? " has-soc" : ""}">
          <div class="soc-bar-bg">
            <div
              class="soc-bar"
              style="width: ${this.soc !== null ? Math.max(0, Math.min(100, this.soc)) : 0}%; background: ${this.soc !== null ? Me(this.soc) : "transparent"};"
            ></div>
          </div>
          <span class="soc-pct">${this.soc !== null ? `${this.soc.toFixed(0)}%` : ""}</span>
        </div>
      </div>
    `;
  }
};
x.styles = W`
    :host {
      display: flex;
      align-items: stretch;
      justify-content: center;
    }

    .node {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 10px 12px 8px;
      border-radius: 14px;
      min-width: 76px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.15s ease, transform 0.1s ease;
    }
    .node:hover {
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16);
      transform: translateY(-1px);
    }
    .node:active {
      transform: translateY(0);
    }

    ha-icon {
      --mdc-icon-size: 26px;
    }

    .label {
      font-size: 0.65em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      opacity: 0.65;
      white-space: nowrap;
    }

    .power {
      font-size: 0.85em;
      font-weight: 700;
      white-space: nowrap;
      color: #1a1a2e;
    }

    /* Reserves the same vertical space whether or not SOC is present */
    .soc-wrap {
      width: 100%;
      margin-top: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      /* invisible placeholder keeps height consistent */
      visibility: hidden;
    }
    .soc-wrap.has-soc {
      visibility: visible;
    }

    .soc-bar-bg {
      width: 100%;
      height: 3px;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }

    .soc-bar {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s ease;
    }

    .soc-pct {
      font-size: 0.6em;
      opacity: 0.7;
      font-weight: 600;
    }
  `;
T([
  _()
], x.prototype, "type", 2);
T([
  _()
], x.prototype, "label", 2);
T([
  _()
], x.prototype, "colour", 2);
T([
  _({ type: Number })
], x.prototype, "power", 2);
T([
  _({ type: Number })
], x.prototype, "soc", 2);
T([
  _()
], x.prototype, "unit", 2);
T([
  _({ type: Number })
], x.prototype, "decimalPlaces", 2);
x = T([
  F("hec-energy-node")
], x);
function gt(e, t) {
  var o;
  if (!t) return null;
  const s = (o = e[t]) == null ? void 0 : o.state;
  if (!s || s === "unavailable" || s === "unknown") return null;
  const i = parseFloat(s);
  return isNaN(i) ? null : i;
}
function te(e, t, s) {
  const i = t.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = gt(s, t.power_combined);
  else {
    const l = !!t.power_import, c = !!t.power_export;
    if (!l && !c) return o;
    const p = l ? gt(s, t.power_import) : null, d = c ? gt(s, t.power_export) : null;
    if ((!l || p === null) && (!c || d === null)) return o;
    n = (p ?? 0) - (d ?? 0);
  }
  if (n === null) return o;
  if (Math.abs(n) <= i) return { power: n, magnitude: null, direction: "idle" };
  const r = Math.abs(n);
  let a;
  switch (e) {
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
var je = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, j = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ze(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && je(t, s, o), o;
};
const He = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Re = {
  solar: "#f9a825",
  grid: "#1e88e5",
  battery: "#43a047",
  home: "#e91e63",
  ev: "#00acc1"
}, Ie = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Le(e) {
  const t = Date.now(), s = t - 864e5, i = Array(24).fill(null);
  if (!e.length) return i;
  for (let o = 0; o < 24; o++) {
    const n = s + o * 36e5, r = n + 36e5;
    let a = 0, l = 0;
    for (let c = 0; c < e.length; c++) {
      const p = new Date(e[c].last_changed).getTime(), d = c + 1 < e.length ? new Date(e[c + 1].last_changed).getTime() : t, y = Math.max(p, n), m = Math.min(d, r);
      if (m <= y) continue;
      const h = parseFloat(e[c].state);
      if (isNaN(h)) continue;
      const g = m - y;
      a += Math.abs(h) * g, l += g;
    }
    l > 0 && (i[o] = a / l);
  }
  return i;
}
function ee(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function Wt(e, t) {
  var o;
  const s = ee(e, t);
  return s === null ? null : ((o = e[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? s / 1e3 : s;
}
function Ft(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function Be(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function Vt(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function We(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function Fe(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
let A = class extends w {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var s, i;
    const e = (i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[this.nodeType], t = (e == null ? void 0 : e.power_combined) ?? (e == null ? void 0 : e.power_import) ?? (e == null ? void 0 : e.power_export);
    if (!(!t || !this.hass)) {
      this._loading = !0, this._hourly = [];
      try {
        const o = /* @__PURE__ */ new Date(), r = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, a = await this.hass.callApi("GET", r);
        this._hourly = Le((a == null ? void 0 : a[0]) ?? []);
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
  _header(e, t, s) {
    return f`
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
    var o, n, r, a, l;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, s = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", i = ((l = Ie[this.nodeType]) == null ? void 0 : l[e.direction]) ?? "";
    return f`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Xt(e.power, s, t)}</div>
        ${i ? f`<div class="power-sub">${i}</div>` : u}
      </div>
    `;
  }
  _sectionSoc(e) {
    if (e === null) return u;
    const t = Fe(e);
    return f`
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
    var r, a, l;
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, s = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return e.daily_usage && n.push([i, Ft(Wt(t, e.daily_usage), s)]), e.daily_export && n.push([o, Ft(Wt(t, e.daily_export), s)]), n.length ? f`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([c, p]) => f`
          <div class="kv">
            <span class="kv-k">${c}</span>
            <span class="kv-v">${p}</span>
          </div>
        `)}
      </div>
    ` : u;
  }
  _sectionOctopus(e) {
    var h;
    const t = ((h = this.hass) == null ? void 0 : h.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.cost_entity ? t[e.cost_entity] : null, o = e.slots_entity ? t[e.slots_entity] : null, n = s == null ? void 0 : s.state, r = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", a = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", c = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], p = Date.now(), d = c.filter((g) => new Date(g.end ?? g.end_time ?? 0).getTime() > p).slice(0, 6), y = n && n !== "unavailable" && n !== "unknown", m = a && a !== "unavailable" && a !== "unknown";
    return !y && !m && !d.length ? u : f`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${y ? f`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
          </div>
        ` : u}

        ${m ? f`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(a).toFixed(2)}</span>
          </div>
        ` : u}

        ${d.length ? f`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((g) => {
      const b = g.start ?? g.start_time ?? "", $ = g.end ?? g.end_time ?? "", V = g.value_inc_vat ?? g.rate_inc_vat ?? g.value ?? 0, K = We(V);
      return f`
              <div class="slot">
                <span class="slot-dot" style="background:${K};"></span>
                <span class="slot-time">${Vt(b)}–${Vt($)}</span>
                <span class="slot-rate" style="color:${K};">${(+V).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : u}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((n) => n !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => Be(new Date(i.getTime() - n * 36e5));
    return this._loading ? f`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : f`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? f`<div class="chart-msg">No data</div>` : f`
              ${Z`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return Z``;
      const a = Math.max(2, n / s * 48);
      return Z`
                      <rect
                        x="${r * 10 + 0.5}" y="${52 - a}"
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
    var l, c, p;
    if (!this.open || !this.nodeType) return u;
    const e = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, s = e.colour || (Re[this.nodeType] ?? "#9e9e9e"), i = He[this.nodeType] ?? "mdi:lightning-bolt", o = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = te(this.nodeType, e, t), r = ["battery", "ev"].includes(this.nodeType) && !!e.soc, a = r ? ee(t, e.soc) : null;
    return f`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, i, o)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(a) : u}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : u}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
A.styles = W`
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
    .section:last-child { border-bottom: none; padding-bottom: 20px; }

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
  _({ attribute: !1 })
], A.prototype, "hass", 2);
j([
  _({ attribute: !1 })
], A.prototype, "config", 2);
j([
  _()
], A.prototype, "nodeType", 2);
j([
  _({ type: Boolean })
], A.prototype, "open", 2);
j([
  U()
], A.prototype, "_hourly", 2);
j([
  U()
], A.prototype, "_loading", 2);
A = j([
  F("hec-node-detail")
], A);
var Ve = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, dt = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ke(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ve(t, s, o), o;
};
function Ye(e, t) {
  return !t || !e ? "0.7s" : `${(2 - Math.min(e / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const qe = {
  solar: "#ffc107",
  grid: "#42a5f5",
  battery: "#66bb6a",
  ev: "#26c6da"
}, Ge = {
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
  _configured(e) {
    var t;
    return e in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(e) {
    var s, i, o;
    const t = ((i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) ?? {};
    return te(e, t, ((o = this.hass) == null ? void 0 : o.states) ?? {});
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
    var o, n, r, a;
    const t = (r = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[e]) == null ? void 0 : r.soc;
    if (!t || !this.hass) return null;
    const s = (a = this.hass.states[t]) == null ? void 0 : a.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const i = parseFloat(s);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var s, i, o, n;
    const e = ((i = (s = this.config) == null ? void 0 : s.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.animation) !== !1;
    return Z`
      ${["solar", "grid", "battery", "ev"].filter((r) => this._isVisible(r)).map((r) => {
      const a = this._flowInfo(r), [l, c, p, d] = Ge[r], y = a.direction === "idle", m = a.direction === "from-home", h = Ye(a.magnitude, e && !y), g = [
        "flow-line",
        m ? "reverse" : "",
        y ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Z`
            <line
              x1="${l}" y1="${c}" x2="${p}" y2="${d}"
              stroke="${qe[r]}"
              class="${g}"
              style="--flow-dur:${h}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(e, t, s = !1) {
    var a, l, c;
    const i = e === "home" ? !0 : this._isVisible(e), o = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[e]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, r = this._flowInfo(e);
    return f`
      <hec-energy-node
        class="${t}${i ? "" : " hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .colour=${o.colour ?? ""}
        .power=${r.power}
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
      (t) => !yt.includes(t)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: B3→A3→C3→B4→A4→C4…  (col order: 2,1,3 per row)
   */
  _customSlot(e) {
    return [[2, 1, 3][e % 3], 3 + Math.floor(e / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(e, t, s) {
    var a, l, c;
    const i = this._isVisible(e), o = ((l = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : l[e]) ?? {}, n = ((c = this.config) == null ? void 0 : c.display) ?? {}, r = this._flowInfo(e);
    return f`
      <hec-energy-node
        style="grid-column:${t}; grid-row:${s}"
        class="${i ? "" : "hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .colour=${o.colour ?? ""}
        .power=${r.power}
        .soc=${null}
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
    if (!this.config) return u;
    const e = this._customTypes(), t = 2 + Math.ceil(e.length / 3);
    return f`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${t}" preserveAspectRatio="none">
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
        ${e.map((s, i) => {
      const [o, n] = this._customSlot(i);
      return this._customNode(s, o, n);
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
  _({ attribute: !1 })
], B.prototype, "hass", 2);
dt([
  _({ attribute: !1 })
], B.prototype, "config", 2);
dt([
  U()
], B.prototype, "_dialogType", 2);
B = dt([
  F("hec-flow-layout")
], B);
var Ze = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, Et = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Je(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ze(t, s, o), o;
};
let tt = class extends w {
  setConfig(e) {
    this.config = e;
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? f`
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
tt.styles = W`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Et([
  _({ attribute: !1 })
], tt.prototype, "hass", 2);
Et([
  _({ attribute: !1 })
], tt.prototype, "config", 2);
tt = Et([
  F("home-energy-card")
], tt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  tt as HomeEnergyCard
};
