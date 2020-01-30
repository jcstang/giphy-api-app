// Project: Giphy API app
// Jacob Stanger
// Jan 2020

$(document).ready(function () {

  // ===================================================
  // GLOBAL VARIABLES
  // ===================================================
  var buttonGroup = ['dragon', 'bird', 'gecko', 'dolphin', 'cat', 'dog', 'catdog'];
  var randomNumber = Math.floor(Math.random() * 62);

  // ===================================================
  // START APP
  // ===================================================
  populateTheButtons(buttonGroup);


  // ===================================================
  // EVENT
  // ===================================================
  $('button').on('click', function() {
  
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
  function populateTheButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
      // create the button
      var newButton = createButton(arr[i]);
      // append the button
      $('.buttons-row').append(newButton);
    }
  }


  // TODO: use this function to help with attaching a new button from user input
  function createButton(text) {
    var newButton = $('<button>')
      .addClass('btn btn-info ')
      .attr('data-gif', text)
      .text(text);
    
    return newButton;

    // $('.buttons-row').append(newButton);
  }

});
