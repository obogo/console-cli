/**
 * Used to temporarily keep information. Can only be consumed once.
 */
/* global angular, module, environment */
module.service('Flashback', function () {
    var defaultKey = 'flashback';
    var localStorage = require('localStorage');

    this.peek = function (key) {
        return localStorage.get(key || defaultKey);
    };

    this.consume = function (key) {
        var data = this.peek();
        localStorage.removeItem(key || defaultKey);
        return data;
    };

    this.store = function (data, key) {
        localStorage.put(key || defaultKey, data);
    };
});