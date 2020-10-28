angular.module('app')
.controller('StartController', ['Pictures', function(Pictures){
    var vm = this;
    vm.pictures = Pictures.getAll();

    vm.leftPicture=0;
    vm.centerPicture=1;
    vm.rightPicture=2;

    vm.prevPicture = function(){
        if(vm.centerPicture == 1){
            vm.rightPicture = vm.centerPicture;
            vm.centerPicture = vm.leftPicture;
            vm.leftPicture = vm.pictures.length-1;
        }else{
            vm.rightPicture = vm.centerPicture;
            vm.centerPicture = vm.leftPicture;
            vm.leftPicture--;
        }
    }

    vm.nextPicture = function(){
        if(vm.centerPicture == vm.pictures.length-2){
            vm.leftPicture = vm.centerPicture;
            vm.centerPicture = vm.rightPicture;
            vm.rightPicture = 0;
        }else{
            vm.leftPicture = vm.centerPicture;
            vm.centerPicture = vm.rightPicture;
            vm.rightPicture++;
        }
    }
    
}]);