  angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

    .controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  })
    .controller('matchcardintroController', function($scope, $state) {
    $scope.playGame = function() {
      ///// set game settings hereeeeeeeeeeeeeeeeeeeeeeeeee

      var images = JSON.parse(window.localStorage["AppImages"]);
      if (images == undefined || images.length < 3) {
        alert("Please add at least 3 images to play this game");
        $state.go('app.browse');
      } else {

        $state.go('app.flipcard');

      }
    }
  })
    .controller('slidegameintroController', function($scope, $state) {
    if (window.localStorage['imageSlideData'] == undefined) {


      var imageSlideData = {
        totalPlays: 0,
        error: 0
      };
      window.localStorage['imageSlideData'] = JSON.stringify(imageSlideData);


    }

    $scope.playGame = function() {
      ///// set game settings hereeeeeeeeeeeeeeeeeeeeeeeeee

      // window.localStorage["imageSlideData"] = JSON.stringify(images);
      $state.go('app.slidegame');

    }
  })
    .controller('gameController', function($scope, $state, $cordovaNativeAudio) {

    var url = "sfx/correct.wav";
    $cordovaNativeAudio.preloadSimple('correct', url)
      .then(function(msg) {}, function(error) {});
    var url = "sfx/buzzer.mp3";
    $cordovaNativeAudio.preloadSimple('wrong', url)
      .then(function(msg) {}, function(error) {});
    $scope.gameComplete = false;



    var quizData = {
      totalPlays: 0,
      correct: 0
    };
    window.localStorage['quizData'] = JSON.stringify(quizData);



    $scope.playGame = function() {
      var images = JSON.parse(window.localStorage["AppImages"]);
      if (images == undefined || images.length < 1) {
        alert("Please add at least 1 images to play this game");
        $state.go('app.browse');
      } else {
        window.localStorage["GameData"] = JSON.stringify(images);

        $state.go('app.startgame');
      }
    }
  })
    .controller('startgameController', function($scope, $state, $cordovaNativeAudio) {
    var names = ["Wei Jie", "Darrel", "Kok Hui", "Shi Kang", "Meng Han", "Yong Fei", "Yong lun", "Chi Ming"];
    var options = [];
    for (i = 0; i < 4; i++) {
      var AnsNo = Math.floor(Math.random() * (7 - i));
      options.push(names[AnsNo]);
      names.splice(AnsNo, 1);

    }

    $scope.option = options;

    var images = JSON.parse(window.localStorage["GameData"]);
    var imageNo = Math.floor(Math.random() * images.length);
    $scope.imgSrc = images[imageNo].src; // to change to random
    var optNo = Math.floor(Math.random() * 4);
    $scope.option[optNo] = images[imageNo].name;
    //button check answer clicked
    $scope.checkAnswer = function(answer) {
      var quizData = JSON.parse(window.localStorage['quizData'] || '{}');
      quizData.totalPlays += 1;
      if (optNo == (answer - 1)) {
        quizData.correct += 1;
        window.localStorage['quizData'] = JSON.stringify(quizData);
        images.splice(imageNo, 1);
        window.localStorage["GameData"] = JSON.stringify(images);
        $cordovaNativeAudio.play('correct');
        if (images.length == 0) $state.go('app.gamecomplete');
        else $state.go('app.startgame2');
      } else {
        window.localStorage['quizData'] = JSON.stringify(quizData);
        $cordovaNativeAudio.play('wrong');
      }



    }
  })
    .controller('startgame2Controller', function($scope, $state, $ionicViewSwitcher, $cordovaNativeAudio) {

    var names = ["Wei Jie", "Darrel", "Kok Hui", "Shi Kang", "Meng Han", "Yong Fei", "Yong lun", "Chi Ming"];
    var options = [];
    for (i = 0; i < 4; i++) {
      var AnsNo = Math.floor(Math.random() * (7 - i));
      options.push(names[AnsNo]);
      names.splice(AnsNo, 1);

    }

    $scope.option = options;

    var images = JSON.parse(window.localStorage["GameData"]);
    var imageNo = Math.floor(Math.random() * images.length);
    $scope.imgSrc = images[imageNo].src; // to change to random
    var optNo = Math.floor(Math.random() * 4);
    $scope.option[optNo] = images[imageNo].name;
    $scope.checkAnswer = function(answer) {
      var quizData = JSON.parse(window.localStorage['quizData'] || '{}');
      quizData.totalPlays += 1;
      if (optNo == (answer - 1)) {
        quizData.correct += 1;
        window.localStorage['quizData'] = JSON.stringify(quizData);
        $ionicViewSwitcher.nextDirection("forward")
        $cordovaNativeAudio.play('correct');
        images.splice(imageNo, 1);
        window.localStorage["GameData"] = JSON.stringify(images);
        if (images.length == 0) $state.go('app.gamecomplete');
        else $state.go('app.startgame');
      } else {

        window.localStorage['quizData'] = JSON.stringify(quizData);
        $cordovaNativeAudio.play('wrong');
      }
    }
  })
    .controller('gamecompleteController', function($scope, $state, $cordovaNativeAudio) {
    var quizData = JSON.parse(window.localStorage['quizData'] || '{}');

    $scope.totalTries = quizData.totalPlays;
    $scope.mistake = quizData.totalPlays - quizData.correct;
    $scope.score = ((quizData.correct / quizData.totalPlays) * 100).toFixed(2) + '%';
    $scope.tickSrc = "img\\tick01.png";
    $scope.failSrc = "img\\cross.png";
    if (((quizData.correct / quizData.totalPlays) * 100).toFixed(2) >= 50.00) $scope.pass = true;
    else $scope.pass = false


    if (window.localStorage['quizTotalData'] == undefined) //frst time playing this game
    {

      var quizTotalData = {
        totalPlays: $scope.totalTries,
        correct: quizData.correct
      };
      window.localStorage['quizTotalData'] = JSON.stringify(quizTotalData);

    } else {
      var quizTotalData = JSON.parse(window.localStorage["quizTotalData"]);
      quizTotalData.totalPlays += $scope.totalTries;
      quizTotalData.correct += quizData.correct;
      window.localStorage['quizTotalData'] = JSON.stringify(quizTotalData);

    }


    $scope.playGame = function() {
      var images = JSON.parse(window.localStorage["AppImages"]);
      window.localStorage["GameData"] = JSON.stringify(images);

      var quizData = {
        totalPlays: 0,
        correct: 0
      };
      window.localStorage['quizData'] = JSON.stringify(quizData);
      $state.go('app.startgame');

    }

  })
    .controller('flipgamecompleteController', function($scope, $state, $cordovaNativeAudio) {
    var flipCardData = JSON.parse(window.localStorage['flipCardTries'] || '{}');

    $scope.totalTries = flipCardData;
    $scope.mistake = flipCardData - 6;
    $scope.score = ((6 / flipCardData) * 100).toFixed(2) + '%';
    $scope.tickSrc = "img\\tick01.png";
    6
    $scope.failSrc = "img\\cross.png";
    if (((6 / flipCardData) * 100).toFixed(2) >= 50.00) $scope.pass = true;
    else $scope.pass = false



    $scope.playGame = function() {

      $state.go('app.flipcard');

    }

  })
    .controller('loginCtrl', function($scope, $state, $timeout) {

    $scope.validateLogin = function(username, password) {
      $scope.loading = true;
      $timeout(function() {
        $scope.loading = false;

        if (username == password) {
          $state.go('app.browse');

        } else {

          $scope.error = true;
        }
      }, 2000);





    }
    $scope.createAccount = function() {

      $state.go('app.accountcreation');
    }
  })

    .controller('accountCreationCtrl', function($scope, $state, $timeout) {

    $scope.validateLogin = function(username, password, passwordRe) {
      $scope.loading = true;
      $timeout(function() {
        $scope.loading = false;

        if (passwordRe == password) {
          $state.go('app.browse');

        } else {

          $scope.error = true;
        }
      }, 2000);




    }
  })
    .controller('HomeCtrl', function($scope, $ionicSlideBoxDelegate) {
    $scope.pagerClick = function(index) {
      $ionicSlideBoxDelegate.slide(index, 500);

    }
  })
    .controller('imageController', function($scope, $cordovaCamera, $state, $ionicModal) {
    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
    ///////
    $scope.showImage = function(imageSrc) {

      $scope.imageSrc = imageSrc;
      $scope.openModal();
    }


    if (window.localStorage['AppImages'] === undefined) {

      $scope.images = [];
    } else {

      $scope.images = JSON.parse(window.localStorage["AppImages"]);

    }
    $scope.addImage = function() {
      // 2
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
      };

      // 3
      $cordovaCamera.getPicture(options).then(function(imageData) {

        // 4
        onImageSuccess(imageData);

        function onImageSuccess(fileURI) {
          createFileEntry(fileURI);
        }

        function createFileEntry(fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        // 5
        function copyFile(fileEntry) {
          var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          var newName = makeid() + name;

          window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
            fileEntry.copyTo(
            fileSystem2,
            newName,
            onCopySuccess,
            fail);
          },
          fail);
        }

        // 6
        function onCopySuccess(entry) {
          $scope.$apply(function() {
            var imageObj = {};
            imageObj.id = Date.now();
            imageObj.relation = "friend";
            imageObj.name = "Enter Name";
            imageObj.src = entry.nativeURL;
            $scope.images.push(imageObj);
          });
        }

        function fail(error) {
          console.log("fail: " + error.code);
        }

        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }

      }, function(err) {
        console.log(err);
      });
    }


    $scope.urlForImage = function(imageName, images) {
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;

      window.localStorage['AppImages'] = JSON.stringify(images);

      return trueOrigin;
    };

    $scope.deleteImage = function(image, images) {

      for (i = 0; i < images.length; i++) {

        if (image == images[i]) {
          $scope.images.splice(i, 1);
        }

      }

    };

    $scope.editImage = function(image) {

      $state.go('app.editimage', image.id);

    };

  })
    .controller('editImagetCtrl', function($scope, $stateParams, $state) {
    var images = JSON.parse(window.localStorage["AppImages"]);

    for (i = 0; i < images.length; i++) {
      if (images[i].id == $stateParams.id) {
        $scope.image = images[i];
        $scope.name = images[i].name;
        $scope.relation = images[i].relation;
      }

    };

    $scope.saveData = function(name, relation) {

      var images = JSON.parse(window.localStorage["AppImages"]);
      for (i = 0; i < images.length; i++) {
        if (images[i].id == $stateParams.id) {

          images[i].name = name;
          images[i].relation = relation;
        }

      }
      window.localStorage["AppImages"] = JSON.stringify(images);
      $state.go('app.browse');

    }
  })
    .controller('flipController', function($scope, $timeout, $cordovaNativeAudio, $ionicPlatform, $state) {
    $ionicPlatform.onHardwareBackButton(function() {
      $cordovaNativeAudio.unload('close');
      $cordovaNativeAudio.unload('open');
    });
    //flip up 2 second
    var closeCard = "sfx/closeCard.wav";
    $cordovaNativeAudio.preloadSimple('close', closeCard)
      .then(function(msg) {


    }, function(error) {

    });

    //load sound and call it
    var url = "sfx/openCard.wav";
    $cordovaNativeAudio.preloadSimple('open', url)
      .then(function(msg) {

      flipUp();
      $timeout(function() {
        flipBack();
      }, 2000);
    }, function(error) {

    });

    var flipCardData = {
      totalPlays: 0,
      correct: 0
    };
    window.localStorage['flipCardData'] = JSON.stringify(flipCardData);
    $scope.totalTap = 0;
    $scope.count = 0;
    $scope.gameData = [];
    $scope.OpenCard = 0;
    $scope.gameStatus = [0, 0, 0];
    $scope.correct = 0;
    var images = JSON.parse(window.localStorage["AppImages"]);

    var imageNo = Math.floor(Math.random() * images.length);
    $scope.image = images[imageNo]; //0 link 3
    $scope.relation3 = images[imageNo].name;
    images.splice(imageNo, 1);
    var imageNo = Math.floor(Math.random() * images.length);
    $scope.image2 = images[imageNo]; //grp1 2 link to 0
    $scope.relation = images[imageNo].name;
    images.splice(imageNo, 1);
    var imageNo = Math.floor(Math.random() * images.length);
    $scope.image3 = images[imageNo]; //3 link 2  
    $scope.relation2 = images[imageNo].name;

    $scope.myClass1 = ["fancy"];
    $scope.myClass2 = ["fancy"];
    $scope.myClass3 = ["fancy"];
    $scope.myClass4 = ["fancy"];
    $scope.myClass5 = ["fancy"];
    $scope.myClass6 = ["fancy"];

    function flipBack() {
      $cordovaNativeAudio.play('close');
      if ($scope.myClass1.indexOf('flipped') != -1 && $scope.gameStatus[0] != 1) $scope.myClass1.pop('flipped')
      if ($scope.myClass2.indexOf('flipped') != -1 && $scope.gameStatus[2] != 1) $scope.myClass2.pop('flipped')
      if ($scope.myClass3.indexOf('flipped') != -1 && $scope.gameStatus[2] != 1) $scope.myClass3.pop('flipped')
      if ($scope.myClass4.indexOf('flipped') != -1 && $scope.gameStatus[1] != 1) $scope.myClass4.pop('flipped')
      if ($scope.myClass5.indexOf('flipped') != -1 && $scope.gameStatus[1] != 1) $scope.myClass5.pop('flipped')
      if ($scope.myClass6.indexOf('flipped') != -1 && $scope.gameStatus[0] != 1) $scope.myClass6.pop('flipped')
      $scope.OpenCard = 0;
    }

    function flipUp() {
      $cordovaNativeAudio.play('open');
      $scope.myClass1.push('flipped');
      $scope.myClass2.push('flipped');
      $scope.myClass3.push('flipped');
      $scope.myClass4.push('flipped');
      $scope.myClass5.push('flipped');
      $scope.myClass6.push('flipped');


    }
    $scope.flipTest = function(id) {
      $scope.totalTap += 1;
      $cordovaNativeAudio.play('open');
      if ($scope.OpenCard == 0) $scope.OpenCard = id;
      if (($scope.OpenCard == 1 && id == 6) || ($scope.OpenCard == 6 && id == 1)) {
        $scope.gameStatus[0] = 1;
      }
      if (($scope.OpenCard == 5 && id == 4) || ($scope.OpenCard == 4 && id == 5)) {
        $scope.gameStatus[1] = 1;
      }
      if (($scope.OpenCard == 3 && id == 2) || ($scope.OpenCard == 2 && id == 3)) {
        $scope.gameStatus[2] = 1;
      }

      if (id == 1) {
        if ($scope.myClass1.indexOf('flipped') == -1) {
          $scope.myClass1.push('flipped');
        }

      }
      if (id == 2) {
        if ($scope.myClass2.indexOf('flipped') == -1) {
          $scope.myClass2.push('flipped');
        }

      }

      if (id == 3) {
        if ($scope.myClass3.indexOf('flipped') == -1) {
          $scope.myClass3.push('flipped');
        }

      }
      if (id == 4) {
        if ($scope.myClass4.indexOf('flipped') == -1) {
          $scope.myClass4.push('flipped');
        }
      }
      if (id == 5) {
        if ($scope.myClass5.indexOf('flipped') == -1) {
          $scope.myClass5.push('flipped');
        }
      }
      if (id == 6) {
        if ($scope.myClass6.indexOf('flipped') == -1) {
          $scope.myClass6.push('flipped');
        }
      }
      $scope.count = $scope.count + 1;

      if ($scope.count > 1) {
        $timeout(function() {
          flipBack()
        }, 1000);
        $scope.count = 0;

      }

      var total = $scope.gameStatus[0] + $scope.gameStatus[1] + $scope.gameStatus[2]
      if (total == 3) {
        $cordovaNativeAudio.unload('close');
        $cordovaNativeAudio.unload('open');

        if (window.localStorage['flipCardTotalData'] == undefined) //first time playing this game
        {

          var flipCardTotalData = {
            totalPlays: $scope.totalTap,
            correct: 6
          };
          window.localStorage['flipCardTotalData'] = JSON.stringify(flipCardTotalData);

        } else {
          var flipCardTotalData = JSON.parse(window.localStorage["flipCardTotalData"]);
          flipCardTotalData.totalTap += $scope.totalTap;
          flipCardTotalData.correct += 6;
          window.localStorage['flipCardTotalData'] = JSON.stringify(flipCardTotalData);

        }

        window.localStorage['flipCardTries'] = $scope.totalTap;
        $timeout(function() {
          $state.go('app.flipgamecomplete')
        }, 1000);


      }
    }
  })
    .controller('slidegameController', function($scope, $interval, $timeout, $cordovaNativeAudio, $ionicSlideBoxDelegate, $ionicModal) {
    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    function loadGame() {
      $scope.gameComplete = false;
      ///////////////load correct screen

      ///////
      var url = "sfx/buzzer.mp3";
      $cordovaNativeAudio.preloadSimple('wrong', url)
        .then(function(msg) {

      }, function(error) {

      });
      var url = "sfx/correct.wav";
      $cordovaNativeAudio.preloadSimple('correct', url)
        .then(function(msg) {

      }, function(error) {

      });


      //set answer for game  havenn doooooooooooooooooooooo
      var url = "sfx/drumroll.mp3";
      $cordovaNativeAudio.preloadSimple('click', url)
        .then(function(msg) {
        $cordovaNativeAudio.play('click');
      }, function(error) {

      });

      $scope.eyes = 0;
      $scope.nose = 0;
      $scope.mouth = 0;


      var name = ["Jayden", "Ximing", "Kaythi"]
      $scope.name = "KAYTHI"
      var interval = $interval(function() {
        var AnsNo = Math.floor(Math.random() * (10)) % 3;
        $scope.name = name[AnsNo];


      }, 50);
      var interval2 = $interval(function() {

        var EyesSlide = Math.floor(Math.random() * (10)) % 3;
        var NoseSlide = Math.floor(Math.random() * (10)) % 3;
        var MouthSlide = Math.floor(Math.random() * (10)) % 3;

        $ionicSlideBoxDelegate.$getByHandle('eyes').slide(EyesSlide, 0);
        $ionicSlideBoxDelegate.$getByHandle('nose').slide(NoseSlide, 0);
        $ionicSlideBoxDelegate.$getByHandle('mouth').slide(MouthSlide, 0);

      }, 250);

      $ionicSlideBoxDelegate.$getByHandle('eyes').slide(1, 500);
      //$cordovaMedia.play(media);

      $timeout(function() {
        $interval.cancel(interval);
        $interval.cancel(interval2);
        if ($scope.name == "Kaythi") $scope.answer = 2;
        else if ($scope.name == "Jayden") $scope.answer = 0;
        else $scope.answer = 1;
        $cordovaNativeAudio.unload('click');
      }, 2300);


    }

    loadGame();
    $scope.playAgain = function(a, b, c) {

      loadGame();

    }
    $scope.slideHasChangedEyes = function(index) {

      $scope.eyes = index;

    }
    $scope.slideHasChangedNose = function(index) {
      $scope.nose = index;


    }
    $scope.slideHasChangedMouth = function(index) {
      $scope.mouth = index;

    }
    $scope.verifyAnswer = function() {

      $scope.eyes = $ionicSlideBoxDelegate.$getByHandle('eyes').currentIndex();
      $scope.nose = $ionicSlideBoxDelegate.$getByHandle('nose').currentIndex();
      $scope.mouth = $ionicSlideBoxDelegate.$getByHandle('mouth').currentIndex();
      var imageSlideData = JSON.parse(window.localStorage['imageSlideData'] || '{}');

      imageSlideData.totalPlays += 1;


      if ($scope.eyes == $scope.answer && $scope.nose == $scope.answer && $scope.mouth == $scope.answer) {
        $cordovaNativeAudio.play('correct');
        $cordovaNativeAudio.unload('wrong');
        $scope.gameComplete = true;
        $scope.imageSrc = "img\\tick01.png";
        $scope.openModal();
        $scope.gameComplete = true;

        window.localStorage['imageSlideData'] = JSON.stringify(imageSlideData);
        timeout(function() {
          $cordovaNativeAudio.unload('correct');
        }, 1000);


      } else {
        $cordovaNativeAudio.play('wrong');
        $scope.imageSrc = "img\\cross.png";
        $scope.openModal();
        imageSlideData.error += 1;

        window.localStorage['imageSlideData'] = JSON.stringify(imageSlideData);
      }


    }

  })
    .controller('PlaylistCtrl', function($scope, $stateParams) {})
    .controller('statisticsCtrl', function($scope, $sce) {
    var cardTypes = [

    {
      image: 'img\\eyes.png',
      title: 'Person to take note more',
      text: "Player name",
      type: true,
      name: 'Kaythi'
    }, {
      image: 'img\\totalScore.jpg',
      title: 'Total Game Stats',
      percentage: '70%',
      totalPlays: '34',
      type: false
    }, {
      image: "img\\Quiz.jpg",
      title: 'Quiz',
      percentage: '80%',
      totalPlays: '20',
      type: false
    }, {
      image: "img\\cardgame.png",
      title: 'Match Card',
      percentage: '60%',
      totalPlays: '40',
      type: false
    }, {
      image: "img\\imageslide.jpg",
      title: 'Slide it',
      percentage: '70%',
      totalPlays: '98',
      type: false
    }];
    var imageSlideData = JSON.parse(window.localStorage['imageSlideData'] || '{}');
    cardTypes[4].totalPlays = imageSlideData.totalPlays;


    cardTypes[4].percentage = (100 - ((imageSlideData.error / imageSlideData.totalPlays) * 100).toFixed(2));
    var quizTotalData = JSON.parse(window.localStorage["quizTotalData"] || '{}');
    cardTypes[2].totalPlays = quizTotalData.totalPlays;
    cardTypes[2].percentage = ((quizTotalData.correct / quizTotalData.totalPlays) * 100).toFixed(2);

    var flipCardTotalData = JSON.parse(window.localStorage["flipCardTotalData"] || '{}');
    cardTypes[3].totalPlays = flipCardTotalData.totalTap;
    cardTypes[3].percentage = ((flipCardTotalData.correct / flipCardTotalData.totalTap) * 100).toFixed(2);

    cardTypes[1].totalPlays = imageSlideData.totalPlays + quizTotalData.totalPlays + flipCardTotalData.totalTap;
    cardTypes[1].percentage = ((parseFloat(cardTypes[4].percentage) + parseFloat(cardTypes[2].percentage) + parseFloat(cardTypes[3].percentage)) / 3.00).toFixed(2);
    var imageSlideData = JSON.parse(window.localStorage["imageSlideData"]);


    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Total Plays', 'Number of mistakes'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [30, 25, 20, 15, 10, 5, 1]
    ];

    $scope.dlabels = ["Quiz", "Slide it", "Match Card"];
    $scope.ddata = [quizTotalData.totalPlays, imageSlideData.totalPlays, flipCardTotalData.totalTap];


    // Create the data here
    $scope.cards = Array.prototype.slice.call(cardTypes, 0);


    $scope.cardSwipedLeft = function(index) {
      console.log('Left swipe');
    }

    $scope.cardSwipedRight = function(index) {
      console.log('Right swipe');
    }

    $scope.cardDestroyed = function(index) {

      var card = $scope.cards[index];

      $scope.cards.splice(index, 1);
      $scope.cards.unshift(angular.extend({}, card));
    }



  });