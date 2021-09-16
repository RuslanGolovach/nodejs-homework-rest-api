const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const { contactsRouter, authRouter } = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

// DB_HOST = mongodb+srv://Ruslan:yn04VOkResDzdqDd@cluster0.cwrhk.mongodb.net/db-contacts?retryWrites=true&w=majority
