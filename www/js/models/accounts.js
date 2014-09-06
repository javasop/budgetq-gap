angular.module('starter.services')
        .factory('accounts', function(model,$resource, $rootScope, $stateParams, $ionicLoading, $location,  $ionicPopup) {

//only for accounts management

            return {
                //this will be changed in the future to something like username and pass or fb ... etc
                get: function() {
                    

                },
                share : function(){
                    
                    //log the user out and back into the login screen?
                    
                }
            };
        });
