import { currentScreen, remotePins, closeAnalogs, loadMax, yellowSkin, whiteSkin, orangeSkin } from "main";
import { navBarSize, settingsIcon } from "selectwalk";

let smallTextStyle = new Style({ font: "bold 15px", color: "white" });
let largeTextStyle = new Style({ font: "bold 30px", color: "white"});
let orangeSkinBorder = new Skin({fill: "#ff7e3e", borders: {left:1, right:1, top:1, bottom:1}, stroke: "black"});

export var ActMonitorScreen = Column.template($ => ({
    name: "main", top: 0, bottom: 0, left: 0, right: 0, skin: yellowSkin,
    contents: [
        new NavTop({string: "Activities Monitor"}),
        new spacer(),
        new NavBot({txt: "Next"})
    ]
}));

var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new settingsIcon(),
        new Label({hidden: false, left: 0, right: 0, string: $.string, style: largeTextStyle})
    ]
}));

var NavBot = Line.template($ => ({
    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        new backIcon(),
        new nextIcon()
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

var spacer = Container.template($ => ({
    name: "spacer", top: 30, bottom: 0, left: 0, right: 0, skin: whiteSkin,
    contents: [
    	new Column({
    		name: "col", top: 0, bottom: 0, left: 0, right: 0,
    		contents: [
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
    			})
    		]
    	})
    ]
}));

// effect = new Effect();
// effect.outerShadow(.5)

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