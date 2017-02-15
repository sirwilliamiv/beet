app.factory('beetFactory', ($q, authFactory, $http, $location) => {
  let UID =""
  return {
    save: (savedBeet, UID) => {
      return $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, savedBeet)
        .then((beetid) => {

          let beetGarden = { beet: beetid.data.name }
          $http.post(`https://beet-35be8.firebaseio.com/Users/${UID}/beets.json`, beetGarden)
          return beetid.data.name
        })
    },

    load: () => {
      return authFactory.getUser().then((res) => {

         UID = res
          return $http.get(`https://beet-35be8.firebaseio.com/userBeets/.json`)
          .then((allBeets)=> {
            console.log("uid", UID)
            let userBeets = {}
            for(beet in allBeets.data) {

              if(allBeets.data[beet].UID === UID){
                  userBeets[beet] = allBeets.data[beet]
                  userBeets[beet].beetID = [beet]
              }
            }
                  console.log("userBeets", userBeets)
              return userBeets
          })
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
