'use strict';

const express = require('express');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
var Cobol = require("cobol");
var eBamsProgram = __dirname + "/ebams.cbl";
var returnValue;

app.get('/', (req, res) => {
    res.send("Make a GET request to attendee/<name>");
});

app.get('/attendee/:attendeeId', (req, res) => {
    Cobol(eBamsProgram, {
        args: ["get", req.params.attendeeId],
        free: true,
    }, function (err, data) {
        returnValue = data;
        console.log(err || data);
    });
    res.send(returnValue);
});

app.post('/attendee', (req, res) => {
    Cobol(eBamsProgram, {
        args: ["post", req.query.name, req.query.email],
        free: true,
    }, function (err, data) {
        returnValue = data;
        console.log(err || data);
    });
    res.json(returnValue);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
