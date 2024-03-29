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
    function ModbusDataConverterNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
		this.outtype = n.outtype;
		this.outendian = n.outendian;
		this.outlength = n.outlength;

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
			//node.warn(node.outtype + "," + node.outendian + "," + node.outlength);
			/*
			var result = mdbconverter.convert(msg.payload, node.outtype, node.outendian, node.outlength);
			if(result[0]!=0)node.warn("get err: "+ result[0]);
			msg.payload = result[1];
            // node.warn("I saw a payload: "+msg.payload);
            // in this example just send it straight on... should process it here really
			if(msg.payload)node.send(msg);
			*/
			///*
			mdbconverter.convertCB(function(result){
				if(result[0]!==0)node.warn("get err: "+ result[0]);
				else
				{
					msg.payload = result[1];
					if(msg.payload!=undefined)node.send(msg);
				}
			}, msg.payload, node.outtype, node.outendian, node.outlength);
			//*/
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("modbus-data-converter",ModbusDataConverterNode);

};
