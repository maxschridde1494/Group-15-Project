import { currentScreen, borderedSkin, loadSettings, orangeSkin, yellowSkin, whiteSkin, settingsOverlayScreen} from "main";
import { NavTop} from "selectwalk"; 
import { SettingsOverlay } from "settingsoverlay"; 
import {
    SwitchButton,
    SwitchButtonBehavior
} from 'switch';

import { 
    Button,
    ButtonBehavior 
} from 'buttons';

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});
var normalText = new Style( { font: "26px", color: "black" });
let small = new Style({ font: "20px", color: "black" });

var robotImage = Picture.template($ => ({
    top: 20, height: 290, url: "assets/robot.png",
}));

var robotContainer = Container.template($=>({
    skin: whiteSkin,
    contents: [
    	new robotImage()
    ]
}));

var switchTemplate = SwitchButton.template($ => ({
    height: 50, width: 80, left: 20, 
    Behavior: class extends SwitchButtonBehavior {
    }
}));

var labelTemplate = Label.template($=>({ name: $.name, left: 10, string: $.txt, 
    		style: normalText,

            Behavior: class extends ButtonBehavior {
                updateSpace(content, value){
                    //TODO: Clear associated analog pin? 
                    if ($.name == "space") {
                        content.string = "0%";
                    }
                }
            }

}));

var poopOptions = Line.template($ => ({
    bottom: 0, top: 10, right: 0, left: 10, 
    contents: [
        new labelTemplate({txt: "Auto poops pick-up"}),
        new switchTemplate({ value: 1 }),
    ]
}));


var poopFullness = Line.template($ => ({
    bottom: 0, top: 5, right: 0, left: 10, 
    contents: [
        new labelTemplate({txt: "Space Left:               "}),
        //TODO: this should be replaced with an analog pin read
        new labelTemplate({name: "space", txt: "37%"})
    ]
}));

let buttonTemplate = Button.template($ => ({
    top: 10, bottom: 20, left: 40, right: 40,  skin: borderedSkin,
    contents: [
        new Label({left: 0, right: 0, string: $.string, style: small})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
            //TODO: Clear associated analog pin? 
            application.distribute("updateSpace", 0);
        }
    }
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

var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            loadSettings();
        }
    }
}));

var robotText = Picture.template($ => ({
    left: 50, height: 20, url: "assets/robotText.png"
}));

// Templates
var navBarSize = 40;

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon()
    ]
}));


// Screens
export var RobotScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "My Robot"}),
        new robotContainer(),
        new poopOptions(),
        new poopFullness(),   
        new buttonTemplate({string: "Empty poop container"}), 
        new NavBot(),
    ]
}));