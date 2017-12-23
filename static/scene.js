$(document).ready(function() {

    // Define the sequence of scenes (and audio)
    var scenes = [
        {image: 'homescreen', audio: 'click'},
        {image: 'incoming_call', audio: 'ringtone'},
        {image: 'griggs', audio: 'audio-001'},
        {image: 'plane_view', audio: 'audio-002'},
        'griggs-alt', 'compass', 'meter', 'reticle', 'griggs', 'apps', 'meter'];

    var index = 0;
    loadScene(0);

    $("#panel_image").click(function() {
        loadScene(index++);
    });

    function loadScene(i) {
        // find the scene
        var scene=scenes[i];
        var image;
        var audio;
        if (typeof scene === 'object') {
            image = scene['image'];
            audio = scene['audio'];
        } else if (typeof scene === 'string') {
            image = scene;
        } else
            throw new TypeError('"scenes" array contains invalid type ' + scene);

        // advance to the next image
        $("#panel_image").attr('src', "/images/" + image + ".jpg");
        
        // and play audio if we have one
        if (audio === undefined) 
        {
            //
        }
        else
        {
            $("#mp3_src").attr('src', "/audio/" + audio + ".mp3");
            if (i > 0)                  // the first time, we need a user click
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

});
