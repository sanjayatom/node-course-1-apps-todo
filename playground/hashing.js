const {SHA256} = require('crypto');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
}

let token = jwt.sign(data, 'abc123');

console.log(token);

let decoded = jwt.verify(token, 'abc123');

console.log('decoded ', decoded);