import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as IDL from "../src/constants/dmac_contract.json";
import { getProgramId } from "../services/utils";
import type { DmacContracts } from "../src/constants/dmac_contract";

export const useProgram = () => {
  const { connection } = useConnection();

  const wallet = useAnchorWallet();

  const programId = getProgramId();

  if (!wallet) {
    throw new Error("Wallet not connected!");
  }

  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );

  setProvider(provider);

  const program = new Program(IDL as DmacContracts, provider);

  return { connection, provider, program, programId };
};
