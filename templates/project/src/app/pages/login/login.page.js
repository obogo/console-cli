module.component('loginPage', {
    templateUrl: 'login.page',
    controller: function ($rootScope, $state, $stateParams, locale, Alert, ApiService) {
        var ctrl = this;

        $state.indexes = ['/landing', '/login', '/'];

        ctrl.form = {
            username: '',
            password: ''
        };
        ctrl.locale = locale;

        ctrl.login = function () {
            Alert.close();

            // TODO: Fake login, uncomment code below and remove this line
            $state.go('dashboard');

            // ApiService.login(ctrl.form, environment.authService.params).then(function (response) {
            //     $state.go('dashboard');
            // }, function () {
            //     Alert.open({
            //         dismissible: false,
            //         type: 'danger',
            //         message: 'Invalid credentials. Please try again.'
            //     });
            // });
        }
    }
});