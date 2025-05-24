import express from 'express';
import User from '../models/UserModels.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'User not found' });
    }
});

export default router;
