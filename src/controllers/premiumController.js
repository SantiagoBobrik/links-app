const User = require("../models/User");
const Link = require("../models/Link");

const { MAX_LINKS_FREE } = process.env;

const validatePremiumUser = async (userId) => {
  const user = await User.findById(userId);

  const isPremium = user.premium;

  if (!isPremium) {
    const countLinks = await Link.count({ userId });

    if (countLinks >= MAX_LINKS_FREE) return false;
  }

  return true;
};

module.exports = { validatePremiumUser };
