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
    // $trace.enable('TRANSITION');
});

// module.run(function($transitions) {
//     $transitions.onStart({ }, function(trans) {
//         console.log('#started');
//     });
//     $transitions.onSuccess({ }, function(trans) {
//         console.log('#success', trans);
//     });
// });

angular.element(function () {
    require('localeService').config(appConfig.locale)
        .load().then(function () {
        angular.bootstrap(document, ['app']);
    });
});
