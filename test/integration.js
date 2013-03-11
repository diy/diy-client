/**
 * Integration test.
 *
 * @package api
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var diy     = require('../lib/index')('APIKEY', '*');

/**
 * Test 
 */
var req = diy({
    method: 'GET',
    uri:    '/status'
}).pipe(process.stdout);

req.on('error', function (err) {
    console.dir(err);
});