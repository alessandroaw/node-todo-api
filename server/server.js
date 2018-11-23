const _ = require('lodash');
const  express = require('express');
const  bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} =  require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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

app.delete('/todos/:id', (req, res) => {
	// get the id
	var id = req.params.id;
		// validate the id
		if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		return res.status(404).send();
	}

	// remove todo by id
	// Success
	// if no doc send 404
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			console.log('Todo not found');
			return res.status(404).send();
		}
		res.send(todo);
	}).catch ((e) => {
		res.status(400).send(e);
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	// validate the id
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		return res.status(404).send();
	}
	// console.log(body.completed);
	// console.log(_.isBoolean(body.completed));
	if(body.completed == true) {
		console.log('masuk');
		body.completedAt = new Date().getTime();
	}else {
		body.competed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})

});
// POST /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email','password']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});


app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
