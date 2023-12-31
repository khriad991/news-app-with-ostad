import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
const prisma = new PrismaClient();

export async function GET(req,res){
    try {
        const result = await prisma.socials.findMany();
        return NextResponse.json({status:"success",data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e.toString()})
    }
}