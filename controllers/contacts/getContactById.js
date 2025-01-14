const { Contact } = require('../../models')

const getContactById = async (req, res) => {
  const { contactId } = req.params

  const contacts = await Contact.findById(contactId)

  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.json({ contacts })
}

module.exports = getContactById
