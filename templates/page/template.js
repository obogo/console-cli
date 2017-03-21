module.component('{name}Page', {
    templateUrl: '{namesDash}.page',
    controller: function ($stateParams, locale) {
        var ctrl = this;
        ctrl.locale = locale;
    }
});