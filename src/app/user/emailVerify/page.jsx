import React from 'react';
import PlainLayout from "@/components/Master/Plain-Layout";
import EmailVerifyForm from "@/app/user/emailVerify/ EmailVerifyForm";

const Page = () => {
    return (
        <PlainLayout>
            <EmailVerifyForm/>
        </PlainLayout>
    );
};

export default Page;