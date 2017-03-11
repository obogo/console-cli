module.factory('ApiService', function (AppConfig) {
    var crudify = require('rest.crudify');
    var http = require('http');
    var api = {};

    var options = {
        baseUrl: AppConfig.services.baseUrl,
        withCredentials: AppConfig.services.withCredentials,
        useGETPOSTonly: AppConfig.services.useGETPOSTOnly
    };

    // http.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
    http.defaults.headers["Content-Type"] = "text/plain;charset=UTF-8";

    var resources = [
        {
            methods: {
                login: {
                    type: "POST",
                    url: AppConfig.hive.baseUrl + "/login",
                    options: {
                        withCredentials: true
                    }
                },
                logout: {
                    type: "POST",
                    url: AppConfig.hive.baseUrl + "/logout",
                    options: {
                        withCredentials: true
                    }
                },
                signup: {
                    type: "GET",
                    url: AppConfig.hive.baseUrl + "/signup",
                    options: {
                        withCredentials: true
                    }
                },
                getIP: {
                    type: "GET",
                    url: "//api.ipify.org?format=jsonp"
                }
            }
        },
        {name: "example"},
        {name: 'samples', 'uri': "orgs/:orgId/samples"}
    ];

    for (var i = 0; i < resources.length; i += 1) {
        crudify(api, resources[i], options);
    }

    return api;
});