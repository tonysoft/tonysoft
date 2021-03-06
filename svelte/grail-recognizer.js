/* Inner.svelte generated by Svelte v3.12.1 */
import {
	SvelteElement,
	flush,
	init,
	insert,
	noop,
	safe_not_equal
} from "./svelte/internal.js";
import { createEventDispatcher } from "./svelte/svelte.js";
import { Grail } from "./js/grail.js"

function create_fragment(ctx) {
	return {
		c() {
			this.c = noop;
		},

		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

function instance($$self, $$props, $$invalidate) {
	

    let grail;

    let { pointsets = [] } = $$props;

	const dispatch = createEventDispatcher();

	$$self.$set = $$props => {
		if ('pointsets' in $$props) $$invalidate('pointsets', pointsets = $$props.pointsets);
	};

	$$self.$$.update = ($$dirty = { pointsets: 1, grail: 1, recognized: 1 }) => {
		if ($$dirty.pointsets || $$dirty.grail || $$dirty.recognized) { if (pointsets.length > 0) {
                if (!grail) {
                    $$invalidate('grail', grail = new Grail());
                }
                if (typeof pointsets === "string") {  // data passed in a string rather than array
                    $$invalidate('pointsets', pointsets = JSON.parse(pointsets));
                }
                var recognized = grail.Recognize(pointsets, true);
                dispatch("recognized", recognized);
        	} }
	};

	return { pointsets };
}

class GrailRecognizer extends SvelteElement {
	constructor(options) {
		super();

		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, ["pointsets"]);

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
		return ["pointsets"];
	}

	get pointsets() {
		return this.$$.ctx.pointsets;
	}

	set pointsets(pointsets) {
		this.$set({ pointsets });
		flush();
	}
}

export default GrailRecognizer;
window.customElements.define('grail-recognizer', GrailRecognizer);
