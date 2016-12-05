import { currentScreen, loadErikConfirmationPage, orangeSkin, yellowSkin, 
    whiteSkin, loadGabe } from "main";
var titleStyle = new Style({font: '26px', color: 'black'});
var titleFont = new Style({font: "30px ABeeZee", color: 'white'})

import { Button, ButtonBehavior } from 'buttons';

var dogLabelStyle = new Style({font: "bold 15px ABeeZee", color: "black" });

var dog1url = ""
var dog2url = ""
var dog3url = ""

var dog1name = ""
var dog2name = ""
var dog3name = ""

var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
Files.deleteDirectory(uri, true);

function readSavedRoutes(){
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
    var dogs = [];
    var info, iterator = new Files.Iterator(uri);
    while (info = iterator.getNext()){
        var currPath = uri + info.path;
        var dog = Files.readJSON(currPath);
        trace(dog.name + "\n");
        trace(dog.image + "\n");
        dogs.push(dog);
        //do something with route
    }
    return dogs;
}

var dogs = readSavedRoutes();
var numberofdogs = dogs.length;

if (numberofdogs == 1) {
    dog1name = dogs[0].name;
    dog1url = dogs[0].image;
}

if (numberofdogs == 2) {
    dog1name = dogs[0].name;
    dog1url = dogs[0].image;
    dog2name = dogs[1].name;
    dog2url = dogs[1].image;
}

if (numberofdogs >= 3) {
    dog1name = dogs[0].name;
    dog1url = dogs[0].image;
    dog2name = dogs[1].name;
    dog2url = dogs[1].image;
    dog3name = dogs[2].name;
    dog3url = dogs[2].image;
}

var dogDic = {
    dog1name: dog1url,
    dog2name: dog2url,
    dog3name: dog3url
};

function generateDogs() {
    for (var d in dogDic) {
        trace("image url: " + dogDic[d] + "\n")
    }   
}

// var dog1 = new Skin({
//       width: 135, height: 135, fill: "white", aspect: "fit",
//       texture: new Texture(dogDic["Pepper"])
// });

// var dog2 = new Skin({
//       width: 135, height: 135, fill: "white", aspect: "fit",
//       texture: new Texture(dogDic["Snowball"])
// });

// var dog3 = new Skin({
//       width: 135, height: 135, fill: "white", aspect: "fit",
//       texture: new Texture(dogDic["Big Head"])
// });

var dogButton = Content.template($ => ({ 
    top: 0, left: 0, right: 0, height: 80, width: 80, active: true,
    skin: $.dogSkin,
    Behavior: class extends ButtonBehavior {
        onTap(button){
            loadErikConfirmationPage(); 
        }
    }
}));

var dogContainer = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        new dogButton({dogSkin: $.dogSkin}),
        new Label({left: 0, right: 0, top: 5, bottom: 5, height: 15, 
            string: $.string, style: dogLabelStyle})
    ]
}));

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
            loadGabe();
        }
    }
}));

var navBarSize = 40;
var TitleTemplate = Label.template($ => ({
    left: 0, right: 25, top: 0, bottom: 0,
    style: titleStyle,
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

export var text0Template = Column.template($ => ({
    left: 0, right: 0, top: 10, bottom: 10,
    contents: [
        Label($, {  
            left: 0, right: 0, top: 10,
            style: new Style({ font: "30px ABeeZee", color: 'black' }), 
            string: "Who Is Joining?" 
        }),
    ]
}));

export var MainContainer = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, skin: new Skin({fill: "#ffd359"}),
    active: true, state: 0,
    contents: [
        new NavTop({txt: "Select Dog"}),
        text0Template(),
        new dogContainer({dogSkin: dog1, string: "Pepper"}),
        new dogContainer({dogSkin: dog2, string: "Snowball"}),
        new dogContainer({dogSkin: dog3, string: "Big Head"}),
        new NavBot({txt: "Next"}),
    ],
}));

// export var MainContainer = new ScreenTemplate({screenContent: new SelectDog()});
