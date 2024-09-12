const  express = require ("express");
const cors = require ('cors');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

//middleware

app.use(express.json());
app.use(cors());

//jwst secret

const JWT_SECRET = process.env.JWT_SECRET;


//homepage route

app.get ('/', async (req,res) => {
    res.send('Welcome to Speakit');
});

//Sign Up Page Route

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

//My Profile Route

app.get('/my-profile' , (req,res) => {
    const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token , JWT_SECRET);
            const userId = decoded.id;
        //Fetch userID data from the database
            connection.query('SELECT username, email FROM users WHERE id = ?',
            [userId], (err, results) => {
                if (err) {
                    return res.status(500).json ({ mesage: 'Error fetching user data'});
                }
                    const user = results[0];
                    res.json(user);
            });
        } catch (error) {
            res.status(401).json({message:'Unauthorized access'});
        }
});

//start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});