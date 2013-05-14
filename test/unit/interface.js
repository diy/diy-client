var test    = require('tap').test;

// Setup
var diy     = require('../../lib/index');
var client  = diy('APIKEY', '*');

// Asset
test('unit', function (t) {
    t.type(diy, 'function', 'module should be a function');
    t.type(client, 'function', 'client should be a function');
    t.end();
});