const express = require('express')
const router = express.Router()
const { JoiContactSchema } = require('../../models/contact')
const { validation } = require('../../middleware')
const { contacts: ctrl } = require('../../controllers')

const validationMiddleware = validation(JoiContactSchema)

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validationMiddleware, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
