import * as crypto from 'crypto';

import * as bip39 from 'bip39';
const createHash = require("create-hash");

import { InvalidMnemonic } from '@onekeyhq/shared/src/errors/common-errors';
import { check } from '@onekeyhq/shared/src/utils/assertUtils';

export type RevealableSeed = {
  entropyWithLangPrefixed: Buffer;
  seed: Buffer;
};

function binaryToByte(bin: any) {
  return parseInt(bin, 2);
}

function lpad(str: string, padString: string, length: number) {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
}

function bytesToBinary(bytes: any) {
  return bytes.map((x: any) => lpad(x.toString(2), '0', 8)).join('');
}

function deriveChecksumBits(entropyBuffer: any) {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = createHash('sha256')
      .update(entropyBuffer)
      .digest();
  return bytesToBinary(Array.from(hash)).slice(0, CS);
}

function serectToEntropy(mnemonic: string) {

  // convert word indices to 11 bit binary strings
  const bits = lpad(mnemonic, '0', 11)
  // split the binary string into ENT/CS
  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);
  // calculate the checksum and compare
  const INVALID_ENTROPY = 'Invalid entropy';
  const INVALID_CHECKSUM = 'Invalid mnemonic checksum';
  /*const entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte);
  if (entropyBytes.length < 16) {
    throw new Error(INVALID_ENTROPY);
  }
  if (entropyBytes.length > 32) {
    throw new Error(INVALID_ENTROPY);
  }
  if (entropyBytes.length % 4 !== 0) {
    throw new Error(INVALID_ENTROPY);
  }*/
  const entropy = Buffer.from(bits);
  /*const newChecksum = deriveChecksumBits(entropy);
  if (newChecksum !== checksumBits) {
    throw new Error(INVALID_CHECKSUM);
  }*/
  return entropy.toString('hex');
}

function serectToRevealableSeed(
    mnemonic: string,
    passphrase?: string,
): RevealableSeed {
  /*try {
    const entropyHexStr = serectToEntropy(mnemonic);
    const entropyLength: number = entropyHexStr.length / 2;
    const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic, passphrase);
    return {
      entropyWithLangPrefixed: Buffer.concat([
        Buffer.from([1]), // langCode is always 1 for english wordlist.
        Buffer.from([entropyLength]),
        Buffer.from(entropyHexStr, 'hex'),
        crypto.randomBytes(32 - entropyLength), // Always pad entropy to 32 bytes.
      ]),
      seed,
    };
  } catch {
    throw new InvalidMnemonic();
  }*/
  const entropyHexStr = serectToEntropy(mnemonic);
  console.log('entropyHexStr', entropyHexStr)
  const entropyLength: number = entropyHexStr.length / 2;
  const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic, passphrase);
  return {
    entropyWithLangPrefixed: Buffer.concat([
      Buffer.from([1]), // langCode is always 1 for english wordlist.
      Buffer.from([entropyLength]),
      Buffer.from(entropyHexStr, 'hex'),
      crypto.randomBytes(entropyLength), // Always pad entropy to 32 bytes.
    ]),
    seed,
  };
}

function mnemonicToRevealableSeed(
  mnemonic: string,
  passphrase?: string,
): RevealableSeed {
  try {
    const entropyHexStr = bip39.mnemonicToEntropy(
      mnemonic,
      bip39.wordlists.english,
    );
    const entropyLength: number = entropyHexStr.length / 2;
    const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic, passphrase);
    return {
      entropyWithLangPrefixed: Buffer.concat([
        Buffer.from([1]), // langCode is always 1 for english wordlist.
        Buffer.from([entropyLength]),
        Buffer.from(entropyHexStr, 'hex'),
        crypto.randomBytes(32 - entropyLength), // Always pad entropy to 32 bytes.
      ]),
      seed,
    };
  } catch {
    throw new InvalidMnemonic();
  }
}

function revealEntropy(entropyWithLangPrefixed: Buffer): string {
  const langCode: number = entropyWithLangPrefixed[0];
  const entropyLength: number = entropyWithLangPrefixed[1];
  /*check(
    // eslint-disable-next-line eqeqeq
    langCode == 1 && [16, 20, 24, 28, 32].includes(entropyLength),
    'invalid entropy',
  );*/
  /*return bip39.entropyToMnemonic(
    entropyWithLangPrefixed.slice(2, 2 + entropyLength),
    bip39.wordlists.english,
  );*/
  return entropyWithLangPrefixed.toString()
}

export { mnemonicToRevealableSeed, serectToRevealableSeed, revealEntropy };
