var minG;
var maxG;
var frameRate = 1

var video = document.getElementById("video")
var frameI;

document.querySelector('.frame').onchange = function() {
    frameNum = document.querySelector('.frame').value;
    frameI = frameNum;
    video.currentTime = parseFloat(frameNum)/frameRate;
    setTimeout(function(){loadThumb(true)}, 250);
}

document.querySelector('.prev').onclick = function(){
    var frame = document.querySelector('.frame');
    var frameNum = frame.value = frame.value -1;
    video.currentTime = parseFloat(frameNum)/frameRate;
    setTimeout(function(){loadThumb(true)}, 250);
}

document.querySelector('.next').onclick = function(){
    var frame = document.querySelector('.frame');
    frameNum = frame.value = parseInt(frame.value) +1;
    video.currentTime = parseFloat(frameNum)/frameRate;
    setTimeout(function(){loadThumb(true)}, 250);
}

function generateThumbnail(frameNum) {
    document.querySelector('.frame').value = frameNum;
    frameI = frameNum;
    video.currentTime = parseFloat(frameNum)/frameRate;
    setTimeout(loadThumb,250);
}


function loadThumb(dontGenerate) {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    getFunctionality(video.currentTime*frameRate);
    if (!dontGenerate) setTimeout(generateImage,250)
}

function generateImage() {
    var canvas = document.getElementsByTagName('canvas')[0];
    var dataURL = canvas.toDataURL();
    var img = document.createElement('a');
    img.href=dataURL;
    img.download="img" + String(frameI + "00").substring(0,2) + ".png";
    img.click();
    minG++;
    setTimeout(render,250);
}


function render(min, max) {
    minG = min || minG;
    maxG = max || maxG;
    if(minG>=maxG) return;
    generateThumbnail(minG);
}
