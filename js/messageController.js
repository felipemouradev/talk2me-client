
app.controller('messageController',function($scope,$http,$timeout) {

    $scope.getNewToken = function(user) {

        if (user !== null && user !== undefined) {
          $http({
              method: 'POST',
              url: base+'/get-new-token',
              headers: { 'Authorization': user.token },
          })
            .then(function successCallback(data, status, headers, config) {
                localStorage.setItem('user',JSON.stringify(data.data.user));
            },
            function errorCallback(data, status, headers, config) {
                alert('Token Quebrado :) ');
                window.location.href = "#/login";
            });
        }

    }

    $scope.listenMessages = function() {

         user = JSON.parse(localStorage.getItem('user'));

         $scope.getNewToken(user);

         if(user !== undefined && user !== null) {

             setInterval(function () {


                 user = JSON.parse(localStorage.getItem('user'));
                 console.log(user);
                 $http({
                    method: 'GET',
                    headers: { 'Authorization': user.token },
                    url: base+'/messages/?group=teste'
                 })
                   .then(function successCallback(data, status, headers, config) {
                       console.log(data);
                       if(data.data !== undefined || data.data !== null){
                           $scope.data_messages = data.data.response.data.reverse();

                           $scope.info = data.data.response;
                           console.log($scope.data_messages);

                       }
                   },
                   function errorCallback(data, status, headers, config) {
                       console.log(status);
                   });
                   $scope.goToTheLastMessage();
            }, 3000);

         }
     }

    $scope.listenMessages(); //lista mensagens de 2.5s

    $scope.newMessage = function(){
          user = JSON.parse(localStorage.getItem('user'));
          $scope.getNewToken(user);
          user = JSON.parse(localStorage.getItem('user'));
          $http({
              method: "POST",
              headers : {"Content-Type": "application/json"},
              url: base+"/messages/",
              headers: { 'Authorization': user.token },
              data: {
                  user_id: user.id,
                  group_id:"1",
                  message: $scope.message
              }
          })
            .then(function successCallback(data, status, headers, config) {
                $scope.message = "";
                console.log(data);
            },
            function errorCallback(data, status, headers, config) {

                console.log(data);
            });
    }

    $scope.kickUser = function (){

        setInterval(function (){
            console.log("tenta sair");
            user = localStorage.getItem('user');
            if ( user === null || user === undefined ){
                window.location.href = "#/login";
            }
        },5000);

    }

    $scope.goToTheLastMessage = function(){
          console.log("FOI EXECUTADO");
          $('.scroll').scroll(".last");
    }



    $scope.kickUser();

    $scope.goToTheLastMessage();

    $scope.logout = function () {
        console.log('Tenta apagar');
        localStorage.setItem('user',null);
        window.location.href = "#/login";
    }


});
