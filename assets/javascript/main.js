console.log("connected");

var topics = [ "cats", "dogs", "DIY", "shopping", "movies"];

function renderButtons(){

    for(var i =0; i < topics.length; i++){
        console.log(topics[i]);

        var myButton = $("<button class='giffy btn btn-info m-1'>").text(topics[i]);

        myButton.attr("data-wumbo", topics[i]);

        $("#buttons").append(myButton);
    }
    
}; // End renderButtons function


$(document).on("click", "#makeTopic", function(event){
    event.preventDefault();

    $("#buttons").empty();

    var inputBarValue = $("#topicSearch").val().trim();

    console.log(inputBarValue);

    topics.push(inputBarValue);

    renderButtons();

});

$(document).on("click", ".giffy", function(){

    $("#gifPool").empty();
    
    var thisTopic = $(this).attr("data-wumbo");
    console.log(thisTopic);

    var apiKey = "2P4Am3JiMqyMkTDMeKLxWRyAoCsIDkhy"

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + thisTopic + "&api_key=" + 
        apiKey + "&limit=5";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){

        var data = response.data
        console.log(data);

        for(i=0; i< data.length; i++){

            console.log(data[i]);

            var firstImage = data[i].images.fixed_width_still.url;
            var animateImage = data[i].images.fixed_width.url;

            console.log("Images link: " , firstImage);

            var newDiv = $("<div class='card bg-info'>");

            var myGif = $("<img class='myGif' src='"+ firstImage +"'>");

            $(myGif).attr({
                "state": "still",
                "data-animate": animateImage,
                "data-still": firstImage
            })

            $(newDiv).append(myGif);

            $("#gifPool").append(newDiv);

        }

    })

});

$(document).on("click", ".myGif", function(){
    console.log("clicked a image!")

    var state = $(this).attr("state");
    console.log(state);

    if(state === "still"){
        console.log("it is still");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animated");
        
    }
    else{
        console.log("In motion");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");

    }
})

renderButtons();
