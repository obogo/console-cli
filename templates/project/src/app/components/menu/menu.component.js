module.component('consoleMenu', {
    templateUrl: 'menu',
    controller: function (Menu) {
        var ctrl = this;
        ctrl.menu = Menu;
    }
});