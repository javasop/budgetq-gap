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

            $rootScope.$watch('model', function(newNames, oldNames) {
                update();
            }, true);

            $rootScope.$watchCollection('item', function(newNames, oldNames) {
                update();
            });


            function prepareQ() {

                return {month: $rootScope.numberMonth, year: $rootScope.numberYear, id: $stateParams.exp_id}

            }

            //updates the the statistics ..
            function update() {

                var fluc = $rootScope.model.fluctuating;
                var rec = $rootScope.model.recurring;
                var inc = $rootScope.model.income;

                $rootScope.model.expTotal = 0;
                $rootScope.model.flucTotal = 0;
                $rootScope.model.recTotal = 0;
                $rootScope.model.inTotal = 0;

                if ((fluc !== undefined || rec !== undefined) && $rootScope.model.income != undefined) {

                    fluc.forEach(function(entry) {
                        if (entry)
                            $rootScope.model.expTotal += entry.value;
                        $rootScope.model.flucTotal += entry.value;
                    });

                    rec.forEach(function(entry) {
                        if (entry)
                            $rootScope.model.expTotal += entry.value;
                        $rootScope.model.recTotal += entry.value;

                    });

                    inc.forEach(function(entry) {
                        if (entry)
                        $rootScope.model.inTotal += entry.value;

                    });


                    $rootScope.model.amountLeft = $rootScope.model.inTotal - $rootScope.model.expTotal;
                    $rootScope.model.perDay = $rootScope.model.amountLeft / $rootScope.daysLeft;
                }
            }

            function filterM(m) {

                var a = $rootScope.expenses;

                var month;
                (m === undefined) ? month = $rootScope.numberMonth : month = m

                current = _.filter(a, function(el) {
                    return el.month == month && (el.type == "recurring" || el.type == "fluctuating");
                });

                if (current.length > 0) {

                    $rootScope.model.recurring = _.filter(current, function(el) {
                        return el.type == "recurring";
                    });
                    $rootScope.model.fluctuating = _.filter(current, function(el) {
                        return el.type == "fluctuating";
                    });
                    $rootScope.numberMonth = month;
                }
                else {

                    if ($rootScope.currentMonth == month) {
                        //filter the recurring expenses of the previous month
                        current = _.filter(a, function(el) {
                            return (el.type == "recurring" && el.month == month - 1);
                        });
                        $rootScope.model.recurring = _.filter(current, function(el) {
                            return el.type == "recurring";
                        });
                        $rootScope.model.fluctuating = _.filter(current, function(el) {
                            return el.type == "fluctuating";
                        });
                        $rootScope.numberMonth = month;

                    }
                }

                $rootScope.model.income = _.filter(a, function(el) {
                    return el.type == "income";
                });

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
                        $rootScope.categories = a[0].categories;
                        $rootScope.icons = a[0].icons;
                        $rootScope.settings = $rootScope.account[0].settings;
                        filterM();
                        $ionicLoading.hide();
                    });
                },
                insert: function(item) {
                    //the state params has the id?
                    var ex;
                    var ls = $rootScope.model[item.type];
                    ls.push(item);
                    var q = prepareQ();
                    model.post("expenses", item, q).success(function(a) {
                        ex = a;
                    });
                    return ex;
                },
                addSettings: function(settings) {

                },
                edit: function(item) {
                    //the state params has the id?
                    var ex;
                    //fix item index here
                    var ls = $rootScope.expenses;
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

                    var ls = $rootScope.model[item.type];
                    index = ls.indexOf(item);
                    ls.splice(index, 1);
                    var q = prepareQ();
                    q["item_name"] = item.name
                    q["item_value"] = item.value;
                    q["item_month"] = item.month;
                    q["item_year"] = item.year;
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


