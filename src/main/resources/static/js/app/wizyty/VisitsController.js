angular.module('app')
    .controller('VisitsController', function($rootScope, $location, Visits, Users, Haircuts) {
            var vm = this;
            vm.haircuts = Haircuts.getAll();
            vm.visits = Visits.getAll();

            vm.anyVisits = function(){
                if(undefined == vm.visits[0] && null == vm.visits[0])
                    return false;
                else
                    return true;
            }

            vm.checkUserVisit = function(id){
                return this.userId === id;
            }

            vm.deleteVisit = async function(visit) {
                await Users.get(visit.userId).$promise.then(async user => {
                    const found = user.visitList.findIndex(element => element.id == visit.id);
                    user.visitList.splice(found,1);
                    Users.update(user);
                    return Visits.get(visit.id).$promise;
                }).then(async visit => {
                    await Visits.delete(visit);
                }).catch( err => console.log(err))
                vm.visits = await Visits.getAll();
            }

            vm.addVisit = async function (visit) {
                await Visits.get(visit.id).$promise.then( async visit => {
                    visit.status = 'ACCEPTED';
                    await Visits.update(visit);
                }).catch( err => console.log(err))
                vm.visits = await Visits.getAll();
            }

            vm.showVisitInfo = function (visit) {
                Visits.get(visit.id).$promise.then(async visit => $rootScope.visitInfo = await visit);
                Users.get(visit.userId).$promise.then(async user => $rootScope.userVisitInfo = await user);
                $location.path('/wizyty/szczegoly');
            }

});
