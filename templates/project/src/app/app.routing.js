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
    $stateProvider.state('landing', {
        url: '/landing',
        component: 'landingPage',
        data: {
            transTo: {
                login: 'anim-slide-left',
                signup: 'anim-slide-left'
            },
            hideHeader: true,
            hideMenu: true
        }
    });
    $stateProvider.state('login', {
        url: '/login', component: 'loginPage', data: {
            transTo: {
                landing: 'anim-slide-right',
                dashboard: 'anim-slide-left'
            },
            hideHeader: true,
            hideMenu: true
        }
    });
    $stateProvider.state('dashboard', {url: '/', component: 'dashboardPage', resolve: guards});
    $stateProvider.state('about', {url: '/about', component: "aboutPage", resolve: guards});
    $stateProvider.state('samples', {url: '/samples', component: 'samplesPage', resolve: guards});
    $stateProvider.state('sample', {url: '/samples/:id', component: 'samplePage', resolve: guards});
});