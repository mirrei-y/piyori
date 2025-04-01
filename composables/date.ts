export function isEventActive(startDate: string | null, endDate: string | null): boolean {
    if (!startDate || !endDate) {
        return false; // 開始日または終了日が指定されていない場合は開催中ではない
    }

    const now = new Date();
    const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
    const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

    const startDateObj = new Date(
        startYear === 0 ? now.getFullYear() : startYear,
        startMonth === 0 ? now.getMonth() : startMonth - 1,
        startDay === 0 ? now.getDate() : startDay
    );

    const endDateObj = new Date(
        endYear === 0 ? now.getFullYear() : endYear,
        endMonth === 0 ? now.getMonth() : endMonth - 1,
        endDay === 0 ? now.getDate() : endDay
    );
    endDateObj.setHours(23, 59, 59, 999);

    return startDateObj <= now && now <= endDateObj;
}
