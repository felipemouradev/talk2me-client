app.controller('singupController',function($scope,$http) {
    $('#nvapp').remove();
    $scope.singupAjax = function(){
          console.log($scope.f);
          $http({method: 'POST', headers : {"Content-Type": "application/json"}, url: base+'/singup/', data: $scope.f   })
                .then(function successCallback(data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    alert('Salvo com sucesso!');
                    // $('#success-modal').openModal();
                     $scope.f = "";
                     window.location.href = "#/login";
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                });
    }
});
