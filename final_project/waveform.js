

document.addEventListener("DOMContentLoaded", function() {
    // initiate variables
    let waveColor = "purple";
    let play = document.getElementById('play');
    let micButton = document.getElementById('micButton');
    let normalWave = document.getElementById('normalWave');
    let barWave = document.getElementById('barWave');
    let color = document.getElementById('colorPicker');
    let playback = document.getElementById('playback');
    let mute = document.getElementById('mute');
    let skipBack = document.getElementById('skipBack');
    let skipForward = document.getElementById('skipForward');
    let zoomSlider = document.getElementById('zoom')

    // initiate waveform
    let wavesurfer = WaveSurfer.create({
        container: '#waveform',
        responsive: true,
        waveColor: waveColor,
        progressColor: 'rgb(128, 128, 128)', // change to lighter shade of wavecolor?
        scrollParent: true,
        skipLength: 5, // set value skip forward/backward
        plugins: [
            WaveSurfer.cursor.create({
                showTime: true,
                opacity: 1,
                customShowTimeStyle: {
                    'background-color': '#000',
                    color: '#fff',
                    padding: '2px',
                    'font-size': '10px',
                }
            }),
            WaveSurfer.microphone.create({
                bufferSize: 4096,
                numberOfInputChannels: 1,
                numberOfOutputChannels: 1,
                constraints: {
                    video: false,
                    audio: true
                }
            }),
            // WaveSurfer.spectrogram.create({
            //     container: #spectrogram,
            //     labels: true,
            //     colorMap: colorMap
            // })
        ]

    });

    // microphone 
    micButton.onclick = function(){
        let fileEmpty = document.getElementById("fileInput").value;
        if (fileEmpty != ""){
            document.getElementById("fileInput").value = "";
        }
        wavesurfer.drawer.clearWave();
        wavesurfer.microphone.on('deviceReady', function(stream) {
            console.log('Device ready!', stream);
        });
        wavesurfer.microphone.on('deviceError', function(code) {
            console.warn('Device error: ' + code);
            wavesurfer.microphone.stop();
            wavesurfer.pause();
            micButton.textContent = "Microphone On";
        });

        if (wavesurfer.microphone.active){
            wavesurfer.microphone.stop();
            wavesurfer.pause();
            this.textContent = "Microphone On"
        }
        else{
            wavesurfer.microphone.start();
            wavesurfer.setMute(true);
            wavesurfer.play();
            this.textContent = "Microphone Off"
        }
    }

    // normal wave
    normalWave.addEventListener('click', function(){
        wavesurfer.drawer.clearWave();
        wavesurfer.params.barWidth = null,
        wavesurfer.params.barHeight = 1,
        wavesurfer.params.barGap = null,
        wavesurfer.drawBuffer();
    });

    // bar wave
    barWave.addEventListener('click', function(){
        wavesurfer.drawer.clearWave();
        wavesurfer.params.barWidth = 2,
        wavesurfer.params.barHeight = 1,
        wavesurfer.params.barGap = null,
        wavesurfer.drawBuffer();
    });

    // spectrogram

    // if (waveStyle === "spectrogram"){
        // const colormap = require('colormap');
        // const colors = colormap({
        //     colormap: 'hot',
        //     nshades: 256,
        //     format: 'float'
        // });
        // const fs = require('fs');
        // fs.writeFile('hot-colormap.json', JSON.stringify(colors)); 

        // function loadSpectrogram(colorMap){
        //     WaveSurfer.spectrogram.create({
        //         wavesurfer: wavesurfer,
        //         container: "#wave-spectrogram",
        //         labels: true,;
        //         colorMap: colorMap
        //     })
        // }
        // wavesurfer.params.plugins = [
        //     WaveSurfer.spectrogram.create({
        //         wavesurfer: wavesurfer,
        //         container: "#wave-spectrogram",
        //         labels: true
        //         colorMap: colorMap
        //     })
        // ]
        // wavesurfer.drawer.clearWave();
        // wavesurfer = WaveSurfer.create({
        //     // container: '#waveform',
        //     container: document.querySelector('#waveform'),
        //     waveColor: waveColor,
        //     progressColor: waveColor,
        //     scrollParent: true,
        //     skipLength: 5, // set value skip forward/backward
        //     plugins: [
        //         WaveSurfer.spectrogram.create({
        //             wavesurfer: wavesurfer,
        //             container: "#wave-spectrogram",
        //             labels: true
        //         })
        //     ]
        // });   
    // }
    color.addEventListener('input', function(){
        wavesurfer.drawer.clearWave();
        wavesurfer.params.waveColor = (color.value)
        wavesurfer.drawBuffer();
    });
    
    document.getElementById("fileInput").addEventListener("input", function(e){
        let file = this.files[0];
        if (file){
            play.textContent = "Play";
            var reader = new FileReader();
            reader.onload = function (evt) {
                var blob = new window.Blob([new Uint8Array(evt.target.result)]);
                wavesurfer.loadBlob(blob);
            };
            reader.onload = function (evt) {
                // Create a Blob providing as first argument a typed array with the file buffer
                var blob = new window.Blob([new Uint8Array(evt.target.result)]);

                // Load the blob into Wavesurfer
                wavesurfer.loadBlob(blob);
            };

            reader.onerror = function (evt) {
                console.error("An error ocurred reading the file: ", evt);
            };

            // Read File as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        }
    }, false);

    wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
    // wavesurfer.load('chanel.mp3');

    //playlist
    let atmosphere = document.getElementById('atmosphere');
    let balkan = document.getElementById('balkan');
    let piano = document.getElementById('piano');
    let dance = document.getElementById('dance');
    let jazz = document.getElementById('jazz');
    let river = document.getElementById('river');
    let vocals = document.getElementById('vocals');

    atmosphere.addEventListener('click', function(){
        wavesurfer.load("atmosphere.mp3");
    });
    balkan.addEventListener('click', function(){
        wavesurfer.load("balkan_guitars.flac");
    });
    piano.addEventListener('click', function(){
        wavesurfer.load("classical_piano.mp3");
    });
    dance.addEventListener('click', function(){
        wavesurfer.load("dance.wav");
    });
    jazz.addEventListener('click', function(){
        wavesurfer.load("jazz_guitar.wav");
    });
    river.addEventListener('click', function(){
        wavesurfer.load("river_waves.mp3");
    });
    vocals.addEventListener('click', function(){
        wavesurfer.load("vocals_synth.mp3");
    });

    playback.addEventListener('change', function(){
        console.log(document.getElementById('playback').value);
        wavesurfer.backend.setPlaybackRate(playback.value);
    })

    // play button
    play.addEventListener('click', function(){
        if (wavesurfer.getMute() && mute.textContent != "Unmute"){
            wavesurfer.setMute(false);
        }
        wavesurfer.playPause();
        if (this.textContent === "Play") {
            this.textContent = "Pause";
        } else {
            this.textContent = "Play";
        }
    });
        
    // mute button
    mute.addEventListener('click', function(){
        wavesurfer.toggleMute();
        muteStatus = wavesurfer.getMute();
        if (muteStatus == false) {
            this.textContent = "Mute";
        } else {
            this.textContent = "Unmute";
        }
    });

    // skip backward button
    skipBack.addEventListener('click', function(){
        wavesurfer.skipBackward();
    });

    // skip forward button
    skipForward.addEventListener('click', function(){
        wavesurfer.skipForward();
    });

    // zoom
    zoomSlider.value = wavesurfer.params.minPxPerSec;
    zoomSlider.min = wavesurfer.params.minPxPerSec;
    zoomSlider.max = 1000;
    zoomSlider.addEventListener('input', function() {
        wavesurfer.zoom(Number(this.value));
    });

    // equalizer
    wavesurfer.on('ready', function() {
        if (wavesurfer.microphone.active){
            return;
        }
        let isEmpty = document.getElementById('equalizer').innerHTML === "";
        if (!isEmpty){
            // reset eq
            return;
        }
         let EQ = [
            {
                f: 32,
                type: 'lowshelf'
            },
            {
                f: 64,
                type: 'peaking'
            },
            {
                f: 125,
                type: 'peaking'
            },
            {
                f: 250,
                type: 'peaking'
            },
            {
                f: 500,
                type: 'peaking'
            },
            {
                f: 1000,
                type: 'peaking'
            },
            {
                f: 2000,
                type: 'peaking'
            },
            {
                f: 4000,
                type: 'peaking'
            },
            {
                f: 8000,
                type: 'peaking'
            },
            {
                f: 16000,
                type: 'highshelf'
            }
        ];

        let filters = EQ.map(function(band) {
            let filter = wavesurfer.backend.ac.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0;
            filter.Q.value = 1;
            filter.frequency.value = band.f;
            return filter;
        });
        
        // connect filters to wavesurfer
        wavesurfer.backend.setFilters(filters);

        // bind filters to sliders
        let container = document.querySelector('#equalizer');
        filters.forEach(function(filter) {
            let input = document.createElement('input');
            Object.assign(input, {
                type: 'range',
                min: -40,
                max: 40,
                value: 0,
                title: filter.frequency.value
            });
            input.style.display = 'inline-block';
            input.setAttribute('orient', 'vertical');
            wavesurfer.util.style(input, {
                webkitAppearance: 'slider-vertical',
                width: '50px',
                height: '150px',
            });
            container.appendChild(input);

            let eqOnChange = function(e) {
                filter.gain.value = ~~e.target.value;
            };
            input.addEventListener('input', eqOnChange);
            input.addEventListener('change', eqOnChange);
            
        });
    });

    // volume slider
    wavesurfer.on('ready', function(){
        let volOnChange = function(e) {
            wavesurfer.setVolume(e.target.value);
        };
        volume.addEventListener('input', volOnChange);
        volume.addEventListener('change', volOnChange);
    });

    // wavesurfer.on('ready', function(){
    //     wavesurfer.panner = wavesurfer.backend.ac.createPanner();
    //     wavesurfer.backend.setFilter(wavesurfer.panner);
    //     let panSlider = document.querySelector('#pannerInput');
    //     let panOnChange = function(e) {
    //         var xDeg = parseInt(e.target.value);
    //         var x = Math.sin(xDeg * (Math.PI / 100));
    //         wavesurfer.panner.setPosition(x, 0, 0);
    //     };
    //     panSlider.addEventListener('input', panOnChange);
    // });
});



// document.addEventListener('DOMContentLoaded', function() {
//     // Load a colormap json file to be passed to the spectrogram.create method.
//     WaveSurfer.util
//         .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
//         .on('success', colorMap => {
//             loadSpectrogram(colorMap);
//         });
// });
