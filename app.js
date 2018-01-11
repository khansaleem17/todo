const express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname+'/dist')));

let ids = [];
let tokens = [];
let data = [];

var loginResponse = () => {
    let _token = new Date().getTime() + "" + new Date().getTime();
    tokens.push(_token);
    return { token: _token };
};

var sampleError = {
    message: "Invalid request"
};

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname+'/dist/index.html'));
});

app.all("*", (req, res, next) => {
    console.log((new Date()).toJSON(), req.method, req.url);
    next();
});


app.get("/todo/:id", (req, res) => {
    let index = ids.indexOf(req.params.id);
    if (index > -1) res.json(data[index]);
    else res.status(404).end();
});

app.get("/todo", (req, res) => {
    res.json(data);
});

app.post("/todo", (req, res) => {
    let response = req.body ? req.body : {};
    response["id"] = req.body.id;
    ids.push(response.id);
    data.push(response);
    res.json(response);
});

app.put("/todo/:id", (req, res) => {
    let index = ids.indexOf(Number(req.params.id));
    if (index > -1) {
        console.log(req.body);
        let _data = req.body ? req.body : {};
        _data["id"] = Number(req.params.id);
        data[index] = _data;
        res.json(_data);
    } else res.status(404).end();
});

app.delete("/todo/:id", (req, res) => {
    let index = ids.indexOf(Number(req.params.id));
    if (index > -1) {
        ids.splice(index, 1);
        data.splice(index, 1);
        res.json({ id: req.params.id });
    } else res.status(404).end();
});

app.listen(8080, function() {
    console.log("App listening on 8080!");
});
