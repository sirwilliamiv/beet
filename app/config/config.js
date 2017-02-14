app.config(($routeProvider, $locationProvider) => {
      //firebaseAuth here

      // Initialize Firebase
      firebase.initializeApp({
        apiKey: "AIzaSyDJUhoFgm-ObXV2Sy09mtwb3P_wySBO5a8",
        authDomain: "beet-35be8.firebaseapp.com",
        databaseURL: "https://beet-35be8.firebaseio.com",
        storageBucket: "beet-35be8.appspot.com",
        messagingSenderId: "130902974922"
      });

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
            templateUrl: '/partials/beetGarden.html',
            resolve: {
              beets(beetFactory) {
                return beetFactory.load()
              },
              user(authFactory, $location) {
                return authFactory.getUser().catch(() => {
                  $location.url('/main')
                  console.log('not logged in')
                })
              }
            }
              })
        //   }
        // })
          .when('/logout', {
            controller: 'logoutCtrl',
            templateUrl: '/partials/logout.html'
          }).otherwise({
            redirectTo: '/home'
          })

        });
