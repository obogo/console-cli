module.component('consoleSampleDialog', {
    templateUrl: 'sample.dialog',
    controller: function (Dialog) {
        var ctrl = this;
        var resolve = require('resolve');
        ctrl.time = resolve(Dialog).get('options.locals.time') || 'Time now found';
    }
});