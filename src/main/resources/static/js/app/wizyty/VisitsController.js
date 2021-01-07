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
        vm.dateSummary = 0;
        vm.incorrectData = false;
        vm.actualSearchDate = new Date();

        vm.changeOpenHours = function () {  // zwraca tablice godzin otwarcia salonu względem dnia tygodnia

        };

        vm.changeToFindDate = () => vm.activePage =  vm.pageMode.FIND_DATE;

        vm.changeToOwnDate = () => vm.activePage = vm.pageMode.OWN_DATE;

        vm.changeToMain = () => {
            vm.activePage = vm.pageMode.MAIN;
            vm.dateSummary = 0;
            vm.visit = new Visit();
        }

        vm.searchNextDate = function () {   // wywoluje funkcje findDate(), szuka kolejnej dostepnej wizyty
            vm.actualSearchDate.setDate(vm.actualSearchDate.getDate()+1);
        }

        vm.findDate = async function (visit) {    // wywoluje funkcje checkDateAvailability(), szuka pierwszej dostepnej wizyty, ustawia zmienna findDateSummary gdy znajdzie wizyte
            if(visit.haircut == undefined || visit.phoneString == undefined){
                vm.incorrectData = true;
                return;
            }
            vm.incorrectData = false;

            while(1) {
                await vm.setOpenTimeByDate(vm.actualSearchDate);
                for (var hour of vm.openTimeByDate)
                    for (var minute of vm.minutes){
                        visit.hour = hour;
                        visit.minute = minute;
                        await vm.setVisitBeginAndVisitEnd(visit);
                        if(visit.visitEnd.substring(11,16) > vm.openTimeByDate[vm.openTimeByDate.length-1]+':50')
                            break;
                        vm.checkDateAvailability(visit);
                        if(vm.dateSummary === 1)

                        console.log('sprawdzana data:  '+vm.actualSearchDate.toJSON().slice(0,10).replace(/-/g,'/')+'  sprawdzana godzina : '+hour+':'+minute);
                     }
                vm.searchNextDate();
            }

                // await vm.checkDateAvailability(visit);
                // await console.log(vm.dateSummary);
                // await console.log(vm.actualSearchDate.toJSON().slice(0,16).replace(/-/g,'/'));
                // await console.log(vm.actualSearchDate.toJSON().slice(0,16).replace(/-/g,'/'));
        }

        vm.findOwnDate = async function (visit) {
            if(visit.haircut == undefined || visit.phoneString == undefined || visit.date == undefined || visit.hour == undefined || visit.minute == undefined){
                vm.incorrectData = true;
                return;
            }
            vm.incorrectData = false;

             await vm.setEmptyValueInVisit(visit);
             console.log('ustawiam inne wartosci visit: '+visit);
             await vm.setVisitBeginAndVisitEnd(visit,visit.date);
              console.log('ustawiam visitbegin i end: '+visit);
             await vm.checkDateAvailability(visit);
             console.log('vm.dataSummary: '+vm.dateSummary);
              console.log('sprawdzilem czy moge zarezerwowac');
        }

        vm.saveVisit = async function ( visit ){
            vm.dateSummary = 0;
            await console.log('visit przed zapisaniem: '+visit);
            await vm.visit.$save();
            vm.visit = await new Visit();
        }

        // sprawdza czy znaleziona wizyta nie koliduje z innymi wizytami
        vm.checkDateAvailability = async function (visit) {
            if(visit.visitBegin.substring(11,16) < '09:00' || visit.visitEnd.substring(11,16) > (vm.openTimeByDate[vm.openTimeByDate.length-1]+':50')) { //  sprawdzy czy koniec i poczatek wizyty nie wykracza poza godzinę otwarcia i zamkniecia.
                vm.dateSummary = -1;
                return;
            }
            var anyValue = await vm.searchByDate(visit.visitBegin.substring(0,10));
            await vm.searchByDate(visit.visitBegin.substring(0,10)).$promise.then( async visits => {
                for await(var element of visits)
                    if(!((visit.visitEnd <= element.visitBegin && visit.visitBegin < element.visitBegin) || (visit.visitEnd > element.visitEnd && visit.visitBegin >= element.visitEnd))) {
                        vm.dateSummary = -1;
                        break;
                    }else
                        vm.dateSummary = 1;
            })
            console.log('ilosc wizyt: '+anyValue.length);
            if(anyValue.length === 0) // gdy nie ma wizyt w tym dniu, a wizyta mieści się między godzinami gdy salon jest otwarty, dodajemy ją
                vm.dateSummary = 1;
            await console.log('vm.dateSummary: '+vm.dateSummary);
        }

        //Ustawia resztę zmiennych, przed zapisaniem do bazy danych
        vm.setEmptyValueInVisit = function( visit ) {
            visit.haircutType = vm.haircuts[parseInt(visit.haircut)];
            if(visit.userInfo == null) visit.userInfo = '';
            visit.adminInfo = '';
            visit.phone = parseInt(visit.phoneString);
            visit.status = 'WAITING';
            visit.userId = $rootScope.loggedUser.id;
            console.log('visit po ustawieniu zmiennych:'+visit);
        }

        // ustawia prawidlowa datę wizyty, później według niej liczy początek wizyty, oraz koniec dodając czas usługi
        vm.setVisitBeginAndVisitEnd = async function(visit, date){
            await date.setHours(visit.hour);
            await date.setHours(date.getHours()+1);   // dodaje 1 ponieważ mamy czas zimowy
            await date.setMinutes(visit.minute);
            visit.visitBegin = await date.toJSON().slice(0,16).replace(/-/g,'/');
            console.log('visit.haircutType.duration:'+visit.haircutType.duration);
            var hour = await visit.haircutType.duration/60;
            console.log('hour:'+hour);
            var minute = await visit.haircutType.duration%60;
            console.log('minute:'+minute);
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
