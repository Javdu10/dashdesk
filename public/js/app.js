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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

window.App = {
  resizeChart: function resizeChart(height, width) {
    if (!window.Chart) return 'oups';
    window.Chart.applyOptions({
      width: width,
      height: height
    });
    window.Chart.timeScale().fitContent();
  },
  setActiveLink: function setActiveLink(coin) {
    document.querySelectorAll('.nav-link').forEach(function (el) {
      el.classList.remove('active');
    });
    document.getElementById('nav-' + coin).classList.add('active');
  },
  setCoinInfo: function setCoinInfo(coin) {
    document.getElementById('volume').innerText = window.coins[coin].last_volume;
    document.getElementById('price').innerText = window.coins[coin].last_price;
    document.getElementById('marketcap').innerText = window.coins[coin].last_marketcap;
    document.getElementById('description').innerText = window.coins[coin].description;
    document.getElementById('title').innerText = coin.toUpperCase();
  },
  initChart: function initChart(coin, date) {
    if (date) window.currentTime = date;
    var uri = 'api/coin/' + coin + (window.currentTime ? '?from=' + window.currentTime : '');
    axios.get(uri).then(function (response) {
      var el = document.getElementById('parent-chart');

      if (!window.Chart) {
        window.Chart = LightweightCharts.createChart(document.getElementById('chart'), {
          width: el.offsetWidth,
          height: el.offsetHeight,
          layout: {
            backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-primary'),
            textColor: getComputedStyle(document.body).getPropertyValue('--text-primary')
          }
        });
      }

      if (!window.Serie) window.Serie = window.Chart.addLineSeries();else {
        window.Chart.removeSeries(window.Serie);
        window.Serie = window.Chart.addLineSeries();
      }
      var sorted = response.data.prices.sort(function (a, b) {
        return a.id - b.id;
      });
      window.Serie.setData(sorted);
      window.Chart.timeScale().fitContent();
    })["catch"](function (error) {
      console.error('No coin', error);
    });
    window.currentCoin = coin;
  },
  setChart: function setChart(coin, date) {
    this.setActiveLink(coin);
    this.setCoinInfo(coin);
    this.initChart(coin, date);
  },
  setChartDataFrom: function setChartDataFrom(date) {
    this.setChart(window.currentCoin, date);
  }
};

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
try {
  // window.Popper = require('popper.js').default;
  // window.$ = window.jQuery = require('jquery');
  __webpack_require__(/*! ./tradingview.js */ "./resources/js/tradingview.js");
} catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo';
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

/***/ }),

