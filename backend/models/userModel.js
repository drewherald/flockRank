const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, userName, password) {
  //user validation
  if (!email || !userName || !password) {
    throw Error("All fields must be filled out!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password not strong enough. Please use at least 8 characters, including capital letter, number, and special character (!,@,#,$,%,&,*)."
    );
  }

  const exists = await this.findOne({ email });
  const exists2 = await this.findOne({ userName });

  if (exists) {
    throw Error("Email already in use");
  }

  if (exists2) {
    throw Error("Screen Name already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, userName, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled out!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User with this email does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};


//static update method
userSchema.statics.updateUser = async function (email, password) {
  //user validation

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
  
    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password not strong enough. Please use at least 8 characters, including capital letter, number, and special character (!,@,#,$,%,&,*)."
      );
    }
  
    const exists = await this.findOne({ email: email });
  
    if (!exists) {
      throw Error("Email not associated to account");
    }
  
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  

    return hash
  
  
};


module.exports = mongoose.model("User", userSchema);
