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


module.exports = router;