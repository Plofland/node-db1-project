const express = require('express');
const accountFunc = require('./account-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await accountFunc.get()
    res.json(data)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await accountFunc.get()
    res.json(data)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = await accountFunc.create()
    res.json(data)
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const data = await accountFunc.update()
    res.json(data)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await accountFunc.remove()
    res.json(data)
  } catch (error) {
    next(error)
  }
});



router.use((error, req, res, next) => {
  res.status(500).json({ message: error.message, stack: error.stack })
});

module.exports = router;