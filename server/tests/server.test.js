const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [{
    _id: new ObjectId(),
    text: 'First test todo'
}, {
    _id: new ObjectId(),
    text: 'Second test todo',
    completed: true
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                };

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    return done(err);
                });
            });
    });

    it('should not create todo with invalid body', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });    
});

describe('GET /todos/:id', () => {
    it('should return a todo with id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 with invalid id', (done) => {
        request(app)
            .get('/todos/abc')
            .expect(404)
            .end(done);
    });
    it('should return 404 if id is valid but todo not available', (done) => {
        let hexId = new ObjectId().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

});

describe('DELETE /todos/:id', () => {
    it('should delete a todo', (done) => {
        let hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            // .end(done);
            .end((err, res) => {
                if(err){
                    return done(err);
                };

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        let id = new ObjectId().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is not valid', (done) => {
        request(app)
            .delete('/todos/abc')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        let body = {
            text: 'Updated by supertest',
            completed: true
        };
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                // expect(res.body.todo.id).toBe(hexId);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    // expect(todo._id.toHexString).toBe(hexId);
                    expect(todo.text).toBe(body.text);
                    expect(todo.completed).toBe(true);
                    expect(typeof todo.completedAt).toBe('number');
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        let body = {
            text: 'Updated text',
            completed: false
        }
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                // expect(res.body.todo._id).toBe(hexId);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    // expect(todo._id).toBe(hexId);
                    expect(todo.text).toBe(body.text);
                    expect(todo.completed).toBe(false);
                    expect(todo.completedAt).toBeNull();
                    done();
                }).catch((e) => done(e));
            });
    });
});