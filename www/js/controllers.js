angular.module('starter.controllers', [])

        .controller('LoginCtrl', function($scope, $rootScope, $ionicLoading, $location, $timeout,auth) {
            
	    $scope.model = {};
            $scope.model.username = "";
            $scope.model.password = "";

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
        .controller('SettingsCtrl', function($rootScope) {


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

