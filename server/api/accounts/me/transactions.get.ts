import { verifyToken } from "~/composables/authentication";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;
    const limit = parseInt(getQuery(event).limit?.toString() ?? "20");
    const uid = await verifyToken(event);

    const { results: records } = await db.prepare("SELECT * FROM transactions WHERE sender = ? OR receiver = ? ORDER BY created_at DESC LIMIT ?;").bind(uid, uid, limit).all();
    return records;
});
