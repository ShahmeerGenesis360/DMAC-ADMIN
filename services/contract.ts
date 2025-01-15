import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getIndexInfoPda, getProgramState } from "./utils";
import {
  PYTH_NETWORK_PROGRAM_ID,
  NEXT_PUBLIC_ADMIN_PK,
} from "../src/constants/blockchain";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { PublicKey } from "@solana/web3.js";

export async function createIndex(
  program: Program,
  connection: anchor.web3.Connection,
  walletPublicKey: PublicKey,
  mintKeypair: Keypair,
  indexName: string,
  indexDescription: string,
  tokenAllocations: { mint: PublicKey; weight: anchor.BN }[],
  collectorDetails: { collector: PublicKey; weight: anchor.BN }[],
  feeAmount: number,
  signTransaction: (
    transaction: anchor.web3.Transaction
  ) => Promise<anchor.web3.Transaction>
) {
  const adminKeypair = Keypair.fromSecretKey(
    bs58.decode(NEXT_PUBLIC_ADMIN_PK as string)
  );
  const { blockhash } = await connection.getLatestBlockhash();

  const transaction = new anchor.web3.Transaction({
    feePayer: walletPublicKey,
    recentBlockhash: blockhash,
  });

  const instruction = await program.methods
    .createIndex(
      indexName,
      indexDescription,
      tokenAllocations,
      collectorDetails,
      new anchor.BN(feeAmount * anchor.web3.LAMPORTS_PER_SOL)
    )
    .accounts({
      programState: getProgramState(),
      admin: walletPublicKey,
      indexInfo: getIndexInfoPda(mintKeypair.publicKey),
      authority: mintKeypair.publicKey,
      indexMint: mintKeypair.publicKey,
      adminTokenAccount: getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        adminKeypair.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      ),
      priceUpdate: PYTH_NETWORK_PROGRAM_ID,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
      systemProgram: SYSTEM_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();

  transaction.add(instruction);

  // Partially sign with the mint keypair
  transaction.partialSign(mintKeypair);

  // Use the wallet to sign the transaction
  const signedTransaction = await signTransaction(transaction);

  // Send the signed transaction to the network
  const txHash = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );

  console.log("Transaction Hash:", txHash);
  return txHash;
}
