import { defineEventHandler, readBody, HTTPError } from "h3";
import { verifyToken } from "~/composables/authentication";
import { ulid } from "ulid";

export default defineEventHandler(async (event) => {
    const db = event.context.cloudflare.env.db;
    const body = await readBody<{
        recipient: string;
        amount: number;
        currency: string;
        reason: string;
    }>(event);
    const recipient = body?.recipient;
    const amount = body?.amount;
    const currency = body?.currency;
    const reason = body?.reason;
    if (!recipient || !amount || !currency || !reason) throw new HTTPError({ status: 400 });

    if (amount <= 0) throw new HTTPError({ status: 400, message: "送金額は1以上である必要があります。" });

    // NOTE: 送金先アカウントが存在するか確認
    const recipientAccount = await db.prepare("SELECT * FROM accounts_wallet WHERE id = ?")
        .bind(recipient)
        .first();
    if (!recipientAccount) throw new HTTPError({ status: 400, message: "送金先アカウントが存在しません。" });

    const userId = await verifyToken(event);

    try {
        // NOTE: 送金元アカウントから送金額を減算
        await db.prepare("UPDATE accounts_wallet SET amount = amount - ? WHERE id = ? AND type = ?")
            .bind(amount, userId, currency)
            .run();

        // NOTE: 送金先アカウントに送金額を加算
        await db.prepare("UPDATE accounts_wallet SET amount = amount + ? WHERE id = ? AND type = ?")
            .bind(amount, recipient, currency)
            .run();

        // NOTE: トランザクション履歴を記録
        await db.prepare("INSERT INTO transactions (id, created_at, sender, receiver, type, amount, reason) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .bind(ulid(), Math.floor(Date.now() / 1000), userId, recipient, currency, amount, reason)
            .run();

        return { success: true };
    } catch (error: any) {
        throw new HTTPError({ status: 500, message: error.message });
    }
});
