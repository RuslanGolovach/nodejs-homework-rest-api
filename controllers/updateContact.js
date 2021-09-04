const { Contact } = require('../models')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const newUpdateContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      },
    )

    if (!newUpdateContact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ newUpdateContact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
