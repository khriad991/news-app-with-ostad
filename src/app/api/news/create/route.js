import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
const prisma = new PrismaClient();


export async function POST(req,res){
    try {
        const reqBody =await req.json()
        const result =await prisma.news_list.create({data:reqBody})


        return NextResponse.json({status:"success",data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e.toString()})
    }
}