var test    = require('tape'),
    diy     = require('../../lib/index')('*');

test('HTTP POST w/ error', function (t) {
    diy({
        method: 'POST',
        uri:    '/loopback',
        params: {
            foo: 'bar'
        }
    }, function (err, body) {
        if (typeof window !== 'undefined') {
            var body = JSON.parse(err.message);

            t.notEqual(err, null, 'errors should not be null');
            t.equal(typeof body, 'object', 'error is a valid object');
            t.equal(body.response.error, 'Method Not Allowed', 'included expected response');
            t.end();
        } else {
            t.equal(err, null, 'errors should be null');
            t.equal(typeof body, 'object', 'response body should be an object');
            t.equal(body.response.error, 'Method Not Allowed', 'included expected response');
            t.end();
        }
    });
});