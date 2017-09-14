$(document).ready(function() {
    var searchQuery;
    var currentPlay;
    //Sets the initial array of sharks to appear to click on
    var topics = ["Tiger Shark", "Great White Shark", "Megamouth Shark", "Goblin Shark", "Leopard Shark", "Sand Tiger Shark", "Basking Shark", "Thresher Shark", "Whale Shark", "Sevengill Shark"];


    renderButtons();
    //Rendering the buttons
    function renderButtons() {
        $("#buttonRow").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("makeGallery");
            button.data("topics", topics[i]);
            button.addClass("btn spacing");
            button.text(topics[i]);
            $("#buttonRow").append(button);
        }
    }
    //Adds a new shark based on user input
    $("#addShark").on("click", function() {
        event.preventDefault();
        var input = $("#submit-input").val();
        if (topics.indexOf(input) === -1 && input != "") {
            topics.push(input);
            topics.sort();
            renderButtons();
        }
    });



    $(document).on("click", ".makeGallery", function() {
        if (searchQuery === $(this).data("topics"))
            return;
        searchQuery = $(this).data("topics");
        currentPlay = undefined;
        $("#gallery").empty();
        $("#gallery").append("<h1 class='col-lg-12'>" + searchQuery + "<h1>");
        while (searchQuery.indexOf(" ") != -1) {
            searchQuery = searchQuery.replace(" ", "+");
        }
        //Stops the GIF from showing rated R pics
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURI(searchQuery) + "&limit=10&api_key=dc6zaTOxFJmzC&rating=pg-13";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var entry = $("<div>");
                var img = $("<img>");
                $(entry).addClass("Canvas col-lg-3");
                $(entry).append("<h2> Rating: " + response.data[i].rating + "<h2>");
                $(img).attr("src", response.data[i].images.fixed_width_still.url);
                $(img).data("giphyData", response.data[i]);
                $(img).addClass("Play");
                $(entry).append(img);
                $("#gallery").append(entry);
            }
        });
    });

    //Starts and stops the Gif from playing upon click action

    $(document).on("click", ".Play", function() {
        if (currentPlay != undefined) {
            $(currentPlay).attr("src", $(currentPlay).data("giphyData").images.fixed_width_still.url);
        }
        if (currentPlay === this) {
            currentPlay = undefined;
            return;
        }
        currentPlay = this;
        $(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
    });

    //Starts and stops the Gif from playing upon mouse hover action
    $(document).on("mouseenter", ".Play", function() {
        if (currentPlay === this) {
            return;
        }
        $(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
    });
    $(document).on("mouseleave", ".Play", function() {
        if (currentPlay === this) {
            return;
        }
        $(this).attr("src", $(this).data("giphyData").images.fixed_width_still.url);
    });
});