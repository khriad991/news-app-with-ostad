

import {PrismaClient} from "@prisma/client"

import {NextResponse}   from "next/server";

export async function POST(req,res){
    try {
        const reqBody = await req.json();
        const prisma = new PrismaClient();
        const findUser = await prisma.users.count({
            where:{email:reqBody['email'],otp:reqBody['otp']}
        });
        if(findUser===1){
            const result = await  prisma.users.update({
                where: {email:reqBody["email"]},
                data:{
                    otp:"0",
                    password:reqBody['password']
                },
            })
            return NextResponse.json({status:"success",massage:"password reset success",data:result})
        }else {
            return NextResponse.json({status:"fail",data:"password reset fail",findUser})
        }

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}