import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {

        const response = NextResponse.json({ message: "Logout successfully", success: true }, { status: 200 })
        // Note:1
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

{/**
    Note:1

    The code snippet you provided is used to clear a cookie named token in an HTTP response. Here's a breakdown of what each part does:

    `response.cookies.set("token", "", { ... })`: This sets the token cookie to an empty string. The response.cookies.set method is commonly used in web frameworks to manipulate cookies.

    `httpOnly`: true: This option ensures that the cookie is marked as HttpOnly, which means it cannot be accessed through JavaScript in the browser. This is a security feature that helps prevent cross-site scripting (XSS) attacks.

    `expires: new Date(0)`: This sets the expiration date of the cookie to January 1, 1970. By setting the expiration date to a time in the past, the browser will automatically delete the cookie, effectively clearing it.

    This is a typical way to log out a user or clear an authentication token in a web application.

*/}