import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import idlJson from "./idl.json";

export const CLUSTER =
  process.env.REACT_APP_CLUSTER === "mainnet"
    ? "mainnet"
    : process.env.REACT_APP_CLUSTER === "testnet"
    ? "testnet"
    : process.env.REACT_APP_CLUSTER === "devnet"
    ? "devnet"
    : "localnet";

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
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

export const APP_IDL = idlJson;
