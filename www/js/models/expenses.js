angular.module('starter.services')

        /**
         * A simple example service that returns some data.
         */
        .factory('expenses', function(model, $rootScope, $stateParams, $ionicLoading, $location, $http, $ionicPopup) {
            // Might use a resource here that returns a JSON array


            d = new Date();
            //todo: if the month changes, update everything ...

            var day = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            
            
            $rootScope.numberMonth = month
            $rootScope.numberYear = year
            $rootScope.numberDay = day;
            
            numberDays = new Date($rootScope.numberMonth, $rootScope.numberYear, 0).getDate();

            $rootScope.daysLeft = numberDays - day;
            
            $rootScope.currentMonth = month;
            $rootScope.currentYear = year;
            $rootScope.currentDay = day;

            $rootScope.gr = {groups: []};
            //figure out a way to group the expenses into years?

            $rootScope.$watchCollection('model.items', function(newNames, oldNames) {
                update();
            });
            
            $rootScope.$watchCollection('model', function(newNames, oldNames) {
                update();
            });

            $rootScope.$watchCollection('item', function(newNames, oldNames) {
                update();
            });
            
            
            function prepareQ() {

                return {month: $rootScope.numberMonth, year: $rootScope.numberYear, id: $stateParams.exp_id}

            }

            //updates the the statistics ..
            function update() {

                var expenses = $rootScope.model.items;
                
                $rootScope.model.expTotal = 0;
                
                if (expenses != undefined && $rootScope.model.budget != undefined) {
                    expenses.forEach(function(entry) {
                        if (entry)
                            $rootScope.model.expTotal += entry.value;
                    });
                    

                    $rootScope.model.amountLeft = $rootScope.model.budget.value - $rootScope.model.expTotal;
                    $rootScope.model.perDay = $rootScope.model.amountLeft / $rootScope.daysLeft;
                }
                $rootScope.groups = _.groupBy($rootScope.model.items, "type");
            }

            function filterM(m) {

                var a = $rootScope.expenses;

                var month;
                (m === undefined) ? month = $rootScope.numberMonth : month = m

                current = _.filter(a, function(el) {
                    return el.month == month && (el.type == "Fixed" || el.type == "Fluctuating");
                });

                if (current.length > 0) {
                    $rootScope.model.items = current;
                }
                else {
                    //it's the current month and we don't have expenses
                    if ($rootScope.currentMonth == month) {
                        //filter the fluctuting expenses.
                        current = _.filter(a, function(el) {
                            return el.type == "Fixed";
                        });
                        $rootScope.model.items = current;


                    }
                }
                
                    $rootScope.model.budget = _.filter(a, function(el) {
                    return el.type == "Budget";
                    })[0];
                                    
                
                $rootScope.groups = _.groupBy($rootScope.model.items, "type");

            }

            return {
                get: function() {

                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    //the state params has the id?
                    var ex;
                    var q = prepareQ();
                    model.get("expenses", q).success(function(a) {
                        $rootScope.account = a;
                        $rootScope.expenses = a[0].expenses;
                        $rootScope.settings = $rootScope.account[0].settings;
                        filterM();
                        $ionicLoading.hide();
                    });
                },
                insert: function(item) {
                    //the state params has the id?
                    var ex;
                    var ls = $rootScope.model.items;
                    ls.push(item);
                    var q = prepareQ();
                    model.post("expenses", item, q).success(function(a) {
                        ex = a;
                    });
                    return ex;
                },
                addSettings: function(settings){
                    
                },
                edit: function(item) {
                    //the state params has the id?
                    var ex;
                    var ls = $rootScope.model.items;
                    index = ls.indexOf(item);
                    var q = prepareQ();
                    model.put("expenses", {updated: item, item_index: index}, q).success(function(a) {
                        ex = a;
                    });
                    return ex;
                },
                del: function(item) {
                    //the state params has the id?
                    var ex;
                    var ls = $rootScope.model.items;
                    index = ls.indexOf(item);
                    ls.splice(index, 1);
                    var q = prepareQ();
                    q["item_name"] = item.name
                    q["item_value"] = item.value;
                    model.del("expenses", q).success(function(a) {
                        ex = a;
                    });
                    return ex;
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
                },
                setMonth: function(m) {
                    filterM(m);
                },
                setYear: function(y) {
                    currentY(y);
                }
            };
        });


