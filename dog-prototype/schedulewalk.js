import { borderedSkin, loadErikConfirmationPage} from "main";
let small = new Style({ font: "20px", color: "black" });

let orangeSkin = new Skin({fill: "#ff7e3e"});
let titleFont = new Style({ font: "30px ABeeZee", color: "white" });

let MyWalkButtonTemplate = Button.template($ => ({
    top: 15, bottom: 15, left: 10, right: 10,  skin: borderedSkin,
    contents: [
        new Label({left: 0, right: 0, string: "Start Walk Now", style: small})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
            monthNum = 0;
			dayNum = 0;
			timeNum = 0;
			durationNum = 0;
			loadErikConfirmationPage();
        }
    }
}));


/* Navigation Bar */
var backIcon = Picture.template($ => ({
    left: 10, height: 20, url: "assets/backButton.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Back Screen\n");
            // MOVE TO PREVIOUS SCREEN HERE
        }
    }
}));

var nextIcon = Picture.template($ => ({
    left: 200, right: 0, height: 15, url: "assets/next.png", active: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            trace("Next Screen\n");
            // MOVE TO NEXT SCREEN HERE
            saveJson(); 
            
        }
    }
}));

export var navBarSize = 50;
var TitleTemplate = Label.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    style: titleFont,
    string: $.string
}));



var NavTop = Line.template($ => ({
    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,
    contents: [
        //new settingsIcon(),
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

import { 
    Button,
    ButtonBehavior 
} from 'buttons';

var Month = "Month";
var Day = "Day";
var Time = "Start Time";
var Duration = "Duration";
export var monthNum = 0;
export var dayNum = 0;
export var timeNum = 0;
export var durationNum = 0;
export var text1label = new Label({left:0, right:0, height:20, string:"Month", style: new Style({ font: "bold 15px", color: "#000000" })});
export var text2label = new Label({left:0, right:0, height:20, string:"Day", style: new Style({ font: "bold 15px", color: "#000000" })});
export var text3label = new Label({left:0, right:0, height:20, string:"Start Time", style: new Style({ font: "bold 15px", color: "#000000" })});
export var text4label = new Label({left:0, right:0, height:20, string:"Duration (in hours)", style: new Style({ font: "bold 15px", color: "#000000" })});
import {
    HorizontalSlider, HorizontalSliderBehavior
} from 'sliders';

let MyMonthSlider = HorizontalSlider.template($ => ({
    height: 15, left: 0, right: 0,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("Value is: " + this.data.value + "\n");
            monthNum = parseInt(this.data.value)
            trace("Value: " + monthNum + "\n");
            switch (monthNum){
                case 1: 
                    text1label.string = "Month: January";
                    break;
                case 2: 
                    text1label.string = "Month: February";
                    break;
                case 3: 
                    text1label.string = "Month: March";
                    break;
                case 4: 
                    text1label.string = "Month: April";
                    break;
                case 5: 
                    text1label.string = "Month: May";
                    break;
                case 6: 
                    text1label.string = "Month: June";
                    break;
                case 7: 
                    text1label.string = "Month: July";
                    break;
                case 8: 
                    text1label.string = "Month: August";
                    break;
                case 9: 
                    text1label.string = "Month: September";
                    break;
                case 10: 
                    text1label.string = "Month: October";
                    break;
                case 11:
                    text1label.string = "Month: November";
                    break;
                case 12: 
                    text1label.string = "Month: December";
                    break;
            }
            trace(text1label.string + "\n");
        }
    }
}));

let MyDaySlider = HorizontalSlider.template($ => ({
    height: 15, left: 0, right: 0,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("Value is: " + this.data.value + "\n");
            dayNum = parseInt(this.data.value);
            if (dayNum > 0) {text2label.string ="Day: " + parseInt(this.data.value);}
        }
    }
}));

