import Spam  from "../models/Spam.js"
// register
export const spamInsert = async (req, res) => {
    try {
        console.log(req.body,"spam-----");
        // console.log(req.files,"-----");
        // console.log(req.file,"-----");
        const {
            // firstName,
            // lastName,
            spam
            // picturePath,
        } = req.body;


        const newSpam = new Spam({
            content:spam
        });

        const savedUser = await newSpam.save();

        res.status(201).json(savedUser);

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}
