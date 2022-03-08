const { Schema, model } = require("mongoose");

const linkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    emoji: {
      type: String,
    },
  },
  { timestamps: true }
);

linkSchema.methods.toJSON = function () {
  const { __v, ...link } = this.toObject();
  return link;
};

module.exports = model("Link", linkSchema);
