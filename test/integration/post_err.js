var test    = require('tape'),
    diy     = require('../../lib/index')('*');

diy({
    method: 'POST',
    uri:    '/loopback',
    params: {
        foo: 'bar'
    }
}, function (err, body) {
    console.dir(body);
    test('integration', function (t) {
        t.plan(3);

        t.equal(err, null, 'errors should be null');
        t.equal(typeof body, 'object', 'response body should be an object');
        t.equal(body.response.error, 'Method Not Allowed', 'included expected response');
    });
});