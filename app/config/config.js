app.config(($routeProvider, $locationProvider) => {
  //firebaseAuth here

  // firebase.initializeApp({

  // });

  $locationProvider.hashPrefix('!')
  $routeProvider
    .when('/home', {
      controller: 'homeCtrl',
      templateUrl: '/partials/home.html'
    })
    .when('/login', {
      controller: 'loginCtrl',
      templateUrl: '/partials/login.html'
    })
    .when('/register', {
      controller: 'registerCtrl',
      templateUrl: '/partials/register.html'
    })
    .when('/main', {
      controller: 'mainCtrl',
      templateUrl: '/partials/mainBeet.html'
    })
    .when('/beetGarden', {
      controller: 'beetGardenCtrl',
      templateUrl: '/partials/beetGarden.html'
    })
    .when('/logout', {
      controller: 'logoutCtrl',
      templateUrl: '/partials/logout.html'
    }).otherwise({
    redirectTo:'/home'})

});
