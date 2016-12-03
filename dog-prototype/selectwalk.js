import { SettingsOverlay } from "settingsoverlay"; 

// import { currentScreen, loadAbi, loadEric, orangeSkin, yellowSkin, whiteSkin, titleFont } from "main";
import { currentScreen, loadAbi, loadEric, orangeSkin, yellowSkin, whiteSkin, settingsOverlayScreen} from "main";
import { FieldScrollerBehavior, FieldLabelBehavior } from 'field';
import { SystemKeyboard } from 'keyboard';

/* Fonts and Skins */
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray', fill: "white" });
let fieldStyle = new Style({ color: 'black', font: 'bold 14px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '14px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });

var blackBorder = new Skin({fill: "white", borders: {left:1, right:1, top:1, bottom:1}, stroke: "black"});
var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});

/* Pictures */
var routeLogo = Picture.template($ => ({
    top: 10, height: 30, url: "assets/routeIcon.png"
}));

var labelStatus = "New Route";
var newRouteLabel = Picture.template($ => ({
    left: 10, right: 10, top: 5, bottom: 5, height: 10, url: "assets/new-route-selected.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("New Route\n");
            if (labelStatus != "New Route") {
                labelStatus = "New Route";
                application.remove(currentScreen);
                currentScreen = new RouteScreen({routeSelect: new NewRouteContainer()});
                application.add(currentScreen);
                application.distribute("updateRouteSelect", 0);
            }
        }
        updateRouteSelect(container, value) {
            if (value == 0) {
                container.url = "assets/new-route-selected.png";
            } else {
                container.url = "assets/new-route.png";
            }
        }
    }
}));

var freqRouteLabel = Picture.template($ => ({
    left: 10, right: 10, top: 5, bottom: 5, height: 10, url: "assets/freq-route.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Frequent Route\n");
            if (labelStatus != "Frequent Route") {
                labelStatus = "Frequent Route";
                application.remove(currentScreen);
                currentScreen = new RouteScreen({routeSelect: new FrequentContainer()});
                application.add(currentScreen);
                application.distribute("updateRouteSelect", 1);
            }
        }
        updateRouteSelect(container, value) {
            if (value == 1) {
                container.url = "assets/freq-route-selected.png";
            } else {
                container.url = "assets/freq-route.png";
            }
        }
    }
}));

var map1 = Picture.template($ => ({
    left: 1, right: 1, top: 1, bottom: 1,  height: 150, aspect: 'fill', url: "assets/map1.png"
}));

var freq1 = Picture.template($ => ({
    left: 1, right: 1, top: 1, bottom: 1, height: 150, aspect: 'fill', url: "assets/freq1.jpg"
}));

var freq2 = Picture.template($ => ({
    left: 1, right: 1, top: 1, bottom: 1,  height: 150, aspect: 'fill', url: "assets/freq2.jpg"
}));

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

var home = "Home";
var city = "Berkeley";
var state = "CA";
var stops = [["", ""], ["", ""], ["", ""], ["", ""]];
export var stopsExport = [];
var nextIcon = Picture.template($ => ({
    left: 200, right: 0, height: 15, url: "assets/next.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Next Screen\n");
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
            trace("END STOPS\n");
            loadAbi();
        }
    }
}));

/* Navigation Bar */
export var navBarSize = 40;
var TitleTemplate = Label.template($ => ({
    left: 0, right: 25, top: 0, bottom: 0,
    // style: titleFont,
    styel: titleStyle,
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
        new nextIcon()
    ]
}));

var RouteLabels = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, height: 20,
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

                            if ($.targetID == 'home') home == data.name;
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
                                city == data.name;
                            }
                            else if ($.targetID == 'state') {
                                state == data.name;
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

var textLabel = Label.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, width: 10,
    style: fieldStyle, string: $.txt
}));

var NewRouteBox = Line.template($ => ({
    left: 5, top: 10, right: 5, height: 26, active: true,
    contents: [
        new textLabel({txt: $.txt}),
        new MyField({name: $.txt, targetID: $.targetID, stop: 0}),
        new MyField({name: $.txt, targetID: $.targetID, stop: 1})
    ]
}));

export var NewRouteContainer = Column.template($ => ({
    top: 10, left: 0, right: 0, bottom: 0, active: true,
    contents: [
        new Line({
            top: 0, left: 0, right: 0, bottom: 0,
            contents: [
                new textLabel({txt: "Home:"}),
                new MyField({name: "Home", targetID: "home"})
            ]
        }),
        new NewRouteBox({txt: 'stop1', targetID: 'stop1'}),
        new NewRouteBox({txt: 'stop2', targetID: 'stop2'}),
        new NewRouteBox({txt: 'stop3', targetID: 'stop3'}),
        new NewRouteBox({txt: 'stop4', targetID: 'stop4'}),
        new Line({
            top: 0, left: 0, right: 0, bottom: 0,
            contents: [
                new textLabel({txt: "City:"}),
                new MyField({name: "Berkeley", targetID: "city"}),
                new textLabel({txt: "State:"}),
                new MyField({name: "CA", targetID: "state"})
            ]
        })
    ]
}));

/* Frequent Route */
var FrequentMaps = Container.template($ => ({
    left: 0, top: 10, right: 0, height:175, skin: blackBorder,
    contents: [
        $.pic
    ]
}));

var FrequentContainer = Column.template($ => ({
    top: 5, left: 10, right: 10, bottom: 5,
    contents: [
        new FrequentMaps({pic: new freq1()}),
        new FrequentMaps({pic: new freq2()}),
    ]
}));

/* Select Route Screen */
export var RouteScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "Select Route"}),
        new routeLogo(),
        new RouteLabels(),
        $.routeSelect,
        new NavBot({txt: "Next"}),
    ]
}));