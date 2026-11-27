(function(w,Ot){typeof exports=="object"&&typeof module<"u"?Ot(exports):typeof define=="function"&&define.amd?define(["exports"],Ot):(w=typeof globalThis<"u"?globalThis:w||self,Ot(w.DataStatistics={}))})(this,(function(w){"use strict";const Ot=globalThis,Ei=Ot.ShadowRoot&&(Ot.ShadyCSS===void 0||Ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ri=Symbol(),Ps=new WeakMap;let Os=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ri)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ei&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ps.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ps.set(e,t))}return t}toString(){return this.cssText}};const uo=i=>new Os(typeof i=="string"?i:i+"",void 0,Ri),Ht=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((s,n,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[a+1]),i[0]);return new Os(e,i,Ri)},fo=(i,t)=>{if(Ei)i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const s=document.createElement("style"),n=Ot.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},Es=Ei?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return uo(e)})(i):i;const{is:po,defineProperty:go,getOwnPropertyDescriptor:mo,getOwnPropertyNames:bo,getOwnPropertySymbols:vo,getPrototypeOf:xo}=Object,Je=globalThis,Rs=Je.trustedTypes,yo=Rs?Rs.emptyScript:"",_o=Je.reactiveElementPolyfillSupport,_e=(i,t)=>i,Qe={toAttribute(i,t){switch(t){case Boolean:i=i?yo:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Li=(i,t)=>!po(i,t),Ls={attribute:!0,type:String,converter:Qe,reflect:!1,useDefault:!1,hasChanged:Li};Symbol.metadata??=Symbol("metadata"),Je.litPropertyMetadata??=new WeakMap;let re=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ls){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&go(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){const{get:n,set:a}=mo(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){const r=n?.call(this);a?.call(this,o),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ls}static _$Ei(){if(this.hasOwnProperty(_e("elementProperties")))return;const t=xo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_e("properties"))){const e=this.properties,s=[...bo(e),...vo(e)];for(const n of s)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(Es(n))}else t!==void 0&&e.push(Es(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fo(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){const a=(s.converter?.toAttribute!==void 0?s.converter:Qe).toAttribute(e,s.type);this._$Em=t,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(t,e){const s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const a=s.getPropertyOptions(n),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Qe;this._$Em=n;const r=o.fromAttribute(e,a.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){const n=this.constructor,a=this[t];if(s??=n.getPropertyOptions(t),!((s.hasChanged??Li)(a,e)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:a},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,a]of s){const{wrapped:o}=a,r=this[n];o!==!0||this._$AL.has(n)||r===void 0||this.C(n,void 0,a,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};re.elementStyles=[],re.shadowRootOptions={mode:"open"},re[_e("elementProperties")]=new Map,re[_e("finalized")]=new Map,_o?.({ReactiveElement:re}),(Je.reactiveElementVersions??=[]).push("2.1.1");const Ii=globalThis,ti=Ii.trustedTypes,Is=ti?ti.createPolicy("lit-html",{createHTML:i=>i}):void 0,zs="$lit$",Et=`lit$${Math.random().toFixed(9).slice(2)}$`,Fs="?"+Et,wo=`<${Fs}>`,jt=document,we=()=>jt.createComment(""),ke=i=>i===null||typeof i!="object"&&typeof i!="function",zi=Array.isArray,ko=i=>zi(i)||typeof i?.[Symbol.iterator]=="function",Fi=`[ 	
\f\r]`,Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bs=/-->/g,Ns=/>/g,Vt=RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Hs=/'/g,js=/"/g,Vs=/^(?:script|style|textarea|title)$/i,Ws=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),y=Ws(1),st=Ws(2),le=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Us=new WeakMap,Wt=jt.createTreeWalker(jt,129);function Ys(i,t){if(!zi(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Is!==void 0?Is.createHTML(t):t}const So=(i,t)=>{const e=i.length-1,s=[];let n,a=t===2?"<svg>":t===3?"<math>":"",o=Se;for(let r=0;r<e;r++){const l=i[r];let c,d,h=-1,u=0;for(;u<l.length&&(o.lastIndex=u,d=o.exec(l),d!==null);)u=o.lastIndex,o===Se?d[1]==="!--"?o=Bs:d[1]!==void 0?o=Ns:d[2]!==void 0?(Vs.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=Vt):d[3]!==void 0&&(o=Vt):o===Vt?d[0]===">"?(o=n??Se,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,c=d[1],o=d[3]===void 0?Vt:d[3]==='"'?js:Hs):o===js||o===Hs?o=Vt:o===Bs||o===Ns?o=Se:(o=Vt,n=void 0);const f=o===Vt&&i[r+1].startsWith("/>")?" ":"";a+=o===Se?l+wo:h>=0?(s.push(c),l.slice(0,h)+zs+l.slice(h)+Et+f):l+Et+(h===-2?r:f)}return[Ys(i,a+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class Me{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let a=0,o=0;const r=t.length-1,l=this.parts,[c,d]=So(t,e);if(this.el=Me.createElement(c,s),Wt.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=Wt.nextNode())!==null&&l.length<r;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(zs)){const u=d[o++],f=n.getAttribute(h).split(Et),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:a,name:g[2],strings:f,ctor:g[1]==="."?Co:g[1]==="?"?$o:g[1]==="@"?To:ei}),n.removeAttribute(h)}else h.startsWith(Et)&&(l.push({type:6,index:a}),n.removeAttribute(h));if(Vs.test(n.tagName)){const h=n.textContent.split(Et),u=h.length-1;if(u>0){n.textContent=ti?ti.emptyScript:"";for(let f=0;f<u;f++)n.append(h[f],we()),Wt.nextNode(),l.push({type:2,index:++a});n.append(h[u],we())}}}else if(n.nodeType===8)if(n.data===Fs)l.push({type:2,index:a});else{let h=-1;for(;(h=n.data.indexOf(Et,h+1))!==-1;)l.push({type:7,index:a}),h+=Et.length-1}a++}}static createElement(t,e){const s=jt.createElement("template");return s.innerHTML=t,s}}function ce(i,t,e=i,s){if(t===le)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl;const a=ke(t)?void 0:t._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),a===void 0?n=void 0:(n=new a(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=ce(i,n._$AS(i,t.values),n,s)),t}class Mo{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??jt).importNode(e,!0);Wt.currentNode=n;let a=Wt.nextNode(),o=0,r=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Ce(a,a.nextSibling,this,t):l.type===1?c=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(c=new Ao(a,this,t)),this._$AV.push(c),l=s[++r]}o!==l?.index&&(a=Wt.nextNode(),o++)}return Wt.currentNode=jt,n}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Ce{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ce(this,t,e),ke(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==le&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ko(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&ke(this._$AH)?this._$AA.nextSibling.data=t:this.T(jt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Me.createElement(Ys(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{const a=new Mo(n,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=Us.get(t.strings);return e===void 0&&Us.set(t.strings,e=new Me(t)),e}k(t){zi(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const a of t)n===e.length?e.push(s=new Ce(this.O(we()),this.O(we()),this,this.options)):s=e[n],s._$AI(a),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ei{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,a){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,e=this,s,n){const a=this.strings;let o=!1;if(a===void 0)t=ce(this,t,e,0),o=!ke(t)||t!==this._$AH&&t!==le,o&&(this._$AH=t);else{const r=t;let l,c;for(t=a[0],l=0;l<a.length-1;l++)c=ce(this,r[s+l],e,l),c===le&&(c=this._$AH[l]),o||=!ke(c)||c!==this._$AH[l],c===A?t=A:t!==A&&(t+=(c??"")+a[l+1]),this._$AH[l]=c}o&&!n&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Co extends ei{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class $o extends ei{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class To extends ei{constructor(t,e,s,n,a){super(t,e,s,n,a),this.type=5}_$AI(t,e=this){if((t=ce(this,t,e,0)??A)===le)return;const s=this._$AH,n=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==A&&(s===A||n);n&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ao{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){ce(this,t)}}const Do=Ii.litHtmlPolyfillSupport;Do?.(Me,Ce),(Ii.litHtmlVersions??=[]).push("3.3.1");const Po=(i,t,e)=>{const s=e?.renderBefore??t;let n=s._$litPart$;if(n===void 0){const a=e?.renderBefore??null;s._$litPart$=n=new Ce(t.insertBefore(we(),a),a,void 0,e??{})}return n._$AI(i),n};const Bi=globalThis;class bt extends re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Po(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return le}}bt._$litElement$=!0,bt.finalized=!0,Bi.litElementHydrateSupport?.({LitElement:bt});const Oo=Bi.litElementPolyfillSupport;Oo?.({LitElement:bt}),(Bi.litElementVersions??=[]).push("4.2.1");const de=i=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(i,t)})):customElements.define(i,t)};const Eo={attribute:!0,type:String,converter:Qe,reflect:!1,hasChanged:Li},Ro=(i=Eo,t,e)=>{const{kind:s,metadata:n}=e;let a=globalThis.litPropertyMetadata.get(n);if(a===void 0&&globalThis.litPropertyMetadata.set(n,a=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(e.name,i),s==="accessor"){const{name:o}=e;return{set(r){const l=t.get.call(this);t.set.call(this,r),this.requestUpdate(o,l,i)},init(r){return r!==void 0&&this.C(o,void 0,i,r),r}}}if(s==="setter"){const{name:o}=e;return function(r){const l=this[o];t.call(this,r),this.requestUpdate(o,l,i)}}throw Error("Unsupported decorator location: "+s)};function nt(i){return(t,e)=>typeof e=="object"?Ro(i,t,e):((s,n,a)=>{const o=n.hasOwnProperty(a);return n.constructor.createProperty(a,s),o?Object.getOwnPropertyDescriptor(n,a):void 0})(i,t,e)}function E(i){return nt({...i,state:!0,attribute:!1})}function $e(i){return i+.5|0}const Rt=(i,t,e)=>Math.max(Math.min(i,e),t);function Te(i){return Rt($e(i*2.55),0,255)}function Lt(i){return Rt($e(i*255),0,255)}function St(i){return Rt($e(i/2.55)/100,0,1)}function Xs(i){return Rt($e(i*100),0,100)}const gt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Ni=[..."0123456789ABCDEF"],Lo=i=>Ni[i&15],Io=i=>Ni[(i&240)>>4]+Ni[i&15],ii=i=>(i&240)>>4===(i&15),zo=i=>ii(i.r)&&ii(i.g)&&ii(i.b)&&ii(i.a);function Fo(i){var t=i.length,e;return i[0]==="#"&&(t===4||t===5?e={r:255&gt[i[1]]*17,g:255&gt[i[2]]*17,b:255&gt[i[3]]*17,a:t===5?gt[i[4]]*17:255}:(t===7||t===9)&&(e={r:gt[i[1]]<<4|gt[i[2]],g:gt[i[3]]<<4|gt[i[4]],b:gt[i[5]]<<4|gt[i[6]],a:t===9?gt[i[7]]<<4|gt[i[8]]:255})),e}const Bo=(i,t)=>i<255?t(i):"";function No(i){var t=zo(i)?Lo:Io;return i?"#"+t(i.r)+t(i.g)+t(i.b)+Bo(i.a,t):void 0}const Ho=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function qs(i,t,e){const s=t*Math.min(e,1-e),n=(a,o=(a+i/30)%12)=>e-s*Math.max(Math.min(o-3,9-o,1),-1);return[n(0),n(8),n(4)]}function jo(i,t,e){const s=(n,a=(n+i/60)%6)=>e-e*t*Math.max(Math.min(a,4-a,1),0);return[s(5),s(3),s(1)]}function Vo(i,t,e){const s=qs(i,1,.5);let n;for(t+e>1&&(n=1/(t+e),t*=n,e*=n),n=0;n<3;n++)s[n]*=1-t-e,s[n]+=t;return s}function Wo(i,t,e,s,n){return i===n?(t-e)/s+(t<e?6:0):t===n?(e-i)/s+2:(i-t)/s+4}function Hi(i){const e=i.r/255,s=i.g/255,n=i.b/255,a=Math.max(e,s,n),o=Math.min(e,s,n),r=(a+o)/2;let l,c,d;return a!==o&&(d=a-o,c=r>.5?d/(2-a-o):d/(a+o),l=Wo(e,s,n,d,a),l=l*60+.5),[l|0,c||0,r]}function ji(i,t,e,s){return(Array.isArray(t)?i(t[0],t[1],t[2]):i(t,e,s)).map(Lt)}function Vi(i,t,e){return ji(qs,i,t,e)}function Uo(i,t,e){return ji(Vo,i,t,e)}function Yo(i,t,e){return ji(jo,i,t,e)}function Gs(i){return(i%360+360)%360}function Xo(i){const t=Ho.exec(i);let e=255,s;if(!t)return;t[5]!==s&&(e=t[6]?Te(+t[5]):Lt(+t[5]));const n=Gs(+t[2]),a=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?s=Uo(n,a,o):t[1]==="hsv"?s=Yo(n,a,o):s=Vi(n,a,o),{r:s[0],g:s[1],b:s[2],a:e}}function qo(i,t){var e=Hi(i);e[0]=Gs(e[0]+t),e=Vi(e),i.r=e[0],i.g=e[1],i.b=e[2]}function Go(i){if(!i)return;const t=Hi(i),e=t[0],s=Xs(t[1]),n=Xs(t[2]);return i.a<255?`hsla(${e}, ${s}%, ${n}%, ${St(i.a)})`:`hsl(${e}, ${s}%, ${n}%)`}const Ks={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Zs={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Ko(){const i={},t=Object.keys(Zs),e=Object.keys(Ks);let s,n,a,o,r;for(s=0;s<t.length;s++){for(o=r=t[s],n=0;n<e.length;n++)a=e[n],r=r.replace(a,Ks[a]);a=parseInt(Zs[o],16),i[r]=[a>>16&255,a>>8&255,a&255]}return i}let si;function Zo(i){si||(si=Ko(),si.transparent=[0,0,0,0]);const t=si[i.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const Jo=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Qo(i){const t=Jo.exec(i);let e=255,s,n,a;if(t){if(t[7]!==s){const o=+t[7];e=t[8]?Te(o):Rt(o*255,0,255)}return s=+t[1],n=+t[3],a=+t[5],s=255&(t[2]?Te(s):Rt(s,0,255)),n=255&(t[4]?Te(n):Rt(n,0,255)),a=255&(t[6]?Te(a):Rt(a,0,255)),{r:s,g:n,b:a,a:e}}}function tr(i){return i&&(i.a<255?`rgba(${i.r}, ${i.g}, ${i.b}, ${St(i.a)})`:`rgb(${i.r}, ${i.g}, ${i.b})`)}const Wi=i=>i<=.0031308?i*12.92:Math.pow(i,1/2.4)*1.055-.055,he=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4);function er(i,t,e){const s=he(St(i.r)),n=he(St(i.g)),a=he(St(i.b));return{r:Lt(Wi(s+e*(he(St(t.r))-s))),g:Lt(Wi(n+e*(he(St(t.g))-n))),b:Lt(Wi(a+e*(he(St(t.b))-a))),a:i.a+e*(t.a-i.a)}}function ni(i,t,e){if(i){let s=Hi(i);s[t]=Math.max(0,Math.min(s[t]+s[t]*e,t===0?360:1)),s=Vi(s),i.r=s[0],i.g=s[1],i.b=s[2]}}function Js(i,t){return i&&Object.assign(t||{},i)}function Qs(i){var t={r:0,g:0,b:0,a:255};return Array.isArray(i)?i.length>=3&&(t={r:i[0],g:i[1],b:i[2],a:255},i.length>3&&(t.a=Lt(i[3]))):(t=Js(i,{r:0,g:0,b:0,a:1}),t.a=Lt(t.a)),t}function ir(i){return i.charAt(0)==="r"?Qo(i):Xo(i)}class Ae{constructor(t){if(t instanceof Ae)return t;const e=typeof t;let s;e==="object"?s=Qs(t):e==="string"&&(s=Fo(t)||Zo(t)||ir(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=Js(this._rgb);return t&&(t.a=St(t.a)),t}set rgb(t){this._rgb=Qs(t)}rgbString(){return this._valid?tr(this._rgb):void 0}hexString(){return this._valid?No(this._rgb):void 0}hslString(){return this._valid?Go(this._rgb):void 0}mix(t,e){if(t){const s=this.rgb,n=t.rgb;let a;const o=e===a?.5:e,r=2*o-1,l=s.a-n.a,c=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;a=1-c,s.r=255&c*s.r+a*n.r+.5,s.g=255&c*s.g+a*n.g+.5,s.b=255&c*s.b+a*n.b+.5,s.a=o*s.a+(1-o)*n.a,this.rgb=s}return this}interpolate(t,e){return t&&(this._rgb=er(this._rgb,t._rgb,e)),this}clone(){return new Ae(this.rgb)}alpha(t){return this._rgb.a=Lt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=$e(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return ni(this._rgb,2,t),this}darken(t){return ni(this._rgb,2,-t),this}saturate(t){return ni(this._rgb,1,t),this}desaturate(t){return ni(this._rgb,1,-t),this}rotate(t){return qo(this._rgb,t),this}}function Mt(){}const sr=(()=>{let i=0;return()=>i++})();function H(i){return i==null}function tt(i){if(Array.isArray&&Array.isArray(i))return!0;const t=Object.prototype.toString.call(i);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function L(i){return i!==null&&Object.prototype.toString.call(i)==="[object Object]"}function ot(i){return(typeof i=="number"||i instanceof Number)&&isFinite(+i)}function vt(i,t){return ot(i)?i:t}function N(i,t){return typeof i>"u"?t:i}const nr=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100:+i/t,tn=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100*t:+i;function K(i,t,e){if(i&&typeof i.call=="function")return i.apply(e,t)}function V(i,t,e,s){let n,a,o;if(tt(i))for(a=i.length,n=0;n<a;n++)t.call(e,i[n],n);else if(L(i))for(o=Object.keys(i),a=o.length,n=0;n<a;n++)t.call(e,i[o[n]],o[n])}function ai(i,t){let e,s,n,a;if(!i||!t||i.length!==t.length)return!1;for(e=0,s=i.length;e<s;++e)if(n=i[e],a=t[e],n.datasetIndex!==a.datasetIndex||n.index!==a.index)return!1;return!0}function oi(i){if(tt(i))return i.map(oi);if(L(i)){const t=Object.create(null),e=Object.keys(i),s=e.length;let n=0;for(;n<s;++n)t[e[n]]=oi(i[e[n]]);return t}return i}function en(i){return["__proto__","prototype","constructor"].indexOf(i)===-1}function ar(i,t,e,s){if(!en(i))return;const n=t[i],a=e[i];L(n)&&L(a)?De(n,a,s):t[i]=oi(a)}function De(i,t,e){const s=tt(t)?t:[t],n=s.length;if(!L(i))return i;e=e||{};const a=e.merger||ar;let o;for(let r=0;r<n;++r){if(o=s[r],!L(o))continue;const l=Object.keys(o);for(let c=0,d=l.length;c<d;++c)a(l[c],i,o,e)}return i}function Pe(i,t){return De(i,t,{merger:or})}function or(i,t,e){if(!en(i))return;const s=t[i],n=e[i];L(s)&&L(n)?Pe(s,n):Object.prototype.hasOwnProperty.call(t,i)||(t[i]=oi(n))}const sn={"":i=>i,x:i=>i.x,y:i=>i.y};function rr(i){const t=i.split("."),e=[];let s="";for(const n of t)s+=n,s.endsWith("\\")?s=s.slice(0,-1)+".":(e.push(s),s="");return e}function lr(i){const t=rr(i);return e=>{for(const s of t){if(s==="")break;e=e&&e[s]}return e}}function Ut(i,t){return(sn[t]||(sn[t]=lr(t)))(i)}function Ui(i){return i.charAt(0).toUpperCase()+i.slice(1)}const Oe=i=>typeof i<"u",It=i=>typeof i=="function",nn=(i,t)=>{if(i.size!==t.size)return!1;for(const e of i)if(!t.has(e))return!1;return!0};function cr(i){return i.type==="mouseup"||i.type==="click"||i.type==="contextmenu"}const U=Math.PI,q=2*U,dr=q+U,ri=Number.POSITIVE_INFINITY,hr=U/180,et=U/2,Yt=U/4,an=U*2/3,on=Math.log10,xt=Math.sign;function Ee(i,t,e){return Math.abs(i-t)<e}function rn(i){const t=Math.round(i);i=Ee(i,t,i/1e3)?t:i;const e=Math.pow(10,Math.floor(on(i))),s=i/e;return(s<=1?1:s<=2?2:s<=5?5:10)*e}function ur(i){const t=[],e=Math.sqrt(i);let s;for(s=1;s<e;s++)i%s===0&&(t.push(s),t.push(i/s));return e===(e|0)&&t.push(e),t.sort((n,a)=>n-a).pop(),t}function fr(i){return typeof i=="symbol"||typeof i=="object"&&i!==null&&!(Symbol.toPrimitive in i||"toString"in i||"valueOf"in i)}function Re(i){return!fr(i)&&!isNaN(parseFloat(i))&&isFinite(i)}function pr(i,t){const e=Math.round(i);return e-t<=i&&e+t>=i}function gr(i,t,e){let s,n,a;for(s=0,n=i.length;s<n;s++)a=i[s][e],isNaN(a)||(t.min=Math.min(t.min,a),t.max=Math.max(t.max,a))}function Ct(i){return i*(U/180)}function mr(i){return i*(180/U)}function ln(i){if(!ot(i))return;let t=1,e=0;for(;Math.round(i*t)/t!==i;)t*=10,e++;return e}function cn(i,t){const e=t.x-i.x,s=t.y-i.y,n=Math.sqrt(e*e+s*s);let a=Math.atan2(s,e);return a<-.5*U&&(a+=q),{angle:a,distance:n}}function Yi(i,t){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2))}function br(i,t){return(i-t+dr)%q-U}function ft(i){return(i%q+q)%q}function Le(i,t,e,s){const n=ft(i),a=ft(t),o=ft(e),r=ft(a-n),l=ft(o-n),c=ft(n-a),d=ft(n-o);return n===a||n===o||s&&a===o||r>l&&c<d}function rt(i,t,e){return Math.max(t,Math.min(e,i))}function vr(i){return rt(i,-32768,32767)}function Ie(i,t,e,s=1e-6){return i>=Math.min(t,e)-s&&i<=Math.max(t,e)+s}function Xi(i,t,e){e=e||(o=>i[o]<t);let s=i.length-1,n=0,a;for(;s-n>1;)a=n+s>>1,e(a)?n=a:s=a;return{lo:n,hi:s}}const Xt=(i,t,e,s)=>Xi(i,e,s?n=>{const a=i[n][t];return a<e||a===e&&i[n+1][t]===e}:n=>i[n][t]<e),xr=(i,t,e)=>Xi(i,e,s=>i[s][t]>=e);function yr(i,t,e){let s=0,n=i.length;for(;s<n&&i[s]<t;)s++;for(;n>s&&i[n-1]>e;)n--;return s>0||n<i.length?i.slice(s,n):i}const dn=["push","pop","shift","splice","unshift"];function _r(i,t){if(i._chartjs){i._chartjs.listeners.push(t);return}Object.defineProperty(i,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),dn.forEach(e=>{const s="_onData"+Ui(e),n=i[e];Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value(...a){const o=n.apply(this,a);return i._chartjs.listeners.forEach(r=>{typeof r[s]=="function"&&r[s](...a)}),o}})})}function hn(i,t){const e=i._chartjs;if(!e)return;const s=e.listeners,n=s.indexOf(t);n!==-1&&s.splice(n,1),!(s.length>0)&&(dn.forEach(a=>{delete i[a]}),delete i._chartjs)}function un(i){const t=new Set(i);return t.size===i.length?i:Array.from(t)}const fn=(function(){return typeof window>"u"?function(i){return i()}:window.requestAnimationFrame})();function pn(i,t){let e=[],s=!1;return function(...n){e=n,s||(s=!0,fn.call(window,()=>{s=!1,i.apply(t,e)}))}}function wr(i,t){let e;return function(...s){return t?(clearTimeout(e),e=setTimeout(i,t,s)):i.apply(this,s),t}}const kr=i=>i==="start"?"left":i==="end"?"right":"center",gn=(i,t,e)=>i==="start"?t:i==="end"?e:(t+e)/2;function Sr(i,t,e){const s=t.length;let n=0,a=s;if(i._sorted){const{iScale:o,vScale:r,_parsed:l}=i,c=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null,d=o.axis,{min:h,max:u,minDefined:f,maxDefined:g}=o.getUserBounds();if(f){if(n=Math.min(Xt(l,d,h).lo,e?s:Xt(t,d,o.getPixelForValue(h)).lo),c){const p=l.slice(0,n+1).reverse().findIndex(m=>!H(m[r.axis]));n-=Math.max(0,p)}n=rt(n,0,s-1)}if(g){let p=Math.max(Xt(l,o.axis,u,!0).hi+1,e?0:Xt(t,d,o.getPixelForValue(u),!0).hi+1);if(c){const m=l.slice(p-1).findIndex(b=>!H(b[r.axis]));p+=Math.max(0,m)}a=rt(p,n,s)-n}else a=s-n}return{start:n,count:a}}function Mr(i){const{xScale:t,yScale:e,_scaleRanges:s}=i,n={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!s)return i._scaleRanges=n,!0;const a=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==e.min||s.ymax!==e.max;return Object.assign(s,n),a}const li=i=>i===0||i===1,mn=(i,t,e)=>-(Math.pow(2,10*(i-=1))*Math.sin((i-t)*q/e)),bn=(i,t,e)=>Math.pow(2,-10*i)*Math.sin((i-t)*q/e)+1,ze={linear:i=>i,easeInQuad:i=>i*i,easeOutQuad:i=>-i*(i-2),easeInOutQuad:i=>(i/=.5)<1?.5*i*i:-.5*(--i*(i-2)-1),easeInCubic:i=>i*i*i,easeOutCubic:i=>(i-=1)*i*i+1,easeInOutCubic:i=>(i/=.5)<1?.5*i*i*i:.5*((i-=2)*i*i+2),easeInQuart:i=>i*i*i*i,easeOutQuart:i=>-((i-=1)*i*i*i-1),easeInOutQuart:i=>(i/=.5)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2),easeInQuint:i=>i*i*i*i*i,easeOutQuint:i=>(i-=1)*i*i*i*i+1,easeInOutQuint:i=>(i/=.5)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2),easeInSine:i=>-Math.cos(i*et)+1,easeOutSine:i=>Math.sin(i*et),easeInOutSine:i=>-.5*(Math.cos(U*i)-1),easeInExpo:i=>i===0?0:Math.pow(2,10*(i-1)),easeOutExpo:i=>i===1?1:-Math.pow(2,-10*i)+1,easeInOutExpo:i=>li(i)?i:i<.5?.5*Math.pow(2,10*(i*2-1)):.5*(-Math.pow(2,-10*(i*2-1))+2),easeInCirc:i=>i>=1?i:-(Math.sqrt(1-i*i)-1),easeOutCirc:i=>Math.sqrt(1-(i-=1)*i),easeInOutCirc:i=>(i/=.5)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1),easeInElastic:i=>li(i)?i:mn(i,.075,.3),easeOutElastic:i=>li(i)?i:bn(i,.075,.3),easeInOutElastic(i){return li(i)?i:i<.5?.5*mn(i*2,.1125,.45):.5+.5*bn(i*2-1,.1125,.45)},easeInBack(i){return i*i*((1.70158+1)*i-1.70158)},easeOutBack(i){return(i-=1)*i*((1.70158+1)*i+1.70158)+1},easeInOutBack(i){let t=1.70158;return(i/=.5)<1?.5*(i*i*(((t*=1.525)+1)*i-t)):.5*((i-=2)*i*(((t*=1.525)+1)*i+t)+2)},easeInBounce:i=>1-ze.easeOutBounce(1-i),easeOutBounce(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},easeInOutBounce:i=>i<.5?ze.easeInBounce(i*2)*.5:ze.easeOutBounce(i*2-1)*.5+.5};function qi(i){if(i&&typeof i=="object"){const t=i.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function vn(i){return qi(i)?i:new Ae(i)}function Gi(i){return qi(i)?i:new Ae(i).saturate(.5).darken(.1).hexString()}const Cr=["x","y","borderWidth","radius","tension"],$r=["color","borderColor","backgroundColor"];function Tr(i){i.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),i.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),i.set("animations",{colors:{type:"color",properties:$r},numbers:{type:"number",properties:Cr}}),i.describe("animations",{_fallback:"animation"}),i.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Ar(i){i.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const xn=new Map;function Dr(i,t){t=t||{};const e=i+JSON.stringify(t);let s=xn.get(e);return s||(s=new Intl.NumberFormat(i,t),xn.set(e,s)),s}function Ki(i,t,e){return Dr(t,e).format(i)}const Pr={values(i){return tt(i)?i:""+i},numeric(i,t,e){if(i===0)return"0";const s=this.chart.options.locale;let n,a=i;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(n="scientific"),a=Or(i,e)}const o=on(Math.abs(a)),r=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),l={notation:n,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),Ki(i,s,l)}};function Or(i,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&i!==Math.floor(i)&&(e=i-Math.floor(i)),e}var yn={formatters:Pr};function Er(i){i.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:yn.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),i.route("scale.ticks","color","","color"),i.route("scale.grid","color","","borderColor"),i.route("scale.border","color","","borderColor"),i.route("scale.title","color","","color"),i.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),i.describe("scales",{_fallback:"scale"}),i.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const qt=Object.create(null),Zi=Object.create(null);function Fe(i,t){if(!t)return i;const e=t.split(".");for(let s=0,n=e.length;s<n;++s){const a=e[s];i=i[a]||(i[a]=Object.create(null))}return i}function Ji(i,t,e){return typeof t=="string"?De(Fe(i,t),e):De(Fe(i,""),t)}class Rr{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,n)=>Gi(n.backgroundColor),this.hoverBorderColor=(s,n)=>Gi(n.borderColor),this.hoverColor=(s,n)=>Gi(n.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Ji(this,t,e)}get(t){return Fe(this,t)}describe(t,e){return Ji(Zi,t,e)}override(t,e){return Ji(qt,t,e)}route(t,e,s,n){const a=Fe(this,t),o=Fe(this,s),r="_"+e;Object.defineProperties(a,{[r]:{value:a[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[r],c=o[n];return L(l)?Object.assign({},c,l):N(l,c)},set(l){this[r]=l}}})}apply(t){t.forEach(e=>e(this))}}var J=new Rr({_scriptable:i=>!i.startsWith("on"),_indexable:i=>i!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Tr,Ar,Er]);function Lr(i){return!i||H(i.size)||H(i.family)?null:(i.style?i.style+" ":"")+(i.weight?i.weight+" ":"")+i.size+"px "+i.family}function _n(i,t,e,s,n){let a=t[n];return a||(a=t[n]=i.measureText(n).width,e.push(n)),a>s&&(s=a),s}function Gt(i,t,e){const s=i.currentDevicePixelRatio,n=e!==0?Math.max(e/2,.5):0;return Math.round((t-n)*s)/s+n}function wn(i,t){!t&&!i||(t=t||i.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,i.width,i.height),t.restore())}function Qi(i,t,e,s){Ir(i,t,e,s)}function Ir(i,t,e,s,n){let a,o,r,l,c,d,h,u;const f=t.pointStyle,g=t.rotation,p=t.radius;let m=(g||0)*hr;if(f&&typeof f=="object"&&(a=f.toString(),a==="[object HTMLImageElement]"||a==="[object HTMLCanvasElement]")){i.save(),i.translate(e,s),i.rotate(m),i.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),i.restore();return}if(!(isNaN(p)||p<=0)){switch(i.beginPath(),f){default:i.arc(e,s,p,0,q),i.closePath();break;case"triangle":d=p,i.moveTo(e+Math.sin(m)*d,s-Math.cos(m)*p),m+=an,i.lineTo(e+Math.sin(m)*d,s-Math.cos(m)*p),m+=an,i.lineTo(e+Math.sin(m)*d,s-Math.cos(m)*p),i.closePath();break;case"rectRounded":c=p*.516,l=p-c,o=Math.cos(m+Yt)*l,h=Math.cos(m+Yt)*l,r=Math.sin(m+Yt)*l,u=Math.sin(m+Yt)*l,i.arc(e-h,s-r,c,m-U,m-et),i.arc(e+u,s-o,c,m-et,m),i.arc(e+h,s+r,c,m,m+et),i.arc(e-u,s+o,c,m+et,m+U),i.closePath();break;case"rect":if(!g){l=Math.SQRT1_2*p,d=l,i.rect(e-d,s-l,2*d,2*l);break}m+=Yt;case"rectRot":h=Math.cos(m)*p,o=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*p,i.moveTo(e-h,s-r),i.lineTo(e+u,s-o),i.lineTo(e+h,s+r),i.lineTo(e-u,s+o),i.closePath();break;case"crossRot":m+=Yt;case"cross":h=Math.cos(m)*p,o=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*p,i.moveTo(e-h,s-r),i.lineTo(e+h,s+r),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o);break;case"star":h=Math.cos(m)*p,o=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*p,i.moveTo(e-h,s-r),i.lineTo(e+h,s+r),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o),m+=Yt,h=Math.cos(m)*p,o=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*p,i.moveTo(e-h,s-r),i.lineTo(e+h,s+r),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o);break;case"line":o=Math.cos(m)*p,r=Math.sin(m)*p,i.moveTo(e-o,s-r),i.lineTo(e+o,s+r);break;case"dash":i.moveTo(e,s),i.lineTo(e+Math.cos(m)*p,s+Math.sin(m)*p);break;case!1:i.closePath();break}i.fill(),t.borderWidth>0&&i.stroke()}}function Be(i,t,e){return e=e||.5,!t||i&&i.x>t.left-e&&i.x<t.right+e&&i.y>t.top-e&&i.y<t.bottom+e}function ts(i,t){i.save(),i.beginPath(),i.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),i.clip()}function es(i){i.restore()}function zr(i,t,e,s,n){if(!t)return i.lineTo(e.x,e.y);if(n==="middle"){const a=(t.x+e.x)/2;i.lineTo(a,t.y),i.lineTo(a,e.y)}else n==="after"!=!!s?i.lineTo(t.x,e.y):i.lineTo(e.x,t.y);i.lineTo(e.x,e.y)}function Fr(i,t,e,s){if(!t)return i.lineTo(e.x,e.y);i.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?e.cp2x:e.cp1x,s?e.cp2y:e.cp1y,e.x,e.y)}function Br(i,t){t.translation&&i.translate(t.translation[0],t.translation[1]),H(t.rotation)||i.rotate(t.rotation),t.color&&(i.fillStyle=t.color),t.textAlign&&(i.textAlign=t.textAlign),t.textBaseline&&(i.textBaseline=t.textBaseline)}function Nr(i,t,e,s,n){if(n.strikethrough||n.underline){const a=i.measureText(s),o=t-a.actualBoundingBoxLeft,r=t+a.actualBoundingBoxRight,l=e-a.actualBoundingBoxAscent,c=e+a.actualBoundingBoxDescent,d=n.strikethrough?(l+c)/2:c;i.strokeStyle=i.fillStyle,i.beginPath(),i.lineWidth=n.decorationWidth||2,i.moveTo(o,d),i.lineTo(r,d),i.stroke()}}function Hr(i,t){const e=i.fillStyle;i.fillStyle=t.color,i.fillRect(t.left,t.top,t.width,t.height),i.fillStyle=e}function kn(i,t,e,s,n,a={}){const o=tt(t)?t:[t],r=a.strokeWidth>0&&a.strokeColor!=="";let l,c;for(i.save(),i.font=n.string,Br(i,a),l=0;l<o.length;++l)c=o[l],a.backdrop&&Hr(i,a.backdrop),r&&(a.strokeColor&&(i.strokeStyle=a.strokeColor),H(a.strokeWidth)||(i.lineWidth=a.strokeWidth),i.strokeText(c,e,s,a.maxWidth)),i.fillText(c,e,s,a.maxWidth),Nr(i,e,s,c,a),s+=Number(n.lineHeight);i.restore()}function is(i,t){const{x:e,y:s,w:n,h:a,radius:o}=t;i.arc(e+o.topLeft,s+o.topLeft,o.topLeft,1.5*U,U,!0),i.lineTo(e,s+a-o.bottomLeft),i.arc(e+o.bottomLeft,s+a-o.bottomLeft,o.bottomLeft,U,et,!0),i.lineTo(e+n-o.bottomRight,s+a),i.arc(e+n-o.bottomRight,s+a-o.bottomRight,o.bottomRight,et,0,!0),i.lineTo(e+n,s+o.topRight),i.arc(e+n-o.topRight,s+o.topRight,o.topRight,0,-et,!0),i.lineTo(e+o.topLeft,s)}const jr=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Vr=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Wr(i,t){const e=(""+i).match(jr);if(!e||e[1]==="normal")return t*1.2;switch(i=+e[2],e[3]){case"px":return i;case"%":i/=100;break}return t*i}const Ur=i=>+i||0;function ss(i,t){const e={},s=L(t),n=s?Object.keys(t):t,a=L(i)?s?o=>N(i[o],i[t[o]]):o=>i[o]:()=>i;for(const o of n)e[o]=Ur(a(o));return e}function Sn(i){return ss(i,{top:"y",right:"x",bottom:"y",left:"x"})}function Ne(i){return ss(i,["topLeft","topRight","bottomLeft","bottomRight"])}function zt(i){const t=Sn(i);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function yt(i,t){i=i||{},t=t||J.font;let e=N(i.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let s=N(i.style,t.style);s&&!(""+s).match(Vr)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const n={family:N(i.family,t.family),lineHeight:Wr(N(i.lineHeight,t.lineHeight),e),size:e,style:s,weight:N(i.weight,t.weight),string:""};return n.string=Lr(n),n}function ci(i,t,e,s){let n,a,o;for(n=0,a=i.length;n<a;++n)if(o=i[n],o!==void 0&&o!==void 0)return o}function Yr(i,t,e){const{min:s,max:n}=i,a=tn(t,(n-s)/2),o=(r,l)=>e&&r===0?0:r+l;return{min:o(s,-Math.abs(a)),max:o(n,a)}}function Kt(i,t){return Object.assign(Object.create(i),t)}function ns(i,t=[""],e,s,n=()=>i[0]){const a=e||i;typeof s>"u"&&(s=An("_fallback",i));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:i,_rootScopes:a,_fallback:s,_getTarget:n,override:r=>ns([r,...i],t,a,s)};return new Proxy(o,{deleteProperty(r,l){return delete r[l],delete r._keys,delete i[0][l],!0},get(r,l){return Cn(r,l,()=>tl(l,t,i,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(i[0])},has(r,l){return Dn(r).includes(l)},ownKeys(r){return Dn(r)},set(r,l,c){const d=r._storage||(r._storage=n());return r[l]=d[l]=c,delete r._keys,!0}})}function ue(i,t,e,s){const n={_cacheable:!1,_proxy:i,_context:t,_subProxy:e,_stack:new Set,_descriptors:Mn(i,s),setContext:a=>ue(i,a,e,s),override:a=>ue(i.override(a),t,e,s)};return new Proxy(n,{deleteProperty(a,o){return delete a[o],delete i[o],!0},get(a,o,r){return Cn(a,o,()=>qr(a,o,r))},getOwnPropertyDescriptor(a,o){return a._descriptors.allKeys?Reflect.has(i,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(i,o)},getPrototypeOf(){return Reflect.getPrototypeOf(i)},has(a,o){return Reflect.has(i,o)},ownKeys(){return Reflect.ownKeys(i)},set(a,o,r){return i[o]=r,delete a[o],!0}})}function Mn(i,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:s=t.indexable,_allKeys:n=t.allKeys}=i;return{allKeys:n,scriptable:e,indexable:s,isScriptable:It(e)?e:()=>e,isIndexable:It(s)?s:()=>s}}const Xr=(i,t)=>i?i+Ui(t):t,as=(i,t)=>L(t)&&i!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Cn(i,t,e){if(Object.prototype.hasOwnProperty.call(i,t)||t==="constructor")return i[t];const s=e();return i[t]=s,s}function qr(i,t,e){const{_proxy:s,_context:n,_subProxy:a,_descriptors:o}=i;let r=s[t];return It(r)&&o.isScriptable(t)&&(r=Gr(t,r,i,e)),tt(r)&&r.length&&(r=Kr(t,r,i,o.isIndexable)),as(t,r)&&(r=ue(r,n,a&&a[t],o)),r}function Gr(i,t,e,s){const{_proxy:n,_context:a,_subProxy:o,_stack:r}=e;if(r.has(i))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+i);r.add(i);let l=t(a,o||s);return r.delete(i),as(i,l)&&(l=os(n._scopes,n,i,l)),l}function Kr(i,t,e,s){const{_proxy:n,_context:a,_subProxy:o,_descriptors:r}=e;if(typeof a.index<"u"&&s(i))return t[a.index%t.length];if(L(t[0])){const l=t,c=n._scopes.filter(d=>d!==l);t=[];for(const d of l){const h=os(c,n,i,d);t.push(ue(h,a,o&&o[i],r))}}return t}function $n(i,t,e){return It(i)?i(t,e):i}const Zr=(i,t)=>i===!0?t:typeof i=="string"?Ut(t,i):void 0;function Jr(i,t,e,s,n){for(const a of t){const o=Zr(e,a);if(o){i.add(o);const r=$n(o._fallback,e,n);if(typeof r<"u"&&r!==e&&r!==s)return r}else if(o===!1&&typeof s<"u"&&e!==s)return null}return!1}function os(i,t,e,s){const n=t._rootScopes,a=$n(t._fallback,e,s),o=[...i,...n],r=new Set;r.add(s);let l=Tn(r,o,e,a||e,s);return l===null||typeof a<"u"&&a!==e&&(l=Tn(r,o,a,l,s),l===null)?!1:ns(Array.from(r),[""],n,a,()=>Qr(t,e,s))}function Tn(i,t,e,s,n){for(;e;)e=Jr(i,t,e,s,n);return e}function Qr(i,t,e){const s=i._getTarget();t in s||(s[t]={});const n=s[t];return tt(n)&&L(e)?e:n||{}}function tl(i,t,e,s){let n;for(const a of t)if(n=An(Xr(a,i),e),typeof n<"u")return as(i,n)?os(e,s,i,n):n}function An(i,t){for(const e of t){if(!e)continue;const s=e[i];if(typeof s<"u")return s}}function Dn(i){let t=i._keys;return t||(t=i._keys=el(i._scopes)),t}function el(i){const t=new Set;for(const e of i)for(const s of Object.keys(e).filter(n=>!n.startsWith("_")))t.add(s);return Array.from(t)}const il=Number.EPSILON||1e-14,fe=(i,t)=>t<i.length&&!i[t].skip&&i[t],Pn=i=>i==="x"?"y":"x";function sl(i,t,e,s){const n=i.skip?t:i,a=t,o=e.skip?t:e,r=Yi(a,n),l=Yi(o,a);let c=r/(r+l),d=l/(r+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const h=s*c,u=s*d;return{previous:{x:a.x-h*(o.x-n.x),y:a.y-h*(o.y-n.y)},next:{x:a.x+u*(o.x-n.x),y:a.y+u*(o.y-n.y)}}}function nl(i,t,e){const s=i.length;let n,a,o,r,l,c=fe(i,0);for(let d=0;d<s-1;++d)if(l=c,c=fe(i,d+1),!(!l||!c)){if(Ee(t[d],0,il)){e[d]=e[d+1]=0;continue}n=e[d]/t[d],a=e[d+1]/t[d],r=Math.pow(n,2)+Math.pow(a,2),!(r<=9)&&(o=3/Math.sqrt(r),e[d]=n*o*t[d],e[d+1]=a*o*t[d])}}function al(i,t,e="x"){const s=Pn(e),n=i.length;let a,o,r,l=fe(i,0);for(let c=0;c<n;++c){if(o=r,r=l,l=fe(i,c+1),!r)continue;const d=r[e],h=r[s];o&&(a=(d-o[e])/3,r[`cp1${e}`]=d-a,r[`cp1${s}`]=h-a*t[c]),l&&(a=(l[e]-d)/3,r[`cp2${e}`]=d+a,r[`cp2${s}`]=h+a*t[c])}}function ol(i,t="x"){const e=Pn(t),s=i.length,n=Array(s).fill(0),a=Array(s);let o,r,l,c=fe(i,0);for(o=0;o<s;++o)if(r=l,l=c,c=fe(i,o+1),!!l){if(c){const d=c[t]-l[t];n[o]=d!==0?(c[e]-l[e])/d:0}a[o]=r?c?xt(n[o-1])!==xt(n[o])?0:(n[o-1]+n[o])/2:n[o-1]:n[o]}nl(i,n,a),al(i,a,t)}function di(i,t,e){return Math.max(Math.min(i,e),t)}function rl(i,t){let e,s,n,a,o,r=Be(i[0],t);for(e=0,s=i.length;e<s;++e)o=a,a=r,r=e<s-1&&Be(i[e+1],t),a&&(n=i[e],o&&(n.cp1x=di(n.cp1x,t.left,t.right),n.cp1y=di(n.cp1y,t.top,t.bottom)),r&&(n.cp2x=di(n.cp2x,t.left,t.right),n.cp2y=di(n.cp2y,t.top,t.bottom)))}function ll(i,t,e,s,n){let a,o,r,l;if(t.spanGaps&&(i=i.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")ol(i,n);else{let c=s?i[i.length-1]:i[0];for(a=0,o=i.length;a<o;++a)r=i[a],l=sl(c,r,i[Math.min(a+1,o-(s?0:1))%o],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,c=r}t.capBezierPoints&&rl(i,e)}function rs(){return typeof window<"u"&&typeof document<"u"}function ls(i){let t=i.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function hi(i,t,e){let s;return typeof i=="string"?(s=parseInt(i,10),i.indexOf("%")!==-1&&(s=s/100*t.parentNode[e])):s=i,s}const ui=i=>i.ownerDocument.defaultView.getComputedStyle(i,null);function cl(i,t){return ui(i).getPropertyValue(t)}const dl=["top","right","bottom","left"];function Zt(i,t,e){const s={};e=e?"-"+e:"";for(let n=0;n<4;n++){const a=dl[n];s[a]=parseFloat(i[t+"-"+a+e])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const hl=(i,t,e)=>(i>0||t>0)&&(!e||!e.shadowRoot);function ul(i,t){const e=i.touches,s=e&&e.length?e[0]:i,{offsetX:n,offsetY:a}=s;let o=!1,r,l;if(hl(n,a,i.target))r=n,l=a;else{const c=t.getBoundingClientRect();r=s.clientX-c.left,l=s.clientY-c.top,o=!0}return{x:r,y:l,box:o}}function Jt(i,t){if("native"in i)return i;const{canvas:e,currentDevicePixelRatio:s}=t,n=ui(e),a=n.boxSizing==="border-box",o=Zt(n,"padding"),r=Zt(n,"border","width"),{x:l,y:c,box:d}=ul(i,e),h=o.left+(d&&r.left),u=o.top+(d&&r.top);let{width:f,height:g}=t;return a&&(f-=o.width+r.width,g-=o.height+r.height),{x:Math.round((l-h)/f*e.width/s),y:Math.round((c-u)/g*e.height/s)}}function fl(i,t,e){let s,n;if(t===void 0||e===void 0){const a=i&&ls(i);if(!a)t=i.clientWidth,e=i.clientHeight;else{const o=a.getBoundingClientRect(),r=ui(a),l=Zt(r,"border","width"),c=Zt(r,"padding");t=o.width-c.width-l.width,e=o.height-c.height-l.height,s=hi(r.maxWidth,a,"clientWidth"),n=hi(r.maxHeight,a,"clientHeight")}}return{width:t,height:e,maxWidth:s||ri,maxHeight:n||ri}}const Ft=i=>Math.round(i*10)/10;function pl(i,t,e,s){const n=ui(i),a=Zt(n,"margin"),o=hi(n.maxWidth,i,"clientWidth")||ri,r=hi(n.maxHeight,i,"clientHeight")||ri,l=fl(i,t,e);let{width:c,height:d}=l;if(n.boxSizing==="content-box"){const u=Zt(n,"border","width"),f=Zt(n,"padding");c-=f.width+u.width,d-=f.height+u.height}return c=Math.max(0,c-a.width),d=Math.max(0,s?c/s:d-a.height),c=Ft(Math.min(c,o,l.maxWidth)),d=Ft(Math.min(d,r,l.maxHeight)),c&&!d&&(d=Ft(c/2)),(t!==void 0||e!==void 0)&&s&&l.height&&d>l.height&&(d=l.height,c=Ft(Math.floor(d*s))),{width:c,height:d}}function On(i,t,e){const s=t||1,n=Ft(i.height*s),a=Ft(i.width*s);i.height=Ft(i.height),i.width=Ft(i.width);const o=i.canvas;return o.style&&(e||!o.style.height&&!o.style.width)&&(o.style.height=`${i.height}px`,o.style.width=`${i.width}px`),i.currentDevicePixelRatio!==s||o.height!==n||o.width!==a?(i.currentDevicePixelRatio=s,o.height=n,o.width=a,i.ctx.setTransform(s,0,0,s,0,0),!0):!1}const gl=(function(){let i=!1;try{const t={get passive(){return i=!0,!1}};rs()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return i})();function En(i,t){const e=cl(i,t),s=e&&e.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function Qt(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:i.y+e*(t.y-i.y)}}function ml(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:s==="middle"?e<.5?i.y:t.y:s==="after"?e<1?i.y:t.y:e>0?t.y:i.y}}function bl(i,t,e,s){const n={x:i.cp2x,y:i.cp2y},a={x:t.cp1x,y:t.cp1y},o=Qt(i,n,e),r=Qt(n,a,e),l=Qt(a,t,e),c=Qt(o,r,e),d=Qt(r,l,e);return Qt(c,d,e)}const vl=function(i,t){return{x(e){return i+i+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,s){return e-s},leftForLtr(e,s){return e-s}}},xl=function(){return{x(i){return i},setWidth(i){},textAlign(i){return i},xPlus(i,t){return i+t},leftForLtr(i,t){return i}}};function cs(i,t,e){return i?vl(t,e):xl()}function yl(i,t){let e,s;(t==="ltr"||t==="rtl")&&(e=i.canvas.style,s=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),i.prevTextDirection=s)}function _l(i,t){t!==void 0&&(delete i.prevTextDirection,i.canvas.style.setProperty("direction",t[0],t[1]))}function Rn(i){return i==="angle"?{between:Le,compare:br,normalize:ft}:{between:Ie,compare:(t,e)=>t-e,normalize:t=>t}}function Ln({start:i,end:t,count:e,loop:s,style:n}){return{start:i%e,end:t%e,loop:s&&(t-i+1)%e===0,style:n}}function wl(i,t,e){const{property:s,start:n,end:a}=e,{between:o,normalize:r}=Rn(s),l=t.length;let{start:c,end:d,loop:h}=i,u,f;if(h){for(c+=l,d+=l,u=0,f=l;u<f&&o(r(t[c%l][s]),n,a);++u)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:h,style:i.style}}function In(i,t,e){if(!e)return[i];const{property:s,start:n,end:a}=e,o=t.length,{compare:r,between:l,normalize:c}=Rn(s),{start:d,end:h,loop:u,style:f}=wl(i,t,e),g=[];let p=!1,m=null,b,v,_;const k=()=>l(n,_,b)&&r(n,_)!==0,x=()=>r(a,b)===0||l(a,_,b),T=()=>p||k(),M=()=>!p||x();for(let C=d,D=d;C<=h;++C)v=t[C%o],!v.skip&&(b=c(v[s]),b!==_&&(p=l(b,n,a),m===null&&T()&&(m=r(b,n)===0?C:D),m!==null&&M()&&(g.push(Ln({start:m,end:C,loop:u,count:o,style:f})),m=null),D=C,_=b));return m!==null&&g.push(Ln({start:m,end:h,loop:u,count:o,style:f})),g}function zn(i,t){const e=[],s=i.segments;for(let n=0;n<s.length;n++){const a=In(s[n],i.points,t);a.length&&e.push(...a)}return e}function kl(i,t,e,s){let n=0,a=t-1;if(e&&!s)for(;n<t&&!i[n].skip;)n++;for(;n<t&&i[n].skip;)n++;for(n%=t,e&&(a+=n);a>n&&i[a%t].skip;)a--;return a%=t,{start:n,end:a}}function Sl(i,t,e,s){const n=i.length,a=[];let o=t,r=i[t],l;for(l=t+1;l<=e;++l){const c=i[l%n];c.skip||c.stop?r.skip||(s=!1,a.push({start:t%n,end:(l-1)%n,loop:s}),t=o=c.stop?l:null):(o=l,r.skip&&(t=l)),r=c}return o!==null&&a.push({start:t%n,end:o%n,loop:s}),a}function Ml(i,t){const e=i.points,s=i.options.spanGaps,n=e.length;if(!n)return[];const a=!!i._loop,{start:o,end:r}=kl(e,n,a,s);if(s===!0)return Fn(i,[{start:o,end:r,loop:a}],e,t);const l=r<o?r+n:r,c=!!i._fullLoop&&o===0&&r===n-1;return Fn(i,Sl(e,o,l,c),e,t)}function Fn(i,t,e,s){return!s||!s.setContext||!e?t:Cl(i,t,e,s)}function Cl(i,t,e,s){const n=i._chart.getContext(),a=Bn(i.options),{_datasetIndex:o,options:{spanGaps:r}}=i,l=e.length,c=[];let d=a,h=t[0].start,u=h;function f(g,p,m,b){const v=r?-1:1;if(g!==p){for(g+=l;e[g%l].skip;)g-=v;for(;e[p%l].skip;)p+=v;g%l!==p%l&&(c.push({start:g%l,end:p%l,loop:m,style:b}),d=b,h=p%l)}}for(const g of t){h=r?h:g.start;let p=e[h%l],m;for(u=h+1;u<=g.end;u++){const b=e[u%l];m=Bn(s.setContext(Kt(n,{type:"segment",p0:p,p1:b,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:o}))),$l(m,d)&&f(h,u-1,g.loop,d),p=b,d=m}h<u-1&&f(h,u-1,g.loop,d)}return c}function Bn(i){return{backgroundColor:i.backgroundColor,borderCapStyle:i.borderCapStyle,borderDash:i.borderDash,borderDashOffset:i.borderDashOffset,borderJoinStyle:i.borderJoinStyle,borderWidth:i.borderWidth,borderColor:i.borderColor}}function $l(i,t){if(!t)return!1;const e=[],s=function(n,a){return qi(a)?(e.includes(a)||e.push(a),e.indexOf(a)):a};return JSON.stringify(i,s)!==JSON.stringify(t,s)}function fi(i,t,e){return i.options.clip?i[e]:t[e]}function Tl(i,t){const{xScale:e,yScale:s}=i;return e&&s?{left:fi(e,t,"left"),right:fi(e,t,"right"),top:fi(s,t,"top"),bottom:fi(s,t,"bottom")}:t}function Nn(i,t){const e=t._clip;if(e.disabled)return!1;const s=Tl(t,i.chartArea);return{left:e.left===!1?0:s.left-(e.left===!0?0:e.left),right:e.right===!1?i.width:s.right+(e.right===!0?0:e.right),top:e.top===!1?0:s.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?i.height:s.bottom+(e.bottom===!0?0:e.bottom)}}class Al{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,s,n){const a=e.listeners[n],o=e.duration;a.forEach(r=>r({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(s-e.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=fn.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((s,n)=>{if(!s.running||!s.items.length)return;const a=s.items;let o=a.length-1,r=!1,l;for(;o>=0;--o)l=a[o],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),r=!0):(a[o]=a[a.length-1],a.pop());r&&(n.draw(),this._notify(n,s,t,"progress")),a.length||(s.running=!1,this._notify(n,s,t,"complete"),s.initial=!1),e+=a.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let s=e.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,s)),s}listen(t,e,s){this._getAnims(t).listeners[e].push(s)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((s,n)=>Math.max(s,n._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const s=e.items;let n=s.length-1;for(;n>=0;--n)s[n].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var $t=new Al;const Hn="transparent",Dl={boolean(i,t,e){return e>.5?t:i},color(i,t,e){const s=vn(i||Hn),n=s.valid&&vn(t||Hn);return n&&n.valid?n.mix(s,e).hexString():t},number(i,t,e){return i+(t-i)*e}};class Pl{constructor(t,e,s,n){const a=e[s];n=ci([t.to,n,a,t.from]);const o=ci([t.from,a,n]);this._active=!0,this._fn=t.fn||Dl[t.type||typeof o],this._easing=ze[t.easing]||ze.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=s,this._from=o,this._to=n,this._promises=void 0}active(){return this._active}update(t,e,s){if(this._active){this._notify(!1);const n=this._target[this._prop],a=s-this._start,o=this._duration-a;this._start=s,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=a,this._loop=!!t.loop,this._to=ci([t.to,e,n,t.from]),this._from=ci([t.from,n,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,s=this._duration,n=this._prop,a=this._from,o=this._loop,r=this._to;let l;if(this._active=a!==r&&(o||e<s),!this._active){this._target[n]=r,this._notify(!0);return}if(e<0){this._target[n]=a;return}l=e/s%2,l=o&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[n]=this._fn(a,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,s)=>{t.push({res:e,rej:s})})}_notify(t){const e=t?"res":"rej",s=this._promises||[];for(let n=0;n<s.length;n++)s[n][e]()}}class jn{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!L(t))return;const e=Object.keys(J.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(n=>{const a=t[n];if(!L(a))return;const o={};for(const r of e)o[r]=a[r];(tt(a.properties)&&a.properties||[n]).forEach(r=>{(r===n||!s.has(r))&&s.set(r,o)})})}_animateOptions(t,e){const s=e.options,n=El(t,s);if(!n)return[];const a=this._createAnimations(n,s);return s.$shared&&Ol(t.options.$animations,s).then(()=>{t.options=s},()=>{}),a}_createAnimations(t,e){const s=this._properties,n=[],a=t.$animations||(t.$animations={}),o=Object.keys(e),r=Date.now();let l;for(l=o.length-1;l>=0;--l){const c=o[l];if(c.charAt(0)==="$")continue;if(c==="options"){n.push(...this._animateOptions(t,e));continue}const d=e[c];let h=a[c];const u=s.get(c);if(h)if(u&&h.active()){h.update(u,d,r);continue}else h.cancel();if(!u||!u.duration){t[c]=d;continue}a[c]=h=new Pl(u,t,c,d),n.push(h)}return n}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const s=this._createAnimations(t,e);if(s.length)return $t.add(this._chart,s),!0}}function Ol(i,t){const e=[],s=Object.keys(t);for(let n=0;n<s.length;n++){const a=i[s[n]];a&&a.active()&&e.push(a.wait())}return Promise.all(e)}function El(i,t){if(!t)return;let e=i.options;if(!e){i.options=t;return}return e.$shared&&(i.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function Vn(i,t){const e=i&&i.options||{},s=e.reverse,n=e.min===void 0?t:0,a=e.max===void 0?t:0;return{start:s?a:n,end:s?n:a}}function Rl(i,t,e){if(e===!1)return!1;const s=Vn(i,e),n=Vn(t,e);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}function Ll(i){let t,e,s,n;return L(i)?(t=i.top,e=i.right,s=i.bottom,n=i.left):t=e=s=n=i,{top:t,right:e,bottom:s,left:n,disabled:i===!1}}function Wn(i,t){const e=[],s=i._getSortedDatasetMetas(t);let n,a;for(n=0,a=s.length;n<a;++n)e.push(s[n].index);return e}function Un(i,t,e,s={}){const n=i.keys,a=s.mode==="single";let o,r,l,c;if(t===null)return;let d=!1;for(o=0,r=n.length;o<r;++o){if(l=+n[o],l===e){if(d=!0,s.all)continue;break}c=i.values[l],ot(c)&&(a||t===0||xt(t)===xt(c))&&(t+=c)}return!d&&!s.all?0:t}function Il(i,t){const{iScale:e,vScale:s}=t,n=e.axis==="x"?"x":"y",a=s.axis==="x"?"x":"y",o=Object.keys(i),r=new Array(o.length);let l,c,d;for(l=0,c=o.length;l<c;++l)d=o[l],r[l]={[n]:d,[a]:i[d]};return r}function ds(i,t){const e=i&&i.options.stacked;return e||e===void 0&&t.stack!==void 0}function zl(i,t,e){return`${i.id}.${t.id}.${e.stack||e.type}`}function Fl(i){const{min:t,max:e,minDefined:s,maxDefined:n}=i.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:n?e:Number.POSITIVE_INFINITY}}function Bl(i,t,e){const s=i[t]||(i[t]={});return s[e]||(s[e]={})}function Yn(i,t,e,s){for(const n of t.getMatchingVisibleMetas(s).reverse()){const a=i[n.index];if(e&&a>0||!e&&a<0)return n.index}return null}function Xn(i,t){const{chart:e,_cachedMeta:s}=i,n=e._stacks||(e._stacks={}),{iScale:a,vScale:o,index:r}=s,l=a.axis,c=o.axis,d=zl(a,o,s),h=t.length;let u;for(let f=0;f<h;++f){const g=t[f],{[l]:p,[c]:m}=g,b=g._stacks||(g._stacks={});u=b[c]=Bl(n,d,p),u[r]=m,u._top=Yn(u,o,!0,s.type),u._bottom=Yn(u,o,!1,s.type);const v=u._visualValues||(u._visualValues={});v[r]=m}}function hs(i,t){const e=i.scales;return Object.keys(e).filter(s=>e[s].axis===t).shift()}function Nl(i,t){return Kt(i,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Hl(i,t,e){return Kt(i,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function He(i,t){const e=i.controller.index,s=i.vScale&&i.vScale.axis;if(s){t=t||i._parsed;for(const n of t){const a=n._stacks;if(!a||a[s]===void 0||a[s][e]===void 0)return;delete a[s][e],a[s]._visualValues!==void 0&&a[s]._visualValues[e]!==void 0&&delete a[s]._visualValues[e]}}}const us=i=>i==="reset"||i==="none",qn=(i,t)=>t?i:Object.assign({},i),jl=(i,t,e)=>i&&!t.hidden&&t._stacked&&{keys:Wn(e,!0),values:null};class pi{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=ds(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&He(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,s=this.getDataset(),n=(h,u,f,g)=>h==="x"?u:h==="r"?g:f,a=e.xAxisID=N(s.xAxisID,hs(t,"x")),o=e.yAxisID=N(s.yAxisID,hs(t,"y")),r=e.rAxisID=N(s.rAxisID,hs(t,"r")),l=e.indexAxis,c=e.iAxisID=n(l,a,o,r),d=e.vAxisID=n(l,o,a,r);e.xScale=this.getScaleForId(a),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&hn(this._data,this),t._stacked&&He(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),s=this._data;if(L(e)){const n=this._cachedMeta;this._data=Il(e,n)}else if(s!==e){if(s){hn(s,this);const n=this._cachedMeta;He(n),n._parsed=[]}e&&Object.isExtensible(e)&&_r(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,s=this.getDataset();let n=!1;this._dataCheck();const a=e._stacked;e._stacked=ds(e.vScale,e),e.stack!==s.stack&&(n=!0,He(e),e.stack=s.stack),this._resyncElements(t),(n||a!==e._stacked)&&(Xn(this,e._parsed),e._stacked=ds(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:s,_data:n}=this,{iScale:a,_stacked:o}=s,r=a.axis;let l=t===0&&e===n.length?!0:s._sorted,c=t>0&&s._parsed[t-1],d,h,u;if(this._parsing===!1)s._parsed=n,s._sorted=!0,u=n;else{tt(n[t])?u=this.parseArrayData(s,n,t,e):L(n[t])?u=this.parseObjectData(s,n,t,e):u=this.parsePrimitiveData(s,n,t,e);const f=()=>h[r]===null||c&&h[r]<c[r];for(d=0;d<e;++d)s._parsed[d+t]=h=u[d],l&&(f()&&(l=!1),c=h);s._sorted=l}o&&Xn(this,u)}parsePrimitiveData(t,e,s,n){const{iScale:a,vScale:o}=t,r=a.axis,l=o.axis,c=a.getLabels(),d=a===o,h=new Array(n);let u,f,g;for(u=0,f=n;u<f;++u)g=u+s,h[u]={[r]:d||a.parse(c[g],g),[l]:o.parse(e[g],g)};return h}parseArrayData(t,e,s,n){const{xScale:a,yScale:o}=t,r=new Array(n);let l,c,d,h;for(l=0,c=n;l<c;++l)d=l+s,h=e[d],r[l]={x:a.parse(h[0],d),y:o.parse(h[1],d)};return r}parseObjectData(t,e,s,n){const{xScale:a,yScale:o}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=new Array(n);let d,h,u,f;for(d=0,h=n;d<h;++d)u=d+s,f=e[u],c[d]={x:a.parse(Ut(f,r),u),y:o.parse(Ut(f,l),u)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,s){const n=this.chart,a=this._cachedMeta,o=e[t.axis],r={keys:Wn(n,!0),values:e._stacks[t.axis]._visualValues};return Un(r,o,a.index,{mode:s})}updateRangeFromParsed(t,e,s,n){const a=s[e.axis];let o=a===null?NaN:a;const r=n&&s._stacks[e.axis];n&&r&&(n.values=r,o=Un(n,a,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const s=this._cachedMeta,n=s._parsed,a=s._sorted&&t===s.iScale,o=n.length,r=this._getOtherScale(t),l=jl(e,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:h}=Fl(r);let u,f;function g(){f=n[u];const p=f[r.axis];return!ot(f[t.axis])||d>p||h<p}for(u=0;u<o&&!(!g()&&(this.updateRangeFromParsed(c,t,f,l),a));++u);if(a){for(u=o-1;u>=0;--u)if(!g()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,s=[];let n,a,o;for(n=0,a=e.length;n<a;++n)o=e[n][t.axis],ot(o)&&s.push(o);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,s=e.iScale,n=e.vScale,a=this.getParsed(t);return{label:s?""+s.getLabelForValue(a[s.axis]):"",value:n?""+n.getLabelForValue(a[n.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=Ll(N(this.options.clip,Rl(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,s=this._cachedMeta,n=s.data||[],a=e.chartArea,o=[],r=this._drawStart||0,l=this._drawCount||n.length-r,c=this.options.drawActiveElementsOnTop;let d;for(s.dataset&&s.dataset.draw(t,a,r,l),d=r;d<r+l;++d){const h=n[d];h.hidden||(h.active&&c?o.push(h):h.draw(t,a))}for(d=0;d<o.length;++d)o[d].draw(t,a)}getStyle(t,e){const s=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,e,s){const n=this.getDataset();let a;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];a=o.$context||(o.$context=Hl(this.getContext(),t,o)),a.parsed=this.getParsed(t),a.raw=n.data[t],a.index=a.dataIndex=t}else a=this.$context||(this.$context=Nl(this.chart.getContext(),this.index)),a.dataset=n,a.index=a.datasetIndex=this.index;return a.active=!!e,a.mode=s,a}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",s){const n=e==="active",a=this._cachedDataOpts,o=t+"-"+e,r=a[o],l=this.enableOptionSharing&&Oe(s);if(r)return qn(r,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),h=n?[`${t}Hover`,"hover",t,""]:[t,""],u=c.getOptionScopes(this.getDataset(),d),f=Object.keys(J.elements[t]),g=()=>this.getContext(s,n,e),p=c.resolveNamedOptions(u,f,g,h);return p.$shared&&(p.$shared=l,a[o]=Object.freeze(qn(p,l))),p}_resolveAnimations(t,e,s){const n=this.chart,a=this._cachedDataOpts,o=`animation-${e}`,r=a[o];if(r)return r;let l;if(n.options.animation!==!1){const d=this.chart.config,h=d.datasetAnimationScopeKeys(this._type,e),u=d.getOptionScopes(this.getDataset(),h);l=d.createResolver(u,this.getContext(t,s,e))}const c=new jn(n,l&&l.animations);return l&&l._cacheable&&(a[o]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||us(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const s=this.resolveDataElementOptions(t,e),n=this._sharedOptions,a=this.getSharedOptions(s),o=this.includeOptions(e,a)||a!==n;return this.updateSharedOptions(a,e,s),{sharedOptions:a,includeOptions:o}}updateElement(t,e,s,n){us(n)?Object.assign(t,s):this._resolveAnimations(e,n).update(t,s)}updateSharedOptions(t,e,s){t&&!us(e)&&this._resolveAnimations(void 0,e).update(t,s)}_setStyle(t,e,s,n){t.active=n;const a=this.getStyle(e,n);this._resolveAnimations(e,s,n).update(t,{options:!n&&this.getSharedOptions(a)||a})}removeHoverStyle(t,e,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,e,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,s=this._cachedMeta.data;for(const[r,l,c]of this._syncList)this[r](l,c);this._syncList=[];const n=s.length,a=e.length,o=Math.min(a,n);o&&this.parse(0,o),a>n?this._insertElements(n,a-n,t):a<n&&this._removeElements(a,n-a)}_insertElements(t,e,s=!0){const n=this._cachedMeta,a=n.data,o=t+e;let r;const l=c=>{for(c.length+=e,r=c.length-1;r>=o;r--)c[r]=c[r-e]};for(l(a),r=t;r<o;++r)a[r]=new this.dataElementType;this._parsing&&l(n._parsed),this.parse(t,e),s&&this.updateElements(a,t,e,"reset")}updateElements(t,e,s,n){}_removeElements(t,e){const s=this._cachedMeta;if(this._parsing){const n=s._parsed.splice(t,e);s._stacked&&He(s,n)}s.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,s,n]=t;this[e](s,n)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function Vl(i,t){if(!i._cache.$bar){const e=i.getMatchingVisibleMetas(t);let s=[];for(let n=0,a=e.length;n<a;n++)s=s.concat(e[n].controller.getAllParsedValues(i));i._cache.$bar=un(s.sort((n,a)=>n-a))}return i._cache.$bar}function Wl(i){const t=i.iScale,e=Vl(t,i.type);let s=t._length,n,a,o,r;const l=()=>{o===32767||o===-32768||(Oe(r)&&(s=Math.min(s,Math.abs(o-r)||s)),r=o)};for(n=0,a=e.length;n<a;++n)o=t.getPixelForValue(e[n]),l();for(r=void 0,n=0,a=t.ticks.length;n<a;++n)o=t.getPixelForTick(n),l();return s}function Ul(i,t,e,s){const n=e.barThickness;let a,o;return H(n)?(a=t.min*e.categoryPercentage,o=e.barPercentage):(a=n*s,o=1),{chunk:a/s,ratio:o,start:t.pixels[i]-a/2}}function Yl(i,t,e,s){const n=t.pixels,a=n[i];let o=i>0?n[i-1]:null,r=i<n.length-1?n[i+1]:null;const l=e.categoryPercentage;o===null&&(o=a-(r===null?t.end-t.start:r-a)),r===null&&(r=a+a-o);const c=a-(a-Math.min(o,r))/2*l;return{chunk:Math.abs(r-o)/2*l/s,ratio:e.barPercentage,start:c}}function Xl(i,t,e,s){const n=e.parse(i[0],s),a=e.parse(i[1],s),o=Math.min(n,a),r=Math.max(n,a);let l=o,c=r;Math.abs(o)>Math.abs(r)&&(l=r,c=o),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:n,end:a,min:o,max:r}}function Gn(i,t,e,s){return tt(i)?Xl(i,t,e,s):t[e.axis]=e.parse(i,s),t}function Kn(i,t,e,s){const n=i.iScale,a=i.vScale,o=n.getLabels(),r=n===a,l=[];let c,d,h,u;for(c=e,d=e+s;c<d;++c)u=t[c],h={},h[n.axis]=r||n.parse(o[c],c),l.push(Gn(u,h,a,c));return l}function fs(i){return i&&i.barStart!==void 0&&i.barEnd!==void 0}function ql(i,t,e){return i!==0?xt(i):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function Gl(i){let t,e,s,n,a;return i.horizontal?(t=i.base>i.x,e="left",s="right"):(t=i.base<i.y,e="bottom",s="top"),t?(n="end",a="start"):(n="start",a="end"),{start:e,end:s,reverse:t,top:n,bottom:a}}function Kl(i,t,e,s){let n=t.borderSkipped;const a={};if(!n){i.borderSkipped=a;return}if(n===!0){i.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:r,reverse:l,top:c,bottom:d}=Gl(i);n==="middle"&&e&&(i.enableBorderRadius=!0,(e._top||0)===s?n=c:(e._bottom||0)===s?n=d:(a[Zn(d,o,r,l)]=!0,n=c)),a[Zn(n,o,r,l)]=!0,i.borderSkipped=a}function Zn(i,t,e,s){return s?(i=Zl(i,t,e),i=Jn(i,e,t)):i=Jn(i,t,e),i}function Zl(i,t,e){return i===t?e:i===e?t:i}function Jn(i,t,e){return i==="start"?t:i==="end"?e:i}function Jl(i,{inflateAmount:t},e){i.inflateAmount=t==="auto"?e===1?.33:0:t}class Ql extends pi{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,e,s,n){return Kn(t,e,s,n)}parseArrayData(t,e,s,n){return Kn(t,e,s,n)}parseObjectData(t,e,s,n){const{iScale:a,vScale:o}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=a.axis==="x"?r:l,d=o.axis==="x"?r:l,h=[];let u,f,g,p;for(u=s,f=s+n;u<f;++u)p=e[u],g={},g[a.axis]=a.parse(Ut(p,c),u),h.push(Gn(Ut(p,d),g,o,u));return h}updateRangeFromParsed(t,e,s,n){super.updateRangeFromParsed(t,e,s,n);const a=s._custom;a&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,a.min),t.max=Math.max(t.max,a.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:s,vScale:n}=e,a=this.getParsed(t),o=a._custom,r=fs(o)?"["+o.start+", "+o.end+"]":""+n.getLabelForValue(a[n.axis]);return{label:""+s.getLabelForValue(a[s.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,s,n){const a=n==="reset",{index:o,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),c=r.isHorizontal(),d=this._getRuler(),{sharedOptions:h,includeOptions:u}=this._getSharedOptions(e,n);for(let f=e;f<e+s;f++){const g=this.getParsed(f),p=a||H(g[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),m=this._calculateBarIndexPixels(f,d),b=(g._stacks||{})[r.axis],v={horizontal:c,base:p.base,enableBorderRadius:!b||fs(g._custom)||o===b._top||o===b._bottom,x:c?p.head:m.center,y:c?m.center:p.head,height:c?m.size:Math.abs(p.size),width:c?Math.abs(p.size):m.size};u&&(v.options=h||this.resolveDataElementOptions(f,t[f].active?"active":n));const _=v.options||t[f].options;Kl(v,_,b,o),Jl(v,_,d.ratio),this.updateElement(t[f],f,v,n)}}_getStacks(t,e){const{iScale:s}=this._cachedMeta,n=s.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),a=s.options.stacked,o=[],r=this._cachedMeta.controller.getParsed(e),l=r&&r[s.axis],c=d=>{const h=d._parsed.find(f=>f[s.axis]===l),u=h&&h[d.vScale.axis];if(H(u)||isNaN(u))return!0};for(const d of n)if(!(e!==void 0&&c(d))&&((a===!1||o.indexOf(d.stack)===-1||a===void 0&&d.stack===void 0)&&o.push(d.stack),d.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[N(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,s){const n=this._getStacks(t,s),a=e!==void 0?n.indexOf(e):-1;return a===-1?n.length-1:a}_getRuler(){const t=this.options,e=this._cachedMeta,s=e.iScale,n=[];let a,o;for(a=0,o=e.data.length;a<o;++a)n.push(s.getPixelForValue(this.getParsed(a)[s.axis],a));const r=t.barThickness;return{min:r||Wl(e),pixels:n,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:s,index:n},options:{base:a,minBarLength:o}}=this,r=a||0,l=this.getParsed(t),c=l._custom,d=fs(c);let h=l[e.axis],u=0,f=s?this.applyStack(e,l,s):h,g,p;f!==h&&(u=f-h,f=h),d&&(h=c.barStart,f=c.barEnd-c.barStart,h!==0&&xt(h)!==xt(c.barEnd)&&(u=0),u+=h);const m=!H(a)&&!d?a:u;let b=e.getPixelForValue(m);if(this.chart.getDataVisibility(t)?g=e.getPixelForValue(u+f):g=b,p=g-b,Math.abs(p)<o){p=ql(p,e,r)*o,h===r&&(b-=p/2);const v=e.getPixelForDecimal(0),_=e.getPixelForDecimal(1),k=Math.min(v,_),x=Math.max(v,_);b=Math.max(Math.min(b,x),k),g=b+p,s&&!d&&(l._stacks[e.axis]._visualValues[n]=e.getValueForPixel(g)-e.getValueForPixel(b))}if(b===e.getPixelForValue(r)){const v=xt(p)*e.getLineWidthForValue(r)/2;b+=v,p-=v}return{size:p,base:b,head:g,center:g+p/2}}_calculateBarIndexPixels(t,e){const s=e.scale,n=this.options,a=n.skipNull,o=N(n.maxBarThickness,1/0);let r,l;const c=this._getAxisCount();if(e.grouped){const d=a?this._getStackCount(t):e.stackCount,h=n.barThickness==="flex"?Yl(t,e,n,d*c):Ul(t,e,n,d*c),u=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(N(u,this.getFirstScaleIdForIndexAxis())),g=this._getStackIndex(this.index,this._cachedMeta.stack,a?t:void 0)+f;r=h.start+h.chunk*g+h.chunk/2,l=Math.min(o,h.chunk*h.ratio)}else r=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(o,e.min*e.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,s=t.data,n=s.length;let a=0;for(;a<n;++a)this.getParsed(a)[e.axis]!==null&&!s[a].hidden&&s[a].draw(this._ctx)}}function tc(i,t,e){let s=1,n=1,a=0,o=0;if(t<q){const r=i,l=r+t,c=Math.cos(r),d=Math.sin(r),h=Math.cos(l),u=Math.sin(l),f=(_,k,x)=>Le(_,r,l,!0)?1:Math.max(k,k*e,x,x*e),g=(_,k,x)=>Le(_,r,l,!0)?-1:Math.min(k,k*e,x,x*e),p=f(0,c,h),m=f(et,d,u),b=g(U,c,h),v=g(U+et,d,u);s=(p-b)/2,n=(m-v)/2,a=-(p+b)/2,o=-(m+v)/2}return{ratioX:s,ratioY:n,offsetX:a,offsetY:o}}class ec extends pi{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:s,textAlign:n,color:a,useBorderRadius:o,borderRadius:r}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const h=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:h.backgroundColor,fontColor:a,hidden:!t.getDataVisibility(c),lineDash:h.borderDash,lineDashOffset:h.borderDashOffset,lineJoin:h.borderJoinStyle,lineWidth:h.borderWidth,strokeStyle:h.borderColor,textAlign:n,pointStyle:s,borderRadius:o&&(r||h.borderRadius),index:c}}):[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}}};constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const s=this.getDataset().data,n=this._cachedMeta;if(this._parsing===!1)n._parsed=s;else{let a=l=>+s[l];if(L(s[t])){const{key:l="value"}=this._parsing;a=c=>+Ut(s[c],l)}let o,r;for(o=t,r=t+e;o<r;++o)n._parsed[o]=a(o)}}_getRotation(){return Ct(this.options.rotation-90)}_getCircumference(){return Ct(this.options.circumference)}_getRotationExtents(){let t=q,e=-q;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const n=this.chart.getDatasetMeta(s).controller,a=n._getRotation(),o=n._getCircumference();t=Math.min(t,a),e=Math.max(e,a+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:s}=e,n=this._cachedMeta,a=n.data,o=this.getMaxBorderWidth()+this.getMaxOffset(a)+this.options.spacing,r=Math.max((Math.min(s.width,s.height)-o)/2,0),l=Math.min(nr(this.options.cutout,r),1),c=this._getRingWeight(this.index),{circumference:d,rotation:h}=this._getRotationExtents(),{ratioX:u,ratioY:f,offsetX:g,offsetY:p}=tc(h,d,l),m=(s.width-o)/u,b=(s.height-o)/f,v=Math.max(Math.min(m,b)/2,0),_=tn(this.options.radius,v),k=Math.max(_*l,0),x=(_-k)/this._getVisibleDatasetWeightTotal();this.offsetX=g*_,this.offsetY=p*_,n.total=this.calculateTotal(),this.outerRadius=_-x*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-x*c,0),this.updateElements(a,0,a.length,t)}_circumference(t,e){const s=this.options,n=this._cachedMeta,a=this._getCircumference();return e&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||n._parsed[t]===null||n.data[t].hidden?0:this.calculateCircumference(n._parsed[t]*a/q)}updateElements(t,e,s,n){const a=n==="reset",o=this.chart,r=o.chartArea,c=o.options.animation,d=(r.left+r.right)/2,h=(r.top+r.bottom)/2,u=a&&c.animateScale,f=u?0:this.innerRadius,g=u?0:this.outerRadius,{sharedOptions:p,includeOptions:m}=this._getSharedOptions(e,n);let b=this._getRotation(),v;for(v=0;v<e;++v)b+=this._circumference(v,a);for(v=e;v<e+s;++v){const _=this._circumference(v,a),k=t[v],x={x:d+this.offsetX,y:h+this.offsetY,startAngle:b,endAngle:b+_,circumference:_,outerRadius:g,innerRadius:f};m&&(x.options=p||this.resolveDataElementOptions(v,k.active?"active":n)),b+=_,this.updateElement(k,v,x,n)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let s=0,n;for(n=0;n<e.length;n++){const a=t._parsed[n];a!==null&&!isNaN(a)&&this.chart.getDataVisibility(n)&&!e[n].hidden&&(s+=Math.abs(a))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?q*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,n=s.data.labels||[],a=Ki(e._parsed[t],s.options.locale);return{label:n[t]||"",value:a}}getMaxBorderWidth(t){let e=0;const s=this.chart;let n,a,o,r,l;if(!t){for(n=0,a=s.data.datasets.length;n<a;++n)if(s.isDatasetVisible(n)){o=s.getDatasetMeta(n),t=o.data,r=o.controller;break}}if(!t)return 0;for(n=0,a=t.length;n<a;++n)l=r.resolveDataElementOptions(n),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let s=0,n=t.length;s<n;++s){const a=this.resolveDataElementOptions(s);e=Math.max(e,a.offset||0,a.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(e+=this._getRingWeight(s));return e}_getRingWeight(t){return Math.max(N(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class Qn extends pi{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:s,data:n=[],_dataset:a}=e,o=this.chart._animationsDisabled;let{start:r,count:l}=Sr(e,n,o);this._drawStart=r,this._drawCount=l,Mr(e)&&(r=0,l=n.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!a._decimated,s.points=n;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!o,options:c},t),this.updateElements(n,r,l,t)}updateElements(t,e,s,n){const a=n==="reset",{iScale:o,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:h}=this._getSharedOptions(e,n),u=o.axis,f=r.axis,{spanGaps:g,segment:p}=this.options,m=Re(g)?g:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||a||n==="none",v=e+s,_=t.length;let k=e>0&&this.getParsed(e-1);for(let x=0;x<_;++x){const T=t[x],M=b?T:{};if(x<e||x>=v){M.skip=!0;continue}const C=this.getParsed(x),D=H(C[f]),I=M[u]=o.getPixelForValue(C[u],x),j=M[f]=a||D?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,C,l):C[f],x);M.skip=isNaN(I)||isNaN(j)||D,M.stop=x>0&&Math.abs(C[u]-k[u])>m,p&&(M.parsed=C,M.raw=c.data[x]),h&&(M.options=d||this.resolveDataElementOptions(x,T.active?"active":n)),b||this.updateElement(T,x,M,n),k=C}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,s=e.options&&e.options.borderWidth||0,n=t.data||[];if(!n.length)return s;const a=n[0].size(this.resolveDataElementOptions(0)),o=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,a,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}function te(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class ps{static override(t){Object.assign(ps.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return te()}parse(){return te()}format(){return te()}add(){return te()}diff(){return te()}startOf(){return te()}endOf(){return te()}}var ic={_date:ps};function sc(i,t,e,s){const{controller:n,data:a,_sorted:o}=i,r=n._cachedMeta.iScale,l=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&o&&a.length){const c=r._reversePixels?xr:Xt;if(s){if(n._sharedOptions){const d=a[0],h=typeof d.getRange=="function"&&d.getRange(t);if(h){const u=c(a,t,e-h),f=c(a,t,e+h);return{lo:u.lo,hi:f.hi}}}}else{const d=c(a,t,e);if(l){const{vScale:h}=n._cachedMeta,{_parsed:u}=i,f=u.slice(0,d.lo+1).reverse().findIndex(p=>!H(p[h.axis]));d.lo-=Math.max(0,f);const g=u.slice(d.hi).findIndex(p=>!H(p[h.axis]));d.hi+=Math.max(0,g)}return d}}return{lo:0,hi:a.length-1}}function gi(i,t,e,s,n){const a=i.getSortedVisibleDatasetMetas(),o=e[t];for(let r=0,l=a.length;r<l;++r){const{index:c,data:d}=a[r],{lo:h,hi:u}=sc(a[r],t,o,n);for(let f=h;f<=u;++f){const g=d[f];g.skip||s(g,c,f)}}}function nc(i){const t=i.indexOf("x")!==-1,e=i.indexOf("y")!==-1;return function(s,n){const a=t?Math.abs(s.x-n.x):0,o=e?Math.abs(s.y-n.y):0;return Math.sqrt(Math.pow(a,2)+Math.pow(o,2))}}function gs(i,t,e,s,n){const a=[];return!n&&!i.isPointInArea(t)||gi(i,e,t,function(r,l,c){!n&&!Be(r,i.chartArea,0)||r.inRange(t.x,t.y,s)&&a.push({element:r,datasetIndex:l,index:c})},!0),a}function ac(i,t,e,s){let n=[];function a(o,r,l){const{startAngle:c,endAngle:d}=o.getProps(["startAngle","endAngle"],s),{angle:h}=cn(o,{x:t.x,y:t.y});Le(h,c,d)&&n.push({element:o,datasetIndex:r,index:l})}return gi(i,e,t,a),n}function oc(i,t,e,s,n,a){let o=[];const r=nc(e);let l=Number.POSITIVE_INFINITY;function c(d,h,u){const f=d.inRange(t.x,t.y,n);if(s&&!f)return;const g=d.getCenterPoint(n);if(!(!!a||i.isPointInArea(g))&&!f)return;const m=r(t,g);m<l?(o=[{element:d,datasetIndex:h,index:u}],l=m):m===l&&o.push({element:d,datasetIndex:h,index:u})}return gi(i,e,t,c),o}function ms(i,t,e,s,n,a){return!a&&!i.isPointInArea(t)?[]:e==="r"&&!s?ac(i,t,e,n):oc(i,t,e,s,n,a)}function ta(i,t,e,s,n){const a=[],o=e==="x"?"inXRange":"inYRange";let r=!1;return gi(i,e,t,(l,c,d)=>{l[o]&&l[o](t[e],n)&&(a.push({element:l,datasetIndex:c,index:d}),r=r||l.inRange(t.x,t.y,n))}),s&&!r?[]:a}var rc={modes:{index(i,t,e,s){const n=Jt(t,i),a=e.axis||"x",o=e.includeInvisible||!1,r=e.intersect?gs(i,n,a,s,o):ms(i,n,a,!1,s,o),l=[];return r.length?(i.getSortedVisibleDatasetMetas().forEach(c=>{const d=r[0].index,h=c.data[d];h&&!h.skip&&l.push({element:h,datasetIndex:c.index,index:d})}),l):[]},dataset(i,t,e,s){const n=Jt(t,i),a=e.axis||"xy",o=e.includeInvisible||!1;let r=e.intersect?gs(i,n,a,s,o):ms(i,n,a,!1,s,o);if(r.length>0){const l=r[0].datasetIndex,c=i.getDatasetMeta(l).data;r=[];for(let d=0;d<c.length;++d)r.push({element:c[d],datasetIndex:l,index:d})}return r},point(i,t,e,s){const n=Jt(t,i),a=e.axis||"xy",o=e.includeInvisible||!1;return gs(i,n,a,s,o)},nearest(i,t,e,s){const n=Jt(t,i),a=e.axis||"xy",o=e.includeInvisible||!1;return ms(i,n,a,e.intersect,s,o)},x(i,t,e,s){const n=Jt(t,i);return ta(i,n,"x",e.intersect,s)},y(i,t,e,s){const n=Jt(t,i);return ta(i,n,"y",e.intersect,s)}}};const ea=["left","top","right","bottom"];function je(i,t){return i.filter(e=>e.pos===t)}function ia(i,t){return i.filter(e=>ea.indexOf(e.pos)===-1&&e.box.axis===t)}function Ve(i,t){return i.sort((e,s)=>{const n=t?s:e,a=t?e:s;return n.weight===a.weight?n.index-a.index:n.weight-a.weight})}function lc(i){const t=[];let e,s,n,a,o,r;for(e=0,s=(i||[]).length;e<s;++e)n=i[e],{position:a,options:{stack:o,stackWeight:r=1}}=n,t.push({index:e,box:n,pos:a,horizontal:n.isHorizontal(),weight:n.weight,stack:o&&a+o,stackWeight:r});return t}function cc(i){const t={};for(const e of i){const{stack:s,pos:n,stackWeight:a}=e;if(!s||!ea.includes(n))continue;const o=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=a}return t}function dc(i,t){const e=cc(i),{vBoxMaxWidth:s,hBoxMaxHeight:n}=t;let a,o,r;for(a=0,o=i.length;a<o;++a){r=i[a];const{fullSize:l}=r.box,c=e[r.stack],d=c&&r.stackWeight/c.weight;r.horizontal?(r.width=d?d*s:l&&t.availableWidth,r.height=n):(r.width=s,r.height=d?d*n:l&&t.availableHeight)}return e}function hc(i){const t=lc(i),e=Ve(t.filter(c=>c.box.fullSize),!0),s=Ve(je(t,"left"),!0),n=Ve(je(t,"right")),a=Ve(je(t,"top"),!0),o=Ve(je(t,"bottom")),r=ia(t,"x"),l=ia(t,"y");return{fullSize:e,leftAndTop:s.concat(a),rightAndBottom:n.concat(l).concat(o).concat(r),chartArea:je(t,"chartArea"),vertical:s.concat(n).concat(l),horizontal:a.concat(o).concat(r)}}function sa(i,t,e,s){return Math.max(i[e],t[e])+Math.max(i[s],t[s])}function na(i,t){i.top=Math.max(i.top,t.top),i.left=Math.max(i.left,t.left),i.bottom=Math.max(i.bottom,t.bottom),i.right=Math.max(i.right,t.right)}function uc(i,t,e,s){const{pos:n,box:a}=e,o=i.maxPadding;if(!L(n)){e.size&&(i[n]-=e.size);const h=s[e.stack]||{size:0,count:1};h.size=Math.max(h.size,e.horizontal?a.height:a.width),e.size=h.size/h.count,i[n]+=e.size}a.getPadding&&na(o,a.getPadding());const r=Math.max(0,t.outerWidth-sa(o,i,"left","right")),l=Math.max(0,t.outerHeight-sa(o,i,"top","bottom")),c=r!==i.w,d=l!==i.h;return i.w=r,i.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function fc(i){const t=i.maxPadding;function e(s){const n=Math.max(t[s]-i[s],0);return i[s]+=n,n}i.y+=e("top"),i.x+=e("left"),e("right"),e("bottom")}function pc(i,t){const e=t.maxPadding;function s(n){const a={left:0,top:0,right:0,bottom:0};return n.forEach(o=>{a[o]=Math.max(t[o],e[o])}),a}return s(i?["left","right"]:["top","bottom"])}function We(i,t,e,s){const n=[];let a,o,r,l,c,d;for(a=0,o=i.length,c=0;a<o;++a){r=i[a],l=r.box,l.update(r.width||t.w,r.height||t.h,pc(r.horizontal,t));const{same:h,other:u}=uc(t,e,r,s);c|=h&&n.length,d=d||u,l.fullSize||n.push(r)}return c&&We(n,t,e,s)||d}function mi(i,t,e,s,n){i.top=e,i.left=t,i.right=t+s,i.bottom=e+n,i.width=s,i.height=n}function aa(i,t,e,s){const n=e.padding;let{x:a,y:o}=t;for(const r of i){const l=r.box,c=s[r.stack]||{placed:0,weight:1},d=r.stackWeight/c.weight||1;if(r.horizontal){const h=t.w*d,u=c.size||l.height;Oe(c.start)&&(o=c.start),l.fullSize?mi(l,n.left,o,e.outerWidth-n.right-n.left,u):mi(l,t.left+c.placed,o,h,u),c.start=o,c.placed+=h,o=l.bottom}else{const h=t.h*d,u=c.size||l.width;Oe(c.start)&&(a=c.start),l.fullSize?mi(l,a,n.top,u,e.outerHeight-n.bottom-n.top):mi(l,a,t.top+c.placed,u,h),c.start=a,c.placed+=h,a=l.right}}t.x=a,t.y=o}var bi={addBox(i,t){i.boxes||(i.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},i.boxes.push(t)},removeBox(i,t){const e=i.boxes?i.boxes.indexOf(t):-1;e!==-1&&i.boxes.splice(e,1)},configure(i,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(i,t,e,s){if(!i)return;const n=zt(i.options.layout.padding),a=Math.max(t-n.width,0),o=Math.max(e-n.height,0),r=hc(i.boxes),l=r.vertical,c=r.horizontal;V(i.boxes,p=>{typeof p.beforeLayout=="function"&&p.beforeLayout()});const d=l.reduce((p,m)=>m.box.options&&m.box.options.display===!1?p:p+1,0)||1,h=Object.freeze({outerWidth:t,outerHeight:e,padding:n,availableWidth:a,availableHeight:o,vBoxMaxWidth:a/2/d,hBoxMaxHeight:o/2}),u=Object.assign({},n);na(u,zt(s));const f=Object.assign({maxPadding:u,w:a,h:o,x:n.left,y:n.top},n),g=dc(l.concat(c),h);We(r.fullSize,f,h,g),We(l,f,h,g),We(c,f,h,g)&&We(l,f,h,g),fc(f),aa(r.leftAndTop,f,h,g),f.x+=f.w,f.y+=f.h,aa(r.rightAndBottom,f,h,g),i.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},V(r.chartArea,p=>{const m=p.box;Object.assign(m,i.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class oa{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,s){}removeEventListener(t,e,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,s,n){return e=Math.max(0,e||t.width),s=s||t.height,{width:e,height:Math.max(0,n?Math.floor(e/n):s)}}isAttached(t){return!0}updateConfig(t){}}class gc extends oa{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const vi="$chartjs",mc={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},ra=i=>i===null||i==="";function bc(i,t){const e=i.style,s=i.getAttribute("height"),n=i.getAttribute("width");if(i[vi]={initial:{height:s,width:n,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",ra(n)){const a=En(i,"width");a!==void 0&&(i.width=a)}if(ra(s))if(i.style.height==="")i.height=i.width/(t||2);else{const a=En(i,"height");a!==void 0&&(i.height=a)}return i}const la=gl?{passive:!0}:!1;function vc(i,t,e){i&&i.addEventListener(t,e,la)}function xc(i,t,e){i&&i.canvas&&i.canvas.removeEventListener(t,e,la)}function yc(i,t){const e=mc[i.type]||i.type,{x:s,y:n}=Jt(i,t);return{type:e,chart:t,native:i,x:s!==void 0?s:null,y:n!==void 0?n:null}}function xi(i,t){for(const e of i)if(e===t||e.contains(t))return!0}function _c(i,t,e){const s=i.canvas,n=new MutationObserver(a=>{let o=!1;for(const r of a)o=o||xi(r.addedNodes,s),o=o&&!xi(r.removedNodes,s);o&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}function wc(i,t,e){const s=i.canvas,n=new MutationObserver(a=>{let o=!1;for(const r of a)o=o||xi(r.removedNodes,s),o=o&&!xi(r.addedNodes,s);o&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}const Ue=new Map;let ca=0;function da(){const i=window.devicePixelRatio;i!==ca&&(ca=i,Ue.forEach((t,e)=>{e.currentDevicePixelRatio!==i&&t()}))}function kc(i,t){Ue.size||window.addEventListener("resize",da),Ue.set(i,t)}function Sc(i){Ue.delete(i),Ue.size||window.removeEventListener("resize",da)}function Mc(i,t,e){const s=i.canvas,n=s&&ls(s);if(!n)return;const a=pn((r,l)=>{const c=n.clientWidth;e(r,l),c<n.clientWidth&&e()},window),o=new ResizeObserver(r=>{const l=r[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||a(c,d)});return o.observe(n),kc(i,a),o}function bs(i,t,e){e&&e.disconnect(),t==="resize"&&Sc(i)}function Cc(i,t,e){const s=i.canvas,n=pn(a=>{i.ctx!==null&&e(yc(a,i))},i);return vc(s,t,n),n}class $c extends oa{acquireContext(t,e){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(bc(t,e),s):null}releaseContext(t){const e=t.canvas;if(!e[vi])return!1;const s=e[vi].initial;["height","width"].forEach(a=>{const o=s[a];H(o)?e.removeAttribute(a):e.setAttribute(a,o)});const n=s.style||{};return Object.keys(n).forEach(a=>{e.style[a]=n[a]}),e.width=e.width,delete e[vi],!0}addEventListener(t,e,s){this.removeEventListener(t,e);const n=t.$proxies||(t.$proxies={}),o={attach:_c,detach:wc,resize:Mc}[e]||Cc;n[e]=o(t,e,s)}removeEventListener(t,e){const s=t.$proxies||(t.$proxies={}),n=s[e];if(!n)return;({attach:bs,detach:bs,resize:bs}[e]||xc)(t,e,n),s[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,s,n){return pl(t,e,s,n)}isAttached(t){const e=t&&ls(t);return!!(e&&e.isConnected)}}function Tc(i){return!rs()||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas?gc:$c}class ee{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}hasValue(){return Re(this.x)&&Re(this.y)}getProps(t,e){const s=this.$animations;if(!e||!s)return this;const n={};return t.forEach(a=>{n[a]=s[a]&&s[a].active()?s[a]._to:this[a]}),n}}function Ac(i,t){const e=i.options.ticks,s=Dc(i),n=Math.min(e.maxTicksLimit||s,s),a=e.major.enabled?Oc(t):[],o=a.length,r=a[0],l=a[o-1],c=[];if(o>n)return Ec(t,c,a,o/n),c;const d=Pc(a,t,n);if(o>0){let h,u;const f=o>1?Math.round((l-r)/(o-1)):null;for(yi(t,c,d,H(f)?0:r-f,r),h=0,u=o-1;h<u;h++)yi(t,c,d,a[h],a[h+1]);return yi(t,c,d,l,H(f)?t.length:l+f),c}return yi(t,c,d),c}function Dc(i){const t=i.options.offset,e=i._tickSize(),s=i._length/e+(t?0:1),n=i._maxLength/e;return Math.floor(Math.min(s,n))}function Pc(i,t,e){const s=Rc(i),n=t.length/e;if(!s)return Math.max(n,1);const a=ur(s);for(let o=0,r=a.length-1;o<r;o++){const l=a[o];if(l>n)return l}return Math.max(n,1)}function Oc(i){const t=[];let e,s;for(e=0,s=i.length;e<s;e++)i[e].major&&t.push(e);return t}function Ec(i,t,e,s){let n=0,a=e[0],o;for(s=Math.ceil(s),o=0;o<i.length;o++)o===a&&(t.push(i[o]),n++,a=e[n*s])}function yi(i,t,e,s,n){const a=N(s,0),o=Math.min(N(n,i.length),i.length);let r=0,l,c,d;for(e=Math.ceil(e),n&&(l=n-s,e=l/Math.floor(l/e)),d=a;d<0;)r++,d=Math.round(a+r*e);for(c=Math.max(a,0);c<o;c++)c===d&&(t.push(i[c]),r++,d=Math.round(a+r*e))}function Rc(i){const t=i.length;let e,s;if(t<2)return!1;for(s=i[0],e=1;e<t;++e)if(i[e]-i[e-1]!==s)return!1;return s}const Lc=i=>i==="left"?"right":i==="right"?"left":i,ha=(i,t,e)=>t==="top"||t==="left"?i[t]+e:i[t]-e,ua=(i,t)=>Math.min(t||i,i);function fa(i,t){const e=[],s=i.length/t,n=i.length;let a=0;for(;a<n;a+=s)e.push(i[Math.floor(a)]);return e}function Ic(i,t,e){const s=i.ticks.length,n=Math.min(t,s-1),a=i._startPixel,o=i._endPixel,r=1e-6;let l=i.getPixelForTick(n),c;if(!(e&&(s===1?c=Math.max(l-a,o-l):t===0?c=(i.getPixelForTick(1)-l)/2:c=(l-i.getPixelForTick(n-1))/2,l+=n<t?c:-c,l<a-r||l>o+r)))return l}function zc(i,t){V(i,e=>{const s=e.gc,n=s.length/2;let a;if(n>t){for(a=0;a<n;++a)delete e.data[s[a]];s.splice(0,n)}})}function Ye(i){return i.drawTicks?i.tickLength:0}function pa(i,t){if(!i.display)return 0;const e=yt(i.font,t),s=zt(i.padding);return(tt(i.text)?i.text.length:1)*e.lineHeight+s.height}function Fc(i,t){return Kt(i,{scale:t,type:"scale"})}function Bc(i,t,e){return Kt(i,{tick:e,index:t,type:"tick"})}function Nc(i,t,e){let s=kr(i);return(e&&t!=="right"||!e&&t==="right")&&(s=Lc(s)),s}function Hc(i,t,e,s){const{top:n,left:a,bottom:o,right:r,chart:l}=i,{chartArea:c,scales:d}=l;let h=0,u,f,g;const p=o-n,m=r-a;if(i.isHorizontal()){if(f=gn(s,a,r),L(e)){const b=Object.keys(e)[0],v=e[b];g=d[b].getPixelForValue(v)+p-t}else e==="center"?g=(c.bottom+c.top)/2+p-t:g=ha(i,e,t);u=r-a}else{if(L(e)){const b=Object.keys(e)[0],v=e[b];f=d[b].getPixelForValue(v)-m+t}else e==="center"?f=(c.left+c.right)/2-m+t:f=ha(i,e,t);g=gn(s,o,n),h=e==="left"?-et:et}return{titleX:f,titleY:g,maxWidth:u,rotation:h}}class pe extends ee{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:s,_suggestedMax:n}=this;return t=vt(t,Number.POSITIVE_INFINITY),e=vt(e,Number.NEGATIVE_INFINITY),s=vt(s,Number.POSITIVE_INFINITY),n=vt(n,Number.NEGATIVE_INFINITY),{min:vt(t,s),max:vt(e,n),minDefined:ot(t),maxDefined:ot(e)}}getMinMax(t){let{min:e,max:s,minDefined:n,maxDefined:a}=this.getUserBounds(),o;if(n&&a)return{min:e,max:s};const r=this.getMatchingVisibleMetas();for(let l=0,c=r.length;l<c;++l)o=r[l].controller.getMinMax(this,t),n||(e=Math.min(e,o.min)),a||(s=Math.max(s,o.max));return e=a&&e>s?s:e,s=n&&e>s?e:s,{min:vt(e,vt(s,e)),max:vt(s,vt(e,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){K(this.options.beforeUpdate,[this])}update(t,e,s){const{beginAtZero:n,grace:a,ticks:o}=this.options,r=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Yr(this,a,n),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?fa(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=Ac(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,s;this.isHorizontal()?(e=this.left,s=this.right):(e=this.top,s=this.bottom,t=!t),this._startPixel=e,this._endPixel=s,this._reversePixels=t,this._length=s-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){K(this.options.afterUpdate,[this])}beforeSetDimensions(){K(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){K(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),K(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){K(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let s,n,a;for(s=0,n=t.length;s<n;s++)a=t[s],a.label=K(e.callback,[a.value,s,t],this)}afterTickToLabelConversion(){K(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){K(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,s=ua(this.ticks.length,t.ticks.maxTicksLimit),n=e.minRotation||0,a=e.maxRotation;let o=n,r,l,c;if(!this._isVisible()||!e.display||n>=a||s<=1||!this.isHorizontal()){this.labelRotation=n;return}const d=this._getLabelSizes(),h=d.widest.width,u=d.highest.height,f=rt(this.chart.width-h,0,this.maxWidth);r=t.offset?this.maxWidth/s:f/(s-1),h+6>r&&(r=f/(s-(t.offset?.5:1)),l=this.maxHeight-Ye(t.grid)-e.padding-pa(t.title,this.chart.options.font),c=Math.sqrt(h*h+u*u),o=mr(Math.min(Math.asin(rt((d.highest.height+6)/r,-1,1)),Math.asin(rt(l/c,-1,1))-Math.asin(rt(u/c,-1,1)))),o=Math.max(n,Math.min(a,o))),this.labelRotation=o}afterCalculateLabelRotation(){K(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){K(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:s,title:n,grid:a}}=this,o=this._isVisible(),r=this.isHorizontal();if(o){const l=pa(n,e.options.font);if(r?(t.width=this.maxWidth,t.height=Ye(a)+l):(t.height=this.maxHeight,t.width=Ye(a)+l),s.display&&this.ticks.length){const{first:c,last:d,widest:h,highest:u}=this._getLabelSizes(),f=s.padding*2,g=Ct(this.labelRotation),p=Math.cos(g),m=Math.sin(g);if(r){const b=s.mirror?0:m*h.width+p*u.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=s.mirror?0:p*h.width+m*u.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(c,d,m,p)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,s,n){const{ticks:{align:a,padding:o},position:r}=this.options,l=this.labelRotation!==0,c=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let u=0,f=0;l?c?(u=n*t.width,f=s*e.height):(u=s*t.height,f=n*e.width):a==="start"?f=e.width:a==="end"?u=t.width:a!=="inner"&&(u=t.width/2,f=e.width/2),this.paddingLeft=Math.max((u-d+o)*this.width/(this.width-d),0),this.paddingRight=Math.max((f-h+o)*this.width/(this.width-h),0)}else{let d=e.height/2,h=t.height/2;a==="start"?(d=0,h=t.height):a==="end"&&(d=e.height,h=0),this.paddingTop=d+o,this.paddingBottom=h+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){K(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,s;for(e=0,s=t.length;e<s;e++)H(t[e].label)&&(t.splice(e,1),s--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let s=this.ticks;e<s.length&&(s=fa(s,e)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,s){const{ctx:n,_longestTextCache:a}=this,o=[],r=[],l=Math.floor(e/ua(e,s));let c=0,d=0,h,u,f,g,p,m,b,v,_,k,x;for(h=0;h<e;h+=l){if(g=t[h].label,p=this._resolveTickFontOptions(h),n.font=m=p.string,b=a[m]=a[m]||{data:{},gc:[]},v=p.lineHeight,_=k=0,!H(g)&&!tt(g))_=_n(n,b.data,b.gc,_,g),k=v;else if(tt(g))for(u=0,f=g.length;u<f;++u)x=g[u],!H(x)&&!tt(x)&&(_=_n(n,b.data,b.gc,_,x),k+=v);o.push(_),r.push(k),c=Math.max(_,c),d=Math.max(k,d)}zc(a,e);const T=o.indexOf(c),M=r.indexOf(d),C=D=>({width:o[D]||0,height:r[D]||0});return{first:C(0),last:C(e-1),widest:C(T),highest:C(M),widths:o,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return vr(this._alignToPixels?Gt(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const s=e[t];return s.$context||(s.$context=Bc(this.getContext(),t,s))}return this.$context||(this.$context=Fc(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=Ct(this.labelRotation),s=Math.abs(Math.cos(e)),n=Math.abs(Math.sin(e)),a=this._getLabelSizes(),o=t.autoSkipPadding||0,r=a?a.widest.width+o:0,l=a?a.highest.height+o:0;return this.isHorizontal()?l*s>r*n?r/s:l/n:l*n<r*s?l/s:r/n}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,s=this.chart,n=this.options,{grid:a,position:o,border:r}=n,l=a.offset,c=this.isHorizontal(),h=this.ticks.length+(l?1:0),u=Ye(a),f=[],g=r.setContext(this.getContext()),p=g.display?g.width:0,m=p/2,b=function(F){return Gt(s,F,p)};let v,_,k,x,T,M,C,D,I,j,S,P;if(o==="top")v=b(this.bottom),M=this.bottom-u,D=v-m,j=b(t.top)+m,P=t.bottom;else if(o==="bottom")v=b(this.top),j=t.top,P=b(t.bottom)-m,M=v+m,D=this.top+u;else if(o==="left")v=b(this.right),T=this.right-u,C=v-m,I=b(t.left)+m,S=t.right;else if(o==="right")v=b(this.left),I=t.left,S=b(t.right)-m,T=v+m,C=this.left+u;else if(e==="x"){if(o==="center")v=b((t.top+t.bottom)/2+.5);else if(L(o)){const F=Object.keys(o)[0],z=o[F];v=b(this.chart.scales[F].getPixelForValue(z))}j=t.top,P=t.bottom,M=v+m,D=M+u}else if(e==="y"){if(o==="center")v=b((t.left+t.right)/2);else if(L(o)){const F=Object.keys(o)[0],z=o[F];v=b(this.chart.scales[F].getPixelForValue(z))}T=v-m,C=T-u,I=t.left,S=t.right}const R=N(n.ticks.maxTicksLimit,h),$=Math.max(1,Math.ceil(h/R));for(_=0;_<h;_+=$){const F=this.getContext(_),z=a.setContext(F),X=r.setContext(F),Y=z.lineWidth,lt=z.color,O=X.dash||[],B=X.dashOffset,W=z.tickWidth,Q=z.tickColor,mt=z.tickBorderDash||[],oe=z.tickBorderDashOffset;k=Ic(this,_,l),k!==void 0&&(x=Gt(s,k,Y),c?T=C=I=S=x:M=D=j=P=x,f.push({tx1:T,ty1:M,tx2:C,ty2:D,x1:I,y1:j,x2:S,y2:P,width:Y,color:lt,borderDash:O,borderDashOffset:B,tickWidth:W,tickColor:Q,tickBorderDash:mt,tickBorderDashOffset:oe}))}return this._ticksLength=h,this._borderValue=v,f}_computeLabelItems(t){const e=this.axis,s=this.options,{position:n,ticks:a}=s,o=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:c,padding:d,mirror:h}=a,u=Ye(s.grid),f=u+d,g=h?-d:f,p=-Ct(this.labelRotation),m=[];let b,v,_,k,x,T,M,C,D,I,j,S,P="middle";if(n==="top")T=this.bottom-g,M=this._getXAxisLabelAlignment();else if(n==="bottom")T=this.top+g,M=this._getXAxisLabelAlignment();else if(n==="left"){const $=this._getYAxisLabelAlignment(u);M=$.textAlign,x=$.x}else if(n==="right"){const $=this._getYAxisLabelAlignment(u);M=$.textAlign,x=$.x}else if(e==="x"){if(n==="center")T=(t.top+t.bottom)/2+f;else if(L(n)){const $=Object.keys(n)[0],F=n[$];T=this.chart.scales[$].getPixelForValue(F)+f}M=this._getXAxisLabelAlignment()}else if(e==="y"){if(n==="center")x=(t.left+t.right)/2-f;else if(L(n)){const $=Object.keys(n)[0],F=n[$];x=this.chart.scales[$].getPixelForValue(F)}M=this._getYAxisLabelAlignment(u).textAlign}e==="y"&&(l==="start"?P="top":l==="end"&&(P="bottom"));const R=this._getLabelSizes();for(b=0,v=r.length;b<v;++b){_=r[b],k=_.label;const $=a.setContext(this.getContext(b));C=this.getPixelForTick(b)+a.labelOffset,D=this._resolveTickFontOptions(b),I=D.lineHeight,j=tt(k)?k.length:1;const F=j/2,z=$.color,X=$.textStrokeColor,Y=$.textStrokeWidth;let lt=M;o?(x=C,M==="inner"&&(b===v-1?lt=this.options.reverse?"left":"right":b===0?lt=this.options.reverse?"right":"left":lt="center"),n==="top"?c==="near"||p!==0?S=-j*I+I/2:c==="center"?S=-R.highest.height/2-F*I+I:S=-R.highest.height+I/2:c==="near"||p!==0?S=I/2:c==="center"?S=R.highest.height/2-F*I:S=R.highest.height-j*I,h&&(S*=-1),p!==0&&!$.showLabelBackdrop&&(x+=I/2*Math.sin(p))):(T=C,S=(1-j)*I/2);let O;if($.showLabelBackdrop){const B=zt($.backdropPadding),W=R.heights[b],Q=R.widths[b];let mt=S-B.top,oe=0-B.left;switch(P){case"middle":mt-=W/2;break;case"bottom":mt-=W;break}switch(M){case"center":oe-=Q/2;break;case"right":oe-=Q;break;case"inner":b===v-1?oe-=Q:b>0&&(oe-=Q/2);break}O={left:oe,top:mt,width:Q+B.width,height:W+B.height,color:$.backdropColor}}m.push({label:k,font:D,textOffset:S,options:{rotation:p,color:z,strokeColor:X,strokeWidth:Y,textAlign:lt,textBaseline:P,translation:[x,T],backdrop:O}})}return m}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-Ct(this.labelRotation))return t==="top"?"left":"right";let n="center";return e.align==="start"?n="left":e.align==="end"?n="right":e.align==="inner"&&(n="inner"),n}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:s,mirror:n,padding:a}}=this.options,o=this._getLabelSizes(),r=t+a,l=o.widest.width;let c,d;return e==="left"?n?(d=this.right+a,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-r,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?n?(d=this.left+a,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+r,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:s,top:n,width:a,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(s,n,a,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const n=this.ticks.findIndex(a=>a.value===t);return n>=0?e.setContext(this.getContext(n)).lineWidth:0}drawGrid(t){const e=this.options.grid,s=this.ctx,n=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let a,o;const r=(l,c,d)=>{!d.width||!d.color||(s.save(),s.lineWidth=d.width,s.strokeStyle=d.color,s.setLineDash(d.borderDash||[]),s.lineDashOffset=d.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(e.display)for(a=0,o=n.length;a<o;++a){const l=n[a];e.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:s,grid:n}}=this,a=s.setContext(this.getContext()),o=s.display?a.width:0;if(!o)return;const r=n.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,h,u;this.isHorizontal()?(c=Gt(t,this.left,o)-o/2,d=Gt(t,this.right,r)+r/2,h=u=l):(h=Gt(t,this.top,o)-o/2,u=Gt(t,this.bottom,r)+r/2,c=d=l),e.save(),e.lineWidth=a.width,e.strokeStyle=a.color,e.beginPath(),e.moveTo(c,h),e.lineTo(d,u),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const s=this.ctx,n=this._computeLabelArea();n&&ts(s,n);const a=this.getLabelItems(t);for(const o of a){const r=o.options,l=o.font,c=o.label,d=o.textOffset;kn(s,c,0,d,l,r)}n&&es(s)}drawTitle(){const{ctx:t,options:{position:e,title:s,reverse:n}}=this;if(!s.display)return;const a=yt(s.font),o=zt(s.padding),r=s.align;let l=a.lineHeight/2;e==="bottom"||e==="center"||L(e)?(l+=o.bottom,tt(s.text)&&(l+=a.lineHeight*(s.text.length-1))):l+=o.top;const{titleX:c,titleY:d,maxWidth:h,rotation:u}=Hc(this,l,e,r);kn(t,s.text,0,0,a,{color:s.color,maxWidth:h,rotation:u,textAlign:Nc(r,e,n),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,s=N(t.grid&&t.grid.z,-1),n=N(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==pe.prototype.draw?[{z:e,draw:a=>{this.draw(a)}}]:[{z:s,draw:a=>{this.drawBackground(),this.drawGrid(a),this.drawTitle()}},{z:n,draw:()=>{this.drawBorder()}},{z:e,draw:a=>{this.drawLabels(a)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",n=[];let a,o;for(a=0,o=e.length;a<o;++a){const r=e[a];r[s]===this.id&&(!t||r.type===t)&&n.push(r)}return n}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return yt(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class _i{constructor(t,e,s){this.type=t,this.scope=e,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let s;Wc(e)&&(s=this.register(e));const n=this.items,a=t.id,o=this.scope+"."+a;if(!a)throw new Error("class does not have id: "+t);return a in n||(n[a]=t,jc(t,o,s),this.override&&J.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,s=t.id,n=this.scope;s in e&&delete e[s],n&&s in J[n]&&(delete J[n][s],this.override&&delete qt[s])}}function jc(i,t,e){const s=De(Object.create(null),[e?J.get(e):{},J.get(t),i.defaults]);J.set(t,s),i.defaultRoutes&&Vc(t,i.defaultRoutes),i.descriptors&&J.describe(t,i.descriptors)}function Vc(i,t){Object.keys(t).forEach(e=>{const s=e.split("."),n=s.pop(),a=[i].concat(s).join("."),o=t[e].split("."),r=o.pop(),l=o.join(".");J.route(a,n,l,r)})}function Wc(i){return"id"in i&&"defaults"in i}class Uc{constructor(){this.controllers=new _i(pi,"datasets",!0),this.elements=new _i(ee,"elements"),this.plugins=new _i(Object,"plugins"),this.scales=new _i(pe,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,s){[...e].forEach(n=>{const a=s||this._getRegistryForType(n);s||a.isForType(n)||a===this.plugins&&n.id?this._exec(t,a,n):V(n,o=>{const r=s||this._getRegistryForType(o);this._exec(t,r,o)})})}_exec(t,e,s){const n=Ui(t);K(s["before"+n],[],s),e[t](s),K(s["after"+n],[],s)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const s=this._typedRegistries[e];if(s.isForType(t))return s}return this.plugins}_get(t,e,s){const n=e.get(t);if(n===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return n}}var _t=new Uc;class Yc{constructor(){this._init=void 0}notify(t,e,s,n){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const a=n?this._descriptors(t).filter(n):this._descriptors(t),o=this._notify(a,t,e,s);return e==="afterDestroy"&&(this._notify(a,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,e,s,n){n=n||{};for(const a of t){const o=a.plugin,r=o[s],l=[e,n,a.options];if(K(r,l,o)===!1&&n.cancelable)return!1}return!0}invalidate(){H(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const s=t&&t.config,n=N(s.options&&s.options.plugins,{}),a=Xc(s);return n===!1&&!e?[]:Gc(t,a,n,e)}_notifyStateChanges(t){const e=this._oldCache||[],s=this._cache,n=(a,o)=>a.filter(r=>!o.some(l=>r.plugin.id===l.plugin.id));this._notify(n(e,s),t,"stop"),this._notify(n(s,e),t,"start")}}function Xc(i){const t={},e=[],s=Object.keys(_t.plugins.items);for(let a=0;a<s.length;a++)e.push(_t.getPlugin(s[a]));const n=i.plugins||[];for(let a=0;a<n.length;a++){const o=n[a];e.indexOf(o)===-1&&(e.push(o),t[o.id]=!0)}return{plugins:e,localIds:t}}function qc(i,t){return!t&&i===!1?null:i===!0?{}:i}function Gc(i,{plugins:t,localIds:e},s,n){const a=[],o=i.getContext();for(const r of t){const l=r.id,c=qc(s[l],n);c!==null&&a.push({plugin:r,options:Kc(i.config,{plugin:r,local:e[l]},c,o)})}return a}function Kc(i,{plugin:t,local:e},s,n){const a=i.pluginScopeKeys(t),o=i.getOptionScopes(s,a);return e&&t.defaults&&o.push(t.defaults),i.createResolver(o,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function vs(i,t){const e=J.datasets[i]||{};return((t.datasets||{})[i]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function Zc(i,t){let e=i;return i==="_index_"?e=t:i==="_value_"&&(e=t==="x"?"y":"x"),e}function Jc(i,t){return i===t?"_index_":"_value_"}function ga(i){if(i==="x"||i==="y"||i==="r")return i}function Qc(i){if(i==="top"||i==="bottom")return"x";if(i==="left"||i==="right")return"y"}function xs(i,...t){if(ga(i))return i;for(const e of t){const s=e.axis||Qc(e.position)||i.length>1&&ga(i[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)}function ma(i,t,e){if(e[t+"AxisID"]===i)return{axis:t}}function td(i,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(s=>s.xAxisID===i||s.yAxisID===i);if(e.length)return ma(i,"x",e[0])||ma(i,"y",e[0])}return{}}function ed(i,t){const e=qt[i.type]||{scales:{}},s=t.scales||{},n=vs(i.type,t),a=Object.create(null);return Object.keys(s).forEach(o=>{const r=s[o];if(!L(r))return console.error(`Invalid scale configuration for scale: ${o}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const l=xs(o,r,td(o,i),J.scales[r.type]),c=Jc(l,n),d=e.scales||{};a[o]=Pe(Object.create(null),[{axis:l},r,d[l],d[c]])}),i.data.datasets.forEach(o=>{const r=o.type||i.type,l=o.indexAxis||vs(r,t),d=(qt[r]||{}).scales||{};Object.keys(d).forEach(h=>{const u=Zc(h,l),f=o[u+"AxisID"]||u;a[f]=a[f]||Object.create(null),Pe(a[f],[{axis:u},s[f],d[h]])})}),Object.keys(a).forEach(o=>{const r=a[o];Pe(r,[J.scales[r.type],J.scale])}),a}function ba(i){const t=i.options||(i.options={});t.plugins=N(t.plugins,{}),t.scales=ed(i,t)}function va(i){return i=i||{},i.datasets=i.datasets||[],i.labels=i.labels||[],i}function id(i){return i=i||{},i.data=va(i.data),ba(i),i}const xa=new Map,ya=new Set;function wi(i,t){let e=xa.get(i);return e||(e=t(),xa.set(i,e),ya.add(e)),e}const Xe=(i,t,e)=>{const s=Ut(t,e);s!==void 0&&i.add(s)};class sd{constructor(t){this._config=id(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=va(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),ba(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return wi(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return wi(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return wi(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,s=this.type;return wi(`${s}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const s=this._scopeCache;let n=s.get(t);return(!n||e)&&(n=new Map,s.set(t,n)),n}getOptionScopes(t,e,s){const{options:n,type:a}=this,o=this._cachedScopes(t,s),r=o.get(e);if(r)return r;const l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(h=>Xe(l,t,h))),d.forEach(h=>Xe(l,n,h)),d.forEach(h=>Xe(l,qt[a]||{},h)),d.forEach(h=>Xe(l,J,h)),d.forEach(h=>Xe(l,Zi,h))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),ya.has(e)&&o.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,qt[e]||{},J.datasets[e]||{},{type:e},J,Zi]}resolveNamedOptions(t,e,s,n=[""]){const a={$shared:!0},{resolver:o,subPrefixes:r}=_a(this._resolverCache,t,n);let l=o;if(ad(o,e)){a.$shared=!1,s=It(s)?s():s;const c=this.createResolver(t,s,r);l=ue(o,s,c)}for(const c of e)a[c]=l[c];return a}createResolver(t,e,s=[""],n){const{resolver:a}=_a(this._resolverCache,t,s);return L(e)?ue(a,e,void 0,n):a}}function _a(i,t,e){let s=i.get(t);s||(s=new Map,i.set(t,s));const n=e.join();let a=s.get(n);return a||(a={resolver:ns(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},s.set(n,a)),a}const nd=i=>L(i)&&Object.getOwnPropertyNames(i).some(t=>It(i[t]));function ad(i,t){const{isScriptable:e,isIndexable:s}=Mn(i);for(const n of t){const a=e(n),o=s(n),r=(o||a)&&i[n];if(a&&(It(r)||nd(r))||o&&tt(r))return!0}return!1}var od="4.5.1";const rd=["top","bottom","left","right","chartArea"];function wa(i,t){return i==="top"||i==="bottom"||rd.indexOf(i)===-1&&t==="x"}function ka(i,t){return function(e,s){return e[i]===s[i]?e[t]-s[t]:e[i]-s[i]}}function Sa(i){const t=i.chart,e=t.options.animation;t.notifyPlugins("afterRender"),K(e&&e.onComplete,[i],t)}function ld(i){const t=i.chart,e=t.options.animation;K(e&&e.onProgress,[i],t)}function Ma(i){return rs()&&typeof i=="string"?i=document.getElementById(i):i&&i.length&&(i=i[0]),i&&i.canvas&&(i=i.canvas),i}const ki={},Ca=i=>{const t=Ma(i);return Object.values(ki).filter(e=>e.canvas===t).pop()};function cd(i,t,e){const s=Object.keys(i);for(const n of s){const a=+n;if(a>=t){const o=i[n];delete i[n],(e>0||a>t)&&(i[a+e]=o)}}}function dd(i,t,e,s){return!e||i.type==="mouseout"?null:s?t:i}class ie{static defaults=J;static instances=ki;static overrides=qt;static registry=_t;static version=od;static getChart=Ca;static register(...t){_t.add(...t),$a()}static unregister(...t){_t.remove(...t),$a()}constructor(t,e){const s=this.config=new sd(e),n=Ma(t),a=Ca(n);if(a)throw new Error("Canvas is already in use. Chart with ID '"+a.id+"' must be destroyed before the canvas with ID '"+a.canvas.id+"' can be reused.");const o=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||Tc(n)),this.platform.updateConfig(s);const r=this.platform.acquireContext(n,o.aspectRatio),l=r&&r.canvas,c=l&&l.height,d=l&&l.width;if(this.id=sr(),this.ctx=r,this.canvas=l,this.width=d,this.height=c,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Yc,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=wr(h=>this.update(h),o.resizeDelay||0),this._dataChanges=[],ki[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}$t.listen(this,"complete",Sa),$t.listen(this,"progress",ld),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:s,height:n,_aspectRatio:a}=this;return H(t)?e&&a?a:n?s/n:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return _t}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():On(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return wn(this.canvas,this.ctx),this}stop(){return $t.stop(this),this}resize(t,e){$t.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const s=this.options,n=this.canvas,a=s.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(n,t,e,a),r=s.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,On(this,r,!0)&&(this.notifyPlugins("resize",{size:o}),K(s.onResize,[this,o],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};V(e,(s,n)=>{s.id=n})}buildOrUpdateScales(){const t=this.options,e=t.scales,s=this.scales,n=Object.keys(s).reduce((o,r)=>(o[r]=!1,o),{});let a=[];e&&(a=a.concat(Object.keys(e).map(o=>{const r=e[o],l=xs(o,r),c=l==="r",d=l==="x";return{options:r,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),V(a,o=>{const r=o.options,l=r.id,c=xs(l,r),d=N(r.type,o.dtype);(r.position===void 0||wa(r.position,c)!==wa(o.dposition))&&(r.position=o.dposition),n[l]=!0;let h=null;if(l in s&&s[l].type===d)h=s[l];else{const u=_t.getScale(d);h=new u({id:l,type:d,ctx:this.ctx,chart:this}),s[h.id]=h}h.init(r,t)}),V(n,(o,r)=>{o||delete s[r]}),V(s,o=>{bi.configure(this,o,o.options),bi.addBox(this,o)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,s=t.length;if(t.sort((n,a)=>n.index-a.index),s>e){for(let n=e;n<s;++n)this._destroyDatasetMeta(n);t.splice(e,s-e)}this._sortedMetasets=t.slice(0).sort(ka("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((s,n)=>{e.filter(a=>a===s._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let s,n;for(this._removeUnreferencedMetasets(),s=0,n=e.length;s<n;s++){const a=e[s];let o=this.getDatasetMeta(s);const r=a.type||this.config.type;if(o.type&&o.type!==r&&(this._destroyDatasetMeta(s),o=this.getDatasetMeta(s)),o.type=r,o.indexAxis=a.indexAxis||vs(r,this.options),o.order=a.order||0,o.index=s,o.label=""+a.label,o.visible=this.isDatasetVisible(s),o.controller)o.controller.updateIndex(s),o.controller.linkScales();else{const l=_t.getController(r),{datasetElementType:c,dataElementType:d}=J.datasets[r];Object.assign(l,{dataElementType:_t.getElement(d),datasetElementType:c&&_t.getElement(c)}),o.controller=new l(this,s),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){V(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const s=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),n=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const a=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:h}=this.getDatasetMeta(c),u=!n&&a.indexOf(h)===-1;h.buildOrUpdateElements(u),o=Math.max(+h.getMaxOverflow(),o)}o=this._minPadding=s.layout.autoPadding?o:0,this._updateLayout(o),n||V(a,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(ka("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){V(this.scales,t=>{bi.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!nn(e,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:s,start:n,count:a}of e){const o=s==="_removeElements"?-a:a;cd(t,n,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,s=a=>new Set(t.filter(o=>o[0]===a).map((o,r)=>r+","+o.splice(1).join(","))),n=s(0);for(let a=1;a<e;a++)if(!nn(n,s(a)))return;return Array.from(n).map(a=>a.split(",")).map(a=>({method:a[1],start:+a[2],count:+a[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;bi.update(this,this.width,this.height,t);const e=this.chartArea,s=e.width<=0||e.height<=0;this._layers=[],V(this.boxes,n=>{s&&n.position==="chartArea"||(n.configure&&n.configure(),this._layers.push(...n._layers()))},this),this._layers.forEach((n,a)=>{n._idx=a}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,s=this.data.datasets.length;e<s;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,s=this.data.datasets.length;e<s;++e)this._updateDataset(e,It(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const s=this.getDatasetMeta(t),n={meta:s,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",n)!==!1&&(s.controller._update(e),n.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",n))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&($t.has(this)?this.attached&&!$t.running(this)&&$t.start(this):(this.draw(),Sa({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:n}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,n)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,s=[];let n,a;for(n=0,a=e.length;n<a;++n){const o=e[n];(!t||o.visible)&&s.push(o)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,s={meta:t,index:t.index,cancelable:!0},n=Nn(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(n&&ts(e,n),t.controller.draw(),n&&es(e),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return Be(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,s,n){const a=rc.modes[e];return typeof a=="function"?a(this,t,s,n):[]}getDatasetMeta(t){const e=this.data.datasets[t],s=this._metasets;let n=s.filter(a=>a&&a._dataset===e).pop();return n||(n={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},s.push(n)),n}getContext(){return this.$context||(this.$context=Kt(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!e.hidden}setDatasetVisibility(t,e){const s=this.getDatasetMeta(t);s.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,s){const n=s?"show":"hide",a=this.getDatasetMeta(t),o=a.controller._resolveAnimations(void 0,n);Oe(e)?(a.data[e].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),o.update(a,{visible:s}),this.update(r=>r.datasetIndex===t?n:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),$t.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),wn(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete ki[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,s=(a,o)=>{e.addEventListener(this,a,o),t[a]=o},n=(a,o,r)=>{a.offsetX=o,a.offsetY=r,this._eventHandler(a)};V(this.options.events,a=>s(a,n))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,s=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},n=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},a=(l,c)=>{this.canvas&&this.resize(l,c)};let o;const r=()=>{n("attach",r),this.attached=!0,this.resize(),s("resize",a),s("detach",o)};o=()=>{this.attached=!1,n("resize",a),this._stop(),this._resize(0,0),s("attach",r)},e.isAttached(this.canvas)?r():o()}unbindEvents(){V(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},V(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,s){const n=s?"set":"remove";let a,o,r,l;for(e==="dataset"&&(a=this.getDatasetMeta(t[0].datasetIndex),a.controller["_"+n+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){o=t[r];const c=o&&this.getDatasetMeta(o.datasetIndex).controller;c&&c[n+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],s=t.map(({datasetIndex:a,index:o})=>{const r=this.getDatasetMeta(a);if(!r)throw new Error("No dataset found at index "+a);return{datasetIndex:a,element:r.data[o],index:o}});!ai(s,e)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,e))}notifyPlugins(t,e,s){return this._plugins.notify(this,t,e,s)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,s){const n=this.options.hover,a=(l,c)=>l.filter(d=>!c.some(h=>d.datasetIndex===h.datasetIndex&&d.index===h.index)),o=a(e,t),r=s?t:a(t,e);o.length&&this.updateHoverStyle(o,n.mode,!1),r.length&&n.mode&&this.updateHoverStyle(r,n.mode,!0)}_eventHandler(t,e){const s={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},n=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,n)===!1)return;const a=this._handleEvent(t,e,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,n),(a||s.changed)&&this.render(),this}_handleEvent(t,e,s){const{_active:n=[],options:a}=this,o=e,r=this._getActiveElements(t,n,s,o),l=cr(t),c=dd(t,this._lastEvent,s,l);s&&(this._lastEvent=null,K(a.onHover,[t,r,this],this),l&&K(a.onClick,[t,r,this],this));const d=!ai(r,n);return(d||e)&&(this._active=r,this._updateHoverStyles(r,n,e)),this._lastEvent=c,d}_getActiveElements(t,e,s,n){if(t.type==="mouseout")return[];if(!s)return e;const a=this.options.hover;return this.getElementsAtEventForMode(t,a.mode,a,n)}}function $a(){return V(ie.instances,i=>i._plugins.invalidate())}function hd(i,t,e){const{startAngle:s,x:n,y:a,outerRadius:o,innerRadius:r,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,h=Math.min(c/o,ft(s-e));if(i.beginPath(),i.arc(n,a,o-c/2,s+h/2,e-h/2),r>0){const u=Math.min(c/r,ft(s-e));i.arc(n,a,r+c/2,e-u/2,s+u/2,!0)}else{const u=Math.min(c/2,o*ft(s-e));if(d==="round")i.arc(n,a,u,e-U/2,s+U/2,!0);else if(d==="bevel"){const f=2*u*u,g=-f*Math.cos(e+U/2)+n,p=-f*Math.sin(e+U/2)+a,m=f*Math.cos(s+U/2)+n,b=f*Math.sin(s+U/2)+a;i.lineTo(g,p),i.lineTo(m,b)}}i.closePath(),i.moveTo(0,0),i.rect(0,0,i.canvas.width,i.canvas.height),i.clip("evenodd")}function ud(i,t,e){const{startAngle:s,pixelMargin:n,x:a,y:o,outerRadius:r,innerRadius:l}=t;let c=n/r;i.beginPath(),i.arc(a,o,r,s-c,e+c),l>n?(c=n/l,i.arc(a,o,l,e+c,s-c,!0)):i.arc(a,o,n,e+et,s-et),i.closePath(),i.clip()}function fd(i){return ss(i,["outerStart","outerEnd","innerStart","innerEnd"])}function pd(i,t,e,s){const n=fd(i.options.borderRadius),a=(e-t)/2,o=Math.min(a,s*t/2),r=l=>{const c=(e-Math.min(a,l))*s/2;return rt(l,0,Math.min(a,c))};return{outerStart:r(n.outerStart),outerEnd:r(n.outerEnd),innerStart:rt(n.innerStart,0,o),innerEnd:rt(n.innerEnd,0,o)}}function ge(i,t,e,s){return{x:e+i*Math.cos(t),y:s+i*Math.sin(t)}}function Si(i,t,e,s,n,a){const{x:o,y:r,startAngle:l,pixelMargin:c,innerRadius:d}=t,h=Math.max(t.outerRadius+s+e-c,0),u=d>0?d+s+e+c:0;let f=0;const g=n-l;if(s){const $=d>0?d-s:0,F=h>0?h-s:0,z=($+F)/2,X=z!==0?g*z/(z+s):g;f=(g-X)/2}const p=Math.max(.001,g*h-e/U)/h,m=(g-p)/2,b=l+m+f,v=n-m-f,{outerStart:_,outerEnd:k,innerStart:x,innerEnd:T}=pd(t,u,h,v-b),M=h-_,C=h-k,D=b+_/M,I=v-k/C,j=u+x,S=u+T,P=b+x/j,R=v-T/S;if(i.beginPath(),a){const $=(D+I)/2;if(i.arc(o,r,h,D,$),i.arc(o,r,h,$,I),k>0){const Y=ge(C,I,o,r);i.arc(Y.x,Y.y,k,I,v+et)}const F=ge(S,v,o,r);if(i.lineTo(F.x,F.y),T>0){const Y=ge(S,R,o,r);i.arc(Y.x,Y.y,T,v+et,R+Math.PI)}const z=(v-T/u+(b+x/u))/2;if(i.arc(o,r,u,v-T/u,z,!0),i.arc(o,r,u,z,b+x/u,!0),x>0){const Y=ge(j,P,o,r);i.arc(Y.x,Y.y,x,P+Math.PI,b-et)}const X=ge(M,b,o,r);if(i.lineTo(X.x,X.y),_>0){const Y=ge(M,D,o,r);i.arc(Y.x,Y.y,_,b-et,D)}}else{i.moveTo(o,r);const $=Math.cos(D)*h+o,F=Math.sin(D)*h+r;i.lineTo($,F);const z=Math.cos(I)*h+o,X=Math.sin(I)*h+r;i.lineTo(z,X)}i.closePath()}function gd(i,t,e,s,n){const{fullCircles:a,startAngle:o,circumference:r}=t;let l=t.endAngle;if(a){Si(i,t,e,s,l,n);for(let c=0;c<a;++c)i.fill();isNaN(r)||(l=o+(r%q||q))}return Si(i,t,e,s,l,n),i.fill(),l}function md(i,t,e,s,n){const{fullCircles:a,startAngle:o,circumference:r,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:h,borderDashOffset:u,borderRadius:f}=l,g=l.borderAlign==="inner";if(!c)return;i.setLineDash(h||[]),i.lineDashOffset=u,g?(i.lineWidth=c*2,i.lineJoin=d||"round"):(i.lineWidth=c,i.lineJoin=d||"bevel");let p=t.endAngle;if(a){Si(i,t,e,s,p,n);for(let m=0;m<a;++m)i.stroke();isNaN(r)||(p=o+(r%q||q))}g&&ud(i,t,p),l.selfJoin&&p-o>=U&&f===0&&d!=="miter"&&hd(i,t,p),a||(Si(i,t,e,s,p,n),i.stroke())}class bd extends ee{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,e,s){const n=this.getProps(["x","y"],s),{angle:a,distance:o}=cn(n,{x:t,y:e}),{startAngle:r,endAngle:l,innerRadius:c,outerRadius:d,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),u=(this.options.spacing+this.options.borderWidth)/2,f=N(h,l-r),g=Le(a,r,l)&&r!==l,p=f>=q||g,m=Ie(o,c+u,d+u);return p&&m}getCenterPoint(t){const{x:e,y:s,startAngle:n,endAngle:a,innerRadius:o,outerRadius:r}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:l,spacing:c}=this.options,d=(n+a)/2,h=(o+r+c+l)/2;return{x:e+Math.cos(d)*h,y:s+Math.sin(d)*h}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:e,circumference:s}=this,n=(e.offset||0)/4,a=(e.spacing||0)/2,o=e.circular;if(this.pixelMargin=e.borderAlign==="inner"?.33:0,this.fullCircles=s>q?Math.floor(s/q):0,s===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const r=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(r)*n,Math.sin(r)*n);const l=1-Math.sin(Math.min(U,s||0)),c=n*l;t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor,gd(t,this,c,a,o),md(t,this,c,a,o),t.restore()}}function Ta(i,t,e=t){i.lineCap=N(e.borderCapStyle,t.borderCapStyle),i.setLineDash(N(e.borderDash,t.borderDash)),i.lineDashOffset=N(e.borderDashOffset,t.borderDashOffset),i.lineJoin=N(e.borderJoinStyle,t.borderJoinStyle),i.lineWidth=N(e.borderWidth,t.borderWidth),i.strokeStyle=N(e.borderColor,t.borderColor)}function vd(i,t,e){i.lineTo(e.x,e.y)}function xd(i){return i.stepped?zr:i.tension||i.cubicInterpolationMode==="monotone"?Fr:vd}function Aa(i,t,e={}){const s=i.length,{start:n=0,end:a=s-1}=e,{start:o,end:r}=t,l=Math.max(n,o),c=Math.min(a,r),d=n<o&&a<o||n>r&&a>r;return{count:s,start:l,loop:t.loop,ilen:c<l&&!d?s+c-l:c-l}}function yd(i,t,e,s){const{points:n,options:a}=t,{count:o,start:r,loop:l,ilen:c}=Aa(n,e,s),d=xd(a);let{move:h=!0,reverse:u}=s||{},f,g,p;for(f=0;f<=c;++f)g=n[(r+(u?c-f:f))%o],!g.skip&&(h?(i.moveTo(g.x,g.y),h=!1):d(i,p,g,u,a.stepped),p=g);return l&&(g=n[(r+(u?c:0))%o],d(i,p,g,u,a.stepped)),!!l}function _d(i,t,e,s){const n=t.points,{count:a,start:o,ilen:r}=Aa(n,e,s),{move:l=!0,reverse:c}=s||{};let d=0,h=0,u,f,g,p,m,b;const v=k=>(o+(c?r-k:k))%a,_=()=>{p!==m&&(i.lineTo(d,m),i.lineTo(d,p),i.lineTo(d,b))};for(l&&(f=n[v(0)],i.moveTo(f.x,f.y)),u=0;u<=r;++u){if(f=n[v(u)],f.skip)continue;const k=f.x,x=f.y,T=k|0;T===g?(x<p?p=x:x>m&&(m=x),d=(h*d+k)/++h):(_(),i.lineTo(k,x),g=T,h=0,p=m=x),b=x}_()}function ys(i){const t=i.options,e=t.borderDash&&t.borderDash.length;return!i._decimated&&!i._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?_d:yd}function wd(i){return i.stepped?ml:i.tension||i.cubicInterpolationMode==="monotone"?bl:Qt}function kd(i,t,e,s){let n=t._path;n||(n=t._path=new Path2D,t.path(n,e,s)&&n.closePath()),Ta(i,t.options),i.stroke(n)}function Sd(i,t,e,s){const{segments:n,options:a}=t,o=ys(t);for(const r of n)Ta(i,a,r.style),i.beginPath(),o(i,t,r,{start:e,end:e+s-1})&&i.closePath(),i.stroke()}const Md=typeof Path2D=="function";function Cd(i,t,e,s){Md&&!t.options.segment?kd(i,t,e,s):Sd(i,t,e,s)}class qe extends ee{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const n=s.spanGaps?this._loop:this._fullLoop;ll(this._points,s,t,n,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Ml(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,s=t.length;return s&&e[t[s-1].end]}interpolate(t,e){const s=this.options,n=t[e],a=this.points,o=zn(this,{property:e,start:n,end:n});if(!o.length)return;const r=[],l=wd(s);let c,d;for(c=0,d=o.length;c<d;++c){const{start:h,end:u}=o[c],f=a[h],g=a[u];if(f===g){r.push(f);continue}const p=Math.abs((n-f[e])/(g[e]-f[e])),m=l(f,g,p,s.stepped);m[e]=t[e],r.push(m)}return r.length===1?r[0]:r}pathSegment(t,e,s){return ys(this)(t,this,e,s)}path(t,e,s){const n=this.segments,a=ys(this);let o=this._loop;e=e||0,s=s||this.points.length-e;for(const r of n)o&=a(t,this,r,{start:e,end:e+s-1});return!!o}draw(t,e,s,n){const a=this.options||{};(this.points||[]).length&&a.borderWidth&&(t.save(),Cd(t,this,s,n),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function Da(i,t,e,s){const n=i.options,{[e]:a}=i.getProps([e],s);return Math.abs(t-a)<n.radius+n.hitRadius}class Pa extends ee{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,e,s){const n=this.options,{x:a,y:o}=this.getProps(["x","y"],s);return Math.pow(t-a,2)+Math.pow(e-o,2)<Math.pow(n.hitRadius+n.radius,2)}inXRange(t,e){return Da(this,t,"x",e)}inYRange(t,e){return Da(this,t,"y",e)}getCenterPoint(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}size(t){t=t||this.options||{};let e=t.radius||0;e=Math.max(e,e&&t.hoverRadius||0);const s=e&&t.borderWidth||0;return(e+s)*2}draw(t,e){const s=this.options;this.skip||s.radius<.1||!Be(this,e,this.size(s)/2)||(t.strokeStyle=s.borderColor,t.lineWidth=s.borderWidth,t.fillStyle=s.backgroundColor,Qi(t,s,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function Oa(i,t){const{x:e,y:s,base:n,width:a,height:o}=i.getProps(["x","y","base","width","height"],t);let r,l,c,d,h;return i.horizontal?(h=o/2,r=Math.min(e,n),l=Math.max(e,n),c=s-h,d=s+h):(h=a/2,r=e-h,l=e+h,c=Math.min(s,n),d=Math.max(s,n)),{left:r,top:c,right:l,bottom:d}}function Bt(i,t,e,s){return i?0:rt(t,e,s)}function $d(i,t,e){const s=i.options.borderWidth,n=i.borderSkipped,a=Sn(s);return{t:Bt(n.top,a.top,0,e),r:Bt(n.right,a.right,0,t),b:Bt(n.bottom,a.bottom,0,e),l:Bt(n.left,a.left,0,t)}}function Td(i,t,e){const{enableBorderRadius:s}=i.getProps(["enableBorderRadius"]),n=i.options.borderRadius,a=Ne(n),o=Math.min(t,e),r=i.borderSkipped,l=s||L(n);return{topLeft:Bt(!l||r.top||r.left,a.topLeft,0,o),topRight:Bt(!l||r.top||r.right,a.topRight,0,o),bottomLeft:Bt(!l||r.bottom||r.left,a.bottomLeft,0,o),bottomRight:Bt(!l||r.bottom||r.right,a.bottomRight,0,o)}}function Ad(i){const t=Oa(i),e=t.right-t.left,s=t.bottom-t.top,n=$d(i,e/2,s/2),a=Td(i,e/2,s/2);return{outer:{x:t.left,y:t.top,w:e,h:s,radius:a},inner:{x:t.left+n.l,y:t.top+n.t,w:e-n.l-n.r,h:s-n.t-n.b,radius:{topLeft:Math.max(0,a.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,a.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,a.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,a.bottomRight-Math.max(n.b,n.r))}}}}function _s(i,t,e,s){const n=t===null,a=e===null,r=i&&!(n&&a)&&Oa(i,s);return r&&(n||Ie(t,r.left,r.right))&&(a||Ie(e,r.top,r.bottom))}function Dd(i){return i.topLeft||i.topRight||i.bottomLeft||i.bottomRight}function Pd(i,t){i.rect(t.x,t.y,t.w,t.h)}function ws(i,t,e={}){const s=i.x!==e.x?-t:0,n=i.y!==e.y?-t:0,a=(i.x+i.w!==e.x+e.w?t:0)-s,o=(i.y+i.h!==e.y+e.h?t:0)-n;return{x:i.x+s,y:i.y+n,w:i.w+a,h:i.h+o,radius:i.radius}}class Od extends ee{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:s,backgroundColor:n}}=this,{inner:a,outer:o}=Ad(this),r=Dd(o.radius)?is:Pd;t.save(),(o.w!==a.w||o.h!==a.h)&&(t.beginPath(),r(t,ws(o,e,a)),t.clip(),r(t,ws(a,-e,o)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),r(t,ws(a,e)),t.fillStyle=n,t.fill(),t.restore()}inRange(t,e,s){return _s(this,t,e,s)}inXRange(t,e){return _s(this,t,null,e)}inYRange(t,e){return _s(this,null,t,e)}getCenterPoint(t){const{x:e,y:s,base:n,horizontal:a}=this.getProps(["x","y","base","horizontal"],t);return{x:a?(e+n)/2:e,y:a?s:(s+n)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}function Ed(i,t,e){const s=i.segments,n=i.points,a=t.points,o=[];for(const r of s){let{start:l,end:c}=r;c=Mi(l,c,n);const d=ks(e,n[l],n[c],r.loop);if(!t.segments){o.push({source:r,target:d,start:n[l],end:n[c]});continue}const h=zn(t,d);for(const u of h){const f=ks(e,a[u.start],a[u.end],u.loop),g=In(r,n,f);for(const p of g)o.push({source:p,target:u,start:{[e]:Ea(d,f,"start",Math.max)},end:{[e]:Ea(d,f,"end",Math.min)}})}}return o}function ks(i,t,e,s){if(s)return;let n=t[i],a=e[i];return i==="angle"&&(n=ft(n),a=ft(a)),{property:i,start:n,end:a}}function Rd(i,t){const{x:e=null,y:s=null}=i||{},n=t.points,a=[];return t.segments.forEach(({start:o,end:r})=>{r=Mi(o,r,n);const l=n[o],c=n[r];s!==null?(a.push({x:l.x,y:s}),a.push({x:c.x,y:s})):e!==null&&(a.push({x:e,y:l.y}),a.push({x:e,y:c.y}))}),a}function Mi(i,t,e){for(;t>i;t--){const s=e[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function Ea(i,t,e,s){return i&&t?s(i[e],t[e]):i?i[e]:t?t[e]:0}function Ra(i,t){let e=[],s=!1;return tt(i)?(s=!0,e=i):e=Rd(i,t),e.length?new qe({points:e,options:{tension:0},_loop:s,_fullLoop:s}):null}function La(i){return i&&i.fill!==!1}function Ld(i,t,e){let n=i[t].fill;const a=[t];let o;if(!e)return n;for(;n!==!1&&a.indexOf(n)===-1;){if(!ot(n))return n;if(o=i[n],!o)return!1;if(o.visible)return n;a.push(n),n=o.fill}return!1}function Id(i,t,e){const s=Nd(i);if(L(s))return isNaN(s.value)?!1:s;let n=parseFloat(s);return ot(n)&&Math.floor(n)===n?zd(s[0],t,n,e):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function zd(i,t,e,s){return(i==="-"||i==="+")&&(e=t+e),e===t||e<0||e>=s?!1:e}function Fd(i,t){let e=null;return i==="start"?e=t.bottom:i==="end"?e=t.top:L(i)?e=t.getPixelForValue(i.value):t.getBasePixel&&(e=t.getBasePixel()),e}function Bd(i,t,e){let s;return i==="start"?s=e:i==="end"?s=t.options.reverse?t.min:t.max:L(i)?s=i.value:s=t.getBaseValue(),s}function Nd(i){const t=i.options,e=t.fill;let s=N(e&&e.target,e);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function Hd(i){const{scale:t,index:e,line:s}=i,n=[],a=s.segments,o=s.points,r=jd(t,e);r.push(Ra({x:null,y:t.bottom},s));for(let l=0;l<a.length;l++){const c=a[l];for(let d=c.start;d<=c.end;d++)Vd(n,o[d],r)}return new qe({points:n,options:{}})}function jd(i,t){const e=[],s=i.getMatchingVisibleMetas("line");for(let n=0;n<s.length;n++){const a=s[n];if(a.index===t)break;a.hidden||e.unshift(a.dataset)}return e}function Vd(i,t,e){const s=[];for(let n=0;n<e.length;n++){const a=e[n],{first:o,last:r,point:l}=Wd(a,t,"x");if(!(!l||o&&r)){if(o)s.unshift(l);else if(i.push(l),!r)break}}i.push(...s)}function Wd(i,t,e){const s=i.interpolate(t,e);if(!s)return{};const n=s[e],a=i.segments,o=i.points;let r=!1,l=!1;for(let c=0;c<a.length;c++){const d=a[c],h=o[d.start][e],u=o[d.end][e];if(Ie(n,h,u)){r=n===h,l=n===u;break}}return{first:r,last:l,point:s}}class Ia{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,s){const{x:n,y:a,radius:o}=this;return e=e||{start:0,end:q},t.arc(n,a,o,e.end,e.start,!0),!s.bounds}interpolate(t){const{x:e,y:s,radius:n}=this,a=t.angle;return{x:e+Math.cos(a)*n,y:s+Math.sin(a)*n,angle:a}}}function Ud(i){const{chart:t,fill:e,line:s}=i;if(ot(e))return Yd(t,e);if(e==="stack")return Hd(i);if(e==="shape")return!0;const n=Xd(i);return n instanceof Ia?n:Ra(n,s)}function Yd(i,t){const e=i.getDatasetMeta(t);return e&&i.isDatasetVisible(t)?e.dataset:null}function Xd(i){return(i.scale||{}).getPointPositionForValue?Gd(i):qd(i)}function qd(i){const{scale:t={},fill:e}=i,s=Fd(e,t);if(ot(s)){const n=t.isHorizontal();return{x:n?s:null,y:n?null:s}}return null}function Gd(i){const{scale:t,fill:e}=i,s=t.options,n=t.getLabels().length,a=s.reverse?t.max:t.min,o=Bd(e,t,a),r=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,a);return new Ia({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(o)})}for(let l=0;l<n;++l)r.push(t.getPointPositionForValue(l,o));return r}function Ss(i,t,e){const s=Ud(t),{chart:n,index:a,line:o,scale:r,axis:l}=t,c=o.options,d=c.fill,h=c.backgroundColor,{above:u=h,below:f=h}=d||{},g=n.getDatasetMeta(a),p=Nn(n,g);s&&o.points.length&&(ts(i,e),Kd(i,{line:o,target:s,above:u,below:f,area:e,scale:r,axis:l,clip:p}),es(i))}function Kd(i,t){const{line:e,target:s,above:n,below:a,area:o,scale:r,clip:l}=t,c=e._loop?"angle":t.axis;i.save();let d=a;a!==n&&(c==="x"?(za(i,s,o.top),Ms(i,{line:e,target:s,color:n,scale:r,property:c,clip:l}),i.restore(),i.save(),za(i,s,o.bottom)):c==="y"&&(Fa(i,s,o.left),Ms(i,{line:e,target:s,color:a,scale:r,property:c,clip:l}),i.restore(),i.save(),Fa(i,s,o.right),d=n)),Ms(i,{line:e,target:s,color:d,scale:r,property:c,clip:l}),i.restore()}function za(i,t,e){const{segments:s,points:n}=t;let a=!0,o=!1;i.beginPath();for(const r of s){const{start:l,end:c}=r,d=n[l],h=n[Mi(l,c,n)];a?(i.moveTo(d.x,d.y),a=!1):(i.lineTo(d.x,e),i.lineTo(d.x,d.y)),o=!!t.pathSegment(i,r,{move:o}),o?i.closePath():i.lineTo(h.x,e)}i.lineTo(t.first().x,e),i.closePath(),i.clip()}function Fa(i,t,e){const{segments:s,points:n}=t;let a=!0,o=!1;i.beginPath();for(const r of s){const{start:l,end:c}=r,d=n[l],h=n[Mi(l,c,n)];a?(i.moveTo(d.x,d.y),a=!1):(i.lineTo(e,d.y),i.lineTo(d.x,d.y)),o=!!t.pathSegment(i,r,{move:o}),o?i.closePath():i.lineTo(e,h.y)}i.lineTo(e,t.first().y),i.closePath(),i.clip()}function Ms(i,t){const{line:e,target:s,property:n,color:a,scale:o,clip:r}=t,l=Ed(e,s,n);for(const{source:c,target:d,start:h,end:u}of l){const{style:{backgroundColor:f=a}={}}=c,g=s!==!0;i.save(),i.fillStyle=f,Zd(i,o,r,g&&ks(n,h,u)),i.beginPath();const p=!!e.pathSegment(i,c);let m;if(g){p?i.closePath():Ba(i,s,u,n);const b=!!s.pathSegment(i,d,{move:p,reverse:!0});m=p&&b,m||Ba(i,s,h,n)}i.closePath(),i.fill(m?"evenodd":"nonzero"),i.restore()}}function Zd(i,t,e,s){const n=t.chart.chartArea,{property:a,start:o,end:r}=s||{};if(a==="x"||a==="y"){let l,c,d,h;a==="x"?(l=o,c=n.top,d=r,h=n.bottom):(l=n.left,c=o,d=n.right,h=r),i.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),h=Math.min(h,e.bottom)),i.rect(l,c,d-l,h-c),i.clip()}}function Ba(i,t,e,s){const n=t.interpolate(e,s);n&&i.lineTo(n.x,n.y)}var Na={id:"filler",afterDatasetsUpdate(i,t,e){const s=(i.data.datasets||[]).length,n=[];let a,o,r,l;for(o=0;o<s;++o)a=i.getDatasetMeta(o),r=a.dataset,l=null,r&&r.options&&r instanceof qe&&(l={visible:i.isDatasetVisible(o),index:o,fill:Id(r,o,s),chart:i,axis:a.controller.options.indexAxis,scale:a.vScale,line:r}),a.$filler=l,n.push(l);for(o=0;o<s;++o)l=n[o],!(!l||l.fill===!1)&&(l.fill=Ld(n,o,e.propagate))},beforeDraw(i,t,e){const s=e.drawTime==="beforeDraw",n=i.getSortedVisibleDatasetMetas(),a=i.chartArea;for(let o=n.length-1;o>=0;--o){const r=n[o].$filler;r&&(r.line.updateControlPoints(a,r.axis),s&&r.fill&&Ss(i.ctx,r,a))}},beforeDatasetsDraw(i,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const s=i.getSortedVisibleDatasetMetas();for(let n=s.length-1;n>=0;--n){const a=s[n].$filler;La(a)&&Ss(i.ctx,a,i.chartArea)}},beforeDatasetDraw(i,t,e){const s=t.meta.$filler;!La(s)||e.drawTime!=="beforeDatasetDraw"||Ss(i.ctx,s,i.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Ge={average(i){if(!i.length)return!1;let t,e,s=new Set,n=0,a=0;for(t=0,e=i.length;t<e;++t){const r=i[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();s.add(l.x),n+=l.y,++a}}return a===0||s.size===0?!1:{x:[...s].reduce((r,l)=>r+l)/s.size,y:n/a}},nearest(i,t){if(!i.length)return!1;let e=t.x,s=t.y,n=Number.POSITIVE_INFINITY,a,o,r;for(a=0,o=i.length;a<o;++a){const l=i[a].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=Yi(t,c);d<n&&(n=d,r=l)}}if(r){const l=r.tooltipPosition();e=l.x,s=l.y}return{x:e,y:s}}};function wt(i,t){return t&&(tt(t)?Array.prototype.push.apply(i,t):i.push(t)),i}function Tt(i){return(typeof i=="string"||i instanceof String)&&i.indexOf(`
`)>-1?i.split(`
`):i}function Jd(i,t){const{element:e,datasetIndex:s,index:n}=t,a=i.getDatasetMeta(s).controller,{label:o,value:r}=a.getLabelAndValue(n);return{chart:i,label:o,parsed:a.getParsed(n),raw:i.data.datasets[s].data[n],formattedValue:r,dataset:a.getDataset(),dataIndex:n,datasetIndex:s,element:e}}function Ha(i,t){const e=i.chart.ctx,{body:s,footer:n,title:a}=i,{boxWidth:o,boxHeight:r}=t,l=yt(t.bodyFont),c=yt(t.titleFont),d=yt(t.footerFont),h=a.length,u=n.length,f=s.length,g=zt(t.padding);let p=g.height,m=0,b=s.reduce((k,x)=>k+x.before.length+x.lines.length+x.after.length,0);if(b+=i.beforeBody.length+i.afterBody.length,h&&(p+=h*c.lineHeight+(h-1)*t.titleSpacing+t.titleMarginBottom),b){const k=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;p+=f*k+(b-f)*l.lineHeight+(b-1)*t.bodySpacing}u&&(p+=t.footerMarginTop+u*d.lineHeight+(u-1)*t.footerSpacing);let v=0;const _=function(k){m=Math.max(m,e.measureText(k).width+v)};return e.save(),e.font=c.string,V(i.title,_),e.font=l.string,V(i.beforeBody.concat(i.afterBody),_),v=t.displayColors?o+2+t.boxPadding:0,V(s,k=>{V(k.before,_),V(k.lines,_),V(k.after,_)}),v=0,e.font=d.string,V(i.footer,_),e.restore(),m+=g.width,{width:m,height:p}}function Qd(i,t){const{y:e,height:s}=t;return e<s/2?"top":e>i.height-s/2?"bottom":"center"}function th(i,t,e,s){const{x:n,width:a}=s,o=e.caretSize+e.caretPadding;if(i==="left"&&n+a+o>t.width||i==="right"&&n-a-o<0)return!0}function eh(i,t,e,s){const{x:n,width:a}=e,{width:o,chartArea:{left:r,right:l}}=i;let c="center";return s==="center"?c=n<=(r+l)/2?"left":"right":n<=a/2?c="left":n>=o-a/2&&(c="right"),th(c,i,t,e)&&(c="center"),c}function ja(i,t,e){const s=e.yAlign||t.yAlign||Qd(i,e);return{xAlign:e.xAlign||t.xAlign||eh(i,t,e,s),yAlign:s}}function ih(i,t){let{x:e,width:s}=i;return t==="right"?e-=s:t==="center"&&(e-=s/2),e}function sh(i,t,e){let{y:s,height:n}=i;return t==="top"?s+=e:t==="bottom"?s-=n+e:s-=n/2,s}function Va(i,t,e,s){const{caretSize:n,caretPadding:a,cornerRadius:o}=i,{xAlign:r,yAlign:l}=e,c=n+a,{topLeft:d,topRight:h,bottomLeft:u,bottomRight:f}=Ne(o);let g=ih(t,r);const p=sh(t,l,c);return l==="center"?r==="left"?g+=c:r==="right"&&(g-=c):r==="left"?g-=Math.max(d,u)+n:r==="right"&&(g+=Math.max(h,f)+n),{x:rt(g,0,s.width-t.width),y:rt(p,0,s.height-t.height)}}function Ci(i,t,e){const s=zt(e.padding);return t==="center"?i.x+i.width/2:t==="right"?i.x+i.width-s.right:i.x+s.left}function Wa(i){return wt([],Tt(i))}function nh(i,t,e){return Kt(i,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Ua(i,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?i.override(e):i}const Ya={beforeTitle:Mt,title(i){if(i.length>0){const t=i[0],e=t.chart.data.labels,s=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return e[t.dataIndex]}return""},afterTitle:Mt,beforeBody:Mt,beforeLabel:Mt,label(i){if(this&&this.options&&this.options.mode==="dataset")return i.label+": "+i.formattedValue||i.formattedValue;let t=i.dataset.label||"";t&&(t+=": ");const e=i.formattedValue;return H(e)||(t+=e),t},labelColor(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:Mt,afterBody:Mt,beforeFooter:Mt,footer:Mt,afterFooter:Mt};function dt(i,t,e,s){const n=i[t].call(e,s);return typeof n>"u"?Ya[t].call(e,s):n}class Xa extends ee{static positioners=Ge;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,s=this.options.setContext(this.getContext()),n=s.enabled&&e.options.animation&&s.animations,a=new jn(this.chart,n);return n._cacheable&&(this._cachedAnimations=Object.freeze(a)),a}getContext(){return this.$context||(this.$context=nh(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:s}=e,n=dt(s,"beforeTitle",this,t),a=dt(s,"title",this,t),o=dt(s,"afterTitle",this,t);let r=[];return r=wt(r,Tt(n)),r=wt(r,Tt(a)),r=wt(r,Tt(o)),r}getBeforeBody(t,e){return Wa(dt(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:s}=e,n=[];return V(t,a=>{const o={before:[],lines:[],after:[]},r=Ua(s,a);wt(o.before,Tt(dt(r,"beforeLabel",this,a))),wt(o.lines,dt(r,"label",this,a)),wt(o.after,Tt(dt(r,"afterLabel",this,a))),n.push(o)}),n}getAfterBody(t,e){return Wa(dt(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:s}=e,n=dt(s,"beforeFooter",this,t),a=dt(s,"footer",this,t),o=dt(s,"afterFooter",this,t);let r=[];return r=wt(r,Tt(n)),r=wt(r,Tt(a)),r=wt(r,Tt(o)),r}_createItems(t){const e=this._active,s=this.chart.data,n=[],a=[],o=[];let r=[],l,c;for(l=0,c=e.length;l<c;++l)r.push(Jd(this.chart,e[l]));return t.filter&&(r=r.filter((d,h,u)=>t.filter(d,h,u,s))),t.itemSort&&(r=r.sort((d,h)=>t.itemSort(d,h,s))),V(r,d=>{const h=Ua(t.callbacks,d);n.push(dt(h,"labelColor",this,d)),a.push(dt(h,"labelPointStyle",this,d)),o.push(dt(h,"labelTextColor",this,d))}),this.labelColors=n,this.labelPointStyles=a,this.labelTextColors=o,this.dataPoints=r,r}update(t,e){const s=this.options.setContext(this.getContext()),n=this._active;let a,o=[];if(!n.length)this.opacity!==0&&(a={opacity:0});else{const r=Ge[s.position].call(this,n,this._eventPosition);o=this._createItems(s),this.title=this.getTitle(o,s),this.beforeBody=this.getBeforeBody(o,s),this.body=this.getBody(o,s),this.afterBody=this.getAfterBody(o,s),this.footer=this.getFooter(o,s);const l=this._size=Ha(this,s),c=Object.assign({},r,l),d=ja(this.chart,s,c),h=Va(s,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,a={opacity:1,x:h.x,y:h.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=o,this.$context=void 0,a&&this._resolveAnimations().update(this,a),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,s,n){const a=this.getCaretPosition(t,s,n);e.lineTo(a.x1,a.y1),e.lineTo(a.x2,a.y2),e.lineTo(a.x3,a.y3)}getCaretPosition(t,e,s){const{xAlign:n,yAlign:a}=this,{caretSize:o,cornerRadius:r}=s,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:h}=Ne(r),{x:u,y:f}=t,{width:g,height:p}=e;let m,b,v,_,k,x;return a==="center"?(k=f+p/2,n==="left"?(m=u,b=m-o,_=k+o,x=k-o):(m=u+g,b=m+o,_=k-o,x=k+o),v=m):(n==="left"?b=u+Math.max(l,d)+o:n==="right"?b=u+g-Math.max(c,h)-o:b=this.caretX,a==="top"?(_=f,k=_-o,m=b-o,v=b+o):(_=f+p,k=_+o,m=b+o,v=b-o),x=_),{x1:m,x2:b,x3:v,y1:_,y2:k,y3:x}}drawTitle(t,e,s){const n=this.title,a=n.length;let o,r,l;if(a){const c=cs(s.rtl,this.x,this.width);for(t.x=Ci(this,s.titleAlign,s),e.textAlign=c.textAlign(s.titleAlign),e.textBaseline="middle",o=yt(s.titleFont),r=s.titleSpacing,e.fillStyle=s.titleColor,e.font=o.string,l=0;l<a;++l)e.fillText(n[l],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+r,l+1===a&&(t.y+=s.titleMarginBottom-r)}}_drawColorBox(t,e,s,n,a){const o=this.labelColors[s],r=this.labelPointStyles[s],{boxHeight:l,boxWidth:c}=a,d=yt(a.bodyFont),h=Ci(this,"left",a),u=n.x(h),f=l<d.lineHeight?(d.lineHeight-l)/2:0,g=e.y+f;if(a.usePointStyle){const p={radius:Math.min(c,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},m=n.leftForLtr(u,c)+c/2,b=g+l/2;t.strokeStyle=a.multiKeyBackground,t.fillStyle=a.multiKeyBackground,Qi(t,p,m,b),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,Qi(t,p,m,b)}else{t.lineWidth=L(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const p=n.leftForLtr(u,c),m=n.leftForLtr(n.xPlus(u,1),c-2),b=Ne(o.borderRadius);Object.values(b).some(v=>v!==0)?(t.beginPath(),t.fillStyle=a.multiKeyBackground,is(t,{x:p,y:g,w:c,h:l,radius:b}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),is(t,{x:m,y:g+1,w:c-2,h:l-2,radius:b}),t.fill()):(t.fillStyle=a.multiKeyBackground,t.fillRect(p,g,c,l),t.strokeRect(p,g,c,l),t.fillStyle=o.backgroundColor,t.fillRect(m,g+1,c-2,l-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,e,s){const{body:n}=this,{bodySpacing:a,bodyAlign:o,displayColors:r,boxHeight:l,boxWidth:c,boxPadding:d}=s,h=yt(s.bodyFont);let u=h.lineHeight,f=0;const g=cs(s.rtl,this.x,this.width),p=function(C){e.fillText(C,g.x(t.x+f),t.y+u/2),t.y+=u+a},m=g.textAlign(o);let b,v,_,k,x,T,M;for(e.textAlign=o,e.textBaseline="middle",e.font=h.string,t.x=Ci(this,m,s),e.fillStyle=s.bodyColor,V(this.beforeBody,p),f=r&&m!=="right"?o==="center"?c/2+d:c+2+d:0,k=0,T=n.length;k<T;++k){for(b=n[k],v=this.labelTextColors[k],e.fillStyle=v,V(b.before,p),_=b.lines,r&&_.length&&(this._drawColorBox(e,t,k,g,s),u=Math.max(h.lineHeight,l)),x=0,M=_.length;x<M;++x)p(_[x]),u=h.lineHeight;V(b.after,p)}f=0,u=h.lineHeight,V(this.afterBody,p),t.y-=a}drawFooter(t,e,s){const n=this.footer,a=n.length;let o,r;if(a){const l=cs(s.rtl,this.x,this.width);for(t.x=Ci(this,s.footerAlign,s),t.y+=s.footerMarginTop,e.textAlign=l.textAlign(s.footerAlign),e.textBaseline="middle",o=yt(s.footerFont),e.fillStyle=s.footerColor,e.font=o.string,r=0;r<a;++r)e.fillText(n[r],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+s.footerSpacing}}drawBackground(t,e,s,n){const{xAlign:a,yAlign:o}=this,{x:r,y:l}=t,{width:c,height:d}=s,{topLeft:h,topRight:u,bottomLeft:f,bottomRight:g}=Ne(n.cornerRadius);e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.beginPath(),e.moveTo(r+h,l),o==="top"&&this.drawCaret(t,e,s,n),e.lineTo(r+c-u,l),e.quadraticCurveTo(r+c,l,r+c,l+u),o==="center"&&a==="right"&&this.drawCaret(t,e,s,n),e.lineTo(r+c,l+d-g),e.quadraticCurveTo(r+c,l+d,r+c-g,l+d),o==="bottom"&&this.drawCaret(t,e,s,n),e.lineTo(r+f,l+d),e.quadraticCurveTo(r,l+d,r,l+d-f),o==="center"&&a==="left"&&this.drawCaret(t,e,s,n),e.lineTo(r,l+h),e.quadraticCurveTo(r,l,r+h,l),e.closePath(),e.fill(),n.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,s=this.$animations,n=s&&s.x,a=s&&s.y;if(n||a){const o=Ge[t.position].call(this,this._active,this._eventPosition);if(!o)return;const r=this._size=Ha(this,t),l=Object.assign({},o,this._size),c=ja(e,t,l),d=Va(t,l,c,e);(n._to!==d.x||a._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=r.width,this.height=r.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(e);const n={width:this.width,height:this.height},a={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const o=zt(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=s,this.drawBackground(a,t,n,e),yl(t,e.textDirection),a.y+=o.top,this.drawTitle(a,t,e),this.drawBody(a,t,e),this.drawFooter(a,t,e),_l(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const s=this._active,n=t.map(({datasetIndex:r,index:l})=>{const c=this.chart.getDatasetMeta(r);if(!c)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:c.data[l],index:l}}),a=!ai(s,n),o=this._positionChanged(n,e);(a||o)&&(this._active=n,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,s=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const n=this.options,a=this._active||[],o=this._getActiveElements(t,a,e,s),r=this._positionChanged(o,t),l=e||!ai(o,a)||r;return l&&(this._active=o,(n.enabled||n.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,s,n){const a=this.options;if(t.type==="mouseout")return[];if(!n)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,a.mode,a,s);return a.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:s,caretY:n,options:a}=this,o=Ge[a.position].call(this,t,e);return o!==!1&&(s!==o.x||n!==o.y)}}var qa={id:"tooltip",_element:Xa,positioners:Ge,afterInit(i,t,e){e&&(i.tooltip=new Xa({chart:i,options:e}))},beforeUpdate(i,t,e){i.tooltip&&i.tooltip.initialize(e)},reset(i,t,e){i.tooltip&&i.tooltip.initialize(e)},afterDraw(i){const t=i.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(i.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(i.ctx),i.notifyPlugins("afterTooltipDraw",e)}},afterEvent(i,t){if(i.tooltip){const e=t.replay;i.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(i,t)=>t.bodyFont.size,boxWidth:(i,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Ya},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:i=>i!=="filter"&&i!=="itemSort"&&i!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const ah=(i,t,e,s)=>(typeof t=="string"?(e=i.push(t)-1,s.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function oh(i,t,e,s){const n=i.indexOf(t);if(n===-1)return ah(i,t,e,s);const a=i.lastIndexOf(t);return n!==a?e:n}const rh=(i,t)=>i===null?null:rt(Math.round(i),0,t);function Ga(i){const t=this.getLabels();return i>=0&&i<t.length?t[i]:i}class Ka extends pe{static id="category";static defaults={ticks:{callback:Ga}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const s=this.getLabels();for(const{index:n,label:a}of e)s[n]===a&&s.splice(n,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(H(t))return null;const s=this.getLabels();return e=isFinite(e)&&s[e]===t?e:oh(s,t,N(e,t),this._addedLabels),rh(e,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:s,max:n}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),e||(n=this.getLabels().length-1)),this.min=s,this.max=n}buildTicks(){const t=this.min,e=this.max,s=this.options.offset,n=[];let a=this.getLabels();a=t===0&&e===a.length-1?a:a.slice(t,e+1),this._valueRange=Math.max(a.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let o=t;o<=e;o++)n.push({value:o});return n}getLabelForValue(t){return Ga.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function lh(i,t){const e=[],{bounds:n,step:a,min:o,max:r,precision:l,count:c,maxTicks:d,maxDigits:h,includeBounds:u}=i,f=a||1,g=d-1,{min:p,max:m}=t,b=!H(o),v=!H(r),_=!H(c),k=(m-p)/(h+1);let x=rn((m-p)/g/f)*f,T,M,C,D;if(x<1e-14&&!b&&!v)return[{value:p},{value:m}];D=Math.ceil(m/x)-Math.floor(p/x),D>g&&(x=rn(D*x/g/f)*f),H(l)||(T=Math.pow(10,l),x=Math.ceil(x*T)/T),n==="ticks"?(M=Math.floor(p/x)*x,C=Math.ceil(m/x)*x):(M=p,C=m),b&&v&&a&&pr((r-o)/a,x/1e3)?(D=Math.round(Math.min((r-o)/x,d)),x=(r-o)/D,M=o,C=r):_?(M=b?o:M,C=v?r:C,D=c-1,x=(C-M)/D):(D=(C-M)/x,Ee(D,Math.round(D),x/1e3)?D=Math.round(D):D=Math.ceil(D));const I=Math.max(ln(x),ln(M));T=Math.pow(10,H(l)?I:l),M=Math.round(M*T)/T,C=Math.round(C*T)/T;let j=0;for(b&&(u&&M!==o?(e.push({value:o}),M<o&&j++,Ee(Math.round((M+j*x)*T)/T,o,Za(o,k,i))&&j++):M<o&&j++);j<D;++j){const S=Math.round((M+j*x)*T)/T;if(v&&S>r)break;e.push({value:S})}return v&&u&&C!==r?e.length&&Ee(e[e.length-1].value,r,Za(r,k,i))?e[e.length-1].value=r:e.push({value:r}):(!v||C===r)&&e.push({value:C}),e}function Za(i,t,{horizontal:e,minRotation:s}){const n=Ct(s),a=(e?Math.sin(n):Math.cos(n))||.001,o=.75*t*(""+i).length;return Math.min(t/a,o)}class ch extends pe{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return H(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:s}=this.getUserBounds();let{min:n,max:a}=this;const o=l=>n=e?n:l,r=l=>a=s?a:l;if(t){const l=xt(n),c=xt(a);l<0&&c<0?r(0):l>0&&c>0&&o(0)}if(n===a){let l=a===0?1:Math.abs(a*.05);r(a+l),t||o(n-l)}this.min=n,this.max=a}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:s}=t,n;return s?(n=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),e=e||11),e&&(n=Math.min(e,n)),n}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const n={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},a=this._range||this,o=lh(n,a);return t.bounds==="ticks"&&gr(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let e=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const n=(s-e)/Math.max(t.length-1,1)/2;e-=n,s+=n}this._startValue=e,this._endValue=s,this._valueRange=s-e}getLabelForValue(t){return Ki(t,this.chart.options.locale,this.options.ticks.format)}}class Ja extends ch{static id="linear";static defaults={ticks:{callback:yn.formatters.numeric}};determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=ot(t)?t:0,this.max=ot(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,s=Ct(this.options.ticks.minRotation),n=(t?Math.sin(s):Math.cos(s))||.001,a=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,a.lineHeight/n))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const $i={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ht=Object.keys($i);function Qa(i,t){return i-t}function to(i,t){if(H(t))return null;const e=i._adapter,{parser:s,round:n,isoWeekday:a}=i._parseOpts;let o=t;return typeof s=="function"&&(o=s(o)),ot(o)||(o=typeof s=="string"?e.parse(o,s):e.parse(o)),o===null?null:(n&&(o=n==="week"&&(Re(a)||a===!0)?e.startOf(o,"isoWeek",a):e.startOf(o,n)),+o)}function eo(i,t,e,s){const n=ht.length;for(let a=ht.indexOf(i);a<n-1;++a){const o=$i[ht[a]],r=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((e-t)/(r*o.size))<=s)return ht[a]}return ht[n-1]}function dh(i,t,e,s,n){for(let a=ht.length-1;a>=ht.indexOf(e);a--){const o=ht[a];if($i[o].common&&i._adapter.diff(n,s,o)>=t-1)return o}return ht[e?ht.indexOf(e):0]}function hh(i){for(let t=ht.indexOf(i)+1,e=ht.length;t<e;++t)if($i[ht[t]].common)return ht[t]}function io(i,t,e){if(!e)i[t]=!0;else if(e.length){const{lo:s,hi:n}=Xi(e,t),a=e[s]>=t?e[s]:e[n];i[a]=!0}}function uh(i,t,e,s){const n=i._adapter,a=+n.startOf(t[0].value,s),o=t[t.length-1].value;let r,l;for(r=a;r<=o;r=+n.add(r,1,s))l=e[r],l>=0&&(t[l].major=!0);return t}function so(i,t,e){const s=[],n={},a=t.length;let o,r;for(o=0;o<a;++o)r=t[o],n[r]=o,s.push({value:r,major:!1});return a===0||!e?s:uh(i,s,n,e)}class no extends pe{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const s=t.time||(t.time={}),n=this._adapter=new ic._date(t.adapters.date);n.init(e),Pe(s.displayFormats,n.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:to(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,s=t.time.unit||"day";let{min:n,max:a,minDefined:o,maxDefined:r}=this.getUserBounds();function l(c){!o&&!isNaN(c.min)&&(n=Math.min(n,c.min)),!r&&!isNaN(c.max)&&(a=Math.max(a,c.max))}(!o||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),n=ot(n)&&!isNaN(n)?n:+e.startOf(Date.now(),s),a=ot(a)&&!isNaN(a)?a:+e.endOf(Date.now(),s)+1,this.min=Math.min(n,a-1),this.max=Math.max(n+1,a)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],s=t[t.length-1]),{min:e,max:s}}buildTicks(){const t=this.options,e=t.time,s=t.ticks,n=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&n.length&&(this.min=this._userMin||n[0],this.max=this._userMax||n[n.length-1]);const a=this.min,o=this.max,r=yr(n,a,o);return this._unit=e.unit||(s.autoSkip?eo(e.minUnit,this.min,this.max,this._getLabelCapacity(a)):dh(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:hh(this._unit),this.initOffsets(n),t.reverse&&r.reverse(),so(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,s=0,n,a;this.options.offset&&t.length&&(n=this.getDecimalForValue(t[0]),t.length===1?e=1-n:e=(this.getDecimalForValue(t[1])-n)/2,a=this.getDecimalForValue(t[t.length-1]),t.length===1?s=a:s=(a-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;e=rt(e,0,o),s=rt(s,0,o),this._offsets={start:e,end:s,factor:1/(e+1+s)}}_generate(){const t=this._adapter,e=this.min,s=this.max,n=this.options,a=n.time,o=a.unit||eo(a.minUnit,e,s,this._getLabelCapacity(e)),r=N(n.ticks.stepSize,1),l=o==="week"?a.isoWeekday:!1,c=Re(l)||l===!0,d={};let h=e,u,f;if(c&&(h=+t.startOf(h,"isoWeek",l)),h=+t.startOf(h,c?"day":o),t.diff(s,e,o)>1e5*r)throw new Error(e+" and "+s+" are too far apart with stepSize of "+r+" "+o);const g=n.ticks.source==="data"&&this.getDataTimestamps();for(u=h,f=0;u<s;u=+t.add(u,r,o),f++)io(d,u,g);return(u===s||n.bounds==="ticks"||f===1)&&io(d,u,g),Object.keys(d).sort(Qa).map(p=>+p)}getLabelForValue(t){const e=this._adapter,s=this.options.time;return s.tooltipFormat?e.format(t,s.tooltipFormat):e.format(t,s.displayFormats.datetime)}format(t,e){const n=this.options.time.displayFormats,a=this._unit,o=e||n[a];return this._adapter.format(t,o)}_tickFormatFunction(t,e,s,n){const a=this.options,o=a.ticks.callback;if(o)return K(o,[t,e,s],this);const r=a.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&r[l],h=c&&r[c],u=s[e],f=c&&h&&u&&u.major;return this._adapter.format(t,n||(f?h:d))}generateTickLabels(t){let e,s,n;for(e=0,s=t.length;e<s;++e)n=t[e],n.label=this._tickFormatFunction(n.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+s)*e.factor)}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,s=this.ctx.measureText(t).width,n=Ct(this.isHorizontal()?e.maxRotation:e.minRotation),a=Math.cos(n),o=Math.sin(n),r=this._resolveTickFontOptions(0).size;return{w:s*a+r*o,h:s*o+r*a}}_getLabelCapacity(t){const e=this.options.time,s=e.displayFormats,n=s[e.unit]||s.millisecond,a=this._tickFormatFunction(t,0,so(this,[t],this._majorUnit),n),o=this._getLabelSize(a),r=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,s;if(t.length)return t;const n=this.getMatchingVisibleMetas();if(this._normalized&&n.length)return this._cache.data=n[0].controller.getAllParsedValues(this);for(e=0,s=n.length;e<s;++e)t=t.concat(n[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,s;if(t.length)return t;const n=this.getLabels();for(e=0,s=n.length;e<s;++e)t.push(to(this,n[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return un(t.sort(Qa))}}function Ti(i,t,e){let s=0,n=i.length-1,a,o,r,l;e?(t>=i[s].pos&&t<=i[n].pos&&({lo:s,hi:n}=Xt(i,"pos",t)),{pos:a,time:r}=i[s],{pos:o,time:l}=i[n]):(t>=i[s].time&&t<=i[n].time&&({lo:s,hi:n}=Xt(i,"time",t)),{time:a,pos:r}=i[s],{time:o,pos:l}=i[n]);const c=o-a;return c?r+(l-r)*(t-a)/c:r}class iu extends no{static id="timeseries";static defaults=no.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Ti(e,this.min),this._tableRange=Ti(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:s}=this,n=[],a=[];let o,r,l,c,d;for(o=0,r=t.length;o<r;++o)c=t[o],c>=e&&c<=s&&n.push(c);if(n.length<2)return[{time:e,pos:0},{time:s,pos:1}];for(o=0,r=n.length;o<r;++o)d=n[o+1],l=n[o-1],c=n[o],Math.round((d+l)/2)!==c&&a.push({time:c,pos:o/(r-1)});return a}_generate(){const t=this.min,e=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(e)||s.length===1)&&s.push(e),s.sort((n,a)=>n-a)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),s=this.getLabelTimestamps();return e.length&&s.length?t=this.normalize(e.concat(s)):t=e.length?e:s,t=this._cache.all=t,t}getDecimalForValue(t){return(Ti(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return Ti(this._table,s*this._tableRange+this._minPos,!0)}}const se="/apis/api.data.statistics.xhhao.com/v1alpha1";let Cs=null;async function ne(i){const t=await fetch(i);if(!t.ok)throw new Error(`HTTP ${t.status}`);return t.json()}async function $s(i="weekly"){return ne(`${se}/umami/visits?type=${encodeURIComponent(i)}`)}async function Ts(i="weekly"){return ne(`${se}/umami/pageviews?type=${encodeURIComponent(i)}`)}async function fh(i="monthly",t="referrer",e=8){return ne(`${se}/umami/metrics?type=${encodeURIComponent(i)}&metricType=${encodeURIComponent(t)}&limit=${e}`)}async function As(){return ne(`${se}/umami/realtime`)}async function ph(){return ne(`${se}/uptime/status`)}async function gh(){if(Cs)return Cs;const i=await ne(`${se}/github/config`);return Cs=i,i}async function mh(){return ne(`${se}/chart/data`)}function bh(i){if(typeof document>"u")return"light";const t=document.documentElement;return t.getAttribute("data-color-scheme")==="light"||t.getAttribute("data-theme")==="light"||t.getAttribute("theme")==="light"||t.classList.contains("light")?"light":t.classList.contains("dark")||/\bdark\b/.test(t.className)||t.getAttribute("data-color-scheme")==="dark"||t.getAttribute("data-theme")==="dark"||t.getAttribute("theme")==="dark"||!!i?.closest('[data-theme="dark"], [data-color-scheme="dark"], [theme="dark"]')||typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}class me{constructor(t,e){this.mode="light",this.sync=()=>{const s=bh(this.host),n=s!==this.mode||this.host.getAttribute("data-ds-theme")!==s;this.mode=s,this.host.setAttribute("data-ds-theme",s),n&&(this.host.requestUpdate(),this.onChange?.(s))},this.host=t,this.onChange=e,this.host.addController(this)}hostConnected(){this.sync(),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(this.sync),this.observer.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]})),typeof window<"u"&&typeof window.matchMedia=="function"&&(this.mediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.mediaQuery.addEventListener?.("change",this.sync))}hostDisconnected(){this.observer?.disconnect(),this.observer=void 0,this.mediaQuery?.removeEventListener?.("change",this.sync),this.mediaQuery=void 0}}const ao=[{value:"daily",label:"今日概览",shortLabel:"今日"},{value:"weekly",label:"近 7 天",shortLabel:"7 天"},{value:"monthly",label:"近 30 天",shortLabel:"30 天"},{value:"quarterly",label:"近 90 天",shortLabel:"90 天"},{value:"yearly",label:"近一年",shortLabel:"1 年"}];function G(i){const t=Number(i)||0;return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}K`:t.toLocaleString("zh-CN")}function Z(i){return(Number(i)||0).toLocaleString("zh-CN")}function Ke(i,t){if(!t)return"0%";const e=i/t*100;return e>=10?`${Math.round(e)}%`:`${e.toFixed(1)}%`}function vh(i){const t=Math.max(0,Math.round(i||0));if(t<60)return`${t}s`;const e=Math.floor(t/60),s=t%60;return e<60?s>0?`${e}m ${s}s`:`${e}m`:`${Math.floor(e/60)}h ${e%60}m`}function Nt(i){return i==null?0:typeof i=="object"&&"value"in i?parseInt(String(i.value),10)||0:parseInt(String(i),10)||0}function xh(i,t){if(!i)return null;const e=i[t];if(e&&typeof e=="object"&&"prev"in e&&typeof e.prev=="number")return e.prev;const s=i.comparison?.[t];return typeof s=="number"&&Number.isFinite(s)?s:null}function yh(i,t){return t==null||t<=0?null:(i-t)/t*100}function At(i){const t=i.getFullYear(),e=String(i.getMonth()+1).padStart(2,"0"),s=String(i.getDate()).padStart(2,"0");return`${t}-${e}-${s}`}function Ai(i){if(Number.isNaN(i.valueOf()))return"--:--:--";const t=String(i.getHours()).padStart(2,"0"),e=String(i.getMinutes()).padStart(2,"0"),s=String(i.getSeconds()).padStart(2,"0");return`${t}:${e}:${s}`}function _h(i){if(Number.isNaN(i.valueOf()))return"";const t=Math.max(0,Math.floor((Date.now()-i.getTime())/1e3));return t<60?"刚刚":t<3600?`${Math.floor(t/60)} 分钟前`:`${Math.floor(t/3600)} 小时前`}function wh(i,t){const e=new Date(i);if(Number.isNaN(e.valueOf()))return i.length>10?i.slice(5,10):i;const s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0"),a=String(e.getHours()).padStart(2,"0");return t==="daily"?`${a}:00`:t==="yearly"?`${e.getFullYear()}-${s}`:`${s}-${n}`}const oo=typeof Intl<"u"&&typeof Intl.DisplayNames=="function"?new Intl.DisplayNames(["zh-CN"],{type:"region"}):null,ro={HK:"中国香港",MO:"中国澳门",TW:"中国台湾"};function lo(i=""){const t=String(i||"").toUpperCase();if(!t)return"";let e=t;if(oo)try{const s=oo.of(t);s&&s!==t&&(e=s)}catch{}return ro[t]&&(e.includes("中国")?e=`中国${e.replace(/^中国/,"")}`:e=ro[t]),e}function Di(i){const t=(i||"").toLowerCase();return t==="desktop"||t==="laptop"?"desktop":t==="mobile"||t==="tablet"?"mobile":"other"}function kh(i){const t={"Mac OS":"macOS",Windows:"Windows",Android:"Android",iOS:"iOS",Linux:"Linux"},e={desktop:"桌面端",mobile:"移动端",tablet:"平板",laptop:"笔记本"};let s=i.browser||"";s&&s.toLowerCase().includes("webview")&&(!s.includes("(")||!s.includes(")"))&&(s=s.replace(/\s*webview\s*/gi," (WebView)"));const n=lo(i.country),a=i.os?t[i.os]||i.os:"",o=i.device?e[i.device]||i.device:"",r=[];return n&&r.push(n),a&&r.push(a),o&&r.push(o),s&&r.push(s),r.length>0?r:["访客访问"]}function kt(i){return/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test((i||"").trim())}function at(i,t){const e=i.replace("#","").trim(),s=e.length===3?e.split("").map(r=>r+r).join(""):e;if(s.length!==6)return`rgba(37, 99, 235, ${t})`;const n=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);return`rgba(${n}, ${a}, ${o}, ${t})`}const be=Ht`
  :host {
    --ds-font-sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    --ds-font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace;

    /* Surface, Radii & Depth */
    --ds-radius-card: 14px;
    --ds-radius-panel: 10px;
    --ds-surface: #ffffff;
    --ds-surface-subtle: #fafafa;
    --ds-surface-hover: #f4f4f5;
    --ds-surface-elevated: #ffffff;
    --ds-border: rgba(9, 9, 11, 0.08);
    --ds-border-subtle: rgba(9, 9, 11, 0.05);
    --ds-border-strong: rgba(9, 9, 11, 0.16);
    --ds-shadow: 0 1px 2px rgba(9, 9, 11, 0.03), 0 6px 20px -10px rgba(9, 9, 11, 0.06);
    --ds-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.85);

    /* Typography */
    --ds-text-primary: #09090b;
    --ds-text-secondary: #52525b;
    --ds-text-muted: #71717a;

    /* Accent & Semantic (Inherits global --ds-custom-accent from plugin settings if set) */
    --ds-accent: var(--ds-custom-accent, #2563eb);
    --ds-accent-soft: color-mix(in srgb, var(--ds-accent) 9%, transparent);
    --ds-accent-border: color-mix(in srgb, var(--ds-accent) 24%, transparent);

    --ds-live: #10b981;
    --ds-live-soft: rgba(16, 185, 129, 0.1);
    --ds-live-text: #059669;
    --ds-warning: #f59e0b;
    --ds-warning-text: #d97706;
    --ds-error: #ef4444;
    --ds-error-bg: #fef2f2;
    --ds-error-border: #fecaca;
    --ds-error-text: #dc2626;

    /* Controls & Viz */
    --ds-segment-bg: #f4f4f5;
    --ds-segment-active-bg: #ffffff;
    --ds-segment-active-shadow: 0 1px 2px rgba(9, 9, 11, 0.08);
    --ds-bar-track: #f1f5f9;
    --ds-bar-fill: var(--ds-accent);
    --ds-code-bg: #f4f4f5;
    --ds-code-text: #18181b;
    --ds-tooltip-bg: #18181b;
    --ds-tooltip-text: #fafafa;
    --ds-tooltip-border: rgba(255, 255, 255, 0.08);
    --ds-scrollbar-thumb: rgba(113, 113, 122, 0.28);
    --ds-scrollbar-thumb-hover: rgba(113, 113, 122, 0.48);
    --ds-skeleton-base: #f4f4f5;
    --ds-skeleton-shine: #e4e4e7;

    /* Heatmap Scale (Light — dynamically derived from --ds-accent) */
    --ds-heatmap-ring: rgba(9, 9, 11, 0.055);
    --ds-heatmap-l0: #f3f4f6;
    --ds-heatmap-l1: color-mix(in srgb, var(--ds-accent) 18%, #ffffff);
    --ds-heatmap-l2: color-mix(in srgb, var(--ds-accent) 42%, #ffffff);
    --ds-heatmap-l3: color-mix(in srgb, var(--ds-accent) 72%, #ffffff);
    --ds-heatmap-l4: var(--ds-accent);
    --ds-heatmap-hover-ring: color-mix(in srgb, var(--ds-accent) 68%, transparent);

    font-family: var(--ds-font-sans);
    color: var(--ds-text-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  :host([data-ds-theme='dark']) {
    --ds-surface: #0e1015;
    --ds-surface-subtle: #14171f;
    --ds-surface-hover: #1c202b;
    --ds-surface-elevated: #181b24;
    --ds-border: rgba(255, 255, 255, 0.09);
    --ds-border-subtle: rgba(255, 255, 255, 0.05);
    --ds-border-strong: rgba(255, 255, 255, 0.16);
    --ds-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    --ds-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.04);

    --ds-text-primary: #f4f4f5;
    --ds-text-secondary: #a1a1aa;
    --ds-text-muted: #71717a;

    --ds-accent: var(--ds-custom-accent, #60a5fa);
    --ds-accent-soft: color-mix(in srgb, var(--ds-accent) 16%, transparent);
    --ds-accent-border: color-mix(in srgb, var(--ds-accent) 30%, transparent);

    --ds-live: #34d399;
    --ds-live-soft: rgba(52, 211, 153, 0.12);
    --ds-live-text: #34d399;
    --ds-warning: #fbbf24;
    --ds-warning-text: #fbbf24;
    --ds-error: #f87171;
    --ds-error-bg: rgba(239, 68, 68, 0.1);
    --ds-error-border: rgba(239, 68, 68, 0.28);
    --ds-error-text: #fca5a5;

    --ds-segment-bg: rgba(255, 255, 255, 0.05);
    --ds-segment-active-bg: #222633;
    --ds-segment-active-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    --ds-bar-track: rgba(255, 255, 255, 0.06);
    --ds-bar-fill: var(--ds-accent);
    --ds-code-bg: rgba(255, 255, 255, 0.07);
    --ds-code-text: #e4e4e7;
    --ds-tooltip-bg: #222633;
    --ds-tooltip-text: #f4f4f5;
    --ds-tooltip-border: rgba(255, 255, 255, 0.12);
    --ds-scrollbar-thumb: rgba(161, 161, 170, 0.28);
    --ds-scrollbar-thumb-hover: rgba(161, 161, 170, 0.48);
    --ds-skeleton-base: #181b23;
    --ds-skeleton-shine: #232836;

    --ds-heatmap-ring: rgba(255, 255, 255, 0.05);
    --ds-heatmap-l0: rgba(255, 255, 255, 0.05);
    --ds-heatmap-l1: color-mix(in srgb, var(--ds-accent) 26%, #0e1015);
    --ds-heatmap-l2: color-mix(in srgb, var(--ds-accent) 48%, #0e1015);
    --ds-heatmap-l3: color-mix(in srgb, var(--ds-accent) 74%, #0e1015);
    --ds-heatmap-l4: var(--ds-accent);
    --ds-heatmap-hover-ring: color-mix(in srgb, var(--ds-accent) 80%, #ffffff);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @keyframes ds-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes ds-pulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45);
    }
    50% {
      opacity: 0.78;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0);
    }
  }

  @keyframes ds-spin {
    to { transform: rotate(360deg); }
  }

  .ds-skeleton {
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      var(--ds-skeleton-base) 25%,
      var(--ds-skeleton-shine) 50%,
      var(--ds-skeleton-base) 75%
    );
    background-size: 200% 100%;
    animation: ds-shimmer 1.4s ease-in-out infinite;
  }

  .ds-btn-ghost {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 7px;
    border: 1px solid var(--ds-border);
    background: var(--ds-surface);
    color: var(--ds-text-secondary);
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .ds-btn-ghost:hover {
    background: var(--ds-surface-hover);
    border-color: var(--ds-border-strong);
    color: var(--ds-text-primary);
  }

  .ds-btn-ghost:focus-visible,
  .ds-btn-icon:focus-visible,
  .ds-segmented__btn:focus-visible {
    outline: 2px solid var(--ds-accent-border);
    outline-offset: 1px;
  }

  .ds-btn-icon {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    padding: 0;
    border-radius: 6px;
    border: 1px solid var(--ds-border);
    background: var(--ds-surface-subtle);
    color: var(--ds-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .ds-btn-icon:hover {
    background: var(--ds-surface-hover);
    border-color: var(--ds-border-strong);
    color: var(--ds-text-primary);
  }

  .ds-btn-icon svg {
    width: 13px;
    height: 13px;
  }

  .ds-btn-icon.is-spinning svg {
    animation: ds-spin 0.7s linear infinite;
  }

  .ds-segmented {
    display: inline-flex;
    align-items: center;
    padding: 2px;
    border-radius: 8px;
    background: var(--ds-segment-bg);
    border: 1px solid var(--ds-border-subtle);
    gap: 2px;
  }

  .ds-segmented__btn {
    appearance: none;
    border: none;
    background: transparent;
    padding: 3px 9px;
    border-radius: 6px;
    font-family: inherit;
    font-size: 11.5px;
    font-weight: 500;
    color: var(--ds-text-muted);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }

  .ds-segmented__btn:hover {
    color: var(--ds-text-primary);
  }

  .ds-segmented__btn.is-active {
    background: var(--ds-segment-active-bg);
    color: var(--ds-text-primary);
    font-weight: 600;
    box-shadow: var(--ds-segment-active-shadow);
  }

  @media (prefers-reduced-motion: reduce) {
    .ds-skeleton,
    .ds-btn-icon.is-spinning svg {
      animation: none !important;
    }
  }
`,Sh=[be,Ht`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .card-shell {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px 16px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--ds-live-soft);
      font-size: 11px;
      font-weight: 500;
      color: var(--ds-live-text);
    }

    .live-pill__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--ds-live);
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .updated-at {
      font-size: 11px;
      font-family: var(--ds-font-mono);
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(142px, 1fr));
      gap: 12px;
      padding: 16px 20px 20px;
      transition: opacity 0.2s ease;
    }

    .grid.is-switching {
      opacity: 0.6;
    }

    .kpi {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      overflow: hidden;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .kpi--live::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--ds-live), transparent);
      opacity: 0.85;
    }

    .kpi:hover {
      border-color: var(--ds-border-strong);
      background: var(--ds-surface-hover);
    }

    .kpi__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .kpi__label {
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ds-text-secondary);
    }

    .kpi__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: var(--ds-surface);
      border: 1px solid var(--ds-border);
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .kpi--live .kpi__icon {
      background: var(--ds-live-soft);
      border-color: transparent;
      color: var(--ds-live-text);
    }

    .kpi__icon svg {
      width: 14px;
      height: 14px;
    }

    .kpi__bottom {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .kpi__value-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 6px;
    }

    .kpi__delta {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 1px 6px;
      border-radius: 999px;
      font-size: 10.5px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .kpi__delta--up {
      color: var(--ds-live-text);
      background: var(--ds-live-soft);
    }

    .kpi__delta--down {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    .kpi__delta--flat {
      color: var(--ds-text-muted);
      background: var(--ds-surface-hover);
    }

    .secondary-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 18px;
      padding: 9px 20px;
      border-top: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .secondary-bar strong {
      color: var(--ds-text-primary);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .trend-wrap {
      padding: 14px 20px 18px;
      border-top: 1px solid var(--ds-border-subtle);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .trend-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .trend-legend {
      display: inline-flex;
      align-items: center;
      gap: 14px;
    }

    .trend-legend__item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--ds-text-secondary);
    }

    .trend-legend__dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    .trend-canvas-box {
      position: relative;
      width: 100%;
      height: 176px;
    }

    .trend-canvas-box canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .kpi__value {
      font-size: 25px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.15;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
    }

    .kpi__sub {
      font-size: 11px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .kpi__beacon {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ds-live);
      flex-shrink: 0;
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px 20px 20px;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
      gap: 12px;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 112px;
      padding: 20px;
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    @media (max-width: 768px) {
      .header {
        padding: 12px 16px;
      }

      .updated-at {
        display: none;
      }

      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        padding: 14px 16px 16px;
      }

      .kpi {
        padding: 12px 14px;
        gap: 8px;
      }

      .kpi__value {
        font-size: 21px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .live-pill__dot,
      .kpi__beacon {
        animation: none;
      }
    }
  `];var Mh=Object.defineProperty,Ch=Object.getOwnPropertyDescriptor,pt=(i,t,e,s)=>{for(var n=s>1?void 0:s?Ch(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Mh(t,e,n),n};ie.register(Qn,qe,Pa,Ka,Ja,Na,qa);const co=new Set(["daily","weekly","monthly","quarterly","yearly"]),ve={chart:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,visits:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,visitors:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,fire:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,bolt:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,refresh:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>`};w.TrafficStatistics=class extends bt{constructor(){super(),this.dataType="weekly",this.accentColor="",this.activeType="weekly",this.loading=!0,this.switching=!1,this.refreshing=!1,this.error=null,this.visitData=null,this.trendData=null,this.realtimeData=null,this.lastUpdated="",this.animated={pageviews:0,visits:0,visitors:0},this.periodCache=new Map,this.trendChart=null,this.themeController=new me(this,()=>{this.syncTrendChartTheme()})}connectedCallback(){super.connectedCallback(),this.activeType=co.has(this.dataType)?this.dataType:"weekly",kt(this.accentColor)&&this.style.setProperty("--ds-custom-accent",this.accentColor.trim()),this.loadInitial(),this.pollTimer=setInterval(()=>{this.refreshRealtime()},3e4)}disconnectedCallback(){super.disconnectedCallback(),this.trendChart?.destroy(),this.trendChart=null,this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0),this.animFrameId!=null&&(cancelAnimationFrame(this.animFrameId),this.animFrameId=void 0)}updated(t){t.has("accentColor")&&kt(this.accentColor)&&(this.style.setProperty("--ds-custom-accent",this.accentColor.trim()),this.syncTrendChartTheme()),t.has("dataType")&&co.has(this.dataType)&&this.dataType!==this.activeType&&!this.visitData&&(this.activeType=this.dataType),(t.has("trendData")||t.has("loading"))&&(!this.loading&&this.hasTrendPoints?this.mountTrendChart():!this.hasTrendPoints&&this.trendChart&&(this.trendChart.destroy(),this.trendChart=null))}get hasTrendPoints(){return!!(this.trendData&&(Array.isArray(this.trendData.pageviews)&&this.trendData.pageviews.length>1||Array.isArray(this.trendData.sessions)&&this.trendData.sessions.length>1))}resolveAccentHex(){if(kt(this.accentColor))return this.accentColor.trim();const t=getComputedStyle(this).getPropertyValue("--ds-accent").trim();return kt(t)?t:this.themeController.mode==="dark"?"#60a5fa":"#2563eb"}getTrendChartColors(){const t=this.themeController.mode==="dark",e=this.resolveAccentHex(),s=t?"#34d399":"#10b981";return{dark:t,accent:e,accentFill:at(e,t?.2:.12),secondary:s,secondaryFill:at(s,t?.14:.08),grid:t?"rgba(255, 255, 255, 0.07)":"rgba(113, 113, 122, 0.14)",tick:t?"#a1a1aa":"#71717a",tooltipBg:t?"#222633":"#18181b",tooltipText:t?"#f4f4f5":"#fafafa",tooltipBorder:t?"rgba(255, 255, 255, 0.12)":"rgba(255, 255, 255, 0.08)"}}mountTrendChart(){const t=this.renderRoot.querySelector("#umami-trend-canvas");if(!t||!this.trendData)return;this.trendChart?.destroy();const e=this.getTrendChartColors(),s=this.trendData.pageviews||[],n=this.trendData.sessions||[],a=new Map;s.forEach(d=>{const h=a.get(d.x)||{pv:0,sess:0};h.pv=Number(d.y)||0,a.set(d.x,h)}),n.forEach(d=>{const h=a.get(d.x)||{pv:0,sess:0};h.sess=Number(d.y)||0,a.set(d.x,h)});const o=Array.from(a.entries()).sort((d,h)=>d[0].localeCompare(h[0])),r=o.map(([d])=>wh(d,this.activeType)),l=o.map(([,d])=>d.pv),c=o.map(([,d])=>d.sess);this.trendChart=new ie(t,{type:"line",data:{labels:r,datasets:[{label:"浏览量 (PV)",data:l,borderColor:e.accent,backgroundColor:e.accentFill,borderWidth:2,fill:!0,tension:.36,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:e.accent},{label:"访问次数",data:c,borderColor:e.secondary,backgroundColor:e.secondaryFill,borderWidth:1.8,fill:!0,tension:.36,pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:e.secondary}]},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:420,easing:"easeOutCubic"},interaction:{mode:"index",intersect:!1},scales:{x:{border:{display:!1},grid:{display:!1},ticks:{color:e.tick,maxTicksLimit:7,maxRotation:0,font:{size:11}}},y:{beginAtZero:!0,border:{display:!1},grid:{color:e.grid,drawTicks:!1},ticks:{precision:0,color:e.tick,maxTicksLimit:4,padding:6,font:{size:11},callback:d=>G(Number(d))}}},plugins:{tooltip:{backgroundColor:e.tooltipBg,titleColor:e.tooltipText,bodyColor:e.tooltipText,borderColor:e.tooltipBorder,borderWidth:1,cornerRadius:8,padding:10,callbacks:{label:d=>` ${d.dataset.label}：${Z(Number(d.raw)||0)}`}}}}})}syncTrendChartTheme(){if(!this.trendChart)return;const t=this.getTrendChartColors(),e=this.trendChart.data.datasets[0],s=this.trendChart.data.datasets[1];e&&(e.borderColor=t.accent,e.backgroundColor=t.accentFill),s&&(s.borderColor=t.secondary,s.backgroundColor=t.secondaryFill);const n=this.trendChart.options.scales?.x,a=this.trendChart.options.scales?.y;n?.ticks&&(n.ticks.color=t.tick),a?.ticks&&(a.ticks.color=t.tick),a?.grid&&(a.grid.color=t.grid);const o=this.trendChart.options.plugins?.tooltip;o&&(o.backgroundColor=t.tooltipBg,o.titleColor=t.tooltipText,o.bodyColor=t.tooltipText,o.borderColor=t.tooltipBorder),this.trendChart.update("none")}animateTo(t){if(this.animFrameId!=null&&(cancelAnimationFrame(this.animFrameId),this.animFrameId=void 0),typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.animated={...t};return}const s={...this.animated},n=performance.now(),a=380,o=r=>{const l=Math.min(1,(r-n)/a),c=l===1?1:1-Math.pow(2,-10*l);this.animated={pageviews:Math.round(s.pageviews+(t.pageviews-s.pageviews)*c),visits:Math.round(s.visits+(t.visits-s.visits)*c),visitors:Math.round(s.visitors+(t.visitors-s.visitors)*c)},l<1?this.animFrameId=requestAnimationFrame(o):this.animFrameId=void 0};this.animFrameId=requestAnimationFrame(o)}applyVisitData(t){this.visitData=t,t&&this.animateTo({pageviews:Nt(t.pageviews),visits:Nt(t.visits),visitors:Nt(t.visitors)})}async loadInitial(){this.loading=!0,this.error=null;try{const[t,e,s]=await Promise.all([$s(this.activeType),Ts(this.activeType).catch(()=>null),As().catch(()=>null)]);this.periodCache.set(this.activeType,{visits:t,trend:e}),this.realtimeData=s,this.trendData=e,this.lastUpdated=Ai(new Date),this.applyVisitData(t)}catch(t){this.error=t instanceof Error?t.message:"加载失败"}finally{this.loading=!1}}async handlePeriodChange(t){if(t===this.activeType)return;this.activeType=t;const e=this.periodCache.get(t);if(e){this.applyVisitData(e.visits),this.trendData=e.trend;return}this.switching=!0;try{const[s,n]=await Promise.all([$s(t),Ts(t).catch(()=>null)]);this.periodCache.set(t,{visits:s,trend:n}),this.activeType===t&&(this.applyVisitData(s),this.trendData=n,this.lastUpdated=Ai(new Date))}catch(s){console.error("[TrafficStatistics] switch period error:",s)}finally{this.switching=!1}}async refreshRealtime(t=!1){t&&(this.refreshing=!0);try{const[e,s,n]=await Promise.all([As().catch(()=>this.realtimeData),t?$s(this.activeType).catch(()=>this.visitData):Promise.resolve(this.visitData),t?Ts(this.activeType).catch(()=>this.trendData):Promise.resolve(this.trendData)]);this.realtimeData=e,this.lastUpdated=Ai(new Date),t&&s&&(this.periodCache.set(this.activeType,{visits:s,trend:n}),this.applyVisitData(s),this.trendData=n)}finally{t&&(this.refreshing=!1)}}renderDeltaBadge(t,e){const s=xh(this.visitData,e),n=yh(t,s);if(n===null)return A;const a=Math.abs(n)>=10?Math.round(n):Number(n.toFixed(1));if(a===0)return y`<span class="kpi__delta kpi__delta--flat">0%</span>`;const o=a>0;return y`
      <span class="kpi__delta ${o?"kpi__delta--up":"kpi__delta--down"}" title="较上一统计周期环比变化">
        ${o?"↑":"↓"} ${Math.abs(a)}%
      </span>
    `}render(){if(this.loading)return y`
        <div class="card-shell">
          <div class="skeleton-wrap" aria-busy="true" aria-label="访问统计加载中">
            <div class="ds-skeleton" style="width:150px;height:16px"></div>
            <div class="skeleton-grid">
              <div class="ds-skeleton" style="height:94px"></div>
              <div class="ds-skeleton" style="height:94px"></div>
              <div class="ds-skeleton" style="height:94px"></div>
              <div class="ds-skeleton" style="height:94px"></div>
            </div>
          </div>
        </div>
      `;if(this.error)return y`
        <div class="card-shell">
          <div class="state-box state-box--error">
            <span>访问统计加载失败，请检查 Umami 配置（${this.error}）</span>
            <button type="button" class="ds-btn-ghost" @click=${()=>this.loadInitial()}>重新加载</button>
          </div>
        </div>
      `;const t=this.visitData?Nt(this.visitData.pageviews):0,e=this.visitData?Nt(this.visitData.visits):0,s=this.visitData?Nt(this.visitData.visitors):0,n=this.visitData?.bounces!=null?Nt(this.visitData.bounces):null,a=this.visitData?.totaltime!=null?Nt(this.visitData.totaltime):null,o=n!==null&&e>0?`${Math.min(100,Math.round(n/e*100))}%`:null,r=a!==null&&e>0?vh(a/e):null,l=Number(this.realtimeData?.totals?.views)||0,c=Number(this.realtimeData?.totals?.visitors)||0,d=l>0||c>0,h=e>0?(t/e).toFixed(1):null,u=s>0?(e/s).toFixed(1):null;return y`
      <div class="card-shell">
        <header class="header">
          <div class="title-group">
            <span class="title">访问统计</span>
            ${d?y`
                  <span class="live-pill">
                    <span class="live-pill__dot"></span>
                    <span>${G(c)} 人在线</span>
                  </span>
                `:A}
          </div>

          <div class="controls">
            ${this.lastUpdated?y`<span class="updated-at" title="最近更新时间">${this.lastUpdated}</span>`:A}
            <div class="ds-segmented" role="tablist" aria-label="统计周期">
              ${ao.map(f=>y`
                  <button
                    type="button"
                    role="tab"
                    class="ds-segmented__btn ${this.activeType===f.value?"is-active":""}"
                    aria-selected=${this.activeType===f.value}
                    @click=${()=>this.handlePeriodChange(f.value)}
                  >
                    ${f.shortLabel}
                  </button>
                `)}
            </div>
            <button
              type="button"
              class="ds-btn-icon ${this.refreshing?"is-spinning":""}"
              title="刷新数据"
              aria-label="刷新数据"
              @click=${()=>this.refreshRealtime(!0)}
            >
              ${ve.refresh}
            </button>
          </div>
        </header>

        <div class="grid ${this.switching?"is-switching":""}">
          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">页面浏览量</span>
              <span class="kpi__icon">${ve.chart}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${Z(t)}>${G(this.animated.pageviews)}</span>
                ${this.renderDeltaBadge(t,"pageviews")}
              </div>
              <span class="kpi__sub">${h?`单次浏览 ${h} 页`:"PV 累计"}</span>
            </div>
          </div>

          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">访问次数</span>
              <span class="kpi__icon">${ve.visits}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${Z(e)}>${G(this.animated.visits)}</span>
                ${this.renderDeltaBadge(e,"visits")}
              </div>
              <span class="kpi__sub">${u?`人均回访 ${u} 次`:"Visits 累计"}</span>
            </div>
          </div>

          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">独立访客</span>
              <span class="kpi__icon">${ve.visitors}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${Z(s)}>${G(this.animated.visitors)}</span>
                ${this.renderDeltaBadge(s,"visitors")}
              </div>
              <span class="kpi__sub">UV 去重访客</span>
            </div>
          </div>

          ${d?y`
                <div class="kpi kpi--live">
                  <div class="kpi__top">
                    <span class="kpi__label">实时浏览量</span>
                    <span class="kpi__icon">${ve.fire}</span>
                  </div>
                  <div class="kpi__bottom">
                    <div class="kpi__value-row">
                      <span class="kpi__value" title=${Z(l)}>${G(l)}</span>
                      <span class="kpi__beacon" title="每 30 秒自动刷新"></span>
                    </div>
                    <span class="kpi__sub">近 30 分钟</span>
                  </div>
                </div>

                <div class="kpi kpi--live">
                  <div class="kpi__top">
                    <span class="kpi__label">实时在线</span>
                    <span class="kpi__icon">${ve.bolt}</span>
                  </div>
                  <div class="kpi__bottom">
                    <div class="kpi__value-row">
                      <span class="kpi__value" title=${Z(c)}>${G(c)}</span>
                      <span class="kpi__beacon" title="每 30 秒自动刷新"></span>
                    </div>
                    <span class="kpi__sub">当前活跃访客</span>
                  </div>
                </div>
              `:A}
        </div>

        ${o||r?y`
              <div class="secondary-bar">
                ${o?y`<span>跳出率 <strong>${o}</strong></span>`:A}
                ${r?y`<span>平均停留时长 <strong>${r}</strong></span>`:A}
              </div>
            `:A}

        ${this.hasTrendPoints?y`
              <div class="trend-wrap">
                <div class="trend-head">
                  <span>访问趋势曲线</span>
                  <div class="trend-legend">
                    <span class="trend-legend__item">
                      <span class="trend-legend__dot" style="background:var(--ds-accent)"></span>
                      <span>浏览量 (PV)</span>
                    </span>
                    <span class="trend-legend__item">
                      <span class="trend-legend__dot" style="background:var(--ds-live)"></span>
                      <span>访问次数</span>
                    </span>
                  </div>
                </div>
                <div class="trend-canvas-box">
                  <canvas id="umami-trend-canvas"></canvas>
                </div>
              </div>
            `:A}
      </div>
    `}},w.TrafficStatistics.styles=Sh,pt([nt({type:String,attribute:"data-type"})],w.TrafficStatistics.prototype,"dataType",2),pt([nt({type:String,attribute:"accent-color"})],w.TrafficStatistics.prototype,"accentColor",2),pt([E()],w.TrafficStatistics.prototype,"activeType",2),pt([E()],w.TrafficStatistics.prototype,"loading",2),pt([E()],w.TrafficStatistics.prototype,"switching",2),pt([E()],w.TrafficStatistics.prototype,"refreshing",2),pt([E()],w.TrafficStatistics.prototype,"error",2),pt([E()],w.TrafficStatistics.prototype,"visitData",2),pt([E()],w.TrafficStatistics.prototype,"trendData",2),pt([E()],w.TrafficStatistics.prototype,"realtimeData",2),pt([E()],w.TrafficStatistics.prototype,"lastUpdated",2),pt([E()],w.TrafficStatistics.prototype,"animated",2),w.TrafficStatistics=pt([de("traffic-statistics")],w.TrafficStatistics);const $h=[be,Ht`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .card-shell {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px 16px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--ds-live-soft);
      font-size: 11.5px;
      font-weight: 500;
      color: var(--ds-live-text);
    }

    .live-badge__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--ds-live);
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Segmented 3-Metric Strip */
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border);
    }

    .metric {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      min-width: 0;
    }

    .metric + .metric {
      border-left: 1px solid var(--ds-border);
    }

    .metric__icon {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--ds-surface);
      border: 1px solid var(--ds-border);
      color: var(--ds-text-secondary);
      flex-shrink: 0;
    }

    .metric__icon svg {
      width: 14px;
      height: 14px;
    }

    .metric__content {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .metric__value {
      font-size: 17px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.2;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }

    .metric__label {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Timeline Event Stream */
    .list {
      display: flex;
      flex-direction: column;
      max-height: 380px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .list::-webkit-scrollbar {
      width: 5px;
    }

    .list::-webkit-scrollbar-thumb {
      background: var(--ds-scrollbar-thumb);
      border-radius: 999px;
    }

    .list::-webkit-scrollbar-thumb:hover {
      background: var(--ds-scrollbar-thumb-hover);
    }

    .item {
      position: relative;
      display: grid;
      grid-template-columns: 16px minmax(0, 1fr);
      gap: 12px;
      padding: 11px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
      transition: background 0.15s ease;
    }

    .item:last-child {
      border-bottom: none;
    }

    .item:hover {
      background: var(--ds-surface-hover);
    }

    .item__rail {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 6px;
    }

    .item__rail::after {
      content: '';
      position: absolute;
      top: 16px;
      bottom: -17px;
      width: 1px;
      background: var(--ds-border);
    }

    .item:last-child .item__rail::after {
      display: none;
    }

    .item__node {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ds-border-strong);
      z-index: 1;
      flex-shrink: 0;
    }

    .item:first-child .item__node {
      background: var(--ds-live);
      box-shadow: 0 0 0 3px var(--ds-live-soft);
    }

    .item__body {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .item__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
    }

    .item__left {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      flex: 1;
    }

    .item__time {
      font-family: var(--ds-font-mono);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .item__path {
      display: inline-block;
      max-width: 100%;
      padding: 1px 7px;
      border-radius: 5px;
      background: var(--ds-code-bg);
      color: var(--ds-code-text);
      font-family: var(--ds-font-mono);
      font-size: 12px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .item:hover .item__path {
      background: var(--ds-accent-soft);
      color: var(--ds-accent);
    }

    .item__ago {
      font-size: 11px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .item__meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 6px;
      font-size: 12px;
      color: var(--ds-text-secondary);
    }

    .item__device-icon {
      display: inline-flex;
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .item__device-icon svg {
      width: 13px;
      height: 13px;
    }

    .item__dot {
      color: var(--ds-text-muted);
      opacity: 0.55;
      user-select: none;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px 20px 20px;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 112px;
      padding: 20px;
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    @media (max-width: 768px) {
      .header {
        padding: 12px 16px;
      }

      .metric {
        padding: 10px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }

      .metric__value {
        font-size: 16px;
      }

      .item {
        padding: 10px 16px;
        gap: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .live-badge__dot {
        animation: none;
      }
    }
  `];var Th=Object.defineProperty,Ah=Object.getOwnPropertyDescriptor,xe=(i,t,e,s)=>{for(var n=s>1?void 0:s?Ah(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Th(t,e,n),n};const Dh=30,ae={fire:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,users:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,eye:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,desktop:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,mobile:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,globe:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,refresh:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>`};w.ActivityStatistics=class extends bt{constructor(){super(),this.loading=!0,this.refreshing=!1,this.error=null,this.data=null,this.deviceFilter="all",new me(this)}connectedCallback(){super.connectedCallback(),this.loadData(),this.pollTimer=setInterval(()=>{this.loadData(!1)},3e4)}disconnectedCallback(){super.disconnectedCallback(),this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0)}async loadData(t=!0,e=!1){t&&(this.loading=!0),e&&(this.refreshing=!0),this.error=null;try{this.data=await As()}catch(s){(t||e)&&(this.error=s instanceof Error?s.message:"加载失败")}finally{this.loading=!1,this.refreshing=!1}}render(){if(this.loading)return y`
        <div class="card-shell">
          <div class="skeleton-wrap" aria-busy="true" aria-label="实时动态加载中">
            <div class="ds-skeleton" style="width:160px;height:16px"></div>
            <div class="ds-skeleton" style="height:56px"></div>
            <div class="ds-skeleton" style="height:44px"></div>
            <div class="ds-skeleton" style="height:44px"></div>
          </div>
        </div>
      `;if(this.error)return y`
        <div class="card-shell">
          <div class="state-box state-box--error">
            <span>实时动态加载失败（${this.error}）</span>
            <button type="button" class="ds-btn-ghost" @click=${()=>this.loadData(!0)}>重新加载</button>
          </div>
        </div>
      `;const t=(this.data?.events||[]).slice(0,Dh);if(t.length===0)return y`
        <div class="card-shell">
          <div class="state-box">近 30 分钟暂无访客活动</div>
        </div>
      `;const e=this.data?.totals||{views:0,visitors:0},s=Number(e.views)||0,n=Number(e.visitors)||0,a=new Set(t.map(c=>c.urlPath).filter(Boolean)).size,o=t.filter(c=>Di(c.device)==="desktop").length,r=t.filter(c=>Di(c.device)==="mobile").length,l=this.deviceFilter==="all"?t:t.filter(c=>Di(c.device)===this.deviceFilter);return y`
      <div class="card-shell">
        <header class="header">
          <div class="title-group">
            <span class="title">近 30 分钟网站动态</span>
            <span class="live-badge">
              <span class="live-badge__dot"></span>
              <span>实时监测</span>
            </span>
          </div>

          <div class="controls">
            ${o>0&&r>0?y`
                  <div class="ds-segmented" role="tablist" aria-label="设备筛选">
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter==="all"?"is-active":""}"
                      aria-selected=${this.deviceFilter==="all"}
                      @click=${()=>{this.deviceFilter="all"}}
                    >
                      全部 (${t.length})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter==="desktop"?"is-active":""}"
                      aria-selected=${this.deviceFilter==="desktop"}
                      @click=${()=>{this.deviceFilter="desktop"}}
                    >
                      桌面 (${o})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter==="mobile"?"is-active":""}"
                      aria-selected=${this.deviceFilter==="mobile"}
                      @click=${()=>{this.deviceFilter="mobile"}}
                    >
                      移动 (${r})
                    </button>
                  </div>
                `:A}

            <button
              type="button"
              class="ds-btn-icon ${this.refreshing?"is-spinning":""}"
              title="刷新实时动态"
              aria-label="刷新实时动态"
              @click=${()=>this.loadData(!1,!0)}
            >
              ${ae.refresh}
            </button>
          </div>
        </header>

        <div class="metrics">
          <div class="metric">
            <span class="metric__icon">${ae.fire}</span>
            <div class="metric__content">
              <span class="metric__value" title=${Z(s)}>${G(s)}</span>
              <span class="metric__label">实时浏览量</span>
            </div>
          </div>
          <div class="metric">
            <span class="metric__icon">${ae.users}</span>
            <div class="metric__content">
              <span class="metric__value" title=${Z(n)}>${G(n)}</span>
              <span class="metric__label">实时访客</span>
            </div>
          </div>
          <div class="metric">
            <span class="metric__icon">${ae.eye}</span>
            <div class="metric__content">
              <span class="metric__value">${G(a)}</span>
              <span class="metric__label">活跃页面</span>
            </div>
          </div>
        </div>

        <div class="list">
          ${l.map(c=>{const d=new Date(c.createdAt),h=Ai(d),u=_h(d),f=c.urlPath||"/",g=kh(c),p=Di(c.device),m=p==="desktop"?ae.desktop:p==="mobile"?ae.mobile:ae.globe;return y`
              <div class="item">
                <div class="item__rail" aria-hidden="true">
                  <span class="item__node"></span>
                </div>
                <div class="item__body">
                  <div class="item__top">
                    <div class="item__left">
                      <span class="item__time">${h}</span>
                      <span class="item__path" title=${f}>${f}</span>
                    </div>
                    ${u?y`<span class="item__ago">${u}</span>`:A}
                  </div>
                  <div class="item__meta">
                    <span class="item__device-icon">${m}</span>
                    ${g.map((b,v)=>y`
                        ${v>0?y`<span class="item__dot">·</span>`:A}
                        <span>${b}</span>
                      `)}
                  </div>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}},w.ActivityStatistics.styles=$h,xe([E()],w.ActivityStatistics.prototype,"loading",2),xe([E()],w.ActivityStatistics.prototype,"refreshing",2),xe([E()],w.ActivityStatistics.prototype,"error",2),xe([E()],w.ActivityStatistics.prototype,"data",2),xe([E()],w.ActivityStatistics.prototype,"deviceFilter",2),w.ActivityStatistics=xe([de("activity-statistics")],w.ActivityStatistics);const Ph=[be,Ht`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .card-shell {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px 16px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .heading {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .subtitle {
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .dim-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 20px;
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .dim-tabs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .dim-tab {
      appearance: none;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      color: var(--ds-text-secondary);
      padding: 4px 10px;
      border-radius: 999px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .dim-tab:hover {
      border-color: var(--ds-border-strong);
      color: var(--ds-text-primary);
    }

    .dim-tab.is-active {
      background: var(--ds-accent-soft);
      border-color: var(--ds-accent-border);
      color: var(--ds-accent);
      font-weight: 600;
    }

    .body {
      padding: 16px 20px 20px;
      transition: opacity 0.18s ease;
    }

    .body.is-loading {
      opacity: 0.55;
    }

    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 7px 8px;
      margin: 0 -8px;
      border-radius: 7px;
      transition: background 0.15s ease;
    }

    .row:hover {
      background: var(--ds-surface-hover);
    }

    .row__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 12.5px;
    }

    .row__label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      font-weight: 500;
      color: var(--ds-text-primary);
    }

    .row__rank {
      font-size: 11px;
      font-weight: 600;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
      min-width: 18px;
    }

    .row__name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .row__name.is-mono {
      font-family: var(--ds-font-mono);
      font-size: 12px;
    }

    .row__vals {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .row__count {
      font-weight: 600;
      color: var(--ds-text-primary);
      font-size: 12.5px;
    }

    .row__pct {
      font-size: 11px;
      color: var(--ds-text-muted);
      min-width: 36px;
      text-align: right;
    }

    .row__track {
      width: 100%;
      height: 5px;
      border-radius: 999px;
      background: var(--ds-bar-track);
      overflow: hidden;
    }

    .row__fill {
      height: 100%;
      border-radius: 999px;
      background: var(--ds-bar-fill);
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 128px;
      padding: 20px;
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .header,
      .dim-bar {
        padding: 12px 16px;
      }

      .body {
        padding: 14px 16px 16px;
      }
    }
  `];var Oh=Object.defineProperty,Eh=Object.getOwnPropertyDescriptor,Dt=(i,t,e,s)=>{for(var n=s>1?void 0:s?Eh(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Oh(t,e,n),n};const Rh=new Set(["daily","weekly","monthly","quarterly","yearly"]),Lh=[{value:"referrer",label:"来源渠道"},{value:"country",label:"国家地区"},{value:"browser",label:"浏览器"},{value:"os",label:"操作系统"},{value:"url",label:"热门页面"}];w.UmamiMetrics=class extends bt{constructor(){super(),this.dataType="monthly",this.accentColor="",this.activePeriod="monthly",this.activeDimension="referrer",this.loading=!0,this.switching=!1,this.error=null,this.items=[],this.cache=new Map,new me(this)}connectedCallback(){super.connectedCallback(),this.activePeriod=Rh.has(this.dataType)?this.dataType:"monthly",kt(this.accentColor)&&this.style.setProperty("--ds-custom-accent",this.accentColor.trim()),this.loadMetrics(!0)}updated(t){t.has("accentColor")&&kt(this.accentColor)&&this.style.setProperty("--ds-custom-accent",this.accentColor.trim())}get cacheKey(){return`${this.activePeriod}:${this.activeDimension}`}async loadMetrics(t=!1){const e=this.cacheKey,s=this.cache.get(e);if(s){this.items=s,this.loading=!1,this.error=null;return}t?this.loading=!0:this.switching=!0,this.error=null;try{const n=await fh(this.activePeriod,this.activeDimension,8),a=Array.isArray(n)?n:[];this.cache.set(e,a),this.cacheKey===e&&(this.items=a)}catch(n){this.error=n instanceof Error?n.message:"加载失败"}finally{this.loading=!1,this.switching=!1}}handlePeriodChange(t){t!==this.activePeriod&&(this.activePeriod=t,this.loadMetrics(!1))}handleDimensionChange(t){t!==this.activeDimension&&(this.activeDimension=t,this.loadMetrics(!1))}formatItemLabel(t){return!t||t.trim()===""?this.activeDimension==="referrer"?"直接访问":"未知":this.activeDimension==="country"?lo(t)||t:this.activeDimension==="os"&&t==="Mac OS"?"macOS":t}render(){const t=this.items.reduce((s,n)=>s+(Number(n.y)||0),0),e=Math.max(...this.items.map(s=>Number(s.y)||0),1);return y`
      <div class="card-shell">
        <header class="header">
          <div class="heading">
            <span class="title">访客画像分析</span>
            <span class="subtitle">按来源渠道、地区、浏览器与访问页面透视读者构成</span>
          </div>

          <div class="ds-segmented" role="tablist" aria-label="统计周期">
            ${ao.map(s=>y`
                <button
                  type="button"
                  role="tab"
                  class="ds-segmented__btn ${this.activePeriod===s.value?"is-active":""}"
                  aria-selected=${this.activePeriod===s.value}
                  @click=${()=>this.handlePeriodChange(s.value)}
                >
                  ${s.shortLabel}
                </button>
              `)}
          </div>
        </header>

        <div class="dim-bar">
          <div class="dim-tabs" role="tablist" aria-label="画像维度">
            ${Lh.map(s=>y`
                <button
                  type="button"
                  role="tab"
                  class="dim-tab ${this.activeDimension===s.value?"is-active":""}"
                  aria-selected=${this.activeDimension===s.value}
                  @click=${()=>this.handleDimensionChange(s.value)}
                >
                  ${s.label}
                </button>
              `)}
          </div>
        </div>

        <div class="body ${this.switching?"is-loading":""}">
          ${this.loading?y`
                <div class="skeleton-list" aria-busy="true">
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                </div>
              `:this.error?y`
                  <div class="state-box state-box--error">
                    <span>访客画像加载失败（${this.error}）</span>
                    <button type="button" class="ds-btn-ghost" @click=${()=>this.loadMetrics(!0)}>
                      重新加载
                    </button>
                  </div>
                `:this.items.length===0?y`<div class="state-box">当前周期暂无该维度数据</div>`:y`
                    <ul class="list">
                      ${this.items.map((s,n)=>{const a=Number(s.y)||0,o=this.formatItemLabel(s.x),r=Math.max(4,Math.round(a/e*100)),l=Math.max(.38,1-n*.08),c=this.activeDimension==="url"||this.activeDimension==="referrer";return y`
                          <li class="row">
                            <div class="row__meta">
                              <span class="row__label">
                                <span class="row__rank">${String(n+1).padStart(2,"0")}</span>
                                <span class="row__name ${c?"is-mono":""}" title=${o}>${o}</span>
                              </span>
                              <span class="row__vals">
                                <span class="row__count" title=${Z(a)}>${G(a)}</span>
                                <span class="row__pct">${Ke(a,t)}</span>
                              </span>
                            </div>
                            <div class="row__track">
                              <div class="row__fill" style="width:${r}%;opacity:${l.toFixed(2)}"></div>
                            </div>
                          </li>
                        `})}
                    </ul>
                  `}
        </div>
      </div>
    `}},w.UmamiMetrics.styles=Ph,Dt([nt({type:String,attribute:"data-type"})],w.UmamiMetrics.prototype,"dataType",2),Dt([nt({type:String,attribute:"accent-color"})],w.UmamiMetrics.prototype,"accentColor",2),Dt([E()],w.UmamiMetrics.prototype,"activePeriod",2),Dt([E()],w.UmamiMetrics.prototype,"activeDimension",2),Dt([E()],w.UmamiMetrics.prototype,"loading",2),Dt([E()],w.UmamiMetrics.prototype,"switching",2),Dt([E()],w.UmamiMetrics.prototype,"error",2),Dt([E()],w.UmamiMetrics.prototype,"items",2),w.UmamiMetrics=Dt([de("umami-metrics")],w.UmamiMetrics);const Ih=[be,Ht`
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
    }

    .pill {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      color: var(--ds-text-primary);
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
    }

    .pill:hover,
    .pill:focus-visible {
      border-color: var(--ds-border-strong);
      background: var(--ds-surface-hover);
      outline: none;
    }

    .pill.is-static {
      cursor: default;
    }

    .pill::after {
      content: attr(data-tip);
      position: absolute;
      bottom: 100%;
      margin-bottom: 8px;
      left: 50%;
      transform: translateX(-50%) translateY(3px);
      padding: 5px 10px;
      border-radius: 6px;
      background: var(--ds-tooltip-bg);
      color: var(--ds-tooltip-text);
      border: 1px solid var(--ds-tooltip-border);
      font-size: 11.5px;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease, transform 0.15s ease;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      z-index: 50;
    }

    .pill:hover::after,
    .pill:focus-visible::after {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .dot--loading {
      background: var(--ds-text-muted);
    }

    .dot--success {
      background: var(--ds-live);
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .dot--warning {
      background: var(--ds-warning);
      box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.22);
    }

    .dot--error {
      background: var(--ds-error);
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.22);
    }

    .label {
      font-size: 12.5px;
      font-weight: 500;
      line-height: 1.3;
      color: var(--ds-text-primary);
      transition: color 0.15s ease;
    }

    .pill--success:hover .label { color: var(--ds-live-text); }
    .pill--warning:hover .label { color: var(--ds-warning-text); }
    .pill--error:hover .label { color: var(--ds-error-text); }

    .pill--err-box {
      color: var(--ds-error-text);
      border-color: var(--ds-error-border);
      background: var(--ds-error-bg);
    }

    @media (prefers-reduced-motion: reduce) {
      .dot--success {
        animation: none;
      }
    }
  `];var zh=Object.defineProperty,Fh=Object.getOwnPropertyDescriptor,Pi=(i,t,e,s)=>{for(var n=s>1?void 0:s?Fh(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&zh(t,e,n),n};w.UptimeStatistics=class extends bt{constructor(){super(),this.loading=!0,this.error=!1,this.statusData=null,new me(this)}connectedCallback(){super.connectedCallback(),this.loadStatus(),this.pollTimer=setInterval(()=>{this.loadStatus(!1)},6e4)}disconnectedCallback(){super.disconnectedCallback(),this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0)}async loadStatus(t=!0){t&&(this.loading=!0);try{this.statusData=await ph(),this.error=!1}catch{t&&(this.error=!0)}finally{this.loading=!1}}render(){if(this.loading)return y`
        <span class="pill is-static" data-tip="正在检测服务状态">
          <span class="dot dot--loading"></span>
          <span class="label">检测中…</span>
        </span>
      `;if(this.error||!this.statusData)return y`
        <span class="pill pill--err-box is-static" data-tip="无法连接到 Uptime Kuma 服务">
          <span class="dot dot--error"></span>
          <span class="label">状态获取失败</span>
        </span>
      `;const e={0:{variant:"error",text:"全部业务异常"},1:{variant:"success",text:"所有业务正常"},2:{variant:"warning",text:"部分业务异常"}}[this.statusData.status]||{variant:"loading",text:"状态未知"},s=this.statusData.statusPageUrl||"";return s?y`
        <a
          class="pill pill--${e.variant}"
          href=${s}
          target="_blank"
          rel="noopener noreferrer"
          data-tip="点击查看服务监控详情"
        >
          <span class="dot dot--${e.variant}"></span>
          <span class="label">${e.text}</span>
        </a>
      `:y`
      <span class="pill pill--${e.variant} is-static" data-tip="服务状态监控">
        <span class="dot dot--${e.variant}"></span>
        <span class="label">${e.text}</span>
      </span>
    `}},w.UptimeStatistics.styles=Ih,Pi([E()],w.UptimeStatistics.prototype,"loading",2),Pi([E()],w.UptimeStatistics.prototype,"error",2),Pi([E()],w.UptimeStatistics.prototype,"statusData",2),w.UptimeStatistics=Pi([de("uptime-statistics")],w.UptimeStatistics);const Bh=[be,Ht`
    :host {
      display: block;
      width: 100%;
      margin: 12px 0;
    }

    :host([compact]) {
      margin: 0;
    }

    .board {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 100%;
    }

    /* Site Pulse Overview Strip */
    .overview-wrap {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .overview-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
    }

    .overview-bar__title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-secondary);
    }

    .overview-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .overview-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      min-width: 0;
      transition: background 0.15s ease;
    }

    .overview-cell + .overview-cell {
      border-left: 1px solid var(--ds-border);
    }

    .overview-cell:hover {
      background: var(--ds-surface-subtle);
    }

    .entity-link {
      color: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      max-width: 100%;
    }

    .entity-link:hover {
      color: var(--ds-accent);
    }

    .entity-link__arrow {
      font-size: 11px;
      opacity: 0;
      transform: translateX(-2px);
      transition: opacity 0.15s ease, transform 0.15s ease;
      flex-shrink: 0;
    }

    .entity-link:hover .entity-link__arrow,
    .rank-item:hover .entity-link__arrow,
    .dist-item:hover .entity-link__arrow,
    .legend__item:hover .entity-link__arrow {
      opacity: 0.7;
      transform: translateX(0);
    }

    .overview-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--ds-surface-subtle);
      border: 1px solid var(--ds-border);
      color: var(--ds-accent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .overview-icon svg {
      width: 15px;
      height: 15px;
    }

    .overview-body {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .overview-val {
      font-size: 19px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.2;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
    }

    .overview-label {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* States */
    .state-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 28px 20px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-card--error {
      background: var(--ds-error-bg);
      border-color: var(--ds-error-border);
      color: var(--ds-error-text);
    }

    .skeleton-shell {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 18px 20px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
    }

    .skeleton-top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    /* Section Frame */
    .section {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .section__header {
      padding: 13px 18px;
      border-bottom: 1px solid var(--ds-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px 14px;
    }

    :host([compact]) .section__header {
      padding: 10px 14px;
    }

    .section__heading {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .section__title {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.015em;
      line-height: 1.4;
    }

    .section__subtitle {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      line-height: 1.4;
    }

    .section__right {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 12px;
    }

    .trend-dot-label {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--ds-text-secondary);
    }

    .trend-dot {
      width: 7px;
      height: 7px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .stat-pill {
      display: inline-flex;
      align-items: baseline;
      gap: 4px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    .stat-pill strong {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
      font-variant-numeric: tabular-nums;
    }

    .section__body {
      padding: 16px 18px 18px;
    }

    :host([compact]) .section__body {
      padding: 12px 14px 14px;
    }

    /* Taxonomy Grid */
    .taxonomy-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .taxonomy-grid.is-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .panel {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px;
      border-radius: 10px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      min-width: 0;
    }

    .panel__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .panel__title {
      font-size: 13px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .panel__meta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .panel__badge {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    /* Tags Donut */
    .donut-layout {
      display: flex;
      align-items: center;
      gap: 18px;
      flex: 1;
      min-height: 192px;
    }

    .donut-stage {
      position: relative;
      width: 158px;
      height: 158px;
      flex-shrink: 0;
    }

    .donut-stage canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .donut-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      text-align: center;
      padding: 18px;
    }

    .donut-total {
      font-size: 20px;
      font-weight: 700;
      color: var(--ds-text-primary);
      letter-spacing: -0.02em;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }

    .donut-caption {
      font-size: 11px;
      color: var(--ds-text-muted);
      margin-top: 2px;
      max-width: 88px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .donut-sub {
      font-size: 10.5px;
      color: var(--ds-accent);
      font-weight: 600;
      margin-top: 1px;
      font-variant-numeric: tabular-nums;
    }

    .legend {
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .legend.has-focus .legend__item:not(.is-active):not(.is-pinned) {
      opacity: 0.45;
    }

    .legend__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 7px;
      border-radius: 6px;
      font-size: 12.5px;
      color: var(--ds-text-secondary);
      cursor: pointer;
      user-select: none;
      transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    }

    .legend__item:hover,
    .legend__item.is-active {
      background: var(--ds-surface-hover);
      color: var(--ds-text-primary);
    }

    .legend__item.is-pinned {
      background: var(--ds-accent-soft);
      color: var(--ds-text-primary);
    }

    .legend__left {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
    }

    .legend__dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .legend__label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .legend__right {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .legend__count {
      font-weight: 600;
      color: var(--ds-text-primary);
      font-size: 12px;
    }

    .legend__pct {
      font-size: 11px;
      color: var(--ds-text-muted);
      min-width: 32px;
      text-align: right;
    }

    .legend__more {
      padding: 4px 7px 0;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    /* Categories Distribution Bars */
    .dist-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .dist-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 5px 7px;
      margin: 0 -7px;
      border-radius: 7px;
      transition: background 0.15s ease;
    }

    .dist-item:hover {
      background: var(--ds-surface-hover);
    }

    .dist-item:hover .dist-fill {
      opacity: 1 !important;
    }

    .dist-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12.5px;
    }

    .dist-name {
      color: var(--ds-text-primary);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dist-values {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .dist-count {
      font-size: 12px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .dist-pct {
      font-size: 11px;
      color: var(--ds-text-muted);
      min-width: 34px;
      text-align: right;
    }

    .dist-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: var(--ds-bar-track);
      overflow: hidden;
    }

    .dist-fill {
      height: 100%;
      border-radius: 999px;
      background: var(--ds-bar-fill);
      transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease;
    }

    .panel__footer {
      margin-top: auto;
      padding-top: 8px;
      border-top: 1px solid var(--ds-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    .text-link-btn {
      appearance: none;
      border: none;
      background: transparent;
      padding: 0;
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--ds-accent);
      cursor: pointer;
    }

    .text-link-btn:hover {
      text-decoration: underline;
    }

    /* Heatmap Telemetry Ribbon (lightweight inline metrics) */
    .heatmap-stats-strip {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 0;
      padding: 8px 18px;
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .heatmap-stat-cell {
      position: relative;
      display: inline-flex;
      align-items: baseline;
      gap: 4px;
      padding: 0 12px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    .heatmap-stat-cell:first-child {
      padding-left: 0;
    }

    .heatmap-stat-cell + .heatmap-stat-cell::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 1px;
      height: 11px;
      background: var(--ds-border);
      transform: translateY(-50%);
    }

    .heatmap-stat-cell strong {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
      font-variant-numeric: tabular-nums;
    }

    .heatmap-scroll {
      width: 100%;
      overflow-x: auto;
      overflow-y: visible;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: var(--ds-scrollbar-thumb) transparent;
      padding-bottom: 4px;
    }

    .heatmap-scroll::-webkit-scrollbar {
      height: 5px;
    }

    .heatmap-scroll::-webkit-scrollbar-thumb {
      background: var(--ds-scrollbar-thumb);
      border-radius: 999px;
    }

    .heatmap-card {
      position: relative;
      width: 100%;
      min-width: max-content;
    }

    .heatmap {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 6px 8px;
    }

    .heatmap__months {
      grid-column: 2;
      grid-row: 1;
      display: grid;
      column-gap: var(--hm-gap, 3px);
      font-size: 11px;
      color: var(--ds-text-muted);
      line-height: 1.2;
    }

    .heatmap__month {
      text-align: left;
      white-space: nowrap;
    }

    .heatmap__weekdays {
      grid-column: 1;
      grid-row: 2;
      display: grid;
      grid-template-rows: repeat(7, var(--hm-cell, 12px));
      row-gap: var(--hm-gap, 3px);
      padding-right: 4px;
      font-size: 10.5px;
      color: var(--ds-text-muted);
      align-items: center;
      justify-items: end;
    }

    .heatmap__weekday {
      height: var(--hm-cell, 12px);
      line-height: var(--hm-cell, 12px);
    }

    .heatmap__weekday.is-hidden {
      visibility: hidden;
    }

    .heatmap__grid {
      grid-column: 2;
      grid-row: 2;
      display: grid;
      column-gap: var(--hm-gap, 3px);
    }

    .heatmap__column {
      display: grid;
      grid-template-rows: repeat(7, var(--hm-cell, 12px));
      row-gap: var(--hm-gap, 3px);
    }

    .heatmap__day {
      width: var(--hm-cell, 12px);
      height: var(--hm-cell, 12px);
      border-radius: 2.5px;
      background: var(--ds-heatmap-l0);
      box-shadow: inset 0 0 0 1px var(--ds-heatmap-ring);
      transition: transform 0.12s ease, box-shadow 0.12s ease;
      cursor: pointer;
      outline: none;
    }

    .heatmap__day[data-level='0'] { background: var(--ds-heatmap-l0); }
    .heatmap__day[data-level='1'] { background: var(--ds-heatmap-l1); }
    .heatmap__day[data-level='2'] { background: var(--ds-heatmap-l2); }
    .heatmap__day[data-level='3'] { background: var(--ds-heatmap-l3); }
    .heatmap__day[data-level='4'] { background: var(--ds-heatmap-l4); }

    .heatmap__day:not(.is-outside):hover,
    .heatmap__day:not(.is-outside):focus-visible {
      transform: scale(1.2);
      box-shadow: 0 0 0 1.5px var(--ds-heatmap-hover-ring);
      z-index: 2;
    }

    .heatmap__day.is-outside {
      background: transparent;
      box-shadow: none;
      cursor: default;
      pointer-events: none;
    }

    .heatmap__footer {
      grid-column: 2;
      grid-row: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 6px;
    }

    .heatmap__range {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .heatmap__legend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
      margin-left: auto;
    }

    .heatmap__legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      box-shadow: inset 0 0 0 1px var(--ds-heatmap-ring);
    }

    .heatmap__legend-dot[data-level='0'] { background: var(--ds-heatmap-l0); }
    .heatmap__legend-dot[data-level='1'] { background: var(--ds-heatmap-l1); }
    .heatmap__legend-dot[data-level='2'] { background: var(--ds-heatmap-l2); }
    .heatmap__legend-dot[data-level='3'] { background: var(--ds-heatmap-l3); }
    .heatmap__legend-dot[data-level='4'] { background: var(--ds-heatmap-l4); }

    .heatmap__tooltip {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--ds-tooltip-bg);
      border: 1px solid var(--ds-tooltip-border);
      border-radius: 8px;
      padding: 7px 11px;
      font-size: 12px;
      line-height: 1.45;
      color: var(--ds-tooltip-text);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
      pointer-events: none;
      white-space: nowrap;
      z-index: 30;
    }

    .heatmap__tooltip::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -5px;
      width: 8px;
      height: 8px;
      background: var(--ds-tooltip-bg);
      border-right: 1px solid var(--ds-tooltip-border);
      border-bottom: 1px solid var(--ds-tooltip-border);
      transform: translateX(-50%) rotate(45deg);
    }

    .heatmap__tooltip.is-below::after {
      bottom: auto;
      top: -5px;
      transform: translateX(-50%) rotate(225deg);
    }

    .heatmap__tooltip strong {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .heatmap__tooltip span {
      opacity: 0.85;
    }

    /* Bar Chart Canvas */
    .canvas-wrap {
      position: relative;
      width: 100%;
    }

    .canvas-wrap canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    /* Ranked Leaderboard */
    .rank-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
    }

    .rank-item {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      padding: 10px 8px;
      border-bottom: 1px solid var(--ds-border-subtle);
      border-radius: 7px;
      transition: background 0.15s ease;
    }

    .rank-item:last-child {
      border-bottom: none;
    }

    .rank-item:hover {
      background: var(--ds-surface-hover);
    }

    .rank-item:hover .rank-fill {
      opacity: 1 !important;
    }

    .rank-num {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11.5px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
      background: var(--ds-surface-subtle);
      border: 1px solid var(--ds-border);
    }

    .rank-num.is-top {
      color: var(--ds-accent);
      background: var(--ds-accent-soft);
      border-color: var(--ds-accent-border);
    }

    .rank-num.is-first {
      color: #ffffff;
      background: var(--ds-accent);
      border-color: var(--ds-accent);
    }

    .rank-main {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .rank-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--ds-text-primary);
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rank-track {
      width: 100%;
      height: 4px;
      border-radius: 999px;
      background: var(--ds-bar-track);
      overflow: hidden;
    }

    .rank-fill {
      height: 100%;
      border-radius: 999px;
      background: var(--ds-bar-fill);
      transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease;
    }

    .rank-value {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .rank-views {
      font-size: 13px;
      font-weight: 600;
      color: var(--ds-text-primary);
      line-height: 1.3;
    }

    .rank-unit {
      font-size: 11px;
      color: var(--ds-text-muted);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .board {
        gap: 14px;
      }

      .overview-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .overview-cell {
        padding: 12px 14px;
      }

      .overview-cell:nth-child(3) {
        border-left: none;
      }

      .overview-cell:nth-child(n + 3) {
        border-top: 1px solid var(--ds-border);
      }

      .section__header {
        padding: 12px 16px;
      }

      .section__body {
        padding: 14px 16px 16px;
      }

      .heatmap-stat-cell {
        padding: 8px 12px;
      }

      .taxonomy-grid,
      .skeleton-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .donut-layout {
        flex-direction: column;
        align-items: stretch;
        gap: 14px;
      }

      .donut-stage {
        margin: 0 auto;
      }

      .rank-item {
        gap: 10px;
        padding: 9px 4px;
      }

      .rank-title {
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .dist-fill,
      .rank-fill,
      .heatmap__day {
        transition: none;
      }
    }
  `];var Nh=Object.defineProperty,Hh=Object.getOwnPropertyDescriptor,ut=(i,t,e,s)=>{for(var n=s>1?void 0:s?Hh(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Nh(t,e,n),n};ie.register(ec,bd,Ql,Od,Qn,qe,Pa,Na,Ka,Ja,qa);const Pt=1440*60*1e3,jh=["周日","周一","周二","周三","周四","周五","周六"],Vh=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Wh=["#2563eb","#0ea5e9","#10b981","#8b5cf6","#f59e0b","#ec4899","#14b8a6","#6366f1","#64748b","#06b6d4"],Uh=["#60a5fa","#38bdf8","#34d399","#a78bfa","#fbbf24","#f472b6","#2dd4bf","#818cf8","#94a3b8","#22d3ee"],Ze={article:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,eye:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,comment:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,clock:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,download:st`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`};w.SiteCharts=class extends bt{constructor(){super(),this.dataTypes="overview,tags,categories,articles,monthlyTrend,comments,topArticles",this.accentColor="",this.compact=!1,this.loading=!0,this.exporting=!1,this.error=null,this.chartData=null,this.activeTagIndex=null,this.pinnedTagIndex=null,this.categoriesExpanded=!1,this.heatmapFilter="all",this.heatmapCellPx=12,this.tooltip={visible:!1,below:!1,x:-9999,y:-9999,dateLabel:"",detail:""},this.tagsChart=null,this.monthlyChart=null,this.commentsChart=null,this.observedHeatmapEl=null,this.themeController=new me(this,()=>{this.syncChartThemes()})}connectedCallback(){super.connectedCallback(),this.applyAccentOverride(),this.loadData()}disconnectedCallback(){super.disconnectedCallback(),this.destroyCharts(),this.heatmapResizeObserver?.disconnect(),this.heatmapResizeObserver=void 0,this.observedHeatmapEl=null}updated(t){t.has("accentColor")&&(this.applyAccentOverride(),this.syncChartThemes()),(t.has("chartData")||t.has("dataTypes")||t.has("loading"))&&!this.loading&&this.chartData&&(this.applyAccentOverride(),this.mountCharts(),this.attachHeatmapObserver())}applyAccentOverride(){const t=kt(this.accentColor)?this.accentColor.trim():kt(this.chartData?.accentColor||"")?this.chartData.accentColor.trim():"";t&&t.toLowerCase()!=="#2563eb"&&this.style.setProperty("--ds-custom-accent",t)}resolveAccentHex(){if(kt(this.accentColor))return this.accentColor.trim();const t=getComputedStyle(this).getPropertyValue("--ds-accent").trim();return kt(t)?t:this.themeController.mode==="dark"?"#60a5fa":"#2563eb"}get enabledTypes(){const t=(this.dataTypes||"").trim();return t?t.split(",").map(e=>e.trim()).filter(Boolean):["overview","tags","categories","articles","monthlyTrend","comments","topArticles"]}get palette(){const t=this.themeController.mode==="dark"?Uh:Wh;return[this.resolveAccentHex(),...t.slice(1)]}get normalizedTags(){return(this.chartData?.tags||[]).map(e=>({name:e.name??e.spec?.displayName??e.metadata?.name??"未命名标签",count:Number(e.count??e.total??e.status?.visiblePostCount??0),permalink:e.permalink??e.status?.permalink})).filter(e=>e.count>0).sort((e,s)=>s.count-e.count)}get normalizedCategories(){return(this.chartData?.categories||[]).map(e=>({name:e.name??e.spec?.displayName??e.metadata?.name??"未命名分类",count:Number(e.total??e.count??e.status?.visiblePostCount??0),permalink:e.permalink??e.status?.permalink})).filter(e=>e.count>0).sort((e,s)=>s.count-e.count)}get normalizedComments(){return(this.chartData?.comments||[]).map(e=>({name:e.username||e.name||e.email||"匿名访客",count:Number(e.count??0)})).filter(e=>e.count>0).sort((e,s)=>s.count-e.count).slice(0,10)}get normalizedTopArticles(){return(this.chartData?.top10Articles||[]).map(e=>({name:e.name||"未命名文章",views:Number(e.views??e.count??0),permalink:e.permalink})).filter(e=>e.views>0).sort((e,s)=>s.views-e.views).slice(0,10)}get normalizedMonthlyTrend(){if(Array.isArray(this.chartData?.monthlyTrend)&&this.chartData.monthlyTrend.length>0)return this.chartData.monthlyTrend;const t=new Map,e=new Date,s=[];for(let n=11;n>=0;n--){const a=new Date(e.getFullYear(),e.getMonth()-n,1),o=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`;s.push(o),t.set(o,{articleCount:0,momentCount:0})}return(this.chartData?.articles||[]).forEach(n=>{const a=n.date||n.name;if(!a)return;const o=new Date(a);if(Number.isNaN(o.valueOf()))return;const r=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`,l=t.get(r);l&&(l.articleCount+=Number(n.articleTotal??n.total??n.count??0),l.momentCount+=Number(n.momentTotal??0))}),s.map(n=>{const a=t.get(n);return{month:n,articleCount:a.articleCount,momentCount:a.momentCount,total:a.articleCount+a.momentCount}})}async loadData(){this.loading=!0,this.error=null;try{this.chartData=await mh()}catch(t){this.error=t instanceof Error?t.message:"请求失败"}finally{this.loading=!1}}destroyCharts(){this.tagsChart?.destroy(),this.tagsChart=null,this.monthlyChart?.destroy(),this.monthlyChart=null,this.commentsChart?.destroy(),this.commentsChart=null}getChartColors(){const t=this.themeController.mode==="dark",e=this.resolveAccentHex();return{dark:t,accent:e,accentSoft:at(e,t?.22:.14),palette:this.palette,surfaceSubtle:t?"#14171f":"#fafafa",grid:t?"rgba(255, 255, 255, 0.07)":"rgba(113, 113, 122, 0.14)",tick:t?"#a1a1aa":"#71717a",textPrimary:t?"#f4f4f5":"#09090b",tooltipBg:t?"#222633":"#18181b",tooltipText:t?"#f4f4f5":"#fafafa",tooltipBorder:t?"rgba(255, 255, 255, 0.12)":"rgba(255, 255, 255, 0.08)"}}mountCharts(){this.destroyCharts();const t=this.getChartColors(),e=this.renderRoot.querySelector("#tags-canvas"),s=this.normalizedTags;if(e&&s.length>0){const l=s.reduce((c,d)=>c+d.count,0);this.tagsChart=new ie(e,{type:"doughnut",data:{labels:s.map(c=>c.name),datasets:[{data:s.map(c=>c.count),backgroundColor:s.map((c,d)=>t.palette[d%t.palette.length]),borderWidth:2,borderColor:t.surfaceSubtle,hoverOffset:4}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"68%",animation:{duration:520,easing:"easeOutCubic"},plugins:{tooltip:{enabled:!0,backgroundColor:t.tooltipBg,titleColor:t.tooltipText,bodyColor:t.tooltipText,borderColor:t.tooltipBorder,borderWidth:1,padding:10,cornerRadius:8,displayColors:!0,callbacks:{label:c=>{const d=Number(c.raw)||0;return` ${c.label}：${d} 篇 (${Ke(d,l)})`}}}},onHover:(c,d)=>{e.style.cursor=d.length>0?"pointer":"default",this.activeTagIndex=d.length>0?d[0].index:null},onClick:(c,d)=>{if(d.length>0){const h=d[0].index;this.pinnedTagIndex=this.pinnedTagIndex===h?null:h}else this.pinnedTagIndex=null}}})}const n=this.renderRoot.querySelector("#monthly-trend-canvas"),a=this.normalizedMonthlyTrend;if(n&&a.length>0){const l=!!this.chartData?.enableMomentHeatmap&&a.some(d=>d.momentCount>0),c=[{label:"文章发布",data:a.map(d=>d.articleCount),borderColor:t.accent,backgroundColor:t.accentSoft,borderWidth:2,fill:!0,tension:.35,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:t.accent}];if(l){const d=t.dark?"#34d399":"#10b981";c.push({label:"瞬间发布",data:a.map(h=>h.momentCount),borderColor:d,backgroundColor:at(d,t.dark?.16:.1),borderWidth:1.8,fill:!0,tension:.35,pointRadius:2.5,pointHoverRadius:4.5,pointBackgroundColor:d})}this.monthlyChart=new ie(n,{type:"line",data:{labels:a.map(d=>`${Number(d.month.slice(5,7))}月`),datasets:c},options:{responsive:!0,maintainAspectRatio:!1,animation:{duration:480,easing:"easeOutCubic"},interaction:{mode:"index",intersect:!1},scales:{x:{border:{display:!1},grid:{display:!1},ticks:{color:t.tick,font:{size:11.5}}},y:{beginAtZero:!0,border:{display:!1},grid:{color:t.grid,drawTicks:!1},ticks:{precision:0,color:t.tick,maxTicksLimit:5,font:{size:11.5}}}},plugins:{tooltip:{backgroundColor:t.tooltipBg,titleColor:t.tooltipText,bodyColor:t.tooltipText,borderColor:t.tooltipBorder,borderWidth:1,cornerRadius:8,padding:10,callbacks:{title:d=>{const h=d[0]?.dataIndex??0;return a[h]?.month||""},label:d=>` ${d.dataset.label}：${d.raw} 条`}}}}})}const o=this.renderRoot.querySelector("#comments-canvas"),r=this.normalizedComments;if(o&&r.length>0){const l=d=>r.map((h,u)=>u===0?d:u<3?at(d,.72):at(d,.35)),c={id:"dsBarValueLabels",afterDatasetsDraw:d=>{const{ctx:h}=d,u=d.getDatasetMeta(0),f=this.getChartColors();h.save(),h.font="600 11.5px -apple-system, BlinkMacSystemFont, Inter, sans-serif",h.textBaseline="middle",h.textAlign="left",u.data.forEach((g,p)=>{const m=r[p]?.count;m!=null&&(h.fillStyle=p<3?f.textPrimary:f.tick,h.fillText(String(m),g.x+8,g.y))}),h.restore()}};this.commentsChart=new ie(o,{type:"bar",plugins:[c],data:{labels:r.map(d=>d.name.length>14?`${d.name.slice(0,14)}…`:d.name),datasets:[{label:"评论数",data:r.map(d=>d.count),backgroundColor:l(t.accent),hoverBackgroundColor:t.accent,borderRadius:5,borderSkipped:!1,barThickness:18,maxBarThickness:22}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,layout:{padding:{right:34}},animation:{duration:500,easing:"easeOutCubic"},interaction:{mode:"index",axis:"y",intersect:!1},scales:{x:{beginAtZero:!0,border:{display:!1},grid:{color:t.grid,drawTicks:!1},ticks:{precision:0,color:t.tick,padding:6,font:{size:11.5}}},y:{border:{display:!1},grid:{display:!1},ticks:{color:t.textPrimary,padding:8,font:{size:12,weight:"bold"}}}},plugins:{tooltip:{backgroundColor:t.tooltipBg,titleColor:t.tooltipText,bodyColor:t.tooltipText,borderColor:t.tooltipBorder,borderWidth:1,cornerRadius:8,padding:10,displayColors:!1,callbacks:{title:d=>r[d[0]?.dataIndex??0]?.name||"",label:d=>`评论 ${Z(Number(d.raw)||0)} 条`}}},onHover:(d,h)=>{o.style.cursor=h.length>0?"pointer":"default"}}})}}syncChartThemes(){const t=this.getChartColors();if(this.tagsChart){const e=this.normalizedTags,s=this.tagsChart.data.datasets[0];s.backgroundColor=e.map((a,o)=>t.palette[o%t.palette.length]),s.borderColor=t.surfaceSubtle;const n=this.tagsChart.options.plugins?.tooltip;n&&(n.backgroundColor=t.tooltipBg,n.titleColor=t.tooltipText,n.bodyColor=t.tooltipText,n.borderColor=t.tooltipBorder),this.tagsChart.update("none")}if(this.monthlyChart){const e=this.monthlyChart.data.datasets[0];e&&(e.borderColor=t.accent,e.backgroundColor=t.accentSoft);const s=this.monthlyChart.options.scales?.x,n=this.monthlyChart.options.scales?.y;s?.ticks&&(s.ticks.color=t.tick),n?.ticks&&(n.ticks.color=t.tick),n?.grid&&(n.grid.color=t.grid),this.monthlyChart.update("none")}if(this.commentsChart){const e=this.normalizedComments,s=this.commentsChart.data.datasets[0];s.backgroundColor=e.map((o,r)=>r===0?t.accent:r<3?at(t.accent,.72):at(t.accent,.35)),s.hoverBackgroundColor=t.accent;const n=this.commentsChart.options.scales?.x,a=this.commentsChart.options.scales?.y;n?.grid&&(n.grid.color=t.grid),n?.ticks&&(n.ticks.color=t.tick),a?.ticks&&(a.ticks.color=t.textPrimary),this.commentsChart.update("none")}}attachHeatmapObserver(){const t=this.renderRoot.querySelector(".heatmap-scroll");if(!t||t===this.observedHeatmapEl)return;this.heatmapResizeObserver?.disconnect(),this.observedHeatmapEl=t;const e=()=>{const s=t.getBoundingClientRect();if(s.width<=0)return;if(window.innerWidth<=768){this.heatmapCellPx=11;return}const n=53,a=24,o=3,r=s.width-a-8,l=Math.floor((r-(n-1)*o)/n);this.heatmapCellPx=Math.max(9,Math.min(14,l))};this.heatmapResizeObserver=new ResizeObserver(e),this.heatmapResizeObserver.observe(t),e()}exportSummaryPng(){if(!(!this.chartData||this.exporting)){this.exporting=!0;try{const t=this.themeController.mode==="dark",e=this.resolveAccentHex(),s=2,n=920,a=650,o=document.createElement("canvas");o.width=n*s,o.height=a*s;const r=o.getContext("2d");if(!r)return;r.scale(s,s);const l=t?"#090a0e":"#f8fafc",c=t?"#0e1015":"#ffffff",d=t?"#14171f":"#fafafa",h=t?"rgba(255,255,255,0.1)":"#e4e4e7",u=t?"#f4f4f5":"#09090b",f=t?"#a1a1aa":"#71717a",g="-apple-system, BlinkMacSystemFont, 'Inter', 'PingFang SC', sans-serif",p=(O,B,W,Q,mt)=>{r.beginPath(),r.roundRect(O,B,W,Q,mt)};r.fillStyle=l,r.fillRect(0,0,n,a),p(24,24,n-48,a-48,16),r.fillStyle=c,r.fill(),r.strokeStyle=h,r.lineWidth=1,r.stroke();const m=document.title?document.title.slice(0,32):"站点数据统计";r.fillStyle=u,r.font=`700 18px ${g}`,r.fillText(m,52,66),r.fillStyle=f,r.font=`400 12px ${g}`,r.fillText(`数据快照 · ${At(new Date)}`,52,86),p(n-170,48,118,26,13),r.fillStyle=at(e,t?.2:.1),r.fill(),r.fillStyle=e,r.font=`600 11.5px ${g}`,r.textAlign="center",r.fillText("Halo Data Stats",n-111,65),r.textAlign="left";const b=this.chartData.summary,v=[{label:"已发布文章",value:G(b?.totalPosts??this.normalizedTopArticles.length)},{label:"全站总阅读",value:G(b?.totalViews??this.normalizedTopArticles.reduce((O,B)=>O+B.views,0))},{label:"累计评论",value:G(b?.totalComments??this.normalizedComments.reduce((O,B)=>O+B.count,0))},{label:"已运行天数",value:`${b?.runningDays??0} 天`}],_=(n-104-36)/4;v.forEach((O,B)=>{const W=52+B*(_+12);p(W,108,_,74,10),r.fillStyle=d,r.fill(),r.strokeStyle=h,r.stroke(),r.fillStyle=f,r.font=`500 11.5px ${g}`,r.fillText(O.label,W+16,133),r.fillStyle=u,r.font=`700 22px ${g}`,r.fillText(O.value,W+16,164)}),p(52,200,n-104,156,10),r.fillStyle=d,r.fill(),r.strokeStyle=h,r.stroke(),r.fillStyle=u,r.font=`600 13px ${g}`,r.fillText("近一年创作热力图",70,226);const k=new Map;(this.chartData.articles||[]).forEach(O=>{const B=O.date||O.name;if(!B)return;const W=new Date(B);if(Number.isNaN(W.valueOf()))return;const Q=At(W),mt=O.total!=null?Number(O.total):Number(O.articleTotal??O.count??0);k.set(Q,(k.get(Q)||0)+mt)});const x=Math.max(...Array.from(k.values()),1),T=t?["rgba(255,255,255,0.06)",at(e,.28),at(e,.5),at(e,.74),e]:["#f1f5f9",at(e,.2),at(e,.45),at(e,.72),e],M=new Date;M.setHours(0,0,0,0);const C=new Date(M.getTime()-364*Pt),D=new Date(C);D.setDate(D.getDate()-(D.getDay()+6)%7);const I=11,j=3.5;for(let O=0;O<53;O++)for(let B=0;B<7;B++){const W=new Date(D.getTime()+(O*7+B)*Pt);if(W<C||W>M)continue;const Q=k.get(At(W))||0,mt=Q===0?0:Math.min(4,Math.ceil(Q/x*4));r.fillStyle=T[mt],p(70+O*(I+j),244+B*(I+j),I,I,2.5),r.fill()}const S=374,P=224,R=340,$=52+R+16,F=n-104-R-16;p(52,S,R,P,10),r.fillStyle=d,r.fill(),r.strokeStyle=h,r.stroke(),r.fillStyle=u,r.font=`600 13px ${g}`,r.fillText("分类分布 Top 5",70,S+28);const z=this.normalizedCategories.slice(0,5),X=Math.max(...z.map(O=>O.count),1);z.forEach((O,B)=>{const W=S+58+B*32;r.fillStyle=u,r.font=`500 12px ${g}`,r.fillText(O.name.slice(0,14),70,W),r.fillStyle=f,r.textAlign="right",r.fillText(`${O.count} 篇`,52+R-18,W),r.textAlign="left";const Q=R-36;p(70,W+7,Q,5,2.5),r.fillStyle=t?"rgba(255,255,255,0.07)":"#e2e8f0",r.fill(),p(70,W+7,Math.max(8,O.count/X*Q),5,2.5),r.fillStyle=at(e,Math.max(.45,1-B*.12)),r.fill()}),p($,S,F,P,10),r.fillStyle=d,r.fill(),r.strokeStyle=h,r.stroke(),r.fillStyle=u,r.font=`600 13px ${g}`,r.fillText("热门文章 Top 5",$+18,S+28),this.normalizedTopArticles.slice(0,5).forEach((O,B)=>{const W=S+58+B*32;p($+18,W-12,20,18,5),r.fillStyle=B===0?e:at(e,t?.2:.1),r.fill(),r.fillStyle=B===0?"#ffffff":e,r.font=`600 10.5px ${g}`,r.textAlign="center",r.fillText(`0${B+1}`,$+28,W+1),r.textAlign="left",r.fillStyle=u,r.font=`500 12px ${g}`;const Q=O.name.length>24?`${O.name.slice(0,24)}…`:O.name;r.fillText(Q,$+46,W+1),r.fillStyle=f,r.textAlign="right",r.fillText(G(O.views),$+F-18,W+1),r.textAlign="left"});const lt=document.createElement("a");lt.download=`site-statistics-${At(new Date)}.png`,lt.href=o.toDataURL("image/png"),lt.click()}finally{this.exporting=!1}}}handleLegendHover(t){if(this.activeTagIndex=t,!this.tagsChart)return;const e=t??this.pinnedTagIndex;this.tagsChart.setActiveElements(e!==null?[{datasetIndex:0,index:e}]:[]),this.tagsChart.update("none")}handleLegendClick(t){this.pinnedTagIndex=this.pinnedTagIndex===t?null:t,this.tagsChart&&(this.tagsChart.setActiveElements(this.pinnedTagIndex!==null?[{datasetIndex:0,index:this.pinnedTagIndex}]:[]),this.tagsChart.update("none"))}clearPinnedTag(){this.pinnedTagIndex=null,this.activeTagIndex=null,this.tagsChart&&(this.tagsChart.setActiveElements([]),this.tagsChart.update("none"))}handleHeatmapCellEnter(t,e,s,n,a){const o=t.currentTarget,r=this.renderRoot.querySelector(".heatmap-card");if(!r||!o)return;let l="无发布记录";this.heatmapFilter==="articles"?l=n.articleTotal>0?`${n.articleTotal} 篇文章`:"无文章发布":this.heatmapFilter==="moments"?l=n.momentTotal>0?`${n.momentTotal} 条瞬间`:"无瞬间发布":a?n.articleTotal>0&&n.momentTotal>0?l=`${n.articleTotal} 篇文章 · ${n.momentTotal} 条瞬间`:n.articleTotal>0?l=`${n.articleTotal} 篇文章`:n.momentTotal>0&&(l=`${n.momentTotal} 条瞬间`):n.articleTotal>0&&(l=`${n.articleTotal} 篇文章`);const c=r.getBoundingClientRect(),d=o.getBoundingClientRect(),h=156;let u=d.left-c.left+d.width/2-h/2,f=d.top-c.top-56,g=!1;u=Math.max(4,Math.min(u,Math.max(4,c.width-h-4))),f<0&&(f=d.bottom-c.top+10,g=!0),this.tooltip={visible:!0,below:g,x:Math.round(u),y:Math.round(f),dateLabel:`${e} · ${s}`,detail:l}}handleHeatmapLeave(){this.tooltip.visible&&(this.tooltip={...this.tooltip,visible:!1})}renderOverviewStrip(){if(!this.enabledTypes.includes("overview")&&!this.enabledTypes.includes("summary"))return A;const t=this.chartData?.summary,e=t?.totalPosts??this.normalizedTopArticles.length,s=t?.totalViews??this.normalizedTopArticles.reduce((o,r)=>o+r.views,0),n=t?.totalComments??this.normalizedComments.reduce((o,r)=>o+r.count,0),a=t?.runningDays??0;return y`
      <div class="overview-wrap" aria-label="站内数据概览">
        <div class="overview-bar">
          <span class="overview-bar__title">
            全站内容概览${t?.siteStartDate?` · 始于 ${t.siteStartDate}`:""}
          </span>
          <button
            type="button"
            class="ds-btn-ghost"
            ?disabled=${this.exporting}
            @click=${()=>this.exportSummaryPng()}
          >
            ${Ze.download}
            <span>${this.exporting?"生成中…":"导出长图"}</span>
          </button>
        </div>
        <div class="overview-strip">
          <div class="overview-cell">
            <span class="overview-icon">${Ze.article}</span>
            <div class="overview-body">
              <span class="overview-val" title=${Z(e)}>${G(e)}</span>
              <span class="overview-label">已发布文章</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${Ze.eye}</span>
            <div class="overview-body">
              <span class="overview-val" title="${Z(s)} 次阅读">${G(s)}</span>
              <span class="overview-label">全站总阅读</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${Ze.comment}</span>
            <div class="overview-body">
              <span class="overview-val" title=${Z(n)}>${G(n)}</span>
              <span class="overview-label">累计评论</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${Ze.clock}</span>
            <div class="overview-body">
              <span class="overview-val">${a>0?`${Z(a)} 天`:`${this.normalizedTags.length}`}</span>
              <span class="overview-label">${a>0?"已稳定运行":"活跃标签"}</span>
            </div>
          </div>
        </div>
      </div>
    `}renderTaxonomySection(){const t=this.enabledTypes,e=t.includes("tags"),s=t.includes("categories");if(!e&&!s)return A;const n=this.normalizedTags,a=this.normalizedCategories,o=n.reduce((v,_)=>v+_.count,0),r=a.reduce((v,_)=>v+_.count,0),l=Math.max(...a.map(v=>v.count),1),c=Math.max(0,(this.chartData?.tags?.length||0)-n.length),d=Math.max(0,(this.chartData?.categories?.length||0)-a.length),h=this.activeTagIndex??this.pinnedTagIndex,u=h!==null?n[h]:null,f=n.slice(0,7),g=this.categoriesExpanded?a:a.slice(0,6),p=(e&&n.length>0?1:0)+(s&&a.length>0?1:0);return y`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">${e&&s?"标签与分类分布":e?"标签分布统计":"分类分布统计"}</div>
            <div class="section__subtitle">${e&&s?"站内已使用标签与分类的文章归属占比":e?"按文章关联数量排序的标签分布":"按文章数量排序的分类占比"}</div>
          </div>
          <div class="section__right">
            ${e?y`<span class="stat-pill">标签 <strong>${n.length}</strong></span>`:A}
            ${s?y`<span class="stat-pill">分类 <strong>${a.length}</strong></span>`:A}
          </div>
        </header>

        <div class="section__body">
          ${p===0?y`<div class="state-card">暂无标签或分类数据</div>`:y`
                <div class="taxonomy-grid ${p===1?"is-single":""}">
                  ${e&&n.length>0?y`
                        <div class="panel">
                          <div class="panel__head">
                            <span class="panel__title">标签分布</span>
                            <div class="panel__meta">
                              ${this.pinnedTagIndex!==null?y`
                                    <button type="button" class="text-link-btn" @click=${this.clearPinnedTag}>
                                      取消锁定
                                    </button>
                                  `:A}
                              <span class="panel__badge">
                                ${n.length} 个已使用${c>0?` · ${c} 个未使用`:""}
                              </span>
                            </div>
                          </div>

                          <div class="donut-layout">
                            <div class="donut-stage">
                              <canvas id="tags-canvas"></canvas>
                              <div class="donut-center">
                                <span class="donut-total">
                                  ${G(u?u.count:n.length)}
                                </span>
                                <span class="donut-caption">
                                  ${u?u.name:"活跃标签"}
                                </span>
                                ${u?y`<span class="donut-sub">${Ke(u.count,o)}</span>`:A}
                              </div>
                            </div>

                            <ul class="legend ${h!==null?"has-focus":""}">
                              ${f.map((v,_)=>{const k=this.palette[_%this.palette.length],x=this.activeTagIndex===_,T=this.pinnedTagIndex===_;return y`
                                  <li
                                    class="legend__item ${x?"is-active":""} ${T?"is-pinned":""}"
                                    @mouseenter=${()=>this.handleLegendHover(_)}
                                    @mouseleave=${()=>this.handleLegendHover(null)}
                                    @click=${()=>this.handleLegendClick(_)}
                                  >
                                    <span class="legend__left">
                                      <span class="legend__dot" style="background:${k}"></span>
                                      ${v.permalink?y`
                                            <a
                                              class="entity-link"
                                              href=${v.permalink}
                                              title=${v.name}
                                              @click=${M=>M.stopPropagation()}
                                            >
                                              <span class="legend__label">${v.name}</span>
                                              <span class="entity-link__arrow">↗</span>
                                            </a>
                                          `:y`<span class="legend__label" title=${v.name}>${v.name}</span>`}
                                    </span>
                                    <span class="legend__right">
                                      <span class="legend__count">${v.count}</span>
                                      <span class="legend__pct">${Ke(v.count,o)}</span>
                                    </span>
                                  </li>
                                `})}
                              ${n.length>7?y`<li class="legend__more">其余 ${n.length-7} 个标签已归入图表展示</li>`:A}
                            </ul>
                          </div>
                        </div>
                      `:A}
                  ${s&&a.length>0?y`
                        <div class="panel">
                          <div class="panel__head">
                            <span class="panel__title">分类占比</span>
                            <span class="panel__badge">
                              ${a.length} 个已使用${d>0?` · ${d} 个未使用`:""}
                            </span>
                          </div>

                          <ul class="dist-list">
                            ${g.map((v,_)=>{const k=Math.max(4,Math.round(v.count/l*100)),x=Math.max(.42,1-_*.08);return y`
                                <li class="dist-item">
                                  <div class="dist-meta">
                                    ${v.permalink?y`
                                          <a class="entity-link dist-name" href=${v.permalink} title=${v.name}>
                                            <span class="dist-name">${v.name}</span>
                                            <span class="entity-link__arrow">↗</span>
                                          </a>
                                        `:y`<span class="dist-name" title=${v.name}>${v.name}</span>`}
                                    <span class="dist-values">
                                      <span class="dist-count">${v.count} 篇</span>
                                      <span class="dist-pct">${Ke(v.count,r)}</span>
                                    </span>
                                  </div>
                                  <div class="dist-track">
                                    <div class="dist-fill" style="width:${k}%;opacity:${x.toFixed(2)}"></div>
                                  </div>
                                </li>
                              `})}
                          </ul>

                          <div class="panel__footer">
                            <span>分类关联总计 ${Z(r)} 篇</span>
                            ${a.length>6?y`
                                  <button
                                    type="button"
                                    class="text-link-btn"
                                    @click=${()=>{this.categoriesExpanded=!this.categoriesExpanded}}
                                  >
                                    ${this.categoriesExpanded?"收起":`展开全部 (${a.length})`}
                                  </button>
                                `:A}
                          </div>
                        </div>
                      `:A}
                </div>
              `}
        </div>
      </section>
    `}renderHeatmapSection(){if(!this.enabledTypes.includes("articles"))return A;const t=!!this.chartData?.enableMomentHeatmap,e=new Map;(this.chartData?.articles||[]).forEach(S=>{const P=S.date||S.name;if(!P)return;const R=new Date(P);if(Number.isNaN(R.valueOf()))return;R.setHours(0,0,0,0);const $=At(R),F=Number(S.articleTotal??S.total??S.count??0),z=Number(S.momentTotal??0),X=S.total!=null?Number(S.total):F+z,Y=Number.isFinite(X)?X:F+z,lt=e.get($)||{total:0,articleTotal:0,momentTotal:0};e.set($,{total:lt.total+Y,articleTotal:lt.articleTotal+F,momentTotal:lt.momentTotal+z})});const s=new Date;s.setHours(0,0,0,0);const n=new Date(s.getTime()-364*Pt);let a=!1,o=0,r=0,l=0,c=0,d=0,h="",u=0,f=0;const g=S=>this.heatmapFilter==="articles"?S.articleTotal:this.heatmapFilter==="moments"?S.momentTotal:S.total;for(let S=n.getTime();S<=s.getTime();S+=Pt){const P=At(new Date(S)),R=e.get(P);R&&(o+=R.articleTotal,r+=R.momentTotal,R.momentTotal>0&&(a=!0));const $=R?g(R):0;$>0?(l+=$,c+=1,f+=1,f>u&&(u=f),$>d&&(d=$,h=P)):f=0}const p=new Date(n),m=(p.getDay()+6)%7;p.setDate(p.getDate()-m);const b=Math.floor((s.getTime()-p.getTime())/Pt)+1,v=Math.ceil(b/7),_=Array.from({length:v},(S,P)=>new Date(p.getTime()+P*7*Pt)),k=[],x=new Date(n.getFullYear(),n.getMonth(),1),T=new Date(s.getFullYear(),s.getMonth(),1);for(;x<=T;){const S=new Date(x),P=new Date(x.getFullYear(),x.getMonth()+1,0),R=S<n?new Date(n):S,$=P>s?new Date(s):P,F=Math.floor((R.getTime()-p.getTime())/Pt),z=Math.floor(($.getTime()-p.getTime())/Pt),X=Math.max(0,Math.min(v-1,Math.floor(F/7))),Y=Math.max(X+1,Math.min(v,Math.floor(z/7)+1));k.push({label:Vh[x.getMonth()],start:X,end:Y}),x.setMonth(x.getMonth()+1)}const M=[];let C=0;k.forEach(S=>{const P=Math.max(C,S.start),R=Math.min(v,Math.max(P+1,S.end));if(P>=v)return;P>C&&M.push({label:"",span:P-C,placeholder:!0});const $=Math.max(1,R-P);M.push({label:$>=2?S.label:"",span:$}),C=R}),C<v&&M.push({label:"",span:v-C,placeholder:!0});const D=S=>{if(!S||!d)return 0;if(d<=1)return S>0?4:0;if(d===2)return S===1?2:4;const P=Math.max(1,Math.ceil(d*.25)),R=Math.max(P+1,Math.ceil(d*.5)),$=Math.max(R+1,Math.ceil(d*.75));return S>=$?4:S>=R?3:S>=P?2:1},I=t&&a,j=`repeat(${v}, ${this.heatmapCellPx}px)`;return y`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">创作活跃度</div>
            ${this.compact?A:y`
                  <div class="section__subtitle">
                    ${t?"近一年文章与瞬间的每日发布热力矩阵":"近一年每日文章发布热力矩阵"}
                  </div>
                `}
          </div>
          ${I?y`
                <div class="ds-segmented" role="tablist" aria-label="热力图数据类型筛选">
                  ${["all","articles","moments"].map(S=>y`
                      <button
                        type="button"
                        role="tab"
                        class="ds-segmented__btn ${this.heatmapFilter===S?"is-active":""}"
                        aria-selected=${this.heatmapFilter===S}
                        @click=${()=>{this.heatmapFilter=S}}
                      >
                        ${S==="all"?"全部":S==="articles"?"文章":"瞬间"}
                      </button>
                    `)}
                </div>
              `:A}
        </header>

        ${e.size===0?y`<div class="section__body"><div class="state-card">暂无发布记录</div></div>`:y`
              ${this.compact?A:y`
                    <div class="heatmap-stats-strip">
                      ${I&&this.heatmapFilter==="all"?y`
                            <span class="heatmap-stat-cell">文章 <strong>${Z(o)}</strong></span>
                            <span class="heatmap-stat-cell">瞬间 <strong>${Z(r)}</strong></span>
                          `:y`
                            <span class="heatmap-stat-cell">
                              ${this.heatmapFilter==="moments"?"近一年瞬间":"近一年发布"}
                              <strong>${Z(l)}</strong>
                            </span>
                          `}
                      <span class="heatmap-stat-cell">活跃 <strong>${c}</strong> 天</span>
                      <span class="heatmap-stat-cell">最长连更 <strong>${u}</strong> 天</span>
                      <span class="heatmap-stat-cell" title=${h?`峰值日期：${h}`:""}>
                        单日峰值 <strong>${d}</strong>
                      </span>
                    </div>
                  `}

              <div class="section__body">
                <div class="heatmap-scroll">
                  <div
                    class="heatmap-card"
                    style="--hm-cell:${this.heatmapCellPx}px;--hm-gap:3px"
                    @mouseleave=${this.handleHeatmapLeave}
                  >
                    ${this.tooltip.visible?y`
                          <div
                            class="heatmap__tooltip ${this.tooltip.below?"is-below":""}"
                            style="transform:translate(${this.tooltip.x}px, ${this.tooltip.y}px)"
                          >
                            <strong>${this.tooltip.dateLabel}</strong>
                            <span>${this.tooltip.detail}</span>
                          </div>
                        `:A}

                    <div class="heatmap">
                      <div class="heatmap__weekdays">
                        ${["一","二","三","四","五","六","日"].map((S,P)=>y`<div class="heatmap__weekday ${P===0||P===2||P===4||P===6?"":"is-hidden"}">${S}</div>`)}
                      </div>

                      <div class="heatmap__months" style="grid-template-columns:${j}">
                        ${M.map(S=>y`
                            <div class="heatmap__month" style="grid-column:span ${S.span}">
                              ${S.label}
                            </div>
                          `)}
                      </div>

                      <div class="heatmap__grid" style="grid-template-columns:${j}">
                        ${_.map(S=>y`
                            <div class="heatmap__column">
                              ${Array.from({length:7},(P,R)=>{const $=new Date(S.getTime()+R*Pt);if(!($>=n&&$<=s))return y`<div class="heatmap__day is-outside"></div>`;const z=At($),X=e.get(z)||{total:0,articleTotal:0,momentTotal:0},Y=g(X),lt=D(Y),O=jh[$.getDay()];return y`
                                  <div
                                    class="heatmap__day"
                                    data-level=${lt}
                                    tabindex="0"
                                    aria-label="${z} ${O}: ${Y}"
                                    @mouseenter=${B=>this.handleHeatmapCellEnter(B,z,O,X,t)}
                                    @focus=${B=>this.handleHeatmapCellEnter(B,z,O,X,t)}
                                    @mouseleave=${this.handleHeatmapLeave}
                                    @blur=${this.handleHeatmapLeave}
                                  ></div>
                                `})}
                            </div>
                          `)}
                      </div>

                      <div class="heatmap__footer">
                        <span class="heatmap__range">${At(n)} 至 ${At(s)}</span>
                        <div class="heatmap__legend">
                          <span>少</span>
                          ${[0,1,2,3,4].map(S=>y`<span class="heatmap__legend-dot" data-level=${S}></span>`)}
                          <span>多</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `}
      </section>
    `}renderMonthlyTrendSection(){if(!this.enabledTypes.includes("monthlyTrend"))return A;const t=this.normalizedMonthlyTrend,e=t.reduce((n,a)=>n+a.total,0),s=!!this.chartData?.enableMomentHeatmap&&t.some(n=>n.momentCount>0);return y`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">月度创作趋势</div>
            ${this.compact?A:y`<div class="section__subtitle">近 12 个月内容发布节奏变化</div>`}
          </div>
          <div class="section__right">
            <span class="trend-dot-label">
              <span class="trend-dot" style="background:var(--ds-accent)"></span>文章
            </span>
            ${s?y`
                  <span class="trend-dot-label">
                    <span class="trend-dot" style="background:var(--ds-live)"></span>瞬间
                  </span>
                `:A}
            <span class="stat-pill">近 12 月 <strong>${Z(e)}</strong></span>
          </div>
        </header>
        <div class="section__body">
          <div class="canvas-wrap" style="height:${this.compact?168:200}px">
            <canvas id="monthly-trend-canvas"></canvas>
          </div>
        </div>
      </section>
    `}renderCommentsSection(){if(!this.enabledTypes.includes("comments"))return A;const t=this.normalizedComments,e=t.reduce((n,a)=>n+a.count,0),s=Math.max(180,t.length*34+32);return y`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">评论活跃榜</div>
            <div class="section__subtitle">按评论次数排名的站内活跃读者</div>
          </div>
          ${t.length>0?y`
                <div class="section__right">
                  <span class="stat-pill">Top <strong>${t.length}</strong></span>
                  <span class="stat-pill">累计 <strong>${Z(e)}</strong> 条</span>
                </div>
              `:A}
        </header>
        <div class="section__body">
          ${t.length===0?y`<div class="state-card">暂无评论数据</div>`:y`
                <div class="canvas-wrap" style="height:${s}px">
                  <canvas id="comments-canvas"></canvas>
                </div>
              `}
        </div>
      </section>
    `}renderTopArticlesSection(){if(!this.enabledTypes.includes("topArticles"))return A;const t=this.normalizedTopArticles,e=t.reduce((n,a)=>n+a.views,0),s=Math.max(...t.map(n=>n.views),1);return y`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">热门文章排行</div>
            <div class="section__subtitle">按累计阅读量排序的站内热门内容，点击标题可直达阅读</div>
          </div>
          ${t.length>0?y`
                <div class="section__right">
                  <span class="stat-pill">Top <strong>${t.length}</strong></span>
                  <span class="stat-pill">总阅读 <strong>${G(e)}</strong></span>
                </div>
              `:A}
        </header>
        <div class="section__body">
          ${t.length===0?y`<div class="state-card">暂无热门文章数据</div>`:y`
                <ol class="rank-list">
                  ${t.map((n,a)=>{const o=a+1,r=Math.max(4,Math.round(n.views/s*100)),l=a<3?1:Math.max(.36,.72-(a-3)*.05),c=o===1?"is-first":o<=3?"is-top":"";return y`
                      <li class="rank-item">
                        <span class="rank-num ${c}">
                          ${String(o).padStart(2,"0")}
                        </span>
                        <div class="rank-main">
                          ${n.permalink?y`
                                <a class="entity-link rank-title" href=${n.permalink} title=${n.name}>
                                  <span class="rank-title">${n.name}</span>
                                  <span class="entity-link__arrow">↗</span>
                                </a>
                              `:y`<div class="rank-title" title=${n.name}>${n.name}</div>`}
                          <div class="rank-track">
                            <div class="rank-fill" style="width:${r}%;opacity:${l.toFixed(2)}"></div>
                          </div>
                        </div>
                        <div class="rank-value" title="${Z(n.views)} 次阅读">
                          <span class="rank-views">${G(n.views)}</span>
                          <span class="rank-unit">阅读</span>
                        </div>
                      </li>
                    `})}
                </ol>
              `}
        </div>
      </section>
    `}render(){return this.loading?y`
        <div class="skeleton-shell" aria-busy="true" aria-label="站内图表加载中">
          <div class="skeleton-top">
            <div class="ds-skeleton" style="width:140px;height:16px"></div>
            <div class="ds-skeleton" style="width:90px;height:14px"></div>
          </div>
          <div class="skeleton-grid">
            <div class="ds-skeleton" style="height:196px"></div>
            <div class="ds-skeleton" style="height:196px"></div>
          </div>
        </div>
      `:this.error?y`
        <div class="state-card state-card--error">
          <span>获取图表数据失败：${this.error}</span>
          <button type="button" class="ds-btn-ghost" @click=${()=>this.loadData()}>重新加载</button>
        </div>
      `:y`
      <div class="board">
        ${this.renderOverviewStrip()}
        ${this.renderTaxonomySection()}
        ${this.renderHeatmapSection()}
        ${this.renderMonthlyTrendSection()}
        ${this.renderCommentsSection()}
        ${this.renderTopArticlesSection()}
      </div>
    `}},w.SiteCharts.styles=Bh,ut([nt({type:String,attribute:"data-types"})],w.SiteCharts.prototype,"dataTypes",2),ut([nt({type:String,attribute:"accent-color"})],w.SiteCharts.prototype,"accentColor",2),ut([nt({type:Boolean,reflect:!0})],w.SiteCharts.prototype,"compact",2),ut([E()],w.SiteCharts.prototype,"loading",2),ut([E()],w.SiteCharts.prototype,"exporting",2),ut([E()],w.SiteCharts.prototype,"error",2),ut([E()],w.SiteCharts.prototype,"chartData",2),ut([E()],w.SiteCharts.prototype,"activeTagIndex",2),ut([E()],w.SiteCharts.prototype,"pinnedTagIndex",2),ut([E()],w.SiteCharts.prototype,"categoriesExpanded",2),ut([E()],w.SiteCharts.prototype,"heatmapFilter",2),ut([E()],w.SiteCharts.prototype,"heatmapCellPx",2),ut([E()],w.SiteCharts.prototype,"tooltip",2),w.SiteCharts=ut([de("site-charts")],w.SiteCharts);const Yh=[be,Ht`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      width: 100%;
    }

    .grid.is-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
      min-width: 0;
    }

    .card--full {
      grid-column: 1 / -1;
    }

    .card__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
    }

    .card__title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .card__user {
      font-family: var(--ds-font-mono);
      font-size: 11px;
      color: var(--ds-text-muted);
    }

    .card__body {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      min-height: 132px;
    }

    .card__img {
      display: block;
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .card__img.is-loaded {
      opacity: 1;
    }

    .card__skeleton {
      position: absolute;
      inset: 14px;
      border-radius: 8px;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 112px;
      padding: 18px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      background: var(--ds-error-bg);
      border-color: var(--ds-error-border);
      color: var(--ds-error-text);
    }

    .card__error {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--ds-error-text);
      padding: 12px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `];var Xh=Object.defineProperty,qh=Object.getOwnPropertyDescriptor,ct=(i,t,e,s)=>{for(var n=s>1?void 0:s?qh(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Xh(t,e,n),n};const Ds=["graph","stats","pin","top-langs"],ho={graph:"GitHub 活跃热力图",stats:"GitHub 贡献统计",pin:"GitHub 仓库展示","top-langs":"常用开发语言"};w.GithubStatistics=class extends bt{constructor(){super(),this.dataTypes="graph",this.statsLocale="",this.statsShowIcons="",this.statsTheme="",this.pinRepo="",this.topLangsLayout="",this.topLangsHideProgress="",this.topLangsStatsFormat="",this.graphTheme="minimal",this.loading=!0,this.error=null,this.config=null,this.imageStates={},this.retryTokens={},new me(this)}connectedCallback(){super.connectedCallback(),this.loadConfig()}get orderedTypes(){const t=(this.dataTypes||"graph").split(",").map(s=>s.trim()).filter(s=>Ds.includes(s));return Array.from(new Set(t)).sort((s,n)=>Ds.indexOf(s)-Ds.indexOf(n))}async loadConfig(){this.loading=!0,this.error=null;try{const t=await gh();if(!t?.username)throw new Error("GitHub 用户名未配置");this.config=t}catch(t){this.error=t instanceof Error?t.message:"加载 GitHub 配置失败"}finally{this.loading=!1}}buildImageUrl(t){if(!this.config)return"";const e=new URLSearchParams;e.append("username",this.config.username);let s="";t==="graph"?(e.append("theme",this.graphTheme||"minimal"),s=`${this.config.graphProxyUrl}graph?${e.toString()}`):t==="stats"?(this.statsLocale&&e.append("locale",this.statsLocale),this.statsShowIcons&&e.append("show_icons",this.statsShowIcons),this.statsTheme&&e.append("theme",this.statsTheme),s=`${this.config.proxyUrl}api?${e.toString()}`):t==="pin"?(this.pinRepo&&e.append("repo",this.pinRepo),s=`${this.config.proxyUrl}api/pin/?${e.toString()}`):t==="top-langs"&&(this.topLangsLayout&&e.append("layout",this.topLangsLayout),this.topLangsHideProgress&&e.append("hide_progress",this.topLangsHideProgress),this.topLangsStatsFormat&&e.append("stats_format",this.topLangsStatsFormat),s=`${this.config.proxyUrl}api/top-langs/?${e.toString()}`);const n=this.retryTokens[t];return n&&(s+=`&_r=${n}`),s}setCardState(t,e){this.imageStates={...this.imageStates,[t]:e}}handleRetryCard(t){this.retryTokens={...this.retryTokens,[t]:(this.retryTokens[t]||0)+1},this.setCardState(t,"loading")}render(){if(this.loading)return y`
        <div class="state-box" aria-busy="true">
          <div class="ds-skeleton" style="width:100%;height:140px"></div>
        </div>
      `;if(this.error||!this.config)return y`
        <div class="state-box state-box--error">
          <span>${this.error||"GitHub 配置不可用"}</span>
          <button type="button" class="ds-btn-ghost" @click=${()=>this.loadConfig()}>重新加载</button>
        </div>
      `;const t=this.orderedTypes;if(t.length===0)return y`<div class="state-box">未选择 GitHub 统计模块</div>`;const s=t.filter(n=>n!=="graph").length<=1;return y`
      <div class="grid ${s?"is-single":""}">
        ${t.map(n=>{const a=this.imageStates[n]||"loading",o=this.buildImageUrl(n);return y`
            <div class="card ${n==="graph"||s?"card--full":""}">
              <div class="card__head">
                <span class="card__title">${ho[n]}</span>
                <span class="card__user">@${this.config.username}</span>
              </div>
              <div class="card__body">
                ${a==="loading"?y`<div class="ds-skeleton card__skeleton"></div>`:A}
                ${a==="error"?y`
                      <div class="card__error">
                        <span>图片加载失败，请检查代理地址配置</span>
                        <button type="button" class="ds-btn-ghost" @click=${()=>this.handleRetryCard(n)}>
                          重试
                        </button>
                      </div>
                    `:y`
                      <img
                        class="card__img ${a==="loaded"?"is-loaded":""}"
                        src=${o}
                        alt=${ho[n]}
                        loading="lazy"
                        @load=${()=>this.setCardState(n,"loaded")}
                        @error=${()=>this.setCardState(n,"error")}
                      />
                    `}
              </div>
            </div>
          `})}
      </div>
    `}},w.GithubStatistics.styles=Yh,ct([nt({type:String,attribute:"data-types"})],w.GithubStatistics.prototype,"dataTypes",2),ct([nt({type:String,attribute:"stats-locale"})],w.GithubStatistics.prototype,"statsLocale",2),ct([nt({type:String,attribute:"stats-show-icons"})],w.GithubStatistics.prototype,"statsShowIcons",2),ct([nt({type:String,attribute:"stats-theme"})],w.GithubStatistics.prototype,"statsTheme",2),ct([nt({type:String,attribute:"pin-repo"})],w.GithubStatistics.prototype,"pinRepo",2),ct([nt({type:String,attribute:"top-langs-layout"})],w.GithubStatistics.prototype,"topLangsLayout",2),ct([nt({type:String,attribute:"top-langs-hide-progress"})],w.GithubStatistics.prototype,"topLangsHideProgress",2),ct([nt({type:String,attribute:"top-langs-stats-format"})],w.GithubStatistics.prototype,"topLangsStatsFormat",2),ct([nt({type:String,attribute:"graph-theme"})],w.GithubStatistics.prototype,"graphTheme",2),ct([E()],w.GithubStatistics.prototype,"loading",2),ct([E()],w.GithubStatistics.prototype,"error",2),ct([E()],w.GithubStatistics.prototype,"config",2),ct([E()],w.GithubStatistics.prototype,"imageStates",2),ct([E()],w.GithubStatistics.prototype,"retryTokens",2),w.GithubStatistics=ct([de("github-statistics")],w.GithubStatistics);function Gh(i){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",i,{once:!0});return}i()}function it(i,t,e,s=e){const n=i.getAttribute(e);n&&t.setAttribute(s,n)}function ye(i,t){i.isConnected&&i.replaceWith(t)}function Kh(i){i.querySelectorAll(".xhhaocom-dataStatistics-v2-traffic").forEach(t=>{const e=document.createElement("traffic-statistics");it(t,e,"data-type"),ye(t,e)})}function Zh(i){i.querySelectorAll(".xhhaocom-dataStatistics-v2-activity").forEach(t=>{ye(t,document.createElement("activity-statistics"))})}function Jh(i){i.querySelectorAll(".xhhaocom-dataStatistics-v2-uptime-kuma").forEach(t=>{ye(t,document.createElement("uptime-statistics"))})}function Qh(i){i.querySelectorAll(".xhhaocom-chartboard").forEach(t=>{const e=document.createElement("site-charts");it(t,e,"data-types"),t.hasAttribute("compact")&&e.setAttribute("compact",""),ye(t,e)})}function tu(i){i.querySelectorAll(".github-statistics-container").forEach(t=>{const e=document.createElement("github-statistics");it(t,e,"data-types"),it(t,e,"data-stats-locale","stats-locale"),it(t,e,"data-stats-show-icons","stats-show-icons"),it(t,e,"data-stats-theme","stats-theme"),it(t,e,"data-pin-repo","pin-repo"),it(t,e,"data-top-langs-layout","top-langs-layout"),it(t,e,"data-top-langs-hide-progress","top-langs-hide-progress"),it(t,e,"data-top-langs-stats-format","top-langs-stats-format"),it(t,e,"data-graph-theme","graph-theme"),ye(t,e)})}function eu(i){const t=[".xhhaocom-dataStatistics-v2-github-stats",".xhhaocom-dataStatistics-v2-github-pin",".xhhaocom-dataStatistics-v2-github-top-langs",".xhhaocom-dataStatistics-v2-github-graph"].join(",");i.querySelectorAll(t).forEach(e=>{if(!e.isConnected||e.closest(".github-statistics-container"))return;const s=document.createElement("github-statistics");e.classList.contains("xhhaocom-dataStatistics-v2-github-stats")?(s.setAttribute("data-types","stats"),it(e,s,"data-locale","stats-locale"),it(e,s,"data-show-icons","stats-show-icons"),it(e,s,"data-theme","stats-theme")):e.classList.contains("xhhaocom-dataStatistics-v2-github-pin")?(s.setAttribute("data-types","pin"),it(e,s,"data-repo","pin-repo")):e.classList.contains("xhhaocom-dataStatistics-v2-github-top-langs")?(s.setAttribute("data-types","top-langs"),it(e,s,"data-layout","top-langs-layout"),it(e,s,"data-hide-progress","top-langs-hide-progress"),it(e,s,"data-stats-format","top-langs-stats-format")):e.classList.contains("xhhaocom-dataStatistics-v2-github-graph")&&(s.setAttribute("data-types","graph"),it(e,s,"data-theme","graph-theme")),ye(e,s)})}function Oi(i=document){tu(i),eu(i),Kh(i),Zh(i),Jh(i),Qh(i)}typeof window<"u"&&typeof document<"u"&&(window.xhhaocomDataStatisticsV2Init=()=>Oi(document),Gh(()=>{if(Oi(document),typeof MutationObserver>"u"||!document.body)return;new MutationObserver(()=>{Oi(document)}).observe(document.body,{childList:!0,subtree:!0})})),w.upgradeLegacyPlaceholders=Oi,Object.defineProperty(w,Symbol.toStringTag,{value:"Module"})}));
