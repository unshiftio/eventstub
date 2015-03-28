describe('eventstub', function () {
  'use strict';

  var EventEmitter = require('eventemitter3')
    , assume = require('assume')
    , stub = require('./');

  it('is exported as fn', function () {
    assume(stub).is.a('function');
  });

  it('returns an EventEmitter', function () {
    var e = stub();

    assume(e).is.instanceOf(EventEmitter);
  });

  it('it adds the supplied methods', function () {
    var e = stub(['message', 'cows', 'moo']);

    assume(e).has.property('onmessage');
    assume(e).has.property('oncows');
    assume(e).has.property('onmoo');

    assume(e.listeners('cows').length).equals(0);

    /* istanbul ignore next */
    e.oncows = function () {};
    assume(e.oncows).is.a('function');
    assume(e.listeners('cows').length).equals(1);
  });

  it('it adds the supplied fn as eventemitter', function (next) {
    var e = stub(['foo']);

    function foo(arg) {
      assume(arg).equals('bar');
      assume(e.onfoo).equals(foo);

      next();
    }

    e.onfoo = foo;
    e.emit('foo', 'bar');
  });

  it('removes the previously added event listener', function (next) {
    var e = stub('foo');

    /* istanbul ignore next */
    e.onfoo = function () {
      throw new Error('I should be removed');
    };

    e.onfoo = next();
    e.emit('foo');
  });
});
