function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,_?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+k,P=`<${M}>`,R=document,U=()=>R.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,z="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,H=/>/g,j=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=W(1),q=W(2),G=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),J=new WeakMap,Y=R.createTreeWalker(R,129);function Z(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===T?"!--"===l[1]?o=L:void 0!==l[1]?o=H:void 0!==l[2]?(F.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=r??T,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?I:D):o===I||o===D?o=j:o===L||o===H?o=T:(o=j,r=void 0);const h=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===T?i+P:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+k+h):i+k+(-2===c?e:h)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Q.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[n++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?rt:"@"===o[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),Y.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===G)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}let tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);Y.currentNode=s;let r=Y.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=Y.nextNode(),n++)}return Y.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}};class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=X(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==G,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=X(this,s[i+o],e,o),a===G&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===G)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Q,et),(w.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;let ct=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ut=(t=pt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return mt({...t,state:!0,attribute:!1})}const gt=1;let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const bt="important",vt=" !"+bt,$t=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends _t{constructor(t){if(super(t),t.type!==gt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(vt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?bt:""):i[t]=s}}return G}}),yt="power-gauge-card",xt="power-gauge-card-editor",wt="power-gauge-bar-card",At="power-gauge-bar-card-editor",Et=(t,e,i)=>Math.max(e,Math.min(i,t)),St=(t,e,i)=>t+(e-t)*i;function Ct(t){const e=t.replace("#","").trim(),i=3===e.length?e.split("").map(t=>t+t).join(""):e;return[parseInt(i.slice(0,2),16),parseInt(i.slice(2,4),16),parseInt(i.slice(4,6),16)]}function kt(t,e,i){const s=Ct(t),r=Ct(e),n=Math.round(St(s[0],r[0],i)),o=Math.round(St(s[1],r[1],i)),a=Math.round(St(s[2],r[2],i));return`#${n.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}`}function Mt(t,e){if(0===e.length)return{c1:"#1ee0ff",c2:"#2a7bff",c3:"#0a3aa0",mood:"NORMAL"};const i=[...e].sort((t,e)=>t.t-e.t),s=Et(t,0,1);if(s<=i[0].t){const t=i[0];return{c1:t.c1,c2:t.c2,c3:t.c3,mood:t.mood}}for(let t=0;t<i.length-1;t++){const e=i[t],r=i[t+1];if(s<=r.t){const t=r.t-e.t,i=t>0?(s-e.t)/t:0;return{c1:kt(e.c1,r.c1,i),c2:kt(e.c2,r.c2,i),c3:kt(e.c3,r.c3,i),mood:i<.5?e.mood:r.mood}}}const r=i[i.length-1];return{c1:r.c1,c2:r.c2,c3:r.c3,mood:r.mood}}function Pt(t,e,i,s){const r=(s-90)*Math.PI/180;return[t+i*Math.cos(r),e+i*Math.sin(r)]}function Rt(t,e,i,s,r){const[n,o]=Pt(t,e,i,s),[a,l]=Pt(t,e,i,r);return`M ${n} ${o} A ${i} ${i} 0 ${r-s>180?1:0} 1 ${a} ${l}`}const Ut=t=>1-Math.pow(1-t,3),Ot="#1ee0ff",Nt="#ff7a2b",zt="#ff1a3c";function Tt(t,e,i,s,r){let n=e,o=i??s;return"number"==typeof t?n=t:t&&"object"==typeof t&&("number"==typeof t.value&&(n=t.value),"string"==typeof t.color&&t.color.trim().length>0&&(o=t.color)),{value:n,color:o,mood:r}}function Lt(t){const e=t.min??0,i=t.max??5e3,s=Math.max(1,i-e),r=Tt(t.normal,e+.2*s,t.normal_color,Ot,"NORMAL"),n=Tt(t.warning,e+.6*s,t.warning_color,Nt,"WARNING"),o=Tt(t.critical,i,t.critical_color,zt,"CRITICAL"),a=t=>{return{t:Et((t.value-e)/s,0,1),...(i=t.color,{c1:i,c2:kt(i,"#000000",.35),c3:kt(i,"#000000",.7)}),mood:t.mood};var i};return[a(r),a(n),a(o)]}(window.customCards=window.customCards||[]).push({type:yt,name:"Power Gauge Card",description:"A glowing, animated power consumption gauge that shifts colors with load.",preview:!0,documentationURL:"https://github.com/lirum/ha-power-gauge"});const Ht=200,jt=200,Dt=150,It=130;let Ft=class extends ct{constructor(){super(...arguments),this._animated=0,this._live=0,this._stops=[],this._target=0,this._initialized=!1,this._animFrom=0,this._animTo=0,this._animStart=0,this._ambientStart=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Jt}),document.createElement(xt)}static getStubConfig(){return{type:`custom:${yt}`,entity:"",max:5e3}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity)throw new Error("You need to define an entity");this._config={min:0,max:5e3,precision:0,rolling_numbers:!0,...t},this._stops=Lt(this._config)}getCardSize(){return 5}connectedCallback(){super.connectedCallback(),this._ambientStart=performance.now(),this._startAmbient()}disconnectedCallback(){super.disconnectedCallback(),this._animRaf&&cancelAnimationFrame(this._animRaf),this._ambientRaf&&cancelAnimationFrame(this._ambientRaf)}willUpdate(t){if(!this.hass||!this._config)return;const e=this._readEntityValue();return null!==e?this._initialized?void(e!==this._target&&(this._target=e,this._startAnim(e))):(this._initialized=!0,this._target=e,this._animated=e,void(this._live=e)):void 0}_readEntityValue(){if(!this.hass||!this._config)return null;const t=this.hass.states[this._config.entity];if(!t)return null;if("unavailable"===t.state||"unknown"===t.state)return null;const e=Number(t.state);return Number.isFinite(e)?e:null}_startAnim(t){this._animRaf&&cancelAnimationFrame(this._animRaf),this._animFrom=this._animated,this._animTo=t,this._animStart=performance.now();const e=t=>{const i=Et((t-this._animStart)/700,0,1);this._animated=St(this._animFrom,this._animTo,Ut(i)),this._animRaf=i<1?requestAnimationFrame(e):void 0};this._animRaf=requestAnimationFrame(e)}_startAmbient(){const t=e=>{if(this._config?.rolling_numbers??1){const t=(e-this._ambientStart)/1e3,i=.012*Math.sin(t*Math.PI*2/2.6);this._live=this._animated+i*this._animated}else this._live=this._animated;this._ambientRaf=requestAnimationFrame(t)};this._ambientRaf=requestAnimationFrame(t)}render(){if(!this._config||!this.hass)return V;const t=this.hass.states[this._config.entity];if(!t)return B`
        <ha-card>
          <div class="error">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=this._config.min??0,i=this._config.max??5e3,s=Math.max(1,i-e),r=this._live,n=Et((r-e)/s,0,1),o=Mt(n,this._stops),a=this._config.unit??t.attributes.unit_of_measurement??"W",l=this._config.name??t.attributes.friendly_name??this._config.entity,c=this._config.precision??0,d=this._initialized,h=d?this._format(r,c):"—",p=d?this._secondaryLine(r,a,o):"WAITING FOR DATA",u={"--c1":o.c1,"--c2":o.c2,"--c3":o.c3},m=It+280*n,[f,g]=Pt(Ht,jt,Dt,m);return B`
      <ha-card style=${$t(u)}>
        <div class="panel">
          <div class="header">
            <div>
              <div class="title">${l}</div>
              <div class="subtitle">Live · ${(i/1e3).toFixed(1)} ${"W"===a?"kW":a} max</div>
            </div>
          </div>

          <div class="stage">
            <div class="gauge">
              ${this._renderSvg(o,m)}
              <div class="center">
                <div class="core">
                  <div class="reading">
                    <div class="label-now">Live draw</div>
                    <div class="value">
                      ${h}<span class="unit-inline">${a}</span>
                    </div>
                    <div class="unit">${p}</div>
                  </div>
                </div>
              </div>
              <div
                class="knob"
                style=${$t({left:f/400*100+"%",top:g/400*100+"%"})}
              ></div>
            </div>
          </div>

          <div class="status">
            <span><span class="pulse-dot"></span>${d?"Streaming":"Connecting"}</span>
            <span>Now <b>${h} ${a}</b></span>
            <span>Limit <b>${this._formatLimit(i,a)}</b></span>
          </div>
        </div>
      </ha-card>
    `}_format(t,e){return e<=0?Math.round(t).toLocaleString():t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})}_formatLimit(t,e){return"W"===e&&t>=1e3?`${(t/1e3).toFixed(1)} kW`:`${t.toLocaleString()} ${e}`}_secondaryLine(t,e,i){return"W"===e?`${(t/1e3).toFixed(2)} kW · ${i.mood}`:i.mood}_renderSvg(t,e){const i=[],s=(e-It)/280;for(let e=0;e<=80;e++){const r=e/80,n=It+280*r,o=e%8==0,a=128,l=Dt-(o?8:14),[c,d]=Pt(Ht,jt,a,n),[h,p]=Pt(Ht,jt,l,n),u=r<=s;i.push(q`
        <line
          x1=${c} y1=${d} x2=${h} y2=${p}
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
          <circle cx=${Ht} cy=${jt} r=${174} fill="url(#pg-aura)" opacity="0.9" />
        </g>

        <path
          d=${Rt(Ht,jt,Dt,It,410)}
          stroke="rgba(255,255,255,0.06)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <g>${i}</g>

        <path
          d=${Rt(Ht,jt,Dt,It,e)}
          stroke=${t.c1}
          stroke-width="26"
          fill="none"
          stroke-linecap="round"
          opacity="0.35"
          filter="url(#pg-blur-xl)"
        />
        <path
          d=${Rt(Ht,jt,Dt,It,e)}
          stroke="url(#pg-stroke)"
          stroke-width="14"
          fill="none"
          stroke-linecap="round"
          opacity="0.6"
          filter="url(#pg-blur-lg)"
        />
        <path
          d=${Rt(Ht,jt,Dt,It,e)}
          stroke="url(#pg-stroke)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />

        <g class="spin-fast" style="transform-origin: 200px 200px;">
          <circle
            cx=${Ht} cy=${jt} r=${120}
            fill="none"
            stroke=${t.c2}
            stroke-opacity="0.18"
            stroke-width="1"
            stroke-dasharray="2 8"
          />
        </g>

        <circle
          cx=${Ht} cy=${jt} r=${114}
          fill="url(#pg-halo)"
          opacity="0.7"
          class="shimmer"
        />
      </svg>
    `}};Ft.styles=o`
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
      font-family: 'SF Mono', 'JetBrains Mono', 'Menlo', 'Consolas', ui-monospace, monospace;
      letter-spacing: 0;
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
  `,t([mt({attribute:!1})],Ft.prototype,"hass",void 0),t([ft()],Ft.prototype,"_config",void 0),t([ft()],Ft.prototype,"_animated",void 0),t([ft()],Ft.prototype,"_live",void 0),t([ft()],Ft.prototype,"_stops",void 0),Ft=t([ht(yt)],Ft),(window.customCards=window.customCards||[]).push({type:wt,name:"Power Gauge Bar Card",description:"A compact linear power gauge — stack one row per device, sharing color levels.",preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-power-gauge"});let Wt=class extends ct{constructor(){super(...arguments),this._live={},this._animated={},this._targets={},this._ramps={},this._initialized=new Set,this._ambientStart=0,this._loop=()=>{const t=performance.now(),e=this._config?.rolling_numbers??!0,i=(t-this._ambientStart)/1e3,s=e?.012*Math.sin(i*Math.PI*2/2.6):0,r={};for(const i of Object.keys(this._animated)){const n=this._ramps[i];if(n){const e=Et((t-n.start)/500,0,1);this._animated[i]=St(n.from,n.to,Ut(e)),e>=1&&delete this._ramps[i]}const o=this._animated[i];r[i]=e?o+s*o:o}this._live=r,this._raf=requestAnimationFrame(this._loop)}}static async getConfigElement(){return await Promise.resolve().then(function(){return Xt}),document.createElement(At)}static getStubConfig(){return{type:`custom:${wt}`,entities:[],max:5e3}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!Array.isArray(t.entities)||0===t.entities.length)throw new Error("You need to define at least one entity");this._config={min:0,max:5e3,precision:0,rolling_numbers:!0,...t}}getCardSize(){return Math.max(1,this._config?.entities.length??1)}connectedCallback(){super.connectedCallback(),this._ambientStart=performance.now(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),this._raf&&cancelAnimationFrame(this._raf)}willUpdate(t){if(this.hass&&this._config)for(const t of this._config.entities){const e="string"==typeof t?t:t.entity;if(!e)continue;const i=this._readValue(e);null!==i&&(this._initialized.has(e)?this._targets[e]!==i&&(this._targets[e]=i,this._ramps[e]={from:this._animated[e]??i,to:i,start:performance.now()}):(this._initialized.add(e),this._targets[e]=i,this._animated[e]=i))}}_readValue(t){if(!this.hass)return null;const e=this.hass.states[t];if(!e)return null;if("unavailable"===e.state||"unknown"===e.state)return null;const i=Number(e.state);return Number.isFinite(i)?i:null}_resolveRow(t){if(!this.hass||!this._config)return null;const e="object"==typeof t&&null!==t,i=e?t.entity:t;if(!i)return null;const s=this.hass.states[i],r={...this._config,...e?t:{}},n=r.min??0,o=r.max??5e3,a=r.unit??s?.attributes.unit_of_measurement??"W",l=r.precision??0;return{entity:i,name:e&&t.name||s?.attributes.friendly_name||i,unit:a,precision:l,min:n,max:o,stops:Lt(r)}}render(){if(!this._config||!this.hass)return V;const t=this._config.entities.map(t=>this._resolveRow(t)).filter(t=>null!==t);return B`
      <ha-card>
        <div class="wrap">
          ${this._config.title?B`<div class="card-title">${this._config.title}</div>`:V}
          <div class="stack">${t.map(t=>this._renderRow(t))}</div>
        </div>
      </ha-card>
    `}_renderRow(t){const e=this._initialized.has(t.entity),i=this._live[t.entity]??this._animated[t.entity]??0,s=Math.max(1,t.max-t.min),r=Et((i-t.min)/s,0,1),n=Mt(r,t.stops),o=e?this._format(i,t.precision):"—";return B`
      <div
        class="row"
        style=${$t({"--c1":n.c1,"--c2":n.c2,"--w":100*r+"%"})}
      >
        <div class="label">${t.name}</div>
        <div class="value">${o}<span class="unit">${t.unit}</span></div>
        <div class="track" aria-hidden="true">
          <div class="fill"></div>
          <div class="cap"></div>
        </div>
      </div>
    `}_format(t,e){return e<=0?Math.round(t).toLocaleString():t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})}};Wt.styles=o`
    :host {
      display: block;
    }

    ha-card {
      background: linear-gradient(180deg, #0b1326, #060a14);
      color: #eef3ff;
      border: 1px solid rgba(120, 160, 220, 0.12);
      border-radius: var(--ha-card-border-radius, 14px);
      box-shadow:
        0 12px 28px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(255, 255, 255, 0.02) inset;
      overflow: hidden;
      font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    }

    .wrap {
      padding: 14px 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
      padding: 2px 2px 0;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .row {
      --c1: #1ee0ff;
      --c2: #2a7bff;
      position: relative;
      padding: 10px 14px 12px;
      border-radius: 12px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.005)
      );
      border: 1px solid rgba(120, 160, 220, 0.1);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      column-gap: 14px;
      row-gap: 8px;
      align-items: center;
    }

    .label {
      grid-column: 1;
      grid-row: 1;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.78);
      letter-spacing: 0.2px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      grid-column: 2;
      grid-row: 1;
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.2px;
    }

    .value .unit {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.55);
      margin-left: 4px;
      font-weight: 400;
    }

    .track {
      grid-column: 1 / -1;
      grid-row: 2;
      position: relative;
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .fill {
      position: absolute;
      inset: 0;
      width: var(--w);
      border-radius: 999px;
      background: linear-gradient(90deg, var(--c1), var(--c2));
      box-shadow:
        0 0 8px color-mix(in oklab, var(--c1) 50%, transparent),
        0 0 14px color-mix(in oklab, var(--c2) 30%, transparent);
      transition: background 0.4s;
    }

    .cap {
      position: absolute;
      top: 50%;
      left: var(--w);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--c1);
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 8px var(--c1);
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }
    }
  `,t([mt({attribute:!1})],Wt.prototype,"hass",void 0),t([ft()],Wt.prototype,"_config",void 0),t([ft()],Wt.prototype,"_live",void 0),Wt=t([ht(wt)],Wt),console.info("%c POWER-GAUGE %c v0.2.0 ","color:#fff; background:#1ee0ff; font-weight:600; padding:2px 6px; border-radius:3px 0 0 3px;","color:#1ee0ff; background:#0a0f1c; font-weight:600; padding:2px 6px; border-radius:0 3px 3px 0;");const Bt={number:{mode:"box",step:1}},qt=[{name:"entity",required:!0,selector:{entity:{domain:["sensor","input_number"]}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"unit",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"min",selector:Bt},{name:"max",selector:Bt},{name:"precision",selector:{number:{mode:"box",min:0,max:4,step:1}}}]},{name:"rolling_numbers",selector:{boolean:{}}},{name:"",type:"expandable",title:"Color levels",schema:[{name:"",type:"grid",schema:[{name:"normal",selector:Bt},{name:"normal_color",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"warning",selector:Bt},{name:"warning_color",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"critical",selector:Bt},{name:"critical_color",selector:{text:{}}}]}]}],Gt={entity:"Entity (required)",name:"Name (optional)",unit:"Unit override (optional)",min:"Minimum value",max:"Maximum value",precision:"Decimal places",rolling_numbers:"Rolling numbers (rapid fluctuation around the live value)",normal:"Normal threshold",normal_color:`Normal color (default ${Ot})`,warning:"Warning threshold",warning_color:`Warning color (default ${Nt})`,critical:"Critical threshold",critical_color:`Critical color (default ${zt})`};let Vt=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>Gt[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${qt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V}_valueChanged(t){const e=t.detail;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e.value},bubbles:!0,composed:!0}))}};Vt.styles=o`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `,t([mt({attribute:!1})],Vt.prototype,"hass",void 0),t([ft()],Vt.prototype,"_config",void 0),Vt=t([ht(xt)],Vt);var Jt=Object.freeze({__proto__:null,get PowerGaugeCardEditor(){return Vt}});const Yt={number:{mode:"box",step:1}},Zt=[{name:"title",selector:{text:{}}},{name:"entities",required:!0,selector:{entity:{multiple:!0,domain:["sensor","input_number"]}}},{name:"",type:"grid",schema:[{name:"min",selector:Yt},{name:"max",selector:Yt},{name:"precision",selector:{number:{mode:"box",min:0,max:4,step:1}}},{name:"unit",selector:{text:{}}}]},{name:"rolling_numbers",selector:{boolean:{}}},{name:"",type:"expandable",title:"Color levels",schema:[{name:"",type:"grid",schema:[{name:"normal",selector:Yt},{name:"normal_color",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"warning",selector:Yt},{name:"warning_color",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"critical",selector:Yt},{name:"critical_color",selector:{text:{}}}]}]}],Kt={title:"Card title (optional)",entities:"Entities (one bar per entity)",min:"Minimum value",max:"Maximum value",precision:"Decimal places",unit:"Unit override (optional)",rolling_numbers:"Rolling numbers (rapid fluctuation around the live value)",normal:"Normal threshold",normal_color:`Normal color (default ${Ot})`,warning:"Warning threshold",warning_color:`Warning color (default ${Nt})`,critical:"Critical threshold",critical_color:`Critical color (default ${zt})`};let Qt=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>Kt[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Zt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="hint">
        For per-row overrides (custom name, max, or color per device), edit the
        card YAML — each entry under <code>entities</code> can be
        <code>{ entity, name, max, normal, warning, critical, ... }</code>.
      </p>
    `:V}_valueChanged(t){const e=t.detail;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e.value},bubbles:!0,composed:!0}))}};Qt.styles=o`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
    .hint {
      margin: 12px 4px 0;
      font-size: 12px;
      color: var(--secondary-text-color, #6b7894);
    }
    code {
      font-family: ui-monospace, 'SF Mono', Menlo, monospace;
      font-size: 11px;
      background: rgba(127, 127, 127, 0.12);
      padding: 1px 5px;
      border-radius: 4px;
    }
  `,t([mt({attribute:!1})],Qt.prototype,"hass",void 0),t([ft()],Qt.prototype,"_config",void 0),Qt=t([ht(At)],Qt);var Xt=Object.freeze({__proto__:null,get PowerGaugeBarCardEditor(){return Qt}});
