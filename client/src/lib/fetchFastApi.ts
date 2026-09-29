import { cookies } from "next/headers";

export async function fetchFastApi(
    path: string,
    method: string,
    body?: unknown
) {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("firebase_id_token")?.value;

    if (!idToken) {
        return null;
    }
    return fetch(`${process.env.FASTAPI_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
}