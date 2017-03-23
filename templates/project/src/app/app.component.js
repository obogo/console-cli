/* global angular, module */
module.component('consoleApp', {
    templateUrl: 'app',
    controllerAs: 'app',
    controller: function (Menu) {
        this.menu = Menu;

    }
});