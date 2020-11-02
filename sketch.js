// created by sarah ciston
// with p5.js, ml5.js, p5.speech libraries
// and gpt2 deepAI api


let originalText = 'IVO-TextOnly.txt';
let textGPT = 'IVO-GPT2generatedONLY.txt';
let SFCompact = 'SFCompactText-Light.otf';

let msgOrig = [];
let msgGPT = [];
let latestOrig;
let latestGPT;

let talk = new p5.Speech();

let uNet;
let video;
let segmentationImage;
let canvas;

function preload() {
  originalText = loadStrings(originalText);
  textGPT = loadStrings(textGPT);
  uNet = ml5.uNet('face');
  SFCompact = loadFont(SFCompact);
}


//////////////////

function setup(){
  
  canvas = createCanvas(1024, 768) //, WEBGL);
  
  frameRate(0.5);
  
  textSize(width/25);
  // textFont(SFCompact); 
  
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  segmentationImage = createImage(width, height);
  uNet.segment(video, makeCutout);
  
  function makeCutout(error, cutout) {
    if (error) {
      console.error(error);
      return;
    }
    segmentationImage = cutout.backgroundMask;
    uNet.segment(video, makeCutout);
  }
  
  talk.setVoice(49); //'Google UK English'
  
  var url = new URL(document.location);
  // var hasFrameBoolean = url.searchParams.has("frame")
  if (url.searchParams.has("frame") === true) {
    staticFrame();
  };
  // url.searchParams.has("frame")? staticFrame() : continue //staticFrame()

}

/////////////////

function draw() {
  background(0);

  //draw random message from original samples, behind face
  append(msgOrig, random(originalText));
  latestOrig = (msgOrig.length - 1);
  fill(50, 205, 50); //lime
  text(msgOrig[latestOrig], random(800), random(800), 800, 800)
  
    //draw face mask
  image(segmentationImage, 0, 0, width, height);
  
  //draw random message from GPT results, in front of face
  append(msgGPT, random(textGPT));
  latestGPT = (msgGPT.length - 1);
  fill(0, 255, 255); //cyan //(161, 95, 251); //magenta
  text(msgGPT[latestGPT], random(800), random(800), 800, 800)
  
  //speak latest message from original samples & GPT
  // talk.speak(msgOrig[latestOrig]);
  talk.speak(msgGPT[latestGPT]);
}

///////////////////
//after DOM loads//

//toggle fullscreen on mouse press
function mousePressed() { 
    let fs = fullscreen(); 
    fullscreen(!fs);
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight); 
}

//make screengrab on ENTER key or ?frame URL
function staticFrame() {
  ////ADD HERE TO CREATE NON-ANIMATED IMAGE VERSION OF PIECE
  //just download a preloaded image file?
  save('Ciston-staticFrame' + new Date() +'.jpg');
}

function keyPressed() {
  if (keyCode === ENTER) {  
    staticFrame();
  }
}

// function checkParams() {
//   let params = getURLParams();
//   console.log('reached check', params);
//   for (let i = 0; i < params.length; i++) {
//     console.log(params[i]);
//     if (params.frame === true) {
//       staticFrame()
//     }
//   }
// }

