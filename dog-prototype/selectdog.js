import { currentScreen, loadErikConfirmationPage, orangeSkin, yellowSkin, 
    whiteSkin, loadGabe, selectedDogs } from "main";

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
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
    var dogs = [];
    var info, iterator = new Files.Iterator(uri);
    trace("in read routes method\n");
    while (info = iterator.getNext()){
        var currPath = uri + info.path;
        var dog = Files.readJSON(currPath);
        dogs.push(dog);
    }
    return dogs;
}

export function loadDogs(){
    dogObjectArray = readSavedDogs(".dogs/");
    numberofdogs = dogObjectArray.length;
    var dogDic =[];
    if (numberofdogs == 1) {
        dog1name = dogObjectArray[0].name;
        trace("dogname: " + dog1name + "\n");
        dog1url = dogObjectArray[0].image;
        dogDic = [[dog1name, dog1url]];
    } else if (numberofdogs == 2) {
        dog1name = dogObjectArray[0].name;
        dog1url = dogObjectArray[0].image;
        dog2name = dogObjectArray[1].name;
        dog2url = dogObjectArray[1].image;
        dogDic = [[dog1name, dog1url], [dog2name, dog2url]];
    } else if (numberofdogs >= 3) {
        dog1name = dogObjectArray[0].name;
        dog1url = dogObjectArray[0].image;
        dog2name = dogObjectArray[1].name;
        dog2url = dogObjectArray[1].image;
        dog3name = dogObjectArray[2].name;
        dog3url = dogObjectArray[2].image;
        dogDic = [[dog1name, dog1url], [dog2name, dog2url], [dog3name, dog3url]];
    }
    for (var k=0; k < dogDic.length; k++){
        var dogCon = new dogContainer({dogPic: dogDic[k][1], string: dogDic[k][0]});
        application.selectDog.selectDogContainer.dogContainer.add(dogCon);
    }
}

export var dogsChosen = {
    "Pepper": 0,
    "Snowball": 0,
    "Big Head": 0
};

var dogIcon = Picture.template($ => ({
    top: 0, left: 0, right: 0, bottom: 0, height: 50, width: 50,
    url: $.dogPic
}));

var dogContainer = Container.template($  => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        new Container({
            left: 100, right: 100, top: 10, height: 90, skin: statusSkin, active: true,
            contents: [
                new dogIcon({dogPic: $.dogPic})
            ],
            Behavior: class extends Behavior {
                onTouchEnded(container) {
                	//select cases
                	let orangeReplace = container.first.url.replace("Yellow.png", "Orange.png"); 
                	let yellowReplace = container.first.url.replace("Orange.png", "Yellow.png");
                	if (orangeReplace != container.first.url) { //select case
                		container.first.url = orangeReplace;  
                	} else if (yellowReplace != container.first.url) { //deselect case
                		container.first.url = yellowReplace; 
                	}

                    if (selectedDogs.includes($.string)) {
                        var index = selectedDogs.indexOf($.string); 
                        if (index > -1) {
                            selectedDogs.splice(index, 1); 
                        }
                    } else {
                        selectedDogs.push($.string); 
                    }
                    trace(selectedDogs + "\n"); 
                	

                	
                    
                    // dogsChosen[$.string] = !dogsChosen[$.string];
                    trace($.string + " Dog Touched\n");
                    // trace(dogsChosen[$.string] + "\n");
                    //container.state = !container.state;
                }
            }
        }),
        new Label({left: 0, right: 0, top: 110, height: 15, 
            string: $.string, style: dogLabelStyle})
    ]
}));


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

