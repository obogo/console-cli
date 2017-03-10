module.component('consoleHeader', {
    templateUrl: 'header',
    controller: function (Menu) {
        var ctrl = this;
        ctrl.menu = Menu;
    }
});