const exp = require('constants');
const express =require('express');
const { read } = require('fs');
const app = express();
const path = require('path');
const { Client } =  require('pg');
const client = new Client({user:'postgres', host:'localhost', database:'speak_it_DB', password:'postgres', port:'5432'});

//Serve static files to public dir

app.use(express.static(path.join(__dirname,'public')));

//define routes to send to the server

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/taco', async (req, res) => {
    const tacos = await client.query("SELECT * FROM tacos");
    res.send(tacos.rows);
   

});

// Start the server



client.connect() .then(() => { 
    console.log('Connected to PostgreSQL database!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {console.error('Error connecting to the database:', err);});



