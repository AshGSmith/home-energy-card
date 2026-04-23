/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = globalThis, he = Kt.ShadowRoot && (Kt.ShadyCSS === void 0 || Kt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), Es = /* @__PURE__ */ new WeakMap();
let Js = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (he && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Es.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Es.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ai = (e) => new Js(typeof e == "string" ? e : e + "", void 0, de), $t = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new Js(s, e, de);
}, ci = (e, t) => {
  if (he) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Kt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, Cs = he ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ai(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: li, defineProperty: hi, getOwnPropertyDescriptor: di, getOwnPropertyNames: ui, getOwnPropertySymbols: pi, getPrototypeOf: fi } = Object, X = globalThis, Ss = X.trustedTypes, yi = Ss ? Ss.emptyScript : "", ee = X.reactiveElementPolyfillSupport, kt = (e, t) => e, Zt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? yi : null;
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
} }, ue = (e, t) => !li(e, t), As = { attribute: !0, type: String, converter: Zt, reflect: !1, useDefault: !1, hasChanged: ue };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), X.litPropertyMetadata ?? (X.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let _t = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = As) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && hi(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: n } = di(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? As;
  }
  static _$Ei() {
    if (this.hasOwnProperty(kt("elementProperties"))) return;
    const t = fi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(kt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(kt("properties"))) {
      const s = this.properties, i = [...ui(s), ...pi(s)];
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
      for (const o of i) s.unshift(Cs(o));
    } else t !== void 0 && s.push(Cs(t));
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
    return ci(t, this.constructor.elementStyles), t;
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
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : Zt).toAttribute(s, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Zt;
      this._$Em = o;
      const d = c.fromAttribute(s, a.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ue)(n, s) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
        const { wrapped: a } = r, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
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
_t.elementStyles = [], _t.shadowRootOptions = { mode: "open" }, _t[kt("elementProperties")] = /* @__PURE__ */ new Map(), _t[kt("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: _t }), (X.reactiveElementVersions ?? (X.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = globalThis, Ts = (e) => e, Xt = Pt.trustedTypes, ks = Xt ? Xt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qs = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, ti = "?" + Z, gi = `<${ti}>`, pt = document, Ot = () => pt.createComment(""), zt = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, mi = (e) => pe(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", se = `[ 	
\f\r]`, At = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ps = /-->/g, Ms = />/g, at = RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ls = /'/g, Os = /"/g, ei = /^(?:script|style|textarea|title)$/i, si = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), w = si(1), Mt = si(2), ft = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), zs = /* @__PURE__ */ new WeakMap(), dt = pt.createTreeWalker(pt, 129);
function ii(e, t) {
  if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ks !== void 0 ? ks.createHTML(t) : t;
}
const _i = (e, t) => {
  const s = e.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = At;
  for (let a = 0; a < s; a++) {
    const c = e[a];
    let d, u, p = -1, g = 0;
    for (; g < c.length && (r.lastIndex = g, u = r.exec(c), u !== null); ) g = r.lastIndex, r === At ? u[1] === "!--" ? r = Ps : u[1] !== void 0 ? r = Ms : u[2] !== void 0 ? (ei.test(u[2]) && (o = RegExp("</" + u[2], "g")), r = at) : u[3] !== void 0 && (r = at) : r === at ? u[0] === ">" ? (r = o ?? At, p = -1) : u[1] === void 0 ? p = -2 : (p = r.lastIndex - u[2].length, d = u[1], r = u[3] === void 0 ? at : u[3] === '"' ? Os : Ls) : r === Os || r === Ls ? r = at : r === Ps || r === Ms ? r = At : (r = at, o = void 0);
    const y = r === at && e[a + 1].startsWith("/>") ? " " : "";
    n += r === At ? c + gi : p >= 0 ? (i.push(d), c.slice(0, p) + Qs + c.slice(p) + Z + y) : c + Z + (p === -2 ? a : y);
  }
  return [ii(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Nt {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, c = this.parts, [d, u] = _i(t, s);
    if (this.el = Nt.createElement(d, i), dt.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = dt.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(Qs)) {
          const g = u[r++], y = o.getAttribute(p).split(Z), f = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: n, name: f[2], strings: y, ctor: f[1] === "." ? bi : f[1] === "?" ? wi : f[1] === "@" ? $i : te }), o.removeAttribute(p);
        } else p.startsWith(Z) && (c.push({ type: 6, index: n }), o.removeAttribute(p));
        if (ei.test(o.tagName)) {
          const p = o.textContent.split(Z), g = p.length - 1;
          if (g > 0) {
            o.textContent = Xt ? Xt.emptyScript : "";
            for (let y = 0; y < g; y++) o.append(p[y], Ot()), dt.nextNode(), c.push({ type: 2, index: ++n });
            o.append(p[g], Ot());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ti) c.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(Z, p + 1)) !== -1; ) c.push({ type: 7, index: n }), p += Z.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = pt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function wt(e, t, s = e, i) {
  var r, a;
  if (t === ft) return t;
  let o = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const n = zt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = wt(e, o._$AS(e, t.values), o, i)), t;
}
class vi {
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? pt).importNode(s, !0);
    dt.currentNode = o;
    let n = dt.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let d;
        c.type === 2 ? d = new xt(n, n.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (d = new xi(n, this, t)), this._$AV.push(d), c = i[++a];
      }
      r !== (c == null ? void 0 : c.index) && (n = dt.nextNode(), r++);
    }
    return dt.currentNode = pt, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class xt {
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
    t = wt(this, t, s), zt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== ft && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : mi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && zt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(pt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Nt.createElement(ii(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(s);
    else {
      const r = new vi(o, this), a = r.u(this.options);
      r.p(s), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = zs.get(t.strings);
    return s === void 0 && zs.set(t.strings, s = new Nt(t)), s;
  }
  k(t) {
    pe(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of t) o === s.length ? s.push(i = new xt(this.O(Ot()), this.O(Ot()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const o = Ts(t).nextSibling;
      Ts(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class te {
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
    if (n === void 0) t = wt(this, t, s, 0), r = !zt(t) || t !== this._$AH && t !== ft, r && (this._$AH = t);
    else {
      const a = t;
      let c, d;
      for (t = n[0], c = 0; c < n.length - 1; c++) d = wt(this, a[i + c], s, c), d === ft && (d = this._$AH[c]), r || (r = !zt(d) || d !== this._$AH[c]), d === v ? t = v : t !== v && (t += (d ?? "") + n[c + 1]), this._$AH[c] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class bi extends te {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class wi extends te {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class $i extends te {
  constructor(t, s, i, o, n) {
    super(t, s, i, o, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = wt(this, t, s, 0) ?? v) === ft) return;
    const i = this._$AH, o = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== v && (i === v || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xi {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    wt(this, t);
  }
}
const Ei = { I: xt }, ie = Pt.litHtmlPolyfillSupport;
ie == null || ie(Nt, xt), (Pt.litHtmlVersions ?? (Pt.litHtmlVersions = [])).push("3.3.2");
const Ci = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new xt(t.insertBefore(Ot(), n), n, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis;
let j = class extends _t {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ci(s, this.renderRoot, this.renderOptions);
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
    return ft;
  }
};
var Xs;
j._$litElement$ = !0, j.finalized = !0, (Xs = ut.litElementHydrateSupport) == null || Xs.call(ut, { LitElement: j });
const oe = ut.litElementPolyfillSupport;
oe == null || oe({ LitElement: j });
(ut.litElementVersions ?? (ut.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Si = { attribute: !0, type: String, converter: Zt, reflect: !1, hasChanged: ue }, Ai = (e = Si, t, s) => {
  const { kind: i, metadata: o } = s;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, c, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(a) {
      const c = this[r];
      t.call(this, a), this.requestUpdate(r, c, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function x(e) {
  return (t, s) => typeof s == "object" ? Ai(e, t, s) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Dt(e) {
  return x({ ...e, state: !0, attribute: !1 });
}
const fe = (e) => e.attributes.device_class ?? "", ye = (e) => e.attributes.unit_of_measurement ?? "", ge = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function ht(...e) {
  return (t, s) => {
    let i = 0;
    fe(s) === "power" && (i += 4), ["W", "kW"].includes(ye(s)) && (i += 2);
    const o = ge(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function vt(...e) {
  return (t, s) => {
    let i = 0;
    fe(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(ye(s)) && (i += 2);
    const o = ge(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function Ns(...e) {
  return (t, s) => {
    let i = 0;
    fe(s) === "battery" && (i += 4), ye(s) === "%" && (i += 2);
    const o = ge(t, s);
    for (const n of e) o.includes(n) && (i += 1);
    return i;
  };
}
function Vt(e, t = []) {
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
    const c = s(r, a);
    c > n && (n = c, o = r);
  }
  return o && i.add(o), o;
}
function Ti(e, t, s) {
  const i = Object.values(t).some(
    (_) => _.platform === "octopus_energy" && !_.disabled_by
  ), o = Object.keys(e).filter((_) => _.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const n = o.filter(
    (_) => _.includes("octopus_energy_electricity")
  ), r = ["Octopus Energy"], a = {}, c = {}, d = A(
    n,
    e,
    Vt(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (a.rate_entity = d, r.push("rate"));
  const u = A(
    n,
    e,
    Vt(["_current_accumulative_cost"]),
    s
  );
  u && (a.cost_entity = u, r.push("cost"));
  const p = A(
    n,
    e,
    Vt(["_current_day_rates"]),
    s
  );
  p && (a.slots_entity = p, r.push("slots"));
  const g = A(
    o.filter((_) => _.startsWith("binary_sensor.")),
    e,
    Vt(["_intelligent_dispatching"]),
    s
  );
  g && (a.dispatches_entity = g, r.push("dispatching")), Object.keys(a).length && (c.octopus = a);
  const y = A(
    n,
    e,
    ht("import", "demand", "current"),
    s
  );
  y && (c.power_import = y, r.push("import power"));
  const f = A(
    n,
    e,
    ht("export", "demand", "current"),
    s
  );
  f && (c.power_export = f, r.push("export power"));
  const m = A(
    n,
    e,
    vt("import", "accumulative", "consumption"),
    s
  );
  m && (c.daily_usage = m, r.push("daily import"));
  const b = A(
    n,
    e,
    vt("export", "accumulative"),
    s
  );
  return b && (c.daily_export = b, r.push("daily export")), { integration_type: "octopus", entity_types: { grid: c }, summary: r };
}
function ki(e, t, s) {
  const i = Object.values(t).filter(
    (f) => f.platform === "tesla_custom" && !f.disabled_by
  ), o = Object.keys(e).some(
    (f) => f.includes("powerwall") || f.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const n = i.length > 0 ? i.map((f) => f.entity_id) : Object.keys(e).filter((f) => f.includes("powerwall") || f.includes("tesla")), r = n.filter((f) => f.includes("powerwall")), a = n.filter((f) => !f.includes("powerwall")), c = ["Tesla"], d = {};
  if (r.length > 0) {
    const f = {}, m = A(
      r,
      e,
      Ns("battery", "soc", "charge", "percent"),
      s
    );
    m && (f.soc = m);
    const b = A(
      r,
      e,
      ht("battery", "power", "charge", "discharge"),
      s
    );
    b && (f.power_combined = b);
    const _ = A(
      r,
      e,
      vt("battery", "today", "daily", "charged"),
      s
    );
    _ && (f.daily_usage = _), Object.keys(f).length && (d.battery = f, c.push("Powerwall"));
  }
  const u = A(
    n,
    e,
    ht("solar"),
    s
  );
  if (u) {
    const f = { power_combined: u }, m = A(
      n,
      e,
      vt("solar"),
      s
    );
    m && (f.daily_usage = m), d.solar = f, c.push("solar");
  }
  const p = A(
    n,
    e,
    ht("load", "home", "house"),
    s
  );
  if (p) {
    const f = { power_combined: p }, m = A(
      n,
      e,
      vt("load", "home", "house"),
      s
    );
    m && (f.daily_usage = m), d.home = f, c.push("home load");
  }
  const g = A(
    n,
    e,
    ht("grid"),
    s
  );
  g && (d.grid = { power_combined: g }, c.push("grid"));
  const y = A(
    a,
    e,
    Ns("battery", "battery_level", "soc", "charge"),
    s
  );
  if (y) {
    const f = { soc: y }, m = A(
      a,
      e,
      ht("charg", "power"),
      s
    );
    m && (f.power_combined = m);
    const b = A(
      a,
      e,
      vt("charg", "energy"),
      s
    );
    b && (f.daily_usage = b), d.ev = f, c.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: c };
}
function Pi(e) {
  var c, d;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), n = ki(s, i, o), r = Ti(s, i, o), a = {
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
        power_combined: u.power_import || (d = a.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    r.tariff_entity && (a.tariff_entity = r.tariff_entity), a.summary.push(...r.summary ?? []);
  }
  return a;
}
function Mi(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = e.entity_types ?? {}, n = { ...o };
  for (const [r, a] of Object.entries(t.entity_types)) {
    const c = o[r] ?? {}, d = { ...c };
    for (const [u, p] of Object.entries(a))
      p !== void 0 && (s || !c[u]) && (d[u] = p);
    n[r] = d;
  }
  return i.entity_types = n, i;
}
const Jt = ["grid", "solar", "battery", "home", "ev"], Li = "custom_", Wt = 4;
function Hs(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function Oi(e) {
  return `${Li}${e + 1}`;
}
function Ft(e) {
  if (Array.isArray(e)) {
    const t = e.map((s) => typeof s == "string" ? s.trim() : "");
    return t.length ? t : void 0;
  }
  if (typeof e == "string" && e.trim()) return [e.trim()];
}
function Rs(e) {
  const t = Ft(e.import_power ?? e.power_import), s = Ft(e.export_power ?? e.power_export), i = Ft(e.combined_power ?? e.power_combined);
  return {
    ...e,
    power_import: void 0,
    power_export: void 0,
    power_combined: void 0,
    import_power: t,
    export_power: s,
    combined_power: i,
    daily_usage: Ft(e.daily_usage)
  };
}
function qt(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([r]) => Jt.includes(r)
    )
  ), i = Object.entries(t).filter(([r]) => !Jt.includes(r)).sort(([r], [a]) => Hs(r) - Hs(a)).map(([, r]) => Rs({ ...r })), o = Array.isArray(e.custom_types) ? e.custom_types.map((r) => Rs({ ...r })) : i, n = {
    ...s
  };
  return o.forEach((r, a) => {
    n[Oi(a)] = { ...r };
  }), {
    ...e,
    entity_types: n,
    custom_types: o
  };
}
var zi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, me = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ni(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && zi(t, s, o), o;
};
let Ht = class extends j {
  setConfig(e) {
    this.config = qt(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: qt(e) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _addCustomType() {
    var t, s, i;
    if ((((s = (t = this.config) == null ? void 0 : t.custom_types) == null ? void 0 : s.length) ?? 0) >= Wt) return;
    const e = [...((i = this.config) == null ? void 0 : i.custom_types) ?? [], {}];
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
  _multiEntityValue(e) {
    return Array.isArray(e) ? e : e ? [e] : [];
  }
  _customEntityValues(e, t) {
    const s = this._multiEntityValue(e[t]);
    return s.length ? s : [""];
  }
  _setCustomTypeEntityAt(e, t, s, i) {
    var r, a;
    const o = ((a = (r = this.config) == null ? void 0 : r.custom_types) == null ? void 0 : a[e]) ?? {}, n = [...this._customEntityValues(o, t)];
    n[s] = i ?? "", this._setCustomType(e, {
      [t]: n.map((c) => c.trim())
    });
  }
  _addCustomTypeEntity(e, t) {
    var n, r;
    const s = ((r = (n = this.config) == null ? void 0 : n.custom_types) == null ? void 0 : r[e]) ?? {}, o = [...[...this._customEntityValues(s, t)], ""];
    this._setCustomType(e, {
      [t]: o
    });
  }
  _deleteCustomTypeEntity(e, t, s) {
    var r, a;
    const i = ((a = (r = this.config) == null ? void 0 : r.custom_types) == null ? void 0 : a[e]) ?? {}, o = [...this._customEntityValues(i, t)];
    o.splice(s, 1);
    const n = o.map((c) => c.trim());
    this._setCustomType(e, {
      [t]: n.length ? n : void 0
    });
  }
  render() {
    var i, o, n, r, a, c, d, u, p, g, y, f, m, b, _, S, k, C, T, P, O, z, H, R, D, V, F, Ct, Q, Y, tt, et, st, it, ot, K, W, nt, St, $, M, I, B, mt, ve, be, we, $e, xe, Ee, Ce, Se, Ae, Te, ke, Pe, Me, Le, Oe, ze, Ne, He, Re, De, Ie, Ue, Ve, Fe, Be, je, Ge, Ke, We, qe, Ye, Ze, Xe, Je, Qe, ts, es, ss, is, os, ns, rs, as, cs, ls, hs, ds, us, ps, fs, ys, gs, ms, _s, vs, bs, ws, $s;
    if (!this.config) return v;
    const e = this.config.custom_types ?? [], t = e.slice(0, Wt), s = e.length >= Wt;
    return w`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: qt(
            Mi(this.config, Pi(this.hass), !1)
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
            .value=${((o = (i = this.config.entity_types) == null ? void 0 : i.grid) == null ? void 0 : o.power_import) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((r = (n = this.config.entity_types) == null ? void 0 : n.grid) == null ? void 0 : r.power_export) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((c = (a = this.config.entity_types) == null ? void 0 : a.grid) == null ? void 0 : c.power_combined) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((u = (d = this.config.entity_types) == null ? void 0 : d.grid) == null ? void 0 : u.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((g = (p = this.config.entity_types) == null ? void 0 : p.grid) == null ? void 0 : g.export_rate) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
              .checked=${((f = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : f.show_zero) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((b = (m = this.config.entity_types) == null ? void 0 : m.grid) == null ? void 0 : b.zero_tolerance) != null ? String((S = (_ = this.config.entity_types) == null ? void 0 : _.grid) == null ? void 0 : S.zero_tolerance) : ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
              .checked=${((C = (k = this.config.entity_types) == null ? void 0 : k.grid) == null ? void 0 : C.show_label) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((P = (T = this.config.entity_types) == null ? void 0 : T.grid) == null ? void 0 : P.label) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((R = (H = this.config.entity_types) == null ? void 0 : H.grid) == null ? void 0 : R.colour) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                grid: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.grid) ?? {},
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
            .value=${((V = (D = this.config.entity_types) == null ? void 0 : D.solar) == null ? void 0 : V.power_combined) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
            .value=${((Ct = (F = this.config.entity_types) == null ? void 0 : F.solar) == null ? void 0 : Ct.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
              .checked=${((Y = (Q = this.config.entity_types) == null ? void 0 : Q.solar) == null ? void 0 : Y.show_zero) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
            .value=${((et = (tt = this.config.entity_types) == null ? void 0 : tt.solar) == null ? void 0 : et.zero_tolerance) != null ? String((it = (st = this.config.entity_types) == null ? void 0 : st.solar) == null ? void 0 : it.zero_tolerance) : ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
              .checked=${((K = (ot = this.config.entity_types) == null ? void 0 : ot.solar) == null ? void 0 : K.show_label) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
            .value=${((nt = (W = this.config.entity_types) == null ? void 0 : W.solar) == null ? void 0 : nt.label) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
            .value=${(($ = (St = this.config.entity_types) == null ? void 0 : St.solar) == null ? void 0 : $.icon) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
            .value=${((I = (M = this.config.entity_types) == null ? void 0 : M.solar) == null ? void 0 : I.colour) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                solar: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.solar) ?? {},
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
            .value=${((mt = (B = this.config.entity_types) == null ? void 0 : B.battery) == null ? void 0 : mt.soc) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${((be = (ve = this.config.entity_types) == null ? void 0 : ve.battery) == null ? void 0 : be.power_combined) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${(($e = (we = this.config.entity_types) == null ? void 0 : we.battery) == null ? void 0 : $e.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
              .checked=${((Ee = (xe = this.config.entity_types) == null ? void 0 : xe.battery) == null ? void 0 : Ee.show_zero) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${((Se = (Ce = this.config.entity_types) == null ? void 0 : Ce.battery) == null ? void 0 : Se.zero_tolerance) != null ? String((Te = (Ae = this.config.entity_types) == null ? void 0 : Ae.battery) == null ? void 0 : Te.zero_tolerance) : ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
              .checked=${((Pe = (ke = this.config.entity_types) == null ? void 0 : ke.battery) == null ? void 0 : Pe.reverse_power_flow) ?? !1}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
              .checked=${((Le = (Me = this.config.entity_types) == null ? void 0 : Me.battery) == null ? void 0 : Le.show_label) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${((ze = (Oe = this.config.entity_types) == null ? void 0 : Oe.battery) == null ? void 0 : ze.label) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${((He = (Ne = this.config.entity_types) == null ? void 0 : Ne.battery) == null ? void 0 : He.icon) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${((De = (Re = this.config.entity_types) == null ? void 0 : Re.battery) == null ? void 0 : De.colour) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                battery: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.battery) ?? {},
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
            .value=${((Ue = (Ie = this.config.entity_types) == null ? void 0 : Ie.home) == null ? void 0 : Ue.power_combined) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
            .value=${((Fe = (Ve = this.config.entity_types) == null ? void 0 : Ve.home) == null ? void 0 : Fe.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
              .checked=${((je = (Be = this.config.entity_types) == null ? void 0 : Be.home) == null ? void 0 : je.show_zero) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
            .value=${((Ke = (Ge = this.config.entity_types) == null ? void 0 : Ge.home) == null ? void 0 : Ke.zero_tolerance) != null ? String((qe = (We = this.config.entity_types) == null ? void 0 : We.home) == null ? void 0 : qe.zero_tolerance) : ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
              .checked=${((Ze = (Ye = this.config.entity_types) == null ? void 0 : Ye.home) == null ? void 0 : Ze.show_label) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
            .value=${((Je = (Xe = this.config.entity_types) == null ? void 0 : Xe.home) == null ? void 0 : Je.label) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
            .value=${((ts = (Qe = this.config.entity_types) == null ? void 0 : Qe.home) == null ? void 0 : ts.icon) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
            .value=${((ss = (es = this.config.entity_types) == null ? void 0 : es.home) == null ? void 0 : ss.colour) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                home: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.home) ?? {},
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
            .value=${((os = (is = this.config.entity_types) == null ? void 0 : is.ev) == null ? void 0 : os.power_combined) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
            .value=${((rs = (ns = this.config.entity_types) == null ? void 0 : ns.ev) == null ? void 0 : rs.soc) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
            .value=${((cs = (as = this.config.entity_types) == null ? void 0 : as.ev) == null ? void 0 : cs.daily_usage) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
              .checked=${((hs = (ls = this.config.entity_types) == null ? void 0 : ls.ev) == null ? void 0 : hs.show_zero) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
            .value=${((us = (ds = this.config.entity_types) == null ? void 0 : ds.ev) == null ? void 0 : us.zero_tolerance) != null ? String((fs = (ps = this.config.entity_types) == null ? void 0 : ps.ev) == null ? void 0 : fs.zero_tolerance) : ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
              .checked=${((gs = (ys = this.config.entity_types) == null ? void 0 : ys.ev) == null ? void 0 : gs.show_label) ?? !0}
              @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
            .value=${((_s = (ms = this.config.entity_types) == null ? void 0 : ms.ev) == null ? void 0 : _s.label) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
            .value=${((bs = (vs = this.config.entity_types) == null ? void 0 : vs.ev) == null ? void 0 : bs.icon) ?? ""}
            @value-changed=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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
            .value=${(($s = (ws = this.config.entity_types) == null ? void 0 : ws.ev) == null ? void 0 : $s.colour) ?? ""}
            @change=${(h) => {
      var l;
      return this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: {
            config: {
              ...this.config,
              entity_types: {
                ...this.config.entity_types ?? {},
                ev: {
                  ...((l = this.config.entity_types) == null ? void 0 : l.ev) ?? {},
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

      <button
        class="action-button primary"
        type="button"
        ?disabled=${s}
        @click=${() => this._addCustomType()}
      >
        <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
        Add Custom Type
      </button>
      ${s ? w`<div class="helper-text">Maximum of 4 Custom types allowed</div>` : v}

      ${t.map((h, l) => {
      var xs;
      return w`
        <ha-expansion-panel header=${((xs = h.label) == null ? void 0 : xs.trim()) || `Custom ${l + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(l)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <div class="field-group">
              <div class="field-group-label">Import Power Entities</div>
              ${this._customEntityValues(h, "import_power").map((E, L) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Import Power Entity ${L + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${E}
                    @value-changed=${(rt) => this._setCustomTypeEntityAt(l, "import_power", L, rt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Import Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(l, "import_power", L)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(l, "import_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Export Power Entities</div>
              ${this._customEntityValues(h, "export_power").map((E, L) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Export Power Entity ${L + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${E}
                    @value-changed=${(rt) => this._setCustomTypeEntityAt(l, "export_power", L, rt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Export Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(l, "export_power", L)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(l, "export_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Combined Power Entities</div>
              ${this._customEntityValues(h, "combined_power").map((E, L) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Combined Power Entity ${L + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${E}
                    @value-changed=${(rt) => this._setCustomTypeEntityAt(l, "combined_power", L, rt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Combined Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(l, "combined_power", L)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(l, "combined_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Daily Usage Entities</div>
              ${this._customEntityValues(h, "daily_usage").map((E, L) => w`
                <div class="entity-row">
                  <ha-selector
                    label=${`Daily Usage Entity ${L + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${E}
                    @value-changed=${(rt) => this._setCustomTypeEntityAt(l, "daily_usage", L, rt.detail.value || void 0)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Daily Usage Entity"
                    @click=${() => this._deleteCustomTypeEntity(l, "daily_usage", L)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(l, "daily_usage")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <ha-selector
              label="State of Charge Entity"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${h.soc ?? ""}
              @value-changed=${(E) => this._setCustomType(l, { soc: E.detail.value || void 0 })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${h.show_zero ?? !0}
                @change=${(E) => this._setCustomType(l, {
        show_zero: E.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${h.zero_tolerance != null ? String(h.zero_tolerance) : ""}
              @change=${(E) => this._setCustomType(l, {
        zero_tolerance: E.target.value !== "" ? Number(E.target.value) : void 0
      })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Subtract from Home</span>
              <ha-switch
                .checked=${h.subtract_from_home ?? !1}
                @change=${(E) => this._setCustomType(l, {
        subtract_from_home: E.target.checked
      })}
              ></ha-switch>
            </div>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${h.show_label ?? !0}
                @change=${(E) => this._setCustomType(l, {
        show_label: E.target.checked
      })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${h.label ?? ""}
              @change=${(E) => this._setCustomType(l, {
        label: E.target.value || void 0
      })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${h.icon ?? ""}
              @value-changed=${(E) => this._setCustomType(l, {
        icon: E.detail.value || void 0
      })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${h.colour ?? ""}
              @change=${(E) => this._setCustomType(l, {
        colour: E.target.value || void 0
      })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `;
    })}
    `;
  }
};
Ht.styles = $t`
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

    .helper-text {
      font-size: 0.84em;
      line-height: 1.35;
      color: var(--secondary-text-color);
      padding: 0 2px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0 2px;
    }

    .field-group-label {
      font-size: 0.92em;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 0 2px;
    }

    .entity-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px;
      align-items: end;
    }

    .icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid color-mix(in srgb, var(--divider-color, #d0d0d0) 80%, transparent);
      background: var(--card-background-color, #fff);
      color: var(--secondary-text-color);
      cursor: pointer;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .icon-button.delete {
      color: var(--error-color);
      border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
    }

    .inline-action {
      width: auto;
      align-self: flex-start;
      padding: 0 12px;
      min-height: 36px;
      font-weight: 500;
    }
  `;
me([
  x({ attribute: !1 })
], Ht.prototype, "hass", 2);
me([
  x({ attribute: !1 })
], Ht.prototype, "config", 2);
Ht = me([
  Et("home-energy-card-editor")
], Ht);
var Hi = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, It = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ri(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Hi(t, s, o), o;
};
function Bt(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function jt(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function Di(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let yt = class extends j {
  constructor() {
    super(...arguments), this.showTitle = !0, this.showValues = !0;
  }
  render() {
    var _, S, k, C, T, P, O, z, H, R, D;
    if (!this.config) return v;
    const e = ((_ = this.hass) == null ? void 0 : _.states) ?? {}, t = this.config.entity_types ?? {}, s = ((S = this.config.display) == null ? void 0 : S.decimal_places) ?? 1, i = this.config.tariff_entity ? (k = e[this.config.tariff_entity]) == null ? void 0 : k.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Di(i) : null, n = Bt(e, (C = t.solar) == null ? void 0 : C.daily_usage), r = Bt(e, (T = t.home) == null ? void 0 : T.daily_usage), a = Bt(e, (P = t.grid) == null ? void 0 : P.daily_usage), c = Bt(e, (O = t.grid) == null ? void 0 : O.daily_export), d = !!((z = t.solar) != null && z.daily_usage), u = !!((H = t.home) != null && H.daily_usage), p = !!((R = t.grid) != null && R.daily_usage), g = !!((D = t.grid) != null && D.daily_export), y = p || g, f = d || u || y, m = this.showValues && f, b = this.showTitle || o;
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
                <span class="stat-val">${jt(n, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${u ? w`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${jt(r, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${y ? w`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${p ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${jt(a, s)}</span>
                    </div>
                  ` : v}
                  ${g ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${jt(c, s)}</span>
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
yt.styles = $t`
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
It([
  x({ attribute: !1 })
], yt.prototype, "hass", 2);
It([
  x({ attribute: !1 })
], yt.prototype, "config", 2);
It([
  x({ type: Boolean })
], yt.prototype, "showTitle", 2);
It([
  x({ type: Boolean })
], yt.prototype, "showValues", 2);
yt = It([
  Et("hec-card-header")
], yt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ii = { CHILD: 2 }, Ui = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Vi = class {
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
const { I: Fi } = Ei, Ds = (e) => e, Is = () => document.createComment(""), Tt = (e, t, s) => {
  var n;
  const i = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const r = i.insertBefore(Is(), o), a = i.insertBefore(Is(), o);
    s = new Fi(r, a, e, e.options);
  } else {
    const r = s._$AB.nextSibling, a = s._$AM, c = a !== e;
    if (c) {
      let d;
      (n = s._$AQ) == null || n.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== a._$AU && s._$AP(d);
    }
    if (r !== o || c) {
      let d = s._$AA;
      for (; d !== r; ) {
        const u = Ds(d).nextSibling;
        Ds(i).insertBefore(d, o), d = u;
      }
    }
  }
  return s;
}, ct = (e, t, s = e) => (e._$AI(t, s), e), Bi = {}, ji = (e, t = Bi) => e._$AH = t, Gi = (e) => e._$AH, ne = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Us = (e, t, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = t; o <= s; o++) i.set(e[o], o);
  return i;
}, Vs = Ui(class extends Vi {
  constructor(e) {
    if (super(e), e.type !== Ii.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const o = Gi(e), { values: n, keys: r } = this.dt(t, s, i);
    if (!Array.isArray(o)) return this.ut = r, n;
    const a = this.ut ?? (this.ut = []), c = [];
    let d, u, p = 0, g = o.length - 1, y = 0, f = n.length - 1;
    for (; p <= g && y <= f; ) if (o[p] === null) p++;
    else if (o[g] === null) g--;
    else if (a[p] === r[y]) c[y] = ct(o[p], n[y]), p++, y++;
    else if (a[g] === r[f]) c[f] = ct(o[g], n[f]), g--, f--;
    else if (a[p] === r[f]) c[f] = ct(o[p], n[f]), Tt(e, c[f + 1], o[p]), p++, f--;
    else if (a[g] === r[y]) c[y] = ct(o[g], n[y]), Tt(e, o[p], o[g]), g--, y++;
    else if (d === void 0 && (d = Us(r, y, f), u = Us(a, p, g)), d.has(a[p])) if (d.has(a[g])) {
      const m = u.get(r[y]), b = m !== void 0 ? o[m] : null;
      if (b === null) {
        const _ = Tt(e, o[p]);
        ct(_, n[y]), c[y] = _;
      } else c[y] = ct(b, n[y]), Tt(e, o[p], b), o[m] = null;
      y++;
    } else ne(o[g]), g--;
    else ne(o[p]), p++;
    for (; y <= f; ) {
      const m = Tt(e, c[f + 1]);
      ct(m, n[y]), c[y++] = m;
    }
    for (; p <= g; ) {
      const m = o[p++];
      m !== null && ne(m);
    }
    return this.ut = r, ji(e, c), ft;
  }
});
var Ki = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, U = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Wi(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Ki(t, s, o), o;
};
const qi = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Yi = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, ce = 38, Fs = +(2 * Math.PI * ce).toFixed(4);
function Yt(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
function Bs(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
let N = class extends j {
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
    const e = qi[this.type] ?? Yi, t = this.colour || e.accent, s = this.icon || e.icon, i = this.soc !== null, o = this.type === "grid" || this.type === "battery", n = o && this.power !== null ? Math.abs(this.power) : this.power, r = o && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-left-bold-circle" : this.power < 0 ? "mdi:arrow-right-bold-circle" : "" : "", a = i ? Math.max(0, Math.min(100, this.soc)) : 0, c = +(Fs * (1 - a / 100)).toFixed(4);
    return w`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${i ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${ce}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${ce}"
            style="stroke-dasharray:${Fs};stroke-dashoffset:${c};"
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
          <span class="power">${Yt(n, this.unit, this.decimalPlaces)}</span>
          ${r ? w`<ha-icon class="direction-icon" .icon=${r}></ha-icon>` : this.bottomText ? w`<span class="bottom-text">${this.bottomText}</span>` : v}
        </div>

      </div>
    `;
  }
};
N.styles = $t`
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
U([
  x()
], N.prototype, "type", 2);
U([
  x()
], N.prototype, "label", 2);
U([
  x({ type: Boolean })
], N.prototype, "showLabel", 2);
U([
  x()
], N.prototype, "icon", 2);
U([
  x()
], N.prototype, "bottomText", 2);
U([
  x()
], N.prototype, "colour", 2);
U([
  x({ type: Number })
], N.prototype, "power", 2);
U([
  x({ type: Number })
], N.prototype, "soc", 2);
U([
  x()
], N.prototype, "unit", 2);
U([
  x({ type: Number })
], N.prototype, "decimalPlaces", 2);
N = U([
  Et("hec-energy-node")
], N);
function le(e, t, s = 0) {
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
function Lt(e) {
  return Array.isArray(e) ? e.filter(Boolean) : typeof e == "string" && e ? [e] : [];
}
function oi(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function re(e, t) {
  var n;
  const s = Lt(t);
  if (!s.length) return null;
  let i = 0, o = 0;
  for (const r of s) {
    const a = e[r];
    if (!a || a.state === "unavailable" || a.state === "unknown") continue;
    const c = parseFloat(a.state);
    isNaN(c) || (i += oi(
      c,
      (n = a.attributes) == null ? void 0 : n.unit_of_measurement
    ), o += 1);
  }
  return o ? i : null;
}
function ni(e, t) {
  var n;
  const s = Lt(t);
  if (!s.length) return null;
  let i = 0, o = 0;
  for (const r of s) {
    const a = e[r];
    if (!a || a.state === "unavailable" || a.state === "unknown") continue;
    const c = parseFloat(a.state);
    if (isNaN(c)) continue;
    const d = (n = a.attributes) == null ? void 0 : n.unit_of_measurement;
    i += d === "Wh" ? c / 1e3 : c, o += 1;
  }
  return o ? i : null;
}
function ri(e, t, s) {
  let i;
  const o = t.combined_power ?? t.power_combined, n = t.import_power ?? t.power_import, r = t.export_power ?? t.power_export;
  if (o)
    i = re(s, o);
  else {
    const a = !!n, c = !!r;
    if (!a && !c) return null;
    const d = a ? re(s, n) : null, u = c ? re(s, r) : null;
    if ((!a || d === null) && (!c || u === null)) return null;
    i = (d ?? 0) - (u ?? 0);
  }
  return e === "battery" && t.reverse_power_flow && (i *= -1), i;
}
function bt(e, t, s) {
  return le(
    e,
    ri(e, t, s),
    t.zero_tolerance ?? 0
  );
}
var Zi = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, J = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Xi(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Zi(t, s, o), o;
};
const Ji = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Qi = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, to = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function eo(e, t) {
  const s = Date.now(), i = s - 864e5, o = Array(24).fill(null);
  if (!e.length) return o;
  for (let n = 0; n < 24; n++) {
    const r = i + n * 36e5, a = r + 36e5;
    let c = 0, d = 0;
    for (let u = 0; u < e.length; u++) {
      const p = new Date(e[u].last_changed).getTime(), g = u + 1 < e.length ? new Date(e[u + 1].last_changed).getTime() : s, y = Math.max(p, r), f = Math.min(g, a);
      if (f <= y) continue;
      const m = parseFloat(e[u].state);
      if (isNaN(m)) continue;
      const b = oi(m, t), _ = f - y;
      c += Math.abs(b) * _, d += _;
    }
    d > 0 && (o[n] = c / d);
  }
  return o;
}
function so(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function Gt(e, t) {
  return ni(e, t);
}
function js(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
function io(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  if (isNaN(i)) return null;
  const o = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  return o.includes("pence") || o.startsWith("p/") || o === "p" ? i / 100 : i;
}
function ae(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function oo(e) {
  if (!e.length) return [];
  const t = Math.max(...e.map((i) => i.length), 0), s = Array(t).fill(null);
  for (let i = 0; i < t; i++) {
    let o = 0, n = 0;
    for (const r of e) {
      const a = r[i];
      a != null && (o += a, n += 1);
    }
    s[i] = n ? o : null;
  }
  return s;
}
function no(e, t = []) {
  const s = Math.max(
    ...[...e, ...t].map((o) => o.length),
    0
  ), i = Array(s).fill(null);
  for (let o = 0; o < s; o++) {
    let n = 0, r = 0;
    for (const a of e) {
      const c = a[o];
      c != null && (n += c, r += 1);
    }
    for (const a of t) {
      const c = a[o];
      c != null && (n -= c, r += 1);
    }
    i[o] = r ? n : null;
  }
  return i;
}
function Qt(e, t) {
  const s = typeof e == "number" ? e : parseFloat(String(e));
  if (isNaN(s)) return null;
  const i = String(t ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? s / 100 : (i.includes("gbp") || i.includes("£"), s);
}
function Gs(e) {
  if (!e) return [];
  const t = e.attributes.unit_of_measurement;
  return (e.attributes.rates ?? e.attributes.current_day_rates ?? e.attributes.today_rates ?? e.attributes.upcoming_interval_rates ?? []).map((i) => {
    const o = new Date(i.start ?? i.start_time ?? "").getTime(), n = new Date(i.end ?? i.end_time ?? "").getTime(), r = Qt(
      i.value_inc_vat ?? i.rate_inc_vat ?? i.value ?? i.rate,
      i.unit_of_measurement ?? t
    );
    return !Number.isFinite(o) || !Number.isFinite(n) || !r ? null : { startMs: o, endMs: n, rateGbpPerKwh: r };
  }).filter((i) => i !== null).sort((i, o) => i.startMs - o.startMs);
}
function Ks(e, t, s) {
  if (!e.length) return [];
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const n = new Date(e[o].last_changed).getTime(), r = o + 1 < e.length ? new Date(e[o + 1].last_changed).getTime() : s, a = Qt(e[o].state, t);
    !Number.isFinite(n) || !Number.isFinite(r) || r <= n || a !== null && i.push({ startMs: n, endMs: r, rateGbpPerKwh: a });
  }
  return i;
}
function ro(e, t) {
  const s = t == null ? void 0 : t.attributes.unit_of_measurement, i = e.map((o) => Qt(o.state, s)).filter((o) => o !== null);
  if (i.length > 0) {
    const o = i[0];
    return i.every((n) => Math.abs(n - o) < 1e-9) ? o : null;
  }
  return t ? Qt(t.state, s) : null;
}
function ao(e, t) {
  return String(t ?? "").trim().toLowerCase() === "wh" ? e / 1e3 : e;
}
function Ws(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  const i = [];
  let o = !1;
  for (let n = 1; n < e.length; n++) {
    const r = new Date(e[n - 1].last_changed).getTime(), a = new Date(e[n].last_changed).getTime();
    if (!Number.isFinite(r) || !Number.isFinite(a) || a <= r) continue;
    const c = parseFloat(e[n - 1].state), d = parseFloat(e[n].state);
    if (isNaN(c) || isNaN(d)) continue;
    const u = ao(d - c, t);
    if (u <= 0) continue;
    const p = a - r, g = [];
    let y = 0;
    for (const f of s) {
      const m = Math.max(r, f.startMs), b = Math.min(a, f.endMs);
      if (b <= m) continue;
      const _ = b - m;
      y += _, g.push({
        startMs: m,
        endMs: b,
        overlapMs: _,
        rateGbpPerKwh: f.rateGbpPerKwh
      });
    }
    if (y > 0) {
      y < p && (o = !0);
      for (const f of g) {
        const m = u * (f.overlapMs / y);
        i.push({
          startMs: f.startMs,
          endMs: f.endMs,
          energyKwh: m,
          energyUnit: "kWh",
          tariffGbpPerKwh: f.rateGbpPerKwh,
          costGbp: m * f.rateGbpPerKwh
        });
      }
    } else p > 0 && (o = !0);
  }
  return i.length ? { intervals: i, hasCoverageGap: o } : null;
}
function qs(e) {
  return !(e != null && e.intervals.length) || e.hasCoverageGap ? null : e.intervals.reduce(
    (t, s) => t + s.costGbp,
    0
  );
}
function co(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function Ys(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function lo(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function ho(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
const lt = 50;
let G = class extends j {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1, this._gridMoney = null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && (this._loadHistory(), this.nodeType === "grid" ? this._loadGridMoney() : this._gridMoney = null);
  }
  async _loadHistory() {
    var o, n;
    const e = (n = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : n[this.nodeType], t = Lt((e == null ? void 0 : e.combined_power) ?? (e == null ? void 0 : e.power_combined)), s = Lt((e == null ? void 0 : e.import_power) ?? (e == null ? void 0 : e.power_import)), i = Lt((e == null ? void 0 : e.export_power) ?? (e == null ? void 0 : e.power_export));
    if (!(!this.hass || !t.length && !s.length && !i.length)) {
      this._loading = !0, this._hourly = [];
      try {
        const r = /* @__PURE__ */ new Date(), a = new Date(r.getTime() - 864e5), c = async (d) => Promise.all(
          d.map(async (u) => {
            var f, m;
            const p = `history/period/${a.toISOString()}?filter_entity_id=${u}&minimal_response=true&no_attributes=true&end_time=${r.toISOString()}`, g = await this.hass.callApi("GET", p), y = (m = (f = this.hass.states) == null ? void 0 : f[u]) == null ? void 0 : m.attributes.unit_of_measurement;
            return eo((g == null ? void 0 : g[0]) ?? [], y);
          })
        );
        if (t.length) {
          const d = await c(t);
          this._hourly = oo(d);
        } else {
          const [d, u] = await Promise.all([
            c(s),
            c(i)
          ]);
          this._hourly = no(d, u);
        }
      } catch (r) {
        console.warn("[hec-node-detail] history fetch failed", r), this._hourly = [];
      } finally {
        this._loading = !1;
      }
    }
  }
  async _loadGridMoney() {
    var c, d, u, p, g, y, f, m, b, _, S, k;
    const e = (d = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : d.grid, t = e == null ? void 0 : e.octopus;
    if (!this.hass || !e || !t) {
      this._gridMoney = null;
      return;
    }
    const s = Gs(
      t.slots_entity ? (u = this.hass.states) == null ? void 0 : u[t.slots_entity] : void 0
    ), i = e.export_rate ? (p = this.hass.states) == null ? void 0 : p[e.export_rate] : void 0, o = Gs(
      i
    ), n = /* @__PURE__ */ new Date();
    n.setHours(0, 0, 0, 0);
    const r = /* @__PURE__ */ new Date(), a = async (C) => {
      if (!C || !this.hass) return [];
      const T = `history/period/${n.toISOString()}?filter_entity_id=${C}&minimal_response=true&no_attributes=true&end_time=${r.toISOString()}`, P = await this.hass.callApi("GET", T);
      return (P == null ? void 0 : P[0]) ?? [];
    };
    try {
      const [C, T, P, O] = await Promise.all([
        a(e.daily_usage),
        a(e.daily_export),
        a(t.rate_entity),
        a(e.export_rate)
      ]), z = e.daily_usage ? (y = (g = this.hass.states) == null ? void 0 : g[e.daily_usage]) == null ? void 0 : y.attributes.unit_of_measurement : void 0, H = e.daily_export ? (m = (f = this.hass.states) == null ? void 0 : f[e.daily_export]) == null ? void 0 : m.attributes.unit_of_measurement : void 0, R = t.rate_entity ? (_ = (b = this.hass.states) == null ? void 0 : b[t.rate_entity]) == null ? void 0 : _.attributes.unit_of_measurement : void 0, D = e.export_rate ? (k = (S = this.hass.states) == null ? void 0 : S[e.export_rate]) == null ? void 0 : k.attributes.unit_of_measurement : void 0, V = s.length ? s : Ks(P, R, r.getTime()), F = o.length ? o : Ks(O, D, r.getTime()), Ct = Gt(this.hass.states, e.daily_usage), Q = Gt(this.hass.states, e.daily_export), Y = ro(O, i), tt = Ws(
        C,
        z,
        V
      ), et = qs(
        tt
      ), st = Ws(
        T,
        H,
        F
      ), it = qs(
        st
      ), ot = io(this.hass.states, t.cost_entity), K = et ?? ot, W = it ?? (Q !== null && Y !== null ? Q * Y : null), nt = K !== null && W !== null ? K - W : null;
      this._gridMoney = {
        importCostToday: K,
        exportPaymentToday: W,
        netCost: nt
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
        <div class="power-big">${Yt(e.power, s, t)}</div>
        ${i ? w`<div class="power-sub">${i}</div>` : v}
      </div>
    `;
  }
  _powerSubtitle(e, t, s) {
    var O, z, H, R, D, V, F;
    const i = ((O = to[this.nodeType]) == null ? void 0 : O[e.direction]) ?? "";
    if (this.nodeType !== "grid" || e.direction !== "from-home" || !this.hass) return i;
    const o = this.hass.states, n = ((H = (z = this.config) == null ? void 0 : z.entity_types) == null ? void 0 : H.solar) ?? {}, r = ((D = (R = this.config) == null ? void 0 : R.entity_types) == null ? void 0 : D.home) ?? {}, a = ((F = (V = this.config) == null ? void 0 : V.entity_types) == null ? void 0 : F.battery) ?? {}, c = bt("solar", n, o), d = bt("home", r, o), u = bt("battery", a, o), p = e.magnitude ?? 0;
    if (p <= 0) return i;
    const g = c.direction === "to-home" ? c.magnitude ?? 0 : 0, y = Math.max(d.power ?? 0, 0), f = u.direction === "to-home" ? u.magnitude ?? 0 : 0, m = Math.max(g - y, 0), b = Math.min(p, m), _ = Math.min(
      Math.max(p - b, 0),
      f
    ), S = b + _;
    if (Math.max(p - S, 0) > Math.max(lt, p * 0.1))
      return i;
    const C = b > lt && _ <= lt, T = _ > lt && b <= lt, P = b > lt && _ > lt;
    return C ? "Exporting solely from excess solar production" : T ? "Exporting solely from the battery" : P ? `Exporting ${Yt(b, t, s)} from excess solar production and ${Yt(_, t, s)} from the battery` : i;
  }
  _sectionSoc(e) {
    if (e === null) return v;
    const t = ho(e);
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
    var r, a, c;
    const t = ((r = this.hass) == null ? void 0 : r.states) ?? {}, s = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", n = [];
    return e.daily_usage && n.push([i, js(Gt(t, e.daily_usage), s)]), e.daily_export && n.push([o, js(Gt(t, e.daily_export), s)]), n.length ? w`
      <div class="section">
        <div class="s-title">Today</div>
        ${n.map(([d, u]) => w`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${u}</span>
          </div>
        `)}
      </div>
    ` : v;
  }
  _sectionOctopus(e) {
    var y, f, m, b;
    const t = ((y = this.hass) == null ? void 0 : y.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.slots_entity ? t[e.slots_entity] : null, o = s == null ? void 0 : s.state, n = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", r = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], a = Date.now(), c = r.filter((_) => new Date(_.end ?? _.end_time ?? 0).getTime() > a).slice(0, 6), d = o && o !== "unavailable" && o !== "unknown", u = ((f = this._gridMoney) == null ? void 0 : f.importCostToday) ?? null, p = ((m = this._gridMoney) == null ? void 0 : m.exportPaymentToday) ?? null, g = ((b = this._gridMoney) == null ? void 0 : b.netCost) ?? null;
    return !d && !c.length && u === null && p === null && g === null ? v : w`
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
          <span class="kv-v">${ae(u)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${ae(p)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${ae(g)}</span>
        </div>

        ${c.length ? w`
          <div class="s-subtitle">Upcoming slots</div>
          ${c.map((_) => {
      const S = _.start ?? _.start_time ?? "", k = _.end ?? _.end_time ?? "", C = _.value_inc_vat ?? _.rate_inc_vat ?? _.value ?? 0, T = lo(C);
      return w`
              <div class="slot">
                <span class="slot-dot" style="background:${T};"></span>
                <span class="slot-time">${Ys(S)}–${Ys(k)}</span>
                <span class="slot-rate" style="color:${T};">${(+C).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : v}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((n) => n !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (n) => co(new Date(i.getTime() - n * 36e5));
    return this._loading ? w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? w`<div class="chart-msg">No data</div>` : w`
              ${Mt`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((n, r) => {
      if (n === null || n <= 0) return Mt``;
      const a = Math.max(2, n / s * 48);
      return Mt`
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
    var c, d, u;
    if (!this.open || !this.nodeType) return v;
    const e = ((d = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((u = this.hass) == null ? void 0 : u.states) ?? {}, s = e.colour || (Qi[this.nodeType] ?? "#9e9e9e"), i = e.icon || Ji[this.nodeType] || "mdi:lightning-bolt", o = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), n = bt(this.nodeType, e, t), r = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !Jt.includes(this.nodeType)), a = r ? so(t, e.soc) : null;
    return w`
      <div
        class="overlay"
        @click=${(p) => p.target === p.currentTarget && this._close()}
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
G.styles = $t`
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
], G.prototype, "hass", 2);
J([
  x({ attribute: !1 })
], G.prototype, "config", 2);
J([
  x()
], G.prototype, "nodeType", 2);
J([
  x({ type: Boolean })
], G.prototype, "open", 2);
J([
  Dt()
], G.prototype, "_hourly", 2);
J([
  Dt()
], G.prototype, "_loading", 2);
J([
  Dt()
], G.prototype, "_gridMoney", 2);
G = J([
  Et("hec-node-detail")
], G);
var uo = Object.defineProperty, po = Object.getOwnPropertyDescriptor, Ut = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? po(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && uo(t, s, o), o;
};
function fo(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const q = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
}, Zs = 75, yo = /* @__PURE__ */ new Set([
  "solar-battery",
  "solar-ev",
  "solar-grid"
]);
let gt = class extends j {
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
      return bt(e, t, s);
    const i = ri("home", t, s);
    if (i === null) return le("home", null, t.zero_tolerance ?? 0);
    const o = this._customTypes().reduce((c, d) => {
      var g, y;
      const u = ((y = (g = this.config) == null ? void 0 : g.entity_types) == null ? void 0 : y[d]) ?? {};
      if (!u.subtract_from_home) return c;
      const p = bt(d, u, s);
      return c + (p.power ?? 0);
    }, 0);
    return le(
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
    var t, s, i, o;
    return ni(
      ((t = this.hass) == null ? void 0 : t.states) ?? {},
      (o = (i = (s = this.config) == null ? void 0 : s.entity_types) == null ? void 0 : i[e]) == null ? void 0 : o.daily_usage
    );
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
      const c = r.getBoundingClientRect();
      s[a] = {
        x: c.left - t.left + c.width / 2,
        y: c.top - t.top + c.height / 2
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
    var n, r, a, c, d, u, p;
    const t = ((r = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : r.dynamic_animation_speed) ?? !1, s = ((c = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : c.animation) !== !1, i = this._flowInfo(e), o = this._smoothedMagnitudes[e] ?? i.magnitude;
    return {
      color: q[e] ?? ((p = (u = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : u[e]) == null ? void 0 : p.colour) ?? "#9e9e9e",
      dur: fo(o, t && i.direction !== "idle"),
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
    var Y, tt, et, st, it, ot, K, W, nt, St;
    const e = this._lineLayout.centers, t = e.home, s = e.solar;
    if (!t || !this._lineLayout.width || !this._lineLayout.height) return v;
    const i = [], o = [], n = ($, M, I, B, mt) => {
      yo.has($) || !e[M] || !e[I] || o.push({
        key: `idle-${$}`,
        pathKey: $,
        from: M,
        to: I,
        type: B,
        color: mt
      });
    }, r = this._flowInfo("solar"), a = this._flowInfo("home"), c = this._flowInfo("battery"), d = this._flowInfo("ev"), u = this._flowInfo("grid"), p = s && r.direction === "to-home" ? r.magnitude ?? 0 : 0, g = Math.max(a.power ?? 0, 0), y = c.direction === "from-home" ? c.magnitude ?? 0 : 0, f = c.direction === "to-home" ? c.magnitude ?? 0 : 0, m = d.direction === "from-home" ? d.magnitude ?? 0 : 0, b = u.direction === "from-home" ? u.magnitude ?? 0 : 0, _ = Math.min(p, g);
    let S = Math.max(p - _, 0);
    const k = Math.min(S, y);
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
      color: q.solar,
      magnitude: _
    }), s && k > 0 && e.battery && i.push({
      key: "solar-battery",
      pathKey: "solar-battery",
      from: "solar",
      to: "battery",
      type: "solar",
      color: q.solar,
      magnitude: k
    }), s && C > 0 && e.ev && i.push({
      key: "solar-ev",
      pathKey: "solar-ev",
      from: "solar",
      to: "ev",
      type: "solar",
      color: q.solar,
      magnitude: C
    }), s && T > 0 && e.grid && i.push({
      key: "solar-grid",
      pathKey: "solar-grid",
      from: "solar",
      to: "grid",
      type: "solar",
      color: q.solar,
      magnitude: T
    });
    const P = Math.max(y - k, 0), O = Math.max(m - C, 0), z = Math.max(b - T, 0), H = Math.max(g - _, 0), R = Math.min(f, H), D = Math.max(f - R, 0), V = Math.min(z, D), F = z <= Zs || V <= Zs ? 0 : V;
    u.direction === "to-home" && (u.magnitude ?? 0) > 0 && e.grid && i.push({
      key: "grid-home",
      pathKey: "home-grid",
      from: "grid",
      to: "home",
      type: "grid",
      color: ((Y = this._lineVisualState.grid) == null ? void 0 : Y.color) ?? this._computeLineVisualState("grid").color,
      magnitude: u.magnitude ?? 0
    }), F > 0 && e.grid && i.push({
      key: "home-grid",
      pathKey: "home-grid",
      from: "home",
      to: "grid",
      type: "battery",
      color: ((tt = this._lineVisualState.battery) == null ? void 0 : tt.color) ?? this._computeLineVisualState("battery").color,
      magnitude: F
    }), c.direction === "to-home" && (c.magnitude ?? 0) > 0 && e.battery && i.push({
      key: "battery-home",
      pathKey: "home-battery",
      from: "battery",
      to: "home",
      type: "battery",
      color: ((et = this._lineVisualState.battery) == null ? void 0 : et.color) ?? this._computeLineVisualState("battery").color,
      magnitude: c.magnitude ?? 0
    }), P > 0 && e.battery && i.push({
      key: "home-battery",
      pathKey: "home-battery",
      from: "home",
      to: "battery",
      type: "battery",
      color: ((st = this._lineVisualState.battery) == null ? void 0 : st.color) ?? this._computeLineVisualState("battery").color,
      magnitude: P
    }), d.direction === "to-home" && (d.magnitude ?? 0) > 0 && e.ev && i.push({
      key: "ev-home",
      pathKey: "home-ev",
      from: "ev",
      to: "home",
      type: "ev",
      color: ((it = this._lineVisualState.ev) == null ? void 0 : it.color) ?? this._computeLineVisualState("ev").color,
      magnitude: d.magnitude ?? 0
    }), O > 0 && e.ev && i.push({
      key: "home-ev",
      pathKey: "home-ev",
      from: "home",
      to: "ev",
      type: "ev",
      color: ((ot = this._lineVisualState.ev) == null ? void 0 : ot.color) ?? this._computeLineVisualState("ev").color,
      magnitude: O
    });
    for (const $ of this._customTypes()) {
      const M = this._flowInfo($), I = e[$], B = ((K = this._lineVisualState[$]) == null ? void 0 : K.color) ?? this._computeLineVisualState($).color;
      I && n(`home-${$}`, "home", $, $, B), !(!I || !M.magnitude || M.direction === "idle") && i.push({
        key: `custom-${$}`,
        pathKey: `home-${$}`,
        from: M.direction === "to-home" ? $ : "home",
        to: M.direction === "to-home" ? "home" : $,
        type: $,
        color: B,
        magnitude: M.magnitude
      });
    }
    s && (n("solar-home", "solar", "home", "solar", q.solar), e.battery && n("solar-battery", "solar", "battery", "solar", q.solar), e.ev && n("solar-ev", "solar", "ev", "solar", q.solar), e.grid && n("solar-grid", "solar", "grid", "solar", q.solar)), e.grid && n(
      "home-grid",
      "home",
      "grid",
      "grid",
      ((W = this._lineVisualState.grid) == null ? void 0 : W.color) ?? this._computeLineVisualState("grid").color
    ), e.battery && n(
      "home-battery",
      "home",
      "battery",
      "battery",
      ((nt = this._lineVisualState.battery) == null ? void 0 : nt.color) ?? this._computeLineVisualState("battery").color
    ), e.ev && n(
      "home-ev",
      "home",
      "ev",
      "ev",
      ((St = this._lineVisualState.ev) == null ? void 0 : St.color) ?? this._computeLineVisualState("ev").color
    );
    const Ct = new Set(i.map(($) => $.pathKey)), Q = [
      ...o.filter(($) => !Ct.has($.pathKey)),
      ...i
    ];
    return Mt`
      ${Vs(
      Q,
      ($) => $.key,
      ($) => {
        const M = e[$.from], I = e[$.to];
        if (!M || !I) return v;
        const B = this._lineVisualState[$.type] ?? this._computeLineVisualState($.type), mt = [
          "flow-line",
          "magnitude" in $ ? "" : "idle",
          B.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return Mt`
            <line
              x1="${M.x}" y1="${M.y}" x2="${I.x}" y2="${I.y}"
              stroke="${$.color}"
              class="${mt}"
              style="--flow-dur:${B.dur}"
              pathLength="100"
            />
          `;
      }
    )}
    `;
  }
  // ── Node render ───────────────────────────────────────────────────────────
  _node(e, t, s = !1) {
    var c, d, u;
    const i = e === "home" ? !0 : this._isVisible(e), o = ((d = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : d[e]) ?? {}, n = ((u = this.config) == null ? void 0 : u.display) ?? {}, r = this._flowInfo(e), a = e === "solar" ? Bs(this._dailyKwh(e), n.decimal_places ?? 1) : "";
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
      (t) => !Jt.includes(t)
    ).slice(0, Wt);
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
    var c, d, u;
    const i = this._isVisible(e), o = ((d = (c = this.config) == null ? void 0 : c.entity_types) == null ? void 0 : d[e]) ?? {}, n = ((u = this.config) == null ? void 0 : u.display) ?? {}, r = this._flowInfo(e), a = Bs(
      this._dailyKwh(e),
      n.decimal_places ?? 1
    );
    return w`
      <hec-energy-node
        data-node-type=${e}
        style="grid-column:${t}; grid-row:${s}"
        class="${[
      i ? "" : "hidden",
      e === "custom_1" || e === "custom_3" ? "slot-custom-inset-right" : "",
      e === "custom_4" ? "slot-custom-inset-left" : ""
    ].filter(Boolean).join(" ")}"
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
    const e = this._customTypes().filter((t) => this._isVisible(t));
    return w`
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
        ${Vs(e, (t) => t, (t, s) => {
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
gt.styles = $t`
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
    .slot-ev      {
      grid-column: 3;
      grid-row: 1;
      transform: translate(-49px, 0px);
    }  /* softened away from rigid C1 alignment */
    .slot-custom-inset-right {
      transform: translate(49px, 0px);
    }
    .slot-custom-inset-left {
      transform: translate(-49px, 0px);
    }
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
Ut([
  x({ attribute: !1 })
], gt.prototype, "hass", 2);
Ut([
  x({ attribute: !1 })
], gt.prototype, "config", 2);
Ut([
  Dt()
], gt.prototype, "_dialogType", 2);
Ut([
  Dt()
], gt.prototype, "_lineLayout", 2);
gt = Ut([
  Et("hec-flow-layout")
], gt);
var go = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, _e = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? mo(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && go(t, s, o), o;
};
let Rt = class extends j {
  setConfig(e) {
    this.config = qt(e);
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
Rt.styles = $t`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
_e([
  x({ attribute: !1 })
], Rt.prototype, "hass", 2);
_e([
  x({ attribute: !1 })
], Rt.prototype, "config", 2);
Rt = _e([
  Et("home-energy-card")
], Rt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  Rt as HomeEnergyCard
};
