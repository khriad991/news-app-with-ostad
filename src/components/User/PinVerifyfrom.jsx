'use client'
import React, {useState} from 'react';
import SubmitButton from "@/Utility/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/Utility/FromHandler";

const PinVerifyfrom = () => {
    const router = useRouter();
    const [data,setData] = useState({
        email:sessionStorage.getItem("email"),
        otp:""
    })
    const [submit, setSubmit] =useState(false)

    const inputChange = (name,value) =>{
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const fromSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.otp)){
            ErrorToast("OTP Is Required")
        }
        else {
            setSubmit(true)
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            let res =await fetch("/api/user/recover/verifyOTP",options)
            let ResJson = await res.json();
            console.log("my result is ----->>>>",ResJson)
            setSubmit(false)
            if(ResJson['status'] === 'success'){
                SuccessToast("Verification Success");
                sessionStorage.setItem("otp",data.otp);  // otp set for use get resetPassword
                router.push("/user/resetPassword");
            }
            else {
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
                    <h5 className="mb-3">Verification PIN</h5>
                    <label className="form-label">6 Digit Code</label>
                    <input
                        value={data.otp}
                        onChange={(e) => {
                            inputChange("otp", e.target.value);
                        }}
                        type="text"
                        className="form-control mb-2"
                    />
                    <SubmitButton
                        className="btn btn-danger mt-3"
                        submit={submit}
                        text="Verify"
                    />
                </form>
            </div>
        </div>
    );
};

export default PinVerifyfrom;