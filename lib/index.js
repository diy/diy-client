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
    if (typeof key === 'undefined') key = null;
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
            headers:    {
                'accept-version':   version,
                'accept-type':      'application/json'
            }
        });

        // Host
        options.uri = 'https://api.diy.org' + options.uri;

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