import User from "../models/userModel.js";

// Get user profile (simulating a single user for now)
export const getUserProfile = async (req, res) => {
    try {
        // For simplicity, we'll always fetch the first user or create a default one
        let user = await User.findOne();

        if (!user) {
            user = await User.create({
                name: 'Chaithanya S',
                email: 'chaithanyo@example.com',
                phone: '+1 234 567 8900',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chaithanyo',
                joinedDate: new Date('2024-01-15')
            });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findOne();

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
