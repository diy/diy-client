var test    = require('tape'),
    diy     = require('../../lib/index')('*');

diy({
    method: 'GET',
    uri:    '/explore/featured',
    auth:   'username:password'
}, function (err, body) {
    console.dir(body);
    test('integration', function (t) {
        t.plan(2);
        t.equal(err, null, 'errors should be null');
        t.equal(typeof body, 'object', 'response body should be an object');
    });
});