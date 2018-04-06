// hata öll þessi komment

(function() {

  // STORE EACH PERSON AS AN OBJECT IN AN ARRAY
  var people = [
    {                                              // Each person is an object
      name: "Karl",                               // It holds name and rate
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

  var rows = [],                        // rows array
      $min = $('#value-min'),           // Minimum text input
      $max = $('#value-max'),           // Maximum text input
      $table = $('#rates');             // The table that shows results

  function makeRows() {                 // Create table rows and the array
    people.forEach(function(person) {   // For each person object in people
      var $row = $('<tr></tr>');        // Create a row for them
      $row.append( $('<td></td>').text(person.name) ); // Add their name
      $row.append( $('<td></td>').text(person.score) ); // Add their score
      $row.append( $('<td></td>').text(person.date) ); // Add their score
      rows.push({ // Create rows array which links people objects to table rows
        person: person,                 // Reference to the person object
        $element: $row,                  // Reference to row as jQuery selection
      });
    });
  }

  function appendRows() {               // Adds rows to the table
    var $tbody = $('<tbody></tbody>');  // Create <tbody> element
    rows.forEach(function(row) {        // For each object in the rows array
      $tbody.append(row.$element);      // Add the HTML for the row
    });
    $table.append($tbody);              // Add the rows to the table
  }

  function update(min, max) {           // Update the table content
    rows.forEach(function(row) {        // For each row in the rows array
      if (row.person.score >= min && row.person.score <= max) { // If in range
        row.$element.show();            // Show the row
      } else {                          // Otherwise
        row.$element.hide();            // Hide the row
      }
    });
  }

  function init() {                     // Tasks when script first runs
    $('#slider').noUiSlider({           // Set up the slide control
      range: [0, 150], start: [20, 130], handles: 2, margin: 20, connect: true,
      serialization: {to: [$min, $max],resolution: 1}
    }).change(function() { update($min.val(), $max.val()); });
    makeRows();                           // Create table rows and rows array
    appendRows();                         // Add the rows to the table
    update($min.val(), $max.val());     // Update table to show matches
  }

  $(init);                              // Call init() when DOM is ready
}());

(function() {

  var imgs = [
    { name: "Rabbit",
      url: "http://javascriptbook.com/code/c12/img/p1.jpg",
      img: new Image(300,150),
      tags: ["Animators", "Illustrators"] },
    { name: "Sea",
      url: "http://javascriptbook.com/code/c12/img/p2.jpg",
      img: new Image(300,150),
      tags: ["Photographers", "Filmmakers"] },
    { name: "Deer",
      url: "http://javascriptbook.com/code/c12/img/p3.jpg",
      img: new Image(300,150),
      tags: ["Photographers", "Filmmakers"] },
    { name: "New York Street Map",
      url: "http://javascriptbook.com/code/c12/img/p4.jpg",
      img: new Image(300,150),
      tags: ["Designer"] },
    { name: "Trumpet Player",
      url: "http://javascriptbook.com/code/c12/img/p5.jpg",
      img: new Image(300,150),
      tags: ["Photographers", "Filmmakers"] },
    { name: "Typographic Study",
      url: "http://javascriptbook.com/code/c12/img/p6.jpg",
      img: new Image(300,150),
      tags: ["Designers", "Illustrators"] },
    { name: "Bicycle Japan",
      url: "http://javascriptbook.com/code/c12/img/p7.jpg",
      img: new Image(300,150),
      tags: ["Photographers"] },
    { name: "Aqua Logo",
      url: "http://javascriptbook.com/code/c12/img/p8.jpg",
      img: new Image(300,150),
      tags: ["Designers"] },
    { name: "Ghost",
      url: "http://javascriptbook.com/code/c12/img/p9.jpg",
      img: new Image(300,150),
      tags: ["Animators", "Illustrators"] }
  ];
  var gallery = $("#gallery");
  var $buttons = $('#buttons');                   // Store buttons element
  var tagged = {};                                // Create tagged object
  var $search = $('#filter-search');      // Get the input element

  imgs.forEach(function(image) {                         // Loop through images and
    image.img.src = image.url;                              // Store img in variable
    var tags = image.tags

    if (tags) {                                   // If the element had tags
      tags.forEach(function(tagName) {
        if (tagged[tagName] == null) {            // If object doesn't have tag
          tagged[tagName] = [];                   // Add empty array to object
        }
        tagged[tagName].push(image.img);                // Add the image to the array
      });
    }

    gallery.append(image.img);
  });

  var $imgs = $("#gallery img")

  $('<button/>', {                                 // Create empty button
    text: 'Show All',                              // Add text 'show all'
    class: 'active',                               // Make it active
    click: function() {                            // Add onclick handler to
      $(this)                                      // Get the clicked on button
        .addClass('active')                        // Add the class of active
        .siblings()                                // Get its siblings
        .removeClass('active');                    // Remove active from siblings
      $imgs.show();                                // Show all images
    }
  }).appendTo($buttons);                           // Add to buttons

  $.each(tagged, function(tagName) {               // For each tag name
    $('<button/>', {                               // Create empty button
      text: tagName + ' (' + tagged[tagName].length + ')', // Add tag name
      click: function() {                          // Add click handler
        $(this)                                    // The button clicked on
          .addClass('active')                      // Make clicked item active
          .siblings()                              // Get its siblings
          .removeClass('active');                  // Remove active from siblings
        $imgs                                      // With all of the images
          .hide()                                  // Hide them
          .filter(tagged[tagName])                 // Find ones with this tag
          .show();                                 // Show just those images
      }
    }).appendTo($buttons);                         // Add to the buttons
  });

  function filter() {                     // Declare filter() function
    var query = this.value.trim().toLowerCase();  // Get the query
    // cache.forEach(function(img) {         // For each entry in cache pass image 
    //   var index = 0;                      // Set index to 0

    //   if (query) {                        // If there is some query text
    //     index = img.text.indexOf(query);  // Find if query text is in there
    //   }

    //   img.element.style.display = index === -1 ? 'none' : '';  // Show / hide
    // });
    imgs.forEach(function(image) {                         // Loop through images and
      if (query) {                        // If there is some query text
        index = imgs.indexOf(query);  // Find if query text is in there
      }
    });
  }

  if ('oninput' in $search[0]) {          // If browser supports input event
    $search.on('input', filter);          // Use input event to call filter()
  } else {                                // Otherwise
    $search.on('keyup', filter);          // Use keyup event to call filter()
  }
}());