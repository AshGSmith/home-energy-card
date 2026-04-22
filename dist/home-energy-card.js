/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis, At = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), Fe = /* @__PURE__ */ new WeakMap();
let ls = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (At && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Fe.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Fe.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vs = (s) => new ls(typeof s == "string" ? s : s + "", void 0, Tt), F = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new ls(e, s, Tt);
}, bs = (s, t) => {
  if (At) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = ut.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, Ge = At ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return vs(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ws, defineProperty: $s, getOwnPropertyDescriptor: xs, getOwnPropertyNames: Es, getOwnPropertySymbols: Cs, getPrototypeOf: Ss } = Object, z = globalThis, Ke = z.trustedTypes, As = Ke ? Ke.emptyScript : "", wt = z.reactiveElementPolyfillSupport, tt = (s, t) => s, gt = { toAttribute(s, t) {
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
} }, kt = (s, t) => !ws(s, t), qe = { attribute: !0, type: String, converter: gt, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), z.litPropertyMetadata ?? (z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = qe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && $s(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = xs(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? qe;
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
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : gt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : gt;
      this._$Em = o;
      const d = l.fromAttribute(e, c.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? kt)(n, e) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
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
        const { wrapped: c } = r, l = this[n];
        c !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[tt("elementProperties")] = /* @__PURE__ */ new Map(), R[tt("finalized")] = /* @__PURE__ */ new Map(), wt == null || wt({ ReactiveElement: R }), (z.reactiveElementVersions ?? (z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, Ye = (s) => s, yt = et.trustedTypes, Ze = yt ? yt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, hs = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ds = "?" + O, Ts = `<${ds}>`, D = document, it = () => D.createComment(""), ot = (s) => s === null || typeof s != "object" && typeof s != "function", Pt = Array.isArray, ks = (s) => Pt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", $t = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Je = /-->/g, Xe = />/g, L = RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qe = /'/g, ts = /"/g, ps = /^(?:script|style|textarea|title)$/i, us = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), _ = us(1), st = us(2), B = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), es = /* @__PURE__ */ new WeakMap(), H = D.createTreeWalker(D, 129);
function fs(s, t) {
  if (!Pt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ze !== void 0 ? Ze.createHTML(t) : t;
}
const Ps = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Q;
  for (let c = 0; c < e; c++) {
    const l = s[c];
    let d, p, u = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, p = r.exec(l), p !== null); ) m = r.lastIndex, r === Q ? p[1] === "!--" ? r = Je : p[1] !== void 0 ? r = Xe : p[2] !== void 0 ? (ps.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = L) : p[3] !== void 0 && (r = L) : r === L ? p[0] === ">" ? (r = o ?? Q, u = -1) : p[1] === void 0 ? u = -2 : (u = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? L : p[3] === '"' ? ts : Qe) : r === ts || r === Qe ? r = L : r === Je || r === Xe ? r = Q : (r = L, o = void 0);
    const v = r === L && s[c + 1].startsWith("/>") ? " " : "";
    n += r === Q ? l + Ts : u >= 0 ? (i.push(d), l.slice(0, u) + hs + l.slice(u) + O + v) : l + O + (u === -2 ? c : v);
  }
  return [fs(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class nt {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, l = this.parts, [d, p] = Ps(t, e);
    if (this.el = nt.createElement(d, i), H.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = H.nextNode()) !== null && l.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(hs)) {
          const m = p[r++], v = o.getAttribute(u).split(O), f = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: f[2], strings: v, ctor: f[1] === "." ? zs : f[1] === "?" ? Ls : f[1] === "@" ? Ns : mt }), o.removeAttribute(u);
        } else u.startsWith(O) && (l.push({ type: 6, index: n }), o.removeAttribute(u));
        if (ps.test(o.tagName)) {
          const u = o.textContent.split(O), m = u.length - 1;
          if (m > 0) {
            o.textContent = yt ? yt.emptyScript : "";
            for (let v = 0; v < m; v++) o.append(u[v], it()), H.nextNode(), l.push({ type: 2, index: ++n });
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
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function V(s, t, e = s, i) {
  var r, c;
  if (t === B) return t;
  let o = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const n = ot(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = V(s, o._$AS(s, t.values), o, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    H.currentNode = o;
    let n = H.nextNode(), r = 0, c = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new ct(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Hs(n, this, t)), this._$AV.push(d), l = i[++c];
      }
      r !== (l == null ? void 0 : l.index) && (n = H.nextNode(), r++);
    }
    return H.currentNode = D, o;
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
    t = V(this, t, e), ot(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ks(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = nt.createElement(fs(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const r = new Os(o, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = es.get(t.strings);
    return e === void 0 && es.set(t.strings, e = new nt(t)), e;
  }
  k(t) {
    Pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new ct(this.O(it()), this.O(it()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = Ye(t).nextSibling;
      Ye(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class mt {
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
    let r = !1;
    if (n === void 0) t = V(this, t, e, 0), r = !ot(t) || t !== this._$AH && t !== B, r && (this._$AH = t);
    else {
      const c = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = V(this, c[i + l], e, l), d === B && (d = this._$AH[l]), r || (r = !ot(d) || d !== this._$AH[l]), d === g ? t = g : t !== g && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zs extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Ls extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Ns extends mt {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = V(this, t, e, 0) ?? g) === B) return;
    const i = this._$AH, o = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== g && (i === g || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Hs {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
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
const Us = (s, t, e) => {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Us(e, this.renderRoot, this.renderOptions);
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
var cs;
S._$litElement$ = !0, S.finalized = !0, (cs = U.litElementHydrateSupport) == null || cs.call(U, { LitElement: S });
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
const Ds = { attribute: !0, type: String, converter: gt, reflect: !1, hasChanged: kt }, Ms = (s = Ds, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, l, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, s, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(c) {
      const l = this[r];
      t.call(this, c), this.requestUpdate(r, l, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function w(s) {
  return (t, e) => typeof e == "object" ? Ms(s, t, e) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function vt(s) {
  return w({ ...s, state: !0, attribute: !1 });
}
const Ot = (s) => s.attributes.device_class ?? "", zt = (s) => s.attributes.unit_of_measurement ?? "", Lt = (s, t) => s.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function N(...s) {
  return (t, e) => {
    let i = 0;
    Ot(e) === "power" && (i += 4), ["W", "kW"].includes(zt(e)) && (i += 2);
    const o = Lt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function I(...s) {
  return (t, e) => {
    let i = 0;
    Ot(e) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(zt(e)) && (i += 2);
    const o = Lt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function ss(...s) {
  return (t, e) => {
    let i = 0;
    Ot(e) === "battery" && (i += 4), zt(e) === "%" && (i += 2);
    const o = Lt(t, e);
    for (const n of s) o.includes(n) && (i += 1);
    return i;
  };
}
function ht(s, t = []) {
  return (e, i) => {
    const o = e.toLowerCase();
    if (t.some((r) => o.includes(r))) return 0;
    let n = 0;
    for (const r of s) o.includes(r) && (n += 4);
    return n;
  };
}
function E(s, t, e, i) {
  let o, n = 0;
  for (const r of s) {
    if (i.has(r)) continue;
    const c = t[r];
    if (!c) continue;
    const l = e(r, c);
    l > n && (n = l, o = r);
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
  ), r = ["Octopus Energy"], c = {}, l = {}, d = E(
    n,
    s,
    ht(["_current_rate"], ["export", "accumulative"]),
    e
  );
  d && (c.rate_entity = d, r.push("rate"));
  const p = E(
    n,
    s,
    ht(["_current_accumulative_cost"]),
    e
  );
  p && (c.cost_entity = p, r.push("cost"));
  const u = E(
    n,
    s,
    ht(["_current_day_rates"]),
    e
  );
  u && (c.slots_entity = u, r.push("slots"));
  const m = E(
    o.filter((b) => b.startsWith("binary_sensor.")),
    s,
    ht(["_intelligent_dispatching"]),
    e
  );
  m && (c.dispatches_entity = m, r.push("dispatching")), Object.keys(c).length && (l.octopus = c);
  const v = E(
    n,
    s,
    N("import", "demand", "current"),
    e
  );
  v && (l.power_import = v, r.push("import power"));
  const f = E(
    n,
    s,
    N("export", "demand", "current"),
    e
  );
  f && (l.power_export = f, r.push("export power"));
  const y = E(
    n,
    s,
    I("import", "accumulative", "consumption"),
    e
  );
  y && (l.daily_usage = y, r.push("daily import"));
  const $ = E(
    n,
    s,
    I("export", "accumulative"),
    e
  );
  return $ && (l.daily_export = $, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: r };
}
function Rs(s, t, e) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), o = Object.keys(s).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(s).filter((f) => f.includes("powerwall") || f.includes("tesla")), r = n.filter((f) => f.includes("powerwall")), c = n.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (r.length > 0) {
    const f = {}, y = E(
      r,
      s,
      ss("battery", "soc", "charge", "percent"),
      e
    );
    y && (f.soc = y);
    const $ = E(
      r,
      s,
      N("battery", "power", "charge", "discharge"),
      e
    );
    $ && (f.power_combined = $);
    const b = E(
      r,
      s,
      I("battery", "today", "daily", "charged"),
      e
    );
    b && (f.daily_usage = b), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const p = E(
    n,
    s,
    N("solar"),
    e
  );
  if (p) {
    const f = { power_combined: p }, y = E(
      n,
      s,
      I("solar"),
      e
    );
    y && (f.daily_usage = y), d.solar = f, l.push("solar");
  }
  const u = E(
    n,
    s,
    N("load", "home", "house"),
    e
  );
  if (u) {
    const f = { power_combined: u }, y = E(
      n,
      s,
      I("load", "home", "house"),
      e
    );
    y && (f.daily_usage = y), d.home = f, l.push("home load");
  }
  const m = E(
    n,
    s,
    N("grid"),
    e
  );
  m && (d.grid = { power_combined: m }, l.push("grid"));
  const v = E(
    c,
    s,
    ss("battery", "battery_level", "soc", "charge"),
    e
  );
  if (v) {
    const f = { soc: v }, y = E(
      c,
      s,
      N("charg", "power"),
      e
    );
    y && (f.power_combined = y);
    const $ = E(
      c,
      s,
      I("charg", "energy"),
      e
    );
    $ && (f.daily_usage = $), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function Is(s) {
  var l, d;
  const t = s, e = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = Rs(e, i, o), r = js(e, i, o), c = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (n && (c.integration_type = "tesla", Object.assign(c.entity_types, n.entity_types), c.summary.push(...n.summary ?? [])), r) {
    if (c.integration_type !== "tesla" && (c.integration_type = "octopus"), (l = r.entity_types) != null && l.grid) {
      const p = r.entity_types.grid;
      c.entity_types.grid = {
        ...c.entity_types.grid,
        ...p,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: p.power_import || (d = c.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    r.tariff_entity && (c.tariff_entity = r.tariff_entity), c.summary.push(...r.summary ?? []);
  }
  return c;
}
function Bs(s, t, e = !1) {
  const i = { ...s };
  t.tariff_entity && (e || !s.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = s.entity_types ?? {}, n = { ...o };
  for (const [r, c] of Object.entries(t.entity_types)) {
    const l = o[r] ?? {}, d = { ...l };
    for (const [p, u] of Object.entries(c))
      u !== void 0 && (e || !l[p]) && (d[p] = u);
    n[r] = d;
  }
  return i.entity_types = n, i;
}
const _t = ["grid", "solar", "battery", "home", "ev"], Vs = "custom_";
function is(s) {
  const t = s.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function Ws(s) {
  return `${Vs}${s + 1}`;
}
function ft(s) {
  const t = s.entity_types ?? {}, e = Object.fromEntries(
    Object.entries(t).filter(
      ([r]) => _t.includes(r)
    )
  ), i = Object.entries(t).filter(([r]) => !_t.includes(r)).sort(([r], [c]) => is(r) - is(c)).map(([, r]) => ({ ...r })), o = Array.isArray(s.custom_types) ? s.custom_types.map((r) => ({ ...r })) : i, n = {
    ...e
  };
  return o.forEach((r, c) => {
    n[Ws(c)] = { ...r };
  }), {
    ...s,
    entity_types: n,
    custom_types: o
  };
}
var Fs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, Nt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Gs(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Fs(t, e, o), o;
};
let rt = class extends S {
  setConfig(s) {
    this.config = ft(s);
  }
  _dispatchConfig(s) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: ft(s) },
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
    var s, t, e, i, o, n, r, c, l, d, p, u, m, v, f, y, $, b, k, P, K, q, Y, Z, J, X, Ut, Dt, Mt, jt, Rt, It, Bt, Vt, Wt, Ft, Gt, Kt, qt, Yt, Zt, Jt, Xt, Qt, te, ee, se, ie, oe, ne, re, ae, ce, le, he, de, pe, ue, fe, ge, ye, _e, me, ve, be, we, $e, xe, Ee, Ce, Se, Ae, Te, ke, Pe, Oe, ze, Le, Ne, He, Ue, De, Me, je, Re, Ie, Be, Ve;
    return this.config ? _`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: ft(
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((c = (r = this.config.entity_types) == null ? void 0 : r.grid) == null ? void 0 : c.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((b = ($ = this.config.entity_types) == null ? void 0 : $.grid) == null ? void 0 : b.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.grid) ?? {},
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
            .value=${((q = (K = this.config.entity_types) == null ? void 0 : K.solar) == null ? void 0 : q.power_combined) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((Z = (Y = this.config.entity_types) == null ? void 0 : Y.solar) == null ? void 0 : Z.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
            .value=${((Dt = (Ut = this.config.entity_types) == null ? void 0 : Ut.solar) == null ? void 0 : Dt.zero_tolerance) != null ? String((jt = (Mt = this.config.entity_types) == null ? void 0 : Mt.solar) == null ? void 0 : jt.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.solar) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((Yt = (qt = this.config.entity_types) == null ? void 0 : qt.battery) == null ? void 0 : Yt.power_combined) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((Jt = (Zt = this.config.entity_types) == null ? void 0 : Zt.battery) == null ? void 0 : Jt.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
            .value=${((ae = (re = this.config.entity_types) == null ? void 0 : re.battery) == null ? void 0 : ae.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.battery) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
              .checked=${((we = (be = this.config.entity_types) == null ? void 0 : be.home) == null ? void 0 : we.show_label) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
            .value=${((xe = ($e = this.config.entity_types) == null ? void 0 : $e.home) == null ? void 0 : xe.label) ?? ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.home) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
              .checked=${((Le = (ze = this.config.entity_types) == null ? void 0 : ze.ev) == null ? void 0 : Le.show_zero) ?? !0}
              @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
            .value=${((He = (Ne = this.config.entity_types) == null ? void 0 : Ne.ev) == null ? void 0 : He.zero_tolerance) != null ? String((De = (Ue = this.config.entity_types) == null ? void 0 : Ue.ev) == null ? void 0 : De.zero_tolerance) : ""}
            @change=${(h) => {
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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
      var a;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((a = this.config.entity_types) == null ? void 0 : a.ev) ?? {},
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

      ${(this.config.custom_types ?? []).map((h, a) => {
      var We;
      return _`
        <ha-expansion-panel header=${((We = h.label) == null ? void 0 : We.trim()) || `Custom ${a + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(a)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_import ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { power_import: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { power_export: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { power_combined: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { daily_usage: x.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(x) => this._setCustomType(a, { soc: x.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(x) => this._setCustomType(a, {
        show_zero: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(x) => this._setCustomType(a, {
        zero_tolerance: x.target.value !== "" ? Number(x.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(x) => this._setCustomType(a, {
        show_label: x.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(x) => this._setCustomType(a, {
        label: x.target.value || void 0
      })}
            ></ha-textfield>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(x) => this._setCustomType(a, {
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
rt.styles = F`
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
  w({ attribute: !1 })
], rt.prototype, "hass", 2);
Nt([
  w({ attribute: !1 })
], rt.prototype, "config", 2);
rt = Nt([
  G("home-energy-card-editor")
], rt);
var Ks = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, bt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? qs(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Ks(t, e, o), o;
};
function dt(s, t) {
  if (!t) return null;
  const e = s[t];
  if (!e || e.state === "unavailable" || e.state === "unknown") return null;
  const i = parseFloat(e.state);
  return isNaN(i) ? null : e.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function pt(s, t) {
  return s === null ? "—" : s.toFixed(t);
}
function Ys(s) {
  const t = s.toLowerCase().replace(/[\s_-]/g, ""), e = s.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: e, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: e, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: e, bg: "#fff8e1", fg: "#e65100" } : {
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
    var y, $, b, k, P, K, q, Y, Z, J, X;
    if (!this.config) return g;
    const s = ((y = this.hass) == null ? void 0 : y.states) ?? {}, t = this.config.entity_types ?? {}, e = (($ = this.config.display) == null ? void 0 : $.decimal_places) ?? 1, i = this.config.tariff_entity ? (b = s[this.config.tariff_entity]) == null ? void 0 : b.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Ys(i) : null, n = dt(s, (k = t.solar) == null ? void 0 : k.daily_usage), r = dt(s, (P = t.home) == null ? void 0 : P.daily_usage), c = dt(s, (K = t.grid) == null ? void 0 : K.daily_usage), l = dt(s, (q = t.grid) == null ? void 0 : q.daily_export), d = !!((Y = t.solar) != null && Y.daily_usage), p = !!((Z = t.home) != null && Z.daily_usage), u = !!((J = t.grid) != null && J.daily_usage), m = !!((X = t.grid) != null && X.daily_export), v = u || m, f = d || p || v;
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
                <span class="stat-val">${pt(n, e)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : g}

            ${p ? _`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${pt(r, e)}</span>
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
                      <span class="stat-val">${pt(c, e)}</span>
                    </div>
                  ` : g}
                  ${m ? _`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${pt(l, e)}</span>
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
  w({ attribute: !1 })
], W.prototype, "hass", 2);
bt([
  w({ attribute: !1 })
], W.prototype, "config", 2);
bt([
  w({ type: Boolean })
], W.prototype, "showTitle", 2);
W = bt([
  G("hec-card-header")
], W);
var Zs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, T = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Js(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Zs(t, e, o), o;
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
}, St = 38, os = +(2 * Math.PI * St).toFixed(4);
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
          <circle class="ring-track"    cx="42" cy="42" r="${St}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${St}"
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
  w()
], C.prototype, "type", 2);
T([
  w()
], C.prototype, "label", 2);
T([
  w({ type: Boolean })
], C.prototype, "showLabel", 2);
T([
  w()
], C.prototype, "colour", 2);
T([
  w({ type: Number })
], C.prototype, "power", 2);
T([
  w({ type: Number })
], C.prototype, "soc", 2);
T([
  w()
], C.prototype, "unit", 2);
T([
  w({ type: Number })
], C.prototype, "decimalPlaces", 2);
C = T([
  G("hec-energy-node")
], C);
function ys(s, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? s * 1e3 : s;
}
function Ct(s, t) {
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
    n = Ct(e, t.power_combined);
  else {
    const l = !!t.power_import, d = !!t.power_export;
    if (!l && !d) return o;
    const p = l ? Ct(e, t.power_import) : null, u = d ? Ct(e, t.power_export) : null;
    if ((!l || p === null) && (!d || u === null)) return o;
    n = (p ?? 0) - (u ?? 0);
  }
  if (n === null) return o;
  if (Math.abs(n) <= i) return { power: n, magnitude: null, direction: "idle" };
  const r = Math.abs(n);
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
  return { power: n, magnitude: r, direction: c };
}
var ti = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, j = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ei(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
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
    const r = i + n * 36e5, c = r + 36e5;
    let l = 0, d = 0;
    for (let p = 0; p < s.length; p++) {
      const u = new Date(s[p].last_changed).getTime(), m = p + 1 < s.length ? new Date(s[p + 1].last_changed).getTime() : e, v = Math.max(u, r), f = Math.min(m, c);
      if (f <= v) continue;
      const y = parseFloat(s[p].state);
      if (isNaN(y)) continue;
      const $ = ys(y, t), b = f - v;
      l += Math.abs($) * b, d += b;
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
function rs(s, t) {
  return s === null ? "—" : `${s.toFixed(t)} kWh`;
}
function ri(s) {
  return `${s.getHours().toString().padStart(2, "0")}:00`;
}
function as(s) {
  const t = new Date(s);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function ai(s) {
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
    var i, o, n, r;
    const s = (o = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : o[this.nodeType], t = (s == null ? void 0 : s.power_combined) ?? (s == null ? void 0 : s.power_import) ?? (s == null ? void 0 : s.power_export);
    if (!t || !this.hass) return;
    const e = (r = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : r.attributes.unit_of_measurement;
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
    var o, n, r, c, l;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, e = ((c = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : c.unit) ?? "auto", i = ((l = oi[this.nodeType]) == null ? void 0 : l[s.direction]) ?? "";
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
    var r, c, l;
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, e = ((l = (c = this.config) == null ? void 0 : c.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return s.daily_usage && n.push([i, rs(ns(t, s.daily_usage), e)]), s.daily_export && n.push([o, rs(ns(t, s.daily_export), e)]), n.length ? _`
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
    const t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, e = s.rate_entity ? t[s.rate_entity] : null, i = s.cost_entity ? t[s.cost_entity] : null, o = s.slots_entity ? t[s.slots_entity] : null, n = e == null ? void 0 : e.state, r = (e == null ? void 0 : e.attributes.unit_of_measurement) ?? "p/kWh", c = i == null ? void 0 : i.state, l = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "£", d = (o == null ? void 0 : o.attributes.rates) ?? (o == null ? void 0 : o.attributes.upcoming_interval_rates) ?? (o == null ? void 0 : o.attributes.today_rates) ?? [], p = Date.now(), u = d.filter((y) => new Date(y.end ?? y.end_time ?? 0).getTime() > p).slice(0, 6), m = n && n !== "unavailable" && n !== "unknown", v = c && c !== "unavailable" && c !== "unknown";
    return !m && !v && !u.length ? g : _`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${m ? _`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(n).toFixed(2)} ${r}</span>
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
      const $ = y.start ?? y.start_time ?? "", b = y.end ?? y.end_time ?? "", k = y.value_inc_vat ?? y.rate_inc_vat ?? y.value ?? 0, P = ai(k);
      return _`
              <div class="slot">
                <span class="slot-dot" style="background:${P};"></span>
                <span class="slot-time">${as($)}–${as(b)}</span>
                <span class="slot-rate" style="color:${P};">${(+k).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : g}
      </div>
    `;
  }
  _sectionChart(s) {
    const t = this._hourly.filter((n) => n !== null), e = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => ri(new Date(i.getTime() - n * 36e5));
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
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return st``;
      const c = Math.max(2, n / e * 48);
      return st`
                      <rect
                        x="${r * 10 + 0.5}" y="${52 - c}"
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
    const s = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, e = s.colour || (ii[this.nodeType] ?? "#9e9e9e"), i = si[this.nodeType] ?? "mdi:lightning-bolt", o = s.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = _s(this.nodeType, s, t), r = !!s.soc && (["battery", "ev"].includes(this.nodeType) || !_t.includes(this.nodeType)), c = r ? ms(t, s.soc) : null;
    return _`
      <div
        class="overlay"
        @click=${(u) => u.target === u.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(e, i, o)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(c) : g}
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
j([
  w({ attribute: !1 })
], A.prototype, "hass", 2);
j([
  w({ attribute: !1 })
], A.prototype, "config", 2);
j([
  w()
], A.prototype, "nodeType", 2);
j([
  w({ type: Boolean })
], A.prototype, "open", 2);
j([
  vt()
], A.prototype, "_hourly", 2);
j([
  vt()
], A.prototype, "_loading", 2);
A = j([
  G("hec-node-detail")
], A);
var li = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, lt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? hi(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
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
    var o, n, r, c;
    const t = (r = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[s]) == null ? void 0 : r.soc;
    if (!t || !this.hass) return null;
    const e = (c = this.hass.states[t]) == null ? void 0 : c.state;
    if (!e || e === "unavailable" || e === "unknown") return null;
    const i = parseFloat(e);
    return isNaN(i) ? null : i;
  }
  // ── SVG lines ─────────────────────────────────────────────────────────────
  _measureLineLayout() {
    const s = this.renderRoot.querySelector(".grid");
    if (!s) return;
    const t = s.getBoundingClientRect();
    if (!t.width || !t.height) return;
    const e = {}, i = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const r of i) {
      if (r.classList.contains("hidden")) continue;
      const c = r.dataset.nodeType;
      if (!c) continue;
      const l = r.getBoundingClientRect();
      e[c] = {
        x: l.left - t.left + l.width / 2,
        y: l.top - t.top + l.height / 2
      };
    }
    const o = {
      width: t.width,
      height: t.height,
      centers: e
    };
    this._lineLayout.width === o.width && this._lineLayout.height === o.height && JSON.stringify(this._lineLayout.centers) === JSON.stringify(o.centers) || (this._lineLayout = o);
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
    var i, o, n, r;
    const s = ((o = (i = this.config) == null ? void 0 : i.display) == null ? void 0 : o.dynamic_animation_speed) ?? !1, t = ((r = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : r.animation) !== !1, e = this._lineLayout.centers.home;
    return !e || !this._lineLayout.width || !this._lineLayout.height ? g : st`
      ${this._lineTypes().map((c) => {
      var y, $, b;
      const l = this._flowInfo(c), d = this._lineLayout.centers[c];
      if (!d) return g;
      const p = l.direction === "idle", u = l.direction === "from-home", m = di(l.magnitude, s && !p), v = pi[c] ?? ((b = ($ = (y = this.config) == null ? void 0 : y.entity_types) == null ? void 0 : $[c]) == null ? void 0 : b.colour) ?? "#9e9e9e", f = [
        "flow-line",
        u ? "reverse" : "",
        p ? "idle" : "",
        t ? "" : "paused"
      ].filter(Boolean).join(" ");
      return st`
            <line
              x1="${d.x}" y1="${d.y}" x2="${e.x}" y2="${e.y}"
              stroke="${v}"
              class="${f}"
              style="--flow-dur:${m}"
              pathLength="100"
            />
          `;
    })}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(s, t, e = !1) {
    var c, l, d;
    const i = s === "home" ? !0 : this._isVisible(s), o = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, r = this._flowInfo(s);
    return _`
      <hec-energy-node
        data-node-type=${s}
        class="${t}${i ? "" : " hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .showLabel=${o.show_label ?? !0}
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
    var c, l, d;
    const i = this._isVisible(s), o = ((l = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : l[s]) ?? {}, n = ((d = this.config) == null ? void 0 : d.display) ?? {}, r = this._flowInfo(s);
    return _`
      <hec-energy-node
        data-node-type=${s}
        style="grid-column:${t}; grid-row:${e}"
        class="${i ? "" : "hidden"}"
        .type=${s}
        .label=${o.label ?? s}
        .showLabel=${o.show_label ?? !0}
        .colour=${o.colour ?? ""}
        .power=${r.power}
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
        ${this._configured("solar") ? this._node("solar", "slot-solar") : g}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : g}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${s.map((t, e) => {
      const [i, o] = this._customSlot(e);
      return this._customNode(t, i, o);
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
  w({ attribute: !1 })
], M.prototype, "hass", 2);
lt([
  w({ attribute: !1 })
], M.prototype, "config", 2);
lt([
  vt()
], M.prototype, "_dialogType", 2);
lt([
  vt()
], M.prototype, "_lineLayout", 2);
M = lt([
  G("hec-flow-layout")
], M);
var ui = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, Ht = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? fi(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && ui(t, e, o), o;
};
let at = class extends S {
  setConfig(s) {
    this.config = ft(s);
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
at.styles = F`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
Ht([
  w({ attribute: !1 })
], at.prototype, "hass", 2);
Ht([
  w({ attribute: !1 })
], at.prototype, "config", 2);
at = Ht([
  G("home-energy-card")
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
