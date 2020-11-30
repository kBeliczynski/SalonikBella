angular.module('app')
.controller('PerfumeListController', ['Perfumes', function (Perfumes) {
    var vm = this;
    vm.perfumes = Perfumes.getAll();

    vm.search = name => {
        vm.perfumes = Perfumes.getAll({name});
    }

    vm.searchByGender = gender => {
        vm.perfumes = Perfumes.getAll({gender});
    }

    vm.searchByVolume = volume => {
        vm.perfumes = Perfumes.getAll({volume});
    }

    vm.anyPerfumes = function(){
        return vm.perfumes[0];
    }

}])
.controller('PerfumeDetailsController', function ($resource, $rootScope, $routeParams, Perfumes ) {
    var vm = this;
    var perfumeIndex = $routeParams.id;
    vm.perfume = Perfumes.get(perfumeIndex);
    var modifyUser = $resource("api/users")

    vm.addPerfumeToBucket = function () {
        $rootScope.loggedUser.perfumeList.push(vm.perfume);
        $rootScope.loggedUser.$save((function(data) {
 			refreshData();
        }));
    }

    function refreshData() {
 		vm.products = Product.query(
 				function success(data, headers) {
 					console.log('Pobrano dane: ' +  data);
 					console.log(headers('Content-Type'));
 				},
 				function error(reponse) {
 					console.log(response.status); //np. 404
 				});
 	}

});
