/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = globalThis, ne = Vt.ShadowRoot && (Vt.ShadyCSS === void 0 || Vt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, re = Symbol(), ys = /* @__PURE__ */ new WeakMap();
let Bs = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (ne && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = ys.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ys.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Xs = (e) => new Bs(typeof e == "string" ? e : e + "", void 0, re), bt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new Bs(s, e, re);
}, Qs = (e, t) => {
  if (ne) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Vt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, ms = ne ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Xs(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ti, defineProperty: ei, getOwnPropertyDescriptor: si, getOwnPropertyNames: ii, getOwnPropertySymbols: oi, getPrototypeOf: ni } = Object, Z = globalThis, _s = Z.trustedTypes, ri = _s ? _s.emptyScript : "", Zt = Z.reactiveElementPolyfillSupport, At = (e, t) => e, Gt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ri : null;
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
} }, ae = (e, t) => !ti(e, t), vs = { attribute: !0, type: String, converter: Gt, reflect: !1, useDefault: !1, hasChanged: ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let yt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = vs) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && ei(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: n } = si(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? vs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(At("elementProperties"))) return;
    const t = ni(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(At("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(At("properties"))) {
      const s = this.properties, i = [...ii(s), ...oi(s)];
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
      for (const o of i) s.unshift(ms(o));
    } else t !== void 0 && s.push(ms(t));
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
    return Qs(t, this.constructor.elementStyles), t;
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
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : Gt).toAttribute(s, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Gt;
      this._$Em = o;
      const d = l.fromAttribute(s, a.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ae)(n, s) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
yt.elementStyles = [], yt.shadowRootOptions = { mode: "open" }, yt[At("elementProperties")] = /* @__PURE__ */ new Map(), yt[At("finalized")] = /* @__PURE__ */ new Map(), Zt == null || Zt({ ReactiveElement: yt }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, bs = (e) => e, Kt = Tt.trustedTypes, ws = Kt ? Kt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, js = "$lit$", Y = `lit$${Math.random().toFixed(9).slice(2)}$`, Gs = "?" + Y, ai = `<${Gs}>`, dt = document, Mt = () => dt.createComment(""), Pt = (e) => e === null || typeof e != "object" && typeof e != "function", ce = Array.isArray, ci = (e) => ce(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Jt = `[ 	
\f\r]`, Ct = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $s = /-->/g, xs = />/g, nt = RegExp(`>|${Jt}(?:([^\\s"'>=/]+)(${Jt}*=${Jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Es = /'/g, Cs = /"/g, Ks = /^(?:script|style|textarea|title)$/i, Ws = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), w = Ws(1), kt = Ws(2), ut = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Ss = /* @__PURE__ */ new WeakMap(), lt = dt.createTreeWalker(dt, 129);
function qs(e, t) {
  if (!ce(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ws !== void 0 ? ws.createHTML(t) : t;
}
const li = (e, t) => {
  const s = e.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Ct;
  for (let a = 0; a < s; a++) {
    const l = e[a];
    let d, p, u = -1, y = 0;
    for (; y < l.length && (r.lastIndex = y, p = r.exec(l), p !== null); ) y = r.lastIndex, r === Ct ? p[1] === "!--" ? r = $s : p[1] !== void 0 ? r = xs : p[2] !== void 0 ? (Ks.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = nt) : p[3] !== void 0 && (r = nt) : r === nt ? p[0] === ">" ? (r = o ?? Ct, u = -1) : p[1] === void 0 ? u = -2 : (u = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? nt : p[3] === '"' ? Cs : Es) : r === Cs || r === Es ? r = nt : r === $s || r === xs ? r = Ct : (r = nt, o = void 0);
    const g = r === nt && e[a + 1].startsWith("/>") ? " " : "";
    n += r === Ct ? l + ai : u >= 0 ? (i.push(d), l.slice(0, u) + js + l.slice(u) + Y + g) : l + Y + (u === -2 ? a : g);
  }
  return [qs(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Lt {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, p] = li(t, s);
    if (this.el = Lt.createElement(d, i), lt.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = lt.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(js)) {
          const y = p[r++], g = o.getAttribute(u).split(Y), f = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? di : f[1] === "?" ? ui : f[1] === "@" ? pi : Yt }), o.removeAttribute(u);
        } else u.startsWith(Y) && (l.push({ type: 6, index: n }), o.removeAttribute(u));
        if (Ks.test(o.tagName)) {
          const u = o.textContent.split(Y), y = u.length - 1;
          if (y > 0) {
            o.textContent = Kt ? Kt.emptyScript : "";
            for (let g = 0; g < y; g++) o.append(u[g], Mt()), lt.nextNode(), l.push({ type: 2, index: ++n });
            o.append(u[y], Mt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Gs) l.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(Y, u + 1)) !== -1; ) l.push({ type: 7, index: n }), u += Y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = dt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function vt(e, t, s = e, i) {
  var r, a;
  if (t === ut) return t;
  let o = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const n = Pt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = vt(e, o._$AS(e, t.values), o, i)), t;
}
class hi {
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? dt).importNode(s, !0);
    lt.currentNode = o;
    let n = lt.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new wt(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new fi(n, this, t)), this._$AV.push(d), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = lt.nextNode(), r++);
    }
    return lt.currentNode = dt, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class wt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = vt(this, t, s), Pt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== ut && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ci(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && Pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(dt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Lt.createElement(qs(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(s);
    else {
      const r = new hi(o, this), a = r.u(this.options);
      r.p(s), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = Ss.get(t.strings);
    return s === void 0 && Ss.set(t.strings, s = new Lt(t)), s;
  }
  k(t) {
    ce(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of t) o === s.length ? s.push(i = new wt(this.O(Mt()), this.O(Mt()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = bs(t).nextSibling;
      bs(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class Yt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, n) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, s = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = vt(this, t, s, 0), r = !Pt(t) || t !== this._$AH && t !== ut, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = vt(this, a[i + l], s, l), d === ut && (d = this._$AH[l]), r || (r = !Pt(d) || d !== this._$AH[l]), d === v ? t = v : t !== v && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class di extends Yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class ui extends Yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class pi extends Yt {
  constructor(t, s, i, o, n) {
    super(t, s, i, o, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = vt(this, t, s, 0) ?? v) === ut) return;
    const i = this._$AH, o = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== v && (i === v || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class fi {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    vt(this, t);
  }
}
const gi = { I: wt }, Xt = Tt.litHtmlPolyfillSupport;
Xt == null || Xt(Lt, wt), (Tt.litHtmlVersions ?? (Tt.litHtmlVersions = [])).push("3.3.2");
const yi = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new wt(t.insertBefore(Mt(), n), n, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis;
let B = class extends yt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = yi(s, this.renderRoot, this.renderOptions);
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
    return ut;
  }
};
var Vs;
B._$litElement$ = !0, B.finalized = !0, (Vs = ht.litElementHydrateSupport) == null || Vs.call(ht, { LitElement: B });
const Qt = ht.litElementPolyfillSupport;
Qt == null || Qt({ LitElement: B });
(ht.litElementVersions ?? (ht.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = { attribute: !0, type: String, converter: Gt, reflect: !1, hasChanged: ae }, _i = (e = mi, t, s) => {
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
function x(e) {
  return (t, s) => typeof s == "object" ? _i(e, t, s) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function zt(e) {
  return x({ ...e, state: !0, attribute: !1 });
}
const le = (e) => e.attributes.device_class ?? "", he = (e) => e.attributes.unit_of_measurement ?? "", de = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function ct(...e) {
  return (t, s) => {
    let i = 0;
    le(s) === "power" && (i += 4), ["W", "kW"].includes(he(s)) && (i += 2);
    const o = de(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function mt(...e) {
  return (t, s) => {
    let i = 0;
    le(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(he(s)) && (i += 2);
    const o = de(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function As(...e) {
  return (t, s) => {
    let i = 0;
    le(s) === "battery" && (i += 4), he(s) === "%" && (i += 2);
    const o = de(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function Rt(e, t = []) {
  return (s, i) => {
    const o = s.toLowerCase();
    if (t.some((r) => o.includes(r))) return 0;
    let n = 0;
    for (const r of e) o.includes(r) && (n += 4);
    return n;
  };
}
function A(e, t, s, i) {
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
function vi(e, t, s) {
  const i = Object.values(t).some(
    (_) => _.platform === "octopus_energy" && !_.disabled_by
  ), o = Object.keys(e).filter((_) => _.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    (_) => _.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], a = {}, l = {}, d = A(
    n,
    e,
    Rt(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (a.rate_entity = d, r.push("rate"));
  const p = A(
    n,
    e,
    Rt(["_current_accumulative_cost"]),
    s
  );
  p && (a.cost_entity = p, r.push("cost"));
  const u = A(
    n,
    e,
    Rt(["_current_day_rates"]),
    s
  );
  u && (a.slots_entity = u, r.push("slots"));
  const y = A(
    o.filter((_) => _.startsWith("binary_sensor.")),
    e,
    Rt(["_intelligent_dispatching"]),
    s
  );
  y && (a.dispatches_entity = y, r.push("dispatching")), Object.keys(a).length && (l.octopus = a);
  const g = A(
    n,
    e,
    ct("import", "demand", "current"),
    s
  );
  g && (l.power_import = g, r.push("import power"));
  const f = A(
    n,
    e,
    ct("export", "demand", "current"),
    s
  );
  f && (l.power_export = f, r.push("export power"));
  const m = A(
    n,
    e,
    mt("import", "accumulative", "consumption"),
    s
  );
  m && (l.daily_usage = m, r.push("daily import"));
  const b = A(
    n,
    e,
    mt("export", "accumulative"),
    s
  );
  return b && (l.daily_export = b, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: r };
}
function bi(e, t, s) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), o = Object.keys(e).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(e).filter((f) => f.includes("powerwall") || f.includes("tesla")), r = n.filter((f) => f.includes("powerwall")), a = n.filter((f) => !f.includes("powerwall")), l = ["Tesla"], d = {};
  if (r.length > 0) {
    const f = {}, m = A(
      r,
      e,
      As("battery", "soc", "charge", "percent"),
      s
    );
    m && (f.soc = m);
    const b = A(
      r,
      e,
      ct("battery", "power", "charge", "discharge"),
      s
    );
    b && (f.power_combined = b);
    const _ = A(
      r,
      e,
      mt("battery", "today", "daily", "charged"),
      s
    );
    _ && (f.daily_usage = _), Object.keys(f).length && (d.battery = f, l.push("Powerwall"));
  }
  const p = A(
    n,
    e,
    ct("solar"),
    s
  );
  if (p) {
    const f = { power_combined: p }, m = A(
      n,
      e,
      mt("solar"),
      s
    );
    m && (f.daily_usage = m), d.solar = f, l.push("solar");
  }
  const u = A(
    n,
    e,
    ct("load", "home", "house"),
    s
  );
  if (u) {
    const f = { power_combined: u }, m = A(
      n,
      e,
      mt("load", "home", "house"),
      s
    );
    m && (f.daily_usage = m), d.home = f, l.push("home load");
  }
  const y = A(
    n,
    e,
    ct("grid"),
    s
  );
  y && (d.grid = { power_combined: y }, l.push("grid"));
  const g = A(
    a,
    e,
    As("battery", "battery_level", "soc", "charge"),
    s
  );
  if (g) {
    const f = { soc: g }, m = A(
      a,
      e,
      ct("charg", "power"),
      s
    );
    m && (f.power_combined = m);
    const b = A(
      a,
      e,
      mt("charg", "energy"),
      s
    );
    b && (f.daily_usage = b), d.ev = f, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function wi(e) {
  var l, d;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = bi(s, i, o), r = vi(s, i, o), a = {
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
        power_combined: p.power_import || (d = a.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    r.tariff_entity && (a.tariff_entity = r.tariff_entity), a.summary.push(...r.summary ?? []);
  }
  return a;
}
function $i(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = e.entity_types ?? {}, n = { ...o };
  for (const [r, a] of Object.entries(t.entity_types)) {
    const l = o[r] ?? {}, d = { ...l };
    for (const [p, u] of Object.entries(a))
      u !== void 0 && (s || !l[p]) && (d[p] = u);
    n[r] = d;
  }
  return i.entity_types = n, i;
}
const Wt = ["grid", "solar", "battery", "home", "ev"], xi = "custom_";
function Ts(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function Ei(e) {
  return `${xi}${e + 1}`;
}
function Bt(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([r]) => Wt.includes(r)
    )
  ), i = Object.entries(t).filter(([r]) => !Wt.includes(r)).sort(([r], [a]) => Ts(r) - Ts(a)).map(([, r]) => ({ ...r })), o = Array.isArray(e.custom_types) ? e.custom_types.map((r) => ({ ...r })) : i, n = {
    ...s
  };
  return o.forEach((r, a) => {
    n[Ei(a)] = { ...r };
  }), {
    ...e,
    entity_types: n,
    custom_types: o
  };
}
var Ci = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, ue = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Si(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ci(t, s, o), o;
};
let Ot = class extends B {
  setConfig(e) {
    this.config = Bt(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: Bt(e) },
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
    var i;
    const s = [...((i = this.config) == null ? void 0 : i.custom_types) ?? []];
    s[e] = {
      ...s[e] ?? {},
      ...t
    }, this._dispatchConfig({
      ...this.config,
      custom_types: s
    });
  }
  render() {
    var e, t, s, i, o, n, r, a, l, d, p, u, y, g, f, m, b, _, S, k, C, T, M, L, O, z, H, I, U, F, xt, X, q, Q, tt, et, st, it, G, K, ot, Et, $, P, R, V, gt, fe, ge, ye, me, _e, ve, be, we, $e, xe, Ee, Ce, Se, Ae, Te, ke, Me, Pe, Le, Oe, Ne, ze, He, Ie, Re, De, Ue, Fe, Ve, Be, je, Ge, Ke, We, qe, Ye, Ze, Je, Xe, Qe, ts, es, ss, is, os, ns, rs, as, cs, ls, hs, ds, us, ps, fs;
    return this.config ? w`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: Bt(
            $i(this.config, wi(this.hass), !1)
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

          <div class="switch-row">
            <span>Show Header Values</span>
            <ha-switch
              .checked=${this.config.show_header_values ?? !0}
              @change=${(h) => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this.config,
            show_header_values: h.target.checked
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
            .value=${((i = (s = this.config.entity_types) == null ? void 0 : s.grid) == null ? void 0 : i.power_export) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((a = (r = this.config.entity_types) == null ? void 0 : r.grid) == null ? void 0 : a.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((u = (p = this.config.entity_types) == null ? void 0 : p.grid) == null ? void 0 : u.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((g = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : g.zero_tolerance) != null ? String((m = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : m.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((_ = (b = this.config.entity_types) == null ? void 0 : b.grid) == null ? void 0 : _.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((k = (S = this.config.entity_types) == null ? void 0 : S.grid) == null ? void 0 : k.label) ?? ""}
            @change=${(h) => {
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
            .value=${((T = (C = this.config.entity_types) == null ? void 0 : C.grid) == null ? void 0 : T.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((L = (M = this.config.entity_types) == null ? void 0 : M.grid) == null ? void 0 : L.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((z = (O = this.config.entity_types) == null ? void 0 : O.solar) == null ? void 0 : z.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((I = (H = this.config.entity_types) == null ? void 0 : H.solar) == null ? void 0 : I.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((F = (U = this.config.entity_types) == null ? void 0 : U.solar) == null ? void 0 : F.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((X = (xt = this.config.entity_types) == null ? void 0 : xt.solar) == null ? void 0 : X.zero_tolerance) != null ? String((Q = (q = this.config.entity_types) == null ? void 0 : q.solar) == null ? void 0 : Q.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((et = (tt = this.config.entity_types) == null ? void 0 : tt.solar) == null ? void 0 : et.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((it = (st = this.config.entity_types) == null ? void 0 : st.solar) == null ? void 0 : it.label) ?? ""}
            @change=${(h) => {
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
            .value=${((K = (G = this.config.entity_types) == null ? void 0 : G.solar) == null ? void 0 : K.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Et = (ot = this.config.entity_types) == null ? void 0 : ot.solar) == null ? void 0 : Et.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((P = ($ = this.config.entity_types) == null ? void 0 : $.battery) == null ? void 0 : P.soc) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((V = (R = this.config.entity_types) == null ? void 0 : R.battery) == null ? void 0 : V.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((fe = (gt = this.config.entity_types) == null ? void 0 : gt.battery) == null ? void 0 : fe.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((ye = (ge = this.config.entity_types) == null ? void 0 : ge.battery) == null ? void 0 : ye.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((_e = (me = this.config.entity_types) == null ? void 0 : me.battery) == null ? void 0 : _e.zero_tolerance) != null ? String((be = (ve = this.config.entity_types) == null ? void 0 : ve.battery) == null ? void 0 : be.zero_tolerance) : ""}
            @change=${(h) => {
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
            <span>Reverse Power Flow</span>
            <ha-switch
              .checked=${(($e = (we = this.config.entity_types) == null ? void 0 : we.battery) == null ? void 0 : $e.reverse_power_flow) ?? !1}
              @change=${(h) => {
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
                  reverse_power_flow: h.target.checked
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
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.battery) == null ? void 0 : Ee.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((Se = (Ce = this.config.entity_types) == null ? void 0 : Ce.battery) == null ? void 0 : Se.label) ?? ""}
            @change=${(h) => {
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
            .value=${((Te = (Ae = this.config.entity_types) == null ? void 0 : Ae.battery) == null ? void 0 : Te.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Me = (ke = this.config.entity_types) == null ? void 0 : ke.battery) == null ? void 0 : Me.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((Le = (Pe = this.config.entity_types) == null ? void 0 : Pe.home) == null ? void 0 : Le.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Ne = (Oe = this.config.entity_types) == null ? void 0 : Oe.home) == null ? void 0 : Ne.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((He = (ze = this.config.entity_types) == null ? void 0 : ze.home) == null ? void 0 : He.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((Re = (Ie = this.config.entity_types) == null ? void 0 : Ie.home) == null ? void 0 : Re.zero_tolerance) != null ? String((Ue = (De = this.config.entity_types) == null ? void 0 : De.home) == null ? void 0 : Ue.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((Ve = (Fe = this.config.entity_types) == null ? void 0 : Fe.home) == null ? void 0 : Ve.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((je = (Be = this.config.entity_types) == null ? void 0 : Be.home) == null ? void 0 : je.label) ?? ""}
            @change=${(h) => {
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
            .value=${((Ke = (Ge = this.config.entity_types) == null ? void 0 : Ge.home) == null ? void 0 : Ke.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((qe = (We = this.config.entity_types) == null ? void 0 : We.home) == null ? void 0 : qe.colour) ?? ""}
            @change=${(h) => {
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
            .value=${((Ze = (Ye = this.config.entity_types) == null ? void 0 : Ye.ev) == null ? void 0 : Ze.power_combined) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((Xe = (Je = this.config.entity_types) == null ? void 0 : Je.ev) == null ? void 0 : Xe.soc) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((ts = (Qe = this.config.entity_types) == null ? void 0 : Qe.ev) == null ? void 0 : ts.daily_usage) ?? ""}
            @value-changed=${(h) => {
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
              .checked=${((ss = (es = this.config.entity_types) == null ? void 0 : es.ev) == null ? void 0 : ss.show_zero) ?? !0}
              @change=${(h) => {
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
            .value=${((os = (is = this.config.entity_types) == null ? void 0 : is.ev) == null ? void 0 : os.zero_tolerance) != null ? String((rs = (ns = this.config.entity_types) == null ? void 0 : ns.ev) == null ? void 0 : rs.zero_tolerance) : ""}
            @change=${(h) => {
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
              .checked=${((cs = (as = this.config.entity_types) == null ? void 0 : as.ev) == null ? void 0 : cs.show_label) ?? !0}
              @change=${(h) => {
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
            .value=${((hs = (ls = this.config.entity_types) == null ? void 0 : ls.ev) == null ? void 0 : hs.label) ?? ""}
            @change=${(h) => {
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
            .value=${((us = (ds = this.config.entity_types) == null ? void 0 : ds.ev) == null ? void 0 : us.icon) ?? ""}
            @value-changed=${(h) => {
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
            .value=${((fs = (ps = this.config.entity_types) == null ? void 0 : ps.ev) == null ? void 0 : fs.colour) ?? ""}
            @change=${(h) => {
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

      ${(this.config.custom_types ?? []).map((h, c) => {
      var gs;
      return w`
        <ha-expansion-panel header=${((gs = h.label) == null ? void 0 : gs.trim()) || `Custom ${c + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(c)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_import ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { power_import: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_export ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { power_export: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.power_combined ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { power_combined: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.daily_usage ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { daily_usage: E.detail.value || void 0 })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(E) => this._setCustomType(c, { soc: E.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(E) => this._setCustomType(c, {
        show_zero: E.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(E) => this._setCustomType(c, {
        zero_tolerance: E.target.value !== "" ? Number(E.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Subtract from Home</span>
              <ha-switch
                .checked=${h.subtract_from_home ?? !1}
                @change=${(E) => this._setCustomType(c, {
        subtract_from_home: E.target.checked
      })}
              ></ha-switch>
            </div>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(E) => this._setCustomType(c, {
        show_label: E.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(E) => this._setCustomType(c, {
        label: E.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(E) => this._setCustomType(c, {
        icon: E.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(E) => this._setCustomType(c, {
        colour: E.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    ` : v;
  }
};
Ot.styles = bt`
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
ue([
  x({ attribute: !1 })
], Ot.prototype, "hass", 2);
ue([
  x({ attribute: !1 })
], Ot.prototype, "config", 2);
Ot = ue([
  $t("home-energy-card-editor")
], Ot);
var Ai = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, Ht = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ti(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ai(t, s, o), o;
};
function Dt(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function Ut(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function ki(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let pt = class extends B {
  constructor() {
    super(...arguments), this.showTitle = !0, this.showValues = !0;
  }
  render() {
    var _, S, k, C, T, M, L, O, z, H, I;
    if (!this.config) return v;
    const e = ((_ = this.hass) == null ? void 0 : _.states) ?? {}, t = this.config.entity_types ?? {}, s = ((S = this.config.display) == null ? void 0 : S.decimal_places) ?? 1, i = this.config.tariff_entity ? (k = e[this.config.tariff_entity]) == null ? void 0 : k.state : null, o = i && i !== "unavailable" && i !== "unknown" ? ki(i) : null, n = Dt(e, (C = t.solar) == null ? void 0 : C.daily_usage), r = Dt(e, (T = t.home) == null ? void 0 : T.daily_usage), a = Dt(e, (M = t.grid) == null ? void 0 : M.daily_usage), l = Dt(e, (L = t.grid) == null ? void 0 : L.daily_export), d = !!((O = t.solar) != null && O.daily_usage), p = !!((z = t.home) != null && z.daily_usage), u = !!((H = t.grid) != null && H.daily_usage), y = !!((I = t.grid) != null && I.daily_export), g = u || y, f = d || p || g, m = this.showValues && f, b = this.showTitle || o;
    return !b && !m ? v : w`
      <div class="header">

        ${b ? w`
          <div class="title-row">
            ${this.showTitle ? w`<span class="title">${this.config.title ?? "Home Energy"}</span>` : v}
            ${o ? w`
                  <span
                    class="tariff"
                    style="background:${o.bg};color:${o.fg};"
                  >${o.label}</span>
                ` : v}
          </div>
        ` : v}

        ${m ? w`
          <div class="stats-row">

            ${d ? w`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${Ut(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${p ? w`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${Ut(r, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${g ? w`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${u ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${Ut(a, s)}</span>
                    </div>
                  ` : v}
                  ${y ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${Ut(l, s)}</span>
                    </div>
                  ` : v}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : v}

          </div>
        ` : v}

      </div>
    `;
  }
};
pt.styles = bt`
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
Ht([
  x({ attribute: !1 })
], pt.prototype, "hass", 2);
Ht([
  x({ attribute: !1 })
], pt.prototype, "config", 2);
Ht([
  x({ type: Boolean })
], pt.prototype, "showTitle", 2);
Ht([
  x({ type: Boolean })
], pt.prototype, "showValues", 2);
pt = Ht([
  $t("hec-card-header")
], pt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mi = { CHILD: 2 }, Pi = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Li = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this._$Ct = t, this._$AM = s, this._$Ci = i;
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
const { I: Oi } = gi, ks = (e) => e, Ms = () => document.createComment(""), St = (e, t, s) => {
  var n;
  const i = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const r = i.insertBefore(Ms(), o), a = i.insertBefore(Ms(), o);
    s = new Oi(r, a, e, e.options);
  } else {
    const r = s._$AB.nextSibling, a = s._$AM, l = a !== e;
    if (l) {
      let d;
      (n = s._$AQ) == null || n.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== a._$AU && s._$AP(d);
    }
    if (r !== o || l) {
      let d = s._$AA;
      for (; d !== r; ) {
        const p = ks(d).nextSibling;
        ks(i).insertBefore(d, o), d = p;
      }
    }
  }
  return s;
}, rt = (e, t, s = e) => (e._$AI(t, s), e), Ni = {}, zi = (e, t = Ni) => e._$AH = t, Hi = (e) => e._$AH, te = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ps = (e, t, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = t; o <= s; o++) i.set(e[o], o);
  return i;
}, Ls = Pi(class extends Li {
  constructor(e) {
    if (super(e), e.type !== Mi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, s) {
    let i;
    s === void 0 ? s = t : t !== void 0 && (i = t);
    const o = [], n = [];
    let r = 0;
    for (const a of e) o[r] = i ? i(a, r) : r, n[r] = s(a, r), r++;
    return { values: n, keys: o };
  }
  render(e, t, s) {
    return this.dt(e, t, s).values;
  }
  update(e, [t, s, i]) {
    const o = Hi(e), { values: n, keys: r } = this.dt(t, s, i);
    if (!Array.isArray(o)) return this.ut = r, n;
    const a = this.ut ?? (this.ut = []), l = [];
    let d, p, u = 0, y = o.length - 1, g = 0, f = n.length - 1;
    for (; u <= y && g <= f; ) if (o[u] === null) u++;
    else if (o[y] === null) y--;
    else if (a[u] === r[g]) l[g] = rt(o[u], n[g]), u++, g++;
    else if (a[y] === r[f]) l[f] = rt(o[y], n[f]), y--, f--;
    else if (a[u] === r[f]) l[f] = rt(o[u], n[f]), St(e, l[f + 1], o[u]), u++, f--;
    else if (a[y] === r[g]) l[g] = rt(o[y], n[g]), St(e, o[u], o[y]), y--, g++;
    else if (d === void 0 && (d = Ps(r, g, f), p = Ps(a, u, y)), d.has(a[u])) if (d.has(a[y])) {
      const m = p.get(r[g]), b = m !== void 0 ? o[m] : null;
      if (b === null) {
        const _ = St(e, o[u]);
        rt(_, n[g]), l[g] = _;
      } else l[g] = rt(b, n[g]), St(e, o[u], b), o[m] = null;
      g++;
    } else te(o[y]), y--;
    else te(o[u]), u++;
    for (; g <= f; ) {
      const m = St(e, l[f + 1]);
      rt(m, n[g]), l[g++] = m;
    }
    for (; u <= y; ) {
      const m = o[u++];
      m !== null && te(m);
    }
    return this.ut = r, zi(e, l), ut;
  }
});
var Ii = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, D = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ri(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ii(t, s, o), o;
};
const Di = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Ui = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, ie = 38, Os = +(2 * Math.PI * ie).toFixed(4);
function jt(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
function Ns(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
let N = class extends B {
  constructor() {
    super(...arguments), this.type = "home", this.label = "", this.showLabel = !0, this.icon = "", this.bottomText = "", this.colour = "", this.power = null, this.soc = null, this.unit = "auto", this.decimalPlaces = 1;
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
    const e = Di[this.type] ?? Ui, t = this.colour || e.accent, s = this.icon || e.icon, i = this.soc !== null, o = this.type === "grid" || this.type === "battery", n = o && this.power !== null ? Math.abs(this.power) : this.power, r = o && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-left-bold-circle" : this.power < 0 ? "mdi:arrow-right-bold-circle" : "" : "", a = i ? Math.max(0, Math.min(100, this.soc)) : 0, l = +(Os * (1 - a / 100)).toFixed(4);
    return w`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${i ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${ie}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${ie}"
            style="stroke-dasharray:${Os};stroke-dashoffset:${l};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${e.gradStart} 0%,${e.gradEnd} 100%);color:${t};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${s}></ha-icon>
          ${this.showLabel ? w`<span class="label" style="color:${t};">${this.label || this.type}</span>` : v}
          <span class="power">${jt(n, this.unit, this.decimalPlaces)}</span>
          ${r ? w`<ha-icon class="direction-icon" .icon=${r}></ha-icon>` : this.bottomText ? w`<span class="bottom-text">${this.bottomText}</span>` : v}
        </div>

      </div>
    `;
  }
};
N.styles = bt`
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

    .bottom-text {
      font-size: 0.52em;
      line-height: 1;
      font-weight: 600;
      color: #1a1a2e;
      opacity: 0.72;
      margin-top: -1px;
      white-space: nowrap;
    }

    /* ── SOC text (only rendered when SOC is present) ── */
  `;
D([
  x()
], N.prototype, "type", 2);
D([
  x()
], N.prototype, "label", 2);
D([
  x({ type: Boolean })
], N.prototype, "showLabel", 2);
D([
  x()
], N.prototype, "icon", 2);
D([
  x()
], N.prototype, "bottomText", 2);
D([
  x()
], N.prototype, "colour", 2);
D([
  x({ type: Number })
], N.prototype, "power", 2);
D([
  x({ type: Number })
], N.prototype, "soc", 2);
D([
  x()
], N.prototype, "unit", 2);
D([
  x({ type: Number })
], N.prototype, "decimalPlaces", 2);
N = D([
  $t("hec-energy-node")
], N);
function oe(e, t, s = 0) {
  const i = { power: null, magnitude: null, direction: "idle" };
  if (t === null) return i;
  if (Math.abs(t) <= s) return { power: 0, magnitude: null, direction: "idle" };
  const o = Math.abs(t);
  let n;
  switch (e) {
    case "solar":
      n = "to-home";
      break;
    case "grid":
      n = t > 0 ? "to-home" : "from-home";
      break;
    case "battery":
      n = t > 0 ? "to-home" : "from-home";
      break;
    case "ev":
      n = t > 0 ? "from-home" : "to-home";
      break;
    default:
      n = t > 0 ? "from-home" : "to-home";
  }
  return { power: t, magnitude: o, direction: n };
}
function Ys(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function ee(e, t) {
  var o;
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : Ys(
    i,
    (o = s.attributes) == null ? void 0 : o.unit_of_measurement
  );
}
function Zs(e, t, s) {
  let i;
  if (t.power_combined)
    i = ee(s, t.power_combined);
  else {
    const o = !!t.power_import, n = !!t.power_export;
    if (!o && !n) return null;
    const r = o ? ee(s, t.power_import) : null, a = n ? ee(s, t.power_export) : null;
    if ((!o || r === null) && (!n || a === null)) return null;
    i = (r ?? 0) - (a ?? 0);
  }
  return e === "battery" && t.reverse_power_flow && (i *= -1), i;
}
function _t(e, t, s) {
  return oe(
    e,
    Zs(e, t, s),
    t.zero_tolerance ?? 0
  );
}
var Fi = Object.defineProperty, Vi = Object.getOwnPropertyDescriptor, J = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Vi(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Fi(t, s, o), o;
};
const Bi = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, ji = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, Gi = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Ki(e, t) {
  const s = Date.now(), i = s - 864e5, o = Array(24).fill(null);
  if (!e.length) return o;
  for (let n = 0; n < 24; n++) {
    const r = i + n * 36e5, a = r + 36e5;
    let l = 0, d = 0;
    for (let p = 0; p < e.length; p++) {
      const u = new Date(e[p].last_changed).getTime(), y = p + 1 < e.length ? new Date(e[p + 1].last_changed).getTime() : s, g = Math.max(u, r), f = Math.min(y, a);
      if (f <= g) continue;
      const m = parseFloat(e[p].state);
      if (isNaN(m)) continue;
      const b = Ys(m, t), _ = f - g;
      l += Math.abs(b) * _, d += _;
    }
    d > 0 && (o[n] = l / d);
  }
  return o;
}
function Js(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function Ft(e, t) {
  var o;
  const s = Js(e, t);
  return s === null ? null : ((o = e[t]) == null ? void 0 : o.attributes.unit_of_measurement) === "Wh" ? s / 1e3 : s;
}
function zs(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function Wi(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  if (isNaN(i)) return null;
  const o = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return o.includes("pence") || o.startsWith("p/") || o === "p" ? i / 100 : i;
}
function se(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function qt(e, t) {
  const s = typeof e == "number" ? e : parseFloat(String(e));
  if (isNaN(s)) return null;
  const i = String(t ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? s / 100 : (i.includes("gbp") || i.includes("£"), s);
}
function Hs(e) {
  if (!e) return [];
  const t = e.attributes.unit_of_measurement;
  return (e.attributes.rates ?? e.attributes.current_day_rates ?? e.attributes.today_rates ?? e.attributes.upcoming_interval_rates ?? []).map((i) => {
    const o = new Date(i.start ?? i.start_time ?? "").getTime(), n = new Date(i.end ?? i.end_time ?? "").getTime(), r = qt(
      i.value_inc_vat ?? i.rate_inc_vat ?? i.value ?? i.rate,
      i.unit_of_measurement ?? t
    );
    return !Number.isFinite(o) || !Number.isFinite(n) || !r ? null : { startMs: o, endMs: n, rateGbpPerKwh: r };
  }).filter((i) => i !== null).sort((i, o) => i.startMs - o.startMs);
}
function Is(e, t, s) {
  if (!e.length) return [];
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const n = new Date(e[o].last_changed).getTime(), r = o + 1 < e.length ? new Date(e[o + 1].last_changed).getTime() : s, a = qt(e[o].state, t);
    !Number.isFinite(n) || !Number.isFinite(r) || r <= n || a !== null && i.push({ startMs: n, endMs: r, rateGbpPerKwh: a });
  }
  return i;
}
function qi(e, t) {
  const s = t == null ? void 0 : t.attributes.unit_of_measurement, i = e.map((o) => qt(o.state, s)).filter((o) => o !== null);
  if (i.length > 0) {
    const o = i[0];
    return i.every((n) => Math.abs(n - o) < 1e-9) ? o : null;
  }
  return t ? qt(t.state, s) : null;
}
function Yi(e, t) {
  return String(t ?? "").trim().toLowerCase() === "wh" ? e / 1e3 : e;
}
function Rs(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  const i = [];
  let o = !1;
  for (let n = 1; n < e.length; n++) {
    const r = new Date(e[n - 1].last_changed).getTime(), a = new Date(e[n].last_changed).getTime();
    if (!Number.isFinite(r) || !Number.isFinite(a) || a <= r) continue;
    const l = parseFloat(e[n - 1].state), d = parseFloat(e[n].state);
    if (isNaN(l) || isNaN(d)) continue;
    const p = Yi(d - l, t);
    if (p <= 0) continue;
    const u = a - r, y = [];
    let g = 0;
    for (const f of s) {
      const m = Math.max(r, f.startMs), b = Math.min(a, f.endMs);
      if (b <= m) continue;
      const _ = b - m;
      g += _, y.push({
        startMs: m,
        endMs: b,
        overlapMs: _,
        rateGbpPerKwh: f.rateGbpPerKwh
      });
    }
    if (g > 0) {
      g < u && (o = !0);
      for (const f of y) {
        const m = p * (f.overlapMs / g);
        i.push({
          startMs: f.startMs,
          endMs: f.endMs,
          energyKwh: m,
          energyUnit: "kWh",
          tariffGbpPerKwh: f.rateGbpPerKwh,
          costGbp: m * f.rateGbpPerKwh
        });
      }
    } else u > 0 && (o = !0);
  }
  return i.length ? { intervals: i, hasCoverageGap: o } : null;
}
function Ds(e) {
  return !(e != null && e.intervals.length) || e.hasCoverageGap ? null : e.intervals.reduce(
    (t, s) => t + s.costGbp,
    0
  );
}
function Zi(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function Us(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Ji(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function Xi(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
const at = 50;
let j = class extends B {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1, this._gridMoney = null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && (this._loadHistory(), this.nodeType === "grid" ? this._loadGridMoney() : this._gridMoney = null);
  }
  async _loadHistory() {
    var i, o, n, r;
    const e = (o = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : o[this.nodeType], t = (e == null ? void 0 : e.power_combined) ?? (e == null ? void 0 : e.power_import) ?? (e == null ? void 0 : e.power_export);
    if (!t || !this.hass) return;
    const s = (r = (n = this.hass.states) == null ? void 0 : n[t]) == null ? void 0 : r.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const a = /* @__PURE__ */ new Date(), d = `history/period/${new Date(a.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${a.toISOString()}`, p = await this.hass.callApi("GET", d);
      this._hourly = Ki((p == null ? void 0 : p[0]) ?? [], s);
    } catch (a) {
      console.warn("[hec-node-detail] history fetch failed", a), this._hourly = [];
    } finally {
      this._loading = !1;
    }
  }
  async _loadGridMoney() {
    var l, d, p, u, y, g, f, m, b, _, S, k;
    const e = (d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d.grid, t = e == null ? void 0 : e.octopus;
    if (!this.hass || !e || !t) {
      this._gridMoney = null;
      return;
    }
    const s = Hs(
      t.slots_entity ? (p = this.hass.states) == null ? void 0 : p[t.slots_entity] : void 0
    ), i = e.export_rate ? (u = this.hass.states) == null ? void 0 : u[e.export_rate] : void 0, o = Hs(
      i
    ), n = /* @__PURE__ */ new Date();
    n.setHours(0, 0, 0, 0);
    const r = /* @__PURE__ */ new Date(), a = async (C) => {
      if (!C || !this.hass) return [];
      const T = `history/period/${n.toISOString()}?filter_entity_id=${C}&minimal_response=true&no_attributes=true&end_time=${r.toISOString()}`, M = await this.hass.callApi("GET", T);
      return (M == null ? void 0 : M[0]) ?? [];
    };
    try {
      const [C, T, M, L] = await Promise.all([
        a(e.daily_usage),
        a(e.daily_export),
        a(t.rate_entity),
        a(e.export_rate)
      ]), O = e.daily_usage ? (g = (y = this.hass.states) == null ? void 0 : y[e.daily_usage]) == null ? void 0 : g.attributes.unit_of_measurement : void 0, z = e.daily_export ? (m = (f = this.hass.states) == null ? void 0 : f[e.daily_export]) == null ? void 0 : m.attributes.unit_of_measurement : void 0, H = t.rate_entity ? (_ = (b = this.hass.states) == null ? void 0 : b[t.rate_entity]) == null ? void 0 : _.attributes.unit_of_measurement : void 0, I = e.export_rate ? (k = (S = this.hass.states) == null ? void 0 : S[e.export_rate]) == null ? void 0 : k.attributes.unit_of_measurement : void 0, U = s.length ? s : Is(M, H, r.getTime()), F = o.length ? o : Is(L, I, r.getTime()), xt = Ft(this.hass.states, e.daily_usage), X = Ft(this.hass.states, e.daily_export), q = qi(L, i), Q = Rs(
        C,
        O,
        U
      ), tt = Ds(
        Q
      ), et = Rs(
        T,
        z,
        F
      ), st = Ds(
        et
      ), it = Wi(this.hass.states, t.cost_entity), G = tt ?? it, K = st ?? (X !== null && q !== null ? X * q : null), ot = G !== null && K !== null ? G - K : null;
      this._gridMoney = {
        importCostToday: G,
        exportPaymentToday: K,
        netCost: ot
      };
    } catch (C) {
      console.warn("[hec-node-detail] grid money load failed", C), this._gridMoney = null;
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: !0, composed: !0 }));
  }
  // ── Section renderers ─────────────────────────────────────────────────────
  _header(e, t, s) {
    return w`
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
    var o, n, r, a;
    const t = ((n = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : n.decimal_places) ?? 1, s = ((a = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : a.unit) ?? "auto", i = this._powerSubtitle(e, s, t);
    return w`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${jt(e.power, s, t)}</div>
        ${i ? w`<div class="power-sub">${i}</div>` : v}
      </div>
    `;
  }
  _powerSubtitle(e, t, s) {
    var L, O, z, H, I, U, F;
    const i = ((L = Gi[this.nodeType]) == null ? void 0 : L[e.direction]) ?? "";
    if (this.nodeType !== "grid" || e.direction !== "from-home" || !this.hass) return i;
    const o = this.hass.states, n = ((z = (O = this.config) == null ? void 0 : O.entity_types) == null ? void 0 : z.solar) ?? {}, r = ((I = (H = this.config) == null ? void 0 : H.entity_types) == null ? void 0 : I.home) ?? {}, a = ((F = (U = this.config) == null ? void 0 : U.entity_types) == null ? void 0 : F.battery) ?? {}, l = _t("solar", n, o), d = _t("home", r, o), p = _t("battery", a, o), u = e.magnitude ?? 0;
    if (u <= 0) return i;
    const y = l.direction === "to-home" ? l.magnitude ?? 0 : 0, g = Math.max(d.power ?? 0, 0), f = p.direction === "to-home" ? p.magnitude ?? 0 : 0, m = Math.max(y - g, 0), b = Math.min(u, m), _ = Math.min(
      Math.max(u - b, 0),
      f
    ), S = b + _;
    if (Math.max(u - S, 0) > Math.max(at, u * 0.1))
      return i;
    const C = b > at && _ <= at, T = _ > at && b <= at, M = b > at && _ > at;
    return C ? "Exporting solely from excess solar production" : T ? "Exporting solely from the battery" : M ? `Exporting ${jt(b, t, s)} from excess solar production and ${jt(_, t, s)} from the battery` : i;
  }
  _sectionSoc(e) {
    if (e === null) return v;
    const t = Xi(e);
    return w`
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
    return e.daily_usage && n.push([i, zs(Ft(t, e.daily_usage), s)]), e.daily_export && n.push([o, zs(Ft(t, e.daily_export), s)]), n.length ? w`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, p]) => w`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${p}</span>
          </div>
        `)}
      </div>
    ` : v;
  }
  _sectionOctopus(e) {
    var g, f, m, b;
    const t = ((g = this.hass) == null ? void 0 : g.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.slots_entity ? t[e.slots_entity] : null, o = s == null ? void 0 : s.state, n = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", r = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], a = Date.now(), l = r.filter((_) => new Date(_.end ?? _.end_time ?? 0).getTime() > a).slice(0, 6), d = o && o !== "unavailable" && o !== "unknown", p = ((f = this._gridMoney) == null ? void 0 : f.importCostToday) ?? null, u = ((m = this._gridMoney) == null ? void 0 : m.exportPaymentToday) ?? null, y = ((b = this._gridMoney) == null ? void 0 : b.netCost) ?? null;
    return !d && !l.length && p === null && u === null && y === null ? v : w`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${d ? w`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(o).toFixed(2)} ${n}</span>
          </div>
        ` : v}

        <div class="kv">
          <span class="kv-k">Import Cost Today</span>
          <span class="kv-v">${se(p)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${se(u)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${se(y)}</span>
        </div>

        ${l.length ? w`
          <div class="s-subtitle">Upcoming slots</div>
          ${l.map((_) => {
      const S = _.start ?? _.start_time ?? "", k = _.end ?? _.end_time ?? "", C = _.value_inc_vat ?? _.rate_inc_vat ?? _.value ?? 0, T = Ji(C);
      return w`
              <div class="slot">
                <span class="slot-dot" style="background:${T};"></span>
                <span class="slot-time">${Us(S)}–${Us(k)}</span>
                <span class="slot-rate" style="color:${T};">${(+C).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : v}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((n) => n !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => Zi(new Date(i.getTime() - n * 36e5));
    return this._loading ? w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? w`<div class="chart-msg">No data</div>` : w`
              ${kt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return kt``;
      const a = Math.max(2, n / s * 48);
      return kt`
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
    var l, d, p;
    if (!this.open || !this.nodeType) return v;
    const e = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((p = this.hass) == null ? void 0 : p.states) ?? {}, s = e.colour || (ji[this.nodeType] ?? "#9e9e9e"), i = e.icon || Bi[this.nodeType] || "mdi:lightning-bolt", o = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = _t(this.nodeType, e, t), r = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !Wt.includes(this.nodeType)), a = r ? Js(t, e.soc) : null;
    return w`
      <div
        class="overlay"
        @click=${(u) => u.target === u.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, i, o)}
          ${this._sectionPower(n)}
          ${r ? this._sectionSoc(a) : v}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : v}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
j.styles = bt`
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
      overflow: hidden;
    }

    /* ── Panel (bottom sheet) ── */
    .panel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      background: var(--card-background-color, #fff);
      border-radius: 20px 20px 0 0;
      width: min(100%, 480px);
      max-width: 480px;
      max-height: min(86vh, calc(100dvh - env(safe-area-inset-top, 0px)));
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
J([
  x({ attribute: !1 })
], j.prototype, "hass", 2);
J([
  x({ attribute: !1 })
], j.prototype, "config", 2);
J([
  x()
], j.prototype, "nodeType", 2);
J([
  x({ type: Boolean })
], j.prototype, "open", 2);
J([
  zt()
], j.prototype, "_hourly", 2);
J([
  zt()
], j.prototype, "_loading", 2);
J([
  zt()
], j.prototype, "_gridMoney", 2);
j = J([
  $t("hec-node-detail")
], j);
var Qi = Object.defineProperty, to = Object.getOwnPropertyDescriptor, It = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? to(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Qi(t, s, o), o;
};
function eo(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const W = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
}, Fs = 75;
let ft = class extends B {
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
    var n, r, a;
    const t = ((r = (n = this.config) == null ? void 0 : n.entity_types) == null ? void 0 : r[e]) ?? {}, s = ((a = this.hass) == null ? void 0 : a.states) ?? {};
    if (e !== "home")
      return _t(e, t, s);
    const i = Zs("home", t, s);
    if (i === null) return oe("home", null, t.zero_tolerance ?? 0);
    const o = this._customTypes().reduce((l, d) => {
      var y, g;
      const p = ((g = (y = this.config) == null ? void 0 : y.entity_types) == null ? void 0 : g[d]) ?? {};
      if (!p.subtract_from_home) return l;
      const u = _t(d, p, s);
      return l + (u.power ?? 0);
    }, 0);
    return oe(
      "home",
      i - o,
      t.zero_tolerance ?? 0
    );
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
  _dailyKwh(e) {
    var n, r, a;
    const t = (a = (r = (n = this.config) == null ? void 0 : n.entity_types) == null ? void 0 : r[e]) == null ? void 0 : a.daily_usage;
    if (!t || !this.hass) return null;
    const s = this.hass.states[t];
    if (!s || s.state === "unavailable" || s.state === "unknown") return null;
    const i = parseFloat(s.state);
    return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
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
    const s = {}, i = Array.from(
      this.renderRoot.querySelectorAll("hec-energy-node[data-node-type]")
    );
    for (const r of i) {
      if (r.classList.contains("hidden")) continue;
      const a = r.dataset.nodeType;
      if (!a) continue;
      const l = r.getBoundingClientRect();
      s[a] = {
        x: l.left - t.left + l.width / 2,
        y: l.top - t.top + l.height / 2
      };
    }
    const o = {
      width: t.width,
      height: t.height,
      centers: s
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
    this._flowSamples[e] = s.filter((i) => t - i.timestamp <= 1e4);
  }
  _recordFlowSamples() {
    const e = Date.now();
    for (const t of this._sampleTypes()) {
      const s = this._flowInfo(t), i = this._flowSamples[t] ?? [];
      i.push({
        timestamp: e,
        magnitude: s.magnitude
      }), this._flowSamples[t] = i, this._pruneFlowSamples(t, e);
    }
  }
  _refreshSmoothedMagnitudes() {
    const e = Date.now();
    let t = !1;
    for (const s of this._sampleTypes()) {
      this._pruneFlowSamples(s, e);
      const o = (this._flowSamples[s] ?? []).map((r) => r.magnitude).filter((r) => r !== null), n = o.length > 0 ? o.reduce((r, a) => r + Math.abs(a), 0) / o.length : null;
      this._smoothedMagnitudes[s] !== n && (this._smoothedMagnitudes[s] = n, t = !0);
    }
    return t;
  }
  _computeLineVisualState(e) {
    var n, r, a, l, d, p, u;
    const t = ((r = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : r.dynamic_animation_speed) ?? !1, s = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.animation) !== !1, i = this._flowInfo(e), o = this._smoothedMagnitudes[e] ?? i.magnitude;
    return {
      color: W[e] ?? ((u = (p = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : p[e]) == null ? void 0 : u.colour) ?? "#9e9e9e",
      dur: eo(o, t && i.direction !== "idle"),
      idle: i.direction === "idle",
      paused: !s,
      reverse: i.direction === "from-home"
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
      const s = this._computeLineVisualState(t), i = this._lineVisualState[t];
      e[t] = this._sameLineVisualState(i, s) ? i : s;
    }
    this._lineVisualState = e;
  }
  _svgLines() {
    var q, Q, tt, et, st, it, G, K, ot, Et;
    const e = this._lineLayout.centers, t = e.home, s = e.solar;
    if (!t || !this._lineLayout.width || !this._lineLayout.height) return v;
    const i = [], o = [], n = ($, P, R, V, gt) => {
      !e[P] || !e[R] || o.push({
        key: `idle-${$}`,
        pathKey: $,
        from: P,
        to: R,
        type: V,
        color: gt
      });
    }, r = this._flowInfo("solar"), a = this._flowInfo("home"), l = this._flowInfo("battery"), d = this._flowInfo("ev"), p = this._flowInfo("grid"), u = s && r.direction === "to-home" ? r.magnitude ?? 0 : 0, y = Math.max(a.power ?? 0, 0), g = l.direction === "from-home" ? l.magnitude ?? 0 : 0, f = l.direction === "to-home" ? l.magnitude ?? 0 : 0, m = d.direction === "from-home" ? d.magnitude ?? 0 : 0, b = p.direction === "from-home" ? p.magnitude ?? 0 : 0, _ = Math.min(u, y);
    let S = Math.max(u - _, 0);
    const k = Math.min(S, g);
    S = Math.max(S - k, 0);
    const C = Math.min(S, m);
    S = Math.max(S - C, 0);
    const T = Math.min(S, b);
    s && _ > 0 && i.push({
      key: "solar-home",
      pathKey: "solar-home",
      from: "solar",
      to: "home",
      type: "solar",
      color: W.solar,
      magnitude: _
    }), s && k > 0 && e.battery && i.push({
      key: "solar-battery",
      pathKey: "solar-battery",
      from: "solar",
      to: "battery",
      type: "solar",
      color: W.solar,
      magnitude: k
    }), s && C > 0 && e.ev && i.push({
      key: "solar-ev",
      pathKey: "solar-ev",
      from: "solar",
      to: "ev",
      type: "solar",
      color: W.solar,
      magnitude: C
    }), s && T > 0 && e.grid && i.push({
      key: "solar-grid",
      pathKey: "solar-grid",
      from: "solar",
      to: "grid",
      type: "solar",
      color: W.solar,
      magnitude: T
    });
    const M = Math.max(g - k, 0), L = Math.max(m - C, 0), O = Math.max(b - T, 0), z = Math.max(y - _, 0), H = Math.min(f, z), I = Math.max(f - H, 0), U = Math.min(O, I), F = O <= Fs || U <= Fs ? 0 : U;
    p.direction === "to-home" && (p.magnitude ?? 0) > 0 && e.grid && i.push({
      key: "grid-home",
      pathKey: "home-grid",
      from: "grid",
      to: "home",
      type: "grid",
      color: ((q = this._lineVisualState.grid) == null ? void 0 : q.color) ?? this._computeLineVisualState("grid").color,
      magnitude: p.magnitude ?? 0
    }), F > 0 && e.grid && i.push({
      key: "home-grid",
      pathKey: "home-grid",
      from: "home",
      to: "grid",
      type: "battery",
      color: ((Q = this._lineVisualState.battery) == null ? void 0 : Q.color) ?? this._computeLineVisualState("battery").color,
      magnitude: F
    }), l.direction === "to-home" && (l.magnitude ?? 0) > 0 && e.battery && i.push({
      key: "battery-home",
      pathKey: "home-battery",
      from: "battery",
      to: "home",
      type: "battery",
      color: ((tt = this._lineVisualState.battery) == null ? void 0 : tt.color) ?? this._computeLineVisualState("battery").color,
      magnitude: l.magnitude ?? 0
    }), M > 0 && e.battery && i.push({
      key: "home-battery",
      pathKey: "home-battery",
      from: "home",
      to: "battery",
      type: "battery",
      color: ((et = this._lineVisualState.battery) == null ? void 0 : et.color) ?? this._computeLineVisualState("battery").color,
      magnitude: M
    }), d.direction === "to-home" && (d.magnitude ?? 0) > 0 && e.ev && i.push({
      key: "ev-home",
      pathKey: "home-ev",
      from: "ev",
      to: "home",
      type: "ev",
      color: ((st = this._lineVisualState.ev) == null ? void 0 : st.color) ?? this._computeLineVisualState("ev").color,
      magnitude: d.magnitude ?? 0
    }), L > 0 && e.ev && i.push({
      key: "home-ev",
      pathKey: "home-ev",
      from: "home",
      to: "ev",
      type: "ev",
      color: ((it = this._lineVisualState.ev) == null ? void 0 : it.color) ?? this._computeLineVisualState("ev").color,
      magnitude: L
    });
    for (const $ of this._customTypes()) {
      const P = this._flowInfo($), R = e[$], V = ((G = this._lineVisualState[$]) == null ? void 0 : G.color) ?? this._computeLineVisualState($).color;
      R && n(`home-${$}`, "home", $, $, V), !(!R || !P.magnitude || P.direction === "idle") && i.push({
        key: `custom-${$}`,
        pathKey: `home-${$}`,
        from: P.direction === "to-home" ? $ : "home",
        to: P.direction === "to-home" ? "home" : $,
        type: $,
        color: V,
        magnitude: P.magnitude
      });
    }
    s && (n("solar-home", "solar", "home", "solar", W.solar), e.battery && n("solar-battery", "solar", "battery", "solar", W.solar), e.ev && n("solar-ev", "solar", "ev", "solar", W.solar), e.grid && n("solar-grid", "solar", "grid", "solar", W.solar)), e.grid && n(
      "home-grid",
      "home",
      "grid",
      "grid",
      ((K = this._lineVisualState.grid) == null ? void 0 : K.color) ?? this._computeLineVisualState("grid").color
    ), e.battery && n(
      "home-battery",
      "home",
      "battery",
      "battery",
      ((ot = this._lineVisualState.battery) == null ? void 0 : ot.color) ?? this._computeLineVisualState("battery").color
    ), e.ev && n(
      "home-ev",
      "home",
      "ev",
      "ev",
      ((Et = this._lineVisualState.ev) == null ? void 0 : Et.color) ?? this._computeLineVisualState("ev").color
    );
    const xt = new Set(i.map(($) => $.pathKey)), X = [
      ...o.filter(($) => !xt.has($.pathKey)),
      ...i
    ];
    return kt`
      ${Ls(
      X,
      ($) => $.key,
      ($) => {
        const P = e[$.from], R = e[$.to];
        if (!P || !R) return v;
        const V = this._lineVisualState[$.type] ?? this._computeLineVisualState($.type), gt = [
          "flow-line",
          "magnitude" in $ ? "" : "idle",
          V.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return kt`
            <line
              x1="${P.x}" y1="${P.y}" x2="${R.x}" y2="${R.y}"
              stroke="${$.color}"
              class="${gt}"
              style="--flow-dur:${V.dur}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(e, t, s = !1) {
    var l, d, p;
    const i = e === "home" ? !0 : this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, n = ((p = this.config) == null ? void 0 : p.display) ?? {}, r = this._flowInfo(e), a = e === "solar" ? Ns(this._dailyKwh(e), n.decimal_places ?? 1) : "";
    return w`
      <hec-energy-node
        data-node-type=${e}
        class="${t}${i ? "" : " hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .showLabel=${o.show_label ?? !0}
        .icon=${o.icon ?? ""}
        .bottomText=${a}
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
      (t) => !Wt.includes(t)
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
    var l, d, p;
    const i = this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, n = ((p = this.config) == null ? void 0 : p.display) ?? {}, r = this._flowInfo(e), a = Ns(
      this._dailyKwh(e),
      n.decimal_places ?? 1
    );
    return w`
      <hec-energy-node
        data-node-type=${e}
        style="grid-column:${t}; grid-row:${s}"
        class="${i ? "" : "hidden"}"
        .type=${e}
        .label=${o.label ?? e}
        .showLabel=${o.show_label ?? !0}
        .icon=${o.icon ?? ""}
        .bottomText=${a}
        .colour=${o.colour ?? ""}
        .power=${r.power}
        .soc=${o.soc ? this._soc(e) : null}
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
    if (!this.config) return v;
    const e = this._customTypes();
    return 2 + Math.ceil(e.length / 3), w`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar") : v}
        ${this._configured("ev") ? this._node("ev", "slot-ev", !0) : v}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid", "slot-grid")}
        ${this._node("home", "slot-home")}
        ${this._node("battery", "slot-battery", !0)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${Ls(e, (t) => t, (t, s) => {
      const [i, o] = this._customSlot(s);
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
ft.styles = bt`
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
It([
  x({ attribute: !1 })
], ft.prototype, "hass", 2);
It([
  x({ attribute: !1 })
], ft.prototype, "config", 2);
It([
  zt()
], ft.prototype, "_dialogType", 2);
It([
  zt()
], ft.prototype, "_lineLayout", 2);
ft = It([
  $t("hec-flow-layout")
], ft);
var so = Object.defineProperty, io = Object.getOwnPropertyDescriptor, pe = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? io(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && so(t, s, o), o;
};
let Nt = class extends B {
  setConfig(e) {
    this.config = Bt(e);
  }
  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-energy-card", show_header: !0 };
  }
  render() {
    return this.config ? w`
      <ha-card>
        <hec-card-header
          .hass=${this.hass}
          .config=${this.config}
          .showTitle=${this.config.show_header !== !1}
          .showValues=${this.config.show_header_values !== !1}
        ></hec-card-header>
        <div class="card-body">
          <hec-flow-layout
            .hass=${this.hass}
            .config=${this.config}
          ></hec-flow-layout>
        </div>
      </ha-card>
    ` : v;
  }
};
Nt.styles = bt`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
pe([
  x({ attribute: !1 })
], Nt.prototype, "hass", 2);
pe([
  x({ attribute: !1 })
], Nt.prototype, "config", 2);
Nt = pe([
  $t("home-energy-card")
], Nt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  Nt as HomeEnergyCard
};
