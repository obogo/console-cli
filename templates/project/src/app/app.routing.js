/* global angular, hive */
module.config(function ($stateProvider, $urlRouterProvider) {

    // Used to check auth, other things before going to state
    var guard = {};

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    // DO NOT REMOVE LINE BELOW
    // %route-injection%
    $stateProvider.state('dashboard', {url: '/', controller: 'DashboardCtrl', templateUrl: 'dashboard.page.html'});
    $stateProvider.state('about', {url: '/about', controller: 'AboutCtrl', templateUrl: 'about.page.html'});

});