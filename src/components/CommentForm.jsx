import React, {useEffect, useState} from 'react';
import Link from "next/link";
import SubmitButton from "@/Utility/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrorToast, IsEmpty, SuccessToast} from "@/Utility/FromHandler";
import Cookies from "js-cookie";


const CommentForm = (props) => {
    const router = useRouter();
    const [submit,setSubmit]=useState(false);
    const [login ,SetLogin] = useState(false);
    const [data,setData]= useState({
        postID:parseInt(props.postID),
        descriptions:""
    });

    useEffect(()=>{
        if(Cookies.get("token")){
            SetLogin(true)
        }
        else {
            setSubmit(false)
        }

    },[])

    const inputChange = (name,value) => {
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    }
    const fromSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.descriptions)){
            ErrorToast("Comments is Required");
        }
        else {
            setSubmit(true);
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            console.log("my data is ----->>>",data)
            let res = await fetch("/api/comments/manage",options)
            let ResJson = await res.json();

            setSubmit(false);
            if(ResJson['status']==='success'){
                SuccessToast("Success")
            // Clear the textarea after successful submission
                setData({ postID: parseInt(props.postID), descriptions: "" });
                router.refresh();
            }
            else {
                ErrorToast("Request Fail")
                console.log(ResJson)
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-10 p-4">
                    <h5 className="mb-3">Write Yours Comments...</h5>
                    <textarea
                        value={data.descriptions}
                        onChange={(e) => {
                            inputChange("descriptions", e.target.value);
                        }}
                        rows={2}
                        className="form-control mb-2"
                    />
                    {
                        login ?(
                            <SubmitButton
                                onClick={fromSubmit}
                                submit={submit}
                                className="btn btn-danger mt-3"
                                text="Submit"
                            />
                        ):(
                            <Link
                                className="btn btn-outline-danger mt-3"
                                href="/user/login"
                            >
                                Please Login First
                            </Link>

                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default CommentForm;