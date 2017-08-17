var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;
var Itinerary = require("../models").Itinerary;

router.get("/itineraries/:itinerary_id", function(req, res, next){

  Itinerary.findOne({
    where:{
      id: req.params.itinerary_id
    },
    include: [{ all: true, nested: true }]
  })
  .then(function(result){
    console.log(result)
    res.json(result)
  })
})

var hash;

router.post("/itineraries", function(req, res, next){
  //console.log('###############', req.body)
  Itinerary.create({})
  .then(function(itinerary){
    //console.log('%%%%%%%%%%%%%%%%', req.body)
    itinerary.addHotel(req.body.hotels);
    itinerary.addRestaurant(req.body.restaurants);
    itinerary.addActivity(req.body.activities)
    //console.log('itinerary', itinerary)
    return itinerary.id;
  }).then(function(id){
    console.log('id', id)
    res.json({id})
  })
})

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});





module.exports = router;
