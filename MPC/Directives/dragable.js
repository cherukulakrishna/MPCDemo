﻿angular.module('MPC').directive('dragable', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            $(elem).draggable();
        }
    }
});