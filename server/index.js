const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

const MOCK_USERS = [
  { email: 'user@netflix.com', password: 'password123', name: 'Netflix User' },
  { email: 'demo@test.com', password: 'demo123', name: 'Demo User' },
];

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect email or password. Please try again.',
    });
  }

  res.json({
    success: true,
    message: 'Login successful!',
    user: { email: user.email, name: user.name },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
