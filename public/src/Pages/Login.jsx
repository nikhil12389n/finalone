import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import './register.css';
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";

export default function Login(){
    const navigate=useNavigate();

   const generateError=(err)=>toast.error(err,{
        position:"bottom-right"
    });
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await  axios.post("http://localhost:4000/login",{...values},{
                withCredentials:true
            });
            console.log(data);

            if(data){
                if(data.errors){
                    const {name,email,password}=data.errors;
                    console.log(name,email,password);

                    if(name){
                        generateError(name);
                    }
                    else if(email){
                        generateError(email)
                    }
                    else if(password){
                        generateError(password);
                    }
                }
                else{

                    const pattern1=new RegExp("^DIVISION\\d+$");
                    const pattern2=new RegExp("^D\\d+ADST\\d+$");
                    localStorage.setItem("rolename",values.name);
                    if(pattern1.test(values.name)){
                        
                        navigate('/');
                    }
                    else if(pattern2.test(values.name)){
                        
                        navigate("/");
                    }
                    else{
                        if(values.name=="DGST"){
                            navigate("/");
                        }
                        else{
                            navigate("/");
                        }
                    }

                }
            }
        }
        catch(err){
            console.log("Error in axios post! from register.jsx");
        }
    }
   return(
    <>
     
      <div className="container containerofregis">

      <h2 className="hregis"> Login Account</h2>

          
        <form className="formofregis" onSubmit={handleSubmit}>
        
        <div>
                <label htmlFor="name">Name</label>
                <input  className="inputofregis" type="text" name="name" placeholder="name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input className="inputofregis" type="email" name="email" placeholder="email"   onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input className="inputofregis" type="password" name="password" placeholder="password"   onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>

            <button className="buttonofregis" type="submit">Submit</button>

           
           
        </form>
        <ToastContainer/>
    </div>
    </>
   )
}