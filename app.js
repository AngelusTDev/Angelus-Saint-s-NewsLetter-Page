// jshint esversion:6

// Requiring modules
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// 2 Set the app to use express
const app = express();

// 2 Set the app to use express
app.use(express.static("public"));

// 3 Set the app to use body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Get Route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Post Route
app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.emailAddy;

  // Gettting my data sent to the API server inside a Javascript object
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  // Turning my data in to a plate pack object
  var jsonData = JSON.stringify(data);

  // Creating my options and posting my data
  var options = {
    // List URL
    url: "http://listurl.com",
    method: "POST",
    // Authentication
    headers: {
      // Using a username and API Key.
    },
    body: jsonData
  };

  // My API server request
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

//failure Try again button function.
app.post("/failure", function(req, res) {
  res.redirect("/");
});

// Set server to listen on any port for haroku and port 3000 local
app.listen(process.env.PORT || 3000, function() {
  console.log("The Server is now running on port: 3000");
});
