window.onload = fetch;

function fetch() {
  var url = "http://hndroidapi.appspot.com/news/format/json?callback=onceFetched";
  var script = document.createElement("script");
  script.setAttribute("src", url);
  document.head.appendChild(script);
}

function onceFetched(data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.items.length; i++) {
    var title = data.items[i].title;
    var url = data.items[i].url;
    var score = data.items[i].score;

    var a = document.createElement("a");
    a.href = url;
    var t = document.createElement("p");
    t.textContent = title;
    var u = document.createElement("p");
    u.textContent = url;
    a.appendChild(t);
    a.appendChild(u);
    var aside = document.createElement("aside");
    aside.textContent = score;
    aside.setAttribute("style", "float:right");
    var li = document.createElement("li");
    li.appendChild(aside);
    li.appendChild(a);

    fragment.appendChild(li);
  }
  var ul = document.querySelector("ul");
  ul.innerHTML = "";
  ul.appendChild(fragment);
}


// Install app
if (navigator.mozApps) {
  var checkIfInstalled = navigator.mozApps.getSelf();
  checkIfInstalled.onsuccess = function () {
    if (checkIfInstalled.result) {
      // Already installed
    } else {
      var install = document.querySelector("#install"),
      manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
/*
To install a package instead, exchange the above line to this:
manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/package.manifest";
*/
      install.className = "show-install";
      install.onclick = function () {
        var installApp = navigator.mozApps.install(manifestURL);
/*
To install a package instead, exchange the above line to this:
var installApp = navigator.mozApps.installPackage(manifestURL);
*/
        installApp.onsuccess = function(data) {
          install.style.display = "none";
        };
        installApp.onerror = function() {
          alert("Install failed\n\n:" + installApp.error.name);
        };
      };
    }
  };
} else {
  console.log("Open Web Apps not supported");
}
