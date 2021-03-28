angular.module('app')
    .controller('OrdersController', function($rootScope, $location, Orders) {
        var vm = this;
        vm.orders = Orders.getAll();

        vm.anyOrders = function () {
            if (undefined == vm.orders[0] && null == vm.orders[0])
                return false;
            else
                return true;
        }

        vm.realizeOrder = function( order ){

        }

    });
