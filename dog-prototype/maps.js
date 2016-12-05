const MAPSURLSTART = "https://maps.googleapis.com/maps/api/staticmap?";
const STATICMAPSAPIKEY = "AIzaSyChcVQ9xCRNiChe9YS68W3czxBzT3xCdMI"; //app name: CS160-Walkie
const GEOCODINGAPIKEY = "AIzaSyDVbgG4Ypnao0RYGNEjsy7z49hy2I4KkFU";
const GOOGLEMAPSAPIKEY = "AIzaSyBEktM3Xo6jgBEuIyiKh0kTm8vvgh9meog";

const GEOCODINGAPIURLSTART = "https://maps.googleapis.com/maps/api/geocode/json?"

var testLAAddress = "Pershing Square,Los Angeles,CA";
var testAddress1 = "911 North Evergreen Street,Burbank,CA";
var testAddress2 = "Bob's Big Boy,Burbank,CA";
var testAddress3 = "Warner Brother's Studio Tour,Burbank,CA";
var testAddress4 = "CORNER%20W+Clark+Ave+%20AND%20N+Pass+Ave,Burbank,CA";

import { markersImageArray } from "main";

export function createLatLongURLfromAddress(address){
    //Generate GEOCODE URL from Address
    var parsedAdd = parseAddress(address);
    var requestURL = GEOCODINGAPIURLSTART
                + "address=" + parsedAdd 
                + "&key=" + GEOCODINGAPIKEY;
    return requestURL;
}
export function createLatLongURLfromCorner(address){
    //Generate GEOCODE URL from Corner / Intersection
    var parsedAdd = parseCorner(address, "|");
    var requestURL = GEOCODINGAPIURLSTART + "address=" + parsedAdd + "&key=" + GEOCODINGAPIKEY;
    return requestURL;
}
export function createMapsURLfromLatLon(lat, lon){
    var requestURL = MAPSURLSTART
                 + "center=" + lat + "," + lon
                 + "&zoom=14" + "&size=400x400"
                 + "&markers=color:blue|label:C|" + lat + "," + lon
                 + "&maptype=roadmap"
                 + "&key=" + STATICMAPSAPIKEY;
    return requestURL
}
export function createMapsURLfromLatLon2(latlonarr, bool, markerarr){
    //Generate MAPS URL from list of intersection lat lng coordinates
    /*input: 
        - latlonarr: array of [lat,lon] arrays for each marker
        - bool: true if want marker on map
        - markerarr -> lat lon for marker point
    */
    var requestURL = MAPSURLSTART + "&size=400x400";
    if (bool){
        requestURL += "&markers=color:blue|label:C|" + markerarr[0] + "," + markerarr[1];
    }
    requestURL += "&path=color:0x0000ff80|weight:3|";
    for (var i = 0; i < latlonarr.length; i++){
        requestURL += latlonarr[i] + "|";
        if (i == latlonarr.length - 1){
            requestURL += latlonarr[0];
        }
    }
    requestURL += "&maptype=roadmap&key=" + STATICMAPSAPIKEY;
    return requestURL
}

