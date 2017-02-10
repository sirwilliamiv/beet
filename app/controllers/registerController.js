app.controller('registerCtrl', function($scope,$location, authFactory) {
$scope.stuff = "things"

  $scope.createUser = () => {
    let newuid;
    authFactory.createUser($scope.user_email, $scope.user_password)
      .then((response) => {
        newuid = response.uid;
        // console.log(newuid)
      })
      // .then(() => {
      //   let newUser = {"uid": newuid, "firstName": $scope.firstName, "lastName": $scope.lastName, "email": $scope.user_email};
      //   SEND AS A PATCH.addUser(newUser);
      // })
  };


console.log("register")
});
