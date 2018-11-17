const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');		
	} 
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// },(err,result) => {
	// 	if(err){
	// 		return console.log('Unable to insert todo', err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// })

	// const db = client.db('TodoApp');
	// insert new doc into users (name, age, location)
	
	db.collection('Users').insertOne({
		name: 'Alessandro',
		age: 20,
		location: 'Indonesia'
	},(err,result) => {
		if(err){
			return console.log('Unable to insert todo', err);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	})



	client.close();
});