/* global angular, hive */
module.config(function ($stateProvider, $urlRouterProvider) {

    // Used to check auth, other things before going to state
    var guard = {};

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    // DO NOT REMOVE LINE BELOW
    // %route-injection%
    $stateProvider.state('signin', {url: '/signin', component: 'signinPage', data: {
        transTo: {
            login: 'anim-slide-left',
            signup: 'anim-slide-left'
        },
        hideHeader: true,
        hideMenu: true
    }});
    $stateProvider.state('login', {url: '/login', component: 'loginPage', data: {
        transTo: {
            signin: 'anim-slide-right',
            dashboard: 'anim-slide-left'
        },
        hideHeader: true,
        hideMenu: true
    }});
    $stateProvider.state('dashboard', {url: '/', component:'dashboardPage'});
    $stateProvider.state('about', {url: '/about', component:"aboutPage"});
    $stateProvider.state('samples', {url: '/samples', component: 'samplesPage', data:{
        transTo: {
            sample: 'anim-slide-left'
        }
    }});
    $stateProvider.state('sample', {url: '/samples/:id', component: 'samplePage', data:{
        transTo: {
            samples: 'anim-slide-right'
        }
    }});
});