var test    = require('tape'),
    diy     = require('../../lib/index')('*');

diy({
    method: 'GET',
    uri:    '/explore/featured'
}, function (err, body) {
    test('HTTP GET', function (t) {
        t.equal(err, null, 'errors should be null');
        t.equal(typeof body, 'object', 'response body should be an object');
        t.end();
    });
});