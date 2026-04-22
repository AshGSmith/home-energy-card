/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = globalThis, Nt = vt.ShadowRoot && (vt.ShadyCSS === void 0 || vt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = Symbol(), cs = /* @__PURE__ */ new WeakMap();
let Ps = class {
  constructor(t, s, o) {
    if (this._$cssResult$ = !0, o !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Nt && t === void 0) {
      const o = s !== void 0 && s.length === 1;
      o && (t = cs.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && cs.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const js = (e) => new Ps(typeof e == "string" ? e : e + "", void 0, Ht), X = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((o, i, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[n + 1], e[0]);
  return new Ps(s, e, Ht);
}, Rs = (e, t) => {
  if (Nt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const o = document.createElement("style"), i = vt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = s.cssText, e.appendChild(o);
  }
}, ls = Nt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const o of t.cssRules) s += o.cssText;
  return js(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bs, defineProperty: Fs, getOwnPropertyDescriptor: Vs, getOwnPropertyNames: Ws, getOwnPropertySymbols: Gs, getPrototypeOf: Ks } = Object, U = globalThis, hs = U.trustedTypes, qs = hs ? hs.emptyScript : "", At = U.reactiveElementPolyfillSupport, nt = (e, t) => e, $t = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qs : null;
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
} }, Ut = (e, t) => !Bs(e, t), ds = { attribute: !0, type: String, converter: $t, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), U.litPropertyMetadata ?? (U.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = ds) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, s);
      i !== void 0 && Fs(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, o) {
    const { get: i, set: n } = Vs(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: i, set(a) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ds;
  }
  static _$Ei() {
    if (this.hasOwnProperty(nt("elementProperties"))) return;
    const t = Ks(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(nt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(nt("properties"))) {
      const s = this.properties, o = [...Ws(s), ...Gs(s)];
      for (const i of o) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [o, i] of s) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, o] of this.elementProperties) {
      const i = this._$Eu(s, o);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) s.unshift(ls(i));
    } else t !== void 0 && s.push(ls(t));
    return s;
  }
  static _$Eu(t, s) {
    const o = s.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const o of s.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rs(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var o;
      return (o = s.hostConnected) == null ? void 0 : o.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var o;
      return (o = s.hostDisconnected) == null ? void 0 : o.call(s);
    });
  }
  attributeChangedCallback(t, s, o) {
    this._$AK(t, o);
  }
  _$ET(t, s) {
    var n;
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const a = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : $t).toAttribute(s, o.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, a;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = o.getPropertyOptions(i), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : $t;
      this._$Em = i;
      const d = l.fromAttribute(s, c.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, o, i = !1, n) {
    var a;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), o ?? (o = c.getPropertyOptions(t)), !((o.hasChanged ?? Ut)(n, s) || o.useDefault && o.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(c._$Eu(t, o)))) return;
      this.C(t, s, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: o, reflect: i, wrapped: n }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? s ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: c } = a, l = this[n];
        c !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, a, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (o = this._$EO) == null || o.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((o) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[nt("elementProperties")] = /* @__PURE__ */ new Map(), q[nt("finalized")] = /* @__PURE__ */ new Map(), At == null || At({ ReactiveElement: q }), (U.reactiveElementVersions ?? (U.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, ps = (e) => e, wt = at.trustedTypes, us = wt ? wt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Os = "$lit$", H = `lit$${Math.random().toFixed(9).slice(2)}$`, Ls = "?" + H, Ys = `<${Ls}>`, V = document, ct = () => V.createComment(""), lt = (e) => e === null || typeof e != "object" && typeof e != "function", It = Array.isArray, Zs = (e) => It(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", kt = `[ 	
\f\r]`, it = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fs = /-->/g, gs = />/g, D = RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ys = /'/g, _s = /"/g, zs = /^(?:script|style|textarea|title)$/i, Ms = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), m = Ms(1), rt = Ms(2), W = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), ms = /* @__PURE__ */ new WeakMap(), B = V.createTreeWalker(V, 129);
function Ns(e, t) {
  if (!It(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return us !== void 0 ? us.createHTML(t) : t;
}
const Js = (e, t) => {
  const s = e.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = it;
  for (let c = 0; c < s; c++) {
    const l = e[c];
    let d, u, p = -1, _ = 0;
    for (; _ < l.length && (a.lastIndex = _, u = a.exec(l), u !== null); ) _ = a.lastIndex, a === it ? u[1] === "!--" ? a = fs : u[1] !== void 0 ? a = gs : u[2] !== void 0 ? (zs.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = D) : u[3] !== void 0 && (a = D) : a === D ? u[0] === ">" ? (a = i ?? it, p = -1) : u[1] === void 0 ? p = -2 : (p = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? D : u[3] === '"' ? _s : ys) : a === _s || a === ys ? a = D : a === fs || a === gs ? a = it : (a = D, i = void 0);
    const y = a === D && e[c + 1].startsWith("/>") ? " " : "";
    n += a === it ? l + Ys : p >= 0 ? (o.push(d), l.slice(0, p) + Os + l.slice(p) + H + y) : l + H + (p === -2 ? c : y);
  }
  return [Ns(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class ht {
  constructor({ strings: t, _$litType$: s }, o) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, l = this.parts, [d, u] = Js(t, s);
    if (this.el = ht.createElement(d, o), B.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = B.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Os)) {
          const _ = u[a++], y = i.getAttribute(p).split(H), f = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: n, name: f[2], strings: y, ctor: f[1] === "." ? Qs : f[1] === "?" ? ti : f[1] === "@" ? ei : Et }), i.removeAttribute(p);
        } else p.startsWith(H) && (l.push({ type: 6, index: n }), i.removeAttribute(p));
        if (zs.test(i.tagName)) {
          const p = i.textContent.split(H), _ = p.length - 1;
          if (_ > 0) {
            i.textContent = wt ? wt.emptyScript : "";
            for (let y = 0; y < _; y++) i.append(p[y], ct()), B.nextNode(), l.push({ type: 2, index: ++n });
            i.append(p[_], ct());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ls) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(H, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += H.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const o = V.createElement("template");
    return o.innerHTML = t, o;
  }
}
function Z(e, t, s = e, o) {
  var a, c;
  if (t === W) return t;
  let i = o !== void 0 ? (a = s._$Co) == null ? void 0 : a[o] : s._$Cl;
  const n = lt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(e), i._$AT(e, s, o)), o !== void 0 ? (s._$Co ?? (s._$Co = []))[o] = i : s._$Cl = i), i !== void 0 && (t = Z(e, i._$AS(e, t.values), i, o)), t;
}
class Xs {
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
    const { el: { content: s }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? V).importNode(s, !0);
    B.currentNode = i;
    let n = B.nextNode(), a = 0, c = 0, l = o[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Q(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new si(n, this, t)), this._$AV.push(d), l = o[++c];
      }
      a !== (l == null ? void 0 : l.index) && (n = B.nextNode(), a++);
    }
    return B.currentNode = V, i;
  }
  p(t) {
    let s = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, s), s += o.strings.length - 2) : o._$AI(t[s])), s++;
  }
}
class Q {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, o, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = Z(this, t, s), lt(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && lt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(V.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = ht.createElement(Ns(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(s);
    else {
      const a = new Xs(i, this), c = a.u(this.options);
      a.p(s), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let s = ms.get(t.strings);
    return s === void 0 && ms.set(t.strings, s = new ht(t)), s;
  }
  k(t) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let o, i = 0;
    for (const n of t) i === s.length ? s.push(o = new Q(this.O(ct()), this.O(ct()), this, this.options)) : o = s[i], o._$AI(n), i++;
    i < s.length && (this._$AR(o && o._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, s); t !== this._$AB; ) {
      const i = ps(t).nextSibling;
      ps(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class Et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, o, i, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = g;
  }
  _$AI(t, s = this, o, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = Z(this, t, s, 0), a = !lt(t) || t !== this._$AH && t !== W, a && (this._$AH = t);
    else {
      const c = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = Z(this, c[o + l], s, l), d === W && (d = this._$AH[l]), a || (a = !lt(d) || d !== this._$AH[l]), d === g ? t = g : t !== g && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qs extends Et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class ti extends Et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class ei extends Et {
  constructor(t, s, o, i, n) {
    super(t, s, o, i, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = Z(this, t, s, 0) ?? g) === W) return;
    const o = this._$AH, i = t === g && o !== g || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== g && (o === g || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class si {
  constructor(t, s, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Z(this, t);
  }
}
const ii = { I: Q }, Tt = at.litHtmlPolyfillSupport;
Tt == null || Tt(ht, Q), (at.litHtmlVersions ?? (at.litHtmlVersions = [])).push("3.3.2");
const oi = (e, t, s) => {
  const o = (s == null ? void 0 : s.renderBefore) ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    o._$litPart$ = i = new Q(t.insertBefore(ct(), n), n, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis;
let T = class extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oi(s, this.renderRoot, this.renderOptions);
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
    return W;
  }
};
var Ts;
T._$litElement$ = !0, T.finalized = !0, (Ts = F.litElementHydrateSupport) == null || Ts.call(F, { LitElement: T });
const Pt = F.litElementPolyfillSupport;
Pt == null || Pt({ LitElement: T });
(F.litElementVersions ?? (F.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = { attribute: !0, type: String, converter: $t, reflect: !1, hasChanged: Ut }, ai = (e = ni, t, s) => {
  const { kind: o, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), o === "accessor") {
    const { name: a } = s;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, l, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (o === "setter") {
    const { name: a } = s;
    return function(c) {
      const l = this[a];
      t.call(this, c), this.requestUpdate(a, l, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function w(e) {
  return (t, s) => typeof s == "object" ? ai(e, t, s) : ((o, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ct(e) {
  return w({ ...e, state: !0, attribute: !1 });
}
const Dt = (e) => e.attributes.device_class ?? "", jt = (e) => e.attributes.unit_of_measurement ?? "", Rt = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function R(...e) {
  return (t, s) => {
    let o = 0;
    Dt(s) === "power" && (o += 4), ["W", "kW"].includes(jt(s)) && (o += 2);
    const i = Rt(t, s);
    for (const n of e) i.includes(n) && (o += 1);
    return o;
  };
}
function Y(...e) {
  return (t, s) => {
    let o = 0;
    Dt(s) === "energy" && (o += 4), ["kWh", "Wh", "MWh"].includes(jt(s)) && (o += 2);
    const i = Rt(t, s);
    for (const n of e) i.includes(n) && (o += 1);
    return o;
  };
}
function vs(...e) {
  return (t, s) => {
    let o = 0;
    Dt(s) === "battery" && (o += 4), jt(s) === "%" && (o += 2);
    const i = Rt(t, s);
    for (const n of e) i.includes(n) && (o += 1);
    return o;
  };
}
function gt(e, t = []) {
  return (s, o) => {
    const i = s.toLowerCase();
    if (t.some((a) => i.includes(a))) return 0;
    let n = 0;
    for (const a of e) i.includes(a) && (n += 4);
    return n;
  };
}
function E(e, t, s, o) {
  let i, n = 0;
  for (const a of e) {
    if (o.has(a)) continue;
    const c = t[a];
    if (!c) continue;
    const l = s(a, c);
    l > n && (n = l, i = a);
  }
  return i && o.add(i), i;
}
function ri(e, t, s) {
  const o = Object.values(t).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), i = Object.keys(e).filter((b) => b.includes("octopus_energy"));
  if (!o && i.length === 0) return null;
  const n = i.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], c = {}, l = {}, d = E(
    n,
    e,
    gt(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (c.rate_entity = d, a.push("rate"));
  const u = E(
    n,
    e,
    gt(["_current_accumulative_cost"]),
    s
  );
  u && (c.cost_entity = u, a.push("cost"));
  const p = E(
    n,
    e,
    gt(["_current_day_rates"]),
    s
  );
  p && (c.slots_entity = p, a.push("slots"));
  const _ = E(
    i.filter((b) => b.startsWith("binary_sensor.")),
    e,
    gt(["_intelligent_dispatching"]),
    s
  );
  _ && (c.dispatches_entity = _, a.push("dispatching")), Object.keys(c).length && (l.octopus = c);
  const y = E(
    n,
    e,
    R("import", "demand", "current"),
    s
  );
  y && (l.power_import = y, a.push("import power"));
  const f = E(
    n,
    e,
    R("export", "demand", "current"),
    s
  );
  f && (l.power_export = f, a.push("export power"));
  const v = E(
    n,
    e,
    Y("import", "accumulative", "consumption"),
    s
  );
  v && (l.daily_usage = v, a.push("daily import"));
  const $ = E(
    n,
    e,
    Y("export", "accumulative"),
    s
  );
  return $ && (l.daily_export = $, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: a };
}
function ci(e, t, s) {
  const o = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), i = Object.keys(e).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (o.length === 0 && !i) return null;
  const n = o.length > 0 ? o.map((f) => f.entity_id) : Object.keys(e).filter((f) => f.includes("powerwall") || f.includes("tesla")), a = n.filter((f) => f.includes("powerwall")), c = n.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (a.length > 0) {
    const f = {}, v = E(
      a,
      e,
      vs("battery", "soc", "charge", "percent"),
      s
    );
    v && (f.soc = v);
    const $ = E(
      a,
      e,
      R("battery", "power", "charge", "discharge"),
      s
    );
    $ && (f.power_combined = $);
    const b = E(
      a,
      e,
      Y("battery", "today", "daily", "charged"),
      s
    );
    b && (f.daily_usage = b), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const u = E(
    n,
    e,
    R("solar"),
    s
  );
  if (u) {
    const f = { power_combined: u }, v = E(
      n,
      e,
      Y("solar"),
      s
    );
    v && (f.daily_usage = v), d.solar = f, l.push("solar");
  }
  const p = E(
    n,
    e,
    R("load", "home", "house"),
    s
  );
  if (p) {
    const f = { power_combined: p }, v = E(
      n,
      e,
      Y("load", "home", "house"),
      s
    );
    v && (f.daily_usage = v), d.home = f, l.push("home load");
  }
  const _ = E(
    n,
    e,
    R("grid"),
    s
  );
  _ && (d.grid = { power_combined: _ }, l.push("grid"));
  const y = E(
    c,
    e,
    vs("battery", "battery_level", "soc", "charge"),
    s
  );
  if (y) {
    const f = { soc: y }, v = E(
      c,
      e,
      R("charg", "power"),
      s
    );
    v && (f.power_combined = v);
    const $ = E(
      c,
      e,
      Y("charg", "energy"),
      s
    );
    $ && (f.daily_usage = $), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function li(e) {
  var l, d;
  const t = e, s = t.states ?? {}, o = t.entities ?? {}, i = /* @__PURE__ */ new Set(), n = ci(s, o, i), a = ri(s, o, i), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), a) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (l = a.entity_types) != null && l.grid) {
      const u = a.entity_types.grid;
      c.entity_types.grid = {
        ...c.entity_types.grid,
        ...u,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: u.power_import || (d = c.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    a.tariff_entity && (c.tariff_entity = a.tariff_entity), c.summary.push(...a.summary ?? []);
  }
  return c;
}
function hi(e, t, s = !1) {
  const o = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (o.tariff_entity = t.tariff_entity);
  const i = e.entity_types ?? {}, n = { ...i };
  for (const [a, c] of Object.entries(t.entity_types)) {
    const l = i[a] ?? {}, d = { ...l };
    for (const [u, p] of Object.entries(c))
      p !== void 0 && (s || !l[u]) && (d[u] = p);
    n[a] = d;
  }
  return o.entity_types = n, o;
}
const xt = ["grid", "solar", "battery", "home", "ev"], di = "custom_";
function bs(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function pi(e) {
  return `${di}${e + 1}`;
}
function bt(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([a]) => xt.includes(a)
    )
  ), o = Object.entries(t).filter(([a]) => !xt.includes(a)).sort(([a], [c]) => bs(a) - bs(c)).map(([, a]) => ({ ...a })), i = Array.isArray(e.custom_types) ? e.custom_types.map((a) => ({ ...a })) : o, n = {
    ...s
  };
  return i.forEach((a, c) => {
    n[pi(c)] = { ...a };
  }), {
    ...e,
    entity_types: n,
    custom_types: i
  };
}
var ui = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, Bt = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? fi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, s, i) : a(i)) || i);
  return o && i && ui(t, s, i), i;
};
let dt = class extends T {
  setConfig(e) {
    this.config = bt(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: bt(e) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var t;
    const e = [...((t = this.config) == null ? void 0 : t.custom_types) ?? [], {}];
    this._dispatchConfig({
      ...this.config,
      custom_types: e
    });
  }
  _deleteCustomType(e) {
    var s;
    const t = [...((s = this.config) == null ? void 0 : s.custom_types) ?? []];
    t.splice(e, 1), this._dispatchConfig({
      ...this.config,
      custom_types: t
    });
  }
  _setCustomType(e, t) {
    var o;
    const s = [...((o = this.config) == null ? void 0 : o.custom_types) ?? []];
    s[e] = {
      ...s[e] ?? {},
      ...t
    }, this._dispatchConfig({
      ...this.config,
      custom_types: s
    });
  }
  render() {
    var e, t, s, o, i, n, a, c, l, d, u, p, _, y, f, v, $, b, A, k, O, z, M, N, C, I, ft, et, st, Vt, Wt, Gt, Kt, qt, Yt, Zt, Jt, Xt, Qt, te, ee, se, ie, oe, ne, ae, re, ce, le, he, de, pe, ue, fe, ge, ye, _e, me, ve, be, $e, we, xe, Ee, Ce, Se, Ae, ke, Te, Pe, Oe, Le, ze, Me, Ne, He, Ue, Ie, De, je, Re, Be, Fe, Ve, We, Ge, Ke, qe, Ye, Ze, Je, Xe, Qe, ts, es, ss, is, os, ns, as;
    return this.config ? m`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: bt(
            hi(this.config, li(this.hass), !1)
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
            .value=${((t = (e = this.config.entity_types) == null ? void 0 : e.grid) == null ? void 0 : t.power_import) ?? ""}
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
            .value=${((o = (s = this.config.entity_types) == null ? void 0 : s.grid) == null ? void 0 : o.power_export) ?? ""}
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
            .value=${((n = (i = this.config.entity_types) == null ? void 0 : i.grid) == null ? void 0 : n.power_combined) ?? ""}
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
          <ha-selector
            label="Export Current Rate"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${((d = (l = this.config.entity_types) == null ? void 0 : l.grid) == null ? void 0 : d.export_rate) ?? ""}
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
                  export_rate: h.detail.value || void 0
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
              .checked=${((p = (u = this.config.entity_types) == null ? void 0 : u.grid) == null ? void 0 : p.show_zero) ?? !0}
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
            .value=${((y = (_ = this.config.entity_types) == null ? void 0 : _.grid) == null ? void 0 : y.zero_tolerance) != null ? String((v = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : v.zero_tolerance) : ""}
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
              .checked=${((b = ($ = this.config.entity_types) == null ? void 0 : $.grid) == null ? void 0 : b.show_label) ?? !0}
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
            .value=${((k = (A = this.config.entity_types) == null ? void 0 : A.grid) == null ? void 0 : k.label) ?? ""}
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
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((z = (O = this.config.entity_types) == null ? void 0 : O.grid) == null ? void 0 : z.icon) ?? ""}
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
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Grid Colour"
            .value=${((N = (M = this.config.entity_types) == null ? void 0 : M.grid) == null ? void 0 : N.colour) ?? ""}
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
            .value=${((I = (C = this.config.entity_types) == null ? void 0 : C.solar) == null ? void 0 : I.power_combined) ?? ""}
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
            .value=${((et = (ft = this.config.entity_types) == null ? void 0 : ft.solar) == null ? void 0 : et.daily_usage) ?? ""}
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
              .checked=${((Vt = (st = this.config.entity_types) == null ? void 0 : st.solar) == null ? void 0 : Vt.show_zero) ?? !0}
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
            .value=${((Gt = (Wt = this.config.entity_types) == null ? void 0 : Wt.solar) == null ? void 0 : Gt.zero_tolerance) != null ? String((qt = (Kt = this.config.entity_types) == null ? void 0 : Kt.solar) == null ? void 0 : qt.zero_tolerance) : ""}
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
              .checked=${((Zt = (Yt = this.config.entity_types) == null ? void 0 : Yt.solar) == null ? void 0 : Zt.show_label) ?? !0}
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
            .value=${((Xt = (Jt = this.config.entity_types) == null ? void 0 : Jt.solar) == null ? void 0 : Xt.label) ?? ""}
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
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((te = (Qt = this.config.entity_types) == null ? void 0 : Qt.solar) == null ? void 0 : te.icon) ?? ""}
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
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Solar Colour"
            .value=${((se = (ee = this.config.entity_types) == null ? void 0 : ee.solar) == null ? void 0 : se.colour) ?? ""}
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
            .value=${((oe = (ie = this.config.entity_types) == null ? void 0 : ie.battery) == null ? void 0 : oe.soc) ?? ""}
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
            .value=${((ae = (ne = this.config.entity_types) == null ? void 0 : ne.battery) == null ? void 0 : ae.power_combined) ?? ""}
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
            .value=${((ce = (re = this.config.entity_types) == null ? void 0 : re.battery) == null ? void 0 : ce.daily_usage) ?? ""}
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
              .checked=${((he = (le = this.config.entity_types) == null ? void 0 : le.battery) == null ? void 0 : he.show_zero) ?? !0}
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
            .value=${((pe = (de = this.config.entity_types) == null ? void 0 : de.battery) == null ? void 0 : pe.zero_tolerance) != null ? String((fe = (ue = this.config.entity_types) == null ? void 0 : ue.battery) == null ? void 0 : fe.zero_tolerance) : ""}
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
              .checked=${((ye = (ge = this.config.entity_types) == null ? void 0 : ge.battery) == null ? void 0 : ye.show_label) ?? !0}
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
            .value=${((me = (_e = this.config.entity_types) == null ? void 0 : _e.battery) == null ? void 0 : me.label) ?? ""}
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
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((be = (ve = this.config.entity_types) == null ? void 0 : ve.battery) == null ? void 0 : be.icon) ?? ""}
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
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Battery Colour"
            .value=${((we = ($e = this.config.entity_types) == null ? void 0 : $e.battery) == null ? void 0 : we.colour) ?? ""}
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
            .value=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.home) == null ? void 0 : Ee.power_combined) ?? ""}
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
            .value=${((Se = (Ce = this.config.entity_types) == null ? void 0 : Ce.home) == null ? void 0 : Se.daily_usage) ?? ""}
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
              .checked=${((ke = (Ae = this.config.entity_types) == null ? void 0 : Ae.home) == null ? void 0 : ke.show_zero) ?? !0}
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
            .value=${((Pe = (Te = this.config.entity_types) == null ? void 0 : Te.home) == null ? void 0 : Pe.zero_tolerance) != null ? String((Le = (Oe = this.config.entity_types) == null ? void 0 : Oe.home) == null ? void 0 : Le.zero_tolerance) : ""}
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
              .checked=${((Me = (ze = this.config.entity_types) == null ? void 0 : ze.home) == null ? void 0 : Me.show_label) ?? !0}
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
            .value=${((He = (Ne = this.config.entity_types) == null ? void 0 : Ne.home) == null ? void 0 : He.label) ?? ""}
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
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((Ie = (Ue = this.config.entity_types) == null ? void 0 : Ue.home) == null ? void 0 : Ie.icon) ?? ""}
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
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="Home Colour"
            .value=${((je = (De = this.config.entity_types) == null ? void 0 : De.home) == null ? void 0 : je.colour) ?? ""}
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
            .value=${((Be = (Re = this.config.entity_types) == null ? void 0 : Re.ev) == null ? void 0 : Be.power_combined) ?? ""}
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
            .value=${((Ve = (Fe = this.config.entity_types) == null ? void 0 : Fe.ev) == null ? void 0 : Ve.soc) ?? ""}
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
            .value=${((Ge = (We = this.config.entity_types) == null ? void 0 : We.ev) == null ? void 0 : Ge.daily_usage) ?? ""}
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
              .checked=${((qe = (Ke = this.config.entity_types) == null ? void 0 : Ke.ev) == null ? void 0 : qe.show_zero) ?? !0}
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
            .value=${((Ze = (Ye = this.config.entity_types) == null ? void 0 : Ye.ev) == null ? void 0 : Ze.zero_tolerance) != null ? String((Xe = (Je = this.config.entity_types) == null ? void 0 : Je.ev) == null ? void 0 : Xe.zero_tolerance) : ""}
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
              .checked=${((ts = (Qe = this.config.entity_types) == null ? void 0 : Qe.ev) == null ? void 0 : ts.show_label) ?? !0}
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
            .value=${((ss = (es = this.config.entity_types) == null ? void 0 : es.ev) == null ? void 0 : ss.label) ?? ""}
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
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${((os = (is = this.config.entity_types) == null ? void 0 : is.ev) == null ? void 0 : os.icon) ?? ""}
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
                  icon: h.detail.value || void 0
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
          <ha-textfield
            label="EV Colour"
            .value=${((as = (ns = this.config.entity_types) == null ? void 0 : ns.ev) == null ? void 0 : as.colour) ?? ""}
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
      var rs;
      return m`
        <ha-expansion-panel header=${((rs = h.label) == null ? void 0 : rs.trim()) || `Custom ${r + 1}`}>
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
              @value-changed=${(x) => this._setCustomType(r, { power_import: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { power_export: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { power_combined: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { daily_usage: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(x) => this._setCustomType(r, { soc: x.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(x) => this._setCustomType(r, {
        show_zero: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(x) => this._setCustomType(r, {
        zero_tolerance: x.target.value !== "" ? Number(x.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(x) => this._setCustomType(r, {
        show_label: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(x) => this._setCustomType(r, {
        label: x.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(x) => this._setCustomType(r, {
        icon: x.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(x) => this._setCustomType(r, {
        colour: x.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : g;
  }
};
dt.styles = X`
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
Bt([
  w({ attribute: !1 })
], dt.prototype, "hass", 2);
Bt([
  w({ attribute: !1 })
], dt.prototype, "config", 2);
dt = Bt([
  tt("home-energy-card-editor")
], dt);
var gi = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, St = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? yi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, s, i) : a(i)) || i);
  return o && i && gi(t, s, i), i;
};
function yt(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  return isNaN(o) ? null : s.attributes.unit_of_measurement === "Wh" ? o / 1e3 : o;
}
function _t(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function _i(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (o) => o.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((o) => t.includes(o)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((o) => t.includes(o)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((o) => t.includes(o)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let J = class extends T {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var v, $, b, A, k, O, z, M, N, C, I;
    if (!this.config) return g;
    const e = ((v = this.hass) == null ? void 0 : v.states) ?? {}, t = this.config.entity_types ?? {}, s = (($ = this.config.display) == null ? void 0 : $.decimal_places) ?? 1, o = this.config.tariff_entity ? (b = e[this.config.tariff_entity]) == null ? void 0 : b.state : null, i = o && o !== "unavailable" && o !== "unknown" ? _i(o) : null, n = yt(e, (A = t.solar) == null ? void 0 : A.daily_usage), a = yt(e, (k = t.home) == null ? void 0 : k.daily_usage), c = yt(e, (O = t.grid) == null ? void 0 : O.daily_usage), l = yt(e, (z = t.grid) == null ? void 0 : z.daily_export), d = !!((M = t.solar) != null && M.daily_usage), u = !!((N = t.home) != null && N.daily_usage), p = !!((C = t.grid) != null && C.daily_usage), _ = !!((I = t.grid) != null && I.daily_export), y = p || _, f = d || u || y;
    return m`
      <div class="header">

        ${this.showTitle || i ? m`
          <div class="title-row">
            ${this.showTitle ? m`<span class="title">${this.config.title ?? "Home Energy"}</span>` : g}
            ${i ? m`
                  <span
                    class="tariff"
                    style="background:${i.bg};color:${i.fg};"
                  >${i.label}</span>
                ` : g}
          </div>
        ` : g}

        ${f ? m`
          <div class="stats-row">

            ${d ? m`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${_t(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${u ? m`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${_t(a, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${y ? m`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? m`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${_t(c, s)}</span>
                    </div>
                  ` : g}
                  ${_ ? m`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${_t(l, s)}</span>
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
J.styles = X`
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
St([
  w({ attribute: !1 })
], J.prototype, "hass", 2);
St([
  w({ attribute: !1 })
], J.prototype, "config", 2);
St([
  w({ type: Boolean })
], J.prototype, "showTitle", 2);
J = St([
  tt("hec-card-header")
], J);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = { CHILD: 2 }, vi = (e) => (...t) => ({ _$litDirective$: e, values: t });
let bi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, o) {
    this._$Ct = t, this._$AM = s, this._$Ci = o;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: $i } = ii, $s = (e) => e, ws = () => document.createComment(""), ot = (e, t, s) => {
  var n;
  const o = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const a = o.insertBefore(ws(), i), c = o.insertBefore(ws(), i);
    s = new $i(a, c, e, e.options);
  } else {
    const a = s._$AB.nextSibling, c = s._$AM, l = c !== e;
    if (l) {
      let d;
      (n = s._$AQ) == null || n.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== c._$AU && s._$AP(d);
    }
    if (a !== i || l) {
      let d = s._$AA;
      for (; d !== a; ) {
        const u = $s(d).nextSibling;
        $s(o).insertBefore(d, i), d = u;
      }
    }
  }
  return s;
}, j = (e, t, s = e) => (e._$AI(t, s), e), wi = {}, xi = (e, t = wi) => e._$AH = t, Ei = (e) => e._$AH, Ot = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xs = (e, t, s) => {
  const o = /* @__PURE__ */ new Map();
  for (let i = t; i <= s; i++) o.set(e[i], i);
  return o;
}, Es = vi(class extends bi {
  constructor(e) {
    if (super(e), e.type !== mi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, s) {
    let o;
    s === void 0 ? s = t : t !== void 0 && (o = t);
    const i = [], n = [];
    let a = 0;
    for (const c of e) i[a] = o ? o(c, a) : a, n[a] = s(c, a), a++;
    return { values: n, keys: i };
  }
  render(e, t, s) {
    return this.dt(e, t, s).values;
  }
  update(e, [t, s, o]) {
    const i = Ei(e), { values: n, keys: a } = this.dt(t, s, o);
    if (!Array.isArray(i)) return this.ut = a, n;
    const c = this.ut ?? (this.ut = []), l = [];
    let d, u, p = 0, _ = i.length - 1, y = 0, f = n.length - 1;
    for (; p <= _ && y <= f; ) if (i[p] === null) p++;
    else if (i[_] === null) _--;
    else if (c[p] === a[y]) l[y] = j(i[p], n[y]), p++, y++;
    else if (c[_] === a[f]) l[f] = j(i[_], n[f]), _--, f--;
    else if (c[p] === a[f]) l[f] = j(i[p], n[f]), ot(e, l[f + 1], i[p]), p++, f--;
    else if (c[_] === a[y]) l[y] = j(i[_], n[y]), ot(e, i[p], i[_]), _--, y++;
    else if (d === void 0 && (d = xs(a, y, f), u = xs(c, p, _)), d.has(c[p])) if (d.has(c[_])) {
      const v = u.get(a[y]), $ = v !== void 0 ? i[v] : null;
      if ($ === null) {
        const b = ot(e, i[p]);
        j(b, n[y]), l[y] = b;
      } else l[y] = j($, n[y]), ot(e, i[p], $), i[v] = null;
      y++;
    } else Ot(i[_]), _--;
    else Ot(i[p]), p++;
    for (; y <= f; ) {
      const v = ot(e, l[f + 1]);
      j(v, n[y]), l[y++] = v;
    }
    for (; p <= _; ) {
      const v = i[p++];
      v !== null && Ot(v);
    }
    return this.ut = a, xi(e, l), W;
  }
});
var Ci = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, P = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Si(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, s, i) : a(i)) || i);
  return o && i && Ci(t, s, i), i;
};
const Ai = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, ki = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, Mt = 38, Cs = +(2 * Math.PI * Mt).toFixed(4);
function Hs(e, t, s) {
  if (e === null) return "—";
  const o = Math.abs(e);
  return t === "W" || t === "auto" && o < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
let S = class extends T {
  constructor() {
    super(...arguments), this.type = "home", this.label = "", this.showLabel = !0, this.icon = "", this.colour = "", this.power = null, this.soc = null, this.unit = "auto", this.decimalPlaces = 1;
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
    const e = Ai[this.type] ?? ki, t = this.colour || e.accent, s = this.icon || e.icon, o = this.soc !== null, i = this.type === "grid" || this.type === "battery", n = i && this.power !== null ? Math.abs(this.power) : this.power, a = i && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : "", c = o ? Math.max(0, Math.min(100, this.soc)) : 0, l = +(Cs * (1 - c / 100)).toFixed(4);
    return m`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${o ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${Mt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${Mt}"
            style="stroke-dasharray:${Cs};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${e.gradStart} 0%,${e.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s}></ha-icon>
          ${this.showLabel ? m`<span class="label" style="color:${t};">${this.label || this.type}</span>` : g}
          <span class="power">${Hs(n, this.unit, this.decimalPlaces)}</span>
          ${a ? m`<ha-icon class="direction-icon" .icon=${a}></ha-icon>` : g}
        </div>

      </div>
    `;
  }
};
S.styles = X`
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

    .direction-icon {
      --mdc-icon-size: 16px;
      display: block;
      line-height: 1;
      opacity: 0.72;
      margin-top: -3px;
      margin-bottom: 0;
    }

    /* ── SOC text (only rendered when SOC is present) ── */
  `;
P([
  w()
], S.prototype, "type", 2);
P([
  w()
], S.prototype, "label", 2);
P([
  w({ type: Boolean })
], S.prototype, "showLabel", 2);
P([
  w()
], S.prototype, "icon", 2);
P([
  w()
], S.prototype, "colour", 2);
P([
  w({ type: Number })
], S.prototype, "power", 2);
P([
  w({ type: Number })
], S.prototype, "soc", 2);
P([
  w()
], S.prototype, "unit", 2);
P([
  w({ type: Number })
], S.prototype, "decimalPlaces", 2);
S = P([
  tt("hec-energy-node")
], S);
function Us(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function Lt(e, t) {
  var i;
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  return isNaN(o) ? null : Us(
    o,
    (i = s.attributes) == null ? void 0 : i.unit_of_measurement
  );
}
function Is(e, t, s) {
  const o = t.zero_tolerance ?? 0, i = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = Lt(s, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return i;
    const u = l ? Lt(s, t.power_import) : null, p = d ? Lt(s, t.power_export) : null;
    if ((!l || u === null) && (!d || p === null)) return i;
    n = (u ?? 0) - (p ?? 0);
  }
  if (n === null) return i;
  if (Math.abs(n) <= o) return { power: n, magnitude: null, direction: "idle" };
  const a = Math.abs(n);
  let c;
  switch (e) {
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
var Ti = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, K = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Pi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, s, i) : a(i)) || i);
  return o && i && Ti(t, s, i), i;
};
const Oi = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Li = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, zi = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Mi(e, t) {
  const s = Date.now(), o = s - 864e5, i = Array(24).fill(null);
  if (!e.length) return i;
  for (let n = 0; n < 24; n++) {
    const a = o + n * 36e5, c = a + 36e5;
    let l = 0, d = 0;
    for (let u = 0; u < e.length; u++) {
      const p = new Date(e[u].last_changed).getTime(), _ = u + 1 < e.length ? new Date(e[u + 1].last_changed).getTime() : s, y = Math.max(p, a), f = Math.min(_, c);
      if (f <= y) continue;
      const v = parseFloat(e[u].state);
      if (isNaN(v)) continue;
      const $ = Us(v, t), b = f - y;
      l += Math.abs($) * b, d += b;
    }
    d > 0 && (i[n] = l / d);
  }
  return i;
}
function Ds(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  return isNaN(o) ? null : o;
}
function mt(e, t) {
  var i;
  const s = Ds(e, t);
  return s === null ? null : ((i = e[t]) == null ? void 0 : i.attributes.unit_of_measurement) === "Wh" ? s / 1e3 : s;
}
function Ss(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function Ni(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  if (isNaN(o)) return null;
  const i = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? o / 100 : o;
}
function As(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const o = parseFloat(s.state);
  if (isNaN(o)) return null;
  const i = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? o / 100 : (i.includes("gbp") || i.includes("£"), o);
}
function zt(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function Hi(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function ks(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Ui(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function Ii(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
let L = class extends T {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var o, i, n, a;
    const e = (i = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : i[this.nodeType], t = (e == null ? void 0 : e.power_combined) ?? (e == null ? void 0 : e.power_import) ?? (e == null ? void 0 : e.power_export);
    if (!t || !this.hass) return;
    const s = (a = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : a.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const c = /* @__PURE__ */ new Date(), d = `history/period/${new Date(c.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${c.toISOString()}`, u = await this.hass.callApi("GET", d);
      this._hourly = Mi((u == null ? void 0 : u[0]) ?? [], s);
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
  _header(e, t, s) {
    return m`
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
    var i, n, a, c, l;
    const t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.decimal_places) ?? 1, s = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.unit) ?? "auto", o = ((l = zi[this.nodeType]) == null ? void 0 : l[e.direction]) ?? "";
    return m`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Hs(e.power, s, t)}</div>
        ${o ? m`<div class="power-sub">${o}</div>` : g}
      </div>
    `;
  }
  _sectionSoc(e) {
    if (e === null) return g;
    const t = Ii(e);
    return m`
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
    var a, c, l;
    const t = ((a = this.hass) == null ? void 0 : a.states) ?? {}, s = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.decimal_places) ?? 1, o = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", i = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return e.daily_usage && n.push([o, Ss(mt(t, e.daily_usage), s)]), e.daily_export && n.push([i, Ss(mt(t, e.daily_export), s)]), n.length ? m`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, u]) => m`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : g;
  }
  _sectionOctopus(e) {
    var z, M, N;
    const t = ((z = this.hass) == null ? void 0 : z.states) ?? {}, s = ((N = (M = this.config) == null ? void 0 : M.entity_types) == null ? void 0 : N.grid) ?? {}, o = e.rate_entity ? t[e.rate_entity] : null, i = e.cost_entity ? t[e.cost_entity] : null, n = e.slots_entity ? t[e.slots_entity] : null, a = o == null ? void 0 : o.state, c = (o == null ? void 0 : o.attributes.unit_of_measurement) ?? "p/kWh", l = i == null ? void 0 : i.state;
    i == null || i.attributes.unit_of_measurement;
    const d = (n == null ? void 0 : n.attributes.rates) ?? (n == null ? void 0 : n.attributes.upcoming_interval_rates) ?? (n == null ? void 0 : n.attributes.today_rates) ?? [], u = Date.now(), p = d.filter((C) => new Date(C.end ?? C.end_time ?? 0).getTime() > u).slice(0, 6), _ = a && a !== "unavailable" && a !== "unknown", y = l && l !== "unavailable" && l !== "unknown", f = mt(t, s.daily_usage), v = mt(t, s.daily_export), $ = As(t, e.rate_entity), b = As(t, s.export_rate), A = f !== null && $ !== null ? f * $ : Ni(t, e.cost_entity), k = v !== null && b !== null ? v * b : null, O = A !== null && k !== null ? A - k : null;
    return !_ && !y && !p.length && A === null && k === null && O === null ? g : m`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${_ ? m`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(a).toFixed(2)} ${c}</span>
          </div>
        ` : g}

        ${A !== null ? m`
          <div class="kv">
            <span class="kv-k">Import Cost Today</span>
            <span class="kv-v">${zt(A)}</span>
          </div>
        ` : g}

        ${k !== null ? m`
          <div class="kv">
            <span class="kv-k">Export Payment Today</span>
            <span class="kv-v">${zt(k)}</span>
          </div>
        ` : g}

        ${O !== null ? m`
          <div class="kv">
            <span class="kv-k">Net Cost</span>
            <span class="kv-v">${zt(O)}</span>
          </div>
        ` : g}

        ${p.length ? m`
          <div class="s-subtitle">Upcoming slots</div>
          ${p.map((C) => {
      const I = C.start ?? C.start_time ?? "", ft = C.end ?? C.end_time ?? "", et = C.value_inc_vat ?? C.rate_inc_vat ?? C.value ?? 0, st = Ui(et);
      return m`
              <div class="slot">
                <span class="slot-dot" style="background:${st};"></span>
                <span class="slot-time">${ks(I)}–${ks(ft)}</span>
                <span class="slot-rate" style="color:${st};">${(+et).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : g}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((n) => n !== null), s = t.length ? Math.max(...t) : 0, o = /* @__PURE__ */ new Date(), i = (n) => Hi(new Date(o.getTime() - n * 36e5));
    return this._loading ? m`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : m`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? m`<div class="chart-msg">No data</div>` : m`
              ${rt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, a) => {
      if (n === null || n <= 0) return rt``;
      const c = Math.max(2, n / s * 48);
      return rt`
                      <rect
                        x="${a * 10 + 0.5}" y="${52 - c}"
                        width="9" height="${c}" rx="2"
                        fill="${e}" opacity="0.82"
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
    var l, d, u;
    if (!this.open || !this.nodeType) return g;
    const e = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, s = e.colour || (Li[this.nodeType] ?? "#9e9e9e"), o = e.icon || Oi[this.nodeType] || "mdi:lightning-bolt", i = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = Is(this.nodeType, e, t), a = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !xt.includes(this.nodeType)), c = a ? Ds(t, e.soc) : null;
    return m`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, o, i)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(c) : g}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : g}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
L.styles = X`
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
K([
  w({ attribute: !1 })
], L.prototype, "hass", 2);
K([
  w({ attribute: !1 })
], L.prototype, "config", 2);
K([
  w()
], L.prototype, "nodeType", 2);
K([
  w({ type: Boolean })
], L.prototype, "open", 2);
K([
  Ct()
], L.prototype, "_hourly", 2);
K([
  Ct()
], L.prototype, "_loading", 2);
L = K([
  tt("hec-node-detail")
], L);
var Di = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, ut = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? ji(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, s, i) : a(i)) || i);
  return o && i && Di(t, s, i), i;
};
function Ri(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const Bi = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let G = class extends T {
  constructor() {
    super(...arguments), this._dialogType = null, this._lineLayout = {
      width: 0,
      height: 0,
      centers: {}
    }, this._measureFrame = null, this._lineVisualState = {}, this._flowSamples = {}, this._smoothedMagnitudes = {}, this._speedInterval = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => this._scheduleMeasureLineLayout()), this._speedInterval = window.setInterval(() => {
      this._refreshSmoothedMagnitudes() && (this._updateLineVisualState(), this.requestUpdate());
    }, 1e4);
  }
  disconnectedCallback() {
    var e;
    (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = void 0, this._measureFrame !== null && cancelAnimationFrame(this._measureFrame), this._measureFrame = null, this._speedInterval !== null && window.clearInterval(this._speedInterval), this._speedInterval = null, super.disconnectedCallback();
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".grid");
    e && this._resizeObserver && this._resizeObserver.observe(e), this._scheduleMeasureLineLayout();
  }
  willUpdate(e) {
    (e.has("hass") || e.has("config")) && (this._recordFlowSamples(), Object.keys(this._smoothedMagnitudes).length || this._refreshSmoothedMagnitudes(), this._updateLineVisualState());
  }
  updated(e) {
    e.has("config") && this._scheduleMeasureLineLayout();
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(e) {
    var t;
    return e in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(e) {
    var s, o, i;
    const t = ((o = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : o[e]) ?? {};
    return Is(e, t, ((i = this.hass) == null ? void 0 : i.states) ?? {});
  }
  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  _isVisible(e) {
    var s, o;
    return !(!this._configured(e) || (((o = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : o[e]) ?? {}).show_zero === !1 && this._flowInfo(e).direction === "idle");
  }
  _soc(e) {
    var i, n, a, c;
    const t = (a = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[e]) == null ? void 0 : a.soc;
    if (!t || !this.hass) return null;
    const s = (c = this.hass.states[t]) == null ? void 0 : c.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const o = parseFloat(s);
    return isNaN(o) ? null : o;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _scheduleMeasureLineLayout() {
    this._measureFrame === null && (this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = null, this._measureLineLayout();
    }));
  }
  _measureLineLayout() {
    const e = this.renderRoot.querySelector(".grid");
    if (!e) return;
    const t = e.getBoundingClientRect();
    if (!t.width || !t.height) return;
    const s = {}, o = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const a of o) {
      if (a.classList.contains("hidden")) continue;
      const c = a.dataset.nodeType;
      if (!c) continue;
      const l = a.getBoundingClientRect();
      s[c] = {
        x: l.left - t.left + l.width / 2,
        y: l.top - t.top + l.height / 2
      };
    }
    const i = {
      width: t.width,
      height: t.height,
      centers: s
    };
    this._lineLayout.width === i.width && this._lineLayout.height === i.height && JSON.stringify(this._lineLayout.centers) === JSON.stringify(i.centers) || (this._lineLayout = i);
  }
  _lineTypes() {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ].filter((e) => this._isVisible(e));
  }
  _sampleTypes() {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ];
  }
  _pruneFlowSamples(e, t) {
    const s = this._flowSamples[e] ?? [];
    this._flowSamples[e] = s.filter((o) => t - o.timestamp <= 1e4);
  }
  _recordFlowSamples() {
    const e = Date.now();
    for (const t of this._sampleTypes()) {
      const s = this._flowInfo(t), o = this._flowSamples[t] ?? [];
      o.push({
        timestamp: e,
        magnitude: s.magnitude
      }), this._flowSamples[t] = o, this._pruneFlowSamples(t, e);
    }
  }
  _refreshSmoothedMagnitudes() {
    const e = Date.now();
    let t = !1;
    for (const s of this._sampleTypes()) {
      this._pruneFlowSamples(s, e);
      const i = (this._flowSamples[s] ?? []).map((a) => a.magnitude).filter((a) => a !== null), n = i.length > 0 ? i.reduce((a, c) => a + Math.abs(c), 0) / i.length : null;
      this._smoothedMagnitudes[s] !== n && (this._smoothedMagnitudes[s] = n, t = !0);
    }
    return t;
  }
  _computeLineVisualState(e) {
    var n, a, c, l, d, u, p;
    const t = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.dynamic_animation_speed) ?? !1, s = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.animation) !== !1, o = this._flowInfo(e), i = this._smoothedMagnitudes[e] ?? o.magnitude;
    return {
      color: Bi[e] ?? ((p = (u = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : u[e]) == null ? void 0 : p.colour) ?? "#9e9e9e",
      dur: Ri(i, t && o.direction !== "idle"),
      idle: o.direction === "idle",
      paused: !s,
      reverse: o.direction === "from-home"
    };
  }
  _sameLineVisualState(e, t) {
    return !!(e && t && e.color === t.color && e.dur === t.dur && e.idle === t.idle && e.paused === t.paused && e.reverse === t.reverse);
  }
  _updateLineVisualState() {
    const e = {};
    for (const t of [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes()
    ]) {
      const s = this._computeLineVisualState(t), o = this._lineVisualState[t];
      e[t] = this._sameLineVisualState(o, s) ? o : s;
    }
    this._lineVisualState = e;
  }
  _svgLines() {
    const e = this._lineLayout.centers.home;
    return !e || !this._lineLayout.width || !this._lineLayout.height ? g : rt`
      ${Es(
      this._lineTypes(),
      (t) => t,
      (t) => {
        const s = this._lineLayout.centers[t];
        if (!s) return g;
        const o = this._lineVisualState[t] ?? this._computeLineVisualState(t), i = [
          "flow-line",
          o.reverse ? "reverse" : "",
          o.idle ? "idle" : "",
          o.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return rt`
            <line
              x1="${s.x}" y1="${s.y}" x2="${e.x}" y2="${e.y}"
              stroke="${o.color}"
              class="${i}"
              style="--flow-dur:${o.dur}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(e, t, s = !1) {
    var c, l, d;
    const o = e === "home" ? !0 : this._isVisible(e), i = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[e]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(e);
    return m`
      <hec-energy-node
        data-node-type=${e}
        class="${t}${o ? "" : " hidden"}"
        .type=${e}
        .label=${i.label ?? e}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${a.power}
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
      (t) => !xt.includes(t)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: A1→B3→A3→C3→B4→A4→C4…
   */
  _customSlot(e) {
    if (e === 0) return [1, 1];
    const t = e - 1;
    return [[2, 1, 3][t % 3], 3 + Math.floor(t / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(e, t, s) {
    var c, l, d;
    const o = this._isVisible(e), i = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[e]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(e);
    return m`
      <hec-energy-node
        data-node-type=${e}
        style="grid-column:${t}; grid-row:${s}"
        class="${o ? "" : "hidden"}"
        .type=${e}
        .label=${i.label ?? e}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${a.power}
        .soc=${i.soc ? this._soc(e) : null}
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
    if (!this.config) return g;
    const e = this._customTypes();
    return 2 + Math.ceil(e.length / 3), m`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
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
        ${Es(e, (t) => t, (t, s) => {
      const [o, i] = this._customSlot(s);
      return this._customNode(t, o, i);
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
G.styles = X`
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
      from { stroke-dashoffset: 9; }
      to   { stroke-dashoffset:  0; }
    }
    @keyframes flow-rev {
      from { stroke-dashoffset: -9; }
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
ut([
  w({ attribute: !1 })
], G.prototype, "hass", 2);
ut([
  w({ attribute: !1 })
], G.prototype, "config", 2);
ut([
  Ct()
], G.prototype, "_dialogType", 2);
ut([
  Ct()
], G.prototype, "_lineLayout", 2);
G = ut([
  tt("hec-flow-layout")
], G);
var Fi = Object.defineProperty, Vi = Object.getOwnPropertyDescriptor, Ft = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? Vi(t, s) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, s, i) : a(i)) || i);
  return o && i && Fi(t, s, i), i;
};
let pt = class extends T {
  setConfig(e) {
    this.config = bt(e);
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? m`
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
pt.styles = X`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ft([
  w({ attribute: !1 })
], pt.prototype, "hass", 2);
Ft([
  w({ attribute: !1 })
], pt.prototype, "config", 2);
pt = Ft([
  tt("home-energy-card")
], pt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  pt as HomeEnergyCard
};
