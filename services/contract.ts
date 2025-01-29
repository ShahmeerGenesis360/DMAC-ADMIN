import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Keypair } from "@solana/web3.js";
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
  console.log("----------------------");

  const adminKeypair = Keypair.fromSecretKey(
    bs58.decode(NEXT_PUBLIC_ADMIN_PK as string)
  );

  const { blockhash } = await connection.getLatestBlockhash();
  console.log("Blockhash:", blockhash);

  // --- Convert Weights in Token Allocations ---
  const scaledTokenAllocations = tokenAllocations.map((allocation) => ({
    mint: allocation.mint,
    weight: allocation.weight.mul(new anchor.BN(100)), // Scale the weight by 100
  }));

  console.log("Scaled Token Allocations:");
  scaledTokenAllocations.forEach((allocation, index) => {
    console.log(
      `Token ${
        index + 1
      }: Mint = ${allocation.mint.toString()}, Weight = ${allocation.weight.toString()}`
    );
  });

  const scaledCollectorDetails = collectorDetails.map((collector) => ({
    collector: collector.collector,
    weight: collector.weight.mul(new anchor.BN(100)), // Scale collector weights by 100 as well
  }));

  console.log("Scaled Collector Details:");
  scaledCollectorDetails.forEach((collector, index) => {
    console.log(
      `Collector ${
        index + 1
      }: PublicKey = ${collector.collector.toString()}, Weight = ${collector.weight.toString()}`
    );
  });

  // --- Single Transaction Object ---
  const transaction = new anchor.web3.Transaction({
    feePayer: walletPublicKey,
    recentBlockhash: blockhash,
  });

  const programState = getProgramState();

  console.log("Program State:", programState);

  // --- Instruction 1: Create Index ---
  const createIndexInstruction = await program.methods
    .createIndex(
      indexName,
      indexDescription,
      scaledTokenAllocations, // Pass scaled token allocations
      scaledCollectorDetails, // Pass scaled collector details
      new anchor.BN(feeAmount * anchor.web3.LAMPORTS_PER_SOL)
    )
    .accounts({
      programState: programState,
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

  transaction.add(createIndexInstruction);

  // --- Instruction 2: Mint Index ---
  const mintIndexInstruction = await program.methods
    .mintIndex()
    .accounts({
      programState: programState,
      admin: walletPublicKey,
      indexInfo: getIndexInfoPda(mintKeypair.publicKey),
      authority: mintKeypair.publicKey,
      indexMint: mintKeypair.publicKey,
      adminTokenAccount: getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        walletPublicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      ),
      tokenProgram: TOKEN_2022_PROGRAM_ID,
      systemProgram: SYSTEM_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();

  transaction.add(mintIndexInstruction);

  // Partially sign the transaction with the mint keypair
  transaction.partialSign(mintKeypair);

  // Use the wallet to sign the combined transaction
  const signedTransaction = await signTransaction(transaction);

  // Send the signed transaction to the network
  const txHash = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );

  console.log("Transaction Hash:", txHash);
  return txHash;
}
