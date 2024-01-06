import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(req,res){
    try {
        const {searchParams} = new URL(req.url);
        const postID =parseInt( searchParams.get("postID"));
        const result  = await prisma.comments.findMany({
            where:{postID:postID},
            include:{
                users:{select:{firstName:true,lastName:true}},
                // news_list:{select:{title:true}}
            }
        })
        return NextResponse.json({status:"success",data:result})
    }catch (e) {

        NextResponse.json({status:"fail",data:e})
    }
}