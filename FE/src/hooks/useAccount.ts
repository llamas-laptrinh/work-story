/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/getProgram";
import anchor from "@project-serum/anchor";
import { IdlAccountItem } from "@project-serum/anchor/dist/cjs/idl";
const utf8 = anchor.utils.bytes.utf8;
const { web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
};

const useAccount = () => {
  const wallet = useWallet();
  if (!wallet.wallet) {
    return;
  }
  const connection = new anchor.web3.Connection(SOLANA_HOST);
  const currentWallet = wallet.wallet;
  const program = getProgramInstance(connection, currentWallet);
  const signup = async (
    name: any | anchor.Context<anchor.Accounts<IdlAccountItem>>,
    profile: any | anchor.Context<anchor.Accounts<IdlAccountItem>>
  ) => {
    if (!wallet.publicKey) {
      return;
    }
    const [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("user"), wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.rpc.createUser(name, profile, {
      accounts: {
        user: user_pda,
        authority: wallet.publicKey,
        ...defaultAccounts,
      },
    });
  };
  return { signup };
};

export default useAccount;
