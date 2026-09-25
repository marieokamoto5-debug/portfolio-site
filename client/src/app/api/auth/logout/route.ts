import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ ok: true });

    response.cookies.delete("firebase_id_token");

    return response;

}