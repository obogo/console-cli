module.controller('DashboardCtrl', function ($scope, HiveService) {
    HiveService.login({
        email: 'roboncode@gmail.com',
        password: 'test123'
    }).then(function (response) {
        console.log('#login success', response.data);
    })
});