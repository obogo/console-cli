module.factory('ApiService', function (environment) {
    var crudify = require('rest.crudify');
    var http = require('http');
    var api = {};

    var options = {
        baseUrl: environment.services.baseUrl,
        withCredentials: environment.services.withCredentials,
        useGETPOSTonly: environment.services.useGETPOSTOnly
    };

    http.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
    // http.defaults.headers["Content-Type"] = "text/plain;charset=UTF-8";

    var resources = [
        {
            methods: { // creates methods right on the ApiService object
                login: {
                    type: "POST",
                    url: environment.authService.baseUrl + "/login",
                    options: {
                        withCredentials: true
                    }
                },
                logout: {
                    type: "POST",
                    url: environment.authService.baseUrl + "/logout",
                    options: {
                        withCredentials: true
                    }
                },
                signup: {
                    type: "GET",
                    url: environment.authService.baseUrl + "/signup",
                    options: {
                        withCredentials: true
                    }
                },
                getIP: { // example of calling a remote service
                    type: "GET",
                    url: "//api.ipify.org?format=jsonp"
                }
            }
        },
        {name: "example"}, // generates (all create get update delete exists count) on this service
        {name: 'samples', 'uri': "orgs/:orgId/samples"}, // you have the ability to overwrite the url
    ];

    for (var i = 0; i < resources.length; i += 1) {
        crudify(api, resources[i], options);
    }

    return api;
});