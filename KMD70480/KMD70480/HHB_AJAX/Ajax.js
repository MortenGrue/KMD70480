document.getElementById("txtMessage").focus();

document.getElementById("txtMessage")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("btnSubmit").click();
        }
    });


function StartSync() {
    var message = document.getElementById("txtMessage").value;
    console.log("Getting the value");



    document.getElementById("txtMessage").focus();
}