export function parseCorner(address, delimiter){
    //Generate address portion of GEOCODING URL from text input of INTERSECTION
    var returnAddress = "";
    var sectionArray = address.split(",");
    for (var i=0; i < sectionArray.length; i++){
        if (i == 0) {
            var streets = sectionArray[i].split(delimiter);
            var addedStart = "CORNER%20";
            for (var j=0; j < streets.length; j++){
                var finalSplit = streets[j].split(" ");
                for (var k=0; k < finalSplit.length; k++){
                    addedStart += finalSplit[k];
                    if (k != finalSplit.length - 1){
                        addedStart += "+";
                    }
                }
                if (j != streets.length - 1){
                    addedStart += "+%20AND%20"
                }
            }
            returnAddress += addedStart + ",";
        }else{
            returnAddress += sectionArray[i];
            if (i != sectionArray.length - 1){
                returnAddress += ",";
            }
        }

    }
    return returnAddress;
}
export function parseAddress(address){
    //Generate address portion of GEOCODING URL from text input of ADDRESS
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

// export function getLatLon(url, uiCallback){
//     var message = new Message(url);
//     var promise = message.invoke(Message.JSON);
//     promise.then(json => {
//         if (0 == message.error && 200 == message.status){
//             try {
//                 trace(json.status + "\n");
//                 uiCallback(json)
//             }
//             catch (e) {
//                 throw('Web service responded with invalid JSON!\n');
//             }
//         }
//         else{
//             trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
//         }
//     })
// }
function latlongHelper(json, arr){
    var temp = [];
    temp.push(json.results[0].geometry.location.lat);
    temp.push(json.results[0].geometry.location.lng);
    arr.push(temp);
}
export function getLatLonFourCorners(urls, uiCallback){
    //Generate all 4 LAT LNG pairs given list of GEOCODE API URLS
    var arr = [];
    var message = new Message(urls[0]);
    var promise = message.invoke(Message.JSON);
    promise.then(json => {
        if (0 == message.error && 200 == message.status){
            try {
                latlongHelper(json, arr);
                message = new Message(urls[1]);
                return message.invoke(Message.JSON);
            }
            catch (e) {
                throw('Web service responded with invalid JSON!\n');
            }
        }
        else{
            trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
        }
    }).then(json => {
        if (0 == message.error && 200 == message.status){
            try {
                latlongHelper(json, arr);
                message = new Message(urls[2]);
                return message.invoke(Message.JSON);
            }
            catch (e) {
                throw('Web service responded with invalid JSON!\n');
            }
        }
        else{
            trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
        }
    }).then(json => {
        if (0 == message.error && 200 == message.status){
            try {
                latlongHelper(json, arr);
                message = new Message(urls[3]);
                return message.invoke(Message.JSON);
            }
            catch (e) {
                throw('Web service responded with invalid JSON!\n');
            }
        }
        else{
            trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
        }
    }).then(json => {
        if (0 == message.error && 200 == message.status){
            try {
                latlongHelper(json, arr);
                uiCallback(arr);
            }
            catch (e) {
                throw('Web service responded with invalid JSON!\n');
            }
        }
        else{
            trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
        }
    })
}

export function getMapsImg(url, uiCallback){
    //Generate GOOGLE STATIC MAPS image
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

export function saveRoute(dict){
    //input is dictionary with 1) name and 2) Google Maps url 
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".routes/");
    Files.ensureDirectory(uri)
    var routeJson = {
        name: dict.name,
        url: dict.url
    };
    var routeFileName = routeJson.name + ".json";
    var uriRoute = mergeURI(Files.preferencesDirectory, application.di + ".routes/" + routeFileName);
    trace(uriRoute + "\n");
    Files.writeJSON(uriRoute, routeJson);
}
export function deleteRoute(routeName){
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".routes/");
    var route = uri + routeName + ".json";
    Files.deleteFile(route);
}
export function readSavedRoutes(){
    var uri = mergeURI(Files.preferencesDirectory, application.di + ".routes/");
    var mapObjects = [];
    var info, iterator = new Files.Iterator(uri);
    while (info = iterator.getNext()){
        var currPath = uri + info.path;
        var route = Files.readJSON(currPath);
        mapObjects.push(route);
    }
    return mapObjects;
}

// export function getMarkerMaps(urls, uiCallback){
//     //Generate all 4 LAT LNG pairs given list of GEOCODE API URLS
//     var arr = [];
//     var message = new Message(urls[0]);
//     var promise = message.invoke(Message.JSON);
//     promise.then(json => {
//         if (0 == message.error && 200 == message.status){
//             try {
//                 arr.push(json);
//                 message = new Message(urls[1]);
//                 return message.invoke(Message.JSON);
//             }
//             catch (e) {
//                 throw('Web service responded with invalid JSON!\n');
//             }
//         }
//         else{
//             trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
//         }
//     }).then(json => {
//         if (0 == message.error && 200 == message.status){
//             try {
//                 arr.push(json);
//                 message = new Message(urls[2]);
//                 return message.invoke(Message.JSON);
//             }
//             catch (e) {
//                 throw('Web service responded with invalid JSON!\n');
//             }
//         }
//         else{
//             trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
//         }
//     }).then(json => {
//         if (0 == message.error && 200 == message.status){
//             try {
//                 arr.push(json);
//                 message = new Message(urls[3]);
//                 return message.invoke(Message.JSON);
//             }
//             catch (e) {
//                 throw('Web service responded with invalid JSON!\n');
//             }
//         }
//         else{
//             trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
//         }
//     }).then(json => {
//         if (0 == message.error && 200 == message.status){
//             try {
//                 arr.push(json);
//                 uiCallback(arr);
//             }
//             catch (e) {
//                 throw('Web service responded with invalid JSON!\n');
//             }
//         }
//         else{
//             trace('Request Failed - Raw Response Body: *' + '\n' +text+'*'+'\n');
//         }
//     })
// }