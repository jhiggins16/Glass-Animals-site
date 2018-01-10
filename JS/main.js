	//Creates local variables
	var choice;
	var current="home";
	var playlistdata = [];
	//Makes sure window is loaded before running code
	window.onload = function(){
	 
	 
	//runs function for geolocation
	
	//geolocation();
}

	//Checks the DOM has been loaded before running jquery
	$(document).ready(function(){ 
		console.log("ready");
		//console.log(current);
		//checks if local storage is available and the item playlist is available
		if(localStorage && localStorage.getItem('playlist')){
				console.log("We have local storage");
				console.log(localStorage.getItem('playlist'));
				//parses JSON string from local storage to make an array to be used to make the playlist
				playlistdata = JSON.parse(localStorage.getItem('playlist'));
				//runs through local storage array to add any songs saved in local storage
				for(i = 0; i < playlistdata.length;i++){
					var inName = playlistdata[i];
					var inID = inName.replace(/\s/g, "_");
					//adds new list item 
					$("#yoursongs").append('<li><div class="addedsongs" id="' + inID + '"> <p class="name">' + inName + ' <button class="delete">X</button></p> </div></li>');
					
				}
				localStorage.clear();
				
			}
			
			var allsongs = ["Life_Itself", "Youth", "Season_2_Episode_3", "Pork_Soda", "Cane_Shuga", 
			"The_Other_Side_Of_Paradise", "Take_A_Slice", "Poplar_St", "Agnes", "Flip", "Black_Mambo", "Pools", 
			"Gooey", "Walla_Walla", "Intruxx", "Hazey", "Toes", "Wyrd", "Cocoa_Hooves", "JDNT", "Lose_Control", 
			"Love_Lockdown", "Holiest", "Exxus", "Psylla", "Golden_Antlers", "Dust_In_Your_Pocket"];
			
			for(j = 0;j < allsongs.length;j++){
				var startID = allsongs[j];
				var startName = startID.replace(/\_/g, " ");
				console.log("added " + startName);
				$("#draglist").append('<li><div class="songs" id="' + startID + '"> <p class="name">' + startName + ' </p></div></li>');
			}
			
		//triggers when the navigation menu changes
		$(".navbox").change(function(){
			//gets the value from the nav menu
			choice = $(".navbox").val()
			//console.log($(".navbox").val());
			
			//looks at the value of choice at navigates to the right page 
			switch(choice){
				case "Home":
					window.location = "index.html";
					break;
					
				case "Listen":
					window.location = "listen.html";
					break;
					
				case "Social media":
					window.location = "socialmedia.html";
					break;
				case "About":
					window.location = "about.html";
					break;
				case "Playlist creator":
					window.location = "playlist.html";
					break;
				case "Live":
					window.location = "liveperformances.html";
					break;
			}
		});
		//code to allow list objects to be draggable
		$('.songs').draggable({
		//setting that make sure that the dragged object makes a clone of itself
		//setting thats make sure the object doesn't move back to its original position
		//sets the cursor when you hover over the list
		cursor: "pointer",
		helper: "clone",
		revert: "invalid",
		scroll: false,
		});
	
		
		//code that sets the area where the objects can be dropped into
		$('.songcontainer').droppable({
			//code that runs when the object is dropped
			drop:function(e,ui){
				//gets id of dropped object
				id = ui.draggable.attr("id");
				name = id.replace(/\_/g, " ");
				console.log(name);
				//adds new item to list of songs 
				$("#yoursongs").append('<li><div class="addedsongs" id="' + id + '"> <p class="name">' + name + ' <button class="delete">X</button></p> </div></li>');
				//adds the name of the song to the array of songs 
				playlistdata.push(name);
				//console.log(playlistdata);
				//converts playlist data to string so it can be passed into local storage through JSON
				var playliststring = JSON.stringify(playlistdata);
				//console.log(playliststring);
				//passes the string of songs into local storage
				localStorage.setItem('playlist',playliststring);
			}
			
			
		});
		//function that runs when the delete button for a song is pressed
		$(document).on("click", ".addedsongs .name .delete",  function(){
			//console.log($(this).parent().parent().attr('id')); 
			//gets ID of item to be deleted 
			id = $(this).parent().parent().attr('id');
			name = id.replace(/\_/g, " ");
			//removes item from the list 
			$("#yoursongs #" + id ).remove();
			//removes song from array 
			for(j = 0; j < playlistdata.length;j++){
					if(playlistdata[j] === name){
						playlistdata.splice(j,1);
						j = j-1;
					}
					
				}
			//stringifys the updated array and passes it to local storage
			var deletestring = JSON.stringify(playlistdata);
			localStorage.setItem('playlist',deletestring);
		});
	});
	//geolocation function
	function geolocation(){
		//checks if the browser can support geolocation
		  if(navigator.geolocation) {
			  //gets current position of user
			navigator.geolocation.getCurrentPosition(showpos);
        
        
    } else {
        console.log("No geolocation support");
    }
    
	}
	//shows the current positon of the user
	function showpos(position){
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
		
		var LatLng;
		//sets up map settings 
		var mapOptions = {
		center: new google.maps.LatLng( position.coords.latitude, position.coords.longitude ),
		zoom: 16,
		zoomControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		//creates new map 
		 map = new google.maps.Map( document.getElementById("map"), mapOptions );
		 var infoWindow = new google.maps.InfoWindow;
		 //create marker for current postion 
		  var markers = new google.maps.Marker( {

		position:mapOptions.center

			});
			
			//changes colour of marker to blue
			iconFile = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'; 
			markers.setIcon(iconFile) 
			//puts marker onto map
			markers.setMap(map);
			//gets coordinates of the users position 
			var position = {
				lat: position.coords.latitude,
              	lng: position.coords.longitude
			}
			
			var service;
		//sets the settings of the search 
		var request = { 
		location:position,
		radius: "10000",
		query: "music venues near me"
	};
	//runs a search on the map of music venues within 10km of the users position 
	service = new google.maps.places.PlacesService(map);
  	service.textSearch(request, callback);
			
			//sets up and displays map
			infoWindow.setPosition(position);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(position);
	}
	
	//creates all the markers from the array of results
	function callback(results, status) {
		//checks if the program is still running fine 
 	 if (status == google.maps.places.PlacesServiceStatus.OK) {
	//goes through all the results from the search and create markers on the map
    	for (var i = 0; i < results.length; i++) {
      	var place = results[i];
		//console.log(place);
      	createMarker(results[i]);
    	}
  	}
	}
	//creates a marker 
	function createMarker(place){
		 var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
	}
	
	
	

	

