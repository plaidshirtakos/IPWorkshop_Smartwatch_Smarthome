(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{182:
/*!****************************************!*\
  !*** ./source/plugins/workspace/ui.ts ***!
  \****************************************/
/*! exports provided: setup */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });\n/* harmony import */ var _ui_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui_exports */ 230);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ 18);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ 231);\n/* harmony import */ var _views_Workspace_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/Workspace.vue */ 232);\n\n\n\n\nfunction setup(options, imports, register) {\n    let routes = [];\n    let workspace = {\n        registerToolbarButton(view, options = {}) {\n            console.log(view.options.name);\n            vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(view.options.name, view);\n            let toolbarButton = {\n                view: view.options.name,\n                priority: options.priority || 1,\n                position: options.position || _ui_exports__WEBPACK_IMPORTED_MODULE_0__["ToolbarButtonPosition"].LEFT,\n                action: options.action,\n                visible: options.visible || (() => true),\n                enabled: options.enabled || (() => true)\n            };\n            imports.application.storeDispatch("workspace/registerToolbarButton", toolbarButton);\n        },\n        registerWorkspaceRoutes(newRoutes) {\n            // TODO throw exception if routes are registered after the start of the application\n            routes.push(...newRoutes);\n        },\n    };\n    imports.application.registerStore(\'workspace\', Object(_store__WEBPACK_IMPORTED_MODULE_2__["default"])());\n    imports.application.registerRoutes([{\n            path: \'/workspace\',\n            children: routes,\n            component: _views_Workspace_vue__WEBPACK_IMPORTED_MODULE_3__["default"]\n        }]);\n    register(null, {\n        workspace\n    });\n}\n\n\n//# sourceURL=webpack:///./source/plugins/workspace/ui.ts?')},200:
/*!*******************************************************************************!*\
  !*** ./source/plugins/workspace/views/Workspace.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/ts-loader??ref--4!../../../../node_modules/vue-loader/lib??vue-loader-options!./Workspace.vue?vue&type=script&lang=ts& */ 201);\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); \n\n//# sourceURL=webpack:///./source/plugins/workspace/views/Workspace.vue?')},201:
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--4!./node_modules/vue-loader/lib??vue-loader-options!./source/plugins/workspace/views/Workspace.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ 18);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({\n    name: "Workspace",\n    mounted() {\n        return __awaiter(this, void 0, void 0, function* () {\n            setInterval(() => __awaiter(this, void 0, void 0, function* () {\n                try {\n                    let response = yield this.ui.application.api.get("/api/v1/data/iot");\n                    if (response.status === 200) {\n                        this.iotData = response.data;\n                    }\n                    else {\n                        console.error("Cannot get data");\n                    }\n                }\n                catch (error) {\n                    console.error(error);\n                }\n            }), 60000 * 5);\n        });\n    },\n    watch: {},\n    data() {\n        return {\n            bottomNav: "images",\n            iotData: {},\n            topic: "",\n            message: "",\n            fan: false\n        };\n    },\n    computed: {},\n    methods: {\n        sendIotData(topic, message) {\n            return __awaiter(this, void 0, void 0, function* () {\n                try {\n                    if (topic === "ipw/diana/commands" && message === "led_off") {\n                        this.fan = false;\n                    }\n                    else if (topic === "ipw/diana/commands" && message === "led_on") {\n                        this.fan = true;\n                    }\n                    console.log("Sent!");\n                    let response = yield this.ui.application.api.post("/api/v1/send/data/iot", {\n                        message: message,\n                        topic: topic\n                    });\n                    if (response.status !== 200) {\n                        console.error("Could not send message");\n                    }\n                }\n                catch (e) {\n                    console.error(e);\n                }\n            });\n        },\n        changePage(page) {\n            switch (page) {\n                case "images":\n                    this.$router.push("/workspace/images");\n                    /// Thiss will add to <<ip address>>:6969/ the images path\n                    // <<ip address>>:6969/ => <<ip address>>:6969/images\n                    // <<ip address>>:6969/<<AnyOtherPage>> => <<ip address>>:6969/images\n                    break;\n                case "videos":\n                    this.$router.push("/workspace/videos");\n                    /// Thiss will add to <<ip address>>:6969/ the videos path\n                    // <<ip address>>:6969/ => <<ip address>>:6969/videos\n                    // <<ip address>>:6969/<<AnyOtherPage>> => <<ip address>>:6969/videos\n                    break;\n                case "postdata":\n                    this.$router.push("/workspace/postdata");\n                    /// Thiss will add to <<ip address>>:6969/ the workspace path\n                    // <<ip address>>:6969/ => <<ip address>>:6969/workspace\n                    // <<ip address>>:6969/<<AnyOtherPage>> => <<ip address>>:6969/workspace\n                    break;\n            }\n        }\n    }\n}));\n\n\n//# sourceURL=webpack:///./source/plugins/workspace/views/Workspace.vue?./node_modules/ts-loader??ref--4!./node_modules/vue-loader/lib??vue-loader-options')},211:
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./source/plugins/workspace/views/Workspace.vue?vue&type=template&id=b683fff6& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    "v-app",\n    [\n      _c(\n        "v-app-bar",\n        {\n          attrs: {\n            app: "",\n            dark: "",\n            color: "deep-purple accent-4",\n            "scroll-target": "#scrolling-techniques-6"\n          }\n        },\n        [\n          _c(\n            "v-toolbar-title",\n            { attrs: { link: "", contain: "", "justify-center": "" } },\n            [_vm._v("\\n\\t\\t\\tSmartHome Dashboard\\n\\t\\t")]\n          )\n        ],\n        1\n      ),\n      _vm._v(" "),\n      _c(\n        "v-content",\n        { attrs: { fluid: "", app: "" } },\n        [\n          _c(\n            "v-container",\n            { attrs: { "pr-2": "", "pl-2": "", "pt-4": "" } },\n            [\n              _c("router-view"),\n              _vm._v(" "),\n              _vm.fan\n                ? _c(\n                    "v-btn",\n                    {\n                      on: {\n                        click: function($event) {\n                          return _vm.sendIotData(\n                            "ipw/diana/commands",\n                            "led_off"\n                          )\n                        }\n                      }\n                    },\n                    [_vm._v("Turn off LED")]\n                  )\n                : _c(\n                    "v-btn",\n                    {\n                      on: {\n                        click: function($event) {\n                          return _vm.sendIotData("ipw/diana/commands", "led_on")\n                        }\n                      }\n                    },\n                    [_vm._v("Turn on LED")]\n                  ),\n              _vm._v(" "),\n              _c(\n                "v-card",\n                [\n                  _c(\n                    "v-card-text",\n                    [\n                      _c("v-textarea", {\n                        attrs: { label: "Topic" },\n                        model: {\n                          value: _vm.topic,\n                          callback: function($$v) {\n                            _vm.topic = $$v\n                          },\n                          expression: "topic"\n                        }\n                      }),\n                      _vm._v(" "),\n                      _c("v-textarea", {\n                        attrs: { label: "Message" },\n                        model: {\n                          value: _vm.message,\n                          callback: function($$v) {\n                            _vm.message = $$v\n                          },\n                          expression: "message"\n                        }\n                      })\n                    ],\n                    1\n                  )\n                ],\n                1\n              ),\n              _vm._v(" "),\n              _c(\n                "v-btn",\n                {\n                  on: {\n                    click: function($event) {\n                      return _vm.sendIotData(_vm.topic, _vm.message)\n                    }\n                  }\n                },\n                [_vm._v("Send message to IoT")]\n              )\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _vm._v(" "),\n      _c(\n        "v-content",\n        { attrs: { fluid: "", app: "" } },\n        [\n          _c(\n            "v-container",\n            { attrs: { "pr-2": "", "pl-2": "", "pt-4": "" } },\n            [_c("router-view")],\n            1\n          )\n        ],\n        1\n      ),\n      _vm._v(" "),\n      _c(\n        "v-bottom-navigation",\n        {\n          model: {\n            value: _vm.bottomNav,\n            callback: function($$v) {\n              _vm.bottomNav = $$v\n            },\n            expression: "bottomNav"\n          }\n        },\n        [\n          _c(\n            "v-btn",\n            {\n              attrs: { value: "images" },\n              on: {\n                click: function($event) {\n                  return _vm.changePage("images")\n                }\n              }\n            },\n            [\n              _c("span", [_vm._v("Images")]),\n              _vm._v(" "),\n              _c("v-icon", [_vm._v("mdi-image")])\n            ],\n            1\n          ),\n          _vm._v(" "),\n          _c(\n            "v-btn",\n            {\n              attrs: { value: "videos" },\n              on: {\n                click: function($event) {\n                  return _vm.changePage("videos")\n                }\n              }\n            },\n            [\n              _c("span", [_vm._v("Dashboard")]),\n              _vm._v(" "),\n              _c("v-icon", [_vm._v("mdi-gauge")])\n            ],\n            1\n          ),\n          _vm._v(" "),\n          _c(\n            "v-btn",\n            {\n              attrs: { value: "postdata" },\n              on: {\n                click: function($event) {\n                  return _vm.changePage("postdata")\n                }\n              }\n            },\n            [\n              _c("span", [_vm._v("Controllers")]),\n              _vm._v(" "),\n              _c("v-icon", [_vm._v("mdi-thermometer-plus")])\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./source/plugins/workspace/views/Workspace.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options')},230:
/*!************************************************!*\
  !*** ./source/plugins/workspace/ui_exports.ts ***!
  \************************************************/
/*! exports provided: ToolbarButtonPosition */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarButtonPosition", function() { return ToolbarButtonPosition; });\nvar ToolbarButtonPosition;\n(function (ToolbarButtonPosition) {\n    ToolbarButtonPosition[ToolbarButtonPosition["LEFT"] = 0] = "LEFT";\n    ToolbarButtonPosition[ToolbarButtonPosition["RIGHT"] = 1] = "RIGHT";\n})(ToolbarButtonPosition || (ToolbarButtonPosition = {}));\n\n\n//# sourceURL=webpack:///./source/plugins/workspace/ui_exports.ts?')},231:
/*!*******************************************!*\
  !*** ./source/plugins/workspace/store.ts ***!
  \*******************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return workspaceStore; });\nfunction workspaceStore() {\n    let store = {\n        namespaced: true,\n        state: {\n            toolbarButtons: []\n        },\n        getters: {\n            toolbarButtons: (state) => state.toolbarButtons\n        },\n        mutations: {\n            registerToolbarButton(state, toolbarButton) {\n                state.toolbarButtons.push(toolbarButton);\n            }\n        },\n        actions: {\n            registerToolbarButton(store, toolbarButton) {\n                store.commit("registerToolbarButton", toolbarButton);\n            }\n        }\n    };\n    return store;\n}\n\n\n//# sourceURL=webpack:///./source/plugins/workspace/store.ts?')},232:
/*!******************************************************!*\
  !*** ./source/plugins/workspace/views/Workspace.vue ***!
  \******************************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Workspace_vue_vue_type_template_id_b683fff6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Workspace.vue?vue&type=template&id=b683fff6& */ 233);\n/* harmony import */ var _Workspace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Workspace.vue?vue&type=script&lang=ts& */ 200);\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 42);\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(\n  _Workspace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],\n  _Workspace_vue_vue_type_template_id_b683fff6___WEBPACK_IMPORTED_MODULE_0__["render"],\n  _Workspace_vue_vue_type_template_id_b683fff6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = "source/plugins/workspace/views/Workspace.vue"\n/* harmony default export */ __webpack_exports__["default"] = (component.exports);\n\n//# sourceURL=webpack:///./source/plugins/workspace/views/Workspace.vue?')},233:
/*!*************************************************************************************!*\
  !*** ./source/plugins/workspace/views/Workspace.vue?vue&type=template&id=b683fff6& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_template_id_b683fff6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Workspace.vue?vue&type=template&id=b683fff6& */ 211);\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_template_id_b683fff6___WEBPACK_IMPORTED_MODULE_0__["render"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Workspace_vue_vue_type_template_id_b683fff6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });\n\n\n\n//# sourceURL=webpack:///./source/plugins/workspace/views/Workspace.vue?')}}]);