var test    = require('tap').test,
    diy     = require('../../lib/index')('*');

var buffer = '';
var req = diy({
    method: 'POST',
    uri:    '/loopback',
    params: {
        foo: 'bar'
    }
});

test('integration', function (t) {
    req.on('data', function (data) {
        buffer += data.toString();
    });

    req.on('end', function () {
        t.type(JSON.parse(buffer), 'object', 'response should be an object');
        t.equal(JSON.parse(buffer).response.foo, 'bar', 'included expected response');
        t.end();
    });

    req.on('error', function (err) {
        t.equal(err, null, 'errors should be null');
        t.end();
    });
});