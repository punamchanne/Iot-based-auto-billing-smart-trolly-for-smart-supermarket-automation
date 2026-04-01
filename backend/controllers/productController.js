const Product = require('../models/Product');
const QRCode = require('qrcode');

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;
    
    // Create new instance to generate the internal _id
    const product = new Product({ name, price, stock, image });
    
    // Generate QR code with product ID as content
    const qrDataURL = await QRCode.toDataURL(product._id.toString());
    product.qrCode = qrDataURL;
    
    // Save to the database
    await product.save();
    
    res.status(201).json(product);
  } catch (error) { 
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message }); 
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) res.json({ message: 'Product removed' });
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createProduct, getProducts, getProductById, deleteProduct };
