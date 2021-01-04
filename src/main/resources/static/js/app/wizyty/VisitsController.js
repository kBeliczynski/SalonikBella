angular.module('app')
    .controller('VisitsController', function($rootScope, $location, Visits, Users, Haircuts) {
        var vm = this;
        vm.visits = Visits.getAll();

        vm.anyVisits = function () {
            if (undefined == vm.visits[0] && null == vm.visits[0])
                return false;
            else
                return true;
        }

        vm.checkUserVisit = function (id) {
            return this.userId === id;
        }

        vm.deleteVisit = async function (visit) {
            await Users.get(visit.userId).$promise.then(async user => {
                const found = user.visitList.findIndex(element => element.id == visit.id);
                user.visitList.splice(found, 1);
                Users.update(user);
                return Visits.get(visit.id).$promise;
            }).then(async visit => {
                await Visits.delete(visit);
            }).catch(err => console.log(err))
            vm.visits = await Visits.getAll();
        }

        vm.addVisit = async function (visit) {
            await Visits.get(visit.id).$promise.then(async visit => {
                visit.status = 'ACCEPTED';
                await Visits.update(visit);
            }).catch(err => console.log(err))
            vm.visits = await Visits.getAll();
        }

        vm.showVisitInfo = function (visit) {
            Visits.get(visit.id).$promise.then(async visit => $rootScope.visitInfo = await visit);
            Users.get(visit.userId).$promise.then(async user => $rootScope.userVisitInfo = await user);
            $location.path('/wizyty/szczegoly');
        }

        vm.showManageVisitInfo = function (visit) {
            Visits.get(visit.id).$promise.then(async visit => $rootScope.visitInfo = await visit);
            Users.get(visit.userId).$promise.then(async user => $rootScope.userVisitInfo = await user);
            $location.path('/wizyty/szczegoly-zarzadzaj');
        }

        vm.addReply = async function (visit) {
            await Visits.get(visit.id).$promise.then(async visit => {
                if (vm.checkLengthMessage(visit))
                    return true;
                visit.adminInfo += vm.message;
                await Visits.update(visit);
            }).catch(err => console.log(err));
            vm.message = '';
            vm.visits = await Visits.getAll();
        }

        vm.checkLengthMessage = function (visit) {
            if ((visit.adminInfo + vm.message).length > 255)
                return vm.toLongMessage = true;
            else
                return vm.toLongMessage = false;
        }

    })
    .controller('AddVisitsController', function($rootScope, $location, $resource, Visits, Users, Haircuts) {
        var vm = this;
        var Visit = $resource('api/visits');
        vm.visit = new Visit();
        vm.haircuts = Haircuts.getAll();
        vm.mondayToFridayHours = [9,10,11,12,13,14,15,16];
        vm.saturdayHours = [9,10,11,12,13];
        vm.minutes = [0,10,20,30,40,50];
        vm.pageMode = {MAIN: 'Main', FIND_DATE: 'FindDate', OWN_DATE: 'OwnDate'};
        vm.activePage = vm.pageMode.MAIN;
        vm.findDateSummary = false;
        vm.ownDateSummary = false;

        vm.changeOpenHours = function () {  // zwraca tablice godzin otwarcia salonu względem dnia tygodnia

        };

        vm.changeToFindDate = () => vm.activePage =  vm.pageMode.FIND_DATE;

        vm.changeToOwnDate = () => vm.activePage = vm.pageMode.OWN_DATE;

        vm.changeToMain = () => vm.activePage = vm.pageMode.MAIN;

        vm.searchNextDate = function () {   // wywoluje funkcje findDate(), szuka kolejnej dostepnej wizyty

        }

        vm.findDate = function () {    // wywoluje funkcje checkDateAvailability(), szuka pierwszej dostepnej wizyty, ustawia zmienna findDateSummary gdy znajdzie wizyte
            // przypisuje znaleziona date do zmiennych dateBegin itd.
            console.log(vm.visit);
        }

        vm.checkDateAvailability = function () {    // sprawdza czy znaleziona wizyta nie koliduje z innymi wizytami, ustawia zmienna ownDateSummary gdy data nie koliduje
            console.log(vm.visit);
        }

        vm.acceptDate = function () {   // gdy data jest poprawna wysyła ją do akceptacj

        }


    });
