import {verifyToken} from "@/Utility/jwtTokenHelper";
import {NextResponse} from "next/server";


export async function middleware(req,res){
    try {
        const token = req.cookies.get("token")
        let payload = await verifyToken(token['value']);
        const reqHeaders=new Headers(req.header);
        reqHeaders.set("email",payload['email'])
        reqHeaders.set("id",payload['id'])

        return NextResponse.next({request:{headers:reqHeaders}})
    }catch (e) {
        const reqHeaders = new Headers(req.headers)
        reqHeaders.set("email","0")
        reqHeaders.set("id","0")

        return NextResponse.next({request:{headers:reqHeaders}})
    }
}