import { currentScreen, loadAbi, orangeSkin, yellowSkin, whiteSkin } from "main";

var blackBorder = new Skin({fill: "white", borders: {left:1, right:1, top:1, bottom:1}, stroke: "black"});

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '26px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});

// Pictures
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

var settingsIcon = Picture.template($ => ({
    left: 5, height: 20, url: "assets/settings.png"
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

var nextIcon = Picture.template($ => ({
    left: 200, right: 0, height: 15, url: "assets/next.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Next Screen\n");
            // MOVE TO NEXT SCREEN HERE
            loadAbi();
        }
    }
}));

// Templates
export var navBarSize = 40;
export var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new settingsIcon(),
        new selectRouteIcon()
    ]
}));

export var NavBot = Line.template($ => ({
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

var NewRouteBox = Container.template($ => ({
    left: 50, top: 10, right: 0, height: 30, skin: blackBorder,
    contents: [
        new Text({
            left: 5, top: 5, right: 5, bottom: 0, style: labelStyle, string: $.txt
        })
    ]
}));

var NewRouteMap = Container.template($ => ({
    left: 0, top: 20, right: 0, height: 250, skin: blackBorder,
    contents: [
        $.map
    ]
}));

export var NewRouteContainer = Column.template($ => ({
    top: 0, left: 10, right: 10, bottom: 5,
    contents: [
        new NewRouteBox({txt: "Home"}),
        new NewRouteBox({txt: "South Park"}),
        new NewRouteMap({map: new map1()}),
    ]
}));

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

// Screens
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