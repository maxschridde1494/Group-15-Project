export let orangeSkin = new Skin({fill: "#ff7e3e"});
export let yellowSkin = new Skin({fill: "#ffd359"});
export let whiteSkin = new Skin({fill: "white"});

export var currentScreen = null;

import { dashboardScreen } from "dashboard";
import { NewRouteContainer, RouteScreen } from "selectwalk";
import { MainContainer } from "selectdog";
import { 
    Button,
    ButtonBehavior 
} from 'buttons';

export function loadEric(){
    if (currentScreen != null){
        application.remove(currentScreen);
    }
    currentScreen = new MainContainerTemplate();
    application.add(currentScreen);
}

export function loadGabe(){
    application.remove(currentScreen);
    currentScreen = new RouteScreen({routeSelect: new NewRouteContainer()});
    application.add(currentScreen);
}

export function loadAbi(){
    application.remove(currentScreen);
    currentScreen = new MainContainer();
    application.add(currentScreen);
}

export function loadMax(){
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


let small = new Style({ font: "18px", color: "black" });
var borderedSkin = new Skin({
    fill: "white",
    borders: {left: 3, right: 3, top: 3, bottom: 3}, 
    stroke: "#ff7e3e"
});

export let MyButtonTemplate = Button.template($ => ({
    top: 10, bottom: 10, left: 40, right: 40,  skin: borderedSkin,
    contents: [
        new Label({left: 0, right: 0, string: $.string, style: small})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
            if ($.string == "Current Walk") {
                trace("hello" + $.string + "\n"); 
                loadMax();
            }
            if ($.string == "New Walk") {
                trace("bello" + $.string + "\n"); 
                loadGabe();
            }
        }
    }
}));
export var ButtonColumnTemplate = Column.template($ => ({
    left: 20, right: 20, top: 135, bottom: 180,
    contents: [
        new Picture({height: 55, url: "assets/logo.png", bottom: 25}),
        new MyButtonTemplate({string: "Current Walk"}),
        new MyButtonTemplate({string:"New Walk"}),
        new MyButtonTemplate({string:"Schedule Walk"})
    ]
}));

export var MainContainerTemplate = Container.template($ => ({
    contents:[
        new Picture({url: "assets/background.png", height: 570, bottom: 0}),
        new ButtonColumnTemplate()
    ]
}));