// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connection mongodb server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndDelete({name: 'John'}).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    }, (err) => {

    });

    //db.close();
});