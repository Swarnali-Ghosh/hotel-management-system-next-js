import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        // Accessing request details
        const reqBody = await request.json();
        const { token } = reqBody;

        console.log("token", token);

        const user = await User.findOne(
            // <filter>
            { verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } }
        )

        console.log("user", user)

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        // await User.findByIdAndUpdate({ _id: user._id }, { $set: { isVerified: true, verifyToken: undefined, verifyTokenExpiry: undefined } })

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}