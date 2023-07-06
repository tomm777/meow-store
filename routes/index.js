const { Router } = require('express');
const asyncHandler = require('../utils/async-handler');
const { User } = require('../models');

const router = Router();

router.get(
  '/join',
  asyncHandler(async (req, res) => {
    const user = await User.create({
      email: 'test@test.com',
      password: '1234',
    });
    console.log('신규 회원', user);

    res.redirect('/');
  }),
);

module.exports = router;
