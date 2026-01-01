import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address.js";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com");

function bs58toKeypair(privateKey: string) {
    if (!privateKey) {
        throw new Error("Private key is undefined or empty");
    }
    try {
        const keypair = bs58.decode(privateKey);
        return Keypair.fromSecretKey(keypair);
    } catch (e) {
        throw new Error(`Failed to decode private key: ${e instanceof Error ? e.message : String(e)}`);
    }
}

export const mintTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    try {
        const keypair = bs58toKeypair(PRIVATE_KEY!);
        console.log(`Getting or creating ATA for ${fromAddress}...`);

        const userTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            TOKEN_MINT_ADDRESS,
            new PublicKey(fromAddress)
        );

        console.log(`Attempting to mint ${amount} tokens to ATA: ${userTokenAccount.address.toBase58()}`);

        const mintTxId = await mintTo(
            connection,
            keypair,
            TOKEN_MINT_ADDRESS,
            userTokenAccount.address,
            keypair,
            amount,
        );

        console.log("Minting tokens successful. Transaction ID:", mintTxId);
    } catch (error) {
        console.error("Error in mintTokens:", error);
    }
}

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}


