import { currentScreen, loadAbi, loadEric, orangeSkin, yellowSkin, whiteSkin, settingsOverlayScreen} from "main";
import { SettingsOverlay } from "settingsoverlay"; 
import { createLatLongURLfromAddress, createLatLongURLfromCorner, createMapsURLfromLatLon2, createMapsURLfromLatLon, 
    getMapsImgFrequent, getLatLonFourCorners, parseAddress, parseCorner, saveRoute, deleteRoute, readSavedRoutes } from "maps";

import { ScreenTemplate } from "screenTemplate"
import { FieldScrollerBehavior, FieldLabelBehavior } from 'field';
import { SystemKeyboard } from 'keyboard';
import KEYBOARD from './keyboard';

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'scroller';
export var frequentContainerSelected = false;
export var frequentContainerSelectedRoute = "";

let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray', fill: "white"});
let fieldStyle = new Style({ color: 'black', font: 'bold 14px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '14px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });

var blackBorder = new Skin({fill: "white", borders: {left:1, right:1, top:1, bottom:1}, stroke: "black"});
var orangeBorder = new Skin({fill: "white", borders: {left:3, right:3, top:3, bottom:3}, stroke: "#ff7e3e"})
var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var smallStyle = new Style({font: '18px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});

var titleFont = new Style({font: "30px ABeeZee", color: 'white'})

/* Pictures */
var routeLogo = Picture.template($ => ({
    top: $.top, height: 30, url: "assets/routeIcon.png"
}));

var labelStatus = "New Route";
var newRouteLabel = Picture.template($ => ({
    left: 10, right: 10, top: 0, bottom: 0, height: 15, url: "assets/new-route-selected.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("New Route\n");
            frequentContainerSelected = false;
            if (container.active == true) {
                labelStatus = "New Route";
                application.remove(currentScreen);
                currentScreen = new ScreenTemplate({name: "newRouteScreen", titleTxt: "Select Route", prevScn: "loadEric", nextScn: "loadAbi", screenContent: new RouteScreenContent()});
                application.add(currentScreen);
                application.distribute("updateRouteSelect", 0);
                container.active = false;
            }
        }
        updateRouteSelect(container, value) {
            if (value == 0) {
                container.url = "assets/new-route-selected.png";
            } else {
                container.url = "assets/new-route.png";
                container.active = true;
            }
        }
    }
}));

var freqRouteLabel = Picture.template($ => ({
    left: 10, right: 10, top: 0, bottom: 0, height: 15, url: "assets/freq-route.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Frequent Route\n");
            frequentContainerSelected = true;
            if (container.active == true) {
                labelStatus = "Frequent Route";
                application.remove(currentScreen);
                currentScreen = new RouteScreenFrequent({routeSelect: new FrequentContainer()});
                application.add(currentScreen);
                application.distribute("updateRouteSelect", 1);
                container.active = false;
            }
        }
        updateRouteSelect(container, value) {
            if (value == 1) {
                container.url = "assets/freq-route-selected.png";
                var maps = readSavedRoutes();
                for (var i=0; i<maps.length; i++){
                    trace("saved map name: " + maps[i].name + "\n");
                    trace("saved map url: " + maps[i].url + "\n");
                    var inputArr = [maps[i].url, maps[i].name]
                    getMapsImgFrequent(inputArr, function(image, name){
                        let mapIm = new freq1({url: image});
                        var l = new Label({ name: 'label', right: 60, string: name, style: smallStyle});
                        var mapContainer = new FrequentMaps({name: "map" + String(i), pic: mapIm, lab: l});
                        application.routeScreenFrequent.col.scroller.frequentContainer.add(mapContainer);
                    });
                }
            } else {
                container.url = "assets/freq-route.png";
                container.active = true;
            }
        }
    }
}));

//Will need to use as part of the template on most screens
export var settingsIcon = Picture.template($ => ({
    left: 5, height: 20, url: "assets/settings.png", active: true, 
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            settingsOverlayScreen = new SettingsOverlay(); 
            application.add(settingsOverlayScreen);  
        }
    }
}));

var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Back Screen\n");
            // MOVE TO PREVIOUS SCREEN HERE
            loadEric();
        }
    }
}));

var selectRouteIcon = Picture.template($ => ({
    left: 50, height: 20, url: "assets/select-route.png"
}));

