angular.module('MPC', ['ui.bootstrap']);
var MPCCtrl = function ($scope, $modal, $log, $http) {
    $scope.mortagage = {
        amount: 150000,
        percentagedownpayment: 20,
        downpayment: 100,
      
        interst: "6.00",
        years:"20"
    };
    $scope.options = ["3.00","3.25","3.50","3.75","4.00","4.25","4.50","4.75","5.00","5.25","5.50","5.75","6.00","6.25","6.50","6.75","7.00","7.25","7.50","7.75","8.00"];
    $scope.pyears = ["15", "20", "30"];
    $scope.mortagage.downpayment = ($scope.mortagage.amount * $scope.mortagage.percentagedownpayment) / 100;
    $scope.open = function () {
        $modal.open({
            templateUrl: 'MPCContent', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance, $log, mortagage, pyears, options ) {
                $scope.mortagage = mortagage;
                $scope.options = options;
                $scope.pyears = pyears;
                $scope.result = 0;
                $scope.downpayment = 0;

                $scope.error = false;
                $scope.calculate = function () {

               
                    $scope.result = ((mortagage.interst / 1200.0 * (mortagage.amount - mortagage.downpayment)) /
                        (1.0 - Math.pow(1.0 + mortagage.interst / 1200.00, -1.0 * mortagage.years * 12.0))).toFixed(2);
                    
                }
                $scope.percetagechange = function () {
                    $scope.mortagage.downpayment = ($scope.mortagage.amount * $scope.mortagage.percentagedownpayment) / 100;
                   $scope.calculate();

                }
                $scope.downpaymentchange = function () {
                    if ($scope.mortagage.downpayment > $scope.mortagage.amount) {
                        $scope.error = true;
                    }
                    else {
                        $scope.error = false;
                        $scope.mortagage.percentagedownpayment = ($scope.mortagage.downpayment / $scope.mortagage.amount) * 100;
                        $scope.calculate();
                    }


                }
                
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                
                $scope.init=function(){
                    $scope.calculate();
                }
                $scope.init();

            },
            resolve: {
                mortagage: function () {
                    return $scope.mortagage;
                },
                options: function () {
                    return $scope.options;
                    
                },
                pyears: function () {
                    return $scope.pyears;
                    
                }
            }
        });//end of modal.open
    }; // end of scope.open function
};

