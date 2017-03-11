module.component('landingPage', {
    templateUrl: 'landing.page',
    controller: function ($stateParams, locale) {
        var ctrl = this;
        ctrl.locale = locale;
    }
});