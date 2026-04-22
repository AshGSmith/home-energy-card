/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis, ve = ae.ShadowRoot && (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _e = Symbol(), Oe = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== _e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ve && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const it = (s) => new Ze(typeof s == "string" ? s : s + "", void 0, _e), W = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, o, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[a + 1], s[0]);
  return new Ze(t, s, _e);
}, ot = (s, e) => {
  if (ve) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = ae.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, s.appendChild(i);
  }
}, ze = ve ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return it(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: at, defineProperty: nt, getOwnPropertyDescriptor: rt, getOwnPropertyNames: lt, getOwnPropertySymbols: ct, getPrototypeOf: ht } = Object, T = globalThis, Ne = T.trustedTypes, dt = Ne ? Ne.emptyScript : "", de = T.reactiveElementPolyfillSupport, G = (s, e) => s, ne = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? dt : null;
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
} }, me = (s, e) => !at(s, e), De = { attribute: !0, type: String, converter: ne, reflect: !1, useDefault: !1, hasChanged: me };
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
      o !== void 0 && nt(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: a } = rt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: o, set(n) {
      const r = o == null ? void 0 : o.call(this);
      a == null || a.call(this, n), this.requestUpdate(e, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? De;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = ht(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const t = this.properties, i = [...lt(t), ...ct(t)];
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
    return ot(e, this.constructor.elementStyles), e;
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
      const n = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : ne).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, n;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : ne;
      this._$Em = o;
      const h = c.fromAttribute(t, r.type);
      this[o] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, a) {
    var n;
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (a = this[e]), i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? me)(a, t) || i.useDefault && i.reflect && a === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(r._$Eu(e, i)))) return;
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
        const { wrapped: r } = n, c = this[a];
        r !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, n, c);
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[G("elementProperties")] = /* @__PURE__ */ new Map(), M[G("finalized")] = /* @__PURE__ */ new Map(), de == null || de({ ReactiveElement: M }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, He = (s) => s, re = K.trustedTypes, Ue = re ? re.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, qe = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + A, pt = `<${Ye}>`, D = document, q = () => D.createComment(""), Y = (s) => s === null || typeof s != "object" && typeof s != "function", $e = Array.isArray, ut = (s) => $e(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", pe = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, je = />/g, P = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ie = /'/g, Le = /"/g, Je = /^(?:script|style|textarea|title)$/i, Qe = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), g = Qe(1), Z = Qe(2), I = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), z = D.createTreeWalker(D, 129);
function Xe(s, e) {
  if (!$e(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ue !== void 0 ? Ue.createHTML(e) : e;
}
const ft = (s, e) => {
  const t = s.length - 1, i = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = F;
  for (let r = 0; r < t; r++) {
    const c = s[r];
    let h, u, d = -1, v = 0;
    for (; v < c.length && (n.lastIndex = v, u = n.exec(c), u !== null); ) v = n.lastIndex, n === F ? u[1] === "!--" ? n = Me : u[1] !== void 0 ? n = je : u[2] !== void 0 ? (Je.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = P) : u[3] !== void 0 && (n = P) : n === P ? u[0] === ">" ? (n = o ?? F, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? P : u[3] === '"' ? Le : Ie) : n === Le || n === Ie ? n = P : n === Me || n === je ? n = F : (n = P, o = void 0);
    const _ = n === P && s[r + 1].startsWith("/>") ? " " : "";
    a += n === F ? c + pt : d >= 0 ? (i.push(h), c.slice(0, d) + qe + c.slice(d) + A + _) : c + A + (d === -2 ? r : _);
  }
  return [Xe(s, a + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class J {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const r = e.length - 1, c = this.parts, [h, u] = ft(e, t);
    if (this.el = J.createElement(h, i), z.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = z.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(qe)) {
          const v = u[n++], _ = o.getAttribute(d).split(A), p = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: a, name: p[2], strings: _, ctor: p[1] === "." ? gt : p[1] === "?" ? vt : p[1] === "@" ? _t : le }), o.removeAttribute(d);
        } else d.startsWith(A) && (c.push({ type: 6, index: a }), o.removeAttribute(d));
        if (Je.test(o.tagName)) {
          const d = o.textContent.split(A), v = d.length - 1;
          if (v > 0) {
            o.textContent = re ? re.emptyScript : "";
            for (let _ = 0; _ < v; _++) o.append(d[_], q()), z.nextNode(), c.push({ type: 2, index: ++a });
            o.append(d[v], q());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ye) c.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(A, d + 1)) !== -1; ) c.push({ type: 7, index: a }), d += A.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = D.createElement("template");
    return i.innerHTML = e, i;
  }
}
function L(s, e, t = s, i) {
  var n, r;
  if (e === I) return e;
  let o = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const a = Y(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), a === void 0 ? o = void 0 : (o = new a(s), o._$AT(s, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = L(s, o._$AS(s, e.values), o, i)), e;
}
class yt {
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
    z.currentNode = o;
    let a = z.nextNode(), n = 0, r = 0, c = i[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let h;
        c.type === 2 ? h = new X(a, a.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (h = new mt(a, this, e)), this._$AV.push(h), c = i[++r];
      }
      n !== (c == null ? void 0 : c.index) && (a = z.nextNode(), n++);
    }
    return z.currentNode = D, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class X {
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
    e = L(this, e, t), Y(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && Y(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = J.createElement(Xe(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(t);
    else {
      const n = new yt(o, this), r = n.u(this.options);
      n.p(t), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Re.get(e.strings);
    return t === void 0 && Re.set(e.strings, t = new J(e)), t;
  }
  k(e) {
    $e(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const a of e) o === t.length ? t.push(i = new X(this.O(q()), this.O(q()), this, this.options)) : i = t[o], i._$AI(a), o++;
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
  constructor(e, t, i, o, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, t = this, i, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = L(this, e, t, 0), n = !Y(e) || e !== this._$AH && e !== I, n && (this._$AH = e);
    else {
      const r = e;
      let c, h;
      for (e = a[0], c = 0; c < a.length - 1; c++) h = L(this, r[i + c], t, c), h === I && (h = this._$AH[c]), n || (n = !Y(h) || h !== this._$AH[c]), h === f ? e = f : e !== f && (e += (h ?? "") + a[c + 1]), this._$AH[c] = h;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class gt extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class vt extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class _t extends le {
  constructor(e, t, i, o, a) {
    super(e, t, i, o, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = L(this, e, t, 0) ?? f) === I) return;
    const i = this._$AH, o = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== f && (i === f || o);
    o && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class mt {
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
const ue = K.litHtmlPolyfillSupport;
ue == null || ue(J, X), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.2");
const $t = (s, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new X(e.insertBefore(q(), a), a, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class E extends M {
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
var Ke;
E._$litElement$ = !0, E.finalized = !0, (Ke = N.litElementHydrateSupport) == null || Ke.call(N, { LitElement: E });
const fe = N.litElementPolyfillSupport;
fe == null || fe({ LitElement: E });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
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
const bt = { attribute: !0, type: String, converter: ne, reflect: !1, hasChanged: me }, wt = (s = bt, e, t) => {
  const { kind: i, metadata: o } = t;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), a.set(t.name, s), i === "accessor") {
    const { name: n } = t;
    return { set(r) {
      const c = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(n, c, s, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, s, r), r;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(r) {
      const c = this[n];
      e.call(this, r), this.requestUpdate(n, c, s, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function $(s) {
  return (e, t) => typeof t == "object" ? wt(s, e, t) : ((i, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, i), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ee(s) {
  return $({ ...s, state: !0, attribute: !1 });
}
const be = (s) => s.attributes.device_class ?? "", we = (s) => s.attributes.unit_of_measurement ?? "", xe = (s, e) => s.toLowerCase() + " " + (e.attributes.friendly_name ?? "").toLowerCase();
function O(...s) {
  return (e, t) => {
    let i = 0;
    be(t) === "power" && (i += 4), ["W", "kW"].includes(we(t)) && (i += 2);
    const o = xe(e, t);
    for (const a of s) o.includes(a) && (i += 1);
    return i;
  };
}
function j(...s) {
  return (e, t) => {
    let i = 0;
    be(t) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(we(t)) && (i += 2);
    const o = xe(e, t);
    for (const a of s) o.includes(a) && (i += 1);
    return i;
  };
}
function Be(...s) {
  return (e, t) => {
    let i = 0;
    be(t) === "battery" && (i += 4), we(t) === "%" && (i += 2);
    const o = xe(e, t);
    for (const a of s) o.includes(a) && (i += 1);
    return i;
  };
}
function se(s, e = []) {
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
    const r = e[n];
    if (!r) continue;
    const c = t(n, r);
    c > a && (a = c, o = n);
  }
  return o && i.add(o), o;
}
function xt(s, e, t) {
  const i = Object.values(e).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), o = Object.keys(s).filter((b) => b.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const a = o.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), n = ["Octopus Energy"], r = {}, c = {}, h = w(
    a,
    s,
    se(["_current_rate"], ["export", "accumulative"]),
    t
  );
  h && (r.rate_entity = h, n.push("rate"));
  const u = w(
    a,
    s,
    se(["_current_accumulative_cost"]),
    t
  );
  u && (r.cost_entity = u, n.push("cost"));
  const d = w(
    a,
    s,
    se(["_current_day_rates"]),
    t
  );
  d && (r.slots_entity = d, n.push("slots"));
  const v = w(
    o.filter((b) => b.startsWith("binary_sensor.")),
    s,
    se(["_intelligent_dispatching"]),
    t
  );
  v && (r.dispatches_entity = v, n.push("dispatching")), Object.keys(r).length && (c.octopus = r);
  const _ = w(
    a,
    s,
    O("import", "demand", "current"),
    t
  );
  _ && (c.power_import = _, n.push("import power"));
  const p = w(
    a,
    s,
    O("export", "demand", "current"),
    t
  );
  p && (c.power_export = p, n.push("export power"));
  const y = w(
    a,
    s,
    j("import", "accumulative", "consumption"),
    t
  );
  y && (c.daily_usage = y, n.push("daily import"));
  const x = w(
    a,
    s,
    j("export", "accumulative"),
    t
  );
  return x && (c.daily_export = x, n.push("daily export")), { integration_type: "octopus", entity_types: { grid: c }, summary: n };
}
function Et(s, e, t) {
  const i = Object.values(e).filter(
    (p) => p.platform === "tesla_custom" && !p.disabled_by
  ), o = Object.keys(s).some(
    (p) => p.includes("powerwall") || p.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const a = i.length > 0 ? i.map((p) => p.entity_id) : Object.keys(s).filter((p) => p.includes("powerwall") || p.includes("tesla")), n = a.filter((p) => p.includes("powerwall")), r = a.filter((p) => !p.includes("powerwall")), c = ["Tesla"], h = {};
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
      O("battery", "power", "charge", "discharge"),
      t
    );
    x && (p.power_combined = x);
    const b = w(
      n,
      s,
      j("battery", "today", "daily", "charged"),
      t
    );
    b && (p.daily_usage = b), Object.keys(p).length && (h.battery = p, c.push("Powerwall"));
  }
  const u = w(
    a,
    s,
    O("solar"),
    t
  );
  if (u) {
    const p = { power_combined: u }, y = w(
      a,
      s,
      j("solar"),
      t
    );
    y && (p.daily_usage = y), h.solar = p, c.push("solar");
  }
  const d = w(
    a,
    s,
    O("load", "home", "house"),
    t
  );
  if (d) {
    const p = { power_combined: d }, y = w(
      a,
      s,
      j("load", "home", "house"),
      t
    );
    y && (p.daily_usage = y), h.home = p, c.push("home load");
  }
  const v = w(
    a,
    s,
    O("grid"),
    t
  );
  v && (h.grid = { power_combined: v }, c.push("grid"));
  const _ = w(
    r,
    s,
    Be("battery", "battery_level", "soc", "charge"),
    t
  );
  if (_) {
    const p = { soc: _ }, y = w(
      r,
      s,
      O("charg", "power"),
      t
    );
    y && (p.power_combined = y);
    const x = w(
      r,
      s,
      j("charg", "energy"),
      t
    );
    x && (p.daily_usage = x), h.ev = p, c.push("EV");
  }
  return { integration_type: "tesla", entity_types: h, summary: c };
}
function kt(s) {
  var c, h;
  const e = s, t = e.states ?? {}, i = e.entities ?? {}, o = /* @__PURE__ */ new Set(), a = Et(t, i, o), n = xt(t, i, o), r = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (a && (r.integration_type = "tesla", Object.assign(r.entity_types, a.entity_types), r.summary.push(...a.summary ?? [])), n) {
    if (r.integration_type !== "tesla" && (r.integration_type = "octopus"), (c = n.entity_types) != null && c.grid) {
      const u = n.entity_types.grid;
      r.entity_types.grid = {
        ...r.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (h = r.entity_types.grid) == null ? void 0 : h.power_combined
      };
    }
    n.tariff_entity && (r.tariff_entity = n.tariff_entity), r.summary.push(...n.summary ?? []);
  }
  return r;
}
function St(s, e, t = !1) {
  const i = { ...s };
  e.tariff_entity && (t || !s.tariff_entity) && (i.tariff_entity = e.tariff_entity);
  const o = s.entity_types ?? {}, a = { ...o };
  for (const [n, r] of Object.entries(e.entity_types)) {
    const c = o[n] ?? {}, h = { ...c };
    for (const [u, d] of Object.entries(r))
      d !== void 0 && (t || !c[u]) && (h[u] = d);
    a[n] = h;
  }
  return i.entity_types = a, i;
}
var At = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, te = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Tt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && At(e, t, o), o;
};
let H = class extends E {
  constructor() {
    super(...arguments), this._detectStatus = "", this._detectIsError = !1;
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
    const e = St(this.config, s, !1);
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
    var r;
    const i = { ...((r = this.config) == null ? void 0 : r.entity_types) ?? {} }, o = i[s] ?? {}, a = { ...o.octopus, [e]: t || void 0 }, n = Object.values(a).some(Boolean);
    i[s] = n ? { ...o, octopus: a } : (({ octopus: c, ...h }) => h)(o), this._set("entity_types", i);
  }
  render() {
    var h, u, d, v, _, p, y, x, b;
    if (!this.config) return f;
    const s = ((h = this.config.entity_types) == null ? void 0 : h.grid) ?? {}, e = ((u = this.config.entity_types) == null ? void 0 : u.solar) ?? {}, t = ((d = this.config.entity_types) == null ? void 0 : d.battery) ?? {}, i = ((v = this.config.entity_types) == null ? void 0 : v.home) ?? {}, o = ((_ = this.config.entity_types) == null ? void 0 : _.ev) ?? {}, a = ((p = this.config.entity_types) == null ? void 0 : p.custom_1) ?? {}, n = this.config.live_data ?? {}, r = this.config.system ?? {}, c = this.config.display ?? {};
    return g`
      <div class="detect-block">
        <ha-button unelevated @click=${this._runAutoDetect}>Auto-detect entities</ha-button>
        <span class="detect-status ${this._detectIsError ? "error" : ""}">
          ${this._detectStatus || "Scan your entities and pre-fill fields automatically."}
        </span>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Top level</div>
        <div class="flat-body">
          <ha-textfield
            label="Title"
            .value=${this.config.title ?? ""}
            @change=${(l) => this._set("title", l.target.value || void 0)}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show Title</span>
            <ha-switch
              .checked=${this.config.show_header ?? !0}
              @change=${(l) => this._set("show_header", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-entity-picker
            label="Tariff Status Entity"
            .hass=${this.hass}
            .value=${this.config.tariff_entity ?? ""}
            @value-changed=${(l) => this._set("tariff_entity", l.detail.value || void 0)}
          ></ha-entity-picker>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Grid</div>
        <div class="flat-body">
          <ha-entity-picker
            label="Grid Import Power"
            .hass=${this.hass}
            .value=${s.power_import ?? ""}
            @value-changed=${(l) => this._setEntityType("grid", "power_import", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Grid Export Power"
            .hass=${this.hass}
            .value=${s.power_export ?? ""}
            @value-changed=${(l) => this._setEntityType("grid", "power_export", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Grid Combined Power"
            .hass=${this.hass}
            .value=${s.power_combined ?? ""}
            @value-changed=${(l) => this._setEntityType("grid", "power_combined", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Grid Daily Usage"
            .hass=${this.hass}
            .value=${s.daily_usage ?? ""}
            @value-changed=${(l) => this._setEntityType("grid", "daily_usage", l.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Grid Show when idle</span>
            <ha-switch
              .checked=${s.show_zero !== !1}
              @change=${(l) => this._setEntityType("grid", "show_zero", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Grid Zero Tolerance"
            type="number"
            min="0"
            .value=${s.zero_tolerance != null ? String(s.zero_tolerance) : ""}
            @change=${(l) => {
      const m = l.target.value;
      this._setEntityType("grid", "zero_tolerance", m !== "" ? Number(m) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Grid Label"
            .value=${s.label ?? ""}
            @change=${(l) => this._setEntityType("grid", "label", l.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Grid Colour"
            .value=${s.colour ?? ""}
            @change=${(l) => this._setEntityType("grid", "colour", l.target.value || void 0)}
          ></ha-textfield>
          <ha-entity-picker
            label="Grid Octopus Rate Entity"
            .hass=${this.hass}
            .value=${((y = s.octopus) == null ? void 0 : y.rate_entity) ?? ""}
            @value-changed=${(l) => this._setOctopus("grid", "rate_entity", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Grid Octopus Cost Entity"
            .hass=${this.hass}
            .value=${((x = s.octopus) == null ? void 0 : x.cost_entity) ?? ""}
            @value-changed=${(l) => this._setOctopus("grid", "cost_entity", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Grid Octopus Slots Entity"
            .hass=${this.hass}
            .value=${((b = s.octopus) == null ? void 0 : b.slots_entity) ?? ""}
            @value-changed=${(l) => this._setOctopus("grid", "slots_entity", l.detail.value)}
          ></ha-entity-picker>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Solar</div>
        <div class="flat-body">
          <ha-entity-picker
            label="Solar Combined Power"
            .hass=${this.hass}
            .value=${e.power_combined ?? ""}
            @value-changed=${(l) => this._setEntityType("solar", "power_combined", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Solar Daily Usage"
            .hass=${this.hass}
            .value=${e.daily_usage ?? ""}
            @value-changed=${(l) => this._setEntityType("solar", "daily_usage", l.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Solar Show when idle</span>
            <ha-switch
              .checked=${e.show_zero !== !1}
              @change=${(l) => this._setEntityType("solar", "show_zero", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Solar Zero Tolerance"
            type="number"
            min="0"
            .value=${e.zero_tolerance != null ? String(e.zero_tolerance) : ""}
            @change=${(l) => {
      const m = l.target.value;
      this._setEntityType("solar", "zero_tolerance", m !== "" ? Number(m) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Solar Label"
            .value=${e.label ?? ""}
            @change=${(l) => this._setEntityType("solar", "label", l.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Solar Colour"
            .value=${e.colour ?? ""}
            @change=${(l) => this._setEntityType("solar", "colour", l.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Battery</div>
        <div class="flat-body">
          <ha-entity-picker
            label="Battery State of Charge"
            .hass=${this.hass}
            .value=${t.soc ?? ""}
            @value-changed=${(l) => this._setEntityType("battery", "soc", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Battery Combined Power"
            .hass=${this.hass}
            .value=${t.power_combined ?? ""}
            @value-changed=${(l) => this._setEntityType("battery", "power_combined", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Battery Daily Usage"
            .hass=${this.hass}
            .value=${t.daily_usage ?? ""}
            @value-changed=${(l) => this._setEntityType("battery", "daily_usage", l.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Battery Show when idle</span>
            <ha-switch
              .checked=${t.show_zero !== !1}
              @change=${(l) => this._setEntityType("battery", "show_zero", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Battery Zero Tolerance"
            type="number"
            min="0"
            .value=${t.zero_tolerance != null ? String(t.zero_tolerance) : ""}
            @change=${(l) => {
      const m = l.target.value;
      this._setEntityType("battery", "zero_tolerance", m !== "" ? Number(m) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Battery Label"
            .value=${t.label ?? ""}
            @change=${(l) => this._setEntityType("battery", "label", l.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Battery Colour"
            .value=${t.colour ?? ""}
            @change=${(l) => this._setEntityType("battery", "colour", l.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Home</div>
        <div class="flat-body">
          <ha-entity-picker
            label="Home Combined Power"
            .hass=${this.hass}
            .value=${i.power_combined ?? ""}
            @value-changed=${(l) => this._setEntityType("home", "power_combined", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Home Daily Usage"
            .hass=${this.hass}
            .value=${i.daily_usage ?? ""}
            @value-changed=${(l) => this._setEntityType("home", "daily_usage", l.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Home Show when idle</span>
            <ha-switch
              .checked=${i.show_zero !== !1}
              @change=${(l) => this._setEntityType("home", "show_zero", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Home Zero Tolerance"
            type="number"
            min="0"
            .value=${i.zero_tolerance != null ? String(i.zero_tolerance) : ""}
            @change=${(l) => {
      const m = l.target.value;
      this._setEntityType("home", "zero_tolerance", m !== "" ? Number(m) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Home Label"
            .value=${i.label ?? ""}
            @change=${(l) => this._setEntityType("home", "label", l.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Home Colour"
            .value=${i.colour ?? ""}
            @change=${(l) => this._setEntityType("home", "colour", l.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">EV</div>
        <div class="flat-body">
          <ha-entity-picker
            label="EV State of Charge"
            .hass=${this.hass}
            .value=${o.soc ?? ""}
            @value-changed=${(l) => this._setEntityType("ev", "soc", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="EV Combined Power"
            .hass=${this.hass}
            .value=${o.power_combined ?? ""}
            @value-changed=${(l) => this._setEntityType("ev", "power_combined", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="EV Daily Usage"
            .hass=${this.hass}
            .value=${o.daily_usage ?? ""}
            @value-changed=${(l) => this._setEntityType("ev", "daily_usage", l.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>EV Show when idle</span>
            <ha-switch
              .checked=${o.show_zero !== !1}
              @change=${(l) => this._setEntityType("ev", "show_zero", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="EV Zero Tolerance"
            type="number"
            min="0"
            .value=${o.zero_tolerance != null ? String(o.zero_tolerance) : ""}
            @change=${(l) => {
      const m = l.target.value;
      this._setEntityType("ev", "zero_tolerance", m !== "" ? Number(m) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="EV Label"
            .value=${o.label ?? ""}
            @change=${(l) => this._setEntityType("ev", "label", l.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="EV Colour"
            .value=${o.colour ?? ""}
            @change=${(l) => this._setEntityType("ev", "colour", l.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Custom</div>
        <div class="flat-body">
          <ha-entity-picker
            label="Custom Import Power"
            .hass=${this.hass}
            .value=${a.power_import ?? ""}
            @value-changed=${(l) => this._setEntityType("custom_1", "power_import", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Custom Export Power"
            .hass=${this.hass}
            .value=${a.power_export ?? ""}
            @value-changed=${(l) => this._setEntityType("custom_1", "power_export", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Custom Combined Power"
            .hass=${this.hass}
            .value=${a.power_combined ?? ""}
            @value-changed=${(l) => this._setEntityType("custom_1", "power_combined", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Custom Daily Usage"
            .hass=${this.hass}
            .value=${a.daily_usage ?? ""}
            @value-changed=${(l) => this._setEntityType("custom_1", "daily_usage", l.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Custom State of Charge"
            .hass=${this.hass}
            .value=${a.soc ?? ""}
            @value-changed=${(l) => this._setEntityType("custom_1", "soc", l.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Custom Show when idle</span>
            <ha-switch
              .checked=${a.show_zero !== !1}
              @change=${(l) => this._setEntityType("custom_1", "show_zero", l.target.checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Custom Zero Tolerance"
            type="number"
            min="0"
            .value=${a.zero_tolerance != null ? String(a.zero_tolerance) : ""}
            @change=${(l) => {
      const m = l.target.value;
      this._setEntityType("custom_1", "zero_tolerance", m !== "" ? Number(m) : void 0);
    }}
          ></ha-textfield>
          <ha-textfield
            label="Custom Label"
            .value=${a.label ?? ""}
            @change=${(l) => this._setEntityType("custom_1", "label", l.target.value || void 0)}
          ></ha-textfield>
          <ha-textfield
            label="Custom Colour"
            .value=${a.colour ?? ""}
            @change=${(l) => this._setEntityType("custom_1", "colour", l.target.value || void 0)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Live Data</div>
        <div class="flat-body">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(n.refresh_interval ?? 5)}
            @change=${(l) => this._set("live_data", {
      ...n,
      refresh_interval: Number(l.target.value)
    })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${n.show_live_badge ?? !0}
              @change=${(l) => this._set("live_data", {
      ...n,
      show_live_badge: l.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">System</div>
        <div class="flat-body">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(r.energy_date_reset ?? 0)}
            @change=${(l) => this._set("system", {
      ...r,
      energy_date_reset: Number(l.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${r.time_format ?? "24h"}
            @value-changed=${(l) => this._set("system", {
      ...r,
      time_format: l.detail.value
    })}
          >
            <mwc-list-item value="12h">12h</mwc-list-item>
            <mwc-list-item value="24h">24h</mwc-list-item>
          </ha-select>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Display</div>
        <div class="flat-body">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(c.decimal_places ?? 1)}
            @change=${(l) => this._set("display", {
      ...c,
      decimal_places: Number(l.target.value)
    })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${c.unit ?? "auto"}
            @value-changed=${(l) => this._set("display", {
      ...c,
      unit: l.detail.value
    })}
          >
            <mwc-list-item value="W">W</mwc-list-item>
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
          <div class="switch-row">
            <span>Animation</span>
            <ha-switch
              .checked=${c.animation ?? !0}
              @change=${(l) => this._set("display", {
      ...c,
      animation: l.target.checked
    })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${c.dynamic_animation_speed ?? !1}
              @change=${(l) => this._set("display", {
      ...c,
      dynamic_animation_speed: l.target.checked
    })}
            ></ha-switch>
          </div>
        </div>
      </div>
    `;
  }
};
H.styles = W`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
    }

    .flat-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .flat-section {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 6px;
      padding: 12px 16px 16px;
    }

    .flat-heading {
      font-size: 0.95em;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 10px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    .detect-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
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
te([
  $({ attribute: !1 })
], H.prototype, "hass", 2);
te([
  $({ attribute: !1 })
], H.prototype, "config", 2);
te([
  ee()
], H.prototype, "_detectStatus", 2);
te([
  ee()
], H.prototype, "_detectIsError", 2);
H = te([
  V("home-energy-card-editor")
], H);
var Ct = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, ce = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Pt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Ct(e, t, o), o;
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
function Ot(s) {
  const e = s.toLowerCase().replace(/[\s_-]/g, ""), t = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => e.includes(i)) ? { label: t, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => e.includes(i)) && !e.includes("off") ? { label: t, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => e.includes(i)) ? { label: t, bg: "#fff8e1", fg: "#e65100" } : {
    label: t,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let R = class extends E {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, x, b, l, m, ke, Se, Ae, Te, Ce, Pe;
    if (!this.config) return f;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, e = this.config.entity_types ?? {}, t = ((x = this.config.display) == null ? void 0 : x.decimal_places) ?? 1, i = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Ot(i) : null, a = ie(s, (l = e.solar) == null ? void 0 : l.daily_usage), n = ie(s, (m = e.home) == null ? void 0 : m.daily_usage), r = ie(s, (ke = e.grid) == null ? void 0 : ke.daily_usage), c = ie(s, (Se = e.grid) == null ? void 0 : Se.daily_export), h = !!((Ae = e.solar) != null && Ae.daily_usage), u = !!((Te = e.home) != null && Te.daily_usage), d = !!((Ce = e.grid) != null && Ce.daily_usage), v = !!((Pe = e.grid) != null && Pe.daily_export), _ = d || v, p = h || u || _;
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
                <span class="stat-val">${oe(a, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${u ? g`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${oe(n, t)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${_ ? g`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${d ? g`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${oe(r, t)}</span>
                    </div>
                  ` : f}
                  ${v ? g`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${oe(c, t)}</span>
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
R.styles = W`
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
  $({ attribute: !1 })
], R.prototype, "hass", 2);
ce([
  $({ attribute: !1 })
], R.prototype, "config", 2);
ce([
  $({ type: Boolean })
], R.prototype, "showTitle", 2);
R = ce([
  V("hec-card-header")
], R);
var zt = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, C = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Nt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && zt(e, t, o), o;
};
const Dt = {
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
}, ge = 38, We = +(2 * Math.PI * ge).toFixed(4);
function et(s, e, t) {
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
    const s = Dt[this.type] ?? Ht, e = this.colour || s.accent, t = this.soc !== null, i = t ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(We * (1 - i / 100)).toFixed(4);
    return g`
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
          <span class="power">${et(this.power, this.unit, this.decimalPlaces)}</span>
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
k.styles = W`
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
C([
  $()
], k.prototype, "type", 2);
C([
  $()
], k.prototype, "label", 2);
C([
  $()
], k.prototype, "colour", 2);
C([
  $({ type: Number })
], k.prototype, "power", 2);
C([
  $({ type: Number })
], k.prototype, "soc", 2);
C([
  $()
], k.prototype, "unit", 2);
C([
  $({ type: Number })
], k.prototype, "decimalPlaces", 2);
k = C([
  V("hec-energy-node")
], k);
function ye(s, e) {
  var o;
  if (!e) return null;
  const t = (o = s[e]) == null ? void 0 : o.state;
  if (!t || t === "unavailable" || t === "unknown") return null;
  const i = parseFloat(t);
  return isNaN(i) ? null : i;
}
function tt(s, e, t) {
  const i = e.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let a;
  if (e.power_combined)
    a = ye(t, e.power_combined);
  else {
    const c = !!e.power_import, h = !!e.power_export;
    if (!c && !h) return o;
    const u = c ? ye(t, e.power_import) : null, d = h ? ye(t, e.power_export) : null;
    if ((!c || u === null) && (!h || d === null)) return o;
    a = (u ?? 0) - (d ?? 0);
  }
  if (a === null) return o;
  if (Math.abs(a) <= i) return { power: a, magnitude: null, direction: "idle" };
  const n = Math.abs(a);
  let r;
  switch (s) {
    case "solar":
      r = "to-home";
      break;
    case "grid":
      r = a > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      r = a > 0 ? "from-home" : "to-home";
      break;
    default:
      r = a > 0 ? "from-home" : "to-home";
  }
  return { power: a, magnitude: n, direction: r };
}
var Ut = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, U = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Mt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Ut(e, t, o), o;
};
const jt = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, It = {
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
function Rt(s) {
  const e = Date.now(), t = e - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let o = 0; o < 24; o++) {
    const a = t + o * 36e5, n = a + 36e5;
    let r = 0, c = 0;
    for (let h = 0; h < s.length; h++) {
      const u = new Date(s[h].last_changed).getTime(), d = h + 1 < s.length ? new Date(s[h + 1].last_changed).getTime() : e, v = Math.max(u, a), _ = Math.min(d, n);
      if (_ <= v) continue;
      const p = parseFloat(s[h].state);
      if (isNaN(p)) continue;
      const y = _ - v;
      r += Math.abs(p) * y, c += y;
    }
    c > 0 && (i[o] = r / c);
  }
  return i;
}
function st(s, e) {
  if (!e) return null;
  const t = s[e];
  if (!t || t.state === "unavailable" || t.state === "unknown") return null;
  const i = parseFloat(t.state);
  return isNaN(i) ? null : i;
}
function Ve(s, e) {
  var o;
  const t = st(s, e);
  return t === null ? null : ((o = s[e]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? t / 1e3 : t;
}
function Fe(s, e) {
  return s === null ? "—" : `${s.toFixed(e)} kWh`;
}
function Bt(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function Ge(s) {
  const e = new Date(s);
  return `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
}
function Wt(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function Vt(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let S = class extends E {
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
        const o = /* @__PURE__ */ new Date(), n = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${e}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, r = await this.hass.callApi("GET", n);
        this._hourly = Rt((r == null ? void 0 : r[0]) ?? []);
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
    var o, a, n, r, c;
    const e = ((a = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : a.decimal_places) ?? 1, t = ((r = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : r.unit) ?? "auto", i = ((c = Lt[this.nodeType]) == null ? void 0 : c[s.direction]) ?? "";
    return g`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${et(s.power, t, e)}</div>
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
    var n, r, c;
    const e = ((n = this.hass) == null ? void 0 : n.states) ?? {}, t = ((c = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : c.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", a = [];
    return s.daily_usage && a.push([i, Fe(Ve(e, s.daily_usage), t)]), s.daily_export && a.push([o, Fe(Ve(e, s.daily_export), t)]), a.length ? g`
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
    const e = ((p = this.hass) == null ? void 0 : p.states) ?? {}, t = s.rate_entity ? e[s.rate_entity] : null, i = s.cost_entity ? e[s.cost_entity] : null, o = s.slots_entity ? e[s.slots_entity] : null, a = t == null ? void 0 : t.state, n = (t == null ? void 0 : t.attributes.unit_of_measurement) ?? "p/kWh", r = i == null ? void 0 : i.state, c = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", h = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], u = Date.now(), d = h.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > u).slice(0, 6), v = a && a !== "unavailable" && a !== "unknown", _ = r && r !== "unavailable" && r !== "unknown";
    return !v && !_ && !d.length ? f : g`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${v ? g`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(a).toFixed(2)} ${n}</span>
          </div>
        ` : f}

        ${_ ? g`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${c}${parseFloat(r).toFixed(2)}</span>
          </div>
        ` : f}

        ${d.length ? g`
          <div class="s-subtitle">Upcoming slots</div>
          ${d.map((y) => {
      const x = y.start ?? y.start_time ?? "", b = y.end ?? y.end_time ?? "", l = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, m = Wt(l);
      return g`
              <div class="slot">
                <span class="slot-dot" style="background:${m};"></span>
                <span class="slot-time">${Ge(x)}–${Ge(b)}</span>
                <span class="slot-rate" style="color:${m};">${(+l).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : f}
      </div>
    `;
  }
  _sectionChart(s) {
    const e = this._hourly.filter((a) => a !== null), t = e.length ? Math.max(...e) : 0, i = /* @__PURE__ */ new Date(), o = (a) => Bt(new Date(i.getTime() - a * 36e5));
    return this._loading ? g`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : g`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${t === 0 ? g`<div class="chart-msg">No data</div>` : g`
              ${Z`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((a, n) => {
      if (a === null || a <= 0) return Z``;
      const r = Math.max(2, a / t * 48);
      return Z`
                      <rect
                        x="${n * 10 + 0.5}" y="${52 - r}"
                        width="9" height="${r}" rx="2"
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
    const s = ((h = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : h[this.nodeType]) ?? {}, e = ((u = this.hass) == null ? void 0 : u.states) ?? {}, t = s.colour || (It[this.nodeType] ?? "#9e9e9e"), i = jt[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), a = tt(this.nodeType, s, e), n = ["battery", "ev"].includes(this.nodeType) && !!s.soc, r = n ? st(e, s.soc) : null;
    return g`
      <div
        class="overlay"
        @click=${(d) => d.target === d.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(t, i, o)}
          ${this._sectionPower(a)}
          ${n ? this._sectionSoc(r) : f}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : f}
          ${this._sectionChart(t)}
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
U([
  $({ attribute: !1 })
], S.prototype, "hass", 2);
U([
  $({ attribute: !1 })
], S.prototype, "config", 2);
U([
  $()
], S.prototype, "nodeType", 2);
U([
  $({ type: Boolean })
], S.prototype, "open", 2);
U([
  ee()
], S.prototype, "_hourly", 2);
U([
  ee()
], S.prototype, "_loading", 2);
S = U([
  V("hec-node-detail")
], S);
const Ft = ["grid", "solar", "battery", "home", "ev"];
var Gt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, he = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Kt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Gt(e, t, o), o;
};
function Zt(s, e) {
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
let B = class extends E {
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
    return tt(s, e, ((o = this.hass) == null ? void 0 : o.states) ?? {});
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
    var o, a, n, r;
    const e = (n = (a = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : a[s]) == null ? void 0 : n.soc;
    if (!e || !this.hass) return null;
    const t = (r = this.hass.states[e]) == null ? void 0 : r.state;
    if (!t || t === "unavailable" || t === "unknown") return null;
    const i = parseFloat(t);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var t, i, o, a;
    const s = ((i = (t = this.config) == null ? void 0 : t.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, e = ((a = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : a.animation) !== !1;
    return Z`
      ${["solar", "grid", "battery", "ev"].filter((n) => this._isVisible(n)).map((n) => {
      const r = this._flowInfo(n), [c, h, u, d] = Yt[n], v = r.direction === "idle", _ = r.direction === "from-home", p = Zt(r.magnitude, s && !v), y = [
        "flow-line",
        _ ? "reverse" : "",
        v ? "idle" : "",
        e ? "" : "paused"
      ].filter(Boolean).join(" ");
      return Z`
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
    var r, c, h;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((c = (r = this.config) == null ? void 0 : r.entity_types) == null ? void 0 : c[s]) ?? {}, a = ((h = this.config) == null ? void 0 : h.display) ?? {}, n = this._flowInfo(s);
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
      (e) => !Ft.includes(e)
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
    var r, c, h;
    const i = this._isVisible(s), o = ((c = (r = this.config) == null ? void 0 : r.entity_types) == null ? void 0 : c[s]) ?? {}, a = ((h = this.config) == null ? void 0 : h.display) ?? {}, n = this._flowInfo(s);
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
  $({ attribute: !1 })
], B.prototype, "hass", 2);
he([
  $({ attribute: !1 })
], B.prototype, "config", 2);
he([
  ee()
], B.prototype, "_dialogType", 2);
B = he([
  V("hec-flow-layout")
], B);
var Jt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, Ee = (s, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Qt(e, t) : e, a = s.length - 1, n; a >= 0; a--)
    (n = s[a]) && (o = (i ? n(e, t, o) : n(o)) || o);
  return i && o && Jt(e, t, o), o;
};
let Q = class extends E {
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
Q.styles = W`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ee([
  $({ attribute: !1 })
], Q.prototype, "hass", 2);
Ee([
  $({ attribute: !1 })
], Q.prototype, "config", 2);
Q = Ee([
  V("home-energy-card")
], Q);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  Q as HomeEnergyCard
};
