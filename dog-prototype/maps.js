const MAPSURLSTART = "https://maps.googleapis.com/maps/api/staticmap?";
const STATICMAPSAPIKEY = "AIzaSyChcVQ9xCRNiChe9YS68W3czxBzT3xCdMI"; //app name: CS160-Walkie
const GOOGLEMAPSAPIKEY = "AIzaSyBEktM3Xo6jgBEuIyiKh0kTm8vvgh9meog";

var testLAAddress = "Pershing+Square,Los+Angeles,CA";
var testAddress1 = "911+North+Evergreen+Street,Burbank,CA";
var testAddress2 = "Bob's+Big+Boy,Burbank,CA";
var testAddress3 = "Warner+Brother's+Studio+Tour,Burbank,CA";

var mapsObject;

let textStyle = new Style({ font: "bold 50px", color: "white" });
let MainContainer = Container.template($ => ({
    name: 'main',
    top: 0, bottom: 0, left: 0, right: 0,
    skin: new Skin({ fill: $.backgroundColor }),
    contents: [
        Label($, {
            top: 70, bottom: 70, left: 70, right: 70,
            style: textStyle,  string: $.string
        }),
    ],
}));

class AppBehavior extends Behavior {
    onLaunch(application) {
        application.add(new MainContainer({ string: "Ready!", backgroundColor: "#7DBF2E" }));
        var staticMapURL = createMapsUrl()
        trace("url: " + application.url + "\n");
        getMapsImg(staticMapURL, function(image){
            let img = new Picture({left: 5, right: 5, top: 5, bottom: 5, url: image});
            application.main.add(img)
        });
    }
}
application.behavior = new AppBehavior();

export function createMapsUrl(){
    var requestURL = MAPSURLSTART
                 + "center=" + testAddress1
                 + "&zoom=14" + "&size=400x400"
                 + "&markers=color:blue|label:S|" + testAddress1
                 + "&markers=color:green|label:M|" + testAddress3
                 + "&path=color:0x0000ff80|weight:1|" + testAddress1 + "|" + testAddress3
                 + "&maptype=roadmap"
                 + "&key=" + STATICMAPSAPIKEY;
    return requestURL
}

export function getMapsImg(url, uiCallback){
    var message = new Message(url);
    var promise = message.invoke(Message.JSON);
    promise.then(json => {
        if (0 == message.error && 200 == message.status){
            try{
                uiCallback(json)
            }
            catch (e) {
                throw('Web service responded with invalid JSON!\n');
              }
        }
        else {
          trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
        }
    });
}
