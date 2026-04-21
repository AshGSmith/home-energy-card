/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, _t = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let Yt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const oe = (s) => new Yt(typeof s == "string" ? s : s + "", void 0, vt), W = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new Yt(e, s, vt);
}, ne = (s, t) => {
  if (_t) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = nt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, Dt = _t ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return oe(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: re, defineProperty: ae, getOwnPropertyDescriptor: ce, getOwnPropertyNames: le, getOwnPropertySymbols: de, getPrototypeOf: he } = Object, k = globalThis, zt = k.trustedTypes, pe = zt ? zt.emptyScript : "", ht = k.reactiveElementPolyfillSupport, q = (s, t) => s, rt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? pe : null;
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
} }, $t = (s, t) => !re(s, t), Mt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Mt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && ae(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = ce(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = he(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const e = this.properties, i = [...le(e), ...de(e)];
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
      for (const o of i) e.unshift(Dt(o));
    } else t !== void 0 && e.push(Dt(t));
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
    return ne(t, this.constructor.elementStyles), t;
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
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : rt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = o;
      const l = c.fromAttribute(e, a.type);
      this[o] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? $t)(n, e) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
        const { wrapped: a } = r, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[q("elementProperties")] = /* @__PURE__ */ new Map(), H[q("finalized")] = /* @__PURE__ */ new Map(), ht == null || ht({ ReactiveElement: H }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, jt = (s) => s, at = Y.trustedTypes, Ht = at ? at.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Zt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Jt = "?" + A, ue = `<${Jt}>`, D = document, J = () => D.createComment(""), Q = (s) => s === null || typeof s != "object" && typeof s != "function", bt = Array.isArray, fe = (s) => bt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, It = />/g, C = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Lt = /"/g, Qt = /^(?:script|style|textarea|title)$/i, Xt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = Xt(1), Z = Xt(2), I = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), P = D.createTreeWalker(D, 129);
function te(s, t) {
  if (!bt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ht !== void 0 ? Ht.createHTML(t) : t;
}
const ge = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = K;
  for (let a = 0; a < e; a++) {
    const c = s[a];
    let l, u, d = -1, y = 0;
    for (; y < c.length && (r.lastIndex = y, u = r.exec(c), u !== null); ) y = r.lastIndex, r === K ? u[1] === "!--" ? r = Ut : u[1] !== void 0 ? r = It : u[2] !== void 0 ? (Qt.test(u[2]) && (o = RegExp("</" + u[2], "g")), r = C) : u[3] !== void 0 && (r = C) : r === C ? u[0] === ">" ? (r = o ?? K, d = -1) : u[1] === void 0 ? d = -2 : (d = r.lastIndex - u[2].length, l = u[1], r = u[3] === void 0 ? C : u[3] === '"' ? Lt : Rt) : r === Lt || r === Rt ? r = C : r === Ut || r === It ? r = K : (r = C, o = void 0);
    const m = r === C && s[a + 1].startsWith("/>") ? " " : "";
    n += r === K ? c + ue : d >= 0 ? (i.push(l), c.slice(0, d) + Zt + c.slice(d) + A + m) : c + A + (d === -2 ? a : m);
  }
  return [te(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class X {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, c = this.parts, [l, u] = ge(t, e);
    if (this.el = X.createElement(l, i), P.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = P.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Zt)) {
          const y = u[r++], m = o.getAttribute(d).split(A), h = /([.?@])?(.*)/.exec(y);
          c.push({ type: 1, index: n, name: h[2], strings: m, ctor: h[1] === "." ? me : h[1] === "?" ? _e : h[1] === "@" ? ve : ct }), o.removeAttribute(d);
        } else d.startsWith(A) && (c.push({ type: 6, index: n }), o.removeAttribute(d));
        if (Qt.test(o.tagName)) {
          const d = o.textContent.split(A), y = d.length - 1;
          if (y > 0) {
            o.textContent = at ? at.emptyScript : "";
            for (let m = 0; m < y; m++) o.append(d[m], J()), P.nextNode(), c.push({ type: 2, index: ++n });
            o.append(d[y], J());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Jt) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(A, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += A.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function R(s, t, e = s, i) {
  var r, a;
  if (t === I) return t;
  let o = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const n = Q(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = R(s, o._$AS(s, t.values), o, i)), t;
}
class ye {
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
    const { el: { content: e }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    P.currentNode = o;
    let n = P.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new et(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new $e(n, this, t)), this._$AV.push(l), c = i[++a];
      }
      r !== (c == null ? void 0 : c.index) && (n = P.nextNode(), r++);
    }
    return P.currentNode = D, o;
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
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = R(this, t, e), Q(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = X.createElement(te(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const r = new ye(o, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Bt.get(t.strings);
    return e === void 0 && Bt.set(t.strings, e = new X(t)), e;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new et(this.O(J()), this.O(J()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = jt(t).nextSibling;
      jt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ct {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = R(this, t, e, 0), r = !Q(t) || t !== this._$AH && t !== I, r && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = R(this, a[i + c], e, c), l === I && (l = this._$AH[c]), r || (r = !Q(l) || l !== this._$AH[c]), l === p ? t = p : t !== p && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class _e extends ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class ve extends ct {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? p) === I) return;
    const i = this._$AH, o = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== p && (i === p || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class $e {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const ut = Y.litHtmlPolyfillSupport;
ut == null || ut(X, et), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.2");
const be = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new et(t.insertBefore(J(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class w extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = be(e, this.renderRoot, this.renderOptions);
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
    return I;
  }
}
var qt;
w._$litElement$ = !0, w.finalized = !0, (qt = N.litElementHydrateSupport) == null || qt.call(N, { LitElement: w });
const ft = N.litElementPolyfillSupport;
ft == null || ft({ LitElement: w });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: $t }, xe = (s = we, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, c, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const c = this[r];
      t.call(this, a), this.requestUpdate(r, c, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function _(s) {
  return (t, e) => typeof e == "object" ? xe(s, t, e) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(s) {
  return _({ ...s, state: !0, attribute: !1 });
}
const yt = ["grid", "solar", "battery", "home", "ev"], wt = (s) => s.attributes.device_class ?? "", xt = (s) => s.attributes.unit_of_measurement ?? "", Et = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function O(...s) {
  return (t, e) => {
    let i = 0;
    wt(e) === "power" && (i += 4), ["W", "kW"].includes(xt(e)) && (i += 2);
    const o = Et(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function U(...s) {
  return (t, e) => {
    let i = 0;
    wt(e) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(xt(e)) && (i += 2);
    const o = Et(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function Wt(...s) {
  return (t, e) => {
    let i = 0;
    wt(e) === "battery" && (i += 4), xt(e) === "%" && (i += 2);
    const o = Et(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function st(s, t = []) {
  return (e, i) => {
    const o = e.toLowerCase();
    if (t.some((r) => o.includes(r))) return 0;
    let n = 0;
    for (const r of s) o.includes(r) && (n += 4);
    return n;
  };
}
function v(s, t, e, i) {
  let o, n = 0;
  for (const r of s) {
    if (i.has(r)) continue;
    const a = t[r];
    if (!a) continue;
    const c = e(r, a);
    c > n && (n = c, o = r);
  }
  return o && i.add(o), o;
}
function Ee(s, t, e) {
  const i = Object.values(t).some(
    ($) => $.platform === "octopus_energy" && !$.disabled_by
  ), o = Object.keys(s).filter(($) => $.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    ($) => $.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], a = {}, c = {}, l = v(
    n,
    s,
    st(["_current_rate"], ["export", "accumulative"]),
    e
  );
  l && (a.rate_entity = l, r.push("rate"));
  const u = v(
    n,
    s,
    st(["_current_accumulative_cost"]),
    e
  );
  u && (a.cost_entity = u, r.push("cost"));
  const d = v(
    n,
    s,
    st(["_current_day_rates"]),
    e
  );
  d && (a.slots_entity = d, r.push("slots"));
  const y = v(
    o.filter(($) => $.startsWith("binary_sensor.")),
    s,
    st(["_intelligent_dispatching"]),
    e
  );
  y && (a.dispatches_entity = y, r.push("dispatching")), Object.keys(a).length && (c.octopus = a);
  const m = v(
    n,
    s,
    O("import", "demand", "current"),
    e
  );
  m && (c.power_import = m, r.push("import power"));
  const h = v(
    n,
    s,
    O("export", "demand", "current"),
    e
  );
  h && (c.power_export = h, r.push("export power"));
  const g = v(
    n,
    s,
    U("import", "accumulative", "consumption"),
    e
  );
  g && (c.daily_usage = g, r.push("daily import"));
  const b = v(
    n,
    s,
    U("export", "accumulative"),
    e
  );
  return b && (c.daily_export = b, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: c }, summary: r };
}
function Se(s, t, e) {
  const i = Object.values(t).filter(
    (h) => h.platform === "tesla_custom" && !h.disabled_by
  ), o = Object.keys(s).some(
    (h) => h.includes("powerwall") || h.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((h) => h.entity_id) : Object.keys(s).filter((h) => h.includes("powerwall") || h.includes("tesla")), r = n.filter((h) => h.includes("powerwall")), a = n.filter((h) => !h.includes("powerwall")), c = ["Tesla"], l = {};
  if (r.length > 0) {
    const h = {}, g = v(
      r,
      s,
      Wt("battery", "soc", "charge", "percent"),
      e
    );
    g && (h.soc = g);
    const b = v(
      r,
      s,
      O("battery", "power", "charge", "discharge"),
      e
    );
    b && (h.power_combined = b);
    const $ = v(
      r,
      s,
      U("battery", "today", "daily", "charged"),
      e
    );
    $ && (h.daily_usage = $), Object.keys(h).length && (l.battery = h, c.push("Powerwall"));
  }
  const u = v(
    n,
    s,
    O("solar"),
    e
  );
  if (u) {
    const h = { power_combined: u }, g = v(
      n,
      s,
      U("solar"),
      e
    );
    g && (h.daily_usage = g), l.solar = h, c.push("solar");
  }
  const d = v(
    n,
    s,
    O("load", "home", "house"),
    e
  );
  if (d) {
    const h = { power_combined: d }, g = v(
      n,
      s,
      U("load", "home", "house"),
      e
    );
    g && (h.daily_usage = g), l.home = h, c.push("home load");
  }
  const y = v(
    n,
    s,
    O("grid"),
    e
  );
  y && (l.grid = { power_combined: y }, c.push("grid"));
  const m = v(
    a,
    s,
    Wt("battery", "battery_level", "soc", "charge"),
    e
  );
  if (m) {
    const h = { soc: m }, g = v(
      a,
      s,
      O("charg", "power"),
      e
    );
    g && (h.power_combined = g);
    const b = v(
      a,
      s,
      U("charg", "energy"),
      e
    );
    b && (h.daily_usage = b), l.ev = h, c.push("EV");
  }
  return { integration_type: "tesla", entity_types: l, summary: c };
}
function Ae(s) {
  var c, l;
  const t = s, e = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = Se(e, i, o), r = Ee(e, i, o), a = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (a.integration_type = "tesla", Object.assign(a.entity_types, n.entity_types), a.summary.push(...n.summary ?? [])), r) {
    if (a.integration_type !== "tesla" && (a.integration_type = "octopus"), (c = r.entity_types) != null && c.grid) {
      const u = r.entity_types.grid;
      a.entity_types.grid = {
        ...a.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (l = a.entity_types.grid) == null ? void 0 : l.power_combined
      };
    }
    r.tariff_entity && (a.tariff_entity = r.tariff_entity), a.summary.push(...r.summary ?? []);
  }
  return a;
}
function ke(s, t, e = !1) {
  const i = { ...s };
  t.tariff_entity && (e || !s.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = s.entity_types ?? {}, n = { ...o };
  for (const [r, a] of Object.entries(t.entity_types)) {
    const c = o[r] ?? {}, l = { ...c };
    for (const [u, d] of Object.entries(a))
      d !== void 0 && (e || !c[u]) && (l[u] = d);
    n[r] = l;
  }
  return i.entity_types = n, i;
}
var Te = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, M = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ce(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Te(t, e, o), o;
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
    const s = Ae(this.hass);
    if (s.integration_type === "manual" && s.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.", this._detectIsError = !0;
      return;
    }
    const t = ke(
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
    var o;
    const i = { ...((o = this.config) == null ? void 0 : o.entity_types) ?? {} };
    i[s] = e === void 0 || e === "" || e === null ? (({ [t]: n, ...r }) => r)(i[s] ?? {}) : { ...i[s], [t]: e }, this._set("entity_types", i);
  }
  _setOctopus(s, t, e) {
    var a;
    const i = { ...((a = this.config) == null ? void 0 : a.entity_types) ?? {} }, o = i[s] ?? {}, n = { ...o.octopus, [t]: e || void 0 }, r = Object.values(n).some(Boolean);
    i[s] = r ? { ...o, octopus: n } : (({ octopus: c, ...l }) => l)(o), this._set("entity_types", i);
  }
  _renderEntityTypeFields(s) {
    var e, i, o, n, r;
    const t = ((i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[s]) ?? {};
    return f`
      <div class="type-fields">

        <ha-entity-picker
          label="Import power"
          .hass=${this.hass}
          .value=${t.power_import ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "power_import", a.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Export power"
          .hass=${this.hass}
          .value=${t.power_export ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "power_export", a.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Combined power"
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
          label="State of charge (%)"
          .hass=${this.hass}
          .value=${t.soc ?? ""}
          @value-changed=${(a) => this._setEntityType(s, "soc", a.detail.value)}
        ></ha-entity-picker>

        ${s === "grid" ? f`
          <div class="subsection-label">Octopus Energy</div>
          <ha-entity-picker
            label="Rate entity"
            .hass=${this.hass}
            .value=${((o = t.octopus) == null ? void 0 : o.rate_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(s, "rate_entity", a.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Cost today entity"
            .hass=${this.hass}
            .value=${((n = t.octopus) == null ? void 0 : n.cost_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(s, "cost_entity", a.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Slots / rates entity"
            .hass=${this.hass}
            .value=${((r = t.octopus) == null ? void 0 : r.slots_entity) ?? ""}
            @value-changed=${(a) => this._setOctopus(s, "slots_entity", a.detail.value)}
          ></ha-entity-picker>
        ` : p}

      </div>
    `;
  }
  _capitalize(s) {
    return s === "ev" ? "EV" : s.charAt(0).toUpperCase() + s.slice(1);
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
  _toggleSection(s) {
    const t = new Set(this._openSections);
    t.has(s) ? t.delete(s) : t.add(s), this._openSections = t;
  }
  _renderEntityTypeSections() {
    var e;
    const s = Object.keys(
      ((e = this.config) == null ? void 0 : e.entity_types) ?? {}
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
            ` : p}
          </div>
        </div>
      `;
    };
    return f`
      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      ${yt.map((i) => t(i))}
      ${s.map((i) => t(i, !0))}

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
    const s = ((t = this.config) == null ? void 0 : t.live_data) ?? {};
    return f`
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
    return f`
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
    return f`
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
var Oe = Object.defineProperty, Pe = Object.getOwnPropertyDescriptor, lt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Pe(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Oe(t, e, o), o;
};
function it(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : e.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function ot(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Ne(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let L = class extends w {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var g, b, $, V, G, At, kt, Tt, Ct, Ot, Pt;
    if (!this.config) return p;
    const s = ((g = this.hass) == null ? void 0 : g.states) ?? {}, t = this.config.entity_types ?? {}, e = ((b = this.config.display) == null ? void 0 : b.decimal_places) ?? 1, i = this.config.tariff_entity ? ($ = s[this.config.tariff_entity]) == null ? void 0 : $.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Ne(i) : null, n = it(s, (V = t.solar) == null ? void 0 : V.daily_usage), r = it(s, (G = t.home) == null ? void 0 : G.daily_usage), a = it(s, (At = t.grid) == null ? void 0 : At.daily_usage), c = it(s, (kt = t.grid) == null ? void 0 : kt.daily_export), l = !!((Tt = t.solar) != null && Tt.daily_usage), u = !!((Ct = t.home) != null && Ct.daily_usage), d = !!((Ot = t.grid) != null && Ot.daily_usage), y = !!((Pt = t.grid) != null && Pt.daily_export), m = d || y, h = l || u || m;
    return f`
      <div class="header">

        ${this.showTitle || o ? f`
          <div class="title-row">
            ${this.showTitle ? f`<span class="title">${this.config.title ?? "Home Energy"}</span>` : p}
            ${o ? f`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : p}
          </div>
        ` : p}

        ${h ? f`
          <div class="stats-row">

            ${l ? f`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${ot(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : p}

            ${u ? f`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${ot(r, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : p}

            ${m ? f`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? f`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${ot(a, e)}</span>
                    </div>
                  ` : p}
                  ${y ? f`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${ot(c, e)}</span>
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
lt([
  _({ attribute: !1 })
], L.prototype, "hass", 2);
lt([
  _({ attribute: !1 })
], L.prototype, "config", 2);
lt([
  _({ type: Boolean })
], L.prototype, "showTitle", 2);
L = lt([
  F("hec-card-header")
], L);
var De = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, T = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ze(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && De(t, e, o), o;
};
const Me = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, je = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, mt = 38, Ft = +(2 * Math.PI * mt).toFixed(4);
function ee(s, t, e) {
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
    const s = Me[this.type] ?? je, t = this.colour || s.accent, e = this.soc !== null, i = e ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(Ft * (1 - i / 100)).toFixed(4);
    return f`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${e ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${mt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${mt}"
            style="stroke-dasharray:${Ft};stroke-dashoffset:${o};"
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
          <span class="power">${ee(this.power, this.unit, this.decimalPlaces)}</span>
          ${e ? f`
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
function gt(s, t) {
  var o;
  if (!t) return null;
  const e = (o = s[t]) == null ? void 0 : o.state;
  if (!e || e === "unavailable" || e === "unknown") return null;
  const i = parseFloat(e);
  return isNaN(i) ? null : i;
}
function se(s, t, e) {
  const i = t.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = gt(e, t.power_combined);
  else {
    const c = !!t.power_import, l = !!t.power_export;
    if (!c && !l) return o;
    const u = c ? gt(e, t.power_import) : null, d = l ? gt(e, t.power_export) : null;
    if ((!c || u === null) && (!l || d === null)) return o;
    n = (u ?? 0) - (d ?? 0);
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
var He = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, j = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ue(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && He(t, e, o), o;
};
const Ie = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Re = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Le = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Be(s) {
  const t = Date.now(), e = t - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let o = 0; o < 24; o++) {
    const n = e + o * 36e5, r = n + 36e5;
    let a = 0, c = 0;
    for (let l = 0; l < s.length; l++) {
      const u = new Date(s[l].last_changed).getTime(), d = l + 1 < s.length ? new Date(s[l + 1].last_changed).getTime() : t, y = Math.max(u, n), m = Math.min(d, r);
      if (m <= y) continue;
      const h = parseFloat(s[l].state);
      if (isNaN(h)) continue;
      const g = m - y;
      a += Math.abs(h) * g, c += g;
    }
    c > 0 && (i[o] = a / c);
  }
  return i;
}
function ie(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : i;
}
function Vt(s, t) {
  var o;
  const e = ie(s, t);
  return e === null ? null : ((o = s[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function Gt(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function We(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Kt(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Fe(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Ve(s) {
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
    var e, i;
    const s = (i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!(!t || !this.hass)) {
      this._loading = !0, this._hourly = [];
      try {
        const o = /* @__PURE__ */ new Date(), r = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, a = await this.hass.callApi("GET", r);
        this._hourly = Be((a == null ? void 0 : a[0]) ?? []);
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
    return f`
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
    var o, n, r, a, c;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", i = ((c = Le[this.nodeType]) == null ? void 0 : c[s.direction]) ?? "";
    return f`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${ee(s.power, e, t)}</div>
        ${i ? f`<div class="power-sub">${i}</div>` : p}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return p;
    const t = Ve(s);
    return f`
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
    var r, a, c;
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, e = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([i, Gt(Vt(t, s.daily_usage), e)]), s.daily_export && n.push([o, Gt(Vt(t, s.daily_export), e)]), n.length ? f`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([l, u]) => f`
          <div class="kv">
            <span class="kv-k">${l}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : p;
  }
  _sectionOctopus(s) {
    var h;
    const t = ((h = this.hass) == null ? void 0 : h.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, i = s.cost_entity ? t[s.cost_entity] : null, o = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, r = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", a = i == null ? void 0 : i.state, c = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", l = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], u = Date.now(), d = l.filter((g) => new Date(g.end ?? g.end_time ?? 0).getTime() > u).slice(0, 6), y = n && n !== "unavailable" && n !== "unknown", m = a && a !== "unavailable" && a !== "unknown";
    return !y && !m && !d.length ? p : f`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${y ? f`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
          </div>
        ` : p}

        ${m ? f`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${c}${parseFloat(a).toFixed(2)}</span>
          </div>
        ` : p}

        ${d.length ? f`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((g) => {
      const b = g.start ?? g.start_time ?? "", $ = g.end ?? g.end_time ?? "", V = g.value_inc_vat ?? g.rate_inc_vat ?? g.value ?? 0, G = Fe(V);
      return f`
              <div class="slot">
                <span class="slot-dot" style="background:${G};"></span>
                <span class="slot-time">${Kt(b)}–${Kt($)}</span>
                <span class="slot-rate" style="color:${G};">${(+V).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : p}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => We(new Date(i.getTime() - n * 36e5));
    return this._loading ? f`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : f`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? f`<div class="chart-msg">No data</div>` : f`
              ${Z`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return Z``;
      const a = Math.max(2, n / e * 48);
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
    var c, l, u;
    if (!this.open || !this.nodeType) return p;
    const s = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[this.nodeType]) ?? {}, t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, e = s.colour || (Re[this.nodeType] ?? "#9e9e9e"), i = Ie[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = se(this.nodeType, s, t), r = ["battery", "ev"].includes(this.nodeType) && !!s.soc, a = r ? ie(t, s.soc) : null;
    return f`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, i, o)}
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
S.styles = W`
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
  _({ attribute: !1 })
], S.prototype, "hass", 2);
j([
  _({ attribute: !1 })
], S.prototype, "config", 2);
j([
  _()
], S.prototype, "nodeType", 2);
j([
  _({ type: Boolean })
], S.prototype, "open", 2);
j([
  z()
], S.prototype, "_hourly", 2);
j([
  z()
], S.prototype, "_loading", 2);
S = j([
  F("hec-node-detail")
], S);
var Ge = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, dt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ke(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Ge(t, e, o), o;
};
function qe(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const Ye = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, Ze = {
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
    var t;
    return s in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(s) {
    var e, i, o;
    const t = ((i = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : i[s]) ?? {};
    return se(s, t, ((o = this.hass) == null ? void 0 : o.states) ?? {});
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
    return Z`
      ${["solar", "grid", "battery", "ev"].filter((r) => this._isVisible(r)).map((r) => {
      const a = this._flowInfo(r), [c, l, u, d] = Ze[r], y = a.direction === "idle", m = a.direction === "from-home", h = qe(a.magnitude, s && !y), g = [
        "flow-line",
        m ? "reverse" : "",
        y ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Z`
            <line
              x1="${c}" y1="${l}" x2="${u}" y2="${d}"
              stroke="${Ye[r]}"
              class="${g}"
              style="--flow-dur:${h}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var a, c, l;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((c = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : c[s]) ?? {}, n = ((l = this.config) == null ? void 0 : l.display) ?? {}, r = this._flowInfo(s);
    return f`
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
      (t) => !yt.includes(t)
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
    var a, c, l;
    const i = this._isVisible(s), o = ((c = (a = this.config) == null ? void 0 : a.entity_types) == null ? void 0 : c[s]) ?? {}, n = ((l = this.config) == null ? void 0 : l.display) ?? {}, r = this._flowInfo(s);
    return f`
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
    if (!this.config) return p;
    const s = this._customTypes(), t = 2 + Math.ceil(s.length / 3);
    return f`
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
dt([
  _({ attribute: !1 })
], B.prototype, "hass", 2);
dt([
  _({ attribute: !1 })
], B.prototype, "config", 2);
dt([
  z()
], B.prototype, "_dialogType", 2);
B = dt([
  F("hec-flow-layout")
], B);
var Je = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, St = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Qe(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Je(t, e, o), o;
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
    ` : p;
  }
};
tt.styles = W`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
St([
  _({ attribute: !1 })
], tt.prototype, "hass", 2);
St([
  _({ attribute: !1 })
], tt.prototype, "config", 2);
tt = St([
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
