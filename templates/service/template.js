/* global angular */
module.factory('{Name}Service', function (ServiceFactory, {Name}) {

    var services = {serviceName}.services.players;
    return ServiceFactory.create(services, {Name});

});