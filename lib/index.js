/**
 * Minimalist streaming API client for DIY
 *
 * @package diy
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var request = require('request');

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