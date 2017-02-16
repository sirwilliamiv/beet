app.controller('logoutCtrl', function($scope,$location, authFactory) {
console.log("logout")
 //Auth
  $scope.logout = () => {
    authFactory.logout()
      .then(() => {console.log('logged out')
        // $location.url('/login')
      })
  }
});
