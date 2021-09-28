var video = document.querySelector('.stream');
var canvas = document.querySelector('.preview');
var btn_capture = document.querySelector('.capture');

if (canvas.getContext) {
    // Prefer camera resolution nearest to 1280x720.
    var constraints = { video: { width: 1280, height: 720 } };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            var video = document.querySelector('.stream');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.


    var ctx = canvas.getContext('2d');
    btn_capture.onclick = capture;
    var snap = canvas.toDataURL("image/png");
    console.log(snap);

    function capture() {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        console.log('Captured');
    }

    function save_to_local() {
        var btn_save = document.querySelector('.save-to-local');
        var img = document.querySelector(".preview").toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        btn_save.setAttribute("href", img);
        console.log('File Saved To Local');
    }

    var btn_save = document.querySelector('.save-to-local');

    btn_save.onclick = save_to_local;
} else {
    // canvas-unsupported code here
}

/**
// Check for the geolocation permissions
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // show the location on a map, perhaps using the Google Maps API
        console.log('Position: ' + position);
    });
}
*/