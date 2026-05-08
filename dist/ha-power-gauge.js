function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",_=f.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,_?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,M=`<${P}>`,R=document,U=()=>R.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,T="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,W=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=F(1),q=F(2),G=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Z=new WeakMap,J=R.createTreeWalker(R,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===H?"!--"===c[1]?o=L:void 0!==c[1]?o=z:void 0!==c[2]?(W.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=j):void 0!==c[3]&&(o=j):o===j?">"===c[0]?(o=r??H,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?j:'"'===c[3]?I:D):o===I||o===D?o=j:o===L||o===z?o=H:(o=j,r=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===H?i+M:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Q.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?rt:"@"===o[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),J.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===G)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}let tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=J.nextNode(),n++)}return J.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}};class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=X(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==G,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=X(this,s[i+o],e,o),a===G&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===G)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=A.litHtmlPolyfillSupport;at?.(Q,et),(A.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let lt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ut=(t=pt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ft(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return ft({...t,state:!0,attribute:!1})}const gt=1;let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const $t="important",yt=" !"+$t,vt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends _t{constructor(t){if(super(t),t.type!==gt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(yt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?$t:""):i[t]=s}}return G}}),bt="power-gauge-card",xt="power-gauge-card-editor",At=(t,e,i)=>Math.max(e,Math.min(i,t)),wt=(t,e,i)=>t+(e-t)*i;function Et(t){const e=t.replace("#","").trim(),i=3===e.length?e.split("").map(t=>t+t).join(""):e;return[parseInt(i.slice(0,2),16),parseInt(i.slice(2,4),16),parseInt(i.slice(4,6),16)]}function St(t,e,i){const s=Et(t),r=Et(e),n=Math.round(wt(s[0],r[0],i)),o=Math.round(wt(s[1],r[1],i)),a=Math.round(wt(s[2],r[2],i));return`#${n.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}`}function Ct(t,e,i,s){const r=(s-90)*Math.PI/180;return[t+i*Math.cos(r),e+i*Math.sin(r)]}function kt(t,e,i,s,r){const[n,o]=Ct(t,e,i,s),[a,c]=Ct(t,e,i,r);return`M ${n} ${o} A ${i} ${i} 0 ${r-s>180?1:0} 1 ${a} ${c}`}const Pt="#1ee0ff",Mt="#ff7a2b",Rt="#ff1a3c";function Ut(t,e,i,s,r){let n=e,o=i??s;return"number"==typeof t?n=t:t&&"object"==typeof t&&("number"==typeof t.value&&(n=t.value),"string"==typeof t.color&&t.color.trim().length>0&&(o=t.color)),{value:n,color:o,mood:r}}console.info("%c POWER-GAUGE-CARD %c v0.1.1 ","color:#fff; background:#1ee0ff; font-weight:600; padding:2px 6px; border-radius:3px 0 0 3px;","color:#1ee0ff; background:#0a0f1c; font-weight:600; padding:2px 6px; border-radius:0 3px 3px 0;"),(window.customCards=window.customCards||[]).push({type:bt,name:"Power Gauge Card",description:"A glowing, animated power consumption gauge that shifts colors with load.",preview:!0,documentationURL:"https://github.com/lirum/ha-power-gauge"});const Ot=200,Nt=200,Tt=150,Ht=130;let Lt=class extends lt{constructor(){super(...arguments),this._animated=0,this._live=0,this._stops=[],this._target=0,this._initialized=!1,this._animFrom=0,this._animTo=0,this._animStart=0,this._ambientStart=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Wt}),document.createElement(xt)}static getStubConfig(){return{type:`custom:${bt}`,entity:"",max:5e3}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity)throw new Error("You need to define an entity");this._config={min:0,max:5e3,precision:0,...t},this._stops=function(t){const e=t.min??0,i=t.max??5e3,s=Math.max(1,i-e),r=Ut(t.normal,e+.2*s,t.normal_color,Pt,"NORMAL"),n=Ut(t.warning,e+.6*s,t.warning_color,Mt,"WARNING"),o=Ut(t.critical,i,t.critical_color,Rt,"CRITICAL"),a=t=>{return{t:At((t.value-e)/s,0,1),...(i=t.color,{c1:i,c2:St(i,"#000000",.35),c3:St(i,"#000000",.7)}),mood:t.mood};var i};return[a(r),a(n),a(o)]}(this._config)}getCardSize(){return 5}connectedCallback(){super.connectedCallback(),this._ambientStart=performance.now(),this._startAmbient()}disconnectedCallback(){super.disconnectedCallback(),this._animRaf&&cancelAnimationFrame(this._animRaf),this._ambientRaf&&cancelAnimationFrame(this._ambientRaf)}willUpdate(t){if((t.has("hass")||t.has("_config"))&&this.hass&&this._config){const t=this._readEntityValue();this._initialized?t!==this._target&&(this._target=t,this._startAnim(t)):(this._initialized=!0,this._target=t,this._animated=t,this._live=t)}}_readEntityValue(){if(!this.hass||!this._config)return 0;const t=this.hass.states[this._config.entity];if(!t)return 0;const e=Number(t.state);return Number.isFinite(e)?e:0}_startAnim(t){this._animRaf&&cancelAnimationFrame(this._animRaf),this._animFrom=this._animated,this._animTo=t,this._animStart=performance.now();const e=t=>{const i=At((t-this._animStart)/700,0,1);this._animated=wt(this._animFrom,this._animTo,(t=>1-Math.pow(1-t,3))(i)),this._animRaf=i<1?requestAnimationFrame(e):void 0};this._animRaf=requestAnimationFrame(e)}_startAmbient(){const t=e=>{const i=(e-this._ambientStart)/1e3,s=.012*Math.sin(i*Math.PI*2/2.6);this._live=this._animated+s*this._animated,this._ambientRaf=requestAnimationFrame(t)};this._ambientRaf=requestAnimationFrame(t)}render(){if(!this._config||!this.hass)return V;const t=this.hass.states[this._config.entity];if(!t)return B`
        <ha-card>
          <div class="error">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=this._config.min??0,i=this._config.max??5e3,s=Math.max(1,i-e),r=this._live,n=At((r-e)/s,0,1),o=function(t,e){if(0===e.length)return{c1:"#1ee0ff",c2:"#2a7bff",c3:"#0a3aa0",mood:"NORMAL"};const i=[...e].sort((t,e)=>t.t-e.t),s=At(t,0,1);if(s<=i[0].t){const t=i[0];return{c1:t.c1,c2:t.c2,c3:t.c3,mood:t.mood}}for(let t=0;t<i.length-1;t++){const e=i[t],r=i[t+1];if(s<=r.t){const t=r.t-e.t,i=t>0?(s-e.t)/t:0;return{c1:St(e.c1,r.c1,i),c2:St(e.c2,r.c2,i),c3:St(e.c3,r.c3,i),mood:i<.5?e.mood:r.mood}}}const r=i[i.length-1];return{c1:r.c1,c2:r.c2,c3:r.c3,mood:r.mood}}(n,this._stops),a=this._config.unit??t.attributes.unit_of_measurement??"W",c=this._config.name??t.attributes.friendly_name??this._config.entity,l=this._config.precision??0,h={"--c1":o.c1,"--c2":o.c2,"--c3":o.c3},d=Ht+280*n,[p,u]=Ct(Ot,Nt,Tt,d);return B`
      <ha-card style=${vt(h)}>
        <div class="panel">
          <div class="header">
            <div>
              <div class="title">${c}</div>
              <div class="subtitle">Live · ${(i/1e3).toFixed(1)} ${"W"===a?"kW":a} max</div>
            </div>
          </div>

          <div class="stage">
            <div class="gauge">
              ${this._renderSvg(o,d)}
              <div class="center">
                <div class="core">
                  <div class="reading">
                    <div class="label-now">Live draw</div>
                    <div class="value">
                      ${this._format(r,l)}<span class="unit-inline">${a}</span>
                    </div>
                    <div class="unit">${this._secondaryLine(r,a,o)}</div>
                  </div>
                </div>
              </div>
              <div
                class="knob"
                style=${vt({left:p/400*100+"%",top:u/400*100+"%"})}
              ></div>
            </div>
          </div>

          <div class="status">
            <span><span class="pulse-dot"></span>Streaming</span>
            <span>Now <b>${this._format(r,l)} ${a}</b></span>
            <span>Limit <b>${this._formatLimit(i,a)}</b></span>
          </div>
        </div>
      </ha-card>
    `}_format(t,e){return e<=0?Math.round(t).toLocaleString():t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})}_formatLimit(t,e){return"W"===e&&t>=1e3?`${(t/1e3).toFixed(1)} kW`:`${t.toLocaleString()} ${e}`}_secondaryLine(t,e,i){return"W"===e?`${(t/1e3).toFixed(2)} kW · ${i.mood}`:i.mood}_renderSvg(t,e){const i=[],s=(e-Ht)/280;for(let e=0;e<=80;e++){const r=e/80,n=Ht+280*r,o=e%8==0,a=128,c=Tt-(o?8:14),[l,h]=Ct(Ot,Nt,a,n),[d,p]=Ct(Ot,Nt,c,n),u=r<=s;i.push(q`
        <line
          x1=${l} y1=${h} x2=${d} y2=${p}
          stroke=${u?t.c1:"rgba(255,255,255,0.08)"}
          stroke-width=${o?1.6:1}
          stroke-linecap="round"
          opacity=${u?1:.55}
          style=${u?`filter: drop-shadow(0 0 4px ${t.c1})`:""}
        />
      `)}return B`
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pg-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color=${t.c1} />
            <stop offset="60%" stop-color=${t.c2} />
            <stop offset="100%" stop-color=${t.c3} />
          </linearGradient>
          <radialGradient id="pg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stop-color="transparent" />
            <stop offset="80%" stop-color=${t.c2} stop-opacity="0.5" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
          <radialGradient id="pg-aura" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stop-color="transparent" />
            <stop offset="72%" stop-color=${t.c1} stop-opacity="0.18" />
            <stop offset="86%" stop-color=${t.c2} stop-opacity="0.32" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
          <filter id="pg-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="pg-blur-xl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <g class="spin-slow" style="transform-origin: 200px 200px;">
          <circle cx=${Ot} cy=${Nt} r=${174} fill="url(#pg-aura)" opacity="0.9" />
        </g>

        <path
          d=${kt(Ot,Nt,Tt,Ht,410)}
          stroke="rgba(255,255,255,0.06)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <g>${i}</g>

        <path
          d=${kt(Ot,Nt,Tt,Ht,e)}
          stroke=${t.c1}
          stroke-width="26"
          fill="none"
          stroke-linecap="round"
          opacity="0.35"
          filter="url(#pg-blur-xl)"
        />
        <path
          d=${kt(Ot,Nt,Tt,Ht,e)}
          stroke="url(#pg-stroke)"
          stroke-width="14"
          fill="none"
          stroke-linecap="round"
          opacity="0.6"
          filter="url(#pg-blur-lg)"
        />
        <path
          d=${kt(Ot,Nt,Tt,Ht,e)}
          stroke="url(#pg-stroke)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <g class="spin-fast" style="transform-origin: 200px 200px;">
          <circle
            cx=${Ot} cy=${Nt} r=${120}
            fill="none"
            stroke=${t.c2}
            stroke-opacity="0.18"
            stroke-width="1"
            stroke-dasharray="2 8"
          />
        </g>

        <circle
          cx=${Ot} cy=${Nt} r=${114}
          fill="url(#pg-halo)"
          opacity="0.7"
          class="shimmer"
        />
      </svg>
    `}};Lt.styles=o`
    :host {
      --bg-0: #05070d;
      --bg-1: #0a0f1c;
      --bg-2: #111b30;
      --text: #eef3ff;
      --muted: #6b7894;
      --c1: #1ee0ff;
      --c2: #2a7bff;
      --c3: #0a3aa0;

      display: block;
    }

    ha-card {
      background: radial-gradient(
          120% 80% at 50% 0%,
          rgba(40, 90, 200, 0.25),
          transparent 60%
        ),
        linear-gradient(180deg, #0b1326, #060a14);
      color: var(--text);
      border: 1px solid rgba(120, 160, 220, 0.12);
      border-radius: var(--ha-card-border-radius, 16px);
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(255, 255, 255, 0.02) inset;
      overflow: hidden;
      font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    }

    .panel {
      position: relative;
      padding: 22px 20px 18px;
      display: flex;
      flex-direction: column;
    }

    .panel::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.6), transparent),
        radial-gradient(1px 1px at 70% 60%, rgba(255, 255, 255, 0.4), transparent),
        radial-gradient(1px 1px at 40% 80%, rgba(255, 255, 255, 0.5), transparent),
        radial-gradient(1px 1px at 85% 20%, rgba(255, 255, 255, 0.3), transparent),
        radial-gradient(1px 1px at 15% 70%, rgba(255, 255, 255, 0.4), transparent);
      opacity: 0.3;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
      z-index: 1;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.4px;
    }

    .subtitle {
      font-size: 11px;
      color: var(--muted);
      margin-top: 4px;
      letter-spacing: 0.4px;
    }

    .stage {
      flex: 1;
      display: grid;
      place-items: center;
      position: relative;
      margin: 8px 0;
      z-index: 1;
    }

    .gauge {
      position: relative;
      width: 100%;
      max-width: 320px;
      aspect-ratio: 1 / 1;
    }

    .gauge svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .center {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .core {
      width: 56%;
      height: 56%;
      border-radius: 50%;
      background:
        radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.06), transparent 60%),
        radial-gradient(
          circle at 50% 100%,
          color-mix(in oklab, var(--c2) 35%, transparent),
          transparent 70%
        ),
        #050912;
      border: 1px solid rgba(255, 255, 255, 0.06);
      box-shadow:
        inset 0 0 40px color-mix(in oklab, var(--c2) 30%, transparent),
        inset 0 0 0 1px rgba(255, 255, 255, 0.04),
        0 0 60px color-mix(in oklab, var(--c1) 20%, transparent);
      display: grid;
      place-items: center;
      transition: box-shadow 0.6s;
    }

    .reading {
      text-align: center;
      padding: 0 8px;
    }

    .label-now {
      font-size: 9px;
      letter-spacing: 2.5px;
      color: var(--muted);
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .value {
      font-size: 36px;
      font-weight: 300;
      letter-spacing: -1.2px;
      font-variant-numeric: tabular-nums;
      color: #fff;
      text-shadow: 0 0 20px color-mix(in oklab, var(--c1) 60%, transparent);
      line-height: 1;
    }

    .unit-inline {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.55);
      margin-left: 4px;
    }

    .unit {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.55);
      margin-top: 6px;
      letter-spacing: 1.5px;
      font-weight: 500;
    }

    .knob {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #0a1020;
      border: 1.5px solid rgba(255, 255, 255, 0.6);
      transform: translate(-50%, -50%);
      pointer-events: none;
      box-shadow:
        0 0 0 4px rgba(0, 0, 0, 0.4),
        0 0 20px color-mix(in oklab, var(--c1) 80%, transparent);
      display: grid;
      place-items: center;
    }

    .knob::after {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--c1);
      box-shadow: 0 0 8px var(--c1);
    }

    .status {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 4px 0;
      font-size: 11px;
      color: var(--muted);
      font-variant-numeric: tabular-nums;
      position: relative;
      z-index: 1;
    }

    .status b {
      color: var(--text);
      font-weight: 600;
    }

    .pulse-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--c1);
      margin-right: 6px;
      animation: pg-pulse 1.4s ease-in-out infinite;
      box-shadow: 0 0 8px var(--c1);
    }

    @keyframes pg-pulse {
      0%,
      100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.4;
        transform: scale(0.7);
      }
    }

    @keyframes pg-spin {
      to {
        transform: rotate(360deg);
      }
    }

    .spin-slow {
      animation: pg-spin 24s linear infinite;
      transform-origin: 50% 50%;
    }

    .spin-fast {
      animation: pg-spin 9s linear infinite reverse;
      transform-origin: 50% 50%;
    }

    @keyframes pg-shimmer {
      0%,
      100% {
        opacity: 0.85;
      }
      50% {
        opacity: 1;
      }
    }

    .shimmer {
      animation: pg-shimmer 2.4s ease-in-out infinite;
    }

    .error {
      padding: 16px;
      color: var(--error-color, #db4437);
    }

    @media (prefers-reduced-motion: reduce) {
      .spin-slow,
      .spin-fast,
      .shimmer,
      .pulse-dot {
        animation: none;
      }
    }
  `,t([ft({attribute:!1})],Lt.prototype,"hass",void 0),t([mt()],Lt.prototype,"_config",void 0),t([mt()],Lt.prototype,"_animated",void 0),t([mt()],Lt.prototype,"_live",void 0),t([mt()],Lt.prototype,"_stops",void 0),Lt=t([dt(bt)],Lt);const zt={number:{mode:"box",step:1}},jt=[{name:"entity",required:!0,selector:{entity:{domain:["sensor","input_number"]}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"unit",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"min",selector:zt},{name:"max",selector:zt},{name:"precision",selector:{number:{mode:"box",min:0,max:4,step:1}}}]},{name:"",type:"expandable",title:"Color levels",schema:[{name:"",type:"grid",schema:[{name:"normal",selector:zt},{name:"normal_color",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"warning",selector:zt},{name:"warning_color",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"critical",selector:zt},{name:"critical_color",selector:{text:{}}}]}]}],Dt={entity:"Entity (required)",name:"Name (optional)",unit:"Unit override (optional)",min:"Minimum value",max:"Maximum value",precision:"Decimal places",normal:"Normal threshold",normal_color:`Normal color (default ${Pt})`,warning:"Warning threshold",warning_color:`Warning color (default ${Mt})`,critical:"Critical threshold",critical_color:`Critical color (default ${Rt})`};let It=class extends lt{constructor(){super(...arguments),this._computeLabel=t=>Dt[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${jt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}_valueChanged(t){const e=t.detail;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e.value},bubbles:!0,composed:!0}))}};It.styles=o`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `,t([ft({attribute:!1})],It.prototype,"hass",void 0),t([mt()],It.prototype,"_config",void 0),It=t([dt(xt)],It);var Wt=Object.freeze({__proto__:null,get PowerGaugeCardEditor(){return It}});
