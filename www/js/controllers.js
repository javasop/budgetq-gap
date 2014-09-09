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
        .controller('DashCtrl', function($rootScope, $ionicModal, $ionicListDelegate, $ionicLoading, $timeout, $scope, $http, $ionicPlatform,$stateParams,expenses) {


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
            /**
             * end init
             */




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
                $scope.openModal();
                $ionicListDelegate.closeOptionButtons();
            };

            $scope.onItemDelete = function(item) {
	    	//implement expenses delete ...
		 expenses.del(item)	    
		//send a request to delete an item to the server?
            };

            /**
             *end item list manipulation
             */




            /**
             * 
             * modals 
             * 
             */

//add Modal
            $ionicModal.fromTemplateUrl('my-modal.html', {
                scope: $rootScope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.modal = modal;
            });
            $scope.openModal = function() {
                $rootScope.modal.show();
            };
            $rootScope.closeModal = function() {
                $rootScope.modal.hide();
            };
	    $rootScope.submit = function(){
                if(expenses.validate($scope.item)){
		$rootScope.closeModal();
		$scope.sync($scope.item);
		}
	    }
            //Cleanup the modal when we're done with it!
            $rootScope.$on('$destroy', function() {
                $rootScope.modal.remove();
            });
            // Execute action on hide modal
            $rootScope.$on('modal.hidden', function() {
                // Execute action
            });
            // Execute action on remove modal
            $rootScope.$on('modal.removed', function() {
                // Execute action
            });




	    //icons modal
	    $ionicModal.fromTemplateUrl('icons-modal.html', {
                scope: $rootScope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.iconsModal = modal;
            });
            $rootScope.openIconsModal = function() {
                $rootScope.iconsModal.show();
            };
            $rootScope.closeIconsModal = function() {
                $rootScope.iconsModal.hide();
            };
	    $rootScope.doSelectIcon= function(icon,item){
		item.icon = icon;
		$rootScope.closeIconsModal();
		

	    }	    
            //Cleanup the modal when we're done with it!
            $rootScope.$on('$destroy', function() {
                $rootScope.iconsModal.remove();
            });
            // Execute action on hide modal
            $rootScope.$on('iconsModal.hidden', function() {
                // Execute action
            });
            // Execute action on remove modal
            $rootScope.$on('iconsModal.removed', function() {
                // Execute action
            });



        })
        .controller('SettingsCtrl', function($rootScope, $rootScope) {

        })

