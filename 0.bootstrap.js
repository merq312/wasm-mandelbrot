(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_mandelbrot.js":
/*!*********************************!*\
  !*** ../pkg/wasm_mandelbrot.js ***!
  \*********************************/
/*! exports provided: Mandelbrot, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_mandelbrot_bg.wasm */ \"../pkg/wasm_mandelbrot_bg.wasm\");\n/* harmony import */ var _wasm_mandelbrot_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasm_mandelbrot_bg.js */ \"../pkg/wasm_mandelbrot_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mandelbrot\", function() { return _wasm_mandelbrot_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Mandelbrot\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _wasm_mandelbrot_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_mandelbrot.js?");

/***/ }),

/***/ "../pkg/wasm_mandelbrot_bg.js":
/*!************************************!*\
  !*** ../pkg/wasm_mandelbrot_bg.js ***!
  \************************************/
/*! exports provided: Mandelbrot, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mandelbrot\", function() { return Mandelbrot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_mandelbrot_bg.wasm */ \"../pkg/wasm_mandelbrot_bg.wasm\");\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nlet cachegetUint32Memory0 = null;\nfunction getUint32Memory0() {\n    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory0 = new Uint32Array(_wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory0;\n}\n\nfunction getArrayU32FromWasm0(ptr, len) {\n    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);\n}\n/**\n*/\nclass Mandelbrot {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Mandelbrot.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_mandelbrot_free\"](ptr);\n    }\n    /**\n    * @param {number} width\n    * @param {number} height\n    * @returns {Mandelbrot}\n    */\n    static new(width, height) {\n        var ret = _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot_new\"](width, height);\n        return Mandelbrot.__wrap(ret);\n    }\n    /**\n    * @returns {Uint32Array}\n    */\n    get_hist() {\n        try {\n            const retptr = _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](-16);\n            _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot_get_hist\"](retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var v0 = getArrayU32FromWasm0(r0, r1).slice();\n            _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1 * 4);\n            return v0;\n        } finally {\n            _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](16);\n        }\n    }\n    /**\n    * @param {number} x1\n    * @param {number} y1\n    * @param {number} x2\n    * @param {number} y2\n    */\n    draw_fractal(x1, y1, x2, y2) {\n        _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot_draw_fractal\"](this.ptr, x1, y1, x2, y2);\n    }\n    /**\n    */\n    write_to_bitmap() {\n        _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot_write_to_bitmap\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    bitmap() {\n        var ret = _wasm_mandelbrot_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot_bitmap\"](this.ptr);\n        return ret;\n    }\n}\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/wasm_mandelbrot_bg.js?");

/***/ }),

/***/ "../pkg/wasm_mandelbrot_bg.wasm":
/*!**************************************!*\
  !*** ../pkg/wasm_mandelbrot_bg.wasm ***!
  \**************************************/
/*! exports provided: memory, __wbg_mandelbrot_free, mandelbrot_new, mandelbrot_get_hist, mandelbrot_draw_fractal, mandelbrot_write_to_bitmap, mandelbrot_bitmap, __wbindgen_add_to_stack_pointer, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_mandelbrot_bg.js */ \"../pkg/wasm_mandelbrot_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_mandelbrot_bg.wasm?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar wasm_mandelbrot_1 = __webpack_require__(/*! wasm-mandelbrot */ \"../pkg/wasm_mandelbrot.js\");\r\nvar wasm_mandelbrot_bg_wasm_1 = __webpack_require__(/*! wasm-mandelbrot/wasm_mandelbrot_bg.wasm */ \"../pkg/wasm_mandelbrot_bg.wasm\");\r\nvar WIDTH = 800;\r\nvar HEIGHT = 600;\r\nvar CoordinatePair = /** @class */ (function () {\r\n    function CoordinatePair(x1, y1, x2, y2) {\r\n        this.x1 = x1;\r\n        this.y1 = y1;\r\n        this.x2 = x2;\r\n        this.y2 = y2;\r\n    }\r\n    CoordinatePair.prototype.transform = function () {\r\n        this.x1 = (2.0 * this.x1) / HEIGHT - 1.6;\r\n        this.x2 = (2.0 * this.x2) / HEIGHT - 1.6;\r\n        this.y1 = (2.0 * this.y1) / HEIGHT - 0.4;\r\n        this.y2 = (2.0 * this.y2) / HEIGHT - 0.4;\r\n    };\r\n    return CoordinatePair;\r\n}());\r\n// ******************************************\r\nvar startGenerate = performance.now();\r\nvar m = wasm_mandelbrot_1.Mandelbrot.new(WIDTH, HEIGHT);\r\nvar c = new CoordinatePair(0, 0, WIDTH, HEIGHT);\r\nc.transform();\r\nm.draw_fractal(c.x1, c.y1, c.x2, c.y2);\r\nm.write_to_bitmap();\r\nvar endGenerate = performance.now();\r\n// ******************************************\r\nvar startDraw = performance.now();\r\nvar canvas = document.getElementById('canvas');\r\nvar ctx = canvas.getContext('2d');\r\nvar imageData = ctx.createImageData(WIDTH, HEIGHT);\r\nvar bitmapPtr = m.bitmap();\r\nvar bitmap = new Uint8Array(wasm_mandelbrot_bg_wasm_1.memory.buffer, bitmapPtr, WIDTH * HEIGHT * 4);\r\n// Iterate through every pixel\r\nfor (var i = 0; i < imageData.data.length; i += 4) {\r\n    imageData.data[i + 0] = 0;\r\n    imageData.data[i + 1] = bitmap[i + 1];\r\n    imageData.data[i + 2] = bitmap[i + 2];\r\n    imageData.data[i + 3] = 255;\r\n}\r\n// Draw image data to the canvas\r\nctx.putImageData(imageData, 0, 0);\r\nvar endDraw = performance.now();\r\n// ******************************************\r\nvar generate = document.getElementById('generate');\r\nvar draw = document.getElementById('draw');\r\ngenerate.textContent = \"Generation took \" + (endGenerate - startGenerate).toFixed(2) + \" milliseconds\";\r\ndraw.textContent = \"Drawing took \" + (endDraw - startDraw).toFixed(2) + \" milliseconds\";\r\n// Testing hist\r\n// const hist = m.get_hist();\r\n// let str: String = \"\";\r\n// hist.forEach((ea) => (str += ea.toString() + \", \"));\r\n// console.log(str);\r\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

}]);