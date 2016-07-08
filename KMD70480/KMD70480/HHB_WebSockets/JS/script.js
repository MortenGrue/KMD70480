var connection = new WebSocket(document.getElementById("txtUrl").value);

function StartWebSocket() {
    if (connection == null || connection == undefined) {
        connection = new WebSocket(document.getElementById('txtUrl').value);
        console.log(connection.url);
        Output("Starting Websocket", "Client");
    } else {

        Output("Websocket is already running", "Client");
    }
}
function StopWebSocket() {
    connection = null;
    Output("Websocket stopped", "Client");
}
function Output(message, from) {
    console.log(from + ": " + message);
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(from + ": " + message));
    ul.appendChild(li);
}

function SendMessage() {

    var message = document.getElementById("txtMessage").value;
    Output("Sending message to server: " + message,"Client");
    if (connection != null || connection != undefined) {
        Output(connection.bufferedAmount);
        connection.send(message);
        Output(connection.bufferedAmount);
    }
}
connection.onopen = function () {
    connection.send('Ping');
    Output("Pinging Server", "Client");
}
connection.onerror = function (error) {
    Output("WebSocket Error", "Client");
}

connection.onmessage = function (e) {
    Output(e.data, "Server");
}



