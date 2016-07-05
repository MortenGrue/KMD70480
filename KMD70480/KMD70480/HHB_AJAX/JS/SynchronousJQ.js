function StartSynchronousJQ() {
    console.log("starting Synchronous jQuery");

    var url = "../HHB_AJAX/data.json";
    $.ajax({
        url: url,
        cache: false,
        async: false
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
          li.appendChild(document.createTextNode("Test | Synchronous jQuery"));
          li.appendChild(ulchild);

          ul.appendChild(li);
          console.log(data);
          console.log("Synchronous jQuery End");
      });
};
