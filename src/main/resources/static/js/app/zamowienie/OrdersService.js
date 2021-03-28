angular.module('app')
    .constant('ORDER_ENDPOINT','/api/orders/:id')
    .factory('Orders', function ($resource, ORDER_ENDPOINT) {
        return $resource(ORDER_ENDPOINT, { id: '@_id' }, {
            update: {
                method: 'PUT'
            }});
    })
    .service('Orders', function ($http, Order) {
        this.getAll = params => Order.query(params);
        this.get = index => Order.get({id: index});
        this.update = order => order.$update({id: order.id});
    });
