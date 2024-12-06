import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
    try {
        await connect();

        // Fetch the token from cookies
        const token = cookies().get("token")?.value || null;

        if (!token) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // You can now use the token for further logic
        return NextResponse.json({ success: true, token });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
