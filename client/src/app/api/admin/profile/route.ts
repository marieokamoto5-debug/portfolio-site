import { NextResponse } from "next/server";
import { fetchFastApi } from "@/lib/fetchFastApi"; //別ファイルから読んでる
// Profile,Skill で　以下の処理を共通化してfetchFastApi.tsに持たせているので10行くらい短くなっている
/* 1. Cookieを見る
  2. ログイン情報を取り出す
  3. ログイン情報がなければ401を返す
  4. FastAPIに送る
*/

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const response = await fetchFastApi(
            "/admin/profile",
            "PUT",
            body
        );
        // fetchapi.tsの結果を見て認証結果を返している
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