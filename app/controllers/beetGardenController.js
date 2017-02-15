app.controller('beetGardenCtrl', function($scope,$location, beets, $http, authFactory, beetFactory) {
  console.log("beetgarden")
  console.log('beets', beets)
  $scope.userBeets = beets


  $scope.delete = (id) => {
    beetFactory.delete(id)
      .then((res) => {
        console.log("what is this", res)
      })

  }
  $scope.playThisBeet = (beetid) => {
   $location.url(`/main/${beetid}`)
  }

  // $scope.loading = () => {
  //  $scope.userBeets = beetFactory.load()
  // }

});
