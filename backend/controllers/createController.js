// export const createProduct = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    console.log("📦 Received product body:", req.body);  // 👈 Add this line
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Product creation error:", err.message);  // 👈 and this
    res.status(400).json({ error: err.message });
  }
};
