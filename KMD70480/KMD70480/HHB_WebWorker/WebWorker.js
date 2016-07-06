console.log('Worker Started');
// Be aware: worker has no acces to dom elements
// but can eg make ajax calls
// no access to global scope
onmessage = function (e) {

    //setTimeout => delay function call
    setTimeout(function() {

        console.log("Message received");
        var d = new Date();
        postMessage(d.getHours() +
            ":" + d.getMinutes() +
            ":" + d.getSeconds() +
            ": " + e.data);
    }, 2000);
};
//console.log('Worker Ended');
//self.close();