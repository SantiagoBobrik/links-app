const User = require("../models/User");
const Link = require("../models/Link");
const SpecialAnnouncement = require("../models/SpecialAnnouncement");
const Storage = require("../models/Storage");

const get = async (req, res) => {
  const { _id } = req.params;
  const user = await User.findById(_id);
  !user && res.json({});
  return res.json(user);
};

//
const create = async (req, res) => {
  try {
    const storage = new Storage(req.file);

    //Return s3 url

    const avatar = await storage.uploadAvatar();

    const user = new User({ ...req.body, avatar });

    const save = await user.save();

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
    const userUpdated = await User.findByIdAndUpdate(_id, body);
    return res.json(userUpdated);
  } catch (e) {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;

  try {
    await User.findByIdAndDelete(_id);
    res.json({ msg: "deleted" });
  } catch (e) {
    res.sendStatus(400);
  }
};

const getLinks = async (req, res) => {
  const {
    params: { _id },
  } = req;

  try {
    const links = await Link.find({ userId: _id });
    const specialAnnouncements = await SpecialAnnouncement.find({
      userId: _id,
    });
    return res.json({ specialAnnouncements, links });
  } catch (e) {
    return res.sendStatus(400).json(e);
  }
};
const getUserByEmail = async (email) => await User.findOne({ email });

const getProfile = (req, res) => {
  return res.json(req.user);
};

module.exports = {
  get,
  getProfile,
  getUserByEmail,
  create,
  update,
  deleteUser,
  getLinks,
};
