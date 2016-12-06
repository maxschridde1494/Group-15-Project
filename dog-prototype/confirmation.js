import Pins from "pins";
import { currentScreen, orangeSkin, yellowSkin, 
    whiteSkin, loadAbi, loadMax } from "main";
import { Button, ButtonBehavior } from 'buttons';
import { ScreenTemplate } from "screenTemplate"
// import { dogsChosen } from "selectDog"

var dogs = {
    "Pepper": "assets/dog1.png",
    "Snowball": "assets/dog2.png",
    "Big Head": "assets/dog3.png"
};

var dog1 = new Skin({
      width: 135, height: 135, fill: "white", aspect: "fit",
      texture: new Texture(dogs["Pepper"])
});

var dog2 = new Skin({
      width: 135, height: 135, fill: "white", aspect: "fit",
      texture: new Texture(dogs["Snowball"])
});

var dog3 = new Skin({
      width: 135, height: 135, fill: "white", aspect: "fit",
      texture: new Texture(dogs["Big Head"])
});

var dogButton = Content.template($ => ({ 
    top: 5, left: 0, right: 0, height: 40, width: 40, skin: $.dogSkin
}));


/* Confirmation Box */
var but = new Skin({
      width: 400, height: 400, fill: "white", aspect: "fit",
      texture: new Texture("assets/confirmButton.png")
});

var confirmButton = Content.template($ => ({ 
    top: 0, left: 25, right: 0, bottom: 50, height: 30, width: 30, active: true,
    skin: but,
    Behavior: class extends ButtonBehavior {
        onTap(button){
            trace(dogsChosen + "\n");
            application.distribute("onToggleLight", 1);
            loadMax();
        }
    }
}));

function dogPics() {
    var dogsLine = new Line({left: 0, right: 0, top: 0, height: 50, skin: orangeSkin, contents: []});
    dogsLine.contents.add((new dogButton({dogSkin: dog1})));
    // dogsLine.contents.add(new dogButton({dogSkin: dog1}));
    // dogsLine.contents.add(new dogButton({dogSkin: dog1}));
    return dogsLine;
}

export var ConfirmationBox = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new Column({
            left: 25, right: 25, top: 50, bottom: 20, height: 250, skin: whiteSkin,
            contents: [
                new Line({
                    left: 0, right: 0, top: 0, height: 50, skin: orangeSkin,
                    contents: [
                        new dogButton({dogSkin: dog1}),
                        new dogButton({dogSkin: dog2}),
                        new dogButton({dogSkin: dog3})
                    ]
                }),
                // INSERT CONTENTS HERE
            ]
        }),
        new confirmButton()
    ]
}));

// new ScreenTemplate({titleTxt: "Confirmation", nextScn: "loadMax", prevScn: "loadAbi", screenContent: new ConfirmationBox()});

export var ConfirmationContainer = ScreenTemplate($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "Confirmation"}),
        new ConfirmationBox(),
        new confirmButton(),
        new NavBot({txt: "Next"}),
    ]
}));