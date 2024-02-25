export async function hash(password: string, salt?: string): Promise<{
    hash: string,
    salt: string
}> {
    if (salt == undefined) {
        salt = generateSalt(16);
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
    
    console.log(hashHex);
    
    return {
        hash: hashHex,
        salt
    }
}

function generateSalt(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    let salt = '';
    for (let i = 0; i < length; i++) {
        salt += characters.charAt(randomValues[i] % characters.length);
    }
    return salt;
}

export async function validateHash(plaintext: string, hashed: string, salt: string) {
    const hashedPlaintextHex = await hash(plaintext, salt);
    const hashedPlaintext = hexStringToArrayBuffer(hashedPlaintextHex.hash);
    
    const hashedPasswordArrayBuffer = hexStringToArrayBuffer(hashed);
    
    return await crypto.subtle.timingSafeEqual(hashedPlaintext, hashedPasswordArrayBuffer);
}

function hexStringToArrayBuffer(hexString: string) {
    const buffer = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        buffer[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
    }
    return buffer;
}


export function getToken() {
    return crypto.randomUUID();
}