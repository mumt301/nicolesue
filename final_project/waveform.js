document.addEventListener('DOMContentLoaded', function() {
    // initiate variables
    let waveColor = 'purple';
    let play = document.getElementById('play');
    let micButton = document.getElementById('micButton');
    let normalWave = document.getElementById('normalWave');
    let spectrogram = document.getElementById('spectrogramWave')
    let spectrogramContainer = document.getElementById('spectrogram');
    let barWave = document.getElementById('barWave');
    let color = document.getElementById('colorPicker');
    let playback = document.getElementById('playback');
    let mute = document.getElementById('mute');
    let skipBack = document.getElementById('skipBack');
    let skipForward = document.getElementById('skipForward');
    let zoomSlider = document.getElementById('zoom')
    let wavesurfer;

    // spectrogram color map
    WaveSurfer.util
        .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
        .on('success', colorMap => {
            initAndLoadWaveform(colorMap);
        });
    
    // initiate and load waveform
    function initAndLoadWaveform(colorMap){
        let options = {
            container: '#waveform',
            responsive: true, 
            waveColor: waveColor,
            progressColor: 'rgb(128, 128, 128)',
            scrollParent: true,
            skipLength: 5, // sets value of skip forward/backward
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
                WaveSurfer.spectrogram.create({
                    container: '#spectrogram',
                    labels: true,
                    colorMap: colorMap
                })
            ]
        };
        wavesurfer = WaveSurfer.create(options);

        // enables microphone 
        micButton.onclick = function(){
            // empties uploaded file
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            // clears waveform
            wavesurfer.drawer.clearWave();
            wavesurfer.microphone.on('deviceReady', function(stream) {
                console.log('Device ready!', stream);
            });
            // stops microphone if there is a device error
            wavesurfer.microphone.on('deviceError', function(code) {
                console.warn('Device error: ' + code);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On";
            });
            // pauses microphone
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                this.textContent = "Microphone On"
            }
            // starts microphone
            else{
                wavesurfer.microphone.start();
                wavesurfer.setMute(true);
                wavesurfer.play();
                this.textContent = "Microphone Off"
            }
        }

        // creates normal wave
        normalWave.addEventListener('click', function(){
            wavesurfer.drawer.clearWave();
            wavesurfer.params.barWidth = null,
            wavesurfer.params.barHeight = 1,
            wavesurfer.params.barGap = null,
            wavesurfer.drawBuffer();
        });

        // creates bar wave
        barWave.addEventListener('click', function(){
            wavesurfer.drawer.clearWave();
            wavesurfer.params.barWidth = 2,
            wavesurfer.params.barHeight = 1,
            wavesurfer.params.barGap = null,
            wavesurfer.drawBuffer();
        });

        // spectrogram
        spectrogram.addEventListener('click', function(){
            console.log(spectrogramWave);
            spectrogramContainer.style.display = 'none';
        })

        color.addEventListener('input', function(){
            wavesurfer.drawer.clearWave();
            wavesurfer.params.waveColor = (color.value)
            wavesurfer.drawBuffer();
        });

        // enables file upload
        document.getElementById("fileInput").addEventListener("input", function(e){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // gets audio file
            let file = this.files[0];
            if (file){
                play.textContent = "Play"; // resets play button
                var reader = new FileReader();
                // reads file 
                reader.onload = function (evt) {
                    var blob = new window.Blob([new Uint8Array(evt.target.result)]);
                    // loads the file input into the waveform
                    wavesurfer.loadBlob(blob);
                };
                // gives error if file cannot be read
                reader.onerror = function (evt) {
                    console.error("An error ocurred reading the file: ", evt);
                };
                // reads file as an array buffer
                reader.readAsArrayBuffer(file);
            }
        });

        wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
        // wavesurfer.load('sample_audio.mp3');
        //playlist
        let atmosphere = document.getElementById('atmosphere');
        let balkan = document.getElementById('balkan');
        let piano = document.getElementById('piano');
        let dance = document.getElementById('dance');
        let jazz = document.getElementById('jazz');
        let river = document.getElementById('river');
        let vocals = document.getElementById('vocals');

        // plays selected playlist audio 
        atmosphere.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("atmosphere.mp3");
        });
        balkan.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("balkan_guitars.flac");
        });
        piano.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("classical_piano.wav");
        });
        dance.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("dance.m4a");
        });
        jazz.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("jazz_guitar.mp3");
        });
        river.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("river_waves.mp3");
        });
        vocals.addEventListener('click', function(){
            // turns off microphone if it is still on
            if (wavesurfer.microphone.active){
                wavesurfer.setMute(false);
                wavesurfer.microphone.stop();
                wavesurfer.pause();
                micButton.textContent = "Microphone On"
            }
            // empties file input
            let fileEmpty = document.getElementById("fileInput").value;
            if (fileEmpty != ""){
                document.getElementById("fileInput").value = "";
            }
            play.textContent = "Play";
            wavesurfer.load("vocals_synth.mp3");
        });

        // sets playback rate
        playback.addEventListener('change', function(){
            wavesurfer.backend.setPlaybackRate(playback.value); // sets playback rate to selected value
        })

        // play button
        play.addEventListener('click', function(){
            wavesurfer.playPause(); // toggles between play/pause
            // changes text content of play buton
            if (this.textContent === "Play") {
                this.textContent = "Pause";
            } else {
                this.textContent = "Play";
            }
        });
            
        // mute button
        mute.addEventListener('click', function(){
            wavesurfer.toggleMute(); // mutes/unmutes audio
            muteStatus = wavesurfer.getMute();
            // changes text content of mute button
            if (muteStatus == false) {
                this.textContent = "Mute";
            } else {
                this.textContent = "Unmute";
            }
        });

        // skip backward button
        skipBack.addEventListener('click', function(){
            wavesurfer.skipBackward(); // skips forward 'skiplength' seconds
        });

        // skip forward button
        skipForward.addEventListener('click', function(){
            wavesurfer.skipForward(); // skips backward 'skiplength' seconds
        });

        // zoom
        zoomSlider.value = wavesurfer.params.minPxPerSec; // initializes slider to no zoom
        zoomSlider.min = wavesurfer.params.minPxPerSec; 
        zoomSlider.max = 1000;
        zoomSlider.addEventListener('input', function() {
            wavesurfer.zoom(Number(this.value)); 
        });

        // creates equalizer
        wavesurfer.on('ready', function() {
            let isEmpty = document.getElementById('equalizer').innerHTML === "";
            if (!isEmpty){
                return; // exits eq initialization if there is already an eq present
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
    }
});