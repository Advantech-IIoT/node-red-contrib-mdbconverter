﻿var child_process = require("child_process");


function exec(cmd,callback) {

    console.log("Executing " ,cmd);
    var the_code = 61;
    var child = child_process.exec(cmd,function(err) {
    });

    child.stdout.pipe(process.stdout);

    child.on('close', function(code) {
        the_code = code;
        console.log("done ... (" + the_code + ")");
        callback();
    });
}

exec("postinstall.bat",function() {
});

