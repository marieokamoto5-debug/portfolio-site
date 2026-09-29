import { NextResponse } from "next/server";
import { fetchFastApi } from "@/lib/fetchFastApi";

export async function PUT(
    request: Request,
    context: { params: Promise<{ skillId: string }> }
) {
    try {
        const { skillId } = await context.params;
        const body = await request.json();

        const response = await fetchFastApi(
            `/admin/skills/${skillId}`,
            "PUT",
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

export async function DELETE(
    request: Request,
    context: { params: Promise<{ skillId: string }> }
) {


    try {
        const { skillId } = await context.params;

        const response = await fetchFastApi(
            `/admin/skills/${skillId}`,
            "DELETE"
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