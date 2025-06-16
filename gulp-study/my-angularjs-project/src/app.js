var app = angular.module('myApp',[]);

app.controller('MainController', function($scope){

    $scope.message = "Hello,Angularjs!"
    $scope.page = 30
    $scope.maxValue = 50

    $scope.$watch(
        function() { return $scope.page; },
        function(newVal) {
            if( newVal === null){
                console.log('vvvvvvv',newVal)
            }
            if(newVal === undefined){
                $scope.page = 50
               
                console.log('aaaaa超过最大值了',newVal)
            }else{
                
                console.log('bbbbbb正常数字')
            }
            
         
        }
      );
});