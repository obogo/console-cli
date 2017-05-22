/* global angular, module, environment */
module.factory('Alert', function () {
    var api = {};

    var defaultOptions = {
        type: 'success',
        dismissible: true,
        message: 'No message provided'
    };

    api.show = false;

    api.open = function (options) {
        this.show = true;
        this.options = angular.extend({}, defaultOptions, options);
    };

    api.close = function () {
        this.show = false;
    };

    api.toggle = function() {
        this.show = !this.show;
    };

    return api;
});