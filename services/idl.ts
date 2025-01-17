import { Program, AnchorProvider, setProvider, Idl } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import IDL from "../src/constants/dmac_contract.json";
import { getProgramId } from "../services/utils";
import type { DmacContracts } from "../src/constants/dmac_contract";
import { clusterApiUrl, Connection } from "@solana/web3.js";

export let program: Program<Idl>; // Store Program instance outside React state

export const useProgram = () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  console.log(IDL);

  console.log(typeof IDL);

  const wallet = useAnchorWallet();
  console.log("wallet", wallet);

  if (!wallet) {
    console.warn("Wallet not connected yet.");
    return null;
  }

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  console.log("provider", provider);
  if (!provider) {
    console.warn("Wallet not connected yet.");
    return null;
  }

  setProvider(provider);

  if (!program) {
    program = new Program(IDL as Idl);
    console.log("program", program);
  }

  return { connection, provider };
};
