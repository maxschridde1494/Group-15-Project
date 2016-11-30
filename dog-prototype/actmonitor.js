import { currentScreen, remotePins, orangeSkin, yellowSkin, whiteSkin } from "main";
import { navBarSize, NavTop, NavBot } from "selectwalk";

let textStyle = new Style({ font: "bold 20px", color: "black" });

export var ActMonitorScreen = Column.template($ => ({
    name: "main", top: 0, bottom: 0, left: 0, right: 0, skin: yellowSkin,
    contents: [
        new NavTop({txt: "Activities Monitor"}),
        new spacer(),
        new NavBot({txt: "Next"})
    ]
}));

var spacer = Container.template($ => ({
    name: "spacer", top: 80, bottom: 0, left: 0, right: 0, skin: whiteSkin,
    contents: [
    	new Column({
    		name: "col", top: 0, bottom: 0, left: 0, right: 0,
    		contents: [
    			new Line({
    				name: "line1", top: 0, bottom: 0, left: 0, right: 0,
    				contents: [
    					new monitorBox({name: "completed", string: "Completed:"}),
    					new monitorBox({name: "distance", string: "Distance:"})
    				]
    			}),
    			new Line({
    				name: "line2", top: 0, bottom: 0, left: 0, right: 0,
    				contents: [
    					new monitorBox({name: "steps", string: "Steps:"}),
    					new monitorBox({name: "heartrate", string: "Heartrate:"})
    				]
    			})
    		]
    	})
    ]
}));

// effect = new Effect();
// effect.outerShadow(.5)

var monitorBox = Container.template($ => ({
	name: $.name, height: 100, width: 100, left: 5, right: 5, skin: orangeSkin,
	contents: [
		new Label({name: 'label', hidden: false, string: $.string, style: textStyle})
	]
}));