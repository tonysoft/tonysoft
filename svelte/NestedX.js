/* NestedX.svelte generated by Svelte v3.16.7 */
import {
	SvelteElement,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "./svelte/internal.js";
import { createEventDispatcher, onMount } from "./svelte/svelte.js";

function create_fragment(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "...or, this one...";
			this.c = noop;
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function readJSON() {
	return { "hello": "there" };
}

function instance($$self, $$props, $$invalidate) {
	return [readJSON];
}

class NestedX extends SvelteElement {
	constructor(options) {
		super();
		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, { readJSON: 0 });

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["readJSON"];
	}

	get readJSON() {
		return readJSON;
	}
}

export {NestedX};
window.customElements.define('nestedx-component', NestedX);