function StartAsynchronousJQ() {
    console.log("starting Asynchronous jQuery");

    var url = "../HHB_AJAX/data.json";
    $.ajax({
        url: url,
        cache: false,
        async: true
    })
      .done(function (data) {

          var ul = document.getElementById("list");

          var li = document.createElement("li");
          var ulchild = document.createElement("ul");

          for (var x = 0; x < data.length; x++) {
              console.log(data[x].ContactName);
              var lichild = document.createElement("li");
              lichild.appendChild(document.createTextNode(data[x].ContactName + " FROM " + data[x].CompanyName));
              ulchild.appendChild(lichild);
          }
          li.appendChild(document.createTextNode("Test | Asynchronous jQuery"));
          li.appendChild(ulchild);

          ul.appendChild(li);
          console.log(data);
          console.log("Asynchronous jQuery End");
      });
};