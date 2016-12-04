import { currentScreen, loadEric, loadActMonitor, MainContainerTemplate, ButtonColumnTemplate, 
            MyButtonTemplate, orangeSkin, yellowSkin, whiteSkin } from "main";
import { navBarSize, settingsIcon } from "selectwalk";

let smallTextStyle = new Style({ font: "bold 15px", color: "white" });
let mediumTextStyle = new Style({ font: "bold 22px", color: "white" });
let largeTextStyle = new Style({ font: "bold 30px", color: "white"});
let orangeSkinBorder = new Skin({fill: "#ff7e3e", borders: {left:1, right:1, top:1, bottom:1}, stroke: "black"});

var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new settingsIcon(),
        new Label({hidden: false, left: 0, right: 0, string: $.string, style: largeTextStyle})
    ]
}));

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon()
    ]
}));

var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            // MOVE TO PREVIOUS SCREEN HERE
            loadEric();
        }
    }
}));

export var dashboardScreen = Container.template($ => ({
    name: "dashboard", top: 0, bottom: 0, left: 0, right: 0, active: true, skin: yellowSkin,
    contents: [
        new Column({
            name: "col", top: 0, bottom: 0, left: 0, right: 0, skin: yellowSkin,
            contents:[
                new NavTop({string: "Dashboard"}),
                new Label({
                    top: 60, left: 40, right: 40, height: 40, skin: orangeSkinBorder, active: true, string: "Activities Monitor", style: mediumTextStyle,
                    Behavior: class extends Behavior{
                        onTouchEnded(container, data){
                            loadActMonitor([]); //here, add the corners of the current walk
                        }
                    }
                }),
                new Container({
                    name: "livefeed", top: 0, bottom: 0, left: 0, right: 0, skin: yellowSkin,
                    contents:
                    []
                }),
                new NavBot({txt: "Next"})
                    ]
                })
    ]
}));