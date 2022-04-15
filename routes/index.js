import express from 'express';

const router = express.Router();

/* GET home */
router.get('/', function(req, res, next) {
  res.render('index', { title: '123arol' });
});

export default router;
