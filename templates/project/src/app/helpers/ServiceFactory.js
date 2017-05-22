/* global angular, module, environment */
module.factory('ServiceFactory', function ($q, $rootScope) {

    function plainToClass(ClassRef, data) {
        if (ClassRef) {
            var instance;
            if (data instanceof Array) {
                angular.forEach(data, function (item, index) {
                    instance = Object.create(ClassRef.prototype);
                    data[index] = angular.extend(instance, item);
                });
            }
            instance = Object.create(ClassRef.prototype);
            return angular.extend(instance, data);
        }
        return data;
    }

    function $apply() {
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    }

    function ServiceFactory() {
    }

    ServiceFactory.defaultParams = {};
    ServiceFactory.create = function (services, ClassRef) {
        /**
         * Used to store project results; We will only call the service if cache is empty
         */
        var cache = {};
        var queue = {};
        var defaultParams = {};
        var timer;

        function getCache() {
            return JSON.parse(JSON.stringify(cache));
        }

        /**
         * clearItem
         * @param id "12345" or {ids: [123, 345]}
         */
        function clearItem(id) {
            var idStr = JSON.stringify(id); // for query params
            if (typeof id === 'string') {
                delete cache[id];
            }
            delete cache[idStr];
        }

        function clearCache() {
            cache = {};
        }

        function fetchAll(queryParams, cacheResults) {
            var deferred = $q.defer();
            queryParams = angular.extend({}, this.defaultParams, queryParams);

            var queryParams__ = JSON.stringify(queryParams);

            if (cache[queryParams__]) {
                deferred.resolve(cache[queryParams__]);
                $apply();
            } else {
                services.all(queryParams).then(function (response) {
                    plainToClass(ClassRef, response.data.list);
                    if (!queryParams) {
                        angular.forEach(response.data.list, function (item) {
                            cache[item.id] = item;
                        });
                    }
                    if (cacheResults) {
                        cache[queryParams__] = response.data;
                    }
                    deferred.resolve(response.data);
                    $apply();
                }, function (response) {
                    deferred.reject(response.data);
                    $apply();
                });
            }
            return deferred.promise;
        }

        function hasItem(id) {
            return !!cache[id];
        }

        function fetchItem(id) {
            var deferred = $q.defer();

            // if not cached and hasn't been queued to fetch result
            if (cache[id]) {
                deferred.resolve(cache[id]);
            }
            else if (!cache[id] && !queue[id]) {
                // queue deferred
                queue[id] = deferred;
                // reset timeout
                clearTimeout(timer);
                // set timeout
                timer = setTimeout(function () {
                    // now that we are ready to process
                    var ids = [];
                    // loop through queue and push onto ids list
                    angular.forEach(queue, function (item, id) {
                        ids.push(id);
                    });
                    // convert to string
                    var ids__ = ids.join(',');
                    // fetch all items with ids
                    fetchAll({ids: ids__}).then(function () {
                        // loop through queue and resolve query
                        angular.forEach(queue, function (deferred, id) {
                            deferred.resolve(cache[id]);
                        });
                        queue = {};
                    });
                });
            }

            return deferred.promise;
        }

        function getItem(id, queryParams) {
            var deferred = $q.defer();
            queryParams = angular.extend({}, this.defaultParams, queryParams);

            if (cache[id]) {
                deferred.resolve(cache[id]);
            } else {
                services.get(id, queryParams).then(function (response) {
                    var instance = plainToClass(ClassRef, response.data);
                    cache[id] = instance;
                    // cache[id] = angular.copy(instance);
                    deferred.resolve(instance);
                }, function (response) {
                    deferred.reject(response.data);
                });
            }

            return deferred.promise;
        }

        function createItem(data, queryParams) {
            var deferred = $q.defer();
            queryParams = angular.extend({}, this.defaultParams, queryParams);

            services.create(data, queryParams).then(function (response) {
                var instance = plainToClass(ClassRef, response.data);
                cache[response.data.id] = instance;
                deferred.resolve(instance);
            }, function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        }

        function updateItem(id, data, queryParams) {
            var deferred = $q.defer();
            queryParams = angular.extend({}, this.defaultParams, queryParams);

            services.update(id, data, queryParams).then(function (response) {
                var instance = plainToClass(ClassRef, response.data);
                cache[id] = instance;
                deferred.resolve(instance);
            }, function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        }

        function deleteItem(id, queryParams) {
            var deferred = $q.defer();
            queryParams = angular.extend({}, this.defaultParams, queryParams);

            services.delete(id, queryParams).then(function (response) {
                var instance = plainToClass(ClassRef, response.data);
                delete cache[id];
                deferred.resolve(instance);
            }, function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        }

        function count(queryParams) {
            var deferred = $q.defer();
            queryParams = angular.extend({}, this.defaultParams, queryParams);

            services.count(queryParams).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        }

        function wrap(name, successHandler, errorHandler) {
            var fn = this[name];
            this[name] = function () {
                return fn.apply(this, arguments).then(successHandler, errorHandler);
            };
        }

        return {
            get defaultParams() {
                return angular.extend({}, ServiceFactory.defaultParams, defaultParams);
            },
            set defaultParams(params) {
                params = params || {};
                for (var e in defaultParams) {
                    if (defaultParams.hasOwnProperty(e)) {
                        delete defaultParams[e];
                    }
                }
                for (var n in params) {
                    if (params.hasOwnProperty(n)) {
                        defaultParams[n] = params[n];
                    }
                }
            },
            cache: getCache,
            clearItem: clearItem,
            hasItem: hasItem,
            clear: clearCache,
            all: fetchAll,
            get: getItem,
            create: createItem,
            update: updateItem,
            delete: deleteItem,
            fetchItem: fetchItem,
            wrap: wrap,
            count: count
        };
    };
    return ServiceFactory;
});