import { fetchFastApi } from "@/lib/fetchFastApi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetchFastApi(
            "/admin/skills",
            "POST",
            body
        );
        if (!response) {
            return NextResponse.json(
                { detail: "Unauthorized" },
                { status: 401 }
            );
        }

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { detail: "Backend service unavailable" },
            { status: 502 }
        );
    }
}