module.factory('Dialog', function () {
    var api = {};

    api.show = false;

    api.open = function (options) {
        if (!options.component) {
            throw new Error('Option "component" required.');
        }
        this.show = true;
        this.options = options;
    };

    api.close = function (data) {
        this.show = false;

        if (typeof this.options.close === 'function') {
            this.options.close(data);
        }
    };

    return api;
});