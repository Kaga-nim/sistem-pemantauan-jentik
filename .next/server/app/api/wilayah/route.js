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
exports.id = "app/api/wilayah/route";
exports.ids = ["app/api/wilayah/route"];
exports.modules = {

/***/ "(rsc)/./app/api/wilayah/route.ts":
/*!**********************************!*\
  !*** ./app/api/wilayah/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n// GET — publik (untuk form warga)\nasync function GET() {\n    const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from(\"wilayah\").select(\"*\").order(\"nama\");\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 500\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n}\n// POST — admin only\nasync function POST(request) {\n    if (!await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.checkAdminAuth)(request)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const body = await request.json();\n    const { nama, deskripsi, lat, lng } = body;\n    if (!nama) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Nama wajib diisi\"\n    }, {\n        status: 400\n    });\n    const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from(\"wilayah\").insert({\n        nama,\n        deskripsi,\n        lat: lat || -6.2,\n        lng: lng || 106.8166\n    }).select().single();\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 500\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n        status: 201\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3dpbGF5YWgvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDZDtBQUNFO0FBRTVDLGtDQUFrQztBQUMzQixlQUFlRztJQUNwQixNQUFNLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTUosbURBQVFBLENBQ25DSyxJQUFJLENBQUMsV0FDTEMsTUFBTSxDQUFDLEtBQ1BDLEtBQUssQ0FBQztJQUVULElBQUlILE9BQU8sT0FBT0wscURBQVlBLENBQUNTLElBQUksQ0FBQztRQUFFSixPQUFPQSxNQUFNSyxPQUFPO0lBQUMsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFDNUUsT0FBT1gscURBQVlBLENBQUNTLElBQUksQ0FBQ0w7QUFDM0I7QUFFQSxvQkFBb0I7QUFDYixlQUFlUSxLQUFLQyxPQUFvQjtJQUM3QyxJQUFJLENBQUUsTUFBTVgseURBQWNBLENBQUNXLFVBQVc7UUFDcEMsT0FBT2IscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFSixPQUFPO1FBQWUsR0FBRztZQUFFTSxRQUFRO1FBQUk7SUFDcEU7SUFFQSxNQUFNRyxPQUFPLE1BQU1ELFFBQVFKLElBQUk7SUFDL0IsTUFBTSxFQUFFTSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUUsR0FBR0o7SUFFdEMsSUFBSSxDQUFDQyxNQUFNLE9BQU9mLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUosT0FBTztJQUFtQixHQUFHO1FBQUVNLFFBQVE7SUFBSTtJQUVqRixNQUFNLEVBQUVQLElBQUksRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTUosbURBQVFBLENBQ25DSyxJQUFJLENBQUMsV0FDTGEsTUFBTSxDQUFDO1FBQUVKO1FBQU1DO1FBQVdDLEtBQUtBLE9BQU8sQ0FBQztRQUFLQyxLQUFLQSxPQUFPO0lBQVMsR0FDakVYLE1BQU0sR0FDTmEsTUFBTTtJQUVULElBQUlmLE9BQU8sT0FBT0wscURBQVlBLENBQUNTLElBQUksQ0FBQztRQUFFSixPQUFPQSxNQUFNSyxPQUFPO0lBQUMsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFDNUUsT0FBT1gscURBQVlBLENBQUNTLElBQUksQ0FBQ0wsTUFBTTtRQUFFTyxRQUFRO0lBQUk7QUFDL0MiLCJzb3VyY2VzIjpbIkM6XFxsYXJhZ29uXFx3d3dcXGNsaWVudFxcZ2VzaXRcXGFwcFxcYXBpXFx3aWxheWFoXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZVwiO1xuaW1wb3J0IHsgY2hlY2tBZG1pbkF1dGggfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuXG4vLyBHRVQg4oCUIHB1YmxpayAodW50dWsgZm9ybSB3YXJnYSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJ3aWxheWFoXCIpXG4gICAgLnNlbGVjdChcIipcIilcbiAgICAub3JkZXIoXCJuYW1hXCIpO1xuXG4gIGlmIChlcnJvcikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpO1xufVxuXG4vLyBQT1NUIOKAlCBhZG1pbiBvbmx5XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICBpZiAoIShhd2FpdCBjaGVja0FkbWluQXV0aChyZXF1ZXN0KSkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG5cbiAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICBjb25zdCB7IG5hbWEsIGRlc2tyaXBzaSwgbGF0LCBsbmcgfSA9IGJvZHk7XG5cbiAgaWYgKCFuYW1hKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJOYW1hIHdhamliIGRpaXNpXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwid2lsYXlhaFwiKVxuICAgIC5pbnNlcnQoeyBuYW1hLCBkZXNrcmlwc2ksIGxhdDogbGF0IHx8IC02LjIsIGxuZzogbG5nIHx8IDEwNi44MTY2IH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEsIHsgc3RhdHVzOiAyMDEgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic3VwYWJhc2UiLCJjaGVja0FkbWluQXV0aCIsIkdFVCIsImRhdGEiLCJlcnJvciIsImZyb20iLCJzZWxlY3QiLCJvcmRlciIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwiUE9TVCIsInJlcXVlc3QiLCJib2R5IiwibmFtYSIsImRlc2tyaXBzaSIsImxhdCIsImxuZyIsImluc2VydCIsInNpbmdsZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/wilayah/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkAdminAuth: () => (/* binding */ checkAdminAuth),\n/* harmony export */   signAdminToken: () => (/* binding */ signAdminToken),\n/* harmony export */   verifyAdminToken: () => (/* binding */ verifyAdminToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n\nconst JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || \"fallback-secret-change-in-production-32c\");\nasync function signAdminToken() {\n    return new jose__WEBPACK_IMPORTED_MODULE_0__.SignJWT({\n        role: \"admin\"\n    }).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(\"7d\").sign(JWT_SECRET);\n}\nasync function verifyAdminToken(token) {\n    try {\n        await (0,jose__WEBPACK_IMPORTED_MODULE_1__.jwtVerify)(token, JWT_SECRET);\n        return true;\n    } catch  {\n        return false;\n    }\n}\nasync function checkAdminAuth(request) {\n    const token = request.cookies.get(\"admin_token\")?.value;\n    if (!token) return false;\n    return verifyAdminToken(token);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQztBQUcxQyxNQUFNRSxhQUFhLElBQUlDLGNBQWNDLE1BQU0sQ0FDekNDLFFBQVFDLEdBQUcsQ0FBQ0osVUFBVSxJQUFJO0FBR3JCLGVBQWVLO0lBQ3BCLE9BQU8sSUFBSU4seUNBQU9BLENBQUM7UUFBRU8sTUFBTTtJQUFRLEdBQ2hDQyxrQkFBa0IsQ0FBQztRQUFFQyxLQUFLO0lBQVEsR0FDbENDLFdBQVcsR0FDWEMsaUJBQWlCLENBQUMsTUFDbEJDLElBQUksQ0FBQ1g7QUFDVjtBQUVPLGVBQWVZLGlCQUFpQkMsS0FBYTtJQUNsRCxJQUFJO1FBQ0YsTUFBTWYsK0NBQVNBLENBQUNlLE9BQU9iO1FBQ3ZCLE9BQU87SUFDVCxFQUFFLE9BQU07UUFDTixPQUFPO0lBQ1Q7QUFDRjtBQUVPLGVBQWVjLGVBQWVDLE9BQW9CO0lBQ3ZELE1BQU1GLFFBQVFFLFFBQVFDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQkM7SUFDbEQsSUFBSSxDQUFDTCxPQUFPLE9BQU87SUFDbkIsT0FBT0QsaUJBQWlCQztBQUMxQiIsInNvdXJjZXMiOlsiQzpcXGxhcmFnb25cXHd3d1xcY2xpZW50XFxnZXNpdFxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGp3dFZlcmlmeSwgU2lnbkpXVCB9IGZyb20gXCJqb3NlXCI7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5jb25zdCBKV1RfU0VDUkVUID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8IFwiZmFsbGJhY2stc2VjcmV0LWNoYW5nZS1pbi1wcm9kdWN0aW9uLTMyY1wiXG4pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2lnbkFkbWluVG9rZW4oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBTaWduSldUKHsgcm9sZTogXCJhZG1pblwiIH0pXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogXCJIUzI1NlwiIH0pXG4gICAgLnNldElzc3VlZEF0KClcbiAgICAuc2V0RXhwaXJhdGlvblRpbWUoXCI3ZFwiKVxuICAgIC5zaWduKEpXVF9TRUNSRVQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5QWRtaW5Ub2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgand0VmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0FkbWluQXV0aChyZXF1ZXN0OiBOZXh0UmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCB0b2tlbiA9IHJlcXVlc3QuY29va2llcy5nZXQoXCJhZG1pbl90b2tlblwiKT8udmFsdWU7XG4gIGlmICghdG9rZW4pIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHZlcmlmeUFkbWluVG9rZW4odG9rZW4pO1xufVxuIl0sIm5hbWVzIjpbImp3dFZlcmlmeSIsIlNpZ25KV1QiLCJKV1RfU0VDUkVUIiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJwcm9jZXNzIiwiZW52Iiwic2lnbkFkbWluVG9rZW4iLCJyb2xlIiwic2V0UHJvdGVjdGVkSGVhZGVyIiwiYWxnIiwic2V0SXNzdWVkQXQiLCJzZXRFeHBpcmF0aW9uVGltZSIsInNpZ24iLCJ2ZXJpZnlBZG1pblRva2VuIiwidG9rZW4iLCJjaGVja0FkbWluQXV0aCIsInJlcXVlc3QiLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nconst supabaseUrl = process.env.SUPABASE_URL;\nconst supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0FBQzVDLE1BQU1DLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0cseUJBQXlCO0FBRWxELE1BQU1DLFdBQVdQLG1FQUFZQSxDQUFDQyxhQUFhSSxhQUFhIiwic291cmNlcyI6WyJDOlxcbGFyYWdvblxcd3d3XFxjbGllbnRcXGdlc2l0XFxsaWJcXHN1cGFiYXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkwhO1xuY29uc3Qgc3VwYWJhc2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZITtcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VLZXkiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwic3VwYWJhc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwilayah%2Froute&page=%2Fapi%2Fwilayah%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwilayah%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwilayah%2Froute&page=%2Fapi%2Fwilayah%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwilayah%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_laragon_www_client_gesit_app_api_wilayah_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/wilayah/route.ts */ \"(rsc)/./app/api/wilayah/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/wilayah/route\",\n        pathname: \"/api/wilayah\",\n        filename: \"route\",\n        bundlePath: \"app/api/wilayah/route\"\n    },\n    distDir: \".next\" || 0,\n    projectDir:  false || '',\n    resolvedPagePath: \"C:\\\\laragon\\\\www\\\\client\\\\gesit\\\\app\\\\api\\\\wilayah\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_laragon_www_client_gesit_app_api_wilayah_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ3aWxheWFoJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ3aWxheWFoJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGd2lsYXlhaCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q2NsaWVudCU1Q2dlc2l0JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q2NsaWVudCU1Q2dlc2l0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEJmlzR2xvYmFsTm90Rm91bmRFbmFibGVkPSEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDWTtBQUN6RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhLE9BQW9DLElBQUksQ0FBRTtBQUN2RCxnQkFBZ0IsTUFBdUM7QUFDdkQ7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXGxhcmFnb25cXFxcd3d3XFxcXGNsaWVudFxcXFxnZXNpdFxcXFxhcHBcXFxcYXBpXFxcXHdpbGF5YWhcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3dpbGF5YWgvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS93aWxheWFoXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS93aWxheWFoL3JvdXRlXCJcbiAgICB9LFxuICAgIGRpc3REaXI6IHByb2Nlc3MuZW52Ll9fTkVYVF9SRUxBVElWRV9ESVNUX0RJUiB8fCAnJyxcbiAgICBwcm9qZWN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfUFJPSkVDVF9ESVIgfHwgJycsXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxjbGllbnRcXFxcZ2VzaXRcXFxcYXBwXFxcXGFwaVxcXFx3aWxheWFoXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwilayah%2Froute&page=%2Fapi%2Fwilayah%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwilayah%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwilayah%2Froute&page=%2Fapi%2Fwilayah%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwilayah%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();