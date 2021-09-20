const nodemailer = require('nodemailer')
// const { NotFound } = require('http-errors')

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'ruslan.golovach@meta.ua',
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async data => {
  try {
    const email = { ...data, from: 'ruslan.golovach@meta.ua' }
    await transporter.sendMail(email)
  } catch (error) {
    // throw new NotFound(error.message)
  }
}
module.exports = sendMail
