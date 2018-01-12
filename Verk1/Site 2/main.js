var items = ["Milk", "Parmesan Cheese", "Chicken Breasts", "Coffee Beans", "Doritos"];
var list = document.getElementById("list");

var ss = "";
for (var i = 0; i < items.length; i++) {
  var s = "<li class=\"item\">" + items[i] + "</li>";
  ss += s
}

list.innerHTML = ss;