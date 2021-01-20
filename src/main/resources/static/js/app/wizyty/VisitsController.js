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
        vm.mondayToFridayHours = ['09','10','11','12','13','14','15','16','17'];
        vm.saturdayHours = ['09','10','11','12','13','14'];
        vm.openTimeByDate = [];
        vm.minutes = ['00','10','20','30','40','50'];
        vm.pageMode = {MAIN: 'Main', FIND_DATE: 'FindDate', OWN_DATE: 'OwnDate'};
        vm.activePage = vm.pageMode.MAIN;
        vm.dateSummary = 0;
        vm.incorrectData = false;

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
            vm.actualSearchDate = new Date();

            while(1) {
                await vm.setOpenTimeByDate(vm.actualSearchDate);
                for await (var hour of vm.openTimeByDate)
                    for await(var minute of vm.minutes){
                        if( (vm.actualSearchDate.getDay() === new Date().getDay()) && (vm.actualSearchDate.getHours() > 17 && vm.actualSearchDate.getMinutes() > 0)) // odrzuca wizyty ktore są wcześniej niż aktualna data
                            continue;
                        visit.hour = hour;
                        visit.minute = minute;
                        await vm.setEmptyValueInVisit(visit);
                        await vm.setVisitBeginAndVisitEnd(visit, vm.actualSearchDate);
                        if(visit.visitEnd.substring(11,16) > vm.openTimeByDate[vm.openTimeByDate.length-1]+':00')
                            break;
                        vm.dateSummary = 1;
                        await vm.checkDateAvailability(visit);
                        if(vm.dateSummary === 1)
                            return;
                     }
                await vm.searchNextDate();
            }
        }

        vm.findOwnDate = async function (visit) {
            if(visit.haircut == undefined || visit.phoneString == undefined || visit.date == undefined || visit.hour == undefined || visit.minute == undefined){
                vm.incorrectData = true;
                return;
            }
            vm.incorrectData = false;

             await vm.setEmptyValueInVisit(visit);
             await vm.setVisitBeginAndVisitEnd(visit,visit.date);
             vm.dateSummary = 1;
             await vm.checkDateAvailability(visit);
        }

        vm.saveVisit = async function ( visit ){
            vm.dateSummary = 0;
            await visit.$save();
            Users.get(visit.userId).$promise.then( async user => {
                await user.visitList.push(visit);
                await Users.update(user);
                console.log(user);
            }).catch( err => {console.log( err )});
            vm.visit = await new Visit();
        }

        // sprawdza czy znaleziona wizyta nie koliduje z innymi wizytami
        vm.checkDateAvailability = async function (visit) {
            if(visit.visitBegin.substring(11,16) < '09:00' || visit.visitEnd.substring(11,16) > (vm.openTimeByDate[vm.openTimeByDate.length-1]+':00')) { //  sprawdzy czy koniec i poczatek wizyty nie wykracza poza godzinę otwarcia i zamkniecia.
                vm.dateSummary = -1;
                return;
            }
            await vm.searchByDate(visit.visitBegin.substring(0,10)).$promise.then( async visits => {
                for await(var element of visits)
                    if(!((visit.visitEnd <= element.visitBegin && visit.visitBegin < element.visitBegin) || (visit.visitEnd > element.visitEnd && visit.visitBegin >= element.visitEnd))) {
                        vm.dateSummary = -1;
                        break;
                    }
            })
        }

        //Ustawia resztę zmiennych, przed zapisaniem do bazy danych
        vm.setEmptyValueInVisit = function( visit ) {
            visit.haircutType = vm.haircuts[parseInt(visit.haircut)-1];
            if(visit.userInfo == null) visit.userInfo = '';
            visit.adminInfo = '';
            visit.phone = parseInt(visit.phoneString);
            visit.status = 'WAITING';
            visit.userId = $rootScope.loggedUser.id;
        }

        // ustawia prawidlowa datę wizyty, później według niej liczy początek wizyty, oraz koniec dodając czas usługi
        vm.setVisitBeginAndVisitEnd = async function(visit, date){
            await date.setHours(visit.hour);
            await date.setHours(date.getHours()+1);   // dodaje 1 ponieważ mamy czas zimowy
            await date.setMinutes(visit.minute);
            visit.visitBegin = await date.toJSON().slice(0,16).replace(/-/g,'/');
            var hour = await visit.haircutType.duration/60;
            var minute = await visit.haircutType.duration%60;
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

    })
 .controller('TimetableController', function($rootScope,$resource, Visits, Users) {
        var vm = this;
        vm.hours = ['09','10','11','12','13','14','15','16','17'];
        vm.actualDate = new Date();
        vm.visits = Visits.getAll();
        vm.ownDate = new Date();

        // wyswietla dzień tygodnia w kalendarzu
        vm.getDayByNumber = function () {
            let number = vm.actualDate.getDay();
            switch(number){
                case 0 : return 'Niedziela';
                case 1 : return 'Poniedziałek';
                case 2 : return 'Wtorek';
                case 3 : return 'Środa';
                case 4 : return 'Czwartek';
                case 5 : return 'Piątek';
                case 6 : return 'Sobota';
                default : return 'Undefined';
            }
        }

        // zwraca datę w formacie : RRRR/MM/DDTGG:mm
        vm.getActualShortDate = function () {
            return vm.actualDate.toJSON().slice(0,10).replace(/-/g,'/');
        }

        // liczy przesuniecie obiektu aby dopasawac ja do harmonogramu i zwraca odleglosc przesuniecia
        vm.getMoveVisit = function (visit) {
            let hours = parseInt(visit.visitBegin.substring(11,13));
            let minutes = parseInt(visit.visitBegin.substring(14,16)) + hours * 60;
            return (minutes - (9 * 60)) * 2;    // mnożę razy 2 ponieważ każda minuta w harmonogramie zajmuje 2px
        }

        vm.nextDay = function () {
            vm.actualDate.setDate(vm.actualDate.getDate()+1);
        }

        vm.prevDay = function () {
            vm.actualDate.setDate(vm.actualDate.getDate()-1);
        }

        vm.today = function () {
            vm.actualDate = new Date();
        }

        vm.setViewDay = function (ownDate){
            vm.actualDate = ownDate;
        }

    });
