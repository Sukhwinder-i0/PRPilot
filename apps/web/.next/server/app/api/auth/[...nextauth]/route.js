"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_alwyn_dev_PRPilot_apps_web_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/home/alwyn/dev/PRPilot/apps/web/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _home_alwyn_dev_PRPilot_apps_web_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL25leHRAMTQuMi4xOF9yZWFjdC1kb21AMTguMy4xX3JlYWN0QDE4LjMuMV9fcmVhY3RAMTguMy4xL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtYXBwLWxvYWRlci5qcz9uYW1lPWFwcCUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUudHMmYXBwRGlyPSUyRmhvbWUlMkZhbHd5biUyRmRldiUyRlBSUGlsb3QlMkZhcHBzJTJGd2ViJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGYWx3eW4lMkZkZXYlMkZQUlBpbG90JTJGYXBwcyUyRndlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDb0I7QUFDakc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvPzBlY2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvYWx3eW4vZGV2L1BSUGlsb3QvYXBwcy93ZWIvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvYWx3eW4vZGV2L1BSUGlsb3QvYXBwcy93ZWIvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/../../node_modules/.pnpm/next-auth@4.24.13_next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_github__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/github */ \"(rsc)/../../node_modules/.pnpm/next-auth@4.24.13_next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next-auth/providers/github.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n// TODO: encrypt accessToken before storing in database\n// TODO: add session refresh logic for expired GitHub tokens\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_github__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GITHUB_CLIENT_ID ?? \"\",\n            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? \"\",\n            authorization: {\n                params: {\n                    scope: \"read:user user:email repo\"\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            if (!account || !profile) return false;\n            const githubProfile = profile;\n            if (!githubProfile.id || !githubProfile.login) return false;\n            await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.upsert({\n                where: {\n                    githubId: String(githubProfile.id)\n                },\n                update: {\n                    username: githubProfile.login,\n                    email: user.email ?? null,\n                    avatarUrl: githubProfile.avatar_url ?? null,\n                    accessToken: account.access_token ?? \"\"\n                },\n                create: {\n                    githubId: String(githubProfile.id),\n                    username: githubProfile.login,\n                    email: user.email ?? null,\n                    avatarUrl: githubProfile.avatar_url ?? null,\n                    accessToken: account.access_token ?? \"\"\n                }\n            });\n            return true;\n        },\n        async session ({ session, token }) {\n            if (token.sub) {\n                const dbUser = await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        githubId: token.sub\n                    }\n                });\n                if (dbUser) {\n                    session.userId = dbUser.id;\n                    session.username = dbUser.username;\n                    session.avatarUrl = dbUser.avatarUrl;\n                }\n            }\n            return session;\n        },\n        async jwt ({ token, profile }) {\n            if (profile) {\n                const githubProfile = profile;\n                if (githubProfile.id) {\n                    token.sub = String(githubProfile.id);\n                }\n            }\n            return token;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDd0Q7QUFDdEI7QUFFbEMsdURBQXVEO0FBQ3ZELDREQUE0RDtBQUVyRCxNQUFNRSxjQUErQjtJQUN4Q0MsV0FBVztRQUNQSCxzRUFBY0EsQ0FBQztZQUNYSSxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO1lBQzFDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLG9CQUFvQixJQUFJO1lBQ2xEQyxlQUFlO2dCQUNYQyxRQUFRO29CQUNKQyxPQUFPO2dCQUNYO1lBQ0o7UUFDSjtLQUNIO0lBQ0RDLFdBQVc7UUFDUCxNQUFNQyxRQUFPLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxDQUFDRCxXQUFXLENBQUNDLFNBQVMsT0FBTztZQUVqQyxNQUFNQyxnQkFBZ0JEO1lBTXRCLElBQUksQ0FBQ0MsY0FBY0MsRUFBRSxJQUFJLENBQUNELGNBQWNFLEtBQUssRUFBRSxPQUFPO1lBRXRELE1BQU1uQiwyQ0FBTUEsQ0FBQ2MsSUFBSSxDQUFDTSxNQUFNLENBQUM7Z0JBQ3JCQyxPQUFPO29CQUFFQyxVQUFVQyxPQUFPTixjQUFjQyxFQUFFO2dCQUFFO2dCQUM1Q00sUUFBUTtvQkFDSkMsVUFBVVIsY0FBY0UsS0FBSztvQkFDN0JPLE9BQU9aLEtBQUtZLEtBQUssSUFBSTtvQkFDckJDLFdBQVdWLGNBQWNXLFVBQVUsSUFBSTtvQkFDdkNDLGFBQWFkLFFBQVFlLFlBQVksSUFBSTtnQkFDekM7Z0JBQ0FDLFFBQVE7b0JBQ0pULFVBQVVDLE9BQU9OLGNBQWNDLEVBQUU7b0JBQ2pDTyxVQUFVUixjQUFjRSxLQUFLO29CQUM3Qk8sT0FBT1osS0FBS1ksS0FBSyxJQUFJO29CQUNyQkMsV0FBV1YsY0FBY1csVUFBVSxJQUFJO29CQUN2Q0MsYUFBYWQsUUFBUWUsWUFBWSxJQUFJO2dCQUN6QztZQUNKO1lBRUEsT0FBTztRQUNYO1FBQ0EsTUFBTUUsU0FBUSxFQUFFQSxPQUFPLEVBQUVDLEtBQUssRUFBRTtZQUM1QixJQUFJQSxNQUFNQyxHQUFHLEVBQUU7Z0JBQ1gsTUFBTUMsU0FBUyxNQUFNbkMsMkNBQU1BLENBQUNjLElBQUksQ0FBQ3NCLFVBQVUsQ0FBQztvQkFDeENmLE9BQU87d0JBQUVDLFVBQVVXLE1BQU1DLEdBQUc7b0JBQUM7Z0JBQ2pDO2dCQUNBLElBQUlDLFFBQVE7b0JBQ1BILFFBQThCSyxNQUFNLEdBQUdGLE9BQU9qQixFQUFFO29CQUNoRGMsUUFBOEJQLFFBQVEsR0FBR1UsT0FBT1YsUUFBUTtvQkFDeERPLFFBQThCTCxTQUFTLEdBQUdRLE9BQU9SLFNBQVM7Z0JBQy9EO1lBQ0o7WUFDQSxPQUFPSztRQUNYO1FBQ0EsTUFBTU0sS0FBSSxFQUFFTCxLQUFLLEVBQUVqQixPQUFPLEVBQUU7WUFDeEIsSUFBSUEsU0FBUztnQkFDVCxNQUFNQyxnQkFBZ0JEO2dCQUN0QixJQUFJQyxjQUFjQyxFQUFFLEVBQUU7b0JBQ2xCZSxNQUFNQyxHQUFHLEdBQUdYLE9BQU9OLGNBQWNDLEVBQUU7Z0JBQ3ZDO1lBQ0o7WUFDQSxPQUFPZTtRQUNYO0lBQ0o7SUFDQU0sUUFBUW5DLFFBQVFDLEdBQUcsQ0FBQ21DLGVBQWU7QUFDdkMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgR2l0SHViUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZ2l0aHViXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi9wcmlzbWFcIjtcblxuLy8gVE9ETzogZW5jcnlwdCBhY2Nlc3NUb2tlbiBiZWZvcmUgc3RvcmluZyBpbiBkYXRhYmFzZVxuLy8gVE9ETzogYWRkIHNlc3Npb24gcmVmcmVzaCBsb2dpYyBmb3IgZXhwaXJlZCBHaXRIdWIgdG9rZW5zXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBHaXRIdWJQcm92aWRlcih7XG4gICAgICAgICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9JRCA/PyBcIlwiLFxuICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX1NFQ1JFVCA/PyBcIlwiLFxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBzY29wZTogXCJyZWFkOnVzZXIgdXNlcjplbWFpbCByZXBvXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQsIHByb2ZpbGUgfSkge1xuICAgICAgICAgICAgaWYgKCFhY2NvdW50IHx8ICFwcm9maWxlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IGdpdGh1YlByb2ZpbGUgPSBwcm9maWxlIGFzIHtcbiAgICAgICAgICAgICAgICBpZD86IG51bWJlcjtcbiAgICAgICAgICAgICAgICBsb2dpbj86IHN0cmluZztcbiAgICAgICAgICAgICAgICBhdmF0YXJfdXJsPzogc3RyaW5nO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFnaXRodWJQcm9maWxlLmlkIHx8ICFnaXRodWJQcm9maWxlLmxvZ2luKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwc2VydCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgZ2l0aHViSWQ6IFN0cmluZyhnaXRodWJQcm9maWxlLmlkKSB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogZ2l0aHViUHJvZmlsZS5sb2dpbixcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwgPz8gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiBnaXRodWJQcm9maWxlLmF2YXRhcl91cmwgPz8gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjY291bnQuYWNjZXNzX3Rva2VuID8/IFwiXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZ2l0aHViSWQ6IFN0cmluZyhnaXRodWJQcm9maWxlLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGdpdGh1YlByb2ZpbGUubG9naW4sXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsID8/IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDogZ2l0aHViUHJvZmlsZS5hdmF0YXJfdXJsID8/IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiBhY2NvdW50LmFjY2Vzc190b2tlbiA/PyBcIlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICAgICAgICBpZiAodG9rZW4uc3ViKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGJVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGdpdGh1YklkOiB0b2tlbi5zdWIgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZGJVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIChzZXNzaW9uIGFzIFNlc3Npb25XaXRoVXNlcklkKS51c2VySWQgPSBkYlVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgICAgIChzZXNzaW9uIGFzIFNlc3Npb25XaXRoVXNlcklkKS51c2VybmFtZSA9IGRiVXNlci51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgKHNlc3Npb24gYXMgU2Vzc2lvbldpdGhVc2VySWQpLmF2YXRhclVybCA9IGRiVXNlci5hdmF0YXJVcmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGp3dCh7IHRva2VuLCBwcm9maWxlIH0pIHtcbiAgICAgICAgICAgIGlmIChwcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2l0aHViUHJvZmlsZSA9IHByb2ZpbGUgYXMgeyBpZD86IG51bWJlciB9O1xuICAgICAgICAgICAgICAgIGlmIChnaXRodWJQcm9maWxlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuLnN1YiA9IFN0cmluZyhnaXRodWJQcm9maWxlLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbldpdGhVc2VySWQge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHVzZXJuYW1lPzogc3RyaW5nO1xuICAgIGF2YXRhclVybD86IHN0cmluZyB8IG51bGw7XG4gICAgdXNlcj86IHtcbiAgICAgICAgbmFtZT86IHN0cmluZyB8IG51bGw7XG4gICAgICAgIGVtYWlsPzogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgaW1hZ2U/OiBzdHJpbmcgfCBudWxsO1xuICAgIH07XG4gICAgZXhwaXJlczogc3RyaW5nO1xufVxuIl0sIm5hbWVzIjpbIkdpdEh1YlByb3ZpZGVyIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHSVRIVUJfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR0lUSFVCX0NMSUVOVF9TRUNSRVQiLCJhdXRob3JpemF0aW9uIiwicGFyYW1zIiwic2NvcGUiLCJjYWxsYmFja3MiLCJzaWduSW4iLCJ1c2VyIiwiYWNjb3VudCIsInByb2ZpbGUiLCJnaXRodWJQcm9maWxlIiwiaWQiLCJsb2dpbiIsInVwc2VydCIsIndoZXJlIiwiZ2l0aHViSWQiLCJTdHJpbmciLCJ1cGRhdGUiLCJ1c2VybmFtZSIsImVtYWlsIiwiYXZhdGFyVXJsIiwiYXZhdGFyX3VybCIsImFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwiY3JlYXRlIiwic2Vzc2lvbiIsInRva2VuIiwic3ViIiwiZGJVc2VyIiwiZmluZFVuaXF1ZSIsInVzZXJJZCIsImp3dCIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// TODO: add query logging in development\n// TODO: add connection pooling for production (e.g. Prisma Accelerate or PgBouncer)\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5Qyx5Q0FBeUM7QUFDekMsb0ZBQW9GO0FBRXBGLE1BQU1DLGtCQUFrQkM7QUFJakIsTUFBTUMsU0FBU0YsZ0JBQWdCRSxNQUFNLElBQUksSUFBSUgsd0RBQVlBLEdBQUc7QUFFbkUsSUFBSUksSUFBcUMsRUFBRTtJQUN2Q0gsZ0JBQWdCRSxNQUFNLEdBQUdBO0FBQzdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG4vLyBUT0RPOiBhZGQgcXVlcnkgbG9nZ2luZyBpbiBkZXZlbG9wbWVudFxuLy8gVE9ETzogYWRkIGNvbm5lY3Rpb24gcG9vbGluZyBmb3IgcHJvZHVjdGlvbiAoZS5nLiBQcmlzbWEgQWNjZWxlcmF0ZSBvciBQZ0JvdW5jZXIpXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gICAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xufVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/next-auth@4.24.13_next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/jose@4.15.9","vendor-chunks/openid-client@5.7.1","vendor-chunks/@babel+runtime@7.29.2","vendor-chunks/oauth@0.9.15","vendor-chunks/object-hash@2.2.0","vendor-chunks/preact@10.29.0","vendor-chunks/uuid@8.3.2","vendor-chunks/yallist@4.0.0","vendor-chunks/preact-render-to-string@5.2.6_preact@10.29.0","vendor-chunks/lru-cache@6.0.0","vendor-chunks/cookie@0.7.2","vendor-chunks/oidc-token-hash@5.2.0","vendor-chunks/@panva+hkdf@1.2.1"], () => (__webpack_exec__("(rsc)/../../node_modules/.pnpm/next@14.2.18_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Falwyn%2Fdev%2FPRPilot%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();