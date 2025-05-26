const UserModel = require("../Models/UserModel");
const jwt=require("jsonwebtoken");
const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},"Nikhil",{
        expiresIn:maxAge
    });
};

const handleErrors=(err)=>{
    let errors={name:"",email:"",password:""};


    if(err.message.includes("email is incorrect!")){
        errors.email="email is incorrect";
    }
    if(err.message.includes("password is incorrect!")){
       errors.password="password is incorrect";
    }
    if(err.message.includes("name is incorrect!")){
        errors.name="name is incorrect";
    }
    
    if(err.code===11000){
        console.log(err);
      
       errors[Object.keys(err.keyValue)[0]]=Object.keys(err.keyValue)[0]+" is already registered!";
        return errors;
    }
    
    if(err.message.includes("Users validation failed")){
        console.log("hello");
        Object.values(err.errors).forEach(({properties})=>{

          
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "nikhilbhukya198@gmail.com",
        pass: "fdod ewrf mswi hacc" 
    },
    debug: true 
});
const mailOptions = {
    from: {
        name: 'Web Wizard',
        address: "nikhilbhukya198@gmail.com"
    },
    to: '', 
    subject: "Successfully added as",
    text: "", 
    html: "", 
    attachments: [] 
};

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully!");
    } catch (err) {
        console.error("Error in mail sending!", err);
    }
}


module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.create({ name, email, password });

        mailOptions.to = email;
        mailOptions.subject=mailOptions.subject+" "+name; 
        mailOptions.text = `Hello ${name}, you have been successfully registered! be ready for operations in indiam army!`; 
        mailOptions.html = `<p>Hello ${name}, you have been successfully registered!</p>`; 

        await sendMail(transporter, mailOptions);

       

        res.status(200).json({ created: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
}
module.exports.login=async(req,res)=>{
    try{

        const {name,email,password}=req.body;
      
        const user=await UserModel.login({name,email,password});

        const token=createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
        });
        res.status(200).json({user:user._id,created:true});


    }
    catch(err){
        
        const errors=handleErrors(err);

        res.json({errors,created:false});

    }
}