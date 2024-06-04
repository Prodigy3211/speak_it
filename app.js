const exp = require('constants');
const express =require('express');
const { read } = require('fs');
const app = express();
const path = require('path');
const { Client } =  require('pg');
const { traceDeprecation } = require('process');
const client = new Client({user:'postgres', host:'localhost', database:'speak_it_DB', password:'postgres', port:'5432'});

//Serve static files to public dir

app.use(express.static(path.join(__dirname,'public')));

//define routes to send to the server

//Home Page Route connection.
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Category Thread Page connection
app.get('/pmw', async (req,res) => {
    res.sendFile(path.join(__dirname,'public','category','pmw','pmw.html'));
});

//test rout page taco! Connected to Database.
app.get('/taco', async (req, res) => {
    const tacos = await client.query("SELECT * FROM tacos");
    res.send(tacos.rows);
   

});

//The Profile Page route
app.post('/submit-form', async(req,res) =>{
    const {username,email,password} = req.body;

    try{
        const query = 'INSERT INTO users (username ,email, password) VALUES ($1, $2, $3)';
        const values = [username, email, password];
        
        await client.query(query, values);

        res.send('User Registered Successfully!');   
    } catch(error){
        console.error(error);
        res.status(500).send('Error Registering User');
    }

});

app.get('/my-profile', async(req, res) => {
    const myProfile = await client.query("SELECT user91 FROM users");
    res.send (users.rows);
})

// Start the server



client.connect() .then(() => { 
    console.log('Connected to PostgreSQL database!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {console.error('Error connecting to the database:', err);});



