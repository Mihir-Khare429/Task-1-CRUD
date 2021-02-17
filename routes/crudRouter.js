const router = require('express').Router()
const crudController = require('../controllers/crud');

router.get('/getTestCase',crudController.getTestCase);
router.get('/getAllTestCases',crudController.getAllTestCase);
router.post('/addTestCase',crudController.addTestCase);
router.put('/updateTestCase',crudController.updateTestCase);
router.delete('/deleteTestCase',crudController.deleteTestCase);

module.exports = router