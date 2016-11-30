import { currentScreen, orangeSkin, whiteSkin, settingsOverlayScreen, loadRobot, loadAccount, loadWebcam} from "main";
import { SettingsOverlay } from "settingsoverlay"; 
import { ButtonBehavior } from 'buttons';

var peachSkin = new Skin({ fill: "#FFF8EE" });
var darkPeachSkin = new Skin({ fill: "#FFE4B3" });
var normalText = new Style( { font: "26px", color: "black" });

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});

var forwardIcon = Picture.template($ => ({
    left: $.leftDistance, height: 20, top: 15, url: "assets/forwardArrow.png"
}));

var labelTemplate = Label.template($=>({ left: 60, top: 10, string: $.txt,     		style: normalText }))

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

var DogsButtons = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, active: true, skin: darkPeachSkin, 
    contents: [
        new labelTemplate({txt: "My dogs"}),
        new forwardIcon({leftDistance: 140}),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	//TODO: weave together with dog page
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

var i = 0; 
export var displayWebcam = false; 

//citation: http://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function delayLoop () {           //  create a loop function   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
   	  if (!displayWebcam) {
   	  	return
   	  }
   	  loadWebcam(i.toString());       i++;                     //  increment the counter      if (i > 25) {            //  if the counter < 10, call the loop function	      i = 0;              //  ..  again which will trigger another       } 
      delayLoop(); 
         }, 100)}

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
        	delayLoop(); 
        }
    }
}));

var DogIcon = Picture.template($ => ({
    right: 0, url: "assets/dogSideways.png"
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


// Templates
var navBarSize = 40;
var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new settingsIcon(),
        new settingsText()
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
        new DogIcon()
    ]
}));