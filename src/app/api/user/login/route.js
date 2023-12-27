import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

import {createToken} from "@/Utility/jwtTokenHelper";


export async function POST(req,res){
    try {
        const prisma = new PrismaClient();
        const reqBody = await req.json();
        const result =await prisma.users.findUnique({where:reqBody})

        if(result.length===0){
            return NextResponse.json({status:"fail",data:result['message']})
        }else{
            let token = await createToken(result['email'],result['id']);
            let expirDuration = new Date(Date.now()+ 24*60*60*1000);
            const cookieString = `token=${token};expires=${expirDuration.toUTCString()};path=/`

            return  NextResponse.json(
                {status:"success",data:token},
                {status:200,headers:{"Set-Cookie":cookieString}}
            )
        }

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }
}
