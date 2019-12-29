!function(e){var t={};function i(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(r,s,function(t){return e[t]}.bind(null,s));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t),
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty=function(e,t){return e};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let r,s,n=/(url\()([^)]*)(\))/g,a=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function o(e,t){if(e&&a.test(e))return e;if("//"===e)return e;if(void 0===r){r=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",r="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),r)try{return new URL(e,t).href}catch(t){return e}return s||(s=document.implementation.createHTMLDocument("temp"),s.base=s.createElement("base"),s.head.appendChild(s.base),s.anchor=s.createElement("a"),s.body.appendChild(s.anchor)),s.base.href=t,s.anchor.href=e,s.anchor.href||e}function l(e,t){return e.replace(n,(function(e,i,r,s){return i+"'"+o(r.replace(/["']/g,""),t)+"'"+s}))}function c(e){return e.substring(0,e.lastIndexOf("/")+1)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.ShadyDOM,Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let d=c(document.baseURI||window.location.href);let p=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let h=!1;let u=!1;let _=!1;let f=!1;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let m=0;function y(){}y.prototype.__mixinApplications,y.prototype.__mixinSet;const g=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=m++;return function(r){let s=r.__mixinSet;if(s&&s[i])return r;let n=t,a=n.get(r);a||(a=e(r),n.set(r,a));let o=Object.create(a.__mixinSet||s||null);return o[i]=!0,a.__mixinSet=o,a}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let P={},v={};function b(e,t){P[e]=v[e.toLowerCase()]=t}function w(e){return P[e]||v[e.toLowerCase()]}class k extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=w(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,r){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=o(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=c(t)}return this.__assetpath}register(e){if(e=e||this.id){if(h&&void 0!==w(e))throw b(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,b(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}k.prototype.modules=P,customElements.define("dom-module",k);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const T="link[rel=import][type~=css]",O="include",C="shady-unscoped";function S(e){return k.import(e)}function E(e){const t=l((e.body?e.body:e).textContent,e.baseURI),i=document.createElement("style");return i.textContent=t,i}function x(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...N(t[e]));return i}function N(e){const t=S(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...I(t));const i=t.querySelector("template");i&&e.push(...A(i,t.assetpath)),t._styles=e}return t._styles}function A(e,t){if(!e._styles){const i=[],r=e.content.querySelectorAll("style");for(let e=0;e<r.length;e++){let s=r[e],n=s.getAttribute(O);n&&i.push(...x(n).filter((function(e,t,i){return i.indexOf(e)===t}))),t&&(s.textContent=l(s.textContent,t)),i.push(s)}e._styles=i}return e._styles}function I(e){const t=[],i=e.querySelectorAll(T);for(let e=0;e<i.length;e++){let r=i[e];if(r.import){const e=r.import,i=r.hasAttribute(C);if(i&&!e._unscopedStyle){const t=E(e);t.setAttribute(C,""),e._unscopedStyle=t}else e._style||(e._style=E(e));t.push(i?e._unscopedStyle:e._style)}}return t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const z=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function M(e){return e.indexOf(".")>=0}function D(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function R(e,t){return 0===e.indexOf(t+".")}function L(e,t){return 0===t.indexOf(e+".")}function H(e,t,i){return t+i.slice(e.length)}function j(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let r=e[i].toString().split(".");for(let e=0;e<r.length;e++)t.push(r[e])}return t.join(".")}return e}function F(e){return Array.isArray(e)?j(e).split("."):e.toString().split(".")}function $(e,t,i){let r=e,s=F(t);for(let e=0;e<s.length;e++){if(!r)return;r=r[s[e]]}return i&&(i.path=s.join(".")),r}function B(e,t,i){let r=e,s=F(t),n=s[s.length-1];if(s.length>1){for(let e=0;e<s.length-1;e++){if(r=r[s[e]],!r)return}r[n]=i}else r[t]=i;return s.join(".")}const V={},q=/-[a-z]/g,Y=/([A-Z])/g;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function J(e){return V[e]||(V[e]=e.indexOf("-")<0?e:e.replace(q,e=>e[1].toUpperCase()))}function U(e){return V[e]||(V[e]=e.replace(Y,"-$1").toLowerCase())}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let W=0,X=0,Z=[],G=0,K=document.createTextNode("");new window.MutationObserver((function(){const e=Z.length;for(let t=0;t<e;t++){let e=Z[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}Z.splice(0,e),X+=e})).observe(K,{characterData:!0});const Q={run:e=>(K.textContent=G++,Z.push(e),W++),cancel(e){const t=e-X;if(t>=0){if(!Z[t])throw new Error("invalid async handle: "+e);Z[t]=null}}},ee=g(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let r=this.__data[e],s=this._shouldPropertyChange(e,t,r);return s&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=r),this.__data[e]=t,this.__dataPending[e]=t),s}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,Q.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i))}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,r){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,r)}_attributeToProperty(e,t,i){if(!this.__serializing){const r=this.__dataAttributes,s=r&&r[e]||e;this[s]=this._deserializeValue(t,i||this.constructor.typeForProperty(s))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const r=this._serializeValue(t);"class"!==i&&"name"!==i&&"slot"!==i||(e=z(e)),void 0===r?e.removeAttribute(i):e.setAttribute(i,r)}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}}),te={};let ie=HTMLElement.prototype;for(;ie;){let e=Object.getOwnPropertyNames(ie);for(let t=0;t<e.length;t++)te[e[t]]=!0;ie=Object.getPrototypeOf(ie)}const re=g(e=>{const t=ee(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(J(e[t]))}static attributeNameForProperty(e){return U(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const i=this;i.hasAttribute(e)||this._valueToNodeAttribute(i,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!te[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}),se={"dom-if":!0,"dom-repeat":!0};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let ne=!1,ae=!1;function oe(e){(function(){if(!ne){ne=!0;const e=document.createElement("textarea");e.placeholder="a",ae=e.placeholder===e.textContent}return ae})()&&"textarea"===e.localName&&e.placeholder&&e.placeholder===e.textContent&&(e.textContent=null)}function le(e){let t=e.getAttribute("is");if(t&&se[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;)e.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return e}function ce(e,t){let i=t.parentInfo&&ce(e,t.parentInfo);if(!i)return e;for(let e=i.firstChild,r=0;e;e=e.nextSibling)if(t.parentIndex===r++)return e}function de(e,t,i,r){r.id&&(t[r.id]=i)}function pe(e,t,i){if(i.events&&i.events.length)for(let r,s=0,n=i.events;s<n.length&&(r=n[s]);s++)e._addMethodEventListenerToNode(t,r.name,r.value,e)}function he(e,t,i){i.templateInfo&&(t._templateInfo=i.templateInfo)}const ue=g(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let r=!1,s=e;return"template"!=s.localName||s.hasAttribute("preserve-content")?"slot"===s.localName&&(t.hasInsertionPoint=!0):r=this._parseTemplateNestedTemplate(s,t,i)||r,oe(s),s.firstChild&&this._parseTemplateChildNodes(s,t,i),s.hasAttributes&&s.hasAttributes()&&(r=this._parseTemplateNodeAttributes(s,t,i)||r),r}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName)for(let r,s=e.firstChild,n=0;s;s=r){if("template"==s.localName&&(s=le(s)),r=s.nextSibling,s.nodeType===Node.TEXT_NODE){let i=r;for(;i&&i.nodeType===Node.TEXT_NODE;)s.textContent+=i.textContent,r=i.nextSibling,e.removeChild(i),i=r;if(t.stripWhiteSpace&&!s.textContent.trim()){e.removeChild(s);continue}}let a={parentIndex:n,parentInfo:i};this._parseTemplateNode(s,t,a)&&(a.infoIndex=t.nodeInfoList.push(a)-1),s.parentNode&&n++}}static _parseTemplateNestedTemplate(e,t,i){let r=e,s=this._parseTemplate(r,t);return(s.content=r.content.ownerDocument.createDocumentFragment()).appendChild(r.content),i.templateInfo=s,!0}static _parseTemplateNodeAttributes(e,t,i){let r=!1,s=Array.from(e.attributes);for(let n,a=s.length-1;n=s[a];a--)r=this._parseTemplateNodeAttribute(e,t,i,n.name,n.value)||r;return r}static _parseTemplateNodeAttribute(e,t,i,r,s){return"on-"===r.slice(0,3)?(e.removeAttribute(r),i.events=i.events||[],i.events.push({name:r.slice(3),value:s}),!0):"id"===r&&(i.id=s,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),i=t.nodeInfoList,r=t.content||e.content,s=document.importNode(r,!0);s.__noInsertionPoint=!t.hasInsertionPoint;let n=s.nodeList=new Array(i.length);s.$={};for(let e,t=0,r=i.length;t<r&&(e=i[t]);t++){let i=n[t]=ce(s,e);de(0,s.$,i,e),he(0,i,e),pe(this,i,e)}return s=s,s}_addMethodEventListenerToNode(e,t,i,r){let s=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(r=r||e,0,i);return this._addEventListenerToNode(e,t,s),s}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */let _e=0;const fe={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},me=/[A-Z]/;function ye(e,t){let i=e[t];if(i){if(!e.hasOwnProperty(t)){i=e[t]=Object.create(e[t]);for(let e in i){let t=i[e],r=i[e]=Array(t.length);for(let e=0;e<t.length;e++)r[e]=t[e]}}}else i=e[t]={};return i}function ge(e,t,i,r,s,n){if(t){let a=!1,o=_e++;for(let l in i)Pe(e,t,o,l,i,r,s,n)&&(a=!0);return a}return!1}function Pe(e,t,i,r,s,n,a,o){let l=!1,c=t[a?D(r):r];if(c)for(let t,d=0,p=c.length;d<p&&(t=c[d]);d++)t.info&&t.info.lastRun===i||a&&!ve(r,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,r,s,n,t.info,a,o),l=!0);return l}function ve(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!R(i,e))||!(!t.wildcard||!L(i,e))}return!0}function be(e,t,i,r,s){let n="string"==typeof s.method?e[s.method]:s.method,a=s.property;n?n.call(e,e.__data[a],r[a]):s.dynamicFn||console.warn("observer method `"+s.method+"` not defined")}function we(e,t,i){let r=D(t);if(r!==t){return ke(e,U(r)+"-changed",i[t],t),!0}return!1}function ke(e,t,i,r){let s={value:i,queueProperty:!0};r&&(s.path=r),z(e).dispatchEvent(new CustomEvent(t,{detail:s}))}function Te(e,t,i,r,s,n){let a=(n?D(t):t)!=t?t:null,o=a?$(e,a):e.__data[t];a&&void 0===o&&(o=i[t]),ke(e,s.eventName,o,a)}function Oe(e,t,i,r,s){let n=e.__data[t];p&&(n=p(n,s.attrName,"attribute",e)),e._propertyToAttribute(t,s.attrName,n)}function Ce(e,t,i,r,s){let n=ze(e,t,i,r,s),a=s.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[a]?e._setPendingProperty(a,n,!0):e[a]=n}function Se(e,t,i,r,s,n,a){i.bindings=i.bindings||[];let o={kind:r,target:s,parts:n,literal:a,isCompound:1!==n.length};if(i.bindings.push(o),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(o)){let{event:e,negate:t}=o.parts[0];o.listenerEvent=e||U(s)+"-changed",o.listenerNegate=t}let l=t.nodeInfoList.length;for(let i=0;i<o.parts.length;i++){let r=o.parts[i];r.compoundIndex=i,Ee(e,t,o,r,l)}}function Ee(e,t,i,r,s){if(!r.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let n=r.dependencies,a={index:s,binding:i,part:r,evaluator:e};for(let i=0;i<n.length;i++){let r=n[i];"string"==typeof r&&(r=He(r),r.wildcard=!0),e._addTemplatePropertyEffect(t,r.rootProperty,{fn:xe,info:a,trigger:r})}}}function xe(e,t,i,r,s,n,a){let o=a[s.index],l=s.binding,c=s.part;if(n&&c.source&&t.length>c.source.length&&"property"==l.kind&&!l.isCompound&&o.__isPropertyEffectsClient&&o.__dataHasAccessor&&o.__dataHasAccessor[l.target]){let r=i[t];t=H(c.source,l.target,t),o._setPendingPropertyOrPath(t,r,!1,!0)&&e._enqueueClient(o)}else{!function(e,t,i,r,s){s=function(e,t,i,r){if(i.isCompound){let s=e.__dataCompoundStorage[i.target];s[r.compoundIndex]=t,t=s.join("")}"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,s,i,r),p&&(s=p(s,i.target,i.kind,t));if("attribute"==i.kind)e._valueToNodeAttribute(t,s,i.target);else{let r=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[r]?t[fe.READ_ONLY]&&t[fe.READ_ONLY][r]||t._setPendingProperty(r,s)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,r,s)}}(e,o,l,c,s.evaluator._evaluateBinding(e,c,t,i,r,n))}}function Ne(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),r=t.parts,s=new Array(r.length);for(let e=0;e<r.length;e++)s[e]=r[e].literal;let n=t.target;i[n]=s,t.literal&&"property"==t.kind&&("className"===n&&(e=z(e)),e[n]=t.literal)}}function Ae(e,t,i){if(i.listenerEvent){let r=i.parts[0];e.addEventListener(i.listenerEvent,(function(e){!function(e,t,i,r,s){let n,a=e.detail,o=a&&a.path;o?(r=H(i,r,o),n=a&&a.value):n=e.currentTarget[i],n=s?!n:n,t[fe.READ_ONLY]&&t[fe.READ_ONLY][r]||!t._setPendingPropertyOrPath(r,n,!0,Boolean(o))||a&&a.queueProperty||t._invalidateProperties()}(e,t,i.target,r.source,r.negate)}))}}function Ie(e,t,i,r,s,n){n=t.static||n&&("object"!=typeof n||n[t.methodName]);let a={methodName:t.methodName,args:t.args,methodInfo:s,dynamicFn:n};for(let s,n=0;n<t.args.length&&(s=t.args[n]);n++)s.literal||e._addPropertyEffect(s.rootProperty,i,{fn:r,info:a,trigger:s});n&&e._addPropertyEffect(t.methodName,i,{fn:r,info:a})}function ze(e,t,i,r,s){let n=e._methodHost||e,a=n[s.methodName];if(a){let r=e._marshalArgs(s.args,t,i);return a.apply(n,r)}s.dynamicFn||console.warn("method `"+s.methodName+"` not defined")}const Me=[],De=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function Re(e){let t="";for(let i=0;i<e.length;i++){t+=e[i].literal||""}return t}function Le(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:Me};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let i=He(e);return i.literal||(t.static=!1),i}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function He(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},r=t[0];switch("-"===r&&(r=t[1]),r>="0"&&r<="9"&&(r="#"),r){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=D(t),i.structured=M(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function je(e,t,i){let r=$(e,i);return void 0===r&&(r=t[i]),r}function Fe(e,t,i,r){e.notifyPath(i+".splices",{indexSplices:r}),e.notifyPath(i+".length",t.length)}function $e(e,t,i,r,s,n){Fe(e,t,i,[{index:r,addedCount:s,removed:n,object:t,type:"splice"}])}const Be=g(e=>{const t=ue(re(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return fe}_initializeProperties(){super._initializeProperties(),Ve.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[fe.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==fe.READ_ONLY);let r=ye(this,t)[e];r||(r=this[t][e]=[]),r.push(i)}_removePropertyEffect(e,t,i){let r=ye(this,t)[e],s=r.indexOf(i);s>=0&&r.splice(s,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,fe.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,fe.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,fe.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,fe.COMPUTE)}_setPendingPropertyOrPath(e,t,i,r){if(r||D(Array.isArray(e)?e[0]:e)!==e){if(!r){let i=$(this,e);if(!(e=B(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let r=e.__dataLinkedPaths;if(r){let s;for(let n in r){let a=r[n];L(n,t)?(s=H(n,a,t),e._setPendingPropertyOrPath(s,i,!0,!0)):L(a,t)&&(s=H(a,n,t),e._setPendingPropertyOrPath(s,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||("className"===t&&(e=z(e)),e[t]=i)}_setPendingProperty(e,t,i){let r=this.__dataHasPaths&&M(e),s=r?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,s[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),r?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(r||this[fe.NOTIFY]&&this[fe.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[fe.READ_ONLY]&&this[fe.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let r=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,i,r){let s=e[fe.COMPUTE];if(s){let n=t;for(;ge(e,s,n,i,r);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),n=e.__dataPending,e.__dataPending=null}}(this,t,i,r);let s=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,i,r),this._flushClients(),ge(this,this[fe.REFLECT],t,i,r),ge(this,this[fe.OBSERVE],t,i,r),s&&function(e,t,i,r,s){let n,a,o=e[fe.NOTIFY],l=_e++;for(let a in t)t[a]&&(o&&Pe(e,o,l,a,i,r,s)?n=!0:s&&we(e,a,i)&&(n=!0));n&&(a=e.__dataHost)&&a._invalidateProperties&&a._invalidateProperties()}(this,s,t,i,r),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[fe.PROPAGATE]&&ge(this,this[fe.PROPAGATE],e,t,i);let r=this.__templateInfo;for(;r;)ge(this,r.propertyEffects,e,t,i,r.nodeList),r=r.nextTemplateInfo}linkPaths(e,t){e=j(e),t=j(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=j(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};Fe(this,$(this,e,i),i.path,t)}get(e,t){return $(t||this,e)}set(e,t,i){i?B(i,e,t):this[fe.READ_ONLY]&&this[fe.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},r=$(this,e,i),s=r.length,n=r.push(...t);return t.length&&$e(this,r,i.path,s,t.length,[]),n}pop(e){let t={path:""},i=$(this,e,t),r=Boolean(i.length),s=i.pop();return r&&$e(this,i,t.path,i.length,0,[s]),s}splice(e,t,i,...r){let s,n={path:""},a=$(this,e,n);return t<0?t=a.length-Math.floor(-t):t&&(t=Math.floor(t)),s=2===arguments.length?a.splice(t):a.splice(t,i,...r),(r.length||s.length)&&$e(this,a,n.path,t,r.length,s),s}shift(e){let t={path:""},i=$(this,e,t),r=Boolean(i.length),s=i.shift();return r&&$e(this,i,t.path,0,0,[s]),s}unshift(e,...t){let i={path:""},r=$(this,e,i),s=r.unshift(...t);return t.length&&$e(this,r,i.path,0,t.length,[]),s}notifyPath(e,t){let i;if(1==arguments.length){let r={path:""};t=$(this,e,r),i=r.path}else i=Array.isArray(e)?j(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,fe.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let r={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,fe.OBSERVE,{fn:be,info:r,trigger:{name:e}}),i&&this._addPropertyEffect(t,fe.OBSERVE,{fn:be,info:r,trigger:{name:t}})}_createMethodObserver(e,t){let i=Le(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");Ie(this,i,fe.OBSERVE,ze,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,fe.NOTIFY,{fn:Te,info:{eventName:U(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,fe.REFLECT,{fn:Oe,info:{attrName:t}})}_createComputedProperty(e,t,i){let r=Le(t);if(!r)throw new Error("Malformed computed expression '"+t+"'");Ie(this,r,fe.COMPUTE,Ce,e,i)}_marshalArgs(e,t,i){const r=this.__data,s=[];for(let n=0,a=e.length;n<a;n++){let{name:a,structured:o,wildcard:l,value:c,literal:d}=e[n];if(!d)if(l){const e=L(a,t),s=je(r,i,e?t:a);c={path:e?t:a,value:s,base:e?$(r,a):s}}else c=o?je(r,i,a):r[a];s[n]=c}return s}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),r=this.__templateInfo==i;if(!r)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t&&(i=Object.create(i),i.wasPreBound=r,!r&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=i,i.previousTemplateInfo=e,i}return this.__templateInfo=i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let r=e.propertyEffects=e.propertyEffects||{};(r[t]=r[t]||[]).push(i)}_stampTemplate(e){Ve.beginHosting(this);let t=super._stampTemplate(e);Ve.endHosting(this);let i=this._bindTemplate(e,!0);if(i.nodeList=t.nodeList,!i.wasPreBound){let e=i.childNodes=[];for(let i=t.firstChild;i;i=i.nextSibling)e.push(i)}return t.templateInfo=i,function(e,t){let{nodeList:i,nodeInfoList:r}=t;if(r.length)for(let t=0;t<r.length;t++){let s=r[t],n=i[t],a=s.bindings;if(a)for(let t=0;t<a.length;t++){let i=a[t];Ne(n,i),Ae(n,e,i)}n.__dataHost=e}}(this,i),this.__dataReady&&ge(this,i.propertyEffects,this.__data,null,!1,i.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let i=t.childNodes;for(let e=0;e<i.length;e++){let t=i[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,i,r){let s=t._parseTemplateNode.call(this,e,i,r);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,i);t&&(e.textContent=Re(t)||" ",Se(this,i,r,"text","textContent",t),s=!0)}return s}static _parseTemplateNodeAttribute(e,i,r,s,n){let a=this._parseBindings(n,i);if(a){let t=s,n="property";me.test(s)?n="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),n="attribute");let o=Re(a);return o&&"attribute"==n&&("class"==s&&e.hasAttribute("class")&&(o+=" "+e.getAttribute(s)),e.setAttribute(s,o)),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===n&&(s=J(s)),Se(this,i,r,n,s,a,o),!0}return t._parseTemplateNodeAttribute.call(this,e,i,r,s,n)}static _parseTemplateNestedTemplate(e,i,r){let s=t._parseTemplateNestedTemplate.call(this,e,i,r),n=r.templateInfo.hostProps;for(let e in n){Se(this,i,r,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}])}return s}static _parseBindings(e,t){let i,r=[],s=0;for(;null!==(i=De.exec(e));){i.index>s&&r.push({literal:e.slice(s,i.index)});let n=i[1][0],a=Boolean(i[2]),o=i[3].trim(),l=!1,c="",d=-1;"{"==n&&(d=o.indexOf("::"))>0&&(c=o.substring(d+2),o=o.substring(0,d),l=!0);let p=Le(o),h=[];if(p){let{args:e,methodName:i}=p;for(let t=0;t<e.length;t++){let i=e[t];i.literal||h.push(i)}let r=t.dynamicFns;(r&&r[i]||p.static)&&(h.push(i),p.dynamicFn=!0)}else h.push(o);r.push({source:o,mode:n,negate:a,customEvent:l,signature:p,dependencies:h,event:c}),s=De.lastIndex}if(s&&s<e.length){let t=e.substring(s);t&&r.push({literal:t})}return r.length?r:null}static _evaluateBinding(e,t,i,r,s,n){let a;return a=t.signature?ze(e,i,r,0,t.signature):i!=t.source?$(e,t.source):n&&M(i)?$(e,i):e.__data[i],t.negate&&(a=!a),a}}});const Ve=new class{constructor(){this.stack=[]}registerHost(e){if(this.stack.length){this.stack[this.stack.length-1]._enqueueClient(e)}}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const qe=[];const Ye=g(e=>{const t=ee(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof s?t:null}function r(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function(e){const t={};for(let i in e){const r=e[i];t[i]="function"==typeof r?{type:r}:r}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class s extends t{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){e=this.prototype,qe.push(e);const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(e=>this.attributeNameForProperty(e)):[]}var e;return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=r(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,r(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return s}),Je="3.3.1",Ue=window.ShadyCSS&&window.ShadyCSS.cssBuild,We=g(e=>{const t=Ye(Be(e));function i(e,t,i,r){i.computed&&(i.readOnly=!0),i.computed&&(e._hasReadOnlyEffect(t)?console.warn(`Cannot redefine computed property '${t}'.`):e._createComputedProperty(t,i.computed,r)),i.readOnly&&!e._hasReadOnlyEffect(t)?e._createReadOnlyProperty(t,!i.computed):!1===i.readOnly&&e._hasReadOnlyEffect(t)&&console.warn(`Cannot make readOnly property '${t}' non-readOnly.`),i.reflectToAttribute&&!e._hasReflectEffect(t)?e._createReflectedProperty(t):!1===i.reflectToAttribute&&e._hasReflectEffect(t)&&console.warn(`Cannot make reflected property '${t}' non-reflected.`),i.notify&&!e._hasNotifyEffect(t)?e._createNotifyingProperty(t):!1===i.notify&&e._hasNotifyEffect(t)&&console.warn(`Cannot make notify property '${t}' non-notify.`),i.observer&&e._createPropertyObserver(t,i.observer,r[i.observer]),e._addPropertyToAttributeMap(t)}function r(e,t,i,r){if(!Ue){const s=t.content.querySelectorAll("style"),n=A(t),a=function(e){let t=S(e);return t?I(t):[]}(i),o=t.content.firstElementChild;for(let i=0;i<a.length;i++){let s=a[i];s.textContent=e._processStyleText(s.textContent,r),t.content.insertBefore(s,o)}let l=0;for(let t=0;t<n.length;t++){let i=n[t],a=s[l];a!==i?(i=i.cloneNode(!0),a.parentNode.insertBefore(i,a)):l++,i.textContent=e._processStyleText(i.textContent,r)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i)}return class extends t{static get polymerElementVersion(){return Je}static _finalizeClass(){t._finalizeClass.call(this);const e=((i=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",i))||(i.__ownObservers=i.hasOwnProperty(JSCompiler_renameProperty("observers",i))?i.observers:null),i.__ownObservers);var i;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):_||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let t in e)i(this.prototype,t,e[t],e)}static createObservers(e,t){const i=this.prototype;for(let r=0;r<e.length;r++)i._createMethodObserver(e[r],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!h||u)&&(t=k.import(e,"template"),h&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=c(e.url);else{const e=k.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=d,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let r=t[i];"value"in r&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=r)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return l(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const i=this.importPath;r(this,t,e,i?o(i):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=z(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e)),f&&window.ShadyDOM&&window.ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=o(this.importPath)),o(e,t)}static _parseTemplateContent(e,i,r){return i.dynamicFns=i.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,i,r)}static _addTemplatePropertyEffect(e,i,r){return!_||i in this._properties||console.warn(`Property '${i}' used in template but not declared in 'properties'; `+"attribute will not be observed."),t._addTemplatePropertyEffect.call(this,e,i,r)}}});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class Xe{constructor(e){this.value=e.toString()}toString(){return this.value}}function Ze(e){if(e instanceof Xe)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const Ge=function(e,...t){const i=document.createElement("template");return i.innerHTML=t.reduce((t,i,r)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof Xe)return Ze(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(i)+e[r+1],e[0]),i},Ke=We(HTMLElement);window.customElements.define("digit-cell",class extends Ke{static get template(){return Ge`
        <style>
            :host {
                display: block;
                --line-on: #00000088;
                --line-off: #00000005;
                --icon-size: 24px;
                --dec-vert-bump: 9px;
                --inc-vert-bump: -10px;
                --dec-horz-bump: 2px;
                --inc-horz-bump: -2px;
            }
            .lineOn {
                stroke: var(--line-on);
            }
            .lineOff {
                stroke: var(--line-off);
            }
            .absolutely {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }
            .inert {
                cursor: default;
                pointer-eventsx: none
            }
            .noSelect {
                user-select: none;
            }
            .iconSize {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
            }
            .incDecInvisible {
                display:none;
            }
            .incDecVisible {
                display: block;
                opacity: .20;
            }
            .bumpDecrement {
                position: relative;
                top: var(--dec-vert-bump);
                left: var(--dec-horz-bump);;
            }
            .bumpIncrement {
                position: relative;
                top: var(--inc-vert-bump);
                left: var(--inc-horz-bump);
            }
        </style>
        <div>
        <div class$="digitWidth bumpIncrement incDecInvisible [[incDecVisible(incrementDecrement)]]" on-click="increment"><iron-icon icon="arrow-drop-up" class="iconSize"></iron-icon></div>
        <div class="relatively inert noSelect" style="width: [[width]]px; height: [[height]]px;" on-click="getValue">
                <span class="svg digit">
                <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" class="q" viewBox="4 1 12.613149 22.785754" version="1.1" id="svg3751" sodipodi:docname="digit.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)">
                    <g id="digit" inkscape:label="">
                        <desc id="desc13879">digit</desc>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="top" d="M 15.798207,3.4043353 H 6.925759" style="fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[top(value)]]">
                        <desc id="desc13837">top</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="middle" d="M 14.845707,12.318198 H 5.9732587" style="fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[middle(value)]]">
                        <desc id="desc13841">middle</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="bottom" d="M 13.893207,21.232062 H 5.0207591" style="fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[bottom(value)]]">
                        <desc id="desc13845">bottom</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="upperright" d="m 14.845707,12.318198 0.9525,-8.9138627" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[upperright(value)]]">
                        <desc id="desc13835">upperright</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="upperleft" d="m 5.9732587,12.318198 0.9525,-8.913863" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[upperleft(value)]]">
                        <desc id="desc13839">upperleft</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="lowerright" d="m 13.893207,21.232061 0.9525,-8.913863" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[lowerright(value)]]">
                        <desc id="desc13843">lowerright</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="lowerleft" d="m 5.0207587,21.232061 0.9525,-8.913863" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[lowerleft(value)]]">
                        <desc id="desc13847">lowerleft</desc>
                        </path>
                    </g>
                </svg>
            </span>
          </div>
          <div class$="digitWidth bumpDecrement incDecInvisible [[incDecVisible(incrementDecrement)]]" on-click="decrement"><iron-icon icon="arrow-drop-down" class="iconSize"></iron-icon></div>
          </div>
        `}static get properties(){return{width:{type:String},height:{type:String},size:{type:String,observer:"_sizeChanged"},value:{type:Number},maxValue:{type:Number},incrementDecrement:{type:Boolean},clickEvent:{type:Boolean},direction:{type:Number}}}constructor(){super(),this.value=-1,this.maxValue=9,this.size=100,this.incrementDecrement=!1,this.clickEvent=!1,this.direction=0}incDecVisible(e){return e?"incDecVisible":""}upperright(e){var t="lineOff";switch(e){case 0:case 1:case 2:case 3:case 4:case 7:case 8:case 9:t="lineOn"}return t}upperleft(e){var t="lineOff";switch(e){case 0:case 4:case 5:case 6:case 8:case 9:t="lineOn"}return t}lowerleft(e){var t="lineOff";switch(e){case 0:case 2:case 6:case 8:t="lineOn"}return t}lowerright(e){var t="lineOff";switch(e){case 0:case 1:case 3:case 4:case 5:case 6:case 7:case 8:case 9:t="lineOn"}return t}top(e){var t="lineOff";switch(e){case 0:case 2:case 3:case 5:case 7:case 8:case 9:t="lineOn"}return t}middle(e){var t="lineOff";switch(e){case 2:case 3:case 4:case 5:case 6:case 8:case 9:t="lineOn"}return t}bottom(e){var t="lineOff";switch(e){case 0:case 2:case 3:case 5:case 6:case 8:t="lineOn"}return t}_sizeChanged(e,t){this.width=parseInt(.55*e),this.height=e;var i=parseInt(.55*e);this.updateStyles({"--icon-size":i+"px"});var r=parseInt(.15*e);this.updateStyles({"--inc-vert-bump":r+"px"}),r=-1*parseInt(.15*e),this.updateStyles({"--dec-vert-bump":r+"px"}),r=parseInt(.05*e),this.updateStyles({"--inc-horz-bump":r+"px"}),r=-1*parseInt(.05*e),this.updateStyles({"--dec-horz-bump":r+"px"})}increment(e){e.stopPropagation();var t=this.value;t===this.maxValue?t=0:t++,this.value=t,this.direction=1,this.fireEvent(t,1)}decrement(e){e.stopPropagation();var t=this.value;0===t?t=this.maxValue:t--,this.value=t,this.direction=-1,this.fireEvent(t,-1)}getValue(e){this.clickEvent&&(e.stopPropagation(),this.direction=0,this.dispatchEvent(new CustomEvent("click",{detail:{value:this.value}})))}fireEvent(e,t){this.dispatchEvent(new CustomEvent("changed",{detail:{value:e,direction:t}}))}});window.customElements.define("digital-time-piece",class extends Ke{static get template(){return Ge`
        <style>
            :host {
                display: block;
                --cell-margin: 0 2px 0 2px;
                --icon-size: 24px;
                --picker-label: 12px;
            }
            .absolutely {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }
            .inert {
                cursor: default;
                pointer-events: none
            }
            .active {
                cursor: pointer;
                pointer-events: all;
            }
            .noSelect {
                user-select: none;
            }
            .digital-clock { 
                display: flex; 
                flex-direction: row; 
                flex-wrap: wrap; 
                justify-content: space-evenly;
                align-items: center;
            }
            .clock-components { 
                display: flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: space-evenly;
                align-items: center;
            }
            .cellMargin {
                margin: var(--cell-margin)
            }
            .timePicker {
                border: 1px solid black;
                background-color: #cccccc;
                position: relative;
            }
            .timePickerLabels {
                position: relative;
                user-select: none;
            }
            .secondsVisible {
                display: ;
            }
            .secondsInvisible {
                display:none;
            }
            .pickerInvisible {
                display:none;
            }
            .pickerVisible {
                display: block;
            }
            .pickerTick {
                width: 1px;
                position: absolute;
                bottom: 0%;
                left: 50%;
                height: 100%;
                background-color: black;
                pointer-events: none;
            }
            .pickerLabel {
                pointer-events: none;
            }
            .tick100 {
                height: 100%
            }
            .tick75 {
                height: 75%
            }
            .tick50 {
                height: 50%
            }
            .tick25 {
                height: 25%
            }
            .pickerLabel {
                position: absolute;
                font-size: var(--picker-label);
                text-align: center;
            }
            .iconSize {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
            }
        </style>
        <div class="relatively clock-components">
            <div class="relatively active noSelect digital-clock" style="width: [[setWidth(width)]];" on-click="getCurrentTime">
                <digit-cell id="hourTens" class="cellMargin" size="[[size]]" value="0" max-value="2" on-changed="clickDigit"></digit-cell>
                <digit-cell id="hourOnes" class="cellMargin" size="[[size]]" value="0" max-value="9" on-changed="clickDigit"></digit-cell>
                <div class="cellMargin"style="font-size: [[size]]px;">:</div>
                <digit-cell id="minuteTens" class="cellMargin" size="[[size]]" value="0" max-value="5" on-changed="clickDigit"></digit-cell>
                <digit-cell id="minuteOnes" class="cellMargin" size="[[size]]" value="0" max-value="9" on-changed="clickDigit"></digit-cell>
                <div class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" style="font-size: [[size]]px;">:</div>
                <digit-cell id="secondTens" class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" size="[[size]]" value="0" max-value="5" on-changed="clickDigit"></digit-cell>
                <digit-cell id="secondOnes" class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" size="[[size]]" value="0" max-value="9" on-changed="clickDigit"></digit-cell>
                <div class$="pickerInvisible [[shouldShowPicker(timePicker)]] cellMargin" on-click="displayTimePicker"><iron-icon icon="schedule" class="iconSize"></div>
            </div>
            <div class="timePickerWrapper pickerInvisible" style="width: [[setPickerWidth(timePicker)]];">
                <div class="timePicker" style="width: [[setPickerWidth(timePicker)]]; height: [[setPickerHeight(width)]];" on-click="setCurrentTime">
                    <div class="pickerTick tick100" style="left: 50%;"></div>
                </div>
                <div id="timePickerLabels" class="timePickerLabels" style="width: [[setPickerWidth(timePicker)]]; height: [[setPickerHeight(width)]];" on-click="setCurrentTime">
                    <div class="pickerLabel" style="left: 50%; width: 4.166%;">XX</div>
                </div>
            </div>
        </div>
            `}static get properties(){return{size:{type:Number,observer:"_sizeChanged"},clockMode:{type:Boolean},autoStart:{type:Boolean},currentTime:{type:String,observer:"_currentTimeChanged"},elapsedTime:{type:Number,observer:"_elapsedTimeChanged"},clockTimer:{type:Number},clockSeconds:{type:Number,observer:"_dispatchSeconds"},clockMinutes:{type:Number,observer:"_dispatchMinutes"},clockHours:{type:Number,observer:"_dispatchHours"},isReady:{type:Boolean},width:{type:String},incrementDecrement:{type:Boolean},hideSeconds:{type:Boolean},timePicker:{type:Number},notificationInterval:{type:Number}}}constructor(){super(),this.size=50,this.reset(),this.optionalDisplayScale=1,this.clockMode=!0,this.clockSeconds=0,this.clockMinutes=0,this.clockHours=0,this.currentTime="",this.isReady=!1,this.width="",this.incrementDecrement=!1,this.hideSeconds=!1,this.timePicker=0,this.notificationInterval=1}ready(){super.ready(),this.isReady=!0,this.currentTime&&this._currentTimeChanged(this.currentTime),this.hasIncrementDecrement(this.incrementDecrement),this.autoStart&&this.start(),this.addTicks()}reset(){this.elapsedTime=0}shouldHideSeconds(e){return e?"secondsInvisible":""}displayTimePicker(e){e.stopPropagation();var t=this.shadowRoot.querySelector(".timePickerWrapper");t.classList.value.indexOf("pickerVisible")<0?t.classList.add("pickerVisible"):(t.classList.remove("pickerVisible"),this.currentTimeEvent())}addTicks(){if(this.timePicker&&this.shadowRoot){for(var e=this.shadowRoot.querySelector(".timePicker"),t=this.shadowRoot.querySelector(".timePickerLabels"),i=e.innerHTML,r=t.innerHTML,s="",n="",a=0;a<24;a++){var o=r,l=4.166*a;o=(o=r).replace("50",l),n+=o=a&&a%3==0?o.replace("XX",a):o.replace("XX","")}for(a=1;a<24;a++){var c=i,d=4.166*a,p="tick100";switch(a%6){case 0:p="tick75";break;case 1:case 2:case 4:case 5:p="tick25";break;case 3:p="tick50"}12!==a&&(c=(c=c.replace("50",d)).replace("tick100",p)),s+=c}e.innerHTML=s,t.innerHTML=n}}shouldShowPicker(e){return e?"pickerVisible":""}hasIncrementDecrement(e){this.shadowRoot.querySelectorAll("digit-cell").forEach((function(t){t.incrementDecrement=e}))}setWidth(e){return e?e+"px":""}setPickerHeight(e){return e?parseInt(e/6)+"px":""}setPickerWidth(e){return e?e+"px":""}start(){var e=this;e.clockTimer||(e.clockTimer=setInterval((function(){e.elapsedTime+=1e3}),1e3))}pause(){this.clockTimer&&(clearInterval(this.clockTimer),this.clockTimer=0)}_currentTimeChanged(e){var t="01/01/2000",i=new Date(Date.parse(t));if(this.isReady){if(e){t+=" "+e;var r=new Date(Date.parse(t));"Invalid Date"!==r.toString()&&(i=r)}this.clockSeconds=i.getSeconds(),this.clockMinutes=i.getMinutes(),this.clockHours=i.getHours()}}_elapsedTimeChanged(){if(this.clockTimer){var e=null;this.clockMode?(e=new Date,this.clockSeconds=e.getSeconds(),this.clockMinutes=e.getMinutes(),this.clockHours=e.getHours()):(e=new Date(this.elapsedTime),this.clockSeconds=e.getSeconds(),this.clockMinutes=e.getMinutes(),this.clockHours=e.getHours()-16),this.notificationInterval&&this.clockSeconds%this.notificationInterval==0&&this.dispatchEvent(new CustomEvent("updateTime",{detail:{rawDate:e,hours:e.getHours(),minutes:this.clockMinutes,seconds:this.clockSeconds}}))}}_dispatchHours(){var e=this.clockHours,t=parseInt(e/10),i=e%10;this.shadowRoot.querySelector("#hourTens").value=t,this.shadowRoot.querySelector("#hourOnes").value=i}_dispatchMinutes(){var e=this.clockMinutes,t=parseInt(e/10),i=e%10;this.shadowRoot.querySelector("#minuteTens").value=t,this.shadowRoot.querySelector("#minuteOnes").value=i}_dispatchSeconds(){var e=this.clockSeconds,t=parseInt(e/10),i=e%10;this.shadowRoot.querySelector("#secondTens").value=t,this.shadowRoot.querySelector("#secondOnes").value=i}cellMargin(e){var t=this.size/e;return parseInt(t)}_sizeChanged(e,t){var i=parseInt(.05*e);this.updateStyles({"--cell-margin":"0 "+i+"px 0 "+i+"px"}),this.updateStyles({"--icon-size":parseInt(.75*this.size)+"px"}),this.updateStyles({"--picker-label":parseInt(.375*this.size)+"px"})}clickDigit(e){var t=e.srcElement;switch(t.id){case"hourOnes":var i=this.shadowRoot.querySelector("#hourTens");t.direction>0&&t.value>3&&i.value>1?t.value=3:(0===t.value&&t.direction>0&&i.value<2&&i.value++,9===t.value&&t.direction<0&&i.value>0&&i.value--);break;case"minuteOnes":var r=this.shadowRoot.querySelector("#minuteTens");0===t.value&&t.direction>0&&r.value<5&&r.value++,9===t.value&&t.direction<0&&r.value>0&&r.value--;break;case"hourTens":if(t.value>1){var s=this.shadowRoot.querySelector("#hourOnes");s.value>3&&(s.value=0)}}this.currentTimeEvent()}setCurrentTime(e){e.stopPropagation();var t=e.srcElement,i=t.id,r=t.offsetWidth,s=e.offsetX,n=t.offsetHeight,a=e.offsetY,o=parseInt(24*s/r),l=0;if(!i&&a<n/2){var c=r/24,d=parseInt((s-o*c)/c*100);d>75?l=45:d>50?l=30:d>25&&(l=15)}this.clockSeconds=0,this.clockMinutes=l,this.clockHours=o,this.currentTimeEvent()}getCurrentTime(e){e.stopPropagation(),this.currentTimeEvent()}currentTimeEvent(){this.dispatchEvent(new CustomEvent("currentTime",{detail:{hour:this.clockHours,minute:this.clockMinutes,second:this.clockSeconds}}))}})}]);