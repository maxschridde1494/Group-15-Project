import { 
    ButtonBehavior 
} from 'buttons';

import { settingsOverlayScreen, loadEric, loadSettings} from "main"; 
import { closeAnalogs } from "actmonitor";

var blackSkin = new Skin({ fill:"#E6000000" });
var normalText = new Style( { font: "40px", color: "#bababa" });

export var SettingsOverlay = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: blackSkin,
    contents: [
    	new settingsBackButton(), 
        new homeButtons(),
        new settingsButtons()
    ]
}));

var homeLabel = Label.template($=>({ left: 10, top: 10,string: "Home", 
    		style: normalText }))
var settingsLabel = Label.template($=>({ left: 10, top: 10,string: "Settings", 
    		style: normalText }))		

var settingsBackButton = Picture.template($ => ({
    left: 7, height: 35, top: 4, url: "assets/settingsBack.png", active: true, 
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	application.remove(settingsOverlayScreen);
        	settingsOverlayScreen = null; 
        }
    }
}));
var homeIcon = Picture.template($ => ({
    left: 10, height: 50, top: 5, url: "assets/homeIcon.png"
}));
var settingsIcon = Picture.template($ => ({
    left: 10, height: 50, top: 5, url: "assets/settingsIcon.png"
}));

var homeButtons = Line.template($ => ({
    left: 3, top: 0, right: 0, active: true,
    contents: [
        new homeIcon(),
        new homeLabel(),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	application.remove(settingsOverlayScreen);
        	settingsOverlayScreen = null; 
            closeAnalogs();
          	loadEric();  
        }
    }
}));

var settingsButtons = Line.template($ => ({
    left: 0, top: 20, right: 0, active: true,
    contents: [
        new settingsIcon(),
        new settingsLabel(),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	application.remove(settingsOverlayScreen);
        	settingsOverlayScreen = null; 
            closeAnalogs();
          	loadSettings();   
        }
    }
}));


