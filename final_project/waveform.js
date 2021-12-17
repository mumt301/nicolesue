document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    // initiate variables
    let waveStyle = "normal";
    let waveColor = "purple";
    let playback = 1;

    let params = (new URL(document.location)).searchParams;
    if (params.has("playback")){
        playback = parseInt(params.get("playback"));
    }
    if (params.has("waveStyle")){
        waveStyle = params.get("waveStyle");
    }   

    if (params.has("waveColour")){
        waveColor = params.get("waveColour");
    }

    // var wavesurfer = WaveSurfer.create({
    //     container     : '#waveform',
    //     waveColor     : 'black',
    //     interact      : false,
    //     cursorWidth   : 0,
    //     plugins: [
    //       WaveSurfer.microphone.create()
    //     ]
    //   });
      
    //   wavesurfer.microphone.on('deviceReady', function(stream) {
    //       console.log('Device ready!', stream);
    //   });
    //   wavesurfer.microphone.on('deviceError', function(code) {
    //       console.warn('Device error: ' + code);
    //   });
      
    //   // start the microphone
    //   wavesurfer.microphone.start();
      
    //   // pause rendering
    //   //wavesurfer.microphone.pause();
      
    //   // resume rendering
    //   //wavesurfer.microphone.play();
      
    //   // stop visualization and disconnect microphone
    //   //wavesurfer.microphone.stopDevice();
      
    //   // same as stopDevice() but also clears the wavesurfer canvas
    //   //wavesurfer.microphone.stop();
      
    //   // destroy the plugin
    //   //wavesurfer.microphone.destroy();

    let wavesurfer = WaveSurfer.create({
        // container: '#waveform',
        container: document.querySelector('#waveform'),
        responsive: true,
        waveColor: waveColor,
        progressColor: waveColor,
        scrollParent: true,
        skipLength: 5, // set value skip forward/backward
        backend: 'MediaElement',
        plugins: [
            WaveSurfer.cursor.create({
                showTime: true,
                opacity: 1,
                customShowTimeStyle: {
                    'background-color': '#000',
                    color: '#fff',
                    padding: '2px',
                    'font-size': '10px'
                }
            })
        ]
    });
    if (waveStyle === "barWave"){
        wavesurfer.params.barWidth = 2,
        wavesurfer.params.barHeight = 1,
        wavesurfer.params.barGap = null 
    }

    if (waveStyle === "spectrogram"){
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
        //         labels: true,
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
    }
    
    // document.getElementById("fileInput").addEventListener("change", function(e){
    //     let file = this.files[0];
    //     if (file){
    //         var reader = new FileReader();

    //         reader.onload = function (evt) {
    //             var blob = new window.Blob([new Uint8Array(evt.target.result)]);
    //             wavesurfer.loadBlob(blob);
    //         };
    //         reader.onload = function (evt) {
    //             // Create a Blob providing as first argument a typed array with the file buffer
    //             var blob = new window.Blob([new Uint8Array(evt.target.result)]);

    //             // Load the blob into Wavesurfer
    //             wavesurfer.loadBlob(blob);
    //         };

    //         reader.onerror = function (evt) {
    //             console.error("An error ocurred reading the file: ", evt);
    //         };

    //         // Read File as an ArrayBuffer
    //         reader.readAsArrayBuffer(file);
    //     }
    // }, false);


    document.getElementById("fileInput").addEventListener('change', function(e){
        var file = this.files[0];
        window.fileURL = URL.createObjectURL(file);
        window.wavesurfer.empty()
        window.waveusrfer.load(window.fileURL);
        wavesurfer.load(audio);
    });

    wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
    // wavesurfer.load('chanel.mp3');
    wavesurfer.setPlaybackRate(playback);

    // play button
    play = document.getElementById('play');
    play.addEventListener('click', function(){
        wavesurfer.playPause();
        if (this.textContent === 'Play') {
            this.textContent = "Pause";
        } else {
            this.textContent = "Play";
        }
    });
        
    // mute button
    mute = document.getElementById('mute');
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
    skipBack = document.getElementById('skipBack');
    skipBack.addEventListener('click', function(){
        wavesurfer.skipBackward();
    });

    // skip forward button
    skipForward = document.getElementById('skipForward');
    skipForward.addEventListener('click', function(){
        wavesurfer.skipForward();
    });

    // equalizer
    wavesurfer.on('ready', function() {
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
        // wavesurfer.panner = wavesurfer.backend.ac.createPanner();
        // filters[0].connect(wavesurfer.panner)
        
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
                height: '150px'
            });
            container.appendChild(input);

            let eqOnChange = function(e) {
                filter.gain.value = ~~e.target.value;
            };

            input.addEventListener('input', eqOnChange);
            input.addEventListener('change', eqOnChange);
            
        });

        // wavesurfer.panner = wavesurfer.backend.ac.createPanner();
        // wavesurfer.backend.setFilter(wavesurfer.panner);
        let panSlider = document.querySelector('#pannerInput');
        panSlider.addEventListener('input', function(f){
            var xDeg = parseInt(f.target.value);
            var x = Math.sin(xDeg * (Math.PI / 100));
            wavesurfer.panner.setPosition(x, 0, 0);
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



document.addEventListener('DOMContentLoaded', function() {
    // Load a colormap json file to be passed to the spectrogram.create method.
    WaveSurfer.util
        .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
        .on('success', colorMap => {
            loadSpectrogram(colorMap);
        });
});
