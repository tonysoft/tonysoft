/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   iron-query-params.js
 */

import {Polymer} from 'https://unpkg.com/tonysoft/@polymer/polymer/lib/legacy/polymer-fn.js';

import {LegacyElementMixin} from 'https://unpkg.com/tonysoft/@polymer/polymer/lib/legacy/legacy-element-mixin.js';

interface IronQueryParamsElement extends LegacyElementMixin, HTMLElement {
  paramsString: string|undefined;
  paramsObject: object|null|undefined;
  _dontReact: boolean|null|undefined;
  hostAttributes: object|null;
  paramsStringChanged(): void;
  paramsObjectChanged(): void;
  _encodeParams(params: any): any;
  _decodeParams(paramString: any): any;
}

export {IronQueryParamsElement};

declare global {

  interface HTMLElementTagNameMap {
    "iron-query-params": IronQueryParamsElement;
  }
}
