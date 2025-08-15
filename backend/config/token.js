import jwt from "jsonwebtoken"
const generateToken = async (id) =>{
    const token = await jwt.sign({id} ,process.env.JWT_SECRET , {expiresIn:"7d"} )
    return token;
}

export default generateToken;