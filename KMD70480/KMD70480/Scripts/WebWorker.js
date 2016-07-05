onmessage = function (e) {
    console.log("Message received");
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(e.data));
    ul.appendChild(li);

};