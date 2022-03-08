const Link = require("../models/Link");

const get = async (req, res) => {
  const {
    params: { _id },
  } = req;
  const link = await Link.findById(_id);
  if (!link) return res.json({});
  return res.json(link);
};
const create = async (req, res) => {
  const {
    body,
    params: { _id },
  } = req;

  try {
    const link = new Link(body);
    const linkEdited = await link.save();
    res.json(linkEdited);
  } catch (e) {
    res.status(400).json(e);
  }
};

//
const update = async (req, res) => {
  const {
    body,
    params: { _id },
  } = req;

  try {
    const linkUpdated = await Link.findByIdAndUpdate(_id, body);
    return res.json(linkUpdated);
  } catch (e) {
    res.sendStatus(400).json(e);
  }
};

const deleteLink = async (req, res) => {
  const { _id } = req.params;

  const linkToDelete = await Link.findOne({ _id });

  if (!linkToDelete) return res.sendStatus(400);

  try {
    await Link.findByIdAndDelete(_id);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(400).json(e);
  }
};

module.exports = { create, update, deleteLink, get };
