/**
 * Interface specification.
 *
 * @package diy
 * @author Andrew Sliwinski
 */

/**
 * Dependencies
 */
var test    = require('tap').test;

/**
 * Setup
 */
var diy     = require('../lib/index');
var client  = diy('APIKEY', '*');

/**
 * Test 
 */
test('interface', function (t) {
    t.type(diy, 'function', 'module should be a function');
    t.type(client, 'object', 'client should be an object');
    t.end();
});