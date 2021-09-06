const contactsOperations = require('../model')
const { contactSchema } = require('../validation')

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ message: 'missing fields' })
    }

    const { contactId } = req.params

    const contacts = await contactsOperations.updateContact(contactId, req.body)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
