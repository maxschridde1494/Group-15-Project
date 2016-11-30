import { currentScreen, loadErikConfirmationPage, orangeSkin, yellowSkin, whiteSkin } from "main";
import { 
    Button,
    ButtonBehavior 
} from 'buttons';

let backgroundPhoto = new Texture("assets/background.png");

let backgroundSkin = new Skin({
      height: 1136, width: 725,
      texture: backgroundPhoto,
      fill: "white",
      aspect: "fit"
});

let dog1Photo = new Texture("assets/dog1.png");

let dog1Skin = new Skin({
      width: 150, height: 150,
      texture: dog1Photo,
      fill: "white",
      aspect: "fit"
});

let dog2Photo = new Texture("assets/dog2.png");

let dog2Skin = new Skin({
      width: 150, height: 150,
      texture: dog2Photo,
      fill: "white",
      aspect: "fit"
});

let dog3Photo = new Texture("assets/dog3.png");

let dog3Skin = new Skin({
      width: 150, height: 150,
      texture: dog3Photo,
      fill: "white",
      aspect: "fit"
});

export var text0Template = Column.template($ => ({
    left: 0, right: 0, top: 10,
    contents: [
        Label($, {  
            left: 0, right: 0, top: 80, height: 35, 
            style: new Style({ font: "bold 35px", color: "#000000" }), 
            string: "Who Is Joining?" 
        }),
    ]
}));

var text1label = new Label({left:0, right:0, height:40, string:"Pepper", style: new Style({ font: "bold 15px", color: "#000000" })});


export var text1Template = Column.template($ => ({
    left: 0, right: 0, top: 230,
    contents: [
        text1label,
    ]
}));

let mainButton1 = new Content({ 
    top: 150, left: 115, height: 100, width: 100, active: true,
    skin: dog1Skin, 
    Behavior: class extends ButtonBehavior {
        onTap(button){
          loadErikConfirmationPage(); 
        }
    }
});

var text2label = new Label({left:0, right:0, height:40, string:"Snowball", style: new Style({ font: "bold 15px", color: "#000000" })});


export var text2Template = Column.template($ => ({
    left: 0, right: 0, top: 350,
    contents: [
        text2label,
    ]
}));

var text3label = new Label({left:0, right:0, height:40, string:"Big Head", style: new Style({ font: "bold 15px", color: "#000000" })});


export var text3Template = Column.template($ => ({
    left: 0, right: 0, top: 470,
    contents: [
        text3label,
    ]
}));

let mainButton2 = new Content({ 
    top: 270, left: 115, height: 100, width: 100, active: true,
    skin: dog2Skin, 
    Behavior: class extends ButtonBehavior {
        onTap(button){
          loadErikConfirmationPage(); 
        }
    }
});

let mainButton3 = new Content({ 
    top: 390, left: 115, height: 100, width: 100, active: true,
    skin: dog3Skin, 
    Behavior: class extends ButtonBehavior {
        onTap(button){
          loadErikConfirmationPage(); 
        }
    }
});

let mainCon = new Content({ 
    top: 0, left: 0, height: 880, width: 560, 
    skin: backgroundSkin, 
});

export let MainContainer = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    active: true, state: 0,
    contents: [
        mainCon,
        text0Template(),
        mainButton1,
        text1Template(),
        mainButton2,
        text2Template(),
        mainButton3,
        text3Template(),
    ],
}));