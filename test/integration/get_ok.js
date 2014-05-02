var test    = require('tape'),
    diy     = require('../../lib/index')('*');

test('HTTP GET', function (t) {
    diy({
        method: 'GET',
        uri:    '/explore/featured'
    }, function (err, body) {
        t.equal(err, null, 'errors should be null');
        t.equal(typeof body, 'object', 'response body should be an object');
        t.end();
    });
});