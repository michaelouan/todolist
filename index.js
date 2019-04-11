var express = require("express");
var bodyParser = require('body-parser');

var app = express();
 
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);
 
app.get("/", function(request, response)  {
    
    response.render("homePage");
});
 
app.get("/test", function(request, response)  {
    
    response.render("testPage");
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



MongoClient.connect(url , function(err,db) {
    if(err) throw err;
    var dbo = db.db("mydb");
dbo.createCollection("task");

app.get("/list", function(request, response)  {
    dbo.collection("name").find({}).toArray(function (err,result) {
        if(err) throw err;
    response.send(result);
    });
 });


 app.post("/add", function(req, res) {
      
    //     var d = new Date();
    //     var h = addZero(d.getHours());
    //     var m = addZero(d.getMinutes());
    //     var s = addZero(d.getSeconds());
    //     var month = d.getMonth();
    //     var year = d.getFullYear();
    //     var day = d.getDay();
    //     var x = day +"/" + month +"/" + year +"  " + h + ":" + m + ":" + s;

    //     function addZero(i) {
    //         if (i < 10) {
    //           i = "0" + i;
    //         }
    //         return i;
    //       }

    //  var title , description;
    //  title = req.body.title;
    //  description = req.body.description;
    //  var myData = { title : title , description: description , currentDate : x , dateToDo : req.body.dateToDo , locationToDo : { name :req.body.location.name , x:req.body.location.lon , y : req.body.location.lat },isComplete : false};
     dbo.collection("name").insertOne(req.body);
     console.log(myData);
});

app.post("/deleteTask" , function(req,res) {
    var taskToDelete = { "title" : req.body.title , "description": req.body.description , "currentDate": req.body.currentDate , "dateToDo": req.body.dateToDo, "locationToDo": req.body.locationToDo }
     dbo.collection("name").deleteOne({"title" : req.body.title , "description": req.body.description , "currentDate": req.body.currentDate , "dateToDo": req.body.dateToDo, "locationToDo": req.body.locationToDo });
    console.log(taskToDelete);
})

app.post("/validateTask" , function(req,res) {
    var taskToValid = { "title" : req.body.title , "description": req.body.description , "currentDate": req.body.currentDate , "dateToDo": req.body.dateToDo, "locationToDo": req.body.locationToDo }
    var myquery = { $set: {isComplete: true} };
    dbo.collection("name").updateOne(taskToValid , myquery);
    console.log(taskToDelete);
})

//db.close();
});
