'use strict';

var EventEmitter = require('eventemitter3');

/**
 * Default methods that will help with the assignment.
 *
 * @type {Array}
 * @public
 */
var defaults = 'message,progress,readystatechange,error,abort,close,load,timeout'.split(',');

/**
 * Generate an EventEmitter with helper methods so you can assign events in
 * a "DOM" way.
 *
 * @param {Array} methods Methods that we need to add to the instance.
 * @api public
 */
module.exports = function generate(methods) {
  if ('string' === typeof methods) {
    methods = methods.split(/[, ]+/);
  }

  return (methods = methods || defaults).reduce(function each(emitter, method) {
    Object.defineProperty(emitter, 'on'+ method, {
      enumerable: true,

      get: function get() {
        return this.listeners(method).pop();
      },

      set: function set(fn) {
        this.removeAllListeners(method);
        this.on(method, fn);

        return fn;
      }
    });

    return emitter;
  }, new EventEmitter());
};
