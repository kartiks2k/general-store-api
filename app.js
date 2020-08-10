const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser());

// Use connect method to connect to the server
mongoose.connect("mongodb://localhost:27017/storeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = {
  username : String,
  password : String,
  fullName : String,
  email : String,
  phone : String
};

const shopkeeperSchema = {
  mobile : String,
  password : String,
  email : String,
  fullName : String
};

const itemSchema = {
  title : String,
  description : String,
  price : Number
};

const User = mongoose.model("User", userSchema);
const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);
const Item = mongoose.model("Item",itemSchema);

//User routes
app.post("/user/login", (req, res) => {
  User.findOne({username : req.body.username, password : req.body.password}, function(err, foundUser){
    if(foundUser)
      res.status(200).json({Status:1, Message:"Successful login"});
    else
      res.status(200).json({Status:2, Message:"Invalid Credentials"});
  })
});

app.post("/user/register", (req, res) => {
  User.findOne({username : req.body.username}, function(err, foundUser){
    if(foundUser){
      res.status(200).json({Status:2, Message:"User already exists"});
      console.log(foundUser);}
    else {
    const newUser = new User({
      username : req.body.username,
      password : req.body.password
    });
    newUser.save(function(err) {
      if (!err)
        res.status(200).json({Status:1, Message:"Successfully registered"});
      else
        console.log(err);
    });
  }
});
});


//Shopkeeper routes
app.post("/vendor/login", (req, res) => {
  Shopkeeper.findOne({mobile : req.body.mobile, password : req.body.password}, function(err, foundShopkeeper){
    if(foundShopkeeper)
      res.status(200).json({Status:1, Message:"Successful login"});
    else
      res.status(200).json({Status:2, Message:"Invalid Credentials"});
  })
});

app.post("/vendor/register", (req, res) => {
  Shopkeeper.findOne({mobile : req.body.mobile}, function(err, foundShopkeeper){
    if(foundShopkeeper){
      res.status(200).json({Status:2, Message:"Shopkeeper already exists"})
      console.log(foundShopkeeper);}
    else {
    const newShopkeeper = new Shopkeeper({
      mobile : req.body.mobile,
      password : req.body.password
    });
    newShopkeeper.save(function(err) {
      if (!err)
        res.status(200).json({Status:1, Message:"Successfully registered"});
      else
        console.log(err);
    });
  }
});
});

app.get("/vendor/list", (req, res) => {
  Item.find({},{_id : 0},function(err,foundItems){
    if(!err)
      res.status(200).json({Status:1, items: foundItems});
    else
      res.status(200).json({Status:2, error: err});
  })
})

app.listen("3000",function(){
  console.log("Listening on 3000");
});
