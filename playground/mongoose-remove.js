const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bf559efff607186d4218709';
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove({})

Todo.findByIdAndRemove(id).then((todo) => {
	console.log(todo);
});
