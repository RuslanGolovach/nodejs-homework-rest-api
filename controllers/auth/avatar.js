const { User } = require('../../models/user')

const avatar = async (req, res) => {
  console.log(req.file)
}

module.exports = avatar
