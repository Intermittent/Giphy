$( document ).ready(function() {
  $(document).on("click", ".giph-button", function() {
    var person = $(this).attr("data-person");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        $("#gifs-appear-here").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var personImage = $("<img class='gif'>");
          personImage.attr("src", results[i].images.fixed_height.url);
          gifDiv.prepend(p);
          gifDiv.prepend(personImage);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

  // Pausing and unpausing gifs    
  $(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  });

  // A submit bar that adds the text as a box that functions like those above
  $("#add-button-form").submit(function(event){
    event.preventDefault();
    var buttonName = $('#button-name-input').val();
    // Create a button
    var newButton = $("<button>" + buttonName + "</button>");
    newButton.attr("class", "giph-button");
    newButton.attr("data-person", buttonName);
    $("#buttons").append(newButton);
    // Put the button on the page
  });
});