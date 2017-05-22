/* global angular, module, environment */
module.factory('Menu', function () {
    var api = {};

    api.show = false;

    api.open = function () {
        this.show = true;
    };

    api.close = function () {
        this.show = false;
    };

    api.toggle = function() {
        this.show = !this.show;
    };

    return api;
});