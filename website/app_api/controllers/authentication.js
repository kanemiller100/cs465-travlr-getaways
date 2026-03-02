const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    user.setPassword(req.body.password);
    await user.save();

    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.validPassword(req.body.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  register,
  login
};
