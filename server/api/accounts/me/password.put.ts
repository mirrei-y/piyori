import { HTTPError } from "h3";
import { verifyToken } from "~/composables/authentication";
import { sha256 } from "~/composables/hash";
import { randomBytes } from "crypto";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;
    const uid = await verifyToken(event);

    const body = await readBody<{
        currentPassword: string;
        newPassword: string;
    }>(event);
    const currentPassword = body?.currentPassword;
    const newPassword = body?.newPassword;
    if (!currentPassword || !newPassword) throw new HTTPError({ status: 400 });

    // NOTE: 現在のパスワードが正しいか確認する
    const account = await db.prepare("SELECT password FROM accounts WHERE id = ?").bind(uid).first<{ password: string }>();
    if (!account) {
        throw new HTTPError({ status: 404 });
    }
    const [salt, hashedPassword] = account.password.split(":");
    if (await sha256(salt + currentPassword) !== hashedPassword) {
        throw new HTTPError({ status: 401 });
    }

    // NOTE: 新しいパスワードをハッシュ化する
    const newSalt = randomBytes(8).toString("hex");
    const newPasswordHash = await sha256(newSalt + newPassword);
    const newPasswordData = `${newSalt}:${newPasswordHash}`;

    // NOTE: パスワードを更新する
    await db.prepare("UPDATE accounts SET password = ? WHERE id = ?").bind(newPasswordData, uid).run();

    return { success: true };
});
