import express from 'express';

const router = express.Router();

/* GET home */
router.get('/', function(req, res, next) {
  if (req.session && req.session.cookie) {
    res.redirect('/check');
  } else {
    res.redirect('/login');
  }
});

export default router;
