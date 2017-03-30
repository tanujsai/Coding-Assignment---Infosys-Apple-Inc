var express = require('express');
var gulp = require('gulp');
var public = express();
var fs = require('fs');

var bodyParser = require("body-parser");
public.use(bodyParser.urlencoded({ extended: true }));
public.use(bodyParser.json());
public.use('/', express.static('public'));

public.post('/addNewUser', function(request, response) {

    console.log(request.body);
    //Getting File from local disk and Modifing it 
    var userObj = {
        "userName": request.body.userName,
        "firstName": request.body.firstName,
        "lastName": request.body.lastName,
        "birthday": request.body.dob,
        "status": "Busy",
        "email": request.body.userName,
        "lastSignInDate": "3/3/2017" //I'm hard coding the date value 
        // There is no Login Functional Page 
    };

    console.log("***",userObj);

    fs.readFile(__dirname + "/public/data1.json", 'utf-8', function(err, data) {
        console.log('**************file data***************\n' + data);
        console.log('**************file Error data***************\n' + err);
        var fileJsonData = JSON.parse(data);
        fileJsonData.buddies.push(userObj);
        var stringFile = JSON.stringify(fileJsonData);
        console.log(stringFile);
        fs.writeFile(__dirname + "/public/data1.json", stringFile);

    });

    response.send("500");

});


gulp.task('express', function() {
    var server = public.listen(3003, function() {
        console.log("Server started at 3003");
    });
});

gulp.task('default', ['express']);
