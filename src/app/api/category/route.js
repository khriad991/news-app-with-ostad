import {NextResponse}  from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req,res){
    try {
        const prisma = new PrismaClient();
        const result = await prisma.categories.findMany({
            select:{
                id:true,
                name:true,
            },
        });
        return NextResponse.json({status:"success",total:result.length,data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }
}