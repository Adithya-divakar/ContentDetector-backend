import Post from "../models/Post.js";
import Spam from "../models/Spam.js";
import User from "../models/User.js";


// READ
export const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Post.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// export const getAllPost = async (req, res) => {
//     try {
//         const posts = await Post.find({});
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

// login
export const getAllPost =( async(req,res)=>{
    try{
        const posts =  await Post.find({})

        const users = await User.find({})

          let result = posts.map((post) => {
            let user = users.find((user) => user._id.toString() === post.userId);
            return {
              _id: post._id,
              content: post.content,
              name: user ? user.name : '',
              userId:user? user._id : '',
              createdAt:post.createdAt,
            };
          });

          result.sort((a, b) => b.createdAt - a.createdAt);

          
         
          

        res.status(200).json(result)
        // const isMatch = await bcrypt.compare(password,user.password)

        // if(!isMatch) return res.status(400).json({message:"Invalid credentials."})

        // const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        // delete user.password
// 

    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export const insertPost = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params.id, "-posting contetn----");
        const { content } = req.body;

        const query = { content: { $regex: content, $options: 'i' } };

        // const result = await collection.find(query);

        // const matchingSpamDocuments = await Spam.find({ content });
        const matchingSpamDocuments = await Spam.find(query);
        const isMatch = matchingSpamDocuments.length > 0;
    if(isMatch){
        res.status(403).json({ message:'Your content is considered spam or fraud.' });
    }else{
        

        
        const newPost = new Post({
            content:content,
            userId:id
        });
        const savedPost = await newPost.save();
        
        res.status(201).json(savedPost);
    }

        // res.status(201).json(matchingSpamDocuments);
        // let isMatch = new Spam({
        //     content:content
        // })
        // const MatchUser = await newUser.find({});


       

        

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


