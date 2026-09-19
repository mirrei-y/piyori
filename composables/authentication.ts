import { H3Event, HTTPError } from "h3";
import { jwtVerify } from "jose";

export const JWT_ISS = "dev.mirrei.piyori.auth";
export const JWT_AUD = "dev.mirrei.piyori.app";
export const JWT_SECRET = new TextEncoder().encode("fatekaleidlinerprismaillya.illyasvielvoneinzbern");

export async function verifyToken(event: H3Event): Promise<string> {
    const authHeader = event.req.headers.get("authorization");
    if (!authHeader) throw new HTTPError({ status: 401, message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) throw new HTTPError({ status: 401, message: "Token missing" });

    try {
        const jwt = await jwtVerify(token, JWT_SECRET);
        if (jwt.payload.iss !== JWT_ISS) throw new Error();
        if (jwt.payload.aud !== JWT_AUD) throw new Error();
        return jwt.payload.sub!;
    } catch (err) {
        throw new HTTPError({ status: 403, message: "Invalid token" });
    }
}
