const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var dbConnector = require("./dbconnector");

dbConnector.connectToDB(() => {
  app.listen("8000", () => {
    console.log("PORT is running on 8000");
  })
})

var secret = "841235432344ADRA";
let crypto = require('crypto-js');

var decrypter = require("./decrypt");
app.get("/api/welcome", (req, res) => {
  if (req.query.username == "Sruthi" && req.query.password == "sruthi1234") {
    var json = { "name": "Sruthi", "mobile": "777777777" };
    res.json({ "status": true, "message": "Login Successful", result: json });
  }
  else {
    res.send("Invalid Credentials");
  }
})

var users = [];

var id = 0;

app.post("/api/user", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var mob = req.body.mob_no;
  var password = req.body.password;

  // if (users.length > 0) {
  //   for (var user of users) {
  //     if (user.email == email) {
  //       res.json({ status: false, message: "Email already exists" });
  //       return;
  //     }
  //   }
  // }

  // var newUser = {
  //   "id": id,
  //   "name": name,
  //   "email": email,
  //   "mob": mob,
  //   "password": password,
  // }
  // id++
  // users.push(newUser);

  var query = "INSERT INTO SUNIDHI_CORE_V2_0.TbUser(Name, EmailId, Password) VALUES ('" + name + "','" + email + "','" + password + "')";

  dbConnector.perfromDBOperation(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: false, message: "User not added successfully" })
    } else {
      console.log(result);
      res.json({ status: true, message: "User added successfully" })
    }
  })
})

app.get("/api/user", (req, res) => {
  var name = req.query.name;
  if (name != undefined && name != null && name != "") {
    for (var user of users) {
      if (user.name == req.query.name) {
        res.json({ status: true, message: "user detail found", result: user });
        return;
      }
    }
    res.json({ status: false, message: "There is no any such user" });
  } 
  else {
    res.json({ status: true, message: "User details", result: users });
  }
})


app.put("/api/user", (req, res) => {
  var id = parseInt(req.body.id)
  var email = req.body.email
  var name = req.body.name
  var password = req.body.password
  var mob = req.body.mob_no

  for (var user of users) {
    if (user.id == id) {
      var updatedUser = {
        id: id,
        "email": email,
        "name": name,
        "password": password,
        "mob": mob
      }

      users.pop(user);
      users.push(updatedUser);
      res.json({ status: true, message: "user data updated" });
      return
    }
  }

  res.json({ status: false, message: "invalid user id" });
})


app.post("/login", decrypter.decryptBody, (req, res) => {
  console.log("body", req.body);
  res.json({ status: true, message: "decryptor API called" });
})