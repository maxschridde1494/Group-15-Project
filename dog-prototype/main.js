export let orangeSkin = new Skin({fill: "#ff7e3e"});
export let yellowSkin = new Skin({fill: "#ffd359"});
export let whiteSkin = new Skin({fill: "white"});
export let titleFont = new Style({ font: "30px ABeeZee", color: "white" });

let smallTextStyle = new Style({ font: "bold 15px", color: "white" });

export var currentScreen = null;
export var settingsOverlayScreen = null; 
export let deviceURL;

export var accountName = ""; 
export var accountEmail = ""; 
export var accountPhone = ""; 
export var accountAddress = ""; 

var analogReader1 = undefined;
var analogReader2 = undefined;
var analogReader3 = undefined;
var analogReader4 = undefined;
var percentWalkComplete = 0;

export let remotePins;

import Pins from "pins";
import { dashboardScreen } from "dashboard";
import { ActMonitorScreen } from "actmonitor";
import { NewRouteContainer, RouteScreen, RouteScreenContent } from "selectwalk";
import { MainContainer } from "selectdog";
import { ConfirmationContainer, ConfirmationBox } from "confirmation";
import { SettingsOverlay } from "settingsoverlay"; 
import { SettingsScreen} from "settings"; 
import { RobotScreen } from "robot";  
import { AccountScreen } from "account";
import { ScheduleWalkContainer, text1label, text2label, text3label, text4label } from "schedulewalk";
import { WebcamScreen } from "webcam";   
import { createLatLongURLfromAddress, createLatLongURLfromCorner, createMapsURLfromLatLon2, createMapsURLfromLatLon, 
    getMapsImg, getLatLonFourCorners, parseAddress, parseCorner, saveRoute, deleteRoute, readSavedRoutes } from "maps";
import { 
    Button,
    ButtonBehavior  
} from 'buttons';
import { ScreenTemplate } from "screenTemplate"

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

export function loadScreen(title, next, prev, content, nextTxt){

}

export function loadEric(){
    if (currentScreen != null){
        application.remove(currentScreen);
    }
    currentScreen = new MainContainerTemplate();
    application.add(currentScreen);
}

export function loadErikConfirmationPage() {
    application.remove(currentScreen);
    currentScreen = new ScreenTemplate({titleTxt: "Confirmation", nextScn: "loadMax", prevScn: "loadScheduleWalk", screenContent: new ConfirmationBox()});
    // currentScreen = new ConfirmationContainer();
    application.add(currentScreen);
}

export function loadGabe(){
    application.remove(currentScreen);
    currentScreen = new ScreenTemplate({titleTxt: "Select Route", prevScn: "loadEric", nextScn: "loadAbi", screenContent: new RouteScreenContent()});
    // currentScreen = new RouteScreen({routeSelect: new NewRouteContainer()});
    application.add(currentScreen);
}

export function loadAbi(){
    application.remove(currentScreen);
    currentScreen = new ScreenTemplate({titleTxt: "Select Dog", prevScn: "loadGabe", nextScn: "loadScheduleWalk", screenContent: new MainContainer()});
    // currentScreen = new MainContainer();
    application.add(currentScreen);
}

export function loadScheduleWalk(){
    text1label = new Label({left:0, right:0, height:40, string:"Month", style: new Style({ font: "bold 15px", color: "#000000" })});
    text2label = new Label({left:0, right:0, height:40, string:"Day", style: new Style({ font: "bold 15px", color: "#000000" })});
    text3label = new Label({left:0, right:0, height:40, string:"Start Time", style: new Style({ font: "bold 15px", color: "#000000" })});
    text4label = new Label({left:0, right:0, height:40, string:"Duration (in hours)", style: new Style({ font: "bold 15px", color: "#000000" })});
    application.remove(currentScreen);
    currentScreen = new ScreenTemplate({titleTxt: "Select Time", prevScn: "loadAbi", nextScn: "loadConfirm", screenContent: new ScheduleWalkContainer()});
    // currentScreen = new MainContainer();
    application.add(currentScreen);
}

