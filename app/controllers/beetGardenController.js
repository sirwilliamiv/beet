app.controller('beetGardenCtrl', function($scope,$location, beets, $http, authFactory, beetFactory) {

  $scope.userBeets = beets


  $scope.delete = (pattern) => {
    const id = pattern.beetID[0]

    beetFactory.delete(id)
      .then((res) => {
        console.log("hey", id)
        delete $scope.userBeets[id]

      })

  }
  $scope.playThisBeet = (pattern) => {
    const beetid = pattern.beetID[0]

   $location.url(`/main/${beetid}`)
  }

  // $scope.loading = () => {
  //  $scope.userBeets = beetFactory.load()
  // }

});
