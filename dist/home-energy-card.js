/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, St = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = Symbol(), Fe = /* @__PURE__ */ new WeakMap();
let ls = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (St && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Fe.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Fe.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vs = (s) => new ls(typeof s == "string" ? s : s + "", void 0, At), F = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new ls(e, s, At);
}, bs = (s, t) => {
  if (St) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = pt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, Ge = St ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return vs(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $s, defineProperty: ws, getOwnPropertyDescriptor: xs, getOwnPropertyNames: Es, getOwnPropertySymbols: Cs, getPrototypeOf: Ss } = Object, z = globalThis, Ke = z.trustedTypes, As = Ke ? Ke.emptyScript : "", bt = z.reactiveElementPolyfillSupport, tt = (s, t) => s, ft = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? As : null;
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
} }, Tt = (s, t) => !$s(s, t), Ye = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: Tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), z.litPropertyMetadata ?? (z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let j = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ye) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && ws(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = xs(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = Ss(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const e = this.properties, i = [...Es(e), ...Cs(e)];
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
      for (const o of i) e.unshift(Ge(o));
    } else t !== void 0 && e.push(Ge(t));
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
    return bs(t, this.constructor.elementStyles), t;
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
      const a = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : ft).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : ft;
      this._$Em = o;
      const d = l.fromAttribute(e, c.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    var a;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? Tt)(n, e) || i.useDefault && i.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[tt("elementProperties")] = /* @__PURE__ */ new Map(), j[tt("finalized")] = /* @__PURE__ */ new Map(), bt == null || bt({ ReactiveElement: j }), (z.reactiveElementVersions ?? (z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, Ze = (s) => s, gt = et.trustedTypes, qe = gt ? gt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, hs = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ds = "?" + O, Ts = `<${ds}>`, L = document, it = () => L.createComment(""), ot = (s) => s === null || typeof s != "object" && typeof s != "function", kt = Array.isArray, ks = (s) => kt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", $t = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Je = /-->/g, Xe = />/g, N = RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qe = /'/g, ts = /"/g, ps = /^(?:script|style|textarea|title)$/i, us = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), _ = us(1), st = us(2), I = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), es = /* @__PURE__ */ new WeakMap(), U = L.createTreeWalker(L, 129);
function fs(s, t) {
  if (!kt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qe !== void 0 ? qe.createHTML(t) : t;
}
const Ps = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Q;
  for (let c = 0; c < e; c++) {
    const l = s[c];
    let d, p, u = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, p = a.exec(l), p !== null); ) m = a.lastIndex, a === Q ? p[1] === "!--" ? a = Je : p[1] !== void 0 ? a = Xe : p[2] !== void 0 ? (ps.test(p[2]) && (o = RegExp("</" + p[2], "g")), a = N) : p[3] !== void 0 && (a = N) : a === N ? p[0] === ">" ? (a = o ?? Q, u = -1) : p[1] === void 0 ? u = -2 : (u = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? N : p[3] === '"' ? ts : Qe) : a === ts || a === Qe ? a = N : a === Je || a === Xe ? a = Q : (a = N, o = void 0);
    const v = a === N && s[c + 1].startsWith("/>") ? " " : "";
    n += a === Q ? l + Ts : u >= 0 ? (i.push(d), l.slice(0, u) + hs + l.slice(u) + O + v) : l + O + (u === -2 ? c : v);
  }
  return [fs(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class nt {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, l = this.parts, [d, p] = Ps(t, e);
    if (this.el = nt.createElement(d, i), U.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = U.nextNode()) !== null && l.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(hs)) {
          const m = p[a++], v = o.getAttribute(u).split(O), f = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: f[2], strings: v, ctor: f[1] === "." ? zs : f[1] === "?" ? Ns : f[1] === "@" ? Hs : _t }), o.removeAttribute(u);
        } else u.startsWith(O) && (l.push({ type: 6, index: n }), o.removeAttribute(u));
        if (ps.test(o.tagName)) {
          const u = o.textContent.split(O), m = u.length - 1;
          if (m > 0) {
            o.textContent = gt ? gt.emptyScript : "";
            for (let v = 0; v < m; v++) o.append(u[v], it()), U.nextNode(), l.push({ type: 2, index: ++n });
            o.append(u[m], it());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ds) l.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(O, u + 1)) !== -1; ) l.push({ type: 7, index: n }), u += O.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = L.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(s, t, e = s, i) {
  var a, c;
  if (t === I) return t;
  let o = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const n = ot(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = B(s, o._$AS(s, t.values), o, i)), t;
}
class Os {
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
    const { el: { content: e }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? L).importNode(e, !0);
    U.currentNode = o;
    let n = U.nextNode(), a = 0, c = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new ct(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Us(n, this, t)), this._$AV.push(d), l = i[++c];
      }
      a !== (l == null ? void 0 : l.index) && (n = U.nextNode(), a++);
    }
    return U.currentNode = L, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ct {
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
    t = B(this, t, e), ot(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ks(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(L.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = nt.createElement(fs(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const a = new Os(o, this), c = a.u(this.options);
      a.p(e), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = es.get(t.strings);
    return e === void 0 && es.set(t.strings, e = new nt(t)), e;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new ct(this.O(it()), this.O(it()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = Ze(t).nextSibling;
      Ze(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class _t {
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
    if (n === void 0) t = B(this, t, e, 0), a = !ot(t) || t !== this._$AH && t !== I, a && (this._$AH = t);
    else {
      const c = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = B(this, c[i + l], e, l), d === I && (d = this._$AH[l]), a || (a = !ot(d) || d !== this._$AH[l]), d === g ? t = g : t !== g && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zs extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Ns extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Hs extends _t {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? g) === I) return;
    const i = this._$AH, o = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== g && (i === g || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Us {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const wt = et.litHtmlPolyfillSupport;
wt == null || wt(nt, ct), (et.litHtmlVersions ?? (et.litHtmlVersions = [])).push("3.3.2");
const Ds = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new ct(t.insertBefore(it(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
class S extends j {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ds(e, this.renderRoot, this.renderOptions);
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
var cs;
S._$litElement$ = !0, S.finalized = !0, (cs = D.litElementHydrateSupport) == null || cs.call(D, { LitElement: S });
const xt = D.litElementPolyfillSupport;
xt == null || xt({ LitElement: S });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ls = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: Tt }, Ms = (s = Ls, t, e) => {
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
function $(s) {
  return (t, e) => typeof e == "object" ? Ms(s, t, e) : ((i, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Pt(s) {
  return $({ ...s, state: !0, attribute: !1 });
}
const Ot = (s) => s.attributes.device_class ?? "", zt = (s) => s.attributes.unit_of_measurement ?? "", Nt = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function H(...s) {
  return (t, e) => {
    let i = 0;
    Ot(e) === "power" && (i += 4), ["W", "kW"].includes(zt(e)) && (i += 2);
    const o = Nt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function R(...s) {
  return (t, e) => {
    let i = 0;
    Ot(e) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(zt(e)) && (i += 2);
    const o = Nt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function ss(...s) {
  return (t, e) => {
    let i = 0;
    Ot(e) === "battery" && (i += 4), zt(e) === "%" && (i += 2);
    const o = Nt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function lt(s, t = []) {
  return (e, i) => {
    const o = e.toLowerCase();
    if (t.some((a) => o.includes(a))) return 0;
    let n = 0;
    for (const a of s) o.includes(a) && (n += 4);
    return n;
  };
}
function x(s, t, e, i) {
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
function js(s, t, e) {
  const i = Object.values(t).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), o = Object.keys(s).filter((b) => b.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], c = {}, l = {}, d = x(
    n,
    s,
    lt(["_current_rate"], ["export", "accumulative"]),
    e
  );
  d && (c.rate_entity = d, a.push("rate"));
  const p = x(
    n,
    s,
    lt(["_current_accumulative_cost"]),
    e
  );
  p && (c.cost_entity = p, a.push("cost"));
  const u = x(
    n,
    s,
    lt(["_current_day_rates"]),
    e
  );
  u && (c.slots_entity = u, a.push("slots"));
  const m = x(
    o.filter((b) => b.startsWith("binary_sensor.")),
    s,
    lt(["_intelligent_dispatching"]),
    e
  );
  m && (c.dispatches_entity = m, a.push("dispatching")), Object.keys(c).length && (l.octopus = c);
  const v = x(
    n,
    s,
    H("import", "demand", "current"),
    e
  );
  v && (l.power_import = v, a.push("import power"));
  const f = x(
    n,
    s,
    H("export", "demand", "current"),
    e
  );
  f && (l.power_export = f, a.push("export power"));
  const y = x(
    n,
    s,
    R("import", "accumulative", "consumption"),
    e
  );
  y && (l.daily_usage = y, a.push("daily import"));
  const E = x(
    n,
    s,
    R("export", "accumulative"),
    e
  );
  return E && (l.daily_export = E, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: a };
}
function Rs(s, t, e) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), o = Object.keys(s).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(s).filter((f) => f.includes("powerwall") || f.includes("tesla")), a = n.filter((f) => f.includes("powerwall")), c = n.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (a.length > 0) {
    const f = {}, y = x(
      a,
      s,
      ss("battery", "soc", "charge", "percent"),
      e
    );
    y && (f.soc = y);
    const E = x(
      a,
      s,
      H("battery", "power", "charge", "discharge"),
      e
    );
    E && (f.power_combined = E);
    const b = x(
      a,
      s,
      R("battery", "today", "daily", "charged"),
      e
    );
    b && (f.daily_usage = b), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const p = x(
    n,
    s,
    H("solar"),
    e
  );
  if (p) {
    const f = { power_combined: p }, y = x(
      n,
      s,
      R("solar"),
      e
    );
    y && (f.daily_usage = y), d.solar = f, l.push("solar");
  }
  const u = x(
    n,
    s,
    H("load", "home", "house"),
    e
  );
  if (u) {
    const f = { power_combined: u }, y = x(
      n,
      s,
      R("load", "home", "house"),
      e
    );
    y && (f.daily_usage = y), d.home = f, l.push("home load");
  }
  const m = x(
    n,
    s,
    H("grid"),
    e
  );
  m && (d.grid = { power_combined: m }, l.push("grid"));
  const v = x(
    c,
    s,
    ss("battery", "battery_level", "soc", "charge"),
    e
  );
  if (v) {
    const f = { soc: v }, y = x(
      c,
      s,
      H("charg", "power"),
      e
    );
    y && (f.power_combined = y);
    const E = x(
      c,
      s,
      R("charg", "energy"),
      e
    );
    E && (f.daily_usage = E), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function Is(s) {
  var l, d;
  const t = s, e = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = Rs(e, i, o), a = js(e, i, o), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), a) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (l = a.entity_types) != null && l.grid) {
      const p = a.entity_types.grid;
      c.entity_types.grid = {
        ...c.entity_types.grid,
        ...p,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: p.power_import || (d = c.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    a.tariff_entity && (c.tariff_entity = a.tariff_entity), c.summary.push(...a.summary ?? []);
  }
  return c;
}
function Bs(s, t, e = !1) {
  const i = { ...s };
  t.tariff_entity && (e || !s.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = s.entity_types ?? {}, n = { ...o };
  for (const [a, c] of Object.entries(t.entity_types)) {
    const l = o[a] ?? {}, d = { ...l };
    for (const [p, u] of Object.entries(c))
      u !== void 0 && (e || !l[p]) && (d[p] = u);
    n[a] = d;
  }
  return i.entity_types = n, i;
}
const yt = ["grid", "solar", "battery", "home", "ev"], Vs = "custom_";
function is(s) {
  const t = s.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function Ws(s) {
  return `${Vs}${s + 1}`;
}
function ut(s) {
  const t = s.entity_types ?? {}, e = Object.fromEntries(
    Object.entries(t).filter(
      ([a]) => yt.includes(a)
    )
  ), i = Object.entries(t).filter(([a]) => !yt.includes(a)).sort(([a], [c]) => is(a) - is(c)).map(([, a]) => ({ ...a })), o = Array.isArray(s.custom_types) ? s.custom_types.map((a) => ({ ...a })) : i, n = {
    ...e
  };
  return o.forEach((a, c) => {
    n[Ws(c)] = { ...a };
  }), {
    ...s,
    entity_types: n,
    custom_types: o
  };
}
var Fs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, Ht = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Gs(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && Fs(t, e, o), o;
};
let at = class extends S {
  setConfig(s) {
    this.config = ut(s);
  }
  _dispatchConfig(s) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: ut(s) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var t;
    const s = [...((t = this.config) == null ? void 0 : t.custom_types) ?? [], {}];
    this._dispatchConfig({
      ...this.config,
      custom_types: s
    });
  }
  _deleteCustomType(s) {
    var e;
    const t = [...((e = this.config) == null ? void 0 : e.custom_types) ?? []];
    t.splice(s, 1), this._dispatchConfig({
      ...this.config,
      custom_types: t
    });
  }
  _setCustomType(s, t) {
    var i;
    const e = [...((i = this.config) == null ? void 0 : i.custom_types) ?? []];
    e[s] = {
      ...e[s] ?? {},
      ...t
    }, this._dispatchConfig({
      ...this.config,
      custom_types: e
    });
  }
  render() {
    var s, t, e, i, o, n, a, c, l, d, p, u, m, v, f, y, E, b, k, P, K, Y, Z, q, J, X, Dt, Lt, Mt, jt, Rt, It, Bt, Vt, Wt, Ft, Gt, Kt, Yt, Zt, qt, Jt, Xt, Qt, te, ee, se, ie, oe, ne, ae, re, ce, le, he, de, pe, ue, fe, ge, ye, _e, me, ve, be, $e, we, xe, Ee, Ce, Se, Ae, Te, ke, Pe, Oe, ze, Ne, He, Ue, De, Le, Me, je, Re, Ie, Be, Ve;
    return this.config ? _`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: ut(
            Bs(this.config, Is(this.hass), !1)
          )
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
            .value=${((u = (p = this.config.entity_types) == null ? void 0 : p.grid) == null ? void 0 : u.zero_tolerance) != null ? String((v = (m = this.config.entity_types) == null ? void 0 : m.grid) == null ? void 0 : v.zero_tolerance) : ""}
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((y = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : y.show_label) ?? !0}
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
                  show_label: h.target.checked
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
            label="Grid Label"
            .value=${((b = (E = this.config.entity_types) == null ? void 0 : E.grid) == null ? void 0 : b.label) ?? ""}
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
            .value=${((P = (k = this.config.entity_types) == null ? void 0 : k.grid) == null ? void 0 : P.colour) ?? ""}
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
            .value=${((Y = (K = this.config.entity_types) == null ? void 0 : K.solar) == null ? void 0 : Y.power_combined) ?? ""}
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
            .value=${((q = (Z = this.config.entity_types) == null ? void 0 : Z.solar) == null ? void 0 : q.daily_usage) ?? ""}
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
              .checked=${((X = (J = this.config.entity_types) == null ? void 0 : J.solar) == null ? void 0 : X.show_zero) ?? !0}
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
            .value=${((Lt = (Dt = this.config.entity_types) == null ? void 0 : Dt.solar) == null ? void 0 : Lt.zero_tolerance) != null ? String((jt = (Mt = this.config.entity_types) == null ? void 0 : Mt.solar) == null ? void 0 : jt.zero_tolerance) : ""}
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((It = (Rt = this.config.entity_types) == null ? void 0 : Rt.solar) == null ? void 0 : It.show_label) ?? !0}
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
                  show_label: h.target.checked
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
            label="Solar Label"
            .value=${((Vt = (Bt = this.config.entity_types) == null ? void 0 : Bt.solar) == null ? void 0 : Vt.label) ?? ""}
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
            .value=${((Ft = (Wt = this.config.entity_types) == null ? void 0 : Wt.solar) == null ? void 0 : Ft.colour) ?? ""}
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
            .value=${((Kt = (Gt = this.config.entity_types) == null ? void 0 : Gt.battery) == null ? void 0 : Kt.soc) ?? ""}
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
            .value=${((Zt = (Yt = this.config.entity_types) == null ? void 0 : Yt.battery) == null ? void 0 : Zt.power_combined) ?? ""}
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
            .value=${((Jt = (qt = this.config.entity_types) == null ? void 0 : qt.battery) == null ? void 0 : Jt.daily_usage) ?? ""}
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
              .checked=${((Qt = (Xt = this.config.entity_types) == null ? void 0 : Xt.battery) == null ? void 0 : Qt.show_zero) ?? !0}
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
            .value=${((ee = (te = this.config.entity_types) == null ? void 0 : te.battery) == null ? void 0 : ee.zero_tolerance) != null ? String((ie = (se = this.config.entity_types) == null ? void 0 : se.battery) == null ? void 0 : ie.zero_tolerance) : ""}
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((ne = (oe = this.config.entity_types) == null ? void 0 : oe.battery) == null ? void 0 : ne.show_label) ?? !0}
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
                  show_label: h.target.checked
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
            label="Battery Label"
            .value=${((re = (ae = this.config.entity_types) == null ? void 0 : ae.battery) == null ? void 0 : re.label) ?? ""}
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
            .value=${((le = (ce = this.config.entity_types) == null ? void 0 : ce.battery) == null ? void 0 : le.colour) ?? ""}
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
            .value=${((de = (he = this.config.entity_types) == null ? void 0 : he.home) == null ? void 0 : de.power_combined) ?? ""}
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
            .value=${((ue = (pe = this.config.entity_types) == null ? void 0 : pe.home) == null ? void 0 : ue.daily_usage) ?? ""}
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
              .checked=${((ge = (fe = this.config.entity_types) == null ? void 0 : fe.home) == null ? void 0 : ge.show_zero) ?? !0}
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
            .value=${((_e = (ye = this.config.entity_types) == null ? void 0 : ye.home) == null ? void 0 : _e.zero_tolerance) != null ? String((ve = (me = this.config.entity_types) == null ? void 0 : me.home) == null ? void 0 : ve.zero_tolerance) : ""}
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${(($e = (be = this.config.entity_types) == null ? void 0 : be.home) == null ? void 0 : $e.show_label) ?? !0}
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
                  show_label: h.target.checked
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
            label="Home Label"
            .value=${((xe = (we = this.config.entity_types) == null ? void 0 : we.home) == null ? void 0 : xe.label) ?? ""}
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
            .value=${((Ce = (Ee = this.config.entity_types) == null ? void 0 : Ee.home) == null ? void 0 : Ce.colour) ?? ""}
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
            .value=${((Ae = (Se = this.config.entity_types) == null ? void 0 : Se.ev) == null ? void 0 : Ae.power_combined) ?? ""}
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
            .value=${((ke = (Te = this.config.entity_types) == null ? void 0 : Te.ev) == null ? void 0 : ke.soc) ?? ""}
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
            .value=${((Oe = (Pe = this.config.entity_types) == null ? void 0 : Pe.ev) == null ? void 0 : Oe.daily_usage) ?? ""}
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
              .checked=${((Ne = (ze = this.config.entity_types) == null ? void 0 : ze.ev) == null ? void 0 : Ne.show_zero) ?? !0}
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
            .value=${((Ue = (He = this.config.entity_types) == null ? void 0 : He.ev) == null ? void 0 : Ue.zero_tolerance) != null ? String((Le = (De = this.config.entity_types) == null ? void 0 : De.ev) == null ? void 0 : Le.zero_tolerance) : ""}
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((je = (Me = this.config.entity_types) == null ? void 0 : Me.ev) == null ? void 0 : je.show_label) ?? !0}
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
                  show_label: h.target.checked
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
            label="EV Label"
            .value=${((Ie = (Re = this.config.entity_types) == null ? void 0 : Re.ev) == null ? void 0 : Ie.label) ?? ""}
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
            .value=${((Ve = (Be = this.config.entity_types) == null ? void 0 : Be.ev) == null ? void 0 : Ve.colour) ?? ""}
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

      <button class="action-button primary" type="button" @click=${() => this._addCustomType()}>
        <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
        Add Custom Type
      </button>

      ${(this.config.custom_types ?? []).map((h, r) => {
      var We;
      return _`
        <ha-expansion-panel header=${((We = h.label) == null ? void 0 : We.trim()) || `Custom ${r + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(r)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_import ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { power_import: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { power_export: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { power_combined: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { daily_usage: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { soc: w.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(w) => this._setCustomType(r, {
        show_zero: w.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(w) => this._setCustomType(r, {
        zero_tolerance: w.target.value !== "" ? Number(w.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(w) => this._setCustomType(r, {
        show_label: w.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(w) => this._setCustomType(r, {
        label: w.target.value || void 0
      })}
            ></ha-textfield>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(w) => this._setCustomType(r, {
        colour: w.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : g;
  }
};
at.styles = F`
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

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      min-height: 40px;
      padding: 0 16px;
      border-radius: 10px;
      border: 1px solid transparent;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: filter 0.15s ease, transform 0.1s ease;
      box-sizing: border-box;
    }

    .action-button:hover {
      filter: brightness(0.97);
    }

    .action-button:active {
      transform: translateY(1px);
    }

    .action-button.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
      box-shadow: var(
        --ha-card-box-shadow,
        0 2px 6px rgba(0, 0, 0, 0.16)
      );
    }

    .action-button.delete-button {
      color: var(--error-color);
      background: var(--card-background-color, #fff);
      border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
    }

    .action-icon {
      --mdc-icon-size: 18px;
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
Ht([
  $({ attribute: !1 })
], at.prototype, "hass", 2);
Ht([
  $({ attribute: !1 })
], at.prototype, "config", 2);
at = Ht([
  G("home-energy-card-editor")
], at);
var Ks = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, mt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Ys(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && Ks(t, e, o), o;
};
function ht(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : e.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function dt(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Zs(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let V = class extends S {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, E, b, k, P, K, Y, Z, q, J, X;
    if (!this.config) return g;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = this.config.entity_types ?? {}, e = ((E = this.config.display) == null ? void 0 : E.decimal_places) ?? 1, i = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Zs(i) : null, n = ht(s, (k = t.solar) == null ? void 0 : k.daily_usage), a = ht(s, (P = t.home) == null ? void 0 : P.daily_usage), c = ht(s, (K = t.grid) == null ? void 0 : K.daily_usage), l = ht(s, (Y = t.grid) == null ? void 0 : Y.daily_export), d = !!((Z = t.solar) != null && Z.daily_usage), p = !!((q = t.home) != null && q.daily_usage), u = !!((J = t.grid) != null && J.daily_usage), m = !!((X = t.grid) != null && X.daily_export), v = u || m, f = d || p || v;
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

        ${f ? _`
          <div class="stats-row">

            ${d ? _`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${dt(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${p ? _`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${dt(a, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${v ? _`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${u ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${dt(c, e)}</span>
                    </div>
                  ` : g}
                  ${m ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${dt(l, e)}</span>
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
V.styles = F`
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
mt([
  $({ attribute: !1 })
], V.prototype, "hass", 2);
mt([
  $({ attribute: !1 })
], V.prototype, "config", 2);
mt([
  $({ type: Boolean })
], V.prototype, "showTitle", 2);
V = mt([
  G("hec-card-header")
], V);
var qs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, T = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Js(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && qs(t, e, o), o;
};
const Xs = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Qs = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, Ct = 38, os = +(2 * Math.PI * Ct).toFixed(4);
function gs(s, t, e) {
  if (s === null) return "—";
  const i = Math.abs(s);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let C = class extends S {
  constructor() {
    super(...arguments), this.type = "home", this.label = "", this.showLabel = !0, this.colour = "", this.power = null, this.soc = null, this.unit = "auto", this.decimalPlaces = 1;
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
    const s = Xs[this.type] ?? Qs, t = this.colour || s.accent, e = this.soc !== null, i = e ? Math.max(0, Math.min(100, this.soc)) : 0, o = +(os * (1 - i / 100)).toFixed(4);
    return _`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${e ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${Ct}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${Ct}"
            style="stroke-dasharray:${os};stroke-dashoffset:${o};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${s.gradStart} 0%,${s.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s.icon}></ha-icon>
          ${this.showLabel ? _`<span class="label" style="color:${t};">${this.label || this.type}</span>` : g}
          <span class="power">${gs(this.power, this.unit, this.decimalPlaces)}</span>
        </div>

      </div>
    `;
  }
};
C.styles = F`
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
  `;
T([
  $()
], C.prototype, "type", 2);
T([
  $()
], C.prototype, "label", 2);
T([
  $({ type: Boolean })
], C.prototype, "showLabel", 2);
T([
  $()
], C.prototype, "colour", 2);
T([
  $({ type: Number })
], C.prototype, "power", 2);
T([
  $({ type: Number })
], C.prototype, "soc", 2);
T([
  $()
], C.prototype, "unit", 2);
T([
  $({ type: Number })
], C.prototype, "decimalPlaces", 2);
C = T([
  G("hec-energy-node")
], C);
function ys(s, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? s * 1e3 : s;
}
function Et(s, t) {
  var o;
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : ys(
    i,
    (o = e.attributes) == null ? void 0 : o.unit_of_measurement
  );
}
function _s(s, t, e) {
  const i = t.zero_tolerance ?? 0, o = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = Et(e, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return o;
    const p = l ? Et(e, t.power_import) : null, u = d ? Et(e, t.power_export) : null;
    if ((!l || p === null) && (!d || u === null)) return o;
    n = (p ?? 0) - (u ?? 0);
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
var ti = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, M = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ei(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && ti(t, e, o), o;
};
const si = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, ii = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, oi = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function ni(s, t) {
  const e = Date.now(), i = e - 864e5, o = Array(24).fill(null);
  if (!s.length) return o;
  for (let n = 0; n < 24; n++) {
    const a = i + n * 36e5, c = a + 36e5;
    let l = 0, d = 0;
    for (let p = 0; p < s.length; p++) {
      const u = new Date(s[p].last_changed).getTime(), m = p + 1 < s.length ? new Date(s[p + 1].last_changed).getTime() : e, v = Math.max(u, a), f = Math.min(m, c);
      if (f <= v) continue;
      const y = parseFloat(s[p].state);
      if (isNaN(y)) continue;
      const E = ys(y, t), b = f - v;
      l += Math.abs(E) * b, d += b;
    }
    d > 0 && (o[n] = l / d);
  }
  return o;
}
function ms(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : i;
}
function ns(s, t) {
  var o;
  const e = ms(s, t);
  return e === null ? null : ((o = s[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function as(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function ai(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function rs(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function ri(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function ci(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let A = class extends S {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(s) {
    super.updated(s), (s.has("open") || s.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var i, o, n, a;
    const s = (o = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : o[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!t || !this.hass) return;
    const e = (a = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : a.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const c = /* @__PURE__ */ new Date(), d = `history/period/${new Date(c.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${c.toISOString()}`, p = await this.hass.callApi("GET", d);
      this._hourly = ni((p == null ? void 0 : p[0]) ?? [], e);
    } catch (c) {
      console.warn("[hec-node-detail] history fetch failed", c), this._hourly = [];
    } finally {
      this._loading = !1;
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
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.unit) ?? "auto", i = ((l = oi[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
    return _`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${gs(s.power, e, t)}</div>
        ${i ? _`<div class="power-sub">${i}</div>` : g}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return g;
    const t = ci(s);
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
    return s.daily_usage && n.push([i, as(ns(t, s.daily_usage), e)]), s.daily_export && n.push([o, as(ns(t, s.daily_export), e)]), n.length ? _`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, p]) => _`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${p}</span>
          </div>
        `)}
      </div>
    ` : g;
  }
  _sectionOctopus(s) {
    var f;
    const t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, i = s.cost_entity ? t[s.cost_entity] : null, o = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, a = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", c = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", d = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], p = Date.now(), u = d.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > p).slice(0, 6), m = n && n !== "unavailable" && n !== "unknown", v = c && c !== "unavailable" && c !== "unknown";
    return !m && !v && !u.length ? g : _`
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

        ${u.length ? _`
          <div class="s-subtitle">Upcoming slots</div>
          ${u.map((y) => {
      const E = y.start ?? y.start_time ?? "", b = y.end ?? y.end_time ?? "", k = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, P = ri(k);
      return _`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${rs(E)}–${rs(b)}</span>
                <span class="slot-rate" style="color:${P};">${(+k).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : g}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => ai(new Date(i.getTime() - n * 36e5));
    return this._loading ? _`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : _`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${e === 0 ? _`<div class="chart-msg">No data</div>` : _`
              ${st`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return st``;
      const c = Math.max(2, n / e * 48);
      return st`
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
    var l, d, p;
    if (!this.open || !this.nodeType) return g;
    const s = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, e = s.colour || (ii[this.nodeType] ?? "#9e9e9e"), i = si[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = _s(this.nodeType, s, t), a = !!s.soc && (["battery", "ev"].includes(this.nodeType) || !yt.includes(this.nodeType)), c = a ? ms(t, s.soc) : null;
    return _`
      <div
        class="overlay"
        @click=${(u) => u.target === u.currentTarget && this._close()}
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
A.styles = F`
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
  $({ attribute: !1 })
], A.prototype, "hass", 2);
M([
  $({ attribute: !1 })
], A.prototype, "config", 2);
M([
  $()
], A.prototype, "nodeType", 2);
M([
  $({ type: Boolean })
], A.prototype, "open", 2);
M([
  Pt()
], A.prototype, "_hourly", 2);
M([
  Pt()
], A.prototype, "_loading", 2);
A = M([
  G("hec-node-detail")
], A);
var li = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, vt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? hi(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && li(t, e, o), o;
};
function di(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const pi = {
  solar: "#ffc107",
  grid: "#f06292",
  battery: "#66bb6a",
  ev: "#42a5f5"
}, ui = {
  solar: [1.5, 0.5, 1.5, 1.5],
  // B1 → B2  vertical
  grid: [0.5, 1.5, 1.5, 1.5],
  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],
  // C2 → B2  horizontal
  ev: [2.5, 0.5, 1.5, 1.5]
  // C1 → B2  diagonal
};
let W = class extends S {
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
    return _s(s, t, ((o = this.hass) == null ? void 0 : o.states) ?? {});
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
    return st`
      ${["solar", "grid", "battery", "ev"].filter((a) => this._isVisible(a)).map((a) => {
      const c = this._flowInfo(a), [l, d, p, u] = ui[a], m = c.direction === "idle", v = c.direction === "from-home", f = di(c.magnitude, s && !m), y = [
        "flow-line",
        v ? "reverse" : "",
        m ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return st`
            <line
              x1="${l}" y1="${d}" x2="${p}" y2="${u}"
              stroke="${pi[a]}"
              class="${y}"
              style="--flow-dur:${f}"
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
        .showLabel=${o.show_label ?? !0}
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
    var c, l, d;
    const i = this._isVisible(s), o = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return _`
      <hec-energy-node
        style="grid-column:${t}; grid-row:${e}"
        class="${i ? "" : "hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .showLabel=${o.show_label ?? !0}
        .colour=${o.colour ?? ""}
        .power=${a.power}
        .soc=${o.soc ? this._soc(s) : null}
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
vt([
  $({ attribute: !1 })
], W.prototype, "hass", 2);
vt([
  $({ attribute: !1 })
], W.prototype, "config", 2);
vt([
  Pt()
], W.prototype, "_dialogType", 2);
W = vt([
  G("hec-flow-layout")
], W);
var fi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, Ut = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? gi(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = (i ? a(t, e, o) : a(o)) || o);
  return i && o && fi(t, e, o), o;
};
let rt = class extends S {
  setConfig(s) {
    this.config = ut(s);
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
rt.styles = F`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ut([
  $({ attribute: !1 })
], rt.prototype, "hass", 2);
Ut([
  $({ attribute: !1 })
], rt.prototype, "config", 2);
rt = Ut([
  G("home-energy-card")
], rt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  rt as HomeEnergyCard
};
