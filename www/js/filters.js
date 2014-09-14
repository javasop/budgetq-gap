angular.module('starter.filters', [])
  .filter('catf', function($filter,$rootScope) {
    var length = $rootScope.categories.length;
    var cats = $rootScope.categories;
    return function(input,cat){

      if(input.length > 0){
      return input;
      }
      //if the input is equal to one and we already added the category
      //OR 
      //the input is the one just added to the categories
      console.log(cats[length])
      if(input.length === 0 || (input.length === 1 && cats[length] != undefined )){
          //display the new category
          //add the new category
          console.log(cat);
          var item = {name:"",icon:""};
          item.name = cat;
          item.icon = "ion-cash";
          (cats[length] == undefined)?cats.push(item):cats[length]=item;
      }
      
    };
  })


