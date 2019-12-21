var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GiftSchema = new Schema({
  giver: String,
  giftName: String,
  comments: String,
  year: Number
});

var Gift = mongoose.model("Gift", GiftSchema);

module.exports = Gift;
