import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { idToken } = await request.json();

    const response = NextResponse.json({ ok: true });

    response.cookies.set("firebase_id_token", idToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
    });
    return response;

}
