// Project: Giphy API app
// Jacob Stanger
// Jan 2020


$('button').on('click', function(){
  var daGif = $(this).attr('data-gif');
  // console.log('daGif ' + daGif);

  var randomNumber = Math.floor(Math.random() * 75);
  console.log(randomNumber);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZrhJhYmel74Dmx4uq2zHvmOSxXpNlSgu&q=" +
    daGif.split(' ').join('+') + "&limit=10&offset=" + randomNumber + "&rating=G&lang=en";

  //https://api.giphy.com/v1/gifs/search?api_key=ZrhJhYmel74Dmx4uq2zHvmOSxXpNlSgu&q=bird&limit=10&offset=10&rating=G&lang=en

  var searchURL = "https://api.giphy.com/v1/gifs/search?api_key=ZrhJhYmel74Dmx4uq2zHvmOSxXpNlSgu&q=bird&limit=10&offset=10";

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response){

    var results = response.data;
    var cardRowCount = 0;
    
    // ====== loop thru the gifs that came back ==============================
    for (let i = 0; i < results.length; i++) {
      // cardRowCount += 1;
      // console.log(results);
      console.log(results[i].title);
      console.log(results[i].rating);

      if (cardRowCount <= 4) {
        var parentDiv = $('<div>').addClass('col-sm-4');
        var cardDiv = $('<div>').addClass('card mb-4 shadow-sm mx-auto');
        parentDiv.append(cardDiv);
  
        // ===== Title ================
        // var cardTitle = $('<h5>').text('put json title thing here');
        var cardTitle = $('<h5>').text(results[i].title);
        if (results[i].title === '') {
          cardTitle.text('GIF GIPHY GIF');
        }
        var cardHeader = $('<div>').addClass('card-header text-wrap').append(cardTitle);
        cardDiv.append(cardHeader);
  
        // ====== card gif img =========
        var cardImg = $('<img>').attr('src', results[i].images.fixed_height.url);
        var cardBody = $('<div>').addClass('card-body').append(cardImg);
        cardDiv.append(cardBody);

        // console.log('here is cardDiv');
        // console.log(cardDiv);
        
        // TODO: add this cardDiv to the holding place
        // $('.first-row').append(cardDiv);
        $('.first-row').prepend(cardDiv);

        // TODO: how do I make a new row after 3 gifs

      } 
      // else {
      //   cardRowCount = 0;
      // }

      // console.log('cardRowCount: ' + cardRowCount);


    }

  });




});