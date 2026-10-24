# Portfolio Site

Next.js / FastAPI / PostgreSQLで開発した、管理画面付きポートフォリオサイトです。

**[公開中のサイトを見る](https://portfolio-site-sooty-five.vercel.app)**

- **主な機能**：プロフィール・スキル・制作実績の表示、問い合わせ送信、管理者によるコンテンツ更新
- **公開環境**：Vercel（Next.js）、Render（FastAPI）、Neon（PostgreSQL）
- **開発担当**：フロントエンド、API、データベース、認証・認可、デプロイ

プロフィール、スキル、制作実績をトップページに表示し、
Firebase Authenticationで認証された管理者は管理画面から内容を編集できます。

## 主な機能

- プロフィール表示・編集
- プロフィール画像の登録・変更
- スキルの追加・編集・削除
- 制作実績の追加・編集・削除
- お問い合わせ送信
- 管理画面でのお問い合わせ確認
- Firebase Authenticationを使用した管理者認証・認可

## 技術構成

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Firebase Authentication

### Backend

- FastAPI
- SQLAlchemy
- Alembic
- Firebase Admin SDK

### Database

- PostgreSQL 17

## 設計・実装で工夫した点

- **責務の分離**：FastAPIをRouter / Service / Repositoryに分け、処理判断とDB操作を分離しました。
- **認可の実装**：Firebase IDトークンをFastAPIで検証し、管理者向けAPIでは管理者権限を確認します。
- **画像登録**：JPEG・PNG・WebPを対象に、画像形式と5MBの上限を検証します。
- **本番環境への移行**：ローカル開発環境からVercel / Render / Neonへ移行し、CORSとFirebase認証情報の設定を調整しました。

## FastAPIのレイヤ構成

```text
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
```

- Router: APIのリクエスト受付・レスポンス返却
- Service: 処理・判断
- Repository: DB操作
- Model: DBのテーブル構造
- Schema: APIで扱うデータの型・形式

---

# 開発環境のセットアップ

## 1. 必要な環境

以下をインストールしてください。

- Git
- Docker Desktop
- Node.js / npm
- Python 3.14以上
- uv

Firebase認証を利用するため、Firebaseプロジェクトも必要です。

## 2. リポジトリをclone

```powershell
git clone https://github.com/marieokamoto5-debug/portfolio-site.git
cd portfolio-site
```

## 3. PostgreSQL用の環境変数を設定

リポジトリ直下の `.env.example` をコピーして `.env` を作成します。

```powershell
Copy-Item .env.example .env
```

`.env.example` には以下の項目があります。

```env
POSTGRES_USER=section6
POSTGRES_PASSWORD=replace_with_your_local_password
POSTGRES_DB=section6
DATABASE_URL=replace_with_your_local_DB_URL
```

`POSTGRES_PASSWORD` と `DATABASE_URL` を自分のローカル環境に合わせて設定してください。

例：

```env
DATABASE_URL=postgresql+psycopg://section6:your_password@127.0.0.1:5434/section6
```

`.env` はGitにはコミットしません。
## 4. PostgreSQLを起動

リポジトリ直下で実行します。

```powershell
docker compose up -d
```

PostgreSQLはローカルの `5434` ポートで起動します。

必要に応じて起動状態を確認します。

```powershell
docker compose ps
```

## 5. FastAPIの依存関係をインストール

```powershell
cd api
uv sync
```

## 6. DBマイグレーションを実行

`api` ディレクトリで実行します。

```powershell
uv run alembic upgrade head
```

これにより必要なテーブルがPostgreSQLに作成されます。

## 7. 初期データを登録

新しく作成したDBの場合、必要に応じて初期データを登録します。

```powershell
uv run python seed_profile.py
uv run python seed_skills.py
uv run python seed_works.py
```

> Seedは新規DBに対して1回だけ実行してください。
> 繰り返し実行すると同じデータが追加される可能性があります。

プロフィール画像は管理画面からアップロードできます。

---

# Firebase Authenticationの設定

## 8. Firebaseプロジェクトを用意

Firebase Consoleでプロジェクトを作成し、
AuthenticationのEmail/Password認証を有効にします。

管理画面へログインするユーザーもFirebase Authenticationに登録します。

## 9. Firebase Admin SDKのサービスアカウントを配置

Firebase Admin SDK用のサービスアカウントJSONを取得し、
以下の場所に配置します。

```text
api/
└─ secrets/
   └─ firebase-service-account.json
```

`api/secrets/` は `.gitignore` の対象なので、
サービスアカウントJSONはGitにコミットしません。

## 10. 管理者権限を設定

`api` ディレクトリで以下を実行します。

```powershell
uv run python set_admin_claim.py
```

以下の入力を求められるので、
Firebase Authenticationに登録した管理者のメールアドレスを入力します。

```text
Admin email:
```

対象ユーザーに `admin: true` のCustom Claimが設定されます。

---

# Next.jsの設定

## 11. フロントエンドの依存関係をインストール

```powershell
cd ../client
npm ci
```
## 12. Next.js用の環境変数を設定

`client/.env.example` は用意していません。`client` ディレクトリに `client/.env.local` を**新規作成**し、以下の環境変数を設定します。

主な設定値は以下です。

```env
FASTAPI_URL=http://127.0.0.1:8000
NEXT_PUBLIC_FASTAPI_URL=http://127.0.0.1:8000

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Firebase関連の値は、使用するFirebaseプロジェクトのWebアプリ設定に合わせて設定してください。

- `FASTAPI_URL`: Next.jsのサーバー側からFastAPIへアクセスするURL
- `NEXT_PUBLIC_FASTAPI_URL`: ブラウザからFastAPIへアクセスするURL

`.env.local` はGitにはコミットしません。

# アプリケーションの起動

PostgreSQL、FastAPI、Next.jsの3つを起動します。

## PostgreSQL

リポジトリ直下:

```powershell
docker compose up -d
```

## FastAPI

別ターミナルで:

```powershell
cd api
uv run uvicorn main:app --reload
```

## Next.js

別ターミナルで:

```powershell
cd client
npm run dev
```

---

# アクセス先

| 用途 | URL |
| --- | --- |
| トップページ | http://localhost:3000 |
| 管理画面ログイン | http://localhost:3000/admin/login |
| FastAPI | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |

---

# 初回起動時の確認

以下を確認してください。

1. `http://localhost:8000/docs` が表示される
2. `http://localhost:3000` でトップページが表示される
3. Firebaseユーザーで `/admin/login` からログインできる
4. 管理画面からプロフィール・スキル・実績を変更できる
5. 変更内容がトップページに反映される
6. プロフィール画像をアップロード・変更できる
7. お問い合わせを送信し、管理画面から確認できる

---

# 開発時の注意

## 環境変数・秘密情報

以下はGitにコミットしません。

```text
.env
client/.env.local
api/secrets/firebase-service-account.json
```

## 画像アップロード

プロフィール画像はFastAPIを経由してDBへ保存します。

現在は以下の形式に対応しています。

- JPEG
- PNG
- WebP

ファイルサイズは最大5MBです。

---

# ER図
```mermaid
erDiagram
    PROFILE {
        int id PK
        string name
        text bio
        int image_id FK
    }

    SKILL {
        int id PK
        string name
    }

    WORK {
        int id PK
        string title
        text description
        string url
    }

    IMAGE {
        int id PK
        string content_type
        binary data
    }

    CONTACT {
        int id PK
        string name
        string email
        string subject
        text message
        datetime created_at
    }

    IMAGE o|--o{ PROFILE : "profile image"
```