export var walkName = "";
export var home = "911 North Evergreen Street";
export var city = "Burbank";
export var state = "CA";
var stops = [["", ""], ["", ""], ["", ""], ["", ""]];
export var stopsExport = [];
export var newRouteURLObject = [];
// export var newRouteURLObject = {"name": "", "mainMapURL": "", "markerMapsURLArray": []};
// export var stopsExport = ["w clark ave|evergreen street","w magnolia blvd|evergreen street","n pass ave|w magnolia blvd","w clark ave|n pass ave"];
export function grabNewRouteURLs(returnArr){
    var stop1 = stops[0][0] + "|" + stops[0][1];
    var stop2 = stops[1][0] + "|" + stops[1][1];
    var stop3 = stops[2][0] + "|" + stops[2][1];
    var stop4 = stops[3][0] + "|" + stops[3][1];
    stopsExport = [stop1, stop2, stop3, stop4, home];
    var cornerURLs=[];
    trace("stopsExport: " + stopsExport + "\n");
    for (var j=0; j<stopsExport.length; j++){
        if (j != stopsExport.length - 1){
            var string = stopsExport[j] + "," + city + "," + state;
            trace(string + "\n");
            cornerURLs.push(createLatLongURLfromCorner(string, "|"));
        }else{
            var string = stopsExport[j] + "," + city + "," + state;
            trace(string + "\n");
            cornerURLs.push(createLatLongURLfromAddress(string));
        }
    }
    trace("about to make lat lng api calls\n");
    getLatLonFourCorners(cornerURLs, function(array){
        var mapurl = createMapsURLfromLatLon2(array, false, "", ""); // get map URL
        trace("route url: " + mapurl + "\n");
        var urlsArr = []; //maps with markers urls
        for (var i=0; i < array.length; i++){
            if (i == array.length - 1){
                var url = createMapsURLfromLatLon2(array, true,[array[i][0], array[i][1]], "S");
            }else{
                var url = createMapsURLfromLatLon2(array, true,[array[i][0], array[i][1]], "C");
            }
            trace("marker map " + String(i) + " url: " + url + "\n");
            urlsArr.push(url);
        }
        returnArr.push(["name", walkName]);
        returnArr.push(["map", mapurl]);
        returnArr.push(["markers", urlsArr]);
    });
}
var nextIcon = Picture.template($ => ({
    left: 200, right: 0, height: 15, url: "assets/next.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            // MOVE TO NEXT SCREEN HERE
            var stop1 = stops[0][0] + "|" + stops[0][1];
            var stop2 = stops[1][0] + "|" + stops[1][1];
            var stop3 = stops[2][0] + "|" + stops[2][1];
            var stop4 = stops[3][0] + "|" + stops[3][1]; 
            stopsExport = [stop1, stop2, stop3, stop4];
            trace("\nSTOPS\n");
            trace("Home: " + home + "\n");
            trace("Stop1: " + stop1 + "\n");
            trace("Stop2: " + stop2 + "\n");
            trace("Stop3: " + stop3 + "\n");
            trace("Stop4: " + stop4 + "\n");
            trace("City: " + city + "\n");
            trace("State: " + state + "\n");
            trace("Stops Export: " + stopsExport + "\n");
            trace("YUPPPPPPPPP\n");
            loadAbi();
        }
    }
}));

/* Navigation Bar */
export var navBarSize = 50;
var TitleTemplate = Label.template($ => ({
    left: 0, right: 25, top: 0, bottom: 0,
    style: titleFont,
    string: $.string
}));

export var NavTop = Line.template($ => ({
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
        new nextIcon()
    ]
}));

var RouteLabels = Line.template($ => ({
    left: 0, top: $.top, bottom: $.bottom, right: 0, height: 15,
    contents: [
        new newRouteLabel(),
        new freqRouteLabel(),
    ]
}));

/* New Route */

var MyField = Container.template($ => ({ 
    height: 26, left: 5, top: 0, right: 5, skin: nameInputSkin, active: true,
    contents: [
        Scroller($, { 
            left: 0, right: 0, top: 0, bottom: 0, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: fieldStyle, anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            label.container.hint.visible = (data.name.length == 0);
                            trace(data.name+"\n");

                            if ($.targetID == 'home') home = data.name;
                            else if ($.targetID == 'walkName'){
                                walkName = data.name;
                            }
                            else if ($.targetID == 'stop1') {
                                if ($.stop == 0) 
                                    stops[0] = [data.name, stops[0][1]];
                                else if ($.stop == 1) 
                                    stops[0] = [stops[0][0], data.name];
                            }
                            else if ($.targetID == 'stop2') {
                                if ($.stop == 0) 
                                    stops[1] = [data.name, stops[1][1]];
                                else if ($.stop == 1) 
                                    stops[1] = [stops[1][0], data.name];
                            }
                            else if ($.targetID == 'stop3') {
                                if ($.stop == 0) 
                                    stops[2] = [data.name, stops[2][1]];
                                else if ($.stop == 1) 
                                    stops[2] = [stops[2][0], data.name];
                            }
                            else if ($.targetID == 'stop4') {
                                if ($.stop == 0) 
                                    stops[3] = [data.name, stops[3][1]];
                                else if ($.stop == 1) 
                                    stops[3] = [stops[3][0], data.name];
                            }
                            else if ($.targetID == 'city') {
                                city = data.name;
                            }
                            else if ($.targetID == 'state') {
                                state = data.name;
                            }
                        }
                    },
                }),
                Label($, {
                    left: 0, right: 0, top: 0, bottom: 0, style: fieldHintStyle,
                    string: "Tap to enter street name..", name: "hint"
                }),
            ]
        })
    ]
}));

