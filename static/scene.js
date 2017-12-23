$(document).ready(function() {

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
        'compass', 
        'meter', 
        'reticle', 
        'griggs', 
        'apps',
        'griggs-alt'];

    var index = 0;
    loadScene(0);
    index = 1;

    $("#panel_image").click(function() {
        loadScene(index++);
    });

    function loadScene(i) {
        // find the scene
        var scene=scenes[i];
        var image, audio, autoplay, timeout;
        if (typeof scene === 'object') {
            image = scene['image'];
            audio = scene['audio'];
            autoplay = Boolean(scene['manual_play']) ? false : true;
            timeout = Number(scene['timeout']);
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

});
