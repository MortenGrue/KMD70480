var messageWorker;

function submitMessage() {
    console.log("submitMessage method called");
    var message = document.getElementById("txtMessage").value;
    console.log("pre-message: " + message);
    if (typeof (Worker) !== "undefined") {
        console.log("Worker is supported");
        if (typeof (messageWorker) == "undefined") {
            console.log("Creating worker");
            messageWorker = new Worker("WebWorker.js");
         
            console.log(messageWorker);
            console.log("Worker created");
        }
        console.log("Posting..");
        messageWorker.postMessage(message);
        console.log("posting done.");

        //messageWorker.onmessage = function (event) {
        //    alert("Stuff is received: " + event.data);

        //    var ul = document.getElementById("list");
        //    var li = document.createElement("li");
        //    li.appendChild(document.createTextNode(event.data));
        //    ul.appendChild(li);
        //};

    } else {
        console.log("Stuff is broken, workers are not supported");
    }
    return false; // overriding default submit
}