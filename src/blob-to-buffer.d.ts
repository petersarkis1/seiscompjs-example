declare module 'blob-to-buffer' {
    export default function blobToBuffer(blob: Blob, callback: (err: Error | null, buffer: Buffer) => void): void;
}