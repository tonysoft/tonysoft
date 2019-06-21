/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   prism-highlighter.js
 */

import {Polymer} from 'https://unpkg.com/tonysoft@^1.2.5/@polymer/polymer/lib/legacy/polymer-fn.js';

import {LegacyElementMixin} from 'https://unpkg.com/tonysoft@^1.2.5/@polymer/polymer/lib/legacy/legacy-element-mixin.js';

/**
 * Syntax highlighting via [Prism](http://prismjs.com/).
 *
 * Place a `<prism-highlighter>` in your document, preferably as a direct child of
 * `<body>`. It will listen for `syntax-highlight` events on its parent element,
 * and annotate the code being provided via that event.
 *
 * The `syntax-highlight` event's detail is expected to have a `code` property
 * containing the source to highlight. The event detail can optionally contain a
 * `lang` property, containing a string like `"html"`, `"js"`, etc.
 *
 * This flow is supported by
 * [`<marked-element>`](https://github.com/PolymerElements/marked-element).
 */
interface PrismHighlighterElement extends LegacyElementMixin, HTMLElement {

  /**
   * Adds languages outside of the core Prism languages.
   *
   * Prism includes a few languages in the core library:
   *   - JavaScript
   *   - Markup
   *   - CSS
   *   - C-Like
   * Use this property to extend the core set with other Prism
   * components and custom languages.
   *
   * Example:
   *   ```
   *   <!-- with languages = {'custom': myCustomPrismLang}; -->
   *   <!-- or languages = Prism.languages; -->
   *   <prism-highlighter languages="[[languages]]"></prism-highlighter>
   *   ```
   */
  languages: object;
  ready(): void;
  attached(): void;
  detached(): void;

  /**
   * Handle the highlighting event, if we can.
   */
  _highlight(event: CustomEvent): void;

  /**
   * Picks a Prism formatter based on the `lang` hint and `code`.
   *
   * @param code The source being highlighted.
   * @param lang A language hint (e.g. ````LANG`).
   */
  _detectLang(code: string, lang?: string): {};
}

export {PrismHighlighterElement};

declare global {

  interface HTMLElementTagNameMap {
    "prism-highlighter": PrismHighlighterElement;
  }
}
