/* eslint-disable @typescript-eslint/no-explicit-any */
import * as anchor from "@project-serum/anchor";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { APP_IDL, APP_PROGRAM_ID } from "./const";

// This command makes an Lottery
export function getProgramInstance(
  connection: anchor.web3.Connection,
  wallet: any
) {
  if (!wallet.publicKey) throw new WalletNotConnectedError();

  const provider = new anchor.AnchorProvider(
    connection,
    wallet.wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  // Read the generated IDL.
  const idl = APP_IDL;

  // Address of the deployed program.
  const programId = APP_PROGRAM_ID;

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId, provider);

  return program;
}