/***/ "./resources/js/tradingview.js":
/*!*************************************!*\
  !*** ./resources/js/tradingview.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * @license
 * TradingView Lightweight Charts v3.1.1
 * Copyright (c) 2020 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
!function () {
  "use strict";

  var t, i;

  function n(t, i) {
    var n,
        h = ((n = {})[0] = [], n[1] = [t.lineWidth, t.lineWidth], n[2] = [2 * t.lineWidth, 2 * t.lineWidth], n[3] = [6 * t.lineWidth, 6 * t.lineWidth], n[4] = [t.lineWidth, 4 * t.lineWidth], n)[i];
    t.setLineDash(h);
  }

  function h(t, i, n, h) {
    t.beginPath();
    var s = t.lineWidth % 2 ? .5 : 0;
    t.moveTo(n, i + s), t.lineTo(h, i + s), t.stroke();
  }

  !function (t) {
    t[t.Simple = 0] = "Simple", t[t.WithSteps = 1] = "WithSteps";
  }(t || (t = {})), function (t) {
    t[t.Solid = 0] = "Solid", t[t.Dotted = 1] = "Dotted", t[t.Dashed = 2] = "Dashed", t[t.LargeDashed = 3] = "LargeDashed", t[t.SparseDotted = 4] = "SparseDotted";
  }(i || (i = {}));

  var _s = function s(t, i) {
    return (_s = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, i) {
      t.__proto__ = i;
    } || function (t, i) {
      for (var n in i) {
        i.hasOwnProperty(n) && (t[n] = i[n]);
      }
    })(t, i);
  };

  function r(t, i) {
    function n() {
      this.constructor = t;
    }

    _s(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, new n());
  }

  var _e = function e() {
    return (_e = Object.assign || function (t) {
      for (var i, n = 1, h = arguments.length; n < h; n++) {
        for (var s in i = arguments[n]) {
          Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
        }
      }

      return t;
    }).apply(this, arguments);
  };

  function u() {
    for (var t = 0, i = 0, n = arguments.length; i < n; i++) {
      t += arguments[i].length;
    }

    var h = Array(t),
        s = 0;

    for (i = 0; i < n; i++) {
      for (var r = arguments[i], e = 0, u = r.length; e < u; e++, s++) {
        h[s] = r[e];
      }
    }

    return h;
  }

  function o(t, i) {
    if (!t) throw new Error("Assertion failed" + (i ? ": " + i : ""));
  }

  function a(t) {
    if (void 0 === t) throw new Error("Value is undefined");
    return t;
  }

  function l(t) {
    if (null === t) throw new Error("Value is null");
    return t;
  }

  function f(t) {
    return l(a(t));
  }

  function c(t) {
    for (var i = [], n = 1; n < arguments.length; n++) {
      i[n - 1] = arguments[n];
    }

    for (var h = 0, s = i; h < s.length; h++) {
      var r = s[h];

      for (var e in r) {
        void 0 !== r[e] && ("object" != _typeof(r[e]) || void 0 === t[e] ? t[e] = r[e] : c(t[e], r[e]));
      }
    }

    return t;
  }

  function v(t) {
    return "number" == typeof t && isFinite(t);
  }

  function _(t) {
    return "number" == typeof t && t % 1 == 0;
  }

  function d(t) {
    return "string" == typeof t;
  }

  function w(t) {
    return "boolean" == typeof t;
  }

  function M(t) {
    var i,
        n,
        h,
        s = t;
    if (!s || "object" != _typeof(s)) return s;

    for (n in i = Array.isArray(s) ? [] : {}, s) {
      s.hasOwnProperty(n) && (h = s[n], i[n] = h && "object" == _typeof(h) ? M(h) : h);
    }

    return i;
  }

  function b(t) {
    return null !== t;
  }

  function m(t) {
    return null === t ? void 0 : t;
  }

  var g = function () {
    function t() {
      this.t = [];
    }

    return t.prototype.i = function (t) {
      this.t = t;
    }, t.prototype.h = function (t, i, n, h) {
      this.t.forEach(function (s) {
        t.save(), s.h(t, i, n, h), t.restore();
      });
    }, t;
  }(),
      p = function () {
    function t() {}

    return t.prototype.h = function (t, i, n, h) {
      t.save(), t.scale(i, i), this.s(t, n, h), t.restore();
    }, t.prototype.u = function (t, i, n, h) {
      t.save(), t.scale(i, i), this.o(t, n, h), t.restore();
    }, t.prototype.o = function (t, i, n) {}, t;
  }(),
      y = function (t) {
    function i() {
      var i = null !== t && t.apply(this, arguments) || this;
      return i.l = null, i;
    }

    return r(i, t), i.prototype.v = function (t) {
      this.l = t;
    }, i.prototype.s = function (t) {
      if (null !== this.l && null !== this.l._) {
        var i = this.l._,
            n = this.l,
            h = function h(_h) {
          t.beginPath();

          for (var s = i.to - 1; s >= i.from; --s) {
            var r = n.M[s];
            t.moveTo(r.m, r.g), t.arc(r.m, r.g, _h, 0, 2 * Math.PI);
          }

          t.fill();
        };

        t.fillStyle = n.p, h(n.k + 2), t.fillStyle = n.N, h(n.k);
      }
    }, i;
  }(p);

  var k,
      x,
      N,
      S = {
    from: 0,
    to: 1
  },
      D = function () {
    function t(t, i) {
      this.S = new g(), this.D = [], this.C = [], this.T = !0, this.A = t, this.L = i, this.S.i(this.D);
    }

    return t.prototype.B = function (t) {
      var i = this,
          n = this.A.F();
      n.length !== this.D.length && (this.C = n.map(function () {
        return {
          M: [{
            m: 0,
            g: 0,
            V: 0,
            O: 0
          }],
          N: "",
          p: i.A.P().layout.backgroundColor,
          k: 0,
          _: null
        };
      }), this.D = this.C.map(function (t) {
        var i = new y();
        return i.v(t), i;
      }), this.S.i(this.D)), this.T = !0;
    }, t.prototype.I = function (t, i, n) {
      return this.T && (this.W(), this.T = !1), this.S;
    }, t.prototype.W = function () {
      var t = this,
          i = this.A.F(),
          n = this.L.R(),
          h = this.A.j();
      i.forEach(function (i, s) {
        var r = t.C[s],
            e = i.U(n);

        if (null !== e) {
          var u = l(i.q());
          r.N = i.K().Y(n).H, r.p = t.A.P().layout.backgroundColor, r.k = e.k, r.M[0].O = e.O, r.M[0].g = i.X().$(e.O, u.Z), r.M[0].V = n, r.M[0].m = h.J(n), r._ = S;
        } else r._ = null;
      });
    }, t;
  }(),
      C = function () {
    function t(t) {
      this.G = t;
    }

    return t.prototype.h = function (t, i, s, r) {
      if (null !== this.G) {
        var e = this.G.it.tt,
            u = this.G.nt.tt;

        if (e || u) {
          t.save();
          var o = Math.round(this.G.m * i),
              a = Math.round(this.G.g * i),
              l = Math.ceil(this.G.ht * i),
              f = Math.ceil(this.G.st * i);
          t.lineCap = "butt", e && o >= 0 && (t.lineWidth = Math.floor(this.G.it.rt * i), t.strokeStyle = this.G.it.et, t.fillStyle = this.G.it.et, n(t, this.G.it.ut), function (t, i, n, h) {
            t.beginPath();
            var s = t.lineWidth % 2 ? .5 : 0;
            t.moveTo(i + s, n), t.lineTo(i + s, h), t.stroke();
          }(t, o, 0, f)), u && a >= 0 && (t.lineWidth = Math.floor(this.G.nt.rt * i), t.strokeStyle = this.G.nt.et, t.fillStyle = this.G.nt.et, n(t, this.G.nt.ut), h(t, a, 0, l)), t.restore();
        }
      }
    }, t;
  }(),
      T = function () {
    function t(t) {
      this.T = !0, this.ot = {
        it: {
          rt: 1,
          ut: 0,
          et: "",
          tt: !1
        },
        nt: {
          rt: 1,
          ut: 0,
          et: "",
          tt: !1
        },
        ht: 0,
        st: 0,
        m: 0,
        g: 0
      }, this.at = new C(this.ot), this.lt = t;
    }

    return t.prototype.B = function () {
      this.T = !0;
    }, t.prototype.I = function (t, i) {
      return this.T && (this.W(), this.T = !1), this.at;
    }, t.prototype.W = function () {
      var t = this.lt.tt(),
          i = l(this.lt.ft()),
          n = i.ct().P().crosshair,
          h = this.ot;
      h.nt.tt = t && this.lt.vt(i), h.it.tt = t && this.lt._t(), h.nt.rt = n.horzLine.width, h.nt.ut = n.horzLine.style, h.nt.et = n.horzLine.color, h.it.rt = n.vertLine.width, h.it.ut = n.vertLine.style, h.it.et = n.vertLine.color, h.ht = i.dt(), h.st = i.wt(), h.m = this.lt.Mt(), h.g = this.lt.bt();
    }, t;
  }(),
      A = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    feldspar: "#d19275",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslateblue: "#8470ff",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    violetred: "#d02090",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };

  function E(t) {
    return function (t, i, n) {
      return (h = i) <= 0 || h > 0 ? i < t ? t : i > n ? n : Math.round(i) : t;
      var h;
    }(0, t, 255);
  }

  function L(t) {
    if ("transparent" === (t = t.toLowerCase())) return [0, 0, 0];
    t in A && (t = A[t]);

    var i = function (t) {
      var i = N.rgbaRe.exec(t) || N.rgbRe.exec(t);
      return null !== i ? N.parse(i) : null;
    }(t);

    if (null !== i) return i;
    var n,
        h,
        s = (n = t, null !== (h = x.re.exec(n)) ? x.parse(h) : null);
    if (null !== s) return s;

    var r = function (t) {
      var i = k.re.exec(t);
      return null !== i ? k.parse(i) : null;
    }(t);

    if (null !== r) return r;
    throw new Error("Cannot parse color: " + t);
  }

  function B(t) {
    var i,
        n = L(t);
    return {
      gt: "rgb(" + n[0] + ", " + n[1] + ", " + n[2] + ")",
      pt: (i = n, .199 * i[0] + .687 * i[1] + .114 * i[2] > 160 ? "black" : "white")
    };
  }

  function F(t, i, n, h, s, r) {
    t.fillRect(i, n, r, s), t.fillRect(i + r, n, h - 2 * r, r), t.fillRect(i + r, n + s - r, h - 2 * r, r), t.fillRect(i + h - r, n, r, s);
  }

  function V(t, i, n) {
    t.save(), t.scale(i, i), n(), t.restore();
  }

  function z(t, i, n, h, s, r) {
    t.save(), t.globalCompositeOperation = "copy", t.fillStyle = r, t.fillRect(i, n, h, s), t.restore();
  }

  !function (t) {
    t.re = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])?$/, t.parse = function (t) {
      return [E(parseInt(t[1] + t[1], 16)), E(parseInt(t[2] + t[2], 16)), E(parseInt(t[3] + t[3], 16))];
    };
  }(k || (k = {})), function (t) {
    t.re = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/, t.parse = function (t) {
      return [E(parseInt(t[1], 16)), E(parseInt(t[2], 16)), E(parseInt(t[3], 16))];
    };
  }(x || (x = {})), function (t) {
    t.rgbRe = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/, t.rgbaRe = /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/, t.parse = function (t) {
      return [E(parseInt(t[1], 10)), E(parseInt(t[2], 10)), E(parseInt(t[3], 10))];
    };
  }(N || (N = {}));

  var O,
      P = function () {
    function t(t, i) {
      this.v(t, i);
    }

    return t.prototype.v = function (t, i) {
      this.G = t, this.yt = i;
    }, t.prototype.h = function (t, i, n, h, s, r) {
      if (this.G.tt) {
        t.font = i.kt;
        var e = this.G.xt || !this.G.Nt ? i.St : 0,
            u = i.Dt,
            o = i.Ct,
            a = i.Tt,
            l = i.At,
            f = i.Et,
            c = this.G.Lt,
            v = Math.ceil(n.Bt(t, c)),
            _ = i.Ft,
            d = i.Vt + o + a,
            w = Math.ceil(.5 * d),
            M = u + v + l + f + e,
            b = this.yt.zt;
        this.yt.Ot && (b = this.yt.Ot);
        var m,
            g,
            p = (b = Math.round(b)) - w,
            y = p + d,
            k = "right" === s,
            x = k ? h : 0,
            N = Math.ceil(h * r),
            S = x;

        if (t.fillStyle = this.yt.gt, t.lineWidth = 1, t.lineCap = "butt", c) {
          k ? (m = x - e, g = (S = x - M) + f) : (S = x + M, m = x + e, g = x + u + e + l);
          var D = Math.max(1, Math.floor(r)),
              C = Math.max(1, Math.floor(u * r)),
              T = k ? N : 0,
              A = Math.round(p * r),
              E = Math.round(S * r),
              L = Math.round(b * r) - Math.floor(.5 * r),
              B = L + D + (L - A),
              F = Math.round(m * r);
          t.save(), t.beginPath(), t.moveTo(T, A), t.lineTo(E, A), t.lineTo(E, B), t.lineTo(T, B), t.fill(), t.fillStyle = this.G.Pt, t.fillRect(k ? N - C : 0, A, C, B - A), this.G.xt && (t.fillStyle = this.yt.et, t.fillRect(T, L, F - T, D)), t.textAlign = "left", t.fillStyle = this.yt.et, V(t, r, function () {
            t.fillText(c, g, y - a - _);
          }), t.restore();
        }
      }
    }, t.prototype.wt = function (t, i) {
      return this.G.tt ? t.Vt + t.Ct + t.Tt : 0;
    }, t;
  }(),
      I = function () {
    function t(t) {
      this.It = {
        zt: 0,
        et: "#FFF",
        gt: "#000"
      }, this.Wt = {
        Lt: "",
        tt: !1,
        xt: !0,
        Nt: !1,
        Pt: ""
      }, this.Rt = {
        Lt: "",
        tt: !1,
        xt: !1,
        Nt: !0,
        Pt: ""
      }, this.T = !0, this.jt = new (t || P)(this.Wt, this.It), this.Ut = new (t || P)(this.Rt, this.It);
    }

    return t.prototype.Lt = function () {
      return this.Wt.Lt;
    }, t.prototype.zt = function () {
      return this.qt(), this.It.zt;
    }, t.prototype.B = function () {
      this.T = !0;
    }, t.prototype.wt = function (t, i) {
      return void 0 === i && (i = !1), Math.max(this.jt.wt(t, i), this.Ut.wt(t, i));
    }, t.prototype.Ht = function () {
      return this.It.Ot || 0;
    }, t.prototype.Yt = function (t) {
      this.It.Ot = t;
    }, t.prototype.Kt = function () {
      return this.qt(), this.Wt.tt || this.Rt.tt;
    }, t.prototype.$t = function () {
      return this.qt(), this.Wt.tt;
    }, t.prototype.I = function (t) {
      return this.qt(), this.Wt.xt = this.Wt.xt && t.P().drawTicks, this.Rt.xt = this.Rt.xt && t.P().drawTicks, this.jt.v(this.Wt, this.It), this.Ut.v(this.Rt, this.It), this.jt;
    }, t.prototype.Xt = function () {
      return this.qt(), this.jt.v(this.Wt, this.It), this.Ut.v(this.Rt, this.It), this.Ut;
    }, t.prototype.qt = function () {
      this.T && (this.Wt.xt = !0, this.Rt.xt = !1, this.Zt(this.Wt, this.Rt, this.It));
    }, t;
  }(),
      W = function (t) {
    function i(i, n, h) {
      var s = t.call(this) || this;
      return s.lt = i, s.Jt = n, s.Gt = h, s;
    }

    return r(i, t), i.prototype.Zt = function (t, i, n) {
      t.tt = !1;
      var h = this.lt.P().horzLine;

      if (h.labelVisible) {
        var s = this.Jt.q();

        if (this.lt.tt() && !this.Jt.Qt() && null !== s) {
          var r = B(h.labelBackgroundColor);
          n.gt = r.gt, n.et = r.pt;
          var e = this.Gt(this.Jt);
          n.zt = e.zt, t.Lt = this.Jt.ti(e.O, s), t.tt = !0;
        }
      }
    }, i;
  }(I),
      R = /[1-9]/g,
      j = function () {
    function t() {
      this.G = null;
    }

    return t.prototype.v = function (t) {
      this.G = t;
    }, t.prototype.h = function (t, i, n) {
      var h = this;

      if (null !== this.G && !1 !== this.G.tt && 0 !== this.G.Lt.length) {
        t.font = i.kt;
        var s = Math.round(i.ii.Bt(t, this.G.Lt, R));

        if (!(s <= 0)) {
          t.save();
          var r = i.ni,
              e = s + 2 * r,
              u = e / 2,
              o = this.G.dt,
              a = this.G.zt,
              f = Math.floor(a - u) + .5;
          f < 0 ? (a += Math.abs(0 - f), f = Math.floor(a - u) + .5) : f + e > o && (a -= Math.abs(o - (f + e)), f = Math.floor(a - u) + .5);
          var c = f + e,
              v = 0 + i.Dt + i.Ct + i.Vt + i.Tt;
          t.fillStyle = this.G.gt;

          var _ = Math.round(f * n),
              d = Math.round(0 * n),
              w = Math.round(c * n),
              M = Math.round(v * n);

          t.fillRect(_, d, w - _, M - d);
          var b = Math.round(this.G.zt * n),
              m = d,
              g = Math.round((m + i.Dt + i.St) * n);
          t.fillStyle = this.G.et;
          var p = Math.max(1, Math.floor(n)),
              y = Math.floor(.5 * n);
          t.fillRect(b - y, m, p, g - m);
          var k = v - i.Ft - i.Tt;
          t.textAlign = "left", t.fillStyle = this.G.et, V(t, n, function () {
            t.fillText(l(h.G).Lt, f + r, k);
          }), t.restore();
        }
      }
    }, t;
  }(),
      U = function () {
    function t(t, i, n) {
      this.T = !0, this.at = new j(), this.ot = {
        tt: !1,
        gt: "#4c525e",
        et: "white",
        Lt: "",
        dt: 0,
        zt: NaN
      }, this.L = t, this.hi = i, this.Gt = n;
    }

    return t.prototype.B = function () {
      this.T = !0;
    }, t.prototype.I = function () {
      return this.T && (this.W(), this.T = !1), this.at.v(this.ot), this.at;
    }, t.prototype.W = function () {
      var t = this.ot;
      t.tt = !1;
      var i = this.L.P().vertLine;

      if (i.labelVisible) {
        var n = this.hi.j();

        if (!n.Qt()) {
          var h = n.si(this.L.R());
          t.dt = n.dt();
          var s = this.Gt();

          if (s.V) {
            t.zt = s.zt, t.Lt = n.ri(l(h)), t.tt = !0;
            var r = B(i.labelBackgroundColor);
            t.gt = r.gt, t.et = r.pt;
          }
        }
      }
    }, t;
  }(),
      q = function () {
    function t() {
      this.ei = null, this.ui = 0;
    }

    return t.prototype.oi = function () {
      return this.ui;
    }, t.prototype.ai = function (t) {
      this.ui = t;
    }, t.prototype.X = function () {
      return this.ei;
    }, t.prototype.li = function (t) {
      this.ei = t;
    }, t.prototype.fi = function (t, i) {
      return [];
    }, t.prototype.ci = function (t) {
      return [];
    }, t.prototype.vi = function () {
      return [];
    }, t;
  }();

  !function (t) {
    t[t.Normal = 0] = "Normal", t[t.Magnet = 1] = "Magnet";
  }(O || (O = {}));

  var H = function (t) {
    function i(i, n) {
      var h = t.call(this) || this;
      h._i = null, h.di = NaN, h.wi = 0, h.Mi = !0, h.bi = new Map(), h.mi = !1, h.gi = NaN, h.pi = NaN, h.yi = NaN, h.ki = NaN, h.hi = i, h.xi = n, h.Ni = new D(i, h);
      var s, r;
      h.Si = (s = function s() {
        return h.di;
      }, r = function r() {
        return h.pi;
      }, function (t) {
        var i = r(),
            n = s();
        if (t === l(h._i).Di()) return {
          O: n,
          zt: i
        };
        var e = l(t.q());
        return {
          O: t.Ci(i, e),
          zt: i
        };
      });

      var e = function (t, i) {
        return function () {
          return {
            V: h.hi.j().si(t()),
            zt: i()
          };
        };
      }(function () {
        return h.wi;
      }, function () {
        return h.Mt();
      });

      return h.Ti = new U(h, i, e), h.Ai = new T(h), h;
    }

    return r(i, t), i.prototype.P = function () {
      return this.xi;
    }, i.prototype.Ei = function (t, i) {
      this.yi = t, this.ki = i;
    }, i.prototype.Li = function () {
      this.yi = NaN, this.ki = NaN;
    }, i.prototype.Bi = function () {
      return this.yi;
    }, i.prototype.Fi = function () {
      return this.ki;
    }, i.prototype.Vi = function (t, i, n) {
      this.mi || (this.mi = !0), this.Mi = !0, this.zi(t, i, n);
    }, i.prototype.R = function () {
      return this.wi;
    }, i.prototype.Mt = function () {
      return this.gi;
    }, i.prototype.bt = function () {
      return this.pi;
    }, i.prototype.tt = function () {
      return this.Mi;
    }, i.prototype.Oi = function () {
      this.Mi = !1, this.Pi(), this.di = NaN, this.gi = NaN, this.pi = NaN, this._i = null, this.Li();
    }, i.prototype.ci = function (t) {
      return null !== this._i ? [this.Ai, this.Ni] : [];
    }, i.prototype.vt = function (t) {
      return t === this._i && this.xi.horzLine.visible;
    }, i.prototype._t = function () {
      return this.xi.vertLine.visible;
    }, i.prototype.fi = function (t, i) {
      this.Mi && this._i === t || this.bi.clear();
      var n = [];
      return this._i === t && n.push(this.Ii(this.bi, i, this.Si)), n;
    }, i.prototype.vi = function () {
      return this.Mi ? [this.Ti] : [];
    }, i.prototype.ft = function () {
      return this._i;
    }, i.prototype.Wi = function () {
      this.Ai.B(), this.bi.forEach(function (t) {
        return t.B();
      }), this.Ti.B(), this.Ni.B();
    }, i.prototype.Ri = function (t) {
      return t && !t.Di().Qt() ? t.Di() : null;
    }, i.prototype.zi = function (t, i, n) {
      this.ji(t, i, n) && this.Wi();
    }, i.prototype.ji = function (t, i, n) {
      var h = this.gi,
          s = this.pi,
          r = this.di,
          e = this.wi,
          u = this._i,
          o = this.Ri(n);
      this.wi = t, this.gi = isNaN(t) ? NaN : this.hi.j().J(t), this._i = n;
      var a = null !== o ? o.q() : null;
      return null !== o && null !== a ? (this.di = i, this.pi = o.$(i, a)) : (this.di = NaN, this.pi = NaN), h !== this.gi || s !== this.pi || e !== this.wi || r !== this.di || u !== this._i;
    }, i.prototype.Pi = function () {
      var t = this.hi.F().map(function (t) {
        return t.qi().Ui();
      }).filter(b),
          i = 0 === t.length ? null : Math.max.apply(Math, t);
      this.wi = null !== i ? i : NaN;
    }, i.prototype.Ii = function (t, i, n) {
      var h = t.get(i);
      return void 0 === h && (h = new W(this, i, n), t.set(i, h)), h;
    }, i;
  }(q),
      Y = ".",
      K = "'";

  function $(t, i) {
    if (!v(t)) return "n/a";
    if (!_(i)) throw new TypeError("invalid length");
    if (i < 0 || i > 16) throw new TypeError("invalid length");
    if (0 === i) return t.toString();
    return ("0000000000000000" + t.toString()).slice(-i);
  }

  var X = function () {
    function t(t, i, n, h) {
      if (i || (i = 1), v(t) && _(t) || (t = 100), t < 0) throw new TypeError("invalid base");
      this.Jt = t, this.Hi = i, this.Yi = h, n && void 0 !== h && h > 0 && 2 !== h && 4 !== h && 8 !== h || (this.Ki = n, this.$i());
    }

    return t.prototype.Xi = function (t) {
      var i = t < 0 ? "−" : "";
      return t = Math.abs(t), this.Ki ? i + this.Zi(t) : i + this.Ji(t);
    }, t.prototype.$i = function () {
      if (this.Gi = 0, this.Jt > 0 && this.Hi > 0) {
        var t = this.Jt;

        for (this.Ki && this.Yi && (t /= this.Yi); t > 1;) {
          t /= 10, this.Gi++;
        }
      }
    }, t.prototype.Ji = function (t) {
      var i;
      i = this.Ki ? Math.pow(10, this.Gi || 0) : this.Jt / this.Hi;
      var n = Math.floor(t),
          h = "",
          s = void 0 !== this.Gi ? this.Gi : NaN;

      if (i > 1) {
        var r = +(Math.round(t * i) - n * i).toFixed(this.Gi);
        r >= i && (r -= i, n += 1), h = Y + $(+r.toFixed(this.Gi) * this.Hi, s);
      } else n = Math.round(n * i) / i, s > 0 && (h = Y + $(0, s));

      return n.toFixed(0) + h;
    }, t.prototype.Zi = function (t) {
      var i = this.Jt / this.Hi,
          n = Math.floor(t),
          h = Math.round(t * i) - n * i;
      if (h === i && (h = 0, n += 1), !this.Gi) throw new Error("_fractionalLength is not calculated");
      var s = "";

      if (this.Yi) {
        var r = h % this.Yi,
            e = $(h = (h - r) / this.Yi, this.Gi),
            u = 2 === this.Yi ? ["0", "5"][r] : 8 === this.Yi ? ["0", "1", "2", "3", "4", "5", "6", "7"][r] : ["0", "2", "5", "7"][r];
        s = e + K + u;
      } else s = $(h * this.Hi, this.Gi);

      return n.toString() + K + s;
    }, t;
  }(),
      Z = function (t) {
    function i(i) {
      return void 0 === i && (i = 100), t.call(this, i) || this;
    }

    return r(i, t), i.prototype.Xi = function (i) {
      return t.prototype.Xi.call(this, i) + "%";
    }, i;
  }(X),
      J = function () {
    function t() {
      this.Qi = [];
    }

    return t.prototype.tn = function (t, i, n) {
      var h = {
        "in": t,
        nn: i,
        hn: !0 === n
      };
      this.Qi.push(h);
    }, t.prototype.sn = function (t) {
      var i = this.Qi.findIndex(function (i) {
        return t === i["in"];
      });
      i > -1 && this.Qi.splice(i, 1);
    }, t.prototype.rn = function (t) {
      this.Qi = this.Qi.filter(function (i) {
        return i.nn === t;
      });
    }, t.prototype.en = function (t, i) {
      var n = u(this.Qi);
      this.Qi = this.Qi.filter(function (t) {
        return !t.hn;
      }), n.forEach(function (n) {
        return n["in"](t, i);
      });
    }, t.prototype.un = function () {
      return this.Qi.length > 0;
    }, t.prototype.on = function () {
      this.Qi = [];
    }, t;
  }(),
      G = function () {
    function t(t, i) {
      this.an = t, this.ln = i;
    }

    return t.prototype.fn = function (t) {
      return null !== t && this.an === t.an && this.ln === t.ln;
    }, t.prototype.cn = function () {
      return new t(this.an, this.ln);
    }, t.prototype.vn = function () {
      return this.an;
    }, t.prototype._n = function () {
      return this.ln;
    }, t.prototype.dn = function () {
      return this.ln - this.an;
    }, t.prototype.Qt = function () {
      return this.ln === this.an || Number.isNaN(this.ln) || Number.isNaN(this.an);
    }, t.prototype.wn = function (i) {
      return null === i ? this : new t(Math.min(this.vn(), i.vn()), Math.max(this._n(), i._n()));
    }, t.prototype.Mn = function (t) {
      if (v(t) && 0 !== this.ln - this.an) {
        var i = .5 * (this.ln + this.an),
            n = this.ln - i,
            h = this.an - i;
        n *= t, h *= t, this.ln = i + n, this.an = i + h;
      }
    }, t.prototype.bn = function (t) {
      v(t) && (this.ln += t, this.an += t);
    }, t.prototype.mn = function () {
      return {
        minValue: this.an,
        maxValue: this.ln
      };
    }, t.gn = function (i) {
      return null === i ? null : new t(i.minValue, i.maxValue);
    }, t;
  }();

  function Q(t, i, n) {
    return Math.min(Math.max(t, i), n);
  }

  function tt(t, i, n) {
    return i - t <= n;
  }

  function it(t) {
    return t <= 0 ? NaN : Math.log(t) / Math.log(10);
  }

  function nt(t) {
    var i = Math.ceil(t);
    return i % 2 != 0 ? i - 1 : i;
  }

  function ht(t) {
    var i = Math.ceil(t);
    return i % 2 == 0 ? i - 1 : i;
  }

  function st(t, i) {
    var n = 100 * (t - i) / i;
    return i < 0 ? -n : n;
  }

  function rt(t, i) {
    var n = st(t.vn(), i),
        h = st(t._n(), i);
    return new G(n, h);
  }

  function et(t, i) {
    var n = 100 * (t - i) / i + 100;
    return i < 0 ? -n : n;
  }

  function ut(t, i) {
    var n = et(t.vn(), i),
        h = et(t._n(), i);
    return new G(n, h);
  }

  function ot(t) {
    var i = Math.abs(t);
    if (i < 1e-8) return 0;
    var n = it(i + 1e-4) + 4;
    return t < 0 ? -n : n;
  }

  function at(t) {
    var i = Math.abs(t);
    if (i < 1e-8) return 0;
    var n = Math.pow(10, i - 4) - 1e-4;
    return t < 0 ? -n : n;
  }

  function lt(t) {
    if (null === t) return null;
    var i = ot(t.vn()),
        n = ot(t._n());
    return new G(i, n);
  }

  var ft,
      ct = function () {
    function t(t, i) {
      if (this.pn = t, this.yn = i, function (t) {
        if (t < 0) return !1;

        for (var i = t; i > 1; i /= 10) {
          if (i % 10 != 0) return !1;
        }

        return !0;
      }(this.pn)) this.kn = [2, 2.5, 2];else {
        this.kn = [];

        for (var n = this.pn; 1 !== n;) {
          if (n % 2 == 0) this.kn.push(2), n /= 2;else {
            if (n % 5 != 0) throw new Error("unexpected base");
            this.kn.push(2), this.kn.push(2.5), n /= 5;
          }
          if (this.kn.length > 100) throw new Error("something wrong with base");
        }
      }
    }

    return t.prototype.xn = function (t, i, n) {
      for (var h, s, r, e = 0 === this.pn ? 0 : 1 / this.pn, u = Math.pow(10, Math.max(0, Math.ceil(it(t - i)))), o = 0, a = this.yn[0];;) {
        var l = tt(u, e, 1e-9) && u > e + 1e-9,
            f = tt(u, n * a, 1e-9),
            c = tt(u, 1, 1e-9);
        if (!(l && f && c)) break;
        u /= a, a = this.yn[++o % this.yn.length];
      }

      if (u <= e + 1e-9 && (u = e), u = Math.max(1, u), this.kn.length > 0 && (h = u, s = 1, r = 1e-9, Math.abs(h - s) < r)) for (o = 0, a = this.kn[0]; tt(u, n * a, 1e-9) && u > e + 1e-9;) {
        u /= a, a = this.kn[++o % this.kn.length];
      }
      return u;
    }, t;
  }(),
      vt = function () {
    function t(t, i, n, h) {
      this.Nn = [], this.Jt = t, this.pn = i, this.Sn = n, this.Dn = h;
    }

    return t.prototype.xn = function (t, i) {
      if (t < i) throw new Error("high < low");
      var n = this.Jt.wt(),
          h = (t - i) * this.Cn() / n,
          s = new ct(this.pn, [2, 2.5, 2]),
          r = new ct(this.pn, [2, 2, 2.5]),
          e = new ct(this.pn, [2.5, 2, 2]),
          u = [];
      return u.push(s.xn(t, i, h)), u.push(r.xn(t, i, h)), u.push(e.xn(t, i, h)), function (t) {
        if (t.length < 1) throw Error("array is empty");

        for (var i = t[0], n = 1; n < t.length; ++n) {
          t[n] < i && (i = t[n]);
        }

        return i;
      }(u);
    }, t.prototype.Tn = function () {
      var t = this.Jt,
          i = t.q();

      if (null !== i) {
        var n = t.wt(),
            h = this.Sn(n - 1, i),
            s = this.Sn(0, i),
            r = this.Jt.P().entireTextOnly ? this.An() / 2 : 0,
            e = r,
            u = n - 1 - r,
            o = Math.max(h, s),
            a = Math.min(h, s);

        if (o !== a) {
          for (var l = this.xn(o, a), f = o % l, c = o >= a ? 1 : -1, v = null, _ = 0, d = o - (f += f < 0 ? l : 0); d > a; d -= l) {
            var w = this.Dn(d, i, !0);
            null !== v && Math.abs(w - v) < this.Cn() || w < e || w > u || (_ < this.Nn.length ? (this.Nn[_].En = w, this.Nn[_].Ln = t.Bn(d)) : this.Nn.push({
              En: w,
              Ln: t.Bn(d)
            }), _++, v = w, t.Fn() && (l = this.xn(d * c, a)));
          }

          this.Nn.length = _;
        } else this.Nn = [];
      } else this.Nn = [];
    }, t.prototype.Vn = function () {
      return this.Nn;
    }, t.prototype.An = function () {
      return this.Jt.Vt();
    }, t.prototype.Cn = function () {
      return Math.ceil(2.5 * this.An());
    }, t;
  }();

  function _t(t) {
    return t.slice().sort(function (t, i) {
      return l(t.oi()) - l(i.oi());
    });
  }

  !function (t) {
    t[t.Normal = 0] = "Normal", t[t.Logarithmic = 1] = "Logarithmic", t[t.Percentage = 2] = "Percentage", t[t.IndexedTo100 = 3] = "IndexedTo100";
  }(ft || (ft = {}));

  var dt,
      wt = new Z(),
      Mt = new X(100, 1),
      bt = function () {
    function t(t, i, n, h) {
      this.zn = 0, this.On = null, this.Pn = null, this.In = null, this.Wn = {
        Rn: !1,
        jn: null
      }, this.Un = 0, this.qn = 0, this.Hn = new J(), this.Yn = new J(), this.Kn = [], this.$n = null, this.Xn = null, this.Zn = null, this.Jn = null, this.Gn = Mt, this.Qn = t, this.xi = i, this.th = n, this.ih = h, this.nh = new vt(this, 100, this.hh.bind(this), this.sh.bind(this));
    }

    return t.prototype.rh = function () {
      return this.Qn;
    }, t.prototype.P = function () {
      return this.xi;
    }, t.prototype.eh = function (t) {
      if (c(this.xi, t), this.uh(), void 0 !== t.mode && this.oh({
        ah: t.mode
      }), void 0 !== t.scaleMargins) {
        var i = a(t.scaleMargins.top),
            n = a(t.scaleMargins.bottom);
        if (i < 0 || i > 1) throw new Error("Invalid top margin - expect value between 0 and 1, given=" + i);
        if (n < 0 || n > 1 || i + n > 1) throw new Error("Invalid bottom margin - expect value between 0 and 1, given=" + n);
        if (i + n > 1) throw new Error("Invalid margins - sum of margins must be less than 1, given=" + (i + n));
        this.lh(), this.Xn = null;
      }
    }, t.prototype.fh = function () {
      return this.xi.autoScale;
    }, t.prototype.Fn = function () {
      return 1 === this.xi.mode;
    }, t.prototype.vh = function () {
      return 2 === this.xi.mode;
    }, t.prototype._h = function () {
      return 3 === this.xi.mode;
    }, t.prototype.ah = function () {
      return {
        dh: this.xi.autoScale,
        wh: this.xi.invertScale,
        ah: this.xi.mode
      };
    }, t.prototype.oh = function (t) {
      var i = this.ah(),
          n = null;
      void 0 !== t.dh && (this.xi.autoScale = t.dh), void 0 !== t.ah && (this.xi.mode = t.ah, 2 !== t.ah && 3 !== t.ah || (this.xi.autoScale = !0), this.Wn.Rn = !1), 1 === i.ah && t.ah !== i.ah && (!function (t) {
        if (null === t) return !1;
        var i = at(t.vn()),
            n = at(t._n());
        return isFinite(i) && isFinite(n);
      }(this.Pn) ? this.xi.autoScale = !0 : null !== (n = function (t) {
        if (null === t) return null;
        var i = at(t.vn()),
            n = at(t._n());
        return new G(i, n);
      }(this.Pn)) && this.Mh(n)), 1 === t.ah && t.ah !== i.ah && null !== (n = lt(this.Pn)) && this.Mh(n);
      var h = i.ah !== this.xi.mode;
      h && (2 === i.ah || this.vh()) && this.uh(), h && (3 === i.ah || this._h()) && this.uh(), void 0 !== t.wh && i.wh !== t.wh && (this.xi.invertScale = t.wh, this.bh()), this.Yn.en(i, this.ah());
    }, t.prototype.mh = function () {
      return this.Yn;
    }, t.prototype.Vt = function () {
      return this.th.fontSize;
    }, t.prototype.wt = function () {
      return this.zn;
    }, t.prototype.gh = function (t) {
      this.zn !== t && (this.zn = t, this.lh(), this.Xn = null);
    }, t.prototype.ph = function () {
      if (this.On) return this.On;
      var t = this.wt() - this.yh() - this.kh();
      return this.On = t, t;
    }, t.prototype.xh = function () {
      return this.Nh(), this.Pn;
    }, t.prototype.Mh = function (t, i) {
      var n = this.Pn;
      (i || null === n && null !== t || null !== n && !n.fn(t)) && (this.Xn = null, this.Pn = t);
    }, t.prototype.Qt = function () {
      return this.Nh(), 0 === this.zn || !this.Pn || this.Pn.Qt();
    }, t.prototype.Sh = function (t) {
      return this.wh() ? t : this.wt() - 1 - t;
    }, t.prototype.$ = function (t, i) {
      return this.vh() ? t = st(t, i) : this._h() && (t = et(t, i)), this.sh(t, i);
    }, t.prototype.Dh = function (t, i, n) {
      this.Nh();

      for (var h = this.kh(), s = l(this.xh()), r = s.vn(), e = s._n(), u = this.ph() - 1, o = this.wh(), a = u / (e - r), f = void 0 === n ? 0 : n.from, c = void 0 === n ? t.length : n.to, v = this.Ch(), _ = f; _ < c; _++) {
        var d = t[_],
            w = d.O;

        if (!isNaN(w)) {
          var M = w;
          null !== v && (M = v(d.O, i));
          var b = h + a * (M - r),
              m = o ? b : this.zn - 1 - b;
          d.g = m;
        }
      }
    }, t.prototype.Th = function (t, i, n) {
      this.Nh();

      for (var h = this.kh(), s = l(this.xh()), r = s.vn(), e = s._n(), u = this.ph() - 1, o = this.wh(), a = u / (e - r), f = void 0 === n ? 0 : n.from, c = void 0 === n ? t.length : n.to, v = this.Ch(), _ = f; _ < c; _++) {
        var d = t[_],
            w = d.open,
            M = d.high,
            b = d.low,
            m = d.close;
        null !== v && (w = v(d.open, i), M = v(d.high, i), b = v(d.low, i), m = v(d.close, i));
        var g = h + a * (w - r),
            p = o ? g : this.zn - 1 - g;
        d.Ah = p, g = h + a * (M - r), p = o ? g : this.zn - 1 - g, d.Eh = p, g = h + a * (b - r), p = o ? g : this.zn - 1 - g, d.Lh = p, g = h + a * (m - r), p = o ? g : this.zn - 1 - g, d.Bh = p;
      }
    }, t.prototype.Ci = function (t, i) {
      var n = this.hh(t, i);
      return this.Fh(n, i);
    }, t.prototype.Fh = function (t, i) {
      var n = t;
      return this.vh() ? n = function (t, i) {
        return i < 0 && (t = -t), t / 100 * i + i;
      }(n, i) : this._h() && (n = function (t, i) {
        return t -= 100, i < 0 && (t = -t), t / 100 * i + i;
      }(n, i)), n;
    }, t.prototype.Vh = function () {
      return this.Kn;
    }, t.prototype.zh = function () {
      if (this.$n) return this.$n;

      for (var t = [], i = 0; i < this.Kn.length; i++) {
        var n = this.Kn[i];
        null === n.oi() && n.ai(i + 1), t.push(n);
      }

      return t = _t(t), this.$n = t, this.$n;
    }, t.prototype.Oh = function (t) {
      -1 === this.Kn.indexOf(t) && (this.Kn.push(t), this.uh(), this.Ph());
    }, t.prototype.Ih = function (t) {
      var i = this.Kn.indexOf(t);
      if (-1 === i) throw new Error("source is not attached to scale");
      this.Kn.splice(i, 1), this.Qt() && this.oh({
        dh: !0
      }), this.uh(), this.Ph();
    }, t.prototype.q = function () {
      for (var t = null, i = 0, n = this.Kn; i < n.length; i++) {
        var h = n[i].q();
        null !== h && (null === t || h.Wh < t.Wh) && (t = h);
      }

      return null === t ? null : t.Z;
    }, t.prototype.wh = function () {
      return this.xi.invertScale;
    }, t.prototype.Vn = function () {
      return this.Xn || (this.nh.Tn(), this.Xn = this.nh.Vn(), this.Hn.en()), this.Xn;
    }, t.prototype.Rh = function () {
      return this.Hn;
    }, t.prototype.jh = function (t) {
      this.vh() || this._h() || null === this.Zn && null === this.In && (this.Qt() || (this.Zn = this.zn - t, this.In = l(this.xh()).cn()));
    }, t.prototype.Uh = function (t) {
      if (!this.vh() && !this._h() && null !== this.Zn) {
        this.oh({
          dh: !1
        }), (t = this.zn - t) < 0 && (t = 0);
        var i = (this.Zn + .2 * (this.zn - 1)) / (t + .2 * (this.zn - 1)),
            n = l(this.In).cn();
        i = Math.max(i, .1), n.Mn(i), this.Mh(n);
      }
    }, t.prototype.qh = function () {
      this.vh() || this._h() || (this.Zn = null, this.In = null);
    }, t.prototype.Hh = function (t) {
      this.fh() || null === this.Jn && null === this.In && (this.Qt() || (this.Jn = t, this.In = l(this.xh()).cn()));
    }, t.prototype.Yh = function (t) {
      if (!this.fh() && null !== this.Jn) {
        var i = l(this.xh()).dn() / (this.ph() - 1),
            n = t - this.Jn;
        this.wh() && (n *= -1);
        var h = n * i,
            s = l(this.In).cn();
        s.bn(h), this.Mh(s, !0), this.Xn = null;
      }
    }, t.prototype.Kh = function () {
      this.fh() || null !== this.Jn && (this.Jn = null, this.In = null);
    }, t.prototype.$h = function () {
      return this.Gn || this.uh(), this.Gn;
    }, t.prototype.ti = function (t, i) {
      switch (this.xi.mode) {
        case 2:
          return this.$h().Xi(st(t, i));

        case 3:
          return this.$h().Xi(et(t, i));

        default:
          return this.Xh(t);
      }
    }, t.prototype.Bn = function (t) {
      switch (this.xi.mode) {
        case 2:
        case 3:
          return this.$h().Xi(t);

        default:
          return this.Xh(t);
      }
    }, t.prototype.Zh = function (t) {
      return this.Xh(t, l(this.Jh()).$h());
    }, t.prototype.Gh = function (t, i) {
      return t = st(t, i), wt.Xi(t);
    }, t.prototype.Qh = function () {
      return this.Kn;
    }, t.prototype.ts = function (t) {
      this.Wn = {
        jn: t,
        Rn: !1
      };
    }, t.prototype.Wi = function () {
      this.Kn.forEach(function (t) {
        return t.Wi();
      });
    }, t.prototype.uh = function () {
      this.Xn = null;
      var t = this.Jh(),
          i = 100;
      null !== t && (i = Math.round(1 / t.ns())), this.Gn = Mt, this.vh() ? (this.Gn = wt, i = 100) : this._h() ? (this.Gn = new X(100, 1), i = 100) : null !== t && (this.Gn = t.$h()), this.nh = new vt(this, i, this.hh.bind(this), this.sh.bind(this)), this.nh.Tn();
    }, t.prototype.Ph = function () {
      this.$n = null;
    }, t.prototype.Jh = function () {
      return this.Kn[0] || null;
    }, t.prototype.yh = function () {
      return this.wh() ? this.xi.scaleMargins.bottom * this.wt() + this.qn : this.xi.scaleMargins.top * this.wt() + this.Un;
    }, t.prototype.kh = function () {
      return this.wh() ? this.xi.scaleMargins.top * this.wt() + this.Un : this.xi.scaleMargins.bottom * this.wt() + this.qn;
    }, t.prototype.Nh = function () {
      this.Wn.Rn || (this.Wn.Rn = !0, this.hs());
    }, t.prototype.lh = function () {
      this.On = null;
    }, t.prototype.sh = function (t, i) {
      if (this.Nh(), this.Qt()) return 0;
      t = this.Fn() && t ? ot(t) : t;
      var n = l(this.xh()),
          h = this.kh() + (this.ph() - 1) * (t - n.vn()) / n.dn();
      return this.Sh(h);
    }, t.prototype.hh = function (t, i) {
      if (this.Nh(), this.Qt()) return 0;
      var n = this.Sh(t),
          h = l(this.xh()),
          s = h.vn() + h.dn() * ((n - this.kh()) / (this.ph() - 1));
      return this.Fn() ? at(s) : s;
    }, t.prototype.bh = function () {
      this.Xn = null, this.nh.Tn();
    }, t.prototype.hs = function () {
      var t = this.Wn.jn;

      if (null !== t) {
        for (var i = null, n = 0, h = 0, s = 0, r = this.Qh(); s < r.length; s++) {
          var e = r[s],
              u = e.q();

          if (null !== u) {
            var o = e.ss(t.rs(), t.es()),
                a = o && o.xh();

            if (null !== a) {
              switch (this.xi.mode) {
                case 1:
                  a = lt(a);
                  break;

                case 2:
                  a = rt(a, u.Z);
                  break;

                case 3:
                  a = ut(a, u.Z);
              }

              if (i = null === i ? a : i.wn(l(a)), null !== o) {
                var f = o.us();
                null !== f && (n = Math.max(n, f.above), h = Math.max(n, f.below));
              }
            }
          }
        }

        if (n === this.Un && h === this.qn || (this.Un = n, this.qn = h, this.Xn = null, this.lh()), null !== i) {
          if (i.vn() === i._n()) {
            var c = this.Jh(),
                v = 5 * (null === c || this.vh() || this._h() ? 1 : c.ns());
            i = new G(i.vn() - v, i._n() + v);
          }

          this.Mh(i);
        } else null === this.Pn && this.Mh(new G(-.5, .5));

        this.Wn.Rn = !0;
      }
    }, t.prototype.Ch = function () {
      return this.vh() ? st : this._h() ? et : this.Fn() ? ot : null;
    }, t.prototype.Xh = function (t, i) {
      return void 0 === this.ih.priceFormatter ? (void 0 === i && (i = this.$h()), i.Xi(t)) : this.ih.priceFormatter(t);
    }, t;
  }();

  function mt(t) {
    void 0 !== t.borderColor && (t.borderUpColor = t.borderColor, t.borderDownColor = t.borderColor), void 0 !== t.wickColor && (t.wickUpColor = t.wickColor, t.wickDownColor = t.wickColor);
  }

  !function (t) {
    t[t.LastBar = 0] = "LastBar", t[t.LastVisible = 1] = "LastVisible";
  }(dt || (dt = {}));

  var gt = function gt(t) {
    return t.getUTCFullYear();
  };

  function pt(t, i, n) {
    return i.replace(/yyyy/g, function (t) {
      return $(gt(t), 4);
    }(t)).replace(/yy/g, function (t) {
      return $(gt(t) % 100, 2);
    }(t)).replace(/MMMM/g, function (t, i) {
      return new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(i, {
        month: "long"
      });
    }(t, n)).replace(/MMM/g, function (t, i) {
      return new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(i, {
        month: "short"
      });
    }(t, n)).replace(/MM/g, function (t) {
      return $(function (t) {
        return t.getUTCMonth() + 1;
      }(t), 2);
    }(t)).replace(/dd/g, function (t) {
      return $(function (t) {
        return t.getUTCDate();
      }(t), 2);
    }(t));
  }

  var yt = function () {
    function t(t, i) {
      void 0 === t && (t = "yyyy-MM-dd"), void 0 === i && (i = "default"), this.os = t, this.as = i;
    }

    return t.prototype.Xi = function (t) {
      return pt(t, this.os, this.as);
    }, t;
  }(),
      kt = function () {
    function t(t) {
      this.ls = t || "%h:%m:%s";
    }

    return t.prototype.Xi = function (t) {
      return this.ls.replace("%h", $(t.getUTCHours(), 2)).replace("%m", $(t.getUTCMinutes(), 2)).replace("%s", $(t.getUTCSeconds(), 2));
    }, t;
  }(),
      xt = {
    fs: "yyyy-MM-dd",
    cs: "%h:%m:%s",
    vs: " ",
    _s: "default"
  },
      Nt = function () {
    function t(t) {
      void 0 === t && (t = {});

      var i = _e(_e({}, xt), t);

      this.ds = new yt(i.fs, i._s), this.ws = new kt(i.cs), this.Ms = i.vs;
    }

    return t.prototype.Xi = function (t) {
      return "" + this.ds.Xi(t) + this.Ms + this.ws.Xi(t);
    }, t;
  }();

  var St = function () {
    function t(t, i) {
      void 0 === i && (i = 50), this.bs = 0, this.ms = 1, this.gs = 1, this.ps = new Map(), this.ys = new Map(), this.ks = t, this.xs = i;
    }

    return t.prototype.Xi = function (t) {
      var i = void 0 === t.Ns ? new Date(1e3 * t.Ss).getTime() : new Date(Date.UTC(t.Ns.year, t.Ns.month - 1, t.Ns.day)).getTime(),
          n = this.ps.get(i);
      if (void 0 !== n) return n.Ds;

      if (this.bs === this.xs) {
        var h = this.ys.get(this.gs);
        this.ys["delete"](this.gs), this.ps["delete"](a(h)), this.gs++, this.bs--;
      }

      var s = this.ks(t);
      return this.ps.set(i, {
        Ds: s,
        Cs: this.ms
      }), this.ys.set(this.ms, i), this.bs++, this.ms++, s;
    }, t;
  }(),
      Dt = function () {
    function t(t, i) {
      o(t <= i, "right should be >= left"), this.Ts = t, this.As = i;
    }

    return t.prototype.rs = function () {
      return this.Ts;
    }, t.prototype.es = function () {
      return this.As;
    }, t.prototype.Es = function () {
      return this.As - this.Ts + 1;
    }, t.prototype.Ls = function (t) {
      return this.Ts <= t && t <= this.As;
    }, t.prototype.fn = function (t) {
      return this.Ts === t.rs() && this.As === t.es();
    }, t;
  }();

  function Ct(t, i) {
    return null === t || null === i ? t === i : t.fn(i);
  }

  var Tt,
      At = function () {
    function t() {
      this.Bs = new Map(), this.ps = null;
    }

    return t.prototype.Fs = function (t) {
      var i = this;
      this.ps = null, this.Bs.clear(), t.forEach(function (t, n) {
        var h = i.Bs.get(t.Vs);
        void 0 === h && (h = [], i.Bs.set(t.Vs, h)), h.push({
          zs: n,
          V: t.V,
          Os: t.Vs
        });
      });
    }, t.prototype.Ps = function (t, i) {
      var n = Math.ceil(i / t);
      return null !== this.ps && this.ps.Is === n || (this.ps = {
        Vn: this.Ws(n),
        Is: n
      }), this.ps.Vn;
    }, t.prototype.Ws = function (t) {
      for (var i = [], n = 0, h = Array.from(this.Bs.keys()).sort(function (t, i) {
        return i - t;
      }); n < h.length; n++) {
        var s = h[n];

        if (this.Bs.get(s)) {
          var r = i;
          i = [];

          for (var e = r.length, u = 0, o = a(this.Bs.get(s)), l = o.length, f = 1 / 0, c = -1 / 0, v = 0; v < l; v++) {
            for (var _ = o[v], d = _.zs; u < e;) {
              var w = r[u],
                  M = w.zs;

              if (!(M < d)) {
                f = M;
                break;
              }

              u++, i.push(w), c = M, f = 1 / 0;
            }

            f - d >= t && d - c >= t && (i.push(_), c = d);
          }

          for (; u < e; u++) {
            i.push(r[u]);
          }
        }
      }

      return i;
    }, t;
  }(),
      Et = function () {
    function t(t) {
      this.Rs = t;
    }

    return t.prototype.js = function () {
      return null === this.Rs ? null : new Dt(Math.floor(this.Rs.rs()), Math.ceil(this.Rs.es()));
    }, t.prototype.Us = function () {
      return this.Rs;
    }, t.qs = function () {
      return new t(null);
    }, t;
  }();

  !function (t) {
    t[t.Year = 0] = "Year", t[t.Month = 1] = "Month", t[t.DayOfMonth = 2] = "DayOfMonth", t[t.Time = 3] = "Time", t[t.TimeWithSeconds = 4] = "TimeWithSeconds";
  }(Tt || (Tt = {}));

  var Lt = function () {
    function t(t, i, n) {
      this.Hs = 0, this.Ys = null, this.Ks = [], this.Jn = null, this.Zn = null, this.$s = new At(), this.Xs = new Map(), this.Zs = Et.qs(), this.Js = !0, this.Gs = new J(), this.Qs = new J(), this.tr = new J(), this.ir = null, this.nr = null, this.hr = [], this.xi = i, this.ih = n, this.sr = i.rightOffset, this.rr = i.barSpacing, this.hi = t, this.er();
    }

    return t.prototype.P = function () {
      return this.xi;
    }, t.prototype.ur = function (t) {
      c(this.ih, t), this.or(), this.er();
    }, t.prototype.eh = function (t, i) {
      c(this.xi, t), this.xi.fixLeftEdge && this.ar(), void 0 !== t.barSpacing && this.lr(t.barSpacing), void 0 !== t.rightOffset && this.cr(t.rightOffset), this.or(), this.er(), this.tr.en();
    }, t.prototype.si = function (t) {
      var i;
      return (null === (i = this.Ks[t]) || void 0 === i ? void 0 : i.V) || null;
    }, t.prototype.vr = function (t, i) {
      if (this.Ks.length < 1) return null;
      if (t.Ss > this.Ks[this.Ks.length - 1].V.Ss) return i ? this.Ks.length - 1 : null;

      for (var n = 0; n < this.Ks.length; ++n) {
        if (t.Ss === this.Ks[n].V.Ss) return n;
        if (t.Ss < this.Ks[n].V.Ss) return i ? n : null;
      }

      return null;
    }, t.prototype.Qt = function () {
      return 0 === this.Hs || 0 === this.Ks.length;
    }, t.prototype._r = function () {
      return this.dr(), this.Zs.js();
    }, t.prototype.wr = function () {
      return this.dr(), this.Zs.Us();
    }, t.prototype.Mr = function () {
      var t = this._r();

      if (null === t) return null;
      var i = {
        from: t.rs(),
        to: t.es()
      };
      return this.br(i);
    }, t.prototype.br = function (t) {
      var i = Math.round(t.from),
          n = Math.round(t.to),
          h = l(this.mr()),
          s = l(this.gr());
      return {
        from: l(this.si(Math.max(h, i))),
        to: l(this.si(Math.min(s, n)))
      };
    }, t.prototype.pr = function (t) {
      var i = this.hi.j();
      return {
        from: l(i.vr(t.from, !0)),
        to: l(i.vr(t.to, !0))
      };
    }, t.prototype.yr = function () {
      return this.$s;
    }, t.prototype.dt = function () {
      return this.Hs;
    }, t.prototype.kr = function (t) {
      if (isFinite(t) && !(t <= 0) && this.Hs !== t) {
        if (this.xi.lockVisibleTimeRangeOnResize && this.Hs) {
          var i = this.rr * t / this.Hs;
          this.xr(i);
        }

        if (this.xi.fixLeftEdge) {
          var n = this._r();

          if (null !== n) if (n.rs() <= 0) {
            var h = this.Hs - t;
            this.sr -= Math.round(h / this.rr) + 1;
          }
        }

        this.Hs = t, this.Js = !0, this.Nr(), this.Sr();
      }
    }, t.prototype.J = function (t) {
      if (this.Qt() || !_(t)) return 0;
      var i = this.Dr() + this.sr - t;
      return this.Hs - (i + .5) * this.rr;
    }, t.prototype.Cr = function (t, i) {
      for (var n = this.Dr(), h = void 0 === i ? 0 : i.from, s = void 0 === i ? t.length : i.to, r = h; r < s; r++) {
        var e = t[r].V,
            u = n + this.sr - e,
            o = this.Hs - (u + .5) * this.rr;
        t[r].m = o;
      }
    }, t.prototype.Tr = function (t) {
      return Math.ceil(this.Ar(t));
    }, t.prototype.cr = function (t) {
      this.Js = !0, this.sr = t, this.Sr(), this.hi.Er(), this.hi.Lr();
    }, t.prototype.Br = function () {
      return this.rr;
    }, t.prototype.lr = function (t) {
      this.xr(t), this.Sr(), this.hi.Er(), this.hi.Lr();
    }, t.prototype.Fr = function () {
      return this.sr;
    }, t.prototype.Vn = function () {
      if (this.Qt()) return null;
      if (null !== this.nr) return this.nr;

      for (var t = this.rr, i = 5 * (this.hi.P().layout.fontSize + 4), n = Math.round(i / t), h = l(this._r()), s = Math.max(h.rs(), h.rs() - n), r = Math.max(h.es(), h.es() - n), e = 0, u = 0, o = this.$s.Ps(t, i); u < o.length; u++) {
        var a = o[u];

        if (s <= a.zs && a.zs <= r) {
          var f = this.si(a.zs);

          if (null !== f) {
            if (e < this.hr.length) {
              var c = this.hr[e];
              c.En = this.J(a.zs), c.Ln = this.Vr(f, a.Os), c.Os = a.Os;
            } else this.hr.push({
              En: this.J(a.zs),
              Ln: this.Vr(f, a.Os),
              Os: a.Os
            });

            e++;
          }
        }
      }

      return this.hr.length = e, this.nr = this.hr, this.hr;
    }, t.prototype.zr = function () {
      this.Js = !0, this.lr(this.xi.barSpacing), this.cr(this.xi.rightOffset);
    }, t.prototype.Or = function (t) {
      this.Js = !0, this.Ys = t, this.Sr(), this.ar();
    }, t.prototype.Pr = function (t, i) {
      var n = this.Ar(t),
          h = this.Br(),
          s = h + i * (h / 10);
      this.lr(s), this.xi.rightBarStaysOnScroll || this.cr(this.Fr() + (n - this.Ar(t)));
    }, t.prototype.jh = function (t) {
      this.Jn && this.Kh(), null === this.Zn && null === this.ir && (this.Qt() || (this.Zn = t, this.Ir()));
    }, t.prototype.Uh = function (t) {
      if (null !== this.ir) {
        var i = Q(this.Hs - t, 0, this.Hs),
            n = Q(this.Hs - l(this.Zn), 0, this.Hs);
        0 !== i && 0 !== n && this.lr(this.ir.Br * i / n);
      }
    }, t.prototype.qh = function () {
      null !== this.Zn && (this.Zn = null, this.Wr());
    }, t.prototype.Hh = function (t) {
      null === this.Jn && null === this.ir && (this.Qt() || (this.Jn = t, this.Ir()));
    }, t.prototype.Yh = function (t) {
      if (null !== this.Jn) {
        var i = (this.Jn - t) / this.Br();
        this.sr = l(this.ir).Fr + i, this.Js = !0, this.Sr();
      }
    }, t.prototype.Kh = function () {
      null !== this.Jn && (this.Jn = null, this.Wr());
    }, t.prototype.Rr = function () {
      this.jr(this.xi.rightOffset);
    }, t.prototype.jr = function (t, i) {
      var n = this;
      if (void 0 === i && (i = 400), !isFinite(t)) throw new RangeError("offset is required and must be finite number");
      if (!isFinite(i) || i <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");

      var h = this.sr,
          s = new Date().getTime(),
          r = function r() {
        var e = (new Date().getTime() - s) / i,
            u = e >= 1,
            o = u ? t : h + (t - h) * e;
        n.cr(o), u || setTimeout(r, 20);
      };

      r();
    }, t.prototype.B = function (t) {
      this.Js = !0, this.Ks = t, this.$s.Fs(t), this.Sr();
    }, t.prototype.Ur = function () {
      return this.Gs;
    }, t.prototype.qr = function () {
      return this.Qs;
    }, t.prototype.Hr = function () {
      return this.tr;
    }, t.prototype.Dr = function () {
      return this.Ys || 0;
    }, t.prototype.Yr = function (t) {
      var i = t.Es();
      this.xr(this.Hs / i), this.sr = t.es() - this.Dr(), this.Sr(), this.Js = !0, this.hi.Er(), this.hi.Lr();
    }, t.prototype.Kr = function () {
      var t = this.mr(),
          i = this.gr();
      null !== t && null !== i && this.Yr(new Dt(t, i + this.xi.rightOffset));
    }, t.prototype.$r = function (t) {
      var i = new Dt(t.from, t.to);
      this.Yr(i);
    }, t.prototype.ri = function (t) {
      return void 0 !== this.ih.timeFormatter ? this.ih.timeFormatter(t.Ns || t.Ss) : this.Xr.Xi(new Date(1e3 * t.Ss));
    }, t.prototype.mr = function () {
      return 0 === this.Ks.length ? null : 0;
    }, t.prototype.gr = function () {
      return 0 === this.Ks.length ? null : this.Ks.length - 1;
    }, t.prototype.Zr = function (t) {
      return (this.Hs + 1 - t) / this.rr;
    }, t.prototype.Ar = function (t) {
      var i = this.Zr(t),
          n = this.Dr() + this.sr - i;
      return Math.round(1e6 * n) / 1e6;
    }, t.prototype.xr = function (t) {
      var i = this.rr;
      this.rr = t, this.Nr(), i !== this.rr && (this.Js = !0, this.Jr());
    }, t.prototype.dr = function () {
      if (this.Js) if (this.Js = !1, this.Qt()) this.Gr(Et.qs());else {
        var t = this.Dr(),
            i = this.Hs / this.rr,
            n = this.sr + t,
            h = new Dt(n - i + 1, n);
        this.Gr(new Et(h));
      }
    }, t.prototype.Nr = function () {
      if (this.rr < .5 && (this.rr = .5, this.Js = !0), 0 !== this.Hs) {
        var t = .5 * this.Hs;
        this.rr > t && (this.rr = t, this.Js = !0);
      }
    }, t.prototype.Sr = function () {
      var t = this.Qr();
      this.sr > t && (this.sr = t, this.Js = !0);
      var i = this.te();
      null !== i && this.sr < i && (this.sr = i, this.Js = !0);
    }, t.prototype.te = function () {
      var t = this.mr(),
          i = this.Ys;
      return null === t || null === i ? null : t - i - 1 + (this.xi.fixLeftEdge ? this.Hs / this.rr : Math.min(2, this.Ks.length));
    }, t.prototype.Qr = function () {
      return this.Hs / this.rr - Math.min(2, this.Ks.length);
    }, t.prototype.Ir = function () {
      this.ir = {
        Br: this.Br(),
        Fr: this.Fr()
      };
    }, t.prototype.Wr = function () {
      this.ir = null;
    }, t.prototype.Vr = function (t, i) {
      var n = this,
          h = this.Xs.get(i);
      return void 0 === h && (h = new St(function (t) {
        return n.ie(t, i);
      }), this.Xs.set(i, h)), h.Xi(t);
    }, t.prototype.ie = function (t, i) {
      var n,
          h,
          s = this.xi.timeVisible;
      return h = i < 20 && s ? this.xi.secondsVisible ? 4 : 3 : i < 40 && s ? 3 : i < 50 || i < 60 ? 2 : i < 70 ? 1 : 0, void 0 !== this.xi.tickMarkFormatter ? this.xi.tickMarkFormatter(null !== (n = t.Ns) && void 0 !== n ? n : t.Ss, h, this.ih.locale) : function (t, i, n) {
        var h = {};

        switch (i) {
          case 0:
            h.year = "numeric";
            break;

          case 1:
            h.month = "short";
            break;

          case 2:
            h.day = "numeric";
            break;

          case 3:
            h.hour12 = !1, h.hour = "2-digit", h.minute = "2-digit";
            break;

          case 4:
            h.hour12 = !1, h.hour = "2-digit", h.minute = "2-digit", h.second = "2-digit";
        }

        var s = void 0 === t.Ns ? new Date(1e3 * t.Ss) : new Date(Date.UTC(t.Ns.year, t.Ns.month - 1, t.Ns.day));
        return new Date(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()).toLocaleString(n, h);
      }(t, h, this.ih.locale);
    }, t.prototype.Gr = function (t) {
      var i = this.Zs;
      this.Zs = t, Ct(i.js(), this.Zs.js()) || this.Gs.en(), Ct(i.Us(), this.Zs.Us()) || this.Qs.en(), this.Jr();
    }, t.prototype.Jr = function () {
      this.nr = null;
    }, t.prototype.or = function () {
      this.Jr(), this.Xs.clear();
    }, t.prototype.er = function () {
      var t = this.ih.dateFormat;
      this.xi.timeVisible ? this.Xr = new Nt({
        fs: t,
        cs: this.xi.secondsVisible ? "%h:%m:%s" : "%h:%m",
        vs: "   ",
        _s: this.ih.locale
      }) : this.Xr = new yt(t, this.ih.locale);
    }, t.prototype.ar = function () {
      if (this.xi.fixLeftEdge) {
        var t = this.mr();

        if (null !== t) {
          var i = l(this._r()).rs() - t;

          if (i < 0) {
            var n = this.sr - i - 1;
            this.cr(n);
          }
        }
      }
    }, t;
  }();

  function Bt(t) {
    return !v(t) && !d(t);
  }

  function Ft(t) {
    return v(t);
  }

  var Vt = "'Trebuchet MS', Roboto, Ubuntu, sans-serif";

  function zt(t, i, n) {
    return void 0 !== n ? n += " " : n = "", void 0 === i && (i = Vt), "" + n + t + "px " + i;
  }

  var Ot = function () {
    function t(t) {
      this.ne = {
        Dt: 1,
        St: 4,
        Vt: NaN,
        kt: "",
        he: "",
        et: "",
        Tt: 0,
        At: 0,
        Et: 0,
        Ct: 0,
        Ft: 0
      }, this.A = t;
    }

    return t.prototype.P = function () {
      var t = this.ne,
          i = this.se(),
          n = this.ee();
      return t.Vt === i && t.he === n || (t.Vt = i, t.he = n, t.kt = zt(i, n), t.Ct = Math.floor(i / 3.5), t.Tt = t.Ct, t.At = Math.max(Math.ceil(i / 2 - t.St / 2), 0), t.Et = Math.ceil(i / 2 + t.St / 2), t.Ft = Math.round(i / 10)), t.et = this.ue(), this.ne;
    }, t.prototype.ue = function () {
      return this.A.P().layout.textColor;
    }, t.prototype.se = function () {
      return this.A.P().layout.fontSize;
    }, t.prototype.ee = function () {
      return this.A.P().layout.fontFamily;
    }, t;
  }();

  function Pt(t) {
    return "left" === t || "right" === t;
  }

  var It = function () {
    function t() {
      this.G = null;
    }

    return t.prototype.v = function (t) {
      this.G = t;
    }, t.prototype.h = function (t, i, h, s) {
      var r = this;

      if (null !== this.G) {
        var e = Math.floor(i);
        t.lineWidth = e;
        var u = Math.ceil(this.G.st * i),
            o = Math.ceil(this.G.ht * i);
        !function (t, i) {
          t.save(), t.lineWidth % 2 && t.translate(.5, .5), i(), t.restore();
        }(t, function () {
          var h = l(r.G);

          if (h.oe) {
            t.strokeStyle = h.ae, n(t, h.le), t.beginPath();

            for (var s = 0, a = h.fe; s < a.length; s++) {
              var f = a[s],
                  c = Math.round(f.En * i);
              t.moveTo(c, -e), t.lineTo(c, u + e);
            }

            t.stroke();
          }

          if (h.ce) {
            t.strokeStyle = h.ve, n(t, h._e), t.beginPath();

            for (var v = 0, _ = h.de; v < _.length; v++) {
              var d = _[v],
                  w = Math.round(d.En * i);
              t.moveTo(-e, w), t.lineTo(o + e, w);
            }

            t.stroke();
          }
        });
      }
    }, t;
  }(),
      Wt = function () {
    function t(t) {
      this.at = new It(), this.T = !0, this._i = t;
    }

    return t.prototype.B = function () {
      this.T = !0;
    }, t.prototype.I = function (t, i) {
      if (this.T) {
        var n = this._i.ct().P().grid,
            h = {
          st: t,
          ht: i,
          ce: n.horzLines.visible,
          oe: n.vertLines.visible,
          ve: n.horzLines.color,
          ae: n.vertLines.color,
          _e: n.horzLines.style,
          le: n.vertLines.style,
          de: this._i.Di().Vn(),
          fe: this._i.ct().j().Vn() || []
        };

        this.at.v(h), this.T = !1;
      }

      return this.at;
    }, t;
  }(),
      Rt = function () {
    function t() {
      this.we = new WeakMap(), this.T = !0;
    }

    return t.prototype.ci = function (t) {
      var i = this.we.get(t);
      return void 0 === i && (i = [new Wt(t)], this.we.set(t, i)), this.T && (i.forEach(function (t) {
        return t.B();
      }), this.T = !1), i;
    }, t.prototype.Me = function () {
      this.T = !0;
    }, t;
  }();

  var jt = function () {
    function t(t) {
      this.be = new Map(), this.me = !1, this.ge = !1, this.Rs = null, this.pe = t;
    }

    return t.prototype.ye = function (t, i) {
      var n = function (t, i) {
        return void 0 === t ? i : {
          ke: Math.max(t.ke, i.ke),
          dh: t.dh || i.dh
        };
      }(this.be.get(t), i);

      this.be.set(t, n);
    }, t.prototype.xe = function () {
      return this.pe;
    }, t.prototype.Ne = function (t) {
      var i = this.be.get(t);
      return void 0 === i ? {
        ke: this.pe
      } : {
        ke: Math.max(this.pe, i.ke),
        dh: i.dh
      };
    }, t.prototype.Se = function () {
      this.ge = !0, this.Rs = null;
    }, t.prototype.De = function () {
      return this.ge;
    }, t.prototype.$r = function (t) {
      this.Rs = t, this.ge = !1;
    }, t.prototype.Ce = function () {
      return this.Rs;
    }, t.prototype.wn = function (t) {
      var i = this;
      this.me = this.me || t.me, t.ge && this.Se(), t.Rs && this.$r(t.Rs), this.pe = Math.max(this.pe, t.pe), t.be.forEach(function (t, n) {
        i.ye(n, t);
      });
    }, t;
  }(),
      Ut = function () {
    function t(t) {
      this.Te = t;
    }

    return t.prototype.Xi = function (t) {
      var i = "";
      return t < 0 && (i = "-", t = -t), t < 995 ? i + this.Ae(t) : t < 999995 ? i + this.Ae(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), i + this.Ae(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), i + this.Ae(t / 1e9) + "B");
    }, t.prototype.Ae = function (t) {
      var i = Math.pow(10, this.Te);
      return ((t = Math.round(t * i) / i) >= 1e-15 && t < 1 ? t.toFixed(this.Te).replace(/\.?0+$/, "") : String(t)).replace(/(\.[1-9]*)0+$/, function (t, i) {
        return i;
      });
    }, t;
  }();

  function qt(t, i, n, h) {
    if (0 !== i.length) {
      var s = i[h.from].m,
          r = i[h.from].g;
      t.moveTo(s, r);

      for (var e = h.from + 1; e < h.to; ++e) {
        var u = i[e];

        if (1 === n) {
          var o = i[e - 1].g,
              a = u.m;
          t.lineTo(a, o);
        }

        t.lineTo(u.m, u.g);
      }
    }
  }

  var Ht = function (t) {
    function i() {
      var i = null !== t && t.apply(this, arguments) || this;
      return i.l = null, i;
    }

    return r(i, t), i.prototype.v = function (t) {
      this.l = t;
    }, i.prototype.s = function (t) {
      if (null !== this.l && 0 !== this.l.M.length && null !== this.l._) {
        t.lineCap = "butt", t.strokeStyle = this.l.N, t.lineWidth = this.l.rt, n(t, this.l.ut), t.lineWidth = 1, t.beginPath(), t.moveTo(this.l.M[this.l._.from].m, this.l.Ee), t.lineTo(this.l.M[this.l._.from].m, this.l.M[this.l._.from].g), qt(t, this.l.M, this.l.Le, this.l._), this.l._.to > this.l._.from && (t.lineTo(this.l.M[this.l._.to - 1].m, this.l.Ee), t.lineTo(this.l.M[this.l._.from].m, this.l.Ee)), t.closePath();
        var i = t.createLinearGradient(0, 0, 0, this.l.Ee);
        i.addColorStop(0, this.l.Be), i.addColorStop(1, this.l.Fe), t.fillStyle = i, t.fill();
      }
    }, i;
  }(p),
      Yt = function (t) {
    function i() {
      var i = null !== t && t.apply(this, arguments) || this;
      return i.l = null, i;
    }

    return r(i, t), i.prototype.v = function (t) {
      this.l = t;
    }, i.prototype.s = function (t) {
      null !== this.l && 0 !== this.l.M.length && null !== this.l._ && (t.lineCap = "square", t.lineWidth = this.l.rt, n(t, this.l.ut), t.strokeStyle = this.l.N, t.lineJoin = "miter", t.beginPath(), qt(t, this.l.M, this.l.Le, this.l._), t.stroke());
    }, i;
  }(p);

  function Kt(t, i, n, h, s) {
    void 0 === h && (h = 0), void 0 === s && (s = t.length);

    for (var r = s - h; 0 < r;) {
      var e = r >> 1,
          u = h + e;
      n(t[u], i) ? (h = u + 1, r -= e + 1) : r = e;
    }

    return h;
  }

  function $t(t, i, n, h, s) {
    void 0 === h && (h = 0), void 0 === s && (s = t.length);

    for (var r = s - h; 0 < r;) {
      var e = r >> 1,
          u = h + e;
      n(i, t[u]) ? r = e : (h = u + 1, r -= e + 1);
    }

    return h;
  }

  function Xt(t, i) {
    return t.V < i;
  }

  function Zt(t, i) {
    return t < i.V;
  }

  function Jt(t, i, n) {
    var h = i.rs(),
        s = i.es(),
        r = Kt(t, h, Xt),
        e = $t(t, s, Zt);
    if (!n) return {
      from: r,
      to: e
    };
    var u = r,
        o = e;
    return r > 0 && r < t.length && t[r].V >= h && (u = r - 1), e > 0 && e < t.length && t[e - 1].V <= s && (o = e + 1), {
      from: u,
      to: o
    };
  }

  var Gt = function () {
    function t(t, i, n) {
      this.Ve = !0, this.ze = !0, this.Oe = [], this.Pe = null, this.Ie = t, this.We = i, this.Re = n;
    }

    return t.prototype.B = function (t) {
      this.Ve = !0, "data" === t && (this.ze = !0);
    }, t.prototype.je = function () {
      this.ze && (this.Ue(), this.ze = !1), this.Ve && (this.qe(), this.Ve = !1);
    }, t.prototype.He = function () {
      this.Pe = null;
    }, t.prototype.qe = function () {
      var t = this.Ie.X(),
          i = this.We.j();

      if (this.He(), !i.Qt() && !t.Qt()) {
        var n = i._r();

        if (null !== n && 0 !== this.Ie.qi().Ye()) {
          var h = this.Ie.q();
          null !== h && (this.Pe = Jt(this.Oe, n, this.Re), this.Ke(t, i, h.Z));
        }
      }
    }, t;
  }(),
      Qt = function (t) {
    function i(i, n) {
      return t.call(this, i, n, !0) || this;
    }

    return r(i, t), i.prototype.Ke = function (t, i, n) {
      i.Cr(this.Oe, m(this.Pe)), t.Dh(this.Oe, n, m(this.Pe));
    }, i.prototype.$e = function (t, i) {
      return {
        V: t,
        O: i,
        m: NaN,
        g: NaN
      };
    }, i.prototype.Ue = function () {
      var t = this,
          i = this.Ie.K();
      this.Oe = this.Ie.qi().Xe().map(function (n) {
        var h = n.Z[3];
        return t.Ze(n.zs, h, i);
      });
    }, i;
  }(Gt),
      ti = function (t) {
    function i(i, n) {
      var h = t.call(this, i, n) || this;
      return h.at = new g(), h.Je = new Ht(), h.Ge = new Yt(), h.at.i([h.Je, h.Ge]), h;
    }

    return r(i, t), i.prototype.I = function (t, i) {
      this.je();
      var n = this.Ie.P(),
          h = {
        Le: n.lineType,
        M: this.Oe,
        N: n.lineColor,
        ut: n.lineStyle,
        rt: n.lineWidth,
        Be: n.topColor,
        Fe: n.bottomColor,
        Ee: t,
        _: this.Pe
      };
      return this.Je.v(h), this.Ge.v(h), this.at;
    }, i.prototype.Ze = function (t, i) {
      return this.$e(t, i);
    }, i;
  }(Qt);

  var ii = function () {
    function t() {
      this.G = null, this.Qe = 0, this.tu = 0;
    }

    return t.prototype.v = function (t) {
      this.G = t;
    }, t.prototype.h = function (t, i, n, h) {
      if (null !== this.G && 0 !== this.G.qi.length && null !== this.G._) {
        if (this.Qe = Math.max(1, Math.floor(function (t, i) {
          return Math.floor(.3 * t * i);
        }(this.G.Br, i))), this.Qe >= 2) Math.floor(i) % 2 != this.Qe % 2 && this.Qe--;
        this.tu = this.G.iu ? Math.min(this.Qe, Math.floor(i)) : this.Qe;

        for (var s = null, r = this.G._.from; r < this.G._.to; ++r) {
          var e = this.G.qi[r];
          s !== e.et && (t.fillStyle = e.et, s = e.et);

          var u = Math.floor(.5 * this.tu),
              o = Math.round(e.m * i),
              a = o - u,
              l = this.tu,
              f = a + l - 1,
              c = Math.round(e.Eh * i) - u,
              v = Math.round(e.Lh * i) + u,
              _ = Math.max(v - c, this.tu);

          t.fillRect(a, c, l, _);
          var d = Math.ceil(1.5 * this.Qe);

          if (this.tu <= this.Qe) {
            if (this.G.nu) {
              var w = o - d,
                  M = Math.max(c, Math.round(e.Ah * i) - u),
                  b = M + l - 1;
              b > c + _ - 1 && (M = (b = c + _ - 1) - l + 1), t.fillRect(w, M, a - w, b - M + 1);
            }

            var m = o + d,
                g = Math.max(c, Math.round(e.Bh * i) - u),
                p = g + l - 1;
            p > c + _ - 1 && (g = (p = c + _ - 1) - l + 1), t.fillRect(f + 1, g, m - f, p - g + 1);
          }
        }
      }
    }, t;
  }(),
      ni = function (t) {
    function i(i, n) {
      return t.call(this, i, n, !1) || this;
    }

    return r(i, t), i.prototype.Ke = function (t, i, n) {
      i.Cr(this.Oe, m(this.Pe)), t.Th(this.Oe, n, m(this.Pe));
    }, i.prototype.hu = function (t, i, n) {
      return {
        V: t,
        open: i.Z[0],
        high: i.Z[1],
        low: i.Z[2],
        close: i.Z[3],
        m: NaN,
        Ah: NaN,
        Eh: NaN,
        Lh: NaN,
        Bh: NaN
      };
    }, i.prototype.Ue = function () {
      var t = this,
          i = this.Ie.K();
      this.Oe = this.Ie.qi().Xe().map(function (n) {
        return t.Ze(n.zs, n, i);
      });
    }, i;
  }(Gt),
      hi = function (t) {
    function i() {
      var i = null !== t && t.apply(this, arguments) || this;
      return i.at = new ii(), i;
    }

    return r(i, t), i.prototype.I = function (t, i) {
      this.je();
      var n = this.Ie.P(),
          h = {
        qi: this.Oe,
        Br: this.We.j().Br(),
        nu: n.openVisible,
        iu: n.thinBars,
        _: this.Pe
      };
      return this.at.v(h), this.at;
    }, i.prototype.Ze = function (t, i, n) {
      return _e(_e({}, this.hu(t, i, n)), {
        et: n.Y(t).H
      });
    }, i;
  }(ni),
      si = function () {
    function t() {
      this.G = null, this.Qe = 0;
    }

    return t.prototype.v = function (t) {
      this.G = t;
    }, t.prototype.h = function (t, i, n, h) {
      if (null !== this.G && 0 !== this.G.qi.length && null !== this.G._) {
        if (this.Qe = function (t, i) {
          var n = Math.floor(.8 * t * i),
              h = Math.floor(t * i),
              s = Math.min(n, h - 1);
          return Math.max(1, s);
        }(this.G.Br, i), this.Qe >= 2) Math.floor(i) % 2 != this.Qe % 2 && this.Qe--;
        var s = this.G.qi;
        this.G.su && this.ru(t, s, this.G._, i), this.G.eu && this.uu(t, s, this.G._, this.G.Br, i);
        var r = this.ou(i);
        (!this.G.eu || this.Qe > 2 * r) && this.au(t, s, this.G._, i);
      }
    }, t.prototype.ru = function (t, i, n, h) {
      if (null !== this.G) {
        var s = "",
            r = Math.min(Math.floor(h), Math.floor(this.G.Br * h));
        r = Math.min(r, this.Qe);

        for (var e = Math.floor(.5 * r), u = n.from; u < n.to; u++) {
          var o = i[u];
          o.lu !== s && (t.fillStyle = o.lu, s = o.lu);
          var a = Math.round(Math.min(o.Ah, o.Bh) * h),
              l = Math.round(Math.max(o.Ah, o.Bh) * h),
              f = Math.round(o.Eh * h),
              c = Math.round(o.Lh * h),
              v = Math.round(h * o.m);
          t.fillRect(v - e, f, r, a - f), t.fillRect(v - e, l + 1, r, c - l);
        }
      }
    }, t.prototype.ou = function (t) {
      var i = Math.floor(1 * t);
      this.Qe <= 2 * i && (i = Math.floor(.5 * (this.Qe - 1)));
      var n = Math.max(1, i);
      return this.Qe <= 2 * n ? Math.floor(1 * t) : n;
    }, t.prototype.uu = function (t, i, n, h, s) {
      for (var r = "", e = this.ou(s), u = n.from; u < n.to; u++) {
        var o = i[u];
        o.Pt !== r && (t.fillStyle = o.Pt, r = o.Pt);
        var a = Math.round(o.m * s) - Math.floor(.5 * this.Qe),
            l = a + this.Qe - 1,
            f = Math.round(Math.min(o.Ah, o.Bh) * s),
            c = Math.round(Math.max(o.Ah, o.Bh) * s);
        h > 2 * e ? F(t, a, f, l - a + 1, c - f + 1, e) : t.fillRect(a, f, l - a + 1, c - f + 1);
      }
    }, t.prototype.au = function (t, i, n, h) {
      if (null !== this.G) for (var s = "", r = this.ou(h), e = n.from; e < n.to; e++) {
        var u = i[e],
            o = Math.round(Math.min(u.Ah, u.Bh) * h),
            a = Math.round(Math.max(u.Ah, u.Bh) * h),
            l = Math.round(u.m * h) - Math.floor(.5 * this.Qe),
            f = l + this.Qe - 1;

        if (this.G.eu && (l += r, o += r, f -= r, a -= r), !(o > a)) {
          if (u.et !== s) {
            var c = u.et;
            t.fillStyle = c, s = c;
          }

          t.fillRect(l, o, f - l + 1, a - o + 1);
        }
      }
    }, t;
  }(),
      ri = function (t) {
    function i() {
      var i = null !== t && t.apply(this, arguments) || this;
      return i.at = new si(), i;
    }

    return r(i, t), i.prototype.I = function (t, i) {
      this.je();
      var n = this.Ie.P(),
          h = {
        qi: this.Oe,
        Br: this.We.j().Br(),
        su: n.wickVisible,
        eu: n.borderVisible,
        _: this.Pe
      };
      return this.at.v(h), this.at;
    }, i.prototype.Ze = function (t, i, n) {
      var h = n.Y(t);
      return _e(_e({}, this.hu(t, i, n)), {
        et: h.H,
        lu: h.fu,
        Pt: h.cu
      });
    }, i;
  }(ni),
      ei = function () {
    function t() {
      this.G = null, this.vu = [];
    }

    return t.prototype.v = function (t) {
      this.G = t, this.vu = [];
    }, t.prototype.h = function (t, i, n, h) {
      if (null !== this.G && 0 !== this.G.M.length && null !== this.G._) {
        this.vu.length || this._u(i);

        for (var s = Math.round(this.G.du * i), r = Math.max(1, Math.floor(i)), e = this.G._.from; e < this.G._.to; e++) {
          var u = this.G.M[e],
              o = this.vu[e - this.G._.from],
              a = Math.round(u.g * i);
          t.fillStyle = u.et, t.fillRect(o.rs, a, o.es - o.rs + 1, s - a + r);
        }
      }
    }, t.prototype._u = function (t) {
      if (null !== this.G && 0 !== this.G.M.length && null !== this.G._) {
        var i = Math.ceil(this.G.Br * t) <= 3 ? 0 : Math.max(1, Math.floor(t)),
            n = Math.round(this.G.Br * t) - i;
        this.vu = new Array(this.G._.to - this.G._.from);

        for (var h = this.G._.from; h < this.G._.to; h++) {
          var s,
              r = this.G.M[h],
              e = Math.round(r.m * t),
              u = void 0,
              o = void 0;
          if (n % 2) u = e - (s = (n - 1) / 2), o = e + s;else u = e - (s = n / 2), o = e + s - 1;
          this.vu[h - this.G._.from] = {
            rs: u,
            es: o,
            wu: e,
            Mu: r.m * t,
            V: r.V
          };
        }

        for (h = this.G._.from + 1; h < this.G._.to; h++) {
          var a = this.vu[h - this.G._.from],
              l = this.vu[h - this.G._.from - 1];
          a.V === l.V + 1 && a.rs - l.es !== i + 1 && (l.wu > l.Mu ? l.es = a.rs - i - 1 : a.rs = l.es + i + 1);
        }

        var f = Math.ceil(this.G.Br * t);

        for (h = this.G._.from; h < this.G._.to; h++) {
          (a = this.vu[h - this.G._.from]).es < a.rs && (a.es = a.rs);
          var c = a.es - a.rs + 1;
          f = Math.min(c, f);
        }

        if (i > 0 && f < 4) for (h = this.G._.from; h < this.G._.to; h++) {
          (c = (a = this.vu[h - this.G._.from]).es - a.rs + 1) > f && (a.wu > a.Mu ? a.es -= 1 : a.rs += 1);
        }
      } else this.vu = [];
    }, t;
  }();

  function ui(t) {
    return {
      M: [],
      Br: t,
      du: NaN,
      _: null
    };
  }

  function oi(t, i, n) {
    return {
      V: t,
      O: i,
      m: NaN,
      g: NaN,
      et: n
    };
  }

  var ai = function (t) {
    function i(i, n) {
      var h = t.call(this, i, n, !1) || this;
      return h.S = new g(), h.bu = ui(0), h.at = new ei(), h;
    }

    return r(i, t), i.prototype.I = function (t, i) {
      return this.je(), this.S;
    }, i.prototype.Ue = function () {
      var t = this.We.j().Br();
      this.bu = ui(t);

      for (var i = 0, n = 0, h = this.Ie.P().color, s = 0, r = this.Ie.qi().Xe(); s < r.length; s++) {
        var e = r[s],
            u = e.Z[3],
            o = void 0 !== e.et ? e.et : h,
            a = oi(e.zs, u, o);
        ++i < this.bu.M.length ? this.bu.M[i] = a : this.bu.M.push(a), this.Oe[n++] = {
          V: e.zs,
          m: 0
        };
      }

      this.at.v(this.bu), this.S.i([this.at]);
    }, i.prototype.He = function () {
      t.prototype.He.call(this), this.bu._ = null;
    }, i.prototype.Ke = function (t, i, n) {
      if (null !== this.Pe) {
        var h = i.Br(),
            s = l(i._r()),
            r = t.$(this.Ie.P().base, n);
        i.Cr(this.bu.M), t.Dh(this.bu.M, n), this.bu.du = r, this.bu._ = Jt(this.bu.M, s, !1), this.bu.Br = h, this.at.v(this.bu);
      }
    }, i;
  }(Gt),
      li = function (t) {
    function i(i, n) {
      var h = t.call(this, i, n) || this;
      return h.Ge = new Yt(), h;
    }

    return r(i, t), i.prototype.I = function (t, i) {
      this.je();
      var n = this.Ie.P(),
          h = {
        M: this.Oe,
        N: n.color,
        ut: n.lineStyle,
        Le: n.lineType,
        rt: n.lineWidth,
        _: this.Pe
      };
      return this.Ge.v(h), this.Ge;
    }, i.prototype.Ze = function (t, i) {
      return this.$e(t, i);
    }, i;
  }(Qt),
      fi = /[2-9]/g,
      ci = function () {
    function t(t) {
      void 0 === t && (t = 50), this.ps = new Map(), this.mu = 0, this.gu = Array.from(new Array(t));
    }

    return t.prototype.pu = function () {
      this.ps.clear(), this.gu.fill(void 0);
    }, t.prototype.Bt = function (t, i, n) {
      var h = n || fi,
          s = String(i).replace(h, "0"),
          r = this.ps.get(s);

      if (void 0 === r) {
        if (0 === (r = t.measureText(s).width) && 0 !== i.length) return 0;
        var e = this.gu[this.mu];
        void 0 !== e && this.ps["delete"](e), this.gu[this.mu] = s, this.mu = (this.mu + 1) % this.gu.length, this.ps.set(s, r);
      }

      return r;
    }, t;
  }(),
      vi = function () {
    function t(t) {
      this.yu = null, this.ne = null, this.ku = "right", this.Hs = 0, this.xu = t;
    }

    return t.prototype.Nu = function (t, i, n, h) {
      this.yu = t, this.ne = i, this.Hs = n, this.ku = h;
    }, t.prototype.h = function (t, i) {
      null !== this.ne && null !== this.yu && this.yu.h(t, this.ne, this.xu, this.Hs, this.ku, i);
    }, t;
  }(),
      _i = function () {
    function t(t, i, n) {
      this.Su = t, this.xu = new ci(50), this.Du = i, this.A = n, this.se = -1, this.at = new vi(this.xu);
    }

    return t.prototype.I = function (t, i) {
      var n = this.A.Cu(this.Du);
      if (null === n) return null;
      var h = n.Tu(this.Du) ? n.Di() : this.Du.X();
      if (null === h) return null;
      var s = n.Au(h);
      if ("overlay" === s) return null;
      var r = this.A.Eu();
      return r.Vt !== this.se && (this.se = r.Vt, this.xu.pu()), this.at.Nu(this.Su.Xt(), r, i, s), this.at;
    }, t;
  }(),
      di = function () {
    function t() {
      this.G = null;
    }

    return t.prototype.v = function (t) {
      this.G = t;
    }, t.prototype.h = function (t, i, s, r) {
      if (null !== this.G && !1 !== this.G.tt) {
        var e = Math.round(this.G.g * i);

        if (!(e < 0 || e > Math.ceil(this.G.wt * i))) {
          var u = Math.ceil(this.G.dt * i);
          t.lineCap = "butt", t.strokeStyle = this.G.et, t.lineWidth = Math.floor(this.G.rt * i), n(t, this.G.ut), h(t, e, 0, u);
        }
      }
    }, t;
  }(),
      wi = function () {
    function t(t) {
      this.Lu = {
        dt: 0,
        wt: 0,
        g: 0,
        et: "rgba(0, 0, 0, 0)",
        rt: 1,
        ut: 0,
        tt: !1
      }, this.Bu = new di(), this.T = !0, this.Ie = t, this.We = t.ct(), this.Bu.v(this.Lu);
    }

    return t.prototype.B = function () {
      this.T = !0;
    }, t.prototype.I = function (t, i) {
      return this.T && (this.Fu(t, i), this.T = !1), this.Bu;
    }, t;
  }(),
      Mi = function (t) {
    function i(i) {
      return t.call(this, i) || this;
    }

    return r(i, t), i.prototype.Fu = function (t, i) {
      this.Lu.tt = !1;
      var n = this.Ie.X(),
          h = n.ah().ah;

      if (2 === h || 3 === h) {
        var s = this.Ie.P();

        if (s.baseLineVisible) {
          var r = this.Ie.q();
          null !== r && (this.Lu.tt = !0, this.Lu.g = n.$(r.Z, r.Z), this.Lu.dt = i, this.Lu.wt = t, this.Lu.et = s.baseLineColor, this.Lu.rt = s.baseLineWidth, this.Lu.ut = s.baseLineStyle);
        }
      }
    }, i;
  }(wi);

  function bi(t, i) {
    return ht(Math.min(Math.max(t, 12), 30) * i);
  }

  function mi(t, i) {
    switch (t) {
      case "arrowDown":
      case "arrowUp":
        return bi(i, 1);

      case "circle":
        return bi(i, .8);

      case "square":
        return bi(i, .7);
    }
  }

  function gi(t) {
    return nt(bi(t, 1));
  }

  function pi(t) {
    return Math.max(bi(t, .1), 3);
  }

  function yi(t, i, n, h, s) {
    var r = mi("square", n),
        e = (r - 1) / 2,
        u = t - e,
        o = i - e;
    return h >= u && h <= u + r && s >= o && s <= o + r;
  }

  function ki(t, i, n, h, s) {
    var r = (mi("arrowUp", s) - 1) / 2,
        e = (ht(s / 2) - 1) / 2;
    i.beginPath(), t ? (i.moveTo(n - r, h), i.lineTo(n, h - r), i.lineTo(n + r, h), i.lineTo(n + e, h), i.lineTo(n + e, h + r), i.lineTo(n - e, h + r), i.lineTo(n - e, h)) : (i.moveTo(n - r, h), i.lineTo(n, h + r), i.lineTo(n + r, h), i.lineTo(n + e, h), i.lineTo(n + e, h - r), i.lineTo(n - e, h - r), i.lineTo(n - e, h)), i.fill();
  }

  function xi(t, i, n, h, s, r) {
    return yi(i, n, h, s, r);
  }

  var Ni = function (t) {
    function i() {
      var i = null !== t && t.apply(this, arguments) || this;
      return i.G = null, i.xu = new ci(), i.se = -1, i.ee = "", i.Vu = "", i;
    }

    return r(i, t), i.prototype.v = function (t) {
      this.G = t;
    }, i.prototype.Nu = function (t, i) {
      this.se === t && this.ee === i || (this.se = t, this.ee = i, this.Vu = zt(t, i), this.xu.pu());
    }, i.prototype.zu = function (t, i) {
      if (null === this.G || null === this.G._) return null;

      for (var n = this.G._.from; n < this.G._.to; n++) {
        var h = this.G.M[n];
        if (Di(h, t, i)) return {
          Ou: h.Pu,
          Iu: h.Iu
        };
      }

      return null;
    }, i.prototype.s = function (t, i, n) {
      if (null !== this.G && null !== this.G._) {
        t.textBaseline = "middle", t.font = this.Vu;

        for (var h = this.G._.from; h < this.G._.to; h++) {
          var s = this.G.M[h];
          void 0 !== s.Lt && (s.Lt.dt = this.xu.Bt(t, s.Lt.Wu), s.Lt.wt = this.se), Si(s, t);
        }
      }
    }, i;
  }(p);

  function Si(t, i) {
    i.fillStyle = t.et, void 0 !== t.Lt && function (t, i, n, h) {
      t.fillText(i, n, h);
    }(i, t.Lt.Wu, t.m - t.Lt.dt / 2, t.Lt.g), function (t, i) {
      if (0 === t.Ye) return;

      switch (t.Ru) {
        case "arrowDown":
          return void ki(!1, i, t.m, t.g, t.Ye);

        case "arrowUp":
          return void ki(!0, i, t.m, t.g, t.Ye);

        case "circle":
          return void function (t, i, n, h) {
            var s = (mi("circle", h) - 1) / 2;
            t.beginPath(), t.arc(i, n, s, 0, 2 * Math.PI, !1), t.fill();
          }(i, t.m, t.g, t.Ye);

        case "square":
          return void function (t, i, n, h) {
            var s = mi("square", h),
                r = (s - 1) / 2,
                e = i - r,
                u = n - r;
            t.fillRect(e, u, s, s);
          }(i, t.m, t.g, t.Ye);
      }

      t.Ru;
    }(t, i);
  }

  function Di(t, i, n) {
    return !(void 0 === t.Lt || !function (t, i, n, h, s, r) {
      var e = h / 2;
      return s >= t && s <= t + n && r >= i - e && r <= i + e;
    }(t.m, t.Lt.g, t.Lt.dt, t.Lt.wt, i, n)) || function (t, i, n) {
      if (0 === t.Ye) return !1;

      switch (t.Ru) {
        case "arrowDown":
        case "arrowUp":
          return xi(0, t.m, t.g, t.Ye, i, n);

        case "circle":
          return function (t, i, n, h, s) {
            var r = 2 + mi("circle", n) / 2,
                e = t - h,
                u = i - s;
            return Math.sqrt(e * e + u * u) <= r;
          }(t.m, t.g, t.Ye, i, n);

        case "square":
          return yi(t.m, t.g, t.Ye, i, n);
      }

      t.Ru;
    }(t, i, n);
  }

  function Ci(t, i, n, h, s, r, e, u, o) {
    var a = v(n) ? n : n.close,
        l = v(n) ? n : n.high,
        f = v(n) ? n : n.low,
        c = v(i.size) ? Math.max(i.size, 0) : 1,
        _ = gi(u.Br()) * c,
        d = _ / 2;

    switch (t.Ye = _, i.position) {
      case "inBar":
        return t.g = e.$(a, o), void (void 0 !== t.Lt && (t.Lt.g = t.g + d + r + .6 * s));

      case "aboveBar":
        return t.g = e.$(l, o) - d - h.ju, void 0 !== t.Lt && (t.Lt.g = t.g - d - .6 * s, h.ju += 1.2 * s), void (h.ju += _ + r);

      case "belowBar":
        return t.g = e.$(f, o) + d + h.Uu, void 0 !== t.Lt && (t.Lt.g = t.g + d + r + .6 * s, h.Uu += 1.2 * s), void (h.Uu += _ + r);
    }

    i.position;
  }

  var Ti = function () {
    function t(t, i) {
      this.T = !0, this.qu = !0, this.Hu = !0, this.Yu = null, this.at = new Ni(), this.Ku = t, this.hi = i, this.G = {
        M: [],
        _: null
      };
    }

    return t.prototype.B = function (t) {
      this.T = !0, this.Hu = !0, "data" === t && (this.qu = !0);
    }, t.prototype.I = function (t, i, n) {
      this.T && this.je();
      var h = this.hi.P().layout;
      return this.at.Nu(h.fontSize, h.fontFamily), this.at.v(this.G), this.at;
    }, t.prototype.$u = function () {
      if (this.Hu) {
        if (this.Ku.Xu().length > 0) {
          var t = this.hi.j().Br(),
              i = pi(t),
              n = 1.5 * gi(t) + 2 * i;
          this.Yu = {
            above: n,
            below: n
          };
        } else this.Yu = null;

        this.Hu = !1;
      }

      return this.Yu;
    }, t.prototype.je = function () {
      var t = this.Ku.X(),
          i = this.hi.j(),
          n = this.Ku.Xu();
      this.qu && (this.G.M = n.map(function (t) {
        return {
          V: t.time,
          m: 0,
          g: 0,
          Ye: 0,
          Ru: t.shape,
          et: t.color,
          Pu: t.Pu,
          Iu: t.id,
          Lt: void 0
        };
      }), this.qu = !1);
      var h = this.hi.P().layout;
      this.G._ = null;

      var s = i._r();

      if (null !== s) {
        var r = this.Ku.q();

        if (null !== r && 0 !== this.G.M.length) {
          var e = NaN,
              u = pi(i.Br()),
              o = {
            ju: u,
            Uu: u
          };
          this.G._ = Jt(this.G.M, s, !0);

          for (var a = this.G._.from; a < this.G._.to; a++) {
            var l = n[a];
            l.time !== e && (o.ju = u, o.Uu = u, e = l.time);
            var f = this.G.M[a];
            f.m = i.J(l.time), void 0 !== l.text && l.text.length > 0 && (f.Lt = {
              Wu: l.text,
              g: 0,
              dt: 0,
              wt: 0
            });
            var c = this.Ku.Zu(l.time);
            null !== c && Ci(f, l, c, o, h.fontSize, u, t, i, r.Z);
          }

          this.T = !1;
        }
      }
    }, t;
  }(),
      Ai = function (t) {
    function i(i) {
      return t.call(this, i) || this;
    }

    return r(i, t), i.prototype.Fu = function (t, i) {
      var n = this.Lu;
      n.tt = !1;
      var h = this.Ie.P();

      if (h.priceLineVisible) {
        var s = this.Ie.Ju(0 === h.priceLineSource);
        s.Gu || (n.tt = !0, n.g = s.zt, n.et = this.Ie.Qu(s.et), n.dt = i, n.wt = t, n.rt = h.priceLineWidth, n.ut = h.priceLineStyle);
      }
    }, i;
  }(wi),
      Ei = function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return n.lt = i, n;
    }

    return r(i, t), i.prototype.Zt = function (t, i, n) {
      t.tt = !1, i.tt = !1;
      var h = this.lt.P(),
          s = h.lastValueVisible,
          r = "" !== this.lt.io(),
          e = 0 === h.seriesLastValueMode,
          u = this.lt.Ju(!1);

      if (!u.Gu) {
        s && (t.Lt = this.no(u, s, e), t.tt = 0 !== t.Lt.length), (r || e) && (i.Lt = this.ho(u, s, r, e), i.tt = i.Lt.length > 0);
        var o = this.lt.Qu(u.et),
            a = B(o);
        n.gt = a.gt, n.et = a.pt, n.zt = u.zt, i.Pt = this.lt.ct().P().layout.backgroundColor, t.Pt = o;
      }
    }, i.prototype.ho = function (t, i, n, h) {
      var s = "",
          r = this.lt.io();
      return n && 0 !== r.length && (s += r + " "), i && h && (s += this.lt.X().vh() ? t.so : t.ro), s.trim();
    }, i.prototype.no = function (t, i, n) {
      return i ? n ? this.lt.X().vh() ? t.ro : t.so : t.Lt : "";
    }, i;
  }(I),
      Li = function () {
    function t(t, i) {
      this.Pn = t, this.eo = i || null;
    }

    return t.prototype.xh = function () {
      return this.Pn;
    }, t.prototype.us = function () {
      return this.eo;
    }, t.prototype.mn = function () {
      return null === this.Pn ? null : {
        priceRange: this.Pn.mn(),
        margins: this.eo || void 0
      };
    }, t.gn = function (i) {
      return null === i ? null : new t(G.gn(i.priceRange), i.margins);
    }, t;
  }(),
      Bi = function (t) {
    function i(i, n) {
      var h = t.call(this, i) || this;
      return h.uo = n, h;
    }

    return r(i, t), i.prototype.Fu = function (t, i) {
      var n = this.Lu;
      n.tt = !1;
      var h = this.uo.oo();

      if (null !== h) {
        var s = this.uo.P();
        n.tt = !0, n.g = h, n.et = s.color, n.dt = i, n.wt = t, n.rt = s.lineWidth, n.ut = s.lineStyle;
      }
    }, i;
  }(wi),
      Fi = function (t) {
    function i(i, n) {
      var h = t.call(this) || this;
      return h.Ku = i, h.uo = n, h;
    }

    return r(i, t), i.prototype.Zt = function (t, i, n) {
      t.tt = !1, i.tt = !1;
      var h = this.uo.P();

      if (h.axisLabelVisible) {
        var s = this.uo.oo();

        if (null !== s) {
          t.Lt = this.Ku.X().Zh(h.price), t.tt = !0;
          var r = B(h.color);
          n.gt = r.gt, n.et = r.pt, n.zt = s;
        }
      }
    }, i;
  }(I),
      Vi = function () {
    function t(t, i) {
      this.Ku = t, this.xi = i, this.ao = new Bi(t, this), this.Su = new Fi(t, this);
    }

    return t.prototype.eh = function (t) {
      c(this.xi, t), this.B(), this.Ku.ct().Lr();
    }, t.prototype.P = function () {
      return this.xi;
    }, t.prototype.lo = function () {
      return this.ao;
    }, t.prototype.fo = function () {
      return this.Su;
    }, t.prototype.B = function () {
      this.ao.B(), this.Su.B();
    }, t.prototype.oo = function () {
      var t = this.Ku,
          i = t.X();
      if (t.ct().j().Qt() || i.Qt()) return null;
      var n = t.q();
      return null === n ? null : i.$(this.xi.price, n.Z);
    }, t;
  }(),
      zi = function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return n.hi = i, n;
    }

    return r(i, t), i.prototype.ct = function () {
      return this.hi;
    }, i;
  }(q),
      Oi = {
    H: "",
    cu: "",
    fu: ""
  },
      Pi = function () {
    function t(t) {
      this.Ku = t;
    }

    return t.prototype.Y = function (t, i) {
      var n = this.Ku.co(),
          h = this.Ku.P();

      switch (n) {
        case "Line":
          return this.vo(h);

        case "Area":
          return this._o(h);

        case "Bar":
          return this["do"](h, t, i);

        case "Candlestick":
          return this.wo(h, t, i);

        case "Histogram":
          return this.Mo(h, t, i);
      }

      throw new Error("Unknown chart style");
    }, t.prototype["do"] = function (t, i, n) {
      var h = _e({}, Oi),
          s = t.upColor,
          r = t.downColor,
          u = s,
          o = r,
          a = l(this.bo(i, n)),
          c = f(a.Z[0]) <= f(a.Z[3]);

      return h.H = c ? s : r, h.cu = c ? u : o, h;
    }, t.prototype.wo = function (t, i, n) {
      var h = _e({}, Oi),
          s = t.upColor,
          r = t.downColor,
          u = t.borderUpColor,
          o = t.borderDownColor,
          a = t.wickUpColor,
          c = t.wickDownColor,
          v = l(this.bo(i, n)),
          _ = f(v.Z[0]) <= f(v.Z[3]);

      return h.H = _ ? s : r, h.cu = _ ? u : o, h.fu = _ ? a : c, h;
    }, t.prototype._o = function (t) {
      return _e(_e({}, Oi), {
        H: t.lineColor
      });
    }, t.prototype.vo = function (t) {
      return _e(_e({}, Oi), {
        H: t.color
      });
    }, t.prototype.Mo = function (t, i, n) {
      var h = _e({}, Oi),
          s = l(this.bo(i, n));

      return h.H = void 0 !== s.et ? s.et : t.color, h;
    }, t.prototype.bo = function (t, i) {
      return void 0 !== i ? i.Z : this.Ku.qi().mo(t);
    }, t;
  }(),
      Ii = function () {
    function t() {
      this.po = [], this.yo = new Map(), this.ko = new Map();
    }

    return t.prototype.xo = function () {
      this.po = [], this.yo.clear(), this.ko.clear();
    }, t.prototype.No = function () {
      return this.Ye() > 0 ? this.po[this.po.length - 1] : null;
    }, t.prototype.So = function () {
      return this.Ye() > 0 ? this.Do(0) : null;
    }, t.prototype.Ui = function () {
      return this.Ye() > 0 ? this.Do(this.po.length - 1) : null;
    }, t.prototype.Ye = function () {
      return this.po.length;
    }, t.prototype.Qt = function () {
      return 0 === this.Ye();
    }, t.prototype.Ls = function (t) {
      return null !== this.Co(t, 0);
    }, t.prototype.mo = function (t) {
      return this.To(t);
    }, t.prototype.To = function (t, i) {
      void 0 === i && (i = 0);
      var n = this.Co(t, i);
      return null === n ? null : _e(_e({}, this.Ao(n)), {
        zs: this.Do(n)
      });
    }, t.prototype.Xe = function () {
      return this.po;
    }, t.prototype.Eo = function (t, i, n) {
      if (this.Qt()) return null;

      for (var h = null, s = 0, r = n; s < r.length; s++) {
        var e = r[s];
        h = Wi(h, this.Lo(t, i, e));
      }

      return h;
    }, t.prototype.wn = function (t) {
      0 !== t.length && (this.Qt() || t[t.length - 1].zs < this.po[0].zs ? this.Bo(t) : t[0].zs > this.po[this.po.length - 1].zs ? this.Fo(t) : 1 !== t.length || t[0].zs !== this.po[this.po.length - 1].zs ? this.Vo(t) : this.zo(t[0]));
    }, t.prototype.Do = function (t) {
      return this.po[t].zs;
    }, t.prototype.Ao = function (t) {
      return this.po[t];
    }, t.prototype.Co = function (t, i) {
      var n = this.Oo(t);
      if (null === n && 0 !== i) switch (i) {
        case -1:
          return this.Po(t);

        case 1:
          return this.Io(t);

        default:
          throw new TypeError("Unknown search mode");
      }
      return n;
    }, t.prototype.Po = function (t) {
      var i = this.Wo(t);
      return i > 0 && (i -= 1), i !== this.po.length && this.Do(i) < t ? i : null;
    }, t.prototype.Io = function (t) {
      var i = this.Ro(t);
      return i !== this.po.length && t < this.Do(i) ? i : null;
    }, t.prototype.Oo = function (t) {
      var i = this.Wo(t);
      return i === this.po.length || t < this.po[i].zs ? null : i;
    }, t.prototype.Wo = function (t) {
      return Kt(this.po, t, function (t, i) {
        return t.zs < i;
      });
    }, t.prototype.Ro = function (t) {
      return $t(this.po, t, function (t, i) {
        return i.zs > t;
      });
    }, t.prototype.jo = function (t, i, n) {
      for (var h = null, s = t; s < i; s++) {
        var r = this.po[s].Z[n];
        Number.isNaN(r) || (null === h ? h = {
          Uo: r,
          qo: r
        } : (r < h.Uo && (h.Uo = r), r > h.qo && (h.qo = r)));
      }

      return h;
    }, t.prototype.Ho = function (t) {
      var i = Math.floor(t.zs / 30);
      this.yo.forEach(function (t) {
        return t["delete"](i);
      });
    }, t.prototype.Bo = function (t) {
      o(0 !== t.length, "plotRows should not be empty"), this.ko.clear(), this.yo.clear(), this.po = t.concat(this.po);
    }, t.prototype.Fo = function (t) {
      o(0 !== t.length, "plotRows should not be empty"), this.ko.clear(), this.yo.clear(), this.po = this.po.concat(t);
    }, t.prototype.zo = function (t) {
      o(!this.Qt(), "plot list should not be empty"), o(this.po[this.po.length - 1].zs === t.zs, "last row index should match new row index"), this.Ho(t), this.ko["delete"](t.zs), this.po[this.po.length - 1] = t;
    }, t.prototype.Vo = function (t) {
      o(0 !== t.length, "plot rows should not be empty"), this.ko.clear(), this.yo.clear(), this.po = function (t, i) {
        var n = function (t, i) {
          var n = t.length,
              h = i.length,
              s = n + h,
              r = 0,
              e = 0;

          for (; r < n && e < h;) {
            t[r].zs < i[e].zs ? r++ : t[r].zs > i[e].zs ? e++ : (r++, e++, s--);
          }

          return s;
        }(t, i),
            h = new Array(n),
            s = 0,
            r = 0,
            e = t.length,
            u = i.length,
            o = 0;

        for (; s < e && r < u;) {
          t[s].zs < i[r].zs ? (h[o] = t[s], s++) : t[s].zs > i[r].zs ? (h[o] = i[r], r++) : (h[o] = i[r], s++, r++), o++;
        }

        for (; s < e;) {
          h[o] = t[s], s++, o++;
        }

        for (; r < u;) {
          h[o] = i[r], r++, o++;
        }

        return h;
      }(this.po, t);
    }, t.prototype.Lo = function (t, i, n) {
      if (this.Qt()) return null;
      var h = null,
          s = l(this.So()),
          r = l(this.Ui()),
          e = Math.max(t, s),
          u = Math.min(i, r),
          o = 30 * Math.ceil(e / 30),
          a = Math.max(o, 30 * Math.floor(u / 30)),
          f = this.Wo(e),
          c = this.Ro(Math.min(u, o, i));
      h = Wi(h, this.jo(f, c, n));
      var v = this.yo.get(n);
      void 0 === v && (v = new Map(), this.yo.set(n, v));

      for (var _ = Math.max(o + 1, e); _ < a; _ += 30) {
        var d = Math.floor(_ / 30),
            w = v.get(d);

        if (void 0 === w) {
          var M = this.Wo(30 * d),
              b = this.Ro(30 * (d + 1) - 1);
          w = this.jo(M, b, n), v.set(d, w);
        }

        h = Wi(h, w);
      }

      f = this.Wo(a), c = this.Ro(u);
      return h = Wi(h, this.jo(f, c, n));
    }, t;
  }();

  function Wi(t, i) {
    return null === t ? i : null === i ? t : {
      Uo: Math.min(t.Uo, i.Uo),
      qo: Math.max(t.qo, i.qo)
    };
  }

  var Ri = function (t) {
    function i(i, n, h) {
      var s = t.call(this, i) || this;
      s.G = new Ii(), s.ao = new Ai(s), s.Yo = [], s.Ko = new Mi(s), s.$o = null, s.Xo = [], s.Zo = [], s.xi = n, s.Jo = h;
      var r = new Ei(s);
      return s.bi = [r], s.Go = new _i(r, s, i), s.Qo(), s.ta(), s;
    }

    return r(i, t), i.prototype.on = function () {}, i.prototype.Qu = function (t) {
      return this.xi.priceLineColor || t;
    }, i.prototype.Ju = function (t, i) {
      var n = {
        Gu: !0
      },
          h = this.X();
      if (this.ct().j().Qt() || h.Qt() || this.G.Qt()) return n;

      var s,
          r,
          e = this.ct().j()._r(),
          u = this.q();

      if (null === e || null === u) return n;

      if (t) {
        var o = this.G.No();
        if (null === o) return n;
        s = o, r = o.zs;
      } else {
        var a = this.G.To(e.es(), -1);
        if (null === a) return n;
        if (null === (s = this.G.mo(a.zs))) return n;
        r = a.zs;
      }

      var l = s.Z[3],
          f = this.K().Y(r, {
        Z: s
      }),
          c = h.$(l, u.Z);
      return {
        Gu: !1,
        O: i ? l : void 0,
        Lt: h.ti(l, u.Z),
        so: h.Zh(l),
        ro: h.Gh(l, u.Z),
        et: f.H,
        zt: c,
        zs: r
      };
    }, i.prototype.K = function () {
      return null !== this.$o || (this.$o = new Pi(this)), this.$o;
    }, i.prototype.P = function () {
      return this.xi;
    }, i.prototype.eh = function (t) {
      var i = t.priceScaleId;
      void 0 !== i && i !== this.xi.priceScaleId && this.ct().ia(this, i), c(this.xi, t), null !== this.ei && void 0 !== t.scaleMargins && this.ei.eh({
        scaleMargins: t.scaleMargins
      }), void 0 !== t.priceFormat && this.Qo(), this.ct().na(this);
    }, i.prototype.ha = function () {
      this.G.xo(), this.ta();
    }, i.prototype.sa = function (t, i) {
      i && this.G.xo(), this.G.wn(t), this.ra(), this.Ai.B("data"), this.Ni.B("data");
      var n = this.ct().Cu(this);
      this.ct().ea(n), this.ct().na(this), this.ct().ua(), this.ct().Lr();
    }, i.prototype.oa = function (t) {
      this.Xo = t.map(function (t) {
        return _e({}, t);
      }), this.ra();
      var i = this.ct().Cu(this);
      this.Ni.B("data"), this.ct().ea(i), this.ct().na(this), this.ct().ua(), this.ct().Lr();
    }, i.prototype.Xu = function () {
      return this.Zo;
    }, i.prototype.aa = function (t) {
      var i = new Vi(this, t);
      return this.Yo.push(i), this.ct().na(this), i;
    }, i.prototype.la = function (t) {
      var i = this.Yo.indexOf(t);
      -1 !== i && this.Yo.splice(i, 1), this.ct().na(this);
    }, i.prototype.co = function () {
      return this.Jo;
    }, i.prototype.q = function () {
      var t = this.fa();
      return null === t ? null : {
        Z: t.Z[3],
        Wh: t.V
      };
    }, i.prototype.fa = function () {
      var t = this.ct().j()._r();

      if (null === t) return null;
      var i = t.rs();
      return this.G.To(i, 1);
    }, i.prototype.qi = function () {
      return this.G;
    }, i.prototype.Zu = function (t) {
      var i = this.G.mo(t);
      return null === i ? null : "Bar" === this.Jo || "Candlestick" === this.Jo ? {
        open: i.Z[0],
        high: i.Z[1],
        low: i.Z[2],
        close: i.Z[3]
      } : i.Z[3];
    }, i.prototype.ci = function () {
      var t = [];
      this.ca() || t.push(this.Ko);

      for (var i = 0, n = this.Yo; i < n.length; i++) {
        var h = n[i];
        t.push(h.lo());
      }

      return t.push(this.Ai), t.push(this.ao), t.push(this.Go), t.push(this.Ni), t;
    }, i.prototype.fi = function (t, i) {
      for (var n = i === this.ei || this.ca() ? u(this.bi) : [], h = 0, s = this.Yo; h < s.length; h++) {
        var r = s[h];
        n.push(r.fo());
      }

      return n;
    }, i.prototype.ss = function (t, i) {
      var n = this;

      if (void 0 !== this.xi.autoscaleInfoProvider) {
        var h = this.xi.autoscaleInfoProvider(function () {
          var h = n.va(t, i);
          return null === h ? null : h.mn();
        });
        return Li.gn(h);
      }

      return this.va(t, i);
    }, i.prototype.ns = function () {
      return this.xi.priceFormat.minMove;
    }, i.prototype.$h = function () {
      return this.Gn;
    }, i.prototype.Wi = function () {
      this.Ai.B(), this.Ni.B();

      for (var t = 0, i = this.bi; t < i.length; t++) {
        i[t].B();
      }

      for (var n = 0, h = this.Yo; n < h.length; n++) {
        h[n].B();
      }

      this.ao.B(), this.Ko.B();
    }, i.prototype.X = function () {
      return l(this.ei);
    }, i.prototype.U = function (t) {
      if (!(("Line" === this.Jo || "Area" === this.Jo) && this.xi.crosshairMarkerVisible)) return null;
      var i = this.G.mo(t);
      return null === i ? null : {
        O: i.Z[3],
        k: this._a()
      };
    }, i.prototype.io = function () {
      return this.xi.title;
    }, i.prototype.ca = function () {
      return !Pt(this.X().rh());
    }, i.prototype.va = function (t, i) {
      if (!_(t) || !_(i) || this.G.Qt()) return null;
      var n = "Line" === this.Jo || "Area" === this.Jo || "Histogram" === this.Jo ? [3] : [2, 1],
          h = this.G.Eo(t, i, n),
          s = null !== h ? new G(h.Uo, h.qo) : null;

      if ("Histogram" === this.co()) {
        var r = this.xi.base,
            e = new G(r, r);
        s = null !== s ? s.wn(e) : e;
      }

      return new Li(s, this.Ni.$u());
    }, i.prototype._a = function () {
      switch (this.Jo) {
        case "Line":
        case "Area":
          return this.xi.crosshairMarkerRadius;
      }

      return 0;
    }, i.prototype.Qo = function () {
      switch (this.xi.priceFormat.type) {
        case "custom":
          this.Gn = {
            Xi: this.xi.priceFormat.formatter
          };
          break;

        case "volume":
          this.Gn = new Ut(this.xi.priceFormat.precision);
          break;

        case "percent":
          this.Gn = new Z(this.xi.priceFormat.precision);
          break;

        default:
          var t = Math.pow(10, this.xi.priceFormat.precision);
          this.Gn = new X(t, this.xi.priceFormat.minMove * t, !1, void 0);
      }

      null !== this.ei && this.ei.uh();
    }, i.prototype.ra = function () {
      var t = this,
          i = this.ct().j();
      if (i.Qt() || 0 === this.G.Ye()) this.Zo = [];else {
        var n = l(this.G.So());
        this.Zo = this.Xo.map(function (h, s) {
          var r = l(i.vr(h.time, !0)),
              e = r < n ? 1 : -1;
          return {
            time: l(t.G.To(r, e)).zs,
            position: h.position,
            shape: h.shape,
            color: h.color,
            id: h.id,
            Pu: s,
            text: h.text,
            size: h.size
          };
        });
      }
    }, i.prototype.ta = function () {
      switch (this.Ni = new Ti(this, this.ct()), this.Jo) {
        case "Bar":
          this.Ai = new hi(this, this.ct());
          break;

        case "Candlestick":
          this.Ai = new ri(this, this.ct());
          break;

        case "Line":
          this.Ai = new li(this, this.ct());
          break;

        case "Area":
          this.Ai = new ti(this, this.ct());
          break;

        case "Histogram":
          this.Ai = new ai(this, this.ct());
          break;

        default:
          throw Error("Unknown chart style assigned: " + this.Jo);
      }
    }, i;
  }(zi),
      ji = function () {
    function t(t) {
      this.xi = t;
    }

    return t.prototype.da = function (t, i, n) {
      var h = t;
      if (0 === this.xi.mode) return h;
      var s = n.Di(),
          r = s.q();
      if (null === r) return h;
      var e = s.$(t, r),
          u = n.Vh().filter(function (t) {
        return t instanceof Ri;
      }).reduce(function (t, h) {
        if (n.Tu(h)) return t;
        var s = h.X(),
            r = h.qi();
        if (s.Qt() || !r.Ls(i)) return t;
        var e = r.mo(i);
        if (null === e) return t;
        var u = f(h.q());
        return t.concat([s.$(e.Z[3], u.Z)]);
      }, []);
      if (0 === u.length) return h;
      u.sort(function (t, i) {
        return Math.abs(t - e) - Math.abs(i - e);
      });
      var o = u[0];
      return h = s.Ci(o, r);
    }, t;
  }(),
      Ui = function () {
    function t(t, i) {
      this.Kn = [], this.wa = new Map(), this.zn = 0, this.Hs = 0, this.Ma = 1e3, this.$n = null, this.ba = new J(), this.ma = t, this.hi = i;
      var n = i.P();
      this.ga = this.pa("left", n.leftPriceScale), this.ya = this.pa("right", n.rightPriceScale), this.ga.mh().tn(this.ka.bind(this, this.ga), this), this.ya.mh().tn(this.ka.bind(this, this.ga), this), this.xa(n);
    }

    return t.prototype.xa = function (t) {
      if (t.leftPriceScale && this.ga.eh(t.leftPriceScale), t.rightPriceScale && this.ya.eh(t.rightPriceScale), t.localization && (this.ga.uh(), this.ya.uh()), t.overlayPriceScales) for (var i = 0, n = Array.from(this.wa.values()); i < n.length; i++) {
        var h = l(n[i][0].X());
        h.eh(t.overlayPriceScales), t.localization && h.uh();
      }
    }, t.prototype.Na = function (t) {
      switch (t) {
        case "left":
          return this.ga;

        case "right":
          return this.ya;
      }

      return this.wa.has(t) ? a(this.wa.get(t))[0].X() : null;
    }, t.prototype.on = function () {
      this.ct().Sa().rn(this), this.ga.mh().rn(this), this.ya.mh().rn(this), this.Kn.forEach(function (t) {
        t.on && t.on();
      }), this.ba.en();
    }, t.prototype.Da = function () {
      return this.Ma;
    }, t.prototype.Ca = function (t) {
      this.Ma = t;
    }, t.prototype.ct = function () {
      return this.hi;
    }, t.prototype.dt = function () {
      return this.Hs;
    }, t.prototype.wt = function () {
      return this.zn;
    }, t.prototype.kr = function (t) {
      this.Hs = t, this.Ta();
    }, t.prototype.gh = function (t) {
      var i = this;
      this.zn = t, this.ga.gh(t), this.ya.gh(t), this.Kn.forEach(function (n) {
        if (i.Tu(n)) {
          var h = n.X();
          null !== h && h.gh(t);
        }
      }), this.Ta();
    }, t.prototype.Vh = function () {
      return this.Kn;
    }, t.prototype.Tu = function (t) {
      var i = t.X();
      return null === i || this.ga !== i && this.ya !== i;
    }, t.prototype.Oh = function (t, i, n) {
      var h = void 0 !== n ? n : this.Ea().Aa - 1;
      this.La(t, i, h);
    }, t.prototype.Ih = function (t) {
      var i = this.Kn.indexOf(t);
      o(-1 !== i, "removeDataSource: invalid data source"), this.Kn.splice(i, 1);
      var n = l(t.X()).rh();

      if (this.wa.has(n)) {
        var h = a(this.wa.get(n)),
            s = h.indexOf(t);
        -1 !== s && (h.splice(s, 1), 0 === h.length && this.wa["delete"](n));
      }

      var r = t.X();
      r && r.Vh().indexOf(t) >= 0 && r.Ih(t), null !== r && (r.Ph(), this.Ba(r)), this.$n = null;
    }, t.prototype.Au = function (t) {
      return t === this.ga ? "left" : t === this.ya ? "right" : "overlay";
    }, t.prototype.Fa = function () {
      return this.ga;
    }, t.prototype.Va = function () {
      return this.ya;
    }, t.prototype.za = function (t, i) {
      t.jh(i);
    }, t.prototype.Oa = function (t, i) {
      t.Uh(i), this.Ta();
    }, t.prototype.Pa = function (t) {
      t.qh();
    }, t.prototype.Ia = function (t, i) {
      t.Hh(i);
    }, t.prototype.Wa = function (t, i) {
      t.Yh(i), this.Ta();
    }, t.prototype.Ra = function (t) {
      t.Kh();
    }, t.prototype.Ta = function () {
      this.Kn.forEach(function (t) {
        t.Wi();
      });
    }, t.prototype.Di = function () {
      var t = null;
      return this.hi.P().rightPriceScale.visible && 0 !== this.ya.Vh().length ? t = this.ya : this.hi.P().leftPriceScale.visible && 0 !== this.ga.Vh().length ? t = this.ga : 0 !== this.Kn.length && (t = this.Kn[0].X()), null === t && (t = this.ya), t;
    }, t.prototype.Ba = function (t) {
      null !== t && t.fh() && this.ja(t);
    }, t.prototype.Ua = function (t) {
      var i = this.ma._r();

      t.oh({
        dh: !0
      }), null !== i && t.ts(i), this.Ta();
    }, t.prototype.qa = function () {
      this.ja(this.ga), this.ja(this.ya);
    }, t.prototype.Ha = function () {
      var t = this;
      this.Ba(this.ga), this.Ba(this.ya), this.Kn.forEach(function (i) {
        t.Tu(i) && t.Ba(i.X());
      }), this.Ta(), this.hi.Lr();
    }, t.prototype.zh = function () {
      return null === this.$n && (this.$n = _t(this.Kn)), this.$n;
    }, t.prototype.Ya = function () {
      return this.ba;
    }, t.prototype.ja = function (t) {
      var i = t.Qh();

      if (i && i.length > 0 && !this.ma.Qt()) {
        var n = this.ma._r();

        null !== n && t.ts(n);
      }

      t.Wi();
    }, t.prototype.Ea = function () {
      var t = this.zh();
      if (0 === t.length) return {
        Aa: 0,
        Ka: 0
      };

      for (var i = 0, n = 0, h = 0; h < t.length; h++) {
        var s = t[h].oi();
        null !== s && (s < i && (i = s), s > n && (n = s));
      }

      return {
        Aa: i,
        Ka: n
      };
    }, t.prototype.La = function (t, i, n) {
      var h = this.Na(i);

      if (null === h && (h = this.pa(i, this.hi.P().overlayPriceScales)), this.Kn.push(t), !Pt(i)) {
        var s = this.wa.get(i) || [];
        s.push(t), this.wa.set(i, s);
      }

      h.Oh(t), t.li(h), t.ai(n), this.Ba(h), this.$n = null;
    }, t.prototype.ka = function (t, i, n) {
      i.ah !== n.ah && this.ja(t);
    }, t.prototype.pa = function (t, i) {
      var n = _e({
        tt: !0,
        dh: !0
      }, M(i)),
          h = new bt(t, n, this.hi.P().layout, this.hi.P().localization);

      return h.gh(this.wt()), h;
    }, t;
  }(),
      qi = function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return n.$a = new Map(), n.G = i, n;
    }

    return r(i, t), i.prototype.s = function (t) {}, i.prototype.o = function (t) {
      if (this.G.tt) {
        t.save();

        for (var i = 0, n = 0, h = this.G.Xa; n < h.length; n++) {
          if (0 !== (o = h[n]).Lt.length) {
            t.font = o.kt;
            var s = this.Za(t, o.Lt);
            s > this.G.dt ? o.Pr = this.G.dt / s : o.Pr = 1, i += o.Ja * o.Pr;
          }
        }

        var r = 0;

        switch (this.G.Ga) {
          case "top":
            r = 0;
            break;

          case "center":
            r = Math.max((this.G.wt - i) / 2, 0);
            break;

          case "bottom":
            r = Math.max(this.G.wt - i, 0);
        }

        t.fillStyle = this.G.et;

        for (var e = 0, u = this.G.Xa; e < u.length; e++) {
          var o = u[e];
          t.save();
          var a = 0;

          switch (this.G.Qa) {
            case "left":
              t.textAlign = "left", a = o.Ja / 2;
              break;

            case "center":
              t.textAlign = "center", a = this.G.dt / 2;
              break;

            case "right":
              t.textAlign = "right", a = this.G.dt - 1 - o.Ja / 2;
          }

          t.translate(a, r), t.textBaseline = "top", t.font = o.kt, t.scale(o.Pr, o.Pr), t.fillText(o.Lt, 0, o.tl), t.restore(), r += o.Ja * o.Pr;
        }

        t.restore();
      }
    }, i.prototype.Za = function (t, i) {
      var n = this.il(t.font),
          h = n.get(i);
      return void 0 === h && (h = t.measureText(i).width, n.set(i, h)), h;
    }, i.prototype.il = function (t) {
      var i = this.$a.get(t);
      return void 0 === i && (i = new Map(), this.$a.set(t, i)), i;
    }, i;
  }(p),
      Hi = function () {
    function t(t) {
      this.T = !0, this.ot = {
        tt: !1,
        et: "",
        wt: 0,
        dt: 0,
        Xa: [],
        Ga: "center",
        Qa: "center"
      }, this.at = new qi(this.ot), this.lt = t;
    }

    return t.prototype.B = function () {
      this.T = !0;
    }, t.prototype.I = function (t, i) {
      return this.T && (this.W(t, i), this.T = !1), this.at;
    }, t.prototype.W = function (t, i) {
      var n = this.lt.P(),
          h = this.ot;
      h.tt = n.visible, h.tt && (h.et = n.color, h.dt = i, h.wt = t, h.Qa = n.horzAlign, h.Ga = n.vertAlign, h.Xa = [{
        Lt: n.text,
        kt: zt(n.fontSize, n.fontFamily, n.fontStyle),
        Ja: 1.2 * n.fontSize,
        tl: 0,
        Pr: 0
      }]);
    }, t;
  }(),
      Yi = function (t) {
    function i(i, n) {
      var h = t.call(this) || this;
      return h.xi = n, h.Ai = new Hi(h), h;
    }

    return r(i, t), i.prototype.ci = function () {
      return [this.Ai];
    }, i.prototype.P = function () {
      return this.xi;
    }, i.prototype.Wi = function () {
      this.Ai.B();
    }, i;
  }(q),
      Ki = function () {
    function t(t, i) {
      this.nl = [], this.hl = [], this.Hs = 0, this.sl = null, this.rl = null, this.el = new J(), this.ul = new J(), this.ol = t, this.xi = i, this.al = new Ot(this), this.ma = new Lt(this, i.timeScale, this.xi.localization), this.ll = new Rt(), this.L = new H(this, i.crosshair), this.fl = new ji(i.crosshair), this.cl = new Yi(this, i.watermark), this.vl(), this.nl[0].Ca(2e3);
    }

    return t.prototype._l = function () {
      this.dl(new jt(3));
    }, t.prototype.Lr = function () {
      this.dl(new jt(2));
    }, t.prototype.na = function (t) {
      var i = this.wl(t);
      this.dl(i);
    }, t.prototype.Ml = function () {
      return this.rl;
    }, t.prototype.bl = function (t) {
      var i = this.rl;
      this.rl = t, null !== i && this.na(i.ml), null !== t && this.na(t.ml);
    }, t.prototype.P = function () {
      return this.xi;
    }, t.prototype.eh = function (t) {
      c(this.xi, t), this.nl.forEach(function (i) {
        return i.xa(t);
      }), void 0 !== t.timeScale && this.ma.eh(t.timeScale), void 0 !== t.localization && this.ma.ur(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.el.en(), this._l();
    }, t.prototype.gl = function (t, i) {
      var n = this.pl(t);
      null !== n && (n.X.eh(i), this.el.en());
    }, t.prototype.pl = function (t) {
      for (var i = 0, n = this.nl; i < n.length; i++) {
        var h = n[i],
            s = h.Na(t);
        if (null !== s) return {
          ft: h,
          X: s
        };
      }

      return null;
    }, t.prototype.j = function () {
      return this.ma;
    }, t.prototype.yl = function () {
      return this.nl;
    }, t.prototype.kl = function () {
      return this.ll;
    }, t.prototype.xl = function () {
      return this.cl;
    }, t.prototype.Nl = function () {
      return this.L;
    }, t.prototype.Sl = function () {
      return this.ul;
    }, t.prototype.Dl = function (t, i) {
      t.gh(i), this.Er();
    }, t.prototype.kr = function (t) {
      this.Hs = t, this.ma.kr(this.Hs), this.nl.forEach(function (i) {
        return i.kr(t);
      }), this.Er();
    }, t.prototype.vl = function (t) {
      var i = new Ui(this.ma, this);
      void 0 !== t ? this.nl.splice(t, 0, i) : this.nl.push(i);
      var n = void 0 === t ? this.nl.length - 1 : t,
          h = new jt(3);
      return h.ye(n, {
        ke: 0,
        dh: !0
      }), this.Me(h), i;
    }, t.prototype.za = function (t, i, n) {
      t.za(i, n);
    }, t.prototype.Oa = function (t, i, n) {
      t.Oa(i, n), this.ua(), this.dl(this.Cl(t, 2));
    }, t.prototype.Pa = function (t, i) {
      t.Pa(i), this.dl(this.Cl(t, 2));
    }, t.prototype.Ia = function (t, i, n) {
      i.fh() || t.Ia(i, n);
    }, t.prototype.Wa = function (t, i, n) {
      i.fh() || (t.Wa(i, n), this.ua(), this.dl(this.Cl(t, 2)));
    }, t.prototype.Ra = function (t, i) {
      i.fh() || (t.Ra(i), this.dl(this.Cl(t, 2)));
    }, t.prototype.Ua = function (t, i) {
      t.Ua(i), this.dl(this.Cl(t, 2));
    }, t.prototype.Tl = function (t) {
      this.ma.jh(t);
    }, t.prototype.Al = function (t, i) {
      var n = this.j();

      if (!n.Qt() && 0 !== i) {
        var h = n.dt();
        t = Math.max(1, Math.min(t, h)), n.Pr(t, i), this.Er();
      }
    }, t.prototype.El = function (t) {
      this.Ll(0), this.Bl(t), this.Fl();
    }, t.prototype.Vl = function (t) {
      this.ma.Uh(t), this.Er();
    }, t.prototype.zl = function () {
      this.ma.qh(), this.Lr();
    }, t.prototype.Ll = function (t) {
      this.sl = t, this.ma.Hh(t);
    }, t.prototype.Bl = function (t) {
      var i = !1;
      return null !== this.sl && Math.abs(t - this.sl) > 20 && (this.sl = null, i = !0), this.ma.Yh(t), this.Er(), i;
    }, t.prototype.Fl = function () {
      this.ma.Kh(), this.Lr(), this.sl = null;
    }, t.prototype.Ol = function () {
      this.ma.zr(), this.Er();
    }, t.prototype.Me = function (t) {
      this.ol && this.ol(t), this.ll.Me(), this.Lr();
    }, t.prototype.F = function () {
      return this.hl;
    }, t.prototype.Pl = function (t, i, n) {
      this.L.Ei(t, i);

      var h = NaN,
          s = this.ma.Tr(t),
          r = this.ma._r();

      null !== r && (s = Math.min(Math.max(r.rs(), s), r.es()));
      var e = n.Di(),
          u = e.q();
      null !== u && (h = e.Ci(i, u)), h = this.fl.da(h, s, n), this.L.Vi(s, h, n), this.Il(), this.ul.en(this.L.R(), {
        x: t,
        y: i
      });
    }, t.prototype.Wl = function () {
      this.Nl().Oi(), this.Il(), this.ul.en(null, null);
    }, t.prototype.ua = function () {
      var t = this.L.ft();

      if (null !== t) {
        var i = this.L.Bi(),
            n = this.L.Fi();
        this.Pl(i, n, t);
      }
    }, t.prototype.Rl = function (t, i) {
      void 0 !== i && this.ma.B(i);

      var n = this.ma.Dr(),
          h = this.ma._r();

      if (null !== h) {
        var s = h.Ls(n);

        if (t > n && !s) {
          var r = t - n;
          this.ma.cr(this.ma.Fr() - r);
        }
      }

      this.ma.Or(t);
    }, t.prototype.ea = function (t) {
      null !== t && t.Ha();
    }, t.prototype.Cu = function (t) {
      var i = this.nl.find(function (i) {
        return i.zh().includes(t);
      });
      return void 0 === i ? null : i;
    }, t.prototype.Er = function () {
      this.cl.Wi(), this.nl.forEach(function (t) {
        return t.Ha();
      }), this.ua();
    }, t.prototype.on = function () {
      this.nl.forEach(function (t) {
        return t.on();
      }), this.nl.length = 0, this.xi.localization.priceFormatter = void 0, this.xi.localization.timeFormatter = void 0;
    }, t.prototype.jl = function () {
      return this.al;
    }, t.prototype.Eu = function () {
      return this.al.P();
    }, t.prototype.Sa = function () {
      return this.el;
    }, t.prototype.Ul = function (t, i) {
      var n = this.nl[0],
          h = this.ql(i, t, n);
      return this.hl.push(h), 1 === this.hl.length ? this._l() : this.Lr(), h;
    }, t.prototype.Hl = function (t) {
      var i = this.Cu(t),
          n = this.hl.indexOf(t);
      o(-1 !== n, "Series not found"), this.hl.splice(n, 1), l(i).Ih(t), t.on && t.on();
    }, t.prototype.ia = function (t, i) {
      var n = l(this.Cu(t));
      n.Ih(t);
      var h = this.pl(i);

      if (null === h) {
        var s = t.oi();
        n.Oh(t, i, s);
      } else {
        s = h.ft === n ? t.oi() : void 0;
        h.ft.Oh(t, i, s);
      }
    }, t.prototype.Kr = function () {
      var t = new jt(2);
      t.Se(), this.dl(t);
    }, t.prototype.Yl = function (t) {
      var i = new jt(2);
      i.$r(t), this.dl(i);
    }, t.prototype.Kl = function () {
      return this.xi.rightPriceScale.visible ? "right" : "left";
    }, t.prototype.Cl = function (t, i) {
      var n = new jt(i);

      if (null !== t) {
        var h = this.nl.indexOf(t);
        n.ye(h, {
          ke: i
        });
      }

      return n;
    }, t.prototype.wl = function (t, i) {
      return void 0 === i && (i = 2), this.Cl(this.Cu(t), i);
    }, t.prototype.dl = function (t) {
      this.ol && this.ol(t), this.ll.Me();
    }, t.prototype.Il = function () {
      this.dl(new jt(1));
    }, t.prototype.ql = function (t, i, n) {
      var h = new Ri(this, t, i),
          s = void 0 !== t.priceScaleId ? t.priceScaleId : this.Kl();
      return n.Oh(h, s), Pt(s) || h.eh(t), h;
    }, t;
  }(),
      $i = {
    allowDownsampling: !0
  };

  var Xi = function () {
    function t(t, i) {
      var n = this;
      this._resolutionMediaQueryList = null, this._resolutionListener = function (t) {
        return n._onResolutionChanged();
      }, this._canvasConfiguredListeners = [], this.canvas = t, this._canvasSize = {
        width: this.canvas.clientWidth,
        height: this.canvas.clientHeight
      }, this._options = i, this._configureCanvas(), this._installResolutionListener();
    }

    return t.prototype.destroy = function () {
      this._canvasConfiguredListeners.length = 0, this._uninstallResolutionListener(), this.canvas = null;
    }, Object.defineProperty(t.prototype, "canvasSize", {
      get: function get() {
        return {
          width: this._canvasSize.width,
          height: this._canvasSize.height
        };
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.resizeCanvas = function (t) {
      this._canvasSize = {
        width: t.width,
        height: t.height
      }, this._configureCanvas();
    }, Object.defineProperty(t.prototype, "pixelRatio", {
      get: function get() {
        var t = this.canvas.ownerDocument.defaultView;
        if (null == t) throw new Error("No window is associated with the canvas");
        return t.devicePixelRatio > 1 || this._options.allowDownsampling ? t.devicePixelRatio : 1;
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.subscribeCanvasConfigured = function (t) {
      this._canvasConfiguredListeners.push(t);
    }, t.prototype.unsubscribeCanvasConfigured = function (t) {
      this._canvasConfiguredListeners = this._canvasConfiguredListeners.filter(function (i) {
        return i != t;
      });
    }, t.prototype._configureCanvas = function () {
      var t = this.pixelRatio;
      this.canvas.style.width = this._canvasSize.width + "px", this.canvas.style.height = this._canvasSize.height + "px", this.canvas.width = this._canvasSize.width * t, this.canvas.height = this._canvasSize.height * t, this._emitCanvasConfigured();
    }, t.prototype._emitCanvasConfigured = function () {
      var t = this;

      this._canvasConfiguredListeners.forEach(function (i) {
        return i.call(t);
      });
    }, t.prototype._installResolutionListener = function () {
      if (null !== this._resolutionMediaQueryList) throw new Error("Resolution listener is already installed");
      var t = this.canvas.ownerDocument.defaultView;
      if (null == t) throw new Error("No window is associated with the canvas");
      var i = t.devicePixelRatio;
      this._resolutionMediaQueryList = t.matchMedia("all and (resolution: " + i + "dppx)"), this._resolutionMediaQueryList.addListener(this._resolutionListener);
    }, t.prototype._uninstallResolutionListener = function () {
      null !== this._resolutionMediaQueryList && (this._resolutionMediaQueryList.removeListener(this._resolutionListener), this._resolutionMediaQueryList = null);
    }, t.prototype._reinstallResolutionListener = function () {
      this._uninstallResolutionListener(), this._installResolutionListener();
    }, t.prototype._onResolutionChanged = function () {
      this._configureCanvas(), this._reinstallResolutionListener();
    }, t;
  }(),
      Zi = function () {
    function t(t, i) {
      this.ht = t, this.st = i;
    }

    return t.prototype.fn = function (t) {
      return this.ht === t.ht && this.st === t.st;
    }, t;
  }();

  function Ji(t) {
    return t.ownerDocument && t.ownerDocument.defaultView && t.ownerDocument.defaultView.devicePixelRatio || 1;
  }

  function Gi(t) {
    var i = l(t.getContext("2d"));
    return i.setTransform(1, 0, 0, 1, 0, 0), i;
  }

  function Qi(t) {
    var i = t.createElement("canvas");
    return function (t) {
      t.style.userSelect = "none", t.style.webkitUserSelect = "none", t.style.msUserSelect = "none", t.style.MozUserSelect = "none", t.style.webkitTapHighlightColor = "transparent";
    }(i), i;
  }

  function tn(t, i) {
    var n = Qi(t),
        h = Ji(n);
    return n.style.width = i.ht + "px", n.style.height = i.st + "px", n.width = i.ht * h, n.height = i.st * h, n;
  }

  function nn(t, i) {
    var n = Qi(l(t.ownerDocument));
    t.appendChild(n);

    var h = function (t, i) {
      return void 0 === i && (i = $i), new Xi(t, i);
    }(n);

    return h.resizeCanvas({
      width: i.ht,
      height: i.st
    }), h;
  }

  var hn = "undefined" != typeof window;

  var sn = function () {
    if (!hn) return !1;
    var t = !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || !!hn && ("ontouchstart" in window || Boolean(window.DocumentTouch && document instanceof window.DocumentTouch));
    return "onorientationchange" in window && t;
  }();

  var rn = function () {
    if (!hn) return !1;
    var t = /Android/i.test(navigator.userAgent),
        i = /iPhone|iPad|iPod|AppleWebKit.+Mobile/i.test(navigator.userAgent);
    return t || i;
  }(),
      en = function () {
    function t(t, i, n) {
      this.$l = 0, this.Xl = null, this.Zl = null, this.Jl = !1, this.Gl = null, this.Ql = !1, this.tf = !1, this["if"] = null, this.nf = null, this.hf = null, this.sf = null, this.rf = 0, this.ef = !1, this.uf = !1, this.af = !1, this.lf = t, this.ff = i, this.xi = n, this.cf();
    }

    return t.prototype.on = function () {
      null !== this["if"] && (this["if"](), this["if"] = null), null !== this.nf && (this.nf(), this.nf = null), null !== this.hf && (this.hf(), this.hf = null), this.vf(), this._f();
    }, t.prototype.df = function (t) {
      var i = this;
      this.nf && this.nf();
      var n = this.wf.bind(this);
      this.nf = function () {
        i.lf.removeEventListener("mousemove", n);
      }, this.lf.addEventListener("mousemove", n), an(t) && this.wf(t);
      var h = this.Mf(t);
      this.bf(h, this.ff.mf);
    }, t.prototype._f = function () {
      null !== this.Xl && clearTimeout(this.Xl), this.$l = 0, this.Xl = null;
    }, t.prototype.wf = function (t) {
      if (!this.af || an(t)) {
        var i = this.Mf(t);
        this.bf(i, this.ff.gf);
      }
    }, t.prototype.pf = function (t) {
      if ((!("button" in t) || 0 === t.button) && null === this.sf) {
        var i = an(t);

        if (!this.uf || !i) {
          this.ef = !0;
          var n = this.Mf(t),
              h = f(this.Gl),
              s = Math.abs(h.m - n.yf),
              r = Math.abs(h.g - n.kf),
              e = s + r > 5;

          if (e || !i) {
            if (e && !this.Ql && i) {
              var u = .5 * s,
                  o = r >= u && !this.xi.xf,
                  a = u > r && !this.xi.Nf;
              o || a || (this.uf = !0);
            }

            e && (this.Ql = !0, this.tf = !0, i && this.vf()), this.uf || (this.bf(n, this.ff.Sf), i && ln(t));
          }
        }
      }
    }, t.prototype.Df = function (t) {
      if (!("button" in t) || 0 === t.button) {
        var i = this.Mf(t);
        this.vf(), this.Gl = null, this.af = !1, this.hf && (this.hf(), this.hf = null), an(t) && this.Cf(t), this.bf(i, this.ff.Tf), ++this.$l, this.Xl && this.$l > 1 ? (this.bf(i, this.ff.Af), this._f()) : this.tf || this.bf(i, this.ff.Ef), an(t) && (ln(t), this.Cf(t), 0 === t.touches.length && (this.Jl = !1));
      }
    }, t.prototype.vf = function () {
      null !== this.Zl && (clearTimeout(this.Zl), this.Zl = null);
    }, t.prototype.Lf = function (t) {
      if (!("button" in t) || 0 === t.button) {
        var i = this.Mf(t);
        this.tf = !1, this.Ql = !1, this.uf = !1, an(t) && this.df(t), this.Gl = {
          m: i.yf,
          g: i.kf
        }, this.hf && (this.hf(), this.hf = null);
        var n = this.pf.bind(this),
            h = this.Df.bind(this),
            s = this.lf.ownerDocument.documentElement;
        this.hf = function () {
          s.removeEventListener("touchmove", n), s.removeEventListener("touchend", h), s.removeEventListener("mousemove", n), s.removeEventListener("mouseup", h);
        }, s.addEventListener("touchmove", n, {
          passive: !1
        }), s.addEventListener("touchend", h, {
          passive: !1
        }), this.vf(), an(t) && 1 === t.touches.length ? this.Zl = setTimeout(this.Bf.bind(this, t), 240) : (s.addEventListener("mousemove", n), s.addEventListener("mouseup", h)), this.af = !0, this.bf(i, this.ff.Ff), this.Xl || (this.$l = 0, this.Xl = setTimeout(this._f.bind(this), 500));
      }
    }, t.prototype.cf = function () {
      var t = this;
      this.lf.addEventListener("mouseenter", this.df.bind(this)), this.lf.addEventListener("touchcancel", this.vf.bind(this));

      var i = this.lf.ownerDocument,
          n = function n(i) {
        t.ff.Vf && (i.composed && t.lf.contains(i.composedPath()[0]) || i.target && t.lf.contains(i.target) || t.ff.Vf());
      };

      this["if"] = function () {
        i.removeEventListener("mousedown", n), i.removeEventListener("touchstart", n);
      }, i.addEventListener("mousedown", n), i.addEventListener("touchstart", n, {
        passive: !0
      }), this.lf.addEventListener("mouseleave", this.Cf.bind(this)), this.lf.addEventListener("touchstart", this.Lf.bind(this), {
        passive: !0
      }), sn || this.lf.addEventListener("mousedown", this.Lf.bind(this)), this.zf(), this.lf.addEventListener("touchmove", function () {}, {
        passive: !1
      });
    }, t.prototype.zf = function () {
      var t = this;
      void 0 === this.ff.Of && void 0 === this.ff.Pf && void 0 === this.ff.If || (this.lf.addEventListener("touchstart", function (i) {
        return t.Wf(i.touches);
      }, {
        passive: !0
      }), this.lf.addEventListener("touchmove", function (i) {
        if (2 === i.touches.length && null !== t.sf && void 0 !== t.ff.Pf) {
          var n = on(i.touches[0], i.touches[1]) / t.rf;
          t.ff.Pf(t.sf, n), ln(i);
        }
      }, {
        passive: !1
      }), this.lf.addEventListener("touchend", function (i) {
        t.Wf(i.touches);
      }));
    }, t.prototype.Wf = function (t) {
      1 === t.length && (this.ef = !1), 2 !== t.length || this.ef || this.Jl ? this.Rf() : this.jf(t);
    }, t.prototype.jf = function (t) {
      var i = un(this.lf);
      this.sf = {
        m: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
        g: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
      }, this.rf = on(t[0], t[1]), void 0 !== this.ff.Of && this.ff.Of(), this.vf();
    }, t.prototype.Rf = function () {
      null !== this.sf && (this.sf = null, void 0 !== this.ff.If && this.ff.If());
    }, t.prototype.Cf = function (t) {
      this.nf && this.nf();
      var i = this.Mf(t);
      this.bf(i, this.ff.Uf);
    }, t.prototype.Bf = function (t) {
      var i = this.Mf(t);
      this.bf(i, this.ff.qf), this.tf = !0, this.Jl = !0;
    }, t.prototype.bf = function (t, i) {
      i && i.call(this.ff, t);
    }, t.prototype.Mf = function (t) {
      var i;
      i = "touches" in t && t.touches.length ? t.touches[0] : "changedTouches" in t && t.changedTouches.length ? t.changedTouches[0] : t;
      var n = un(this.lf);
      return {
        Hf: i.clientX,
        Yf: i.clientY,
        yf: i.pageX,
        kf: i.pageY,
        Kf: i.screenX,
        $f: i.screenY,
        Xf: i.clientX - n.left,
        Zf: i.clientY - n.top,
        Jf: t.ctrlKey,
        Gf: t.altKey,
        Qf: t.shiftKey,
        tc: t.metaKey,
        ic: t.type.startsWith("mouse") ? "mouse" : "touch",
        nc: t.view
      };
    }, t;
  }();

  function un(t) {
    return t.getBoundingClientRect() || {
      left: 0,
      top: 0
    };
  }

  function on(t, i) {
    var n = t.clientX - i.clientX,
        h = t.clientY - i.clientY;
    return Math.sqrt(n * n + h * h);
  }

  function an(t) {
    return Boolean(t.touches);
  }

  function ln(t) {
    t.cancelable && t.preventDefault();
  }

  var fn = function () {
    function t(t, i, n, h) {
      this.xu = new ci(200), this.se = 0, this.hc = "", this.Vu = "", this.gu = [], this.sc = new Map(), this.se = t, this.hc = i, this.Vu = zt(t, n, h);
    }

    return t.prototype.on = function () {
      delete this.xu, this.gu = [], this.sc.clear();
    }, t.prototype.rc = function (t, i, n, h, s) {
      var r = this.ec(t, i);

      if ("left" !== s) {
        var e = Ji(t.canvas);
        n -= Math.floor(r.uc * e);
      }

      h -= Math.floor(r.wt / 2), t.drawImage(r.oc, n, h, r.dt, r.wt);
    }, t.prototype.ec = function (t, i) {
      var n,
          h = this;
      if (this.sc.has(i)) n = a(this.sc.get(i));else {
        if (this.gu.length >= 200) {
          var s = a(this.gu.shift());
          this.sc["delete"](s);
        }

        var r = Ji(t.canvas),
            e = Math.ceil(this.se / 4.5),
            u = Math.round(this.se / 10),
            o = Math.ceil(this.xu.Bt(t, i)),
            l = nt(Math.round(o + 2 * e)),
            f = nt(this.se + 2 * e),
            c = tn(document, new Zi(l, f));
        n = {
          Lt: i,
          uc: Math.round(Math.max(1, o)),
          dt: Math.ceil(l * r),
          wt: Math.ceil(f * r),
          oc: c
        }, 0 !== o && (this.gu.push(n.Lt), this.sc.set(n.Lt, n)), V(t = Gi(n.oc), r, function () {
          t.font = h.Vu, t.fillStyle = h.hc, t.fillText(i, 0, f - e - u);
        });
      }
      return n;
    }, t;
  }(),
      cn = function () {
    function t(t, i, n, h) {
      var s = this;
      this.Jt = null, this.ac = null, this.lc = null, this.fc = !1, this.cc = new ci(50), this.vc = new fn(11, "#000"), this.hc = null, this.Vu = null, this._c = 0, this.dc = function () {
        s.wc(s.al.P()), s._i.Mc().ct().Lr();
      }, this.bc = function () {
        s._i.Mc().ct().Lr();
      }, this._i = t, this.xi = i, this.al = n, this.mc = "left" === h, this.gc = document.createElement("div"), this.gc.style.height = "100%", this.gc.style.overflow = "hidden", this.gc.style.width = "25px", this.gc.style.left = "0", this.gc.style.position = "relative", this.pc = nn(this.gc, new Zi(16, 16)), this.pc.subscribeCanvasConfigured(this.dc);
      var r = this.pc.canvas;
      r.style.position = "absolute", r.style.zIndex = "1", r.style.left = "0", r.style.top = "0", this.yc = nn(this.gc, new Zi(16, 16)), this.yc.subscribeCanvasConfigured(this.bc);
      var e = this.yc.canvas;
      e.style.position = "absolute", e.style.zIndex = "2", e.style.left = "0", e.style.top = "0";
      var u = {
        Ff: this.kc.bind(this),
        Sf: this.xc.bind(this),
        Vf: this.Nc.bind(this),
        Tf: this.Sc.bind(this),
        Af: this.Dc.bind(this),
        mf: this.Cc.bind(this),
        Uf: this.Tc.bind(this)
      };
      this.Ac = new en(this.yc.canvas, u, {
        xf: !1,
        Nf: !0
      });
    }

    return t.prototype.on = function () {
      this.Ac.on(), this.yc.unsubscribeCanvasConfigured(this.bc), this.yc.destroy(), this.pc.unsubscribeCanvasConfigured(this.dc), this.pc.destroy(), null !== this.Jt && this.Jt.Rh().rn(this), this.Jt = null, null !== this.lc && (clearTimeout(this.lc), this.lc = null), this.vc.on();
    }, t.prototype.Ec = function () {
      return this.gc;
    }, t.prototype.Lc = function () {
      return this.xi.backgroundColor;
    }, t.prototype.N = function () {
      return l(this.Jt).P().borderColor;
    }, t.prototype.Bc = function () {
      return this.xi.textColor;
    }, t.prototype.Vt = function () {
      return this.xi.fontSize;
    }, t.prototype.Fc = function () {
      return zt(this.Vt(), this.xi.fontFamily);
    }, t.prototype.Vc = function () {
      var t = this.al.P(),
          i = this.hc !== t.et,
          n = this.Vu !== t.kt;
      return (i || n) && (this.wc(t), this.hc = t.et), n && (this.cc.pu(), this.Vu = t.kt), t;
    }, t.prototype.zc = function () {
      if (null === this.Jt) return 0;
      var t = 34,
          i = this.Vc(),
          n = Gi(this.pc.canvas),
          h = this.Jt.Vn();
      n.font = this.Fc(), h.length > 0 && (t = Math.max(this.cc.Bt(n, h[0].Ln), this.cc.Bt(n, h[h.length - 1].Ln)));

      for (var s = this.Oc(), r = s.length; r--;) {
        var e = this.cc.Bt(n, s[r].Lt());
        e > t && (t = e);
      }

      var u = Math.ceil(i.Dt + i.St + i.At + i.Et + t);
      return u += u % 2;
    }, t.prototype.Pc = function (t) {
      if (t.ht < 0 || t.st < 0) throw new Error("Try to set invalid size to PriceAxisWidget " + JSON.stringify(t));
      null !== this.ac && this.ac.fn(t) || (this.ac = t, this.pc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.yc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.gc.style.width = t.ht + "px", this.gc.style.height = t.st + "px", this.gc.style.minWidth = t.ht + "px");
    }, t.prototype.Ic = function () {
      return l(this.ac).ht;
    }, t.prototype.li = function (t) {
      this.Jt !== t && (null !== this.Jt && this.Jt.Rh().rn(this), this.Jt = t, t.Rh().tn(this.Hn.bind(this), this));
    }, t.prototype.X = function () {
      return this.Jt;
    }, t.prototype.pu = function () {
      var t = this._i.Wc();

      this._i.Mc().ct().Ua(t, l(this.X()));
    }, t.prototype.Rc = function (t) {
      if (null !== this.ac) {
        if (1 !== t) {
          var i = Gi(this.pc.canvas);
          this.jc(), this.Uc(i, this.pc.pixelRatio), this.uu(i, this.pc.pixelRatio), this.qc(i, this.pc.pixelRatio), this.Hc(i, this.pc.pixelRatio);
        }

        var n = Gi(this.yc.canvas),
            h = this.ac.ht,
            s = this.ac.st;
        V(n, this.yc.pixelRatio, function () {
          n.clearRect(0, 0, h, s);
        }), this.Yc(n, this.yc.pixelRatio);
      }
    }, t.prototype.Kc = function () {
      return this.pc.canvas;
    }, t.prototype.kc = function (t) {
      if (null !== this.Jt && !this.Jt.Qt() && this._i.Mc().P().Xc.$c.price) {
        var i = this._i.Mc().ct(),
            n = this._i.Wc();

        this.fc = !0, i.za(n, this.Jt, t.Zf);
      }
    }, t.prototype.xc = function (t) {
      if (null !== this.Jt && this._i.Mc().P().Xc.$c.price) {
        var i = this._i.Mc().ct(),
            n = this._i.Wc(),
            h = this.Jt;

        i.Oa(n, h, t.Zf);
      }
    }, t.prototype.Nc = function () {
      if (null !== this.Jt && this._i.Mc().P().Xc.$c.price) {
        var t = this._i.Mc().ct(),
            i = this._i.Wc(),
            n = this.Jt;

        this.fc && (this.fc = !1, t.Pa(i, n));
      }
    }, t.prototype.Sc = function (t) {
      if (null !== this.Jt && this._i.Mc().P().Xc.$c.price) {
        var i = this._i.Mc().ct(),
            n = this._i.Wc();

        this.fc = !1, i.Pa(n, this.Jt);
      }
    }, t.prototype.Dc = function (t) {
      this._i.Mc().P().Xc.axisDoubleClickReset && this.pu();
    }, t.prototype.Cc = function (t) {
      null !== this.Jt && (!this._i.Mc().ct().P().Xc.$c.price || this.Jt.vh() || this.Jt._h() || this.Zc(1));
    }, t.prototype.Tc = function (t) {
      this.Zc(0);
    }, t.prototype.Oc = function () {
      var t = this,
          i = [],
          n = null === this.Jt ? void 0 : this.Jt;
      return function (h) {
        for (var s = 0; s < h.length; ++s) {
          for (var r = h[s].fi(t._i.Wc(), n), e = 0; e < r.length; e++) {
            i.push(r[e]);
          }
        }
      }(this._i.Wc().zh()), i;
    }, t.prototype.Uc = function (t, i) {
      var n = this;

      if (null !== this.ac) {
        var h = this.ac.ht,
            s = this.ac.st;
        V(t, i, function () {
          z(t, 0, 0, h, s, n.Lc());
        });
      }
    }, t.prototype.uu = function (t, i) {
      if (null !== this.ac && null !== this.Jt && this.Jt.P().borderVisible) {
        t.save(), t.fillStyle = this.N();
        var n,
            h = Math.max(1, Math.floor(this.Vc().Dt * i));
        n = this.mc ? Math.floor(this.ac.ht * i) - h : 0, t.fillRect(n, 0, h, Math.ceil(this.ac.st * i)), t.restore();
      }
    }, t.prototype.qc = function (t, i) {
      if (null !== this.ac && null !== this.Jt) {
        var n = this.Jt.Vn();
        t.save(), t.strokeStyle = this.N(), t.font = this.Fc(), t.fillStyle = this.N();
        var h = this.Vc(),
            s = this.Jt.P().borderVisible && this.Jt.P().drawTicks,
            r = this.mc ? Math.floor((this.ac.ht - h.St) * i - h.Dt * i) : Math.floor(h.Dt * i),
            e = this.mc ? Math.round(r - h.At * i) : Math.round(r + h.St * i + h.At * i),
            u = this.mc ? "right" : "left",
            o = Math.max(1, Math.floor(i)),
            a = Math.floor(.5 * i);

        if (s) {
          var l = Math.round(h.St * i);
          t.beginPath();

          for (var f = 0, c = n; f < c.length; f++) {
            var v = c[f];
            t.rect(r, Math.round(v.En * i) - a, l, o);
          }

          t.fill();
        }

        t.fillStyle = this.Bc();

        for (var _ = 0, d = n; _ < d.length; _++) {
          v = d[_];
          this.vc.rc(t, v.Ln, e, Math.round(v.En * i), u);
        }

        t.restore();
      }
    }, t.prototype.jc = function () {
      if (null !== this.ac && null !== this.Jt) {
        var t = this.ac.st / 2,
            i = [],
            n = this.Jt.zh().slice(),
            h = this._i.Wc(),
            s = this.Vc();

        this.Jt === h.Di() && this._i.Wc().zh().forEach(function (t) {
          h.Tu(t) && n.push(t);
        });
        var r = this.Jt.Vh()[0],
            e = this.Jt;
        n.forEach(function (n) {
          var s = n.fi(h, e);
          s.forEach(function (t) {
            t.Yt(null), t.Kt() && i.push(t);
          }), r === n && s.length > 0 && (t = s[0].zt());
        });
        var u = i.filter(function (i) {
          return i.zt() <= t;
        }),
            o = i.filter(function (i) {
          return i.zt() > t;
        });

        if (u.sort(function (t, i) {
          return i.zt() - t.zt();
        }), u.length && o.length && o.push(u[0]), o.sort(function (t, i) {
          return t.zt() - i.zt();
        }), i.forEach(function (t) {
          return t.Yt(t.zt());
        }), this.Jt.P().alignLabels) {
          for (var a = 1; a < u.length; a++) {
            var l = u[a],
                f = (v = u[a - 1]).wt(s, !1);
            l.zt() > (_ = v.Ht()) - f && l.Yt(_ - f);
          }

          for (var c = 1; c < o.length; c++) {
            var v, _;

            l = o[c], f = (v = o[c - 1]).wt(s, !0);
            l.zt() < (_ = v.Ht()) + f && l.Yt(_ + f);
          }
        }
      }
    }, t.prototype.Hc = function (t, i) {
      var n = this;

      if (null !== this.ac) {
        t.save();
        var h = this.ac,
            s = this.Oc(),
            r = this.Vc(),
            e = this.mc ? "right" : "left";
        s.forEach(function (s) {
          if (s.$t()) {
            var u = s.I(l(n.Jt));
            t.save(), u.h(t, r, n.cc, h.ht, e, i), t.restore();
          }
        }), t.restore();
      }
    }, t.prototype.Yc = function (t, i) {
      var n = this;

      if (null !== this.ac && null !== this.Jt) {
        t.save();

        var h = this.ac,
            s = this._i.Mc().ct(),
            r = [],
            e = this._i.Wc(),
            u = s.Nl().fi(e, this.Jt);

        u.length && r.push(u);
        var o = this.Vc(),
            a = this.mc ? "right" : "left";
        r.forEach(function (s) {
          s.forEach(function (s) {
            t.save(), s.I(l(n.Jt)).h(t, o, n.cc, h.ht, a, i), t.restore();
          });
        }), t.restore();
      }
    }, t.prototype.Zc = function (t) {
      this.gc.style.cursor = 1 === t ? "ns-resize" : "default";
    }, t.prototype.Hn = function () {
      var t = this,
          i = this.zc();

      if (this._c < i) {
        var n = this._i.Mc();

        null === this.lc && (this.lc = setTimeout(function () {
          n && n.ct()._l(), t.lc = null;
        }, 100));
      }

      this._c = i;
    }, t.prototype.wc = function (t) {
      this.vc.on(), this.vc = new fn(t.Vt, t.et, t.he);
    }, t;
  }(),
      vn = rn,
      _n = function () {
    function t(t, i) {
      var n = this;
      this.ac = new Zi(0, 0), this.Jc = null, this.Gc = null, this.Qc = null, this.tv = !1, this.iv = new J(), this.nv = 0, this.hv = !1, this.sv = null, this.rv = !1, this.ev = null, this.dc = function () {
        return n.uv && n.hi().Lr();
      }, this.bc = function () {
        return n.uv && n.hi().Lr();
      }, this.ov = t, this.uv = i, this.uv.Ya().tn(this.av.bind(this), this, !0), this.lv = document.createElement("td"), this.lv.style.padding = "0", this.lv.style.position = "relative";
      var h = document.createElement("div");
      h.style.width = "100%", h.style.height = "100%", h.style.position = "relative", h.style.overflow = "hidden", this.fv = document.createElement("td"), this.fv.style.padding = "0", this.cv = document.createElement("td"), this.cv.style.padding = "0", this.lv.appendChild(h), this.pc = nn(h, new Zi(16, 16)), this.pc.subscribeCanvasConfigured(this.dc);
      var s = this.pc.canvas;
      s.style.position = "absolute", s.style.zIndex = "1", s.style.left = "0", s.style.top = "0", this.yc = nn(h, new Zi(16, 16)), this.yc.subscribeCanvasConfigured(this.bc);
      var r = this.yc.canvas;
      r.style.position = "absolute", r.style.zIndex = "2", r.style.left = "0", r.style.top = "0", this.vv = document.createElement("tr"), this.vv.appendChild(this.fv), this.vv.appendChild(this.lv), this.vv.appendChild(this.cv), this._v();
      var e = this.Mc().P().dv;
      this.Ac = new en(this.yc.canvas, this, {
        xf: !e.vertTouchDrag,
        Nf: !e.horzTouchDrag
      });
    }

    return t.prototype.on = function () {
      null !== this.Jc && this.Jc.on(), null !== this.Gc && this.Gc.on(), this.yc.unsubscribeCanvasConfigured(this.bc), this.yc.destroy(), this.pc.unsubscribeCanvasConfigured(this.dc), this.pc.destroy(), null !== this.uv && this.uv.Ya().rn(this), this.Ac.on();
    }, t.prototype.Wc = function () {
      return l(this.uv);
    }, t.prototype.wv = function (i) {
      null !== this.uv && this.uv.Ya().rn(this), this.uv = i, null !== this.uv && this.uv.Ya().tn(t.prototype.av.bind(this), this, !0), this._v();
    }, t.prototype.Mc = function () {
      return this.ov;
    }, t.prototype.Ec = function () {
      return this.vv;
    }, t.prototype._v = function () {
      if (null !== this.uv && (this.Mv(), 0 !== this.hi().F().length)) {
        if (null !== this.Jc) {
          var t = this.uv.Fa();
          this.Jc.li(l(t));
        }

        if (null !== this.Gc) {
          var i = this.uv.Va();
          this.Gc.li(l(i));
        }
      }
    }, t.prototype.Da = function () {
      return null !== this.uv ? this.uv.Da() : 0;
    }, t.prototype.Ca = function (t) {
      this.uv && this.uv.Ca(t);
    }, t.prototype.mf = function (t) {
      if (this.uv) {
        var i = t.Xf,
            n = t.Zf;
        sn || this.bv(i, n);
      }
    }, t.prototype.Ff = function (t) {
      if (this.hv = !1, this.rv = null !== this.sv, this.uv) {
        if (document.activeElement !== document.body && document.activeElement !== document.documentElement) l(document.activeElement).blur();else {
          var i = document.getSelection();
          null !== i && i.removeAllRanges();
        }
        var n = this.hi();

        if (!this.uv.Di().Qt() && !n.j().Qt()) {
          if (null !== this.sv) {
            var h = n.Nl();
            this.ev = {
              x: h.Mt(),
              y: h.bt()
            }, this.sv = {
              x: t.Xf,
              y: t.Zf
            };
          }

          sn || this.bv(t.Xf, t.Zf);
        }
      }
    }, t.prototype.gf = function (t) {
      if (this.uv) {
        var i = t.Xf,
            n = t.Zf;

        if (this.mv() && this.gv(), !sn) {
          this.bv(i, n);
          var h = this.zu(i, n);
          this.hi().bl(h && {
            ml: h.ml,
            pv: h.pv
          }), null !== h && void 0 !== h.nc.yv && h.nc.yv(i, n);
        }
      }
    }, t.prototype.Ef = function (t) {
      if (null !== this.uv) {
        var i = t.Xf,
            n = t.Zf,
            h = this.zu(i, n);

        if (null !== h && void 0 !== h.nc.kv && h.nc.kv(i, n), this.iv.un()) {
          var s = this.hi().Nl().R();
          this.iv.en(s, {
            x: i,
            y: n
          });
        }

        this.xv();
      }
    }, t.prototype.Sf = function (t) {
      if (null !== this.uv) {
        var i = this.hi(),
            n = t.Xf,
            h = t.Zf;

        if (null !== this.sv) {
          this.rv = !1;
          var s = l(this.ev),
              r = s.x + (n - this.sv.x),
              e = s.y + (h - this.sv.y);
          this.bv(r, e);
        } else this.mv() || this.bv(n, h);

        if (!i.j().Qt()) {
          var u = this.ov.P().dv;

          if (u.pressedMouseMove && "touch" !== t.ic || (u.horzTouchDrag || u.vertTouchDrag) && "mouse" !== t.ic) {
            var o = this.uv.Di();
            null !== this.Qc || this.Nv() || (this.Qc = {
              x: t.Hf,
              y: t.Yf
            }), null === this.Qc || this.Qc.x === t.Hf && this.Qc.y === t.Yf || this.tv || (o.Qt() || i.Ia(this.uv, o, t.Zf), i.Ll(t.Xf), this.tv = !0), this.tv && (o.Qt() || i.Wa(this.uv, o, t.Zf), i.Bl(t.Xf));
          }
        }
      }
    }, t.prototype.Tf = function (t) {
      if (null !== this.uv) {
        this.hv = !1;
        var i = this.hi();

        if (this.tv) {
          var n = this.uv.Di();
          i.Ra(this.uv, n), i.Fl(), this.Qc = null, this.tv = !1;
        }
      }
    }, t.prototype.qf = function (t) {
      if (this.hv = !0, null === this.sv && vn) {
        var i = {
          m: t.Xf,
          g: t.Zf
        };
        this.Sv(i, i);
      }
    }, t.prototype.Uf = function (t) {
      null !== this.uv && (this.uv.ct().bl(null), rn || this.gv());
    }, t.prototype.Dv = function () {
      return this.iv;
    }, t.prototype.Of = function () {
      this.nv = 1;
    }, t.prototype.Pf = function (t, i) {
      if (this.ov.P().Xc.pinch) {
        var n = 5 * (i - this.nv);
        this.nv = i, this.hi().Al(t.m, n);
      }
    }, t.prototype.zu = function (t, i) {
      var n = this.uv;
      if (null === n) return null;

      for (var h = 0, s = n.zh(); h < s.length; h++) {
        var r = s[h],
            e = this.Cv(r.ci(n), t, i);
        if (null !== e) return {
          ml: r,
          nc: e.nc,
          pv: e.pv
        };
      }

      return null;
    }, t.prototype.Tv = function (t, i) {
      l("left" === i ? this.Jc : this.Gc).Pc(new Zi(t, this.ac.st));
    }, t.prototype.Av = function () {
      return this.ac;
    }, t.prototype.Pc = function (t) {
      if (t.ht < 0 || t.st < 0) throw new Error("Try to set invalid size to PaneWidget " + JSON.stringify(t));
      this.ac.fn(t) || (this.ac = t, this.pc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.yc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.lv.style.width = t.ht + "px", this.lv.style.height = t.st + "px");
    }, t.prototype.Ev = function () {
      var t = l(this.uv);
      t.Ba(t.Fa()), t.Ba(t.Va());

      for (var i = 0, n = t.Vh(); i < n.length; i++) {
        var h = n[i];

        if (t.Tu(h)) {
          var s = h.X();
          null !== s && t.Ba(s), h.Wi();
        }
      }
    }, t.prototype.Kc = function () {
      return this.pc.canvas;
    }, t.prototype.Rc = function (t) {
      if (0 !== t && null !== this.uv) {
        if (t > 1 && this.Ev(), null !== this.Jc && this.Jc.Rc(t), null !== this.Gc && this.Gc.Rc(t), 1 !== t) {
          var i = Gi(this.pc.canvas);
          i.save(), this.Uc(i, this.Lv(), this.pc.pixelRatio), this.uv && (this.Bv(i, this.pc.pixelRatio), this.Fv(i, this.pc.pixelRatio), this.Vv(i, this.pc.pixelRatio)), i.restore();
        }

        var n = Gi(this.yc.canvas);
        n.clearRect(0, 0, Math.ceil(this.ac.ht * this.yc.pixelRatio), Math.ceil(this.ac.st * this.yc.pixelRatio)), this.zv(n, this.yc.pixelRatio);
      }
    }, t.prototype.Ov = function () {
      return this.Jc;
    }, t.prototype.Pv = function () {
      return this.Gc;
    }, t.prototype.Lv = function () {
      return this.ov.P().layout.backgroundColor;
    }, t.prototype.av = function () {
      null !== this.uv && this.uv.Ya().rn(this), this.uv = null;
    }, t.prototype.Uc = function (t, i, n) {
      var h = this;
      V(t, n, function () {
        z(t, 0, 0, h.ac.ht, h.ac.st, i);
      });
    }, t.prototype.Bv = function (t, i) {
      for (var n = l(this.uv), h = this.hi().kl().ci(n), s = n.wt(), r = n.dt(), e = 0, u = h; e < u.length; e++) {
        var o = u[e];
        t.save();
        var a = o.I(s, r);
        null !== a && a.h(t, i, !1), t.restore();
      }
    }, t.prototype.Fv = function (t, i) {
      var n = this.hi().xl();
      this.Iv(n, t, i), this.Wv(n, t, i);
    }, t.prototype.zv = function (t, i) {
      this.Wv(this.hi().Nl(), t, i);
    }, t.prototype.Vv = function (t, i) {
      for (var n = l(this.uv).zh(), h = 0, s = n; h < s.length; h++) {
        var r = s[h];
        this.Iv(r, t, i);
      }

      for (var e = 0, u = n; e < u.length; e++) {
        r = u[e];
        this.Wv(r, t, i);
      }
    }, t.prototype.Wv = function (t, i, n) {
      for (var h = l(this.uv), s = t.ci(h), r = h.wt(), e = h.dt(), u = h.ct().Ml(), o = null !== u && u.ml === t, a = null !== u && o && void 0 !== u.pv ? u.pv.Ou : void 0, f = 0, c = s; f < c.length; f++) {
        var v = c[f].I(r, e);
        null !== v && (i.save(), v.h(i, n, o, a), i.restore());
      }
    }, t.prototype.Iv = function (t, i, n) {
      for (var h = l(this.uv), s = t.ci(h), r = h.wt(), e = h.dt(), u = h.ct().Ml(), o = null !== u && u.ml === t, a = null !== u && o && void 0 !== u.pv ? u.pv.Ou : void 0, f = 0, c = s; f < c.length; f++) {
        var v = c[f].I(r, e);
        null !== v && void 0 !== v.u && (i.save(), v.u(i, n, o, a), i.restore());
      }
    }, t.prototype.Cv = function (t, i, n) {
      for (var h = 0, s = t; h < s.length; h++) {
        var r = s[h],
            e = r.I(this.ac.st, this.ac.ht);

        if (null !== e && e.zu) {
          var u = e.zu(i, n);
          if (null !== u) return {
            nc: r,
            pv: u
          };
        }
      }

      return null;
    }, t.prototype.Mv = function () {
      if (null !== this.uv) {
        var t = this.ov;
        t.P().leftPriceScale.visible || null === this.Jc || (this.fv.removeChild(this.Jc.Ec()), this.Jc.on(), this.Jc = null), t.P().rightPriceScale.visible || null === this.Gc || (this.cv.removeChild(this.Gc.Ec()), this.Gc.on(), this.Gc = null);
        var i = t.ct().jl();
        t.P().leftPriceScale.visible && null === this.Jc && (this.Jc = new cn(this, t.P().layout, i, "left"), this.fv.appendChild(this.Jc.Ec())), t.P().rightPriceScale.visible && null === this.Gc && (this.Gc = new cn(this, t.P().layout, i, "right"), this.cv.appendChild(this.Gc.Ec()));
      }
    }, t.prototype.mv = function () {
      return vn && null === this.sv;
    }, t.prototype.Nv = function () {
      return vn && this.hv || null !== this.sv;
    }, t.prototype.Rv = function (t) {
      return Math.max(0, Math.min(t, this.ac.ht - 1));
    }, t.prototype.jv = function (t) {
      return Math.max(0, Math.min(t, this.ac.st - 1));
    }, t.prototype.bv = function (t, i) {
      this.hi().Pl(this.Rv(t), this.jv(i), l(this.uv));
    }, t.prototype.gv = function () {
      this.hi().Wl();
    }, t.prototype.xv = function () {
      this.rv && (this.sv = null, this.gv());
    }, t.prototype.Sv = function (t, i) {
      this.sv = t, this.rv = !1, this.bv(i.x, i.y);
      var n = this.hi().Nl();
      this.ev = {
        x: n.Mt(),
        y: n.bt()
      };
    }, t.prototype.hi = function () {
      return this.ov.ct();
    }, t;
  }(),
      dn = function () {
    function t(t, i, n, h) {
      var s = this;
      this.T = !0, this.ac = new Zi(0, 0), this.dc = function () {
        return s.Rc(3);
      }, this.mc = "left" === t, this.al = n.jl, this.xi = i, this.Uv = h, this.gc = document.createElement("div"), this.gc.style.width = "25px", this.gc.style.height = "100%", this.gc.style.overflow = "hidden", this.pc = nn(this.gc, new Zi(16, 16)), this.pc.subscribeCanvasConfigured(this.dc);
    }

    return t.prototype.on = function () {
      this.pc.unsubscribeCanvasConfigured(this.dc), this.pc.destroy();
    }, t.prototype.Ec = function () {
      return this.gc;
    }, t.prototype.Av = function () {
      return this.ac;
    }, t.prototype.Pc = function (t) {
      if (t.ht < 0 || t.st < 0) throw new Error("Try to set invalid size to PriceAxisStub " + JSON.stringify(t));
      this.ac.fn(t) || (this.ac = t, this.pc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.gc.style.width = t.ht + "px", this.gc.style.minWidth = t.ht + "px", this.gc.style.height = t.st + "px", this.T = !0);
    }, t.prototype.Rc = function (t) {
      if ((!(t < 3) || this.T) && 0 !== this.ac.ht && 0 !== this.ac.st) {
        this.T = !1;
        var i = Gi(this.pc.canvas);
        this.Uc(i, this.pc.pixelRatio), this.uu(i, this.pc.pixelRatio);
      }
    }, t.prototype.Kc = function () {
      return this.pc.canvas;
    }, t.prototype.uu = function (t, i) {
      if (this.Uv()) {
        var n = this.ac.ht;
        t.save(), t.fillStyle = this.xi.timeScale.borderColor;
        var h = Math.floor(this.al.P().Dt * i),
            s = this.mc ? Math.round(n * i) - h : 0;
        t.fillRect(s, 0, h, h), t.restore();
      }
    }, t.prototype.Uc = function (t, i) {
      var n = this;
      V(t, i, function () {
        z(t, 0, 0, n.ac.ht, n.ac.st, n.xi.layout.backgroundColor);
      });
    }, t;
  }();

  function wn(t, i) {
    return t.Os > i.Os ? t : i;
  }

  var Mn = function () {
    function t(t) {
      var i = this;
      this.qv = null, this.Hv = null, this.ne = null, this.Yv = !1, this.ac = new Zi(0, 0), this.dc = function () {
        return i.ov.ct().Lr();
      }, this.bc = function () {
        return i.ov.ct().Lr();
      }, this.ov = t, this.xi = t.P().layout, this.Kv = document.createElement("tr"), this.$v = document.createElement("td"), this.$v.style.padding = "0", this.Xv = document.createElement("td"), this.Xv.style.padding = "0", this.gc = document.createElement("td"), this.gc.style.height = "25px", this.gc.style.padding = "0", this.Zv = document.createElement("div"), this.Zv.style.width = "100%", this.Zv.style.height = "100%", this.Zv.style.position = "relative", this.Zv.style.overflow = "hidden", this.gc.appendChild(this.Zv), this.pc = nn(this.Zv, new Zi(16, 16)), this.pc.subscribeCanvasConfigured(this.dc);
      var n = this.pc.canvas;
      n.style.position = "absolute", n.style.zIndex = "1", n.style.left = "0", n.style.top = "0", this.yc = nn(this.Zv, new Zi(16, 16)), this.yc.subscribeCanvasConfigured(this.bc);
      var h = this.yc.canvas;
      h.style.position = "absolute", h.style.zIndex = "2", h.style.left = "0", h.style.top = "0", this.Kv.appendChild(this.$v), this.Kv.appendChild(this.gc), this.Kv.appendChild(this.Xv), this.Jv(), this.ov.ct().Sa().tn(this.Jv.bind(this), this), this.Ac = new en(this.yc.canvas, this, {
        xf: !0,
        Nf: !1
      });
    }

    return t.prototype.on = function () {
      this.Ac.on(), null !== this.qv && this.qv.on(), null !== this.Hv && this.Hv.on(), this.yc.unsubscribeCanvasConfigured(this.bc), this.yc.destroy(), this.pc.unsubscribeCanvasConfigured(this.dc), this.pc.destroy();
    }, t.prototype.Ec = function () {
      return this.Kv;
    }, t.prototype.Gv = function () {
      return this.qv;
    }, t.prototype.Qv = function () {
      return this.Hv;
    }, t.prototype.Ff = function (t) {
      if (!this.Yv) {
        this.Yv = !0;
        var i = this.ov.ct();
        !i.j().Qt() && this.ov.P().Xc.$c.time && i.Tl(t.Xf);
      }
    }, t.prototype.Vf = function () {
      var t = this.ov.ct();
      !t.j().Qt() && this.Yv && (this.Yv = !1, this.ov.P().Xc.$c.time && t.zl());
    }, t.prototype.Sf = function (t) {
      var i = this.ov.ct();
      !i.j().Qt() && this.ov.P().Xc.$c.time && i.Vl(t.Xf);
    }, t.prototype.Tf = function (t) {
      this.Yv = !1;
      var i = this.ov.ct();
      i.j().Qt() && !this.ov.P().Xc.$c.time || i.zl();
    }, t.prototype.Af = function () {
      this.ov.P().Xc.axisDoubleClickReset && this.ov.ct().Ol();
    }, t.prototype.mf = function (t) {
      this.ov.ct().P().Xc.$c.time && this.Zc(1);
    }, t.prototype.Uf = function (t) {
      this.Zc(0);
    }, t.prototype.Av = function () {
      return this.ac;
    }, t.prototype.t_ = function (t, i, n) {
      this.ac && this.ac.fn(t) || (this.ac = t, this.pc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.yc.resizeCanvas({
        width: t.ht,
        height: t.st
      }), this.gc.style.width = t.ht + "px", this.gc.style.height = t.st + "px"), null !== this.qv && this.qv.Pc(new Zi(i, t.st)), null !== this.Hv && this.Hv.Pc(new Zi(n, t.st));
    }, t.prototype.i_ = function () {
      var t = this.n_();
      return Math.ceil(t.Dt + t.St + t.Vt + t.Ct + t.Tt);
    }, t.prototype.B = function () {
      this.ov.ct().j().Vn();
    }, t.prototype.Kc = function () {
      return this.pc.canvas;
    }, t.prototype.Rc = function (t) {
      if (0 !== t) {
        if (1 !== t) {
          var i = Gi(this.pc.canvas);
          this.Uc(i, this.pc.pixelRatio), this.uu(i, this.pc.pixelRatio), this.qc(i, this.pc.pixelRatio), null !== this.qv && this.qv.Rc(t), null !== this.Hv && this.Hv.Rc(t);
        }

        var n = Gi(this.yc.canvas),
            h = this.yc.pixelRatio;
        n.clearRect(0, 0, Math.ceil(this.ac.ht * h), Math.ceil(this.ac.st * h)), this.h_([this.ov.ct().Nl()], n, h);
      }
    }, t.prototype.Uc = function (t, i) {
      var n = this;
      V(t, i, function () {
        z(t, 0, 0, n.ac.ht, n.ac.st, n.Lv());
      });
    }, t.prototype.uu = function (t, i) {
      if (this.ov.P().timeScale.borderVisible) {
        t.save(), t.fillStyle = this.s_();
        var n = Math.max(1, Math.floor(this.n_().Dt * i));
        t.fillRect(0, 0, Math.ceil(this.ac.ht * i), n), t.restore();
      }
    }, t.prototype.qc = function (t, i) {
      var n = this,
          h = this.ov.ct().j().Vn();

      if (h && 0 !== h.length) {
        var s = h.reduce(wn, h[0]).Os;
        s > 30 && s < 40 && (s = 30), t.save(), t.strokeStyle = this.s_();
        var r = this.n_(),
            e = r.Dt + r.St + r.Ct + r.Vt - r.Ft;
        t.textAlign = "center", t.fillStyle = this.s_();
        var u = Math.floor(this.n_().Dt * i),
            o = Math.max(1, Math.floor(i)),
            a = Math.floor(.5 * i);

        if (this.ov.ct().j().P().borderVisible) {
          t.beginPath();

          for (var l = Math.round(r.St * i), f = h.length; f--;) {
            var c = Math.round(h[f].En * i);
            t.rect(c - a, u, o, l);
          }

          t.fill();
        }

        t.fillStyle = this.ue(), V(t, i, function () {
          t.font = n.r_();

          for (var i = 0, r = h; i < r.length; i++) {
            (a = r[i]).Os < s && t.fillText(a.Ln, a.En, e);
          }

          t.font = n.e_();

          for (var u = 0, o = h; u < o.length; u++) {
            var a;
            (a = o[u]).Os >= s && t.fillText(a.Ln, a.En, e);
          }
        });
      }
    }, t.prototype.h_ = function (t, i, n) {
      for (var h = this.n_(), s = 0, r = t; s < r.length; s++) {
        for (var e = 0, u = r[s].vi(); e < u.length; e++) {
          var o = u[e];
          i.save(), o.I().h(i, h, n), i.restore();
        }
      }
    }, t.prototype.Lv = function () {
      return this.xi.backgroundColor;
    }, t.prototype.s_ = function () {
      return this.ov.P().timeScale.borderColor;
    }, t.prototype.ue = function () {
      return this.xi.textColor;
    }, t.prototype.se = function () {
      return this.xi.fontSize;
    }, t.prototype.r_ = function () {
      return zt(this.se(), this.xi.fontFamily);
    }, t.prototype.e_ = function () {
      return zt(this.se(), this.xi.fontFamily, "bold");
    }, t.prototype.n_ = function () {
      null === this.ne && (this.ne = {
        Dt: 1,
        Ft: NaN,
        Ct: NaN,
        Tt: NaN,
        ni: NaN,
        St: 3,
        Vt: NaN,
        kt: "",
        ii: new ci()
      });
      var t = this.ne,
          i = this.r_();

      if (t.kt !== i) {
        var n = this.se();
        t.Vt = n, t.kt = i, t.Ct = Math.ceil(n / 2.5), t.Tt = t.Ct, t.ni = Math.ceil(n / 2), t.Ft = Math.round(this.se() / 5), t.ii.pu();
      }

      return this.ne;
    }, t.prototype.Zc = function (t) {
      this.gc.style.cursor = 1 === t ? "ew-resize" : "default";
    }, t.prototype.Jv = function () {
      var t = this.ov.ct(),
          i = t.P();
      i.leftPriceScale.visible || null === this.qv || (this.$v.removeChild(this.qv.Ec()), this.qv.on(), this.qv = null), i.rightPriceScale.visible || null === this.Hv || (this.Xv.removeChild(this.Hv.Ec()), this.Hv.on(), this.Hv = null);
      var n = {
        jl: this.ov.ct().jl()
      };

      if (i.leftPriceScale.visible && null === this.qv) {
        var h = function h() {
          return i.leftPriceScale.borderVisible && t.j().P().borderVisible;
        };

        this.qv = new dn("left", this.ov.P(), n, h), this.$v.appendChild(this.qv.Ec());
      }

      if (i.rightPriceScale.visible && null === this.Hv) {
        h = function h() {
          return i.rightPriceScale.borderVisible && t.j().P().borderVisible;
        };

        this.Hv = new dn("right", this.ov.P(), n, h), this.Xv.appendChild(this.Hv.Ec());
      }
    }, t;
  }(),
      bn = function () {
    function t(t, i) {
      this.u_ = [], this.o_ = 0, this.zn = 0, this.Hs = 0, this.a_ = 0, this.l_ = 0, this.f_ = null, this.c_ = !1, this.iv = new J(), this.ul = new J(), this.xi = i, this.Kv = document.createElement("div"), this.Kv.classList.add("tv-lightweight-charts"), this.Kv.style.overflow = "hidden", this.Kv.style.width = "100%", this.Kv.style.height = "100%", this.v_ = document.createElement("table"), this.v_.setAttribute("cellspacing", "0"), this.Kv.appendChild(this.v_), this.__ = this.d_.bind(this), this.Kv.addEventListener("wheel", this.__, {
        passive: !1
      }), this.hi = new Ki(this.ol.bind(this), this.xi), this.ct().Sl().tn(this.w_.bind(this), this), this.M_ = new Mn(this), this.v_.appendChild(this.M_.Ec());
      var n = this.xi.width,
          h = this.xi.height;

      if (0 === n || 0 === h) {
        var s = t.getBoundingClientRect();
        0 === n && (n = Math.floor(s.width), n -= n % 2), 0 === h && (h = Math.floor(s.height), h -= h % 2);
      }

      n = Math.max(70, n), h = Math.max(50, h), this.b_(n, h), this.m_(), t.appendChild(this.Kv), this.g_(), this.hi.j().Hr().tn(this.hi._l.bind(this.hi), this), this.hi.Sa().tn(this.hi._l.bind(this.hi), this);
    }

    return t.prototype.ct = function () {
      return this.hi;
    }, t.prototype.P = function () {
      return this.xi;
    }, t.prototype.p_ = function () {
      return this.u_;
    }, t.prototype.on = function () {
      this.Kv.removeEventListener("wheel", this.__), 0 !== this.o_ && window.cancelAnimationFrame(this.o_), this.hi.Sl().rn(this), this.hi.j().Hr().rn(this), this.hi.Sa().rn(this), this.hi.on();

      for (var t = 0, i = this.u_; t < i.length; t++) {
        var n = i[t];
        this.v_.removeChild(n.Ec()), n.Dv().rn(this), n.on();
      }

      this.u_ = [], l(this.M_).on(), null !== this.Kv.parentElement && this.Kv.parentElement.removeChild(this.Kv), this.ul.on(), this.iv.on(), delete this.Kv;
    }, t.prototype.b_ = function (t, i, n) {
      if (void 0 === n && (n = !1), this.zn !== i || this.Hs !== t) {
        this.zn = i, this.Hs = t;
        var h = i + "px",
            s = t + "px";
        l(this.Kv).style.height = h, l(this.Kv).style.width = s, this.v_.style.height = h, this.v_.style.width = s, n ? this.y_(new jt(3)) : this.hi._l();
      }
    }, t.prototype.Rc = function (t) {
      void 0 === t && (t = new jt(3));

      for (var i = 0; i < this.u_.length; i++) {
        this.u_[i].Rc(t.Ne(i).ke);
      }

      this.M_.Rc(t.xe());
    }, t.prototype.eh = function (t) {
      this.hi.eh(t), this.g_();
      var i = t.width || this.Hs,
          n = t.height || this.zn;
      this.b_(i, n);
    }, t.prototype.Dv = function () {
      return this.iv;
    }, t.prototype.Sl = function () {
      return this.ul;
    }, t.prototype.k_ = function () {
      var t = this;
      null !== this.f_ && (this.y_(this.f_), this.f_ = null);
      var i = this.u_[0],
          n = tn(document, new Zi(this.Hs, this.zn)),
          h = Gi(n),
          s = Ji(n);
      return V(h, s, function () {
        var n = 0,
            s = 0,
            r = function r(i) {
          for (var r = 0; r < t.u_.length; r++) {
            var e = t.u_[r],
                u = e.Av().st,
                o = l("left" === i ? e.Ov() : e.Pv()),
                a = o.Kc();
            h.drawImage(a, n, s, o.Ic(), u), s += u;
          }
        };

        t.x_() && (r("left"), n = l(i.Ov()).Ic()), s = 0;

        for (var e = 0; e < t.u_.length; e++) {
          var u = t.u_[e],
              o = u.Av(),
              a = u.Kc();
          h.drawImage(a, n, s, o.ht, o.st), s += o.st;
        }

        n += i.Av().ht, t.N_() && (s = 0, r("right"));

        var f = function f(i) {
          var r = l("left" === i ? t.M_.Gv() : t.M_.Qv()),
              e = r.Av(),
              u = r.Kc();
          h.drawImage(u, n, s, e.ht, e.st);
        };

        if (t.xi.timeScale.visible) {
          n = 0, t.x_() && (f("left"), n = l(i.Ov()).Ic());
          var c = t.M_.Av();
          a = t.M_.Kc();
          h.drawImage(a, n, s, c.ht, c.st), t.N_() && (n = i.Av().ht, f("right"), h.restore());
        }
      }), n;
    }, t.prototype.S_ = function (t) {
      return "none" === t ? 0 : ("left" !== t || this.x_()) && ("right" !== t || this.N_()) ? 0 === this.u_.length ? 0 : l("left" === t ? this.u_[0].Ov() : this.u_[0].Pv()).Ic() : 0;
    }, t.prototype.D_ = function () {
      for (var t = 0, i = 0, n = 0, h = 0, s = this.u_; h < s.length; h++) {
        var r = s[h];
        this.x_() && (i = Math.max(i, l(r.Ov()).zc())), this.N_() && (n = Math.max(n, l(r.Pv()).zc())), t += r.Da();
      }

      var e = this.Hs,
          u = this.zn,
          o = Math.max(e - i - n, 0),
          a = this.xi.timeScale.visible ? this.M_.i_() : 0;
      a % 2 && (a += 1);

      for (var f = 0 + a, c = u < f ? 0 : u - f, v = c / t, _ = 0, d = 0; d < this.u_.length; ++d) {
        (r = this.u_[d]).wv(this.hi.yl()[d]);
        var w,
            M = 0;
        M = d === this.u_.length - 1 ? c - _ : Math.round(r.Da() * v), _ += w = Math.max(M, 2), r.Pc(new Zi(o, w)), this.x_() && r.Tv(i, "left"), this.N_() && r.Tv(n, "right"), r.Wc() && this.hi.Dl(r.Wc(), w);
      }

      this.M_.t_(new Zi(o, a), i, n), this.hi.kr(o), this.a_ !== i && (this.a_ = i), this.l_ !== n && (this.l_ = n);
    }, t.prototype.d_ = function (t) {
      var i = t.deltaX / 100,
          n = -t.deltaY / 100;

      if (0 !== i && this.xi.dv.mouseWheel || 0 !== n && this.xi.Xc.mouseWheel) {
        switch (t.cancelable && t.preventDefault(), t.deltaMode) {
          case t.DOM_DELTA_PAGE:
            i *= 120, n *= 120;
            break;

          case t.DOM_DELTA_LINE:
            i *= 32, n *= 32;
        }

        if (0 !== n && this.xi.Xc.mouseWheel) {
          var h = Math.sign(n) * Math.min(1, Math.abs(n)),
              s = t.clientX - this.Kv.getBoundingClientRect().left;
          this.ct().Al(s, h);
        }

        0 !== i && this.xi.dv.mouseWheel && this.ct().El(-80 * i);
      }
    }, t.prototype.y_ = function (t) {
      var i = t.xe();

      if (3 === i && this.C_(), 3 === i || 2 === i) {
        for (var n = this.hi.yl(), h = 0; h < n.length; h++) {
          t.Ne(h).dh && n[h].qa();
        }

        t.De() && this.hi.j().Kr();
        var s = t.Ce();
        null !== s && this.hi.j().$r(s), this.M_.B();
      }

      this.Rc(t);
    }, t.prototype.ol = function (t) {
      var i = this;
      null !== this.f_ ? this.f_.wn(t) : this.f_ = t, this.c_ || (this.c_ = !0, this.o_ = window.requestAnimationFrame(function () {
        i.c_ = !1, i.o_ = 0, null !== i.f_ && (i.y_(i.f_), i.f_ = null);
      }));
    }, t.prototype.C_ = function () {
      this.m_();
    }, t.prototype.m_ = function () {
      for (var t = this.hi.yl(), i = t.length, n = this.u_.length, h = i; h < n; h++) {
        var s = a(this.u_.pop());
        this.v_.removeChild(s.Ec()), s.Dv().rn(this), s.on();
      }

      for (h = n; h < i; h++) {
        (s = new _n(this, t[h])).Dv().tn(this.T_.bind(this), this), this.u_.push(s), this.v_.insertBefore(s.Ec(), this.M_.Ec());
      }

      for (h = 0; h < i; h++) {
        var r = t[h];
        (s = this.u_[h]).Wc() !== r ? s.wv(r) : s._v();
      }

      this.g_(), this.D_();
    }, t.prototype.A_ = function (t, i) {
      var n,
          h = new Map();
      null !== t && this.hi.F().forEach(function (i) {
        var n = i.Zu(t);
        null !== n && h.set(i, n);
      });

      if (null !== t) {
        var s = this.hi.j().si(t);
        null !== s && (n = s);
      }

      var r = this.ct().Ml(),
          e = null !== r && r.ml instanceof Ri ? r.ml : void 0,
          u = null !== r && void 0 !== r.pv ? r.pv.Iu : void 0;
      return {
        V: n,
        E_: i || void 0,
        L_: e,
        B_: h,
        F_: u
      };
    }, t.prototype.T_ = function (t, i) {
      var n = this;
      this.iv.en(function () {
        return n.A_(t, i);
      });
    }, t.prototype.w_ = function (t, i) {
      var n = this;
      this.ul.en(function () {
        return n.A_(t, i);
      });
    }, t.prototype.g_ = function () {
      var t = this.xi.timeScale.visible ? "" : "none";
      this.M_.Ec().style.display = t;
    }, t.prototype.x_ = function () {
      return this.xi.leftPriceScale.visible;
    }, t.prototype.N_ = function () {
      return this.xi.rightPriceScale.visible;
    }, t;
  }();

  function mn(t, i, n) {
    var h = n.value,
        s = {
      zs: i,
      V: t,
      Z: [h, h, h, h]
    };
    return "color" in n && void 0 !== n.color && (s.et = n.color), s;
  }

  function gn(t, i, n) {
    return {
      zs: i,
      V: t,
      Z: [n.open, n.high, n.low, n.close]
    };
  }

  function pn(t) {
    return void 0 !== t.Z;
  }

  function yn(t) {
    return function (i, n, h) {
      return void 0 === (s = h).open && void 0 === s.value ? {
        V: i,
        zs: n
      } : t(i, n, h);
      var s;
    };
  }

  var kn = {
    Candlestick: yn(gn),
    Bar: yn(gn),
    Area: yn(mn),
    Histogram: yn(mn),
    Line: yn(mn)
  };

  function xn(t) {
    return kn[t];
  }

  function Nn(t) {
    return 60 * t * 60 * 1e3;
  }

  function Sn(t) {
    return 60 * t * 1e3;
  }

  var Dn,
      Cn = [{
    V_: 1,
    Os: 20
  }, {
    V_: (Dn = 1, 1e3 * Dn),
    Os: 19
  }, {
    V_: Sn(1),
    Os: 20
  }, {
    V_: Sn(5),
    Os: 21
  }, {
    V_: Sn(30),
    Os: 22
  }, {
    V_: Nn(1),
    Os: 30
  }, {
    V_: Nn(3),
    Os: 31
  }, {
    V_: Nn(6),
    Os: 32
  }, {
    V_: Nn(12),
    Os: 33
  }];

  function Tn(t, i) {
    if (null !== i) {
      var n = new Date(1e3 * i),
          h = new Date(1e3 * t);
      if (h.getUTCFullYear() !== n.getUTCFullYear()) return 70;
      if (h.getUTCMonth() !== n.getUTCMonth()) return 60;
      if (h.getUTCDate() !== n.getUTCDate()) return 50;

      for (var s = Cn.length - 1; s >= 0; --s) {
        if (Math.floor(n.getTime() / Cn[s].V_) !== Math.floor(h.getTime() / Cn[s].V_)) return Cn[s].Os;
      }
    }

    return 20;
  }

  function An(t) {
    if (!Bt(t)) throw new Error("time must be of type BusinessDay");
    var i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
    return {
      Ss: Math.round(i.getTime() / 1e3),
      Ns: t
    };
  }

  function En(t) {
    if (!Ft(t)) throw new Error("time must be of type isUTCTimestamp");
    return {
      Ss: t
    };
  }

  function Ln(t) {
    return 0 === t.length ? null : Bt(t[0].time) ? An : En;
  }

  function Bn(t) {
    return Ft(t) ? En(t) : Bt(t) ? An(t) : An(Fn(t));
  }

  function Fn(t) {
    var i = new Date(t);
    if (isNaN(i.getTime())) throw new Error("Invalid date string=" + t + ", expected format=yyyy-mm-dd");
    return {
      day: i.getUTCDate(),
      month: i.getUTCMonth() + 1,
      year: i.getUTCFullYear()
    };
  }

  function Vn(t) {
    d(t.time) && (t.time = Fn(t.time));
  }

  function zn(t) {
    return {
      zs: 0,
      z_: new Map(),
      Wh: t
    };
  }

  var On = function () {
    function t() {
      this.O_ = new Map(), this.P_ = new Map(), this.I_ = new Map(), this.W_ = [];
    }

    return t.prototype.on = function () {
      this.O_.clear(), this.P_.clear(), this.I_.clear(), this.W_ = [];
    }, t.prototype.R_ = function (t, i) {
      var n = this;
      this.I_.has(t) && this.O_.forEach(function (i) {
        return i.z_["delete"](t);
      });
      var h = [];

      if (0 !== i.length) {
        !function (t) {
          t.forEach(Vn);
        }(i);
        var s = l(Ln(i)),
            r = xn(t.co());
        h = i.map(function (i) {
          var h = s(i.time),
              e = n.O_.get(h.Ss);
          void 0 === e && (e = zn(h), n.O_.set(h.Ss, e));
          var u = r(h, e.zs, i);
          return e.z_.set(t, u), u;
        });
      }

      return this.j_(), this.U_(t, h), this.q_(t);
    }, t.prototype.Hl = function (t) {
      return this.R_(t, []);
    }, t.prototype.H_ = function (t, i) {
      Vn(i);
      var n = l(Ln([i]))(i.time),
          h = this.I_.get(t);
      if (void 0 !== h && n.Ss < h.Ss) throw new Error("Cannot update oldest data, last time=" + h.Ss + ", new time=" + n.Ss);
      var s = this.O_.get(n.Ss),
          r = void 0 === s;
      void 0 === s && (s = zn(n), this.O_.set(n.Ss, s));
      var e = xn(t.co())(n, s.zs, i);
      s.z_.set(t, e);
      var u = this.Y_(t, e);

      if (!r) {
        var o = new Map();
        return null !== u && o.set(t, u), {
          K_: o,
          j: {
            Dr: this.X_()
          }
        };
      }

      return this.q_(t);
    }, t.prototype.Y_ = function (t, i) {
      var n = this.P_.get(t);
      void 0 === n && (n = [], this.P_.set(t, n));
      var h = 0 !== n.length ? n[n.length - 1] : null,
          s = null;
      return null === h || i.V.Ss > h.V.Ss ? pn(i) && (n.push(i), s = {
        _l: !1,
        Z_: [i]
      }) : pn(i) ? (n[n.length - 1] = i, s = {
        _l: !1,
        Z_: [i]
      }) : (n.splice(-1, 1), s = {
        _l: !0,
        Z_: n
      }), this.I_.set(t, i.V), s;
    }, t.prototype.U_ = function (t, i) {
      0 !== i.length ? (this.P_.set(t, i.filter(pn)), this.I_.set(t, i[i.length - 1].V)) : (this.P_["delete"](t), this.I_["delete"](t));
    }, t.prototype.j_ = function () {
      var t = new Map();
      this.O_.forEach(function (i, n) {
        i.z_.size > 0 && t.set(n, i);
      }), this.O_ = t;
    }, t.prototype.J_ = function (t) {
      for (var i = -1, n = 0; n < this.W_.length && n < t.length; ++n) {
        var h = this.W_[n],
            s = t[n];

        if (h.V.Ss !== s.V.Ss) {
          i = n;
          break;
        }

        s.Vs = h.Vs;
      }

      if (-1 === i && this.W_.length !== t.length && (i = Math.min(this.W_.length, t.length)), -1 === i) return -1;

      var r = function r(i) {
        var n = a(e.O_.get(t[i].V.Ss));
        n.zs = i, n.z_.forEach(function (t) {
          t.zs = i;
        });
      },
          e = this;

      for (n = i; n < t.length; ++n) {
        r(n);
      }

      return function (t, i) {
        void 0 === i && (i = 0);

        for (var n = 0 === i || 0 === t.length ? null : t[i - 1].V.Ss, h = 0, s = i; s < t.length; ++s) {
          var r = t[s];
          r.Vs = Tn(r.V.Ss, n), h += r.V.Ss - (n || r.V.Ss), n = r.V.Ss;
        }

        if (0 === i && t.length > 1) {
          var e = Math.ceil(h / (t.length - 1)),
              u = t[0].V.Ss - e;
          t[0].Vs = Tn(t[0].V.Ss, u);
        }
      }(t, i), this.W_ = t, i;
    }, t.prototype.X_ = function () {
      var t = 0;
      return this.P_.forEach(function (i) {
        0 !== i.length && (t = Math.max(t, i[i.length - 1].zs));
      }), t;
    }, t.prototype.q_ = function (t) {
      var i = Array.from(this.O_.values()).map(function (t) {
        return {
          Vs: 0,
          V: t.Wh
        };
      });
      i.sort(function (t, i) {
        return t.V.Ss - i.V.Ss;
      });
      var n = this.J_(i),
          h = {
        K_: new Map(),
        j: {
          Dr: this.X_()
        }
      };
      if (-1 !== n) this.P_.forEach(function (t, i) {
        h.K_.set(i, {
          Z_: t,
          _l: !0
        });
      }), h.j.G_ = this.W_;else {
        var s = this.P_.get(t);
        h.K_.set(t, {
          Z_: s || [],
          _l: !0
        });
      }
      return h;
    }, t;
  }(),
      Pn = {
    color: "#FF0000",
    price: 0,
    lineStyle: 2,
    lineWidth: 1,
    axisLabelVisible: !0
  },
      In = function () {
    function t(t) {
      this.uo = t;
    }

    return t.prototype.applyOptions = function (t) {
      this.uo.eh(t);
    }, t.prototype.options = function () {
      return this.uo.P();
    }, t.prototype.Q_ = function () {
      return this.uo;
    }, t;
  }();

  function Wn(t) {
    var i = t.overlay,
        n = function (t, i) {
      var n = {};

      for (var h in t) {
        Object.prototype.hasOwnProperty.call(t, h) && i.indexOf(h) < 0 && (n[h] = t[h]);
      }

      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
        var s = 0;

        for (h = Object.getOwnPropertySymbols(t); s < h.length; s++) {
          i.indexOf(h[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, h[s]) && (n[h[s]] = t[h[s]]);
        }
      }

      return n;
    }(t, ["overlay"]);

    return i && (n.priceScaleId = ""), n;
  }

  var Rn = function () {
    function t(t, i, n) {
      this.Ie = t, this.td = i, this.nd = n;
    }

    return t.prototype.on = function () {
      delete this.Ie, delete this.td;
    }, t.prototype.priceFormatter = function () {
      return this.Ie.$h();
    }, t.prototype.K_ = function () {
      return this.Ie;
    }, t.prototype.priceToCoordinate = function (t) {
      var i = this.Ie.q();
      return null === i ? null : this.Ie.X().$(t, i.Z);
    }, t.prototype.coordinateToPrice = function (t) {
      var i = this.Ie.q();
      return null === i ? null : this.Ie.X().Ci(t, i.Z);
    }, t.prototype.barsInLogicalRange = function (t) {
      if (null === t) return null;
      var i = new Et(new Dt(t.from, t.to)).js(),
          n = this.Ie.qi();
      if (n.Qt()) return null;
      var h = n.To(i.rs(), 1),
          s = n.To(i.es(), -1),
          r = l(n.So()),
          e = l(n.Ui());
      if (null !== h && null !== s && h.zs > s.zs) return {
        barsBefore: t.from - r,
        barsAfter: e - t.to
      };
      var u = {
        barsBefore: null === h || h.zs === r ? t.from - r : h.zs - r,
        barsAfter: null === s || s.zs === e ? e - t.to : e - s.zs
      };
      return null !== h && null !== s && (u.from = h.V.Ns || h.V.Ss, u.to = s.V.Ns || s.V.Ss), u;
    }, t.prototype.setData = function (t) {
      this.td.hd(this.Ie, t);
    }, t.prototype.update = function (t) {
      this.td.sa(this.Ie, t);
    }, t.prototype.setMarkers = function (t) {
      var i = t.map(function (t) {
        return _e(_e({}, t), {
          time: Bn(t.time)
        });
      });
      this.Ie.oa(i);
    }, t.prototype.applyOptions = function (t) {
      var i = Wn(t);
      this.Ie.eh(i);
    }, t.prototype.options = function () {
      return M(this.Ie.P());
    }, t.prototype.priceScale = function () {
      return this.nd.X(this.Ie.X().rh());
    }, t.prototype.createPriceLine = function (t) {
      var i = c(M(Pn), t),
          n = this.Ie.aa(i);
      return new In(n);
    }, t.prototype.removePriceLine = function (t) {
      this.Ie.la(t.Q_());
    }, t;
  }(),
      jn = function (t) {
    function i() {
      return null !== t && t.apply(this, arguments) || this;
    }

    return r(i, t), i.prototype.applyOptions = function (i) {
      mt(i), t.prototype.applyOptions.call(this, i);
    }, i;
  }(Rn),
      Un = {
    autoScale: !0,
    mode: 0,
    invertScale: !1,
    alignLabels: !0,
    borderVisible: !0,
    borderColor: "#2B2B43",
    entireTextOnly: !1,
    visible: !1,
    drawTicks: !0,
    scaleMargins: {
      bottom: .1,
      top: .2
    }
  },
      qn = {
    color: "rgba(0, 0, 0, 0)",
    visible: !1,
    fontSize: 48,
    fontFamily: Vt,
    fontStyle: "",
    text: "",
    horzAlign: "center",
    vertAlign: "center"
  },
      Hn = {
    width: 0,
    height: 0,
    layout: {
      backgroundColor: "#FFFFFF",
      textColor: "#191919",
      fontSize: 11,
      fontFamily: Vt
    },
    crosshair: {
      vertLine: {
        color: "#758696",
        width: 1,
        style: 3,
        visible: !0,
        labelVisible: !0,
        labelBackgroundColor: "#4c525e"
      },
      horzLine: {
        color: "#758696",
        width: 1,
        style: 3,
        visible: !0,
        labelVisible: !0,
        labelBackgroundColor: "#4c525e"
      },
      mode: 1
    },
    grid: {
      vertLines: {
        color: "#D6DCDE",
        style: 0,
        visible: !0
      },
      horzLines: {
        color: "#D6DCDE",
        style: 0,
        visible: !0
      }
    },
    overlayPriceScales: _e({}, Un),
    leftPriceScale: _e(_e({}, Un), {
      visible: !1
    }),
    rightPriceScale: _e(_e({}, Un), {
      visible: !0
    }),
    timeScale: {
      rightOffset: 0,
      barSpacing: 6,
      fixLeftEdge: !1,
      lockVisibleTimeRangeOnResize: !1,
      rightBarStaysOnScroll: !1,
      borderVisible: !0,
      borderColor: "#2B2B43",
      visible: !0,
      timeVisible: !1,
      secondsVisible: !0
    },
    watermark: qn,
    localization: {
      locale: hn ? navigator.language : "",
      dateFormat: "dd MMM 'yy"
    },
    dv: {
      mouseWheel: !0,
      pressedMouseMove: !0,
      horzTouchDrag: !0,
      vertTouchDrag: !0
    },
    Xc: {
      $c: {
        time: !0,
        price: !0
      },
      axisDoubleClickReset: !0,
      mouseWheel: !0,
      pinch: !0
    }
  },
      Yn = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    wickVisible: !0,
    borderVisible: !0,
    borderColor: "#378658",
    borderUpColor: "#26a69a",
    borderDownColor: "#ef5350",
    wickColor: "#737375",
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350"
  },
      Kn = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    openVisible: !0,
    thinBars: !0
  },
      $n = {
    color: "#2196f3",
    lineStyle: 0,
    lineWidth: 3,
    lineType: 0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4
  },
      Xn = {
    topColor: "rgba( 46, 220, 135, 0.4)",
    bottomColor: "rgba( 40, 221, 100, 0)",
    lineColor: "#33D778",
    lineStyle: 0,
    lineWidth: 3,
    lineType: 0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4
  },
      Zn = {
    color: "#26a69a",
    base: 0
  },
      Jn = {
    title: "",
    lastValueVisible: !0,
    priceLineVisible: !0,
    priceLineSource: 0,
    priceLineWidth: 1,
    priceLineColor: "",
    priceLineStyle: 2,
    baseLineVisible: !0,
    baseLineWidth: 1,
    baseLineColor: "#B2B5BE",
    baseLineStyle: 0,
    priceFormat: {
      type: "price",
      precision: 2,
      minMove: .01
    }
  },
      Gn = function () {
    function t(t, i) {
      this.sd = t, this.rd = i;
    }

    return t.prototype.on = function () {
      delete this.sd;
    }, t.prototype.applyOptions = function (t) {
      this.sd.ct().gl(this.rd, t);
    }, t.prototype.options = function () {
      return this.Jt().P();
    }, t.prototype.width = function () {
      return Pt(this.rd) ? this.sd.S_("left" === this.rd ? "left" : "right") : 0;
    }, t.prototype.Jt = function () {
      return l(this.sd.ct().pl(this.rd)).X;
    }, t;
  }(),
      Qn = function () {
    function t(t) {
      this.ed = new J(), this.Qs = new J(), this.hi = t, this.ma().Ur().tn(this.ud.bind(this)), this.ma().qr().tn(this.od.bind(this));
    }

    return t.prototype.on = function () {
      this.ma().Ur().rn(this), this.ma().qr().rn(this), this.ed.on(), delete this.hi;
    }, t.prototype.scrollPosition = function () {
      return this.ma().Fr();
    }, t.prototype.scrollToPosition = function (t, i) {
      i ? this.ma().jr(t, 1e3) : this.ma().cr(t);
    }, t.prototype.scrollToRealTime = function () {
      this.ma().Rr();
    }, t.prototype.getVisibleRange = function () {
      var t,
          i,
          n = this.ma().Mr();
      return null === n ? null : {
        from: null !== (t = n.from.Ns) && void 0 !== t ? t : n.from.Ss,
        to: null !== (i = n.to.Ns) && void 0 !== i ? i : n.to.Ss
      };
    }, t.prototype.setVisibleRange = function (t) {
      var i = {
        from: Bn(t.from),
        to: Bn(t.to)
      },
          n = this.ma().pr(i);
      this.hi.Yl(n);
    }, t.prototype.getVisibleLogicalRange = function () {
      var t = this.ma().wr();
      return null === t ? null : {
        from: t.rs(),
        to: t.es()
      };
    }, t.prototype.setVisibleLogicalRange = function (t) {
      o(t.from <= t.to, "The from index cannot be after the to index."), this.hi.Yl(t);
    }, t.prototype.resetTimeScale = function () {
      this.hi.Ol();
    }, t.prototype.fitContent = function () {
      this.hi.Kr();
    }, t.prototype.timeToCoordinate = function (t) {
      var i = Bn(t),
          n = this.hi.j(),
          h = n.vr(i, !1);
      return null === h ? null : n.J(h);
    }, t.prototype.coordinateToTime = function (t) {
      var i,
          n = this.hi.j(),
          h = n.Tr(t),
          s = n.si(h);
      return null === s ? null : null !== (i = s.Ns) && void 0 !== i ? i : s.Ss;
    }, t.prototype.subscribeVisibleTimeRangeChange = function (t) {
      this.ed.tn(t);
    }, t.prototype.unsubscribeVisibleTimeRangeChange = function (t) {
      this.ed.sn(t);
    }, t.prototype.subscribeVisibleLogicalRangeChange = function (t) {
      this.Qs.tn(t);
    }, t.prototype.unsubscribeVisibleLogicalRangeChange = function (t) {
      this.Qs.sn(t);
    }, t.prototype.applyOptions = function (t) {
      this.ma().eh(t);
    }, t.prototype.options = function () {
      return M(this.ma().P());
    }, t.prototype.ma = function () {
      return this.hi.j();
    }, t.prototype.ud = function () {
      this.ed.un() && this.ed.en(this.getVisibleRange());
    }, t.prototype.od = function () {
      this.Qs.un() && this.Qs.en(this.getVisibleLogicalRange());
    }, t;
  }();

  function th(t) {
    if (void 0 !== t && "custom" !== t.type) {
      var i = t;
      void 0 !== i.minMove && void 0 === i.precision && (i.precision = function (t) {
        if (t >= 1) return 0;

        for (var i = 0; i < 8; i++) {
          var n = Math.round(t);
          if (Math.abs(n - t) < 1e-8) return i;
          t *= 10;
        }

        return i;
      }(i.minMove));
    }
  }

  function ih(t) {
    return function (t) {
      if (w(t.handleScale)) {
        var i = t.handleScale;
        t.handleScale = {
          axisDoubleClickReset: i,
          axisPressedMouseMove: {
            time: i,
            price: i
          },
          mouseWheel: i,
          pinch: i
        };
      } else if (void 0 !== t.handleScale && w(t.handleScale.axisPressedMouseMove)) {
        var n = t.handleScale.axisPressedMouseMove;
        t.handleScale.axisPressedMouseMove = {
          time: n,
          price: n
        };
      }

      var h = t.handleScroll;
      w(h) && (t.handleScroll = {
        horzTouchDrag: h,
        vertTouchDrag: h,
        mouseWheel: h,
        pressedMouseMove: h
      });
    }(t), function (t) {
      if (t.priceScale) {
        t.leftPriceScale = t.leftPriceScale || {}, t.rightPriceScale = t.rightPriceScale || {};
        var i = t.priceScale.position;
        delete t.priceScale.position, t.leftPriceScale = c(t.leftPriceScale, t.priceScale), t.rightPriceScale = c(t.rightPriceScale, t.priceScale), "left" === i && (t.leftPriceScale.visible = !0, t.rightPriceScale.visible = !1), "right" === i && (t.leftPriceScale.visible = !1, t.rightPriceScale.visible = !0), "none" === i && (t.leftPriceScale.visible = !1, t.rightPriceScale.visible = !1), t.overlayPriceScales = t.overlayPriceScales || {}, void 0 !== t.priceScale.invertScale && (t.overlayPriceScales.invertScale = t.priceScale.invertScale), void 0 !== t.priceScale.scaleMargins && (t.overlayPriceScales.scaleMargins = t.priceScale.scaleMargins);
      }
    }(t), t;
  }

  var nh = function () {
    function t(t, i) {
      var n = this;
      this.ad = new On(), this.ld = new Map(), this.fd = new Map(), this.vd = new J(), this._d = new J();
      var h = void 0 === i ? M(Hn) : c(M(Hn), ih(i));
      this.sd = new bn(t, h), this.sd.Dv().tn(function (t) {
        n.vd.un() && n.vd.en(n.dd(t()));
      }, this), this.sd.Sl().tn(function (t) {
        n._d.un() && n._d.en(n.dd(t()));
      }, this);
      var s = this.sd.ct();
      this.wd = new Qn(s);
    }

    return t.prototype.remove = function () {
      this.sd.Dv().rn(this), this.sd.Sl().rn(this), this.wd.on(), this.sd.on(), delete this.sd, this.ld.forEach(function (t, i) {
        i.on();
      }), this.ld.clear(), this.fd.clear(), this.vd.on(), this._d.on(), this.ad.on(), delete this.ad;
    }, t.prototype.resize = function (t, i, n) {
      this.sd.b_(t, i, n);
    }, t.prototype.addAreaSeries = function (t) {
      void 0 === t && (t = {}), th((t = Wn(t)).priceFormat);
      var i = c(M(Jn), Xn, t),
          n = this.sd.ct().Ul("Area", i),
          h = new Rn(n, this, this);
      return this.ld.set(h, n), this.fd.set(n, h), h;
    }, t.prototype.addBarSeries = function (t) {
      void 0 === t && (t = {}), th((t = Wn(t)).priceFormat);
      var i = c(M(Jn), Kn, t),
          n = this.sd.ct().Ul("Bar", i),
          h = new Rn(n, this, this);
      return this.ld.set(h, n), this.fd.set(n, h), h;
    }, t.prototype.addCandlestickSeries = function (t) {
      void 0 === t && (t = {}), mt(t = Wn(t)), th(t.priceFormat);
      var i = c(M(Jn), Yn, t),
          n = this.sd.ct().Ul("Candlestick", i),
          h = new jn(n, this, this);
      return this.ld.set(h, n), this.fd.set(n, h), h;
    }, t.prototype.addHistogramSeries = function (t) {
      void 0 === t && (t = {}), th((t = Wn(t)).priceFormat);
      var i = c(M(Jn), Zn, t),
          n = this.sd.ct().Ul("Histogram", i),
          h = new Rn(n, this, this);
      return this.ld.set(h, n), this.fd.set(n, h), h;
    }, t.prototype.addLineSeries = function (t) {
      void 0 === t && (t = {}), th((t = Wn(t)).priceFormat);
      var i = c(M(Jn), $n, t),
          n = this.sd.ct().Ul("Line", i),
          h = new Rn(n, this, this);
      return this.ld.set(h, n), this.fd.set(n, h), h;
    }, t.prototype.removeSeries = function (t) {
      var i = a(this.ld.get(t)),
          n = this.ad.Hl(i);
      this.sd.ct().Hl(i), this.Md(n), this.ld["delete"](t), this.fd["delete"](i);
    }, t.prototype.hd = function (t, i) {
      this.Md(this.ad.R_(t, i));
    }, t.prototype.sa = function (t, i) {
      this.Md(this.ad.H_(t, i));
    }, t.prototype.subscribeClick = function (t) {
      this.vd.tn(t);
    }, t.prototype.unsubscribeClick = function (t) {
      this.vd.sn(t);
    }, t.prototype.subscribeCrosshairMove = function (t) {
      this._d.tn(t);
    }, t.prototype.unsubscribeCrosshairMove = function (t) {
      this._d.sn(t);
    }, t.prototype.priceScale = function (t) {
      return t = t || this.sd.ct().Kl(), new Gn(this.sd, t);
    }, t.prototype.timeScale = function () {
      return this.wd;
    }, t.prototype.applyOptions = function (t) {
      this.sd.eh(ih(t));
    }, t.prototype.options = function () {
      return this.sd.P();
    }, t.prototype.takeScreenshot = function () {
      return this.sd.k_();
    }, t.prototype.Md = function (t) {
      var i = this.sd.ct();
      i.Rl(t.j.Dr, t.j.G_), t.K_.forEach(function (t, i) {
        return i.sa(t.Z_, t._l);
      }), i.Er();
    }, t.prototype.bd = function (t) {
      return a(this.fd.get(t));
    }, t.prototype.dd = function (t) {
      var i = this,
          n = new Map();
      t.B_.forEach(function (t, h) {
        n.set(i.bd(h), t);
      });
      var h = void 0 === t.L_ ? void 0 : this.bd(t.L_);
      return {
        time: t.V && (t.V.Ns || t.V.Ss),
        point: t.E_,
        hoveredSeries: h,
        hoveredMarkerId: t.F_,
        seriesPrices: n
      };
    }, t;
  }();

  var hh = Object.freeze({
    __proto__: null,
    version: function version() {
      return "3.1.1";
    },

    get LineStyle() {
      return i;
    },

    get LineType() {
      return t;
    },

    get CrosshairMode() {
      return O;
    },

    get PriceScaleMode() {
      return ft;
    },

    get PriceLineSource() {
      return dt;
    },

    get TickMarkType() {
      return Tt;
    },

    isBusinessDay: Bt,
    isUTCTimestamp: Ft,
    createChart: function createChart(t, i) {
      var n = l(d(t) ? document.getElementById(t) : t);
      return new nh(n, i);
    }
  });
  window.LightweightCharts = hh;
}();

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\laragon\www\DashDesk\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\laragon\www\DashDesk\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });