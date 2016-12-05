import { currentScreen, loadErikConfirmationPage, orangeSkin, yellowSkin, 
    whiteSkin, loadGabe } from "main";

import { Button, ButtonBehavior } from 'buttons';

var titleStyle = new Style({font: '26px ABeeZee', color: 'white'});
var titleFont = new Style({font: "30px ABeeZee", color: 'white'})
var dogLabelStyle = new Style({font: "20px ABeeZee", color: "white" });
var statusSkin = new Skin({fill: ["transparent" ,"red"]})

var dog1url = ""
var dog2url = ""
var dog3url = ""

var dog1name = ""
var dog2name = ""
var dog3name = ""
export var dogObjectArray = [];
export var numberofdogs = 0;

export function readSavedDogs(){
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
    Files.ensureDirectory(uri)
    // if (Files.exists(uri)){
    //     Files.deleteDirectory(uri, true);
    //     Files.ensureDirectory(uri); //creates the new directory with path: file:///Users/nimda/Library/Preferences//fsk/1/app.companion.dog-prototype.dogs/
    // }
    // for (var i=0; i<3; i++){
    //     var account = {
    //         name: "testDog" + String(i + 1),
    //         image: "assets/dog" + String(i + 1) + ".png"
    //     };
    //     trace("dog name: " + account.name + " dog image: " + account.image + "\n");
    //     var dogFileName = account.name + ".json";
    //     var uriDog = mergeURI(Files.preferencesDirectory, application.di + ".dogs/" + dogFileName);
    //     trace("json uri: " + uriDog + "\n");
    //     Files.writeJSON(uriDog, account);
    // }
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
    var dogs = [];
    var info, iterator = new Files.Iterator(uri);
    trace("in read routes method\n");
    while (info = iterator.getNext()){
        trace("in loop\n");
        var currPath = uri + info.path;
        var dog = Files.readJSON(currPath);
        trace(dog.name + "\n");
        trace(dog.image + "\n");
        dogs.push(dog);
    }
    return dogs;
}

export function loadDogs(){
    dogObjectArray = readSavedDogs(".dogs/");
    numberofdogs = dogObjectArray.length;
    var dogDic;
    if (numberofdogs == 1) {
        dog1name = dogObjectArray[0].name;
        dog1url = dogObjectArray[0].image;
        dogDic = {
            dog1name: dog1url
        };
    } else if (numberofdogs == 2) {
        dog1name = dogObjectArray[0].name;
        dog1url = dogObjectArray[0].image;
        dog2name = dogObjectArray[1].name;
        dog2url = dogObjectArray[1].image;
        dogDic = {
            dog1name: dog1url,
            dog2name: dog2url
        };
    } else if (numberofdogs >= 3) {
        dog1name = dogObjectArray[0].name;
        dog1url = dogObjectArray[0].image;
        dog2name = dogObjectArray[1].name;
        dog2url = dogObjectArray[1].image;
        dog3name = dogObjectArray[2].name;
        dog3url = dogObjectArray[2].image;
        dogDic = {
            dog1name: dog1url,
            dog2name: dog2url,
            dog3name: dog3url
        };
    }
    for (var d in dogDic){
        trace("dog dic value (image url): " + dogDic[d] + "\n");
        // var dogPic = new dogSkinTemplate({url: dic[d]});
        // var dogPic = new Skin({
        //       top: 10, width: 135, height: 135, fill: "white", aspect: "fit",
        //       texture: new Texture(dogDic[d])
        // });
        // var dogCon = new dogContainer({dogSkin: dogPic, string: d});
        var dogCon = new dogContainer({dogPic: dogDic[d], string: d});
        application.selectDogContainer.dogContainer.add(dogCon);
    }
}

export var dogsChosen = {
    "Pepper": 0,
    "Snowball": 0,
    "Big Head": 0
};

var dogIcon = Picture.template($ => ({
    top: 0, left: 0, right: 0, bottom: 0, height: 75, width: 75,
    url: $.dogPic
}));
// var dogButton = Content.template($ => ({ 
//     top: 0, left: 0, right: 0, height: 80, width: 80, active: true,
//     skin: $.dogSkin,
//     Behavior: class extends ButtonBehavior {
//         onTap(button){
//             loadErikConfirmationPage(); 
//         }
//     }
// }));

var dogContainer = Column.template($  => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        new Container({
            left: 100, right: 100, top: 0, bottom: 0, skin: statusSkin, active: true,
            contents: [
                new dogIcon({dogPic: $.dogPic})
            ],
            // Behavior: class extends Behavior {
            //     onTouchEnded(container) {
            //         // dogsChosen[$.string] = !dogsChosen[$.string];

            //         trace($.string + " Dog Touched\n");
            //         // trace(dogsChosen[$.string] + "\n");
            //         container.state = !container.state;
            //     }
            // }
        }),
        new Label({left: 0, right: 0, top: 5, bottom: 0, height: 15, 
            string: $.string, style: dogLabelStyle})
    ]
}));

// /* Navigation Bar */
// var settingsIcon = Picture.template($, => ({
//     left: 5, height: 20, url: "assets/settings.png"
// }));

// var backIcon = Picture.template($ => ({
//     left: 10, height: 20, url: "assets/backButton.png", active: true,
//     Behavior: class extends Behavior {
//         onTouchEnded(container) {
//             trace("Back Screen\n");
//             // MOVE TO PREVIOUS SCREEN HERE
//             loadGabe();
//         }
//     }
// }));

// export var navBarSize = 40;
// var TitleTemplate = Label.template($ => ({
//     left: 0, right: 25, top: 0, bottom: 0,
//     style: titleStyle,
//     string: $.string
// }));

// var NavTop = Line.template($ => ({
//     left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
//     contents: [
//         new settingsIcon(),
//         new TitleTemplate({string: $.txt})
//     ]
// }));

// var NavBot = Line.template($ => ({
//     left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
//     contents: [
//         new backIcon(),
//     ]
// }));

export var text0Template = Column.template($ => ({
    left: 0, right: 0, top: 10, 
    contents: [
        Label($, {  
            left: 0, right: 0, top: 10,
            style: new Style({ font: "30px ABeeZee", color: 'white' }), 
            string: "Who Is Joining?" 
        }),
    ]
}));

export var SelectDogContainer = Column.template($ => ({
    name: "selectDogContainer", top: 0, bottom: 0, left: 0, right: 0, skin: new Skin({fill: "#ffd359"}),
    active: true, state: 0,
    contents: [
        // new NavTop({txt: "Select Dog"}),
        new text0Template(),
        new Column({
            name: "dogContainer", top: 0, bottom: 0, left: 0, right: 0,
            contents: []
        }),
        // new dogContainer({dogSkin: dog1, string: "Pepper"}),
        // new dogContainer({dogSkin: dog2, string: "Snowball"}),
        // new dogContainer({dogSkin: dog3, string: "Big Head"}),
        // new NavBot({txt: "Next"}),
    ],
}));

// export var MainContainer = Column.template($ => ({
//     top: 0, bottom: 0, left: 0, right: 0, skin: new Skin({fill: "#ffd359"}),
//     active: true, state: 0,
//     contents: [
//         new NavTop({txt: "Select Dog"}),
//         text0Template(),
//         new dogContainer({dogPic: dogs["Pepper"], string: "Pepper"}),
//         new dogContainer({dogPic: dogs["Snowball"], string: "Snowball"}),
//         new dogContainer({dogPic: dogs["Big Head"], string: "Big Head"}),
//         new NavBot({txt: "Next"}),
//     ],
// }));

// export var MainContainer = new ScreenTemplate({screenContent: new SelectDog()});

