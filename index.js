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
    module: {
        type: "string",
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

app.get('/entries/xJ4doru9Dkfwda9/:username', async (req, res) => {
    let username = req.params.username;
    try {
        const documents = await Entry.find({ username: username }); // Retrieve all documents from the collection
        res.status(200).json(documents); // Return the documents as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving documents');
    }
})
app.get('/entries/xJ4doru9Dkfwda9', async (req, res) => {

    try {
        const documents = await Entry.find(); // Retrieve all documents from the collection
        res.status(200).json(documents); // Return the documents as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving documents');
    }
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

app.post('/beta', (req, res) => {
    let beta = [
        'JRAF-6S5I-GZJL-BW0K-0BAD',
        'JRAF-7LYY-EZ3E-KUBG-UTC7',
        '52DK-1RQB-SEZB-KLVI',
        'JRAF-9JOB-ZWSE-XZU4-A1FL',
        'JRAF-9ELY-JMPP-4JDT-JEWR',
        'JRAF-O160-LJ55-GWRW-KT13',
        'DXNX-Z4I5-TAEI-0SKZ'

    ]
    console.log(req.body)
    var data = req.body
    try {
        for (bet of beta) {
            if (bet == data.key) {
                res.status(200).send('Beta Access Granted!');
                break;
            }
        }
        throw new Error('No Beta Access')

    } catch (err) {
        res.status(500).send(err.message);
    }

})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));