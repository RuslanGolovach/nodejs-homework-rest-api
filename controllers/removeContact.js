const { Contact } = require('../models')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const deleteContact = await Contact.findByIdAndDelete(contactId)

    if (!deleteContact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
