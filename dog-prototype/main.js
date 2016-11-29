export let orangeSkin = new Skin({fill: "#ff7e3e"});
export let yellowSkin = new Skin({fill: "#ffd359"});
export let whiteSkin = new Skin({fill: "white"});

export var currentScreen = null;
export let deviceURL;

let remotePins;

import Pins from "pins";
import { dashboardScreen } from "dashboard";
import { NewRouteContainer, RouteScreen } from "selectwalk";
import { MainContainer } from "selectdog";
import { ConfirmationContainer } from "confirmation";
import { 
    Button,
    ButtonBehavior 
} from 'buttons';

Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        trace("Companion Found the device.\n");
        deviceURL = JSON.parse(message.requestText).url;
        handler.invoke(new Message(deviceURL + "respond"), Message.TEXT);    
    },
    onComplete: function(handler, message, text){
        trace("Response was: " + text + "\n");
    }
}));
Handler.bind("/respond", Behavior({
    onInvoke: function(handler, message){
        message.responseText = "Device, you found me!";
        message.status = 200;    
    }
}));

export function loadEric(){
    if (currentScreen != null){
        application.remove(currentScreen);
    }
    currentScreen = new MainContainerTemplate();
    application.add(currentScreen);
}

export function loadErikConfirmationPage() {
    application.remove(currentScreen);
    currentScreen = new ConfirmationContainer();
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
        application.shared = true;
        application.discover("dogwalker.device.app");
    }
    onLaunch(application){
        loadEric();
        let discoveryInstance = Pins.discover(
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Connecting to remote pins\n");
                    remotePins = Pins.connect(connectionDesc);
                }
            }, 
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Disconnected from remote pins\n");
                    remotePins = undefined;
                }
            }
        );
        // trace("starting write\n");
        // var uri = mergeURI(application.url, "license.txt");
        // var licenseText = Files.readText(uri);
        // trace(licenseText + "\n");
        // var uri2 = mergeURI(Files.documentsDirectory, "input.txt");
        // Files.writeText(uri2, licenseText);
        // trace('written\n');
        // trace('about to read\n');
        // var readText = Files.readText(uri2);
        // trace("read text: " + readText + "\n");
        // trace(application.di + "\n");
        // trace("about to append\n");
        // var uri = mergeURI(Files.documentsDirectory, "input.txt");
        // Files.appendText(uri, " Twice.");
        // var readText = Files.readText(uri);
        // trace("read text: " + readText + "\n");

        /*JSON*/
        var dog1 = { name: "Jerry", 
                     walks: { 
                        first: {start: "LA", end: "SF"},
                        second: {start: "Burbank", end: "Calabasas"},
                     } 
        };
        var walk1 = {start: "LA", end: "SF"};
        var walk2 = {start: "Burbank", end: "Calabasas"};
        var dogfilename = dog1.name + ".json";
        var walksfilename = "walks.json";
        var uriDogs = mergeURI(Files.preferencesDirectory, application.di + "." + dogfilename);
        Files.writeJSON(uriDogs, dog1);
        var dog = Files.readJSON(uriDogs);
        trace(dog.name + " is walking from " + dog.walks.first.start + " to " + dog.walks.first.end + "!\n");
    }
    onQuit(application) {
        application.shared = false;
        application.forget("dogwalker.device.app");
    }
    onToggle(application){
        trace("Toggled\n");
    }
    onToggleLight(application, value) {
        if (remotePins) remotePins.invoke("/led/write", value);
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