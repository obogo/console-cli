module.component('loginPage', {
    templateUrl: 'login.page',
    controller: function ($state, $stateParams, locale) {
        var ctrl = this;

        ctrl.form = {
            username: '',
            password: ''
        };
        ctrl.locale = locale;

        ctrl.signIn = function() {
            console.log('#whois', ctrl.form);
        }
    }
});