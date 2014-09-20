angular.module('starter.controllers', [])

        .controller('AuthCtrl', function($scope, $rootScope,$ionicLoading,$stateParams, $location, $timeout,auth) {
            
            
            //check if the user is logged in, we redirect whenever we need to reauthenticate
            auth[$stateParams.status]();
            
            
	    $scope.model = {};
            $scope.model.username = "";
            $scope.model.password = "";
            
            //check to see if the user accounts are stored in localstorage or not           
            $scope.submit = function() {
		auth.login($scope.model.username,$scope.model.password);
            }

        })

        .controller('AccountsCtrl', function($scope) {

        })
        .controller('DashCtrl', function($rootScope, $ionicModal,myModals, $ionicListDelegate, $ionicLoading, $timeout, $scope, $http, $ionicPlatform,$stateParams,expenses) {


            /**
             * Initializations: variables, http requests
             */
            
	    $scope.prevMonth = function(){
	        //returns true if there's a prev month	
                expenses.setMonth($rootScope.numberMonth + 1)
	    }
	   $scope.nextMonth = function(){
		//returns true if there's a next month
   		expenses.setMonth($rootScope.numberMonth - 1)

            }

	    //get the current month, this will be changed if the user wants to go back a month let's say ...
            expenses.get();



            $scope.sync = function(item) {
                //sync my data with the database
                //insert the document
                if ($scope.insert) {
                    expenses.insert(item);
                }
                //update
                else {
                    expenses.edit(item);
                }
            };
            
            $scope.onItemDelete = function(item) {
	    	//implement expenses delete ...
		 expenses.del(item)	    
		//send a request to delete an item to the server?
            };

           
            /** item list manupilation
             *
             */
            $scope.data = {
                showDelete: false
            };

            $scope.edit = function(item) {
                
                if (item == undefined) {
	            //it means it's an insert
                    $rootScope.operation = "Insert"
                    $scope.insert = true;
		    $rootScope.item = {};
		    $rootScope.item.type = "recurring";
		    $rootScope.item.icon = "ion-help-circled";
                }
                else {
                    $rootScope.operation = "Update"
                    $scope.insert = false;
                    $rootScope.item = item;
                }
                myModals.create($rootScope,"item",function(item){  
                    $scope.sync(item);
                });
                
                $ionicListDelegate.closeOptionButtons();
            };


        })
        .controller('AccountCtrl', function($rootScope,localStorageService,$scope) {
            
            $scope.username = localStorageService.get('username');
   

        })
        .controller('itemModalCtrl', function($rootScope,myModals,$scope) {         
            //open icons modal
            $scope.openIcons = function(){
                myModals.create($rootScope,"category",function(category){
                    $rootScope.item.icon = category.icon;
                    $rootScope.item.category = category.name;
                })
            }

        })
        .controller('categoryModalCtrl', function($scope,$rootScope,myModals,expenses) {  
            
            $scope.hide = true;
            
        })

