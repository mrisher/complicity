function main() {
    // Define the sequence of scenes (and audio)
    // @params:
    //          image
    //          audio
    //          autoplay (default = true)
    //          timeout (in sec)
    var scenes = [
        {image: 'homescreen', audio: 'click', manual_play:true},
        {image: 'incoming_call', audio: 'ringtone'},
        {image: 'griggs', audio: 'audio-001'},
        {image: 'plane_view', audio: 'audio-002'},
        {image: 'griggs-alt', audio: 'get_residue'},
        'apps', 
        {special: 'map'},
        'compass', 
        'meter', 
        'reticle', 
        'griggs', 
        'apps',
        'griggs-alt'];

    var index = JSON.parse($("#main_storyboard").data("starting-index"));
    loadScene(index++);

    $("#panel_image").click(function() {
        loadScene(index++);
    });

    //Apply kalman filter
    var latFilter = new KalmanLatLong(3);
    var lngFilter = new KalmanLatLong(3);

    /**
     * @name loadScene
     * @description populates the image, loads the audio
     * @param i: index of the scene (from 'scenes' array)
     * @returns void
     */
    function loadScene(i) {
        // find the scene
        var scene=scenes[i];
        var image, audio, autoplay, timeout;
        if (typeof scene === 'object') {
            if (scene.special == 'map') {
                $("#map").show();
                initMap();
                navigator.geolocation.watchPosition(updateLocation, function(){alert('error in watchPosition');}, 
                    {enableHighAccuracy: true,
                    maximumAge: 5000,
                    timeout: 4500});
            }
            else {
                image = scene.image;
                audio = scene.audio;
                autoplay = Boolean(scene.manual_play) ? false : true;
                timeout = Number(scene.timeout);
            }
        } else if (typeof scene === 'string') {
            image = scene;
            timeout = 3;        // default for plain images
        } else
            throw new TypeError('"scenes" array contains invalid type ' + scene);

        // advance to the next image
        $("#panel_image").attr('src', "/images/" + image + ".jpg");
        
        // and play audio if we have one
        if (audio === undefined) 
        {
            if (timeout > 0)    // if we have audio, timeout is end of track   
            {
                setTimeout(function(){ loadScene(index++); }, timeout*1000);
            }
        }
        else
        {
            $("#mp3_src").attr('src', "/audio/" + audio + ".mp3");
            if (autoplay)
            {
                var player = $("#scene_audio");
                player[0].pause();
                player[0].load();
                player[0].oncanplaythrough = player[0].play();
            }
        }
    }

    $("#scene_audio").bind("ended", function(){
        loadScene(index++);
    });

}    

var map, infoWindow, marker, target;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          // center: {lat: -34.397, lng: 150.644},
          zoom: 20,
        });
        infoWindow = new google.maps.InfoWindow();

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Hello World!',
                icon: "/images/blue_ring.png",
            });        
            map.setCenter(pos);
            createTarget(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        alert("Error");
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createTarget(position) {
        targetPos = position;
        var meter_in_degrees = 0.00002;
        targetPos.lat += getRandomArbitrary(-10, 10) * meter_in_degrees;
        targetPos.lng += getRandomArbitrary(-10, 10) * meter_in_degrees;

        target = new google.maps.Marker({
            position: targetPos,
            map: map,
            icon: "/images/alien.png",
            animation: google.maps.Animation.BOUNCE,
        });
    }

    function updateLocation(position) {
        var pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
        };
        if (position.coords.accuracy > 15)
            return;             // ignore reading if accuracy > 15
        var dist = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos), target.getPosition());
        if (dist < 3.0)         // distance in meters
        {
            alert("You win!");
            createTarget(pos);
        }
        marker.setPosition(pos);
    }

