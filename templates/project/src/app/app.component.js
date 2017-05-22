/* global angular, module */
module.component('consoleApp', {
    templateUrl: 'app',
    controllerAs: 'app',
    controller: function (Menu, Toast, ApiService, $state) {
        this.menu = Menu;

        Toast.show('This is a message', {
            id: 'message',
            icon: "message",
            actionLabel: 'Action',
            onAction: function () {
                $state.go('about');
            },
            showClose: true,
            hideDelay: 0
        });
    }
});