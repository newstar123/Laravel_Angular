/**
 * Cube - Bootstrap Admin Theme
 * Copyright 2014 Phoonio
 */

function ngConfirmClick() {
    return {
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure want to delete?";
            var clickAction = attr.confirmedClick;
            element.bind('click', function (event) {
                if (window.confirm(msg)) {
                    scope.$apply(clickAction);
                }
                else {
                }
            });
        }
    };
}

function smallNav() {
    return {
        link: function (scope, element, attrs) {
            $(element).click(function (e) {

                $('#sidebar').toggleClass('hide-left-bar');
                $('#main-content').toggleClass('merge-left');
                e.stopPropagation();
                if ($('#container').hasClass('open-right-panel')) {
                    $('#container').removeClass('open-right-panel')
                }
                if ($('.right-sidebar').hasClass('open-right-bar')) {
                    $('.right-sidebar').removeClass('open-right-bar')
                }

                if ($('.header').hasClass('merge-header')) {
                    $('.header').removeClass('merge-header')
                }
            });
        }
    };
}

angular
        .module('Directives', [])
        .directive('ngConfirmClick', ngConfirmClick)
        .directive('smallNav', smallNav);
