module.controller('DashboardCtrl', function ($scope, Dialog, Menu) {

    $scope.menu = Menu;

    $scope.openDialog = function() {
        Dialog.open({
            title: "Sample",
            footer: {
                cancelLabel: 'Cancel',
                okLabel: 'Save'
            },
            component: "console-sample-dialog",
            locals: {
                time: new Date()
            },
            close: function(save) {
                if(save) {
                    // save
                } else {
                    // cancel
                }
            }
        });
    }
});