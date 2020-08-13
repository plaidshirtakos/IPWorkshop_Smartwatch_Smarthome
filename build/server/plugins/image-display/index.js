module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/plugins/image-display/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/plugins/image-display/server/server.ts":
/*!*******************************************************!*\
  !*** ./source/plugins/image-display/server/server.ts ***!
  \*******************************************************/
/*! exports provided: setup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return setup; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mqtt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mqtt */ \"mqtt\");\n/* harmony import */ var mqtt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mqtt__WEBPACK_IMPORTED_MODULE_2__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\nfunction setup(options, imports, register) {\n    let image_display = {};\n    let imageDisplayRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"])();\n    const client = mqtt__WEBPACK_IMPORTED_MODULE_2__[\"connect\"]('mqtt://broker.hivemq.com');\n    client.on('connect', () => {\n        console.log(\"Mqtt broker connected\");\n        client.subscribe('ipw/ruxi/sensors', function () {\n            client.on('message', function (topic, message, packet) {\n                console.log(\"Received '\" + message + \"' on '\" + topic + \"'\");\n                if (topic === \"data\") {\n                    let stringMessage = Buffer.from(message).toString();\n                    let objectMessage = JSON.parse(stringMessage);\n                    fs_extra__WEBPACK_IMPORTED_MODULE_1__[\"writeFileSync\"](\"./data.json\", objectMessage);\n                }\n            });\n        });\n    });\n    imageDisplayRouter.post(\"/route/sendit\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let data = req.body;\n            fs_extra__WEBPACK_IMPORTED_MODULE_1__[\"writeFileSync\"](\"./data.json\", data);\n            console.log(\"Sent to IoT!\");\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    imageDisplayRouter.get(\"/get/data/iot\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let iotData = {};\n            let stringData = \"\";\n            let sendData = {};\n            iotData = fs_extra__WEBPACK_IMPORTED_MODULE_1__[\"readFileSync\"](\"./data.json\"); /*This is a Buffer*/\n            if (iotData)\n                stringData = Buffer.from(iotData).toString(); /*This is a string*/\n            else {\n                console.log(\"could not read file\");\n                res.status(500).send({});\n            }\n            if (stringData)\n                sendData = JSON.parse(stringData); /*This is an object*/\n            else {\n                console.log(\"could not parse the file\");\n                res.status(500).send({});\n            }\n            if (sendData) {\n                console.log(sendData.temparture);\n                res.status(200).send(sendData);\n            }\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    imageDisplayRouter.post(\"/send/data/iot\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let message = req.body.message;\n            let topic = req.body.topic;\n            client.publish(topic, message);\n            console.log(\"Sent to IoT: \" + topic + message);\n            res.status(200).send({});\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    imageDisplayRouter.get(\"/route/getit\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let iotData = {};\n            let stringData = \"\";\n            let sendData = {};\n            iotData = fs_extra__WEBPACK_IMPORTED_MODULE_1__[\"readFileSync\"](\"./data.json\"); /*This is a Buffer*/\n            if (iotData)\n                stringData = Buffer.from(iotData).toString(); /*This is a string*/\n            else {\n                console.log(\"could not read file\");\n            }\n            if (stringData)\n                sendData = JSON.parse(stringData); /*This is an object*/\n            else {\n                console.log(\"could not parse the file\");\n            }\n            if (sendData) {\n                console.log(sendData.temparture);\n                res.status(200).send(sendData);\n            }\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    //a simple get route -> Go to PostGetExample.vue to see how you can use it in the frontend;\n    imageDisplayRouter.get(\"/get/data\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            res.status(200).send(\"This is a get example\");\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    //a simple post route -> Go to PostGetExample.vue to see how you can use it in the frontend;\n    imageDisplayRouter.post(\"/post/data\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            res.status(200).send(\"This is a post example\");\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    imageDisplayRouter.post(\"/post2iot\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let data = req.body;\n            res.status(200).send(\"This is a post example\");\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    imageDisplayRouter.get(\"/getfrom/iot\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let data = req.body;\n            res.status(200).send(\"This is a post example\");\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    imageDisplayRouter.get(\"/example/:param1/:param2\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n        try {\n            let param1 = req.params.param1;\n            let param2number = parseInt(req.params.param2);\n            console.log(param1);\n            let response = param1 + \"This is a response \" + param2number;\n            res.status(200).send({\n                response: \"Hardcoded string\",\n                text: \"I successfuly responded\"\n            });\n        }\n        catch (e) {\n            console.error(e);\n            res.status(500).send({ err: 500 });\n        }\n    }));\n    //webserver must be consumend in the package.json of this plugin in order for this to work\n    imports.webserver.registerRouterApi(1, imageDisplayRouter);\n    register(null, {\n        image_display\n    });\n}\n\n\n//# sourceURL=webpack:///./source/plugins/image-display/server/server.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-extra\");\n\n//# sourceURL=webpack:///external_%22fs-extra%22?");

/***/ }),

/***/ "mqtt":
/*!***********************!*\
  !*** external "mqtt" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mqtt\");\n\n//# sourceURL=webpack:///external_%22mqtt%22?");

/***/ })

/******/ });