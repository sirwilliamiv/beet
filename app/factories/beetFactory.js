app.factory('beetFactory', ($q, authFactory, $http, $location) => {
  return {
    save: (savedBeet, UID) => {
      return $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, savedBeet)
        .then((beetid) => {

          let beetGarden = { beet: beetid.data.name }
          $http.post(`https://beet-35be8.firebaseio.com/Users/${UID}/beets.json`, beetGarden)
          return beetid.data.name
        })
    },

    load: (id) => {
      authFactory.getUser().then((res) => {
        debugger
          return $http.get(`https://beet-35be8.firebaseio.com/userBeets/${res}.json`)
            // .then((res) => {
            //   debugger
            //   return res.data
            // })
        })
    },

    delete: (id) => {
      return $http.delete(`https://beet-35be8.firebaseio.com/userBeets/${id}.json`)
        .then((res) => {

        })

    }
  } // end return  object

});
