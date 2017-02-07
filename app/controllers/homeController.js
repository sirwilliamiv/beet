app.controller('homeCtrl', function($http, $scope) {
  console.log("homeCtrl")

  const sounds = {
    Kick: '/assets/audio/beet/BD.mp3',
    Snare: '/assets/audio/beet/SN.mp3',
    HiHat: '/assets/audio/beet/HH.mp3',
    OHiHat: '/assets/audio/beet/openHH.mp3'
  };
  const grid = 16;

  $scope.sing = () => {
    let rows =[]
    for (file in sounds) {
//add sample
      let sample = new Howl({
        src: [`'sounds' + '.'+ file`],
        volume: 1.0
      })
//combine sample and  name
      let track = {
        name: file,
        sample: sample
      }
// add 16 tracks per row
      for(var i = 0; i < grid;i++) {
         rows.push(track)
      }
    }  //end for in loop
    return $scope.rows
    console.log(rows)




  }

});
