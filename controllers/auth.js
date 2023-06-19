import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register
export const register = async (req, res) => {
    try {
        console.log(req.body,"-----");
        // console.log(req.files,"-----");
        // console.log(req.file,"-----");
        const {
            // firstName,
            // lastName,
            name,
            email,
            password,
            // picturePath,
        } = req.body;

        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);

        console.log(passwordHash);

        const newUser = new User({
            // firstName,
            // lastName,
            name,
            email,
            password: passwordHash,
            // picturePath,
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

// login
export const login =( async(req,res)=>{
    try{
        console.log(req.body,'----req.body');
        const { email,password } = req.body

        const user =  await User.findOne({email:email})

        if(!user) return res.status(400).json({message:"User does not exist"})

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(400).json({message:"Invalid credentials."})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        delete user.password

        res.status(200).json({token,user})

    }catch(error){
        res.status(500).json({message:error.message})
    }
})