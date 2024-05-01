import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import idlJson from "./idl.json";

export const CLUSTER =
  import.meta.env.REACT_APP_CLUSTER === "mainnet"
    ? "mainnet"
    : import.meta.env.REACT_APP_CLUSTER === "testnet"
    ? "testnet"
    : import.meta.env.REACT_APP_CLUSTER === "devnet"
    ? "devnet"
    : "localnet";

export const SOLANA_HOST = import.meta.env.REACT_APP_SOLANA_API_URL
  ? import.meta.env.REACT_APP_SOLANA_API_URL
  : CLUSTER === "mainnet"
  ? clusterApiUrl("mainnet-beta")
  : CLUSTER === "testnet"
  ? clusterApiUrl("testnet")
  : CLUSTER === "devnet"
  ? clusterApiUrl("devnet")
  : "http://localhost:8899";

export const APP_PROGRAM_ID = new PublicKey(
  CLUSTER === "localnet"
    ? "27sYq8yqDSBQSxXyUBSBc6zGDs954Xbtqq77GskjBUBD"
    : CLUSTER === "testnet"
    ? "27sYq8yqDSBQSxXyUBSBc6zGDs954Xbtqq77GskjBUBD"
    : CLUSTER === "devnet"
    ? "27sYq8yqDSBQSxXyUBSBc6zGDs954Xbtqq77GskjBUBD"
    : ""
);
// GZn6qFqAva7J1ZDH1vLdYdjtvjudGnBXb5yRXBm4BKob

export const KLAYTN_ADDRESS = "0x3d55A8cBBAA24C7e7ABac68708FFE2051161f147";

export const APP_IDL = idlJson;
