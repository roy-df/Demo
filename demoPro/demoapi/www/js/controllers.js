angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('LoginCtrl',['$scope', '$rootScope', '$http', '$state', '$stateParams', '$cordovaOauth',  function($scope, $rootScope, $http, $state, $stateParams,$cordovaOauth)  {

   $scope.facebookLogin = function() {
        $cordovaOauth.facebook("227183420967954", ["email"]).then(function(result) {
            $http.get("https://graph.facebook.com/v2.2/me", {
                params: {
                    access_token: result.access_token,
                    fields: "name,gender,location,picture.type(large),email,first_name,last_name,verified",
                    format: "json"
                }
            }).then(function(userdata) {
                $http.post(baseURL + 'FacebookLogin', userdata.data).success(function(res, req) {
                    if (res.status == 1) {
                        var user = res.record;
                        userdata = {
                            user_login: true,
                            user_id: user._id,
                            user_email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            profileimage : user.profile_image
                        }
                        store.set('userdata', userdata);
                        $rootScope.islogin = store.get('userdata');
                        $state.go('app.browse');
                    } else {
                    $scope.errMsgLogin = res.message;
                    }
                }).error(function(err) {
                    console.log('Internet Connection Is Not Available.');
                })
            }, function(error) {
                alert("Error: " + error);
            });
        }, function(error) {
            console.log(error);
        });
    }

}]);
