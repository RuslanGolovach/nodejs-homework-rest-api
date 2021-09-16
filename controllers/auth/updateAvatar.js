const { User } = require('../../models/user')

const fs = require('fs/promises')
const path = require('path')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  console.log(req.user)
  const { _id } = req.user
  const { path: tmpPath, originalname } = req.file
  const uploadPath = path.join(avatarsDir, `${_id}`)
  const avatarPath = path.join(uploadPath, originalname)

  try {
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
