const User = require('../models/User');

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { getUserData };
