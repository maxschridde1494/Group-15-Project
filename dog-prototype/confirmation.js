import Pins from "pins";
import { currentScreen, orangeSkin, yellowSkin, 
    whiteSkin, loadAbi, loadActMonitor } from "main";
import { Button, ButtonBehavior } from 'buttons';
export let titleFont = new Style({ font: "30px ABeeZee", color: "white" }); 

/* Navigation Bar */
var settingsIcon = Picture.template($ => ({
    left: 5, height: 20, url: "assets/settings.png"
}));

var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Back Screen\n");
            // MOVE TO PREVIOUS SCREEN HERE
            loadAbi();
        }
    }
}));

var navBarSize = 40;
var TitleTemplate = Label.template($ => ({
    left: 0, right: 25, top: 0, bottom: 0,
    style: titleFont,
    string: $.string
}));

var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new settingsIcon(),
        new TitleTemplate({string: $.txt})
    ]
}));

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon(),
    ]
}));

/* Confirmation Box */
var ConfirmationBox = Column.template($ => ({
    left: 25, right: 25, top: 50, bottom: 20, height: 250, skin: orangeSkin,
    contents: [
        new Label({
            left: 0, right: 0, top: 0, 
            style: titleFont,
            string: "Confirmation"
        })
        // INSERT CONTENTS HERE
    ]
}));

var but = new Skin({
      width: 400, height: 400, fill: "white", aspect: "fit",
      texture: new Texture("assets/confirmButton.png")
});

var confirmButton = Content.template($ => ({ 
    top: 0, left: 25, right: 0, bottom: 50, height: 30, width: 30, active: true,
    skin: but,
    Behavior: class extends ButtonBehavior {
        onTap(button){
            application.distribute("onToggleLight", 1);
            loadActMonitor();
        }
    }
}));

export var ConfirmationContainer = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "Confirmation"}),
        new ConfirmationBox(),
        new confirmButton(),
        new NavBot({txt: "Next"}),
    ]
}));