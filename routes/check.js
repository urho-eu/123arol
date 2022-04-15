import axios from 'axios';
import express from 'express';

const router = express.Router();

/* GET check */
router.get('/check', function(req, res, next) {
  console.log('GET request: ', req);
  res.redirect('/');
});

/* POST check */
router.post('/check', function(req, res, next) {
  const deveui = req.body.deveui || null;

  const url = 'https://ns.eu.everynet.io/api/v1.0/devices';
  const token = process.env.AUTH_TOKEN;
  axios.defaults.headers.common['Authorization'] = token;

  try {
    axios.get(url + '/' + deveui + '?access_token=' + token)
    .then(function (response) {
      let device = null;
      let lastJoin = null;
      if (response.status === 200) {
        device = response.data.device;
        let date = new Date(Number(device.last_join) * 1000);
        lastJoin = date.toString();
      }
      res.render('result', {
        title: '123arol result',
        deveui: deveui,
        lastJoin: lastJoin,
        result: JSON.stringify(device)
      });
    });
  } catch (error) {
    res.render('result', {
      title: '123arol result',
      deveui: deveui,
      result: error
    });
  }
});

export default router;
