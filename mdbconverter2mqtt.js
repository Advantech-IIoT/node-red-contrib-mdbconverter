module.exports=function(t){"use strict";t.nodes.registerType("modbus-converter2mqtt",function(e){t.nodes.createNode(this,e),this.topic=e.topic,this.outtype=e.outtype,this.outendian=e.outendian,this.outlength=e.outlength,this.template=e.template,this.changetrigger=e.changetrigger,this.condition=e.condition,this.threshold=e.threshold,this.prepayload=[null];var o=this;({}).topic=this.topic,this.on("input",function(t){var e=require("./lib/mdbconverter");if(o.changetrigger){if(this.prepayload.length==t.payload.length&&this.prepayload.every((e,o)=>e===t.payload[o]))return;this.prepayload=t.payload}e.convert2stringCB(e=>{if(0!==e[0])o.warn("get err: "+e[0]);else{t.payload=e[1];var i=!1;if(""===o.threshold)""!==t.payload&&o.send(t);else{switch(o.condition){case"1":i=e[2]!=o.threshold;break;case"2":i=e[2]>o.threshold;break;case"3":i=e[2]<o.threshold;break;case"0":default:i=e[2]==o.threshold}i&&""!==t.payload&&o.send(t)}}},t.payload,o.outtype,o.outendian,o.outlength,o.template)}),this.on("close",()=>{})})};