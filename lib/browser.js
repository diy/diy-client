/**
 * Client-side API wrapper for DIY.
 *
 * @package diy-client
 * @author Andrew Sliwinski <andrew@diy.org>
 *         Derek Reynolds <drk@diy.org>
 */

function createRequest (method, url) {
    var xhr = new XMLHttpRequest();

    if (typeof xhr.withCredentials !== 'undefined') {
        xhr.open(method, url, true);
        return xhr;
    }

    if (typeof XDomainRequest !== 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
        return xhr;
    }

    return null;
};

/**
 * Executes a request against DIY's API and returns the result.
 *
 * @param {string, object} 
 *      - url {string, required} API resource (e.g. '/makers/astro/projects')
 *      - method {string, GET} HTTP request method
 *      - cache {boolean, FALSE} HTTP request cache
 *      - body {object, optional} Data to be sent in the request body
 *      - token {string, optional} DIY authentication token
 *
 * @return {object}
 */
module.exports = function (version, host) {
    if (typeof version === 'undefined') version = '*';
    if (typeof host === 'undefined') host = 'https://brain.diy.org';

    return function (req, callback) {
        // Allow simple "string" requests
        if (typeof req === 'string') req = { uri: req };

        // Defaults
        req.method = req.method || 'GET';
        req.cache  = (typeof req.cache === 'undefined') ? 
                              false : req.cache;

        req.dataType    = req.dataType || 'json';
        req.contentType = req.contentType || 'application/json; charset=utf-8';

        // POST body handler
        var method = req.method.toLowerCase();
        if (method === 'post' || method === 'put' || method === 'delete') {
            if (typeof req.body !== 'undefined') {
                req.data = JSON.stringify(req.body);
                delete req.body;
            }
        }

        // Prefix host
        req.uri = host + req.uri;

        var request = createRequest(req.method, req.uri);

        // Token handler
        if (typeof req.token !== 'undefined') {
            request.setRequestHeader('x-diy-api-token', req.token);
            delete req.auth;
            delete req.token;
        }

        request.setRequestHeader(
            'Accept', 'application/json, text/javascript, */*; q=0.01'
        );

        request.setRequestHeader('accept-version', version);

        request.setRequestHeader('Content-Type', req.contentType);

        // Handle and send
        request.onload = function () {
            if (request.status > 201) {
                return callback(JSON.parse(request.responseText));
            }

            return callback(null, JSON.parse(request.responseText));
        };

        request.onerror = function () {
            return callback('There was an error with your request.');
        };

        request.send(req.data);
    }
};
