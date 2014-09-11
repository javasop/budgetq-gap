//create a service that will encapsulate all the modals 
//you give it the object to be edited and a callback on submit
angular.module('starter.services')

        .service('myModals', function($ionicModal, $rootScope, $stateParams, $ionicLoading, $location, $ionicPopup) {
            
            this.create = function(scope,type,callback) {
                
                $ionicModal.fromTemplateUrl('templates/modals/'+type+'.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    
                    if(scope.modal != undefined){
                        scope.modal[type] = modal;
                    }
                    else{
                        scope.modal = {};
                        scope.modal[type] = modal;
                    }
                    
                    scope.openModal(type);
                });
                scope.openModal = function(type) {
                    scope.modal[type].show();
                };
                scope.closeModal = function(type) {
                    console.log(scope.modal);
                    scope.modal[type].hide();
                };
                scope.submit = function(object) {
                    scope.closeModal();
                    callback(object)
                }
                //Cleanup the modal when we're done with it!
                scope.$on('$destroy', function() {
                    scope.modal[type].remove();
                });
                // Execute action on hide modal
                scope.$on('modal.hidden', function() {
                    // Execute action
                });
                // Execute action on remove modal
                scope.$on('modal.removed', function() {
                    // Execute action
                });
                

            }

        });

