!function(t){function n(n){for(var r,a,s=n[0],p=n[1],u=n[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(t[r]=p[r]);for(c&&c(n);d.length;)d.shift()();return i.push.apply(i,u||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,s=1;s<e.length;s++){var p=e[s];0!==o[p]&&(r=!1)}r&&(i.splice(n--,1),t=a(a.s=e[0]))}return t}var r={},o={ui:0},i=[];function a(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.e=function(t){var n=[],e=o[t];if(0!==e)if(e)n.push(e[2]);else{var r=new Promise((function(n,r){e=o[t]=[n,r]}));n.push(e[2]=r);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.src=function(t){return a.p+"imports/"+({}[t]||t)+"_55391e4e6173852dc4c6.js"}(t);var p=new Error;i=function(n){s.onerror=s.onload=null,clearTimeout(u);var e=o[t];if(0!==e){if(e){var r=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;p.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",p.name="ChunkLoadError",p.type=r,p.request=i,e[1](p)}o[t]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(n)},a.m=t,a.c=r,a.d=function(t,n,e){a.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,n){if(1&n&&(t=a(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)a.d(e,r,function(n){return t[n]}.bind(null,r));return e},a.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(n,"a",n),n},a.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},a.p="",a.oe=function(t){throw console.error(t),t};var s=window.webpackJsonp=window.webpackJsonp||[],p=s.push.bind(s);s.push=n,s=s.slice();for(var u=0;u<s.length;u++)n(s[u]);var c=p;i.push([19,"../vendor"]),e()}({19:
/*!****************************!*\
  !*** ./source/ui/index.js ***!
  \****************************/
/*! no static exports found */function(module,exports,__webpack_require__){eval("const architect = __webpack_require__ (/*! ./../server/architect.js */ 20);\nconst plugins = __webpack_require__ (/*! ./plugins.js */ 23);\n\nfunction progress (name, index, all)\n{\n\tif (index || all)\n\t{\n\t\tdocument.querySelector('#loading').innerHTML = 'Loading plugin '+name;\n\t\tdocument.querySelector('#loading-progress-bar').setAttribute ('style', 'width: '+Math.round((index/all*100))+'%');\n\t\tconsole.log ('Loading '+name);\n\t}\n\telse\n\t{\n\t\tdocument.querySelector('#loading').innerHTML = name;\n\t\tdocument.querySelector('#loading-progress-bar').setAttribute ('style', 'width: 100%');\n\t\tconsole.log (name);\n\t}\n}\n\nasync function main ()\n{\n\tdocument.querySelector('#loading-progress').style.display='block';\n\ttry\n\t{\n\t\tlet setupPlugins = await plugins.loadPlugins (progress);\n\t\tarchitect.createApp(setupPlugins, function (err, app) {\n\t\t\tif (err) \n\t\t\t{\n\t\t\t\tdocument.querySelector('#startuperror').innerHTML = 'Startup Error: '+err.message;\n\t\t\t\tdocument.querySelector('#startuperror').style.display= 'block';\n\t\t\t\tconsole.error (err);\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tconsole.log('Starting Music Local');\n\t\t\t\tdocument.querySelector('#loading').style.display='none';\n\t\t\t\tdocument.querySelector('#loading-progress').style.display='none';\n\t\t\t\tapp.services.application.start (app.services);\n\t\t\t\t//app.services.events.emit ('ready', app.services);\n\t\t\t}\n\t\t});\n\t}\n\tcatch (e)\n\t{\n\t\tdocument.querySelector('#startuperror').innerHTML = 'Startup Error: '+e.message;\n\t\tdocument.querySelector('#startuperror').style.display= 'block';\n\t\tconsole.error (e);\n\t}\n}\n\nmain ();\n\n\n//# sourceURL=webpack:///./source/ui/index.js?")},20:
/*!************************************!*\
  !*** ./source/server/architect.js ***!
  \************************************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval("/* WEBPACK VAR INJECTION */(function(process) {\nvar DEBUG = typeof location != 'undefined' && location.href.match(/debug=[123]/) ? true : false;\n\nlet events = __webpack_require__ (/*! events */ 21);\nvar EventEmitter = events.EventEmitter;\nlet _ = __webpack_require__ (/*! lodash */ 22);\n\n  \nexports.createApp = createApp;\nexports.Architect = Architect;\n\n// Check a plugin config list for bad dependencies and throw on error\nfunction checkConfig(config, lookup) {\n\n\t// Check for the required fields in each plugin.\n\tconfig.forEach(function (plugin) {\n\t\tif (plugin.checked) { return; }\n\t\tif (!Object.prototype.hasOwnProperty.call (plugin, 'setup')) {\n\t\t\tthrow new Error('Plugin is missing the setup function ' + JSON.stringify(plugin));\n\t\t}\n\t\tif (!Object.prototype.hasOwnProperty.call (plugin, 'provides')) {\n\t\t\tthrow new Error('Plugin is missing the provides array ' + JSON.stringify(plugin));\n\t\t}\n\t\tif (!Object.prototype.hasOwnProperty.call (plugin, 'consumes')) {\n\t\t\tthrow new Error('Plugin is missing the consumes array ' + JSON.stringify(plugin));\n\t\t}\n\t});\n\n\treturn checkCycles(config, lookup);\n}\n\nfunction checkCycles(config, lookup) {\n\tvar plugins = [];\n\tconfig.forEach(function(pluginConfig, index) {\n\t\tplugins.push({\n\t\t\tpackagePath: pluginConfig.packagePath,\n\t\t\tprovides: pluginConfig.provides.concat(),\n\t\t\tconsumes: pluginConfig.consumes.concat(),\n\t\t\ti: index\n\t\t});\n\t});\n\n\tvar resolved = {\n\t\thub: true,\n\t\thooks: true\n\t};\n\tvar changed = true;\n\tvar sorted = [];\n\n\twhile(plugins.length && changed) {\n\t\tchanged = false;\n\n\t\tplugins.concat().forEach(function(plugin) {\n\t\t\tvar consumes = plugin.consumes.concat();\n\n\t\t\tvar resolvedAll = true;\n\t\t\tfor (var i=0; i<consumes.length; i++) {\n\t\t\t\tvar service = consumes[i];\n\t\t\t\tif (!resolved[service] && (!lookup || !lookup(service))) {\n\t\t\t\t\tresolvedAll = false;\n\t\t\t\t} else {\n\t\t\t\t\tplugin.consumes.splice(plugin.consumes.indexOf(service), 1);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (!resolvedAll)\n\t\t\t\treturn;\n\n\t\t\tplugins.splice(plugins.indexOf(plugin), 1);\n\t\t\tplugin.provides.forEach(function(service) {\n\t\t\t\tresolved[service] = true;\n\t\t\t});\n\t\t\tsorted.push(config[plugin.i]);\n\t\t\tchanged = true;\n\t\t});\n\t}\n\n\tif (plugins.length) {\n\t\tvar unresolved = {};\n\t\tplugins.forEach(function(plugin) {\n\t\t\tdelete plugin.config;\n\t\t\tplugin.consumes.forEach(function(name) {\n\t\t\t\tif (unresolved[name] === false)\n\t\t\t\t\treturn;\n\t\t\t\tif (!unresolved[name])\n\t\t\t\t\tunresolved[name] = [];\n\t\t\t\tunresolved[name].push(plugin.packagePath);\n\t\t\t});\n\t\t\tplugin.provides.forEach(function(name) {\n\t\t\t\tunresolved[name] = false;\n\t\t\t});\n\t\t});\n\t\t\n\t\tObject.keys(unresolved).forEach(function(name) {\n\t\t\tif (unresolved[name] === false)\n\t\t\t\tdelete unresolved[name];\n\t\t});\n\n\t\tvar unresolvedList = Object.keys(unresolved);\n\t\tvar resolvedList = Object.keys(resolved);\n\t\tvar err  = new Error('Could not resolve dependencies\\n'\n\t\t\t+ (unresolvedList.length ? 'Missing services: ' + unresolvedList\n\t\t\t\t: 'Config contains cyclic dependencies' // TODO print cycles\n\t\t\t));\n\t\terr.unresolved = unresolvedList;\n\t\terr.resolved = resolvedList;\n\t\tthrow err;\n\t}\n\n\treturn sorted;\n}\n\nfunction Architect(config) {\n\tvar app = this;\n\tapp.config = config;\n\tapp.packages = {};\n\tapp.pluginToPackage = {};\n\n\tapp.preHookData = {};\n\tapp.postHookData = {};\n\t\n\tvar isAdditionalMode;\n\tvar services = app.services = {\n\t\thub: {\n\t\t\ton: function (name, callback) {\n\t\t\t\tapp.on(name, callback);\n\t\t\t}\n\t\t},\n\n\t\t/**\n\t\t * These objects store the functions to be called for the given services\n\t\t *  -> preHookData contains functions to be called before the original\n\t\t * \t   function, and it may change the flow of the program\n\t\t * \t\t- it can change the arguments given to the original function\n\t\t * \t\t- it can stop or modify the logical flow of the program\n\t\t * \n\t\t * -> postHookData contains functions to be called after or instead the\n\t\t *    original function\n\t\t * \n\t\t * Both functions are required to know the *name* of the service, \n\t\t * the *name* of the function that is to be hooked and the function\n\t\t * as a target.\n\t\t * \t\n\t\t * Both functions return a disposable object\n\t\t * \n\t\t * Example: \n\t\t * \n\t\t * \t\tlet destroy = studio.hooks.addPreHook(...); -> creates the object\n\t\t * \t\t.....\n\t\t * \t\tdestroy(); -> disposes the object\n\t\t */\n\t\thooks: {\n\t\t\taddPreHook (serviceName, serviceFunction, fn)\n\t\t\t{\n\t\t\t\tif (!app.preHookData[serviceName + '.' + serviceFunction])\n\t\t\t\t\tapp.preHookData[serviceName + '.' + serviceFunction] = [];\n\t\t\t\tapp.preHookData[serviceName + '.' + serviceFunction].push(fn);\n\t\t\t\treturn () => {\n\t\t\t\t\tdelete app.preHookData[serviceName + '.' + serviceFunction];\n\t\t\t\t};\n\t\t\t},\n\t\t\taddPostHook (serviceName, serviceFunction, fn)\n\t\t\t{\n\t\t\t\tif (!app.postHookData[serviceName + '.' + serviceFunction])\n\t\t\t\t\tapp.postHookData[serviceName + '.' + serviceFunction] = [];\n\t\t\t\tapp.postHookData[serviceName + '.' + serviceFunction].push(fn);\n\t\t\t\treturn () => {\n\t\t\t\t\tdelete app.postHookData[serviceName + '.' + serviceFunction];\n\t\t\t\t};\n\t\t\t},\n\t\t}\n\t};\n\n\t// Check the config\n\tvar sortedPlugins = checkConfig(config);\n\n\tvar destructors = [];\n\tvar recur = 0, callnext, ready;\n\tfunction startPlugins(additional) {\n\t\tvar plugin = sortedPlugins.shift();\n\t\tif (!plugin) {\n\t\t\tready = true;\n\t\t\treturn app.emit(additional ? 'ready-additional' : 'ready', app);\n\t\t}\n\n\t\tvar imports = {};\n\t\tif (plugin.consumes) {\n\t\t\tplugin.consumes.forEach(function (name) {\n\t\t\t\timports[name] = services[name];\n\t\t\t});\n\t\t}\n\t\t\n\t\tvar m = /^plugins\\/([^/]+)|\\/plugins\\/[^/]+\\/([^/]+)/.exec(plugin.packagePath);\n\t\tvar packageName = m && (m[1] || m[2]);\n\t\tif (!app.packages[packageName]) app.packages[packageName] = [];\n\t\t\n\t\tif (DEBUG) {\n\t\t\trecur++;\n\t\t\tplugin.setup(plugin, imports, register);\n\t\t\t\n\t\t\twhile (callnext && recur <= 1) {\n\t\t\t\tcallnext = false;\n\t\t\t\tstartPlugins(additional);\n\t\t\t}\n\t\t\trecur--;\n\t\t}\n\t\telse {\n\t\t\ttry {\n\t\t\t\trecur++;\n\t\t\t\tplugin.setup(plugin, imports, register);\n\t\t\t} catch (e) {\n\t\t\t\te.plugin = plugin;\n\t\t\t\tapp.emit('error', e);\n\t\t\t\tthrow e;\n\t\t\t} finally {\n\t\t\t\twhile (callnext && recur <= 1) {\n\t\t\t\t\tcallnext = false;\n\t\t\t\t\tstartPlugins(additional);\n\t\t\t\t}\n\t\t\t\trecur--;\n\t\t\t}\n\t\t}\n\t\t\n\t\tfunction register(err, provided) {\n\t\t\tif (err) { return app.emit('error', err); }\n\t\t\tplugin.provides.forEach(function (name) {\n\t\t\t\tif (!Object.prototype.hasOwnProperty.call (provided, name)) {\n\t\t\t\t\tvar err = new Error('Plugin failed to provide ' + name + ' service. ' + JSON.stringify(plugin));\n\t\t\t\t\terr.plugin = plugin;\n\t\t\t\t\treturn app.emit('error', err);\n\t\t\t\t}\n\t\t\t\t// PROXY\n\t\t\t\tprovided[name].__name = name;\n\t\t\t\tfor (let prop of Object.keys (provided[name]))\n\t\t\t\t{\n\t\t\t\t\tif (_.isFunction (provided[name][prop]) && !provided[name]['__no_hook_'+prop])\n\t\t\t\t\t{\n\t\t\t\t\t\tprovided[name]['__'+prop] = provided[name][prop];\n\t\t\t\t\t\tprovided[name][prop] = hookFunction.bind (app, provided[name], prop);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tservices[name] = provided[name];\n\t\t\t\tapp.pluginToPackage[name] = {\n\t\t\t\t\tpath: plugin.packagePath,\n\t\t\t\t\tpackage: packageName,\n\t\t\t\t\tversion: plugin.version,\n\t\t\t\t\tisAdditionalMode: isAdditionalMode\n\t\t\t\t};\n\t\t\t\tapp.packages[packageName].push(name);\n\t\t\t\t\n\t\t\t\tapp.emit('service', name, services[name], plugin);\n\t\t\t});\n\t\t\tif (provided && Object.prototype.hasOwnProperty.call (provided, 'onDestroy'))\n\t\t\t\tdestructors.push(provided.onDestroy);\n\n\t\t\tapp.emit('plugin', plugin);\n\t\t\t\n\t\t\tif (recur) return (callnext = true);\n\t\t\tstartPlugins(additional);\n\t\t}\n\t}\n\t\n\tfunction hookFunction(target, prop, ...args) \n\t{ \n\t\t// console.log('[hookFunction]');\n\t\t//console.log('\\t' + target.__name + '.' + prop);\n\t\tlet preResult = null;\n\t\tlet result = {};\n\t\tlet postResult = {};\n\n\t\tlet preHook = app.preHookData[target.__name + '.' + prop];\n\t\tlet postHook = app.postHookData[target.__name + '.' + prop];\n\t\t\n\t\t// check if there are preHooks to be called\n\t\tif (preHook)\n\t\t{\n\t\t\t// set the args for the next call\n\t\t\tpreResult = {\n\t\t\t\t'args': args\n\t\t\t};\t\n\n\t\t\t// iterate through the array of functions\n\t\t\tfor (let fn of preHook)\n\t\t\t{\n\t\t\t\t// run the preHook \n\t\t\t\tif (_.isFunction(fn))\n\t\t\t\t{\n\t\t\t\t\tlet oldArgs = preResult.args;\n\t\t\t\t\tpreResult = fn (...oldArgs);\n\n\t\t\t\t\t/**\n\t\t\t\t\t * set the args if the preHook function \n\t\t\t\t\t * returns undefined || null\n\t\t\t\t\t */ \n\t\t\t\t\tif (!preResult) \n\t\t\t\t\t\tpreResult = {\n\t\t\t\t\t\t\targs: oldArgs\n\t\t\t\t\t\t};\n\n\t\t\t\t\t// stop if abort is true\n\t\t\t\t\tif (preResult.abort)\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (!preResult)\n\t\t\tpreResult = {\n\t\t\t\targs: args\n\t\t\t};\n\n\t\t// check if the original function is to be called\n\t\t// set the result\n\t\tif (_.isFunction(target['__'+prop]) && preResult.abort !== true)\n\t\t{\n\t\t\tresult = target['__'+prop] (...preResult.args);\n\t\t}\n\t\telse \n\t\t{\n\t\t\tresult = preResult.ret;\n\t\t}\n\t\t\n\t\t// check to see if there is any postHook function to call\n\t\tif (postHook)\n\t\t{\n\t\t\tpostResult = result;\n\n\t\t\t// iterate through the array\n\t\t\tfor (let fn of postHook)\n\t\t\t{\n\t\t\t\t// run the postHook\n\t\t\t\tif (_.isFunction(fn)) {\n\t\t\t\t\tlet oldRes = postResult;\n\t\t\t\t\tpostResult = fn (oldRes, ...preResult.args);\n\t\t\t\t}\n\t\t\t}\n\t\t\tresult = postResult;\n\t\t}\n\t\t\n\t\treturn result;\n\t}\n\n\t// Give createApp some time to subscribe to our 'ready' event\n\t(typeof process === 'object' ? process.nextTick : setTimeout)(startPlugins);\n\n\tthis.loadAdditionalPlugins = function(additionalConfig, callback){\n\t\tisAdditionalMode = true;\n\t\t\n\t\texports.resolveConfig(additionalConfig, function (err, additionalConfig) {\n\t\t\tif (err) return callback(err);\n\t\t\t\n\t\t\tapp.once(ready ? 'ready-additional' : 'ready', function(app){\n\t\t\t\tcallback(null, app);\n\t\t\t}); // What about error state?\n\t\t\t\n\t\t\t// Check the config - hopefully this works\n\t\t\tvar _sortedPlugins = checkConfig(additionalConfig, function(name){\n\t\t\t\treturn services[name];\n\t\t\t});\n\t\t\t\n\t\t\tif (ready) {\n\t\t\t\tsortedPlugins = _sortedPlugins;\n\t\t\t\t// Start Loading additional plugins\n\t\t\t\tstartPlugins(true);\n\t\t\t}\n\t\t\telse {\n\t\t\t\t_sortedPlugins.forEach(function(item){\n\t\t\t\t\tsortedPlugins.push(item);\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t};\n\n\tthis.destroy = function() {\n\t\tdestructors.forEach(function(destroy) {\n\t\t\tdestroy();\n\t\t});\n\n\t\tdestructors = [];\n\t};\n}\nArchitect.prototype = Object.create(EventEmitter.prototype, {constructor:{value:Architect}});\n\nArchitect.prototype.getService = function(name) {\n\tif (!this.services[name]) {\n\t\tthrow new Error('Service \\'' + name + '\\' not found in architect app!');\n\t}\n\treturn this.services[name];\n};\n\n// Returns an event emitter that represents the app.  It can emit events.\n// event: ('service' name, service) emitted when a service is ready to be consumed.\n// event: ('plugin', plugin) emitted when a plugin registers.\n// event: ('ready', app) emitted when all plugins are ready.\n// event: ('error', err) emitted when something goes wrong.\n// app.services - a hash of all the services in this app\n// app.config - the plugin config that was passed in.\nfunction createApp(config, callback) {\n\tvar app;\n\ttry {\n\t\tapp = new Architect(config);\n\t} catch(err) {\n\t\tif (!callback) throw err;\n\t\treturn callback(err, app);\n\t}\n\tif (callback) {\n\t\tapp.on('error', done);\n\t\tapp.on('ready', onReady);\n\t}\n\n\tfunction onReady(/*app*/) {\n\t\tdone();\n\t}\n\n\tfunction done(err) {\n\t\tif (err) {\n\t\t\tapp.destroy();\n\t\t}\n\t\tapp.removeListener('error', done);\n\t\tapp.removeListener('ready', onReady);\n\t\tcallback(err, app);\n\t}\n\n\treturn app;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ 5)))\n\n//# sourceURL=webpack:///./source/server/architect.js?")},23:
/*!******************************!*\
  !*** ./source/ui/plugins.js ***!
  \******************************/
/*! no static exports found */function(module,exports,__webpack_require__){eval('async function loadPlugins (progress = () => {}) {\n\tvar plugins = [];\n\tvar index = 0;\n\n\tlet plugin0 = Promise.all(/*! import() */[__webpack_require__.e("../vendor"), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ../plugins/application/ui.ts */ 170)).then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin application has not setup function"); } else { plugins.push ({folder: \'\', name:\'application\', consumes:[], provides:["application"], setup: setupFunction }); } index=index+1; progress (\'/application\', index, 3); });\n\tlet plugin1 = Promise.all(/*! import() */[__webpack_require__.e("../vendor"), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, /*! ../plugins/image-display/ui/ui.ts */ 179)).then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin image-display has not setup function"); } else { plugins.push ({folder: \'\', name:\'image-display\', consumes:["application","workspace"], provides:["image_display"], setup: setupFunction }); } index=index+1; progress (\'/image-display\', index, 3); });\n\tlet plugin2 = Promise.all(/*! import() */[__webpack_require__.e("../vendor"), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../plugins/workspace/ui.ts */ 182)).then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin workspace has not setup function"); } else { plugins.push ({folder: \'\', name:\'workspace\', consumes:["application"], provides:["workspace"], setup: setupFunction }); } index=index+1; progress (\'/workspace\', index, 3); });\n\tawait Promise.all ([plugin0, plugin1, plugin2, ]);\n\tprogress (\'Your workspace is almost ready ...\');\n\treturn plugins;\n}\nmodule.exports.loadPlugins = loadPlugins;\n\n\n//# sourceURL=webpack:///./source/ui/plugins.js?')}});