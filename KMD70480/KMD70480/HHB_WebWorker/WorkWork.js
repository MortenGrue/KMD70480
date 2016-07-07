document.getElementById("txtMessage").focus();

var messageWorker = new Worker("../HHB_WebWorker/WebWorker.js");


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

messageWorker.addEventListener('message',function (event){console.log("using Listener: " + event.data);});

function StartWorker() {
    var message = document.getElementById("txtMessage").value;
    messageWorker.postMessage(message);
    document.getElementById("txtMessage").focus();
}

function StartBot() {

//repeat function call every x miliseconds
    setInterval(function () {
        messageWorker.postMessage("Hi Human! Im a bot!");

    },1000)}