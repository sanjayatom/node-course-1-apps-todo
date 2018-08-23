const {SHA256} = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123!';

// bcrypt.genSalt(10, (err, salt) => {
//     console.log(salt);
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$q1lYZ/hxN/8ycUoSR0xU1eDidju3KlifnUqwbgn2S7ufspFLvHQa2';

bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log(result);
});

// let data = {
//     id: 10
// }

// let token = jwt.sign(data, 'abc123');

// console.log(token);

// let decoded = jwt.verify(token, 'abc123');

// console.log('decoded ', decoded);