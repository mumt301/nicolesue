// modified code from in class example
function queryArtist(){
    let params = (new URL(document.location)).searchParams;
    if (params.has("artist")){
        let artistName = params.get("artist");
        console.log(artistName);
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;
        console.log(queryURL);
        httpGet(queryURL, getMBID);
    }
}

function queryAlbums(artistMBID){
    let mbBaseURL = "https://musicbrainz.org/ws/2/";
    let mbBrowse = "release-group?artist=";
    let mbLimit = "&limit=1000";
    let queryURL = mbBaseURL + mbBrowse + artistMBID + mbLimit;
    console.log(queryURL);
    httpGet(queryURL, getDiscography)
}

function httpGet(theURL, cbFunction){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theURL);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            cbFunction(this);
        }
    };
}

function getMBID(xhttp){
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);
    let artistData = retrievedData.getElementsByTagName("artist")[0];
    console.log(artistData);
    let artistName = artistData.getElementsByTagName("name")[0].innerHTML;
    console.log(artistName);
    let artistMBID = artistData.id;
    console.log(artistMBID);
    queryAlbums(artistMBID);
}

function getDiscography(xhttp){
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);
    let discography = retrievedData.getElementsByTagName("release-group");
    console.log(discography);
    let placeholder = document.getElementById("placeholder");
    let table = "<table><tr><th>ALBUM</th><th>RELEASE DATE</th></tr>";
    for (row = 0; row < discography.length; row++){
        let albumData = discography[row];
        console.log(albumData);
        let albumName = albumData.getElementsByTagName("title")[0].innerHTML;
        console.log(albumName);
        let releaseDate = albumData.getElementsByTagName("first-release-date")[0].innerHTML;
        console.log(releaseDate);
        if (releaseDate == ""){
            table += "<tr><td>" + albumName + "</td>" + "<td>" + "N/A" + "</td></tr>";
        }
        else{
        table += "<tr><td>" + albumName + "</td>" + "<td>" + releaseDate + "</td></tr>";
        }
    }
    table += "</table>"
    placeholder.innerHTML = table;
}
window.onload = queryArtist;