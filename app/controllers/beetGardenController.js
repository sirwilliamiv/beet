app.controller('beetGardenCtrl', function($scope,authFactory, beetFactory) {
console.log("beetgarden")

  $scope.loadPattern = function(uid) {
    beetFactory.load(uid)
    .then((userBeets) => {
        debugger
         return $scope.userBeets = userBeets //  = allSavedBeets.data
       })
      }
$scope.loadPattern('-Kct9ztod7IdYbaZSUkM')
});
