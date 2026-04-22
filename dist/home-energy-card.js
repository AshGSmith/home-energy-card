/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, xt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = Symbol(), Je = /* @__PURE__ */ new WeakMap();
let fs = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (xt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Je.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Je.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xs = (s) => new fs(typeof s == "string" ? s : s + "", void 0, Et), W = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new fs(e, s, Et);
}, Es = (s, t) => {
  if (xt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = dt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, Qe = xt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return xs(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Cs, defineProperty: As, getOwnPropertyDescriptor: Ss, getOwnPropertyNames: Ps, getOwnPropertySymbols: ks, getPrototypeOf: Ts } = Object, T = globalThis, Xe = T.trustedTypes, Os = Xe ? Xe.emptyScript : "", _t = T.reactiveElementPolyfillSupport, X = (s, t) => s, pt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Os : null;
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
} }, Ct = (s, t) => !Cs(s, t), ts = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Ct };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let j = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ts) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && As(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = Ss(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ts;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const t = Ts(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const e = this.properties, i = [...Ps(e), ...ks(e)];
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
      for (const o of i) e.unshift(Qe(o));
    } else t !== void 0 && e.push(Qe(t));
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
    return Es(t, this.constructor.elementStyles), t;
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
      const a = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : pt).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : pt;
      this._$Em = o;
      const d = l.fromAttribute(e, c.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    var a;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? Ct)(n, e) || i.useDefault && i.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: n }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: c } = a, l = this[n];
        c !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, a, l);
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[X("elementProperties")] = /* @__PURE__ */ new Map(), j[X("finalized")] = /* @__PURE__ */ new Map(), _t == null || _t({ ReactiveElement: j }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, es = (s) => s, ut = tt.trustedTypes, ss = ut ? ut.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, gs = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, ys = "?" + k, zs = `<${ys}>`, D = document, st = () => D.createComment(""), it = (s) => s === null || typeof s != "object" && typeof s != "function", At = Array.isArray, Ns = (s) => At(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", mt = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, is = /-->/g, os = />/g, z = RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ns = /'/g, as = /"/g, _s = /^(?:script|style|textarea|title)$/i, ms = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), _ = ms(1), et = ms(2), R = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), rs = /* @__PURE__ */ new WeakMap(), H = D.createTreeWalker(D, 129);
function vs(s, t) {
  if (!At(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ss !== void 0 ? ss.createHTML(t) : t;
}
const Hs = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Q;
  for (let c = 0; c < e; c++) {
    const l = s[c];
    let d, f, p = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, f = a.exec(l), f !== null); ) m = a.lastIndex, a === Q ? f[1] === "!--" ? a = is : f[1] !== void 0 ? a = os : f[2] !== void 0 ? (_s.test(f[2]) && (o = RegExp("</" + f[2], "g")), a = z) : f[3] !== void 0 && (a = z) : a === z ? f[0] === ">" ? (a = o ?? Q, p = -1) : f[1] === void 0 ? p = -2 : (p = a.lastIndex - f[2].length, d = f[1], a = f[3] === void 0 ? z : f[3] === '"' ? as : ns) : a === as || a === ns ? a = z : a === is || a === os ? a = Q : (a = z, o = void 0);
    const v = a === z && s[c + 1].startsWith("/>") ? " " : "";
    n += a === Q ? l + zs : p >= 0 ? (i.push(d), l.slice(0, p) + gs + l.slice(p) + k + v) : l + k + (p === -2 ? c : v);
  }
  return [vs(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ot {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, l = this.parts, [d, f] = Hs(t, e);
    if (this.el = ot.createElement(d, i), H.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = H.nextNode()) !== null && l.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(gs)) {
          const m = f[a++], v = o.getAttribute(p).split(k), u = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: u[2], strings: v, ctor: u[1] === "." ? Ds : u[1] === "?" ? Ms : u[1] === "@" ? js : ft }), o.removeAttribute(p);
        } else p.startsWith(k) && (l.push({ type: 6, index: n }), o.removeAttribute(p));
        if (_s.test(o.tagName)) {
          const p = o.textContent.split(k), m = p.length - 1;
          if (m > 0) {
            o.textContent = ut ? ut.emptyScript : "";
            for (let v = 0; v < m; v++) o.append(p[v], st()), H.nextNode(), l.push({ type: 2, index: ++n });
            o.append(p[m], st());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ys) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(k, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += k.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(s, t, e = s, i) {
  var a, c;
  if (t === R) return t;
  let o = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const n = it(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = I(s, o._$AS(s, t.values), o, i)), t;
}
class Us {
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
    H.currentNode = o;
    let n = H.nextNode(), a = 0, c = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new rt(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Ls(n, this, t)), this._$AV.push(d), l = i[++c];
      }
      a !== (l == null ? void 0 : l.index) && (n = H.nextNode(), a++);
    }
    return H.currentNode = D, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class rt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = I(this, t, e), it(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ns(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && it(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ot.createElement(vs(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const a = new Us(o, this), c = a.u(this.options);
      a.p(e), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = rs.get(t.strings);
    return e === void 0 && rs.set(t.strings, e = new ot(t)), e;
  }
  k(t) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new rt(this.O(st()), this.O(st()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = es(t).nextSibling;
      es(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = I(this, t, e, 0), a = !it(t) || t !== this._$AH && t !== R, a && (this._$AH = t);
    else {
      const c = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = I(this, c[i + l], e, l), d === R && (d = this._$AH[l]), a || (a = !it(d) || d !== this._$AH[l]), d === g ? t = g : t !== g && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ds extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Ms extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class js extends ft {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? g) === R) return;
    const i = this._$AH, o = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== g && (i === g || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ls {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const vt = tt.litHtmlPolyfillSupport;
vt == null || vt(ot, rt), (tt.litHtmlVersions ?? (tt.litHtmlVersions = [])).push("3.3.2");
const Rs = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new rt(t.insertBefore(st(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis;
class E extends j {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rs(e, this.renderRoot, this.renderOptions);
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
var us;
E._$litElement$ = !0, E.finalized = !0, (us = U.litElementHydrateSupport) == null || us.call(U, { LitElement: E });
const bt = U.litElementPolyfillSupport;
bt == null || bt({ LitElement: E });
(U.litElementVersions ?? (U.litElementVersions = [])).push("4.2.2");
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
const Is = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Ct }, Bs = (s = Is, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, l, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, s, c), c;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(c) {
      const l = this[a];
      t.call(this, c), this.requestUpdate(a, l, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function b(s) {
  return (t, e) => typeof e == "object" ? Bs(s, t, e) : ((i, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function St(s) {
  return b({ ...s, state: !0, attribute: !1 });
}
const Pt = (s) => s.attributes.device_class ?? "", kt = (s) => s.attributes.unit_of_measurement ?? "", Tt = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function N(...s) {
  return (t, e) => {
    let i = 0;
    Pt(e) === "power" && (i += 4), ["W", "kW"].includes(kt(e)) && (i += 2);
    const o = Tt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function L(...s) {
  return (t, e) => {
    let i = 0;
    Pt(e) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(kt(e)) && (i += 2);
    const o = Tt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function cs(...s) {
  return (t, e) => {
    let i = 0;
    Pt(e) === "battery" && (i += 4), kt(e) === "%" && (i += 2);
    const o = Tt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function ct(s, t = []) {
  return (e, i) => {
    const o = e.toLowerCase();
    if (t.some((a) => o.includes(a))) return 0;
    let n = 0;
    for (const a of s) o.includes(a) && (n += 4);
    return n;
  };
}
function w(s, t, e, i) {
  let o, n = 0;
  for (const a of s) {
    if (i.has(a)) continue;
    const c = t[a];
    if (!c) continue;
    const l = e(a, c);
    l > n && (n = l, o = a);
  }
  return o && i.add(o), o;
}
function Vs(s, t, e) {
  const i = Object.values(t).some(
    ($) => $.platform === "octopus_energy" && !$.disabled_by
  ), o = Object.keys(s).filter(($) => $.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    ($) => $.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], c = {}, l = {}, d = w(
    n,
    s,
    ct(["_current_rate"], ["export", "accumulative"]),
    e
  );
  d && (c.rate_entity = d, a.push("rate"));
  const f = w(
    n,
    s,
    ct(["_current_accumulative_cost"]),
    e
  );
  f && (c.cost_entity = f, a.push("cost"));
  const p = w(
    n,
    s,
    ct(["_current_day_rates"]),
    e
  );
  p && (c.slots_entity = p, a.push("slots"));
  const m = w(
    o.filter(($) => $.startsWith("binary_sensor.")),
    s,
    ct(["_intelligent_dispatching"]),
    e
  );
  m && (c.dispatches_entity = m, a.push("dispatching")), Object.keys(c).length && (l.octopus = c);
  const v = w(
    n,
    s,
    N("import", "demand", "current"),
    e
  );
  v && (l.power_import = v, a.push("import power"));
  const u = w(
    n,
    s,
    N("export", "demand", "current"),
    e
  );
  u && (l.power_export = u, a.push("export power"));
  const y = w(
    n,
    s,
    L("import", "accumulative", "consumption"),
    e
  );
  y && (l.daily_usage = y, a.push("daily import"));
  const x = w(
    n,
    s,
    L("export", "accumulative"),
    e
  );
  return x && (l.daily_export = x, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: a };
}
function Ws(s, t, e) {
  const i = Object.values(t).filter(
    (u) => u.platform === "tesla_custom" && !u.disabled_by
  ), o = Object.keys(s).some(
    (u) => u.includes("powerwall") || u.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((u) => u.entity_id) : Object.keys(s).filter((u) => u.includes("powerwall") || u.includes("tesla")), a = n.filter((u) => u.includes("powerwall")), c = n.filter((u) => !u.includes("powerwall")), l = ["Tesla"], d = {};
  if (a.length > 0) {
    const u = {}, y = w(
      a,
      s,
      cs("battery", "soc", "charge", "percent"),
      e
    );
    y && (u.soc = y);
    const x = w(
      a,
      s,
      N("battery", "power", "charge", "discharge"),
      e
    );
    x && (u.power_combined = x);
    const $ = w(
      a,
      s,
      L("battery", "today", "daily", "charged"),
      e
    );
    $ && (u.daily_usage = $), Object.keys(u).length && (d.battery = u, l.push("Powerwall"));
  }
  const f = w(
    n,
    s,
    N("solar"),
    e
  );
  if (f) {
    const u = { power_combined: f }, y = w(
      n,
      s,
      L("solar"),
      e
    );
    y && (u.daily_usage = y), d.solar = u, l.push("solar");
  }
  const p = w(
    n,
    s,
    N("load", "home", "house"),
    e
  );
  if (p) {
    const u = { power_combined: p }, y = w(
      n,
      s,
      L("load", "home", "house"),
      e
    );
    y && (u.daily_usage = y), d.home = u, l.push("home load");
  }
  const m = w(
    n,
    s,
    N("grid"),
    e
  );
  m && (d.grid = { power_combined: m }, l.push("grid"));
  const v = w(
    c,
    s,
    cs("battery", "battery_level", "soc", "charge"),
    e
  );
  if (v) {
    const u = { soc: v }, y = w(
      c,
      s,
      N("charg", "power"),
      e
    );
    y && (u.power_combined = y);
    const x = w(
      c,
      s,
      L("charg", "energy"),
      e
    );
    x && (u.daily_usage = x), d.ev = u, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function Fs(s) {
  var l, d;
  const t = s, e = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = Ws(e, i, o), a = Vs(e, i, o), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), a) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (l = a.entity_types) != null && l.grid) {
      const f = a.entity_types.grid;
      c.entity_types.grid = {
        ...c.entity_types.grid,
        ...f,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: f.power_import || (d = c.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    a.tariff_entity && (c.tariff_entity = a.tariff_entity), c.summary.push(...a.summary ?? []);
  }
  return c;
}
function Gs(s, t, e = !1) {
  const i = { ...s };
  t.tariff_entity && (e || !s.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = s.entity_types ?? {}, n = { ...o };
  for (const [a, c] of Object.entries(t.entity_types)) {
    const l = o[a] ?? {}, d = { ...l };
    for (const [f, p] of Object.entries(c))
      p !== void 0 && (e || !l[f]) && (d[f] = p);
    n[a] = d;
  }
  return i.entity_types = n, i;
}
var Ks = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, Ot = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Zs(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && Ks(t, e, o), o;
};
let nt = class extends E {
  setConfig(s) {
    this.config = s;
  }
  render() {
    var s, t, e, i, o, n, a, c, l, d, f, p, m, v, u, y, x, $, S, P, G, K, Z, q, Y, J, Nt, Ht, Ut, Dt, Mt, jt, Lt, Rt, It, Bt, Vt, Wt, Ft, Gt, Kt, Zt, qt, Yt, Jt, Qt, Xt, te, ee, se, ie, oe, ne, ae, re, ce, le, he, de, pe, ue, fe, ge, ye, _e, me, ve, be, $e, we, xe, Ee, Ce, Ae, Se, Pe, ke, Te, Oe, ze, Ne, He, Ue, De, Me, je, Le, Re, Ie, Be, Ve, We, Fe, Ge, Ke, Ze, qe, Ye;
    return this.config ? _`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: Gs(this.config, Fs(this.hass), !1)
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
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Grid">
        <div class="section-body">
          <ha-selector
            label="Grid Import Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((t = (s = this.config.entity_types) == null ? void 0 : s.grid) == null ? void 0 : t.power_import) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
            .value=${((i = (e = this.config.entity_types) == null ? void 0 : e.grid) == null ? void 0 : i.power_export) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
            .value=${((n = (o = this.config.entity_types) == null ? void 0 : o.grid) == null ? void 0 : n.power_combined) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
            .value=${((c = (a = this.config.entity_types) == null ? void 0 : a.grid) == null ? void 0 : c.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
            <span>Grid Show when idle</span>
            <ha-switch
              .checked=${((d = (l = this.config.entity_types) == null ? void 0 : l.grid) == null ? void 0 : d.show_zero) ?? !0}
              @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
            .value=${((p = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : p.zero_tolerance) != null ? String((v = (m = this.config.entity_types) == null ? void 0 : m.grid) == null ? void 0 : v.zero_tolerance) : ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
          <ha-textfield
            label="Grid Label"
            .value=${((y = (u = this.config.entity_types) == null ? void 0 : u.grid) == null ? void 0 : y.label) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
          <ha-textfield
            label="Grid Colour"
            .value=${(($ = (x = this.config.entity_types) == null ? void 0 : x.grid) == null ? void 0 : $.colour) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.grid) ?? {},
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
            .value=${((P = (S = this.config.entity_types) == null ? void 0 : S.solar) == null ? void 0 : P.power_combined) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
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
            .value=${((K = (G = this.config.entity_types) == null ? void 0 : G.solar) == null ? void 0 : K.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
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
              .checked=${((q = (Z = this.config.entity_types) == null ? void 0 : Z.solar) == null ? void 0 : q.show_zero) ?? !0}
              @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
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
            .value=${((J = (Y = this.config.entity_types) == null ? void 0 : Y.solar) == null ? void 0 : J.zero_tolerance) != null ? String((Ht = (Nt = this.config.entity_types) == null ? void 0 : Nt.solar) == null ? void 0 : Ht.zero_tolerance) : ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
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
          <ha-textfield
            label="Solar Label"
            .value=${((Dt = (Ut = this.config.entity_types) == null ? void 0 : Ut.solar) == null ? void 0 : Dt.label) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
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
          <ha-textfield
            label="Solar Colour"
            .value=${((jt = (Mt = this.config.entity_types) == null ? void 0 : Mt.solar) == null ? void 0 : jt.colour) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.solar) ?? {},
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
            .value=${((Rt = (Lt = this.config.entity_types) == null ? void 0 : Lt.battery) == null ? void 0 : Rt.soc) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
            .value=${((Bt = (It = this.config.entity_types) == null ? void 0 : It.battery) == null ? void 0 : Bt.power_combined) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
            .value=${((Wt = (Vt = this.config.entity_types) == null ? void 0 : Vt.battery) == null ? void 0 : Wt.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
              .checked=${((Gt = (Ft = this.config.entity_types) == null ? void 0 : Ft.battery) == null ? void 0 : Gt.show_zero) ?? !0}
              @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
            .value=${((Zt = (Kt = this.config.entity_types) == null ? void 0 : Kt.battery) == null ? void 0 : Zt.zero_tolerance) != null ? String((Yt = (qt = this.config.entity_types) == null ? void 0 : qt.battery) == null ? void 0 : Yt.zero_tolerance) : ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
          <ha-textfield
            label="Battery Label"
            .value=${((Qt = (Jt = this.config.entity_types) == null ? void 0 : Jt.battery) == null ? void 0 : Qt.label) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
          <ha-textfield
            label="Battery Colour"
            .value=${((te = (Xt = this.config.entity_types) == null ? void 0 : Xt.battery) == null ? void 0 : te.colour) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.battery) ?? {},
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
            .value=${((se = (ee = this.config.entity_types) == null ? void 0 : ee.home) == null ? void 0 : se.power_combined) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
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
            .value=${((oe = (ie = this.config.entity_types) == null ? void 0 : ie.home) == null ? void 0 : oe.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
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
              .checked=${((ae = (ne = this.config.entity_types) == null ? void 0 : ne.home) == null ? void 0 : ae.show_zero) ?? !0}
              @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
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
            .value=${((ce = (re = this.config.entity_types) == null ? void 0 : re.home) == null ? void 0 : ce.zero_tolerance) != null ? String((he = (le = this.config.entity_types) == null ? void 0 : le.home) == null ? void 0 : he.zero_tolerance) : ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
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
          <ha-textfield
            label="Home Label"
            .value=${((pe = (de = this.config.entity_types) == null ? void 0 : de.home) == null ? void 0 : pe.label) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
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
          <ha-textfield
            label="Home Colour"
            .value=${((fe = (ue = this.config.entity_types) == null ? void 0 : ue.home) == null ? void 0 : fe.colour) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.home) ?? {},
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
            .value=${((ye = (ge = this.config.entity_types) == null ? void 0 : ge.ev) == null ? void 0 : ye.power_combined) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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
            .value=${((me = (_e = this.config.entity_types) == null ? void 0 : _e.ev) == null ? void 0 : me.soc) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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
            .value=${((be = (ve = this.config.entity_types) == null ? void 0 : ve.ev) == null ? void 0 : be.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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
              .checked=${((we = ($e = this.config.entity_types) == null ? void 0 : $e.ev) == null ? void 0 : we.show_zero) ?? !0}
              @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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
            .value=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.ev) == null ? void 0 : Ee.zero_tolerance) != null ? String((Ae = (Ce = this.config.entity_types) == null ? void 0 : Ce.ev) == null ? void 0 : Ae.zero_tolerance) : ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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
          <ha-textfield
            label="EV Label"
            .value=${((Pe = (Se = this.config.entity_types) == null ? void 0 : Se.ev) == null ? void 0 : Pe.label) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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
          <ha-textfield
            label="EV Colour"
            .value=${((Te = (ke = this.config.entity_types) == null ? void 0 : ke.ev) == null ? void 0 : Te.colour) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.ev) ?? {},
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

      <ha-expansion-panel header="Custom">
        <div class="section-body">
          <ha-selector
            label="Custom Import Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((ze = (Oe = this.config.entity_types) == null ? void 0 : Oe.custom_1) == null ? void 0 : ze.power_import) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
            label="Custom Export Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((He = (Ne = this.config.entity_types) == null ? void 0 : Ne.custom_1) == null ? void 0 : He.power_export) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
            label="Custom Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((De = (Ue = this.config.entity_types) == null ? void 0 : Ue.custom_1) == null ? void 0 : De.power_combined) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
            label="Custom Daily Usage"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((je = (Me = this.config.entity_types) == null ? void 0 : Me.custom_1) == null ? void 0 : je.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
            label="Custom State of Charge"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((Re = (Le = this.config.entity_types) == null ? void 0 : Le.custom_1) == null ? void 0 : Re.soc) ?? ""}
            @value-changed=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
          <div class="switch-row">
            <span>Custom Show when idle</span>
            <ha-switch
              .checked=${((Be = (Ie = this.config.entity_types) == null ? void 0 : Ie.custom_1) == null ? void 0 : Be.show_zero) ?? !0}
              @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
            label="Custom Zero Tolerance"
            type="number"
            min="0"
            .value=${((We = (Ve = this.config.entity_types) == null ? void 0 : Ve.custom_1) == null ? void 0 : We.zero_tolerance) != null ? String((Ge = (Fe = this.config.entity_types) == null ? void 0 : Fe.custom_1) == null ? void 0 : Ge.zero_tolerance) : ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
          <ha-textfield
            label="Custom Label"
            .value=${((Ze = (Ke = this.config.entity_types) == null ? void 0 : Ke.custom_1) == null ? void 0 : Ze.label) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
          <ha-textfield
            label="Custom Colour"
            .value=${((Ye = (qe = this.config.entity_types) == null ? void 0 : qe.custom_1) == null ? void 0 : Ye.colour) ?? ""}
            @change=${(h) => {
      var r;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                custom_1: {
                  ...((r = this.config.entity_types) == null ? void 0 : r.custom_1) ?? {},
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
    ` : g;
  }
};
nt.styles = W`
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
  `;
Ot([
  b({ attribute: !1 })
], nt.prototype, "hass", 2);
Ot([
  b({ attribute: !1 })
], nt.prototype, "config", 2);
nt = Ot([
  F("home-energy-card-editor")
], nt);
var qs = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, gt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ys(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && qs(t, e, o), o;
};
function lt(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : e.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function ht(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Js(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let B = class extends E {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, x, $, S, P, G, K, Z, q, Y, J;
    if (!this.config) return g;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = this.config.entity_types ?? {}, e = ((x = this.config.display) == null ? void 0 : x.decimal_places) ?? 1, i = this.config.tariff_entity ? ($ = s[this.config.tariff_entity]) == null ? void 0 : $.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Js(i) : null, n = lt(s, (S = t.solar) == null ? void 0 : S.daily_usage), a = lt(s, (P = t.home) == null ? void 0 : P.daily_usage), c = lt(s, (G = t.grid) == null ? void 0 : G.daily_usage), l = lt(s, (K = t.grid) == null ? void 0 : K.daily_export), d = !!((Z = t.solar) != null && Z.daily_usage), f = !!((q = t.home) != null && q.daily_usage), p = !!((Y = t.grid) != null && Y.daily_usage), m = !!((J = t.grid) != null && J.daily_export), v = p || m, u = d || f || v;
    return _`
      <div class="header">

        ${this.showTitle || o ? _`
          <div class="title-row">
            ${this.showTitle ? _`<span class="title">${this.config.title ?? "Home Energy"}</span>` : g}
            ${o ? _`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : g}
          </div>
        ` : g}

        ${u ? _`
          <div class="stats-row">

            ${d ? _`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${ht(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${f ? _`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${ht(a, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${v ? _`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${ht(c, e)}</span>
                    </div>
                  ` : g}
                  ${m ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${ht(l, e)}</span>
                    </div>
                  ` : g}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : g}

          </div>
        ` : g}

      </div>
    `;
  }
};
B.styles = W`
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
gt([
  b({ attribute: !1 })
], B.prototype, "hass", 2);
gt([
  b({ attribute: !1 })
], B.prototype, "config", 2);
gt([
  b({ type: Boolean })
], B.prototype, "showTitle", 2);
B = gt([
  F("hec-card-header")
], B);
var Qs = Object.defineProperty, Xs = Object.getOwnPropertyDescriptor, O = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Xs(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && Qs(t, e, o), o;
};
const ti = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, ei = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, wt = 38, ls = +(2 * Math.PI * wt).toFixed(4);
function bs(s, t, e) {
  if (s === null) return "—";
  const i = Math.abs(s);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let C = class extends E {
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
    const s = ti[this.type] ?? ei, t = this.colour || s.accent, e = this.soc !== null, i = e ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(ls * (1 - i / 100)).toFixed(4);
    return _`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${e ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${wt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${wt}"
            style="stroke-dasharray:${ls};stroke-dashoffset:${o};"
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
          <span class="power">${bs(this.power, this.unit, this.decimalPlaces)}</span>
          ${e ? _`
            <span class="soc-pct">
              <ha-icon class="soc-icon" icon="mdi:battery"></ha-icon>
              ${this.soc.toFixed(0)}%
            </span>
          ` : g}
        </div>

      </div>
    `;
  }
};
C.styles = W`
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
O([
  b()
], C.prototype, "type", 2);
O([
  b()
], C.prototype, "label", 2);
O([
  b()
], C.prototype, "colour", 2);
O([
  b({ type: Number })
], C.prototype, "power", 2);
O([
  b({ type: Number })
], C.prototype, "soc", 2);
O([
  b()
], C.prototype, "unit", 2);
O([
  b({ type: Number })
], C.prototype, "decimalPlaces", 2);
C = O([
  F("hec-energy-node")
], C);
function $t(s, t) {
  var o;
  if (!t) return null;
  const e = (o = s[t]) == null ? void 0 : o.state;
  if (!e || e === "unavailable" || e === "unknown") return null;
  const i = parseFloat(e);
  return isNaN(i) ? null : i;
}
function $s(s, t, e) {
  const i = t.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = $t(e, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return o;
    const f = l ? $t(e, t.power_import) : null, p = d ? $t(e, t.power_export) : null;
    if ((!l || f === null) && (!d || p === null)) return o;
    n = (f ?? 0) - (p ?? 0);
  }
  if (n === null) return o;
  if (Math.abs(n) <= i) return { power: n, magnitude: null, direction: "idle" };
  const a = Math.abs(n);
  let c;
  switch (s) {
    case "solar":
      c = "to-home";
      break;
    case "grid":
      c = n > 0 ? "to-home" : "from-home";
      break;
    case "battery":
    case "ev":
      c = n > 0 ? "from-home" : "to-home";
      break;
    default:
      c = n > 0 ? "from-home" : "to-home";
  }
  return { power: n, magnitude: a, direction: c };
}
var si = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, M = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ii(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && si(t, e, o), o;
};
const oi = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, ni = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, ai = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function ri(s) {
  const t = Date.now(), e = t - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let o = 0; o < 24; o++) {
    const n = e + o * 36e5, a = n + 36e5;
    let c = 0, l = 0;
    for (let d = 0; d < s.length; d++) {
      const f = new Date(s[d].last_changed).getTime(), p = d + 1 < s.length ? new Date(s[d + 1].last_changed).getTime() : t, m = Math.max(f, n), v = Math.min(p, a);
      if (v <= m) continue;
      const u = parseFloat(s[d].state);
      if (isNaN(u)) continue;
      const y = v - m;
      c += Math.abs(u) * y, l += y;
    }
    l > 0 && (i[o] = c / l);
  }
  return i;
}
function ws(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : i;
}
function hs(s, t) {
  var o;
  const e = ws(s, t);
  return e === null ? null : ((o = s[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function ds(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function ci(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function ps(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function li(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function hi(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let A = class extends E {
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
        const o = /* @__PURE__ */ new Date(), a = `history/period/${new Date(o.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${o.toISOString()}`, c = await this.hass.callApi("GET", a);
        this._hourly = ri((c == null ? void 0 : c[0]) ?? []);
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
    return _`
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
    var o, n, a, c, l;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.unit) ?? "auto", i = ((l = ai[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return _`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${bs(s.power, e, t)}</div>
        ${i ? _`<div class="power-sub">${i}</div>` : g}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return g;
    const t = hi(s);
    return _`
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
    var a, c, l;
    const t = ((a = this.hass) == null ? void 0 : a.states) ?? {}, e = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([i, ds(hs(t, s.daily_usage), e)]), s.daily_export && n.push([o, ds(hs(t, s.daily_export), e)]), n.length ? _`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, f]) => _`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${f}</span>
          </div>
        `)}
      </div>
    ` : g;
  }
  _sectionOctopus(s) {
    var u;
    const t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, i = s.cost_entity ? t[s.cost_entity] : null, o = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, a = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", c = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", d = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], f = Date.now(), p = d.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > f).slice(0, 6), m = n && n !== "unavailable" && n !== "unknown", v = c && c !== "unavailable" && c !== "unknown";
    return !m && !v && !p.length ? g : _`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${m ? _`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${a}</span>
          </div>
        ` : g}

        ${v ? _`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${l}${parseFloat(c).toFixed(2)}</span>
          </div>
        ` : g}

        ${p.length ? _`
          <div class="s-subtitle">Upcoming slots</div>
          ${p.map((y) => {
      const x = y.start ?? y.start_time ?? "", $ = y.end ?? y.end_time ?? "", S = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, P = li(S);
      return _`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${ps(x)}–${ps($)}</span>
                <span class="slot-rate" style="color:${P};">${(+S).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : g}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => ci(new Date(i.getTime() - n * 36e5));
    return this._loading ? _`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : _`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? _`<div class="chart-msg">No data</div>` : _`
              ${et`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return et``;
      const c = Math.max(2, n / e * 48);
      return et`
                      <rect
                        x="${a * 10 + 0.5}" y="${52 - c}"
                        width="9" height="${c}" rx="2"
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
    var l, d, f;
    if (!this.open || !this.nodeType) return g;
    const s = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, e = s.colour || (ni[this.nodeType] ?? "#9e9e9e"), i = oi[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = $s(this.nodeType, s, t), a = ["battery", "ev"].includes(this.nodeType) && !!s.soc, c = a ? ws(t, s.soc) : null;
    return _`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, i, o)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(c) : g}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : g}
          ${this._sectionChart(e)}
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
M([
  b({ attribute: !1 })
], A.prototype, "hass", 2);
M([
  b({ attribute: !1 })
], A.prototype, "config", 2);
M([
  b()
], A.prototype, "nodeType", 2);
M([
  b({ type: Boolean })
], A.prototype, "open", 2);
M([
  St()
], A.prototype, "_hourly", 2);
M([
  St()
], A.prototype, "_loading", 2);
A = M([
  F("hec-node-detail")
], A);
const di = ["grid", "solar", "battery", "home", "ev"];
var pi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, yt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ui(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && pi(t, e, o), o;
};
function fi(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const gi = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, yi = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let V = class extends E {
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
    return $s(s, t, ((o = this.hass) == null ? void 0 : o.states) ?? {});
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
    var o, n, a, c;
    const t = (a = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[s]) == null ? void 0 : a.soc;
    if (!t || !this.hass) return null;
    const e = (c = this.hass.states[t]) == null ? void 0 : c.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const i = parseFloat(e);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _svgLines() {
    var e, i, o, n;
    const s = ((i = (e = this.config) == null ? void 0 : e.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.animation) !== !1;
    return et`
      ${["solar", "grid", "battery", "ev"].filter((a) => this._isVisible(a)).map((a) => {
      const c = this._flowInfo(a), [l, d, f, p] = yi[a], m = c.direction === "idle", v = c.direction === "from-home", u = fi(c.magnitude, s && !m), y = [
        "flow-line",
        v ? "reverse" : "",
        m ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return et`
            <line
              x1="${l}" y1="${d}" x2="${f}" y2="${p}"
              stroke="${gi[a]}"
              class="${y}"
              style="--flow-dur:${u}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var c, l, d;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return _`
      <hec-energy-node
        class="${t}${i ? "" : " hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .colour=${o.colour ?? ""}
        .power=${a.power}
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
      (t) => !di.includes(t)
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
    var c, l, d;
    const i = this._isVisible(s), o = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return _`
      <hec-energy-node
        style="grid-column:${t}; grid-row:${e}"
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
    const t = s.detail;
    t != null && t.nodeType && (this._dialogType = t.nodeType);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.config) return g;
    const s = this._customTypes(), t = 2 + Math.ceil(s.length / 3);
    return _`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${t}" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : g}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : g}

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
V.styles = W`
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
yt([
  b({ attribute: !1 })
], V.prototype, "hass", 2);
yt([
  b({ attribute: !1 })
], V.prototype, "config", 2);
yt([
  St()
], V.prototype, "_dialogType", 2);
V = yt([
  F("hec-flow-layout")
], V);
var _i = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, zt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? mi(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && _i(t, e, o), o;
};
let at = class extends E {
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
    return this.config ? _`
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
    ` : g;
  }
};
at.styles = W`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
zt([
  b({ attribute: !1 })
], at.prototype, "hass", 2);
zt([
  b({ attribute: !1 })
], at.prototype, "config", 2);
at = zt([
  F("home-energy-card")
], at);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  at as HomeEnergyCard
};
