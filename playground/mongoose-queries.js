const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5bf3fe1d2c5e834bba9eff55';
// var id = '5bf3fe1d2c5e834bba9eff551';
var id = '5bf257dae312114b993cf8bc';

// if(!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// }, (e) => {
// 	console.log(e);
// });


// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// }, (e) => {
// 	console.log(e);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('Id not found');
// 	}
// 	console.log('Todos By Id', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
	if(!user){
		return console.log('Id not found');
	}
	console.log('Todos By Id', user);
}).catch((e) => console.log(e));


