const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    // Map products to appropriate schema fields if needed
    const order = await Order.create({ userId: req.user._id, products, totalAmount });
    res.status(201).json(order);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
    res.json(orders);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({}).populate('userId', 'name email').populate('products.productId');
      res.json(orders);
    } catch (error) { res.status(500).json({ message: error.message }); }
  };

const updateOrderPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod, paymentStatus, status, customerPhone, customerAddress } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (paymentMethod) order.paymentMethod = paymentMethod;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (status) order.status = status;
    if (customerPhone) order.customerPhone = customerPhone;
    if (customerAddress) order.customerAddress = customerAddress;

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderPaymentStatus };
