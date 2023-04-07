const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(result => {
      res.render("celebrities/celebrities", {celebrities: result})
    })
    .catch((err) => console.log(err))      
})

router.post("/create", (req, res, next) => {
  const celeb = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }  
  Celebrity.create(celeb)
    .then(result => {
      res.redirect("/celebrities")
    })
    .catch(err => res.render("celebrities/new-celebrity"))
})

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
  .then(result => {
    res.render("celebrities/celebrities-detail", {celebrity: result})
  })
})

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
  .then(result => {
    res.render("celebrities/edit-celebrity", {celebrity: result})
  })
  .catch(err => console.log(err))
})

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
  .then(result => {
    res.redirect("/celebrities")
  })
  .catch(err => console.log(err))
})

router.post("/:id/delete", (req, res, next) => {
  const { identificador } = req.body;
  Celebrity.findByIdAndRemove(identificador)
  .then(() => {
    res.redirect("/celebrities")
  })
})

module.exports = router;