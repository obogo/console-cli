/* global angular, hive */
module.config(function ($stateProvider, $urlRouterProvider, authGuardProvider) {

    var supplant = require('supplant');

    // Used to check auth, other things before going to state
    var guards = {
        auth: authGuardProvider.$get()
    };

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    // DO NOT REMOVE LINE BELOW
    // %route-injection%
    $stateProvider.state('landing', {url: '/landing',component: 'landingPage'});
    $stateProvider.state('login', {url: '/login', component: 'loginPage'});
    $stateProvider.state('dashboard', {url: '/', component: 'dashboardPage', resolve: guards});
    $stateProvider.state('about', {url: '/about', component: "aboutPage", resolve: guards});
    $stateProvider.state('samples', {url: '/samples', component: 'samplesPage', resolve: guards});
    $stateProvider.state('sample', {url: '/samples/:id', component: 'samplePage', resolve: guards});
});