var w = new Worker("JS/Worker1.js");

startWorker();

w.onmessage = function (e) {
    $('#FirstDiv').append(" " + e.data);
    console.log('Message received from worker');

}

function startWorker() {    
    w.postMessage("Info to Worker");
    console.log('Message posted to worker');
};


