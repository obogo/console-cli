/* global angular, hive */
module.config(function ($stateProvider, $urlRouterProvider) {

    // Used to check auth, other things before going to state
    var guard = {};

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    function loadLang($q, LocaleService) {
        var deferred = $q.defer();

        LocaleService.load().then(function () {
            deferred.resolve();
        });

        return deferred.promise;
    }

    var resolveList = {
        // checkAuth: checkAuth,
        loadLang: loadLang
    };

    // DO NOT REMOVE LINE BELOW
    // %route-injection%
    $stateProvider.state('dashboard', {url: '/', controller: 'DashboardCtrl', templateUrl: 'dashboard.page', resolve: resolveList});
    $stateProvider.state('about', {url: '/about', controller: 'AboutCtrl', templateUrl: 'about.page', resolve: resolveList});
    $stateProvider.state('sample', {url: '/samples/:id', controller: 'SampleCtrl', templateUrl: 'sample.page', resolve: resolveList, data:{
        transTo: {
            samples: 'anim-slide-right'
        }
    }});
    $stateProvider.state('samples', {url: '/samples', controller: 'SamplesCtrl', templateUrl: 'samples.page', resolve: resolveList, data:{
        transTo: {
            sample: 'anim-slide-left'
        }
    }});

});