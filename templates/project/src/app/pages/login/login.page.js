module.component('loginPage', {
    templateUrl: 'login.page',
    controller: function ($rootScope, $state, $stateParams, locale, Alert, ApiService, AppConfig) {
        var ctrl = this;

        $state.indexes = ['landing', 'login'];

        ctrl.form = {
            username: '',
            password: ''
        };
        ctrl.locale = locale;

        ctrl.login = function () {
            Alert.close();

            ApiService.login(ctrl.form, {
                product: AppConfig.hive.product,
                provider: AppConfig.hive.provider,
                redirect: location.href
            }).then(function (response) {
                $state.go('dashboard');
            }, function () {
                Alert.open({
                    dismissible: false,
                    type: 'danger',
                    message: 'Invalid credentials. Please try again.'
                });
            });
        }
    }
});