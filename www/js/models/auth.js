angular.module('starter.services')
        .factory('auth', function(model,$resource, $rootScope, $stateParams, $ionicLoading, $location,  $ionicPopup) {

//only for authenticating

            return {
                //this will be changed in the future to something like username and pass or fb ... etc
                login: function(user,pass) {
                    
                    $ionicLoading.show({template: "loggin in ..."});  
                    
                    model.post("auth",{username:user,password:pass}).success(function(accounts) {
                        $ionicLoading.hide();
                        //this means the user needs to decide what account to choose from
                        console.log(accounts);
                        if (accounts.length > 1) {
                            $rootScope.accounts = accounts;
                            $timeout(function() {
                                // anything you want can go here and will safely be run on the next digest.
                                $location.path("/accounts");
                            })
                        }
                        else {
                            $location.path("/tab/dash/" + accounts[0].exp_id);
                        }
                    }).error(
                            function(e) {

                                $ionicLoading.hide();
                                var alt = $ionicPopup.alert({title: "Account not found", template: "please contact osamah.net.m@gmail.com to obtain an account"});
                            })

                },
                logout : function(){
                    
                    //log the user out and back into the login screen?
                    
                }
            };
        });
