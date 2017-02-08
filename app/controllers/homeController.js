app.controller('homeCtrl', function($http, $scope, $timeout) {
  console.log("homeCtrl")

  const sounds = {
    kick: 'BD.mp3',
    snare: 'SN.mp3',
    hihat: 'HH.mp3',
    openhihat: 'openHH.mp3'
  };
  const grid = 16;



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
      console.log("hey")

      let kick = instruments.kick
      for (var i = 0; i < grid; i++) {
        let sound = kick[i].sample
        let value = kick[i].value
      if(value) {
        sound.play()
      }

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
