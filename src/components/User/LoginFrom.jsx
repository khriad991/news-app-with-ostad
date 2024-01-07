'use client'
import React, {useState} from 'react';
import Link from "next/link";
import SubmitButton from "@/Utility/SubmitButton";
import valueProcessor from "next/dist/build/webpack/loaders/resolve-url-loader/lib/value-processor";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/Utility/FromHandler";

const LoginFrom = () => {
    const [data,setData] = useState({email:"",password:""})
    const [submit ,setSubmit] = useState(false);
    const inputChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const fromSubmit= async () => {
        if(IsEmail(data.email)){
            ErrorToast("valid Email Address is Required")
        }else if(IsEmpty(data.password)){
            ErrorToast("password is Required")
        }else {
            setSubmit(true)
            const options ={
                method:"POST",
                headers:{
                    accept:"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
            let res = await fetch('/api/user/login',options)
            let ResJson = await res.json();
            if(ResJson['status'] ==='success'){
                SuccessToast('Login Success')
                window.location.href='/'
            }else {
                ErrorToast("Login Fail")
            }
        }
    }

    return (
        <div className="row h-100 justify-content-center center-screen">
            <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
                <form onSubmit={fromSubmit} className="card animated fadeIn p-5 gradient-bg">

                    <h5 className="mb-3">User Login</h5>
                    <label className="form-label">User Email</label>
                    <input
                        type="email"
                        className="form-control mb-2"
                        value={data.email}
                        onChange={(e)=>{inputChange('email',e.target.value)}}
                    />

                    <label className="form-label">User Password</label>
                    <input
                        type="password"
                        className="form-control mb-1"
                        value={data.password}
                        onChange={(e)=>{inputChange('password',e.target.value)}}
                    />
                    <SubmitButton submit={submit}  className="btn btn-danger mt-3" text="Login"/>
                    <div className="my-3 d-flex">
                        <Link href="/user/registration" className="nav-link mx-2">Sign Up |</Link>
                        <Link href="/user/emailVerify" className="nav-link">Forget Password</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default LoginFrom;