const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true},(err, client) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');		
	} 
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// findOneAndDelete
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5bee3bd6fa2ca8768b804b18')
	}, {
		$set: {name: 'Alessandro'},
		$inc: {age:1}
	}, {
		returnOriginal:false
	}).then((result) => {
		console.log(result);
	});

	// client.close();
});