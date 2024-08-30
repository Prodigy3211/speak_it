const  express = require('express');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

//middleware

app.use(express.json());

//jwst secret

const JWT_SECRET = 'placeholder';

//Sign Up PAge Route

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;

    //Hashout the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert new User into the Database
    connection.query(
        'INSERT INTO users (username, email, password) VALUES (? , ? , ?)',
        [username, email, hashedPassword],
        (err, result) => {
            if (err){
                return res.status(500).json({message:'Error registering user'});
            }
            res.status(201).json({message:'User successfully registered!'});
        }
    );
});

//Login Route

app.post('/login' , (req, res) => {
    const {email, password} = req.body;

    //Does User Exist?
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
    async (err, results) => {
        if(err){
            return res.status(500).json({message:'Error logging in'});
        }
        if (results.length === 0) {
            return res.status(400).json({message:'User Not Found...'});
        }

        const user = results[0];

        //Password Check
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        //Create JWT Token
        const token = jwt.sign({id:user.id}, JWT_SECRET, {
            expiresIn:'1h',
        });
        res.json({message:'Login Successful!', token});
    }
    );
});

//start Server
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});