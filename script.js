
// Input Display
const display = document.querySelector("#display");
const calling = document.querySelector(".calling");
const phone = document.querySelector(".phone");

// Number Buttons (1-9, *, 0, #)
const buttons = document.querySelectorAll(".btn");

// Action Buttons
const endBtn = document.querySelector("#clear");
const callBtn = document.querySelector("#call");
const deleteBtn = document.querySelector("#delete");
const historyBtn = document.querySelector("#history")

buttons.forEach(function(button){
    button.addEventListener("click",function(){
        if(display.value.length<10){
            display.value += button.textContent;
        }       
    });
});

deleteBtn.addEventListener('click',function(){
    display.value=display.value.slice(0,-1);
});

let history = document.querySelector(".history");
let callHistory = JSON.parse(localStorage.getItem("callHistory")) || [];

// Audion object
const ringtone = new Audio("calling_tone.mp3");
ringtone.loop=true;

let iscalling = false;
callBtn.addEventListener('click',function(){
    
    if(display.value===''){
        alert("Please enter a number");
    }

    else {
        display.style.display='none';
        iscalling = true;
    
        ringtone.play();
        calling.textContent = (`📞 Calling...  ${display.value}`);
        calling.style.color="#fff";

        callHistory.push(display.value);
        localStorage.setItem("callHistory", JSON.stringify(callHistory));
        display.value="";

        history.innerHTML= "";

        callHistory.forEach(function(number){
            let p = document.createElement("p");
            p.textContent=`📞 ${number}`;
            history.appendChild(p);
        });    
    } 
});

endBtn.addEventListener('click',function(){

    if(!iscalling){
        return;
    }

    iscalling = false;
    
    ringtone.pause();
    ringtone.currentTime = 0;
    calling.textContent="Call Ended: ";
    calling.style.color="#f00";

    setTimeout(function(){
        calling.textContent="";
        display.style.display='initial';
    }, 1000);

});

historyBtn.addEventListener('click', function(){
    if(history.style.display==='initial'){
        history.style.display='none';
    }else{
        history.style.display='initial';
    }
});





