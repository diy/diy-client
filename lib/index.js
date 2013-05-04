/**
 * Minimalist streaming API client for DIY
 *
 * @package diy
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var _           = require('underscore'),
    hyperquest  = require('hyperquest');

/**
 * Returns an API client with the user supplied API key and version target.
 *
 * @param {String} API key
 * @param {String} API version target (defaults to '*')
 *
 * @return {Object}
 */
module.exports = function (key, version) {
    // Params
    if (typeof key === 'undefined') key = DIY_TEST_KEY;
    if (typeof version === 'undefined') version = '*';

    /**
     * Hyperquest adapter.
     *
     * @param {Object} Options
     *      - method {String}
     *      - uri {String}
     *      - auth {String, Optional} 'username:password'
     *      - token {String, Optional}
     */
    return function (options) {
        // Defaults
        _.defaults(options, {
            method:     'GET',
            uri:        '/',
            headers:    {}
        });

        // Host
        options.uri = 'https://brain.diy.org' + options.uri;

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

        // Construct
        return hyperquest(options);
    }
}