// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives','fmp-card',  'ngCordova','ionic.contrib.ui.tinderCards','chart.js','ngSanitize', 'ionicLazyLoad'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
     $ionicPlatform.registerBackButtonAction(function () {
   
       navigator.app.backHistory();
     }, 100);
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

   .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/logint.html',
        controller: 'loginCtrl'
      }
    }
  })
   .state('app.accountcreation', {
    url: '/accountcreation',
    views: {
      'menuContent': {
        templateUrl: 'templates/accountCreation.html',
        controller: 'accountCreationCtrl'
      }
    }
  })

  .state('app.browse', {
     cache: false,
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'imageController'
        }
      }
    })
  .state('app.statistics', {
    cache: false,
      url: '/statistics',
      views: {
        'menuContent': {
          templateUrl: 'templates/statistics.html',
          controller: 'statisticsCtrl'
        }
      }
    })
  .state('app.gamecomplete', {
      url: '/gamecomplete',
      views: {
        'menuContent': {
          templateUrl: 'templates/gamecomplete.html',
          controller: 'gamecompleteController'
        }
      }
    })
  .state('app.flipgamecomplete', {
      url: '/flipgamecomplete',
      views: {
        'menuContent': {
          templateUrl: 'templates/flipgamecomplete.html',
          controller: 'flipgamecompleteController'
        }
      }
    })
  .state('app.slidegame', {
     cache: false,
      url: '/slidegame',
      views: {
        'menuContent': {
          templateUrl: 'templates/slidegame.html',
          controller: 'slidegameController'
        }
      }
    })
  .state('app.game', {
      url: '/game',
      views: {
        'menuContent': {
          templateUrl: 'templates/game.html',
          controller: 'gameController'
        }
      }
    })
  .state('app.matchcardintro', {
      url: '/matchcardintro',
      views: {
        'menuContent': {
          templateUrl: 'templates/matchcardintro.html',
          controller: 'matchcardintroController'
        }
      }
    })
  .state('app.slidegameintro', {
      url: '/slidegameintro',
      views: {
        'menuContent': {
          templateUrl: 'templates/slidegameintro.html',
          controller: 'slidegameintroController'
        }
      }
    })
  .state('app.flipcard', {
    cache: false,
      url: '/flipcard',
      views: {
        'menuContent': {
          templateUrl: 'templates/flipcard.html',
          controller: 'flipController'
        }
      }
    })
  .state('app.startgame', {
    cache: false,
      url: '/game',
      views: {
        'menuContent': {
          templateUrl: 'templates/startgame.html',
          controller: 'startgameController'
        }
      }
    })
  .state('app.startgame2', {
    cache: false,
      url: '/game',
      views: {
        'menuContent': {
          templateUrl: 'templates/startgame.html',
          controller: 'startgame2Controller'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.editimage',{
    url: '/editimage/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/editimage.html',
        controller: 'editImagetCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
});
