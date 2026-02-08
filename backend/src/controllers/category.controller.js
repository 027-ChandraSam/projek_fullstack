import db from "../config/db.js";

const getCategories = async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM categories ORDER BY name ASC");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal mengambil kategori" });
    }
  };

export default getCategories;