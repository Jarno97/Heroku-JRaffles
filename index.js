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


const entrySchema = new mongoose.Schema({
    username: {
        type: "string",
        required: [true, "Your submission must have a username"],
    },
    entrydata: {
        type: "string",
    },
    proxy: {
        type: "string",
        default: "unknown",
    }
});

const Entry = mongoose.model("Entry", entrySchema);

app.use(bodyParser.json());


app.get('/version', (req, res) => {
    // Here you can implement logic to check for the latest version of your application
    // For example, you could read the latest version from a JSON file or from a database
    const latestVersion = '1.0.1';
    res.send(latestVersion);
    // Check if the latest version is different from the current version

});

app.get('/entries/xJ4doru9Dkfwda9', (req, res) => {
    var Entries = Entry.find({})
    res.send(Entries);
})

app.post('/success', (req, res) => {
    console.log(req.body)
    var data = req.body
    try {
        Entry.create(data);
        res.status(200).send('Data saved successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }

})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));