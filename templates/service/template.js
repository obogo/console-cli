/* global angular */
module.factory('{Name}Service', function (ServiceFactory, {Name}) {

    var services = console.services.{name};
    return ServiceFactory.create(services, {Name});

});