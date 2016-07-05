onmessage = function (e) {
    console.log("Message received");
    var d = new Date();
    postMessage(d.getHours() +
        ":" + d.getMinutes() +
        ":" + d.getSeconds() +
        ": " + e.data);
};