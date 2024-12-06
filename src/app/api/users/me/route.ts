import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        // Accessing request details
        const userId = await getDataFromToken(request);

        const user = await User.findOne({ _id: userId }).select("-password")

        return NextResponse.json({ message: "User found successfully", data: user, success: true }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}