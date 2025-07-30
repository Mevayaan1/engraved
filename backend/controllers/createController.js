
export const createProduct = async (req, res) => {
  try {
    console.log("📦 Received product body:", req.body);  
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Product creation error:", err.message);  
    res.status(400).json({ error: err.message });
  }
};
