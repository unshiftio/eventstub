# eventstub

[![Made by unshift][made-by]](http://unshift.io)[![Version npm][version]](http://browsenpm.org/package/eventstub)[![Build Status][build]](https://travis-ci.org/unshiftio/eventstub)[![Dependencies][david]](https://david-dm.org/unshiftio/eventstub)[![Coverage Status][cover]](https://coveralls.io/r/unshiftio/eventstub?branch=master)[![IRC channel][irc]](https://webchat.freenode.net/?channels=unshift)

[made-by]: https://img.shields.io/badge/made%20by-unshift-00ffcc.svg?style=flat-square
[version]: https://img.shields.io/npm/v/eventstub.svg?style=flat-square
[build]: https://img.shields.io/travis/unshiftio/eventstub/master.svg?style=flat-square
[david]: https://img.shields.io/david/unshiftio/eventstub.svg?style=flat-square
[cover]: https://img.shields.io/coveralls/unshiftio/eventstub/master.svg?style=flat-square
[irc]: https://img.shields.io/badge/IRC-irc.freenode.net%23unshift-00a8ff.svg?style=flat-square

## Install

This module is published in the public npm registry and can be installed using:

```
npm install --save eventstub
```

## Usage

The exported function by the module accepts one argument, an array or
comma/space separated list of methods that should add event listeners for the
given method name. The methods that are added are automatically prefixed with
`on`.

```js
'use strict';

var eventstub = require('eventstub')
  , stub = eventstub('message, error, timeout');

stub.onmessage = function message(one, two, four, five, six) {
  // this will acutally be transformed as `stub.on('message', function ..)`
};

stub.emit('message', 1, 2, 4, 5, 6);
```

If you add another `onmessage` handler we will automatically kill all previously
assigned handlers so your `onmessage` handler is the only event listener.

## License

[MIT](LICENSE)
