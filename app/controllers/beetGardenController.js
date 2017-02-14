app.controller('beetGardenCtrl', function($scope,$http,authFactory, beetFactory) {
console.log("beetgarden")

// $scope.UID = authFactory.getUser()
// .then((res) => {
//   console.log("res", res.value)
//   debugger
//   let uid = res
//   return  (uid) => {

//     $beetFactory.load(uid)
//     .then((res) => {
//       console.log("what is this?", res)
//     })
//   }
// })

// console.log("$scope.uid", $scope.UID.$$state.value)
$scope.delete = ()=> {

}

$scope.loading= () => {
  beetFactory.load('-Kct9ztod7IdYbaZSUkM').
then((res) => {
  return $scope.userBeets = res
})

}

});
