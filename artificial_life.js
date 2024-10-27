function toggleSection(elementId) {
    var content = document.getElementById(elementId);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function playVideos() {
    document.getElementById("video1").play();
    document.getElementById("video2").play();
    document.getElementById("video3").play();
}

function pauseVideos() {
    document.getElementById("video1").pause();
    document.getElementById("video2").pause();
    document.getElementById("video3").pause();
}
