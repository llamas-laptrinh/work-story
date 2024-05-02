import { DAOContract } from "../../utils/ETH";
import { getProvier } from "../../utils/ETH/getProvider";

export default function useDao() {
  const initInstance = async () => {
    const { signer } = await getProvier();
    console.log(signer);
    if (!signer) {
      throw new Error("Provider");
    }
    return new DAOContract(signer);
  };
  const getDao = async (id: string) => {
    const dao = await initInstance();
    const user = await dao.getUser();
    const currentDao = await dao.getDao(id);
    return { isJoin: user.daos.includes(BigInt(id)), data: currentDao };
  };
  const joinDao = async (id: string) => {
    const dao = await initInstance();
    const user = await dao.getUser();
    if (user.userName === "") {
      alert("Please regiter your wallet");
      return;
    }
    return dao.joinDao(id);
  };
  const getDaos = async () => {
    const dao = await initInstance();
    return dao.getYourDao();
  };
  const createDAO = async (
    _treasury: string,
    _domain: string,
    _name: string,
    _limitCreate: string,
    _limitConfirm: string
  ) => {
    const dao = await initInstance();
    return dao.createDao({
      _treasury,
      _domain,
      _name,
      _limitCreate,
      _limitConfirm,
    });
  };
  const createUser = async (
    _userName: string,
    _bio: string,
    _userProfileImageUrl: string
  ) => {
    const dao = await initInstance();
    return dao.createUser(_userName, _bio, _userProfileImageUrl);
  };

  const getUser = async () => {
    const { signer } = await getProvier();

    if (!signer) {
      throw new Error("Provider");
    }
    return new DAOContract(signer).getUser();
  };

  const getPopularDao = async () => {
    const { signer } = await getProvier();

    if (!signer) {
      throw new Error("Provider");
    }
    return new DAOContract(signer).getPopularDao();
  };
  const createWork = async (
    _name: string,
    _createdBy: string,
    _imageUrl: string,
    _workUrl: string,
    _daoId: number
  ) => {
    const dao = await initInstance();
    return dao.createWork(_name, _createdBy, _imageUrl, _workUrl, 0, _daoId);
  };
  const getWorks = async () => {
    const dao = await initInstance();
    return dao.getYourDao();
  };
  const getWork = async (id: string) => {
    const dao = await initInstance();
    return dao.getWork(id);
  };
  return {
    getDao,
    getUser,
    createDAO,
    createUser,
    getDaos,
    getPopularDao,
    joinDao,
    createWork,
    getWorks,
    getWork,
  };
}
