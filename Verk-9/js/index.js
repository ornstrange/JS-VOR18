"use strict";

var people = [
	{
		name: "Karl",
		score: 60,
		date: "15.09.95"
	},
	{
		name: "Lárus",
		score: 80,
		date: "03.03.98"
	},
	{
		name: "Ágúst",
		score: 90,
		date: "24.12.94"
	},
	{
		name: "Nikulás",
		score: 120,
		date: "20.05.95"
	},
	{
		name: "Brynjar",
		score: 180,
		date: "02.08.92"
	}
];

var rows = [],
		$min = $('#value-min'),
		$max = $('#value-max'),
		$table = $('#rates');

function makeRows() {
	people.forEach(function(person) {
		var $row = $('<tr></tr>');
		$row.append( $('<td></td>').text(person.name) );
		$row.append( $('<td></td>').text(person.score) );
		$row.append( $('<td></td>').text(person.date) );
		rows.push({
			person: person,
			$element: $row,
		});
	});
}

function appendRows() {
	var $tbody = $('<tbody></tbody>');
	rows.forEach(function(row) {
		$tbody.append(row.$element);
	});
	$table.append($tbody);
}

function update(min, max) {
	rows.forEach(function(row) {
		if (row.person.score >= min && row.person.score <= max) {
			row.$element.show();
		} else {
			row.$element.hide();
		}
	});
}

function init() {
	$('#slider').noUiSlider({
		range: [0, 150], start: [20, 130], handles: 2, margin: 20, connect: true,
		serialization: {to: [$min, $max],resolution: 1}
	}).change(function() { update($min.val(), $max.val()); });
	makeRows();
	appendRows();
	update($min.val(), $max.val());
}

$(init);

var CustomImg = function(name,url,tags) {
	this.img = new Image(300,150);
	this.img.src = url;
	this.img.title = name;
	this.tags = tags;
	this.img.alt = tags;
};

CustomImg.prototype.doesMatch = function(query) {
	query = query.toLowerCase();
	if (this.img.alt.toLowerCase().includes(query) || this.img.title.toLowerCase().includes(query)) {
		return true;
	}
	return false;
};

var imgs = [
	new CustomImg("Rabbit", "http://javascriptbook.com/code/c12/img/p1.jpg", ["Animators", "Illustrators"]),
	new CustomImg("Sea", "http://javascriptbook.com/code/c12/img/p2.jpg", ["Photographers", "Filmmakers"]),
	new CustomImg("Deer", "http://javascriptbook.com/code/c12/img/p3.jpg", ["Photographers", "Filmmakers"]),
	new CustomImg("New York Street Map", "http://javascriptbook.com/code/c12/img/p4.jpg", ["Designers"]),
	new CustomImg("Trumpet Player", "http://javascriptbook.com/code/c12/img/p5.jpg", ["Photographers"]),
	new CustomImg("Typographic Study", "http://javascriptbook.com/code/c12/img/p6.jpg", ["Designers"]),
	new CustomImg("Bicycle Japan", "http://javascriptbook.com/code/c12/img/p7.jpg", ["Animators", "Illustrators"]),
	new CustomImg("Aqua Logo", "http://javascriptbook.com/code/c12/img/p8.jpg", ["Animators", "Illustrators"]),
	new CustomImg("Ghost", "http://javascriptbook.com/code/c12/img/p9.jpg", ["Photographers", "Filmmakers"]),
];

var gallery = $("#gallery");
var $buttons = $('#buttons');
var tagged = {};
var $search = $('#filter-search');

imgs.forEach(function(image) {
  var tags = image.tags;

  if (tags) {
    tags.forEach(function(tagName) {
      if (tagged[tagName] == null) {
        tagged[tagName] = [];
      }
      tagged[tagName].push(image.img);
    });
  }

	gallery.append(image.img);
});

var $imgs = $("#gallery img");

$('<button/>', {
  text: 'Show All',
  class: 'active',
  click: function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
    $imgs.show();
  }
}).appendTo($buttons);

$.each(tagged, function(tagName) {
  $('<button/>', {
    text: tagName + ' (' + tagged[tagName].length + ')',
    click: function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $imgs
        .hide()
        .filter(tagged[tagName])
        .show();
    }
  }).appendTo($buttons);
});

function filter() {
  var query = this.value.trim().toLowerCase();
  if (query) {
  	imgs.forEach(function(image) {
  		if (!image.doesMatch(query)) {
  			image.img.hidden = true;
  		} else {
  			image.img.hidden = false;
  		}
  	})
  };
};

if ('oninput' in $search[0]) {
  $search.on('input', filter);
} else {
  $search.on('keyup', filter);
};