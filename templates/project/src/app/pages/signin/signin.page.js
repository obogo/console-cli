module.component('signinPage', {
    templateUrl: 'signin.page',
    controller: function ($stateParams, locale) {
        var ctrl = this;
        ctrl.locale = locale;
    }
});