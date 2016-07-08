var connection = new WebSocket(document.getElementById("txtUrl").value);

function StartWebSocket() {
    if (connection == null || connection == undefined) {
        connection = new WebSocket(document.getElementById('txtUrl').value);
        console.log(connection.url);
    } else {

        Output("Websocket is already running", "Client");
    }
}
function StopWebSocket() {
    connection.close();
    Status();
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
    Output("Message: " + message, "Client");
    if (connection != null || connection != undefined) {
        Output(connection.bufferedAmount);
        connection.send(message);
        Output(connection.bufferedAmount);
    }
}
function Status() {
    Output("ReadyState: " + connection.readyState + " |Buffered amount: " + connection.bufferedAmount + " |BinaryType: " + connection.binaryType, "Client");
   
}
connection.onopen = function () {
    Output("Starting Websocket", "Client");
    SendMessage();
}
connection.onerror = function (error) {
    Output("WebSocket Error", "Client");
}

connection.onmessage = function (e) {
    Output(e.data, "Server");
}
connection.onclose = function(e) {
    Output("WebSocket Closed", "Client");
    connection.close();
}


