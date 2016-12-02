export let orangeSkin = new Skin({fill: "#ff7e3e"});
export let yellowSkin = new Skin({fill: "#ffd359"});
export let whiteSkin = new Skin({fill: "white"});

let smallTextStyle = new Style({ font: "bold 15px", color: "white" });

export var currentScreen = null;
export let deviceURL;
var analogReader1 = undefined;
var analogReader2 = undefined;
var analogReader3 = undefined;
var analogReader4 = undefined;

export let remotePins;

import Pins from "pins";
import { dashboardScreen } from "dashboard";
import { ActMonitorScreen } from "actmonitor";
import { NewRouteContainer, RouteScreen } from "selectwalk";
import { MainContainer } from "selectdog";
import { ConfirmationContainer } from "confirmation";
import { createMapsUrl, createLatLongURLfromAddress, 
    createLatLongURLfromCorner, createMapsURLfromLatLon2, getMapsImg, getLatLonFourCorners, parseAddress, parseCorner } from "maps";
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

export function loadActMonitor(){
    application.remove(currentScreen);
    currentScreen = new ActMonitorScreen();
    application.add(currentScreen);
    let dogIm = new Picture({left: 200, height: 80, bottom: 0, url: "assets/flippedDogMain.png"});
    application.main.spacer.add(dogIm);
    application.main.spacer.col.line1.completed.innercol.line.label2.string = "%";
    application.main.spacer.col.line1.distance.innercol.line.label2.string = "miles";
    application.main.spacer.col.line2.heartrate.innercol.line.label2.string = "bpm";
    var cornerURL1 = createLatLongURLfromCorner("W Clark Ave|N Pass Ave,Burbank,CA", "|");
    var cornerURL2 = createLatLongURLfromCorner("W Clark Ave|Evergreen Street,Burbank,CA", "|");
    var cornerURL3 = createLatLongURLfromCorner("W Magnolia Blvd|Evergreen Street,Burbank,CA", "|");
    var cornerURL4 = createLatLongURLfromCorner("N Pass Ave|W Magnolia Blvd,Burbank,CA", "|");
    var cornerURLs = [cornerURL1, cornerURL2, cornerURL3, cornerURL4]
    getLatLonFourCorners(cornerURLs, function(arr){
        trace("arr: " + arr + "\n");
        var mapurl = createMapsURLfromLatLon2(arr)
        trace(mapurl + "\n");
        getMapsImg(mapurl, function(image){
            let mapIm = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
            application.main.spacer.col.add(mapIm);
        })
    });
    if (remotePins){
        if (analogReader1 == undefined && analogReader2 == undefined && analogReader3 == undefined && analogReader4 == undefined){
            var analogReader1 = remotePins.repeat("/analog1/read", 10, function(result){
                    application.main.spacer.col.line1.completed.innercol.line.label.string = String(Math.round(result*100))});
            var analogReader2 = remotePins.repeat("/analog2/read", 10, function(result){
                    application.main.spacer.col.line1.distance.innercol.line.label.string = String((result*10).toFixed(1))});
            var analogReader3 = remotePins.repeat("/analog3/read", 10, function(result){
                    application.main.spacer.col.line2.steps.innercol.line.label.string = String(Math.round(result*1000))});
            var analogReader4 = remotePins.repeat("/analog4/read", 10, function(result){
                    application.main.spacer.col.line2.heartrate.innercol.line.label.string = String(Math.round(result*100))});
        }
    }
}

export function closeAnalogs(){
    if (analogReader1 && analogReader2 && analogReader3 && analogReader4){
        analogReader1.close();
        analogReader1 = undefined;
        analogReader2.close();
        analogReader2 = undefined;
        analogReader3.close();
        analogReader3 = undefined;
        analogReader4.close();
        analogReader4 = undefined;
    }
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

        // /*STATE PLAYGROUND --> store JSON objects as .json files in preferencesDirectory*/
        // var uri = mergeURI(Files.preferencesDirectory, application.di + ".dogs/");
        // // Clear out the "/dogs/" directory.
        // if (Files.exists(uri)){
        //     Files.deleteDirectory(uri, true);
        //     Files.ensureDirectory(uri); //creates the new directory with path: file:///Users/nimda/Library/Preferences//fsk/1/app.companion.dog-prototype.dogs/
        // }

        // /*JSON Objects*/
        // var dog1 = { name: "Jerry", 
        //              walks: { 
        //                 first: {start: "LA", end: "SF"},
        //                 second: {start: "Burbank", end: "Calabasas"},
        //              } 
        // };
        // var dog2 = { name: "Schredr", 
        //              walks: { 
        //                 first: {start: "Burbank", end: "Calabasas"}
        //              } 
        // };
        // var dog3 = { name: "GG", 
        //              walks: { 
        //                 first: {start: "SLO", end: "CAL"}
        //              } 
        // };

        // // write JSON object files to ...dogs/ directory
        // var dogs = [dog1, dog2, dog3]
        // for (var i = 0; i < dogs.length; i++){
        //     var dogFileName = dogs[i].name + ".json";
        //     var uriDog = mergeURI(Files.preferencesDirectory, application.di + ".dogs/" + dogFileName);
        //     Files.writeJSON(uriDog, dogs[i]);
        // }

        // /*read JSON objects using directory iterator*/
        // // Recursively iterate through the kinoma/apps directory.
        // var iterateDirectory = function(path) {
        //     var info, iterator = new Files.Iterator(path);
        //     while (info = iterator.getNext()) {
        //         trace(path + info.path + "\n");
        //         var currURI = path + info.path;
        //         var dog = Files.readJSON(currURI);
        //         trace("Current Dog: " + dog.name + "\n");
        //     }
        // }
        // iterateDirectory(uri);

        // /*Example of how to delete a JSON object file*/
        // var deletedURI = uri + dogs[1].name + ".json";
        // Files.deleteFile(deletedURI);
        // trace("\nIterate through again AFTER DELETING " + dogs[1].name + "\n");
        // iterateDirectory(uri);

    }
    onQuit(application) {
        application.shared = false;
        application.forget("dogwalker.device.app");
    }
    onToggleActivitiesMonitorsOn(application){
        if (remotePins){
            if (analogReader1 == undefined && analogReader2 == undefined && analogReader3 == undefined && analogReader4 == undefined){
                var analogReader1 = remotePins.repeat("/analog1/read", 10, function(result){
                        currentScreen.main.spacer.col.line1.completed.label.string = result;
                // var analogReader2 = 
                // var analogReader3 = 
                // var analogReader4 = 
                });
            }
        }
    }
    onToggleActivitiesMonitorsOff(application){
        if (analogReader1 && analogReader2 && analogReader3 && analogReader4){
            analogReader1.close();
            analogReader1 = undefined;
            analogReader2.close();
            analogReader2 = undefined;
            analogReader3.close();
            analogReader3 = undefined;
            analogReader4.close();
            analogReader4 = undefined;
        }
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