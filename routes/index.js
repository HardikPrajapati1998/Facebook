var express = require('express');
var router = express.Router();

var UsersModel = require('../schema/User_table');
/* GET home page. */

router.get('/', function(req, res, next) {
  
  res.render('Facebook', { title: 'Express' });
});
router.get('/Facebook3', function(req, res, next) {
  
  res.render('Facebook3', { title: 'Express' });
});
router.post('/signup', function (req, res, next) {
  console.log("hardik");
  console.log(req.body);
  var email = req.body.User_email; 

  console.log(req.body);
  UsersModel.findOne({ "User_email": email }, function (err, db_Users_array) {

    console.log("Find One " + db_Users_array);
    if (db_Users_array) {
  
      res.send("email already exists");
    }
    else{
      const mybodydata = {
   
        User_email: req.body.User_email,
        User_password: req.body.User_password,
        
    
      }
      var data = UsersModel(mybodydata);
    
      data.save(function (err) {
        if (err) {
          console.log("Error in Insert Record" + err);
        } else {
          res.redirect('/Facebook3');
        }
      })
    
    }
  });
  //Create an Array 
  
});
router.post('/loginprosee', function(req, res, next) {

  var var1 = req.body.User_email;
  var var2 =req.body.User_password;
  console.log("I am Variable "+ var1);
  req.session.mysession = var1;
  res.cookie("Email" , var2 , {maxAge : 600000});
  
  console.log("I am Session " + req.session.mysession);
 
  
  var email = req.body.User_email;
  var password = req.body.User_password;

  console.log(req.body);
  UsersModel.findOne({ "User_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.User_email;
      var db_password = db_users_array.User_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.render("admin");
    }
    else if (db_email == email && db_password == password) {
      req.session.userid=db_users_array._id;
      req.session.email = db_email;
      console.log("hardik"+req.session.userid);
      res.redirect('/');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});
router.get('/User_display', function(req, res, next) {
  
UsersModel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      
      res.render('table',{  user_array : data});
    
    }

  });
});
module.exports = router;
