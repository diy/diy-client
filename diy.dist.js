!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.diyClient=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Minimalist streaming API client for DIY
 *
 * @package diy
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var request = _dereq_('request');

/**
 * Returns an API client with the user supplied API key and version target.
 *
 * @param {String} API version target (defaults to '*')
 * @param {String} Alternate host (defaults to https://api.diy.org)
 *
 * @return {Object}
 */
module.exports = function (version, host) {
    // Params
    if (typeof version === 'undefined') version = '*';
    if (typeof host === 'undefined') host = 'https://api.diy.org';

    /**
     * Hyperquest adapter.
     *
     * @param {Object} Options
     *      - method {String}
     *      - uri {String}
     *      - auth {String, Optional} 'username:password'
     *      - token {String, Optional}
     *      - params {Object, Optional}
     * @param {Function} Callback (optional)
     *
     * @return {Object}
     */
    return function (options, callback) {
        // Defaults & storage objects
        if (typeof options === 'string') options = { uri: options };
        options = options || {};

        if (typeof options.method === 'undefined') options.method = 'GET';
        if (typeof options.uri === 'undefined') options.uri = '/';
        if (typeof options.headers === 'undefined') options.headers = {};
        if (typeof options.params === 'undefined') options.json = {};

        // Host & version header
        options.uri = host + options.uri;
        options.headers['accept-version'] = version;
        options.cors = true;

        // Authentication token
        if (typeof options.token !== 'undefined') {
            options.headers['x-diy-api-token'] = options.token;
            delete options.auth;
            delete options.token;
        }

        // Handle basic auth passed as string
        if (typeof options.auth === 'string') {
            var authString = options.auth.split(':');
            options.auth = {
                user: authString[0],
                pass: authString[1]
            };
        }

        // Post data
        if (typeof options.params !== 'undefined') {
            options.json = options.params;
            delete options.params;
        }

        // If no callback is provided, return request object
        if (typeof callback === 'undefined') return request(options);

        // Else, handle callback and return
        request(options, function (err, resp, body) {
            if (err) return callback(err);
            callback(null, body);
        });
    };
};
},{"request":2}],2:[function(_dereq_,module,exports){
var window = _dereq_("global/window")
var once = _dereq_("once")

var messages = {
    "0": "Internal XMLHttpRequest Error",
    "4": "4xx Client Error",
    "5": "5xx Server Error"
}

var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ?
        window.XMLHttpRequest : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr && options.cors) {
        xhr = new XDR()
    } else if (!xhr) {
        xhr = new XHR()
    }

    var uri = xhr.url = options.uri || options.url;
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false

    if ("json" in options) {
        isJson = true
        headers["Content-Type"] = "application/json"
        body = JSON.stringify(options.json)
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = load
    xhr.onerror = error
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    // hate IE
    xhr.ontimeout = noop
    xhr.open(method, uri, !sync)
    if (options.cors) {
        xhr.withCredentials = true
    }
    // Cannot set timeout with sync request
    if (!sync) {
        xhr.timeout = "timeout" in options ? options.timeout : 5000
    }

    if ( xhr.setRequestHeader) {
        Object.keys(headers).forEach(function (key) {
            xhr.setRequestHeader(key, headers[key])
        })
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    xhr.send(body)

    return xhr

    function readystatechange() {
        if (xhr.readyState === 4) {
            load()
        }
    }

    function load() {
        var error = null
        var status = xhr.statusCode = xhr.status
        var body = xhr.body = xhr.response ||
            xhr.responseText || xhr.responseXML

        if (status === 0 || (status >= 400 && status < 600)) {
            var message = xhr.responseText ||
                messages[String(xhr.status).charAt(0)]
            error = new Error(message)

            error.statusCode = xhr.status
        }

        if (isJson) {
            try {
                body = xhr.body = JSON.parse(body)
            } catch (e) {}
        }

        callback(error, xhr, body)
    }

    function error(evt) {
        callback(evt, xhr)
    }
}


function noop() {}

},{"global/window":3,"once":4}],3:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window
} else if (typeof global !== "undefined") {
    module.exports = global
} else {
    module.exports = {}
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(_dereq_,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}]},{},[1])
(1)
});