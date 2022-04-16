import axios from 'axios';
import express from 'express';
import { checkSession } from '../includes/auth.js';

const router = express.Router();

/* GET check */
router.get('/check', checkSession, function(req, res, next) {
  if (req.session && req.session.cookie) {
    //console.log('session cookie lasts: ' + req.session.cookie.maxAge);
    res.render('check', { title: '123arol Device Check' });
  } else {
    res.redirect('/');
  }
});

/* POST check */
router.post('/check', checkSession, function(req, res, next) {
  const deveui = req.body.deveui || null;

  const url = 'https://ns.eu.everynet.io/api/v1.0/devices';
  const token = process.env.AUTH_TOKEN;
  axios.defaults.headers.common['Authorization'] = token;

  try {
    axios.get(url + '/' + deveui + '?access_token=' + token)
    .catch(function (error) {
      // do nothing
      //console.log(error.message);
    })
    .then(function (response) {
      let device = null;
      let lastJoin = null;
      let lastActivity = null;
      if (response && response.status === 200) {
        device = response.data.device;
        let date = new Date(Number(device.last_join) * 1000);
        lastJoin = date.toString();

        date = new Date(Number(device.last_activity) * 1000);
        lastActivity = date.toString();

        res.render('result', {
          title: '123arol Result',
          deveui: deveui,
          lastJoin: lastJoin,
          lastActivity: lastActivity,
          result: JSON.stringify(device)
        });
      } else {
        res.render('check', { title: '123arol Device Check' });
      }
    });
  } catch (error) {
    console.log('axios error:', error);
    res.render('result', {
      title: '123arol Result',
      deveui: deveui,
      result: error
    });
  }
});

export default router;
