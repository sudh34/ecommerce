const bcrypt = require('bcrypt');
const connection = require('../models/db.js'); // your MySQL connection

// Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ code: 8888, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ code: 8888, message: 'Passwords do not match' });
    }

    const [existing] = await connection.query('SELECT * FROM tbl_users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ code: 8888, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query('INSERT INTO tbl_users (name, email, password) VALUES (?, ?, ?)', [
      name, email, hashedPassword
    ]);

    return res.status(200).json({ code: 9999, message: 'Registration successful' });


  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 5000, message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ code: 8888, message: 'All fields are required' });
    }

    const [rows] = await connection.query('SELECT * FROM tbl_users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ code: 8888, message: 'Invalid email or password' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ code: 8888, message: 'Invalid email or password' });
     req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    return res.status(200).json({ code: 9999, message: 'Login successful', data: { id: user.id, name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 5000, message: 'Server error' });
  }
};

// Logout (optional, just a placeholder)
const logoutUser = async (req, res) => {
  return res.status(200).json({ code: 9999, message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, logoutUser };
