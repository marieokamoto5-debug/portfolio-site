import { NextResponse } from "next/server";

import { fetchFastApi } from "@/lib/fetchFastApi";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const response = await fetchFastApi(
            "/admin/images",
            "POST",
            formData
        );

        if (!response) {
            return NextResponse.json(
                { detail: "Unauthorized" },
                { status: 401 }
            );
        }

        const image = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                image,
                { status: response.status }
            );
        }

        const profileResponse = await fetchFastApi(
            `/admin/profile/image/${image.id}`,
            "PUT"
        );

        if (!profileResponse) {
            return NextResponse.json(
                { detail: "Unauthorized" },
                { status: 401 }
            );
        }

        const profile = await profileResponse.json();

        return NextResponse.json(
            profile,
            { status: profileResponse.status }
        );
    } catch {
        return NextResponse.json(
            { detail: "Failed to update profile image" },
            { status: 502 }
        );
    }
}