const express = require('express'),
      router = express.Router(),
      TaskController = require('../controllers/taskController.js'),
      Middleware = require('../middlewares/index.js');

router.use(Middleware.authentication)

router.post('/', TaskController.create);
router.get('/', TaskController.read);
router.get('/:id', Middleware.authorization, TaskController.readOne);
router.get('/project/:id', Middleware.authorizationProjectMember, TaskController.readOne);
router.put('/:id', Middleware.authorization, TaskController.update);
router.put('/project/:id', Middleware.authorizationProjectMember, TaskController.update);
router.patch('/:id', Middleware.authorization, TaskController.changeStatus);
router.patch('/project/:id', Middleware.authorizationProjectMember, TaskController.changeStatus);
router.delete('/:id', Middleware.authorization, TaskController.delete);


module.exports = router;