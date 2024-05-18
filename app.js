const exp = require('constants');
const express =require('express');
const { read } = require('fs');
const app = express();
const path = require('path');

//Serve static files to public dir

app.use(express.static(path.join(__dirname,'public')));

//define a route

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});