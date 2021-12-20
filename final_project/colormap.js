// creates the color map for the spectrogram
const colormap = require('colormap');
const colors = colormap({
    colormap: 'hot',
    nshades: 256,
    format: 'float'
});
const fs = require('fs');
var json_text = JSON.stringify(colors);
fs.writeFile('hot-colormap.json', json_text, function(err){
    if(err){
        return console.log(err);
    }
    console.log("The file was saved!");
});   