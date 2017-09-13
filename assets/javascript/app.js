$(document).ready(function() {
	var searchQuery;
	var currentPlay;
	var sharks= ["Tiger Shark", "Great White Shark", "Megamouth Shark", "Goblin Shark", "Leopard Shark", "Sand Tiger Shark", "Basking Shark", "Thresher Shark", "Whale Shark", "Sevengill Shark"];
	





renderButtons();
    function renderButtons() {
        $("#buttonRow").empty();
        for (var i = 0; i < sharks.length; i++) {
            var button=$("<button>");
            button.addClass("Generate-gallery");
            button.data("Sharks", sharks[i]);
            button.addClass("btn spacing");
            button.text(sharks[i]);
            $("#buttonRow").append(button);
        }
    }
    $("#add-artist").on("click", function() {
        event.preventDefault();
        var input=$("#submit-input").val();
        if (topics.indexOf(input)===-1&&input!="")
        {
          sharks.push(input);
          sharks.sort();
          renderButtons();
        }
    });
    $(document).on("click", ".Generate-gallery", function() {
        if(searchQuery===$(this).data("Sharks"))
            return;
        searchQuery=$(this).data("Sharks");
        currentPlay=undefined;
        $("#gallery").empty();
        $("#gallery").append("<h1 class='col-md-12'>"+searchQuery+"<h1>");
        while (searchQuery.indexOf(" ")!=-1)
        {
            searchQuery=searchQuery.replace(" ","+");
        }       
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+encodeURI(searchQuery) + "&limit=10&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: queryURL,
             method: 'GET'
        }).done(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var entry=$("<div>");
                var img= $("<img>");
                $(entry).addClass("Canvas col-md-3");
                $(entry).append("<h2> rating: "+ response.data[i].rating+ "<h2>");
                $(img).attr("src", response.data[i].images.fixed_width_still.url);
                $(img).data("giphyData", response.data[i]);
                $(img).addClass("Play");
                $(entry).append(img);
                $("#gallery").append(entry);
            }   
        });
    });
    $(document).on("click", ".Play", function() {
        if(currentPlay!=undefined)
        {
            $(currentPlay).attr("src", $(currentPlay).data("giphyData").images.fixed_width_still.url);
        }
        if(currentPlay===this)
        {
            currentPlay=undefined;
            return;
        }
        currentPlay=this;
        $(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
    });
    $(document).on("mouseenter", ".Play", function() {
        if(currentPlay===this)
        {
            return;
        }
        $(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
    });
    $(document).on("mouseleave", ".Play", function() {
        if(currentPlay===this)
        {
            return;
        }
        $(this).attr("src", $(this).data("giphyData").images.fixed_width_still.url);
    });
});

