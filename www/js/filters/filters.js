angular.module('starter.filters', [])
  .filter('catf', function($filter,$rootScope) {
    return function(input,hide){
      if(input.length === 0){          
          //offer to add a new category
          hide = false;
          return input;
      }
      else{
          return input;
      }

      
    };
  })


