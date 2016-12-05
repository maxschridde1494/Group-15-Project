/* Navigation Bar - Template for a screen with navigation bars

Parameters:
    titleTxt - title text at the top
    nextTxt - next text, default Next
    prevScn - function to previous screen
    nextScn - function to next screen
    screenContent - main content in between navigation bars
*/

import { SettingsOverlay } from "settingsoverlay";
import { loadGabe loadAbi, loadEric, loadMax, loadErikConfirmationPage, settingsOverlayScreen} from "main";

function loadScreen(screen) {
    if (screen == "loadEric")
        loadEric();
    else if (screen == "loadAbi")
        loadAbi();
    else if (screen == "loadMax")
        loadMax();
    else if (screen == "loadConfirm")
        loadErikConfirmationPage();
    else if (screen == "loadGabe")
        loadGabe();
}

var orangeSkin = new Skin({fill: "#ff7e3e"});
var yellowSkin = new Skin({fill: "#ffd359"});
var whiteSkin = new Skin({fill: "white"});
var titleFont = new Style({font: "30px ABeeZee", color: "white"});
var nextFont = new Style({font: "20px ABeeZee", color: "white"});
var navTopSize = 50;
var navBotSize = 40;

var settingsIcon = Picture.template($ => ({
    left: 5, height: 20, url: "assets/settings.png", active: true, 
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            settingsOverlayScreen = new SettingsOverlay(); 
            application.add(settingsOverlayScreen);  
        }
    }
}));

var backIcon = Picture.template($ => ({
    left: 5, width: 40, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Back Screen\n");
            // MOVE TO PREVIOUS SCREEN HERE
            loadScreen($.prevScn);
        }
    }
}));

var nextIcon = Label.template($ => ({
    left: 200, right: 0, width: 40, active: true, style: nextFont, string: $.txt,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Next Screen\n");
            // MOVE TO NEXT SCREEN HERE
            loadScreen($.nextScn);
        }
    }
}));

export var ScreenTemplate = Column.template($ => ({
    name: $.name, left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new Line({
            left: 0, top: 0, right: 0, height: navTopSize, skin: orangeSkin,
            contents: [
                new settingsIcon(),
                new Label({
                    left: 0, right: 25, top: 0, bottom: 0,
                    style: titleFont, string: $.titleTxt
                })
            ]
        }),
        $.screenContent,
        new Line({
            left: 0, bottom: 0, right: 0, height: navBotSize, skin: orangeSkin,
            contents: [
                new backIcon({prevScn: $.prevScn}),
                new nextIcon({txt: "Next", nextScn: $.nextScn}),
            ]
        })
    ]
}));
