# 開発手順

## 初回のプロジェクト作成記録

以下は実施済み。通常の起動時には実行しない。

### Next.js
リポジトリ直下で実行。

```powershell
npx create-next-app@latest client --ts --eslint --tailwind --app --src-dir --use-npm --import-alias "@/*"
```

### FastAPI
リポジトリ直下で実行。

```powershell
uv init api
cd api
uv add fastapi uvicorn
```

## 開発時の起動

Docker Desktopを起動しておく。
以下は、それぞれリポジトリ直下から実行する。

### PostgreSQL
ルートに.envを用意し、DBの接続設定を記入する。

```powershell
docker compose up -d
docker compose exec db pg_isready -U section6 -d section6
```

### Next.js
専用のターミナルで実行。

```powershell
cd client
npm run dev
```

確認先：http://localhost:3000

### FastAPI
別のターミナルで実行。

```powershell
cd api
uv run uvicorn main:app --reload
```

確認先：http://localhost:8000
API確認画面：http://localhost:8000/docs

# FastAPIのレイヤ構成

ブラウザ / Next.js
        ↓
      Router
        ↓
      Service
        ↓
    Repository
        ↓
      Model
        ↓
   PostgreSQL

Router      = API受付係
Service     = 処理・判断係
Repository  = DB操作係
Model       = DB構造
Schema      = APIデータの型・形
