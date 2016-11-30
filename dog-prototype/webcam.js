import {loadMax} from "main"; 
import {displayWebcam} from "settings"; 


var WebcamFeed = Picture.template($ => ({    width: 320, url: "assets/dogWalkingGif/tmp-" + $.imageNum + ".gif", clip: true, }));

var BackButton = Picture.template($ => ({
    left: 250, bottom: 775, height: 50, url: "assets/webcamX.png", active: true, clip: true,
    Behavior: class extends Behavior {
        onTouchEnded(container) {
            loadMax();
            displayWebcam = false; 
        }
    }
}));

export var WebcamScreen = Container.template($ => ({    contents: [
    	new WebcamFeed({imageNum: $.image}), 
    	new BackButton(),     ],}));