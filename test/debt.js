/**
 * Code debt test.
 *
 * @package diy
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var test    = require('tap').test,
    bux     = require('codebux');

/**
 * Test
 */
bux(__dirname + '/../lib/index.js', function (err, obj) {
    test('debt', function (t) {
        t.equal(err, null, 'error should be null');
        t.type(obj, 'number', 'results should be a number');
        t.ok(obj > 50, 'total should be greater than 50');
        t.end();
    });         
});