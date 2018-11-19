import mongoose from 'mongoose';
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password : { 
        data: Buffer, 
        contentType: String 
    },

    /*
        the salt is a set of charachters unique to each user 
        the combination of salt with password provided by the user generate the hash 
        making a one-way encryption
    */

    hash: String,
    salt: String
});

//to set the user password for the first time
User.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//to check if the password is valid in future logins 
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
  

// generate a json web token 
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); 

    // add env file and variables 
  };
  