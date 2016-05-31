var controllers = {
    appTitle: function ($scope) {
        $scope.$on('$routeChangeSuccess', function (event, data) {
            $scope.pageTitle = data.title;
        });
    },
    chooseLanguage: function ($scope, $interval, View, Switcher) {
        //$cordovaStatusbar.overlaysWebView(true);
        //$cordovaStatusbar.styleHex('#000');
        //$cordovaStatusbar.show();

        //alert($cordovaStatusbar.isVisible());

        $scope.lang = (localStorage.getItem('lang') != undefined) ? localStorage.getItem('lang') : 'he';
        localStorage.setItem('lang', $scope.lang);
        $scope.showLangPopup = false;
        //$scope.languages = [{ id:1, name: 'עברית', value: 'he' }, { id:2, name: 'English', value: 'en' }];
        $scope.langString = {
            he: {
                label: 'בחר בבקשה שפה:',
                hebrew: 'עברית',
                english: 'English',
                btn: 'הבא',
                addAlarmTitle: 'הוספת תזכורת'
            },
            en: {
                label: 'Please select a language:',
                hebrew: 'Hebrew',
                english: 'English',
                btn: 'Next',
                addAlarmTitle: 'Add Alarm'
            }
        };
        $scope.init = function () {
            if ($scope.lang == 'en') {
                $scope.languageBtn = 'English';
            }
            else {
                $scope.languageBtn = 'עברית';
            }
        }
        $scope.changeLanguage = function (value) {
            $scope.lang = value;
            localStorage.setItem('lang', value);
            $scope.openHideLanguagePopup();
            $scope.init();
        }
        $scope.openHideLanguagePopup = function () {
            $scope.showLangPopup = !$scope.showLangPopup;
        }
        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'choose-language';
        $scope.choosePage = function () {
            var sec = 2;
            var goToPage = $interval(function () {
                if (sec > 0) {
                    sec--;
                } else {
                    $interval.cancel(goToPage);
                    if (localStorage.getItem('openWheelMoment') !== null) { //the categories has been shown -> user was logged in 
                        //var openWheelMoment = moment(localStorage.getItem('openWheelMoment'));
                        //if (openWheelMoment.format('DD/MM/YYYY') == moment().format('DD/MM/YYYY') && localStorage.getItem('selectedCategoryId') !== null) {
                        //    View.changeView('question');
                        //} else {
                        //    View.changeView('wheel');
                        //}

                        angular.element('#select-lang').addClass('slide-in-from-left').css('visibility', 'visible');
                        angular.element('#language-footer').addClass('slide-in-from-left').css('visibility', 'visible');
                    }
                    else { // user enter for the first time
                        angular.element('#select-lang').addClass('slide-in-from-left').css('visibility', 'visible');
                        angular.element('#language-footer').addClass('slide-in-from-left').css('visibility', 'visible');
                    }

                }
            }, 1000);
        }

        $scope.choosePage();

    },
    register: function ($scope, View, Switcher, Message) {
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                email: 'אימייל',
                password: 'סיסמה',
                name: 'שם פרטי',
                btn: 'הבא',
                registrationFail: 'הרשמה נכשלה',
                emailExists: 'כתובת מייל קיימת',
                userExists: 'משתמש קיים',
                activationFail: 'תהליך ההרשמה נכשל',
                registrationComplete: 'נרשמת בהצלחה',
                messageTitle: 'הודעה',
                inputVerification: 'יש למלא את כל הפרטים',
                btnLogin: 'התחברות',
                incorrectName: 'שם לא נכון',
                incorrectPassword: 'סיסמה לא נכונה',
                accountInactive: 'משתמש חסום',
                incorrectEmail: 'כתובת מייל לא נכונה',
                loginComplete: 'התחברת בהצלחה',
                registerTitle: 'האם הופנת לאפליקציה על ידי החברה שאתה עובד בה?',
                registerPopTitle:'האם ברצונך לשלוח הודעה למפעיל?',
                ok: 'כן',
                cancel: 'לא',
                lastName: 'שם משפחה',
                company: 'שם חברה',
                department: 'שם מחלקה',
                phone: 'טלפון'

            },
            en: {
                email: 'Email',
                password: 'Password',
                name: 'First Name',
                btn: 'Next',
                registrationFail: 'registration fail',
                emailExists: 'email exists',
                userExists: 'user exists',
                activationFail: 'activation fail',
                registrationComplete: 'registration complete',
                messageTitle: 'Title',
                inputVerification: 'Please fill in all the fields',
                btnLogin: 'Login',
                incorrectName: 'Incorrect name',
                incorrectPassword: 'Incorrect password',
                accountInactive: 'Account inactive',
                incorrectEmail: 'Incorrect email',
                loginComplete: 'Login success',
                registerTitle: 'Did you reffer by the company you work in?',
                registerPopTitle: 'Do you want to send message to tech support?',
                ok: 'Yes',
                cancel: 'No',
                lastName: 'Last name',
                company: 'Company',
                department: 'Department',
                phone: 'Phone'
            }
        };
        $scope.showPopup = false;
        $scope.isShown = false;
        $scope.bgClass = 'intro-bg';
        $scope.pageClass = 'register';
        $scope.timesToLogin = 0;
        $scope.email = (localStorage.getItem('email') != undefined) ? localStorage.getItem('email') : '';
        $scope.password = (localStorage.getItem('password') != undefined) ? localStorage.getItem('password') : '';
        $scope.name = (localStorage.getItem('name') != undefined) ? localStorage.getItem('name') : '';
        $scope.lastName = '';
        $scope.company = '';
        $scope.department = '';
        $scope.phone = '';


        //validate input
        $scope.validateInput = function (value) {
            return (value == undefined || value == '') ? false : true;
        };

        //registration
        $scope.registerToApp = function () {
            if ($scope.validateInput($scope.email) && $scope.validateInput($scope.password) && $scope.validateInput($scope.name)) {
                $scope.register();
            } else {
                //Message.showMessage($scope.langString[$scope.lang].inputVerification, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
            }
        }
        $scope.register = function () {
            var data = {
                email: $scope.email,
                pw: $scope.password,
                fName: $scope.name
            };
            Switcher.getSessions('userHandler', 'registerUser', data)
                .success(function (res) {
                    switch (res[0]) {
                        case 'registrationFail': { Message.showMessage($scope.langString[$scope.lang].registrationFail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'emailExists': { Message.showMessage($scope.langString[$scope.lang].emailExists, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'userExists': { Message.showMessage($scope.langString[$scope.lang].userExists, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        case 'activationFail': { Message.showMessage($scope.langString[$scope.lang].activationFail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn); } break;
                        default: {
                            console.log(res[0]);
                            //Message.showMessage($scope.langString[$scope.lang].registrationComplete, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                            localStorage.setItem('userId', res.userId);
                            localStorage.setItem('email', $scope.email);
                            localStorage.setItem('name', $scope.name);
                            localStorage.setItem('password', $scope.password);
                            View.changeView('settings');
                        } break;

                    }
                })
                .error(function () { alert('error'); });
        }

        //login
        $scope.loginToApp = function () {
            ($scope.timesToLogin < 1) ? $scope.loginConditions() : $scope.checkIfOpenEmailPopup();
        }

        $scope.loginConditions = function () {
            if ($scope.validateInput($scope.email) && $scope.validateInput($scope.password) && $scope.validateInput($scope.name)) { //
                $scope.login();
            } else {
                var callback = function (buttonIndex) {
                    //1-> yes   2-> no
                    (buttonIndex == 1) ? $scope.login() : View.changeView('final');
                }

                Message.showConfirm($scope.langString[$scope.lang].registerTitle,
                    $scope.langString[$scope.lang].messageTitle,
                    { yes: $scope.langString[$scope.lang].ok, no: $scope.langString[$scope.lang].cancel },
                    callback);
                //alert('res = ' + res);
                //Message.showMessage($scope.langString[$scope.lang].inputVerification, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
            }
        }
        $scope.login = function () {
            var data = {
                email: $scope.email,
                pw: $scope.password,
                fName: $scope.name
            };
            Switcher.getSessions('userHandler', 'loginUser', data)
                .success(function (res) {
                    switch (res[0]) {
                        case 'incorrectEmail': {
                            $scope.checkIfOpenEmailPopup();
                            Message.showMessage($scope.langString[$scope.lang].incorrectEmail, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                        } break;
                        case 'accountInactive': {
                            $scope.checkIfOpenEmailPopup();
                            Message.showMessage($scope.langString[$scope.lang].accountInactive, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                        } break;
                        case 'incorrectPassword': {
                            $scope.checkIfOpenEmailPopup();
                            Message.showMessage($scope.langString[$scope.lang].incorrectPassword, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                        } break;
                        case 'incorrectName': {
                            $scope.checkIfOpenEmailPopup();
                            Message.showMessage($scope.langString[$scope.lang].incorrectName, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                        } break;
                        default: {
                            console.log(res);
                            //Message.showMessage($scope.langString[$scope.lang].loginComplete, $scope.langString[$scope.lang].messageTitle, $scope.langString[$scope.lang].btn);
                            localStorage.setItem('userId', res.userId);
                            localStorage.setItem('totalCredits', (res.totalCredits == null) ? 0 : parseInt(res.totalCredits));
                            localStorage.setItem('email', $scope.email);
                            localStorage.setItem('name', $scope.name);
                            localStorage.setItem('password', $scope.password);
                            if (res.lastLogin != 'Never') {
                                //localStorage.setItem('showIntro', 'true');
                            }
                            View.changeView('settings');
                        } break;
                    }
                })
                .error(function () { alert('error'); });
        }

        $scope.checkIfOpenEmailPopup = function () {
            $scope.timesToLogin++;
            if ($scope.timesToLogin == 2) {
                $scope.showHidePopup(1);
            }
        }

        //check email and password
        $scope.checkIfUserExists = function () {
            if ($scope.validateInput($scope.email) && $scope.validateInput($scope.password)) { //user filed both fields
                var data = {
                    email: $scope.email,
                    phone: $scope.password
                }
                Switcher.getSessions('userHandler', 'checkIsUserExists', data)
                    .success(function (res) {
                        if (res.userFirstName != 'notExists') {
                            $scope.name = res.userFirstName;
                        }
                    })
                    .error(function (error) { });
            }
        }

        $scope.showHidePopup = function (n) {
            if (n == 1) {
                $scope.showPopup = !$scope.showPopup;
            }
        }

        $scope.sendEmail = function () {
            $scope.showHidePopup(1);
            var data = {
                mailType: 'userForm',
                message: {
                    companyName: $scope.company,
                    department: $scope.department,
                    firstName: $scope.name,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    phone: $scope.phone
                }
            };
            Switcher.getSessions('mailHandler', 'sendMail', data)
                .success(function (res) {
                })
                .error(function () { alert('error'); });
        }

        $scope.showForm = function () {
            if ($scope.isShown) {
                $scope.sendEmail();
            } else {
                ($scope.langString[$scope.lang].ok == 'כן') ? $scope.langString[$scope.lang].ok = 'שלח' : $scope.langString[$scope.lang].ok = 'Send';
                ($scope.langString[$scope.lang].cancel == 'לא') ? $scope.langString[$scope.lang].cancel = 'ביטול' : $scope.langString[$scope.lang].cancel = 'Cancel';
                $scope.isShown = !$scope.isShown;
            }
        }

        jQuery('.page').toggle('slide');

    },
    settings: function ($scope, $cordovaLocalNotification, View) {
        $scope.lang = (localStorage.getItem('lang') != undefined) ? localStorage.getItem('lang') : 'he';
        $scope.langString = {
            he: {
                btn: 'הבא',
                addAlarmTitle: 'הוספת תזכורת',
                addAlarmBtn: 'שמור',
                cancel: 'ביטול',
                Sun: 'א',
                Mon: 'ב',
                Tue: 'ג',
                Wed: 'ד',
                Thu: 'ה',
                Fri: 'ו',
                Sat: 'ש',
                withAlarm: 'בבקשה עזרו לי לזכור',
                withoutAlarm: 'אין לי צורך בתזכורת כרגע',
                withSound: 'צליל',
                defaultSound: 'ברירת מחדל',
                vibration: 'רטט',
                label: 'בחר בבקשה שפה:',
                hebrew: 'עברית',
                english: 'English'
            },
            en: {
                btn: 'Next',
                addAlarmTitle: 'Add Alarm',
                addAlarmBtn: 'Save',
                cancel: 'Cancel',
                Sun: 'S',
                Mon: 'M',
                Tue: 'T',
                Wed: 'W',
                Thu: 'T',
                Fri: 'F',
                Sat: 'S',
                withAlarm: 'Please help  me to remember',
                withoutAlarm: 'I don\'t need a reminder for now',
                withSound: 'Sound',
                defaultSound: 'Default',
                vibration: 'Vibration',
                label: 'Please select a language:',
                hebrew: 'Hebrew',
                english: 'English'
            }
        };
        $scope.setAlarm = (localStorage.getItem('setAlarm') == 'true') ? true : false;
        $scope.sun = (localStorage.getItem('sun') == undefined) ? true : (localStorage.getItem('sun') == 'true') ? true : false;
        $scope.mon = (localStorage.getItem('mon') == undefined) ? true : (localStorage.getItem('mon') == 'true') ? true : false;
        $scope.tue = (localStorage.getItem('tue') == undefined) ? true : (localStorage.getItem('tue') == 'true') ? true : false;
        $scope.wed = (localStorage.getItem('wed') == undefined) ? true : (localStorage.getItem('wed') == 'true') ? true : false;
        $scope.thu = (localStorage.getItem('thu') == undefined) ? true : (localStorage.getItem('thu') == 'true') ? true : false;
        $scope.fri = (localStorage.getItem('fri') == undefined) ? true : (localStorage.getItem('fri') == 'true') ? true : false;
        $scope.sat = (localStorage.getItem('sat') == undefined) ? false : (localStorage.getItem('sat') == 'true') ? true : false;
        $scope.sound = (localStorage.getItem('sound') == 'true') ? true : false;
        $scope.vibration = (localStorage.getItem('vibration') == undefined) ? true : (localStorage.getItem('vibration') == 'true') ? true : false;
        $scope.pageClass = 'settings';
        $scope.bgClass = 'intro-bg';
        $scope.alarmTime = (localStorage.getItem('alarmTime') == '+' || localStorage.getItem('alarmTime') == undefined) ? '+' : localStorage.getItem('alarmTime');
        $scope.defaultTime = new Date(Date.now());
        $scope.alpha = ($scope.setAlarm) ? false : true;
        $scope.isDisable = ($scope.alpha) ? true : false;
        $scope.fromFinal = (localStorage.getItem('oldUrl') == '/final') ? true : false;

        $scope.check = function (needReminder) {
            if (needReminder) {
                $scope.setAlarm = true;
                $scope.isDisable = false;
                $scope.alpha = false;
            } else {
                $scope.setAlarm = false;
                $scope.isDisable = true;
                $scope.alpha = true;
            }
        }

        $scope.getTime = function (t) {
            res = '';
            if (t == 0) {
                var str = $scope.defaultTime.toTimeString().split(' ')[0]
                res += str.split(':')[0] + ':' + str.split(':')[1];
            } else {
                var str = $scope.alarmTime.toTimeString().split(' ')[0]
                res += str.split(':')[0] + str.split(':')[1];
            }
            return res;
        }

        $scope.saveAlarms = function (fromFinal) {
            $scope.alarmTime = angular.element('#alarmTime')[0].value;
            $scope.saveSettingsToLocalStorage();
            if ($scope.setAlarm) {
                $scope.createAlarm(fromFinal);
            } else {
                View.changeView('wheel');
            }

        }

        $scope.createAlarm = function (fromFinal) {
            var snooze = function () {
                alarms = new Array();
                id = 30;
                alarmDate = moment();
                h = '';
                m = '';
                if ($scope.sun) {
                    alarmDate = setAlarmDay("Sunday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                if ($scope.mon) {
                    alarmDate = setAlarmDay("Monday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                if ($scope.tue) {
                    alarmDate = setAlarmDay("Tuesday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                if ($scope.wed) {
                    alarmDate = setAlarmDay("Wednesday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                if ($scope.thu) {
                    alarmDate = setAlarmDay("Thursday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                if ($scope.fri) {
                    alarmDate = setAlarmDay("Friday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                if ($scope.sat) {
                    alarmDate = setAlarmDay("Saturday");
                    if (angular.element('#alarmTime')[0].value != '+') {
                        addAlarm(angular.element('#alarmTime')[0], alarmDate);
                    }
                    addAlarm(angular.element('#defaultTime')[0], alarmDate);
                }

                $cordovaLocalNotification.schedule(alarms).then(function (result) {
                    if (fromFinal) {
                        View.changeView('final');
                    } else {
                        View.changeView('wheel');
                    }

                });
            }

            var setAlarmDay = function (dayOfWeek) {
                date = moment().day(dayOfWeek);
                if (date.day() < moment().day()) {
                    date.add(7, 'days');
                }
                else if (date.day() == moment().day() && (angular.element('#alarmTime')[0].value.split(':')[0] * 1 < moment().get('hour') * 1 || angular.element('#defaultTime')[0].value.split(':')[0] * 1 < moment().get('hour') * 1)) {
                    date.add(7, 'days');
                }
                return date;
            }

            var addAlarm = function (input, moment) {
                h = input.value.split(':')[0] * 1
                m = input.value.split(':')[1] * 1
                moment.hours(h);
                moment.minutes(m);
                alarms.push({
                    id: id,
                    title: 'KeepItApp',
                    text: '',
                    sound: (sound) ? 'file://assets/sound/KeepitApp.mp3' : '',
                    every: 'week',
                    icon: 'file://assets/img/snoozeBig.png',
                    at: moment._d.getTime()
                });
                id++;
            }

            document.addEventListener('deviceready', snooze, false);
        }

        $scope.setTime = function (t) {
            if (t == 0) {
                $scope.defaultTime.setHours(8);
                $scope.defaultTime.setMinutes(0);
            } else {
                $scope.alarmTime.setHours(0);
                $scope.alarmTime.setMinutes(0);
            }
        }

        $scope.setTime(0);

        $scope.saveSettings = function () {
            if ($scope.setAlarm) {
                $scope.saveAlarms(true);
            } else {
                $cordovaLocalNotification.cancelAll().then(function (result) {
                });
            }

            View.changeView('final');
        }

        $scope.saveSettingsToLocalStorage = function () {
            localStorage.setItem('setAlarm', $scope.setAlarm);
            localStorage.setItem('isDisable', $scope.isDisable);
            localStorage.setItem('sun', $scope.sun);
            localStorage.setItem('mon', $scope.mon);
            localStorage.setItem('tue', $scope.tue);
            localStorage.setItem('wed', $scope.wed);
            localStorage.setItem('thu', $scope.thu);
            localStorage.setItem('fri', $scope.fri);
            localStorage.setItem('sat', $scope.sat);
            localStorage.setItem('sound', $scope.sound);
            localStorage.setItem('vibration', $scope.vibration);
            localStorage.setItem('alpha', $scope.alpha);
            localStorage.setItem('alarmTime', $scope.alarmTime);
        }

        $scope.changeLanguage = function (value) {
            $scope.lang = value;
            localStorage.setItem('lang', value);
            $scope.openHideLanguagePopup();
            $scope.init();
        }
        $scope.openHideLanguagePopup = function () {
            $scope.showLangPopup = !$scope.showLangPopup;
        }
        $scope.init = function () {
            if ($scope.lang == 'en') {
                $scope.languageBtn = 'English';
            }
            else {
                $scope.languageBtn = 'עברית';
            }
        }

        $('.clock').clockpicker({
            'default': 'now',
            donetext: $scope.langString[$scope.lang].addAlarmBtn,
            cancel: $scope.langString[$scope.lang].cancel,
            onCancel: function (elem) {
                setTimeout(function () {
                    if ($(elem).attr('id') == 'alarmTime') {
                        angular.element('#alarmTime')[0].value = '+';
                    } else {
                        $scope.defaultTime = new Date(Date.now());
                        $scope.setTime(0);
                        angular.element('#defaultTime')[0].value = '08:00';
                    }

                }, 0);
            }/*,
            afterDone: function (elem, clock) {
                setTimeout(function () {
                    var time = clock.spanHours[0].innerHTML + ':' + clock.spanMinutes[0].innerHTML;
                    if ($(elem).attr('id') == 'alarmTime') {
                        $scope.alarmTime = time;
                        angular.element('#alarmTime')[0].value = time;
                    } else {
                        $scope.defaultTime = time;
                        angular.element('#defaultTime')[0].value = time;
                    }
                }, 0);
            }*/

        });
    },
    wheel: function ($scope, $interval, $cordovaLocalNotification, $window, $location, Switcher, Message, View, App) {
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                title: 'הנושא היום הוא:',
                link: 'תן לי לפתור בעיה',
                another: 'אני רוצה ללמוד נושא אחר',
                another5Points: 'אני רוצה לבחור את נושא הלימוד = 5 נק',
                categoryListTitle: 'בחר נושא:',
                score: 'ציון:',
                ok: 'אישור',
                cancel: 'ביטול',
                addAlarmBtn: 'שמור'
            },
            en: {
                title: 'The subjet today is:',
                link: 'Give me a problem to solve',
                another: 'I want to learn something else',
                another5Points: 'I want to choose the subject = 5Pts',
                categoryListTitle: 'Choose a subject:',
                score: 'Score:',
                ok: 'OK',
                cancel: 'Cancel',
                addAlarmBtn: 'Save'
            }
        };
        $scope.pageClass = 'main';
        $scope.bgClass = 'white-bg';
        $scope.categoriesList = [];
        $scope.selectedCategory = '';
        $scope.selectedCategoryId = 0;
        $scope.selectedCategoryColor = '';
        $scope.selectedCategoryIcon = '';

        $scope.imageWidth = ($window.innerWidth < 360) ? 40 * 0.7 : ($window.innerWidth < 375) ? 40 * 0.85 : ($window.innerWidth < 414) ? 40 * 0.8 : 40 * 0.9;
        $scope.imageHeight = ($window.innerWidth < 360) ? 40 * 0.7 : ($window.innerWidth < 375) ? 40 * 0.85 : ($window.innerWidth < 414) ? 40 * 0.8 : 40 * 0.9;
        $scope.imagePositionX = ($window.innerWidth < 360) ? 105 : ($window.innerWidth < 375) ? 140 : ($window.innerWidth < 414) ? 130 : 140;
        $scope.imagePositionY = ($window.innerWidth < 360) ? -50 : ($window.innerWidth < 375) ? -70 : ($window.innerWidth < 414) ? -70 : -70;

        $scope.isSpinning = false;
        $scope.showDots = false;
        $scope.showSpinImg = true;
        $scope.startImg = ($scope.lang == 'he') ? 'startHe.png' : 'startEn.png';
        $scope.anotherText;
        $scope.spinningNum = 0;
        $scope.showPopup = false;
        $scope.userName = localStorage.getItem('name');
        $scope.totalCredits = (localStorage.getItem('totalCredits') != undefined) ? (localStorage.getItem('totalCredits') * 1).toFixed(1) : 0;

        var data = { userId: localStorage.getItem('userId'), lang: $scope.lang }
        console.log(data);
        Switcher.getSessions('categoryHandler', 'getUserCategories', data)
            .success(function (res) {
                localStorage.setItem('openWheelMoment', moment());
                console.log('getUserCategories', res);
                $scope.categoriesList = res;
                $scope.createWheel(res);
            })
            .error(function (e) { console.log('error', e); $scope.categoriesList = []; });

        $scope.createWheel = function (data) {
            var images = new Array();
            for (var i = 0; i < data.length; i++) {
                var img = new Image();
                img.id = data[i].id;
                img.src = data[i].icon;
                img.color = data[i].color;
                img.width = $scope.imageWidth;
                img.height = $scope.imageHeight;
                img.positionX = $scope.imagePositionX;
                img.positionY = $scope.imagePositionY;
                img.progress = data[i].userProgress;
                if (localStorage.getItem('lang') == 'he') {
                    img.alt = data[i].title_he;
                } else {
                    img.alt = data[i].title_en;
                }

                images.push(img);
            }

            var theme = {
                Colour1: '#ff0',
                Colour2: '#000',
                WheelColour: 'transparent',
                FontColour1: "#000",
                FontColour2: "#ff0",
                Slice1Colour: "#006",
                Font: "FbOxford-Regular",
                PegColour1: "#fff",
                PegColour2: "#000",
                PointerColour1: "#fff",
                PointerColour2: "#000",
                CentreColour: '#f4eae0',
                HighlightColour: 'transparent',
                SliceText: ""
            }

            myWheel = SPINWHEEL.wheelOfDestiny('wheel', images, theme, 3);

            var flag = false;
            var interval = $interval(function () {
                if (!flag) {
                    flag = !flag;
                    $('#wheel').empty();
                    myWheel = SPINWHEEL.wheelOfDestiny('wheel', images, theme, 3);
                } else {
                    $interval.cancel(interval);
                }
            }, 500);

        }

        $scope.spin = function (fromImg) {
            if (fromImg) {
                $scope.showSpinImg = !$scope.showSpinImg;
            }
            myWheel.Start();
            $scope.isSpinning = true;
            $scope.showDots = true;
            myWheel.SetOnCompleted(function (category) {
                $scope.$applyAsync(function ($scope) {
                    console.log(category.alt);
                    $scope.spinningNum++;
                    $scope.checkForAnotherSpin();
                    $scope.showDots = false;
                    $scope.selectedCategory = category.alt;
                    $scope.selectedCategoryId = category.id;
                    $scope.selectedCategoryColor = category.color;
                    $scope.selectedCategoryIcon = category.src;
                    localStorage.setItem('selectedCategory', $scope.selectedCategory);
                    localStorage.setItem('selectedCategoryId', $scope.selectedCategoryId);
                    localStorage.setItem('selectedCategoryColor', $scope.selectedCategoryColor);
                    localStorage.setItem('selectedCategoryIcon', $scope.selectedCategoryIcon);
                    console.log($scope.selectedCategory + ' ' + $scope.selectedCategoryId + ' ' + $scope.selectedCategoryColor);
                });
            });
        },

        $scope.checkForAnotherSpin = function () {
            if ($scope.categoriesList.length >= 3) {
                if ($scope.spinningNum == 1) {
                    $scope.anotherText = $scope.langString[$scope.lang].another;
                }
                else if ($scope.spinningNum == 2 && localStorage.getItem('totalCredits') > 10) {
                    $scope.anotherText = $scope.langString[$scope.lang].another5Points;
                } else {
                    $scope.anotherText = '';
                }
            }
        }

        $scope.checkIfCanSpin = function () {
            if ($scope.spinningNum == 1) {
                $scope.spin(false);
            } else {
                if (localStorage.getItem('totalCredits') * 1 > 10) {
                    $scope.clearCategoryInfo();
                    $scope.openCatPopup();
                }
            }
        }

        $scope.openCatPopup = function () {
            View.scrollToTop();
            angular.element('body').css('overflow', 'hidden');
            localStorage.setItem('used5Points', true);
            $scope.totalCredits = $scope.totalCredits - 5;
            $scope.showPopup = true;
        }

        $scope.showHidePopup = function (n) {
            if (n == 1) {
                $scope.showPopup = !$scope.showPopup;
                angular.element('body').css('overflow', 'auto');
            }

        }

        $scope.setAlarm = function () {
            //$('#wheelAlarm').show();
            setTimeout(function () { $('#wheelAlarm').click(); }, 5);
        }

        $scope.saveAlarm = function () {
            var snooze = function () {
                var time = moment();
                time.hours(angular.element('#wheelAlarm')[0].value.split(':')[0] * 1);
                time.minutes(angular.element('#wheelAlarm')[0].value.split(':')[1] * 1);
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'יש לך שאלה לענות עליה',
                    text: 'יש לך שאלה לענות עליה',
                    sound: 'file://assets/sound/KeepitApp.mp3',
                    at: time._d.getTime(),
                    icon: 'file://assets/img/snoozeBig.png'
                }).then(function (result) {
                    //Message.showMessage('הגדרת התראה לקטגוריה', 'KeepItApp', 'אישור');
                    App.closeTheApp();
                });

                $rootScope.$on('$cordovaLocalNotification:click', function (event, notification, state) {
                    View.changeView('question');
                });
            }

            document.addEventListener('deviceready', snooze, false);
        }

        $scope.setLink = function (name, id, color, icon) {
            localStorage.setItem('selectedCategory', name);
            localStorage.setItem('selectedCategoryId', id);
            localStorage.setItem('selectedCategoryColor', color);
            localStorage.setItem('selectedCategoryIcon', icon);
        }

        $('.clock').clockpicker({
            'default': 'now',
            donetext: $scope.langString[$scope.lang].addAlarmBtn,
            cancel: $scope.langString[$scope.lang].cancel,
            afterDone: function () {
                $scope.saveAlarm();
            },
            onCancel: function (elem) { return false; }

        });

        $scope.goToQuestion = function () {
            if (localStorage.getItem('selectedCategory') != undefined) {
                $scope.showHidePopup(1);
                View.changeView('question');
            }
        }

        $scope.clearCategoryInfo = function () {
            localStorage.removeItem('selectedCategory');
            localStorage.removeItem('selectedCategoryId');
            localStorage.removeItem('selectedCategoryColor');
            localStorage.removeItem('selectedCategoryIcon');
        }

    },
    question: function ($scope, $rootScope, $interval, $timeout, $cordovaLocalNotification, $cordovaSocialSharing, Switcher, View, Message, App) {
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                addAlarmBtn: 'שמור',
                cancel: 'ביטול',
                ok: 'אישור',
                bonusFirstLine: 'זה בונוס',
                bonusSecondLine: 'אם תענה על התשובה תוך 6 שניות, תקבל את כולו, בכל 6 שניות הבונוס ירד ב 10%',
                popupBtn: 'הבנתי',
                googleText: 'אם אתה לא בטוח לגבי התשובה הנכונה, אנחנו מעודדים אותך לצאת לחקור!',
                correct: {
                    blessing: 'מעולה!',
                    answerText: 'הרווחת הרגע',
                    points: 'נקודות ',
                    oldQuestion: 'פעם שעברה ענית \nנכון על השאלה הזאת,\nענה עליה שוב נכון\nובכך תקבע את המידע\nבראשך',
                    secondTime: 'מעולה!\nענית הרגע על שאלה זו\nבאופן נכון בפעם השנייה.\nעכשיו אנחנו בטוחים\nשלעולם לא תשכח את זה.'
                },
                wrong: {
                    blessing: '',
                    firstLine: 'אל תדאג, אתה תקבל',
                    lastLine: 'הזדמנות נוספת לזכות בנקודות',
                    oldQuestion: 'פעם שעברה ענית\nלא נכון על השאלה הזאת,\nענה עליה נכון הפעם,\nותרוויח את הנקודות\nעל השאלה'
                },
                moreThenOne: 'בשאלה זו ניתן לבחור יותר מתשובה אחת',
                oops: 'בקטגוריה זו אין שאלות חדשות.',
                chooseAnswer: 'אנא בחר תשובה',
                noMore: 'לא ניתן לבחור יותר',
                clueFirst: 'רמז יעלה לך ',
                clueSecond: 'האם תרצה להמשיך?',
                points: 'נקודות.',
                recently: 'לאחרונה \nבנושא זה:',
                intro5sec: 'ענית נכון תוך פחות\nמ 5 שניות.\nלכן אתה מקבל עוד שאלה.',
                popup5sec: 'שאלה נוספת עבור\nתשובה נכונה תוך\nפחות מ-5 שניות!',
                intro2days: 'ענית נכון יומיים ברציפותת,\nלכן אתה מקבל בונוס נוסף!\nחזור מחר, וענה נכון!',
                popup2days: 'בונוס נוסף של ', //בונוס נוסף של 15.1 נקודות עבור יומיים ברציפות
                popup2days_2: ' נקודות עבור\nיומיים ברציפות',
                share: '',
                shareTitle: 'שאלה מאפליקציית KeepitApp'
            },
            en: {
                addAlarmBtn: 'Save',
                cancel: 'Cancel',
                ok: 'OK',
                bonusFirstLine: 'This is a bonus',
                bonusSecondLine: 'If you\'ll answer the question by 6 seconds you\'ll get it all, every 6 seconds 10% of the bonus will gone.',
                popupBtn: 'GOT IT',
                googleText: 'If you are not sure about the right answer, we encourage you to go out and explore!',
                correct: {
                    blessing: 'Great!',
                    answerText: 'You just earned',
                    points: 'pt',
                    oldQuestion: 'Last time, you answered\ncorrectly on this question,\nanswer correctly again\nand you\'ll determaine it in\n your mind',
                    secondTime: 'Great!\nYou just answered\ncorrectly in the second\ntime on this question!\nNow this is in your\nmind for sure.'
                },
                wrong: {
                    blessing: '',
                    firstLine: 'Don\'t worry, you\'ll get another',
                    lastLine: 'chance to earn the points',
                    oldQuestion: 'Last time, you answered\nincorrect on this question,\nanswer correctly this time,\nand you\'ll earn the points\nof this question'
                },
                moreThenOne: 'You can choose more than one answer',
                oops: 'There are not new questions',
                chooseAnswer: 'Please choose an answer',
                noMore: 'You can not select any more',
                clueFirst: 'Clue will cost you ',
                clueSecond: 'Would you like to continue?',
                points: 'Pts.',
                recently: 'Recently in:',
                intro5sec: 'You answered correctly in\nless than 5 seconds. You\nget another question.',
                popup5sec: 'Bonus question for\nanswer correctly in\nless than 5 seconds.',
                intro2days: 'You anwered correctly\ntwo days in a row, so you\nearned an extra bonus!\nCome back tomorrow,\nand answer correct!',
                popup2days: 'Extra bonus of ',
                popup2days_2: ' Pts for,\ntwo days in a row!',
                share: '',
                shareTitle: 'A question from KeepitApp application'
            }
        };
        $scope.pageClass = 'question';
        $scope.bgClass = 'white-bg';
        $scope.catId = localStorage.getItem('selectedCategoryId');
        $scope.catIcon = localStorage.getItem('selectedCategoryIcon');
        $scope.catColor = localStorage.getItem('selectedCategoryColor');
        $scope.pageStyle = 'input[type="checkbox"].multiple:checked + label, input[type="radio"].one-answer:checked + label, .as-sortable-placeholder > label, .clue-v {color:#fff; background-color: ' + $scope.catColor + ' !important}';
        $scope.showPopup = false;
        $scope.bonus = false;
        $scope.google = false;
        $scope.hintPopup = false;
        $scope.oldQuestion = false;
        $scope.secondTimePopup = false;
        $scope.popup5sec;
        $scope.intro5sec;
        $scope.intro2days;
        $scope.popup2days;
        $scope.isNew = true;
        $scope.withCredits = true;
        $scope.bonusCounting;
        $scope.general = false;
        $scope.blessing = '';
        $scope.answerText = '';
        $scope.points = '';
        $scope.wrong = false;
        $scope.multipleAnswers = false;
        $scope.oneAnswer = false;
        $scope.yesOrNo = false;
        $scope.order = false;
        $scope.showHint = false;
        $scope.thisQuestion = {};
        $scope.answersIds = new Array();
        $scope.answerDesc = new Array();
        $scope.count = 0;
        $scope.userAnswers = new Array();
        $scope.usersAnswersIds = new Array();
        $scope.orderAnswers = new Array();
        $scope.dateAnswered = null;
        $scope.timerToBonus = 0;
        $scope.CONST_TIME_TO_ANSWER = 5;
        $scope.CONST_TOTAL_QUESTIONS_PER_SESSION = 2;
        $scope.numberOfQuestionsInSession = 0;
        $scope.timeToAnswer = $scope.CONST_TIME_TO_ANSWER;
        $scope.showOrganization = false;
        $scope.showEndPopup = false;
        $scope.newQuestion = '';
        $scope.answeredQuestion = '';
        $scope.Organizations = {
            None: {
                wrong: '',
                corrent: ''
            },
            Clalit: {
                wrong: 'assets/img/clalit/clalit_heart.png',
                corrent: 'assets/img/clalit/clalit_like.png'
            }
        }

        $scope.getQuestion = function (qType) {
            var data = { userId: localStorage.getItem('userId'), categoryId: $scope.catId, qType: qType, lang: $scope.lang };
            Switcher.getSessions('questionHandler', 'getUserQuestionByCategory', data)
                .success(function (res) {
                    console.log('$scope.thisQuestion', res);
                    if (qType == 'new') {
                        $scope.newQuestion = res;
                    } else {
                        $scope.answeredQuestion = res;
                    }
                })
                .error(function (e) { View.changeView('final'); });
        }

        $scope.setQuestion = function (res) {
            var clear = function () {
                $scope.timeToAnswer = $scope.CONST_TIME_TO_ANSWER;
                $scope.userAnswers = new Array();
                $scope.usersAnswersIds = new Array();
                $scope.answersIds = new Array();
                $scope.answerDesc = new Array();
                $scope.count = 0;
                localStorage.setItem('clueCount', 0);
                localStorage.setItem('userAnsweredThisQuestion', 'false');
                $scope.oldClues = new Array();
                $scope.thisQuestion = {};
                $scope.isNew = '';
                $scope.withCredits = true;
                $scope.bonusCounting;
                $scope.general = false;
                $scope.blessing = '';
                $scope.answerText = '';
                $scope.points = '';
                $scope.wrong = false;
                $scope.multipleAnswers = false;
                $scope.oneAnswer = false;
                $scope.yesOrNo = false;
                $scope.order = false;
                $scope.showHint = false;
                $scope.oldQuestion = false;
                $scope.numberOfQuestionsInSession++;
                angular.element('.one-answer').prop('checked', false);
                angular.element('.multiple').prop('checked', false);
                angular.element('.answer label').removeClass('clue-x').removeClass('clue-v');
            }

            var setAnswersOrder = function () {
                for (var i = 0; i < res.options.split('|').length; i++) {
                    if (res.qTypeId == '4') {
                        $scope.userAnswers.push(res.options.split('|')[i].split('_')[1]);
                    }
                    $scope.orderAnswers.push(i + 1 + '_' + res.options.split('|')[i].split('_')[1]);
                }
            }

            clear();
            setAnswersOrder();

            $scope.thisQuestion = res;
            $scope.thisQuestion.bonus = $scope.thisQuestion.credits / 2;

            switch (res.qTypeId) {
                case '1': { $scope.oneAnswer = true; $scope.multipleAnswers = false; $scope.order = false; } break; //one answer
                case '2': { $scope.multipleAnswers = true; $scope.oneAnswer = false; $scope.order = false; } break; //multiple answers
                case '3': { $scope.oneAnswer = true; $scope.multipleAnswers = false; $scope.order = false; } break; //yes or no
                case '4': { $scope.order = true; $scope.multipleAnswers = false; $scope.oneAnswer = false; jQuery('.ok button').prop('disabled', false).css('opacity', 1); } break; //order
                default: { } break;
            }

            $scope.thisQuestion.clue = $scope.thisQuestion.credits * 0.25;

            for (var i = 0; i < res.options.split('|').length; i++) {
                $scope.answersIds.push(res.options.split('|')[i].split('_')[0]);
                $scope.answerDesc.push(res.options.split('|')[i].split('_')[1]);
            }

            (res.qType == 'answered') ? $scope.showHidePopup('old') : $scope.isNew = true;

            localStorage.setItem('qCountNew', res.qCountNew * 1);
            localStorage.setItem('qCountAnswered', res.qCountAnswered * 1);
            localStorage.setItem('qCountRemain', res.qCountRemain * 1);

            if (localStorage.getItem('showIntro') == undefined) {
                $scope.showHidePopup('bonus');
            } else {
                $scope.startTimeToAnsertInterval();
                $scope.startBonusCalculation($scope.thisQuestion);
            }

            //show question bonus
            (!$scope.isNew && res.answeredCredits * 1 > 0) ? $scope.withCredits = false : null;

            //show hint icon
            (localStorage.getItem('totalCredits') * 1 > 30 && $scope.withCredits && $scope.thisQuestion.qTypeId != '3') ? $scope.showHint = true : null;

            if ($scope.order) {
                var fixNumberPosition = setInterval(function () {
                    if (jQuery('#order-answers').length > 0) {
                        jQuery('.order ul:first-child li').each(function (index) {
                            var liAnswer = jQuery('#order-answers li')[index];
                            var answerHeight = jQuery(liAnswer).css('height');
                            jQuery(this).css('height', answerHeight);
                            jQuery(this).children('label').css('margin-top', answerHeight.split('px')[0] * 0.1);
                        });
                    }
                }, 500);
            }

            if ($scope.isNew && $scope.thisQuestion.qCountNew == '0') {
                $scope.showEndPopup = true;
            }

            $scope.updateLangString();

        }

        $scope.updateLangString = function () {
            if ($scope.oneAnswer) {
                switch ($scope.lang) {
                    case 'he': {
                        $scope.langString[$scope.lang]['wrong'].blessing = 'התשובה הנכונה היא: ';
                    } break;

                    default: { $scope.langString[$scope.lang]['wrong'].blessing = 'The right answer is: '; } break;
                }
            } else if ($scope.multipleAnswers) {
                switch ($scope.lang) {
                    case 'he': {
                        $scope.langString[$scope.lang]['wrong'].blessing = 'התשובות הנכונות הן: ';
                    } break;

                    default: { $scope.langString[$scope.lang]['wrong'].blessing = 'The right answers are: '; } break;
                }
            } else if ($scope.order) {
                switch ($scope.lang) {
                    case 'he': {
                        $scope.langString[$scope.lang]['wrong'].blessing = 'סדר התשובות הנכון הוא: ';
                    } break;

                    default: { $scope.langString[$scope.lang]['wrong'].blessing = 'The right order is: '; } break;
                }
            }

            var msgHe = 'היי, אני משתמש באפליקציית KeepitApp' + '.\n' + 'יש לי שאלה בנושא ' + $scope.thisQuestion.categoryTitle + ' ואני לא יודע מה התשובה הנכונה. אתה יכול לעזור לי? ' + '\n\n';
            msgHe += $scope.thisQuestion.questionDesc + '\n\n והתשובות הן: ' + '\n';
            for (var i = 0; i < $scope.thisQuestion.questionOptions.split('|').length; i++) {
                msgHe += (i + 1) + '. ' + $scope.thisQuestion.questionOptions.split('|')[i] + '\n';
            }

            var msgEn = 'Hi there, I\'m using the KeepitApp application,\nand I have a question that maybe\nyou can help with:\n\n';
            msgEn += $scope.thisQuestion.questionDesc + '\n\n And the answers are: ' + '\n';
            for (var i = 0; i < $scope.thisQuestion.questionOptions.split('|').length; i++) {
                msgEn += (i + 1) + '. ' + $scope.thisQuestion.questionOptions.split('|')[i] + '\n';
            }

            $scope.langString['he'].share = msgHe;
            $scope.langString['en'].share = msgEn;
        }

        $scope.checkConditions = function () {
            var qCountNew = localStorage.getItem('qCountNew') * 1;
            var qCountAnswered = localStorage.getItem('qCountAnswered') * 1;
            var qCountRemain = localStorage.getItem('qCountRemain') * 1;

            $scope.showHidePopup(null);

            if (localStorage.getItem('isCorrect') * 1 == 0) {
                $timeout(function () {
                    View.changeView('final');
                    //angular.element('.popup-overlay').triggerHandler('click');
                }, 100);
            }
            else if ($scope.isNew && qCountNew > 0) {
                if ($scope.timeToAnswer > 1) { //answer before the time is up
                    $scope.newQuestion = '';
                    $scope.getQuestion('new');
                    var setNewQuestionInterval = setInterval(function () {
                        if ($scope.newQuestion != '') {
                            if (typeof $scope.newQuestion === 'object' && $scope.newQuestion != 'null') {
                                $scope.setQuestion($scope.newQuestion);
                            } else {
                                View.changeView('final');
                            }

                            clearInterval(setNewQuestionInterval);
                        }
                    }, 50);
                } else {
                    if ($scope.thisQuestion.id == $scope.answeredQuestion.id) {
                        $scope.answeredQuestion = '';
                        $scope.getQuestion('answered');
                    }

                    var setAnsweredQuestionInterval = setInterval(function () {
                        if ($scope.answeredQuestion != '') {
                            if (typeof $scope.answeredQuestion === 'object' && $scope.answeredQuestion != 'null') {
                                $scope.setQuestion($scope.answeredQuestion);
                            } else {
                                View.changeView('final');
                            }

                            clearInterval(setAnsweredQuestionInterval);
                        }
                    }, 50);
                }
            }
            else {
                //View.changeView('final');
                $timeout(function () {
                    View.changeView('final');
                    //angular.element('.popup-overlay').triggerHandler('click').stopPropagation();
                }, 100);
            }

            //if ((qCountNew == 0 && qCountRemain == 1) || (qCountNew == 1 && qCountRemain == 1)) {
            //    //שאלה אחרונה לא משנה כמה פעמים ניסה לענות עליה
            //    View.changeView('final');
            //}
            //else if ($scope.timeToAnswer > 1 || !$scope.isNew) { //ענה על שאלה בפחות מ 5 שניות או ענה על שאלה ישנה
            //    $scope.timeToAnswer = $scope.CONST_TIME_TO_ANSWER;
            //    $scope.showHidePopup(null);
            //    $scope.getQuestion('new');
            //} else {
            //    //$scope.timeToAnswer = 5;
            //    //$scope.showHidePopup();
            //    View.changeView('final');
            //}
        }

        $scope.googleSearch = function () {
            //var cx = '002673862978533558277:eqqp2uqxpmm';
            //var gcse = document.createElement('script');
            //gcse.type = 'text/javascript';
            //gcse.async = true;
            //gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            //    '//cse.google.com/cse.js?cx=' + cx;
            //var s = document.getElementsByTagName('script')[0];
            //s.parentNode.insertBefore(gcse, s);

            //var cx = '002673862978533558277:eqqp2uqxpmm';
            //var gcse = document.createElement('script');
            //gcse.type = 'text/javascript';
            //gcse.async = true;
            //gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            //    '//cse.google.com/cse.js?cx=' + cx;
            //var s = document.getElementsByTagName('script')[0];
            //s.parentNode.insertBefore(gcse, s);

            var placeholder = setTimeout(function () {
                $('.google-search > input').keydown(function (key) {
                    search = $(this).value();
                    if (key.keyCode == 13) {
                        var link = ($scope.lang == 'he') ? 'https://www.google.co.il#q=' : 'https://www.google.com#q=';
                        window.open(link + search, '_system');
                    }
                });
                clearTimeout(placeholder);
            }, 2000);

        }

        $scope.search = function (event) {
            if (event.keyCode == 13) {
                var link = ($scope.lang == 'he') ? 'https://www.google.co.il#q=' : 'https://www.google.com#q=';
                window.open(link + event.target.value, '_system');
            }
        }

        $scope.startBonusCalculation = function (res) {

            var start = function () {
                if (res.answers != null) { //&& res.qType != 'answered'
                    if (res.answers.split('|').length + res.questionDesc.split(' ').length <= 10) {
                        $scope.timerToBonus = 5;
                    } else if (res.answers.split('|').length + res.questionDesc.split(' ').length >= 80) {
                        $scope.timerToBonus = 15;
                    } else {
                        $scope.timerToBonus = (res.answers.split('|').length + res.questionDesc.split(' ').length + 25) / 7;
                    }

                    var timer = function () {
                        if ($scope.timerToBonus > 0) {
                            $scope.timerToBonus--;
                            setTimeout(timer, 1000);
                        } else {
                            clearTimeout();
                            startBonus();
                        }
                    }

                    var startBonus = function () {
                        console.log('startBonus');
                        var count = 0;
                        $scope.bonusCounting = $interval(function () {
                            if ($scope.thisQuestion.bonus > 0 && count == 6) {
                                var b = $scope.thisQuestion.bonus * 0.9;
                                if (b.toFixed(1) == $scope.thisQuestion.bonus) {
                                    b = 0;
                                }
                                $scope.thisQuestion.bonus = b.toFixed(1);
                                count = 0;
                            } else {
                                if (count < 6) {
                                    count++;
                                } else {
                                    count = 0;
                                }

                                if ($scope.thisQuestion.bonus <= 0) {
                                    $scope.thisQuestion.bonus = 0;
                                    $interval.cancel($scope.bonusCounting);
                                }
                            }
                        }, 1000);
                    }

                    timer();
                }
            }

            var bonusInterval = setInterval(function () {
                if (localStorage.getItem('showIntro') !== null) {
                    clearInterval(bonusInterval);
                    start();
                }
            }, 50);

        }

        $scope.showHidePopup = function (popup) {
            View.scrollToTop();
            switch (popup) {
                case null: {
                    $scope.hideAllPopups();
                    angular.element('body').css('overflow', 'auto');
                } break;
                case 'bonus': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.bonus = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'general': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.general = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'hint': {
                    $scope.hideAllPopups();
                    $scope.hintPopup = true;
                    $scope.showPopup = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'google': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.google = true;
                    localStorage.setItem('showIntro', 'true');
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'old': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.isNew = false;
                    $scope.oldQuestion = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'intro5sec': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.intro5sec = true;
                    $scope.general = true;
                    localStorage.setItem('show5secIntro', 'true');
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'popup5sec': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.popup5sec = true;
                    $scope.general = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'intro2days': {
                    $scope.hideAllPopups();
                    $scope.intro2days = true;
                    $scope.showPopup = true;
                    $scope.general = true;
                    localStorage.setItem('showIntro2days', 'true');
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'popup2days': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.popup2days = true;
                    $scope.general = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'bothPopups5secAnd2days': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.popup2days = true;
                    $scope.popup5sec = true;
                    $scope.general = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'bothIntro5secAnd2days': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.intro2days = true;
                    $scope.intro5sec = true;
                    $scope.general = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                case 'secondTime': {
                    $scope.hideAllPopups();
                    $scope.showPopup = true;
                    $scope.secondTimePopup = true;
                    angular.element('body').css('overflow', 'hidden');
                } break;
                default:

            }
        }

        $scope.hideAllPopups = function () {
            $scope.bonus = false;
            $scope.general = false;
            $scope.google = false;
            $scope.hintPopup = false;
            $scope.showPopup = false;
            $scope.oldQuestion = false;
            $scope.intro5sec = false;
            $scope.intro2days = false;
            $scope.popup2days = false;
            $scope.popup5sec = false;
            $scope.secondTimePopup = false;
        }

        $scope.checkMultiAnswer = function (ans, id) {
            var elem = '[data-id="' + id + '"]';
            if (angular.element(elem).hasClass('clue-x') || angular.element(elem).hasClass('clue-v')) {
                return;
            }

            jQuery('.ok button').prop('disabled', false).css('opacity', 1);
            if ($scope.count < $scope.thisQuestion.options.split('|').length) {
                if ($.inArray(id + '-' + ans, $scope.userAnswers) != -1) { //in the array
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    $scope.userAnswers = $.grep($scope.userAnswers, function (value) { return value != id + '-' + ans });
                    $scope.usersAnswersIds = $.grep($scope.usersAnswersIds, function (value) { return value != id.split('_')[1] });
                    $scope.count--;
                }
                else { //not in the array
                    $scope.count++;
                    $scope.userAnswers.push(id + '-' + ans);
                    $scope.usersAnswersIds.push(id.split('_')[1]);
                    $('[data-id="' + id + '"]').prev('input').prop('checked', true);
                }
            } else {
                if ($.inArray(id + '-' + ans, $scope.userAnswers) != -1) {
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    $scope.userAnswers = $.grep($scope.userAnswers, function (value) { return value != id + '-' + ans });
                    $scope.usersAnswersIds = $.grep($scope.usersAnswersIds, function (value) { return value != id.split('_')[1] });
                    $scope.count--;
                }
                else {
                    $('[data-id="' + id + '"]').prev('input').prop('checked', false);
                    //Message.showMessage($scope.langString[$scope.lang].noMore, 'KeepitApp', $scope.langString[$scope.lang].popupBtn);
                }
            }
        }

        $scope.checkOneAnswer = function (id) {
            var elem = '[data-id="' + id + '"]';
            if (angular.element(elem).hasClass('clue-x') || angular.element(elem).hasClass('clue-v')) {
                return;
            }

            jQuery('.ok button').prop('disabled', false).css('opacity', 1);
            var n = $('[data-id="' + id + '"]').prev('input').attr('name');
            $('radio[name="' + n + '"]').prop('checked', false);
            $('[data-id="' + id + '"]').prev('input').prop('checked', true);
            var ans = $('[data-id="' + id + '"]').prev('input').attr('data-answer');
            $scope.userAnswers = new Array();
            $scope.userAnswers.push(ans);
            $scope.usersAnswersIds = new Array();
            $scope.usersAnswersIds.push(id.split('_')[1]);
        }

        $scope.checkAnswer = function () {
            //stop the bonus
            $interval.cancel($scope.bonusCounting);
            clearInterval($scope.timeToAnswerInterval);

            var questionAnswers = new Array();

            for (var i = 0; i < $scope.thisQuestion.numCorrectAnswers * 1; i++) {
                questionAnswers.push($scope.thisQuestion.answers.split('|')[i].split('_')[1]);
            }

            if ($scope.userAnswers.length > 0) {
                if ($scope.multipleAnswers) {
                    if ($scope.thisQuestion.numCorrectAnswers * 1 == $scope.count) {//check if all the answers are checked
                        //get the users answers
                        var userAnswers = [];
                        for (answer in $scope.userAnswers) {
                            userAnswers.push($scope.userAnswers[answer].split('-')[1]);
                        }
                        //check currect
                        var c = 0;
                        for (var i = 0; i < $scope.count; i++) {
                            (questionAnswers.indexOf(userAnswers[i]) > -1) ? ++c : null;
                        }

                        (c == $scope.count) ? $scope.showCorrectPopup() : $scope.showIncorrectPopup();

                    } else {
                        //alert('לא בחרת את כל התשובות האפשריות');
                        //Message.showMessage($scope.langString[$scope.lang].moreThenOne, 'KeepitApp', $scope.langString[$scope.lang].popupBtn);
                        $scope.showIncorrectPopup();
                    }
                }
                if ($scope.oneAnswer) {
                    if (questionAnswers[0] == $scope.userAnswers[0]) {
                        $scope.showCorrectPopup();
                    } else {
                        $scope.showIncorrectPopup();
                    }
                }
                if ($scope.order) {
                    var userAnswer = $scope.seperateByPip($scope.userAnswers);
                    var correctArray = $scope.thisQuestion.questionOptions.split('|');
                    for (var i = 0; i < $scope.userAnswers.length; i++) {
                        var index = jQuery.inArray($scope.userAnswers[i], correctArray);
                        $scope.usersAnswersIds.push($scope.thisQuestion.questionOptionIds.split('|')[index]);
                    }
                    if (userAnswer == $scope.thisQuestion.answerDesc) {
                        $scope.showCorrectPopup();
                    } else {
                        $scope.showIncorrectPopup();
                    }
                }
            } else {
                //Message.showMessage($scope.langString[$scope.lang].chooseAnswer, 'KeepitApp', $scope.langString[$scope.lang].popupBtn);
            }


        }

        $scope.showCorrectPopup = function () {
            var credits = ($scope.withCredits) ? $scope.calcCredits($scope.thisQuestion.credits, $scope.thisQuestion.bonus) : 0;
            var credits_decimal = credits.toFixed(2);
            if ($scope.thisQuestion.lastAnswerBonus != undefined && $scope.thisQuestion.lastAnswerBonus * 1 > 0) {
                credits += $scope.thisQuestion.lastAnswerBonus * 1;
            }
            $scope.blessing = $scope.langString[$scope.lang]['correct'].blessing;
            $scope.answerText = $scope.langString[$scope.lang]['correct'].answerText;
            $scope.points = ($scope.lang != 'he') ? $scope.langString[$scope.lang]['correct'].points + credits_decimal : credits_decimal + ' ' + $scope.langString[$scope.lang]['correct'].points;
            $scope.wrong = false;

            if ($scope.multipleAnswers) {
                for (var i = 0; i < $scope.userAnswers.length; i++) {
                    $scope.userAnswers[i] = $scope.userAnswers[i].split('-')[1];
                }
            }

            if (!$scope.isNew && !$scope.withCredits) {
                $scope.showHidePopup('secondTime');
            } else {
                $scope.showHidePopup('general');
            }


            $scope.sendAnswer($scope.thisQuestion.questionId, $scope.seperateByPip($scope.userAnswers), $scope.seperateByPip($scope.usersAnswersIds), 1, $scope.thisQuestion.difficulty, credits);
        }

        $scope.showIncorrectPopup = function () {
            $scope.blessing = $scope.langString[$scope.lang]['wrong'].blessing;
            $scope.answerText = '';
            $scope.points = '';
            $scope.wrong = true;
            $scope.showHidePopup('general');

            //console.log('$scope.orderAnswers', $scope.orderAnswers);
            for (var i = 0; i < $scope.thisQuestion.numCorrectAnswers * 1; i++) {
                var answerPosition = 0;
                var correctAnswer = $scope.thisQuestion.answers.split('|')[i].split('_')[1];
                for (var j = 0; j < $scope.orderAnswers.length; j++) {
                    if ($scope.orderAnswers[j].indexOf(correctAnswer) != -1) {
                        answerPosition = $scope.orderAnswers[j].split('_')[0];
                    }
                }
                $scope.points += answerPosition + '. ' + correctAnswer + '\n';
            }

            $scope.sendAnswer($scope.thisQuestion.questionId, $scope.seperateByPip($scope.userAnswers), $scope.seperateByPip($scope.usersAnswersIds), 0, $scope.thisQuestion.difficulty, 0);
        }

        $scope.calcCredits = function (n1, n2) {
            return (n1 * 1) + (n2 * 1);
        }

        $scope.sendAnswer = function (qId, answerDesc, optionId, correct, difficulty, credits) {
            localStorage.removeItem('questionFromAlarm');
            jQuery('.ok button').prop('disabled', true).css('opacity', 0.5);
            localStorage.setItem('isCorrect', correct)
            localStorage.setItem('userAnsweredThisQuestion', 'true');
            if (localStorage.getItem('used5Points') == 'true') {
                localStorage.setItem('used5Points', false);
                credits = credits - 5;
            }
            if ($('.clue-x').length != 0) {
                credits = credits - ($('.clue-x').length * $scope.thisQuestion.clue);
            }
            if ($('.clue-v').length != 0) {
                credits = credits - ($('.clue-v').length * $scope.thisQuestion.clue);
            }
            var data = {
                userId: localStorage.getItem('userId'),
                questionId: qId,
                answerDesc: answerDesc,
                optionId: optionId,
                correct: correct,
                difficulty: difficulty,
                credits: credits,
                categoryId: $scope.thisQuestion.categoryId,
                qType: $scope.thisQuestion.qType,
                qCountNew: $scope.thisQuestion.qCountNew,
                qCountAnswered: $scope.thisQuestion.qCountAnswered,
                qCountRemain: $scope.thisQuestion.qCountRemain,
                qCountLevelAnswered: $scope.thisQuestion.qCountLevelAnswered,
                qCountLevelNew: $scope.thisQuestion.qCountLevelNew,
                qCountLevelRemain: $scope.thisQuestion.qCountLevelRemain,
                lang: $scope.lang,
                dateAnswered: moment()
            }
            console.log('answer', data);
            Switcher.getSessions('answerHandler', 'setUserAnswer', data)
            .success(function (res) {
                var currentCredits = localStorage.getItem('totalCredits') * 1;
                localStorage.setItem('totalCredits', currentCredits + data.credits);
                var show2days = ($scope.thisQuestion.isYesterdayCorrect == '1' && $scope.thisQuestion.lastAnswerBonus * 1 > 0) ? true : false;
                var show5sec = ($scope.timeToAnswer >= 1) ? true : false;
                var show2daysIntro = (localStorage.getItem('showIntro2days') == undefined) ? true : false;
                var show5secIntro = (localStorage.getItem('show5secIntro') == undefined) ? true : false;

                if (correct == 1 && !$scope.secondTimePopup && $scope.numberOfQuestionsInSession < $scope.CONST_TOTAL_QUESTIONS_PER_SESSION) {
                    if (show2days && show5sec) { // צריך להציג את שני הפופאפים
                        if (show2daysIntro && show5secIntro) { //צריך להציג את שני הפופאפים בפעם הראשונה
                            $scope.showHidePopup('bothIntro5secAnd2days');
                        }
                        else if (show2daysIntro && !show5secIntro) { //צריך להציג רק את היומיים ברציפות בפעם הראשונה
                            $scope.showHidePopup('intro2days');
                        }
                        else if (!show2daysIntro && show5secIntro) { //צריך להציג רק את ה5 שניות פעם ראשונה
                            $scope.showHidePopup('intro5sec');
                        }
                        else if (!show2daysIntro && !show5secIntro) { //לא צריך להציג בפעם הראשונה
                            $scope.showHidePopup('bothPopups5secAnd2days');
                        }
                    }
                    else if (show2days) { // צריך להציג רק את יומיים ברציפות
                        if (show2daysIntro) { //צריך להציג בפעם הראשונה
                            $scope.showHidePopup('intro2days');
                        } else { // לא צריך להציג בפעם הראשונה
                            $scope.showHidePopup('popup2days');
                        }
                    }
                    else if (show5sec) { //צריך להציג רק את חמש שניות
                        if (show5secIntro) { //צריך להציג בפעם הראשונה
                            $scope.showHidePopup('intro5sec');
                        } else { // לא צריך להציג בפעם הראשונה
                            $scope.showHidePopup('popup5sec');
                        }
                    }
                }

                if (!show2daysIntro || !show5secIntro) {
                    var t = (correct == 1) ? 5 : 12;
                    popupInterval = setInterval(function () {
                        if (t == 1) {
                            console.log(t);
                            clearInterval(popupInterval);
                            $scope.checkConditions();
                        } else {
                            t--;
                        }
                    }, 1000);
                }
            })
            .error(function (e) { });
        }

        $scope.setQuestionAlarm = function () {
            setTimeout(function () { $('#wheelAlarm').click(); }, 5);
        }

        $scope.shareQuestion = function () {
            var share = function () {
                var link = '';
                $cordovaSocialSharing.share($scope.langString[$scope.lang].share, $scope.langString[$scope.lang].shareTitle, null, link).then(function (result) {
                    //Message.showMessage('שיתפת בהצלחה', 'KeepItApp', 'אישור');
                }, function (err) {
                    //Message.showMessage('ארעה תקלה בתהליך השיתוף', 'KeepItApp', 'אישור');
                });
            }

            document.addEventListener('deviceready', share, false);
        }

        $scope.onDropComplete = function (index, obj, evt) {
            var otherObj = $scope.userAnswers[index];
            var otherIndex = $scope.userAnswers.indexOf(obj);
            $scope.userAnswers[index] = obj;
            $scope.userAnswers[otherIndex] = otherObj;
        }

        $scope.seperateByPip = function (array) {
            var res = '';
            for (var i = 0; i < array.length; i++) {
                if (array[i] == array[array.length - 1]) {// last answer -> don't add pipe (|)
                    res += array[i];
                } else {
                    res += array[i] + '|';
                }
            }
            return res;
        }

        $scope.sortOptions = {
            accept: function (sourceItemHandleScope, destSortableScope) {
                if (!sourceItemHandleScope.itemScope.element[0].hasAttribute('no-drag')) {
                    return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                }
            },//override to determine drag is allowed or not. default is true.
            itemMoved: function (event) { console.log('itemMoved', event); },//Do what you want
            orderChanged: function (event) { console.log('orderChanged', event); },//Do what you want
            containment: '#scrollableD',//optional param.
            scrollableContainer: '#scrollableD',
            clone: false, //optional param for clone feature.
            allowDuplicates: false //optional param allows duplicates to be dropped.
        };

        $scope.startTimeToAnsertInterval = function () {
            $scope.timeToAnswerInterval = setInterval(function () {
                if ($scope.timeToAnswer > 0) {
                    $scope.timeToAnswer--;
                    console.log($scope.timeToAnswer);
                }
                else {
                    console.log($scope.timeToAnswer);
                    clearInterval($scope.timeToAnswerInterval);
                }
            }, 1000);
        }

        $scope.getHint = function () {
            $scope.showHidePopup(null);
            $scope.showHint = false;
            var currentPoints = localStorage.getItem('totalCredits') * 1;
            localStorage.setItem('totalCredits', currentPoints - $scope.thisQuestion.clue);
            var clueCount = (localStorage.getItem('clueCount') != undefined) ? localStorage.getItem('clueCount') * 1 : 0;
            localStorage.setItem('clueCount', clueCount + 1);
            jQuery('.ok button').prop('disabled', false).css('opacity', 1);

            if ($scope.oneAnswer) {
                var incorrectAnswers = $scope.thisQuestion.questionOptionIds.split('|').length - $scope.thisQuestion.answerId.split('|').length
                var checkIfExists = function (thisId) {
                    if ($.inArray(thisId, $scope.oldClues) == -1) {
                        $scope.oldClues.push(thisId);
                        $('.one-answer').each(function (index) {
                            if (index == thisId) {
                                if ($scope.thisQuestion.answerDesc.indexOf($(this).attr('data-answer')) == -1) {
                                    $(this).next().addClass('clue-x');
                                    $(this).prop('disable', true);
                                }
                                else {
                                    var id = Math.floor(Math.random() * incorrectAnswers);
                                    checkIfExists(id);
                                }
                            }
                        });
                    } else {
                        var id = Math.floor(Math.random() * incorrectAnswers);
                        checkIfExists(id);
                    }
                }
                id = Math.floor(Math.random() * incorrectAnswers);
                if ($('.clue-x').length < incorrectAnswers && $scope.oldClues.length < localStorage.getItem('clueCount') * 1) {
                    checkIfExists(id);
                }
            }

            if ($scope.multipleAnswers) {
                var correctAnswers = $scope.thisQuestion.answerId.split('|').length;
                var incorrectAnswers = $scope.thisQuestion.questionOptionIds.split('|').length - $scope.thisQuestion.answerId.split('|').length
                if (correctAnswers > incorrectAnswers) { // תשובות נכונות גדול מתשובות לא נכונות
                    var checkIfExists = function (thisId) {
                        if ($.inArray(thisId, $scope.oldClues) == -1) {
                            $scope.oldClues.push(thisId);
                            $('.multiple').each(function (index) {
                                if (index == thisId) {
                                    if ($scope.thisQuestion.answerDesc.indexOf($(this).attr('data-answer')) != -1) {
                                        $(this).next().addClass('clue-v');
                                        $scope.checkMultiAnswer($(this).attr('name'), $(this).next().attr('data-id'));
                                        $(this).prop('disable', true);
                                    } else {
                                        var id = Math.floor(Math.random() * incorrectAnswers);
                                        checkIfExists(id);
                                    }
                                }
                            });
                        } else {
                            var id = Math.floor(Math.random() * correctAnswers);
                            checkIfExists(id);
                        }
                    }
                    id = Math.floor(Math.random() * correctAnswers);
                    if ($('.clue-v').length < correctAnswers) {
                        checkIfExists(id);
                    }

                }
                else { //תשובות נכונות קטן מתשובות לא נכונות או מספר זהה של תשובות נכונות ולא נכונות
                    var checkIfExists = function (thisId) {
                        if ($.inArray(thisId, $scope.oldClues) == -1) {
                            $scope.oldClues.push(thisId);
                            $('.multiple').each(function (index) {
                                if (index == thisId) {
                                    if ($scope.thisQuestion.answerDesc.indexOf($(this).attr('name')) == -1) {
                                        $(this).next().addClass('clue-x');
                                        $(this).prop('disable', true);
                                    }
                                    else {
                                        var id = Math.floor(Math.random() * incorrectAnswers);
                                        checkIfExists(id);
                                    }
                                }
                            });
                        } else {
                            var id = Math.floor(Math.random() * incorrectAnswers);
                            checkIfExists(id);
                        }
                    }
                    id = Math.floor(Math.random() * incorrectAnswers);
                    if ($('.clue-x').length < incorrectAnswers) {
                        checkIfExists(id);
                    }

                }
            }

            if ($scope.order) {
                var correctAnswer = $scope.thisQuestion.answerDesc.split('|')[0];
                var firstAnswer = $scope.userAnswers[0];
                $scope.userAnswers[0] = correctAnswer;
                for (var i = 1; i < $scope.userAnswers.length; i++) {
                    if ($scope.userAnswers[i].indexOf(correctAnswer) != -1) {
                        $scope.userAnswers[i] = firstAnswer;
                    }
                }

                var orderInterval = setInterval(function () {
                    var li = jQuery('#order-answers li')[0];
                    var label = jQuery('#order-answers li')[0].children[0];
                    if (correctAnswer == label.innerHTML) {
                        clearInterval(orderInterval);
                        $('#order-answers li:first-child label').addClass('clue-v green');
                        $('#order-answers li:first-child').attr('no-drag', '');
                    }
                }, 500);
            }
        }

        $scope.saveAlarm = function () {
            var snooze = function () {
                alert($scope.thisQuestion.id);
                //localStorage.setItem('questionFromAlarm', JSON.stringify($scope.thisQuestion));

                var time = moment();
                time.hours(angular.element('#wheelAlarm')[0].value.split(':')[0] * 1);
                time.minutes(angular.element('#wheelAlarm')[0].value.split(':')[1] * 1);
                $cordovaLocalNotification.schedule({
                    id: 2,
                    title: 'יש לך שאלה לענות עליה',
                    text: 'יש לך שאלה לענות עליה',
                    sound: 'file://assets/sound/KeepitApp.mp3',
                    icon: 'file://assets/img/snoozeBig.png',
                    at: time._d.getTime(),
                    data: {
                        qId: $scope.thisQuestion.id
                    }
                }).then(function (result) {
                    localStorage.setItem('questionFromAlarm', JSON.stringify($scope.thisQuestion));
                    App.closeTheApp();
                    //Message.showMessage('הגדרת התראה לקטגוריה', 'KeepItApp', 'אישור');
                });
            }
            document.addEventListener('deviceready', snooze, false);
        }

        $scope.goToFinalPage = function () {
            try {
                clearInterval(popupInterval);
                if ($scope.wrong) {
                    View.changeView('final');
                } else if (localStorage.getItem('userAnsweredThisQuestion') == 'true') {
                    $scope.checkConditions();
                }
            } catch (e) {
                if ($scope.wrong) {
                    View.changeView('final');
                } else if (localStorage.getItem('userAnsweredThisQuestion') == 'true') {
                    $scope.checkConditions();
                }
            }
        }

        $('.clock').clockpicker({
            'default': 'now',
            donetext: $scope.langString[$scope.lang].addAlarmBtn,
            cancel: $scope.langString[$scope.lang].cancel,
            afterDone: function () {
                $scope.saveAlarm();
            },
            onCancel: function (elem) { return false; }

        });

        $scope.$on('$viewContentLoaded', function () {
            if (localStorage.getItem('questionFromAlarm') !== null) {
                $scope.setQuestion(JSON.parse(localStorage.getItem('questionFromAlarm')));
            } else {
                $scope.getQuestion('answered');
                $scope.getQuestion('new');
                var questionInterval = setInterval(function () {
                    if ($scope.newQuestion != '' && $scope.answeredQuestion != '') {
                        if (typeof $scope.newQuestion === 'object' && $scope.newQuestion != 'null') {
                            $scope.setQuestion($scope.newQuestion);
                        } else if ($scope.answeredQuestion.qCountLevelNew == '0') {
                            $scope.setQuestion($scope.answeredQuestion);
                        } else {
                            View.changeView('final');
                        }

                        clearInterval(questionInterval);
                    }
                }, 50);



                //if (typeof $scope.newQuestion === 'object' && $scope.newQuestion != 'null') {
                //    $scope.setQuestion($scope.newQuestion);
                //} else if ($scope.newQuestion == 'null' && $scope.answeredQuestion.qCountLevelNew == '0') {
                //    $scope.setQuestion($scope.answeredQuestion);
                //}else {
                //    //View.changeView('final');
                //}

                //if (res.dateAnswered != undefined) {
                //    $scope.dateAnswered = moment(res.dateAnswered);
                //}
                //if (typeof res === 'object' && res != 'null') {
                //    if ($scope.dateAnswered != null) { //קיבלתי שאלה ישנה
                //        if ($scope.dateAnswered.format('DD/MM/YYYY') != moment().format('DD/MM/YYYY')) { //שאלה ישנה שלא עניתי עליה היום
                //            $scope.setQuestion(res);
                //        } else { //עניתי על השאלה היום
                //            View.changeView('final');
                //        }
                //    }
                //    else if (res.qType == 'new' && $scope.numberOfQuestionsInSession < $scope.CONST_TOTAL_QUESTIONS_PER_SESSION) { //קיבלתי שאלה חדשה
                //        $scope.setQuestion(res);
                //    } else {
                //        View.changeView('final');
                //    }
                //}
                //else { //res is not an object or res is null
                //    View.changeView('final');
                //}
            }
        });

    },
    final: function ($scope, View) {
        $scope.lang = localStorage.getItem('lang');
        $scope.langString = {
            he: {
                score: 'הציון שלך:',
                back: 'חזור גם מחר ל',
                settings: 'הגדרות',
                more: 'תן לי שאלה נוספת',
                settings: 'הגדרות'
            },
            en: {
                score: 'Your score is:',
                back: 'Come back tomorrow to',
                settings: 'Settings',
                more: 'More question',
                settings: 'Settings'
            }
        };
        $scope.pageClass = 'final';
        $scope.bgClass = 'intro-bg';
        $scope.userName = localStorage.getItem('name');
        $scope.totalCredits = (localStorage.getItem('totalCredits') * 1).toFixed(1);

        $scope.goToSettings = function () {
            View.changeView('settings');
        }

    }
};

keepItApp.controller(controllers);

