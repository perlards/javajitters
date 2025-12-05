import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {handlers,  auth} = NextAuth({
    providers: [GoogleProvider],
    pages : {
        signIn : "/login",
    }
});