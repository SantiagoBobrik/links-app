const { check, validationResult } = require("express-validator");

//TODO agregar validaciones de imagenes

const getErrorsFromChecks = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

const isMongoId = [
  check("_id", "No es un ID válido").isMongoId(),
  getErrorsFromChecks,
];

//USER
const validateUser = [
  check("fullName", "El nombre es obligatorio").not().isEmpty(),
  check("password", "Password es obligatoria").not().isEmpty(),
  check("email", "El correo no es válido").isEmail(),
  check("userName", "El nombre de usuario es obligatorio")
    .not()
    .isEmpty()
    .isLength({ max: 10 }),
  getErrorsFromChecks,
];

const validateLink = [
  check("title", "El titulo es obligatorio").not().isEmpty(),
  check("link", "Link invalido").isURL(),
  check("color", "Color invalido").not().isEmpty().isHexColor(),
  check("userId", "ID de usuario no valido").isMongoId(),
  check("emoji", "El emoji es obligatorio").not().isEmpty().isString(),
  getErrorsFromChecks,
];

const validateSpecialAnnouncement = [
  check("title", "El titulo es obligatorio").not().isEmpty(),
  check("subtitle", "Sub titulo invalido").isString(),
  check("url", "Url invalido").isURL(),
  check("userId", "ID de usuario no valido").isMongoId(),
  getErrorsFromChecks,
];

module.exports = {
  isMongoId,
  validateUser,
  validateLink,
  validateSpecialAnnouncement,
};
