$(document).ready(function() {

  getAll();

  if(myData.length == 0) {
    $("#a").append("there are no tasks")
  }
  $('.remove').click(function(){
      removeOne(this);
  });

  $("#opt").change(function(){
    if($("#opt").val() === "Completed tasks") {
      getCompletedTask();
    } else if($("#opt").val() === "Not completed tasks") {
      getinCompletedTask();
    } else if($("#opt").val() === "All tasks") {
      getAllTasks();
    }
  });

// When the user clicks on <span> (x), close the modal
$(".close").on("click" , function() {
  $('#myModal').css("display" , "none")
});

// When the user clicks anywhere outside of the modal, close it
$(window).on("click" ,function() {
  $('#myModal').css("display" , "none");
});

  getNearTasks();
  let currentNearTasks = nearTasks.length;
  let index = 0;
  setInterval(function(){ 

if(currentNearTasks > index) {
  let html= "";
  html+="<p>you have " + nearTasks.length + " tasks near of you : </p>"  ;
  for (let index = 0; index < nearTasks.length; index++) {
     html+='<p>'+ nearTasks[index] + "</p>";
  }
  $(".modal-body").html(html);
  $('#myModal').css("display" , "block")
  let help = currentNearTasks - index;
  index = help;
}
  }, 30000000);
});

let myData;

function show(data) {
    var html = '<tr><th>title</th><th>desciption</th><th>location</th><th>wich day?</th><th>add the</th><th>Validate</th><th>Delete</th></tr>';
    for (let index = 0; index < data.length; index++) {
        const title = data[index].title;
        const description = data[index].description;
        const locationToDo = data[index].locationToDo.name;
        const dateToDo = data[index].dateToDo;
        const currentDate = data[index].currentDate;

        if(data[index].isComplete == true) {
          html +='<tr style="background-color : green">';       }
       else {
        html +='<tr>';
       }

       html+= '<td>' + title +'</td><td>' + description + '</td><td>' + locationToDo + '</td><td>'  +
        dateToDo +'</td><td>' + currentDate +
         '</td><td><button onclick="valid(this)" id="valid">validate</button></td><td><button class="remove" id="' + index  +
          '">Delete</button></td></tr>';

        $("#table").html(html);
    }
}

function valid(d) {
  $.ajax({
    url: "http://localhost:3000/validateTask",
    type: "POST",
    data : myData[d.parentNode.parentNode.rowIndex - 1],
    success: function(result) {
        console.log("success");
    }
  });
  location.reload();
}

function getAll() {
  $.ajax({
    url: "http://localhost:3000/list",
    type : "GET",
    dataType: "json",
    async:false,
    data : {},
    success: function(data) {
      console.log(data);
      show(data);
      myData = data;
    }
  });
}

function removeOne(ev) {
  $.ajax({
    url: "http://localhost:3000/deleteTask",
    type: "POST",
    data : myData[ev.id],
    success: function(result) {
        console.log("success");
    }
  });
  location.reload();
}

function getCompletedTask() {
  for (let index = 0; index < myData.length; index++) {
      if(myData[index].isComplete == "false") {
         $("#table").children().eq(index + 1).hide();
      } else {
         $("#table").children().eq(index + 1).show();
      }
  }
}

function getinCompletedTask() {
 for (let index = 0; index < myData.length; index++) {
     if(myData[index].isComplete == true) {
        $("#table").children().eq(index + 1).hide();
     } else {
         $("#table").children().eq(index + 1).show();
     }
 }
}

function getAllTasks() {
  for (let index = 0; index < myData.length; index++) {
    $("#table").children().eq(index + 1).show();
  }
}

function getDistanceFromLatLonInKm(lon1,lat1,lon2,lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

let nearTasks = [];

function getNearTasks() {
  //if (navigator.geolocation) {    
 // navigator.geolocation.getCurrentPosition(function success(position) {
        for(let i=0;i<myData.length;i++) {
       if(getDistanceFromLatLonInKm(myData[i].locationToDo.lon ,myData[i].locationToDo.lat,
          35.13812249153852,31.70947636001935) < 1 && myData[i].isComplete == "false")
                                  {
                                          let tasks = myData[i].title + " at " +
                                          Math.round(getDistanceFromLatLonInKm(myData[i].locationToDo.lon ,myData[i].locationToDo.lat,
                                              35.13812249153852,31.70947636001935)*10)/10 + "km";
                                              nearTasks.push(tasks);
                                  }  
      }
 // });
// }
}