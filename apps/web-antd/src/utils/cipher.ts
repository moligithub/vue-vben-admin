import CryptoJS from 'crypto-js';

const DEFAULT_CIPHER_KEY = 'FZ9XfQwkN6HHxRao';

export interface EncryptionParams {
  key: string;
  iv: string;
  useHex: boolean;
}

export class AesEncryption {
  get getOptions() {
    return {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv: this.iv,
    };
  }
  private iv: ReturnType<typeof CryptoJS.enc.Utf8.parse> | undefined;
  private key: ReturnType<typeof CryptoJS.enc.Utf8.parse>;

  private useHex = false;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key = DEFAULT_CIPHER_KEY, iv, useHex } = opt;
    this.key = CryptoJS.enc.Utf8.parse(key);
    if (iv) this.iv = CryptoJS.enc.Utf8.parse(iv);
    if (useHex) this.useHex = !!useHex;
  }

  decryptByAES(cipherText: string) {
    const realCipherText = this.useHex
      ? CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(cipherText))
      : cipherText;
    return CryptoJS.AES.decrypt(
      realCipherText,
      this.key,
      this.getOptions,
    ).toString(CryptoJS.enc.Utf8);
  }

  encryptByAES(cipherText: string) {
    const result = CryptoJS.AES.encrypt(
      cipherText,
      this.key,
      this.getOptions,
    ).toString();
    const resultTemp = CryptoJS.enc.Hex.stringify(
      CryptoJS.enc.Base64.parse(result),
    );
    return this.useHex ? resultTemp : result;
  }
}

export function encryptByBase64(cipherText: string) {
  return CryptoJS.enc.Utf8.parse(cipherText).toString(CryptoJS.enc.Base64);
}

export function decodeByBase64(cipherText: string) {
  return CryptoJS.enc.Base64.parse(cipherText).toString(CryptoJS.enc.Utf8);
}

export function encryptByMd5(password: string) {
  return CryptoJS.MD5(password).toString();
}
