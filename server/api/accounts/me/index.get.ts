import { IUser } from "~/types/user";
import { verifyToken } from "~/composables/authentication";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;
    const uid = await verifyToken(event);

    const userData = await db.prepare("SELECT * FROM accounts WHERE id = ?;").bind(uid).first();
    if (!userData) throw createError({ status: 404 });

    const { results: records } = await db.prepare("SELECT * FROM accounts_wallet WHERE id = ?;").bind(uid).all();

    return {
        id: userData.id as string,
        name: userData.name as string,
        currencies: Object.fromEntries(records.map(record => [record.type, record.amount])),
    } satisfies IUser;
});
