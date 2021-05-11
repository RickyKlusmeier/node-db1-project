const router = require('express').Router()
const Account = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next (err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/',  checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.body)
  .then(account => {
    res.status(201).json(account)
  })
  .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deleted = await Account.deleteById(req.params.id)
    res.status(200).json(deleted)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500 ).json({
    note: 'Something went wrong here',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
