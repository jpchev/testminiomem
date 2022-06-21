const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const https = require('https')

const multer = require('multer')
const storage = require('./minioStorage.js')()
const upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'))

// url pour faire l'upload d'un fichier dans un bucket
app.post('/upload/:bucket', upload.single("file"), async (req, res, next) => {
    res.json({ 'success': true, 'message': 'upload ok' })
})

app.listen(8080)
