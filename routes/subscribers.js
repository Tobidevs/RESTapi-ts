const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res, next) => {
  try {
    const subscriber = await Subscriber.find()
    res.json(subscriber)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})
// Getting one
router.get('/:id', getSubscriber, (req, res, next) => {
  res.send(res.subscriber.name)
})
// Creating one
router.post('/', async (req, res, next) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})
// Updating one
router.patch('/:id', getSubscriber, (req, res, next) => {

})
// Deleting one
router.delete('/:id', getSubscriber, (req, res, next) => {

})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'cannot find subscriber'})
    }
  } catch(err) {
    return res.status(500).json({ message: err.message})
  }
  res.subscriber = subscriber
  next()
}

module.exports = router
