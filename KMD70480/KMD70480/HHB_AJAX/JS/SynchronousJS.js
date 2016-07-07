function StartSync(url) {
    console.log("Starting Synchronous JavaScript");
    var ajax = new XMLHttpRequest();
    ajax.open("GET", url, false);
    ajax.send();
    result = JSON.parse(ajax.responseText);
    var ul = document.getElementById("list");

    var li = document.createElement("li");
    var ulchild = document.createElement("ul");

    for (var x = 0; x < result.length; x++) {
        console.log(result[x].ContactName);
        var lichild = document.createElement("li");
        lichild.appendChild(document.createTextNode(result[x].ContactName + " FROM " + result[x].CompanyName));
        ulchild.appendChild(lichild);
    }
    li.appendChild(document.createTextNode("Test | Synchronous JavaScript"));
    li.appendChild(ulchild);

    ul.appendChild(li);
    console.log(result);
    console.log("Synchronous JavaScript End");
};