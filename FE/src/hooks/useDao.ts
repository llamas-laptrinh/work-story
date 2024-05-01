import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/getProgram";
import * as anchor from "@project-serum/anchor";

const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccounts = {
//   tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
};

export function useDao() {
    // const { connection } = useConnection();
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);
  const getDaos = async () => {
    const daos = await program.account.DaoAccount.all();
    console.log(daos);
  };
  const createDao = async (index: string) => {
    const [dao_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("video"), new BN(index).toArrayLike(Buffer, "be", 8)],
      program.programId
    );
    // const tx = await program.rpc.
  };
  return {
    getDaos,
    createDao,
  };
}
