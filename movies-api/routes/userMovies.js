const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

// importamos los schemas para generar la validation
const { movieIdSchema } = require('../utils/schemas/movies'); // eslint-disable-line
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieShema } = require('../utils/schemas/userMovies'); // eslint-disable-line

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies/', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        res.status(200).json({
          data: userMovies,
          message: 'use movies listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userMoviesApi;