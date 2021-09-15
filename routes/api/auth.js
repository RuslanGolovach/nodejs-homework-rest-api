const express = require('express')
const { userJoiSchema } = require('../../models/user')

const {
  validation,
  controllerWrapper,
  authenticate,
  uploadAvatar,
} = require('../../middleware')

const { auth: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(userJoiSchema)

router.post(
  '/signup',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
)

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))

router.get(
  '/logout',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout),
)

router.get(
  '/current',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.current),
)

router.patch(
  '/:contactId',
  uploadAvatar.single('avatar'),
  controllerWrapper(ctrl.avatar),
)

module.exports = router
