var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var filename = __dirname + "/Assets/json/tasks.json";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var tasks=[];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// function responsible for retrieve the information from the Json file and send to the client.
app.get('/getTasks', function(req,res){
	fs.readFile(filename,'utf8', function (err, data){
       tasks = JSON.parse(data);
	     res.send(tasks);
	});
});
//Function responsible for post a new Task into the Json file 
app.post('/postTask', function(req,res){
    var task = req.body;
    tasks.push(task);
    fs.writeFile(filename,JSON.stringify(tasks));
});
//Function responsible for remove a taks from the Json File
app.post('/removeTask',function(req,res){
    var task = req.body;
    for (var i = 0;i<tasks.length;i++){
      if(tasks[i].id == task.id){
        tasks.splice(i,1);
        fs.writeFile(filename,JSON.stringify(tasks));
      }
    }
});
//Function responsible for edit a task in the Json File
app.post('/editTask',function(req,res){
    var task = req.body;
    var found = false;
    var i = 0;
    while(!found){
        if(tasks[i].id == task.id){
            tasks[i] = task;
            found=true;
            
        }else{
          i++;
        }
    }
    fs.writeFile(filename,JSON.stringify(tasks));
});

var server = app.listen(8081, function () {
    console.log("Web server listening on port 8081");
});
