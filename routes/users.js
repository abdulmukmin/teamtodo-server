const 	express = require('express'),
        router = express.Router(),
        UserController = require('../controllers/userController.js');

router.post('/login', UserController.login);
router.post('/', UserController.create);

module.exports = router;
