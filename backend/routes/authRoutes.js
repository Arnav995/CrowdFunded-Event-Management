import express from "express";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [existing] = await db.query(`SELECT user_id FROM users WHERE email = ?`, [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')`,
      [name, email, hashed]
    );

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Signup Error:",err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default authRouter;
