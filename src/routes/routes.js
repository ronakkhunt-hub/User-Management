const express = require('express')
const router = express.Router();
const validation = require('../utils/validation')
const newsController = require('../controllers/controller')

router.post('/createNews', validation, newsController.createNews)

module.exports = router