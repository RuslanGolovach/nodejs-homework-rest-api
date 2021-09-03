const contactsOperations = require('../models')

const listContacts = async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()

    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
