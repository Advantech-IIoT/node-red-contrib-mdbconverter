module.exports=function(t){"use strict";t.nodes.registerType("modbus-data-converter",function(e){t.nodes.createNode(this,e),this.topic=e.topic,this.outtype=e.outtype,this.outendian=e.outendian,this.outlength=e.outlength;var o=this;({}).topic=this.topic,this.on("input",t=>{require("./lib/mdbconverter").convertCB(e=>{0!==e[0]?o.warn("get err: "+e[0]):(t.payload=e[1],void 0!=t.payload&&o.send(t))},t.payload,o.outtype,o.outendian,o.outlength)}),this.on("close",()=>{})})};
