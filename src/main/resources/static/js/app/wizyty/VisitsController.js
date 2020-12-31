angular.module('app')
    .controller('VisitsController', function($rootScope, VisitService, Users, Haircuts) {
            var vm = this;
            vm.haircuts = Haircuts.getAll();
            vm.visits = VisitService.getAll();

            vm.anyVisits = function(){
                if(undefined == $rootScope.loggedUser.visitList[0] && null == $rootScope.loggedUser.visitList[0])
                    return false;
                else
                    return true;
            }

            vm.cancelVisit = function(id) {
                vm.user = Users.get($rootScope.loggedUser.id);
                const found = $rootScope.loggedUser.visitList.findIndex(element => element.id == id);
                $rootScope.loggedUser.visitList.splice(found,1);
                vm.user.visitList = $rootScope.loggedUser.visitList;
                vm.user.id = $rootScope.loggedUser.id;
                Users.update(vm.user);
            }

});
