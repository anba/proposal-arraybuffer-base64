import { uint8ArrayToBase64, base64ToUint8Array, uint8ArrayToHex, hexToUint8Array, checkUint8Array } from './polyfill-core.mjs';

// method shenanigans to make a non-constructor which can refer to "this"
Uint8Array.prototype.toBase64 = {
  toBase64(options) {
    return uint8ArrayToBase64(this, options);
  }
}.toBase64;
Object.defineProperty(Uint8Array.prototype, 'toBase64', { enumerable: false });
Object.defineProperty(Uint8Array.prototype.toBase64, 'length', { value: 0 });

Uint8Array.fromBase64 = (string, options) => {
  if (typeof string !== 'string') {
    throw new TypeError('expected input to be a string');
  }
  return base64ToUint8Array(string, options).bytes;
};
Object.defineProperty(Uint8Array, 'fromBase64', { enumerable: false });
Object.defineProperty(Uint8Array.fromBase64, 'length', { value: 1 });
Object.defineProperty(Uint8Array.fromBase64, 'name', { value: 'fromBase64' });

Uint8Array.fromBase64Into = (string, into, options) => {
  if (typeof string !== 'string') {
    throw new TypeError('expected input to be a string');
  }
  checkUint8Array(into);
  let { read, bytes } = base64ToUint8Array(string, options, into);
  return { read, written: bytes.length };
};
Object.defineProperty(Uint8Array, 'fromBase64Into', { enumerable: false });
Object.defineProperty(Uint8Array.fromBase64Into, 'length', { value: 2 });
Object.defineProperty(Uint8Array.fromBase64Into, 'name', { value: 'fromBase64Into' });

Uint8Array.prototype.toHex = {
  toHex() {
    return uint8ArrayToHex(this);
  }
}.toHex;
Object.defineProperty(Uint8Array.prototype, 'toHex', { enumerable: false });

Uint8Array.fromHex = (string) => {
  if (typeof string !== 'string') {
    throw new TypeError('expected input to be a string');
  }
  return hexToUint8Array(string).bytes;
};
Object.defineProperty(Uint8Array, 'fromHex', { enumerable: false });
Object.defineProperty(Uint8Array.fromHex, 'name', { value: 'fromHex' });

Uint8Array.fromHexInto = (string, into) => {
  if (typeof string !== 'string') {
    throw new TypeError('expected input to be a string');
  }
  checkUint8Array(into);
  let { read, bytes } = hexToUint8Array(string, into);
  return { read, written: bytes.length };
};
Object.defineProperty(Uint8Array, 'fromHexInto', { enumerable: false });
Object.defineProperty(Uint8Array.fromHexInto, 'name', { value: 'fromHexInto' });
