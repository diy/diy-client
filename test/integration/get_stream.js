var test    = require('tape'),
    diy     = require('../../lib/index')('*');

var buffer = '';
var req = diy({
    method: 'GET',
    uri:    '/status'
});

test('HTTP GET w/ Stream', function (t) {
    if (typeof window !== 'undefined') {
        t.equal(true, true, 'streaming not supported in browsers')
        return t.end();
    }

    req.on('data', function (data) {
        buffer += data.toString();
    });

    req.on('end', function () {
        t.equal(typeof JSON.parse(buffer), 'object', 'response should be an object');
        t.end();
    });

    req.on('error', function (err) {
        throw new Error(err);
    });
});