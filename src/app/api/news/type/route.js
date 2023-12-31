import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
const prisma = new PrismaClient();


export async function GET(req,res){
    try {
        const {searchParams} = new URL(req.url);
        const type = searchParams.get("type")
        const result = await prisma.news_list.findMany({
            where:{type:type},
            select:{
                id:true,
                title:true,
                type:true,
                short_des:true,
                img1:true,
                img2:true,
                img3:true,
                img4:true

            }
        })

        return NextResponse.json({status:"success",data:result})
    }catch (e){
        return NextResponse.json({status:"fail",data:e})
    }
}