// Project: Giphy API app
// Jacob Stanger
// Jan 2020


$('button').on('click', function(){
  var daGif = $(this).attr('data-gif');
  console.log('daGif ' + daGif);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    daGif.split(' ').join('+') + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=3";

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response){

    var results = response.data;
    var cardRowCount = 0;

    for (let i = 0; i < results.length; i++) {
      cardRowCount += 1;

      if (cardRowCount <= 3) {
        var parentDiv = $('<div>').addClass('col-sm-4');
        var cardDiv = $('<div>').addClass('card mb-4 shadow-sm');
        parentDiv.append(cardDiv);
  
        // ===== Title ================
        var cardTitle = $('<h5>').text('put json title thing here');
        var cardHeader = $('<div>').addClass('card-header').append(cardTitle);
        cardDiv.append(cardHeader);
  
        // ====== card gif img =========
        var cardImg = $('<img>').attr('src', results[i].images.fixed_height.url);
        var cardBody = $('<div>').addClass('card-body').append(cardImg);
        cardDiv.append(cardBody);

        console.log('here is cardDiv');
        console.log(cardDiv);
        
        // TODO: add this cardDiv to the holding place
        $('.first-row').append(cardDiv);
        // TODO: how do I make a new row after 3 gifs

      } else {
        cardRowCount = 0;
      }

      console.log('cardRowCount: ' + cardRowCount);


    }

  });




});