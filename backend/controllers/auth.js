import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateToken from "../config/token.js"

export const signUp = async (req,res) =>{  
        try {
        const {firstName , lastName, email,password,userName} =req.body;

        //all fields
        if(!firstName || !lastName || !email || !password || !userName) {
            return res.status(400).json({message:"Fill all fields..!"})
        }
        

        //check if user already exist in db using email thst is unique.  
        let existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already Exists..!"})
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create a newUser
       const user =  User.create({firstName , lastName, email,password:hashedPassword,userName});

       //generate token using user id
       let token = generateToken(user._id);
       
       // parse the token in the cokkie--->token ko cookie ke andar store krna hai (cookie is a small piece of data stored on the client side)
       //cookie is used to store the token so that we can use it for authentication in future
       // browser me jaha kahi bhi cookie hoti hai vha pr ye res.cookie("token") token naame se cookie bnaega
       res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIROMENT == "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
       })

       return res.status(201).json({user:{firstName , lastName, email, userName}});




    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}


export const login = async (req,res) => {

    try {
        const {email , password} = req.body;
        const existuser = await User.findOne({email});
        if(!existuser){
            return res.status(400).json({message:"User does not exist ...!"})
        }

      const match =   bcrypt.compare(password , existuser.password )
      if(!match){
        return res.status(401).json({message:"Incorrect Password"})
      }
          
      let token = generateToken(existuser._id);

        res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIROMENT == "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
       })
      
       
        return res.status(201).json({user:{firstName:existuser.firstName , lastName:existuser.lastName, email:existuser.email, userName:existuser.userName}});



    } catch (error) {
         return res.status(500).json({message:"Internal server error"});
    }
}