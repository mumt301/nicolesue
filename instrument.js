"use strict";

// initiate variables
let minFrequency = 220;
let maxFrequency = 440;
let semitones = 0;
let oscillatorType = "sine";

let params = (new URL(document.location)).searchParams;
if (params.has("min")){
    minFrequency = parseInt(params.get("min"));
}
if (params.has("max")){
    maxFrequency = parseInt(params.get("max"));
}   

if (params.has("interval")){
    semitones = parseInt(params.get("interval"));
}

if (params.has("oscillator")){
    oscillatorType = params.get("oscillator");
}

// Turn theremin on 
function thereminOn(oscillator, oscillatorHarmony) {
    oscillator.play();
    oscillatorHarmony.play();
}

// Control the theremin
function thereminControl(e, oscillator, oscillatorHarmony, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    if (semitones == 0){
        oscillatorHarmony.frequency = thereminFreq;
    }
    else{
        oscillatorHarmony.frequency = interval(thereminFreq, semitones);
    }
    document.getElementById("curFreq").innerHTML = "Current Frequency: " + thereminFreq;
    document.getElementById("intFreq").innerHTML = "Harmonic Frequency: " + oscillatorHarmony.frequency;
    document.getElementById("curNote").innerHTML = "Current Note: " + noteFromFrequency(thereminFreq, true);
    document.getElementById("intNote").innerHTML = "Harmonic Note: " + noteFromFrequency(oscillatorHarmony.frequency, true);
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;
    oscillatorHarmony.volume = thereminVolume;
}

// Turn theremin off
function thereminOff(oscillator, oscillatorHarmony) {
    oscillator.stop();
    oscillatorHarmony.stop();
}

function runAfterLoadingPage() {
    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });
    const oscillatorHarmony = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });

    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator, oscillatorHarmony);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, oscillatorHarmony, theremin);
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator, oscillatorHarmony);
    });
}

window.onload = runAfterLoadingPage;