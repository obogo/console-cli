module.component('landingPage', {
    templateUrl: 'landing.page',
    controller: function ($state, $stateParams, locale) {

        $state.indexes = ['/landing', '/login'];

        var ctrl = this;
        ctrl.locale = locale;
    }
});