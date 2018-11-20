var  express = require('express');
var  bodyParser = require('body-parser');

var {mongoose} =  require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// return value is function
app.use(bodyParser.json());

//Post => post object to server

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// GET /todos/dfjr38d?ed3

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos}); 
	}, (e) => {
		res.status(400).send(e);
	})
});

app.listen(3000, () => {
	console.log("Server running on port 3000")
});
