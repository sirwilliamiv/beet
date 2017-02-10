app.controller('loginCtrl', function($scope,$location, authFactory) {
console.log("login")
  $scope.userLogin = () => {
    authFactory.login($scope.user_email, $scope.user_password)
      .then(() => {
        console.log("woohoo")
        $location.url('/main')
      });
  };
});
