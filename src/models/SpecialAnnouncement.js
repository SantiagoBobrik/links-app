const { Schema, model } = require("mongoose");
//
const specialAnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
specialAnnouncementSchema.methods.toJSON = function () {
  const { __v, password, ...specialAnnouncement } = this.toObject();
  return specialAnnouncement;
};

module.exports = model("SpecialAnnouncement", specialAnnouncementSchema);
