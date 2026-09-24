from database import SessionLocal
from models import Work
db = SessionLocal()

works = [
    Work(title ="家計簿アプリ", description = "Next.js、FastAPI、PostgreSQLを使って開発した家計簿アプリ"),
    Work(title ="湾岸混雑回避アプリ", description = "イベント情報から交通への影響を確認できるアプリ"),
]
db.add_all(works)
db.commit()

db.close()