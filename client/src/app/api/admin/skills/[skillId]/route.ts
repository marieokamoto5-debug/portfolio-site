import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    context: { params: Promise<{ skillId: string }> }
) {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("firebase_id_token")?.value;

    if (!idToken) {
        return NextResponse.json(
            { detail: "Unauthorized" },
            { status: 401 }
        );
    }

    const { skillId } = await context.params;
    const body = await request.json();

    const response = await fetch(
        `${process.env.FASTAPI_URL}/admin/skills/${skillId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(body),
        }
    );

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    });
}


export async function DELETE(
    request: Request,
    context: { params: Promise<{ skillId: string }> }
) {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("firebase_id_token")?.value;

    if (!idToken) {
        return NextResponse.json(
            { detail: "Unauthorized" },
            { status: 401 }
        );
    }

    const { skillId } = await context.params;

    const response = await fetch(
        `${process.env.FASTAPI_URL}/admin/skills/${skillId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    });
}