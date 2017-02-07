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
    let rows = []
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
      for (var i = 0; i < grid; i++) {
        rows.push(track)
      }
    } //end for in loop
    // return $scope.rows
    console.log(rows)
    $scope.rows = rows
    debugger
  //   let r1 =''
  //   let r2 =''
  //   let r3 =''
  //   let r4 =''
  //   for (var i = 0; i < rows.length; i++) {
  //     if (i <= 15) {
  //       $scope.r1 = i
  //     }
  //     if (i > 15 && i <= 31) {
  //       $scope.r2 = i
  //     }
  //     if (i > 31 && i <= 47) {
  //       $scope.r3 = i
  //     }
  //     if (i > 47) {
  //       $scope.r4 = i
  //     }
  //     debugger
  // }  //end rows for loop
}


});
