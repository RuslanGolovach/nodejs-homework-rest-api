const contactsOperations = require('../model')

const listContacts = async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()

    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
