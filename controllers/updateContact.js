const { Contact } = require('../models')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body)

    if (!updateContact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ updateContact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
