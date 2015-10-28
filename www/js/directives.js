angular.module('starter.directives', [])

.directive('flippy', function() {
    return {
      restrict: 'EA',
      link: function($scope, $elem, $attrs) {

        var options = {
          flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
          timingFunction: 'ease-in-out',
        };

        // setting flip options
        angular.forEach(['flippy-front', 'flippy-back'], function(name) {
          
          var el = $elem.find(name);

          if (el.length == 1) {
            angular.forEach(['', '-ms-', '-webkit-'], function(prefix) {
              angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration/1000 + 's ' + options.timingFunction);
            });
          }
        });

        /**
         * behaviour for flipping effect.
         */

         if($attrs.id == 1){
        $scope.flip1 = function() {
          $elem.toggleClass('flipped');
        }
        }
         if($attrs.id == 2){
        $scope.flip2 = function() {
          $elem.toggleClass('flipped');
        }
        }
        if($attrs.id == 3){
        $scope.flip3 = function() {
          $elem.toggleClass('flipped');
        }
        }
         if($attrs.id == 4){
        $scope.flip4 = function() {
          $elem.toggleClass('flipped');
        }
        }
        if($attrs.id == 5){
        $scope.flip5 = function() {
          $elem.toggleClass('flipped');
        }
        }
         if($attrs.id == 6){
        $scope.flip6 = function() {
          $elem.toggleClass('flipped');
        }
        }

      }
    };
  });