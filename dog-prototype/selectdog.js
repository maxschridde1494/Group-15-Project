import { currentScreen, loadErikConfirmationPage, orangeSkin, yellowSkin, 
    whiteSkin, loadGabe } from "main";
import { Button, ButtonBehavior } from 'buttons';

var titleStyle = new Style({font: '26px ABeeZee', color: 'white'});
var titleFont = new Style({font: "30px ABeeZee", color: 'white'})
var dogLabelStyle = new Style({font: "20px ABeeZee", color: "white" });
var statusSkin = new Skin({fill: ["transparent" ,"red"]})

var dogs = {
    "Pepper": "assets/dog1.png",
    "Snowball": "assets/dog2.png",
    "Big Head": "assets/dog3.png"
};

export var dogsChosen = {
    "Pepper": 0,
    "Snowball": 0,
    "Big Head": 0
};

function generateDogs() {
    for (var d in dogs) {
        trace(d + "\n")
    }   
}

var dogIcon = Picture.template($ => ({
    top: 0, left: 0, right: 0, bottom: 0, height: 75, width: 75,
    url: $.dogPic
}));

var dogContainer = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        new Container({
            left: 100, right: 100, top: 0, bottom: 0, skin: statusSkin, active: true,
            contents: [
                new dogIcon({dogPic: $.dogPic})
            ],
            Behavior: class extends Behavior {
                onTouchEnded(container) {
                    dogsChosen[$.string] = !dogsChosen[$.string];

                    trace($.string + " Dog Touched\n");
                    trace(dogsChosen[$.string] + "\n");
                    container.state = !container.state;
                }
            }
        }),
        new Label({left: 0, right: 0, top: 5, bottom: 0, height: 15, 
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

export var navBarSize = 40;
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
            style: new Style({ font: "30px ABeeZee", color: 'white' }), 
            string: "Who Is Joining?" 
        }),
    ]
}));

export var MainContainer = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, skin: new Skin({fill: "#ffd359"}),
    active: true, state: 0,
    contents: [
        text0Template(),
        new dogContainer({dogPic: dogs["Pepper"], string: "Pepper"}),
        new dogContainer({dogPic: dogs["Snowball"], string: "Snowball"}),
        new dogContainer({dogPic: dogs["Big Head"], string: "Big Head"}),
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