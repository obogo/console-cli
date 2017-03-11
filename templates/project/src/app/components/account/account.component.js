module.component('consoleAccount', {
    templateUrl: 'account',
    controller: function ($state, sso, ApiService, AppConfig) {
        var supplant = require('supplant');

        var ctrl = this;
        ctrl.user = sso.user;

        ctrl.logout = function() {
            ApiService.logout({}).then(function (response) {
                if(AppConfig.isNative) {
                    $state.go('landing');
                } else {
                    location.href = supplant(AppConfig.hive.redirectUrl, {
                        provider: AppConfig.hive.provider,
                        product: AppConfig.hive.product,
                        redirect: location.href
                    });
                }
            });
        };
    }
});