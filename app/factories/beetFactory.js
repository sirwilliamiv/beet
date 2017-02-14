app.factory('beetFactory', ($q,authFactory, $http, $location) => {
  return {
    save:  (savedBeet, UID) => {
       return $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, JSON.stringify(savedBeet))
        .then((beetid) => {

          let beetGarden = { beet: beetid.data.name }
          $http.post(`https://beet-35be8.firebaseio.com/Users/${UID}/beets.json`, beetGarden)
          return beetid.data.name
        })
    },

    load: (id) => {
      return $http.get(`https://beet-35be8.firebaseio.com/userBeets/${id}.json`)
        .then((res) => {

          return res.data
        })
    }
  } // end return  object

});
