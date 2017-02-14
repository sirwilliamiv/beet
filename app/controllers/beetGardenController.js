app.controller('beetGardenCtrl', function($scope,beets,$http,authFactory, beetFactory) {
console.log("beetgarden")
console.log('beets', beets)
$scope.userBeets = beets

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
$scope.delete = (id)=> {

beetFactory.delete(id)
.then((res) => {
  console.log("what is this", res)
})

}

$scope.loading = () => {
 $scope.userBeets = beetFactory.load()
}

});
