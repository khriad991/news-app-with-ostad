
import {PrismaClient}from "@prisma/client";
import {NextResponse} from "next/server";
import {headers} from "next/headers";

export async function POST(req,res){
    try {
        const headerList = headers()
        const id = parseInt(headerList.get("id"));
        const reqBody = await req.json();
        const prisma = new PrismaClient();

        const result = await prisma.users.update({
            where:{id:id},
            data:reqBody
        })


        return NextResponse.json({status:"success",data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e.toString()})
    }
}