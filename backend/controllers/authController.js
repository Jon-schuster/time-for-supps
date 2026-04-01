import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- REGISTRIERUNG ---
export const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'A user with this E-mail already exists.'});
        }

        // Verschlüsselung
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            massage: 'User succesfully signed up!',
            user: {id: newUser._id, email: newUser.email}
        });

    } catch (error){
        console.error('Error during Signup: ', error);
        res.status(500).json({message: 'Server error during Signup.'});
    }
};

// --- LOGIN ---
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: 'Invalid Login details.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid Login details.'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(200).json({
            token,
            user: {id: user._id, email: user.email, streakCount: user.streakCount}
        });

    }
    catch (error){
        console.error('Error during  Login: ', error);
        res.status(500).json({message: 'Server error during Login.'});
    }
};