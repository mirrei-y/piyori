import { sha256 } from "~/composables/hash";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;

    await db.exec(`CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, name TEXT NOT NULL, password TEXT NOT NULL);`);
    await db.exec(`CREATE TABLE IF NOT EXISTS accounts_wallet (id TEXT NOT NULL, type TEXT NOT NULL, amount INTEGER NOT NULL);`);
    await db.exec(`CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, sender TEXT NOT NULL, receiver TEXT NOT NULL, type TEXT NOT NULL, amount INTEGER NOT NULL, reason TEXT NOT NULL);`);

    await db.exec(`INSERT INTO accounts (id, name, password) VALUES ("admin", "Admin", "salt:${await sha256("salthogehoge")}");`).catch(() => { });
    await db.exec(`INSERT INTO accounts_wallet (id, type, amount) VALUES ("admin", "main", -100);`).catch(() => { });
    await db.exec(`INSERT INTO accounts (id, name, password) VALUES ("test", "Test", "salt:${await sha256("salthogehoge")}");`).catch(() => { });
    await db.exec(`INSERT INTO accounts_wallet (id, type, amount) VALUES ("test", "main", -14180);`).catch(() => { });

    await db.exec(`INSERT INTO transactions (id, created_at, sender, receiver, type, amount, reason) VALUES ("ULID_HERE_0", 0, "admin", "test", "main", 100, "admin -> test");`).catch(() => { });
    await db.exec(`INSERT INTO transactions (id, created_at, sender, receiver, type, amount, reason) VALUES ("ULID_HERE_1", 1734839084, "test", "admin", "main", 10000, "購入: ハミクリ+凸セット");`).catch(() => { });
    await db.exec(`INSERT INTO transactions (id, created_at, sender, receiver, type, amount, reason) VALUES ("ULID_HERE_2", 1743750720, "test", "admin", "main", 3616, "購入: 漫画");`).catch(() => { });
    await db.exec(`INSERT INTO transactions (id, created_at, sender, receiver, type, amount, reason) VALUES ("ULID_HERE_3", 1743926355, "test", "admin", "main", 4180, "購入: ハミダシクリエイティブRe:Re:call");`).catch(() => { });
    await db.exec(`INSERT INTO transactions (id, created_at, sender, receiver, type, amount, reason) VALUES ("ULID_HERE_4", 1744438384, "admin", "test", "main", -3616, "払い戻し: 購入: 漫画");`).catch(() => { });

    await db.exec(`CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, name TEXT NOT NULL, summary TEXT NOT NULL, description TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, theme_color TEXT NOT NULL);`);
    await db.exec(`INSERT INTO events (id, name, summary, description, start_date, end_date, theme_color) VALUES ("new-year", "お正月だよ！ひよひよフェスティバル", "お正月にログインして報酬をゲット！新年一発目を最高の妹で決めよう！", "新年あけましておめでとうございます！\\n\\n新年を記念いたしまして、期間限定のログインボーナスを開催いたします！\\nこの機会にぜひ Piyori にログインして、新年をさらにお楽しみください！", "0000-01-01", "0000-12-31", "#ff0000");`).catch(console.error);

    return {
        success: true
    };
});
