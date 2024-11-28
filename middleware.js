import { NextResponse } from "next/server";
// import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export function middleware(req) {
   console.log("running middleware:");
   // const session = getSession(req);
   // const user = session?.user;

   // if (user) {
   //    try {
   //       axios.post("http://localhost:3000/api/add-user", {
   //          email: user.email,
   //          name: user.name,
   //          picture: user.picture,
   //       });
   //    } catch (error) {
   //       console.error(error);
   //    }
   // }

   // Continue request handling
   return NextResponse.next();
}
