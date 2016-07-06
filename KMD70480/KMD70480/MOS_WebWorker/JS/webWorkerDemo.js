var w = new Worker("JS/Worker1.js");

startWorker();

w.onmessage = function (e) {
    $('#FirstDiv').append("<br /> " + e.data);
    console.log('Message received from worker');

}

function startWorker() {
    var s = $('#TextBox1').val();
    w.postMessage("Info to Worker: " + s); 
    console.log('Message posted to worker');
};


