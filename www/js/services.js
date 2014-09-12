var local = "http://localhost:5000/";
var heroku = "http://budgetq.herokuapp.com/";
angular.module('starter.services', ['ngResource'])

        /**
         * A simple example service that returns some data.
         */
        .factory('model', function($resource, $rootScope, $stateParams, $ionicLoading, $location, $http, $ionicPopup) {
            // Might use a resource here that returns a JSON array
            /**
             * 
             * List Observation and changes
             * 
             */
        //watch if any of the items change
        //associate stats with items as well so that they can be updated as well

            $rootScope.icons =
                    [
                        "ion-flask",
                        "ion-ios7-cart",
                        "ion-ios7-telephone",
                        "ion-iphone",
                        "ion-model-s",
                        "ion-ios7-home",
                        "ion-cash",
                        "ion-happy"
                    ];

            $rootScope.model = {
                expTotal: 0,
                recTotal:0,
                flucTotal:0,
                monthlyIncome: 1847,
                amountLeft: 0,
                perDay: 0,
                numberMonth: 0,
                numberYear: 0,
                daysLeft: 0,
                items: []}


            //implement watchers here to update the values of the calculations?
            //return the url with query strings attached
            function getUrl(service,query) {
                if(query){
                    var s = "";
                    var count = 1;
                    for(var k in query){                      
                        (count===1)?s+="?":s+="&"              
                        s+=k+"="+query[k];
                        count++
 
                    }
                var url = heroku + service+ s;

                }
                else{
                    
                 var url = heroku +service;
                    
                }
                return url;
                
            }




            return {
                
                get: function(service,query) {

                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    //the state params has the id?
                    var ex;
                    var ur = getUrl(service,query);
                    
                    return $http.get(ur);


                },
                post: function(service,item,query) {
                    //the state params has the id?
                    var ex;
                    var ur = getUrl(service,query);
                    return $http.post(ur, item)
                    

                },
                put: function(service,item,query) {
                    //the state params has the id?
                    var ex;
                    var ur = getUrl(service,query);
                    return $http.put(ur, item)
                },
                del: function(service,query) {
                    //the state params has the id?
                    var ex;
                    var ur = getUrl(service,query);
                    return $http({method: 'DELETE', url: ur})
                },
                validate: function(item) {
                    //the state params has the id?
                    if (item.value == undefined || item.name == undefined) {
                        $ionicPopup.alert({title: "Expense Name and Amount are required"});
                        return false;
                    }
                    else {
                        return true;
                    }


                }
            };
        });
