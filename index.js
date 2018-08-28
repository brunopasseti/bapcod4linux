//Router
const express = require('express');
//Executing python code
const exec = require('child_process').execSync;
//Auth
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const db = require('./db');

const app = express();
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
let port = 3000;

passport.use(new Strategy(
    function(username, password, cb) {
      db.users.findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));

let cmd = "python3 ./run.py"
app.post('/sendData',function (req, res) {

    let form = req.body;
    let arg = CreateArg(form);
    
    exec(cmd + " " + arg);

    res.redirect('/dl.html')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function CreateArg(formObj){
    let arg = "";
    if(formObj.field1){
        arg+=formObj.field1
    }else arg+="0"
    if(formObj.field2){
        arg+=formObj.field2
    }else arg+="0"
    if(formObj.field3){
        arg+=formObj.field3
    }else arg+="0"
    if(formObj.field4){
        arg+=formObj.field4
    }else arg+="0"
    if(formObj.field5){
        arg+=formObj.field5
    }else arg+="0"
    if(formObj.field6){
        arg+=formObj.field6
    }else arg+="0"
    if(formObj.field7){
        arg+=formObj.field7
    }else arg+="0"
    if(formObj.field8){
        arg+=formObj.field8
    }else arg+="0"
    return arg;
}
