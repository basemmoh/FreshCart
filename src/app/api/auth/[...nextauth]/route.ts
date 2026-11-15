import { authconfig } from "@/authjs/authjs";
import NextAuth from "next-auth";

const {handlers : {GET, POST}} = NextAuth(authconfig);

export { GET, POST };