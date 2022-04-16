import axios from 'axios';
import express from 'express';
import bcrypt from 'bcrypt';
import '../includes/auth.js';

const router = express.Router();

// allowed users
/* GET login */
router.get('/login', function(req, res, next) {
  if (req.session && req.session.cookie) {
    //console.log('session cookie lasts: ' + req.session.cookie.maxAge);
    res.render('login', { title: '123arol Login' });
  } else {
    res.redirect('/');
  }
});

/* POST login */
router.post('/login', function(req, res, next) {

  let allowed = {
    username: process.env.ALLOWED_USER,
    password_hash: process.env.PASSWORD_HASH
  };

  if (req.body.username && req.body.password) {
    if (allowed.username === req.body.username) {
      bcrypt.compare(req.body.password, allowed.password_hash).then(
        function(result) {
          if (result) {
            // set user into session
            req.session.user = req.body.username;

            res.redirect('/check');
          } else {
            res.redirect('/login');
          }
        }
      );
    }
  } else {
    res.redirect('/login');
  }
});

export default router;
