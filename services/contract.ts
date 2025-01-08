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
  provider: anchor.Provider,
  mintKeypair: Keypair,
  indexName: string,
  indexDescription: string,
  tokenAllocations: { mint: PublicKey; weight: number }[]
) {
  const mintPublicKey = mintKeypair.publicKey;

  const adminKeypair = Keypair.fromSecretKey(
    bs58.decode(NEXT_PUBLIC_ADMIN_PK as string)
  );

  const adminTokenAccount = getAssociatedTokenAddressSync(
    mintPublicKey,
    adminKeypair,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const programState = getProgramState();

  const accounts = {
    programState: programState,
    admin: adminKeypair.publicKey,
    indexInfo: getIndexInfoPda(mintPublicKey),
    authority: mintPublicKey,
    indexMint: mintPublicKey,
    adminTokenAccount: adminTokenAccount,
    priceUpdate: PYTH_NETWORK_PROGRAM_ID,
    tokenProgram: TOKEN_2022_PROGRAM_ID,
    systemProgram: SYSTEM_PROGRAM_ID,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  };

  // Convert weights to anchor's BN format
  const tokenAllocationsBN = tokenAllocations.map((allocation) => ({
    mint: allocation.mint,
    weight: new anchor.BN(allocation.weight),
  }));

  // Ensure total weight sums to 100%
  const totalWeight = tokenAllocations.reduce(
    (sum, allocation) => sum + allocation.weight,
    0
  );
  if (totalWeight !== 100) {
    throw new Error("The total allocation percentage must sum up to 100%.");
  }

  const txHash = await program.rpc.createIndex(
    indexName,
    indexDescription,
    tokenAllocationsBN,
    new anchor.BN(1 * LAMPORTS_PER_SOL),
    {
      accounts: accounts,
      signers: [mintKeypair, adminKeypair],
    }
  );

  return txHash;
}
