angular.module('app')
    .controller('VisitsController', function($rootScope, VisitService, Users) {
            var vm = this;

            vm.anyVisits = function(){
            if(undefined == $rootScope.loggedUser.visitList[0] && null == $rootScope.loggedUser.visitList[0])
                return false;
            else
                return true;
            }
});
