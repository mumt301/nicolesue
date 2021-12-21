# Interactive Waveform Visualizer

![image](https://github.com/mumt301/nicolesue/blob/main/final_project/sample_waveform.JPG?raw=true)

## Usage

This project consists of an interactive audio visualization. After loading an audio file, a navigable waveform will appear.

Accepted Audio Inputs:

* Microphone
* Local audio files
* Preloaded playlist

Above the waveform, there are options to use your microphone input or upload a local audio file. To select the microphone audio input, click the "Microphone On" button. This will give rise to a reactive waveform. To upload a local audio file, click the "Choose File" button and select an audio file to visualize it's waveform.

In the bottom left corner, there is a playlist of preloaded audio files. Select any audio file to view it's waveform.

There are also style options that can be used to modify the waveform. To change the color of the waveform, select any colour in the "Pick a Color" gradient. To change the style of the waveform, toggle between the "Normal Waveform", "Bar Waveform", and "Spectrogram" buttons.

Audio Features:

* Play, pause, mute, skip forward, skip backward
* Volume slider
* Zoom
* Adjustable playback rate
* Equalizer

To use these audio features, simply select your preferred options using the corresponding buttons or sliders. Enjoy!

## Dependencies

Built with:

* [wavesurfer.js](https://wavesurfer-js.org/).

## Supported Browsers

Works in modern browsers that support Web Audio:

* Edge versions 12 - 96
* Firefox versions 25 - 97
* Chrome versions 14 - 99
* Safari versions 6 - TP

## License

This work is licensed under a
[MIT License](LICENSE).

## Discussion

I was unable to implement a panner on top of the equalizer due to wavesurfer.js limitations.