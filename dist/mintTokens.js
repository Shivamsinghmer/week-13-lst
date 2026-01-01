var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address.js";
import bs58 from "bs58";
const connection = new Connection("https://api.devnet.solana.com");
function bs58toKeypair(privateKey) {
    if (!privateKey) {
        throw new Error("Private key is undefined or empty");
    }
    try {
        const keypair = bs58.decode(privateKey);
        return Keypair.fromSecretKey(keypair);
    }
    catch (e) {
        throw new Error(`Failed to decode private key: ${e instanceof Error ? e.message : String(e)}`);
    }
}
export const mintTokens = (fromAddress, toAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keypair = bs58toKeypair(PRIVATE_KEY);
        console.log(`Getting or creating ATA for ${fromAddress}...`);
        const userTokenAccount = yield getOrCreateAssociatedTokenAccount(connection, keypair, TOKEN_MINT_ADDRESS, new PublicKey(fromAddress));
        console.log(`Attempting to mint ${amount} tokens to ATA: ${userTokenAccount.address.toBase58()}`);
        const mintTxId = yield mintTo(connection, keypair, TOKEN_MINT_ADDRESS, userTokenAccount.address, keypair, amount);
        console.log("Minting tokens successful. Transaction ID:", mintTxId);
    }
    catch (error) {
        console.error("Error in mintTokens:", error);
    }
});
export const burnTokens = (fromAddress, toAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Burning tokens");
});
export const sendNativeTokens = (fromAddress, toAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Sending native tokens");
});
