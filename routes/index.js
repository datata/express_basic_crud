const router = require('express').Router();
const tasks = require('./task');

router.use('/api', tasks);

module.exports = router;