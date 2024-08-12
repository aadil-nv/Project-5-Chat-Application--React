const asyncHandler = require('express-async-handler')
const User = require('../Models/UserModel');
const router = require('../Routes/userRoute');
const genarateToken = require('../Config/genarateToken')





//! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-------------REGISTER USER------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


const registerUser =asyncHandler (async (req,res)=>{
    const {name,email,password,picture} =req.body;


    if (!name || !email || !password || !picture) {
        res.status(400);
        throw new Error("plaese enter all fields");
    }

    const userExist = await User.findOne({email});
    
    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }
    
    const user = await User.create({
        name,email,password,picture
    });
    
    if(user){
        res.status(201).json({
            _id:user._id,
            name :user.name,
            email : user.email,
            password : user.password,
            picture : user.picture,
            token : genarateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed create new user")
    }
})

//! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-------------REGISTER USER - Ending------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



//! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-------------AUTHERISING USER------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
const authUser = asyncHandler(async (req,res)=>{
    
    const {email,password} = req.body
    

    const user =  await User.findOne({email});
    
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            password : user.password,
            // token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})
//! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-------------AUTHERISING USER Ending------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



//! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX------------ALL Users-------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


const allUsers = asyncHandler (async (req,res)=>{
    const keyword = req.query.search ? {
        $or: [
            {name : {$regex : req.query.search , $options : "i"}},
            {email : {$regex : req.query.search , $options : "i"}},
        ]
    } : {};

    const users = await User.find(keyword).find({_id:{ $ne : req.user._id }})
    res.send(users)
    
})


//! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-------------Ending------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


module.exports = {registerUser,authUser,allUsers}