var test    = require('tap').test;

// Setup
var diy     = require('../../lib/index');
var client  = diy('*');

// Asset
test('unit', function (t) {
    client('/status', function (err, body) {
        t.equals(body.head.url, '/status', 'use string as uri');
        t.equals(body.head.method, 'GET', 'default to GET request');
        t.end();
    });
});
