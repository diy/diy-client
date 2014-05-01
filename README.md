## diy
#### JavaScript API client for [DIY.org](https://diy.org)

[![Build Status](https://travis-ci.org/diy/diy-client.png?branch=master)](https://travis-ci.org/diy/diy-client)

### Installation
```bash
npm install diy
```

### Stream Pattern
```js
var diy    = require('diy')('*');
var request = diy({
    method: 'GET',
    uri:    '/status'
}).pipe(process.stdout);

request.on('error', function (err) {
    // Oh noes! 
});
```

### Callback Pattern
```js
var diy = require('diy')('*');

diy({
    method: 'GET',
    uri:    '/status'
}, function (err, body) {
    window.alert(body); 
});
```

### Testing
```bash
npm test
```