var test    = require('tape');

// Setup
var diy     = require('../../lib/index');
var client  = diy('*');

// Asset
test('interface', function (t) {
    t.equal(typeof diy, 'function', 'module should be a function');
    t.equal(typeof client, 'function', 'client should be a function');
    t.end();
});