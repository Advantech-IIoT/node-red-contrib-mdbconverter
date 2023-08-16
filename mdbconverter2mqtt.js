/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// If you use this as a template, update the copyright with your own name.

// Sample Node-RED node file


module.exports = function(RED) {
    "use strict";
    // require any external libraries we may need....
    //var foo = require("foo-library");

    // The main node definition - most things happen in here
    function ModbusConverter2MQTT(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
		this.outtype = n.outtype;
		this.outendian = n.outendian;
		this.outlength = n.outlength;
		this.template = n.template;
		this.changetrigger = n.changetrigger;
		this.condition = n.condition;
		this.threshold = n.threshold;
		this.prepayload = [null];

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;

        // Do whatever you need to do in here - declare callbacks etc
        // Note: this sample doesn't do anything much - it will only send
        // this message once at startup...
        // Look at other real nodes for some better ideas of what to do....
        var msg = {};
        msg.topic = this.topic;
        //msg.payload = "Hello Modbus Data Converter !"

        // send out the message to the rest of the workspace.
        // ... this message will get sent at startup so you may not see it in a debug node.
        //this.send(msg);

        // respond to inputs....
        this.on('input', function (msg) {
			var mdbconverter = require('./lib/mdbconverter');
			var trigger = true;
			if(node.changetrigger)
			{
				trigger = (this.prepayload.length == msg.payload.length) && this.prepayload.every(function(element, index){ 
					return element===msg.payload[index]; 
				});
				if(!trigger)this.prepayload = msg.payload;
				else return;
			}
			//node.warn(node.outtype + "," + node.outendian + "," + node.outlength);
			/*
			var result = mdbconverter.convert2string(msg.payload, node.outtype, node.outendian, node.outlength, node.template);
			if(result[0]!=0)node.warn("get err: "+ result[0]);
			msg.payload = result[1];
			var compare = false;
			if(this.threshold==""){if(msg.payload)node.send(msg);}
			else
			{
				switch(this.condition)
				{
					case "0":
						compare = result[2] == this.threshold;
					break;
					case "1":
						compare = result[2] != this.threshold;
					break;
					case "2":
						compare = result[2] > this.threshold;
					break;
					case "3":
						compare = result[2] < this.threshold;
					break;
				}
				if(compare){if(msg.payload)node.send(msg);}
			}
			*/
			mdbconverter.convert2stringCB(function(result){
				if(result[0]!==0)node.warn("get err: "+ result[0]);
				else
				{
					msg.payload = result[1];
					var compare = false;
					if(node.threshold===""){if(msg.payload!=="")node.send(msg);}
					else
					{
						switch(node.condition)
						{
							case "1":
								compare = result[2] != node.threshold;
							break;
							case "2":
								compare = result[2] > node.threshold;
							break;
							case "3":
								compare = result[2] < node.threshold;
							break;
							case "0":
							default:
								compare = result[2] == node.threshold;
							break;
						}
						if(compare){if(msg.payload!=="")node.send(msg);}
					}
				}
			}, msg.payload, node.outtype, node.outendian, node.outlength, node.template);
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("modbus-converter2mqtt",ModbusConverter2MQTT);

};
