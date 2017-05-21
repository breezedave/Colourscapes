var droppedFrames = {};
var reAsked = 0;
var minG = 1;
var frameColors = {};
var timeout = 150;


window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function getAvgColor(callback) {
    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');
    var data = context.getImageData(0, 0, canvas.width, canvas.height)
    var r = 0,
        g = 0,
        b = 0;
    for (var i = 0; i < data.data.length; i++) {
        if (i % 4 == 0) r += data.data[i];
        if (i % 4 == 1) g += data.data[i];
        if (i % 4 == 2) b += data.data[i];
    }
    r = parseInt(r / (data.data.length / 4));
    g = parseInt(g / (data.data.length / 4));
    b = parseInt(b / (data.data.length / 4));
    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")"
    frameColors[minG] = {r:r,g:g,b:b};
    if(r==0 && g==0 && b==0 && reAsked >= 10) {
        reAsked++;
        return setTimeout(loadImg,timeout);
    }
    reAsked = 0;
    minG++;
    setTimeout(function(){callback(callback)},1)
}

function generateFrameColors(callback) {
    timeout = 150;
    maxG = parseInt(video.duration);
    if(minG>=maxG) return getDroppedFrames();
    frameNum = minG;
    document.querySelector('.frame').value = frameNum;
    frameI = frameNum;
    video.currentTime = parseFloat(frameNum)/frameRate;
    setTimeout(function(){loadImg(callback)},timeout);
}

function generateDroppedFrames(callback) {
    timeout = 650;
    maxG = parseInt(video.duration);
    frameFound = false;
    for(i in droppedFrames) {frameFound = true; minG = i; break}
    if(!frameFound) return colorBox();
    delete droppedFrames[i];
    frameNum = minG;
    document.querySelector('.frame').value = frameNum;
    frameI = frameNum;
    video.currentTime = parseFloat(frameNum)/frameRate;
    setTimeout(function(){loadImg(callback)},timeout);
}

function loadImg(callback) {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimFrame(function(){getAvgColor(callback)});
}

function getDroppedFrames() {
    for(i in frameColors) {
      var clr = frameColors[i];
      if(clr.r == 0 && clr.g == 0 && clr.b == 0) droppedFrames[i] = frameColors[i];
    }
    console.log(droppedFrames);
    generateDroppedFrames(generateDroppedFrames);
}

function colorBox() {
    var num = 0;
    for(i in frameColors) { num++}
    var canv = document.createElement('canvas');
    canv.width = num;
    canv.height = 200;
    var ctx = canv.getContext('2d');

    for(var i=1; i < num; i++) {
        var clr = frameColors[i];
        ctx.strokeStyle="rgb(" + clr.r + "," + clr.g + "," + clr.b + ")";
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,canv.height);
        ctx.stroke();
        console.log(i);
    }
    document.body.appendChild(canv);
}
