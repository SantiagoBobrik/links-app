const SpecialAnnouncement = require("../models/SpecialAnnouncement");
const Storage = require("../models/Storage");

const get = async (req, res) => {
  const { _id } = req.params;

  const specialAnnouncement = await SpecialAnnouncement.findById(_id);

  !specialAnnouncement && res.json({});

  return res.json(specialAnnouncement);
};

const create = async (req, res) => {
  try {
    const storage = new Storage(req.file);

    //Return s3 url
    const image = await storage.uploadSpecialAnnouncementImage();

    const specialAnnouncement = new SpecialAnnouncement({
      ...req.body,
      image,
    });

    const save = await specialAnnouncement.save();

    return res.json(save);
  } catch (e) {
    return res.json({ msg: "error", e });
  }
};

//
const update = async (req, res) => {
  const {
    body,
    params: { _id },
  } = req;

  try {
    const specialAnnouncementUpdated =
      await SpecialAnnouncement.findByIdAndUpdate(_id, body);

    return res.json(specialAnnouncementUpdated);
  } catch (e) {
    return res.sendStatus(400);
  }
};

const deleteSpecialAnnouncement = async (req, res) => {
  const { _id } = req.params;

  try {
    await SpecialAnnouncement.findByIdAndDelete(_id);
    return res.json({ msg: "deleted" });
  } catch (e) {
    return res.sendStatus(400);
  }
};

module.exports = {
  get,
  create,
  update,
  deleteSpecialAnnouncement,
};
