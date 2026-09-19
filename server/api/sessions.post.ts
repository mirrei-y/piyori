import { HTTPError } from "h3";
import { SignJWT } from "jose";
import { sha256 } from "~/composables/hash";
import { JWT_AUD, JWT_ISS, JWT_SECRET } from "~/composables/authentication";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;

    const body = await readBody<{
        id: string;
        password: string;
    }>(event);
    const id = body?.id;
    const password = body?.password;
    if (!id || !password) throw new HTTPError({ status: 400 });

    const account = await db.prepare("SELECT * FROM accounts WHERE id = ?;").bind(id).first();
    if (!account) throw new HTTPError({ status: 401 });

    const [salt, hash] = (account.password as string).split(":");
    if (await sha256(salt + password) !== hash) throw new HTTPError({ status: 401 });

    return {
        token: await new SignJWT({
            iss: JWT_ISS,
            aud: JWT_AUD,
            sub: id,
        }).setProtectedHeader({ alg: "HS256" }).sign(JWT_SECRET)
    };
});
