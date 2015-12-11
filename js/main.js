'use strict';
// constants || globals
var URL = window.location.href;
var DATAURL;
var OCTDATA;
var HASRUN = false;
// canvas specific varaibles
var canvas  = document.getElementById('theCanvas');
var ctx     = canvas.getContext('2d');
// DOM/UI specific varaibles
var mkbtn   = document.getElementById('mkbtn');
var svbtn   = document.getElementById('svbtn');
var swchbtn = document.getElementById('swchbtn');
var ctr     = document.getElementById('ctr');
var hld     = document.getElementById('hld');
// instatiate images
var bgIMG  = new Image();
var ovIMG  = new Image();
var TINA1 = "images/tina.png";
var TINA2 = "images/tina.gif";
// image sources
bgIMG.src = "images/space.jpg";
ovIMG.src = TINA2;
// store the cached image value
var cachedImage = localStorage.getItem('savedImage');
// image creation
function draw() {
  ctx.drawImage(bgIMG, 0, 0);
  ctx.drawImage(ovIMG, 0, 200, 200, 200);
}
// attempting to allow for CORS
bgIMG.setAttribute('crossOrigin', 'anonymous');
ovIMG.setAttribute('crossOrigin', 'anonymous');
// print the current image if it is in local storage
document.onreadystatechange = function() {
  if(document.readyState == "complete") {
    if (cachedImage !== undefined) {
      // ctr.insertAdjacentHTML('afterbegin', '<div id="msg" class="red">previously saved image</div>');
      // ctr.insertAdjacentHTML('beforeend', '<img src="' + cachedImage + '" class="image-canvas" alt="composite image" title="composite image">');
      ctr.innerHTML = ('<div id="msg" class="red">previously saved image</div><img src="' + cachedImage + '" class="image-canvas" alt="composite image" title="composite image">');
    }
  }
}

function overlayChangeSource(path){
  ovIMG  = new Image();
  ovIMG.onload = function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(bgIMG, 0, 0);
    ctx.drawImage(ovIMG, 0, 0, 200, 200);
  }
  ovIMG.src = path;
}








// click event to create data stream
mkbtn.addEventListener('click', function(evt){
  DATAURL = canvas.toDataURL("image/png");
  ctr.innerHTML = '<div id="msg" class="red">not saved</div><img src="' + DATAURL + '" class="image-canvas" alt="composite image" title="composite image">';
});

// local storage persistance of current displayed image
svbtn.addEventListener('click', function(evt){
  var currentImage = localStorage.getItem('savedImage');

  if(DATAURL !== currentImage){
    localStorage.setItem('savedImage', DATAURL);
    localStorage.setItem('count', +1);
    if(!HASRUN){
      HASRUN = true;
      ctr.innerHTML = '<div id="msg" class="red">newly saved image (inside local storage)</div><img src="' + DATAURL + '" class="image-canvas" alt="composite image" title="composite image">';
    }
  }
});
// overlay image movement...
// helper function variables
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
  dragging: DRAGGING
}

var canMouseX;
var canMouseY;
// helper functions for movement of overlay image
function handleMouseDown(evt){
 canMouseX = parseInt(evt.clientX - xOffset);
 canMouseY = parseInt(evt.clientY - yOffset);
 movement.dragging = true;
}
function handleMouseUp(evt){
   canMouseX = parseInt(evt.clientX - xOffset);
   canMouseY = parseInt(evt.clientY - yOffset);
   movement.dragging = false;
}
function handleMouseOut(evt){
   canMouseX = parseInt(evt.clientX - xOffset);
   canMouseY = parseInt(evt.clientY - yOffset);
   movement.dragging = false;
}
function handleMouseMove(evt){
 canMouseX = parseInt(evt.clientX - xOffset);
 canMouseY = parseInt(evt.clientY - yOffset);
   if(movement.dragging){
     ctx.drawImage(bgIMG, 0, 0);
     ctx.drawImage(ovIMG, canMouseX-128/2, canMouseY-120/2,200,200);
   }
}
// create a downloadable file link/stream
function createImageFile(evt, data){
  evt.preventDefault();
  OCTDATA     = DATAURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  var dwl  = document.getElementById('dwl');
  dwl.href = OCTDATA;
  console.log('application/octet-stream =\n' , OCTDATA);
}
// calling the movement helper funcitons on the canvas for editing
canvas.onmousedown = function(evt){
  handleMouseDown(evt);
}
canvas.onmouseup = function(evt){
  handleMouseUp(evt);
}
canvas.onmouseout = function(evt) {
  handleMouseOut(evt);
}
canvas.onmousemove = function(evt) {
  handleMouseMove(evt);
}