let MyTimeSlider = HorizontalSlider.template($ => ({
    height: 15, left: 0, right: 0,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("Value is: " + this.data.value + "\n");
            timeNum = parseInt(this.data.value);
            switch (timeNum){
                case 1: 
                    text3label.string = "Start Time: 12:00 AM";
                    break;
                case 2: 
                    text3label.string = "Start Time: 12:30 AM";
                    break;
                case 3: 
                    text3label.string = "Start Time: 1:00 AM";
                    break;
                case 4: 
                    text3label.string = "Start Time: 1:30 AM";
                    break;
                case 5: 
                    text3label.string = "Start Time: 2:00 AM";
                    break;
                case 6: 
                    text3label.string = "Start Time: 2:30 AM";
                    break;
                case 7: 
                    text3label.string = "Start Time: 3:00 AM";
                    break;
                case 8: 
                    text3label.string = "Start Time: 3:30 AM";
                    break;
                case 9: 
                    text3label.string = "Start Time: 4:00 AM";
                    break;
                case 10: 
                    text3label.string = "Start Time: 4:30 AM";
                    break;
                case 11:
                    text3label.string = "Start Time: 5:00 AM";
                    break;
                case 12: 
                    text3label.string = "Start Time: 5:30 AM";
                    break;
                case 13: 
                    text3label.string = "Start Time: 6:00 AM";
                    break;
                case 14: 
                    text3label.string = "Start Time: 6:30 AM";
                    break;
                case 15: 
                    text3label.string = "Start Time: 7:00 AM";
                    break;
                case 16: 
                    text3label.string = "Start Time: 7:30 AM";
                    break;
                case 17: 
                    text3label.string = "Start Time: 8:00 AM";
                    break;
                case 18: 
                    text3label.string = "Start Time: 8:30 AM";
                    break;
                case 19: 
                    text3label.string = "Start Time: 9:00 AM";
                    break;
                case 20: 
                    text3label.string = "Start Time: 9:30 AM";
                    break;
                case 21: 
                    text3label.string = "Start Time: 10:00 AM";
                    break;
                case 22: 
                    text3label.string = "Start Time: 10:30 AM";
                    break;
                case 23: 
                    text3label.string = "Start Time: 11:00 AM";
                    break;
                case 24: 
                    text3label.string = "Start Time: 11:30 AM";
                    break;
                case 25: 
                    text3label.string = "Start Time: 12:00 PM";
                    break;
                case 26: 
                    text3label.string = "Start Time: 12:30 PM";
                    break;
                case 27: 
                    text3label.string = "Start Time: 1:00 PM";
                    break;
                case 28: 
                    text3label.string = "Start Time: 1:30 PM";
                    break;
                case 29: 
                    text3label.string = "Start Time: 2:00 PM";
                    break;
                case 30: 
                    text3label.string = "Start Time: 2:30 PM";
                    break;
                case 31: 
                    text3label.string = "Start Time: 3:00 PM";
                    break;
                case 32: 
                    text3label.string = "Start Time: 3:30 PM";
                    break;
                case 33: 
                    text3label.string = "Start Time: 4:00 PM";
                    break;
                case 34: 
                    text3label.string = "Start Time: 4:30 PM";
                    break;
                case 35: 
                    text3label.string = "Start Time: 5:00 PM";
                    break;
                case 36: 
                    text3label.string = "Start Time: 5:30 PM";
                    break;
                case 37: 
                    text3label.string = "Start Time: 6:00 PM";
                    break;
                case 38: 
                    text3label.string = "Start Time: 6:30 PM";
                    break;
                case 39: 
                    text3label.string = "Start Time: 7:00 PM";
                    break;
                case 40: 
                    text3label.string = "Start Time: 7:30 PM";
                    break;
                case 41: 
                    text3label.string = "Start Time: 8:00 PM";
                    break;
                case 42: 
                    text3label.string = "Start Time: 8:30 PM";
                    break;
                case 43: 
                    text3label.string = "Start Time: 9:00 PM";
                    break;
                case 44: 
                    text3label.string = "Start Time: 9:30 PM";
                    break;
                case 45: 
                    text3label.string = "Start Time: 10:00 PM";
                    break;
                case 46: 
                    text3label.string = "Start Time: 10:30 PM";
                    break;
                case 47: 
                    text3label.string = "Start Time: 11:00 PM";
                    break;
                case 48: 
                    text3label.string = "Start Time: 11:30 PM";
                    break;
                case 49: 
                    text3label.string = "Start Time: 12:00 AM";
                    break;
            }
        }
    }
}));

