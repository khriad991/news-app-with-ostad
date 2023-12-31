
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req,res){
    try {
        const {searchParams} = new URL(req.url)
        const keyword = searchParams.get("keyword");
        const result = await prisma.news_list.findMany({
            where:{title:{contains:keyword}},
            select:{
                id:true,
                title:true,
                short_des:true,
                img1:true,
                img2:true,
                img3:true,
                img4:true
            }
        })
        return  NextResponse.json({status:"success",data:result})
    }catch (e) {
        return NextResponse.json({status:"fail",data:e.toString()})
    }
}
