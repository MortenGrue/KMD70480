function StartASync(url) {
    console.log("starting");
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
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
            li.appendChild(document.createTextNode("Test | Asynchronous JavaScript"));
            li.appendChild(ulchild);

            ul.appendChild(li);
            console.log(result);
            console.log("Asynchronous JavaScript End");
        };
    };

    ajax.open("GET", url, true);
    ajax.send();

}