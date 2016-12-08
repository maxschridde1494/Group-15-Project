import Pins from "pins";
import { currentScreen, currentWalk, orangeSkin, yellowSkin, 
    whiteSkin, loadAbi, loadMax, selectedDogs } from "main";
import { Button, ButtonBehavior } from 'buttons';
import { ScreenTemplate } from "screenTemplate"
import {newRouteURLObject, frequentContainerSelected, frequentContainerSelectedRoute, walkName } from "selectwalk";
import { getMapsImg, saveRoute, readSavedRoutes } from "maps";
import { readSavedDogs } from "selectdog";
import { iswalknow, Month, Day, Time, Duration } from "schedulewalk";
// import { dogsChosen } from "selectDog"


export var boldText = new Style( { font: "bold 26px", color: "black" });
export var normalText = new Style( { font: "24px", color: "black" });
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

var dogIcon = Picture.template($ => ({
    top: 0, left: 0, right: 0, bottom: 0, height: 75, width: 75,
    url: $.dogPic
}));

/* Confirmation Box */
var but = new Skin({
      width: 400, height: 400, fill: "white", aspect: "fit",
      texture: new Texture("assets/confirmButton.png")
});

export function saveWalk(dict){
    //input is dictionary with 1) name and 2) Google Maps Main url 3) array of Marker Maps URLs
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".scheduledwalks/");
    Files.ensureDirectory(uri)
    var walkJson = {
        name: dict.name,
        month: dict.month,
        day: dict.day,
        time: dict.time,
        duration: dict.duration
    };
    var walkFileName = walkJson.month + ".json";
    trace("walk file name: " + walkFileName + "\n");
    var uriWalk = mergeURI(Files.preferencesDirectory, application.di + ".scheduledwalks/" + walkFileName);
    Files.writeJSON(uriWalk, walkJson);
}

var confirmButton = Content.template($ => ({ 
    top: 0, left: 25, right: 0, bottom: 10, height: 30, width: 30, active: true,
    skin: but,
    Behavior: class extends ButtonBehavior {
        onTap(button){
            //trace(dogsChosen + "\n");
            saveWalk({name: walkName, month: Month, day: Day, time: Time, duration: Duration});
            var name;
            var map;
            var markers;
            if (frequentContainerSelected){
                trace("FREQUENT CONTAINER SELECTED\n");
                var maps = readSavedRoutes();
                for (var z=0; z<maps.length; z++){
                    if (maps[z].name == frequentContainerSelectedRoute){
                        name = maps[z].name;
                        map = maps[z].url;
                        markers = maps[z].markers;
                    }
                }
            }else{
                for (var i=0; i<newRouteURLObject.length; i++){
                    if (newRouteURLObject[i][0] == "name") {
                        name = newRouteURLObject[i][1];
                    } else if (newRouteURLObject[i][0] == "map") {
                        map = newRouteURLObject[i][1];
                    } else if (newRouteURLObject[i][0] == "markers") {
                        markers = newRouteURLObject[i][1];
                    }
                }
            }
            if (iswalknow == 1){   
                application.distribute("onToggleLight", 1);
                currentWalk = name;
            }
            getMapsImg(map, function(image){
                let mapIm = new Picture({height: 100, width: 100, right: 0, left: 0, bottom: 15, top:0, url: image});
                application.confirmationScreen.confirmationBox.col.add(mapIm);
            });
            if (frequentContainerSelected == false){
                trace("saving json\n");
                var routeJSON = {
                    name: name,
                    url: map,
                    markersArray: markers
                }
                saveRoute(routeJSON);
            }
            // saveRoute(routeJSON);
            frequentContainerSelected = false;
            frequentContainerSelectedRoute = "";
            newRouteURLObject = [];
        }
    }
}));

export function dogPics() {
    var dogObjectArray = readSavedDogs(".dogs/");
    trace(dogObjectArray.string + "\n");
    var numberofdogs = dogObjectArray.length;
    var dogDic =[];
    if (numberofdogs  >= 1) {
        var dog1name = dogObjectArray[0].name;
        trace("dogname: " + dog1name + "\n");
        var dog1url = dogObjectArray[0].image;
        dogDic = [[dog1name, dog1url]];
    }

    if (numberofdogs >= 2) {
        var dog2name = dogObjectArray[1].name;
        var dog2url = dogObjectArray[1].image;
        dogDic.push([dog2name, dog2url]);
    }

    if (numberofdogs >= 3) {
        var dog3name = dogObjectArray[2].name;
        var dog3url = dogObjectArray[2].image;
        dogDic.push([dog3name, dog3url]);
    }
    
    for (var k=0; k < dogDic.length; k++){
        trace("CurDog: " + dogDic[k][0] + "\n");
        trace("AllDogs: " + selectedDogs + "\n");

        if (selectedDogs.indexOf(dogDic[k][0]) > -1) {
            var dogCon = new dogIcon({dogPic: dogDic[k][1]});
            application.confirmationScreen.confirmationBox.col.dogs.add(dogCon);
        }
    }
}

export var labelTemplate = Label.template($=>({ top: $.top, string: $.txt, 
    		style: $.style })); 

export var ConfirmationBox = Column.template($ => ({
    name: "confirmationBox", left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new Column({
            name: "col", left: 20, right: 20, top: 40, bottom: 20, height: 300, skin: whiteSkin,
            contents: [
                new Line({
                    name: "dogs", left: 0, right: 0, top: 0, height: 50, skin: orangeSkin,
                    contents: []
                }),
                new labelTemplate({txt: $.walkName, style: boldText, top: 10}), 
                new labelTemplate({txt: $.month + " " + $.date + $.start, style: normalText, top: 20}), 
                new labelTemplate({txt: $.duration, style: normalText, top: 10}), 
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