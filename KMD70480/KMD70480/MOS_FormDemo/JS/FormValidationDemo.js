function ValidateTextBox1() {
    var textBox = $('#textBox1');
    var regEx = /\d{3}\w{4}/;
    if (textBox.val().match(regEx)) {
        textBox.removeClass("error");
        textBox.addClass("good");
        return true;
    } else {
        textBox.removeClass("good");
        textBox.addClass("error");
        return false;
    }
};


function ValidateTextBox2() {
    var textBox = $('#textBox2');
    var regEx = /\d{3}\w{4}/;
    if (textBox.val().match(regEx)) {
        textBox.removeClass("error");
        textBox.addClass("good");
        return true;
    } else {
        textBox.removeClass("good");
        textBox.addClass("error");
        return false;
    }
};

function Validate() {
    var res;
    res = ValidateTextBox1();
    res = ValidateTextBox2() && res;

    return res;
};

function GetId() {
    return $('#IdField').val();
};