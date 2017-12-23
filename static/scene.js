$(document).ready(function() {
    $("#scene_audio").bind("ended", function(){
        window.location.href = $("#next_scene").attr('href');
    });
});
