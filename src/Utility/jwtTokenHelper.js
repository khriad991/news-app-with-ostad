import {jwtVerify, SignJWT} from "jose";


export async function createToken (email,id){
    const secret = new  TextEncoder().encode(process.env.JWT_SECRET)
    const  payload = {email:email,id:id}
    let token = await new SignJWT(payload)
        .setProtectedHeader({alg:'HS256'})
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER)
        .setExpirationTime(process.env.JWT_EXPATRIATION_TIME)
        .sign(secret)

    return token
};

export async function verifyToken(token){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const decode = await jwtVerify(token,secret)
    return decode['payload']
}