export function loadActMonitor(corners){
    //corners - array of 4 corner strings
    application.remove(currentScreen);
    currentScreen = new ActMonitorScreen();
    application.add(currentScreen);
    let dogIm = new Picture({left: 200, height: 80, bottom: 0, url: "assets/flippedDogMain.png"});
    application.main.spacer.add(dogIm);
    application.main.spacer.col.line1.completed.innercol.line.label2.string = "%";
    application.main.spacer.col.line1.distance.innercol.line.label2.string = "miles";
    application.main.spacer.col.line2.heartrate.innercol.line.label2.string = "bpm";
    //KEEP THIS - REPLACE THE CORNERURLS BELOW
    // var cornerURLs = [];
    // for (var i=0; i<corners.length; i++){
    //     var url = createLatLongURLfromCorner(corners[i], "|");
    //     cornerURLs.push(url);
    // }
    var cornerURL1 = createLatLongURLfromCorner("W Clark Ave|N Pass Ave,Burbank,CA", "|");
    var cornerURL2 = createLatLongURLfromCorner("W Clark Ave|Evergreen Street,Burbank,CA", "|");
    var cornerURL3 = createLatLongURLfromCorner("W Magnolia Blvd|Evergreen Street,Burbank,CA", "|");
    var cornerURL4 = createLatLongURLfromCorner("N Pass Ave|W Magnolia Blvd,Burbank,CA", "|");
    var cornerURLs = [cornerURL1, cornerURL2, cornerURL3, cornerURL4]
    getMapNoMarkers(cornerURLs);
    var moved = false;
    if (remotePins){
        if (analogReader1 == undefined && analogReader2 == undefined && analogReader3 == undefined && analogReader4 == undefined){
            var analogReader1 = remotePins.repeat("/analog1/read", 10, function(result){
                    application.main.spacer.col.line1.completed.innercol.line.label.string = String(Math.round(result*100));
                    if (Math.round(result*100) != 50){
                        moved = true;
                    }
                    if (imageCount > 3 && moved == true){
                        updateCurrLocation(result);
                    }
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
export var markersURLArray = []; //array of urls for 4 intersection marker maps
export var markersImageArray = []; //array of images for 4 intersection marker maps
function getMapNoMarkers(cornersArr){
    // cornersArr - array of intersection strings for geocode api to get lats / lons
    getLatLonFourCorners(cornersArr, function(array){
        var mapurl = createMapsURLfromLatLon2(array, false, "");
        saveRoute({name: "test1", url: mapurl});
        getMapsImg(mapurl, function(image){
            let mapIm = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
            application.main.spacer.col.map.add(mapIm);
        });
        markersURLArray = getMapswithMarkersURLs(array);
        trace("markersURLArray: " + markersURLArray + "\n");
        generateMarkerImages(markersURLArray);
        trace("should have generated marker images\n");
    });
}
function getMapswithMarkersURLs(latlonarr){
    //latlonarr - array of intersection lat lon pairs (not urls)
    var imageArr = [];
    var urlsArr = [];
    for (var i=0; i < latlonarr.length; i++){
        var url = createMapsURLfromLatLon2(latlonarr, true,[latlonarr[i][0], latlonarr[i][1]]);
        urlsArr.push(url);
    }
    return urlsArr;
}
var im1;
var im2; 
var im3;
var im4;
var imageCount = 0;

function generateMarkerImages(urlArr){
    //urlArr - array of urls for Google Maps Static API
    getMapsImg(urlArr[0], function(image){
        im1 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
        trace("image Counte: " + imageCount + "\n");
    });
    getMapsImg(urlArr[1], function(image){
        im2 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
        trace("image Counte: " + imageCount + "\n");
    });
    getMapsImg(urlArr[2], function(image){
        im3 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
        trace("image Counte: " + imageCount + "\n");
    });
    getMapsImg(urlArr[3], function(image){
        im4 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
        trace("image Counte: " + imageCount + "\n");
    });
}

function updateCurrLocation(reading){
    //simulate location service (update map with % distance walked)
    var val = Math.round(reading*100);
    trace("VALUE: " + val + "\n");
    if (val <= 25){
        application.main.spacer.col.map.empty();
        application.main.spacer.col.map.add(im1);
    }else if (val > 25 && val <= 50){
        application.main.spacer.col.map.empty();
        application.main.spacer.col.map.add(im2);
    }else if (val > 50 && val <= 75){
        application.main.spacer.col.map.empty();
        application.main.spacer.col.map.add(im3);
    }else if (val > 75){
        application.main.spacer.col.map.empty();
        application.main.spacer.col.map.add(im4);
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
    let dashImage = new Picture({left: 0, right: 0, aspect: "fit", url: "assets/livefeed.png"});
    application.dashboard.col.livefeed.add(dashImage);
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
	var accountUri = mergeURI(Files.preferencesDirectory, application.di + ".account/account.json"); 
	if (Files.exists(accountUri)){
        var account = Files.readJSON(accountUri);
        accountName = account.name; 
        accountEmail = account.email; 
        accountPhone = account.phone; 
        accountAddress = account.address; 
    }
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
    top: 7, bottom: 7, left: 40, right: 40,  skin: borderedSkin,
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
            if ($.string == "Settings") {
                loadSettings();
            }
        }
    }
}));

export var ButtonColumnTemplate = Column.template($ => ({
    left: 20, right: 20, top: 100, bottom: 180,
    contents: [
        new Picture({height: 55, url: "assets/logo.png", bottom: 25}),
        new MyButtonTemplate({string: "Current Walk"}),
        new MyButtonTemplate({string:"New Walk"}),
        new MyButtonTemplate({string:"Schedule Walk"}),
        new MyButtonTemplate({string:"Settings"})
    ]
}));

export var MainContainerTemplate = Container.template($ => ({
    contents:[
        new Picture({url: "assets/background2.png", height: 570, bottom: 0}),
        new ButtonColumnTemplate()
    ]
}));