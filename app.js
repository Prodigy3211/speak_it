const exp = require('constants');
require('dotenv').config();
const express =require('express');
const { read } = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { Client } =  require('pg');
const { traceDeprecation } = require('process');
const https = require('https');

const client = new Client({
    user: process.env.DB_USER, 
    host:process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
 });

//Serve static files to public dir

app.use(express.static(path.join(__dirname,'public')));

// error message when a page does not exist
app.use((req,res) => {
    res.status (404);
    res.send(`<h1>ERROR 404 Page is not here!`);
})

//define routes to send to the server

//Home Page Route connection.
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Category Thread Page connection
app.get('/pmw', async (req,res) => {
    res.sendFile(path.join(__dirname,'public','pmw-home.html'));
});

app.get('/philosophy', async (req,res) => {
    res.sendFile(path.join(__dirname,'public','philosophy-home.html'));
});

app.get('/relationships', async (req,res) => {
    res.sendFile(path.join(__dirname,'public','relationships-home.html'));
});

app.get('/war', async (req,res) => {
    res.sendFile(path.join(__dirname,'public','war-home.html'));
});

app.get('/politics', async (req,res) => {
    res.sendFile(path.join(__dirname, 'public','politics-home.html'))
});

//test rout page taco! Connected to Database.
app.get('/taco', async (req, res) => {
    const tacos = await client.query("SELECT * FROM tacos");
    res.send(tacos.rows);
   

});

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//The Profile Page route
app.post('/signup', async(req,res) =>{
    const {username,email,password,firstname,lastname} = req.body;

    try{
        const query = 'INSERT INTO users (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5)';
        const values = [username, email, password, firstname, lastname];
        
        await client.query(query, values);

        res.send('User Registered Successfully!');   
    } catch(error){
        console.error('Error',error);
        res.status(500).send('Error Registering User');
    }

});

// app.get('/my-profile', async(req, res) => {
//     const myProfile = await client.query('SELECT username, firstname, lastname FROM users WHERE id = $4', [username],)
//        if (err){
//         console.error(err);
//         res.status(500).send('Error retrieving user profile');
//        } else {
//         const user = result.rows[0];
//        }
    
//     res.send (`
//         <h1>User Profile</h1>
//         <p>Userame: ${user.username}</p>
//         <p>First Name: ${user.firstname}</P>
//         <p>Last Name: ${user.lastname}</p>
//         <a href="/comments">Go to Comments</a>
//             `);
        
//     });

// Start the server



client.connect() .then(() => { 
    console.log('Connected to PostgreSQL database!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {console.error('Error connecting to the database:', err);});



