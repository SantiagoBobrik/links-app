const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    premium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

//Antes de guardar encripta la password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);
  }
  next();
});

module.exports = model("User", userSchema);
