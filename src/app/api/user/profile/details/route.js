import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";


export async function GET(req,res_){
    try {
        const headerList = headers();

        const id = parseInt(headerList.get("id"));
        const prisma = new PrismaClient();
        const result = await  prisma.users.findUnique({
            where:{id:id},
            select:{
                first_name:true,
                last_name:true,
                email:true,
                mobile:true,
                otp:true,
                password:false
            }
        })
        return NextResponse.json({status:"success",data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }
}