app.factory('beetFactory', ($q,authFactory, $http, $location) => {
  return {
    save:  (savedBeet, UID) => {
      $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, JSON.stringify(savedBeet))
        .then((beetid) => {

          let beetGarden = { name: beetid.data.name }
          $http.patch(`https://beet-35be8.firebaseio.com/Users/${UID}.json`, beetGarden)
        })
    },

    load: () => {
      $http.get(`https://beet-35be8.firebaseio.com/userBeets.json`)
        .then((allSavedBeets) => {

          $scope.userBeets = allSavedBeets.data

          $scope.savedToPlay($scope.userBeets)
        })
    }
  } // end return  object

});
