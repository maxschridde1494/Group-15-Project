import Pins from "pins";
import { currentScreen, orangeSkin, yellowSkin, 
    whiteSkin, loadAbi, loadMax } from "main";
import { Button, ButtonBehavior } from 'buttons';
import { ScreenTemplate } from "screenTemplate"
import {newRouteURLObject } from "selectwalk";
import { getMapsImg, saveRoute } from "maps";

// import { dogsChosen } from "selectDog"


var boldText = new Style( { font: "bold 26px", color: "black" });
var normalText = new Style( { font: "24px", color: "black" });
var dogs = {
    "Pepper": "assets/dog1Yellow.png",
    "Snowball": "assets/dog2Yellow.png",
    "Big Head": "assets/dog3Yellow.png"
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
    top: 0, left: 25, right: 0, bottom: 10, height: 30, width: 30, active: true,
    skin: but,
    Behavior: class extends ButtonBehavior {
        onTap(button){
            //trace(dogsChosen + "\n");
            application.distribute("onToggleLight", 1);
            var name;
            var map;
            var markers;
            for (var i=0; i<newRouteURLObject.length; i++){
                if (newRouteURLObject[i][0] == "name") {
                    name = newRouteURLObject[i][1];
                } else if (newRouteURLObject[i][0] == "map") {
                    map = newRouteURLObject[i][1];
                } else if (newRouteURLObject[i][0] == "markers") {
                    markers = newRouteURLObject[i][1];
                }
            }
            var routeJSON = {
                name: name,
                url: map,
                markersArray: markers
            }
            getMapsImg(map, function(image){
                let mapIm = new Picture({height: 100, width: 100, right: 0, left: 0, bottom: 15, top:0, url: image});
                application.confirmationScreen.confirmationBox.col.add(mapIm);
            });
            saveRoute(routeJSON);
            newRouteURLObject = [];
            // loadMax();
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

var labelTemplate = Label.template($=>({ top: $.top, string: $.txt, 
    		style: $.style })); 

export var ConfirmationBox = Column.template($ => ({
    name: "confirmationBox", left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new Column({
            name: "col", left: 20, right: 20, top: 40, bottom: 20, height: 300, skin: whiteSkin,
            contents: [
                new Line({
                    left: 0, right: 0, top: 0, height: 50, skin: orangeSkin,
                    contents: [
                        new dogButton({dogSkin: dog1}),
                        new dogButton({dogSkin: dog2}),
                        new dogButton({dogSkin: dog3})
                    ]
                }),
                new labelTemplate({txt: $.walkName, style: boldText, top: 10}), 
                new labelTemplate({txt: $.month + " " + $.date + ", " + $.start, style: normalText, top: 20}), 
                new labelTemplate({txt: "Duration: " + $.duration, style: normalText, top: 10}), 
            ]
        }),
        new confirmButton()
    ]
}));

export var ConfirmationContainer = ScreenTemplate($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "Confirmation"}),
        new ConfirmationBox(),
        new NavBot({txt: "Next"}),
    ]
}));