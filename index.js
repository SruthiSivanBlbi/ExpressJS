const express = require('express');
const app = express();

app.listen("8000", () => {
    console.log("PORT is running on 8000");
})

app.get("/api/welcome", (req, res) => {
    if(req.query.username== "Sruthi" && req.query.password == "sruthi1234"){
        var json ={"name" : "Sruthi", "mobile" : "777777777"}; 
        res.json({"status": true, "message": "Login Succesful", result: json});
    }
    else{
        res.send("Invalid Credentials");
    }
})