app.factory('beetFactory', ($q, authFactory, $http, $location) => {
  let UID = ""


function save(savedBeet, UID) {
      return $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, savedBeet)
        .then((beetid) => {

          let beetGarden = { beet: beetid.data.name }
          $http.post(`https://beet-35be8.firebaseio.com/Users/${UID}/beets.json`, beetGarden)
          return beetid.data.name
        })
    }


  return {

    load: () => {
      return authFactory.getUser().then((res) => {

        UID = res
        return $http.get(`https://beet-35be8.firebaseio.com/userBeets/.json`)
          .then((allBeets) => {
            console.log("uid", UID)
            let userBeets = {}
            for (beet in allBeets.data) {

              if (allBeets.data[beet].UID === UID) {
                userBeets[beet] = allBeets.data[beet]
                userBeets[beet].beetID = [beet]
              }
            }
            console.log("userBeets", userBeets)
            return userBeets
          })
      })
    },

    delete: (id) => {
      return $http.delete(`https://beet-35be8.firebaseio.com/userBeets/${id}.json`)
        .then((res) => {

        })

    },
    save: (uid,name,bpm,savedInstruments, grid) => {
      let instruments = angular.copy(savedInstruments)
        // let instruments_ = Object.assign({}, $scope.instruments) <- does not deep copy object
      let user = {}
      user.UID = uid
      user.name = name
      user.bpm = bpm
      user.instruments = {}

      console.log("save")
      for (name in instruments) {
        user.instruments[name] = {}

        for (var i = 0; i < grid; i++) {
          if (instruments[name][i].value) {
            user.instruments[name][i] = instruments[name][i].value
          }
        } //end for loop
      } //end for in loop

      return save(user).then((res) => {
        //last beet saved
        let beetUID = res
      })
    }, //end save function
    getThisBeet: (beetid) => {
      return $http.get(`https://beet-35be8.firebaseio.com/userBeets/${beetid}.json`)
        .then((res) => {
          name = res.data.name
          bpm = res.data.bpm
          instruments = res.data.instruments
          data = res.data

        })
    }
  } // end return  object

});
