var currentScreen;

//Gabe:
function loadGabe(){
    application.remove(currentScreen);
    currentScreen = new RouteScreen({routeSelect: new NewRouteContainer()});
    application.add(currentScreen);
}

function loadEric(){
    application.remove(currentScreen);
    currentScreen = MainContainerTemplate();
    application.add(currentScreen);
}

function loadAbi(){
    application.remove(currentScreen);
    currentScreen = new MainContainer();
    application.add(currentScreen);
}

function loadMax(){
    application.remove(currentScreen);
    var dash = new dashboardScreen();
    currentScreen = dash;
    application.add(currentScreen);
    let dashImage = new Picture({bottom: 5, url: "assets/livefeed.png"});
    application.dashboard.main.dash.livefeed.add(dashImage);
    let activitiesImage = new Picture({url: "assets/activitiesmonitor.png"});
    application.dashboard.main.dash.views.left.add(activitiesImage);
    let estimatesImage = new Picture({url: "assets/estimates.png"});
    application.dashboard.main.dash.views.right.add(estimatesImage);
}

class AppBehavior extends Behavior{
    onDisplayed(application){

    }
    onLaunch(application){
        loadEric();
    }
    onQuit(application) {
        
    }
    onToggle(application){
        trace("Toggled\n");
    }
}
application.behavior = new AppBehavior();

let orangeSkin = new Skin({fill: "#ff7e3e"});
let yellowSkin = new Skin({fill: "#ffd359"});
let whiteSkin = new Skin({fill: "white"});

/*
===========
GABE
===========
*/
var titleScreenSkin = new Skin({fill: "#2f4f4f"});
var mainScreenSkin = new Skin({fill: "white"});
var titleSkin = new Skin ({fill: '#3498db'});
var labelSkin = new Skin({fill: "green"});
var statusSkin = new Skin({fill: ["#66CD00" ,"red"]})
var buttonSkin = new Skin({fill : ["#202020", "#7DBF2E"], borders: {left:5, right:5, top:5, bottom:5}, stroke: "black"});

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '30px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black"});
var buttonStyle = new Style({font: '22px', color: 'white'});
var feedStyle = new Style({font: '30px', color: 'white'});

var RouteSkin = new Skin({
    width: 100, height: 50, texture: new Texture("assets/routeIcon.png"), aspect: "fit"
});

var NavTop = Container.template($ => ({
    left: 0, top: 0, right: 0, height: 60, skin: orangeSkin,
    contents: [
        new Text({left: 0, right: 0, top: 10, bottom: 0, style: titleStyle, string: $.txt })
    ]
}));

var NavBot = Container.template($ => ({
    left: 0, bottom: 0, right: 0, height: 60, skin: orangeSkin, active: true,
    contents: [
        new Text({left: 0, right: 0, top: 10, bottom: 0, style: titleStyle, string: $.txt })
    ],
    Behavior: class extends Behavior{
        onTouchEnded(container){
            loadAbi();
        }
    }

}));


var RouteIcon = Container.template($ => ({
    left: 0, top: 10, right: 0, height: 40, skin: RouteSkin
}));

var NewRouteLabel = Text.template($ => ({
    name: "new_route", left: 0, right: 0, top: 10, bottom: 0, style: labelStyle, string: "New Route", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("New Route\n");
            container.string = "CLICKED";
            FreqRouteLabel.string = "Frequent Route";
            if (labelStatus != "New Route") {
                application.remove(currentScreen);
                currentScreen = new RouteScreen({routeSelect: new NewRouteContainer()});
                application.add(currentScreen);
                labelStatus = "New Route";
            }
        }
    }
}));

var FreqRouteLabel = Text.template($ => ({
    name: "new_route", left: 0, right: 0, top: 10, bottom: 0, style: labelStyle, string: "Frequent Route", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Frequent Route\n");
            container.string = "CLICKED";
            NewRouteLabel.string = "New Route";
            if (labelStatus != "Frequent Route") {
                application.remove(currentScreen);
                currentScreen = new RouteScreen({routeSelect: new FrequentContainer()});
                application.add(currentScreen);
                labelStatus = "Frequent Route"
            }
        }
    }
}));

var labelStatus = "New Route";
var RouteLabels = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, height: 20,
    contents: [
        new NewRouteLabel(),
        new FreqRouteLabel(),
    ]
}));

var NewRouteBox = Container.template($ => ({
    left: 0, top: 10, right: 0, height: 50,
    contents: [
        new Line({
            left: 50, top: 5, right: 0, bottom: 0, height: 20, skin: yellowSkin,
            contents: [
                new Label({left: 0, top: 0, right: 0, bottom: 0, string: "Test"})
            ]
        })
    ]
}));

var NewRouteMap = Container.template($ => ({
    left: 0, top: 20, right: 0, height: 200, skin: orangeSkin
}));

var NewRouteContainer = Column.template($ => ({
    top: 0, left: 10, right: 10, bottom: 5,
    contents: [
        new NewRouteBox(),
        new NewRouteBox(),
        new NewRouteMap(),
    ]
}));

var FrequentMaps = Container.template($ => ({
    left: 0, top: 10, right: 0, height: 150, skin: orangeSkin
}));

var FrequentContainer = Column.template($ => ({
    top: 5, left: 10, right: 10, bottom: 5,
    contents: [
        new FrequentMaps(),
        new FrequentMaps(),
    ]
}));

