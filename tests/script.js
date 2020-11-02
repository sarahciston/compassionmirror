/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

var talk = new p5.Speech();


function setup(){
  
  // talk.listVoices();

  createCanvas(400,400);
  
  // talk.setVoice(48); //'Google US English'
  talk.setVoice('Google US English');
  talk.speak('hello sexy');
  
}

// prints "hi" in the browser's dev tools console
console.log("hi");

//works, no p5//

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function populateVoiceList() {
  // if(typeof speechSynthesis === 'undefined') {
  //   return;
  // }
  
  var voices = speechSynthesis.getVoices();
  var googleEng = voices[48]
  console.log(googleEng)
  
  var input = ''
  var msg = new SpeechSynthesisUtterance(input);

  msg.voice = googleEng;

  synth.speak(msg);
  
}

var synth = window.speechSynthesis;

populateVoiceList();

////


  //   for(var i = 0; i < voices.length; i++) {
//     var option = document.createElement('option');
//     option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
//     // console.log(voices)
    
//     if(voices[i].default) {
//       option.textContent += ' -- DEFAULT';
//     }

//     option.setAttribute('data-lang', voices[i].lang);
//     option.setAttribute('data-name', voices[i].name);
//     document.getElementById("voiceSelect").appendChild(option);
//   }
