import { cookies } from "next/headers"; // 不要になった
import { NextResponse } from "next/server";

export async function PUT(request: Request) {

  // ↓この部分をProfile,Skill で　共通化してfetchFastApi.tsに持たせたので不要になった
  /* 1. Cookieを見る
  2. ログイン情報を取り出す
  3. ログイン情報がなければ401を返す
  4. FastAPIに送る
  */

  const cookieStore = await cookies();
  const idToken = cookieStore.get("firebase_id_token")?.value;

  if (!idToken) {
    return NextResponse.json(
      { detail: "Unauthorized" },
      { status: 401 }
    );
  }
  //↑


  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.FASTAPI_URL}/admin/profile`,
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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { detail: "Backend service unavailable" },
      { status: 502 }
    );
  }
}