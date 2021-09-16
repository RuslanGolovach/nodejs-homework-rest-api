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
  '/avatars',
  controllerWrapper(authenticate),
  uploadAvatar.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
)

module.exports = router
