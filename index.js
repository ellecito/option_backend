const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    search = require('youtube-search'),
    cors = require('cors');

require('dotenv').config();

const opts = {
    maxResults: 10,
    type: 'video',
    key: process.env.YOUTUBE_API_KEY
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

const router = express.Router();

router.get('/', function (req, res) {
    res.send("Hello World!");
});

router.get('/list/:v', (req, res) => {
    search(req.params.v, opts, function (err, results) {
        if (err) return console.log(err);

        // console.dir(results);
        res.send(results);
    });
});

app.use(router);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
} else {
    port = 3000;
}

app.listen(port, function () {
    console.log("Node server running on http://localhost:" + port);
});