// Screens
var RouteScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: mainScreenSkin,
    contents: [
        new NavTop({txt: "Select Route"}),
        new RouteIcon(),
        new RouteLabels(),
        $.routeSelect,
        new NavBot({txt: "Next"}),
    ]
}));

/*
========
Eric
========
*/
import { 
    Button,
    ButtonBehavior 
} from 'buttons';
let small = new Style({ font: "18px", color: "black" });
var borderedSkin = new Skin({
    fill: "white",
    borders: {left: 3, right: 3, top: 3, bottom: 3}, 
    stroke: "#ff7e3e"
});
var orangeFill = new Container({
    left: 0, top: 0, right:0, bottom: 0, skin: new Skin({ fill:"#ffd359", }),
});
let MyButtonTemplate = Button.template($ => ({
    top: 10, bottom: 10, left: 40, right: 40,  skin: borderedSkin,
    contents: [
        new Label({left: 0, right: 0, string: $, style: small})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
            if ($ == "Current Walk") {
                trace("hello" + $ + "\n"); 
                loadMax();
            }
            if ($ == "New Walk") {
                trace("bello" + $ + "\n"); 
                loadGabe();
            }
            // application.remove(currentScreen);  // Remove the old screen from the application
            //currentScreen = new keyboardTemplate();  // Make the new screen
            //application.add(currentScreen);  // Add the new screen to the application
        }
    }
}));
var ButtonColumnTemplate = Column.template($ => ({
    left: 20, right: 20, top: 135, bottom: 180,
    contents: [
        new Picture({height: 55, url: "assets/logo.png", bottom: 25}),
        new MyButtonTemplate("Current Walk"),
        new MyButtonTemplate("New Walk"),
        new MyButtonTemplate("Schedule Walk"),
        
    ]
}));

var MainContainerTemplate = Container.template($ => ({
    contents:[
        new Picture({url: "assets/background.png", height: 570, bottom: 0}),
        new ButtonColumnTemplate()
    ]
}));

/*
=======
Abi
=======

*/
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

var text0Template = Column.template($ => ({
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


var text1Template = Column.template($ => ({
    left: 0, right: 0, top: 230,
    contents: [
        text1label,
    ]
}));

let mainButton1 = new Content({ 
    top: 150, left: 115, height: 100, width: 100, 
    skin: dog1Skin, 
});

var text2label = new Label({left:0, right:0, height:40, string:"Snowball", style: new Style({ font: "bold 15px", color: "#000000" })});


var text2Template = Column.template($ => ({
    left: 0, right: 0, top: 350,
    contents: [
        text2label,
    ]
}));

var text3label = new Label({left:0, right:0, height:40, string:"Big Head", style: new Style({ font: "bold 15px", color: "#000000" })});


var text3Template = Column.template($ => ({
    left: 0, right: 0, top: 470,
    contents: [
        text3label,
    ]
}));

let mainButton2 = new Content({ 
    top: 270, left: 115, height: 100, width: 100, 
    skin: dog2Skin, 
});

let mainButton3 = new Content({ 
    top: 390, left: 115, height: 100, width: 100, 
    skin: dog3Skin, 
});

let mainCon = new Content({ 
    top: 0, left: 0, height: 880, width: 560, 
    skin: backgroundSkin, 
});

let MainContainer = Container.template($ => ({
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

/*
========
Max
========
*/
let headlineStyle = new Style({font: 'bold 25px', color: 'white'});
let smallHeadlineStyle = new Style({font: 'bold 15px', color: 'white'});

var navBarButton = Container.template($ => ({
    height: 20, width: 20, left: 5, active: true, exclusiveTouch: true,
    skin: $.skin,
    contents: [    ],
    behavior: Behavior ({
        onTouchBegan: function(container, data){
            // container.label.skin = whiteSkin;
        },
        onTouchEnded: function(container, data){
            // container.label.skin = $.skin;
            loadEric();
        }

    })
}));

let dashboardScreen = Container.template($ => ({
    name: "dashboard",
    top: 0, bottom: 0, left: 0, right: 0,
    active: true, skin: orangeSkin,
    contents: [
    	new Column({
    		name: 'main', top: 0, bottom: 0, right: 0, left: 0,
    		contents: [
    			new Column({
    				name: 'navBar',
    				skin: orangeSkin, height: 25, right: 0, left: 0, top: 5,
    				contents:[
                        new navBarButton({skin: yellowSkin})
    				]
    			}),
    			new Column({
    				name: 'dash', skin: yellowSkin,
    				top: 0, bottom: 5, left: 0, right: 0,
    				contents:[
                        new Label({top: 5, height: 20, style: headlineStyle, string: "Dashboard"}),
                        new Label({height: 20, style: smallHeadlineStyle, string: "Home - South Park"}),
                        new Line({
                            name: 'views', skin: yellowSkin,
                            top: 0, left: 0, right: 0, height: 120,
                            contents:[
                                new Container({
                                    name: 'left', left: 27, right: 5,
                                    contents:[]
                                }),
                                new Container({
                                    name: 'right', left: 5, right: 27,
                                    contents:[]
                                })
                            ]
                        }),
                        new Container({
                            name: 'livefeed', top: 5, bottom: 0, left: 0, right: 0, width: 320, height: 160,
                            skin: yellowSkin, 
                            contents:[]
                        }),
                        new Container({})
    				]
    			}),
                new Column({
                    name: 'bottomNav',
                    skin: orangeSkin, height: 25,
                    contents:[
                        new navBarButton({skin: yellowSkin})
                    ]
                })

    		]
    	})
    ]
}));