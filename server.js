// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

var app = express();
var PORT = process.env.PORT || 3000;

// ==============================================================================
// MIDDLEWARE CONFIGURATION
// ==============================================================================

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ==============================================================================
// MONGO DB CONNECTION
// ==============================================================================

mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true });

// ================================================================================
// ROUTER
// ================================================================================

// POST route for saving a new gift to the db
app.post("/submit", function(req, res) {

    db.Gift.create(req.body)
      .then(function(dbGift) {
         return db.Family.findOneAndUpdate({}, { $push: { gifts: dbGift._id } }, { new: true });
      })
      .then(function(dbFamily) {
        res.json(dbFamily);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  // Route for getting all books from the db
  app.get("/gifts", function(req, res) {

    db.Gift.find({})
      .then(function(dbGift) {
        res.json(dbGift);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  // Route for getting all family members from the db
app.get("/family", function(req, res) {

    db.Family.find({})
      .then(function(dbFamily) {
        res.json(dbFamily);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  // Route to see what family members with associated gifts
  app.get("/populated", function(req, res) {

    db.Family.find({})
      .populate("gifts")
      .then(function(dbFamily) {
        res.json(dbFamily);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
