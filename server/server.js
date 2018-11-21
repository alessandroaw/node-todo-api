var  express = require('express');
var  bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} =  require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;
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

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if(!todo){
			console.log('Todo not found');
			return res.status(404).send();
		}
			res.send(todo);
	}, (e) => {
		res.status(400).send(e);
	});
	// validate id using isValid

	// e status 404

	// findById
		// Success

	// res.send(req.params);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
