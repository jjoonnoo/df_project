const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const homeRouter = require('./home.route');
// const orderRouter = require('./order.route')
// const productRouter = require('./product.route')
router.use('/', homeRouter);
router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);
// router.use('/api/order',orderRouter)
// router.use('/api/product',productRouter)
module.exports = router;
