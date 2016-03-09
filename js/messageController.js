
app.controller('messageController',function($scope,$http,$timeout) {
    $('#nvapp').load('views/menu.html');


    user = JSON.parse(localStorage.getItem('user'));

    $scope.kickUser = function (){
        if ( localStorage.getItem('user') === null || localStorage.getItem('user') === undefined ){
            window.location.href = "#/login";
        }
    }
    $scope.renewSession = function(){
        
    }
    $scope.kickUser();

    $scope.listenMessages = function() {
         //user = JSON.parse(user);
         console.log(user.id);
         if(user !== "undefined" || user !== "null") {
             setInterval(function () {
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
                           console.log(data);
                       }
                   },
                   function errorCallback(data, status, headers, config) {
                       console.log(status);
                   });
            }, 1800);
         }
     }

    $scope.listenMessages(); //lista mensagens de 1.8s

    $scope.newMessage = function(){

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

    $scope.getNewToken = function() {
          $http({
              method: 'POST',
              url: base+'/get-new-token',
              headers: { 'Authorization': user.token },
          })
            .then(function successCallback(data, status, headers, config) {
                localStorage.setItem('user',JSON.stringify(data.data.user));
            },
            function errorCallback(data, status, headers, config) {
                alert('Aconteceu alguma coisa com seu token');
            });
    }



});
