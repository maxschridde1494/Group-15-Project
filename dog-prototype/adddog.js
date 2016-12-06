import { currentScreen, whiteSkin, settingsOverlayScreen, loadRobot, loadAccount, loadWebcam, loadEric} from "main";
import { SettingsOverlay } from "settingsoverlay";
import { 
    Button,
    ButtonBehavior 
} from 'buttons';

import {
    FieldScrollerBehavior, 
    FieldLabelBehavior
} from './field';

import KEYBOARD from './keyboard';

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});

var dogName = "";
var dogImage = "";

let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'black' });
let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });
let small = new Style({ font: "20px", color: "black" });

let orangeSkin = new Skin({fill: "#ff7e3e"});
let titleFont = new Style({ font: "30px ABeeZee", color: "white" });


/* Navigation Bar */
var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Back Screen\n");
            // MOVE TO PREVIOUS SCREEN HERE
            settingsOverlayScreen = new SettingsOverlay(); 
            application.add(settingsOverlayScreen);
        }
    }
}));

var nextIcon = Picture.template($ => ({
    left: 200, right: 0, height: 15, url: "assets/next.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Next Screen\n");
            // MOVE TO NEXT SCREEN HERE
			saveJson(); 
			readSavedRoutes();
            settingsOverlayScreen = new SettingsOverlay(); 
            application.add(settingsOverlayScreen);
			
        }
    }
}));

export var navBarSize = 40;
var TitleTemplate = Label.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    style: titleFont,
    string: $.string
}));



var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        //new settingsIcon(),
        new TitleTemplate({string: $.txt})
    ]
}));

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon(),
        new nextIcon()
    ]
}));

/*Keyboard*/

let KeyboardField = Container.template($ => ({ 
    width: 240, height: 36, right: 10, left: 10, skin: nameInputSkin, contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: fieldStyle, anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            label.container.hint.visible = (data.name.length == 0);

                            dogName = this.data.name;
                            trace(data.name+"\n");
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: $.hint, name: "hint"
                }),
            ]
        })
    ]
}));

var DogNameLine = Line.template($ => ({
    left: 0, top: 75, right: 0, height: 40, 
    contents: [
        new KeyboardField({name: "", hint: "Input the Name of Your Dog"})
    ]
}));

let backgroundPhoto = new Texture("assets/background.png");

let background2Skin = new Skin({
      height: 1136, width: 725,
      texture: backgroundPhoto,
      fill: "white",
      aspect: "fit"
});

let backgroundSkin = new Skin({fill: "#ffd359"});

let dog1PhotoYellow = new Texture("assets/dog1Yellow.png");
let dog1PhotoOrange = new Texture("assets/dog1Orange.png"); 
let dog2PhotoYellow = new Texture("assets/dog2Yellow.png");
let dog2PhotoOrange = new Texture("assets/dog2Orange.png"); 
let dog3PhotoYellow = new Texture("assets/dog3Yellow.png");
let dog3PhotoOrange = new Texture("assets/dog3Orange.png"); 

let dogSkin1Yellow = new Skin({
      width: 150, height: 150,
      texture: dog1PhotoYellow,
      fill: "white",
      aspect: "fit"
});
let dogSkin1Orange = new Skin({
      width: 150, height: 150,
      texture: dog1PhotoOrange,
      fill: "white",
      aspect: "fit"
});
let dogSkin2Yellow = new Skin({
      width: 150, height: 150,
      texture: dog2PhotoYellow,
      fill: "white",
      aspect: "fit"
});
let dogSkin2Orange = new Skin({
      width: 150, height: 150,
      texture: dog2PhotoOrange,
      fill: "white",
      aspect: "fit"
});
let dogSkin3Yellow = new Skin({
      width: 150, height: 150,
      texture: dog3PhotoYellow,
      fill: "white",
      aspect: "fit"
});
let dogSkin3Orange = new Skin({
      width: 150, height: 150,
      texture: dog3PhotoOrange,
      fill: "white",
      aspect: "fit"
});

var text1label = Label.template($=> ({left:0, right:0, height:40, string:"Select An Avatar", style: new Style({ font: "bold 25px", color: "#000000" })}));


export var text1Template = Column.template($ => ({
    left: 0, right: 0, top: 150,
    contents: [
        new text1label(),
    ]
}));

let mainButton1 = Content.template($=> ({ 
    top: 200, left: 115, height: 100, width: 100, active: true,
    skin: dogSkin1Yellow, 
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	if (dogImage == "") {
        		} else if (dogImage == "assets/dog1Yellow.png"){
        		button.skin = dogSkin1Orange;
        	} else {
        		dogImage = "";
        		button.skin = dogSkin1Yellow;
        	}
        }
    }
}));

var text2label = Label.template($=> ({left:0, right:0, height:40, string:"Snowball", style: new Style({ font: "bold 15px", color: "#000000" })}));


export var text2Template = Column.template($ => ({
    left: 0, right: 0, top: 350,
    contents: [
        new text2label(),
    ]
}));

var text3label = Label.template($=> ({left:0, right:0, height:40, string:"Big Head", style: new Style({ font: "bold 15px", color: "#000000" })}));


export var text3Template = Column.template($ => ({
    left: 0, right: 0, top: 470,
    contents: [
        new text3label(),
    ]
}));

let mainButton2 = Content.template($=> ({ 
    top: 300, left: 115, height: 100, width: 100, active: true,
    skin: dogSkin2Yellow,
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	if (dogImage == "") {
        		dogImage = "assets/dog2Yellow.png"; 
        		button.skin = dogSkin2Orange;
        	} else if (dogImage == "assets/dog2Yellow.png"){
        		dogImage = ""; 
        		button.skin = dogSkin2Yellow;
        	}
        }
    }
}));

let mainButton3 = Content.template($=> ({ 
    top: 400, left: 115, height: 100, width: 100, active: true,
    skin: dogSkin3Yellow,  
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	if (dogImage == "") {
        		dogImage = "assets/dog3Yellow.png"; 
        		trace("1\n") ; 
        		button.skin = dogSkin3Orange; 
        	} else if (dogImage == "assets/dog3Yellow.png"){
        		dogImage = ""; 
        		trace("2\n"); 
        		button.skin = dogSkin3Yellow; 
        	}
        }
    }
}));

let mainCon = Content.template($=> ({ 
    top: 0, left: 0, height: 880, width: 560, 
    skin: backgroundSkin, 
}));


function saveJson(){
    var uriAccountDirectory = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
     Files.ensureDirectory(uriAccountDirectory);
     var uriAccountFile = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
     trace("directory url: " + uriAccountFile + "\n"); 
     var account = { name: dogName, 
      	 image: dogImage, 
     	 walk: "",
   };
   trace("dog url: " + uriAccountFile + dogName + ".json" + "\n");
   Files.writeJSON(uriAccountFile + dogName + ".json", account); 
}

function readSavedRoutes(){
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
    var info, iterator = new Files.Iterator(uri);
    while (info = iterator.getNext()){
        trace(info.path + "\n");
        var currPath = uri + info.path;
        var route = Files.readJSON(currPath);
        trace(route.name + "\n");
        //do something with route
    }
}

export var AddDogScreen = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    active: true, state: 0,
    contents: [
        new mainCon(),
        new text1Template(),
        new mainButton1(),
        new mainButton2(),
        new mainButton3(),
        new DogNameLine(),
        new NavTop({txt: "Add Dog"}),
        new NavBot(),
    ],
    Behavior: class extends Behavior {
        onTouchEnded(content) {
            KEYBOARD.hide();
            content.focus();
        }
    }
}));

