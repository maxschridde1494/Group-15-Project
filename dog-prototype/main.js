export let orangeSkin = new Skin({fill: "#ff7e3e"});
export let yellowSkin = new Skin({fill: "#ffd359"});
export let whiteSkin = new Skin({fill: "white"});
export let titleFont = new Style({ font: "30px ABeeZee", color: "white" });

let smallTextStyle = new Style({ font: "bold 15px ABeeZee", color: "white" });
let smallTextStyleBlack = new Style({ font: "bold 15px ABeeZee", color: "black" });

export var currentScreen = null;
export var settingsOverlayScreen = null; 
export let deviceURL;
export var currentWalk = "";

export var accountName = ""; 
export var accountEmail = ""; 
export var accountPhone = ""; 
export var accountAddress = ""; 

export var selectedDogs = []; 

var analogReader1 = undefined;
var analogReader2 = undefined;
var analogReader3 = undefined;
var analogReader4 = undefined;
var percentWalkComplete = 0;

export let remotePins;

import Pins from "pins";
import { dashboardScreen } from "dashboard";
import { ActMonitorScreen } from "actmonitor";
import { NewRouteContainer, RouteScreenContent, stopsExport, city, state, newRouteURLObject, walkName, frequentContainerSelected, frequentContainerSelectedRoute } from "selectwalk";
import { SelectDogContainer, loadDogs, readSavedDogs } from "selectdog";
import { ConfirmationContainer, ConfirmationBox, dogPics, labelTemplate, boldText, normalText } from "confirmation";
import { SettingsOverlay } from "settingsoverlay"; 
import { SettingsScreen} from "settings"; 
import { RobotScreen } from "robot";  
import { AccountScreen } from "account";
import { ScheduleWalkContainer, text1label, text2label, text3label, text4label, Month, Day, Time, Duration, iswalknow} from "schedulewalk";
import { WebcamScreen } from "webcam";   
import { AddDogScreen } from "adddog"; 
import { createLatLongURLfromAddress, createLatLongURLfromCorner, createMapsURLfromLatLon2, createMapsURLfromLatLon, 
    getMapsImg, getLatLonFourCorners, parseAddress, parseCorner, saveRoute, deleteRoute, readSavedRoutes } from "maps";
import { ScheduledWalksContainer } from "viewscheduled";
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

export function loadEric(){
    if (currentScreen != null){
        application.remove(currentScreen);
    }
    currentScreen = new MainContainerTemplate();
    application.add(currentScreen);
    currentWalk = "";
    // deleteDirectory(".routes/");
    // deleteDirectory(".dogs/");
}

export function loadErikConfirmationPage() {
	trace(selectedDogs + "\n"); 
    application.remove(currentScreen);
    let followingScreen = "";
    trace(iswalknow + "\n");
    switch (iswalknow){
    	case 0: 
    		followingScreen = "loadEric"
    		break;
    	case 1:
    		followingScreen = "loadMax"
    		break;
    }
    trace(followingScreen);
    currentScreen = new ScreenTemplate({name: "confirmationScreen", titleTxt: "Confirmation", nextScn: followingScreen, prevScn: "loadScheduleWalk", 
    	screenContent: new ConfirmationBox({walkName: walkName, month: Month, date: Day, start: Time, duration: Duration})});
    application.add(currentScreen);
    dogPics();
}

export function loadGabe(){
    application.remove(currentScreen);
    frequentContainerSelected = false;
    frequentContainerSelectedRoute = "";
    currentScreen = new ScreenTemplate({name: "newRouteScreen", titleTxt: "Select Route", prevScn: "loadEric", nextScn: "loadAbi", screenContent: new RouteScreenContent()});
    application.add(currentScreen);
}

export function readSavedWalks(){
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".scheduledwalks/");
    Files.ensureDirectory(uri);
    var walkObjects = [];
    var info, iterator = new Files.Iterator(uri);
    while (info = iterator.getNext()){
        var currPath = uri + info.path;
        var route = Files.readJSON(currPath);
        walkObjects.push(route);
    }
    return walkObjects;
}

export function loadScheduled(){
    application.remove(currentScreen);
    frequentContainerSelected = false;
    frequentContainerSelectedRoute = "";
    currentScreen = new ScreenTemplate({name: "scheduledScreen", titleTxt: "Scheduled Walks", prevScn: "loadEric", nextScn: "loadEric", screenContent: new ScheduledWalksContainer()});
    application.add(currentScreen);
    var walks = readSavedWalks();
    for (var i=0; i<walks.length; i++){
        var walkcontainer = new Column({
            top: 20, bottom: 0, left: 0, right: 0,
            contents: [
                new labelTemplate({txt: walks[i].name, style: boldText, top: 10}),
                new labelTemplate({txt: walks[i].month + " " + walks[i].day + walks[i].time, style: normalText, top: 10}), 
                new labelTemplate({txt: walks[i].duration, style: normalText, top: 10}),
            ]
        })
        application.scheduledScreen.scheduledWalksContainer.col.add(walkcontainer);
    }
}

