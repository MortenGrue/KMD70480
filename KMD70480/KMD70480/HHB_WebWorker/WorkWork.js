document.getElementById("txtMessage").focus();

console.log("creating worker..");
var messageWorker = new Worker("../HHB_WebWorker/WebWorker.js");
console.log("worker created");

document.getElementById("txtMessage")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("btnSubmit").click();
        }
    });

messageWorker.onmessage = function (event) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(event.data));
    ul.appendChild(li);
}

function StartWorker() {
    console.log("submitMessage method called");
    var message = document.getElementById("txtMessage").value;
    console.log("pre-message: " + message);
    console.log("Posting..");
    messageWorker.postMessage(message);
    console.log("posting done.");
    document.getElementById("txtMessage").focus();
}