
'use client'
import React, {useState} from 'react';
import SubmitButton from "@/Utility/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/Utility/FromHandler";

const SetPasswordFrom = () => {
    const router = useRouter();
    const [data,setData]= useState({
        password:"",
        c_password:"",
        email: sessionStorage.getItem("email"),
        otp:sessionStorage.getItem("otp")
    });
    const [submit, setSubmit]= useState(false);
    const inputChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const fromSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.password)){
            ErrorToast('password Is Required')
        }else if(IsEmpty(data.c_password)){
          ErrorToast('Confirm password Is Required')
        } else if(data.c_password !== data.password){
            ErrorToast("password and Confirm password Should be Same")
        }else {
            setSubmit(true);
            const options = {
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
            const res = await fetch("/api/user/recover/resetPassword",options);
            const ResJson = await res.json();
            setSubmit(false);
            if(ResJson['status']==='success'){
                SuccessToast("Password Reset Success");
                sessionStorage.clear();  // for  email @ opt remove from otp
                router.push("/user/login")
            }else {
                ErrorToast("request Fail");
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
                    <h5 className="mb-3">Set Password</h5>
                    <label className="form-label">Password</label>
                    <input
                        value={data.password}
                        onChange={(e)=>{inputChange('password',e.target.value)}}
                        type="password"
                        className="form-control mb-2"
                    />

                    <label className="form-label">Confirm Password</label>
                    <input
                        value={data.c_password}
                        onChange={(e)=>{inputChange('c_password',e.target.value)}}
                        type="password"
                        className="form-control mb-1"
                    />

                    <SubmitButton
                        submit={submit}
                        className="btn btn-danger mt-3"
                        text="Confirm"
                    />
                </form>
            </div>
        </div>
    );
};

export default SetPasswordFrom;