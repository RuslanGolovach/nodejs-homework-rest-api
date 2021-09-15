const multer = require('multer')

const path = require('path')

const tmpDir = path.join(__dirname, '../', 'tmp')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1024,
  },
})

const uploadAvatar = multer({
  storage: multerConfig,
})

module.exports = uploadAvatar