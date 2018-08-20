// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let objId = new ObjectID();
// console.log(objId.getTimestamp());
// console.log(objId.generationTime);
// console.log((new ObjectID("5b78975ab873712b40102784")).generationTime);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connection mongodb server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').find({name: 'John'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {

    });

    db.close();
});