let MyDurationSlider = HorizontalSlider.template($ => ({
    height: 15, left: 0, right: 0,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("Value is: " + this.data.value + "\n");
            durationNum = parseInt(this.data.value);
            switch (durationNum){
                case 1:
                    text4label.string ="Duration: 30 Mins";
                    break;
                case 2:
                    text4label.string ="Duration: 1 Hour";
                    break;
                case 3:
                    text4label.string ="Duration: 1 Hours 30 Mins";
                    break;
                case 4:
                    text4label.string ="Duration: 2 Hours";
                    break;
                case 5:
                    text4label.string ="Duration: 2 Hours 30 Mins";
                    break;
                case 6:
                    text4label.string ="Duration: 3 Hours";
                    break;
                case 7:
                    text4label.string ="Duration: 3 Hours 30 Mins";
                    break;
                case 8:
                    text4label.string ="Duration: 4 Hours";
                    break;
            }
            //if (durationNum > 0) {text4label.string ="Duration: " + parseInt(this.data.value) + " Hours";}
        }
    }
}));

let backgroundPhoto = new Texture("assets/background.png");

let background2Skin = new Skin({
      height: 1136, width: 725,
      texture: backgroundPhoto,
      fill: "white",
      aspect: "fit"
});

let backgroundSkin = new Skin({fill: "#ffd359"});

var text0Template = Column.template($ => ({
    left: 0, right: 0, top: 10,
    contents: [
        Label($, {  
            left: 0, right: 0, top: 10, height: 35, 
            style: new Style({ font: "bold 35px", color: "#000000" }), 
            string: "Schedule Walk" 
        }),
    ]
}));


var text1Template = Column.template($ => ({
    left: 0, right: 0, top: 0,
    contents: [
        text1label,
    ]
}));

var text2Template = Column.template($ => ({
    left: 0, right: 0, top: 0,
    contents: [
        text2label,
    ]
}));


var text3Template = Column.template($ => ({
    left: 0, right: 0, top: 0,
    contents: [
        text3label,
    ]
}));

var text4Template = Column.template($ => ({
    left: 0, right: 0, top: 0,
    contents: [
        text4label,
    ]
}));

let graySkin = new Skin({ fill: "gray" });

var Screen3Template = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    skin: new Skin({fill: "#ffd359"}),
    contents: [
        new MyMonthSlider({ min: 1, max: 12 }),
        Label($, {  
            left: 0, right: 0, top: 0, height: 10, 
            style: new Style({ font: "12px", color: "black" }), 
            string: "Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct   Nov   Dec" 
        }),
    ]
}));

var Screen4Template = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    skin: new Skin({fill: "#ffd359"}),
    contents: [
        new MyDaySlider({ min: 1, max: 31 }),
        Label($, {  
            left: 0, right: 0, top: 0, height: 10, 
            style: new Style({ font: "12px", color: "black" }), 
            string: " 1            5            10            15            20            25            30" 
        }),
    ]
}));

var Screen5Template = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    skin: new Skin({fill: "#ffd359"}),
    contents: [
        new MyTimeSlider({ min: 1, max: 49 }),
        Label($, {  
            left: 0, right: 0, top: 0, height: 10, 
            style: new Style({ font: "10px", color: "black" }), 
            string: "12AM           4AM           8AM           12PM           4PM           8PM           12AM" 
        }),
    ]
}));

var Screen6Template = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    skin: new Skin({fill: "#ffd359"}),
    contents: [
        new MyDurationSlider({ min: 1, max: 8 }),
        Label($, {  
            left: 0, right: 0, top: 0, height: 10, 
            style: new Style({ font: "12px", color: "black" }), 
            string: " 0.5          1          1.5          2          2.5          3          3.5          4" 
        }),
    ]
}));

export var ScheduleWalkContainer = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, skin: backgroundSkin,
    active: true, state: 0,
    contents: [
        text1Template(),
        Screen3Template(),
        text2Template(),
        Screen4Template(),
        text3Template(),
        Screen5Template(),
        text4Template(),
        Screen6Template(),
        MyWalkButtonTemplate(),
        // new NavTop({txt: "Schedule a Walk"}),
        // new NavBot(),
    ],
}));
