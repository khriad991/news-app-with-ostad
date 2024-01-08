"use client"
import React, {useState} from 'react';
import SubmitButton from "@/Utility/SubmitButton";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/Utility/FromHandler";
import {useRouter} from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


const SingUpFrom = () => {
    const [data,setData ] = useState({
        firstName:"",
        lastName:"",
        mobile:"",
        email:"",
        password:"",
    })
const [submit, setSubmit] = useState(false)
    const router = useRouter()

    const inputChange= (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const fromSubmit =async () => {
        if (IsEmpty(data.firstName)){
            ErrorToast("first Name is Required")
        }else if(IsEmpty(data.lastName)){
            ErrorToast("last name is Required")
        }else if(IsEmpty(data.mobile)){
            console.error("mobile Number is Required")
        }else if(IsEmail(data.email)){
            ErrorToast("valid email Address is Required")
        }else if(IsEmpty(data.password)){
            ErrorToast("password is Required")
        }else {
            setSubmit(true)
            const options = {
                method:"POST",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            }
            let res = await fetch("/api/user/registration",options)
            let ResJson = await res.json();
            if(ResJson['status']=== "success"){
                SuccessToast("Registration Success")
                router.push('/user/login')
            }else{
                setSubmit(false);
                ErrorToast("Request Fail")
            }
        }
    }
    return (
        <div className="row h-100  justify-content-center center-screen my-5">
            <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
                <div className="card container-fluid animated fadeIn p-5 gradient-bg">
                    <div className="row ">
                        <h5 className="mbt-4 px-1 mx-0 px-0 text-center fw-bold">User Registration</h5>
                           <div className="mt-4 px-1 col-12">
                            <input
                                placeholder="First Name..."
                                type="text"
                                className="form-control py-2"
                                value={data.firstName}
                                onChange={(e)=>{inputChange('firstName',e.target.value)}}
                            />
                        </div>
                           <div className="mt-4 px-1 col-12">
                            <input
                                placeholder="Last Name..."
                                type="text"
                                className="form-control py-2"
                                value={data.lastName}
                                onChange={(e)=>{inputChange('lastName',e.target.value)}}
                            />
                        </div>
                           <div className="mt-4 px-1 col-12">
                            <input
                                placeholder="Mobile..."
                                type="text"
                                className="form-control py-2"
                                value={data.mobile}
                                onChange={(e)=>{inputChange('mobile',e.target.value)}}
                            />
                        </div>
                           <div className="mt-4 px-1 col-12">
                            <input
                                placeholder="Email..."
                                type="email"
                                className="form-control py-2"
                                value={data.email}
                                onChange={(e)=>{inputChange('email',e.target.value)}}
                            />
                        </div>
                           <div className="mt-4 px-1 col-12">
                            <input
                                placeholder="Password..."
                                type="password"
                                className="form-control py-2"
                                value={data.password}
                                onChange={(e)=>{inputChange('password',e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-4 px-1 col-12 ">
                            <SubmitButton
                                className="btn btn-danger w-100 py-2 "
                                text="Sign Up"
                                submit={submit}
                                onClick={fromSubmit}
                            />
                        </div>
                        <div className="mt-2 px-1 col-12 ">
                            <span className='text-center text-dark mt-3 fw-medium'>Already Have an Account ||
                                <a className='text-primary text-decoration-none px-1' href="/user/login">Login</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUpFrom;