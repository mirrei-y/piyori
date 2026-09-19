import { defineEventHandler } from "h3";
import { verifyToken } from "../../../composables/authentication";

export type GachaItem = {
    rank: 1 | 2 | 3;
    name: string; // TODO: 後で変更
    performance: string | null;
};

const GACHA_TABLE = [
    {
        rank: 1,
        name: "abc",
        performance: null,
    }
] satisfies GachaItem[];

function pickFromArray<T>(array: T[]): T {
    if (array.length === 0) throw new Error("Invalid array");
    return array[Math.floor(Math.random() * array.length)] as T;
}
function pickItem(): GachaItem {
    const random = Math.random();
    let rank;

    if (random < 0.7) {
        rank = 1;
    } else if (random < 0.9) {
        rank = 2;
    } else {
        rank = 3;
    }

    return pickFromArray(GACHA_TABLE.filter(i => i.rank === rank));
}

export default defineEventHandler(async event => {
    const uid = await verifyToken(event);

    return [
        pickItem(),
    ];
});
