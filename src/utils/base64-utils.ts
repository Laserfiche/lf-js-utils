export function convertBase64ToUint8Array(base64: string): Uint8Array {
    const decodedString: string = convertBase64toString(base64);
    const byteNumbers = new Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
        byteNumbers[i] = decodedString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return byteArray;
}

export async function convertReaderToBase64Async(reader: ReadableStreamDefaultReader<Uint8Array> | undefined) {
    const result: string[] = [];
    if (reader) {
        let nextChunk: ReadableStreamDefaultReadResult<Uint8Array>;
        while (!(nextChunk = await reader.read()).done) {
            const partialData: Uint8Array | undefined = nextChunk.value;
            if (partialData) {
                result.push(convertUint8ArrayToString(partialData));
            }
        }
    }
    const resultString = result.join('');
    return convertStringToBase64(resultString);
}

export function convertUint8ArrayToString(uint8array: Uint8Array): string {
    const result: string[] = [];
    const chunkSize = 0x8000;
    for (let i = 0; i < uint8array.length; i += chunkSize) {
        const decodedNumberArray = Array.from(uint8array.subarray(i, i + chunkSize));
        const decodedString: string = String.fromCharCode.apply(null, decodedNumberArray);
        result.push(decodedString);
    }
    return result.join('');
}

export function convertStringToBase64(nonBase64String: string): string {
    return btoa(nonBase64String);
}

export function convertBase64toString(base64String: string): string {
    return atob(base64String);
}
