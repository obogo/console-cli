module.component('aboutPage', {
    templateUrl: 'about.page',
    controller: function (Toast, $stateParams) {
        Toast.remove('message');
    }
});