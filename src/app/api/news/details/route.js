
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import {NextResponse} from "next/server";

export async function GET(req,res){
    try {
        const {searchParams} = new URL(req.url);
        const  id = searchParams.get("id");
        const result = await prisma.news_list.findUnique({
            where:{id:parseInt(id)}
        })
        return NextResponse.json({status:"success",data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e.toString()})
    }
}
