// Project: Giphy API app
// Jacob Stanger
// Jan 2020

$(document).ready(function () {

  // ===================================================
  // GLOBAL VARIABLES
  // ===================================================
  var listOfTitles = ['dragon', 'eagle', 'gecko', 'cat', 'dog', 'catdog'];
  var listOfButtons = [];
  var randomNumber = Math.floor(Math.random() * 62);

  // ===================================================
  // START APP
  // ===================================================
  loadThePage();




  // ===================================================
  // CUSTOM FUNCTIONS
  // ===================================================
  function loadThePage() {
    // TODO: create and load the list of animal buttons
    loadButtonArray(listOfTitles);
    displayAllButtons(listOfButtons);
  }

  function submitNewAnimal() {
    event.preventDefault();
    var animal = $('#animal-input').val().trim();
    var animalButton = createButton(animal);

    // clear out input
    $('#animal-input').val('');

    listOfButtons.push(animalButton);
    displayAllButtons(listOfButtons);
  }


  function getTheGifsFromGiphy() {
    var daGif = $(this).attr('data-gif');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZrhJhYmel74Dmx4uq2zHvmOSxXpNlSgu&q=" +
      daGif.split(' ').join('+') + "&limit=10&offset=" + randomNumber + "&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      var results = response.data;

      for (let i = 0; i < results.length; i++) {

        var parentDiv = $('<div>').addClass('col-sm-4 card-deck');
        var cardDiv = $('<div>').addClass('card mb-4 shadow-sm mx-auto');
        parentDiv.append(cardDiv);

        // ===== Title ================
        // var cardTitle = $('<h5>').text('put json title thing here');
        var cardTitle = $('<h3>').text(results[i].title).addClass('card-title');
        var cardRating = $('<h6>').text('rating: ' + results[i].rating).addClass('text-muted');
        var cardSource = $('<h7>').text('source: ' + results[i].source_tld).addClass('text-muted');
        // var cardSource2 = $('<p>').text('source: ' + results[i].source_tld).addClass('text-muted');

        if (results[i].source_tld === '') {
          cardSource.text('source: unknown');
          // cardSource2.text('source: unknown');
        }

        if (results[i].title === '') {
          cardTitle.text('GIF GIPHY GIF');
        }
        var cardHeader = $('<div>').addClass('card-header text-wrap').append(cardTitle);
        cardHeader.append(cardRating);
        cardHeader.append(cardSource);
        cardDiv.append(cardHeader);

        // ====== card gif img =========
        var cardImg = $('<img>').attr('src', results[i].images.fixed_height.url);
        var cardBody = $('<div>').addClass('card-body').append(cardImg);
        cardDiv.append(cardBody);

        $('.first-row').prepend(cardDiv);

      }

    });
  }


  function loadButtonArray(arr) {
    


    for (let i = 0; i < arr.length; i++) {
      var newButton = createButton(arr[i]);
      listOfButtons.push(newButton);
    }

  }

  // TODO: look into functional programming
  // // map way
  // var names = animals.map(function(animal) {
	//   // map just wants a object back
	//   return animal.name;
	//   // so you can create new object if you want
	//   // return animal.name + ' is a ' + animal.species;
  // });


  function displayAllButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
      $('.buttons-row').append(arr[i]);
    }
  }


  function createButton(text) {
    var newButton = $('<button>')
      .addClass('btn btn-info animal-button')
      .attr('data-gif', text)
      .text(text);

    console.log( newButton.text() );

    return newButton;

  }


  // ===================================================
  // global like event listener on the buttons
  // ===================================================
  $(document).on('click', '.animal-button', getTheGifsFromGiphy);

  $(document).on('click', '#add-button', submitNewAnimal);

});
