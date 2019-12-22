!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const n=!(window.ShadyDOM&&window.ShadyDOM.inUse);let s,i;function o(e){s=(!e||!e.shimcssproperties)&&(n||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(i=window.ShadyCSS.cssBuild);const a=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?s=window.ShadyCSS.nativeCss:window.ShadyCSS?(o(window.ShadyCSS),window.ShadyCSS=void 0):o(window.WebComponents&&window.WebComponents.flags);const l=s;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class d{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function h(e){return function e(t,r){let n=r.substring(t.start,t.end-1);t.parsedCssText=t.cssText=n.trim();if(t.parent){let e=t.previous?t.previous.end:t.parent.start;n=(n=(n=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(n=r.substring(e,t.start-1))).replace(f.multipleSpaces," ")).substring(n.lastIndexOf(";")+1);let s=t.parsedSelector=t.selector=n.trim();t.atRule=0===s.indexOf(g),t.atRule?0===s.indexOf(y)?t.type=p.MEDIA_RULE:s.match(f.keyframesRule)&&(t.type=p.KEYFRAMES_RULE,t.keyframesName=t.selector.split(f.multipleSpaces).pop()):0===s.indexOf(m)?t.type=p.MIXIN_RULE:t.type=p.STYLE_RULE}let s=t.rules;if(s)for(let t,n=0,i=s.length;n<i&&(t=s[n]);n++)e(t,r);return t}(function(e){let t=new d;t.start=0,t.end=e.length;let r=t;for(let n=0,s=e.length;n<s;n++)if(e[n]===u){r.rules||(r.rules=[]);let e=r,t=e.rules[e.rules.length-1]||null;(r=new d).start=n+1,r.parent=e,r.previous=t,e.rules.push(r)}else e[n]===_&&(r.end=n+1,r=r.parent||t);return t}(e=e.replace(f.comments,"").replace(f.port,"")),e)}function c(e,t,r=""){let n="";if(e.cssText||e.rules){let r=e.rules;if(r&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(m)}(r))for(let e,s=0,i=r.length;s<i&&(e=r[s]);s++)n=c(e,t,n);else(n=(n=t?e.cssText:function(e){return function(e){return e.replace(f.mixinApply,"").replace(f.varApply,"")}(e=function(e){return e.replace(f.customProp,"").replace(f.mixinProp,"")}(e))}(e.cssText)).trim())&&(n="  "+n+"\n")}return n&&(e.selector&&(r+=e.selector+" "+u+"\n"),r+=n,e.selector&&(r+=_+"\n\n")),r}const p={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},u="{",_="}",f={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},m="--",y="@media",g="@",b=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,v=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,w=/@media\s(.*)/,C=new Set,P="shady-unscoped";function S(e){const t=e.textContent;if(!C.has(t)){C.add(t);const r=e.cloneNode(!0);document.head.appendChild(r)}}function x(e){return e.hasAttribute(P)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function E(e,t){return e?("string"==typeof e&&(e=h(e)),t&&T(e,t),c(e,l)):""}function O(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=h(e.textContent)),e.__cssRules||null}function T(e,t,r,n){if(!e)return;let s=!1,i=e.type;if(n&&i===p.MEDIA_RULE){let t=e.selector.match(w);t&&(window.matchMedia(t[1]).matches||(s=!0))}i===p.STYLE_RULE?t(e):r&&i===p.KEYFRAMES_RULE?r(e):i===p.MIXIN_RULE&&(s=!0);let o=e.rules;if(o&&!s)for(let e,s=0,i=o.length;s<i&&(e=o[s]);s++)T(e,t,r,n)}function D(e,t){let r=0;for(let n=t,s=e.length;n<s;n++)if("("===e[n])r++;else if(")"===e[n]&&0==--r)return n;return-1}window.ShadyDOM&&window.ShadyDOM.wrap;const N="css-build";function M(e){if(void 0!==i)return i;if(void 0===e.__cssBuild){const t=e.getAttribute(N);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===N)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/(e),e.__cssBuild=t}}return e.__cssBuild||""}function A(e){return""!==M(e)}function k(e,t){for(let r in t)null===r?e.style.removeProperty(r):e.style.setProperty(r,t[r])}function I(e,t){const r=window.getComputedStyle(e).getPropertyValue(t);return r?r.trim():""}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const L=/;\s*/m,R=/^\s*(initial)|(inherit)\s*$/,F=/\s*!important/,H="_-_";class z{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let $=null;class j{constructor(){this._currentElement=null,this._measureElement=null,this._map=new z}detectMixin(e){return function(e){const t=v.test(e)||b.test(e);return v.lastIndex=0,b.lastIndex=0,t}(e)}gatherStyles(e){const t=function(e){const t=[],r=e.querySelectorAll("style");for(let e=0;e<r.length;e++){const s=r[e];x(s)?n||(S(s),s.parentNode.removeChild(s)):(t.push(s.textContent),s.parentNode.removeChild(s))}return t.join("").trim()}(e.content);if(t){const r=document.createElement("style");return r.textContent=t,e.content.insertBefore(r,e.content.firstChild),r}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const r=e._gatheredStyle;return r?this.transformStyle(r,t):null}transformStyle(e,t=""){let r=O(e);return this.transformRules(r,t),e.textContent=E(r),r}transformCustomStyle(e){let t=O(e);return T(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=E(t),t}transformRules(e,t){this._currentElement=t,T(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(b,(e,r,n,s)=>this._produceCssProperties(e,r,n,s,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const r={};let n=!1;return T(t,t=>{(n=n||t===e)||t.selector===e.selector&&Object.assign(r,this._cssTextToMap(t.parsedCssText))}),r}_consumeCssProperties(e,t){let r=null;for(;r=v.exec(e);){let n=r[0],s=r[1],i=r.index,o=i+n.indexOf("@apply"),a=i+n.length,l=e.slice(0,o),d=e.slice(a),h=t?this._fallbacksFromPreviousRules(t):{};Object.assign(h,this._cssTextToMap(l));let c=this._atApplyToCssProperties(s,h);e=`${l}${c}${d}`,v.lastIndex=i+c.length}return e}_atApplyToCssProperties(e,t){e=e.replace(L,"");let r=[],n=this._map.get(e);if(n||(this._map.set(e,{}),n=this._map.get(e)),n){let s,i,o;this._currentElement&&(n.dependants[this._currentElement]=!0);const a=n.properties;for(s in a)o=t&&t[s],i=[s,": var(",e,H,s],o&&i.push(",",o.replace(F,"")),i.push(")"),F.test(a[s])&&i.push(" !important"),r.push(i.join(""))}return r.join("; ")}_replaceInitialOrInherit(e,t){let r=R.exec(t);return r&&(t=r[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let r,n,s=e.split(";"),i={};for(let e,o,a=0;a<s.length;a++)(e=s[a])&&(o=e.split(":")).length>1&&(r=o[0].trim(),n=o.slice(1).join(":"),t&&(n=this._replaceInitialOrInherit(r,n)),i[r]=n);return i}_invalidateMixinEntry(e){if($)for(let t in e.dependants)t!==this._currentElement&&$(t)}_produceCssProperties(e,t,r,n,s){if(r&&function e(t,r){let n=t.indexOf("var(");if(-1===n)return r(t,"","","");let s=D(t,n+3),i=t.substring(n+4,s),o=t.substring(0,n),a=e(t.substring(s+1),r),l=i.indexOf(",");return-1===l?r(o,i.trim(),"",a):r(o,i.substring(0,l).trim(),i.substring(l+1).trim(),a)}(r,(e,t)=>{t&&this._map.get(t)&&(n=`@apply ${t};`)}),!n)return e;let i=this._consumeCssProperties(""+n,s),o=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(i,!0),l=a,d=this._map.get(t),h=d&&d.properties;h?l=Object.assign(Object.create(h),a):this._map.set(t,l);let c,p,u=[],_=!1;for(c in l)void 0===(p=a[c])&&(p="initial"),!h||c in h||(_=!0),u.push(`${t}${H}${c}: ${p}`);return _&&this._invalidateMixinEntry(d),d&&(d.properties=l),r&&(o=`${e};${o}`),`${o}${u.join("; ")};`}}j.prototype.detectMixin=j.prototype.detectMixin,j.prototype.transformStyle=j.prototype.transformStyle,j.prototype.transformCustomStyle=j.prototype.transformCustomStyle,j.prototype.transformRules=j.prototype.transformRules,j.prototype.transformRule=j.prototype.transformRule,j.prototype.transformTemplate=j.prototype.transformTemplate,j.prototype._separator=H,Object.defineProperty(j.prototype,"invalidCallback",{get:()=>$,set(e){$=e}});var q=j;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var B={};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Y="_applyShimCurrentVersion",U="_applyShimNextVersion",J="_applyShimValidatingVersion",V=Promise.resolve();function X(e){let t=B[e];t&&function(e){e[Y]=e[Y]||0,e[J]=e[J]||0,e[U]=(e[U]||0)+1}(t)}function W(e){return e[Y]===e[U]}function G(e){return!W(e)&&e[J]===e[U]}function Z(e){e[J]=e[U],e._validating||(e._validating=!0,V.then((function(){e[Y]=e[U],e._validating=!1})))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let K,Q=null,ee=window.HTMLImports&&window.HTMLImports.whenReady||null;function te(e){requestAnimationFrame((function(){ee?ee(e):(Q||(Q=new Promise(e=>{K=e}),"complete"===document.readyState?K():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&K()})),Q.then((function(){e&&e()})))}))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const re="__seenByShadyCSS",ne="__shadyCSSCachedStyle";let se=null,ie=null;class oe{constructor(){this.customStyles=[],this.enqueued=!1,te(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&ie&&(this.enqueued=!0,te(ie))}addCustomStyle(e){e[re]||(e[re]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[ne])return e[ne];let t;return t=e.getStyle?e.getStyle():e}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const r=e[t];if(r[ne])continue;const n=this.getStyleForCustomStyle(r);if(n){const e=n.__appliedElement||n;se&&se(e),r[ne]=e}}return e}}oe.prototype.addCustomStyle=oe.prototype.addCustomStyle,oe.prototype.getStyleForCustomStyle=oe.prototype.getStyleForCustomStyle,oe.prototype.processStyles=oe.prototype.processStyles,Object.defineProperties(oe.prototype,{transformCallback:{get:()=>se,set(e){se=e}},validateCallback:{get:()=>ie,set(e){let t=!1;ie||(t=!0),ie=e,t&&this.enqueueDocumentValidation()}}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const ae=new q;class le{constructor(){this.customStyleInterface=null,ae.invalidCallback=X}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{ae.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})})}prepareTemplate(e,t){if(this.ensure(),A(e))return;B[t]=e;let r=ae.transformTemplate(e,t);e._styleAst=r}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let r=e[t],n=this.customStyleInterface.getStyleForCustomStyle(r);n&&ae.transformCustomStyle(n)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&k(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,r="",n="";return t?t.indexOf("-")>-1?r=t:(n=t,r=e.getAttribute&&e.getAttribute("is")||""):(r=e.is,n=e.extends),{is:r,typeExtension:n}}(e),r=B[t];if((!r||!A(r))&&r&&!W(r)){G(r)||(this.prepareTemplate(r,t),Z(r));let n=e.shadowRoot;if(n){let e=n.querySelector("style");e&&(e.__cssRules=r._styleAst,e.textContent=E(r._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new le;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,r,n){e.flushCustomStyles(),e.prepareTemplate(t,r)},prepareTemplateStyles(e,t,r){window.ShadyCSS.prepareTemplate(e,t,r)},prepareTemplateDom(e,t){},styleSubtree(t,r){e.flushCustomStyles(),e.styleSubtree(t,r)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>I(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:l,nativeShadow:n,cssBuild:i,disableRuntime:a},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=ae,
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
let de,he,ce=/(url\()([^)]*)(\))/g,pe=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function ue(e,t){if(e&&pe.test(e))return e;if("//"===e)return e;if(void 0===de){de=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",de="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),de)try{return new URL(e,t).href}catch(t){return e}return he||((he=document.implementation.createHTMLDocument("temp")).base=he.createElement("base"),he.head.appendChild(he.base),he.anchor=he.createElement("a"),he.body.appendChild(he.anchor)),he.base.href=t,he.anchor.href=e,he.anchor.href||e}function _e(e,t){return e.replace(ce,(function(e,r,n,s){return r+"'"+ue(n.replace(/["']/g,""),t)+"'"+s}))}function fe(e){return e.substring(0,e.lastIndexOf("/")+1)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const me=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let ye=fe(document.baseURI||window.location.href);let ge=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let be=!1;let ve=!1;let we=!1;let Ce=!1;let Pe=!1;let Se=!0;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let xe=0;function Ee(){}Ee.prototype.__mixinApplications,Ee.prototype.__mixinSet;const Oe=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let r=xe++;return function(n){let s=n.__mixinSet;if(s&&s[r])return n;let i=t,o=i.get(n);o||(o=e(n),i.set(n,o));let a=Object.create(o.__mixinSet||s||null);return a[r]=!0,o.__mixinSet=a,o}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let Te={},De={};function Ne(e,t){Te[e]=De[e.toLowerCase()]=t}function Me(e){return Te[e]||De[e.toLowerCase()]}class Ae extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let r=Me(e);return r&&t?r.querySelector(t):r}return null}attributeChangedCallback(e,t,r,n){t!==r&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=ue(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=fe(t)}return this.__assetpath}register(e){if(e=e||this.id){if(ve&&void 0!==Me(e))throw Ne(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,Ne(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}Ae.prototype.modules=Te,customElements.define("dom-module",Ae);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const ke="link[rel=import][type~=css]",Ie="include",Le="shady-unscoped";function Re(e){return Ae.import(e)}function Fe(e){const t=_e((e.body?e.body:e).textContent,e.baseURI),r=document.createElement("style");return r.textContent=t,r}function He(e){const t=e.trim().split(/\s+/),r=[];for(let e=0;e<t.length;e++)r.push(...ze(t[e]));return r}function ze(e){const t=Re(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...je(t));const r=t.querySelector("template");r&&e.push(...$e(r,t.assetpath)),t._styles=e}return t._styles}function $e(e,t){if(!e._styles){const r=[],n=e.content.querySelectorAll("style");for(let e=0;e<n.length;e++){let s=n[e],i=s.getAttribute(Ie);i&&r.push(...He(i).filter((function(e,t,r){return r.indexOf(e)===t}))),t&&(s.textContent=_e(s.textContent,t)),r.push(s)}e._styles=r}return e._styles}function je(e){const t=[],r=e.querySelectorAll(ke);for(let e=0;e<r.length;e++){let n=r[e];if(n.import){const e=n.import,r=n.hasAttribute(Le);if(r&&!e._unscopedStyle){const t=Fe(e);t.setAttribute(Le,""),e._unscopedStyle=t}else e._style||(e._style=Fe(e));t.push(r?e._unscopedStyle:e._style)}}return t}function qe(e){let t=Re(e);if(t&&void 0===t._cssText){let e=Be(t),r=t.querySelector("template");r&&(e+=function(e,t){let r="";const n=$e(e,t);for(let e=0;e<n.length;e++){let t=n[e];t.parentNode&&t.parentNode.removeChild(t),r+=t.textContent}return r}(r,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}function Be(e){let t="",r=je(e);for(let e=0;e<r.length;e++)t+=r[e].textContent;return t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Ye=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Ue(e){return e.indexOf(".")>=0}function Je(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function Ve(e,t){return 0===e.indexOf(t+".")}function Xe(e,t){return 0===t.indexOf(e+".")}function We(e,t,r){return t+r.slice(e.length)}function Ge(e){if(Array.isArray(e)){let t=[];for(let r=0;r<e.length;r++){let n=e[r].toString().split(".");for(let e=0;e<n.length;e++)t.push(n[e])}return t.join(".")}return e}function Ze(e){return Array.isArray(e)?Ge(e).split("."):e.toString().split(".")}function Ke(e,t,r){let n=e,s=Ze(t);for(let e=0;e<s.length;e++){if(!n)return;n=n[s[e]]}return r&&(r.path=s.join(".")),n}function Qe(e,t,r){let n=e,s=Ze(t),i=s[s.length-1];if(s.length>1){for(let e=0;e<s.length-1;e++){if(!(n=n[s[e]]))return}n[i]=r}else n[t]=r;return s.join(".")}const et={},tt=/-[a-z]/g,rt=/([A-Z])/g;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function nt(e){return et[e]||(et[e]=e.indexOf("-")<0?e:e.replace(tt,e=>e[1].toUpperCase()))}function st(e){return et[e]||(et[e]=e.replace(rt,"-$1").toLowerCase())}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let it=0,ot=0,at=[],lt=0,dt=document.createTextNode("");new window.MutationObserver((function(){const e=at.length;for(let t=0;t<e;t++){let e=at[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}at.splice(0,e),ot+=e})).observe(dt,{characterData:!0});const ht={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},ct={run:e=>(dt.textContent=lt++,at.push(e),it++),cancel(e){const t=e-ot;if(t>=0){if(!at[t])throw new Error("invalid async handle: "+e);at[t]=null}}},pt=ct,ut=Oe(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let r in e)r in t||t._createPropertyAccessor(r)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,r){let n=this.__data[e],s=this._shouldPropertyChange(e,t,n);return s&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=n),this.__data[e]=t,this.__dataPending[e]=t),s}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,pt.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,r=this.__dataOld;this._shouldPropertiesChange(e,t,r)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,r))}_shouldPropertiesChange(e,t,r){return Boolean(t)}_propertiesChanged(e,t,r){}_shouldPropertyChange(e,t,r){return r!==t&&(r==r||t==t)}attributeChangedCallback(e,t,r,n){t!==r&&this._attributeToProperty(e,r),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,r,n)}_attributeToProperty(e,t,r){if(!this.__serializing){const n=this.__dataAttributes,s=n&&n[e]||e;this[s]=this._deserializeValue(t,r||this.constructor.typeForProperty(s))}}_propertyToAttribute(e,t,r){this.__serializing=!0,r=arguments.length<3?this[e]:r,this._valueToNodeAttribute(this,r,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,r){const n=this._serializeValue(t);"class"!==r&&"name"!==r&&"slot"!==r||(e=Ye(e)),void 0===n?e.removeAttribute(r):e.setAttribute(r,n)}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}}),_t={};let ft=HTMLElement.prototype;for(;ft;){let e=Object.getOwnPropertyNames(ft);for(let t=0;t<e.length;t++)_t[e[t]]=!0;ft=Object.getPrototypeOf(ft)}const mt=Oe(e=>{const t=ut(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(nt(e[t]))}static attributeNameForProperty(e){return st(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const r=this;r.hasAttribute(e)||this._valueToNodeAttribute(r,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let r;switch(t){case Object:try{r=JSON.parse(e)}catch(t){r=e}break;case Array:try{r=JSON.parse(e)}catch(t){r=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:r=isNaN(e)?String(e):Number(e),r=new Date(r);break;default:r=super._deserializeValue(e,t)}return r}_definePropertyAccessor(e,t){!function(e,t){if(!_t[t]){let r=e[t];void 0!==r&&(e.__data?e._setPendingProperty(t,r):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=r))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}),yt={"dom-if":!0,"dom-repeat":!0};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function gt(e){let t=e.getAttribute("is");if(t&&yt[t]){let r=e;for(r.removeAttribute("is"),e=r.ownerDocument.createElement(t),r.parentNode.replaceChild(e,r),e.appendChild(r);r.attributes.length;)e.setAttribute(r.attributes[0].name,r.attributes[0].value),r.removeAttribute(r.attributes[0].name)}return e}function bt(e,t){let r=t.parentInfo&&bt(e,t.parentInfo);if(!r)return e;for(let e=r.firstChild,n=0;e;e=e.nextSibling)if(t.parentIndex===n++)return e}function vt(e,t,r,n){n.id&&(t[n.id]=r)}function wt(e,t,r){if(r.events&&r.events.length)for(let n,s=0,i=r.events;s<i.length&&(n=i[s]);s++)e._addMethodEventListenerToNode(t,n.name,n.value,e)}function Ct(e,t,r){r.templateInfo&&(t._templateInfo=r.templateInfo)}const Pt=Oe(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let r=e._templateInfo={};r.nodeInfoList=[],r.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,r,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,r){return this._parseTemplateNode(e.content,t,r)}static _parseTemplateNode(e,t,r){let n=!1,s=e;return"template"!=s.localName||s.hasAttribute("preserve-content")?"slot"===s.localName&&(t.hasInsertionPoint=!0):n=this._parseTemplateNestedTemplate(s,t,r)||n,s.firstChild&&this._parseTemplateChildNodes(s,t,r),s.hasAttributes&&s.hasAttributes()&&(n=this._parseTemplateNodeAttributes(s,t,r)||n),n}static _parseTemplateChildNodes(e,t,r){if("script"!==e.localName&&"style"!==e.localName)for(let n,s=e.firstChild,i=0;s;s=n){if("template"==s.localName&&(s=gt(s)),n=s.nextSibling,s.nodeType===Node.TEXT_NODE){let r=n;for(;r&&r.nodeType===Node.TEXT_NODE;)s.textContent+=r.textContent,n=r.nextSibling,e.removeChild(r),r=n;if(t.stripWhiteSpace&&!s.textContent.trim()){e.removeChild(s);continue}}let o={parentIndex:i,parentInfo:r};this._parseTemplateNode(s,t,o)&&(o.infoIndex=t.nodeInfoList.push(o)-1),s.parentNode&&i++}}static _parseTemplateNestedTemplate(e,t,r){let n=e,s=this._parseTemplate(n,t);return(s.content=n.content.ownerDocument.createDocumentFragment()).appendChild(n.content),r.templateInfo=s,!0}static _parseTemplateNodeAttributes(e,t,r){let n=!1,s=Array.from(e.attributes);for(let i,o=s.length-1;i=s[o];o--)n=this._parseTemplateNodeAttribute(e,t,r,i.name,i.value)||n;return n}static _parseTemplateNodeAttribute(e,t,r,n,s){return"on-"===n.slice(0,3)?(e.removeAttribute(n),r.events=r.events||[],r.events.push({name:n.slice(3),value:s}),!0):"id"===n&&(r.id=s,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),r=t.nodeInfoList,n=t.content||e.content,s=document.importNode(n,!0);s.__noInsertionPoint=!t.hasInsertionPoint;let i=s.nodeList=new Array(r.length);s.$={};for(let e,t=0,n=r.length;t<n&&(e=r[t]);t++){let r=i[t]=bt(s,e);vt(0,s.$,r,e),Ct(0,r,e),wt(this,r,e)}return s=s}_addMethodEventListenerToNode(e,t,r,n){let s=function(e,t,r){return e=e._methodHost||e,function(t){e[r]?e[r](t,t.detail):console.warn("listener method `"+r+"` not defined")}}(n=n||e,0,r);return this._addEventListenerToNode(e,t,s),s}_addEventListenerToNode(e,t,r){e.addEventListener(t,r)}_removeEventListenerFromNode(e,t,r){e.removeEventListener(t,r)}}});
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
 */let St=0;const xt={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},Et=/[A-Z]/;function Ot(e,t){let r=e[t];if(r){if(!e.hasOwnProperty(t)){r=e[t]=Object.create(e[t]);for(let e in r){let t=r[e],n=r[e]=Array(t.length);for(let e=0;e<t.length;e++)n[e]=t[e]}}}else r=e[t]={};return r}function Tt(e,t,r,n,s,i){if(t){let o=!1,a=St++;for(let l in r)Dt(e,t,a,l,r,n,s,i)&&(o=!0);return o}return!1}function Dt(e,t,r,n,s,i,o,a){let l=!1,d=t[o?Je(n):n];if(d)for(let t,h=0,c=d.length;h<c&&(t=d[h]);h++)t.info&&t.info.lastRun===r||o&&!Nt(n,t.trigger)||(t.info&&(t.info.lastRun=r),t.fn(e,n,s,i,t.info,o,a),l=!0);return l}function Nt(e,t){if(t){let r=t.name;return r==e||!(!t.structured||!Ve(r,e))||!(!t.wildcard||!Xe(r,e))}return!0}function Mt(e,t,r,n,s){let i="string"==typeof s.method?e[s.method]:s.method,o=s.property;i?i.call(e,e.__data[o],n[o]):s.dynamicFn||console.warn("observer method `"+s.method+"` not defined")}function At(e,t,r){let n=Je(t);if(n!==t){return kt(e,st(n)+"-changed",r[t],t),!0}return!1}function kt(e,t,r,n){let s={value:r,queueProperty:!0};n&&(s.path=n),Ye(e).dispatchEvent(new CustomEvent(t,{detail:s}))}function It(e,t,r,n,s,i){let o=(i?Je(t):t)!=t?t:null,a=o?Ke(e,o):e.__data[t];o&&void 0===a&&(a=r[t]),kt(e,s.eventName,a,o)}function Lt(e,t,r,n,s){let i=e.__data[t];ge&&(i=ge(i,s.attrName,"attribute",e)),e._propertyToAttribute(t,s.attrName,i)}function Rt(e,t,r,n,s){let i=Bt(e,t,r,n,s),o=s.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[o]?e._setPendingProperty(o,i,!0):e[o]=i}function Ft(e,t,r,n,s,i,o){r.bindings=r.bindings||[];let a={kind:n,target:s,parts:i,literal:o,isCompound:1!==i.length};if(r.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||st(s)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let r=0;r<a.parts.length;r++){let n=a.parts[r];n.compoundIndex=r,Ht(e,t,a,n,l)}}function Ht(e,t,r,n,s){if(!n.literal)if("attribute"===r.kind&&"-"===r.target[0])console.warn("Cannot set attribute "+r.target+' because "-" is not a valid attribute starting character');else{let i=n.dependencies,o={index:s,binding:r,part:n,evaluator:e};for(let r=0;r<i.length;r++){let n=i[r];"string"==typeof n&&((n=Xt(n)).wildcard=!0),e._addTemplatePropertyEffect(t,n.rootProperty,{fn:zt,info:o,trigger:n})}}}function zt(e,t,r,n,s,i,o){let a=o[s.index],l=s.binding,d=s.part;if(i&&d.source&&t.length>d.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let n=r[t];t=We(d.source,l.target,t),a._setPendingPropertyOrPath(t,n,!1,!0)&&e._enqueueClient(a)}else{!function(e,t,r,n,s){s=function(e,t,r,n){if(r.isCompound){let s=e.__dataCompoundStorage[r.target];s[n.compoundIndex]=t,t=s.join("")}"attribute"!==r.kind&&("textContent"!==r.target&&("value"!==r.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,s,r,n),ge&&(s=ge(s,r.target,r.kind,t));if("attribute"==r.kind)e._valueToNodeAttribute(t,s,r.target);else{let n=r.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[n]?t[xt.READ_ONLY]&&t[xt.READ_ONLY][n]||t._setPendingProperty(n,s)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,n,s)}}(e,a,l,d,s.evaluator._evaluateBinding(e,d,t,r,n,i))}}function $t(e,t){if(t.isCompound){let r=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),n=t.parts,s=new Array(n.length);for(let e=0;e<n.length;e++)s[e]=n[e].literal;let i=t.target;r[i]=s,t.literal&&"property"==t.kind&&("className"===i&&(e=Ye(e)),e[i]=t.literal)}}function jt(e,t,r){if(r.listenerEvent){let n=r.parts[0];e.addEventListener(r.listenerEvent,(function(e){!function(e,t,r,n,s){let i,o=e.detail,a=o&&o.path;a?(n=We(r,n,a),i=o&&o.value):i=e.currentTarget[r],i=s?!i:i,t[xt.READ_ONLY]&&t[xt.READ_ONLY][n]||!t._setPendingPropertyOrPath(n,i,!0,Boolean(a))||o&&o.queueProperty||t._invalidateProperties()}(e,t,r.target,n.source,n.negate)}))}}function qt(e,t,r,n,s,i){i=t.static||i&&("object"!=typeof i||i[t.methodName]);let o={methodName:t.methodName,args:t.args,methodInfo:s,dynamicFn:i};for(let s,i=0;i<t.args.length&&(s=t.args[i]);i++)s.literal||e._addPropertyEffect(s.rootProperty,r,{fn:n,info:o,trigger:s});i&&e._addPropertyEffect(t.methodName,r,{fn:n,info:o})}function Bt(e,t,r,n,s){let i=e._methodHost||e,o=i[s.methodName];if(o){let n=e._marshalArgs(s.args,t,r);return o.apply(i,n)}s.dynamicFn||console.warn("method `"+s.methodName+"` not defined")}const Yt=[],Ut=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function Jt(e){let t="";for(let r=0;r<e.length;r++){t+=e[r].literal||""}return t}function Vt(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:Yt};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let r=Xt(e);return r.literal||(t.static=!1),r}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function Xt(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),r={name:t,value:"",literal:!1},n=t[0];switch("-"===n&&(n=t[1]),n>="0"&&n<="9"&&(n="#"),n){case"'":case'"':r.value=t.slice(1,-1),r.literal=!0;break;case"#":r.value=Number(t),r.literal=!0}return r.literal||(r.rootProperty=Je(t),r.structured=Ue(t),r.structured&&(r.wildcard=".*"==t.slice(-2),r.wildcard&&(r.name=t.slice(0,-2)))),r}function Wt(e,t,r){let n=Ke(e,r);return void 0===n&&(n=t[r]),n}function Gt(e,t,r,n){e.notifyPath(r+".splices",{indexSplices:n}),e.notifyPath(r+".length",t.length)}function Zt(e,t,r,n,s,i){Gt(e,t,r,[{index:n,addedCount:s,removed:i,object:t,type:"splice"}])}const Kt=Oe(e=>{const t=Pt(mt(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return xt}_initializeProperties(){super._initializeProperties(),Qt.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[xt.READ_ONLY];for(let r in e)t&&t[r]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[r]=this.__dataPending[r]=e[r])}_addPropertyEffect(e,t,r){this._createPropertyAccessor(e,t==xt.READ_ONLY);let n=Ot(this,t)[e];n||(n=this[t][e]=[]),n.push(r)}_removePropertyEffect(e,t,r){let n=Ot(this,t)[e],s=n.indexOf(r);s>=0&&n.splice(s,1)}_hasPropertyEffect(e,t){let r=this[t];return Boolean(r&&r[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,xt.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,xt.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,xt.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,xt.COMPUTE)}_setPendingPropertyOrPath(e,t,r,n){if(n||Je(Array.isArray(e)?e[0]:e)!==e){if(!n){let r=Ke(this,e);if(!(e=Qe(this,e,t))||!super._shouldPropertyChange(e,t,r))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,r))return function(e,t,r){let n=e.__dataLinkedPaths;if(n){let s;for(let i in n){let o=n[i];Xe(i,t)?(s=We(i,o,t),e._setPendingPropertyOrPath(s,r,!0,!0)):Xe(o,t)&&(s=We(o,i,t),e._setPendingPropertyOrPath(s,r,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,r);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,r){r===e[t]&&"object"!=typeof r||("className"===t&&(e=Ye(e)),e[t]=r)}_setPendingProperty(e,t,r){let n=this.__dataHasPaths&&Ue(e),s=n?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,s[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),n?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(n||this[xt.NOTIFY]&&this[xt.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=r),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let r=e[t];r.__dataEnabled?r.__dataPending&&r._flushProperties():r._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let r in e)!t&&this[xt.READ_ONLY]&&this[xt.READ_ONLY][r]||this._setPendingPropertyOrPath(r,e[r],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,r){let n=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,r,n){let s=e[xt.COMPUTE];if(s){let i=t;for(;Tt(e,s,i,r,n);)Object.assign(r,e.__dataOld),Object.assign(t,e.__dataPending),i=e.__dataPending,e.__dataPending=null}}(this,t,r,n);let s=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,r,n),this._flushClients(),Tt(this,this[xt.REFLECT],t,r,n),Tt(this,this[xt.OBSERVE],t,r,n),s&&function(e,t,r,n,s){let i,o,a=e[xt.NOTIFY],l=St++;for(let o in t)t[o]&&(a&&Dt(e,a,l,o,r,n,s)?i=!0:s&&At(e,o,r)&&(i=!0));i&&(o=e.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,s,t,r,n),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,r){this[xt.PROPAGATE]&&Tt(this,this[xt.PROPAGATE],e,t,r);let n=this.__templateInfo;for(;n;)Tt(this,n.propertyEffects,e,t,r,n.nodeList),n=n.nextTemplateInfo}linkPaths(e,t){e=Ge(e),t=Ge(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=Ge(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let r={path:""};Gt(this,Ke(this,e,r),r.path,t)}get(e,t){return Ke(t||this,e)}set(e,t,r){r?Qe(r,e,t):this[xt.READ_ONLY]&&this[xt.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let r={path:""},n=Ke(this,e,r),s=n.length,i=n.push(...t);return t.length&&Zt(this,n,r.path,s,t.length,[]),i}pop(e){let t={path:""},r=Ke(this,e,t),n=Boolean(r.length),s=r.pop();return n&&Zt(this,r,t.path,r.length,0,[s]),s}splice(e,t,r,...n){let s,i={path:""},o=Ke(this,e,i);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),s=2===arguments.length?o.splice(t):o.splice(t,r,...n),(n.length||s.length)&&Zt(this,o,i.path,t,n.length,s),s}shift(e){let t={path:""},r=Ke(this,e,t),n=Boolean(r.length),s=r.shift();return n&&Zt(this,r,t.path,0,0,[s]),s}unshift(e,...t){let r={path:""},n=Ke(this,e,r),s=n.unshift(...t);return t.length&&Zt(this,n,r.path,0,t.length,[]),s}notifyPath(e,t){let r;if(1==arguments.length){let n={path:""};t=Ke(this,e,n),r=n.path}else r=Array.isArray(e)?Ge(e):e;this._setPendingPropertyOrPath(r,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var r;this._addPropertyEffect(e,xt.READ_ONLY),t&&(this["_set"+(r=e,r[0].toUpperCase()+r.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,r){let n={property:e,method:t,dynamicFn:Boolean(r)};this._addPropertyEffect(e,xt.OBSERVE,{fn:Mt,info:n,trigger:{name:e}}),r&&this._addPropertyEffect(t,xt.OBSERVE,{fn:Mt,info:n,trigger:{name:t}})}_createMethodObserver(e,t){let r=Vt(e);if(!r)throw new Error("Malformed observer expression '"+e+"'");qt(this,r,xt.OBSERVE,Bt,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,xt.NOTIFY,{fn:It,info:{eventName:st(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,xt.REFLECT,{fn:Lt,info:{attrName:t}})}_createComputedProperty(e,t,r){let n=Vt(t);if(!n)throw new Error("Malformed computed expression '"+t+"'");qt(this,n,xt.COMPUTE,Rt,e,r)}_marshalArgs(e,t,r){const n=this.__data,s=[];for(let i=0,o=e.length;i<o;i++){let{name:o,structured:a,wildcard:l,value:d,literal:h}=e[i];if(!h)if(l){const e=Xe(o,t),s=Wt(n,r,e?t:o);d={path:e?t:o,value:s,base:e?Ke(n,o):s}}else d=a?Wt(n,r,o):n[o];s[i]=d}return s}static addPropertyEffect(e,t,r){this.prototype._addPropertyEffect(e,t,r)}static createPropertyObserver(e,t,r){this.prototype._createPropertyObserver(e,t,r)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,r){this.prototype._createComputedProperty(e,t,r)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let r=this.constructor._parseTemplate(e),n=this.__templateInfo==r;if(!n)for(let e in r.propertyEffects)this._createPropertyAccessor(e);if(t&&((r=Object.create(r)).wasPreBound=n,!n&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=r,r.previousTemplateInfo=e,r}return this.__templateInfo=r}static _addTemplatePropertyEffect(e,t,r){(e.hostProps=e.hostProps||{})[t]=!0;let n=e.propertyEffects=e.propertyEffects||{};(n[t]=n[t]||[]).push(r)}_stampTemplate(e){Qt.beginHosting(this);let t=super._stampTemplate(e);Qt.endHosting(this);let r=this._bindTemplate(e,!0);if(r.nodeList=t.nodeList,!r.wasPreBound){let e=r.childNodes=[];for(let r=t.firstChild;r;r=r.nextSibling)e.push(r)}return t.templateInfo=r,function(e,t){let{nodeList:r,nodeInfoList:n}=t;if(n.length)for(let t=0;t<n.length;t++){let s=n[t],i=r[t],o=s.bindings;if(o)for(let t=0;t<o.length;t++){let r=o[t];$t(i,r),jt(i,e,r)}i.__dataHost=e}}(this,r),this.__dataReady&&Tt(this,r.propertyEffects,this.__data,null,!1,r.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let r=t.childNodes;for(let e=0;e<r.length;e++){let t=r[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,r,n){let s=t._parseTemplateNode.call(this,e,r,n);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,r);t&&(e.textContent=Jt(t)||" ",Ft(this,r,n,"text","textContent",t),s=!0)}return s}static _parseTemplateNodeAttribute(e,r,n,s,i){let o=this._parseBindings(i,r);if(o){let t=s,i="property";Et.test(s)?i="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),i="attribute");let a=Jt(o);return a&&"attribute"==i&&("class"==s&&e.hasAttribute("class")&&(a+=" "+e.getAttribute(s)),e.setAttribute(s,a)),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===i&&(s=nt(s)),Ft(this,r,n,i,s,o,a),!0}return t._parseTemplateNodeAttribute.call(this,e,r,n,s,i)}static _parseTemplateNestedTemplate(e,r,n){let s=t._parseTemplateNestedTemplate.call(this,e,r,n),i=n.templateInfo.hostProps;for(let e in i){Ft(this,r,n,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}])}return s}static _parseBindings(e,t){let r,n=[],s=0;for(;null!==(r=Ut.exec(e));){r.index>s&&n.push({literal:e.slice(s,r.index)});let i=r[1][0],o=Boolean(r[2]),a=r[3].trim(),l=!1,d="",h=-1;"{"==i&&(h=a.indexOf("::"))>0&&(d=a.substring(h+2),a=a.substring(0,h),l=!0);let c=Vt(a),p=[];if(c){let{args:e,methodName:r}=c;for(let t=0;t<e.length;t++){let r=e[t];r.literal||p.push(r)}let n=t.dynamicFns;(n&&n[r]||c.static)&&(p.push(r),c.dynamicFn=!0)}else p.push(a);n.push({source:a,mode:i,negate:o,customEvent:l,signature:c,dependencies:p,event:d}),s=Ut.lastIndex}if(s&&s<e.length){let t=e.substring(s);t&&n.push({literal:t})}return n.length?n:null}static _evaluateBinding(e,t,r,n,s,i){let o;return o=t.signature?Bt(e,r,n,0,t.signature):r!=t.source?Ke(e,t.source):i&&Ue(r)?Ke(e,r):e.__data[r],t.negate&&(o=!o),o}}});const Qt=new class{constructor(){this.stack=[]}registerHost(e){if(this.stack.length){this.stack[this.stack.length-1]._enqueueClient(e)}}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const er=[];const tr=Oe(e=>{const t=ut(e);function r(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof s?t:null}function n(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const r=e.properties;r&&(t=
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function(e){const t={};for(let r in e){const n=e[r];t[r]="function"==typeof n?{type:n}:n}return t}(r))}e.__ownProperties=t}return e.__ownProperties}class s extends t{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){e=this.prototype,er.push(e);const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(e=>this.attributeNameForProperty(e)):[]}var e;return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=r(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=n(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=r(this);this.__properties=Object.assign({},e&&e._properties,n(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return s}),rr="3.3.0",nr=window.ShadyCSS&&window.ShadyCSS.cssBuild,sr=Oe(e=>{const t=tr(Kt(e));function r(e,t,r,n){if(!nr){const s=t.content.querySelectorAll("style"),i=$e(t),o=function(e){let t=Re(e);return t?je(t):[]}(r),a=t.content.firstElementChild;for(let r=0;r<o.length;r++){let s=o[r];s.textContent=e._processStyleText(s.textContent,n),t.content.insertBefore(s,a)}let l=0;for(let t=0;t<i.length;t++){let r=i[t],o=s[l];o!==r?(r=r.cloneNode(!0),o.parentNode.insertBefore(r,o)):l++,r.textContent=e._processStyleText(r.textContent,n)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,r)}return class extends t{static get polymerElementVersion(){return rr}static _finalizeClass(){t._finalizeClass.call(this);const e=((r=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",r))||(r.__ownObservers=r.hasOwnProperty(JSCompiler_renameProperty("observers",r))?r.observers:null),r.__ownObservers);var r;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):Ce||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let i in e)t=this.prototype,r=i,n=e[i],s=e,n.computed&&(n.readOnly=!0),n.computed&&(t._hasReadOnlyEffect(r)?console.warn(`Cannot redefine computed property '${r}'.`):t._createComputedProperty(r,n.computed,s)),n.readOnly&&!t._hasReadOnlyEffect(r)?t._createReadOnlyProperty(r,!n.computed):!1===n.readOnly&&t._hasReadOnlyEffect(r)&&console.warn(`Cannot make readOnly property '${r}' non-readOnly.`),n.reflectToAttribute&&!t._hasReflectEffect(r)?t._createReflectedProperty(r):!1===n.reflectToAttribute&&t._hasReflectEffect(r)&&console.warn(`Cannot make reflected property '${r}' non-reflected.`),n.notify&&!t._hasNotifyEffect(r)?t._createNotifyingProperty(r):!1===n.notify&&t._hasNotifyEffect(r)&&console.warn(`Cannot make notify property '${r}' non-notify.`),n.observer&&t._createPropertyObserver(r,n.observer,s[n.observer]),t._addPropertyToAttributeMap(r);var t,r,n,s}static createObservers(e,t){const r=this.prototype;for(let n=0;n<e.length;n++)r._createMethodObserver(e[n],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!ve||we)&&(t=Ae.import(e,"template"),ve&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=fe(e.url);else{const e=Ae.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=ye,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let r in t){let n=t[r];"value"in n&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[r]=n)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let r=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof r.value?r.value.call(this):r.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return _e(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const n=this.importPath;r(this,t,e,n?ue(n):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=Ye(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e)),Pe&&window.ShadyDOM&&ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=ue(this.importPath)),ue(e,t)}static _parseTemplateContent(e,r,n){return r.dynamicFns=r.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,r,n)}static _addTemplatePropertyEffect(e,r,n){return!Ce||r in this._properties||console.warn(`Property '${r}' used in template but not declared in 'properties'; `+"attribute will not be observed."),t._addTemplatePropertyEffect.call(this,e,r,n)}}});
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
class ir{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,or.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),or.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,r){return e instanceof ir?e._cancelAsync():e=new ir,e.setConfig(t,r),e}}let or=new Set;const ar=function(e){or.add(e)},lr=function(){const e=Boolean(or.size);return or.forEach(e=>{try{e.flush()}catch(e){setTimeout(()=>{throw e})}}),e};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let dr="string"==typeof document.head.style.touchAction,hr="__polymerGestures",cr="__polymerGesturesHandled",pr="__polymerGesturesTouchAction",ur=25,_r=5,fr=2500,mr=["mousedown","mousemove","mouseup","click"],yr=[0,1,4,2],gr=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function br(e){return mr.indexOf(e)>-1}let vr=!1;function wr(e){if(!br(e)&&"touchend"!==e)return dr&&vr&&be?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){vr=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let Cr=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Pr=[],Sr={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},xr={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Er(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let r=e.getRootNode();if(e.id){let n=r.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<n.length;e++)t.push(n[e])}}return t}let Or=function(e){let t=e.sourceCapabilities;var r;if((!t||t.firesTouchEvents)&&(e[cr]={skip:!0},"click"===e.type)){let t=!1,n=kr(e);for(let e=0;e<n.length;e++){if(n[e].nodeType===Node.ELEMENT_NODE)if("label"===n[e].localName)Pr.push(n[e]);else if(r=n[e],Sr[r.localName]){let r=Er(n[e]);for(let e=0;e<r.length;e++)t=t||Pr.indexOf(r[e])>-1}if(n[e]===Nr.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function Tr(e){let t=Cr?["click"]:mr;for(let r,n=0;n<t.length;n++)r=t[n],e?(Pr.length=0,document.addEventListener(r,Or,!0)):document.removeEventListener(r,Or,!0)}function Dr(e){let t=e.type;if(!br(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!gr&&(t=yr[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let Nr={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Mr(e,t,r){e.movefn=t,e.upfn=r,document.addEventListener("mousemove",t),document.addEventListener("mouseup",r)}function Ar(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}Se&&document.addEventListener("touchend",(function(e){if(!Se)return;Nr.mouse.mouseIgnoreJob||Tr(!0),Nr.mouse.target=kr(e)[0],Nr.mouse.mouseIgnoreJob=ir.debounce(Nr.mouse.mouseIgnoreJob,ht.after(fr),(function(){Tr(),Nr.mouse.target=null,Nr.mouse.mouseIgnoreJob=null}))}),!!vr&&{passive:!0});const kr=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],Ir={},Lr=[];function Rr(e){const t=kr(e);return t.length>0?t[0]:e.target}function Fr(e){let t,r=e.type,n=e.currentTarget[hr];if(!n)return;let s=n[r];if(s){if(!e[cr]&&(e[cr]={},"touch"===r.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===r&&1===e.touches.length&&(Nr.touch.id=t.identifier),Nr.touch.id!==t.identifier)return;dr||"touchstart"!==r&&"touchmove"!==r||function(e){let t=e.changedTouches[0],r=e.type;if("touchstart"===r)Nr.touch.x=t.clientX,Nr.touch.y=t.clientY,Nr.touch.scrollDecided=!1;else if("touchmove"===r){if(Nr.touch.scrollDecided)return;Nr.touch.scrollDecided=!0;let r=function(e){let t="auto",r=kr(e);for(let e,n=0;n<r.length;n++)if((e=r[n])[pr]){t=e[pr];break}return t}(e),n=!1,s=Math.abs(Nr.touch.x-t.clientX),i=Math.abs(Nr.touch.y-t.clientY);e.cancelable&&("none"===r?n=!0:"pan-x"===r?n=i>s:"pan-y"===r&&(n=s>i)),n?e.preventDefault():Br("track")}}(e)}if(!(t=e[cr]).skip){for(let r,n=0;n<Lr.length;n++)s[(r=Lr[n]).name]&&!t[r.name]&&r.flow&&r.flow.start.indexOf(e.type)>-1&&r.reset&&r.reset();for(let n,i=0;i<Lr.length;i++)s[(n=Lr[i]).name]&&!t[n.name]&&(t[n.name]=!0,n[r](e))}}}function Hr(e,t,r){return!!Ir[t]&&(function(e,t,r){let n=Ir[t],s=n.deps,i=n.name,o=e[hr];o||(e[hr]=o={});for(let t,r,n=0;n<s.length;n++)t=s[n],Cr&&br(t)&&"click"!==t||((r=o[t])||(o[t]=r={_count:0}),0===r._count&&e.addEventListener(t,Fr,wr(t)),r[i]=(r[i]||0)+1,r._count=(r._count||0)+1);e.addEventListener(t,r),n.touchAction&&jr(e,n.touchAction)}(e,t,r),!0)}function zr(e,t,r){return!!Ir[t]&&(function(e,t,r){let n=Ir[t],s=n.deps,i=n.name,o=e[hr];if(o)for(let t,r,n=0;n<s.length;n++)t=s[n],(r=o[t])&&r[i]&&(r[i]=(r[i]||1)-1,r._count=(r._count||1)-1,0===r._count&&e.removeEventListener(t,Fr,wr(t)));e.removeEventListener(t,r)}(e,t,r),!0)}function $r(e){Lr.push(e);for(let t=0;t<e.emits.length;t++)Ir[e.emits[t]]=e}function jr(e,t){dr&&e instanceof HTMLElement&&ct.run(()=>{e.style.touchAction=t}),e[pr]=t}function qr(e,t,r){let n=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(n.detail=r,Ye(e).dispatchEvent(n),n.defaultPrevented){let e=r.preventer||r.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function Br(e){let t=function(e){for(let t,r=0;r<Lr.length;r++){t=Lr[r];for(let r,n=0;n<t.emits.length;n++)if((r=t.emits[n])===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function Yr(e,t,r,n){t&&qr(t,e,{x:r.clientX,y:r.clientY,sourceEvent:r,preventer:n,prevent:function(e){return Br(e)}})}function Ur(e,t,r){if(e.prevent)return!1;if(e.started)return!0;let n=Math.abs(e.x-t),s=Math.abs(e.y-r);return n>=_r||s>=_r}function Jr(e,t,r){if(!t)return;let n,s=e.moves[e.moves.length-2],i=e.moves[e.moves.length-1],o=i.x-e.x,a=i.y-e.y,l=0;s&&(n=i.x-s.x,l=i.y-s.y),qr(t,"track",{state:e.state,x:r.clientX,y:r.clientY,dx:o,dy:a,ddx:n,ddy:l,sourceEvent:r,hover:function(){return function(e,t){let r=document.elementFromPoint(e,t),n=r;for(;n&&n.shadowRoot&&!window.ShadyDOM;){if(n===(n=n.shadowRoot.elementFromPoint(e,t)))break;n&&(r=n)}return r}(r.clientX,r.clientY)}})}function Vr(e,t,r){let n=Math.abs(t.clientX-e.x),s=Math.abs(t.clientY-e.y),i=Rr(r||t);!i||xr[i.localName]&&i.hasAttribute("disabled")||(isNaN(n)||isNaN(s)||n<=ur&&s<=ur||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=Rr(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let r=t.getBoundingClientRect(),n=e.pageX,s=e.pageY;return!(n>=r.left&&n<=r.right&&s>=r.top&&s<=r.bottom)}return!1}(t))&&(e.prevent||qr(i,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:r}))}$r({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){Ar(this.info)},mousedown:function(e){if(!Dr(e))return;let t=Rr(e),r=this;Mr(this.info,(function(e){Dr(e)||(Yr("up",t,e),Ar(r.info))}),(function(e){Dr(e)&&Yr("up",t,e),Ar(r.info)})),Yr("down",t,e)},touchstart:function(e){Yr("down",Rr(e),e.changedTouches[0],e)},touchend:function(e){Yr("up",Rr(e),e.changedTouches[0],e)}}),$r({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Ar(this.info)},mousedown:function(e){if(!Dr(e))return;let t=Rr(e),r=this,n=function(e){let n=e.clientX,s=e.clientY;Ur(r.info,n,s)&&(r.info.state=r.info.started?"mouseup"===e.type?"end":"track":"start","start"===r.info.state&&Br("tap"),r.info.addMove({x:n,y:s}),Dr(e)||(r.info.state="end",Ar(r.info)),t&&Jr(r.info,t,e),r.info.started=!0)};Mr(this.info,n,(function(e){r.info.started&&n(e),Ar(r.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=Rr(e),r=e.changedTouches[0],n=r.clientX,s=r.clientY;Ur(this.info,n,s)&&("start"===this.info.state&&Br("tap"),this.info.addMove({x:n,y:s}),Jr(this.info,t,r),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=Rr(e),r=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:r.clientX,y:r.clientY}),Jr(this.info,t,r))}}),$r({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){Dr(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){Dr(e)&&Vr(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){Vr(this.info,e.changedTouches[0],e)}});const Xr=Oe(e=>{return class extends e{_addEventListenerToNode(e,t,r){Hr(e,t,r)||super._addEventListenerToNode(e,t,r)}_removeEventListenerFromNode(e,t,r){zr(e,t,r)||super._removeEventListenerFromNode(e,t,r)}}}),Wr=/:host\(:dir\((ltr|rtl)\)\)/g,Gr=':host([dir="$1"])',Zr=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Kr=':host([dir="$2"]) $1',Qr=/:dir\((?:ltr|rtl)\)/,en=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),tn=[];let rn=null,nn="";function sn(){nn=document.documentElement.getAttribute("dir")}function on(e){if(!e.__autoDirOptOut){e.setAttribute("dir",nn)}}function an(){sn(),nn=document.documentElement.getAttribute("dir");for(let e=0;e<tn.length;e++)on(tn[e])}const ln=Oe(e=>{en||rn||(sn(),(rn=new MutationObserver(an)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=mt(e);class r extends t{static _processStyleText(e,r){return e=t._processStyleText.call(this,e,r),!en&&Qr.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=(t=t.replace(Wr,Gr)).replace(Zr,Kr)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(rn&&rn.takeRecords().length&&an(),tn.push(this),on(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=tn.indexOf(this);e>-1&&tn.splice(e,1)}}}return r.__activateDir=!1,r});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let dn=!1,hn=[],cn=[];function pn(){dn=!0,requestAnimationFrame((function(){dn=!1,un(hn),setTimeout((function(){!function(e){for(let t=0,r=e.length;t<r;t++)_n(e.shift())}(cn)}))}))}function un(e){for(;e.length;)_n(e.shift())}function _n(e){const t=e[0],r=e[1],n=e[2];try{r.apply(t,n)}catch(e){setTimeout(()=>{throw e})}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function fn(){document.body.removeAttribute("unresolved")}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function mn(e,t,r){return{index:e,removed:t,addedCount:r}}"interactive"===document.readyState||"complete"===document.readyState?fn():window.addEventListener("DOMContentLoaded",fn);const yn=0,gn=1,bn=2,vn=3;function wn(e,t,r,n,s,i){let o,a=0,l=0,d=Math.min(r-t,i-s);if(0==t&&0==s&&(a=function(e,t,r){for(let n=0;n<r;n++)if(!Pn(e[n],t[n]))return n;return r}(e,n,d)),r==e.length&&i==n.length&&(l=function(e,t,r){let n=e.length,s=t.length,i=0;for(;i<r&&Pn(e[--n],t[--s]);)i++;return i}(e,n,d-a)),s+=a,i-=l,(r-=l)-(t+=a)==0&&i-s==0)return[];if(t==r){for(o=mn(t,[],0);s<i;)o.removed.push(n[s++]);return[o]}if(s==i)return[mn(t,[],r-t)];let h=function(e){let t=e.length-1,r=e[0].length-1,n=e[t][r],s=[];for(;t>0||r>0;){if(0==t){s.push(bn),r--;continue}if(0==r){s.push(vn),t--;continue}let i,o=e[t-1][r-1],a=e[t-1][r],l=e[t][r-1];(i=a<l?a<o?a:o:l<o?l:o)==o?(o==n?s.push(yn):(s.push(gn),n=o),t--,r--):i==a?(s.push(vn),t--,n=a):(s.push(bn),r--,n=l)}return s.reverse(),s}(function(e,t,r,n,s,i){let o=i-s+1,a=r-t+1,l=new Array(o);for(let e=0;e<o;e++)l[e]=new Array(a),l[e][0]=e;for(let e=0;e<a;e++)l[0][e]=e;for(let r=1;r<o;r++)for(let i=1;i<a;i++)if(Pn(e[t+i-1],n[s+r-1]))l[r][i]=l[r-1][i-1];else{let e=l[r-1][i]+1,t=l[r][i-1]+1;l[r][i]=e<t?e:t}return l}(e,t,r,n,s,i));o=void 0;let c=[],p=t,u=s;for(let e=0;e<h.length;e++)switch(h[e]){case yn:o&&(c.push(o),o=void 0),p++,u++;break;case gn:o||(o=mn(p,[],0)),o.addedCount++,p++,o.removed.push(n[u]),u++;break;case bn:o||(o=mn(p,[],0)),o.addedCount++,p++;break;case vn:o||(o=mn(p,[],0)),o.removed.push(n[u]),u++}return o&&c.push(o),c}function Cn(e,t){return wn(e,0,e.length,t,0,t.length)}function Pn(e,t){return e===t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Sn(e){return"slot"===e.localName}let xn=class{static getFlattenedNodes(e){const t=Ye(e);return Sn(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map(e=>Sn(e)?Ye(e=e).assignedNodes({flatten:!0}):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){Sn(this._target)?this._listenSlots([this._target]):Ye(this._target).children&&(this._listenSlots(Ye(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){Sn(this._target)?this._unlistenSlots([this._target]):Ye(this._target).children&&(this._unlistenSlots(Ye(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,ct.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let r=e[t];r.addedNodes&&this._listenSlots(r.addedNodes),r.removedNodes&&this._unlistenSlots(r.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),r=Cn(t,this._effectiveNodes);for(let t,n=0;n<r.length&&(t=r[n]);n++)for(let r,n=0;n<t.removed.length&&(r=t.removed[n]);n++)e.removedNodes.push(r);for(let n,s=0;s<r.length&&(n=r[s]);s++)for(let r=n.index;r<n.index+n.addedCount;r++)e.addedNodes.push(t[r]);this._effectiveNodes=t;let n=!1;return(e.addedNodes.length||e.removedNodes.length)&&(n=!0,this.callback.call(this._target,e)),n}_listenSlots(e){for(let t=0;t<e.length;t++){let r=e[t];Sn(r)&&r.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let r=e[t];Sn(r)&&r.removeEventListener("slotchange",this._boundSchedule)}}};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const En=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=lr()}while(e||t)},On=Element.prototype,Tn=On.matches||On.matchesSelector||On.mozMatchesSelector||On.msMatchesSelector||On.oMatchesSelector||On.webkitMatchesSelector,Dn=function(e,t){return Tn.call(e,t)};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class Nn{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new xn(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(Ye(this.node).contains(e))return!0;let t=e,r=e.ownerDocument;for(;t&&t!==r&&t!==this.node;)t=Ye(t).parentNode||Ye(t).host;return t===this.node}getOwnerRoot(){return Ye(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?Ye(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=Ye(this.node).assignedSlot;for(;t;)e.push(t),t=Ye(t).assignedSlot;return e}importNode(e,t){let r=this.node instanceof Document?this.node:this.node.ownerDocument;return Ye(r).importNode(e,t)}getEffectiveChildNodes(){return xn.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),r=[];for(let n,s=0,i=t.length;s<i&&(n=t[s]);s++)n.nodeType===Node.ELEMENT_NODE&&Dn(n,e)&&r.push(n);return r}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function Mn(e,t){for(let r=0;r<t.length;r++){let n=t[r];Object.defineProperty(e,n,{get:function(){return this.node[n]},configurable:!0})}}class An{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}Nn.prototype.cloneNode,Nn.prototype.appendChild,Nn.prototype.insertBefore,Nn.prototype.removeChild,Nn.prototype.replaceChild,Nn.prototype.setAttribute,Nn.prototype.removeAttribute,Nn.prototype.querySelector,Nn.prototype.querySelectorAll,Nn.prototype.parentNode,Nn.prototype.firstChild,Nn.prototype.lastChild,Nn.prototype.nextSibling,Nn.prototype.previousSibling,Nn.prototype.firstElementChild,Nn.prototype.lastElementChild,Nn.prototype.nextElementSibling,Nn.prototype.previousElementSibling,Nn.prototype.childNodes,Nn.prototype.children,Nn.prototype.classList,Nn.prototype.textContent,Nn.prototype.innerHTML;let kn=Nn;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(Nn.prototype).forEach(t=>{"activeElement"!=t&&(e.prototype[t]=Nn.prototype[t])}),Mn(e.prototype,["classList"]),kn=e,Object.defineProperties(An.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&In(e).getOwnerRoot(),r=this.path;for(let e=0;e<r.length;e++){const n=r[e];if(In(n).getOwnerRoot()===t)return n}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let r=0;r<t.length;r++){let n=t[r];e[n]=function(){return this.node[n].apply(this.node,arguments)}}}(Nn.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),Mn(Nn.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let r=0;r<t.length;r++){let n=t[r];Object.defineProperty(e,n,{get:function(){return this.node[n]},set:function(e){this.node[n]=e},configurable:!0})}}(Nn.prototype,["textContent","innerHTML","className"]);const In=function(e){if((e=e||document)instanceof kn)return e;if(e instanceof An)return e;let t=e.__domApi;return t||(t=e instanceof Event?new An(e):new kn(e),e.__domApi=t),t},Ln=window.ShadyDOM,Rn=window.ShadyCSS;function Fn(e,t){return Ye(e).getRootNode()===t}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Hn=window.ShadyCSS;const zn=Oe(e=>{const t=ln(Xr(sr(e))),r={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class n extends t{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(e,t,r,n){t!==r&&(super.attributeChangedCallback(e,t,r,n),this.attributeChanged(e,t,r))}attributeChanged(e,t,r){}_initializeProperties(){let e=Object.getPrototypeOf(this);e.hasOwnProperty("__hasRegisterFinished")||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,r){this._propertyToAttribute(e,t,r)}serializeValueToAttribute(e,t,r){this._valueToNodeAttribute(r||this,e,t)}extend(e,t){if(!e||!t)return e||t;let r=Object.getOwnPropertyNames(t);for(let n,s=0;s<r.length&&(n=r[s]);s++){let r=Object.getOwnPropertyDescriptor(t,n);r&&Object.defineProperty(e,n,r)}return e}mixin(e,t){for(let r in t)e[r]=t[r];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,r){r=r||{},t=null==t?{}:t;let n=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});n.detail=t;let s=r.node||this;return Ye(s).dispatchEvent(n),n}listen(e,t,r){e=e||this;let n=this.__boundListeners||(this.__boundListeners=new WeakMap),s=n.get(e);s||(s={},n.set(e,s));let i=t+r;s[i]||(s[i]=this._addMethodEventListenerToNode(e,t,r,this))}unlisten(e,t,r){e=e||this;let n=this.__boundListeners&&this.__boundListeners.get(e),s=t+r,i=n&&n[s];i&&(this._removeEventListenerFromNode(e,t,i),n[s]=null)}setScrollDirection(e,t){jr(t||this,r[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=Ye(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=In(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return In(this).getEffectiveChildNodes()}queryDistributedElements(e){return In(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let r,n=0;r=e[n];n++)r.nodeType!==Node.COMMENT_NODE&&t.push(r.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?In(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){return this!==e&&Ye(this).contains(e)&&Ye(this).getRootNode()===Ye(e).getRootNode()}isLocalDescendant(e){return this.root===Ye(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!Ln||!Rn)return null;if(!Ln.handlesDynamicScoping)return null;const r=Rn.ScopingShim;if(!r)return null;const n=r.scopeForNode(e),s=Ye(e).getRootNode(),i=e=>{if(!Fn(e,s))return;const t=Array.from(Ln.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const i=t[e];if(!Fn(i,s))continue;const o=r.currentScopeForNode(i);o!==n&&(""!==o&&r.unscopeNode(i,o),r.scopeNode(i,n))}};if(i(e),t){const t=new MutationObserver(e=>{for(let t=0;t<e.length;t++){const r=e[t];for(let e=0;e<r.addedNodes.length;e++){const t=r.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&i(t)}}});return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return Hn.getComputedStyleValue(this,e)}debounce(e,t,r){return this._debouncers=this._debouncers||{},this._debouncers[e]=ir.debounce(this._debouncers[e],r>0?ht.after(r):ct,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?ht.run(e.bind(this),t):~ct.run(e.bind(this))}cancelAsync(e){e<0?ct.cancel(~e):ht.cancel(e)}create(e,t){let r=document.createElement(e);if(t)if(r.setProperties)r.setProperties(t);else for(let e in t)r[e]=t[e];return r}elementMatches(e,t){return Dn(t||this,e)}toggleAttribute(e,t){let r=this;return 3===arguments.length&&(r=arguments[2]),1==arguments.length&&(t=!r.hasAttribute(e)),t?(Ye(r).setAttribute(e,""),!0):(Ye(r).removeAttribute(e),!1)}toggleClass(e,t,r){r=r||this,1==arguments.length&&(t=!r.classList.contains(e)),t?r.classList.add(e):r.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,r,n){n=n||this,this.transform("translate3d("+e+","+t+","+r+")",n)}arrayDelete(e,t){let r;if(Array.isArray(e)){if((r=e.indexOf(t))>=0)return e.splice(r,1)}else{if((r=Ke(this,e).indexOf(t))>=0)return this.splice(e,r,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return n.prototype.is="",n}),$n={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},jn={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},qn=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},jn);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function Bn(e,t,r,n){!function(e,t,r){const n=e._noAccessors,s=Object.getOwnPropertyNames(e);for(let i=0;i<s.length;i++){let o=s[i];if(!(o in r))if(n)t[o]=e[o];else{let r=Object.getOwnPropertyDescriptor(e,o);r&&(r.configurable=!0,Object.defineProperty(t,o,r))}}}(t,e,n);for(let e in $n)t[e]&&(r[e]=r[e]||[],r[e].push(t[e]))}function Yn(e,t){for(const r in t){const n=e[r],s=t[r];e[r]=!("value"in s)&&n&&"value"in n?Object.assign({value:n.value},s):s}}function Un(e,t,r){let n;const s={};class i extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(n)for(let e,t=0;t<n.length;t++)(e=n[t]).properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(n)for(let e=0;e<n.length;e++)Yn(t,n[e].properties);return Yn(t,e.properties),t}static get observers(){let t=[];if(n)for(let e,r=0;r<n.length;r++)(e=n[r]).observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=s.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=i.prototype;if(!e.hasOwnProperty("__hasRegisterFinished")){e.__hasRegisterFinished=!0,super._registered(),Ce&&o(e);const t=Object.getPrototypeOf(this);let r=s.beforeRegister;if(r)for(let e=0;e<r.length;e++)r[e].call(t);if(r=s.registered)for(let e=0;e<r.length;e++)r[e].call(t)}}_applyListeners(){super._applyListeners();const e=s.listeners;if(e)for(let t=0;t<e.length;t++){const r=e[t];if(r)for(let e in r)this._addMethodEventListenerToNode(this,e,r[e])}}_ensureAttributes(){const e=s.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const r=e[t];for(let e in r)this._ensureAttribute(e,r[e])}super._ensureAttributes()}ready(){super.ready();let e=s.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=s.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=s.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,r){super.attributeChanged();let n=s.attributeChanged;if(n)for(let s=0;s<n.length;s++)n[s].call(this,e,t,r)}}if(r){Array.isArray(r)||(r=[r]);let e=t.prototype.behaviors;n=function e(t,r,n){r=r||[];for(let s=t.length-1;s>=0;s--){let i=t[s];i?Array.isArray(i)?e(i,r):r.indexOf(i)<0&&(!n||n.indexOf(i)<0)&&r.unshift(i):console.warn("behavior is null, check for missing or 404 import")}return r}(r,null,e),i.prototype.behaviors=e?e.concat(r):n}const o=t=>{n&&function(e,t,r){for(let n=0;n<t.length;n++)Bn(e,t[n],r,qn)}(t,n,s),Bn(t,e,s,jn)};return Ce||o(i.prototype),i.generatedFrom=e,i}const Jn=function(e){let t;return t="function"==typeof e?e:Jn.Class(e),customElements.define(t.is,t),t};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
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
function Vn(e,t,r,n,s){let i;s&&(i="object"==typeof r&&null!==r)&&(n=e.__dataTemp[t]);let o=n!==r&&(n==n||r==r);return i&&o&&(e.__dataTemp[t]=r),o}Jn.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let r=t?t(zn(HTMLElement)):zn(HTMLElement);return(r=Un(e,r,e.behaviors)).is=r.prototype.is=e.is,r};const Xn=Oe(e=>{return class extends e{_shouldPropertyChange(e,t,r){return Vn(this,e,t,r,!0)}}}),Wn=Oe(e=>{return class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,r){return Vn(this,e,t,r,this.mutableData)}}});Xn._mutablePropertyChange=Vn;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Gn=null;function Zn(){return Gn}Zn.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Zn,writable:!0}});const Kn=Kt(Zn),Qn=Xn(Kn);const es=Kt(class{});class ts extends es{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let r=this.__templatizeOptions;(e&&r.instanceProps||!r.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,r){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,r(e)});else{let n=this.__dataHost.__dataHost;n&&n._addEventListenerToNode(e,t,r)}}_showHideChildren(e){let t=this.children;for(let r=0;r<t.length;r++){let n=t[r];if(Boolean(e)!=Boolean(n.__hideTemplateChildren__))if(n.nodeType===Node.TEXT_NODE)e?(n.__polymerTextContent__=n.textContent,n.textContent=""):n.textContent=n.__polymerTextContent__;else if("slot"===n.localName)if(e)n.__polymerReplaced__=document.createComment("hidden-slot"),Ye(Ye(n).parentNode).replaceChild(n.__polymerReplaced__,n);else{const e=n.__polymerReplaced__;e&&Ye(Ye(e).parentNode).replaceChild(n,e)}else n.style&&(e?(n.__polymerDisplay__=n.style.display,n.style.display="none"):n.style.display=n.__polymerDisplay__);n.__hideTemplateChildren__=e,n._showHideChildren&&n._showHideChildren(e)}}_setUnmanagedPropertyToNode(e,t,r){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=r:super._setUnmanagedPropertyToNode(e,t,r)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}ts.prototype.__dataHost,ts.prototype.__templatizeOptions,ts.prototype._methodHost,ts.prototype.__templatizeOwner,ts.prototype.__hostProps;const rs=Xn(ts);function ns(e){let t=e.__dataHost;return t&&t._methodHost||t}function ss(e,t,r){let n=r.mutableData?rs:ts;ls.mixin&&(n=ls.mixin(n));let s=class extends n{};return s.prototype.__templatizeOptions=r,s.prototype._bindTemplate(e),function(e,t,r,n){let s=r.hostProps||{};for(let t in n.instanceProps){delete s[t];let r=n.notifyInstanceProp;r&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:as(t,r)})}if(n.forwardHostProp&&t.__dataHost)for(let t in s)r.hasHostProps||(r.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,r){e.__dataHost._setPendingPropertyOrPath("_host_"+t,r[t],!0,!0)}})}(s,e,t,r),s}function is(e,t,r){let n=r.forwardHostProp;if(n&&t.hasHostProps){let s=t.templatizeTemplateClass;if(!s){let e=r.mutableData?Qn:Kn;s=t.templatizeTemplateClass=class extends e{};let i=t.hostProps;for(let e in i)s.prototype._addPropertyEffect("_host_"+e,s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:os(e,n)}),s.prototype._createNotifyingProperty("_host_"+e)}!function(e,t){Gn=e,Object.setPrototypeOf(e,t.prototype),new t,Gn=null}(e,s),e.__dataProto&&Object.assign(e.__data,e.__dataProto),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties()}}function os(e,t){return function(e,r,n){t.call(e.__templatizeOwner,r.substring("_host_".length),n[r])}}function as(e,t){return function(e,r,n){t.call(e.__templatizeOwner,e,r,n[r])}}function ls(e,t,r){if(ve&&!ns(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(r=r||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let n=(t?t.constructor:ts)._parseTemplate(e),s=n.templatizeInstanceClass;s||(s=ss(e,n,r),n.templatizeInstanceClass=s),is(e,n,r);let i=class extends s{};return i.prototype._methodHost=ns(e),i.prototype.__dataHost=e,i.prototype.__templatizeOwner=t,i.prototype.__hostProps=n.hostProps,i=i}function ds(e,t){let r;for(;t;)if(r=t.__templatizeInstance){if(r.__dataHost==e)return r;t=r.__dataHost}else t=Ye(t).parentNode;return null}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
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
let hs=!1;function cs(){if(Ce&&!me){if(!hs){hs=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const ps=Xr(Wn(Kt(HTMLElement)));customElements.define("dom-bind",class extends ps{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),ve)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,r,n){this.mutableData=!0}connectedCallback(){cs()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){Ye(Ye(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(!(e=e||this.querySelector("template"))){let t=new MutationObserver(()=>{if(!(e=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class us{constructor(e){this.value=e.toString()}toString(){return this.value}}function _s(e){if(e instanceof us)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const fs=function(e,...t){const r=document.createElement("template");return r.innerHTML=t.reduce((t,r,n)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof us)return _s(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(r)+e[n+1],e[0]),r},ms=sr(HTMLElement),ys=Wn(ms);class gs extends ys{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),cs()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=Ye(Ye(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){let e=this.template=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let t={};t[this.as]=!0,t[this.indexAs]=!0,t[this.itemsIndexAs]=!0,this.__ctor=ls(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:t,forwardHostProp:function(e,t){let r=this.__instances;for(let n,s=0;s<r.length&&(n=r[s]);s++)n.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,r){if((n=this.as)===(s=t)||Ve(n,s)||Xe(n,s)){let n=e[this.itemsIndexAs];t==this.as&&(this.items[n]=r);let s=We(this.as,`${JSCompiler_renameProperty("items",this)}.${n}`,t);this.notifyPath(s,r)}var n,s}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,r=this.__getMethodHost();return function(){return r[t].apply(r,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let e=performance.now(),t=this._targetFrameTime/(e-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*t)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=e,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let r=0;r<t.length;r++)0===e.indexOf(t[r])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(e,t=0){this.__renderDebouncer=ir.debounce(this.__renderDebouncer,t>0?ht.after(t):ct,e.bind(this)),ar(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),En()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let e=this.items||[],t=new Array(e.length);for(let r=0;r<e.length;r++)t[r]=r;this.__filterFn&&(t=t.filter((t,r,n)=>this.__filterFn(e[t],r,n))),this.__sortFn&&t.sort((t,r)=>this.__sortFn(e[t],e[r]));const r=this.__itemsIdxToInstIdx={};let n=0;const s=Math.min(t.length,this.__limit);for(;n<s;n++){let s=this.__instances[n],i=t[n],o=e[i];r[i]=n,s?(s._setPendingProperty(this.as,o),s._setPendingProperty(this.indexAs,n),s._setPendingProperty(this.itemsIndexAs,i),s._flushProperties()):this.__insertInstance(o,n,i)}for(let e=this.__instances.length-1;e>=n;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const r=Ye(t.root);for(let e=0;e<t.children.length;e++){let n=t.children[e];r.appendChild(n)}return t}__attachInstance(e,t){let r=this.__instances[e];t.insertBefore(r.root,this)}__detachAndRemoveInstance(e){let t=this.__detachInstance(e);t&&this.__pool.push(t),this.__instances.splice(e,1)}__stampInstance(e,t,r){let n={};return n[this.as]=e,n[this.indexAs]=t,n[this.itemsIndexAs]=r,new this.__ctor(n)}__insertInstance(e,t,r){let n=this.__pool.pop();n?(n._setPendingProperty(this.as,e),n._setPendingProperty(this.indexAs,t),n._setPendingProperty(this.itemsIndexAs,r),n._flushProperties()):n=this.__stampInstance(e,t,r);let s=this.__instances[t+1],i=s?s.children[0]:this;return Ye(Ye(this).parentNode).insertBefore(n.root,i),this.__instances[t]=n,n}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let r=e.slice(6),n=r.indexOf("."),s=n<0?r:r.substring(0,n);if(s==parseInt(s,10)){let e=n<0?"":r.substring(n+1);this.__handleObservedPaths(e);let i=this.__itemsIdxToInstIdx[s],o=this.__instances[i];if(o){let r=this.as+(e?"."+e:"");o._setPendingPropertyOrPath(r,t,!1,!0),o._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return ds(this.template,e)}}customElements.define(gs.is,gs);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class bs extends ms{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=ir.debounce(this.__renderDebouncer,ct,()=>this.__render()),ar(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=Ye(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||Ye(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),cs()||(this.style.display="none"),this.if&&this.__debounceRender()}render(){En()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let e=Ye(this).parentNode;if(e){if(!this.__ctor){let e=Ye(this).querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!Ye(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__ctor=ls(e,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Je(e)]=!0))}})}if(this.__instance){this.__syncHostProperties();let t=this.__instance.children;if(t&&t.length){if(Ye(this).previousSibling!==t[t.length-1])for(let r,n=0;n<t.length&&(r=t[n]);n++)Ye(e).insertBefore(r,this)}}else this.__instance=new this.__ctor,Ye(e).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let e=this.__invalidProps;if(e){for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=Ye(e[0]).parentNode;if(t){t=Ye(t);for(let r,n=0;n<e.length&&(r=e[n]);n++)t.removeChild(r)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let e=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(e)}}customElements.define(bs.is,bs);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let vs=Oe(e=>{let t=sr(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let r=t.path;if(r==JSCompiler_renameProperty("items",this)){let r=t.base||[],n=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),n){let e=Cn(r,n);this.__applySplices(e)}this.__lastItems=r,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=r.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let r=0;r<e.length;r++){let n=e[r];t.forEach((e,r)=>{e<n.index||(e>=n.index+n.removed.length?t.set(r,e+n.addedCount-n.removed.length):t.set(r,-1))});for(let e=0;e<n.addedCount;e++){let r=n.index+e;t.has(this.items[r])&&t.set(this.items[r],r)}}this.__updateLinks();let r=0;t.forEach((e,n)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),r,1):this.selected=this.selectedItem=null,t.delete(n)):r++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)})}else this.__selectedMap.forEach(e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((r,n)=>{t==e++&&this.deselect(n)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let r;this.__selectedMap.delete(e),this.multi&&(r=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),r,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})(ms);class ws extends vs{static get is(){return"array-selector"}static get template(){return null}}customElements.define(ws.is,ws);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Cs=new oe;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,r){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,r){},styleSubtree(e,t){Cs.processStyles(),k(e,t)},styleElement(e){Cs.processStyles()},styleDocument(e){Cs.processStyles(),k(document.body,e)},getComputedStyleValue:(e,t)=>I(e,t),flushCustomStyles(){},nativeCss:l,nativeShadow:n,cssBuild:i,disableRuntime:a}),window.ShadyCSS.CustomStyleInterface=Cs;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Ps="include",Ss=window.ShadyCSS.CustomStyleInterface;class xs extends HTMLElement{constructor(){super(),this._style=null,Ss.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(Ps);return t&&(e.removeAttribute(Ps),e.textContent=function(e){let t=e.trim().split(/\s+/),r="";for(let e=0;e<t.length;e++)r+=qe(t[e]);return r}(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Es;window.customElements.define("custom-style",xs),Es=Xn._mutablePropertyChange;Boolean,zn(HTMLElement).prototype;class Os extends(Xr(ms)){static get template(){return fs`
            <style>
            :host {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                display: block;
                box-sizing: border-box;

                --white-color: #fff;
                --light-grey-color: #dcdcdc;
                --grey-color: #757575;
                --light-blue-color: #daecff;
                --dark-grey-color: #464545;
                --dark-blue-color: #032f62;

                --main-bg: #fff;
                --header-bg: #f7f7f7;
                --main-header-color: #757575;
                --header-text-color: #006df0;
                --header-icon-bg: #006df0;
                --header-icon-opacity: .7;

                --labels-bg: ;
                --labels-color: #757575;
                --border-width: 1px;
                --border-top-width: 1px;
                --border-right-width: 1px;
                --border-bottom-width: 1px;
                --border-left-width: 1px;
                --border-color: #eaeaea;
                --prev-days-bg: #f7f7f7;
                --prev-days-color: #a0a0a0;
                --curr-days-bg: #fff;
                --curr-days-color: #757575;
                --next-days-bg: #f1f1f1;
                --next-days-color: #a0a0a0;
                --prev-next-days-bg: rgba(241, 241, 241, .7);
                --disabled-color: rgba(117, 117, 117, .3);
                --disabled-text-shadow: 0 0 2px rgba(0, 0, 0, .25);

                --selected-day-bg: #006df0;
                --today-boxshadow-color: #006df0;
                --selected-day-color: #006df0;
                --selected-day-hover-bg: rgba(0, 109, 240, .8);

                --border-radius: 4px;

                --layout: {
                    display: flex;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                };

                --layout-horizontal: {
                    @apply(--layout);

                    flex-direction: row;
                    -ms-flex-direction: row;
                    -webkit-flex-direction: row;
                };

                --layout-justified: {
                    justify-content: space-between;
                    -ms-flex-pack: justify;
                    -webkit-justify-content: space-between;
                };

                --no-selection: {
                    user-select: none;
                    -ms-user-select: none;
                    -moz-user-select: none;
                    -khtml-user-select: none;
                    -webkit-user-select: none;
                    -webkit-touch-callout: none;
                };
            }

            #content {
                width: 100%;
                margin: 0;
                background: var(--main-bg);
                border: var(--border-width) solid var(--border-color);
                border-radius: var(--border-radius);
                @apply(--no-selection);
            }

            #header {
                margin: 0;
                font-size: 17px;
                font-weight: bold;
            }

            #header > div {
                @apply(--layout);
                @apply(--layout-justified);
                width: 100%;
                color: var(--main-header-color);
                background: var(--header-bg);
                padding: 7px 0;
                border-radius: 4px 4px 0 0;
            }

            /* month selection */
            #montSelection {
                text-align-last: center;
            }
            #yearSelection {
                text-align-last: center;
            }
            #montSelection, #yearSelection {
                overflow: hidden;
                background: none;
                border: none;
                color: var(--header-text-color);
                font-size: 17px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;
                cursor: pointer;
                position: relative;
                outline: 0;
                appearance: none;
                -ms-appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;

            }

                #montSelection option, #yearSelection option {
                    direction: ltr;
                }

            .mp-cld-labels {
                min-width: 37.5px;
                padding: 0;
                background: var(--labels-bg);
                color: var(--labels-color);
                font-weight: 300;
                border-top: var(--border-top-width) solid var(--border-color);

                @apply(--layout);
                @apply(--week-layout)
            }

            .mp-cld-main, .mp-cld-days {
                width: 100%;
                margin: 0;
                border-top: var(--border-top-width) solid var(--border-color);
            }

            .calendar-icon-left,
            .calendar-icon-right { width: 26px; height: 26px; vertical-align: middle }

            .calendar-icon-left { margin: 0 0 0 5px }
            .calendar-icon-right { margin: 0 5px 0 0 }

            .currentMonth {
                text-align: center;
            }
            .currentMonthDate, .todayDate {
                vertical-align: middle;
                position: relative;
                text-align: center;
            }

                .todayDate:hover {
                    cursor: pointer
                }

            .calendar-icon-todayDay {
                width: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: sub
            }

                svg.calendar-icon-left:hover,
                svg.calendar-icon-right:hover,
                svg.calendar-icon-todayDay:hover { cursor: pointer }

                svg.calendar-icon-left,
                svg.calendar-icon-right,
                svg.calendar-icon-todayDay { fill: var(--header-icon-bg); transition: all .3s ease-in-out; }

                    svg.calendar-icon-left:hover,
                    svg.calendar-icon-right:hover,
                    svg.calendar-icon-todayDay:hover {
                        /*fill: var(--header-icon-hover-bg);*/
                        opacity: var(--header-icon-opacity);
                    }

                .show-inner-date {
                    font-size: 10px;
                    width: 20px;
                    height: 60%;
                    position: absolute;
                    top: 7px;
                    right: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

            .mp-cld-labels, .mp-cld-days { margin: 0; padding-left: 0; }

            .mp-cld-label {
                width: 14.285%;
                font-size: 12px;
                color: var(--labels-color);
                line-height: 40px;
                text-align: center;
                border-right: var(--border-right-width) solid var(--border-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

                .mp-cld-label:nth-child(7), .mp-cld-day:nth-child(7) {
                    margin-right: 0;
                    border-right: 1px solid transparent;
                }

            .mp-cld-week {
                border-top: var(--border-top-width) solid var(--border-color);
                position: relative
            }

                .mp-cld-week:nth-child(1) {
                    border-top: none
                }

                .mp-cld-week.disabledWeek {
                    position: relative;
                    text-shadow: var(--disabled-text-shadow);
                    pointer-events: none
                }

                .mp-cld-week.disabledWeek > .mp-cld-day {
                    background: none;
                    color: var(--disabled-color);
                }

            .mp-cld-day {
                width: 14.285%;
                margin: 0;
                padding: 10px;
                font-size: 16px;
                text-align: center;
                border-right: var(--border-right-width) solid var(--border-color);
                cursor: pointer;
                display: inline-block;
                box-sizing: border-box;
                transition: all .3s ease-in-out;
            }

            .mp-cld-day.prevMonth,
            .mp-cld-day.currMonth,
            .mp-cld-day.nextMonth {
                position: relative;
                transition: background-color .22s ease-in-out;
            }

            .mp-cld-day.prevMonth {
                background: var(--prev-days-bg);
                color: var(--prev-days-color);
            }
            .mp-cld-day.currMonth {
                color: var(--curr-days-color);
            }

            .mp-cld-day.nextMonth {
                background: var(--next-days-bg);
                color: var(--next-days-color);
            }

                .mp-cld-day.prevMonth span, .mp-cld-day.currMonth span,
                .mp-cld-day.nextMonth span {
                    position: relative;
                }

            .mp-cld-day.prevMonth, .mp-cld-day.nextMonth {
                background: var(--prev-next-days-bg);
            }

                .mp-cld-day.prevMonth:hover,
                .mp-cld-day.currMonth:hover,
                .mp-cld-day.nextMonth:hover {
                    cursor: pointer;
                }

                    .mp-cld-day.prevMonth::before,
                    .mp-cld-day.currMonth::before,
                    .mp-cld-day.nextMonth::before {
                        content: '';
                        width: 5px;
                        height: 5px;
                        background: transparent;
                        margin-left: -2.5px;
                        position: absolute;
                        top: 30px;
                        left: 50%;
                        z-index: 0;
                        border-radius: 50%;
                        transition: all .5s ease-in-out;
                    }

                    .mp-cld-day.prevMonth:hover::before,
                    .mp-cld-day.currMonth:hover::before,
                    .mp-cld-day.nextMonth:hover::before {
                        background: var(--selected-day-bg);
                    }

             .mp-cld-day.today {
                position: relative;
                z-index: 5;
                box-shadow: var(--today-boxshadow-color) 0 -2px 0 0 inset
            }

            .mp-cld-day.currMonth.selected,
            .mp-cld-day.nextMonth.selected {
                background: var(--selected-day-bg);
                color: var(--white-color);
                position: relative;
                cursor: pointer;
                z-index: 5;
                transition: all .4s ease-in-out;
            }

                .mp-cld-day.currMonth.selected:hover {
                    background: var(--selected-day-hover-bg);
                }

                .mp-cld-day.currMonth.selected:hover::before {
                    background: none;
                }

            .mp-cld-day.prevMonth.disabled {
                pointer-events: none;
            }

                .mp-cld-day.prevMonth.disabled:hover {
                    background: var(--prev-days-bg);
                    border-bottom: none;
                    cursor: default;
                }

                    .mp-cld-day.disabled:hover::before {
                        background: none;
                    }

            .mp-cld-day.disabledDay {
                text-shadow: var(--disabled-text-shadow);
                color: var(--disabled-color);
                pointer-events: none
            }

            .mp-cld-number {
                position: relative;
                margin: 0;
                padding: 10px;
            }

            .mp-cld-title {
                position: absolute;
                z-index: 5;
                display: none;
                top: 35px;
                left: 0;
                padding: 5px 10px;
                background: var(--white-color);
                white-space: nowrap;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 12px;
            }

            .mp-cld-number:hover .mp-cld-title { display: block; }

            .mp-cld-title::before {
                content: '';
                position: absolute;
                top: -7.5px; left: 10px;
                width: 0;
                height: 0;
                border-left: 7.5px solid transparent;
                border-right: 7.5px solid transparent;
                border-bottom: 7.5px solid #ccc;
            }

            .mp-cld-number.eventday { font-weight: bold; color: #0080FF; }

                .mp-cld-number.eventday:hover { cursor: pointer; background: #eee; }

                .today .mp-cld-number.eventday:hover { background: #005eff; }

            .mp-cld-day .mp-cld-event, .mp-cld-day .eventLeft {
                width: 120%;
                background: #f1f1f1;
                color: #757575;
                border: 1px solid #ccc;
                padding: 0 5px;
                position: absolute;
                top: 0;
                left: 105%;
                opacity: 0;
                z-index: 100;
                visibility: hidden;
                transition: visibility 0s linear .5s, opacity .5s linear;
                box-sizing: border-box
            }

            .mp-cld-day .eventLeft {
                right: 105%;
                left: inherit;
            }

                .mp-cld-day .mp-cld-event::before,
                .mp-cld-day .mp-cld-event::after,
                .mp-cld-day .eventLeft::before,
                .mp-cld-day .eventLeft::after {
                    width: 0;
                    height: 0;
                    content: '';
                    z-index: 5;
                    position: absolute;
                    left: 50%;
                }

                .mp-cld-day .eventLeft::before,
                .mp-cld-day .eventLeft::after {
                    right: 50%;
                    left: inherit
                }

                .mp-cld-day .mp-cld-event::before {
                    border: 8px solid transparent;
                    border-right-color: #f1f1f1;
                    margin-left: -16px;
                    top: 10px;
                    left: 0;
                    z-index: 6;
                }

                .mp-cld-day .mp-cld-event::after {
                    border: 9px solid transparent;
                    border-right-color: #ccc;
                    margin-left: -17px;
                    top: 9px;
                    left: -1px;
                }

                    .mp-cld-day .eventLeft::before {
                        border: 8px solid transparent;
                        border-left-color: #f1f1f1;
                        margin-right: -16px;
                        top: 10px;
                        right: 0;
                        z-index: 6;
                    }

                    .mp-cld-day .eventLeft::after {
                        border: 9px solid transparent;
                        border-left-color: #ccc;
                        margin-right: -18px;
                        top: 9px;
                        right: 0;
                        left: inherit;
                    }

                .mp-cld-day h3.red { color: #e81c12; }
                .mp-cld-day h3.blue { color: #1153d8; }
                .mp-cld-day h3.green { color: #3c763d; }
                .mp-cld-day h3.orange { color: #e88e0f; }

                .mp-cld-day .mp-cld-event .event h3, .mp-cld-day .eventLeft .event h3 {
                    font-size: 16px;
                    margin: 10px 5px 0;
                    text-align: left;
                    line-height: 16px;
                }

                    .mp-cld-day .mp-cld-event:hover,
                    .mp-cld-day .eventLeft:hover {
                        cursor: auto;
                    }

                    .mp-cld-day .mp-cld-event .event:nth-child(1) > h3,
                    .mp-cld-day .eventLeft .event:nth-child(1) { margin-top: 8px; }

                .mp-cld-day .mp-cld-event .event,
                .mp-cld-day .eventLeft .event { position: relative; }

                .mp-cld-day .mp-cld-event .separator,
                .mp-cld-day .eventLeft .separator { width: 100%; margin: 0 0 15px; position: relative; }

                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::before,
                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::after,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::before,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::after {
                        background-color: #9e9e9e;
                        content: '';
                        height: 1px;
                        position: absolute;
                        bottom: 0;
                        width: 50%;
                        box-sizing: border-box;
                    }

                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::before,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::before {
                        background-image: -webkit-gradient(linear,right top,left top,from(#9e9e9e),to(#f1f1f1));
                        background-image: -webkit-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: -moz-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: -ms-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: -o-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: linear-gradient(right,#9e9e9e, #f1f1f1);
                        left: 0;
                    }

                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::after,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::after {
                        background-image: -webkit-gradient(linear,left top,right top,from(#9e9e9e),to(#f1f1f1));
                        background-image: -webkit-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: -moz-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: -ms-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: -o-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: linear-gradient(left,#9e9e9e, #f1f1f1);
                        right: 0;
                    }

                    .mp-cld-day .mp-cld-event .separator:last-child,
                    .mp-cld-day .eventLeft .separator:last-child { display: none; }

                    .mp-cld-day .mp-cld-event h3 i,
                    .mp-cld-day .eventLeft h3 i {
                        font-size: 11px;
                        font-style: italic;
                        font-weight: 300;
                        margin: 2px 0 0;
                        display: block;
                    }

                .mp-cld-day .mp-cld-event span,
                .mp-cld-day .eventLeft span {
                    font-size: 12px;
                    margin: 5px 5px 10px;
                    text-align: left;
                    display: block;
                }


                .mp-cld-day.prevMonth:hover .mp-cld-event,
                .mp-cld-day.prevMonth:hover .eventLeft,
                .mp-cld-day.currMonth:hover .mp-cld-event,
                .mp-cld-day.currMonth:hover .eventLeft,
                .mp-cld-day.nextMonth:hover .mp-cld-event,
                .mp-cld-day.nextMonth:hover .eventLeft {
                    opacity: 1;
                    visibility: visible;
                    transition-delay: 0s;
                }

                @media (max-width: 800px) {
                    .mp-cld-day .mp-cld-event { width: 200%; left: 115%; }
                    .mp-cld-day .eventLeft { width: 200%; right: 115%; }
                }

                @media (max-width: 414px) {
                    .mp-cld-day .mp-cld-event, .mp-cld-day .eventLeft { width: 350%; }
                    .mp-cld-day .mp-cld-event .event h3,
                    .mp-cld-day .eventLeft .event h3 { font-size: 14px; }
                }
                :host {
                    --labels-color: #777777;
                }
            </style>

            <iron-a11y-keys id="a11y" target="{{target}}" keys="up down left right tab space" on-keys-pressed="{{chosen}}"></iron-a11y-keys>

            <div id="content">
                <div id="header">
                    <div class="month-display">
                        <div id="prev-month" on-click="prevMonthHandler" style="transform: scale(1.5) rotate(90deg);">
                            <svg class="calendar-icon-left" viewBox="0 0 32 32" width="32px" height="32px">
                            <path d="M7 10l5 5 5-5z">
                            </svg>
                        </div>

                        <div id="currentMonth" class="currentMonth">
                            <span class="currentMonthDate">
                                <select id="montSelection" value="{{monthValue::change}}" title="Click to change month">
                                    <template is="dom-repeat" items="[[monthLabels]]" as="month">
                                        <option value="[[index]]">[[month]]</option>
                                    </template>
                                </select>

                                <select id="yearSelection" value="{{yearValue::change}}" title="Click to change year">
                                    <template is="dom-repeat" items="[[yearList]]" as="year">
                                        <option value="[[year]]">[[year]]</option>
                                    </template>
                                </select>
                            </span>
                            <span style="display:none;" class="todayDate" on-click="goToCurrentDate" title="Go to current date">
                                <div class="show-inner-date">{{calendarDay}}</div>
                                <svg class="calendar-icon-todayDay" viewBox="0 0 1792 1792" width="28px" height="28px">
                                    <path d="M192 1664h1408v-1024h-1408v1024zm384-1216v-288q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v288q0 14 9 23t23 9h64q14 0 23-9t9-23zm768 0v-288q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v288q0 14 9 23t23 9h64q14 0 23-9t9-23zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"></path>
                                </svg>
                            </span>
                        </div>

                        <div id="next-month" on-click="nextMonthHandler" style="position: relative; top: -2px; transform: scale(1.5) rotate(270deg);">
                            <svg height="32px" class="calendar-icon-left" viewBox="0 0 32 32" width="32px">
                            <path d="M7 10l5 5 5-5z">
                            </svg>
                        </div>
                    </div>
                </div>
                <div id="mpCalendar">
                    <div class="mp-cld-labels">
                        <dom-repeat items="[[dayLabels]]">
                            <template>
                                <span class="mp-cld-label">[[item]]</span>
                            </template>
                        </dom-repeat>
                    </div>
                    <div id="cldDays" class="mp-cld-days"></div>
                </div>
            </div>
        `}static get is(){return"date-calendar"}static get properties(){return{disablePrevDays:Boolean,disableNextDays:Boolean,showDaysInMonth:{type:Number,value:42},chosen:{type:String,notify:!0,reflectToAttribute:!0,observer:"_chosenHandler"},selectedDate:{type:String,notify:!0,reflectToAttribute:!0,observer:"_selectedDate"},firstDayOfWeek:{type:Number,value:0},dayLabels:{type:Array,value:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},monthLabels:{type:Array,value:["January","February","March","April","May","June","July","August","September","October","November","December"]},showDate:{type:Object,value:{year:null,month:null,day:null},readOnly:!0},date:{type:Object,value:()=>{var e=new Date;return{year:e.getFullYear(),month:e.getUTCMonth()+1,day:null,date:e}},observer:"_dateChanged"},disabledDates:{type:Array,value:[]},disabledDays:{type:Object,value:[]},disabledWeeks:{type:Array,value:[]},disabledInMonths:{type:Array,value:[1,2,3,4,5,6,7,8,9,10,11,12]},eventsFile:{type:String,observer:"_loadEvents"},eventsObject:{type:Object,observer:"_loadEvents"},eventDayColor:{type:String,value:"#b56ce2"},_eventsData:{type:Object,value:{}},theme:{type:String,value:""},minYear:{type:Number,value:5},maxYear:{type:Number,value:5},monthValue:{type:String,observer:"setMonth"},yearValue:{type:String,observer:"setYear"}}}constructor(){super(),this.theme="light-blue",this.showDaysInMonth=42,this.chosen=""}connectedCallback(){super.connectedCallback(),this._addListeners();var e=JSON.parse(JSON.stringify(this.dayLabels));if(0!=this.firstDayOfWeek){this.dayLabels=[];for(var t=0;t<e.length;t++){var r=(t+this.firstDayOfWeek)%7;this.dayLabels.push(e[r])}}this.yearList=[];for(var n=new Date,s=n.getFullYear()-this.minYear,i=n.getFullYear()+this.maxYear;s<=i;s++)this.yearList.push(s)}disconnectedCallback(){this._removeListeners()}ready(){var e,t,r;super.ready(),this.eventsFile?this._getJSON(this.eventsFile,e=>{this._eventsData=e,this._initCalandar(this.showDate.month,this.showDate.year),this._checkChosen()}):(this._initCalandar(this.showDate.month,this.showDate.year),this._checkChosen()),this._checkTheme(),e=this,t=()=>{this.$.montSelection.value=this.showDate.month,this.$.yearSelection.value=this.showDate.year},dn||pn(),cn.push([e,t,r])}_addListeners(){this.$.mpCalendar.addEventListener("click",this._selectionHandler.bind(this))}_removeListeners(){this.$.mpCalendar.removeEventListener("click",this._selectionHandler.bind(this))}_checkTheme(){switch(this.theme){case"light-blue":this._lightBlueTheme();break;case"dark":this._darkTheme()}}_checkChosen(){if(""!==this.chosen&&void 0!==this.chosen){var e=this.chosen.split("-");if(e.length<3)return;var t=new Date(this.chosen),r=parseInt(e[0]),n=parseInt(e[1]),s=parseInt(e[2]);this.showDate.year=r,this.showDate.month=n-1,this.date={year:r,month:n,day:s,date:t,isoDate:this.chosen}}}_selectionHandler(e,t){if(!e||null!=e.target.getAttribute("data-date")){var r=(t=e?e.target.getAttribute("data-date"):t).split("-"),n=new Date(t);this.showDate.year=parseInt(r[0]),this.date={year:this.showDate.year,month:parseInt(r[1]),day:parseInt(r[2]),date:n,isoDate:t},this.chosen=t}}_selectedDate(e){e&&(this.chosen=e)}_chosenHandler(e){var t=e.split("-");if(!(t.length<3)){new Date(e);var r=parseInt(t[0]),n=parseInt(t[1]),s=parseInt(t[2]);if(n==this.date.month&&r==this.date.year){var i=In(this.$.cldDays).querySelector(".selected");if(i&&i.classList.remove("selected"),""==e||null==e)this.chosen="";else this.chosen=e,In(this.$.mpCalendar).querySelectorAll(".day").forEach((e,t)=>{this.chosen==e.getAttribute("data-date")&&e.classList.add("selected")}),this.date.day=s}else this.showDate={month:n,day:s,year:r},this._checkChosen()}}prevMonthHandler(){this.set("showDate.month",this.showDate.month<=0?11:this.showDate.month-1),this.set("showDate.year",11==this.showDate.month?this.showDate.year-1:this.showDate.year),this.chosen="",this.notifyPath("date.year",this.showDate.year),this.currentMonth=this.monthLabels[this.showDate.month],this._initCalandar(this.showDate.month,this.showDate.year),this.$.montSelection.value=this.showDate.month,this.$.yearSelection.value=this.showDate.year,this._fire("prevMonth")}nextMonthHandler(){this.set("showDate.month",11==this.showDate.month?0:this.showDate.month+1),this.set("showDate.year",this.showDate.month<=0?this.showDate.year+1:this.showDate.year),this.chosen="",this.notifyPath("date.year",this.showDate.year),this.currentMonth=this.monthLabels[this.showDate.month],this._initCalandar(this.showDate.month,this.showDate.year),this.$.montSelection.value=this.showDate.month,this.$.yearSelection.value=this.showDate.year,this._fire("nextMonth")}setMonth(e){this._setShowDate({month:parseInt(e),year:this.showDate.year}),this.chosen="",this._initCalandar(parseInt(e),parseInt(this.$.yearSelection.value)),this._fire("monthChanged")}setYear(e){this._setShowDate({month:this.showDate.month-1,year:parseInt(e)}),this.chosen="",this._initCalandar(parseInt(this.$.montSelection.value),e),this._fire("monthChanged")}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}_dateChanged(e,t){var r=new Date,n=parseInt(e.month)||1,s=parseInt(e.year)||r.getFullYear(),i=parseInt(e.day)||1;if(this.date.month=n,this.date.year=s,this.date.day=null!=this.date.day?i:null,this._setShowDate({month:n-1,year:s}),this.currentMonth=this.monthLabels[this.showDate.month],this.calendarDay=null!=this.date.day?i:r.getDate(),e&&t){e.date.getUTCMonth()>t.date.getUTCMonth()&&(this._initCalandar(this.showDate.month,this.showDate.year),this._fire("nextMonth")),e.date.getUTCMonth()<t.date.getUTCMonth()&&(this._initCalandar(this.showDate.month,this.showDate.year),this._fire("prevMonth"));var o=JSON.parse(JSON.stringify(this.date)),a=o.isoDate.split("-");o.year=parseInt(a[0]),o.month=parseInt(a[1]),o.day=parseInt(a[2]),this._fire("dateSelected",o),this._fire("date",o.isoDate)}this.$.montSelection.value=this.showDate.month,this.$.yearSelection.value=this.showDate.year}goToCurrentDate(e){var t=new Date;this.date={date:t,day:t.getDate(),month:t.getUTCMonth()+1,year:t.getFullYear()},this.chosen="",this._initCalandar(this.showDate.month,this.showDate.year),this.$.montSelection.value=this.showDate.month,this.$.yearSelection.value=this.showDate.year,this._fire("currMonth")}_initCalandar(e,t){var r,n,s,i,o,a=new Date,l=a.getDate(),d=a.getUTCMonth()+1,h=0==new Date(t,e,1).getDay()?7:new Date(t,e,1).getDay(),c=In(this.$.mpCalendar);this.$.cldDays.innerHTML="",0===e?(r=11,n=t-1):(r=e-1,n=t),11===e?(s=0,i=t+1):(s=e+1,i=t),o=0===e?this._numberOfDays(12,t):this._numberOfDays(e,t);var p=this._numberOfDays(e+1,t),u=(this._numberOfDays(e+2,t),1),_=1,f=this.$.cldDays,m=this.showDaysInMonth;h>=5&&this.showDaysInMonth<37&&p>29&&(m=42);for(var y=0;y<m;y++){var g=document.createElement("span");if(y%7==0){var b=document.createElement("div");b.className+="mp-cld-week",b.setAttribute("week",y/7),""==this.disabledWeeks&&""==this.disabledInMonths||this.disabledInMonths.forEach(t=>{t==e+1&&this.disabledWeeks.forEach(e=>{e==y/7&&(b.className+=" disabledWeek")})})}if(y<h-this.firstDayOfWeek)if(g.className+="mp-cld-day prevMonth",this.disablePrevDays)g.innerHTML+="&nbsp;",g.className+=" disabled";else this._dayNumber(o-h+(y+1+this.firstDayOfWeek),r+1,n,g);else if(u<=p){g.className+="mp-cld-day currMonth";this._dayNumber(u++,e+1,t,g);u-1==l&&e==d-1&&this.date.year==t&&(g.className+=" today"),this.chosen&&u-1==this.date.day&&e==e&&this.date.year==t&&(g.className+=" selected"),""!=this.disabledDays&&""!=this.disabledInMonths&&this.disabledInMonths.forEach(r=>{r==e+1&&this.disabledDays.forEach((r,n)=>{this.dayLabels.forEach((n,s)=>{if(r===n){var i=new Date;i.setDate(s),i.setMonth(e),i.getFullYear()!=t&&i.setYear(t),this._getDisabledDays(s,e,t).forEach(e=>{e.getDate()==u-1&&(g.className+=" disabledDay")})}})})}),""!=this.disabledDates&&""!=this.disabledInMonths&&this.disabledInMonths.forEach(t=>{t==e+1&&this.disabledDates.forEach(e=>{e==u-1&&(g.className+=" disabledDay")})})}else if(g.className+="mp-cld-day nextMonth",this.disableNextDays)g.innerHTML+="&nbsp;",g.className+=" disabled";else this._dayNumber(_++,s+1,i,g);In(f).appendChild(b),In(b).appendChild(g)}In(c).appendChild(f),(this.eventsFile||this.eventsObject)&&this._findAllEvents(this._eventsData)}_numberOfDays(e,t){return new Date(t,e,0).getDate()}_dayNumber(e,t,r,n){document.createElement("span");var s=r+"-"+((t<10?"0":"")+t)+"-"+((e<10?"0":"")+e);return n.className+=" day",n.innerHTML+=e,n.setAttribute("data-date",s),n.setAttribute("tabindex",0),n}_getDisabledDays(e,t,r){for(var n=[],s=this._numberOfDays(t,r),i=0;i<=s;i++){var o=new Date(r,t,i,0);o.getDay()==e&&n.push(o)}return n}_getJSON(e,t){var r=new XMLHttpRequest;r.onreadystatechange=function(){r.readyState===XMLHttpRequest.DONE&&200===r.status&&t(JSON.parse(r.responseText))},r.open("GET",e,!0),r.send()}_findAllEvents(e){var t=new Date,r=(t.getDate()<10?"0":"")+t.getDate(),n=(t.getUTCMonth()<10?"0":"")+(t.getUTCMonth()+1),s=t.getFullYear()+"-"+n+"-"+r;e.forEach(t=>{var r='.day[data-date="'+t.date+'"]',n=this.$.content.querySelector(r),i="",o=[],a=0;if(null!=n||null!=n){for(var l in e)e[l].date===n.getAttribute("data-date")&&o.push(e[l]);if(o.length<=3?a=3:n.style.boxShadow="inset -4px 0 0 0 "+this.eventDayColor,a>0){var d="";for(var l in o)""!=d&&(d+=","),o[l].date===s&&(d+="var(--today-boxshadow-color) 0 -2px 0 0 inset, "),d+="inset -"+(parseInt(l)+1)*a+"px 0 0 0 "+(null==o[l].color?o[l].category:o[l].color);n.style.boxShadow=d}if(0==n.children.length)i+='<div class="mp-cld-event"><div class="event"><h3 class="'+t.category+'" '+(t.color?'style="color:'+t.color+'"':"")+">"+t.title+"<i>"+t.date+"</i></h3><span>"+t.content+"</span></div></div>",In(n).innerHTML+=i;else for(l=0;l<n.children.length;l++)i+='<span class="separator"></span><div class="event"><h3 class="'+t.category+'" '+(t.color?'style="color:'+t.color+'"':"")+">"+t.title+"<i>"+t.date+"</i></h3><span>"+t.content+"</span></div>",In(n.children[l]).innerHTML+=i;setTimeout(()=>{this.horizontallyBound(this,n.children[0])})}})}horizontallyBound(e,t){var r=e.getBoundingClientRect(),n=t.getBoundingClientRect();n.left+n.width>r.width&&(t.classList.remove("mp-cld-event"),t.classList.add("eventLeft"))}_loadEvents(){this.eventsFile?this._getJSON(this.eventsFile,e=>{this._eventsData=e,this._initCalandar(this.showDate.month,this.showDate.year),this._checkChosen()}):(this._eventsData=this.eventsObject,this._initCalandar(this.showDate.month,this.showDate.year),this._checkChosen())}_lightBlueTheme(){this.updateStyles({"--main-bg":"#fff","--header-bg":"transparent","--main-header-color":"#777777","--header-text-color":"#777777","--header-icon-bg":"rgba(6, 143, 189, .85)","--header-icon-opacity":"","--labels-color":"#aaaaaa","--border-width":"1px","--border-right-width":"0","--border-color":"rgba(6, 143, 189, .05)","--prev-next-days-bg":"transparent","--prev-days-bg":"","--prev-days-color":"#cccccc","--curr-days-bg":"","--curr-days-color":"#777777","--next-days-bg":"","--next-days-color":"#cccccc","--disabled-color":"rgba(6, 143, 189, .3)","--disabled-text-shadow":"0 0 3px rgba(0, 0, 0, .25)","--selected-day-bg":"#078dc0","--today-boxshadow-color":"#077599","--selected-day-hover-bg":"rgba(6, 143, 189, .7)"})}_darkTheme(){this.updateStyles({"--main-bg":"#000","--header-bg":"#000","--main-header-color":"#fff","--header-icon-bg":"#f33127","--header-icon-opacity":"","--labels-color":"#fff","--border-width":"1px","--border-color":"rgba(255, 255, 255, .2)","--prev-days-color":"#fff","--curr-days-bg":"","--curr-days-color":"#fff","--prev-next-days-bg":"rgba(158, 21, 14, 0.6)","--next-days-color":"#fff","--disabled-color":"rgba(255, 255, 255, .3)","--disabled-text-shadow":"0 0 2px rgba(255, 255, 255, .35)","--selected-day-bg":"#af221b","--today-boxshadow-color":"#f33127","--selected-day-hover-bg":"rgba(255, 13, 0, .5)"})}}customElements.define(Os.is,Os)}]);