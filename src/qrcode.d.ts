declare module 'qrcode' {
  interface QrCodeModules {
    readonly size: number;
    get(row: number, column: number): number;
    isReserved(row: number, column: number): boolean;
  }

  interface QrCodeData {
    readonly modules: QrCodeModules;
  }

  export function create(
    data: string,
    options?: { errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H' }
  ): QrCodeData;
}
