const express = require('express');
const accountFunc = require('./account-model');

const router = express.Router();

//MIDDLEWARE
async function checkId(req, res, next) {
  const { id } = req.params;
  const idExists = await accountFunc.getById(id);
  if (idExists) {
    next();
  } else {
    res
      .status(400)
      .json({ message: 'ID does not exist in DB' });
  }
}

function checkPayload(req, res, next) {
  const { name, budget } = req.body;
  if (name && budget) {
    next();
  } else {
    res
      .status(400)
      .json({ message: 'Name and budget are required' });
  }
}

//ENDPOINTS
router.get('/', async (req, res, next) => {
  try {
    const data = await accountFunc.get();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await accountFunc.get(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const accountInfo = req.body;
    const data = await accountFunc.create(accountInfo);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', checkId, checkPayload, async (req, res, next) => {
  try {
    const {id} = req.params
    const changes = req.body
    const data = await accountFunc.update(id, changes);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkId, async (req, res, next) => {
  try {
    const data = await accountFunc.remove();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res
    .status(500)
    .json({ message: error.message, stack: error.stack });
});

module.exports = router;
