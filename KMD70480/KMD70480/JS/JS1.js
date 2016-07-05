$(document).ready(function () {


    $('#Text1').click(function () {
        $('#FirstDiv').append("<p>You clicked the Text</p><br />");
    });


    //$('#AjaxDiv').load("./Text_demo.txt.txt");


    function syncAjax() {
        xHttp.onreadystatechange = function () {
            if (xHttp.readyState == 4 && xHttp.status == 200) {
                $('#SyncAjaxDiv').append(xHttp.responseText);
            }
        };

        xHttp.open("GET", "Text_demo.txt.txt");
        xHttp.send();
    }

    syncAjax();
    
    $.ajax({
        url: "./Text_demo.txt.txt",
                
        success: function (data) {
            console.log('Ajax success...');
            $('#AjaxDiv').append("Text file data: " + data);
        }
    });


});

var xHttp = new XMLHttpRequest();