<script>
    
    var map, infoWindow
    var markers = []

    
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -37.798589799999995, lng: 144.9597391},
        zoom: 13
      })

      infoWindow = new google.maps.InfoWindow;

      
      
      
      /*
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          map.setCenter(pos);
          
        },function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      */
    }

    
  
    document.querySelectorAll(".movieItem").forEach(function(movieItem){
      
      movieItem.addEventListener("click", function(){
          movieItem.style.color = "blue"
          document.getElementById('movieTitle_input').value = this.getAttribute("data-movie-title")
          document.getElementById('movieId_input').value = this.getAttribute("data-movie-id")
          document.getElementById("movieTitle").innerText = this.getAttribute("data-movie-title")
          
          console.log(document.getElementById('movieTitle_input').value)
          fetchShowtime(this.getAttribute("data-movie-id"))
          
      })
    })

    document.getElementById("date_input").addEventListener("change", function(){
      
      console.log("onchange!")
      if(document.getElementById('movieTitle_input').value){
        fetchShowtime(document.getElementById("movieId_input").value)
      }
    })





    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    function clearMarkers(){
      for (var i=0; i< markers.length; i++){
        markers[i].setMap(null)
        markers[i] = null
      }
      markers=[]
    }

    function fetchShowtime( movieId){
      var marker

      clearMarkers()

      fetch(`movie/${movieId}/${document.getElementById("date_input").value}`)
      .then(function(response){

          return response.json()
      }).then( function(jsonData){

          console.log(jsonData)
          
          const showtimeElement = document.getElementById("showtimeItems")
          Object.keys(jsonData).forEach((key) => {

              const showtimeData = jsonData[key]
              
              const CinemaText = document.createElement("div")
              CinemaText.innerText = key

              showtimeElement.appendChild(document.createElement("br"))
              showtimeElement.appendChild(CinemaText)
              
              showtimeData.showtime.forEach( showtime => {


                const showtimeText = document.createElement("div")
                
                showtimeText.setAttribute("data-showtime",showtime)
                showtimeText.innerText = showtime
                
                showtimeText.addEventListener("click", function(){
                  console.log("showtimeEventFired")
                  document.getElementById("showtime_iput").value = this.getAttribute("data-showtime")
                  document.getElementById("showtime").innerText = this.getAttribute("data-showtime").split("T")[1]
                })
                showtimeText.style.color = "red"
                

                
                showtimeElement.appendChild(showtimeText)


              })
              

    
              const marker = new google.maps.Marker({
                position: {lat: showtimeData.latitude, lng: showtimeData.longitude},
                map: map
              })
              marker.addListener('click', function(){
                
                document.getElementById('cinemaLat_input').value = this.position.lat()
                document.getElementById('cinemaLng_input').value = this.position.lng()  
                document.getElementById("cinema").innerText = key
                document.getElementById("cinema_input").value = key
          })

          markers.push(marker)
          
          })
      })
      .catch(function(err){

          console.log(err)
          }
      )
    }
  </script>
  <script src='https://maps.googleapis.com/maps/api/js?key=<%= process.env.GOOGLE_API_KEY %>&callback=initMap&libraries=places'
  async defer></script>