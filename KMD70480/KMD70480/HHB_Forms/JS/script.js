function Validate(event) {
    event.preventDefault();
    console.log("start validating");
    var hasError = false;
    console.log("start getting name");
    var name = document.getElementById("txtName");
    console.log("finshed getting name");
    var age = document.getElementById("txtAge");
    var email = document.getElementById("txtEmail");
    var error = document.getElementById("error");

    $("ul > li").each(function () {

        if (!(this.id in data)) {
            $(this).remove();
        }
    });
    console.log("start validating name");

    var ul = document.getElementById("error");
    if (name.value == "" || name.value == null) {

        var li = document.createElement("li");
        li.appendChild(document.createTextNode("The field Name is empty, but is required!"));
        ul.appendChild(li);
        console.log("error: name is wrong");
        name.setAttribute("class", "fail");
        hasError = true;
    } else {
        console.log("name validated");
        name.setAttribute("class", "ok");
    }
    if (age.value == "" || age.value == null) {

        var li = document.createElement("li");
        li.appendChild(document.createTextNode("The field Age is empty, but is required!"));
        ul.appendChild(li);
        console.log("error: age is wrong");
        age.setAttribute("class", "fail");
        hasError = true;
    } else {
        console.log("Age validated");
        age.setAttribute("class", "ok");
    }
    //if (hasError) {
    //    return false;
    //} else {
    //    return true;
    //}

    return false;
}
