//create a service that will encapsulate all the modals 
//you give it the object to be edited and a callback on submit
angular.module('starter.services')

        .service('myModals', function($ionicModal, $rootScope, $stateParams, $ionicLoading, $location, $ionicPopup) {
            var cType = [];
            var cCall = [];
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
                    cType.push(type);
                    cCall.push(callback);
                    scope.openModal();
                });
                scope.openModal = function() {
                    scope.modal[cType[cType.length - 1]].show();
                };
                scope.closeModal = function() {
                    scope.modal[cType[cType.length - 1]].hide();
                    cType.pop();
                };
                scope.submitModal = function(object) {
                    scope.closeModal();
                    cCall[cCall.length - 1](object);
                    cCall.pop();
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
            //future
            this.open = function(){
                
            }
            this.close = function(){
                
            }
            this.submit = function(object){
                
            }

        });

