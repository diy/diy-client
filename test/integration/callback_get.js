var test    = require('tap').test,
    diy     = require('../../lib/index')('DIY_TEST_KEY', '*');

diy({
    method: 'GET',
    uri:    '/status'
}, function (err, body) {
    test('integration', function (t) {
        t.equal(err, null, 'errors should be null');
        t.type(body, 'object', 'response body should be an object');
        t.end();
    });
});