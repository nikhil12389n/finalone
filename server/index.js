const express=require("express");
const app=express();
const cors=require("cors");
const { default: mongoose } = require("mongoose");
const authRoutes=require('./Routes/authRoutes');

const cookieparser=require("cookie-parser");

app.listen(4000,()=>{
    console.log("Server started on 4000!");
})

mongoose.connect("mongodb://localhost:27017/",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Db connection is successfully!")
}).catch((err)=>{
    console.log("Error in connecting mongo compass!");
})
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));

app.use(cookieparser());
app.use(express.json());

app.use('/',authRoutes);