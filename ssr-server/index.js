const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const session = require("express-session");
const { config } = require("./config/index");
const helmet = require('helmet');

const app = express();

// middlewares
app.use(express.json()); // body parser
app.use(cookieParser()); // cookie-parser
app.use(session({ secret: config.sessionSecret }));
// para que inicialice la session
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

// Basic Strategy
require("./utils/auth/strategies/basic");

// OAuth2 Strategy
require("./utils/auth/strategies/oauth");

// Twitter Strategy
require("./utils/auth/strategies/twitter");

// Facebook Strategy
require('./utils/auth/strategies/facebook');

app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", async function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized("Error la data viene vacía :("));
      }

      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function(req, res, next) {
  const { body: user } = req;
  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    });

    res.status(201).json({
      message: "User Created"
    });
  } catch (error) {
    next(error);
  }
});

app.get("/movies", async function(req, res, next) {});

app.post("/user-movies", async function(req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;

    // cuando hacemos sign-in generamos un JWT que lo guardamos en una cookie,
    // apartir de ahí los req que hagamos en las peliculas de usuarios, entonces
    // van ha tener la cookie en el req. Es por eso que podemos sacar de las cookies el token
    // para llamar a nuestra API

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: userMovie
    });

    if (status !== 201) {
      return next(boom.badImplementation());
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    // cuando hacemos sign-in generamos un JWT que lo guardamos en una cookie,
    // apartir de ahí los req que hagamos en las peliculas de usuarios, entonces
    // van ha tener la cookie en el req. Es por eso que podemos sacar de las cookies el token
    // para llamar a nuestra API

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE"
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.get(
  "/auth/google-oauth",
  passport.authenticate("google-oauth", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google-oauth/callback",
  passport.authenticate("google-oauth", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
