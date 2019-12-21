var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Schema to create gift assiciation with each family member
var FamilySchema = new Schema({
    name: {
    type: String,
    unique: true
  },
   gifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gift"
    }
  ]
});

var Family = mongoose.model("Family", FamilySchema);

module.exports = Family;
