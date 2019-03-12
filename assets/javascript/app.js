
    
    
  
      
   
    var animes = ["naruto", "cowboybebop", "inuyasha", "gintama"];

    // Function for dumping the JSON content for each button into the div
    function displayanimeInfo() {

      var anime = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2fF0xnLoGDXjhmuYWZUpFWcQnJd0JeD3&q=" + anime + "&limit=10&offset=0&rating=G&lang=en";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          

          var rating = results[i].rating;

          var p = $("<h1>").text("Rating: " + rating);
          p.addClass("btn pg");
          var mid = $("<div>");
         
          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_width_small_still.url);
          personImage.addClass("btn ");
          personImage.attr("id", "gif");
          personImage.attr("data-animate",  results[i].images.fixed_width_small.url);
          personImage.attr("data-still",  results[i].images.fixed_width_small_still.url);
          personImage.attr("data-state", "still");
          mid.prepend(personImage);
          gifDiv.append(p);
          
          gifDiv.append(mid);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
      
    }

    // Function for displaying anime data
    function renderButtons() {

      // Deleting the buttons prior to adding new animes
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();

      // Looping through the array of animes
      for (var i = 0; i < animes.length; i++) {

        // Then dynamically generating buttons for each anime in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of anime to our button
        a.addClass("anime");
        // Adding a data-attribute
        a.attr("data-name", animes[i]);
        a.addClass("btn-success m-1")
        // Providing the initial button text
        a.text(animes[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }

    // This function handles events where one button is clicked
    $("#add-anime").on("click", function(event) {
      event.preventDefault();

      // This line grabs the input from the textbox
      var anime = $("#anime-input").val().trim();

      // Adding the anime from the textbox to our array
      animes.push(anime);
      console.log(animes);

      // Calling renderButtons which handles the processing of our anime array
      renderButtons();
    });

    // Function for displaying the anime info
    // Using $(document).on instead of $(".anime").on to add event listeners to dynamically generated elements
    $(document).on("click", ".anime", displayanimeInfo);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();
    
    $(document).on("click", "#gif", function() {
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });