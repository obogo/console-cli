/* global angular */
var module = angular.module('app', [
    'consoleTemplates',
    'ngAnimate',
    'ui.router',
    'anim-in-out',
    'localytics.directives',
    'ngLetterAvatar'
]);

module.run(function ($trace) {
    // to see the transition statements in ui-router
    // $trace.enable('TRANSITION');
});

angular.element(function (el) {

    if(appConfig.isNative) {
        document.body.setAttribute('is-native', true);
    }

    var http = require('http');
    http.get({
        url: appConfig.hive.baseUrl + '/sso?provider=' + appConfig.hive.provider + '&product=' + appConfig.hive.product,
        credentials: true,
        success: function(response) {
            appConfig.sso = response.data;
            require('localeService').config(appConfig.locale)
                .load().then(function () {
                angular.bootstrap(document, ['app']);
            });
        },
        error: function() {
            require('localeService').config(appConfig.locale)
                .load().then(function () {
                angular.bootstrap(document, ['app']);
            });
        }
    });
});
