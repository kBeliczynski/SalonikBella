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
        vm.openTimeByDate = [];
        vm.minutes = [0,10,20,30,40,50];
        vm.pageMode = {MAIN: 'Main', FIND_DATE: 'FindDate', OWN_DATE: 'OwnDate'};
        vm.activePage = vm.pageMode.MAIN;
        vm.findDateSummary = false;
        vm.ownDateSummary = false;
        vm.incorrectData = false;

        vm.changeOpenHours = function () {  // zwraca tablice godzin otwarcia salonu względem dnia tygodnia

        };

        vm.changeToFindDate = () => vm.activePage =  vm.pageMode.FIND_DATE;

        vm.changeToOwnDate = () => vm.activePage = vm.pageMode.OWN_DATE;

        vm.changeToMain = () => {
            vm.activePage = vm.pageMode.MAIN;
            vm.visit = new Visit();
        }

        vm.searchNextDate = function () {   // wywoluje funkcje findDate(), szuka kolejnej dostepnej wizyty

        }

        vm.findDate = function (visit,date) {    // wywoluje funkcje checkDateAvailability(), szuka pierwszej dostepnej wizyty, ustawia zmienna findDateSummary gdy znajdzie wizyte
            if(visit.haircutType == undefined || visit.phoneString == undefined){
                vm.incorrectData = true;
                return;
            }
                vm.incorrectData = false;
                visit.userInfo = 'zmieniono';
                // edytuje zmienna openTimeByDate, wzgledem dnia wizyty
                visit.visitBegin = '2021/01/06 15:00';
                visit.visitEnd = '2021/01/06 16:00';
                console.log(visit);
                vm.openTimeByDate = vm.mondayToFridayHours;
                vm.checkDateAvailability(visit,vm.getActualDate());
        }

        vm.checkDateAvailability = function (visit,date) {    // sprawdza czy znaleziona wizyta nie koliduje z innymi wizytami, ustawia zmienna ownDateSummary gdy data nie koliduje
            //  sprawdzy czy koniec i poczatek wizyty nie wykracza poza godzinę otwarcia i zamkniecia.
            if(visit.visitBegin.substring(11,16) < '09:00' || visit.visitEnd.substring(11,16) > (vm.openTimeByDate[vm.openTimeByDate.length-1]+':50'))
                return false;

            vm.searchByDate(visit.visitBegin.substring(0,10)).then( visits => {
                console.log(visits);    // TUTAJ BEDZIE PETLA SPRAWDZAJACA CZY WARUNEK JEST SPELNIONY
                console.log(visits[0].visitBegin);
            })
            // sprawdzamy czy poczatek wizyty oraz jej długość nie kolidują z innymi wizytami
        }

        vm.acceptDate = function () {   // gdy data jest poprawna wysyła ją do akceptacj

        }

        vm.setOpenTimeByDate = function () {  // sprawdza godziny otwarcia i ustawia zmienna openTimeByDate
            //  sprawdza dzień w którym rezerwowana jest wizyta i wybiera tablice w ktorych rezerwowane mogą być wizyty
        }

        vm.getActualDate = function () {
            var utc = new Date();
            utc.setHours(utc.getHours()+1);
            return utc.toJSON().slice(0,16).replace(/-/g,'/'); // dodaje +1 ponieważ mamy czas zimowy;
        }

        vm.searchByDate = date => {
            return Visits.getAll({date}).$promise;
     }

    });
