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
        vm.mondayToFridayHours = ['09','10','11','12','13','14','15','16'];
        vm.saturdayHours = ['09','10','11','12','13'];
        vm.openTimeByDate = [];
        vm.minutes = ['00','10','20','30','40','50'];
        vm.pageMode = {MAIN: 'Main', FIND_DATE: 'FindDate', OWN_DATE: 'OwnDate'};
        vm.activePage = vm.pageMode.MAIN;
        vm.dateSummary = false;
        vm.incorrectData = false;
        vm.actualSearchDate = new Date();

        vm.changeOpenHours = function () {  // zwraca tablice godzin otwarcia salonu względem dnia tygodnia

        };

        vm.changeToFindDate = () => vm.activePage =  vm.pageMode.FIND_DATE;

        vm.changeToOwnDate = () => vm.activePage = vm.pageMode.OWN_DATE;

        vm.changeToMain = () => {
            vm.activePage = vm.pageMode.MAIN;
            vm.visit = new Visit();
        }

        vm.searchNextDate = function () {   // wywoluje funkcje findDate(), szuka kolejnej dostepnej wizyty
            vm.actualSearchDate.setDate(vm.actualSearchDate.getDate()+1);
        }

        vm.findDate = async function (visit,date) {    // wywoluje funkcje checkDateAvailability(), szuka pierwszej dostepnej wizyty, ustawia zmienna findDateSummary gdy znajdzie wizyte
            if(visit.haircutType == undefined || visit.phoneString == undefined){
                vm.incorrectData = true;
                return;
            }
                vm.incorrectData = false;
                while(1) {

                    for (var hour of vm.openTimeByDate)
                        for (var minute of vm.minutes)
                            ;

                }

                await vm.checkDateAvailability(visit);
                await console.log(vm.dateSummary);
                await console.log(vm.actualSearchDate.toJSON().slice(0,16).replace(/-/g,'/'));
                await vm.searchNextDate();
                await console.log(vm.actualSearchDate.toJSON().slice(0,16).replace(/-/g,'/'));
        }

        vm.findOwnDate = async function (visit) {
            if(visit.haircutType == undefined || visit.phoneString == undefined || visit.minute == undefined || visit.hour == undefined || visit.date == undefined){
                vm.incorrectData = true;
                return;
            }
             vm.incorrectData = false;
             await vm.setVisitBeginAndVisitEnd(visit,visit.date);
             await vm.checkDateAvailability(visit);
             if(vm.dateSummary) {
                 visit.$save();
             }

        }

        // sprawdza czy znaleziona wizyta nie koliduje z innymi wizytami
        vm.checkDateAvailability = async function (visit) {
            if(visit.visitBegin.substring(11,16) < '09:00' || visit.visitEnd.substring(11,16) > (vm.openTimeByDate[vm.openTimeByDate.length-1]+':50')) { //  sprawdzy czy koniec i poczatek wizyty nie wykracza poza godzinę otwarcia i zamkniecia.
                vm.dateSummary = false;
                return;
            }
            var anyValue = vm.searchByDate(visit.visitBegin.substring(0,10));
            await vm.searchByDate(visit.visitBegin.substring(0,10)).$promise.then( async visits => {
                for await(var element of visits)
                    if(!((visit.visitEnd <= element.visitBegin && visit.visitBegin < element.visitBegin) || (visit.visitEnd > element.visitEnd && visit.visitBegin >= element.visitEnd))) {
                        vm.dateSummary = false;
                        break;
                    }else
                        vm.dateSummary = true;
            })
            if(anyValue === 0) // gdy nie ma wizyt w tym dniu, a wizyta mieści się między godzinami gdy salon jest otwarty, dodajemy ją
                vm.dateSummary = true;
        }

        vm.acceptDate = function () {   // gdy data jest poprawna wysyła ją do akceptacj

        }

        // ustawia prawidlowa datę wizyty, później według niej liczy początek wizyty, oraz koniec dodając czas usługi
        vm.setVisitBeginAndVisitEnd = async function(visit, date){
            await date.setHours(visit.hour);
            await date.setHours(date.getHours()+1);   // dodaje 1 ponieważ mamy czas zimowy
            await date.setMinutes(visit.minute);
            visit.visitBegin = await date.toJSON().slice(0,16).replace(/-/g,'/');
            var hour = await visit.haircutType/60;
            var minute = await visit.haircutType%60;
            await date.setHours(date.getHours()+hour);
            await date.setMinutes(date.getMinutes()+minute);
            visit.visitEnd = await date.toJSON().slice(0,16).replace(/-/g,'/');
        }

        // sprawdza dzień w którym rezerwowana jest wizyta i wybiera tablice w ktorych rezerwowane mogą być wizyty. ustawia zmienna openTimeByDate
        vm.setOpenTimeByDate = function (data) {
            if(data === undefined)
                return;
            else if(data.getDay() === 0)   // czy niedziela
                vm.openTimeByDate = [];
            else if(data.getDay() === 6)   // czy sobota
                vm.openTimeByDate = vm.saturdayHours;
            else
                vm.openTimeByDate = vm.mondayToFridayHours; // inny dzień
        }

        // zwraca wszystkie wizyty, których data jest równa zmiennej 'date'
        vm.searchByDate = date => {
            return Visits.getAll({date});
        }

    });
