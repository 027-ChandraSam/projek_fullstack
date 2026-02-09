import db from "../config/db.js";

export const getUsers = async (req, res) => {
  const [rows] = await db.query( "SELECT id, username, email, role FROM users");
  res.json(rows);
};
export const updateUserRole = async (req, res) => {
    const { role } = req.body;
    const userId = req.params.id;
  
    try {
      await db.query(
        "UPDATE users SET role=? WHERE id=?",
        [role, userId]
      );
  
      res.json({ message: "Role updated" });
    } catch (err) {
      res.status(500).json({ message: "Gagal update role" });
    }
  };

export const deleteUser = async (req, res) => {
  await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
  res.json({ message: "User deleted" });
};