var textLabel = Container.template($ => ({
    width: 50, left: 0, top: 0, bottom: 0,
    contents: [
        new Label({top: 0, bottom: 0, left: 0, width: 50, style: fieldStyle, string: $.txt})
    ]
}));

var NewRouteBox = Line.template($ => ({
    left: 5, top: 10, right: 5, height: 26, active: true,
    contents: [
        new textLabel({txt: $.txt}),
        new MyField({name: $.txt1, targetID: $.targetID, stop: 0}),
        new MyField({name: $.txt2, targetID: $.targetID, stop: 1})
    ]
}));

export var NewRouteContainer = Column.template($ => ({
    top: 10, left: 0, right: 0, bottom: 0, active: true,
    contents: [
        new Line({
            left: 5, top: 0, right: 5, width: 50,
            contents: [
                new textLabel({txt: "Name: "}),
                new MyField({name: "Test", targetID: "walkName"})
            ]
        }),
        new Line({
            left: 5, top: 5, right: 5, width: 50,
            contents: [
                new textLabel({txt: "Home:"}),
                new MyField({name: "911 North Evergreen Street", targetID: "home"}),
            ]
        }),
        new NewRouteBox({txt: "Stop 1",txt1: 'w magnolia blvd', txt2: 'evergreen street', targetID: 'stop1'}),
        new NewRouteBox({txt: "Stop 2",txt1: 'n pass ave', txt2: 'w magnolia blvd', targetID: 'stop2'}),
        new NewRouteBox({txt: "Stop 3",txt1: 'w clark ave', txt2: 'n pass ave', targetID: 'stop3'}),
        new NewRouteBox({txt: "Stop 4", txt1: 'w clark ave', txt2: 'evergreen street', targetID: 'stop4'}),
        // new NewRouteBox({txt: "Stop 1", txt1: 'Piedmont Ave', txt2: 'Bancroft Way', targetID: 'stop1'}),
        // new NewRouteBox({txt: "Stop 2",txt1: 'Bancroft Way', txt2: 'College Ave', targetID: 'stop2'}),
        // new NewRouteBox({txt: "Stop 3",txt1: 'College Ave', txt2: 'Durant Ave', targetID: 'stop3'}),
        // new NewRouteBox({txt: "Stop 4",txt1: 'Piedmont Ave', txt2: 'Durant Ave', targetID: 'stop4'}),
        new Line({
            left: 5, top: 10, right: 5, height: 26,
            contents: [
                new textLabel({txt: "City:"}),
                new MyField({name: "Burbank", targetID: "city"}),
                // new MyField({name: "Berkeley", targetID: "city"}),
                new textLabel({txt: "State:"}),
                new MyField({name: "CA", targetID: "state"})
            ]
        })
    ],
    Behavior: class extends Behavior {
        onTouchEnded(content) {
            KEYBOARD.hide();
            content.focus();
        }
    }
}));

var map1 = Picture.template($ => ({
    left: 1, right: 1, top: 1, bottom: 1,  height: 150, aspect: 'fill', url: "assets/map1.png"
}));

var freq1 = Picture.template($ => ({
    left: 5, right: 0, top: 5, bottom: 5, height: 200, aspect: 'fit', url: $.url
}));

var FrequentMaps = Line.template($ => ({
    name: $.name, left: 0, top: 10, right: 0, height:210, skin: blackBorder, active: true,
    contents: [
        $.pic,
        $.lab
    ], 
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            frequentContainerSelectedRoute = container.label.string;
            container.skin = orangeBorder;
            trace("\n"+frequentContainerSelectedRoute + "\n");
        }
    }
}));

var FrequentContainer = Column.template($ => ({
    name: "frequentContainer", top: 5, left: 10, right: 10,
    contents: [
        // new FrequentMaps({name: "pic1", pic: new freq1()}),
        // new FrequentMaps({name: "pic2", pic: new freq2()}),
    ]
}));

export var RouteScreenContent = Column.template($ => ({
    name: "routeScreen", left: 0, right: 0, top: 0, bottom: 0, skin: new Skin({fill: "#ffd359"}),
    contents: [
        new routeLogo({top: 10}),
        new RouteLabels({top: -27, bottom: 20}),
        new NewRouteContainer(),
    ]
}));

var RouteScreenFrequent = Container.template($ => ({
    name: "routeScreenFrequent", left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin, active: true, 
    contents: [
        new Container({
            name: "col", top: 150, bottom: 55, left: 0, right: 0, active: true,
            contents:[
                VerticalScroller($, {
                    name: "scroller", top: 0, bottom: 0, active: true,
                    contents: [
                        $.routeSelect,
                        VerticalScrollbar(),
                        //TopScrollerShadow(), 
                    ]
                }),
                
            ]               
        }),
        new Container({
            top: 0, height: 150, left: 0, right: 0, skin: yellowSkin, active: true,
            contents:[
                new NavTop({txt: "Select Route"}),
                new routeLogo({top: navBarSize + 10}),
                new RouteLabels({top: 110, bottom: 10}),  
            ]               
        }),
        new NavBot({txt: "Next"}),
    ]
}));