export function loadAbi(){
    selectedDogs = [];
    application.remove(currentScreen);
    currentScreen = new ScreenTemplate({name: "selectDog", titleTxt: "Select Dog", prevScn: "loadGabe", nextScn: "loadScheduleWalk", screenContent: new SelectDogContainer()});
    application.add(currentScreen);
    loadDogs();
}

export function loadScheduleWalk(){
    text1label = new Label({left:0, right:0, height:40, string:"Month", style: new Style({ font: "bold 15px", color: "#000000" })});
    text2label = new Label({left:0, right:0, height:40, string:"Day", style: new Style({ font: "bold 15px", color: "#000000" })});
    text3label = new Label({left:0, right:0, height:40, string:"Start Time", style: new Style({ font: "bold 15px", color: "#000000" })});
    text4label = new Label({left:0, right:0, height:40, string:"Duration (in hours)", style: new Style({ font: "bold 15px", color: "#000000" })});
    iswalknow = 0;
    application.remove(currentScreen);
    currentScreen = new ScreenTemplate({titleTxt: "Select Time", prevScn: "loadAbi", nextScn: "loadConfirm", screenContent: new ScheduleWalkContainer()});
    application.add(currentScreen);
}

export function loadActMonitor(corners){
    //corners - array of 4 corner strings
    currMarkerIm = undefined;
    application.remove(currentScreen);
    currentScreen = new ActMonitorScreen();
    application.add(currentScreen);
    let dogIm = new Picture({left: 200, height: 80, bottom: 0, url: "assets/flippedDogMain.png"});
    application.actmonitor.spacer.add(dogIm);
    application.actmonitor.spacer.col.line1.completed.innercol.line.label2.string = "%";
    application.actmonitor.spacer.col.line1.distance.innercol.line.label2.string = "miles";
    application.actmonitor.spacer.col.line2.heartrate.innercol.line.label2.string = "bpm";
    //KEEP THIS - REPLACE THE CORNERURLS BELOW
    // var cornerURLs = [];
    // for (var i=0; i<corners.length; i++){
    //     var url = createLatLongURLfromCorner(corners[i], "|");
    //     cornerURLs.push(url);
    // }
    var maps = readSavedRoutes();
    if (currentWalk == ""){
        trace("Inside empty currentWalk\n");
        if (maps.length > 0){
            var mapUrl = maps[0].url;
            var markersURLArray = maps[0].markers;
            trace("markers array: " + markersURLArray + "\n");
            var mapName = maps[0].name;
            application.actmonitor.spacer.col.title.string = mapName;
            getMapsImg(mapUrl, function(image){
                let mapIm = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
                application.actmonitor.spacer.col.map.add(mapIm);
            });
            generateMarkerImages(markersURLArray);
        }
    }else{
        trace("Inside Current Walk\n");
        for (var m=0; m < maps.length; m++){
            if (maps[m].name == currentWalk){
                var mapUrl = maps[m].url;
                var markersURLArray = maps[m].markers;
                var mapName = maps[m].name;
                application.actmonitor.spacer.col.title.string = mapName;
                getMapsImg(mapUrl, function(image){
                    let mapIm = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
                    application.actmonitor.spacer.col.map.add(mapIm);
                });
                generateMarkerImages(markersURLArray);
            }
        }
    }
    var moved = false;
    if (remotePins){
        // if (analogReader1 == undefined && analogReader2 == undefined && analogReader3 == undefined && analogReader4 == undefined){
        if (analogReader1 == undefined){ 
            analogReader1 = remotePins.repeat("/analog1/read", 10, function(result){
                    application.actmonitor.spacer.col.line1.completed.innercol.line.label.string = String(Math.round(result*100));
                    if (Math.round(result*100) != 50){
                        moved = true;
                    }
                    if (imageCount > 4 && moved == true){
                        updateCurrLocation(result);
                    }
                });
        }
        if (analogReader2 == undefined){
            analogReader2 = remotePins.repeat("/analog2/read", 10, function(result){
                    application.actmonitor.spacer.col.line1.distance.innercol.line.label.string = String((result*10).toFixed(1))});
        }
        if (analogReader3 == undefined){
            analogReader3 = remotePins.repeat("/analog3/read", 10, function(result){
                    application.actmonitor.spacer.col.line2.steps.innercol.line.label.string = String(Math.round(result*1000))});
        }
        if (analogReader4 == undefined){
            analogReader4 = remotePins.repeat("/analog4/read", 10, function(result){
                    application.actmonitor.spacer.col.line2.heartrate.innercol.line.label.string = String(Math.round(result*100))});
        }
    }
}
export var analogReader1 = undefined;
export var analogReader2 = undefined;
export var analogReader3 = undefined;
export var analogReader4 = undefined;

