export let orangeSkin = new Skin({fill: "#ff7e3e"});
export let yellowSkin = new Skin({fill: "#ffd359"});
export let whiteSkin = new Skin({fill: "white"});

let smallTextStyle = new Style({ font: "bold 15px", color: "white" });

export var currentScreen = null;
export var settingsOverlayScreen = null; 
export let deviceURL;

var analogReader1 = undefined;
var analogReader2 = undefined;
var analogReader3 = undefined;
var analogReader4 = undefined;
var percentWalkComplete = 65;

export let remotePins;

import Pins from "pins";
import { dashboardScreen } from "dashboard";
import { ActMonitorScreen } from "actmonitor";
import { NewRouteContainer, RouteScreen } from "selectwalk";
import { MainContainer } from "selectdog";
import { ConfirmationContainer } from "confirmation";
import { SettingsOverlay } from "settingsoverlay"; 
import { SettingsScreen} from "settings"; 
import { RobotScreen } from "robot";  
import { AccountScreen } from "account";
import { WebcamScreen } from "webcam";   
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
    getMap(cornerURLs, false, "");
    if (remotePins){
        if (analogReader1 == undefined && analogReader2 == undefined && analogReader3 == undefined && analogReader4 == undefined){
            var analogReader1 = remotePins.repeat("/analog1/read", 10, function(result){
                    application.main.spacer.col.line1.completed.innercol.line.label.string = String(Math.round(result*100));
                    // updateCurrLocation(result, cornerURLs);
                });
            var analogReader2 = remotePins.repeat("/analog2/read", 10, function(result){
                    application.main.spacer.col.line1.distance.innercol.line.label.string = String((result*10).toFixed(1))});
            var analogReader3 = remotePins.repeat("/analog3/read", 10, function(result){
                    application.main.spacer.col.line2.steps.innercol.line.label.string = String(Math.round(result*1000))});
            var analogReader4 = remotePins.repeat("/analog4/read", 10, function(result){
                    application.main.spacer.col.line2.heartrate.innercol.line.label.string = String(Math.round(result*100))});
        }
    }
}
function getMap(cornersArr, bool, latlonarr){
    getLatLonFourCorners(cornersArr, function(array){
        trace("arr: " + array + "\n");
        var mapurl = createMapsURLfromLatLon2(array, bool, latlonarr);
        trace(mapurl + "\n");
        getMapsImg(mapurl, function(image){
            let mapIm = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
            application.main.spacer.col.add(mapIm);
        })
    });
}

// function updateCurrLocation(reading, cornersArr){
//     var val = Math.round(reading*100);
//     trace("VALUE: " + val + "\n");
//     if (val <= 25){
//         if (percentWalkComplete > 25){
//             getMap(cornersArr, true, cornersArr[0]);
//             percentWalkComplete = 0;
//         }
//     }else if (val > 25 && val <= 50){
//         trace("In check 2a\n");
//         if (percentWalkComplete <= 25 || percentWalkComplete > 50){
//             trace("In check 2b\n");
//             getMap(cornersArr, true, cornersArr[1]);
//             percentWalkComplete = 25;
//         }
//     }else if (val > 50 && val <= 75){
//         if (percentWalkComplete <= 50 || percentWalkComplete > 75){
//             getMap(cornersArr, true, cornersArr[2]);
//             percentWalkComplete = 50;
//         }
//     }else if (val > 75){
//         if (percentWalkComplete <= 75){
//             getMap(cornersArr, true, cornersArr[3]);
//             percentWalkComplete = 75;
//         }
//     }
// }

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
    let dashImage = new Picture({left: 0, right: 0, url: "assets/livefeed.png"});
    application.dashboard.spacer.dash.livefeed.add(dashImage);
    let activitiesImage = new Picture({url: "assets/activitiesmonitor.png"});
    application.dashboard.spacer.dash.views.left.add(activitiesImage);
    let estimatesImage = new Picture({url: "assets/estimates.png"});
    application.dashboard.spacer.dash.views.right.add(estimatesImage);
}

export function loadSettings(){
    application.remove(currentScreen);
    currentScreen = new SettingsScreen();
    application.add(currentScreen);
}

export function loadRobot(){
    application.remove(currentScreen);
    currentScreen = new RobotScreen();
    application.add(currentScreen);
}

export function loadAccount(){
    application.remove(currentScreen);
    currentScreen = new AccountScreen();
    application.add(currentScreen);
}

export function loadWebcam(imageNumber){
    application.remove(currentScreen);
    currentScreen = new WebcamScreen({image: imageNumber});
    application.add(currentScreen);
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
    }
    onQuit(application) {
        application.shared = false;
        application.forget("dogwalker.device.app");
    }
    onToggleActivitiesMonitorsOn(application){
    }
    onToggleActivitiesMonitorsOff(application){
    }
    onToggleLight(application, value) {
        if (remotePins) remotePins.invoke("/led/write", value);
    }
}
application.behavior = new AppBehavior();


let small = new Style({ font: "18px", color: "black" });
export var borderedSkin = new Skin({
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
                loadMax();
            }
            if ($.string == "New Walk") {
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
        new Picture({url: "assets/background2.png", height: 570, bottom: 0}),
        new ButtonColumnTemplate()
    ]
}));