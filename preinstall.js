var child_process = require("child_process");


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

function win32or64() {
    if (process.env.PROCESSOR_ARCHITECTURE === "x86" && process.env.PROCESSOR_ARCHITEW6432) {
        return 64;
    }

    if (process.env.PROCESSOR_ARCHITECTURE === "AMD64" ) {
        return 64;
    }

    // check if we are running nodejs x32 on a x64 arch
    if (process.env.CURRENT_CPU === "x64") {
        return 64;
    }
    return 32;
}

if((win32or64() === 64))
{
	exec("copy .\\lib\\x64\\mdbconverter.node .\\lib\\",function() {
	});
	//exec("copy .\\dll\\x64\\*.dll .\\dll\\",function() {
	//});
}
else
{
	exec("copy .\\lib\\ia32\\mdbconverter.node .\\lib\\",function() {
	});
	//exec("copy .\\dll\\Win32\\*.dll .\\dll\\",function() {
	//});
}