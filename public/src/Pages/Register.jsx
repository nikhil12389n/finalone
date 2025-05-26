import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import './register.css';
import {ToastContainer,toast} from "react-toastify";
import axios from "axios";
import ConnectionContext from "../Connection/Connection.js";
export default function Register(){
   const {account,contract}=useContext(ConnectionContext);
   
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



        const pattern1= new RegExp('^DIVISION\\d+$');
        const pattern2=new RegExp('^D\\d+ADST\\d+$');

        if(pattern1.test(values.name)){
             try{
            const {data}=await  axios.post("http://localhost:4000/register",{...values},{
                withCredentials:true
            });

            if(data){
                if(data.errors){
                    const {name,email,password}=data.errors;
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
                    const data=await contract.methods.divisionsadd(values.name).send({from:account});
                    alert("Division is added successfully!");
                    window.location.reload();
                }
            }
        }
        catch(err){
            console.log("Error in axios post! from register.jsx");
        }

        }
        else if(pattern2.test(values.name)){

            try{
                const {data}=await  axios.post("http://localhost:4000/register",{...values},{
                    withCredentials:true
                });
    
                if(data){
                    if(data.errors){
                        const {name,email,password}=data.errors;
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
                        let temp=0;

                        for(let i=1;i<values.name.length;i++){
                            if(parseInt(values.name[i],10)){
                                temp=temp*10+parseInt(values.name[i],10);
                            }
                            else{
                                break;
                            }
                        }
                        
                        let div="DIVISION"+String(temp);
                        let adst=values.name;
                        const data=await contract.methods.adstsadd(div,adst).send({from:account});
                        alert("Unit added sucessfully!");
                          window.location.reload();
    
    
    
                    }
                }
            }
            catch(err){
                console.log("Error in axios post! from register.jsx");
            }
        }
        else{
            generateError("The name should be in given format!");
            return;
        }

       
       
    }
   return(
    <>
    
      <div className="container containerofregis" >


      <h2 className="hregis">Register Account</h2>
        
        <form className="formofregis" onSubmit={handleSubmit}>


        <div>
                <label htmlFor="name">Name</label>
                <input className="inputofregis" type="text" name="name" placeholder="name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
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
    </div>
    <ToastContainer/>
    </>
   )
}