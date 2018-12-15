$(document).ready(function() {
    // Arry for search
    var topics = [];

    function displayMovie() {
        
        var x = $(this).data('search');
        console.log(x);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=BVJHKNmOpDlW3YlPUHFfY6sRg02GUrPx&limit=10";

        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results)
            for (var i = 0; i < results.length; i++) {

            var showDiv = $("<div class='col-md-4'>");

            var rating= results[i].rating;
            var 
            var defaultAnimated = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var showImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);

            showImage.attr("src", staticSrc);
            showImage.addClass("movieGiphy");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimated);
            showDiv.append(p);
            showDiv.append(showImage);
            $("#gifArea").prepend(showDiv);
            
            }
        });
    }

    //submit button click event
    $("#addShow").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#movieInput").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#movieInput").val('');
        buttonsDisplay();
    });

    //Function iterates topic array
    function buttonsDisplay() {
        $("#newButton").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.attr("id", "show");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#newButton").append(a);
        }
    }

    buttonsDisplay();

    //click event button for dsplay movies
    $(document).on("click", "#show", displayMovie);

    //click event on gif of movieGiphy
    $(document).on("click", ".movieGiphy", pauseDisplay);

    function pauseDisplay() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
  
  });