export var markersURLArray = []; //array of urls for 4 intersection marker maps
export var markersImageArray = []; //array of images for 4 intersection marker maps
function getMapNoMarkers(cornersArr){
    // cornersArr - array of intersection strings for geocode api to get lats / lons
    getLatLonFourCorners(cornersArr, function(array){
        var mapurl = createMapsURLfromLatLon2(array, false, "", "");
        getMapsImg(mapurl, function(image){
            let mapIm = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
            application.actmonitor.spacer.col.map.add(mapIm);
        });
        markersURLArray = getMapswithMarkersURLs(array);
        saveRoute({name: "test1", url: mapurl, markersArray: markersURLArray});
        generateMarkerImages(markersURLArray);
    });
}
function getMapswithMarkersURLs(latlonarr){
    //latlonarr - array of intersection lat lon pairs (not urls)
    var imageArr = [];
    var urlsArr = [];
    for (var i=0; i < latlonarr.length; i++){
        if (i == latlonarr.length - 1){
            var url = createMapsURLfromLatLon2(latlonarr, true,[latlonarr[i][0], latlonarr[i][1]], "S");
        }else{
            var url = createMapsURLfromLatLon2(latlonarr, true,[latlonarr[i][0], latlonarr[i][1]], "C");
        }
        urlsArr.push(url);
    }
    return urlsArr;
}
var im1;
var im2; 
var im3;
var im4;
var homeimage;
var imageCount = 0;
var currMarkerIm = undefined;

function generateMarkerImages(urlArr){
    //urlArr - array of urls for Google Maps Static API
    getMapsImg(urlArr[0], function(image){
        im1 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
    });
    getMapsImg(urlArr[1], function(image){
        im2 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
    });
    getMapsImg(urlArr[2], function(image){
        im3 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
    });
    getMapsImg(urlArr[3], function(image){
        im4 = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
    });
    getMapsImg(urlArr[4], function(image){
        homeimage = new Picture({height: 200, width: 200, right: 0, left: 0, bottom: 15, top:0, url: image});
        imageCount++;
    });
}

function updateCurrLocation(reading){
    //simulate location service (update map with % distance walked)
    // if (currMarkerIm){
    //     application.actmonitor.spacer.col.map.remove(currMarkerIm);
    // }
    if (reading == 0 || reading == 1){
        application.actmonitor.spacer.col.map.empty();
        if (homeimage.container != undefined && homeimage.container != homeimage){
                homeimage.container.remove(im3);
            }
        application.actmonitor.spacer.col.map.add(homeimage);
        currMarkerIm = homeimage;
    }else{
        var val = Math.round(reading*100);
        if (val <= 25){
            application.actmonitor.spacer.col.map.empty();
            if (im1.container != undefined && im1.container != im1){
                im1.container.remove(im1);
            }
            application.actmonitor.spacer.col.map.add(im1);
            currMarkerIm = im1;
        }else if (val > 25 && val <= 50){
            application.actmonitor.spacer.col.map.empty();
            if (im2.container != undefined && im2.container != im2){
                im2.container.remove(im2);
            }
            application.actmonitor.spacer.col.map.add(im2);
            currMarkerIm = im2;
        }else if (val > 50 && val <= 75){
            application.actmonitor.spacer.col.map.empty();
            if (im3.container != undefined && im3.container != im3){
                im3.container.remove(im3);
            }
            application.actmonitor.spacer.col.map.add(im3);
            currMarkerIm = im3;
        }else if (val > 75){
            application.actmonitor.spacer.col.map.empty();
            if (im4.container != undefined && im4.container != im4){
                im4.container.remove(im3);
            }
            application.actmonitor.spacer.col.map.add(im4);
            currMarkerIm = im4;
        }
    }
}

export function loadMax(){
    application.remove(currentScreen);
    application.empty();
    var dash = new dashboardScreen();
    currentScreen = dash;
    application.add(currentScreen);
    let dashImage = new Picture({left: 0, right: 0, aspect: "fit", url: "assets/livefeed2.png"});
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

export function loadAddDog(){
    application.remove(currentScreen);
    currentScreen = new AddDogScreen();
    application.add(currentScreen);
}

export function deleteDirectory(directory){
    var uri = mergeURI(Files.preferencesDirectory, application.di + directory);
    trace(uri + "\n"); 
    if (Files.exists(uri)){
        Files.deleteDirectory(uri, true);
        Files.ensureDirectory(uri); //creates the new directory with path: file:///Users/nimda/Library/Preferences//fsk/1/app.companion.dog-prototype.dogs/
    }
}

class AppBehavior extends Behavior{
    onDisplayed(application){
        application.shared = true;
        application.discover("dogwalker.device.app");
    }
    onLaunch(application){
    	//deleteDirectory(".dogs/"); 
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


let small = new Style({ font: "18px ABeeZee", color: "black" });
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
            if ($.string == "Scheduled Walks"){
                loadScheduled();
            }
        }
    }
}));

export var ButtonColumnTemplate = Column.template($ => ({
    left: 20, right: 20, top: 120, bottom: 180,
    contents: [
        new Picture({height: 55, url: "assets/logo.png", bottom: 25}),
        new MyButtonTemplate({string: "New Walk"}),
        new MyButtonTemplate({string: "Current Walk"}),
        new MyButtonTemplate({string: "Scheduled Walks"}),
        new MyButtonTemplate({string: "Settings"})
    ]
}));

export var MainContainerTemplate = Container.template($ => ({
    contents:[
        new Picture({url: "assets/background2.png", height: 570, bottom: 0}),
        new ButtonColumnTemplate()
    ]
}));