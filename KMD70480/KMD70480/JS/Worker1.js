onmessage = function (e) {
    console.log('Message received from main script');
    var workerResult = "Worker Talking, i got: " + e.data;
    console.log(workerResult);
    console.log('Posting message back to main script');
    postMessage(workerResult);
}