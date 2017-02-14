app.controller('beetGardenCtrl', function($scope,$http,authFactory, beetFactory,posts) {
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
$scope.delete = (id)=> {

beetFactory.delete(id)
.then((res) => {
  console.log("what is this", res)
})

}

$scope.loading= () => {
  authFactory.getUser()
  .then((res) =>{
    debugger
   return uid = res
  }).then((uid) => {
    beetFactory.load(uid)
  }).then((res) => {
  return $scope.userBeets = res
})

}

});
