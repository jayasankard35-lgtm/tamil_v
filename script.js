const voiceBtn =
document.getElementById("voiceBtn");


const chat =
document.getElementById("chat");


const status =
document.getElementById("status");



const recognition =
new (window.SpeechRecognition ||
window.webkitSpeechRecognition)();



recognition.lang="ta-IN";

recognition.continuous=false;



voiceBtn.onclick=()=>{


status.innerText="கேட்கிறேன்...";

recognition.start();


};



recognition.onresult=(e)=>{


let text =
e.results[0][0].transcript;


chat.innerHTML =
"<b>நீங்கள்:</b><br>"+text;


sendToBackend(text);


};





async function sendToBackend(message){



status.innerText=
"பதில் உருவாக்குகிறது...";



let res =
await fetch(

"https://YOUR-BACKEND-URL.onrender.com/chat",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

message:message

})


});



let data =
await res.json();



chat.innerHTML +=


"<br><br><b>AI:</b><br>"+data.reply;



speakTamil(data.reply);



status.innerText="முடிந்தது";


}






function speakTamil(text){


let speech =
new SpeechSynthesisUtterance(text);


speech.lang="ta-IN";


speech.rate=0.9;


speechSynthesis.speak(speech);


}