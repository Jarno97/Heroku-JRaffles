const express = require('express');
const app = express();
const fs = require('fs');


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

    fs.appendFile('proxy.txt', `${req}\n`, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data');
        } else {
            res.status(200).send('Data saved successfully');
        }
    });
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));