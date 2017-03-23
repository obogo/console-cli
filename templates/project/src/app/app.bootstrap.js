/* global angular */
var module = angular.module('app', [
    'consoleTemplates',
    'ngAnimate',
    'ui.router',
    'localytics.directives',
    'ngLetterAvatar',
    'headroom'
]);

module.run(function ($trace) {
    // to see the transition statements in ui-router
    // $trace.enable('TRANSITION');
});

angular.element(function (el) {

    if(environment.isNative) {
        document.body.setAttribute('is-native', true);
    }

    // TODO: Use this to check authentication before bootstrapping Angular
    var http = require('http');
    http.get({
        url: environment.authService.baseUrl + '/check',
        credentials: true,
        success: function(response) {
            environment.sso = response.data;
            require('localeService').config(environment.locale)
                .load().then(function () {
                angular.bootstrap(document, ['app']);
            });
        },
        error: function() {
            require('localeService').config(environment.locale)
                .load().then(function () {
                angular.bootstrap(document, ['app']);
            });
        }
    });
});
