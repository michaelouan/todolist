$(document).ready(function() {
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([35.41, 31.82]),
          zoom: 8
        })
      });
       
      map.on('click', function (evt) {
        var coord1 = ol.proj.toLonLat(evt.coordinate); //   <=== coordinate projection
        reverseGeocode(coord1[0],coord1[1]);
        alert(coord1);
        });
});

let a;

function getLocation() {
      navigator.geolocation.getCurrentPosition(function success(position) {
        console.log( position.coords.latitude + 
            "," + position.coords.longitude);
      });
}


function add() {
    var task = $('#title').val();
    var desc = $('#description').val();
    var dateToDo = $('#myDate').val();
    var location;

    if(task == ""){
        alert("you must choose a title")
    } else if(dateToDo == "") {
        alert("you must choose a date");
    }
else if(a == undefined) {
    location = " ";
    alert("you must choose a location");
} else {
    location = a.address.state + ", " + a.address.country;

    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    var month = d.getMonth();
    var year = d.getFullYear();
    var day = d.getDay();
    var x = day +"/" + month +"/" + year +"  " + h + ":" + m + ":" + s;

    $.ajax({
        url: "http://localhost:3000/add",
        type: "POST",
        data : {"title" : task , "description" : desc ,"currentDate" : x, "locationToDo" :  { "name": location , "lon" : a.lon ,"lat" : a.lat } ,"dateToDo" : dateToDo , "isComplete" : false },
        success: function(data) {
            console.log("Success")
        },
        dataType: "json",
      });

      window.location.replace("http://localhost:3000");
}

    return false;
}

function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

function reverseGeocode(lon,lat) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat)
      .then(function(response) {
          return response.json();
         }).then(function(json) {
             console.log(json);
             a = json;
         });
 }
 function redirect() {
    window.location.replace("http://localhost:3000");
 }