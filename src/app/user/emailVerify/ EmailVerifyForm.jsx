'use client'
import React, {useState} from 'react';
import SubmitButton from "@/Utility/SubmitButton";
import {ErrorToast, IsEmail, SuccessToast} from "@/Utility/FromHandler";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const EmailVerifyForm = () => {
    const [data,setData]= useState({email:""});
    const [submit,setSubmit]= useState(false);
    const router = useRouter()


    const inputChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const fromSubmit =async (e) => {
        e.preventDefault();
        if(IsEmail(data.email)){
            ErrorToast('valid Email Address is Required')
        }
        else {
            setSubmit(true)
            let res = await fetch(`/api/user/recover/verifyEmail?email=${data.email}`);
            let ResJson = await res.json();
            if(ResJson['status'] === 'success'){
                // Temporary Session
                sessionStorage.setItem("email",data.email)
                router.push("/user/otpVerify")
                SuccessToast('Request Success')
            }
            else{
                ErrorToast("invalid Email Address")
            }
        }
    }
    return (
        <div className="row h-100 justify-content-center center-screen">
            <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
                <form
                    onSubmit={fromSubmit}
                    className="card animated fadeIn p-5 gradient-bg"
                >
                    <h5 className="mb-3">Email Address</h5>
                    <label className="form-label">User Email</label>
                    <input
                        value={data.email}
                        onChange={(e)=>{inputChange("email",e.target.value)}}
                        type="email"
                        className="form-control mb-2"
                    />
                    <SubmitButton
                        className="btn btn-danger mt-3"
                        text="Next"
                        submit={submit}
                    />
                </form>
            </div>
        </div>
    );
};
export default EmailVerifyForm;