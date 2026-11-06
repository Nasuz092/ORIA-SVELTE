import { h as head, b as attr_class, c as bind_props, s as spread_props, p as props_id, d as attributes, f as derived, g as hasContext, i as getContext, k as setContext, r as run, A as ATTACHMENT_KEY, t as tick, l as attr, m as escape_html, n as ensure_array_like, o as stringify } from './index.js-BQyqVAon.js';
import { b as beforeNavigate, a as afterNavigate, p as page } from './state-xjxA5wmL.js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/is.js
function isObject(value) {
	return value !== null && typeof value === "object";
}
var CLASS_VALUE_PRIMITIVE_TYPES = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function isClassValue(value) {
	if (value === null || value === void 0) return true;
	if (CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof value)) return true;
	if (Array.isArray(value)) return value.every((item) => isClassValue(item));
	if (typeof value === "object") {
		if (Object.getPrototypeOf(value) !== Object.prototype) return false;
		return true;
	}
	return false;
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var BoxSymbol = Symbol("box");
var isWritableSymbol = Symbol("is-writable");
function boxWith(getter, setter) {
	const derived$1 = derived(getter);
	if (setter) return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return derived$1();
		},
		set current(v) {
			setter(v);
		}
	};
	return {
		[BoxSymbol]: true,
		get current() {
			return getter();
		}
	};
}
/**
* @returns Whether the value is a Box
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function isBox(value) {
	return isObject(value) && BoxSymbol in value;
}
function simpleBox(initialValue) {
	let current = initialValue;
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
/**
* Composes event handlers into a single function that can be called with an event.
* If the previous handler cancels the event using `event.preventDefault()`, the handlers
* that follow will not be called.
*/
function composeHandlers(...handlers) {
	return function(e) {
		for (const handler of handlers) {
			if (!handler) continue;
			if (e.defaultPrevented) return;
			if (typeof handler === "function") handler.call(this, e);
			else handler.current?.call(this, e);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/inline-style-parser@0.2.7/node_modules/inline-style-parser/esm/index.mjs
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
/**
* @param {String} style
* @param {Object} [options]
* @return {Object[]}
* @throws {TypeError}
* @throws {Error}
*/
function index(style, options) {
	if (typeof style !== "string") throw new TypeError("First argument must be a string");
	if (!style) return [];
	options = options || {};
	/**
	* Positional.
	*/
	var lineno = 1;
	var column = 1;
	/**
	* Update lineno and column based on `str`.
	*
	* @param {String} str
	*/
	function updatePosition(str) {
		var lines = str.match(NEWLINE_REGEX);
		if (lines) lineno += lines.length;
		var i = str.lastIndexOf(NEWLINE);
		column = ~i ? str.length - i : column + str.length;
	}
	/**
	* Mark position and patch `node.position`.
	*
	* @return {Function}
	*/
	function position() {
		var start = {
			line: lineno,
			column
		};
		return function(node) {
			node.position = new Position(start);
			whitespace();
			return node;
		};
	}
	/**
	* Store position information for a node.
	*
	* @constructor
	* @property {Object} start
	* @property {Object} end
	* @property {undefined|String} source
	*/
	function Position(start) {
		this.start = start;
		this.end = {
			line: lineno,
			column
		};
		this.source = options.source;
	}
	/**
	* Non-enumerable source string.
	*/
	Position.prototype.content = style;
	/**
	* Error `msg`.
	*
	* @param {String} msg
	* @throws {Error}
	*/
	function error(msg) {
		var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
		err.reason = msg;
		err.filename = options.source;
		err.line = lineno;
		err.column = column;
		err.source = style;
		if (options.silent);
		else throw err;
	}
	/**
	* Match `re` and return captures.
	*
	* @param {RegExp} re
	* @return {undefined|Array}
	*/
	function match(re) {
		var m = re.exec(style);
		if (!m) return;
		var str = m[0];
		updatePosition(str);
		style = style.slice(str.length);
		return m;
	}
	/**
	* Parse whitespace.
	*/
	function whitespace() {
		match(WHITESPACE_REGEX);
	}
	/**
	* Parse comments.
	*
	* @param {Object[]} [rules]
	* @return {Object[]}
	*/
	function comments(rules) {
		var c;
		rules = rules || [];
		while (c = comment()) if (c !== false) rules.push(c);
		return rules;
	}
	/**
	* Parse comment.
	*
	* @return {Object}
	* @throws {Error}
	*/
	function comment() {
		var pos = position();
		if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
		var i = 2;
		while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) ++i;
		i += 2;
		if (EMPTY_STRING === style.charAt(i - 1)) return error("End of comment missing");
		var str = style.slice(2, i - 2);
		column += 2;
		updatePosition(str);
		style = style.slice(i);
		column += 2;
		return pos({
			type: TYPE_COMMENT,
			comment: str
		});
	}
	/**
	* Parse declaration.
	*
	* @return {Object}
	* @throws {Error}
	*/
	function declaration() {
		var pos = position();
		var prop = match(PROPERTY_REGEX);
		if (!prop) return;
		comment();
		if (!match(COLON_REGEX)) return error("property missing ':'");
		var val = match(VALUE_REGEX);
		var ret = pos({
			type: TYPE_DECLARATION,
			property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
			value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
		});
		match(SEMICOLON_REGEX);
		return ret;
	}
	/**
	* Parse declarations.
	*
	* @return {Object[]}
	*/
	function declarations() {
		var decls = [];
		comments(decls);
		var decl;
		while (decl = declaration()) if (decl !== false) {
			decls.push(decl);
			comments(decls);
		}
		return decls;
	}
	whitespace();
	return declarations();
}
/**
* Trim `str`.
*
* @param {String} str
* @return {String}
*/
function trim(str) {
	return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
//#endregion
//#region node_modules/.pnpm/style-to-object@1.0.14/node_modules/style-to-object/esm/index.mjs
/**
* Parses inline style to object.
*
* @param style - Inline style.
* @param iterator - Iterator.
* @returns - Style object or null.
*
* @example Parsing inline style to object:
*
* ```js
* import parse from 'style-to-object';
* parse('line-height: 42;'); // { 'line-height': '42' }
* ```
*/
function StyleToObject(style, iterator) {
	let styleObject = null;
	if (!style || typeof style !== "string") return styleObject;
	const declarations = index(style);
	const hasIterator = typeof iterator === "function";
	declarations.forEach((declaration) => {
		if (declaration.type !== "declaration") return;
		const { property, value } = declaration;
		if (hasIterator) iterator(property, value, declaration);
		else if (value) {
			styleObject = styleObject || {};
			styleObject[property] = value;
		}
	});
	return styleObject;
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/strings.js
var NUMBER_CHAR_RE = /\d/;
var STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(char = "") {
	if (NUMBER_CHAR_RE.test(char)) return void 0;
	return char !== char.toLowerCase();
}
function splitByCase(str) {
	const parts = [];
	let buff = "";
	let previousUpper;
	let previousSplitter;
	for (const char of str) {
		const isSplitter = STR_SPLITTERS.includes(char);
		if (isSplitter === true) {
			parts.push(buff);
			buff = "";
			previousUpper = void 0;
			continue;
		}
		const isUpper = isUppercase(char);
		if (previousSplitter === false) {
			if (previousUpper === false && isUpper === true) {
				parts.push(buff);
				buff = char;
				previousUpper = isUpper;
				continue;
			}
			if (previousUpper === true && isUpper === false && buff.length > 1) {
				const lastChar = buff.at(-1);
				parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
				buff = lastChar + char;
				previousUpper = isUpper;
				continue;
			}
		}
		buff += char;
		previousUpper = isUpper;
		previousSplitter = isSplitter;
	}
	parts.push(buff);
	return parts;
}
function pascalCase(str) {
	if (!str) return "";
	return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
	return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
	return str ? str[0].toLowerCase() + str.slice(1) : "";
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
function cssToStyleObj(css) {
	if (!css) return {};
	const styleObj = {};
	function iterator(name, value) {
		if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
			styleObj[pascalCase(name)] = value;
			return;
		}
		if (name.startsWith("--")) {
			styleObj[name] = value;
			return;
		}
		styleObj[camelCase(name)] = value;
	}
	StyleToObject(css, iterator);
	return styleObj;
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
/**
* Executes an array of callback functions with the same arguments.
* @template T The types of the arguments that the callback functions take.
* @param callbacks array of callback functions to execute.
* @returns A new function that executes all of the original callback functions with the same arguments.
*/
function executeCallbacks(...callbacks) {
	return (...args) => {
		for (const callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function createParser(matcher, replacer) {
	const regex = RegExp(matcher, "g");
	return (str) => {
		if (typeof str !== "string") throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
		if (!str.match(regex)) return str;
		return str.replace(regex, replacer);
	};
}
var camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
	if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
	return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/style.js
function styleToString(style = {}) {
	return styleToCSS(style).replace("\n", " ");
}
var EVENT_LIST_SET = /* @__PURE__ */ new Set([
	"onabort",
	"onanimationcancel",
	"onanimationend",
	"onanimationiteration",
	"onanimationstart",
	"onauxclick",
	"onbeforeinput",
	"onbeforetoggle",
	"onblur",
	"oncancel",
	"oncanplay",
	"oncanplaythrough",
	"onchange",
	"onclick",
	"onclose",
	"oncompositionend",
	"oncompositionstart",
	"oncompositionupdate",
	"oncontextlost",
	"oncontextmenu",
	"oncontextrestored",
	"oncopy",
	"oncuechange",
	"oncut",
	"ondblclick",
	"ondrag",
	"ondragend",
	"ondragenter",
	"ondragleave",
	"ondragover",
	"ondragstart",
	"ondrop",
	"ondurationchange",
	"onemptied",
	"onended",
	"onerror",
	"onfocus",
	"onfocusin",
	"onfocusout",
	"onformdata",
	"ongotpointercapture",
	"oninput",
	"oninvalid",
	"onkeydown",
	"onkeypress",
	"onkeyup",
	"onload",
	"onloadeddata",
	"onloadedmetadata",
	"onloadstart",
	"onlostpointercapture",
	"onmousedown",
	"onmouseenter",
	"onmouseleave",
	"onmousemove",
	"onmouseout",
	"onmouseover",
	"onmouseup",
	"onpaste",
	"onpause",
	"onplay",
	"onplaying",
	"onpointercancel",
	"onpointerdown",
	"onpointerenter",
	"onpointerleave",
	"onpointermove",
	"onpointerout",
	"onpointerover",
	"onpointerup",
	"onprogress",
	"onratechange",
	"onreset",
	"onresize",
	"onscroll",
	"onscrollend",
	"onsecuritypolicyviolation",
	"onseeked",
	"onseeking",
	"onselect",
	"onselectionchange",
	"onselectstart",
	"onslotchange",
	"onstalled",
	"onsubmit",
	"onsuspend",
	"ontimeupdate",
	"ontoggle",
	"ontouchcancel",
	"ontouchend",
	"ontouchmove",
	"ontouchstart",
	"ontransitioncancel",
	"ontransitionend",
	"ontransitionrun",
	"ontransitionstart",
	"onvolumechange",
	"onwaiting",
	"onwebkitanimationend",
	"onwebkitanimationiteration",
	"onwebkitanimationstart",
	"onwebkittransitionend",
	"onwheel"
]);
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/merge-props.js
/**
* Modified from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/mergeProps.ts (see NOTICE.txt for source)
*/
function isEventHandler(key) {
	return EVENT_LIST_SET.has(key);
}
/**
* Given a list of prop objects, merges them into a single object.
* - Automatically composes event handlers (e.g. `onclick`, `oninput`, etc.)
* - Chains regular functions with the same name so they are called in order
* - Merges class strings with `clsx`
* - Merges style objects and converts them to strings
* - Handles a bug with Svelte where setting the `hidden` attribute to `false` doesn't remove it
* - Overrides other values with the last one
*/
function mergeProps(...args) {
	const result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		const props = args[i];
		if (!props) continue;
		for (const key of Object.keys(props)) {
			const a = result[key];
			const b = props[key];
			const aIsFunction = typeof a === "function";
			const bIsFunction = typeof b === "function";
			if (aIsFunction && typeof bIsFunction && isEventHandler(key)) result[key] = composeHandlers(a, b);
			else if (aIsFunction && bIsFunction) result[key] = executeCallbacks(a, b);
			else if (key === "class") {
				const aIsClassValue = isClassValue(a);
				const bIsClassValue = isClassValue(b);
				if (aIsClassValue && bIsClassValue) result[key] = clsx(a, b);
				else if (aIsClassValue) result[key] = clsx(a);
				else if (bIsClassValue) result[key] = clsx(b);
			} else if (key === "style") {
				const aIsObject = typeof a === "object";
				const bIsObject = typeof b === "object";
				const aIsString = typeof a === "string";
				const bIsString = typeof b === "string";
				if (aIsObject && bIsObject) result[key] = {
					...a,
					...b
				};
				else if (aIsObject && bIsString) {
					const parsedStyle = cssToStyleObj(b);
					result[key] = {
						...a,
						...parsedStyle
					};
				} else if (aIsString && bIsObject) result[key] = {
					...cssToStyleObj(a),
					...b
				};
				else if (aIsString && bIsString) {
					const parsedStyleA = cssToStyleObj(a);
					const parsedStyleB = cssToStyleObj(b);
					result[key] = {
						...parsedStyleA,
						...parsedStyleB
					};
				} else if (aIsObject) result[key] = a;
				else if (bIsObject) result[key] = b;
				else if (aIsString) result[key] = a;
				else if (bIsString) result[key] = b;
			} else result[key] = b !== void 0 ? b : a;
		}
		for (const key of Object.getOwnPropertySymbols(props)) {
			const a = result[key];
			const b = props[key];
			result[key] = b !== void 0 ? b : a;
		}
	}
	if (typeof result.style === "object") result.style = styleToString(result.style).replaceAll("\n", " ");
	if (result.hidden === false) {
		result.hidden = void 0;
		delete result.hidden;
	}
	if (result.disabled === false) {
		result.disabled = void 0;
		delete result.disabled;
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow = void 0;
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement$1(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
/**
* @param {any} _
*/
function createSubscriber(_) {
	return () => {};
}
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber();
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement$1(this.#document);
	}
};
new ActiveElement();
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/utilities/extract/extract.svelte.js
function extract(value, defaultValue) {
	return value;
}
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/utilities/context/context.js
var Context = class {
	#name;
	#key;
	/**
	* @param name The name of the context.
	* This is used for generating the context key and error messages.
	*/
	constructor(name) {
		this.#name = name;
		this.#key = Symbol(name);
	}
	/**
	* The key used to get and set the context.
	*
	* It is not recommended to use this value directly.
	* Instead, use the methods provided by this class.
	*/
	get key() {
		return this.#key;
	}
	/**
	* Checks whether this has been set in the context of a parent component.
	*
	* Must be called during component initialisation.
	*/
	exists() {
		return hasContext(this.#key);
	}
	/**
	* Retrieves the context that belongs to the closest parent component.
	*
	* Must be called during component initialisation.
	*
	* @throws An error if the context does not exist.
	*/
	get() {
		const context = getContext(this.#key);
		if (context === void 0) throw new Error(`Context "${this.#name}" not found`);
		return context;
	}
	/**
	* Retrieves the context that belongs to the closest parent component,
	* or the given fallback value if the context does not exist.
	*
	* Must be called during component initialisation.
	*/
	getOr(fallback) {
		const context = getContext(this.#key);
		if (context === void 0) return fallback;
		return context;
	}
	/**
	* Associates the given value with the current component and returns it.
	*
	* Must be called during component initialisation.
	*/
	set(context) {
		return setContext(this.#key, context);
	}
};
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function useDebounce(callback, wait) {
	let context = null;
	const wait$ = derived(() => extract(wait));
	function debounced(...args) {
		if (context) {
			if (context.timeout) clearTimeout(context.timeout);
		} else {
			let resolve;
			let reject;
			context = {
				timeout: null,
				runner: null,
				promise: new Promise((res, rej) => {
					resolve = res;
					reject = rej;
				}),
				resolve,
				reject
			};
		}
		context.runner = async () => {
			if (!context) return;
			const ctx = context;
			context = null;
			try {
				ctx.resolve(await callback.apply(this, args));
			} catch (error) {
				ctx.reject(error);
			}
		};
		context.timeout = setTimeout(context.runner, wait$());
		return context.promise;
	}
	debounced.cancel = async () => {
		if (!context || context.timeout === null) {
			await new Promise((resolve) => setTimeout(resolve, 0));
			if (!context || context.timeout === null) return;
		}
		clearTimeout(context.timeout);
		context.reject("Cancelled");
		context = null;
	};
	debounced.runScheduledNow = async () => {
		if (!context || !context.timeout) {
			await new Promise((resolve) => setTimeout(resolve, 0));
			if (!context || !context.timeout) return;
		}
		clearTimeout(context.timeout);
		context.timeout = null;
		await context.runner?.();
	};
	Object.defineProperty(debounced, "pending", {
		enumerable: true,
		get() {
			return !!context?.timeout;
		}
	});
	return debounced;
}
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/utilities/watch/watch.svelte.js
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
//#endregion
//#region node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_b2baf2e8bbf23878adcccbcb9168d962/node_modules/runed/dist/utilities/is-mounted/is-mounted.svelte.js
var IsMounted = class {
	#isMounted = false;
	constructor() {}
	get current() {
		return this.#isMounted;
	}
};
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/after-tick.js
function afterTick(fn) {
	(/* @__PURE__ */ tick()).then(fn);
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/dom.js
var DOCUMENT_NODE = 9;
function isDocument(node) {
	return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
	return isObject(node) && node.constructor?.name === "VisualViewport";
}
function getDocument(node) {
	if (isDocument(node)) return node;
	if (isWindow(node)) return node.document;
	return node?.ownerDocument ?? document;
}
function getActiveElement(rootNode) {
	let activeElement = rootNode.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var DOMContext = class {
	element;
	#root = derived(() => {
		if (!this.element.current) return document;
		return this.element.current.getRootNode() ?? document;
	});
	get root() {
		return this.#root();
	}
	set root($$value) {
		return this.#root($$value);
	}
	constructor(element) {
		if (typeof element === "function") this.element = boxWith(element);
		else this.element = element;
	}
	getDocument = () => {
		return getDocument(this.root);
	};
	getWindow = () => {
		return this.getDocument().defaultView ?? window;
	};
	getActiveElement = () => {
		return getActiveElement(this.root);
	};
	isActiveElement = (node) => {
		return node === this.getActiveElement();
	};
	getElementById(id) {
		return this.root.getElementById(id);
	}
	querySelector = (selector) => {
		if (!this.root) return null;
		return this.root.querySelector(selector);
	};
	querySelectorAll = (selector) => {
		if (!this.root) return [];
		return this.root.querySelectorAll(selector);
	};
	setTimeout = (callback, delay) => {
		return this.getWindow().setTimeout(callback, delay);
	};
	clearTimeout = (timeoutId) => {
		return this.getWindow().clearTimeout(timeoutId);
	};
};
//#endregion
//#region node_modules/.pnpm/svelte@5.57.0_@typescript-eslint+types@8.70.0/node_modules/svelte/src/attachments/index.js
/**
* Creates an object key that will be recognised as an attachment when the object is spread onto an element,
* as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though
* is generally not needed when building an app.
*
* ```svelte
* <script>
* 	import { createAttachmentKey } from 'svelte/attachments';
*
* 	const props = {
* 		class: 'cool',
* 		onclick: () => alert('clicked'),
* 		[createAttachmentKey()]: (node) => {
* 			node.textContent = 'attached!';
* 		}
* 	};
* <\/script>
*
* <button {...props}>click me</button>
* ```
* @since 5.29
*/
function createAttachmentKey() {
	return Symbol(ATTACHMENT_KEY);
}
//#endregion
//#region node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_fd02ccc2f3f3c04da8d7f70c2a376b3d/node_modules/svelte-toolbelt/dist/utils/attach-ref.js
/**
* Creates a Svelte Attachment that attaches a DOM element to a ref.
* The ref can be either a WritableBox or a callback function.
*
* @param ref - Either a WritableBox to store the element in, or a callback function that receives the element
* @param onChange - Optional callback that fires when the ref changes
* @returns An object with a spreadable attachment key that should be spread onto the element
*
* @example
* // Using with WritableBox
* const ref = box<HTMLDivElement | null>(null);
* <div {...attachRef(ref)}>Content</div>
*
* @example
* // Using with callback
* <div {...attachRef((node) => myNode = node)}>Content</div>
*
* @example
* // Using with onChange
* <div {...attachRef(ref, (node) => console.log(node))}>Content</div>
*/
function attachRef(ref, onChange) {
	return { [createAttachmentKey()]: (node) => {
		if (isBox(ref)) {
			ref.current = node;
			run(() => onChange?.(node));
			return () => {
				if ("isConnected" in node && node.isConnected) return;
				ref.current = null;
				onChange?.(null);
			};
		}
		ref(node);
		run(() => onChange?.(node));
		return () => {
			if ("isConnected" in node && node.isConnected) return;
			ref(null);
			onChange?.(null);
		};
	} };
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/attrs.js
var BitsAttrs = class {
	#variant;
	#prefix;
	attrs;
	constructor(config) {
		this.#variant = config.getVariant ? config.getVariant() : null;
		this.#prefix = this.#variant ? `data-${this.#variant}-` : `data-${config.component}-`;
		this.getAttr = this.getAttr.bind(this);
		this.selector = this.selector.bind(this);
		this.attrs = Object.fromEntries(config.parts.map((part) => [part, this.getAttr(part)]));
	}
	getAttr(part, variantOverride) {
		if (variantOverride) return `data-${variantOverride}-${part}`;
		return `${this.#prefix}${part}`;
	}
	selector(part, variantOverride) {
		return `[${this.getAttr(part, variantOverride)}]`;
	}
};
function createBitsAttrs(config) {
	const bitsAttrs = new BitsAttrs(config);
	return {
		...bitsAttrs.attrs,
		selector: bitsAttrs.selector,
		getAttr: bitsAttrs.getAttr
	};
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/animations-complete.js
var AnimationsComplete = class {
	#opts;
	#currentFrame = null;
	#observer = null;
	#runId = 0;
	constructor(opts) {
		this.#opts = opts;
	}
	#cleanup() {
		if (this.#currentFrame !== null) {
			window.cancelAnimationFrame(this.#currentFrame);
			this.#currentFrame = null;
		}
		this.#observer?.disconnect();
		this.#observer = null;
		this.#runId++;
	}
	run(fn) {
		this.#cleanup();
		const node = this.#opts.ref.current;
		if (!node) return;
		if (typeof node.getAnimations !== "function") {
			this.#executeCallback(fn);
			return;
		}
		const runId = this.#runId;
		const executeIfCurrent = () => {
			if (runId !== this.#runId) return;
			this.#executeCallback(fn);
		};
		const waitForAnimations = () => {
			if (runId !== this.#runId) return;
			const animations = node.getAnimations();
			if (animations.length === 0) {
				executeIfCurrent();
				return;
			}
			Promise.all(animations.map((animation) => animation.finished)).then(() => {
				executeIfCurrent();
			}).catch(() => {
				if (runId !== this.#runId) return;
				if (node.getAnimations().some((animation) => animation.pending || animation.playState !== "finished")) {
					waitForAnimations();
					return;
				}
				executeIfCurrent();
			});
		};
		const requestWaitForAnimations = () => {
			this.#currentFrame = window.requestAnimationFrame(() => {
				this.#currentFrame = null;
				waitForAnimations();
			});
		};
		if (!this.#opts.afterTick.current) {
			requestWaitForAnimations();
			return;
		}
		this.#currentFrame = window.requestAnimationFrame(() => {
			this.#currentFrame = null;
			const startingStyleAttr = "data-starting-style";
			if (!node.hasAttribute(startingStyleAttr)) {
				requestWaitForAnimations();
				return;
			}
			this.#observer = new MutationObserver(() => {
				if (runId !== this.#runId) return;
				if (node.hasAttribute(startingStyleAttr)) return;
				this.#observer?.disconnect();
				this.#observer = null;
				requestWaitForAnimations();
			});
			this.#observer.observe(node, {
				attributes: true,
				attributeFilter: [startingStyleAttr]
			});
		});
	}
	#executeCallback(fn) {
		const execute = () => {
			fn();
		};
		if (this.#opts.afterTick) afterTick(execute);
		else execute();
	}
};
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/create-id.js
function createId(prefixOrUid, uid) {
	return `bits-${prefixOrUid}`;
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
/**
* Generates a unique ID based on a global counter.
*/
function useId(prefix = "bits") {
	globalThis.bitsIdCounter.current++;
	return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/svelte-resize-observer.svelte.js
var sharedObserver = null;
var observedNodes = /* @__PURE__ */ new WeakMap();
function getSharedObserver() {
	sharedObserver ??= new ResizeObserver((entries) => {
		for (const entry of entries) {
			const callbacks = observedNodes.get(entry.target);
			if (!callbacks) continue;
			for (const callback of [...callbacks]) callback();
		}
	});
	return sharedObserver;
}
/**
* Observes `node` for size changes, returning a function that stops observing.
*
* Like a dedicated `ResizeObserver`, the callback fires once shortly after subscribing.
*/
function observeResize(node, callback) {
	let callbacks = observedNodes.get(node);
	if (callbacks === void 0) {
		callbacks = /* @__PURE__ */ new Set();
		observedNodes.set(node, callbacks);
		callbacks.add(callback);
		getSharedObserver().observe(node);
	} else {
		callbacks.add(callback);
		callback();
	}
	return () => {
		const current = observedNodes.get(node);
		if (!current) return;
		current.delete(callback);
		if (current.size) return;
		observedNodes.delete(node);
		sharedObserver?.unobserve(node);
	};
}
var SvelteResizeObserver = class {
	#node;
	#onResize;
	constructor(node, onResize) {
		this.#node = node;
		this.#onResize = onResize;
		this.handler = this.handler.bind(this);
	}
	handler() {
		let rAF = 0;
		const _node = this.#node();
		if (!_node) return;
		const unobserve = observeResize(_node, () => {
			cancelAnimationFrame(rAF);
			rAF = window.requestAnimationFrame(this.#onResize);
		});
		return () => {
			window.cancelAnimationFrame(rAF);
			unobserve();
		};
	}
};
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/utilities/presence-layer/presence.svelte.js
var Presence = class {
	opts;
	present;
	#afterAnimations;
	#isPresent = false;
	#hasMounted = false;
	#transitionStatus = void 0;
	#transitionFrame = null;
	constructor(opts) {
		this.opts = opts;
		this.present = this.opts.open;
		this.#isPresent = opts.open.current;
		this.#afterAnimations = new AnimationsComplete({
			ref: this.opts.ref,
			afterTick: this.opts.open
		});
		watch(() => this.present.current, (isOpen) => {
			if (!this.#hasMounted) {
				this.#hasMounted = true;
				return;
			}
			this.#clearTransitionFrame();
			if (isOpen) this.#isPresent = true;
			this.#transitionStatus = isOpen ? "starting" : "ending";
			if (isOpen) this.#transitionFrame = window.requestAnimationFrame(() => {
				this.#transitionFrame = null;
				if (this.present.current) this.#transitionStatus = void 0;
			});
			this.#afterAnimations.run(() => {
				if (isOpen !== this.present.current) return;
				if (!isOpen) this.#isPresent = false;
				this.#transitionStatus = void 0;
			});
		});
	}
	#_isPresent = derived(() => {
		return this.#isPresent;
	});
	get isPresent() {
		return this.#_isPresent();
	}
	set isPresent($$value) {
		return this.#_isPresent($$value);
	}
	get transitionStatus() {
		return this.#transitionStatus;
	}
	#clearTransitionFrame() {
		if (this.#transitionFrame === null) return;
		window.cancelAnimationFrame(this.#transitionFrame);
		this.#transitionFrame = null;
	}
};
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/utilities/presence-layer/presence-layer.svelte
function Presence_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open, forceMount, presence, ref } = $$props;
		const presenceState = new Presence({
			open: boxWith(() => open),
			ref
		});
		if (forceMount || open || presenceState.isPresent) {
			$$renderer.push("<!--[0-->");
			presence?.($$renderer, {
				present: presenceState.isPresent,
				transitionStatus: presenceState.transitionStatus
			});
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/clamp.js
/**
* Clamps a number between a minimum and maximum value.
*/
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/internal/state-machine.js
var StateMachine = class {
	state;
	#machine;
	constructor(initialState, machine) {
		this.state = simpleBox(initialState);
		this.#machine = machine;
		this.dispatch = this.dispatch.bind(this);
	}
	#reducer(event) {
		return this.#machine[this.state.current][event] ?? this.state.current;
	}
	dispatch(event) {
		this.state.current = this.#reducer(event);
	}
};
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/scroll-area.svelte.js
var scrollAreaAttrs = createBitsAttrs({
	component: "scroll-area",
	parts: [
		"root",
		"viewport",
		"corner",
		"thumb",
		"scrollbar"
	]
});
var ScrollAreaRootContext = new Context("ScrollArea.Root");
var ScrollAreaScrollbarContext = new Context("ScrollArea.Scrollbar");
var ScrollAreaScrollbarVisibleContext = new Context("ScrollArea.ScrollbarVisible");
var ScrollAreaScrollbarAxisContext = new Context("ScrollArea.ScrollbarAxis");
var ScrollAreaScrollbarSharedContext = new Context("ScrollArea.ScrollbarShared");
var ScrollAreaRootState = class ScrollAreaRootState {
	static create(opts) {
		return ScrollAreaRootContext.set(new ScrollAreaRootState(opts));
	}
	opts;
	attachment;
	scrollAreaNode = null;
	viewportNode = null;
	contentNode = null;
	scrollbarXNode = null;
	scrollbarYNode = null;
	cornerWidth = 0;
	cornerHeight = 0;
	scrollbarXEnabled = false;
	scrollbarYEnabled = false;
	domContext;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(opts.ref, (v) => this.scrollAreaNode = v);
		this.domContext = new DOMContext(opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		dir: this.opts.dir.current,
		style: {
			position: "relative",
			"--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
			"--bits-scroll-area-corner-width": `${this.cornerWidth}px`
		},
		[scrollAreaAttrs.root]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaViewportState = class ScrollAreaViewportState {
	static create(opts) {
		return new ScrollAreaViewportState(opts, ScrollAreaRootContext.get());
	}
	opts;
	root;
	attachment;
	#contentId = simpleBox(useId());
	#contentRef = simpleBox(null);
	contentAttachment = attachRef(this.#contentRef, (v) => this.root.contentNode = v);
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref, (v) => this.root.viewportNode = v);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		style: {
			overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
		},
		[scrollAreaAttrs.viewport]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	#contentProps = derived(() => ({
		id: this.#contentId.current,
		"data-scroll-area-content": "",
		style: { minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0 },
		...this.contentAttachment
	}));
	get contentProps() {
		return this.#contentProps();
	}
	set contentProps($$value) {
		return this.#contentProps($$value);
	}
};
var ScrollAreaScrollbarState = class ScrollAreaScrollbarState {
	static create(opts) {
		return ScrollAreaScrollbarContext.set(new ScrollAreaScrollbarState(opts, ScrollAreaRootContext.get()));
	}
	opts;
	root;
	#isHorizontal = derived(() => this.opts.orientation.current === "horizontal");
	get isHorizontal() {
		return this.#isHorizontal();
	}
	set isHorizontal($$value) {
		return this.#isHorizontal($$value);
	}
	hasThumb = false;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		watch(() => this.isHorizontal, (isHorizontal) => {
			if (isHorizontal) {
				this.root.scrollbarXEnabled = true;
				return () => {
					this.root.scrollbarXEnabled = false;
				};
			} else {
				this.root.scrollbarYEnabled = true;
				return () => {
					this.root.scrollbarYEnabled = false;
				};
			}
		});
	}
};
var ScrollAreaScrollbarHoverState = class ScrollAreaScrollbarHoverState {
	static create() {
		return new ScrollAreaScrollbarHoverState(ScrollAreaScrollbarContext.get());
	}
	scrollbar;
	root;
	isVisible = false;
	constructor(scrollbar) {
		this.scrollbar = scrollbar;
		this.root = scrollbar.root;
	}
	#props = derived(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaScrollbarScrollState = class ScrollAreaScrollbarScrollState {
	static create() {
		return new ScrollAreaScrollbarScrollState(ScrollAreaScrollbarContext.get());
	}
	scrollbar;
	root;
	machine = new StateMachine("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	#isHidden = derived(() => this.machine.state.current === "hidden");
	get isHidden() {
		return this.#isHidden();
	}
	set isHidden($$value) {
		return this.#isHidden($$value);
	}
	constructor(scrollbar) {
		this.scrollbar = scrollbar;
		this.root = scrollbar.root;
		useDebounce(() => this.machine.dispatch("SCROLL_END"), 100);
		this.onpointerenter = this.onpointerenter.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
	}
	onpointerenter(_) {
		this.machine.dispatch("POINTER_ENTER");
	}
	onpointerleave(_) {
		this.machine.dispatch("POINTER_LEAVE");
	}
	#props = derived(() => ({
		"data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaScrollbarAutoState = class ScrollAreaScrollbarAutoState {
	static create() {
		return new ScrollAreaScrollbarAutoState(ScrollAreaScrollbarContext.get());
	}
	scrollbar;
	root;
	isVisible = false;
	constructor(scrollbar) {
		this.scrollbar = scrollbar;
		this.root = scrollbar.root;
		const handleResize = () => {
			const viewportNode = this.root.viewportNode;
			if (!viewportNode) return;
			const isOverflowX = viewportNode.offsetWidth < viewportNode.scrollWidth;
			const isOverflowY = viewportNode.offsetHeight < viewportNode.scrollHeight;
			this.isVisible = this.scrollbar.isHorizontal ? isOverflowX : isOverflowY;
		};
		new SvelteResizeObserver(() => this.root.viewportNode, handleResize);
		new SvelteResizeObserver(() => this.root.contentNode, handleResize);
	}
	#props = derived(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaScrollbarVisibleState = class ScrollAreaScrollbarVisibleState {
	static create() {
		return ScrollAreaScrollbarVisibleContext.set(new ScrollAreaScrollbarVisibleState(ScrollAreaScrollbarContext.get()));
	}
	scrollbar;
	root;
	thumbNode = null;
	pointerOffset = 0;
	sizes = {
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	};
	#thumbRatio = derived(() => getThumbRatio(this.sizes.viewport, this.sizes.content));
	get thumbRatio() {
		return this.#thumbRatio();
	}
	set thumbRatio($$value) {
		return this.#thumbRatio($$value);
	}
	#hasThumb = derived(() => Boolean(this.thumbRatio > 0 && this.thumbRatio < 1));
	get hasThumb() {
		return this.#hasThumb();
	}
	set hasThumb($$value) {
		return this.#hasThumb($$value);
	}
	prevTransformStyle = "";
	constructor(scrollbar) {
		this.scrollbar = scrollbar;
		this.root = scrollbar.root;
	}
	setSizes(sizes) {
		this.sizes = sizes;
	}
	getScrollPosition(pointerPos, dir) {
		return getScrollPositionFromPointer({
			pointerPos,
			pointerOffset: this.pointerOffset,
			sizes: this.sizes,
			dir
		});
	}
	onThumbPointerUp() {
		this.pointerOffset = 0;
	}
	onThumbPointerDown(pointerPos) {
		this.pointerOffset = pointerPos;
	}
	xOnThumbPositionChange() {
		if (!(this.root.viewportNode && this.thumbNode)) return;
		const scrollPos = this.root.viewportNode.scrollLeft;
		const transformStyle = `translate3d(${getThumbOffsetFromScroll({
			scrollPos,
			sizes: this.sizes,
			dir: this.root.opts.dir.current
		})}px, 0, 0)`;
		this.thumbNode.style.transform = transformStyle;
		this.prevTransformStyle = transformStyle;
	}
	xOnWheelScroll(scrollPos) {
		if (!this.root.viewportNode) return;
		this.root.viewportNode.scrollLeft = scrollPos;
	}
	xOnDragScroll(pointerPos) {
		if (!this.root.viewportNode) return;
		this.root.viewportNode.scrollLeft = this.getScrollPosition(pointerPos, this.root.opts.dir.current);
	}
	yOnThumbPositionChange() {
		if (!(this.root.viewportNode && this.thumbNode)) return;
		const scrollPos = this.root.viewportNode.scrollTop;
		const transformStyle = `translate3d(0, ${getThumbOffsetFromScroll({
			scrollPos,
			sizes: this.sizes
		})}px, 0)`;
		this.thumbNode.style.transform = transformStyle;
		this.prevTransformStyle = transformStyle;
	}
	yOnWheelScroll(scrollPos) {
		if (!this.root.viewportNode) return;
		this.root.viewportNode.scrollTop = scrollPos;
	}
	yOnDragScroll(pointerPos) {
		if (!this.root.viewportNode) return;
		this.root.viewportNode.scrollTop = this.getScrollPosition(pointerPos, this.root.opts.dir.current);
	}
};
var ScrollAreaScrollbarXState = class ScrollAreaScrollbarXState {
	static create(opts) {
		return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarXState(opts, ScrollAreaScrollbarVisibleContext.get()));
	}
	opts;
	scrollbarVis;
	root;
	scrollbar;
	attachment;
	computedStyle;
	constructor(opts, scrollbarVis) {
		this.opts = opts;
		this.scrollbarVis = scrollbarVis;
		this.root = scrollbarVis.root;
		this.scrollbar = scrollbarVis.scrollbar;
		this.attachment = attachRef(this.scrollbar.opts.ref, (v) => this.root.scrollbarXNode = v);
	}
	onThumbPointerDown = (pointerPos) => {
		this.scrollbarVis.onThumbPointerDown(pointerPos.x);
	};
	onDragScroll = (pointerPos) => {
		this.scrollbarVis.xOnDragScroll(pointerPos.x);
	};
	onThumbPointerUp = () => {
		this.scrollbarVis.onThumbPointerUp();
	};
	onThumbPositionChange = () => {
		this.scrollbarVis.xOnThumbPositionChange();
	};
	onWheelScroll = (e, maxScrollPos) => {
		if (!this.root.viewportNode) return;
		const scrollPos = this.root.viewportNode.scrollLeft + e.deltaX;
		this.scrollbarVis.xOnWheelScroll(scrollPos);
		if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) e.preventDefault();
	};
	onResize = () => {
		if (!(this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle)) return;
		this.scrollbarVis.setSizes({
			content: this.root.viewportNode.scrollWidth,
			viewport: this.root.viewportNode.offsetWidth,
			scrollbar: {
				size: this.scrollbar.opts.ref.current.clientWidth,
				paddingStart: toInt(this.computedStyle.paddingLeft),
				paddingEnd: toInt(this.computedStyle.paddingRight)
			}
		});
	};
	#thumbSize = derived(() => {
		return getThumbSize(this.scrollbarVis.sizes);
	});
	get thumbSize() {
		return this.#thumbSize();
	}
	set thumbSize($$value) {
		return this.#thumbSize($$value);
	}
	#props = derived(() => ({
		id: this.scrollbar.opts.id.current,
		"data-orientation": "horizontal",
		style: {
			bottom: 0,
			left: this.root.opts.dir.current === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
			right: this.root.opts.dir.current === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
			"--bits-scroll-area-thumb-width": `${this.thumbSize}px`
		},
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaScrollbarYState = class ScrollAreaScrollbarYState {
	static create(opts) {
		return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarYState(opts, ScrollAreaScrollbarVisibleContext.get()));
	}
	opts;
	scrollbarVis;
	root;
	scrollbar;
	attachment;
	computedStyle;
	constructor(opts, scrollbarVis) {
		this.opts = opts;
		this.scrollbarVis = scrollbarVis;
		this.root = scrollbarVis.root;
		this.scrollbar = scrollbarVis.scrollbar;
		this.attachment = attachRef(this.scrollbar.opts.ref, (v) => this.root.scrollbarYNode = v);
		this.onThumbPointerDown = this.onThumbPointerDown.bind(this);
		this.onDragScroll = this.onDragScroll.bind(this);
		this.onThumbPointerUp = this.onThumbPointerUp.bind(this);
		this.onThumbPositionChange = this.onThumbPositionChange.bind(this);
		this.onWheelScroll = this.onWheelScroll.bind(this);
		this.onResize = this.onResize.bind(this);
	}
	onThumbPointerDown(pointerPos) {
		this.scrollbarVis.onThumbPointerDown(pointerPos.y);
	}
	onDragScroll(pointerPos) {
		this.scrollbarVis.yOnDragScroll(pointerPos.y);
	}
	onThumbPointerUp() {
		this.scrollbarVis.onThumbPointerUp();
	}
	onThumbPositionChange() {
		this.scrollbarVis.yOnThumbPositionChange();
	}
	onWheelScroll(e, maxScrollPos) {
		if (!this.root.viewportNode) return;
		const scrollPos = this.root.viewportNode.scrollTop + e.deltaY;
		this.scrollbarVis.yOnWheelScroll(scrollPos);
		if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) e.preventDefault();
	}
	onResize() {
		if (!(this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle)) return;
		this.scrollbarVis.setSizes({
			content: this.root.viewportNode.scrollHeight,
			viewport: this.root.viewportNode.offsetHeight,
			scrollbar: {
				size: this.scrollbar.opts.ref.current.clientHeight,
				paddingStart: toInt(this.computedStyle.paddingTop),
				paddingEnd: toInt(this.computedStyle.paddingBottom)
			}
		});
	}
	#thumbSize = derived(() => {
		return getThumbSize(this.scrollbarVis.sizes);
	});
	get thumbSize() {
		return this.#thumbSize();
	}
	set thumbSize($$value) {
		return this.#thumbSize($$value);
	}
	#props = derived(() => ({
		id: this.scrollbar.opts.id.current,
		"data-orientation": "vertical",
		style: {
			top: 0,
			right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
			left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
			bottom: "var(--bits-scroll-area-corner-height)",
			"--bits-scroll-area-thumb-height": `${this.thumbSize}px`
		},
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaScrollbarSharedState = class ScrollAreaScrollbarSharedState {
	static create() {
		return ScrollAreaScrollbarSharedContext.set(new ScrollAreaScrollbarSharedState(ScrollAreaScrollbarAxisContext.get()));
	}
	scrollbarState;
	root;
	scrollbarVis;
	scrollbar;
	rect = null;
	prevWebkitUserSelect = "";
	handleResize;
	handleThumbPositionChange;
	handleWheelScroll;
	handleThumbPointerDown;
	handleThumbPointerUp;
	#maxScrollPos = derived(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
	get maxScrollPos() {
		return this.#maxScrollPos();
	}
	set maxScrollPos($$value) {
		return this.#maxScrollPos($$value);
	}
	constructor(scrollbarState) {
		this.scrollbarState = scrollbarState;
		this.root = scrollbarState.root;
		this.scrollbarVis = scrollbarState.scrollbarVis;
		this.scrollbar = scrollbarState.scrollbarVis.scrollbar;
		this.handleResize = () => this.scrollbarState.onResize();
		this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange;
		this.handleWheelScroll = this.scrollbarState.onWheelScroll;
		this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown;
		this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp;
		new SvelteResizeObserver(() => this.scrollbar.opts.ref.current, this.handleResize);
		new SvelteResizeObserver(() => this.root.contentNode, this.handleResize);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
		this.onlostpointercapture = this.onlostpointercapture.bind(this);
	}
	handleDragScroll(e) {
		if (!this.rect) return;
		const x = e.clientX - this.rect.left;
		const y = e.clientY - this.rect.top;
		this.scrollbarState.onDragScroll({
			x,
			y
		});
	}
	#cleanupPointerState() {
		if (this.rect === null) return;
		this.root.domContext.getDocument().body.style.webkitUserSelect = this.prevWebkitUserSelect;
		if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "";
		this.rect = null;
	}
	onpointerdown(e) {
		if (e.button !== 0) return;
		e.target.setPointerCapture(e.pointerId);
		this.rect = this.scrollbar.opts.ref.current?.getBoundingClientRect() ?? null;
		this.prevWebkitUserSelect = this.root.domContext.getDocument().body.style.webkitUserSelect;
		this.root.domContext.getDocument().body.style.webkitUserSelect = "none";
		if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "auto";
		this.handleDragScroll(e);
	}
	onpointermove(e) {
		this.handleDragScroll(e);
	}
	onpointerup(e) {
		const target = e.target;
		if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
		this.#cleanupPointerState();
	}
	onlostpointercapture(_) {
		this.#cleanupPointerState();
	}
	#props = derived(() => mergeProps({
		...this.scrollbarState.props,
		style: {
			position: "absolute",
			...this.scrollbarState.props.style
		},
		[scrollAreaAttrs.scrollbar]: "",
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerup: this.onpointerup,
		onlostpointercapture: this.onlostpointercapture
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaThumbImplState = class ScrollAreaThumbImplState {
	static create(opts) {
		return new ScrollAreaThumbImplState(opts, ScrollAreaScrollbarSharedContext.get());
	}
	opts;
	scrollbarState;
	attachment;
	#root;
	#removeUnlinkedScrollListener;
	#debounceScrollEnd = useDebounce(() => {
		if (this.#removeUnlinkedScrollListener) {
			this.#removeUnlinkedScrollListener();
			this.#removeUnlinkedScrollListener = void 0;
		}
	}, 100);
	constructor(opts, scrollbarState) {
		this.opts = opts;
		this.scrollbarState = scrollbarState;
		this.#root = scrollbarState.root;
		this.attachment = attachRef(this.opts.ref, (v) => this.scrollbarState.scrollbarVis.thumbNode = v);
		this.onpointerdowncapture = this.onpointerdowncapture.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
	}
	onpointerdowncapture(e) {
		const thumb = e.target;
		if (!thumb) return;
		const thumbRect = thumb.getBoundingClientRect();
		const x = e.clientX - thumbRect.left;
		const y = e.clientY - thumbRect.top;
		this.scrollbarState.handleThumbPointerDown({
			x,
			y
		});
	}
	onpointerup(_) {
		this.scrollbarState.handleThumbPointerUp();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-state": this.scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
		style: {
			width: "var(--bits-scroll-area-thumb-width)",
			height: "var(--bits-scroll-area-thumb-height)",
			transform: this.scrollbarState.scrollbarVis.prevTransformStyle
		},
		onpointerdowncapture: this.onpointerdowncapture,
		onpointerup: this.onpointerup,
		[scrollAreaAttrs.thumb]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var ScrollAreaCornerImplState = class ScrollAreaCornerImplState {
	static create(opts) {
		return new ScrollAreaCornerImplState(opts, ScrollAreaRootContext.get());
	}
	opts;
	root;
	attachment;
	#width = 0;
	#height = 0;
	#hasSize = derived(() => Boolean(this.#width && this.#height));
	get hasSize() {
		return this.#hasSize();
	}
	set hasSize($$value) {
		return this.#hasSize($$value);
	}
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		new SvelteResizeObserver(() => this.root.scrollbarXNode, () => {
			const height = this.root.scrollbarXNode?.offsetHeight || 0;
			this.root.cornerHeight = height;
			this.#height = height;
		});
		new SvelteResizeObserver(() => this.root.scrollbarYNode, () => {
			const width = this.root.scrollbarYNode?.offsetWidth || 0;
			this.root.cornerWidth = width;
			this.#width = width;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		style: {
			width: this.#width,
			height: this.#height,
			position: "absolute",
			right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
			left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
			bottom: 0
		},
		[scrollAreaAttrs.corner]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
function toInt(value) {
	return value ? Number.parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
	const ratio = viewportSize / contentSize;
	return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
	const ratio = getThumbRatio(sizes.viewport, sizes.content);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
	return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer({ pointerPos, pointerOffset, sizes, dir = "ltr" }) {
	const thumbSizePx = getThumbSize(sizes);
	const thumbCenter = thumbSizePx / 2;
	const offset = pointerOffset || thumbCenter;
	const thumbOffsetFromEnd = thumbSizePx - offset;
	const minPointerPos = sizes.scrollbar.paddingStart + offset;
	const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
	const maxScrollPos = sizes.content - sizes.viewport;
	const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
	return linearScale([minPointerPos, maxPointerPos], scrollRange)(pointerPos);
}
function getThumbOffsetFromScroll({ scrollPos, sizes, dir = "ltr" }) {
	const thumbSizePx = getThumbSize(sizes);
	const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
	const scrollbar = sizes.scrollbar.size - scrollbarPadding;
	const maxScrollPos = sizes.content - sizes.viewport;
	const maxThumbPos = scrollbar - thumbSizePx;
	const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
	const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange[0], scrollClampRange[1]);
	return linearScale([0, maxScrollPos], [0, maxThumbPos])(scrollWithoutMomentum);
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
	return scrollPos > 0 && scrollPos < maxScrollPos;
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area.svelte
function Scroll_area$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { ref = null, id = createId(uid), type = "hover", dir = "ltr", scrollHideDelay = 600, children, child, $$slots, $$events, ...restProps } = $$props;
		const rootState = ScrollAreaRootState.create({
			type: boxWith(() => type),
			dir: boxWith(() => dir),
			scrollHideDelay: boxWith(() => scrollHideDelay),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-viewport.svelte
function Scroll_area_viewport($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { ref = null, id = createId(uid), children, $$slots, $$events, ...restProps } = $$props;
		const viewportState = ScrollAreaViewportState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, viewportState.props));
		const mergedContentProps = derived(() => mergeProps({}, viewportState.contentProps));
		$$renderer.push(`<div${attributes({ ...mergedProps() })}><div${attributes({ ...mergedContentProps() })}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-shared.svelte
function Scroll_area_scrollbar_shared($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { child, children, $$slots, $$events, ...restProps } = $$props;
		const scrollbarSharedState = ScrollAreaScrollbarSharedState.create();
		const mergedProps = derived(() => mergeProps(restProps, scrollbarSharedState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-x.svelte
function Scroll_area_scrollbar_x($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { $$slots, $$events, ...restProps } = $$props;
		const isMounted = new IsMounted();
		const scrollbarXState = ScrollAreaScrollbarXState.create({ mounted: boxWith(() => isMounted.current) });
		const mergedProps = derived(() => mergeProps(restProps, scrollbarXState.props));
		Scroll_area_scrollbar_shared($$renderer, spread_props([mergedProps()]));
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-y.svelte
function Scroll_area_scrollbar_y($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { $$slots, $$events, ...restProps } = $$props;
		const isMounted = new IsMounted();
		const scrollbarYState = ScrollAreaScrollbarYState.create({ mounted: boxWith(() => isMounted.current) });
		const mergedProps = derived(() => mergeProps(restProps, scrollbarYState.props));
		Scroll_area_scrollbar_shared($$renderer, spread_props([mergedProps()]));
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-visible.svelte
function Scroll_area_scrollbar_visible($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { $$slots, $$events, ...restProps } = $$props;
		if (ScrollAreaScrollbarVisibleState.create().scrollbar.opts.orientation.current === "horizontal") {
			$$renderer.push("<!--[0-->");
			Scroll_area_scrollbar_x($$renderer, spread_props([restProps]));
		} else {
			$$renderer.push("<!--[-1-->");
			Scroll_area_scrollbar_y($$renderer, spread_props([restProps]));
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-auto.svelte
function Scroll_area_scrollbar_auto($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { forceMount = false, $$slots, $$events, ...restProps } = $$props;
		const scrollbarAutoState = ScrollAreaScrollbarAutoState.create();
		const mergedProps = derived(() => mergeProps(restProps, scrollbarAutoState.props));
		{
			function presence($$renderer) {
				Scroll_area_scrollbar_visible($$renderer, spread_props([mergedProps()]));
			}
			Presence_layer($$renderer, {
				open: forceMount || scrollbarAutoState.isVisible,
				ref: scrollbarAutoState.scrollbar.opts.ref,
				presence});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-scroll.svelte
function Scroll_area_scrollbar_scroll($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { forceMount = false, $$slots, $$events, ...restProps } = $$props;
		const scrollbarScrollState = ScrollAreaScrollbarScrollState.create();
		const mergedProps = derived(() => mergeProps(restProps, scrollbarScrollState.props));
		{
			function presence($$renderer) {
				Scroll_area_scrollbar_visible($$renderer, spread_props([mergedProps()]));
			}
			Presence_layer($$renderer, spread_props([mergedProps(), {
				open: forceMount || !scrollbarScrollState.isHidden,
				ref: scrollbarScrollState.scrollbar.opts.ref,
				presence,
				$$slots: { presence: true }
			}]));
		}
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-hover.svelte
function Scroll_area_scrollbar_hover($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { forceMount = false, $$slots, $$events, ...restProps } = $$props;
		const scrollbarHoverState = ScrollAreaScrollbarHoverState.create();
		const scrollbarAutoState = ScrollAreaScrollbarAutoState.create();
		const mergedProps = derived(() => mergeProps(restProps, scrollbarHoverState.props, scrollbarAutoState.props, { "data-state": scrollbarHoverState.isVisible ? "visible" : "hidden" }));
		const open = derived(() => forceMount || scrollbarHoverState.isVisible && scrollbarAutoState.isVisible);
		{
			function presence($$renderer) {
				Scroll_area_scrollbar_visible($$renderer, spread_props([mergedProps()]));
			}
			Presence_layer($$renderer, {
				open: open(),
				ref: scrollbarAutoState.scrollbar.opts.ref,
				presence});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar.svelte
function Scroll_area_scrollbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { ref = null, id = createId(uid), orientation, $$slots, $$events, ...restProps } = $$props;
		const scrollbarState = ScrollAreaScrollbarState.create({
			orientation: boxWith(() => orientation),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const type = derived(() => scrollbarState.root.opts.type.current);
		if (type() === "hover") {
			$$renderer.push("<!--[0-->");
			Scroll_area_scrollbar_hover($$renderer, spread_props([restProps, { id }]));
		} else if (type() === "scroll") {
			$$renderer.push("<!--[1-->");
			Scroll_area_scrollbar_scroll($$renderer, spread_props([restProps, { id }]));
		} else if (type() === "auto") {
			$$renderer.push("<!--[2-->");
			Scroll_area_scrollbar_auto($$renderer, spread_props([restProps, { id }]));
		} else if (type() === "always") {
			$$renderer.push("<!--[3-->");
			Scroll_area_scrollbar_visible($$renderer, spread_props([restProps, { id }]));
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb-impl.svelte
function Scroll_area_thumb_impl($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, id, child, children, present, $$slots, $$events, ...restProps } = $$props;
		const isMounted = new IsMounted();
		const thumbState = ScrollAreaThumbImplState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			mounted: boxWith(() => isMounted.current)
		});
		const mergedProps = derived(() => mergeProps(restProps, thumbState.props, { style: { hidden: !present } }));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb.svelte
function Scroll_area_thumb($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, forceMount = false, $$slots, $$events, ...restProps } = $$props;
		const scrollbarState = ScrollAreaScrollbarVisibleContext.get();
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			{
				function presence($$renderer, { present }) {
					Scroll_area_thumb_impl($$renderer, spread_props([restProps, {
						id,
						present,
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}]));
				}
				Presence_layer($$renderer, {
					open: forceMount || scrollbarState.hasThumb,
					ref: scrollbarState.scrollbar.opts.ref,
					presence});
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner-impl.svelte
function Scroll_area_corner_impl($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, id, children, child, $$slots, $$events, ...restProps } = $$props;
		const cornerState = ScrollAreaCornerImplState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, cornerState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/.pnpm/bits-ui@2.19.5_@internation_6f1a9acfd75bdc2f1d142c2bc514302f/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner.svelte
function Scroll_area_corner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const scrollAreaState = ScrollAreaRootContext.get();
		const hasBothScrollbarsVisible = derived(() => Boolean(scrollAreaState.scrollbarXNode && scrollAreaState.scrollbarYNode));
		const hasCorner = derived(() => scrollAreaState.opts.type.current !== "scroll" && hasBothScrollbarsVisible());
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (hasCorner()) {
				$$renderer.push("<!--[0-->");
				Scroll_area_corner_impl($$renderer, spread_props([restProps, {
					id,
					get ref() {
						return ref;
					},
					set ref($$value) {
						ref = $$value;
						$$settled = false;
					}
				}]));
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/components/ui/scroll-area/scroll-area.svelte
function Scroll_area($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, viewportRef = null, class: className, orientation = "vertical", scrollbarClass = "", thumbClass = "", viewportClass = "", onscroll, children, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Scroll_area$1) {
				$$renderer.push("<!--[-->");
				Scroll_area$1($$renderer, spread_props([
					{ class: cn("relative overflow-hidden", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							if (Scroll_area_viewport) {
								$$renderer.push("<!--[-->");
								Scroll_area_viewport($$renderer, {
									onscroll,
									class: cn("h-full w-full rounded-[inherit]", viewportClass),
									get ref() {
										return viewportRef;
									},
									set ref($$value) {
										viewportRef = $$value;
										$$settled = false;
									},
									children: ($$renderer) => {
										children?.($$renderer);
										$$renderer.push(`<!---->`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Scroll_area_scrollbar) {
								$$renderer.push("<!--[-->");
								Scroll_area_scrollbar($$renderer, {
									orientation,
									class: cn("flex touch-none select-none transition-colors p-0 z-50 bg-[#e5e5e5]", orientation === "vertical" && "h-full w-1.5", orientation === "horizontal" && "h-1.5 flex-col", scrollbarClass),
									children: ($$renderer) => {
										if (Scroll_area_thumb) {
											$$renderer.push("<!--[-->");
											Scroll_area_thumb($$renderer, { class: cn("relative w-full flex-1 transition-colors rounded-none bg-black hover:bg-neutral-800", thumbClass) });
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Scroll_area_corner) {
								$$renderer.push("<!--[-->");
								Scroll_area_corner($$renderer, {});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			viewportRef
		});
	});
}
//#endregion
//#region src/lib/components/layout/Navbar.svelte
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isLangOpen = false;
		let selectedLang = "Indonesia (ID)";
		let selectedShort = "ID";
		let isLightTopPage = derived(() => page.data?.mode === "article" || Boolean(page.data?.article) || page.url.pathname.startsWith("/cookie-statement") || page.url.pathname.startsWith("/privacy") || page.url.pathname.startsWith("/terms-conditions"));
		let isScrolled = derived(() => isLightTopPage());
		const productCategories = [
			{
				title: "Laser Cutting",
				desc: "Akrilik, Kayu, MDF, ACP",
				href: "/produk/laser"
			},
			{
				title: "Indoor Printing",
				desc: "Sticker, Banner, Display",
				href: "/produk/indoor"
			},
			{
				title: "UV Printing",
				desc: "Flatbed & Cylinder",
				href: "/produk/uv"
			},
			{
				title: "Sublimasi",
				desc: "Textile & Fashion",
				href: "/produk/sublimasi"
			},
			{
				title: "CNC Router",
				desc: "Fabrikasi & Woodworking",
				href: "/produk/cnc"
			},
			{
				title: "DTF",
				desc: "Custom Apparel & Film",
				href: "/produk/dtf"
			},
			{
				title: "DTG",
				desc: "Direct to Kaos & Kain",
				href: "/produk/dtg"
			},
			{
				title: "Outdoor Printing",
				desc: "Spanduk, Baliho, Billboard",
				href: "/produk/outdoor"
			}
		];
		const secondaryNavLinks = [
			{
				name: "Discover ORIA",
				href: "/tentang"
			},
			{
				name: "Katalog Semua Mesin",
				href: "/produk"
			},
			{
				name: "Artikel & Wawasan",
				href: "/artikel"
			},
			{
				name: "Kontak & Showroom",
				href: "/kontak"
			}
		];
		let isTentang = derived(() => page.url.pathname === "/tentang");
		let isProductDetail = derived(() => page.url.pathname.startsWith("/produk/") && page.url.pathname.split("/").filter(Boolean).length >= 3);
		let isArticleDetail = derived(() => page.data?.mode === "article" || Boolean(page.data?.article));
		let isArtikelCategory = derived(() => page.url.pathname.startsWith("/artikel/") && page.url.pathname.replace(/\/+$/, "") !== "/artikel" && !isArticleDetail());
		let hasSubNav = derived(() => isTentang() || isProductDetail() || isArtikelCategory());
		const tentangSubNavItems = [
			{
				id: "oria-story",
				label: "STORY"
			},
			{
				id: "our-legacy",
				label: "LEGACY"
			},
			{
				id: "our-machines",
				label: "MACHINES"
			},
			{
				id: "our-core",
				label: "CORE"
			},
			{
				id: "standar-rekayasa",
				label: "ENGINEERING"
			},
			{
				id: "kapasitas-layanan",
				label: "CAPACITY"
			},
			{
				id: "visi-dedikasi",
				label: "DEDICATION"
			},
			{
				id: "showroom",
				label: "SHOWROOM"
			}
		];
		let currentProductSubNavItems = derived(() => {
			if (Boolean(page.data?.product?.galleryUrls && page.data.product.galleryUrls.length > 0)) return [
				{
					id: "overview",
					label: "OVERVIEW"
				},
				{
					id: "story",
					label: "STORY"
				},
				{
					id: "gallery",
					label: "GALLERY"
				},
				{
					id: "spec",
					label: "SPEC"
				}
			];
			return [
				{
					id: "overview",
					label: "OVERVIEW"
				},
				{
					id: "story",
					label: "STORY"
				},
				{
					id: "spec",
					label: "SPEC"
				}
			];
		});
		const artikelSubNavItems = [
			{
				id: "digital-print",
				label: "DIGITAL PRINT",
				href: "/artikel/digital-print"
			},
			{
				id: "business",
				label: "BUSINESS",
				href: "/artikel/business"
			},
			{
				id: "insight",
				label: "INSIGHT",
				href: "/artikel/insight"
			},
			{
				id: "product",
				label: "PRODUCT",
				href: "/artikel/product"
			},
			{
				id: "trivia",
				label: "TRIVIA",
				href: "/artikel/trivia"
			}
		];
		let currentSubNavItems = derived(() => isProductDetail() ? currentProductSubNavItems() : isTentang() ? tentangSubNavItems : []);
		let activeSection = "overview";
		if (hasSubNav()) {
			$$renderer.push(`<!--[0--><header class="w-full fixed top-0 left-0 z-40 pointer-events-auto bg-transparent"><div${attr_class(`relative w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-10 lg:px-16 transition-colors duration-300 ${isScrolled() ? "bg-black shadow-lg" : "bg-transparent"}`)}><div class="relative z-50"><button type="button" class="flex items-center gap-2 text-white hover:text-[#FFE500] transition-colors cursor-pointer group focus:outline-none" aria-haspopup="listbox"${attr("aria-expanded", isLangOpen)} aria-label="Pilih Bahasa"><span class="text-xs font-semibold tracking-wider hidden sm:inline">${escape_html(selectedLang)}</span> <span class="text-xs font-semibold tracking-wider sm:hidden">${escape_html(selectedShort)}</span> <div class="w-6 h-6 border border-[#FFE500] flex items-center justify-center text-[#FFE500] group-hover:bg-[#FFE500] group-hover:text-black transition-colors"><svg${attr_class(`w-3.5 h-3.5 stroke-current transition-transform duration-200 `)} fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></div></button> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"><a href="/" class="flex items-center justify-center hover:opacity-90 transition-opacity select-none focus:outline-none py-1"><img src="/images/oria-logo-hd.png" alt="Logo ORIA" class="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"/></a></div> <div class="relative z-50"><button type="button" class="text-white p-2 hover:text-[#FFE500] focus:outline-none cursor-pointer transition-colors group flex items-center justify-center drop-shadow-md" aria-label="Buka Menu Navigasi"><div class="flex flex-col items-end gap-1.5 w-6 sm:w-7"><span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span> <span class="block w-4/5 h-[2px] bg-white group-hover:w-full group-hover:bg-[#FFE500] transition-all"></span> <span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span></div></button></div></div> <div${attr_class(`w-full h-11 sm:h-12 flex items-center overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain transition-colors duration-300 ${isScrolled() ? "bg-black" : "bg-transparent hover:bg-black"}`)}><div${attr_class(`min-w-full w-max flex items-center px-4 sm:px-10 lg:px-16 ${isProductDetail() ? "justify-center" : "md:justify-center"}`)}><nav${attr("aria-label", isProductDetail() ? "Navigasi Detail Produk" : isArtikelCategory() ? "Navigasi Kategori Artikel" : "Navigasi Halaman Tentang")} class="flex items-center gap-6 sm:gap-8 md:gap-10 shrink-0">`);
			if (isArtikelCategory()) {
				$$renderer.push(`<!--[0--><!--[-->`);
				const each_array_1 = ensure_array_like(artikelSubNavItems);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let item = each_array_1[$$index_1];
					const activeCatSlug = page.data?.category?.id || (page.data?.article?.category ? page.data.article.category.toLowerCase().trim().replace(/\s+/g, "-") : "");
					const isActive = page.url.pathname.startsWith(item.href) || activeCatSlug === item.id;
					$$renderer.push(`<a${attr("href", item.href)}${attr_class(`flex items-center text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 focus:outline-none border-none bg-transparent hover:bg-transparent py-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] ${isActive ? "text-[#FFE500] font-bold" : "text-white hover:text-[#FFE500]"}`)}><span>${escape_html(item.label)}</span></a>`);
				}
				$$renderer.push(`<!--]-->`);
			} else {
				$$renderer.push(`<!--[-1--><!--[-->`);
				const each_array_2 = ensure_array_like(currentSubNavItems());
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let item = each_array_2[$$index_2];
					$$renderer.push(`<a${attr("href", `#${stringify(item.id)}`)}${attr_class(`flex items-center text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 focus:outline-none border-none bg-transparent hover:bg-transparent py-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] ${activeSection === item.id ? "text-[#FFE500] font-bold" : "text-white hover:text-[#FFE500]"}`)}><span>${escape_html(item.label)}</span></a>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--> `);
			if (!isProductDetail()) $$renderer.push(`<!--[0--><span class="w-2 md:hidden shrink-0 inline-block pointer-events-none" aria-hidden="true"></span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></nav></div></div></header>`);
		} else {
			$$renderer.push(`<!--[-1--><header${attr_class(`w-full fixed top-0 left-0 z-40 transition-colors duration-300 pointer-events-auto ${isScrolled() ? "bg-black shadow-lg border-b border-white/10" : "bg-transparent border-b border-transparent"}`)}><div class="relative w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-10 lg:px-16"><div class="relative z-50"><button type="button" class="flex items-center gap-2 text-white hover:text-[#FFE500] transition-colors cursor-pointer group focus:outline-none" aria-haspopup="listbox"${attr("aria-expanded", isLangOpen)} aria-label="Pilih Bahasa"><span class="text-xs font-semibold tracking-wider hidden sm:inline">${escape_html(selectedLang)}</span> <span class="text-xs font-semibold tracking-wider sm:hidden">${escape_html(selectedShort)}</span> <div class="w-6 h-6 border border-[#FFE500] flex items-center justify-center text-[#FFE500] group-hover:bg-[#FFE500] group-hover:text-black transition-colors"><svg${attr_class(`w-3.5 h-3.5 stroke-current transition-transform duration-200 `)} fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></div></button> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"><a href="/" class="flex items-center justify-center hover:opacity-90 transition-opacity select-none focus:outline-none py-1"><img src="/images/oria-logo-hd.png" alt="Logo ORIA" class="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"/></a></div> <div class="relative z-50"><button type="button" class="text-white p-2 hover:text-[#FFE500] focus:outline-none cursor-pointer transition-colors group flex items-center justify-center drop-shadow-md" aria-label="Buka Menu Navigasi"><div class="flex flex-col items-end gap-1.5 w-6 sm:w-7"><span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span> <span class="block w-4/5 h-[2px] bg-white group-hover:w-full group-hover:bg-[#FFE500] transition-all"></span> <span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span></div></button></div></div></header>`);
		}
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <aside${attr_class(`fixed top-0 right-0 h-full z-50 w-[75vw] sm:w-[65vw] md:w-[65vw] lg:w-[48vw] xl:w-[40vw] bg-[#FFE500] text-black flex flex-col justify-between transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl border-l border-black/15 p-6 sm:p-10 lg:p-12 translate-x-full`)} aria-label="Menu Navigasi Utama"${attr("aria-hidden", true)}><div class="flex items-center justify-between pb-5 border-b border-black/15 flex-shrink-0"><a href="/" class="flex items-center"><img src="/images/oria-logo-hd.png" alt="Logo ORIA" class="h-6 sm:h-7 w-auto object-contain brightness-0"/></a> <button type="button" class="w-10 h-10 rounded-full flex items-center justify-center text-black/70 hover:text-black hover:bg-black/10 transition-colors cursor-pointer focus:outline-none" aria-label="Tutup Menu"><svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="flex-1 my-4 overflow-hidden">`);
		Scroll_area($$renderer, {
			class: "h-full w-full pr-3 sm:pr-4",
			scrollbarClass: "bg-black/10",
			thumbClass: "bg-black/25 hover:bg-black/45",
			children: ($$renderer) => {
				$$renderer.push(`<div class="py-4 flex flex-col gap-3 sm:gap-4"><div class="font-sans font-bold text-[10px] uppercase tracking-[0.25em] text-black/60 mb-1">Lini Mesin Industrial</div> <!--[-->`);
				const each_array_4 = ensure_array_like(productCategories);
				for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
					let cat = each_array_4[$$index_4];
					$$renderer.push(`<a${attr("href", cat.href)} class="group flex items-center justify-between text-lg sm:text-2xl lg:text-[1.55rem] font-heading font-black uppercase tracking-[0.14em] text-black hover:text-black/60 transition-colors py-1 sm:py-1.5"><span class="group-hover:translate-x-1 transition-transform duration-300">${escape_html(cat.title)}</span> <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-300 group-hover:translate-x-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></a>`);
				}
				$$renderer.push(`<!--]--> <div class="h-px bg-black/15 my-4 sm:my-5"></div> <div class="flex flex-col gap-2 sm:gap-2.5"><!--[-->`);
				const each_array_5 = ensure_array_like(secondaryNavLinks);
				for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
					let link = each_array_5[$$index_5];
					$$renderer.push(`<a${attr("href", link.href)} class="group flex items-center justify-between text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-black/80 hover:text-black transition-colors py-1"><span class="group-hover:translate-x-1 transition-transform duration-300">${escape_html(link.name)}</span> <svg class="w-3.5 h-3.5 stroke-current transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></a>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <div class="border-t border-black/15 pt-5 flex flex-col gap-2.5 text-xs tracking-wider text-black/80 font-sans flex-shrink-0"><a href="/kontak" class="flex items-center gap-2.5 text-black hover:text-black/60 transition-colors uppercase font-semibold"><svg class="w-4 h-4 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> <span>Showroom Surabaya</span></a> <a href="https://wa.me/6281252086455" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 text-black hover:text-black/60 transition-colors uppercase font-semibold"><svg class="w-4 h-4 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> <span>WhatsApp: +62 812-5208-6455</span></a></div></aside>`);
	});
}
//#endregion
//#region src/lib/components/layout/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<footer class="w-full bg-black text-white pt-16 sm:pt-20 lg:pt-24 pb-0 select-none px-6 sm:px-10 lg:px-16"><div class="relative w-full max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24"><div class="w-full border-t border-[#FFE500]"></div> <div class="absolute left-1/2 -translate-x-1/2 -top-9 sm:-top-11 z-20"><a href="/" class="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#FFE500] border-2 border-black/40 flex items-center justify-center p-3.5 sm:p-4 shadow-[0_0_35px_rgba(255,229,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none" aria-label="ORIA Home &amp; Kembali ke Atas"><img src="/images/oria-logo-hd.png" alt="ORIA" class="w-full h-auto object-contain brightness-0 group-hover:scale-105 transition-transform duration-300"/></a></div></div> <div class="max-w-7xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-16 sm:pb-20"><div class="md:col-span-5 lg:col-span-5 flex flex-col justify-end"><div class="flex items-center gap-3 sm:gap-4"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none" aria-label="Facebook ORIA"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none" aria-label="Instagram ORIA"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a> <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none" aria-label="X ORIA"><svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none" aria-label="YouTube ORIA"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg></a></div></div> <div class="md:col-span-3 lg:col-span-3 space-y-4"><h4 class="font-heading font-bold text-sm sm:text-base uppercase tracking-[0.22em] text-[#FFE500]">MODELS</h4> <ul class="space-y-2.5 font-sans text-sm sm:text-[15px] text-neutral-300"><li><a href="/produk/uv/oria-uv-flatbed-a3" class="hover:text-[#FFE500] transition-colors">ORIA UV Flatbed A3</a></li> <li><a href="/produk/sublimasi/oria-sublim-1902" class="hover:text-[#FFE500] transition-colors">ORIA Sublimasi 1902</a></li> <li><a href="/produk/laser/oria-laser-cutting-6040" class="hover:text-[#FFE500] transition-colors">ORIA Laser Cutting 6040</a></li> <li><a href="/produk/dtf/oria-dtf-6004" class="hover:text-[#FFE500] transition-colors">ORIA DTF 6004 Industrial</a></li> <li><a href="/produk/dtg/oria-dtg-or-dtg02" class="hover:text-[#FFE500] transition-colors">ORIA DTG OR-DTG02</a></li> <li><a href="/produk/outdoor/oria-outdoor-3204-st" class="hover:text-[#FFE500] transition-colors">ORIA Outdoor 3204</a></li> <li><a href="/produk/indoor/oria-indoor-3202" class="hover:text-[#FFE500] transition-colors">ORIA Indoor 3202</a></li> <li><a href="/produk/cnc/oria-cnc-router-1325" class="hover:text-[#FFE500] transition-colors">ORIA CNC Router 1325</a></li></ul></div> <div class="md:col-span-4 lg:col-span-4 space-y-4"><h4 class="font-heading font-bold text-sm sm:text-base uppercase tracking-[0.22em] text-[#FFE500]">ABOUT ORIA</h4> <ul class="space-y-2.5 font-sans text-sm sm:text-[15px] text-neutral-300"><li><a href="/tentang" class="hover:text-[#FFE500] transition-colors">Tentang ORIA</a></li> <li><a href="/tentang" class="hover:text-[#FFE500] transition-colors">Standar Rekayasa Presisi</a></li> <li><a href="/kontak" class="hover:text-[#FFE500] transition-colors">Showroom &amp; Workshop</a></li> <li><a href="/artikel" class="hover:text-[#FFE500] transition-colors">Artikel &amp; Wawasan Industri</a></li> <li><a href="/kontak" class="hover:text-[#FFE500] transition-colors">Layanan Garansi &amp; Teknisi Resmi</a></li></ul></div></div></div> <div class="max-w-7xl mx-auto"><div class="border-t border-[#FFE500] py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-400"><div class="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8"><a href="/terms-conditions" class="hover:text-white transition-colors">Terms and Conditions</a> <a href="/privacy" class="hover:text-white transition-colors">Privacy Notice</a> <a href="/cookie-statement" class="hover:text-white transition-colors">Cookie Statement</a></div> <div class="relative"><button type="button" class="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group focus:outline-none" aria-haspopup="listbox"${attr("aria-expanded", false)} aria-label="Pilih Bahasa"><span class="text-xs">${escape_html("Indonesia (ID)")}</span> <div class="w-6 h-6 border border-[#FFE500] flex items-center justify-center text-[#FFE500] group-hover:bg-[#FFE500] group-hover:text-black transition-colors"><svg${attr_class(`w-3.5 h-3.5 stroke-current transition-transform duration-200 `)} fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></div></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></div> <div id="google_translate_element" class="hidden" style="display:none;" aria-hidden="true"></div></footer>`);
	});
}
//#endregion
//#region src/lib/components/layout/PageTransition.svelte
function PageTransition($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isVisible = false;
		let hideTimer = null;
		function clearHideTimer() {
			if (hideTimer) {
				clearTimeout(hideTimer);
				hideTimer = null;
			}
		}
		beforeNavigate(({ to, from, willUnload }) => {
			if (willUnload || !to?.url) return;
			if (from?.url && to.url.pathname === from.url.pathname && to.url.search === from.url.search) return;
			clearHideTimer();
			isVisible = true;
		});
		afterNavigate(() => {
			if (!isVisible) return;
			clearHideTimer();
			hideTimer = setTimeout(() => {
				isVisible = false;
			}, 80);
		});
		$$renderer.push(`<div${attr_class(`fixed inset-0 z-[100] pointer-events-none select-none bg-[#FFE500] flex items-center justify-center transition-opacity duration-200 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`)} aria-hidden="true"><img src="/images/oria-logo-hd.png" alt="ORIA" class="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-0 pointer-events-none select-none"/></div>`);
	});
}
//#endregion
//#region src/lib/assets/favicon.png
var favicon_default = "/_app/immutable/assets/favicon.J3M9BeI4.png";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		let viewportEl = null;
		function handleScroll(e) {
			const target = e.target;
			if (target && typeof window !== "undefined") window.dispatchEvent(new CustomEvent("layout-scroll", { detail: { scrollY: target.scrollTop } }));
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("12qhfyh", $$renderer, ($$renderer) => {
				$$renderer.push(`<link rel="icon" type="image/png"${attr("href", favicon_default)}/> <link rel="apple-touch-icon" href="/images/oria-logo-hd.png"/>`);
			});
			PageTransition($$renderer);
			$$renderer.push(`<!----> `);
			Scroll_area($$renderer, {
				class: "h-[100svh] w-full",
				viewportClass: "h-full w-full",
				onscroll: handleScroll,
				get viewportRef() {
					return viewportEl;
				},
				set viewportRef($$value) {
					viewportEl = $$value;
					$$settled = false;
				},
				children: ($$renderer) => {
					$$renderer.push(`<div class="min-h-screen flex flex-col bg-[#050508] text-white font-sans relative">`);
					Navbar($$renderer);
					$$renderer.push(`<!----> <main${attr_class(`flex-1 w-full ${page.url.pathname === "/" || page.url.pathname === "/tentang" || page.url.pathname.startsWith("/produk") || page.url.pathname.startsWith("/artikel") || page.url.pathname === "/kontak" || page.status && page.status >= 400 ? "" : "pt-16 sm:pt-20"}`)}>`);
					children($$renderer);
					$$renderer.push(`<!----></main> `);
					Footer($$renderer);
					$$renderer.push(`<!----></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-B15wHKBd.js.map
