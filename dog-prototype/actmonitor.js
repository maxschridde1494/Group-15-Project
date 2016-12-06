import { currentScreen, remotePins, closeAnalogs, loadMax, yellowSkin, whiteSkin, orangeSkin } from "main";
import { NavTop, navBarSize, settingsIcon, stopsExport } from "selectwalk";
import { markersURLArray } from "main";
import { getMapsImg, saveRoute, deleteRoute } from "maps";

let smallTextStyle = new Style({ font: "bold 15px", color: "white" });
let smallTextStyleBlack = new Style({ font: "bold 15px", color: "black" });
let largeTextStyle = new Style({ font: "bold 30px", color: "white"});
let orangeSkinBorder = new Skin({fill: "#ff7e3e", borders: {left:1, right:1, top:1, bottom:1}, stroke: "black"});

export var ActMonitorScreen = Column.template($ => ({
    name: "main", top: 0, bottom: 0, left: 0, right: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "Activities Monitor"}),
        new spacer(),
        new NavBot({txt: "Next"})
    ]
}));

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon()
    ]
}));

var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            // MOVE TO PREVIOUS SCREEN HERE
            closeAnalogs();
            loadMax();
        }
    }
}));

var counter = 0;
var spacer = Container.template($ => ({
    name: "spacer", top: 10, bottom: 0, left: 0, right: 0, skin: yellowSkin,
    contents: [
    	new Column({
    		name: "col", top: 0, bottom: 0, left: 0, right: 0,
    		contents: [
                new Label({name: "title", height: 30, left: 0, right: 0, string: "", style: largeTextStyle}),
                new Line({
          				name: "line1", top: 0, bottom: 0, left: 0, right: 0,
          				contents: [
          					new monitorBox({name: "completed", string: "Completed:"}),
          					new monitorBox({name: "distance", string: "Distance Covered:"})
          				]
          			}),
          			new Line({
          				name: "line2", top: 0, bottom: 0, left: 0, right: 0,
          				contents: [
          					new monitorBox({name: "steps", string: "Steps:"}),
          					new monitorBox({name: "heartrate", string: "Heart Rate:"})
          				]
          			}),
                      new Container({
                          name: "map", height: 250, left: 0, right: 0,
                          contents: [
                          ]
                      })
          		]
          	})
    ]
}));

var monitorBox = Container.template($ => ({
	name: $.name, height: 75, width: 100, left: 5, right: 5, skin: orangeSkinBorder,
	contents: [
		new Column({
			name: "innercol", top: 0, bottom: 0, left: 0, right: 0,
			contents: [
				new Label({hidden: false, left: 5, top: 5, string: $.string, style: smallTextStyle}),
				new Line({
					name: "line", top: 0, bottom: 0, left: 0, right: 0,
					contents: [
						new Label({name: 'label', left: 0, right: 0, top: 0, bottom: 0, hidden: false, string: "0", style: largeTextStyle}),
						new Label({name: 'label2', left: 0, right: 0, top: 0, bottom: 0, hidden: false, string: "", style: smallTextStyle})
					]
				})
			]
		})
	]
}));