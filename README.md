## diy
#### Minimalist [streaming](http://nodejs.org/api/stream.html) API client for DIY

### Installation
```bash
npm install diy
```

### Basic Use
```javascript
var diy    = require('diy')('YOURAPIKEY', '*');
var request = diy({
    method: 'GET',
    uri:    '/status'
}).pipe(process.stdout);

request.on('error', function (err) {
    // Oh noes! 
});
```

### Request Proxy
One common question has been how to integrate calls to the DIY API with 3rd party Node.js servers. The easiest way to do this is to simply proxy requests to the DIY API and then pipe the response. For example, here is a simple HTTP server that will forward all requests to:

```javascript
var http    = require('http'),
    diy     = require('diy')('YOURAPIKEY', '*');

http.createServer(function (req, res) {
    diy({
        method: req.method,
        uri:    req.url
    }).pipe(res);
}).listen(80);
```

### Testing
```bash
npm test
```
