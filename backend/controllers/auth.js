const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
exports.register = async (req,res,next) =>{
    const {username, email,password} = req.body;
    try{
        const user = await User.create({
            username,
            email,
            password
        })

        sendtoken(user,200,res);
    }catch(err){
        next(err);
    }
}

exports.login = async (req,res,next) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorResponse("Please provide email and password",400))
    }
    try{
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorResponse("Invalid Credentials",401))
        }

        const isMatch = await user.matchpassword(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials",401))
        }
        sendtoken(user,200,res);
        
    }catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}

exports.forgotpassword = (req,res,next) =>{
    // const {email} = req.body;

    // try{
    //     const user = await User.findOne({email})
    //     if(!user){
    //         return next(new ErrorResponse("email could not be sent",404))
    //     }
    //     const resetToken = User.getResetPasswordToken();
    //     await user.save();

    //     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    //     const message = `
    //     <h1>you have requested a password reset</h1>
    //     <p>please go to this link to reset your password</p>
    //     <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
    //     `
    //     }catch(err){}
    res.send("forgot password route")
}

exports.resetpassword = (req,res,next) =>{
    res.send("reset password route");
}

const sendtoken = (user,statusCode,res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true,token});
}