const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models/user')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tmpPath, originalname } = req.file
  const uploadPath = path.join(avatarsDir, `${_id}`)
  const avatarPath = path.join(uploadPath, originalname)

  try {
    const readFile = await Jimp.read(tmpPath)
    await readFile.resize(250, 250).write(tmpPath)

    await fs.mkdir(uploadPath)
    await fs.rename(tmpPath, avatarPath)
    const avatarURL = `/public/avatars/${_id}/${originalname}`
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tmpPath)
    throw error
  }
}

module.exports = updateAvatar
