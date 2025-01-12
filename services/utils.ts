import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export function getIndexInfoPda(indexMint: PublicKey) {
  const programId = getProgramId();
  const [indexInfoPdaAccount] = PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("index_info"), indexMint.toBuffer()],
    programId
  );

  return indexInfoPdaAccount;
}

export function getProgramId() {
  // const VITE_PUBLIC_PROGRAM_ID = import.meta.env.VITE_PUBLIC_PROGRAM_ID;
  const VITE_PUBLIC_PROGRAM_ID = process.env.VITE_PUBLIC_PROGRAM_ID;
  return new anchor.web3.PublicKey(VITE_PUBLIC_PROGRAM_ID as string);
}

export function getProgramState() {
  const programId = getProgramId();
  const [programState] = PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("index")],
    programId
  );

  return programState;
}
