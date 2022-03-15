var express = require("express");
const Joi = require("joi");
const movie = require("../controllers/movie");
const user = require("../controllers/user");

var router = express.Router();
var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

const schemaUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  role: Joi.string().min(3).max(30).required(),
});


const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

//Login User
router.get("/movies", middleware.checkToken_admin, function (req, res, next) {
  movie.getMovies().then((movies) => {
    console.log("Movies", movies);
    res.send(movies);
  });
});

router.get("/movies/:id", middleware.checkToken, function (req, res, next) {
  movie.getMovie(req.params.id).then((movie) => {
    console.log("Movies", movie);
    if (movie === null) {
      res.status(404).send("La película con el id no existe");
    }
    res.send(movie);
  });
});

//Login User
router.post("/movies", middleware.checkToken_admin, function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  movie.createMovie(req.body).then((movie) => {
    console.log("Movies", movie);
    res.send(movie);
  });
});

router.put("/movies/:id", middleware.checkToken, function (req, res, next) {
  movie.updateMovie(req.params.id, req.body).then((movie) => {
    console.log("movie", movie);
    if (movie.matchedCount === 0) {
      return res.status(404).send("La película con el id no existe");
    }
    res.send(movie);
  });
});

//Login User
router.delete("/movies/:id", middleware.checkToken_admin, function (req, res, next) {
  movie.deleteMovie(req.params.id).then((movie) => {
    console.log("movie", movie);
    if (movie.deletedCount === 0) {
      return res.status(404).send("La película con el id no existe");
    }
    res.sendStatus(204);
  });
});

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

router.post( '/login', HandlerGenerator.login);

router.post("/usuario", function (req, res, next) {
  const { error } = schemaUsuario.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }
  usuario.createUsuario(req.body).then((usuario) => {
    console.log("Usuario", usuario);
    res.send(usuario);
  });
});

router.get("/usuarios", function (req, res, next) {
  usuario.getUsuarios().then((usuarios) => {
    console.log("Usuarios", usuarios);
    res.send(usuarios);
  });
});

module.exports = router;
