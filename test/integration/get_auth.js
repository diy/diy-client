var test    = require('tape'),
    diy     = require('../../lib/index')('*');

diy({
    method: 'GET',
    uri:    '/explore/featured',
    auth:   'username:password'
}, function (err, body) {
    test('HTTP GET w/ Basic Auth', function (t) {
        t.equal(err, null, 'errors should be null');
        t.equal(typeof body, 'object', 'response body should be an object');
        t.end();
    });
});