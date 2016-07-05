document.getElementById("txtMessage").focus();

console.log("creating worker..");
var messageWorker = new Worker("WebWorker.js");
console.log("worker created");


function StartWorker() {
    console.log("submitMessage method called");
    var message = document.getElementById("txtMessage").value;
    console.log("pre-message: " + message);
    console.log("Posting..");
    messageWorker.postMessage(message);
    console.log("posting done.");

    }
}