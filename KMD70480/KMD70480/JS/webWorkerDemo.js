var w = new Worker("JS/Worker1.js");

startWorker();

function startWorker() {    
    w.postMessage("test WebWorker");
    console.log('Message posted to worker');
};


