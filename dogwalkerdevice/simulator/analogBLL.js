//@module/*  Copyright 2011-2014 Marvell Semiconductor, Inc.  Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.  You may obtain a copy of the License at      http://www.apache.org/licenses/LICENSE-2.0  Unless required by applicable law or agreed to in writing, software  distributed under the License is distributed on an "AS IS" BASIS,  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and  limitations under the License.*/var PinsSimulators = require("PinsSimulators");exports.pins = {    analog: {type: "Analog", direction: "input"},    ground: {type: "Ground"},    power: {type: "Power"}};   exports.configure = function(configuration) {  //addSimulatorPart(JSON) creates the data-driven pins simulator  this.pinsSimulator = shell.delegate("addSimulatorPart", {    header : {       label : "Analog",       name : "Analog Input",       iconVariant : PinsSimulators.SENSOR_SLIDER    },    axes : [      new PinsSimulators.AnalogInputAxisDescription(        {          ioType: "input",          dataType: "float",          valueLabel : "Food Steps",          valueID : "steps",          defaultControl: PinsSimulators.SLIDER        }      ),    ]  });  this.state = -1;}exports.read = function() {  this.state = this.pinsSimulator.delegate("getValue").steps;  return this.state;        }// exports.increment = function(){//   // if (this.pinsSimulator.delegate("getValue").steps + 1 <= 100){//   //   this.pinsSimulator.delegate("setValue", this.pinsSimulator.delegate("getValue").steps + 1);//   // }else{//   //   this.pinsSimulator.delegate("setValue", 0);//   // }//   this.pinsSimulator.delegate("setValue", this.pinsSimulator.delegate("getValue").steps + .01);//   return this.pinsSimulator.delegate("getValue").steps + .01 ;}exports.newwrite = function(value){    this.pinsSimulator.delegate("setValue", this.pinsSimulator.delegate("getValue").steps + value);    return this.pinsSimulator.delegate("getValue").steps;    // this.state = this.pinsSimulator.delegate("setValue", value);}exports.close = function() {	shell.delegate("removeSimulatorPart", this.pinsSimulator);}