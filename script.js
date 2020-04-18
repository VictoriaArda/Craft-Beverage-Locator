$("#list-results").attr("style", "color: black");

var results = localStorage.getItem("data");

if (results){
  createCardList(JSON.parse(results));
  
} 

// event listener added to button
$("#submit").on("click", function(event) {
  event.preventDefault();
  
  // set value of input type text to variable
  var zipCode = $("#zip-code").val();
  // if no text is entered in input element exit function
  if ($.trim(zipCode) == "") {
    return;
  }
  var queryURL = "https://api.openbrewerydb.org/breweries?by_postal=" + zipCode;
   
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
    // response object saved to results array
    var results = response;
    // if no result found in api write message
    if (results.length == 0) {
      $("#list-results").empty();
      var addressDiv = $("<div>").addClass("card");        
      var cardBodyDiv = $("<div>").addClass("card-body");
      var heading = $("<h6>").text("No results found at this location");
      cardBodyDiv.append(heading);
    
      // append nested divs      
      addressDiv.append(cardBodyDiv);
      $("#list-results").append(addressDiv);
  
    } else {
      localStorage.clear();
      $("#list-results").empty();
      localStorage.setItem("data",JSON.stringify(results));
      
     
      createCardList(results);  
        
    }
  }); 
     
});


function createCardList(cardList){

  for (var i = 0; i < cardList.length; i++) {  
    // create div elements; add classes for styling
    var addressDiv = $("<div>").addClass("col card");        
    var cardBodyDiv = $("<div>").addClass("card-body");      
    
    var address = {
      name: cardList[i].name,
      street: cardList[i].street,
      city: cardList[i].city,
      state: cardList[i].state,
      postal: cardList[i].postal_code
    };
        
    // string of object key values 
    var par = $("<h6>").html(address.name + "<br>" + address.street + "<br>" + address.city + ", " + address.state + " " + address.postal);
    par.addClass("text-left");
    // append paragraph to inner card div
    cardBodyDiv.append(par);
    // append nested divs
    addressDiv.append(cardBodyDiv);

    $("#list-results").append(addressDiv); 
    
  } 

}

//button to clear local storage and refresh the page
$("#clear").click(function() {
  localStorage.clear();
  $("#list-results").empty();   
});


function initMap() {
    var element = document.getElementById ("map");
    var uluru = {lat: 39.833851, lng: -74.871826};
    var map = new google.maps.Map(
     document.getElementById('map'), {zoom: 15, center: uluru});
     var marker = new google.maps.Marker({position: uluru, map: map});
  }
  var mapResults = JSON.parse(results);
    for (var i = 0; i < mapResults.length; i++){
      mapLat = parseFloat(mapResults[i].latitude);
      mapLong = parseFloat(mapResults[i].longitude);
      console.log(mapResults[i].latitude);
    // The location of  results
    var mapPoints = {lat: mapLat, lng: mapLong};
    
    // The map, centered at locations
    var myMap = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: mapPoints});
    // The marker, positioned at each result
    addMarker(mapPoints);
    }
  function addMarker(coordinates) {  
   var marker = new google.maps.Marker({position: mapPoints, map: myMap});
  }







