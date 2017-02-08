app.controller('homeCtrl', function($http, $scope, $timeout) {
  console.log("homeCtrl")

  const sounds = {
    kick: 'BD.mp3',
    snare: 'SN.mp3',
    hihat: 'HH.mp3',
    openhihat: 'openHH.mp3'
  };
  const grid = 16;
  $scope.playing = false


  // $scope.sing = () => {
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
      // add 16 tracks per row
    for (var i = 0; i < grid; i++) {

      let track = {
          name: name + i,
          sample: sample
        }
        //add tracks to instruments object by name
      instruments[name].push(track)
    } // end grid for loop
  } //end sounds for in loop
  console.log(instruments)
    // return
  $scope.instruments = instruments

  // } //end sing

  $scope.play = () => {
    for (instrument in instruments) {
      $scope.playing = true
      // let kick = instruments.kick

      for (var i = 0; i < grid; i++) {

        let tempo = 200 * i
        let sound = instruments[instrument][i].sample
        let value = instruments[instrument][i].value
          //test if  value is true
        if (value) {
          $timeout(function() {
              sound.play() //play sound
            }, tempo) // set time interval
        } else {
          $timeout(function() {}, tempo)
        }
      }
      $timeout($scope.play, 3200) //
    }
  }


  //start at index zero
  //if checked
  //play
  //else index + 1

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
