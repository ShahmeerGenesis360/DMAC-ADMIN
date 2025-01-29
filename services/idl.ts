import { Program, AnchorProvider, setProvider, Idl } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import IDL from "../src/constants/dmac_contract.json";
import { clusterApiUrl, Connection } from "@solana/web3.js";

// Store Program instance outside React state

export const useProgram = () => {
  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=d91bf63d-1cdb-416a-9fb2-ad1c273540fc", "confirmed");
  const wallet = useAnchorWallet();

  if (!wallet) {
    console.warn("Wallet not connected yet.");
    return null;
  }

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  setProvider(provider);

  const program = new Program(IDL as Idl, provider);

  return { connection, provider, program };
};
