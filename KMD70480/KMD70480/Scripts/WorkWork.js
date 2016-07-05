document.getElementById("txtMessage").focus();

console.log("creating worker..");
var messageWorker = new Worker("../Scripts/WebWorker.js");
console.log("worker created");


function StartWorker() {
    console.log("submitMessage method called");
    var message = document.getElementById("txtMessage").value;
    console.log("pre-message: " + message);
    console.log("Posting..");
    messageWorker.postMessage(message);
    console.log("posting done.");
    document.getElementById("txtMessage").focus();


}
messageWorker.onmessage = function (event)
{
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(event.data));
    ul.appendChild(li);
}
