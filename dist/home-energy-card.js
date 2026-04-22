/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis, At = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), es = /* @__PURE__ */ new WeakMap();
let ms = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (At && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = es.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && es.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ks = (s) => new ms(typeof s == "string" ? s : s + "", void 0, Tt), F = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((o, i, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new ms(e, s, Tt);
}, Ps = (s, t) => {
  if (At) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = ut.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, s.appendChild(o);
  }
}, ss = At ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return ks(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Os, defineProperty: zs, getOwnPropertyDescriptor: Ls, getOwnPropertyNames: Ns, getOwnPropertySymbols: Hs, getPrototypeOf: Us } = Object, z = globalThis, is = z.trustedTypes, Ds = is ? is.emptyScript : "", $t = z.reactiveElementPolyfillSupport, tt = (s, t) => s, ft = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Ds : null;
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
} }, kt = (s, t) => !Os(s, t), os = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), z.litPropertyMetadata ?? (z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = os) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && zs(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: n } = Ls(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? os;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = Us(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const e = this.properties, o = [...Ns(e), ...Hs(e)];
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
      for (const i of o) e.unshift(ss(i));
    } else t !== void 0 && e.push(ss(t));
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
    return Ps(t, this.constructor.elementStyles), t;
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
      const a = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : ft).toAttribute(e, o.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = o.getPropertyOptions(i), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : ft;
      this._$Em = i;
      const d = h.fromAttribute(e, c.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, n) {
    var a;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), o ?? (o = c.getPropertyOptions(t)), !((o.hasChanged ?? kt)(n, e) || o.useDefault && o.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(c._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: i, wrapped: n }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: c } = a, h = this[n];
        c !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, a, h);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[tt("elementProperties")] = /* @__PURE__ */ new Map(), R[tt("finalized")] = /* @__PURE__ */ new Map(), $t == null || $t({ ReactiveElement: R }), (z.reactiveElementVersions ?? (z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, ns = (s) => s, yt = et.trustedTypes, as = yt ? yt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, bs = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, $s = "?" + O, Ms = `<${$s}>`, D = document, it = () => D.createComment(""), ot = (s) => s === null || typeof s != "object" && typeof s != "function", Pt = Array.isArray, js = (s) => Pt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", wt = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rs = /-->/g, cs = />/g, L = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ls = /'/g, hs = /"/g, ws = /^(?:script|style|textarea|title)$/i, xs = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), _ = xs(1), st = xs(2), B = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ds = /* @__PURE__ */ new WeakMap(), H = D.createTreeWalker(D, 129);
function Es(s, t) {
  if (!Pt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return as !== void 0 ? as.createHTML(t) : t;
}
const Rs = (s, t) => {
  const e = s.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Q;
  for (let c = 0; c < e; c++) {
    const h = s[c];
    let d, p, u = -1, v = 0;
    for (; v < h.length && (a.lastIndex = v, p = a.exec(h), p !== null); ) v = a.lastIndex, a === Q ? p[1] === "!--" ? a = rs : p[1] !== void 0 ? a = cs : p[2] !== void 0 ? (ws.test(p[2]) && (i = RegExp("</" + p[2], "g")), a = L) : p[3] !== void 0 && (a = L) : a === L ? p[0] === ">" ? (a = i ?? Q, u = -1) : p[1] === void 0 ? u = -2 : (u = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? L : p[3] === '"' ? hs : ls) : a === hs || a === ls ? a = L : a === rs || a === cs ? a = Q : (a = L, i = void 0);
    const m = a === L && s[c + 1].startsWith("/>") ? " " : "";
    n += a === Q ? h + Ms : u >= 0 ? (o.push(d), h.slice(0, u) + bs + h.slice(u) + O + m) : h + O + (u === -2 ? c : m);
  }
  return [Es(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class nt {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, h = this.parts, [d, p] = Rs(t, e);
    if (this.el = nt.createElement(d, o), H.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = H.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(bs)) {
          const v = p[a++], m = i.getAttribute(u).split(O), g = /([.?@])?(.*)/.exec(v);
          h.push({ type: 1, index: n, name: g[2], strings: m, ctor: g[1] === "." ? Bs : g[1] === "?" ? Vs : g[1] === "@" ? Ws : vt }), i.removeAttribute(u);
        } else u.startsWith(O) && (h.push({ type: 6, index: n }), i.removeAttribute(u));
        if (ws.test(i.tagName)) {
          const u = i.textContent.split(O), v = u.length - 1;
          if (v > 0) {
            i.textContent = yt ? yt.emptyScript : "";
            for (let m = 0; m < v; m++) i.append(u[m], it()), H.nextNode(), h.push({ type: 2, index: ++n });
            i.append(u[v], it());
          }
        }
      } else if (i.nodeType === 8) if (i.data === $s) h.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(O, u + 1)) !== -1; ) h.push({ type: 7, index: n }), u += O.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const o = D.createElement("template");
    return o.innerHTML = t, o;
  }
}
function V(s, t, e = s, o) {
  var a, c;
  if (t === B) return t;
  let i = o !== void 0 ? (a = e._$Co) == null ? void 0 : a[o] : e._$Cl;
  const n = ot(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = i : e._$Cl = i), i !== void 0 && (t = V(s, i._$AS(s, t.values), i, o)), t;
}
class Is {
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
    const { el: { content: e }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    H.currentNode = i;
    let n = H.nextNode(), a = 0, c = 0, h = o[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let d;
        h.type === 2 ? d = new ct(n, n.nextSibling, this, t) : h.type === 1 ? d = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (d = new Fs(n, this, t)), this._$AV.push(d), h = o[++c];
      }
      a !== (h == null ? void 0 : h.index) && (n = H.nextNode(), a++);
    }
    return H.currentNode = D, i;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class ct {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = V(this, t, e), ot(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : js(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = nt.createElement(Es(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const a = new Is(i, this), c = a.u(this.options);
      a.p(e), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = ds.get(t.strings);
    return e === void 0 && ds.set(t.strings, e = new nt(t)), e;
  }
  k(t) {
    Pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, i = 0;
    for (const n of t) i === e.length ? e.push(o = new ct(this.O(it()), this.O(it()), this, this.options)) : o = e[i], o._$AI(n), i++;
    i < e.length && (this._$AR(o && o._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = ns(t).nextSibling;
      ns(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, i, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = f;
  }
  _$AI(t, e = this, o, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = V(this, t, e, 0), a = !ot(t) || t !== this._$AH && t !== B, a && (this._$AH = t);
    else {
      const c = t;
      let h, d;
      for (t = n[0], h = 0; h < n.length - 1; h++) d = V(this, c[o + h], e, h), d === B && (d = this._$AH[h]), a || (a = !ot(d) || d !== this._$AH[h]), d === f ? t = f : t !== f && (t += (d ?? "") + n[h + 1]), this._$AH[h] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Bs extends vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Vs extends vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Ws extends vt {
  constructor(t, e, o, i, n) {
    super(t, e, o, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = V(this, t, e, 0) ?? f) === B) return;
    const o = this._$AH, i = t === f && o !== f || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== f && (o === f || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fs {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const xt = et.litHtmlPolyfillSupport;
xt == null || xt(nt, ct), (et.litHtmlVersions ?? (et.litHtmlVersions = [])).push("3.3.2");
const Gs = (s, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = i = new ct(t.insertBefore(it(), n), n, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis;
class S extends R {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gs(e, this.renderRoot, this.renderOptions);
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
    return B;
  }
}
var vs;
S._$litElement$ = !0, S.finalized = !0, (vs = U.litElementHydrateSupport) == null || vs.call(U, { LitElement: S });
const Et = U.litElementPolyfillSupport;
Et == null || Et({ LitElement: S });
(U.litElementVersions ?? (U.litElementVersions = [])).push("4.2.2");
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
const Ks = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: kt }, qs = (s = Ks, t, e) => {
  const { kind: o, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), o === "accessor") {
    const { name: a } = e;
    return { set(c) {
      const h = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, h, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, s, c), c;
    } };
  }
  if (o === "setter") {
    const { name: a } = e;
    return function(c) {
      const h = this[a];
      t.call(this, c), this.requestUpdate(a, h, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function $(s) {
  return (t, e) => typeof e == "object" ? qs(s, t, e) : ((o, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function mt(s) {
  return $({ ...s, state: !0, attribute: !1 });
}
const Ot = (s) => s.attributes.device_class ?? "", zt = (s) => s.attributes.unit_of_measurement ?? "", Lt = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function N(...s) {
  return (t, e) => {
    let o = 0;
    Ot(e) === "power" && (o += 4), ["W", "kW"].includes(zt(e)) && (o += 2);
    const i = Lt(t, e);
    for (const n of s) i.includes(n) && (o += 1);
    return o;
  };
}
function I(...s) {
  return (t, e) => {
    let o = 0;
    Ot(e) === "energy" && (o += 4), ["kWh", "Wh", "MWh"].includes(zt(e)) && (o += 2);
    const i = Lt(t, e);
    for (const n of s) i.includes(n) && (o += 1);
    return o;
  };
}
function ps(...s) {
  return (t, e) => {
    let o = 0;
    Ot(e) === "battery" && (o += 4), zt(e) === "%" && (o += 2);
    const i = Lt(t, e);
    for (const n of s) i.includes(n) && (o += 1);
    return o;
  };
}
function ht(s, t = []) {
  return (e, o) => {
    const i = e.toLowerCase();
    if (t.some((a) => i.includes(a))) return 0;
    let n = 0;
    for (const a of s) i.includes(a) && (n += 4);
    return n;
  };
}
function E(s, t, e, o) {
  let i, n = 0;
  for (const a of s) {
    if (o.has(a)) continue;
    const c = t[a];
    if (!c) continue;
    const h = e(a, c);
    h > n && (n = h, i = a);
  }
  return i && o.add(i), i;
}
function Ys(s, t, e) {
  const o = Object.values(t).some(
    (b) => b.platform === "octopus_energy" && !b.disabled_by
  ), i = Object.keys(s).filter((b) => b.includes("octopus_energy"));
  if (!o && i.length === 0) return null;
  const n = i.filter(
    (b) => b.includes("octopus_energy_electricity")
  ), a = ["Octopus Energy"], c = {}, h = {}, d = E(
    n,
    s,
    ht(["_current_rate"], ["export", "accumulative"]),
    e
  );
  d && (c.rate_entity = d, a.push("rate"));
  const p = E(
    n,
    s,
    ht(["_current_accumulative_cost"]),
    e
  );
  p && (c.cost_entity = p, a.push("cost"));
  const u = E(
    n,
    s,
    ht(["_current_day_rates"]),
    e
  );
  u && (c.slots_entity = u, a.push("slots"));
  const v = E(
    i.filter((b) => b.startsWith("binary_sensor.")),
    s,
    ht(["_intelligent_dispatching"]),
    e
  );
  v && (c.dispatches_entity = v, a.push("dispatching")), Object.keys(c).length && (h.octopus = c);
  const m = E(
    n,
    s,
    N("import", "demand", "current"),
    e
  );
  m && (h.power_import = m, a.push("import power"));
  const g = E(
    n,
    s,
    N("export", "demand", "current"),
    e
  );
  g && (h.power_export = g, a.push("export power"));
  const y = E(
    n,
    s,
    I("import", "accumulative", "consumption"),
    e
  );
  y && (h.daily_usage = y, a.push("daily import"));
  const x = E(
    n,
    s,
    I("export", "accumulative"),
    e
  );
  return x && (h.daily_export = x, a.push("daily export")), { integration_type: "octopus", entity_types: { grid: h }, summary: a };
}
function Zs(s, t, e) {
  const o = Object.values(t).filter(
    (g) => g.platform === "tesla_custom" && !g.disabled_by
  ), i = Object.keys(s).some(
    (g) => g.includes("powerwall") || g.includes("tesla")
  );
  if (o.length === 0 && !i) return null;
  const n = o.length > 0 ? o.map((g) => g.entity_id) : Object.keys(s).filter((g) => g.includes("powerwall") || g.includes("tesla")), a = n.filter((g) => g.includes("powerwall")), c = n.filter((g) => !g.includes("powerwall")), h = ["Tesla"], d = {};
  if (a.length > 0) {
    const g = {}, y = E(
      a,
      s,
      ps("battery", "soc", "charge", "percent"),
      e
    );
    y && (g.soc = y);
    const x = E(
      a,
      s,
      N("battery", "power", "charge", "discharge"),
      e
    );
    x && (g.power_combined = x);
    const b = E(
      a,
      s,
      I("battery", "today", "daily", "charged"),
      e
    );
    b && (g.daily_usage = b), Object.keys(g).length && (d.battery = g, h.push("Powerwall"));
  }
  const p = E(
    n,
    s,
    N("solar"),
    e
  );
  if (p) {
    const g = { power_combined: p }, y = E(
      n,
      s,
      I("solar"),
      e
    );
    y && (g.daily_usage = y), d.solar = g, h.push("solar");
  }
  const u = E(
    n,
    s,
    N("load", "home", "house"),
    e
  );
  if (u) {
    const g = { power_combined: u }, y = E(
      n,
      s,
      I("load", "home", "house"),
      e
    );
    y && (g.daily_usage = y), d.home = g, h.push("home load");
  }
  const v = E(
    n,
    s,
    N("grid"),
    e
  );
  v && (d.grid = { power_combined: v }, h.push("grid"));
  const m = E(
    c,
    s,
    ps("battery", "battery_level", "soc", "charge"),
    e
  );
  if (m) {
    const g = { soc: m }, y = E(
      c,
      s,
      N("charg", "power"),
      e
    );
    y && (g.power_combined = y);
    const x = E(
      c,
      s,
      I("charg", "energy"),
      e
    );
    x && (g.daily_usage = x), d.ev = g, h.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: h };
}
function Js(s) {
  var h, d;
  const t = s, e = t.states ?? {}, o = t.entities ?? {}, i = /* @__PURE__ */ new Set(), n = Zs(e, o, i), a = Ys(e, o, i), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), a) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (h = a.entity_types) != null && h.grid) {
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
function Xs(s, t, e = !1) {
  const o = { ...s };
  t.tariff_entity && (e || !s.tariff_entity) && (o.tariff_entity = t.tariff_entity);
  const i = s.entity_types ?? {}, n = { ...i };
  for (const [a, c] of Object.entries(t.entity_types)) {
    const h = i[a] ?? {}, d = { ...h };
    for (const [p, u] of Object.entries(c))
      u !== void 0 && (e || !h[p]) && (d[p] = u);
    n[a] = d;
  }
  return o.entity_types = n, o;
}
const _t = ["grid", "solar", "battery", "home", "ev"], Qs = "custom_";
function us(s) {
  const t = s.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function ti(s) {
  return `${Qs}${s + 1}`;
}
function gt(s) {
  const t = s.entity_types ?? {}, e = Object.fromEntries(
    Object.entries(t).filter(
      ([a]) => _t.includes(a)
    )
  ), o = Object.entries(t).filter(([a]) => !_t.includes(a)).sort(([a], [c]) => us(a) - us(c)).map(([, a]) => ({ ...a })), i = Array.isArray(s.custom_types) ? s.custom_types.map((a) => ({ ...a })) : o, n = {
    ...e
  };
  return i.forEach((a, c) => {
    n[ti(c)] = { ...a };
  }), {
    ...s,
    entity_types: n,
    custom_types: i
  };
}
var ei = Object.defineProperty, si = Object.getOwnPropertyDescriptor, Nt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? si(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && ei(t, e, i), i;
};
let at = class extends S {
  setConfig(s) {
    this.config = gt(s);
  }
  _dispatchConfig(s) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: gt(s) },
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
    var o;
    const e = [...((o = this.config) == null ? void 0 : o.custom_types) ?? []];
    e[s] = {
      ...e[s] ?? {},
      ...t
    }, this._dispatchConfig({
      ...this.config,
      custom_types: e
    });
  }
  render() {
    var s, t, e, o, i, n, a, c, h, d, p, u, v, m, g, y, x, b, k, P, K, q, Y, Z, J, X, Ut, Dt, Mt, jt, Rt, It, Bt, Vt, Wt, Ft, Gt, Kt, qt, Yt, Zt, Jt, Xt, Qt, te, ee, se, ie, oe, ne, ae, re, ce, le, he, de, pe, ue, ge, fe, ye, _e, ve, me, be, $e, we, xe, Ee, Ce, Se, Ae, Te, ke, Pe, Oe, ze, Le, Ne, He, Ue, De, Me, je, Re, Ie, Be, Ve, We, Fe, Ge, Ke, qe, Ye, Ze, Je, Xe, Qe;
    return this.config ? _`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: gt(
            Xs(this.config, Js(this.hass), !1)
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
            @change=${(l) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            title: l.target.value || void 0
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
              @change=${(l) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header: l.target.checked
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
            @value-changed=${(l) => {
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
                  power_import: l.detail.value || void 0
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
            .value=${((o = (e = this.config.entity_types) == null ? void 0 : e.grid) == null ? void 0 : o.power_export) ?? ""}
            @value-changed=${(l) => {
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
                  power_export: l.detail.value || void 0
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
            @value-changed=${(l) => {
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
                  power_combined: l.detail.value || void 0
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
            @value-changed=${(l) => {
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
                  daily_usage: l.detail.value || void 0
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
              .checked=${((d = (h = this.config.entity_types) == null ? void 0 : h.grid) == null ? void 0 : d.show_zero) ?? !0}
              @change=${(l) => {
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
                  show_zero: l.target.checked
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
            .value=${((u = (p = this.config.entity_types) == null ? void 0 : p.grid) == null ? void 0 : u.zero_tolerance) != null ? String((m = (v = this.config.entity_types) == null ? void 0 : v.grid) == null ? void 0 : m.zero_tolerance) : ""}
            @change=${(l) => {
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
                  zero_tolerance: l.target.value !== "" ? Number(l.target.value) : void 0
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
              .checked=${((y = (g = this.config.entity_types) == null ? void 0 : g.grid) == null ? void 0 : y.show_label) ?? !0}
              @change=${(l) => {
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
                  show_label: l.target.checked
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
            .value=${((b = (x = this.config.entity_types) == null ? void 0 : x.grid) == null ? void 0 : b.label) ?? ""}
            @change=${(l) => {
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
                  label: l.target.value || void 0
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
            .value=${((P = (k = this.config.entity_types) == null ? void 0 : k.grid) == null ? void 0 : P.icon) ?? ""}
            @value-changed=${(l) => {
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
                  icon: l.detail.value || void 0
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
            .value=${((q = (K = this.config.entity_types) == null ? void 0 : K.grid) == null ? void 0 : q.colour) ?? ""}
            @change=${(l) => {
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
                  colour: l.target.value || void 0
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
            .value=${((Z = (Y = this.config.entity_types) == null ? void 0 : Y.solar) == null ? void 0 : Z.power_combined) ?? ""}
            @value-changed=${(l) => {
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
                  power_combined: l.detail.value || void 0
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
            .value=${((X = (J = this.config.entity_types) == null ? void 0 : J.solar) == null ? void 0 : X.daily_usage) ?? ""}
            @value-changed=${(l) => {
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
                  daily_usage: l.detail.value || void 0
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
              .checked=${((Dt = (Ut = this.config.entity_types) == null ? void 0 : Ut.solar) == null ? void 0 : Dt.show_zero) ?? !0}
              @change=${(l) => {
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
                  show_zero: l.target.checked
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
            .value=${((jt = (Mt = this.config.entity_types) == null ? void 0 : Mt.solar) == null ? void 0 : jt.zero_tolerance) != null ? String((It = (Rt = this.config.entity_types) == null ? void 0 : Rt.solar) == null ? void 0 : It.zero_tolerance) : ""}
            @change=${(l) => {
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
                  zero_tolerance: l.target.value !== "" ? Number(l.target.value) : void 0
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
              .checked=${((Vt = (Bt = this.config.entity_types) == null ? void 0 : Bt.solar) == null ? void 0 : Vt.show_label) ?? !0}
              @change=${(l) => {
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
                  show_label: l.target.checked
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
            .value=${((Ft = (Wt = this.config.entity_types) == null ? void 0 : Wt.solar) == null ? void 0 : Ft.label) ?? ""}
            @change=${(l) => {
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
                  label: l.target.value || void 0
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
            .value=${((Kt = (Gt = this.config.entity_types) == null ? void 0 : Gt.solar) == null ? void 0 : Kt.icon) ?? ""}
            @value-changed=${(l) => {
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
                  icon: l.detail.value || void 0
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
            .value=${((Yt = (qt = this.config.entity_types) == null ? void 0 : qt.solar) == null ? void 0 : Yt.colour) ?? ""}
            @change=${(l) => {
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
                  colour: l.target.value || void 0
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
            .value=${((Jt = (Zt = this.config.entity_types) == null ? void 0 : Zt.battery) == null ? void 0 : Jt.soc) ?? ""}
            @value-changed=${(l) => {
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
                  soc: l.detail.value || void 0
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
            .value=${((Qt = (Xt = this.config.entity_types) == null ? void 0 : Xt.battery) == null ? void 0 : Qt.power_combined) ?? ""}
            @value-changed=${(l) => {
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
                  power_combined: l.detail.value || void 0
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
            .value=${((ee = (te = this.config.entity_types) == null ? void 0 : te.battery) == null ? void 0 : ee.daily_usage) ?? ""}
            @value-changed=${(l) => {
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
                  daily_usage: l.detail.value || void 0
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
              .checked=${((ie = (se = this.config.entity_types) == null ? void 0 : se.battery) == null ? void 0 : ie.show_zero) ?? !0}
              @change=${(l) => {
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
                  show_zero: l.target.checked
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
            .value=${((ne = (oe = this.config.entity_types) == null ? void 0 : oe.battery) == null ? void 0 : ne.zero_tolerance) != null ? String((re = (ae = this.config.entity_types) == null ? void 0 : ae.battery) == null ? void 0 : re.zero_tolerance) : ""}
            @change=${(l) => {
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
                  zero_tolerance: l.target.value !== "" ? Number(l.target.value) : void 0
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
              .checked=${((le = (ce = this.config.entity_types) == null ? void 0 : ce.battery) == null ? void 0 : le.show_label) ?? !0}
              @change=${(l) => {
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
                  show_label: l.target.checked
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
            .value=${((de = (he = this.config.entity_types) == null ? void 0 : he.battery) == null ? void 0 : de.label) ?? ""}
            @change=${(l) => {
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
                  label: l.target.value || void 0
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
            .value=${((ue = (pe = this.config.entity_types) == null ? void 0 : pe.battery) == null ? void 0 : ue.icon) ?? ""}
            @value-changed=${(l) => {
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
                  icon: l.detail.value || void 0
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
            .value=${((fe = (ge = this.config.entity_types) == null ? void 0 : ge.battery) == null ? void 0 : fe.colour) ?? ""}
            @change=${(l) => {
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
                  colour: l.target.value || void 0
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
            .value=${((_e = (ye = this.config.entity_types) == null ? void 0 : ye.home) == null ? void 0 : _e.power_combined) ?? ""}
            @value-changed=${(l) => {
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
                  power_combined: l.detail.value || void 0
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
            .value=${((me = (ve = this.config.entity_types) == null ? void 0 : ve.home) == null ? void 0 : me.daily_usage) ?? ""}
            @value-changed=${(l) => {
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
                  daily_usage: l.detail.value || void 0
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
              .checked=${(($e = (be = this.config.entity_types) == null ? void 0 : be.home) == null ? void 0 : $e.show_zero) ?? !0}
              @change=${(l) => {
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
                  show_zero: l.target.checked
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
            .value=${((xe = (we = this.config.entity_types) == null ? void 0 : we.home) == null ? void 0 : xe.zero_tolerance) != null ? String((Ce = (Ee = this.config.entity_types) == null ? void 0 : Ee.home) == null ? void 0 : Ce.zero_tolerance) : ""}
            @change=${(l) => {
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
                  zero_tolerance: l.target.value !== "" ? Number(l.target.value) : void 0
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
              .checked=${((Ae = (Se = this.config.entity_types) == null ? void 0 : Se.home) == null ? void 0 : Ae.show_label) ?? !0}
              @change=${(l) => {
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
                  show_label: l.target.checked
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
            .value=${((ke = (Te = this.config.entity_types) == null ? void 0 : Te.home) == null ? void 0 : ke.label) ?? ""}
            @change=${(l) => {
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
                  label: l.target.value || void 0
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
            .value=${((Oe = (Pe = this.config.entity_types) == null ? void 0 : Pe.home) == null ? void 0 : Oe.icon) ?? ""}
            @value-changed=${(l) => {
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
                  icon: l.detail.value || void 0
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
            .value=${((Le = (ze = this.config.entity_types) == null ? void 0 : ze.home) == null ? void 0 : Le.colour) ?? ""}
            @change=${(l) => {
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
                  colour: l.target.value || void 0
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
            .value=${((He = (Ne = this.config.entity_types) == null ? void 0 : Ne.ev) == null ? void 0 : He.power_combined) ?? ""}
            @value-changed=${(l) => {
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
                  power_combined: l.detail.value || void 0
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
            .value=${((De = (Ue = this.config.entity_types) == null ? void 0 : Ue.ev) == null ? void 0 : De.soc) ?? ""}
            @value-changed=${(l) => {
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
                  soc: l.detail.value || void 0
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
            .value=${((je = (Me = this.config.entity_types) == null ? void 0 : Me.ev) == null ? void 0 : je.daily_usage) ?? ""}
            @value-changed=${(l) => {
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
                  daily_usage: l.detail.value || void 0
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
              .checked=${((Ie = (Re = this.config.entity_types) == null ? void 0 : Re.ev) == null ? void 0 : Ie.show_zero) ?? !0}
              @change=${(l) => {
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
                  show_zero: l.target.checked
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
            .value=${((Ve = (Be = this.config.entity_types) == null ? void 0 : Be.ev) == null ? void 0 : Ve.zero_tolerance) != null ? String((Fe = (We = this.config.entity_types) == null ? void 0 : We.ev) == null ? void 0 : Fe.zero_tolerance) : ""}
            @change=${(l) => {
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
                  zero_tolerance: l.target.value !== "" ? Number(l.target.value) : void 0
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
              .checked=${((Ke = (Ge = this.config.entity_types) == null ? void 0 : Ge.ev) == null ? void 0 : Ke.show_label) ?? !0}
              @change=${(l) => {
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
                  show_label: l.target.checked
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
            .value=${((Ye = (qe = this.config.entity_types) == null ? void 0 : qe.ev) == null ? void 0 : Ye.label) ?? ""}
            @change=${(l) => {
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
                  label: l.target.value || void 0
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
            .value=${((Je = (Ze = this.config.entity_types) == null ? void 0 : Ze.ev) == null ? void 0 : Je.icon) ?? ""}
            @value-changed=${(l) => {
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
                  icon: l.detail.value || void 0
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
            .value=${((Qe = (Xe = this.config.entity_types) == null ? void 0 : Xe.ev) == null ? void 0 : Qe.colour) ?? ""}
            @change=${(l) => {
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
                  colour: l.target.value || void 0
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

      ${(this.config.custom_types ?? []).map((l, r) => {
      var ts;
      return _`
        <ha-expansion-panel header=${((ts = l.label) == null ? void 0 : ts.trim()) || `Custom ${r + 1}`}>
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
              .value=${l.power_import ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { power_import: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${l.power_export ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { power_export: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${l.power_combined ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { power_combined: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${l.daily_usage ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { daily_usage: w.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${l.soc ?? ""}
              @value-changed=${(w) => this._setCustomType(r, { soc: w.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${l.show_zero ?? !0}
                @change=${(w) => this._setCustomType(r, {
        show_zero: w.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${l.zero_tolerance != null ? String(l.zero_tolerance) : ""}
              @change=${(w) => this._setCustomType(r, {
        zero_tolerance: w.target.value !== "" ? Number(w.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${l.show_label ?? !0}
                @change=${(w) => this._setCustomType(r, {
        show_label: w.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${l.label ?? ""}
              @change=${(w) => this._setCustomType(r, {
        label: w.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${l.icon ?? ""}
              @value-changed=${(w) => this._setCustomType(r, {
        icon: w.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${l.colour ?? ""}
              @change=${(w) => this._setCustomType(r, {
        colour: w.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : f;
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
Nt([
  $({ attribute: !1 })
], at.prototype, "hass", 2);
Nt([
  $({ attribute: !1 })
], at.prototype, "config", 2);
at = Nt([
  G("home-energy-card-editor")
], at);
var ii = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, bt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? oi(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && ii(t, e, i), i;
};
function dt(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : e.attributes.unit_of_measurement === "Wh" ? o / 1e3 : o;
}
function pt(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function ni(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (o) => o.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((o) => t.includes(o)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((o) => t.includes(o)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((o) => t.includes(o)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
    label: e,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let W = class extends S {
  constructor() {
    super(...arguments), this.showTitle = !0;
  }
  render() {
    var y, x, b, k, P, K, q, Y, Z, J, X;
    if (!this.config) return f;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = this.config.entity_types ?? {}, e = ((x = this.config.display) == null ? void 0 : x.decimal_places) ?? 1, o = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, i = o && o !== "unavailable" && o !== "unknown" ? ni(o) : null, n = dt(s, (k = t.solar) == null ? void 0 : k.daily_usage), a = dt(s, (P = t.home) == null ? void 0 : P.daily_usage), c = dt(s, (K = t.grid) == null ? void 0 : K.daily_usage), h = dt(s, (q = t.grid) == null ? void 0 : q.daily_export), d = !!((Y = t.solar) != null && Y.daily_usage), p = !!((Z = t.home) != null && Z.daily_usage), u = !!((J = t.grid) != null && J.daily_usage), v = !!((X = t.grid) != null && X.daily_export), m = u || v, g = d || p || m;
    return _`
      <div class="header">

        ${this.showTitle || i ? _`
          <div class="title-row">
            ${this.showTitle ? _`<span class="title">${this.config.title ?? "Home Energy"}</span>` : f}
            ${i ? _`
                  <span
                    class="tariff"
                    style="background:${i.bg};color:${i.fg};"
                  >${i.label}</span>
                ` : f}
          </div>
        ` : f}

        ${g ? _`
          <div class="stats-row">

            ${d ? _`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${pt(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${p ? _`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${pt(a, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : f}

            ${m ? _`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${u ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${pt(c, e)}</span>
                    </div>
                  ` : f}
                  ${v ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${pt(h, e)}</span>
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
W.styles = F`
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
bt([
  $({ attribute: !1 })
], W.prototype, "hass", 2);
bt([
  $({ attribute: !1 })
], W.prototype, "config", 2);
bt([
  $({ type: Boolean })
], W.prototype, "showTitle", 2);
W = bt([
  G("hec-card-header")
], W);
var ai = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, A = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ri(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && ai(t, e, i), i;
};
const ci = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, li = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, St = 38, gs = +(2 * Math.PI * St).toFixed(4);
function Cs(s, t, e) {
  if (s === null) return "—";
  const o = Math.abs(s);
  return t === "W" || t === "auto" && o < 1e3 ? `${Math.round(s)} W` : `${(s / 1e3).toFixed(e)} kW`;
}
let C = class extends S {
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
    const s = ci[this.type] ?? li, t = this.colour || s.accent, e = this.icon || s.icon, o = this.soc !== null, i = this.type === "grid", n = i && this.power !== null ? Math.abs(this.power) : this.power, a = i && this.power !== null ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : "", c = o ? Math.max(0, Math.min(100, this.soc)) : 0, h = +(gs * (1 - c / 100)).toFixed(4);
    return _`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${o ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${St}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${St}"
            style="stroke-dasharray:${gs};stroke-dashoffset:${h};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${s.gradStart} 0%,${s.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${e}></ha-icon>
          ${this.showLabel ? _`<span class="label" style="color:${t};">${this.label || this.type}</span>` : f}
          <span class="power">${Cs(n, this.unit, this.decimalPlaces)}</span>
          ${a ? _`<ha-icon class="direction-icon" .icon=${a}></ha-icon>` : f}
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

    .direction-icon {
      --mdc-icon-size: 14px;
      opacity: 0.72;
      margin-top: -4px;
    }

    /* ── SOC text (only rendered when SOC is present) ── */
  `;
A([
  $()
], C.prototype, "type", 2);
A([
  $()
], C.prototype, "label", 2);
A([
  $({ type: Boolean })
], C.prototype, "showLabel", 2);
A([
  $()
], C.prototype, "icon", 2);
A([
  $()
], C.prototype, "colour", 2);
A([
  $({ type: Number })
], C.prototype, "power", 2);
A([
  $({ type: Number })
], C.prototype, "soc", 2);
A([
  $()
], C.prototype, "unit", 2);
A([
  $({ type: Number })
], C.prototype, "decimalPlaces", 2);
C = A([
  G("hec-energy-node")
], C);
function Ss(s, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? s * 1e3 : s;
}
function Ct(s, t) {
  var i;
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : Ss(
    o,
    (i = e.attributes) == null ? void 0 : i.unit_of_measurement
  );
}
function As(s, t, e) {
  const o = t.zero_tolerance ?? 0, i = { power: null, magnitude: null, direction: "idle" };
  let n;
  if (t.power_combined)
    n = Ct(e, t.power_combined);
  else {
    const h = !!t.power_import, d = !!t.power_export;
    if (!h && !d) return i;
    const p = h ? Ct(e, t.power_import) : null, u = d ? Ct(e, t.power_export) : null;
    if ((!h || p === null) && (!d || u === null)) return i;
    n = (p ?? 0) - (u ?? 0);
  }
  if (n === null) return i;
  if (Math.abs(n) <= o) return { power: n, magnitude: null, direction: "idle" };
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
var hi = Object.defineProperty, di = Object.getOwnPropertyDescriptor, j = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? di(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && hi(t, e, i), i;
};
const pi = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, ui = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, gi = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function fi(s, t) {
  const e = Date.now(), o = e - 864e5, i = Array(24).fill(null);
  if (!s.length) return i;
  for (let n = 0; n < 24; n++) {
    const a = o + n * 36e5, c = a + 36e5;
    let h = 0, d = 0;
    for (let p = 0; p < s.length; p++) {
      const u = new Date(s[p].last_changed).getTime(), v = p + 1 < s.length ? new Date(s[p + 1].last_changed).getTime() : e, m = Math.max(u, a), g = Math.min(v, c);
      if (g <= m) continue;
      const y = parseFloat(s[p].state);
      if (isNaN(y)) continue;
      const x = Ss(y, t), b = g - m;
      h += Math.abs(x) * b, d += b;
    }
    d > 0 && (i[n] = h / d);
  }
  return i;
}
function Ts(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const o = parseFloat(e.state);
  return isNaN(o) ? null : o;
}
function fs(s, t) {
  var i;
  const e = Ts(s, t);
  return e === null ? null : ((i = s[t]) == null ? void 0 : i.attributes.unit_of_measurement) === "Wh" ? e / 1e3 : e;
}
function ys(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function yi(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function _s(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function _i(s) {
  return s < 0 ? "#43a047" : s < 8 ? "#66bb6a" : s < 20 ? "#ffa726" : "#ef5350";
}
function vi(s) {
  return s < 20 ? "#ef5350" : s < 50 ? "#ffa726" : "#66bb6a";
}
let T = class extends S {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(s) {
    super.updated(s), (s.has("open") || s.has("nodeType")) && this.open && this.nodeType && this._loadHistory();
  }
  async _loadHistory() {
    var o, i, n, a;
    const s = (i = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : i[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!t || !this.hass) return;
    const e = (a = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : a.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const c = /* @__PURE__ */ new Date(), d = `history/period/${new Date(c.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${c.toISOString()}`, p = await this.hass.callApi("GET", d);
      this._hourly = fi((p == null ? void 0 : p[0]) ?? [], e);
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
    var i, n, a, c, h;
    const t = ((n = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.unit) ?? "auto", o = ((h = gi[this.nodeType]) == null ? void 0 : h[s.direction]) ?? "";
    return _`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Cs(s.power, e, t)}</div>
        ${o ? _`<div class="power-sub">${o}</div>` : f}
      </div>
    `;
  }
  _sectionSoc(s) {
    if (s === null) return f;
    const t = vi(s);
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
    var a, c, h;
    const t = ((a = this.hass) == null ? void 0 : a.states) ?? {}, e = ((h = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : h.decimal_places) ?? 1, o = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", i = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([o, ys(fs(t, s.daily_usage), e)]), s.daily_export && n.push([i, ys(fs(t, s.daily_export), e)]), n.length ? _`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, p]) => _`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${p}</span>
          </div>
        `)}
      </div>
    ` : f;
  }
  _sectionOctopus(s) {
    var g;
    const t = ((g = this.hass) == null ? void 0 : g.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, o = s.cost_entity ? t[s.cost_entity] : null, i = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, a = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", c = o == null ? void 0 : o.state, h = (o == null ? void 0 : o.attributes.unit_of_measurement) ?? "£", d = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], p = Date.now(), u = d.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > p).slice(0, 6), v = n && n !== "unavailable" && n !== "unknown", m = c && c !== "unavailable" && c !== "unknown";
    return !v && !m && !u.length ? f : _`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${v ? _`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${a}</span>
          </div>
        ` : f}

        ${m ? _`
          <div class="kv">
            <span class="kv-k">Cost today</span>
            <span class="kv-v">${h}${parseFloat(c).toFixed(2)}</span>
          </div>
        ` : f}

        ${u.length ? _`
          <div class="s-subtitle">Upcoming slots</div>
          ${u.map((y) => {
      const x = y.start ?? y.start_time ?? "", b = y.end ?? y.end_time ?? "", k = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, P = _i(k);
      return _`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${_s(x)}–${_s(b)}</span>
                <span class="slot-rate" style="color:${P};">${(+k).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : f}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, o = /* @__PURE__ */ new Date(), i = (n) => yi(new Date(o.getTime() - n * 36e5));
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
    var h, d, p;
    if (!this.open || !this.nodeType) return f;
    const s = ((d = (h = this.config) == null ? void 0 : h.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, e = s.colour || (ui[this.nodeType] ?? "#9e9e9e"), o = s.icon || pi[this.nodeType] || "mdi:lightning-bolt", i = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = As(this.nodeType, s, t), a = !!s.soc && (["battery", "ev"].includes(this.nodeType) || !_t.includes(this.nodeType)), c = a ? Ts(t, s.soc) : null;
    return _`
      <div
        class="overlay"
        @click=${(u) => u.target === u.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, o, i)}
          ${this._sectionPower(n)}
          ${a ? this._sectionSoc(c) : f}
          ${this._sectionDaily(s)}
          ${this.nodeType === "grid" && s.octopus ? this._sectionOctopus(s.octopus) : f}
          ${this._sectionChart(e)}
        </div>
      </div>
    `;
  }
};
T.styles = F`
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
  $({ attribute: !1 })
], T.prototype, "hass", 2);
j([
  $({ attribute: !1 })
], T.prototype, "config", 2);
j([
  $()
], T.prototype, "nodeType", 2);
j([
  $({ type: Boolean })
], T.prototype, "open", 2);
j([
  mt()
], T.prototype, "_hourly", 2);
j([
  mt()
], T.prototype, "_loading", 2);
T = j([
  G("hec-node-detail")
], T);
var mi = Object.defineProperty, bi = Object.getOwnPropertyDescriptor, lt = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? bi(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && mi(t, e, i), i;
};
function $i(s, t) {
  return !t || !s ? "0.7s" : `${(2 - Math.min(s / 5e3, 1) * 1.7).toFixed(2)}s`;
}
const wi = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let M = class extends S {
  constructor() {
    super(...arguments), this._dialogType = null, this._lineLayout = {
      width: 0,
      height: 0,
      centers: {}
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => this._measureLineLayout());
  }
  disconnectedCallback() {
    var s;
    (s = this._resizeObserver) == null || s.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  firstUpdated() {
    const s = this.renderRoot.querySelector(".grid");
    s && this._resizeObserver && this._resizeObserver.observe(s), this._measureLineLayout();
  }
  updated() {
    this._measureLineLayout();
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  _configured(s) {
    var t;
    return s in (((t = this.config) == null ? void 0 : t.entity_types) ?? {});
  }
  _flowInfo(s) {
    var e, o, i;
    const t = ((o = (e = this.config) == null ? void 0 : e.entity_types) == null ? void 0 : o[s]) ?? {};
    return As(s, t, ((i = this.hass) == null ? void 0 : i.states) ?? {});
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
    var i, n, a, c;
    const t = (a = (n = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : n[s]) == null ? void 0 : a.soc;
    if (!t || !this.hass) return null;
    const e = (c = this.hass.states[t]) == null ? void 0 : c.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const o = parseFloat(e);
    return isNaN(o) ? null : o;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _measureLineLayout() {
    const s = this.renderRoot.querySelector(".grid");
    if (!s) return;
    const t = s.getBoundingClientRect();
    if (!t.width || !t.height) return;
    const e = {}, o = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const a of o) {
      if (a.classList.contains("hidden")) continue;
      const c = a.dataset.nodeType;
      if (!c) continue;
      const h = a.getBoundingClientRect();
      e[c] = {
        x: h.left - t.left + h.width / 2,
        y: h.top - t.top + h.height / 2
      };
    }
    const i = {
      width: t.width,
      height: t.height,
      centers: e
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
    ].filter((s) => this._isVisible(s));
  }
  _svgLines() {
    var o, i, n, a;
    const s = ((i = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : i.dynamic_animation_speed) ?? !1, t = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.animation) !== !1, e = this._lineLayout.centers.home;
    return !e || !this._lineLayout.width || !this._lineLayout.height ? f : st`
      ${this._lineTypes().map((c) => {
      var y, x, b;
      const h = this._flowInfo(c), d = this._lineLayout.centers[c];
      if (!d) return f;
      const p = h.direction === "idle", u = h.direction === "from-home", v = $i(h.magnitude, s && !p), m = wi[c] ?? ((b = (x = (y = this.config) == null ? void 0 : y.entity_types) == null ? void 0 : x[c]) == null ? void 0 : b.colour) ?? "#9e9e9e", g = [
        "flow-line",
        u ? "reverse" : "",
        p ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return st`
            <line
              x1="${d.x}" y1="${d.y}" x2="${e.x}" y2="${e.y}"
              stroke="${m}"
              class="${g}"
              style="--flow-dur:${v}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var c, h, d;
    const o = s === "home" ? !0 : this._isVisible(s), i = ((h = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : h[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return _`
      <hec-energy-node
        data-node-type=${s}
        class="${t}${o ? "" : " hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
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
      (t) => !_t.includes(t)
    );
  }
  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: A1→B3→A3→C3→B4→A4→C4…
   */
  _customSlot(s) {
    if (s === 0) return [1, 1];
    const t = s - 1;
    return [[2, 1, 3][t % 3], 3 + Math.floor(t / 3)];
  }
  /** Render a custom node with inline grid placement. */
  _customNode(s, t, e) {
    var c, h, d;
    const o = this._isVisible(s), i = ((h = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : h[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, a = this._flowInfo(s);
    return _`
      <hec-energy-node
        data-node-type=${s}
        style="grid-column:${t}; grid-row:${e}"
        class="${o ? "" : "hidden"}"
        .type=${s}
        .label=${i.label ?? s}
        .showLabel=${i.show_label ?? !0}
        .icon=${i.icon ?? ""}
        .colour=${i.colour ?? ""}
        .power=${a.power}
        .soc=${i.soc ? this._soc(s) : null}
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
    if (!this.config) return f;
    const s = this._customTypes();
    return 2 + Math.ceil(s.length / 3), _`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
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
        ${s.map((t, e) => {
      const [o, i] = this._customSlot(e);
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
M.styles = F`
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
lt([
  $({ attribute: !1 })
], M.prototype, "hass", 2);
lt([
  $({ attribute: !1 })
], M.prototype, "config", 2);
lt([
  mt()
], M.prototype, "_dialogType", 2);
lt([
  mt()
], M.prototype, "_lineLayout", 2);
M = lt([
  G("hec-flow-layout")
], M);
var xi = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, Ht = (s, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Ei(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (i = (o ? a(t, e, i) : a(i)) || i);
  return o && i && xi(t, e, i), i;
};
let rt = class extends S {
  setConfig(s) {
    this.config = gt(s);
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
    ` : f;
  }
};
rt.styles = F`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ht([
  $({ attribute: !1 })
], rt.prototype, "hass", 2);
Ht([
  $({ attribute: !1 })
], rt.prototype, "config", 2);
rt = Ht([
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
