angular.module('app')
    .controller('OrdersController', function($rootScope, $location, Orders, Users) {
        var vm = this;
        vm.orders = Orders.getAll();
        vm.orderStatus = ['WAITING','PREPARATION','SEND'];

        vm.anyOrders = function () {
            if (undefined == vm.orders[0] && null == vm.orders[0])
                return false;
            else
                return true;
        }

        vm.realizeOrder = async function( order ){
            await Orders.get(order.id).$promise.then(async order => {
                order.status = 'COMPLETED';
                order.endDate = await new Date().toJSON().slice(0,16).replace(/-/g,'/');
                await Orders.update(order);
            }).catch(err => console.log(err))
            vm.orders = await Orders.getAll();
        }

         vm.refresh = async function( orders){
            await Orders.get(orders.id).$promise.then(async order => {
                console.log(orders);
                console.log(order);
                order.status = orders.status;
                await Orders.update(order);
            }).catch(err => console.log(err))
            vm.orders = await Orders.getAll();
        }

        vm.showManageOrderInfo = function ( order, userId ){
            Orders.get(order.id).$promise.then(async order => $rootScope.orderInfo = await order);
            Users.get(userId).$promise.then(async user => $rootScope.userOrderInfo = await user);
            $location.path('/zamowienia/szczegoly');
        }
    });
