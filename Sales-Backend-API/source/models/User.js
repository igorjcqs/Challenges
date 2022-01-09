const mongoose = require("../database/index");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });

  if (user) {
    const compared = await bcrypt.compare(password, user.password);
    if (compared) {
      return user;
    }
    throw Error("Email or password is incorrect.");
  }
  throw Error("Email or password is incorrect.");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
