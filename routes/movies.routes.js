const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/create", (req, res, next) => {
    Celebrity.find()
        .then(result => { 
        res.render("movies/new-movie", {celebrities: result})
        })
        .catch((err) => console.log(err))
})

router.get("/", (req, res, next) => {
    Movie.find()
      .then(result => {
        res.render("movies/movies", {movies: result})
      })
      .catch((err) => console.log(err))      
})

router.post("/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
        .then(result => {
            res.redirect("/movie");
        })
        .catch(err => console.log(err))
})

router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then(result => {
            res.render("movies/movie-details", {movie: result});
        })
        .catch((err) => console.log(err));
})

router.post("/:id/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.body.identificador)
    .then(result => {
        res.redirect("/movie");
    })
    .catch(err => console.log(err));
})

router.get("/:id/edit", (req, res, next) => {
    console.log(req.params.id)
    Movie.findById(req.params.id)
    .populate("cast")
        .then(result => {
            res.render("movies/edit-movie", {movie: result});
        })
})

router.post("/:id/edit", (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    const {id} = req.params;
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(result => {
        res.redirect("/movie")
    })
    .catch(err => console.log(err))
})

module.exports = router;