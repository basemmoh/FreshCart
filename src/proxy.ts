import {getToken} from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function proxy(req:NextRequest) {
    const isLogin = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register';
   const sessionToken =  await getToken({
        req,
        secret: process.env.AUTH_SECRET
    })
    if(isLogin){
        if(sessionToken)
        {
            return NextResponse.redirect(new URL('/',req.url))
        }
            return NextResponse.next()
    }
    if(sessionToken){
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login',req.url))
}

export const config = {
    matcher: [
        '/cart' , '/wishlist' , '/categories', '/brands' , '/login' , '/register'
    ]
}