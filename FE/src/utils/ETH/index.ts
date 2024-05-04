/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import contractABI from "./abi.json";

export default class SmartContract {
  protected wallet: ethers.JsonRpcSigner;
  constructor(signer: ethers.JsonRpcSigner) {
    this.wallet = signer;
  }

  protected loadContract(contractAddress: string, abi: any) {
    return new ethers.Contract(contractAddress, abi, this.wallet);
  }
}

export class DAOContract extends SmartContract {
  private contract;
  constructor(signer: ethers.JsonRpcSigner) {
    super(signer);
    this.contract = this.loadContract(
      contractABI.contractAddress,
      contractABI.abi
    );
  }
  async createUser(
    _userName: string,
    _bio: string,
    _userProfileImageUrl: string
  ) {
    try {
      const tx = await this.contract.createUser(
        _userName,
        _bio,
        _userProfileImageUrl
      );
      const result = await tx.wait();
      return result;
    } catch (error) {
      console.error("creating user", error);
      return error;
    }
  }
  async createDao(profile: any) {
    const { _treasury, _domain, _name, _limitCreate, _limitConfirm } = profile;
    const txSend = await this.contract.createDAO(
      _treasury,
      _domain,
      _name,
      _limitCreate,
      _limitConfirm,
      {
        gasLimit: 3000000,
        nonce: await this.wallet.getNonce(),
      }
    );
    const tx = await txSend.wait();
    return tx;
  }
  async getUser() {
    const tx = await this.contract.getUser();
    return tx;
  }
  async createWork(
    _name: string,
    _createdBy: string,
    _imageUrl: string,
    _workUrl: string,
    _categoryId: number,
    _daoId: number
  ) {
    const txSend = await this.contract.createWork(
      _name,
      _createdBy,
      _imageUrl,
      _workUrl,
      _categoryId,
      _daoId,
      {
        gasLimit: 3000000,
        nonce: await this.wallet.getNonce(),
      }
    );
    const tx = await txSend.wait();
    return tx;
  }
  async getYourWorks() {
    const tx = await this.contract.getWorkByUser();
    return tx;
  }
  async getWorksInDao(id: string) {
    const tx = await this.contract.getWorkInDao(parseInt(id));
    return tx;
  }
  async getWork(id: string) {
    const tx = await this.contract.getWork(parseInt(id));
    return tx;
  }
  async joinDao(id: string) {
    const txSend = await this.contract.joinDAO(parseInt(id), {
      gasLimit: 3000000,
      nonce: await this.wallet.getNonce(),
    });
    const tx = await txSend.wait();
    return tx;
  }
  async getDao(id: string) {
    const tx = await this.contract.getDAO(parseInt(id));
    return tx;
  }
  async getYourDao() {
    const tx = await this.contract.getUserInDAO();
    return tx;
  }
  async getPopularDao() {
    const tx = await this.contract.getDaos();
    return tx;
  }
  async approveProposal(id: string) {
    return this.contract.approveProposal(parseInt(id));
  }
}
