const joi = require('@hapi/joi');

const { movieIdSchema } = require('./movies');
const { userIdSchema } = require('./users');

// schema de las peliculas de usuario

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

// creamos el schema de una pelicula de usuario

const createUserMovieShema = {
  userId: userIdSchema,
  movieId: movieIdSchema
}

module.exports = {
  userMovieIdSchema,
  createUserMovieShema
};