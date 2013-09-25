/**
 * Minimalist streaming API client for DIY for use with browserify.
 *
 * @package diy
 * @author Derek Reynolds <drk@diy.org>
 */

/**
 * Dependencies
 */
var _ = require('lodash'),
    $ = require('jquery-browserify');


/**
 * Returns an API client version target.
 *
 * @param {String} API version target (defaults to '*')
 * @param {String} Alternate host (defaults to https://brain.diy.org)
 *
 * @return {Object}
 */
module.exports = function (version, host) {
    if (typeof version === 'undefined') version = '*';
    if (typeof host === 'undefined') host = 'https://brain.diy.org';

    /**
     * jQuery.getJSON adaptor.
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
        _.defaults(options, {
            method:  'GET',
            uri:     '/',
            headers: {}
        });

        // Host
        options.uri = host + options.uri;

        options.headers['accept-version'] = version;
        options.headers['accept-type'] = 'application/json';

        // Normalize method
        options.method = options.method.toUpperCase();

        if (options.method === 'GET')  return getRequest(options, callback);
    };
};

function getRequest (options, callback) {
    var xhr = $.getJSON(options.uri);

    xhr.done(function (data) {
        if (typeof callback === 'function') callback(null, data);
    });

    xhr.fail(function (err) {
        if (typeof callback === 'function') callback(err);
    })

    return xhr;
}
