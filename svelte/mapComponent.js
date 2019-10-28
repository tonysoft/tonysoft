/* Map.svelte generated by Svelte v3.12.1 */
import {
	SvelteElement,
	binding_callbacks,
	detach,
	element,
	flush,
	init,
	insert,
	noop,
	safe_not_equal
} from "svelte/internal";
import { onMount, setContext } from "svelte";
import { mapbox, key } from "./mapbox.js";

// (47:1) {#if map}
function create_if_block(ctx) {
	var slot;

	return {
		c() {
			slot = element("slot");
		},

		m(target, anchor) {
			insert(target, slot, anchor);
		},

		d(detaching) {
			if (detaching) {
				detach(slot);
			}
		}
	};
}

function create_fragment(ctx) {
	var div;

	var if_block = (ctx.map) && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			this.c = noop;
		},

		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			ctx.div_binding(div);
		},

		p(changed, ctx) {
			if (ctx.map) {
				if (!if_block) {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},

		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if (if_block) if_block.d();
			ctx.div_binding(null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	

	setContext(key, {
		getMap: () => map
	});

	let { lat, lon, zoom } = $$props;

	let container;
	let map;

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

		link.onload = () => {
			$$invalidate('map', map = new mapbox.Map({
				container,
				style: 'mapbox://styles/mapbox/streets-v9',
				center: [lon, lat],
				zoom
			}));
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('container', container = $$value);
		});
	}

	$$self.$set = $$props => {
		if ('lat' in $$props) $$invalidate('lat', lat = $$props.lat);
		if ('lon' in $$props) $$invalidate('lon', lon = $$props.lon);
		if ('zoom' in $$props) $$invalidate('zoom', zoom = $$props.zoom);
	};

	return {
		lat,
		lon,
		zoom,
		container,
		map,
		div_binding
	};
}

class Map extends SvelteElement {
	constructor(options) {
		super();

		this.shadowRoot.innerHTML = `<style>div{width:100%;height:100%}</style>`;

		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, ["lat", "lon", "zoom"]);

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
		return ["lat","lon","zoom"];
	}

	get lat() {
		return this.$$.ctx.lat;
	}

	set lat(lat) {
		this.$set({ lat });
		flush();
	}

	get lon() {
		return this.$$.ctx.lon;
	}

	set lon(lon) {
		this.$set({ lon });
		flush();
	}

	get zoom() {
		return this.$$.ctx.zoom;
	}

	set zoom(zoom) {
		this.$set({ zoom });
		flush();
	}
}

export default Map;
window.customElements.define('map-component', Inner);
