import bcrypt from "bcryptjs"; // 👈 TAMBAHKAN INI
import db from "../config/db.js";

export const createAdminIfNotExist = async () => {
  const email = "admin@rbca.com";
  const password = "admin123";

  const hashed = await bcrypt.hash(password, 10);

  const [rows] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')",
      ["Super Admin", email, hashed]
    );

    console.log("✅ Admin default dibuat");
  }
};
