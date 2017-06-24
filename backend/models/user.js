/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  email: String,
  password: String,
  spotify: String
});

module.export = mongoose.model('User', UserSchema);