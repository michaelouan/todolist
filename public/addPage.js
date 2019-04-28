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

function verifyAndAdd() {
  var task = $('#title').val();
  var dateToDo = $('#myDate').val();
  var datetodo = new Date(dateToDo);
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  var month = d.getMonth();
  var year = d.getFullYear();
  var day = d.getDate();
  var x = day +"/" + month +"/" + year +"  " + h + ":" + m + ":" + s;
  
  if(task == ""){
      alert("You need choose a title")
  } else if(dateToDo == "") {
      alert("You need choose a date");
  } else if (datetodo.getTime() < d.getTime()){
        alert("This date has already passed ,Choose an another date");
  } else if(a == undefined) {
      alert("You need choose a location");
  } else {
      addOne(task,x,dateToDo);
  }
}

function addOne(task,x,dateToDo) {

  let desc = $('#description').val(); 
  $.ajax({
      url: "http://localhost:3000/add",
      type: "POST",
      data : {"title" : task , "description" : desc ,"currentDate" : x, "locationToDo" :  { "name": a.display_name , "lon" : a.lon ,"lat" : a.lat },"user" : '' ,"dateToDo" : dateToDo , "isComplete" : false },
      success: function(data) {
          console.log("Success")
      },
      dataType: "json",
    });

    window.location.replace("http://localhost:3000/home");
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
  window.location.replace("http://localhost:3000/home");
}