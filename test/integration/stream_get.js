var test    = require('tap').test,
    diy     = require('../../lib/index')('*');

var buffer = '';
var req = diy({
    method: 'GET',
    uri:    '/status'
});

test('integration', function (t) {
    req.on('data', function (data) {
        buffer += data.toString();
    });

    req.on('end', function () {
        t.type(JSON.parse(buffer), 'object', 'response should be an object');
        t.end();
    });

    req.on('error', function (err) {
        t.equal(err, null, 'errors should be null');
        t.end();
    });
});