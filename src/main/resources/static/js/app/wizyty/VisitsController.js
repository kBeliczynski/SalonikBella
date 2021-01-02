angular.module('app')
    .controller('VisitsController', function($rootScope, Visits, Users, Haircuts) {
            var vm = this;
            vm.haircuts = Haircuts.getAll();
            vm.visits = Visits.getAll();

            vm.anyVisits = function(){
                if(undefined == $rootScope.loggedUser.visitList[0] && null == $rootScope.loggedUser.visitList[0])
                    return false;
                else
                    return true;
            }

            vm.deleteVisit = function(visit) {
                Users.get(visit.userId).$promise.then(user => {
                    const found = user.visitList.findIndex(element => element.id == visit.id);
                    user.visitList.splice(found,1)
                    Users.update(user);
                })
                Visits.get(visit.id).$promise.then( visit => {
                    Visits.delete(visit);
                })
                setTimeout(() => vm.visits = Visits.getAll(),100);

            }
});
