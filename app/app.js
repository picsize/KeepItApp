var keepItApp;
var main = {
    init: function () {
        keepItApp = angular.module('keepItApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angular-loading-bar', 'as.sortable', 'ngSanitize', 'ngCordova']);
        if (main.isMobile()) {
            document.addEventListener('deviceready', main.onDeviceReady, false);
        }
        else {
            main.onDeviceReady();
        }
    },
    onDeviceReady: function () {
        if (main.isMobile()) {
            main.getPhoneLanguage();
            try {
                main.getPhoneNumber();
            } catch (e) {

            }
            

            if (main.isApple()) {
                try {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByName('black');
                    StatusBar.show();
                } catch (e) {

                } 
            }
        }
        main.startApp();
    },
    getPhoneLanguage: function () {
        var onSuccess = function (res) {
            if (localStorage.getItem('lang') == undefined) {
                localStorage.setItem('lang', (res.value.split('-')[0] != 'he') ? 'en' : 'he');
            }
        }
        var onFaild = function () { }
        navigator.globalization.getPreferredLanguage(onSuccess, onFaild);
    },
    getPhoneNumber: function () {
        var onSuccess = function (res) {
            //alert('your phone number is:\n' + res.phoneNumber);
        }
        var onFaild = function (error) {
            //alert('Opps...:\n' + JSON.stringify(error));
        }
        window.plugins.sim.getSimInfo(onSuccess, onFaild);
    },
    startApp: function () {
        var start = setInterval(function () {
            if (localStorage.getItem('lang') !== undefined) {
                clearInterval(start);
                angular.bootstrap(document, ['keepItApp']);
                if (localStorage.getItem('questionFromAlarm') !== null) {
                    document.location.href = document.location.href.split('#/')[0] + '#/question';
                } else if (localStorage.getItem('openWheelMoment') !== null) {
                    var openWheelMoment = moment(localStorage.getItem('openWheelMoment'));
                    if (openWheelMoment.format('DD/MM/YYYY') != moment().format('DD/MM/YYYY') && localStorage.getItem('selectedCategoryId') !== null) {
                        document.location.href = document.location.href.split('#/')[0] + '#/wheel';
                    } else if (localStorage.getItem('cUrl') != undefined) {
                        document.location.href = document.location.href.split('#/')[0] + '#/' + localStorage.getItem('cUrl');
                    }
                } else if (localStorage.getItem('userId') != undefined) {
                    document.location.href = document.location.href.split('#/')[0] + '#/wheel';
                }
            }
        }, 500);
    },
    isMobile: function () {
        return (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) ? true : false;
    },
    isApple: function () {
        return (device.platform.toLowerCase() == 'ios') ? true : false;
    }
}

main.init();






