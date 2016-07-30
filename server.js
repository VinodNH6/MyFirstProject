var express = require('express');
var app =  express();

/*var e = require('./js/server/nodeRouter.js');*/

//----
/*var nrouter = require('js/nodeRouter');
nrouter(app);*/
//---
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public')); 

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  console.log("No Such path..");
  next();
});

app.all('/first', function(req, res){
     //res.send('Hello');
     res.sendfile('./index.html');
/*     res.send('\
<!DOCTYPE html>\
<html lang="en">\
<head>\
<base href="/">\
</head>\
<body>\
<p>Hi This is vinods First Todo App</p>\
<div ng-view> </div>\
</body>\
</html>\
');*/
});

app.listen(PORT, function(){
	console.log('Server running on ' + PORT);
});

//--------------------------------------------TodoDB----------
var Todo = require('./public/js/server/db').Todo;
//app.use(express.bodyParser());
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())


app.get('/todos', function(req, res){
	console.log('In router get');
	Todo.find(function(err, results){
		if(err) {console.log(err);}
		res.send({todos: results});
	});
});

app.post('/todos', function(req, res){
	console.log('In router post');
	var todo = new Todo(req.body);
	todo.save(function(err){
		if(err) {console.log(err);}
		res.send('Todo Saved');
	});
});

app.put('/todos/:old', function(req, res){
	//var id = req.params.id;
	console.log('In router put');
	console.log('this is being updated '+ req.params.old);
	console.log('body: '+req.body.task);
/*	Todo.update(
		//{_id: mongoose.Types.ObjectId(id)}, 
		{task: req.body.old},
		{$set : {task: req.body.task}},
		function(err){
			if(err) {console.log(err);}
			res.send('Todo Udpated');
		});*/
		var cc = req.params.old;
		var ccc = cc.replace(":", "");
		var d = {task: ccc};
		console.log(d);
		Todo.findOne(d, function ( err, todo ){
    		todo.task = req.body.task;
    		todo.save(function (err){
    			if(err)
    				console.log('error');
    			else
    				res.send('Todo Saved');
      			/*res.redirect( '/' );*/
    		});
  		});
});

app.delete('/todos/:old', function(req, res){
	/*var id = req.params.id;
	Todo.remove({_id: mongoose.Types.ObjectId(id)}, function(err){
		if(err) {console.log(err);}
		res.send('Todo Deleted');
	});*/
	console.log('In router delete');
	console.log('this is being deleted '+ req.params.old);

	var cc = req.params.old;
	var ccc = cc.replace(":", "");
	var d = {task: ccc};
	console.log(d);
	Todo.remove(d, function (err) {
  	if (err) 
  		console.log('error'); //return handleError(err);
  	else
  		res.send('Todo Deleted');
	});
});
