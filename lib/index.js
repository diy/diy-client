/**
 * Minimalist streaming API client for DIY
 *
 * @package diy
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var _           = require('lodash'),
    hyperquest  = require('hyperquest');

/**
 * Returns an API client with the user supplied API key and version target.
 *
 * @param {String} API key
 * @param {String} API version target (defaults to '*')
 *
 * @return {Object}
 */
module.exports = function (key, version, host) {
    // Params
    if (typeof key === 'undefined') key = 'DIY_TEST_KEY';
    if (typeof version === 'undefined') version = '*';
    if (typeof host === 'undefined') host = process.env.DIY_API_HOST || 'https://brain.diy.org';

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
        var buffer  = '';
        var body    = null;

        _.defaults(options, {
            method:     'GET',
            uri:        '/',
            headers:    {}
        });

        // Host
        options.uri = host + options.uri;

        // Headers
        options.headers['x-diy-api-key'] = key;
        options.headers['accept-version'] = version;
        options.headers['accept-type'] = 'application/json';

        // Authentication token
        if (typeof options.token !== 'undefined') {
            options.headers['x-diy-api-token'] = options.token;
            delete options.auth;
            delete options.token;
        }

        // Post data
        if (typeof options.params !== 'undefined') {
            body = JSON.stringify(options.params);
            options.headers['content-type'] = 'application/json';
            options.headers['content-length'] = body.length;
            delete options.params;
        }

        // Create hyperquest object
        var request = hyperquest(options);

        // Send post data
        if (body !== null) {
            request.write(body);
        }

        // If no callback is provided, return hyperquest object
        if (typeof callback === 'undefined') return request;

        // Callback handler
        request.on('error', function (err) {
            return callback(err);
        });

        request.on('data', function (data) {
            buffer += data.toString();
        });

        request.on('end', function (data) {
            try {
                callback(null, JSON.parse(buffer));
            } catch (e) {
                callback(e);
            }
        });
    }
}
