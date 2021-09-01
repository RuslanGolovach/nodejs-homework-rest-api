const express = require('express')
const router = express.Router()

const contactsOperations = require('../../model/index')
const { contactSchema } = require('../../validation')

router.get('/', async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({ contacts })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params

    const contacts = await contactsOperations.getContactById(contactId)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json({ contacts })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ message: 'missing required name field' })
    }

    const contacts = await contactsOperations.addContact(req.body)

    res.status(201).json({ contacts })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params

    const contacts = await contactsOperations.removeContact(contactId)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
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
})

module.exports = router
