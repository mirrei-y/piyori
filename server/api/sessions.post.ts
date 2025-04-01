import { SignJWT } from "jose";
import { sha256 } from "~/composables/hash";
import { JWT_AUD, JWT_ISS, JWT_SECRET } from "~/composables/authentication";


export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;

    const body = await readBody(event);
    if (!(body.id && body.password)) throw createError({ status: 400 });

    const account = await db.prepare("SELECT * FROM accounts WHERE id = ?;").bind(body.id).first();
    if (!account) throw createError({ status: 401 });

    const [salt, hash] = (account.password as string).split(":");
    if (await sha256(salt + body.password) !== hash) throw createError({ status: 401 });

    return {
        token: await new SignJWT({
            iss: JWT_ISS,
            aud: JWT_AUD,
            sub: body.id,
        }).setProtectedHeader({ alg: "HS256" }).sign(JWT_SECRET)
    };
});
