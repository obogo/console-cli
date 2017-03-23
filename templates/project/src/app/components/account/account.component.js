module.component('consoleAccount', {
    templateUrl: 'account',
    controller: function ($state, sso, ApiService, environment) {
        var supplant = require('supplant');

        var ctrl = this;
        ctrl.user = sso.user;

        ctrl.logout = function() {
            ApiService.logout({}).then(function (response) {
                if(environment.useRedirect) {
                    location.href = environment.authService.redirect.url;
                } else {
                    $state.go('landing');
                }
            });
        };
    }
});