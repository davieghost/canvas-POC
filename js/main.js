'use strict';
// constants || globals
var DATAURL;
var canMouseX;
var canMouseY;

// canvas specific varaibles
var canvas  = document.getElementById('theCanvas');
var ctx     = canvas.getContext('2d');

// DOM/UI specific varaibles
var mkbtn   = document.getElementById('mkbtn');
var svbtn   = document.getElementById('svbtn');
var ctr     = document.getElementById('ctr');
var hld     = document.getElementById('hld');

// instatiate images
var bgIMG  = new Image();
var ovIMG  = new Image();

// image creation
function draw() {
  ctx.drawImage(bgIMG, 0, 0);
  ctx.drawImage(ovIMG, 0, 230);
}
// image sources
bgIMG.src = "images/space.jpg";
ovIMG.src = "images/tina.gif";
// attempting to allow for CORS
bgIMG.setAttribute('crossOrigin', 'anonymous');
ovIMG.setAttribute('crossOrigin', 'anonymous');
// click event to create data stream
mkbtn.addEventListener('click', function(e){
  DATAURL = canvas.toDataURL("image/png");
  hld.insertAdjacentHTML('beforeend', '<img src="' + DATAURL + '" alt="composite image" title="composite image">');
  console.log('temporary data @ ' + DATAURL);

});

svbtn.addEventListener('click', function(e){
  var currentImage = localStorage.getItem('savedImage')
  if(DATAURL !== currentImage)
    localStorage.setItem('savedImage', DATAURL);
  else if (DATAURL === currentImage)
    console.log('something for godsake!');
    // var imageElement = document.get('span');
    hld.insertAdjacentHTML('afterend', '<div class="red">current image</div><img src="' + DATAURL + '" alt="composite image" class="warn" title="composite image">');
});

// movement...

var canvasBox      = canvas.getBoundingClientRect();
var canvasDim      = {
  Y: canvasBox.top,
  X: canvasBox.left,
  width: canvasBox.width,
  height: canvasBox.height
};

var xOffset        = canvasDim.X;
var yOffset        = canvasDim.Y;

var canvasHeight   = canvasDim.height;
var canvasWidth    = canvas.width;

var DRAGGING       = false;

var movement       = {
  canvasBox: canvasBox,
  canvasDim: canvasDim,
  xOffset: xOffset,
  yOffset: yOffset,
  canvasHeight: canvasHeight,
  canvasWidth: canvasWidth,
  DRAGGING: DRAGGING
}
console.log(movement);


// helper functions for movement of top image
function handleMouseDown(e){
 canMouseX=parseInt(e.clientX-xOffset);
 canMouseY=parseInt(e.clientY-yOffset);
 // set the drag flag
 DRAGGING=true;
}

function handleMouseUp(e){
 canMouseX=parseInt(e.clientX-xOffset);
 canMouseY=parseInt(e.clientY-yOffset);
 // clear the drag flag
 DRAGGING=false;
}

function handleMouseOut(e){
 canMouseX=parseInt(e.clientX-xOffset);
 canMouseY=parseInt(e.clientY-yOffset);
 // user has left the canvas, so clear the drag flag
 //isDragging=false;
}

function handleMouseMove(e){
 canMouseX=parseInt(e.clientX-xOffset);
 canMouseY=parseInt(e.clientY-yOffset);
 // if the drag flag is set, clear the canvas and draw the image
 if(DRAGGING){
    //  ctx.clearRect(0,0,canvasWidth,canvasHeight);
     ctx.drawImage(bgIMG, 0, 0);
     ctx.drawImage(ovIMG, canMouseX-128/2, canMouseY-120/2,128,120);
 }
}
$("#theCanvas").mousedown(function(e){handleMouseDown(e);});
$("#theCanvas").mousemove(function(e){handleMouseMove(e);});
$("#theCanvas").mouseup(function(e){handleMouseUp(e);});
$("#theCanvas").mouseout(function(e){handleMouseOut(e);});
