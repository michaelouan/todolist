var express = require("express");
var bodyParser = require('body-parser');
var getJSON = require('get-json');
var app = express();
const fetch = require('node-fetch');
app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);
 
app.get("/", function(request, response)  {
    response.render("login");
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url , function(err,db) {
    if(err) throw err;
    var dbo = db.db("mydb");
    var userDb = db.db("MyDatabase");
dbo.createCollection("name");

app.get("/list", [requiresLogin] ,function(request, response)  {
    let query;
    if(request.user.status === "admin") {
        dbo.collection("name").find({}).toArray(function (err,result) {
            if(err) throw err;
            response.send(result);
            console.log(request.session);
        });
    } else if(request.user.status === "simpleUser") {
        dbo.collection("name").find({"user" : request.user.username}).toArray(function (err,result) {
            if(err) throw err;
            response.send(result);
            console.log(request.user);
        });
    } else if(request.user.status === "lightAdmin"){
        fetch('http://techslides.com/demos/country-capitals.json')
        .then(function(response) {
            return response.json();
           }).then(function(json) {
    
            json.splice(227,1);
            json.splice(237,1);
            dbo.collection("name").find({}).toArray(function (err,result) {

                for (let taskIndex = 0; taskIndex < result.length; taskIndex++) {
                    var isNear = false;
                    for (let index = 0; index < json.length; index++) {
                        if(getNearTasks(result[taskIndex].locationToDo.lon,result[taskIndex].locationToDo.lat,json[index].CapitalLongitude,json[index].CapitalLatitude)) {
                            isNear = true;
                            break;
                        }  
                    }

                    if(!isNear) {
                        console.log("dgsdgs")
                        result.splice(taskIndex,1);
                        taskIndex--;
                    }
                }
       
                if(err) throw err;
                response.send(result);
                console.log(request.user);
            });
        });
    }
});

 app.post('/register' , function(req,res) {
    let isExisting = false;
    userDb.collection("userInfo").find({}).toArray(function (err,result) {
        for(let i=0;i<result.length ; i++) {
            if(result[i].username === req.body.username ) {
                isExisting= true;
                break;
            }
        } 

        if(!isExisting) {
            req.body.status = "simpleUser";
            userDb.collection("userInfo").insertOne(req.body);
            res.send(isExisting);
        } else {
            res.send(isExisting);
        }
    });
})

app.post("/add", function(req, res) {
     req.body.user = req.user.username;
     dbo.collection("name").insertOne(req.body);
     console.log(req);
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


var session = require("express-session");
app.use(session({ secret: "cats" }));
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    UserDetails.findById(id, function(err, user) {
    cb(err, user);
  });
});

function requiresLogin(req, res, next) {
      if(typeof req.session.passport == "undefined") {
          res.redirect("http://localhost:3000")
      } else {
        next();
      }
  }

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyDatabase');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
      username: String,
      password: String,
      status : String
    });
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false , { message: 'Incorrect username or password.' });
        }
        return done(null, user);
      });
  }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });

app.get("/home" ,[requiresLogin] , function(request, response)  {
      response.render("homePage");    
     console.log(request.session);
});

app.get("/test", [requiresLogin] ,function(request, response)  {
    response.render("addPage");
});

app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/'); 
    });
});

app.get('/register' , function(req,res) {
      res.render("register")
})


function getNearTasks(lon,lat,lon1,lat1) {

    if(getDistanceFromLatLonInKm(lon,lat,lon1,lat1) < 15) {
        return true;
    } else {
        return false;
    }
}

  function deg2rad(deg) {
    return deg * (Math.PI/180)
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


