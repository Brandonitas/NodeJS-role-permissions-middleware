const { check, validationResult } = require('express-validator');

exports.store = [
    // Revisa que el nombre no sea vacío
    check('name').notEmpty(),
    // Revisa que el correo sea un mail
    check('email').isEmail(),
    // Revisa que el password este definido
    check('password').notEmpty(),
    // Revisa que el password sea el mismo
    check('password').custom((value, {req, loc, path}) => {
      if (value !== req.body.confirm_password) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    })
  ];