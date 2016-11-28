import { currentScreen, loadAbi, orangeSkin, yellowSkin, whiteSkin } from "main";

var titleScreenSkin = new Skin({fill: "#2f4f4f"});
var mainScreenSkin = new Skin({fill: "white"});
var titleSkin = new Skin ({fill: '#3498db'});
var labelSkin = new Skin({fill: "green"});
var statusSkin = new Skin({fill: ["#66CD00" ,"red"]})
var buttonSkin = new Skin({fill : ["#202020", "#7DBF2E"], borders: {left:5, right:5, top:5, bottom:5}, stroke: "black"});

var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});
var titleStyle = new Style({font: '30px', color: 'black'});
var labelStyle = new Style({font: '20px', fill: "black"});
var buttonStyle = new Style({font: '22px', color: 'white'});
var feedStyle = new Style({font: '30px', color: 'white'});

var RouteSkin = new Skin({
    width: 100, height: 50, texture: new Texture("assets/routeIcon.png"), aspect: "fit"
});

var NavTop = Container.template($ => ({
    left: 0, top: 0, right: 0, height: 60, skin: orangeSkin,
    contents: [
        new Text({left: 0, right: 0, top: 10, bottom: 0, style: titleStyle, string: $.txt })
    ]
}));

var NavBot = Container.template($ => ({
    left: 0, bottom: 0, right: 0, height: 60, skin: orangeSkin, active: true,
    contents: [
        new Text({left: 0, right: 0, top: 10, bottom: 0, style: titleStyle, string: $.txt })
    ],
    Behavior: class extends Behavior{
        onTouchEnded(container){
            loadAbi();
        }
    }

}));


var RouteIcon = Container.template($ => ({
    left: 0, top: 10, right: 0, height: 40, skin: RouteSkin
}));

var NewRouteLabel = Text.template($ => ({
    name: "new_route", left: 0, right: 0, top: 10, bottom: 0, style: labelStyle, string: "New Route", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("New Route\n");
            container.string = "CLICKED";
            FreqRouteLabel.string = "Frequent Route";
            if (labelStatus != "New Route") {
                application.remove(currentScreen);
                currentScreen = new RouteScreen({routeSelect: new NewRouteContainer()});
                application.add(currentScreen);
                labelStatus = "New Route";
            }
        }
    }
}));

var FreqRouteLabel = Text.template($ => ({
    name: "new_route", left: 0, right: 0, top: 10, bottom: 0, style: labelStyle, string: "Frequent Route", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Frequent Route\n");
            container.string = "CLICKED";
            NewRouteLabel.string = "New Route";
            if (labelStatus != "Frequent Route") {
                application.remove(currentScreen);
                currentScreen = new RouteScreen({routeSelect: new FrequentContainer()});
                application.add(currentScreen);
                labelStatus = "Frequent Route"
            }
        }
    }
}));

var labelStatus = "New Route";
var RouteLabels = Line.template($ => ({
    left: 0, top: 0, bottom: 0, right: 0, height: 20,
    contents: [
        new NewRouteLabel(),
        new FreqRouteLabel(),
    ]
}));

var NewRouteBox = Container.template($ => ({
    left: 0, top: 10, right: 0, height: 50,
    contents: [
        new Line({
            left: 50, top: 5, right: 0, bottom: 0, height: 20, skin: yellowSkin,
            contents: [
                new Label({left: 0, top: 0, right: 0, bottom: 0, string: "Test"})
            ]
        })
    ]
}));

var NewRouteMap = Container.template($ => ({
    left: 0, top: 20, right: 0, height: 200, skin: orangeSkin
}));

export var NewRouteContainer = Column.template($ => ({
    top: 0, left: 10, right: 10, bottom: 5,
    contents: [
        new NewRouteBox(),
        new NewRouteBox(),
        new NewRouteMap(),
    ]
}));

var FrequentMaps = Container.template($ => ({
    left: 0, top: 10, right: 0, height: 150, skin: orangeSkin
}));

var FrequentContainer = Column.template($ => ({
    top: 5, left: 10, right: 10, bottom: 5,
    contents: [
        new FrequentMaps(),
        new FrequentMaps(),
    ]
}));

// Screens
export var RouteScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: mainScreenSkin,
    contents: [
        new NavTop({txt: "Select Route"}),
        new RouteIcon(),
        new RouteLabels(),
        $.routeSelect,
        new NavBot({txt: "Next"}),
    ]
}));
