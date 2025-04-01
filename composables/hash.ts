export async function sha256(value: string): Promise<string> {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));

    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0')).join('');
}
