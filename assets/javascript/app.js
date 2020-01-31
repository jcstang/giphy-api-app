// Project: Giphy API app
// Jacob Stanger
// Jan 2020

$(document).ready(function () {

  // ===================================================
  // GLOBAL VARIABLES
  // ===================================================
  var buttonGroup = ['dragon', 'bird', 'gecko', 'dolphin', 'cat', 'dog', 'catdog'];
  var listOfButtons = [];
  var randomNumber = Math.floor(Math.random() * 62);

  // ===================================================
  // START APP
  // ===================================================
  // createThenPopulateTheButtons(buttonGroup);
  createTheButtons(buttonGroup);
  displayAllButtons(listOfButtons);




  
  // ===================================================
  // EVENT
  // ===================================================
  $('#add-button').on('click', function () {
    event.preventDefault();

    console.log($('#animal-input'));
    var animal = $('#animal-input').val().trim();
    console.log('here is the animal you want to submit: ' + animal);

    //TODO: check if it's an ok value

    //TODO: add to the array
    // buttonGroup.push(animal);
    var newAnimal = createButton(animal);
    listOfButtons.push(newAnimal);
    // TODO: render the buttons again
    displayAllButtons(listOfButtons);



    // TODO: render the buttons again
    // FIXME: creates duplicates
    // createThenPopulateTheButtons(buttonGroup);
    // refreshButtonGroup();

    console.log('buttonGroup:');
    console.log(buttonGroup);
    
  });


  $('.animal-button').on('click', function() {
  
    var daGif = $(this).attr('data-gif');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZrhJhYmel74Dmx4uq2zHvmOSxXpNlSgu&q=" + 
    daGif.split(' ').join('+') + "&limit=10&offset=" + randomNumber + "&rating=G&lang=en";

    
    // ===================================================
    // AJAX CALL - to giphy api
    // ===================================================
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response){
  
      var results = response.data;
      
      // ====== loop thru the gifs that came back ==============================
      for (let i = 0; i < results.length; i++) {
        // console.log(results);
        console.log(results[i].title);
        console.log(results[i].rating);
  
          var parentDiv = $('<div>').addClass('col-sm-4 card-deck');
          var cardDiv = $('<div>').addClass('card mb-4 shadow-sm mx-auto border-primary');
          parentDiv.append(cardDiv);
  
    
          // ===== Title ================
          // var cardTitle = $('<h5>').text('put json title thing here');
          var cardTitle = $('<h5>').text(results[i].title);
          if (results[i].title === '') {
            cardTitle.text('GIF GIPHY GIF');
          }
          var cardHeader = $('<div>').addClass('card-header text-wrap border-primary').append(cardTitle);
          cardDiv.append(cardHeader);
    
          // ====== card gif img =========
          var cardImg = $('<img>').attr('src', results[i].images.fixed_height.url);
          var cardBody = $('<div>').addClass('card-body').append(cardImg);
          cardDiv.append(cardBody);
  
          $('.first-row').prepend(cardDiv);
  
      }
  
    });
  
  
    
    
    
  });
  
  // ===================================================
  // CUSTOM FUNCTIONS
  // ===================================================
  function createTheButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
      // create the button
      var newButton = createButton(arr[i]);
      // append the button
      listOfButtons.push(newButton);
      // $('.buttons-row').append(newButton);
    }
  }


  function displayAllButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
      $('.buttons-row').append(arr[i]);
    }
  }


  // TODO: use this function to help with attaching a new button from user input
  function createButton(text) {
    var newButton = $('<button>')
      .addClass('btn btn-info animal-button')
      .attr('data-gif', text)
      .text(text);
    
    return newButton;

    // $('.buttons-row').append(newButton);
  }

// renderButtons(){}
// empty the current view
  // loop thru the movie array
    // create button
    // append to buttons-view

  // displayMovieInfo(){}
  // gets click button
  // calls api via ajax
  // create movie container
  // prepend to view
  // get movie title
  // append to movie container

});
