const MAPSURLSTART = "https://maps.googleapis.com/maps/api/staticmap?";
const STATICMAPSAPIKEY = "AIzaSyChcVQ9xCRNiChe9YS68W3czxBzT3xCdMI"; //app name: CS160-Walkie
const GOOGLEMAPSAPIKEY = "AIzaSyBEktM3Xo6jgBEuIyiKh0kTm8vvgh9meog";

var testLAAddress = "Pershing Square,Los Angeles,CA";
var testAddress1 = "911 North Evergreen Street,Burbank,CA";
var testAddress2 = "Bob's Big Boy,Burbank,CA";
var testAddress3 = "Warner Brother's Studio Tour,Burbank,CA";

export function createMapsUrl(){
    var add1 = parseAddress(testAddress1);
    var add2 = parseAddress(testAddress2);
    var requestURL = MAPSURLSTART
                 + "center=" + add1
                 + "&zoom=14" + "&size=400x400"
                 + "&markers=color:blue|label:S|" + add1
                 + "&markers=color:green|label:M|" + add2
                 + "&path=color:0x0000ff80|weight:1|" + add1 + "|" + add2
                 + "&maptype=roadmap"
                 + "&key=" + STATICMAPSAPIKEY;
    return requestURL
}

export function parseAddress(address){
    var returnAddress = "";
    var sectionArray = address.split(",");
    for (var i = 0; i < sectionArray.length; i++){
        var finalSplit = sectionArray[i].split(" ");
        for (var j = 0; j < finalSplit.length; j++){
            returnAddress += finalSplit[j];
            if (j != finalSplit.length - 1){
                returnAddress += "+";
            }
        }
        if (i != sectionArray.length - 1){
          returnAddress += ",";
        }
    }
    return returnAddress;
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
