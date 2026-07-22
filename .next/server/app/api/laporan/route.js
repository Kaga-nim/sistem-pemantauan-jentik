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
exports.id = "app/api/laporan/route";
exports.ids = ["app/api/laporan/route"];
exports.modules = {

/***/ "(rsc)/./app/api/laporan/route.ts":
/*!**********************************!*\
  !*** ./app/api/laporan/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ \"(rsc)/./lib/utils.ts\");\n\n\n\n\nconst PAGE_SIZE = 20;\nasync function GET(request) {\n    if (!await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.checkAdminAuth)(request)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const { week, year } = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.getISOWeek)(new Date());\n    const minggu = parseInt(request.nextUrl.searchParams.get(\"minggu\") || String(week));\n    const tahun = parseInt(request.nextUrl.searchParams.get(\"tahun\") || String(year));\n    const wilayahId = request.nextUrl.searchParams.get(\"wilayah_id\");\n    const page = Math.max(1, parseInt(request.nextUrl.searchParams.get(\"page\") || \"1\"));\n    const from = (page - 1) * PAGE_SIZE;\n    const to = from + PAGE_SIZE - 1;\n    let countQuery = _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from(\"konfirmasi\").select(\"id\", {\n        count: \"exact\",\n        head: true\n    }).eq(\"tahun\", tahun).eq(\"minggu\", minggu);\n    let dataQuery = _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabase.from(\"konfirmasi\").select(`\n      id,\n      nama_warga,\n      alamat,\n      tanggal_konfirmasi,\n      catatan,\n      wilayah:wilayah_id(id, nama),\n      detail_konfirmasi(\n        id,\n        ada_jentik,\n        catatan,\n        titik:titik_id(id, nama)\n      )\n    `).eq(\"tahun\", tahun).eq(\"minggu\", minggu).order(\"tanggal_konfirmasi\", {\n        ascending: false\n    }).range(from, to);\n    if (wilayahId) {\n        countQuery = countQuery.eq(\"wilayah_id\", wilayahId);\n        dataQuery = dataQuery.eq(\"wilayah_id\", wilayahId);\n    }\n    const [{ count, error: errC }, { data, error: errD }] = await Promise.all([\n        countQuery,\n        dataQuery\n    ]);\n    if (errC || errD) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: errC?.message || errD?.message\n        }, {\n            status: 500\n        });\n    }\n    const total = count ?? 0;\n    const totalPages = Math.ceil(total / PAGE_SIZE);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        data,\n        minggu,\n        tahun,\n        page,\n        totalPages,\n        total,\n        pageSize: PAGE_SIZE\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xhcG9yYW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDZDtBQUNFO0FBQ0g7QUFFekMsTUFBTUksWUFBWTtBQUVYLGVBQWVDLElBQUlDLE9BQW9CO0lBQzVDLElBQUksQ0FBRSxNQUFNSix5REFBY0EsQ0FBQ0ksVUFBVztRQUNwQyxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtJQUVBLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUUsR0FBR1Isc0RBQVVBLENBQUMsSUFBSVM7SUFDdEMsTUFBTUMsU0FBU0MsU0FBU1IsUUFBUVMsT0FBTyxDQUFDQyxZQUFZLENBQUNDLEdBQUcsQ0FBQyxhQUFhQyxPQUFPUjtJQUM3RSxNQUFNUyxRQUFRTCxTQUFTUixRQUFRUyxPQUFPLENBQUNDLFlBQVksQ0FBQ0MsR0FBRyxDQUFDLFlBQVlDLE9BQU9QO0lBQzNFLE1BQU1TLFlBQVlkLFFBQVFTLE9BQU8sQ0FBQ0MsWUFBWSxDQUFDQyxHQUFHLENBQUM7SUFDbkQsTUFBTUksT0FBT0MsS0FBS0MsR0FBRyxDQUFDLEdBQUdULFNBQVNSLFFBQVFTLE9BQU8sQ0FBQ0MsWUFBWSxDQUFDQyxHQUFHLENBQUMsV0FBVztJQUM5RSxNQUFNTyxPQUFPLENBQUNILE9BQU8sS0FBS2pCO0lBQzFCLE1BQU1xQixLQUFLRCxPQUFPcEIsWUFBWTtJQUU5QixJQUFJc0IsYUFBYXpCLG1EQUFRQSxDQUN0QnVCLElBQUksQ0FBQyxjQUNMRyxNQUFNLENBQUMsTUFBTTtRQUFFQyxPQUFPO1FBQVNDLE1BQU07SUFBSyxHQUMxQ0MsRUFBRSxDQUFDLFNBQVNYLE9BQ1pXLEVBQUUsQ0FBQyxVQUFVakI7SUFFaEIsSUFBSWtCLFlBQVk5QixtREFBUUEsQ0FDckJ1QixJQUFJLENBQUMsY0FDTEcsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFhVCxDQUFDLEVBQ0FHLEVBQUUsQ0FBQyxTQUFTWCxPQUNaVyxFQUFFLENBQUMsVUFBVWpCLFFBQ2JtQixLQUFLLENBQUMsc0JBQXNCO1FBQUVDLFdBQVc7SUFBTSxHQUMvQ0MsS0FBSyxDQUFDVixNQUFNQztJQUVmLElBQUlMLFdBQVc7UUFDYk0sYUFBYUEsV0FBV0ksRUFBRSxDQUFDLGNBQWNWO1FBQ3pDVyxZQUFZQSxVQUFVRCxFQUFFLENBQUMsY0FBY1Y7SUFDekM7SUFFQSxNQUFNLENBQUMsRUFBRVEsS0FBSyxFQUFFcEIsT0FBTzJCLElBQUksRUFBRSxFQUFFLEVBQUVDLElBQUksRUFBRTVCLE9BQU82QixJQUFJLEVBQUUsQ0FBQyxHQUFHLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQztRQUFDYjtRQUFZSztLQUFVO0lBRWpHLElBQUlJLFFBQVFFLE1BQU07UUFDaEIsT0FBT3JDLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRUMsT0FBTzJCLE1BQU1LLFdBQVdILE1BQU1HO1FBQVEsR0FBRztZQUFFL0IsUUFBUTtRQUFJO0lBQ3BGO0lBRUEsTUFBTWdDLFFBQVFiLFNBQVM7SUFDdkIsTUFBTWMsYUFBYXBCLEtBQUtxQixJQUFJLENBQUNGLFFBQVFyQztJQUVyQyxPQUFPSixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1FBQUU2QjtRQUFNdkI7UUFBUU07UUFBT0U7UUFBTXFCO1FBQVlEO1FBQU9HLFVBQVV4QztJQUFVO0FBQy9GIiwic291cmNlcyI6WyJDOlxcbGFyYWdvblxcd3d3XFxjbGllbnRcXGdlc2l0XFxhcHBcXGFwaVxcbGFwb3Jhblxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiQC9saWIvc3VwYWJhc2VcIjtcbmltcG9ydCB7IGNoZWNrQWRtaW5BdXRoIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IGdldElTT1dlZWsgfSBmcm9tIFwiQC9saWIvdXRpbHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gMjA7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgaWYgKCEoYXdhaXQgY2hlY2tBZG1pbkF1dGgocmVxdWVzdCkpKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgfVxuXG4gIGNvbnN0IHsgd2VlaywgeWVhciB9ID0gZ2V0SVNPV2VlayhuZXcgRGF0ZSgpKTtcbiAgY29uc3QgbWluZ2d1ID0gcGFyc2VJbnQocmVxdWVzdC5uZXh0VXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJtaW5nZ3VcIikgfHwgU3RyaW5nKHdlZWspKTtcbiAgY29uc3QgdGFodW4gPSBwYXJzZUludChyZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zLmdldChcInRhaHVuXCIpIHx8IFN0cmluZyh5ZWFyKSk7XG4gIGNvbnN0IHdpbGF5YWhJZCA9IHJlcXVlc3QubmV4dFVybC5zZWFyY2hQYXJhbXMuZ2V0KFwid2lsYXlhaF9pZFwiKTtcbiAgY29uc3QgcGFnZSA9IE1hdGgubWF4KDEsIHBhcnNlSW50KHJlcXVlc3QubmV4dFVybC5zZWFyY2hQYXJhbXMuZ2V0KFwicGFnZVwiKSB8fCBcIjFcIikpO1xuICBjb25zdCBmcm9tID0gKHBhZ2UgLSAxKSAqIFBBR0VfU0laRTtcbiAgY29uc3QgdG8gPSBmcm9tICsgUEFHRV9TSVpFIC0gMTtcblxuICBsZXQgY291bnRRdWVyeSA9IHN1cGFiYXNlXG4gICAgLmZyb20oXCJrb25maXJtYXNpXCIpXG4gICAgLnNlbGVjdChcImlkXCIsIHsgY291bnQ6IFwiZXhhY3RcIiwgaGVhZDogdHJ1ZSB9KVxuICAgIC5lcShcInRhaHVuXCIsIHRhaHVuKVxuICAgIC5lcShcIm1pbmdndVwiLCBtaW5nZ3UpO1xuXG4gIGxldCBkYXRhUXVlcnkgPSBzdXBhYmFzZVxuICAgIC5mcm9tKFwia29uZmlybWFzaVwiKVxuICAgIC5zZWxlY3QoYFxuICAgICAgaWQsXG4gICAgICBuYW1hX3dhcmdhLFxuICAgICAgYWxhbWF0LFxuICAgICAgdGFuZ2dhbF9rb25maXJtYXNpLFxuICAgICAgY2F0YXRhbixcbiAgICAgIHdpbGF5YWg6d2lsYXlhaF9pZChpZCwgbmFtYSksXG4gICAgICBkZXRhaWxfa29uZmlybWFzaShcbiAgICAgICAgaWQsXG4gICAgICAgIGFkYV9qZW50aWssXG4gICAgICAgIGNhdGF0YW4sXG4gICAgICAgIHRpdGlrOnRpdGlrX2lkKGlkLCBuYW1hKVxuICAgICAgKVxuICAgIGApXG4gICAgLmVxKFwidGFodW5cIiwgdGFodW4pXG4gICAgLmVxKFwibWluZ2d1XCIsIG1pbmdndSlcbiAgICAub3JkZXIoXCJ0YW5nZ2FsX2tvbmZpcm1hc2lcIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAod2lsYXlhaElkKSB7XG4gICAgY291bnRRdWVyeSA9IGNvdW50UXVlcnkuZXEoXCJ3aWxheWFoX2lkXCIsIHdpbGF5YWhJZCk7XG4gICAgZGF0YVF1ZXJ5ID0gZGF0YVF1ZXJ5LmVxKFwid2lsYXlhaF9pZFwiLCB3aWxheWFoSWQpO1xuICB9XG5cbiAgY29uc3QgW3sgY291bnQsIGVycm9yOiBlcnJDIH0sIHsgZGF0YSwgZXJyb3I6IGVyckQgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbY291bnRRdWVyeSwgZGF0YVF1ZXJ5XSk7XG5cbiAgaWYgKGVyckMgfHwgZXJyRCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJDPy5tZXNzYWdlIHx8IGVyckQ/Lm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxuXG4gIGNvbnN0IHRvdGFsID0gY291bnQgPz8gMDtcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbCAvIFBBR0VfU0laRSk7XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZGF0YSwgbWluZ2d1LCB0YWh1biwgcGFnZSwgdG90YWxQYWdlcywgdG90YWwsIHBhZ2VTaXplOiBQQUdFX1NJWkUgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic3VwYWJhc2UiLCJjaGVja0FkbWluQXV0aCIsImdldElTT1dlZWsiLCJQQUdFX1NJWkUiLCJHRVQiLCJyZXF1ZXN0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwid2VlayIsInllYXIiLCJEYXRlIiwibWluZ2d1IiwicGFyc2VJbnQiLCJuZXh0VXJsIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwiU3RyaW5nIiwidGFodW4iLCJ3aWxheWFoSWQiLCJwYWdlIiwiTWF0aCIsIm1heCIsImZyb20iLCJ0byIsImNvdW50UXVlcnkiLCJzZWxlY3QiLCJjb3VudCIsImhlYWQiLCJlcSIsImRhdGFRdWVyeSIsIm9yZGVyIiwiYXNjZW5kaW5nIiwicmFuZ2UiLCJlcnJDIiwiZGF0YSIsImVyckQiLCJQcm9taXNlIiwiYWxsIiwibWVzc2FnZSIsInRvdGFsIiwidG90YWxQYWdlcyIsImNlaWwiLCJwYWdlU2l6ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/laporan/route.ts\n");

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

/***/ "(rsc)/./lib/utils.ts":
/*!**********************!*\
  !*** ./lib/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatTanggal: () => (/* binding */ formatTanggal),\n/* harmony export */   getISOWeek: () => (/* binding */ getISOWeek),\n/* harmony export */   labelMinggu: () => (/* binding */ labelMinggu),\n/* harmony export */   weekToDateRange: () => (/* binding */ weekToDateRange)\n/* harmony export */ });\n/** Hitung ISO week number dan tahun dari sebuah Date */ function getISOWeek(date) {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return {\n        week: Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7),\n        year: d.getUTCFullYear()\n    };\n}\n/** Hitung tanggal Senin dari week number + tahun */ function weekToDateRange(week, year) {\n    const jan4 = new Date(Date.UTC(year, 0, 4));\n    const dayOfWeek = jan4.getUTCDay() || 7;\n    const weekStart = new Date(jan4);\n    weekStart.setUTCDate(jan4.getUTCDate() - dayOfWeek + 1 + (week - 1) * 7);\n    const weekEnd = new Date(weekStart);\n    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);\n    return {\n        start: weekStart,\n        end: weekEnd\n    };\n}\n/** Format tanggal ke bahasa Indonesia */ function formatTanggal(date) {\n    const d = typeof date === \"string\" ? new Date(date) : date;\n    return d.toLocaleDateString(\"id-ID\", {\n        day: \"numeric\",\n        month: \"long\",\n        year: \"numeric\",\n        timeZone: \"Asia/Jakarta\"\n    });\n}\n/** Format label minggu */ function labelMinggu(week, year) {\n    const { start, end } = weekToDateRange(week, year);\n    const fmt = (d)=>d.toLocaleDateString(\"id-ID\", {\n            day: \"numeric\",\n            month: \"short\",\n            timeZone: \"UTC\"\n        });\n    return `Minggu ${week} (${fmt(start)} – ${fmt(end)} ${year})`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvdXRpbHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLHNEQUFzRCxHQUMvQyxTQUFTQSxXQUFXQyxJQUFVO0lBQ25DLE1BQU1DLElBQUksSUFBSUMsS0FBS0EsS0FBS0MsR0FBRyxDQUFDSCxLQUFLSSxXQUFXLElBQUlKLEtBQUtLLFFBQVEsSUFBSUwsS0FBS00sT0FBTztJQUM3RSxNQUFNQyxTQUFTTixFQUFFTyxTQUFTLE1BQU07SUFDaENQLEVBQUVRLFVBQVUsQ0FBQ1IsRUFBRVMsVUFBVSxLQUFLLElBQUlIO0lBQ2xDLE1BQU1JLFlBQVksSUFBSVQsS0FBS0EsS0FBS0MsR0FBRyxDQUFDRixFQUFFVyxjQUFjLElBQUksR0FBRztJQUMzRCxPQUFPO1FBQ0xDLE1BQU1DLEtBQUtDLElBQUksQ0FBQyxDQUFDLENBQUVkLEVBQUVlLE9BQU8sS0FBS0wsVUFBVUssT0FBTyxFQUFDLElBQUssV0FBWSxLQUFLO1FBQ3pFQyxNQUFNaEIsRUFBRVcsY0FBYztJQUN4QjtBQUNGO0FBRUEsa0RBQWtELEdBQzNDLFNBQVNNLGdCQUFnQkwsSUFBWSxFQUFFSSxJQUFZO0lBQ3hELE1BQU1FLE9BQU8sSUFBSWpCLEtBQUtBLEtBQUtDLEdBQUcsQ0FBQ2MsTUFBTSxHQUFHO0lBQ3hDLE1BQU1HLFlBQVlELEtBQUtYLFNBQVMsTUFBTTtJQUN0QyxNQUFNYSxZQUFZLElBQUluQixLQUFLaUI7SUFDM0JFLFVBQVVaLFVBQVUsQ0FBQ1UsS0FBS1QsVUFBVSxLQUFLVSxZQUFZLElBQUksQ0FBQ1AsT0FBTyxLQUFLO0lBQ3RFLE1BQU1TLFVBQVUsSUFBSXBCLEtBQUttQjtJQUN6QkMsUUFBUWIsVUFBVSxDQUFDWSxVQUFVWCxVQUFVLEtBQUs7SUFDNUMsT0FBTztRQUFFYSxPQUFPRjtRQUFXRyxLQUFLRjtJQUFRO0FBQzFDO0FBRUEsdUNBQXVDLEdBQ2hDLFNBQVNHLGNBQWN6QixJQUFtQjtJQUMvQyxNQUFNQyxJQUFJLE9BQU9ELFNBQVMsV0FBVyxJQUFJRSxLQUFLRixRQUFRQTtJQUN0RCxPQUFPQyxFQUFFeUIsa0JBQWtCLENBQUMsU0FBUztRQUNuQ0MsS0FBSztRQUNMQyxPQUFPO1FBQ1BYLE1BQU07UUFDTlksVUFBVTtJQUNaO0FBQ0Y7QUFFQSx3QkFBd0IsR0FDakIsU0FBU0MsWUFBWWpCLElBQVksRUFBRUksSUFBWTtJQUNwRCxNQUFNLEVBQUVNLEtBQUssRUFBRUMsR0FBRyxFQUFFLEdBQUdOLGdCQUFnQkwsTUFBTUk7SUFDN0MsTUFBTWMsTUFBTSxDQUFDOUIsSUFDWEEsRUFBRXlCLGtCQUFrQixDQUFDLFNBQVM7WUFBRUMsS0FBSztZQUFXQyxPQUFPO1lBQVNDLFVBQVU7UUFBTTtJQUNsRixPQUFPLENBQUMsT0FBTyxFQUFFaEIsS0FBSyxFQUFFLEVBQUVrQixJQUFJUixPQUFPLEdBQUcsRUFBRVEsSUFBSVAsS0FBSyxDQUFDLEVBQUVQLEtBQUssQ0FBQyxDQUFDO0FBQy9EIiwic291cmNlcyI6WyJDOlxcbGFyYWdvblxcd3d3XFxjbGllbnRcXGdlc2l0XFxsaWJcXHV0aWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBIaXR1bmcgSVNPIHdlZWsgbnVtYmVyIGRhbiB0YWh1biBkYXJpIHNlYnVhaCBEYXRlICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPV2VlayhkYXRlOiBEYXRlKTogeyB3ZWVrOiBudW1iZXI7IHllYXI6IG51bWJlciB9IHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkpO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RheSgpIHx8IDc7XG4gIGQuc2V0VVRDRGF0ZShkLmdldFVUQ0RhdGUoKSArIDQgLSBkYXlOdW0pO1xuICBjb25zdCB5ZWFyU3RhcnQgPSBuZXcgRGF0ZShEYXRlLlVUQyhkLmdldFVUQ0Z1bGxZZWFyKCksIDAsIDEpKTtcbiAgcmV0dXJuIHtcbiAgICB3ZWVrOiBNYXRoLmNlaWwoKCgoZC5nZXRUaW1lKCkgLSB5ZWFyU3RhcnQuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSArIDEpIC8gNyksXG4gICAgeWVhcjogZC5nZXRVVENGdWxsWWVhcigpLFxuICB9O1xufVxuXG4vKiogSGl0dW5nIHRhbmdnYWwgU2VuaW4gZGFyaSB3ZWVrIG51bWJlciArIHRhaHVuICovXG5leHBvcnQgZnVuY3Rpb24gd2Vla1RvRGF0ZVJhbmdlKHdlZWs6IG51bWJlciwgeWVhcjogbnVtYmVyKTogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0ge1xuICBjb25zdCBqYW40ID0gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgMCwgNCkpO1xuICBjb25zdCBkYXlPZldlZWsgPSBqYW40LmdldFVUQ0RheSgpIHx8IDc7XG4gIGNvbnN0IHdlZWtTdGFydCA9IG5ldyBEYXRlKGphbjQpO1xuICB3ZWVrU3RhcnQuc2V0VVRDRGF0ZShqYW40LmdldFVUQ0RhdGUoKSAtIGRheU9mV2VlayArIDEgKyAod2VlayAtIDEpICogNyk7XG4gIGNvbnN0IHdlZWtFbmQgPSBuZXcgRGF0ZSh3ZWVrU3RhcnQpO1xuICB3ZWVrRW5kLnNldFVUQ0RhdGUod2Vla1N0YXJ0LmdldFVUQ0RhdGUoKSArIDYpO1xuICByZXR1cm4geyBzdGFydDogd2Vla1N0YXJ0LCBlbmQ6IHdlZWtFbmQgfTtcbn1cblxuLyoqIEZvcm1hdCB0YW5nZ2FsIGtlIGJhaGFzYSBJbmRvbmVzaWEgKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRUYW5nZ2FsKGRhdGU6IERhdGUgfCBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBkID0gdHlwZW9mIGRhdGUgPT09IFwic3RyaW5nXCIgPyBuZXcgRGF0ZShkYXRlKSA6IGRhdGU7XG4gIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZyhcImlkLUlEXCIsIHtcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgIG1vbnRoOiBcImxvbmdcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB0aW1lWm9uZTogXCJBc2lhL0pha2FydGFcIixcbiAgfSk7XG59XG5cbi8qKiBGb3JtYXQgbGFiZWwgbWluZ2d1ICovXG5leHBvcnQgZnVuY3Rpb24gbGFiZWxNaW5nZ3Uod2VlazogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHdlZWtUb0RhdGVSYW5nZSh3ZWVrLCB5ZWFyKTtcbiAgY29uc3QgZm10ID0gKGQ6IERhdGUpID0+XG4gICAgZC50b0xvY2FsZURhdGVTdHJpbmcoXCJpZC1JRFwiLCB7IGRheTogXCJudW1lcmljXCIsIG1vbnRoOiBcInNob3J0XCIsIHRpbWVab25lOiBcIlVUQ1wiIH0pO1xuICByZXR1cm4gYE1pbmdndSAke3dlZWt9ICgke2ZtdChzdGFydCl9IOKAkyAke2ZtdChlbmQpfSAke3llYXJ9KWA7XG59XG4iXSwibmFtZXMiOlsiZ2V0SVNPV2VlayIsImRhdGUiLCJkIiwiRGF0ZSIsIlVUQyIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZGF5TnVtIiwiZ2V0VVRDRGF5Iiwic2V0VVRDRGF0ZSIsImdldFVUQ0RhdGUiLCJ5ZWFyU3RhcnQiLCJnZXRVVENGdWxsWWVhciIsIndlZWsiLCJNYXRoIiwiY2VpbCIsImdldFRpbWUiLCJ5ZWFyIiwid2Vla1RvRGF0ZVJhbmdlIiwiamFuNCIsImRheU9mV2VlayIsIndlZWtTdGFydCIsIndlZWtFbmQiLCJzdGFydCIsImVuZCIsImZvcm1hdFRhbmdnYWwiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkYXkiLCJtb250aCIsInRpbWVab25lIiwibGFiZWxNaW5nZ3UiLCJmbXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/utils.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flaporan%2Froute&page=%2Fapi%2Flaporan%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flaporan%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flaporan%2Froute&page=%2Fapi%2Flaporan%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flaporan%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_laragon_www_client_gesit_app_api_laporan_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/laporan/route.ts */ \"(rsc)/./app/api/laporan/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/laporan/route\",\n        pathname: \"/api/laporan\",\n        filename: \"route\",\n        bundlePath: \"app/api/laporan/route\"\n    },\n    distDir: \".next\" || 0,\n    projectDir:  false || '',\n    resolvedPagePath: \"C:\\\\laragon\\\\www\\\\client\\\\gesit\\\\app\\\\api\\\\laporan\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_laragon_www_client_gesit_app_api_laporan_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsYXBvcmFuJTJGcm91dGUmcGFnZT0lMkZhcGklMkZsYXBvcmFuJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbGFwb3JhbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q2NsaWVudCU1Q2dlc2l0JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDbGFyYWdvbiU1Q3d3dyU1Q2NsaWVudCU1Q2dlc2l0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEJmlzR2xvYmFsTm90Rm91bmRFbmFibGVkPSEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDWTtBQUN6RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhLE9BQW9DLElBQUksQ0FBRTtBQUN2RCxnQkFBZ0IsTUFBdUM7QUFDdkQ7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXGxhcmFnb25cXFxcd3d3XFxcXGNsaWVudFxcXFxnZXNpdFxcXFxhcHBcXFxcYXBpXFxcXGxhcG9yYW5cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2xhcG9yYW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sYXBvcmFuXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9sYXBvcmFuL3JvdXRlXCJcbiAgICB9LFxuICAgIGRpc3REaXI6IHByb2Nlc3MuZW52Ll9fTkVYVF9SRUxBVElWRV9ESVNUX0RJUiB8fCAnJyxcbiAgICBwcm9qZWN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfUFJPSkVDVF9ESVIgfHwgJycsXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxjbGllbnRcXFxcZ2VzaXRcXFxcYXBwXFxcXGFwaVxcXFxsYXBvcmFuXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flaporan%2Froute&page=%2Fapi%2Flaporan%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flaporan%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flaporan%2Froute&page=%2Fapi%2Flaporan%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flaporan%2Froute.ts&appDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Claragon%5Cwww%5Cclient%5Cgesit&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();