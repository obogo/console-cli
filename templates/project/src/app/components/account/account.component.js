/* global angular, module, environment */
module.component('consoleAccount', {
    templateUrl: 'account',
    controller: function ($state, sso, ApiService) {
        var supplant = require('supplant');

        var ctrl = this;
        ctrl.user = sso.user;

        ctrl.logout = function() {
            ApiService.logout().then(function () {
                if(environment.authService.useRedirect) {
                    location.href = environment.authService.redirect.url + '?redirect=' + encodeURIComponent(location.href);
                } else {
                    $state.go('landing');
                }
            });
        };
    }
});