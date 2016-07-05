$(document).ready(function () {


    $('#Text1').click(function () {
        $('#FirstDiv').append("<p>You clicked the Text</p><br />");
    });


    $('#AjaxDiv').load("./Text_demo.txt.txt");


    $.ajax("./Text_demo.txt.txt", $('#AjaxDiv').append())
});

