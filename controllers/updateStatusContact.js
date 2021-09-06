const { Contact } = require('../models')

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body

    if (favorite === undefined) {
      return res.status(400).json({
        message: 'missing field favorite',
      })
    }

    const newUpdateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    )

    if (!newUpdateContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.status(200).json({
      newUpdateContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact
