/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = globalThis, Qt = Ht.ShadowRoot && (Ht.ShadyCSS === void 0 || Ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), ys = /* @__PURE__ */ new WeakMap();
let Vs = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Qt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = ys.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ys.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Js = (e) => new Vs(typeof e == "string" ? e : e + "", void 0, te), ht = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new Vs(s, e, te);
}, Xs = (e, t) => {
  if (Qt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = Ht.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, ms = Qt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Js(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qs, defineProperty: ti, getOwnPropertyDescriptor: ei, getOwnPropertyNames: si, getOwnPropertySymbols: ii, getPrototypeOf: oi } = Object, G = globalThis, _s = G.trustedTypes, ni = _s ? _s.emptyScript : "", jt = G.reactiveElementPolyfillSupport, yt = (e, t) => e, Dt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ni : null;
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
} }, ee = (e, t) => !Qs(e, t), vs = { attribute: !0, type: String, converter: Dt, reflect: !1, useDefault: !1, hasChanged: ee };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), G.litPropertyMetadata ?? (G.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = vs) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && ti(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: r } = ei(this.prototype, t) ?? { get() {
      return this[s];
    }, set(n) {
      this[s] = n;
    } };
    return { get: o, set(n) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? vs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(yt("elementProperties"))) return;
    const t = oi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(yt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(yt("properties"))) {
      const s = this.properties, i = [...si(s), ...ii(s)];
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
    return Xs(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Dt).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var r, n;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Dt;
      this._$Em = o;
      const d = l.fromAttribute(s, a.type);
      this[o] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, r) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ee)(r, s) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? s ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
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
rt.elementStyles = [], rt.shadowRootOptions = { mode: "open" }, rt[yt("elementProperties")] = /* @__PURE__ */ new Map(), rt[yt("finalized")] = /* @__PURE__ */ new Map(), jt == null || jt({ ReactiveElement: rt }), (G.reactiveElementVersions ?? (G.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, bs = (e) => e, Ut = mt.trustedTypes, ws = Ut ? Ut.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Bs = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, js = "?" + j, ri = `<${js}>`, Q = document, vt = () => Q.createComment(""), bt = (e) => e === null || typeof e != "object" && typeof e != "function", se = Array.isArray, ai = (e) => se(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Gt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $s = /-->/g, xs = />/g, K = RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Es = /'/g, Cs = /"/g, Gs = /^(?:script|style|textarea|title)$/i, Ws = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), w = Ws(1), _t = Ws(2), tt = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Ss = /* @__PURE__ */ new WeakMap(), J = Q.createTreeWalker(Q, 129);
function Ks(e, t) {
  if (!se(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ws !== void 0 ? ws.createHTML(t) : t;
}
const ci = (e, t) => {
  const s = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = pt;
  for (let a = 0; a < s; a++) {
    const l = e[a];
    let d, f, u = -1, y = 0;
    for (; y < l.length && (n.lastIndex = y, f = n.exec(l), f !== null); ) y = n.lastIndex, n === pt ? f[1] === "!--" ? n = $s : f[1] !== void 0 ? n = xs : f[2] !== void 0 ? (Gs.test(f[2]) && (o = RegExp("</" + f[2], "g")), n = K) : f[3] !== void 0 && (n = K) : n === K ? f[0] === ">" ? (n = o ?? pt, u = -1) : f[1] === void 0 ? u = -2 : (u = n.lastIndex - f[2].length, d = f[1], n = f[3] === void 0 ? K : f[3] === '"' ? Cs : Es) : n === Cs || n === Es ? n = K : n === $s || n === xs ? n = pt : (n = K, o = void 0);
    const g = n === K && e[a + 1].startsWith("/>") ? " " : "";
    r += n === pt ? l + ri : u >= 0 ? (i.push(d), l.slice(0, u) + Bs + l.slice(u) + j + g) : l + j + (u === -2 ? a : g);
  }
  return [Ks(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class wt {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [d, f] = ci(t, s);
    if (this.el = wt.createElement(d, i), J.currentNode = this.el.content, s === 2 || s === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = J.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Bs)) {
          const y = f[n++], g = o.getAttribute(u).split(j), p = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: r, name: p[2], strings: g, ctor: p[1] === "." ? hi : p[1] === "?" ? di : p[1] === "@" ? ui : Bt }), o.removeAttribute(u);
        } else u.startsWith(j) && (l.push({ type: 6, index: r }), o.removeAttribute(u));
        if (Gs.test(o.tagName)) {
          const u = o.textContent.split(j), y = u.length - 1;
          if (y > 0) {
            o.textContent = Ut ? Ut.emptyScript : "";
            for (let g = 0; g < y; g++) o.append(u[g], vt()), J.nextNode(), l.push({ type: 2, index: ++r });
            o.append(u[y], vt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === js) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(j, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += j.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const i = Q.createElement("template");
    return i.innerHTML = t, i;
  }
}
function lt(e, t, s = e, i) {
  var n, a;
  if (t === tt) return t;
  let o = i !== void 0 ? (n = s._$Co) == null ? void 0 : n[i] : s._$Cl;
  const r = bt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = o : s._$Cl = o), o !== void 0 && (t = lt(e, o._$AS(e, t.values), o, i)), t;
}
class li {
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
    const { el: { content: s }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? Q).importNode(s, !0);
    J.currentNode = o;
    let r = J.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new dt(r, r.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (d = new pi(r, this, t)), this._$AV.push(d), l = i[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = J.nextNode(), n++);
    }
    return J.currentNode = Q, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class dt {
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
    t = lt(this, t, s), bt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== tt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ai(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Q.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = wt.createElement(Ks(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(s);
    else {
      const n = new li(o, this), a = n.u(this.options);
      n.p(s), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = Ss.get(t.strings);
    return s === void 0 && Ss.set(t.strings, s = new wt(t)), s;
  }
  k(t) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const r of t) o === s.length ? s.push(i = new dt(this.O(vt()), this.O(vt()), this, this.options)) : i = s[o], i._$AI(r), o++;
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
class Bt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, o, r) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, s = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = lt(this, t, s, 0), n = !bt(t) || t !== this._$AH && t !== tt, n && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = r[0], l = 0; l < r.length - 1; l++) d = lt(this, a[i + l], s, l), d === tt && (d = this._$AH[l]), n || (n = !bt(d) || d !== this._$AH[l]), d === v ? t = v : t !== v && (t += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class hi extends Bt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class di extends Bt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class ui extends Bt {
  constructor(t, s, i, o, r) {
    super(t, s, i, o, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = lt(this, t, s, 0) ?? v) === tt) return;
    const i = this._$AH, o = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== v && (i === v || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class pi {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    lt(this, t);
  }
}
const fi = { I: dt }, Wt = mt.litHtmlPolyfillSupport;
Wt == null || Wt(wt, dt), (mt.litHtmlVersions ?? (mt.litHtmlVersions = [])).push("3.3.2");
const gi = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = o = new dt(t.insertBefore(vt(), r), r, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis;
let F = class extends rt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = gi(s, this.renderRoot, this.renderOptions);
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
    return tt;
  }
};
var Fs;
F._$litElement$ = !0, F.finalized = !0, (Fs = X.litElementHydrateSupport) == null || Fs.call(X, { LitElement: F });
const Kt = X.litElementPolyfillSupport;
Kt == null || Kt({ LitElement: F });
(X.litElementVersions ?? (X.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yi = { attribute: !0, type: String, converter: Dt, reflect: !1, hasChanged: ee }, mi = (e = yi, t, s) => {
  const { kind: i, metadata: o } = s;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), i === "accessor") {
    const { name: n } = s;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: n } = s;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function x(e) {
  return (t, s) => typeof s == "object" ? mi(e, t, s) : ((i, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Et(e) {
  return x({ ...e, state: !0, attribute: !1 });
}
const ie = (e) => e.attributes.device_class ?? "", oe = (e) => e.attributes.unit_of_measurement ?? "", ne = (e, t) => e.toLowerCase() + " " + (t.attributes.friendly_name ?? "").toLowerCase();
function Z(...e) {
  return (t, s) => {
    let i = 0;
    ie(s) === "power" && (i += 4), ["W", "kW"].includes(oe(s)) && (i += 2);
    const o = ne(t, s);
    for (const r of e) o.includes(r) && (i += 1);
    return i;
  };
}
function at(...e) {
  return (t, s) => {
    let i = 0;
    ie(s) === "energy" && (i += 4), ["kWh", "Wh", "MWh"].includes(oe(s)) && (i += 2);
    const o = ne(t, s);
    for (const r of e) o.includes(r) && (i += 1);
    return i;
  };
}
function As(...e) {
  return (t, s) => {
    let i = 0;
    ie(s) === "battery" && (i += 4), oe(s) === "%" && (i += 2);
    const o = ne(t, s);
    for (const r of e) o.includes(r) && (i += 1);
    return i;
  };
}
function Lt(e, t = []) {
  return (s, i) => {
    const o = s.toLowerCase();
    if (t.some((n) => o.includes(n))) return 0;
    let r = 0;
    for (const n of e) o.includes(n) && (r += 4);
    return r;
  };
}
function S(e, t, s, i) {
  let o, r = 0;
  for (const n of e) {
    if (i.has(n)) continue;
    const a = t[n];
    if (!a) continue;
    const l = s(n, a);
    l > r && (r = l, o = n);
  }
  return o && i.add(o), o;
}
function _i(e, t, s) {
  const i = Object.values(t).some(
    (_) => _.platform === "octopus_energy" && !_.disabled_by
  ), o = Object.keys(e).filter((_) => _.includes("octopus_energy"));
  if (!i && o.length === 0) return null;
  const r = o.filter(
    (_) => _.includes("octopus_energy_electricity")
  ), n = ["Octopus Energy"], a = {}, l = {}, d = S(
    r,
    e,
    Lt(["_current_rate"], ["export", "accumulative"]),
    s
  );
  d && (a.rate_entity = d, n.push("rate"));
  const f = S(
    r,
    e,
    Lt(["_current_accumulative_cost"]),
    s
  );
  f && (a.cost_entity = f, n.push("cost"));
  const u = S(
    r,
    e,
    Lt(["_current_day_rates"]),
    s
  );
  u && (a.slots_entity = u, n.push("slots"));
  const y = S(
    o.filter((_) => _.startsWith("binary_sensor.")),
    e,
    Lt(["_intelligent_dispatching"]),
    s
  );
  y && (a.dispatches_entity = y, n.push("dispatching")), Object.keys(a).length && (l.octopus = a);
  const g = S(
    r,
    e,
    Z("import", "demand", "current"),
    s
  );
  g && (l.power_import = g, n.push("import power"));
  const p = S(
    r,
    e,
    Z("export", "demand", "current"),
    s
  );
  p && (l.power_export = p, n.push("export power"));
  const m = S(
    r,
    e,
    at("import", "accumulative", "consumption"),
    s
  );
  m && (l.daily_usage = m, n.push("daily import"));
  const b = S(
    r,
    e,
    at("export", "accumulative"),
    s
  );
  return b && (l.daily_export = b, n.push("daily export")), { integration_type: "octopus", entity_types: { grid: l }, summary: n };
}
function vi(e, t, s) {
  const i = Object.values(t).filter(
    (p) => p.platform === "tesla_custom" && !p.disabled_by
  ), o = Object.keys(e).some(
    (p) => p.includes("powerwall") || p.includes("tesla")
  );
  if (i.length === 0 && !o) return null;
  const r = i.length > 0 ? i.map((p) => p.entity_id) : Object.keys(e).filter((p) => p.includes("powerwall") || p.includes("tesla")), n = r.filter((p) => p.includes("powerwall")), a = r.filter((p) => !p.includes("powerwall")), l = ["Tesla"], d = {};
  if (n.length > 0) {
    const p = {}, m = S(
      n,
      e,
      As("battery", "soc", "charge", "percent"),
      s
    );
    m && (p.soc = m);
    const b = S(
      n,
      e,
      Z("battery", "power", "charge", "discharge"),
      s
    );
    b && (p.power_combined = b);
    const _ = S(
      n,
      e,
      at("battery", "today", "daily", "charged"),
      s
    );
    _ && (p.daily_usage = _), Object.keys(p).length && (d.battery = p, l.push("Powerwall"));
  }
  const f = S(
    r,
    e,
    Z("solar"),
    s
  );
  if (f) {
    const p = { power_combined: f }, m = S(
      r,
      e,
      at("solar"),
      s
    );
    m && (p.daily_usage = m), d.solar = p, l.push("solar");
  }
  const u = S(
    r,
    e,
    Z("load", "home", "house"),
    s
  );
  if (u) {
    const p = { power_combined: u }, m = S(
      r,
      e,
      at("load", "home", "house"),
      s
    );
    m && (p.daily_usage = m), d.home = p, l.push("home load");
  }
  const y = S(
    r,
    e,
    Z("grid"),
    s
  );
  y && (d.grid = { power_combined: y }, l.push("grid"));
  const g = S(
    a,
    e,
    As("battery", "battery_level", "soc", "charge"),
    s
  );
  if (g) {
    const p = { soc: g }, m = S(
      a,
      e,
      Z("charg", "power"),
      s
    );
    m && (p.power_combined = m);
    const b = S(
      a,
      e,
      at("charg", "energy"),
      s
    );
    b && (p.daily_usage = b), d.ev = p, l.push("EV");
  }
  return { integration_type: "tesla", entity_types: d, summary: l };
}
function bi(e) {
  var l, d;
  const t = e, s = t.states ?? {}, i = t.entities ?? {}, o = /* @__PURE__ */ new Set(), r = vi(s, i, o), n = _i(s, i, o), a = {
    integration_type: "manual",
    entity_types: {},
    summary: []
  };
  if (r && (a.integration_type = "tesla", Object.assign(a.entity_types, r.entity_types), a.summary.push(...r.summary ?? [])), n) {
    if (a.integration_type !== "tesla" && (a.integration_type = "octopus"), (l = n.entity_types) != null && l.grid) {
      const f = n.entity_types.grid;
      a.entity_types.grid = {
        ...a.entity_types.grid,
        ...f,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: f.power_import || (d = a.entity_types.grid) == null ? void 0 : d.power_combined
      };
    }
    n.tariff_entity && (a.tariff_entity = n.tariff_entity), a.summary.push(...n.summary ?? []);
  }
  return a;
}
function wi(e, t, s = !1) {
  const i = { ...e };
  t.tariff_entity && (s || !e.tariff_entity) && (i.tariff_entity = t.tariff_entity);
  const o = e.entity_types ?? {}, r = { ...o };
  for (const [n, a] of Object.entries(t.entity_types)) {
    const l = o[n] ?? {}, d = { ...l };
    for (const [f, u] of Object.entries(a))
      u !== void 0 && (s || !l[f]) && (d[f] = u);
    r[n] = d;
  }
  return i.entity_types = r, i;
}
const Ft = ["grid", "solar", "battery", "home", "ev"], $i = "custom_";
function Ts(e) {
  const t = e.match(/^custom_(\d+)$/);
  return t ? Number(t[1]) : Number.MAX_SAFE_INTEGER;
}
function xi(e) {
  return `${$i}${e + 1}`;
}
function It(e) {
  const t = e.entity_types ?? {}, s = Object.fromEntries(
    Object.entries(t).filter(
      ([n]) => Ft.includes(n)
    )
  ), i = Object.entries(t).filter(([n]) => !Ft.includes(n)).sort(([n], [a]) => Ts(n) - Ts(a)).map(([, n]) => ({ ...n })), o = Array.isArray(e.custom_types) ? e.custom_types.map((n) => ({ ...n })) : i, r = {
    ...s
  };
  return o.forEach((n, a) => {
    r[xi(a)] = { ...n };
  }), {
    ...e,
    entity_types: r,
    custom_types: o
  };
}
var Ei = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, re = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ci(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Ei(t, s, o), o;
};
let $t = class extends F {
  setConfig(e) {
    this.config = It(e);
  }
  _dispatchConfig(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: It(e) },
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
    var e, t, s, i, o, r, n, a, l, d, f, u, y, g, p, m, b, _, T, P, C, A, k, M, L, O, N, z, D, $, H, U, B, it, At, Tt, kt, Pt, ot, nt, Mt, ce, le, he, de, ue, pe, fe, ge, ye, me, _e, ve, be, we, $e, xe, Ee, Ce, Se, Ae, Te, ke, Pe, Me, Le, Oe, Ne, ze, He, Ie, Re, De, Ue, Fe, Ve, Be, je, Ge, We, Ke, qe, Ye, Ze, Je, Xe, Qe, ts, es, ss, is, os, ns, rs, as, cs, ls, hs, ds, us, ps, fs;
    return this.config ? w`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() => this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: It(
            wi(this.config, bi(this.hass), !1)
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
            .value=${((r = (o = this.config.entity_types) == null ? void 0 : o.grid) == null ? void 0 : r.power_combined) ?? ""}
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
            .value=${((a = (n = this.config.entity_types) == null ? void 0 : n.grid) == null ? void 0 : a.daily_usage) ?? ""}
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
              .checked=${((u = (f = this.config.entity_types) == null ? void 0 : f.grid) == null ? void 0 : u.show_zero) ?? !0}
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
            .value=${((g = (y = this.config.entity_types) == null ? void 0 : y.grid) == null ? void 0 : g.zero_tolerance) != null ? String((m = (p = this.config.entity_types) == null ? void 0 : p.grid) == null ? void 0 : m.zero_tolerance) : ""}
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
            .value=${((P = (T = this.config.entity_types) == null ? void 0 : T.grid) == null ? void 0 : P.label) ?? ""}
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
            .value=${((A = (C = this.config.entity_types) == null ? void 0 : C.grid) == null ? void 0 : A.icon) ?? ""}
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
            .value=${((M = (k = this.config.entity_types) == null ? void 0 : k.grid) == null ? void 0 : M.colour) ?? ""}
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
            .value=${((O = (L = this.config.entity_types) == null ? void 0 : L.solar) == null ? void 0 : O.power_combined) ?? ""}
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
            .value=${((z = (N = this.config.entity_types) == null ? void 0 : N.solar) == null ? void 0 : z.daily_usage) ?? ""}
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
              .checked=${(($ = (D = this.config.entity_types) == null ? void 0 : D.solar) == null ? void 0 : $.show_zero) ?? !0}
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
            .value=${((U = (H = this.config.entity_types) == null ? void 0 : H.solar) == null ? void 0 : U.zero_tolerance) != null ? String((it = (B = this.config.entity_types) == null ? void 0 : B.solar) == null ? void 0 : it.zero_tolerance) : ""}
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
              .checked=${((Tt = (At = this.config.entity_types) == null ? void 0 : At.solar) == null ? void 0 : Tt.show_label) ?? !0}
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
            .value=${((Pt = (kt = this.config.entity_types) == null ? void 0 : kt.solar) == null ? void 0 : Pt.label) ?? ""}
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
            .value=${((nt = (ot = this.config.entity_types) == null ? void 0 : ot.solar) == null ? void 0 : nt.icon) ?? ""}
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
            .value=${((ce = (Mt = this.config.entity_types) == null ? void 0 : Mt.solar) == null ? void 0 : ce.colour) ?? ""}
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
            .value=${((he = (le = this.config.entity_types) == null ? void 0 : le.battery) == null ? void 0 : he.soc) ?? ""}
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
            .value=${((ue = (de = this.config.entity_types) == null ? void 0 : de.battery) == null ? void 0 : ue.power_combined) ?? ""}
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
            .value=${((fe = (pe = this.config.entity_types) == null ? void 0 : pe.battery) == null ? void 0 : fe.daily_usage) ?? ""}
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
            .value=${((Pe = (ke = this.config.entity_types) == null ? void 0 : ke.battery) == null ? void 0 : Pe.colour) ?? ""}
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
            .value=${((Le = (Me = this.config.entity_types) == null ? void 0 : Me.home) == null ? void 0 : Le.power_combined) ?? ""}
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
            .value=${((We = (Ge = this.config.entity_types) == null ? void 0 : Ge.home) == null ? void 0 : We.icon) ?? ""}
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
            .value=${((qe = (Ke = this.config.entity_types) == null ? void 0 : Ke.home) == null ? void 0 : qe.colour) ?? ""}
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
$t.styles = ht`
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
re([
  x({ attribute: !1 })
], $t.prototype, "hass", 2);
re([
  x({ attribute: !1 })
], $t.prototype, "config", 2);
$t = re([
  ut("home-energy-card-editor")
], $t);
var Si = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, Ct = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ai(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Si(t, s, o), o;
};
function Ot(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : s.attributes.unit_of_measurement === "Wh" ? i / 1e3 : i;
}
function Nt(e, t) {
  return e === null ? "—" : e.toFixed(t);
}
function Ti(e) {
  const t = e.toLowerCase().replace(/[\s_-]/g, ""), s = e.replace(/[_-]/g, " ").replace(/\b\w/g, (i) => i.toUpperCase());
  return ["offpeak", "low", "cheap", "free", "economy"].some((i) => t.includes(i)) ? { label: s, bg: "#e8f5e9", fg: "#2e7d32" } : ["peak", "high", "expensive"].some((i) => t.includes(i)) && !t.includes("off") ? { label: s, bg: "#fce4ec", fg: "#c62828" } : ["shoulder", "mid", "standard"].some((i) => t.includes(i)) ? { label: s, bg: "#fff8e1", fg: "#e65100" } : {
    label: s,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)"
  };
}
let et = class extends F {
  constructor() {
    super(...arguments), this.showTitle = !0, this.showValues = !0;
  }
  render() {
    var _, T, P, C, A, k, M, L, O, N, z;
    if (!this.config) return v;
    const e = ((_ = this.hass) == null ? void 0 : _.states) ?? {}, t = this.config.entity_types ?? {}, s = ((T = this.config.display) == null ? void 0 : T.decimal_places) ?? 1, i = this.config.tariff_entity ? (P = e[this.config.tariff_entity]) == null ? void 0 : P.state : null, o = i && i !== "unavailable" && i !== "unknown" ? Ti(i) : null, r = Ot(e, (C = t.solar) == null ? void 0 : C.daily_usage), n = Ot(e, (A = t.home) == null ? void 0 : A.daily_usage), a = Ot(e, (k = t.grid) == null ? void 0 : k.daily_usage), l = Ot(e, (M = t.grid) == null ? void 0 : M.daily_export), d = !!((L = t.solar) != null && L.daily_usage), f = !!((O = t.home) != null && O.daily_usage), u = !!((N = t.grid) != null && N.daily_usage), y = !!((z = t.grid) != null && z.daily_export), g = u || y, p = d || f || g, m = this.showValues && p, b = this.showTitle || o;
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
                <span class="stat-val">${Nt(r, s)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : v}

            ${f ? w`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Home</span>
                <span class="stat-val">${Nt(n, s)}</span>
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
                      <span class="stat-val">${Nt(a, s)}</span>
                    </div>
                  ` : v}
                  ${y ? w`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${Nt(l, s)}</span>
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
et.styles = ht`
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
Ct([
  x({ attribute: !1 })
], et.prototype, "hass", 2);
Ct([
  x({ attribute: !1 })
], et.prototype, "config", 2);
Ct([
  x({ type: Boolean })
], et.prototype, "showTitle", 2);
Ct([
  x({ type: Boolean })
], et.prototype, "showValues", 2);
et = Ct([
  ut("hec-card-header")
], et);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ki = { CHILD: 2 }, Pi = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Mi = class {
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
const { I: Li } = fi, ks = (e) => e, Ps = () => document.createComment(""), ft = (e, t, s) => {
  var r;
  const i = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (s === void 0) {
    const n = i.insertBefore(Ps(), o), a = i.insertBefore(Ps(), o);
    s = new Li(n, a, e, e.options);
  } else {
    const n = s._$AB.nextSibling, a = s._$AM, l = a !== e;
    if (l) {
      let d;
      (r = s._$AQ) == null || r.call(s, e), s._$AM = e, s._$AP !== void 0 && (d = e._$AU) !== a._$AU && s._$AP(d);
    }
    if (n !== o || l) {
      let d = s._$AA;
      for (; d !== n; ) {
        const f = ks(d).nextSibling;
        ks(i).insertBefore(d, o), d = f;
      }
    }
  }
  return s;
}, q = (e, t, s = e) => (e._$AI(t, s), e), Oi = {}, Ni = (e, t = Oi) => e._$AH = t, zi = (e) => e._$AH, qt = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ms = (e, t, s) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = t; o <= s; o++) i.set(e[o], o);
  return i;
}, Ls = Pi(class extends Mi {
  constructor(e) {
    if (super(e), e.type !== ki.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, s) {
    let i;
    s === void 0 ? s = t : t !== void 0 && (i = t);
    const o = [], r = [];
    let n = 0;
    for (const a of e) o[n] = i ? i(a, n) : n, r[n] = s(a, n), n++;
    return { values: r, keys: o };
  }
  render(e, t, s) {
    return this.dt(e, t, s).values;
  }
  update(e, [t, s, i]) {
    const o = zi(e), { values: r, keys: n } = this.dt(t, s, i);
    if (!Array.isArray(o)) return this.ut = n, r;
    const a = this.ut ?? (this.ut = []), l = [];
    let d, f, u = 0, y = o.length - 1, g = 0, p = r.length - 1;
    for (; u <= y && g <= p; ) if (o[u] === null) u++;
    else if (o[y] === null) y--;
    else if (a[u] === n[g]) l[g] = q(o[u], r[g]), u++, g++;
    else if (a[y] === n[p]) l[p] = q(o[y], r[p]), y--, p--;
    else if (a[u] === n[p]) l[p] = q(o[u], r[p]), ft(e, l[p + 1], o[u]), u++, p--;
    else if (a[y] === n[g]) l[g] = q(o[y], r[g]), ft(e, o[u], o[y]), y--, g++;
    else if (d === void 0 && (d = Ms(n, g, p), f = Ms(a, u, y)), d.has(a[u])) if (d.has(a[y])) {
      const m = f.get(n[g]), b = m !== void 0 ? o[m] : null;
      if (b === null) {
        const _ = ft(e, o[u]);
        q(_, r[g]), l[g] = _;
      } else l[g] = q(b, r[g]), ft(e, o[u], b), o[m] = null;
      g++;
    } else qt(o[y]), y--;
    else qt(o[u]), u++;
    for (; g <= p; ) {
      const m = ft(e, l[p + 1]);
      q(m, r[g]), l[g++] = m;
    }
    for (; u <= y; ) {
      const m = o[u++];
      m !== null && qt(m);
    }
    return this.ut = n, Ni(e, l), tt;
  }
});
var Hi = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, R = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ii(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Hi(t, s, o), o;
};
const Ri = {
  solar: { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid: { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home: { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev: { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" }
}, Di = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt"
}, Jt = 38, Os = +(2 * Math.PI * Jt).toFixed(4);
function Rt(e, t, s) {
  if (e === null) return "—";
  const i = Math.abs(e);
  return t === "W" || t === "auto" && i < 1e3 ? `${Math.round(e)} W` : `${(e / 1e3).toFixed(s)} kW`;
}
function Ns(e, t) {
  return e === null ? "—" : `${e.toFixed(t)} kWh`;
}
let I = class extends F {
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
    const e = Ri[this.type] ?? Di, t = this.colour || e.accent, s = this.icon || e.icon, i = this.soc !== null, o = this.type === "grid" || this.type === "battery", r = o && this.power !== null ? Math.abs(this.power) : this.power, n = o && this.power !== null ? this.type === "grid" ? this.power > 0 ? "mdi:arrow-right-bold-circle" : this.power < 0 ? "mdi:arrow-left-bold-circle" : "" : this.power > 0 ? "mdi:arrow-left-bold-circle" : this.power < 0 ? "mdi:arrow-right-bold-circle" : "" : "", a = i ? Math.max(0, Math.min(100, this.soc)) : 0, l = +(Os * (1 - a / 100)).toFixed(4);
    return w`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${i ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${Jt}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${Jt}"
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
          <span class="power">${Rt(r, this.unit, this.decimalPlaces)}</span>
          ${n ? w`<ha-icon class="direction-icon" .icon=${n}></ha-icon>` : this.bottomText ? w`<span class="bottom-text">${this.bottomText}</span>` : v}
        </div>

      </div>
    `;
  }
};
I.styles = ht`
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
R([
  x()
], I.prototype, "type", 2);
R([
  x()
], I.prototype, "label", 2);
R([
  x({ type: Boolean })
], I.prototype, "showLabel", 2);
R([
  x()
], I.prototype, "icon", 2);
R([
  x()
], I.prototype, "bottomText", 2);
R([
  x()
], I.prototype, "colour", 2);
R([
  x({ type: Number })
], I.prototype, "power", 2);
R([
  x({ type: Number })
], I.prototype, "soc", 2);
R([
  x()
], I.prototype, "unit", 2);
R([
  x({ type: Number })
], I.prototype, "decimalPlaces", 2);
I = R([
  ut("hec-energy-node")
], I);
function Xt(e, t, s = 0) {
  const i = { power: null, magnitude: null, direction: "idle" };
  if (t === null) return i;
  if (Math.abs(t) <= s) return { power: 0, magnitude: null, direction: "idle" };
  const o = Math.abs(t);
  let r;
  switch (e) {
    case "solar":
      r = "to-home";
      break;
    case "grid":
      r = t > 0 ? "to-home" : "from-home";
      break;
    case "battery":
      r = t > 0 ? "to-home" : "from-home";
      break;
    case "ev":
      r = t > 0 ? "from-home" : "to-home";
      break;
    default:
      r = t > 0 ? "from-home" : "to-home";
  }
  return { power: t, magnitude: o, direction: r };
}
function qs(e, t) {
  return (t == null ? void 0 : t.trim().toLowerCase()) === "kw" ? e * 1e3 : e;
}
function Yt(e, t) {
  var o;
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : qs(
    i,
    (o = s.attributes) == null ? void 0 : o.unit_of_measurement
  );
}
function Ys(e, t, s) {
  let i;
  if (t.power_combined)
    i = Yt(s, t.power_combined);
  else {
    const o = !!t.power_import, r = !!t.power_export;
    if (!o && !r) return null;
    const n = o ? Yt(s, t.power_import) : null, a = r ? Yt(s, t.power_export) : null;
    if ((!o || n === null) && (!r || a === null)) return null;
    i = (n ?? 0) - (a ?? 0);
  }
  return e === "battery" && t.reverse_power_flow && (i *= -1), i;
}
function ct(e, t, s) {
  return Xt(
    e,
    Ys(e, t, s),
    t.zero_tolerance ?? 0
  );
}
var Ui = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, W = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Fi(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Ui(t, s, o), o;
};
const Vi = {
  solar: "mdi:solar-power-variant",
  grid: "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home: "mdi:home-lightning-bolt",
  ev: "mdi:car-electric"
}, Bi = {
  solar: "#f9a825",
  grid: "#e91e63",
  battery: "#43a047",
  home: "#388e3c",
  ev: "#1e88e5"
}, ji = {
  solar: { "to-home": "producing" },
  grid: { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home: { "to-home": "consuming" },
  ev: { "to-home": "discharging (V2H)", "from-home": "charging" }
};
function Gi(e, t) {
  const s = Date.now(), i = s - 864e5, o = Array(24).fill(null);
  if (!e.length) return o;
  for (let r = 0; r < 24; r++) {
    const n = i + r * 36e5, a = n + 36e5;
    let l = 0, d = 0;
    for (let f = 0; f < e.length; f++) {
      const u = new Date(e[f].last_changed).getTime(), y = f + 1 < e.length ? new Date(e[f + 1].last_changed).getTime() : s, g = Math.max(u, n), p = Math.min(y, a);
      if (p <= g) continue;
      const m = parseFloat(e[f].state);
      if (isNaN(m)) continue;
      const b = qs(m, t), _ = p - g;
      l += Math.abs(b) * _, d += _;
    }
    d > 0 && (o[r] = l / d);
  }
  return o;
}
function Zs(e, t) {
  if (!t) return null;
  const s = e[t];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const i = parseFloat(s.state);
  return isNaN(i) ? null : i;
}
function zt(e, t) {
  var o;
  const s = Zs(e, t);
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
function Zt(e) {
  return e === null ? "—" : `${e < 0 ? "-" : ""}£${Math.abs(e).toFixed(2)}`;
}
function Vt(e, t) {
  const s = typeof e == "number" ? e : parseFloat(String(e));
  if (isNaN(s)) return null;
  const i = String(t ?? "").trim().toLowerCase();
  return i.includes("pence") || i.startsWith("p/") || i === "p" ? s / 100 : (i.includes("gbp") || i.includes("£"), s);
}
function Hs(e) {
  if (!e) return [];
  const t = e.attributes.unit_of_measurement;
  return (e.attributes.rates ?? e.attributes.current_day_rates ?? e.attributes.today_rates ?? e.attributes.upcoming_interval_rates ?? []).map((i) => {
    const o = new Date(i.start ?? i.start_time ?? "").getTime(), r = new Date(i.end ?? i.end_time ?? "").getTime(), n = Vt(
      i.value_inc_vat ?? i.rate_inc_vat ?? i.value ?? i.rate,
      i.unit_of_measurement ?? t
    );
    return !Number.isFinite(o) || !Number.isFinite(r) || !n ? null : { startMs: o, endMs: r, rateGbpPerKwh: n };
  }).filter((i) => i !== null).sort((i, o) => i.startMs - o.startMs);
}
function Is(e, t, s) {
  if (!e.length) return [];
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const r = new Date(e[o].last_changed).getTime(), n = o + 1 < e.length ? new Date(e[o + 1].last_changed).getTime() : s, a = Vt(e[o].state, t);
    !Number.isFinite(r) || !Number.isFinite(n) || n <= r || a !== null && i.push({ startMs: r, endMs: n, rateGbpPerKwh: a });
  }
  return i;
}
function Ki(e, t) {
  const s = t == null ? void 0 : t.attributes.unit_of_measurement, i = e.map((o) => Vt(o.state, s)).filter((o) => o !== null);
  if (i.length > 0) {
    const o = i[0];
    return i.every((r) => Math.abs(r - o) < 1e-9) ? o : null;
  }
  return t ? Vt(t.state, s) : null;
}
function qi(e, t) {
  return String(t ?? "").trim().toLowerCase() === "wh" ? e / 1e3 : e;
}
function Rs(e, t, s) {
  if (e.length < 2 || !s.length) return null;
  const i = [];
  let o = !1;
  for (let r = 1; r < e.length; r++) {
    const n = new Date(e[r - 1].last_changed).getTime(), a = new Date(e[r].last_changed).getTime();
    if (!Number.isFinite(n) || !Number.isFinite(a) || a <= n) continue;
    const l = parseFloat(e[r - 1].state), d = parseFloat(e[r].state);
    if (isNaN(l) || isNaN(d)) continue;
    const f = qi(d - l, t);
    if (f <= 0) continue;
    const u = a - n, y = [];
    let g = 0;
    for (const p of s) {
      const m = Math.max(n, p.startMs), b = Math.min(a, p.endMs);
      if (b <= m) continue;
      const _ = b - m;
      g += _, y.push({
        startMs: m,
        endMs: b,
        overlapMs: _,
        rateGbpPerKwh: p.rateGbpPerKwh
      });
    }
    if (g > 0) {
      g < u && (o = !0);
      for (const p of y) {
        const m = f * (p.overlapMs / g);
        i.push({
          startMs: p.startMs,
          endMs: p.endMs,
          energyKwh: m,
          energyUnit: "kWh",
          tariffGbpPerKwh: p.rateGbpPerKwh,
          costGbp: m * p.rateGbpPerKwh
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
function Yi(e) {
  return `${e.getHours().toString().padStart(2, "0")}:00`;
}
function Us(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Zi(e) {
  return e < 0 ? "#43a047" : e < 8 ? "#66bb6a" : e < 20 ? "#ffa726" : "#ef5350";
}
function Ji(e) {
  return e < 20 ? "#ef5350" : e < 50 ? "#ffa726" : "#66bb6a";
}
const Y = 50;
let V = class extends F {
  constructor() {
    super(...arguments), this.nodeType = "", this.open = !1, this._hourly = [], this._loading = !1, this._gridMoney = null;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  updated(e) {
    super.updated(e), (e.has("open") || e.has("nodeType")) && this.open && this.nodeType && (this._loadHistory(), this.nodeType === "grid" ? this._loadGridMoney() : this._gridMoney = null);
  }
  async _loadHistory() {
    var i, o, r, n;
    const e = (o = (i = this.config) == null ? void 0 : i.entity_types) == null ? void 0 : o[this.nodeType], t = (e == null ? void 0 : e.power_combined) ?? (e == null ? void 0 : e.power_import) ?? (e == null ? void 0 : e.power_export);
    if (!t || !this.hass) return;
    const s = (n = (r = this.hass.states) == null ? void 0 : r[t]) == null ? void 0 : n.attributes.unit_of_measurement;
    this._loading = !0, this._hourly = [];
    try {
      const a = /* @__PURE__ */ new Date(), d = `history/period/${new Date(a.getTime() - 864e5).toISOString()}?filter_entity_id=${t}&minimal_response=true&no_attributes=true&end_time=${a.toISOString()}`, f = await this.hass.callApi("GET", d);
      this._hourly = Gi((f == null ? void 0 : f[0]) ?? [], s);
    } catch (a) {
      console.warn("[hec-node-detail] history fetch failed", a), this._hourly = [];
    } finally {
      this._loading = !1;
    }
  }
  async _loadGridMoney() {
    var l, d, f, u, y, g, p, m, b, _, T, P;
    const e = (d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d.grid, t = e == null ? void 0 : e.octopus;
    if (!this.hass || !e || !t) {
      this._gridMoney = null;
      return;
    }
    const s = Hs(
      t.slots_entity ? (f = this.hass.states) == null ? void 0 : f[t.slots_entity] : void 0
    ), i = e.export_rate ? (u = this.hass.states) == null ? void 0 : u[e.export_rate] : void 0, o = Hs(
      i
    ), r = /* @__PURE__ */ new Date();
    r.setHours(0, 0, 0, 0);
    const n = /* @__PURE__ */ new Date(), a = async (C) => {
      if (!C || !this.hass) return [];
      const A = `history/period/${r.toISOString()}?filter_entity_id=${C}&minimal_response=true&no_attributes=true&end_time=${n.toISOString()}`, k = await this.hass.callApi("GET", A);
      return (k == null ? void 0 : k[0]) ?? [];
    };
    try {
      const [C, A, k, M] = await Promise.all([
        a(e.daily_usage),
        a(e.daily_export),
        a(t.rate_entity),
        a(e.export_rate)
      ]), L = e.daily_usage ? (g = (y = this.hass.states) == null ? void 0 : y[e.daily_usage]) == null ? void 0 : g.attributes.unit_of_measurement : void 0, O = e.daily_export ? (m = (p = this.hass.states) == null ? void 0 : p[e.daily_export]) == null ? void 0 : m.attributes.unit_of_measurement : void 0, N = t.rate_entity ? (_ = (b = this.hass.states) == null ? void 0 : b[t.rate_entity]) == null ? void 0 : _.attributes.unit_of_measurement : void 0, z = e.export_rate ? (P = (T = this.hass.states) == null ? void 0 : T[e.export_rate]) == null ? void 0 : P.attributes.unit_of_measurement : void 0, D = s.length ? s : Is(k, N, n.getTime()), $ = o.length ? o : Is(M, z, n.getTime()), H = zt(this.hass.states, e.daily_usage), U = zt(this.hass.states, e.daily_export), B = Ki(M, i), it = Rs(
        C,
        L,
        D
      ), At = Ds(
        it
      ), Tt = Rs(
        A,
        O,
        $
      ), kt = Ds(
        Tt
      ), Pt = Wi(this.hass.states, t.cost_entity), ot = At ?? Pt, nt = kt ?? (U !== null && B !== null ? U * B : null), Mt = ot !== null && nt !== null ? ot - nt : null;
      this._gridMoney = {
        importCostToday: ot,
        exportPaymentToday: nt,
        netCost: Mt
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
    var o, r, n, a;
    const t = ((r = (o = this.config) == null ? void 0 : o.display) == null ? void 0 : r.decimal_places) ?? 1, s = ((a = (n = this.config) == null ? void 0 : n.display) == null ? void 0 : a.unit) ?? "auto", i = this._powerSubtitle(e, s, t);
    return w`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${Rt(e.power, s, t)}</div>
        ${i ? w`<div class="power-sub">${i}</div>` : v}
      </div>
    `;
  }
  _powerSubtitle(e, t, s) {
    var M, L, O, N, z, D, $;
    const i = ((M = ji[this.nodeType]) == null ? void 0 : M[e.direction]) ?? "";
    if (this.nodeType !== "grid" || e.direction !== "from-home" || !this.hass) return i;
    const o = this.hass.states, r = ((O = (L = this.config) == null ? void 0 : L.entity_types) == null ? void 0 : O.solar) ?? {}, n = ((z = (N = this.config) == null ? void 0 : N.entity_types) == null ? void 0 : z.home) ?? {}, a = (($ = (D = this.config) == null ? void 0 : D.entity_types) == null ? void 0 : $.battery) ?? {}, l = ct("solar", r, o), d = ct("home", n, o), f = ct("battery", a, o), u = e.magnitude ?? 0;
    if (u <= 0) return i;
    const y = l.direction === "to-home" ? l.magnitude ?? 0 : 0, g = Math.max(d.power ?? 0, 0), p = f.direction === "to-home" ? f.magnitude ?? 0 : 0, m = Math.max(y - g, 0), b = Math.min(u, m), _ = Math.min(
      Math.max(u - b, 0),
      p
    ), T = b + _;
    if (Math.max(u - T, 0) > Math.max(Y, u * 0.1))
      return i;
    const C = b > Y && _ <= Y, A = _ > Y && b <= Y, k = b > Y && _ > Y;
    return C ? "Exporting solely from excess solar production" : A ? "Exporting solely from the battery" : k ? `Exporting ${Rt(b, t, s)} from excess solar production and ${Rt(_, t, s)} from the battery` : i;
  }
  _sectionSoc(e) {
    if (e === null) return v;
    const t = Ji(e);
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
    var n, a, l;
    const t = ((n = this.hass) == null ? void 0 : n.states) ?? {}, s = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.decimal_places) ?? 1, i = this.nodeType === "solar" ? "Production" : this.nodeType === "grid" ? "Import" : this.nodeType === "battery" || this.nodeType === "ev" ? "Charged" : "Usage", o = this.nodeType === "battery" ? "Discharged" : this.nodeType === "ev" ? "Discharged (V2H)" : "Export", r = [];
    return e.daily_usage && r.push([i, zs(zt(t, e.daily_usage), s)]), e.daily_export && r.push([o, zs(zt(t, e.daily_export), s)]), r.length ? w`
      <div class="section">
        <div class="s-title">Today</div>
        ${r.map(([d, f]) => w`
          <div class="kv">
            <span class="kv-k">${d}</span>
            <span class="kv-v">${f}</span>
          </div>
        `)}
      </div>
    ` : v;
  }
  _sectionOctopus(e) {
    var g, p, m, b;
    const t = ((g = this.hass) == null ? void 0 : g.states) ?? {}, s = e.rate_entity ? t[e.rate_entity] : null, i = e.slots_entity ? t[e.slots_entity] : null, o = s == null ? void 0 : s.state, r = (s == null ? void 0 : s.attributes.unit_of_measurement) ?? "p/kWh", n = (i == null ? void 0 : i.attributes.rates) ?? (i == null ? void 0 : i.attributes.upcoming_interval_rates) ?? (i == null ? void 0 : i.attributes.today_rates) ?? [], a = Date.now(), l = n.filter((_) => new Date(_.end ?? _.end_time ?? 0).getTime() > a).slice(0, 6), d = o && o !== "unavailable" && o !== "unknown", f = ((p = this._gridMoney) == null ? void 0 : p.importCostToday) ?? null, u = ((m = this._gridMoney) == null ? void 0 : m.exportPaymentToday) ?? null, y = ((b = this._gridMoney) == null ? void 0 : b.netCost) ?? null;
    return !d && !l.length && f === null && u === null && y === null ? v : w`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${d ? w`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(o).toFixed(2)} ${r}</span>
          </div>
        ` : v}

        <div class="kv">
          <span class="kv-k">Import Cost Today</span>
          <span class="kv-v">${Zt(f)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${Zt(u)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${Zt(y)}</span>
        </div>

        ${l.length ? w`
          <div class="s-subtitle">Upcoming slots</div>
          ${l.map((_) => {
      const T = _.start ?? _.start_time ?? "", P = _.end ?? _.end_time ?? "", C = _.value_inc_vat ?? _.rate_inc_vat ?? _.value ?? 0, A = Zi(C);
      return w`
              <div class="slot">
                <span class="slot-dot" style="background:${A};"></span>
                <span class="slot-time">${Us(T)}–${Us(P)}</span>
                <span class="slot-rate" style="color:${A};">${(+C).toFixed(2)}p</span>
              </div>
            `;
    })}
        ` : v}
      </div>
    `;
  }
  _sectionChart(e) {
    const t = this._hourly.filter((r) => r !== null), s = t.length ? Math.max(...t) : 0, i = /* @__PURE__ */ new Date(), o = (r) => Yi(new Date(i.getTime() - r * 36e5));
    return this._loading ? w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    ` : w`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${s === 0 ? w`<div class="chart-msg">No data</div>` : w`
              ${_t`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((r, n) => {
      if (r === null || r <= 0) return _t``;
      const a = Math.max(2, r / s * 48);
      return _t`
                      <rect
                        x="${n * 10 + 0.5}" y="${52 - a}"
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
    var l, d, f;
    if (!this.open || !this.nodeType) return v;
    const e = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[this.nodeType]) ?? {}, t = ((f = this.hass) == null ? void 0 : f.states) ?? {}, s = e.colour || (Bi[this.nodeType] ?? "#9e9e9e"), i = e.icon || Vi[this.nodeType] || "mdi:lightning-bolt", o = e.label || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1), r = ct(this.nodeType, e, t), n = !!e.soc && (["battery", "ev"].includes(this.nodeType) || !Ft.includes(this.nodeType)), a = n ? Zs(t, e.soc) : null;
    return w`
      <div
        class="overlay"
        @click=${(u) => u.target === u.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(s, i, o)}
          ${this._sectionPower(r)}
          ${n ? this._sectionSoc(a) : v}
          ${this._sectionDaily(e)}
          ${this.nodeType === "grid" && e.octopus ? this._sectionOctopus(e.octopus) : v}
          ${this._sectionChart(s)}
        </div>
      </div>
    `;
  }
};
V.styles = ht`
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
W([
  x({ attribute: !1 })
], V.prototype, "hass", 2);
W([
  x({ attribute: !1 })
], V.prototype, "config", 2);
W([
  x()
], V.prototype, "nodeType", 2);
W([
  x({ type: Boolean })
], V.prototype, "open", 2);
W([
  Et()
], V.prototype, "_hourly", 2);
W([
  Et()
], V.prototype, "_loading", 2);
W([
  Et()
], V.prototype, "_gridMoney", 2);
V = W([
  ut("hec-node-detail")
], V);
var Xi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, St = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Qi(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && Xi(t, s, o), o;
};
function to(e, t) {
  if (!t || !e) return "0.7s";
  const s = Math.min(e / 5e3, 1);
  return `${(Math.round((2 - s * 1.7) * 10) / 10).toFixed(1)}s`;
}
const gt = {
  solar: "#ffc107",
  grid: "#8e24aa",
  battery: "#e53935",
  ev: "#42a5f5"
};
let st = class extends F {
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
    var r, n, a;
    const t = ((n = (r = this.config) == null ? void 0 : r.entity_types) == null ? void 0 : n[e]) ?? {}, s = ((a = this.hass) == null ? void 0 : a.states) ?? {};
    if (e !== "home")
      return ct(e, t, s);
    const i = Ys("home", t, s);
    if (i === null) return Xt("home", null, t.zero_tolerance ?? 0);
    const o = this._customTypes().reduce((l, d) => {
      var y, g;
      const f = ((g = (y = this.config) == null ? void 0 : y.entity_types) == null ? void 0 : g[d]) ?? {};
      if (!f.subtract_from_home) return l;
      const u = ct(d, f, s);
      return l + (u.power ?? 0);
    }, 0);
    return Xt(
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
    var o, r, n, a;
    const t = (n = (r = (o = this.config) == null ? void 0 : o.entity_types) == null ? void 0 : r[e]) == null ? void 0 : n.soc;
    if (!t || !this.hass) return null;
    const s = (a = this.hass.states[t]) == null ? void 0 : a.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const i = parseFloat(s);
    return isNaN(i) ? null : i;
  }
  _dailyKwh(e) {
    var r, n, a;
    const t = (a = (n = (r = this.config) == null ? void 0 : r.entity_types) == null ? void 0 : n[e]) == null ? void 0 : a.daily_usage;
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
    for (const n of i) {
      if (n.classList.contains("hidden")) continue;
      const a = n.dataset.nodeType;
      if (!a) continue;
      const l = n.getBoundingClientRect();
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
      const o = (this._flowSamples[s] ?? []).map((n) => n.magnitude).filter((n) => n !== null), r = o.length > 0 ? o.reduce((n, a) => n + Math.abs(a), 0) / o.length : null;
      this._smoothedMagnitudes[s] !== r && (this._smoothedMagnitudes[s] = r, t = !0);
    }
    return t;
  }
  _computeLineVisualState(e) {
    var r, n, a, l, d, f, u;
    const t = ((n = (r = this.config) == null ? void 0 : r.display) == null ? void 0 : n.dynamic_animation_speed) ?? !1, s = ((l = (a = this.config) == null ? void 0 : a.display) == null ? void 0 : l.animation) !== !1, i = this._flowInfo(e), o = this._smoothedMagnitudes[e] ?? i.magnitude;
    return {
      color: gt[e] ?? ((u = (f = (d = this.config) == null ? void 0 : d.entity_types) == null ? void 0 : f[e]) == null ? void 0 : u.colour) ?? "#9e9e9e",
      dur: to(o, t && i.direction !== "idle"),
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
    var k, M, L, O, N, z, D;
    const e = this._lineLayout.centers, t = e.home, s = e.solar;
    if (!t || !this._lineLayout.width || !this._lineLayout.height) return v;
    const i = [], o = this._flowInfo("solar"), r = this._flowInfo("home"), n = this._flowInfo("battery"), a = this._flowInfo("ev"), l = this._flowInfo("grid"), d = s && o.direction === "to-home" ? o.magnitude ?? 0 : 0, f = Math.max(r.power ?? 0, 0), u = n.direction === "from-home" ? n.magnitude ?? 0 : 0, y = a.direction === "from-home" ? a.magnitude ?? 0 : 0, g = l.direction === "from-home" ? l.magnitude ?? 0 : 0, p = Math.min(d, f);
    let m = Math.max(d - p, 0);
    const b = Math.min(m, u);
    m = Math.max(m - b, 0);
    const _ = Math.min(m, y);
    m = Math.max(m - _, 0);
    const T = Math.min(m, g);
    s && p > 0 && i.push({
      key: "solar-home",
      from: "solar",
      to: "home",
      type: "solar",
      color: gt.solar,
      magnitude: p
    }), s && b > 0 && e.battery && i.push({
      key: "solar-battery",
      from: "solar",
      to: "battery",
      type: "solar",
      color: gt.solar,
      magnitude: b
    }), s && _ > 0 && e.ev && i.push({
      key: "solar-ev",
      from: "solar",
      to: "ev",
      type: "solar",
      color: gt.solar,
      magnitude: _
    }), s && T > 0 && e.grid && i.push({
      key: "solar-grid",
      from: "solar",
      to: "grid",
      type: "solar",
      color: gt.solar,
      magnitude: T
    });
    const P = Math.max(u - b, 0), C = Math.max(y - _, 0), A = Math.max(g - T, 0);
    l.direction === "to-home" && (l.magnitude ?? 0) > 0 && e.grid && i.push({
      key: "grid-home",
      from: "grid",
      to: "home",
      type: "grid",
      color: ((k = this._lineVisualState.grid) == null ? void 0 : k.color) ?? this._computeLineVisualState("grid").color,
      magnitude: l.magnitude ?? 0
    }), A > 0 && e.grid && i.push({
      key: "home-grid",
      from: "home",
      to: "grid",
      type: "grid",
      color: ((M = this._lineVisualState.grid) == null ? void 0 : M.color) ?? this._computeLineVisualState("grid").color,
      magnitude: A
    }), n.direction === "to-home" && (n.magnitude ?? 0) > 0 && e.battery && i.push({
      key: "battery-home",
      from: "battery",
      to: "home",
      type: "battery",
      color: ((L = this._lineVisualState.battery) == null ? void 0 : L.color) ?? this._computeLineVisualState("battery").color,
      magnitude: n.magnitude ?? 0
    }), P > 0 && e.battery && i.push({
      key: "home-battery",
      from: "home",
      to: "battery",
      type: "battery",
      color: ((O = this._lineVisualState.battery) == null ? void 0 : O.color) ?? this._computeLineVisualState("battery").color,
      magnitude: P
    }), a.direction === "to-home" && (a.magnitude ?? 0) > 0 && e.ev && i.push({
      key: "ev-home",
      from: "ev",
      to: "home",
      type: "ev",
      color: ((N = this._lineVisualState.ev) == null ? void 0 : N.color) ?? this._computeLineVisualState("ev").color,
      magnitude: a.magnitude ?? 0
    }), C > 0 && e.ev && i.push({
      key: "home-ev",
      from: "home",
      to: "ev",
      type: "ev",
      color: ((z = this._lineVisualState.ev) == null ? void 0 : z.color) ?? this._computeLineVisualState("ev").color,
      magnitude: C
    });
    for (const $ of this._customTypes()) {
      const H = this._flowInfo($);
      !e[$] || !H.magnitude || H.direction === "idle" || i.push({
        key: `custom-${$}`,
        from: H.direction === "to-home" ? $ : "home",
        to: H.direction === "to-home" ? "home" : $,
        type: $,
        color: ((D = this._lineVisualState[$]) == null ? void 0 : D.color) ?? this._computeLineVisualState($).color,
        magnitude: H.magnitude
      });
    }
    return _t`
      ${Ls(
      i,
      ($) => $.key,
      ($) => {
        const H = e[$.from], U = e[$.to];
        if (!H || !U || $.magnitude <= 0) return v;
        const B = this._lineVisualState[$.type] ?? this._computeLineVisualState($.type), it = [
          "flow-line",
          B.paused ? "paused" : ""
        ].filter(Boolean).join(" ");
        return _t`
            <line
              x1="${H.x}" y1="${H.y}" x2="${U.x}" y2="${U.y}"
              stroke="${$.color}"
              class="${it}"
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
    var l, d, f;
    const i = e === "home" ? !0 : this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, r = ((f = this.config) == null ? void 0 : f.display) ?? {}, n = this._flowInfo(e), a = e === "solar" ? Ns(this._dailyKwh(e), r.decimal_places ?? 1) : "";
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
        .power=${n.power}
        .soc=${s ? this._soc(e) : null}
        .unit=${r.unit ?? "auto"}
        .decimalPlaces=${r.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }
  // ── Custom type helpers ───────────────────────────────────────────────────
  /** Returns configured types beyond the five standard ones, in insertion order. */
  _customTypes() {
    var e;
    return Object.keys(((e = this.config) == null ? void 0 : e.entity_types) ?? {}).filter(
      (t) => !Ft.includes(t)
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
    var l, d, f;
    const i = this._isVisible(e), o = ((d = (l = this.config) == null ? void 0 : l.entity_types) == null ? void 0 : d[e]) ?? {}, r = ((f = this.config) == null ? void 0 : f.display) ?? {}, n = this._flowInfo(e), a = Ns(
      this._dailyKwh(e),
      r.decimal_places ?? 1
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
        .power=${n.power}
        .soc=${o.soc ? this._soc(e) : null}
        .unit=${r.unit ?? "auto"}
        .decimalPlaces=${r.decimal_places ?? 1}
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
st.styles = ht`
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
St([
  x({ attribute: !1 })
], st.prototype, "hass", 2);
St([
  x({ attribute: !1 })
], st.prototype, "config", 2);
St([
  Et()
], st.prototype, "_dialogType", 2);
St([
  Et()
], st.prototype, "_lineLayout", 2);
st = St([
  ut("hec-flow-layout")
], st);
var eo = Object.defineProperty, so = Object.getOwnPropertyDescriptor, ae = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? so(t, s) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (i ? n(t, s, o) : n(o)) || o);
  return i && o && eo(t, s, o), o;
};
let xt = class extends F {
  setConfig(e) {
    this.config = It(e);
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
xt.styles = ht`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;
ae([
  x({ attribute: !1 })
], xt.prototype, "hass", 2);
ae([
  x({ attribute: !1 })
], xt.prototype, "config", 2);
xt = ae([
  ut("home-energy-card")
], xt);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: !0,
  documentationURL: "https://github.com/AshGSmith/home-energy-card"
});
export {
  xt as HomeEnergyCard
};
