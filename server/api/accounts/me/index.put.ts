import { HTTPError } from "h3";
import { verifyToken } from "~/composables/authentication";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;
    const uid = await verifyToken(event);

    const body = await readBody<{ name: string }>(event);
    const name = body?.name;
    if (!name) throw new HTTPError({ status: 400 });

    await db.prepare("UPDATE accounts SET name = ? WHERE id = ?;").bind(name, uid).run();

    return { success: true };
});
