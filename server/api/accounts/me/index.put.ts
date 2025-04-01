import { verifyToken } from "~/composables/authentication";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;
    const uid = await verifyToken(event);

    const body = await readBody(event);
    const name = body.name;

    if (!name) throw createError({ statusCode: 400, statusMessage: "Name is required" });

    await db.prepare("UPDATE accounts SET name = ? WHERE id = ?;").bind(name, uid).run();

    return { success: true };
});
