const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../services/users');

// para implementar la estrategia hacemos uso de Passport.use
passport.use(new BasicStrategy(async (email, password, cb) => {
  const userService = new UsersService();

  // vamos a verificar si el usurio existe o no
  try {
    const user = await userService.getUser({ email });

    if (!user) {
      return cb(boom.unauthorized(), false);
    }

    if (!await bcrypt.compare(passport, user.password)) {
      return cb(boom.unauthorized(), false);
    }

    // antes de la validación, eliminamos el password del objeto user
    // así nos aseguramos que ahí en adelante en el uso de la aplicación no sea visible
    // el password del usuario
    delete user.password;

    return cb(null, user);

  } catch (err) {
    
    return cb(err);
  }
}));