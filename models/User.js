let mongoose = require("mongoose");

const { Schema } = mongoose;

const user = new Schema({
  username :{type : String , unique: true} ,
  phone : Number; 
  email :{type: Number, unique:true, required: true},
  password : { type: Number, unique:true, required: true}
});
module.exports = mongoose.model("user", user);
