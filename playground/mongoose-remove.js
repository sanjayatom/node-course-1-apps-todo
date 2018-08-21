const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b7c235daeba603ce1c745da';

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({ _id: id}).then((todo) => {
//     console.log(JSON.stringify(todo, undefined, 2));
// }, (e) => {
//     console.log(e);
// });

// Todo.findByIdAndRemove(id).then((todo) => {
//     console.log(JSON.stringify(todo, undefined, 2));
// }, (e) => {
//     console.log(e);
// });