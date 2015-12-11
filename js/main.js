'use strict';
// constants || globals
var DATAURL;
var OCTDATA;
var canMouseX;
var canMouseY;

var HASRUN = false;
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

// store the cached image value
var cachedImage = localStorage.getItem('savedImage');
var currentImage;

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
// print the current image if it is in local storage
document.onreadystatechange = function() {
  if(document.readyState == "complete") {
    console.log('now!');
    if (cachedImage !== null) {
      ctr.insertAdjacentHTML('afterbegin', '<img src="' + cachedImage + '" class="image-canvas" alt="composite image" title="composite image">');
    }
  }
}
// click event to create data stream
mkbtn.addEventListener('click', function(event){

  DATAURL = canvas.toDataURL("image/png");

  ctr.insertAdjacentHTML('afterbegin', '<img src="' + DATAURL + '" class="image-canvas" alt="composite image" title="composite image">');

  console.log('temporary data @ \n' + DATAURL);

});
// local storage persistance of current displayed image
svbtn.addEventListener('click', function(event){
  var currentImage = localStorage.getItem('savedImage');

  if(DATAURL !== currentImage){
    localStorage.setItem('savedImage', DATAURL);
  }
  else if (DATAURL === currentImage){
      if(HASRUN){
        HASRUN = true;
        sub.insertAdjacentHTML('beforebegin', '<div class="red">current image</div>');
      }
    sub.insertAdjacentHTML('beforeend', '<img src="' + DATAURL + '" class="image-canvas result" alt="composite image" class="warn" title="composite image">');
  }
  else{
    console.log('else...')
  }
});
// overlay image movement...
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


// helper functions for movement of overlay image
function handleMouseDown(event){
 canMouseX = parseInt(event.clientX - xOffset);
 canMouseY = parseInt(event.clientY - yOffset);

 DRAGGING = true;
}

function handleMouseUp(event){
   canMouseX = parseInt(event.clientX - xOffset);
   canMouseY = parseInt(event.clientY - yOffset);

   DRAGGING = false;
}

function handleMouseOut(event){
   canMouseX = parseInt(event.clientX - xOffset);
   canMouseY = parseInt(event.clientY - yOffset);
}

function handleMouseMove(event){
 canMouseX = parseInt(event.clientX - xOffset);
 canMouseY = parseInt(event.clientY - yOffset);
   if(DRAGGING){
     ctx.drawImage(bgIMG, 0, 0);
     ctx.drawImage(ovIMG, canMouseX-128/2, canMouseY-120/2,128,120);
   }
}
function createImageFile(data){
  OCTDATA     = DATAURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  var dwl  = document.getElementById('dwl');
  dwl.href = OCTDATA;
  console.log('application/octet-stream =\n' , OCTDATA);
}

canvas.onmousedown = function(event){
  handleMouseDown(event);
}
canvas.onmouseup = function(event){
  handleMouseUp(event);
}
canvas.onmouseout = function(event) {
  handleMouseOut(event);
}
canvas.onmousemove = function(event) {
  handleMouseMove(event);
}
