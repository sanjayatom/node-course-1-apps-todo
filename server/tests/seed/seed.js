const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id: userOneId,
    email: 'sanjay@test.com',
    password: 'userOnePass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'renu@test.com',
    password: 'userTwoPass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
    }]
}]

const todos = [{
    _id: new ObjectId(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectId(),
    text: 'Second test todo',
    completed: true,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        var UserOne = new User(users[0]).save();
        var UserTwo = new User(users[1]).save();

        return Promise.all([UserOne, UserTwo]);
    }).then(() => done()).catch((err) => done(err));
};

module.exports = {todos, populateTodos, users, populateUsers};