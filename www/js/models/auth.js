angular.module('starter.services')
        .factory('auth', function(model,$timeout, $resource, $rootScope, $stateParams, $ionicLoading, $location, $ionicPopup, localStorageService) {


            function redirect(accounts) {
                console.log(accounts);
                if (accounts.length > 1) {
                    $rootScope.accounts = accounts;
              
                        // anything you want can go here and will safely be run on the next digest.
                        $location.path("/accounts");

                }
                else {
                    $location.path("/tab/dash/" + accounts[0].exp_id);
                }

            }

            return {
                //this will be changed in the future to something like username and pass or fb ... etc
                login: function(user, pass) {

                    $ionicLoading.show({template: "loggin in ..."});

                    model.post("auth", {username: user, password: pass}).success(function(accounts) {
                        $ionicLoading.hide();
                        localStorageService.set('user_id',accounts[0].user_id);
                        localStorageService.set('username',user);
                        redirect(accounts);
                    }).error(
                            function(e) {

                                $ionicLoading.hide();
                                var alt = $ionicPopup.alert({title: "Account not found", template: "please contact osamah.net.m@gmail.com to obtain an account"});
                            })
                },
                logout: function() {
                    //remove the locally stored data ...
                     localStorageService.clearAll();

                },
                check: function() {               
                    var user_id = localStorageService.get('user_id')
                    console.log(user_id);
                    if (user_id) {
                        //get accounts
                        model.get("accounts", {user_id: user_id}).success(function(accounts) {
                            $ionicLoading.hide();
                            redirect(accounts);
                        }).error(
                                function(e) {

                                    $ionicLoading.hide();
                                    var alt = $ionicPopup.alert({title: "Account not found", template: "please contact osamah.net.m@gmail.com to obtain an account"});
                                })

                    }

                }
            };
        });
