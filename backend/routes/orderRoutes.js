const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderPaymentStatus } = require('../controllers/orderController');
const { protect, adminOnly, adminOrCashier } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, adminOrCashier, getAllOrders);

router.patch('/:orderId', protect, adminOrCashier, updateOrderPaymentStatus);

router.get('/user', protect, getUserOrders);

module.exports = router;
