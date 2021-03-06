app.controller('loginController',function($scope,$http) {

    $scope.loginAjax = function(){
        console.log($scope.f);
        $http({method: 'POST', url: base+'/request-token', data: $scope.f })
            .then(function successCallback(data, status, headers, config) {

                localStorage.setItem('user',JSON.stringify(data.data.user));
                $scope.redirectTo();
            },
            function errorCallback(data, status, headers, config) {
                $('#error-modal').openModal();
                console.log(data);
            });
    }

    $scope.redirectTo = function(){
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user')!==null) {
            window.location.href = "#/messages";
        }
    }

    // $scope.redirectTo();

});
