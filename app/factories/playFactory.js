app.factory('playFactory', ($q, authFactory, $http, $location) => {

  function playPatternSound(value, sound, i, bpm) {

    setTimeout(function() {

      if (value) {
        console.log("playing")
        samples[sound].play() //play sound

      }
    }, bpm * i);
  }


  let samples = {
      hihat: new Howl({
        src: ['/assets/audio/beet/HH.mp3'],
        volume: 0.5,
        html5: true
      }),
      kick: new Howl({
        src: ['/assets/audio/beet/BD.mp3'],
        volume: 0.8,
        html5: true
      }),
      openhihat: new Howl({
        src: ['/assets/audio/beet/openHH.mp3'],
        volume: 0.5,
        html5: true
      }),
      snare: new Howl({
        src: ['/assets/audio/beet/SN.mp3'],
        volume: 0.8,
        html5: true
      })
    } //end samples object


  return {

    newBeet: (grid) => {
      let instruments = {
          // beets: {
            hihat: {},
            kick: {},
            openhihat: {},
            snare: {}
          // }
        }
        //adding default value false to instruments object
      for (name in instruments) {
        // for(name in beets){

        for (var i = 0; i < grid; i++) {

          instruments[name][i] = {
            name: name + i,
            value: false
          }
        } // end grid for loop
      // }//end name in beets
      } //end instruments for in loop
      console.log(instruments)

      return instruments
    }, // end newBeet


    loadPattern: (bpm, instruments, grid) => {

      for (instrument in instruments) {
        for (let i = 0; i < grid; i++) {

          var sound = instrument
          var value = instruments[instrument][i].value
          console.log("sound", instrument)
          playPatternSound(value, sound, i, bpm)
        } //end for loop
      } //end for in loop
    }, //end loadPattern
    // MUTE FEATURE
    toggleMute: (name, onOff) => {
        samples[name].mute(onOff)

      } //end mute



  } //end return object

})
