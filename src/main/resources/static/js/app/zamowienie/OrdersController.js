angular.module('app')
    .controller('OrdersController', function($rootScope, $resource, $location, Orders, Users) {
        var vm = this;
        vm.orders = Orders.getAll();
        var Order = $resource('api/orders');
        vm.order = new Order();
        vm.orderStatus = ['WAITING','PREPARATION','SEND'];
        vm.incorrectData = false;
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
                await Orders.update(order);
            }).catch(err => console.log(err))
            vm.orders = await Orders.getAll();
        }

        vm.showManageOrderInfo = function ( order, userId ){
            Orders.get(order.id).$promise.then(async order => $rootScope.orderInfo = await order);
            Users.get(userId).$promise.then(async user => $rootScope.userOrderInfo = await user);
            $location.path('/zamowienia/szczegoly');
        }

        vm.submitOrder = async function ( order, user ) {
            if( order.phoneNumber == undefined || order.city == undefined || order.zipCode == undefined || order.street == undefined || order.deliveryDetails == undefined || order.shippingDetails == undefined ){
                vm.incorrectData = true;
                return;
            }
            vm.incorrectData= false;
            order.price = vm.checkSummary( user );
            order.orderDate = await new Date().toJSON().slice(0,16).replace(/-/g,'/');
            order.endDate = order.orderProduct = '';
            order.status = vm.orderStatus[0];
            vm.checkProduct( order, user);
            console.log( order );
            await order.$save( data => {
                Users.get( user.id ).$promise.then(async function(data){
                    $rootScope.loggedUser.perfumeList = $rootScope.loggedUser.produtList = user.perfumeList = user.productList = [];
                    user.orderList.push(data);
                    $rootScope.loggedUser.orderList = user.orderList;
                    await Users.update(user);
                    console.log(user);
                }).catch(err => { console.log(err)});
                console.log(order);
            });
            await $location.path('/koszyk');
        }


        vm.checkSummary = function( user ) {
            var sum = 0;
            user.productList.forEach( (element) => {
                sum += element.amount*element.price;
            })
            user.perfumeList.forEach( (element) => {
                sum += element.amount*element.price;
            })
            return sum;
        }

        vm.checkProduct = function ( order, user ) {
            order.orderList = '';
            user.productList.forEach( (element) => {
                order.orderProducts += element.name+',';
            })
            user.perfumeList.forEach( (element) => {
                order.orderProducts += element.name+',';
            })
        }
    });
