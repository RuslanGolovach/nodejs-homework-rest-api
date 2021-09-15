const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
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
}

module.exports = updateStatusContact
