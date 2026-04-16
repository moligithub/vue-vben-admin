import { encrypt, decrypt } from 'crypto-js/aes';
import { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import md5 from 'crypto-js/md5';
import UTF8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';
import { useGlobSetting } from '/@/hooks/setting';

const globSetting = useGlobSetting();

export interface EncryptionParams {
  key: string;
  iv: string;
  useHex: boolean;
}

export class AesEncryption {
  private key;
  private iv;
  private useHex = false;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key = globSetting.cipherKey, iv, useHex } = opt;
    if (key) this.key = parse(key);
    if (iv) this.iv = parse(iv);
    if (useHex) this.useHex = !!useHex;
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  encryptByAES(cipherText: string) {
    console.log("will be AES using "+"[cipherText]"+cipherText+","+"[key]"+this.key+","+"[getOptions]"+this.getOptions+","+"[useHex]"+this.useHex);
    console.log("this key : "+this.key);
    const result = encrypt(cipherText, this.key, this.getOptions).toString();
    console.log("AES encrypt password:"+result);
    const resultTemp = Hex.stringify(Base64.parse(result));
    console.log("resultTemp："+resultTemp);
    console.log("resultTemp decrypt："+Base64.stringify(Hex.parse(resultTemp)));
    return this.useHex ?  resultTemp : result;
  }

  decryptByAES(cipherText: string) {
    const realCipherText = this.useHex ? Base64.stringify(Hex.parse(cipherText)) : cipherText;
    return decrypt(realCipherText, this.key, this.getOptions).toString(UTF8);
  }
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
  return md5(password).toString();
}
