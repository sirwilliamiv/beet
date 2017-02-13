app.factory('beetFactory', ($q,authFactory, $http, $location) => {
  return {
    save:  (savedBeet, UID) => {
      $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, JSON.stringify(savedBeet))
        .then((beetid) => {

          let beetGarden = { beet: beetid.data.name }
          $http.post(`https://beet-35be8.firebaseio.com/Users/${UID}/beets.json`, beetGarden)
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
