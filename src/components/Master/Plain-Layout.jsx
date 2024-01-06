import React, {Fragment} from 'react';
import AppNevBar from "@/components/Master/AppNevBar";
import Footer from "@/components/Master/Footer";
import {Toaster} from "react-hot-toast";

const getData =async () => {
    let socials = (await (await fetch(`${process.env.HOST}/api/social`)).json())['data']
    let categories=(await (await fetch(`${process.env.HOST}/api/category`)).json())['data']


    return {socials:socials, categories:categories}
}

const PlainLayout =async (props) => {
    const  data= await getData();
    return (
       <Fragment>
           <AppNevBar data={data} />
           {props.children}
           <Toaster position="bottom-center"/>
           <Footer data={data}/>
       </Fragment>
    );
};

export default PlainLayout;