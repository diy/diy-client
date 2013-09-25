## diy
#### Minimalist [streaming](http://nodejs.org/api/stream.html) API client for DIY

[![Build Status](https://travis-ci.org/diy/diy-client.png?branch=master)](https://travis-ci.org/diy/diy-client)

### Installation
```bash
npm install diy
```

### Basic Use
```javascript
var diy    = require('diy')('*');
var request = diy({
    method: 'GET',
    uri:    '/status'
}).pipe(process.stdout);

request.on('error', function (err) {
    // Oh noes! 
});
```

### Request Proxy
One common question has been how to integrate calls to the DIY API with 3rd party Node.js servers. The easiest way to do this is to simply proxy requests to the DIY API and then pipe the response. For example, here is a simple (read: incomplete) HTTP server that will forward all requests to the API client and then pipe the response:

```javascript
var http    = require('http'),
    diy     = require('diy')('*');

http.createServer(function (req, res) {
    diy({
        method: req.method,
        uri:    req.url
    }).pipe(res);
}).listen(80);
```

### Callback Pattern
Optionally you can use a request-ish callback pattern should streams be a good fit for your implementation:

```javascript
var diy    = require('diy')('*');
diy({
    method: 'GET',
    uri:    '/status'
}, function (err, body) {
    // Do stuff
});
```

### Testing
```bash
npm test
```
