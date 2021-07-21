const router = require('express').Router();
const apiRoutes = require('./api/api');
const views = require('./views');

router.use('/api', apiRoutes);
router.use('/', views);

module.exports = router;
