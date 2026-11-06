import { i as getContext, q as index_server_exports, u as noop } from './index.js-CwB51hC0.js';

var is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
var placeholder_url = "a:";
if (is_legacy) {
	new URL(placeholder_url);
}
//#endregion
//#region node_modules/.pnpm/@sveltejs+kit@2.70.3_@svelt_146b6cb2708685dd33dfc11e1198879b/node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteFunctionDataNode, ServerNodesResponse, ServerRedirectNode } from 'types' */
/** @import { CacheEntry } from './remote-functions/cache.svelte.js' */
/** @import { Query } from './remote-functions/query/instance.svelte.js' */
/** @import { LiveQuery } from './remote-functions/query-live/instance.svelte.js' */
var { onMount, tick } = index_server_exports;
/**
* Note on before_navigate_callbacks, on_navigate_callbacks and after_navigate_callbacks:
* do not re-assign as some closures keep references to these Sets
*/
/** @type {Set<(navigation: import('@sveltejs/kit').BeforeNavigate) => void>} */
var before_navigate_callbacks = /* @__PURE__ */ new Set();
/** @type {Set<(navigation: import('@sveltejs/kit').AfterNavigate) => void>} */
var after_navigate_callbacks = /* @__PURE__ */ new Set();
/**
* @template {Function} T
* @param {Set<T>} callbacks
* @param {T} callback
*/
function add_navigation_callback(callbacks, callback) {
	onMount(() => {
		callbacks.add(callback);
		return () => {
			callbacks.delete(callback);
		};
	});
}
/**
* A lifecycle function that runs the supplied `callback` when the current component mounts, and also whenever we navigate to a URL.
*
* `afterNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
* @param {(navigation: import('@sveltejs/kit').AfterNavigate) => void} callback
* @returns {void}
*/
function afterNavigate(callback) {
	add_navigation_callback(after_navigate_callbacks, callback);
}
/**
* A navigation interceptor that triggers before we navigate to a URL, whether by clicking a link, calling `goto(...)`, or using the browser back/forward controls.
*
* Calling `cancel()` will prevent the navigation from completing. If `navigation.type === 'leave'` — meaning the user is navigating away from the app (or closing the tab) — calling `cancel` will trigger the native browser unload confirmation dialog. In this case, the navigation may or may not be cancelled depending on the user's response.
*
* When a navigation isn't to a SvelteKit-owned route (and therefore controlled by SvelteKit's client-side router), `navigation.to.route.id` will be `null`.
*
* If the navigation will (if not cancelled) cause the document to unload — in other words `'leave'` navigations and `'link'` navigations where `navigation.to.route === null` — `navigation.willUnload` is `true`.
*
* `beforeNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
* @param {(navigation: import('@sveltejs/kit').BeforeNavigate) => void} callback
* @returns {void}
*/
function beforeNavigate(callback) {
	add_navigation_callback(before_navigate_callbacks, callback);
}
//#endregion
//#region node_modules/.pnpm/@sveltejs+kit@2.70.3_@svelt_146b6cb2708685dd33dfc11e1198879b/node_modules/@sveltejs/kit/src/runtime/app/state/server.js
function context() {
	return getContext("__request__");
}
//#endregion
//#region node_modules/.pnpm/@sveltejs+kit@2.70.3_@svelt_146b6cb2708685dd33dfc11e1198879b/node_modules/@sveltejs/kit/src/runtime/app/state/index.js
/**
* A read-only reactive object with information about the current page, serving several use cases:
* - retrieving the combined `data` of all pages/layouts anywhere in your component tree (also see [loading data](https://svelte.dev/docs/kit/load))
* - retrieving the current value of the `form` prop anywhere in your component tree (also see [form actions](https://svelte.dev/docs/kit/form-actions))
* - retrieving the page state that was set through `goto`, `pushState` or `replaceState` (also see [goto](https://svelte.dev/docs/kit/$app-navigation#goto) and [shallow routing](https://svelte.dev/docs/kit/shallow-routing))
* - retrieving metadata such as the URL you're on, the current route and its parameters, and whether or not there was an error
*
* ```svelte
* <!--- file: +layout.svelte --->
* <script>
* 	import { page } from '$app/state';
* <\/script>
*
* <p>Currently at {page.url.pathname}</p>
*
* {#if page.error}
* 	<span class="red">Problem detected</span>
* {:else}
* 	<span class="small">All systems operational</span>
* {/if}
* ```
*
* Changes to `page` are available exclusively with runes. (The legacy reactivity syntax will not reflect any changes)
*
* ```svelte
* <!--- file: +page.svelte --->
* <script>
* 	import { page } from '$app/state';
* 	const id = $derived(page.params.id); // This will correctly update id for usage on this page
* 	$: badId = page.params.id; // Do not use; will never update after initial load
* <\/script>
* ```
*
* On the server, values can only be read during rendering (in other words _not_ in e.g. `load` functions). In the browser, the values can be read at any time.
*
* @type {import('@sveltejs/kit').Page}
*/
var page = {
	get data() {
		return context().page.data;
	},
	get error() {
		return context().page.error;
	},
	get status() {
		return context().page.status;
	},
	get url() {
		return context().page.url;
	}
};

export { afterNavigate as a, beforeNavigate as b, page as p };
//# sourceMappingURL=state-BhxyZW3a.js.map
