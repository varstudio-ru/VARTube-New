(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["S123Core"] = factory();
	else
		root["S123Core"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/lodash_get.js":
/*!*******************************!*\
  !*** ./plugins/lodash_get.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = "Expected a function";

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = "__lodash_hash_undefined__";

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = "[object Function]",
  genTag = "[object GeneratorFunction]",
  symbolTag = "[object Symbol]";

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  reIsPlainProp = /^\w*$/,
  reLeadingDot = /^\./,
  rePropName =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal =
  typeof __webpack_require__.g == "object" && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf =
  typeof self == "object" && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function("return this")();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != "function") {
    try {
      result = !!(value + "");
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
  funcProto = Function.prototype,
  objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root["__core-js_shared__"];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function () {
  var uid = /[^.]+$/.exec(
    (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || "",
  );
  return uid ? "Symbol(src)_1." + uid : "";
})();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp(
  "^" +
    funcToString
      .call(hasOwnProperty)
      .replace(reRegExpChar, "\\$&")
      .replace(
        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
        "$1.*?",
      ) +
    "$",
);

/** Built-in value references. */
var Symbol = root.Symbol,
  splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, "Map"),
  nativeCreate = getNative(Object, "create");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate
    ? data[key] !== undefined
    : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
    index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash(),
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)["delete"](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
    length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern =
    isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == "string") {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == "string" ? "string" : "hash"]
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (
    type == "number" ||
    type == "symbol" ||
    type == "boolean" ||
    value == null ||
    isSymbol(value)
  ) {
    return true;
  }
  return (
    reIsPlainProp.test(value) ||
    !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
  );
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == "string" ||
    type == "number" ||
    type == "symbol" ||
    type == "boolean"
    ? value !== "__proto__"
    : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function (string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push("");
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + "";
    } catch (e) {}
  }
  return "";
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (
    typeof func != "function" ||
    (resolver && typeof resolver != "function")
  ) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function () {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : "";
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == "object";
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (
    typeof value == "symbol" ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag)
  );
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? "" : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (get);


/***/ }),

/***/ "./src/Core/changeable.ts":
/*!********************************!*\
  !*** ./src/Core/changeable.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Changeable = void 0;
class Changeable {
    UpdateFrom(data) {
        const keys = Object.keys(this);
        for (const key of keys) {
            if (data.hasOwnProperty(key)) {
                if (typeof this[key] == "object" &&
                    data[key] != null &&
                    this[key] instanceof Changeable) {
                    this[key].UpdateFrom(data[key]);
                }
                else {
                    this[key] = data[key];
                }
            }
        }
    }
}
exports.Changeable = Changeable;


/***/ }),

/***/ "./src/Environment/environment.ts":
/*!****************************************!*\
  !*** ./src/Environment/environment.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldSettingsFactory = exports.LightSettingsFactory = exports.GroundedSkyboxSettingsFactory = exports.BackgroundSettingsFactory = exports.EnvironmentSettingsFactory = exports.DEFAULT_BACKGROUND_COLOR = exports.ENVMAP_RESOLUTIONS = void 0;
const utils_1 = __webpack_require__(/*! ../Project/utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
exports.ENVMAP_RESOLUTIONS = ["1k", "2k", "4k", "8k"];
exports.DEFAULT_BACKGROUND_COLOR = "#e6e6e6";
class EnvironmentSettingsFactory {
    static CreateNew() {
        return {
            type: "default",
            name: "",
            customId: -1,
            resolution: "1k",
            rotation: new math_1.Quaternion(0, 0, 0, 1),
            intensity: 1
        };
    }
    static Create(raw) {
        return {
            type: raw[(0, utils_1.nameof)('type')] || "default",
            name: raw[(0, utils_1.nameof)('name')] || "",
            customId: raw[(0, utils_1.nameof)('customId')] || -1,
            resolution: raw[(0, utils_1.nameof)('resolution')] || "1k",
            rotation: raw[(0, utils_1.nameof)('rotation')] ? new math_1.Quaternion(raw[(0, utils_1.nameof)('rotation')]) : new math_1.Quaternion(0, 0, 0, 1),
            intensity: raw[(0, utils_1.nameof)('intensity')] || 1
        };
    }
}
exports.EnvironmentSettingsFactory = EnvironmentSettingsFactory;
class BackgroundSettingsFactory {
    static CreateNew() {
        return {
            type: "color",
            blurriness: 0,
            color: exports.DEFAULT_BACKGROUND_COLOR,
            imageId: ""
        };
    }
    static Create(raw) {
        return {
            type: raw[(0, utils_1.nameof)('type')] || "color",
            blurriness: raw[(0, utils_1.nameof)('blurriness')] || 0,
            color: raw[(0, utils_1.nameof)('color')] || exports.DEFAULT_BACKGROUND_COLOR,
            imageId: raw[(0, utils_1.nameof)('imageId')] || ""
        };
    }
}
exports.BackgroundSettingsFactory = BackgroundSettingsFactory;
class GroundedSkyboxSettingsFactory {
    static CreateNew() {
        return {
            isEnabled: false,
            height: 1.5,
            radius: 3
        };
    }
    static Create(raw) {
        return {
            isEnabled: Boolean(raw[(0, utils_1.nameof)('isEnabled')]),
            height: raw[(0, utils_1.nameof)('height')] || 1.5,
            radius: raw[(0, utils_1.nameof)('radius')] || 3
        };
    }
}
exports.GroundedSkyboxSettingsFactory = GroundedSkyboxSettingsFactory;
class LightSettingsFactory {
    static CreateNew() {
        return {
            intensity: 1,
            isOn: false,
            rotation: new math_1.Quaternion(0, 0, 0, 1),
            color: "#ffffff"
        };
    }
    static Create(raw) {
        var _a;
        return {
            intensity: raw[(0, utils_1.nameof)('intensity')] || 1,
            isOn: Boolean((_a = raw[(0, utils_1.nameof)('isOn')]) !== null && _a !== void 0 ? _a : false),
            rotation: raw[(0, utils_1.nameof)('rotation')] ? new math_1.Quaternion(raw[(0, utils_1.nameof)('rotation')]) : new math_1.Quaternion(0, 0, 0, 1),
            color: raw[(0, utils_1.nameof)('color')] || "#ffffff"
        };
    }
}
exports.LightSettingsFactory = LightSettingsFactory;
class WorldSettingsFactory {
    static CreateNew() {
        return {
            environment: EnvironmentSettingsFactory.CreateNew(),
            background: BackgroundSettingsFactory.CreateNew(),
            groundedSkybox: GroundedSkyboxSettingsFactory.CreateNew(),
            light: LightSettingsFactory.CreateNew()
        };
    }
    static Create(raw) {
        return {
            environment: EnvironmentSettingsFactory.Create(raw[(0, utils_1.nameof)('environment')] || {}),
            background: BackgroundSettingsFactory.Create(raw[(0, utils_1.nameof)('background')] || {}),
            groundedSkybox: GroundedSkyboxSettingsFactory.Create(raw[(0, utils_1.nameof)('groundedSkybox')] || {}),
            light: LightSettingsFactory.Create(raw[(0, utils_1.nameof)('light')] || {})
        };
    }
    static PrepareForFrontend(worldSettings) {
        let result = WorldSettingsFactory.Create(worldSettings);
        result.light.rotation = result.light.rotation.toRH();
        result.environment.rotation = result.environment.rotation.toRH();
        return result;
    }
}
exports.WorldSettingsFactory = WorldSettingsFactory;


/***/ }),

/***/ "./src/MeshUtils/batching.ts":
/*!***********************************!*\
  !*** ./src/MeshUtils/batching.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Batching = void 0;
const generator_1 = __webpack_require__(/*! ./generator */ "./src/MeshUtils/generator.ts");
const product_parts_1 = __webpack_require__(/*! ../Product/product_parts */ "./src/Product/product_parts.ts");
const filesystem_1 = __webpack_require__(/*! ../filesystem */ "./src/filesystem.ts");
var Batching;
(function (Batching) {
    var MergedMesh = generator_1.Generator.MergedMesh;
    class Batch {
        constructor(geometry, material) {
            this.geometry = geometry;
            this.material = material;
        }
        GenerateFrontendData() {
            const result = product_parts_1.GeometryPartFactory.CreateNew();
            result.type = product_parts_1.ProductPartType.Geometry;
            result.geometry = filesystem_1.Filesystem.Cache.GetCachedItem(this.geometry).id;
            result.material = filesystem_1.Filesystem.Cache.GetCachedItem(this.material).id;
            return result;
        }
    }
    Batching.Batch = Batch;
    class BatchCollection {
        constructor() {
            this.elements = {};
        }
        CreateOrUpdateBatchByMaterial(name, geometry, material) {
            let result;
            let pair = Object.entries(this.elements).find((e) => e[1].material.GetHashCode() == material.GetHashCode());
            if (pair == null) {
                result = new Batch(geometry, material);
                this.elements[name] = result;
            }
            else {
                result = pair[1];
                result.geometry = new MergedMesh(result.geometry, geometry);
                this.elements[pair[0] + "_" + name] = result;
                delete this.elements[pair[0]];
            }
            return result;
        }
        UpdateFrontendData(target) {
            for (let name in this.elements)
                target.children[name] = this.elements[name].GenerateFrontendData();
        }
    }
    Batching.BatchCollection = BatchCollection;
})(Batching || (exports.Batching = Batching = {}));


/***/ }),

/***/ "./src/MeshUtils/generator.ts":
/*!************************************!*\
  !*** ./src/MeshUtils/generator.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Generator = void 0;
const unwrapper_1 = __webpack_require__(/*! ./unwrapper */ "./src/MeshUtils/unwrapper.ts");
const filesystem_1 = __webpack_require__(/*! ../filesystem */ "./src/filesystem.ts");
const meshslice_1 = __webpack_require__(/*! ./meshslice */ "./src/MeshUtils/meshslice.ts");
const shape_1 = __webpack_require__(/*! ../Product/shape */ "./src/Product/shape.ts");
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
var Generator;
(function (Generator) {
    var TriplanarUnwrapper = unwrapper_1.Unwrapper.TriplanarUnwrapper;
    var Cacheable = filesystem_1.Filesystem.Cacheable;
    var LightmapUnwrapper = unwrapper_1.Unwrapper.LightmapUnwrapper;
    class Triangulator {
        constructor(points) {
            this.m_points = points;
        }
        Triangulate() {
            const indices = [];
            const n = this.m_points.length;
            if (n < 3)
                return indices;
            const V = [];
            if (this.Area() > 0) {
                for (let v = 0; v < n; v++)
                    V[v] = v;
            }
            else {
                for (let v = 0; v < n; v++)
                    V[v] = n - 1 - v;
            }
            let nv = n;
            let count = 2 * nv;
            for (let m = 0, v = nv - 1; nv > 2;) {
                if (count-- <= 0)
                    return indices;
                let u = v;
                if (nv <= u)
                    u = 0;
                v = u + 1;
                if (nv <= v)
                    v = 0;
                let w = v + 1;
                if (nv <= w)
                    w = 0;
                if (this.Snip(u, v, w, nv, V)) {
                    let a, b, c, s, t;
                    a = V[u];
                    b = V[v];
                    c = V[w];
                    indices.push(a);
                    indices.push(b);
                    indices.push(c);
                    m++;
                    for (s = v, t = v + 1; t < nv; s++, t++)
                        V[s] = V[t];
                    nv--;
                    count = 2 * nv;
                }
            }
            return indices;
        }
        Area() {
            const n = this.m_points.length;
            let A = 0;
            let p, q;
            for (p = n - 1, q = 0; q < n; p = q++) {
                const pval = this.m_points[p];
                const qval = this.m_points[q];
                A += pval.x * qval.y - qval.x * pval.y;
            }
            return A * 0.5;
        }
        Snip(u, v, w, n, V) {
            let p = 0;
            const A = this.m_points[V[u]];
            const B = this.m_points[V[v]];
            const C = this.m_points[V[w]];
            if (Number.EPSILON >
                (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x))
                return false;
            for (p = 0; p < n; p++) {
                if (p == u || p == v || p == w)
                    continue;
                const P = this.m_points[V[p]];
                if (Triangulator.InsideTriangle(A, B, C, P))
                    return false;
            }
            return true;
        }
        static InsideTriangle(A, B, C, P) {
            const ax = C.x - B.x;
            const ay = C.y - B.y;
            const bx = A.x - C.x;
            const by = A.y - C.y;
            const cx = B.x - A.x;
            const cy = B.y - A.y;
            const apx = P.x - A.x;
            const apy = P.y - A.y;
            const bpx = P.x - B.x;
            const bpy = P.y - B.y;
            const cpx = P.x - C.x;
            const cpy = P.y - C.y;
            const aCROSSbp = ax * bpy - ay * bpx;
            const cCROSSap = cx * apy - cy * apx;
            const bCROSScp = bx * cpy - by * cpx;
            return aCROSSbp >= 0.0 && bCROSScp >= 0.0 && cCROSSap >= 0.0;
        }
    }
    Generator.Triangulator = Triangulator;
    class Mesh extends Cacheable {
        GetHashableData() {
            return this.initialData;
        }
        constructor() {
            super();
            this.initialData = "";
            this.vertices = [];
            this.normals = [];
            this.uvs = [];
            this.uvs2 = [];
            this.indices = [];
            this.current_index = 0;
            this.triplanarUnwrapper = null;
        }
        GenerateInternal() {
            if (this.triplanarUnwrapper != null)
                this.uvs = this.triplanarUnwrapper.Process();
            this.uvs2 = new LightmapUnwrapper(this).Process();
        }
        AddTri(v1, v2, v3, uv1, uv2, uv3) {
            this.vertices.push(v1);
            this.vertices.push(v2);
            this.vertices.push(v3);
            this.uvs.push(uv1);
            this.uvs.push(uv2);
            this.uvs.push(uv3);
            const normal = math_1.Vector3.cross(v1.sub(v2), v1.sub(v3)).normalized;
            this.normals.push(normal);
            this.normals.push(normal);
            this.normals.push(normal);
            this.indices = this.indices.concat([
                this.current_index,
                this.current_index + 1,
                this.current_index + 2,
            ]);
            this.current_index += 3;
        }
        AddFace(v1, v2, v3, v4, uv1, uv2, uv3, uv4) {
            const normal = math_1.Vector3.cross(v1.sub(v2), v1.sub(v3)).normalized;
            if (!normal.isFinite())
                return;
            this.vertices.push(v1);
            this.vertices.push(v2);
            this.vertices.push(v3);
            this.vertices.push(v4);
            this.uvs.push(uv1);
            this.uvs.push(uv2);
            this.uvs.push(uv3);
            this.uvs.push(uv4);
            this.normals.push(normal);
            this.normals.push(normal);
            this.normals.push(normal);
            this.normals.push(normal);
            for (let i of Mesh.local_indices)
                this.indices.push(i + this.current_index);
            this.current_index += 4;
        }
        ApplyAdditionalData(mesh_data) {
            if ((mesh_data === null || mesh_data === void 0 ? void 0 : mesh_data.uv2) != null) {
                if (mesh_data === null || mesh_data === void 0 ? void 0 : mesh_data.uv2.some(function (d) {
                    const v = new math_1.Vector2(d);
                    return v.isNaN() || !v.isFinite();
                })) {
                    return;
                }
                this.uvs2 = mesh_data.uv2.map(function (d) {
                    return new math_1.Vector2(d);
                });
            }
        }
        RecalculateNormals() {
            if (this.vertices.length % 3 != 0)
                return;
            this.normals = [];
            for (let i = 0; i < this.vertices.length; i += 3) {
                const v1 = this.vertices[i];
                const v2 = this.vertices[i + 1];
                const v3 = this.vertices[i + 2];
                const n = math_1.Vector3.cross(v2.sub(v1), v3.sub(v1)).normalized;
                this.normals.push(n);
                this.normals.push(n);
                this.normals.push(n);
            }
        }
    }
    Mesh.local_indices = [0, 1, 3, 3, 1, 2];
    Generator.Mesh = Mesh;
    class PrimitiveMesh extends Mesh {
        constructor(size, angle1 = 0, angle2 = 0, target_faces = [], offset = new math_1.Vector3(), rotation = new math_1.Quaternion(), scale = math_1.Vector3.one) {
            super();
            this.size = size;
            this.cut_angle1 = (angle1 / 180.0) * Math.PI;
            this.cut_angle2 = (angle2 / 180.0) * Math.PI;
            this.offset = offset;
            this.rotation = rotation;
            this.scale = scale;
            this.target_faces = target_faces;
            if (size.isZero() || !size.isFinite())
                return;
            const temp = {
                size: size,
                angle1: angle1,
                angle2: angle2,
                offset: offset,
                rotation: rotation,
                scale: scale,
                target_faces: target_faces,
            };
            this.initialData = JSON.stringify(temp);
        }
        NeedRenderFace(face_index) {
            if (this.target_faces.length == 0)
                return true;
            return this.target_faces.includes(face_index);
        }
        GenerateInternal() {
            const angle_offset1 = this.cut_angle1 == 0
                ? 0
                : this.size.x * Math.tan(Math.PI - this.cut_angle1);
            const angle_offset2 = this.cut_angle2 == 0 ? 0 : this.size.x * Math.tan(this.cut_angle2);
            let count = 24;
            if (this.target_faces.length > 0)
                count = this.target_faces.length * 4;
            this.vertices = new Array(count);
            this.normals = new Array(count);
            this.uvs = new Array(count);
            //this.indices = Array.from( Array(count).keys() );
            this.indices = [];
            const hs = this.size.div(2);
            const raw_verts = [
                //BOTTOM PLANE
                new math_1.Vector3(-hs.x, -hs.y + angle_offset1, hs.z),
                new math_1.Vector3(-hs.x, -hs.y + angle_offset1, -hs.z),
                new math_1.Vector3(hs.x, -hs.y, -hs.z),
                new math_1.Vector3(hs.x, -hs.y, hs.z),
                //TOP PLANE
                new math_1.Vector3(-hs.x, hs.y - angle_offset2, hs.z),
                new math_1.Vector3(-hs.x, hs.y - angle_offset2, -hs.z),
                new math_1.Vector3(hs.x, hs.y, -hs.z),
                new math_1.Vector3(hs.x, hs.y, hs.z),
            ];
            let current_vertices_count = 0;
            const self = this;
            let TryAddFace = function (face_index, face_indices, local_uvs, normal) {
                if (!self.NeedRenderFace(face_index))
                    return;
                for (let i = 0; i < 6; i++) {
                    self.indices.push(current_vertices_count + PrimitiveMesh.global_indices[i]);
                }
                for (let i = 0; i < 4; i++) {
                    self.vertices[current_vertices_count] = raw_verts[face_indices[i]];
                    self.normals[current_vertices_count] = normal;
                    self.uvs[current_vertices_count] = local_uvs[i];
                    current_vertices_count++;
                }
            };
            //FRONT FACE
            {
                const local_uvs = [
                    new math_1.Vector2(0, angle_offset1),
                    new math_1.Vector2(0, this.size.y - angle_offset2),
                    new math_1.Vector2(this.size.x, this.size.y),
                    new math_1.Vector2(this.size.x, 0),
                ];
                TryAddFace(0, PrimitiveMesh.front_indices, local_uvs, new math_1.Vector3(0, 0, 1));
            }
            //TOP FACE
            {
                const local_uvs = [
                    new math_1.Vector2(0, 0),
                    new math_1.Vector2(0, this.size.z),
                    new math_1.Vector2(this.size.x, this.size.z),
                    new math_1.Vector2(this.size.x, 0),
                ];
                TryAddFace(1, PrimitiveMesh.top_indices, local_uvs, new math_1.Vector3(0, 1, 0));
            }
            //BACK FACE
            {
                const local_uvs = [
                    new math_1.Vector2(0, 0),
                    new math_1.Vector2(0, this.size.y),
                    new math_1.Vector2(this.size.x, this.size.y - angle_offset2),
                    new math_1.Vector2(this.size.x, angle_offset1),
                ];
                TryAddFace(2, PrimitiveMesh.back_indices, local_uvs, new math_1.Vector3(0, 0, -1));
            }
            //BOTTOM FACE
            {
                const local_uvs = [
                    new math_1.Vector2(0, 0),
                    new math_1.Vector2(0, this.size.z),
                    new math_1.Vector2(this.size.x, this.size.z),
                    new math_1.Vector2(this.size.x, 0),
                ];
                TryAddFace(3, PrimitiveMesh.bottom_indices, local_uvs, new math_1.Vector3(0, -1, 0));
            }
            //LEFT FACE
            {
                const local_uvs = [
                    new math_1.Vector2(this.size.z, 0),
                    new math_1.Vector2(this.size.z, this.size.y),
                    new math_1.Vector2(0, this.size.y),
                    new math_1.Vector2(0, 0),
                ];
                TryAddFace(4, PrimitiveMesh.left_indices, local_uvs, new math_1.Vector3(-1, 0, 0));
            }
            //RIGHT FACE
            {
                const local_uvs = [
                    new math_1.Vector2(this.size.z, 0),
                    new math_1.Vector2(this.size.z, this.size.y),
                    new math_1.Vector2(0, this.size.y),
                    new math_1.Vector2(0, 0),
                ];
                TryAddFace(5, PrimitiveMesh.right_indices, local_uvs, new math_1.Vector3(1, 0, 0));
            }
            for (let i in this.vertices) {
                this.vertices[i] = math_1.Vector3.scale(this.vertices[i], this.scale);
                this.vertices[i] = this.rotation.rotate(this.vertices[i]);
                this.vertices[i] = this.vertices[i].add(this.offset);
            }
            for (let i in this.normals)
                this.normals[i] = this.rotation.rotate(this.normals[i]);
            super.GenerateInternal();
        }
    }
    PrimitiveMesh.front_indices = [0, 4, 7, 3];
    PrimitiveMesh.back_indices = [2, 6, 5, 1];
    PrimitiveMesh.top_indices = [4, 5, 6, 7];
    PrimitiveMesh.bottom_indices = [1, 0, 3, 2];
    PrimitiveMesh.left_indices = [1, 5, 4, 0];
    PrimitiveMesh.right_indices = [3, 7, 6, 2];
    PrimitiveMesh.global_indices = [0, 1, 2, 0, 2, 3];
    Generator.PrimitiveMesh = PrimitiveMesh;
    class CurvedMesh extends Mesh {
        constructor(shapePoints, radius, startAngle, endAngle, cutAngle1, cutAngle2, precision, centered) {
            super();
            const temp = {
                shapePoints: shapePoints,
                radius: radius,
                startAngle: startAngle,
                endAngle: endAngle,
                cutAngle1: cutAngle1,
                cutAngle2: cutAngle2,
                precision: precision,
                centered: centered,
            };
            this.initialData = JSON.stringify(temp);
            this.shapePoints = shapePoints;
            this.radius = radius;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.cutAngle1 = cutAngle1;
            this.cutAngle2 = cutAngle2;
            this.precision = precision;
            this.centered = centered;
        }
        GenerateInternal() {
            const segment_size = 3 / (this.radius * this.precision);
            const count = Math.round((this.endAngle - this.startAngle) / segment_size);
            let curvePoints = [];
            for (let i = 0; i < count; i++) {
                const alpha = this.startAngle + (this.endAngle - this.startAngle) * (i / count);
                curvePoints.push(new math_1.Vector2(Math.cos((alpha / 180.0) * Math.PI), Math.sin((alpha / 180.0) * Math.PI)).mult(this.radius));
                if (i == count - 1)
                    curvePoints.push(new math_1.Vector2(Math.cos((this.endAngle / 180.0) * Math.PI), Math.sin((this.endAngle / 180.0) * Math.PI)).mult(this.radius));
            }
            if (this.centered) {
                const min = new math_1.Vector2(Math.min(...Array.from(curvePoints, function (cp) {
                    return cp.x;
                })), Math.min(...Array.from(curvePoints, function (cp) {
                    return cp.y;
                })));
                const max = new math_1.Vector2(Math.max(...Array.from(curvePoints, function (cp) {
                    return cp.x;
                })), Math.max(...Array.from(curvePoints, function (cp) {
                    return cp.y;
                })));
                const offset = min.add(max.sub(min).div(2.0));
                for (let i = 0; i < curvePoints.length; i++)
                    curvePoints[i] = curvePoints[i].sub(offset);
            }
            let IsClockwise = function (shape) {
                let sum = 0;
                for (let i = 0; i < shape.length; i++) {
                    let v1 = shape[i];
                    let v2 = shape[(i + 1) % shape.length];
                    sum += (v2.x - v1.x) * (v2.y + v1.y);
                }
                return sum > 0;
            };
            if (IsClockwise(this.shapePoints))
                this.shapePoints = this.shapePoints.reverse();
            if (this.centered) {
                const min = new math_1.Vector2(Math.min(...Array.from(this.shapePoints, function (cp) {
                    return cp.x;
                })), Math.min(...Array.from(this.shapePoints, function (cp) {
                    return cp.y;
                })));
                const max = new math_1.Vector2(Math.max(...Array.from(this.shapePoints, function (cp) {
                    return cp.x;
                })), Math.max(...Array.from(this.shapePoints, function (cp) {
                    return cp.y;
                })));
                const offset = min.add(max.sub(min).div(2.0));
                for (let i = 0; i < this.shapePoints.length; i++) {
                    this.shapePoints[i] = this.shapePoints[i].sub(offset);
                    this.shapePoints[i].x = -this.shapePoints[i].x;
                    this.shapePoints[i].y = -this.shapePoints[i].y;
                }
            }
            const temp_vertices = [];
            const loop = false;
            function GetForwardVector(i) {
                let v1;
                let v2;
                if (i == curvePoints.length - 1) {
                    if (loop) {
                        v1 = new math_1.Vector3(curvePoints[i]);
                        v2 = new math_1.Vector3(curvePoints[0]);
                    }
                    else {
                        v1 = new math_1.Vector3(curvePoints[i - 1]);
                        v2 = new math_1.Vector3(curvePoints[i]);
                    }
                }
                else if (i == 0) {
                    if (loop) {
                        v1 = new math_1.Vector3(curvePoints[curvePoints.length - 1]);
                        v2 = new math_1.Vector3(curvePoints[1]);
                    }
                    else {
                        v1 = new math_1.Vector3(curvePoints[0]);
                        v2 = new math_1.Vector3(curvePoints[1]);
                    }
                }
                else {
                    v1 = new math_1.Vector3(curvePoints[i - 1]);
                    v2 = new math_1.Vector3(curvePoints[i + 1]);
                }
                return v2.sub(v1).normalized;
            }
            for (let i = 0; i < curvePoints.length; i++) {
                const pos = new math_1.Vector3(curvePoints[i]);
                const forward = GetForwardVector(i);
                const rotation = math_1.Quaternion.lookRotation(forward, new math_1.Vector3(0, 0, 1));
                for (let j = 0; j < this.shapePoints.length; j++)
                    temp_vertices.push(pos
                        .add(rotation.rotate(new math_1.Vector3(this.shapePoints[j])))
                        .invertX());
            }
            let v = 0;
            for (let i = 0; i < curvePoints.length - (loop ? 0 : 1); i++) {
                let u = 0;
                let v1 = 0;
                let v2 = 0;
                if (i == 0)
                    v2 = math_1.Vector3.distance(temp_vertices[this.shapePoints.length], temp_vertices[0]);
                else
                    v2 = math_1.Vector3.distance(temp_vertices[i * this.shapePoints.length], temp_vertices[(i - 1) * this.shapePoints.length]);
                for (let j = 0; j < this.shapePoints.length; j++) {
                    let u1, u2, u3, u4 = 0;
                    if (j == 0) {
                        u1 = 0;
                    }
                    else {
                        u1 = math_1.Vector2.distance(this.shapePoints[j], this.shapePoints[j - 1]);
                    }
                    if (j == this.shapePoints.length - 1) {
                        u2 = math_1.Vector2.distance(this.shapePoints[j], this.shapePoints[0]);
                    }
                    else {
                        u2 = math_1.Vector2.distance(this.shapePoints[j + 1], this.shapePoints[j]);
                    }
                    u3 = u2;
                    u4 = u1;
                    let rj = j + 1;
                    if (j == this.shapePoints.length - 1)
                        rj = 0;
                    let i1 = i * this.shapePoints.length + j;
                    let i2 = i * this.shapePoints.length + rj;
                    let ri = i + 1;
                    if (i == curvePoints.length - 1)
                        ri = 0;
                    let i3 = ri * this.shapePoints.length + rj;
                    let i4 = ri * this.shapePoints.length + j;
                    let uvs = [
                        new math_1.Vector2(u + u1, v + v1),
                        new math_1.Vector2(u + u2, v + v1),
                        new math_1.Vector2(u + u3, v + v2),
                        new math_1.Vector2(u + u4, v + v2),
                    ];
                    this.AddTri(temp_vertices[i1], temp_vertices[i2], temp_vertices[i3], uvs[0], uvs[1], uvs[2]);
                    this.AddTri(temp_vertices[i1], temp_vertices[i3], temp_vertices[i4], uvs[0], uvs[2], uvs[3]);
                    u += u2;
                }
                v += v2;
            }
            for (let n in this.normals)
                this.normals[n] = this.normals[n].mult(-1);
            const indices_count = this.indices.length;
            const firstCurvePoint = new math_1.Vector3(curvePoints[0]);
            const lastCurvePoint = new math_1.Vector3(curvePoints[curvePoints.length - 1]);
            const shapeSize = shape_1.Shape.GetShapeSize(this.shapePoints);
            if (this.cutAngle1 != 0) {
                let point = lastCurvePoint.invertX();
                const normal = math_1.Quaternion.euler(0, 0, this.endAngle - 90 + this.cutAngle1)
                    .rotate(new math_1.Vector3(1, 0, 0))
                    .invertX();
                const perp = math_1.Quaternion.euler(0, 0, this.endAngle)
                    .rotate(new math_1.Vector3(1, 0, 0))
                    .invertX();
                point = point.add(perp.mult(shapeSize.x / 2.0));
                meshslice_1.MeshSlice.Slice(this, [math_1.Plane.fromPoint(normal, point)], indices_count / 2, indices_count);
            }
            if (this.cutAngle2 != 0) {
                let point = firstCurvePoint.invertX();
                const normal = math_1.Quaternion.euler(0, 0, this.startAngle + 90 - this.cutAngle2)
                    .rotate(new math_1.Vector3(1, 0, 0))
                    .invertX();
                const perp = math_1.Quaternion.euler(0, 0, this.startAngle)
                    .rotate(new math_1.Vector3(1, 0, 0))
                    .invertX();
                point = point.add(perp.mult(shapeSize.x / 2.0));
                meshslice_1.MeshSlice.Slice(this, [math_1.Plane.fromPoint(normal, point)], 0, indices_count / 2);
            }
            super.GenerateInternal();
        }
    }
    Generator.CurvedMesh = CurvedMesh;
    class ShapedMesh extends Mesh {
        constructor(size, shape, angle1, angle2, offset = new math_1.Vector3(), rotation = new math_1.Quaternion(), texture_scale = 1) {
            super();
            this.size = size;
            this.shape = shape;
            this.offset = offset;
            this.rotation = rotation;
            this.angle1 = (angle1 / 180.0) * Math.PI;
            this.angle2 = (angle2 / 180.0) * Math.PI;
            const temp = {
                size: size,
                shape: shape,
                angle1: angle1,
                angle2: angle2,
                offset: offset,
                rotation: rotation,
                texture_scale: texture_scale,
            };
            this.initialData = JSON.stringify(temp);
            this.texture_scale = texture_scale;
        }
        static NormalizeShape(shape) {
            const result = [];
            let min = new math_1.Vector2(Number.MAX_VALUE, Number.MAX_VALUE);
            for (const s of shape) {
                if (s.x < min.x)
                    min.x = s.x;
                if (s.y < min.y)
                    min.y = s.y;
            }
            for (const s of shape)
                result.push(s.sub(min));
            return result;
        }
        GetWavePoints(size, s1, s2) {
            const half_size = size.div(2.0);
            let angle_offset1_s1 = 0;
            let angle_offset2_s1 = 0;
            let angle_offset1_s2 = 0;
            let angle_offset2_s2 = 0;
            if (this.angle1 != 0) {
                angle_offset1_s1 = s1.x * Math.tan(Math.PI - this.angle1);
                angle_offset1_s2 = s2.x * Math.tan(Math.PI - this.angle1);
            }
            if (this.angle2 != 0) {
                angle_offset2_s1 = s1.x * Math.tan(this.angle2);
                angle_offset2_s2 = s2.x * Math.tan(this.angle2);
            }
            return [
                new math_1.Vector3(s2.x - half_size.x, -half_size.y + angle_offset1_s2, -s2.y + half_size.z).invertX(),
                new math_1.Vector3(s2.x - half_size.x, half_size.y - angle_offset2_s2, -s2.y + half_size.z).invertX(),
                new math_1.Vector3(s1.x - half_size.x, half_size.y - angle_offset2_s1, -s1.y + half_size.z).invertX(),
                new math_1.Vector3(s1.x - half_size.x, -half_size.y + angle_offset1_s1, -s1.y + half_size.z).invertX(),
            ];
        }
        GetWavePoint(size, s1) {
            const half_size = size.div(2.0);
            let angle_offset1_s1 = 0;
            let angle_offset2_s1 = 0;
            if (this.angle1 != 0)
                angle_offset1_s1 = s1.x * Math.tan(Math.PI - this.angle1);
            if (this.angle2 != 0)
                angle_offset2_s1 = s1.x * Math.tan(this.angle2);
            return [
                new math_1.Vector3(s1.x - half_size.x, -half_size.y + angle_offset1_s1, -s1.y + half_size.z).invertX(),
                new math_1.Vector3(s1.x - half_size.x, half_size.y - angle_offset2_s1, -s1.y + half_size.z).invertX(),
            ];
        }
        GenerateInternal() {
            let nshape = ShapedMesh.NormalizeShape(this.shape);
            let orient = 0;
            for (let i = 0; i < nshape.length; i++) {
                let j = i == nshape.length - 1 ? 0 : i + 1;
                if (math_1.Vector2.distance(nshape[i], nshape[j]) < 0.0001) {
                    nshape.splice(j, 1);
                    i--;
                }
                else {
                    orient += (nshape[j].x - nshape[i].x) * (nshape[j].y + nshape[i].y);
                }
            }
            if (orient < 0)
                nshape = nshape.reverse();
            let uv_offset = 0;
            const upper_points = [];
            const lower_points = [];
            let s1, s2;
            for (let i = 0; i < nshape.length; i++) {
                s1 = nshape[i];
                if (i + 1 != nshape.length)
                    s2 = nshape[i + 1];
                else
                    s2 = nshape[0];
                let uv1, uv2, uv3, uv4;
                const vs = this.GetWavePoints(this.size, s1, s2);
                upper_points.push(vs[3]);
                upper_points.push(vs[0]);
                lower_points.push(vs[2]);
                lower_points.push(vs[1]);
                const dvs = vs[1].sub(vs[3]);
                const duv_x = Math.abs(new math_1.Vector2(dvs.x, dvs.z).length);
                uv1 = new math_1.Vector2(uv_offset, vs[0].y);
                uv2 = new math_1.Vector2(uv_offset, vs[1].y);
                uv3 = new math_1.Vector2(uv_offset + duv_x, vs[2].y);
                uv4 = new math_1.Vector2(uv_offset + duv_x, vs[3].y);
                this.AddFace(vs[0], vs[1], vs[2], vs[3], uv1, uv2, uv3, uv4);
                uv_offset += duv_x;
            }
            const triang = new Triangulator(nshape);
            const tr = triang.Triangulate();
            for (let j = 0; j < tr.length; j += 3) {
                const vs0 = this.GetWavePoint(this.size, nshape[tr[j + 2]]);
                const vs1 = this.GetWavePoint(this.size, nshape[tr[j + 1]]);
                const vs2 = this.GetWavePoint(this.size, nshape[tr[j + 0]]);
                const normal0 = math_1.Vector3.cross(vs2[0].sub(vs1[0]), vs2[0].sub(vs0[0])).normalized;
                const normal1 = math_1.Vector3.cross(vs0[1].sub(vs1[1]), vs0[1].sub(vs2[1])).normalized;
                function GetUV(vertex, normal) {
                    return TriplanarUnwrapper.ProcessSingleVertex(vertex, normal, new math_1.Vector3(), new math_1.Quaternion(), 0, new math_1.Vector2(1, 1), new math_1.Vector2(), new math_1.Vector2());
                }
                const uvs0 = [
                    GetUV(vs0[0], normal0),
                    GetUV(vs1[0], normal0),
                    GetUV(vs2[0], normal0),
                ];
                const uvs1 = [
                    GetUV(vs0[1], normal1),
                    GetUV(vs1[1], normal1),
                    GetUV(vs2[1], normal1),
                ];
                this.AddTri(vs2[0], vs1[0], vs0[0], uvs0[2], uvs0[1], uvs0[0]);
                this.AddTri(vs0[1], vs1[1], vs2[1], uvs1[0], uvs1[1], uvs1[2]);
            }
            for (let i in this.vertices)
                this.vertices[i] = this.rotation
                    .rotate(this.vertices[i])
                    .add(this.offset);
            for (let i in this.normals)
                this.normals[i] = this.rotation.rotate(this.normals[i]);
            this.indices = this.indices.reverse();
            //this.RecalculateNormals();
            super.GenerateInternal();
        }
    }
    Generator.ShapedMesh = ShapedMesh;
    class MergedMesh extends Mesh {
        constructor(mesh1, mesh2) {
            super();
            this.mesh1 = mesh1;
            this.mesh2 = mesh2;
            this.initialData = mesh1.initialData + mesh2.initialData;
        }
        GenerateInternal() {
            if (!this.mesh1.isGenerated)
                this.mesh1.Generate();
            if (!this.mesh2.isGenerated)
                this.mesh2.Generate();
            this.vertices.push(...this.mesh1.vertices.slice());
            this.normals.push(...this.mesh1.normals.slice());
            this.uvs.push(...this.mesh1.uvs.slice());
            this.uvs2.push(...this.mesh1.uvs2.slice());
            this.indices.push(...this.mesh1.indices.slice());
            const verticesCount = this.vertices.length;
            this.vertices.push(...this.mesh2.vertices.slice());
            this.normals.push(...this.mesh2.normals.slice());
            this.uvs.push(...this.mesh2.uvs.slice());
            this.uvs2.push(...this.mesh2.uvs2.slice());
            this.indices.push(...this.mesh2.indices.map((i) => i + verticesCount));
        }
    }
    Generator.MergedMesh = MergedMesh;
})(Generator || (exports.Generator = Generator = {}));


/***/ }),

/***/ "./src/MeshUtils/meshslice.ts":
/*!************************************!*\
  !*** ./src/MeshUtils/meshslice.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeshSlice = void 0;
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
class MeshSlice {
    static CutTriangle(vertices, plane, uvs) {
        const result = {
            vertices: vertices,
            uvs: uvs,
        };
        if (vertices == null)
            return null;
        let state = 0; //0 - none, 1 - inside, 2 - outside, 3 - mixed
        const inside_points = [];
        for (const v of vertices) {
            if (!plane.getSide(v)) {
                if (state == 0)
                    state = 2;
                if (state == 1)
                    state = 3;
            }
            else {
                inside_points.push(v);
                if (state == 0)
                    state = 1;
                if (state == 2)
                    state = 3;
            }
        }
        switch (state) {
            case 1:
                return result;
            case 2:
                return null;
        }
        if (inside_points.length == 1) {
            const base_vert = inside_points[0];
            const base_vert_index = vertices.indexOf(base_vert);
            const other_points = vertices.filter((v) => v != inside_points[0]);
            const r1 = new math_1.Ray(base_vert, other_points[0].sub(base_vert));
            const r2 = new math_1.Ray(base_vert, other_points[1].sub(base_vert));
            const e1 = plane.raycast(r1);
            const e2 = plane.raycast(r2);
            if (!e1.result || !e2.result)
                return result;
            const v1 = r1.GetPoint(e1.enter);
            const v2 = r2.GetPoint(e2.enter);
            const sd1 = math_1.Vector3.distance(base_vert, other_points[0]);
            const sd2 = math_1.Vector3.distance(base_vert, other_points[1]);
            const ed1 = math_1.Vector3.distance(base_vert, v1);
            const ed2 = math_1.Vector3.distance(base_vert, v2);
            const d1 = ed1 / sd1;
            const d2 = ed2 / sd2;
            const buv = uvs[base_vert_index];
            const ouv1 = uvs[vertices.indexOf(other_points[0])];
            const ouv2 = uvs[vertices.indexOf(other_points[1])];
            uvs = [buv, math_1.Vector2.lerp(buv, ouv1, d1), math_1.Vector2.lerp(buv, ouv2, d2)];
            switch (base_vert_index) {
                case 0:
                    result.uvs = [uvs[0], uvs[1], uvs[2]];
                    result.vertices = [base_vert, v1, v2];
                    break;
                case 1:
                    result.uvs = [uvs[1], uvs[0], uvs[2]];
                    result.vertices = [v1, base_vert, v2];
                    break;
                default:
                    result.uvs = [uvs[1], uvs[2], uvs[0]];
                    result.vertices = [v1, v2, base_vert];
                    break;
            }
        }
        else {
            const other_vert = vertices.find((v) => !inside_points.includes(v));
            const other_vert_index = vertices.indexOf(other_vert);
            const r1 = new math_1.Ray(inside_points[0], other_vert.sub(inside_points[0]));
            const r2 = new math_1.Ray(inside_points[1], other_vert.sub(inside_points[1]));
            const e1 = plane.raycast(r1);
            const e2 = plane.raycast(r2);
            if (!e1.result || !e2.result)
                return result;
            const v1 = r1.GetPoint(e1.enter);
            const v2 = r2.GetPoint(e2.enter);
            const sd1 = math_1.Vector3.distance(inside_points[0], other_vert);
            const sd2 = math_1.Vector3.distance(inside_points[1], other_vert);
            const ed1 = math_1.Vector3.distance(v1, other_vert);
            const ed2 = math_1.Vector3.distance(v2, other_vert);
            const d1 = ed1 / sd1;
            const d2 = ed2 / sd2;
            const buv1 = uvs[vertices.indexOf(inside_points[0])];
            const buv2 = uvs[vertices.indexOf(inside_points[1])];
            const ouv = uvs[other_vert_index];
            uvs = [
                buv1,
                buv2,
                math_1.Vector2.lerp(ouv, buv1, d1),
                math_1.Vector2.lerp(ouv, buv2, d2),
            ];
            switch (other_vert_index) {
                case 0:
                    result.uvs = [uvs[2], uvs[0], uvs[1], uvs[2], uvs[1], uvs[3]];
                    result.vertices = [
                        v1,
                        inside_points[0],
                        inside_points[1],
                        v1,
                        inside_points[1],
                        v2,
                    ];
                    break;
                case 1:
                    result.uvs = [uvs[0], uvs[3], uvs[1], uvs[3], uvs[0], uvs[2]];
                    result.vertices = [
                        inside_points[0],
                        v2,
                        inside_points[1],
                        v2,
                        inside_points[0],
                        v1,
                    ];
                    break;
                default:
                    result.uvs = [uvs[0], uvs[1], uvs[2], uvs[2], uvs[1], uvs[3]];
                    result.vertices = [
                        inside_points[0],
                        inside_points[1],
                        v1,
                        v1,
                        inside_points[1],
                        v2,
                    ];
                    break;
            }
        }
        return result;
    }
    static Slice(mesh, planes, start_index = -1, end_index = -1) {
        let res_verts = [];
        let res_indices = [];
        //let res_normals : Vector3[] = [];
        let res_uvs = [];
        const verts = mesh.vertices;
        const normals = mesh.normals;
        const indices = mesh.indices;
        const uvs = mesh.uvs;
        for (let i = 0; i < indices.length; i += 3) {
            const v = [
                verts[indices[i]],
                verts[indices[i + 1]],
                verts[indices[i + 2]],
            ];
            const uv = [uvs[indices[i]], uvs[indices[i + 1]], uvs[indices[i + 2]]];
            let cut_uvs = uv;
            let cut_res = v;
            if ((start_index == -1 && end_index == -1) ||
                (indices[i] >= start_index && indices[i] <= end_index)) {
                for (const p of planes) {
                    let local_res = [];
                    let local_uvs = [];
                    for (let j = 0; j < cut_res.length / 3; j++) {
                        let j_res = [
                            cut_res[j * 3],
                            cut_res[j * 3 + 1],
                            cut_res[j * 3 + 2],
                        ];
                        const j_uvs = [
                            cut_uvs[j * 3],
                            cut_uvs[j * 3 + 1],
                            cut_uvs[j * 3 + 2],
                        ];
                        const slice = MeshSlice.CutTriangle(j_res, p, j_uvs);
                        if (slice != null) {
                            local_res = local_res.concat(slice.vertices);
                            local_uvs = local_uvs.concat(slice.uvs);
                        }
                    }
                    if (local_res.length == 0) {
                        cut_res = null;
                        break;
                    }
                    cut_res = local_res;
                    cut_uvs = local_uvs;
                }
            }
            if (cut_res != null) {
                res_indices = res_indices.concat([...Array(cut_res.length).keys()].map((i) => i + res_verts.length));
                res_verts = res_verts.concat(cut_res);
                res_uvs = res_uvs.concat(cut_uvs);
            }
        }
        mesh.vertices = res_verts;
        mesh.indices = res_indices;
        mesh.uvs = res_uvs;
        mesh.RecalculateNormals();
        for (let n in mesh.normals)
            mesh.normals[n] = mesh.normals[n].mult(-1);
    }
}
exports.MeshSlice = MeshSlice;


/***/ }),

/***/ "./src/MeshUtils/unwrapper.ts":
/*!************************************!*\
  !*** ./src/MeshUtils/unwrapper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Unwrapper = void 0;
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
var Unwrapper;
(function (Unwrapper) {
    class Polygon {
        constructor(...args) {
            if (args.length == 1) {
                this.mesh = args[0].mesh;
                this.indices = Object.assign([], args[0].indices);
                this.Areas = Object.assign({}, args[0].Areas);
            }
            else {
                this.mesh = args[0];
                this.indices = Object.assign([], args[1]);
                this.Areas = {};
            }
            this.vertices = this.mesh.vertices;
            this.normals = this.mesh.normals;
        }
        IsNeighbour(p, threshold) {
            for (const i of p.indices) {
                for (const k of this.indices) {
                    const v1 = this.vertices[i];
                    const v2 = this.vertices[k];
                    const n1 = this.normals[i];
                    const n2 = this.normals[k];
                    if (v1.equals(v2) && math_1.Vector3.angle(n1, n2) <= threshold)
                        return true;
                }
            }
            return false;
        }
        Combine(p) {
            this.indices = this.indices.concat(p.indices);
        }
        GenerateAreas() {
            this.Areas = {};
            const o = this.vertices[this.indices[0]];
            let normal = new math_1.Vector3();
            for (const i of this.indices)
                normal = normal.add(this.normals[i]);
            normal = normal.div(this.normals.length);
            const oz = normal.normalized;
            const ox = this.vertices[this.indices[1]].sub(o).normalized;
            const oy = math_1.Vector3.cross(ox, oz).normalized;
            const mat = new math_1.Matrix4x4();
            mat[0][0] = ox.x;
            mat[1][0] = ox.y;
            mat[2][0] = ox.z;
            mat[0][1] = oy.x;
            mat[1][1] = oy.y;
            mat[2][1] = oy.z;
            mat[0][2] = oz.x;
            mat[1][2] = oz.y;
            mat[2][2] = oz.z;
            for (const i of this.indices) {
                const tr = mat.mult(this.vertices[i].sub(o));
                this.Areas[i] = new math_1.Vector2(tr.x, tr.y);
            }
            const min = new math_1.Vector2(Number.MAX_VALUE, Number.MAX_VALUE);
            for (const i of Object.keys(this.Areas).map((k) => Number.parseInt(k))) {
                if (this.Areas[i].x < min.x)
                    min.x = this.Areas[i].x;
                if (this.Areas[i].y < min.y)
                    min.y = this.Areas[i].y;
            }
            for (const i of Object.keys(this.Areas).map((k) => Number.parseInt(k)))
                this.Areas[i] = this.Areas[i].sub(min);
        }
        Scale(m) {
            for (const i of Object.keys(this.Areas).map((k) => Number.parseInt(k)))
                this.Areas[i] = this.Areas[i].mult(m);
        }
        ApplyOffset(offset) {
            for (const i of Object.keys(this.Areas).map((k) => Number.parseInt(k)))
                this.Areas[i] = this.Areas[i].add(offset);
        }
        IsOutOfBounds() {
            for (const i of Object.keys(this.Areas).map((k) => Number.parseInt(k))) {
                if (this.Areas[i].x > 1 || this.Areas[i].y > 1)
                    return true;
            }
            return false;
        }
    }
    class LightmapUnwrapper {
        constructor(mesh, threshold = 0, margin = 0.05) {
            this.packIterations = 0;
            this.maxPackIterations = 100;
            this.threshold = threshold;
            this.mesh = mesh;
            this.margin = margin;
            this.indices = this.mesh.indices;
        }
        GeneratePolygons() {
            const result = [];
            for (let i = 0; i < this.indices.length; i += 6) {
                const poly = new Polygon(this.mesh, this.indices.slice(i, i + 5));
                const local_threshold = this.threshold;
                const found = result.find(function (r) {
                    return r.IsNeighbour(poly, local_threshold);
                });
                if (found == null)
                    result.push(poly);
                else
                    found.Combine(poly);
            }
            return result;
        }
        GetPolygonSize(...polys) {
            const min = new math_1.Vector2(Number.MAX_VALUE, Number.MAX_VALUE);
            const max = new math_1.Vector2(Number.MIN_VALUE, Number.MIN_VALUE);
            for (const p of polys) {
                for (const a of Object.keys(p.Areas).map((key) => p.Areas[parseInt(key)])) {
                    if (a.x < min.x)
                        min.x = a.x;
                    if (a.x > max.x)
                        max.x = a.x;
                    if (a.y < min.y)
                        min.y = a.y;
                    if (a.y > max.y)
                        max.y = a.y;
                }
            }
            return max.sub(min);
        }
        GetPolygonAspect(...polys) {
            const size = this.GetPolygonSize(...polys);
            if (size.y > size.x)
                return 1 / size.y;
            return 1 / size.x;
        }
        Pack(polys, mult = 1) {
            this.packIterations++;
            if (this.packIterations > this.maxPackIterations)
                return;
            const clone = polys.map((p) => new Polygon(p));
            const offset = new math_1.Vector2(this.margin, this.margin);
            let next_offset_y = null;
            for (let i = 0; i < clone.length; i++) {
                const p = clone[i];
                let temp = new Polygon(p);
                temp.Scale(mult);
                temp.ApplyOffset(offset);
                if (temp.IsOutOfBounds()) {
                    if (next_offset_y == null) {
                        this.Pack(polys, mult * 0.9);
                        return;
                    }
                    offset.y += next_offset_y + this.margin;
                    next_offset_y = 0;
                    offset.x = this.margin;
                    temp = new Polygon(p);
                    temp.Scale(mult);
                    temp.ApplyOffset(offset);
                    if (temp.IsOutOfBounds()) {
                        this.Pack(polys, mult * 0.9);
                        return;
                    }
                }
                const next_size_y = this.GetPolygonSize(temp).y;
                if (next_offset_y == null || next_size_y > next_offset_y)
                    next_offset_y = next_size_y;
                offset.x += this.GetPolygonSize(temp).x + this.margin;
                clone[i] = temp;
            }
            for (let i = 0; i < polys.length; i++)
                polys[i].Areas = clone[i].Areas;
        }
        Process() {
            const result = new Array(this.mesh.vertices.length);
            const polys = this.GeneratePolygons();
            for (const p of polys)
                p.GenerateAreas();
            const aspect = this.GetPolygonAspect(...polys);
            for (const p of polys)
                p.Scale(aspect);
            this.Pack(polys);
            for (const p of polys) {
                for (let k in p.Areas) {
                    result[k] = p.Areas[k];
                }
            }
            return result;
        }
    }
    Unwrapper.LightmapUnwrapper = LightmapUnwrapper;
    class TriplanarUnwrapper {
        constructor(mesh, fitting, baseProcessing, comp) {
            this.mesh = mesh;
            this.fitting = fitting;
            this.baseProcessing = baseProcessing;
            this.componentImplementation = comp;
        }
        GetFittingOffset() {
            let offset = new math_1.Vector2(0.25, 0.25);
            if (this.fitting == null)
                return offset;
            if (this.fitting.group != null && this.fitting.group != "") {
                const r = new math_1.Random((0, utils_1.GetHash)(this.fitting.group));
                offset = offset.add(new math_1.Vector2(r.next(), r.next()));
            }
            return offset;
        }
        static ProcessSingleVertex(vertex, normal, position, rotation, uv_rotation, uv_scale, offset, real_size) {
            let bf = rotation.rotate(normal).abs().normalized;
            bf = bf.div(math_1.Vector3.dot(bf, math_1.Vector3.one));
            const wpos = position.add(rotation.rotate(vertex));
            let tx = wpos.zy();
            tx.x += wpos.x;
            let ty = wpos.xz();
            ty.y += wpos.y;
            let tz = wpos.xy();
            if (uv_rotation != 0) {
                tx = tx.rotate(uv_rotation);
                ty = ty.rotate(uv_rotation);
                tz = tz.rotate(uv_rotation);
            }
            tx = math_1.Vector2.scale(tx, uv_scale).add(offset).mult(bf.x);
            ty = math_1.Vector2.scale(ty, uv_scale).add(offset).mult(bf.y);
            tz = math_1.Vector2.scale(tz, uv_scale).add(offset).mult(bf.z);
            let result = tx.add(ty).add(tz);
            return result;
        }
        Process() {
            const result = [];
            const scale = this.baseProcessing == null ? new math_1.Vector2(1, 1) : new math_1.Vector2(this.baseProcessing.scale);
            const uvRotation = this.baseProcessing == null ? 0 : this.baseProcessing.rotation;
            let compRotation = this.componentImplementation.data.rotation.toRH();
            let compPosition = this.componentImplementation.data.position.invertX().div(1000.0);
            compPosition = compPosition.sub(this.componentImplementation.projectAssembler.GetProjectOffset().invertX());
            let realSize = new math_1.Vector2(1, 1);
            //if ( this.componentImplementation.data.material != "" && this.componentImplementation.data.material != null )
            //{
            //  const material = await this.componentImplementation.GetMaterialData(false, false);
            //  let materialSize = material?.diffuse?.realSize;
            //  if( materialSize != null )
            //    realSize = materialSize;
            //}
            let offset = this.baseProcessing == null ? new math_1.Vector2() : new math_1.Vector2(this.baseProcessing.offset);
            if (this.fitting != null)
                offset = offset.add(this.GetFittingOffset());
            offset.x = -offset.x * realSize.x;
            offset.y = offset.y * realSize.y;
            if (this.fitting != null) {
                for (let i = 0; i < this.mesh.vertices.length; i++) {
                    let uv = TriplanarUnwrapper.ProcessSingleVertex(this.mesh.vertices[i], this.mesh.normals[i], compPosition, compRotation, uvRotation, scale, offset, realSize);
                    result.push(uv);
                }
            }
            else if (this.baseProcessing != null) {
                for (let i = 0; i < this.mesh.vertices.length; i++) {
                    let uv = this.mesh.uvs[i];
                    uv = uv.rotate(uvRotation);
                    uv = math_1.Vector2.scale(uv, scale).add(offset);
                    result.push(uv);
                }
            }
            return result;
        }
    }
    Unwrapper.TriplanarUnwrapper = TriplanarUnwrapper;
})(Unwrapper || (exports.Unwrapper = Unwrapper = {}));


/***/ }),

/***/ "./src/Product/builder.ts":
/*!********************************!*\
  !*** ./src/Product/builder.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsDistanceBuilder = exports.ManipulatorBuilder = exports.LightBuilder = exports.CameraBuilder = exports.ShadowPlaneBuilder = exports.VirtualObjectBuilder = exports.ModelGroupBuilder = exports.BuiltInBuilder = exports.ArrayBuilder = exports.PerforationBuilder = exports.LDSPBuilder = exports.MeshBuilder = exports.GeometryBuilder = exports.ProductPartBuilder = exports.ProductBuilder = void 0;
const product_1 = __webpack_require__(/*! ./product */ "./src/Product/product.ts");
const product_parts_1 = __webpack_require__(/*! ./product_parts */ "./src/Product/product_parts.ts");
const filesystem_1 = __webpack_require__(/*! ../filesystem */ "./src/filesystem.ts");
const shape_1 = __webpack_require__(/*! ./shape */ "./src/Product/shape.ts");
const batching_1 = __webpack_require__(/*! ../MeshUtils/batching */ "./src/MeshUtils/batching.ts");
const generator_1 = __webpack_require__(/*! ../MeshUtils/generator */ "./src/MeshUtils/generator.ts");
const material_1 = __webpack_require__(/*! ../material */ "./src/material.ts");
const virtual_object_1 = __webpack_require__(/*! ./virtual_object */ "./src/Product/virtual_object.ts");
const logger_1 = __webpack_require__(/*! ../logger */ "./src/logger.ts");
var BatchCollection = batching_1.Batching.BatchCollection;
var PrimitiveMesh = generator_1.Generator.PrimitiveMesh;
var ShapedMesh = generator_1.Generator.ShapedMesh;
var Material = material_1.MaterialCore.Material;
var Texture = material_1.MaterialCore.Texture;
var DebugLevel = logger_1.Logger.DebugLevel;
const enums_1 = __webpack_require__(/*! ../Project/enums */ "./src/Project/enums.ts");
const project_component_implementation_1 = __webpack_require__(/*! ../Project/Implementations/project_component_implementation */ "./src/Project/Implementations/project_component_implementation.ts");
const environment_1 = __webpack_require__(/*! ../Environment/environment */ "./src/Environment/environment.ts");
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
class ProductBuilder {
    static PrepareEdgeShapeOnNeed() {
        return __awaiter(this, void 0, void 0, function* () {
            if (ProductBuilder.shape2x16 == null) {
                let rawShapeData = yield filesystem_1.Filesystem.GetFile("https://lab.system123.ru/common/models/2x16.s123drawing");
                ProductBuilder.shape2x16 = new shape_1.Shape(rawShapeData);
            }
        });
    }
    constructor(caller) {
        this.generateRelated = false;
        this.generateInactive = false;
        this.isScene = false;
        this.isWebPBRExtrasActive = false;
        this.isWebARActive = false;
        this.core = caller;
        this.projectAssembler = caller.projectAssembler;
    }
    Build() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.Log("ProductBuilder.Build: started", DebugLevel.INFO);
            yield ProductBuilder.PrepareEdgeShapeOnNeed();
            const product = product_1.ProductFactory.CreateNew();
            let tasks = [];
            let partBuilders = [];
            let virtualObjectBuilders = [];
            logger_1.Logger.Log("ProductBuilder.Build: building parts", DebugLevel.INFO);
            for (let component of this.projectAssembler.allComponentImplementations) {
                if (!this.generateInactive && !component.data.is_active)
                    continue;
                let builder = null;
                switch (component.data.modifier.type) {
                    case enums_1.ProjectComponentModifierType.DUMMY:
                    case enums_1.ProjectComponentModifierType.SHAPE:
                    case enums_1.ProjectComponentModifierType.MDF_WITH_FITTING:
                    case enums_1.ProjectComponentModifierType.MDF_WITH_PAINT:
                    case enums_1.ProjectComponentModifierType.SOLID_WOOD:
                    case enums_1.ProjectComponentModifierType.GLASS:
                        builder = new GeometryBuilder(this, component);
                        break;
                    case enums_1.ProjectComponentModifierType.MESH:
                        builder = new MeshBuilder(this, component);
                        break;
                    case enums_1.ProjectComponentModifierType.LDSP:
                        builder = new LDSPBuilder(this, component);
                        break;
                    case enums_1.ProjectComponentModifierType.ARRAY:
                        builder = new ArrayBuilder(this, component);
                        break;
                    case enums_1.ProjectComponentModifierType.PERFORATION:
                        builder = new PerforationBuilder(this, component);
                        break;
                    case enums_1.ProjectComponentModifierType.BUILTIN:
                        builder = new BuiltInBuilder(this, component);
                        break;
                    case enums_1.ProjectComponentModifierType.MODEL_GROUP:
                        builder = new ModelGroupBuilder(this, component);
                        break;
                }
                if (builder == null) {
                    logger_1.Logger.Log("ProductBuilder.Build: builder is null for component " + component.data.name, DebugLevel.ERROR);
                    continue;
                }
                tasks.push(builder.Build());
                partBuilders.push(builder);
            }
            logger_1.Logger.Log("ProductBuilder.Build: building virtual objects", DebugLevel.INFO);
            for (let vo of this.projectAssembler.targetProject.virtual_objects) {
                if (!this.generateInactive && vo.is_active === false)
                    continue;
                let builder = null;
                switch (vo.modifier.type) {
                    case enums_1.VirtualObjectModifierType.SHADOW_PLANE:
                        builder = new ShadowPlaneBuilder(this, vo);
                        break;
                    case enums_1.VirtualObjectModifierType.CAMERA:
                        builder = new CameraBuilder(this, vo);
                        break;
                    case enums_1.VirtualObjectModifierType.LIGHT:
                        builder = new LightBuilder(this, vo);
                        break;
                    case enums_1.VirtualObjectModifierType.MANIPULATOR:
                        builder = new ManipulatorBuilder(this, vo);
                        break;
                    case enums_1.VirtualObjectModifierType.POINT_DISTANCE:
                        builder = new PointsDistanceBuilder(this, vo);
                        break;
                }
                if (builder == null) {
                    logger_1.Logger.Log("ProductBuilder.Build: builder is null for virtual object " + vo.name, DebugLevel.ERROR);
                    continue; //TODO error
                }
                tasks.push(builder.Build());
                virtualObjectBuilders.push(builder);
            }
            logger_1.Logger.Log("ProductBuilder.Build: awaiting all tasks", DebugLevel.INFO);
            for (const result of yield Promise.allSettled(tasks)) {
                if (result.status === "fulfilled") {
                    logger_1.Logger.Log("ProductBuilder.Build: task fulfilled", DebugLevel.VERBOSE);
                }
                else if (result.status === "rejected") {
                    logger_1.Logger.Log("ProductBuilder.Build: task rejected - " + result.reason, DebugLevel.ERROR);
                }
            }
            logger_1.Logger.Log("ProductBuilder.Build: done awaiting all tasks", DebugLevel.INFO);
            const project = this.projectAssembler.targetProject;
            product.connection_type = project.connection_type;
            product.user_data = project.user_data;
            if (!this.isScene) {
                const rotation = new math_1.Quaternion();
                const offset = rotation.rotate(this.projectAssembler.GetProjectOffset().invertX());
                product.product_container.transform.position = offset.inversed();
                product.product_container.transform.rotation = rotation;
            }
            product.product_container.normal = project.normal;
            if (project.points_distance_lines_weight != null)
                product.product_container.points_distance_lines_weight =
                    project.points_distance_lines_weight / 1000;
            if (project.points_distance_arrows_size != null)
                product.product_container.points_distance_arrows_size =
                    project.points_distance_arrows_size;
            if (project.points_distance_text_size != null)
                product.product_container.points_distance_text_size =
                    project.points_distance_text_size;
            if (project.points_distance_color != null)
                product.product_container.points_distance_color =
                    project.points_distance_color;
            product.product_container.background_color = project.background_color;
            logger_1.Logger.Log("ProductBuilder.Build: assembling children", DebugLevel.INFO);
            product.product_container.children = {};
            for (let b of partBuilders) {
                if (b.from == null || !b.isProperResult) {
                    logger_1.Logger.Log("ProductBuilder.Build: skipping partBuilder with improper result", DebugLevel.ERROR);
                    continue;
                }
                product.product_container.children[b.from.data.guid] = b.result;
            }
            logger_1.Logger.Log("ProductBuilder.Build: assembling virtual objects", DebugLevel.INFO);
            for (let b of virtualObjectBuilders) {
                if (b.from == null) {
                    logger_1.Logger.Log("ProductBuilder.Build: skipping virtualObjectBuilder with null 'from'", DebugLevel.ERROR);
                    continue;
                }
                product.product_container.virtual_objects[b.from.name] = b.result;
            }
            product.world = environment_1.WorldSettingsFactory.PrepareForFrontend(project.world);
            logger_1.Logger.Log("ProductBuilder.Build: finished", DebugLevel.INFO);
            return product;
        });
    }
}
exports.ProductBuilder = ProductBuilder;
ProductBuilder.shape2x16 = null;
class ProductPartBuilder {
    constructor(caller, from) {
        this.isProperResult = true;
        this.caller = caller;
        this.from = from;
        this.result = this.CreateResult();
    }
    Build() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.Log("ProductPartBuilder.Build: started for " + this.from.data.name, DebugLevel.VERBOSE);
            this.result.transform.position = this.from.data.position.div(1000.0).invertX();
            this.result.transform.rotation = this.from.data.rotation.toRH();
            this.result.name = this.from.data.name;
            this.result.order = this.from.data.order == null ? 0 : this.from.data.order;
            this.result.build_order =
                this.from.data.build_order == null ? 0 : this.from.data.build_order;
            this.result.user_data =
                this.from.data.user_data == null ? "" : this.from.data.user_data;
            this.result.is_active = this.from.data.is_active;
            logger_1.Logger.Log("ProductPartBuilder.Build: finished for " + this.from.data.name, DebugLevel.VERBOSE);
        });
    }
}
exports.ProductPartBuilder = ProductPartBuilder;
class GeometryBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.GeometryPartFactory.CreateNew();
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Geometry;
            this.result.geometry = yield this.from.GetMesh();
            const material = yield this.from.GetMaterialData(this.caller.isWebPBRExtrasActive, this.caller.isWebARActive);
            this.result.material = filesystem_1.Filesystem.Cache.GetCachedItem(material).id;
        });
    }
}
exports.GeometryBuilder = GeometryBuilder;
class MeshBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.MeshPartFactory.CreateNew();
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Mesh;
            const modifier = this.from.data.modifier;
            this.result.file = filesystem_1.Filesystem.GetRelativePath(modifier.mesh);
            this.result.node = modifier.node_name;
            if (this.result.node == null)
                this.result.node = "";
            if (modifier.use_scale) {
                const size = this.from.data.size.div(1000.0);
                const nsize = new math_1.Vector3(modifier.mesh_size);
                if (nsize.x == 0)
                    nsize.x = 0.001;
                if (nsize.y == 0)
                    nsize.y = 0.001;
                if (nsize.z == 0)
                    nsize.z = 0.001;
                this.result.transform.scale = size.div(nsize);
            }
            if (!modifier.apply_offset &&
                modifier.mesh_offset !== undefined) {
                let n = new math_1.Vector3(modifier.mesh_offset).invertX();
                if (modifier.use_scale)
                    n = math_1.Vector3.scale(n, this.result.transform.scale);
                n = new math_1.Quaternion(this.result.transform.rotation).rotate(n);
                this.result.transform.position = this.from.data.position
                    .div(1000.0)
                    .invertX()
                    .sub(n);
            }
            const material = yield this.from.GetMaterialData(this.caller.isWebPBRExtrasActive, this.caller.isWebARActive);
            this.result.material = filesystem_1.Filesystem.Cache.GetCachedItem(material).id;
            const processings = this.from.data.processings == null ? [] : this.from.data.processings;
            const textureCoordinatesProcessing = processings.find((p) => p.type === 2);
            if (textureCoordinatesProcessing != null) {
                const uvs = {};
                uvs.offset = textureCoordinatesProcessing.offset;
                uvs.scale = textureCoordinatesProcessing.scale;
                uvs.rotation = textureCoordinatesProcessing.rotation;
                this.result["uvs"] = uvs;
            }
        });
    }
}
exports.MeshBuilder = MeshBuilder;
class LDSPBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.GroupPartFactory.CreateNew();
    }
    static GetEdgeCutAngles(index, edges) {
        let cut_angle1 = 0;
        let cut_angle2 = 0;
        if (edges[index].type == enums_1.LDSPEdgeType.MM2) {
            if (index == 0) {
                if (edges[1].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle2 = -45;
                if (edges[3].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle1 = 45;
            }
            if (index == 1) {
                if (edges[0].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle2 = -45;
                if (edges[2].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle1 = 45;
            }
            if (index == 2) {
                if (edges[1].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle2 = -45;
                if (edges[3].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle1 = 45;
            }
            if (index == 3) {
                if (edges[0].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle1 = 45;
                if (edges[2].type == enums_1.LDSPEdgeType.MM2)
                    cut_angle2 = -45;
            }
        }
        return [cut_angle1, cut_angle2];
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Group;
            this.result.children = {};
            const localShape = shape_1.Shape.GetShapeFromData(ProductBuilder.shape2x16, 0.002, this.from.data.size.z / 1000.0, false);
            const modifier = this.from.data.modifier;
            const sizeOffset = new math_1.Vector3();
            sizeOffset.x =
                (modifier.edges[0].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03) +
                    (modifier.edges[2].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03);
            sizeOffset.y =
                (modifier.edges[1].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03) +
                    (modifier.edges[3].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03);
            const positionOffset = new math_1.Vector3();
            positionOffset.x -=
                modifier.edges[0].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03;
            positionOffset.x +=
                modifier.edges[2].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03;
            positionOffset.y -=
                modifier.edges[1].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03;
            positionOffset.y +=
                modifier.edges[3].type == enums_1.LDSPEdgeType.MM2 ? 2 : 0.03;
            const left = this.from.GetPointByAnchor(new math_1.Vector3(0.5, 0, 0)).addX(-sizeOffset.x / 2).div(1000);
            const right = this.from.GetPointByAnchor(new math_1.Vector3(-0.5, 0, 0)).addX(sizeOffset.x / 2).div(1000);
            const bottom = this.from.GetPointByAnchor(new math_1.Vector3(0, -0.5, 0)).addY(sizeOffset.y / 2).div(1000);
            const top = this.from.GetPointByAnchor(new math_1.Vector3(0, 0.5, 0)).addY(-sizeOffset.y / 2).div(1000);
            let plane_size = this.from.data.size.sub(sizeOffset).div(1000.0);
            const offset = positionOffset.div(2000.0).invertX();
            const mainMaterial = yield this.from.GetMaterialData(this.caller.isWebPBRExtrasActive, this.caller.isWebARActive);
            const backMaterial = yield project_component_implementation_1.ProjectComponentImplementation.GetMaterialData(modifier.back_material, this.caller.projectAssembler.targetProject.guid, this.caller.isWebPBRExtrasActive, this.caller.isWebARActive);
            const edgeMaterials = [];
            for (const edge of modifier.edges) {
                edgeMaterials.push(yield project_component_implementation_1.ProjectComponentImplementation.GetMaterialData(edge.material, this.caller.projectAssembler.targetProject.guid, this.caller.isWebPBRExtrasActive, this.caller.isWebARActive));
            }
            const batches = new BatchCollection();
            //front
            {
                let geometry = new PrimitiveMesh(plane_size, modifier.cut_angle1, modifier.cut_angle2, [0], offset);
                batches.CreateOrUpdateBatchByMaterial("front", geometry, mainMaterial);
            }
            //back
            {
                let geometry = new PrimitiveMesh(plane_size, modifier.cut_angle1, modifier.cut_angle2, [2], offset);
                batches.CreateOrUpdateBatchByMaterial("back", geometry, backMaterial);
            }
            let heights = [
                (this.from.GetPointByAnchor(new math_1.Vector3(0.5, -0.5, 0)).sub(this.from.GetPointByAnchor(new math_1.Vector3(0.5, 0.5, 0))).length - sizeOffset.y) / 1000.0,
                (this.from.GetPointByAnchor(new math_1.Vector3(0.5, 0.5, 0)).sub(this.from.GetPointByAnchor(new math_1.Vector3(-0.5, 0.5, 0))).length - sizeOffset.x) / 1000.0,
                (this.from.GetPointByAnchor(new math_1.Vector3(-0.5, -0.5, 0)).sub(this.from.GetPointByAnchor(new math_1.Vector3(-0.5, 0.5, 0))).length - sizeOffset.y) / 1000.0,
                (this.from.GetPointByAnchor(new math_1.Vector3(0.5, -0.5, 0)).sub(this.from.GetPointByAnchor(new math_1.Vector3(-0.5, -0.5, 0))).length - sizeOffset.x) / 1000.0,
            ];
            for (let i = 0; i < 4; i++) {
                let edgeData = modifier.edges[i];
                const height = heights[i];
                const depth = edgeData.type == enums_1.LDSPEdgeType.MM2 ? 0.0002 : 0.00004;
                let position = new math_1.Vector3();
                let rotation = new math_1.Quaternion();
                switch (i) {
                    case 0:
                        position = left
                            .add(positionOffset.div(2000.0))
                            .add(new math_1.Vector3(depth / 2.0, 0, 0))
                            .invertX();
                        rotation = new math_1.Quaternion();
                        break;
                    case 1:
                        position = top
                            .add(positionOffset.div(2000.0))
                            .add(new math_1.Vector3(0, depth / 2.0, 0))
                            .invertX();
                        rotation = math_1.Quaternion.euler(-180, 0, -90 + modifier.cut_angle2).toRH();
                        break;
                    case 2:
                        position = right
                            .add(positionOffset.div(2000.0))
                            .add(new math_1.Vector3(-depth / 2.0, 0, 0))
                            .invertX();
                        rotation = math_1.Quaternion.euler(0, 180, 0).toRH();
                        break;
                    case 3:
                        position = bottom
                            .add(positionOffset.div(2000.0))
                            .add(new math_1.Vector3(0, -depth / 2.0, 0))
                            .invertX();
                        rotation = math_1.Quaternion.euler(180, 0, 90 + modifier.cut_angle1).toRH();
                        break;
                }
                const cut_angles = LDSPBuilder.GetEdgeCutAngles(i, modifier.edges);
                let geometry;
                if (modifier.edges[i].type == enums_1.LDSPEdgeType.MM2)
                    geometry = new ShapedMesh(new math_1.Vector3(depth, height, this.from.data.size.z / 1000.0), localShape, cut_angles[0], cut_angles[1], position, rotation);
                else
                    geometry = new PrimitiveMesh(new math_1.Vector3(depth, height, this.from.data.size.z / 1000.0), cut_angles[0], cut_angles[1], [0, 1, 2, 3, 4, 5], position, rotation);
                batches.CreateOrUpdateBatchByMaterial("edge" + i, geometry, edgeMaterials[i]);
            }
            batches.UpdateFrontendData(this.result);
            const processings = this.from.data.processings == null ? [] : this.from.data.processings;
            const textureCoordinatesProcessing = processings.find((p) => p.type === 2);
            if (textureCoordinatesProcessing != null) {
                for (let key in this.result.children) {
                    const uvs = {};
                    uvs.offset = textureCoordinatesProcessing.offset;
                    uvs.scale = textureCoordinatesProcessing.scale;
                    uvs.rotation = textureCoordinatesProcessing.rotation;
                    this.result.children[key]["uvs"] = uvs;
                }
            }
        });
    }
}
exports.LDSPBuilder = LDSPBuilder;
class PerforationBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.GroupPartFactory.CreateNew();
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Group;
            this.result.children = {};
            const batches = new BatchCollection();
            const mesh = new PrimitiveMesh(this.from.data.size.div(1000.0));
            const mainMaterial = yield this.from.GetMaterialData(this.caller.isWebPBRExtrasActive, this.caller.isWebARActive);
            batches.CreateOrUpdateBatchByMaterial("main", mesh, mainMaterial);
            let targetPlaneMaterial = new Material();
            targetPlaneMaterial.UpdateFrom(mainMaterial);
            targetPlaneMaterial.ao = new Texture();
            targetPlaneMaterial.diffuse = new Texture();
            targetPlaneMaterial.metallic = new Texture();
            targetPlaneMaterial.normal = new Texture();
            targetPlaneMaterial.roughness = new Texture();
            targetPlaneMaterial.emissive = new Texture();
            targetPlaneMaterial.color = "#000000";
            targetPlaneMaterial.web.alphaTest = 0.5;
            targetPlaneMaterial.web.transparent = true;
            const modifier = this.from.data.modifier;
            for (let i = 0; i < modifier.depth; i++) {
                const z = this.from.data.size.z / 1000.0;
                const offset = ((i + 2.0) / modifier.depth) * (z / 2.1);
                const planeMesh = new PrimitiveMesh(this.from.data.size.div(1000.0), 0, 0, [0, 2], new math_1.Vector3(0, 0, z / 2.0 - offset), new math_1.Quaternion(), new math_1.Vector3(1, 1, 0.00001));
                const plane2Mesh = new PrimitiveMesh(this.from.data.size.div(1000.0), 0, 0, [0, 2], new math_1.Vector3(0, 0, z / 2.0 - offset), new math_1.Quaternion(), new math_1.Vector3(1, 1, 0.00001));
                batches.CreateOrUpdateBatchByMaterial("plane_front" + i, planeMesh, targetPlaneMaterial);
                batches.CreateOrUpdateBatchByMaterial("plane_back" + i, plane2Mesh, targetPlaneMaterial);
            }
            batches.UpdateFrontendData(this.result);
        });
    }
}
exports.PerforationBuilder = PerforationBuilder;
class ArrayBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.ArrayProductPartFactory.CreateNew();
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Array;
            const modifier = this.from.data.modifier;
            const childComponent = modifier.child;
            if (childComponent == null) {
                this.isProperResult = false;
                return;
            }
            let childPartBuilder = null;
            if (childComponent.modifier.type == enums_1.ProjectComponentModifierType.MESH)
                childPartBuilder = new MeshBuilder(this.caller, new project_component_implementation_1.ProjectComponentImplementation(this.caller.projectAssembler, childComponent));
            else if (childComponent.modifier.type == enums_1.ProjectComponentModifierType.DUMMY)
                childPartBuilder = new GeometryBuilder(this.caller, new project_component_implementation_1.ProjectComponentImplementation(this.caller.projectAssembler, childComponent));
            if (childPartBuilder == null)
                return; //TODO exception
            yield childPartBuilder.Build();
            this.result.component = childPartBuilder.result;
            this.result.component_transforms = [];
            for (let i = 0; i < modifier.count; i++) {
                const tr = math_1.TransformFactory.CreateNew();
                tr.position = modifier.offset
                    .mult(i)
                    .sub(modifier.offset.mult(modifier.count - 1).div(2.0))
                    .div(1000.0);
                tr.rotation = new math_1.Quaternion(childComponent.rotation).toRH();
                this.result.component_transforms.push(tr);
            }
        });
    }
}
exports.ArrayBuilder = ArrayBuilder;
class BuiltInBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.CalculationProductPartFactory.CreateNew();
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Calculation;
            const modifier = this.from.data.modifier;
            this.result.file = modifier.related_project;
            if (this.caller.generateRelated) {
                const core = this.caller.core;
                const childIIK = core.related_calculations[this.from.data.guid];
                if (childIIK == null) {
                    this.isProperResult = false;
                    return;
                }
                this.result.content = childIIK.frontend;
                this.result.transform.position = this.from.data.position.div(1000).invertX();
                if (!this.caller.isScene)
                    this.result.transform.position = this.result.transform.position.add(childIIK.projectAssembler.GetProjectOffset());
                this.result.transform.rotation = this.from.data.rotation.toRH();
            }
        });
    }
}
exports.BuiltInBuilder = BuiltInBuilder;
class ModelGroupBuilder extends ProductPartBuilder {
    CreateResult() {
        return product_parts_1.GroupPartFactory.CreateNew();
    }
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = product_parts_1.ProductPartType.Group;
            const modifier = this.from.data.modifier;
            this.result.children = {};
            let i = 0;
            for (let node of modifier.nodes) {
                let part = product_parts_1.MeshPartFactory.CreateNew();
                part.type = product_parts_1.ProductPartType.Mesh;
                part.file = filesystem_1.Filesystem.GetRelativePath(modifier.file);
                part.node = node;
                let targetMaterial = yield project_component_implementation_1.ProjectComponentImplementation.GetMaterialData(modifier.materials[i], this.caller.projectAssembler.targetProject.guid, this.caller.isWebPBRExtrasActive, this.caller.isWebARActive);
                part.material = filesystem_1.Filesystem.Cache.GetCachedItem(targetMaterial).id;
                this.result.children[node] = part;
                i++;
            }
        });
    }
}
exports.ModelGroupBuilder = ModelGroupBuilder;
class VirtualObjectBuilder {
    constructor(caller, from) {
        this.caller = caller;
        this.from = from;
        this.result = virtual_object_1.VirtualObjectBaseFactory.CreateNew();
    }
    Build() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.result.guid = this.from.guid;
            this.result.transform.position = this.from.position
                .div(1000.0)
                .invertX();
            const anyModifier = this.from.modifier;
            let targetRotation = null;
            if (anyModifier.rotation != null)
                targetRotation = new math_1.Quaternion(anyModifier.rotation);
            if (((_a = anyModifier.settings) === null || _a === void 0 ? void 0 : _a.rotation) != null)
                targetRotation = new math_1.Quaternion(anyModifier.settings.rotation);
            if (targetRotation == null)
                targetRotation = new math_1.Quaternion();
            this.result.transform.rotation = targetRotation.toRH();
            this.result.is_active = this.from.is_active;
        });
    }
}
exports.VirtualObjectBuilder = VirtualObjectBuilder;
class ShadowPlaneBuilder extends VirtualObjectBuilder {
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = virtual_object_1.VirtualObjectType.ShadowPlane;
            const modifier = this.from.modifier;
            this.result.transform.scale = new math_1.Vector3(modifier.size.x / 1000.0, 1.0, modifier.size.y / 1000.0);
            let data = virtual_object_1.ShadowPlaneDataFactory.CreateNew();
            data.shadow_type = modifier.shadow_type;
            if (modifier.shadow_type == enums_1.ShadowPlaneType.CUSTOM)
                data.path = modifier.settings.path;
            this.result.data = data;
        });
    }
}
exports.ShadowPlaneBuilder = ShadowPlaneBuilder;
class CameraBuilder extends VirtualObjectBuilder {
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = virtual_object_1.VirtualObjectType.Camera;
            let data = null;
            const modifier = this.from.modifier;
            switch (modifier.camera_type) {
                case enums_1.CameraType.STATIC:
                    data = virtual_object_1.CameraDataFactory.CreateNew();
                    break;
                case enums_1.CameraType.SEQUENCE:
                    const sequenceData = virtual_object_1.SequenceCameraDataFactory.CreateNew();
                    const settings = modifier.settings;
                    sequenceData.radius = settings.distance / 1000.0;
                    if (settings.height_offset != null)
                        sequenceData.height_offset =
                            settings.height_offset / 1000.0;
                    sequenceData.constraints = settings.constraints;
                    data = sequenceData;
                    break;
                case enums_1.CameraType.SPHERE:
                    const sphereData = virtual_object_1.SphericalCameraDataFactory.CreateNew();
                    if (modifier.spheric_rotation != null)
                        sphereData.spheric_rotation = new math_1.Vector2(modifier.spheric_rotation).div(180.0).mult(Math.PI);
                    data = sphereData;
                    break;
            }
            if (data == null)
                return; //TODO error
            data.camera_type = modifier.camera_type;
            data.is_pov = modifier.is_pov === true;
            this.result.data = data;
        });
    }
}
exports.CameraBuilder = CameraBuilder;
class LightBuilder extends VirtualObjectBuilder {
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = virtual_object_1.VirtualObjectType.Light;
            const data = virtual_object_1.LightDataFactory.CreateNew();
            const modifier = this.from.modifier;
            const settings = modifier.settings;
            data.light_type = modifier.light_type;
            data.isOn = settings.isOn;
            data.color = settings.color;
            data.intensity = settings.intensity;
            data.temperature = settings.temperature;
            data.range = settings.range;
            data.angle = settings.angle;
            data.isCastingShadows = modifier.is_casting_shadows;
            data.spotInnerAngle = settings.spot;
            data.spotOuterAngle = settings.spotOuterAngle;
            data.width = settings.width;
            data.height = settings.height;
            data.barnDoorAngle = settings.barnDoorAngle;
            data.barnDoorLength = settings.barnDoorLength;
            this.result.data = data;
        });
    }
}
exports.LightBuilder = LightBuilder;
class ManipulatorBuilder extends VirtualObjectBuilder {
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = virtual_object_1.VirtualObjectType.Manipulator;
            const data = virtual_object_1.ManipulatorDataFactory.CreateNew();
            const modifier = this.from.modifier;
            data.radius = modifier.radius / 1000.0;
            data.visual_part = modifier.visual_part;
            data.points_distance = modifier.points_distance;
            data.press_sound = modifier.press_sound;
            data.release_sound = modifier.release_sound;
            this.result.data = data;
        });
    }
}
exports.ManipulatorBuilder = ManipulatorBuilder;
class PointsDistanceBuilder extends VirtualObjectBuilder {
    Build() {
        const _super = Object.create(null, {
            Build: { get: () => super.Build }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.Build.call(this);
            this.result.type = virtual_object_1.VirtualObjectType.Distance;
            const data = virtual_object_1.PointDistanceDataFactory.CreateNew();
            const modifier = this.from.modifier;
            data.color = modifier.color;
            const project = this.caller.projectAssembler.targetProject;
            // Поиск точек для линий.
            let prePoint1 = this.caller.projectAssembler.FindPointByPath(modifier.point1);
            let prePoint2 = this.caller.projectAssembler.FindPointByPath(modifier.point2);
            if (prePoint1 == null || prePoint2 == null)
                return; //TODO error
            let position1 = this.caller.projectAssembler.GetPointPosition(prePoint1);
            let position2 = this.caller.projectAssembler.GetPointPosition(prePoint2);
            if (position1 == null || position2 == null)
                return; //TODO error
            let point1 = position1.div(1000.0).invertX();
            let point2 = position2.div(1000.0).invertX();
            data.lines = {};
            data.lines.ledge1 = {};
            data.lines.ledge1.point1 = point1;
            data.lines.ledge2 = {};
            data.lines.ledge2.point1 = point2;
            data.lines.distance_line = {};
            if (modifier.ledge_size != null && project.points_distance_ledge_end_size != null) {
                let ledge_size = (modifier.ledge_size -
                    project.points_distance_ledge_end_size) /
                    1000;
                let full_ledge_size = modifier.ledge_size / 1000;
                let ledge1_point2;
                let ledge2_point2;
                let distance_line_point1;
                let distance_line_point2;
                if (!modifier.is_projection) {
                    switch (modifier.ledge_type) {
                        case 0:
                            ledge1_point2 = new math_1.Vector3(point1.x, point1.y + full_ledge_size, point1.z);
                            ledge2_point2 = new math_1.Vector3(point2.x, point2.y + full_ledge_size, point2.z);
                            distance_line_point1 = new math_1.Vector3(point1.x, point1.y + ledge_size, point1.z);
                            distance_line_point2 = new math_1.Vector3(point2.x, point2.y + ledge_size, point2.z);
                            break;
                        case 1:
                            ledge1_point2 = new math_1.Vector3(point1.x, point1.y - full_ledge_size, point1.z);
                            ledge2_point2 = new math_1.Vector3(point2.x, point2.y - full_ledge_size, point2.z);
                            distance_line_point1 = new math_1.Vector3(point1.x, point1.y - ledge_size, point1.z);
                            distance_line_point2 = new math_1.Vector3(point2.x, point2.y - ledge_size, point2.z);
                            break;
                        case 2:
                            ledge1_point2 = new math_1.Vector3(point1.x - full_ledge_size, point1.y, point1.z);
                            ledge2_point2 = new math_1.Vector3(point2.x - full_ledge_size, point2.y, point2.z);
                            distance_line_point1 = new math_1.Vector3(point1.x - ledge_size, point1.y, point1.z);
                            distance_line_point2 = new math_1.Vector3(point2.x - ledge_size, point2.y, point2.z);
                            break;
                        case 3:
                            ledge1_point2 = new math_1.Vector3(point1.x + full_ledge_size, point1.y, point1.z);
                            ledge2_point2 = new math_1.Vector3(point2.x + full_ledge_size, point2.y, point2.z);
                            distance_line_point1 = new math_1.Vector3(point1.x + ledge_size, point1.y, point1.z);
                            distance_line_point2 = new math_1.Vector3(point2.x + ledge_size, point2.y, point2.z);
                            break;
                        case 4:
                            ledge1_point2 = new math_1.Vector3(point1.x, point1.y, point1.z + full_ledge_size);
                            ledge2_point2 = new math_1.Vector3(point2.x, point2.y, point2.z + full_ledge_size);
                            distance_line_point1 = new math_1.Vector3(point1.x, point1.y, point1.z + ledge_size);
                            distance_line_point2 = new math_1.Vector3(point2.x, point2.y, point2.z + ledge_size);
                            break;
                        case 5:
                            ledge1_point2 = new math_1.Vector3(point1.x, point1.y, point1.z - full_ledge_size);
                            ledge2_point2 = new math_1.Vector3(point2.x, point2.y, point2.z - full_ledge_size);
                            distance_line_point1 = new math_1.Vector3(point1.x, point1.y, point1.z - ledge_size);
                            distance_line_point2 = new math_1.Vector3(point2.x, point2.y, point2.z - ledge_size);
                            break;
                        default:
                            break;
                    }
                }
                else {
                    switch (modifier.ledge_type) {
                        case 0:
                            if (point1.y >= point2.y) {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y + full_ledge_size, point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y + full_ledge_size + Math.abs(point1.y - point2.y), point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y + ledge_size, point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y + ledge_size + Math.abs(point1.y - point2.y), point2.z);
                            }
                            else {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y + full_ledge_size + Math.abs(point1.y - point2.y), point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y + full_ledge_size, point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y + ledge_size + Math.abs(point1.y - point2.y), point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y + ledge_size, point2.z);
                            }
                            break;
                        case 1:
                            if (point1.y >= point2.y) {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y - full_ledge_size - Math.abs(point1.y - point2.y), point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y - full_ledge_size, point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y - ledge_size - Math.abs(point1.y - point2.y), point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y - ledge_size, point2.z);
                            }
                            else {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y - full_ledge_size, point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y - full_ledge_size - Math.abs(point1.y - point2.y), point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y - ledge_size, point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y - ledge_size - Math.abs(point1.y - point2.y), point2.z);
                            }
                            break;
                        case 2:
                            if (point1.x >= point2.x) {
                                ledge1_point2 = new math_1.Vector3(point1.x - full_ledge_size - Math.abs(point1.x - point2.x), point1.y, point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x - full_ledge_size, point2.y, point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x - ledge_size - Math.abs(point1.x - point2.x), point1.y, point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x - ledge_size, point2.y, point2.z);
                            }
                            else {
                                ledge1_point2 = new math_1.Vector3(point1.x - full_ledge_size, point1.y, point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x - full_ledge_size - Math.abs(point1.x - point2.x), point2.y, point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x - ledge_size, point1.y, point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x - ledge_size - Math.abs(point1.x - point2.x), point2.y, point2.z);
                            }
                            break;
                        case 3:
                            if (point1.x >= point2.x) {
                                ledge1_point2 = new math_1.Vector3(point1.x + full_ledge_size, point1.y, point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x + full_ledge_size + Math.abs(point1.x - point2.x), point2.y, point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x + ledge_size, point1.y, point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x + ledge_size + Math.abs(point1.x - point2.x), point2.y, point2.z);
                            }
                            else {
                                ledge1_point2 = new math_1.Vector3(point1.x + full_ledge_size + Math.abs(point1.x - point2.x), point1.y, point1.z);
                                ledge2_point2 = new math_1.Vector3(point2.x + full_ledge_size, point2.y, point2.z);
                                distance_line_point1 = new math_1.Vector3(point1.x + ledge_size + Math.abs(point1.x - point2.x), point1.y, point1.z);
                                distance_line_point2 = new math_1.Vector3(point2.x + ledge_size, point2.y, point2.z);
                            }
                            break;
                        case 4:
                            if (point1.z >= point2.z) {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y, point1.z + full_ledge_size);
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y, point2.z + full_ledge_size + Math.abs(point1.z - point2.z));
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y, point1.z + ledge_size);
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y, point2.z + ledge_size + Math.abs(point1.z - point2.z));
                            }
                            else {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y, point1.z + full_ledge_size + Math.abs(point1.z - point2.z));
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y, point2.z + full_ledge_size);
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y, point1.z + ledge_size + Math.abs(point1.z - point2.z));
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y, point2.z + ledge_size);
                            }
                            break;
                        case 5:
                            if (point1.z >= point2.z) {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y, point1.z - full_ledge_size - Math.abs(point1.z - point2.z));
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y, point2.z - full_ledge_size);
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y, point1.z - ledge_size - Math.abs(point1.z - point2.z));
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y, point2.z - ledge_size);
                            }
                            else {
                                ledge1_point2 = new math_1.Vector3(point1.x, point1.y, point1.z - full_ledge_size);
                                ledge2_point2 = new math_1.Vector3(point2.x, point2.y, point2.z - full_ledge_size - Math.abs(point1.z - point2.z));
                                distance_line_point1 = new math_1.Vector3(point1.x, point1.y, point1.z - ledge_size);
                                distance_line_point2 = new math_1.Vector3(point2.x, point2.y, point2.z - ledge_size - Math.abs(point1.z - point2.z));
                            }
                            break;
                        default:
                            break;
                    }
                }
                // Конечные точки для выступов.
                data.lines.ledge1.point2 = ledge1_point2;
                data.lines.ledge2.point2 = ledge2_point2;
                // Точки для линии расстояния.
                data.lines.distance_line.point1 = distance_line_point1;
                data.lines.distance_line.point2 = distance_line_point2;
                // Текст.
                let points_distance = math_1.Vector3.distance(data.lines.distance_line.point1, data.lines.distance_line.point2);
                switch (project.points_distance_measurement_unit) {
                    case 0:
                        data.text = Math.round(points_distance * 1000) + " мм";
                        break;
                    case 1:
                        data.text = (points_distance * 100).toFixed(1) + " см";
                        break;
                    case 2:
                        data.text = points_distance.toFixed(2) + " м";
                        break;
                    default:
                        break;
                }
                // Поиск позиции текста.
                let distance_line_center = data.lines.distance_line.point1.add(data.lines.distance_line.point2).div(2.0);
                let text_offset = modifier.text_offset / 1000;
                switch (modifier.text_offset_axis) {
                    case 0:
                        data.text_position = new math_1.Vector3(distance_line_center.x, distance_line_center.y + text_offset, distance_line_center.z);
                        break;
                    case 1:
                        data.text_position = new math_1.Vector3(distance_line_center.x, distance_line_center.y - text_offset, distance_line_center.z);
                        break;
                    case 2:
                        data.text_position = new math_1.Vector3(distance_line_center.x - text_offset, distance_line_center.y, distance_line_center.z);
                        break;
                    case 3:
                        data.text_position = new math_1.Vector3(distance_line_center.x + text_offset, distance_line_center.y, distance_line_center.z);
                        break;
                    case 4:
                        data.text_position = new math_1.Vector3(distance_line_center.x, distance_line_center.y, distance_line_center.z + text_offset);
                        break;
                    case 5:
                        data.text_position = new math_1.Vector3(distance_line_center.x, distance_line_center.y, distance_line_center.z - text_offset);
                        break;
                    default:
                        break;
                }
            }
            this.result.data = data;
        });
    }
}
exports.PointsDistanceBuilder = PointsDistanceBuilder;


/***/ }),

/***/ "./src/Product/product.ts":
/*!********************************!*\
  !*** ./src/Product/product.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductFactory = exports.ProductContainerFactory = void 0;
const virtual_object_1 = __webpack_require__(/*! ./virtual_object */ "./src/Product/virtual_object.ts");
const product_parts_1 = __webpack_require__(/*! ./product_parts */ "./src/Product/product_parts.ts");
const environment_1 = __webpack_require__(/*! ../Environment/environment */ "./src/Environment/environment.ts");
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
const utils_1 = __webpack_require__(/*! ../Project/utils */ "./src/Project/utils.ts");
class ProductContainerFactory {
    static CreateNew() {
        return {
            virtual_objects: {},
            children: {},
            transform: math_1.TransformFactory.CreateNew(),
            normal: new math_1.Vector3(),
            background_color: "",
            type: "group",
            points_distance_lines_weight: 0.0015,
            points_distance_arrows_size: 10,
            points_distance_text_size: 20,
            points_distance_color: "#0011AD",
        };
    }
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f;
        if (!raw) {
            return ProductContainerFactory.CreateNew();
        }
        return {
            virtual_objects: raw[(0, utils_1.nameof)("virtual_objects")]
                ? Object.fromEntries(Object.entries(raw[(0, utils_1.nameof)("virtual_objects")])
                    .map(([key, value]) => [key, virtual_object_1.VirtualObjectBaseFactory.Create(value)])) : {},
            children: raw[(0, utils_1.nameof)("children")]
                ? Object.fromEntries(Object.entries(raw[(0, utils_1.nameof)("children")])
                    .map(([key, value]) => [key, product_parts_1.ProductPartBaseFactory.Create(value)])) : {},
            transform: raw[(0, utils_1.nameof)("transform")] ? math_1.TransformFactory.Create(raw[(0, utils_1.nameof)("transform")]) : math_1.TransformFactory.CreateNew(),
            normal: raw[(0, utils_1.nameof)("normal")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("normal")]) : new math_1.Vector3(),
            background_color: (_a = raw[(0, utils_1.nameof)("background_color")]) !== null && _a !== void 0 ? _a : "",
            type: (_b = raw[(0, utils_1.nameof)("type")]) !== null && _b !== void 0 ? _b : "group",
            points_distance_lines_weight: (_c = raw[(0, utils_1.nameof)("points_distance_lines_weight")]) !== null && _c !== void 0 ? _c : 0.0015,
            points_distance_arrows_size: (_d = raw[(0, utils_1.nameof)("points_distance_arrows_size")]) !== null && _d !== void 0 ? _d : 10,
            points_distance_text_size: (_e = raw[(0, utils_1.nameof)("points_distance_text_size")]) !== null && _e !== void 0 ? _e : 20,
            points_distance_color: (_f = raw[(0, utils_1.nameof)("points_distance_color")]) !== null && _f !== void 0 ? _f : "#0011AD",
        };
    }
}
exports.ProductContainerFactory = ProductContainerFactory;
class ProductFactory {
    static CreateNew() {
        return {
            product_container: ProductContainerFactory.CreateNew(),
            user_data: "isMovable=0",
            connection_type: "floor",
            world: environment_1.WorldSettingsFactory.CreateNew(),
        };
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return ProductFactory.CreateNew();
        }
        return {
            product_container: raw[(0, utils_1.nameof)("product_container")] ? ProductContainerFactory.Create(raw[(0, utils_1.nameof)("product_container")]) : ProductContainerFactory.CreateNew(),
            user_data: (_a = raw[(0, utils_1.nameof)("user_data")]) !== null && _a !== void 0 ? _a : "isMovable=0",
            connection_type: (_b = raw[(0, utils_1.nameof)("connection_type")]) !== null && _b !== void 0 ? _b : "floor",
            world: raw[(0, utils_1.nameof)("world")] ? environment_1.WorldSettingsFactory.Create(raw[(0, utils_1.nameof)("world")]) : environment_1.WorldSettingsFactory.CreateNew(),
        };
    }
}
exports.ProductFactory = ProductFactory;


/***/ }),

/***/ "./src/Product/product_parts.ts":
/*!**************************************!*\
  !*** ./src/Product/product_parts.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculationProductPartFactory = exports.ArrayProductPartFactory = exports.GeometryPartFactory = exports.MeshPartFactory = exports.GroupPartFactory = exports.ProductPartBaseFactory = exports.UVTransformFactory = exports.ProductPartType = void 0;
const product_1 = __webpack_require__(/*! ./product */ "./src/Product/product.ts");
const utils_1 = __webpack_require__(/*! ../Project/utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
var ProductPartType;
(function (ProductPartType) {
    ProductPartType["Group"] = "model_group";
    ProductPartType["Mesh"] = "model_node";
    ProductPartType["Geometry"] = "geometry";
    ProductPartType["Calculation"] = "calculation";
    ProductPartType["Array"] = "array";
})(ProductPartType || (exports.ProductPartType = ProductPartType = {}));
class UVTransformFactory {
    static CreateNew() {
        return {
            offset: new math_1.Vector2(),
            scale: new math_1.Vector2(1, 1),
            rotation: 0,
        };
    }
    static Create(raw) {
        var _a;
        if (!raw) {
            return UVTransformFactory.CreateNew();
        }
        return {
            offset: raw[(0, utils_1.nameof)("offset")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("offset")]) : new math_1.Vector2(),
            scale: raw[(0, utils_1.nameof)("scale")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("scale")]) : new math_1.Vector2(1, 1),
            rotation: (_a = raw[(0, utils_1.nameof)("rotation")]) !== null && _a !== void 0 ? _a : 0,
        };
    }
}
exports.UVTransformFactory = UVTransformFactory;
class ProductPartBaseFactory {
    static CreateNew() {
        return {
            transform: math_1.TransformFactory.CreateNew(),
            name: "",
            build_order: 0,
            order: 0,
            user_data: "",
            is_active: true,
            type: ProductPartType.Group,
        };
    }
    static CreateInternal(raw) {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            transform: math_1.TransformFactory.Create((_a = raw[(0, utils_1.nameof)("transform")]) !== null && _a !== void 0 ? _a : {}),
            name: (_b = raw[(0, utils_1.nameof)("name")]) !== null && _b !== void 0 ? _b : "",
            build_order: (_c = raw[(0, utils_1.nameof)("build_order")]) !== null && _c !== void 0 ? _c : 0,
            order: (_d = raw[(0, utils_1.nameof)("order")]) !== null && _d !== void 0 ? _d : 0,
            user_data: (_e = raw[(0, utils_1.nameof)("user_data")]) !== null && _e !== void 0 ? _e : "",
            is_active: (_f = raw[(0, utils_1.nameof)("is_active")]) !== null && _f !== void 0 ? _f : true,
            type: (_g = raw[(0, utils_1.nameof)("type")]) !== null && _g !== void 0 ? _g : ProductPartType.Group,
        };
    }
    static Create(raw) {
        if (!raw) {
            throw new Error("raw is undefined for ProductPartBaseFactory.Create");
        }
        switch (raw[(0, utils_1.nameof)("type")]) {
            case ProductPartType.Group:
                return GroupPartFactory.Create(raw);
            case ProductPartType.Mesh:
                return MeshPartFactory.Create(raw);
            case ProductPartType.Geometry:
                return GeometryPartFactory.Create(raw);
            case ProductPartType.Calculation:
                return CalculationProductPartFactory.Create(raw);
            case ProductPartType.Array:
                return ArrayProductPartFactory.Create(raw);
            default:
                throw new Error(`Unknown product part type: ${raw[(0, utils_1.nameof)("type")]}`);
        }
    }
}
exports.ProductPartBaseFactory = ProductPartBaseFactory;
class GroupPartFactory extends ProductPartBaseFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateNew()), { children: {}, type: ProductPartType.Group, uvs: UVTransformFactory.CreateNew() });
    }
    static Create(raw) {
        var _a;
        if (!raw) {
            return GroupPartFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateInternal(raw)), { children: (_a = raw[(0, utils_1.nameof)("children")]) !== null && _a !== void 0 ? _a : {}, type: ProductPartType.Group, uvs: raw[(0, utils_1.nameof)("uvs")] ? UVTransformFactory.Create(raw[(0, utils_1.nameof)("uvs")]) : UVTransformFactory.CreateNew() });
    }
}
exports.GroupPartFactory = GroupPartFactory;
class MeshPartFactory extends ProductPartBaseFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateNew()), { file: "", node: "", material: "", type: ProductPartType.Mesh, uvs: UVTransformFactory.CreateNew() });
    }
    static Create(raw) {
        var _a, _b, _c;
        if (!raw) {
            return MeshPartFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateInternal(raw)), { file: (_a = raw[(0, utils_1.nameof)("file")]) !== null && _a !== void 0 ? _a : "", node: (_b = raw[(0, utils_1.nameof)("node")]) !== null && _b !== void 0 ? _b : "", material: (_c = raw[(0, utils_1.nameof)("material")]) !== null && _c !== void 0 ? _c : "", type: ProductPartType.Mesh, uvs: raw[(0, utils_1.nameof)("uvs")] ? UVTransformFactory.Create(raw[(0, utils_1.nameof)("uvs")]) : UVTransformFactory.CreateNew() });
    }
}
exports.MeshPartFactory = MeshPartFactory;
class GeometryPartFactory extends ProductPartBaseFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateNew()), { geometry: "", material: "", type: ProductPartType.Geometry, uvs: UVTransformFactory.CreateNew() });
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return GeometryPartFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateInternal(raw)), { geometry: (_a = raw[(0, utils_1.nameof)("geometry")]) !== null && _a !== void 0 ? _a : "", material: (_b = raw[(0, utils_1.nameof)("material")]) !== null && _b !== void 0 ? _b : "", type: ProductPartType.Geometry, uvs: raw[(0, utils_1.nameof)("uvs")] ? UVTransformFactory.Create(raw[(0, utils_1.nameof)("uvs")]) : UVTransformFactory.CreateNew() });
    }
}
exports.GeometryPartFactory = GeometryPartFactory;
class ArrayProductPartFactory extends ProductPartBaseFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateNew()), { component: ProductPartBaseFactory.CreateNew(), component_transforms: [], type: ProductPartType.Array });
    }
    static Create(raw) {
        if (!raw) {
            return ArrayProductPartFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateInternal(raw)), { component: raw[(0, utils_1.nameof)("component")] ? ProductPartBaseFactory.Create(raw[(0, utils_1.nameof)("component")]) : ProductPartBaseFactory.CreateNew(), component_transforms: raw[(0, utils_1.nameof)("component_transforms")] ? raw[(0, utils_1.nameof)("component_transforms")].map((t) => math_1.TransformFactory.Create(t)) : [], type: ProductPartType.Array });
    }
}
exports.ArrayProductPartFactory = ArrayProductPartFactory;
class CalculationProductPartFactory extends ProductPartBaseFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateNew()), { file: "", content: null, type: ProductPartType.Calculation });
    }
    static Create(raw) {
        var _a;
        if (!raw) {
            return CalculationProductPartFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, ProductPartBaseFactory.CreateInternal(raw)), { file: (_a = raw[(0, utils_1.nameof)("file")]) !== null && _a !== void 0 ? _a : "", content: raw[(0, utils_1.nameof)("content")] ? product_1.ProductFactory.Create(raw[(0, utils_1.nameof)("content")]) : null, type: ProductPartType.Calculation });
    }
}
exports.CalculationProductPartFactory = CalculationProductPartFactory;


/***/ }),

/***/ "./src/Product/shape.ts":
/*!******************************!*\
  !*** ./src/Product/shape.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shape = void 0;
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
class Shape {
    constructor(rawData) {
        this.offset_left = 0;
        this.offset_right = 0;
        this.offset_top = 0;
        this.offset_bottom = 0;
        this.data = [];
        this.offset_left = rawData.offset_left;
        this.offset_right = rawData.offset_right;
        this.offset_top = rawData.offset_top;
        this.offset_bottom = rawData.offset_bottom;
        for (let v of rawData.data)
            this.data.push(new math_1.Vector2(v));
    }
    static GetShapeSize(data) {
        if (data == null)
            return new math_1.Vector2();
        const min = new math_1.Vector2(1, 1).mult(Number.MAX_VALUE);
        const max = new math_1.Vector2(1, 1).mult(Number.MIN_VALUE);
        for (let s of data) {
            if (s.x < min.x)
                min.x = s.x;
            if (s.x > max.x)
                max.x = s.x;
            if (s.y < min.y)
                min.y = s.y;
            if (s.y > max.y)
                max.y = s.y;
        }
        return max.sub(min);
    }
    static GetShapeFromData(shape, width, height, is_mirrored) {
        if (height == null)
            height = 16;
        function CenterShape(data) {
            const result = [];
            let sum = new math_1.Vector2();
            for (const s of data)
                sum = sum.add(s);
            sum = sum.div(data.length);
            for (const s of data)
                result.push(s.sub(sum));
            return result;
        }
        function MirrorShape(data) {
            for (let v of data)
                v.x = -v.x;
            return data.reverse();
        }
        let result = [];
        if (shape.data == null) {
            for (let i = 0; i < shape.length; i++)
                result[i] = new math_1.Vector2(shape[i]);
            result = CenterShape(result);
            if (is_mirrored)
                result = MirrorShape(result);
            return result;
        }
        for (let i = 0; i < shape.data.length; i++)
            result[i] = new math_1.Vector2(shape.data[i]);
        result = CenterShape(result);
        if (is_mirrored)
            result = MirrorShape(result);
        if (shape.offset_left == 0 &&
            shape.offset_right == 0 &&
            shape.offset_top == 0 &&
            shape.offset_bottom == 0)
            return result;
        const size = Shape.GetShapeSize(result);
        if (shape.offset_top == null)
            shape.offset_top = 0;
        if (shape.offset_bottom == null)
            shape.offset_bottom = 0;
        const ol = shape.offset_left / 1000.0;
        const or = shape.offset_right / 1000.0;
        const ot = shape.offset_top / 1000.0;
        const ob = shape.offset_bottom / 1000.0;
        const dx = (width - size.x) / 2.0;
        const dy = (height - size.y) / 2.0;
        if (ol != 0 && or != 0) {
            for (let i = 0; i < result.length; i++) {
                const v = result[i];
                if (v.x < ol - size.x / 2.0)
                    v.x -= dx;
                if (v.x > -or + size.x / 2.0)
                    v.x += dx;
                result[i] = v;
            }
        }
        else if (ol != 0) {
            for (let i = 0; i < result.length; i++) {
                const v = result[i];
                if (v.x < ol - size.x / 2.0)
                    v.x -= dx;
                if (v.x > ol - size.x / 2.0)
                    v.x += dx;
                result[i] = v;
            }
        }
        else if (or != 0) {
            for (let i = 0; i < result.length; i++) {
                const v = result[i];
                if (v.x < -or + size.x / 2.0)
                    v.x -= dx;
                if (v.x > -or + size.x / 2.0)
                    v.x += dx;
                result[i] = v;
            }
        }
        if (ob != 0 && ot != 0) {
            for (let i = 0; i < result.length; i++) {
                const v = result[i];
                if (v.y < ob - size.y / 2.0)
                    v.y -= dy;
                if (v.y > -ot + size.y / 2.0)
                    v.y += dy;
                result[i] = v;
            }
        }
        else if (ob != 0) {
            for (let i = 0; i < result.length; i++) {
                const v = result[i];
                if (v.y < ob - size.y / 2.0)
                    v.y -= dy;
                if (v.y > ob - size.y / 2.0)
                    v.y += dy;
                result[i] = v;
            }
        }
        else if (ot != 0) {
            for (let i = 0; i < result.length; i++) {
                const v = result[i];
                if (v.y < -ot + size.y / 2.0)
                    v.y -= dy;
                if (v.y > -ot + size.y / 2.0)
                    v.y += dy;
                result[i] = v;
            }
        }
        return result;
    }
}
exports.Shape = Shape;


/***/ }),

/***/ "./src/Product/virtual_object.ts":
/*!***************************************!*\
  !*** ./src/Product/virtual_object.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VirtualObjectBaseFactory = exports.PointDistanceDataFactory = exports.ManipulatorDataFactory = exports.LightDataFactory = exports.SequenceCameraDataFactory = exports.SequenceCameraConstraintsFactory = exports.TargetConstraintFactory = exports.ElevationConstraintFactory = exports.AzimuthConstraintFactory = exports.DistanceConstraintFactory = exports.CameraConstraintFactory = exports.SphericalCameraDataFactory = exports.CameraDataFactory = exports.ShadowPlaneFileDataFactory = exports.ShadowPlaneDataFactory = exports.VirtualObjectDataFactory = exports.VirtualObjectType = void 0;
const enums_1 = __webpack_require__(/*! ../Project/enums */ "./src/Project/enums.ts");
const math_1 = __webpack_require__(/*! ../math */ "./src/math.ts");
const utils_1 = __webpack_require__(/*! ../Project/utils */ "./src/Project/utils.ts");
var VirtualObjectType;
(function (VirtualObjectType) {
    VirtualObjectType["ShadowPlane"] = "shadow_plane";
    VirtualObjectType["Camera"] = "camera";
    VirtualObjectType["Light"] = "light";
    VirtualObjectType["Manipulator"] = "manipulator";
    VirtualObjectType["Distance"] = "points_distance";
})(VirtualObjectType || (exports.VirtualObjectType = VirtualObjectType = {}));
class VirtualObjectDataFactory {
    static CreateNew() {
        return {};
    }
    static Create(raw) {
        if (!raw) {
            return VirtualObjectDataFactory.CreateNew();
        }
        return {};
    }
}
exports.VirtualObjectDataFactory = VirtualObjectDataFactory;
class ShadowPlaneDataFactory {
    static CreateNew() {
        return {
            shadow_type: enums_1.ShadowPlaneType.SQUARE,
            path: "",
        };
    }
    static Create(raw) {
        var _a;
        if (!raw) {
            return ShadowPlaneDataFactory.CreateNew();
        }
        return {
            shadow_type: (_a = raw[(0, utils_1.nameof)("shadow_type")]) !== null && _a !== void 0 ? _a : enums_1.ShadowPlaneType.SQUARE,
            path: raw[(0, utils_1.nameof)("path")],
        };
    }
}
exports.ShadowPlaneDataFactory = ShadowPlaneDataFactory;
class ShadowPlaneFileDataFactory {
    static CreateNew() {
        return {
            shadow_type: enums_1.ShadowPlaneType.SQUARE,
            path: "",
        };
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return ShadowPlaneFileDataFactory.CreateNew();
        }
        return {
            shadow_type: (_a = raw[(0, utils_1.nameof)("shadow_type")]) !== null && _a !== void 0 ? _a : enums_1.ShadowPlaneType.SQUARE,
            path: (_b = raw[(0, utils_1.nameof)("path")]) !== null && _b !== void 0 ? _b : "",
        };
    }
}
exports.ShadowPlaneFileDataFactory = ShadowPlaneFileDataFactory;
class CameraDataFactory {
    static CreateNew() {
        return {
            camera_type: enums_1.CameraType.STATIC,
            order: 0,
            is_pov: false,
        };
    }
    static Create(raw) {
        var _a, _b, _c;
        if (!raw) {
            return CameraDataFactory.CreateNew();
        }
        return {
            camera_type: (_a = raw[(0, utils_1.nameof)("camera_type")]) !== null && _a !== void 0 ? _a : enums_1.CameraType.STATIC,
            order: (_b = raw[(0, utils_1.nameof)("order")]) !== null && _b !== void 0 ? _b : 0,
            is_pov: (_c = raw[(0, utils_1.nameof)("is_pov")]) !== null && _c !== void 0 ? _c : false,
        };
    }
}
exports.CameraDataFactory = CameraDataFactory;
class SphericalCameraDataFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, CameraDataFactory.CreateNew()), { spheric_rotation: new math_1.Vector2() });
    }
    static Create(raw) {
        if (!raw) {
            return SphericalCameraDataFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, CameraDataFactory.Create(raw)), { spheric_rotation: raw[(0, utils_1.nameof)("spheric_rotation")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("spheric_rotation")]) : new math_1.Vector2() });
    }
}
exports.SphericalCameraDataFactory = SphericalCameraDataFactory;
class CameraConstraintFactory {
    static CreateNew() {
        return {
            is_active: false,
        };
    }
    static Create(raw) {
        var _a;
        if (!raw) {
            return CameraConstraintFactory.CreateNew();
        }
        return {
            is_active: (_a = raw[(0, utils_1.nameof)("is_active")]) !== null && _a !== void 0 ? _a : false,
        };
    }
}
exports.CameraConstraintFactory = CameraConstraintFactory;
class DistanceConstraintFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, CameraConstraintFactory.CreateNew()), { min: 0, max: 0 });
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return DistanceConstraintFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, CameraConstraintFactory.Create(raw)), { min: (_a = raw[(0, utils_1.nameof)("min")]) !== null && _a !== void 0 ? _a : 0, max: (_b = raw[(0, utils_1.nameof)("max")]) !== null && _b !== void 0 ? _b : 0 });
    }
}
exports.DistanceConstraintFactory = DistanceConstraintFactory;
class AzimuthConstraintFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, CameraConstraintFactory.CreateNew()), { left: 0, right: 0 });
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return AzimuthConstraintFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, CameraConstraintFactory.Create(raw)), { left: (_a = raw[(0, utils_1.nameof)("left")]) !== null && _a !== void 0 ? _a : 0, right: (_b = raw[(0, utils_1.nameof)("right")]) !== null && _b !== void 0 ? _b : 0 });
    }
}
exports.AzimuthConstraintFactory = AzimuthConstraintFactory;
class ElevationConstraintFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, CameraConstraintFactory.CreateNew()), { down: 0, up: 0 });
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return ElevationConstraintFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, CameraConstraintFactory.Create(raw)), { down: (_a = raw[(0, utils_1.nameof)("down")]) !== null && _a !== void 0 ? _a : 0, up: (_b = raw[(0, utils_1.nameof)("up")]) !== null && _b !== void 0 ? _b : 0 });
    }
}
exports.ElevationConstraintFactory = ElevationConstraintFactory;
class TargetConstraintFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, CameraConstraintFactory.CreateNew()), { type: "", radius: 0 });
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return TargetConstraintFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, CameraConstraintFactory.Create(raw)), { type: (_a = raw[(0, utils_1.nameof)("type")]) !== null && _a !== void 0 ? _a : "", radius: (_b = raw[(0, utils_1.nameof)("radius")]) !== null && _b !== void 0 ? _b : 0 });
    }
}
exports.TargetConstraintFactory = TargetConstraintFactory;
class SequenceCameraConstraintsFactory {
    static CreateNew() {
        return {
            distance: DistanceConstraintFactory.CreateNew(),
            azimuth: AzimuthConstraintFactory.CreateNew(),
            elevation: ElevationConstraintFactory.CreateNew(),
            target: TargetConstraintFactory.CreateNew(),
        };
    }
    static Create(raw) {
        if (!raw) {
            return SequenceCameraConstraintsFactory.CreateNew();
        }
        return {
            distance: raw[(0, utils_1.nameof)("distance")] ? DistanceConstraintFactory.Create(raw[(0, utils_1.nameof)("distance")]) : DistanceConstraintFactory.CreateNew(),
            azimuth: raw[(0, utils_1.nameof)("azimuth")] ? AzimuthConstraintFactory.Create(raw[(0, utils_1.nameof)("azimuth")]) : AzimuthConstraintFactory.CreateNew(),
            elevation: raw[(0, utils_1.nameof)("elevation")] ? ElevationConstraintFactory.Create(raw[(0, utils_1.nameof)("elevation")]) : ElevationConstraintFactory.CreateNew(),
            target: raw[(0, utils_1.nameof)("target")] ? TargetConstraintFactory.Create(raw[(0, utils_1.nameof)("target")]) : TargetConstraintFactory.CreateNew(),
        };
    }
}
exports.SequenceCameraConstraintsFactory = SequenceCameraConstraintsFactory;
class SequenceCameraDataFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, CameraDataFactory.CreateNew()), { radius: 0, height_offset: 0, constraints: SequenceCameraConstraintsFactory.CreateNew() });
    }
    static Create(raw) {
        var _a, _b;
        if (!raw) {
            return SequenceCameraDataFactory.CreateNew();
        }
        return Object.assign(Object.assign({}, CameraDataFactory.Create(raw)), { radius: (_a = raw[(0, utils_1.nameof)("radius")]) !== null && _a !== void 0 ? _a : 0, height_offset: (_b = raw[(0, utils_1.nameof)("height_offset")]) !== null && _b !== void 0 ? _b : 0, constraints: raw[(0, utils_1.nameof)("constraints")] ? SequenceCameraConstraintsFactory.Create(raw[(0, utils_1.nameof)("constraints")]) : SequenceCameraConstraintsFactory.CreateNew() });
    }
}
exports.SequenceCameraDataFactory = SequenceCameraDataFactory;
class LightDataFactory {
    static CreateNew() {
        return {
            light_type: enums_1.LightType.DIRECTIONAL,
            isOn: true,
            color: "",
            intensity: 1,
            temperature: 0,
            range: 0,
            angle: 0,
            isCastingShadows: true,
            spotInnerAngle: 0,
            spotOuterAngle: 0,
            width: 0,
            height: 0,
            barnDoorAngle: 0,
            barnDoorLength: 0,
        };
    }
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (!raw) {
            return LightDataFactory.CreateNew();
        }
        return {
            light_type: (_a = raw[(0, utils_1.nameof)("light_type")]) !== null && _a !== void 0 ? _a : enums_1.LightType.DIRECTIONAL,
            isOn: (_b = raw[(0, utils_1.nameof)("isOn")]) !== null && _b !== void 0 ? _b : true,
            color: (_c = raw[(0, utils_1.nameof)("color")]) !== null && _c !== void 0 ? _c : "",
            intensity: (_d = raw[(0, utils_1.nameof)("intensity")]) !== null && _d !== void 0 ? _d : 1,
            temperature: (_e = raw[(0, utils_1.nameof)("temperature")]) !== null && _e !== void 0 ? _e : 0,
            range: (_f = raw[(0, utils_1.nameof)("range")]) !== null && _f !== void 0 ? _f : 0,
            angle: (_g = raw[(0, utils_1.nameof)("angle")]) !== null && _g !== void 0 ? _g : 0,
            isCastingShadows: (_h = raw[(0, utils_1.nameof)("isCastingShadows")]) !== null && _h !== void 0 ? _h : true,
            spotInnerAngle: (_j = raw[(0, utils_1.nameof)("spotInnerAngle")]) !== null && _j !== void 0 ? _j : 0,
            spotOuterAngle: (_k = raw[(0, utils_1.nameof)("spotOuterAngle")]) !== null && _k !== void 0 ? _k : 0,
            width: (_l = raw[(0, utils_1.nameof)("width")]) !== null && _l !== void 0 ? _l : 0,
            height: (_m = raw[(0, utils_1.nameof)("height")]) !== null && _m !== void 0 ? _m : 0,
            barnDoorAngle: (_o = raw[(0, utils_1.nameof)("barnDoorAngle")]) !== null && _o !== void 0 ? _o : 0,
            barnDoorLength: (_p = raw[(0, utils_1.nameof)("barnDoorLength")]) !== null && _p !== void 0 ? _p : 0,
        };
    }
}
exports.LightDataFactory = LightDataFactory;
class ManipulatorDataFactory {
    static CreateNew() {
        return {
            radius: 0,
            visual_part: "",
            points_distance: "",
            press_sound: "",
            release_sound: "",
        };
    }
    static Create(raw) {
        var _a, _b, _c, _d, _e;
        if (!raw) {
            return ManipulatorDataFactory.CreateNew();
        }
        return {
            radius: (_a = raw[(0, utils_1.nameof)("radius")]) !== null && _a !== void 0 ? _a : 0,
            visual_part: (_b = raw[(0, utils_1.nameof)("visual_part")]) !== null && _b !== void 0 ? _b : "",
            points_distance: (_c = raw[(0, utils_1.nameof)("points_distance")]) !== null && _c !== void 0 ? _c : "",
            press_sound: (_d = raw[(0, utils_1.nameof)("press_sound")]) !== null && _d !== void 0 ? _d : "",
            release_sound: (_e = raw[(0, utils_1.nameof)("release_sound")]) !== null && _e !== void 0 ? _e : "",
        };
    }
}
exports.ManipulatorDataFactory = ManipulatorDataFactory;
class PointDistanceDataFactory {
    static CreateNew() {
        return {
            lines: {},
            color: "",
            text: "",
            text_position: new math_1.Vector3(),
        };
    }
    static Create(raw) {
        var _a, _b, _c;
        if (!raw) {
            return PointDistanceDataFactory.CreateNew();
        }
        return {
            lines: (_a = raw[(0, utils_1.nameof)("lines")]) !== null && _a !== void 0 ? _a : {},
            color: (_b = raw[(0, utils_1.nameof)("color")]) !== null && _b !== void 0 ? _b : "",
            text: (_c = raw[(0, utils_1.nameof)("text")]) !== null && _c !== void 0 ? _c : "",
            text_position: raw[(0, utils_1.nameof)("text_position")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("text_position")]) : new math_1.Vector3(),
        };
    }
}
exports.PointDistanceDataFactory = PointDistanceDataFactory;
class VirtualObjectBaseFactory {
    static CreateNew() {
        return {
            guid: "",
            type: VirtualObjectType.Camera,
            transform: math_1.TransformFactory.CreateNew(),
            data: VirtualObjectDataFactory.CreateNew(),
            is_active: true,
        };
    }
    static Create(raw) {
        var _a, _b, _c;
        if (!raw) {
            return VirtualObjectBaseFactory.CreateNew();
        }
        const type = (_a = raw[(0, utils_1.nameof)("type")]) !== null && _a !== void 0 ? _a : VirtualObjectType.Camera;
        let dataFactory;
        switch (type) {
            case VirtualObjectType.ShadowPlane:
                dataFactory = ShadowPlaneDataFactory;
                break;
            case VirtualObjectType.Camera:
                dataFactory = CameraDataFactory;
                break;
            case VirtualObjectType.Light:
                dataFactory = LightDataFactory;
                break;
            case VirtualObjectType.Manipulator:
                dataFactory = ManipulatorDataFactory;
                break;
            case VirtualObjectType.Distance:
                dataFactory = PointDistanceDataFactory;
                break;
            default:
                dataFactory = VirtualObjectDataFactory;
        }
        return {
            guid: (_b = raw[(0, utils_1.nameof)("guid")]) !== null && _b !== void 0 ? _b : "",
            type,
            transform: raw[(0, utils_1.nameof)("transform")] ? math_1.TransformFactory.Create(raw[(0, utils_1.nameof)("transform")]) : math_1.TransformFactory.CreateNew(),
            data: raw[(0, utils_1.nameof)("data")] ? dataFactory.Create(raw[(0, utils_1.nameof)("data")]) : dataFactory.CreateNew(),
            is_active: (_c = raw[(0, utils_1.nameof)("is_active")]) !== null && _c !== void 0 ? _c : true,
        };
    }
}
exports.VirtualObjectBaseFactory = VirtualObjectBaseFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/array_modifier.ts":
/*!*************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/array_modifier.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Array модификатор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentArrayModifierFactory = void 0;
const project_component_1 = __webpack_require__(/*! ./project_component */ "./src/Project/DTOs/ProjectComponent/project_component.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class ProjectComponentArrayModifierFactory {
    static Create(raw) {
        var _a;
        return {
            type: enums_1.ProjectComponentModifierType.ARRAY,
            offset: raw[(0, utils_1.nameof)("offset")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("offset")]) : new math_1.Vector3(0, 0, 0),
            count: (_a = raw[(0, utils_1.nameof)("count")]) !== null && _a !== void 0 ? _a : 1,
            child: raw[(0, utils_1.nameof)("child")] ? project_component_1.ProjectComponentFactory.Create(raw[(0, utils_1.nameof)("child")]) : null,
        };
    }
}
exports.ProjectComponentArrayModifierFactory = ProjectComponentArrayModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/builtin_modifier.ts":
/*!***************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/builtin_modifier.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// BuiltIn модификатор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentBuiltInModifierFactory = exports.BuiltInMarginFactory = void 0;
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
class BuiltInMarginFactory {
    static Create(raw) {
        return {
            face: raw[(0, utils_1.nameof)('face')],
            values: raw[(0, utils_1.nameof)('values')] || {},
        };
    }
}
exports.BuiltInMarginFactory = BuiltInMarginFactory;
class ProjectComponentBuiltInModifierFactory {
    static CreateNew() {
        return {
            type: enums_1.ProjectComponentModifierType.BUILTIN,
            related_project: "",
            apply_offset: true,
            show_inputs: true,
            category: "",
            target_slot: "",
            allow_iik_slotting: false,
            margins: [],
        };
    }
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f;
        return {
            type: enums_1.ProjectComponentModifierType.BUILTIN,
            related_project: (_a = raw[(0, utils_1.nameof)('related_project')]) !== null && _a !== void 0 ? _a : "",
            apply_offset: (_b = raw[(0, utils_1.nameof)('apply_offset')]) !== null && _b !== void 0 ? _b : true,
            show_inputs: (_c = raw[(0, utils_1.nameof)('show_inputs')]) !== null && _c !== void 0 ? _c : true,
            category: (_d = raw[(0, utils_1.nameof)('category')]) !== null && _d !== void 0 ? _d : "",
            target_slot: (_e = raw[(0, utils_1.nameof)('target_slot')]) !== null && _e !== void 0 ? _e : "",
            allow_iik_slotting: (_f = raw[(0, utils_1.nameof)('allow_iik_slotting')]) !== null && _f !== void 0 ? _f : true,
            margins: (raw[(0, utils_1.nameof)('margins')] || []).map((margin) => BuiltInMarginFactory.Create(margin)),
        };
    }
}
exports.ProjectComponentBuiltInModifierFactory = ProjectComponentBuiltInModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/component_modifier.ts":
/*!*****************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/component_modifier.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentModifierFactory = void 0;
const ldsp_modifier_1 = __webpack_require__(/*! ./ldsp_modifier */ "./src/Project/DTOs/ProjectComponent/ldsp_modifier.ts");
const shape_modifier_1 = __webpack_require__(/*! ./shape_modifier */ "./src/Project/DTOs/ProjectComponent/shape_modifier.ts");
const mesh_modifier_1 = __webpack_require__(/*! ./mesh_modifier */ "./src/Project/DTOs/ProjectComponent/mesh_modifier.ts");
const dummy_modifier_1 = __webpack_require__(/*! ./dummy_modifier */ "./src/Project/DTOs/ProjectComponent/dummy_modifier.ts");
const array_modifier_1 = __webpack_require__(/*! ./array_modifier */ "./src/Project/DTOs/ProjectComponent/array_modifier.ts");
const builtin_modifier_1 = __webpack_require__(/*! ./builtin_modifier */ "./src/Project/DTOs/ProjectComponent/builtin_modifier.ts");
const OtherFactories = __importStar(__webpack_require__(/*! ./other_modifiers */ "./src/Project/DTOs/ProjectComponent/other_modifiers.ts"));
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
class ProjectComponentModifierFactory {
    static CreateNew() {
        return dummy_modifier_1.ProjectComponentDummyModifierFactory.Create({
            cut_angle1: 0,
            cut_angle2: 0,
            target_faces: []
        });
    }
    static Create(raw) {
        const type = raw[(0, utils_1.nameof)("type")];
        switch (type) {
            case enums_1.ProjectComponentModifierType.LDSP:
                return ldsp_modifier_1.ProjectComponentLDSPModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.SHAPE:
                return shape_modifier_1.ProjectComponentShapeModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.MESH:
                return mesh_modifier_1.ProjectComponentMeshModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.DUMMY:
                return dummy_modifier_1.ProjectComponentDummyModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.ARRAY:
                return array_modifier_1.ProjectComponentArrayModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.BUILTIN:
                return builtin_modifier_1.ProjectComponentBuiltInModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.GLASS:
                return OtherFactories.ProjectComponentGlassModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.LIGHT_SOURCE:
                return OtherFactories.ProjectComponentLightSourceModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.MDF_WITH_PAINT:
                return OtherFactories.ProjectComponentMDFWithPaintModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.MDF_WITH_FITTING:
                return OtherFactories.ProjectComponentMDFWithFittingModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.SOLID_WOOD:
                return OtherFactories.ProjectComponentSolidWoodModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.MODEL_GROUP:
                return OtherFactories.ProjectComponentModelGroupModifierFactory.Create(raw);
            case enums_1.ProjectComponentModifierType.PERFORATION:
                return OtherFactories.ProjectComponentPerforationModifierFactory.Create(raw);
            default:
                throw new Error(`Unknown modifier type: ${type}`);
        }
    }
}
exports.ProjectComponentModifierFactory = ProjectComponentModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/dummy_modifier.ts":
/*!*************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/dummy_modifier.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Dummy модификатор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentDummyModifierFactory = exports.ProjectComponentSimpleModifierFactory = void 0;
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
class ProjectComponentSimpleModifierFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            type: enums_1.ProjectComponentModifierType.DUMMY,
            cut_angle1: (_a = raw[(0, utils_1.nameof)("cut_angle1")]) !== null && _a !== void 0 ? _a : 0,
            cut_angle2: (_b = raw[(0, utils_1.nameof)("cut_angle2")]) !== null && _b !== void 0 ? _b : 0,
            target_faces: (_c = raw[(0, utils_1.nameof)("target_faces")]) !== null && _c !== void 0 ? _c : [],
        };
    }
}
exports.ProjectComponentSimpleModifierFactory = ProjectComponentSimpleModifierFactory;
class ProjectComponentDummyModifierFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, ProjectComponentSimpleModifierFactory.Create(raw)), { type: enums_1.ProjectComponentModifierType.DUMMY });
    }
}
exports.ProjectComponentDummyModifierFactory = ProjectComponentDummyModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/ldsp_modifier.ts":
/*!************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/ldsp_modifier.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// LDSP модификатор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentLDSPModifierFactory = exports.LDSPEdgeFactory = void 0;
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class LDSPEdgeFactory {
    static Create(raw) {
        var _a, _b;
        return {
            type: ((_a = raw[(0, utils_1.nameof)("type")]) !== null && _a !== void 0 ? _a : enums_1.LDSPEdgeType.NONE),
            material: (_b = raw[(0, utils_1.nameof)("material")]) !== null && _b !== void 0 ? _b : "",
            size: raw[(0, utils_1.nameof)("size")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("size")]) : new math_1.Vector3(0, 0, 0),
        };
    }
}
exports.LDSPEdgeFactory = LDSPEdgeFactory;
class ProjectComponentLDSPModifierFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            type: enums_1.ProjectComponentModifierType.LDSP,
            cut_angle1: (_a = raw[(0, utils_1.nameof)("cut_angle1")]) !== null && _a !== void 0 ? _a : 0,
            cut_angle2: (_b = raw[(0, utils_1.nameof)("cut_angle2")]) !== null && _b !== void 0 ? _b : 0,
            back_material: (_c = raw[(0, utils_1.nameof)("back_material")]) !== null && _c !== void 0 ? _c : "",
            edges: (raw[(0, utils_1.nameof)("edges")] || []).map((edge) => LDSPEdgeFactory.Create(edge)),
            real_size: raw[(0, utils_1.nameof)("real_size")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("real_size")]) : new math_1.Vector3(0, 0, 0),
        };
    }
}
exports.ProjectComponentLDSPModifierFactory = ProjectComponentLDSPModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/mesh_modifier.ts":
/*!************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/mesh_modifier.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Mesh модификатор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentMeshModifierFactory = void 0;
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class ProjectComponentMeshModifierFactory {
    static Create(raw) {
        var _a, _b, _c, _d;
        return {
            type: enums_1.ProjectComponentModifierType.MESH,
            mesh: (_a = raw[(0, utils_1.nameof)("mesh")]) !== null && _a !== void 0 ? _a : "",
            node_name: (_b = raw[(0, utils_1.nameof)("node_name")]) !== null && _b !== void 0 ? _b : "",
            use_scale: (_c = raw[(0, utils_1.nameof)("use_scale")]) !== null && _c !== void 0 ? _c : true,
            apply_offset: (_d = raw[(0, utils_1.nameof)("apply_offset")]) !== null && _d !== void 0 ? _d : true,
            mesh_size: raw[(0, utils_1.nameof)("mesh_size")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("mesh_size")]) : new math_1.Vector3(1, 1, 1),
            mesh_offset: raw[(0, utils_1.nameof)("mesh_offset")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("mesh_offset")]) : new math_1.Vector3(0, 0, 0),
        };
    }
}
exports.ProjectComponentMeshModifierFactory = ProjectComponentMeshModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/other_modifiers.ts":
/*!**************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/other_modifiers.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Остальные модификаторы компонентов
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentGlassModifierFactory = exports.ProjectComponentSolidWoodModifierFactory = exports.ProjectComponentMDFWithFittingModifierFactory = exports.ProjectComponentMDFWithPaintModifierFactory = exports.ProjectComponentLightSourceModifierFactory = exports.ProjectComponentModelGroupModifierFactory = exports.ProjectComponentPanelModifierFactory = exports.ProjectComponentPerforationModifierFactory = void 0;
const shape_modifier_1 = __webpack_require__(/*! ./shape_modifier */ "./src/Project/DTOs/ProjectComponent/shape_modifier.ts");
const dummy_modifier_1 = __webpack_require__(/*! ./dummy_modifier */ "./src/Project/DTOs/ProjectComponent/dummy_modifier.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
class ProjectComponentPerforationModifierFactory {
    static Create(raw) {
        var _a;
        return {
            type: enums_1.ProjectComponentModifierType.PERFORATION,
            depth: (_a = raw[(0, utils_1.nameof)("depth")]) !== null && _a !== void 0 ? _a : 0,
        };
    }
}
exports.ProjectComponentPerforationModifierFactory = ProjectComponentPerforationModifierFactory;
class ProjectComponentPanelModifierFactory {
    static Create(raw) {
        var _a, _b;
        return {
            type: enums_1.ProjectComponentModifierType.PANEL,
            center_depth: (_a = raw[(0, utils_1.nameof)("center_depth")]) !== null && _a !== void 0 ? _a : 0,
            shape: (_b = raw[(0, utils_1.nameof)("shape")]) !== null && _b !== void 0 ? _b : "",
        };
    }
}
exports.ProjectComponentPanelModifierFactory = ProjectComponentPanelModifierFactory;
class ProjectComponentModelGroupModifierFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            type: enums_1.ProjectComponentModifierType.MODEL_GROUP,
            file: (_a = raw[(0, utils_1.nameof)("file")]) !== null && _a !== void 0 ? _a : "",
            materials: (_b = raw[(0, utils_1.nameof)("materials")]) !== null && _b !== void 0 ? _b : [],
            nodes: (_c = raw[(0, utils_1.nameof)("nodes")]) !== null && _c !== void 0 ? _c : [],
        };
    }
}
exports.ProjectComponentModelGroupModifierFactory = ProjectComponentModelGroupModifierFactory;
class ProjectComponentLightSourceModifierFactory {
    static Create(raw) {
        var _a, _b;
        return {
            type: enums_1.ProjectComponentModifierType.LIGHT_SOURCE,
            cap_type: (_a = raw[(0, utils_1.nameof)("cap_type")]) !== null && _a !== void 0 ? _a : "",
            light: (_b = raw[(0, utils_1.nameof)("light")]) !== null && _b !== void 0 ? _b : "",
        };
    }
}
exports.ProjectComponentLightSourceModifierFactory = ProjectComponentLightSourceModifierFactory;
class ProjectComponentMDFWithPaintModifierFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, shape_modifier_1.ProjectComponentShapedModifierFactory.Create(raw)), { type: enums_1.ProjectComponentModifierType.MDF_WITH_PAINT });
    }
}
exports.ProjectComponentMDFWithPaintModifierFactory = ProjectComponentMDFWithPaintModifierFactory;
class ProjectComponentMDFWithFittingModifierFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, shape_modifier_1.ProjectComponentShapedModifierFactory.Create(raw)), { type: enums_1.ProjectComponentModifierType.MDF_WITH_FITTING });
    }
}
exports.ProjectComponentMDFWithFittingModifierFactory = ProjectComponentMDFWithFittingModifierFactory;
class ProjectComponentSolidWoodModifierFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, shape_modifier_1.ProjectComponentShapedModifierFactory.Create(raw)), { type: enums_1.ProjectComponentModifierType.SOLID_WOOD });
    }
}
exports.ProjectComponentSolidWoodModifierFactory = ProjectComponentSolidWoodModifierFactory;
class ProjectComponentGlassModifierFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, dummy_modifier_1.ProjectComponentSimpleModifierFactory.Create(raw)), { type: enums_1.ProjectComponentModifierType.GLASS });
    }
}
exports.ProjectComponentGlassModifierFactory = ProjectComponentGlassModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/processing.ts":
/*!*********************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/processing.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Интерфейсы для системы обработки
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextureFittingFactory = exports.BaseTextureCoordinateProcessingFactory = exports.ProcessingFactory = void 0;
const project_item_1 = __webpack_require__(/*! ../project_item */ "./src/Project/DTOs/project_item.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class ProcessingFactory {
    static Create(raw) {
        const type = raw[(0, utils_1.nameof)("type")];
        switch (type) {
            case enums_1.ProcessingType.BASE_TEXTURE_COORDINATE:
                return BaseTextureCoordinateProcessingFactory.Create(raw);
            case enums_1.ProcessingType.TEXTURE_FITTING:
                return TextureFittingFactory.Create(raw);
            default:
                throw new Error(`Unknown processing type: ${type}`);
        }
    }
}
exports.ProcessingFactory = ProcessingFactory;
class BaseTextureCoordinateProcessingFactory {
    static Create(raw) {
        var _a;
        return Object.assign(Object.assign({}, project_item_1.ProjectItemFactory.Create(raw)), { type: enums_1.ProcessingType.BASE_TEXTURE_COORDINATE, offset: raw[(0, utils_1.nameof)("offset")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("offset")]) : new math_1.Vector2(0, 0), scale: raw[(0, utils_1.nameof)("scale")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("scale")]) : new math_1.Vector2(1, 1), rotation: (_a = raw[(0, utils_1.nameof)("rotation")]) !== null && _a !== void 0 ? _a : 0 });
    }
}
exports.BaseTextureCoordinateProcessingFactory = BaseTextureCoordinateProcessingFactory;
class TextureFittingFactory {
    static Create(raw) {
        var _a;
        return Object.assign(Object.assign({}, project_item_1.ProjectItemFactory.Create(raw)), { type: enums_1.ProcessingType.TEXTURE_FITTING, group: (_a = raw[(0, utils_1.nameof)("group")]) !== null && _a !== void 0 ? _a : '' });
    }
}
exports.TextureFittingFactory = TextureFittingFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/project_component.ts":
/*!****************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/project_component.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Главный интерфейс компонента проекта
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentFactory = void 0;
const processing_1 = __webpack_require__(/*! ./processing */ "./src/Project/DTOs/ProjectComponent/processing.ts");
const component_modifier_1 = __webpack_require__(/*! ./component_modifier */ "./src/Project/DTOs/ProjectComponent/component_modifier.ts");
const connectable_project_item_1 = __webpack_require__(/*! ../connectable_project_item */ "./src/Project/DTOs/connectable_project_item.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
const product_parts_1 = __webpack_require__(/*! ../../../Product/product_parts */ "./src/Product/product_parts.ts");
const filesystem_1 = __webpack_require__(/*! ../../../filesystem */ "./src/filesystem.ts");
const iik_1 = __webpack_require__(/*! ../../../iik */ "./src/iik.ts");
const builtin_modifier_1 = __webpack_require__(/*! ./builtin_modifier */ "./src/Project/DTOs/ProjectComponent/builtin_modifier.ts");
class ProjectComponentFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, connectable_project_item_1.ConnectableProjectItemFactory.CreateNew()), { position: new math_1.Vector3(0, 0, 0), rotation: new math_1.Quaternion(0, 0, 0, 1), size: new math_1.Vector3(1, 1, 1), material: "", color: "#FFFFFF", ignore_bounds: false, bake: "", modifier: component_modifier_1.ProjectComponentModifierFactory.CreateNew(), processings: [], is_active: true, max_texture_size: 2048, build_order: 0, detailing_order: 0, order: 0, user_data: '', component_type: "component", description: '', disassemble_multiplier: 1.0 });
    }
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return Object.assign(Object.assign({}, connectable_project_item_1.ConnectableProjectItemFactory.Create(raw)), { position: raw[(0, utils_1.nameof)("position")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("position")]) : new math_1.Vector3(0, 0, 0), rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1), size: raw[(0, utils_1.nameof)("size")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("size")]) : new math_1.Vector3(1, 1, 1), material: (_a = raw[(0, utils_1.nameof)("material")]) !== null && _a !== void 0 ? _a : "", color: (_b = raw[(0, utils_1.nameof)("color")]) !== null && _b !== void 0 ? _b : "", ignore_bounds: (_c = raw[(0, utils_1.nameof)("ignore_bounds")]) !== null && _c !== void 0 ? _c : false, bake: (_d = raw[(0, utils_1.nameof)("bake")]) !== null && _d !== void 0 ? _d : "", modifier: component_modifier_1.ProjectComponentModifierFactory.Create(raw[(0, utils_1.nameof)("modifier")]), processings: ((_e = raw[(0, utils_1.nameof)("processings")]) !== null && _e !== void 0 ? _e : []).map((p) => processing_1.ProcessingFactory.Create(p)), is_active: (_f = raw[(0, utils_1.nameof)("is_active")]) !== null && _f !== void 0 ? _f : true, max_texture_size: (_g = raw[(0, utils_1.nameof)("max_texture_size")]) !== null && _g !== void 0 ? _g : 2048, build_order: (_h = raw[(0, utils_1.nameof)("build_order")]) !== null && _h !== void 0 ? _h : 0, detailing_order: (_j = raw[(0, utils_1.nameof)("detailing_order")]) !== null && _j !== void 0 ? _j : 0, order: (_k = raw[(0, utils_1.nameof)("order")]) !== null && _k !== void 0 ? _k : 0, user_data: (_l = raw[(0, utils_1.nameof)("user_data")]) !== null && _l !== void 0 ? _l : "", component_type: (_m = raw[(0, utils_1.nameof)("component_type")]) !== null && _m !== void 0 ? _m : "component", description: (_o = raw[(0, utils_1.nameof)("description")]) !== null && _o !== void 0 ? _o : "", disassemble_multiplier: (_p = raw[(0, utils_1.nameof)("disassemble_multiplier")]) !== null && _p !== void 0 ? _p : 1.0 });
    }
    ;
    static UpdateFromProductPart(component, productPart, inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if (productPart.type != product_parts_1.ProductPartType.Calculation) {
                throw new Error("ProjectComponent can only be updated from ProductPartBase of type BuiltIn.");
            }
            component.build_order = (_a = productPart.build_order) !== null && _a !== void 0 ? _a : 0;
            component.order = (_b = productPart.order) !== null && _b !== void 0 ? _b : 0;
            component.user_data = (_c = productPart.user_data) !== null && _c !== void 0 ? _c : "";
            component.name = (_d = productPart.name) !== null && _d !== void 0 ? _d : productPart;
            component.is_active = productPart.is_active;
            const calculationPart = productPart;
            const relatedProjectGuid = calculationPart.file.replace("s123calc://", "");
            const calculationStat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + relatedProjectGuid);
            const relatedProjectFilename = (_e = calculationStat === null || calculationStat === void 0 ? void 0 : calculationStat.filename) !== null && _e !== void 0 ? _e : "";
            const relatedProjectData = yield filesystem_1.Filesystem.Get(`s123://calculationResults/${relatedProjectGuid}/${relatedProjectFilename}`);
            const relatedCore = new iik_1.IIK.IIKCore(relatedProjectData);
            relatedCore.has_frontend = false;
            relatedCore.inputs = inputs !== null && inputs !== void 0 ? inputs : [];
            yield relatedCore.Calculate();
            const relatedProjectAssembler = relatedCore.projectAssembler;
            component.position = productPart.transform.position.toRH().mult(1000.0);
            component.rotation = productPart.transform.rotation.toRH();
            component.size = relatedProjectAssembler.GetProjectBounds().size.mult(1000.0);
            const modifier = builtin_modifier_1.ProjectComponentBuiltInModifierFactory.CreateNew();
            modifier.related_project = calculationPart.file;
            component.modifier = modifier;
            return component;
        });
    }
}
exports.ProjectComponentFactory = ProjectComponentFactory;


/***/ }),

/***/ "./src/Project/DTOs/ProjectComponent/shape_modifier.ts":
/*!*************************************************************!*\
  !*** ./src/Project/DTOs/ProjectComponent/shape_modifier.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Shape модификатор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentShapeModifierFactory = exports.ProjectComponentShapedModifierFactory = void 0;
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
class ProjectComponentShapedModifierFactory {
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return {
            type: enums_1.ProjectComponentModifierType.SHAPE,
            cut_angle1: (_a = raw[(0, utils_1.nameof)("cut_angle1")]) !== null && _a !== void 0 ? _a : 0,
            cut_angle2: (_b = raw[(0, utils_1.nameof)("cut_angle2")]) !== null && _b !== void 0 ? _b : 0,
            radius: (_c = raw[(0, utils_1.nameof)("radius")]) !== null && _c !== void 0 ? _c : 0,
            start_angle: (_d = raw[(0, utils_1.nameof)("start_angle")]) !== null && _d !== void 0 ? _d : 0,
            end_angle: (_e = raw[(0, utils_1.nameof)("end_angle")]) !== null && _e !== void 0 ? _e : 0,
            precision: (_f = raw[(0, utils_1.nameof)("precision")]) !== null && _f !== void 0 ? _f : 0,
            width: (_g = raw[(0, utils_1.nameof)("width")]) !== null && _g !== void 0 ? _g : 0,
            depth: (_h = raw[(0, utils_1.nameof)("depth")]) !== null && _h !== void 0 ? _h : 0,
            is_mirrored: (_j = raw[(0, utils_1.nameof)("is_mirrored")]) !== null && _j !== void 0 ? _j : false,
            shape: (_k = raw[(0, utils_1.nameof)("shape")]) !== null && _k !== void 0 ? _k : "",
        };
    }
}
exports.ProjectComponentShapedModifierFactory = ProjectComponentShapedModifierFactory;
class ProjectComponentShapeModifierFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, ProjectComponentShapedModifierFactory.Create(raw)), { type: enums_1.ProjectComponentModifierType.SHAPE });
    }
}
exports.ProjectComponentShapeModifierFactory = ProjectComponentShapeModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/camera_modifier.ts":
/*!***********************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/camera_modifier.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Камера виртуальный объект
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CameraModifierFactory = exports.SequenceCameraSettingsFactory = exports.SequenceCameraConstraintsFactory = exports.TargetConstraintFactory = exports.ElevationConstraintFactory = exports.AzimuthConstraintFactory = exports.DistanceConstraintFactory = exports.CameraSettingsFactory = void 0;
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class CameraSettingsFactory {
    static Create(raw) {
        return {
        // Здесь можно добавить логику создания базовых настроек камеры
        };
    }
}
exports.CameraSettingsFactory = CameraSettingsFactory;
class DistanceConstraintFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            is_active: (_a = raw[(0, utils_1.nameof)("is_active")]) !== null && _a !== void 0 ? _a : false,
            min: (_b = raw[(0, utils_1.nameof)("min")]) !== null && _b !== void 0 ? _b : 0,
            max: (_c = raw[(0, utils_1.nameof)("max")]) !== null && _c !== void 0 ? _c : 0,
        };
    }
}
exports.DistanceConstraintFactory = DistanceConstraintFactory;
class AzimuthConstraintFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            is_active: (_a = raw[(0, utils_1.nameof)("is_active")]) !== null && _a !== void 0 ? _a : false,
            left: (_b = raw[(0, utils_1.nameof)("left")]) !== null && _b !== void 0 ? _b : 0,
            right: (_c = raw[(0, utils_1.nameof)("right")]) !== null && _c !== void 0 ? _c : 0,
        };
    }
}
exports.AzimuthConstraintFactory = AzimuthConstraintFactory;
class ElevationConstraintFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            is_active: (_a = raw[(0, utils_1.nameof)("is_active")]) !== null && _a !== void 0 ? _a : false,
            down: (_b = raw[(0, utils_1.nameof)("down")]) !== null && _b !== void 0 ? _b : 0,
            up: (_c = raw[(0, utils_1.nameof)("up")]) !== null && _c !== void 0 ? _c : 0,
        };
    }
}
exports.ElevationConstraintFactory = ElevationConstraintFactory;
class TargetConstraintFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            is_active: (_a = raw[(0, utils_1.nameof)("is_active")]) !== null && _a !== void 0 ? _a : false,
            type: (_b = raw[(0, utils_1.nameof)("type")]) !== null && _b !== void 0 ? _b : 'fixed',
            radius: (_c = raw[(0, utils_1.nameof)("radius")]) !== null && _c !== void 0 ? _c : 0,
        };
    }
}
exports.TargetConstraintFactory = TargetConstraintFactory;
class SequenceCameraConstraintsFactory {
    static Create(raw) {
        var _a, _b, _c, _d;
        return {
            distance: DistanceConstraintFactory.Create((_a = raw === null || raw === void 0 ? void 0 : raw[(0, utils_1.nameof)("distance")]) !== null && _a !== void 0 ? _a : {}),
            azimuth: AzimuthConstraintFactory.Create((_b = raw === null || raw === void 0 ? void 0 : raw[(0, utils_1.nameof)("azimuth")]) !== null && _b !== void 0 ? _b : {}),
            elevation: ElevationConstraintFactory.Create((_c = raw === null || raw === void 0 ? void 0 : raw[(0, utils_1.nameof)("elevation")]) !== null && _c !== void 0 ? _c : {}),
            target: TargetConstraintFactory.Create((_d = raw === null || raw === void 0 ? void 0 : raw[(0, utils_1.nameof)("target")]) !== null && _d !== void 0 ? _d : {}),
        };
    }
}
exports.SequenceCameraConstraintsFactory = SequenceCameraConstraintsFactory;
class SequenceCameraSettingsFactory {
    static Create(raw) {
        var _a, _b, _c, _d;
        return Object.assign(Object.assign({}, CameraSettingsFactory.Create(raw)), { height_offset: (_a = raw[(0, utils_1.nameof)("height_offset")]) !== null && _a !== void 0 ? _a : 0, distance: (_b = raw[(0, utils_1.nameof)("distance")]) !== null && _b !== void 0 ? _b : 0, auto_distance: (_c = raw[(0, utils_1.nameof)("auto_distance")]) !== null && _c !== void 0 ? _c : false, frames_count: (_d = raw[(0, utils_1.nameof)("frames_count")]) !== null && _d !== void 0 ? _d : 0, target: raw[(0, utils_1.nameof)("target")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("target")]) : new math_1.Vector3(0, 0, 0), constraints: SequenceCameraConstraintsFactory.Create(raw[(0, utils_1.nameof)("constraints")]) });
    }
}
exports.SequenceCameraSettingsFactory = SequenceCameraSettingsFactory;
class CameraModifierFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            rotation: raw[(0, utils_1.nameof)("rotation")]
                ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")])
                : new math_1.Quaternion(),
            type: enums_1.VirtualObjectModifierType.CAMERA,
            spheric_rotation: raw[(0, utils_1.nameof)("spheric_rotation")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("spheric_rotation")]) : new math_1.Vector2(0, 0),
            camera_type: raw[(0, utils_1.nameof)("camera_type")],
            order: (_a = raw[(0, utils_1.nameof)("order")]) !== null && _a !== void 0 ? _a : 0,
            is_pov: (_b = raw[(0, utils_1.nameof)("is_pov")]) !== null && _b !== void 0 ? _b : false,
            settings: raw[(0, utils_1.nameof)("settings")]
                ? SequenceCameraSettingsFactory.Create(raw[(0, utils_1.nameof)("settings")])
                : CameraSettingsFactory.Create({}),
            need_detailing: (_c = raw[(0, utils_1.nameof)("need_detailing")]) !== null && _c !== void 0 ? _c : false,
        };
    }
}
exports.CameraModifierFactory = CameraModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/light_modifier.ts":
/*!**********************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/light_modifier.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Источник света виртуальный объект
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LightSourceModifierFactory = exports.AreaLightSourceSettingsFactory = exports.SpotLightSourceSettingsFactory = exports.PointLightSourceSettingsFactory = exports.DirectionalLightSourceSettingsFactory = exports.RotatableLightSourceSettingsFactory = exports.LightSourceSettingsFactory = void 0;
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class LightSourceSettingsFactory {
    static Create(raw) {
        var _a, _b, _c;
        return {
            color: (_a = raw[(0, utils_1.nameof)("color")]) !== null && _a !== void 0 ? _a : "",
            intensity: (_b = raw[(0, utils_1.nameof)("intensity")]) !== null && _b !== void 0 ? _b : 1.0,
            isOn: (_c = raw[(0, utils_1.nameof)("isOn")]) !== null && _c !== void 0 ? _c : true,
        };
    }
}
exports.LightSourceSettingsFactory = LightSourceSettingsFactory;
class RotatableLightSourceSettingsFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, LightSourceSettingsFactory.Create(raw)), { rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1) });
    }
}
exports.RotatableLightSourceSettingsFactory = RotatableLightSourceSettingsFactory;
class DirectionalLightSourceSettingsFactory {
    static Create(raw) {
        return Object.assign({}, RotatableLightSourceSettingsFactory.Create(raw));
    }
}
exports.DirectionalLightSourceSettingsFactory = DirectionalLightSourceSettingsFactory;
class PointLightSourceSettingsFactory {
    static Create(raw) {
        var _a;
        return Object.assign(Object.assign({}, LightSourceSettingsFactory.Create(raw)), { range: (_a = raw[(0, utils_1.nameof)("range")]) !== null && _a !== void 0 ? _a : 10.0 });
    }
}
exports.PointLightSourceSettingsFactory = PointLightSourceSettingsFactory;
class SpotLightSourceSettingsFactory {
    static Create(raw) {
        var _a, _b;
        return Object.assign(Object.assign({}, RotatableLightSourceSettingsFactory.Create(raw)), { range: (_a = raw[(0, utils_1.nameof)("range")]) !== null && _a !== void 0 ? _a : 10.0, angle: (_b = raw[(0, utils_1.nameof)("angle")]) !== null && _b !== void 0 ? _b : 45.0 });
    }
}
exports.SpotLightSourceSettingsFactory = SpotLightSourceSettingsFactory;
class AreaLightSourceSettingsFactory {
    static Create(raw) {
        var _a, _b, _c, _d;
        return Object.assign(Object.assign({}, RotatableLightSourceSettingsFactory.Create(raw)), { width: (_a = raw[(0, utils_1.nameof)("width")]) !== null && _a !== void 0 ? _a : 1.0, height: (_b = raw[(0, utils_1.nameof)("height")]) !== null && _b !== void 0 ? _b : 1.0, barnDoorAngle: (_c = raw[(0, utils_1.nameof)("barnDoorAngle")]) !== null && _c !== void 0 ? _c : 0.0, barnDoorLength: (_d = raw[(0, utils_1.nameof)("barnDoorLength")]) !== null && _d !== void 0 ? _d : 0.0 });
    }
}
exports.AreaLightSourceSettingsFactory = AreaLightSourceSettingsFactory;
class LightSourceModifierFactory {
    static Create(raw) {
        var _a;
        const lightType = raw[(0, utils_1.nameof)("light_type")];
        let settings;
        switch (lightType) {
            case enums_1.LightType.DIRECTIONAL:
                settings = DirectionalLightSourceSettingsFactory.Create(raw[(0, utils_1.nameof)("settings")]);
                break;
            case enums_1.LightType.POINT:
                settings = PointLightSourceSettingsFactory.Create(raw[(0, utils_1.nameof)("settings")]);
                break;
            case enums_1.LightType.SPOT:
                settings = SpotLightSourceSettingsFactory.Create(raw[(0, utils_1.nameof)("settings")]);
                break;
            case enums_1.LightType.AREA:
                settings = AreaLightSourceSettingsFactory.Create(raw[(0, utils_1.nameof)("settings")]);
                break;
            default:
                throw new Error(`Unknown light type: ${lightType}`);
        }
        let rotation = raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1);
        return {
            type: enums_1.VirtualObjectModifierType.LIGHT,
            rotation,
            light_type: lightType,
            is_casting_shadows: (_a = raw[(0, utils_1.nameof)("is_casting_shadows")]) !== null && _a !== void 0 ? _a : true,
            settings,
        };
    }
}
exports.LightSourceModifierFactory = LightSourceModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/manipulator_modifier.ts":
/*!****************************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/manipulator_modifier.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Виртуальный манипулятор
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VirtualManipulatorFactory = void 0;
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class VirtualManipulatorFactory {
    static Create(raw) {
        var _a, _b, _c, _d, _e;
        return {
            type: enums_1.VirtualObjectModifierType.MANIPULATOR,
            rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1),
            radius: (_a = raw[(0, utils_1.nameof)("radius")]) !== null && _a !== void 0 ? _a : 0.1,
            visual_part: (_b = raw[(0, utils_1.nameof)("visual_part")]) !== null && _b !== void 0 ? _b : "",
            points_distance: (_c = raw[(0, utils_1.nameof)("points_distance")]) !== null && _c !== void 0 ? _c : "",
            press_sound: (_d = raw[(0, utils_1.nameof)("press_sound")]) !== null && _d !== void 0 ? _d : "",
            release_sound: (_e = raw[(0, utils_1.nameof)("release_sound")]) !== null && _e !== void 0 ? _e : "",
        };
    }
}
exports.VirtualManipulatorFactory = VirtualManipulatorFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/points_distance_modifier.ts":
/*!********************************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/points_distance_modifier.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsDistanceModifierFactory = void 0;
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class PointsDistanceModifierFactory {
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            type: enums_1.VirtualObjectModifierType.POINT_DISTANCE,
            rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1),
            color: (_a = raw[(0, utils_1.nameof)("color")]) !== null && _a !== void 0 ? _a : "#FFFFFF",
            ledge_size: (_b = raw[(0, utils_1.nameof)("ledge_size")]) !== null && _b !== void 0 ? _b : 0.1,
            text_offset: (_c = raw[(0, utils_1.nameof)("text_offset")]) !== null && _c !== void 0 ? _c : 0.1,
            text_offset_axis: (_d = raw[(0, utils_1.nameof)("text_offset_axis")]) !== null && _d !== void 0 ? _d : enums_1.PointsDistanceAxis.Top,
            ledge_type: (_e = raw[(0, utils_1.nameof)("ledge_type")]) !== null && _e !== void 0 ? _e : enums_1.PointsDistanceAxis.Top,
            is_projection: (_f = raw[(0, utils_1.nameof)("is_projection")]) !== null && _f !== void 0 ? _f : false,
            point1: (_g = raw[(0, utils_1.nameof)("point1")]) !== null && _g !== void 0 ? _g : "",
            point2: (_h = raw[(0, utils_1.nameof)("point2")]) !== null && _h !== void 0 ? _h : "",
        };
    }
}
exports.PointsDistanceModifierFactory = PointsDistanceModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/shadow_plane_modifier.ts":
/*!*****************************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/shadow_plane_modifier.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShadowPlaneModifierFactory = exports.CustomShadowPlaneSettingsFactory = exports.ShadowPlaneSettingsFactory = void 0;
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class ShadowPlaneSettingsFactory {
    static Create(raw) {
        return {
        // Здесь можно добавить логику создания базовых настроек теней
        };
    }
}
exports.ShadowPlaneSettingsFactory = ShadowPlaneSettingsFactory;
class CustomShadowPlaneSettingsFactory {
    static Create(raw) {
        return Object.assign(Object.assign({}, ShadowPlaneSettingsFactory.Create(raw)), { path: raw[(0, utils_1.nameof)("path")] || "" });
    }
}
exports.CustomShadowPlaneSettingsFactory = CustomShadowPlaneSettingsFactory;
class ShadowPlaneModifierFactory {
    static Create(raw) {
        var _a;
        let settings = raw[(0, utils_1.nameof)("settings")];
        return {
            type: enums_1.VirtualObjectModifierType.SHADOW_PLANE,
            rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1),
            size: raw[(0, utils_1.nameof)("size")] ? new math_1.Vector2(raw[(0, utils_1.nameof)("size")]) : new math_1.Vector2(1, 1),
            shadow_type: (_a = raw[(0, utils_1.nameof)("shadow_type")]) !== null && _a !== void 0 ? _a : enums_1.ShadowPlaneType.SQUARE,
            settings: settings
                ? CustomShadowPlaneSettingsFactory.Create(settings)
                : ShadowPlaneSettingsFactory.Create({}),
        };
    }
}
exports.ShadowPlaneModifierFactory = ShadowPlaneModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/virtual_object.ts":
/*!**********************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/virtual_object.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Главный интерфейс виртуального объекта
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VirtualObjectFactory = void 0;
const virtual_object_modifier_1 = __webpack_require__(/*! ./virtual_object_modifier */ "./src/Project/DTOs/VirtualObject/virtual_object_modifier.ts");
const connectable_project_item_1 = __webpack_require__(/*! ../connectable_project_item */ "./src/Project/DTOs/connectable_project_item.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../../math */ "./src/math.ts");
class VirtualObjectFactory {
    static Create(raw) {
        var _a;
        return Object.assign(Object.assign({}, connectable_project_item_1.ConnectableProjectItemFactory.Create(raw)), { position: raw[(0, utils_1.nameof)("position")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("position")]) : new math_1.Vector3(0, 0, 0), rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1), modifier: virtual_object_modifier_1.VirtualObjectModifierFactory.Create(raw[(0, utils_1.nameof)("modifier")]), is_active: (_a = raw[(0, utils_1.nameof)("is_active")]) !== null && _a !== void 0 ? _a : true });
    }
}
exports.VirtualObjectFactory = VirtualObjectFactory;


/***/ }),

/***/ "./src/Project/DTOs/VirtualObject/virtual_object_modifier.ts":
/*!*******************************************************************!*\
  !*** ./src/Project/DTOs/VirtualObject/virtual_object_modifier.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Базовый интерфейс для модификаторов компонентов
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VirtualObjectModifierFactory = void 0;
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/Project/enums.ts");
const camera_modifier_1 = __webpack_require__(/*! ./camera_modifier */ "./src/Project/DTOs/VirtualObject/camera_modifier.ts");
const light_modifier_1 = __webpack_require__(/*! ./light_modifier */ "./src/Project/DTOs/VirtualObject/light_modifier.ts");
const manipulator_modifier_1 = __webpack_require__(/*! ./manipulator_modifier */ "./src/Project/DTOs/VirtualObject/manipulator_modifier.ts");
const points_distance_modifier_1 = __webpack_require__(/*! ./points_distance_modifier */ "./src/Project/DTOs/VirtualObject/points_distance_modifier.ts");
const shadow_plane_modifier_1 = __webpack_require__(/*! ./shadow_plane_modifier */ "./src/Project/DTOs/VirtualObject/shadow_plane_modifier.ts");
class VirtualObjectModifierFactory {
    static Create(raw) {
        switch (raw.type) {
            case enums_1.VirtualObjectModifierType.CAMERA:
                return camera_modifier_1.CameraModifierFactory.Create(raw);
            case enums_1.VirtualObjectModifierType.LIGHT:
                return light_modifier_1.LightSourceModifierFactory.Create(raw);
            case enums_1.VirtualObjectModifierType.MANIPULATOR:
                return manipulator_modifier_1.VirtualManipulatorFactory.Create(raw);
            case enums_1.VirtualObjectModifierType.POINT_DISTANCE:
                return points_distance_modifier_1.PointsDistanceModifierFactory.Create(raw);
            case enums_1.VirtualObjectModifierType.SHADOW_PLANE:
                return shadow_plane_modifier_1.ShadowPlaneModifierFactory.Create(raw);
            default:
                throw new Error(`Unknown virtual object modifier type: ${raw.type}`);
        }
    }
}
exports.VirtualObjectModifierFactory = VirtualObjectModifierFactory;


/***/ }),

/***/ "./src/Project/DTOs/connectable_project_item.ts":
/*!******************************************************!*\
  !*** ./src/Project/DTOs/connectable_project_item.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectableProjectItemFactory = void 0;
const project_item_1 = __webpack_require__(/*! ./project_item */ "./src/Project/DTOs/project_item.ts");
const positioning_point_1 = __webpack_require__(/*! ./positioning_point */ "./src/Project/DTOs/positioning_point.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../math */ "./src/math.ts");
class ConnectableProjectItemFactory {
    static CreateNew() {
        return Object.assign(Object.assign({}, project_item_1.ProjectItemFactory.CreateNew()), { positioning_points: [], position: new math_1.Vector3(0, 0, 0), rotation: new math_1.Quaternion(0, 0, 0, 1) });
    }
    static Create(raw) {
        return Object.assign(Object.assign({}, project_item_1.ProjectItemFactory.Create(raw)), { positioning_points: (raw[(0, utils_1.nameof)("positioning_points")] || []).map((p) => positioning_point_1.PositioningPointFactory.Create(p)), position: raw[(0, utils_1.nameof)("position")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("position")]) : new math_1.Vector3(0, 0, 0), rotation: raw[(0, utils_1.nameof)("rotation")] ? new math_1.Quaternion(raw[(0, utils_1.nameof)("rotation")]) : new math_1.Quaternion(0, 0, 0, 1) });
    }
}
exports.ConnectableProjectItemFactory = ConnectableProjectItemFactory;


/***/ }),

/***/ "./src/Project/DTOs/connection_point.ts":
/*!**********************************************!*\
  !*** ./src/Project/DTOs/connection_point.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionPointFactory = void 0;
const project_item_1 = __webpack_require__(/*! ./project_item */ "./src/Project/DTOs/project_item.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/Project/utils.ts");
class ConnectionPointFactory {
    static Create(raw) {
        var _a, _b;
        return Object.assign(Object.assign({}, project_item_1.ProjectItemFactory.Create(raw)), { point1: (_a = raw[(0, utils_1.nameof)("point1")]) !== null && _a !== void 0 ? _a : "", point2: (_b = raw[(0, utils_1.nameof)("point2")]) !== null && _b !== void 0 ? _b : "" });
    }
}
exports.ConnectionPointFactory = ConnectionPointFactory;


/***/ }),

/***/ "./src/Project/DTOs/positioning_point.ts":
/*!***********************************************!*\
  !*** ./src/Project/DTOs/positioning_point.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositioningPointFactory = void 0;
const project_item_1 = __webpack_require__(/*! ./project_item */ "./src/Project/DTOs/project_item.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/Project/utils.ts");
const math_1 = __webpack_require__(/*! ../../math */ "./src/math.ts");
class PositioningPointFactory {
    static Create(raw) {
        var _a, _b, _c, _d;
        return Object.assign(Object.assign({}, project_item_1.ProjectItemFactory.Create(raw)), { offset: raw[(0, utils_1.nameof)("offset")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("offset")]) : new math_1.Vector3(), anchor_x: (_a = raw[(0, utils_1.nameof)("anchor_x")]) !== null && _a !== void 0 ? _a : 0, anchor_y: (_b = raw[(0, utils_1.nameof)("anchor_y")]) !== null && _b !== void 0 ? _b : 0, anchor_z: (_c = raw[(0, utils_1.nameof)("anchor_z")]) !== null && _c !== void 0 ? _c : 0, getFromModifier: (_d = raw[(0, utils_1.nameof)("getFromModifier")]) !== null && _d !== void 0 ? _d : false });
    }
}
exports.PositioningPointFactory = PositioningPointFactory;


/***/ }),

/***/ "./src/Project/DTOs/project.ts":
/*!*************************************!*\
  !*** ./src/Project/DTOs/project.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Главный интерфейс проекта
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectFactory = void 0;
const project_component_1 = __webpack_require__(/*! ./ProjectComponent/project_component */ "./src/Project/DTOs/ProjectComponent/project_component.ts");
const virtual_object_1 = __webpack_require__(/*! ./VirtualObject/virtual_object */ "./src/Project/DTOs/VirtualObject/virtual_object.ts");
const connection_point_1 = __webpack_require__(/*! ./connection_point */ "./src/Project/DTOs/connection_point.ts");
const environment_1 = __webpack_require__(/*! ../../Environment/environment */ "./src/Environment/environment.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/Project/enums.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/Project/utils.ts");
const graph_1 = __webpack_require__(/*! ../../graph */ "./src/graph.ts");
const math_1 = __webpack_require__(/*! ../../math */ "./src/math.ts");
const product_parts_1 = __webpack_require__(/*! ../../Product/product_parts */ "./src/Product/product_parts.ts");
class ProjectFactory {
    static CreateNew() {
        return {
            guid: "",
            components: [],
            virtual_objects: [],
            connection_points: [],
            type: '',
            background_color: '#FFFFFF',
            anchor_x: enums_1.Anchor.Center,
            anchor_y: enums_1.Anchor.Min,
            anchor_z: enums_1.Anchor.Center,
            offset: new math_1.Vector3(0, 0, 0),
            normal: new math_1.Vector3(0, 0, 1),
            user_data: '',
            connection_type: "floor",
            graph: new graph_1.Graph.Graph(),
            world: environment_1.WorldSettingsFactory.CreateNew(),
            points_distance_ledge_end_size: 0.1,
            points_distance_lines_weight: 0.01,
            points_distance_arrows_size: 0.05,
            points_distance_text_size: 0.02,
            points_distance_measurement_unit: enums_1.MeasurementUnit.Meters,
            points_distance_color: '#000000',
        };
    }
    static Create(raw) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return {
            guid: (_a = raw[(0, utils_1.nameof)("guid")]) !== null && _a !== void 0 ? _a : "",
            components: ((_b = raw[(0, utils_1.nameof)("components")]) !== null && _b !== void 0 ? _b : []).map((c) => project_component_1.ProjectComponentFactory.Create(c)),
            virtual_objects: ((_c = raw[(0, utils_1.nameof)("virtual_objects")]) !== null && _c !== void 0 ? _c : []).map((v) => virtual_object_1.VirtualObjectFactory.Create(v)),
            connection_points: ((_d = raw[(0, utils_1.nameof)("connection_points")]) !== null && _d !== void 0 ? _d : []).map((cp) => connection_point_1.ConnectionPointFactory.Create(cp)),
            type: (_e = raw[(0, utils_1.nameof)("type")]) !== null && _e !== void 0 ? _e : '',
            background_color: (_f = raw[(0, utils_1.nameof)("background_color")]) !== null && _f !== void 0 ? _f : '#FFFFFF',
            anchor_x: (_g = raw[(0, utils_1.nameof)("anchor_x")]) !== null && _g !== void 0 ? _g : 0,
            anchor_y: (_h = raw[(0, utils_1.nameof)("anchor_y")]) !== null && _h !== void 0 ? _h : 0,
            anchor_z: (_j = raw[(0, utils_1.nameof)("anchor_z")]) !== null && _j !== void 0 ? _j : 0,
            offset: raw[(0, utils_1.nameof)("offset")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("offset")]) : new math_1.Vector3(0, 0, 0),
            normal: raw[(0, utils_1.nameof)("normal")] ? new math_1.Vector3(raw[(0, utils_1.nameof)("normal")]) : new math_1.Vector3(0, 0, 1),
            user_data: (_k = raw[(0, utils_1.nameof)("user_data")]) !== null && _k !== void 0 ? _k : '',
            connection_type: (_l = raw[(0, utils_1.nameof)("connection_type")]) !== null && _l !== void 0 ? _l : "",
            graph: new graph_1.Graph.Graph(raw[(0, utils_1.nameof)("graph")]), //TODO Graph DTO
            world: environment_1.WorldSettingsFactory.Create((_m = raw[(0, utils_1.nameof)("world")]) !== null && _m !== void 0 ? _m : {}),
            points_distance_ledge_end_size: (_o = raw[(0, utils_1.nameof)("points_distance_ledge_end_size")]) !== null && _o !== void 0 ? _o : 0.1,
            points_distance_lines_weight: (_p = raw[(0, utils_1.nameof)("points_distance_lines_weight")]) !== null && _p !== void 0 ? _p : 0.01,
            points_distance_arrows_size: (_q = raw[(0, utils_1.nameof)("points_distance_arrows_size")]) !== null && _q !== void 0 ? _q : 0.05,
            points_distance_text_size: (_r = raw[(0, utils_1.nameof)("points_distance_text_size")]) !== null && _r !== void 0 ? _r : 0.02,
            points_distance_measurement_unit: ((_s = raw[(0, utils_1.nameof)("points_distance_measurement_unit")]) !== null && _s !== void 0 ? _s : enums_1.MeasurementUnit.Millimeters),
            points_distance_color: (_t = raw[(0, utils_1.nameof)("points_distance_color")]) !== null && _t !== void 0 ? _t : '#000000',
        };
    }
    static UpdateFromProduct(project, product, relatedInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (product.world != null)
                project.world = environment_1.WorldSettingsFactory.Create(product.world);
            else
                project.world = environment_1.WorldSettingsFactory.CreateNew();
            const relatedInputsResult = (_a = project.graph.related_inputs) !== null && _a !== void 0 ? _a : {};
            const container = product.product_container;
            for (const childGuid in container.children) {
                const child = container.children[childGuid];
                if (child.type != product_parts_1.ProductPartType.Calculation)
                    continue;
                let component = project.components.find(c => c.guid == childGuid);
                const componentInputs = (_b = relatedInputs[childGuid]) !== null && _b !== void 0 ? _b : [];
                if (component == null) {
                    component = project_component_1.ProjectComponentFactory.CreateNew();
                    component.guid = childGuid;
                    project.components.push(component);
                    relatedInputsResult[childGuid] = componentInputs;
                }
                yield project_component_1.ProjectComponentFactory.UpdateFromProductPart(component, child, relatedInputsResult[childGuid]);
            }
            return project;
        });
    }
}
exports.ProjectFactory = ProjectFactory;


/***/ }),

/***/ "./src/Project/DTOs/project_item.ts":
/*!******************************************!*\
  !*** ./src/Project/DTOs/project_item.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectItemFactory = void 0;
const utils_1 = __webpack_require__(/*! ../utils */ "./src/Project/utils.ts");
const utils_2 = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
class ProjectItemFactory {
    static CreateNew() {
        return {
            name: "Деталь",
            path: "Детали",
            guid: (0, utils_2.CreateUUID)(),
        };
    }
    static Create(raw) {
        return {
            name: raw[(0, utils_1.nameof)("name")],
            path: raw[(0, utils_1.nameof)("path")],
            guid: raw[(0, utils_1.nameof)("guid")],
        };
    }
}
exports.ProjectItemFactory = ProjectItemFactory;


/***/ }),

/***/ "./src/Project/Implementations/connectable_project_item_implementation.ts":
/*!********************************************************************************!*\
  !*** ./src/Project/Implementations/connectable_project_item_implementation.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectableProjectItemImplementation = void 0;
const project_item_implementation_1 = __webpack_require__(/*! ./project_item_implementation */ "./src/Project/Implementations/project_item_implementation.ts");
class ConnectableProjectItemImplementation extends project_item_implementation_1.ProjectItemImplementation {
    constructor() {
        super(...arguments);
        this.children = new Set();
    }
    TranslateWithChildren(dv, processed) {
        if (processed != null && processed.includes(this))
            return;
        if (processed == null)
            processed = [];
        this.data.position = this.data.position.add(dv);
        processed.push(this);
        for (const child of this.children)
            child.TranslateWithChildren(dv, processed);
    }
}
exports.ConnectableProjectItemImplementation = ConnectableProjectItemImplementation;


/***/ }),

/***/ "./src/Project/Implementations/positioning_point_implementation.ts":
/*!*************************************************************************!*\
  !*** ./src/Project/Implementations/positioning_point_implementation.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositioningPointImplementation = void 0;
const project_item_implementation_1 = __webpack_require__(/*! ./project_item_implementation */ "./src/Project/Implementations/project_item_implementation.ts");
const filesystem_1 = __webpack_require__(/*! ../../filesystem */ "./src/filesystem.ts");
var Hashable = filesystem_1.Filesystem.Hashable;
class PositioningPointImplementation extends project_item_implementation_1.ProjectItemImplementation {
    constructor(connectableImplementation, data) {
        super(data);
        this.fullPath = `${connectableImplementation.fullPath}/${data.path}/${data.name}`;
        this.fullPathHash = Hashable.GetHashCode(this.fullPath);
    }
}
exports.PositioningPointImplementation = PositioningPointImplementation;


/***/ }),

/***/ "./src/Project/Implementations/project_assembler.ts":
/*!**********************************************************!*\
  !*** ./src/Project/Implementations/project_assembler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectAssembler = void 0;
const connectable_project_item_implementation_1 = __webpack_require__(/*! ./connectable_project_item_implementation */ "./src/Project/Implementations/connectable_project_item_implementation.ts");
const project_component_implementation_1 = __webpack_require__(/*! ./project_component_implementation */ "./src/Project/Implementations/project_component_implementation.ts");
const positioning_point_implementation_1 = __webpack_require__(/*! ./positioning_point_implementation */ "./src/Project/Implementations/positioning_point_implementation.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/Project/enums.ts");
const filesystem_1 = __webpack_require__(/*! ../../filesystem */ "./src/filesystem.ts");
const math_1 = __webpack_require__(/*! ../../math */ "./src/math.ts");
var Hashable = filesystem_1.Filesystem.Hashable;
class ProjectAssembler {
    constructor(core) {
        var _a;
        this.allPoints = [];
        this.allPointsImplementation = [];
        this.allComponentImplementations = [];
        this.allVirtualObjectImplementations = [];
        this.pathCachedComponents = new Map();
        this.cachedPoints = new Map();
        this.pathHashCachedPoints = new Map();
        this.connectableCache = new Map();
        this.sessionCache = new Map();
        this.core = core;
        this.targetProject = core.project;
        this.allPoints = [
            ...this.targetProject.components.flatMap(c => { var _a, _b; return (_b = (_a = c.positioning_points) === null || _a === void 0 ? void 0 : _a.map((p) => p)) !== null && _b !== void 0 ? _b : []; }),
            ...(_a = this.targetProject.virtual_objects.flatMap(vo => { var _a, _b; return (_b = (_a = vo.positioning_points) === null || _a === void 0 ? void 0 : _a.map((p) => p)) !== null && _b !== void 0 ? _b : []; })) !== null && _a !== void 0 ? _a : []
        ];
        this.allComponentImplementations = this.targetProject.components.map(c => new project_component_implementation_1.ProjectComponentImplementation(this, c));
        this.allVirtualObjectImplementations = this.targetProject.virtual_objects.map(vo => new connectable_project_item_implementation_1.ConnectableProjectItemImplementation(vo));
        this.allPointsImplementation = [
            ...this.allComponentImplementations.flatMap(c => c.data.positioning_points.map(p => new positioning_point_implementation_1.PositioningPointImplementation(c, p))),
            ...this.allVirtualObjectImplementations.flatMap(vo => vo.data.positioning_points.map(p => new positioning_point_implementation_1.PositioningPointImplementation(vo, p)))
        ];
    }
    static AnchorToNumber(anchor) {
        switch (anchor) {
            case enums_1.Anchor.Min:
                return -0.5;
            case enums_1.Anchor.Center:
                return 0.0;
            case enums_1.Anchor.Max:
                return 0.5;
            default:
                throw new Error(`Unknown anchor type: ${anchor}`);
        }
    }
    static AnchorToVector3(anchorable) {
        return new math_1.Vector3(this.AnchorToNumber(anchorable.anchor_x), this.AnchorToNumber(anchorable.anchor_y), this.AnchorToNumber(anchorable.anchor_z));
    }
    GetCachedPoint(path) {
        var _a, _b;
        if (!this.cachedPoints.has(path)) {
            const targetPoint = this.allPointsImplementation.find(p => p.fullPath === path);
            this.cachedPoints.set(path, (_a = targetPoint === null || targetPoint === void 0 ? void 0 : targetPoint.data) !== null && _a !== void 0 ? _a : undefined);
            return (_b = targetPoint === null || targetPoint === void 0 ? void 0 : targetPoint.data) !== null && _b !== void 0 ? _b : undefined;
        }
        return this.cachedPoints.get(path);
    }
    FindPointByPath(path) {
        const hash = Hashable.GetHashCode(path);
        if (!this.pathHashCachedPoints.has(hash)) {
            const targetPoint = this.allPointsImplementation.find(p => p.fullPathHash === hash);
            if (targetPoint) {
                this.pathHashCachedPoints.set(hash, targetPoint.data);
            }
            else {
                this.pathHashCachedPoints.set(hash, undefined);
            }
        }
        return this.pathHashCachedPoints.get(hash);
    }
    FindComponentByPath(path) {
        const hash = Hashable.GetHashCode(path);
        if (!this.pathCachedComponents.has(hash)) {
            const targetComponent = this.allComponentImplementations.find(c => c.fullPathHash === hash);
            if (targetComponent) {
                this.pathCachedComponents.set(hash, targetComponent.data);
            }
            else {
                this.pathCachedComponents.set(hash, undefined);
            }
            return this.pathCachedComponents.get(hash);
        }
        return this.pathCachedComponents.get(hash);
    }
    GetSessionConnectableImplementation(connectable) {
        if (!this.sessionCache.has(connectable)) {
            const sessionConnectable = new connectable_project_item_implementation_1.ConnectableProjectItemImplementation(connectable);
            this.sessionCache.set(connectable, sessionConnectable);
            return sessionConnectable;
        }
        return this.sessionCache.get(connectable);
    }
    GetCachedConnectable(point) {
        if (!this.connectableCache.has(point)) {
            const targetConnectable = this.targetProject.components.find(c => c.positioning_points.some(p => p.guid === point.guid)) ||
                this.targetProject.virtual_objects.find(vo => vo.positioning_points.some(p => p.guid === point.guid));
            this.connectableCache.set(point, targetConnectable);
            return targetConnectable;
        }
        return this.connectableCache.get(point);
    }
    GetConnectableSize(connectable) {
        if (connectable.size != undefined) //IsComponent
         {
            return connectable.size;
        }
        else //IsVirtualObject
         {
            const vo = connectable;
            if (vo.modifier.type != enums_1.VirtualObjectModifierType.SHADOW_PLANE)
                return new math_1.Vector3();
            const r = vo.modifier.size;
            return new math_1.Vector3(r.x, r.y, 0);
        }
    }
    GetComponentBounds(component) {
        let position = component.position.div(1000.0);
        const rotation = component.rotation;
        if (component.modifier.type === enums_1.ProjectComponentModifierType.MESH) {
            const modifier = component.modifier;
            if (modifier.apply_offset) {
                const s = component.size.div(1000.0);
                const n = modifier.mesh_size;
                const scale = s.div(n);
                const offset = math_1.Vector3.scale(modifier.mesh_offset, scale);
                position = position.add(rotation.rotate(offset));
            }
        }
        else if (component.modifier.type === enums_1.ProjectComponentModifierType.BUILTIN) {
            if (!this.targetProject.components.includes(component)) {
                throw new Error("Component is not part of the project");
            }
            const relatedCore = this.core.related_calculations[component.guid];
            //if( relatedCore )
            //    position = position.add( relatedCore.projectAssembler.GetProjectOffset() );
        }
        const size = rotation.rotate(component.size).abs().div(1000.0);
        if (!position.isFinite() || !size.isFinite())
            return undefined;
        return math_1.Bounds.fromCenterAndSize(position, size);
    }
    GetPointPosition(point) {
        const connectable = this.GetCachedConnectable(point);
        if (connectable == null)
            return undefined;
        const anchor = ProjectAssembler.AnchorToVector3(point);
        const orths = [
            new math_1.Vector3(anchor.x > 0 ? -1 : 1, 0, 0),
            new math_1.Vector3(0, anchor.y > 0 ? -1 : 1, 0),
            new math_1.Vector3(0, 0, anchor.z > 0 ? -1 : 1),
        ];
        let ox = connectable.rotation.rotate(orths[0]);
        let oy = connectable.rotation.rotate(orths[1]);
        let oz = connectable.rotation.rotate(orths[2]);
        const size = this.GetConnectableSize(connectable);
        let position;
        const component = connectable;
        if (component.modifier.cut_angle1 != null && component.modifier.cut_angle2 != null) //TODO ублюдская проверка
         {
            position = new project_component_implementation_1.ProjectComponentImplementation(this, component).GetPointByAnchor(anchor);
        }
        else {
            position = math_1.Vector3.scale(anchor, size);
        }
        let connectablePosition = connectable.position;
        const anyConnectable = connectable; //TODO
        if (anyConnectable.modifier.type === enums_1.ProjectComponentModifierType.MESH) {
            const modifier = anyConnectable.modifier;
            if (modifier.apply_offset) {
                const s = anyConnectable.size.div(1000.0);
                const n = modifier.mesh_size;
                const scale = s.div(n);
                const offset = math_1.Vector3.scale(modifier.mesh_offset, scale).mult(1000.0);
                connectablePosition = connectablePosition.add(connectable.rotation.rotate(offset));
            }
        }
        position = connectablePosition.add(connectable.rotation.rotate(position));
        ox = ox.mult(point.offset.x);
        oy = oy.mult(point.offset.y);
        oz = oz.mult(point.offset.z);
        return position.add(ox).add(oy).add(oz);
    }
    ConnectByConnectionPoint(cp) {
        if (cp.point1 == null || cp.point2 == null)
            return;
        const point1 = this.GetCachedPoint(cp.point1);
        const point2 = this.GetCachedPoint(cp.point2);
        if (point1 == null || point2 == null)
            return;
        const connectable1 = this.GetCachedConnectable(point1);
        const connectable2 = this.GetCachedConnectable(point2);
        if (connectable1 == null || connectable2 == null)
            return;
        const position1 = this.GetPointPosition(point1);
        const position2 = this.GetPointPosition(point2);
        if (position1 == null || position2 == null)
            return;
        const dv = position1.sub(position2);
        const connectableImplementation1 = this.GetSessionConnectableImplementation(connectable1);
        const connectableImplementation2 = this.GetSessionConnectableImplementation(connectable2);
        connectableImplementation2.TranslateWithChildren(dv, null);
        connectableImplementation1.children.add(connectableImplementation2);
        connectableImplementation1.TranslateWithChildren(dv.inversed(), null);
        connectableImplementation2.children.add(connectableImplementation1);
    }
    GetProjectBounds() {
        if (this.targetProject.components.length === 0)
            return math_1.Bounds.default();
        const startComponent = this.targetProject.components.find(c => {
            return c.is_active && (c.ignore_bounds == null || !c.ignore_bounds) && this.GetComponentBounds(c) != null;
        });
        if (startComponent == null)
            return math_1.Bounds.default();
        let result = this.GetComponentBounds(startComponent);
        for (const component of this.targetProject.components) {
            if (!component.is_active || (component.ignore_bounds != null && component.ignore_bounds))
                continue;
            const b = this.GetComponentBounds(component);
            if (b == null)
                continue;
            result.encapsulate(b);
        }
        return result;
    }
    GetProjectOffset() {
        return math_1.Vector3.scale(this.GetProjectBounds().size, ProjectAssembler.AnchorToVector3(this.targetProject));
    }
    Assemble(mustBeCentered) {
        this.sessionCache.clear();
        for (const connectionPoint of this.targetProject.connection_points.reverse())
            this.ConnectByConnectionPoint(connectionPoint);
        if (mustBeCentered)
            this.ToCenter();
    }
    Disassemble() {
        for (const component of this.targetProject.components) {
            let multiplier = 1.0;
            if (component.disassemble_multiplier != null)
                multiplier = component.disassemble_multiplier;
            component.position = component.position.add(component.position.mult(multiplier));
        }
    }
    ToCenter() {
        const center = this.GetProjectBounds().center.mult(1000.0);
        for (const component of this.targetProject.components)
            component.position = component.position.sub(center);
        for (const virtualObject of this.targetProject.virtual_objects)
            virtualObject.position = virtualObject.position.sub(center);
    }
}
exports.ProjectAssembler = ProjectAssembler;


/***/ }),

/***/ "./src/Project/Implementations/project_component_implementation.ts":
/*!*************************************************************************!*\
  !*** ./src/Project/Implementations/project_component_implementation.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectComponentImplementation = void 0;
const filesystem_1 = __webpack_require__(/*! ../../filesystem */ "./src/filesystem.ts");
const logger_1 = __webpack_require__(/*! ../../logger */ "./src/logger.ts");
const shape_1 = __webpack_require__(/*! ../../Product/shape */ "./src/Product/shape.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/Project/enums.ts");
const generator_1 = __webpack_require__(/*! ../../MeshUtils/generator */ "./src/MeshUtils/generator.ts");
const unwrapper_1 = __webpack_require__(/*! ../../MeshUtils/unwrapper */ "./src/MeshUtils/unwrapper.ts");
const material_1 = __webpack_require__(/*! ../../material */ "./src/material.ts");
const connectable_project_item_implementation_1 = __webpack_require__(/*! ./connectable_project_item_implementation */ "./src/Project/Implementations/connectable_project_item_implementation.ts");
var PrimitiveMesh = generator_1.Generator.PrimitiveMesh;
var CurvedMesh = generator_1.Generator.CurvedMesh;
var ShapedMesh = generator_1.Generator.ShapedMesh;
var TriplanarUnwrapper = unwrapper_1.Unwrapper.TriplanarUnwrapper;
var DebugLevel = logger_1.Logger.DebugLevel;
var Material = material_1.MaterialCore.Material;
var Texture = material_1.MaterialCore.Texture;
const math_1 = __webpack_require__(/*! ../../math */ "./src/math.ts");
class ProjectComponentImplementation extends connectable_project_item_implementation_1.ConnectableProjectItemImplementation {
    constructor(projectAssembler, data) {
        super(data);
        this.projectAssembler = projectAssembler;
    }
    static IsShapedType(type) {
        return [
            enums_1.ProjectComponentModifierType.SHAPE,
            enums_1.ProjectComponentModifierType.MDF_WITH_PAINT,
            enums_1.ProjectComponentModifierType.MDF_WITH_FITTING,
            enums_1.ProjectComponentModifierType.SOLID_WOOD,
        ].includes(type);
    }
    GetShapedMesh() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!ProjectComponentImplementation.IsShapedType(this.data.modifier.type))
                return null;
            let mesh = null;
            let modifier = this.data.modifier;
            const cutAngle1 = (_a = modifier.cut_angle1) !== null && _a !== void 0 ? _a : 0;
            const cutAngle2 = (_b = modifier.cut_angle2) !== null && _b !== void 0 ? _b : 0;
            const shape = yield this.GetShape();
            if (shape == null) {
                mesh = new PrimitiveMesh(this.data.size.div(1000.0), cutAngle1, cutAngle2);
            }
            else {
                if (modifier.radius != null && modifier.radius != 0) {
                    mesh = new CurvedMesh(shape, modifier.radius / 1000.0, modifier.start_angle, modifier.end_angle, modifier.cut_angle1, modifier.cut_angle2, modifier.precision, true);
                }
                else {
                    mesh = new ShapedMesh(this.data.size.div(1000.0), shape, cutAngle1, cutAngle2);
                }
            }
            return mesh;
        });
    }
    GetDummyMesh() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let dummyModifier = this.data.modifier;
            const cutAngle1 = (_a = dummyModifier.cut_angle1) !== null && _a !== void 0 ? _a : 0;
            const cutAngle2 = (_b = dummyModifier.cut_angle2) !== null && _b !== void 0 ? _b : 0;
            const target_faces = dummyModifier.target_faces == null ? [] : dummyModifier.target_faces;
            return new PrimitiveMesh(this.data.size.div(1000.0), cutAngle1, cutAngle2, target_faces);
        });
    }
    GetMesh() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.Log("Generating mesh for: " + this.data.name, logger_1.Logger.DebugLevel.INFO);
            const meshModifier = this.data.modifier;
            let mesh = null;
            if (ProjectComponentImplementation.IsShapedType(this.data.modifier.type)) {
                let shapedModifier = this.data.modifier;
                if (shapedModifier.shape == null || shapedModifier.shape == "")
                    mesh = yield this.GetDummyMesh();
                else
                    mesh = yield this.GetShapedMesh();
            }
            else {
                mesh = yield this.GetDummyMesh();
            }
            if (mesh == null)
                return "";
            if (this.data.bake != null && this.data.bake != "") {
                let fName = "model.s123mdata";
                if (this.projectAssembler.targetProject.guid)
                    fName = `s123://calculationResults/${this.projectAssembler.targetProject.guid}/${fName}`;
                logger_1.Logger.Log("Applying additional model data from file: " + fName, logger_1.Logger.DebugLevel.INFO);
                const data = yield filesystem_1.Filesystem.GetFile(fName);
                if (data != null)
                    mesh.ApplyAdditionalData(data.meshes[this.data.guid]);
            }
            if (this.data.processings != null && this.data.processings.length > 0) {
                const proc = this.data.processings.find(function (p) {
                    return p.type == 2;
                });
                const fitting = this.data.processings.find(function (p) {
                    return p.type == 3;
                });
                const unwrapper = new TriplanarUnwrapper(mesh, fitting, proc, this);
                mesh.triplanarUnwrapper = unwrapper;
            }
            return filesystem_1.Filesystem.Cache.GetCachedItem(mesh).id;
        });
    }
    GetShape() {
        return __awaiter(this, void 0, void 0, function* () {
            const modifier = this.data.modifier;
            if (modifier.shape == undefined)
                return null;
            let fname = filesystem_1.Filesystem.GetRelativePath(modifier.shape);
            fname = fname.split(".").slice(0, -1).join(".") + ".s123drawing";
            if (this.projectAssembler.targetProject.guid)
                fname = `s123://calculationResults/${this.projectAssembler.targetProject.guid}/${fname}`;
            logger_1.Logger.Log("Target shape file: " + fname, logger_1.Logger.DebugLevel.INFO);
            let shape = yield filesystem_1.Filesystem.GetFile(fname);
            if (shape != null) {
                if (modifier.radius != null && modifier.radius != 0)
                    shape = shape_1.Shape.GetShapeFromData(shape, modifier.width / 1000.0, modifier.depth / 1000.0, modifier.is_mirrored);
                else
                    shape = shape_1.Shape.GetShapeFromData(shape, this.data.size.x / 1000.0, this.data.size.z / 1000.0, modifier.is_mirrored);
            }
            return shape;
        });
    }
    static GetMaterialData(material, projectGuid, isWebPBRExtrasActive, isWebARActive) {
        return __awaiter(this, void 0, void 0, function* () {
            let materialContent = Material.DefaultMaterial;
            logger_1.Logger.Log("Generating content for material: " + material, DebugLevel.VERBOSE);
            if (material == null || material == "")
                return materialContent;
            if (!material.startsWith("s123mat://") &&
                !material.endsWith(".s123mat")) {
                if (material == "0")
                    return materialContent;
                const diffuse = new Texture();
                if (projectGuid != null)
                    diffuse.fileName = `calculationResults/${projectGuid}/${filesystem_1.Filesystem.GetRelativePath(material)}`;
                else
                    diffuse.fileName = filesystem_1.Filesystem.GetRelativePath(material);
                diffuse.realSize = new math_1.Vector2(1, 1);
                diffuse.resolution = new math_1.Vector2(2048, 2048);
                materialContent.diffuse = diffuse;
                return materialContent;
            }
            if (material.startsWith("s123mat")) {
                logger_1.Logger.Log("as system material", DebugLevel.VERBOSE);
                materialContent = yield Material.GetByDirectLink(material);
            }
            else if (material.startsWith("local://")) {
                const material_data = yield filesystem_1.Filesystem.GetFile(material);
                if (material_data != null) {
                    materialContent = Material.GetByData(material_data, "");
                }
                else
                    logger_1.Logger.Log("Material data is empty", DebugLevel.VERBOSE);
            }
            else {
                logger_1.Logger.Log("as internal material", DebugLevel.VERBOSE);
                let filename = filesystem_1.Filesystem.GetRelativePath(material);
                if (projectGuid != null && projectGuid != "")
                    filename = `s123://calculationResults/${projectGuid}/${filename}`;
                let resultMaterial = yield Material.GetByDirectLink(filename, projectGuid);
                if (resultMaterial != null) {
                    materialContent = resultMaterial;
                }
                else {
                    logger_1.Logger.Log("Material data is empty", DebugLevel.VERBOSE);
                }
            }
            if (isWebARActive &&
                typeof materialContent.webAr === "string" &&
                materialContent.webAr.startsWith("s123mat://")) {
                logger_1.Logger.Log("Using web ar version instead of original", DebugLevel.VERBOSE);
                materialContent = yield Material.GetByDirectLink(materialContent.webAr);
            }
            else if (isWebPBRExtrasActive &&
                typeof materialContent.webPbr === "string" &&
                materialContent.webPbr.startsWith("s123mat://")) {
                logger_1.Logger.Log("Using web pbr version instead of original", DebugLevel.VERBOSE);
                materialContent = yield Material.GetByDirectLink(materialContent.webPbr);
            }
            logger_1.Logger.Log("Done content generation", DebugLevel.VERBOSE);
            return materialContent;
        });
    }
    GetMaterialData(isWebPBRExtrasActive, isWebARActive) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProjectComponentImplementation.GetMaterialData(this.data.material, this.projectAssembler.targetProject.guid, isWebPBRExtrasActive, isWebARActive);
        });
    }
    GetPointByAnchor(anchor) {
        var _a, _b;
        const cuttableModifier = this.data.modifier;
        const cutAngle1 = (_a = cuttableModifier.cut_angle1) !== null && _a !== void 0 ? _a : 0;
        const cutAngle2 = (_b = cuttableModifier.cut_angle2) !== null && _b !== void 0 ? _b : 0;
        if (anchor.x < 0 || (cutAngle1 == 0 && cutAngle2 == 0))
            return math_1.Vector3.scale(this.data.size, anchor);
        const angleOffset1 = this.data.size.x * Math.tan(Math.PI - (cutAngle1 / 180.0) * Math.PI);
        const angleOffset2 = this.data.size.x * Math.tan((cutAngle2 / 180.0) * Math.PI);
        const topLeft = this.data.size.y / 2.0 + angleOffset2;
        const topRight = this.data.size.y / 2.0;
        const bottomLeft = -this.data.size.y / 2.0 + angleOffset1;
        const bottomRight = -this.data.size.y / 2.0;
        if (anchor.x == 0) {
            const result = math_1.Vector3.scale(this.data.size, anchor);
            const topMid = (topLeft + topRight) / 2.0;
            const bottomMid = (bottomLeft + bottomRight) / 2.0;
            result.y = bottomMid + (topMid - bottomMid) * (anchor.y + 0.5);
            return result;
        }
        const result = math_1.Vector3.scale(this.data.size, anchor);
        result.y = bottomLeft + (topLeft - bottomLeft) * (anchor.y + 0.5);
        return result;
    }
}
exports.ProjectComponentImplementation = ProjectComponentImplementation;


/***/ }),

/***/ "./src/Project/Implementations/project_item_implementation.ts":
/*!********************************************************************!*\
  !*** ./src/Project/Implementations/project_item_implementation.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectItemImplementation = void 0;
const filesystem_1 = __webpack_require__(/*! ../../filesystem */ "./src/filesystem.ts");
const { Hashable } = filesystem_1.Filesystem;
class ProjectItemImplementation {
    constructor(data) {
        this.data = data;
        this.fullPath = `${data.path}/${data.name}`;
        this.fullPathHash = Hashable.GetHashCode(this.fullPath);
    }
}
exports.ProjectItemImplementation = ProjectItemImplementation;


/***/ }),

/***/ "./src/Project/enums.ts":
/*!******************************!*\
  !*** ./src/Project/enums.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphInputEnumSettingsDisplayType = exports.JSBlockArgumentType = exports.GraphOutputType = exports.GraphInputType = exports.PointsDistanceAxis = exports.ShadowPlaneType = exports.LightType = exports.CameraType = exports.VirtualObjectModifierType = exports.MarginSide = exports.ShapeModifierShapeType = exports.LDSPEdgeType = exports.ProjectComponentModifierType = exports.ProcessingType = exports.Space = exports.Face = exports.Anchor = exports.MeasurementUnit = void 0;
// Базовые перечисления для проекта S123
var MeasurementUnit;
(function (MeasurementUnit) {
    MeasurementUnit[MeasurementUnit["Millimeters"] = 0] = "Millimeters";
    MeasurementUnit[MeasurementUnit["Centimeters"] = 1] = "Centimeters";
    MeasurementUnit[MeasurementUnit["Meters"] = 2] = "Meters";
})(MeasurementUnit || (exports.MeasurementUnit = MeasurementUnit = {}));
var Anchor;
(function (Anchor) {
    Anchor[Anchor["Min"] = 1] = "Min";
    Anchor[Anchor["Center"] = 2] = "Center";
    Anchor[Anchor["Max"] = 3] = "Max";
})(Anchor || (exports.Anchor = Anchor = {}));
var Face;
(function (Face) {
    Face[Face["NONE"] = -1] = "NONE";
    Face[Face["FRONT"] = 0] = "FRONT";
    Face[Face["TOP"] = 1] = "TOP";
    Face[Face["BACK"] = 2] = "BACK";
    Face[Face["BOTTOM"] = 3] = "BOTTOM";
    Face[Face["LEFT"] = 4] = "LEFT";
    Face[Face["RIGHT"] = 5] = "RIGHT";
    Face[Face["ANY"] = 6] = "ANY";
})(Face || (exports.Face = Face = {}));
var Space;
(function (Space) {
    Space[Space["Self"] = 0] = "Self";
    Space[Space["World"] = 1] = "World";
})(Space || (exports.Space = Space = {}));
var ProcessingType;
(function (ProcessingType) {
    ProcessingType[ProcessingType["WALL_HOLE"] = 1] = "WALL_HOLE";
    ProcessingType[ProcessingType["BASE_TEXTURE_COORDINATE"] = 2] = "BASE_TEXTURE_COORDINATE";
    ProcessingType[ProcessingType["TEXTURE_FITTING"] = 3] = "TEXTURE_FITTING";
})(ProcessingType || (exports.ProcessingType = ProcessingType = {}));
var ProjectComponentModifierType;
(function (ProjectComponentModifierType) {
    ProjectComponentModifierType[ProjectComponentModifierType["DUMMY"] = 0] = "DUMMY";
    ProjectComponentModifierType[ProjectComponentModifierType["SHAPE"] = 1] = "SHAPE";
    ProjectComponentModifierType[ProjectComponentModifierType["PERFORATION"] = 2] = "PERFORATION";
    ProjectComponentModifierType[ProjectComponentModifierType["MESH"] = 3] = "MESH";
    ProjectComponentModifierType[ProjectComponentModifierType["LIGHT_SOURCE"] = 4] = "LIGHT_SOURCE";
    ProjectComponentModifierType[ProjectComponentModifierType["BUILTIN"] = 5] = "BUILTIN";
    ProjectComponentModifierType[ProjectComponentModifierType["WALL"] = 6] = "WALL";
    ProjectComponentModifierType[ProjectComponentModifierType["FLOOR"] = 7] = "FLOOR";
    ProjectComponentModifierType[ProjectComponentModifierType["CEILING"] = 8] = "CEILING";
    ProjectComponentModifierType[ProjectComponentModifierType["LDSP"] = 9] = "LDSP";
    ProjectComponentModifierType[ProjectComponentModifierType["MDF_WITH_PAINT"] = 10] = "MDF_WITH_PAINT";
    ProjectComponentModifierType[ProjectComponentModifierType["MDF_WITH_FITTING"] = 11] = "MDF_WITH_FITTING";
    ProjectComponentModifierType[ProjectComponentModifierType["SOLID_WOOD"] = 12] = "SOLID_WOOD";
    ProjectComponentModifierType[ProjectComponentModifierType["GLASS"] = 13] = "GLASS";
    ProjectComponentModifierType[ProjectComponentModifierType["ARRAY"] = 14] = "ARRAY";
    ProjectComponentModifierType[ProjectComponentModifierType["PANEL"] = 15] = "PANEL";
    ProjectComponentModifierType[ProjectComponentModifierType["MODEL_GROUP"] = 16] = "MODEL_GROUP";
})(ProjectComponentModifierType || (exports.ProjectComponentModifierType = ProjectComponentModifierType = {}));
var LDSPEdgeType;
(function (LDSPEdgeType) {
    LDSPEdgeType[LDSPEdgeType["NONE"] = 0] = "NONE";
    LDSPEdgeType[LDSPEdgeType["MM04"] = 1] = "MM04";
    LDSPEdgeType[LDSPEdgeType["MM2"] = 2] = "MM2";
})(LDSPEdgeType || (exports.LDSPEdgeType = LDSPEdgeType = {}));
var ShapeModifierShapeType;
(function (ShapeModifierShapeType) {
    ShapeModifierShapeType[ShapeModifierShapeType["NONE"] = 0] = "NONE";
    ShapeModifierShapeType[ShapeModifierShapeType["SHAPE"] = 1] = "SHAPE";
    ShapeModifierShapeType[ShapeModifierShapeType["DRAWING"] = 2] = "DRAWING";
})(ShapeModifierShapeType || (exports.ShapeModifierShapeType = ShapeModifierShapeType = {}));
var MarginSide;
(function (MarginSide) {
    MarginSide[MarginSide["LEFT"] = 1] = "LEFT";
    MarginSide[MarginSide["RIGHT"] = 2] = "RIGHT";
    MarginSide[MarginSide["UP"] = 3] = "UP";
    MarginSide[MarginSide["DOWN"] = 4] = "DOWN";
})(MarginSide || (exports.MarginSide = MarginSide = {}));
var VirtualObjectModifierType;
(function (VirtualObjectModifierType) {
    VirtualObjectModifierType[VirtualObjectModifierType["SHADOW_PLANE"] = 1] = "SHADOW_PLANE";
    VirtualObjectModifierType[VirtualObjectModifierType["LIGHT"] = 2] = "LIGHT";
    VirtualObjectModifierType[VirtualObjectModifierType["CAMERA"] = 3] = "CAMERA";
    VirtualObjectModifierType[VirtualObjectModifierType["MANIPULATOR"] = 4] = "MANIPULATOR";
    VirtualObjectModifierType[VirtualObjectModifierType["POINT_DISTANCE"] = 5] = "POINT_DISTANCE";
})(VirtualObjectModifierType || (exports.VirtualObjectModifierType = VirtualObjectModifierType = {}));
var CameraType;
(function (CameraType) {
    CameraType[CameraType["STATIC"] = 0] = "STATIC";
    CameraType[CameraType["SPHERE"] = 1] = "SPHERE";
    CameraType[CameraType["SEQUENCE"] = 2] = "SEQUENCE";
})(CameraType || (exports.CameraType = CameraType = {}));
var LightType;
(function (LightType) {
    LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
    LightType[LightType["POINT"] = 1] = "POINT";
    LightType[LightType["SPOT"] = 2] = "SPOT";
    LightType[LightType["AREA"] = 3] = "AREA";
})(LightType || (exports.LightType = LightType = {}));
var ShadowPlaneType;
(function (ShadowPlaneType) {
    ShadowPlaneType[ShadowPlaneType["CUSTOM"] = 0] = "CUSTOM";
    ShadowPlaneType[ShadowPlaneType["SQUARE"] = 1] = "SQUARE";
    ShadowPlaneType[ShadowPlaneType["ROUND"] = 2] = "ROUND";
})(ShadowPlaneType || (exports.ShadowPlaneType = ShadowPlaneType = {}));
var PointsDistanceAxis;
(function (PointsDistanceAxis) {
    PointsDistanceAxis[PointsDistanceAxis["Top"] = 0] = "Top";
    PointsDistanceAxis[PointsDistanceAxis["Bottom"] = 1] = "Bottom";
    PointsDistanceAxis[PointsDistanceAxis["Left"] = 2] = "Left";
    PointsDistanceAxis[PointsDistanceAxis["Right"] = 3] = "Right";
    PointsDistanceAxis[PointsDistanceAxis["Forward"] = 4] = "Forward";
    PointsDistanceAxis[PointsDistanceAxis["Back"] = 5] = "Back";
})(PointsDistanceAxis || (exports.PointsDistanceAxis = PointsDistanceAxis = {}));
var GraphInputType;
(function (GraphInputType) {
    GraphInputType[GraphInputType["FLOAT"] = 1] = "FLOAT";
    GraphInputType[GraphInputType["STRING"] = 2] = "STRING";
    GraphInputType[GraphInputType["INT"] = 3] = "INT";
    GraphInputType[GraphInputType["FILES"] = 4] = "FILES";
    GraphInputType[GraphInputType["ENUM"] = 5] = "ENUM";
    GraphInputType[GraphInputType["FILES_TAG"] = 6] = "FILES_TAG";
    GraphInputType[GraphInputType["CATALOG"] = 7] = "CATALOG";
})(GraphInputType || (exports.GraphInputType = GraphInputType = {}));
var GraphOutputType;
(function (GraphOutputType) {
    GraphOutputType[GraphOutputType["NONE"] = 0] = "NONE";
    GraphOutputType[GraphOutputType["PRICE"] = 1] = "PRICE";
    GraphOutputType[GraphOutputType["SHORT_DESCRIPTION"] = 2] = "SHORT_DESCRIPTION";
    GraphOutputType[GraphOutputType["DESCRIPTION"] = 3] = "DESCRIPTION";
    GraphOutputType[GraphOutputType["DATE"] = 4] = "DATE";
    GraphOutputType[GraphOutputType["WEIGHT"] = 5] = "WEIGHT";
    GraphOutputType[GraphOutputType["ARTICLE"] = 6] = "ARTICLE";
})(GraphOutputType || (exports.GraphOutputType = GraphOutputType = {}));
var JSBlockArgumentType;
(function (JSBlockArgumentType) {
    JSBlockArgumentType[JSBlockArgumentType["NONE"] = 0] = "NONE";
    JSBlockArgumentType[JSBlockArgumentType["ANY"] = 1] = "ANY";
    JSBlockArgumentType[JSBlockArgumentType["NODE"] = 2] = "NODE";
    JSBlockArgumentType[JSBlockArgumentType["STRING"] = 3] = "STRING";
    JSBlockArgumentType[JSBlockArgumentType["INT"] = 4] = "INT";
    JSBlockArgumentType[JSBlockArgumentType["FLOAT"] = 5] = "FLOAT";
    JSBlockArgumentType[JSBlockArgumentType["COMPONENT"] = 6] = "COMPONENT";
    JSBlockArgumentType[JSBlockArgumentType["POSITIONING_POINT"] = 7] = "POSITIONING_POINT";
    JSBlockArgumentType[JSBlockArgumentType["CONNECTION_POINT"] = 8] = "CONNECTION_POINT";
    JSBlockArgumentType[JSBlockArgumentType["PROCESSING"] = 10] = "PROCESSING";
    JSBlockArgumentType[JSBlockArgumentType["TEXTURE_FITTING"] = 11] = "TEXTURE_FITTING";
    JSBlockArgumentType[JSBlockArgumentType["COMPONENT_FIELD"] = 12] = "COMPONENT_FIELD";
    JSBlockArgumentType[JSBlockArgumentType["POSITIONING_POINT_FIELD"] = 13] = "POSITIONING_POINT_FIELD";
    JSBlockArgumentType[JSBlockArgumentType["CONNECTION_POINT_FIELD"] = 14] = "CONNECTION_POINT_FIELD";
    JSBlockArgumentType[JSBlockArgumentType["PROCESSING_FIELD"] = 16] = "PROCESSING_FIELD";
    JSBlockArgumentType[JSBlockArgumentType["TEXTURE_FITTING_FIELD"] = 17] = "TEXTURE_FITTING_FIELD";
    JSBlockArgumentType[JSBlockArgumentType["DICTIONARY"] = 18] = "DICTIONARY";
    JSBlockArgumentType[JSBlockArgumentType["SCRIPT"] = 19] = "SCRIPT";
    JSBlockArgumentType[JSBlockArgumentType["INPUT"] = 20] = "INPUT";
    JSBlockArgumentType[JSBlockArgumentType["OUTPUT"] = 21] = "OUTPUT";
    JSBlockArgumentType[JSBlockArgumentType["FACE"] = 22] = "FACE";
    JSBlockArgumentType[JSBlockArgumentType["MARGIN_SIDE"] = 23] = "MARGIN_SIDE";
    JSBlockArgumentType[JSBlockArgumentType["LDSP_EDGE_TYPE"] = 24] = "LDSP_EDGE_TYPE";
})(JSBlockArgumentType || (exports.JSBlockArgumentType = JSBlockArgumentType = {}));
var GraphInputEnumSettingsDisplayType;
(function (GraphInputEnumSettingsDisplayType) {
    GraphInputEnumSettingsDisplayType[GraphInputEnumSettingsDisplayType["DEFAULT"] = 0] = "DEFAULT";
    GraphInputEnumSettingsDisplayType[GraphInputEnumSettingsDisplayType["SLIDER"] = 1] = "SLIDER";
})(GraphInputEnumSettingsDisplayType || (exports.GraphInputEnumSettingsDisplayType = GraphInputEnumSettingsDisplayType = {}));


/***/ }),

/***/ "./src/Project/utils.ts":
/*!******************************!*\
  !*** ./src/Project/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nameof = nameof;
function nameof(key) {
    return key;
}


/***/ }),

/***/ "./src/filesystem.ts":
/*!***************************!*\
  !*** ./src/filesystem.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Filesystem = void 0;
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
const changeable_1 = __webpack_require__(/*! ./Core/changeable */ "./src/Core/changeable.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const DebugLevel = logger_1.Logger.DebugLevel;
var Filesystem;
(function (Filesystem) {
    class Hashable extends changeable_1.Changeable {
        constructor() {
            super(...arguments);
            this.hash = 0;
            this.isDirty = true;
        }
        static GetHashCode(data) {
            let result = 0;
            for (let i = 0; i < data.length; i++) {
                let chr = data.charCodeAt(i);
                result = (result << 5) - result + chr;
                result |= 0; // Convert to 32bit integer
            }
            return result;
        }
        GetHashCode() {
            if (this.isDirty) {
                let str = this.GetHashableData();
                this.hash = Hashable.GetHashCode(str);
                this.isDirty = false;
            }
            return this.hash;
        }
        MarkDirty() {
            this.isDirty = true;
        }
    }
    Filesystem.Hashable = Hashable;
    class Cacheable extends Hashable {
        constructor() {
            super(...arguments);
            this.isGenerated = false;
        }
        Generate() {
            if (this.isGenerated)
                return;
            this.GenerateInternal();
            this.isGenerated = true;
        }
    }
    Filesystem.Cacheable = Cacheable;
    class CacheItem {
        constructor(id, data) {
            this.id = id;
            this.data = data;
        }
    }
    Filesystem.CacheItem = CacheItem;
    class Cache {
        static AddRequestProcessing(request) {
            return Cache.processing_request.push(request);
        }
        static HasRequestProcessing(request) {
            return Cache.processing_request.includes(request);
        }
        static RemoveRequestProcessing(request) {
            Cache.processing_request = Cache.processing_request.filter((r) => r != request);
        }
        static AddData(key, value) {
            this.cachedData[key] = value;
        }
        static HasDataKey(key) {
            return key in this.cachedData && this.cachedData[key] !== undefined;
        }
        static GetData(key) {
            if (!this.HasDataKey(key))
                return "";
            return this.cachedData[key];
        }
        static GetItemById(id) {
            let result = this.cachedItems.find((c) => c.id == id);
            if (result == undefined)
                return null;
            if (!result.data.isGenerated)
                result.data.Generate();
            return result.data;
        }
        static GetCachedItem(item) {
            let result = this.cachedItems.find((c) => c.data.GetHashCode() == item.GetHashCode());
            if (result == undefined) {
                item.Generate();
                result = new CacheItem((0, utils_1.CreateUUID)(), item);
                this.cachedItems.push(result);
            }
            return result;
        }
        static Clear() {
            for (let k in this.cachedData)
                delete this.cachedData[k];
            this.cachedData = {};
            for (let k in this.cachedItems)
                delete this.cachedItems[k];
            this.cachedItems = [];
        }
    }
    Cache.cachedData = {};
    Cache.processing_request = [];
    Cache.cachedItems = [];
    Filesystem.Cache = Cache;
    Filesystem.GetRelativePath = function (p) {
        if (p == null)
            return "";
        if (typeof p != "string")
            return "";
        return p.replace("file://", "");
    };
    Filesystem.GetFileContentsAsync = null;
    Filesystem.ApiGet = null;
    Filesystem.ApiPost = null;
    let requestPromises = {};
    function Get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestPromises[url] != null) {
                return requestPromises[url];
            }
            if (Cache.HasDataKey(url)) {
                return Cache.GetData(url);
            }
            requestPromises[url] = (() => __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling ApiGet with argument '" + url + "'", logger_1.Logger.DebugLevel.VERBOSE);
                if (Filesystem.ApiGet == null) {
                    logger_1.Logger.Log("ApiGet not set", DebugLevel.ERROR);
                    delete requestPromises[url];
                    return "";
                }
                let result = "";
                if (Filesystem.ApiGet.ToPromise != undefined)
                    result = yield Filesystem.ApiGet(url).ToPromise();
                else
                    result = yield Filesystem.ApiGet(url);
                if (result == "") {
                    logger_1.Logger.Log("No data received", logger_1.Logger.DebugLevel.VERBOSE);
                    result = null;
                }
                else {
                    logger_1.Logger.Log("Received data length: " + result.length, DebugLevel.VERBOSE);
                    result = JSON.parse(result);
                }
                Cache.AddData(url, result);
                delete requestPromises[url];
                return result;
            }))();
            return requestPromises[url];
        });
    }
    Filesystem.Get = Get;
    function Post(url_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, headers = null) {
            const key = url + "?" + data;
            if (requestPromises[key] != null) {
                return requestPromises[key];
            }
            if (Cache.HasDataKey(key)) {
                return Cache.GetData(key);
            }
            requestPromises[key] = (() => __awaiter(this, void 0, void 0, function* () {
                let result = "";
                if (Filesystem.ApiPost == null) {
                    logger_1.Logger.Log("ApiPost not set", DebugLevel.ERROR);
                    delete requestPromises[key];
                    return "";
                }
                if (Filesystem.ApiPost.ToPromise != undefined)
                    result = yield Filesystem.ApiPost(url, data, headers).ToPromise();
                else
                    result = yield Filesystem.ApiPost(url, data, headers);
                Cache.AddData(key, result);
                delete requestPromises[key];
                return result;
            }))();
            return requestPromises[key];
        });
    }
    Filesystem.Post = Post;
    function GetFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestPromises[path] != null) {
                return requestPromises[path];
            }
            if (Cache.HasDataKey(path)) {
                return Cache.GetData(path);
            }
            requestPromises[path] = (() => __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log('Calling GetFileContents with argument "' + path + '"', logger_1.Logger.DebugLevel.VERBOSE);
                if (Filesystem.GetFileContentsAsync == null) {
                    logger_1.Logger.Log("GetFileContentsAsync not set", DebugLevel.ERROR);
                    delete requestPromises[path];
                    return "";
                }
                let result = "";
                if (Filesystem.GetFileContentsAsync.ToPromise != undefined)
                    result = yield Filesystem.GetFileContentsAsync(path).ToPromise();
                else {
                    logger_1.Logger.Log("Just before get file contents call", logger_1.Logger.DebugLevel.VERBOSE);
                    result = yield Filesystem.GetFileContentsAsync(path);
                    logger_1.Logger.Log("Just after get file contents call", logger_1.Logger.DebugLevel.VERBOSE);
                }
                if (result == "") {
                    logger_1.Logger.Log("No data received", logger_1.Logger.DebugLevel.VERBOSE);
                    result = null;
                }
                else {
                    logger_1.Logger.Log("Received data length: " + result.length, logger_1.Logger.DebugLevel.VERBOSE);
                    result = JSON.parse(result);
                }
                Cache.AddData(path, result);
                delete requestPromises[path];
                return result;
            }))();
            return requestPromises[path];
        });
    }
    Filesystem.GetFile = GetFile;
})(Filesystem || (exports.Filesystem = Filesystem = {}));


/***/ }),

/***/ "./src/graph.ts":
/*!**********************!*\
  !*** ./src/graph.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Graph = void 0;
const changeable_1 = __webpack_require__(/*! ./Core/changeable */ "./src/Core/changeable.ts");
const filesystem_1 = __webpack_require__(/*! ./filesystem */ "./src/filesystem.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
const math_1 = __webpack_require__(/*! ./math */ "./src/math.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var Graph;
(function (Graph_1) {
    let ArgumentType;
    (function (ArgumentType) {
        ArgumentType[ArgumentType["NONE"] = 0] = "NONE";
        ArgumentType[ArgumentType["ANY"] = 1] = "ANY";
        ArgumentType[ArgumentType["NODE"] = 2] = "NODE";
        ArgumentType[ArgumentType["STRING"] = 3] = "STRING";
        ArgumentType[ArgumentType["INT"] = 4] = "INT";
        ArgumentType[ArgumentType["FLOAT"] = 5] = "FLOAT";
        ArgumentType[ArgumentType["COMPONENT"] = 6] = "COMPONENT";
        ArgumentType[ArgumentType["POSITIONING_POINT"] = 7] = "POSITIONING_POINT";
        ArgumentType[ArgumentType["CONNECTION_POINT"] = 8] = "CONNECTION_POINT";
        ArgumentType[ArgumentType["PROCESSING"] = 10] = "PROCESSING";
        ArgumentType[ArgumentType["TEXTURE_FITTING"] = 11] = "TEXTURE_FITTING";
        ArgumentType[ArgumentType["COMPONENT_FIELD"] = 12] = "COMPONENT_FIELD";
        ArgumentType[ArgumentType["POSITIONING_POINT_FIELD"] = 13] = "POSITIONING_POINT_FIELD";
        ArgumentType[ArgumentType["CONNECTION_POINT_FIELD"] = 14] = "CONNECTION_POINT_FIELD";
        ArgumentType[ArgumentType["PROCESSING_FIELD"] = 16] = "PROCESSING_FIELD";
        ArgumentType[ArgumentType["TEXTURE_FITTING_FIELD"] = 17] = "TEXTURE_FITTING_FIELD";
        ArgumentType[ArgumentType["DICTIONARY"] = 18] = "DICTIONARY";
        ArgumentType[ArgumentType["SCRIPT"] = 19] = "SCRIPT";
        ArgumentType[ArgumentType["INPUT"] = 20] = "INPUT";
        ArgumentType[ArgumentType["OUTPUT"] = 21] = "OUTPUT";
        ArgumentType[ArgumentType["FACE"] = 22] = "FACE";
        ArgumentType[ArgumentType["MARGIN_SIDE"] = 23] = "MARGIN_SIDE";
        ArgumentType[ArgumentType["LDSP_EDGE_TYPE"] = 24] = "LDSP_EDGE_TYPE";
    })(ArgumentType = Graph_1.ArgumentType || (Graph_1.ArgumentType = {}));
    class GraphNodeMethodArgumentNodeValue extends changeable_1.Changeable {
        constructor(node_guid, pair_key) {
            super();
            this.node_guid = node_guid;
            this.pair_key = pair_key;
        }
    }
    class GraphNodeMethodArgumentKeyValuePair extends changeable_1.Changeable {
        constructor(type, key, value) {
            super();
            this.type = type;
            this.key = key;
            this.value = value;
        }
    }
    Graph_1.GraphNodeMethodArgumentKeyValuePair = GraphNodeMethodArgumentKeyValuePair;
    class GraphNodeMethodArgument extends changeable_1.Changeable {
        constructor(...args) {
            super();
            if (args.length == 1) {
                this.name = args[0].name;
                this.value = args[0].value;
                this.type = args[0].type;
                return;
            }
            this.name = args[0];
            this.value = args[1];
            this.type = args[2];
        }
        get IsLinked() {
            return (this.type == ArgumentType.NODE ||
                (this.type == ArgumentType.DICTIONARY &&
                    this.value.some((pair) => pair.type == ArgumentType.NODE)));
        }
        GetLinks() {
            if (!this.IsLinked)
                return [];
            if (this.type == ArgumentType.NODE)
                return [this.value.node_guid];
            return this.value
                .filter((v) => v.type == ArgumentType.NODE)
                .map((v) => v.value.node_guid);
        }
        HasValue(v) {
            if (this.value == v)
                return true;
            if (this.type == ArgumentType.DICTIONARY)
                return this.value.some((dict_val) => dict_val.value == v);
            return false;
        }
    }
    Graph_1.GraphNodeMethodArgument = GraphNodeMethodArgument;
    class GraphNodeMethod extends changeable_1.Changeable {
        constructor(...args) {
            super();
            if (args.length == 1) {
                this.name = args[0].name;
                this.arguments = args[0].arguments.map((a) => new GraphNodeMethodArgument(a));
                this.result = new GraphNodeMethodArgument(args[0].result);
                return;
            }
            this.name = args[0];
            this.arguments = args[1];
            this.result = args[2];
        }
        HasConnectionTo(node_guid) {
            for (let a of this.arguments) {
                if (a.type == ArgumentType.NODE && a.value.node_guid == node_guid)
                    return true;
                if (a.type == ArgumentType.DICTIONARY) {
                    if (a.value == null)
                        continue;
                    if (a.value.find((v) => v.type == ArgumentType.NODE && v.value.node_guid == node_guid) != null)
                        return true;
                }
            }
            return false;
        }
    }
    Graph_1.GraphNodeMethod = GraphNodeMethod;
    class GraphNode extends changeable_1.Changeable {
        constructor(...args) {
            super();
            if (args.length == 1) {
                this.guid = args[0].guid;
                this.name = args[0].name;
                this.position = args[0].position;
                this.method = new GraphNodeMethod(args[0].method);
                this.order = args[0].order;
                return;
            }
            this.guid = args[0];
            this.name = args[1];
            this.position = args[2];
            this.order = 0;
            this.method = new GraphNodeMethod(args[3]);
        }
    }
    Graph_1.GraphNode = GraphNode;
    let GraphInputType;
    (function (GraphInputType) {
        GraphInputType[GraphInputType["NONE"] = 0] = "NONE";
        GraphInputType[GraphInputType["FLOAT"] = 1] = "FLOAT";
        GraphInputType[GraphInputType["STRING"] = 2] = "STRING";
        GraphInputType[GraphInputType["INT"] = 3] = "INT";
        GraphInputType[GraphInputType["FILES"] = 4] = "FILES";
        GraphInputType[GraphInputType["ENUM"] = 5] = "ENUM";
        GraphInputType[GraphInputType["FILES_TAG"] = 6] = "FILES_TAG";
        GraphInputType[GraphInputType["CATALOG"] = 7] = "CATALOG";
    })(GraphInputType = Graph_1.GraphInputType || (Graph_1.GraphInputType = {}));
    let GraphOutputType;
    (function (GraphOutputType) {
        GraphOutputType[GraphOutputType["NONE"] = 0] = "NONE";
        GraphOutputType[GraphOutputType["PRICE"] = 1] = "PRICE";
        GraphOutputType[GraphOutputType["SHORT_DESCRIPTION"] = 2] = "SHORT_DESCRIPTION";
        GraphOutputType[GraphOutputType["DESCRIPTION"] = 3] = "DESCRIPTION";
        GraphOutputType[GraphOutputType["DATE"] = 4] = "DATE";
        GraphOutputType[GraphOutputType["WEIGHT"] = 5] = "WEIGHT";
        GraphOutputType[GraphOutputType["ARTICLE"] = 6] = "ARTICLE";
    })(GraphOutputType = Graph_1.GraphOutputType || (Graph_1.GraphOutputType = {}));
    class GraphInputSettings extends changeable_1.Changeable {
        constructor(...args) {
            super();
            if (args.length == 1) {
                this.tag = args[0].tag;
                this.is_interactive = args[0].is_interactive;
                this.event = args[0].event;
                this.show_in_preview = args[0].show_in_preview;
                this.show_in_consult = args[0].show_in_consult;
                this.display_external = args[0].display_external;
                return;
            }
            this.tag = args[0];
            this.is_interactive = args[1];
            this.event = args[2];
            this.show_in_preview = false;
            this.show_in_consult = true;
            this.display_external = false;
        }
    }
    class GraphInputStringSettings extends GraphInputSettings {
    }
    Graph_1.GraphInputStringSettings = GraphInputStringSettings;
    class GraphInputFloatSettings extends GraphInputSettings {
        constructor(...args) {
            if (args.length == 1) {
                super(args[0]);
                this.min = args[0].min;
                this.max = args[0].max;
                this.minText = args[0].minText;
                this.maxText = args[0].maxText;
                this.manipulator_start = args[0].manipulator_start;
                this.manipulator_end = args[0].manipulator_end;
                this.manipulator_handle = args[0].manipulator_handle;
                return;
            }
            super(args[0], args[1], args[2]);
            this.min = args[3];
            this.max = args[4];
            this.minText = "";
            this.maxText = "";
            this.manipulator_start = "";
            this.manipulator_end = "";
            this.manipulator_handle = "";
        }
    }
    Graph_1.GraphInputFloatSettings = GraphInputFloatSettings;
    class GraphInputStringValue extends changeable_1.Changeable {
        constructor(verbose, value) {
            super();
            this.verbose = verbose;
            this.value = value;
        }
    }
    Graph_1.GraphInputStringValue = GraphInputStringValue;
    class GraphInputIntSettings extends GraphInputSettings {
        constructor(...args) {
            if (args.length == 1) {
                super(args[0]);
                this.min = args[0].min;
                this.max = args[0].max;
                return;
            }
            super(args[0], args[1], args[2]);
            this.min = args[3];
            this.max = args[4];
        }
    }
    Graph_1.GraphInputIntSettings = GraphInputIntSettings;
    class GraphInputFilesTagSettings extends GraphInputSettings {
        constructor(...args) {
            if (args.length == 1) {
                super(args[0]);
                this.search_tags = args[0].search_tags;
                this.has_none = args[0].has_none;
                this.manipulator_handle = args[0].manipulator_handle;
                return;
            }
            super(args[0], args[1], args[2]);
            this.search_tags = args[3];
            this.has_none = true;
            this.manipulator_handle = "";
        }
    }
    Graph_1.GraphInputFilesTagSettings = GraphInputFilesTagSettings;
    class GraphInputFileValue extends changeable_1.Changeable {
        constructor(name, icon, value) {
            super();
            this.name = name;
            this.icon = icon;
            this.value = value;
        }
    }
    Graph_1.GraphInputFileValue = GraphInputFileValue;
    class GraphInputFilesSettings extends GraphInputSettings {
        constructor(...args) {
            if (args.length == 1) {
                super(args[0]);
                this.values = args[0].values;
                this.has_none = args[0].has_none;
                this.manipulator_handle = args[0].manipulator_handle;
                return;
            }
            super(args[0], args[1], args[2]);
            this.values = args[3];
            this.has_none = true;
            this.manipulator_handle = "";
        }
    }
    Graph_1.GraphInputFilesSettings = GraphInputFilesSettings;
    class GraphInputCatalogSettings extends GraphInputSettings {
        constructor(...args) {
            if (args.length == 1) {
                super(args[0]);
                this.values = args[0].values;
                this.target = args[0].target;
                this.has_none = args[0].has_none;
                this.additional_values = [];
                this.manipulator_handle = args[0].manipulator_handle;
                return;
            }
            super(args[0], args[1], args[2]);
            this.values = args[3];
            this.target = args[4];
            this.has_none = true;
            this.additional_values = [];
            this.manipulator_handle = "";
        }
    }
    Graph_1.GraphInputCatalogSettings = GraphInputCatalogSettings;
    let GraphInputEnumSettingsDisplayType;
    (function (GraphInputEnumSettingsDisplayType) {
        GraphInputEnumSettingsDisplayType[GraphInputEnumSettingsDisplayType["DEFAULT"] = 0] = "DEFAULT";
        GraphInputEnumSettingsDisplayType[GraphInputEnumSettingsDisplayType["SLIDER"] = 1] = "SLIDER";
    })(GraphInputEnumSettingsDisplayType = Graph_1.GraphInputEnumSettingsDisplayType || (Graph_1.GraphInputEnumSettingsDisplayType = {}));
    class GraphInputEnumSettings extends GraphInputSettings {
        constructor(...args) {
            if (args.length == 1) {
                super(args[0]);
                this.values = args[0].values;
                this.display = args[0].display;
                this.manipulator_handle_next = args[0].manipulator_handle_next;
                this.manipulator_handle_previous = args[0].manipulator_handle_previous;
                return;
            }
            super(args[0], args[1], args[2]);
            this.values = args[3];
            this.display = GraphInputEnumSettingsDisplayType.DEFAULT;
            this.manipulator_handle_next = "";
            this.manipulator_handle_previous = "";
        }
    }
    Graph_1.GraphInputEnumSettings = GraphInputEnumSettings;
    class GraphInput extends changeable_1.Changeable {
        constructor(...args) {
            super();
            this.is_active = true;
            this.is_hidden = false;
            this.order = 0;
            if (args.length == 1) {
                const input_obj = args[0];
                this.guid = input_obj.guid;
                this.verbose_ru = input_obj.verbose_ru;
                this.verbose_en = input_obj.verbose_en;
                this.name = input_obj.name;
                this.type = input_obj.type;
                this.hint = input_obj.hint;
                this.value = input_obj.value;
                this.is_active = input_obj.is_active;
                this.is_hidden = input_obj.is_hidden;
                this.order = input_obj.order;
                this.parent = input_obj.parent;
                this.related_builtin_component = input_obj.related_builtin_component;
                this.icon = input_obj.icon;
                this.user_data = input_obj.user_data;
                switch (this.type) {
                    case GraphInputType.NONE:
                        this.settings = new GraphInputSettings(input_obj.settings);
                        break;
                    case GraphInputType.FLOAT:
                        this.settings = new GraphInputFloatSettings(input_obj.settings);
                        break;
                    case GraphInputType.INT:
                        this.settings = new GraphInputIntSettings(input_obj.settings);
                        break;
                    case GraphInputType.STRING:
                        this.settings = new GraphInputStringSettings(input_obj.settings);
                        break;
                    case GraphInputType.FILES_TAG:
                        this.settings = new GraphInputFilesTagSettings(input_obj.settings);
                        break;
                    case GraphInputType.FILES:
                        this.settings = new GraphInputFilesSettings(input_obj.settings);
                        break;
                    case GraphInputType.ENUM:
                        this.settings = new GraphInputEnumSettings(input_obj.settings);
                        break;
                    case GraphInputType.CATALOG:
                        this.settings = new GraphInputCatalogSettings(input_obj.settings);
                        break;
                }
                return;
            }
            this.guid = args[0];
            this.verbose_ru = args[1];
            this.name = args[2];
            this.type = args[3];
            this.value = args[4];
            this.settings = args[5];
            this.is_active = args[6];
            this.parent = args[7];
            this.verbose_en = "";
            this.hint = "";
            this.related_builtin_component = "";
            this.icon = "";
            this.user_data = "";
        }
    }
    Graph_1.GraphInput = GraphInput;
    class GraphOutput extends changeable_1.Changeable {
        constructor(output_obj) {
            super();
            this.guid = output_obj.guid;
            this.name = output_obj.name;
            this.hint = output_obj.hint;
            this.value = output_obj.value;
            this.show_in_preview = output_obj.show_in_preview;
            this.show_in_consult = output_obj.show_in_consult;
            this.is_hidden = output_obj.is_hidden;
            this.order = output_obj.order;
            this.tag = output_obj.tag;
            this.type = output_obj.type;
            this.verbose_ru = output_obj.verbose_ru;
            this.verbose_en = output_obj.verbose_en;
            this.min = 0;
            this.max = 0;
        }
    }
    Graph_1.GraphOutput = GraphOutput;
    class Graph extends changeable_1.Changeable {
        constructor(...args) {
            super();
            this.related_inputs = null;
            this.is_active = true;
            this.inputs = [];
            this.outputs = [];
            this.nodes = [];
            this.comments = [];
            this.position = new math_1.Vector2();
            this.scale = 1;
            if (args.length == 1) {
                this.related_inputs = {};
                const graph_obj = args[0];
                this.is_active = graph_obj.is_active;
                this.comments = graph_obj.comments;
                if (graph_obj.position != null)
                    this.position = new math_1.Vector2(graph_obj.position);
                if (graph_obj.scale != null)
                    this.scale = graph_obj.scale;
                for (const i of graph_obj.inputs)
                    this.inputs.push(new GraphInput(i));
                for (const o of graph_obj.outputs)
                    this.outputs.push(new GraphOutput(o));
                for (const n of graph_obj.nodes)
                    this.nodes.push(new GraphNode(n));
                for (let i in graph_obj.related_inputs)
                    this.related_inputs[i] = graph_obj.related_inputs[i];
            }
        }
        FindNodeByGUID(guid) {
            return this.nodes.find(function (n) {
                return n.guid === guid;
            });
        }
        GetNodeInputLinks(node) {
            let result = [];
            const args = node.method.arguments.filter((argument) => argument.IsLinked);
            for (const arg of args)
                result = result.concat(arg.GetLinks().map((link) => this.FindNodeByGUID(link)));
            return result;
        }
        GetNodeOutputLinks(node) {
            return this.nodes.filter((n) => n.method.arguments.some((argument) => argument.GetLinks().some((link) => link == node.guid)));
        }
        GetRootNodes(node) {
            let result = [];
            let parents = this.GetNodeInputLinks(node);
            if (parents.length != 0) {
                for (const parent of parents)
                    result = result.concat(this.GetRootNodes(parent));
            }
            else {
                result = parents;
            }
            return result;
        }
        GetFinalNodes(node) {
            let result = [];
            let children = this.GetNodeOutputLinks(node);
            if (children.length != 0) {
                for (const child of children)
                    result = result.concat(this.GetFinalNodes(child));
            }
            else {
                result = children;
            }
            return result;
        }
        AddAdditionalDataToInput(input_guid, name, value, icon = "", callback = null) {
            const input = this.inputs.find((i) => i.guid == input_guid);
            if (input == null) {
                logger_1.Logger.Log("Cannot find input with guid = " + input_guid, logger_1.Logger.DebugLevel.ERROR);
                return;
            }
            if (input.type != GraphInputType.CATALOG) {
                logger_1.Logger.Log("Unsupported input type for additional data", logger_1.Logger.DebugLevel.ERROR);
                return;
            }
            const settings = input.settings;
            settings.additional_values.push(new GraphInputFileValue(name, icon, value));
            input.value = value;
            if (callback != null)
                callback();
        }
        RemoveAdditionalDataFromInput(input_guid, value) {
            const input = this.inputs.find((i) => i.guid == input_guid);
            if (input == null) {
                logger_1.Logger.Log("Cannot find input with guid = " + input_guid, logger_1.Logger.DebugLevel.ERROR);
                return;
            }
            if (input.type != GraphInputType.CATALOG) {
                logger_1.Logger.Log("Unsupported input type for additional data", logger_1.Logger.DebugLevel.ERROR);
                return;
            }
            const settings = input.settings;
            settings.additional_values = settings.additional_values.filter((v) => v.value == value);
        }
        AddMaterialInput(name, comp_full_names, materials) {
            //INPUT
            let input_settings = new GraphInputFilesSettings("", true, "", materials);
            let input = new GraphInput((0, utils_1.CreateUUID)(), name, name, GraphInputType.FILES, materials[0].value, input_settings, true, "");
            //INPUT NODE
            let input_node_argument = new GraphNodeMethodArgument("input", name, ArgumentType.INPUT);
            let input_node_result = new GraphNodeMethodArgument("", "", ArgumentType.ANY);
            let input_node_method = new GraphNodeMethod("GetInputValue", [input_node_argument], input_node_result);
            let input_node = new GraphNode((0, utils_1.CreateUUID)(), "Получить вход", new math_1.Vector2(), input_node_method);
            //SET MATERIAL NODE
            let set_material_node_component_argument_values = [];
            for (let i in comp_full_names) {
                const pair = new GraphNodeMethodArgumentKeyValuePair(ArgumentType.COMPONENT, (i + 1).toString(), comp_full_names[i]);
                set_material_node_component_argument_values.push(pair);
            }
            let set_material_node_component_argument = new GraphNodeMethodArgument("components", set_material_node_component_argument_values, ArgumentType.DICTIONARY);
            let set_field_node_component_argument_value = new GraphNodeMethodArgumentKeyValuePair(ArgumentType.NODE, "material", new GraphNodeMethodArgumentNodeValue(input_node.guid, null));
            let set_field_node_component_argument = new GraphNodeMethodArgument("fields", [set_field_node_component_argument_value], ArgumentType.DICTIONARY);
            let set_material_node_result = new GraphNodeMethodArgument("", "", ArgumentType.NONE);
            let set_material_node_method = new GraphNodeMethod("SetComponentsFields", [
                set_material_node_component_argument,
                set_field_node_component_argument,
            ], set_material_node_result);
            let set_material_node = new GraphNode((0, utils_1.CreateUUID)(), "Задать параметр детали", new math_1.Vector2(), set_material_node_method);
            this.inputs.push(input);
            this.nodes.push(input_node);
            this.nodes.push(set_material_node);
        }
        AddSlotInput(project, source, parent) {
            return __awaiter(this, void 0, void 0, function* () {
                //TODO Разобраться с импортами и убрать any
                const vertical_offset = Math.min(...this.nodes.map((n) => n.position.y)) - 500;
                let category = source.modifier.category;
                if (category == null || category == 0) {
                    const stat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + project.guid);
                    category = stat.category;
                }
                let target_slots = source.modifier.related_project_data.components.filter((c) => c.modifier.type == 5 &&
                    (c.modifier.allow_iik_slotting == null ||
                        c.modifier.allow_iik_slotting == true));
                if (category != null && category != 0)
                    target_slots = target_slots.filter((s) => s.modifier.category == category);
                //INPUT
                let input_settings_values = target_slots.map((s) => new GraphInputStringValue(s.name, s.fullPath));
                let input_settings = new GraphInputEnumSettings("", true, "", input_settings_values);
                let input = new GraphInput((0, utils_1.CreateUUID)(), "Проем", "slot_" + source.guid, GraphInputType.ENUM, input_settings_values[0].value, input_settings, true, parent ? parent.guid : "");
                //INPUT_NODE
                let input_node_argument = new GraphNodeMethodArgument("input", "slot_" + source.guid, ArgumentType.INPUT);
                let input_node_result = new GraphNodeMethodArgument("", "", ArgumentType.ANY);
                let input_node_method = new GraphNodeMethod("GetInputValue", [input_node_argument], input_node_result);
                let input_node = new GraphNode((0, utils_1.CreateUUID)(), "Получить вход", new math_1.Vector2(-200, vertical_offset), input_node_method);
                //SET_SLOT_NODE
                let set_slot_node_component_argument_values = [
                    new GraphNodeMethodArgumentKeyValuePair(ArgumentType.COMPONENT, "1", source.fullPath),
                ];
                let set_slot_node_component_argument = new GraphNodeMethodArgument("components", set_slot_node_component_argument_values, ArgumentType.DICTIONARY);
                let set_field_node_component_argument_value = new GraphNodeMethodArgumentKeyValuePair(ArgumentType.NODE, "target_slot", new GraphNodeMethodArgumentNodeValue(input_node.guid, null));
                let set_field_node_component_argument = new GraphNodeMethodArgument("fields", [set_field_node_component_argument_value], ArgumentType.DICTIONARY);
                let set_slot_node_result = new GraphNodeMethodArgument("", "", ArgumentType.NONE);
                let set_slot_node_method = new GraphNodeMethod("SetComponentsFields", [set_slot_node_component_argument, set_field_node_component_argument], set_slot_node_result);
                let set_slot_node = new GraphNode((0, utils_1.CreateUUID)(), "Задать параметр детали", new math_1.Vector2(200, vertical_offset), set_slot_node_method);
                this.inputs.push(input);
                this.nodes.push(input_node);
                this.nodes.push(set_slot_node);
            });
        }
    }
    Graph_1.Graph = Graph;
})(Graph || (exports.Graph = Graph = {}));


/***/ }),

/***/ "./src/iik.ts":
/*!********************!*\
  !*** ./src/iik.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IIK = void 0;
//@ts-ignore
const lodash_get_js_1 = __importDefault(__webpack_require__(/*! ../plugins/lodash_get.js */ "./plugins/lodash_get.js"));
const project_1 = __webpack_require__(/*! ./Project/DTOs/project */ "./src/Project/DTOs/project.ts");
const filesystem_1 = __webpack_require__(/*! ./filesystem */ "./src/filesystem.ts");
const graph_1 = __webpack_require__(/*! ./graph */ "./src/graph.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
const builder_1 = __webpack_require__(/*! ./Product/builder */ "./src/Product/builder.ts");
const shape_1 = __webpack_require__(/*! ./Product/shape */ "./src/Product/shape.ts");
const enums_1 = __webpack_require__(/*! ./Project/enums */ "./src/Project/enums.ts");
const project_assembler_1 = __webpack_require__(/*! ./Project/Implementations/project_assembler */ "./src/Project/Implementations/project_assembler.ts");
const project_item_implementation_1 = __webpack_require__(/*! ./Project/Implementations/project_item_implementation */ "./src/Project/Implementations/project_item_implementation.ts");
const project_component_implementation_1 = __webpack_require__(/*! ./Project/Implementations/project_component_implementation */ "./src/Project/Implementations/project_component_implementation.ts");
var Log = logger_1.Logger.Log;
var DebugLevel = logger_1.Logger.DebugLevel;
var ArgumentType = graph_1.Graph.ArgumentType;
var GraphInputType = graph_1.Graph.GraphInputType;
var GraphOutputType = graph_1.Graph.GraphOutputType;
const math_1 = __webpack_require__(/*! ./math */ "./src/math.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var IIK;
(function (IIK) {
    class IIKCore {
        //TODO
        //public async PrefetchResources(done?: () => void): Promise<void> {
        //  if (!this.project.prefetch?.materials) return;
        //  const materialGuids = this.project.prefetch.materials.map(
        //    (materialUrl: string) => materialUrl.replace("s123mat://", ""),
        //  );
        //  if (materialGuids !== null) {
        //    await Utils.iterateAsync(
        //      materialGuids,
        //      async (guid: string) => {
        //        const calc_stat = await Filesystem.Get(
        //          "api/Calculation/GetCalculationStat?guid=" + guid,
        //        );
        //        if (calc_stat) {
        //          await Filesystem.GetFile(
        //            `s123://calculationResults/${guid}/${calc_stat.projectFileName}`,
        //          );
        //        }
        //      },
        //      this.platform,
        //    );
        //  }
        //  if (typeof done == "function") {
        //    done();
        //  }
        //}
        static UpdateOldScript(script) {
            return script.replace(/IIK\.project/g, "this.project");
        }
        GetObjectFieldByString(target, path) {
            if (path.includes(".")) {
                const splitted = path.split(".");
                if (target[splitted[0]] === undefined)
                    return undefined;
                return target[splitted[0]][splitted[1]];
            }
            return target[path];
        }
        InvokeMethod(method_info) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Invoking method: " + method_info.name, logger_1.Logger.DebugLevel.VERBOSE);
                const args = [];
                for (let a of method_info.arguments)
                    args.push(a);
                if (method_info.result.type === ArgumentType.DICTIONARY)
                    args.push(method_info.result);
                const func = (0, lodash_get_js_1.default)(IIKCore.prototype, method_info.name);
                return yield func.apply(this, args);
            });
        }
        GetValue(attr) {
            return __awaiter(this, void 0, void 0, function* () {
                if (attr.type === ArgumentType.NODE) {
                    const guid = attr.value.node_guid;
                    let result = null;
                    if (guid in this.method_cache)
                        result = this.method_cache[guid];
                    if (result == null) {
                        const m = this.project.graph.FindNodeByGUID(guid);
                        if (m == null)
                            result = "";
                        else
                            result = yield this.InvokeMethod(m.method);
                        this.method_cache[guid] = result;
                    }
                    if (attr.value.pair_key != null && attr.value.pair_key.length > 0) {
                        for (const r of result)
                            if (r.key === attr.value.pair_key)
                                return r.value;
                        return null;
                    }
                    return result;
                }
                return attr.value;
            });
        }
        MakeConstant(v) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling MakeConstant node with value: " + v, DebugLevel.VERBOSE);
                let result = yield this.GetValue(v);
                if (typeof result === "string" && !isNaN(Number(result))) {
                    if (result.includes(","))
                        result = result.replace(",", ".");
                    if (result.includes("."))
                        result = parseFloat(result);
                    else
                        result = parseInt(result);
                }
                return result;
            });
        }
        GetInputValue(name) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling GetInputValue node with value: " + name, DebugLevel.VERBOSE);
                name = yield this.GetValue(name);
                const input = this.project.graph.inputs.find(function (i) {
                    return i.name === name;
                });
                if (input != null) {
                    let result = input.value;
                    if ((input.type === 1 || input.type === 3) &&
                        typeof result === "string") {
                        if (result.includes(","))
                            result = result.replace(",", ".");
                        if (result.includes("."))
                            result = parseFloat(result);
                        else
                            result = parseInt(result);
                    }
                    return result;
                }
                return 0;
            });
        }
        GetOutputValue(name) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling GetOutputValue node with value: " + name, DebugLevel.VERBOSE);
                name = yield this.GetValue(name);
                let result = this.outputs[name];
                if (result == undefined) {
                    logger_1.Logger.Log("Попытка получить незаданный выход " + name, DebugLevel.ERROR);
                    return 0;
                }
                return result;
            });
        }
        GetComponentField(_comp, _field_name) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling GetComponentField node with values: " +
                    _comp +
                    "|" +
                    _field_name, DebugLevel.VERBOSE);
                const comp_path = yield this.GetValue(_comp);
                const comp = this.projectAssembler.FindComponentByPath(comp_path);
                if (comp == null)
                    return 0;
                const field_name = yield this.GetValue(_field_name);
                let result = this.GetObjectFieldByString(comp, field_name);
                if (result === undefined)
                    result = this.GetObjectFieldByString(comp.modifier, field_name);
                if (result === undefined) {
                    logger_1.Logger.Log(`Попытка получить несуществующее поле ${field_name} на детали ${comp_path}`, DebugLevel.ERROR);
                    return 0;
                }
                return result;
            });
        }
        SetComponentsFields(components, fields) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetComponentsFields node with values: " +
                    components +
                    "|" +
                    fields, DebugLevel.VERBOSE);
                if (fields.value == null) {
                    logger_1.Logger.Log("Блок задания параметров деталей без указанных полей", DebugLevel.ERROR);
                    return;
                }
                for (const c of components.value) {
                    const comp_path = c.value;
                    const comp = this.projectAssembler.FindComponentByPath(comp_path);
                    if (comp == null) {
                        logger_1.Logger.Log(`Попытка выставить параметры для несуществующей детали: ${comp_path}`, DebugLevel.ERROR);
                        continue;
                    }
                    for (const field of fields.value) {
                        const v = yield this.GetValue(field);
                        if (v == undefined)
                            continue;
                        if (field.key.includes(".")) {
                            const splitted = field.key.split(".");
                            try {
                                comp[splitted[0]][splitted[1]] = v;
                            }
                            catch (_a) {
                                comp.modifier[splitted[0]][splitted[1]] = v;
                            }
                        }
                        else if (field.key in comp) {
                            comp[field.key] = v;
                        }
                        else if (field.key in comp.modifier) {
                            comp.modifier[field.key] = v;
                        }
                        else
                            logger_1.Logger.Log(`Попытка выставить несуществующий параметр ${field.key} для детали ${comp_path}`, DebugLevel.ERROR);
                    }
                }
            });
        }
        SetLDSPMaterial(components, material) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetLDSPMaterial node with values: " +
                    components +
                    "|" +
                    material, DebugLevel.VERBOSE);
                for (const c of components.value) {
                    const comp_path = c.value;
                    const comp = this.projectAssembler.FindComponentByPath(comp_path);
                    if (comp == null)
                        continue;
                    if (comp.modifier.type != enums_1.ProjectComponentModifierType.LDSP)
                        continue;
                    const modifier = comp.modifier;
                    const front_material = yield this.GetValue(material);
                    comp.material = front_material;
                    modifier.back_material = front_material;
                    const edges = modifier.edges;
                    for (const edge of edges)
                        edge.material = front_material;
                }
            });
        }
        SetLDSPElementMaterial(components, material, back_material, left_edge, top_edge, right_edge, bottom_edge) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetLDSPElementMaterial node with values: " +
                    components +
                    "|" +
                    material +
                    "|" +
                    back_material +
                    "|" +
                    left_edge +
                    "|" +
                    top_edge +
                    "|" +
                    right_edge +
                    "|" +
                    bottom_edge, DebugLevel.VERBOSE);
                for (const c of components.value) {
                    const comp_path = c.value;
                    const comp = this.projectAssembler.FindComponentByPath(comp_path);
                    if (comp == null)
                        continue;
                    if (comp.modifier.type != enums_1.ProjectComponentModifierType.LDSP)
                        continue;
                    const modifier = comp.modifier;
                    const front_material = yield this.GetValue(material);
                    const _back_material = yield this.GetValue(back_material);
                    comp.material = front_material;
                    modifier.back_material = _back_material;
                    const edges = modifier.edges;
                    edges[0].material = yield this.GetValue(left_edge);
                    edges[1].material = yield this.GetValue(top_edge);
                    edges[2].material = yield this.GetValue(right_edge);
                    edges[3].material = yield this.GetValue(bottom_edge);
                }
            });
        }
        SetLDSPEdgesType(components, left, top, right, bottom) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetLDSPEdgesType node with values: " +
                    components +
                    "|" +
                    left +
                    "|" +
                    top +
                    "|" +
                    right +
                    "|" +
                    bottom, DebugLevel.VERBOSE);
                for (const c of components.value) {
                    const comp_path = c.value;
                    const comp = this.projectAssembler.FindComponentByPath(comp_path);
                    if (comp == null)
                        continue;
                    if (comp.modifier.type != enums_1.ProjectComponentModifierType.LDSP)
                        continue;
                    const modifier = comp.modifier;
                    modifier.edges[0].type = yield this.GetValue(left);
                    modifier.edges[1].type = yield this.GetValue(top);
                    modifier.edges[2].type = yield this.GetValue(right);
                    modifier.edges[3].type = yield this.GetValue(bottom);
                }
            });
        }
        SetComponentRotation(_comp, ax, ay, az) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetComponentRotation node with values: " +
                    _comp +
                    "|" +
                    ax +
                    "," +
                    ay +
                    "," +
                    az, DebugLevel.VERBOSE);
                const comp_path = yield this.GetValue(_comp);
                const comp = this.projectAssembler.FindComponentByPath(comp_path);
                if (comp == null)
                    return;
                const rx = yield this.GetValue(ax);
                const ry = yield this.GetValue(ay);
                const rz = yield this.GetValue(az);
                comp.rotation = math_1.Quaternion.euler(rx, ry, rz);
            });
        }
        SetPositioningPointsFields(points, fields) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetPositioningPointsFields node with values: " +
                    points +
                    "|" +
                    fields, DebugLevel.VERBOSE);
                for (const v of points.value) {
                    const pp_path = v.value;
                    const pp = this.projectAssembler.FindPointByPath(pp_path);
                    if (pp == null) {
                        logger_1.Logger.Log(`Попытка выставить параметры для несуществующей точки позиционирования: ${pp_path}`, DebugLevel.ERROR);
                        continue;
                    }
                    for (const field of fields.value) {
                        const v = yield this.GetValue(field);
                        if (v == undefined)
                            continue;
                        if (field.key.includes(".")) {
                            const splitted = field.key.split(".");
                            pp[splitted[0]][splitted[1]] = v;
                        }
                        else if (field.key in pp) {
                            pp[field.key] = v;
                        }
                        else
                            logger_1.Logger.Log(`Попытка выставить несуществующий параметр ${field.key} для точки позиционирования ${pp_path}`, DebugLevel.ERROR);
                    }
                }
            });
        }
        GetMargin(_comp, _face, _side) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling GetMargin node with values: " +
                    _comp +
                    "|" +
                    _face +
                    "|" +
                    _side, DebugLevel.VERBOSE);
                const comp_path = yield this.GetValue(_comp);
                const comp = this.projectAssembler.FindComponentByPath(comp_path);
                if (comp == null)
                    return 0;
                let face = yield this.GetValue(_face);
                if (face == null)
                    face = enums_1.Face.FRONT;
                let side = yield this.GetValue(_side);
                if (side == null)
                    side = enums_1.MarginSide.LEFT;
                const modifier = comp.modifier;
                const margin = modifier.margins.find((m) => m.face == face);
                if (margin == null)
                    return 0;
                return margin.values[side];
            });
        }
        SetMargin(_comp, _face, _side, _value) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetMargin node with values: " +
                    _comp +
                    "|" +
                    _face +
                    "|" +
                    _side +
                    "|" +
                    _value, DebugLevel.VERBOSE);
                const comp_path = yield this.GetValue(_comp);
                const comp = this.projectAssembler.FindComponentByPath(comp_path);
                if (comp == null)
                    return;
                if (comp.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                    return;
                const modifier = comp.modifier;
                let face = yield this.GetValue(_face);
                if (face == null)
                    face = enums_1.Face.FRONT;
                let side = yield this.GetValue(_side);
                if (side == null)
                    side = enums_1.MarginSide.LEFT;
                const value = yield this.GetValue(_value);
                const margin = modifier.margins.find((m) => m.face == face);
                if (margin == null)
                    return;
                margin.values[side] = value;
            });
        }
        SumRun(positive_variables, negative_variables, script, result) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SumRun node with values: " +
                    positive_variables +
                    "|" +
                    negative_variables +
                    "|" +
                    script +
                    "|" +
                    result, DebugLevel.VERBOSE);
                let var_string = "";
                let buffer_string = "";
                let sum = 0;
                let buffer = {};
                if (positive_variables.value != null) {
                    for (let pval of positive_variables.value) {
                        const key = pval.key;
                        let value = yield this.GetValue(pval);
                        if (value == null)
                            value = "";
                        if (typeof value === "string") {
                            if (value == "" || isNaN(Number(value)))
                                value = '"' + value + '"';
                        }
                        var_string += "const " + key + " = " + value + ";\n";
                        sum += value;
                    }
                }
                if (negative_variables.value != null) {
                    for (let nval of negative_variables.value) {
                        const key = nval.key;
                        let value = yield this.GetValue(nval);
                        if (value == null)
                            value = "";
                        if (typeof value === "string") {
                            if (value == "" || isNaN(Number(value)))
                                value = '"' + value + '"';
                        }
                        var_string += "const " + key + " = " + value + ";\n";
                        sum -= value;
                    }
                }
                for (let val of result.value) {
                    if (val.key === "Σ")
                        continue;
                    var_string += "let " + val.key + ";\n";
                    buffer_string += "buffer." + val.key + " = " + val.key + ";\n";
                }
                let target_string = var_string;
                if (script.value != null)
                    target_string += IIKCore.UpdateOldScript(script.value) + "\n";
                target_string += buffer_string;
                const exposedKeys = [
                    "self",
                    "buffer",
                    "sum",
                    "var_string",
                    "buffer_string",
                    "target_string",
                    "S123Core"
                ];
                const exposedValues = [
                    this,
                    buffer,
                    sum,
                    var_string,
                    buffer_string,
                    target_string,
                    yield Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./index */ "./src/index.ts")))
                ];
                if (target_string.includes("await")) {
                    yield new Function(...exposedKeys, `return (async function() {${target_string}})();`).apply(this, exposedValues);
                }
                else {
                    new Function(...exposedKeys, target_string).apply(this, exposedValues);
                }
                for (let val of result.value) {
                    if (val.key === "Σ")
                        continue;
                    val.value = buffer[val.key];
                }
                for (let val of result.value) {
                    if (val.key === "Σ")
                        val.value = sum;
                }
                return result.value;
            });
        }
        SetOutput(name, value) {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Calling SetOutput node with values: " + name + "|" + value, DebugLevel.VERBOSE);
                if (name.value == "" || name.value == null)
                    return;
                const real_value = yield this.GetValue(value);
                this.outputs[name.value] = real_value;
                const output = this.project.graph.outputs.find((o) => o != null && o.name == name.value);
                if (output == null)
                    return;
                output.value = real_value;
            });
        }
        SetUVTransform(components, offset_x, offset_y, scale_x, scale_y, rotation) {
            return __awaiter(this, void 0, void 0, function* () {
                for (const c of components.value) {
                    const comp_path = c.value;
                    const comp = this.projectAssembler.FindComponentByPath(comp_path);
                    if (comp == null || comp.processings == null || comp.processings.length == 0)
                        continue;
                    const foundProcessing = comp.processings.find(function (p) {
                        return p.type == 2;
                    });
                    if (foundProcessing == null)
                        continue;
                    const targetProcessing = foundProcessing;
                    let offset_x_value = yield this.GetValue(offset_x);
                    let offset_y_value = yield this.GetValue(offset_y);
                    let scale_x_value = yield this.GetValue(scale_x);
                    let scale_y_value = yield this.GetValue(scale_y);
                    let rotation_value = yield this.GetValue(rotation);
                    if (offset_x_value == null ||
                        offset_y_value == null ||
                        scale_x_value == null ||
                        scale_y_value == null ||
                        rotation_value == null)
                        continue;
                    targetProcessing.offset = new math_1.Vector2(offset_x_value, offset_y_value);
                    targetProcessing.scale = new math_1.Vector2(scale_x_value, scale_y_value);
                    targetProcessing.rotation = rotation_value;
                }
            });
        }
        GetSerializedBlocks() {
            return JSON.stringify(this.Blocks);
        }
        PrepareInputs() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.inputs != null) {
                    for (let input of this.inputs) {
                        const pr_input = this.project.graph.inputs.find(function (i) {
                            return i.guid == input.guid;
                        });
                        if (pr_input === undefined)
                            continue;
                        pr_input.value = input.value;
                        if (input.settings != null)
                            pr_input.settings = input.settings;
                        if (input.is_active != null)
                            pr_input.is_active = input.is_active;
                    }
                }
                if (this.parent_project != null &&
                    this.parent_project.graph.outputs != null) {
                    for (let input of this.project.graph.inputs) {
                        if (input.settings.tag != null && input.settings.tag != "") {
                            const tagged_output = this.parent_project.graph.outputs.find(function (o) {
                                return o.tag == input.settings.tag;
                            });
                            if (tagged_output != null) {
                                input.value = tagged_output.value;
                            }
                        }
                    }
                }
                this.inputs = this.project.graph.inputs;
                for (let i of this.inputs) {
                    if (i.settings != null &&
                        i.type == GraphInputType.ENUM &&
                        i.settings.values.length > 0 &&
                        (i.value == "" || i.value == null))
                        i.value = i.settings.values[0].value;
                    //if( i.type == GraphInputType.FILES_TAG && ( i.value == null || i.value == "" ) )
                    //{
                    //    let request_string = "api/Calculation/GetAllPaginationCalculations?offset=0&limit=64&tags=";
                    //    for( let t of i.settings.search_tags )
                    //        request_string += "%23" + t.value;
                    //    request_string = encodeURI(request_string);
                    //    const response = await Filesystem.Get( request_string );
                    //    const calculations = response.calculations;
                    //    if( calculations.length == 0 )
                    //        continue;
                    //    const first_calc = calculations[0];
                    //    if( first_calc.idCalculationType == 3 )
                    //        i.value = "s123mat://" + first_calc.guid;
                    //    else
                    //        i.value = "s123calc://" + first_calc.guid;
                    //}
                }
            });
        }
        constructor(project) {
            this.is_active = true;
            this.related_calculations = {};
            this.related_names = {};
            this.has_frontend = true;
            this.generate_inactive = false;
            this.has_related = true;
            this.is_detailed_materials = false;
            this.max_texture_size = 512;
            this.platform = undefined;
            this.is_web_pbr_extras_active = false;
            this.is_web_ar_active = false;
            this.is_scene = false;
            this.method_cache = {};
            this.Blocks = [
                {
                    verbose_name: "Константа",
                    name: "MakeConstant",
                    color: "#ffffff",
                    arguments: [
                        {
                            verbose_name: "Значение",
                            name: "v",
                            type: ArgumentType.FLOAT,
                            value_only: true,
                        },
                    ],
                    result: {
                        type: ArgumentType.FLOAT,
                    },
                },
                {
                    verbose_name: "Получить параметр детали",
                    name: "GetComponentField",
                    color: "#ffad6a",
                    arguments: [
                        {
                            name: "component",
                            type: ArgumentType.COMPONENT,
                            value_only: true,
                        },
                        {
                            name: "field_name",
                            type: ArgumentType.COMPONENT_FIELD,
                            value_only: true,
                        },
                    ],
                    result: {
                        type: ArgumentType.ANY,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать параметр детали",
                    color: "#788cff",
                    name: "SetComponentsFields",
                    arguments: [
                        {
                            name: "components",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.COMPONENT,
                                value_only: true,
                            },
                            is_array: true,
                            value_only: true,
                        },
                        {
                            name: "fields",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.COMPONENT_FIELD,
                                value: ArgumentType.ANY,
                            },
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать поворот",
                    name: "SetComponentRotation",
                    color: "#df6aff",
                    arguments: [
                        {
                            name: "comp",
                            type: ArgumentType.COMPONENT,
                            value_only: true,
                        },
                        {
                            name: "ax",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "ay",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "az",
                            type: ArgumentType.FLOAT,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    verbose_name: "Получить выпуск",
                    name: "GetMargin",
                    color: "#b192ff",
                    arguments: [
                        {
                            name: "comp",
                            verbose_name: "Деталь",
                            type: ArgumentType.COMPONENT,
                            value_only: true,
                        },
                        {
                            name: "face",
                            verbose_name: "Сторона",
                            type: ArgumentType.FACE,
                            value_only: true,
                        },
                        {
                            name: "side",
                            verbose_name: "Выпуск",
                            type: ArgumentType.MARGIN_SIDE,
                            value_only: true,
                        },
                    ],
                    result: {
                        type: ArgumentType.FLOAT,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать выпуск",
                    name: "SetMargin",
                    color: "#8efffa",
                    arguments: [
                        {
                            name: "comp",
                            verbose_name: "Деталь",
                            type: ArgumentType.COMPONENT,
                            value_only: true,
                        },
                        {
                            name: "face",
                            verbose_name: "Сторона",
                            type: ArgumentType.FACE,
                            value_only: true,
                        },
                        {
                            name: "side",
                            verbose_name: "Выпуск",
                            type: ArgumentType.MARGIN_SIDE,
                            value_only: true,
                        },
                        {
                            name: "value",
                            verbose_name: "Значение",
                            type: ArgumentType.FLOAT,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать параметр точки",
                    color: "#6affe9",
                    name: "SetPositioningPointsFields",
                    arguments: [
                        {
                            name: "points",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.POSITIONING_POINT,
                                value_only: true,
                            },
                            value_only: true,
                            is_array: true,
                        },
                        {
                            name: "fields",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.POSITIONING_POINT_FIELD,
                                value: ArgumentType.ANY,
                            },
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Сумматор",
                    color: "#ff5e5e",
                    name: "SumRun",
                    arguments: [
                        {
                            name: "positive_variables",
                            verbose_name: "Положительные",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.ANY,
                            },
                        },
                        {
                            name: "negative_variables",
                            verbose_name: "Отрицательные",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.ANY,
                            },
                        },
                        {
                            name: "script",
                            type: ArgumentType.SCRIPT,
                        },
                    ],
                    result: {
                        type: ArgumentType.DICTIONARY,
                        settings: {
                            key: ArgumentType.STRING,
                            value: ArgumentType.ANY,
                            fixed_keys: ["Σ"],
                        },
                    },
                },
                {
                    verbose_name: "Получить вход",
                    color: "#7dff63",
                    name: "GetInputValue",
                    arguments: [
                        {
                            name: "input",
                            type: ArgumentType.INPUT,
                        },
                    ],
                    result: {
                        type: ArgumentType.ANY,
                    },
                },
                {
                    verbose_name: "Получить выход",
                    color: "#abffc6",
                    name: "GetOutputValue",
                    arguments: [
                        {
                            name: "input",
                            type: ArgumentType.OUTPUT,
                        },
                    ],
                    result: {
                        type: ArgumentType.ANY,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать выход",
                    color: "#fff86a",
                    name: "SetOutput",
                    arguments: [
                        {
                            name: "name",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "value",
                            type: ArgumentType.ANY,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать габариты проекта",
                    name: "SetProjectBounds",
                    arguments: [
                        {
                            name: "width",
                            verbose_name: "Ширина",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "height",
                            verbose_name: "Высота",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "depth",
                            verbose_name: "Глубина",
                            type: ArgumentType.FLOAT,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать тип кромок",
                    name: "SetLDSPEdgesType",
                    arguments: [
                        {
                            name: "components",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.COMPONENT,
                                value_only: true,
                            },
                            is_array: true,
                            value_only: true,
                        },
                        {
                            name: "left_edge",
                            verbose_name: "Левая",
                            type: ArgumentType.LDSP_EDGE_TYPE,
                        },
                        {
                            name: "top_edge",
                            verbose_name: "Верхняя",
                            type: ArgumentType.LDSP_EDGE_TYPE,
                        },
                        {
                            name: "right_edge",
                            verbose_name: "Правая",
                            type: ArgumentType.LDSP_EDGE_TYPE,
                        },
                        {
                            name: "bottom_edge",
                            verbose_name: "Нижняя",
                            type: ArgumentType.LDSP_EDGE_TYPE,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать материал ЛДСП",
                    name: "SetLDSPMaterial",
                    arguments: [
                        {
                            name: "components",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.COMPONENT,
                                value_only: true,
                            },
                            is_array: true,
                            value_only: true,
                        },
                        {
                            name: "material",
                            verbose_name: "Материал",
                            type: ArgumentType.STRING,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "Задать материал элемента ЛДСП",
                    name: "SetLDSPElementMaterial",
                    arguments: [
                        {
                            name: "components",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.COMPONENT,
                                value_only: true,
                            },
                            is_array: true,
                            value_only: true,
                        },
                        {
                            name: "material",
                            verbose_name: "Лицевая",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "back_material",
                            verbose_name: "Обратная",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "left_edge",
                            verbose_name: "Левая кромка",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "top_edge",
                            verbose_name: "Верхняя кромка",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "right_edge",
                            verbose_name: "Правая кромка",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "bottom_edge",
                            verbose_name: "Нижняя кромка",
                            type: ArgumentType.STRING,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    verbose_name: "Событие",
                    name: "InvokeEvent",
                    color: "#b26aff",
                    arguments: [
                        {
                            name: "name",
                            verbose_name: "Имя функции",
                            type: ArgumentType.STRING,
                        },
                        {
                            name: "script",
                            type: ArgumentType.SCRIPT,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
                {
                    is_final: true,
                    verbose_name: "UV трансформация",
                    name: "SetUVTransform",
                    arguments: [
                        {
                            name: "components",
                            type: ArgumentType.DICTIONARY,
                            settings: {
                                key: ArgumentType.STRING,
                                value: ArgumentType.COMPONENT,
                                value_only: true,
                            },
                            is_array: true,
                            value_only: true,
                        },
                        {
                            name: "offset_x",
                            verbose_name: "Смещение по X",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "offset_y",
                            verbose_name: "Смещение по Y",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "scale_x",
                            verbose_name: "Размер по X",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "scale_y",
                            verbose_name: "Размер по Y",
                            type: ArgumentType.FLOAT,
                        },
                        {
                            name: "rotation",
                            verbose_name: "Поворот",
                            type: ArgumentType.FLOAT,
                        },
                    ],
                    result: {
                        type: ArgumentType.NONE,
                    },
                },
            ];
            this.project = project_1.ProjectFactory.Create(project);
            this.projectAssembler = new project_assembler_1.ProjectAssembler(this);
            if (this.related_inputs == null ||
                Object.keys(this.related_inputs).length == 0) {
                this.related_inputs = this.project.graph.related_inputs;
            }
            this.outputs = {};
        }
        PrepareFrontend() {
            return __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Log("Start preparing content", logger_1.Logger.DebugLevel.INFO);
                logger_1.Logger.Log("MaxTextureSize: " + this.max_texture_size, logger_1.Logger.DebugLevel.INFO);
                const builder = new builder_1.ProductBuilder(this);
                builder.generateRelated = this.has_related;
                builder.generateInactive = this.generate_inactive;
                builder.isScene = this.is_scene;
                logger_1.Logger.Log("Starting product build", logger_1.Logger.DebugLevel.INFO);
                this.frontend = yield builder.Build();
                logger_1.Logger.Log("Done preparing content", logger_1.Logger.DebugLevel.INFO);
            });
        }
        GetComponentScale(comp) {
            const implementation = new project_item_implementation_1.ProjectItemImplementation(comp);
            const initialComponent = this.projectAssembler.FindComponentByPath(implementation.fullPath);
            if (initialComponent == null)
                return math_1.Vector3.one;
            const scale = comp.size.div(initialComponent.size);
            if (scale.isZero() || !scale.isFinite())
                return math_1.Vector3.one;
            return scale;
        }
        PrepareOutputNodes(nodes) {
            const final_nodes = [];
            let zero_ordered_nodes = nodes.filter((n) => n.order == 0);
            for (let i in zero_ordered_nodes) {
                if (zero_ordered_nodes[i].order == 0)
                    zero_ordered_nodes[i].order = Number(i);
            }
            for (let node of nodes) {
                const func = this.Blocks.find((b) => b.name === node.method.name);
                if (func.is_final !== true)
                    continue;
                if (node.method.result.type != ArgumentType.NONE) {
                    if (nodes.find((n) => n.method.HasConnectionTo(node.guid)) != null)
                        continue;
                }
                final_nodes.push(node);
            }
            final_nodes.sort((n1, n2) => {
                if (n1.order <= n2.order)
                    return -1;
                return 1;
            });
            return final_nodes;
        }
        UpdateInputs() {
            for (const input of this.inputs) {
                if ("min" in input.settings) {
                    if (input.value < input.settings.min)
                        input.value = input.settings.min;
                }
                if ("max" in input.settings) {
                    if (input.value > input.settings.max)
                        input.value = input.settings.max;
                }
            }
        }
        UpdateOutputs() {
            if (this.project.graph.outputs == null) {
                this.project.graph.outputs = [];
                this.outputs = [];
                return;
            }
            for (let output of this.project.graph.outputs) {
                if (output == null)
                    continue;
                if (output.tag != null && output.tag != "") {
                    const tagged_input = this.project.graph.inputs.find(function (i) {
                        return i.settings.tag == output.tag;
                    });
                    if (tagged_input != null) {
                        output.value = tagged_input.value;
                        continue;
                    }
                }
                if (this.outputs[output.name] != undefined)
                    output.value = this.outputs[output.name];
            }
            this.outputs = this.project.graph.outputs;
        }
        static GetSlotComponent(parentAssembler, childAssembler, sourceComponent) {
            return __awaiter(this, void 0, void 0, function* () {
                if (sourceComponent.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                    return null;
                const modifier = sourceComponent.modifier;
                const targetSlot = modifier.target_slot;
                if (targetSlot != null && targetSlot != "") {
                    const foundComponent = childAssembler.FindComponentByPath(targetSlot);
                    if (foundComponent == null)
                        return null;
                    if (foundComponent.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                        return null;
                    return foundComponent;
                }
                let category = modifier.category;
                if (category == null || category == 0) {
                    if (parentAssembler.targetProject.guid != null) {
                        const stat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + parentAssembler.targetProject.guid);
                        category = stat.category;
                    }
                }
                return childAssembler.targetProject.components.find((c) => {
                    if (c.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                        return false;
                    const modifier = c.modifier;
                    if (modifier.category == null)
                        modifier.category = 0;
                    if ((category == null || category == 0) && modifier.category != 0)
                        return false;
                    return modifier.category == category;
                });
            });
        }
        CalculateRelated(comp) {
            return __awaiter(this, void 0, void 0, function* () {
                if (comp.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                    return null;
                const modifier = comp.modifier;
                if (modifier.related_project == null || modifier.related_project == "")
                    return null;
                const projectGuid = modifier.related_project.replace("s123calc://", "");
                const calcStat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + projectGuid);
                if (calcStat == null) {
                    logger_1.Logger.Log("Ошибка загрузки проекта " + projectGuid, DebugLevel.ERROR);
                    return null;
                }
                const projectData = yield filesystem_1.Filesystem.GetFile(`s123://calculationResults/${projectGuid}/${calcStat.projectFileName}`);
                const childIIK = new IIKCore(projectData);
                childIIK.inputs = null;
                childIIK.related_inputs = null;
                childIIK.project.guid = projectGuid;
                childIIK.has_frontend = this.has_frontend;
                childIIK.max_texture_size = this.max_texture_size;
                childIIK.is_detailed_materials = this.is_detailed_materials;
                childIIK.parent_project = this.project;
                childIIK.platform = this.platform;
                childIIK.is_web_ar_active = this.is_web_ar_active;
                childIIK.is_web_pbr_extras_active = this.is_web_pbr_extras_active;
                if (this.related_inputs != null && comp.guid in this.related_inputs) {
                    childIIK.project.graph.inputs = this.related_inputs[comp.guid];
                    //const childInputs: GraphInput[] = childIIK.project.graph.inputs;
                    //let notFound = arraysMatchUnorderedBy( this.related_inputs[comp.guid], childInputs, (a : GraphInput,b : GraphInput) => a.guid == b.guid );
                    //if (notFound)
                    //  this.related_inputs[comp.guid] = childIIK.project.graph.inputs;
                    //else {
                    //  for (let i = 0; i < childInputs.length; i++) {
                    //    const relatedInput = this.related_inputs[comp.guid].find(
                    //      (input: GraphInput) => input.guid == childInputs[i].guid,
                    //    );
                    //    if( relatedInput == null ) continue;
                    //    const oldInput = childInputs[i];
                    //    childInputs[i] = relatedInput;
                    //    childInputs[i].settings.tag = oldInput.settings.tag;
                    //  }
                    //}
                }
                const slotComponent = yield IIKCore.GetSlotComponent(this.projectAssembler, childIIK.projectAssembler, comp);
                if (slotComponent != null) {
                    const slotComponentFullPath = new project_component_implementation_1.ProjectComponentImplementation(childIIK.projectAssembler, slotComponent).fullPath;
                    for (const childNode of childIIK.project.graph.nodes) {
                        if (childNode.method.name != "SetComponentsFields")
                            continue;
                        const componentsArgument = childNode.method.arguments.find(arg => arg.name == "components");
                        const fieldsArgument = childNode.method.arguments.find(arg => arg.name == "fields");
                        if (componentsArgument != null && fieldsArgument != null &&
                            fieldsArgument.value.some((pair) => pair.value == "size.x" ||
                                pair.value == "size.y" ||
                                pair.value == "size.z" ||
                                pair.value == "material")) {
                            componentsArgument.value = componentsArgument.value.filter((pair) => {
                                return pair.value != slotComponentFullPath;
                            });
                        }
                    }
                    slotComponent.size = comp.size;
                    slotComponent.material = comp.material;
                    const slotModifier = slotComponent.modifier;
                    slotModifier.related_project = "";
                }
                if (this.related_event != null && this.related_event.guid == comp.guid) {
                    yield childIIK.Invoke(this.related_event.name, this.related_event.value);
                    this.related_event = null;
                }
                yield childIIK.Calculate();
                if (this.related_inputs == null)
                    this.related_inputs = {};
                this.related_inputs[comp.guid] = childIIK.inputs;
                comp.size = childIIK.projectAssembler.GetProjectBounds().size.mult(1000.0);
                return childIIK;
            });
        }
        UpdateComponentsSize() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                for (let comp of this.project.components) {
                    if (comp.modifier.type == enums_1.ProjectComponentModifierType.ARRAY) {
                        const modifier = comp.modifier;
                        if (modifier.child == null)
                            continue;
                        const bounds = new math_1.Bounds();
                        const child_size = ((_a = this.projectAssembler.GetComponentBounds(modifier.child)) !== null && _a !== void 0 ? _a : new math_1.Bounds()).size;
                        const offset = new math_1.Vector3(modifier.offset).div(1000.0);
                        for (let i = 0; i < modifier.count; i++) {
                            let pos = offset
                                .mult(i)
                                .sub(offset.mult(modifier.count - 1).div(2.0));
                            bounds.encapsulate(math_1.Bounds.fromCenterAndSize(pos, child_size));
                        }
                        comp.size = bounds.size.mult(1000.0);
                    }
                    else if (comp.modifier.type == enums_1.ProjectComponentModifierType.SHAPE) {
                        const modifier = comp.modifier;
                        if (modifier.shape == null || modifier.shape == "")
                            continue;
                        const implementation = new project_component_implementation_1.ProjectComponentImplementation(this.projectAssembler, comp);
                        const shape = yield implementation.GetShape();
                        if (shape == null)
                            continue;
                        const shape_size = shape_1.Shape.GetShapeSize(shape);
                        if (modifier.radius == undefined || modifier.radius == 0) {
                            if (shape_size.x != null && shape_size.y != null) {
                                comp.size = new math_1.Vector3(shape_size.x * 1000.0, comp.size.y, shape_size.y * 1000.0);
                            }
                        }
                        else {
                            const angle1 = (modifier.start_angle / 180.0) * Math.PI;
                            const angle2 = (modifier.end_angle / 180.0) * Math.PI;
                            const dangle = ((modifier.start_angle +
                                (modifier.end_angle - modifier.start_angle) / 2.0) /
                                180.0) *
                                Math.PI;
                            const v1 = new math_1.Vector2(Math.cos(angle1), Math.sin(angle1)).mult(modifier.radius);
                            const v2 = new math_1.Vector2(Math.cos(angle2), Math.sin(angle2)).mult(modifier.radius);
                            const v3 = new math_1.Vector2(Math.cos(dangle), Math.sin(dangle)).mult(modifier.radius);
                            const min = new math_1.Vector2(Math.min(v1.x, v2.x, v3.x), Math.min(v1.y, v2.y, v3.y));
                            const max = new math_1.Vector2(Math.max(v1.x, v2.x, v3.x), Math.max(v1.y, v2.y, v3.y));
                            comp.size.x = max.x - min.x;
                            comp.size.y = max.y - min.y;
                            if (modifier.depth != null && modifier.depth != 0)
                                comp.size.z = modifier.depth;
                        }
                    }
                    else if (comp.modifier.type == enums_1.ProjectComponentModifierType.LDSP) {
                        const modifier = comp.modifier;
                        modifier.real_size = new math_1.Vector3(comp.size);
                        if (modifier.edges[0].type == enums_1.LDSPEdgeType.MM2)
                            modifier.real_size.x -= 2;
                        if (modifier.edges[2].type == enums_1.LDSPEdgeType.MM2)
                            modifier.real_size.x -= 2;
                        if (modifier.edges[1].type == enums_1.LDSPEdgeType.MM2)
                            modifier.real_size.y -= 2;
                        if (modifier.edges[3].type == enums_1.LDSPEdgeType.MM2)
                            modifier.real_size.y -= 2;
                        {
                            modifier.edges[0].size = new math_1.Vector3();
                            modifier.edges[0].size.x = comp.size.z;
                            modifier.edges[0].size.y = comp.size.y;
                            modifier.edges[0].size.z = 0;
                            if (modifier.edges[0].type == enums_1.LDSPEdgeType.MM04)
                                modifier.edges[0].size.z = 0.4;
                            else if (modifier.edges[0].type == enums_1.LDSPEdgeType.MM2)
                                modifier.edges[0].size.z = 2;
                        }
                        {
                            modifier.edges[2].size = new math_1.Vector3();
                            modifier.edges[2].size.x = comp.size.z;
                            modifier.edges[2].size.y = comp.size.y;
                            modifier.edges[2].size.z = 0;
                            if (modifier.edges[2].type == enums_1.LDSPEdgeType.MM04)
                                modifier.edges[2].size.z = 0.4;
                            else if (modifier.edges[2].type == enums_1.LDSPEdgeType.MM2)
                                modifier.edges[2].size.z = 2;
                        }
                        {
                            modifier.edges[1].size = new math_1.Vector3();
                            modifier.edges[1].size.x = comp.size.z;
                            // noinspection JSSuspiciousNameCombination
                            modifier.edges[1].size.y = comp.size.x;
                            modifier.edges[1].size.z = 0;
                            if (modifier.edges[1].type == enums_1.LDSPEdgeType.MM04)
                                modifier.edges[1].size.z = 0.4;
                            else if (modifier.edges[1].type == enums_1.LDSPEdgeType.MM2)
                                modifier.edges[1].size.z = 2;
                        }
                        {
                            modifier.edges[3].size = new math_1.Vector3();
                            modifier.edges[3].size.x = comp.size.z;
                            // noinspection JSSuspiciousNameCombination
                            modifier.edges[3].size.y = comp.size.x;
                            modifier.edges[3].size.z = 0;
                            if (modifier.edges[3].type == enums_1.LDSPEdgeType.MM04)
                                modifier.edges[3].size.z = 0.4;
                            else if (modifier.edges[3].type == enums_1.LDSPEdgeType.MM2)
                                modifier.edges[3].size.z = 2;
                        }
                    }
                    else if (comp.modifier.type == enums_1.ProjectComponentModifierType.BUILTIN) {
                        const relatedCalculation = this.related_calculations[comp.guid];
                        if (relatedCalculation != null) {
                            comp.size = relatedCalculation.projectAssembler.GetProjectBounds().size.mult(1000.0);
                        }
                    }
                }
            });
        }
        PrepareRelatedInputs() {
            //if( this.related_inputs == null )
            //    this.related_inputs = this.project.graph.related_inputs;
            //else
            //    this.project.graph.related_inputs = this.related_inputs;
            //
            //for( let key in this.related_inputs )
            //{
            //    const comp = this.project.components.find( ( c : ProjectComponent ) => c.guid == key );
            //    if( comp == null )
            //    {
            //        delete this.related_inputs[key];
            //        continue;
            //    }
            //    if( comp.modifier.show_inputs == false )
            //        delete this.related_inputs[key];
            //}
            this.related_inputs = {};
            for (let comp of this.project.components) {
                if (comp.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                    continue;
                const modifier = comp.modifier;
                if (modifier.related_project == null ||
                    modifier.related_project == "")
                    continue;
                if (!modifier.show_inputs)
                    continue;
                if (comp.guid in this.related_calculations) {
                    this.related_inputs[comp.guid] =
                        this.related_calculations[comp.guid].project.graph.inputs;
                }
            }
            this.project.graph.related_inputs = this.related_inputs;
        }
        CalculateNodes() {
            return __awaiter(this, void 0, void 0, function* () {
                this.out_nodes = this.PrepareOutputNodes(this.project.graph.nodes);
                if (this.project.graph.is_active == undefined || this.project.graph.is_active) {
                    for (const n of this.out_nodes)
                        yield this.InvokeMethod(n.method);
                }
            });
        }
        Calculate() {
            return __awaiter(this, arguments, void 0, function* (callback = null) {
                if (this.project.guid != null) {
                    const stat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + this.project.guid);
                    if (stat != null && stat.idCalculationType != null) {
                        this.is_scene = stat.idCalculationType == 1;
                    }
                }
                this.method_cache = {};
                logger_1.Logger.Log("Calculation started", logger_1.Logger.DebugLevel.INFO);
                Log("Preparing inputs", DebugLevel.INFO);
                yield this.PrepareInputs();
                Log("Done preparing inputs", DebugLevel.INFO);
                logger_1.Logger.Log("Preparing materials", logger_1.Logger.DebugLevel.INFO);
                //await this.PrepareMaterials();
                logger_1.Logger.Log("Processing nodes", logger_1.Logger.DebugLevel.INFO);
                yield this.CalculateNodes();
                logger_1.Logger.Log("Updating inputs", logger_1.Logger.DebugLevel.INFO);
                this.UpdateInputs();
                logger_1.Logger.Log("Updating outputs", logger_1.Logger.DebugLevel.INFO);
                this.UpdateOutputs();
                if (!this.is_scene)
                    this.related_calculations = {};
                this.related_names = {};
                logger_1.Logger.Log("Calculating related projects", logger_1.Logger.DebugLevel.INFO);
                yield (0, utils_1.iterateAsync)(this.project.components, (comp) => __awaiter(this, void 0, void 0, function* () {
                    if (comp.modifier.type != enums_1.ProjectComponentModifierType.BUILTIN)
                        return;
                    if (comp.modifier.related_project == null ||
                        comp.modifier.related_project == "")
                        return;
                    if (!this.is_scene) {
                        this.related_calculations[comp.guid] = yield this.CalculateRelated(comp);
                        if (this.related_calculations[comp.guid] != null)
                            this.related_names[comp.guid] = comp.name;
                    }
                    else {
                        if (!(comp.guid in this.related_calculations)) {
                            this.related_calculations[comp.guid] = yield this.CalculateRelated(comp);
                        }
                        else {
                            let child_iik = this.related_calculations[comp.guid];
                            if (child_iik != null) {
                                if (this.related_inputs != null && comp.guid in this.related_inputs) {
                                    let not_found = false;
                                    for (let ri of this.related_inputs[comp.guid]) {
                                        if (child_iik.project.graph.inputs.find(function (i) {
                                            return i.guid == ri.guid;
                                        }) == null) {
                                            not_found = true;
                                            break;
                                        }
                                    }
                                    if (not_found)
                                        this.related_inputs[comp.guid] = child_iik.project.graph.inputs;
                                    else {
                                        const child_inputs = child_iik.project.graph.inputs;
                                        for (let i = 0; i < child_inputs.length; i++) {
                                            const related_input = this.related_inputs[comp.guid].find((inp) => inp.guid == child_inputs[i].guid);
                                            if (related_input != null) {
                                                const old_input = child_inputs[i];
                                                child_inputs[i] = related_input;
                                                child_inputs[i].settings.tag = old_input.settings.tag;
                                            }
                                        }
                                    }
                                }
                                yield child_iik.Calculate();
                            }
                        }
                    }
                }), this.platform);
                if (Object.values(this.related_calculations).some((c) => c.need_parent_recalculate))
                    yield this.CalculateNodes();
                logger_1.Logger.Log("Updating components size", logger_1.Logger.DebugLevel.INFO);
                yield this.UpdateComponentsSize();
                logger_1.Logger.Log("Assembling project", logger_1.Logger.DebugLevel.INFO);
                this.projectAssembler.Assemble(!this.is_scene);
                if (this.has_frontend)
                    yield this.PrepareFrontend();
                logger_1.Logger.Log("Updating inputs and outputs", logger_1.Logger.DebugLevel.INFO);
                this.inputs = this.project.graph.inputs;
                this.PrepareRelatedInputs();
                this.is_active = this.project.graph.is_active;
                let articleOutput = this.project.graph.outputs.find((o) => o.type == GraphOutputType.ARTICLE);
                if (articleOutput != null) {
                    const calculationStat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + this.project.guid);
                    articleOutput.value = calculationStat.article;
                }
                logger_1.Logger.Log("Calculation done", logger_1.Logger.DebugLevel.INFO);
                if (callback != null) {
                    callback();
                    logger_1.Logger.Log("Callback is done processing", logger_1.Logger.DebugLevel.INFO);
                }
            });
        }
        SetInputValue(input_name, value) {
            if (this.inputs != null) {
                for (const i of this.inputs) {
                    if (i.name === input_name)
                        i.value = value;
                }
            }
            for (const i of this.project.graph.inputs) {
                if (i.name === input_name)
                    i.value = value;
            }
        }
        Detail(detail_name) {
            const result = this.project.components.find((c) => c.name == detail_name);
            if (result == undefined)
                logger_1.Logger.Log("Попытка получить незаданную деталь", DebugLevel.ERROR);
            return result;
        }
        DetailFace(componentName, targetFaces) {
            const component = this.Detail(componentName);
            if (component == null)
                return;
            const modifier = component.modifier;
            modifier.target_faces = targetFaces;
        }
        Input(input_name) {
            const result = this.project.graph.inputs.find((i) => i.name == input_name);
            if (result == undefined)
                logger_1.Logger.Log("Попытка получить незаданный выход", DebugLevel.ERROR);
            return result;
        }
        PPoint(point_name) {
            const components = this.project.components;
            if (components == undefined) {
                logger_1.Logger.Log("Попытка найти точку позиционирования у незаданной детали", DebugLevel.ERROR);
                return components;
            }
            let result = undefined;
            for (let component of this.project.components) {
                result = component.positioning_points.find((pp) => pp.name == point_name);
                if (result != undefined)
                    return result;
            }
            logger_1.Logger.Log("Попытка получить незаданную точку", DebugLevel.ERROR);
            return result;
        }
        Invoke(event_name, value) {
            return __awaiter(this, void 0, void 0, function* () {
                const event = this.project.graph.nodes.find(function (node) {
                    if (node.method.name !== "InvokeEvent")
                        return false;
                    const name_arg = node.method.arguments.find(function (a) {
                        return a.name === "name";
                    });
                    return name_arg.value == event_name;
                });
                if (event == null)
                    return;
                let script = yield this.GetValue(event.method.arguments.find(function (a) {
                    return a.name === "script";
                }));
                if (isNaN(Number(value)))
                    value = '"' + value + '"';
                script = "var value=" + value + ";\n" + IIKCore.UpdateOldScript(script);
                new Function(script).call(this);
            });
        }
        InvokeScript(script) {
            new Function(script).call(this);
        }
    }
    IIKCore.DefaultLDSPMaterial = "s123mat://b1e0b85e-c613-452f-8b49-0b0dc89d3543";
    IIKCore.DefaultLDSPCutMaterial = "s123mat://93d343ca-ce11-4614-a0bb-50f5ff65fe96";
    IIK.IIKCore = IIKCore;
})(IIK || (exports.IIK = IIK = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Graph = exports.MaterialCore = exports.Filesystem = exports.Logger = exports.Generator = exports.IIK = void 0;
const iik_1 = __webpack_require__(/*! ./iik */ "./src/iik.ts");
Object.defineProperty(exports, "IIK", ({ enumerable: true, get: function () { return iik_1.IIK; } }));
const generator_1 = __webpack_require__(/*! ./MeshUtils/generator */ "./src/MeshUtils/generator.ts");
Object.defineProperty(exports, "Generator", ({ enumerable: true, get: function () { return generator_1.Generator; } }));
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
Object.defineProperty(exports, "Logger", ({ enumerable: true, get: function () { return logger_1.Logger; } }));
const filesystem_1 = __webpack_require__(/*! ./filesystem */ "./src/filesystem.ts");
Object.defineProperty(exports, "Filesystem", ({ enumerable: true, get: function () { return filesystem_1.Filesystem; } }));
const material_1 = __webpack_require__(/*! ./material */ "./src/material.ts");
Object.defineProperty(exports, "MaterialCore", ({ enumerable: true, get: function () { return material_1.MaterialCore; } }));
const graph_1 = __webpack_require__(/*! ./graph */ "./src/graph.ts");
Object.defineProperty(exports, "Graph", ({ enumerable: true, get: function () { return graph_1.Graph; } }));


/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
var Logger;
(function (Logger) {
    let DebugLevel;
    (function (DebugLevel) {
        DebugLevel[DebugLevel["NONE"] = -1] = "NONE";
        DebugLevel[DebugLevel["ERROR"] = 0] = "ERROR";
        DebugLevel[DebugLevel["WARNING"] = 1] = "WARNING";
        DebugLevel[DebugLevel["INFO"] = 2] = "INFO";
        DebugLevel[DebugLevel["VERBOSE"] = 3] = "VERBOSE";
    })(DebugLevel = Logger.DebugLevel || (Logger.DebugLevel = {}));
    Logger.debug = DebugLevel.NONE;
    //export let debug = DebugLevel.VERBOSE;
    //export let debug = DebugLevel.INFO;
    Logger.externalLog = console.log;
    Logger.Log = function (data, level) {
        if (level > Logger.debug)
            return;
        if (data instanceof Error) {
            Logger.externalLog(data.stack);
        }
        else if (typeof data === "string") {
            Logger.externalLog(data);
        }
        else {
            Logger.externalLog(JSON.stringify(data));
        }
    };
})(Logger || (exports.Logger = Logger = {}));


/***/ }),

/***/ "./src/material.ts":
/*!*************************!*\
  !*** ./src/material.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaterialCore = void 0;
const changeable_1 = __webpack_require__(/*! ./Core/changeable */ "./src/Core/changeable.ts");
const filesystem_1 = __webpack_require__(/*! ./filesystem */ "./src/filesystem.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
const math_1 = __webpack_require__(/*! ./math */ "./src/math.ts");
const DebugLevel = logger_1.Logger.DebugLevel;
var MaterialCore;
(function (MaterialCore) {
    var Cacheable = filesystem_1.Filesystem.Cacheable;
    let MaterialTemplate;
    (function (MaterialTemplate) {
        MaterialTemplate[MaterialTemplate["NONE"] = 0] = "NONE";
        MaterialTemplate[MaterialTemplate["TILE"] = 1] = "TILE";
        MaterialTemplate[MaterialTemplate["WALLPAPER"] = 2] = "WALLPAPER";
        MaterialTemplate[MaterialTemplate["PLASTER"] = 3] = "PLASTER";
        MaterialTemplate[MaterialTemplate["WOOD"] = 4] = "WOOD";
        MaterialTemplate[MaterialTemplate["CLOTH"] = 5] = "CLOTH";
    })(MaterialTemplate = MaterialCore.MaterialTemplate || (MaterialCore.MaterialTemplate = {}));
    class Texture extends changeable_1.Changeable {
        constructor() {
            super(...arguments);
            this.fileName = "";
            this.resolution = new math_1.Vector2(2048, 2048);
            this.realSize = undefined;
        }
    }
    MaterialCore.Texture = Texture;
    class WebMaterialParams extends changeable_1.Changeable {
        constructor() {
            super(...arguments);
            this.lightMapIntensity = 1;
            this.envMapIntensity = 1;
            this.aoMapIntensity = 1;
            this.transparent = false;
            this.alphaTest = 0;
            this.depthTest = true;
            this.depthWrite = true;
            this.side = "FrontSide";
        }
    }
    MaterialCore.WebMaterialParams = WebMaterialParams;
    let UEMaterialType;
    (function (UEMaterialType) {
        UEMaterialType[UEMaterialType["OPAQUE"] = 1] = "OPAQUE";
        UEMaterialType[UEMaterialType["TRANSPARENT"] = 2] = "TRANSPARENT";
        UEMaterialType[UEMaterialType["MASK"] = 3] = "MASK";
        UEMaterialType[UEMaterialType["MASK_DOUBLESIDED"] = 4] = "MASK_DOUBLESIDED";
        UEMaterialType[UEMaterialType["CLOTH_DOUBLESIDED"] = 5] = "CLOTH_DOUBLESIDED";
        UEMaterialType[UEMaterialType["GLASS_NOREFRACTION"] = 6] = "GLASS_NOREFRACTION";
        UEMaterialType[UEMaterialType["GLASS_REFRACTION"] = 7] = "GLASS_REFRACTION";
    })(UEMaterialType || (UEMaterialType = {}));
    class Color extends changeable_1.Changeable {
        constructor() {
            super(...arguments);
            this.r = 1;
            this.g = 1;
            this.b = 1;
            this.a = 1;
        }
    }
    MaterialCore.Color = Color;
    class UEMaterialParams extends changeable_1.Changeable {
        constructor() {
            super(...arguments);
            this.metallicIntensity = 1;
            this.roughnessIntensity = 1;
            this.emissiveIntensity = 1;
            this.normalIntensity = 1;
            this.displacement = new Texture();
            this.displacementIntensity = 1;
            this.hue = new Color();
            this.type = UEMaterialType.OPAQUE;
        }
    }
    MaterialCore.UEMaterialParams = UEMaterialParams;
    class Material extends Cacheable {
        constructor() {
            super();
            this.guid = "";
            this.name = "";
            this.ao = new Texture();
            this.aoValue = 1;
            this.diffuse = new Texture();
            this.color = "#ffffff";
            this.metallic = new Texture();
            this.metallicValue = 1;
            this.normal = new Texture();
            this.normalValue = 1;
            this.roughness = new Texture();
            this.roughnessValue = 1;
            this.emissive = new Texture();
            this.emissiveColor = "#000000";
            this.sheenValue = 0;
            this.sheenRoughness = new Texture();
            this.sheenRoughnessValue = 1;
            this.sheenColor = new Texture();
            this.sheenColorValue = "#ffffff";
            this.alpha = new Texture();
            this.opacity = 1;
            this.transmission = new Texture();
            this.transmissionValue = 0;
            this.dispersion = 0;
            this.ior = 1.5;
            this.attenuationDistance = Infinity;
            this.attenuationColor = "#ffffff";
            this.realSize = new math_1.Vector2(1, 1);
            this.isMask = false;
            this.renderFace = "front";
            this.previewColor = "";
            this.category = "";
            this.bake = "";
            this.isDetailed = false;
            this.maxResolution = 512;
            this.web = new WebMaterialParams();
            this.ue = new UEMaterialParams();
            this.compressedTextures = undefined;
            this.webAr = "";
            this.webPbr = "";
            this.preset = "";
        }
        GetHashableData() {
            let newMaterial = new Material();
            newMaterial.UpdateFrom(this);
            delete newMaterial.hash;
            delete newMaterial.isDirty;
            return JSON.stringify(newMaterial);
        }
        GetAllTextures() {
            const result = [];
            const keys = Object.keys(this);
            for (const key of keys) {
                if (typeof this[key] == "object" &&
                    this[key] instanceof Texture)
                    result.push(this[key]);
            }
            return result;
        }
        ConvertToNew(data) {
            const keys = Object.keys(this);
            for (const key of keys) {
                if (data.hasOwnProperty(key)) {
                    if (typeof this[key] == "object" &&
                        this[key] instanceof Texture) {
                        if (typeof data[key] == "string") {
                            const url = data[key];
                            data[key] = new Texture();
                            data[key].fileName = url;
                            if (data.real_size != null && data.real_size[key] != null)
                                data[key].realSize = data.real_size[key];
                        }
                    }
                }
            }
            if (data.real_size != null && data.real_size.default != null)
                data.realSize = data.real_size.default;
            return data;
        }
        static GetByDirectLink(url_1) {
            return __awaiter(this, arguments, void 0, function* (url, guid = "") {
                var _a;
                if (url + guid in Material.cachedMaterials) {
                    return Material.cachedMaterials[url + guid];
                }
                let materialName = "";
                let materialFilePath = "";
                let targetGuid = guid;
                if (url.startsWith("s123://")) {
                    materialFilePath = url;
                    materialName = (_a = materialFilePath.split("/").pop()) !== null && _a !== void 0 ? _a : "";
                }
                else {
                    const guid = url.replace("s123mat://", "");
                    targetGuid = guid;
                    const calc_stat = yield filesystem_1.Filesystem.Get("api/Calculation/GetCalculationStat?guid=" + guid);
                    if (calc_stat == null) {
                        logger_1.Logger.Log("Ошибка загрузки материала " + guid, DebugLevel.ERROR);
                        Material.cachedMaterials[url + guid] = Material.DefaultMaterial;
                        return Material.DefaultMaterial;
                    }
                    materialName = calc_stat.name;
                    materialFilePath = `s123://calculationResults/${guid}/${calc_stat.projectFileName}`;
                }
                const material = yield filesystem_1.Filesystem.GetFile(materialFilePath);
                if (material == null) {
                    logger_1.Logger.Log("Ошибка загрузки материала " + materialFilePath, DebugLevel.ERROR);
                    Material.cachedMaterials[url + guid] = Material.DefaultMaterial;
                    return Material.DefaultMaterial;
                }
                const result = Material.GetByData(material, targetGuid);
                result.name = materialName;
                Material.cachedMaterials[url + guid] = result;
                return result;
            });
        }
        static GetByData(data, guid) {
            const result = new Material();
            result.guid = guid;
            const updated_data = result.ConvertToNew(data);
            result.UpdateFrom(updated_data);
            for (let t of result.GetAllTextures()) {
                if (t.realSize == null)
                    t.realSize = result.realSize;
            }
            return result;
        }
        GetDirectTextureLink(filename, maxSize, crop) {
            logger_1.Logger.Log("Preparing direct texture link", DebugLevel.VERBOSE);
            logger_1.Logger.Log("GUID: " + this.guid, DebugLevel.VERBOSE);
            logger_1.Logger.Log("filename: " + filename, DebugLevel.VERBOSE);
            if (this.guid == null || this.guid == "")
                return filename;
            let result = `calculationResults/${this.guid}/${filename}`;
            if (maxSize != 0) {
                if (!crop)
                    result += `&maxSize=${maxSize}`;
                else
                    result += `&cropSize=${maxSize}`;
            }
            return result;
        }
        PrepareForContent() {
            const keys = Object.keys(this);
            for (const key of keys) {
                if (typeof this[key] == "object" &&
                    this[key] instanceof Texture) {
                    if (this[key].fileName == "" ||
                        this[key].fileName == null) {
                        delete this[key];
                        continue;
                    }
                    delete this[key].resolution;
                }
                if (this[key] == null)
                    delete this[key];
            }
        }
        GenerateInternal() {
            let maxMaterialResolution = 0;
            for (let t of this.GetAllTextures()) {
                if (t.resolution == null)
                    t.resolution = new math_1.Vector2(this.maxResolution, this.maxResolution);
                if (t.resolution.x > maxMaterialResolution)
                    maxMaterialResolution = t.resolution.x;
            }
            let aspect = 1;
            if (maxMaterialResolution > this.maxResolution)
                aspect = this.maxResolution / maxMaterialResolution;
            for (let t of this.GetAllTextures()) {
                t.resolution = t.resolution.mult(aspect);
                if (t.fileName != null && t.fileName != "")
                    t.fileName = this.GetDirectTextureLink(t.fileName, t.resolution.x, this.isDetailed);
                if (this.isDetailed)
                    t.realSize = new math_1.Vector2(t.realSize).mult(aspect);
            }
            if (this.isDetailed)
                this.realSize = this.realSize.mult(aspect);
            this.PrepareForContent();
        }
        static GetFromTemplate(template) {
            return __awaiter(this, void 0, void 0, function* () {
                let guid = "";
                switch (template) {
                    case MaterialTemplate.NONE:
                        return new Material();
                    case MaterialTemplate.TILE:
                        guid = "ca413a2e-a948-430b-a6e6-54f489595128";
                        break;
                    case MaterialTemplate.WALLPAPER:
                        guid = "712da9b3-6414-4a08-9293-a2d568f7a43c";
                        break;
                    case MaterialTemplate.PLASTER:
                        guid = "c4b323d0-ca53-42d1-a8ec-b34d274b47fb";
                        break;
                    case MaterialTemplate.WOOD:
                        guid = "f449c695-5d32-430e-8819-0f8cb08da0c7";
                        break;
                    case MaterialTemplate.CLOTH:
                        guid = "2999715f-dabc-4021-ba83-f7d307769c67";
                        break;
                    default:
                        logger_1.Logger.Log("Unknown material template", DebugLevel.ERROR);
                        return new Material();
                }
                return yield Material.GetByDirectLink("s123mat://" + guid);
            });
        }
        static CreateMaterial(name_1, template_1, diffuse_file_1, resolution_1) {
            return __awaiter(this, arguments, void 0, function* (name, template, diffuse_file, resolution, real_size = new math_1.Vector2(1, 1), callback) {
                const result = yield Material.GetFromTemplate(template);
                result.diffuse.fileName = diffuse_file;
                result.diffuse.realSize = real_size;
                result.diffuse.resolution = new math_1.Vector2(resolution);
                result.guid = "";
                result.name = name;
                if (callback != null)
                    callback(result);
                return result;
            });
        }
    }
    Material.DefaultMaterial = new Material();
    Material.cachedMaterials = {};
    MaterialCore.Material = Material;
})(MaterialCore || (exports.MaterialCore = MaterialCore = {}));


/***/ }),

/***/ "./src/math.ts":
/*!*********************!*\
  !*** ./src/math.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Random = exports.Plane = exports.Ray = exports.Bounds = exports.TransformFactory = exports.Quaternion = exports.Matrix4x4 = exports.Vector3 = exports.Vector2 = void 0;
const changeable_1 = __webpack_require__(/*! ./Core/changeable */ "./src/Core/changeable.ts");
const utils_1 = __webpack_require__(/*! ./Project/utils */ "./src/Project/utils.ts");
class Vector2 extends changeable_1.Changeable {
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    constructor(...args) {
        super();
        this.x = 0;
        this.y = 0;
        if (args.length == 1) {
            const vector_obj = args[0];
            if (!("x" in vector_obj) || !("y" in vector_obj))
                throw new TypeError("Trying to create Vector3 from unsupported object");
            this.UpdateFrom(vector_obj);
            return;
        }
        else if (args.length == 2) {
            if (args[0] == null || args[1] == null)
                throw new TypeError("Trying to set null value for Vector2 property");
            this.x = args[0];
            this.y = args[1];
            return;
        }
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mult(n) {
        if (n instanceof Vector2)
            return new Vector2(this.x * n.x, this.y * n.y);
        return new Vector2(this.x * n, this.y * n);
    }
    div(n) {
        if (n instanceof Vector2)
            return new Vector2(this.x / n.x, this.y / n.y);
        return new Vector2(this.x / n, this.y / n);
    }
    rotate(angle) {
        const sin = Math.sin((angle / 180) * Math.PI);
        const cos = Math.cos((angle / 180) * Math.PI);
        return new Vector2(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
    }
    setX(x) {
        return new Vector2(x, this.y);
    }
    setY(y) {
        return new Vector2(this.x, y);
    }
    static scale(v1, v2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }
    static distance(v1, v2) {
        const dv = v2.sub(v1);
        return dv.length;
    }
    static lerp(from, to, t) {
        if (t < 0)
            t = 0;
        if (t > 1)
            t = 1;
        return new Vector2(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
    }
    isFinite() {
        return Number.isFinite(this.x) && Number.isFinite(this.y);
    }
    isNaN() {
        return isNaN(this.x) || isNaN(this.y);
    }
}
exports.Vector2 = Vector2;
class Vector3 extends changeable_1.Changeable {
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    get normalized() {
        return this.div(this.length);
    }
    constructor(...args) {
        super();
        if (args.length == 1) {
            const vector_obj = args[0];
            if (vector_obj instanceof Vector2) {
                this.x = vector_obj.x;
                this.y = vector_obj.y;
                this.z = 0;
                return;
            }
            else {
                if (!("x" in vector_obj) ||
                    !("y" in vector_obj) ||
                    !("z" in vector_obj))
                    throw new TypeError("Trying to create Vector3 from unsupported object");
                this.x = vector_obj.x;
                this.y = vector_obj.y;
                this.z = vector_obj.z;
                return;
            }
        }
        else if (args.length == 3) {
            if (args[0] == null || args[1] == null || args[2] == null)
                throw new TypeError("Trying to set null value for Vector3 property");
            this.x = args[0];
            this.y = args[1];
            this.z = args[2];
            return;
        }
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    normalizeAngles() {
        const result = new Vector3();
        result.x = Vector3.normalizeAngle(this.x);
        result.y = Vector3.normalizeAngle(this.y);
        result.z = Vector3.normalizeAngle(this.z);
        return result;
    }
    static normalizeAngle(angle) {
        while (angle > 360)
            angle -= 360;
        while (angle < 0)
            angle += 360;
        return angle;
    }
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    div(n) {
        if (n instanceof Vector3)
            return new Vector3(this.x / n.x, this.y / n.y, this.z / n.z);
        return new Vector3(this.x / n, this.y / n, this.z / n);
    }
    mult(n) {
        return new Vector3(this.x * n, this.y * n, this.z * n);
    }
    inversed() {
        return new Vector3(-this.x, -this.y, -this.z);
    }
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
    abs() {
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    isZero() {
        return this.x === 0 && this.y === 0 && this.z === 0;
    }
    isFinite() {
        return (Number.isFinite(this.x) &&
            Number.isFinite(this.y) &&
            Number.isFinite(this.z));
    }
    isNaN() {
        return isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
    }
    invertX() {
        return new Vector3(-this.x, this.y, this.z);
    }
    invertY() {
        return new Vector3(this.x, -this.y, this.z);
    }
    invertZ() {
        return new Vector3(this.x, this.y, -this.z);
    }
    toRH() {
        return this.invertX();
    }
    setX(x) {
        return new Vector3(x, this.y, this.z);
    }
    setY(y) {
        return new Vector3(this.x, y, this.z);
    }
    setZ(z) {
        return new Vector3(this.x, this.y, z);
    }
    addX(x) {
        return new Vector3(this.x + x, this.y, this.z);
    }
    addY(y) {
        return new Vector3(this.x, this.y + y, this.z);
    }
    addZ(z) {
        return new Vector3(this.x, this.y, this.z + z);
    }
    static get one() {
        return new Vector3(1, 1, 1);
    }
    static cross(lhs, rhs) {
        return new Vector3(lhs.y * rhs.z - lhs.z * rhs.y, lhs.z * rhs.x - lhs.x * rhs.z, lhs.x * rhs.y - lhs.y * rhs.x);
    }
    static dot(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
    }
    static scale(v1, v2) {
        return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }
    static clamp(value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }
    static angle(from, to) {
        const num = Math.sqrt(from.length * from.length * to.length * to.length);
        return num < 1.0000000036274937e-15
            ? 0.0
            : Math.acos(Vector3.clamp(Vector3.dot(from, to) / num, -1, 1)) *
                57.29578;
    }
    static distance(from, to) {
        const num1 = from.x - to.x;
        const num2 = from.y - to.y;
        const num3 = from.z - to.z;
        return Math.sqrt(num1 * num1 + num2 * num2 + num3 * num3);
    }
    static lerp(from, to, t) {
        if (t < 0)
            t = 0;
        if (t > 1)
            t = 1;
        return new Vector3(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t);
    }
    xy() {
        return new Vector2(this.x, this.y);
    }
    xz() {
        return new Vector2(this.x, this.z);
    }
    zy() {
        return new Vector2(this.z, this.y);
    }
}
exports.Vector3 = Vector3;
class Matrix4x4 extends changeable_1.Changeable {
    constructor() {
        super();
        this[0] = [1, 0, 0, 0];
        this[1] = [0, 1, 0, 0];
        this[2] = [0, 0, 1, 0];
        this[3] = [0, 0, 0, 1];
    }
    mult(v) {
        const res = new Vector3();
        res.x = this[0][0] * v.x + this[0][1] * v.y + this[0][2] * v.z;
        res.y = this[1][0] * v.x + this[1][1] * v.y + this[1][2] * v.z;
        res.z = this[2][0] * v.x + this[2][1] * v.y + this[2][2] * v.z;
        return res;
    }
}
exports.Matrix4x4 = Matrix4x4;
class Quaternion extends changeable_1.Changeable {
    constructor(...args) {
        super();
        if (args.length == 1) {
            const quat_obj = args[0];
            if (!("x" in quat_obj) ||
                !("y" in quat_obj) ||
                !("z" in quat_obj) ||
                !("w" in quat_obj))
                throw new TypeError("Trying to create Quaternion from unsupported object");
            this.x = quat_obj.x;
            this.y = quat_obj.y;
            this.z = quat_obj.z;
            this.w = quat_obj.w;
            return;
        }
        else if (args.length == 4) {
            this.x = args[0];
            this.y = args[1];
            this.z = args[2];
            this.w = args[3];
            return;
        }
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
    }
    mult(q) {
        const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        const y = this.w * q.y + this.y * q.w + this.z * q.x - this.x * q.z;
        const z = this.w * q.z + this.z * q.w + this.x * q.y - this.y * q.x;
        const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
        return new Quaternion(x, y, z, w);
    }
    equals(v) {
        return (this.x === v.x && this.y === v.y && this.z === v.z && this.w == v.w);
    }
    inversed() {
        const ls = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        const invNorm = 1.0 / ls;
        const x = -this.x * invNorm;
        const y = -this.y * invNorm;
        const z = -this.z * invNorm;
        const w = this.w * invNorm;
        return new Quaternion(x, y, z, w);
    }
    get eulerAngles() {
        const rad2deg = 180.0 / Math.PI;
        const sqw = this.w * this.w;
        const sqx = this.x * this.x;
        const sqy = this.y * this.y;
        const sqz = this.z * this.z;
        const unit = sqx + sqy + sqz + sqw; // if normalised is one, otherwise is correction factor
        const test = this.x * this.w - this.y * this.z;
        let v = new Vector3();
        if (test > 0.4995 * unit) {
            // singularity at north pole
            v.y = 2 * Math.atan2(this.y, this.x);
            v.x = Math.PI / 2;
            v.z = 0;
            return v.mult(rad2deg).normalizeAngles();
        }
        if (test < -0.4995 * unit) {
            // singularity at south pole
            v.y = -2 * Math.atan2(this.y, this.x);
            v.x = -Math.PI / 2;
            v.z = 0;
            return v.mult(rad2deg).normalizeAngles();
        }
        v.y = Math.atan2(2 * this.x * this.w + 2 * this.y * this.z, 1 - 2 * (this.z * this.z + this.w * this.w)); // Yaw
        v.x = Math.asin(2 * (this.x * this.z - this.w * this.y)); // Pitch
        v.z = Math.atan2(2 * this.x * this.y + 2 * this.z * this.w, 1 - 2 * (this.y * this.y + this.z * this.z)); // Roll
        return v.mult(rad2deg).normalizeAngles();
    }
    toRH() {
        return new Quaternion(this.x, -this.y, -this.z, this.w);
    }
    static euler(_x, _y, _z) {
        const yaw = (_y / 180) * Math.PI;
        const pitch = (_x / 180) * Math.PI;
        const roll = (_z / 180) * Math.PI;
        const rollOver2 = roll * 0.5;
        const sinRollOver2 = Math.sin(rollOver2);
        const cosRollOver2 = Math.cos(rollOver2);
        const pitchOver2 = pitch * 0.5;
        const sinPitchOver2 = Math.sin(pitchOver2);
        const cosPitchOver2 = Math.cos(pitchOver2);
        const yawOver2 = yaw * 0.5;
        const sinYawOver2 = Math.sin(yawOver2);
        const cosYawOver2 = Math.cos(yawOver2);
        const w = cosYawOver2 * cosPitchOver2 * cosRollOver2 +
            sinYawOver2 * sinPitchOver2 * sinRollOver2;
        const x = cosYawOver2 * sinPitchOver2 * cosRollOver2 +
            sinYawOver2 * cosPitchOver2 * sinRollOver2;
        const y = sinYawOver2 * cosPitchOver2 * cosRollOver2 -
            cosYawOver2 * sinPitchOver2 * sinRollOver2;
        const z = cosYawOver2 * cosPitchOver2 * sinRollOver2 -
            sinYawOver2 * sinPitchOver2 * cosRollOver2;
        return new Quaternion(x, y, z, w);
    }
    static lookRotation(_forward, up) {
        const vector = _forward.normalized;
        const vector2 = Vector3.cross(up, vector).normalized;
        const vector3 = Vector3.cross(vector, vector2);
        const m00 = vector2.x;
        const m01 = vector2.y;
        const m02 = vector2.z;
        const m10 = vector3.x;
        const m11 = vector3.y;
        const m12 = vector3.z;
        const m20 = vector.x;
        const m21 = vector.y;
        const m22 = vector.z;
        const num8 = m00 + m11 + m22;
        const quaternion = new Quaternion(0, 0, 0, 1);
        if (num8 > 0) {
            let num = Math.sqrt(num8 + 1);
            quaternion.w = num * 0.5;
            num = 0.5 / num;
            quaternion.x = (m12 - m21) * num;
            quaternion.y = (m20 - m02) * num;
            quaternion.z = (m01 - m10) * num;
            return quaternion;
        }
        if (m00 >= m11 && m00 >= m22) {
            const num7 = Math.sqrt(1 + m00 - m11 - m22);
            const num4 = 0.5 / num7;
            quaternion.x = 0.5 * num7;
            quaternion.y = (m01 + m10) * num4;
            quaternion.z = (m02 + m20) * num4;
            quaternion.w = (m12 - m21) * num4;
            return quaternion;
        }
        if (m11 > m22) {
            const num6 = Math.sqrt(1 + m11 - m00 - m22);
            const num3 = 0.5 / num6;
            quaternion.x = (m10 + m01) * num3;
            quaternion.y = 0.5 * num6;
            quaternion.z = (m21 + m12) * num3;
            quaternion.w = (m20 - m02) * num3;
            return quaternion;
        }
        const num5 = Math.sqrt(1 + m22 - m00 - m11);
        const num2 = 0.5 / num5;
        quaternion.x = (m20 + m02) * num2;
        quaternion.y = (m21 + m12) * num2;
        quaternion.z = 0.5 * num5;
        quaternion.w = (m01 - m10) * num2;
        return quaternion;
    }
    rotate(vec) {
        const num = this.x * 2;
        const num2 = this.y * 2;
        const num3 = this.z * 2;
        const num4 = this.x * num;
        const num5 = this.y * num2;
        const num6 = this.z * num3;
        const num7 = this.x * num2;
        const num8 = this.x * num3;
        const num9 = this.y * num3;
        const num10 = this.w * num;
        const num11 = this.w * num2;
        const num12 = this.w * num3;
        const result = {
            x: (1 - (num5 + num6)) * vec.x +
                (num7 - num12) * vec.y +
                (num8 + num11) * vec.z,
            y: (num7 + num12) * vec.x +
                (1 - (num4 + num6)) * vec.y +
                (num9 - num10) * vec.z,
            z: (num8 - num11) * vec.x +
                (num9 + num10) * vec.y +
                (1 - (num4 + num5)) * vec.z,
        };
        return new Vector3(result);
    }
}
exports.Quaternion = Quaternion;
class TransformFactory {
    static CreateNew() {
        return {
            position: new Vector3(),
            rotation: new Quaternion(),
            scale: new Vector3(1, 1, 1),
        };
    }
    static Create(raw) {
        return {
            position: raw[(0, utils_1.nameof)("position")]
                ? new Vector3(raw[(0, utils_1.nameof)("position")])
                : new Vector3(),
            rotation: raw[(0, utils_1.nameof)("rotation")]
                ? new Quaternion(raw[(0, utils_1.nameof)("rotation")])
                : new Quaternion(),
            scale: raw[(0, utils_1.nameof)("scale")]
                ? new Vector3(raw[(0, utils_1.nameof)("scale")])
                : new Vector3(1, 1, 1),
        };
    }
}
exports.TransformFactory = TransformFactory;
class Bounds extends changeable_1.Changeable {
    get center() {
        return this.min.add(this.size.div(2.0));
    }
    get size() {
        return this.max.sub(this.min);
    }
    constructor(...args) {
        super();
        if (args.length == 0) {
            this.min = new Vector3();
            this.max = new Vector3();
            return;
        }
        this.min = args[0];
        this.max = args[1];
    }
    static default() {
        return new Bounds(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    }
    static fromCenterAndSize(center, size) {
        return new Bounds(center.sub(size.div(2.0)), center.add(size.div(2.0)));
    }
    encapsulate(b) {
        this.min.x = Math.min(this.min.x, b.min.x);
        this.min.y = Math.min(this.min.y, b.min.y);
        this.min.z = Math.min(this.min.z, b.min.z);
        this.max.x = Math.max(this.max.x, b.max.x);
        this.max.y = Math.max(this.max.y, b.max.y);
        this.max.z = Math.max(this.max.z, b.max.z);
    }
}
exports.Bounds = Bounds;
class Ray {
    constructor(...args) {
        if (args.length == 0) {
            this.origin = new Vector3();
            this.direction = new Vector3();
            return;
        }
        this.origin = args[0];
        this.direction = args[1].normalized;
    }
    GetPoint(h) {
        return this.origin.add(this.direction.mult(h));
    }
}
exports.Ray = Ray;
class Plane {
    constructor(...args) {
        if (args.length == 0) {
            this.normal = new Vector3();
            this.distance = 0;
            return;
        }
        this.normal = args[0];
        this.distance = args[1];
    }
    raycast(ray) {
        let result = {};
        const a = Vector3.dot(ray.direction, this.normal);
        const num = -Vector3.dot(ray.origin, this.normal) - this.distance;
        if (Math.abs(a) < 0.0001) {
            result.enter = 0;
            result.result = false;
            return result;
        }
        result.enter = num / a;
        result.result = result.enter > 0;
        return result;
    }
    getSide(point) {
        return Vector3.dot(this.normal, point) + this.distance > 0;
    }
    static fromPoint(normal, point) {
        const p = new Plane();
        p.normal = normal.normalized;
        p.distance = -Vector3.dot(p.normal, point);
        return p;
    }
}
exports.Plane = Plane;
class Random {
    constructor(seed) {
        this.seed = seed;
    }
    next() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
}
exports.Random = Random;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.iterateAsync = exports.safeStringify = exports.GetHash = exports.CreateUUID = void 0;
exports.arraysMatchUnorderedBy = arraysMatchUnorderedBy;
const CreateUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
exports.CreateUUID = CreateUUID;
const GetHash = function (s) {
    let hash = 0, i, chr;
    if (s.length === 0)
        return hash;
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};
exports.GetHash = GetHash;
let safeStringify = function (obj, indent = 0) {
    let cache = [];
    const retVal = JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value != null && cache.includes(value))
            return undefined;
        cache.push(value);
        return value;
    }, indent);
    cache = [];
    return retVal;
};
exports.safeStringify = safeStringify;
let iterateAsync = function (array, cb, platform) {
    return __awaiter(this, void 0, void 0, function* () {
        if (platform == "web") {
            yield Promise.all(array.map(cb));
        }
        else {
            for (const element of array) {
                yield cb(element);
            }
        }
    });
};
exports.iterateAsync = iterateAsync;
function arraysMatchUnorderedBy(arr1, arr2, predicate) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    const used = new Set();
    for (const a of arr1) {
        let found = false;
        for (let i = 0; i < arr2.length; i++) {
            if (used.has(i))
                continue;
            if (predicate(a, arr2[i])) {
                used.add(i);
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=s123_core.js.map