const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://jarno:Gmjgunner1@cluster0.glxxlf3.mongodb.net/JRaffles?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));




app.use(bodyParser.json());


// Define your endpoint that will return the latest version number
app.get('/version', (req, res) => {
    // Here you can implement logic to check for the latest version of your application
    // For example, you could read the latest version from a JSON file or from a database
    const latestVersion = '1.0.1';
    res.send(latestVersion);
    // Check if the latest version is different from the current version

});

app.post('/success', (req, res) => {
    console.log(req.body)
    // var data = JSON.parse(req);



})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));