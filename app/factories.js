
var factories = {
    Switcher: function ($http) {
        var url = 'http://dev.mly.co.il/trivia/switcher.php';

        this.getSessions = function (uHandler, uRequest, uData) {
            console.log('URL',$http.get(url, { params: { handler: uHandler, handlerRequest: uRequest, requestVars: uData }, headers: { 'Authorization': function () { return null; } } }));
            return $http.get(url, { params: { handler: uHandler, handlerRequest: uRequest, requestVars: uData }, headers: { 'Authorization': function () { return null; } } });
        };

        return this;
    },
    View: function ($location) {
        this.changeView = function (view) {
            localStorage.setItem('cUrl', view);
            localStorage.setItem('oldUrl', $location.url());
            $location.url(view);
        }

        this.scrollToTop = function () {
            angular.element('body')[0].scrollTop = 0;
        }
        return this;
    },
    Message: function () {
        this.showMessage = function (message, title, btn) {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                navigator.notification.alert(message, null, title, btn);
            } else {
                alert(message);
            }
        }
        this.showConfirm = function (message, title, btns) {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                var callback = function (buttonIndex) {
                    //alert(buttonIndex);
                    return buttonIndex;
                }
                navigator.notification.confirm(message, callback, title, [btns.yes, btns.no]);
            } else {
                return confirm(message);
            }
        }
        return this;
    },
    App: function (View) {
        this.closeTheApp = function () {
            if (device.platform.toLowerCase() == 'android') {
                navigator.app.exitApp();
            } else {
                View.changeView('final');
            }
        }
        return this;
    },
    Files: function () {
        this.updateMediaList = function () {
            alert('updateMediaList');
            window.requestFileSystem(
         LocalFileSystem.PERSISTENT,
         0,
         function (fileSystem) {
             var root = fileSystem.root;
             AppFile.deleteFiles();
             Files.collectMedia(root.fullPath, true);
         },
         function (error) {
             alert('File System Error: ' + error.code);
         });
        }

        this.collectMedia = function (path, recursive, level) {
            alert('in collect Media');
            if (level === undefined)
                level = 0;
            var directoryEntry = new DirectoryEntry('', path);
            if(!directoryEntry.isDirectory) {
                alert('The provided path is not a directory');
                return;
            }
            var directoryReader = directoryEntry.createReader();
            directoryReader.readEntries(
               function (entries) {
                   var appFile;
                   var extension;
                   for (var i = 0; i < entries.length; i++) {
                       if (entries[i].name === '.')
                           continue;

                       extension = entries[i].name.substr(entries[i].name.lastIndexOf('.'));
                       if (entries[i].isDirectory === true && recursive === true)
                           Files.collectMedia(entries[i].fullPath, recursive, level + 1);
                       else if (entries[i].isFile === true && $.inArray(extension, AppFile.EXTENSIONS) >= 0)
                       {
                           appFile = new AppFile(entries[i].name, entries[i].fullPath);
                           appFile.addFile();
                           alert('File saved: ' + entries[i].fullPath);
                       }
                   }
               },
               function(error) {
                   alert('Unable to read the directory. Errore: ' + error.code);
               }
            );

            if (level === 0)
                $(document).trigger('endupdate');
            alert('Current path analized is: ' + path);
        }

        this.createFilesList = function (idElement, files) {
            jQuery('#' + idElement).empty();

            if (files == null || files.length == 0) {
                jQuery('#' + idElement).append('<p>No files to show. Would you consider a files update (top right button)?</p>');
                return;
            }

            function getPlayHandler(file) {
                //return function playHandler() {};
            }

            function getDeleteHandler(file) {
                return function deleteHandler() {
                    var oldLenght = AppFile.getAppFiles().length;
                    var $parentUl = jQuery(this).closest('ul');

                    file = new AppFile('', file.fullPath);
                    file.deleteFile();
                    if (oldLenght === AppFile.getAppFiles().length + 1) {
                        jQuery(this).closest('li').remove();
                        $parentUl.listview('refresh');
                    }
                    else {
                        console.log('Media not deleted. Something gone wrong.');
                        alert('Media not deleted. Something gone wrong so please try again.');
                    }
                };
            }

            var $listElement, $linkElement;
            files.sort(AppFile.compareIgnoreCase);
            for (var i = 0; i < files.length; i++) {
                $listElement = jQuery('<li>');
                $linkElement = jQuery('<a>');
                $linkElement
                .attr('href', '#')
                .text(files[i].name)
                .click(getPlayHandler(files[i]));

                // Append the link to the <li> element
                $listElement.append($linkElement);

                $linkElement = jQuery('<a>');
                $linkElement
                .attr('href', '#')
                .text('Delete')
                .click(getDeleteHandler(files[i]));

                // Append the link to the <li> element
                $listElement.append($linkElement);

                // Append the <li> element to the <ul> element
                jQuery('#' + idElement).append($listElement);
            }
        }

        return this;
    }
};

keepItApp.factory(factories);

