/* global angular, module, environment */
module.factory('Toast', function ($rootScope, $timeout) {
    var api = {};

    var queue = [];
    var timer, closeHandler;

    api.current = null;

    api.hasNext = function () {
        return !!queue.length;
    };

    api.next = function () {
        if (api.current && typeof api.current.options.closeHandler === 'function') {
            api.current.options.closeHandler();
        }

        api.current = null;
        if (api.hasNext()) {
            api.current = queue.shift();
        }
        setTimeout(function () {
            $rootScope.$apply();
        });
    };

    api.show = function (message, options) {
        options = angular.extend({}, {
            pinTo: 'bottom left',
            hideDelay: 3000,
            showClose: false,
            closeOnClick: false,
            classes: '',
            closeHandler: null
        }, options);

        queue.push({
            message: message,
            options: options
        });

        if (api.current) {
            if (api.current.options.hideDelay === 0) {
                queue.push(api.current);
                api.close();
            }
        } else {
            $timeout.cancel(timer);
            timer = $timeout(function () {
                api.next();
            });
        }
    };

    api.clear = function () {
        queue.length = 0;
        api.close();
    };

    api.close = function () {
        if (typeof closeHandler === 'function') {
            closeHandler();
        }
    };

    api.remove = function (id) {
        if (api.current && api.current.options.id === id) {
            api.close();
        }
        var len = queue.length;
        for (var i = 0; i < len; i++) {
            if (queue[i].options.id === id) {
                queue.splice(i, 1);
                break;
            }
        }
    };

    api.onClose = function (handler) {
        closeHandler = handler;
    };

    return api;
});