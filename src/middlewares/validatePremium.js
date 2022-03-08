const premiumController = require("../controllers/premiumController");
module.exports = async (req, res, next) => {
  //
  const isPremium = await premiumController.validatePremiumUser(req.user._id);

  if (!isPremium)
    return res.status(400).json({ msg: "El usuario no posee cuenta premium" });

  next();
};
