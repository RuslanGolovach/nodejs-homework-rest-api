const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  const selectContact = contacts.find(
    contact => contact.id === Number(contactId),
  )

  if (!selectContact) {
    return null
  }

  return selectContact
}

const removeContact = async contactId => {
  const contacts = await listContacts()
  const contactIdx = contacts.findIndex(
    contact => contact.id === Number(contactId),
  )

  if (contactIdx === -1) {
    return null
  }

  const removedContact = await contacts.splice(contactIdx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return removedContact
}

const addContact = async body => {
  const contacts = await listContacts()

  const validId = id =>
    contacts.some(contact => contact.id === id) ? validId(id + 1) : id

  const newContact = {
    id: validId(contacts.length),
    ...body,
  }

  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contactIdx = await contacts.findIndex(
    contact => contact.id === Number(contactId),
  )

  if (contactIdx === -1) {
    return null
  }

  contacts[contactIdx] = { ...contacts[contactIdx], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[contactIdx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
