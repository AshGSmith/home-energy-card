/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, gt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let Yt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Pt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Pt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (s) => new Yt(typeof s == "string" ? s : s + "", void 0, yt), R = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new Yt(e, s, yt);
}, ie = (s, t) => {
  if (gt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = ot.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, Ot = gt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return se(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ne, defineProperty: oe, getOwnPropertyDescriptor: re, getOwnPropertyNames: ae, getOwnPropertySymbols: le, getPrototypeOf: ce } = Object, S = globalThis, Nt = S.trustedTypes, de = Nt ? Nt.emptyScript : "", dt = S.reactiveElementPolyfillSupport, Y = (s, t) => s, rt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? de : null;
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
} }, _t = (s, t) => !ne(s, t), Dt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Dt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && oe(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = re(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n == null ? void 0 : n.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const t = ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const e = this.properties, i = [...ae(e), ...le(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(Ot(n));
    } else t !== void 0 && e.push(Ot(t));
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
    return ie(t, this.constructor.elementStyles), t;
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
    var o;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : rt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = n;
      const c = l.fromAttribute(e, a.type);
      this[n] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? _t)(o, e) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: a } = r, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[Y("elementProperties")] = /* @__PURE__ */ new Map(), U[Y("finalized")] = /* @__PURE__ */ new Map(), dt == null || dt({ ReactiveElement: U }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, zt = (s) => s, at = q.trustedTypes, Ut = at ? at.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, qt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + A, he = `<${Gt}>`, D = document, Z = () => D.createComment(""), J = (s) => s === null || typeof s != "object" && typeof s != "function", mt = Array.isArray, pe = (s) => mt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ht = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Mt = /-->/g, jt = />/g, C = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Lt = /"/g, Zt = /^(?:script|style|textarea|title)$/i, Jt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = Jt(1), G = Jt(2), j = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), O = D.createTreeWalker(D, 129);
function Qt(s, t) {
  if (!mt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(t) : t;
}
const ue = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = K;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let c, h, d = -1, y = 0;
    for (; y < l.length && (r.lastIndex = y, h = r.exec(l), h !== null); ) y = r.lastIndex, r === K ? h[1] === "!--" ? r = Mt : h[1] !== void 0 ? r = jt : h[2] !== void 0 ? (Zt.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = C) : h[3] !== void 0 && (r = C) : r === C ? h[0] === ">" ? (r = n ?? K, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? C : h[3] === '"' ? Lt : Ht) : r === Lt || r === Ht ? r = C : r === Mt || r === jt ? r = K : (r = C, n = void 0);
    const _ = r === C && s[a + 1].startsWith("/>") ? " " : "";
    o += r === K ? l + he : d >= 0 ? (i.push(c), l.slice(0, d) + qt + l.slice(d) + A + _) : l + A + (d === -2 ? a : _);
  }
  return [Qt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Q {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = ue(t, e);
    if (this.el = Q.createElement(c, i), O.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = O.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(qt)) {
          const y = h[r++], _ = n.getAttribute(d).split(A), p = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: o, name: p[2], strings: _, ctor: p[1] === "." ? ge : p[1] === "?" ? ye : p[1] === "@" ? _e : lt }), n.removeAttribute(d);
        } else d.startsWith(A) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Zt.test(n.tagName)) {
          const d = n.textContent.split(A), y = d.length - 1;
          if (y > 0) {
            n.textContent = at ? at.emptyScript : "";
            for (let _ = 0; _ < y; _++) n.append(d[_], Z()), O.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[y], Z());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Gt) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(A, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += A.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function H(s, t, e = s, i) {
  var r, a;
  if (t === j) return t;
  let n = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = J(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = H(s, n._$AS(s, t.values), n, i)), t;
}
class fe {
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
    const { el: { content: e }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    O.currentNode = n;
    let o = O.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new et(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new me(o, this, t)), this._$AV.push(c), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = O.nextNode(), r++);
    }
    return O.currentNode = D, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class et {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = H(this, t, e), J(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Q.createElement(Qt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(e);
    else {
      const r = new fe(n, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Rt.get(t.strings);
    return e === void 0 && Rt.set(t.strings, e = new Q(t)), e;
  }
  k(t) {
    mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new et(this.O(Z()), this.O(Z()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const n = zt(t).nextSibling;
      zt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = H(this, t, e, 0), r = !J(t) || t !== this._$AH && t !== j, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = H(this, a[i + l], e, l), c === j && (c = this._$AH[l]), r || (r = !J(c) || c !== this._$AH[l]), c === f ? t = f : t !== f && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ge extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ye extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class _e extends lt {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? f) === j) return;
    const i = this._$AH, n = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class me {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const pt = q.litHtmlPolyfillSupport;
pt == null || pt(Q, et), (q.litHtmlVersions ?? (q.litHtmlVersions = [])).push("3.3.2");
const ve = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = n = new et(t.insertBefore(Z(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class w extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ve(e, this.renderRoot, this.renderOptions);
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
}
var Kt;
w._$litElement$ = !0, w.finalized = !0, (Kt = N.litElementHydrateSupport) == null || Kt.call(N, { LitElement: w });
const ut = N.litElementPolyfillSupport;
ut == null || ut({ LitElement: w });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: _t }, be = (s = $e, t, e) => {
  const { kind: i, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
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
function m(s) {
  return (t, e) => typeof e == "object" ? be(s, t, e) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
const It = ["grid", "solar", "battery", "home", "ev"], vt = (s) => s.attributes.device_class ?? "", $t = (s) => s.attributes.unit_of_measurement ?? "", bt = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function P(...s) {
  return (t, e) => {
    let i = 0;
    vt(e) === "power" && (i += 4), ["W", "kW"].includes($t(e)) && (i += 2);
    const n = bt(t, e);
    for (const o of s) n.includes(o) && (i += 1);
    return i;
  };
}
function M(...s) {
  return (t, e) => {
    let i = 0;
    vt(e) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes($t(e)) && (i += 2);
    const n = bt(t, e);
    for (const o of s) n.includes(o) && (i += 1);
    return i;
  };
}
function Wt(...s) {
  return (t, e) => {
    let i = 0;
    vt(e) === "battery" && (i += 4), $t(e) === "%" && (i += 2);
    const n = bt(t, e);
    for (const o of s) n.includes(o) && (i += 1);
    return i;
  };
}
function st(s, t = []) {
  return (e, i) => {
    const n = e.toLowerCase();
    if (t.some((r) => n.includes(r))) return 0;
    let o = 0;
    for (const r of s) n.includes(r) && (o += 4);
    return o;
  };
}
function v(s, t, e, i) {
  let n, o = 0;
  for (const r of s) {
    if (i.has(r)) continue;
    const a = t[r];
    if (!a) continue;
    const l = e(r, a);
    l > o && (o = l, n = r);
  }
  return n && i.add(n), n;
}
function we(s, t, e) {
  const i = Object.values(t).some(
    ($) => $.platform === "octopus_energy" && !$.disabled_by
  ), n = Object.keys(s).filter(($) => $.includes("octopus_energy"));
  if (!i && n.length === 0) return null;
  const o = n.filter(
    ($) => $.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], a = {}, l = {}, c = v(
    o,
    s,
    st(["_current_rate"], ["export", "accumulative"]),
    e
  );
  c && (a.rate_entity = c, r.push("rate"));
  const h = v(
    o,
    s,
    st(["_current_accumulative_cost"]),
    e
  );
  h && (a.cost_entity = h, r.push("cost"));
  const d = v(
    o,
    s,
    st(["_current_day_rates"]),
    e
  );
  d && (a.slots_entity = d, r.push("slots"));
  const y = v(
    n.filter(($) => $.startsWith("binary_sensor.")),
    s,
    st(["_intelligent_dispatching"]),
    e
  );
  y && (a.dispatches_entity = y, r.push("dispatching")), Object.keys(a).length && (l.octopus = a);
  const _ = v(
    o,
    s,
    P("import", "demand", "current"),
    e
  );
  _ && (l.power_import = _, r.push("import power"));
  const p = v(
    o,
    s,
    P("export", "demand", "current"),
    e
  );
  p && (l.power_export = p, r.push("export power"));
  const g = v(
    o,
    s,
    M("import", "accumulative", "consumption"),
    e
  );
  g && (l.daily_usage = g, r.push("daily import"));
  const b = v(
    o,
    s,
    M("export", "accumulative"),
    e
  );
  return b && (l.daily_export = b, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: r };
}
function xe(s, t, e) {
  const i = Object.values(t).filter(
    (p) => p.platform === "tesla_custom" && !p.disabled_by
  ), n = Object.keys(s).some(
    (p) => p.includes("powerwall") || p.includes("tesla")
  );
  if (i.length === 0 && !n) return null;
  const o = i.length > 0 ? i.map((p) => p.entity_id) : Object.keys(s).filter((p) => p.includes("powerwall") || p.includes("tesla")), r = o.filter((p) => p.includes("powerwall")), a = o.filter((p) => !p.includes("powerwall")), l = ["Tesla"], c = {};
  if (r.length > 0) {
    const p = {}, g = v(
      r,
      s,
      Wt("battery", "soc", "charge", "percent"),
      e
    );
    g && (p.soc = g);
    const b = v(
      r,
      s,
      P("battery", "power", "charge", "discharge"),
      e
    );
    b && (p.power_combined = b);
    const $ = v(
      r,
      s,
      M("battery", "today", "daily", "charged"),
      e
    );
    $ && (p.daily_usage = $), Object.keys(p).length && (c.battery = p, l.push("Powerwall"));
  }
  const h = v(
    o,
    s,
    P("solar"),
    e
  );
  if (h) {
    const p = { power_combined: h }, g = v(
      o,
      s,
      M("solar"),
      e
    );
    g && (p.daily_usage = g), c.solar = p, l.push("solar");
  }
  const d = v(
    o,
    s,
    P("load", "home", "house"),
    e
  );
  if (d) {
    const p = { power_combined: d }, g = v(
      o,
      s,
      M("load", "home", "house"),
      e
    );
    g && (p.daily_usage = g), c.home = p, l.push("home load");
  }
  const y = v(
    o,
    s,
    P("grid"),
    e
  );
  y && (c.grid = { power_combined: y }, l.push("grid"));
  const _ = v(
    a,
    s,
    Wt("battery", "battery_level", "soc", "charge"),
    e
  );
  if (_) {
    const p = { soc: _ }, g = v(
      a,
      s,
      P("charg", "power"),
      e
    );
    g && (p.power_combined = g);
    const b = v(
      a,
      s,
      M("charg", "energy"),
      e
    );
    b && (p.daily_usage = b), c.ev = p, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: c, summary: l };
}
function Ee(s) {
  var l, c;
  const t = s, e = t.states ?? {}, i = t.entities ?? {}, n = /* @__PURE__ */ new Set(), o = xe(e, i, n), r = we(e, i, n), a = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (o && (a.integration_type = "tesla", Object.assign(a.entity_types, o.entity_types), a.summary.push(...o.summary ?? [])), r) {
    if (a.integration_type !== "tesla" && (a.integration_type = "octopus"), (l = r.entity_types) != null && l.grid) {
      const h = r.entity_types.grid;
      a.entity_types.grid = {
        ...a.entity_types.grid,
        ...h,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: h.power_import || (c = a.entity_types.grid) == null ? void 0 : c.power_combined
      };
    }
    r.tariff_entity && (a.tariff_entity = r.tariff_entity), a.summary.push(...r.summary ?? []);
  }
  return a;
}
function Ae(s, t, e = !1) {
  const i = { ...s, integration_type: t.integration_type };
  t.tariff_entity && (e || !s.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const n = s.entity_types ?? {}, o = { ...n };
  for (const [r, a] of Object.entries(t.entity_types)) {
    const l = n[r] ?? {}, c = { ...l };
    for (const [h, d] of Object.entries(a))
      d !== void 0 && (e || !l[h]) && (c[h] = d);
    o[r] = c;
  }
  return i.entity_types = o, i;
}
var Se = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, B = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Te(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && Se(t, e, n), n;
};
let T = class extends w {
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
    const s = Ee(this.hass);
    if (s.integration_type === "manual" && s.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.", this._detectIsError = !0;
      return;
    }
    const t = Ae(
      this.config,
      s,
      /* overwrite= */
      !1
    );
    this._dispatch(t), this._detectIsError = !1, this._detectStatus = `Detected: ${s.summary.join(", ")}`;
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
  _set(s, t) {
    this._dispatch({ ...this.config, [s]: t });
  }
  _setEntityType(s, t, e) {
    var n;
    const i = { ...((n = this.config) == null ? void 0 : n.entity_types) ?? {} };
    i[s] = e === void 0 || e === "" || e === null ? (({ [t]: o, ...r }) => r)(i[s] ?? {}) : { ...i[s], [t]: e }, this._set("entity_types", i);
  }
  _setOctopus(s, t, e) {
    var a;
    const i = { ...((a = this.config) == null ? void 0 : a.entity_types) ?? {} }, n = i[s] ?? {}, o = { ...n.octopus, [t]: e || void 0 }, r = Object.values(o).some(Boolean);
    i[s] = r ? { ...n, octopus: o } : (({ octopus: l, ...c }) => c)(n), this._set("entity_types", i);
  }
  _renderEntityTypeFields(s) {
    var e, i, n, o, r;
    const t = ((i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[s]) ?? {};
    return u`
      <div class="type-fields">
        <ha-entity-picker
          label="Power import"
          .hass=${this.hass}
          .value=${t.power_import ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "power_import", a.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Power export"
          .hass=${this.hass}
          .value=${t.power_export ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "power_export", a.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Power combined"
          .hass=${this.hass}
          .value=${t.power_combined ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "power_combined", a.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Daily usage"
          .hass=${this.hass}
          .value=${t.daily_usage ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "daily_usage", a.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Daily export"
          .hass=${this.hass}
          .value=${t.daily_export ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "daily_export", a.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="State of charge"
          .hass=${this.hass}
          .value=${t.soc ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "soc", a.detail.value)}
        ></ha-entity-picker>
        <ha-textfield
          label="Label"
          .value=${t.label ?? ""}
          @change=${(a) => this._setEntityType(
      s,
      "label",
      a.target.value
    )}
        ></ha-textfield>
        <div class="color-row">
          <span>Colour</span>
          <input
            type="color"
            .value=${t.colour ?? "#4caf50"}
            @change=${(a) => this._setEntityType(
      s,
      "colour",
      a.target.value
    )}
          />
        </div>
        <div class="switch-row">
          <span>Show when zero</span>
          <ha-switch
            .checked=${t.show_zero ?? !1}
            @change=${(a) => this._setEntityType(
      s,
      "show_zero",
      a.target.checked
    )}
          ></ha-switch>
        </div>
        <ha-textfield
          label="Zero tolerance"
          type="number"
          min="0"
          .value=${String(t.zero_tolerance ?? 0)}
          @change=${(a) => this._setEntityType(
      s,
      "zero_tolerance",
      Number(a.target.value)
    )}
        ></ha-textfield>

        ${s === "grid" ? u`
          <div class="subsection-label">Octopus Energy</div>
          <ha-entity-picker
            label="Rate entity"
            .hass=${this.hass}
            .value=${((n = t.octopus) == null ? void 0 : n.rate_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(s, "rate_entity", a.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Cost today entity"
            .hass=${this.hass}
            .value=${((o = t.octopus) == null ? void 0 : o.cost_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(s, "cost_entity", a.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Slots / rates entity"
            .hass=${this.hass}
            .value=${((r = t.octopus) == null ? void 0 : r.slots_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(s, "slots_entity", a.detail.value)}
          ></ha-entity-picker>
        ` : f}
      </div>
    `;
  }
  _capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  _addCustomType() {
    var e;
    const s = this._newTypeName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!s) return;
    const t = {
      ...((e = this.config) == null ? void 0 : e.entity_types) ?? {},
      [s]: {}
    };
    this._set("entity_types", t), this._newTypeName = "";
  }
  _removeCustomType(s) {
    var e;
    const t = { ...((e = this.config) == null ? void 0 : e.entity_types) ?? {} };
    delete t[s], this._set("entity_types", t);
  }
  _renderEntityTypesSection() {
    var t;
    const s = Object.keys(
      ((t = this.config) == null ? void 0 : t.entity_types) ?? {}
    ).filter(
      (e) => !It.includes(e)
    );
    return u`
      <ha-expansion-panel header="Entity Types" outlined>
        ${It.map(
      (e) => u`
            <ha-expansion-panel
              class="inner-panel"
              .header=${this._capitalize(e)}
              outlined
            >
              ${this._renderEntityTypeFields(e)}
            </ha-expansion-panel>
          `
    )}
        ${s.map(
      (e) => u`
            <ha-expansion-panel
              class="inner-panel"
              .header=${this._capitalize(e)}
              outlined
            >
              ${this._renderEntityTypeFields(e)}
              <div class="remove-type">
                <button
                  class="text-btn"
                  @click=${() => this._removeCustomType(e)}
                >
                  Remove type
                </button>
              </div>
            </ha-expansion-panel>
          `
    )}
        <div class="add-type">
          <ha-textfield
            label="New type name"
            .value=${this._newTypeName}
            @input=${(e) => this._newTypeName = e.target.value}
            @keydown=${(e) => e.key === "Enter" && this._addCustomType()}
          ></ha-textfield>
          <mwc-button @click=${this._addCustomType}>Add</mwc-button>
        </div>
      </ha-expansion-panel>
    `;
  }
  _renderLiveDataSection() {
    var t;
    const s = ((t = this.config) == null ? void 0 : t.live_data) ?? {};
    return u`
      <ha-expansion-panel header="Live Data" outlined>
        <div class="section-content">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(s.refresh_interval ?? 5)}
            @change=${(e) => this._set("live_data", {
      ...s,
      refresh_interval: Number(e.target.value)
    })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${s.show_live_badge ?? !0}
              @change=${(e) => this._set("live_data", {
      ...s,
      show_live_badge: e.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  _renderSystemSection() {
    var t;
    const s = ((t = this.config) == null ? void 0 : t.system) ?? {};
    return u`
      <ha-expansion-panel header="System Settings" outlined>
        <div class="section-content">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(s.energy_date_reset ?? 0)}
            @change=${(e) => this._set("system", {
      ...s,
      energy_date_reset: Number(
        e.target.value
      )
    })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${s.time_format ?? "24h"}
            @value-changed=${(e) => this._set("system", {
      ...s,
      time_format: e.detail.value
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
    const s = ((t = this.config) == null ? void 0 : t.display) ?? {};
    return u`
      <ha-expansion-panel header="Display" outlined>
        <div class="section-content">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(s.decimal_places ?? 1)}
            @change=${(e) => this._set("display", {
      ...s,
      decimal_places: Number(e.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${s.unit ?? "auto"}
            @value-changed=${(e) => this._set("display", {
      ...s,
      unit: e.detail.value
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
              @change=${(e) => this._set("display", {
      ...s,
      animation: e.target.checked
    })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${s.dynamic_animation_speed ?? !1}
              @change=${(e) => this._set("display", {
      ...s,
      dynamic_animation_speed: e.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return this.config ? u`
      <div class="detect-row">
        <mwc-button outlined @click=${this._runAutoDetect}>Auto-detect</mwc-button>
        ${this._detectStatus ? u`<span class="detect-status ${this._detectIsError ? "error" : ""}">${this._detectStatus}</span>` : u`<span class="detect-status">Scan entities to pre-fill fields.</span>`}
      </div>

      <div class="top-fields">
        <ha-textfield
          label="Device"
          .value=${this.config.device ?? ""}
          @change=${(s) => this._set("device", s.target.value || void 0)}
        ></ha-textfield>
        <ha-textfield
          label="Title"
          .value=${this.config.title ?? ""}
          @change=${(s) => this._set("title", s.target.value || void 0)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show header</span>
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

      ${this._renderEntityTypesSection()}
      ${this._renderLiveDataSection()}
      ${this._renderSystemSection()}
      ${this._renderDisplaySection()}
    ` : f;
  }
};
T.styles = R`
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

    .type-fields {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0 8px;
    }

    .color-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    input[type="color"] {
      width: 44px;
      height: 28px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 2px 3px;
      cursor: pointer;
      background: none;
    }

    .add-type {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .add-type ha-textfield {
      flex: 1;
    }

    .remove-type {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }

    .subsection-label {
      font-size: 0.75em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      opacity: 0.5;
      margin: 12px 0 4px;
    }

    button.text-btn {
      background: none;
      border: none;
      color: var(--error-color, #db4437);
      font-size: 0.85em;
      cursor: pointer;
      padding: 0;
    }

    ha-expansion-panel {
      --expansion-panel-summary-padding: 0 16px;
      --expansion-panel-content-padding: 0 16px;
    }

    .inner-panel {
      margin-bottom: 4px;
    }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 0;
    }

    .detect-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
    }

    .detect-status {
      flex: 1;
      font-size: 0.8em;
      opacity: 0.7;
    }

    .detect-status.error {
      color: var(--error-color, #db4437);
      opacity: 1;
    }
  `;
B([
  m({ attribute: !1 })
], T.prototype, "hass", 2);
B([
  m({ attribute: !1 })
], T.prototype, "config", 2);
B([
  W()
], T.prototype, "_newTypeName", 2);
B([
  W()
], T.prototype, "_detectStatus", 2);
B([
  W()
], T.prototype, "_detectIsError", 2);
T = B([
  I("home-energy-card-editor")
], T);
var ke = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, wt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ce(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && ke(t, e, n), n;
};
function it(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : e.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function nt(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Pe(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let X = class extends w {
  render() {
    var g, b, $, F, V, Et, At, St, Tt, kt, Ct;
    if (!this.config) return f;
    const s = ((g = this.hass) == null ? void 0 : g.states) ?? {}, t = this.config.entity_types ?? {}, e = ((b = this.config.display) == null ? void 0 : b.decimal_places) ?? 1, i = this.config.tariff_entity ? ($ = s[this.config.tariff_entity]) == null ? void 0 : $.state : null, n = i && i !== "unavailable" && i !== "unknown" ? Pe(i) : null, o = it(s, (F = t.solar) == null ? void 0 : F.daily_usage), r = it(s, (V = t.home) == null ? void 0 : V.daily_usage), a = it(s, (Et = t.grid) == null ? void 0 : Et.daily_usage), l = it(s, (At = t.grid) == null ? void 0 : At.daily_export), c = !!((St = t.solar) != null && St.daily_usage), h = !!((Tt = t.home) != null && Tt.daily_usage), d = !!((kt = t.grid) != null && kt.daily_usage), y = !!((Ct = t.grid) != null && Ct.daily_export), _ = d || y, p = c || h || _;
    return u`
      <div class="header">

        <div class="title-row">
          <span class="title">${this.config.title ?? "Home Energy"}</span>
          ${n ? u`
                <span
                  class="tariff"
                  style="background:${n.bg};color:${n.fg};"
                >${n.label}</span>
              ` : f}
        </div>

        ${p ? u`
          <div class="stats-row">

            ${c ? u`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${nt(o, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${h ? u`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Usage</span>
                <span class="stat-val">${nt(r, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${_ ? u`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? u`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${nt(a, e)}</span>
                    </div>
                  ` : f}
                  ${y ? u`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${nt(l, e)}</span>
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
X.styles = R`
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
wt([
  m({ attribute: !1 })
], X.prototype, "hass", 2);
wt([
  m({ attribute: !1 })
], X.prototype, "config", 2);
X = wt([
  I("hec-card-header")
], X);
var Oe = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, k = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ne(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && Oe(t, e, n), n;
};
const De = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e0f7fa", gradEnd: "#80deea", accent: "#00acc1", icon: "mdi:car-electric" }
}, ze = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
};
function Ue(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
function Xt(s, t, e) {
  if (s === null) return "—";
  const i = Math.abs(s);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
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
    const s = De[this.type] ?? ze, t = this.colour || s.accent;
    return u`
      <div
        class="node"
        style="background: linear-gradient(150deg, ${s.gradStart} 0%, ${s.gradEnd} 100%); color: ${t};"
        @click=${this._handleClick}
      >
        <ha-icon .icon=${s.icon}></ha-icon>
        <span class="label" style="color: ${t};">${this.label || this.type}</span>
        <span class="power" style="color: var(--primary-text-color);">
          ${Xt(this.power, this.unit, this.decimalPlaces)}
        </span>
        ${this.soc !== null ? u`
              <div class="soc-wrap">
                <div class="soc-bar-bg">
                  <div
                    class="soc-bar"
                    style="width: ${Math.max(0, Math.min(100, this.soc))}%; background: ${Ue(this.soc)};"
                  ></div>
                </div>
                <span class="soc-pct">${this.soc.toFixed(0)}%</span>
              </div>
            ` : f}
      </div>
    `;
  }
};
x.styles = R`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .node {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
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
    }

    .soc-wrap {
      width: 100%;
      margin-top: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
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
k([
  m()
], x.prototype, "type", 2);
k([
  m()
], x.prototype, "label", 2);
k([
  m()
], x.prototype, "colour", 2);
k([
  m({ type: Number })
], x.prototype, "power", 2);
k([
  m({ type: Number })
], x.prototype, "soc", 2);
k([
  m()
], x.prototype, "unit", 2);
k([
  m({ type: Number })
], x.prototype, "decimalPlaces", 2);
x = k([
  I("hec-energy-node")
], x);
function ft(s, t) {
  var n;
  if (!t) return null;
  const e = (n = s[t]) == null ? void 0 : n.state;
  if (!e || e === "unavailable" || e === "unknown") return null;
  const i = parseFloat(e);
  return isNaN(i) ? null : i;
}
function te(s, t, e) {
  const i = t.zero_tolerance ?? 0, n = { power: null, magnitude: null, direction: "idle" };
  let o;
  if (t.power_combined)
    o = ft(e, t.power_combined);
  else {
    const l = !!t.power_import, c = !!t.power_export;
    if (!l && !c) return n;
    const h = l ? ft(e, t.power_import) : null, d = c ? ft(e, t.power_export) : null;
    if ((!l || h === null) && (!c || d === null)) return n;
    o = (h ?? 0) - (d ?? 0);
  }
  if (o === null) return n;
  if (Math.abs(o) <= i) return { power: o, magnitude: null, direction: "idle" };
  const r = Math.abs(o);
  let a;
  switch (s) {
    case "solar":
      a = "to-home";
      break;
    case "grid":
      a = o > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      a = o > 0 ? "from-home" : "to-home";
      break;
    default:
      a = o > 0 ? "from-home" : "to-home";
  }
  return { power: o, magnitude: r, direction: a };
}
var Me = Object.defineProperty, je = Object.getOwnPropertyDescriptor, z = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? je(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && Me(t, e, n), n;
};
const He = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Le = {
  solar: "#f9a825",
  grid: "#1e88e5",
  battery: "#43a047",
  home: "#e91e63",
  ev: "#00acc1"
}, Re = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Ie(s) {
  const t = Date.now(), e = t - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let n = 0; n < 24; n++) {
    const o = e + n * 36e5, r = o + 36e5;
    let a = 0, l = 0;
    for (let c = 0; c < s.length; c++) {
      const h = new Date(s[c].last_changed).getTime(), d = c + 1 < s.length ? new Date(s[c + 1].last_changed).getTime() : t, y = Math.max(h, o), _ = Math.min(d, r);
      if (_ <= y) continue;
      const p = parseFloat(s[c].state);
      if (isNaN(p)) continue;
      const g = _ - y;
      a += Math.abs(p) * g, l += g;
    }
    l > 0 && (i[n] = a / l);
  }
  return i;
}
function ee(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : i;
}
function Bt(s, t) {
  var n;
  const e = ee(s, t);
  return e === null ? null : ((n = s[t]) == null ? void 0 : n.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function Ft(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function We(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Vt(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Be(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Fe(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let E = class extends w {
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
        const n = /* @__PURE__ */ new Date(), r = `history/period/${new Date(n.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${n.toISOString()}`, a = await this.hass.callApi("GET", r);
        this._hourly = Ie((a == null ? void 0 : a[0]) ?? []);
      } catch (n) {
        console.warn("[hec-node-detail] history fetch failed", n), this._hourly = [];
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
    var n, o, r, a, l;
    const t = ((o = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : o.decimal_places) ?? 1, e = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", i = ((l = Re[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return u`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Xt(s.power, e, t)}</div>
        ${i ? u`<div class="power-sub">${i}</div>` : f}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return f;
    const t = Fe(s);
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
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, e = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", n = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", o = [];
    return s.daily_usage && o.push([i, Ft(Bt(t, s.daily_usage), e)]), s.daily_export && o.push([n, Ft(Bt(t, s.daily_export), e)]), o.length ? u`
      <div class="section">
        <div class="s-title">Today</div>
        ${o.map(([c, h]) => u`
          <div class="kv">
            <span class="kv-k">${c}</span>
            <span class="kv-v">${h}</span>
          </div>
        `)}
      </div>
    ` : f;
  }
  _sectionOctopus(s) {
    var p;
    const t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, i = s.cost_entity ? t[s.cost_entity] : null, n = s.slots_entity ? t[s.slots_entity] : null, o = e == null ? void 0 : e.state, r = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", a = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", c = (n == null ? void 0 : n.attributes.rates) ?? (n == null ? void 0 : n.attributes.upcoming_interval_rates) ?? (n == null ? void 0 : n.attributes.today_rates) ?? [], h = Date.now(), d = c.filter((g) => new Date(g.end ?? g.end_time ?? 0).getTime() > h).slice(0, 6), y = o && o !== "unavailable" && o !== "unknown", _ = a && a !== "unavailable" && a !== "unknown";
    return !y && !_ && !d.length ? f : u`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${y ? u`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(o).toFixed(2)} ${r}</span>
          </div>
        ` : f}

        ${_ ? u`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(a).toFixed(2)}</span>
          </div>
        ` : f}

        ${d.length ? u`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((g) => {
      const b = g.start ?? g.start_time ?? "", $ = g.end ?? g.end_time ?? "", F = g.value_inc_vat ?? g.rate_inc_vat ?? g.value ?? 0, V = Be(F);
      return u`
              <div class="slot">
                <span class="slot-dot" style="background:${V};"></span>
                <span class="slot-time">${Vt(b)}–${Vt($)}</span>
                <span class="slot-rate" style="color:${V};">${(+F).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : f}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((o) => o !== null), e = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), n = (o) => We(new Date(i.getTime() - o * 36e5));
    return this._loading ? u`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : u`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? u`<div class="chart-msg">No data</div>` : u`
              ${G`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((o, r) => {
      if (o === null || o <= 0) return G``;
      const a = Math.max(2, o / e * 48);
      return G`
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
    var l, c, h;
    if (!this.open || !this.nodeType) return f;
    const s = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[this.nodeType]) ?? {}, t = ((h = this.hass) == null ? void 0 : h.states) ?? {}, e = s.colour || (Le[this.nodeType] ?? "#9e9e9e"), i = He[this.nodeType] ?? "mdi:lightning-bolt", n = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), o = te(this.nodeType, s, t), r = ["battery", "ev"].includes(this.nodeType) && !!s.soc, a = r ? ee(t, s.soc) : null;
    return u`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, i, n)}
          ${this._sectionPower(o)}
          ${r ? this._sectionSoc(a) : f}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : f}
          ${this._sectionChart(e)}
        </div>
      </div>
    `;
  }
};
E.styles = R`
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
z([
  m({ attribute: !1 })
], E.prototype, "hass", 2);
z([
  m({ attribute: !1 })
], E.prototype, "config", 2);
z([
  m()
], E.prototype, "nodeType", 2);
z([
  m({ type: Boolean })
], E.prototype, "open", 2);
z([
  W()
], E.prototype, "_hourly", 2);
z([
  W()
], E.prototype, "_loading", 2);
E = z([
  I("hec-node-detail")
], E);
var Ve = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, ct = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ke(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && Ve(t, e, n), n;
};
function Ye(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const qe = {
  solar: "#ffc107",
  grid: "#42a5f5",
  battery: "#66bb6a",
  ev: "#26c6da"
}, Ge = {
  solar: [1.5, 0.62, 1.5, 1.38],
  grid: [0.62, 1.5, 1.38, 1.5],
  battery: [2.38, 1.5, 1.62, 1.5],
  ev: [1.5, 2.38, 1.5, 1.62]
};
let L = class extends w {
  constructor() {
    super(...arguments), this._dialogType = null;
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(s) {
    var t;
    return s in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(s) {
    var e, i, n;
    const t = ((i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[s]) ?? {};
    return te(s, t, ((n = this.hass) == null ? void 0 : n.states) ?? {});
  }
  _soc(s) {
    var n, o, r, a;
    const t = (r = (o = (n = this.config) == null ? void 0 : n.entity_types) == null ? void 0 : o[s]) == null ? void 0 : r.soc;
    if (!t || !this.hass) return null;
    const e = (a = this.hass.states[t]) == null ? void 0 : a.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const i = parseFloat(e);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var e, i, n, o;
    const s = ((i = (e = this.config) == null ? void 0 : e.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, t = ((o = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : o.animation) !== !1;
    return G`
      ${["solar", "grid", "battery", "ev"].filter((r) => this._configured(r)).map((r) => {
      const a = this._flowInfo(r), [l, c, h, d] = Ge[r], y = a.direction === "idle", _ = a.direction === "from-home", p = Ye(a.magnitude, s && !y), g = [
        "flow-line",
        _ ? "reverse" : "",
        y ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return G`
            <line
              x1="${l}" y1="${c}" x2="${h}" y2="${d}"
              stroke="${qe[r]}"
              class="${g}"
              style="--flow-dur:${p}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var l, c, h;
    const i = this._configured(s) || s === "home", n = ((c = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : c[s]) ?? {}, o = ((h = this.config) == null ? void 0 : h.display) ?? {}, r = this._flowInfo(s), a = n.show_zero === !1 && r.direction === "idle";
    return u`
      <hec-energy-node
        class="${t}${!i || a ? " hidden" : ""}"
        .type=${s}
        .label=${n.label ?? s}
        .colour=${n.colour ?? ""}
        .power=${r.power}
        .soc=${e ? this._soc(s) : null}
        .unit=${o.unit ?? "auto"}
        .decimalPlaces=${o.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  _ghost(s) {
    return u`
      <hec-energy-node class="${s} hidden" type="home" .power=${null}>
      </hec-energy-node>
    `;
  }
  // ── Dialog ────────────────────────────────────────────────────────────────
  _onNodeClick(s) {
    const t = s.detail;
    t != null && t.nodeType && (this._dialogType = t.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return f;
    const s = this._configured("solar"), t = this._configured("ev");
    return u`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 3" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1 -->
        <div class="spacer-r1c1"></div>
        ${s ? this._node("solar", "slot-solar") : this._ghost("slot-solar")}
        <div class="spacer-r1c3"></div>

        <!-- Row 2 -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Row 3 -->
        <div class="spacer-r3c1"></div>
        ${t ? this._node("ev", "slot-ev", !0) : this._ghost("slot-ev")}
        <div class="spacer-r3c3"></div>
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
L.styles = R`
    :host { display: block; }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      position: relative;
    }

    .slot-solar   { grid-column: 2; grid-row: 1; }
    .slot-grid    { grid-column: 1; grid-row: 2; }
    .slot-home    { grid-column: 2; grid-row: 2; }
    .slot-battery { grid-column: 3; grid-row: 2; }
    .slot-ev      { grid-column: 2; grid-row: 3; }

    .spacer-r1c1 { grid-column: 1; grid-row: 1; }
    .spacer-r1c3 { grid-column: 3; grid-row: 1; }
    .spacer-r3c1 { grid-column: 1; grid-row: 3; }
    .spacer-r3c3 { grid-column: 3; grid-row: 3; }

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
ct([
  m({ attribute: !1 })
], L.prototype, "hass", 2);
ct([
  m({ attribute: !1 })
], L.prototype, "config", 2);
ct([
  W()
], L.prototype, "_dialogType", 2);
L = ct([
  I("hec-flow-layout")
], L);
var Ze = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, xt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Je(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && Ze(t, e, n), n;
};
let tt = class extends w {
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
        ${this.config.show_header !== !1 ? u`
              <hec-card-header
                .hass=${this.hass}
                .config=${this.config}
              ></hec-card-header>
            ` : f}
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
tt.styles = R`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
xt([
  m({ attribute: !1 })
], tt.prototype, "hass", 2);
xt([
  m({ attribute: !1 })
], tt.prototype, "config", 2);
tt = xt([
  I("home-energy-card")
], tt);
export {
  tt as HomeEnergyCard
};
