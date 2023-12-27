
import {PrismaClient}from '@prisma/client'
import {NextResponse} from "next/server";


export async function POST(req,res){
    try {
        const reqBody = await req.json()
        const prisma = new PrismaClient();
        const findUser = await  prisma.users.count({where:reqBody})
        if(findUser===1){
            return NextResponse.json({status:"success",data:"valid your OTP"})
        }
        else {
            return NextResponse.json({status:"fail",data:"invalid your OTP"})
        }
    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }
}

