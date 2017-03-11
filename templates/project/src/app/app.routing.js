/* global angular, hive */
module.config(function ($stateProvider, $urlRouterProvider) {

    var supplant = require('supplant');

    // Used to check auth, other things before going to state
    var guard = {
        auth: function ($q, $state, AppConfig) {
            var deferred = $q.defer();
            if (AppConfig.sso.accessToken) {
                deferred.resolve();
            } else {
                deferred.reject();
                if(AppConfig.isPhoneGap) {
                    $state.go('landing');
                } else {
                    location.href = AppConfig.hive.redirectUrl.supplant({
                        provider: AppConfig.hive.provider,
                        product: AppConfig.hive.product
                    });
                }
            }
            return deferred.promise;
        }
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
    $stateProvider.state('dashboard', {url: '/', component: 'dashboardPage', resolve: guard});
    $stateProvider.state('about', {url: '/about', component: "aboutPage", resolve: guard});
    $stateProvider.state('samples', {
        url: '/samples', component: 'samplesPage', resolve: guard,
        data: {
            transTo: {
                sample: 'anim-slide-left'
            }
        }
    });
    $stateProvider.state('sample', {
        url: '/samples/:id', component: 'samplePage', resolve: guard,
        data: {
            transTo: {
                samples: 'anim-slide-right'
            }
        }
    });
});