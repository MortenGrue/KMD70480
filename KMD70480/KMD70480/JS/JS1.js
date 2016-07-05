$(document).ready(function () {
    $('#Button1').click(function () {
        $('#FirstDiv').append("<p>You clicked the button</p><br />");
    });

    $('#Text1').click(function () {
        $('#FirstDiv').append("<p>You clicked the Text</p><br />");
    });


    $('#AjaxDiv').load("./Text_demo.txt.txt");   
});

