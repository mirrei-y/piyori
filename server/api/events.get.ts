import { isEventActive } from "~/composables/date";
import type { IEvent } from "~/types/event";

export default defineEventHandler(async event => {
    const db = event.context.cloudflare.env.db;

    const events = await db.prepare("SELECT * FROM events").all<IEvent>();
    return events.results?.filter(event => isEventActive(event.start_date, event.end_date)) ?? [];
});
