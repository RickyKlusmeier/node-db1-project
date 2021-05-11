const yup = require('yup')
const Accounts = require('./accounts-model')

const accountSchema = yup.object({
  name: yup.string(`name of account must be a string`)
    .trim()
    .min(3, `name of account must be between 3 and 100`)
    .max(100, `name of account must be between 3 and 100`)
    .required(`name and budget are required`),
  budget: yup.integer(`budget of account must be a number`)
    .trim()
    .positive(`budget of account is too large or too small`)
    .max(1000000, `budget of account is too large or too small`)
    .required(`name and budget are required`)
})

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
   try {
    const valid = await accountSchema.validate(req.body {
      stripUnknown: true;
    })
    req.body = valid
    next()
  } catch(err) {
    next({
      status: 400,
      message: err.message
    })
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const acct = await db.getAll()
    acct.filter(account => {
      if (acct.name == req.body.name.trim) {
        res.status(400).json({
          message: 'That name is already taken'
        })
      } else {
        return acct
      }
    })
  } catch (err) {
    next({
      message: err.message
    })
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const acctID = await Accounts.getById(req.params.id)
    if (!acctID) {
      next({
        status: 404,
        message: 'No account found'
      })
    } else {
      req.acctID = acctID
      next()
    }
  } catch (err) {
    next(err)
  }
}
