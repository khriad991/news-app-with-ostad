'use client'
import React, {useState} from 'react';
import SubmitButton from "@/Utility/SubmitButton";
import {ErrorToast, IsEmail, SuccessToast} from "@/Utility/FromHandler";

const Subscribe = () => {
    const [data, setData] = useState({email:""})

    const [submit, setSubmit] = useState(false)

    const inputChange = (name,value) => {
        setData((data)=>(
            {
                ...data,
                [name]: value
            }
        ))}

    const fromSubmit =async  () => {
        if(IsEmail(data.email)){
            ErrorToast("Valid Email Address Required")
        }else {
            setSubmit(true)
            const options = {
                method:"POST",
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json",
            },
                body:JSON.stringify(data)
            }
            let res = await fetch("/api/subscriber",options)
            let resJson = await res.json();
            setSubmit(false)
            setData({email: ""})
            if(resJson['status']=== 'success'){
                SuccessToast("Request Success")
            }else{
                ErrorToast("Request Failed")
            }
        }
    }
    return (
        <div className="card p-3 shadow-sm">
            <span className="f-52 text-center text-muted"> <i className="bi  bi-envelope"></i></span>
            <h6 className="text-center mb-3 mt-0">News Letter</h6>


            <input type="text"
                   value={data.email}
                   onChange={(e)=>{inputChange("email",e.target.value)}}
                   placeholder="Email Address"
                   className="form-control mb-3"/>
            <SubmitButton  onClick={fromSubmit} submit={submit} className="btn btn-danger mt-2 w-100"  text="Submit"/>
        </div>
    );
};

export default Subscribe;