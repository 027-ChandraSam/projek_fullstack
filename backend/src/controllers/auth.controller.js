import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUser,
  CreateUser
} from "../services/auth.service.js";

// REGISTER
export const register = async (req, res) => {
    try {
      let { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }
  
      // 🔑 PASTIKAN PASSWORD STRING
      password = String(password);
  
      const user = await findUser(email);
      if (user.length > 0) {
        return res.status(200).json({ message: "Email sudah terdaftar" });
      }
  
      const hashed = await bcrypt.hash(password, 10);
      await CreateUser(username, email, hashed);
  
      res.status(201).json({ message: "Register berhasil" });
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUser(email);
    if (user.length === 0) {
      return res.status(400).json({ message: "Email salah" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 INI BAGIAN PENTING
    res.json({
      message: "Login sukses",
      token,
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

