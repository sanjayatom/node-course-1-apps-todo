const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b7c235daeba603ce1c745da';

// if(!ObjectID.isValid('5b7ba5b105763b1d746509c1')){
//     return console.log('Id not valid');
// }

// Todo.findById('5b7ba5b105763b1d746509c1').then((todo) => {
//     if(!todo){
//         return console.log('Unable to find todo');
//     }

//     console.log(JSON.stringify(todo, undefined, 2));
// }, (e) => {
//     console.log(e);
// });

User.findById(id).then((user) => {
    if(!user){
        return console.log('User not found');
    }

    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});