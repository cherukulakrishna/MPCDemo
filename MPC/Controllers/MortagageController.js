angular.module('MPC', ['ui.bootstrap']);
var MPCCtrl = function ($scope, $modal, $log, $http) {
    $scope.mortagage = {
        amount: 0,
        downpayment: 0,
        percentagedownpayment:0,
        interst: 0,
        years:0
    };
    $scope.options = [3,4];

    $scope.open = function () {
        $modal.open({
            templateUrl: 'MPCContent', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance, $log, mortagage, options) {
                $scope.mortagage = mortagage;
                $scope.options = options;
                $scope.result = 0;
                $scope.calculate = function () {
                
                    $scope.result = 100;
                    
                }
                $scope.percetagechange = function () {
                    $scope.mortagage.downpayment = ($scope.mortagage.amount * $scope.mortagage.percentagedownpayment) / 100;


                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            },
            resolve: {
                mortagage: function () {
                    return $scope.mortagage;
                },
                options: function () {
                    return $scope.options;
                }
            }
        });//end of modal.open
    }; // end of scope.open function
};