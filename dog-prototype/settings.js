import { currentScreen, orangeSkin, whiteSkin, settingsOverlayScreen, loadRobot, loadAccount, loadWebcam, loadEric} from "main";
import { SettingsOverlay } from "settingsoverlay"; 
import { ButtonBehavior } from 'buttons';
export var displayWebcam = false; 

var peachSkin = new Skin({ fill: "#FFF8EE" });
var darkPeachSkin = new Skin({ fill: "#FFE4B3" });
var normalText = new Style( { font: "26px", color: "black" });

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});

var forwardIcon = Picture.template($ => ({
    left: $.leftDistance, height: 20, top: 15, url: "assets/forwardArrow.png"
})); 

var labelTemplate = Label.template($=>({ left: 60, top: 10, string: $.txt, 
    		style: normalText }))

var AccountButtons = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, active: true, skin: peachSkin, 
    contents: [
        new labelTemplate({txt: "My account"}),
        new forwardIcon({leftDistance: 108}),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	loadAccount();  
        }
    }
}));
import { MainContainer } from "adddog";

var DogsButtons = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, active: true, skin: darkPeachSkin, 
    contents: [
        new labelTemplate({txt: "My dogs"}),
        new forwardIcon({leftDistance: 140}),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	//TODO: weave together with dog page
            application.remove(currentScreen);
            currentScreen = new MainContainer();
            application.add(currentScreen);
        }
    }
}));

var RobotButtons = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, active: true, skin: peachSkin, 
    contents: [
        new labelTemplate({txt: "My robot"}),
        new forwardIcon({leftDistance: 137}),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	loadRobot();   
        }
    }
}));


var AboutButtons = Line.template($ => ({
    left: 0, top: 0, bottom: 5, right: 0, active: true, skin: darkPeachSkin, 
    contents: [
        new labelTemplate({txt: "About Walkie"}),
        new forwardIcon({leftDistance: 90}),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	i = 0;
        	displayWebcam = true; 
        	loadWebcam(i.toString()); 
        	delayLoop(); 
        }
    }
}));

var DogIcon = Picture.template($ => ({
    right: -10, height: 270, url: "assets/dogSideways.png"
}));

//Will need to use as part of the template on most screens
var settingsIcon = Picture.template($ => ({
    left: 5, height: 20, url: "assets/settings.png", active: true, 
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            settingsOverlayScreen = new SettingsOverlay(); 
        	application.add(settingsOverlayScreen);  
        }
    }
}));



var settingsText = Picture.template($ => ({
    left: 80, height: 35, url: "assets/settingsText.png"
}));

var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            // MOVE TO PREVIOUS SCREEN HERE
            loadEric();
        }
    }
}));



// Templates
var navBarSize = 40;
var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new settingsIcon(),
        new settingsText()
    ]
}));

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon()
    ]
}));

// Screens
export var SettingsScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: peachSkin,
    contents: [
        new NavTop(),
        new AccountButtons(),
        new DogsButtons(),
        new RobotButtons(),
        new AboutButtons(),
        new DogIcon(),
        new NavBot()
    ]
}));