const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');		
	} 
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// deleteMany
	db.collection('Users').deleteMany({name:'Alessandro'}).then((result) => {
		console.log(result);
	});


	// deleteOne
	// db.collection('Todos').deleteOne({text:'eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	db.collection('Users').findOneAndDelete({
		_id : new ObjectID("5bee3e77f23a852e67d94619")
	}).then((result) => {
		console.log(result);
	});

	client.close();
});