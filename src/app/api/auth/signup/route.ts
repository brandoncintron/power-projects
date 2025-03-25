import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        // Validate fields (basic)
        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await db.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
            },
        });


        return NextResponse.json({ message: "User created", user }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
