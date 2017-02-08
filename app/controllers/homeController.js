app.controller('homeCtrl', function($http, $scope) {
  console.log("homeCtrl")

  const sounds = {
    kick: 'BD.mp3',
    snare: 'SN.mp3',
    hihat: 'HH.mp3',
    ohihat: 'openHH.mp3'
  };
  const grid = 16;



  $scope.sing = () => {
      let instruments = {
          kick: [],
          snare: [],
          hihat: [],
          openhihat: []
        }
        //adding files to instruments object
      for (name in sounds) {
        let sample = new Howl({
            src: [`/assets/audio/beet/${sounds[name]}`],
            volume: 1.0
          })
          //combine sample and  name
        let track = {
            name: name,
            sample: sample
          }
          // add 16 tracks per row
        for (var i = 0; i < grid; i++) {
          //add tracks to instruments object by name
          instruments[name].push(track)
        } // end grid for loop
      } //end sounds for in loop
      console.log(instruments)
      return $scope.instruments = instruments

    }


  //   ///play the sound
  // $scope.play = (beat) => {
  //   //match beat to play
  //   for (k in sounds) {
  //     if (k === beat.name) {
  //       beat.sample.play()
  //     }
  //   }
  //   console.log("i should play sound from ", beat.name)
  // }

});
