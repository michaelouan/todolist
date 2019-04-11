
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
          html +='<tr style="background-color : green"><td>' + title +'</td><td>' + description + '</td><td>' + locationToDo + '</td><td>'  +
          dateToDo +'</td><td>' + currentDate + '</td><td><button onclick="alerter(this)">validate</button></td><td><button class="remove" id="' + index  + '">Delete</button></td></tr>';        }
       else {
        html +='<tr><td>' + title +'</td><td>' + description + '</td><td>' + locationToDo + '</td><td>'  +
        dateToDo +'</td><td>' + currentDate + '</td><td><button onclick="alerter(this)">validate</button></td><td><button class="remove" id="' + index  + '">Delete</button></td></tr>';
       }
        $("#table").html(html);
    }
}

function alerter(d) {
  $.ajax({
    url: "http://localhost:3000/validateTask",
    type: "POST",
    data : myData[d.parentNode.parentNode.rowIndex - 1],
    success: function(result) {
        console.log("success");
    }
  });
  //location.reload();
  $(d).parent().parent().css("background-color", "green");
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
 