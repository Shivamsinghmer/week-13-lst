var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import express from 'express';
import { mintTokens } from './mintTokens.js';
const app = express();
const HELIUS_RESPONSE = {
    "accountData": [
        {
            "account": "2yta7fyqq94m8SGNc7PTiTY5eybQ73vQ8aXC6CgfPmEa",
            "nativeBalanceChange": -1000005000,
            "tokenBalanceChanges": []
        },
        {
            "account": "BkToezqnSWhKbwxnbFnk4SQGxihkVNjGako4C5RqKcPA",
            "nativeBalanceChange": 1000000000,
            "tokenBalanceChanges": []
        },
        {
            "account": "11111111111111111111111111111111",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        }
    ],
    "description": "2yta7fyqq94m8SGNc7PTiTY5eybQ73vQ8aXC6CgfPmEa transferred 1 SOL to BkToezqnSWhKbwxnbFnk4SQGxihkVNjGako4C5RqKcPA.",
    "events": [],
    "fee": 5000,
    "feePayer": "2yta7fyqq94m8SGNc7PTiTY5eybQ73vQ8aXC6CgfPmEa",
    "instructions": [
        {
            "accounts": [
                "2yta7fyqq94m8SGNc7PTiTY5eybQ73vQ8aXC6CgfPmEa",
                "BkToezqnSWhKbwxnbFnk4SQGxihkVNjGako4C5RqKcPA"
            ],
            "data": "3Bxs3zzLZLuLQEYX",
            "innerInstructions": [],
            "programId": "11111111111111111111111111111111"
        }
    ],
    "nativeTransfers": [
        {
            "amount": 1000000000,
            "fromUserAccount": "2yta7fyqq94m8SGNc7PTiTY5eybQ73vQ8aXC6CgfPmEa",
            "toUserAccount": "BkToezqnSWhKbwxnbFnk4SQGxihkVNjGako4C5RqKcPA"
        }
    ],
    "signature": "4X3caYEM2hnGnAjgDnfSKMFz4uFcsBSAx153vosk7qZ9WbwXi8JDaP9jzZKEC3VCyw3qgNZuxtsUKZsyCfgbcNhA",
    "slot": 432029993,
    "source": "SYSTEM_PROGRAM",
    "timestamp": 1767203798,
    "tokenTransfers": [],
    "transactionError": null,
    "type": "TRANSFER"
};
const vault = "BkToezqnSWhKbwxnbFnk4SQGxihkVNjGako4C5RqKcPA";
app.post('/helius', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fromAddress = HELIUS_RESPONSE.nativeTransfers[0].fromUserAccount;
    const toAddress = HELIUS_RESPONSE.nativeTransfers[0].toUserAccount;
    if (toAddress !== vault) {
        return res.json({
            message: "Transaction Processed"
        });
    }
    const amount = HELIUS_RESPONSE.nativeTransfers[0].amount;
    const type = "received_native_sol";
    mintTokens(fromAddress, toAddress, amount);
    res.send('Transaction successful');
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
